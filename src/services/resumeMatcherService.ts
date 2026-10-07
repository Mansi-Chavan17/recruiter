// src/services/resumeMatcherService.ts

import apiManager from "../api/apiManager";
import { ENDPOINTS } from "../api/endpoints";

// --- Interfaces ---
export interface ResumeMatcherFilters {
  positionName: string;
  preferredIndustry?: string;
  preferredFunction?: string;
  ctcRange?: {
    min?: number;
    max?: number;
  };
  experienceRange?: {
    min?: number;
    max?: number;
  };
  keywords: string;
  page?: number;
  limit?: number;
  industryEnabled?: boolean;
  functionEnabled?: boolean;
}
export interface WhatsAppCandidate {
  id: number;
  name: string;
  phone: string;
  email?: string;
}

export interface WhatsAppPayload extends Record<string, unknown> {
  type: "all" | "selected";
  positionId?: number;
  positionName?: string;
  candidates: WhatsAppCandidate[];
}

export interface WhatsAppResponse {
  success: boolean;
  sentCount: number;
}
export interface PositionOption {
  id: number;
  name: string;
}

export interface IndustryOption {
  id: number;
  name: string;
}

export interface FunctionOption {
  id: number;
  name: string;
}

export interface AiMatchedCandidate extends MatchedCandidate {
  aiScore: number;
  keywordMatches: number;
  matchReason?: string;
  experience?: number;
}

export interface AiMatcherResponse {
  candidates: AiMatchedCandidate[];
  totalMatched: number;
  prompt: string;
}

// AI Matcher Interfaces
export interface AiMatcherPayload extends Record<string, unknown> {
  batchId: string;
  candidateIds: number[];
  prompt: string;
  jobId?: number;
}

export interface MatchedCandidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  currentCtc: string;
  currentOrg: string;
  skills: string;
  resume: string | null;
  designation?: string;
}

export interface ResumeMatcherResponse {
  positionName: string;
  totalCandidates: number;
  candidates: MatchedCandidate[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
}

// --- Service ---
export const resumeMatcherService = {
  /**
   * Filter candidates based on resume matching criteria
   * @param filters - The filter criteria
   * @returns API response with matched candidates
   */
  filterCandidates: async (
    filters: ResumeMatcherFilters
  ): Promise<ApiResponse<ResumeMatcherResponse>> => {
    // Build the payload
    const payload = {
      positionName: filters.positionName,
      preferredIndustry: filters.industryEnabled 
        ? filters.preferredIndustry 
        : undefined,
      preferredFunction: filters.functionEnabled 
        ? filters.preferredFunction 
        : undefined,
      ctcRange: {
        min: filters.ctcRange?.min ? parseFloat(String(filters.ctcRange.min)) : undefined,
        max: filters.ctcRange?.max ? parseFloat(String(filters.ctcRange.max)) : undefined,
      },
      experienceRange: {
        min: filters.experienceRange?.min 
          ? parseInt(String(filters.experienceRange.min)) 
          : undefined,
        max: filters.experienceRange?.max 
          ? parseInt(String(filters.experienceRange.max)) 
          : undefined,
      },
      keywords: filters.keywords || undefined,
      page: filters.page || 1,
      limit: filters.limit || 15,
    };

    // Remove undefined values
    const cleanPayload = JSON.parse(JSON.stringify(payload));

    return apiManager.post<ApiResponse<ResumeMatcherResponse>>(
      ENDPOINTS.RESUME_MATCHER_FILTER,
      cleanPayload
    );
  },

  /**
   * Remove a candidate by id
   * @param id - candidate id
   */
  removeCandidate: async (id: number) => {
    const url = typeof ENDPOINTS.REMOVE_APPLICANT === "function"
      ? ENDPOINTS.REMOVE_APPLICANT(String(id))
      : `/api/applicants/${id}`;

    return apiManager.delete<ApiResponse<null>>(url);
  },

  /**
   * Search positions for autocomplete dropdown
   * @param query - search text
   */
  searchPositions: async (
    query: string
  ): Promise<ApiResponse<PositionOption[]>> => {
    if (!query || query.trim().length < 2) {
      return {
        status: 200,
        data: [],
        message: "Query too short",
      };
    }

    return apiManager.get<ApiResponse<PositionOption[]>>(
      ENDPOINTS.POSITION_AUTOCOMPLETE,
      {
        q: query.trim(),
      }
    );
  },

  /**
   * Search industries for autocomplete dropdown
   * @param query - search text
   */
  searchIndustries: async (
    query: string
  ): Promise<ApiResponse<IndustryOption[]>> => {
    // Allow empty query to get all industries
    if (query && query.trim().length > 0 && query.trim().length < 2) {
      return {
        status: 200,
        data: [],
        message: "Query too short",
      };
    }

    return apiManager.get<ApiResponse<IndustryOption[]>>(
      ENDPOINTS.INDUSTRY_AUTOCOMPLETE,
      {
        q: query.trim(),
      }
    );
  },

  /**
   * Search functions for autocomplete dropdown
   * @param query - search text
   */
  searchFunctions: async (
    query: string
  ): Promise<ApiResponse<FunctionOption[]>> => {
    // Allow empty query to get all functions
    if (query && query.trim().length > 0 && query.trim().length < 2) {
      return {
        status: 200,
        data: [],
        message: "Query too short",
      };
    }

    return apiManager.get<ApiResponse<FunctionOption[]>>(
      ENDPOINTS.FUNCTION_AUTOCOMPLETE,
      {
        q: query.trim(),
      }
    );
  },

  /**
   * Run AI Matcher to score candidates
   * @param payload - batchId, candidateIds, prompt, jobId
   */
  runAiMatcher: async (
    payload: AiMatcherPayload
  ): Promise<ApiResponse<{ batchId: string; totalCandidates: number }>> => {
    return apiManager.post<ApiResponse<{ batchId: string; totalCandidates: number }>>(
      ENDPOINTS.AI_MATCHER_RUN,
      payload
    );
  },

  /**
   * Get AI Matcher Results
   * @param batchId - The batch ID returned from runAiMatcher
   */
  getAiMatcherResults: async (
    batchId: string
  ): Promise<ApiResponse<{ status: string; candidates: AiMatchedCandidate[]; totalCandidates: number }>> => {
    return apiManager.get<ApiResponse<{ status: string; candidates: AiMatchedCandidate[]; totalCandidates: number }>>(
      `${ENDPOINTS.AI_MATCHER_RESULTS}/${batchId}`
    );
  },

  /**
   * Poll AI Matcher Status
   * @param batchId - The batch ID to check status for
   */
  pollAiMatcherStatus: async (
    batchId: string
  ): Promise<ApiResponse<{ status: string; progress: number; completedCandidates: number; totalCandidates: number }>> => {
    return apiManager.get<ApiResponse<{ status: string; progress: number; completedCandidates: number; totalCandidates: number }>>(
      `${ENDPOINTS.AI_MATCHER_STATUS}/${batchId}`
    );
  },


  sendWhatsApp: async (
  payload: WhatsAppPayload
): Promise<ApiResponse<WhatsAppResponse>> => {
  return apiManager.post<ApiResponse<WhatsAppResponse>>(
    ENDPOINTS.WHATSAPP_SEND_CANDIDATES,
    payload
  );
},
};