const API_BASE_URL = '/api';

export interface HttpOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function http<T = unknown>(
  endpoint: string,
  options: HttpOptions = {}
): Promise<T> {
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  return response.json() as Promise<T>;
}
