import { TestingModuleBuilder, Test } from '@nestjs/testing';
import { AppModule } from '../../src/app/app.module';
import { AuthGuard } from '../../src/app/auth/guards/auth.guard';
import { ExternalHttpClient } from '../../src/app/external/client/external.http-client';
import { mock, MockProxy } from 'jest-mock-extended';
import { MockAuthGuard } from '../mock/auth/auth.guard.mock';
import { createTestApp } from '../util/nestjs-util';
import { INestApplication } from '@nestjs/common';
import { resetDatabase } from '../util/database-util';
import { ExternalAxiosClient } from '../../src/app/external/client/external.axios-client';

declare global {
  var __TEST_APP__:
    | {
        app: INestApplication;
        mocks: {
          mockExternalHttpClient: MockProxy<ExternalHttpClient>;
          mockExternalAxiosClient: MockProxy<ExternalAxiosClient>;
        };
      }
    | undefined;
}

/**
 * Common hooks for all test suites
 */
beforeAll(async () => {
  resetDatabase();
});

afterAll(async () => {
  // Close the app after all tests
  if (globalThis.__TEST_APP__) {
    await globalThis.__TEST_APP__.app.close();
  }

  globalThis.__TEST_APP__ = undefined;
});

/**
 * Setup test application with mocks
 */
const setupTestAppWithMocks = async () => {
  // Prepare test doubles for external dependencies
  const mockExternalHttpClient = mock<ExternalHttpClient>();
  const mockExternalAxiosClient = mock<ExternalAxiosClient>();

  // Setup test module with overrides
  const moduleBuilder: TestingModuleBuilder = Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(AuthGuard)
    .useClass(MockAuthGuard)
    .overrideProvider(ExternalHttpClient)
    .useValue(mockExternalHttpClient)
    .overrideProvider(ExternalAxiosClient)
    .useValue(mockExternalAxiosClient);

  const app = await createTestApp(moduleBuilder);
  return {
    app,
    mocks: {
      mockExternalHttpClient,
      mockExternalAxiosClient,
    },
  };
};

/**
 * Setup before each test suite
 */
module.exports = async function () {
  console.log('\nSetting up test application...\n');
  const testApp = await setupTestAppWithMocks();
  globalThis.__TEST_APP__ = testApp;
};
