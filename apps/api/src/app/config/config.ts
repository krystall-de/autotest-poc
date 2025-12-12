export const config = {
  host: process.env.API_HOST,
  port: process.env.API_PORT ? Number(process.env.API_PORT) : 3000,
  corsOrigin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : undefined,
};
