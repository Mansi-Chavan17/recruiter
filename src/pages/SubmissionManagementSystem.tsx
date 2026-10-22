// import { useState, useMemo, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import {
//   Search,
//   Filter,
//   FileText,
//   Phone,
//   Mail,
//   Building,
//   Clock,
//   User,
//   DollarSign,
//   MapPin,
//   X,
//   ChevronDown,
//   Upload,
//   Download,
//   Trash2,
//   Plus,
//   Loader,
//   IdCard,
//   BriefcaseBusiness,
//   MessageSquare,
// } from "lucide-react";
// import { submissionService } from "../services/submissionService";
// import type { Submission, DetailedSubmission, SubmissionFilters, CandidateDocument } from "../services/submissionService";
// import { applicantService } from "../services/applicantService";
// import { candidateStatusOptions } from "../constants/dropdown";
// import Select from "react-select";

// const SubmissionManagementSystem = () => {
//   const navigate = useNavigate();

//   // Document state
//   const [candidateDocuments, setCandidateDocuments] = useState<CandidateDocument[]>([]);
//   const [groupBy, setGroupBy] = useState<"position" | "client_name" | "candidate_name" | "status">("position");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     positionName: "",
//     clientName: "",
//     candidateName: "",
//     location: "",
//   });
//   const [selectedCandidate, setSelectedCandidate] = useState<DetailedSubmission | null>(null);
//   const [originalCandidate, setOriginalCandidate] = useState<DetailedSubmission | null>(null);
//   const [showFilters, setShowFilters] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [detailTab, setDetailTab] = useState<"personal" | "position">("personal");
//   const [showDocumentModal, setShowDocumentModal] = useState(false);
//   const [currentCandidateId, setCurrentCandidateId] = useState<number | null>(null);
//   const [documentForm, setDocumentForm] = useState({
//     name: "",
//     type: "Resume",
//     file: null as File | null,
//   });

//   // API states
//   const [groupedData, setGroupedData] = useState<Record<string, { submissions: Submission[], totalCount: number }>>({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
  
//   // Backend pagination metadata
//   const [backendTotalGroups, setBackendTotalGroups] = useState(0);
//   const [backendTotalPages, setBackendTotalPages] = useState(0);
//   const [backendCurrentPage, setBackendCurrentPage] = useState(1);
  
//   // Track expanded groups
//   const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
//   const [loadingGroups, setLoadingGroups] = useState<Record<string, boolean>>({});
  
//   // Group-level pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const GROUPS_PER_PAGE = 10;

//   // ─── Comment Modal State (for select/reject with mandatory comment) ───
//   const COMMENT_REQUIRED_STATUSES = [
//     "Final Select", "R1 select", "R2 select", "R3 Select",
//     "Client Reject", "Internal Reject", "Profile Reject", "Reject",
//     "R1 reject", "R2 reject", "R3 reject", "Offer Drop", "Dropout",
//   ];
//   const [commentModalOpen, setCommentModalOpen] = useState(false);
//   const [commentModalData, setCommentModalData] = useState<{
//     submissionId: number;
//     candidateName: string;
//     newStatus: string;
//     comment: string;
//   } | null>(null);

//   const isRejectStatus = (status: string) =>
//     status.toLowerCase().includes("reject") || status === "Offer Drop" || status === "Dropout";

//   const closeCommentModal = () => {
//     setCommentModalOpen(false);
//     setCommentModalData(null);
//   };

//   const fetchSummary = async (page: number = 1) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const apiFilters: SubmissionFilters = {
//         position: filters.positionName || undefined,
//         client_name: filters.clientName || undefined,
//         candidate_name: filters.candidateName || undefined,
//         location: filters.location || undefined,
//         groupBy: groupBy,
//         search: searchTerm || undefined, 
//       };

//       const response = await submissionService.fetchSummary(apiFilters, page);

//       if (response.status === 200) {
//         setGroupedData(response.data.groups);
//         setExpandedGroups({});
//         setBackendTotalGroups(response.data.totalGroups || 0);
//         setBackendTotalPages(response.data.totalPages || 0);
//         setBackendCurrentPage(response.data.currentPage || page);
        
//         console.log("📊 Backend Pagination info:", {
//           totalGroups: response.data.totalGroups,
//           currentPage: response.data.currentPage,
//           totalPages: response.data.totalPages,
//         });
//       }
//     } catch (err: any) {
//       setError(err?.message || "Failed to fetch submissions");
//       console.error("Error fetching summary:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewMore = async (groupName: string) => {
//     if (expandedGroups[groupName]) {
//       setExpandedGroups((prev) => ({ ...prev, [groupName]: false }));
//       return;
//     }

//     setLoadingGroups((prev) => ({ ...prev, [groupName]: true }));

//     try {
//       const apiFilters: SubmissionFilters = {
//         position: filters.positionName || undefined,
//         client_name: filters.clientName || undefined,
//         candidate_name: filters.candidateName || undefined,
//         location: filters.location || undefined,
//       };

//       const response = await submissionService.fetchByGroup(
//         groupName,
//         groupBy,
//         apiFilters
//       );

//       if (response.status === 200) {
//         setGroupedData((prev) => ({
//           ...prev,
//           [groupName]: {
//             submissions: response.data,
//             totalCount: response.data.length,
//           },
//         }));
//         setExpandedGroups((prev) => ({ ...prev, [groupName]: true }));
//       }
//     } catch (err: any) {
//       console.error("Error loading group:", err);
//       setError("Failed to load group data");
//     } finally {
//       setLoadingGroups((prev) => ({ ...prev, [groupName]: false }));
//     }
//   };

//   const handleCandidateClick = async (submission: Submission) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await submissionService.fetchById(submission.id.toString());

//       if (response.status === 200) {
//         const detailedCandidate = {
//           ...response.data,
//           id: submission.id,
//         };
        
//         setSelectedCandidate(detailedCandidate);
//         setOriginalCandidate(detailedCandidate);
//         setIsEditing(false);

//         if (response.data.candidate_id) {
//           await fetchCandidateDocuments(response.data.candidate_id);
//         }
//       }
//     } catch (err: any) {
//       console.error("Error fetching candidate details:", err);
//       setError("Failed to load candidate details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCandidateDocuments = async (candidateId: string) => {
//     try {
//       const response = await applicantService.fetchDocuments(candidateId);
//       if (response.status === 200) {
//         setCandidateDocuments(response.data || []);
//       }
//     } catch (err: any) {
//       console.error("Error fetching documents:", err);
//     }
//   };

//   const handleSaveCandidate = async () => {
//     if (!selectedCandidate) {
//       console.error("❌ No selected candidate");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const submissionId = selectedCandidate.id?.toString();
      
//       if (!submissionId) {
//         throw new Error("Submission ID not found. Please refresh and try again.");
//       }

//       const applicantData = {
//         name: selectedCandidate.candidate_name,
//         email: selectedCandidate.email,
//         phone: selectedCandidate.mobile_number,
//         city: selectedCandidate.current_city,
//         current_last_organisation: selectedCandidate.current_last_organization,
//         total_experience_in_years: selectedCandidate.experience,
//         current_ctc: selectedCandidate.current_ctc,
//         expected_ctc: selectedCandidate.expected_ctc,
//         notice_period_in_days: selectedCandidate.notice_period,
//         special_comments: selectedCandidate.screening_comments,
//       };

//       const jobData = {
//         position: selectedCandidate.position_name,
//         ctc: selectedCandidate.ctc_budget,
//         client_spoc: selectedCandidate.client_spoc,
//       };

//       const submissionData = {
//         status: selectedCandidate.candidate_status,
//         date_profile_shared_from_Applicants: selectedCandidate.date_profile_shared,
//         candidate_status_update_date: selectedCandidate.interview_date_time,
//       };

//       const updateData = {
//         applicant: applicantData,
//         job: jobData,
//         submission: submissionData,
//       };

//       const response = await submissionService.update(submissionId, updateData);

//       if (response.status === 200) {
//         setIsEditing(false);
//         await fetchSummary(currentPage);
//         alert("Candidate details updated successfully!");
//         setSelectedCandidate(null);
//       } else {
//         throw new Error(response.message || "Failed to update candidate");
//       }
//     } catch (err: any) {
//       console.error("❌ Error updating candidate:", err);
//       const errorMessage = err.message || "Failed to update candidate details";
//       setError(errorMessage);
//       alert("❌ " + errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSummary(currentPage);
//   }, [groupBy]);

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       fetchSummary(1);
//       setCurrentPage(1);
//     }, 500);

//     return () => clearTimeout(delayDebounce);
//   }, [searchTerm, filters]);

//   const getStatusColor = (status: string) => {
//     const colors: Record<string, string> = {
//       "New Submission": "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20",
//       "Profile Shared": "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
//       "R1 Scheduled": "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20",
//       "R1 Completed": "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20",
//       "R2 Scheduled": "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20",
//       "R2 Completed": "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20",
//       "R3 Scheduled": "bg-pink-50 text-pink-700 ring-1 ring-inset ring-pink-600/20",
//       Selected: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
//       Rejected: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
//     };
//     return colors[status] || "bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20";
//   };

//   const openDocumentModal = (candidateId: number) => {
//     setCurrentCandidateId(candidateId);
//     setShowDocumentModal(true);
//   };

//   const handleAddDocument = async () => {
//     if (!documentForm.name.trim() || !documentForm.file || !selectedCandidate) {
//       alert("Please provide a document name and select a file.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await applicantService.uploadDocument(
//         selectedCandidate.candidate_id,
//         documentForm.type,
//         documentForm.file
//       );

//       if (response.status === 200) {
//         await fetchCandidateDocuments(selectedCandidate.candidate_id);
//         setDocumentForm({ name: "", type: "Resume", file: null });
//         setShowDocumentModal(false);
//         alert("Document uploaded successfully!");
//       } else {
//         console.error("Upload failed:", response.data);
//         alert(response.data?.message || "Failed to upload document");
//       }
//     } catch (err: any) {
//       console.error("Error uploading document:", err);
//       alert(err?.response?.data?.message || "Failed to upload document");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteDocument = async (candidateId: any, documentId: any) => {
//     if (!documentId) {
//       alert("Document ID is required");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete this document?")) {
//       return;
//     }

//     try {
//       await applicantService.deleteDocument(candidateId, documentId);
//       await fetchCandidateDocuments(candidateId);

//       if (selectedCandidate?.candidate_id === candidateId) {
//         setSelectedCandidate((prev: any) => ({
//           ...prev,
//           documents: prev.documents?.filter((doc: any) => doc.id !== documentId) || [],
//         }));
//       }

//       alert("Document deleted successfully!");
//     } catch (error: any) {
//       console.error("Failed to delete document:", error);
//       alert(
//         error?.response?.data?.message ||
//         "Failed to delete document. Please try again."
//       );
//     }
//   };

//   const getDocumentIcon = (type: string) => {
//     return FileText;
//   };

//   const totalSubmissions = Object.values(groupedData).reduce(
//     (sum, group) => sum + group.totalCount,
//     0
//   );

//   const groupEntries = Object.entries(groupedData);
//   const totalPages = backendTotalPages || 1;
//   const paginatedGroups = groupEntries;

//   const handlePageChange = (newPage: number) => {
//     setCurrentPage(newPage);
//     fetchSummary(newPage);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//         <div className="max-w-7xl mx-auto">
//           {/* Loading Overlay */}
//           {loading && (
//             <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//               <div className="bg-white rounded-xl p-6 shadow-xl flex flex-col items-center gap-3">
//                 <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-blue-600"></div>
//                 <p className="text-sm text-gray-600 font-medium">Loading…</p>
//               </div>
//             </div>
//           )}

//           {/* Error Alert */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2">
//               <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <p className="text-sm text-red-800 flex-1">{error}</p>
//               <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 p-1">
//                 <X size={14} />
//               </button>
//             </div>
//           )}

//           {/* Header Bar */}
//           <div className="bg-white rounded-xl shadow-sm p-5 mb-5">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//               <h2 className="text-xl font-bold text-gray-900">Submission Management</h2>

//               {/* Search */}
//               <div className="flex-1 max-w-md">
//                 <div className="relative">
//                   <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-9 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Search candidates, positions, clients…"
//                   />
//                   {searchTerm && (
//                     <button
//                       onClick={() => setSearchTerm("")}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       <X size={14} />
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Group By + Filters */}
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-2">
//                   <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Group by</label>
//                   <select
//                     value={groupBy}
//                     onChange={(e) => setGroupBy(e.target.value as any)}
//                     className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//                   >
//                     <option value="position">Position</option>
//                     <option value="client_name">Client</option>
//                     <option value="candidate_name">Candidate</option>
//                     <option value="status">Status</option>
//                   </select>
//                 </div>

//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className={`flex items-center gap-1.5 px-3 py-2 border rounded-lg text-sm transition-colors ${
//                     showFilters ? "border-blue-300 bg-blue-50 text-blue-700" : "border-gray-200 hover:bg-gray-50 text-gray-700"
//                   }`}
//                 >
//                   <Filter size={14} />
//                   Filters
//                   <ChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
//                 </button>
//               </div>
//             </div>

//             {/* Filters Panel */}
//             {showFilters && (
//               <div className="mt-4 pt-4 border-t border-gray-100">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//                   {[
//                     { label: "Position", key: "positionName", placeholder: "Filter by position…" },
//                     { label: "Client", key: "clientName", placeholder: "Filter by client…" },
//                     { label: "Candidate", key: "candidateName", placeholder: "Filter by candidate…" },
//                     { label: "Location", key: "location", placeholder: "Filter by location…" },
//                   ].map(({ label, key, placeholder }) => (
//                     <div key={key}>
//                       <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
//                       <input
//                         type="text"
//                         value={(filters as any)[key]}
//                         onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
//                         className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder={placeholder}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Results Count */}
//           <div className="mb-3 text-xs text-gray-500">
//             {totalSubmissions} submissions across {backendTotalGroups} groups
//             {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
//           </div>

//           {/* ═══════ GROUPED SUBMISSION CARDS ═══════ */}
//           <div className="space-y-5">
//             {paginatedGroups.map(([groupName, groupInfo]) => {
//               const isExpanded = expandedGroups[groupName];
//               const isLoadingGroup = loadingGroups[groupName];
//               const visibleSubmissions = isExpanded 
//                 ? groupInfo.submissions 
//                 : groupInfo.submissions.slice(0, 2);
//               const hasMore = groupInfo.totalCount > 2;

//               return (
//                 <div key={groupName} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                   {/* Group Header */}
//                   <div className="flex items-center justify-between bg-gradient-to-r from-slate-50 to-blue-50/60 px-5 py-3.5 border-b border-gray-200">
//                     <div className="flex items-center gap-3 min-w-0">
//                       <div className="bg-blue-100 text-blue-600 p-1.5 rounded-lg shrink-0">
//                         <Building size={18} />
//                       </div>
//                       <div className="min-w-0">
//                         <div className="flex items-center gap-2 flex-wrap">
//                           <h2 className="text-sm font-semibold text-gray-900 capitalize truncate">{groupName}</h2>
//                           <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 shrink-0">
//                             {groupInfo.totalCount}
//                           </span>
//                         </div>
//                         <p className="text-xs text-gray-500 truncate">
//                           Client: {visibleSubmissions[0]?.client_name || "N/A"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* ─── Submission rows as cards (no horizontal scroll) ─── */}
//                   <div className="divide-y divide-gray-100">
//                     {visibleSubmissions.map((submission) => (
//                       <div
//                         key={submission.id}
//                         className="px-5 py-3.5 hover:bg-gray-50/80 cursor-pointer transition-colors"
//                         onClick={() => handleCandidateClick(submission)}
//                       >
//                         {/* Row 1: Name + Status + Resume */}
//                         <div className="flex items-start justify-between gap-3 mb-2">
//                           <div className="min-w-0 flex-1">
//                             <div className="text-sm font-semibold text-gray-900 truncate">{submission.candidate_name}</div>
//                             <div className="text-xs text-gray-600 font-semibold mt-0.5 truncate">
//                               {submission.position} · {submission.location || "N/A"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col items-end gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
//                           <div className="flex items-center gap-2">
//                             <div className="w-[210px]">
//                               <Select
//                                 options={candidateStatusOptions}
//                                 isSearchable
//                                 placeholder={submission.status || "Status"}
//                                 value={
//                                   candidateStatusOptions.find((opt) => opt.value === submission.status) || null
//                                 }
//                                 onChange={async (selected) => {
//                                   const newStatus = selected?.value || "";

//                                   // Statuses that require a mandatory comment open the comment modal first
//                                   if (COMMENT_REQUIRED_STATUSES.includes(newStatus)) {
//                                     setCommentModalData({
//                                       submissionId: submission.id,
//                                       candidateName: submission.candidate_name,
//                                       newStatus,
//                                       comment: "",
//                                     });
//                                     setCommentModalOpen(true);
//                                     return;
//                                   }

//                                   submission.status = newStatus;
//                                   try {
//                                     await submissionService.update(submission.id, {
//                                       submission: { status: newStatus },
//                                     });
//                                     fetchSummary();
//                                     console.log("Status updated successfully");
//                                   } catch (err) {
//                                     console.error("Failed to update status", err);
//                                   }
//                                 }}
//                                 styles={{
//                                   control: (base) => ({
//                                     ...base,
//                                     minHeight: "30px",
//                                     height: "30px",
//                                     fontSize: "12px",
//                                     borderColor: "#e5e7eb",
//                                     boxShadow: "none",
//                                     "&:hover": { borderColor: "#d1d5db" },
//                                   }),
//                                   valueContainer: (base) => ({ ...base, padding: "0 6px" }),
//                                   indicatorsContainer: (base) => ({ ...base, height: "30px" }),
//                                   option: (base, { isSelected }) => ({
//                                     ...base,
//                                     fontSize: "12px",
//                                     padding: "6px 10px",
//                                     backgroundColor: isSelected ? "#dbeafe" : "#fff",
//                                     color: "#1e3a8a",
//                                     "&:hover": { backgroundColor: "#eff6ff" },
//                                   }),
//                                   singleValue: (base) => ({ ...base, color: "#1e3a8a", fontSize: "12px" }),
//                                 }}
//                                 menuPortalTarget={document.body}
//                                 menuPosition="fixed"
//                               />
//                             </div>
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 window.open(submission.resume || "N/A", "_blank");
//                               }}
//                               className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors whitespace-nowrap"
//                             >
//                               Resume ↗
//                             </button>
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 navigate("/candidate-tracker", {
//                                   state: { submissionId: submission.id, candidateName: submission.candidate_name },
//                                 });
//                               }}
//                               className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2.5 py-1 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors whitespace-nowrap"
//                             >
//                               View Tracker
//                             </button>
//                           </div>

//                           {/* Status comment (from select/reject confirmation) */}
//                           {(submission as any).status_comment && (
//                             <div className="max-w-[360px] bg-green-50 text-green-800 text-xs rounded-lg px-3 py-2 text-left">
//                               {(submission as any).status_comment}
//                             </div>
//                           )}
//                           </div>
//                         </div>

//                         {/* Row 2: Key details as inline chips */}
//                         <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
//                           <span className="flex items-center gap-1">
//                             <User size={12} className="text-gray-400" />
//                             {submission.recruiter || "N/A"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Clock size={12} className="text-gray-400" />
//                             {submission.notice_period ? `${submission.notice_period}d notice` : "N/A"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <DollarSign size={12} className="text-gray-400" />
//                             CTC: {submission.current_ctc ? `${submission.current_ctc}L` : "N/A"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <DollarSign size={12} className="text-gray-400" />
//                             Budget: {submission.ctc_budget ? `${submission.ctc_budget}L` : "N/A"}
//                           </span>
//                           {submission.submitted_on && (
//                             <span className="text-gray-400">
//                               Submitted {new Date(submission.submitted_on).toLocaleDateString()}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* View More */}
//                   {hasMore && (
//                     <div className="flex justify-center py-2.5 bg-gray-50/60 border-t border-gray-100">
//                       <button
//                         onClick={() => handleViewMore(groupName)}
//                         disabled={isLoadingGroup}
//                         className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors disabled:opacity-50"
//                       >
//                         {isLoadingGroup ? (
//                           <>
//                             <Loader size={13} className="animate-spin" />
//                             Loading…
//                           </>
//                         ) : isExpanded ? (
//                           <>
//                             <ChevronDown size={13} className="rotate-180" />
//                             Show less
//                           </>
//                         ) : (
//                           <>
//                             <ChevronDown size={13} />
//                             {groupInfo.totalCount - 2} more
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="mt-5 flex items-center justify-between bg-white rounded-xl shadow-sm p-3 border border-gray-200">
//               <div className="text-xs text-gray-500">
//                 Page {currentPage} of {totalPages} · {backendTotalGroups} groups
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <button
//                   onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Previous
//                 </button>
                
//                 <div className="flex items-center gap-1">
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
//                     const showPage = 
//                       page === 1 || 
//                       page === totalPages || 
//                       (page >= currentPage - 1 && page <= currentPage + 1);
                    
//                     const showEllipsis = 
//                       (page === currentPage - 2 && currentPage > 3) ||
//                       (page === currentPage + 2 && currentPage < totalPages - 2);

//                     if (showEllipsis) {
//                       return <span key={page} className="px-1.5 text-gray-400 text-xs">…</span>;
//                     }

//                     if (!showPage) return null;

//                     return (
//                       <button
//                         key={page}
//                         onClick={() => handlePageChange(page)}
//                         className={`w-8 h-8 text-xs rounded-lg transition-colors ${
//                           currentPage === page
//                             ? "bg-blue-600 text-white font-medium"
//                             : "border border-gray-200 hover:bg-gray-50 text-gray-700"
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     );
//                   })}
//                 </div>
                
//                 <button
//                   onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Empty State */}
//           {Object.keys(groupedData).length === 0 && !loading && (
//             <div className="text-center py-16">
//               <FileText size={40} className="mx-auto text-gray-300 mb-3" />
//               <p className="text-gray-500 font-medium">No submissions found</p>
//               <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
//             </div>
//           )}

//           {/* ═══════ CANDIDATE DETAIL MODAL ═══════ */}
//           {selectedCandidate && (
//             <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 overflow-y-auto p-4 pt-[4vh]">
//               <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl my-4 border border-gray-200/60">

//                 {/* ── Top: Close + Edit bar ── */}
//                 <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
//                   <span className="text-xs text-gray-400">Candidate Detail</span>
//                   <div className="flex items-center gap-2">
//                     {isEditing ? (
//                       <>
//                         <button
//                           onClick={() => {
//                             setIsEditing(false);
//                             if (originalCandidate) {
//                               setSelectedCandidate({ ...originalCandidate }); 
//                             }
//                           }}
//                           disabled={loading}
//                           className="px-3 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 disabled:opacity-50 transition-colors"
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           onClick={handleSaveCandidate} 
//                           disabled={loading}
//                           className="bg-blue-600 text-white px-3 py-1 text-xs rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1.5 transition-colors"
//                         >
//                           {loading ? (
//                             <>
//                               <Loader size={12} className="animate-spin" />
//                               Saving…
//                             </>
//                           ) : (
//                             "Save Changes"
//                           )}
//                         </button>
//                       </>
//                     ) : (
//                       <button
//                         onClick={() => setIsEditing(true)}
//                         className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
//                       >
//                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                         </svg>
//                         Edit
//                       </button>
//                     )}
//                     <button
//                       onClick={() => { setSelectedCandidate(null); setDetailTab("personal"); setIsEditing(false); }}
//                       className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
//                     >
//                       <X size={18} />
//                     </button>
//                   </div>
//                 </div>

//                 {/* ── Profile Card Header ── */}
//                 <div className="px-6 py-5 border-gray-100">
//                   <div className="flex items-start gap-4">
//                     {/* Avatar */}
//                     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
//   <BriefcaseBusiness size={20} className="text-gray-500" />
// </div>
//                     <div className="min-w-0 flex-1">
//                       <h2 className="text-lg font-bold text-gray-900 leading-tight">
//                         {selectedCandidate.candidate_name}
//                       </h2>
//                       <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-gray-500">
//                         {selectedCandidate.candidate_id && (
//                           <span className="font-medium text-gray-700">ID: #{selectedCandidate.candidate_id}</span>
//                         )}
//                         {selectedCandidate.email && (
//                           <a href={`mailto:${selectedCandidate.email}`} className="text-blue-600 hover:text-blue-700 hover:underline">
//                             {selectedCandidate.email}
//                           </a>
//                         )}
//                         {selectedCandidate.mobile_number && (
//                           <span className="flex items-center gap-1">
//                             <Phone size={11} />
//                             {selectedCandidate.mobile_number}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* ── Quick Status Strip ── */}
//                 <div className="mx-6 grid grid-cols-3 overflow-hidden rounded-xl border border-gray-200 bg-white">
//   {/* Position */}
//   <div className="px-5 py-3">
//     <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">
//       Position
//     </div>
//     <div className="text-xs font-semibold flex justify-center text-gray-900 truncate">
//       {selectedCandidate.position_name || "N/A"}
//     </div>
//   </div>

//   {/* Status */}
//   <div className="border-l border-gray-100  px-5 py-3">
//     <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">
//       Status
//     </div>

//     <span
//   className={`flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(
//     selectedCandidate.candidate_status
//   )}`}
// >
//   <span className="h-2 w-2 flex-shrink-0 rounded-full bg-current" />
//   {selectedCandidate.candidate_status || "N/A"}
// </span>
//   </div>

//   {/* Submitted */}
//   <div className="border-l  border-gray-100 px-5 py-3">
//     <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">
//       Submitted
//     </div>
//     <div className="text-xs font-semibold flex justify-center text-gray-900">
//       {selectedCandidate.date_of_submission
//         ? new Date(
//             selectedCandidate.date_of_submission
//           ).toLocaleDateString("en-IN", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//           })
//         : "N/A"}
//     </div>
//   </div>
// </div>

//                 {/* ── Tab Switcher ── */}
//                 <div className="flex justify-center px-6 py-6">
//   <div className="flex w-full max-w-md rounded-xl bg-gray-100 p-1.5">
//     {[
//       { key: "personal" as const, label: "Personal Information" },
//       { key: "position" as const, label: "Position & Documents" },
//     ].map((tab) => (
//       <button
//         key={tab.key}
//         type="button"
//         onClick={() => setDetailTab(tab.key)}
//         className={`flex-1 rounded-lg px-5 py-3 text-sm font-medium transition-all duration-200
//           outline-none focus:outline-none focus:ring-0
//           ${
//             detailTab === tab.key
//   ? "bg-white text-gray-800 shadow-sm"
//   : "bg-transparent text-gray-500 hover:bg-transparent hover:text-gray-700"
//           }`}
//       >
//         {tab.label}
//       </button>
//     ))}
//   </div>
// </div>

//                 {/* ── Tab Content ── */}
//                 <div className="max-h-[55vh] overflow-y-auto">

//                   {/* ═══ TAB 1: Personal Information ═══ */}
//                   {detailTab === "personal" && (
//                     <div className="p-6">
//                       <div className="flex items-center gap-2 mb-4">
//                         <User size={15} className="text-gray-400" />
//                         <h3 className="text-sm font-semibold text-gray-700">Applicant Information</h3>
//                       </div>

//                       <div className="space-y-0">
//                         {[
//                           { label: "Candidate Name", value: "candidate_name", icon: <User size={13} className="text-gray-400" /> },
//                           { label: "Email Address", value: "email", icon: <Mail size={13} className="text-gray-400" /> },
//                           { label: "Mobile Number", value: "mobile_number", icon: <Phone size={13} className="text-gray-400" /> },
//                           { label: "Current Organization", value: "current_last_organization", icon: <Building size={13} className="text-gray-400" /> },
//                           { label: "Experience (Years)", value: "experience", icon: <Clock size={13} className="text-gray-400" /> },
//                           { label: "Current City", value: "current_city", icon: <MapPin size={13} className="text-gray-400" /> },
//                           { label: "Current CTC", value: "current_ctc", icon: <DollarSign size={13} className="text-gray-400" /> },
//                           { label: "Expected CTC", value: "expected_ctc", icon: <DollarSign size={13} className="text-gray-400" /> },
//                           { label: "Notice Period (Days)", value: "notice_period", icon: <Clock size={13} className="text-gray-400" /> },
//                         ].map(({ label, value, icon }) => (
//                           <div key={value} className="flex items-center py-3 border-b border-gray-100 last:border-0">
//                             <div className="flex items-center gap-2.5 w-[200px] shrink-0">
//                               {icon}
//                               <span className="text-sm text-gray-500">{label}</span>
//                             </div>
//                             <span className="text-sm text-gray-400 mr-3">:</span>
//                             {isEditing ? (
//                               <input
//                                 type="text"
//                                 value={(selectedCandidate as any)[value] || ""}
//                                 onChange={(e) =>
//                                   setSelectedCandidate((prev: any) => ({ ...prev, [value]: e.target.value }))
//                                 }
//                                 className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               />
//                             ) : (
//                               <span className="text-sm font-medium text-gray-900">
//                                 {(selectedCandidate as any)[value] || "N/A"}
//                               </span>
//                             )}
//                           </div>
//                         ))}
//                       </div>

//                       {/* Screening Comments */}
//                       <div className="mt-5 pt-4 border-t border-gray-200">
//                         <div className="flex items-center gap-2 mb-2">
//                           <FileText size={13} className="text-gray-400" />
//                           <span className="text-sm text-gray-500">Screening Comments</span>
//                         </div>
//                         {isEditing ? (
//                           <textarea
//                             value={selectedCandidate.screening_comments || ""}
//                             onChange={(e) =>
//                               setSelectedCandidate((prev: any) => ({
//                                 ...prev,
//                                 screening_comments: e.target.value,
//                               }))
//                             }
//                             rows={3}
//                             className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
//                           />
//                         ) : (
//                           <div className="text-sm text-gray-900 bg-gray-50 rounded-lg px-4 py-3 min-h-[40px]">
//                             {selectedCandidate.screening_comments || "No comments"}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {/* ═══ TAB 2: Position & Documents ═══ */}
//                   {detailTab === "position" && (
//                     <div className="p-6">
//                       {/* Position Details */}
//                       <div className="flex items-center gap-2 mb-4">
//                         <Building size={15} className="text-gray-400" />
//                         <h3 className="text-sm font-semibold text-gray-700">Position Details</h3>
//                       </div>

//                       <div className="space-y-0 mb-6">
//                         {[
//                           { label: "Position Name", value: "position_name" },
//                           { label: "Client Name", value: "client_name" },
//                           { label: "Recruiter", value: "recruiter" },
//                           { label: "CTC Budget", value: "ctc_budget" },
//                           { label: "Position Status", value: "position_status" },
//                           { label: "Date of Submission", value: "date_of_submission" },
//                           { label: "Date Profile Shared", value: "date_profile_shared" },
//                           { label: "Interview Date/Time", value: "interview_date_time" },
//                           { label: "Client SPOC", value: "client_spoc" },
//                           { label: "Laksh SPOC", value: "laksh_spoc" },
//                         ].map(({ label, value }) => (
//                           <div key={value} className="flex items-center py-3 border-b border-gray-100 last:border-0">
//                             <div className="w-[200px] shrink-0">
//                               <span className="text-sm text-gray-500">{label}</span>
//                             </div>
//                             <span className="text-sm text-gray-400 mr-3">:</span>
//                             {isEditing ? (
//                               <input
//                                 type="text"
//                                 value={(selectedCandidate as any)[value] || ""}
//                                 onChange={(e) =>
//                                   setSelectedCandidate((prev: any) => ({ ...prev, [value]: e.target.value }))
//                                 }
//                                 className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               />
//                             ) : (
//                               <span className="text-sm font-medium text-gray-900">
//                                 {(selectedCandidate as any)[value] || "N/A"}
//                               </span>
//                             )}
//                           </div>
//                         ))}

//                         {/* Candidate Status row */}
//                         <div className="flex items-center py-3 border-b border-gray-100">
//                           <div className="w-[200px] shrink-0">
//                             <span className="text-sm text-gray-500">Candidate Status</span>
//                           </div>
//                           <span className="text-sm text-gray-400 mr-3">:</span>
//                           {isEditing ? (
//                             <div className="flex-1">
//                               <Select
//                                 options={candidateStatusOptions}
//                                 isSearchable
//                                 placeholder="Select status…"
//                                 value={
//                                   candidateStatusOptions.find(
//                                     (opt) => opt.value === selectedCandidate.candidate_status
//                                   ) || null
//                                 }
//                                 onChange={(selected: { value: string; label: string } | null) =>
//                                   setSelectedCandidate((prev: any) => ({
//                                     ...prev,
//                                     candidate_status: selected?.value || "",
//                                   }))
//                                 }
//                                 styles={{
//                                   control: (base) => ({
//                                     ...base,
//                                     minHeight: "32px",
//                                     fontSize: "13px",
//                                     borderColor: "#e5e7eb",
//                                   }),
//                                   valueContainer: (base) => ({ ...base, padding: "0 8px" }),
//                                   indicatorsContainer: (base) => ({ ...base, height: "32px" }),
//                                 }}
//                               />
//                             </div>
//                           ) : (
//                             <span className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(selectedCandidate.candidate_status)}`}>
//                               {selectedCandidate.candidate_status || "N/A"}
//                             </span>
//                           )}
//                         </div>
//                       </div>

//                       {/* Documents Section */}
//                       <div className="border-t border-gray-200 pt-5">
//                         <div className="flex items-center justify-between mb-4">
//                           <div className="flex items-center gap-2">
//                             <FileText size={15} className="text-gray-400" />
//                             <h3 className="text-sm font-semibold text-gray-700">Documents</h3>
//                             {candidateDocuments.length > 0 && (
//                               <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
//                                 {candidateDocuments.length}
//                               </span>
//                             )}
//                           </div>
//                           <button
//                             onClick={() => {
//                               const candidateId = (selectedCandidate as any).candidate_id;
//                               if (candidateId) openDocumentModal(candidateId);
//                             }}
//                             className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium transition-colors"
//                           >
//                             <Plus size={13} />
//                             Upload
//                           </button>
//                         </div>

//                         <div className="rounded-xl border border-gray-200 overflow-hidden">
//                           {candidateDocuments && candidateDocuments.length > 0 ? (
//                             <div className="divide-y divide-gray-100 max-h-56 overflow-y-auto">
//                               {candidateDocuments.map((doc) => {
//                                 const IconComponent = getDocumentIcon(doc.type);
//                                 return (
//                                   <div
//                                     key={doc.id}
//                                     className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
//                                   >
//                                     <div className="flex items-center gap-3 min-w-0">
//                                       <div className="bg-blue-50 p-2 rounded-lg shrink-0">
//                                         <IconComponent size={14} className="text-blue-600" />
//                                       </div>
//                                       <div className="min-w-0">
//                                         <div className="text-sm font-medium text-gray-900 truncate">{doc.fileName}</div>
//                                         <div className="text-xs text-gray-500">
//                                           {doc.documentType} · {doc.size || "N/A"} · {new Date(doc.uploadedAt).toLocaleDateString()}
//                                         </div>
//                                       </div>
//                                     </div>
//                                     <div className="flex items-center gap-1 shrink-0 ml-3">
//                                       <a
//                                         href={doc.fileUrl}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
//                                       >
//                                         <Download size={14} />
//                                       </a>
//                                       <button
//                                         onClick={() => handleDeleteDocument((selectedCandidate as any).candidate_id, doc.id)}
//                                         className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
//                                       >
//                                         <Trash2 size={14} />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           ) : (
//                             <div className="text-center py-10 bg-gray-50/50">
//                               <FileText size={28} className="mx-auto mb-2 text-gray-300" />
//                               <p className="text-sm text-gray-500">No documents uploaded</p>
//                               <button
//                                 onClick={() => openDocumentModal((selectedCandidate as any).candidate_id)}
//                                 className="mt-1.5 text-blue-600 hover:text-blue-800 text-xs font-medium"
//                               >
//                                 Upload your first document
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                         <p className="text-[11px] text-gray-400 mt-2">
//                           Supported: PDF, DOC, DOCX, JPG, JPEG, PNG
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ═══════ DOCUMENT UPLOAD MODAL ═══════ */}
//       {showDocumentModal && (
//         <div
//           className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
//           style={{ zIndex: 99999 }}
//         >
//           <div
//             className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative"
//             style={{ zIndex: 100000 }}
//           >
//             <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
//               <h2 className="text-base font-bold text-gray-900">Upload Document</h2>
//               <button
//                 onClick={() => {
//                   setShowDocumentModal(false);
//                   setDocumentForm({ name: "", type: "Resume", file: null });
//                 }}
//                 className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Document Name *</label>
//                 <input
//                   type="text"
//                   required
//                   placeholder="e.g., Resume_JohnDoe_2025"
//                   value={documentForm.name}
//                   onChange={(e) =>
//                     setDocumentForm((prev) => ({ ...prev, name: e.target.value }))
//                   }
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Document Type</label>
//                 <select
//                   value={documentForm.type}
//                   onChange={(e) =>
//                     setDocumentForm((prev) => ({ ...prev, type: e.target.value }))
//                   }
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                 >
//                   <option value="Resume">Resume</option>
//                   <option value="Pan Card">Pan Card</option>
//                   <option value="Cover Letter">Cover Letter</option>
//                   <option value="Adhaar Card">Adhaar Card</option>
//                   <option value="Offer Letter">Offer Letter</option>
//                   <option value="Resignation Letter">Resignation Letter</option>
//                   <option value="Academic Document">Academic Document</option>
//                   <option value="Reference Letter">Reference Letter</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Upload Document *</label>
//                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:border-gray-300 transition-colors bg-gray-50/50">
//                   <div className="space-y-1 text-center">
//                     <Upload className="mx-auto h-10 w-10 text-gray-400" />
//                     <div className="flex text-xs text-gray-500">
//                       <label
//                         htmlFor="file-upload"
//                         className="relative cursor-pointer font-medium text-blue-600 hover:text-blue-500"
//                       >
//                         <span>Choose a file</span>
//                         <input
//                           id="file-upload"
//                           name="file-upload"
//                           type="file"
//                           className="sr-only"
//                           accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                           onChange={(e) => {
//                             const file = e.target.files?.[0];
//                             if (file) {
//                               setDocumentForm((prev) => ({
//                                 ...prev,
//                                 file: file,
//                                 name: prev.name || file.name.split(".")[0],
//                               }));
//                             }
//                           }}
//                         />
//                       </label>
//                       <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-[11px] text-gray-400">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
//                   </div>
//                 </div>
//                 {documentForm.file && (
//                   <div className="mt-2 flex items-center gap-2 text-xs text-gray-600 bg-blue-50 rounded-lg px-3 py-2">
//                     <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
//                     <span className="truncate">{documentForm.file.name}</span>
//                     <button
//                       onClick={() => setDocumentForm((prev) => ({ ...prev, file: null }))}
//                       className="text-red-500 hover:text-red-700 shrink-0 ml-auto"
//                     >
//                       <X className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowDocumentModal(false);
//                     setDocumentForm({ name: "", type: "Resume", file: null });
//                   }}
//                   className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleAddDocument}
//                   disabled={!documentForm.name.trim() || !documentForm.file}
//                   className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
//                 >
//                   <Upload className="w-3.5 h-3.5" />
//                   Upload
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ═══════ COMMENT MODAL (mandatory comment on select / reject) ═══════ */}
//       {commentModalOpen && commentModalData && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
//             {/* Modal header */}
//             <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
//               <div className="min-w-0">
//                 <h2 className="text-base font-bold text-gray-900">
//                   {isRejectStatus(commentModalData.newStatus) ? "Confirm Rejection" : "Confirm Selection"}
//                 </h2>
//                 <p className="text-xs text-gray-500 mt-0.5 truncate">{commentModalData.candidateName}</p>
//               </div>
//               <button
//                 onClick={closeCommentModal}
//                 className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             {/* Modal body */}
//             <div className="p-6 space-y-4">
//               <div className="flex items-center gap-2">
//                 <span className="text-xs text-gray-500">Status:</span>
//                 <span
//                   className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${
//                     isRejectStatus(commentModalData.newStatus)
//                       ? "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
//                       : "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
//                   }`}
//                 >
//                   {commentModalData.newStatus}
//                 </span>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">
//                   Comment <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   value={commentModalData.comment}
//                   onChange={(e) =>
//                     setCommentModalData((prev) => (prev ? { ...prev, comment: e.target.value } : prev))
//                   }
//                   placeholder={
//                     isRejectStatus(commentModalData.newStatus)
//                       ? "Reason for rejection is mandatory…"
//                       : "Add your selection comment…"
//                   }
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
//                 />
//               </div>

//               {/* Modal footer */}
//               <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={closeCommentModal}
//                   className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   disabled={!commentModalData.comment.trim()}
//                   onClick={async () => {
//                     try {
//                       await submissionService.update(commentModalData.submissionId, {
//                         submission: {
//                           status: commentModalData.newStatus,
//                           status_comment: commentModalData.comment.trim(),
//                         },
//                       });
//                       fetchSummary();
//                       console.log("Status updated with comment:", commentModalData.newStatus, commentModalData.comment);
//                     } catch (err) {
//                       console.error("Failed to update status with comment", err);
//                     }
//                     closeCommentModal();
//                   }}
//                   className={`px-5 py-2 text-sm text-white rounded-lg transition-colors flex items-center gap-1.5 disabled:bg-gray-300 disabled:cursor-not-allowed ${
//                     isRejectStatus(commentModalData.newStatus)
//                       ? "bg-red-600 hover:bg-red-700"
//                       : "bg-emerald-600 hover:bg-emerald-700"
//                   }`}
//                 >
//                   <MessageSquare className="w-3.5 h-3.5" />
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SubmissionManagementSystem;



















// import { useState, useMemo, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import {
//   Search,
//   Filter,
//   FileText,
//   Phone,
//   Mail,
//   Building,
//   Clock,
//   User,
//   DollarSign,
//   MapPin,
//   X,
//   ChevronDown,
//   Upload,
//   Download,
//   Trash2,
//   Plus,
//   Loader,
//   IdCard,
//   BriefcaseBusiness,
//   MessageSquare,
// } from "lucide-react";
// import { submissionService } from "../services/submissionService";
// import type { Submission, DetailedSubmission, SubmissionFilters, CandidateDocument } from "../services/submissionService";
// import { applicantService } from "../services/applicantService";
// import { candidateStatusOptions } from "../constants/dropdown";
// import Select from "react-select";

// const SubmissionManagementSystem = () => {
//   const navigate = useNavigate();

//   // Document state
//   const [candidateDocuments, setCandidateDocuments] = useState<CandidateDocument[]>([]);
//   const [groupBy, setGroupBy] = useState<"position" | "client_name" | "candidate_name" | "status">("position");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     positionName: "",
//     clientName: "",
//     candidateName: "",
//     location: "",
//   });
//   const [selectedCandidate, setSelectedCandidate] = useState<DetailedSubmission | null>(null);
//   const [originalCandidate, setOriginalCandidate] = useState<DetailedSubmission | null>(null);
//   const [showFilters, setShowFilters] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [detailTab, setDetailTab] = useState<"personal" | "position">("personal");
//   const [showDocumentModal, setShowDocumentModal] = useState(false);
//   const [currentCandidateId, setCurrentCandidateId] = useState<number | null>(null);
//   const [documentForm, setDocumentForm] = useState({
//     name: "",
//     type: "Resume",
//     file: null as File | null,
//   });

//   // API states
//   const [groupedData, setGroupedData] = useState<Record<string, { submissions: Submission[], totalCount: number }>>({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Backend pagination metadata
//   const [backendTotalGroups, setBackendTotalGroups] = useState(0);
//   const [backendTotalPages, setBackendTotalPages] = useState(0);
//   const [backendCurrentPage, setBackendCurrentPage] = useState(1);

//   // Group-level pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const GROUPS_PER_PAGE = 10;

//   // ─── Comment Modal State (for select/reject with mandatory comment) ───
//   const COMMENT_REQUIRED_STATUSES = [
//     "Final Select", "R1 select", "R2 select", "R3 Select",
//     "Client Reject", "Internal Reject", "Profile Reject", "Reject",
//     "R1 reject", "R2 reject", "R3 reject", "Offer Drop", "Dropout",
//   ];
//   const [commentModalOpen, setCommentModalOpen] = useState(false);
//   const [commentModalData, setCommentModalData] = useState<{
//     submissionId: number;
//     candidateName: string;
//     newStatus: string;
//     comment: string;
//   } | null>(null);

//   const isRejectStatus = (status: string) =>
//     status.toLowerCase().includes("reject") || status === "Offer Drop" || status === "Dropout";

//   const closeCommentModal = () => {
//     setCommentModalOpen(false);
//     setCommentModalData(null);
//   };

//   const fetchSummary = async (page: number = 1) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const apiFilters: SubmissionFilters = {
//         position: filters.positionName || undefined,
//         client_name: filters.clientName || undefined,
//         candidate_name: filters.candidateName || undefined,
//         location: filters.location || undefined,
//         groupBy: groupBy,
//         search: searchTerm || undefined,
//       };

//       const response = await submissionService.fetchSummary(apiFilters, page);

//       if (response.status === 200) {
//         setGroupedData(response.data.groups);
//         setBackendTotalGroups(response.data.totalGroups || 0);
//         setBackendTotalPages(response.data.totalPages || 0);
//         setBackendCurrentPage(response.data.currentPage || page);

//         console.log("📊 Backend Pagination info:", {
//           totalGroups: response.data.totalGroups,
//           currentPage: response.data.currentPage,
//           totalPages: response.data.totalPages,
//         });
//       }
//     } catch (err: any) {
//       setError(err?.message || "Failed to fetch submissions");
//       console.error("Error fetching summary:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewMore = (groupName: string, clientName?: string) => {
//     navigate("/submission-group-detail", {
//       state: {
//         groupName,
//         positionName: groupName,
//         clientName: clientName || "N/A",
//       },
//     });
//   };

//   const handleCandidateClick = (submission: Submission) => {
//     // Navigate to the detail page URL instead of opening a modal
//     navigate(`/submission-group-detail/${submission.id}`, {
//       state: {
//         groupName: groupBy === "position" ? submission.position :
//                    groupBy === "client_name" ? submission.client_name :
//                    groupBy === "candidate_name" ? submission.candidate_name :
//                    submission.status,
//         filters: filters,
//         searchTerm: searchTerm,
//         currentPage: currentPage,
//       },
//     });
//   };

//   const fetchCandidateDocuments = async (candidateId: string) => {
//     try {
//       const response = await applicantService.fetchDocuments(candidateId);
//       if (response.status === 200) {
//         setCandidateDocuments(response.data || []);
//       }
//     } catch (err: any) {
//       console.error("Error fetching documents:", err);
//     }
//   };

//   const handleSaveCandidate = async () => {
//     if (!selectedCandidate) {
//       console.error("❌ No selected candidate");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const submissionId = selectedCandidate.id?.toString();

//       if (!submissionId) {
//         throw new Error("Submission ID not found. Please refresh and try again.");
//       }

//       const applicantData = {
//         name: selectedCandidate.candidate_name,
//         email: selectedCandidate.email,
//         phone: selectedCandidate.mobile_number,
//         city: selectedCandidate.current_city,
//         current_last_organisation: selectedCandidate.current_last_organization,
//         total_experience_in_years: selectedCandidate.experience,
//         current_ctc: selectedCandidate.current_ctc,
//         expected_ctc: selectedCandidate.expected_ctc,
//         notice_period_in_days: selectedCandidate.notice_period,
//         special_comments: selectedCandidate.screening_comments,
//       };

//       const jobData = {
//         position: selectedCandidate.position_name,
//         ctc: selectedCandidate.ctc_budget,
//         client_spoc: selectedCandidate.client_spoc,
//       };

//       const submissionData = {
//         status: selectedCandidate.candidate_status,
//         date_profile_shared_from_Applicants: selectedCandidate.date_profile_shared,
//         candidate_status_update_date: selectedCandidate.interview_date_time,
//       };

//       const updateData = {
//         applicant: applicantData,
//         job: jobData,
//         submission: submissionData,
//       };

//       const response = await submissionService.update(submissionId, updateData);

//       if (response.status === 200) {
//         setIsEditing(false);
//         await fetchSummary(currentPage);
//         alert("Candidate details updated successfully!");
//         setSelectedCandidate(null);
//       } else {
//         throw new Error(response.message || "Failed to update candidate");
//       }
//     } catch (err: any) {
//       console.error("❌ Error updating candidate:", err);
//       const errorMessage = err.message || "Failed to update candidate details";
//       setError(errorMessage);
//       alert("❌ " + errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSummary(currentPage);
//   }, [groupBy]);

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       fetchSummary(1);
//       setCurrentPage(1);
//     }, 500);

//     return () => clearTimeout(delayDebounce);
//   }, [searchTerm, filters]);

//   const getStatusColor = (status: string) => {
//     const colors: Record<string, string> = {
//       "New Submission": "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20",
//       "Profile Shared": "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
//       "R1 Scheduled": "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20",
//       "R1 Completed": "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20",
//       "R2 Scheduled": "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20",
//       "R2 Completed": "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20",
//       "R3 Scheduled": "bg-pink-50 text-pink-700 ring-1 ring-inset ring-pink-600/20",
//       Selected: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
//       Rejected: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
//     };
//     return colors[status] || "bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20";
//   };

//   const openDocumentModal = (candidateId: number) => {
//     setCurrentCandidateId(candidateId);
//     setShowDocumentModal(true);
//   };

//   const handleAddDocument = async () => {
//     if (!documentForm.name.trim() || !documentForm.file || !selectedCandidate) {
//       alert("Please provide a document name and select a file.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await applicantService.uploadDocument(
//         selectedCandidate.candidate_id,
//         documentForm.type,
//         documentForm.file
//       );

//       if (response.status === 200) {
//         await fetchCandidateDocuments(selectedCandidate.candidate_id);
//         setDocumentForm({ name: "", type: "Resume", file: null });
//         setShowDocumentModal(false);
//         alert("Document uploaded successfully!");
//       } else {
//         console.error("Upload failed:", response.data);
//         alert(response.data?.message || "Failed to upload document");
//       }
//     } catch (err: any) {
//       console.error("Error uploading document:", err);
//       alert(err?.response?.data?.message || "Failed to upload document");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteDocument = async (candidateId: any, documentId: any) => {
//     if (!documentId) {
//       alert("Document ID is required");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete this document?")) {
//       return;
//     }

//     try {
//       await applicantService.deleteDocument(candidateId, documentId);
//       await fetchCandidateDocuments(candidateId);

//       if (selectedCandidate?.candidate_id === candidateId) {
//         setSelectedCandidate((prev: any) => ({
//           ...prev,
//           documents: prev.documents?.filter((doc: any) => doc.id !== documentId) || [],
//         }));
//       }

//       alert("Document deleted successfully!");
//     } catch (error: any) {
//       console.error("Failed to delete document:", error);
//       alert(
//         error?.response?.data?.message ||
//         "Failed to delete document. Please try again."
//       );
//     }
//   };

//   const getDocumentIcon = (type: string) => {
//     return FileText;
//   };

//   const totalSubmissions = Object.values(groupedData).reduce(
//     (sum, group) => sum + group.totalCount,
//     0
//   );

//   const groupEntries = Object.entries(groupedData);
//   const totalPages = backendTotalPages || 1;
//   const paginatedGroups = groupEntries;

//   const handlePageChange = (newPage: number) => {
//     setCurrentPage(newPage);
//     fetchSummary(newPage);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//         <div className="max-w-7xl mx-auto">
//           {/* Loading Overlay */}
//           {loading && (
//             <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//               <div className="bg-white rounded-xl p-6 shadow-xl flex flex-col items-center gap-3">
//                 <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-blue-600"></div>
//                 <p className="text-sm text-gray-600 font-medium">Loading…</p>
//               </div>
//             </div>
//           )}

//           {/* Error Alert */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2">
//               <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <p className="text-sm text-red-800 flex-1">{error}</p>
//               <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 p-1">
//                 <X size={14} />
//               </button>
//             </div>
//           )}

//           {/* Header Bar */}
//           <div className="bg-white rounded-xl shadow-sm p-5 mb-5">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//               <h2 className="text-xl font-bold text-gray-900">Submission Management</h2>

//               {/* Search */}
//               <div className="flex-1 max-w-md">
//                 <div className="relative">
//                   <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-9 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Search candidates, positions, clients…"
//                   />
//                   {searchTerm && (
//                     <button
//                       onClick={() => setSearchTerm("")}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       <X size={14} />
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Group By + Filters */}
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-2">
//                   <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Group by</label>
//                   <select
//                     value={groupBy}
//                     onChange={(e) => setGroupBy(e.target.value as any)}
//                     className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//                   >
//                     <option value="position">Position</option>
//                     <option value="client_name">Client</option>
//                     <option value="candidate_name">Candidate</option>
//                     <option value="status">Status</option>
//                   </select>
//                 </div>

//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className={`flex items-center gap-1.5 px-3 py-2 border rounded-lg text-sm transition-colors ${
//                     showFilters ? "border-blue-300 bg-blue-50 text-blue-700" : "border-gray-200 hover:bg-gray-50 text-gray-700"
//                   }`}
//                 >
//                   <Filter size={14} />
//                   Filters
//                   <ChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
//                 </button>
//               </div>
//             </div>

//             {/* Filters Panel */}
//             {showFilters && (
//               <div className="mt-4 pt-4 border-t border-gray-100">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//                   {[
//                     { label: "Position", key: "positionName", placeholder: "Filter by position…" },
//                     { label: "Client", key: "clientName", placeholder: "Filter by client…" },
//                     { label: "Candidate", key: "candidateName", placeholder: "Filter by candidate…" },
//                     { label: "Location", key: "location", placeholder: "Filter by location…" },
//                   ].map(({ label, key, placeholder }) => (
//                     <div key={key}>
//                       <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
//                       <input
//                         type="text"
//                         value={(filters as any)[key]}
//                         onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
//                         className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder={placeholder}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Results Count */}
//           <div className="mb-3 text-xs text-gray-500">
//             {totalSubmissions} submissions across {backendTotalGroups} groups
//             {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
//           </div>

//           {/* ═══════ GROUPED SUBMISSION CARDS ═══════ */}
//           <div className="space-y-5">
//             {paginatedGroups.map(([groupName, groupInfo]) => {
//               const visibleSubmissions = groupInfo.submissions.slice(0, 2);
//               const hasMore = groupInfo.totalCount > 2;

//               return (
//                 <div key={groupName} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                   {/* Group Header */}
//                   <div className="flex items-center justify-between bg-gradient-to-r from-slate-50 to-blue-50/60 px-5 py-3.5 border-b border-gray-200">
//                     <div className="flex items-center gap-3 min-w-0">
//                       <div className="bg-blue-100 text-blue-600 p-1.5 rounded-lg shrink-0">
//                         <Building size={18} />
//                       </div>
//                       <div className="min-w-0">
//                         <div className="flex items-center gap-2 flex-wrap">
//                           <h2 className="text-sm font-semibold text-gray-900 capitalize truncate">{groupName}</h2>
//                           <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 shrink-0">
//                             {groupInfo.totalCount}
//                           </span>
//                         </div>
//                         <p className="text-xs text-gray-500 truncate">
//                           Client: {visibleSubmissions[0]?.client_name || "N/A"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* ─── Submission rows as cards (no horizontal scroll) ─── */}
//                   <div className="divide-y divide-gray-100">
//                     {visibleSubmissions.map((submission) => (
//                       <div
//                         key={submission.id}
//                         className="px-5 py-3.5 hover:bg-gray-50/80 cursor-pointer transition-colors"
//                         onClick={() => handleCandidateClick(submission)}
//                       >
//                         {/* Row 1: Name + Status + Resume */}
//                         <div className="flex items-start justify-between gap-3 mb-2">
//                           <div className="min-w-0 flex-1">
//                             <div className="text-sm font-semibold text-gray-900 truncate">{submission.candidate_name}</div>
//                             <div className="text-xs text-gray-600 font-semibold mt-0.5 truncate">
//                               {submission.position} · {submission.location || "N/A"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col items-end gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
//                           <div className="flex items-center gap-2">
//                             <div className="w-[210px]">
//                               <Select
//                                 options={candidateStatusOptions}
//                                 isSearchable
//                                 placeholder={submission.status || "Status"}
//                                 value={
//                                   candidateStatusOptions.find((opt) => opt.value === submission.status) || null
//                                 }
//                                 onChange={async (selected) => {
//                                   const newStatus = selected?.value || "";

//                                   // Statuses that require a mandatory comment open the comment modal first
//                                   if (COMMENT_REQUIRED_STATUSES.includes(newStatus)) {
//                                     setCommentModalData({
//                                       submissionId: submission.id,
//                                       candidateName: submission.candidate_name,
//                                       newStatus,
//                                       comment: "",
//                                     });
//                                     setCommentModalOpen(true);
//                                     return;
//                                   }

//                                   submission.status = newStatus;
//                                   try {
//                                     await submissionService.update(submission.id, {
//                                       submission: { status: newStatus },
//                                     });
//                                     fetchSummary();
//                                     console.log("Status updated successfully");
//                                   } catch (err) {
//                                     console.error("Failed to update status", err);
//                                   }
//                                 }}
//                                 styles={{
//                                   control: (base) => ({
//                                     ...base,
//                                     minHeight: "30px",
//                                     height: "30px",
//                                     fontSize: "12px",
//                                     borderColor: "#e5e7eb",
//                                     boxShadow: "none",
//                                     "&:hover": { borderColor: "#d1d5db" },
//                                   }),
//                                   valueContainer: (base) => ({ ...base, padding: "0 6px" }),
//                                   indicatorsContainer: (base) => ({ ...base, height: "30px" }),
//                                   option: (base, { isSelected }) => ({
//                                     ...base,
//                                     fontSize: "12px",
//                                     padding: "6px 10px",
//                                     backgroundColor: isSelected ? "#dbeafe" : "#fff",
//                                     color: "#1e3a8a",
//                                     "&:hover": { backgroundColor: "#eff6ff" },
//                                   }),
//                                   singleValue: (base) => ({ ...base, color: "#1e3a8a", fontSize: "12px" }),
//                                 }}
//                                 menuPortalTarget={document.body}
//                                 menuPosition="fixed"
//                               />
//                             </div>
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 window.open(submission.resume || "N/A", "_blank");
//                               }}
//                               className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors whitespace-nowrap"
//                             >
//                               Resume ↗
//                             </button>
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 navigate("/candidate-tracker", {
//                                   state: { submissionId: submission.id, candidateName: submission.candidate_name },
//                                 });
//                               }}
//                               className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2.5 py-1 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors whitespace-nowrap"
//                             >
//                               View Tracker
//                             </button>
//                           </div>

//                           {/* Status comment (from select/reject confirmation) */}
//                           {(submission as any).status_comment && (
//                             <div className="max-w-[360px] bg-green-50 text-green-800 text-xs rounded-lg px-3 py-2 text-left">
//                               {(submission as any).status_comment}
//                             </div>
//                           )}
//                           </div>
//                         </div>

//                         {/* Row 2: Key details as inline chips */}
//                         <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
//                           <span className="flex items-center gap-1">
//                             <User size={12} className="text-gray-400" />
//                             {submission.recruiter || "N/A"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Clock size={12} className="text-gray-400" />
//                             {submission.notice_period ? `${submission.notice_period}d notice` : "N/A"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <DollarSign size={12} className="text-gray-400" />
//                             CTC: {submission.current_ctc ? `${submission.current_ctc}L` : "N/A"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <DollarSign size={12} className="text-gray-400" />
//                             Budget: {submission.ctc_budget ? `${submission.ctc_budget}L` : "N/A"}
//                           </span>
//                           {submission.submitted_on && (
//                             <span className="text-gray-400">
//                               Submitted {new Date(submission.submitted_on).toLocaleDateString()}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* View More */}
//                   {hasMore && (
//                     <div className="flex justify-center py-2.5 bg-gray-50/60 border-t border-gray-100">
//                       <button
//                         onClick={() => handleViewMore(groupName, visibleSubmissions[0]?.client_name)}
//                         className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors"
//                       >
//                         <ChevronDown size={13} />
//                         {groupInfo.totalCount - 2} more
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="mt-5 flex items-center justify-between bg-white rounded-xl shadow-sm p-3 border border-gray-200">
//               <div className="text-xs text-gray-500">
//                 Page {currentPage} of {totalPages} · {backendTotalGroups} groups
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <button
//                   onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Previous
//                 </button>

//                 <div className="flex items-center gap-1">
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
//                     const showPage =
//                       page === 1 ||
//                       page === totalPages ||
//                       (page >= currentPage - 1 && page <= currentPage + 1);

//                     const showEllipsis =
//                       (page === currentPage - 2 && currentPage > 3) ||
//                       (page === currentPage + 2 && currentPage < totalPages - 2);

//                     if (showEllipsis) {
//                       return <span key={page} className="px-1.5 text-gray-400 text-xs">…</span>;
//                     }

//                     if (!showPage) return null;

//                     return (
//                       <button
//                         key={page}
//                         onClick={() => handlePageChange(page)}
//                         className={`w-8 h-8 text-xs rounded-lg transition-colors ${
//                           currentPage === page
//                             ? "bg-blue-600 text-white font-medium"
//                             : "border border-gray-200 hover:bg-gray-50 text-gray-700"
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <button
//                   onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Empty State */}
//           {Object.keys(groupedData).length === 0 && !loading && (
//             <div className="text-center py-16">
//               <FileText size={40} className="mx-auto text-gray-300 mb-3" />
//               <p className="text-gray-500 font-medium">No submissions found</p>
//               <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
//             </div>
//           )}

//           {/* ═══════ CANDIDATE DETAIL MODAL ═══════ */}
//           {selectedCandidate && (
//             <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 overflow-y-auto p-4 pt-[4vh]">
//               <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl my-4 border border-gray-200/60">

//                 {/* ── Top: Close + Edit bar ── */}
//                 <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
//                   <span className="text-xs text-gray-400">Candidate Detail</span>
//                   <div className="flex items-center gap-2">
//                     {isEditing ? (
//                       <>
//                         <button
//                           onClick={() => {
//                             setIsEditing(false);
//                             if (originalCandidate) {
//                               setSelectedCandidate({ ...originalCandidate });
//                             }
//                           }}
//                           disabled={loading}
//                           className="px-3 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 disabled:opacity-50 transition-colors"
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           onClick={handleSaveCandidate}
//                           disabled={loading}
//                           className="bg-blue-600 text-white px-3 py-1 text-xs rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1.5 transition-colors"
//                         >
//                           {loading ? (
//                             <>
//                               <Loader size={12} className="animate-spin" />
//                               Saving…
//                             </>
//                           ) : (
//                             "Save Changes"
//                           )}
//                         </button>
//                       </>
//                     ) : (
//                       <button
//                         onClick={() => setIsEditing(true)}
//                         className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
//                       >
//                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                         </svg>
//                         Edit
//                       </button>
//                     )}
//                     <button
//                       onClick={() => { setSelectedCandidate(null); setDetailTab("personal"); setIsEditing(false); }}
//                       className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
//                     >
//                       <X size={18} />
//                     </button>
//                   </div>
//                 </div>

//                 {/* ── Profile Card Header ── */}
//                 <div className="px-6 py-5 border-gray-100">
//                   <div className="flex items-start gap-4">
//                     {/* Avatar */}
//                     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
//   <BriefcaseBusiness size={20} className="text-gray-500" />
// </div>
//                     <div className="min-w-0 flex-1">
//                       <h2 className="text-lg font-bold text-gray-900 leading-tight">
//                         {selectedCandidate.candidate_name}
//                       </h2>
//                       <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-gray-500">
//                         {selectedCandidate.candidate_id && (
//                           <span className="font-medium text-gray-700">ID: #{selectedCandidate.candidate_id}</span>
//                         )}
//                         {selectedCandidate.email && (
//                           <a href={`mailto:${selectedCandidate.email}`} className="text-blue-600 hover:text-blue-700 hover:underline">
//                             {selectedCandidate.email}
//                           </a>
//                         )}
//                         {selectedCandidate.mobile_number && (
//                           <span className="flex items-center gap-1">
//                             <Phone size={11} />
//                             {selectedCandidate.mobile_number}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* ── Quick Status Strip ── */}
//                 <div className="mx-6 grid grid-cols-3 overflow-hidden rounded-xl border border-gray-200 bg-white">
//   {/* Position */}
//   <div className="px-5 py-3">
//     <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">
//       Position
//     </div>
//     <div className="text-xs font-semibold flex justify-center text-gray-900 truncate">
//       {selectedCandidate.position_name || "N/A"}
//     </div>
//   </div>

//   {/* Status */}
//   <div className="border-l border-gray-100  px-5 py-3">
//     <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">
//       Status
//     </div>

//     <span
//   className={`flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(
//     selectedCandidate.candidate_status
//   )}`}
// >
//   <span className="h-2 w-2 flex-shrink-0 rounded-full bg-current" />
//   {selectedCandidate.candidate_status || "N/A"}
// </span>
//   </div>

//   {/* Submitted */}
//   <div className="border-l  border-gray-100 px-5 py-3">
//     <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">
//       Submitted
//     </div>
//     <div className="text-xs font-semibold flex justify-center text-gray-900">
//       {selectedCandidate.date_of_submission
//         ? new Date(
//             selectedCandidate.date_of_submission
//           ).toLocaleDateString("en-IN", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//           })
//         : "N/A"}
//     </div>
//   </div>
// </div>

//                 {/* ── Tab Switcher ── */}
//                 <div className="flex justify-center px-6 py-6">
//   <div className="flex w-full max-w-md rounded-xl bg-gray-100 p-1.5">
//     {[
//       { key: "personal" as const, label: "Personal Information" },
//       { key: "position" as const, label: "Position & Documents" },
//     ].map((tab) => (
//       <button
//         key={tab.key}
//         type="button"
//         onClick={() => setDetailTab(tab.key)}
//         className={`flex-1 rounded-lg px-5 py-3 text-sm font-medium transition-all duration-200
//           outline-none focus:outline-none focus:ring-0
//           ${
//             detailTab === tab.key
//   ? "bg-white text-gray-800 shadow-sm"
//   : "bg-transparent text-gray-500 hover:bg-transparent hover:text-gray-700"
//           }`}
//       >
//         {tab.label}
//       </button>
//     ))}
//   </div>
// </div>

//                 {/* ── Tab Content ── */}
//                 <div className="max-h-[55vh] overflow-y-auto">

//                   {/* ═══ TAB 1: Personal Information ═══ */}
//                   {detailTab === "personal" && (
//                     <div className="p-6">
//                       <div className="flex items-center gap-2 mb-4">
//                         <User size={15} className="text-gray-400" />
//                         <h3 className="text-sm font-semibold text-gray-700">Applicant Information</h3>
//                       </div>

//                       <div className="space-y-0">
//                         {[
//                           { label: "Candidate Name", value: "candidate_name", icon: <User size={13} className="text-gray-400" /> },
//                           { label: "Email Address", value: "email", icon: <Mail size={13} className="text-gray-400" /> },
//                           { label: "Mobile Number", value: "mobile_number", icon: <Phone size={13} className="text-gray-400" /> },
//                           { label: "Current Organization", value: "current_last_organization", icon: <Building size={13} className="text-gray-400" /> },
//                           { label: "Experience (Years)", value: "experience", icon: <Clock size={13} className="text-gray-400" /> },
//                           { label: "Current City", value: "current_city", icon: <MapPin size={13} className="text-gray-400" /> },
//                           { label: "Current CTC", value: "current_ctc", icon: <DollarSign size={13} className="text-gray-400" /> },
//                           { label: "Expected CTC", value: "expected_ctc", icon: <DollarSign size={13} className="text-gray-400" /> },
//                           { label: "Notice Period (Days)", value: "notice_period", icon: <Clock size={13} className="text-gray-400" /> },
//                         ].map(({ label, value, icon }) => (
//                           <div key={value} className="flex items-center py-3 border-b border-gray-100 last:border-0">
//                             <div className="flex items-center gap-2.5 w-[200px] shrink-0">
//                               {icon}
//                               <span className="text-sm text-gray-500">{label}</span>
//                             </div>
//                             <span className="text-sm text-gray-400 mr-3">:</span>
//                             {isEditing ? (
//                               <input
//                                 type="text"
//                                 value={(selectedCandidate as any)[value] || ""}
//                                 onChange={(e) =>
//                                   setSelectedCandidate((prev: any) => ({ ...prev, [value]: e.target.value }))
//                                 }
//                                 className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               />
//                             ) : (
//                               <span className="text-sm font-medium text-gray-900">
//                                 {(selectedCandidate as any)[value] || "N/A"}
//                               </span>
//                             )}
//                           </div>
//                         ))}
//                       </div>

//                       {/* Screening Comments */}
//                       <div className="mt-5 pt-4 border-t border-gray-200">
//                         <div className="flex items-center gap-2 mb-2">
//                           <FileText size={13} className="text-gray-400" />
//                           <span className="text-sm text-gray-500">Screening Comments</span>
//                         </div>
//                         {isEditing ? (
//                           <textarea
//                             value={selectedCandidate.screening_comments || ""}
//                             onChange={(e) =>
//                               setSelectedCandidate((prev: any) => ({
//                                 ...prev,
//                                 screening_comments: e.target.value,
//                               }))
//                             }
//                             rows={3}
//                             className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
//                           />
//                         ) : (
//                           <div className="text-sm text-gray-900 bg-gray-50 rounded-lg px-4 py-3 min-h-[40px]">
//                             {selectedCandidate.screening_comments || "No comments"}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {/* ═══ TAB 2: Position & Documents ═══ */}
//                   {detailTab === "position" && (
//                     <div className="p-6">
//                       {/* Position Details */}
//                       <div className="flex items-center gap-2 mb-4">
//                         <Building size={15} className="text-gray-400" />
//                         <h3 className="text-sm font-semibold text-gray-700">Position Details</h3>
//                       </div>

//                       <div className="space-y-0 mb-6">
//                         {[
//                           { label: "Position Name", value: "position_name" },
//                           { label: "Client Name", value: "client_name" },
//                           { label: "Recruiter", value: "recruiter" },
//                           { label: "CTC Budget", value: "ctc_budget" },
//                           { label: "Position Status", value: "position_status" },
//                           { label: "Date of Submission", value: "date_of_submission" },
//                           { label: "Date Profile Shared", value: "date_profile_shared" },
//                           { label: "Interview Date/Time", value: "interview_date_time" },
//                           { label: "Client SPOC", value: "client_spoc" },
//                           { label: "Laksh SPOC", value: "laksh_spoc" },
//                         ].map(({ label, value }) => (
//                           <div key={value} className="flex items-center py-3 border-b border-gray-100 last:border-0">
//                             <div className="w-[200px] shrink-0">
//                               <span className="text-sm text-gray-500">{label}</span>
//                             </div>
//                             <span className="text-sm text-gray-400 mr-3">:</span>
//                             {isEditing ? (
//                               <input
//                                 type="text"
//                                 value={(selectedCandidate as any)[value] || ""}
//                                 onChange={(e) =>
//                                   setSelectedCandidate((prev: any) => ({ ...prev, [value]: e.target.value }))
//                                 }
//                                 className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               />
//                             ) : (
//                               <span className="text-sm font-medium text-gray-900">
//                                 {(selectedCandidate as any)[value] || "N/A"}
//                               </span>
//                             )}
//                           </div>
//                         ))}

//                         {/* Candidate Status row */}
//                         <div className="flex items-center py-3 border-b border-gray-100">
//                           <div className="w-[200px] shrink-0">
//                             <span className="text-sm text-gray-500">Candidate Status</span>
//                           </div>
//                           <span className="text-sm text-gray-400 mr-3">:</span>
//                           {isEditing ? (
//                             <div className="flex-1">
//                               <Select
//                                 options={candidateStatusOptions}
//                                 isSearchable
//                                 placeholder="Select status…"
//                                 value={
//                                   candidateStatusOptions.find(
//                                     (opt) => opt.value === selectedCandidate.candidate_status
//                                   ) || null
//                                 }
//                                 onChange={(selected: { value: string; label: string } | null) =>
//                                   setSelectedCandidate((prev: any) => ({
//                                     ...prev,
//                                     candidate_status: selected?.value || "",
//                                   }))
//                                 }
//                                 styles={{
//                                   control: (base) => ({
//                                     ...base,
//                                     minHeight: "32px",
//                                     fontSize: "13px",
//                                     borderColor: "#e5e7eb",
//                                   }),
//                                   valueContainer: (base) => ({ ...base, padding: "0 8px" }),
//                                   indicatorsContainer: (base) => ({ ...base, height: "32px" }),
//                                 }}
//                               />
//                             </div>
//                           ) : (
//                             <span className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(selectedCandidate.candidate_status)}`}>
//                               {selectedCandidate.candidate_status || "N/A"}
//                             </span>
//                           )}
//                         </div>
//                       </div>

//                       {/* Documents Section */}
//                       <div className="border-t border-gray-200 pt-5">
//                         <div className="flex items-center justify-between mb-4">
//                           <div className="flex items-center gap-2">
//                             <FileText size={15} className="text-gray-400" />
//                             <h3 className="text-sm font-semibold text-gray-700">Documents</h3>
//                             {candidateDocuments.length > 0 && (
//                               <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
//                                 {candidateDocuments.length}
//                               </span>
//                             )}
//                           </div>
//                           <button
//                             onClick={() => {
//                               const candidateId = (selectedCandidate as any).candidate_id;
//                               if (candidateId) openDocumentModal(candidateId);
//                             }}
//                             className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium transition-colors"
//                           >
//                             <Plus size={13} />
//                             Upload
//                           </button>
//                         </div>

//                         <div className="rounded-xl border border-gray-200 overflow-hidden">
//                           {candidateDocuments && candidateDocuments.length > 0 ? (
//                             <div className="divide-y divide-gray-100 max-h-56 overflow-y-auto">
//                               {candidateDocuments.map((doc) => {
//                                 const IconComponent = getDocumentIcon(doc.type);
//                                 return (
//                                   <div
//                                     key={doc.id}
//                                     className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
//                                   >
//                                     <div className="flex items-center gap-3 min-w-0">
//                                       <div className="bg-blue-50 p-2 rounded-lg shrink-0">
//                                         <IconComponent size={14} className="text-blue-600" />
//                                       </div>
//                                       <div className="min-w-0">
//                                         <div className="text-sm font-medium text-gray-900 truncate">{doc.fileName}</div>
//                                         <div className="text-xs text-gray-500">
//                                           {doc.documentType} · {doc.size || "N/A"} · {new Date(doc.uploadedAt).toLocaleDateString()}
//                                         </div>
//                                       </div>
//                                     </div>
//                                     <div className="flex items-center gap-1 shrink-0 ml-3">
//                                       <a
//                                         href={doc.fileUrl}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
//                                       >
//                                         <Download size={14} />
//                                       </a>
//                                       <button
//                                         onClick={() => handleDeleteDocument((selectedCandidate as any).candidate_id, doc.id)}
//                                         className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
//                                       >
//                                         <Trash2 size={14} />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           ) : (
//                             <div className="text-center py-10 bg-gray-50/50">
//                               <FileText size={28} className="mx-auto mb-2 text-gray-300" />
//                               <p className="text-sm text-gray-500">No documents uploaded</p>
//                               <button
//                                 onClick={() => openDocumentModal((selectedCandidate as any).candidate_id)}
//                                 className="mt-1.5 text-blue-600 hover:text-blue-800 text-xs font-medium"
//                               >
//                                 Upload your first document
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                         <p className="text-[11px] text-gray-400 mt-2">
//                           Supported: PDF, DOC, DOCX, JPG, JPEG, PNG
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ═══════ DOCUMENT UPLOAD MODAL ═══════ */}
//       {showDocumentModal && (
//         <div
//           className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
//           style={{ zIndex: 99999 }}
//         >
//           <div
//             className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative"
//             style={{ zIndex: 100000 }}
//           >
//             <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
//               <h2 className="text-base font-bold text-gray-900">Upload Document</h2>
//               <button
//                 onClick={() => {
//                   setShowDocumentModal(false);
//                   setDocumentForm({ name: "", type: "Resume", file: null });
//                 }}
//                 className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Document Name *</label>
//                 <input
//                   type="text"
//                   required
//                   placeholder="e.g., Resume_JohnDoe_2025"
//                   value={documentForm.name}
//                   onChange={(e) =>
//                     setDocumentForm((prev) => ({ ...prev, name: e.target.value }))
//                   }
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Document Type</label>
//                 <select
//                   value={documentForm.type}
//                   onChange={(e) =>
//                     setDocumentForm((prev) => ({ ...prev, type: e.target.value }))
//                   }
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                 >
//                   <option value="Resume">Resume</option>
//                   <option value="Pan Card">Pan Card</option>
//                   <option value="Cover Letter">Cover Letter</option>
//                   <option value="Adhaar Card">Adhaar Card</option>
//                   <option value="Offer Letter">Offer Letter</option>
//                   <option value="Resignation Letter">Resignation Letter</option>
//                   <option value="Academic Document">Academic Document</option>
//                   <option value="Reference Letter">Reference Letter</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Upload Document *</label>
//                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:border-gray-300 transition-colors bg-gray-50/50">
//                   <div className="space-y-1 text-center">
//                     <Upload className="mx-auto h-10 w-10 text-gray-400" />
//                     <div className="flex text-xs text-gray-500">
//                       <label
//                         htmlFor="file-upload"
//                         className="relative cursor-pointer font-medium text-blue-600 hover:text-blue-500"
//                       >
//                         <span>Choose a file</span>
//                         <input
//                           id="file-upload"
//                           name="file-upload"
//                           type="file"
//                           className="sr-only"
//                           accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                           onChange={(e) => {
//                             const file = e.target.files?.[0];
//                             if (file) {
//                               setDocumentForm((prev) => ({
//                                 ...prev,
//                                 file: file,
//                                 name: prev.name || file.name.split(".")[0],
//                               }));
//                             }
//                           }}
//                         />
//                       </label>
//                       <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-[11px] text-gray-400">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
//                   </div>
//                 </div>
//                 {documentForm.file && (
//                   <div className="mt-2 flex items-center gap-2 text-xs text-gray-600 bg-blue-50 rounded-lg px-3 py-2">
//                     <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
//                     <span className="truncate">{documentForm.file.name}</span>
//                     <button
//                       onClick={() => setDocumentForm((prev) => ({ ...prev, file: null }))}
//                       className="text-red-500 hover:text-red-700 shrink-0 ml-auto"
//                     >
//                       <X className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowDocumentModal(false);
//                     setDocumentForm({ name: "", type: "Resume", file: null });
//                   }}
//                   className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleAddDocument}
//                   disabled={!documentForm.name.trim() || !documentForm.file}
//                   className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
//                 >
//                   <Upload className="w-3.5 h-3.5" />
//                   Upload
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ═══════ COMMENT MODAL (mandatory comment on select / reject) ═══════ */}
//       {commentModalOpen && commentModalData && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
//             {/* Modal header */}
//             <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
//               <div className="min-w-0">
//                 <h2 className="text-base font-bold text-gray-900">
//                   {isRejectStatus(commentModalData.newStatus) ? "Confirm Rejection" : "Confirm Selection"}
//                 </h2>
//                 <p className="text-xs text-gray-500 mt-0.5 truncate">{commentModalData.candidateName}</p>
//               </div>
//               <button
//                 onClick={closeCommentModal}
//                 className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             {/* Modal body */}
//             <div className="p-6 space-y-4">
//               <div className="flex items-center gap-2">
//                 <span className="text-xs text-gray-500">Status:</span>
//                 <span
//                   className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${
//                     isRejectStatus(commentModalData.newStatus)
//                       ? "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
//                       : "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
//                   }`}
//                 >
//                   {commentModalData.newStatus}
//                 </span>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">
//                   Comment <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   value={commentModalData.comment}
//                   onChange={(e) =>
//                     setCommentModalData((prev) => (prev ? { ...prev, comment: e.target.value } : prev))
//                   }
//                   placeholder={
//                     isRejectStatus(commentModalData.newStatus)
//                       ? "Reason for rejection is mandatory…"
//                       : "Add your selection comment…"
//                   }
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
//                 />
//               </div>

//               {/* Modal footer */}
//               <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={closeCommentModal}
//                   className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   disabled={!commentModalData.comment.trim()}
//                   onClick={async () => {
//                     try {
//                       await submissionService.update(commentModalData.submissionId, {
//                         submission: {
//                           status: commentModalData.newStatus,
//                           status_comment: commentModalData.comment.trim(),
//                         },
//                       });
//                       fetchSummary();
//                       console.log("Status updated with comment:", commentModalData.newStatus, commentModalData.comment);
//                     } catch (err) {
//                       console.error("Failed to update status with comment", err);
//                     }
//                     closeCommentModal();
//                   }}
//                   className={`px-5 py-2 text-sm text-white rounded-lg transition-colors flex items-center gap-1.5 disabled:bg-gray-300 disabled:cursor-not-allowed ${
//                     isRejectStatus(commentModalData.newStatus)
//                       ? "bg-red-600 hover:bg-red-700"
//                       : "bg-emerald-600 hover:bg-emerald-700"
//                   }`}
//                 >
//                   <MessageSquare className="w-3.5 h-3.5" />
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SubmissionManagementSystem;









// import { useState, useMemo, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import {
//   Search,
//   Filter,
//   FileText,
//   Phone,
//   Mail,
//   Building,
//   Clock,
//   User,
//   DollarSign,
//   MapPin,
//   X,
//   ChevronDown,
//   Upload,
//   Download,
//   Trash2,
//   Plus,
//   Loader,
//   IdCard,
//   BriefcaseBusiness,
//   MessageSquare,
// } from "lucide-react";
// import { submissionService } from "../services/submissionService";
// import type { Submission, DetailedSubmission, SubmissionFilters, CandidateDocument } from "../services/submissionService";
// import { applicantService } from "../services/applicantService";
// import { candidateStatusOptions } from "../constants/dropdown";
// import Select from "react-select";
// import FilterSelect from "../components/FilterSelect";

// const SubmissionManagementSystem = () => {
//   const navigate = useNavigate();

//   // Document state
//   const [candidateDocuments, setCandidateDocuments] = useState<CandidateDocument[]>([]);
//   const [groupBy, setGroupBy] = useState<"position" | "client_name" | "candidate_name" | "status">("position");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     positionName: "",
//     clientName: "",
//     candidateName: "",
//     location: "",
//   });
//   const [selectedCandidate, setSelectedCandidate] = useState<DetailedSubmission | null>(null);
//   const [originalCandidate, setOriginalCandidate] = useState<DetailedSubmission | null>(null);
//   const [showFilters, setShowFilters] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [detailTab, setDetailTab] = useState<"personal" | "position">("personal");
//   const [showDocumentModal, setShowDocumentModal] = useState(false);
//   const [currentCandidateId, setCurrentCandidateId] = useState<number | null>(null);
//   const [documentForm, setDocumentForm] = useState({
//     name: "",
//     type: "Resume",
//     file: null as File | null,
//   });

//   // API states
//   const [groupedData, setGroupedData] = useState<Record<string, { submissions: Submission[], totalCount: number }>>({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Backend pagination metadata
//   const [backendTotalGroups, setBackendTotalGroups] = useState(0);
//   const [backendTotalPages, setBackendTotalPages] = useState(0);
//   const [backendCurrentPage, setBackendCurrentPage] = useState(1);

//   // Group-level pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const GROUPS_PER_PAGE = 10;

//   // ─── Comment Modal State (for select/reject with mandatory comment) ───
//   const COMMENT_REQUIRED_STATUSES = [
//     "Final Select", "R1 select", "R2 select", "R3 Select",
//     "Client Reject", "Internal Reject", "Profile Reject", "Reject",
//     "R1 reject", "R2 reject", "R3 reject", "Offer Drop", "Dropout",
//   ];
//   const [commentModalOpen, setCommentModalOpen] = useState(false);
//   const [commentModalData, setCommentModalData] = useState<{
//     submissionId: number;
//     candidateName: string;
//     newStatus: string;
//     comment: string;
//   } | null>(null);

//   const isRejectStatus = (status: string) =>
//     status.toLowerCase().includes("reject") || status === "Offer Drop" || status === "Dropout";

//   const closeCommentModal = () => {
//     setCommentModalOpen(false);
//     setCommentModalData(null);
//   };

//   const fetchSummary = async (page: number = 1) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const apiFilters: SubmissionFilters = {
//         position: filters.positionName || undefined,
//         client_name: filters.clientName || undefined,
//         candidate_name: filters.candidateName || undefined,
//         location: filters.location || undefined,
//         groupBy: groupBy,
//         search: searchTerm || undefined,
//       };

//       const response = await submissionService.fetchSummary(apiFilters, page);

//       if (response.status === 200) {
//         setGroupedData(response.data.groups);
//         setBackendTotalGroups(response.data.totalGroups || 0);
//         setBackendTotalPages(response.data.totalPages || 0);
//         setBackendCurrentPage(response.data.currentPage || page);

//         console.log("📊 Backend Pagination info:", {
//           totalGroups: response.data.totalGroups,
//           currentPage: response.data.currentPage,
//           totalPages: response.data.totalPages,
//         });
//       }
//     } catch (err: any) {
//       setError(err?.message || "Failed to fetch submissions");
//       console.error("Error fetching summary:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewMore = (groupName: string, clientName?: string) => {
//     console.log("🔗 handleViewMore called");
//     console.log("  groupName:", groupName);
//     console.log("  groupBy:", groupBy);
//     console.log("  clientName:", clientName);

//     const state: any = {
//       groupName,
//       groupBy: groupBy,
//       filters: filters,
//       searchTerm: searchTerm,
//       currentPage: currentPage,
//     };

//     // Set appropriate fields based on groupBy type
//     if (groupBy === "position") {
//       state.positionName = groupName;
//       console.log("  Setting positionName:", groupName);
//     } else if (groupBy === "client_name") {
//       state.clientName = groupName;
//       console.log("  Setting clientName:", groupName);
//     } else if (groupBy === "candidate_name") {
//       state.candidateName = groupName;
//       console.log("  Setting candidateName:", groupName);
//     } else if (groupBy === "status") {
//       state.status = groupName;
//       console.log("  Setting status:", groupName);
//     }

//     console.log("🚀 Navigating to /submission-group-detail with state:", state);
//     navigate("/submission-group-detail", { state });
//   };

//   // const handleCandidateClick = (submission: Submission) => {
//   //   // Navigate to the detail page URL instead of opening a modal
//   //   navigate(`/submission-group-detail/${submission.id}`, {
//   //     state: {
//   //       groupName: groupBy === "position" ? submission.position :
//   //                  groupBy === "client_name" ? submission.client_name :
//   //                  groupBy === "candidate_name" ? submission.candidate_name :
//   //                  submission.status,
//   //       filters: filters,
//   //       searchTerm: searchTerm,
//   //       currentPage: currentPage,
//   //     },
//   //   });
//   // };

//   const handleCandidateClick = (submission: Submission) => {
//   navigate(`/submission-group-detail/${submission.id}`, {
//     state: {
//       fromGroupDetail: false,
//       groupBy,
//       groupName:
//         groupBy === "position" ? submission.position :
//         groupBy === "client_name" ? submission.client_name :
//         groupBy === "candidate_name" ? submission.candidate_name :
//         submission.status,
//       filters,
//       searchTerm,
//       currentPage,
//     },
//   });
// };

//   const fetchCandidateDocuments = async (candidateId: string) => {
//     try {
//       const response = await applicantService.fetchDocuments(candidateId);
//       if (response.status === 200) {
//         setCandidateDocuments(response.data || []);
//       }
//     } catch (err: any) {
//       console.error("Error fetching documents:", err);
//     }
//   };

//   const handleSaveCandidate = async () => {
//     if (!selectedCandidate) {
//       console.error("❌ No selected candidate");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const submissionId = selectedCandidate.id?.toString();

//       if (!submissionId) {
//         throw new Error("Submission ID not found. Please refresh and try again.");
//       }

//       const applicantData = {
//         name: selectedCandidate.candidate_name,
//         email: selectedCandidate.email,
//         phone: selectedCandidate.mobile_number,
//         city: selectedCandidate.current_city,
//         current_last_organisation: selectedCandidate.current_last_organization,
//         total_experience_in_years: selectedCandidate.experience,
//         current_ctc: selectedCandidate.current_ctc,
//         expected_ctc: selectedCandidate.expected_ctc,
//         notice_period_in_days: selectedCandidate.notice_period,
//         special_comments: selectedCandidate.screening_comments,
//       };

//       const jobData = {
//         position: selectedCandidate.position_name,
//         ctc: selectedCandidate.ctc_budget,
//         client_spoc: selectedCandidate.client_spoc,
//       };

//       const submissionData = {
//         status: selectedCandidate.candidate_status,
//         date_profile_shared_from_Applicants: selectedCandidate.date_profile_shared,
//         candidate_status_update_date: selectedCandidate.interview_date_time,
//       };

//       const updateData = {
//         applicant: applicantData,
//         job: jobData,
//         submission: submissionData,
//       };

//       const response = await submissionService.update(submissionId, updateData);

//       if (response.status === 200) {
//         setIsEditing(false);
//         await fetchSummary(currentPage);
//         alert("Candidate details updated successfully!");
//         setSelectedCandidate(null);
//       } else {
//         throw new Error(response.message || "Failed to update candidate");
//       }
//     } catch (err: any) {
//       console.error("❌ Error updating candidate:", err);
//       const errorMessage = err.message || "Failed to update candidate details";
//       setError(errorMessage);
//       alert("❌ " + errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSummary(currentPage);
//   }, [groupBy]);

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       fetchSummary(1);
//       setCurrentPage(1);
//     }, 500);

//     return () => clearTimeout(delayDebounce);
//   }, [searchTerm, filters]);

//   const getStatusColor = (status: string) => {
//     const colors: Record<string, string> = {
//       "New Submission": "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20",
//       "Profile Shared": "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
//       "R1 Scheduled": "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20",
//       "R1 Completed": "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20",
//       "R2 Scheduled": "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20",
//       "R2 Completed": "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20",
//       "R3 Scheduled": "bg-pink-50 text-pink-700 ring-1 ring-inset ring-pink-600/20",
//       Selected: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
//       Rejected: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
//     };
//     return colors[status] || "bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20";
//   };

//   const openDocumentModal = (candidateId: number) => {
//     setCurrentCandidateId(candidateId);
//     setShowDocumentModal(true);
//   };

//   const handleAddDocument = async () => {
//     if (!documentForm.name.trim() || !documentForm.file || !selectedCandidate) {
//       alert("Please provide a document name and select a file.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await applicantService.uploadDocument(
//         selectedCandidate.candidate_id,
//         documentForm.type,
//         documentForm.file
//       );

//       if (response.status === 200) {
//         await fetchCandidateDocuments(selectedCandidate.candidate_id);
//         setDocumentForm({ name: "", type: "Resume", file: null });
//         setShowDocumentModal(false);
//         alert("Document uploaded successfully!");
//       } else {
//         console.error("Upload failed:", response.data);
//         alert(response.data?.message || "Failed to upload document");
//       }
//     } catch (err: any) {
//       console.error("Error uploading document:", err);
//       alert(err?.response?.data?.message || "Failed to upload document");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteDocument = async (candidateId: any, documentId: any) => {
//     if (!documentId) {
//       alert("Document ID is required");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete this document?")) {
//       return;
//     }

//     try {
//       await applicantService.deleteDocument(candidateId, documentId);
//       await fetchCandidateDocuments(candidateId);

//       if (selectedCandidate?.candidate_id === candidateId) {
//         setSelectedCandidate((prev: any) => ({
//           ...prev,
//           documents: prev.documents?.filter((doc: any) => doc.id !== documentId) || [],
//         }));
//       }

//       alert("Document deleted successfully!");
//     } catch (error: any) {
//       console.error("Failed to delete document:", error);
//       alert(
//         error?.response?.data?.message ||
//         "Failed to delete document. Please try again."
//       );
//     }
//   };

//   const getDocumentIcon = (type: string) => {
//     return FileText;
//   };

//   const totalSubmissions = Object.values(groupedData).reduce(
//     (sum, group) => sum + group.totalCount,
//     0
//   );

//   const groupEntries = Object.entries(groupedData);
//   const totalPages = backendTotalPages || 1;
//   const paginatedGroups = groupEntries;

//   const handlePageChange = (newPage: number) => {
//     setCurrentPage(newPage);
//     fetchSummary(newPage);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//         <div className="max-w-7xl mx-auto">
//           {/* Loading Overlay */}
//           {loading && (
//             <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//               <div className="bg-white rounded-xl p-6 shadow-xl flex flex-col items-center gap-3">
//                 <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-blue-600"></div>
//                 <p className="text-sm text-gray-600 font-medium">Loading…</p>
//               </div>
//             </div>
//           )}

//           {/* Error Alert */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2">
//               <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <p className="text-sm text-red-800 flex-1">{error}</p>
//               <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 p-1">
//                 <X size={14} />
//               </button>
//             </div>
//           )}

//           {/* Header Bar */}
//           <div className="bg-white rounded-xl shadow-sm p-5 mb-5">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//               <h2 className="text-xl font-bold text-gray-900">Submission Management</h2>

//               {/* Search */}
//               <div className="flex-1 max-w-md">
//                 <div className="relative">
//                   <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-9 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Search candidates, positions, clients…"
//                   />
//                   {searchTerm && (
//                     <button
//                       onClick={() => setSearchTerm("")}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       <X size={14} />
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Group By + Filters */}
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-2">
//                   <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Group by</label>
//                  <FilterSelect
//   ariaLabel="Group by"
//   className="w-40"
//   value={groupBy}
//   onChange={(v) => setGroupBy(v as typeof groupBy)}
//   options={[
//     { value: "position", label: "Position" },
//     { value: "client_name", label: "Client" },
//     { value: "candidate_name", label: "Candidate" },
//     { value: "status", label: "Status" },
//   ]}
// />
//                 </div>

//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className={`flex items-center gap-1.5 px-3 py-2 border rounded-lg text-sm transition-colors ${
//                     showFilters ? "border-blue-300 bg-blue-50 text-blue-700" : "border-gray-200 hover:bg-gray-50 text-gray-700"
//                   }`}
//                 >
//                   <Filter size={14} />
//                   Filters
//                   <ChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
//                 </button>
//               </div>
//             </div>

//             {/* Filters Panel */}
//             {showFilters && (
//               <div className="mt-4 pt-4 border-t border-gray-100">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//                   {[
//                     { label: "Position", key: "positionName", placeholder: "Filter by position…" },
//                     { label: "Client", key: "clientName", placeholder: "Filter by client…" },
//                     { label: "Candidate", key: "candidateName", placeholder: "Filter by candidate…" },
//                     { label: "Location", key: "location", placeholder: "Filter by location…" },
//                   ].map(({ label, key, placeholder }) => (
//                     <div key={key}>
//                       <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
//                       <input
//                         type="text"
//                         value={(filters as any)[key]}
//                         onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
//                         className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder={placeholder}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Results Count */}
//           <div className="mb-3 text-xs text-gray-500">
//             {totalSubmissions} submissions across {backendTotalGroups} groups
//             {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
//           </div>

//           {/* ═══════ GROUPED SUBMISSION CARDS ═══════ */}
//           <div className="space-y-5">
//             {paginatedGroups.map(([groupName, groupInfo]) => {
//               const visibleSubmissions = groupInfo.submissions.slice(0, 2);
//               const hasMore = groupInfo.totalCount > 2;

//               return (
//                 <div key={groupName} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                   {/* Group Header */}
//                   <div className="flex items-center justify-between bg-gradient-to-r from-slate-50 to-blue-50/60 px-5 py-3.5 border-b border-gray-200">
//                     <div className="flex items-center gap-3 min-w-0">
//                       <div className="bg-blue-100 text-blue-600 p-1.5 rounded-lg shrink-0">
//                         <Building size={18} />
//                       </div>
//                       <div className="min-w-0">
//                         <div className="flex items-center gap-2 flex-wrap">
//                           <h2 className="text-sm font-semibold text-gray-900 capitalize truncate">{groupName}</h2>
//                           <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 shrink-0">
//                             {groupInfo.totalCount}
//                           </span>
//                         </div>
//                         <p className="text-xs text-gray-500 truncate">
//                           Client: {visibleSubmissions[0]?.client_name || "N/A"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* ─── Submission rows as cards (no horizontal scroll) ─── */}
//                   <div className="divide-y divide-gray-100">
//                     {visibleSubmissions.map((submission) => (
//                       <div
//                         key={submission.id}
//                         className="px-5 py-3.5 hover:bg-gray-50/80 cursor-pointer transition-colors"
//                         onClick={() => handleCandidateClick(submission)}
//                       >
//                         {/* Row 1: Name + Status + Resume */}
//                         <div className="flex items-start justify-between gap-3 mb-2">
//                           <div className="min-w-0 flex-1">
//                             <div className="text-sm font-semibold text-gray-900 truncate">{submission.candidate_name}</div>
//                             <div className="text-xs text-gray-600 font-semibold mt-0.5 truncate">
//                               {submission.position} · {submission.location || "N/A"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col items-end gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
//                           <div className="flex items-center gap-2">
//                             <div className="w-[210px]">
//                               <Select
//                                 options={candidateStatusOptions}
//                                 isSearchable
//                                 placeholder={submission.status || "Status"}
//                                 value={
//                                   candidateStatusOptions.find((opt) => opt.value === submission.status) || null
//                                 }
//                                 onChange={async (selected) => {
//                                   const newStatus = selected?.value || "";

//                                   // Statuses that require a mandatory comment open the comment modal first
//                                   if (COMMENT_REQUIRED_STATUSES.includes(newStatus)) {
//                                     setCommentModalData({
//                                       submissionId: submission.id,
//                                       candidateName: submission.candidate_name,
//                                       newStatus,
//                                       comment: "",
//                                     });
//                                     setCommentModalOpen(true);
//                                     return;
//                                   }

//                                   submission.status = newStatus;
//                                   try {
//                                     await submissionService.update(submission.id, {
//                                       submission: { status: newStatus },
//                                     });
//                                     fetchSummary();
//                                     console.log("Status updated successfully");
//                                   } catch (err) {
//                                     console.error("Failed to update status", err);
//                                   }
//                                 }}
//                                 styles={{
//                                   control: (base) => ({
//                                     ...base,
//                                     minHeight: "30px",
//                                     height: "30px",
//                                     fontSize: "12px",
//                                     borderColor: "#e5e7eb",
//                                     boxShadow: "none",
//                                     "&:hover": { borderColor: "#d1d5db" },
//                                   }),
//                                   valueContainer: (base) => ({ ...base, padding: "0 6px" }),
//                                   indicatorsContainer: (base) => ({ ...base, height: "30px" }),
//                                   option: (base, { isSelected }) => ({
//                                     ...base,
//                                     fontSize: "12px",
//                                     padding: "6px 10px",
//                                     backgroundColor: isSelected ? "#dbeafe" : "#fff",
//                                     color: "#1e3a8a",
//                                     "&:hover": { backgroundColor: "#eff6ff" },
//                                   }),
//                                   singleValue: (base) => ({ ...base, color: "#1e3a8a", fontSize: "12px" }),
//                                 }}
//                                 menuPortalTarget={document.body}
//                                 menuPosition="fixed"
//                               />
//                             </div>
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 window.open(submission.resume || "N/A", "_blank");
//                               }}
//                               className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors whitespace-nowrap"
//                             >
//                               Resume ↗
//                             </button>
//                             {/* <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 navigate("/candidate-tracker", {
//                                   state: { submissionId: submission.id, candidateName: submission.candidate_name },
//                                 });
//                               }}
//                               className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2.5 py-1 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors whitespace-nowrap"
//                             >
//                               View Tracker
//                             </button> */}

//                             <button
//   onClick={(e) => {
//     e.stopPropagation();
//     handleCandidateClick(submission);
//   }}
//   className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2.5 py-1 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors whitespace-nowrap"
// >
//   View Tracker
// </button>
//                           </div>

//                           {/* Status comment (from select/reject confirmation) */}
//                           {(submission as any).status_comment && (
//                             <div className="max-w-[360px] bg-green-50 text-green-800 text-xs rounded-lg px-3 py-2 text-left">
//                               {(submission as any).status_comment}
//                             </div>
//                           )}
//                           </div>
//                         </div>

//                         {/* Row 2: Key details as inline chips */}
//                         <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
//                           <span className="flex items-center gap-1">
//                             <User size={12} className="text-gray-400" />
//                             {submission.recruiter || "N/A"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Clock size={12} className="text-gray-400" />
//                             {submission.notice_period ? `${submission.notice_period}d notice` : "N/A"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <DollarSign size={12} className="text-gray-400" />
//                             CTC: {submission.current_ctc ? `${submission.current_ctc}L` : "N/A"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <DollarSign size={12} className="text-gray-400" />
//                             Budget: {submission.ctc_budget ? `${submission.ctc_budget}L` : "N/A"}
//                           </span>
//                           {submission.submitted_on && (
//                             <span className="text-gray-400">
//                               Submitted {new Date(submission.submitted_on).toLocaleDateString()}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* View More */}
//                   {hasMore && (
//                     <div className="flex justify-center py-2.5 bg-gray-50/60 border-t border-gray-100">
//                       <button
//                         onClick={() => handleViewMore(groupName, visibleSubmissions[0]?.client_name)}
//                         className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors"
//                       >
//                         <ChevronDown size={13} />
//                         {groupInfo.totalCount - 2} more
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="mt-5 flex items-center justify-between bg-white rounded-xl shadow-sm p-3 border border-gray-200">
//               <div className="text-xs text-gray-500">
//                 Page {currentPage} of {totalPages} · {backendTotalGroups} groups
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <button
//                   onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Previous
//                 </button>

//                 <div className="flex items-center gap-1">
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
//                     const showPage =
//                       page === 1 ||
//                       page === totalPages ||
//                       (page >= currentPage - 1 && page <= currentPage + 1);

//                     const showEllipsis =
//                       (page === currentPage - 2 && currentPage > 3) ||
//                       (page === currentPage + 2 && currentPage < totalPages - 2);

//                     if (showEllipsis) {
//                       return <span key={page} className="px-1.5 text-gray-400 text-xs">…</span>;
//                     }

//                     if (!showPage) return null;

//                     return (
//                       <button
//                         key={page}
//                         onClick={() => handlePageChange(page)}
//                         className={`w-8 h-8 text-xs rounded-lg transition-colors ${
//                           currentPage === page
//                             ? "bg-blue-600 text-white font-medium"
//                             : "border border-gray-200 hover:bg-gray-50 text-gray-700"
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <button
//                   onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Empty State */}
//           {Object.keys(groupedData).length === 0 && !loading && (
//             <div className="text-center py-16">
//               <FileText size={40} className="mx-auto text-gray-300 mb-3" />
//               <p className="text-gray-500 font-medium">No submissions found</p>
//               <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
//             </div>
//           )}

//           {/* ═══════ CANDIDATE DETAIL MODAL ═══════ */}
//           {selectedCandidate && (
//             <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 overflow-y-auto p-4 pt-[4vh]">
//               <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl my-4 border border-gray-200/60">

//                 {/* ── Top: Close + Edit bar ── */}
//                 <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
//                   <span className="text-xs text-gray-400">Candidate Detail</span>
//                   <div className="flex items-center gap-2">
//                     {isEditing ? (
//                       <>
//                         <button
//                           onClick={() => {
//                             setIsEditing(false);
//                             if (originalCandidate) {
//                               setSelectedCandidate({ ...originalCandidate });
//                             }
//                           }}
//                           disabled={loading}
//                           className="px-3 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 disabled:opacity-50 transition-colors"
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           onClick={handleSaveCandidate}
//                           disabled={loading}
//                           className="bg-blue-600 text-white px-3 py-1 text-xs rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1.5 transition-colors"
//                         >
//                           {loading ? (
//                             <>
//                               <Loader size={12} className="animate-spin" />
//                               Saving…
//                             </>
//                           ) : (
//                             "Save Changes"
//                           )}
//                         </button>
//                       </>
//                     ) : (
//                       <button
//                         onClick={() => setIsEditing(true)}
//                         className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
//                       >
//                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                         </svg>
//                         Edit
//                       </button>
//                     )}
//                     <button
//                       onClick={() => { setSelectedCandidate(null); setDetailTab("personal"); setIsEditing(false); }}
//                       className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
//                     >
//                       <X size={18} />
//                     </button>
//                   </div>
//                 </div>

//                 {/* ── Profile Card Header ── */}
//                 <div className="px-6 py-5 border-gray-100">
//                   <div className="flex items-start gap-4">
//                     {/* Avatar */}
//                     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
//   <BriefcaseBusiness size={20} className="text-gray-500" />
// </div>
//                     <div className="min-w-0 flex-1">
//                       <h2 className="text-lg font-bold text-gray-900 leading-tight">
//                         {selectedCandidate.candidate_name}
//                       </h2>
//                       <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-gray-500">
//                         {selectedCandidate.candidate_id && (
//                           <span className="font-medium text-gray-700">ID: #{selectedCandidate.candidate_id}</span>
//                         )}
//                         {selectedCandidate.email && (
//                           <a href={`mailto:${selectedCandidate.email}`} className="text-blue-600 hover:text-blue-700 hover:underline">
//                             {selectedCandidate.email}
//                           </a>
//                         )}
//                         {selectedCandidate.mobile_number && (
//                           <span className="flex items-center gap-1">
//                             <Phone size={11} />
//                             {selectedCandidate.mobile_number}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* ── Quick Status Strip ── */}
//                 <div className="mx-6 grid grid-cols-3 overflow-hidden rounded-xl border border-gray-200 bg-white">
//   {/* Position */}
//   <div className="px-5 py-3">
//     <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">
//       Position
//     </div>
//     <div className="text-xs font-semibold flex justify-center text-gray-900 truncate">
//       {selectedCandidate.position_name || "N/A"}
//     </div>
//   </div>

//   {/* Status */}
//   <div className="border-l border-gray-100  px-5 py-3">
//     <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">
//       Status
//     </div>

//     <span
//   className={`flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(
//     selectedCandidate.candidate_status
//   )}`}
// >
//   <span className="h-2 w-2 flex-shrink-0 rounded-full bg-current" />
//   {selectedCandidate.candidate_status || "N/A"}
// </span>
//   </div>

//   {/* Submitted */}
//   <div className="border-l  border-gray-100 px-5 py-3">
//     <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">
//       Submitted
//     </div>
//     <div className="text-xs font-semibold flex justify-center text-gray-900">
//       {selectedCandidate.date_of_submission
//         ? new Date(
//             selectedCandidate.date_of_submission
//           ).toLocaleDateString("en-IN", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//           })
//         : "N/A"}
//     </div>
//   </div>
// </div>

//                 {/* ── Tab Switcher ── */}
//                 <div className="flex justify-center px-6 py-6">
//   <div className="flex w-full max-w-md rounded-xl bg-gray-100 p-1.5">
//     {[
//       { key: "personal" as const, label: "Personal Information" },
//       { key: "position" as const, label: "Position & Documents" },
//     ].map((tab) => (
//       <button
//         key={tab.key}
//         type="button"
//         onClick={() => setDetailTab(tab.key)}
//         className={`flex-1 rounded-lg px-5 py-3 text-sm font-medium transition-all duration-200
//           outline-none focus:outline-none focus:ring-0
//           ${
//             detailTab === tab.key
//   ? "bg-white text-gray-800 shadow-sm"
//   : "bg-transparent text-gray-500 hover:bg-transparent hover:text-gray-700"
//           }`}
//       >
//         {tab.label}
//       </button>
//     ))}
//   </div>
// </div>

//                 {/* ── Tab Content ── */}
//                 <div className="max-h-[55vh] overflow-y-auto">

//                   {/* ═══ TAB 1: Personal Information ═══ */}
//                   {detailTab === "personal" && (
//                     <div className="p-6">
//                       <div className="flex items-center gap-2 mb-4">
//                         <User size={15} className="text-gray-400" />
//                         <h3 className="text-sm font-semibold text-gray-700">Applicant Information</h3>
//                       </div>

//                       <div className="space-y-0">
//                         {[
//                           { label: "Candidate Name", value: "candidate_name", icon: <User size={13} className="text-gray-400" /> },
//                           { label: "Email Address", value: "email", icon: <Mail size={13} className="text-gray-400" /> },
//                           { label: "Mobile Number", value: "mobile_number", icon: <Phone size={13} className="text-gray-400" /> },
//                           { label: "Current Organization", value: "current_last_organization", icon: <Building size={13} className="text-gray-400" /> },
//                           { label: "Experience (Years)", value: "experience", icon: <Clock size={13} className="text-gray-400" /> },
//                           { label: "Current City", value: "current_city", icon: <MapPin size={13} className="text-gray-400" /> },
//                           { label: "Current CTC", value: "current_ctc", icon: <DollarSign size={13} className="text-gray-400" /> },
//                           { label: "Expected CTC", value: "expected_ctc", icon: <DollarSign size={13} className="text-gray-400" /> },
//                           { label: "Notice Period (Days)", value: "notice_period", icon: <Clock size={13} className="text-gray-400" /> },
//                         ].map(({ label, value, icon }) => (
//                           <div key={value} className="flex items-center py-3 border-b border-gray-100 last:border-0">
//                             <div className="flex items-center gap-2.5 w-[200px] shrink-0">
//                               {icon}
//                               <span className="text-sm text-gray-500">{label}</span>
//                             </div>
//                             <span className="text-sm text-gray-400 mr-3">:</span>
//                             {isEditing ? (
//                               <input
//                                 type="text"
//                                 value={(selectedCandidate as any)[value] || ""}
//                                 onChange={(e) =>
//                                   setSelectedCandidate((prev: any) => ({ ...prev, [value]: e.target.value }))
//                                 }
//                                 className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               />
//                             ) : (
//                               <span className="text-sm font-medium text-gray-900">
//                                 {(selectedCandidate as any)[value] || "N/A"}
//                               </span>
//                             )}
//                           </div>
//                         ))}
//                       </div>

//                       {/* Screening Comments */}
//                       <div className="mt-5 pt-4 border-t border-gray-200">
//                         <div className="flex items-center gap-2 mb-2">
//                           <FileText size={13} className="text-gray-400" />
//                           <span className="text-sm text-gray-500">Screening Comments</span>
//                         </div>
//                         {isEditing ? (
//                           <textarea
//                             value={selectedCandidate.screening_comments || ""}
//                             onChange={(e) =>
//                               setSelectedCandidate((prev: any) => ({
//                                 ...prev,
//                                 screening_comments: e.target.value,
//                               }))
//                             }
//                             rows={3}
//                             className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
//                           />
//                         ) : (
//                           <div className="text-sm text-gray-900 bg-gray-50 rounded-lg px-4 py-3 min-h-[40px]">
//                             {selectedCandidate.screening_comments || "No comments"}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {/* ═══ TAB 2: Position & Documents ═══ */}
//                   {detailTab === "position" && (
//                     <div className="p-6">
//                       {/* Position Details */}
//                       <div className="flex items-center gap-2 mb-4">
//                         <Building size={15} className="text-gray-400" />
//                         <h3 className="text-sm font-semibold text-gray-700">Position Details</h3>
//                       </div>

//                       <div className="space-y-0 mb-6">
//                         {[
//                           { label: "Position Name", value: "position_name" },
//                           { label: "Client Name", value: "client_name" },
//                           { label: "Recruiter", value: "recruiter" },
//                           { label: "CTC Budget", value: "ctc_budget" },
//                           { label: "Position Status", value: "position_status" },
//                           { label: "Date of Submission", value: "date_of_submission" },
//                           { label: "Date Profile Shared", value: "date_profile_shared" },
//                           { label: "Interview Date/Time", value: "interview_date_time" },
//                           { label: "Client SPOC", value: "client_spoc" },
//                           { label: "Laksh SPOC", value: "laksh_spoc" },
//                         ].map(({ label, value }) => (
//                           <div key={value} className="flex items-center py-3 border-b border-gray-100 last:border-0">
//                             <div className="w-[200px] shrink-0">
//                               <span className="text-sm text-gray-500">{label}</span>
//                             </div>
//                             <span className="text-sm text-gray-400 mr-3">:</span>
//                             {isEditing ? (
//                               <input
//                                 type="text"
//                                 value={(selectedCandidate as any)[value] || ""}
//                                 onChange={(e) =>
//                                   setSelectedCandidate((prev: any) => ({ ...prev, [value]: e.target.value }))
//                                 }
//                                 className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               />
//                             ) : (
//                               <span className="text-sm font-medium text-gray-900">
//                                 {(selectedCandidate as any)[value] || "N/A"}
//                               </span>
//                             )}
//                           </div>
//                         ))}

//                         {/* Candidate Status row */}
//                         <div className="flex items-center py-3 border-b border-gray-100">
//                           <div className="w-[200px] shrink-0">
//                             <span className="text-sm text-gray-500">Candidate Status</span>
//                           </div>
//                           <span className="text-sm text-gray-400 mr-3">:</span>
//                           {isEditing ? (
//                             <div className="flex-1">
//                               <Select
//                                 options={candidateStatusOptions}
//                                 isSearchable
//                                 placeholder="Select status…"
//                                 value={
//                                   candidateStatusOptions.find(
//                                     (opt) => opt.value === selectedCandidate.candidate_status
//                                   ) || null
//                                 }
//                                 onChange={(selected: { value: string; label: string } | null) =>
//                                   setSelectedCandidate((prev: any) => ({
//                                     ...prev,
//                                     candidate_status: selected?.value || "",
//                                   }))
//                                 }
//                                 styles={{
//                                   control: (base) => ({
//                                     ...base,
//                                     minHeight: "32px",
//                                     fontSize: "13px",
//                                     borderColor: "#e5e7eb",
//                                   }),
//                                   valueContainer: (base) => ({ ...base, padding: "0 8px" }),
//                                   indicatorsContainer: (base) => ({ ...base, height: "32px" }),
//                                 }}
//                               />
//                             </div>
//                           ) : (
//                             <span className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(selectedCandidate.candidate_status)}`}>
//                               {selectedCandidate.candidate_status || "N/A"}
//                             </span>
//                           )}
//                         </div>
//                       </div>

//                       {/* Documents Section */}
//                       <div className="border-t border-gray-200 pt-5">
//                         <div className="flex items-center justify-between mb-4">
//                           <div className="flex items-center gap-2">
//                             <FileText size={15} className="text-gray-400" />
//                             <h3 className="text-sm font-semibold text-gray-700">Documents</h3>
//                             {candidateDocuments.length > 0 && (
//                               <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
//                                 {candidateDocuments.length}
//                               </span>
//                             )}
//                           </div>
//                           <button
//                             onClick={() => {
//                               const candidateId = (selectedCandidate as any).candidate_id;
//                               if (candidateId) openDocumentModal(candidateId);
//                             }}
//                             className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium transition-colors"
//                           >
//                             <Plus size={13} />
//                             Upload
//                           </button>
//                         </div>

//                         <div className="rounded-xl border border-gray-200 overflow-hidden">
//                           {candidateDocuments && candidateDocuments.length > 0 ? (
//                             <div className="divide-y divide-gray-100 max-h-56 overflow-y-auto">
//                               {candidateDocuments.map((doc) => {
//                                 const IconComponent = getDocumentIcon(doc.type);
//                                 return (
//                                   <div
//                                     key={doc.id}
//                                     className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
//                                   >
//                                     <div className="flex items-center gap-3 min-w-0">
//                                       <div className="bg-blue-50 p-2 rounded-lg shrink-0">
//                                         <IconComponent size={14} className="text-blue-600" />
//                                       </div>
//                                       <div className="min-w-0">
//                                         <div className="text-sm font-medium text-gray-900 truncate">{doc.fileName}</div>
//                                         <div className="text-xs text-gray-500">
//                                           {doc.documentType} · {doc.size || "N/A"} · {new Date(doc.uploadedAt).toLocaleDateString()}
//                                         </div>
//                                       </div>
//                                     </div>
//                                     <div className="flex items-center gap-1 shrink-0 ml-3">
//                                       <a
//                                         href={doc.fileUrl}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
//                                       >
//                                         <Download size={14} />
//                                       </a>
//                                       <button
//                                         onClick={() => handleDeleteDocument((selectedCandidate as any).candidate_id, doc.id)}
//                                         className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
//                                       >
//                                         <Trash2 size={14} />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           ) : (
//                             <div className="text-center py-10 bg-gray-50/50">
//                               <FileText size={28} className="mx-auto mb-2 text-gray-300" />
//                               <p className="text-sm text-gray-500">No documents uploaded</p>
//                               <button
//                                 onClick={() => openDocumentModal((selectedCandidate as any).candidate_id)}
//                                 className="mt-1.5 text-blue-600 hover:text-blue-800 text-xs font-medium"
//                               >
//                                 Upload your first document
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                         <p className="text-[11px] text-gray-400 mt-2">
//                           Supported: PDF, DOC, DOCX, JPG, JPEG, PNG
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ═══════ DOCUMENT UPLOAD MODAL ═══════ */}
//       {showDocumentModal && (
//         <div
//           className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
//           style={{ zIndex: 99999 }}
//         >
//           <div
//             className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative"
//             style={{ zIndex: 100000 }}
//           >
//             <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
//               <h2 className="text-base font-bold text-gray-900">Upload Document</h2>
//               <button
//                 onClick={() => {
//                   setShowDocumentModal(false);
//                   setDocumentForm({ name: "", type: "Resume", file: null });
//                 }}
//                 className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Document Name *</label>
//                 <input
//                   type="text"
//                   required
//                   placeholder="e.g., Resume_JohnDoe_2025"
//                   value={documentForm.name}
//                   onChange={(e) =>
//                     setDocumentForm((prev) => ({ ...prev, name: e.target.value }))
//                   }
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Document Type</label>
//                 <select
//                   value={documentForm.type}
//                   onChange={(e) =>
//                     setDocumentForm((prev) => ({ ...prev, type: e.target.value }))
//                   }
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                 >
//                   <option value="Resume">Resume</option>
//                   <option value="Pan Card">Pan Card</option>
//                   <option value="Cover Letter">Cover Letter</option>
//                   <option value="Adhaar Card">Adhaar Card</option>
//                   <option value="Offer Letter">Offer Letter</option>
//                   <option value="Resignation Letter">Resignation Letter</option>
//                   <option value="Academic Document">Academic Document</option>
//                   <option value="Reference Letter">Reference Letter</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Upload Document *</label>
//                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:border-gray-300 transition-colors bg-gray-50/50">
//                   <div className="space-y-1 text-center">
//                     <Upload className="mx-auto h-10 w-10 text-gray-400" />
//                     <div className="flex text-xs text-gray-500">
//                       <label
//                         htmlFor="file-upload"
//                         className="relative cursor-pointer font-medium text-blue-600 hover:text-blue-500"
//                       >
//                         <span>Choose a file</span>
//                         <input
//                           id="file-upload"
//                           name="file-upload"
//                           type="file"
//                           className="sr-only"
//                           accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                           onChange={(e) => {
//                             const file = e.target.files?.[0];
//                             if (file) {
//                               setDocumentForm((prev) => ({
//                                 ...prev,
//                                 file: file,
//                                 name: prev.name || file.name.split(".")[0],
//                               }));
//                             }
//                           }}
//                         />
//                       </label>
//                       <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-[11px] text-gray-400">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
//                   </div>
//                 </div>
//                 {documentForm.file && (
//                   <div className="mt-2 flex items-center gap-2 text-xs text-gray-600 bg-blue-50 rounded-lg px-3 py-2">
//                     <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
//                     <span className="truncate">{documentForm.file.name}</span>
//                     <button
//                       onClick={() => setDocumentForm((prev) => ({ ...prev, file: null }))}
//                       className="text-red-500 hover:text-red-700 shrink-0 ml-auto"
//                     >
//                       <X className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowDocumentModal(false);
//                     setDocumentForm({ name: "", type: "Resume", file: null });
//                   }}
//                   className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleAddDocument}
//                   disabled={!documentForm.name.trim() || !documentForm.file}
//                   className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
//                 >
//                   <Upload className="w-3.5 h-3.5" />
//                   Upload
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ═══════ COMMENT MODAL (mandatory comment on select / reject) ═══════ */}
//       {commentModalOpen && commentModalData && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
//             {/* Modal header */}
//             <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
//               <div className="min-w-0">
//                 <h2 className="text-base font-bold text-gray-900">
//                   {isRejectStatus(commentModalData.newStatus) ? "Confirm Rejection" : "Confirm Selection"}
//                 </h2>
//                 <p className="text-xs text-gray-500 mt-0.5 truncate">{commentModalData.candidateName}</p>
//               </div>
//               <button
//                 onClick={closeCommentModal}
//                 className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             {/* Modal body */}
//             <div className="p-6 space-y-4">
//               <div className="flex items-center gap-2">
//                 <span className="text-xs text-gray-500">Status:</span>
//                 <span
//                   className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${
//                     isRejectStatus(commentModalData.newStatus)
//                       ? "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
//                       : "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
//                   }`}
//                 >
//                   {commentModalData.newStatus}
//                 </span>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">
//                   Comment <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   value={commentModalData.comment}
//                   onChange={(e) =>
//                     setCommentModalData((prev) => (prev ? { ...prev, comment: e.target.value } : prev))
//                   }
//                   placeholder={
//                     isRejectStatus(commentModalData.newStatus)
//                       ? "Reason for rejection is mandatory…"
//                       : "Add your selection comment…"
//                   }
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
//                 />
//               </div>

//               {/* Modal footer */}
//               <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={closeCommentModal}
//                   className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   disabled={!commentModalData.comment.trim()}
//                   onClick={async () => {
//                     try {
//                       await submissionService.update(commentModalData.submissionId, {
//                         submission: {
//                           status: commentModalData.newStatus,
//                           status_comment: commentModalData.comment.trim(),
//                         },
//                       });
//                       fetchSummary();
//                       console.log("Status updated with comment:", commentModalData.newStatus, commentModalData.comment);
//                     } catch (err) {
//                       console.error("Failed to update status with comment", err);
//                     }
//                     closeCommentModal();
//                   }}
//                   className={`px-5 py-2 text-sm text-white rounded-lg transition-colors flex items-center gap-1.5 disabled:bg-gray-300 disabled:cursor-not-allowed ${
//                     isRejectStatus(commentModalData.newStatus)
//                       ? "bg-red-600 hover:bg-red-700"
//                       : "bg-emerald-600 hover:bg-emerald-700"
//                   }`}
//                 >
//                   <MessageSquare className="w-3.5 h-3.5" />
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SubmissionManagementSystem;




// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import FilterSelect from "../components/FilterSelect";
// import {
//   Search,
//   Filter,
//   FileText,
//   Phone,
//   Mail,
//   Building,
//   Clock,
//   User,
//   DollarSign,
//   MapPin,
//   X,
//   ChevronDown,
//   Upload,
//   Download,
//   Trash2,
//   Plus,
//   Loader,
//   BriefcaseBusiness,
//   MessageSquare,
// } from "lucide-react";
// import { submissionService } from "../services/submissionService";
// import type { Submission, DetailedSubmission, SubmissionFilters, CandidateDocument } from "../services/submissionService";
// import { applicantService } from "../services/applicantService";
// import { positionService } from "../services/positionService";
// import { clientService } from "../services/clientService";
// import { candidateStatusOptions, cityOptions } from "../constants/dropdown";
// import Select from "react-select";

// const DOCUMENT_TYPES = [
//   "Resume",
//   "Pan Card",
//   "Cover Letter",
//   "Adhaar Card",
//   "Offer Letter",
//   "Resignation Letter",
//   "Academic Document",
//   "Reference Letter",
//   "Other",
// ];

// const EMPTY_FILTERS = {
//   positionName: "",
//   clientName: "",
//   candidateName: "",
//   location: "",
// };

// const SubmissionManagementSystem = () => {
//   const navigate = useNavigate();

//   // Document state
//   const [candidateDocuments, setCandidateDocuments] = useState<CandidateDocument[]>([]);
//   const [groupBy, setGroupBy] = useState<"position" | "client_name" | "candidate_name" | "status">("position");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState(EMPTY_FILTERS);
//   const [selectedCandidate, setSelectedCandidate] = useState<DetailedSubmission | null>(null);
//   const [originalCandidate, setOriginalCandidate] = useState<DetailedSubmission | null>(null);
//   const [showFilters, setShowFilters] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [detailTab, setDetailTab] = useState<"personal" | "position">("personal");
//   const [showDocumentModal, setShowDocumentModal] = useState(false);
//   const [currentCandidateId, setCurrentCandidateId] = useState<number | null>(null);
//   const [documentForm, setDocumentForm] = useState({
//     name: "",
//     type: "Resume",
//     file: null as File | null,
//   });

//   // Dropdown data for the filters
//   const [positionNames, setPositionNames] = useState<string[]>([]);
//   const [clientNames, setClientNames] = useState<string[]>([]);

//   // API states
//   const [groupedData, setGroupedData] = useState<Record<string, { submissions: Submission[], totalCount: number }>>({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Backend pagination metadata
//   const [backendTotalGroups, setBackendTotalGroups] = useState(0);
//   const [backendTotalPages, setBackendTotalPages] = useState(0);
//   const [backendCurrentPage, setBackendCurrentPage] = useState(1);

//   // Group-level pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const GROUPS_PER_PAGE = 10;

//   // ─── Comment Modal State (for select/reject with mandatory comment) ───
//   const COMMENT_REQUIRED_STATUSES = [
//     "Final Select", "R1 select", "R2 select", "R3 Select",
//     "Client Reject", "Internal Reject", "Profile Reject", "Reject",
//     "R1 reject", "R2 reject", "R3 reject", "Offer Drop", "Dropout",
//   ];
//   const [commentModalOpen, setCommentModalOpen] = useState(false);
//   const [commentModalData, setCommentModalData] = useState<{
//     submissionId: number;
//     candidateName: string;
//     newStatus: string;
//     comment: string;
//   } | null>(null);

//   const isRejectStatus = (status: string) =>
//     status.toLowerCase().includes("reject") || status === "Offer Drop" || status === "Dropout";

//   const closeCommentModal = () => {
//     setCommentModalOpen(false);
//     setCommentModalData(null);
//   };

//   const fetchSummary = async (page: number = 1) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const apiFilters: SubmissionFilters = {
//         position: filters.positionName || undefined,
//         client_name: filters.clientName || undefined,
//         candidate_name: filters.candidateName || undefined,
//         location: filters.location || undefined,
//         groupBy: groupBy,
//         search: searchTerm || undefined,
//       };

//       const response = await submissionService.fetchSummary(apiFilters, page);

//       if (response.status === 200) {
//         setGroupedData(response.data.groups);
//         setBackendTotalGroups(response.data.totalGroups || 0);
//         setBackendTotalPages(response.data.totalPages || 0);
//         setBackendCurrentPage(response.data.currentPage || page);
//       }
//     } catch (err: any) {
//       setError(err?.message || "Failed to fetch submissions");
//       console.error("Error fetching summary:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Position and client lists for the filter dropdowns
//   useEffect(() => {
//     const unique = (list: string[]) =>
//       Array.from(new Set(list.map((s) => s?.trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b));

//     positionService
//       .fetchAll(1, 2000)
//       .then((res: any) => {
//         if (res.status === 200) setPositionNames(unique(res.data.positions.map((p: any) => p.title)));
//       })
//       .catch((err: any) => console.error("Error fetching positions:", err));

//     clientService
//       .fetchAll()
//       .then((res: any) => setClientNames(unique((res?.data || []).map((c: any) => c.client_name))))
//       .catch((err: any) => console.error("Error fetching clients:", err));
//   }, []);

//   const handleViewMore = (groupName: string, clientName?: string) => {
//     const state: any = {
//       groupName,
//       groupBy: groupBy,
//       filters: filters,
//       searchTerm: searchTerm,
//       currentPage: currentPage,
//     };

//     // Set appropriate fields based on groupBy type
//     if (groupBy === "position") {
//       state.positionName = groupName;
//     } else if (groupBy === "client_name") {
//       state.clientName = groupName;
//     } else if (groupBy === "candidate_name") {
//       state.candidateName = groupName;
//     } else if (groupBy === "status") {
//       state.status = groupName;
//     }

//     navigate("/submission-group-detail", { state });
//   };

//   const handleCandidateClick = (submission: Submission) => {
//     navigate(`/submission-group-detail/${submission.id}`, {
//       state: {
//         fromGroupDetail: false,
//         groupBy,
//         groupName:
//           groupBy === "position" ? submission.position :
//           groupBy === "client_name" ? submission.client_name :
//           groupBy === "candidate_name" ? submission.candidate_name :
//           submission.status,
//         filters,
//         searchTerm,
//         currentPage,
//       },
//     });
//   };

//   const fetchCandidateDocuments = async (candidateId: string) => {
//     try {
//       const response = await applicantService.fetchDocuments(candidateId);
//       if (response.status === 200) {
//         setCandidateDocuments(response.data || []);
//       }
//     } catch (err: any) {
//       console.error("Error fetching documents:", err);
//     }
//   };

//   const handleSaveCandidate = async () => {
//     if (!selectedCandidate) {
//       console.error("❌ No selected candidate");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const submissionId = selectedCandidate.id?.toString();

//       if (!submissionId) {
//         throw new Error("Submission ID not found. Please refresh and try again.");
//       }

//       const applicantData = {
//         name: selectedCandidate.candidate_name,
//         email: selectedCandidate.email,
//         phone: selectedCandidate.mobile_number,
//         city: selectedCandidate.current_city,
//         current_last_organisation: selectedCandidate.current_last_organization,
//         total_experience_in_years: selectedCandidate.experience,
//         current_ctc: selectedCandidate.current_ctc,
//         expected_ctc: selectedCandidate.expected_ctc,
//         notice_period_in_days: selectedCandidate.notice_period,
//         special_comments: selectedCandidate.screening_comments,
//       };

//       const jobData = {
//         position: selectedCandidate.position_name,
//         ctc: selectedCandidate.ctc_budget,
//         client_spoc: selectedCandidate.client_spoc,
//       };

//       const submissionData = {
//         status: selectedCandidate.candidate_status,
//         date_profile_shared_from_Applicants: selectedCandidate.date_profile_shared,
//         candidate_status_update_date: selectedCandidate.interview_date_time,
//       };

//       const updateData = {
//         applicant: applicantData,
//         job: jobData,
//         submission: submissionData,
//       };

//       const response = await submissionService.update(submissionId, updateData);

//       if (response.status === 200) {
//         setIsEditing(false);
//         await fetchSummary(currentPage);
//         alert("Candidate details updated successfully!");
//         setSelectedCandidate(null);
//       } else {
//         throw new Error(response.message || "Failed to update candidate");
//       }
//     } catch (err: any) {
//       console.error("❌ Error updating candidate:", err);
//       const errorMessage = err.message || "Failed to update candidate details";
//       setError(errorMessage);
//       alert("❌ " + errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSummary(currentPage);
//   }, [groupBy]);

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       fetchSummary(1);
//       setCurrentPage(1);
//     }, 500);

//     return () => clearTimeout(delayDebounce);
//   }, [searchTerm, filters]);

//   const getStatusColor = (status: string) => {
//     const colors: Record<string, string> = {
//       "New Submission": "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20",
//       "Profile Shared": "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
//       "R1 Scheduled": "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20",
//       "R1 Completed": "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20",
//       "R2 Scheduled": "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20",
//       "R2 Completed": "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20",
//       "R3 Scheduled": "bg-pink-50 text-pink-700 ring-1 ring-inset ring-pink-600/20",
//       Selected: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
//       Rejected: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
//     };
//     return colors[status] || "bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20";
//   };

//   const openDocumentModal = (candidateId: number) => {
//     setCurrentCandidateId(candidateId);
//     setShowDocumentModal(true);
//   };

//   const handleAddDocument = async () => {
//     if (!documentForm.name.trim() || !documentForm.file || !selectedCandidate) {
//       alert("Please provide a document name and select a file.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await applicantService.uploadDocument(
//         selectedCandidate.candidate_id,
//         documentForm.type,
//         documentForm.file
//       );

//       if (response.status === 200) {
//         await fetchCandidateDocuments(selectedCandidate.candidate_id);
//         setDocumentForm({ name: "", type: "Resume", file: null });
//         setShowDocumentModal(false);
//         alert("Document uploaded successfully!");
//       } else {
//         console.error("Upload failed:", response.data);
//         alert(response.data?.message || "Failed to upload document");
//       }
//     } catch (err: any) {
//       console.error("Error uploading document:", err);
//       alert(err?.response?.data?.message || "Failed to upload document");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteDocument = async (candidateId: any, documentId: any) => {
//     if (!documentId) {
//       alert("Document ID is required");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete this document?")) {
//       return;
//     }

//     try {
//       await applicantService.deleteDocument(candidateId, documentId);
//       await fetchCandidateDocuments(candidateId);

//       if (selectedCandidate?.candidate_id === candidateId) {
//         setSelectedCandidate((prev: any) => ({
//           ...prev,
//           documents: prev.documents?.filter((doc: any) => doc.id !== documentId) || [],
//         }));
//       }

//       alert("Document deleted successfully!");
//     } catch (error: any) {
//       console.error("Failed to delete document:", error);
//       alert(
//         error?.response?.data?.message ||
//         "Failed to delete document. Please try again."
//       );
//     }
//   };

//   const getDocumentIcon = (type: string) => {
//     return FileText;
//   };

//   const totalSubmissions = Object.values(groupedData).reduce(
//     (sum, group) => sum + group.totalCount,
//     0
//   );

//   const groupEntries = Object.entries(groupedData);
//   const totalPages = backendTotalPages || 1;
//   const paginatedGroups = groupEntries;
//   const hasActiveFilters = Object.values(filters).some(Boolean);

//   const handlePageChange = (newPage: number) => {
//     setCurrentPage(newPage);
//     fetchSummary(newPage);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-gray-50 p-4 md:p-6 md:ml-16">
//         <div className="max-w-7xl mx-auto">
//           {/* Loading Overlay */}
//           {loading && (
//             <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//               <div className="bg-white rounded-xl p-6 shadow-xl flex flex-col items-center gap-3">
//                 <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-blue-600"></div>
//                 <p className="text-sm text-gray-600 font-medium">Loading…</p>
//               </div>
//             </div>
//           )}

//           {/* Error Alert */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2">
//               <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <p className="text-sm text-red-800 flex-1">{error}</p>
//               <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 p-1">
//                 <X size={14} />
//               </button>
//             </div>
//           )}

//           {/* Header Bar */}
//           <div className="bg-white rounded-xl shadow-sm p-5 mb-5">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//               <h2 className="text-xl font-bold text-gray-900">Submission Management</h2>

//               {/* Search */}
//               <div className="flex-1 max-w-md">
//                 <div className="relative">
//                   <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full h-10 pl-9 pr-9 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//                     placeholder="Search candidates, positions, clients…"
//                   />
//                   {searchTerm && (
//                     <button
//                       onClick={() => setSearchTerm("")}
//                       aria-label="Clear search"
//                       className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 grid place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
//                     >
//                       <X size={14} />
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Group By + Filters */}
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-2">
//                   <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Group by</label>
//                   <FilterSelect
//                     ariaLabel="Group by"
//                     className="w-40"
//                     value={groupBy}
//                     onChange={(v) => setGroupBy(v as typeof groupBy)}
//                     options={[
//                       { value: "position", label: "Position" },
//                       { value: "client_name", label: "Client" },
//                       { value: "candidate_name", label: "Candidate" },
//                       { value: "status", label: "Status" },
//                     ]}
//                   />
//                 </div>

//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className={`h-10 flex items-center gap-1.5 px-3 border rounded-lg text-sm transition-colors ${
//                     showFilters ? "border-teal-500 bg-teal-50 text-teal-700" : "border-gray-300 hover:bg-gray-50 text-gray-700"
//                   }`}
//                 >
//                   <Filter size={14} />
//                   Filters
//                   {hasActiveFilters && (
//                     <span className="grid h-5 min-w-5 place-items-center rounded-full bg-teal-600 px-1.5 text-[11px] font-semibold text-white">
//                       {Object.values(filters).filter(Boolean).length}
//                     </span>
//                   )}
//                   <ChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
//                 </button>
//               </div>
//             </div>

//             {/* Filters Panel */}
//             {showFilters && (
//               <div className="mt-4 pt-4 border-t border-gray-100">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Position</label>
//                     <FilterSelect
//                       searchable
//                       searchPlaceholder="Search positions..."
//                       ariaLabel="Filter by position"
//                       className="w-full"
//                       value={filters.positionName}
//                       onChange={(v) => setFilters({ ...filters, positionName: v })}
//                       options={[
//                         { value: "", label: "All positions" },
//                         ...positionNames.map((p) => ({ value: p, label: p })),
//                       ]}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Client</label>
//                     <FilterSelect
//                       searchable
//                       searchPlaceholder="Search clients..."
//                       ariaLabel="Filter by client"
//                       className="w-full"
//                       value={filters.clientName}
//                       onChange={(v) => setFilters({ ...filters, clientName: v })}
//                       options={[
//                         { value: "", label: "All clients" },
//                         ...clientNames.map((c) => ({ value: c, label: c })),
//                       ]}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Candidate</label>
//                     <input
//                       type="text"
//                       value={filters.candidateName}
//                       onChange={(e) => setFilters({ ...filters, candidateName: e.target.value })}
//                       placeholder="Type a name..."
//                       className="w-full h-10 px-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
//                     <FilterSelect
//                       searchable
//                       searchPlaceholder="Search cities..."
//                       ariaLabel="Filter by location"
//                       className="w-full"
//                       value={filters.location}
//                       onChange={(v) => setFilters({ ...filters, location: v })}
//                       options={[
//                         { value: "", label: "All locations" },
//                         ...cityOptions.map((c) => ({ value: c.label, label: c.label })),
//                       ]}
//                     />
//                   </div>
//                 </div>

//                 {hasActiveFilters && (
//                   <div className="mt-3 flex justify-end">
//                     <button
//                       onClick={() => setFilters(EMPTY_FILTERS)}
//                       className="inline-flex h-8 items-center gap-1.5 px-3 text-xs font-medium text-teal-700 rounded-lg hover:bg-teal-50"
//                     >
//                       <X size={14} />
//                       Clear filters
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Results Count */}
//           <div className="mb-3 text-xs text-gray-500">
//             {totalSubmissions} submissions across {backendTotalGroups} groups
//             {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
//           </div>

//           {/* ═══════ GROUPED SUBMISSION CARDS ═══════ */}
//           <div className="space-y-5">
//             {paginatedGroups.map(([groupName, groupInfo]) => {
//               const visibleSubmissions = groupInfo.submissions.slice(0, 2);
//               const hasMore = groupInfo.totalCount > 2;

//               return (
//                 <div key={groupName} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                   {/* Group Header */}
//                   <div className="flex items-center justify-between bg-gradient-to-r from-slate-50 to-blue-50/60 px-5 py-3.5 border-b border-gray-200">
//                     <div className="flex items-center gap-3 min-w-0">
//                       <div className="bg-blue-100 text-blue-600 p-1.5 rounded-lg shrink-0">
//                         <Building size={18} />
//                       </div>
//                       <div className="min-w-0">
//                         <div className="flex items-center gap-2 flex-wrap">
//                           <h2 className="text-sm font-semibold text-gray-900 capitalize truncate">{groupName}</h2>
//                           <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 shrink-0">
//                             {groupInfo.totalCount}
//                           </span>
//                         </div>
//                         <p className="text-xs text-gray-500 truncate">
//                           Client: {visibleSubmissions[0]?.client_name || "N/A"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* ─── Submission rows as cards (no horizontal scroll) ─── */}
//                   <div className="divide-y divide-gray-100">
//                     {visibleSubmissions.map((submission) => (
//                       <div
//                         key={submission.id}
//                         className="px-5 py-3.5 hover:bg-gray-50/80 cursor-pointer transition-colors"
//                         onClick={() => handleCandidateClick(submission)}
//                       >
//                         {/* Row 1: Name + Status + Resume */}
//                         <div className="flex items-start justify-between gap-3 mb-2">
//                           <div className="min-w-0 flex-1">
//                             <div className="text-sm font-semibold text-gray-900 truncate">{submission.candidate_name}</div>
//                             <div className="text-xs text-gray-600 font-semibold mt-0.5 truncate">
//                               {submission.position} · {submission.location || "N/A"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col items-end gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
//                             <div className="flex items-center gap-2">
//                               <div className="w-[210px]">
//                                 <Select
//                                   options={candidateStatusOptions}
//                                   isSearchable
//                                   placeholder={submission.status || "Status"}
//                                   value={
//                                     candidateStatusOptions.find((opt) => opt.value === submission.status) || null
//                                   }
//                                   onChange={async (selected) => {
//                                     const newStatus = selected?.value || "";

//                                     // Statuses that require a mandatory comment open the comment modal first
//                                     if (COMMENT_REQUIRED_STATUSES.includes(newStatus)) {
//                                       setCommentModalData({
//                                         submissionId: submission.id,
//                                         candidateName: submission.candidate_name,
//                                         newStatus,
//                                         comment: "",
//                                       });
//                                       setCommentModalOpen(true);
//                                       return;
//                                     }

//                                     submission.status = newStatus;
//                                     try {
//                                       await submissionService.update(submission.id, {
//                                         submission: { status: newStatus },
//                                       });
//                                       fetchSummary();
//                                     } catch (err) {
//                                       console.error("Failed to update status", err);
//                                     }
//                                   }}
//                                   styles={{
//                                     control: (base) => ({
//                                       ...base,
//                                       minHeight: "30px",
//                                       height: "30px",
//                                       fontSize: "12px",
//                                       borderColor: "#e5e7eb",
//                                       boxShadow: "none",
//                                       "&:hover": { borderColor: "#d1d5db" },
//                                     }),
//                                     valueContainer: (base) => ({ ...base, padding: "0 6px" }),
//                                     indicatorsContainer: (base) => ({ ...base, height: "30px" }),
//                                     option: (base, { isSelected }) => ({
//                                       ...base,
//                                       fontSize: "12px",
//                                       padding: "6px 10px",
//                                       backgroundColor: isSelected ? "#dbeafe" : "#fff",
//                                       color: "#1e3a8a",
//                                       "&:hover": { backgroundColor: "#eff6ff" },
//                                     }),
//                                     singleValue: (base) => ({ ...base, color: "#1e3a8a", fontSize: "12px" }),
//                                   }}
//                                   menuPortalTarget={document.body}
//                                   menuPosition="fixed"
//                                 />
//                               </div>
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   window.open(submission.resume || "N/A", "_blank");
//                                 }}
//                                 className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors whitespace-nowrap"
//                               >
//                                 Resume ↗
//                               </button>

//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleCandidateClick(submission);
//                                 }}
//                                 className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2.5 py-1 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors whitespace-nowrap"
//                               >
//                                 View Tracker
//                               </button>
//                             </div>

//                             {/* Status comment (from select/reject confirmation) */}
//                             {(submission as any).status_comment && (
//                               <div className="max-w-[360px] bg-green-50 text-green-800 text-xs rounded-lg px-3 py-2 text-left">
//                                 {(submission as any).status_comment}
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         {/* Row 2: Key details as inline chips */}
//                         <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
//                           <span className="flex items-center gap-1">
//                             <User size={12} className="text-gray-400" />
//                             {submission.recruiter || "N/A"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Clock size={12} className="text-gray-400" />
//                             {submission.notice_period ? `${submission.notice_period}d notice` : "N/A"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <DollarSign size={12} className="text-gray-400" />
//                             CTC: {submission.current_ctc ? `${submission.current_ctc}L` : "N/A"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <DollarSign size={12} className="text-gray-400" />
//                             Budget: {submission.ctc_budget ? `${submission.ctc_budget}L` : "N/A"}
//                           </span>
//                           {submission.submitted_on && (
//                             <span className="text-gray-400">
//                               Submitted {new Date(submission.submitted_on).toLocaleDateString()}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* View More */}
//                   {hasMore && (
//                     <div className="flex justify-center py-2.5 bg-gray-50/60 border-t border-gray-100">
//                       <button
//                         onClick={() => handleViewMore(groupName, visibleSubmissions[0]?.client_name)}
//                         className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors"
//                       >
//                         <ChevronDown size={13} />
//                         {groupInfo.totalCount - 2} more
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="mt-5 flex items-center justify-between bg-white rounded-xl shadow-sm p-3 border border-gray-200">
//               <div className="text-xs text-gray-500">
//                 Page {currentPage} of {totalPages} · {backendTotalGroups} groups
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <button
//                   onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Previous
//                 </button>

//                 <div className="flex items-center gap-1">
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
//                     const showPage =
//                       page === 1 ||
//                       page === totalPages ||
//                       (page >= currentPage - 1 && page <= currentPage + 1);

//                     const showEllipsis =
//                       (page === currentPage - 2 && currentPage > 3) ||
//                       (page === currentPage + 2 && currentPage < totalPages - 2);

//                     if (showEllipsis) {
//                       return <span key={page} className="px-1.5 text-gray-400 text-xs">…</span>;
//                     }

//                     if (!showPage) return null;

//                     return (
//                       <button
//                         key={page}
//                         onClick={() => handlePageChange(page)}
//                         className={`w-8 h-8 text-xs rounded-lg transition-colors ${
//                           currentPage === page
//                             ? "bg-blue-600 text-white font-medium"
//                             : "border border-gray-200 hover:bg-gray-50 text-gray-700"
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <button
//                   onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Empty State */}
//           {Object.keys(groupedData).length === 0 && !loading && (
//             <div className="text-center py-16">
//               <FileText size={40} className="mx-auto text-gray-300 mb-3" />
//               <p className="text-gray-500 font-medium">No submissions found</p>
//               <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
//             </div>
//           )}

//           {/* ═══════ CANDIDATE DETAIL MODAL ═══════ */}
//           {selectedCandidate && (
//             <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 overflow-y-auto p-4 pt-[4vh]">
//               <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl my-4 border border-gray-200/60">

//                 {/* ── Top: Close + Edit bar ── */}
//                 <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
//                   <span className="text-xs text-gray-400">Candidate Detail</span>
//                   <div className="flex items-center gap-2">
//                     {isEditing ? (
//                       <>
//                         <button
//                           onClick={() => {
//                             setIsEditing(false);
//                             if (originalCandidate) {
//                               setSelectedCandidate({ ...originalCandidate });
//                             }
//                           }}
//                           disabled={loading}
//                           className="px-3 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 disabled:opacity-50 transition-colors"
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           onClick={handleSaveCandidate}
//                           disabled={loading}
//                           className="bg-blue-600 text-white px-3 py-1 text-xs rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1.5 transition-colors"
//                         >
//                           {loading ? (
//                             <>
//                               <Loader size={12} className="animate-spin" />
//                               Saving…
//                             </>
//                           ) : (
//                             "Save Changes"
//                           )}
//                         </button>
//                       </>
//                     ) : (
//                       <button
//                         onClick={() => setIsEditing(true)}
//                         className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
//                       >
//                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                         </svg>
//                         Edit
//                       </button>
//                     )}
//                     <button
//                       onClick={() => { setSelectedCandidate(null); setDetailTab("personal"); setIsEditing(false); }}
//                       className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
//                     >
//                       <X size={18} />
//                     </button>
//                   </div>
//                 </div>

//                 {/* ── Profile Card Header ── */}
//                 <div className="px-6 py-5 border-gray-100">
//                   <div className="flex items-start gap-4">
//                     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
//                       <BriefcaseBusiness size={20} className="text-gray-500" />
//                     </div>
//                     <div className="min-w-0 flex-1">
//                       <h2 className="text-lg font-bold text-gray-900 leading-tight">
//                         {selectedCandidate.candidate_name}
//                       </h2>
//                       <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-gray-500">
//                         {selectedCandidate.candidate_id && (
//                           <span className="font-medium text-gray-700">ID: #{selectedCandidate.candidate_id}</span>
//                         )}
//                         {selectedCandidate.email && (
//                           <a href={`mailto:${selectedCandidate.email}`} className="text-blue-600 hover:text-blue-700 hover:underline">
//                             {selectedCandidate.email}
//                           </a>
//                         )}
//                         {selectedCandidate.mobile_number && (
//                           <span className="flex items-center gap-1">
//                             <Phone size={11} />
//                             {selectedCandidate.mobile_number}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* ── Quick Status Strip ── */}
//                 <div className="mx-6 grid grid-cols-3 overflow-hidden rounded-xl border border-gray-200 bg-white">
//                   <div className="px-5 py-3">
//                     <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">Position</div>
//                     <div className="text-xs font-semibold flex justify-center text-gray-900 truncate">
//                       {selectedCandidate.position_name || "N/A"}
//                     </div>
//                   </div>

//                   <div className="border-l border-gray-100 px-5 py-3">
//                     <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">Status</div>
//                     <span
//                       className={`flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(
//                         selectedCandidate.candidate_status
//                       )}`}
//                     >
//                       <span className="h-2 w-2 flex-shrink-0 rounded-full bg-current" />
//                       {selectedCandidate.candidate_status || "N/A"}
//                     </span>
//                   </div>

//                   <div className="border-l border-gray-100 px-5 py-3">
//                     <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">Submitted</div>
//                     <div className="text-xs font-semibold flex justify-center text-gray-900">
//                       {selectedCandidate.date_of_submission
//                         ? new Date(selectedCandidate.date_of_submission).toLocaleDateString("en-IN", {
//                             day: "2-digit",
//                             month: "short",
//                             year: "numeric",
//                           })
//                         : "N/A"}
//                     </div>
//                   </div>
//                 </div>

//                 {/* ── Tab Switcher ── */}
//                 <div className="flex justify-center px-6 py-6">
//                   <div className="flex w-full max-w-md rounded-xl bg-gray-100 p-1.5">
//                     {[
//                       { key: "personal" as const, label: "Personal Information" },
//                       { key: "position" as const, label: "Position & Documents" },
//                     ].map((tab) => (
//                       <button
//                         key={tab.key}
//                         type="button"
//                         onClick={() => setDetailTab(tab.key)}
//                         className={`flex-1 rounded-lg px-5 py-3 text-sm font-medium transition-all duration-200 outline-none focus:outline-none focus:ring-0 ${
//                           detailTab === tab.key
//                             ? "bg-white text-gray-800 shadow-sm"
//                             : "bg-transparent text-gray-500 hover:bg-transparent hover:text-gray-700"
//                         }`}
//                       >
//                         {tab.label}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* ── Tab Content ── */}
//                 <div className="max-h-[55vh] overflow-y-auto">

//                   {/* ═══ TAB 1: Personal Information ═══ */}
//                   {detailTab === "personal" && (
//                     <div className="p-6">
//                       <div className="flex items-center gap-2 mb-4">
//                         <User size={15} className="text-gray-400" />
//                         <h3 className="text-sm font-semibold text-gray-700">Applicant Information</h3>
//                       </div>

//                       <div className="space-y-0">
//                         {[
//                           { label: "Candidate Name", value: "candidate_name", icon: <User size={13} className="text-gray-400" /> },
//                           { label: "Email Address", value: "email", icon: <Mail size={13} className="text-gray-400" /> },
//                           { label: "Mobile Number", value: "mobile_number", icon: <Phone size={13} className="text-gray-400" /> },
//                           { label: "Current Organization", value: "current_last_organization", icon: <Building size={13} className="text-gray-400" /> },
//                           { label: "Experience (Years)", value: "experience", icon: <Clock size={13} className="text-gray-400" /> },
//                           { label: "Current City", value: "current_city", icon: <MapPin size={13} className="text-gray-400" /> },
//                           { label: "Current CTC", value: "current_ctc", icon: <DollarSign size={13} className="text-gray-400" /> },
//                           { label: "Expected CTC", value: "expected_ctc", icon: <DollarSign size={13} className="text-gray-400" /> },
//                           { label: "Notice Period (Days)", value: "notice_period", icon: <Clock size={13} className="text-gray-400" /> },
//                         ].map(({ label, value, icon }) => (
//                           <div key={value} className="flex items-center py-3 border-b border-gray-100 last:border-0">
//                             <div className="flex items-center gap-2.5 w-[200px] shrink-0">
//                               {icon}
//                               <span className="text-sm text-gray-500">{label}</span>
//                             </div>
//                             <span className="text-sm text-gray-400 mr-3">:</span>
//                             {isEditing ? (
//                               <input
//                                 type="text"
//                                 value={(selectedCandidate as any)[value] || ""}
//                                 onChange={(e) =>
//                                   setSelectedCandidate((prev: any) => ({ ...prev, [value]: e.target.value }))
//                                 }
//                                 className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               />
//                             ) : (
//                               <span className="text-sm font-medium text-gray-900">
//                                 {(selectedCandidate as any)[value] || "N/A"}
//                               </span>
//                             )}
//                           </div>
//                         ))}
//                       </div>

//                       {/* Screening Comments */}
//                       <div className="mt-5 pt-4 border-t border-gray-200">
//                         <div className="flex items-center gap-2 mb-2">
//                           <FileText size={13} className="text-gray-400" />
//                           <span className="text-sm text-gray-500">Screening Comments</span>
//                         </div>
//                         {isEditing ? (
//                           <textarea
//                             value={selectedCandidate.screening_comments || ""}
//                             onChange={(e) =>
//                               setSelectedCandidate((prev: any) => ({
//                                 ...prev,
//                                 screening_comments: e.target.value,
//                               }))
//                             }
//                             rows={3}
//                             className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
//                           />
//                         ) : (
//                           <div className="text-sm text-gray-900 bg-gray-50 rounded-lg px-4 py-3 min-h-[40px]">
//                             {selectedCandidate.screening_comments || "No comments"}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {/* ═══ TAB 2: Position & Documents ═══ */}
//                   {detailTab === "position" && (
//                     <div className="p-6">
//                       <div className="flex items-center gap-2 mb-4">
//                         <Building size={15} className="text-gray-400" />
//                         <h3 className="text-sm font-semibold text-gray-700">Position Details</h3>
//                       </div>

//                       <div className="space-y-0 mb-6">
//                         {[
//                           { label: "Position Name", value: "position_name" },
//                           { label: "Client Name", value: "client_name" },
//                           { label: "Recruiter", value: "recruiter" },
//                           { label: "CTC Budget", value: "ctc_budget" },
//                           { label: "Position Status", value: "position_status" },
//                           { label: "Date of Submission", value: "date_of_submission" },
//                           { label: "Date Profile Shared", value: "date_profile_shared" },
//                           { label: "Interview Date/Time", value: "interview_date_time" },
//                           { label: "Client SPOC", value: "client_spoc" },
//                           { label: "Laksh SPOC", value: "laksh_spoc" },
//                         ].map(({ label, value }) => (
//                           <div key={value} className="flex items-center py-3 border-b border-gray-100 last:border-0">
//                             <div className="w-[200px] shrink-0">
//                               <span className="text-sm text-gray-500">{label}</span>
//                             </div>
//                             <span className="text-sm text-gray-400 mr-3">:</span>
//                             {isEditing ? (
//                               <input
//                                 type="text"
//                                 value={(selectedCandidate as any)[value] || ""}
//                                 onChange={(e) =>
//                                   setSelectedCandidate((prev: any) => ({ ...prev, [value]: e.target.value }))
//                                 }
//                                 className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               />
//                             ) : (
//                               <span className="text-sm font-medium text-gray-900">
//                                 {(selectedCandidate as any)[value] || "N/A"}
//                               </span>
//                             )}
//                           </div>
//                         ))}

//                         {/* Candidate Status row */}
//                         <div className="flex items-center py-3 border-b border-gray-100">
//                           <div className="w-[200px] shrink-0">
//                             <span className="text-sm text-gray-500">Candidate Status</span>
//                           </div>
//                           <span className="text-sm text-gray-400 mr-3">:</span>
//                           {isEditing ? (
//                             <div className="flex-1">
//                               <Select
//                                 options={candidateStatusOptions}
//                                 isSearchable
//                                 placeholder="Select status…"
//                                 value={
//                                   candidateStatusOptions.find(
//                                     (opt) => opt.value === selectedCandidate.candidate_status
//                                   ) || null
//                                 }
//                                 onChange={(selected: { value: string; label: string } | null) =>
//                                   setSelectedCandidate((prev: any) => ({
//                                     ...prev,
//                                     candidate_status: selected?.value || "",
//                                   }))
//                                 }
//                                 styles={{
//                                   control: (base) => ({
//                                     ...base,
//                                     minHeight: "32px",
//                                     fontSize: "13px",
//                                     borderColor: "#e5e7eb",
//                                   }),
//                                   valueContainer: (base) => ({ ...base, padding: "0 8px" }),
//                                   indicatorsContainer: (base) => ({ ...base, height: "32px" }),
//                                 }}
//                               />
//                             </div>
//                           ) : (
//                             <span className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(selectedCandidate.candidate_status)}`}>
//                               {selectedCandidate.candidate_status || "N/A"}
//                             </span>
//                           )}
//                         </div>
//                       </div>

//                       {/* Documents Section */}
//                       <div className="border-t border-gray-200 pt-5">
//                         <div className="flex items-center justify-between mb-4">
//                           <div className="flex items-center gap-2">
//                             <FileText size={15} className="text-gray-400" />
//                             <h3 className="text-sm font-semibold text-gray-700">Documents</h3>
//                             {candidateDocuments.length > 0 && (
//                               <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
//                                 {candidateDocuments.length}
//                               </span>
//                             )}
//                           </div>
//                           <button
//                             onClick={() => {
//                               const candidateId = (selectedCandidate as any).candidate_id;
//                               if (candidateId) openDocumentModal(candidateId);
//                             }}
//                             className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium transition-colors"
//                           >
//                             <Plus size={13} />
//                             Upload
//                           </button>
//                         </div>

//                         <div className="rounded-xl border border-gray-200 overflow-hidden">
//                           {candidateDocuments && candidateDocuments.length > 0 ? (
//                             <div className="divide-y divide-gray-100 max-h-56 overflow-y-auto">
//                               {candidateDocuments.map((doc) => {
//                                 const IconComponent = getDocumentIcon(doc.type);
//                                 return (
//                                   <div
//                                     key={doc.id}
//                                     className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
//                                   >
//                                     <div className="flex items-center gap-3 min-w-0">
//                                       <div className="bg-blue-50 p-2 rounded-lg shrink-0">
//                                         <IconComponent size={14} className="text-blue-600" />
//                                       </div>
//                                       <div className="min-w-0">
//                                         <div className="text-sm font-medium text-gray-900 truncate">{doc.fileName}</div>
//                                         <div className="text-xs text-gray-500">
//                                           {doc.documentType} · {doc.size || "N/A"} · {new Date(doc.uploadedAt).toLocaleDateString()}
//                                         </div>
//                                       </div>
//                                     </div>
//                                     <div className="flex items-center gap-1 shrink-0 ml-3">
//                                       <a
//                                         href={doc.fileUrl}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
//                                       >
//                                         <Download size={14} />
//                                       </a>
//                                       <button
//                                         onClick={() => handleDeleteDocument((selectedCandidate as any).candidate_id, doc.id)}
//                                         className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
//                                       >
//                                         <Trash2 size={14} />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           ) : (
//                             <div className="text-center py-10 bg-gray-50/50">
//                               <FileText size={28} className="mx-auto mb-2 text-gray-300" />
//                               <p className="text-sm text-gray-500">No documents uploaded</p>
//                               <button
//                                 onClick={() => openDocumentModal((selectedCandidate as any).candidate_id)}
//                                 className="mt-1.5 text-blue-600 hover:text-blue-800 text-xs font-medium"
//                               >
//                                 Upload your first document
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                         <p className="text-[11px] text-gray-400 mt-2">
//                           Supported: PDF, DOC, DOCX, JPG, JPEG, PNG
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ═══════ DOCUMENT UPLOAD MODAL ═══════ */}
//       {showDocumentModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[70]">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative">
//             <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
//               <h2 className="text-base font-bold text-gray-900">Upload Document</h2>
//               <button
//                 onClick={() => {
//                   setShowDocumentModal(false);
//                   setDocumentForm({ name: "", type: "Resume", file: null });
//                 }}
//                 className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Document Name *</label>
//                 <input
//                   type="text"
//                   required
//                   placeholder="e.g., Resume_JohnDoe_2025"
//                   value={documentForm.name}
//                   onChange={(e) =>
//                     setDocumentForm((prev) => ({ ...prev, name: e.target.value }))
//                   }
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Document Type</label>
//                 <FilterSelect
//                   ariaLabel="Document type"
//                   className="w-full"
//                   value={documentForm.type}
//                   onChange={(v) => setDocumentForm((prev) => ({ ...prev, type: v }))}
//                   options={DOCUMENT_TYPES.map((t) => ({ value: t, label: t }))}
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Upload Document *</label>
//                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:border-gray-300 transition-colors bg-gray-50/50">
//                   <div className="space-y-1 text-center">
//                     <Upload className="mx-auto h-10 w-10 text-gray-400" />
//                     <div className="flex text-xs text-gray-500">
//                       <label
//                         htmlFor="file-upload"
//                         className="relative cursor-pointer font-medium text-blue-600 hover:text-blue-500"
//                       >
//                         <span>Choose a file</span>
//                         <input
//                           id="file-upload"
//                           name="file-upload"
//                           type="file"
//                           className="sr-only"
//                           accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                           onChange={(e) => {
//                             const file = e.target.files?.[0];
//                             if (file) {
//                               setDocumentForm((prev) => ({
//                                 ...prev,
//                                 file: file,
//                                 name: prev.name || file.name.split(".")[0],
//                               }));
//                             }
//                           }}
//                         />
//                       </label>
//                       <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-[11px] text-gray-400">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
//                   </div>
//                 </div>
//                 {documentForm.file && (
//                   <div className="mt-2 flex items-center gap-2 text-xs text-gray-600 bg-blue-50 rounded-lg px-3 py-2">
//                     <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
//                     <span className="truncate">{documentForm.file.name}</span>
//                     <button
//                       onClick={() => setDocumentForm((prev) => ({ ...prev, file: null }))}
//                       className="text-red-500 hover:text-red-700 shrink-0 ml-auto"
//                     >
//                       <X className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowDocumentModal(false);
//                     setDocumentForm({ name: "", type: "Resume", file: null });
//                   }}
//                   className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleAddDocument}
//                   disabled={!documentForm.name.trim() || !documentForm.file}
//                   className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
//                 >
//                   <Upload className="w-3.5 h-3.5" />
//                   Upload
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ═══════ COMMENT MODAL (mandatory comment on select / reject) ═══════ */}
//       {commentModalOpen && commentModalData && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
//             <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
//               <div className="min-w-0">
//                 <h2 className="text-base font-bold text-gray-900">
//                   {isRejectStatus(commentModalData.newStatus) ? "Confirm Rejection" : "Confirm Selection"}
//                 </h2>
//                 <p className="text-xs text-gray-500 mt-0.5 truncate">{commentModalData.candidateName}</p>
//               </div>
//               <button
//                 onClick={closeCommentModal}
//                 className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               <div className="flex items-center gap-2">
//                 <span className="text-xs text-gray-500">Status:</span>
//                 <span
//                   className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${
//                     isRejectStatus(commentModalData.newStatus)
//                       ? "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
//                       : "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
//                   }`}
//                 >
//                   {commentModalData.newStatus}
//                 </span>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">
//                   Comment <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   value={commentModalData.comment}
//                   onChange={(e) =>
//                     setCommentModalData((prev) => (prev ? { ...prev, comment: e.target.value } : prev))
//                   }
//                   placeholder={
//                     isRejectStatus(commentModalData.newStatus)
//                       ? "Reason for rejection is mandatory…"
//                       : "Add your selection comment…"
//                   }
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
//                 />
//               </div>

//               <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={closeCommentModal}
//                   className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   disabled={!commentModalData.comment.trim()}
//                   onClick={async () => {
//                     try {
//                       await submissionService.update(commentModalData.submissionId, {
//                         submission: {
//                           status: commentModalData.newStatus,
//                           status_comment: commentModalData.comment.trim(),
//                         },
//                       });
//                       fetchSummary();
//                     } catch (err) {
//                       console.error("Failed to update status with comment", err);
//                     }
//                     closeCommentModal();
//                   }}
//                   className={`px-5 py-2 text-sm text-white rounded-lg transition-colors flex items-center gap-1.5 disabled:bg-gray-300 disabled:cursor-not-allowed ${
//                     isRejectStatus(commentModalData.newStatus)
//                       ? "bg-red-600 hover:bg-red-700"
//                       : "bg-emerald-600 hover:bg-emerald-700"
//                   }`}
//                 >
//                   <MessageSquare className="w-3.5 h-3.5" />
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SubmissionManagementSystem;





// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import FilterSelect from "../components/FilterSelect";
// import {
//   Search,
//   Filter,
//   FileText,
//   Phone,
//   Mail,
//   Building,
//   Clock,
//   User,
//   DollarSign,
//   MapPin,
//   X,
//   ChevronDown,
//   Upload,
//   Download,
//   Trash2,
//   Plus,
//   Loader,
//   BriefcaseBusiness,
//   MessageSquare,
// } from "lucide-react";
// import { submissionService } from "../services/submissionService";
// import type { Submission, DetailedSubmission, SubmissionFilters, CandidateDocument } from "../services/submissionService";
// import { applicantService } from "../services/applicantService";
// import { positionService } from "../services/positionService";
// import { clientService } from "../services/clientService";
// import { candidateStatusOptions, cityOptions } from "../constants/dropdown";
// import Select from "react-select";
// import { slugify } from "../utils/slug";

// const DOCUMENT_TYPES = [
//   "Resume",
//   "Pan Card",
//   "Cover Letter",
//   "Adhaar Card",
//   "Offer Letter",
//   "Resignation Letter",
//   "Academic Document",
//   "Reference Letter",
//   "Other",
// ];

// const EMPTY_FILTERS = {
//   positionName: "",
//   clientName: "",
//   candidateName: "",
//   location: "",
// };

// const SubmissionManagementSystem = () => {
//   const navigate = useNavigate();

//   // Document state
//   const [candidateDocuments, setCandidateDocuments] = useState<CandidateDocument[]>([]);
//   const [groupBy, setGroupBy] = useState<"position" | "client_name" | "candidate_name" | "status">("position");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState(EMPTY_FILTERS);
//   const [selectedCandidate, setSelectedCandidate] = useState<DetailedSubmission | null>(null);
//   const [originalCandidate, setOriginalCandidate] = useState<DetailedSubmission | null>(null);
//   const [showFilters, setShowFilters] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [detailTab, setDetailTab] = useState<"personal" | "position">("personal");
//   const [showDocumentModal, setShowDocumentModal] = useState(false);
//   const [currentCandidateId, setCurrentCandidateId] = useState<number | null>(null);
//   const [documentForm, setDocumentForm] = useState({
//     name: "",
//     type: "Resume",
//     file: null as File | null,
//   });

//   // Dropdown data for the filters
//   const [positionNames, setPositionNames] = useState<string[]>([]);
//   const [clientNames, setClientNames] = useState<string[]>([]);

//   // API states
//   const [groupedData, setGroupedData] = useState<Record<string, { submissions: Submission[], totalCount: number }>>({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Backend pagination metadata
//   const [backendTotalGroups, setBackendTotalGroups] = useState(0);
//   const [backendTotalPages, setBackendTotalPages] = useState(0);
//   const [backendCurrentPage, setBackendCurrentPage] = useState(1);

//   // Group-level pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const GROUPS_PER_PAGE = 10;

//   // ─── Comment Modal State (for select/reject with mandatory comment) ───
//   const COMMENT_REQUIRED_STATUSES = [
//     "Final Select", "R1 select", "R2 select", "R3 Select",
//     "Client Reject", "Internal Reject", "Profile Reject", "Reject",
//     "R1 reject", "R2 reject", "R3 reject", "Offer Drop", "Dropout",
//   ];
//   const [commentModalOpen, setCommentModalOpen] = useState(false);
//   const [commentModalData, setCommentModalData] = useState<{
//     submissionId: number;
//     candidateName: string;
//     newStatus: string;
//     comment: string;
//   } | null>(null);

//   const isRejectStatus = (status: string) =>
//     status.toLowerCase().includes("reject") || status === "Offer Drop" || status === "Dropout";

//   const closeCommentModal = () => {
//     setCommentModalOpen(false);
//     setCommentModalData(null);
//   };

//   const fetchSummary = async (page: number = 1) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const apiFilters: SubmissionFilters = {
//         position: filters.positionName || undefined,
//         client_name: filters.clientName || undefined,
//         candidate_name: filters.candidateName || undefined,
//         location: filters.location || undefined,
//         groupBy: groupBy,
//         search: searchTerm || undefined,
//       };

//       const response = await submissionService.fetchSummary(apiFilters, page);

//       if (response.status === 200) {
//         setGroupedData(response.data.groups);
//         setBackendTotalGroups(response.data.totalGroups || 0);
//         setBackendTotalPages(response.data.totalPages || 0);
//         setBackendCurrentPage(response.data.currentPage || page);
//       }
//     } catch (err: any) {
//       setError(err?.message || "Failed to fetch submissions");
//       console.error("Error fetching summary:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Position and client lists for the filter dropdowns
//   useEffect(() => {
//     const unique = (list: string[]) =>
//       Array.from(new Set(list.map((s) => s?.trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b));

//     positionService
//       .fetchAll(1, 2000)
//       .then((res: any) => {
//         if (res.status === 200) setPositionNames(unique(res.data.positions.map((p: any) => p.title)));
//       })
//       .catch((err: any) => console.error("Error fetching positions:", err));

//     clientService
//       .fetchAll()
//       .then((res: any) => setClientNames(unique((res?.data || []).map((c: any) => c.client_name))))
//       .catch((err: any) => console.error("Error fetching clients:", err));
//   }, []);

//   const listState = { groupBy, filters, searchTerm, currentPage };

// const handleViewMore = (groupName: string) => {
//   navigate(`/submission-management/${slugify(groupName)}`, {
//     state: { ...listState, groupName },
//   });
// };

// const handleCandidateClick = (submission: Submission, groupName: string) => {
//   navigate(`/submission-management/${slugify(groupName)}/${submission.id}`, {
//     state: { ...listState, groupName, fromGroupDetail: false },
//   });
// };

//   const fetchCandidateDocuments = async (candidateId: string) => {
//     try {
//       const response = await applicantService.fetchDocuments(candidateId);
//       if (response.status === 200) {
//         setCandidateDocuments(response.data || []);
//       }
//     } catch (err: any) {
//       console.error("Error fetching documents:", err);
//     }
//   };

//   const handleSaveCandidate = async () => {
//     if (!selectedCandidate) {
//       console.error("❌ No selected candidate");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const submissionId = selectedCandidate.id?.toString();

//       if (!submissionId) {
//         throw new Error("Submission ID not found. Please refresh and try again.");
//       }

//       const applicantData = {
//         name: selectedCandidate.candidate_name,
//         email: selectedCandidate.email,
//         phone: selectedCandidate.mobile_number,
//         city: selectedCandidate.current_city,
//         current_last_organisation: selectedCandidate.current_last_organization,
//         total_experience_in_years: selectedCandidate.experience,
//         current_ctc: selectedCandidate.current_ctc,
//         expected_ctc: selectedCandidate.expected_ctc,
//         notice_period_in_days: selectedCandidate.notice_period,
//         special_comments: selectedCandidate.screening_comments,
//       };

//       const jobData = {
//         position: selectedCandidate.position_name,
//         ctc: selectedCandidate.ctc_budget,
//         client_spoc: selectedCandidate.client_spoc,
//       };

//       const submissionData = {
//         status: selectedCandidate.candidate_status,
//         date_profile_shared_from_Applicants: selectedCandidate.date_profile_shared,
//         candidate_status_update_date: selectedCandidate.interview_date_time,
//       };

//       const updateData = {
//         applicant: applicantData,
//         job: jobData,
//         submission: submissionData,
//       };

//       const response = await submissionService.update(submissionId, updateData);

//       if (response.status === 200) {
//         setIsEditing(false);
//         await fetchSummary(currentPage);
//         alert("Candidate details updated successfully!");
//         setSelectedCandidate(null);
//       } else {
//         throw new Error(response.message || "Failed to update candidate");
//       }
//     } catch (err: any) {
//       console.error("❌ Error updating candidate:", err);
//       const errorMessage = err.message || "Failed to update candidate details";
//       setError(errorMessage);
//       alert("❌ " + errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSummary(currentPage);
//   }, [groupBy]);

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       fetchSummary(1);
//       setCurrentPage(1);
//     }, 500);

//     return () => clearTimeout(delayDebounce);
//   }, [searchTerm, filters]);

//   const getStatusColor = (status: string) => {
//     const colors: Record<string, string> = {
//       "New Submission": "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20",
//       "Profile Shared": "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
//       "R1 Scheduled": "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20",
//       "R1 Completed": "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20",
//       "R2 Scheduled": "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20",
//       "R2 Completed": "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20",
//       "R3 Scheduled": "bg-pink-50 text-pink-700 ring-1 ring-inset ring-pink-600/20",
//       Selected: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
//       Rejected: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
//     };
//     return colors[status] || "bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20";
//   };

//   const openDocumentModal = (candidateId: number) => {
//     setCurrentCandidateId(candidateId);
//     setShowDocumentModal(true);
//   };

//   const handleAddDocument = async () => {
//     if (!documentForm.name.trim() || !documentForm.file || !selectedCandidate) {
//       alert("Please provide a document name and select a file.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await applicantService.uploadDocument(
//         selectedCandidate.candidate_id,
//         documentForm.type,
//         documentForm.file
//       );

//       if (response.status === 200) {
//         await fetchCandidateDocuments(selectedCandidate.candidate_id);
//         setDocumentForm({ name: "", type: "Resume", file: null });
//         setShowDocumentModal(false);
//         alert("Document uploaded successfully!");
//       } else {
//         console.error("Upload failed:", response.data);
//         alert(response.data?.message || "Failed to upload document");
//       }
//     } catch (err: any) {
//       console.error("Error uploading document:", err);
//       alert(err?.response?.data?.message || "Failed to upload document");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteDocument = async (candidateId: any, documentId: any) => {
//     if (!documentId) {
//       alert("Document ID is required");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete this document?")) {
//       return;
//     }

//     try {
//       await applicantService.deleteDocument(candidateId, documentId);
//       await fetchCandidateDocuments(candidateId);

//       if (selectedCandidate?.candidate_id === candidateId) {
//         setSelectedCandidate((prev: any) => ({
//           ...prev,
//           documents: prev.documents?.filter((doc: any) => doc.id !== documentId) || [],
//         }));
//       }

//       alert("Document deleted successfully!");
//     } catch (error: any) {
//       console.error("Failed to delete document:", error);
//       alert(
//         error?.response?.data?.message ||
//         "Failed to delete document. Please try again."
//       );
//     }
//   };

//   const getDocumentIcon = (type: string) => {
//     return FileText;
//   };

//   const totalSubmissions = Object.values(groupedData).reduce(
//     (sum, group) => sum + group.totalCount,
//     0
//   );

//   const groupEntries = Object.entries(groupedData);
//   const totalPages = backendTotalPages || 1;
//   const paginatedGroups = groupEntries;
//   const hasActiveFilters = Object.values(filters).some(Boolean);

//   const handlePageChange = (newPage: number) => {
//     setCurrentPage(newPage);
//     fetchSummary(newPage);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-gray-50 p-4 md:p-6 md:ml-16">
//         <div className="max-w-7xl mx-auto">
//           {/* Loading Overlay */}
//           {loading && (
//             <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//               <div className="bg-white rounded-xl p-6 shadow-xl flex flex-col items-center gap-3">
//                 <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-blue-600"></div>
//                 <p className="text-sm text-gray-600 font-medium">Loading…</p>
//               </div>
//             </div>
//           )}

//           {/* Error Alert */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2">
//               <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <p className="text-sm text-red-800 flex-1">{error}</p>
//               <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 p-1">
//                 <X size={14} />
//               </button>
//             </div>
//           )}

//           {/* Header Bar */}
//           <div className="bg-white rounded-xl shadow-sm p-5 mb-5">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//               <h2 className="text-xl font-bold text-gray-900">Submission Management</h2>

//               {/* Search */}
//               <div className="flex-1 max-w-md">
//                 <div className="relative">
//                   <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full h-10 pl-9 pr-9 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//                     placeholder="Search candidates, positions, clients…"
//                   />
//                   {searchTerm && (
//                     <button
//                       onClick={() => setSearchTerm("")}
//                       aria-label="Clear search"
//                       className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 grid place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
//                     >
//                       <X size={14} />
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Group By + Filters */}
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-2">
//                   <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Group by</label>
//                   <FilterSelect
//                     ariaLabel="Group by"
//                     className="w-40"
//                     value={groupBy}
//                     onChange={(v) => setGroupBy(v as typeof groupBy)}
//                     options={[
//                       { value: "position", label: "Position" },
//                       { value: "client_name", label: "Client" },
//                       { value: "candidate_name", label: "Candidate" },
//                       { value: "status", label: "Status" },
//                     ]}
//                   />
//                 </div>

//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className={`h-10 flex items-center gap-1.5 px-3 border rounded-lg text-sm transition-colors ${
//                     showFilters ? "border-teal-500 bg-teal-50 text-teal-700" : "border-gray-300 hover:bg-gray-50 text-gray-700"
//                   }`}
//                 >
//                   <Filter size={14} />
//                   Filters
//                   {hasActiveFilters && (
//                     <span className="grid h-5 min-w-5 place-items-center rounded-full bg-teal-600 px-1.5 text-[11px] font-semibold text-white">
//                       {Object.values(filters).filter(Boolean).length}
//                     </span>
//                   )}
//                   <ChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
//                 </button>
//               </div>
//             </div>

//             {/* Filters Panel */}
//             {showFilters && (
//               <div className="mt-4 pt-4 border-t border-gray-100">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Position</label>
//                     <FilterSelect
//                       searchable
//                       searchPlaceholder="Search positions..."
//                       ariaLabel="Filter by position"
//                       className="w-full"
//                       value={filters.positionName}
//                       onChange={(v) => setFilters({ ...filters, positionName: v })}
//                       options={[
//                         { value: "", label: "All positions" },
//                         ...positionNames.map((p) => ({ value: p, label: p })),
//                       ]}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Client</label>
//                     <FilterSelect
//                       searchable
//                       searchPlaceholder="Search clients..."
//                       ariaLabel="Filter by client"
//                       className="w-full"
//                       value={filters.clientName}
//                       onChange={(v) => setFilters({ ...filters, clientName: v })}
//                       options={[
//                         { value: "", label: "All clients" },
//                         ...clientNames.map((c) => ({ value: c, label: c })),
//                       ]}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Candidate</label>
//                     <input
//                       type="text"
//                       value={filters.candidateName}
//                       onChange={(e) => setFilters({ ...filters, candidateName: e.target.value })}
//                       placeholder="Type a name..."
//                       className="w-full h-10 px-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
//                     <FilterSelect
//                       searchable
//                       searchPlaceholder="Search cities..."
//                       ariaLabel="Filter by location"
//                       className="w-full"
//                       value={filters.location}
//                       onChange={(v) => setFilters({ ...filters, location: v })}
//                       options={[
//                         { value: "", label: "All locations" },
//                         ...cityOptions.map((c) => ({ value: c.label, label: c.label })),
//                       ]}
//                     />
//                   </div>
//                 </div>

//                 {hasActiveFilters && (
//                   <div className="mt-3 flex justify-end">
//                     <button
//                       onClick={() => setFilters(EMPTY_FILTERS)}
//                       className="inline-flex h-8 items-center gap-1.5 px-3 text-xs font-medium text-teal-700 rounded-lg hover:bg-teal-50"
//                     >
//                       <X size={14} />
//                       Clear filters
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Results Count */}
//           <div className="mb-3 text-xs text-gray-500">
//             {totalSubmissions} submissions across {backendTotalGroups} groups
//             {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
//           </div>

//           {/* ═══════ GROUPED SUBMISSION CARDS ═══════ */}
//           <div className="space-y-5">
//             {paginatedGroups.map(([groupName, groupInfo]) => {
//               const visibleSubmissions = groupInfo.submissions.slice(0, 2);
//               const hasMore = groupInfo.totalCount > 2;

//               return (
//                 <div key={groupName} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                   {/* Group Header */}
//                   <div className="flex items-center justify-between bg-gradient-to-r from-slate-50 to-blue-50/60 px-5 py-3.5 border-b border-gray-200">
//                     <div className="flex items-center gap-3 min-w-0">
//                       <div className="bg-blue-100 text-blue-600 p-1.5 rounded-lg shrink-0">
//                         <Building size={18} />
//                       </div>
//                       <div className="min-w-0">
//                         <div className="flex items-center gap-2 flex-wrap">
//                           <h2 className="text-sm font-semibold text-gray-900 capitalize truncate">{groupName}</h2>
//                           <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 shrink-0">
//                             {groupInfo.totalCount}
//                           </span>
//                         </div>
//                         <p className="text-xs text-gray-500 truncate">
//                           Client: {visibleSubmissions[0]?.client_name || "N/A"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* ─── Submission rows as cards (no horizontal scroll) ─── */}
//                   <div className="divide-y divide-gray-100">
//                     {visibleSubmissions.map((submission) => (
//                       <div
//   key={submission.id}
//   className="px-5 py-3.5 hover:bg-gray-50/80 cursor-pointer transition-colors"
//   onClick={() => handleCandidateClick(submission, groupName)}
// >
//                         {/* Row 1: Name + Status + Resume */}
//                         <div className="flex items-start justify-between gap-3 mb-2">
//                           <div className="min-w-0 flex-1">
//                             <div className="text-sm font-semibold text-gray-900 truncate">{submission.candidate_name}</div>
//                             <div className="text-xs text-gray-600 font-semibold mt-0.5 truncate">
//                               {submission.position} · {submission.location || "N/A"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col items-end gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
//                             <div className="flex items-center gap-2">
//                               <div className="w-[210px]">
//                                 <Select
//                                   options={candidateStatusOptions}
//                                   isSearchable
//                                   placeholder={submission.status || "Status"}
//                                   value={
//                                     candidateStatusOptions.find((opt) => opt.value === submission.status) || null
//                                   }
//                                   onChange={async (selected) => {
//                                     const newStatus = selected?.value || "";

//                                     // Statuses that require a mandatory comment open the comment modal first
//                                     if (COMMENT_REQUIRED_STATUSES.includes(newStatus)) {
//                                       setCommentModalData({
//                                         submissionId: submission.id,
//                                         candidateName: submission.candidate_name,
//                                         newStatus,
//                                         comment: "",
//                                       });
//                                       setCommentModalOpen(true);
//                                       return;
//                                     }

//                                     submission.status = newStatus;
//                                     try {
//                                       await submissionService.update(submission.id, {
//                                         submission: { status: newStatus },
//                                       });
//                                       fetchSummary();
//                                     } catch (err) {
//                                       console.error("Failed to update status", err);
//                                     }
//                                   }}
//                                   styles={{
//                                     control: (base) => ({
//                                       ...base,
//                                       minHeight: "30px",
//                                       height: "30px",
//                                       fontSize: "12px",
//                                       borderColor: "#e5e7eb",
//                                       boxShadow: "none",
//                                       "&:hover": { borderColor: "#d1d5db" },
//                                     }),
//                                     valueContainer: (base) => ({ ...base, padding: "0 6px" }),
//                                     indicatorsContainer: (base) => ({ ...base, height: "30px" }),
//                                     option: (base, { isSelected }) => ({
//                                       ...base,
//                                       fontSize: "12px",
//                                       padding: "6px 10px",
//                                       backgroundColor: isSelected ? "#dbeafe" : "#fff",
//                                       color: "#1e3a8a",
//                                       "&:hover": { backgroundColor: "#eff6ff" },
//                                     }),
//                                     singleValue: (base) => ({ ...base, color: "#1e3a8a", fontSize: "12px" }),
//                                   }}
//                                   menuPortalTarget={document.body}
//                                   menuPosition="fixed"
//                                 />
//                               </div>
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   window.open(submission.resume || "N/A", "_blank");
//                                 }}
//                                 className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors whitespace-nowrap"
//                               >
//                                 Resume ↗
//                               </button>

//                               <button
//   onClick={(e) => {
//     e.stopPropagation();
//     handleCandidateClick(submission, groupName);
//   }}
//   className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2.5 py-1 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors whitespace-nowrap"
// >
//   View Tracker
// </button>
//                             </div>

//                             {/* Status comment (from select/reject confirmation) */}
//                             {(submission as any).status_comment && (
//                               <div className="max-w-[360px] bg-green-50 text-green-800 text-xs rounded-lg px-3 py-2 text-left">
//                                 {(submission as any).status_comment}
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         {/* Row 2: Key details as inline chips */}
//                         <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
//                           <span className="flex items-center gap-1">
//                             <User size={12} className="text-gray-400" />
//                             {submission.recruiter || "N/A"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Clock size={12} className="text-gray-400" />
//                             {submission.notice_period ? `${submission.notice_period}d notice` : "N/A"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <DollarSign size={12} className="text-gray-400" />
//                             CTC: {submission.current_ctc ? `${submission.current_ctc}L` : "N/A"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <DollarSign size={12} className="text-gray-400" />
//                             Budget: {submission.ctc_budget ? `${submission.ctc_budget}L` : "N/A"}
//                           </span>
//                           {submission.submitted_on && (
//                             <span className="text-gray-400">
//                               Submitted {new Date(submission.submitted_on).toLocaleDateString()}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* View More */}
//                   {hasMore && (
//                     <div className="flex justify-center py-2.5 bg-gray-50/60 border-t border-gray-100">
//                       <button
//   onClick={() => handleViewMore(groupName)}
//   className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors"
// >
//                         <ChevronDown size={13} />
//                         {groupInfo.totalCount - 2} more
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="mt-5 flex items-center justify-between bg-white rounded-xl shadow-sm p-3 border border-gray-200">
//               <div className="text-xs text-gray-500">
//                 Page {currentPage} of {totalPages} · {backendTotalGroups} groups
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <button
//                   onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Previous
//                 </button>

//                 <div className="flex items-center gap-1">
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
//                     const showPage =
//                       page === 1 ||
//                       page === totalPages ||
//                       (page >= currentPage - 1 && page <= currentPage + 1);

//                     const showEllipsis =
//                       (page === currentPage - 2 && currentPage > 3) ||
//                       (page === currentPage + 2 && currentPage < totalPages - 2);

//                     if (showEllipsis) {
//                       return <span key={page} className="px-1.5 text-gray-400 text-xs">…</span>;
//                     }

//                     if (!showPage) return null;

//                     return (
//                       <button
//                         key={page}
//                         onClick={() => handlePageChange(page)}
//                         className={`w-8 h-8 text-xs rounded-lg transition-colors ${
//                           currentPage === page
//                             ? "bg-blue-600 text-white font-medium"
//                             : "border border-gray-200 hover:bg-gray-50 text-gray-700"
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <button
//                   onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Empty State */}
//           {Object.keys(groupedData).length === 0 && !loading && (
//             <div className="text-center py-16">
//               <FileText size={40} className="mx-auto text-gray-300 mb-3" />
//               <p className="text-gray-500 font-medium">No submissions found</p>
//               <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
//             </div>
//           )}

//           {/* ═══════ CANDIDATE DETAIL MODAL ═══════ */}
//           {selectedCandidate && (
//             <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 overflow-y-auto p-4 pt-[4vh]">
//               <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl my-4 border border-gray-200/60">

//                 {/* ── Top: Close + Edit bar ── */}
//                 <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
//                   <span className="text-xs text-gray-400">Candidate Detail</span>
//                   <div className="flex items-center gap-2">
//                     {isEditing ? (
//                       <>
//                         <button
//                           onClick={() => {
//                             setIsEditing(false);
//                             if (originalCandidate) {
//                               setSelectedCandidate({ ...originalCandidate });
//                             }
//                           }}
//                           disabled={loading}
//                           className="px-3 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 disabled:opacity-50 transition-colors"
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           onClick={handleSaveCandidate}
//                           disabled={loading}
//                           className="bg-blue-600 text-white px-3 py-1 text-xs rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1.5 transition-colors"
//                         >
//                           {loading ? (
//                             <>
//                               <Loader size={12} className="animate-spin" />
//                               Saving…
//                             </>
//                           ) : (
//                             "Save Changes"
//                           )}
//                         </button>
//                       </>
//                     ) : (
//                       <button
//                         onClick={() => setIsEditing(true)}
//                         className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
//                       >
//                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                         </svg>
//                         Edit
//                       </button>
//                     )}
//                     <button
//                       onClick={() => { setSelectedCandidate(null); setDetailTab("personal"); setIsEditing(false); }}
//                       className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
//                     >
//                       <X size={18} />
//                     </button>
//                   </div>
//                 </div>

//                 {/* ── Profile Card Header ── */}
//                 <div className="px-6 py-5 border-gray-100">
//                   <div className="flex items-start gap-4">
//                     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
//                       <BriefcaseBusiness size={20} className="text-gray-500" />
//                     </div>
//                     <div className="min-w-0 flex-1">
//                       <h2 className="text-lg font-bold text-gray-900 leading-tight">
//                         {selectedCandidate.candidate_name}
//                       </h2>
//                       <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-gray-500">
//                         {selectedCandidate.candidate_id && (
//                           <span className="font-medium text-gray-700">ID: #{selectedCandidate.candidate_id}</span>
//                         )}
//                         {selectedCandidate.email && (
//                           <a href={`mailto:${selectedCandidate.email}`} className="text-blue-600 hover:text-blue-700 hover:underline">
//                             {selectedCandidate.email}
//                           </a>
//                         )}
//                         {selectedCandidate.mobile_number && (
//                           <span className="flex items-center gap-1">
//                             <Phone size={11} />
//                             {selectedCandidate.mobile_number}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* ── Quick Status Strip ── */}
//                 <div className="mx-6 grid grid-cols-3 overflow-hidden rounded-xl border border-gray-200 bg-white">
//                   <div className="px-5 py-3">
//                     <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">Position</div>
//                     <div className="text-xs font-semibold flex justify-center text-gray-900 truncate">
//                       {selectedCandidate.position_name || "N/A"}
//                     </div>
//                   </div>

//                   <div className="border-l border-gray-100 px-5 py-3">
//                     <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">Status</div>
//                     <span
//                       className={`flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(
//                         selectedCandidate.candidate_status
//                       )}`}
//                     >
//                       <span className="h-2 w-2 flex-shrink-0 rounded-full bg-current" />
//                       {selectedCandidate.candidate_status || "N/A"}
//                     </span>
//                   </div>

//                   <div className="border-l border-gray-100 px-5 py-3">
//                     <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">Submitted</div>
//                     <div className="text-xs font-semibold flex justify-center text-gray-900">
//                       {selectedCandidate.date_of_submission
//                         ? new Date(selectedCandidate.date_of_submission).toLocaleDateString("en-IN", {
//                             day: "2-digit",
//                             month: "short",
//                             year: "numeric",
//                           })
//                         : "N/A"}
//                     </div>
//                   </div>
//                 </div>

//                 {/* ── Tab Switcher ── */}
//                 <div className="flex justify-center px-6 py-6">
//                   <div className="flex w-full max-w-md rounded-xl bg-gray-100 p-1.5">
//                     {[
//                       { key: "personal" as const, label: "Personal Information" },
//                       { key: "position" as const, label: "Position & Documents" },
//                     ].map((tab) => (
//                       <button
//                         key={tab.key}
//                         type="button"
//                         onClick={() => setDetailTab(tab.key)}
//                         className={`flex-1 rounded-lg px-5 py-3 text-sm font-medium transition-all duration-200 outline-none focus:outline-none focus:ring-0 ${
//                           detailTab === tab.key
//                             ? "bg-white text-gray-800 shadow-sm"
//                             : "bg-transparent text-gray-500 hover:bg-transparent hover:text-gray-700"
//                         }`}
//                       >
//                         {tab.label}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* ── Tab Content ── */}
//                 <div className="max-h-[55vh] overflow-y-auto">

//                   {/* ═══ TAB 1: Personal Information ═══ */}
//                   {detailTab === "personal" && (
//                     <div className="p-6">
//                       <div className="flex items-center gap-2 mb-4">
//                         <User size={15} className="text-gray-400" />
//                         <h3 className="text-sm font-semibold text-gray-700">Applicant Information</h3>
//                       </div>

//                       <div className="space-y-0">
//                         {[
//                           { label: "Candidate Name", value: "candidate_name", icon: <User size={13} className="text-gray-400" /> },
//                           { label: "Email Address", value: "email", icon: <Mail size={13} className="text-gray-400" /> },
//                           { label: "Mobile Number", value: "mobile_number", icon: <Phone size={13} className="text-gray-400" /> },
//                           { label: "Current Organization", value: "current_last_organization", icon: <Building size={13} className="text-gray-400" /> },
//                           { label: "Experience (Years)", value: "experience", icon: <Clock size={13} className="text-gray-400" /> },
//                           { label: "Current City", value: "current_city", icon: <MapPin size={13} className="text-gray-400" /> },
//                           { label: "Current CTC", value: "current_ctc", icon: <DollarSign size={13} className="text-gray-400" /> },
//                           { label: "Expected CTC", value: "expected_ctc", icon: <DollarSign size={13} className="text-gray-400" /> },
//                           { label: "Notice Period (Days)", value: "notice_period", icon: <Clock size={13} className="text-gray-400" /> },
//                         ].map(({ label, value, icon }) => (
//                           <div key={value} className="flex items-center py-3 border-b border-gray-100 last:border-0">
//                             <div className="flex items-center gap-2.5 w-[200px] shrink-0">
//                               {icon}
//                               <span className="text-sm text-gray-500">{label}</span>
//                             </div>
//                             <span className="text-sm text-gray-400 mr-3">:</span>
//                             {isEditing ? (
//                               <input
//                                 type="text"
//                                 value={(selectedCandidate as any)[value] || ""}
//                                 onChange={(e) =>
//                                   setSelectedCandidate((prev: any) => ({ ...prev, [value]: e.target.value }))
//                                 }
//                                 className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               />
//                             ) : (
//                               <span className="text-sm font-medium text-gray-900">
//                                 {(selectedCandidate as any)[value] || "N/A"}
//                               </span>
//                             )}
//                           </div>
//                         ))}
//                       </div>

//                       {/* Screening Comments */}
//                       <div className="mt-5 pt-4 border-t border-gray-200">
//                         <div className="flex items-center gap-2 mb-2">
//                           <FileText size={13} className="text-gray-400" />
//                           <span className="text-sm text-gray-500">Screening Comments</span>
//                         </div>
//                         {isEditing ? (
//                           <textarea
//                             value={selectedCandidate.screening_comments || ""}
//                             onChange={(e) =>
//                               setSelectedCandidate((prev: any) => ({
//                                 ...prev,
//                                 screening_comments: e.target.value,
//                               }))
//                             }
//                             rows={3}
//                             className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
//                           />
//                         ) : (
//                           <div className="text-sm text-gray-900 bg-gray-50 rounded-lg px-4 py-3 min-h-[40px]">
//                             {selectedCandidate.screening_comments || "No comments"}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {/* ═══ TAB 2: Position & Documents ═══ */}
//                   {detailTab === "position" && (
//                     <div className="p-6">
//                       <div className="flex items-center gap-2 mb-4">
//                         <Building size={15} className="text-gray-400" />
//                         <h3 className="text-sm font-semibold text-gray-700">Position Details</h3>
//                       </div>

//                       <div className="space-y-0 mb-6">
//                         {[
//                           { label: "Position Name", value: "position_name" },
//                           { label: "Client Name", value: "client_name" },
//                           { label: "Recruiter", value: "recruiter" },
//                           { label: "CTC Budget", value: "ctc_budget" },
//                           { label: "Position Status", value: "position_status" },
//                           { label: "Date of Submission", value: "date_of_submission" },
//                           { label: "Date Profile Shared", value: "date_profile_shared" },
//                           { label: "Interview Date/Time", value: "interview_date_time" },
//                           { label: "Client SPOC", value: "client_spoc" },
//                           { label: "Laksh SPOC", value: "laksh_spoc" },
//                         ].map(({ label, value }) => (
//                           <div key={value} className="flex items-center py-3 border-b border-gray-100 last:border-0">
//                             <div className="w-[200px] shrink-0">
//                               <span className="text-sm text-gray-500">{label}</span>
//                             </div>
//                             <span className="text-sm text-gray-400 mr-3">:</span>
//                             {isEditing ? (
//                               <input
//                                 type="text"
//                                 value={(selectedCandidate as any)[value] || ""}
//                                 onChange={(e) =>
//                                   setSelectedCandidate((prev: any) => ({ ...prev, [value]: e.target.value }))
//                                 }
//                                 className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               />
//                             ) : (
//                               <span className="text-sm font-medium text-gray-900">
//                                 {(selectedCandidate as any)[value] || "N/A"}
//                               </span>
//                             )}
//                           </div>
//                         ))}

//                         {/* Candidate Status row */}
//                         <div className="flex items-center py-3 border-b border-gray-100">
//                           <div className="w-[200px] shrink-0">
//                             <span className="text-sm text-gray-500">Candidate Status</span>
//                           </div>
//                           <span className="text-sm text-gray-400 mr-3">:</span>
//                           {isEditing ? (
//                             <div className="flex-1">
//                               <Select
//                                 options={candidateStatusOptions}
//                                 isSearchable
//                                 placeholder="Select status…"
//                                 value={
//                                   candidateStatusOptions.find(
//                                     (opt) => opt.value === selectedCandidate.candidate_status
//                                   ) || null
//                                 }
//                                 onChange={(selected: { value: string; label: string } | null) =>
//                                   setSelectedCandidate((prev: any) => ({
//                                     ...prev,
//                                     candidate_status: selected?.value || "",
//                                   }))
//                                 }
//                                 styles={{
//                                   control: (base) => ({
//                                     ...base,
//                                     minHeight: "32px",
//                                     fontSize: "13px",
//                                     borderColor: "#e5e7eb",
//                                   }),
//                                   valueContainer: (base) => ({ ...base, padding: "0 8px" }),
//                                   indicatorsContainer: (base) => ({ ...base, height: "32px" }),
//                                 }}
//                               />
//                             </div>
//                           ) : (
//                             <span className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(selectedCandidate.candidate_status)}`}>
//                               {selectedCandidate.candidate_status || "N/A"}
//                             </span>
//                           )}
//                         </div>
//                       </div>

//                       {/* Documents Section */}
//                       <div className="border-t border-gray-200 pt-5">
//                         <div className="flex items-center justify-between mb-4">
//                           <div className="flex items-center gap-2">
//                             <FileText size={15} className="text-gray-400" />
//                             <h3 className="text-sm font-semibold text-gray-700">Documents</h3>
//                             {candidateDocuments.length > 0 && (
//                               <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
//                                 {candidateDocuments.length}
//                               </span>
//                             )}
//                           </div>
//                           <button
//                             onClick={() => {
//                               const candidateId = (selectedCandidate as any).candidate_id;
//                               if (candidateId) openDocumentModal(candidateId);
//                             }}
//                             className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium transition-colors"
//                           >
//                             <Plus size={13} />
//                             Upload
//                           </button>
//                         </div>

//                         <div className="rounded-xl border border-gray-200 overflow-hidden">
//                           {candidateDocuments && candidateDocuments.length > 0 ? (
//                             <div className="divide-y divide-gray-100 max-h-56 overflow-y-auto">
//                               {candidateDocuments.map((doc) => {
//                                 const IconComponent = getDocumentIcon(doc.type);
//                                 return (
//                                   <div
//                                     key={doc.id}
//                                     className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
//                                   >
//                                     <div className="flex items-center gap-3 min-w-0">
//                                       <div className="bg-blue-50 p-2 rounded-lg shrink-0">
//                                         <IconComponent size={14} className="text-blue-600" />
//                                       </div>
//                                       <div className="min-w-0">
//                                         <div className="text-sm font-medium text-gray-900 truncate">{doc.fileName}</div>
//                                         <div className="text-xs text-gray-500">
//                                           {doc.documentType} · {doc.size || "N/A"} · {new Date(doc.uploadedAt).toLocaleDateString()}
//                                         </div>
//                                       </div>
//                                     </div>
//                                     <div className="flex items-center gap-1 shrink-0 ml-3">
//                                       <a
//                                         href={doc.fileUrl}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
//                                       >
//                                         <Download size={14} />
//                                       </a>
//                                       <button
//                                         onClick={() => handleDeleteDocument((selectedCandidate as any).candidate_id, doc.id)}
//                                         className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
//                                       >
//                                         <Trash2 size={14} />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           ) : (
//                             <div className="text-center py-10 bg-gray-50/50">
//                               <FileText size={28} className="mx-auto mb-2 text-gray-300" />
//                               <p className="text-sm text-gray-500">No documents uploaded</p>
//                               <button
//                                 onClick={() => openDocumentModal((selectedCandidate as any).candidate_id)}
//                                 className="mt-1.5 text-blue-600 hover:text-blue-800 text-xs font-medium"
//                               >
//                                 Upload your first document
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                         <p className="text-[11px] text-gray-400 mt-2">
//                           Supported: PDF, DOC, DOCX, JPG, JPEG, PNG
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ═══════ DOCUMENT UPLOAD MODAL ═══════ */}
//       {showDocumentModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[70]">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative">
//             <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
//               <h2 className="text-base font-bold text-gray-900">Upload Document</h2>
//               <button
//                 onClick={() => {
//                   setShowDocumentModal(false);
//                   setDocumentForm({ name: "", type: "Resume", file: null });
//                 }}
//                 className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Document Name *</label>
//                 <input
//                   type="text"
//                   required
//                   placeholder="e.g., Resume_JohnDoe_2025"
//                   value={documentForm.name}
//                   onChange={(e) =>
//                     setDocumentForm((prev) => ({ ...prev, name: e.target.value }))
//                   }
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Document Type</label>
//                 <FilterSelect
//                   ariaLabel="Document type"
//                   className="w-full"
//                   value={documentForm.type}
//                   onChange={(v) => setDocumentForm((prev) => ({ ...prev, type: v }))}
//                   options={DOCUMENT_TYPES.map((t) => ({ value: t, label: t }))}
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Upload Document *</label>
//                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:border-gray-300 transition-colors bg-gray-50/50">
//                   <div className="space-y-1 text-center">
//                     <Upload className="mx-auto h-10 w-10 text-gray-400" />
//                     <div className="flex text-xs text-gray-500">
//                       <label
//                         htmlFor="file-upload"
//                         className="relative cursor-pointer font-medium text-blue-600 hover:text-blue-500"
//                       >
//                         <span>Choose a file</span>
//                         <input
//                           id="file-upload"
//                           name="file-upload"
//                           type="file"
//                           className="sr-only"
//                           accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                           onChange={(e) => {
//                             const file = e.target.files?.[0];
//                             if (file) {
//                               setDocumentForm((prev) => ({
//                                 ...prev,
//                                 file: file,
//                                 name: prev.name || file.name.split(".")[0],
//                               }));
//                             }
//                           }}
//                         />
//                       </label>
//                       <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-[11px] text-gray-400">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
//                   </div>
//                 </div>
//                 {documentForm.file && (
//                   <div className="mt-2 flex items-center gap-2 text-xs text-gray-600 bg-blue-50 rounded-lg px-3 py-2">
//                     <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
//                     <span className="truncate">{documentForm.file.name}</span>
//                     <button
//                       onClick={() => setDocumentForm((prev) => ({ ...prev, file: null }))}
//                       className="text-red-500 hover:text-red-700 shrink-0 ml-auto"
//                     >
//                       <X className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowDocumentModal(false);
//                     setDocumentForm({ name: "", type: "Resume", file: null });
//                   }}
//                   className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleAddDocument}
//                   disabled={!documentForm.name.trim() || !documentForm.file}
//                   className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
//                 >
//                   <Upload className="w-3.5 h-3.5" />
//                   Upload
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ═══════ COMMENT MODAL (mandatory comment on select / reject) ═══════ */}
//       {commentModalOpen && commentModalData && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
//             <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
//               <div className="min-w-0">
//                 <h2 className="text-base font-bold text-gray-900">
//                   {isRejectStatus(commentModalData.newStatus) ? "Confirm Rejection" : "Confirm Selection"}
//                 </h2>
//                 <p className="text-xs text-gray-500 mt-0.5 truncate">{commentModalData.candidateName}</p>
//               </div>
//               <button
//                 onClick={closeCommentModal}
//                 className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               <div className="flex items-center gap-2">
//                 <span className="text-xs text-gray-500">Status:</span>
//                 <span
//                   className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${
//                     isRejectStatus(commentModalData.newStatus)
//                       ? "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
//                       : "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
//                   }`}
//                 >
//                   {commentModalData.newStatus}
//                 </span>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">
//                   Comment <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   value={commentModalData.comment}
//                   onChange={(e) =>
//                     setCommentModalData((prev) => (prev ? { ...prev, comment: e.target.value } : prev))
//                   }
//                   placeholder={
//                     isRejectStatus(commentModalData.newStatus)
//                       ? "Reason for rejection is mandatory…"
//                       : "Add your selection comment…"
//                   }
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
//                 />
//               </div>

//               <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={closeCommentModal}
//                   className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   disabled={!commentModalData.comment.trim()}
//                   onClick={async () => {
//                     try {
//                       await submissionService.update(commentModalData.submissionId, {
//                         submission: {
//                           status: commentModalData.newStatus,
//                           status_comment: commentModalData.comment.trim(),
//                         },
//                       });
//                       fetchSummary();
//                     } catch (err) {
//                       console.error("Failed to update status with comment", err);
//                     }
//                     closeCommentModal();
//                   }}
//                   className={`px-5 py-2 text-sm text-white rounded-lg transition-colors flex items-center gap-1.5 disabled:bg-gray-300 disabled:cursor-not-allowed ${
//                     isRejectStatus(commentModalData.newStatus)
//                       ? "bg-red-600 hover:bg-red-700"
//                       : "bg-emerald-600 hover:bg-emerald-700"
//                   }`}
//                 >
//                   <MessageSquare className="w-3.5 h-3.5" />
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SubmissionManagementSystem;






// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import FilterSelect from "../components/FilterSelect";
// import {
//   Search,
//   Filter,
//   FileText,
//   Phone,
//   Mail,
//   Building,
//   Clock,
//   User,
//   DollarSign,
//   MapPin,
//   X,
//   ChevronDown,
//   Upload,
//   Download,
//   Trash2,
//   Plus,
//   Loader,
//   BriefcaseBusiness,
//   MessageSquare,
// } from "lucide-react";
// import { submissionService } from "../services/submissionService";
// import type { Submission, DetailedSubmission, SubmissionFilters, CandidateDocument } from "../services/submissionService";
// import { applicantService } from "../services/applicantService";
// import { positionService } from "../services/positionService";
// import { clientService } from "../services/clientService";
// import { candidateStatusOptions, cityOptions } from "../constants/dropdown";
// import Select from "react-select";
// import { slugify } from "../utils/slug";

// const DOCUMENT_TYPES = [
//   "Resume",
//   "Pan Card",
//   "Cover Letter",
//   "Adhaar Card",
//   "Offer Letter",
//   "Resignation Letter",
//   "Academic Document",
//   "Reference Letter",
//   "Other",
// ];

// const EMPTY_FILTERS = {
//   positionName: "",
//   clientName: "",
//   candidateName: "",
//   location: "",
// };

// const SubmissionManagementSystem = () => {
//   const navigate = useNavigate();

//   // Document state
//   const [candidateDocuments, setCandidateDocuments] = useState<CandidateDocument[]>([]);
//   const [groupBy, setGroupBy] = useState<"position" | "client_name" | "candidate_name" | "status">("position");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState(EMPTY_FILTERS);
//   const [selectedCandidate, setSelectedCandidate] = useState<DetailedSubmission | null>(null);
//   const [originalCandidate, setOriginalCandidate] = useState<DetailedSubmission | null>(null);
//   const [showFilters, setShowFilters] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [detailTab, setDetailTab] = useState<"personal" | "position">("personal");
//   const [showDocumentModal, setShowDocumentModal] = useState(false);
//   const [currentCandidateId, setCurrentCandidateId] = useState<number | null>(null);
//   const [documentForm, setDocumentForm] = useState({
//     name: "",
//     type: "Resume",
//     file: null as File | null,
//   });

//   // Dropdown data for the filters
//   const [positionNames, setPositionNames] = useState<string[]>([]);
//   const [clientNames, setClientNames] = useState<string[]>([]);

//   // API states
//   const [groupedData, setGroupedData] = useState<Record<string, { submissions: Submission[], totalCount: number }>>({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Backend pagination metadata
//   const [backendTotalGroups, setBackendTotalGroups] = useState(0);
//   const [backendTotalPages, setBackendTotalPages] = useState(0);
//   const [backendCurrentPage, setBackendCurrentPage] = useState(1);

//   // Group-level pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const GROUPS_PER_PAGE = 10;

//   // ─── Comment Modal State (for select/reject with mandatory comment) ───
//   const COMMENT_REQUIRED_STATUSES = [
//     "Final Select", "R1 select", "R2 select", "R3 Select",
//     "Client Reject", "Internal Reject", "Profile Reject", "Reject",
//     "R1 reject", "R2 reject", "R3 reject", "Offer Drop", "Dropout",
//   ];
//   const [commentModalOpen, setCommentModalOpen] = useState(false);
//   const [commentModalData, setCommentModalData] = useState<{
//     submissionId: number;
//     candidateName: string;
//     newStatus: string;
//     comment: string;
//   } | null>(null);

//   const isRejectStatus = (status: string) =>
//     status.toLowerCase().includes("reject") || status === "Offer Drop" || status === "Dropout";

//   const closeCommentModal = () => {
//     setCommentModalOpen(false);
//     setCommentModalData(null);
//   };

//   const fetchSummary = async (page: number = 1) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const apiFilters: SubmissionFilters = {
//         position: filters.positionName || undefined,
//         client_name: filters.clientName || undefined,
//         candidate_name: filters.candidateName || undefined,
//         location: filters.location || undefined,
//         groupBy: groupBy,
//         search: searchTerm || undefined,
//       };

//       const response = await submissionService.fetchSummary(apiFilters, page);

//       if (response.status === 200) {
//         setGroupedData(response.data.groups);
//         setBackendTotalGroups(response.data.totalGroups || 0);
//         setBackendTotalPages(response.data.totalPages || 0);
//         setBackendCurrentPage(response.data.currentPage || page);
//       }
//     } catch (err: any) {
//       setError(err?.message || "Failed to fetch submissions");
//       console.error("Error fetching summary:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Position and client lists for the filter dropdowns
//   useEffect(() => {
//     const unique = (list: string[]) =>
//       Array.from(new Set(list.map((s) => s?.trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b));

//     positionService
//       .fetchAll(1, 2000)
//       .then((res: any) => {
//         if (res.status === 200) setPositionNames(unique(res.data.positions.map((p: any) => p.title)));
//       })
//       .catch((err: any) => console.error("Error fetching positions:", err));

//     clientService
//       .fetchAll()
//       .then((res: any) => setClientNames(unique((res?.data || []).map((c: any) => c.client_name))))
//       .catch((err: any) => console.error("Error fetching clients:", err));
//   }, []);

//   const listState = { groupBy, filters, searchTerm, currentPage };

// const handleViewMore = (groupName: string) => {
//   navigate(`/submission-management/${slugify(groupName)}`, {
//     state: { ...listState, groupName },
//   });
// };

// const handleCandidateClick = (submission: Submission, groupName: string) => {
//   navigate(`/submission-management/${slugify(groupName)}/${submission.id}`, {
//     state: { ...listState, groupName, fromGroupDetail: false },
//   });
// };

//   const fetchCandidateDocuments = async (candidateId: string) => {
//     try {
//       const response = await applicantService.fetchDocuments(candidateId);
//       if (response.status === 200) {
//         setCandidateDocuments(response.data || []);
//       }
//     } catch (err: any) {
//       console.error("Error fetching documents:", err);
//     }
//   };

//   const handleSaveCandidate = async () => {
//     if (!selectedCandidate) {
//       console.error("❌ No selected candidate");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const submissionId = selectedCandidate.id?.toString();

//       if (!submissionId) {
//         throw new Error("Submission ID not found. Please refresh and try again.");
//       }

//       const applicantData = {
//         name: selectedCandidate.candidate_name,
//         email: selectedCandidate.email,
//         phone: selectedCandidate.mobile_number,
//         city: selectedCandidate.current_city,
//         current_last_organisation: selectedCandidate.current_last_organization,
//         total_experience_in_years: selectedCandidate.experience,
//         current_ctc: selectedCandidate.current_ctc,
//         expected_ctc: selectedCandidate.expected_ctc,
//         notice_period_in_days: selectedCandidate.notice_period,
//         special_comments: selectedCandidate.screening_comments,
//       };

//       const jobData = {
//         position: selectedCandidate.position_name,
//         ctc: selectedCandidate.ctc_budget,
//         client_spoc: selectedCandidate.client_spoc,
//       };

//       const submissionData = {
//         status: selectedCandidate.candidate_status,
//         date_profile_shared_from_Applicants: selectedCandidate.date_profile_shared,
//         candidate_status_update_date: selectedCandidate.interview_date_time,
//       };

//       const updateData = {
//         applicant: applicantData,
//         job: jobData,
//         submission: submissionData,
//       };

//       const response = await submissionService.update(submissionId, updateData);

//       if (response.status === 200) {
//         setIsEditing(false);
//         await fetchSummary(currentPage);
//         alert("Candidate details updated successfully!");
//         setSelectedCandidate(null);
//       } else {
//         throw new Error(response.message || "Failed to update candidate");
//       }
//     } catch (err: any) {
//       console.error("❌ Error updating candidate:", err);
//       const errorMessage = err.message || "Failed to update candidate details";
//       setError(errorMessage);
//       alert("❌ " + errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSummary(currentPage);
//   }, [groupBy]);

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       fetchSummary(1);
//       setCurrentPage(1);
//     }, 500);

//     return () => clearTimeout(delayDebounce);
//   }, [searchTerm, filters]);

//   const getStatusColor = (status: string) => {
//     const colors: Record<string, string> = {
//       "New Submission": "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20",
//       "Profile Shared": "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
//       "R1 Scheduled": "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20",
//       "R1 Completed": "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20",
//       "R2 Scheduled": "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20",
//       "R2 Completed": "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20",
//       "R3 Scheduled": "bg-pink-50 text-pink-700 ring-1 ring-inset ring-pink-600/20",
//       Selected: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
//       Rejected: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
//     };
//     return colors[status] || "bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20";
//   };

//   const openDocumentModal = (candidateId: number) => {
//     setCurrentCandidateId(candidateId);
//     setShowDocumentModal(true);
//   };

//   const handleAddDocument = async () => {
//     if (!documentForm.name.trim() || !documentForm.file || !selectedCandidate) {
//       alert("Please provide a document name and select a file.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await applicantService.uploadDocument(
//         selectedCandidate.candidate_id,
//         documentForm.type,
//         documentForm.file
//       );

//       if (response.status === 200) {
//         await fetchCandidateDocuments(selectedCandidate.candidate_id);
//         setDocumentForm({ name: "", type: "Resume", file: null });
//         setShowDocumentModal(false);
//         alert("Document uploaded successfully!");
//       } else {
//         console.error("Upload failed:", response.data);
//         alert(response.data?.message || "Failed to upload document");
//       }
//     } catch (err: any) {
//       console.error("Error uploading document:", err);
//       alert(err?.response?.data?.message || "Failed to upload document");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteDocument = async (candidateId: any, documentId: any) => {
//     if (!documentId) {
//       alert("Document ID is required");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete this document?")) {
//       return;
//     }

//     try {
//       await applicantService.deleteDocument(candidateId, documentId);
//       await fetchCandidateDocuments(candidateId);

//       if (selectedCandidate?.candidate_id === candidateId) {
//         setSelectedCandidate((prev: any) => ({
//           ...prev,
//           documents: prev.documents?.filter((doc: any) => doc.id !== documentId) || [],
//         }));
//       }

//       alert("Document deleted successfully!");
//     } catch (error: any) {
//       console.error("Failed to delete document:", error);
//       alert(
//         error?.response?.data?.message ||
//         "Failed to delete document. Please try again."
//       );
//     }
//   };

//   const getDocumentIcon = (type: string) => {
//     return FileText;
//   };

//   const totalSubmissions = Object.values(groupedData).reduce(
//     (sum, group) => sum + group.totalCount,
//     0
//   );

//   const groupEntries = Object.entries(groupedData);
//   const totalPages = backendTotalPages || 1;
//   const paginatedGroups = groupEntries;
//   const hasActiveFilters = Object.values(filters).some(Boolean);

//   const handlePageChange = (newPage: number) => {
//     setCurrentPage(newPage);
//     fetchSummary(newPage);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-gray-50 p-4 md:p-6 md:ml-16">
//         <div className="max-w-7xl mx-auto">
//           {/* Loading Overlay */}
//           {loading && (
//             <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//               <div className="bg-white rounded-xl p-6 shadow-xl flex flex-col items-center gap-3">
//                 <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-teal-600"></div>
//                 <p className="text-sm text-gray-600 font-medium">Loading…</p>
//               </div>
//             </div>
//           )}

//           {/* Error Alert */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2">
//               <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <p className="text-sm text-red-800 flex-1">{error}</p>
//               <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 p-1">
//                 <X size={14} />
//               </button>
//             </div>
//           )}

//           {/* Header Bar */}
//           <div className="bg-white rounded-xl shadow-sm p-5 mb-5">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//               <h2 className="text-xl font-bold text-gray-900">Submission Management</h2>

//               {/* Search */}
//               <div className="flex-1 max-w-md">
//                 <div className="relative">
//                   <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full h-10 pl-9 pr-9 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//                     placeholder="Search candidates, positions, clients…"
//                   />
//                   {searchTerm && (
//                     <button
//                       onClick={() => setSearchTerm("")}
//                       aria-label="Clear search"
//                       className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 grid place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
//                     >
//                       <X size={14} />
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Group By + Filters */}
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-2">
//                   <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Group by</label>
//                   <FilterSelect
//                     ariaLabel="Group by"
//                     className="w-40"
//                     value={groupBy}
//                     onChange={(v) => setGroupBy(v as typeof groupBy)}
//                     options={[
//                       { value: "position", label: "Position" },
//                       { value: "client_name", label: "Client" },
//                       { value: "candidate_name", label: "Candidate" },
//                       { value: "status", label: "Status" },
//                     ]}
//                   />
//                 </div>

//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className={`h-10 flex items-center gap-1.5 px-3 border rounded-lg text-sm transition-colors ${
//                     showFilters ? "border-teal-500 bg-teal-50 text-teal-700" : "border-gray-300 hover:bg-gray-50 text-gray-700"
//                   }`}
//                 >
//                   <Filter size={14} />
//                   Filters
//                   {hasActiveFilters && (
//                     <span className="grid h-5 min-w-5 place-items-center rounded-full bg-teal-600 px-1.5 text-[11px] font-semibold text-white">
//                       {Object.values(filters).filter(Boolean).length}
//                     </span>
//                   )}
//                   <ChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
//                 </button>
//               </div>
//             </div>

//             {/* Filters Panel */}
//             {showFilters && (
//               <div className="mt-4 pt-4 border-t border-gray-100">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Position</label>
//                     <FilterSelect
//                       searchable
//                       searchPlaceholder="Search positions..."
//                       ariaLabel="Filter by position"
//                       className="w-full"
//                       value={filters.positionName}
//                       onChange={(v) => setFilters({ ...filters, positionName: v })}
//                       options={[
//                         { value: "", label: "All positions" },
//                         ...positionNames.map((p) => ({ value: p, label: p })),
//                       ]}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Client</label>
//                     <FilterSelect
//                       searchable
//                       searchPlaceholder="Search clients..."
//                       ariaLabel="Filter by client"
//                       className="w-full"
//                       value={filters.clientName}
//                       onChange={(v) => setFilters({ ...filters, clientName: v })}
//                       options={[
//                         { value: "", label: "All clients" },
//                         ...clientNames.map((c) => ({ value: c, label: c })),
//                       ]}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Candidate</label>
//                     <input
//                       type="text"
//                       value={filters.candidateName}
//                       onChange={(e) => setFilters({ ...filters, candidateName: e.target.value })}
//                       placeholder="Type a name..."
//                       className="w-full h-10 px-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
//                     <FilterSelect
//                       searchable
//                       searchPlaceholder="Search cities..."
//                       ariaLabel="Filter by location"
//                       className="w-full"
//                       value={filters.location}
//                       onChange={(v) => setFilters({ ...filters, location: v })}
//                       options={[
//                         { value: "", label: "All locations" },
//                         ...cityOptions.map((c) => ({ value: c.label, label: c.label })),
//                       ]}
//                     />
//                   </div>
//                 </div>

//                 {hasActiveFilters && (
//                   <div className="mt-3 flex justify-end">
//                     <button
//                       onClick={() => setFilters(EMPTY_FILTERS)}
//                       className="inline-flex h-8 items-center gap-1.5 px-3 text-xs font-medium text-teal-700 rounded-lg hover:bg-teal-50"
//                     >
//                       <X size={14} />
//                       Clear filters
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Results Count */}
//           <div className="mb-3 text-xs text-gray-500">
//             {totalSubmissions} submissions across {backendTotalGroups} groups
//             {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
//           </div>

//           {/* ═══════ GROUPED SUBMISSION CARDS ═══════ */}
//           <div className="space-y-5">
//             {paginatedGroups.map(([groupName, groupInfo]) => {
//               const visibleSubmissions = groupInfo.submissions.slice(0, 2);
//               const hasMore = groupInfo.totalCount > 2;

//               return (
//                 <div key={groupName} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                   {/* Group Header */}
//                   <div className="flex items-center justify-between from-slate-50 to-teal-50/60 px-5 py-3.5 border-b border-gray-200">
//                     <div className="flex items-center gap-3 min-w-0">
//                       <div className="bg-teal-100 text-teal-600 p-1.5 rounded-lg shrink-0">
//                         <Building size={18} />
//                       </div>
//                       <div className="min-w-0">
//                         <div className="flex items-center gap-2 flex-wrap">
//                           <h2 className="text-sm font-semibold text-gray-900 capitalize truncate">{groupName}</h2>
//                           <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium  text-teal-700 shrink-0">
//                             {groupInfo.totalCount}
//                           </span>
//                         </div>
//                         <p className="text-xs text-gray-500 truncate">
//                           Client: {visibleSubmissions[0]?.client_name || "N/A"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* ─── Submission rows as cards (no horizontal scroll) ─── */}
//                   <div className="divide-y divide-gray-100">
//                     {visibleSubmissions.map((submission) => (
//                       <div
//   key={submission.id}
//   className="px-5 py-3.5 hover:bg-gray-50/80 cursor-pointer transition-colors"
//   onClick={() => handleCandidateClick(submission, groupName)}
// >
//                         {/* Row 1: Name + Status + Resume */}
//                         <div className="flex items-start justify-between gap-3 mb-2">
//                           <div className="min-w-0 flex-1">
//                             <div className="text-sm font-semibold text-gray-900 truncate">{submission.candidate_name}</div>
//                             <div className="text-xs text-gray-600 font-semibold mt-0.5 truncate">
//                               {submission.position} · {submission.location || "N/A"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col items-end gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
//                             <div className="flex items-center gap-2">
//                               <div className="w-[210px]">
//                                 <Select
//                                   options={candidateStatusOptions}
//                                   isSearchable
//                                   placeholder={submission.status || "Status"}
//                                   value={
//                                     candidateStatusOptions.find((opt) => opt.value === submission.status) || null
//                                   }
//                                   onChange={async (selected) => {
//                                     const newStatus = selected?.value || "";

//                                     // Statuses that require a mandatory comment open the comment modal first
//                                     if (COMMENT_REQUIRED_STATUSES.includes(newStatus)) {
//                                       setCommentModalData({
//                                         submissionId: submission.id,
//                                         candidateName: submission.candidate_name,
//                                         newStatus,
//                                         comment: "",
//                                       });
//                                       setCommentModalOpen(true);
//                                       return;
//                                     }

//                                     submission.status = newStatus;
//                                     try {
//                                       await submissionService.update(submission.id, {
//                                         submission: { status: newStatus },
//                                       });
//                                       fetchSummary();
//                                     } catch (err) {
//                                       console.error("Failed to update status", err);
//                                     }
//                                   }}
//                                   styles={{
//                                     control: (base) => ({
//                                       ...base,
//                                       minHeight: "30px",
//                                       height: "30px",
//                                       fontSize: "12px",
//                                       borderColor: "#e5e7eb",
//                                       boxShadow: "none",
//                                       "&:hover": { borderColor: "#d1d5db" },
//                                     }),
//                                     valueContainer: (base) => ({ ...base, padding: "0 6px" }),
//                                     indicatorsContainer: (base) => ({ ...base, height: "30px" }),
//                                     option: (base, { isSelected }) => ({
//                                       ...base,
//                                       fontSize: "12px",
//                                       padding: "6px 10px",
//                                       backgroundColor: isSelected ? "#ccfbf1" : "#fff",
//                                       color: "#134e4a",
//                                       "&:hover": { backgroundColor: "#f0fdfa" },
//                                     }),
//                                     singleValue: (base) => ({ ...base, color: "#134e4a", fontSize: "12px" }),
//                                   }}
//                                   menuPortalTarget={document.body}
//                                   menuPosition="fixed"
//                                 />
//                               </div>
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   window.open(submission.resume || "N/A", "_blank");
//                                 }}
//                                 className="text-teal-600 hover:text-teal-800 text-xs font-medium px-2 py-1 rounded hover:bg-teal-50 transition-colors whitespace-nowrap"
//                               >
//                                 Resume ↗
//                               </button>

//                               <button
//   onClick={(e) => {
//     e.stopPropagation();
//     handleCandidateClick(submission, groupName);
//   }}
//   className="text-teal-600 hover:text-teal-800 text-xs font-medium px-2.5 py-1 rounded-lg border border-teal-300 hover:bg-teal-50 transition-colors whitespace-nowrap"
// >
//   View Tracker
// </button>
//                             </div>

//                             {/* Status comment (from select/reject confirmation) */}
//                             {(submission as any).status_comment && (
//                               <div className="max-w-[360px] bg-green-50 text-green-800 text-xs rounded-lg px-3 py-2 text-left">
//                                 {(submission as any).status_comment}
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         {/* Row 2: Key details as inline chips */}
//                         <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
//                           <span className="flex items-center gap-1">
//                             <User size={12} className="text-gray-400" />
//                             {submission.recruiter || "N/A"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Clock size={12} className="text-gray-400" />
//                             {submission.notice_period ? `${submission.notice_period}d notice` : "N/A"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <DollarSign size={12} className="text-gray-400" />
//                             CTC: {submission.current_ctc ? `${submission.current_ctc}L` : "N/A"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <DollarSign size={12} className="text-gray-400" />
//                             Budget: {submission.ctc_budget ? `${submission.ctc_budget}L` : "N/A"}
//                           </span>
//                           {submission.submitted_on && (
//                             <span className="text-gray-400">
//                               Submitted {new Date(submission.submitted_on).toLocaleDateString()}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* View More */}
//                   {hasMore && (
//                     <div className="flex justify-center py-2.5 bg-gray-50/60 border-t border-gray-100">
//                       <button
//   onClick={() => handleViewMore(groupName)}
//   className="flex items-center gap-1.5 text-teal-600 hover:text-teal-800 text-xs font-medium transition-colors"
// >
//                         <ChevronDown size={13} />
//                         {groupInfo.totalCount - 2} more
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="mt-5 flex items-center justify-between bg-white rounded-xl shadow-sm p-3 border border-gray-200">
//               <div className="text-xs text-gray-500">
//                 Page {currentPage} of {totalPages} · {backendTotalGroups} groups
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <button
//                   onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Previous
//                 </button>

//                 <div className="flex items-center gap-1">
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
//                     const showPage =
//                       page === 1 ||
//                       page === totalPages ||
//                       (page >= currentPage - 1 && page <= currentPage + 1);

//                     const showEllipsis =
//                       (page === currentPage - 2 && currentPage > 3) ||
//                       (page === currentPage + 2 && currentPage < totalPages - 2);

//                     if (showEllipsis) {
//                       return <span key={page} className="px-1.5 text-gray-400 text-xs">…</span>;
//                     }

//                     if (!showPage) return null;

//                     return (
//                       <button
//                         key={page}
//                         onClick={() => handlePageChange(page)}
//                         className={`w-8 h-8 text-xs rounded-lg transition-colors ${
//                           currentPage === page
//                             ? "bg-teal-600 text-white font-medium"
//                             : "border border-gray-200 hover:bg-gray-50 text-gray-700"
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <button
//                   onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Empty State */}
//           {Object.keys(groupedData).length === 0 && !loading && (
//             <div className="text-center py-16">
//               <FileText size={40} className="mx-auto text-gray-300 mb-3" />
//               <p className="text-gray-500 font-medium">No submissions found</p>
//               <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
//             </div>
//           )}

//           {/* ═══════ CANDIDATE DETAIL MODAL ═══════ */}
//           {selectedCandidate && (
//             <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 overflow-y-auto p-4 pt-[4vh]">
//               <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl my-4 border border-gray-200/60">

//                 {/* ── Top: Close + Edit bar ── */}
//                 <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
//                   <span className="text-xs text-gray-400">Candidate Detail</span>
//                   <div className="flex items-center gap-2">
//                     {isEditing ? (
//                       <>
//                         <button
//                           onClick={() => {
//                             setIsEditing(false);
//                             if (originalCandidate) {
//                               setSelectedCandidate({ ...originalCandidate });
//                             }
//                           }}
//                           disabled={loading}
//                           className="px-3 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 disabled:opacity-50 transition-colors"
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           onClick={handleSaveCandidate}
//                           disabled={loading}
//                           className="bg-teal-600 text-white px-3 py-1 text-xs rounded-lg hover:bg-teal-700 disabled:opacity-50 flex items-center gap-1.5 transition-colors"
//                         >
//                           {loading ? (
//                             <>
//                               <Loader size={12} className="animate-spin" />
//                               Saving…
//                             </>
//                           ) : (
//                             "Save Changes"
//                           )}
//                         </button>
//                       </>
//                     ) : (
//                       <button
//                         onClick={() => setIsEditing(true)}
//                         className="text-teal-600 hover:text-teal-700 text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-teal-50 transition-colors"
//                       >
//                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                         </svg>
//                         Edit
//                       </button>
//                     )}
//                     <button
//                       onClick={() => { setSelectedCandidate(null); setDetailTab("personal"); setIsEditing(false); }}
//                       className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
//                     >
//                       <X size={18} />
//                     </button>
//                   </div>
//                 </div>

//                 {/* ── Profile Card Header ── */}
//                 <div className="px-6 py-5 border-gray-100">
//                   <div className="flex items-start gap-4">
//                     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
//                       <BriefcaseBusiness size={20} className="text-gray-500" />
//                     </div>
//                     <div className="min-w-0 flex-1">
//                       <h2 className="text-lg font-bold text-gray-900 leading-tight">
//                         {selectedCandidate.candidate_name}
//                       </h2>
//                       <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-gray-500">
//                         {selectedCandidate.candidate_id && (
//                           <span className="font-medium text-gray-700">ID: #{selectedCandidate.candidate_id}</span>
//                         )}
//                         {selectedCandidate.email && (
//                           <a href={`mailto:${selectedCandidate.email}`} className="text-teal-600 hover:text-teal-700 hover:underline">
//                             {selectedCandidate.email}
//                           </a>
//                         )}
//                         {selectedCandidate.mobile_number && (
//                           <span className="flex items-center gap-1">
//                             <Phone size={11} />
//                             {selectedCandidate.mobile_number}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* ── Quick Status Strip ── */}
//                 <div className="mx-6 grid grid-cols-3 overflow-hidden rounded-xl border border-gray-200 bg-white">
//                   <div className="px-5 py-3">
//                     <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">Position</div>
//                     <div className="text-xs font-semibold flex justify-center text-gray-900 truncate">
//                       {selectedCandidate.position_name || "N/A"}
//                     </div>
//                   </div>

//                   <div className="border-l border-gray-100 px-5 py-3">
//                     <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">Status</div>
//                     <span
//                       className={`flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(
//                         selectedCandidate.candidate_status
//                       )}`}
//                     >
//                       <span className="h-2 w-2 flex-shrink-0 rounded-full bg-current" />
//                       {selectedCandidate.candidate_status || "N/A"}
//                     </span>
//                   </div>

//                   <div className="border-l border-gray-100 px-5 py-3">
//                     <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">Submitted</div>
//                     <div className="text-xs font-semibold flex justify-center text-gray-900">
//                       {selectedCandidate.date_of_submission
//                         ? new Date(selectedCandidate.date_of_submission).toLocaleDateString("en-IN", {
//                             day: "2-digit",
//                             month: "short",
//                             year: "numeric",
//                           })
//                         : "N/A"}
//                     </div>
//                   </div>
//                 </div>

//                 {/* ── Tab Switcher ── */}
//                 <div className="flex justify-center px-6 py-6">
//                   <div className="flex w-full max-w-md rounded-xl bg-gray-100 p-1.5">
//                     {[
//                       { key: "personal" as const, label: "Personal Information" },
//                       { key: "position" as const, label: "Position & Documents" },
//                     ].map((tab) => (
//                       <button
//                         key={tab.key}
//                         type="button"
//                         onClick={() => setDetailTab(tab.key)}
//                         className={`flex-1 rounded-lg px-5 py-3 text-sm font-medium transition-all duration-200 outline-none focus:outline-none focus:ring-0 ${
//                           detailTab === tab.key
//                             ? "bg-white text-gray-800 shadow-sm"
//                             : "bg-transparent text-gray-500 hover:bg-transparent hover:text-gray-700"
//                         }`}
//                       >
//                         {tab.label}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* ── Tab Content ── */}
//                 <div className="max-h-[55vh] overflow-y-auto">

//                   {/* ═══ TAB 1: Personal Information ═══ */}
//                   {detailTab === "personal" && (
//                     <div className="p-6">
//                       <div className="flex items-center gap-2 mb-4">
//                         <User size={15} className="text-gray-400" />
//                         <h3 className="text-sm font-semibold text-gray-700">Applicant Information</h3>
//                       </div>

//                       <div className="space-y-0">
//                         {[
//                           { label: "Candidate Name", value: "candidate_name", icon: <User size={13} className="text-gray-400" /> },
//                           { label: "Email Address", value: "email", icon: <Mail size={13} className="text-gray-400" /> },
//                           { label: "Mobile Number", value: "mobile_number", icon: <Phone size={13} className="text-gray-400" /> },
//                           { label: "Current Organization", value: "current_last_organization", icon: <Building size={13} className="text-gray-400" /> },
//                           { label: "Experience (Years)", value: "experience", icon: <Clock size={13} className="text-gray-400" /> },
//                           { label: "Current City", value: "current_city", icon: <MapPin size={13} className="text-gray-400" /> },
//                           { label: "Current CTC", value: "current_ctc", icon: <DollarSign size={13} className="text-gray-400" /> },
//                           { label: "Expected CTC", value: "expected_ctc", icon: <DollarSign size={13} className="text-gray-400" /> },
//                           { label: "Notice Period (Days)", value: "notice_period", icon: <Clock size={13} className="text-gray-400" /> },
//                         ].map(({ label, value, icon }) => (
//                           <div key={value} className="flex items-center py-3 border-b border-gray-100 last:border-0">
//                             <div className="flex items-center gap-2.5 w-[200px] shrink-0">
//                               {icon}
//                               <span className="text-sm text-gray-500">{label}</span>
//                             </div>
//                             <span className="text-sm text-gray-400 mr-3">:</span>
//                             {isEditing ? (
//                               <input
//                                 type="text"
//                                 value={(selectedCandidate as any)[value] || ""}
//                                 onChange={(e) =>
//                                   setSelectedCandidate((prev: any) => ({ ...prev, [value]: e.target.value }))
//                                 }
//                                 className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                               />
//                             ) : (
//                               <span className="text-sm font-medium text-gray-900">
//                                 {(selectedCandidate as any)[value] || "N/A"}
//                               </span>
//                             )}
//                           </div>
//                         ))}
//                       </div>

//                       {/* Screening Comments */}
//                       <div className="mt-5 pt-4 border-t border-gray-200">
//                         <div className="flex items-center gap-2 mb-2">
//                           <FileText size={13} className="text-gray-400" />
//                           <span className="text-sm text-gray-500">Screening Comments</span>
//                         </div>
//                         {isEditing ? (
//                           <textarea
//                             value={selectedCandidate.screening_comments || ""}
//                             onChange={(e) =>
//                               setSelectedCandidate((prev: any) => ({
//                                 ...prev,
//                                 screening_comments: e.target.value,
//                               }))
//                             }
//                             rows={3}
//                             className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-y"
//                           />
//                         ) : (
//                           <div className="text-sm text-gray-900 bg-gray-50 rounded-lg px-4 py-3 min-h-[40px]">
//                             {selectedCandidate.screening_comments || "No comments"}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {/* ═══ TAB 2: Position & Documents ═══ */}
//                   {detailTab === "position" && (
//                     <div className="p-6">
//                       <div className="flex items-center gap-2 mb-4">
//                         <Building size={15} className="text-gray-400" />
//                         <h3 className="text-sm font-semibold text-gray-700">Position Details</h3>
//                       </div>

//                       <div className="space-y-0 mb-6">
//                         {[
//                           { label: "Position Name", value: "position_name" },
//                           { label: "Client Name", value: "client_name" },
//                           { label: "Recruiter", value: "recruiter" },
//                           { label: "CTC Budget", value: "ctc_budget" },
//                           { label: "Position Status", value: "position_status" },
//                           { label: "Date of Submission", value: "date_of_submission" },
//                           { label: "Date Profile Shared", value: "date_profile_shared" },
//                           { label: "Interview Date/Time", value: "interview_date_time" },
//                           { label: "Client SPOC", value: "client_spoc" },
//                           { label: "Laksh SPOC", value: "laksh_spoc" },
//                         ].map(({ label, value }) => (
//                           <div key={value} className="flex items-center py-3 border-b border-gray-100 last:border-0">
//                             <div className="w-[200px] shrink-0">
//                               <span className="text-sm text-gray-500">{label}</span>
//                             </div>
//                             <span className="text-sm text-gray-400 mr-3">:</span>
//                             {isEditing ? (
//                               <input
//                                 type="text"
//                                 value={(selectedCandidate as any)[value] || ""}
//                                 onChange={(e) =>
//                                   setSelectedCandidate((prev: any) => ({ ...prev, [value]: e.target.value }))
//                                 }
//                                 className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                               />
//                             ) : (
//                               <span className="text-sm font-medium text-gray-900">
//                                 {(selectedCandidate as any)[value] || "N/A"}
//                               </span>
//                             )}
//                           </div>
//                         ))}

//                         {/* Candidate Status row */}
//                         <div className="flex items-center py-3 border-b border-gray-100">
//                           <div className="w-[200px] shrink-0">
//                             <span className="text-sm text-gray-500">Candidate Status</span>
//                           </div>
//                           <span className="text-sm text-gray-400 mr-3">:</span>
//                           {isEditing ? (
//                             <div className="flex-1">
//                               <Select
//                                 options={candidateStatusOptions}
//                                 isSearchable
//                                 placeholder="Select status…"
//                                 value={
//                                   candidateStatusOptions.find(
//                                     (opt) => opt.value === selectedCandidate.candidate_status
//                                   ) || null
//                                 }
//                                 onChange={(selected: { value: string; label: string } | null) =>
//                                   setSelectedCandidate((prev: any) => ({
//                                     ...prev,
//                                     candidate_status: selected?.value || "",
//                                   }))
//                                 }
//                                 styles={{
//                                   control: (base) => ({
//                                     ...base,
//                                     minHeight: "32px",
//                                     fontSize: "13px",
//                                     borderColor: "#e5e7eb",
//                                   }),
//                                   valueContainer: (base) => ({ ...base, padding: "0 8px" }),
//                                   indicatorsContainer: (base) => ({ ...base, height: "32px" }),
//                                 }}
//                               />
//                             </div>
//                           ) : (
//                             <span className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(selectedCandidate.candidate_status)}`}>
//                               {selectedCandidate.candidate_status || "N/A"}
//                             </span>
//                           )}
//                         </div>
//                       </div>

//                       {/* Documents Section */}
//                       <div className="border-t border-gray-200 pt-5">
//                         <div className="flex items-center justify-between mb-4">
//                           <div className="flex items-center gap-2">
//                             <FileText size={15} className="text-gray-400" />
//                             <h3 className="text-sm font-semibold text-gray-700">Documents</h3>
//                             {candidateDocuments.length > 0 && (
//                               <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
//                                 {candidateDocuments.length}
//                               </span>
//                             )}
//                           </div>
//                           <button
//                             onClick={() => {
//                               const candidateId = (selectedCandidate as any).candidate_id;
//                               if (candidateId) openDocumentModal(candidateId);
//                             }}
//                             className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-xs font-medium transition-colors"
//                           >
//                             <Plus size={13} />
//                             Upload
//                           </button>
//                         </div>

//                         <div className="rounded-xl border border-gray-200 overflow-hidden">
//                           {candidateDocuments && candidateDocuments.length > 0 ? (
//                             <div className="divide-y divide-gray-100 max-h-56 overflow-y-auto">
//                               {candidateDocuments.map((doc) => {
//                                 const IconComponent = getDocumentIcon(doc.type);
//                                 return (
//                                   <div
//                                     key={doc.id}
//                                     className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
//                                   >
//                                     <div className="flex items-center gap-3 min-w-0">
//                                       <div className="bg-teal-50 p-2 rounded-lg shrink-0">
//                                         <IconComponent size={14} className="text-teal-600" />
//                                       </div>
//                                       <div className="min-w-0">
//                                         <div className="text-sm font-medium text-gray-900 truncate">{doc.fileName}</div>
//                                         <div className="text-xs text-gray-500">
//                                           {doc.documentType} · {doc.size || "N/A"} · {new Date(doc.uploadedAt).toLocaleDateString()}
//                                         </div>
//                                       </div>
//                                     </div>
//                                     <div className="flex items-center gap-1 shrink-0 ml-3">
//                                       <a
//                                         href={doc.fileUrl}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-teal-600 hover:text-teal-800 p-1.5 rounded-lg hover:bg-teal-50 transition-colors"
//                                       >
//                                         <Download size={14} />
//                                       </a>
//                                       <button
//                                         onClick={() => handleDeleteDocument((selectedCandidate as any).candidate_id, doc.id)}
//                                         className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
//                                       >
//                                         <Trash2 size={14} />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           ) : (
//                             <div className="text-center py-10 bg-gray-50/50">
//                               <FileText size={28} className="mx-auto mb-2 text-gray-300" />
//                               <p className="text-sm text-gray-500">No documents uploaded</p>
//                               <button
//                                 onClick={() => openDocumentModal((selectedCandidate as any).candidate_id)}
//                                 className="mt-1.5 text-teal-600 hover:text-teal-800 text-xs font-medium"
//                               >
//                                 Upload your first document
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                         <p className="text-[11px] text-gray-400 mt-2">
//                           Supported: PDF, DOC, DOCX, JPG, JPEG, PNG
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ═══════ DOCUMENT UPLOAD MODAL ═══════ */}
//       {showDocumentModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[70]">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative">
//             <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
//               <h2 className="text-base font-bold text-gray-900">Upload Document</h2>
//               <button
//                 onClick={() => {
//                   setShowDocumentModal(false);
//                   setDocumentForm({ name: "", type: "Resume", file: null });
//                 }}
//                 className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Document Name *</label>
//                 <input
//                   type="text"
//                   required
//                   placeholder="e.g., Resume_JohnDoe_2025"
//                   value={documentForm.name}
//                   onChange={(e) =>
//                     setDocumentForm((prev) => ({ ...prev, name: e.target.value }))
//                   }
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Document Type</label>
//                 <FilterSelect
//                   ariaLabel="Document type"
//                   className="w-full"
//                   value={documentForm.type}
//                   onChange={(v) => setDocumentForm((prev) => ({ ...prev, type: v }))}
//                   options={DOCUMENT_TYPES.map((t) => ({ value: t, label: t }))}
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Upload Document *</label>
//                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:border-gray-300 transition-colors bg-gray-50/50">
//                   <div className="space-y-1 text-center">
//                     <Upload className="mx-auto h-10 w-10 text-gray-400" />
//                     <div className="flex text-xs text-gray-500">
//                       <label
//                         htmlFor="file-upload"
//                         className="relative cursor-pointer font-medium text-teal-600 hover:text-teal-500"
//                       >
//                         <span>Choose a file</span>
//                         <input
//                           id="file-upload"
//                           name="file-upload"
//                           type="file"
//                           className="sr-only"
//                           accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                           onChange={(e) => {
//                             const file = e.target.files?.[0];
//                             if (file) {
//                               setDocumentForm((prev) => ({
//                                 ...prev,
//                                 file: file,
//                                 name: prev.name || file.name.split(".")[0],
//                               }));
//                             }
//                           }}
//                         />
//                       </label>
//                       <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-[11px] text-gray-400">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
//                   </div>
//                 </div>
//                 {documentForm.file && (
//                   <div className="mt-2 flex items-center gap-2 text-xs text-gray-600 bg-teal-50 rounded-lg px-3 py-2">
//                     <FileText className="w-3.5 h-3.5 text-teal-600 shrink-0" />
//                     <span className="truncate">{documentForm.file.name}</span>
//                     <button
//                       onClick={() => setDocumentForm((prev) => ({ ...prev, file: null }))}
//                       className="text-red-500 hover:text-red-700 shrink-0 ml-auto"
//                     >
//                       <X className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowDocumentModal(false);
//                     setDocumentForm({ name: "", type: "Resume", file: null });
//                   }}
//                   className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleAddDocument}
//                   disabled={!documentForm.name.trim() || !documentForm.file}
//                   className="px-5 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
//                 >
//                   <Upload className="w-3.5 h-3.5" />
//                   Upload
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ═══════ COMMENT MODAL (mandatory comment on select / reject) ═══════ */}
//       {commentModalOpen && commentModalData && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
//             <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
//               <div className="min-w-0">
//                 <h2 className="text-base font-bold text-gray-900">
//                   {isRejectStatus(commentModalData.newStatus) ? "Confirm Rejection" : "Confirm Selection"}
//                 </h2>
//                 <p className="text-xs text-gray-500 mt-0.5 truncate">{commentModalData.candidateName}</p>
//               </div>
//               <button
//                 onClick={closeCommentModal}
//                 className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               <div className="flex items-center gap-2">
//                 <span className="text-xs text-gray-500">Status:</span>
//                 <span
//                   className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${
//                     isRejectStatus(commentModalData.newStatus)
//                       ? "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
//                       : "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
//                   }`}
//                 >
//                   {commentModalData.newStatus}
//                 </span>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">
//                   Comment <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   value={commentModalData.comment}
//                   onChange={(e) =>
//                     setCommentModalData((prev) => (prev ? { ...prev, comment: e.target.value } : prev))
//                   }
//                   placeholder={
//                     isRejectStatus(commentModalData.newStatus)
//                       ? "Reason for rejection is mandatory…"
//                       : "Add your selection comment…"
//                   }
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-y"
//                 />
//               </div>

//               <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={closeCommentModal}
//                   className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   disabled={!commentModalData.comment.trim()}
//                   onClick={async () => {
//                     try {
//                       await submissionService.update(commentModalData.submissionId, {
//                         submission: {
//                           status: commentModalData.newStatus,
//                           status_comment: commentModalData.comment.trim(),
//                         },
//                       });
//                       fetchSummary();
//                     } catch (err) {
//                       console.error("Failed to update status with comment", err);
//                     }
//                     closeCommentModal();
//                   }}
//                   className={`px-5 py-2 text-sm text-white rounded-lg transition-colors flex items-center gap-1.5 disabled:bg-gray-300 disabled:cursor-not-allowed ${
//                     isRejectStatus(commentModalData.newStatus)
//                       ? "bg-red-600 hover:bg-red-700"
//                       : "bg-emerald-600 hover:bg-emerald-700"
//                   }`}
//                 >
//                   <MessageSquare className="w-3.5 h-3.5" />
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SubmissionManagementSystem;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import FilterSelect from "../components/FilterSelect";
import {
  Search,
  Filter,
  FileText,
  Phone,
  Mail,
  Building,
  Clock,
  User,
  DollarSign,
  MapPin,
  X,
  ChevronDown,
  Upload,
  Download,
  Trash2,
  Plus,
  Loader,
  BriefcaseBusiness,
  MessageSquare,
} from "lucide-react";
import { submissionService } from "../services/submissionService";
import type { Submission, DetailedSubmission, SubmissionFilters, CandidateDocument } from "../services/submissionService";
import { applicantService } from "../services/applicantService";
import { positionService } from "../services/positionService";
import { clientService } from "../services/clientService";
import { candidateStatusOptions, cityOptions } from "../constants/dropdown";
import Select from "react-select";
import { slugify } from "../utils/slug";

/* ── Status history helper (localStorage-backed, shared with detail view) ── */
const pushStatusHistory = (candidateId: string | number, status: string) => {
  try {
    const hist = JSON.parse(localStorage.getItem(`statusHistory_${candidateId}`) || "[]");
    if (hist.length > 0 && hist[hist.length - 1].status === status) return;
    hist.push({ status, date: new Date().toISOString() });
    localStorage.setItem(`statusHistory_${candidateId}`, JSON.stringify(hist));
  } catch {}
};

const DOCUMENT_TYPES = [
  "Resume",
  "Pan Card",
  "Cover Letter",
  "Adhaar Card",
  "Offer Letter",
  "Resignation Letter",
  "Academic Document",
  "Reference Letter",
  "Other",
];

const EMPTY_FILTERS = {
  positionName: "",
  clientName: "",
  candidateName: "",
  location: "",
};

const SubmissionManagementSystem = () => {
  const navigate = useNavigate();

  // Document state
  const [candidateDocuments, setCandidateDocuments] = useState<CandidateDocument[]>([]);
  const [groupBy, setGroupBy] = useState<"position" | "client_name" | "candidate_name" | "status">("position");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [selectedCandidate, setSelectedCandidate] = useState<DetailedSubmission | null>(null);
  const [originalCandidate, setOriginalCandidate] = useState<DetailedSubmission | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [detailTab, setDetailTab] = useState<"personal" | "position">("personal");
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [currentCandidateId, setCurrentCandidateId] = useState<number | null>(null);
  const [documentForm, setDocumentForm] = useState({
    name: "",
    type: "Resume",
    file: null as File | null,
  });

  // Dropdown data for the filters
  const [positionNames, setPositionNames] = useState<string[]>([]);
  const [clientNames, setClientNames] = useState<string[]>([]);

  // API states
  const [groupedData, setGroupedData] = useState<Record<string, { submissions: Submission[], totalCount: number }>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Backend pagination metadata
  const [backendTotalGroups, setBackendTotalGroups] = useState(0);
  const [backendTotalPages, setBackendTotalPages] = useState(0);
  const [backendCurrentPage, setBackendCurrentPage] = useState(1);

  // Group-level pagination
  const [currentPage, setCurrentPage] = useState(1);
  const GROUPS_PER_PAGE = 10;

  // ─── Comment Modal State (for select/reject with mandatory comment) ───
  const COMMENT_REQUIRED_STATUSES = [
    "Final Select", "R1 select", "R2 select", "R3 Select",
    "Client Reject", "Internal Reject", "Profile Reject", "Reject",
    "R1 reject", "R2 reject", "R3 reject", "Offer Drop", "Dropout",
  ];
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [commentModalData, setCommentModalData] = useState<{
    submissionId: number;
    candidateName: string;
    newStatus: string;
    comment: string;
  } | null>(null);

  const isRejectStatus = (status: string) =>
    status.toLowerCase().includes("reject") || status === "Offer Drop" || status === "Dropout";

  const closeCommentModal = () => {
    setCommentModalOpen(false);
    setCommentModalData(null);
  };

  const fetchSummary = async (page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const apiFilters: SubmissionFilters = {
        position: filters.positionName || undefined,
        client_name: filters.clientName || undefined,
        candidate_name: filters.candidateName || undefined,
        location: filters.location || undefined,
        groupBy: groupBy,
        search: searchTerm || undefined,
      };

      const response = await submissionService.fetchSummary(apiFilters, page);

      if (response.status === 200) {
        setGroupedData(response.data.groups);
        setBackendTotalGroups(response.data.totalGroups || 0);
        setBackendTotalPages(response.data.totalPages || 0);
        setBackendCurrentPage(response.data.currentPage || page);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to fetch submissions");
      console.error("Error fetching summary:", err);
    } finally {
      setLoading(false);
    }
  };

  // Position and client lists for the filter dropdowns
  useEffect(() => {
    const unique = (list: string[]) =>
      Array.from(new Set(list.map((s) => s?.trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b));

    positionService
      .fetchAll(1, 2000)
      .then((res: any) => {
        if (res.status === 200) setPositionNames(unique(res.data.positions.map((p: any) => p.title)));
      })
      .catch((err: any) => console.error("Error fetching positions:", err));

    clientService
      .fetchAll()
      .then((res: any) => setClientNames(unique((res?.data || []).map((c: any) => c.client_name))))
      .catch((err: any) => console.error("Error fetching clients:", err));
  }, []);

  const listState = { groupBy, filters, searchTerm, currentPage };

const handleViewMore = (groupName: string) => {
  navigate(`/submission-management/${slugify(groupName)}`, {
    state: { ...listState, groupName },
  });
};

const handleCandidateClick = (submission: Submission, groupName: string) => {
  navigate(`/submission-management/${slugify(groupName)}/${submission.id}`, {
    state: { ...listState, groupName, fromGroupDetail: false },
  });
};

  const fetchCandidateDocuments = async (candidateId: string) => {
    try {
      const response = await applicantService.fetchDocuments(candidateId);
      if (response.status === 200) {
        setCandidateDocuments(response.data || []);
      }
    } catch (err: any) {
      console.error("Error fetching documents:", err);
    }
  };

  const handleSaveCandidate = async () => {
    if (!selectedCandidate) {
      console.error("❌ No selected candidate");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const submissionId = selectedCandidate.id?.toString();

      if (!submissionId) {
        throw new Error("Submission ID not found. Please refresh and try again.");
      }

      const applicantData = {
        name: selectedCandidate.candidate_name,
        email: selectedCandidate.email,
        phone: selectedCandidate.mobile_number,
        city: selectedCandidate.current_city,
        current_last_organisation: selectedCandidate.current_last_organization,
        total_experience_in_years: selectedCandidate.experience,
        current_ctc: selectedCandidate.current_ctc,
        expected_ctc: selectedCandidate.expected_ctc,
        notice_period_in_days: selectedCandidate.notice_period,
        special_comments: selectedCandidate.screening_comments,
      };

      const jobData = {
        position: selectedCandidate.position_name,
        ctc: selectedCandidate.ctc_budget,
        client_spoc: selectedCandidate.client_spoc,
      };

      const submissionData = {
        status: selectedCandidate.candidate_status,
        date_profile_shared_from_Applicants: selectedCandidate.date_profile_shared,
        candidate_status_update_date: selectedCandidate.interview_date_time,
      };

      const updateData = {
        applicant: applicantData,
        job: jobData,
        submission: submissionData,
      };

      const response = await submissionService.update(submissionId, updateData);

      if (response.status === 200) {
        setIsEditing(false);
        await fetchSummary(currentPage);
        alert("Candidate details updated successfully!");
        setSelectedCandidate(null);
      } else {
        throw new Error(response.message || "Failed to update candidate");
      }
    } catch (err: any) {
      console.error("❌ Error updating candidate:", err);
      const errorMessage = err.message || "Failed to update candidate details";
      setError(errorMessage);
      alert("❌ " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary(currentPage);
  }, [groupBy]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSummary(1);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, filters]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "New Submission": "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20",
      "Profile Shared": "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
      "R1 Scheduled": "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20",
      "R1 Completed": "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20",
      "R2 Scheduled": "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20",
      "R2 Completed": "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20",
      "R3 Scheduled": "bg-pink-50 text-pink-700 ring-1 ring-inset ring-pink-600/20",
      Selected: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
      Rejected: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
    };
    return colors[status] || "bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20";
  };

  const openDocumentModal = (candidateId: number) => {
    setCurrentCandidateId(candidateId);
    setShowDocumentModal(true);
  };

  const handleAddDocument = async () => {
    if (!documentForm.name.trim() || !documentForm.file || !selectedCandidate) {
      alert("Please provide a document name and select a file.");
      return;
    }

    try {
      setLoading(true);

      const response = await applicantService.uploadDocument(
        selectedCandidate.candidate_id,
        documentForm.type,
        documentForm.file
      );

      if (response.status === 200) {
        await fetchCandidateDocuments(selectedCandidate.candidate_id);
        setDocumentForm({ name: "", type: "Resume", file: null });
        setShowDocumentModal(false);
        alert("Document uploaded successfully!");
      } else {
        console.error("Upload failed:", response.data);
        alert(response.data?.message || "Failed to upload document");
      }
    } catch (err: any) {
      console.error("Error uploading document:", err);
      alert(err?.response?.data?.message || "Failed to upload document");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDocument = async (candidateId: any, documentId: any) => {
    if (!documentId) {
      alert("Document ID is required");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this document?")) {
      return;
    }

    try {
      await applicantService.deleteDocument(candidateId, documentId);
      await fetchCandidateDocuments(candidateId);

      if (selectedCandidate?.candidate_id === candidateId) {
        setSelectedCandidate((prev: any) => ({
          ...prev,
          documents: prev.documents?.filter((doc: any) => doc.id !== documentId) || [],
        }));
      }

      alert("Document deleted successfully!");
    } catch (error: any) {
      console.error("Failed to delete document:", error);
      alert(
        error?.response?.data?.message ||
        "Failed to delete document. Please try again."
      );
    }
  };

  const getDocumentIcon = (type: string) => {
    return FileText;
  };

  const totalSubmissions = Object.values(groupedData).reduce(
    (sum, group) => sum + group.totalCount,
    0
  );

  const groupEntries = Object.entries(groupedData);
  const totalPages = backendTotalPages || 1;
  const paginatedGroups = groupEntries;
  const hasActiveFilters = Object.values(filters).some(Boolean);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchSummary(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 md:ml-16">
        <div className="max-w-7xl mx-auto">
          {/* Loading Overlay */}
          {loading && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 shadow-xl flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-teal-600"></div>
                <p className="text-sm text-gray-600 font-medium">Loading…</p>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-red-800 flex-1">{error}</p>
              <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 p-1">
                <X size={14} />
              </button>
            </div>
          )}

          {/* Header Bar */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900">Submission Management</h2>

              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-10 pl-9 pr-9 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Search candidates, positions, clients…"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      aria-label="Clear search"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 grid place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Group By + Filters */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Group by</label>
                  <FilterSelect
                    ariaLabel="Group by"
                    className="w-40"
                    value={groupBy}
                    onChange={(v) => setGroupBy(v as typeof groupBy)}
                    options={[
                      { value: "position", label: "Position" },
                      { value: "client_name", label: "Client" },
                      { value: "candidate_name", label: "Candidate" },
                      { value: "status", label: "Status" },
                    ]}
                  />
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`h-10 flex items-center gap-1.5 px-3 border rounded-lg text-sm transition-colors ${
                    showFilters ? "border-teal-500 bg-teal-50 text-teal-700" : "border-gray-300 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <Filter size={14} />
                  Filters
                  {hasActiveFilters && (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-teal-600 px-1.5 text-[11px] font-semibold text-white">
                      {Object.values(filters).filter(Boolean).length}
                    </span>
                  )}
                  <ChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Position</label>
                    <FilterSelect
                      searchable
                      searchPlaceholder="Search positions..."
                      ariaLabel="Filter by position"
                      className="w-full"
                      value={filters.positionName}
                      onChange={(v) => setFilters({ ...filters, positionName: v })}
                      options={[
                        { value: "", label: "All positions" },
                        ...positionNames.map((p) => ({ value: p, label: p })),
                      ]}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Client</label>
                    <FilterSelect
                      searchable
                      searchPlaceholder="Search clients..."
                      ariaLabel="Filter by client"
                      className="w-full"
                      value={filters.clientName}
                      onChange={(v) => setFilters({ ...filters, clientName: v })}
                      options={[
                        { value: "", label: "All clients" },
                        ...clientNames.map((c) => ({ value: c, label: c })),
                      ]}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Candidate</label>
                    <input
                      type="text"
                      value={filters.candidateName}
                      onChange={(e) => setFilters({ ...filters, candidateName: e.target.value })}
                      placeholder="Type a name..."
                      className="w-full h-10 px-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
                    <FilterSelect
                      searchable
                      searchPlaceholder="Search cities..."
                      ariaLabel="Filter by location"
                      className="w-full"
                      value={filters.location}
                      onChange={(v) => setFilters({ ...filters, location: v })}
                      options={[
                        { value: "", label: "All locations" },
                        ...cityOptions.map((c) => ({ value: c.label, label: c.label })),
                      ]}
                    />
                  </div>
                </div>

                {hasActiveFilters && (
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => setFilters(EMPTY_FILTERS)}
                      className="inline-flex h-8 items-center gap-1.5 px-3 text-xs font-medium text-teal-700 rounded-lg hover:bg-teal-50"
                    >
                      <X size={14} />
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-3 text-xs text-gray-500">
            {totalSubmissions} submissions across {backendTotalGroups} groups
            {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
          </div>

          {/* ═══════ GROUPED SUBMISSION CARDS ═══════ */}
          <div className="space-y-5">
            {paginatedGroups.map(([groupName, groupInfo]) => {
              const visibleSubmissions = groupInfo.submissions.slice(0, 2);
              const hasMore = groupInfo.totalCount > 2;

              return (
                <div key={groupName} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Group Header */}
                  <div className="flex items-center justify-between bg-gradient-to-r from-slate-50 to-teal-50/60 px-5 py-3.5 border-b border-gray-200">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="bg-teal-100 text-teal-600 p-1.5 rounded-lg shrink-0">
                        <Building size={18} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-sm font-semibold text-gray-900 capitalize truncate">{groupName}</h2>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700 shrink-0">
                            {groupInfo.totalCount}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          Client: {visibleSubmissions[0]?.client_name || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ─── Submission rows as cards (no horizontal scroll) ─── */}
                  <div className="divide-y divide-gray-100">
                    {visibleSubmissions.map((submission) => (
                      <div
  key={submission.id}
  className="px-5 py-3.5 hover:bg-gray-50/80 cursor-pointer transition-colors"
  onClick={() => handleCandidateClick(submission, groupName)}
>
                        {/* Row 1: Name + Status + Resume */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-semibold text-gray-900 truncate">{submission.candidate_name}</div>
                            <div className="text-xs text-gray-600 font-semibold mt-0.5 truncate">
                              {submission.position} · {submission.location || "N/A"}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-2">
                              <div className="w-[210px]">
                                <Select
                                  options={candidateStatusOptions}
                                  isSearchable
                                  placeholder={submission.status || "Status"}
                                  value={
                                    candidateStatusOptions.find((opt) => opt.value === submission.status) || null
                                  }
                                  onChange={async (selected) => {
                                    const newStatus = selected?.value || "";

                                    // Statuses that require a mandatory comment open the comment modal first
                                    if (COMMENT_REQUIRED_STATUSES.includes(newStatus)) {
                                      setCommentModalData({
                                        submissionId: submission.id,
                                        candidateName: submission.candidate_name,
                                        newStatus,
                                        comment: "",
                                      });
                                      setCommentModalOpen(true);
                                      return;
                                    }

                                    submission.status = newStatus;
                                    if (newStatus) pushStatusHistory(submission.id, newStatus);
                                    try {
                                      await submissionService.update(submission.id, {
                                        submission: { status: newStatus },
                                      });
                                      fetchSummary();
                                    } catch (err) {
                                      console.error("Failed to update status", err);
                                    }
                                  }}
                                  styles={{
                                    control: (base) => ({
                                      ...base,
                                      minHeight: "30px",
                                      height: "30px",
                                      fontSize: "12px",
                                      borderColor: "#e5e7eb",
                                      boxShadow: "none",
                                      "&:hover": { borderColor: "#d1d5db" },
                                    }),
                                    valueContainer: (base) => ({ ...base, padding: "0 6px" }),
                                    indicatorsContainer: (base) => ({ ...base, height: "30px" }),
                                    option: (base, { isSelected }) => ({
                                      ...base,
                                      fontSize: "12px",
                                      padding: "6px 10px",
                                      backgroundColor: isSelected ? "#ccfbf1" : "#fff",
                                      color: "#134e4a",
                                      "&:hover": { backgroundColor: "#f0fdfa" },
                                    }),
                                    singleValue: (base) => ({ ...base, color: "#134e4a", fontSize: "12px" }),
                                  }}
                                  menuPortalTarget={document.body}
                                  menuPosition="fixed"
                                />
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(submission.resume || "N/A", "_blank");
                                }}
                                className="text-teal-600 hover:text-teal-800 text-xs font-medium px-2 py-1 rounded hover:bg-teal-50 transition-colors whitespace-nowrap"
                              >
                                Resume ↗
                              </button>

                              <button
  onClick={(e) => {
    e.stopPropagation();
    handleCandidateClick(submission, groupName);
  }}
  className="text-teal-600 hover:text-teal-800 text-xs font-medium px-2.5 py-1 rounded-lg border border-teal-300 hover:bg-teal-50 transition-colors whitespace-nowrap"
>
  View Tracker
</button>
                            </div>

                            {/* Status comment (from select/reject confirmation) */}
                            {(submission as any).status_comment && (
                              <div className="max-w-[360px] bg-green-50 text-green-800 text-xs rounded-lg px-3 py-2 text-left">
                                {(submission as any).status_comment}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Row 2: Key details as inline chips */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <User size={12} className="text-gray-400" />
                            {submission.recruiter || "N/A"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} className="text-gray-400" />
                            {submission.notice_period ? `${submission.notice_period}d notice` : "N/A"}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign size={12} className="text-gray-400" />
                            CTC: {submission.current_ctc ? `${submission.current_ctc}L` : "N/A"}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign size={12} className="text-gray-400" />
                            Budget: {submission.ctc_budget ? `${submission.ctc_budget}L` : "N/A"}
                          </span>
                          {submission.submitted_on && (
                            <span className="text-gray-400">
                              Submitted {new Date(submission.submitted_on).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* View More */}
                  {hasMore && (
                    <div className="flex justify-center py-2.5 bg-gray-50/60 border-t border-gray-100">
                      <button
  onClick={() => handleViewMore(groupName)}
  className="flex items-center gap-1.5 text-teal-600 hover:text-teal-800 text-xs font-medium transition-colors"
>
                        <ChevronDown size={13} />
                        {groupInfo.totalCount - 2} more
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-5 flex items-center justify-between bg-white rounded-xl shadow-sm p-3 border border-gray-200">
              <div className="text-xs text-gray-500">
                Page {currentPage} of {totalPages} · {backendTotalGroups} groups
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const showPage =
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1);

                    const showEllipsis =
                      (page === currentPage - 2 && currentPage > 3) ||
                      (page === currentPage + 2 && currentPage < totalPages - 2);

                    if (showEllipsis) {
                      return <span key={page} className="px-1.5 text-gray-400 text-xs">…</span>;
                    }

                    if (!showPage) return null;

                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 text-xs rounded-lg transition-colors ${
                          currentPage === page
                            ? "bg-teal-600 text-white font-medium"
                            : "border border-gray-200 hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {Object.keys(groupedData).length === 0 && !loading && (
            <div className="text-center py-16">
              <FileText size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No submissions found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}

          {/* ═══════ CANDIDATE DETAIL MODAL ═══════ */}
          {selectedCandidate && (
            <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 overflow-y-auto p-4 pt-[4vh]">
              <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl my-4 border border-gray-200/60">

                {/* ── Top: Close + Edit bar ── */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
                  <span className="text-xs text-gray-400">Candidate Detail</span>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            if (originalCandidate) {
                              setSelectedCandidate({ ...originalCandidate });
                            }
                          }}
                          disabled={loading}
                          className="px-3 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 disabled:opacity-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveCandidate}
                          disabled={loading}
                          className="bg-teal-600 text-white px-3 py-1 text-xs rounded-lg hover:bg-teal-700 disabled:opacity-50 flex items-center gap-1.5 transition-colors"
                        >
                          {loading ? (
                            <>
                              <Loader size={12} className="animate-spin" />
                              Saving…
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-teal-600 hover:text-teal-700 text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-teal-50 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => { setSelectedCandidate(null); setDetailTab("personal"); setIsEditing(false); }}
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* ── Profile Card Header ── */}
                <div className="px-6 py-5 border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                      <BriefcaseBusiness size={20} className="text-gray-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg font-bold text-gray-900 leading-tight">
                        {selectedCandidate.candidate_name}
                      </h2>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-gray-500">
                        {selectedCandidate.candidate_id && (
                          <span className="font-medium text-gray-700">ID: #{selectedCandidate.candidate_id}</span>
                        )}
                        {selectedCandidate.email && (
                          <a href={`mailto:${selectedCandidate.email}`} className="text-teal-600 hover:text-teal-700 hover:underline">
                            {selectedCandidate.email}
                          </a>
                        )}
                        {selectedCandidate.mobile_number && (
                          <span className="flex items-center gap-1">
                            <Phone size={11} />
                            {selectedCandidate.mobile_number}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Quick Status Strip ── */}
                <div className="mx-6 grid grid-cols-3 overflow-hidden rounded-xl border border-gray-200 bg-white">
                  <div className="px-5 py-3">
                    <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">Position</div>
                    <div className="text-xs font-semibold flex justify-center text-gray-900 truncate">
                      {selectedCandidate.position_name || "N/A"}
                    </div>
                  </div>

                  <div className="border-l border-gray-100 px-5 py-3">
                    <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">Status</div>
                    <span
                      className={`flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(
                        selectedCandidate.candidate_status
                      )}`}
                    >
                      <span className="h-2 w-2 flex-shrink-0 rounded-full bg-current" />
                      {selectedCandidate.candidate_status || "N/A"}
                    </span>
                  </div>

                  <div className="border-l border-gray-100 px-5 py-3">
                    <div className="mb-1 text-sm font-normal flex justify-center text-gray-500">Submitted</div>
                    <div className="text-xs font-semibold flex justify-center text-gray-900">
                      {selectedCandidate.date_of_submission
                        ? new Date(selectedCandidate.date_of_submission).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </div>
                  </div>
                </div>

                {/* ── Tab Switcher ── */}
                <div className="flex justify-center px-6 py-6">
                  <div className="flex w-full max-w-md rounded-xl bg-gray-100 p-1.5">
                    {[
                      { key: "personal" as const, label: "Personal Information" },
                      { key: "position" as const, label: "Position & Documents" },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setDetailTab(tab.key)}
                        className={`flex-1 rounded-lg px-5 py-3 text-sm font-medium transition-all duration-200 outline-none focus:outline-none focus:ring-0 ${
                          detailTab === tab.key
                            ? "bg-white text-gray-800 shadow-sm"
                            : "bg-transparent text-gray-500 hover:bg-transparent hover:text-gray-700"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Tab Content ── */}
                <div className="max-h-[55vh] overflow-y-auto">

                  {/* ═══ TAB 1: Personal Information ═══ */}
                  {detailTab === "personal" && (
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <User size={15} className="text-gray-400" />
                        <h3 className="text-sm font-semibold text-gray-700">Applicant Information</h3>
                      </div>

                      <div className="space-y-0">
                        {[
                          { label: "Candidate Name", value: "candidate_name", icon: <User size={13} className="text-gray-400" /> },
                          { label: "Email Address", value: "email", icon: <Mail size={13} className="text-gray-400" /> },
                          { label: "Mobile Number", value: "mobile_number", icon: <Phone size={13} className="text-gray-400" /> },
                          { label: "Current Organization", value: "current_last_organization", icon: <Building size={13} className="text-gray-400" /> },
                          { label: "Experience (Years)", value: "experience", icon: <Clock size={13} className="text-gray-400" /> },
                          { label: "Current City", value: "current_city", icon: <MapPin size={13} className="text-gray-400" /> },
                          { label: "Current CTC", value: "current_ctc", icon: <DollarSign size={13} className="text-gray-400" /> },
                          { label: "Expected CTC", value: "expected_ctc", icon: <DollarSign size={13} className="text-gray-400" /> },
                          { label: "Notice Period (Days)", value: "notice_period", icon: <Clock size={13} className="text-gray-400" /> },
                        ].map(({ label, value, icon }) => (
                          <div key={value} className="flex items-center py-3 border-b border-gray-100 last:border-0">
                            <div className="flex items-center gap-2.5 w-[200px] shrink-0">
                              {icon}
                              <span className="text-sm text-gray-500">{label}</span>
                            </div>
                            <span className="text-sm text-gray-400 mr-3">:</span>
                            {isEditing ? (
                              <input
                                type="text"
                                value={(selectedCandidate as any)[value] || ""}
                                onChange={(e) =>
                                  setSelectedCandidate((prev: any) => ({ ...prev, [value]: e.target.value }))
                                }
                                className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              />
                            ) : (
                              <span className="text-sm font-medium text-gray-900">
                                {(selectedCandidate as any)[value] || "N/A"}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Screening Comments */}
                      <div className="mt-5 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText size={13} className="text-gray-400" />
                          <span className="text-sm text-gray-500">Screening Comments</span>
                        </div>
                        {isEditing ? (
                          <textarea
                            value={selectedCandidate.screening_comments || ""}
                            onChange={(e) =>
                              setSelectedCandidate((prev: any) => ({
                                ...prev,
                                screening_comments: e.target.value,
                              }))
                            }
                            rows={3}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-y"
                          />
                        ) : (
                          <div className="text-sm text-gray-900 bg-gray-50 rounded-lg px-4 py-3 min-h-[40px]">
                            {selectedCandidate.screening_comments || "No comments"}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ═══ TAB 2: Position & Documents ═══ */}
                  {detailTab === "position" && (
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Building size={15} className="text-gray-400" />
                        <h3 className="text-sm font-semibold text-gray-700">Position Details</h3>
                      </div>

                      <div className="space-y-0 mb-6">
                        {[
                          { label: "Position Name", value: "position_name" },
                          { label: "Client Name", value: "client_name" },
                          { label: "Recruiter", value: "recruiter" },
                          { label: "CTC Budget", value: "ctc_budget" },
                          { label: "Position Status", value: "position_status" },
                          { label: "Date of Submission", value: "date_of_submission" },
                          { label: "Date Profile Shared", value: "date_profile_shared" },
                          { label: "Interview Date/Time", value: "interview_date_time" },
                          { label: "Client SPOC", value: "client_spoc" },
                          { label: "Laksh SPOC", value: "laksh_spoc" },
                        ].map(({ label, value }) => (
                          <div key={value} className="flex items-center py-3 border-b border-gray-100 last:border-0">
                            <div className="w-[200px] shrink-0">
                              <span className="text-sm text-gray-500">{label}</span>
                            </div>
                            <span className="text-sm text-gray-400 mr-3">:</span>
                            {isEditing ? (
                              <input
                                type="text"
                                value={(selectedCandidate as any)[value] || ""}
                                onChange={(e) =>
                                  setSelectedCandidate((prev: any) => ({ ...prev, [value]: e.target.value }))
                                }
                                className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              />
                            ) : (
                              <span className="text-sm font-medium text-gray-900">
                                {(selectedCandidate as any)[value] || "N/A"}
                              </span>
                            )}
                          </div>
                        ))}

                        {/* Candidate Status row */}
                        <div className="flex items-center py-3 border-b border-gray-100">
                          <div className="w-[200px] shrink-0">
                            <span className="text-sm text-gray-500">Candidate Status</span>
                          </div>
                          <span className="text-sm text-gray-400 mr-3">:</span>
                          {isEditing ? (
                            <div className="flex-1">
                              <Select
                                options={candidateStatusOptions}
                                isSearchable
                                placeholder="Select status…"
                                value={
                                  candidateStatusOptions.find(
                                    (opt) => opt.value === selectedCandidate.candidate_status
                                  ) || null
                                }
                                onChange={(selected: { value: string; label: string } | null) => {
                                  const newStatus = selected?.value || "";
                                  setSelectedCandidate((prev: any) => ({
                                    ...prev,
                                    candidate_status: newStatus,
                                  }));
                                  if (newStatus && selectedCandidate?.id) pushStatusHistory(selectedCandidate.id, newStatus);
                                }}
                                styles={{
                                  control: (base) => ({
                                    ...base,
                                    minHeight: "32px",
                                    fontSize: "13px",
                                    borderColor: "#e5e7eb",
                                  }),
                                  valueContainer: (base) => ({ ...base, padding: "0 8px" }),
                                  indicatorsContainer: (base) => ({ ...base, height: "32px" }),
                                }}
                              />
                            </div>
                          ) : (
                            <span className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(selectedCandidate.candidate_status)}`}>
                              {selectedCandidate.candidate_status || "N/A"}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Documents Section */}
                      <div className="border-t border-gray-200 pt-5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <FileText size={15} className="text-gray-400" />
                            <h3 className="text-sm font-semibold text-gray-700">Documents</h3>
                            {candidateDocuments.length > 0 && (
                              <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                                {candidateDocuments.length}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              const candidateId = (selectedCandidate as any).candidate_id;
                              if (candidateId) openDocumentModal(candidateId);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-xs font-medium transition-colors"
                          >
                            <Plus size={13} />
                            Upload
                          </button>
                        </div>

                        <div className="rounded-xl border border-gray-200 overflow-hidden">
                          {candidateDocuments && candidateDocuments.length > 0 ? (
                            <div className="divide-y divide-gray-100 max-h-56 overflow-y-auto">
                              {candidateDocuments.map((doc) => {
                                const IconComponent = getDocumentIcon(doc.type);
                                return (
                                  <div
                                    key={doc.id}
                                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                                  >
                                    <div className="flex items-center gap-3 min-w-0">
                                      <div className="bg-teal-50 p-2 rounded-lg shrink-0">
                                        <IconComponent size={14} className="text-teal-600" />
                                      </div>
                                      <div className="min-w-0">
                                        <div className="text-sm font-medium text-gray-900 truncate">{doc.fileName}</div>
                                        <div className="text-xs text-gray-500">
                                          {doc.documentType} · {doc.size || "N/A"} · {new Date(doc.uploadedAt).toLocaleDateString()}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0 ml-3">
                                      <a
                                        href={doc.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-teal-600 hover:text-teal-800 p-1.5 rounded-lg hover:bg-teal-50 transition-colors"
                                      >
                                        <Download size={14} />
                                      </a>
                                      <button
                                        onClick={() => handleDeleteDocument((selectedCandidate as any).candidate_id, doc.id)}
                                        className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="text-center py-10 bg-gray-50/50">
                              <FileText size={28} className="mx-auto mb-2 text-gray-300" />
                              <p className="text-sm text-gray-500">No documents uploaded</p>
                              <button
                                onClick={() => openDocumentModal((selectedCandidate as any).candidate_id)}
                                className="mt-1.5 text-teal-600 hover:text-teal-800 text-xs font-medium"
                              >
                                Upload your first document
                              </button>
                            </div>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-400 mt-2">
                          Supported: PDF, DOC, DOCX, JPG, JPEG, PNG
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══════ DOCUMENT UPLOAD MODAL ═══════ */}
      {showDocumentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[70]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Upload Document</h2>
              <button
                onClick={() => {
                  setShowDocumentModal(false);
                  setDocumentForm({ name: "", type: "Resume", file: null });
                }}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Document Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Resume_JohnDoe_2025"
                  value={documentForm.name}
                  onChange={(e) =>
                    setDocumentForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Document Type</label>
                <FilterSelect
                  ariaLabel="Document type"
                  className="w-full"
                  value={documentForm.type}
                  onChange={(v) => setDocumentForm((prev) => ({ ...prev, type: v }))}
                  options={DOCUMENT_TYPES.map((t) => ({ value: t, label: t }))}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Upload Document *</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:border-gray-300 transition-colors bg-gray-50/50">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-10 w-10 text-gray-400" />
                    <div className="flex text-xs text-gray-500">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer font-medium text-teal-600 hover:text-teal-500"
                      >
                        <span>Choose a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setDocumentForm((prev) => ({
                                ...prev,
                                file: file,
                                name: prev.name || file.name.split(".")[0],
                              }));
                            }
                          }}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-[11px] text-gray-400">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
                  </div>
                </div>
                {documentForm.file && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-600 bg-teal-50 rounded-lg px-3 py-2">
                    <FileText className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">{documentForm.file.name}</span>
                    <button
                      onClick={() => setDocumentForm((prev) => ({ ...prev, file: null }))}
                      className="text-red-500 hover:text-red-700 shrink-0 ml-auto"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowDocumentModal(false);
                    setDocumentForm({ name: "", type: "Resume", file: null });
                  }}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddDocument}
                  disabled={!documentForm.name.trim() || !documentForm.file}
                  className="px-5 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════ COMMENT MODAL (mandatory comment on select / reject) ═══════ */}
      {commentModalOpen && commentModalData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <div className="min-w-0">
                <h2 className="text-base font-bold text-gray-900">
                  {isRejectStatus(commentModalData.newStatus) ? "Confirm Rejection" : "Confirm Selection"}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{commentModalData.candidateName}</p>
              </div>
              <button
                onClick={closeCommentModal}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Status:</span>
                <span
                  className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                    isRejectStatus(commentModalData.newStatus)
                      ? "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
                      : "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
                  }`}
                >
                  {commentModalData.newStatus}
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={commentModalData.comment}
                  onChange={(e) =>
                    setCommentModalData((prev) => (prev ? { ...prev, comment: e.target.value } : prev))
                  }
                  placeholder={
                    isRejectStatus(commentModalData.newStatus)
                      ? "Reason for rejection is mandatory…"
                      : "Add your selection comment…"
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-y"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeCommentModal}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!commentModalData.comment.trim()}
                  onClick={async () => {
                    try {
                      if (commentModalData.newStatus) pushStatusHistory(commentModalData.submissionId, commentModalData.newStatus);
                      await submissionService.update(commentModalData.submissionId, {
                        submission: {
                          status: commentModalData.newStatus,
                          status_comment: commentModalData.comment.trim(),
                        },
                      });
                      fetchSummary();
                    } catch (err) {
                      console.error("Failed to update status with comment", err);
                    }
                    closeCommentModal();
                  }}
                  className={`px-5 py-2 text-sm text-white rounded-lg transition-colors flex items-center gap-1.5 disabled:bg-gray-300 disabled:cursor-not-allowed ${
                    isRejectStatus(commentModalData.newStatus)
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubmissionManagementSystem;