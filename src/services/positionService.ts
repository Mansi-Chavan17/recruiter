import apiManager from "../api/apiManager";
import { ENDPOINTS } from "../api/endpoints";
import type { Applicant } from "./applicantService";

// --- Interfaces ---
export interface Position {
  id: string;
  title: string;
  client: string;
  priority: string;
  experience: string;
  mode: string;
  ctc: number;
  location: string;
  status: string;
  progress: string;
  daysSinceNoAction: number;
}

export interface PaginatedPositions {
  positions: Position[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
}

// --- Service ---
export const positionService = {
  // Fetch all positions (with optional pagination)
  fetchAll: (page = 1, limit = 2000) => {
    const params = { page, limit };
    return apiManager.get<ApiResponse<PaginatedPositions>>(
      ENDPOINTS.FETCH_ALL_POSITIONS,
      params
    );
  },

  // Fetch single position by ID
  fetchById: (id: string) =>
    apiManager.get<ApiResponse<Position>>(ENDPOINTS.FETCH_SINGLE_POSITION(id)),
  fetchAutocomplete: (search: string) => {
    return apiManager.get<Applicant[]>(ENDPOINTS.AUTOCOMPLETE_APPLICANTS, {
      search,
    });
  },
  tagCandidateToPosition: (positionId: string, payload: {
  candidateId: number;
  recruiterEmail: string;
  immediateJoiner: boolean;
  status: string;
}) => {
  return apiManager.post<ApiResponse<null>>(
    ENDPOINTS.TAG_CANDIDATE_TO_POSITION(positionId),
    payload
  );
},
updatePosition: (positionId: string, data: any) => {
  return apiManager.put<ApiResponse<Position>>(
    ENDPOINTS.UPDATE_POSITION(positionId),
    data
  );
},
createPosition: (payload: any) => {
    return apiManager.post<ApiResponse<Position>>(
      ENDPOINTS.CREATE_POSITION,
      payload
    );
  },

};