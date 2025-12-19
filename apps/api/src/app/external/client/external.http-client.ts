import { Injectable, NotImplementedException } from '@nestjs/common';
import { ExternalData } from './external.client.types';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExternalHttpClient {
  constructor(private httpService: HttpService) {}

  async getAllData(): Promise<ExternalData[]> {
    const response = await firstValueFrom(
      this.httpService.get<ExternalData[]>('https://api.example.com/data')
    );
    return response.data;
  }

  async getDataById(_id: number): Promise<ExternalData | null> {
    throw new NotImplementedException();
  }
}
