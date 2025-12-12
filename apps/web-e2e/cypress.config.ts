import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'npx nx run @autotest-poc/web:dev',
        production: 'npx nx run @autotest-poc/web:preview',
      },
      ciWebServerCommand: 'npx nx run @autotest-poc/web:preview',
      ciBaseUrl: `http://localhost:${process.env.WEB_PREVIEW_PORT || 4300}`,
    }),
    baseUrl: `http://localhost:${process.env.WEB_PORT || 4200}`,
  },
});
