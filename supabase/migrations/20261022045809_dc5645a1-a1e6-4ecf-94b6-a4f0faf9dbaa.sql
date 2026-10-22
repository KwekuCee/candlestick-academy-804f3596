ALTER TABLE public.students ADD COLUMN IF NOT EXISTS subscription_tier text NOT NULL DEFAULT 'free_trial' CHECK(subscription_tier IN ('free_trial','expired_free','monthly_20','permanent_100'));
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS subscription_ends_at timestamptz;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS trial_ends_at timestamptz;
CREATE TABLE public.moolre_payment_attempts (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), external_ref text NOT NULL UNIQUE, user_id uuid NOT NULL REFERENCES auth.users(id), student_id text NOT NULL REFERENCES public.students(id), plan text NOT NULL CHECK(plan IN ('monthly_20','permanent_100')), amount_usd numeric(12,2) NOT NULL CHECK(amount_usd>0), amount numeric(12,2) NOT NULL CHECK(amount>0), currency text NOT NULL CHECK(currency IN ('GHS','NGN')), account_number text NOT NULL, status text NOT NULL DEFAULT 'PENDING' CHECK(status IN ('PENDING','PAID','FAILED')), provider_transaction_id text UNIQUE, authorization_url text, verified_at timestamptz, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.moolre_payment_attempts TO authenticated;
GRANT ALL ON public.moolre_payment_attempts TO service_role;
ALTER TABLE public.moolre_payment_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY moolre_read_own ON public.moolre_payment_attempts FOR SELECT TO authenticated USING (user_id=auth.uid() OR EXISTS(SELECT 1 FROM public.user_roles WHERE user_id=auth.uid() AND role='admin'));
CREATE FUNCTION public.touch_moolre_attempt() RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$ BEGIN NEW.updated_at=now(); RETURN NEW; END $$;
CREATE TRIGGER touch_moolre_attempt BEFORE UPDATE ON public.moolre_payment_attempts FOR EACH ROW EXECUTE FUNCTION public.touch_moolre_attempt();
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS moolre_attempt_id uuid UNIQUE REFERENCES public.moolre_payment_attempts(id);
DROP POLICY IF EXISTS "Allow full access on payments" ON public.payments;
REVOKE ALL ON public.payments FROM anon,authenticated;
GRANT SELECT ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
CREATE POLICY payments_read_own ON public.payments FOR SELECT TO authenticated USING (EXISTS(SELECT 1 FROM public.students s WHERE s.id=student_id AND s.auth_user_id=auth.uid()) OR EXISTS(SELECT 1 FROM public.user_roles WHERE user_id=auth.uid() AND role='admin'));
DROP POLICY IF EXISTS "Allow full access on students" ON public.students;
REVOKE ALL ON public.students FROM anon;
GRANT SELECT,INSERT,UPDATE ON public.students TO authenticated;
GRANT ALL ON public.students TO service_role;
CREATE POLICY students_read_own ON public.students FOR SELECT TO authenticated USING(auth_user_id=auth.uid() OR EXISTS(SELECT 1 FROM public.user_roles WHERE user_id=auth.uid() AND role='admin'));
CREATE POLICY students_insert_own ON public.students FOR INSERT TO authenticated WITH CHECK(auth_user_id=auth.uid() AND lower(email)=lower(auth.jwt()->>'email'));
CREATE POLICY students_update_own ON public.students FOR UPDATE TO authenticated USING(auth_user_id=auth.uid()) WITH CHECK(auth_user_id=auth.uid() AND lower(email)=lower(auth.jwt()->>'email'));
CREATE FUNCTION public.protect_student_subscription() RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$ BEGIN
 IF current_user NOT IN ('service_role','postgres','supabase_admin') THEN
  IF TG_OP='INSERT' THEN
   IF NEW.subscription_tier<>'free_trial' OR NEW.subscription_ends_at IS NOT NULL OR NEW.role<>'student' OR NEW.tier<>'free_month' THEN RAISE EXCEPTION 'Subscription access is managed by the payment server'; END IF;
   NEW.trial_ends_at=now()+interval '30 days';
  ELSE
   IF NEW.auth_user_id IS DISTINCT FROM OLD.auth_user_id OR NEW.email IS DISTINCT FROM OLD.email OR NEW.subscription_tier IS DISTINCT FROM OLD.subscription_tier OR NEW.subscription_ends_at IS DISTINCT FROM OLD.subscription_ends_at OR NEW.trial_ends_at IS DISTINCT FROM OLD.trial_ends_at OR NEW.tier IS DISTINCT FROM OLD.tier OR NEW.role IS DISTINCT FROM OLD.role THEN RAISE EXCEPTION 'Subscription access is managed by the payment server'; END IF;
  END IF;
 END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER protect_student_subscription BEFORE INSERT OR UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION public.protect_student_subscription();
CREATE FUNCTION public.confirm_moolre_payment(p_ref text,p_transaction_id text,p_amount numeric,p_account text) RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path=public AS $$
DECLARE a public.moolre_payment_attempts; s public.students; expiry timestamptz;
BEGIN
 SELECT * INTO a FROM public.moolre_payment_attempts WHERE external_ref=p_ref FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Unknown payment'; END IF;
 IF a.amount<>p_amount OR a.account_number<>p_account OR coalesce(p_transaction_id,'')='' THEN RAISE EXCEPTION 'Payment mismatch'; END IF;
 IF a.status='PAID' THEN
  IF a.provider_transaction_id<>p_transaction_id THEN RAISE EXCEPTION 'Transaction mismatch'; END IF;
  RETURN jsonb_build_object('status','PAID','duplicate',true);
 END IF;
 SELECT * INTO s FROM public.students WHERE id=a.student_id AND auth_user_id=a.user_id FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Payment owner mismatch'; END IF;
 IF s.subscription_tier='permanent_100' OR a.plan='permanent_100' THEN
  UPDATE public.students SET subscription_tier='permanent_100',subscription_ends_at=NULL,updated_at=now() WHERE id=s.id;
 ELSE
  expiry=greatest(now(),coalesce(s.subscription_ends_at,now()))+interval '30 days';
  UPDATE public.students SET subscription_tier='monthly_20',subscription_ends_at=expiry,updated_at=now() WHERE id=s.id;
 END IF;
 UPDATE public.moolre_payment_attempts SET status='PAID',provider_transaction_id=p_transaction_id,verified_at=now() WHERE id=a.id;
 INSERT INTO public.payments(student_id,tier,amount_usd,status,next_billing_date,moolre_attempt_id) VALUES(a.student_id,a.plan,a.amount_usd,'PAID',expiry::text,a.id);
 RETURN jsonb_build_object('status','PAID','duplicate',false);
END $$;
REVOKE ALL ON FUNCTION public.confirm_moolre_payment(text,text,numeric,text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.confirm_moolre_payment(text,text,numeric,text) TO service_role;