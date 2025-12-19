import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { TestingModule, TestingModuleBuilder } from '@nestjs/testing';

export const createTestApp = async (builder: TestingModuleBuilder) => {
  const moduleFixture: TestingModule = await builder.compile();

  const app = moduleFixture.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter()
  );
  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  return app;
};
