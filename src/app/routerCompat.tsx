// Small adapter so the original pages keep their link/navigation calls while running on TanStack Router.
import {
  Link as TsLink,
  Outlet,
  useNavigate as useTsNavigate,
  useParams as useTsParams,
  useRouterState,
  useRouter,
} from "@tanstack/react-router";
import { forwardRef, useCallback, type AnchorHTMLAttributes, type ReactNode } from "react";

export { Outlet };

type To = string | { pathname?: string; search?: string; hash?: string };

function toHref(to: To): string {
  if (typeof to === "string") return to;
  return `${to.pathname ?? ""}${to.search ?? ""}${to.hash ?? ""}`;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: To;
  replace?: boolean;
  state?: unknown;
  children?: ReactNode;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, replace, state: _state, ...rest },
  ref,
) {
  const AnyLink = TsLink as any;
  return <AnyLink ref={ref} href={toHref(to)} to={toHref(to)} replace={replace} {...rest} />;
});

type NavLinkProps = Omit<LinkProps, "className" | "children"> & {
  end?: boolean;
  className?: string | ((s: { isActive: boolean }) => string);
  children?: ReactNode | ((s: { isActive: boolean }) => ReactNode);
};

export function NavLink({ to, end, className, children, ...rest }: NavLinkProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const href = toHref(to).split(/[?#]/)[0] ?? "";
  const isActive = end
    ? pathname === href
    : pathname === href || pathname.startsWith(href.endsWith("/") ? href : href + "/");
  const cls =
    typeof className === "function"
      ? className({ isActive })
      : [className, isActive ? "active" : ""].filter(Boolean).join(" ");
  return (
    <Link
      to={to}
      className={cls || undefined}
      aria-current={isActive ? "page" : undefined}
      {...rest}
    >
      {typeof children === "function" ? children({ isActive }) : children}
    </Link>
  );
}

export function useNavigate() {
  const navigate = useTsNavigate();
  const router = useRouter();
  return useCallback(
    (to: To | number, opts?: { replace?: boolean; state?: unknown }) => {
      if (typeof to === "number") {
        router.history.go(to);
        return;
      }
      void navigate({ href: toHref(to), replace: opts?.replace } as any);
    },
    [navigate, router],
  );
}

export function useParams<
  T extends Record<string, string | undefined> = Record<string, string | undefined>,
>(): T {
  return (useTsParams as any)({ strict: false }) as T;
}

export function useLocation() {
  const loc = useRouterState({ select: (s) => s.location });
  return {
    pathname: loc.pathname,
    search: loc.searchStr ?? "",
    hash: loc.hash ? `#${loc.hash}` : "",
    state: (loc.state as any)?.usr ?? null,
    key: (loc.state as any)?.key ?? "default",
  };
}
