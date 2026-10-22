// import { useState, useEffect, Fragment } from "react";
// import type { ReactNode } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import {
//   ArrowLeft,
//   Briefcase,
//   Building2,
//   FileText,
//   FileImage,
//   Phone,
//   Mail,
//   MapPin,
//   X,
//   Loader2,
//   Upload,
//   Download,
//   Trash2,
//   Plus,
//   Pencil,
//   Check,
//   Copy,
//   AlertTriangle,
// } from "lucide-react";
// import { submissionService } from "../services/submissionService";
// import { applicantService } from "../services/applicantService";
// import { candidateStatusOptions } from "../constants/dropdown";
// import Select from "react-select";
// import type { DetailedSubmission, CandidateDocument } from "../services/submissionService";

// interface DetailState {
//   fromGroupDetail?: boolean;
//   groupName?: string;
//   groupBy?: "position" | "client_name" | "candidate_name" | "status";
//   positionName?: string;
//   clientName?: string;
//   candidateName?: string;
//   status?: string;
//   filters?: Record<string, string>;
//   searchTerm?: string;
//   currentPage?: number;
// }

// /* ───────────────────────── helpers (outside component so inputs keep focus) ───────────────────────── */

// const inputClass =
//   "w-full h-9 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10";

// const iconButtonClass =
//   "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500";

// /** Treat placeholder strings coming from the API ("N/A", "-", …) as empty. */
// const isBlank = (value: unknown) =>
//   value === null ||
//   value === undefined ||
//   ["", "n/a", "na", "-", "null", "undefined"].includes(String(value).trim().toLowerCase());

// const formatDate = (value?: string) => {
//   if (!value) return "";
//   const d = new Date(value);
//   if (isNaN(d.getTime())) return value;
//   return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// };

// const formatDateTime = (value?: string) => {
//   if (!value) return "";
//   const d = new Date(value);
//   if (isNaN(d.getTime())) return value;
//   return d.toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   });
// };

// /** Display-only: 2600000 → ₹26 LPA, 26 → ₹26 LPA. Raw value is untouched in state. */
// const formatCtc = (value: unknown) => {
//   const raw = String(value).replace(/[,₹\s]/g, "");
//   const n = Number(raw);
//   if (!raw || isNaN(n)) return String(value);
//   const lakhs = n >= 1000 ? n / 100000 : n;
//   return `₹${lakhs.toLocaleString("en-IN", { maximumFractionDigits: 2 })} LPA`;
// };

// /** Display-only: +919970581173 → +91 99705 81173 */
// const formatPhone = (value: string) => {
//   const digits = value.replace(/\D/g, "");
//   if (digits.length === 12 && digits.startsWith("91")) return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
//   if (digits.length === 10) return `${digits.slice(0, 5)} ${digits.slice(5)}`;
//   return value;
// };

// const getInitials = (name?: string) =>
//   (name || "?")
//     .trim()
//     .split(/\s+/)
//     .slice(0, 2)
//     .map((p) => p[0]?.toUpperCase())
//     .join("");

// const statusStyle = (status: string) => {
//   const s = (status || "").toLowerCase();
//   if (s.includes("reject") || s.includes("drop")) return "bg-rose-50 text-rose-700 ring-rose-200";
//   if (s.includes("select") || s.includes("offer") || s.includes("join")) return "bg-emerald-50 text-emerald-700 ring-emerald-200";
//   if (s.includes("schedul") || s.includes("r1") || s.includes("r2") || s.includes("r3"))
//     return "bg-violet-50 text-violet-700 ring-violet-200";
//   if (s.includes("shared") || s.includes("hold")) return "bg-amber-50 text-amber-700 ring-amber-200";
//   return "bg-blue-50 text-blue-700 ring-blue-200";
// };

// const fileStyle = (name?: string) => {
//   const ext = (name || "").split("?")[0].split(".").pop()?.toLowerCase();
//   if (ext === "pdf") return { Icon: FileText, cls: "bg-rose-50 text-rose-600", ext: "PDF" };
//   if (ext === "doc" || ext === "docx") return { Icon: FileText, cls: "bg-blue-50 text-blue-600", ext: "DOC" };
//   if (["jpg", "jpeg", "png"].includes(ext || "")) return { Icon: FileImage, cls: "bg-emerald-50 text-emerald-600", ext: "IMG" };
//   return { Icon: FileText, cls: "bg-slate-100 text-slate-500", ext: "FILE" };
// };

// const Empty = () => <span className="text-sm font-normal text-slate-400">Not added</span>;

// const StatusBadge = ({ status }: { status: string }) => (
//   <span
//     className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyle(
//       status
//     )}`}
//   >
//     <span className="h-1.5 w-1.5 rounded-full bg-current" />
//     {status}
//   </span>
// );

// /** Label + value (or input in edit mode). Values wrap instead of truncating. */
// const Field = ({
//   label,
//   value,
//   display,
//   editing,
//   onChange,
//   type = "text",
//   className = "",
// }: {
//   label: string;
//   value: any;
//   display?: ReactNode;
//   editing: boolean;
//   onChange: (v: string) => void;
//   type?: string;
//   className?: string;
// }) => (
//   <div className={`min-w-0 ${className}`}>
//     <dt className="text-xs font-medium text-slate-500">{label}</dt>
//     <dd className="mt-1">
//       {editing ? (
//         <input type={type} value={value || ""} onChange={(e) => onChange(e.target.value)} className={inputClass} />
//       ) : isBlank(value) ? (
//         <Empty />
//       ) : (
//         <span className="block break-words text-sm font-medium text-slate-900">{display ?? value}</span>
//       )}
//     </dd>
//   </div>
// );

// /** Card shell with a header row. Divs (not h2) so global heading styles can't leak in. */
// const Panel = ({
//   title,
//   action,
//   children,
//   className = "",
// }: {
//   title: ReactNode;
//   action?: ReactNode;
//   children: ReactNode;
//   className?: string;
// }) => (
//   <section className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>
//     <div className="flex min-h-[48px] items-center justify-between gap-3 border-b border-slate-100 px-4 py-2.5">
//       <div className="text-sm font-semibold text-slate-900">{title}</div>
//       {action}
//     </div>
//     <div className="px-4 py-4">{children}</div>
//   </section>
// );

// type FieldDef = { key: string; label: string; wide?: boolean; format?: (v: any) => ReactNode };

// /* ───────────────────────── page ───────────────────────── */

// const SubmissionGroupDetailView = () => {
//   const { candidateId } = useParams<{ candidateId: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const state = location.state as DetailState | null;

//   const [selectedCandidate, setSelectedCandidate] = useState<DetailedSubmission | null>(null);
//   const [originalCandidate, setOriginalCandidate] = useState<DetailedSubmission | null>(null);
//   const [candidateDocuments, setCandidateDocuments] = useState<CandidateDocument[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [copied, setCopied] = useState<string | null>(null);
//   const [showDocumentModal, setShowDocumentModal] = useState(false);
//   const [documentForm, setDocumentForm] = useState({
//     name: "",
//     type: "Resume",
//     file: null as File | null,
//   });

//   /* ── data (unchanged logic) ── */
//   useEffect(() => {
//     const fetchCandidateDetails = async () => {
//       if (!candidateId) return;
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await submissionService.fetchById(candidateId);
//         if (response.status === 200) {
//           const detailedCandidate = { ...response.data, id: parseInt(candidateId) };
//           setSelectedCandidate(detailedCandidate);
//           setOriginalCandidate(detailedCandidate);
//           if (response.data.candidate_id) {
//             await fetchCandidateDocuments(response.data.candidate_id);
//           }
//         }
//       } catch (err: any) {
//         console.error("Error fetching candidate details:", err);
//         setError(err?.message || "Failed to load candidate details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCandidateDetails();
//   }, [candidateId]);

//   const fetchCandidateDocuments = async (candidateId: string) => {
//     try {
//       const response = await applicantService.fetchDocuments(candidateId);
//       if (response.status === 200) setCandidateDocuments(response.data || []);
//     } catch (err: any) {
//       console.error("Error fetching documents:", err);
//     }
//   };

//   const handleSave = async () => {
//     if (!selectedCandidate) return;
//     try {
//       setLoading(true);
//       setError(null);
//       const submissionId = selectedCandidate.id?.toString();
//       if (!submissionId) throw new Error("Submission ID not found. Please refresh and try again.");

//       const updateData = {
//         applicant: {
//           name: selectedCandidate.candidate_name,
//           email: selectedCandidate.email,
//           phone: selectedCandidate.mobile_number,
//           city: selectedCandidate.current_city,
//           current_last_organisation: selectedCandidate.current_last_organization,
//           total_experience_in_years: selectedCandidate.experience,
//           current_ctc: selectedCandidate.current_ctc,
//           expected_ctc: selectedCandidate.expected_ctc,
//           notice_period_in_days: selectedCandidate.notice_period,
//           special_comments: selectedCandidate.screening_comments,
//         },
//         job: {
//           position: selectedCandidate.position_name,
//           ctc: selectedCandidate.ctc_budget,
//           client_spoc: selectedCandidate.client_spoc,
//         },
//         submission: {
//           status: selectedCandidate.candidate_status,
//           date_profile_shared_from_Applicants: selectedCandidate.date_profile_shared,
//           candidate_status_update_date: selectedCandidate.interview_date_time,
//         },
//       };

//       const response = await submissionService.update(submissionId, updateData);
//       if (response.status === 200) {
//         setIsEditing(false);
//         alert("Candidate details updated successfully!");
//       } else {
//         throw new Error(response.message || "Failed to update candidate");
//       }
//     } catch (err: any) {
//       console.error("Error updating candidate:", err);
//       const errorMessage = err.message || "Failed to update candidate";
//       setError(errorMessage);
//       alert("❌ " + errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     if (originalCandidate) setSelectedCandidate({ ...originalCandidate });
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
//         closeDocumentModal();
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
//     if (!window.confirm("Are you sure you want to delete this document?")) return;
//     try {
//       await applicantService.deleteDocument(candidateId, documentId);
//       await fetchCandidateDocuments(candidateId);
//       alert("Document deleted successfully!");
//     } catch (error: any) {
//       console.error("Failed to delete document:", error);
//       alert(error?.response?.data?.message || "Failed to delete document. Please try again.");
//     }
//   };

//   const closeDocumentModal = () => {
//     setShowDocumentModal(false);
//     setDocumentForm({ name: "", type: "Resume", file: null });
//   };

//   const handleGoBack = () => {
//     if (state?.fromGroupDetail && state.groupName) {
//       navigate("/submission-group-detail", {
//         replace: true,
//         state: {
//           groupName: state.groupName,
//           groupBy: state.groupBy,
//           positionName: state.positionName,
//           clientName: state.clientName,
//           candidateName: state.candidateName,
//           status: state.status,
//           filters: state.filters,
//           searchTerm: state.searchTerm,
//           currentPage: state.currentPage,
//         },
//       });
//       return;
//     }
//     navigate(-1);
//   };

//   const updateField = (key: string, value: string) =>
//     setSelectedCandidate((prev: any) => ({ ...prev, [key]: value }));

//   const copyToClipboard = (key: string, value: string) => {
//     navigator.clipboard
//       ?.writeText(value)
//       .then(() => {
//         setCopied(key);
//         setTimeout(() => setCopied(null), 1500);
//       })
//       .catch(() => {});
//   };

//   /* ── loading / empty states ── */
//   const Spinner = ({ text }: { text: string }) => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-[1px]">
//       <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-lg ring-1 ring-slate-200">
//         <Loader2 size={18} className="animate-spin text-blue-600" />
//         <p className="text-sm font-medium text-slate-700">{text}</p>
//       </div>
//     </div>
//   );

//   if (loading && !selectedCandidate) {
//     return (
//       <>
//         <Header />
//         <Spinner text="Loading candidate…" />
//       </>
//     );
//   }

//   if (!selectedCandidate) {
//     return (
//       <>
//         <Header />
//         <div className="min-h-screen bg-slate-50 px-4 py-20 text-center">
//           <p className="text-base font-semibold text-slate-900">Candidate not found</p>
//           <p className="mt-1 text-sm text-slate-500">This submission may have been removed. Go back and pick another candidate.</p>
//           <button
//             type="button"
//             onClick={handleGoBack}
//             className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//           >
//             Back to list
//           </button>
//         </div>
//       </>
//     );
//   }

//   const c = selectedCandidate as any;

//   /* 7 fields + candidate status = 8 cells → two tidy rows of four on desktop */
//   const detailFields: FieldDef[] = [
//     { key: "current_last_organization", label: "Current organization" },
//     { key: "experience", label: "Total experience", format: (v) => `${v} years` },
//     { key: "notice_period", label: "Notice period", format: (v) => `${v} days` },
//     { key: "position_status", label: "Position status" },
//     { key: "current_ctc", label: "Current CTC", format: formatCtc },
//     { key: "expected_ctc", label: "Expected CTC", format: formatCtc },
//     { key: "ctc_budget", label: "CTC budget", format: formatCtc },
//   ];

//   const contacts = [
//     { key: "email", label: "Email", Icon: Mail, href: (v: string) => `mailto:${v}`, type: "email", format: (v: string) => v },
//     { key: "mobile_number", label: "Phone", Icon: Phone, href: (v: string) => `tel:${v}`, type: "tel", format: formatPhone },
//   ];

//   const timeline = [
//     { key: "date_of_submission", label: "Submitted", format: formatDate },
//     { key: "date_profile_shared", label: "Profile shared", format: formatDate },
//     { key: "interview_date_time", label: "Interview", format: formatDateTime },
//   ];

//   const people = [
//     { key: "recruiter", label: "Recruiter" },
//     { key: "client_spoc", label: "Client SPOC" },
//     { key: "laksh_spoc", label: "Laksh SPOC" },
//   ];

//   return (
//     <>
//       <Header />
//       <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
//         {loading && <Spinner text="Saving…" />}

//         <div className="mx-auto w-full max-w-7xl space-y-4 px-4 py-4 md:px-6">
//           {error && (
//             <div className="flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3">
//               <AlertTriangle size={16} className="mt-0.5 shrink-0 text-rose-600" />
//               <p className="flex-1 text-sm text-rose-800">{error}</p>
//               <button type="button" onClick={() => setError(null)} className="text-rose-500 hover:text-rose-700">
//                 <X size={16} />
//               </button>
//             </div>
//           )}

//           {/* ═════════ Profile header ═════════ */}
//           <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
//             <div className="flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
//               <div className="flex min-w-0 flex-1 items-center gap-4">
//                 <button
//                   type="button"
//                   onClick={handleGoBack}
//                   title="Back to list"
//                   aria-label="Back to list"
//                   className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
//                 >
//                   <ArrowLeft size={16} />
//                 </button>

//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-100">
//                   {getInitials(c.candidate_name)}
//                 </div>

//                 <div className="min-w-0 flex-1">
//                   {isEditing ? (
//                     <div className="grid max-w-lg grid-cols-1 gap-2 sm:grid-cols-2">
//                       <input
//                         value={c.candidate_name || ""}
//                         onChange={(e) => updateField("candidate_name", e.target.value)}
//                         className={inputClass}
//                         placeholder="Full name"
//                       />
//                       <input
//                         value={c.current_city || ""}
//                         onChange={(e) => updateField("current_city", e.target.value)}
//                         className={inputClass}
//                         placeholder="Current city"
//                       />
//                     </div>
//                   ) : (
//                     <>
//                       <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
//                         <div
//                           role="heading"
//                           aria-level={1}
//                           className="break-words text-xl font-semibold leading-7 tracking-tight text-slate-900"
//                         >
//                           {c.candidate_name || "Unnamed candidate"}
//                         </div>
//                         {!isBlank(c.candidate_status) && <StatusBadge status={c.candidate_status} />}
//                       </div>
//                       <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
//                         {!isBlank(c.position_name) && (
//                           <span className="inline-flex items-center gap-1.5">
//                             <Briefcase size={14} className="text-slate-400" />
//                             {c.position_name}
//                           </span>
//                         )}
//                         {!isBlank(c.client_name) && (
//                           <span className="inline-flex items-center gap-1.5">
//                             <Building2 size={14} className="text-slate-400" />
//                             {c.client_name}
//                           </span>
//                         )}
//                         {!isBlank(c.current_city) && (
//                           <span className="inline-flex items-center gap-1.5">
//                             <MapPin size={14} className="text-slate-400" />
//                             {c.current_city}
//                           </span>
//                         )}
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex shrink-0 items-center gap-2">
//                 {isEditing ? (
//                   <>
//                     <button
//                       type="button"
//                       onClick={handleCancelEdit}
//                       disabled={loading}
//                       className="h-9 rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="button"
//                       onClick={handleSave}
//                       disabled={loading}
//                       className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
//                     >
//                       {loading ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
//                       Save changes
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={() => setIsEditing(true)}
//                     className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
//                   >
//                     <Pencil size={14} />
//                     Edit details
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Contact strip */}
//             <div className="grid grid-cols-1 divide-y divide-slate-100 border-t border-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
//               {contacts.map(({ key, label, Icon, href, type, format }) => {
//                 const value = c[key];
//                 return (
//                   <div key={key} className="flex min-w-0 items-center gap-3 px-4 py-2.5">
//                     <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
//                       <Icon size={16} />
//                     </div>
//                     <div className="min-w-0 flex-1">
//                       <p className="text-xs font-medium text-slate-500">{label}</p>
//                       {isEditing ? (
//                         <input
//                           type={type}
//                           value={value || ""}
//                           onChange={(e) => updateField(key, e.target.value)}
//                           className={`${inputClass} mt-1 h-8`}
//                         />
//                       ) : !isBlank(value) ? (
//                         <a href={href(value)} className="block truncate no-underline" title={value}>
//                           <span className="text-sm font-medium text-slate-900 hover:text-blue-700">{format(value)}</span>
//                         </a>
//                       ) : (
//                         <Empty />
//                       )}
//                     </div>
//                     {!isEditing && !isBlank(value) && (
//                       <button
//                         type="button"
//                         onClick={() => copyToClipboard(key, value)}
//                         title={`Copy ${label.toLowerCase()}`}
//                         aria-label={`Copy ${label.toLowerCase()}`}
//                         className={iconButtonClass}
//                       >
//                         {copied === key ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
//                       </button>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </section>

//           {/* ═════════ Body: documents rail (left, first) | details + notes ═════════ */}
//           <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-start">
//             {/* Left rail — documents up front */}
//             <div className="space-y-4">
//               <Panel
//                 title={
//                   <span className="inline-flex items-center gap-2">
//                     Documents
//                     {candidateDocuments.length > 0 && (
//                       <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
//                         {candidateDocuments.length}
//                       </span>
//                     )}
//                   </span>
//                 }
//                 action={
//                   <button
//                     type="button"
//                     onClick={() => setShowDocumentModal(true)}
//                     className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-blue-600 px-3 text-xs font-medium text-white shadow-sm transition hover:bg-blue-700"
//                   >
//                     <Plus size={14} />
//                     Upload
//                   </button>
//                 }
//               >
//                 {candidateDocuments.length > 0 ? (
//                   <ul className="space-y-2">
//                     {candidateDocuments.map((doc) => {
//                       const { Icon, cls, ext } = fileStyle(doc.fileName?.includes(".") ? doc.fileName : doc.fileUrl);
//                       const meta = [
//                         doc.documentType,
//                         doc.size,
//                         (doc as any).uploadedAt ? formatDate((doc as any).uploadedAt) : "",
//                       ]
//                         .filter(Boolean)
//                         .join(" · ");
//                       return (
//                         <li
//                           key={doc.id}
//                           className="flex items-center gap-3 rounded-lg border border-slate-200 px-2.5 py-2 transition hover:border-slate-300 hover:bg-slate-50"
//                         >
//                           <div className={`flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-md ${cls}`}>
//                             <Icon size={15} />
//                             <span className="mt-0.5 text-[7px] font-bold leading-none">{ext}</span>
//                           </div>
//                           <a
//                             href={doc.fileUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="min-w-0 flex-1 no-underline"
//                             title="Open document"
//                           >
//                             <span className="block truncate text-sm font-medium capitalize text-slate-900 hover:text-blue-700">
//                               {doc.fileName}
//                             </span>
//                             {meta && <span className="block truncate text-xs text-slate-500">{meta}</span>}
//                           </a>
//                           <a
//                             href={doc.fileUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             title="Download"
//                             aria-label="Download"
//                             className={iconButtonClass}
//                           >
//                             <Download size={15} />
//                           </a>
//                           <button
//                             type="button"
//                             onClick={() => handleDeleteDocument(c.candidate_id, doc.id)}
//                             title="Delete"
//                             aria-label="Delete"
//                             className={`${iconButtonClass} hover:!bg-rose-50 hover:!text-rose-600`}
//                           >
//                             <Trash2 size={15} />
//                           </button>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={() => setShowDocumentModal(true)}
//                     className="flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 px-4 py-6 text-center transition hover:border-blue-400 hover:bg-blue-50/40"
//                   >
//                     <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
//                       <Upload size={16} className="text-blue-600" />
//                     </div>
//                     <span className="mt-2 text-sm font-medium text-slate-800">Upload resume or documents</span>
//                     <span className="mt-0.5 text-xs text-slate-500">PDF, DOC, DOCX, JPG or PNG up to 10 MB</span>
//                   </button>
//                 )}
//               </Panel>

//               <Panel title="Progress">
//                 <ol>
//                   {timeline.map((step, i) => {
//                     const value = c[step.key];
//                     const done = !isBlank(value);
//                     const last = i === timeline.length - 1;
//                     return (
//                       <li key={step.key} className="relative flex gap-3 pb-4 last:pb-0">
//                         {!last && (
//                           <span
//                             className={`absolute left-[9px] top-6 h-[calc(100%-1.5rem)] w-0.5 ${
//                               done ? "bg-blue-200" : "bg-slate-200"
//                             }`}
//                           />
//                         )}
//                         <span
//                           className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
//                             done ? "bg-blue-600 text-white" : "border-2 border-slate-300 bg-white"
//                           }`}
//                         >
//                           {done && <Check size={11} strokeWidth={3} />}
//                         </span>
//                         <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-3">
//                           <p className={`text-sm font-medium leading-5 ${done ? "text-slate-900" : "text-slate-500"}`}>
//                             {step.label}
//                           </p>
//                           {isEditing ? (
//                             <input
//                               value={value || ""}
//                               onChange={(e) => updateField(step.key, e.target.value)}
//                               className={`${inputClass} mt-1 h-8`}
//                               placeholder={step.key === "interview_date_time" ? "Date and time" : "YYYY-MM-DD"}
//                             />
//                           ) : (
//                             <p className="text-xs text-slate-500">{done ? step.format(value) : "Pending"}</p>
//                           )}
//                         </div>
//                       </li>
//                     );
//                   })}
//                 </ol>
//               </Panel>

//               <Panel title="People involved">
//                 <ul className="space-y-3">
//                   {people.map((p) => {
//                     const value = c[p.key];
//                     const blank = isBlank(value);
//                     return (
//                       <li key={p.key} className="flex items-center gap-3">
//                         <div
//                           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
//                             blank ? "border border-dashed border-slate-300 text-slate-300" : "bg-slate-100 text-slate-600"
//                           }`}
//                         >
//                           {blank ? "–" : getInitials(value)}
//                         </div>
//                         <div className="min-w-0 flex-1">
//                           <p className="text-xs font-medium text-slate-500">{p.label}</p>
//                           {isEditing ? (
//                             <input
//                               value={value || ""}
//                               onChange={(e) => updateField(p.key, e.target.value)}
//                               className={`${inputClass} mt-1 h-8`}
//                             />
//                           ) : blank ? (
//                             <Empty />
//                           ) : (
//                             <p className="truncate text-sm font-medium text-slate-900">{value}</p>
//                           )}
//                         </div>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </Panel>
//             </div>

//             {/* Main — details + notes */}
//             <div className="space-y-4 lg:col-span-2">
//               <Panel title="Candidate details">
//                 <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
//                   {detailFields.map((f, i) => (
//                     <Fragment key={f.key}>
//                       <Field
//                         label={f.label}
//                         value={c[f.key]}
//                         display={f.format && !isBlank(c[f.key]) ? f.format(c[f.key]) : undefined}
//                         editing={isEditing}
//                         onChange={(v) => updateField(f.key, v)}
//                         className={f.wide ? "col-span-2" : ""}
//                       />

//                       {/* Candidate status sits 4th, closing out the first row */}
//                       {i === 2 && (
//                         <div className="min-w-0">
//                           <dt className="text-xs font-medium text-slate-500">Candidate status</dt>
//                           <dd className="mt-1">
//                             {isEditing ? (
//                               <Select
//                                 options={candidateStatusOptions}
//                                 isSearchable
//                                 placeholder="Select status…"
//                                 value={candidateStatusOptions.find((opt) => opt.value === c.candidate_status) || null}
//                                 onChange={(selected: { value: string; label: string } | null) =>
//                                   updateField("candidate_status", selected?.value || "")
//                                 }
//                                 menuPortalTarget={document.body}
//                                 styles={{
//                                   control: (base, s) => ({
//                                     ...base,
//                                     minHeight: "36px",
//                                     fontSize: "14px",
//                                     borderRadius: "8px",
//                                     borderColor: s.isFocused ? "#3b82f6" : "#cbd5e1",
//                                     boxShadow: s.isFocused ? "0 0 0 4px rgba(59,130,246,0.1)" : "none",
//                                   }),
//                                   /* Explicit text colours: the menu is portalled to <body>, where it
//                                      inherits the global (Vite-default) white text and looks empty. */
//                                   menu: (base) => ({ ...base, color: "#0f172a", backgroundColor: "#fff" }),
//                                   option: (base, s) => ({
//                                     ...base,
//                                     fontSize: "14px",
//                                     color: s.isSelected ? "#fff" : "#0f172a",
//                                     backgroundColor: s.isSelected ? "#2563eb" : s.isFocused ? "#eff6ff" : "#fff",
//                                   }),
//                                   singleValue: (base) => ({ ...base, color: "#0f172a" }),
//                                   input: (base) => ({ ...base, color: "#0f172a" }),
//                                   placeholder: (base) => ({ ...base, color: "#94a3b8" }),
//                                   noOptionsMessage: (base) => ({ ...base, color: "#64748b" }),
//                                   menuPortal: (base) => ({ ...base, zIndex: 70 }),
//                                 }}
//                               />
//                             ) : isBlank(c.candidate_status) ? (
//                               <Empty />
//                             ) : (
//                               <StatusBadge status={c.candidate_status} />
//                             )}
//                           </dd>
//                         </div>
//                       )}
//                     </Fragment>
//                   ))}
//                 </dl>
//               </Panel>

//               <Panel title="Screening notes">
//                 {isEditing ? (
//                   <textarea
//                     value={c.screening_comments || ""}
//                     onChange={(e) => updateField("screening_comments", e.target.value)}
//                     placeholder="What stood out in the screening call?"
//                     rows={6}
//                     className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-sm leading-6 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
//                   />
//                 ) : !isBlank(c.screening_comments) ? (
//                   <p className="whitespace-pre-line text-sm leading-6 text-slate-700">{c.screening_comments}</p>
//                 ) : (
//                   <p className="text-sm text-slate-400">No screening notes yet. Use Edit details to add them.</p>
//                 )}
//               </Panel>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ═════════ Upload modal ═════════ */}
//       {showDocumentModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]">
//           <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
//             <div className="flex items-start justify-between px-6 pt-6">
//               <div>
//                 <div className="text-base font-semibold text-slate-900">Upload document</div>
//                 <p className="mt-0.5 text-sm text-slate-500">Attach a file to {c.candidate_name || "this candidate"}'s profile.</p>
//               </div>
//               <button
//                 type="button"
//                 onClick={closeDocumentModal}
//                 aria-label="Close"
//                 className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="space-y-4 px-6 py-5">
//               <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-7 text-center transition hover:border-blue-400 hover:bg-blue-50/40">
//                 <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
//                   <Upload size={18} className="text-blue-600" />
//                 </div>
//                 <span className="mt-3 text-sm font-medium text-slate-900">Choose a file</span>
//                 <span className="mt-0.5 text-xs text-slate-500">PDF, DOC, DOCX, JPG or PNG up to 10 MB</span>
//                 <input
//                   type="file"
//                   className="sr-only"
//                   accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) {
//                       setDocumentForm((prev) => ({ ...prev, file, name: prev.name || file.name.split(".")[0] }));
//                     }
//                   }}
//                 />
//               </label>

//               {documentForm.file && (
//                 <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5">
//                   <FileText size={16} className="shrink-0 text-blue-600" />
//                   <span className="truncate text-sm text-slate-800">{documentForm.file.name}</span>
//                   <button
//                     type="button"
//                     onClick={() => setDocumentForm((prev) => ({ ...prev, file: null }))}
//                     aria-label="Remove file"
//                     className="ml-auto shrink-0 text-slate-400 hover:text-rose-600"
//                   >
//                     <X size={15} />
//                   </button>
//                 </div>
//               )}

//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div>
//                   <label className="text-xs font-medium text-slate-600">Document name</label>
//                   <input
//                     type="text"
//                     placeholder="Resume_John_2025"
//                     value={documentForm.name}
//                     onChange={(e) => setDocumentForm((prev) => ({ ...prev, name: e.target.value }))}
//                     className={`${inputClass} mt-1.5`}
//                   />
//                 </div>
//                 <div>
//                   <label className="text-xs font-medium text-slate-600">Type</label>
//                   <select
//                     value={documentForm.type}
//                     onChange={(e) => setDocumentForm((prev) => ({ ...prev, type: e.target.value }))}
//                     className={`${inputClass} mt-1.5`}
//                   >
//                     <option value="Resume">Resume</option>
//                     <option value="Pan Card">Pan Card</option>
//                     <option value="Cover Letter">Cover Letter</option>
//                     <option value="Adhaar Card">Adhaar Card</option>
//                     <option value="Offer Letter">Offer Letter</option>
//                     <option value="Resignation Letter">Resignation Letter</option>
//                     <option value="Academic Document">Academic Document</option>
//                     <option value="Reference Letter">Reference Letter</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-6 py-4">
//               <button
//                 type="button"
//                 onClick={closeDocumentModal}
//                 className="h-9 rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleAddDocument}
//                 disabled={!documentForm.name.trim() || !documentForm.file}
//                 className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
//               >
//                 <Upload size={15} />
//                 Upload
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SubmissionGroupDetailView;




// import { useState, useEffect, Fragment } from "react";
// import type { ReactNode } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import {
//   ArrowLeft,
//   Briefcase,
//   Building2,
//   FileText,
//   FileImage,
//   Phone,
//   Mail,
//   MapPin,
//   X,
//   Loader2,
//   Upload,
//   Download,
//   Trash2,
//   Plus,
//   Pencil,
//   Check,
//   Copy,
//   AlertTriangle,
// } from "lucide-react";
// import { submissionService } from "../services/submissionService";
// import { applicantService } from "../services/applicantService";
// import { candidateStatusOptions } from "../constants/dropdown";
// import Select from "react-select";
// import type { DetailedSubmission, CandidateDocument } from "../services/submissionService";

// /* ───────────────────────── helpers (outside component so inputs keep focus) ───────────────────────── */

// const inputClass =
//   "w-full h-9 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10";

// const iconButtonClass =
//   "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500";

// /** Treat placeholder strings coming from the API ("N/A", "-", …) as empty. */
// const isBlank = (value: unknown) =>
//   value === null ||
//   value === undefined ||
//   ["", "n/a", "na", "-", "null", "undefined"].includes(String(value).trim().toLowerCase());

// const formatDate = (value?: string) => {
//   if (!value) return "";
//   const d = new Date(value);
//   if (isNaN(d.getTime())) return value;
//   return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// };

// const formatDateTime = (value?: string) => {
//   if (!value) return "";
//   const d = new Date(value);
//   if (isNaN(d.getTime())) return value;
//   return d.toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   });
// };

// /** Display-only: 2600000 → ₹26 LPA, 26 → ₹26 LPA. Raw value is untouched in state. */
// const formatCtc = (value: unknown) => {
//   const raw = String(value).replace(/[,₹\s]/g, "");
//   const n = Number(raw);
//   if (!raw || isNaN(n)) return String(value);
//   const lakhs = n >= 1000 ? n / 100000 : n;
//   return `₹${lakhs.toLocaleString("en-IN", { maximumFractionDigits: 2 })} LPA`;
// };

// /** Display-only: +919970581173 → +91 99705 81173 */
// const formatPhone = (value: string) => {
//   const digits = value.replace(/\D/g, "");
//   if (digits.length === 12 && digits.startsWith("91")) return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
//   if (digits.length === 10) return `${digits.slice(0, 5)} ${digits.slice(5)}`;
//   return value;
// };

// const getInitials = (name?: string) =>
//   (name || "?")
//     .trim()
//     .split(/\s+/)
//     .slice(0, 2)
//     .map((p) => p[0]?.toUpperCase())
//     .join("");

// const statusStyle = (status: string) => {
//   const s = (status || "").toLowerCase();
//   if (s.includes("reject") || s.includes("drop")) return "bg-rose-50 text-rose-700 ring-rose-200";
//   if (s.includes("select") || s.includes("offer") || s.includes("join")) return "bg-emerald-50 text-emerald-700 ring-emerald-200";
//   if (s.includes("schedul") || s.includes("r1") || s.includes("r2") || s.includes("r3"))
//     return "bg-violet-50 text-violet-700 ring-violet-200";
//   if (s.includes("shared") || s.includes("hold")) return "bg-amber-50 text-amber-700 ring-amber-200";
//   return "bg-blue-50 text-blue-700 ring-blue-200";
// };

// const fileStyle = (name?: string) => {
//   const ext = (name || "").split("?")[0].split(".").pop()?.toLowerCase();
//   if (ext === "pdf") return { Icon: FileText, cls: "bg-rose-50 text-rose-600", ext: "PDF" };
//   if (ext === "doc" || ext === "docx") return { Icon: FileText, cls: "bg-blue-50 text-blue-600", ext: "DOC" };
//   if (["jpg", "jpeg", "png"].includes(ext || "")) return { Icon: FileImage, cls: "bg-emerald-50 text-emerald-600", ext: "IMG" };
//   return { Icon: FileText, cls: "bg-slate-100 text-slate-500", ext: "FILE" };
// };

// const Empty = () => <span className="text-sm font-normal text-slate-400">Not added</span>;

// const StatusBadge = ({ status }: { status: string }) => (
//   <span
//     className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyle(
//       status
//     )}`}
//   >
//     <span className="h-1.5 w-1.5 rounded-full bg-current" />
//     {status}
//   </span>
// );

// /** Label + value (or input in edit mode). Values wrap instead of truncating. */
// const Field = ({
//   label,
//   value,
//   display,
//   editing,
//   onChange,
//   type = "text",
//   className = "",
// }: {
//   label: string;
//   value: any;
//   display?: ReactNode;
//   editing: boolean;
//   onChange: (v: string) => void;
//   type?: string;
//   className?: string;
// }) => (
//   <div className={`min-w-0 ${className}`}>
//     <dt className="text-xs font-medium text-slate-500">{label}</dt>
//     <dd className="mt-1">
//       {editing ? (
//         <input type={type} value={value || ""} onChange={(e) => onChange(e.target.value)} className={inputClass} />
//       ) : isBlank(value) ? (
//         <Empty />
//       ) : (
//         <span className="block break-words text-sm font-medium text-slate-900">{display ?? value}</span>
//       )}
//     </dd>
//   </div>
// );

// /** Card shell with a header row. Divs (not h2) so global heading styles can't leak in. */
// const Panel = ({
//   title,
//   action,
//   children,
//   className = "",
// }: {
//   title: ReactNode;
//   action?: ReactNode;
//   children: ReactNode;
//   className?: string;
// }) => (
//   <section className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>
//     <div className="flex min-h-[48px] items-center justify-between gap-3 border-b border-slate-100 px-4 py-2.5">
//       <div className="text-sm font-semibold text-slate-900">{title}</div>
//       {action}
//     </div>
//     <div className="px-4 py-4">{children}</div>
//   </section>
// );

// type FieldDef = { key: string; label: string; wide?: boolean; format?: (v: any) => ReactNode };

// /* ───────────────────────── page ───────────────────────── */

// const SubmissionGroupDetailView = () => {
//   // Route: /submission-management/:groupSlug/:submissionId
//   const { submissionId: candidateId } = useParams<{ groupSlug: string; submissionId: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [selectedCandidate, setSelectedCandidate] = useState<DetailedSubmission | null>(null);
//   const [originalCandidate, setOriginalCandidate] = useState<DetailedSubmission | null>(null);
//   const [candidateDocuments, setCandidateDocuments] = useState<CandidateDocument[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [copied, setCopied] = useState<string | null>(null);
//   const [showDocumentModal, setShowDocumentModal] = useState(false);
//   const [documentForm, setDocumentForm] = useState({
//     name: "",
//     type: "Resume",
//     file: null as File | null,
//   });

//   /* ── data ── */
//   useEffect(() => {
//     const fetchCandidateDetails = async () => {
//       if (!candidateId) return;
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await submissionService.fetchById(candidateId);
//         if (response.status === 200) {
//           const detailedCandidate = { ...response.data, id: parseInt(candidateId) };
//           setSelectedCandidate(detailedCandidate);
//           setOriginalCandidate(detailedCandidate);
//           if (response.data.candidate_id) {
//             await fetchCandidateDocuments(response.data.candidate_id);
//           }
//         }
//       } catch (err: any) {
//         console.error("Error fetching candidate details:", err);
//         setError(err?.message || "Failed to load candidate details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCandidateDetails();
//   }, [candidateId]);

//   const fetchCandidateDocuments = async (applicantId: string) => {
//     try {
//       const response = await applicantService.fetchDocuments(applicantId);
//       if (response.status === 200) setCandidateDocuments(response.data || []);
//     } catch (err: any) {
//       console.error("Error fetching documents:", err);
//     }
//   };

//   const handleSave = async () => {
//     if (!selectedCandidate) return;
//     try {
//       setLoading(true);
//       setError(null);
//       const submissionId = selectedCandidate.id?.toString();
//       if (!submissionId) throw new Error("Submission ID not found. Please refresh and try again.");

//       const updateData = {
//         applicant: {
//           name: selectedCandidate.candidate_name,
//           email: selectedCandidate.email,
//           phone: selectedCandidate.mobile_number,
//           city: selectedCandidate.current_city,
//           current_last_organisation: selectedCandidate.current_last_organization,
//           total_experience_in_years: selectedCandidate.experience,
//           current_ctc: selectedCandidate.current_ctc,
//           expected_ctc: selectedCandidate.expected_ctc,
//           notice_period_in_days: selectedCandidate.notice_period,
//           special_comments: selectedCandidate.screening_comments,
//         },
//         job: {
//           position: selectedCandidate.position_name,
//           ctc: selectedCandidate.ctc_budget,
//           client_spoc: selectedCandidate.client_spoc,
//         },
//         submission: {
//           status: selectedCandidate.candidate_status,
//           date_profile_shared_from_Applicants: selectedCandidate.date_profile_shared,
//           candidate_status_update_date: selectedCandidate.interview_date_time,
//         },
//       };

//       const response = await submissionService.update(submissionId, updateData);
//       if (response.status === 200) {
//         setIsEditing(false);
//         alert("Candidate details updated successfully!");
//       } else {
//         throw new Error(response.message || "Failed to update candidate");
//       }
//     } catch (err: any) {
//       console.error("Error updating candidate:", err);
//       const errorMessage = err.message || "Failed to update candidate";
//       setError(errorMessage);
//       alert("❌ " + errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     if (originalCandidate) setSelectedCandidate({ ...originalCandidate });
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
//         closeDocumentModal();
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

//   const handleDeleteDocument = async (applicantId: any, documentId: any) => {
//     if (!documentId) {
//       alert("Document ID is required");
//       return;
//     }
//     if (!window.confirm("Are you sure you want to delete this document?")) return;
//     try {
//       await applicantService.deleteDocument(applicantId, documentId);
//       await fetchCandidateDocuments(applicantId);
//       alert("Document deleted successfully!");
//     } catch (error: any) {
//       console.error("Failed to delete document:", error);
//       alert(error?.response?.data?.message || "Failed to delete document. Please try again.");
//     }
//   };

//   const closeDocumentModal = () => {
//     setShowDocumentModal(false);
//     setDocumentForm({ name: "", type: "Resume", file: null });
//   };

//   // Back: previous page if there is one in history, otherwise the main list
//   const handleGoBack = () => (location.key !== "default" ? navigate(-1) : navigate("/submission-management"));

//   const updateField = (key: string, value: string) =>
//     setSelectedCandidate((prev: any) => ({ ...prev, [key]: value }));

//   const copyToClipboard = (key: string, value: string) => {
//     navigator.clipboard
//       ?.writeText(value)
//       .then(() => {
//         setCopied(key);
//         setTimeout(() => setCopied(null), 1500);
//       })
//       .catch(() => {});
//   };

//   /* ── loading / empty states ── */
//   const Spinner = ({ text }: { text: string }) => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-[1px]">
//       <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-lg ring-1 ring-slate-200">
//         <Loader2 size={18} className="animate-spin text-blue-600" />
//         <p className="text-sm font-medium text-slate-700">{text}</p>
//       </div>
//     </div>
//   );

//   if (loading && !selectedCandidate) {
//     return (
//       <>
//         <Header />
//         <Spinner text="Loading candidate…" />
//       </>
//     );
//   }

//   if (!selectedCandidate) {
//     return (
//       <>
//         <Header />
//         <div className="min-h-screen bg-slate-50 px-4 py-20 text-center">
//           <p className="text-base font-semibold text-slate-900">Candidate not found</p>
//           <p className="mt-1 text-sm text-slate-500">This submission may have been removed. Go back and pick another candidate.</p>
//           <button
//             type="button"
//             onClick={handleGoBack}
//             className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//           >
//             Back to list
//           </button>
//         </div>
//       </>
//     );
//   }

//   const c = selectedCandidate as any;

//   /* 7 fields + candidate status = 8 cells → two tidy rows of four on desktop */
//   const detailFields: FieldDef[] = [
//     { key: "current_last_organization", label: "Current organization" },
//     { key: "experience", label: "Total experience", format: (v) => `${v} years` },
//     { key: "notice_period", label: "Notice period", format: (v) => `${v} days` },
//     { key: "position_status", label: "Position status" },
//     { key: "current_ctc", label: "Current CTC", format: formatCtc },
//     { key: "expected_ctc", label: "Expected CTC", format: formatCtc },
//     { key: "ctc_budget", label: "CTC budget", format: formatCtc },
//   ];

//   const contacts = [
//     { key: "email", label: "Email", Icon: Mail, href: (v: string) => `mailto:${v}`, type: "email", format: (v: string) => v },
//     { key: "mobile_number", label: "Phone", Icon: Phone, href: (v: string) => `tel:${v}`, type: "tel", format: formatPhone },
//   ];

//   const timeline = [
//     { key: "date_of_submission", label: "Submitted", format: formatDate },
//     { key: "date_profile_shared", label: "Profile shared", format: formatDate },
//     { key: "interview_date_time", label: "Interview", format: formatDateTime },
//   ];

//   const people = [
//     { key: "recruiter", label: "Recruiter" },
//     { key: "client_spoc", label: "Client SPOC" },
//     { key: "laksh_spoc", label: "Laksh SPOC" },
//   ];

//   return (
//     <>
//       <Header />
//       <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
//         {loading && <Spinner text="Saving…" />}

//         <div className="mx-auto w-full max-w-7xl space-y-4 px-4 py-4 md:px-6">
//           {error && (
//             <div className="flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3">
//               <AlertTriangle size={16} className="mt-0.5 shrink-0 text-rose-600" />
//               <p className="flex-1 text-sm text-rose-800">{error}</p>
//               <button type="button" onClick={() => setError(null)} className="text-rose-500 hover:text-rose-700">
//                 <X size={16} />
//               </button>
//             </div>
//           )}

//           {/* ═════════ Profile header ═════════ */}
//           <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
//             <div className="flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
//               <div className="flex min-w-0 flex-1 items-center gap-4">
//                 <button
//                   type="button"
//                   onClick={handleGoBack}
//                   title="Back to list"
//                   aria-label="Back to list"
//                   className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
//                 >
//                   <ArrowLeft size={16} />
//                 </button>

//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-100">
//                   {getInitials(c.candidate_name)}
//                 </div>

//                 <div className="min-w-0 flex-1">
//                   {isEditing ? (
//                     <div className="grid max-w-lg grid-cols-1 gap-2 sm:grid-cols-2">
//                       <input
//                         value={c.candidate_name || ""}
//                         onChange={(e) => updateField("candidate_name", e.target.value)}
//                         className={inputClass}
//                         placeholder="Full name"
//                       />
//                       <input
//                         value={c.current_city || ""}
//                         onChange={(e) => updateField("current_city", e.target.value)}
//                         className={inputClass}
//                         placeholder="Current city"
//                       />
//                     </div>
//                   ) : (
//                     <>
//                       <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
//                         <div
//                           role="heading"
//                           aria-level={1}
//                           className="break-words text-xl font-semibold leading-7 tracking-tight text-slate-900"
//                         >
//                           {c.candidate_name || "Unnamed candidate"}
//                         </div>
//                         {!isBlank(c.candidate_status) && <StatusBadge status={c.candidate_status} />}
//                       </div>
//                       <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
//                         {!isBlank(c.position_name) && (
//                           <span className="inline-flex items-center gap-1.5">
//                             <Briefcase size={14} className="text-slate-400" />
//                             {c.position_name}
//                           </span>
//                         )}
//                         {!isBlank(c.client_name) && (
//                           <span className="inline-flex items-center gap-1.5">
//                             <Building2 size={14} className="text-slate-400" />
//                             {c.client_name}
//                           </span>
//                         )}
//                         {!isBlank(c.current_city) && (
//                           <span className="inline-flex items-center gap-1.5">
//                             <MapPin size={14} className="text-slate-400" />
//                             {c.current_city}
//                           </span>
//                         )}
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex shrink-0 items-center gap-2">
//                 {isEditing ? (
//                   <>
//                     <button
//                       type="button"
//                       onClick={handleCancelEdit}
//                       disabled={loading}
//                       className="h-9 rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="button"
//                       onClick={handleSave}
//                       disabled={loading}
//                       className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
//                     >
//                       {loading ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
//                       Save changes
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={() => setIsEditing(true)}
//                     className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
//                   >
//                     <Pencil size={14} />
//                     Edit details
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Contact strip */}
//             <div className="grid grid-cols-1 divide-y divide-slate-100 border-t border-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
//               {contacts.map(({ key, label, Icon, href, type, format }) => {
//                 const value = c[key];
//                 return (
//                   <div key={key} className="flex min-w-0 items-center gap-3 px-4 py-2.5">
//                     <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
//                       <Icon size={16} />
//                     </div>
//                     <div className="min-w-0 flex-1">
//                       <p className="text-xs font-medium text-slate-500">{label}</p>
//                       {isEditing ? (
//                         <input
//                           type={type}
//                           value={value || ""}
//                           onChange={(e) => updateField(key, e.target.value)}
//                           className={`${inputClass} mt-1 h-8`}
//                         />
//                       ) : !isBlank(value) ? (
//                         <a href={href(value)} className="block truncate no-underline" title={value}>
//                           <span className="text-sm font-medium text-slate-900 hover:text-blue-700">{format(value)}</span>
//                         </a>
//                       ) : (
//                         <Empty />
//                       )}
//                     </div>
//                     {!isEditing && !isBlank(value) && (
//                       <button
//                         type="button"
//                         onClick={() => copyToClipboard(key, value)}
//                         title={`Copy ${label.toLowerCase()}`}
//                         aria-label={`Copy ${label.toLowerCase()}`}
//                         className={iconButtonClass}
//                       >
//                         {copied === key ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
//                       </button>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </section>

//           {/* ═════════ Body: documents rail (left, first) | details + notes ═════════ */}
//           <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-start">
//             {/* Left rail — documents up front */}
//             <div className="space-y-4">
//               <Panel
//                 title={
//                   <span className="inline-flex items-center gap-2">
//                     Documents
//                     {candidateDocuments.length > 0 && (
//                       <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
//                         {candidateDocuments.length}
//                       </span>
//                     )}
//                   </span>
//                 }
//                 action={
//                   <button
//                     type="button"
//                     onClick={() => setShowDocumentModal(true)}
//                     className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-blue-600 px-3 text-xs font-medium text-white shadow-sm transition hover:bg-blue-700"
//                   >
//                     <Plus size={14} />
//                     Upload
//                   </button>
//                 }
//               >
//                 {candidateDocuments.length > 0 ? (
//                   <ul className="space-y-2">
//                     {candidateDocuments.map((doc) => {
//                       const { Icon, cls, ext } = fileStyle(doc.fileName?.includes(".") ? doc.fileName : doc.fileUrl);
//                       const meta = [
//                         doc.documentType,
//                         doc.size,
//                         (doc as any).uploadedAt ? formatDate((doc as any).uploadedAt) : "",
//                       ]
//                         .filter(Boolean)
//                         .join(" · ");
//                       return (
//                         <li
//                           key={doc.id}
//                           className="flex items-center gap-3 rounded-lg border border-slate-200 px-2.5 py-2 transition hover:border-slate-300 hover:bg-slate-50"
//                         >
//                           <div className={`flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-md ${cls}`}>
//                             <Icon size={15} />
//                             <span className="mt-0.5 text-[7px] font-bold leading-none">{ext}</span>
//                           </div>
//                           <a
//                             href={doc.fileUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="min-w-0 flex-1 no-underline"
//                             title="Open document"
//                           >
//                             <span className="block truncate text-sm font-medium capitalize text-slate-900 hover:text-blue-700">
//                               {doc.fileName}
//                             </span>
//                             {meta && <span className="block truncate text-xs text-slate-500">{meta}</span>}
//                           </a>
//                           <a
//                             href={doc.fileUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             title="Download"
//                             aria-label="Download"
//                             className={iconButtonClass}
//                           >
//                             <Download size={15} />
//                           </a>
//                           <button
//                             type="button"
//                             onClick={() => handleDeleteDocument(c.candidate_id, doc.id)}
//                             title="Delete"
//                             aria-label="Delete"
//                             className={`${iconButtonClass} hover:!bg-rose-50 hover:!text-rose-600`}
//                           >
//                             <Trash2 size={15} />
//                           </button>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={() => setShowDocumentModal(true)}
//                     className="flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 px-4 py-6 text-center transition hover:border-blue-400 hover:bg-blue-50/40"
//                   >
//                     <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
//                       <Upload size={16} className="text-blue-600" />
//                     </div>
//                     <span className="mt-2 text-sm font-medium text-slate-800">Upload resume or documents</span>
//                     <span className="mt-0.5 text-xs text-slate-500">PDF, DOC, DOCX, JPG or PNG up to 10 MB</span>
//                   </button>
//                 )}
//               </Panel>

//               <Panel title="Progress">
//                 <ol>
//                   {timeline.map((step, i) => {
//                     const value = c[step.key];
//                     const done = !isBlank(value);
//                     const last = i === timeline.length - 1;
//                     return (
//                       <li key={step.key} className="relative flex gap-3 pb-4 last:pb-0">
//                         {!last && (
//                           <span
//                             className={`absolute left-[9px] top-6 h-[calc(100%-1.5rem)] w-0.5 ${
//                               done ? "bg-blue-200" : "bg-slate-200"
//                             }`}
//                           />
//                         )}
//                         <span
//                           className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
//                             done ? "bg-blue-600 text-white" : "border-2 border-slate-300 bg-white"
//                           }`}
//                         >
//                           {done && <Check size={11} strokeWidth={3} />}
//                         </span>
//                         <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-3">
//                           <p className={`text-sm font-medium leading-5 ${done ? "text-slate-900" : "text-slate-500"}`}>
//                             {step.label}
//                           </p>
//                           {isEditing ? (
//                             <input
//                               value={value || ""}
//                               onChange={(e) => updateField(step.key, e.target.value)}
//                               className={`${inputClass} mt-1 h-8`}
//                               placeholder={step.key === "interview_date_time" ? "Date and time" : "YYYY-MM-DD"}
//                             />
//                           ) : (
//                             <p className="text-xs text-slate-500">{done ? step.format(value) : "Pending"}</p>
//                           )}
//                         </div>
//                       </li>
//                     );
//                   })}
//                 </ol>
//               </Panel>

//               <Panel title="People involved">
//                 <ul className="space-y-3">
//                   {people.map((p) => {
//                     const value = c[p.key];
//                     const blank = isBlank(value);
//                     return (
//                       <li key={p.key} className="flex items-center gap-3">
//                         <div
//                           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
//                             blank ? "border border-dashed border-slate-300 text-slate-300" : "bg-slate-100 text-slate-600"
//                           }`}
//                         >
//                           {blank ? "–" : getInitials(value)}
//                         </div>
//                         <div className="min-w-0 flex-1">
//                           <p className="text-xs font-medium text-slate-500">{p.label}</p>
//                           {isEditing ? (
//                             <input
//                               value={value || ""}
//                               onChange={(e) => updateField(p.key, e.target.value)}
//                               className={`${inputClass} mt-1 h-8`}
//                             />
//                           ) : blank ? (
//                             <Empty />
//                           ) : (
//                             <p className="truncate text-sm font-medium text-slate-900">{value}</p>
//                           )}
//                         </div>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </Panel>
//             </div>

//             {/* Main — details + notes */}
//             <div className="space-y-4 lg:col-span-2">
//               <Panel title="Candidate details">
//                 <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
//                   {detailFields.map((f, i) => (
//                     <Fragment key={f.key}>
//                       <Field
//                         label={f.label}
//                         value={c[f.key]}
//                         display={f.format && !isBlank(c[f.key]) ? f.format(c[f.key]) : undefined}
//                         editing={isEditing}
//                         onChange={(v) => updateField(f.key, v)}
//                         className={f.wide ? "col-span-2" : ""}
//                       />

//                       {/* Candidate status sits 4th, closing out the first row */}
//                       {i === 2 && (
//                         <div className="min-w-0">
//                           <dt className="text-xs font-medium text-slate-500">Candidate status</dt>
//                           <dd className="mt-1">
//                             {isEditing ? (
//                               <Select
//                                 options={candidateStatusOptions}
//                                 isSearchable
//                                 placeholder="Select status…"
//                                 value={candidateStatusOptions.find((opt) => opt.value === c.candidate_status) || null}
//                                 onChange={(selected: { value: string; label: string } | null) =>
//                                   updateField("candidate_status", selected?.value || "")
//                                 }
//                                 menuPortalTarget={document.body}
//                                 styles={{
//                                   control: (base, s) => ({
//                                     ...base,
//                                     minHeight: "36px",
//                                     fontSize: "14px",
//                                     borderRadius: "8px",
//                                     borderColor: s.isFocused ? "#3b82f6" : "#cbd5e1",
//                                     boxShadow: s.isFocused ? "0 0 0 4px rgba(59,130,246,0.1)" : "none",
//                                   }),
//                                   /* Explicit text colours: the menu is portalled to <body>, where it
//                                      inherits the global (Vite-default) white text and looks empty. */
//                                   menu: (base) => ({ ...base, color: "#0f172a", backgroundColor: "#fff" }),
//                                   option: (base, s) => ({
//                                     ...base,
//                                     fontSize: "14px",
//                                     color: s.isSelected ? "#fff" : "#0f172a",
//                                     backgroundColor: s.isSelected ? "#2563eb" : s.isFocused ? "#eff6ff" : "#fff",
//                                   }),
//                                   singleValue: (base) => ({ ...base, color: "#0f172a" }),
//                                   input: (base) => ({ ...base, color: "#0f172a" }),
//                                   placeholder: (base) => ({ ...base, color: "#94a3b8" }),
//                                   noOptionsMessage: (base) => ({ ...base, color: "#64748b" }),
//                                   menuPortal: (base) => ({ ...base, zIndex: 70 }),
//                                 }}
//                               />
//                             ) : isBlank(c.candidate_status) ? (
//                               <Empty />
//                             ) : (
//                               <StatusBadge status={c.candidate_status} />
//                             )}
//                           </dd>
//                         </div>
//                       )}
//                     </Fragment>
//                   ))}
//                 </dl>
//               </Panel>

//               <Panel title="Screening notes">
//                 {isEditing ? (
//                   <textarea
//                     value={c.screening_comments || ""}
//                     onChange={(e) => updateField("screening_comments", e.target.value)}
//                     placeholder="What stood out in the screening call?"
//                     rows={6}
//                     className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-sm leading-6 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
//                   />
//                 ) : !isBlank(c.screening_comments) ? (
//                   <p className="whitespace-pre-line text-sm leading-6 text-slate-700">{c.screening_comments}</p>
//                 ) : (
//                   <p className="text-sm text-slate-400">No screening notes yet. Use Edit details to add them.</p>
//                 )}
//               </Panel>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ═════════ Upload modal ═════════ */}
//       {showDocumentModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]">
//           <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
//             <div className="flex items-start justify-between px-6 pt-6">
//               <div>
//                 <div className="text-base font-semibold text-slate-900">Upload document</div>
//                 <p className="mt-0.5 text-sm text-slate-500">Attach a file to {c.candidate_name || "this candidate"}'s profile.</p>
//               </div>
//               <button
//                 type="button"
//                 onClick={closeDocumentModal}
//                 aria-label="Close"
//                 className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="space-y-4 px-6 py-5">
//               <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-7 text-center transition hover:border-blue-400 hover:bg-blue-50/40">
//                 <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
//                   <Upload size={18} className="text-blue-600" />
//                 </div>
//                 <span className="mt-3 text-sm font-medium text-slate-900">Choose a file</span>
//                 <span className="mt-0.5 text-xs text-slate-500">PDF, DOC, DOCX, JPG or PNG up to 10 MB</span>
//                 <input
//                   type="file"
//                   className="sr-only"
//                   accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) {
//                       setDocumentForm((prev) => ({ ...prev, file, name: prev.name || file.name.split(".")[0] }));
//                     }
//                   }}
//                 />
//               </label>

//               {documentForm.file && (
//                 <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5">
//                   <FileText size={16} className="shrink-0 text-blue-600" />
//                   <span className="truncate text-sm text-slate-800">{documentForm.file.name}</span>
//                   <button
//                     type="button"
//                     onClick={() => setDocumentForm((prev) => ({ ...prev, file: null }))}
//                     aria-label="Remove file"
//                     className="ml-auto shrink-0 text-slate-400 hover:text-rose-600"
//                   >
//                     <X size={15} />
//                   </button>
//                 </div>
//               )}

//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div>
//                   <label className="text-xs font-medium text-slate-600">Document name</label>
//                   <input
//                     type="text"
//                     placeholder="Resume_John_2025"
//                     value={documentForm.name}
//                     onChange={(e) => setDocumentForm((prev) => ({ ...prev, name: e.target.value }))}
//                     className={`${inputClass} mt-1.5`}
//                   />
//                 </div>
//                 <div>
//                   <label className="text-xs font-medium text-slate-600">Type</label>
//                   <select
//                     value={documentForm.type}
//                     onChange={(e) => setDocumentForm((prev) => ({ ...prev, type: e.target.value }))}
//                     className={`${inputClass} mt-1.5`}
//                   >
//                     <option value="Resume">Resume</option>
//                     <option value="Pan Card">Pan Card</option>
//                     <option value="Cover Letter">Cover Letter</option>
//                     <option value="Adhaar Card">Adhaar Card</option>
//                     <option value="Offer Letter">Offer Letter</option>
//                     <option value="Resignation Letter">Resignation Letter</option>
//                     <option value="Academic Document">Academic Document</option>
//                     <option value="Reference Letter">Reference Letter</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-6 py-4">
//               <button
//                 type="button"
//                 onClick={closeDocumentModal}
//                 className="h-9 rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleAddDocument}
//                 disabled={!documentForm.name.trim() || !documentForm.file}
//                 className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
//               >
//                 <Upload size={15} />
//                 Upload
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SubmissionGroupDetailView;


import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  ArrowLeft,
  UserRound,
  GitBranch,
  UsersRound,
  NotebookPen,
  FileText,
  FileImage,
  Phone,
  Mail,
  MapPin,
  X,
  Loader2,
  Upload,
  Download,
  Trash2,
  Plus,
  Pencil,
  Check,
  Copy,
  AlertTriangle,
  Building2,
  Briefcase,
  Clock,
  IndianRupee,
} from "lucide-react";
import { submissionService } from "../services/submissionService";
import { applicantService } from "../services/applicantService";
import { candidateStatusOptions } from "../constants/dropdown";
import Select from "react-select";
import type { DetailedSubmission, CandidateDocument } from "../services/submissionService";

/* ───────────────────────── helpers ───────────────────────── */

const inputClass =
  "w-full h-8 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/10";

const isBlank = (value: unknown) =>
  value === null ||
  value === undefined ||
  ["", "n/a", "na", "-", "null", "undefined"].includes(String(value).trim().toLowerCase());

const formatDate = (value?: string) => {
  if (!value) return "";
  const d = new Date(value);
  return isNaN(d.getTime()) ? value : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const formatDateTime = (value?: string) => {
  if (!value) return "";
  const d = new Date(value);
  return isNaN(d.getTime())
    ? value
    : d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true });
};

const formatCtc = (value: unknown) => {
  const raw = String(value).replace(/[,₹\s]/g, "");
  const n = Number(raw);
  if (!raw || isNaN(n)) return String(value);
  const lakhs = n >= 1000 ? n / 100000 : n;
  return `₹${lakhs.toLocaleString("en-IN", { maximumFractionDigits: 2 })} LPA`;
};

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  if (digits.length === 10) return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  return value;
};

const getInitials = (name?: string) =>
  (name || "?").trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");

/* ── Status history helpers (localStorage-backed, keyed by candidate ID) ── */
const getStatusHistory = (candidateId: string | number): { status: string; date: string }[] => {
  try { return JSON.parse(localStorage.getItem(`statusHistory_${candidateId}`) || "[]"); } catch { return []; }
};
const pushStatusHistory = (candidateId: string | number, status: string) => {
  const hist = getStatusHistory(candidateId);
  if (hist.length > 0 && hist[hist.length - 1].status === status) return hist;
  const updated = [...hist, { status, date: new Date().toISOString() }];
  try { localStorage.setItem(`statusHistory_${candidateId}`, JSON.stringify(updated)); } catch {}
  return updated;
};

const statusColor = (status: string) => {
  const s = (status || "").toLowerCase();
  if (s.includes("reject") || s.includes("drop")) return "bg-rose-50 text-rose-700 ring-rose-200";
  if (s.includes("select") || s.includes("offer") || s.includes("join")) return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (s.includes("schedul") || s.includes("r1") || s.includes("r2") || s.includes("r3")) return "bg-violet-50 text-violet-700 ring-violet-200";
  if (s.includes("shared") || s.includes("hold")) return "bg-amber-50 text-amber-700 ring-amber-200";
  return "bg-teal-50 text-teal-700 ring-teal-200";
};

const fileStyle = (name?: string) => {
  const ext = (name || "").split("?")[0].split(".").pop()?.toLowerCase();
  if (ext === "pdf") return { Icon: FileText, cls: "bg-rose-50 text-rose-600", ext: "PDF" };
  if (ext === "doc" || ext === "docx") return { Icon: FileText, cls: "bg-teal-50 text-teal-600", ext: "DOC" };
  if (["jpg", "jpeg", "png"].includes(ext || "")) return { Icon: FileImage, cls: "bg-emerald-50 text-emerald-600", ext: "IMG" };
  return { Icon: FileText, cls: "bg-slate-100 text-slate-500", ext: "FILE" };
};

const StatusBadge = ({ status }: { status: string }) => (
  <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${statusColor(status)}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-current" />
    {status}
  </span>
);

const Empty = () => <span className="text-sm text-slate-400">—</span>;

/* ───────────────────────── page ───────────────────────── */

const SubmissionGroupDetailView = () => {
  const { submissionId: candidateId } = useParams<{ groupSlug: string; submissionId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCandidate, setSelectedCandidate] = useState<DetailedSubmission | null>(null);
  const [originalCandidate, setOriginalCandidate] = useState<DetailedSubmission | null>(null);
  const [candidateDocuments, setCandidateDocuments] = useState<CandidateDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [documentForm, setDocumentForm] = useState({ name: "", type: "Resume", file: null as File | null });
  const [statusHistory, setStatusHistory] = useState<{ status: string; date: string }[]>([]);

  useEffect(() => {
    (async () => {
      if (!candidateId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await submissionService.fetchById(candidateId);
        if (response.status === 200) {
          const d = { ...response.data, id: parseInt(candidateId) };
          setSelectedCandidate(d);
          setOriginalCandidate(d);
          if (d.candidate_status) {
            const saved = getStatusHistory(candidateId!);
            if (saved.length > 0 && saved[saved.length - 1].status === d.candidate_status) {
              setStatusHistory(saved);
            } else {
              setStatusHistory(pushStatusHistory(candidateId!, d.candidate_status));
            }
          }
          if (response.data.candidate_id) {
            const dr = await applicantService.fetchDocuments(response.data.candidate_id);
            if (dr.status === 200) setCandidateDocuments(dr.data || []);
          }
        }
      } catch (err: any) {
        setError(err?.message || "Failed to load candidate details");
      } finally {
        setLoading(false);
      }
    })();
  }, [candidateId]);

  const fetchDocs = async (aid: string) => {
    try { const r = await applicantService.fetchDocuments(aid); if (r.status === 200) setCandidateDocuments(r.data || []); } catch {}
  };

  const handleSave = async () => {
    if (!selectedCandidate) return;
    try {
      setLoading(true); setError(null);
      const sid = selectedCandidate.id?.toString();
      if (!sid) throw new Error("Submission ID not found.");
      /* Sanitize numeric fields — Prisma expects Float or null, not "N/A" */
      const toNum = (v: any): number | null => {
        if (v === null || v === undefined || v === "" || v === "N/A" || v === "n/a") return null;
        const n = parseFloat(String(v));
        return isNaN(n) ? null : n;
      };
      const r = await submissionService.update(sid, {
        applicant: { name: selectedCandidate.candidate_name, email: selectedCandidate.email, phone: selectedCandidate.mobile_number, city: selectedCandidate.current_city, current_last_organisation: selectedCandidate.current_last_organization, total_experience_in_years: toNum(selectedCandidate.experience), current_ctc: toNum(selectedCandidate.current_ctc), expected_ctc: toNum(selectedCandidate.expected_ctc), notice_period_in_days: toNum(selectedCandidate.notice_period), special_comments: selectedCandidate.screening_comments },
        job: { position: selectedCandidate.position_name, ctc: selectedCandidate.ctc_budget, client_spoc: selectedCandidate.client_spoc },
        submission: { status: selectedCandidate.candidate_status, date_profile_shared_from_Applicants: selectedCandidate.date_profile_shared, candidate_status_update_date: selectedCandidate.interview_date_time },
      });
      if (r.status === 200) { setIsEditing(false); alert("Updated successfully!"); }
      else throw new Error(r.message || "Failed");
    } catch (err: any) { setError(err.message); alert("❌ " + err.message); }
    finally { setLoading(false); }
  };

  const handleCancelEdit = () => { setIsEditing(false); if (originalCandidate) setSelectedCandidate({ ...originalCandidate }); };

  const handleAddDocument = async () => {
    if (!documentForm.name.trim() || !documentForm.file || !selectedCandidate) { alert("Please provide a name and file."); return; }
    try {
      setLoading(true);
      const r = await applicantService.uploadDocument(selectedCandidate.candidate_id, documentForm.type, documentForm.file);
      if (r.status === 200) { await fetchDocs(selectedCandidate.candidate_id); closeDocumentModal(); alert("Uploaded!"); }
      else alert(r.data?.message || "Upload failed");
    } catch (err: any) { alert(err?.response?.data?.message || "Upload failed"); }
    finally { setLoading(false); }
  };

  const handleDeleteDocument = async (aid: any, did: any) => {
    if (!did) return;
    if (!window.confirm("Delete this document?")) return;
    try { await applicantService.deleteDocument(aid, did); await fetchDocs(aid); }
    catch (err: any) { alert(err?.response?.data?.message || "Delete failed."); }
  };

  const closeDocumentModal = () => { setShowDocumentModal(false); setDocumentForm({ name: "", type: "Resume", file: null }); };
  const handleGoBack = () => (location.key !== "default" ? navigate(-1) : navigate("/submission-management"));
  const updateField = (key: string, value: string) => {
    setSelectedCandidate((prev: any) => ({ ...prev, [key]: value }));
    if (key === "candidate_status" && value && candidateId) {
      setStatusHistory(pushStatusHistory(candidateId, value));
    }
  };
  const copyToClipboard = (key: string, value: string) => { navigator.clipboard?.writeText(value).then(() => { setCopied(key); setTimeout(() => setCopied(null), 1500); }).catch(() => {}); };

  if (loading && !selectedCandidate) return (
    <><Header /><div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-[1px]">
      <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-lg"><Loader2 size={18} className="animate-spin text-teal-600" /><p className="text-sm font-medium text-slate-700">Loading…</p></div>
    </div></>
  );

  if (!selectedCandidate) return (
    <><Header /><div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 text-center">
      <p className="text-base font-semibold text-slate-900">Candidate not found</p>
      <p className="mt-1 text-sm text-slate-500">This submission may have been removed.</p>
      <button onClick={handleGoBack} className="mt-4 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">Back to list</button>
    </div></>
  );

  const c = selectedCandidate as any;

  const tabs = [
    { id: "profile", label: "Profile", Icon: UserRound },
    { id: "progress", label: "Progress & Status", Icon: GitBranch },
    { id: "documents", label: "Documents", Icon: FileText, count: candidateDocuments.length },
    { id: "people", label: "People Involved", Icon: UsersRound },
    { id: "notes", label: "Screening Notes", Icon: NotebookPen },
  ];

  const timeline = [
    { key: "date_of_submission", label: "Submitted", format: formatDate },
    { key: "date_profile_shared", label: "Profile Shared", format: formatDate },
    { key: "interview_date_time", label: "Interview", format: formatDateTime },
  ];

  const people = [
    { key: "recruiter", label: "Recruiter" },
    { key: "client_spoc", label: "Client SPOC" },
    { key: "laksh_spoc", label: "Laksh SPOC" },
  ];

  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-4rem)] flex-col bg-slate-50">
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-[1px]">
            <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-lg"><Loader2 size={18} className="animate-spin text-teal-600" /><p className="text-sm font-medium text-slate-700">Saving…</p></div>
          </div>
        )}

        {/* ═══ Top header bar ═══ */}
        <div className="shrink-0 border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
            <button onClick={handleGoBack} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition">
              <ArrowLeft size={15} />
            </button>

            {/* Avatar + name + meta */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-sm font-bold text-white shadow-sm">
              {getInitials(c.candidate_name)}
            </div>
            <div className="min-w-0 flex-1">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input value={c.candidate_name || ""} onChange={(e) => updateField("candidate_name", e.target.value)} className={`${inputClass} max-w-[200px]`} placeholder="Full name" />
                  <input value={c.current_city || ""} onChange={(e) => updateField("current_city", e.target.value)} className={`${inputClass} max-w-[140px]`} placeholder="City" />
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-base font-bold text-slate-900 truncate">{c.candidate_name || "Unnamed"}</h1>
                    {!isBlank(c.candidate_status) && <StatusBadge status={c.candidate_status} />}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 text-xs text-slate-500 mt-0.5">
                    {!isBlank(c.position_name) && (
                      <span className="inline-flex items-center gap-1 truncate max-w-[300px]" title={c.position_name}>
                        <Briefcase size={11} className="shrink-0 text-teal-500" />{c.position_name}
                      </span>
                    )}
                    {!isBlank(c.client_name) && (
                      <span className="inline-flex items-center gap-1">
                        <Building2 size={11} className="shrink-0 text-teal-500" />{c.client_name}
                      </span>
                    )}
                    {!isBlank(c.current_city) && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={11} className="shrink-0 text-teal-500" />{c.current_city}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Actions */}
            {isEditing ? (
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={handleCancelEdit} className="h-8 rounded-lg border border-slate-300 bg-white px-4 text-xs font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
                <button onClick={handleSave} disabled={loading} className="flex h-8 items-center gap-1.5 rounded-lg bg-teal-600 px-4 text-xs font-medium text-white hover:bg-teal-700 disabled:opacity-50">
                  {loading ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />} Save changes
                </button>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)} className="flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition">
                <Pencil size={12} /> Edit details
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="mx-4 mt-2 flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2">
            <AlertTriangle size={14} className="shrink-0 text-rose-600" />
            <p className="flex-1 text-xs text-rose-800">{error}</p>
            <button onClick={() => setError(null)} className="text-rose-500 hover:text-rose-700"><X size={14} /></button>
          </div>
        )}

        {/* ═══ Sidebar tabs + Content ═══ */}
        <div className="flex-1 overflow-hidden">
          <div className="mx-auto flex h-full max-w-7xl gap-4 px-4 py-3">

            {/* ── Sidebar nav ── */}
            <aside className="w-[220px] shrink-0 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
              <nav className="flex flex-col gap-0.5">
                {tabs.map(({ id, label, Icon, count }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition w-full ${
                      activeTab === id
                        ? "bg-teal-50 text-teal-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon size={16} className={activeTab === id ? "text-teal-600" : "text-slate-400"} />
                    <span className="flex-1">{label}</span>
                    {typeof count === "number" && count > 0 && (
                      <span className={`rounded-full px-1.5 py-px text-[10px] font-bold ${
                        activeTab === id ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500"
                      }`}>{count}</span>
                    )}
                  </button>
                ))}
              </nav>
            </aside>

            {/* ── Main content ── */}
            <main className="flex-1 min-w-0 overflow-y-auto">
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm h-full">

                {/* ══ PROFILE TAB ══ */}
                {activeTab === "profile" && (
                  <div className="p-5">
                    {/* Contact row */}
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {[
                        { key: "email", label: "Email", Icon: Mail, href: (v: string) => `mailto:${v}`, type: "email", format: (v: string) => v },
                        { key: "mobile_number", label: "Phone", Icon: Phone, href: (v: string) => `tel:${v}`, type: "tel", format: formatPhone },
                      ].map(({ key, label, Icon, href, type, format }) => {
                        const value = c[key];
                        return (
                          <div key={key} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/50 px-3.5 py-2.5">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                              <Icon size={16} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
                              {isEditing ? (
                                <input type={type} value={value || ""} onChange={(e) => updateField(key, e.target.value)} className={`${inputClass} mt-0.5 h-7 text-xs`} />
                              ) : !isBlank(value) ? (
                                <a href={href(value)} className="block truncate text-sm font-medium text-slate-800 no-underline hover:text-teal-700 mt-0.5">{format(value)}</a>
                              ) : <div className="mt-0.5"><Empty /></div>}
                            </div>
                            {!isEditing && !isBlank(value) && (
                              <button onClick={() => copyToClipboard(key, value)} title={`Copy ${label.toLowerCase()}`} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-300 hover:bg-white hover:text-slate-600 transition">
                                {copied === key ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Details grid */}
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Professional Details</h3>
                    <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                      {[
                        { key: "current_last_organization", label: "Organization", Icon: Building2, format: (v: any) => v },
                        { key: "experience", label: "Experience", Icon: Clock, format: (v: any) => `${v} years` },
                        { key: "current_city", label: "Location", Icon: MapPin, format: (v: any) => v },
                        { key: "notice_period", label: "Notice Period", Icon: Clock, format: (v: any) => `${v} days` },
                        { key: "current_ctc", label: "Current CTC", Icon: IndianRupee, format: formatCtc },
                        { key: "expected_ctc", label: "Expected CTC", Icon: IndianRupee, format: formatCtc },
                      ].map(({ key, label, format }) => {
                        const value = c[key];
                        return (
                          <div key={key}>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">{label}</p>
                            {isEditing ? (
                              <input value={value || ""} onChange={(e) => updateField(key, e.target.value)} className={`${inputClass} h-7 text-xs`} />
                            ) : !isBlank(value) ? (
                              <span className="text-sm font-medium text-slate-800">{format(value)}</span>
                            ) : <Empty />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ══ PROGRESS TAB ══ */}
                {activeTab === "progress" && (() => {
                  const cs = (c.candidate_status || "").trim();
                  const csLower = cs.toLowerCase();
                  const isNeg = csLower.includes("reject") || csLower.includes("drop") || csLower.includes("backout") || csLower.includes("dropout") || csLower === "no show" || csLower === "test not cleared";
                  const isPos = csLower.includes("select") || csLower === "joined" || csLower === "offered";

                  /* Key dates */
                  const milestones = [
                    { label: "Submitted", value: c.date_of_submission, fmt: formatDate },
                    { label: "Profile Shared", value: c.date_profile_shared, fmt: formatDate },
                    { label: "Interview", value: c.interview_date_time, fmt: formatDateTime },
                    { label: "Last Updated", value: c.candidate_status_update_date, fmt: formatDateTime },
                  ].filter((m) => !isBlank(m.value));

                  return (
                  <div className="flex h-full flex-col overflow-y-auto p-5">

                    {/* ── Current status + edit bar ── */}
                    <div className={`flex items-center justify-between rounded-xl border-2 px-4 py-2.5 mb-5 ${
                      isNeg ? "border-rose-200 bg-rose-50/50" : isPos ? "border-emerald-200 bg-emerald-50/50" : "border-teal-200 bg-teal-50/50"
                    }`}>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isNeg ? "bg-rose-100" : isPos ? "bg-emerald-100" : "bg-teal-100"}`}>
                          <GitBranch size={16} className={isNeg ? "text-rose-600" : isPos ? "text-emerald-600" : "text-teal-600"} />
                        </div>
                        {isEditing ? (
                          <Select
                            options={candidateStatusOptions} isSearchable placeholder="Status…"
                            value={candidateStatusOptions.find((o) => o.value === c.candidate_status) || null}
                            onChange={(s: { value: string; label: string } | null) => updateField("candidate_status", s?.value || "")}
                            menuPortalTarget={document.body}
                            styles={{
                              control: (b, s) => ({ ...b, minHeight: "30px", fontSize: "12px", borderRadius: "8px", width: "200px", borderColor: s.isFocused ? "#14b8a6" : "#cbd5e1", boxShadow: s.isFocused ? "0 0 0 2px rgba(20,184,166,0.1)" : "none" }),
                              menu: (b) => ({ ...b, color: "#0f172a", backgroundColor: "#fff", fontSize: "12px" }),
                              option: (b, s) => ({ ...b, fontSize: "12px", color: s.isSelected ? "#fff" : "#0f172a", backgroundColor: s.isSelected ? "#0d9488" : s.isFocused ? "#f0fdfa" : "#fff" }),
                              singleValue: (b) => ({ ...b, color: "#0f172a" }), input: (b) => ({ ...b, color: "#0f172a" }),
                              placeholder: (b) => ({ ...b, color: "#94a3b8" }), menuPortal: (b) => ({ ...b, zIndex: 70 }),
                            }}
                          />
                        ) : !isBlank(c.candidate_status) ? (
                          <div className="flex items-center gap-2 min-w-0">
                            <StatusBadge status={c.candidate_status} />
                            {!isBlank(c.candidate_status_update_date) && <span className="text-[10px] text-slate-400 whitespace-nowrap">· {formatDateTime(c.candidate_status_update_date)}</span>}
                          </div>
                        ) : <Empty />}
                      </div>
                      <div className="flex gap-4 shrink-0 text-right">
                        <div>
                          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">Position</p>
                          {isEditing ? <input value={c.position_status || ""} onChange={(e) => updateField("position_status", e.target.value)} className={`${inputClass} mt-0.5 h-6 text-[11px] w-24`} />
                          : <p className="mt-0.5 text-[11px] font-semibold text-slate-800">{!isBlank(c.position_status) ? c.position_status : "—"}</p>}
                        </div>
                        <div>
                          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">CTC</p>
                          {isEditing ? <input value={c.ctc_budget || ""} onChange={(e) => updateField("ctc_budget", e.target.value)} className={`${inputClass} mt-0.5 h-6 text-[11px] w-20`} />
                          : <p className="mt-0.5 text-[11px] font-semibold text-slate-800">{!isBlank(c.ctc_budget) ? formatCtc(c.ctc_budget) : "—"}</p>}
                        </div>
                      </div>
                    </div>

                    {/* ── Status tracker — built from statusHistory ── */}
                    {statusHistory.length > 0 && (
                      <div className="mb-5">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Status Tracker</p>
                        <div className="relative">
                          {statusHistory.map((entry, idx) => {
                            const isLatest = idx === statusHistory.length - 1;
                            const isLast = idx === statusHistory.length - 1;
                            const sLower = entry.status.toLowerCase();
                            const sNeg = sLower.includes("reject") || sLower.includes("drop") || sLower.includes("dropout") || sLower === "no show" || sLower === "test not cleared";
                            const sPos = sLower.includes("select") || sLower === "joined" || sLower === "offered";

                            return (
                              <div key={idx} className="relative flex gap-3">
                                <div className="flex flex-col items-center" style={{ width: 24 }}>
                                  {isLatest ? (
                                    <div className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 shadow-md ${
                                      sNeg ? "border-rose-400 bg-rose-500 shadow-rose-200"
                                        : sPos ? "border-emerald-400 bg-emerald-500 shadow-emerald-200"
                                        : "border-teal-400 bg-teal-500 shadow-teal-200"
                                    }`}>
                                      <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                                    </div>
                                  ) : (
                                    <div className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-teal-400 bg-teal-500">
                                      <Check size={10} strokeWidth={3} className="text-white" />
                                    </div>
                                  )}
                                  {!isLast && (
                                    <div className="w-0.5 flex-1 min-h-[8px] bg-teal-400" />
                                  )}
                                </div>
                                <div className={`flex-1 min-w-0 ${isLatest ? "pb-0" : "pb-3"}`}>
                                  <p className={`font-semibold ${isLatest ? "text-[13px]" : "text-[11px]"} ${
                                    isLatest
                                      ? sNeg ? "text-rose-600" : sPos ? "text-emerald-600" : "text-teal-700"
                                      : "text-teal-700"
                                  }`}>{entry.status}</p>
                                  <p className="text-[10px] text-slate-400 mt-px">{formatDateTime(entry.date)}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* ── Key dates ── */}
                    {milestones.length > 0 && (
                      <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">Key Dates</p>
                        <div className="grid grid-cols-2 gap-2">
                          {milestones.map((m, i) => (
                            <div key={i} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                              <Clock size={11} className="text-teal-500 shrink-0" />
                              <span className="text-[11px] font-medium text-slate-600">{m.label}:</span>
                              <span className="text-[11px] text-slate-500 ml-auto">{m.fmt(m.value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  );
                })()}

                {/* ══ DOCUMENTS TAB ══ */}
                {activeTab === "documents" && (
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Documents</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{candidateDocuments.length} file{candidateDocuments.length !== 1 ? "s" : ""} attached</p>
                      </div>
                      <button onClick={() => setShowDocumentModal(true)} className="flex h-8 items-center gap-1.5 rounded-lg bg-teal-600 px-3 text-xs font-medium text-white hover:bg-teal-700 shadow-sm transition">
                        <Plus size={13} /> Upload document
                      </button>
                    </div>
                    {candidateDocuments.length > 0 ? (
                      <div className="divide-y divide-slate-100">
                        {candidateDocuments.map((doc) => {
                          const { Icon, cls, ext } = fileStyle(doc.fileName?.includes(".") ? doc.fileName : doc.fileUrl);
                          const meta = [doc.documentType, (doc as any).uploadedAt ? formatDate((doc as any).uploadedAt) : ""].filter(Boolean).join(" · ");
                          return (
                            <div key={doc.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 group">
                              <div className={`flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg ${cls}`}>
                                <Icon size={16} />
                                <span className="mt-0.5 text-[7px] font-bold">{ext}</span>
                              </div>
                              <div className="min-w-0 flex-1">
                                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="block truncate text-sm font-medium text-slate-800 no-underline hover:text-teal-700">{doc.fileName}</a>
                                {meta && <p className="mt-0.5 text-xs text-slate-500">{meta}</p>}
                              </div>
                              <div className="flex shrink-0 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" title="Download" className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                                  <Download size={14} />
                                </a>
                                <button onClick={() => handleDeleteDocument(c.candidate_id, doc.id)} title="Delete" className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-rose-50 hover:text-rose-600">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <button onClick={() => setShowDocumentModal(true)} className="flex w-full flex-col items-center rounded-xl border-2 border-dashed border-slate-200 py-10 text-center hover:border-teal-300 hover:bg-teal-50/20 transition">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50"><Upload size={18} className="text-teal-600" /></div>
                        <span className="mt-2 text-sm font-medium text-slate-800">No documents uploaded</span>
                        <span className="mt-0.5 text-xs text-slate-500">Upload a resume or supporting document to get started</span>
                      </button>
                    )}
                  </div>
                )}

                {/* ══ PEOPLE TAB ══ */}
                {activeTab === "people" && (
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-slate-900 mb-4">People Involved</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {people.map((p) => {
                        const value = c[p.key];
                        const blank = isBlank(value);
                        return (
                          <div key={p.key} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-3.5">
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${blank ? "border-2 border-dashed border-slate-300 text-slate-300" : "bg-teal-100 text-teal-700"}`}>
                              {blank ? "–" : getInitials(value)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{p.label}</p>
                              {isEditing ? (
                                <input value={value || ""} onChange={(e) => updateField(p.key, e.target.value)} className={`${inputClass} mt-0.5 h-7 text-xs`} placeholder={`Add ${p.label.toLowerCase()}`} />
                              ) : !blank ? (
                                <p className="mt-0.5 text-sm font-medium text-slate-800">{value}</p>
                              ) : <div className="mt-0.5"><Empty /></div>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ══ NOTES TAB ══ */}
                {activeTab === "notes" && (
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Screening Notes & Feedback</h3>
                    {isEditing ? (
                      <textarea
                        value={c.screening_comments || ""}
                        onChange={(e) => updateField("screening_comments", e.target.value)}
                        placeholder="Add screening notes, candidate strengths, concerns, or follow-up points…"
                        rows={8}
                        className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/10"
                      />
                    ) : !isBlank(c.screening_comments) ? (
                      <div className="rounded-lg bg-slate-50 px-4 py-3.5">
                        <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">{c.screening_comments}</p>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-dashed border-slate-200 px-4 py-8 text-center">
                        <p className="text-sm font-medium text-slate-600">No screening notes yet</p>
                        <p className="mt-1 text-xs text-slate-400">Use Edit details to add screening notes or feedback.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* ═══ Upload modal ═══ */}
      {showDocumentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
            <div className="flex items-start justify-between px-5 pt-5">
              <div>
                <div className="text-sm font-bold text-slate-900">Upload document</div>
                <p className="mt-0.5 text-xs text-slate-500">Attach to {c.candidate_name || "candidate"}'s profile</p>
              </div>
              <button onClick={closeDocumentModal} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"><X size={16} /></button>
            </div>
            <div className="space-y-3 px-5 py-4">
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center hover:border-teal-400 hover:bg-teal-50/30">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200"><Upload size={16} className="text-teal-600" /></div>
                <span className="mt-2 text-xs font-semibold text-slate-900">Choose a file</span>
                <span className="mt-0.5 text-[10px] text-slate-500">PDF, DOC, DOCX, JPG, PNG up to 10 MB</span>
                <input type="file" className="sr-only" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) setDocumentForm((p) => ({ ...p, file: f, name: p.name || f.name.split(".")[0] })); }} />
              </label>
              {documentForm.file && (
                <div className="flex items-center gap-2 rounded-lg border border-teal-200 bg-teal-50 px-3 py-2">
                  <FileText size={14} className="shrink-0 text-teal-600" />
                  <span className="truncate text-xs text-slate-800">{documentForm.file.name}</span>
                  <button onClick={() => setDocumentForm((p) => ({ ...p, file: null }))} className="ml-auto text-slate-400 hover:text-rose-600"><X size={13} /></button>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Name</label>
                  <input type="text" placeholder="Resume_John" value={documentForm.name} onChange={(e) => setDocumentForm((p) => ({ ...p, name: e.target.value }))} className={`${inputClass} mt-1`} />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Type</label>
                  <select value={documentForm.type} onChange={(e) => setDocumentForm((p) => ({ ...p, type: e.target.value }))} className={`${inputClass} mt-1`}>
                    {["Resume", "Pan Card", "Cover Letter", "Adhaar Card", "Offer Letter", "Resignation Letter", "Academic Document", "Reference Letter", "Other"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3">
              <button onClick={closeDocumentModal} className="h-8 rounded-lg border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={handleAddDocument} disabled={!documentForm.name.trim() || !documentForm.file}
                className="flex h-8 items-center gap-1.5 rounded-lg bg-teal-600 px-3 text-xs font-medium text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300">
                <Upload size={13} /> Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubmissionGroupDetailView;