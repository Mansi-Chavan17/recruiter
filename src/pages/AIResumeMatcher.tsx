// import React, { useEffect, useRef, useState } from "react";
// import { Search, ExternalLink, Loader2 } from "lucide-react";
// import Header from "../components/Header";
// import { resumeMatcherService } from "../services/resumeMatcherService";
// import AsyncSelect from "react-select/async";
// import { v4 as uuidv4 } from "uuid";
// import { positionService } from "../services/positionService";

// const AiResumeMatcher = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedCandidates, setSelectedCandidates] = useState([]);
//   const [selectedAiCandidates, setSelectedAiCandidates] = useState([]);
//   const [taggedCandidates, setTaggedCandidates] = useState([]);
//   const [aiPrompt, setAiPrompt] = useState("");
//   const [aiResults, setAiResults] = useState([]);
//   const [aiCandidateSnapshot, setAiCandidateSnapshot] = useState([]);
//   const [showAiResults, setShowAiResults] = useState(false);

//   // Loading states
//   const [isApplyingFilter, setIsApplyingFilter] = useState(false);
//   const [isLoadingPage, setIsLoadingPage] = useState(false);
//   const [isRemovingCandidate, setIsRemovingCandidate] = useState(null);
//   const [isGeneratingAiScore, setIsGeneratingAiScore] = useState(false);
//   const [showTagConfirm, setShowTagConfirm] = useState(false);
//   const [candidateToTag, setCandidateToTag] = useState(null);
//   const [aiProgress, setAiProgress] = useState({
//     current: 0,
//     total: 0,
//     percentage: 0,
//   });

//   const [allIndustriesCache, setAllIndustriesCache] = useState([]);
//   const [allFunctionsCache, setAllFunctionsCache] = useState([]);

//   const defaultAiMatcherFilters = {
//     positionName: "",
//     preferredIndustry: [],
//     preferredFunction: [],
//     preferredRole: "",
//     ctcRange: { min: "", max: "" },
//     experienceRange: { min: "", max: "" },
//     keywords: "",
//     industryEnabled: true,
//     functionEnabled: true,
//     roleEnabled: true,
//   };
//   const userEmail = localStorage.getItem("email") || "";
//   const [aiMatcherFilters, setAiMatcherFilters] = useState(
//     defaultAiMatcherFilters
//   );

//   // Sample candidate data
//   // const initialCandidates = [

//   // ];

//   const [allCandidates, setAllCandidates] = useState([]);

//   const [candidatesPerPage, setCandidatesPerPage] = useState(10);
//   const [apiTotalPages, setApiTotalPages] = useState(null);
//   const [apiTotalCandidates, setApiTotalCandidates] = useState(null);
//   const [lastFilters, setLastFilters] = useState(null);

//   const totalPages =
//     apiTotalPages ?? Math.ceil(allCandidates.length / candidatesPerPage);
//   const startIndex = (currentPage - 1) * candidatesPerPage;
//   const currentCandidates = apiTotalPages
//     ? allCandidates
//     : allCandidates.slice(startIndex, startIndex + candidatesPerPage);

//   useEffect(() => {
//     loadAllIndustriesOnMount();
//     loadAllFunctionsOnMount();
//   }, []);

//   const loadAllIndustriesOnMount = async () => {
//     try {
//       console.log("Fetching all industries...");
//       const res = await resumeMatcherService.searchIndustries("");
//       console.log("Industries response:", res);
//       const options = (res?.data || []).map((ind) => ({
//         value: ind.id,
//         label: ind.name,
//       }));
//       console.log("Cached industries options:", options);
//       setAllIndustriesCache(options);
//     } catch (err) {
//       console.error("Failed to load industries:", err);
//     }
//   };

//   const loadAllFunctionsOnMount = async () => {
//     try {
//       console.log("Fetching all functions...");
//       const res = await resumeMatcherService.searchFunctions("");
//       console.log("Functions response:", res);
//       const options = (res?.data || []).map((fn) => ({
//         value: fn.id,
//         label: fn.name,
//       }));
//       console.log("Cached functions options:", options);
//       setAllFunctionsCache(options);
//     } catch (err) {
//       console.error("Failed to load functions:", err);
//     }
//   };

//   const handleFilterChange = (field, value) => {
//     setAiMatcherFilters((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleRangeChange = (field, type, value) => {
//     setAiMatcherFilters((prev) => ({
//       ...prev,
//       [field]: {
//         ...prev[field],
//         [type]: value,
//       },
//     }));
//   };

//   const handleRunAiMatcher = async () => {
//     const selectedJobId = aiMatcherFilters.positionName?.value;

//     if (selectedCandidates.length === 0) {
//       alert("Please select at least one candidate to run AI matcher");
//       return;
//     }

//     if (!aiPrompt.trim()) {
//       alert("Please enter an AI prompt for matching criteria");
//       return;
//     }

//     setIsGeneratingAiScore(true);
//     setAiProgress({ current: 0, total: 0, percentage: 0 });

//     try {
//       const batchId = uuidv4();

//       const payload = {
//         batchId,
//         jobId: selectedJobId,
//         candidateIds: selectedCandidates,
//         prompt: aiPrompt.trim(),
//       };

//       console.log("📤 Sending AI Matcher request:", payload);

//       const response = await resumeMatcherService.runAiMatcher(payload);

//       if (!response?.data?.batchId) {
//         throw new Error("Failed to start AI matching process");
//       }

//       const returnedBatchId = response.data.batchId;
//       const totalCandidates = response.data.totalCandidates;

//       setAiProgress({ current: 0, total: totalCandidates, percentage: 0 });

//       const pollInterval = 2000;
//       const maxAttempts = 60;
//       let attempts = 0;

//       const poll = async () => {
//         attempts++;

//         const statusResponse = await resumeMatcherService.pollAiMatcherStatus(
//           returnedBatchId
//         );
//         const { status, progress, completedCandidates } = statusResponse.data;

//         setAiProgress({
//           current: completedCandidates || 0,
//           total: totalCandidates,
//           percentage: progress || 0,
//         });

//         console.log(
//           `⏳ Progress: ${progress}% (${completedCandidates}/${totalCandidates})`
//         );

//         if (status === "COMPLETED") {
//           const resultsResponse =
//             await resumeMatcherService.getAiMatcherResults(returnedBatchId);

//           console.log("✅ AI Matcher results:", resultsResponse);

//           const candidates = resultsResponse?.data?.candidates || [];

//           console.log("📊 Candidates from backend:", candidates);

//           if (candidates.length === 0) {
//             alert("No candidates matched the AI criteria");
//             setAiResults([]);
//             setShowAiResults(false);
//             setIsGeneratingAiScore(false);
//             setAiProgress({ current: 0, total: 0, percentage: 0 });
//             return;
//           }

//           const sortedCandidates = [...candidates].sort(
//             (a, b) => b.aiScore - a.aiScore
//           );

//           console.log("🎯 FINAL AI RESULTS:", sortedCandidates);

//           setAiResults(sortedCandidates);
//           setShowAiResults(true);
//           setIsGeneratingAiScore(false);
//           setAiProgress({ current: 0, total: 0, percentage: 0 });

//           alert(
//             `AI matching completed! ${sortedCandidates.length} candidates ranked`
//           );
//           return;
//         }

//         if (status === "FAILED") {
//           throw new Error("AI matching process failed");
//         }

//         if (attempts >= maxAttempts) {
//           throw new Error("AI matching process timed out");
//         }

//         setTimeout(poll, pollInterval);
//       };

//       await poll();
//     } catch (error) {
//       console.error("❌ AI Matcher error:", error);
//       alert(
//         error.response?.data?.message ||
//           error.message ||
//           "Failed to run AI matcher"
//       );
//       setIsGeneratingAiScore(false);
//       setAiProgress({ current: 0, total: 0, percentage: 0 });
//     }
//   };

//   const functionSearchTimeout = useRef(null);

//   const debouncedLoadFunctionOptions = (inputValue, callback) => {
//     if (functionSearchTimeout.current)
//       clearTimeout(functionSearchTimeout.current);

//     // If no input, return all cached functions
//     if (!inputValue || inputValue.trim().length === 0) {
//       callback(allFunctionsCache);
//       return;
//     }

//     // If input is less than 2 chars, still search but with debounce
//     if (inputValue.trim().length < 2) {
//       callback(allFunctionsCache);
//       return;
//     }

//     functionSearchTimeout.current = setTimeout(async () => {
//       getAllFunctions(inputValue, callback);
//     }, 300);
//   };

//   const getAllFunctions = async (inputValue, callback) => {
//     try {
//       const res = await resumeMatcherService.searchFunctions(inputValue.trim());

//       const options = (res?.data || []).map((fn) => ({
//         value: fn.id,
//         label: fn.name,
//       }));

//       callback(options);
//     } catch (err) {
//       console.error("Function autocomplete error:", err);
//       callback([]);
//     }
//   };

//   const industrySearchTimeout = useRef(null);

//   const debouncedLoadIndustryOptions = (inputValue, callback) => {
//     if (industrySearchTimeout.current)
//       clearTimeout(industrySearchTimeout.current);

//     // If no input, return all cached industries
//     if (!inputValue || inputValue.trim().length === 0) {
//       callback(allIndustriesCache);
//       return;
//     }

//     // If input is less than 2 chars, still search but with debounce
//     if (inputValue.trim().length < 2) {
//       callback(allIndustriesCache);
//       return;
//     }

//     industrySearchTimeout.current = setTimeout(async () => {
//       getAllIndustries(inputValue, callback);
//     }, 300);
//   };

//   const getAllIndustries = async (inputValue, callback) => {
//     try {
//       const res = await resumeMatcherService.searchIndustries(
//         inputValue.trim()
//       );

//       const options = (res?.data || []).map((ind) => ({
//         value: ind.id,
//         label: ind.name,
//       }));

//       callback(options);
//     } catch (err) {
//       console.error("Industry autocomplete error:", err);
//       callback([]);
//     }
//   };

//   const searchTimeout = useRef(null);

//   const debouncedLoadPositionOptions = (inputValue, callback) => {
//     if (searchTimeout.current) clearTimeout(searchTimeout.current);

//     if (!inputValue || inputValue.trim().length < 2) {
//       callback([]);
//       return;
//     }

//     searchTimeout.current = setTimeout(async () => {
//       try {
//         const res = await resumeMatcherService.searchPositions(
//           inputValue.trim()
//         );

//         const options = (res?.data || []).map((pos) => ({
//           value: pos.id,
//           label: `${pos.position} (${pos.clientName})`,
//           position: pos.position,
//           clientName: pos.clientName,
//         }));

//         callback(options);
//       } catch (err) {
//         console.error("Position autocomplete error:", err);
//         callback([]);
//       }
//     }, 300);
//   };

//   const handleApplyFilter = async () => {
//     setIsApplyingFilter(true);

//     const filters = {
//       positionName: aiMatcherFilters.positionName?.position,
//       preferredIndustry:
//         aiMatcherFilters.preferredIndustry?.length > 0
//           ? aiMatcherFilters.preferredIndustry.map((ind) => ind.label)
//           : undefined,
//       preferredFunction:
//         aiMatcherFilters.preferredFunction?.length > 0
//           ? aiMatcherFilters.preferredFunction.map((fn) => fn.label)
//           : undefined,
//       ctcRange: {
//         min: aiMatcherFilters.ctcRange.min
//           ? Number(aiMatcherFilters.ctcRange.min)
//           : undefined,
//         max: aiMatcherFilters.ctcRange.max
//           ? Number(aiMatcherFilters.ctcRange.max)
//           : undefined,
//       },
//       experienceRange: {
//         min: aiMatcherFilters.experienceRange.min
//           ? Number(aiMatcherFilters.experienceRange.min)
//           : undefined,
//         max: aiMatcherFilters.experienceRange.max
//           ? Number(aiMatcherFilters.experienceRange.max)
//           : undefined,
//       },
//       keywords: aiMatcherFilters.keywords || undefined,
//       page: 1,
//       limit: 150,
//       industryEnabled: !!aiMatcherFilters.industryEnabled,
//       functionEnabled: !!aiMatcherFilters.functionEnabled,
//     };

//     try {
//       setLastFilters(filters);
//       const res = await resumeMatcherService.filterCandidates(filters);
//       const returned = res?.data?.candidates || [];
//       console.log("Filter API returned candidates:", returned);
//       const mapped = returned.map((c) => ({
//         id: c.id,
//         name: c.name,
//         email: c.email,
//         phone: c.phone,
//         currentCtc: c.currentCtc || "",
//         currentOrg: c.currentOrg || "",
//         designation: c.designation || "",
//         experience: c.workExperience || 0,
//         skills: c.skills || "",
//         resume: c.resume || "",
//       }));

//       setAllCandidates(mapped);
//       const pagination = res?.data?.pagination;
//       if (pagination) {
//         setApiTotalPages(pagination.totalPages ?? null);
//         setCandidatesPerPage(pagination.limit ?? candidatesPerPage);
//         setApiTotalCandidates(res?.data?.totalCandidates ?? null);
//         setCurrentPage(pagination.page ?? 1);
//       } else {
//         setApiTotalPages(null);
//         setApiTotalCandidates(null);
//         setCurrentPage(1);
//       }
//     } catch (err) {
//       console.error("Filter API error", err);
//       alert("Failed to apply filters. Please try again.");
//     } finally {
//       setIsApplyingFilter(false);
//     }
//   };

//   const fetchCandidatesPage = async (page) => {
//     if (!lastFilters) return;

//     setIsLoadingPage(true);
//     const filters = { ...lastFilters, page };

//     try {
//       const res = await resumeMatcherService.filterCandidates(filters);
//       const returned = res?.data?.candidates || [];
//       const mapped = returned.map((c) => ({
//         id: c.id,
//         name: c.name,
//         email: c.email,
//         phone: c.phone,
//         currentCtc: c.currentCtc || "",
//         currentOrg: c.currentOrg || "",
//         designation: c.designation || "",
//         experience: c.experience || 0,
//         skills: c.skills || "",
//         resume: c.resume || "",
//       }));

//       setAllCandidates(mapped);
//       const pagination = res?.data?.pagination;
//       if (pagination) {
//         setApiTotalPages(pagination.totalPages ?? null);
//         setCandidatesPerPage(pagination.limit ?? candidatesPerPage);
//         setApiTotalCandidates(res?.data?.totalCandidates ?? null);
//         setCurrentPage(pagination.page ?? page);
//       } else {
//         setApiTotalPages(null);
//         setApiTotalCandidates(null);
//         setCurrentPage(page);
//       }
//     } catch (err) {
//       console.error("Fetch page error", err);
//       alert("Failed to fetch page. Please try again.");
//     } finally {
//       setIsLoadingPage(false);
//     }
//   };

//   const handleResetFilter = () => {
//     setAiMatcherFilters(defaultAiMatcherFilters);
//     setAllCandidates(initialCandidates);
//     setAiResults([]);
//     setShowAiResults(false);
//     setSelectedCandidates([]);
//     setSelectedAiCandidates([]);
//     setCurrentPage(1);
//   };

//   const handleRemoveCandidate = async (candidateId) => {
//     if (!confirm("Are you sure you want to remove this candidate?")) return;

//     setIsRemovingCandidate(candidateId);

//     try {
//       await resumeMatcherService.removeCandidate(candidateId);
//       setAllCandidates((prev) => prev.filter((c) => c.id !== candidateId));
//       setAiResults((prev) => prev.filter((c) => c.id !== candidateId));
//       setSelectedCandidates((prev) => prev.filter((id) => id !== candidateId));
//       setSelectedAiCandidates((prev) =>
//         prev.filter((id) => id !== candidateId)
//       );
//       alert("Candidate removed");
//     } catch (err) {
//       console.error("Remove candidate error", err);
//       alert("Failed to remove candidate. Please try again.");
//     } finally {
//       setIsRemovingCandidate(null);
//     }
//   };

//   const handleSelectCandidate = (candidateId) => {
//     setSelectedCandidates((prev) =>
//       prev.includes(candidateId)
//         ? prev.filter((id) => id !== candidateId)
//         : [...prev, candidateId]
//     );
//   };

//   const handleSelectAiCandidate = (candidateId) => {
//     setSelectedAiCandidates((prev) =>
//       prev.includes(candidateId)
//         ? prev.filter((id) => id !== candidateId)
//         : [...prev, candidateId]
//     );
//   };

//   const handleSelectAllAi = () => {
//     if (selectedAiCandidates.length === aiResults.length) {
//       setSelectedAiCandidates([]);
//     } else {
//       setSelectedAiCandidates(aiResults.map((c) => c.id));
//     }
//   };

//   const openTagConfirm = (candidate) => {
//     setCandidateToTag(candidate);
//     setShowTagConfirm(true);
//   };

//   // const handleTagCandidate = (candidate, positionName) => {
//   //   const newTaggedCandidate = {
//   //     id: Date.now() + Math.random(),
//   //     candidateName: candidate.name,
//   //     candidateStatus: "Tagged",
//   //     positionName: positionName || aiMatcherFilters.positionName,
//   //     clientName: "TechCorp Solutions",
//   //     noticePeriod: "TBD",
//   //     currentCtc: candidate.currentCtc,
//   //     ctcBudget:
//   //       aiMatcherFilters.ctcRange.min && aiMatcherFilters.ctcRange.max
//   //         ? `${aiMatcherFilters.ctcRange.min}-${aiMatcherFilters.ctcRange.max} LPA`
//   //         : "TBD",
//   //     offerLetter: null,
//   //     taggedDate: new Date().toLocaleDateString(),
//   //   };

//   //   setTaggedCandidates((prev) => [...prev, newTaggedCandidate]);
//   //   alert(
//   //     `${candidate.name} has been tagged to position: ${
//   //       positionName || aiMatcherFilters.positionName
//   //     }`
//   //   );
//   // };

//   const confirmTagCandidate = async () => {
//     if (!candidateToTag || !aiMatcherFilters.positionName?.value) {
//       alert("Position not selected");
//       return;
//     }

//     if (!userEmail) {
//       alert("Recruiter email not found");
//       return;
//     }

//     try {
//       const payload = {
//         candidateId: candidateToTag.id,
//         recruiterEmail: userEmail,
//         immediateJoiner: false,
//         status: "Submitted",
//       };

//       await positionService.tagCandidateToPosition(
//         aiMatcherFilters.positionName.value,
//         payload
//       );

//       alert("Candidate tagged successfully");

//       setTaggedCandidates((prev) => [
//         ...prev,
//         {
//           candidateName: candidateToTag.name,
//           positionName: aiMatcherFilters.positionName.label,
//           clientName: "TechCorp Solutions",
//           taggedDate: new Date().toLocaleDateString(),
//         },
//       ]);
//     } catch (err) {
//       console.error("Tag error", err);
//       alert(err?.response?.data?.message || "Failed to tag candidate");
//     } finally {
//       setShowTagConfirm(false);
//       setCandidateToTag(null);
//     }
//   };

//   const handleSelectAll = () => {
//     if (selectedCandidates.length === currentCandidates.length) {
//       setSelectedCandidates([]);
//     } else {
//       setSelectedCandidates(currentCandidates.map((c) => c.id));
//     }
//   };

//   const handleWhatsAppShare = async (type) => {
//     const selected =
//       type === "all"
//         ? currentCandidates
//         : currentCandidates.filter((c) => selectedCandidates.includes(c.id));

//     if (selected.length === 0) {
//       alert("Please select candidates to send WhatsApp message");
//       return;
//     }

//     const payload = {
//       type,
//       positionId: aiMatcherFilters.positionName?.value,
//       positionName: aiMatcherFilters.positionName?.label,
//       candidates: selected.map((c) => ({
//         id: c.id,
//         name: c.name,
//         phone: c.phone,
//         email: c.email,
//       })),
//     };

//     try {
//       await resumeMatcherService.sendWhatsApp(payload);
//       alert("WhatsApp request sent successfully");

//       // 🔄 Reset selections & UI
//       setSelectedCandidates([]);
//       setSelectedAiCandidates([]);
//       setShowAiResults(false);
//       setAiResults([]);
//       setCurrentPage(1);
//     } catch (err) {
//       console.error("WhatsApp error", err);
//       alert("Failed to send WhatsApp message");
//     }
//   };

//   const handleWhatsAppShareAi = async (type) => {
//     const selected =
//       type === "all"
//         ? aiResults
//         : aiResults.filter((c) => selectedAiCandidates.includes(c.id));

//     if (selected.length === 0) {
//       alert("Please select candidates to send WhatsApp message");
//       return;
//     }

//     const payload = {
//       type,
//       positionId: aiMatcherFilters.positionName?.value,
//       positionName: aiMatcherFilters.positionName?.label,
//       candidates: selected.map((c) => ({
//         id: c.id,
//         name: c.name,
//         phone: c.phone,
//         email: c.email,
//       })),
//     };

//     try {
//       await resumeMatcherService.sendWhatsApp(payload);
//       alert("WhatsApp request sent successfully");

//       // Reset AI selections & UI (same behavior)
//       setSelectedAiCandidates([]);
//       setShowAiResults(false);
//       setAiResults([]);
//     } catch (err) {
//       console.error("WhatsApp error", err);
//       alert("Failed to send WhatsApp message");
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="max-w-7xl mx-auto p-6">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">
//             AI Resume Matcher
//           </h2>

//           {/* Filters Section */}
//           <div className="bg-white rounded-lg shadow border p-6 mb-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">
//               Position & Filters
//             </h2>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Position Name
//                 </label>

//                 <AsyncSelect
//                   cacheOptions
//                   loadOptions={debouncedLoadPositionOptions}
//                   isSearchable
//                   isClearable
//                   placeholder="Type to search position..."
//                   noOptionsMessage={({ inputValue }) =>
//                     !inputValue
//                       ? "Type at least 2 characters..."
//                       : "No positions found"
//                   }
//                   loadingMessage={() => "Searching positions..."}
//                   value={aiMatcherFilters.positionName}
//                   onChange={(option) =>
//                     handleFilterChange("positionName", option)
//                   }
//                   getOptionLabel={(option) => option.label}
//                   getOptionValue={(option) => option.value}
//                   styles={{
//                     control: (base) => ({
//                       ...base,
//                       minHeight: "42px",
//                       borderColor: "#d1d5db",
//                     }),
//                     menu: (base) => ({
//                       ...base,
//                       zIndex: 9999,
//                     }),
//                   }}
//                   components={{
//                     DropdownIndicator: () => null,
//                     IndicatorSeparator: () => null,
//                   }}
//                 />

//                 <p className="text-xs text-gray-500 mt-1">
//                   Start typing at least 2 characters to search positions
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   <input
//                     type="checkbox"
//                     checked={aiMatcherFilters.industryEnabled}
//                     onChange={(e) =>
//                       handleFilterChange("industryEnabled", e.target.checked)
//                     }
//                     className="mr-2"
//                   />
//                   Preferred Industry
//                 </label>

//                 <AsyncSelect
//                   isMulti
//                   cacheOptions
//                   defaultOptions={allIndustriesCache}
//                   loadOptions={debouncedLoadIndustryOptions}
//                   isSearchable
//                   isClearable
//                   isDisabled={!aiMatcherFilters.industryEnabled}
//                   placeholder="Select or search industries..."
//                   value={aiMatcherFilters.preferredIndustry}
//                   onChange={(option) =>
//                     handleFilterChange("preferredIndustry", option || [])
//                   }
//                   getOptionLabel={(option) => option.label}
//                   getOptionValue={(option) => option.value}
//                   styles={{
//                     control: (base) => ({
//                       ...base,
//                       minHeight: "42px",
//                       borderColor: "#d1d5db",
//                       backgroundColor: !aiMatcherFilters.industryEnabled
//                         ? "#f3f4f6"
//                         : "white",
//                     }),
//                     menu: (base) => ({
//                       ...base,
//                       zIndex: 9999,
//                     }),
//                   }}
//                   components={{
//                     DropdownIndicator: () => null,
//                     IndicatorSeparator: () => null,
//                   }}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   <input
//                     type="checkbox"
//                     checked={aiMatcherFilters.functionEnabled}
//                     onChange={(e) =>
//                       handleFilterChange("functionEnabled", e.target.checked)
//                     }
//                     className="mr-2"
//                   />
//                   Preferred Function
//                 </label>

//                 <AsyncSelect
//                   isMulti
//                   cacheOptions
//                   defaultOptions={allFunctionsCache}
//                   loadOptions={debouncedLoadFunctionOptions}
//                   isSearchable
//                   isClearable
//                   isDisabled={!aiMatcherFilters.functionEnabled}
//                   placeholder="Select or search functions..."
//                   value={aiMatcherFilters.preferredFunction}
//                   onChange={(option) =>
//                     handleFilterChange("preferredFunction", option || [])
//                   }
//                   getOptionLabel={(option) => option.label}
//                   getOptionValue={(option) => option.value}
//                   styles={{
//                     control: (base) => ({
//                       ...base,
//                       minHeight: "42px",
//                       borderColor: "#d1d5db",
//                       backgroundColor: !aiMatcherFilters.functionEnabled
//                         ? "#f3f4f6"
//                         : "white",
//                     }),
//                     menu: (base) => ({
//                       ...base,
//                       zIndex: 9999,
//                     }),
//                   }}
//                   components={{
//                     DropdownIndicator: () => null,
//                     IndicatorSeparator: () => null,
//                   }}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   CTC Range (Please put 3000000, not 30LPA)
//                 </label>
//                 <div className="flex gap-2">
//                   <input
//                     type="number"
//                     value={aiMatcherFilters.ctcRange.min}
//                     onChange={(e) =>
//                       handleRangeChange("ctcRange", "min", e.target.value)
//                     }
//                     className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//                     placeholder="Min"
//                   />
//                   <input
//                     type="number"
//                     value={aiMatcherFilters.ctcRange.max}
//                     onChange={(e) =>
//                       handleRangeChange("ctcRange", "max", e.target.value)
//                     }
//                     className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//                     placeholder="Max"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Experience Range (Years)
//                 </label>
//                 <div className="flex gap-2">
//                   <input
//                     type="number"
//                     value={aiMatcherFilters.experienceRange.min}
//                     onChange={(e) =>
//                       handleRangeChange(
//                         "experienceRange",
//                         "min",
//                         e.target.value
//                       )
//                     }
//                     className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//                     placeholder="Min"
//                   />
//                   <input
//                     type="number"
//                     value={aiMatcherFilters.experienceRange.max}
//                     onChange={(e) =>
//                       handleRangeChange(
//                         "experienceRange",
//                         "max",
//                         e.target.value
//                       )
//                     }
//                     className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//                     placeholder="Max"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Keywords (comma separated)
//                 </label>
//                 <input
//                   type="text"
//                   value={aiMatcherFilters.keywords}
//                   onChange={(e) =>
//                     handleFilterChange("keywords", e.target.value)
//                   }
//                   className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//                   placeholder="React, JavaScript, Node.js"
//                 />
//               </div>
//             </div>
//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={handleApplyFilter}
//                 disabled={isApplyingFilter}
//                 className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center gap-2"
//               >
//                 {isApplyingFilter && (
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                 )}
//                 {isApplyingFilter ? "Applying..." : "Apply Filter"}
//               </button>
//               <button
//                 onClick={handleResetFilter}
//                 disabled={isApplyingFilter}
//                 className="ml-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
//               >
//                 Reset Filters
//               </button>
//             </div>
//           </div>

//           {/* Candidate Database Section */}
//           <div className="bg-white rounded-lg shadow border mb-6">
//             <div className="p-6 border-b">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-lg font-semibold text-gray-800">
//                   Candidate Database ({apiTotalCandidates} total)
//                 </h2>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleWhatsAppShare("selected")}
//                     disabled={selectedCandidates.length === 0}
//                     className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-300 text-sm"
//                   >
//                     WhatsApp Selected ({selectedCandidates.length})
//                   </button>
//                   <button
//                     onClick={() => handleWhatsAppShare("")}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
//                   >
//                     WhatsApp All
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {isLoadingPage && (
//               <div className="flex items-center justify-center py-12 bg-gray-50">
//                 <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
//                 <span className="ml-3 text-gray-600">
//                   Loading candidates...
//                 </span>
//               </div>
//             )}

//             {!isLoadingPage && (
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-4 py-3 text-left">
//                         <input
//                           type="checkbox"
//                           checked={
//                             selectedCandidates.length ===
//                               currentCandidates.length &&
//                             currentCandidates.length > 0
//                           }
//                           onChange={handleSelectAll}
//                           className="rounded"
//                         />
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Name
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Email
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Phone
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Current CTC
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Current Org
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Skills
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Resume
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {currentCandidates.map((candidate) => (
//                       <tr key={candidate.id} className="hover:bg-gray-50">
//                         <td className="px-4 py-4">
//                           <input
//                             type="checkbox"
//                             checked={selectedCandidates.includes(candidate.id)}
//                             onChange={() => handleSelectCandidate(candidate.id)}
//                             className="rounded"
//                           />
//                         </td>
//                         <td className="px-4 py-4">
//                           <div className="text-sm font-medium text-gray-900">
//                             {candidate.name}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {candidate.designation}
//                           </div>
//                         </td>
//                         <td className="px-4 py-4">
//                           <div className="text-sm text-gray-900">
//                             {candidate.email}
//                           </div>
//                         </td>
//                         <td className="px-4 py-4">
//                           <div className="text-sm text-gray-900">
//                             {candidate.phone}
//                           </div>
//                         </td>
//                         <td className="px-4 py-4">
//                           <div className="text-sm text-gray-900">
//                             {candidate.currentCtc}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             Exp: {candidate.experience}y
//                           </div>
//                         </td>
//                         <td className="px-4 py-4">
//                           <div className="text-sm text-gray-900">
//                             {candidate.currentOrg}
//                           </div>
//                         </td>
//                         <td className="px-4 py-4">
//                           <div className="text-sm text-gray-900 max-w-xs truncate">
//                             {candidate.skills}
//                           </div>
//                         </td>
//                         <td className="px-4 py-4">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation(); // ⛔ prevent row click
//                               window.open(candidate.resume || "N/A", "_blank"); // 📄 open resume
//                             }}
//                             className="text-blue-600 hover:text-blue-900 flex items-center"
//                           >
//                             <ExternalLink className="w-4 h-4 mr-1" />
//                             View
//                           </button>
//                         </td>
//                         <td className="px-4 py-4">
//                           <div className="flex items-center gap-2">
//                             <button
//                               onClick={() => openTagConfirm(candidate)}
//                               className="px-3 py-1 rounded text-xs bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
//                             >
//                               Tag to Position
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             {/* Pagination */}
//             <div className="px-6 py-3 border-t flex items-center justify-between">
//               <div className="text-sm text-gray-500">
//                 {apiTotalCandidates ? (
//                   <>
//                     Showing {startIndex + 1} to{" "}
//                     {Math.min(
//                       startIndex + candidatesPerPage,
//                       apiTotalCandidates
//                     )}{" "}
//                     of {apiTotalCandidates} candidates
//                   </>
//                 ) : (
//                   <>
//                     Showing {startIndex + 1} to{" "}
//                     {Math.min(
//                       startIndex + candidatesPerPage,
//                       allCandidates.length
//                     )}{" "}
//                     of {allCandidates.length} candidates
//                   </>
//                 )}
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={async () => {
//                     const next = Math.max(currentPage - 1, 1);
//                     if (apiTotalPages) {
//                       await fetchCandidatesPage(next);
//                     } else {
//                       setCurrentPage(next);
//                     }
//                   }}
//                   disabled={currentPage === 1 || isLoadingPage}
//                   className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 hover:bg-gray-50 disabled:cursor-not-allowed flex items-center gap-1"
//                 >
//                   Previous
//                 </button>
//                 <span className="px-3 py-1 text-sm bg-blue-50 border rounded">
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                   onClick={async () => {
//                     const next = Math.min(currentPage + 1, totalPages);
//                     if (apiTotalPages) {
//                       await fetchCandidatesPage(next);
//                     } else {
//                       setCurrentPage(next);
//                     }
//                   }}
//                   disabled={currentPage === totalPages || isLoadingPage}
//                   className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 hover:bg-gray-50 disabled:cursor-not-allowed flex items-center gap-1"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* AI Matching Section */}
//           <div className="bg-white rounded-lg shadow border p-6 mb-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">
//               AI Matching
//             </h2>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 AI Prompt for Advanced Matching
//               </label>
//               <textarea
//                 value={aiPrompt}
//                 onChange={(e) => setAiPrompt(e.target.value)}
//                 rows={3}
//                 className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter specific requirements or criteria for AI matching..."
//                 disabled={isGeneratingAiScore}
//               />
//             </div>

//             {isGeneratingAiScore && aiProgress.total > 0 && (
//               <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm font-medium text-purple-900">
//                     Processing Candidates...
//                   </span>
//                   <span className="text-sm text-purple-700">
//                     {aiProgress.current} / {aiProgress.total}
//                   </span>
//                 </div>
//                 <div className="w-full bg-purple-200 rounded-full h-2.5">
//                   <div
//                     className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
//                     style={{ width: `${aiProgress.percentage}%` }}
//                   ></div>
//                 </div>
//                 <p className="text-xs text-purple-600 mt-2">
//                   {aiProgress.percentage}% complete - This may take a few
//                   moments
//                 </p>
//               </div>
//             )}

//             <button
//               onClick={handleRunAiMatcher}
//               disabled={isGeneratingAiScore}
//               className={`bg-purple-600 text-white px-6 py-2 rounded-md 
//                 hover:bg-purple-700 flex items-center gap-2
//                 ${isGeneratingAiScore ? "opacity-70 cursor-not-allowed" : ""}`}
//             >
//               {isGeneratingAiScore ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   Running AI Matcher...
//                 </>
//               ) : (
//                 <>
//                   <Search className="w-4 h-4" />
//                   Run AI Matcher
//                 </>
//               )}
//             </button>
//           </div>

//           {/* AI Results Section */}
//           {showAiResults && (
//             <div className="bg-white rounded-lg shadow border">
//               <div className="p-6 border-b">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h2 className="text-lg font-semibold text-gray-800">
//                       AI Matching Results - Top 15 Candidates
//                     </h2>
//                     <p className="text-sm text-gray-600">
//                       Candidates ranked by AI score in descending order
//                     </p>
//                   </div>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleWhatsAppShareAi("selected")}
//                       disabled={selectedAiCandidates.length === 0}
//                       className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-300 text-sm"
//                     >
//                       WhatsApp Selected ({selectedAiCandidates.length})
//                     </button>
//                     <button
//                       onClick={() => handleWhatsAppShareAi("all")}
//                       className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
//                     >
//                       WhatsApp All
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-4 py-3 text-left">
//                         <input
//                           type="checkbox"
//                           checked={
//                             selectedAiCandidates.length === aiResults.length &&
//                             aiResults.length > 0
//                           }
//                           onChange={handleSelectAllAi}
//                           className="rounded"
//                         />
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Rank
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Candidate Name
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Email
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         AI Score
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Keyword Matches
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Current CTC
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Resume
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {aiResults.map((candidate, index) => (
//                       <tr key={candidate.id} className="hover:bg-gray-50">
//                         <td className="px-4 py-4">
//                           <input
//                             type="checkbox"
//                             checked={selectedAiCandidates.includes(
//                               candidate.id
//                             )}
//                             onChange={() =>
//                               handleSelectAiCandidate(candidate.id)
//                             }
//                             className="rounded"
//                           />
//                         </td>
//                         <td className="px-4 py-4">
//                           <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
//                             {index + 1}
//                           </span>
//                         </td>
//                         <td className="px-4 py-4">
//                           <div className="text-sm font-medium text-gray-900">
//                             {candidate.name}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {candidate.designation}
//                           </div>
//                         </td>
//                         <td className="px-4 py-4">
//                           <div className="text-sm text-gray-900">
//                             {candidate.email}
//                           </div>
//                         </td>
//                         <td className="px-4 py-4">
//                           <span
//                             className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                               candidate.aiScore >= 80
//                                 ? "bg-green-100 text-green-800"
//                                 : candidate.aiScore >= 60
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-red-100 text-red-800"
//                             }`}
//                           >
//                             {candidate.aiScore}%
//                           </span>
//                         </td>
//                         <td className="px-4 py-4">
//                           <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
//                             {candidate.keywordMatches || 0} matches
//                           </span>
//                         </td>
//                         <td className="px-4 py-4">
//                           <div className="text-sm text-gray-900">
//                             {candidate.currentCtc}
//                           </div>
//                         </td>
//                         <td className="px-4 py-4">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation(); // ⛔ prevent row click
//                               window.open(candidate.resume || "N/A", "_blank"); // 📄 open resume
//                             }}
//                             className="text-blue-600 hover:text-blue-900 flex items-center"
//                           >
//                             <ExternalLink className="w-4 h-4 mr-1" />
//                             View
//                           </button>
//                         </td>
//                         <td className="px-4 py-4">
//                           <div className="flex items-center gap-2">
//                             <button
//                               onClick={() => openTagConfirm(candidate)}
//                               className="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700"
//                             >
//                               Tag to Position
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* Tagged Candidates Summary */}
//           {taggedCandidates.length > 0 && (
//             <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
//               <h3 className="text-lg font-medium text-green-800 mb-2">
//                 Recently Tagged Candidates
//               </h3>
//               <div className="space-y-2">
//                 {taggedCandidates.map((tagged, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-between items-center bg-white p-3 rounded border"
//                   >
//                     <div>
//                       <span className="font-medium text-gray-900">
//                         {tagged.candidateName}
//                       </span>
//                       <span className="mx-2 text-gray-500">→</span>
//                       <span className="text-blue-600">
//                         {tagged.positionName}
//                       </span>
//                       <span className="mx-2 text-gray-500">at</span>
//                       <span className="text-gray-700">{tagged.clientName}</span>
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       Tagged on {tagged.taggedDate}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {showTagConfirm && (
//             <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//               <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   Confirm Tag
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-6">
//                   Are you sure you want to tag{" "}
//                   <span className="font-medium">{candidateToTag?.name}</span> to
//                   this position?
//                 </p>

//                 <div className="flex justify-end gap-3">
//                   <button
//                     onClick={() => {
//                       setShowTagConfirm(false);
//                       setCandidateToTag(null);
//                     }}
//                     className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={confirmTagCandidate}
//                     className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
//                   >
//                     Yes, Tag Candidate
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AiResumeMatcher;



import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  ExternalLink,
  Loader2,
  SlidersHorizontal,
  Users,
  Sparkles,
  MessageCircle,
  RotateCcw,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Tag,
  X,
} from "lucide-react";
import Header from "../components/Header";
import { resumeMatcherService } from "../services/resumeMatcherService";
import AsyncSelect from "react-select/async";
import { v4 as uuidv4 } from "uuid";
import { positionService } from "../services/positionService";

/* ================================================================== */
/* UI-only styling (no logic)                                          */
/* ================================================================== */

const inputClass =
  "w-full h-10 px-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500";

const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

const thClass =
  "px-4 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider";

const selectStyles = (disabled = false) => ({
  control: (base, state) => ({
    ...base,
    minHeight: "40px",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    backgroundColor: disabled ? "#f3f4f6" : "white",
    borderColor: state.isFocused ? "#14b8a6" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(20, 184, 166, 0.3)" : "none",
    "&:hover": { borderColor: "#14b8a6" },
  }),
  placeholder: (base) => ({ ...base, color: "#9ca3af" }),
  menu: (base) => ({ ...base, zIndex: 9999, fontSize: "0.875rem" }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#0d9488" : state.isFocused ? "#f0fdfa" : "white",
    color: state.isSelected ? "white" : "#374151",
    "&:active": { backgroundColor: "#ccfbf1" },
  }),
  multiValue: (base) => ({ ...base, backgroundColor: "#f0fdfa", borderRadius: "9999px" }),
  multiValueLabel: (base) => ({ ...base, color: "#0f766e", fontWeight: 500, paddingLeft: 8 }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#0f766e",
    borderRadius: "9999px",
    "&:hover": { backgroundColor: "#ccfbf1", color: "#115e59" },
  }),
});

/** Numbered card header used for each step of the flow */
const StepHeader = ({ step, icon: Icon, title, subtitle, right = null }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 md:px-6 py-4 border-b border-gray-100">
    <div className="flex items-center gap-3 min-w-0">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-600 ring-1 ring-inset ring-teal-100">
        <Icon className="w-4 h-4" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Step {step}</p>
        <h2 className="text-base font-semibold text-gray-900 leading-tight">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
    {right}
  </div>
);

const AiResumeMatcher = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedAiCandidates, setSelectedAiCandidates] = useState([]);
  const [taggedCandidates, setTaggedCandidates] = useState([]);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResults, setAiResults] = useState([]);
  const [aiCandidateSnapshot, setAiCandidateSnapshot] = useState([]);
  const [showAiResults, setShowAiResults] = useState(false);

  // Loading states
  const [isApplyingFilter, setIsApplyingFilter] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isRemovingCandidate, setIsRemovingCandidate] = useState(null);
  const [isGeneratingAiScore, setIsGeneratingAiScore] = useState(false);
  const [showTagConfirm, setShowTagConfirm] = useState(false);
  const [candidateToTag, setCandidateToTag] = useState(null);
  const [aiProgress, setAiProgress] = useState({
    current: 0,
    total: 0,
    percentage: 0,
  });

  const [allIndustriesCache, setAllIndustriesCache] = useState([]);
  const [allFunctionsCache, setAllFunctionsCache] = useState([]);

  const defaultAiMatcherFilters = {
    positionName: "",
    preferredIndustry: [],
    preferredFunction: [],
    preferredRole: "",
    ctcRange: { min: "", max: "" },
    experienceRange: { min: "", max: "" },
    keywords: "",
    industryEnabled: true,
    functionEnabled: true,
    roleEnabled: true,
  };
  const userEmail = localStorage.getItem("email") || "";
  const [aiMatcherFilters, setAiMatcherFilters] = useState(
    defaultAiMatcherFilters
  );

  // Sample candidate data
  // const initialCandidates = [

  // ];

  const [allCandidates, setAllCandidates] = useState([]);

  const [candidatesPerPage, setCandidatesPerPage] = useState(10);
  const [apiTotalPages, setApiTotalPages] = useState(null);
  const [apiTotalCandidates, setApiTotalCandidates] = useState(null);
  const [lastFilters, setLastFilters] = useState(null);

  const totalPages =
    apiTotalPages ?? Math.ceil(allCandidates.length / candidatesPerPage);
  const startIndex = (currentPage - 1) * candidatesPerPage;
  const currentCandidates = apiTotalPages
    ? allCandidates
    : allCandidates.slice(startIndex, startIndex + candidatesPerPage);

  useEffect(() => {
    loadAllIndustriesOnMount();
    loadAllFunctionsOnMount();
  }, []);

  const loadAllIndustriesOnMount = async () => {
    try {
      console.log("Fetching all industries...");
      const res = await resumeMatcherService.searchIndustries("");
      console.log("Industries response:", res);
      const options = (res?.data || []).map((ind) => ({
        value: ind.id,
        label: ind.name,
      }));
      console.log("Cached industries options:", options);
      setAllIndustriesCache(options);
    } catch (err) {
      console.error("Failed to load industries:", err);
    }
  };

  const loadAllFunctionsOnMount = async () => {
    try {
      console.log("Fetching all functions...");
      const res = await resumeMatcherService.searchFunctions("");
      console.log("Functions response:", res);
      const options = (res?.data || []).map((fn) => ({
        value: fn.id,
        label: fn.name,
      }));
      console.log("Cached functions options:", options);
      setAllFunctionsCache(options);
    } catch (err) {
      console.error("Failed to load functions:", err);
    }
  };

  const handleFilterChange = (field, value) => {
    setAiMatcherFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRangeChange = (field, type, value) => {
    setAiMatcherFilters((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [type]: value,
      },
    }));
  };

  const handleRunAiMatcher = async () => {
    const selectedJobId = aiMatcherFilters.positionName?.value;

    if (selectedCandidates.length === 0) {
      alert("Please select at least one candidate to run AI matcher");
      return;
    }

    if (!aiPrompt.trim()) {
      alert("Please enter an AI prompt for matching criteria");
      return;
    }

    setIsGeneratingAiScore(true);
    setAiProgress({ current: 0, total: 0, percentage: 0 });

    try {
      const batchId = uuidv4();

      const payload = {
        batchId,
        jobId: selectedJobId,
        candidateIds: selectedCandidates,
        prompt: aiPrompt.trim(),
      };

      console.log("📤 Sending AI Matcher request:", payload);

      const response = await resumeMatcherService.runAiMatcher(payload);

      if (!response?.data?.batchId) {
        throw new Error("Failed to start AI matching process");
      }

      const returnedBatchId = response.data.batchId;
      const totalCandidates = response.data.totalCandidates;

      setAiProgress({ current: 0, total: totalCandidates, percentage: 0 });

      const pollInterval = 2000;
      const maxAttempts = 60;
      let attempts = 0;

      const poll = async () => {
        attempts++;

        const statusResponse = await resumeMatcherService.pollAiMatcherStatus(
          returnedBatchId
        );
        const { status, progress, completedCandidates } = statusResponse.data;

        setAiProgress({
          current: completedCandidates || 0,
          total: totalCandidates,
          percentage: progress || 0,
        });

        console.log(
          `⏳ Progress: ${progress}% (${completedCandidates}/${totalCandidates})`
        );

        if (status === "COMPLETED") {
          const resultsResponse =
            await resumeMatcherService.getAiMatcherResults(returnedBatchId);

          console.log("✅ AI Matcher results:", resultsResponse);

          const candidates = resultsResponse?.data?.candidates || [];

          console.log("📊 Candidates from backend:", candidates);

          if (candidates.length === 0) {
            alert("No candidates matched the AI criteria");
            setAiResults([]);
            setShowAiResults(false);
            setIsGeneratingAiScore(false);
            setAiProgress({ current: 0, total: 0, percentage: 0 });
            return;
          }

          const sortedCandidates = [...candidates].sort(
            (a, b) => b.aiScore - a.aiScore
          );

          console.log("🎯 FINAL AI RESULTS:", sortedCandidates);

          setAiResults(sortedCandidates);
          setShowAiResults(true);
          setIsGeneratingAiScore(false);
          setAiProgress({ current: 0, total: 0, percentage: 0 });

          alert(
            `AI matching completed! ${sortedCandidates.length} candidates ranked`
          );
          return;
        }

        if (status === "FAILED") {
          throw new Error("AI matching process failed");
        }

        if (attempts >= maxAttempts) {
          throw new Error("AI matching process timed out");
        }

        setTimeout(poll, pollInterval);
      };

      await poll();
    } catch (error) {
      console.error("❌ AI Matcher error:", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to run AI matcher"
      );
      setIsGeneratingAiScore(false);
      setAiProgress({ current: 0, total: 0, percentage: 0 });
    }
  };

  const functionSearchTimeout = useRef(null);

  const debouncedLoadFunctionOptions = (inputValue, callback) => {
    if (functionSearchTimeout.current)
      clearTimeout(functionSearchTimeout.current);

    // If no input, return all cached functions
    if (!inputValue || inputValue.trim().length === 0) {
      callback(allFunctionsCache);
      return;
    }

    // If input is less than 2 chars, still search but with debounce
    if (inputValue.trim().length < 2) {
      callback(allFunctionsCache);
      return;
    }

    functionSearchTimeout.current = setTimeout(async () => {
      getAllFunctions(inputValue, callback);
    }, 300);
  };

  const getAllFunctions = async (inputValue, callback) => {
    try {
      const res = await resumeMatcherService.searchFunctions(inputValue.trim());

      const options = (res?.data || []).map((fn) => ({
        value: fn.id,
        label: fn.name,
      }));

      callback(options);
    } catch (err) {
      console.error("Function autocomplete error:", err);
      callback([]);
    }
  };

  const industrySearchTimeout = useRef(null);

  const debouncedLoadIndustryOptions = (inputValue, callback) => {
    if (industrySearchTimeout.current)
      clearTimeout(industrySearchTimeout.current);

    // If no input, return all cached industries
    if (!inputValue || inputValue.trim().length === 0) {
      callback(allIndustriesCache);
      return;
    }

    // If input is less than 2 chars, still search but with debounce
    if (inputValue.trim().length < 2) {
      callback(allIndustriesCache);
      return;
    }

    industrySearchTimeout.current = setTimeout(async () => {
      getAllIndustries(inputValue, callback);
    }, 300);
  };

  const getAllIndustries = async (inputValue, callback) => {
    try {
      const res = await resumeMatcherService.searchIndustries(
        inputValue.trim()
      );

      const options = (res?.data || []).map((ind) => ({
        value: ind.id,
        label: ind.name,
      }));

      callback(options);
    } catch (err) {
      console.error("Industry autocomplete error:", err);
      callback([]);
    }
  };

  const searchTimeout = useRef(null);

  const debouncedLoadPositionOptions = (inputValue, callback) => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (!inputValue || inputValue.trim().length < 2) {
      callback([]);
      return;
    }

    searchTimeout.current = setTimeout(async () => {
      try {
        const res = await resumeMatcherService.searchPositions(
          inputValue.trim()
        );

        const options = (res?.data || []).map((pos) => ({
          value: pos.id,
          label: `${pos.position} (${pos.clientName})`,
          position: pos.position,
          clientName: pos.clientName,
        }));

        callback(options);
      } catch (err) {
        console.error("Position autocomplete error:", err);
        callback([]);
      }
    }, 300);
  };

  const handleApplyFilter = async () => {
    setIsApplyingFilter(true);

    const filters = {
      positionName: aiMatcherFilters.positionName?.position,
      preferredIndustry:
        aiMatcherFilters.preferredIndustry?.length > 0
          ? aiMatcherFilters.preferredIndustry.map((ind) => ind.label)
          : undefined,
      preferredFunction:
        aiMatcherFilters.preferredFunction?.length > 0
          ? aiMatcherFilters.preferredFunction.map((fn) => fn.label)
          : undefined,
      ctcRange: {
        min: aiMatcherFilters.ctcRange.min
          ? Number(aiMatcherFilters.ctcRange.min)
          : undefined,
        max: aiMatcherFilters.ctcRange.max
          ? Number(aiMatcherFilters.ctcRange.max)
          : undefined,
      },
      experienceRange: {
        min: aiMatcherFilters.experienceRange.min
          ? Number(aiMatcherFilters.experienceRange.min)
          : undefined,
        max: aiMatcherFilters.experienceRange.max
          ? Number(aiMatcherFilters.experienceRange.max)
          : undefined,
      },
      keywords: aiMatcherFilters.keywords || undefined,
      page: 1,
      limit: 25,
      industryEnabled: !!aiMatcherFilters.industryEnabled,
      functionEnabled: !!aiMatcherFilters.functionEnabled,
    };

    try {
      setLastFilters(filters);
      const res = await resumeMatcherService.filterCandidates(filters);
      const returned = res?.data?.candidates || [];
      console.log("Filter API returned candidates:", returned);
      const mapped = returned.map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        currentCtc: c.currentCtc || "",
        currentOrg: c.currentOrg || "",
        designation: c.designation || "",
        experience: c.workExperience || 0,
        skills: c.skills || "",
        resume: c.resume || "",
      }));

      setAllCandidates(mapped);
      const pagination = res?.data?.pagination;
      if (pagination) {
        setApiTotalPages(pagination.totalPages ?? null);
        setCandidatesPerPage(pagination.limit ?? candidatesPerPage);
        setApiTotalCandidates(res?.data?.totalCandidates ?? null);
        setCurrentPage(pagination.page ?? 1);
      } else {
        setApiTotalPages(null);
        setApiTotalCandidates(null);
        setCurrentPage(1);
      }
    } catch (err) {
      console.error("Filter API error", err);
      alert("Failed to apply filters. Please try again.");
    } finally {
      setIsApplyingFilter(false);
    }
  };

  const fetchCandidatesPage = async (page) => {
    if (!lastFilters) return;

    setIsLoadingPage(true);
    const filters = { ...lastFilters, page };

    try {
      const res = await resumeMatcherService.filterCandidates(filters);
      const returned = res?.data?.candidates || [];
      const mapped = returned.map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        currentCtc: c.currentCtc || "",
        currentOrg: c.currentOrg || "",
        designation: c.designation || "",
        experience: c.experience || 0,
        skills: c.skills || "",
        resume: c.resume || "",
      }));

      setAllCandidates(mapped);
      const pagination = res?.data?.pagination;
      if (pagination) {
        setApiTotalPages(pagination.totalPages ?? null);
        setCandidatesPerPage(pagination.limit ?? candidatesPerPage);
        setApiTotalCandidates(res?.data?.totalCandidates ?? null);
        setCurrentPage(pagination.page ?? page);
      } else {
        setApiTotalPages(null);
        setApiTotalCandidates(null);
        setCurrentPage(page);
      }
    } catch (err) {
      console.error("Fetch page error", err);
      alert("Failed to fetch page. Please try again.");
    } finally {
      setIsLoadingPage(false);
    }
  };

  const handleResetFilter = () => {
    setAiMatcherFilters(defaultAiMatcherFilters);
    setAllCandidates(initialCandidates);
    setAiResults([]);
    setShowAiResults(false);
    setSelectedCandidates([]);
    setSelectedAiCandidates([]);
    setCurrentPage(1);
  };

  const handleRemoveCandidate = async (candidateId) => {
    if (!confirm("Are you sure you want to remove this candidate?")) return;

    setIsRemovingCandidate(candidateId);

    try {
      await resumeMatcherService.removeCandidate(candidateId);
      setAllCandidates((prev) => prev.filter((c) => c.id !== candidateId));
      setAiResults((prev) => prev.filter((c) => c.id !== candidateId));
      setSelectedCandidates((prev) => prev.filter((id) => id !== candidateId));
      setSelectedAiCandidates((prev) =>
        prev.filter((id) => id !== candidateId)
      );
      alert("Candidate removed");
    } catch (err) {
      console.error("Remove candidate error", err);
      alert("Failed to remove candidate. Please try again.");
    } finally {
      setIsRemovingCandidate(null);
    }
  };

  const handleSelectCandidate = (candidateId) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAiCandidate = (candidateId) => {
    setSelectedAiCandidates((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAllAi = () => {
    if (selectedAiCandidates.length === aiResults.length) {
      setSelectedAiCandidates([]);
    } else {
      setSelectedAiCandidates(aiResults.map((c) => c.id));
    }
  };

  const openTagConfirm = (candidate) => {
    setCandidateToTag(candidate);
    setShowTagConfirm(true);
  };

  const confirmTagCandidate = async () => {
    if (!candidateToTag || !aiMatcherFilters.positionName?.value) {
      alert("Position not selected");
      return;
    }

    if (!userEmail) {
      alert("Recruiter email not found");
      return;
    }

    try {
      const payload = {
        candidateId: candidateToTag.id,
        recruiterEmail: userEmail,
        immediateJoiner: false,
        status: "Submitted",
      };

      await positionService.tagCandidateToPosition(
        aiMatcherFilters.positionName.value,
        payload
      );

      alert("Candidate tagged successfully");

      setTaggedCandidates((prev) => [
        ...prev,
        {
          candidateName: candidateToTag.name,
          positionName: aiMatcherFilters.positionName.label,
          clientName: "TechCorp Solutions",
          taggedDate: new Date().toLocaleDateString(),
        },
      ]);
    } catch (err) {
      console.error("Tag error", err);
      alert(err?.response?.data?.message || "Failed to tag candidate");
    } finally {
      setShowTagConfirm(false);
      setCandidateToTag(null);
    }
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === currentCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(currentCandidates.map((c) => c.id));
    }
  };

  const handleWhatsAppShare = async (type) => {
    const selected =
      type === "all"
        ? currentCandidates
        : currentCandidates.filter((c) => selectedCandidates.includes(c.id));

    if (selected.length === 0) {
      alert("Please select candidates to send WhatsApp message");
      return;
    }

    const payload = {
      type,
      positionId: aiMatcherFilters.positionName?.value,
      positionName: aiMatcherFilters.positionName?.label,
      candidates: selected.map((c) => ({
        id: c.id,
        name: c.name,
        phone: c.phone,
        email: c.email,
      })),
    };

    try {
      await resumeMatcherService.sendWhatsApp(payload);
      alert("WhatsApp request sent successfully");

      // 🔄 Reset selections & UI
      setSelectedCandidates([]);
      setSelectedAiCandidates([]);
      setShowAiResults(false);
      setAiResults([]);
      setCurrentPage(1);
    } catch (err) {
      console.error("WhatsApp error", err);
      alert("Failed to send WhatsApp message");
    }
  };

  const handleWhatsAppShareAi = async (type) => {
    const selected =
      type === "all"
        ? aiResults
        : aiResults.filter((c) => selectedAiCandidates.includes(c.id));

    if (selected.length === 0) {
      alert("Please select candidates to send WhatsApp message");
      return;
    }

    const payload = {
      type,
      positionId: aiMatcherFilters.positionName?.value,
      positionName: aiMatcherFilters.positionName?.label,
      candidates: selected.map((c) => ({
        id: c.id,
        name: c.name,
        phone: c.phone,
        email: c.email,
      })),
    };

    try {
      await resumeMatcherService.sendWhatsApp(payload);
      alert("WhatsApp request sent successfully");

      // Reset AI selections & UI (same behavior)
      setSelectedAiCandidates([]);
      setShowAiResults(false);
      setAiResults([]);
    } catch (err) {
      console.error("WhatsApp error", err);
      alert("Failed to send WhatsApp message");
    }
  };

  /* ================================================================ */
  /* Render (UI only)                                                  */
  /* ================================================================ */

  const scoreTone = (score) =>
    score >= 80
      ? { pill: "bg-emerald-50 text-emerald-700 ring-emerald-200", bar: "bg-emerald-500" }
      : score >= 60
      ? { pill: "bg-amber-50 text-amber-700 ring-amber-200", bar: "bg-amber-500" }
      : { pill: "bg-red-50 text-red-700 ring-red-200", bar: "bg-red-500" };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="md:ml-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
            {/* ─── Page title ─── */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-teal-600" />
                  AI Resume Matcher
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Filter your candidate database, pick the people you want, then let AI rank them for the position.
                </p>
              </div>
              {aiMatcherFilters.positionName?.label && (
                <span className="inline-flex max-w-full items-center gap-1.5 self-start sm:self-auto rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 ring-1 ring-inset ring-teal-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                  <span className="truncate">{aiMatcherFilters.positionName.label}</span>
                </span>
              )}
            </div>

            {/* ─── Step 1: Filters ─── */}
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <StepHeader
                step={1}
                icon={SlidersHorizontal}
                title="Position & filters"
                subtitle="Choose the position and narrow down the candidate pool."
              />

              <div className="p-5 md:p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5">
                  <div>
                    <label className={labelClass}>Position Name</label>
                    <AsyncSelect
                      cacheOptions
                      loadOptions={debouncedLoadPositionOptions}
                      isSearchable
                      isClearable
                      placeholder="Type to search position..."
                      noOptionsMessage={({ inputValue }) =>
                        !inputValue ? "Type at least 2 characters..." : "No positions found"
                      }
                      loadingMessage={() => "Searching positions..."}
                      value={aiMatcherFilters.positionName}
                      onChange={(option) => handleFilterChange("positionName", option)}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      styles={selectStyles()}
                      components={{ IndicatorSeparator: () => null }}
                    />
                    <p className="text-xs text-gray-400 mt-1.5">
                      Start typing at least 2 characters to search positions
                    </p>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={aiMatcherFilters.industryEnabled}
                        onChange={(e) => handleFilterChange("industryEnabled", e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 accent-teal-600"
                      />
                      Preferred Industry
                    </label>
                    <AsyncSelect
                      isMulti
                      cacheOptions
                      defaultOptions={allIndustriesCache}
                      loadOptions={debouncedLoadIndustryOptions}
                      isSearchable
                      isClearable
                      isDisabled={!aiMatcherFilters.industryEnabled}
                      placeholder="Select or search industries..."
                      value={aiMatcherFilters.preferredIndustry}
                      onChange={(option) => handleFilterChange("preferredIndustry", option || [])}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      styles={selectStyles(!aiMatcherFilters.industryEnabled)}
                      components={{ IndicatorSeparator: () => null }}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={aiMatcherFilters.functionEnabled}
                        onChange={(e) => handleFilterChange("functionEnabled", e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 accent-teal-600"
                      />
                      Preferred Function
                    </label>
                    <AsyncSelect
                      isMulti
                      cacheOptions
                      defaultOptions={allFunctionsCache}
                      loadOptions={debouncedLoadFunctionOptions}
                      isSearchable
                      isClearable
                      isDisabled={!aiMatcherFilters.functionEnabled}
                      placeholder="Select or search functions..."
                      value={aiMatcherFilters.preferredFunction}
                      onChange={(option) => handleFilterChange("preferredFunction", option || [])}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      styles={selectStyles(!aiMatcherFilters.functionEnabled)}
                      components={{ IndicatorSeparator: () => null }}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      CTC Range <span className="font-normal text-gray-400">(Please put 3000000, not 30LPA)</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={aiMatcherFilters.ctcRange.min}
                        onChange={(e) => handleRangeChange("ctcRange", "min", e.target.value)}
                        className={`${inputClass} no-spinner`}
                        placeholder="Min"
                      />
                      <span className="text-gray-300">–</span>
                      <input
                        type="number"
                        value={aiMatcherFilters.ctcRange.max}
                        onChange={(e) => handleRangeChange("ctcRange", "max", e.target.value)}
                        className={`${inputClass} no-spinner`}
                        placeholder="Max"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Experience Range <span className="font-normal text-gray-400">(Years)</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={aiMatcherFilters.experienceRange.min}
                        onChange={(e) => handleRangeChange("experienceRange", "min", e.target.value)}
                        className={`${inputClass} no-spinner`}
                        placeholder="Min"
                      />
                      <span className="text-gray-300">–</span>
                      <input
                        type="number"
                        value={aiMatcherFilters.experienceRange.max}
                        onChange={(e) => handleRangeChange("experienceRange", "max", e.target.value)}
                        className={`${inputClass} no-spinner`}
                        placeholder="Max"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Keywords <span className="font-normal text-gray-400">(comma separated)</span>
                    </label>
                    <input
                      type="text"
                      value={aiMatcherFilters.keywords}
                      onChange={(e) => handleFilterChange("keywords", e.target.value)}
                      className={inputClass}
                      placeholder="React, JavaScript, Node.js"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 px-5 md:px-6 py-4 border-t border-gray-100 bg-gray-50/60 rounded-b-2xl">
                <button
                  onClick={handleResetFilter}
                  disabled={isApplyingFilter}
                  className="h-10 inline-flex items-center gap-2 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Filters
                </button>
                <button
                  onClick={handleApplyFilter}
                  disabled={isApplyingFilter}
                  className="h-10 inline-flex items-center gap-2 px-5 text-sm font-medium text-white bg-teal-600 rounded-lg shadow-sm hover:bg-teal-700 disabled:bg-teal-300 disabled:cursor-not-allowed"
                >
                  {isApplyingFilter ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  {isApplyingFilter ? "Applying..." : "Apply Filter"}
                </button>
              </div>
            </section>

            {/* ─── Step 2: Candidate database ─── */}
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <StepHeader
                step={2}
                icon={Users}
                title={
                  <span className="flex items-center gap-2">
                    Candidate Database
                    {apiTotalCandidates != null && (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
                        {apiTotalCandidates} total
                      </span>
                    )}
                  </span>
                }
                subtitle="Tick the candidates you want the AI to score."
                right={
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleWhatsAppShare("selected")}
                      disabled={selectedCandidates.length === 0}
                      className="h-9 inline-flex items-center gap-1.5 px-3.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp Selected ({selectedCandidates.length})
                    </button>
                    <button
                      onClick={() => handleWhatsAppShare("")}
                      className="h-9 inline-flex items-center gap-1.5 px-3.5 text-sm font-medium text-green-700 bg-white border border-green-200 rounded-lg hover:bg-green-50"
                    >
                      WhatsApp All
                    </button>
                  </div>
                }
              />

              {selectedCandidates.length > 0 && (
                <div className="flex items-center gap-2 px-5 md:px-6 py-2 bg-teal-50 border-b border-teal-100 text-sm text-teal-800">
                  <CheckCircle2 className="w-4 h-4" />
                  {selectedCandidates.length} candidate{selectedCandidates.length !== 1 ? "s" : ""} selected for AI matching
                </div>
              )}

              {isLoadingPage ? (
                <div className="flex items-center justify-center gap-3 py-16 text-gray-500">
                  <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
                  <span className="text-sm">Loading candidates...</span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px] table-fixed">
                    <colgroup>
                      <col className="w-12" />
                      <col className="w-[22%]" />
                      <col className="w-[24%]" />
                      <col className="w-[12%]" />
                      <col className="w-[15%]" />
                      <col />
                      <col className="w-[190px]" />
                    </colgroup>
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={
                              selectedCandidates.length === currentCandidates.length &&
                              currentCandidates.length > 0
                            }
                            onChange={handleSelectAll}
                            className="h-4 w-4 rounded border-gray-300 accent-teal-600"
                            aria-label="Select all"
                          />
                        </th>
                        <th className={thClass}>Name</th>
                        <th className={thClass}>Contact</th>
                        <th className={thClass}>Current CTC</th>
                        <th className={thClass}>Current Org</th>
                        <th className={thClass}>Skills</th>
                        <th className={`${thClass} text-right`}>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentCandidates.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-16 text-center">
                            <Users className="w-10 h-10 mx-auto text-gray-300" strokeWidth={1.5} />
                            <p className="mt-3 text-sm font-medium text-gray-700">No candidates yet</p>
                            <p className="mt-1 text-sm text-gray-400">
                              Set your filters above and click Apply Filter.
                            </p>
                          </td>
                        </tr>
                      ) : (
                        currentCandidates.map((candidate) => {
                          const isSelected = selectedCandidates.includes(candidate.id);
                          return (
                            <tr
                              key={candidate.id}
                              className={`align-top transition-colors ${isSelected ? "bg-teal-50/40" : "hover:bg-gray-50"}`}
                            >
                              <td className="px-4 py-3.5">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handleSelectCandidate(candidate.id)}
                                  className="h-4 w-4 rounded border-gray-300 accent-teal-600"
                                  aria-label={`Select ${candidate.name}`}
                                />
                              </td>
                              <td className="px-4 py-3.5">
                                <div className="truncate text-sm font-medium text-gray-900" title={candidate.name}>
                                  {candidate.name}
                                </div>
                                <div className="truncate text-xs text-gray-500" title={candidate.designation}>
                                  {candidate.designation}
                                </div>
                              </td>
                              <td className="px-4 py-3.5">
                                <div className="flex items-center gap-1.5 text-sm text-gray-700 min-w-0" title={candidate.email}>
                                  <Mail className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                                  <span className="truncate">{candidate.email}</span>
                                </div>
                                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500">
                                  <Phone className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                                  <span className="truncate">{candidate.phone}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3.5">
                                <div className="text-sm text-gray-900">{candidate.currentCtc}</div>
                                <div className="text-xs text-gray-500">Exp: {candidate.experience}y</div>
                              </td>
                              <td className="px-4 py-3.5">
                                <div className="truncate text-sm text-gray-700" title={candidate.currentOrg}>
                                  {candidate.currentOrg}
                                </div>
                              </td>
                              <td className="px-4 py-3.5">
                                <p className="line-clamp-2 text-xs leading-5 text-gray-600" title={candidate.skills}>
                                  {candidate.skills}
                                </p>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation(); // ⛔ prevent row click
                                      window.open(candidate.resume || "N/A", "_blank"); // 📄 open resume
                                    }}
                                    className="h-8 inline-flex items-center gap-1 px-2.5 text-xs font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-teal-700"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    View
                                  </button>
                                  <button
                                    onClick={() => openTagConfirm(candidate)}
                                    className="h-8 inline-flex items-center gap-1 px-2.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-lg ring-1 ring-inset ring-teal-200 hover:bg-teal-100 whitespace-nowrap"
                                  >
                                    <Tag className="w-3.5 h-3.5" />
                                    Tag to Position
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 md:px-6 py-3 border-t border-gray-100 bg-gray-50/60">
                <div className="text-sm text-gray-500">
                  {apiTotalCandidates ? (
                    <>
                      Showing {startIndex + 1} to{" "}
                      {Math.min(startIndex + candidatesPerPage, apiTotalCandidates)} of {apiTotalCandidates} candidates
                    </>
                  ) : (
                    <>
                      Showing {startIndex + 1} to{" "}
                      {Math.min(startIndex + candidatesPerPage, allCandidates.length)} of {allCandidates.length} candidates
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => {
                      const next = Math.max(currentPage - 1, 1);
                      if (apiTotalPages) {
                        await fetchCandidatesPage(next);
                      } else {
                        setCurrentPage(next);
                      }
                    }}
                    disabled={currentPage === 1 || isLoadingPage}
                    className="h-9 inline-flex items-center gap-1 px-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <span className="px-3 text-sm font-medium text-gray-700 tabular-nums">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={async () => {
                      const next = Math.min(currentPage + 1, totalPages);
                      if (apiTotalPages) {
                        await fetchCandidatesPage(next);
                      } else {
                        setCurrentPage(next);
                      }
                    }}
                    disabled={currentPage === totalPages || isLoadingPage}
                    className="h-9 inline-flex items-center gap-1 px-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* ─── Step 3: AI matching ─── */}
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <StepHeader
                step={3}
                icon={Sparkles}
                title="AI Matching"
                subtitle="Describe what matters for this role. The AI scores each selected candidate against it."
              />

              <div className="p-5 md:p-6 space-y-4">
                <div>
                  <label className={labelClass}>AI Prompt for Advanced Matching</label>
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    rows={4}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-50 resize-y"
                    placeholder="Enter specific requirements or criteria for AI matching..."
                    disabled={isGeneratingAiScore}
                  />
                </div>

                {isGeneratingAiScore && aiProgress.total > 0 && (
                  <div className="rounded-xl border border-violet-200 bg-violet-50/70 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="flex items-center gap-2 text-sm font-medium text-violet-900">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing Candidates...
                      </span>
                      <span className="text-sm font-medium text-violet-700 tabular-nums">
                        {aiProgress.current} / {aiProgress.total}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-violet-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-teal-500 transition-all duration-300"
                        style={{ width: `${aiProgress.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-violet-700 mt-2">
                      {aiProgress.percentage}% complete - This may take a few moments
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                  <p className="text-sm text-gray-500">
                    {selectedCandidates.length > 0 ? (
                      <>
                        <span className="font-semibold text-gray-900">{selectedCandidates.length}</span> candidate
                        {selectedCandidates.length !== 1 ? "s" : ""} will be scored
                      </>
                    ) : (
                      "Select candidates in Step 2 first."
                    )}
                  </p>
                  <button
                    onClick={handleRunAiMatcher}
                    disabled={isGeneratingAiScore}
                    className="h-11 inline-flex items-center justify-center gap-2 px-6 text-sm font-semibold text-white rounded-lg shadow-sm bg-gradient-to-r from-violet-600 to-teal-600 hover:from-violet-700 hover:to-teal-700 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isGeneratingAiScore ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Running AI Matcher...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Run AI Matcher
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* ─── Results ─── */}
            {showAiResults && (
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 md:px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-violet-50/70 via-white to-teal-50/50">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">AI Matching Results - Top 15 Candidates</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Candidates ranked by AI score in descending order</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleWhatsAppShareAi("selected")}
                      disabled={selectedAiCandidates.length === 0}
                      className="h-9 inline-flex items-center gap-1.5 px-3.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp Selected ({selectedAiCandidates.length})
                    </button>
                    <button
                      onClick={() => handleWhatsAppShareAi("all")}
                      className="h-9 inline-flex items-center gap-1.5 px-3.5 text-sm font-medium text-green-700 bg-white border border-green-200 rounded-lg hover:bg-green-50"
                    >
                      WhatsApp All
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px] table-fixed">
                    <colgroup>
                      <col className="w-12" />
                      <col className="w-16" />
                      <col className="w-[22%]" />
                      <col className="w-[22%]" />
                      <col className="w-[16%]" />
                      <col className="w-[12%]" />
                      <col />
                      <col className="w-[190px]" />
                    </colgroup>
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={selectedAiCandidates.length === aiResults.length && aiResults.length > 0}
                            onChange={handleSelectAllAi}
                            className="h-4 w-4 rounded border-gray-300 accent-teal-600"
                            aria-label="Select all results"
                          />
                        </th>
                        <th className={thClass}>Rank</th>
                        <th className={thClass}>Candidate Name</th>
                        <th className={thClass}>Email</th>
                        <th className={thClass}>AI Score</th>
                        <th className={thClass}>Keywords</th>
                        <th className={thClass}>Current CTC</th>
                        <th className={`${thClass} text-right`}>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {aiResults.map((candidate, index) => {
                        const tone = scoreTone(candidate.aiScore);
                        const isSelected = selectedAiCandidates.includes(candidate.id);
                        return (
                          <tr
                            key={candidate.id}
                            className={`align-middle transition-colors ${isSelected ? "bg-teal-50/40" : "hover:bg-gray-50"}`}
                          >
                            <td className="px-4 py-3.5">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleSelectAiCandidate(candidate.id)}
                                className="h-4 w-4 rounded border-gray-300 accent-teal-600"
                                aria-label={`Select ${candidate.name}`}
                              />
                            </td>
                            <td className="px-4 py-3.5">
                              <span
                                className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${
                                  index === 0
                                    ? "bg-amber-100 text-amber-700"
                                    : index === 1
                                    ? "bg-gray-200 text-gray-700"
                                    : index === 2
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-gray-100 text-gray-500"
                                }`}
                              >
                                {index + 1}
                              </span>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="truncate text-sm font-medium text-gray-900" title={candidate.name}>
                                {candidate.name}
                              </div>
                              <div className="truncate text-xs text-gray-500" title={candidate.designation}>
                                {candidate.designation}
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="truncate text-sm text-gray-700" title={candidate.email}>
                                {candidate.email}
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ring-1 ring-inset tabular-nums ${tone.pill}`}
                                >
                                  {candidate.aiScore}%
                                </span>
                                <div className="h-1.5 flex-1 min-w-[40px] overflow-hidden rounded-full bg-gray-100">
                                  <div
                                    className={`h-full rounded-full ${tone.bar}`}
                                    style={{ width: `${Math.min(Math.max(candidate.aiScore || 0, 0), 100)}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="inline-flex px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
                                {candidate.keywordMatches || 0} matches
                              </span>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="truncate text-sm text-gray-900">{candidate.currentCtc}</div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation(); // ⛔ prevent row click
                                    window.open(candidate.resume || "N/A", "_blank"); // 📄 open resume
                                  }}
                                  className="h-8 inline-flex items-center gap-1 px-2.5 text-xs font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-teal-700"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  View
                                </button>
                                <button
                                  onClick={() => openTagConfirm(candidate)}
                                  className="h-8 inline-flex items-center gap-1 px-2.5 text-xs font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 whitespace-nowrap"
                                >
                                  <Tag className="w-3.5 h-3.5" />
                                  Tag to Position
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* ─── Recently tagged ─── */}
            {taggedCandidates.length > 0 && (
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 px-5 md:px-6 py-4 border-b border-gray-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-semibold text-gray-900">Recently Tagged Candidates</h3>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                    {taggedCandidates.length}
                  </span>
                </div>
                <ul className="divide-y divide-gray-100">
                  {taggedCandidates.map((tagged, index) => (
                    <li
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-5 md:px-6 py-3"
                    >
                      <div className="min-w-0 text-sm">
                        <span className="font-medium text-gray-900">{tagged.candidateName}</span>
                        <span className="mx-2 text-gray-300">→</span>
                        <span className="text-teal-700">{tagged.positionName}</span>
                        <span className="mx-2 text-gray-400">at</span>
                        <span className="text-gray-700">{tagged.clientName}</span>
                      </div>
                      <div className="text-xs text-gray-500 shrink-0">Tagged on {tagged.taggedDate}</div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        {/* ─── Tag confirmation ─── */}
        {showTagConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-[2px] p-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
              <div className="flex items-start justify-between gap-3 px-6 pt-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-50 text-teal-600">
                    <Tag className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">Confirm Tag</h3>
                </div>
                <button
                  onClick={() => {
                    setShowTagConfirm(false);
                    setCandidateToTag(null);
                  }}
                  aria-label="Close"
                  className="h-8 w-8 grid place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="px-6 pt-3 pb-6 text-sm leading-relaxed text-gray-600">
                Are you sure you want to tag{" "}
                <span className="font-semibold text-gray-900">{candidateToTag?.name}</span> to this position?
                {aiMatcherFilters.positionName?.label && (
                  <span className="mt-2 block rounded-lg bg-gray-50 px-3 py-2 text-gray-800">
                    {aiMatcherFilters.positionName.label}
                  </span>
                )}
              </p>

              <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setShowTagConfirm(false);
                    setCandidateToTag(null);
                  }}
                  className="h-10 px-4 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmTagCandidate}
                  className="h-10 px-5 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700"
                >
                  Yes, Tag Candidate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AiResumeMatcher;