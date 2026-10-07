// clientService.ts
import apiManager from "../api/apiManager";
import { ENDPOINTS } from "../api/endpoints";

// ------- Interfaces --------

export interface Client {
  id: string;
  client_name: string;
}

export interface DetailedClient extends Client {
  annual_turnover: number;
  client_description: string;
  client_info_sheet: string;
  client_status: string;
  industry: string;
  no_of_employees: number;
  website: string;
  usp: string;
  top_players: string;
  new_updates: string;
  created: string;
}

export interface PaginatedClientsResponse {
  clients: Client[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
}

// Filters
export type ClientFilters = {
  search?: string;
};

// ------------ Service ------------

export const clientService = {
  /**
   * Fetch clients with search + pagination
   * Defaults -> first page, 10 items
   */
  fetchAll: (page = 1, limit = 1000, filters?: ClientFilters) => {
    const params: Record<string, string | number> = {
      page,
      limit
    };

    if (filters?.search) {
      params.search = filters.search;
    }

    return apiManager.get<ApiResponse<PaginatedClientsResponse>>(
      ENDPOINTS.FETCH_CLIENTS_LIST,
      params
    );
  },

  /**
   * Fetch single client by ID
   */
  // fetchById: (clientId: string) =>
  //   apiManager.get<ApiResponse<DetailedClient>>(
  //     ENDPOINTS.FETCH_SINGLE_CLIENT(clientId)
  //   )
};