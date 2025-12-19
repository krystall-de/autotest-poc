import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MockProxy } from 'jest-mock-extended';
import { ExternalHttpClient } from '../../../src/app/external/client/external.http-client';
import { ExternalAxiosClient } from '../../../src/app/external/client/external.axios-client';

describe('External API', () => {
  let app: INestApplication;
  let mockHttpClient: MockProxy<ExternalHttpClient>;
  let mockAxiosClient: MockProxy<ExternalAxiosClient>;

  beforeAll(async () => {
    const testApp = globalThis.__TEST_APP__;
    if (!testApp) {
      throw new Error('Test application not ready');
    }
    app = testApp.app;
    mockHttpClient = testApp.mocks.mockExternalHttpClient;
    mockAxiosClient = testApp.mocks.mockExternalAxiosClient;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /external', () => {
    it('should return all external data (success)', async () => {
      // Arrange
      const mockData = [
        { id: 1, info: 'Data 1', owner: 'example2.com' },
        { id: 2, info: 'Data 2', owner: 'example.com' },
      ];
      mockHttpClient.getAllData.mockResolvedValueOnce(mockData);

      // Act
      const res = await request(app.getHttpServer()).get('/external');

      // Assert
      expect(res.status).toBe(200);
      const expectedResult = [mockData[1]]; // Only data owned by 'example.com' user
      expect(res.body).toEqual(expectedResult);
      expect(mockHttpClient.getAllData).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /external/:id', () => {
    it('should return external data by ID (success)', async () => {
      // Arrange
      const mockData = { id: 1, info: 'Data 1', owner: 'example.com' };
      mockAxiosClient.getDataById.mockResolvedValueOnce(mockData);

      // Act
      const res = await request(app.getHttpServer()).get('/external/1');

      // Assert
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockData);
      expect(mockAxiosClient.getDataById).toHaveBeenCalledWith(1); // Validate parameter
    });

    it('should return 404 if data not found from external service (error)', async () => {
      // Arrange
      mockAxiosClient.getDataById.mockResolvedValueOnce(null);

      // Act
      const res = await request(app.getHttpServer()).get('/external/999');

      // Assert
      expect(res.status).toBe(404);
      expect(mockAxiosClient.getDataById).toHaveBeenCalledWith(999);
    });

    it('should return 404 if data is not owned by the user (error)', async () => {
      // Arrange
      const mockData = { id: 2, info: 'Data 2', owner: 'example2.com' };
      mockAxiosClient.getDataById.mockResolvedValueOnce(mockData);

      // Act
      const res = await request(app.getHttpServer()).get('/external/2');

      // Assert
      expect(res.status).toBe(404);
      expect(mockAxiosClient.getDataById).toHaveBeenCalledWith(2);
    });
  });
});
