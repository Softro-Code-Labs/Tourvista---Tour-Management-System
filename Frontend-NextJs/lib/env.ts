export const ENV = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ?? '',
  CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '',
};

if (!ENV.BASE_URL) {
  console.warn('⚠️ NEXT_PUBLIC_BASE_URL is not defined');
}

if (!ENV.CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk publishable key');
}
