// // import { useState, useEffect } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import Header from "../components/Header";
// // import {
// //   Search,
// //   ChevronUp,
// //   ChevronDown,
// //   Building,
// //   Mail,
// //   Phone,
// //   Clock,
// //   User,
// //   ArrowUpDown,
// //   Loader,
// //   X,
// // } from "lucide-react";
// // import { submissionService } from "../services/submissionService";
// // import type { Submission, SubmissionFilters } from "../services/submissionService";

// // type TabType = "all" | "submitted" | "direct" | "approved_rm" | "approved_client";
// // type SortField = "candidate_name" | "email" | "experience" | "recruiter" | "submitted_on";
// // type SortOrder = "asc" | "desc";

// // interface GroupDetailState {
// //   groupName: string;
// //   groupBy?: "position" | "client_name" | "candidate_name" | "status";
// //   positionName?: string;
// //   clientName?: string;
// //   candidateName?: string;
// //   status?: string;
// //   filters?: Record<string, string>;
// //   searchTerm?: string;
// //   currentPage?: number;
// // }

// // const SubmissionGroupDetail = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const state = location.state as GroupDetailState;

// //   // Log state on component mount
// //   console.log("=== SubmissionGroupDetail Mounted ===");
// //   console.log("📍 Location State:", state);
// //   console.log("📍 URL Path:", location.pathname);
// //   console.log("📍 URL Search:", location.search);

// //   // Redirect if no state provided
// //   if (!state?.groupName) {
// //     console.error("❌ Invalid state - no groupName provided");
// //     console.error("📍 State received:", state);
// //     return (
// //       <div className="min-h-screen bg-gray-50 p-4">
// //         <div className="max-w-7xl mx-auto text-center py-16">
// //           <p className="text-gray-500 font-medium">Invalid group data</p>
// //           <p className="text-gray-400 text-sm mt-2">GroupName is missing from navigation state</p>
// //           <button
// //             onClick={() => navigate(-1)}
// //             className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
// //           >
// //             Go Back
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   console.log("✅ State validation passed");
// //   console.log("  - groupName:", state.groupName);
// //   console.log("  - groupBy:", state.groupBy);
// //   console.log("  - positionName:", state.positionName);
// //   console.log("  - clientName:", state.clientName);
// //   console.log("  - candidateName:", state.candidateName);
// //   console.log("  - status:", state.status);

// //   // State
// //   const [submissions, setSubmissions] = useState<Submission[]>([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [activeTab, setActiveTab] = useState<TabType>("all");
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [sortField, setSortField] = useState<SortField>("submitted_on");
// //   const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const ITEMS_PER_PAGE = 10;

// //   // Fetch submissions for the group
// //   useEffect(() => {
// //     const fetchGroupSubmissions = async () => {
// //       setLoading(true);
// //       setError(null);

// //       try {
// //         // Use the actual groupBy from state, default to position if not provided
// //         const actualGroupBy = state.groupBy || "position";

// //         console.log("📋 Fetching submissions for:", {
// //           groupName: state.groupName,
// //           groupBy: actualGroupBy,
// //           fullState: JSON.stringify(state, null, 2),
// //         });

// //         const apiFilters: SubmissionFilters = {
// //           groupBy: actualGroupBy,
// //         };

// //         console.log("🔍 API Call Parameters:", {
// //           groupName: state.groupName,
// //           actualGroupBy: actualGroupBy,
// //           filters: apiFilters,
// //         });

// //         const response = await submissionService.fetchByGroup(
// //           state.groupName,
// //           actualGroupBy,
// //           apiFilters
// //         );

// //         console.log("✅ API Response Status:", response.status);
// //         console.log("✅ API Response Data Length:", response.data?.length || 0);
// //         console.log("✅ API Response Data:", response.data);

// //         if (response.status === 200 && response.data && response.data.length > 0) {
// //           // Log first few items to check data structure
// //           console.log("📝 First submission structure:", response.data[0]);
// //           console.log("📝 Response contains", response.data.length, "submissions");

// //           // Ensure all required fields exist
// //           const validSubmissions = response.data.filter((sub: any) => sub && sub.id);
// //           console.log("✓ Valid submissions after filtering:", validSubmissions.length);

// //           if (validSubmissions.length === 0) {
// //             throw new Error("API returned data but no valid submissions with IDs");
// //           }

// //           // Fetch detailed data for each submission to get email and phone fields
// //           console.log(`🔄 Fetching details for ${validSubmissions.length} submissions...`);

// //           const detailedSubmissions = await Promise.all(
// //             validSubmissions.map(async (submission: Submission, index: number) => {
// //               try {
// //                 console.log(`  [${index + 1}/${validSubmissions.length}] Fetching details for ${submission.candidate_name} (ID: ${submission.id})`);
// //                 const detailResponse = await submissionService.fetchById(submission.id.toString());

// //                 if (detailResponse?.status === 200 && detailResponse?.data) {
// //                   const merged = {
// //                     ...submission,
// //                     email: detailResponse.data.email || submission.email || "",
// //                     mobile_number: detailResponse.data.mobile_number || submission.mobile_number || "",
// //                   };
// //                   console.log(`  ✓ ${submission.candidate_name}: email=${merged.email}, phone=${merged.mobile_number}`);
// //                   return merged;
// //                 } else {
// //                   console.warn(`  ⚠️ Unexpected response for ${submission.candidate_name}:`, detailResponse);
// //                   return submission;
// //                 }
// //               } catch (err) {
// //                 console.warn(`  ⚠️ Failed to fetch details for submission ${submission.id} (${submission.candidate_name}):`, err);
// //                 // Return the original submission if detail fetch fails
// //                 return submission;
// //               }
// //             })
// //           );

// //           console.log("📊 Detailed submissions fetched:");
// //           console.log(`  Total: ${detailedSubmissions.length}`);
// //           console.log(`  With email: ${detailedSubmissions.filter(s => s.email).length}`);
// //           console.log(`  With phone: ${detailedSubmissions.filter(s => s.mobile_number).length}`);
// //           console.log("  Sample:", detailedSubmissions.slice(0, 2));

// //           if (detailedSubmissions && detailedSubmissions.length > 0) {
// //             console.log("🎯 Setting state with", detailedSubmissions.length, "submissions");
// //             setSubmissions(detailedSubmissions);
// //             setCurrentPage(1);
// //             console.log("✅ Submissions state updated successfully");
// //           } else {
// //             throw new Error("No valid submissions after detail fetch");
// //           }
// //         } else if (!response.data || response.data.length === 0) {
// //           console.warn("⚠️ API returned empty data for groupBy:", actualGroupBy);
// //           console.warn("📍 Response Status:", response.status);
// //           console.warn("📍 Response Data:", response.data);
// //           console.warn("📍 Params were:", { groupName: state.groupName, groupBy: actualGroupBy });
// //           setSubmissions([]);
// //           setError("No submissions found for this filter. Try a different filter.");
// //         } else {
// //           console.error("❌ Unexpected response structure:", response);
// //           setSubmissions([]);
// //           setError("Unexpected response from server");
// //         }
// //       } catch (err: any) {
// //         console.error("❌ Error fetching group submissions:", err);
// //         console.error("📍 Error details:", err);
// //         setError(err?.message || "Failed to fetch submissions");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchGroupSubmissions();
// //   }, [state.groupName, state.groupBy]);

// //   // Filter submissions based on active tab and search
// //   const filteredSubmissions = submissions.filter((submission) => {
// //     // Tab filtering
// //     let tabMatch = true;
// //     if (activeTab === "submitted") {
// //       tabMatch = submission.status === "Submitted";
// //     } else if (activeTab === "direct") {
// //       tabMatch = submission.recruiter === "N/A" || submission.recruiter?.trim() === "";
// //     } else if (activeTab === "approved_rm") {
// //       tabMatch = submission.status === "approved by RM";
// //     } else if (activeTab === "approved_client") {
// //       tabMatch = submission.status === "approved by client";
// //     }
// //     // If activeTab === "all", tabMatch stays true

// //     // Search filtering
// //     const searchLower = searchTerm.toLowerCase();
// //     const searchMatch =
// //       !searchTerm ||
// //       submission.candidate_name?.toLowerCase().includes(searchLower) ||
// //       submission.email?.toLowerCase().includes(searchLower) ||
// //       submission.recruiter?.toLowerCase().includes(searchLower);

// //     const passes = tabMatch && searchMatch;

// //     // Debug logging for filtering
// //     if (!passes && submissions.length > 0) {
// //       console.log("🚫 Submission filtered out:", {
// //         candidate: submission.candidate_name,
// //         tabMatch,
// //         activeTab,
// //         status: submission.status,
// //         recruiter: submission.recruiter,
// //         searchMatch,
// //         searchTerm,
// //       });
// //     }

// //     return passes;
// //   });

// //   // Log filtering results
// //   if (submissions.length > 0 && filteredSubmissions.length === 0) {
// //     console.warn("⚠️ CRITICAL: All submissions were filtered out!");
// //     console.warn("📊 Total submissions:", submissions.length);
// //     console.warn("📊 Filtered submissions:", filteredSubmissions.length);
// //     console.warn("📊 Active tab:", activeTab);
// //     console.warn("📊 Search term:", searchTerm);
// //     console.log("First submission sample:", submissions[0]);
// //   } else if (submissions.length > 0) {
// //     console.log("✅ Filtering complete:", {
// //       totalSubmissions: submissions.length,
// //       filteredSubmissions: filteredSubmissions.length,
// //       activeTab,
// //       searchTerm,
// //     });
// //   }

// //   // Sort submissions
// //   const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
// //     let aVal: any = "";
// //     let bVal: any = "";

// //     switch (sortField) {
// //       case "candidate_name":
// //         aVal = a.candidate_name || "";
// //         bVal = b.candidate_name || "";
// //         break;
// //       case "email":
// //         aVal = a.email || "";
// //         bVal = b.email || "";
// //         break;
// //       case "experience":
// //         aVal = parseInt(a.experience as any) || 0;
// //         bVal = parseInt(b.experience as any) || 0;
// //         break;
// //       case "recruiter":
// //         aVal = a.recruiter || "";
// //         bVal = b.recruiter || "";
// //         break;
// //       case "submitted_on":
// //         aVal = new Date(a.submitted_on || 0).getTime();
// //         bVal = new Date(b.submitted_on || 0).getTime();
// //         break;
// //       default:
// //         break;
// //     }

// //     if (typeof aVal === "string") {
// //       aVal = aVal.toLowerCase();
// //       bVal = (bVal as string).toLowerCase();
// //     }

// //     if (sortOrder === "asc") {
// //       return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
// //     } else {
// //       return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
// //     }
// //   });

// //   // Pagination
// //   const totalPages = Math.ceil(sortedSubmissions.length / ITEMS_PER_PAGE);
// //   const paginatedSubmissions = sortedSubmissions.slice(
// //     (currentPage - 1) * ITEMS_PER_PAGE,
// //     currentPage * ITEMS_PER_PAGE
// //   );

// //   const handleSort = (field: SortField) => {
// //     if (sortField === field) {
// //       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
// //     } else {
// //       setSortField(field);
// //       setSortOrder("asc");
// //     }
// //   };

// //   const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
// //     <button
// //       onClick={() => handleSort(field)}
// //       className="flex items-center gap-1.5 hover:text-blue-600 transition-colors font-medium"
// //     >
// //       {label}
// //       <ArrowUpDown
// //         size={14}
// //         className={`transition-all ${
// //           sortField === field
// //             ? sortOrder === "asc"
// //               ? "rotate-180"
// //               : ""
// //             : "opacity-30"
// //         }`}
// //       />
// //     </button>
// //   );

// //   const tabs = [
// //     { id: "all", label: "All", count: submissions.length },
// //     { id: "submitted", label: "Submitted", count: submissions.filter(s => s.status === "Submitted").length },
// //     { id: "direct", label: "Direct Applicants", count: submissions.filter(s => s.recruiter === "N/A" || s.recruiter?.trim() === "").length },
// //     { id: "approved_rm", label: "Approved by RM", count: submissions.filter(s => s.status === "approved by RM").length },
// //     { id: "approved_client", label: "Approved by Client", count: submissions.filter(s => s.status === "approved by client").length },
// //   ];

// //   return (
// //     <>
// //       <Header />
// //       <div className="min-h-screen bg-gray-50 p-4 md:p-6">
// //         <div className="max-w-7xl mx-auto">
// //           {/* Back Button + Header */}
// //           <div className="mb-6 flex items-center gap-4">
// //             <button
// //               onClick={() => navigate(-1)}
// //               className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
// //             >
// //               ← Back
// //             </button>
// //           </div>

// //           {/* Top Section: Position & Client */}
// //           <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
// //             <div className="flex items-center gap-3 mb-4">
// //               <Building size={20} className="text-blue-600" />
// //               <div>
// //                 <h1 className="text-2xl font-bold text-gray-900">
// //                   {state.positionName || state.clientName || state.candidateName || state.status || state.groupName}
// //                 </h1>
// //                 {state.groupBy && (
// //                   <p className="text-sm text-gray-500 mt-1">
// //                     Grouping by: <span className="font-medium text-gray-900">{state.groupBy.replace(/_/g, ' ')}</span>
// //                   </p>
// //                 )}
// //               </div>
// //             </div>
// //             <div className="flex items-center gap-2 text-xs text-gray-600">
// //               <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
// //                 {filteredSubmissions.length} submissions
// //               </span>
// //             </div>
// //           </div>

// //           {/* Debug Info - Shows data status */}
// //           <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-xs text-blue-800">
// //             <div className="font-medium mb-1">📊 Data Status:</div>
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
// //               <div>Total: <span className="font-bold">{submissions.length}</span></div>
// //               <div>Filtered: <span className="font-bold">{filteredSubmissions.length}</span></div>
// //               <div>Tab: <span className="font-bold">{activeTab}</span></div>
// //               <div>Search: <span className="font-bold">{searchTerm || "None"}</span></div>
// //             </div>
// //           </div>

// //           {/* Error Alert */}
// //           {error && (
// //             <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center gap-2">
// //               <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
// //                 <path
// //                   fillRule="evenodd"
// //                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
// //                   clipRule="evenodd"
// //                 />
// //               </svg>
// //               <p className="text-sm text-red-800 flex-1">{error}</p>
// //               <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 p-1">
// //                 <X size={14} />
// //               </button>
// //             </div>
// //           )}

// //           {/* Loading */}
// //           {loading && (
// //             <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
// //               <div className="bg-white rounded-xl p-6 shadow-xl flex flex-col items-center gap-3">
// //                 <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-blue-600"></div>
// //                 <p className="text-sm text-gray-600 font-medium">Loading submissions…</p>
// //               </div>
// //             </div>
// //           )}

// //           {/* Tabs */}
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
// //             <div className="flex items-center gap-0 border-b border-gray-200 overflow-x-auto">
// //               {tabs.map((tab) => (
// //                 <button
// //                   key={tab.id}
// //                   onClick={() => {
// //                     setActiveTab(tab.id as TabType);
// //                     setCurrentPage(1);
// //                   }}
// //                   className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
// //                     activeTab === tab.id
// //                       ? "border-blue-600 text-blue-600 bg-blue-50/50"
// //                       : "border-transparent text-gray-600 hover:text-gray-900"
// //                   }`}
// //                 >
// //                   {tab.label}
// //                   {tab.count > 0 && (
// //                     <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
// //                       {tab.count}
// //                     </span>
// //                   )}
// //                 </button>
// //               ))}
// //             </div>

// //             {/* Search */}
// //             <div className="px-6 py-4 border-b border-gray-100">
// //               <div className="relative">
// //                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// //                 <input
// //                   type="text"
// //                   value={searchTerm}
// //                   onChange={(e) => {
// //                     setSearchTerm(e.target.value);
// //                     setCurrentPage(1);
// //                   }}
// //                   className="w-full pl-10 pr-9 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   placeholder="Search by name, email, or recruiter…"
// //                 />
// //                 {searchTerm && (
// //                   <button
// //                     onClick={() => {
// //                       setSearchTerm("");
// //                       setCurrentPage(1);
// //                     }}
// //                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
// //                   >
// //                     <X size={14} />
// //                   </button>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Table */}
// //             {filteredSubmissions.length > 0 ? (
// //               <>
// //                 <div className="overflow-x-auto">
// //                   <table className="w-full">
// //                     <thead>
// //                       <tr className="border-b border-gray-200 bg-gray-50/50">
// //                         <th className="px-3 py-2 text-left text-xs">
// //                           <SortHeader field="candidate_name" label="Name" />
// //                         </th>
// //                         <th className="px-3 py-2 text-left text-xs">
// //                           <SortHeader field="email" label="Email" />
// //                         </th>
// //                         <th className="px-3 py-2 text-left text-xs">Phone</th>
// //                         <th className="px-3 py-2 text-left text-xs">
// //                           <SortHeader field="experience" label="Experience" />
// //                         </th>
// //                         <th className="px-3 py-2 text-left text-xs">
// //                           <SortHeader field="recruiter" label="Recruiter" />
// //                         </th>
// //                         <th className="px-3 py-2 text-left text-xs">
// //                           <SortHeader field="submitted_on" label="Submitted" />
// //                         </th>
// //                         <th className="px-3 py-2 text-left text-xs">Action</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody className="divide-y divide-gray-100">
// //                       {paginatedSubmissions.map((submission) => (
// //                         <tr key={submission.id} className="hover:bg-gray-50/50 transition-colors">
// //                           <td className="px-3 py-2">
// //                             <div className="flex items-center gap-2">
// //                               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 shrink-0">
// //                                 <User size={12} className="text-blue-600" />
// //                               </div>
// //                               <div className="min-w-0">
// //                                 <div className="text-xs font-medium text-gray-900 truncate">
// //                                   {submission.candidate_name || "N/A"}
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           </td>
// //                           <td className="px-3 py-2">
// //                             <div className="text-xs text-gray-600 truncate">
// //                               <a
// //                                 href={`mailto:${submission.email}`}
// //                                 className="text-blue-600 hover:text-blue-700 hover:underline"
// //                               >
// //                                 {submission.email || "N/A"}
// //                               </a>
// //                             </div>
// //                           </td>
// //                           <td className="px-3 py-2">
// //                             <div className="flex items-center gap-1 text-xs text-gray-600">
// //                               <Phone size={12} className="text-gray-400 shrink-0" />
// //                               <span className="truncate">{submission.mobile_number || "N/A"}</span>
// //                             </div>
// //                           </td>
// //                           <td className="px-3 py-2">
// //                             <div className="text-xs text-gray-600">
// //                               {submission.experience ? `${submission.experience}y` : "N/A"}
// //                             </div>
// //                           </td>
// //                           <td className="px-3 py-2">
// //                             <div className="text-xs text-gray-600 truncate">
// //                               {submission.recruiter || "N/A"}
// //                             </div>
// //                           </td>
// //                           <td className="px-3 py-2">
// //                             <div className="text-xs text-gray-600 whitespace-nowrap">
// //                               {submission.submitted_on
// //                                 ? new Date(submission.submitted_on).toLocaleDateString("en-IN", {
// //                                     day: "2-digit",
// //                                     month: "short",
// //                                     year: "numeric",
// //                                   })
// //                                 : "N/A"}
// //                             </div>
// //                           </td>
// //                           <td className="px-3 py-2">
// //                             <button
// //                               onClick={() =>
// //                                 navigate("/candidate-tracker", {
// //                                   state: {
// //                                     submissionId: submission.id,
// //                                     candidateName: submission.candidate_name,
// //                                   },
// //                                 })
// //                               }
// //                               className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors whitespace-nowrap"
// //                             >
// //                               View Tracker
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>

// //                 {/* Pagination */}
// //                 {totalPages > 1 && (
// //                   <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
// //                     <div className="text-xs text-gray-500">
// //                       Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
// //                       {Math.min(currentPage * ITEMS_PER_PAGE, sortedSubmissions.length)} of{" "}
// //                       {sortedSubmissions.length}
// //                     </div>
// //                     <div className="flex items-center gap-1.5">
// //                       <button
// //                         onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
// //                         disabled={currentPage === 1}
// //                         className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
// //                       >
// //                         Previous
// //                       </button>

// //                       <div className="flex items-center gap-1">
// //                         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
// //                           const showPage =
// //                             page === 1 ||
// //                             page === totalPages ||
// //                             (page >= currentPage - 1 && page <= currentPage + 1);

// //                           const showEllipsis =
// //                             (page === currentPage - 2 && currentPage > 3) ||
// //                             (page === currentPage + 2 && currentPage < totalPages - 2);

// //                           if (showEllipsis) {
// //                             return (
// //                               <span key={page} className="px-1.5 text-gray-400 text-xs">
// //                                 …
// //                               </span>
// //                             );
// //                           }

// //                           if (!showPage) return null;

// //                           return (
// //                             <button
// //                               key={page}
// //                               onClick={() => setCurrentPage(page)}
// //                               className={`w-8 h-8 text-xs rounded-lg transition-colors ${
// //                                 currentPage === page
// //                                   ? "bg-blue-600 text-white font-medium"
// //                                   : "border border-gray-200 hover:bg-gray-50 text-gray-700"
// //                               }`}
// //                             >
// //                               {page}
// //                             </button>
// //                           );
// //                         })}
// //                       </div>

// //                       <button
// //                         onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
// //                         disabled={currentPage === totalPages}
// //                         className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
// //                       >
// //                         Next
// //                       </button>
// //                     </div>
// //                   </div>
// //                 )}
// //               </>
// //             ) : (
// //               <div className="text-center py-12">
// //                 <Mail size={32} className="mx-auto text-gray-300 mb-3" />
// //                 <p className="text-gray-500 font-medium">No submissions found</p>
// //                 <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default SubmissionGroupDetail;













// // import { useState, useEffect } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import Header from "../components/Header";
// // import {
// //   Search,
// //   ChevronUp,
// //   ChevronDown,
// //   Building,
// //   Mail,
// //   Phone,
// //   Clock,
// //   User,
// //   ArrowUpDown,
// //   Loader,
// //   X,
// // } from "lucide-react";
// // import { submissionService } from "../services/submissionService";
// // import type { Submission, SubmissionFilters } from "../services/submissionService";

// // type TabType = "all" | "submitted" | "direct" | "approved_rm" | "approved_client";
// // type SortField = "candidate_name" | "email" | "experience" | "recruiter" | "submitted_on";
// // type SortOrder = "asc" | "desc";

// // interface GroupDetailState {
// //   groupName: string;
// //   groupBy?: "position" | "client_name" | "candidate_name" | "status";
// //   positionName?: string;
// //   clientName?: string;
// //   candidateName?: string;
// //   status?: string;
// //   filters?: Record<string, string>;
// //   searchTerm?: string;
// //   currentPage?: number;
// // }

// // const SubmissionGroupDetail = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const state = location.state as GroupDetailState;

// //   // Log state on component mount
// //   console.log("=== SubmissionGroupDetail Mounted ===");
// //   console.log("📍 Location State:", state);
// //   console.log("📍 URL Path:", location.pathname);
// //   console.log("📍 URL Search:", location.search);

// //   // Redirect if no state provided
// //   if (!state?.groupName) {
// //     console.error("❌ Invalid state - no groupName provided");
// //     console.error("📍 State received:", state);
// //     return (
// //       <div className="min-h-screen bg-gray-50 p-4">
// //         <div className="max-w-7xl mx-auto text-center py-16">
// //           <p className="text-gray-500 font-medium">Invalid group data</p>
// //           <p className="text-gray-400 text-sm mt-2">GroupName is missing from navigation state</p>
// //           <button
// //             onClick={() => navigate(-1)}
// //             className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
// //           >
// //             Go Back
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   console.log("✅ State validation passed");
// //   console.log("  - groupName:", state.groupName);
// //   console.log("  - groupBy:", state.groupBy);
// //   console.log("  - positionName:", state.positionName);
// //   console.log("  - clientName:", state.clientName);
// //   console.log("  - candidateName:", state.candidateName);
// //   console.log("  - status:", state.status);

// //   // State
// //   const [submissions, setSubmissions] = useState<Submission[]>([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [activeTab, setActiveTab] = useState<TabType>("all");
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [sortField, setSortField] = useState<SortField>("submitted_on");
// //   const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const ITEMS_PER_PAGE = 10;

// //   // Fetch submissions for the group
// //   useEffect(() => {
// //     const fetchGroupSubmissions = async () => {
// //       setLoading(true);
// //       setError(null);

// //       try {
// //         // Use the actual groupBy from state, default to position if not provided
// //         const actualGroupBy = state.groupBy || "position";

// //         console.log("📋 Fetching submissions for:", {
// //           groupName: state.groupName,
// //           groupBy: actualGroupBy,
// //           fullState: JSON.stringify(state, null, 2),
// //         });

// //         const apiFilters: SubmissionFilters = {
// //           groupBy: actualGroupBy,
// //         };

// //         console.log("🔍 API Call Parameters:", {
// //           groupName: state.groupName,
// //           actualGroupBy: actualGroupBy,
// //           filters: apiFilters,
// //         });

// //         const response = await submissionService.fetchByGroup(
// //           state.groupName,
// //           actualGroupBy,
// //           apiFilters
// //         );

// //         console.log("✅ API Response Status:", response.status);
// //         console.log("✅ API Response Data Length:", response.data?.length || 0);
// //         console.log("✅ API Response Data:", response.data);

// //         if (response.status === 200 && response.data && response.data.length > 0) {
// //           // Log first few items to check data structure
// //           console.log("📝 First submission structure:", response.data[0]);
// //           console.log("📝 Response contains", response.data.length, "submissions");

// //           // Ensure all required fields exist
// //           const validSubmissions = response.data.filter((sub: any) => sub && sub.id);
// //           console.log("✓ Valid submissions after filtering:", validSubmissions.length);

// //           if (validSubmissions.length === 0) {
// //             throw new Error("API returned data but no valid submissions with IDs");
// //           }

// //           // Fetch detailed data for each submission to get email and phone fields
// //           console.log(`🔄 Fetching details for ${validSubmissions.length} submissions...`);

// //           const detailedSubmissions = await Promise.all(
// //             validSubmissions.map(async (submission: Submission, index: number) => {
// //               try {
// //                 console.log(`  [${index + 1}/${validSubmissions.length}] Fetching details for ${submission.candidate_name} (ID: ${submission.id})`);
// //                 const detailResponse = await submissionService.fetchById(submission.id.toString());

// //                 if (detailResponse?.status === 200 && detailResponse?.data) {
// //                   const merged = {
// //                     ...submission,
// //                     email: detailResponse.data.email || submission.email || "",
// //                     mobile_number: detailResponse.data.mobile_number || submission.mobile_number || "",
// //                   };
// //                   console.log(`  ✓ ${submission.candidate_name}: email=${merged.email}, phone=${merged.mobile_number}`);
// //                   return merged;
// //                 } else {
// //                   console.warn(`  ⚠️ Unexpected response for ${submission.candidate_name}:`, detailResponse);
// //                   return submission;
// //                 }
// //               } catch (err) {
// //                 console.warn(`  ⚠️ Failed to fetch details for submission ${submission.id} (${submission.candidate_name}):`, err);
// //                 // Return the original submission if detail fetch fails
// //                 return submission;
// //               }
// //             })
// //           );

// //           console.log("📊 Detailed submissions fetched:");
// //           console.log(`  Total: ${detailedSubmissions.length}`);
// //           console.log(`  With email: ${detailedSubmissions.filter(s => s.email).length}`);
// //           console.log(`  With phone: ${detailedSubmissions.filter(s => s.mobile_number).length}`);
// //           console.log("  Sample:", detailedSubmissions.slice(0, 2));

// //           if (detailedSubmissions && detailedSubmissions.length > 0) {
// //             console.log("🎯 Setting state with", detailedSubmissions.length, "submissions");
// //             setSubmissions(detailedSubmissions);
// //             setCurrentPage(1);
// //             console.log("✅ Submissions state updated successfully");
// //           } else {
// //             throw new Error("No valid submissions after detail fetch");
// //           }
// //         } else if (!response.data || response.data.length === 0) {
// //           console.warn("⚠️ API returned empty data for groupBy:", actualGroupBy);
// //           console.warn("📍 Response Status:", response.status);
// //           console.warn("📍 Response Data:", response.data);
// //           console.warn("📍 Params were:", { groupName: state.groupName, groupBy: actualGroupBy });
// //           setSubmissions([]);
// //           setError("No submissions found for this filter. Try a different filter.");
// //         } else {
// //           console.error("❌ Unexpected response structure:", response);
// //           setSubmissions([]);
// //           setError("Unexpected response from server");
// //         }
// //       } catch (err: any) {
// //         console.error("❌ Error fetching group submissions:", err);
// //         console.error("📍 Error details:", err);
// //         setError(err?.message || "Failed to fetch submissions");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchGroupSubmissions();
// //   }, [state.groupName, state.groupBy]);

// //   // Filter submissions based on active tab and search
// //   const filteredSubmissions = submissions.filter((submission) => {
// //     // Tab filtering
// //     let tabMatch = true;
// //     if (activeTab === "submitted") {
// //       tabMatch = submission.status === "Submitted";
// //     } else if (activeTab === "direct") {
// //       tabMatch = submission.recruiter === "N/A" || submission.recruiter?.trim() === "";
// //     } else if (activeTab === "approved_rm") {
// //       tabMatch = submission.status === "approved by RM";
// //     } else if (activeTab === "approved_client") {
// //       tabMatch = submission.status === "approved by client";
// //     }
// //     // If activeTab === "all", tabMatch stays true

// //     // Search filtering
// //     const searchLower = searchTerm.toLowerCase();
// //     const searchMatch =
// //       !searchTerm ||
// //       submission.candidate_name?.toLowerCase().includes(searchLower) ||
// //       submission.email?.toLowerCase().includes(searchLower) ||
// //       submission.recruiter?.toLowerCase().includes(searchLower);

// //     const passes = tabMatch && searchMatch;

// //     // Debug logging for filtering
// //     if (!passes && submissions.length > 0) {
// //       console.log("🚫 Submission filtered out:", {
// //         candidate: submission.candidate_name,
// //         tabMatch,
// //         activeTab,
// //         status: submission.status,
// //         recruiter: submission.recruiter,
// //         searchMatch,
// //         searchTerm,
// //       });
// //     }

// //     return passes;
// //   });

// //   // Log filtering results
// //   if (submissions.length > 0 && filteredSubmissions.length === 0) {
// //     console.warn("⚠️ CRITICAL: All submissions were filtered out!");
// //     console.warn("📊 Total submissions:", submissions.length);
// //     console.warn("📊 Filtered submissions:", filteredSubmissions.length);
// //     console.warn("📊 Active tab:", activeTab);
// //     console.warn("📊 Search term:", searchTerm);
// //     console.log("First submission sample:", submissions[0]);
// //   } else if (submissions.length > 0) {
// //     console.log("✅ Filtering complete:", {
// //       totalSubmissions: submissions.length,
// //       filteredSubmissions: filteredSubmissions.length,
// //       activeTab,
// //       searchTerm,
// //     });
// //   }

// //   // Sort submissions
// //   const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
// //     let aVal: any = "";
// //     let bVal: any = "";

// //     switch (sortField) {
// //       case "candidate_name":
// //         aVal = a.candidate_name || "";
// //         bVal = b.candidate_name || "";
// //         break;
// //       case "email":
// //         aVal = a.email || "";
// //         bVal = b.email || "";
// //         break;
// //       case "experience":
// //         aVal = parseInt(a.experience as any) || 0;
// //         bVal = parseInt(b.experience as any) || 0;
// //         break;
// //       case "recruiter":
// //         aVal = a.recruiter || "";
// //         bVal = b.recruiter || "";
// //         break;
// //       case "submitted_on":
// //         aVal = new Date(a.submitted_on || 0).getTime();
// //         bVal = new Date(b.submitted_on || 0).getTime();
// //         break;
// //       default:
// //         break;
// //     }

// //     if (typeof aVal === "string") {
// //       aVal = aVal.toLowerCase();
// //       bVal = (bVal as string).toLowerCase();
// //     }

// //     if (sortOrder === "asc") {
// //       return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
// //     } else {
// //       return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
// //     }
// //   });

// //   // Pagination
// //   const totalPages = Math.ceil(sortedSubmissions.length / ITEMS_PER_PAGE);
// //   const paginatedSubmissions = sortedSubmissions.slice(
// //     (currentPage - 1) * ITEMS_PER_PAGE,
// //     currentPage * ITEMS_PER_PAGE
// //   );

// //   const handleSort = (field: SortField) => {
// //     if (sortField === field) {
// //       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
// //     } else {
// //       setSortField(field);
// //       setSortOrder("asc");
// //     }
// //   };

// //   const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
// //     <button
// //       onClick={() => handleSort(field)}
// //       className="flex items-center gap-1.5 hover:text-blue-600 transition-colors font-medium"
// //     >
// //       {label}
// //       <ArrowUpDown
// //         size={14}
// //         className={`transition-all ${
// //           sortField === field
// //             ? sortOrder === "asc"
// //               ? "rotate-180"
// //               : ""
// //             : "opacity-30"
// //         }`}
// //       />
// //     </button>
// //   );

// //   const tabs = [
// //     { id: "all", label: "All", count: submissions.length },
// //     { id: "submitted", label: "Submitted", count: submissions.filter(s => s.status === "Submitted").length },
// //     { id: "direct", label: "Direct Applicants", count: submissions.filter(s => s.recruiter === "N/A" || s.recruiter?.trim() === "").length },
// //     { id: "approved_rm", label: "Approved by RM", count: submissions.filter(s => s.status === "approved by RM").length },
// //     { id: "approved_client", label: "Approved by Client", count: submissions.filter(s => s.status === "approved by client").length },
// //   ];

// //   return (
// //     <>
// //       <Header />
// //       <div className="min-h-screen bg-gray-50 p-4 md:p-6">
// //         <div className="max-w-7xl mx-auto">
// //           {/* Back Button + Header */}
// //           <div className="mb-6 flex items-center gap-4">
// //             <button
// //               onClick={() => navigate(-1)}
// //               className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
// //             >
// //               ← Back
// //             </button>
// //           </div>

// //           {/* Top Section: Position & Client */}
// //           <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
// //             <div className="flex items-center gap-3 mb-4">
// //               <Building size={20} className="text-blue-600" />
// //               <div>
// //                 <h1 className="text-2xl font-bold text-gray-900">
// //                   {state.positionName || state.clientName || state.candidateName || state.status || state.groupName}
// //                 </h1>
// //                 {state.groupBy && (
// //                   <p className="text-sm text-gray-500 mt-1">
// //                     Grouping by: <span className="font-medium text-gray-900">{state.groupBy.replace(/_/g, ' ')}</span>
// //                   </p>
// //                 )}
// //               </div>
// //             </div>
// //             <div className="flex items-center gap-2 text-xs text-gray-600">
// //               <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
// //                 {filteredSubmissions.length} submissions
// //               </span>
// //             </div>
// //           </div>

// //           {/* Debug Info - Shows data status */}
// //           <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-xs text-blue-800">
// //             <div className="font-medium mb-1">📊 Data Status:</div>
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
// //               <div>Total: <span className="font-bold">{submissions.length}</span></div>
// //               <div>Filtered: <span className="font-bold">{filteredSubmissions.length}</span></div>
// //               <div>Tab: <span className="font-bold">{activeTab}</span></div>
// //               <div>Search: <span className="font-bold">{searchTerm || "None"}</span></div>
// //             </div>
// //           </div>

// //           {/* Error Alert */}
// //           {error && (
// //             <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center gap-2">
// //               <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
// //                 <path
// //                   fillRule="evenodd"
// //                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
// //                   clipRule="evenodd"
// //                 />
// //               </svg>
// //               <p className="text-sm text-red-800 flex-1">{error}</p>
// //               <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 p-1">
// //                 <X size={14} />
// //               </button>
// //             </div>
// //           )}

// //           {/* Loading */}
// //           {loading && (
// //             <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
// //               <div className="bg-white rounded-xl p-6 shadow-xl flex flex-col items-center gap-3">
// //                 <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-blue-600"></div>
// //                 <p className="text-sm text-gray-600 font-medium">Loading submissions…</p>
// //               </div>
// //             </div>
// //           )}

// //           {/* Tabs */}
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
// //             <div className="flex items-center gap-0 border-b border-gray-200 overflow-x-auto">
// //               {tabs.map((tab) => (
// //                 <button
// //                   key={tab.id}
// //                   onClick={() => {
// //                     setActiveTab(tab.id as TabType);
// //                     setCurrentPage(1);
// //                   }}
// //                   className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
// //                     activeTab === tab.id
// //                       ? "border-blue-600 text-blue-600 bg-blue-50/50"
// //                       : "border-transparent text-gray-600 hover:text-gray-900"
// //                   }`}
// //                 >
// //                   {tab.label}
// //                   {tab.count > 0 && (
// //                     <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
// //                       {tab.count}
// //                     </span>
// //                   )}
// //                 </button>
// //               ))}
// //             </div>

// //             {/* Search */}
// //             <div className="px-6 py-4 border-b border-gray-100">
// //               <div className="relative">
// //                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// //                 <input
// //                   type="text"
// //                   value={searchTerm}
// //                   onChange={(e) => {
// //                     setSearchTerm(e.target.value);
// //                     setCurrentPage(1);
// //                   }}
// //                   className="w-full pl-10 pr-9 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   placeholder="Search by name, email, or recruiter…"
// //                 />
// //                 {searchTerm && (
// //                   <button
// //                     onClick={() => {
// //                       setSearchTerm("");
// //                       setCurrentPage(1);
// //                     }}
// //                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
// //                   >
// //                     <X size={14} />
// //                   </button>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Table */}
// //             {filteredSubmissions.length > 0 ? (
// //               <>
// //                 <div className="overflow-x-auto">
// //                   <table className="w-full">
// //                     <thead>
// //                       <tr className="border-b border-gray-200 bg-gray-50/50">
// //                         <th className="px-3 py-2 text-left text-xs">
// //                           <SortHeader field="candidate_name" label="Name" />
// //                         </th>
// //                         <th className="px-3 py-2 text-left text-xs">
// //                           <SortHeader field="email" label="Email" />
// //                         </th>
// //                         <th className="px-3 py-2 text-left text-xs">Phone</th>
// //                         <th className="px-3 py-2 text-left text-xs">
// //                           <SortHeader field="experience" label="Experience" />
// //                         </th>
// //                         <th className="px-3 py-2 text-left text-xs">
// //                           <SortHeader field="recruiter" label="Recruiter" />
// //                         </th>
// //                         <th className="px-3 py-2 text-left text-xs">
// //                           <SortHeader field="submitted_on" label="Submitted" />
// //                         </th>
// //                         <th className="px-3 py-2 text-left text-xs">Action</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody className="divide-y divide-gray-100">
// //                       {paginatedSubmissions.map((submission) => (
// //                         <tr key={submission.id} className="hover:bg-gray-50/50 transition-colors">
// //                           <td className="px-3 py-2">
// //                             <div className="flex items-center gap-2">
// //                               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 shrink-0">
// //                                 <User size={12} className="text-blue-600" />
// //                               </div>
// //                               <div className="min-w-0">
// //                                 <div className="text-xs font-medium text-gray-900 truncate">
// //                                   {submission.candidate_name || "N/A"}
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           </td>
// //                           <td className="px-3 py-2">
// //                             <div className="text-xs text-gray-600 truncate">
// //                               <a
// //                                 href={`mailto:${submission.email}`}
// //                                 className="text-blue-600 hover:text-blue-700 hover:underline"
// //                               >
// //                                 {submission.email || "N/A"}
// //                               </a>
// //                             </div>
// //                           </td>
// //                           <td className="px-3 py-2">
// //                             <div className="flex items-center gap-1 text-xs text-gray-600">
// //                               <Phone size={12} className="text-gray-400 shrink-0" />
// //                               <span className="truncate">{submission.mobile_number || "N/A"}</span>
// //                             </div>
// //                           </td>
// //                           <td className="px-3 py-2">
// //                             <div className="text-xs text-gray-600">
// //                               {submission.experience ? `${submission.experience}y` : "N/A"}
// //                             </div>
// //                           </td>
// //                           <td className="px-3 py-2">
// //                             <div className="text-xs text-gray-600 truncate">
// //                               {submission.recruiter || "N/A"}
// //                             </div>
// //                           </td>
// //                           <td className="px-3 py-2">
// //                             <div className="text-xs text-gray-600 whitespace-nowrap">
// //                               {submission.submitted_on
// //                                 ? new Date(submission.submitted_on).toLocaleDateString("en-IN", {
// //                                     day: "2-digit",
// //                                     month: "short",
// //                                     year: "numeric",
// //                                   })
// //                                 : "N/A"}
// //                             </div>
// //                           </td>
// //                           <td className="px-3 py-2">
// //                             <button
// //                               onClick={() =>
// //                                 navigate("/candidate-tracker", {
// //                                   state: {
// //                                     submissionId: submission.id,
// //                                     candidateName: submission.candidate_name,
// //                                   },
// //                                 })
// //                               }
// //                               className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors whitespace-nowrap"
// //                             >
// //                               View Tracker
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>

// //                 {/* Pagination */}
// //                 {totalPages > 1 && (
// //                   <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
// //                     <div className="text-xs text-gray-500">
// //                       Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
// //                       {Math.min(currentPage * ITEMS_PER_PAGE, sortedSubmissions.length)} of{" "}
// //                       {sortedSubmissions.length}
// //                     </div>
// //                     <div className="flex items-center gap-1.5">
// //                       <button
// //                         onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
// //                         disabled={currentPage === 1}
// //                         className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
// //                       >
// //                         Previous
// //                       </button>

// //                       <div className="flex items-center gap-1">
// //                         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
// //                           const showPage =
// //                             page === 1 ||
// //                             page === totalPages ||
// //                             (page >= currentPage - 1 && page <= currentPage + 1);

// //                           const showEllipsis =
// //                             (page === currentPage - 2 && currentPage > 3) ||
// //                             (page === currentPage + 2 && currentPage < totalPages - 2);

// //                           if (showEllipsis) {
// //                             return (
// //                               <span key={page} className="px-1.5 text-gray-400 text-xs">
// //                                 …
// //                               </span>
// //                             );
// //                           }

// //                           if (!showPage) return null;

// //                           return (
// //                             <button
// //                               key={page}
// //                               onClick={() => setCurrentPage(page)}
// //                               className={`w-8 h-8 text-xs rounded-lg transition-colors ${
// //                                 currentPage === page
// //                                   ? "bg-blue-600 text-white font-medium"
// //                                   : "border border-gray-200 hover:bg-gray-50 text-gray-700"
// //                               }`}
// //                             >
// //                               {page}
// //                             </button>
// //                           );
// //                         })}
// //                       </div>

// //                       <button
// //                         onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
// //                         disabled={currentPage === totalPages}
// //                         className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
// //                       >
// //                         Next
// //                       </button>
// //                     </div>
// //                   </div>
// //                 )}
// //               </>
// //             ) : (
// //               <div className="text-center py-12">
// //                 <Mail size={32} className="mx-auto text-gray-300 mb-3" />
// //                 <p className="text-gray-500 font-medium">No submissions found</p>
// //                 <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default SubmissionGroupDetail;










// // import { useState, useEffect } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import Header from "../components/Header";
// // import {
// //   Search,
// //   ChevronUp,
// //   ChevronDown,
// //   Building,
// //   Mail,
// //   Phone,
// //   Clock,
// //   User,
// //   ArrowUpDown,
// //   Loader,
// //   X,
// // } from "lucide-react";
// // import { submissionService } from "../services/submissionService";
// // import type { Submission, SubmissionFilters } from "../services/submissionService";

// // type TabType = "all" | "submitted" | "direct" | "approved_rm" | "approved_client";
// // type SortField = "candidate_name" | "email" | "experience" | "recruiter" | "submitted_on";
// // type SortOrder = "asc" | "desc";

// // interface GroupDetailState {
// //   groupName: string;
// //   groupBy?: "position" | "client_name" | "candidate_name" | "status";
// //   positionName?: string;
// //   clientName?: string;
// //   candidateName?: string;
// //   status?: string;
// //   filters?: Record<string, string>;
// //   searchTerm?: string;
// //   currentPage?: number;
// // }

// // const SubmissionGroupDetail = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const state = location.state as GroupDetailState;

// //   // Log state on component mount
// //   console.log("=== SubmissionGroupDetail Mounted ===");
// //   console.log("📍 Location State:", state);
// //   console.log("📍 URL Path:", location.pathname);
// //   console.log("📍 URL Search:", location.search);

// //   // Redirect if no state provided
// //   if (!state?.groupName) {
// //     console.error("❌ Invalid state - no groupName provided");
// //     console.error("📍 State received:", state);
// //     return (
// //       <div className="min-h-screen bg-gray-50 p-4">
// //         <div className="max-w-7xl mx-auto text-center py-16">
// //           <p className="text-gray-500 font-medium">Invalid group data</p>
// //           <p className="text-gray-400 text-sm mt-2">GroupName is missing from navigation state</p>
// //           <button
// //             onClick={() => navigate(-1)}
// //             className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
// //           >
// //             Go Back
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   console.log("✅ State validation passed");
// //   console.log("  - groupName:", state.groupName);
// //   console.log("  - groupBy:", state.groupBy);
// //   console.log("  - positionName:", state.positionName);
// //   console.log("  - clientName:", state.clientName);
// //   console.log("  - candidateName:", state.candidateName);
// //   console.log("  - status:", state.status);

// //   // State
// //   const [submissions, setSubmissions] = useState<Submission[]>([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [activeTab, setActiveTab] = useState<TabType>("all");
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [sortField, setSortField] = useState<SortField>("submitted_on");
// //   const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const ITEMS_PER_PAGE = 10;

// //   // Fetch submissions for the group
// //   useEffect(() => {
// //     const fetchGroupSubmissions = async () => {
// //       setLoading(true);
// //       setError(null);

// //       try {
// //         // Use the actual groupBy from state, default to position if not provided
// //         const actualGroupBy = state.groupBy || "position";

// //         console.log("📋 Fetching submissions for:", {
// //           groupName: state.groupName,
// //           groupBy: actualGroupBy,
// //           fullState: JSON.stringify(state, null, 2),
// //         });

// //         const apiFilters: SubmissionFilters = {
// //           groupBy: actualGroupBy,
// //         };

// //         console.log("🔍 API Call Parameters:", {
// //           groupName: state.groupName,
// //           actualGroupBy: actualGroupBy,
// //           filters: apiFilters,
// //         });

// //         const response = await submissionService.fetchByGroup(
// //           state.groupName,
// //           actualGroupBy,
// //           apiFilters
// //         );

// //         console.log("✅ API Response Status:", response.status);
// //         console.log("✅ API Response Data Length:", response.data?.length || 0);
// //         console.log("✅ API Response Data:", response.data);

// //         if (response.status === 200 && response.data && response.data.length > 0) {
// //           // Log first few items to check data structure
// //           console.log("📝 First submission structure:", response.data[0]);
// //           console.log("📝 Response contains", response.data.length, "submissions");

// //           // Ensure all required fields exist
// //           const validSubmissions = response.data.filter((sub: any) => sub && sub.id);
// //           console.log("✓ Valid submissions after filtering:", validSubmissions.length);

// //           if (validSubmissions.length === 0) {
// //             throw new Error("API returned data but no valid submissions with IDs");
// //           }

// //           // Fetch detailed data for each submission to get email and phone fields
// //           console.log(`🔄 Fetching details for ${validSubmissions.length} submissions...`);

// //           const detailedSubmissions = await Promise.all(
// //             validSubmissions.map(async (submission: Submission, index: number) => {
// //               try {
// //                 console.log(`  [${index + 1}/${validSubmissions.length}] Fetching details for ${submission.candidate_name} (ID: ${submission.id})`);
// //                 const detailResponse = await submissionService.fetchById(submission.id.toString());

// //                 if (detailResponse?.status === 200 && detailResponse?.data) {
// //                   const merged = {
// //                     ...submission,
// //                     email: detailResponse.data.email || submission.email || "",
// //                     mobile_number: detailResponse.data.mobile_number || submission.mobile_number || "",
// //                   };
// //                   console.log(`  ✓ ${submission.candidate_name}: email=${merged.email}, phone=${merged.mobile_number}`);
// //                   return merged;
// //                 } else {
// //                   console.warn(`  ⚠️ Unexpected response for ${submission.candidate_name}:`, detailResponse);
// //                   return submission;
// //                 }
// //               } catch (err) {
// //                 console.warn(`  ⚠️ Failed to fetch details for submission ${submission.id} (${submission.candidate_name}):`, err);
// //                 // Return the original submission if detail fetch fails
// //                 return submission;
// //               }
// //             })
// //           );

// //           console.log("📊 Detailed submissions fetched:");
// //           console.log(`  Total: ${detailedSubmissions.length}`);
// //           console.log(`  With email: ${detailedSubmissions.filter(s => s.email).length}`);
// //           console.log(`  With phone: ${detailedSubmissions.filter(s => s.mobile_number).length}`);
// //           console.log("  Sample:", detailedSubmissions.slice(0, 2));

// //           if (detailedSubmissions && detailedSubmissions.length > 0) {
// //             console.log("🎯 Setting state with", detailedSubmissions.length, "submissions");
// //             setSubmissions(detailedSubmissions);
// //             setCurrentPage(1);
// //             console.log("✅ Submissions state updated successfully");
// //           } else {
// //             throw new Error("No valid submissions after detail fetch");
// //           }
// //         } else if (!response.data || response.data.length === 0) {
// //           console.warn("⚠️ API returned empty data for groupBy:", actualGroupBy);
// //           console.warn("📍 Response Status:", response.status);
// //           console.warn("📍 Response Data:", response.data);
// //           console.warn("📍 Params were:", { groupName: state.groupName, groupBy: actualGroupBy });
// //           setSubmissions([]);
// //           setError("No submissions found for this filter. Try a different filter.");
// //         } else {
// //           console.error("❌ Unexpected response structure:", response);
// //           setSubmissions([]);
// //           setError("Unexpected response from server");
// //         }
// //       } catch (err: any) {
// //         console.error("❌ Error fetching group submissions:", err);
// //         console.error("📍 Error details:", err);
// //         setError(err?.message || "Failed to fetch submissions");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchGroupSubmissions();
// //   }, [state.groupName, state.groupBy]);

// //   // Filter submissions based on active tab and search
// //   const filteredSubmissions = submissions.filter((submission) => {
// //     // Tab filtering
// //     let tabMatch = true;
// //     if (activeTab === "submitted") {
// //       tabMatch = submission.status === "Submitted";
// //     } else if (activeTab === "direct") {
// //       tabMatch = submission.recruiter === "N/A" || submission.recruiter?.trim() === "";
// //     } else if (activeTab === "approved_rm") {
// //       tabMatch = submission.status === "approved by RM";
// //     } else if (activeTab === "approved_client") {
// //       tabMatch = submission.status === "approved by client";
// //     }
// //     // If activeTab === "all", tabMatch stays true

// //     // Search filtering
// //     const searchLower = searchTerm.toLowerCase();
// //     const searchMatch =
// //       !searchTerm ||
// //       submission.candidate_name?.toLowerCase().includes(searchLower) ||
// //       submission.email?.toLowerCase().includes(searchLower) ||
// //       submission.recruiter?.toLowerCase().includes(searchLower);

// //     const passes = tabMatch && searchMatch;

// //     // Debug logging for filtering
// //     if (!passes && submissions.length > 0) {
// //       console.log("🚫 Submission filtered out:", {
// //         candidate: submission.candidate_name,
// //         tabMatch,
// //         activeTab,
// //         status: submission.status,
// //         recruiter: submission.recruiter,
// //         searchMatch,
// //         searchTerm,
// //       });
// //     }

// //     return passes;
// //   });

// //   // Log filtering results
// //   if (submissions.length > 0 && filteredSubmissions.length === 0) {
// //     console.warn("⚠️ CRITICAL: All submissions were filtered out!");
// //     console.warn("📊 Total submissions:", submissions.length);
// //     console.warn("📊 Filtered submissions:", filteredSubmissions.length);
// //     console.warn("📊 Active tab:", activeTab);
// //     console.warn("📊 Search term:", searchTerm);
// //     console.log("First submission sample:", submissions[0]);
// //   } else if (submissions.length > 0) {
// //     console.log("✅ Filtering complete:", {
// //       totalSubmissions: submissions.length,
// //       filteredSubmissions: filteredSubmissions.length,
// //       activeTab,
// //       searchTerm,
// //     });
// //   }

// //   // Sort submissions
// //   const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
// //     let aVal: any = "";
// //     let bVal: any = "";

// //     switch (sortField) {
// //       case "candidate_name":
// //         aVal = a.candidate_name || "";
// //         bVal = b.candidate_name || "";
// //         break;
// //       case "email":
// //         aVal = a.email || "";
// //         bVal = b.email || "";
// //         break;
// //       case "experience":
// //         aVal = parseInt(a.experience as any) || 0;
// //         bVal = parseInt(b.experience as any) || 0;
// //         break;
// //       case "recruiter":
// //         aVal = a.recruiter || "";
// //         bVal = b.recruiter || "";
// //         break;
// //       case "submitted_on":
// //         aVal = new Date(a.submitted_on || 0).getTime();
// //         bVal = new Date(b.submitted_on || 0).getTime();
// //         break;
// //       default:
// //         break;
// //     }

// //     if (typeof aVal === "string") {
// //       aVal = aVal.toLowerCase();
// //       bVal = (bVal as string).toLowerCase();
// //     }

// //     if (sortOrder === "asc") {
// //       return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
// //     } else {
// //       return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
// //     }
// //   });

// //   // Pagination
// //   const totalPages = Math.ceil(sortedSubmissions.length / ITEMS_PER_PAGE);
// //   const paginatedSubmissions = sortedSubmissions.slice(
// //     (currentPage - 1) * ITEMS_PER_PAGE,
// //     currentPage * ITEMS_PER_PAGE
// //   );

// //   const handleSort = (field: SortField) => {
// //     if (sortField === field) {
// //       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
// //     } else {
// //       setSortField(field);
// //       setSortOrder("asc");
// //     }
// //   };

// //   const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
// //     <button
// //       onClick={() => handleSort(field)}
// //       className="flex items-center gap-1.5 text-gray-700 hover:text-blue-600 transition-colors font-medium"
// //     >
// //       {label}
      
// //     </button>
// //   );

// //   const tabs = [
// //     { id: "all", label: "All", count: submissions.length },
// //     { id: "submitted", label: "Submitted", count: submissions.filter(s => s.status === "Submitted").length },
// //     { id: "direct", label: "Direct Applicants", count: submissions.filter(s => s.recruiter === "N/A" || s.recruiter?.trim() === "").length },
// //     { id: "approved_rm", label: "Approved by RM", count: submissions.filter(s => s.status === "approved by RM").length },
// //     { id: "approved_client", label: "Approved by Client", count: submissions.filter(s => s.status === "approved by client").length },
// //   ];

// //   return (
// //     <>
// //       <Header />
// //       <div className="min-h-screen bg-gray-50 p-4 md:p-6">
// //         <div className="max-w-7xl mx-auto">
// //           {/* Back Button + Header */}
// //           <div className="mb-6 flex items-center gap-4">
// //             <button
// //               onClick={() => navigate(-1)}
// //               className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
// //             >
// //               ← Back
// //             </button>
// //           </div>

// //           {/* Top Section: Position & Client */}
// //           <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
// //             <div className="flex items-center gap-3 mb-4">
// //               <Building size={20} className="text-blue-600" />
// //               <div>
// //                 <h1 className="text-2xl font-bold text-gray-900">
// //                   {state.positionName || state.clientName || state.candidateName || state.status || state.groupName}
// //                 </h1>
// //                 {state.groupBy && (
// //                   <p className="text-sm text-gray-500 mt-1">
// //                     Grouping by: <span className="font-medium text-gray-900">{state.groupBy.replace(/_/g, ' ')}</span>
// //                   </p>
// //                 )}
// //               </div>
// //             </div>
// //             <div className="flex items-center gap-2 text-xs text-gray-600">
// //               <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
// //                 {filteredSubmissions.length} submissions
// //               </span>
// //             </div>
// //           </div>

// //           {/* Debug Info - Shows data status */}
// //           {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-xs text-blue-800">
// //             <div className="font-medium mb-1">📊 Data Status:</div>
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
// //               <div>Total: <span className="font-bold">{submissions.length}</span></div>
// //               <div>Filtered: <span className="font-bold">{filteredSubmissions.length}</span></div>
// //               <div>Tab: <span className="font-bold">{activeTab}</span></div>
// //               <div>Search: <span className="font-bold">{searchTerm || "None"}</span></div>
// //             </div>
// //           </div> */}

// //           {/* Error Alert */}
// //           {error && (
// //             <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center gap-2">
// //               <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
// //                 <path
// //                   fillRule="evenodd"
// //                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
// //                   clipRule="evenodd"
// //                 />
// //               </svg>
// //               <p className="text-sm text-red-800 flex-1">{error}</p>
// //               <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 p-1">
// //                 <X size={14} />
// //               </button>
// //             </div>
// //           )}

// //           {/* Loading */}
// //           {loading && (
// //             <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
// //               <div className="bg-white rounded-xl p-6 shadow-xl flex flex-col items-center gap-3">
// //                 <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-blue-600"></div>
// //                 <p className="text-sm text-gray-600 font-medium">Loading submissions…</p>
// //               </div>
// //             </div>
// //           )}

// //           {/* Tabs */}
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
// //             <div className="flex items-center gap-0 border-b border-gray-200 overflow-x-auto">
// //               {tabs.map((tab) => (
// //                 <button
// //                   key={tab.id}
// //                   onClick={() => {
// //                     setActiveTab(tab.id as TabType);
// //                     setCurrentPage(1);
// //                   }}
// //                   className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
// //                     activeTab === tab.id
// //                       ? "border-blue-600 text-blue-600 bg-blue-50/50"
// //                       : "border-transparent text-gray-600 hover:text-gray-900"
// //                   }`}
// //                 >
// //                   {tab.label}
// //                   {tab.count > 0 && (
// //                     <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
// //                       {tab.count}
// //                     </span>
// //                   )}
// //                 </button>
// //               ))}
// //             </div>

// //             {/* Search */}
// //             <div className="px-6 py-4 border-b border-gray-100">
// //               <div className="relative">
// //                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// //                 <input
// //                   type="text"
// //                   value={searchTerm}
// //                   onChange={(e) => {
// //                     setSearchTerm(e.target.value);
// //                     setCurrentPage(1);
// //                   }}
// //                   className="w-full pl-10 pr-9 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   placeholder="Search by name, email, or recruiter…"
// //                 />
// //                 {searchTerm && (
// //                   <button
// //                     onClick={() => {
// //                       setSearchTerm("");
// //                       setCurrentPage(1);
// //                     }}
// //                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
// //                   >
// //                     <X size={14} />
// //                   </button>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Table */}
// //             {filteredSubmissions.length > 0 ? (
// //               <>
// //                 <div className="overflow-x-auto">
// //                   <table className="w-full">
// //                     <thead>
// //                       <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-700">
// //                         <th className="px-3 py-2 text-left text-xs">
// //                           <SortHeader field="candidate_name" label="Name" />
// //                         </th>
// //                         <th className="px-3 py-2 text-left text-xs">
// //                           <SortHeader field="email" label="Email" />
// //                         </th>
// //                         <th className="px-3 py-2 text-left text-xs">Phone</th>
// //                         {/* <th className="px-3 py-2 text-left text-xs">
// //                           <SortHeader field="experience" label="Experience" />
// //                         </th> */}
// //                         <th className="px-3 py-2 text-left text-xs">
// //                           <SortHeader field="recruiter" label="Recruiter" />
// //                         </th>
// //                         <th className="px-3 py-2 text-left text-xs">
// //                           <SortHeader field="submitted_on" label="Submitted" />
// //                         </th>
// //                         <th className="px-3 py-2 text-left text-xs">Action</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody className="divide-y divide-gray-100">
// //                       {paginatedSubmissions.map((submission) => (
// //                         <tr
// //                           key={submission.id}
// //                           className="hover:bg-gray-50/50 transition-colors cursor-pointer"
// //                           onClick={() => {
// //                             console.log("🔗 Row clicked for submission:", submission.id, submission.candidate_name);
// //                             navigate(`/submission-group-detail/${submission.id}`, {
// //                               state: {
// //                                 fromGroupDetail: true,
// //                                 groupName: state.groupName,
// //                                 groupBy: state.groupBy,
// //                                 positionName: state.positionName,
// //                                 clientName: state.clientName,
// //                                 candidateName: state.candidateName,
// //                                 status: state.status,
// //                                 filters: state.filters,
// //                                 searchTerm: state.searchTerm,
// //                                 currentPage: currentPage,
// //                               },
// //                             });
// //                           }}
// //                         >
// //                           <td className="px-3 py-2">
// //                             <div className="flex items-center gap-2">
// //                               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 shrink-0">
// //                                 <User size={12} className="text-blue-600" />
// //                               </div>
// //                               <div className="min-w-0">
// //                                 <div className="text-xs font-medium text-gray-900 truncate">
// //                                   {submission.candidate_name || "N/A"}
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           </td>
// //                           <td className="px-3 py-2">
// //                             <div className="text-xs text-gray-600 truncate">
// //                               <a
// //                                 href={`mailto:${submission.email}`}
// //                                 className="text-blue-600 hover:text-blue-700 hover:underline"
// //                               >
// //                                 {submission.email || "N/A"}
// //                               </a>
// //                             </div>
// //                           </td>
// //                           <td className="px-3 py-2">
// //                             <div className="flex items-center gap-1 text-xs text-gray-600">
// //                               <Phone size={12} className="text-gray-400 shrink-0" />
// //                               <span className="truncate">{submission.mobile_number || "N/A"}</span>
// //                             </div>
// //                           </td>
// //                           {/* <td className="px-3 py-2">
// //                             <div className="text-xs text-gray-600">
// //                               {submission.experience ? `${submission.experience}y` : "N/A"}
// //                             </div>
// //                           </td> */}
// //                           <td className="px-3 py-2">
// //                             <div className="text-xs text-gray-600 truncate">
// //                               {submission.recruiter || "N/A"}
// //                             </div>
// //                           </td>
// //                           <td className="px-3 py-2">
// //                             <div className="text-xs text-gray-600 whitespace-nowrap">
// //                               {submission.submitted_on
// //                                 ? new Date(submission.submitted_on).toLocaleDateString("en-IN", {
// //                                     day: "2-digit",
// //                                     month: "short",
// //                                     year: "numeric",
// //                                   })
// //                                 : "N/A"}
// //                             </div>
// //                           </td>
// //                           <td className="px-3 py-2">
// //                             <button
// //                               onClick={() =>
// //                                 navigate("/candidate-tracker", {
// //                                   state: {
// //                                     submissionId: submission.id,
// //                                     candidateName: submission.candidate_name,
// //                                   },
// //                                 })
// //                               }
// //                               className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors whitespace-nowrap"
// //                             >
// //                               View Tracker
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>

// //                 {/* Pagination */}
// //                 {totalPages > 1 && (
// //                   <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
// //                     <div className="text-xs text-gray-500">
// //                       Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
// //                       {Math.min(currentPage * ITEMS_PER_PAGE, sortedSubmissions.length)} of{" "}
// //                       {sortedSubmissions.length}
// //                     </div>
// //                     <div className="flex items-center gap-1.5">
// //                       <button
// //                         onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
// //                         disabled={currentPage === 1}
// //                         className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
// //                       >
// //                         Previous
// //                       </button>

// //                       <div className="flex items-center gap-1">
// //                         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
// //                           const showPage =
// //                             page === 1 ||
// //                             page === totalPages ||
// //                             (page >= currentPage - 1 && page <= currentPage + 1);

// //                           const showEllipsis =
// //                             (page === currentPage - 2 && currentPage > 3) ||
// //                             (page === currentPage + 2 && currentPage < totalPages - 2);

// //                           if (showEllipsis) {
// //                             return (
// //                               <span key={page} className="px-1.5 text-gray-400 text-xs">
// //                                 …
// //                               </span>
// //                             );
// //                           }

// //                           if (!showPage) return null;

// //                           return (
// //                             <button
// //                               key={page}
// //                               onClick={() => setCurrentPage(page)}
// //                               className={`w-8 h-8 text-xs rounded-lg transition-colors ${
// //                                 currentPage === page
// //                                   ? "bg-blue-600 text-white font-medium"
// //                                   : "border border-gray-200 hover:bg-gray-50 text-gray-700"
// //                               }`}
// //                             >
// //                               {page}
// //                             </button>
// //                           );
// //                         })}
// //                       </div>

// //                       <button
// //                         onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
// //                         disabled={currentPage === totalPages}
// //                         className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
// //                       >
// //                         Next
// //                       </button>
// //                     </div>
// //                   </div>
// //                 )}
// //               </>
// //             ) : (
// //               <div className="text-center py-12">
// //                 <Mail size={32} className="mx-auto text-gray-300 mb-3" />
// //                 <p className="text-gray-500 font-medium">No submissions found</p>
// //                 <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default SubmissionGroupDetail;





// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import {
//   Search,
//   ChevronUp,
//   ChevronDown,
//   Building,
//   Mail,
//   Phone,
//   Clock,
//   User,
//   ArrowUpDown,
//   Loader,
//   X,
// } from "lucide-react";
// import { submissionService } from "../services/submissionService";
// import type { Submission, SubmissionFilters } from "../services/submissionService";

// type TabType = "all" | "submitted" | "direct" | "approved_rm" | "approved_client";
// type SortField = "candidate_name" | "email" | "experience" | "recruiter" | "submitted_on";
// type SortOrder = "asc" | "desc";

// interface GroupDetailState {
//   groupName: string;
//   groupBy?: "position" | "client_name" | "candidate_name" | "status";
//   positionName?: string;
//   clientName?: string;
//   candidateName?: string;
//   status?: string;
//   filters?: Record<string, string>;
//   searchTerm?: string;
//   currentPage?: number;
// }

// const SubmissionGroupDetail = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const state = location.state as GroupDetailState | null;

//   // State (all hooks must run before any early return)
//   const [submissions, setSubmissions] = useState<Submission[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<TabType>("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortField, setSortField] = useState<SortField>("submitted_on");
//   const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const ITEMS_PER_PAGE = 10;

//   // Fetch submissions for the group
//   useEffect(() => {
//     if (!state?.groupName) return;

//     const fetchGroupSubmissions = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const actualGroupBy = state.groupBy || "position";

//         const apiFilters: SubmissionFilters = {
//           groupBy: actualGroupBy,
//         };

//         const response = await submissionService.fetchByGroup(
//           state.groupName,
//           actualGroupBy,
//           apiFilters
//         );

//         if (response.status === 200 && response.data && response.data.length > 0) {
//           const validSubmissions = response.data.filter((sub: any) => sub && sub.id);

//           if (validSubmissions.length === 0) {
//             throw new Error("API returned data but no valid submissions with IDs");
//           }

//           // Fetch detailed data for each submission to get email and phone fields
//           const detailedSubmissions = await Promise.all(
//             validSubmissions.map(async (submission: Submission) => {
//               try {
//                 const detailResponse = await submissionService.fetchById(submission.id.toString());

//                 if (detailResponse?.status === 200 && detailResponse?.data) {
//                   return {
//                     ...submission,
//                     email: detailResponse.data.email || submission.email || "",
//                     mobile_number: detailResponse.data.mobile_number || submission.mobile_number || "",
//                   };
//                 }
//                 return submission;
//               } catch (err) {
//                 console.warn(`Failed to fetch details for submission ${submission.id}:`, err);
//                 return submission;
//               }
//             })
//           );

//           if (detailedSubmissions.length > 0) {
//             setSubmissions(detailedSubmissions);
//             setCurrentPage(1);
//           } else {
//             throw new Error("No valid submissions after detail fetch");
//           }
//         } else if (!response.data || response.data.length === 0) {
//           setSubmissions([]);
//           setError("No submissions found for this filter. Try a different filter.");
//         } else {
//           setSubmissions([]);
//           setError("Unexpected response from server");
//         }
//       } catch (err: any) {
//         console.error("Error fetching group submissions:", err);
//         setError(err?.message || "Failed to fetch submissions");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGroupSubmissions();
//   }, [state?.groupName, state?.groupBy]);

//   // Redirect if no state provided (after hooks, to respect the rules of hooks)
//   if (!state?.groupName) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-4">
//         <div className="max-w-7xl mx-auto text-center py-16">
//           <p className="text-gray-500 font-medium">Invalid group data</p>
//           <p className="text-gray-400 text-sm mt-2">GroupName is missing from navigation state</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Open the candidate detail page (used by row click and View Tracker)
//   const openCandidateDetail = (submission: Submission) => {
//     navigate(`/submission-group-detail/${submission.id}`, {
//       state: {
//         fromGroupDetail: true,
//         groupName: state.groupName,
//         groupBy: state.groupBy,
//         positionName: state.positionName,
//         clientName: state.clientName,
//         candidateName: state.candidateName,
//         status: state.status,
//         filters: state.filters,
//         searchTerm: state.searchTerm,
//         currentPage: state.currentPage,
//       },
//     });
//   };

//   // Filter submissions based on active tab and search
//   const filteredSubmissions = submissions.filter((submission) => {
//     let tabMatch = true;
//     if (activeTab === "submitted") {
//       tabMatch = submission.status === "Submitted";
//     } else if (activeTab === "direct") {
//       tabMatch = submission.recruiter === "N/A" || submission.recruiter?.trim() === "";
//     } else if (activeTab === "approved_rm") {
//       tabMatch = submission.status === "approved by RM";
//     } else if (activeTab === "approved_client") {
//       tabMatch = submission.status === "approved by client";
//     }

//     const searchLower = searchTerm.toLowerCase();
//     const searchMatch =
//       !searchTerm ||
//       submission.candidate_name?.toLowerCase().includes(searchLower) ||
//       submission.email?.toLowerCase().includes(searchLower) ||
//       submission.recruiter?.toLowerCase().includes(searchLower);

//     return tabMatch && searchMatch;
//   });

//   // Sort submissions
//   const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
//     let aVal: any = "";
//     let bVal: any = "";

//     switch (sortField) {
//       case "candidate_name":
//         aVal = a.candidate_name || "";
//         bVal = b.candidate_name || "";
//         break;
//       case "email":
//         aVal = a.email || "";
//         bVal = b.email || "";
//         break;
//       case "experience":
//         aVal = parseInt(a.experience as any) || 0;
//         bVal = parseInt(b.experience as any) || 0;
//         break;
//       case "recruiter":
//         aVal = a.recruiter || "";
//         bVal = b.recruiter || "";
//         break;
//       case "submitted_on":
//         aVal = new Date(a.submitted_on || 0).getTime();
//         bVal = new Date(b.submitted_on || 0).getTime();
//         break;
//       default:
//         break;
//     }

//     if (typeof aVal === "string") {
//       aVal = aVal.toLowerCase();
//       bVal = (bVal as string).toLowerCase();
//     }

//     if (sortOrder === "asc") {
//       return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
//     } else {
//       return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
//     }
//   });

//   // Pagination
//   const totalPages = Math.ceil(sortedSubmissions.length / ITEMS_PER_PAGE);
//   const paginatedSubmissions = sortedSubmissions.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const handleSort = (field: SortField) => {
//     if (sortField === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortField(field);
//       setSortOrder("asc");
//     }
//   };

//   const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
//     <button
//       onClick={() => handleSort(field)}
//       className="flex items-center gap-1.5 text-gray-700 hover:text-blue-600 transition-colors font-medium"
//     >
//       {label}
//     </button>
//   );

//   const tabs = [
//     { id: "all", label: "All", count: submissions.length },
//     { id: "submitted", label: "Submitted", count: submissions.filter((s) => s.status === "Submitted").length },
//     {
//       id: "direct",
//       label: "Direct Applicants",
//       count: submissions.filter((s) => s.recruiter === "N/A" || s.recruiter?.trim() === "").length,
//     },
//     { id: "approved_rm", label: "Approved by RM", count: submissions.filter((s) => s.status === "approved by RM").length },
//     {
//       id: "approved_client",
//       label: "Approved by Client",
//       count: submissions.filter((s) => s.status === "approved by client").length,
//     },
//   ];

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//         <div className="max-w-7xl mx-auto">
//           {/* Back Button + Header */}
//           <div className="mb-6 flex items-center gap-4">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
//             >
//               ← Back
//             </button>
//           </div>

//           {/* Top Section: Position & Client */}
//           <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
//             <div className="flex items-center gap-3 mb-4">
//               <Building size={20} className="text-blue-600" />
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   {state.positionName || state.clientName || state.candidateName || state.status || state.groupName}
//                 </h1>
//                 {state.groupBy && (
//                   <p className="text-sm text-gray-500 mt-1">
//                     Grouping by: <span className="font-medium text-gray-900">{state.groupBy.replace(/_/g, " ")}</span>
//                   </p>
//                 )}
//               </div>
//             </div>
//             <div className="flex items-center gap-2 text-xs text-gray-600">
//               <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
//                 {filteredSubmissions.length} submissions
//               </span>
//             </div>
//           </div>

//           {/* Error Alert */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center gap-2">
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

//           {/* Loading */}
//           {loading && (
//             <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//               <div className="bg-white rounded-xl p-6 shadow-xl flex flex-col items-center gap-3">
//                 <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-blue-600"></div>
//                 <p className="text-sm text-gray-600 font-medium">Loading submissions…</p>
//               </div>
//             </div>
//           )}

//           {/* Tabs */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
//             <div className="flex items-center gap-0 border-b border-gray-200 overflow-x-auto">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => {
//                     setActiveTab(tab.id as TabType);
//                     setCurrentPage(1);
//                   }}
//                   className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
//                     activeTab === tab.id
//                       ? "border-blue-600 text-blue-600 bg-blue-50/50"
//                       : "border-transparent text-gray-600 hover:text-gray-900"
//                   }`}
//                 >
//                   {tab.label}
//                   {tab.count > 0 && (
//                     <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
//                       {tab.count}
//                     </span>
//                   )}
//                 </button>
//               ))}
//             </div>

//             {/* Search */}
//             <div className="px-6 py-4 border-b border-gray-100">
//               <div className="relative">
//                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="w-full pl-10 pr-9 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Search by name, email, or recruiter…"
//                 />
//                 {searchTerm && (
//                   <button
//                     onClick={() => {
//                       setSearchTerm("");
//                       setCurrentPage(1);
//                     }}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     <X size={14} />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Table */}
//             {filteredSubmissions.length > 0 ? (
//               <>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-700">
//                         <th className="px-3 py-2 text-left text-xs">
//                           <SortHeader field="candidate_name" label="Name" />
//                         </th>
//                         <th className="px-3 py-2 text-left text-xs">
//                           <SortHeader field="email" label="Email" />
//                         </th>
//                         <th className="px-3 py-2 text-left text-xs">Phone</th>
//                         <th className="px-3 py-2 text-left text-xs">
//                           <SortHeader field="recruiter" label="Recruiter" />
//                         </th>
//                         <th className="px-3 py-2 text-left text-xs">
//                           <SortHeader field="submitted_on" label="Submitted" />
//                         </th>
//                         <th className="px-3 py-2 text-left text-xs">Action</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {paginatedSubmissions.map((submission) => (
//                         <tr
//                           key={submission.id}
//                           className="hover:bg-gray-50/50 transition-colors cursor-pointer"
//                           onClick={() => openCandidateDetail(submission)}
//                         >
//                           <td className="px-3 py-2">
//                             <div className="flex items-center gap-2">
//                               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 shrink-0">
//                                 <User size={12} className="text-blue-600" />
//                               </div>
//                               <div className="min-w-0">
//                                 <div className="text-xs font-medium text-gray-900 truncate">
//                                   {submission.candidate_name || "N/A"}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-3 py-2">
//                             <div className="text-xs text-gray-600 truncate">
//                               <a
//                                 href={`mailto:${submission.email}`}
//                                 onClick={(e) => e.stopPropagation()}
//                                 className="text-blue-600 hover:text-blue-700 hover:underline"
//                               >
//                                 {submission.email || "N/A"}
//                               </a>
//                             </div>
//                           </td>
//                           <td className="px-3 py-2">
//                             <div className="flex items-center gap-1 text-xs text-gray-600">
//                               <Phone size={12} className="text-gray-400 shrink-0" />
//                               <span className="truncate">{submission.mobile_number || "N/A"}</span>
//                             </div>
//                           </td>
//                           <td className="px-3 py-2">
//                             <div className="text-xs text-gray-600 truncate">{submission.recruiter || "N/A"}</div>
//                           </td>
//                           <td className="px-3 py-2">
//                             <div className="text-xs text-gray-600 whitespace-nowrap">
//                               {submission.submitted_on
//                                 ? new Date(submission.submitted_on).toLocaleDateString("en-IN", {
//                                     day: "2-digit",
//                                     month: "short",
//                                     year: "numeric",
//                                   })
//                                 : "N/A"}
//                             </div>
//                           </td>
//                           <td className="px-3 py-2">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 openCandidateDetail(submission);
//                               }}
//                               className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors whitespace-nowrap"
//                             >
//                               View Tracker
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
//                     <div className="text-xs text-gray-500">
//                       Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
//                       {Math.min(currentPage * ITEMS_PER_PAGE, sortedSubmissions.length)} of {sortedSubmissions.length}
//                     </div>
//                     <div className="flex items-center gap-1.5">
//                       <button
//                         onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                         disabled={currentPage === 1}
//                         className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                       >
//                         Previous
//                       </button>

//                       <div className="flex items-center gap-1">
//                         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
//                           const showPage =
//                             page === 1 ||
//                             page === totalPages ||
//                             (page >= currentPage - 1 && page <= currentPage + 1);

//                           const showEllipsis =
//                             (page === currentPage - 2 && currentPage > 3) ||
//                             (page === currentPage + 2 && currentPage < totalPages - 2);

//                           if (showEllipsis) {
//                             return (
//                               <span key={page} className="px-1.5 text-gray-400 text-xs">
//                                 …
//                               </span>
//                             );
//                           }

//                           if (!showPage) return null;

//                           return (
//                             <button
//                               key={page}
//                               onClick={() => setCurrentPage(page)}
//                               className={`w-8 h-8 text-xs rounded-lg transition-colors ${
//                                 currentPage === page
//                                   ? "bg-blue-600 text-white font-medium"
//                                   : "border border-gray-200 hover:bg-gray-50 text-gray-700"
//                               }`}
//                             >
//                               {page}
//                             </button>
//                           );
//                         })}
//                       </div>

//                       <button
//                         onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                         disabled={currentPage === totalPages}
//                         className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                       >
//                         Next
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="text-center py-12">
//                 <Mail size={32} className="mx-auto text-gray-300 mb-3" />
//                 <p className="text-gray-500 font-medium">No submissions found</p>
//                 <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SubmissionGroupDetail;












import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { Search, Building, Mail, Phone, User, X } from "lucide-react";
import { submissionService } from "../services/submissionService";
import type { Submission, SubmissionFilters } from "../services/submissionService";
import { positionService } from "../services/positionService";
import { clientService } from "../services/clientService";
import { slugify } from "../utils/slug";

type TabType = "all" | "submitted" | "direct" | "approved_rm" | "approved_client";
type SortField = "candidate_name" | "email" | "experience" | "recruiter" | "submitted_on";
type SortOrder = "asc" | "desc";
type GroupBy = "position" | "client_name" | "candidate_name" | "status";

interface GroupDetailState {
  groupName?: string;
  groupBy?: GroupBy;
  filters?: Record<string, string>;
  searchTerm?: string;
  currentPage?: number;
}

const SubmissionGroupDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { groupSlug = "" } = useParams<{ groupSlug: string }>();
  const state = location.state as GroupDetailState | null;

  // Group being shown: from navigation state, or resolved from the URL slug
  const [group, setGroup] = useState<{ groupName: string; groupBy: GroupBy } | null>(
    state?.groupName ? { groupName: state.groupName, groupBy: state.groupBy || "position" } : null
  );
  const [resolving, setResolving] = useState(!state?.groupName);

  // State (all hooks must run before any early return)
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("submitted_on");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Opened via a link with no navigation state → recover the group name from the slug
  useEffect(() => {
    if (state?.groupName) {
      setGroup({ groupName: state.groupName, groupBy: state.groupBy || "position" });
      setResolving(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setResolving(true);
      try {
        const posRes: any = await positionService.fetchAll(1, 2000);
        const title = (posRes?.data?.positions || [])
          .map((p: any) => p.title)
          .find((t: string) => slugify(t) === groupSlug);
        if (title) {
          if (!cancelled) setGroup({ groupName: title, groupBy: "position" });
          return;
        }

        const cliRes: any = await clientService.fetchAll();
        const client = (cliRes?.data || [])
          .map((c: any) => c.client_name)
          .find((n: string) => slugify(n) === groupSlug);
        if (client && !cancelled) setGroup({ groupName: client, groupBy: "client_name" });
      } catch (err) {
        console.error("Error resolving group from URL:", err);
      } finally {
        if (!cancelled) setResolving(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [groupSlug, state?.groupName, state?.groupBy]);

  // Fetch submissions for the group
  useEffect(() => {
    if (!group) return;

    const fetchGroupSubmissions = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiFilters: SubmissionFilters = { groupBy: group.groupBy };

        const response = await submissionService.fetchByGroup(group.groupName, group.groupBy, apiFilters);

        if (response.status === 200 && response.data && response.data.length > 0) {
          const validSubmissions = response.data.filter((sub: any) => sub && sub.id);

          if (validSubmissions.length === 0) {
            throw new Error("API returned data but no valid submissions with IDs");
          }

          // Fetch detailed data for each submission to get email and phone fields
          const detailedSubmissions = await Promise.all(
            validSubmissions.map(async (submission: Submission) => {
              try {
                const detailResponse = await submissionService.fetchById(submission.id.toString());

                if (detailResponse?.status === 200 && detailResponse?.data) {
                  return {
                    ...submission,
                    email: detailResponse.data.email || submission.email || "",
                    mobile_number: detailResponse.data.mobile_number || submission.mobile_number || "",
                  };
                }
                return submission;
              } catch (err) {
                console.warn(`Failed to fetch details for submission ${submission.id}:`, err);
                return submission;
              }
            })
          );

          if (detailedSubmissions.length > 0) {
            setSubmissions(detailedSubmissions);
            setCurrentPage(1);
          } else {
            throw new Error("No valid submissions after detail fetch");
          }
        } else if (!response.data || response.data.length === 0) {
          setSubmissions([]);
          setError("No submissions found for this filter. Try a different filter.");
        } else {
          setSubmissions([]);
          setError("Unexpected response from server");
        }
      } catch (err: any) {
        console.error("Error fetching group submissions:", err);
        setError(err?.message || "Failed to fetch submissions");
      } finally {
        setLoading(false);
      }
    };

    fetchGroupSubmissions();
  }, [group?.groupName, group?.groupBy]);

  // Back: previous page if there is one in history, otherwise the main list
  const goBack = () => (location.key !== "default" ? navigate(-1) : navigate("/submission-management"));

  // Group couldn't be determined (after hooks, to respect the rules of hooks)
  if (!group) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto text-center py-16">
            {resolving ? (
              <p className="text-gray-500 font-medium">Loading group…</p>
            ) : (
              <>
                <p className="text-gray-500 font-medium">Couldn't open this group from the link</p>
                <p className="text-gray-400 text-sm mt-2">Open it again from Submission Management.</p>
                <button
                  onClick={() => navigate("/submission-management")}
                  className="mt-4 px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Go to Submission Management
                </button>
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  // Open the candidate detail page (used by row click and View Tracker)
  const openCandidateDetail = (submission: Submission) => {
    navigate(`/submission-management/${groupSlug}/${submission.id}`, {
      state: {
        fromGroupDetail: true,
        groupName: group.groupName,
        groupBy: group.groupBy,
        filters: state?.filters,
        searchTerm: state?.searchTerm,
        currentPage: state?.currentPage,
      },
    });
  };

  // Filter submissions based on active tab and search
  const filteredSubmissions = submissions.filter((submission) => {
    let tabMatch = true;
    if (activeTab === "submitted") {
      tabMatch = submission.status === "Submitted";
    } else if (activeTab === "direct") {
      tabMatch = submission.recruiter === "N/A" || submission.recruiter?.trim() === "";
    } else if (activeTab === "approved_rm") {
      tabMatch = submission.status === "approved by RM";
    } else if (activeTab === "approved_client") {
      tabMatch = submission.status === "approved by client";
    }

    const searchLower = searchTerm.toLowerCase();
    const searchMatch =
      !searchTerm ||
      submission.candidate_name?.toLowerCase().includes(searchLower) ||
      submission.email?.toLowerCase().includes(searchLower) ||
      submission.recruiter?.toLowerCase().includes(searchLower);

    return tabMatch && searchMatch;
  });

  // Sort submissions
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    let aVal: any = "";
    let bVal: any = "";

    switch (sortField) {
      case "candidate_name":
        aVal = a.candidate_name || "";
        bVal = b.candidate_name || "";
        break;
      case "email":
        aVal = a.email || "";
        bVal = b.email || "";
        break;
      case "experience":
        aVal = parseInt(a.experience as any) || 0;
        bVal = parseInt(b.experience as any) || 0;
        break;
      case "recruiter":
        aVal = a.recruiter || "";
        bVal = b.recruiter || "";
        break;
      case "submitted_on":
        aVal = new Date(a.submitted_on || 0).getTime();
        bVal = new Date(b.submitted_on || 0).getTime();
        break;
      default:
        break;
    }

    if (typeof aVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = (bVal as string).toLowerCase();
    }

    if (sortOrder === "asc") {
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
    } else {
      return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedSubmissions.length / ITEMS_PER_PAGE);
  const paginatedSubmissions = sortedSubmissions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1.5 text-gray-700 hover:text-teal-600 transition-colors font-medium"
    >
      {label}
    </button>
  );

  const tabs = [
    { id: "all", label: "All", count: submissions.length },
    { id: "submitted", label: "Submitted", count: submissions.filter((s) => s.status === "Submitted").length },
    {
      id: "direct",
      label: "Direct Applicants",
      count: submissions.filter((s) => s.recruiter === "N/A" || s.recruiter?.trim() === "").length,
    },
    { id: "approved_rm", label: "Approved by RM", count: submissions.filter((s) => s.status === "approved by RM").length },
    {
      id: "approved_client",
      label: "Approved by Client",
      count: submissions.filter((s) => s.status === "approved by client").length,
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button + Header */}
          <div className="mb-6 flex items-center gap-4">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              ← Back
            </button>
          </div>

          {/* Top Section: Group name */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Building size={20} className="text-teal-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{group.groupName}</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Client:{" "}
                  <span className="font-medium text-gray-900">{submissions[0]?.client_name || "N/A"}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-700 font-medium">
                {filteredSubmissions.length} submissions
              </span>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center gap-2">
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

          {/* Loading */}
          {loading && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 shadow-xl flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-teal-600"></div>
                <p className="text-sm text-gray-600 font-medium">Loading submissions…</p>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
            <div className="flex items-center gap-0 border-b border-gray-200 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as TabType);
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                    activeTab === tab.id
                      ? "border-teal-600 text-teal-600 bg-teal-50/50"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-9 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Search by name, email, or recruiter…"
                />
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setCurrentPage(1);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Table */}
            {filteredSubmissions.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-700">
                        <th className="px-3 py-2 text-left text-xs">
                          <SortHeader field="candidate_name" label="Name" />
                        </th>
                        <th className="px-3 py-2 text-left text-xs">
                          <SortHeader field="email" label="Email" />
                        </th>
                        <th className="px-3 py-2 text-left text-xs">Phone</th>
                        <th className="px-3 py-2 text-left text-xs">
                          <SortHeader field="recruiter" label="Recruiter" />
                        </th>
                        <th className="px-3 py-2 text-left text-xs">
                          <SortHeader field="submitted_on" label="Submitted" />
                        </th>
                        <th className="px-3 py-2 text-left text-xs">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {paginatedSubmissions.map((submission) => (
                        <tr
                          key={submission.id}
                          className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                          onClick={() => openCandidateDetail(submission)}
                        >
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100 shrink-0">
                                <User size={12} className="text-teal-600" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-medium text-gray-900 truncate">
                                  {submission.candidate_name || "N/A"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <div className="text-xs text-gray-600 truncate">
                              <a
                                href={`mailto:${submission.email}`}
                                onClick={(e) => e.stopPropagation()}
                                className="text-teal-600 hover:text-teal-700 hover:underline"
                              >
                                {submission.email || "N/A"}
                              </a>
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <Phone size={12} className="text-gray-400 shrink-0" />
                              <span className="truncate">{submission.mobile_number || "N/A"}</span>
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <div className="text-xs text-gray-600 truncate">{submission.recruiter || "N/A"}</div>
                          </td>
                          <td className="px-3 py-2">
                            <div className="text-xs text-gray-600 whitespace-nowrap">
                              {submission.submitted_on
                                ? new Date(submission.submitted_on).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })
                                : "N/A"}
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openCandidateDetail(submission);
                              }}
                              className="text-teal-600 hover:text-teal-800 text-xs font-medium px-2 py-1 rounded-lg border border-teal-300 hover:bg-teal-50 transition-colors whitespace-nowrap"
                            >
                              View Tracker
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                      {Math.min(currentPage * ITEMS_PER_PAGE, sortedSubmissions.length)} of {sortedSubmissions.length}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
                            return (
                              <span key={page} className="px-1.5 text-gray-400 text-xs">
                                …
                              </span>
                            );
                          }

                          if (!showPage) return null;

                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
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
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Mail size={32} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">No submissions found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmissionGroupDetail;