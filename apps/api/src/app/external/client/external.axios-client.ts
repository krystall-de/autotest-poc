import { NotImplementedException } from '@nestjs/common';
import { ExternalData } from './external.client.types';
import axios from 'axios';

export class ExternalAxiosClient {
  async getAllData(): Promise<ExternalData[]> {
    throw new NotImplementedException();
  }

  async getDataById(id: number): Promise<ExternalData | null> {
    const response = await axios.get<ExternalData>(
      `https://api.example.com/data/${id}`
    );
    return response.data;
  }
}
