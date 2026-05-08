import { AttractionResponse } from '../types/attractions.types';

export const attractionsService = {
  async getAll(params: Record<string, any> = {}): Promise<AttractionResponse> {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/v1/attractions/all-inclusive?${query}`);
    return res.json();
  },
};
