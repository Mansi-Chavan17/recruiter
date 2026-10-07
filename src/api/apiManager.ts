import apiClient from "./apiClient";

type QueryParams = Record<string, string | number | boolean | undefined>;

const apiManager = {
  get: async <T>(url: string, params?: QueryParams): Promise<T> => {
    return await apiClient.get<T>(url, { params }).then(res => res.data);
  },

  post: async <
    T,
    B extends Record<string, unknown> | FormData = Record<string, unknown>
  >(
    url: string,
    body?: B,
    config?: Omit<Parameters<typeof apiClient.post>[2], "data">
  ): Promise<T> => {
    const headers = body instanceof FormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };

    return await apiClient.post<T>(url, body, { ...config, headers }).then(res => res.data);
  },

  put: async <
    T,
    B extends Record<string, unknown> | FormData = Record<string, unknown>
  >(
    url: string,
    body?: B,
    config?: Omit<Parameters<typeof apiClient.put>[2], "data">
  ): Promise<T> => {
    const headers = body instanceof FormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };

    return await apiClient.put<T>(url, body, { ...config, headers }).then(res => res.data);
  },

  delete: async <T>(url: string, config?: Omit<Parameters<typeof apiClient.delete>[1], "data">): Promise<T> => {
    return await apiClient.delete<T>(url, config).then(res => res.data);
  }
  
};

export default apiManager;