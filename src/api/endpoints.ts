export const ENDPOINTS = {
  FETCH_ALL_APPLICANTS: "/api/applicants/all",
  FETCH_SINGLE_APPLICANT: (id: string) => `/api/applicants/${id}`,
  FETCH_SINGLE_APPLICANT_DOCUMENTS: (id: string) => `/api/applicant/documents/${id}`,
  UPLOAD_APPLICANT_DOCUMENT: "/api/applicant/documents/upload",
  DELETE_APPLICANT_DOCUMENT: (applicantId: string, documentId: string) =>
    `/api/applicant/documents/${applicantId}/${documentId}`,
  RECRUITER_GOOGLE_LOGIN: "/api/auth/recruiterManager/google-login",
  ADD_OR_UPDATE_APPLICANT: "/api/applicants/addOrUpdate",
  FETCH_ALL_POSITIONS: "/api/recruiter/manager/positions",
  FETCH_SINGLE_POSITION: (id: string) => `/api/recruiter/position/${id}`,
  AUTOCOMPLETE_APPLICANTS: "/api/recruiter/applicants/search",
  TAG_CANDIDATE_TO_POSITION: (positionId: string) => `/api/recruiter/position/${positionId}/tag-candidate`,
  TAG_RECRUITER_TO_POSITION: (positionId: string) => `/api/recruiter/position/${positionId}/tag-recruiters`, // ADD THIS
  UPDATE_POSITION: (id: string) => `/api/recruiter/position/${id}`,
  CREATE_POSITION: "/api/recruiter/position/create",
  FETCH_ALL_SUBMISSIONS: "/api/submissions/all",
  FETCH_SINGLE_SUBMISSION: (id: string) => `/api/submissions/${id}`,
  FETCH_SUBMISSIONS_SUMMARY: "/api/submissions/manager/summary", 
  FETCH_SUBMISSIONS_BY_GROUP: (groupKey: string) => `/api/submissions/manager/group/${groupKey}`, 
  FETCH_CLIENTS_LIST: "/api/clients/list",
  UPDATE_SUBMISSION: (submissionId: string) => `/api/submissions/${submissionId}`,
  FETCH_RECRUITER_AUTOCOMPLETE: "/api/recruiter/recruiters/search", 
  RESUME_MATCHER_FILTER: "/api/ai-matcher/filter",
  POSITION_AUTOCOMPLETE: "/api/ai-matcher/positions/autocomplete",
  INDUSTRY_AUTOCOMPLETE: "/api/ai-matcher/industries/autocomplete",
  FUNCTION_AUTOCOMPLETE: "/api/ai-matcher/functions/autocomplete",
  // Delete applicant by id
  REMOVE_APPLICANT: (id: string) => `/api/applicants/${id}`,
  AI_MATCHER_RUN: "/api/ai-matcher/run",
   AI_MATCHER_RESULTS: "/api/ai-matcher/results", // + /:batchId
  AI_MATCHER_STATUS: "/api/ai-matcher/status",
  WHATSAPP_SEND_CANDIDATES: "/api/ai-matcher/whatsapp/send-candidates",
  FETCH_MANAGER_INTERVIEWS_THIS_WEEK:"/api/manager-dashboard/interview-this-week",
  FETCH_MANAGER_MATRICES :"api/manager-dashboard/matrices",
  FETCH_POSITION_PERFORMANCE :"api/manager-dashboard/position-performance",
  FETCH_RECRUITER_PERFORMANCE :"api/manager-dashboard/recruiter-performance",
  FETCH_CANDIDATE_SYNOPSIS :"api/manager-dashboard/candidate-synopsis",
  
GET_CONVERSATIONS_SUMMARY: "/api/whatsappconversation/summary",
GET_CONVERSATION_MESSAGES: (applicantId: string) => `/api/whatsappconversation/${applicantId}`,
SEND_WHATSAPP_MESSAGE: "/api/whatsapp/send",
  // FETCH_WHATSAPP_REPLY: "/api/whatsapp-reply/reply",
  FETCH_WHATSAPP_CONVERSATIONS: "/api/whatsapp-reply/manager/conversations",
  

};

