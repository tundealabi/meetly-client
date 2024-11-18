import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ServerApiResponse } from '../types';

export const SERVER_API_INSTANCE = axios.create({
  baseURL: process.env.SERVER_BASE_URL!,
});

const postRequest = async <T>(
  url: string,
  payload: Record<string, string | number>,
  config?: AxiosRequestConfig
): Promise<ServerApiResponse<T>> => {
  try {
    const response = await SERVER_API_INSTANCE.post<ServerApiResponse<T>>(
      url,
      payload,
      { ...config }
    );
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      // if (err.response?.status === HttpStatusCode.Unauthorized) {
      //   signUserOut();
      // }
      return err.response?.data;
    }
    return {
      errors: null,
      message: 'An unknown error occurred',
      state: 'error',
    };
  }
};

export const SERVER_API = { postRequest };
