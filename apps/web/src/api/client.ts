import { env } from '../env.js';

function buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>) {
  const url = new URL(path, env.VITE_API_BASE_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) return;
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
}

export async function apiGet<T>(
  path: string,
  options?: {
    token?: string;
    params?: Record<string, string | number | boolean | undefined>;
  },
): Promise<T> {
  const response = await fetch(buildUrl(path, options?.params), {
    method: 'GET',
    headers: {
      ...(options?.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}
