// applicantService.ts
import apiManager from "../api/apiManager";
import { ENDPOINTS } from "../api/endpoints";

// --- Interfaces ---

interface Job {
  id: string;
  position: string;
  ctc: string;
  client_spoc: string | null;
  client: {
    client_name: string;
  };
}

interface Recruiter {
  id: string;
  name: string | null;
  email: string;
  designation: string | null;
  team: string | null;
}

interface CandidatePositionHistory {
  id: string;
  current_stage: string;
  last_modified: string;
  job: Job;
  recruiter: Recruiter[];
}

export interface Contact {
  email: string;
  phone: string | null;
  resume: string | null;
}

export interface CTC {
  current: string | null;
  expected: string | null;
}

export interface Applicant {
  email: ReactNode;
  id: string;
  candidate: string | null;
  current_role: string | null;
  company_name: string | null;
  location: string | null;
  ctc: CTC;
  noticePeriod: number | null;
  documents: number;
  latestUpload: string | null;
  status: string;
  contact: Contact;
}

export interface DetailedApplicant extends Applicant {
  email: string;
  education: string;
  gender: string;
  engagement_type: string;
  open_to_relocation: string;
  special_comments: string | null;
  candidate_position_history: CandidatePositionHistory[];
}

export interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
}

export interface PaginatedApplicantsResponse {
  applicants: Applicant[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

// Filters for fetchAll
export type ApplicantFilters = {
  search?: string;
  city?: string;
  minCTC?: number;
  maxCTC?: number;
  organization?: string;
  designation?: string;
};
export interface Document {
  id: string;
  applicantId: string;
  documentType: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
}
// --- Service ---

export const applicantService = {
  // Fetch all applicants with pagination + filters
   fetchAll: (page = 1, limit = 100, filters?: ApplicantFilters) => {
    const params: Record<string, string | number> = {
      page,
      limit,
    };

    // Add filters if provided
    if (filters) {
      if (filters.search) params.search = filters.search;
      if (filters.city) params.city = filters.city;
      if (filters.minCTC !== undefined) params.minCTC = filters.minCTC;
      if (filters.maxCTC !== undefined) params.maxCTC = filters.maxCTC;
      if (filters.organization) params.organization = filters.organization;
      if (filters.designation) params.designation = filters.designation;
    }

    return apiManager.get<ApiResponse<PaginatedApplicantsResponse>>(
      ENDPOINTS.FETCH_ALL_APPLICANTS,
      params
    );
  },


  // Fetch single applicant by ID
  fetchById: (id: string) =>
    apiManager.get<ApiResponse<DetailedApplicant>>(
      ENDPOINTS.FETCH_SINGLE_APPLICANT(id)
    ),
  fetchDocuments: (id: string) =>
    apiManager.get<ApiResponse<Document[]>>(
      ENDPOINTS.FETCH_SINGLE_APPLICANT_DOCUMENTS(id)
    ),
  addOrUpdate: (data: DetailedApplicant) =>
    apiManager.post<ApiResponse<DetailedApplicant>>(
      ENDPOINTS.ADD_OR_UPDATE_APPLICANT,
      data
    ),
  
uploadDocument: (applicantId: string, documentType: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file); // file object
  formData.append("applicantId", applicantId); // string
  formData.append("documentType", documentType); // string

  // Debug: Check what's inside FormData
  console.log("📤 FormData contents:");
  for (let [key, value] of formData.entries()) {
    console.log(`  ${key}:`, value);
  }

  // ⚡ Don't set Content-Type manually for FormData
  return apiManager.post<ApiResponse<Document>, FormData>(
    ENDPOINTS.UPLOAD_APPLICANT_DOCUMENT,
    formData
  );
},
 deleteDocument: (applicantId: string, documentId: string) => {
    if (!documentId) {
      throw new Error("Document ID is required for deletion");
    }

    return apiManager.delete<ApiResponse<{ message: string }>>(
      ENDPOINTS.DELETE_APPLICANT_DOCUMENT(applicantId, documentId)
    );
  },
}