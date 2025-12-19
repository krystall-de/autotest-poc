import { Injectable } from '@nestjs/common';
import { ExternalHttpClient } from './client/external.http-client';
import { ExternalAxiosClient } from './client/external.axios-client';
import { ExternalData } from './client/external.client.types';
import { AuthUser } from '../auth/types/auth.types';

@Injectable()
export class ExternalService {
  constructor(
    private httpClient: ExternalHttpClient,
    private axiosClient: ExternalAxiosClient
  ) {}

  private isOwnedData(data: ExternalData, currUser: AuthUser) {
    const userEmailDomain = currUser.email.split('@')[1];
    return data.owner === userEmailDomain;
  }

  async getAllData(currUser: AuthUser) {
    const allData = await this.httpClient.getAllData();
    return allData.filter((data) => this.isOwnedData(data, currUser));
  }

  async getDataById(id: number, currUser: AuthUser) {
    const data = await this.axiosClient.getDataById(id);
    if (!data) return null;
    if (!this.isOwnedData(data, currUser)) return null;
    return data;
  }
}
