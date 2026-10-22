// // src/services/crmService.ts
// // Every CRM screen reads and writes through these functions. While the
// // backend is not ready they return mock data. When an API goes live, replace
// // that function's notReady(...) call with the real request and set USE_MOCK
// // to false. The components do not need to change.

// import {
//   clientsData,
//   submissionsData,
//   revenueData,
//   offersData,
//   positionPerformanceData,
//   recruiterPerformanceData,
//   recruitersData,
// } from "../mocks/crmData";
// import type {
//   Client,
//   Submission,
//   RevenueRow,
//   Offer,
//   PositionPerformance,
//   RecruiterPerformance,
// } from "../types/crm";

// const USE_MOCK = true;

// export interface ApiResponse<T> {
//   status: number;
//   data: T;
//   message?: string;
// }

// // Resolves after a short delay so loading states behave like a real request.
// const mockResponse = <T>(data: T, status = 200): Promise<ApiResponse<T>> =>
//   new Promise((resolve) =>
//     setTimeout(() => resolve({ status, data, message: "Mock data" }), 300)
//   );

// // Placeholder for the real request. Replace it with the same HTTP client
// // your other services (positionService, clientService) use.
// const notReady = <T>(endpoint: string): Promise<ApiResponse<T>> =>
//   Promise.reject(new Error(`CRM API not connected yet: ${endpoint}`));

// export const crmService = {
//   /* ---------- reads ---------- */

//   fetchClients: (): Promise<ApiResponse<Client[]>> =>
//     USE_MOCK ? mockResponse([...clientsData]) : notReady("GET /crm/clients"),

//   fetchSubmissions: (): Promise<ApiResponse<Submission[]>> =>
//     USE_MOCK
//       ? mockResponse([...submissionsData])
//       : notReady("GET /crm/submissions"),

//   fetchRevenue: (): Promise<ApiResponse<RevenueRow[]>> =>
//     USE_MOCK ? mockResponse([...revenueData]) : notReady("GET /crm/revenue"),

//   fetchOffers: (): Promise<ApiResponse<Offer[]>> =>
//     USE_MOCK ? mockResponse([...offersData]) : notReady("GET /crm/offers"),

//   fetchPositionPerformance: (): Promise<ApiResponse<PositionPerformance[]>> =>
//     USE_MOCK
//       ? mockResponse([...positionPerformanceData])
//       : notReady("GET /crm/position-performance"),

//   fetchRecruiterPerformance: (): Promise<ApiResponse<RecruiterPerformance[]>> =>
//     USE_MOCK
//       ? mockResponse([...recruiterPerformanceData])
//       : notReady("GET /crm/recruiter-performance"),

//   fetchRecruiters: (): Promise<ApiResponse<string[]>> =>
//     USE_MOCK ? mockResponse([...recruitersData]) : notReady("GET /crm/recruiters"),

//   /* ---------- writes ---------- */

//   createClient: (client: Omit<Client, "id">): Promise<ApiResponse<Client>> =>
//     USE_MOCK
//       ? mockResponse({ ...client, id: `CLI${Date.now()}` }, 201)
//       : notReady("POST /crm/clients"),

//   createSubmission: (
//     submission: Omit<Submission, "id">
//   ): Promise<ApiResponse<Submission>> =>
//     USE_MOCK
//       ? mockResponse({ ...submission, id: `SUB${Date.now()}` }, 201)
//       : notReady("POST /crm/submissions"),
// };



// src/services/crmService.ts
// Every CRM screen reads and writes through these functions.
// Live: offers (list, single, status update) and clients (directory, single, update).
// Still mock until their APIs are shared: create client, recruiters list,
// submissions, revenue, position performance, recruiter performance.

import apiManager from "../api/apiManager";
import { ENDPOINTS } from "../api/endpoints";
import {
  submissionsData,
  revenueData,
  positionPerformanceData,
  recruiterPerformanceData,
  recruitersData,
} from "../mocks/crmData";
import type {
  Client,
  Submission,
  RevenueRow,
  Offer,
  PositionPerformance,
  RecruiterPerformance,
} from "../types/crm";

/* ================================================================== */
/* Response shapes                                                     */
/* ================================================================== */

// Mock functions keep the old shape
export interface ApiResponse<T> {
  status: number;
  data: T;
  message?: string;
}

// CRM APIs return { success, data, message } instead of { status, data, message }
export interface CrmApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface CrmPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/* ---------- Offers (raw API) ---------- */

export interface CrmOfferRaw {
  id: string;
  recordId?: string;
  candidate: string;
  candidateId: string | null;
  position: string;
  jobId: string | null;
  client: string;
  clientId: string | null;
  offerDate: string | null;
  offeredCtc: string;
  offeredCtcRaw: number | null;
  currentCtc: string;
  currentCtcRaw: number | null;
  hike: string;
  hikePercent: number | null;
  notice: string;
  noticePeriodDays: number | null;
  expJoining: string | null;
  status: string;
  rawStatus: string;
  confirmed: string; // "Yes" or "--"
}

export interface CrmOfferSummary {
  totalOffers: number;
  accepted: number;
  declined: number;
  pending: number;
  offerToJoin: number; // percentage
}

export interface CrmOfferClient {
  id: string;
  name: string;
}

interface CrmOfferListRaw {
  summary: CrmOfferSummary;
  offers: CrmOfferRaw[];
  clients: CrmOfferClient[];
  statuses: string[];
  pagination: CrmPagination;
}

export interface CrmOfferPage {
  summary: CrmOfferSummary;
  offers: Offer[];
  clients: CrmOfferClient[];
  statuses: string[];
  pagination: CrmPagination;
}

export interface CrmOfferListParams {
  page: number;
  limit: number; // max 100
  status?: string; // "all" or an offer status
  clientId?: string;
  search?: string; // candidate, position or client name
}

/* ---------- Clients (raw API) ---------- */

// List rows return the first block of fields. The single-client response
// may return more, so other keys are read defensively by mapCrmClient.
export interface CrmClientRaw {
  id: string;
  clientName?: string;
  industry?: string | null;
  hq?: string | null;
  status?: string | null;
  noOfEmployees?: number | null;
  website?: string | null;
  spoc?: string | null;
  positions?: number | null;
  placed?: number | null;
  active?: number | null;
  [key: string]: unknown;
}

interface CrmClientListRaw {
  clients: CrmClientRaw[];
  pagination: CrmPagination;
}

// Declared with `type` (not `interface`) so it satisfies apiManager's
// `Record<string, unknown>` body constraint.
export type CrmClientUpdatePayload = {
  hq?: string;
  clientStatus?: string;
  description?: string;
  website?: string;
  noOfEmployees?: number;
};

/* ================================================================== */
/* Mappers: API → shapes used by the components                        */
/* ================================================================== */

const str = (v: unknown): string =>
  typeof v === "string" ? v : v === null || v === undefined ? "" : String(v);

export const mapCrmOffer = (o: CrmOfferRaw): Offer => ({
  id: String(o.id),
  recordId: o.recordId,
  candidateId: o.candidateId,
  jobId: o.jobId,
  clientId: o.clientId,
  candidate: o.candidate || "--",
  position: str(o.position).trim() || "--",
  client: o.client || "--",
  offerDate: o.offerDate || "--",
  offeredCTC: o.offeredCtcRaw ?? null,
  currentCTC: o.currentCtcRaw ?? null,
  hikePercent: o.hikePercent ?? null,
  noticePeriod: o.notice || "--",
  expectedJoining: o.expJoining || "--",
  status: o.status as Offer["status"],
  joiningConfirmed: o.confirmed === "Yes",
  remarks: "",
});

export const mapCrmClient = (c: CrmClientRaw): Client => {
  const spoc = str(c.spoc).trim();
  const contact = (c.clientContact && typeof c.clientContact === "object" ? c.clientContact : {}) as Record<string, unknown>;
  const employees = Number(c.noOfEmployees) || 0;

  return {
    id: String(c.id),
    name: str(c.clientName ?? c.name).trim() || "--",
    industry: str(c.industry) || "--",
    hq: str(c.hq) || "--",
    website: str(c.website),
    companySize: employees > 0 ? String(employees) : "",
    noOfEmployees: employees,
    usp: str(c.usp),
    fundingStage: str(c.fundingStage),
    investors: str(c.investors),
    productLines: str(c.productLines),
    businessDescription: str(c.businessDescription ?? c.description),
    spocRecruiters: Array.isArray(c.spocRecruiters)
      ? (c.spocRecruiters as unknown[]).map(str).filter(Boolean)
      : spoc && spoc !== "--"
        ? [spoc] // kept whole: some SPOC names contain commas ("Saincher, Richa")
        : [],
    status: (str(c.status ?? c.clientStatus) || "Active") as Client["status"],
    clientContact: {
      name: str(contact.name),
      email: str(contact.email),
      phone: str(contact.phone),
    },
    contractType: str(c.contractType) as Client["contractType"],
    feeStructure: str(c.feeStructure),
    contractStart: str(c.contractStart),
    contractEnd: str(c.contractEnd),
    totalPositions: Number(c.positions ?? c.totalPositions) || 0,
    placements: Number(c.placed ?? c.placements) || 0,
    activePositions: Number(c.active ?? c.activePositions) || 0,
    lastPlacementDate: str(c.lastPlacementDate),
  };
};

/* ================================================================== */
/* Mock helpers (for APIs not shared yet)                              */
/* ================================================================== */

// Resolves after a short delay so loading states behave like a real request.
const mockResponse = <T>(data: T, status = 200): Promise<ApiResponse<T>> =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ status, data, message: "Mock data" }), 300)
  );

/* ================================================================== */
/* Live requests                                                       */
/* ================================================================== */

const fetchClientsPage = (page: number, limit: number) =>
  apiManager.get<CrmApiResponse<CrmClientListRaw>>(ENDPOINTS.FETCH_CRM_CLIENTS, {
    page,
    limit,
    status: "all",
  });

export const crmService = {
  /* ---------- offers (live) ---------- */

  // One page of offers with KPIs, client list and statuses for the filters
  fetchOffers: async ({
    page,
    limit,
    status,
    clientId,
    search,
  }: CrmOfferListParams): Promise<CrmApiResponse<CrmOfferPage>> => {
    const params = {
      page,
      limit,
      status: status || "all",
      clientId: clientId || undefined,
      search: search?.trim() || undefined,
    };
    const res = await apiManager.get<CrmApiResponse<CrmOfferListRaw>>(
      ENDPOINTS.FETCH_CRM_OFFERS,
      params
    );
    return {
      ...res,
      data: {
        ...res.data,
        offers: (res.data?.offers || []).map(mapCrmOffer),
      },
    };
  },

  // Single offer
  fetchOfferById: async (id: string): Promise<CrmApiResponse<Offer>> => {
    const res = await apiManager.get<CrmApiResponse<CrmOfferRaw>>(
      ENDPOINTS.FETCH_SINGLE_CRM_OFFER(id)
    );
    return { ...res, data: mapCrmOffer(res.data) };
  },

  // Update offer status
  updateOfferStatus: async (id: string, status: string): Promise<CrmApiResponse<Offer>> => {
    const res = await apiManager.patch<CrmApiResponse<CrmOfferRaw>>(
      ENDPOINTS.UPDATE_CRM_OFFER(id),
      { status }
    );
    return { ...res, data: mapCrmOffer(res.data) };
  },

  /* ---------- clients (live) ---------- */

  // Every client across all pages (100 per call), so search, filters and
  // sorting work over the full directory in the browser
  fetchClients: async (): Promise<CrmApiResponse<Client[]>> => {
    const pageSize = 100;
    const first = await fetchClientsPage(1, pageSize);
    if (!first.success) return { ...first, data: [] };

    const rows = [...(first.data?.clients || [])];
    const totalPages = first.data?.pagination?.totalPages || 1;

    if (totalPages > 1) {
      const rest = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, i) => fetchClientsPage(i + 2, pageSize))
      );
      rest.forEach((res) => {
        if (!res.success) throw new Error(res.message || "Could not load all clients");
        rows.push(...(res.data?.clients || []));
      });
    }

    // De-duplicate by id in case records shift between pages
    const unique = Array.from(new Map(rows.map((c) => [String(c.id), c])).values());
    return { success: true, message: first.message, data: unique.map(mapCrmClient) };
  },

  // Single client (route to be confirmed by backend)
  fetchClientById: async (id: string): Promise<CrmApiResponse<Client | null>> => {
    const res = await apiManager.get<CrmApiResponse<CrmClientRaw>>(
      ENDPOINTS.FETCH_SINGLE_CRM_CLIENT(id)
    );
    const raw = res.data;
    return { ...res, data: raw && raw.id !== undefined ? mapCrmClient(raw) : null };
  },

  // Update client profile (hq, clientStatus, description, website, noOfEmployees)
  updateClient: (id: string, payload: CrmClientUpdatePayload) =>
    apiManager.patch<CrmApiResponse<CrmClientRaw>>(ENDPOINTS.UPDATE_CRM_CLIENT(id), payload),

  /* ---------- still mock ---------- */

  fetchSubmissions: (): Promise<ApiResponse<Submission[]>> =>
    mockResponse([...submissionsData]),

  fetchRevenue: (): Promise<ApiResponse<RevenueRow[]>> =>
    mockResponse([...revenueData]),

  fetchPositionPerformance: (): Promise<ApiResponse<PositionPerformance[]>> =>
    mockResponse([...positionPerformanceData]),

  fetchRecruiterPerformance: (): Promise<ApiResponse<RecruiterPerformance[]>> =>
    mockResponse([...recruiterPerformanceData]),

  fetchRecruiters: (): Promise<ApiResponse<string[]>> =>
    mockResponse([...recruitersData]),

  createClient: (client: Omit<Client, "id">): Promise<ApiResponse<Client>> =>
    mockResponse({ ...client, id: `CLI${Date.now()}` }, 201),

  createSubmission: (
    submission: Omit<Submission, "id">
  ): Promise<ApiResponse<Submission>> =>
    mockResponse({ ...submission, id: `SUB${Date.now()}` }, 201),
};