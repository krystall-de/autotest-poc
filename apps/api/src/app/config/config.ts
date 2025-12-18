export interface AppConfig {
  systemName: string;
  host?: string;
  port: number;
  corsOrigin?: string[];
  jwtSecret: string;
}

export default (): AppConfig => ({
  systemName: process.env.PROJECT_NAME || 'api',
  host: process.env.API_HOST,
  port: process.env.API_PORT ? parseInt(process.env.API_PORT) : 3000,
  corsOrigin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').filter(Boolean)
    : undefined,
  jwtSecret: process.env.JWT_SECRET || '',
});
