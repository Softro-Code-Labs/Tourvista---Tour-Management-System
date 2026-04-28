import { SERVER_ENV } from '@/config/env.server';
import { logger } from '@/core/logger';

export async function fetchSheet(tab: string) {
  try {
    const res = await fetch(`${SERVER_ENV.SHEETY_BASE_URL_CULTURE}/${tab}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
      throw new Error(
        `Sheety request failed for "${tab}" - ${res.status} ${res.statusText}`,
      );
    }

    const data = await res.json();

    if (!data) {
      throw new Error(`Empty response from sheet: "${tab}"`);
    }

    return data;
  } catch (error) {
    logger.error(`fetchSheet error [${tab}]: ${error}`);

    return {
      [tab]: [],
      error: true,
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
