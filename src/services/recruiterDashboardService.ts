import apiManager from "../api/apiManager";
import { ENDPOINTS } from "../api/endpoints";
import type { ApiResponse } from "./positionService";

// --- Interfaces ---
export type PipelinePeriod = "day" | "week" | "month" | "custom";

export interface PipelineDashboardParams {
  period: PipelinePeriod;
  startDate?: string; // YYYY-MM-DD, required when period is "custom"
  endDate?: string; // YYYY-MM-DD, required when period is "custom"
}

export interface PipelineDateRange {
  period: PipelinePeriod;
  startDate: string;
  endDate: string;
}

export interface PipelineStats {
  activePositions: number;
  activeClients: number;
  candidatesTagged: number;
  profilesSubmitted: number;
  selectedByClient: number;
  interviewsScheduled: number;
  offersExtended: number;
}

export interface PipelinePosition {
  id: string;
  positionId: string;
  title: string;
  client: string;
  tagged: number;
  called: number;
  submitted: number;
  shared: number;
  selected: number;
  status: string;
}

export interface RecruiterPipelineDashboard {
  dateRange: PipelineDateRange;
  stats: PipelineStats;
  positions: PipelinePosition[];
}

// --- Service ---
export const recruiterDashboardService = {
  // Fetch pipeline dashboard for a period, or a custom date range
  fetchPipeline: ({ period, startDate, endDate }: PipelineDashboardParams) => {
    const params =
      period === "custom" ? { period, startDate, endDate } : { period };
    return apiManager.get<ApiResponse<RecruiterPipelineDashboard>>(
      ENDPOINTS.FETCH_RECRUITER_PIPELINE_DASHBOARD,
      params
    );
  },
};