export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          actor: string
          created_at: string
          detail: string
          event_type: string
          id: string
          updated_at: string
        }
        Insert: {
          actor?: string
          created_at?: string
          detail?: string
          event_type: string
          id?: string
          updated_at?: string
        }
        Update: {
          actor?: string
          created_at?: string
          detail?: string
          event_type?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      certificate_templates: {
        Row: {
          course_y_pct: number
          font_color: string
          font_size: number
          id: string
          name_x_pct: number
          name_y_pct: number
          show_course_title: boolean
          show_issue_date: boolean
          template_image_url: string
          updated_at: string
        }
        Insert: {
          course_y_pct?: number
          font_color?: string
          font_size?: number
          id?: string
          name_x_pct?: number
          name_y_pct?: number
          show_course_title?: boolean
          show_issue_date?: boolean
          template_image_url?: string
          updated_at?: string
        }
        Update: {
          course_y_pct?: number
          font_color?: string
          font_size?: number
          id?: string
          name_x_pct?: number
          name_y_pct?: number
          show_course_title?: boolean
          show_issue_date?: boolean
          template_image_url?: string
          updated_at?: string
        }
        Relationships: []
      }
      client_notifications: {
        Row: {
          category: string
          created_at: string
          id: string
          is_read: boolean
          link_url: string | null
          message: string
          student_email: string
          title: string
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          is_read?: boolean
          link_url?: string | null
          message?: string
          student_email?: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          is_read?: boolean
          link_url?: string | null
          message?: string
          student_email?: string
          title?: string
        }
        Relationships: []
      }
      course_lessons: {
        Row: {
          auto_quiz_questions: Json
          course_id: string
          created_at: string
          description: string
          duration_minutes: number
          id: string
          is_published: boolean
          key_takeaways: Json
          lesson_number: number
          pair_tag: string | null
          title: string
          updated_at: string
          video_source_type: string
          video_url: string
        }
        Insert: {
          auto_quiz_questions?: Json
          course_id: string
          created_at?: string
          description?: string
          duration_minutes?: number
          id?: string
          is_published?: boolean
          key_takeaways?: Json
          lesson_number?: number
          pair_tag?: string | null
          title: string
          updated_at?: string
          video_source_type?: string
          video_url?: string
        }
        Update: {
          auto_quiz_questions?: Json
          course_id?: string
          created_at?: string
          description?: string
          duration_minutes?: number
          id?: string
          is_published?: boolean
          key_takeaways?: Json
          lesson_number?: number
          pair_tag?: string | null
          title?: string
          updated_at?: string
          video_source_type?: string
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          certificate_enabled: boolean
          color: string
          cover_color: string
          created_at: string
          description: string
          id: string
          lessons_count: number
          level: string
          level_pdf_name: string | null
          level_pdf_url: string | null
          level_quiz_questions: Json
          min_deposit_required: number
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          certificate_enabled?: boolean
          color?: string
          cover_color?: string
          created_at?: string
          description: string
          id: string
          lessons_count?: number
          level: string
          level_pdf_name?: string | null
          level_pdf_url?: string | null
          level_quiz_questions?: Json
          min_deposit_required?: number
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          certificate_enabled?: boolean
          color?: string
          cover_color?: string
          created_at?: string
          description?: string
          id?: string
          lessons_count?: number
          level?: string
          level_pdf_name?: string | null
          level_pdf_url?: string | null
          level_quiz_questions?: Json
          min_deposit_required?: number
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      exness_partner_clients: {
        Row: {
          account_type: string | null
          client_account_id: string
          client_balance: number | null
          client_country: string | null
          client_equity: number | null
          client_id: string
          client_status: string | null
          client_uid: string
          deposit_amount: number | null
          ftd_amount: number | null
          ftd_received: boolean | null
          ftt_made: boolean | null
          id: string
          kyc_passed: boolean | null
          link_code: string
          partner_account: string
          platform: string | null
          reg_date: string | null
          reward_usd: number | null
          synced_at: string
          trading_account_id: string
          volume_lots: number | null
          volume_mln_usd: number | null
        }
        Insert: {
          account_type?: string | null
          client_account_id: string
          client_balance?: number | null
          client_country?: string | null
          client_equity?: number | null
          client_id: string
          client_status?: string | null
          client_uid: string
          deposit_amount?: number | null
          ftd_amount?: number | null
          ftd_received?: boolean | null
          ftt_made?: boolean | null
          id: string
          kyc_passed?: boolean | null
          link_code?: string
          partner_account?: string
          platform?: string | null
          reg_date?: string | null
          reward_usd?: number | null
          synced_at?: string
          trading_account_id: string
          volume_lots?: number | null
          volume_mln_usd?: number | null
        }
        Update: {
          account_type?: string | null
          client_account_id?: string
          client_balance?: number | null
          client_country?: string | null
          client_equity?: number | null
          client_id?: string
          client_status?: string | null
          client_uid?: string
          deposit_amount?: number | null
          ftd_amount?: number | null
          ftd_received?: boolean | null
          ftt_made?: boolean | null
          id?: string
          kyc_passed?: boolean | null
          link_code?: string
          partner_account?: string
          platform?: string | null
          reg_date?: string | null
          reward_usd?: number | null
          synced_at?: string
          trading_account_id?: string
          volume_lots?: number | null
          volume_mln_usd?: number | null
        }
        Relationships: []
      }
      exness_verifications: {
        Row: {
          affiliation: boolean
          checked_at: string
          client_balance: number | null
          client_uid: string | null
          deposit_amount: number | null
          email: string
          id: string
          is_funded: boolean
          matched_accounts: Json | null
          partner_code: string
          raw_response: Json | null
          student_id: string | null
          trading_account: string
        }
        Insert: {
          affiliation?: boolean
          checked_at?: string
          client_balance?: number | null
          client_uid?: string | null
          deposit_amount?: number | null
          email: string
          id?: string
          is_funded?: boolean
          matched_accounts?: Json | null
          partner_code?: string
          raw_response?: Json | null
          student_id?: string | null
          trading_account: string
        }
        Update: {
          affiliation?: boolean
          checked_at?: string
          client_balance?: number | null
          client_uid?: string | null
          deposit_amount?: number | null
          email?: string
          id?: string
          is_funded?: boolean
          matched_accounts?: Json | null
          partner_code?: string
          raw_response?: Json | null
          student_id?: string | null
          trading_account?: string
        }
        Relationships: [
          {
            foreignKeyName: "exness_verifications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          course_id: string
          created_at: string
          duration_minutes: number
          id: string
          is_assessment: boolean
          lesson_number: number
          summary: string | null
          title: string
          video_url: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          duration_minutes?: number
          id: string
          is_assessment?: boolean
          lesson_number: number
          summary?: string | null
          title: string
          video_url?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          duration_minutes?: number
          id?: string
          is_assessment?: boolean
          lesson_number?: number
          summary?: string | null
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      live_session_messages: {
        Row: {
          created_at: string
          id: string
          is_host: boolean
          is_pinned: boolean
          message: string
          sender_avatar: string | null
          sender_email: string
          sender_name: string
          session_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_host?: boolean
          is_pinned?: boolean
          message: string
          sender_avatar?: string | null
          sender_email: string
          sender_name: string
          session_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_host?: boolean
          is_pinned?: boolean
          message?: string
          sender_avatar?: string | null
          sender_email?: string
          sender_name?: string
          session_id?: string
        }
        Relationships: []
      }
      live_sessions: {
        Row: {
          created_at: string
          description: string
          duration_minutes: number
          focus_pair: string | null
          host_name: string
          id: string
          min_deposit_required: number
          pinned_resources: Json
          registered_count: number
          rtmp_ingest_url: string | null
          rtmp_stream_key: string | null
          scheduled_at: string
          screen_share_snapshot: string | null
          session_type: string
          slug: string | null
          status: string
          stream_mode: string
          stream_playback_url: string | null
          title: string
          updated_at: string
          viewers_count: number
        }
        Insert: {
          created_at?: string
          description: string
          duration_minutes?: number
          focus_pair?: string | null
          host_name?: string
          id: string
          min_deposit_required?: number
          pinned_resources?: Json
          registered_count?: number
          rtmp_ingest_url?: string | null
          rtmp_stream_key?: string | null
          scheduled_at: string
          screen_share_snapshot?: string | null
          session_type?: string
          slug?: string | null
          status?: string
          stream_mode?: string
          stream_playback_url?: string | null
          title: string
          updated_at?: string
          viewers_count?: number
        }
        Update: {
          created_at?: string
          description?: string
          duration_minutes?: number
          focus_pair?: string | null
          host_name?: string
          id?: string
          min_deposit_required?: number
          pinned_resources?: Json
          registered_count?: number
          rtmp_ingest_url?: string | null
          rtmp_stream_key?: string | null
          scheduled_at?: string
          screen_share_snapshot?: string | null
          session_type?: string
          slug?: string | null
          status?: string
          stream_mode?: string
          stream_playback_url?: string | null
          title?: string
          updated_at?: string
          viewers_count?: number
        }
        Relationships: []
      }
      mentor_messages: {
        Row: {
          created_at: string
          id: string
          is_resolved: boolean
          message: string
          sender_role: string
          student_avatar: string | null
          student_email: string
          student_name: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_resolved?: boolean
          message: string
          sender_role: string
          student_avatar?: string | null
          student_email: string
          student_name: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_resolved?: boolean
          message?: string
          sender_role?: string
          student_avatar?: string | null
          student_email?: string
          student_name?: string
          subject?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount_usd: number
          created_at: string
          id: string
          next_billing_date: string | null
          status: string
          student_id: string | null
          tier: string
        }
        Insert: {
          amount_usd?: number
          created_at?: string
          id?: string
          next_billing_date?: string | null
          status?: string
          student_id?: string | null
          tier?: string
        }
        Update: {
          amount_usd?: number
          created_at?: string
          id?: string
          next_billing_date?: string | null
          status?: string
          student_id?: string | null
          tier?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      signals: {
        Row: {
          author_name: string
          commentary: string | null
          created_at: string
          direction: string
          entry_price: string
          id: string
          min_deposit_required: number
          pair: string
          risk_reward: string
          status: string
          stop_loss: string
          take_profit: string
        }
        Insert: {
          author_name?: string
          commentary?: string | null
          created_at?: string
          direction: string
          entry_price: string
          id: string
          min_deposit_required?: number
          pair: string
          risk_reward?: string
          status?: string
          stop_loss: string
          take_profit: string
        }
        Update: {
          author_name?: string
          commentary?: string | null
          created_at?: string
          direction?: string
          entry_price?: string
          id?: string
          min_deposit_required?: number
          pair?: string
          risk_reward?: string
          status?: string
          stop_loss?: string
          take_profit?: string
        }
        Relationships: []
      }
      student_certificates: {
        Row: {
          approved_by_admin: boolean
          certificate_code: string
          course_id: string
          course_title: string
          id: string
          issued_at: string
          quiz_average: number
          student_email: string
          student_name: string
        }
        Insert: {
          approved_by_admin?: boolean
          certificate_code: string
          course_id: string
          course_title: string
          id?: string
          issued_at?: string
          quiz_average?: number
          student_email: string
          student_name: string
        }
        Update: {
          approved_by_admin?: boolean
          certificate_code?: string
          course_id?: string
          course_title?: string
          id?: string
          issued_at?: string
          quiz_average?: number
          student_email?: string
          student_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      student_lesson_progress: {
        Row: {
          completed: boolean
          completed_at: string
          course_id: string
          id: string
          lesson_id: string
          student_email: string
          student_id: string
          watch_minutes: number
        }
        Insert: {
          completed?: boolean
          completed_at?: string
          course_id: string
          id?: string
          lesson_id: string
          student_email: string
          student_id?: string
          watch_minutes?: number
        }
        Update: {
          completed?: boolean
          completed_at?: string
          course_id?: string
          id?: string
          lesson_id?: string
          student_email?: string
          student_id?: string
          watch_minutes?: number
        }
        Relationships: [
          {
            foreignKeyName: "student_lesson_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      student_progress: {
        Row: {
          completed: boolean
          completed_at: string
          course_id: string
          id: string
          lesson_id: string
          quiz_score: number | null
          student_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string
          course_id: string
          id?: string
          lesson_id: string
          quiz_score?: number | null
          student_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string
          course_id?: string
          id?: string
          lesson_id?: string
          quiz_score?: number | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_quiz_attempts: {
        Row: {
          attempted_at: string
          correct_answers: number
          course_id: string
          id: string
          lesson_id: string | null
          passed: boolean
          quiz_title: string
          score_percent: number
          student_email: string
          student_id: string
          total_questions: number
        }
        Insert: {
          attempted_at?: string
          correct_answers?: number
          course_id: string
          id?: string
          lesson_id?: string | null
          passed?: boolean
          quiz_title?: string
          score_percent?: number
          student_email: string
          student_id?: string
          total_questions?: number
        }
        Update: {
          attempted_at?: string
          correct_answers?: number
          course_id?: string
          id?: string
          lesson_id?: string | null
          passed?: boolean
          quiz_title?: string
          score_percent?: number
          student_email?: string
          student_id?: string
          total_questions?: number
        }
        Relationships: [
          {
            foreignKeyName: "student_quiz_attempts_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      student_trades: {
        Row: {
          close_price: string
          direction: string
          executed_at: string
          id: string
          lot_size: number
          notes: string | null
          open_price: string
          pair: string
          pnl_usd: string
          return_pct: string
          selected_tp_level: number | null
          source: string
          status: string
          stop_loss_price: string | null
          student_email: string
          student_id: string | null
          take_profit_price: string | null
          traded_at: string
          trading_account_id: string
        }
        Insert: {
          close_price: string
          direction: string
          executed_at?: string
          id?: string
          lot_size?: number
          notes?: string | null
          open_price: string
          pair: string
          pnl_usd: string
          return_pct: string
          selected_tp_level?: number | null
          source?: string
          status?: string
          stop_loss_price?: string | null
          student_email?: string
          student_id?: string | null
          take_profit_price?: string | null
          traded_at?: string
          trading_account_id?: string
        }
        Update: {
          close_price?: string
          direction?: string
          executed_at?: string
          id?: string
          lot_size?: number
          notes?: string | null
          open_price?: string
          pair?: string
          pnl_usd?: string
          return_pct?: string
          selected_tp_level?: number | null
          source?: string
          status?: string
          stop_loss_price?: string | null
          student_email?: string
          student_id?: string | null
          take_profit_price?: string | null
          traded_at?: string
          trading_account_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_trades_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          account_balance_usd: number | null
          auth_user_id: string | null
          auto_copy_signals: boolean | null
          avatar_url: string | null
          best_streak_days: number | null
          client_balance: number | null
          client_equity: number | null
          country: string
          course_progress: number
          deposit_amount: number
          deposit_verified: boolean
          deposit_verified_at: string | null
          email: string
          exness_client_uid: string | null
          exness_email: string | null
          exness_id: string | null
          ftd_received: boolean | null
          full_name: string
          has_exness_account: boolean
          id: string
          kyc_passed: boolean | null
          last_active_date: string | null
          notify_sessions: boolean | null
          notify_signals: boolean | null
          partner_code: string
          partner_linked: boolean
          partner_linked_at: string | null
          phone: string | null
          preferred_session: string | null
          registration_date: string
          reward_usd: number | null
          risk_per_trade_pct: number | null
          role: string
          streak_days: number | null
          target_monthly_return_pct: number | null
          telegram_handle: string | null
          ticket_details: Json | null
          ticket_status: string
          tier: string
          trading_style: string | null
          updated_at: string
          username: string | null
          volume_lots: number | null
        }
        Insert: {
          account_balance_usd?: number | null
          auth_user_id?: string | null
          auto_copy_signals?: boolean | null
          avatar_url?: string | null
          best_streak_days?: number | null
          client_balance?: number | null
          client_equity?: number | null
          country?: string
          course_progress?: number
          deposit_amount?: number
          deposit_verified?: boolean
          deposit_verified_at?: string | null
          email: string
          exness_client_uid?: string | null
          exness_email?: string | null
          exness_id?: string | null
          ftd_received?: boolean | null
          full_name: string
          has_exness_account?: boolean
          id: string
          kyc_passed?: boolean | null
          last_active_date?: string | null
          notify_sessions?: boolean | null
          notify_signals?: boolean | null
          partner_code?: string
          partner_linked?: boolean
          partner_linked_at?: string | null
          phone?: string | null
          preferred_session?: string | null
          registration_date?: string
          reward_usd?: number | null
          risk_per_trade_pct?: number | null
          role?: string
          streak_days?: number | null
          target_monthly_return_pct?: number | null
          telegram_handle?: string | null
          ticket_details?: Json | null
          ticket_status?: string
          tier?: string
          trading_style?: string | null
          updated_at?: string
          username?: string | null
          volume_lots?: number | null
        }
        Update: {
          account_balance_usd?: number | null
          auth_user_id?: string | null
          auto_copy_signals?: boolean | null
          avatar_url?: string | null
          best_streak_days?: number | null
          client_balance?: number | null
          client_equity?: number | null
          country?: string
          course_progress?: number
          deposit_amount?: number
          deposit_verified?: boolean
          deposit_verified_at?: string | null
          email?: string
          exness_client_uid?: string | null
          exness_email?: string | null
          exness_id?: string | null
          ftd_received?: boolean | null
          full_name?: string
          has_exness_account?: boolean
          id?: string
          kyc_passed?: boolean | null
          last_active_date?: string | null
          notify_sessions?: boolean | null
          notify_signals?: boolean | null
          partner_code?: string
          partner_linked?: boolean
          partner_linked_at?: string | null
          phone?: string | null
          preferred_session?: string | null
          registration_date?: string
          reward_usd?: number | null
          risk_per_trade_pct?: number | null
          role?: string
          streak_days?: number | null
          target_monthly_return_pct?: number | null
          telegram_handle?: string | null
          ticket_details?: Json | null
          ticket_status?: string
          tier?: string
          trading_style?: string | null
          updated_at?: string
          username?: string | null
          volume_lots?: number | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          exness_email: string
          id: string
          partner_code: string
          resolved_at: string | null
          status: string
          student_id: string | null
          submitted_at: string
          ticket_ref: string
          trading_account_id: string
        }
        Insert: {
          exness_email: string
          id?: string
          partner_code?: string
          resolved_at?: string | null
          status?: string
          student_id?: string | null
          submitted_at?: string
          ticket_ref: string
          trading_account_id: string
        }
        Update: {
          exness_email?: string
          id?: string
          partner_code?: string
          resolved_at?: string | null
          status?: string
          student_id?: string | null
          submitted_at?: string
          ticket_ref?: string
          trading_account_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      trading_signals: {
        Row: {
          created_at: string
          created_by: string | null
          current_price: string | null
          direction: string
          entry_price: string
          floating_pnl_text: string | null
          id: string
          mentor_quote: string | null
          pair: string
          risk_reward: string
          status: string
          stop_loss: string
          take_profit: string
          thesis: string
          timeframe: string
          tp_levels: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          current_price?: string | null
          direction: string
          entry_price: string
          floating_pnl_text?: string | null
          id?: string
          mentor_quote?: string | null
          pair: string
          risk_reward?: string
          status?: string
          stop_loss: string
          take_profit: string
          thesis?: string
          timeframe?: string
          tp_levels?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          current_price?: string | null
          direction?: string
          entry_price?: string
          floating_pnl_text?: string | null
          id?: string
          mentor_quote?: string | null
          pair?: string
          risk_reward?: string
          status?: string
          stop_loss?: string
          take_profit?: string
          thesis?: string
          timeframe?: string
          tp_levels?: Json
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
