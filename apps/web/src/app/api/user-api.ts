import { localApiClient } from './client/local-api-client';
import { User } from '@autotest-poc/api-contract';

export async function getUsersList(): Promise<User[]> {
  const response = await localApiClient.get<User[]>('/users');
  return response.data;
}
