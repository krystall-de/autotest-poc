import { config } from './config';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app/app.module';
import {
  startDockerCompose,
  waitForHealthyContainer,
} from '../util/docker-util';
import { setupDatabase } from '../util/database-util';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

/* eslint-disable */

// Hint: Use `globalThis` to pass variables to global teardown.
declare global {
  var __APP__: INestApplication;
}

module.exports = async function () {
  console.log('\nSetting up...\n');

  // Start services that the app needs to run using docker-compose
  console.log('Starting service containers...\n');
  startDockerCompose(config.dockerProjectName, config.dockerComposeFile);

  // Wait for service containers to be ready
  console.log('Waiting for service containers to be healthy...\n');
  waitForHealthyContainer(`${config.dockerProjectName}-dummy-1`);

  // Prepare database
  console.log('Setting up database...\n');
  setupDatabase();

  // Bootstrap target app as testing module
  console.log('Bootstrapping application...\n');
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter()
  );
  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  globalThis.__APP__ = app;
};
