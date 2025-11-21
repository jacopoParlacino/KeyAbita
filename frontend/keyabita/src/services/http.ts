const API_BASE_URL = 'http://localhost:8080/api';
const REQUEST_TIMEOUT = 10000; // 10 secondi

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
      'Access-Control-Allow-Origin': '*',
      ...(options.headers || {})
    },
    mode: 'cors',
    credentials: 'include'
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...config,
      signal: controller.signal
    });

    if (!response.ok) {
      const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      console.error(`[API Error] ${endpoint}:`, errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json() as T;
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error(`[Network Error] ${endpoint}:`, error.message);
      throw new Error('Errore di connessione al server. Verifica che il backend sia avviato su http://localhost:8080');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
