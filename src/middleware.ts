import {
  NextResponse,
  type MiddlewareConfig,
  type NextRequest,
} from "next/server";

const publicRoutes = [
  {
    path: "/",
  },
  {
    path: "/sign-in",
    whenAuthenticated: "redirect",
  },
  {
    path: "/sign-up",
    whenAuthenticated: "redirect",
  },
  {
    path: "/forgot-password",
    whenAuthenticated: "redirect",
  },
  {
    path: "/reset-password",
    whenAuthenticated: "redirect",
  },
];

export const REDIRECT_WHEN_NOT_AUTHENTICATE_ROUTE = "/";
export const REDIRECT_WHEN_AUTHENTICATE_ROUTE = "/home";
export const TOKEN_LABEL_AUTH = "access_token";
export const TOKEN_LABEL_REFRESH = "refresh_token";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get(TOKEN_LABEL_AUTH);

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATE_ROUTE;

    return NextResponse.redirect(redirectUrl);
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATE_ROUTE;

    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
    // TODO: Checar se o JWT esta EXPIRADO.
    // TODO: Se sim mover os cookies e redirecionar para o login
    // TODO: Aplicar estrategia de refresh

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets).*)",
  ],
};
