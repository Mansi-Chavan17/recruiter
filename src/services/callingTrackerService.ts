import apiManager from "../api/apiManager";
import { ENDPOINTS } from "../api/endpoints";
import type { ApiResponse } from "./positionService";

// --- Interfaces ---
export interface CallingTrackerRow {
  id: string;
  client: string;
  position: string;
  name: string;
  gender: string;
  company: string;
  designation: string;
  academics: string;
  batch: string;
  practiceArea: string;
  number: string;
  email: string;
  linkedin: string;
  status: string;
  remarks: string;
  dateOfEntry: string;
  createdAt: string;
  updatedAt: string;
  recruiterId: string;
}

// Declared with `type` (not `interface`) so it satisfies apiManager's
// `Record<string, unknown>` body constraint for post/put.
export type CallingTrackerPayload = {
  name: string;
  client: string;
  position: string;
  company: string;
  designation: string;
  academics: string;
  batch: string;
  practiceArea: string;
  number: string;
  email: string;
  linkedin: string;
  gender: string;
  status: string;
  remarks: string;
};

export interface CallingTrackerList {
  rows: CallingTrackerRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  statusCounts: Record<string, number>;
}

export interface CallingTrackerFilters {
  search?: string; // name, company, designation, email or phone
  position?: string; // "All" or a position title
  status?: string; // "All" or a calling status
}

export interface CallingTrackerListParams extends CallingTrackerFilters {
  page: number;
  limit: number;
}

export interface CallingTrackerExportRecord extends CallingTrackerRow {
  recruiter?: { name: string; email: string } | null;
}

export interface CallingTrackerExport {
  fileName: string;
  total: number;
  csv: string;
  records: CallingTrackerExportRecord[];
}

// Drop empty values and "All" so the backend only receives real filters
const buildFilterParams = ({ search, position, status }: CallingTrackerFilters) => ({
  search: search?.trim() || undefined,
  position: position && position !== "All" ? position : undefined,
  status: status || "All",
});

// --- Service ---
export const callingTrackerService = {
  // Fetch calling tracker rows (paginated, with filters)
  fetchAll: ({ page, limit, ...filters }: CallingTrackerListParams) => {
    const params = { page, limit, ...buildFilterParams(filters) };
    return apiManager.get<ApiResponse<CallingTrackerList>>(
      ENDPOINTS.FETCH_CALLING_TRACKER,
      params
    );
  },

  // Add a candidate to the calling tracker
  addCandidate: (payload: CallingTrackerPayload) => {
    return apiManager.post<ApiResponse<CallingTrackerRow>>(
      ENDPOINTS.ADD_CALLING_TRACKER_CANDIDATE,
      payload
    );
  },

  // Update all candidate details
  updateCandidate: (callingId: string, payload: CallingTrackerPayload) => {
    return apiManager.put<ApiResponse<CallingTrackerRow>>(
      ENDPOINTS.UPDATE_CALLING_TRACKER_CANDIDATE(callingId),
      payload
    );
  },

  // Update only the calling status (backend auto-syncs when status is "Selected")
  updateStatus: (callingId: string, status: string) => {
    return apiManager.patch<ApiResponse<CallingTrackerRow>>(
      ENDPOINTS.UPDATE_CALLING_TRACKER_STATUS(callingId),
      { status }
    );
  },

  // Position titles for the filter and form dropdowns
  fetchPositions: () =>
    apiManager.get<ApiResponse<string[]>>(ENDPOINTS.FETCH_CALLING_TRACKER_POSITIONS),

  // Calling statuses from the DB
  fetchStatuses: () =>
    apiManager.get<ApiResponse<string[]>>(ENDPOINTS.FETCH_CALLING_TRACKER_STATUSES),

  // Export as CSV (returned as a string inside JSON)
  exportCsv: (filters: CallingTrackerFilters = {}) =>
    apiManager.get<ApiResponse<CallingTrackerExport>>(
      ENDPOINTS.EXPORT_CALLING_TRACKER,
      buildFilterParams(filters)
    ),
};