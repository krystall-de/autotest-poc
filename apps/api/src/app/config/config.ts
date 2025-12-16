export interface AppConfig {
  host: string | undefined;
  port: number;
  corsOrigin: string[] | undefined;
}

export default (): AppConfig => ({
  host: process.env.API_HOST,
  port: process.env.API_PORT ? parseInt(process.env.API_PORT) : 3000,
  corsOrigin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').filter(Boolean)
    : undefined,
});
