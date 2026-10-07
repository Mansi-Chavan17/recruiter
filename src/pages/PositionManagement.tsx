// // import { useState, useEffect, useRef } from "react";
// // import Header from "../components/Header";
// // import { useNavigate } from "react-router-dom";
// // import { Search, Plus, Users, Bot, ArrowLeft, Mail, MapPin } from "lucide-react";
// // import { positionService } from "../services/positionService";
// // import { clientService } from "../services/clientService";
// // import Select from "react-select";
// // import {
// //   educationOptions,
// //   functionOptions,
// //   roleOptions,
// //   cityOptions,
// //   candidateStatusOptions,
// // } from "../constants/dropdown";
// // import AsyncSelect from "react-select/async";
// // import CreatePositionWizard from "../components/positions/CreatePositionWizard";
// // import PositionDetail from "../components/positions/Positiondetail";

// // /* ------------------------------------------------------------------ */
// // /* Shared helpers                                                      */
// // /* ------------------------------------------------------------------ */

// // /* ------------------------------------------------------------------ */
// // /* Tag Candidate Modal (moved to top level so it does not remount on    */
// // /* every keystroke, which was stealing focus from the inputs)          */
// // /* ------------------------------------------------------------------ */

// // const TagCandidateModal = ({
// //   onClose,
// //   tagFormData,
// //   setTagFormData,
// //   selectedPositionId,
// //   isSubmitting,
// //   setIsSubmitting,
// //   onTagged,
// // }) => {
// //   const searchTimeout = useRef<any>(null);

// //   const debouncedLoadOptions = (inputValue: string, callback: any) => {
// //     if (searchTimeout.current) clearTimeout(searchTimeout.current);

// //     if (!inputValue || inputValue.trim().length < 2) {
// //       callback([]);
// //       return;
// //     }

// //     searchTimeout.current = setTimeout(async () => {
// //       try {
// //         const res = await positionService.fetchAutocomplete(inputValue.trim());
// //         const candidates = res?.data || [];
// //         callback(
// //           candidates.map((candidate: any) => ({
// //             value: candidate.id,
// //             label: `${candidate.name} (${candidate.email})`,
// //             email: candidate.email,
// //             name: candidate.name,
// //           }))
// //         );
// //       } catch (err) {
// //         console.error("Autocomplete fetch error:", err);
// //         callback([]);
// //       }
// //     }, 300);
// //   };

// //   const handleCandidateSelect = (selectedOption: any) => {
// //     setTagFormData((prev: any) => ({
// //       ...prev,
// //       applicant: selectedOption ? selectedOption.label : "",
// //       candidateId: selectedOption ? selectedOption.value : null,
// //     }));
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (!tagFormData.candidateId) {
// //       alert("Select a candidate before submitting.");
// //       return;
// //     }
// //     if (!tagFormData.recruiter) {
// //       alert("Recruiter email is required.");
// //       return;
// //     }

// //     setIsSubmitting(true);
// //     try {
// //       const response = await positionService.tagCandidateToPosition(
// //         String(selectedPositionId),
// //         {
// //           candidateId: tagFormData.candidateId,
// //           recruiterEmail: tagFormData.recruiter,
// //           immediateJoiner: tagFormData.immediateJoiner,
// //           status: tagFormData.status,
// //         }
// //       );

// //       if (response.status === 201) {
// //         alert("Candidate tagged to the position.");
// //         onTagged();
// //       } else {
// //         alert("Tagging failed: " + (response.message || "Unknown error"));
// //       }
// //     } catch (error) {
// //       console.error("Error tagging candidate:", error);
// //       alert("Could not tag the candidate. Try again.");
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 sm:p-4">
// //       <div className="bg-white w-full sm:max-w-md h-[92vh] sm:h-auto sm:max-h-[90vh] rounded-t-2xl sm:rounded-lg shadow-xl flex flex-col">
// //         <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200 shrink-0">
// //           <h2 className="text-lg sm:text-xl font-bold text-gray-800">
// //             Tag candidate
// //           </h2>
// //           <button
// //             type="button"
// //             onClick={onClose}
// //             className="text-gray-400 hover:text-gray-600"
// //           >
// //             <svg
// //               className="w-6 h-6"
// //               fill="none"
// //               stroke="currentColor"
// //               viewBox="0 0 24 24"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M6 18L18 6M6 6l12 12"
// //               />
// //             </svg>
// //           </button>
// //         </div>

// //         <form
// //           onSubmit={handleSubmit}
// //           className="flex-1 flex flex-col min-h-0"
// //         >
// //           <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Position name <span className="text-red-500">*</span>
// //             </label>
// //             <input
// //               type="text"
// //               required
// //               readOnly
// //               value={tagFormData.positionName}
// //               className="w-full h-10 px-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Applicant <span className="text-red-500">*</span>
// //             </label>
// //             <AsyncSelect
// //               cacheOptions
// //               defaultOptions={false}
// //               loadOptions={debouncedLoadOptions}
// //               isSearchable
// //               isClearable
// //               placeholder="Search by name or email..."
// //               noOptionsMessage={({ inputValue }) =>
// //                 !inputValue || inputValue.length < 2
// //                   ? "Type at least 2 characters"
// //                   : "No candidates found"
// //               }
// //               loadingMessage={() => "Searching..."}
// //               onChange={handleCandidateSelect}
// //               value={
// //                 tagFormData.candidateId
// //                   ? {
// //                       value: tagFormData.candidateId,
// //                       label: tagFormData.applicant,
// //                     }
// //                   : null
// //               }
// //               styles={{
// //                 control: (base) => ({
// //                   ...base,
// //                   minHeight: "40px",
// //                   borderColor: "#d1d5db",
// //                   "&:hover": { borderColor: "#3b82f6" },
// //                 }),
// //                 menu: (base) => ({ ...base, zIndex: 9999 }),
// //               }}
// //               components={{
// //                 DropdownIndicator: () => null,
// //                 IndicatorSeparator: () => null,
// //               }}
// //             />
// //             <p className="text-xs text-gray-500 mt-1">
// //               Type at least 2 characters to search.
// //             </p>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Recruiter <span className="text-red-500">*</span>
// //             </label>
// //             <input
// //               type="text"
// //               required
// //               value={tagFormData.recruiter}
// //               onChange={(e) =>
// //                 setTagFormData((prev: any) => ({
// //                   ...prev,
// //                   recruiter: e.target.value,
// //                 }))
// //               }
// //               className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               placeholder="Recruiter email"
// //             />
// //           </div>

// //           <div className="flex items-start">
// //             <input
// //               type="checkbox"
// //               id="immediateJoiner"
// //               checked={tagFormData.immediateJoiner}
// //               onChange={(e) =>
// //                 setTagFormData((prev: any) => ({
// //                   ...prev,
// //                   immediateJoiner: e.target.checked,
// //                 }))
// //               }
// //               className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
// //             />
// //             <div>
// //               <label
// //                 htmlFor="immediateJoiner"
// //                 className="text-sm font-medium text-gray-700"
// //               >
// //                 Immediate joiner
// //               </label>
// //               <p className="text-xs text-gray-500">
// //                 Tick this if the candidate can join within 15 days.
// //               </p>
// //             </div>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Status <span className="text-red-500">*</span>
// //             </label>
// //             <Select
// //               options={candidateStatusOptions}
// //               isSearchable
// //               placeholder="Select status..."
// //               value={
// //                 candidateStatusOptions.find(
// //                   (opt: any) => opt.value === tagFormData.status
// //                 ) || null
// //               }
// //               onChange={(selected: any) =>
// //                 setTagFormData((prev: any) => ({
// //                   ...prev,
// //                   status: selected?.value,
// //                 }))
// //               }
// //               styles={{
// //                 control: (base) => ({ ...base, minHeight: "40px" }),
// //                 menu: (base) => ({ ...base, zIndex: 9999 }),
// //               }}
// //             />
// //           </div>

// //           </div>

// //           <div className="flex gap-3 px-4 sm:px-6 py-3 border-t border-gray-200 shrink-0 bg-white sm:rounded-b-lg">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="flex-1 sm:flex-none sm:ml-auto px-4 h-11 sm:h-10 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               disabled={isSubmitting}
// //               className="flex-1 sm:flex-none px-4 h-11 sm:h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
// //             >
// //               {isSubmitting ? "Tagging..." : "Tag candidate"}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // /* ------------------------------------------------------------------ */
// // /* Position detail                                                     */
// // /* ------------------------------------------------------------------ */

// // /* ------------------------------------------------------------------ */
// // /* Positions table                                                     */
// // /* ------------------------------------------------------------------ */

// // const PositionTable = ({ positions, onOpen, onTag, onAIMatcher }) => (
// //   <>
// //     {/* Mobile: stacked cards */}
// //     <div className="md:hidden space-y-3">
// //       {positions.map((position: any) => (
// //         <div
// //           key={position.id}
// //           onClick={() => onOpen(position)}
// //           className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 active:bg-gray-50"
// //         >
// //           <div className="flex items-start justify-between gap-3">
// //             <p className="text-sm font-medium text-gray-900 leading-5 break-words">
// //               {position.positionName}
// //             </p>
// //             <span
// //               className={`shrink-0 inline-flex px-2 py-0.5 text-xs font-medium leading-4 rounded-full ${
// //                 position.priority === "High"
// //                   ? "bg-red-100 text-red-800"
// //                   : position.priority === "Medium"
// //                   ? "bg-yellow-100 text-yellow-800"
// //                   : "bg-green-100 text-green-800"
// //               }`}
// //             >
// //               {position.priority}
// //             </span>
// //           </div>

// //           <p className="text-sm text-gray-700 mt-1 break-words">
// //             {position.clientName}
// //           </p>

// //           <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
// //             <span>{position.ctcBudget}</span>
// //             <span className="flex items-center min-w-0">
// //               <MapPin className="w-3 h-3 mr-1 shrink-0" />
// //               <span className="truncate">{position.location}</span>
// //             </span>
// //             <span>
// //               {position.experience} • {position.workplaceType}
// //             </span>
// //           </div>

// //           <div className="flex gap-2 mt-3">
// //             <button
// //               className="flex-1 h-9 bg-green-100 text-green-800 text-xs font-medium rounded hover:bg-green-200"
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 onTag(position);
// //               }}
// //             >
// //               Tag candidate
// //             </button>
// //             <button
// //               className="flex-1 h-9 border border-purple-200 text-xs font-medium text-purple-600 rounded hover:bg-purple-50"
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 onAIMatcher();
// //               }}
// //             >
// //               AI matcher
// //             </button>
// //           </div>
// //         </div>
// //       ))}

// //       {positions.length === 0 && (
// //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-sm text-gray-500">
// //           No positions match this search.
// //         </div>
// //       )}
// //     </div>

// //     {/* Desktop: table */}
// //     <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// //     <div className="w-full">
// //       <table className="w-full table-fixed divide-y divide-gray-200">
// //         <colgroup>
// //           <col className="w-[30%]" />
// //           <col className="w-[24%]" />
// //           <col className="w-[20%]" />
// //           <col className="w-[26%]" />
// //         </colgroup>
// //         <thead className="bg-gray-50">
// //           <tr>
// //             <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               Position
// //             </th>
// //             <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               Client and priority
// //             </th>
// //             <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               CTC and location
// //             </th>
// //             <th className="px-4 py-2.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               Actions
// //             </th>
// //           </tr>
// //         </thead>
// //         <tbody className="bg-white divide-y divide-gray-200">
// //           {positions.map((position: any) => {
// //             return (
// //               <tr
// //                 key={position.id}
// //                 className="hover:bg-gray-50 cursor-pointer align-top"
// //                 onClick={() => onOpen(position)}
// //               >
// //                 <td className="px-4 py-3 align-top">
// //                   <div className="flex flex-col min-w-0">
// //                     <span className="text-sm font-medium text-gray-900 leading-5 break-words">
// //                       {position.positionName}
// //                     </span>
// //                     <span className="text-xs text-gray-500 leading-5 mt-0.5 truncate">
// //                       {position.experience} • {position.workplaceType}
// //                     </span>
// //                   </div>
// //                 </td>

// //                 <td className="px-4 py-3 align-top">
// //                   <div className="flex flex-col min-w-0">
// //                   <span className="text-sm text-gray-900 leading-5 break-words">
// //                     {position.clientName}
// //                   </span>
// //                   <span
// //                     className={`inline-flex self-start mt-1 px-2 py-0.5 text-xs font-medium leading-4 rounded-full ${
// //                       position.priority === "High"
// //                         ? "bg-red-100 text-red-800"
// //                         : position.priority === "Medium"
// //                         ? "bg-yellow-100 text-yellow-800"
// //                         : "bg-green-100 text-green-800"
// //                     }`}
// //                   >
// //                     {position.priority}
// //                   </span>
// //                   </div>
// //                 </td>

// //                 <td className="px-4 py-3 align-top">
// //                   <div className="flex flex-col min-w-0">
// //                     <span className="text-sm text-gray-900 leading-5 truncate">
// //                       {position.ctcBudget}
// //                     </span>
// //                     <span className="text-xs text-gray-500 leading-5 mt-0.5 flex items-center min-w-0">
// //                       <MapPin className="w-3 h-3 mr-1 shrink-0" />
// //                       <span className="truncate">{position.location}</span>
// //                     </span>
// //                   </div>
// //                 </td>

// //                 <td className="px-4 py-3 align-top">
// //                   <div className="flex justify-end items-start gap-2">
// //                     <button
// //                       className="h-7 px-2.5 bg-green-100 text-green-800 text-xs font-medium rounded hover:bg-green-200 whitespace-nowrap"
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         onTag(position);
// //                       }}
// //                     >
// //                       Tag candidate
// //                     </button>
// //                     <button
// //                       className="h-7 px-2.5 text-xs font-medium text-purple-600 rounded hover:bg-purple-50 whitespace-nowrap"
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         onAIMatcher();
// //                       }}
// //                     >
// //                       AI matcher
// //                     </button>
// //                   </div>
// //                 </td>
// //               </tr>
// //             );
// //           })}

// //           {positions.length === 0 && (
// //             <tr>
// //               <td
// //                 colSpan={4}
// //                 className="px-4 py-10 text-center text-sm text-gray-500"
// //               >
// //                 No positions match this search. Clear the filters or create a
// //                 position.
// //               </td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>
// //     </div>
// //     </div>
// //   </>
// // );

// // /* ------------------------------------------------------------------ */
// // /* Main                                                                */
// // /* ------------------------------------------------------------------ */

// // const PositionManagement = () => {
// //   const [currentView, setCurrentView] = useState("positions");
// //   const [selectedPosition, setSelectedPosition] = useState<any>(null);
// //   const [tagPositionId, setTagPositionId] = useState<any>(null);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [filterBy, setFilterBy] = useState("all");
// //   const [groupBy, setGroupBy] = useState("none");
// //   const [showTagForm, setShowTagForm] = useState(false);
// //   const [showAddCandidate, setShowAddCandidate] = useState<any>(false);
// //   const [showCandidateForm, setShowCandidateForm] = useState(false);
// //   const [showCreatePosition, setShowCreatePosition] = useState(false);
// //   const [candidateEmail, setCandidateEmail] = useState("");
// //   const [loadingPositionDetail, setLoadingPositionDetail] = useState(false);
// //   const [clientOptions, setClientOptions] = useState<any[]>([]);
// //   const [isSubmittingTag, setIsSubmittingTag] = useState(false);
// //   const [positions, setPositions] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   const navigate = useNavigate();
// //   const recruiter = localStorage.getItem("email") || "";

// //   const [tagFormData, setTagFormData] = useState<any>({
// //     positionName: "",
// //     applicant: "",
// //     candidateId: null,
// //     recruiter: "",
// //     immediateJoiner: false,
// //     status: "",
// //   });

// //   const [candidates, setCandidates] = useState<any[]>([
// //     {
// //       id: 1,
// //       email: "john.smith@email.com",
// //       name: "John Smith",
// //       currentCTC: 1500000,
// //       expectedCTC: 2000000,
// //       noticePeriod: 30,
// //       status: "submitted",
// //       positionId: 1,
// //       recruiter: recruiter,
// //       source: "recruiter",
// //     },
// //     {
// //       id: 2,
// //       email: "jane.doe@email.com",
// //       name: "Jane Doe",
// //       currentCTC: 1200000,
// //       expectedCTC: 1800000,
// //       noticePeriod: 60,
// //       status: "internal_screening",
// //       positionId: 1,
// //       recruiter: "AI Matcher",
// //       source: "direct",
// //       aiScore: null,
// //     },
// //     {
// //       id: 3,
// //       email: "alex.kumar@email.com",
// //       name: "Alex Kumar",
// //       currentCTC: 1800000,
// //       expectedCTC: 2500000,
// //       noticePeriod: 45,
// //       status: "internal_screening",
// //       positionId: 1,
// //       recruiter: "Direct Application",
// //       source: "direct",
// //       aiScore: null,
// //     },
// //     {
// //       id: 4,
// //       email: "priya.sharma@email.com",
// //       name: "Priya Sharma",
// //       currentCTC: 1600000,
// //       expectedCTC: 2200000,
// //       noticePeriod: 30,
// //       status: "internal_screening",
// //       positionId: 1,
// //       recruiter: "Direct Application",
// //       source: "direct",
// //       aiScore: null,
// //     },
// //     {
// //       id: 5,
// //       email: "rajesh.patel@email.com",
// //       name: "Rajesh Patel",
// //       currentCTC: 1400000,
// //       expectedCTC: 2000000,
// //       noticePeriod: 60,
// //       status: "internal_reject",
// //       positionId: 1,
// //       recruiter: "Direct Application",
// //       source: "direct",
// //       aiScore: 12,
// //     },
// //   ]);

// //   const [newCandidate, setNewCandidate] = useState<any>({
// //     email: "",
// //     resume: null,
// //     currentCTC: "",
// //     specialComments: "",
// //     education: "",
// //     gender: "",
// //     openToRelocation: false,
// //     engagementType: "",
// //     expectedCTC: "",
// //     noticePeriod: "",
// //     recruiter: recruiter,
// //   });

// //   /* -------------------- data -------------------- */

// //   const transformPosition = (position: any) => {
// //     const [submitted, targeted] = String(position.progress || "0/0")
// //       .split("/")
// //       .map(Number);

// //     return {
// //       id: position.id,
// //       positionName: position.title,
// //       clientName: position.client,
// //       submittedResumes: submitted || 0,
// //       targetedResumes: targeted || 0,
// //       ctcBudget: Number.isFinite(Number(position.ctc)) && Number(position.ctc) > 0
// //         ? `${(Number(position.ctc) / 100000).toFixed(0)} LPA`
// //         : "N/A",
// //       location: position.location || "N/A",
// //       priority: position.priority || "Medium",
// //       experience: position.experience ? `${position.experience} years` : "N/A",
// //       workplaceType: position.mode || "N/A",
// //       status: position.status || "Active",
// //       ctcBudgetNumeric: position.ctc || 0,
// //       city: position.location || "N/A",
// //       experienceYears: position.experience || "N/A",
// //       daysSinceNoAction: position.daysSinceNoAction || 0,
// //       education: position.education || "N/A",
// //       roleDescription: position.roleDescription || "",
// //       preferredIndustry: position.preferredIndustry || "",
// //       preferredCompanies: position.preferredCompanies || "",
// //       reportees: position.reportees || 0,
// //       deadline: position.deadline || "",
// //       rounds: position.rounds || 0,
// //       interviewerName: position.interviewerName || "",
// //       interviewerLinkedIn: position.interviewerLinkedIn || "",
// //       ctcStructure: position.ctcStructure || "",
// //       roleType: position.roleType || "",
// //       diversityPreference: position.diversityPreference || "",
// //       interviewMode: position.interviewMode || "",
// //       jobType: position.jobType || "",
// //       clientSPOC: position.clientSPOC || "",
// //       lakshSPOC: position.lakshSPOC || "",
// //       recruiter: position.recruiter || "",
// //       function: position.function || "",
// //       role: position.role || "",
// //       target: targeted || 0,
// //       createdDate: position.createdDate || new Date().toISOString(),
// //       lastActivityDate: position.lastActivityDate || new Date().toISOString(),
// //     };
// //   };

// //   const loadPositions = async () => {
// //     try {
// //       const res = await positionService.fetchAll(1, 2000);
// //       if (res.status === 200) {
// //         setPositions(res.data.positions.map(transformPosition));
// //       } else {
// //         console.error("Failed to fetch positions:", res.message);
// //       }
// //     } catch (err) {
// //       console.error("Error fetching positions:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchPositionDetail = async (positionId: any) => {
// //     setLoadingPositionDetail(true);
// //     try {
// //       const res = await positionService.fetchById(positionId);
// //       if (res.status === 200) {
// //         const position = res.data;
// //         setSelectedPosition({
// //           id: String(position.id),
// //           positionName: position.title || "N/A",
// //           clientName: position.clientName || "N/A",
// //           submittedResumes: position.submittedCandidates?.length || 0,
// //           targetedResumes: position.targetedResumes || 0,
// //           ctcBudget: position.ctcBudget
// //             ? `${(Number(position.ctcBudget) / 100000).toFixed(0)} LPA`
// //             : "N/A",
// //           ctcStructure: position.ctcStructure || "",
// //           city: position.location || "",
// //           location: position.location || "",
// //           experience: position.experience ? `${position.experience} years` : "",
// //           priority: position.priority || "",
// //           function: position.function || "",
// //           role: position.role || "",
// //           workplaceType: position.workplaceType || "",
// //           status: position.status || "Open",
// //           education: position.education || "",
// //           roleDescription: position.roleDescription || "",
// //           preferredIndustry: position.preferredIndustry || [],
// //           preferredCompanies: position.preferredCompanies || [],
// //           reportees: position.reportees || 0,
// //           target: position.target || 0,
// //           deadline: position.deadline || "",
// //           rounds: position.interviewRounds || 0,
// //           interviewerName: position.interviewer || "",
// //           diversityPreference: position.diversityPreference || "",
// //           interviewMode: position.interviewMode || "",
// //           jobType: position.jobType || "",
// //           roleType: position.roleType || "",
// //           clientSpoc: position.clientSpoc || "",
// //           lakshSpoc: position.lakshSpoc?.filter(Boolean) || [],
// //           recruiter: position.recruiter || "",
// //           linkedIn: position.linkedin || null,
// //           submittedCandidates: position.submittedCandidates || [],
// //           message: position.message || "",
// //         });
// //       }
// //     } catch (err) {
// //       console.error("Error fetching position detail:", err);
// //     } finally {
// //       setLoadingPositionDetail(false);
// //     }
// //   };

// //   useEffect(() => {
// //     const fetchClients = async () => {
// //       const res = await clientService.fetchAll();
// //       const clients = res?.data || [];
// //       setClientOptions(
// //         clients.map((c: any) => ({
// //           id: c.id,
// //           label: c.client_name,
// //           value: c.id,
// //           clientHRSpocs: c.clientHRSpocs || [],
// //         }))
// //       );
// //     };
// //     fetchClients();
// //   }, []);

// //   useEffect(() => {
// //     loadPositions();
// //   }, []);

// //   /* -------------------- derived -------------------- */

// //   const filteredPositions = positions.filter((position) => {
// //     const term = searchTerm.toLowerCase();
// //     const matchesSearch =
// //       (position.positionName || "").toLowerCase().includes(term) ||
// //       (position.clientName || "").toLowerCase().includes(term) ||
// //       (position.location || "").toLowerCase().includes(term) ||
// //       (position.priority || "").toLowerCase().includes(term) ||
// //       (position.experience || "").toLowerCase().includes(term);

// //     if (filterBy === "all") return matchesSearch;
// //     return matchesSearch && position.priority === filterBy;
// //   });

// //   const groupedPositions =
// //     groupBy === "clientName"
// //       ? filteredPositions.reduce((acc: any, position: any) => {
// //           const client = position.clientName || "Unassigned";
// //           if (!acc[client]) acc[client] = [];
// //           acc[client].push(position);
// //           return acc;
// //         }, {})
// //       : { "All Positions": filteredPositions };

// //   /* -------------------- handlers -------------------- */

// //   const handleEmailCheck = () => {
// //     const existingCandidate = candidates.find((c) => c.email === candidateEmail);
// //     if (existingCandidate) {
// //       setCandidates((prev) =>
// //         prev.map((c) =>
// //           c.email === candidateEmail ? { ...c, positionId: showAddCandidate } : c
// //         )
// //       );
// //       setShowAddCandidate(false);
// //       setCandidateEmail("");
// //       alert("Candidate tagged to the position.");
// //     } else {
// //       setShowCandidateForm(true);
// //       setNewCandidate({ ...newCandidate, email: candidateEmail });
// //     }
// //   };

// //   const handleCreateCandidate = () => {
// //     const candidate = {
// //       id: candidates.length + 1,
// //       ...newCandidate,
// //       status: "submitted",
// //       positionId: showAddCandidate,
// //       source: "recruiter",
// //       name: newCandidate.email.split("@")[0].replace(".", " "),
// //     };
// //     setCandidates([...candidates, candidate]);
// //     setShowCandidateForm(false);
// //     setShowAddCandidate(false);
// //     setNewCandidate({
// //       email: "",
// //       resume: null,
// //       currentCTC: "",
// //       specialComments: "",
// //       education: "",
// //       gender: "",
// //       openToRelocation: false,
// //       engagementType: "",
// //       expectedCTC: "",
// //       noticePeriod: "",
// //       recruiter: recruiter,
// //     });
// //     alert("Candidate created and tagged.");
// //   };

// //   const handleCreatePosition = async (payload: any) => {
// //     try {
// //       const response = await positionService.createPosition(payload);

// //       if (response.status === 201 || response.status === 200) {
// //         alert("Position created.");
// //         await loadPositions();
// //         return true;
// //       }

// //       alert(
// //         "Could not create the position: " + (response.message || "Unknown error")
// //       );
// //       return false;
// //     } catch (error) {
// //       console.error("Error creating position:", error);
// //       alert("Could not create the position. Try again.");
// //       return false;
// //     }
// //   };

// //   const handleUpdatePosition = async (payload: any) => {
// //     try {
// //       const response = await positionService.updatePosition(
// //         String(payload.id),
// //         payload
// //       );

// //       if (response.status === 200) {
// //         await fetchPositionDetail(payload.id);
// //         await loadPositions();
// //         return true;
// //       }

// //       alert("Update failed: " + (response.message || "Unknown error"));
// //       return false;
// //     } catch (error: any) {
// //       console.error("Error updating position:", error);
// //       alert("Could not update the position: " + (error.message || "Try again."));
// //       return false;
// //     }
// //   };

// //   const runAIResumeMatcherForPosition = (positionId: any) => {
// //     const eligibleCandidates = candidates.filter(
// //       (c) =>
// //         c.positionId === positionId &&
// //         c.source === "direct" &&
// //         c.status === "internal_screening"
// //     );

// //     if (eligibleCandidates.length === 0) {
// //       alert("No candidates in internal screening for this position.");
// //       return;
// //     }

// //     alert(`Scoring ${eligibleCandidates.length} candidates...`);

// //     setTimeout(() => {
// //       const scored = candidates.map((c) => {
// //         if (!eligibleCandidates.find((e) => e.id === c.id)) return c;
// //         const score = Math.floor(Math.random() * 100) + 1;
// //         return {
// //           ...c,
// //           aiScore: score,
// //           status: score >= 85 ? "internal_screening" : "internal_reject",
// //         };
// //       });
// //       setCandidates(scored);

// //       const qualified = scored.filter(
// //         (c) =>
// //           eligibleCandidates.find((e) => e.id === c.id) && (c.aiScore || 0) >= 85
// //       ).length;

// //       alert(
// //         `Scoring complete. ${qualified} candidates qualified for recruiter review; the rest moved to internal reject.`
// //       );
// //     }, 3000);
// //   };

// //   const openTagForm = (position: any) => {
// //     setTagPositionId(position.id);
// //     setTagFormData({
// //       positionName: position.positionName,
// //       applicant: "",
// //       candidateId: null,
// //       recruiter: recruiter,
// //       immediateJoiner: false,
// //       status: "",
// //     });
// //     setShowTagForm(true);
// //   };

// //   const closeTagForm = () => {
// //     setShowTagForm(false);
// //     setTagPositionId(null);
// //     setTagFormData({
// //       positionName: "",
// //       applicant: "",
// //       candidateId: null,
// //       recruiter: "",
// //       immediateJoiner: false,
// //       status: "",
// //     });
// //   };

// //   /* -------------------- detail navigation -------------------- */

// //   const currentPositionIndex = selectedPosition
// //     ? filteredPositions.findIndex(
// //         (p: any) => String(p.id) === String(selectedPosition.id)
// //       )
// //     : -1;

// //   const stepPosition = (delta: number) => {
// //     const next = filteredPositions[currentPositionIndex + delta];
// //     if (next) fetchPositionDetail(next.id);
// //   };

// //   /* -------------------- detail view -------------------- */

// //   if (currentView === "position-detail" && selectedPosition) {
// //     return (
// //       <PositionDetail
// //         position={selectedPosition}
// //         candidates={candidates}
// //         recruiter={recruiter}
// //         onBack={() => {
// //           setSelectedPosition(null);
// //           setCurrentView("positions");
// //         }}
// //         setCandidates={setCandidates}
// //         runAIResumeMatcherForPosition={runAIResumeMatcherForPosition}
// //         onSave={handleUpdatePosition}
// //         onPrev={() => stepPosition(-1)}
// //         onNext={() => stepPosition(1)}
// //         hasPrev={currentPositionIndex > 0}
// //         hasNext={
// //           currentPositionIndex >= 0 &&
// //           currentPositionIndex < filteredPositions.length - 1
// //         }
// //         functionOptions={functionOptions}
// //         roleOptions={roleOptions}
// //         educationOptions={educationOptions}
// //         cityOptions={cityOptions}
// //       />
// //     );
// //   }

// //   /* -------------------- list view -------------------- */

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Header />

// //       {showTagForm && (
// //         <TagCandidateModal
// //           onClose={closeTagForm}
// //           tagFormData={tagFormData}
// //           setTagFormData={setTagFormData}
// //           selectedPositionId={tagPositionId}
// //           isSubmitting={isSubmittingTag}
// //           setIsSubmitting={setIsSubmittingTag}
// //           onTagged={() => {
// //             closeTagForm();
// //             loadPositions();
// //           }}
// //         />
// //       )}

// //       <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
// //         {/* Toolbar: search, filters and create action on one line */}
// //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
// //           <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap md:items-center gap-3">
// //             <div className="relative flex-1 min-w-0 basis-full lg:basis-auto">
// //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
// //               <input
// //                 type="text"
// //                 placeholder="Search by position, client, location, priority or experience"
// //                 className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>

// //             <select
// //               className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:flex-1 lg:flex-none lg:w-44 shrink-0"
// //               value={filterBy}
// //               onChange={(e) => setFilterBy(e.target.value)}
// //             >
// //               <option value="all">All priorities</option>
// //               <option value="High">High priority</option>
// //               <option value="Medium">Medium priority</option>
// //               <option value="Low">Low priority</option>
// //             </select>

// //             <select
// //               className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:flex-1 lg:flex-none lg:w-44 shrink-0"
// //               value={groupBy}
// //               onChange={(e) => setGroupBy(e.target.value)}
// //             >
// //               <option value="none">No grouping</option>
// //               <option value="clientName">Group by client</option>
// //             </select>

// //             <button
// //               className="h-10 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shrink-0"
// //               onClick={() => setShowCreatePosition(true)}
// //             >
// //               <Plus className="w-4 h-4" />
// //               Create position
// //             </button>
// //           </div>
// //         </div>

// //         {/* Positions */}
// //         {loading ? (
// //           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center text-sm text-gray-500">
// //             Loading positions...
// //           </div>
// //         ) : (
// //           <div className="space-y-6">
// //             {Object.entries(groupedPositions).map(
// //               ([groupName, groupPositions]: any) => (
// //                 <div key={groupName} className="space-y-3">
// //                   {groupBy !== "none" && (
// //                     <h2 className="text-lg font-semibold text-gray-900">
// //                       {groupName}
// //                     </h2>
// //                   )}
// //                   <PositionTable
// //                     positions={groupPositions}
// //                     onOpen={(position: any) => {
// //                       fetchPositionDetail(position.id);
// //                       setCurrentView("position-detail");
// //                     }}
// //                     onTag={openTagForm}
// //                     onAIMatcher={() => navigate("/ai-matcher")}
// //                   />
// //                 </div>
// //               )
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       {/* Add Candidate Modal */}
// //       {showAddCandidate && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
// //           <div className="bg-white rounded-lg p-6 w-full max-w-md">
// //             <h2 className="text-xl font-semibold mb-4">Add candidate</h2>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Email ID
// //             </label>
// //             <input
// //               type="email"
// //               className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               value={candidateEmail}
// //               onChange={(e) => setCandidateEmail(e.target.value)}
// //               placeholder="candidate@email.com"
// //             />
// //             <div className="flex gap-3 mt-5">
// //               <button
// //                 onClick={handleEmailCheck}
// //                 className="flex-1 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
// //                 disabled={!candidateEmail}
// //               >
// //                 Check email
// //               </button>
// //               <button
// //                 onClick={() => setShowAddCandidate(false)}
// //                 className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Create Candidate Modal */}
// //       {showCandidateForm && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
// //           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
// //             <div className="px-6 py-4 border-b border-gray-200">
// //               <h2 className="text-xl font-semibold">Create candidate</h2>
// //             </div>
// //             <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Email
// //                 </label>
// //                 <input
// //                   type="email"
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.email}
// //                   onChange={(e) =>
// //                     setNewCandidate({ ...newCandidate, email: e.target.value })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Current CTC (₹)
// //                 </label>
// //                 <input
// //                   type="number"
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.currentCTC}
// //                   onChange={(e) =>
// //                     setNewCandidate({
// //                       ...newCandidate,
// //                       currentCTC: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Expected CTC (₹)
// //                 </label>
// //                 <input
// //                   type="number"
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.expectedCTC}
// //                   onChange={(e) =>
// //                     setNewCandidate({
// //                       ...newCandidate,
// //                       expectedCTC: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Notice period (days)
// //                 </label>
// //                 <input
// //                   type="number"
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.noticePeriod}
// //                   onChange={(e) =>
// //                     setNewCandidate({
// //                       ...newCandidate,
// //                       noticePeriod: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Education
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.education}
// //                   onChange={(e) =>
// //                     setNewCandidate({
// //                       ...newCandidate,
// //                       education: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Gender
// //                 </label>
// //                 <select
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.gender}
// //                   onChange={(e) =>
// //                     setNewCandidate({ ...newCandidate, gender: e.target.value })
// //                   }
// //                 >
// //                   <option value="">Select gender</option>
// //                   <option value="Male">Male</option>
// //                   <option value="Female">Female</option>
// //                   <option value="Other">Other</option>
// //                 </select>
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Engagement type
// //                 </label>
// //                 <select
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.engagementType}
// //                   onChange={(e) =>
// //                     setNewCandidate({
// //                       ...newCandidate,
// //                       engagementType: e.target.value,
// //                     })
// //                   }
// //                 >
// //                   <option value="">Select type</option>
// //                   <option value="Full-time">Full-time</option>
// //                   <option value="Part-time">Part-time</option>
// //                   <option value="Contract">Contract</option>
// //                 </select>
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Recruiter
// //                 </label>
// //                 <input
// //                   type="text"
// //                   readOnly
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm bg-gray-100"
// //                   value={newCandidate.recruiter}
// //                 />
// //               </div>
// //               <div className="md:col-span-2">
// //                 <label className="flex items-center text-sm text-gray-700">
// //                   <input
// //                     type="checkbox"
// //                     className="mr-2 h-4 w-4"
// //                     checked={newCandidate.openToRelocation}
// //                     onChange={(e) =>
// //                       setNewCandidate({
// //                         ...newCandidate,
// //                         openToRelocation: e.target.checked,
// //                       })
// //                     }
// //                   />
// //                   Open to relocation
// //                 </label>
// //               </div>
// //               <div className="md:col-span-2">
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Special comments
// //                 </label>
// //                 <textarea
// //                   rows={3}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.specialComments}
// //                   onChange={(e) =>
// //                     setNewCandidate({
// //                       ...newCandidate,
// //                       specialComments: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //             </div>
// //             <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
// //               <button
// //                 onClick={handleCreateCandidate}
// //                 className="flex-1 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// //               >
// //                 Create candidate
// //               </button>
// //               <button
// //                 onClick={() => setShowCandidateForm(false)}
// //                 className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <CreatePositionWizard
// //         open={showCreatePosition}
// //         onClose={() => setShowCreatePosition(false)}
// //         onCreate={handleCreatePosition}
// //         recruiter={recruiter}
// //         clientOptions={clientOptions}
// //         functionOptions={functionOptions}
// //         roleOptions={roleOptions}
// //         educationOptions={educationOptions}
// //         cityOptions={cityOptions}
// //       />
// //     </div>
// //   );
// // };

// // export default PositionManagement;


// // //befor url for detail page 
// // import { useState, useEffect, useRef } from "react";
// // import Header from "../components/Header";
// // import { useNavigate } from "react-router-dom";
// // import { Search, Plus, Users, Bot, ArrowLeft, Mail, MapPin } from "lucide-react";
// // import { positionService } from "../services/positionService";
// // import { clientService } from "../services/clientService";
// // import Select from "react-select";
// // import {
// //   educationOptions,
// //   functionOptions,
// //   roleOptions,
// //   cityOptions,
// //   candidateStatusOptions,
// // } from "../constants/dropdown";
// // import AsyncSelect from "react-select/async";
// // import CreatePositionWizard from "../components/positions/CreatePositionWizard";
// // import PositionDetail from "../components/positions/Positiondetail";

// // /* ------------------------------------------------------------------ */
// // /* Shared helpers                                                      */
// // /* ------------------------------------------------------------------ */

// // /* ------------------------------------------------------------------ */
// // /* Tag Candidate Modal (moved to top level so it does not remount on    */
// // /* every keystroke, which was stealing focus from the inputs)          */
// // /* ------------------------------------------------------------------ */

// // const TagCandidateModal = ({
// //   onClose,
// //   tagFormData,
// //   setTagFormData,
// //   selectedPositionId,
// //   isSubmitting,
// //   setIsSubmitting,
// //   onTagged,
// // }) => {
// //   const searchTimeout = useRef<any>(null);

// //   const debouncedLoadOptions = (inputValue: string, callback: any) => {
// //     if (searchTimeout.current) clearTimeout(searchTimeout.current);

// //     if (!inputValue || inputValue.trim().length < 2) {
// //       callback([]);
// //       return;
// //     }

// //     searchTimeout.current = setTimeout(async () => {
// //       try {
// //         const res = await positionService.fetchAutocomplete(inputValue.trim());
// //         const candidates = res?.data || [];
// //         callback(
// //           candidates.map((candidate: any) => ({
// //             value: candidate.id,
// //             label: `${candidate.name} (${candidate.email})`,
// //             email: candidate.email,
// //             name: candidate.name,
// //           }))
// //         );
// //       } catch (err) {
// //         console.error("Autocomplete fetch error:", err);
// //         callback([]);
// //       }
// //     }, 300);
// //   };

// //   const handleCandidateSelect = (selectedOption: any) => {
// //     setTagFormData((prev: any) => ({
// //       ...prev,
// //       applicant: selectedOption ? selectedOption.label : "",
// //       candidateId: selectedOption ? selectedOption.value : null,
// //     }));
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (!tagFormData.candidateId) {
// //       alert("Select a candidate before submitting.");
// //       return;
// //     }
// //     if (!tagFormData.recruiter) {
// //       alert("Recruiter email is required.");
// //       return;
// //     }

// //     setIsSubmitting(true);
// //     try {
// //       const response = await positionService.tagCandidateToPosition(
// //         String(selectedPositionId),
// //         {
// //           candidateId: tagFormData.candidateId,
// //           recruiterEmail: tagFormData.recruiter,
// //           immediateJoiner: tagFormData.immediateJoiner,
// //           status: tagFormData.status,
// //         }
// //       );

// //       if (response.status === 201) {
// //         alert("Candidate tagged to the position.");
// //         onTagged();
// //       } else {
// //         alert("Tagging failed: " + (response.message || "Unknown error"));
// //       }
// //     } catch (error) {
// //       console.error("Error tagging candidate:", error);
// //       alert("Could not tag the candidate. Try again.");
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 sm:p-4">
// //       <div className="bg-white w-full sm:max-w-md h-[92vh] sm:h-auto sm:max-h-[90vh] rounded-t-2xl sm:rounded-lg shadow-xl flex flex-col">
// //         <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200 shrink-0">
// //           <h2 className="text-lg sm:text-xl font-bold text-gray-800">
// //             Tag candidate
// //           </h2>
// //           <button
// //             type="button"
// //             onClick={onClose}
// //             className="text-gray-400 hover:text-gray-600"
// //           >
// //             <svg
// //               className="w-6 h-6"
// //               fill="none"
// //               stroke="currentColor"
// //               viewBox="0 0 24 24"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M6 18L18 6M6 6l12 12"
// //               />
// //             </svg>
// //           </button>
// //         </div>

// //         <form
// //           onSubmit={handleSubmit}
// //           className="flex-1 flex flex-col min-h-0"
// //         >
// //           <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Position name <span className="text-red-500">*</span>
// //             </label>
// //             <input
// //               type="text"
// //               required
// //               readOnly
// //               value={tagFormData.positionName}
// //               className="w-full h-10 px-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Applicant <span className="text-red-500">*</span>
// //             </label>
// //             <AsyncSelect
// //               cacheOptions
// //               defaultOptions={false}
// //               loadOptions={debouncedLoadOptions}
// //               isSearchable
// //               isClearable
// //               placeholder="Search by name or email..."
// //               noOptionsMessage={({ inputValue }) =>
// //                 !inputValue || inputValue.length < 2
// //                   ? "Type at least 2 characters"
// //                   : "No candidates found"
// //               }
// //               loadingMessage={() => "Searching..."}
// //               onChange={handleCandidateSelect}
// //               value={
// //                 tagFormData.candidateId
// //                   ? {
// //                       value: tagFormData.candidateId,
// //                       label: tagFormData.applicant,
// //                     }
// //                   : null
// //               }
// //               styles={{
// //                 control: (base) => ({
// //                   ...base,
// //                   minHeight: "40px",
// //                   borderColor: "#d1d5db",
// //                   "&:hover": { borderColor: "#3b82f6" },
// //                 }),
// //                 menu: (base) => ({ ...base, zIndex: 9999 }),
// //               }}
// //               components={{
// //                 DropdownIndicator: () => null,
// //                 IndicatorSeparator: () => null,
// //               }}
// //             />
// //             <p className="text-xs text-gray-500 mt-1">
// //               Type at least 2 characters to search.
// //             </p>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Recruiter <span className="text-red-500">*</span>
// //             </label>
// //             <input
// //               type="text"
// //               required
// //               value={tagFormData.recruiter}
// //               onChange={(e) =>
// //                 setTagFormData((prev: any) => ({
// //                   ...prev,
// //                   recruiter: e.target.value,
// //                 }))
// //               }
// //               className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               placeholder="Recruiter email"
// //             />
// //           </div>

// //           <div className="flex items-start">
// //             <input
// //               type="checkbox"
// //               id="immediateJoiner"
// //               checked={tagFormData.immediateJoiner}
// //               onChange={(e) =>
// //                 setTagFormData((prev: any) => ({
// //                   ...prev,
// //                   immediateJoiner: e.target.checked,
// //                 }))
// //               }
// //               className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
// //             />
// //             <div>
// //               <label
// //                 htmlFor="immediateJoiner"
// //                 className="text-sm font-medium text-gray-700"
// //               >
// //                 Immediate joiner
// //               </label>
// //               <p className="text-xs text-gray-500">
// //                 Tick this if the candidate can join within 15 days.
// //               </p>
// //             </div>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Status <span className="text-red-500">*</span>
// //             </label>
// //             <Select
// //               options={candidateStatusOptions}
// //               isSearchable
// //               placeholder="Select status..."
// //               value={
// //                 candidateStatusOptions.find(
// //                   (opt: any) => opt.value === tagFormData.status
// //                 ) || null
// //               }
// //               onChange={(selected: any) =>
// //                 setTagFormData((prev: any) => ({
// //                   ...prev,
// //                   status: selected?.value,
// //                 }))
// //               }
// //               styles={{
// //                 control: (base) => ({ ...base, minHeight: "40px" }),
// //                 menu: (base) => ({ ...base, zIndex: 9999 }),
// //               }}
// //             />
// //           </div>

// //           </div>

// //           <div className="flex gap-3 px-4 sm:px-6 py-3 border-t border-gray-200 shrink-0 bg-white sm:rounded-b-lg">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="flex-1 sm:flex-none sm:ml-auto px-4 h-11 sm:h-10 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               disabled={isSubmitting}
// //               className="flex-1 sm:flex-none px-4 h-11 sm:h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
// //             >
// //               {isSubmitting ? "Tagging..." : "Tag candidate"}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // /* ------------------------------------------------------------------ */
// // /* Position detail                                                     */
// // /* ------------------------------------------------------------------ */

// // /* ------------------------------------------------------------------ */
// // /* Positions table                                                     */
// // /* ------------------------------------------------------------------ */

// // const PositionTable = ({ positions, onOpen, onTag, onAIMatcher }) => (
// //   <>
// //     {/* Mobile: stacked cards */}
// //     <div className="md:hidden space-y-3">
// //       {positions.map((position: any) => (
// //         <div
// //           key={position.id}
// //           onClick={() => onOpen(position)}
// //           className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 active:bg-gray-50"
// //         >
// //           <div className="flex items-start justify-between gap-3">
// //             <p className="text-sm font-medium text-gray-900 leading-5 break-words">
// //               {position.positionName}
// //             </p>
// //             <span
// //               className={`shrink-0 inline-flex px-2 py-0.5 text-xs font-medium leading-4 rounded-full ${
// //                 position.priority === "High"
// //                   ? "bg-red-100 text-red-800"
// //                   : position.priority === "Medium"
// //                   ? "bg-yellow-100 text-yellow-800"
// //                   : "bg-green-100 text-green-800"
// //               }`}
// //             >
// //               {position.priority}
// //             </span>
// //           </div>

// //           <p className="text-sm text-gray-700 mt-1 break-words">
// //             {position.clientName}
// //           </p>

// //           <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
// //             <span>{position.ctcBudget}</span>
// //             <span className="flex items-center min-w-0">
// //               <MapPin className="w-3 h-3 mr-1 shrink-0" />
// //               <span className="truncate">{position.location}</span>
// //             </span>
// //             <span>
// //               {position.experience} • {position.workplaceType}
// //             </span>
// //           </div>

// //           <div className="flex gap-2 mt-3">
// //             <button
// //               className="flex-1 h-9 bg-green-100 text-green-800 text-xs font-medium rounded hover:bg-green-200"
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 onTag(position);
// //               }}
// //             >
// //               Tag candidate
// //             </button>
// //             <button
// //               className="flex-1 h-9 border border-purple-200 text-xs font-medium text-purple-600 rounded hover:bg-purple-50"
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 onAIMatcher();
// //               }}
// //             >
// //               AI matcher
// //             </button>
// //           </div>
// //         </div>
// //       ))}

// //       {positions.length === 0 && (
// //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-sm text-gray-500">
// //           No positions match this search.
// //         </div>
// //       )}
// //     </div>

// //     {/* Desktop: table */}
// //     <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// //     <div className="w-full">
// //       <table className="w-full table-fixed divide-y divide-gray-200">
// //         <colgroup>
// //           <col className="w-[30%]" />
// //           <col className="w-[24%]" />
// //           <col className="w-[20%]" />
// //           <col className="w-[26%]" />
// //         </colgroup>
// //         <thead className="bg-gray-50">
// //           <tr>
// //             <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               Position
// //             </th>
// //             <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               Client and priority
// //             </th>
// //             <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               CTC and location
// //             </th>
// //             <th className="px-4 py-2.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               Actions
// //             </th>
// //           </tr>
// //         </thead>
// //         <tbody className="bg-white divide-y divide-gray-200">
// //           {positions.map((position: any) => {
// //             return (
// //               <tr
// //                 key={position.id}
// //                 className="hover:bg-gray-50 cursor-pointer align-top"
// //                 onClick={() => onOpen(position)}
// //               >
// //                 <td className="px-4 py-3 align-top">
// //                   <div className="flex flex-col min-w-0">
// //                     <span className="text-sm font-medium text-gray-900 leading-5 break-words">
// //                       {position.positionName}
// //                     </span>
// //                     <span className="text-xs text-gray-500 leading-5 mt-0.5 truncate">
// //                       {position.experience} • {position.workplaceType}
// //                     </span>
// //                   </div>
// //                 </td>

// //                 <td className="px-4 py-3 align-top">
// //                   <div className="flex flex-col min-w-0">
// //                   <span className="text-sm text-gray-900 leading-5 break-words">
// //                     {position.clientName}
// //                   </span>
// //                   <span
// //                     className={`inline-flex self-start mt-1 px-2 py-0.5 text-xs font-medium leading-4 rounded-full ${
// //                       position.priority === "High"
// //                         ? "bg-red-100 text-red-800"
// //                         : position.priority === "Medium"
// //                         ? "bg-yellow-100 text-yellow-800"
// //                         : "bg-green-100 text-green-800"
// //                     }`}
// //                   >
// //                     {position.priority}
// //                   </span>
// //                   </div>
// //                 </td>

// //                 <td className="px-4 py-3 align-top">
// //                   <div className="flex flex-col min-w-0">
// //                     <span className="text-sm text-gray-900 leading-5 truncate">
// //                       {position.ctcBudget}
// //                     </span>
// //                     <span className="text-xs text-gray-500 leading-5 mt-0.5 flex items-center min-w-0">
// //                       <MapPin className="w-3 h-3 mr-1 shrink-0" />
// //                       <span className="truncate">{position.location}</span>
// //                     </span>
// //                   </div>
// //                 </td>

// //                 <td className="px-4 py-3 align-top">
// //                   <div className="flex justify-end items-start gap-2">
// //                     <button
// //                       className="h-7 px-2.5 bg-green-100 text-green-800 text-xs font-medium rounded hover:bg-green-200 whitespace-nowrap"
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         onTag(position);
// //                       }}
// //                     >
// //                       Tag candidate
// //                     </button>
// //                     <button
// //                       className="h-7 px-2.5 text-xs font-medium text-purple-600 rounded hover:bg-purple-50 whitespace-nowrap"
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         onAIMatcher();
// //                       }}
// //                     >
// //                       AI matcher
// //                     </button>
// //                   </div>
// //                 </td>
// //               </tr>
// //             );
// //           })}

// //           {positions.length === 0 && (
// //             <tr>
// //               <td
// //                 colSpan={4}
// //                 className="px-4 py-10 text-center text-sm text-gray-500"
// //               >
// //                 No positions match this search. Clear the filters or create a
// //                 position.
// //               </td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>
// //     </div>
// //     </div>
// //   </>
// // );

// // /* ------------------------------------------------------------------ */
// // /* Main                                                                */
// // /* ------------------------------------------------------------------ */

// // const PositionManagement = () => {
// //   const [currentView, setCurrentView] = useState("positions");
// //   const [selectedPosition, setSelectedPosition] = useState<any>(null);
// //   const [tagPositionId, setTagPositionId] = useState<any>(null);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [filterBy, setFilterBy] = useState("all");
// //   const [groupBy, setGroupBy] = useState("none");
// //   const [showTagForm, setShowTagForm] = useState(false);
// //   const [showAddCandidate, setShowAddCandidate] = useState<any>(false);
// //   const [showCandidateForm, setShowCandidateForm] = useState(false);
// //   const [showCreatePosition, setShowCreatePosition] = useState(false);
// //   const [candidateEmail, setCandidateEmail] = useState("");
// //   const [loadingPositionDetail, setLoadingPositionDetail] = useState(false);
// //   const [clientOptions, setClientOptions] = useState<any[]>([]);
// //   const [isSubmittingTag, setIsSubmittingTag] = useState(false);
// //   const [positions, setPositions] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   const navigate = useNavigate();
// //   const recruiter = localStorage.getItem("email") || "";

// //   const [tagFormData, setTagFormData] = useState<any>({
// //     positionName: "",
// //     applicant: "",
// //     candidateId: null,
// //     recruiter: "",
// //     immediateJoiner: false,
// //     status: "",
// //   });

// //   const [candidates, setCandidates] = useState<any[]>([
// //     {
// //       id: 1,
// //       email: "john.smith@email.com",
// //       name: "John Smith",
// //       currentCTC: 1500000,
// //       expectedCTC: 2000000,
// //       noticePeriod: 30,
// //       status: "submitted",
// //       positionId: 1,
// //       recruiter: recruiter,
// //       source: "recruiter",
// //     },
// //     {
// //       id: 2,
// //       email: "jane.doe@email.com",
// //       name: "Jane Doe",
// //       currentCTC: 1200000,
// //       expectedCTC: 1800000,
// //       noticePeriod: 60,
// //       status: "internal_screening",
// //       positionId: 1,
// //       recruiter: "AI Matcher",
// //       source: "direct",
// //       aiScore: null,
// //     },
// //     {
// //       id: 3,
// //       email: "alex.kumar@email.com",
// //       name: "Alex Kumar",
// //       currentCTC: 1800000,
// //       expectedCTC: 2500000,
// //       noticePeriod: 45,
// //       status: "internal_screening",
// //       positionId: 1,
// //       recruiter: "Direct Application",
// //       source: "direct",
// //       aiScore: null,
// //     },
// //     {
// //       id: 4,
// //       email: "priya.sharma@email.com",
// //       name: "Priya Sharma",
// //       currentCTC: 1600000,
// //       expectedCTC: 2200000,
// //       noticePeriod: 30,
// //       status: "internal_screening",
// //       positionId: 1,
// //       recruiter: "Direct Application",
// //       source: "direct",
// //       aiScore: null,
// //     },
// //     {
// //       id: 5,
// //       email: "rajesh.patel@email.com",
// //       name: "Rajesh Patel",
// //       currentCTC: 1400000,
// //       expectedCTC: 2000000,
// //       noticePeriod: 60,
// //       status: "internal_reject",
// //       positionId: 1,
// //       recruiter: "Direct Application",
// //       source: "direct",
// //       aiScore: 12,
// //     },
// //   ]);

// //   const [newCandidate, setNewCandidate] = useState<any>({
// //     email: "",
// //     resume: null,
// //     currentCTC: "",
// //     specialComments: "",
// //     education: "",
// //     gender: "",
// //     openToRelocation: false,
// //     engagementType: "",
// //     expectedCTC: "",
// //     noticePeriod: "",
// //     recruiter: recruiter,
// //   });

// //   /* -------------------- data -------------------- */

// //   const transformPosition = (position: any) => {
// //     const [submitted, targeted] = String(position.progress || "0/0")
// //       .split("/")
// //       .map(Number);

// //     return {
// //       id: position.id,
// //       positionName: position.title,
// //       clientName: position.client,
// //       submittedResumes: submitted || 0,
// //       targetedResumes: targeted || 0,
// //       ctcBudget: Number.isFinite(Number(position.ctc)) && Number(position.ctc) > 0
// //         ? `${(Number(position.ctc) / 100000).toFixed(0)} LPA`
// //         : "N/A",
// //       location: position.location || "N/A",
// //       priority: position.priority || "Medium",
// //       experience: position.experience ? `${position.experience} years` : "N/A",
// //       workplaceType: position.mode || "N/A",
// //       status: position.status || "Active",
// //       ctcBudgetNumeric: position.ctc || 0,
// //       city: position.location || "N/A",
// //       experienceYears: position.experience || "N/A",
// //       daysSinceNoAction: position.daysSinceNoAction || 0,
// //       education: position.education || "N/A",
// //       roleDescription: position.roleDescription || "",
// //       preferredIndustry: position.preferredIndustry || "",
// //       preferredCompanies: position.preferredCompanies || "",
// //       reportees: position.reportees || 0,
// //       deadline: position.deadline || "",
// //       rounds: position.rounds || 0,
// //       interviewerName: position.interviewerName || "",
// //       interviewerLinkedIn: position.interviewerLinkedIn || "",
// //       ctcStructure: position.ctcStructure || "",
// //       roleType: position.roleType || "",
// //       diversityPreference: position.diversityPreference || "",
// //       interviewMode: position.interviewMode || "",
// //       jobType: position.jobType || "",
// //       clientSPOC: position.clientSPOC || "",
// //       lakshSPOC: position.lakshSPOC || "",
// //       recruiter: position.recruiter || "",
// //       function: position.function || "",
// //       role: position.role || "",
// //       target: targeted || 0,
// //       createdDate: position.createdDate || new Date().toISOString(),
// //       lastActivityDate: position.lastActivityDate || new Date().toISOString(),
// //     };
// //   };

// //   const loadPositions = async () => {
// //     try {
// //       const res = await positionService.fetchAll(1, 2000);
// //       if (res.status === 200) {
// //         setPositions(res.data.positions.map(transformPosition));
// //       } else {
// //         console.error("Failed to fetch positions:", res.message);
// //       }
// //     } catch (err) {
// //       console.error("Error fetching positions:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchPositionDetail = async (positionId: any) => {
// //     setLoadingPositionDetail(true);
// //     try {
// //       const res = await positionService.fetchById(positionId);
// //       if (res.status === 200) {
// //         const position = res.data;
// //         setSelectedPosition({
// //           id: String(position.id),
// //           positionName: position.title || "N/A",
// //           clientName: position.clientName || "N/A",
// //           submittedResumes: position.submittedCandidates?.length || 0,
// //           targetedResumes: position.targetedResumes || 0,
// //           ctcBudget: position.ctcBudget
// //             ? `${(Number(position.ctcBudget) / 100000).toFixed(0)} LPA`
// //             : "N/A",
// //           ctcStructure: position.ctcStructure || "",
// //           city: position.location || "",
// //           location: position.location || "",
// //           experience: position.experience ? `${position.experience} years` : "",
// //           priority: position.priority || "",
// //           function: position.function || "",
// //           role: position.role || "",
// //           workplaceType: position.workplaceType || "",
// //           status: position.status || "Open",
// //           education: position.education || "",
// //           roleDescription: position.roleDescription || "",
// //           preferredIndustry: position.preferredIndustry || [],
// //           preferredCompanies: position.preferredCompanies || [],
// //           reportees: position.reportees || 0,
// //           target: position.target || 0,
// //           deadline: position.deadline || "",
// //           rounds: position.interviewRounds || 0,
// //           interviewerName: position.interviewer || "",
// //           diversityPreference: position.diversityPreference || "",
// //           interviewMode: position.interviewMode || "",
// //           jobType: position.jobType || "",
// //           roleType: position.roleType || "",
// //           clientSpoc: position.clientSpoc || "",
// //           lakshSpoc: position.lakshSpoc?.filter(Boolean) || [],
// //           recruiter: position.recruiter || "",
// //           linkedIn: position.linkedin || null,
// //           submittedCandidates: position.submittedCandidates || [],
// //           message: position.message || "",
// //         });
// //       }
// //     } catch (err) {
// //       console.error("Error fetching position detail:", err);
// //     } finally {
// //       setLoadingPositionDetail(false);
// //     }
// //   };

// //   useEffect(() => {
// //     const fetchClients = async () => {
// //       const res = await clientService.fetchAll();
// //       const clients = res?.data || [];
// //       setClientOptions(
// //         clients.map((c: any) => ({
// //           id: c.id,
// //           label: c.client_name,
// //           value: c.id,
// //           clientHRSpocs: c.clientHRSpocs || [],
// //         }))
// //       );
// //     };
// //     fetchClients();
// //   }, []);

// //   useEffect(() => {
// //     loadPositions();
// //   }, []);

// //   // Open straight into a position when arriving from a shared link
// //   useEffect(() => {
// //     const shared = new URLSearchParams(window.location.search).get("position");
// //     if (shared) {
// //       fetchPositionDetail(shared);
// //       setCurrentView("position-detail");
// //     }
// //   }, []);

// //   /* -------------------- derived -------------------- */

// //   const filteredPositions = positions.filter((position) => {
// //     const term = searchTerm.toLowerCase();
// //     const matchesSearch =
// //       (position.positionName || "").toLowerCase().includes(term) ||
// //       (position.clientName || "").toLowerCase().includes(term) ||
// //       (position.location || "").toLowerCase().includes(term) ||
// //       (position.priority || "").toLowerCase().includes(term) ||
// //       (position.experience || "").toLowerCase().includes(term);

// //     if (filterBy === "all") return matchesSearch;
// //     return matchesSearch && position.priority === filterBy;
// //   });

// //   const groupedPositions =
// //     groupBy === "clientName"
// //       ? filteredPositions.reduce((acc: any, position: any) => {
// //           const client = position.clientName || "Unassigned";
// //           if (!acc[client]) acc[client] = [];
// //           acc[client].push(position);
// //           return acc;
// //         }, {})
// //       : { "All Positions": filteredPositions };

// //   /* -------------------- handlers -------------------- */

// //   const handleEmailCheck = () => {
// //     const existingCandidate = candidates.find((c) => c.email === candidateEmail);
// //     if (existingCandidate) {
// //       setCandidates((prev) =>
// //         prev.map((c) =>
// //           c.email === candidateEmail ? { ...c, positionId: showAddCandidate } : c
// //         )
// //       );
// //       setShowAddCandidate(false);
// //       setCandidateEmail("");
// //       alert("Candidate tagged to the position.");
// //     } else {
// //       setShowCandidateForm(true);
// //       setNewCandidate({ ...newCandidate, email: candidateEmail });
// //     }
// //   };

// //   const handleCreateCandidate = () => {
// //     const candidate = {
// //       id: candidates.length + 1,
// //       ...newCandidate,
// //       status: "submitted",
// //       positionId: showAddCandidate,
// //       source: "recruiter",
// //       name: newCandidate.email.split("@")[0].replace(".", " "),
// //     };
// //     setCandidates([...candidates, candidate]);
// //     setShowCandidateForm(false);
// //     setShowAddCandidate(false);
// //     setNewCandidate({
// //       email: "",
// //       resume: null,
// //       currentCTC: "",
// //       specialComments: "",
// //       education: "",
// //       gender: "",
// //       openToRelocation: false,
// //       engagementType: "",
// //       expectedCTC: "",
// //       noticePeriod: "",
// //       recruiter: recruiter,
// //     });
// //     alert("Candidate created and tagged.");
// //   };

// //   const handleCreatePosition = async (payload: any) => {
// //     try {
// //       const response = await positionService.createPosition(payload);

// //       if (response.status === 201 || response.status === 200) {
// //         alert("Position created.");
// //         await loadPositions();
// //         return true;
// //       }

// //       alert(
// //         "Could not create the position: " + (response.message || "Unknown error")
// //       );
// //       return false;
// //     } catch (error) {
// //       console.error("Error creating position:", error);
// //       alert("Could not create the position. Try again.");
// //       return false;
// //     }
// //   };

// //   const handleUpdatePosition = async (payload: any) => {
// //     try {
// //       const response = await positionService.updatePosition(
// //         String(payload.id),
// //         payload
// //       );

// //       if (response.status === 200) {
// //         await fetchPositionDetail(payload.id);
// //         await loadPositions();
// //         return true;
// //       }

// //       alert("Update failed: " + (response.message || "Unknown error"));
// //       return false;
// //     } catch (error: any) {
// //       console.error("Error updating position:", error);
// //       alert("Could not update the position: " + (error.message || "Try again."));
// //       return false;
// //     }
// //   };

// //   const runAIResumeMatcherForPosition = (positionId: any) => {
// //     const eligibleCandidates = candidates.filter(
// //       (c) =>
// //         c.positionId === positionId &&
// //         c.source === "direct" &&
// //         c.status === "internal_screening"
// //     );

// //     if (eligibleCandidates.length === 0) {
// //       alert("No candidates in internal screening for this position.");
// //       return;
// //     }

// //     alert(`Scoring ${eligibleCandidates.length} candidates...`);

// //     setTimeout(() => {
// //       const scored = candidates.map((c) => {
// //         if (!eligibleCandidates.find((e) => e.id === c.id)) return c;
// //         const score = Math.floor(Math.random() * 100) + 1;
// //         return {
// //           ...c,
// //           aiScore: score,
// //           status: score >= 85 ? "internal_screening" : "internal_reject",
// //         };
// //       });
// //       setCandidates(scored);

// //       const qualified = scored.filter(
// //         (c) =>
// //           eligibleCandidates.find((e) => e.id === c.id) && (c.aiScore || 0) >= 85
// //       ).length;

// //       alert(
// //         `Scoring complete. ${qualified} candidates qualified for recruiter review; the rest moved to internal reject.`
// //       );
// //     }, 3000);
// //   };

// //   const openTagForm = (position: any) => {
// //     setTagPositionId(position.id);
// //     setTagFormData({
// //       positionName: position.positionName,
// //       applicant: "",
// //       candidateId: null,
// //       recruiter: recruiter,
// //       immediateJoiner: false,
// //       status: "",
// //     });
// //     setShowTagForm(true);
// //   };

// //   const closeTagForm = () => {
// //     setShowTagForm(false);
// //     setTagPositionId(null);
// //     setTagFormData({
// //       positionName: "",
// //       applicant: "",
// //       candidateId: null,
// //       recruiter: "",
// //       immediateJoiner: false,
// //       status: "",
// //     });
// //   };

// //   /* -------------------- detail navigation -------------------- */

// //   const currentPositionIndex = selectedPosition
// //     ? filteredPositions.findIndex(
// //         (p: any) => String(p.id) === String(selectedPosition.id)
// //       )
// //     : -1;

// //   const stepPosition = (delta: number) => {
// //     const next = filteredPositions[currentPositionIndex + delta];
// //     if (next) fetchPositionDetail(next.id);
// //   };

// //   /* -------------------- detail view -------------------- */

// //   if (currentView === "position-detail" && selectedPosition) {
// //     return (
// //       <PositionDetail
// //         position={selectedPosition}
// //         candidates={candidates}
// //         recruiter={recruiter}
// //         onBack={() => {
// //           setSelectedPosition(null);
// //           setCurrentView("positions");
// //         }}
// //         setCandidates={setCandidates}
// //         runAIResumeMatcherForPosition={runAIResumeMatcherForPosition}
// //         onSave={handleUpdatePosition}
// //         onPrev={() => stepPosition(-1)}
// //         onNext={() => stepPosition(1)}
// //         hasPrev={currentPositionIndex > 0}
// //         hasNext={
// //           currentPositionIndex >= 0 &&
// //           currentPositionIndex < filteredPositions.length - 1
// //         }
// //         functionOptions={functionOptions}
// //         roleOptions={roleOptions}
// //         educationOptions={educationOptions}
// //         cityOptions={cityOptions}
// //       />
// //     );
// //   }

// //   /* -------------------- list view -------------------- */

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Header />

// //       {showTagForm && (
// //         <TagCandidateModal
// //           onClose={closeTagForm}
// //           tagFormData={tagFormData}
// //           setTagFormData={setTagFormData}
// //           selectedPositionId={tagPositionId}
// //           isSubmitting={isSubmittingTag}
// //           setIsSubmitting={setIsSubmittingTag}
// //           onTagged={() => {
// //             closeTagForm();
// //             loadPositions();
// //           }}
// //         />
// //       )}

// //       <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
// //         {/* Toolbar: search, filters and create action on one line */}
// //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
// //           <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap md:items-center gap-3">
// //             <div className="relative flex-1 min-w-0 basis-full lg:basis-auto">
// //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
// //               <input
// //                 type="text"
// //                 placeholder="Search by position, client, location, priority or experience"
// //                 className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>

// //             <select
// //               className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:flex-1 lg:flex-none lg:w-44 shrink-0"
// //               value={filterBy}
// //               onChange={(e) => setFilterBy(e.target.value)}
// //             >
// //               <option value="all">All priorities</option>
// //               <option value="High">High priority</option>
// //               <option value="Medium">Medium priority</option>
// //               <option value="Low">Low priority</option>
// //             </select>

// //             <select
// //               className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:flex-1 lg:flex-none lg:w-44 shrink-0"
// //               value={groupBy}
// //               onChange={(e) => setGroupBy(e.target.value)}
// //             >
// //               <option value="none">No grouping</option>
// //               <option value="clientName">Group by client</option>
// //             </select>

// //             <button
// //               className="h-10 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shrink-0"
// //               onClick={() => setShowCreatePosition(true)}
// //             >
// //               <Plus className="w-4 h-4" />
// //               Create position
// //             </button>
// //           </div>
// //         </div>

// //         {/* Positions */}
// //         {loading ? (
// //           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center text-sm text-gray-500">
// //             Loading positions...
// //           </div>
// //         ) : (
// //           <div className="space-y-6">
// //             {Object.entries(groupedPositions).map(
// //               ([groupName, groupPositions]: any) => (
// //                 <div key={groupName} className="space-y-3">
// //                   {groupBy !== "none" && (
// //                     <h2 className="text-lg font-semibold text-gray-900">
// //                       {groupName}
// //                     </h2>
// //                   )}
// //                   <PositionTable
// //                     positions={groupPositions}
// //                     onOpen={(position: any) => {
// //                       fetchPositionDetail(position.id);
// //                       setCurrentView("position-detail");
// //                     }}
// //                     onTag={openTagForm}
// //                     onAIMatcher={() => navigate("/ai-matcher")}
// //                   />
// //                 </div>
// //               )
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       {/* Add Candidate Modal */}
// //       {showAddCandidate && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
// //           <div className="bg-white rounded-lg p-6 w-full max-w-md">
// //             <h2 className="text-xl font-semibold mb-4">Add candidate</h2>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Email ID
// //             </label>
// //             <input
// //               type="email"
// //               className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               value={candidateEmail}
// //               onChange={(e) => setCandidateEmail(e.target.value)}
// //               placeholder="candidate@email.com"
// //             />
// //             <div className="flex gap-3 mt-5">
// //               <button
// //                 onClick={handleEmailCheck}
// //                 className="flex-1 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
// //                 disabled={!candidateEmail}
// //               >
// //                 Check email
// //               </button>
// //               <button
// //                 onClick={() => setShowAddCandidate(false)}
// //                 className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Create Candidate Modal */}
// //       {showCandidateForm && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
// //           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
// //             <div className="px-6 py-4 border-b border-gray-200">
// //               <h2 className="text-xl font-semibold">Create candidate</h2>
// //             </div>
// //             <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Email
// //                 </label>
// //                 <input
// //                   type="email"
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.email}
// //                   onChange={(e) =>
// //                     setNewCandidate({ ...newCandidate, email: e.target.value })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Current CTC (₹)
// //                 </label>
// //                 <input
// //                   type="number"
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.currentCTC}
// //                   onChange={(e) =>
// //                     setNewCandidate({
// //                       ...newCandidate,
// //                       currentCTC: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Expected CTC (₹)
// //                 </label>
// //                 <input
// //                   type="number"
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.expectedCTC}
// //                   onChange={(e) =>
// //                     setNewCandidate({
// //                       ...newCandidate,
// //                       expectedCTC: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Notice period (days)
// //                 </label>
// //                 <input
// //                   type="number"
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.noticePeriod}
// //                   onChange={(e) =>
// //                     setNewCandidate({
// //                       ...newCandidate,
// //                       noticePeriod: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Education
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.education}
// //                   onChange={(e) =>
// //                     setNewCandidate({
// //                       ...newCandidate,
// //                       education: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Gender
// //                 </label>
// //                 <select
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.gender}
// //                   onChange={(e) =>
// //                     setNewCandidate({ ...newCandidate, gender: e.target.value })
// //                   }
// //                 >
// //                   <option value="">Select gender</option>
// //                   <option value="Male">Male</option>
// //                   <option value="Female">Female</option>
// //                   <option value="Other">Other</option>
// //                 </select>
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Engagement type
// //                 </label>
// //                 <select
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.engagementType}
// //                   onChange={(e) =>
// //                     setNewCandidate({
// //                       ...newCandidate,
// //                       engagementType: e.target.value,
// //                     })
// //                   }
// //                 >
// //                   <option value="">Select type</option>
// //                   <option value="Full-time">Full-time</option>
// //                   <option value="Part-time">Part-time</option>
// //                   <option value="Contract">Contract</option>
// //                 </select>
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Recruiter
// //                 </label>
// //                 <input
// //                   type="text"
// //                   readOnly
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm bg-gray-100"
// //                   value={newCandidate.recruiter}
// //                 />
// //               </div>
// //               <div className="md:col-span-2">
// //                 <label className="flex items-center text-sm text-gray-700">
// //                   <input
// //                     type="checkbox"
// //                     className="mr-2 h-4 w-4"
// //                     checked={newCandidate.openToRelocation}
// //                     onChange={(e) =>
// //                       setNewCandidate({
// //                         ...newCandidate,
// //                         openToRelocation: e.target.checked,
// //                       })
// //                     }
// //                   />
// //                   Open to relocation
// //                 </label>
// //               </div>
// //               <div className="md:col-span-2">
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Special comments
// //                 </label>
// //                 <textarea
// //                   rows={3}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.specialComments}
// //                   onChange={(e) =>
// //                     setNewCandidate({
// //                       ...newCandidate,
// //                       specialComments: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //             </div>
// //             <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
// //               <button
// //                 onClick={handleCreateCandidate}
// //                 className="flex-1 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// //               >
// //                 Create candidate
// //               </button>
// //               <button
// //                 onClick={() => setShowCandidateForm(false)}
// //                 className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <CreatePositionWizard
// //         open={showCreatePosition}
// //         onClose={() => setShowCreatePosition(false)}
// //         onCreate={handleCreatePosition}
// //         recruiter={recruiter}
// //         clientOptions={clientOptions}
// //         functionOptions={functionOptions}
// //         roleOptions={roleOptions}
// //         educationOptions={educationOptions}
// //         cityOptions={cityOptions}
// //       />
// //     </div>
// //   );
// // };

// // export default PositionManagement;




// // import { useState, useEffect, useRef } from "react";
// // import Header from "../components/Header";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { Search, Plus, Users, Bot, ArrowLeft, Mail, MapPin } from "lucide-react";
// // import { positionService } from "../services/positionService";
// // import { clientService } from "../services/clientService";
// // import Select from "react-select";
// // import {
// //   educationOptions,
// //   functionOptions,
// //   roleOptions,
// //   cityOptions,
// //   candidateStatusOptions,
// // } from "../constants/dropdown";
// // import AsyncSelect from "react-select/async";
// // import CreatePositionWizard from "../components/positions/CreatePositionWizard";
// // import PositionDetail from "../components/positions/Positiondetail";

// // /* ------------------------------------------------------------------ */
// // /* Shared helpers                                                      */
// // /* ------------------------------------------------------------------ */

// // /* ------------------------------------------------------------------ */
// // /* Tag Candidate Modal (moved to top level so it does not remount on    */
// // /* every keystroke, which was stealing focus from the inputs)          */
// // /* ------------------------------------------------------------------ */

// // const TagCandidateModal = ({
// //   onClose,
// //   tagFormData,
// //   setTagFormData,
// //   selectedPositionId,
// //   isSubmitting,
// //   setIsSubmitting,
// //   onTagged,
// // }) => {
// //   const searchTimeout = useRef<any>(null);

// //   const debouncedLoadOptions = (inputValue: string, callback: any) => {
// //     if (searchTimeout.current) clearTimeout(searchTimeout.current);

// //     if (!inputValue || inputValue.trim().length < 2) {
// //       callback([]);
// //       return;
// //     }

// //     searchTimeout.current = setTimeout(async () => {
// //       try {
// //         const res = await positionService.fetchAutocomplete(inputValue.trim());
// //         const candidates = res?.data || [];
// //         callback(
// //           candidates.map((candidate: any) => ({
// //             value: candidate.id,
// //             label: `${candidate.name} (${candidate.email})`,
// //             email: candidate.email,
// //             name: candidate.name,
// //           }))
// //         );
// //       } catch (err) {
// //         console.error("Autocomplete fetch error:", err);
// //         callback([]);
// //       }
// //     }, 300);
// //   };

// //   const handleCandidateSelect = (selectedOption: any) => {
// //     setTagFormData((prev: any) => ({
// //       ...prev,
// //       applicant: selectedOption ? selectedOption.label : "",
// //       candidateId: selectedOption ? selectedOption.value : null,
// //     }));
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (!tagFormData.candidateId) {
// //       alert("Select a candidate before submitting.");
// //       return;
// //     }
// //     if (!tagFormData.recruiter) {
// //       alert("Recruiter email is required.");
// //       return;
// //     }

// //     setIsSubmitting(true);
// //     try {
// //       const response = await positionService.tagCandidateToPosition(
// //         String(selectedPositionId),
// //         {
// //           candidateId: tagFormData.candidateId,
// //           recruiterEmail: tagFormData.recruiter,
// //           immediateJoiner: tagFormData.immediateJoiner,
// //           status: tagFormData.status,
// //         }
// //       );

// //       if (response.status === 201) {
// //         alert("Candidate tagged to the position.");
// //         onTagged();
// //       } else {
// //         alert("Tagging failed: " + (response.message || "Unknown error"));
// //       }
// //     } catch (error) {
// //       console.error("Error tagging candidate:", error);
// //       alert("Could not tag the candidate. Try again.");
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 sm:p-4">
// //       <div className="bg-white w-full sm:max-w-md h-[92vh] sm:h-auto sm:max-h-[90vh] rounded-t-2xl sm:rounded-lg shadow-xl flex flex-col">
// //         <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200 shrink-0">
// //           <h2 className="text-lg sm:text-xl font-bold text-gray-800">
// //             Tag candidate
// //           </h2>
// //           <button
// //             type="button"
// //             onClick={onClose}
// //             className="text-gray-400 hover:text-gray-600"
// //           >
// //             <svg
// //               className="w-6 h-6"
// //               fill="none"
// //               stroke="currentColor"
// //               viewBox="0 0 24 24"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M6 18L18 6M6 6l12 12"
// //               />
// //             </svg>
// //           </button>
// //         </div>

// //         <form
// //           onSubmit={handleSubmit}
// //           className="flex-1 flex flex-col min-h-0"
// //         >
// //           <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Position name <span className="text-red-500">*</span>
// //             </label>
// //             <input
// //               type="text"
// //               required
// //               readOnly
// //               value={tagFormData.positionName}
// //               className="w-full h-10 px-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Applicant <span className="text-red-500">*</span>
// //             </label>
// //             <AsyncSelect
// //               cacheOptions
// //               defaultOptions={false}
// //               loadOptions={debouncedLoadOptions}
// //               isSearchable
// //               isClearable
// //               placeholder="Search by name or email..."
// //               noOptionsMessage={({ inputValue }) =>
// //                 !inputValue || inputValue.length < 2
// //                   ? "Type at least 2 characters"
// //                   : "No candidates found"
// //               }
// //               loadingMessage={() => "Searching..."}
// //               onChange={handleCandidateSelect}
// //               value={
// //                 tagFormData.candidateId
// //                   ? {
// //                       value: tagFormData.candidateId,
// //                       label: tagFormData.applicant,
// //                     }
// //                   : null
// //               }
// //               styles={{
// //                 control: (base) => ({
// //                   ...base,
// //                   minHeight: "40px",
// //                   borderColor: "#d1d5db",
// //                   "&:hover": { borderColor: "#3b82f6" },
// //                 }),
// //                 menu: (base) => ({ ...base, zIndex: 9999 }),
// //               }}
// //               components={{
// //                 DropdownIndicator: () => null,
// //                 IndicatorSeparator: () => null,
// //               }}
// //             />
// //             <p className="text-xs text-gray-500 mt-1">
// //               Type at least 2 characters to search.
// //             </p>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Recruiter <span className="text-red-500">*</span>
// //             </label>
// //             <input
// //               type="text"
// //               required
// //               value={tagFormData.recruiter}
// //               onChange={(e) =>
// //                 setTagFormData((prev: any) => ({
// //                   ...prev,
// //                   recruiter: e.target.value,
// //                 }))
// //               }
// //               className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               placeholder="Recruiter email"
// //             />
// //           </div>

// //           <div className="flex items-start">
// //             <input
// //               type="checkbox"
// //               id="immediateJoiner"
// //               checked={tagFormData.immediateJoiner}
// //               onChange={(e) =>
// //                 setTagFormData((prev: any) => ({
// //                   ...prev,
// //                   immediateJoiner: e.target.checked,
// //                 }))
// //               }
// //               className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
// //             />
// //             <div>
// //               <label
// //                 htmlFor="immediateJoiner"
// //                 className="text-sm font-medium text-gray-700"
// //               >
// //                 Immediate joiner
// //               </label>
// //               <p className="text-xs text-gray-500">
// //                 Tick this if the candidate can join within 15 days.
// //               </p>
// //             </div>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Status <span className="text-red-500">*</span>
// //             </label>
// //             <Select
// //               options={candidateStatusOptions}
// //               isSearchable
// //               placeholder="Select status..."
// //               value={
// //                 candidateStatusOptions.find(
// //                   (opt: any) => opt.value === tagFormData.status
// //                 ) || null
// //               }
// //               onChange={(selected: any) =>
// //                 setTagFormData((prev: any) => ({
// //                   ...prev,
// //                   status: selected?.value,
// //                 }))
// //               }
// //               styles={{
// //                 control: (base) => ({ ...base, minHeight: "40px" }),
// //                 menu: (base) => ({ ...base, zIndex: 9999 }),
// //               }}
// //             />
// //           </div>

// //           </div>

// //           <div className="flex gap-3 px-4 sm:px-6 py-3 border-t border-gray-200 shrink-0 bg-white sm:rounded-b-lg">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="flex-1 sm:flex-none sm:ml-auto px-4 h-11 sm:h-10 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               disabled={isSubmitting}
// //               className="flex-1 sm:flex-none px-4 h-11 sm:h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
// //             >
// //               {isSubmitting ? "Tagging..." : "Tag candidate"}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // /* ------------------------------------------------------------------ */
// // /* Position detail                                                     */
// // /* ------------------------------------------------------------------ */

// // /* ------------------------------------------------------------------ */
// // /* Positions table                                                     */
// // /* ------------------------------------------------------------------ */

// // const PositionTable = ({ positions, onOpen, onTag, onAIMatcher }) => (
// //   <>
// //     {/* Mobile: stacked cards */}
// //     <div className="md:hidden space-y-3">
// //       {positions.map((position: any) => (
// //         <div
// //           key={position.id}
// //           onClick={() => onOpen(position)}
// //           className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 active:bg-gray-50"
// //         >
// //           <div className="flex items-start justify-between gap-3">
// //             <p className="text-sm font-medium text-gray-900 leading-5 break-words">
// //               {position.positionName}
// //             </p>
// //             <span
// //               className={`shrink-0 inline-flex px-2 py-0.5 text-xs font-medium leading-4 rounded-full ${
// //                 position.priority === "High"
// //                   ? "bg-red-100 text-red-800"
// //                   : position.priority === "Medium"
// //                   ? "bg-yellow-100 text-yellow-800"
// //                   : "bg-green-100 text-green-800"
// //               }`}
// //             >
// //               {position.priority}
// //             </span>
// //           </div>

// //           <p className="text-sm text-gray-700 mt-1 break-words">
// //             {position.clientName}
// //           </p>

// //           <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
// //             <span>{position.ctcBudget}</span>
// //             <span className="flex items-center min-w-0">
// //               <MapPin className="w-3 h-3 mr-1 shrink-0" />
// //               <span className="truncate">{position.location}</span>
// //             </span>
// //             <span>
// //               {position.experience} • {position.workplaceType}
// //             </span>
// //           </div>

// //           <div className="flex gap-2 mt-3">
// //             <button
// //               className="flex-1 h-9 bg-green-100 text-green-800 text-xs font-medium rounded hover:bg-green-200"
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 onTag(position);
// //               }}
// //             >
// //               Tag candidate
// //             </button>
// //             <button
// //               className="flex-1 h-9 border border-purple-200 text-xs font-medium text-purple-600 rounded hover:bg-purple-50"
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 onAIMatcher();
// //               }}
// //             >
// //               AI matcher
// //             </button>
// //           </div>
// //         </div>
// //       ))}

// //       {positions.length === 0 && (
// //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-sm text-gray-500">
// //           No positions match this search.
// //         </div>
// //       )}
// //     </div>

// //     {/* Desktop: table */}
// //     <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// //     <div className="w-full">
// //       <table className="w-full table-fixed divide-y divide-gray-200">
// //         <colgroup>
// //           <col className="w-[30%]" />
// //           <col className="w-[24%]" />
// //           <col className="w-[20%]" />
// //           <col className="w-[26%]" />
// //         </colgroup>
// //         <thead className="bg-gray-50">
// //           <tr>
// //             <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               Position
// //             </th>
// //             <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               Client and priority
// //             </th>
// //             <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               CTC and location
// //             </th>
// //             <th className="px-4 py-2.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               Actions
// //             </th>
// //           </tr>
// //         </thead>
// //         <tbody className="bg-white divide-y divide-gray-200">
// //           {positions.map((position: any) => {
// //             return (
// //               <tr
// //                 key={position.id}
// //                 className="hover:bg-gray-50 cursor-pointer align-top"
// //                 onClick={() => onOpen(position)}
// //               >
// //                 <td className="px-4 py-3 align-top">
// //                   <div className="flex flex-col min-w-0">
// //                     <span className="text-sm font-medium text-gray-900 leading-5 break-words">
// //                       {position.positionName}
// //                     </span>
// //                     <span className="text-xs text-gray-500 leading-5 mt-0.5 truncate">
// //                       {position.experience} • {position.workplaceType}
// //                     </span>
// //                   </div>
// //                 </td>

// //                 <td className="px-4 py-3 align-top">
// //                   <div className="flex flex-col min-w-0">
// //                   <span className="text-sm text-gray-900 leading-5 break-words">
// //                     {position.clientName}
// //                   </span>
// //                   <span
// //                     className={`inline-flex self-start mt-1 px-2 py-0.5 text-xs font-medium leading-4 rounded-full ${
// //                       position.priority === "High"
// //                         ? "bg-red-100 text-red-800"
// //                         : position.priority === "Medium"
// //                         ? "bg-yellow-100 text-yellow-800"
// //                         : "bg-green-100 text-green-800"
// //                     }`}
// //                   >
// //                     {position.priority}
// //                   </span>
// //                   </div>
// //                 </td>

// //                 <td className="px-4 py-3 align-top">
// //                   <div className="flex flex-col min-w-0">
// //                     <span className="text-sm text-gray-900 leading-5 truncate">
// //                       {position.ctcBudget}
// //                     </span>
// //                     <span className="text-xs text-gray-500 leading-5 mt-0.5 flex items-center min-w-0">
// //                       <MapPin className="w-3 h-3 mr-1 shrink-0" />
// //                       <span className="truncate">{position.location}</span>
// //                     </span>
// //                   </div>
// //                 </td>

// //                 <td className="px-4 py-3 align-top">
// //                   <div className="flex justify-end items-start gap-2">
// //                     <button
// //                       className="h-7 px-2.5 bg-green-100 text-green-800 text-xs font-medium rounded hover:bg-green-200 whitespace-nowrap"
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         onTag(position);
// //                       }}
// //                     >
// //                       Tag candidate
// //                     </button>
// //                     <button
// //                       className="h-7 px-2.5 text-xs font-medium text-purple-600 rounded hover:bg-purple-50 whitespace-nowrap"
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         onAIMatcher();
// //                       }}
// //                     >
// //                       AI matcher
// //                     </button>
// //                   </div>
// //                 </td>
// //               </tr>
// //             );
// //           })}

// //           {positions.length === 0 && (
// //             <tr>
// //               <td
// //                 colSpan={4}
// //                 className="px-4 py-10 text-center text-sm text-gray-500"
// //               >
// //                 No positions match this search. Clear the filters or create a
// //                 position.
// //               </td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>
// //     </div>
// //     </div>
// //   </>
// // );

// // /* ------------------------------------------------------------------ */
// // /* Main                                                                */
// // /* ------------------------------------------------------------------ */

// // const PositionManagement = () => {
// //   const [selectedPosition, setSelectedPosition] = useState<any>(null);
// //   const [tagPositionId, setTagPositionId] = useState<any>(null);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [filterBy, setFilterBy] = useState("all");
// //   const [groupBy, setGroupBy] = useState("none");
// //   const [showTagForm, setShowTagForm] = useState(false);
// //   const [showAddCandidate, setShowAddCandidate] = useState<any>(false);
// //   const [showCandidateForm, setShowCandidateForm] = useState(false);
// //   const [showCreatePosition, setShowCreatePosition] = useState(false);
// //   const [candidateEmail, setCandidateEmail] = useState("");
// //   const [loadingPositionDetail, setLoadingPositionDetail] = useState(false);
// //   const [clientOptions, setClientOptions] = useState<any[]>([]);
// //   const [isSubmittingTag, setIsSubmittingTag] = useState(false);
// //   const [positions, setPositions] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   const navigate = useNavigate();
// //   const { positionId } = useParams();
// //   const recruiter = localStorage.getItem("email") || "";

// //   const [tagFormData, setTagFormData] = useState<any>({
// //     positionName: "",
// //     applicant: "",
// //     candidateId: null,
// //     recruiter: "",
// //     immediateJoiner: false,
// //     status: "",
// //   });

// //   const [candidates, setCandidates] = useState<any[]>([
// //     {
// //       id: 1,
// //       email: "john.smith@email.com",
// //       name: "John Smith",
// //       currentCTC: 1500000,
// //       expectedCTC: 2000000,
// //       noticePeriod: 30,
// //       status: "submitted",
// //       positionId: 1,
// //       recruiter: recruiter,
// //       source: "recruiter",
// //     },
// //     {
// //       id: 2,
// //       email: "jane.doe@email.com",
// //       name: "Jane Doe",
// //       currentCTC: 1200000,
// //       expectedCTC: 1800000,
// //       noticePeriod: 60,
// //       status: "internal_screening",
// //       positionId: 1,
// //       recruiter: "AI Matcher",
// //       source: "direct",
// //       aiScore: null,
// //     },
// //     {
// //       id: 3,
// //       email: "alex.kumar@email.com",
// //       name: "Alex Kumar",
// //       currentCTC: 1800000,
// //       expectedCTC: 2500000,
// //       noticePeriod: 45,
// //       status: "internal_screening",
// //       positionId: 1,
// //       recruiter: "Direct Application",
// //       source: "direct",
// //       aiScore: null,
// //     },
// //     {
// //       id: 4,
// //       email: "priya.sharma@email.com",
// //       name: "Priya Sharma",
// //       currentCTC: 1600000,
// //       expectedCTC: 2200000,
// //       noticePeriod: 30,
// //       status: "internal_screening",
// //       positionId: 1,
// //       recruiter: "Direct Application",
// //       source: "direct",
// //       aiScore: null,
// //     },
// //     {
// //       id: 5,
// //       email: "rajesh.patel@email.com",
// //       name: "Rajesh Patel",
// //       currentCTC: 1400000,
// //       expectedCTC: 2000000,
// //       noticePeriod: 60,
// //       status: "internal_reject",
// //       positionId: 1,
// //       recruiter: "Direct Application",
// //       source: "direct",
// //       aiScore: 12,
// //     },
// //   ]);

// //   const [newCandidate, setNewCandidate] = useState<any>({
// //     email: "",
// //     resume: null,
// //     currentCTC: "",
// //     specialComments: "",
// //     education: "",
// //     gender: "",
// //     openToRelocation: false,
// //     engagementType: "",
// //     expectedCTC: "",
// //     noticePeriod: "",
// //     recruiter: recruiter,
// //   });

// //   /* -------------------- data -------------------- */

// //   const transformPosition = (position: any) => {
// //     const [submitted, targeted] = String(position.progress || "0/0")
// //       .split("/")
// //       .map(Number);

// //     return {
// //       id: position.id,
// //       positionName: position.title,
// //       clientName: position.client,
// //       submittedResumes: submitted || 0,
// //       targetedResumes: targeted || 0,
// //       ctcBudget: Number.isFinite(Number(position.ctc)) && Number(position.ctc) > 0
// //         ? `${(Number(position.ctc) / 100000).toFixed(0)} LPA`
// //         : "N/A",
// //       location: position.location || "N/A",
// //       priority: position.priority || "Medium",
// //       experience: position.experience ? `${position.experience} years` : "N/A",
// //       workplaceType: position.mode || "N/A",
// //       status: position.status || "Active",
// //       ctcBudgetNumeric: position.ctc || 0,
// //       city: position.location || "N/A",
// //       experienceYears: position.experience || "N/A",
// //       daysSinceNoAction: position.daysSinceNoAction || 0,
// //       education: position.education || "N/A",
// //       roleDescription: position.roleDescription || "",
// //       preferredIndustry: position.preferredIndustry || "",
// //       preferredCompanies: position.preferredCompanies || "",
// //       reportees: position.reportees || 0,
// //       deadline: position.deadline || "",
// //       rounds: position.rounds || 0,
// //       interviewerName: position.interviewerName || "",
// //       interviewerLinkedIn: position.interviewerLinkedIn || "",
// //       ctcStructure: position.ctcStructure || "",
// //       roleType: position.roleType || "",
// //       diversityPreference: position.diversityPreference || "",
// //       interviewMode: position.interviewMode || "",
// //       jobType: position.jobType || "",
// //       clientSPOC: position.clientSPOC || "",
// //       lakshSPOC: position.lakshSPOC || "",
// //       recruiter: position.recruiter || "",
// //       function: position.function || "",
// //       role: position.role || "",
// //       target: targeted || 0,
// //       createdDate: position.createdDate || new Date().toISOString(),
// //       lastActivityDate: position.lastActivityDate || new Date().toISOString(),
// //     };
// //   };

// //   const loadPositions = async () => {
// //     try {
// //       const res = await positionService.fetchAll(1, 2000);
// //       if (res.status === 200) {
// //         setPositions(res.data.positions.map(transformPosition));
// //       } else {
// //         console.error("Failed to fetch positions:", res.message);
// //       }
// //     } catch (err) {
// //       console.error("Error fetching positions:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchPositionDetail = async (positionId: any) => {
// //     setLoadingPositionDetail(true);
// //     try {
// //       const res = await positionService.fetchById(positionId);
// //       if (res.status === 200) {
// //         const position = res.data;
// //         setSelectedPosition({
// //           id: String(position.id),
// //           positionName: position.title || "N/A",
// //           clientName: position.clientName || "N/A",
// //           submittedResumes: position.submittedCandidates?.length || 0,
// //           targetedResumes: position.targetedResumes || 0,
// //           ctcBudget: position.ctcBudget
// //             ? `${(Number(position.ctcBudget) / 100000).toFixed(0)} LPA`
// //             : "N/A",
// //           ctcStructure: position.ctcStructure || "",
// //           city: position.location || "",
// //           location: position.location || "",
// //           experience: position.experience ? `${position.experience} years` : "",
// //           priority: position.priority || "",
// //           function: position.function || "",
// //           role: position.role || "",
// //           workplaceType: position.workplaceType || "",
// //           status: position.status || "Open",
// //           education: position.education || "",
// //           roleDescription: position.roleDescription || "",
// //           preferredIndustry: position.preferredIndustry || [],
// //           preferredCompanies: position.preferredCompanies || [],
// //           reportees: position.reportees || 0,
// //           target: position.target || 0,
// //           deadline: position.deadline || "",
// //           rounds: position.interviewRounds || 0,
// //           interviewerName: position.interviewer || "",
// //           diversityPreference: position.diversityPreference || "",
// //           interviewMode: position.interviewMode || "",
// //           jobType: position.jobType || "",
// //           roleType: position.roleType || "",
// //           clientSpoc: position.clientSpoc || "",
// //           lakshSpoc: position.lakshSpoc?.filter(Boolean) || [],
// //           recruiter: position.recruiter || "",
// //           linkedIn: position.linkedin || null,
// //           submittedCandidates: position.submittedCandidates || [],
// //           message: position.message || "",
// //         });
// //       }
// //     } catch (err) {
// //       console.error("Error fetching position detail:", err);
// //     } finally {
// //       setLoadingPositionDetail(false);
// //     }
// //   };

// //   useEffect(() => {
// //     const fetchClients = async () => {
// //       const res = await clientService.fetchAll();
// //       const clients = res?.data || [];
// //       setClientOptions(
// //         clients.map((c: any) => ({
// //           id: c.id,
// //           label: c.client_name,
// //           value: c.id,
// //           clientHRSpocs: c.clientHRSpocs || [],
// //         }))
// //       );
// //     };
// //     fetchClients();
// //   }, []);

// //   useEffect(() => {
// //     loadPositions();
// //   }, []);

// //   // The URL is the source of truth: /position-management/:positionId
// //   useEffect(() => {
// //     if (positionId) {
// //       fetchPositionDetail(positionId);
// //     } else {
// //       setSelectedPosition(null);
// //     }
// //   }, [positionId]);

// //   /* -------------------- derived -------------------- */

// //   const filteredPositions = positions.filter((position) => {
// //     const term = searchTerm.toLowerCase();
// //     const matchesSearch =
// //       (position.positionName || "").toLowerCase().includes(term) ||
// //       (position.clientName || "").toLowerCase().includes(term) ||
// //       (position.location || "").toLowerCase().includes(term) ||
// //       (position.priority || "").toLowerCase().includes(term) ||
// //       (position.experience || "").toLowerCase().includes(term);

// //     if (filterBy === "all") return matchesSearch;
// //     return matchesSearch && position.priority === filterBy;
// //   });

// //   const groupedPositions =
// //     groupBy === "clientName"
// //       ? filteredPositions.reduce((acc: any, position: any) => {
// //           const client = position.clientName || "Unassigned";
// //           if (!acc[client]) acc[client] = [];
// //           acc[client].push(position);
// //           return acc;
// //         }, {})
// //       : { "All Positions": filteredPositions };

// //   /* -------------------- handlers -------------------- */

// //   const handleEmailCheck = () => {
// //     const existingCandidate = candidates.find((c) => c.email === candidateEmail);
// //     if (existingCandidate) {
// //       setCandidates((prev) =>
// //         prev.map((c) =>
// //           c.email === candidateEmail ? { ...c, positionId: showAddCandidate } : c
// //         )
// //       );
// //       setShowAddCandidate(false);
// //       setCandidateEmail("");
// //       alert("Candidate tagged to the position.");
// //     } else {
// //       setShowCandidateForm(true);
// //       setNewCandidate({ ...newCandidate, email: candidateEmail });
// //     }
// //   };

// //   const handleCreateCandidate = () => {
// //     const candidate = {
// //       id: candidates.length + 1,
// //       ...newCandidate,
// //       status: "submitted",
// //       positionId: showAddCandidate,
// //       source: "recruiter",
// //       name: newCandidate.email.split("@")[0].replace(".", " "),
// //     };
// //     setCandidates([...candidates, candidate]);
// //     setShowCandidateForm(false);
// //     setShowAddCandidate(false);
// //     setNewCandidate({
// //       email: "",
// //       resume: null,
// //       currentCTC: "",
// //       specialComments: "",
// //       education: "",
// //       gender: "",
// //       openToRelocation: false,
// //       engagementType: "",
// //       expectedCTC: "",
// //       noticePeriod: "",
// //       recruiter: recruiter,
// //     });
// //     alert("Candidate created and tagged.");
// //   };

// //   const handleCreatePosition = async (payload: any) => {
// //     try {
// //       const response = await positionService.createPosition(payload);

// //       if (response.status === 201 || response.status === 200) {
// //         alert("Position created.");
// //         await loadPositions();
// //         return true;
// //       }

// //       alert(
// //         "Could not create the position: " + (response.message || "Unknown error")
// //       );
// //       return false;
// //     } catch (error) {
// //       console.error("Error creating position:", error);
// //       alert("Could not create the position. Try again.");
// //       return false;
// //     }
// //   };

// //   const handleUpdatePosition = async (payload: any) => {
// //     try {
// //       const response = await positionService.updatePosition(
// //         String(payload.id),
// //         payload
// //       );

// //       if (response.status === 200) {
// //         await fetchPositionDetail(payload.id);
// //         await loadPositions();
// //         return true;
// //       }

// //       alert("Update failed: " + (response.message || "Unknown error"));
// //       return false;
// //     } catch (error: any) {
// //       console.error("Error updating position:", error);
// //       alert("Could not update the position: " + (error.message || "Try again."));
// //       return false;
// //     }
// //   };

// //   const runAIResumeMatcherForPosition = (positionId: any) => {
// //     const eligibleCandidates = candidates.filter(
// //       (c) =>
// //         c.positionId === positionId &&
// //         c.source === "direct" &&
// //         c.status === "internal_screening"
// //     );

// //     if (eligibleCandidates.length === 0) {
// //       alert("No candidates in internal screening for this position.");
// //       return;
// //     }

// //     alert(`Scoring ${eligibleCandidates.length} candidates...`);

// //     setTimeout(() => {
// //       const scored = candidates.map((c) => {
// //         if (!eligibleCandidates.find((e) => e.id === c.id)) return c;
// //         const score = Math.floor(Math.random() * 100) + 1;
// //         return {
// //           ...c,
// //           aiScore: score,
// //           status: score >= 85 ? "internal_screening" : "internal_reject",
// //         };
// //       });
// //       setCandidates(scored);

// //       const qualified = scored.filter(
// //         (c) =>
// //           eligibleCandidates.find((e) => e.id === c.id) && (c.aiScore || 0) >= 85
// //       ).length;

// //       alert(
// //         `Scoring complete. ${qualified} candidates qualified for recruiter review; the rest moved to internal reject.`
// //       );
// //     }, 3000);
// //   };

// //   const openTagForm = (position: any) => {
// //     setTagPositionId(position.id);
// //     setTagFormData({
// //       positionName: position.positionName,
// //       applicant: "",
// //       candidateId: null,
// //       recruiter: recruiter,
// //       immediateJoiner: false,
// //       status: "",
// //     });
// //     setShowTagForm(true);
// //   };

// //   const closeTagForm = () => {
// //     setShowTagForm(false);
// //     setTagPositionId(null);
// //     setTagFormData({
// //       positionName: "",
// //       applicant: "",
// //       candidateId: null,
// //       recruiter: "",
// //       immediateJoiner: false,
// //       status: "",
// //     });
// //   };

// //   /* -------------------- detail navigation -------------------- */

// //   const currentPositionIndex = selectedPosition
// //     ? filteredPositions.findIndex(
// //         (p: any) => String(p.id) === String(selectedPosition.id)
// //       )
// //     : -1;

// //   const stepPosition = (delta: number) => {
// //     const next = filteredPositions[currentPositionIndex + delta];
// //     if (next) navigate(`/position-management/${next.id}`);
// //   };

// //   /* -------------------- detail view -------------------- */

// //   if (positionId) {
// //     if (!selectedPosition) {
// //       return (
// //         <div className="min-h-screen bg-gray-50">
// //           <Header />
// //           <div className="max-w-7xl mx-auto p-6 text-sm text-gray-500">
// //             Loading position...
// //           </div>
// //         </div>
// //       );
// //     }

// //     return (
// //       <PositionDetail
// //         position={selectedPosition}
// //         candidates={candidates}
// //         recruiter={recruiter}
// //         onBack={() => navigate("/position-management")}
// //         setCandidates={setCandidates}
// //         runAIResumeMatcherForPosition={runAIResumeMatcherForPosition}
// //         onSave={handleUpdatePosition}
// //         onPrev={() => stepPosition(-1)}
// //         onNext={() => stepPosition(1)}
// //         hasPrev={currentPositionIndex > 0}
// //         hasNext={
// //           currentPositionIndex >= 0 &&
// //           currentPositionIndex < filteredPositions.length - 1
// //         }
// //         functionOptions={functionOptions}
// //         roleOptions={roleOptions}
// //         educationOptions={educationOptions}
// //         cityOptions={cityOptions}
// //       />
// //     );
// //   }

// //   /* -------------------- list view -------------------- */

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Header />

// //       {showTagForm && (
// //         <TagCandidateModal
// //           onClose={closeTagForm}
// //           tagFormData={tagFormData}
// //           setTagFormData={setTagFormData}
// //           selectedPositionId={tagPositionId}
// //           isSubmitting={isSubmittingTag}
// //           setIsSubmitting={setIsSubmittingTag}
// //           onTagged={() => {
// //             closeTagForm();
// //             loadPositions();
// //           }}
// //         />
// //       )}

// //       <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
// //         {/* Toolbar: search, filters and create action on one line */}
// //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
// //           <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap md:items-center gap-3">
// //             <div className="relative flex-1 min-w-0 basis-full lg:basis-auto">
// //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
// //               <input
// //                 type="text"
// //                 placeholder="Search by position, client, location, priority or experience"
// //                 className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>

// //             <select
// //               className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:flex-1 lg:flex-none lg:w-44 shrink-0"
// //               value={filterBy}
// //               onChange={(e) => setFilterBy(e.target.value)}
// //             >
// //               <option value="all">All priorities</option>
// //               <option value="High">High priority</option>
// //               <option value="Medium">Medium priority</option>
// //               <option value="Low">Low priority</option>
// //             </select>

// //             <select
// //               className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:flex-1 lg:flex-none lg:w-44 shrink-0"
// //               value={groupBy}
// //               onChange={(e) => setGroupBy(e.target.value)}
// //             >
// //               <option value="none">No grouping</option>
// //               <option value="clientName">Group by client</option>
// //             </select>

// //             <button
// //               className="h-10 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shrink-0"
// //               onClick={() => setShowCreatePosition(true)}
// //             >
// //               <Plus className="w-4 h-4" />
// //               Create position
// //             </button>
// //           </div>
// //         </div>

// //         {/* Positions */}
// //         {loading ? (
// //           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center text-sm text-gray-500">
// //             Loading positions...
// //           </div>
// //         ) : (
// //           <div className="space-y-6">
// //             {Object.entries(groupedPositions).map(
// //               ([groupName, groupPositions]: any) => (
// //                 <div key={groupName} className="space-y-3">
// //                   {groupBy !== "none" && (
// //                     <h2 className="text-lg font-semibold text-gray-900">
// //                       {groupName}
// //                     </h2>
// //                   )}
// //                   <PositionTable
// //                     positions={groupPositions}
// //                     onOpen={(position: any) =>
// //                       navigate(`/position-management/${position.id}`)
// //                     }
// //                     onTag={openTagForm}
// //                     onAIMatcher={() => navigate("/ai-matcher")}
// //                   />
// //                 </div>
// //               )
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       {/* Add Candidate Modal */}
// //       {showAddCandidate && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
// //           <div className="bg-white rounded-lg p-6 w-full max-w-md">
// //             <h2 className="text-xl font-semibold mb-4">Add candidate</h2>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Email ID
// //             </label>
// //             <input
// //               type="email"
// //               className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               value={candidateEmail}
// //               onChange={(e) => setCandidateEmail(e.target.value)}
// //               placeholder="candidate@email.com"
// //             />
// //             <div className="flex gap-3 mt-5">
// //               <button
// //                 onClick={handleEmailCheck}
// //                 className="flex-1 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
// //                 disabled={!candidateEmail}
// //               >
// //                 Check email
// //               </button>
// //               <button
// //                 onClick={() => setShowAddCandidate(false)}
// //                 className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Create Candidate Modal */}
// //       {showCandidateForm && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
// //           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
// //             <div className="px-6 py-4 border-b border-gray-200">
// //               <h2 className="text-xl font-semibold">Create candidate</h2>
// //             </div>
// //             <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Email
// //                 </label>
// //                 <input
// //                   type="email"
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.email}
// //                   onChange={(e) =>
// //                     setNewCandidate({ ...newCandidate, email: e.target.value })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Current CTC (₹)
// //                 </label>
// //                 <input
// //                   type="number"
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.currentCTC}
// //                   onChange={(e) =>
// //                     setNewCandidate({
// //                       ...newCandidate,
// //                       currentCTC: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Expected CTC (₹)
// //                 </label>
// //                 <input
// //                   type="number"
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.expectedCTC}
// //                   onChange={(e) =>
// //                     setNewCandidate({
// //                       ...newCandidate,
// //                       expectedCTC: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Notice period (days)
// //                 </label>
// //                 <input
// //                   type="number"
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.noticePeriod}
// //                   onChange={(e) =>
// //                     setNewCandidate({
// //                       ...newCandidate,
// //                       noticePeriod: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Education
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.education}
// //                   onChange={(e) =>
// //                     setNewCandidate({
// //                       ...newCandidate,
// //                       education: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Gender
// //                 </label>
// //                 <select
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.gender}
// //                   onChange={(e) =>
// //                     setNewCandidate({ ...newCandidate, gender: e.target.value })
// //                   }
// //                 >
// //                   <option value="">Select gender</option>
// //                   <option value="Male">Male</option>
// //                   <option value="Female">Female</option>
// //                   <option value="Other">Other</option>
// //                 </select>
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Engagement type
// //                 </label>
// //                 <select
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.engagementType}
// //                   onChange={(e) =>
// //                     setNewCandidate({
// //                       ...newCandidate,
// //                       engagementType: e.target.value,
// //                     })
// //                   }
// //                 >
// //                   <option value="">Select type</option>
// //                   <option value="Full-time">Full-time</option>
// //                   <option value="Part-time">Part-time</option>
// //                   <option value="Contract">Contract</option>
// //                 </select>
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Recruiter
// //                 </label>
// //                 <input
// //                   type="text"
// //                   readOnly
// //                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm bg-gray-100"
// //                   value={newCandidate.recruiter}
// //                 />
// //               </div>
// //               <div className="md:col-span-2">
// //                 <label className="flex items-center text-sm text-gray-700">
// //                   <input
// //                     type="checkbox"
// //                     className="mr-2 h-4 w-4"
// //                     checked={newCandidate.openToRelocation}
// //                     onChange={(e) =>
// //                       setNewCandidate({
// //                         ...newCandidate,
// //                         openToRelocation: e.target.checked,
// //                       })
// //                     }
// //                   />
// //                   Open to relocation
// //                 </label>
// //               </div>
// //               <div className="md:col-span-2">
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Special comments
// //                 </label>
// //                 <textarea
// //                   rows={3}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={newCandidate.specialComments}
// //                   onChange={(e) =>
// //                     setNewCandidate({
// //                       ...newCandidate,
// //                       specialComments: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //             </div>
// //             <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
// //               <button
// //                 onClick={handleCreateCandidate}
// //                 className="flex-1 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// //               >
// //                 Create candidate
// //               </button>
// //               <button
// //                 onClick={() => setShowCandidateForm(false)}
// //                 className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <CreatePositionWizard
// //         open={showCreatePosition}
// //         onClose={() => setShowCreatePosition(false)}
// //         onCreate={handleCreatePosition}
// //         recruiter={recruiter}
// //         clientOptions={clientOptions}
// //         functionOptions={functionOptions}
// //         roleOptions={roleOptions}
// //         educationOptions={educationOptions}
// //         cityOptions={cityOptions}
// //       />
// //     </div>
// //   );
// // };

// // export default PositionManagement;



// import { useState, useEffect, useRef } from "react";
// import Header from "../components/Header";
// import { useNavigate, useParams } from "react-router-dom";
// import { Search, Plus, Users, Bot, ArrowLeft, Mail, MapPin, Share2 } from "lucide-react";
// import { positionService } from "../services/positionService";
// import { clientService } from "../services/clientService";
// import Select from "react-select";
// import {
//   educationOptions,
//   functionOptions,
//   roleOptions,
//   cityOptions,
//   candidateStatusOptions,
// } from "../constants/dropdown";
// import AsyncSelect from "react-select/async";
// import CreatePositionWizard from "../components/positions/CreatePositionWizard";
// import PositionDetail from "../components/positions/Positiondetail";
// import SharePositionModal from "../components/positions/Sharepositionmodal";

// /* ------------------------------------------------------------------ */
// /* Shared helpers                                                      */
// /* ------------------------------------------------------------------ */

// /* ------------------------------------------------------------------ */
// /* Tag Candidate Modal (moved to top level so it does not remount on    */
// /* every keystroke, which was stealing focus from the inputs)          */
// /* ------------------------------------------------------------------ */

// const TagCandidateModal = ({
//   onClose,
//   tagFormData,
//   setTagFormData,
//   selectedPositionId,
//   isSubmitting,
//   setIsSubmitting,
//   onTagged,
// }) => {
//   const searchTimeout = useRef<any>(null);

//   const debouncedLoadOptions = (inputValue: string, callback: any) => {
//     if (searchTimeout.current) clearTimeout(searchTimeout.current);

//     if (!inputValue || inputValue.trim().length < 2) {
//       callback([]);
//       return;
//     }

//     searchTimeout.current = setTimeout(async () => {
//       try {
//         const res = await positionService.fetchAutocomplete(inputValue.trim());
//         const candidates = res?.data || [];
//         callback(
//           candidates.map((candidate: any) => ({
//             value: candidate.id,
//             label: `${candidate.name} (${candidate.email})`,
//             email: candidate.email,
//             name: candidate.name,
//           }))
//         );
//       } catch (err) {
//         console.error("Autocomplete fetch error:", err);
//         callback([]);
//       }
//     }, 300);
//   };

//   const handleCandidateSelect = (selectedOption: any) => {
//     setTagFormData((prev: any) => ({
//       ...prev,
//       applicant: selectedOption ? selectedOption.label : "",
//       candidateId: selectedOption ? selectedOption.value : null,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!tagFormData.candidateId) {
//       alert("Select a candidate before submitting.");
//       return;
//     }
//     if (!tagFormData.recruiter) {
//       alert("Recruiter email is required.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const response = await positionService.tagCandidateToPosition(
//         String(selectedPositionId),
//         {
//           candidateId: tagFormData.candidateId,
//           recruiterEmail: tagFormData.recruiter,
//           immediateJoiner: tagFormData.immediateJoiner,
//           status: tagFormData.status,
//         }
//       );

//       if (response.status === 201) {
//         alert("Candidate tagged to the position.");
//         onTagged();
//       } else {
//         alert("Tagging failed: " + (response.message || "Unknown error"));
//       }
//     } catch (error) {
//       console.error("Error tagging candidate:", error);
//       alert("Could not tag the candidate. Try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 sm:p-4">
//       <div className="bg-white w-full sm:max-w-md h-[92vh] sm:h-auto sm:max-h-[90vh] rounded-t-2xl sm:rounded-lg shadow-xl flex flex-col">
//         <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200 shrink-0">
//           <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//             Tag candidate
//           </h2>
//           <button
//             type="button"
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="flex-1 flex flex-col min-h-0"
//         >
//           <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Position name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               required
//               readOnly
//               value={tagFormData.positionName}
//               className="w-full h-10 px-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Applicant <span className="text-red-500">*</span>
//             </label>
//             <AsyncSelect
//               cacheOptions
//               defaultOptions={false}
//               loadOptions={debouncedLoadOptions}
//               isSearchable
//               isClearable
//               placeholder="Search by name or email..."
//               noOptionsMessage={({ inputValue }) =>
//                 !inputValue || inputValue.length < 2
//                   ? "Type at least 2 characters"
//                   : "No candidates found"
//               }
//               loadingMessage={() => "Searching..."}
//               onChange={handleCandidateSelect}
//               value={
//                 tagFormData.candidateId
//                   ? {
//                       value: tagFormData.candidateId,
//                       label: tagFormData.applicant,
//                     }
//                   : null
//               }
//               styles={{
//                 control: (base) => ({
//                   ...base,
//                   minHeight: "40px",
//                   borderColor: "#d1d5db",
//                   "&:hover": { borderColor: "#3b82f6" },
//                 }),
//                 menu: (base) => ({ ...base, zIndex: 9999 }),
//               }}
//               components={{
//                 DropdownIndicator: () => null,
//                 IndicatorSeparator: () => null,
//               }}
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               Type at least 2 characters to search.
//             </p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Recruiter <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               required
//               value={tagFormData.recruiter}
//               onChange={(e) =>
//                 setTagFormData((prev: any) => ({
//                   ...prev,
//                   recruiter: e.target.value,
//                 }))
//               }
//               className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Recruiter email"
//             />
//           </div>

//           <div className="flex items-start">
//             <input
//               type="checkbox"
//               id="immediateJoiner"
//               checked={tagFormData.immediateJoiner}
//               onChange={(e) =>
//                 setTagFormData((prev: any) => ({
//                   ...prev,
//                   immediateJoiner: e.target.checked,
//                 }))
//               }
//               className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//             />
//             <div>
//               <label
//                 htmlFor="immediateJoiner"
//                 className="text-sm font-medium text-gray-700"
//               >
//                 Immediate joiner
//               </label>
//               <p className="text-xs text-gray-500">
//                 Tick this if the candidate can join within 15 days.
//               </p>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Status <span className="text-red-500">*</span>
//             </label>
//             <Select
//               options={candidateStatusOptions}
//               isSearchable
//               placeholder="Select status..."
//               value={
//                 candidateStatusOptions.find(
//                   (opt: any) => opt.value === tagFormData.status
//                 ) || null
//               }
//               onChange={(selected: any) =>
//                 setTagFormData((prev: any) => ({
//                   ...prev,
//                   status: selected?.value,
//                 }))
//               }
//               styles={{
//                 control: (base) => ({ ...base, minHeight: "40px" }),
//                 menu: (base) => ({ ...base, zIndex: 9999 }),
//               }}
//             />
//           </div>

//           </div>

//           <div className="flex gap-3 px-4 sm:px-6 py-3 border-t border-gray-200 shrink-0 bg-white sm:rounded-b-lg">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 sm:flex-none sm:ml-auto px-4 h-11 sm:h-10 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="flex-1 sm:flex-none px-4 h-11 sm:h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
//             >
//               {isSubmitting ? "Tagging..." : "Tag candidate"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// /* ------------------------------------------------------------------ */
// /* Position detail                                                     */
// /* ------------------------------------------------------------------ */

// /* ------------------------------------------------------------------ */
// /* Positions table                                                     */
// /* ------------------------------------------------------------------ */

// const PositionTable = ({ positions, onOpen, onTag, onAIMatcher, onShare }) => (
//   <>
//     {/* Mobile: stacked cards */}
//     <div className="md:hidden space-y-3">
//       {positions.map((position: any) => (
//         <div
//           key={position.id}
//           onClick={() => onOpen(position)}
//           className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 active:bg-gray-50"
//         >
//           <div className="flex items-start justify-between gap-3">
//             <p className="text-sm font-medium text-gray-900 leading-5 break-words">
//               {position.positionName}
//             </p>
//             <span
//               className={`shrink-0 inline-flex px-2 py-0.5 text-xs font-medium leading-4 rounded-full ${
//                 position.priority === "High"
//                   ? "bg-red-100 text-red-800"
//                   : position.priority === "Medium"
//                   ? "bg-yellow-100 text-yellow-800"
//                   : "bg-green-100 text-green-800"
//               }`}
//             >
//               {position.priority}
//             </span>
//           </div>

//           <p className="text-sm text-gray-700 mt-1 break-words">
//             {position.clientName}
//           </p>

//           <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
//             <span>{position.ctcBudget}</span>
//             <span className="flex items-center min-w-0">
//               <MapPin className="w-3 h-3 mr-1 shrink-0" />
//               <span className="truncate">{position.location}</span>
//             </span>
//             <span>
//               {position.experience} • {position.workplaceType}
//             </span>
//           </div>

//           <div className="flex gap-2 mt-3">
//             <button
//               className="flex-1 h-9 bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-medium rounded hover:bg-emerald-100"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onTag(position);
//               }}
//             >
//               Tag candidate
//             </button>
//             <button
//               className="flex-1 h-9 border border-purple-200 text-xs font-medium text-purple-600 rounded hover:bg-purple-50"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onAIMatcher();
//               }}
//             >
//               AI matcher
//             </button>
//             <button
//               className="h-9 w-9 grid place-items-center rounded border border-gray-200 text-gray-500 shrink-0"
//               aria-label="Share this position"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onShare(position);
//               }}
//             >
//               <Share2 className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       ))}

//       {positions.length === 0 && (
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-sm text-gray-500">
//           No positions match this search.
//         </div>
//       )}
//     </div>

//     {/* Desktop: table */}
//     <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//     <div className="w-full">
//       <table className="w-full table-fixed divide-y divide-gray-200">
//         <colgroup>
//           <col className="w-[30%]" />
//           <col className="w-[24%]" />
//           <col className="w-[20%]" />
//           <col className="w-[26%]" />
//         </colgroup>
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Position
//             </th>
//             <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Client and priority
//             </th>
//             <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               CTC and location
//             </th>
//             <th className="px-4 py-2.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {positions.map((position: any) => {
//             return (
//               <tr
//                 key={position.id}
//                 className="hover:bg-gray-50 cursor-pointer align-top"
//                 onClick={() => onOpen(position)}
//               >
//                 <td className="px-4 py-3 align-top">
//                   <div className="flex flex-col min-w-0">
//                     <span className="text-sm font-medium text-gray-900 leading-5 break-words">
//                       {position.positionName}
//                     </span>
//                     <span className="text-xs text-gray-500 leading-5 mt-0.5 truncate">
//                       {position.experience} • {position.workplaceType}
//                     </span>
//                   </div>
//                 </td>

//                 <td className="px-4 py-3 align-top">
//                   <div className="flex flex-col min-w-0">
//                   <span className="text-sm text-gray-900 leading-5 break-words">
//                     {position.clientName}
//                   </span>
//                   <span
//                     className={`inline-flex self-start mt-1 px-2 py-0.5 text-xs font-medium leading-4 rounded-full ${
//                       position.priority === "High"
//                         ? "bg-red-100 text-red-800"
//                         : position.priority === "Medium"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-green-100 text-green-800"
//                     }`}
//                   >
//                     {position.priority}
//                   </span>
//                   </div>
//                 </td>

//                 <td className="px-4 py-3 align-top">
//                   <div className="flex flex-col min-w-0">
//                     <span className="text-sm text-gray-900 leading-5 truncate">
//                       {position.ctcBudget}
//                     </span>
//                     <span className="text-xs text-gray-500 leading-5 mt-0.5 flex items-center min-w-0">
//                       <MapPin className="w-3 h-3 mr-1 shrink-0" />
//                       <span className="truncate">{position.location}</span>
//                     </span>
//                   </div>
//                 </td>

//                 <td className="px-4 py-3 align-top">
//                   <div className="flex flex-col items-end gap-1.5">
//                     <div className="flex items-center gap-1.5">
//                       <button
//                         className="h-8 w-32 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg border border-emerald-100 hover:bg-emerald-100 whitespace-nowrap"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           onTag(position);
//                         }}
//                       >
//                         Tag candidate
//                       </button>
//                       <button
//                         className="h-8 w-8 grid place-items-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 shrink-0"
//                         title="Share this position"
//                         aria-label="Share this position"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           onShare(position);
//                         }}
//                       >
//                         <Share2 className="w-3.5 h-3.5" />
//                       </button>
//                     </div>
//                     <button
//                       className="h-8 w-32 mr-[38px] text-xs font-medium text-purple-600 rounded-lg border border-purple-100 hover:bg-purple-50 whitespace-nowrap"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         onAIMatcher();
//                       }}
//                     >
//                       AI matcher
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}

//           {positions.length === 0 && (
//             <tr>
//               <td
//                 colSpan={4}
//                 className="px-4 py-10 text-center text-sm text-gray-500"
//               >
//                 No positions match this search. Clear the filters or create a
//                 position.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//     </div>
//   </>
// );

// /* ------------------------------------------------------------------ */
// /* Main                                                                */
// /* ------------------------------------------------------------------ */

// const PositionManagement = () => {
//   const [selectedPosition, setSelectedPosition] = useState<any>(null);
//   const [tagPositionId, setTagPositionId] = useState<any>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterBy, setFilterBy] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("Open");
//   const [sharePosition, setSharePosition] = useState<any>(null);
//   const [groupBy, setGroupBy] = useState("none");
//   const [showTagForm, setShowTagForm] = useState(false);
//   const [showAddCandidate, setShowAddCandidate] = useState<any>(false);
//   const [showCandidateForm, setShowCandidateForm] = useState(false);
//   const [showCreatePosition, setShowCreatePosition] = useState(false);
//   const [candidateEmail, setCandidateEmail] = useState("");
//   const [loadingPositionDetail, setLoadingPositionDetail] = useState(false);
//   const [clientOptions, setClientOptions] = useState<any[]>([]);
//   const [isSubmittingTag, setIsSubmittingTag] = useState(false);
//   const [positions, setPositions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const { positionId } = useParams();
//   const recruiter = localStorage.getItem("email") || "";

//   const [tagFormData, setTagFormData] = useState<any>({
//     positionName: "",
//     applicant: "",
//     candidateId: null,
//     recruiter: "",
//     immediateJoiner: false,
//     status: "",
//   });

//   const [candidates, setCandidates] = useState<any[]>([
//     {
//       id: 1,
//       email: "john.smith@email.com",
//       name: "John Smith",
//       currentCTC: 1500000,
//       expectedCTC: 2000000,
//       noticePeriod: 30,
//       status: "submitted",
//       positionId: 1,
//       recruiter: recruiter,
//       source: "recruiter",
//     },
//     {
//       id: 2,
//       email: "jane.doe@email.com",
//       name: "Jane Doe",
//       currentCTC: 1200000,
//       expectedCTC: 1800000,
//       noticePeriod: 60,
//       status: "internal_screening",
//       positionId: 1,
//       recruiter: "AI Matcher",
//       source: "direct",
//       aiScore: null,
//     },
//     {
//       id: 3,
//       email: "alex.kumar@email.com",
//       name: "Alex Kumar",
//       currentCTC: 1800000,
//       expectedCTC: 2500000,
//       noticePeriod: 45,
//       status: "internal_screening",
//       positionId: 1,
//       recruiter: "Direct Application",
//       source: "direct",
//       aiScore: null,
//     },
//     {
//       id: 4,
//       email: "priya.sharma@email.com",
//       name: "Priya Sharma",
//       currentCTC: 1600000,
//       expectedCTC: 2200000,
//       noticePeriod: 30,
//       status: "internal_screening",
//       positionId: 1,
//       recruiter: "Direct Application",
//       source: "direct",
//       aiScore: null,
//     },
//     {
//       id: 5,
//       email: "rajesh.patel@email.com",
//       name: "Rajesh Patel",
//       currentCTC: 1400000,
//       expectedCTC: 2000000,
//       noticePeriod: 60,
//       status: "internal_reject",
//       positionId: 1,
//       recruiter: "Direct Application",
//       source: "direct",
//       aiScore: 12,
//     },
//   ]);

//   const [newCandidate, setNewCandidate] = useState<any>({
//     email: "",
//     resume: null,
//     currentCTC: "",
//     specialComments: "",
//     education: "",
//     gender: "",
//     openToRelocation: false,
//     engagementType: "",
//     expectedCTC: "",
//     noticePeriod: "",
//     recruiter: recruiter,
//   });

//   /* -------------------- data -------------------- */

//   const transformPosition = (position: any) => {
//     const [submitted, targeted] = String(position.progress || "0/0")
//       .split("/")
//       .map(Number);

//     return {
//       id: position.id,
//       positionName: position.title,
//       clientName: position.client,
//       submittedResumes: submitted || 0,
//       targetedResumes: targeted || 0,
//       ctcBudget: Number.isFinite(Number(position.ctc)) && Number(position.ctc) > 0
//         ? `${(Number(position.ctc) / 100000).toFixed(0)} LPA`
//         : "N/A",
//       location: position.location || "N/A",
//       priority: position.priority || "Medium",
//       experience: position.experience ? `${position.experience} years` : "N/A",
//       workplaceType: position.mode || "N/A",
//       status: position.status || "Active",
//       ctcBudgetNumeric: position.ctc || 0,
//       city: position.location || "N/A",
//       experienceYears: position.experience || "N/A",
//       daysSinceNoAction: position.daysSinceNoAction || 0,
//       education: position.education || "N/A",
//       roleDescription: position.roleDescription || "",
//       preferredIndustry: position.preferredIndustry || "",
//       preferredCompanies: position.preferredCompanies || "",
//       reportees: position.reportees || 0,
//       deadline: position.deadline || "",
//       rounds: position.rounds || 0,
//       interviewerName: position.interviewerName || "",
//       interviewerLinkedIn: position.interviewerLinkedIn || "",
//       ctcStructure: position.ctcStructure || "",
//       roleType: position.roleType || "",
//       diversityPreference: position.diversityPreference || "",
//       interviewMode: position.interviewMode || "",
//       jobType: position.jobType || "",
//       clientSPOC: position.clientSPOC || "",
//       lakshSPOC: position.lakshSPOC || "",
//       recruiter: position.recruiter || "",
//       function: position.function || "",
//       role: position.role || "",
//       target: targeted || 0,
//       createdDate: position.createdDate || new Date().toISOString(),
//       lastActivityDate: position.lastActivityDate || new Date().toISOString(),
//     };
//   };

//   const loadPositions = async () => {
//     try {
//       const res = await positionService.fetchAll(1, 2000);
//       if (res.status === 200) {
//         setPositions(res.data.positions.map(transformPosition));
//       } else {
//         console.error("Failed to fetch positions:", res.message);
//       }
//     } catch (err) {
//       console.error("Error fetching positions:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPositionDetail = async (positionId: any) => {
//     setLoadingPositionDetail(true);
//     try {
//       const res = await positionService.fetchById(positionId);
//       if (res.status === 200) {
//         const position = res.data;
//         setSelectedPosition({
//           id: String(position.id),
//           positionName: position.title || "N/A",
//           clientName: position.clientName || "N/A",
//           submittedResumes: position.submittedCandidates?.length || 0,
//           targetedResumes: position.targetedResumes || 0,
//           ctcBudget: position.ctcBudget
//             ? `${(Number(position.ctcBudget) / 100000).toFixed(0)} LPA`
//             : "N/A",
//           ctcStructure: position.ctcStructure || "",
//           city: position.location || "",
//           location: position.location || "",
//           experience: position.experience ? `${position.experience} years` : "",
//           priority: position.priority || "",
//           function: position.function || "",
//           role: position.role || "",
//           workplaceType: position.workplaceType || "",
//           status: position.status || "Open",
//           education: position.education || "",
//           roleDescription: position.roleDescription || "",
//           preferredIndustry: position.preferredIndustry || [],
//           preferredCompanies: position.preferredCompanies || [],
//           reportees: position.reportees || 0,
//           target: position.target || 0,
//           deadline: position.deadline || "",
//           rounds: position.interviewRounds || 0,
//           interviewerName: position.interviewer || "",
//           diversityPreference: position.diversityPreference || "",
//           interviewMode: position.interviewMode || "",
//           jobType: position.jobType || "",
//           roleType: position.roleType || "",
//           clientSpoc: position.clientSpoc || "",
//           lakshSpoc: position.lakshSpoc?.filter(Boolean) || [],
//           recruiter: position.recruiter || "",
//           linkedIn: position.linkedin || null,
//           submittedCandidates: position.submittedCandidates || [],
//           message: position.message || "",
//         });
//       }
//     } catch (err) {
//       console.error("Error fetching position detail:", err);
//     } finally {
//       setLoadingPositionDetail(false);
//     }
//   };

//   useEffect(() => {
//     const fetchClients = async () => {
//       const res = await clientService.fetchAll();
//       const clients = res?.data || [];
//       setClientOptions(
//         clients.map((c: any) => ({
//           id: c.id,
//           label: c.client_name,
//           value: c.id,
//           clientHRSpocs: c.clientHRSpocs || [],
//         }))
//       );
//     };
//     fetchClients();
//   }, []);

//   useEffect(() => {
//     loadPositions();
//   }, []);

//   // The URL is the source of truth: /position-management/:positionId
//   useEffect(() => {
//     if (positionId) {
//       fetchPositionDetail(positionId);
//     } else {
//       setSelectedPosition(null);
//     }
//   }, [positionId]);

//   /* -------------------- derived -------------------- */

//   const KNOWN_STATUSES = [
//     "Open",
//     "On Hold",
//     "Close by LHR",
//     "Lost",
//     "Candidate identified",
//   ];

//   // Keep the known order, then append any status the API returns that we
//   // don't know about yet, so a new backend value never disappears from the UI.
//   const statusFilterOptions = [
//     ...KNOWN_STATUSES,
//     ...Array.from(
//       new Set(
//         positions
//           .map((p: any) => p.status)
//           .filter(
//             (status: string) =>
//               status &&
//               !KNOWN_STATUSES.some(
//                 (known) => known.toLowerCase() === String(status).toLowerCase()
//               )
//           )
//       )
//     ),
//   ];


//   const filteredPositions = positions.filter((position) => {
//     const term = searchTerm.toLowerCase();
//     const matchesSearch =
//       (position.positionName || "").toLowerCase().includes(term) ||
//       (position.clientName || "").toLowerCase().includes(term) ||
//       (position.location || "").toLowerCase().includes(term) ||
//       (position.priority || "").toLowerCase().includes(term) ||
//       (position.experience || "").toLowerCase().includes(term);

//     const matchesStatus =
//       statusFilter === "all" ||
//       String(position.status || "").toLowerCase() ===
//         statusFilter.toLowerCase();

//     if (!matchesStatus) return false;
//     if (filterBy === "all") return matchesSearch;
//     return matchesSearch && position.priority === filterBy;
//   });

//   const groupedPositions =
//     groupBy === "clientName"
//       ? filteredPositions.reduce((acc: any, position: any) => {
//           const client = position.clientName || "Unassigned";
//           if (!acc[client]) acc[client] = [];
//           acc[client].push(position);
//           return acc;
//         }, {})
//       : { "All Positions": filteredPositions };

//   /* -------------------- handlers -------------------- */

//   const handleEmailCheck = () => {
//     const existingCandidate = candidates.find((c) => c.email === candidateEmail);
//     if (existingCandidate) {
//       setCandidates((prev) =>
//         prev.map((c) =>
//           c.email === candidateEmail ? { ...c, positionId: showAddCandidate } : c
//         )
//       );
//       setShowAddCandidate(false);
//       setCandidateEmail("");
//       alert("Candidate tagged to the position.");
//     } else {
//       setShowCandidateForm(true);
//       setNewCandidate({ ...newCandidate, email: candidateEmail });
//     }
//   };

//   const handleCreateCandidate = () => {
//     const candidate = {
//       id: candidates.length + 1,
//       ...newCandidate,
//       status: "submitted",
//       positionId: showAddCandidate,
//       source: "recruiter",
//       name: newCandidate.email.split("@")[0].replace(".", " "),
//     };
//     setCandidates([...candidates, candidate]);
//     setShowCandidateForm(false);
//     setShowAddCandidate(false);
//     setNewCandidate({
//       email: "",
//       resume: null,
//       currentCTC: "",
//       specialComments: "",
//       education: "",
//       gender: "",
//       openToRelocation: false,
//       engagementType: "",
//       expectedCTC: "",
//       noticePeriod: "",
//       recruiter: recruiter,
//     });
//     alert("Candidate created and tagged.");
//   };

//   const handleCreatePosition = async (payload: any) => {
//     try {
//       const response = await positionService.createPosition(payload);

//       if (response.status === 201 || response.status === 200) {
//         alert("Position created.");
//         await loadPositions();
//         return true;
//       }

//       alert(
//         "Could not create the position: " + (response.message || "Unknown error")
//       );
//       return false;
//     } catch (error) {
//       console.error("Error creating position:", error);
//       alert("Could not create the position. Try again.");
//       return false;
//     }
//   };

//   const handleUpdatePosition = async (payload: any) => {
//     try {
//       const response = await positionService.updatePosition(
//         String(payload.id),
//         payload
//       );

//       if (response.status === 200) {
//         await fetchPositionDetail(payload.id);
//         await loadPositions();
//         return true;
//       }

//       alert("Update failed: " + (response.message || "Unknown error"));
//       return false;
//     } catch (error: any) {
//       console.error("Error updating position:", error);
//       alert("Could not update the position: " + (error.message || "Try again."));
//       return false;
//     }
//   };

//   const runAIResumeMatcherForPosition = (positionId: any) => {
//     const eligibleCandidates = candidates.filter(
//       (c) =>
//         c.positionId === positionId &&
//         c.source === "direct" &&
//         c.status === "internal_screening"
//     );

//     if (eligibleCandidates.length === 0) {
//       alert("No candidates in internal screening for this position.");
//       return;
//     }

//     alert(`Scoring ${eligibleCandidates.length} candidates...`);

//     setTimeout(() => {
//       const scored = candidates.map((c) => {
//         if (!eligibleCandidates.find((e) => e.id === c.id)) return c;
//         const score = Math.floor(Math.random() * 100) + 1;
//         return {
//           ...c,
//           aiScore: score,
//           status: score >= 85 ? "internal_screening" : "internal_reject",
//         };
//       });
//       setCandidates(scored);

//       const qualified = scored.filter(
//         (c) =>
//           eligibleCandidates.find((e) => e.id === c.id) && (c.aiScore || 0) >= 85
//       ).length;

//       alert(
//         `Scoring complete. ${qualified} candidates qualified for recruiter review; the rest moved to internal reject.`
//       );
//     }, 3000);
//   };

//   const openTagForm = (position: any) => {
//     setTagPositionId(position.id);
//     setTagFormData({
//       positionName: position.positionName,
//       applicant: "",
//       candidateId: null,
//       recruiter: recruiter,
//       immediateJoiner: false,
//       status: "",
//     });
//     setShowTagForm(true);
//   };

//   const closeTagForm = () => {
//     setShowTagForm(false);
//     setTagPositionId(null);
//     setTagFormData({
//       positionName: "",
//       applicant: "",
//       candidateId: null,
//       recruiter: "",
//       immediateJoiner: false,
//       status: "",
//     });
//   };

//   /* -------------------- detail navigation -------------------- */

//   const currentPositionIndex = selectedPosition
//     ? filteredPositions.findIndex(
//         (p: any) => String(p.id) === String(selectedPosition.id)
//       )
//     : -1;

//   const stepPosition = (delta: number) => {
//     const next = filteredPositions[currentPositionIndex + delta];
//     if (next) navigate(`/position-management/${next.id}`);
//   };

//   /* -------------------- detail view -------------------- */

//   if (positionId) {
//     if (!selectedPosition) {
//       return (
//         <div className="min-h-full">
//           <Header />
//           <div className="max-w-7xl mx-auto p-6 text-sm text-gray-500">
//             Loading position...
//           </div>
//         </div>
//       );
//     }

//     return (
//       <PositionDetail
//         position={selectedPosition}
//         candidates={candidates}
//         recruiter={recruiter}
//         onBack={() => navigate("/position-management")}
//         setCandidates={setCandidates}
//         runAIResumeMatcherForPosition={runAIResumeMatcherForPosition}
//         onSave={handleUpdatePosition}
//         onPrev={() => stepPosition(-1)}
//         onNext={() => stepPosition(1)}
//         hasPrev={currentPositionIndex > 0}
//         hasNext={
//           currentPositionIndex >= 0 &&
//           currentPositionIndex < filteredPositions.length - 1
//         }
//         functionOptions={functionOptions}
//         roleOptions={roleOptions}
//         educationOptions={educationOptions}
//         cityOptions={cityOptions}
//       />
//     );
//   }

//   /* -------------------- list view -------------------- */

//   return (
//     <div className="min-h-full">
//       <Header />

//       {sharePosition && (
//         <SharePositionModal
//           open={!!sharePosition}
//           onClose={() => setSharePosition(null)}
//           position={sharePosition}
//         />
//       )}

//       {showTagForm && (
//         <TagCandidateModal
//           onClose={closeTagForm}
//           tagFormData={tagFormData}
//           setTagFormData={setTagFormData}
//           selectedPositionId={tagPositionId}
//           isSubmitting={isSubmittingTag}
//           setIsSubmitting={setIsSubmittingTag}
//           onTagged={() => {
//             closeTagForm();
//             loadPositions();
//           }}
//         />
//       )}

//       <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
//         {/* Toolbar: search, filters and create action on one line */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//           <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap md:items-center gap-3">
//             <div className="relative flex-1 min-w-0 basis-full lg:basis-auto">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//               <input
//                 type="text"
//                 placeholder="Search by position, client, location, priority or experience"
//                 className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             <select
//               className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:flex-1 lg:flex-none lg:w-44 shrink-0"
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="all">All statuses</option>
//               {statusFilterOptions.map((status: string) => (
//                 <option key={status} value={status}>
//                   {status}
//                 </option>
//               ))}
//             </select>

//             <select
//               className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:flex-1 lg:flex-none lg:w-44 shrink-0"
//               value={filterBy}
//               onChange={(e) => setFilterBy(e.target.value)}
//             >
//               <option value="all">All priorities</option>
//               <option value="High">High priority</option>
//               <option value="Medium">Medium priority</option>
//               <option value="Low">Low priority</option>
//             </select>

//             <select
//               className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:flex-1 lg:flex-none lg:w-44 shrink-0"
//               value={groupBy}
//               onChange={(e) => setGroupBy(e.target.value)}
//             >
//               <option value="none">No grouping</option>
//               <option value="clientName">Group by client</option>
//             </select>

//             <button
//               className="h-10 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shrink-0"
//               onClick={() => setShowCreatePosition(true)}
//             >
//               <Plus className="w-4 h-4" />
//               Create position
//             </button>
//           </div>
//         </div>

//         {/* Positions */}
//         {loading ? (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center text-sm text-gray-500">
//             Loading positions...
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {Object.entries(groupedPositions).map(
//               ([groupName, groupPositions]: any) => (
//                 <div key={groupName} className="space-y-3">
//                   {groupBy !== "none" && (
//                     <h2 className="text-lg font-semibold text-gray-900">
//                       {groupName}
//                     </h2>
//                   )}
//                   <PositionTable
//                     positions={groupPositions}
//                     onOpen={(position: any) =>
//                       navigate(`/position-management/${position.id}`)
//                     }
//                     onTag={openTagForm}
//                     onAIMatcher={() => navigate("/ai-matcher")}
//                     onShare={(position: any) => setSharePosition(position)}
//                   />
//                 </div>
//               )
//             )}
//           </div>
//         )}
//       </div>

//       {/* Add Candidate Modal */}
//       {showAddCandidate && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-semibold mb-4">Add candidate</h2>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email ID
//             </label>
//             <input
//               type="email"
//               className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={candidateEmail}
//               onChange={(e) => setCandidateEmail(e.target.value)}
//               placeholder="candidate@email.com"
//             />
//             <div className="flex gap-3 mt-5">
//               <button
//                 onClick={handleEmailCheck}
//                 className="flex-1 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//                 disabled={!candidateEmail}
//               >
//                 Check email
//               </button>
//               <button
//                 onClick={() => setShowAddCandidate(false)}
//                 className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Create Candidate Modal */}
//       {showCandidateForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
//           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-xl font-semibold">Create candidate</h2>
//             </div>
//             <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.email}
//                   onChange={(e) =>
//                     setNewCandidate({ ...newCandidate, email: e.target.value })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Current CTC (₹)
//                 </label>
//                 <input
//                   type="number"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.currentCTC}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       currentCTC: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Expected CTC (₹)
//                 </label>
//                 <input
//                   type="number"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.expectedCTC}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       expectedCTC: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Notice period (days)
//                 </label>
//                 <input
//                   type="number"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.noticePeriod}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       noticePeriod: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Education
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.education}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       education: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Gender
//                 </label>
//                 <select
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.gender}
//                   onChange={(e) =>
//                     setNewCandidate({ ...newCandidate, gender: e.target.value })
//                   }
//                 >
//                   <option value="">Select gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Engagement type
//                 </label>
//                 <select
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.engagementType}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       engagementType: e.target.value,
//                     })
//                   }
//                 >
//                   <option value="">Select type</option>
//                   <option value="Full-time">Full-time</option>
//                   <option value="Part-time">Part-time</option>
//                   <option value="Contract">Contract</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Recruiter
//                 </label>
//                 <input
//                   type="text"
//                   readOnly
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm bg-gray-100"
//                   value={newCandidate.recruiter}
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="flex items-center text-sm text-gray-700">
//                   <input
//                     type="checkbox"
//                     className="mr-2 h-4 w-4"
//                     checked={newCandidate.openToRelocation}
//                     onChange={(e) =>
//                       setNewCandidate({
//                         ...newCandidate,
//                         openToRelocation: e.target.checked,
//                       })
//                     }
//                   />
//                   Open to relocation
//                 </label>
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Special comments
//                 </label>
//                 <textarea
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.specialComments}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       specialComments: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </div>
//             <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
//               <button
//                 onClick={handleCreateCandidate}
//                 className="flex-1 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Create candidate
//               </button>
//               <button
//                 onClick={() => setShowCandidateForm(false)}
//                 className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <CreatePositionWizard
//         open={showCreatePosition}
//         onClose={() => setShowCreatePosition(false)}
//         onCreate={handleCreatePosition}
//         recruiter={recruiter}
//         clientOptions={clientOptions}
//         functionOptions={functionOptions}
//         roleOptions={roleOptions}
//         educationOptions={educationOptions}
//         cityOptions={cityOptions}
//       />
//     </div>
//   );
// };

// export default PositionManagement;



import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { Search, Plus, Users, Bot, ArrowLeft, Mail, MapPin, Share2 } from "lucide-react";
import { positionService } from "../services/positionService";
import { clientService } from "../services/clientService";
import Select from "react-select";
import {
  educationOptions,
  functionOptions,
  roleOptions,
  cityOptions,
  candidateStatusOptions,
} from "../constants/dropdown";
import AsyncSelect from "react-select/async";
import CreatePositionWizard from "../components/positions/CreatePositionWizard";
import PositionDetail from "../components/positions/Positiondetail";
import SharePositionModal from "../components/positions/Sharepositionmodal";

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Tag Candidate Modal (moved to top level so it does not remount on    */
/* every keystroke, which was stealing focus from the inputs)          */
/* ------------------------------------------------------------------ */

const TagCandidateModal = ({
  onClose,
  tagFormData,
  setTagFormData,
  selectedPositionId,
  isSubmitting,
  setIsSubmitting,
  onTagged,
}) => {
  const searchTimeout = useRef<any>(null);

  const debouncedLoadOptions = (inputValue: string, callback: any) => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (!inputValue || inputValue.trim().length < 2) {
      callback([]);
      return;
    }

    searchTimeout.current = setTimeout(async () => {
      try {
        const res = await positionService.fetchAutocomplete(inputValue.trim());
        const candidates = res?.data || [];
        callback(
          candidates.map((candidate: any) => ({
            value: candidate.id,
            label: `${candidate.name} (${candidate.email})`,
            email: candidate.email,
            name: candidate.name,
          }))
        );
      } catch (err) {
        console.error("Autocomplete fetch error:", err);
        callback([]);
      }
    }, 300);
  };

  const handleCandidateSelect = (selectedOption: any) => {
    setTagFormData((prev: any) => ({
      ...prev,
      applicant: selectedOption ? selectedOption.label : "",
      candidateId: selectedOption ? selectedOption.value : null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tagFormData.candidateId) {
      alert("Select a candidate before submitting.");
      return;
    }
    if (!tagFormData.recruiter) {
      alert("Recruiter email is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await positionService.tagCandidateToPosition(
        String(selectedPositionId),
        {
          candidateId: tagFormData.candidateId,
          recruiterEmail: tagFormData.recruiter,
          immediateJoiner: tagFormData.immediateJoiner,
          status: tagFormData.status,
        }
      );

      if (response.status === 201) {
        alert("Candidate tagged to the position.");
        onTagged();
      } else {
        alert("Tagging failed: " + (response.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error tagging candidate:", error);
      alert("Could not tag the candidate. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 sm:p-4">
      <div className="bg-white w-full sm:max-w-md h-[92vh] sm:h-auto sm:max-h-[90vh] rounded-t-2xl sm:rounded-lg shadow-xl flex flex-col">
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Tag candidate
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              readOnly
              value={tagFormData.positionName}
              className="w-full h-10 px-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Applicant <span className="text-red-500">*</span>
            </label>
            <AsyncSelect
              cacheOptions
              defaultOptions={false}
              loadOptions={debouncedLoadOptions}
              isSearchable
              isClearable
              placeholder="Search by name or email..."
              noOptionsMessage={({ inputValue }) =>
                !inputValue || inputValue.length < 2
                  ? "Type at least 2 characters"
                  : "No candidates found"
              }
              loadingMessage={() => "Searching..."}
              onChange={handleCandidateSelect}
              value={
                tagFormData.candidateId
                  ? {
                      value: tagFormData.candidateId,
                      label: tagFormData.applicant,
                    }
                  : null
              }
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: "40px",
                  borderColor: "#d1d5db",
                  "&:hover": { borderColor: "#3b82f6" },
                }),
                menu: (base) => ({ ...base, zIndex: 9999 }),
              }}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
            />
            <p className="text-xs text-gray-500 mt-1">
              Type at least 2 characters to search.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recruiter <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={tagFormData.recruiter}
              onChange={(e) =>
                setTagFormData((prev: any) => ({
                  ...prev,
                  recruiter: e.target.value,
                }))
              }
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Recruiter email"
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="immediateJoiner"
              checked={tagFormData.immediateJoiner}
              onChange={(e) =>
                setTagFormData((prev: any) => ({
                  ...prev,
                  immediateJoiner: e.target.checked,
                }))
              }
              className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <label
                htmlFor="immediateJoiner"
                className="text-sm font-medium text-gray-700"
              >
                Immediate joiner
              </label>
              <p className="text-xs text-gray-500">
                Tick this if the candidate can join within 15 days.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <Select
              options={candidateStatusOptions}
              isSearchable
              placeholder="Select status..."
              value={
                candidateStatusOptions.find(
                  (opt: any) => opt.value === tagFormData.status
                ) || null
              }
              onChange={(selected: any) =>
                setTagFormData((prev: any) => ({
                  ...prev,
                  status: selected?.value,
                }))
              }
              styles={{
                control: (base) => ({ ...base, minHeight: "40px" }),
                menu: (base) => ({ ...base, zIndex: 9999 }),
              }}
            />
          </div>

          </div>

          <div className="flex gap-3 px-4 sm:px-6 py-3 border-t border-gray-200 shrink-0 bg-white sm:rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none sm:ml-auto px-4 h-11 sm:h-10 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sm:flex-none px-4 h-11 sm:h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isSubmitting ? "Tagging..." : "Tag candidate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Position detail                                                     */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Positions table                                                     */
/* ------------------------------------------------------------------ */

const PositionTable = ({ positions, onOpen, onTag, onAIMatcher, onShare }) => (
  <>
    {/* Mobile: stacked cards */}
    <div className="md:hidden space-y-3">
      {positions.map((position: any) => (
        <div
          key={position.id}
          onClick={() => onOpen(position)}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 active:bg-gray-50"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-medium text-gray-900 leading-5 break-words">
              {position.positionName}
            </p>
            <span
              className={`shrink-0 inline-flex px-2 py-0.5 text-xs font-medium leading-4 rounded-full ${
                position.priority === "High"
                  ? "bg-red-100 text-red-800"
                  : position.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {position.priority}
            </span>
          </div>

          <p className="text-sm text-gray-700 mt-1 break-words">
            {position.clientName}
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
            <span>{position.ctcBudget}</span>
            <span className="flex items-center min-w-0">
              <MapPin className="w-3 h-3 mr-1 shrink-0" />
              <span className="truncate">{position.location}</span>
            </span>
            <span>
              {position.experience} • {position.workplaceType}
            </span>
          </div>

          <div className="flex gap-2 mt-3">
            <button
              className="flex-1 h-9 bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-medium rounded hover:bg-emerald-100"
              onClick={(e) => {
                e.stopPropagation();
                onTag(position);
              }}
            >
              Tag candidate
            </button>
            <button
              className="flex-1 h-9 border border-purple-200 text-xs font-medium text-purple-600 rounded hover:bg-purple-50"
              onClick={(e) => {
                e.stopPropagation();
                onAIMatcher();
              }}
            >
              AI matcher
            </button>
            <button
              className="h-9 w-9 grid place-items-center rounded border border-gray-200 text-gray-500 shrink-0"
              aria-label="Share this position"
              onClick={(e) => {
                e.stopPropagation();
                onShare(position);
              }}
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

      {positions.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-sm text-gray-500">
          No positions match this search.
        </div>
      )}
    </div>

    {/* Desktop: table */}
    <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div className="w-full">
      <table className="w-full table-fixed divide-y divide-gray-200">
        <colgroup>
          <col className="w-[30%]" />
          <col className="w-[24%]" />
          <col className="w-[20%]" />
          <col className="w-[26%]" />
        </colgroup>
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Position
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Client and priority
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CTC and location
            </th>
            <th className="px-4 py-2.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {positions.map((position: any) => {
            return (
              <tr
                key={position.id}
                className="hover:bg-gray-50 cursor-pointer align-top"
                onClick={() => onOpen(position)}
              >
                <td className="px-4 py-3 align-top">
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-gray-900 leading-5 break-words">
                      {position.positionName}
                    </span>
                    <span className="text-xs text-gray-500 leading-5 mt-0.5 truncate">
                      {position.experience} • {position.workplaceType}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 align-top">
                  <div className="flex flex-col min-w-0">
                  <span className="text-sm text-gray-900 leading-5 break-words">
                    {position.clientName}
                  </span>
                  <span
                    className={`inline-flex self-start mt-1 px-2 py-0.5 text-xs font-medium leading-4 rounded-full ${
                      position.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : position.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {position.priority}
                  </span>
                  </div>
                </td>

                <td className="px-4 py-3 align-top">
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm text-gray-900 leading-5 truncate">
                      {position.ctcBudget}
                    </span>
                    <span className="text-xs text-gray-500 leading-5 mt-0.5 flex items-center min-w-0">
                      <MapPin className="w-3 h-3 mr-1 shrink-0" />
                      <span className="truncate">{position.location}</span>
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 align-top">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      className="h-8 px-3 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg border border-emerald-100 hover:bg-emerald-100 whitespace-nowrap"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTag(position);
                      }}
                    >
                      Tag candidate
                    </button>
                    <button
                      className="h-8 px-3 text-xs font-medium text-purple-600 rounded-lg border border-purple-100 hover:bg-purple-50 whitespace-nowrap"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAIMatcher();
                      }}
                    >
                      AI matcher
                    </button>
                    <button
                      className="h-8 w-8 grid place-items-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 shrink-0"
                      title="Share this position"
                      aria-label="Share this position"
                      onClick={(e) => {
                        e.stopPropagation();
                        onShare(position);
                      }}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}

          {positions.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-10 text-center text-sm text-gray-500"
              >
                No positions match this search. Clear the filters or create a
                position.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  </>
);

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

const PositionManagement = () => {
  const [selectedPosition, setSelectedPosition] = useState<any>(null);
  const [tagPositionId, setTagPositionId] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [statusFilter, setStatusFilter] = useState("Open");
  const [sharePosition, setSharePosition] = useState<any>(null);
  const [groupBy, setGroupBy] = useState("none");
  const [showTagForm, setShowTagForm] = useState(false);
  const [showAddCandidate, setShowAddCandidate] = useState<any>(false);
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [showCreatePosition, setShowCreatePosition] = useState(false);
  const [candidateEmail, setCandidateEmail] = useState("");
  const [loadingPositionDetail, setLoadingPositionDetail] = useState(false);
  const [clientOptions, setClientOptions] = useState<any[]>([]);
  const [isSubmittingTag, setIsSubmittingTag] = useState(false);
  const [positions, setPositions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { positionId } = useParams();
  const recruiter = localStorage.getItem("email") || "";

  const [tagFormData, setTagFormData] = useState<any>({
    positionName: "",
    applicant: "",
    candidateId: null,
    recruiter: "",
    immediateJoiner: false,
    status: "",
  });

  const [candidates, setCandidates] = useState<any[]>([
    {
      id: 1,
      email: "john.smith@email.com",
      name: "John Smith",
      currentCTC: 1500000,
      expectedCTC: 2000000,
      noticePeriod: 30,
      status: "submitted",
      positionId: 1,
      recruiter: recruiter,
      source: "recruiter",
    },
    {
      id: 2,
      email: "jane.doe@email.com",
      name: "Jane Doe",
      currentCTC: 1200000,
      expectedCTC: 1800000,
      noticePeriod: 60,
      status: "internal_screening",
      positionId: 1,
      recruiter: "AI Matcher",
      source: "direct",
      aiScore: null,
    },
    {
      id: 3,
      email: "alex.kumar@email.com",
      name: "Alex Kumar",
      currentCTC: 1800000,
      expectedCTC: 2500000,
      noticePeriod: 45,
      status: "internal_screening",
      positionId: 1,
      recruiter: "Direct Application",
      source: "direct",
      aiScore: null,
    },
    {
      id: 4,
      email: "priya.sharma@email.com",
      name: "Priya Sharma",
      currentCTC: 1600000,
      expectedCTC: 2200000,
      noticePeriod: 30,
      status: "internal_screening",
      positionId: 1,
      recruiter: "Direct Application",
      source: "direct",
      aiScore: null,
    },
    {
      id: 5,
      email: "rajesh.patel@email.com",
      name: "Rajesh Patel",
      currentCTC: 1400000,
      expectedCTC: 2000000,
      noticePeriod: 60,
      status: "internal_reject",
      positionId: 1,
      recruiter: "Direct Application",
      source: "direct",
      aiScore: 12,
    },
  ]);

  const [newCandidate, setNewCandidate] = useState<any>({
    email: "",
    resume: null,
    currentCTC: "",
    specialComments: "",
    education: "",
    gender: "",
    openToRelocation: false,
    engagementType: "",
    expectedCTC: "",
    noticePeriod: "",
    recruiter: recruiter,
  });

  /* -------------------- data -------------------- */

  const transformPosition = (position: any) => {
    const [submitted, targeted] = String(position.progress || "0/0")
      .split("/")
      .map(Number);

    return {
      id: position.id,
      positionName: position.title,
      clientName: position.client,
      submittedResumes: submitted || 0,
      targetedResumes: targeted || 0,
      ctcBudget: Number.isFinite(Number(position.ctc)) && Number(position.ctc) > 0
        ? `${(Number(position.ctc) / 100000).toFixed(0)} LPA`
        : "N/A",
      location: position.location || "N/A",
      priority: position.priority || "Medium",
      experience: position.experience ? `${position.experience} years` : "N/A",
      workplaceType: position.mode || "N/A",
      status: position.status || "Active",
      ctcBudgetNumeric: position.ctc || 0,
      city: position.location || "N/A",
      experienceYears: position.experience || "N/A",
      daysSinceNoAction: position.daysSinceNoAction || 0,
      education: position.education || "N/A",
      roleDescription: position.roleDescription || "",
      preferredIndustry: position.preferredIndustry || "",
      preferredCompanies: position.preferredCompanies || "",
      reportees: position.reportees || 0,
      deadline: position.deadline || "",
      rounds: position.rounds || 0,
      interviewerName: position.interviewerName || "",
      interviewerLinkedIn: position.interviewerLinkedIn || "",
      ctcStructure: position.ctcStructure || "",
      roleType: position.roleType || "",
      diversityPreference: position.diversityPreference || "",
      interviewMode: position.interviewMode || "",
      jobType: position.jobType || "",
      clientSPOC: position.clientSPOC || "",
      lakshSPOC: position.lakshSPOC || "",
      recruiter: position.recruiter || "",
      function: position.function || "",
      role: position.role || "",
      target: targeted || 0,
      createdDate: position.createdDate || new Date().toISOString(),
      lastActivityDate: position.lastActivityDate || new Date().toISOString(),
    };
  };

  const loadPositions = async () => {
    try {
      const res = await positionService.fetchAll(1, 2000);
      if (res.status === 200) {
        setPositions(res.data.positions.map(transformPosition));
      } else {
        console.error("Failed to fetch positions:", res.message);
      }
    } catch (err) {
      console.error("Error fetching positions:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPositionDetail = async (positionId: any) => {
    setLoadingPositionDetail(true);
    try {
      const res = await positionService.fetchById(positionId);
      if (res.status === 200) {
        const position = res.data;
        setSelectedPosition({
          id: String(position.id),
          positionName: position.title || "N/A",
          clientName: position.clientName || "N/A",
          submittedResumes: position.submittedCandidates?.length || 0,
          targetedResumes: position.targetedResumes || 0,
          ctcBudget: position.ctcBudget
            ? `${(Number(position.ctcBudget) / 100000).toFixed(0)} LPA`
            : "N/A",
          ctcStructure: position.ctcStructure || "",
          city: position.location || "",
          location: position.location || "",
          experience: position.experience ? `${position.experience} years` : "",
          priority: position.priority || "",
          function: position.function || "",
          role: position.role || "",
          workplaceType: position.workplaceType || "",
          status: position.status || "Open",
          education: position.education || "",
          roleDescription: position.roleDescription || "",
          preferredIndustry: position.preferredIndustry || [],
          preferredCompanies: position.preferredCompanies || [],
          reportees: position.reportees || 0,
          target: position.target || 0,
          deadline: position.deadline || "",
          rounds: position.interviewRounds || 0,
          interviewerName: position.interviewer || "",
          diversityPreference: position.diversityPreference || "",
          interviewMode: position.interviewMode || "",
          jobType: position.jobType || "",
          roleType: position.roleType || "",
          clientSpoc: position.clientSpoc || "",
          lakshSpoc: position.lakshSpoc?.filter(Boolean) || [],
          recruiter: position.recruiter || "",
          linkedIn: position.linkedin || null,
          submittedCandidates: position.submittedCandidates || [],
          message: position.message || "",
        });
      }
    } catch (err) {
      console.error("Error fetching position detail:", err);
    } finally {
      setLoadingPositionDetail(false);
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      const res = await clientService.fetchAll();
      const clients = res?.data || [];
      setClientOptions(
        clients.map((c: any) => ({
          id: c.id,
          label: c.client_name,
          value: c.id,
          clientHRSpocs: c.clientHRSpocs || [],
        }))
      );
    };
    fetchClients();
  }, []);

  useEffect(() => {
    loadPositions();
  }, []);

  // The URL is the source of truth: /position-management/:positionId
  useEffect(() => {
    if (positionId) {
      fetchPositionDetail(positionId);
    } else {
      setSelectedPosition(null);
    }
  }, [positionId]);

  /* -------------------- derived -------------------- */

  const KNOWN_STATUSES = [
    "Open",
    "On Hold",
    "Close by LHR",
    "Lost",
    "Candidate identified",
  ];

  // Keep the known order, then append any status the API returns that we
  // don't know about yet, so a new backend value never disappears from the UI.
  const statusFilterOptions = [
    ...KNOWN_STATUSES,
    ...Array.from(
      new Set(
        positions
          .map((p: any) => p.status)
          .filter(
            (status: string) =>
              status &&
              !KNOWN_STATUSES.some(
                (known) => known.toLowerCase() === String(status).toLowerCase()
              )
          )
      )
    ),
  ];


  const filteredPositions = positions.filter((position) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (position.positionName || "").toLowerCase().includes(term) ||
      (position.clientName || "").toLowerCase().includes(term) ||
      (position.location || "").toLowerCase().includes(term) ||
      (position.priority || "").toLowerCase().includes(term) ||
      (position.experience || "").toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === "all" ||
      String(position.status || "").toLowerCase() ===
        statusFilter.toLowerCase();

    if (!matchesStatus) return false;
    if (filterBy === "all") return matchesSearch;
    return matchesSearch && position.priority === filterBy;
  });

  const groupedPositions =
    groupBy === "clientName"
      ? filteredPositions.reduce((acc: any, position: any) => {
          const client = position.clientName || "Unassigned";
          if (!acc[client]) acc[client] = [];
          acc[client].push(position);
          return acc;
        }, {})
      : { "All Positions": filteredPositions };

  /* -------------------- handlers -------------------- */

  const handleEmailCheck = () => {
    const existingCandidate = candidates.find((c) => c.email === candidateEmail);
    if (existingCandidate) {
      setCandidates((prev) =>
        prev.map((c) =>
          c.email === candidateEmail ? { ...c, positionId: showAddCandidate } : c
        )
      );
      setShowAddCandidate(false);
      setCandidateEmail("");
      alert("Candidate tagged to the position.");
    } else {
      setShowCandidateForm(true);
      setNewCandidate({ ...newCandidate, email: candidateEmail });
    }
  };

  const handleCreateCandidate = () => {
    const candidate = {
      id: candidates.length + 1,
      ...newCandidate,
      status: "submitted",
      positionId: showAddCandidate,
      source: "recruiter",
      name: newCandidate.email.split("@")[0].replace(".", " "),
    };
    setCandidates([...candidates, candidate]);
    setShowCandidateForm(false);
    setShowAddCandidate(false);
    setNewCandidate({
      email: "",
      resume: null,
      currentCTC: "",
      specialComments: "",
      education: "",
      gender: "",
      openToRelocation: false,
      engagementType: "",
      expectedCTC: "",
      noticePeriod: "",
      recruiter: recruiter,
    });
    alert("Candidate created and tagged.");
  };

  const handleCreatePosition = async (payload: any) => {
    try {
      const response = await positionService.createPosition(payload);

      if (response.status === 201 || response.status === 200) {
        alert("Position created.");
        await loadPositions();
        return true;
      }

      alert(
        "Could not create the position: " + (response.message || "Unknown error")
      );
      return false;
    } catch (error) {
      console.error("Error creating position:", error);
      alert("Could not create the position. Try again.");
      return false;
    }
  };

  const handleUpdatePosition = async (payload: any) => {
    try {
      const response = await positionService.updatePosition(
        String(payload.id),
        payload
      );

      if (response.status === 200) {
        await fetchPositionDetail(payload.id);
        await loadPositions();
        return true;
      }

      alert("Update failed: " + (response.message || "Unknown error"));
      return false;
    } catch (error: any) {
      console.error("Error updating position:", error);
      alert("Could not update the position: " + (error.message || "Try again."));
      return false;
    }
  };

  const runAIResumeMatcherForPosition = (positionId: any) => {
    const eligibleCandidates = candidates.filter(
      (c) =>
        c.positionId === positionId &&
        c.source === "direct" &&
        c.status === "internal_screening"
    );

    if (eligibleCandidates.length === 0) {
      alert("No candidates in internal screening for this position.");
      return;
    }

    alert(`Scoring ${eligibleCandidates.length} candidates...`);

    setTimeout(() => {
      const scored = candidates.map((c) => {
        if (!eligibleCandidates.find((e) => e.id === c.id)) return c;
        const score = Math.floor(Math.random() * 100) + 1;
        return {
          ...c,
          aiScore: score,
          status: score >= 85 ? "internal_screening" : "internal_reject",
        };
      });
      setCandidates(scored);

      const qualified = scored.filter(
        (c) =>
          eligibleCandidates.find((e) => e.id === c.id) && (c.aiScore || 0) >= 85
      ).length;

      alert(
        `Scoring complete. ${qualified} candidates qualified for recruiter review; the rest moved to internal reject.`
      );
    }, 3000);
  };

  const openTagForm = (position: any) => {
    setTagPositionId(position.id);
    setTagFormData({
      positionName: position.positionName,
      applicant: "",
      candidateId: null,
      recruiter: recruiter,
      immediateJoiner: false,
      status: "",
    });
    setShowTagForm(true);
  };

  const closeTagForm = () => {
    setShowTagForm(false);
    setTagPositionId(null);
    setTagFormData({
      positionName: "",
      applicant: "",
      candidateId: null,
      recruiter: "",
      immediateJoiner: false,
      status: "",
    });
  };

  /* -------------------- detail navigation -------------------- */

  const currentPositionIndex = selectedPosition
    ? filteredPositions.findIndex(
        (p: any) => String(p.id) === String(selectedPosition.id)
      )
    : -1;

  const stepPosition = (delta: number) => {
    const next = filteredPositions[currentPositionIndex + delta];
    if (next) navigate(`/position-management/${next.id}`);
  };

  /* -------------------- detail view -------------------- */

  if (positionId) {
    if (!selectedPosition) {
      return (
        <div className="min-h-full">
          <Header />
          <div className="max-w-7xl mx-auto p-6 text-sm text-gray-500">
            Loading position...
          </div>
        </div>
      );
    }

    return (
      <PositionDetail
        position={selectedPosition}
        candidates={candidates}
        recruiter={recruiter}
        onBack={() => navigate("/position-management")}
        setCandidates={setCandidates}
        runAIResumeMatcherForPosition={runAIResumeMatcherForPosition}
        onSave={handleUpdatePosition}
        onPrev={() => stepPosition(-1)}
        onNext={() => stepPosition(1)}
        hasPrev={currentPositionIndex > 0}
        hasNext={
          currentPositionIndex >= 0 &&
          currentPositionIndex < filteredPositions.length - 1
        }
        functionOptions={functionOptions}
        roleOptions={roleOptions}
        educationOptions={educationOptions}
        cityOptions={cityOptions}
      />
    );
  }

  /* -------------------- list view -------------------- */

  return (
    <div className="min-h-full bg-white">
      <Header />

      {sharePosition && (
        <SharePositionModal
          open={!!sharePosition}
          onClose={() => setSharePosition(null)}
          position={sharePosition}
        />
      )}

      {showTagForm && (
        <TagCandidateModal
          onClose={closeTagForm}
          tagFormData={tagFormData}
          setTagFormData={setTagFormData}
          selectedPositionId={tagPositionId}
          isSubmitting={isSubmittingTag}
          setIsSubmitting={setIsSubmittingTag}
          onTagged={() => {
            closeTagForm();
            loadPositions();
          }}
        />
      )}

      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Toolbar: search, filters and create action on one line */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap md:items-center gap-3">
            <div className="relative flex-1 min-w-0 basis-full lg:basis-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by position, client, location, priority or experience"
                className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:flex-1 lg:flex-none lg:w-44 shrink-0"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All statuses</option>
              {statusFilterOptions.map((status: string) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:flex-1 lg:flex-none lg:w-44 shrink-0"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="all">All priorities</option>
              <option value="High">High priority</option>
              <option value="Medium">Medium priority</option>
              <option value="Low">Low priority</option>
            </select>

            <select
              className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:flex-1 lg:flex-none lg:w-44 shrink-0"
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
            >
              <option value="none">No grouping</option>
              <option value="clientName">Group by client</option>
            </select>

            <button
              className="h-10 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shrink-0"
              onClick={() => setShowCreatePosition(true)}
            >
              <Plus className="w-4 h-4" />
              Create position
            </button>
          </div>
        </div>

        {/* Positions */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center text-sm text-gray-500">
            Loading positions...
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedPositions).map(
              ([groupName, groupPositions]: any) => (
                <div key={groupName} className="space-y-3">
                  {groupBy !== "none" && (
                    <h2 className="text-lg font-semibold text-gray-900">
                      {groupName}
                    </h2>
                  )}
                  <PositionTable
                    positions={groupPositions}
                    onOpen={(position: any) =>
                      navigate(`/position-management/${position.id}`)
                    }
                    onTag={openTagForm}
                    onAIMatcher={() => navigate("/ai-matcher")}
                    onShare={(position: any) => setSharePosition(position)}
                  />
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Add Candidate Modal */}
      {showAddCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add candidate</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email ID
            </label>
            <input
              type="email"
              className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={candidateEmail}
              onChange={(e) => setCandidateEmail(e.target.value)}
              placeholder="candidate@email.com"
            />
            <div className="flex gap-3 mt-5">
              <button
                onClick={handleEmailCheck}
                className="flex-1 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                disabled={!candidateEmail}
              >
                Check email
              </button>
              <button
                onClick={() => setShowAddCandidate(false)}
                className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Candidate Modal */}
      {showCandidateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Create candidate</h2>
            </div>
            <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCandidate.email}
                  onChange={(e) =>
                    setNewCandidate({ ...newCandidate, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current CTC (₹)
                </label>
                <input
                  type="number"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCandidate.currentCTC}
                  onChange={(e) =>
                    setNewCandidate({
                      ...newCandidate,
                      currentCTC: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected CTC (₹)
                </label>
                <input
                  type="number"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCandidate.expectedCTC}
                  onChange={(e) =>
                    setNewCandidate({
                      ...newCandidate,
                      expectedCTC: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notice period (days)
                </label>
                <input
                  type="number"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCandidate.noticePeriod}
                  onChange={(e) =>
                    setNewCandidate({
                      ...newCandidate,
                      noticePeriod: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Education
                </label>
                <input
                  type="text"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCandidate.education}
                  onChange={(e) =>
                    setNewCandidate({
                      ...newCandidate,
                      education: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCandidate.gender}
                  onChange={(e) =>
                    setNewCandidate({ ...newCandidate, gender: e.target.value })
                  }
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Engagement type
                </label>
                <select
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCandidate.engagementType}
                  onChange={(e) =>
                    setNewCandidate({
                      ...newCandidate,
                      engagementType: e.target.value,
                    })
                  }
                >
                  <option value="">Select type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recruiter
                </label>
                <input
                  type="text"
                  readOnly
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm bg-gray-100"
                  value={newCandidate.recruiter}
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4"
                    checked={newCandidate.openToRelocation}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        openToRelocation: e.target.checked,
                      })
                    }
                  />
                  Open to relocation
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special comments
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCandidate.specialComments}
                  onChange={(e) =>
                    setNewCandidate({
                      ...newCandidate,
                      specialComments: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={handleCreateCandidate}
                className="flex-1 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create candidate
              </button>
              <button
                onClick={() => setShowCandidateForm(false)}
                className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <CreatePositionWizard
        open={showCreatePosition}
        onClose={() => setShowCreatePosition(false)}
        onCreate={handleCreatePosition}
        recruiter={recruiter}
        clientOptions={clientOptions}
        functionOptions={functionOptions}
        roleOptions={roleOptions}
        educationOptions={educationOptions}
        cityOptions={cityOptions}
      />
    </div>
  );
};

export default PositionManagement;