export const config = {
/*     env: process.env.ENV || 'LOCAL',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    protocol: process.env.PROTOCOL || 'http',
    get baseUrl() {
        return `${this.protocol}://${this.host}:${this.port}`;
    } */
   dockerProjectName: process.env.PROJECT_NAME || 'autotest-poc-sandbox',
   dockerComposeFile: process.env.DOCKER_COMPOSE_FILE || 'docker-compose.yml',
}