import { createRequest } from './core';

export const authApi = {
  get: (url: string) => createRequest(url, { method: 'GET' }),
  post: (url: string, body: any) => {
    const isFormData = body instanceof FormData;
    return createRequest(url, {
      method: 'POST',
      body: isFormData ? body : JSON.stringify(body),
    });
  },
  patch: (url: string, body?: any) => {
    const isFormData = body instanceof FormData;
    return createRequest(url, {
      method: 'PATCH',
      body: isFormData ? body : JSON.stringify(body),
    });
  },
  delete: (url: string) => createRequest(url, { method: 'DELETE' }),
};

export const publicApi = {
  get: (url: string) => createRequest(url, { method: 'GET' }, false),
  post: (url: string, body: any) =>
    createRequest(url, { method: 'POST', body: JSON.stringify(body) }, false),
};
