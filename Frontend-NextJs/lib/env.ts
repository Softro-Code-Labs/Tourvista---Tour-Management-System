export const ENV = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ?? '',
};

if (!ENV.BASE_URL) {
  console.warn('⚠️ NEXT_PUBLIC_BASE_URL is not defined');
}
