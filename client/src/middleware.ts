import { NextResponse } from "next/server";

// const isAgentRoute = createRouteMatcher(["/agents(.*)"]);
// const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export function middleware(request: Request) {
  const url = new URL(request.url);
  const origin = url.origin;
  const pathname = url.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  requestHeaders.set("x-origin", origin);
  requestHeaders.set("x-pathname", pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// export function middleware(request: Request) {
//   const url = new URL(request.url);
//   const origin = url.origin;
//   const pathname = url.pathname;
//   const requestHeaders = new Headers(request.headers);
//   requestHeaders.set("x-url", request.url);
//   requestHeaders.set("x-origin", origin);
//   requestHeaders.set("x-pathname", pathname);

//   return NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   });
// }

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
