import { CultureResponse } from '../types/culture.types';

export const cultureService = {
  async getAll(params: Record<string, any> = {}): Promise<CultureResponse> {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/v1/culture/all-inclusive?${query}`);
    return res.json();
  },
};
