export const config = {
  port: process.env.API_PORT ? Number(process.env.API_PORT) : 3000,
  corsOrigin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : undefined,
};
