import { ShowcaseResponse } from '../types/showcases.types';

export const showcasesService = {
  async getAll(params: Record<string, any> = {}): Promise<ShowcaseResponse> {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/v1/showcases/all-inclusive?${query}`);
    return res.json();
  },
};
