export const ENV = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',

  DATABASE_URL: process.env.DATABASE_URL ?? '',
  SHEETY_BASE_URL_ATTRACTIONS: process.env.SHEETY_BASE_URL_ATTRACTIONS ?? '',
  SHEETY_BASE_URL_CULTURE: process.env.SHEETY_BASE_URL_CULTURE ?? '',
  SHEETY_BASE_URL_TOURS: process.env.SHEETY_BASE_URL_TOURS ?? '',

  CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '',
  CLERK_FALLBACK_REDIRECT_URL:
    process.env.NEXT_PUBLIC_CLERK_FALLBACK_REDIRECT_URL ?? '',
};

if (!ENV.DATABASE_URL) {
  throw new Error('⚠️ DATABASE_URL is not defined');
}

if (
  !ENV.SHEETY_BASE_URL_ATTRACTIONS ||
  !ENV.SHEETY_BASE_URL_CULTURE ||
  !ENV.SHEETY_BASE_URL_TOURS
) {
  throw new Error('⚠️ SHEETY_BASE_URL is not defined');
}

if (!ENV.CLERK_PUBLISHABLE_KEY) {
  throw new Error('⚠️ CLERK_PUBLISHABLE_KEY is not defined');
}

if (!ENV.CLERK_FALLBACK_REDIRECT_URL) {
  throw new Error('⚠️ CLERK_FALLBACK_REDIRECT_URL is not defined');
}
