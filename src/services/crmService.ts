// src/services/crmService.ts
// Every CRM screen reads and writes through these functions. While the
// backend is not ready they return mock data. When an API goes live, replace
// that function's notReady(...) call with the real request and set USE_MOCK
// to false. The components do not need to change.

import {
  clientsData,
  submissionsData,
  revenueData,
  offersData,
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

const USE_MOCK = true;

export interface ApiResponse<T> {
  status: number;
  data: T;
  message?: string;
}

// Resolves after a short delay so loading states behave like a real request.
const mockResponse = <T>(data: T, status = 200): Promise<ApiResponse<T>> =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ status, data, message: "Mock data" }), 300)
  );

// Placeholder for the real request. Replace it with the same HTTP client
// your other services (positionService, clientService) use.
const notReady = <T>(endpoint: string): Promise<ApiResponse<T>> =>
  Promise.reject(new Error(`CRM API not connected yet: ${endpoint}`));

export const crmService = {
  /* ---------- reads ---------- */

  fetchClients: (): Promise<ApiResponse<Client[]>> =>
    USE_MOCK ? mockResponse([...clientsData]) : notReady("GET /crm/clients"),

  fetchSubmissions: (): Promise<ApiResponse<Submission[]>> =>
    USE_MOCK
      ? mockResponse([...submissionsData])
      : notReady("GET /crm/submissions"),

  fetchRevenue: (): Promise<ApiResponse<RevenueRow[]>> =>
    USE_MOCK ? mockResponse([...revenueData]) : notReady("GET /crm/revenue"),

  fetchOffers: (): Promise<ApiResponse<Offer[]>> =>
    USE_MOCK ? mockResponse([...offersData]) : notReady("GET /crm/offers"),

  fetchPositionPerformance: (): Promise<ApiResponse<PositionPerformance[]>> =>
    USE_MOCK
      ? mockResponse([...positionPerformanceData])
      : notReady("GET /crm/position-performance"),

  fetchRecruiterPerformance: (): Promise<ApiResponse<RecruiterPerformance[]>> =>
    USE_MOCK
      ? mockResponse([...recruiterPerformanceData])
      : notReady("GET /crm/recruiter-performance"),

  fetchRecruiters: (): Promise<ApiResponse<string[]>> =>
    USE_MOCK ? mockResponse([...recruitersData]) : notReady("GET /crm/recruiters"),

  /* ---------- writes ---------- */

  createClient: (client: Omit<Client, "id">): Promise<ApiResponse<Client>> =>
    USE_MOCK
      ? mockResponse({ ...client, id: `CLI${Date.now()}` }, 201)
      : notReady("POST /crm/clients"),

  createSubmission: (
    submission: Omit<Submission, "id">
  ): Promise<ApiResponse<Submission>> =>
    USE_MOCK
      ? mockResponse({ ...submission, id: `SUB${Date.now()}` }, 201)
      : notReady("POST /crm/submissions"),
};