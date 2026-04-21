import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtected = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  if (isProtected(req) && !userId) {
    return redirectToSignIn();
  }
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
