import { PackagesResponse } from '../types/package.types';

export const packageService = {
  async getAll(params: Record<string, any> = {}): Promise<PackagesResponse> {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/v1/tours/?${query}`, {
      next: { revalidate: 3600 },
    });
    return res.json();
  },
};
