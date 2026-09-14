import axios, { type AxiosInstance, type AxiosResponse, AxiosError } from 'axios';
import { ApiError } from './errors';
import type { ApiClientConfig } from './types';

/**
 * Creates and configures an Axios instance with interceptors for auth tokens and normalized errors.
 */
export function createApiClient(config: ApiClientConfig = {}): AxiosInstance {
  const { getToken, onUnauthorized, ...axiosConfig } = config;

  const instance = axios.create({
    baseURL: '/api',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    ...axiosConfig,
  });

  // Request Interceptor: Attach bearer token if available
  instance.interceptors.request.use(
    async (reqConfig) => {
      if (getToken) {
        const token = await getToken();
        if (token) {
          reqConfig.headers.Authorization = `Bearer ${token}`;
        }
      }
      return reqConfig;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor: Normalize errors into ApiError
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: unknown) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401 && onUnauthorized) {
          onUnauthorized();
        }

        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'An unexpected API error occurred';

        throw new ApiError(message, {
          status: error.response?.status,
          code: error.code,
          errors: error.response?.data?.errors,
          responseData: error.response?.data,
        });
      }

      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown network error'
      );
    }
  );

  return instance;
}

/**
 * Default singleton API client instance
 */
export const apiClient = createApiClient();
