import apiManager from "../api/apiManager";
import { ENDPOINTS } from "../api/endpoints";

// --- Interfaces ---
export interface Submission {
  id: number;
  candidate_id?: string | null;
  candidate_name: string;
  email?: string;
  mobile_number?: string;
  location: string;
  position: string;
  client_name: string;
  status: string;
  recruiter: string;
  resume: string;
  notice_period: number | null;
  current_ctc: number | null;
  expected_ctc?: number | null;
  ctc_budget: number | null;
  submitted_on: string | null;
  current_last_organization?: string;
  experience?: string;
  current_city?: string;
  history?: SubmissionHistory[];
}

export interface SubmissionHistory {
  submitted?: string | null;
  status_update?: string | null;
}

export interface DetailedSubmission {
  // Personal Information
  candidate_id: string;
  candidate_name: string;
  email: string;
  mobile_number: string;
  current_last_organization: string;
  experience: string;
  current_city: string;
  current_ctc: string | number;
  expected_ctc: string | number;
  notice_period: string | number;
  
  // Position & Status Information
  position_name: string;
  client_name: string;
  recruiter: string;
  ctc_budget: string | number;
  position_status: string;
  date_of_submission: string | null;
  date_profile_shared: string | null;
  interview_date_time: string;
  client_spoc: string;
  laksh_spoc: string;
  candidate_status: string;
  screening_comments: string;
}

export interface GroupedSubmissions {
  [key: string]: Submission[];
}

export interface PaginatedSubmissions {
  submissions: GroupedSubmissions;
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

// Updated interface for summary response
export interface GroupSummary {
  submissions: Submission[];
  totalCount: number;
}

export interface SubmissionSummaryResponse {
  groups: Record<string, GroupSummary>;
  totalCount: number;
  totalGroups: number;      // NEW: Total number of groups
  currentPage: number;       // NEW: Current page of groups
  totalPages: number;        // NEW: Total pages of groups
}

export interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
}

export interface SubmissionFilters {
  search: any;
  position?: string;
  client_name?: string;
  candidate_name?: string;
  location?: string;
  groupBy?: "position" | "client_name" | "candidate_name" | "status";
  page?: number;
  limit?: number;
  groupPage?: number;        // NEW: For group pagination
  groupsPerPage?: number;    // NEW: Groups per page
}

export interface CandidateDocument {
  id: number;
  fileName: string;
  fileUrl: string;
  documentType: string;
  size?: string;
  uploadedAt: string;
  type?: string;
}

// --- Service ---
export const submissionService = {
  /**
   * Fetch summary (2 submissions per group with total counts)
   * NOW WITH SERVER-SIDE GROUP PAGINATION
   */
  fetchSummary: (filters: SubmissionFilters = {}, groupPage: number = 1) => {
    const params: Record<string, any> = {
      groupPage: groupPage,           // NEW: Current page number
      groupsPerPage: 10,              // NEW: Groups per page
    };
    
    if (filters.position) params.position = filters.position;
    if (filters.client_name) params.client_name = filters.client_name;
    if (filters.candidate_name) params.candidate_name = filters.candidate_name;
    if (filters.location) params.location = filters.location;
    if (filters.groupBy) params.groupBy = filters.groupBy;
    if (filters.search) params.search = filters.search; // ✅ ADDED


    console.log("📤 [fetchSummary] Request params:", params);

    return apiManager.get<ApiResponse<SubmissionSummaryResponse>>(
      ENDPOINTS.FETCH_SUBMISSIONS_SUMMARY,
      params
    );
  },

  /**
   * Fetch all submissions for a specific group
   * Use this when user clicks "View More"
   */
  fetchByGroup: (
    groupKey: string, 
    groupBy: string, 
    filters: SubmissionFilters = {}
  ) => {
    const params: Record<string, any> = {
      groupBy: groupBy,
    };
    
    if (filters.position) params.position = filters.position;
    if (filters.client_name) params.client_name = filters.client_name;
    if (filters.candidate_name) params.candidate_name = filters.candidate_name;
    if (filters.location) params.location = filters.location;

   

    return apiManager.get<ApiResponse<Submission[]>>(
      ENDPOINTS.FETCH_SUBMISSIONS_BY_GROUP(encodeURIComponent(groupKey)),
      params
    );
  },

  /**
   * Fetch all submissions with filters and pagination (fallback/legacy)
   */
  fetchAll: (filters: SubmissionFilters = {}) => {
    const params: Record<string, any> = {};
    
    if (filters.position) params.position = filters.position;
    if (filters.client_name) params.client_name = filters.client_name;
    if (filters.candidate_name) params.candidate_name = filters.candidate_name;
    if (filters.location) params.location = filters.location;
    if (filters.groupBy) params.groupBy = filters.groupBy;
    if (filters.page) params.page = filters.page;
    if (filters.limit) params.limit = filters.limit;

    return apiManager.get<ApiResponse<PaginatedSubmissions>>(
      ENDPOINTS.FETCH_ALL_SUBMISSIONS,
      params
    );
  },

  /**
   * Fetch single submission by ID
   */
  fetchById: (id: string) =>
    apiManager.get<ApiResponse<DetailedSubmission>>(
      ENDPOINTS.FETCH_SINGLE_SUBMISSION(id)
    ),

  /**
   * Update submission data
   */
 update: (id: string, data: any) => {
  // ✅ Direct payload bhejo, transformation mat karo
  console.log("🔧 Service: Sending payload:", data);
  
  return apiManager.put<ApiResponse<DetailedSubmission>>(
    ENDPOINTS.UPDATE_SUBMISSION(id),
    data  // ✅ Already transformed payload
  );
},
  /**
   * Update only submission status
   */
  // updateStatus: (id: string, status: string) =>
  //   apiManager.put<ApiResponse<{ status: string }>>(
  //     ENDPOINTS.UPDATE_SUBMISSION_STATUS(id),
  //     { status }
  //   ),

  // /**
  //  * Delete a document
  //  */
  // deleteDocument: (docId: string) =>
  //   apiManager.delete<ApiResponse<{ deleted: boolean }>>(
  //     ENDPOINTS.DELETE_DOCUMENT(docId)
  //   ),
};