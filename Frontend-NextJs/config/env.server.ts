export const SERVER_ENV = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  BACKEND_URL: process.env.BACKEND_URL,
};

if (!SERVER_ENV.BACKEND_URL) {
  throw new Error('❌ BACKEND_URL is not defined');
}
