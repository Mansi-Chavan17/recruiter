// src/types/crm.ts
// Shapes for the CRM module. Share these with the backend team so the API
// returns the same field names.

export interface Client {
  id: string;
  name: string;
  industry: string;
  hq: string;
  website: string;
  companySize: string;
  usp: string;
  fundingStage: string;
  investors: string;
  productLines: string;
  businessDescription: string;
  spocRecruiters: string[];
  status: "Active" | "Inactive" | "New";
  clientContact: { name: string; email: string; phone: string };
  contractType: "Retainer" | "Contingency" | "RPO";
  feeStructure: string;
  contractStart: string;
  contractEnd: string;
  totalPositions: number;
  placements: number;
  activePositions: number;
  lastPlacementDate: string;
}

export interface Submission {
  id: string;
  candidateName: string;
  position: string;
  client: string;
  submittedBy: string;
  submissionDate: string;
  approvalStatus: "Pending" | "Approved" | "Rejected";
  approvedBy: string;
  sharedWithClientDate: string;
  clientFeedback:
    | "Awaiting"
    | "Shortlisted"
    | "Interview Scheduled"
    | "Rejected"
    | "On Hold"
    | "Offer Stage";
  currentStage: string;
  lastUpdated: string;
}

export interface WeeklyActivityRow {
  client: string;
  sourced: number;
  submitted: number;
  approved: number;
  feedbackReceived: number;
  interviewsScheduled: number;
  offersExtended: number;
  notes: string;
}

export interface RevenueRow {
  client: string;
  placementsThisPeriod: number;
  feeType: string;
  billedAmount: number;
  invoiceStatus: "Drafted" | "Sent" | "Paid" | "Overdue";
  paymentDate: string;
  outstanding: number;
}

export interface Offer {
  id: string;
  candidate: string;
  position: string;
  client: string;
  offerDate: string;
  offeredCTC: number;
  currentCTC: number;
  hikePercent: number;
  noticePeriod: string;
  expectedJoining: string;
  status: "Extended" | "Negotiation" | "Accepted" | "Declined" | "Revoked" | "Ghosted";
  joiningConfirmed: boolean;
  remarks: string;
}

export interface PositionPerformance {
  client: string;
  position: string;
  sourced: number;
  submitted: number;
  shortlisted: number;
  offered: number;
  joined: number;
  fillRate: string;
  timeToFill: string;
}

export interface RecruiterPerformance {
  recruiter: string;
  activePositions: number;
  candidatesSourced: number;
  submitted: number;
  approvalRate: string;
  placements: number;
  revenueGenerated: string;
}