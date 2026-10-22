export const ACADEMY_DOMAIN = "candlesticksacademy.online";
export function isAcademyHost(host: string) {
  return (
    host === ACADEMY_DOMAIN ||
    host === `master.${ACADEMY_DOMAIN}` ||
    host === `student.${ACADEMY_DOMAIN}`
  );
}
export function portalDestination(role: "admin" | "student", path?: string) {
  const safePath =
    path?.startsWith("/") && !path.startsWith("//")
      ? path
      : role === "admin"
        ? "/admin"
        : "/dashboard";
  return `https://${role === "admin" ? "master" : "student"}.${ACADEMY_DOMAIN}${safePath}`;
}
export function logoutDestination(host: string) {
  return isAcademyHost(host) ? `https://${ACADEMY_DOMAIN}/` : "/";
}
