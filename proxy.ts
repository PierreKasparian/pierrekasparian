import { NextResponse, type NextRequest } from "next/server";

const locales = ["fr", "en"] as const;
const defaultLocale = "fr";

function detectLocale(request: NextRequest): string {
  const accept = request.headers.get("accept-language");
  if (!accept) return defaultLocale;
  const preferred = accept
    .split(",")
    .map((p) => (p.split(";")[0] ?? "").trim().toLowerCase())
    .map((tag) => tag.split("-")[0] ?? "");
  for (const tag of preferred) {
    if ((locales as readonly string[]).includes(tag)) return tag;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  if (pathnameHasLocale) return;

  const locale = detectLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
