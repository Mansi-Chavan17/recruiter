import apiManager from "../api/apiManager";
import { ENDPOINTS } from "../api/endpoints";
import type { ApiResponse } from "./positionService";

// --- Interfaces ---
export interface BDDiscussion {
  type: "agenda" | "requirements" | "objection" | "nextStep" | "internal";
  text: string;
  tags?: string[];
  assignee?: string;
  dueDate?: string;
  done?: boolean;
}

export interface BDProposal {
  title: string;
  version: string;
  status: string;
  serviceLine: string;
  scope: string;
  deliverables: string;
  approver: string;
  approvedDate: string;
  sentDate: string;
  viewCount: number;
}

export interface BDNegotiationEntry {
  date: string;
  note: string;
}

export interface BDCommercials {
  pricingModel: string;
  quotedAmount: string;
  discount: string;
  paymentTerms: string;
  contractDuration: string;
  startDate: string;
  negotiationLog: BDNegotiationEntry[];
}

export interface BDFollowUp {
  id: string;
  note: string;
  dueDate: string;
  done: boolean;
  completedDate?: string | null;
  snoozedTo?: string | null;
}

export interface BDConversionChecklist {
  agreementSigned: boolean;
  commercialsLocked: boolean;
  spocAssigned: boolean;
}

export interface BDConversion {
  dealValue: string;
  serviceLine: string;
  contractStart: string;
  source: string;
  checklist: BDConversionChecklist;
}

// Meeting as returned by the API (many fields can be null or partially filled)
export interface BDMeeting {
  id: string;
  recordId?: string;
  company: string;
  person: string;
  designation: string | null;
  email: string;
  phone: string | null;
  linkedin: string | null;
  meetingDate: string;
  meetingType: string;
  bdOwner: string | null;
  source: string | null;
  location: string | null;
  industry: string | null;
  status: string;
  converted: boolean;
  discussions: BDDiscussion[] | null;
  proposal: Partial<BDProposal> | null;
  commercials: Partial<BDCommercials> | null;
  followUps: BDFollowUp[] | null;
  conversion: BDConversion | null;
  lossReason: string | null;
  remarks: string | null;
  recruiterId?: string;
  createdAt?: string;
  updatedAt?: string;
  recruiter?: { id: string; name: string; email: string } | null;
}

export interface BDMeetingKpis {
  totalMeetings: number;
  warmLeads: number;
  hotLeads: number;
  converted: number;
  conversionRate: string;
  proposalsSent: number;
}

export interface BDPipelineSummary {
  noPotential: number;
  warm: number;
  hot: number;
  converted: number;
}

export interface BDMeetingList {
  kpis: BDMeetingKpis;
  pipelineSummary: BDPipelineSummary;
  meetings: BDMeeting[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BDMeetingOptions {
  meetingTypes: string[];
  statuses: string[];
  sources: string[];
  pricingModels: string[];
  serviceLines: string[];
  lossReasons: string[];
  proposalStatuses: string[];
}

export interface BDMeetingListParams {
  search?: string;
  type?: string; // "All" or a meeting type
  status?: string; // "All" or a lead status
  page: number;
  limit: number;
}

// Declared with `type` (not `interface`) so they satisfy apiManager's
// `Record<string, unknown>` body constraint for post/put.
export type BDMeetingCreatePayload = {
  company: string;
  person: string;
  email: string;
  designation?: string;
  phone?: string;
  linkedin?: string;
  meetingDate?: string;
  meetingType?: string;
  source?: string;
  location?: string;
  industry?: string;
  status?: string;
  discussions?: BDDiscussion[];
  remarks?: string;
};

export type BDMeetingUpdatePayload = Partial<BDMeetingCreatePayload> & {
  converted?: boolean;
  proposal?: Partial<BDProposal>;
  commercials?: Partial<BDCommercials>;
  followUps?: BDFollowUp[];
  conversion?: BDConversion | null;
  lossReason?: string | null;
};

// --- Service ---
const fetchMeetings = ({ search, type, status, page, limit }: BDMeetingListParams) => {
  const params = {
    search: search?.trim() || undefined,
    type: type || "All",
    status: status || "All",
    page,
    limit,
  };
  return apiManager.get<ApiResponse<BDMeetingList>>(ENDPOINTS.FETCH_BD_MEETINGS, params);
};

export const bdService = {
  // Fetch one page of meetings (with filters), plus KPIs and pipeline summary
  fetchMeetings,

  // Fetch every meeting across all pages (for Dashboard, Pipeline, Proposals,
  // Follow-ups, Clients and Reports, which are computed from the full list)
  fetchAllMeetings: async (pageSize = 200): Promise<ApiResponse<BDMeetingList>> => {
    const first = await fetchMeetings({ page: 1, limit: pageSize });
    if (first.status !== 200) return first;

    const meetings = [...(first.data.meetings || [])];
    for (let page = 2; page <= (first.data.totalPages || 1); page++) {
      const res = await fetchMeetings({ page, limit: pageSize });
      if (res.status !== 200) break;
      meetings.push(...(res.data.meetings || []));
    }
    return { ...first, data: { ...first.data, meetings } };
  },

  // Fetch single meeting by ID
  fetchMeetingById: (id: string) =>
    apiManager.get<ApiResponse<BDMeeting>>(ENDPOINTS.FETCH_SINGLE_BD_MEETING(id)),

  // Log a new meeting
  createMeeting: (payload: BDMeetingCreatePayload) => {
    return apiManager.post<ApiResponse<BDMeeting>>(ENDPOINTS.CREATE_BD_MEETING, payload);
  },

  // Update a meeting (send only the fields that changed)
  updateMeeting: (id: string, payload: BDMeetingUpdatePayload) => {
    return apiManager.put<ApiResponse<BDMeeting>>(ENDPOINTS.UPDATE_BD_MEETING(id), payload);
  },

  // Delete a meeting
  deleteMeeting: (id: string) =>
    apiManager.delete<ApiResponse<{ success: boolean }>>(ENDPOINTS.DELETE_BD_MEETING(id)),

  // Dropdown options (meeting types, statuses, sources, etc.)
  fetchOptions: () =>
    apiManager.get<ApiResponse<BDMeetingOptions>>(ENDPOINTS.FETCH_BD_MEETING_OPTIONS),
};