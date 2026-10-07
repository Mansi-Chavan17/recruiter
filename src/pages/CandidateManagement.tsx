// // import { useState, useEffect } from "react";
// // import { Search, Plus, Filter, X, User } from "lucide-react";
// // import Header from "../components/Header";
// // import { applicantService } from "../services/applicantService";

// // import CandidateDetails from "../components/candidates/CandidateDetails";
// // import CandidateTable from "../components/candidates/CandidateTable";
// // import CandidateFilters from "../components/candidates/CandidateFilters";
// // import AddCandidateModal from "../components/candidates/AddCandidateModal";

// // import type { Candidate } from "../types/candidate";

// // const CandidateManagement = () => {
// //   const recruiter = localStorage.getItem("email") || "";

// //   // --- Core state ---
// //   const [candidates, setCandidates] = useState<Candidate[]>([]);
// //   const [totalCount, setTotalCount] = useState(0);
// //   const [totalPages, setTotalPages] = useState(0);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const candidatesPerPage = 100;

// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [showFilters, setShowFilters] = useState(false);
// //   const [filters, setFilters] = useState({
// //     ctcMin: "" as number | string,
// //     ctcMax: "" as number | string,
// //     city: "",
// //     organization: "",
// //     designation: "",
// //   });

// //   // --- View state ---
// //   const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
// //   const [showAddForm, setShowAddForm] = useState(false);
// //   const [editingCandidate, setEditingCandidate] = useState<any>(null);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   // --- Form state ---
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     resumeFile: null as File | null,
// //     currentDesignation: "",
// //     currentOrganization: "",
// //     currentCTC: "",
// //     expectedCTC: "",
// //     city: "",
// //     noticePeriod: "",
// //     pipelineStatus: "Available",
// //     education: "",
// //     gender: "",
// //     openToRelocation: false,
// //     engagementType: "Full-time",
// //     specialComments: "",
// //     recruiter: recruiter,
// //     positionHistory: [],
// //     documents: [],
// //   });

// //   // --- Data fetching ---
// //   useEffect(() => {
// //     const delayDebounce = setTimeout(async () => {
// //       try {
// //         const response = await applicantService.fetchAll(
// //           currentPage,
// //           candidatesPerPage,
// //           {
// //             search: searchQuery || "",
// //             city: filters.city || "",
// //             minCTC:
// //               filters.ctcMin.toString() !== ""
// //                 ? Number(filters.ctcMin)
// //                 : undefined,
// //             maxCTC:
// //               filters.ctcMax.toString() !== ""
// //                 ? Number(filters.ctcMax)
// //                 : undefined,
// //             organization: filters.organization || "",
// //             designation: filters.designation || "",
// //           }
// //         );

// //         const fetched = response.data.applicants || [];
// //         setCandidates(fetched);
// //         setTotalCount(response.data.totalCount || 0);
// //         setTotalPages(response.data.totalPages || 0);
// //       } catch (error) {
// //         console.error("Failed to fetch applicants:", error);
// //       }
// //     }, 500);

// //     return () => clearTimeout(delayDebounce);
// //   }, [filters, currentPage, searchQuery]);

// //   // --- API handlers ---
// //   const fetchSingleApplicant = async (id: string) => {
// //     try {
// //       const response = await applicantService.fetchById(id);
// //       const applicant = response.data;

// //       const docResponse = await applicantService.fetchDocuments(id);
// //       const formattedDocs = docResponse.data.map((doc: any) => ({
// //         id: doc.id,
// //         name: doc.fileName,
// //         url: doc.fileUrl,
// //         type: doc.documentType,
// //         uploadDate: doc.uploadedAt,
// //       }));

// //       setSelectedCandidate({ ...applicant, documents: formattedDocs });
// //     } catch (error) {
// //       console.error("Error fetching single applicant:", error);
// //     }
// //   };

// //   const handleSaveDetails = async (editFormData: any) => {
// //     const updateData = {
// //       id: selectedCandidate?.id,
// //       name: editFormData.candidate,
// //       email: editFormData.contact.email,
// //       phone: editFormData.contact.phone,
// //       resumeLink: editFormData.contact.resume,
// //       currentDesignation: editFormData.current_role,
// //       currentOrganization: editFormData.company_name,
// //       currentCTC: Number(editFormData.ctc.current),
// //       expectedCTC: Number(editFormData.ctc.expected),
// //       city: editFormData.location,
// //       noticePeriod: Number(editFormData.noticePeriod),
// //       education: editFormData.education,
// //       gender: editFormData.gender,
// //       engagementType: editFormData.engagement_type,
// //       openToRelocation: editFormData.open_to_relocation,
// //       specialComments: editFormData.special_comments,
// //       recruiter: recruiter || "",
// //     };

// //     try {
// //       const response = await applicantService.addOrUpdate({ data: updateData });
// //       setSelectedCandidate({ ...response.data, ...editFormData });
// //       alert("Details updated successfully!");
// //     } catch (error: any) {
// //       console.error("Failed to update candidate:", error);
// //       alert(error.response?.data?.message || "Failed to update details");
// //       throw error;
// //     }
// //   };

// //   const handleUploadDocument = async (candidateId: string, docForm: any) => {
// //     if (!candidateId || !docForm.file) {
// //       alert("Please select a file to upload");
// //       return;
// //     }

// //     try {
// //       const response = await applicantService.uploadDocument(
// //         candidateId,
// //         docForm.type,
// //         docForm.file
// //       );

// //       const uploadedDoc = response.data;
// //       const formattedDoc = {
// //         id: uploadedDoc.id || Date.now(),
// //         name: uploadedDoc.fileName || docForm.file.name,
// //         url: uploadedDoc.fileUrl || uploadedDoc.url || "",
// //         type: uploadedDoc.documentType || docForm.type,
// //         uploadDate: uploadedDoc.uploadedAt || new Date().toISOString(),
// //       };

// //       if (selectedCandidate?.id === candidateId) {
// //         setSelectedCandidate((prev: any) => ({
// //           ...prev,
// //           documents: [...(prev.documents || []), formattedDoc],
// //         }));
// //       }

// //       alert("Document uploaded successfully!");
// //     } catch (err: any) {
// //       console.error("Document upload failed:", err);
// //       alert(
// //         err?.response?.data?.message ||
// //           "Document upload failed. Please try again."
// //       );
// //     }
// //   };

// //   const handleDeleteDocument = async (
// //     candidateId: string,
// //     documentId: string
// //   ) => {
// //     if (!documentId) {
// //       alert("Document ID is required");
// //       return;
// //     }

// //     if (!window.confirm("Are you sure you want to delete this document?")) {
// //       return;
// //     }

// //     try {
// //       await applicantService.deleteDocument(candidateId, documentId);

// //       if (selectedCandidate?.id === candidateId) {
// //         setSelectedCandidate((prev: any) => ({
// //           ...prev,
// //           documents:
// //             prev.documents?.filter((doc: any) => doc.id !== documentId) || [],
// //         }));
// //       }

// //       alert("Document deleted successfully!");
// //     } catch (error: any) {
// //       console.error("Failed to delete document:", error);
// //       alert(
// //         error?.response?.data?.message ||
// //           "Failed to delete document. Please try again."
// //       );
// //     }
// //   };

// //   const handleFormSubmit = async () => {
// //     try {
// //       setIsSubmitting(true);

// //       if (!formData.name || !formData.email) {
// //         alert("Name and Email are required!");
// //         return;
// //       }

// //       if (!editingCandidate && !formData.resumeFile) {
// //         alert("Please upload a resume file for new candidates!");
// //         return;
// //       }

// //       const formPayload = new FormData();

// //       if (formData.resumeFile) {
// //         formPayload.append("resume", formData.resumeFile);
// //       }

// //       const candidateData = {
// //         id: editingCandidate?.id,
// //         name: formData.name,
// //         email: formData.email,
// //         phone: formData.phone,
// //         currentDesignation: formData.currentDesignation,
// //         currentOrganization: formData.currentOrganization,
// //         currentCTC: formData.currentCTC
// //           ? Number(formData.currentCTC)
// //           : undefined,
// //         expectedCTC: formData.expectedCTC
// //           ? Number(formData.expectedCTC)
// //           : undefined,
// //         city: formData.city,
// //         noticePeriod: formData.noticePeriod
// //           ? Number(formData.noticePeriod)
// //           : undefined,
// //         education: formData.education,
// //         gender: formData.gender,
// //         engagementType: formData.engagementType,
// //         openToRelocation: formData.openToRelocation,
// //         specialComments: formData.specialComments,
// //         recruiter: recruiter || "",
// //       };

// //       formPayload.append("data", JSON.stringify(candidateData));

// //       const result = await applicantService.addOrUpdate(formPayload);

// //       if (editingCandidate) {
// //         setCandidates((prev) =>
// //           prev.map((c) =>
// //             c.id === editingCandidate.id ? { ...c, ...result.data } : c
// //           )
// //         );
// //         alert("Candidate updated successfully!");
// //       } else {
// //         setCandidates((prev) => [...prev, result.data]);
// //         alert("Candidate added successfully!");
// //       }

// //       resetForm();
// //     } catch (error: any) {
// //       console.error("Failed to save candidate:", error);
// //       alert(
// //         error.response?.data?.message ||
// //           error.message ||
// //           "Failed to save candidate. Please try again."
// //       );
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   // --- Helpers ---
// //   const formatCurrency = (amount: number) => {
// //     return new Intl.NumberFormat("en-IN", {
// //       style: "currency",
// //       currency: "INR",
// //       minimumFractionDigits: 0,
// //       maximumFractionDigits: 0,
// //     }).format(amount);
// //   };

// //   const handleFilterChange = (key: string, value: string) => {
// //     if (key === "ctcMax" || key === "ctcMin") {
// //       const numValue = value === "" ? "" : Number(value);
// //       setFilters((prev) => ({ ...prev, [key]: numValue }));
// //     } else {
// //       setFilters((prev) => ({ ...prev, [key]: value }));
// //     }
// //   };

// //   const clearFilters = () => {
// //     setFilters({
// //       ctcMin: "",
// //       ctcMax: "",
// //       city: "",
// //       organization: "",
// //       designation: "",
// //     });
// //   };

// //   const resetForm = () => {
// //     setShowAddForm(false);
// //     setEditingCandidate(null);
// //     setFormData({
// //       name: "",
// //       email: "",
// //       phone: "",
// //       resumeFile: null,
// //       currentDesignation: "",
// //       currentOrganization: "",
// //       currentCTC: "",
// //       expectedCTC: "",
// //       city: "",
// //       noticePeriod: "",
// //       pipelineStatus: "Available",
// //       education: "",
// //       gender: "",
// //       openToRelocation: false,
// //       engagementType: "Full-time",
// //       specialComments: "",
// //       recruiter: recruiter,
// //       positionHistory: [],
// //       documents: [],
// //     });
// //   };

// //   const handleEditCandidate = (candidate: any) => {
// //     setEditingCandidate(candidate);
// //     setFormData(candidate);
// //     setShowAddForm(true);
// //   };

// //   const handleUpdateCandidate = (candidate: any) => {
// //     setEditingCandidate(candidate);
// //     setFormData(candidate);
// //     setShowAddForm(true);
// //   };

// //   const handleCreateCandidate = (email: string) => {
// //     setEditingCandidate(null);
// //     setFormData({
// //       name: "",
// //       email: email,
// //       phone: "",
// //       resumeFile: null,
// //       currentDesignation: "",
// //       currentOrganization: "",
// //       currentCTC: "",
// //       expectedCTC: "",
// //       city: "",
// //       noticePeriod: "",
// //       pipelineStatus: "Available",
// //       education: "",
// //       gender: "",
// //       openToRelocation: false,
// //       engagementType: "Full-time",
// //       specialComments: "",
// //       recruiter: recruiter,
// //       positionHistory: [],
// //       documents: [],
// //     });
// //     setShowAddForm(true);
// //   };

// //   // --- Render: Detail View ---
// //   if (selectedCandidate) {
// //     return (
// //       <CandidateDetails
// //         candidate={selectedCandidate}
// //         onBack={() => setSelectedCandidate(null)}
// //         onSaveDetails={handleSaveDetails}
// //         onUploadDocument={handleUploadDocument}
// //         onDeleteDocument={handleDeleteDocument}
// //         formatCurrency={formatCurrency}
// //       />
// //     );
// //   }

// //   // --- Render: List View ---
// //   return (
// //     <>
// //       <div className="min-h-screen bg-gray-50">
// //         <Header />

// //         <div className="max-w-7xl mx-auto p-6">
// //           <div className="bg-white rounded-lg shadow-sm border border-gray-200">
// //             {/* Header */}
// //             <div className="border-b border-gray-200 p-6">
// //               <div className="flex justify-between items-center mb-6">
// //                 <h2 className="text-2xl font-bold text-gray-900">
// //                   Candidate Management
// //                 </h2>
// //                 <div className="flex gap-3">
// //                   <button
// //                     onClick={() => setShowFilters(!showFilters)}
// //                     className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
// //                   >
// //                     <Filter className="w-4 h-4" />
// //                     Filters
// //                   </button>
// //                   <button
// //                     onClick={() => setShowAddForm(true)}
// //                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// //                   >
// //                     <Plus className="w-4 h-4" />
// //                     Add Candidate
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Search Bar */}
// //               <div className="mb-4">
// //                 <div className="relative">
// //                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                     <Search className="h-5 w-5 text-gray-400" />
// //                   </div>
// //                   <input
// //                     type="text"
// //                     placeholder="Search candidates by name, email, phone, designation, organization, or city..."
// //                     value={searchQuery}
// //                     onChange={(e) => setSearchQuery(e.target.value)}
// //                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
// //                   />
// //                   {searchQuery && (
// //                     <button
// //                       onClick={() => setSearchQuery("")}
// //                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
// //                     >
// //                       <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
// //                     </button>
// //                   )}
// //                 </div>
// //                 {searchQuery && (
// //                   <div className="mt-2 text-sm text-gray-600">
// //                     Showing {candidates.length} candidate
// //                     {candidates.length !== 1 ? "s" : ""} matching "
// //                     {searchQuery}"
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Filters */}
// //               {showFilters && (
// //                 <CandidateFilters
// //                   filters={filters}
// //                   onFilterChange={handleFilterChange}
// //                   onClearFilters={clearFilters}
// //                 />
// //               )}
// //             </div>

// //             {/* Candidates Table */}
// //             <CandidateTable
// //               candidates={candidates}
// //               currentPage={currentPage}
// //               totalPages={totalPages}
// //               totalCount={totalCount}
// //               candidatesPerPage={candidatesPerPage}
// //               onPageChange={setCurrentPage}
// //               onSelectCandidate={fetchSingleApplicant}
// //               onEditCandidate={handleEditCandidate}
// //               formatCurrency={formatCurrency}
// //             />
// //           </div>
// //         </div>

// //         {/* Add/Edit Candidate Modal */}
// //         {showAddForm && (
// //           <AddCandidateModal
// //             editingCandidate={editingCandidate}
// //             formData={formData}
// //             isSubmitting={isSubmitting}
// //             onFormChange={setFormData}
// //             onSubmit={handleFormSubmit}
// //             onClose={resetForm}
// //             onSearchCandidate={() => {}}
// //             onUpdateCandidate={handleUpdateCandidate}
// //             onCreateCandidate={handleCreateCandidate}
// //             candidates={candidates}
// //           />
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default CandidateManagement;


// // import { useState, useEffect } from "react";
// // import { Search, Plus, Filter, X } from "lucide-react";
// // import Header from "../components/Header";
// // import { applicantService } from "../services/applicantService";

// // import CandidateDetails from "../components/candidates/CandidateDetails";
// // import CandidateTable from "../components/candidates/CandidateTable";
// // import CandidateFilters from "../components/candidates/CandidateFilters";
// // import AddCandidateModal from "../components/candidates/AddCandidateModal";

// // import type { Candidate } from "../types/candidate";

// // const CandidateManagement = () => {
// //   const recruiter = localStorage.getItem("email") || "";

// //   // --- Core state ---
// //   const [candidates, setCandidates] = useState<Candidate[]>([]);
// //   const [totalCount, setTotalCount] = useState(0);
// //   const [totalPages, setTotalPages] = useState(0);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const candidatesPerPage = 100;

// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [showFilters, setShowFilters] = useState(false);
// //   const [filters, setFilters] = useState({
// //     ctcMin: "" as number | string,
// //     ctcMax: "" as number | string,
// //     city: "",
// //     organization: "",
// //     designation: "",
// //   });

// //   // --- View state ---
// //   const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
// //   const [showAddForm, setShowAddForm] = useState(false);
// //   const [editingCandidate, setEditingCandidate] = useState<any>(null);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   // --- Form state ---
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     resumeFile: null as File | null,
// //     currentDesignation: "",
// //     currentOrganization: "",
// //     currentCTC: "",
// //     expectedCTC: "",
// //     city: "",
// //     noticePeriod: "",
// //     pipelineStatus: "Available",
// //     education: "",
// //     gender: "",
// //     openToRelocation: false,
// //     engagementType: "Full-time",
// //     specialComments: "",
// //     recruiter: recruiter,
// //     positionHistory: [],
// //     documents: [],
// //   });

// //   // --- Data fetching ---
// //   useEffect(() => {
// //     const delayDebounce = setTimeout(async () => {
// //       try {
// //         const response = await applicantService.fetchAll(
// //           currentPage,
// //           candidatesPerPage,
// //           {
// //             search: searchQuery || "",
// //             city: filters.city || "",
// //             minCTC:
// //               filters.ctcMin.toString() !== ""
// //                 ? Number(filters.ctcMin)
// //                 : undefined,
// //             maxCTC:
// //               filters.ctcMax.toString() !== ""
// //                 ? Number(filters.ctcMax)
// //                 : undefined,
// //             organization: filters.organization || "",
// //             designation: filters.designation || "",
// //           }
// //         );

// //         const fetched = response.data.applicants || [];
// //         setCandidates(fetched);
// //         setTotalCount(response.data.totalCount || 0);
// //         setTotalPages(response.data.totalPages || 0);
// //       } catch (error) {
// //         console.error("Failed to fetch applicants:", error);
// //       }
// //     }, 500);

// //     return () => clearTimeout(delayDebounce);
// //   }, [filters, currentPage, searchQuery]);

// //   // --- API handlers ---
// //   const fetchSingleApplicant = async (id: string) => {
// //     try {
// //       const response = await applicantService.fetchById(id);
// //       const applicant = response.data;

// //       const docResponse = await applicantService.fetchDocuments(id);
// //       const formattedDocs = docResponse.data.map((doc: any) => ({
// //         id: doc.id,
// //         name: doc.fileName,
// //         url: doc.fileUrl,
// //         type: doc.documentType,
// //         uploadDate: doc.uploadedAt,
// //       }));

// //       setSelectedCandidate({ ...applicant, documents: formattedDocs });
// //     } catch (error) {
// //       console.error("Error fetching single applicant:", error);
// //     }
// //   };

// //   const handleSaveDetails = async (editFormData: any) => {
// //     const updateData = {
// //       id: selectedCandidate?.id,
// //       name: editFormData.candidate,
// //       email: editFormData.contact.email,
// //       phone: editFormData.contact.phone,
// //       resumeLink: editFormData.contact.resume,
// //       currentDesignation: editFormData.current_role,
// //       currentOrganization: editFormData.company_name,
// //       currentCTC: Number(editFormData.ctc.current),
// //       expectedCTC: Number(editFormData.ctc.expected),
// //       city: editFormData.location,
// //       noticePeriod: Number(editFormData.noticePeriod),
// //       education: editFormData.education,
// //       gender: editFormData.gender,
// //       engagementType: editFormData.engagement_type,
// //       openToRelocation: editFormData.open_to_relocation,
// //       specialComments: editFormData.special_comments,
// //       recruiter: recruiter || "",
// //     };

// //     try {
// //       const response = await applicantService.addOrUpdate({ data: updateData });
// //       setSelectedCandidate({ ...response.data, ...editFormData });
// //       alert("Details updated successfully!");
// //     } catch (error: any) {
// //       console.error("Failed to update candidate:", error);
// //       alert(error.response?.data?.message || "Failed to update details");
// //       throw error;
// //     }
// //   };

// //   const handleUploadDocument = async (candidateId: string, docForm: any) => {
// //     if (!candidateId || !docForm.file) {
// //       alert("Please select a file to upload");
// //       return;
// //     }

// //     try {
// //       const response = await applicantService.uploadDocument(
// //         candidateId,
// //         docForm.type,
// //         docForm.file
// //       );

// //       const uploadedDoc = response.data;
// //       const formattedDoc = {
// //         id: uploadedDoc.id || Date.now(),
// //         name: uploadedDoc.fileName || docForm.file.name,
// //         url: uploadedDoc.fileUrl || uploadedDoc.url || "",
// //         type: uploadedDoc.documentType || docForm.type,
// //         uploadDate: uploadedDoc.uploadedAt || new Date().toISOString(),
// //       };

// //       if (selectedCandidate?.id === candidateId) {
// //         setSelectedCandidate((prev: any) => ({
// //           ...prev,
// //           documents: [...(prev.documents || []), formattedDoc],
// //         }));
// //       }

// //       alert("Document uploaded successfully!");
// //     } catch (err: any) {
// //       console.error("Document upload failed:", err);
// //       alert(
// //         err?.response?.data?.message ||
// //           "Document upload failed. Please try again."
// //       );
// //     }
// //   };

// //   const handleDeleteDocument = async (
// //     candidateId: string,
// //     documentId: string
// //   ) => {
// //     if (!documentId) {
// //       alert("Document ID is required");
// //       return;
// //     }

// //     if (!window.confirm("Are you sure you want to delete this document?")) {
// //       return;
// //     }

// //     try {
// //       await applicantService.deleteDocument(candidateId, documentId);

// //       if (selectedCandidate?.id === candidateId) {
// //         setSelectedCandidate((prev: any) => ({
// //           ...prev,
// //           documents:
// //             prev.documents?.filter((doc: any) => doc.id !== documentId) || [],
// //         }));
// //       }

// //       alert("Document deleted successfully!");
// //     } catch (error: any) {
// //       console.error("Failed to delete document:", error);
// //       alert(
// //         error?.response?.data?.message ||
// //           "Failed to delete document. Please try again."
// //       );
// //     }
// //   };

// //   const handleFormSubmit = async () => {
// //     try {
// //       setIsSubmitting(true);

// //       if (!formData.name || !formData.email) {
// //         alert("Name and Email are required!");
// //         return;
// //       }

// //       if (!editingCandidate && !formData.resumeFile) {
// //         alert("Please upload a resume file for new candidates!");
// //         return;
// //       }

// //       const formPayload = new FormData();

// //       if (formData.resumeFile) {
// //         formPayload.append("resume", formData.resumeFile);
// //       }

// //       const candidateData = {
// //         id: editingCandidate?.id,
// //         name: formData.name,
// //         email: formData.email,
// //         phone: formData.phone,
// //         currentDesignation: formData.currentDesignation,
// //         currentOrganization: formData.currentOrganization,
// //         currentCTC: formData.currentCTC
// //           ? Number(formData.currentCTC)
// //           : undefined,
// //         expectedCTC: formData.expectedCTC
// //           ? Number(formData.expectedCTC)
// //           : undefined,
// //         city: formData.city,
// //         noticePeriod: formData.noticePeriod
// //           ? Number(formData.noticePeriod)
// //           : undefined,
// //         education: formData.education,
// //         gender: formData.gender,
// //         engagementType: formData.engagementType,
// //         openToRelocation: formData.openToRelocation,
// //         specialComments: formData.specialComments,
// //         recruiter: recruiter || "",
// //       };

// //       formPayload.append("data", JSON.stringify(candidateData));

// //       const result = await applicantService.addOrUpdate(formPayload);

// //       if (editingCandidate) {
// //         setCandidates((prev) =>
// //           prev.map((c) =>
// //             c.id === editingCandidate.id ? { ...c, ...result.data } : c
// //           )
// //         );
// //         alert("Candidate updated successfully!");
// //       } else {
// //         setCandidates((prev) => [...prev, result.data]);
// //         alert("Candidate added successfully!");
// //       }

// //       resetForm();
// //     } catch (error: any) {
// //       console.error("Failed to save candidate:", error);
// //       alert(
// //         error.response?.data?.message ||
// //           error.message ||
// //           "Failed to save candidate. Please try again."
// //       );
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   // --- Helpers ---
// //   const formatCurrency = (amount: number) => {
// //     return new Intl.NumberFormat("en-IN", {
// //       style: "currency",
// //       currency: "INR",
// //       minimumFractionDigits: 0,
// //       maximumFractionDigits: 0,
// //     }).format(amount);
// //   };

// //   const handleFilterChange = (key: string, value: string) => {
// //     if (key === "ctcMax" || key === "ctcMin") {
// //       const numValue = value === "" ? "" : Number(value);
// //       setFilters((prev) => ({ ...prev, [key]: numValue }));
// //     } else {
// //       setFilters((prev) => ({ ...prev, [key]: value }));
// //     }
// //   };

// //   const clearFilters = () => {
// //     setFilters({
// //       ctcMin: "",
// //       ctcMax: "",
// //       city: "",
// //       organization: "",
// //       designation: "",
// //     });
// //   };

// //   const resetForm = () => {
// //     setShowAddForm(false);
// //     setEditingCandidate(null);
// //     setFormData({
// //       name: "",
// //       email: "",
// //       phone: "",
// //       resumeFile: null,
// //       currentDesignation: "",
// //       currentOrganization: "",
// //       currentCTC: "",
// //       expectedCTC: "",
// //       city: "",
// //       noticePeriod: "",
// //       pipelineStatus: "Available",
// //       education: "",
// //       gender: "",
// //       openToRelocation: false,
// //       engagementType: "Full-time",
// //       specialComments: "",
// //       recruiter: recruiter,
// //       positionHistory: [],
// //       documents: [],
// //     });
// //   };

// //   const handleEditCandidate = (candidate: any) => {
// //     setEditingCandidate(candidate);
// //     setFormData(candidate);
// //     setShowAddForm(true);
// //   };

// //   const handleUpdateCandidate = (candidate: any) => {
// //     setEditingCandidate(candidate);
// //     setFormData(candidate);
// //     setShowAddForm(true);
// //   };

// //   const handleCreateCandidate = (email: string) => {
// //     setEditingCandidate(null);
// //     setFormData({
// //       name: "",
// //       email: email,
// //       phone: "",
// //       resumeFile: null,
// //       currentDesignation: "",
// //       currentOrganization: "",
// //       currentCTC: "",
// //       expectedCTC: "",
// //       city: "",
// //       noticePeriod: "",
// //       pipelineStatus: "Available",
// //       education: "",
// //       gender: "",
// //       openToRelocation: false,
// //       engagementType: "Full-time",
// //       specialComments: "",
// //       recruiter: recruiter,
// //       positionHistory: [],
// //       documents: [],
// //     });
// //     setShowAddForm(true);
// //   };

// //   // --- Render: Detail View ---
// //   if (selectedCandidate) {
// //     return (
// //       <CandidateDetails
// //         candidate={selectedCandidate}
// //         onBack={() => setSelectedCandidate(null)}
// //         onSaveDetails={handleSaveDetails}
// //         onUploadDocument={handleUploadDocument}
// //         onDeleteDocument={handleDeleteDocument}
// //         formatCurrency={formatCurrency}
// //       />
// //     );
// //   }

// //   // --- Render: List View ---
// //   return (
// //     <>
// //       <div className="min-h-screen bg-white">
// //         <Header />

// //         <div className="px-6 py-4">
// //           {/* Search + Filter + Add — single row */}
// //           <div className="flex items-center gap-3 mb-4">
// //             <div className="relative flex-1">
// //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                 <Search className="h-5 w-5 text-gray-400" />
// //               </div>
// //               <input
// //                 type="text"
// //                 placeholder="Search candidates by name, email, phone, designation, organization, or city..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
// //               />
// //               {searchQuery && (
// //                 <button
// //                   onClick={() => setSearchQuery("")}
// //                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
// //                 >
// //                   <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
// //                 </button>
// //               )}
// //             </div>
// //             <button
// //               onClick={() => setShowFilters(!showFilters)}
// //               className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-colors whitespace-nowrap ${
// //                 showFilters
// //                   ? "border-green-500 bg-green-50 text-green-700"
// //                   : "border-gray-300 text-gray-700 hover:bg-gray-50"
// //               }`}
// //             >
// //               <Filter className="w-4 h-4" />
// //               Filters
// //             </button>
// //             <button
// //               onClick={() => setShowAddForm(true)}
// //               className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
// //             >
// //               <Plus className="w-4 h-4" />
// //               Add Candidate
// //             </button>
// //           </div>

// //           {searchQuery && (
// //             <div className="mb-3 text-sm text-gray-600">
// //               Showing {candidates.length} candidate
// //               {candidates.length !== 1 ? "s" : ""} matching "{searchQuery}"
// //             </div>
// //           )}

// //           {/* Filters */}
// //           {showFilters && (
// //             <CandidateFilters
// //               filters={filters}
// //               onFilterChange={handleFilterChange}
// //               onClearFilters={clearFilters}
// //             />
// //           )}

// //           {/* Candidates Table */}
// //           <div className="bg-white rounded-lg border border-gray-200">
// //             <CandidateTable
// //               candidates={candidates}
// //               currentPage={currentPage}
// //               totalPages={totalPages}
// //               totalCount={totalCount}
// //               candidatesPerPage={candidatesPerPage}
// //               onPageChange={setCurrentPage}
// //               onSelectCandidate={fetchSingleApplicant}
// //               formatCurrency={formatCurrency}
// //             />
// //           </div>
// //         </div>

// //         {/* Add/Edit Candidate Modal */}
// //         {showAddForm && (
// //           <AddCandidateModal
// //             editingCandidate={editingCandidate}
// //             formData={formData}
// //             isSubmitting={isSubmitting}
// //             onFormChange={setFormData}
// //             onSubmit={handleFormSubmit}
// //             onClose={resetForm}
// //             onSearchCandidate={() => {}}
// //             onUpdateCandidate={handleUpdateCandidate}
// //             onCreateCandidate={handleCreateCandidate}
// //             candidates={candidates}
// //           />
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default CandidateManagement;



// // import { useState, useEffect } from "react";
// // import { Search, Plus, Filter, X } from "lucide-react";
// // import Header from "../components/Header";
// // import { applicantService } from "../services/applicantService";

// // import CandidateDetails from "../components/candidates/CandidateDetails";
// // import CandidateTable from "../components/candidates/CandidateTable";
// // import CandidateFilters from "../components/candidates/CandidateFilters";
// // import AddCandidateModal from "../components/candidates/AddCandidateModal";

// // import type { Candidate } from "../types/candidate";

// // const CandidateManagement = () => {
// //   const recruiter = localStorage.getItem("email") || "";

// //   // --- Core state ---
// //   const [candidates, setCandidates] = useState<Candidate[]>([]);
// //   const [totalCount, setTotalCount] = useState(0);
// //   const [totalPages, setTotalPages] = useState(0);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const candidatesPerPage = 100;

// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [showFilters, setShowFilters] = useState(false);
// //   const [filters, setFilters] = useState({
// //     ctcMin: "" as number | string,
// //     ctcMax: "" as number | string,
// //     city: "",
// //     organization: "",
// //     designation: "",
// //   });

// //   // --- View state ---
// //   const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
// //   const [showAddForm, setShowAddForm] = useState(false);
// //   const [editingCandidate, setEditingCandidate] = useState<any>(null);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   // --- Form state ---
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     resumeFile: null as File | null,
// //     currentDesignation: "",
// //     currentOrganization: "",
// //     currentCTC: "",
// //     expectedCTC: "",
// //     city: "",
// //     noticePeriod: "",
// //     pipelineStatus: "Available",
// //     education: "",
// //     gender: "",
// //     openToRelocation: false,
// //     engagementType: "Full-time",
// //     specialComments: "",
// //     recruiter: recruiter,
// //     positionHistory: [],
// //     documents: [],
// //   });

// //   // --- Data fetching ---
// //   useEffect(() => {
// //     const delayDebounce = setTimeout(async () => {
// //       try {
// //         const response = await applicantService.fetchAll(
// //           currentPage,
// //           candidatesPerPage,
// //           {
// //             search: searchQuery || "",
// //             city: filters.city || "",
// //             minCTC:
// //               filters.ctcMin.toString() !== ""
// //                 ? Number(filters.ctcMin)
// //                 : undefined,
// //             maxCTC:
// //               filters.ctcMax.toString() !== ""
// //                 ? Number(filters.ctcMax)
// //                 : undefined,
// //             organization: filters.organization || "",
// //             designation: filters.designation || "",
// //           }
// //         );

// //         const fetched = response.data.applicants || [];
// //         setCandidates(fetched);
// //         setTotalCount(response.data.totalCount || 0);
// //         setTotalPages(response.data.totalPages || 0);
// //       } catch (error) {
// //         console.error("Failed to fetch applicants:", error);
// //       }
// //     }, 500);

// //     return () => clearTimeout(delayDebounce);
// //   }, [filters, currentPage, searchQuery]);

// //   // --- API handlers ---
// //   const fetchSingleApplicant = async (id: string) => {
// //     try {
// //       const response = await applicantService.fetchById(id);
// //       const applicant = response.data;

// //       const docResponse = await applicantService.fetchDocuments(id);
// //       const formattedDocs = docResponse.data.map((doc: any) => ({
// //         id: doc.id,
// //         name: doc.fileName,
// //         url: doc.fileUrl,
// //         type: doc.documentType,
// //         uploadDate: doc.uploadedAt,
// //       }));

// //       setSelectedCandidate({ ...applicant, documents: formattedDocs });
// //     } catch (error) {
// //       console.error("Error fetching single applicant:", error);
// //     }
// //   };

// //   const handleSaveDetails = async (editFormData: any) => {
// //     const updateData = {
// //       id: selectedCandidate?.id,
// //       name: editFormData.candidate,
// //       email: editFormData.contact.email,
// //       phone: editFormData.contact.phone,
// //       resumeLink: editFormData.contact.resume,
// //       currentDesignation: editFormData.current_role,
// //       currentOrganization: editFormData.company_name,
// //       currentCTC: Number(editFormData.ctc.current),
// //       expectedCTC: Number(editFormData.ctc.expected),
// //       city: editFormData.location,
// //       noticePeriod: Number(editFormData.noticePeriod),
// //       education: editFormData.education,
// //       gender: editFormData.gender,
// //       engagementType: editFormData.engagement_type,
// //       openToRelocation: editFormData.open_to_relocation,
// //       specialComments: editFormData.special_comments,
// //       recruiter: recruiter || "",
// //     };

// //     try {
// //       const response = await applicantService.addOrUpdate({ data: updateData });
// //       setSelectedCandidate({ ...response.data, ...editFormData });
// //       alert("Details updated successfully!");
// //     } catch (error: any) {
// //       console.error("Failed to update candidate:", error);
// //       alert(error.response?.data?.message || "Failed to update details");
// //       throw error;
// //     }
// //   };

// //   const handleUploadDocument = async (candidateId: string, docForm: any) => {
// //     if (!candidateId || !docForm.file) {
// //       alert("Please select a file to upload");
// //       return;
// //     }

// //     try {
// //       const response = await applicantService.uploadDocument(
// //         candidateId,
// //         docForm.type,
// //         docForm.file
// //       );

// //       const uploadedDoc = response.data;
// //       const formattedDoc = {
// //         id: uploadedDoc.id || Date.now(),
// //         name: uploadedDoc.fileName || docForm.file.name,
// //         url: uploadedDoc.fileUrl || uploadedDoc.url || "",
// //         type: uploadedDoc.documentType || docForm.type,
// //         uploadDate: uploadedDoc.uploadedAt || new Date().toISOString(),
// //       };

// //       if (selectedCandidate?.id === candidateId) {
// //         setSelectedCandidate((prev: any) => ({
// //           ...prev,
// //           documents: [...(prev.documents || []), formattedDoc],
// //         }));
// //       }

// //       alert("Document uploaded successfully!");
// //     } catch (err: any) {
// //       console.error("Document upload failed:", err);
// //       alert(
// //         err?.response?.data?.message ||
// //           "Document upload failed. Please try again."
// //       );
// //     }
// //   };

// //   const handleDeleteDocument = async (
// //     candidateId: string,
// //     documentId: string
// //   ) => {
// //     if (!documentId) {
// //       alert("Document ID is required");
// //       return;
// //     }

// //     if (!window.confirm("Are you sure you want to delete this document?")) {
// //       return;
// //     }

// //     try {
// //       await applicantService.deleteDocument(candidateId, documentId);

// //       if (selectedCandidate?.id === candidateId) {
// //         setSelectedCandidate((prev: any) => ({
// //           ...prev,
// //           documents:
// //             prev.documents?.filter((doc: any) => doc.id !== documentId) || [],
// //         }));
// //       }

// //       alert("Document deleted successfully!");
// //     } catch (error: any) {
// //       console.error("Failed to delete document:", error);
// //       alert(
// //         error?.response?.data?.message ||
// //           "Failed to delete document. Please try again."
// //       );
// //     }
// //   };

// //   const handleFormSubmit = async () => {
// //     try {
// //       setIsSubmitting(true);

// //       if (!formData.name || !formData.email) {
// //         alert("Name and Email are required!");
// //         return;
// //       }

// //       if (!editingCandidate && !formData.resumeFile) {
// //         alert("Please upload a resume file for new candidates!");
// //         return;
// //       }

// //       const formPayload = new FormData();

// //       if (formData.resumeFile) {
// //         formPayload.append("resume", formData.resumeFile);
// //       }

// //       const candidateData = {
// //         id: editingCandidate?.id,
// //         name: formData.name,
// //         email: formData.email,
// //         phone: formData.phone,
// //         currentDesignation: formData.currentDesignation,
// //         currentOrganization: formData.currentOrganization,
// //         currentCTC: formData.currentCTC
// //           ? Number(formData.currentCTC)
// //           : undefined,
// //         expectedCTC: formData.expectedCTC
// //           ? Number(formData.expectedCTC)
// //           : undefined,
// //         city: formData.city,
// //         noticePeriod: formData.noticePeriod
// //           ? Number(formData.noticePeriod)
// //           : undefined,
// //         education: formData.education,
// //         gender: formData.gender,
// //         engagementType: formData.engagementType,
// //         openToRelocation: formData.openToRelocation,
// //         specialComments: formData.specialComments,
// //         recruiter: recruiter || "",
// //       };

// //       formPayload.append("data", JSON.stringify(candidateData));

// //       const result = await applicantService.addOrUpdate(formPayload);

// //       if (editingCandidate) {
// //         setCandidates((prev) =>
// //           prev.map((c) =>
// //             c.id === editingCandidate.id ? { ...c, ...result.data } : c
// //           )
// //         );
// //         alert("Candidate updated successfully!");
// //       } else {
// //         setCandidates((prev) => [...prev, result.data]);
// //         alert("Candidate added successfully!");
// //       }

// //       resetForm();
// //     } catch (error: any) {
// //       console.error("Failed to save candidate:", error);
// //       alert(
// //         error.response?.data?.message ||
// //           error.message ||
// //           "Failed to save candidate. Please try again."
// //       );
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   // --- Helpers ---
// //   const formatCurrency = (amount: number) => {
// //     return new Intl.NumberFormat("en-IN", {
// //       style: "currency",
// //       currency: "INR",
// //       minimumFractionDigits: 0,
// //       maximumFractionDigits: 0,
// //     }).format(amount);
// //   };

// //   const handleFilterChange = (key: string, value: string) => {
// //     if (key === "ctcMax" || key === "ctcMin") {
// //       const numValue = value === "" ? "" : Number(value);
// //       setFilters((prev) => ({ ...prev, [key]: numValue }));
// //     } else {
// //       setFilters((prev) => ({ ...prev, [key]: value }));
// //     }
// //   };

// //   const clearFilters = () => {
// //     setFilters({
// //       ctcMin: "",
// //       ctcMax: "",
// //       city: "",
// //       organization: "",
// //       designation: "",
// //     });
// //   };

// //   const resetForm = () => {
// //     setShowAddForm(false);
// //     setEditingCandidate(null);
// //     setFormData({
// //       name: "",
// //       email: "",
// //       phone: "",
// //       resumeFile: null,
// //       currentDesignation: "",
// //       currentOrganization: "",
// //       currentCTC: "",
// //       expectedCTC: "",
// //       city: "",
// //       noticePeriod: "",
// //       pipelineStatus: "Available",
// //       education: "",
// //       gender: "",
// //       openToRelocation: false,
// //       engagementType: "Full-time",
// //       specialComments: "",
// //       recruiter: recruiter,
// //       positionHistory: [],
// //       documents: [],
// //     });
// //   };

// //   const handleEditCandidate = (candidate: any) => {
// //     setEditingCandidate(candidate);
// //     setFormData(candidate);
// //     setShowAddForm(true);
// //   };

// //   const handleUpdateCandidate = (candidate: any) => {
// //     setEditingCandidate(candidate);
// //     setFormData(candidate);
// //     setShowAddForm(true);
// //   };

// //   const handleCreateCandidate = (email: string) => {
// //     setEditingCandidate(null);
// //     setFormData({
// //       name: "",
// //       email: email,
// //       phone: "",
// //       resumeFile: null,
// //       currentDesignation: "",
// //       currentOrganization: "",
// //       currentCTC: "",
// //       expectedCTC: "",
// //       city: "",
// //       noticePeriod: "",
// //       pipelineStatus: "Available",
// //       education: "",
// //       gender: "",
// //       openToRelocation: false,
// //       engagementType: "Full-time",
// //       specialComments: "",
// //       recruiter: recruiter,
// //       positionHistory: [],
// //       documents: [],
// //     });
// //     setShowAddForm(true);
// //   };

// //   // --- Render: Detail View ---
// //   if (selectedCandidate) {
// //     return (
// //       <CandidateDetails
// //         candidate={selectedCandidate}
// //         onBack={() => setSelectedCandidate(null)}
// //         onSaveDetails={handleSaveDetails}
// //         onUploadDocument={handleUploadDocument}
// //         onDeleteDocument={handleDeleteDocument}
// //         formatCurrency={formatCurrency}
// //       />
// //     );
// //   }

// //   // --- Render: List View ---
// //   return (
// //     <>
// //       <div className="min-h-screen bg-white">
// //         <Header />

// //         <main className="md:ml-16 px-6 py-4">
// //           {/* Search + Filter + Add — single row */}
// //           <div className="flex items-center gap-3 mb-4">
// //             <div className="relative flex-1">
// //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                 <Search className="h-5 w-5 text-gray-400" />
// //               </div>
// //               <input
// //                 type="text"
// //                 placeholder="Search candidates by name, email, phone, designation, organization, or city..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
// //               />
// //               {searchQuery && (
// //                 <button
// //                   onClick={() => setSearchQuery("")}
// //                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
// //                 >
// //                   <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
// //                 </button>
// //               )}
// //             </div>
// //             <button
// //               onClick={() => setShowFilters(!showFilters)}
// //               className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-colors whitespace-nowrap ${
// //                 showFilters
// //                   ? "border-green-500 bg-green-50 text-green-700"
// //                   : "border-gray-300 text-gray-700 hover:bg-gray-50"
// //               }`}
// //             >
// //               <Filter className="w-4 h-4" />
// //               Filters
// //             </button>
// //             <button
// //               onClick={() => setShowAddForm(true)}
// //               className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
// //             >
// //               <Plus className="w-4 h-4" />
// //               Add Candidate
// //             </button>
// //           </div>

// //           {searchQuery && (
// //             <div className="mb-3 text-sm text-gray-600">
// //               Showing {candidates.length} candidate
// //               {candidates.length !== 1 ? "s" : ""} matching "{searchQuery}"
// //             </div>
// //           )}

// //           {/* Filters */}
// //           {showFilters && (
// //             <CandidateFilters
// //               filters={filters}
// //               onFilterChange={handleFilterChange}
// //               onClearFilters={clearFilters}
// //             />
// //           )}

// //           {/* Candidates Table */}
// //           <CandidateTable
// //             candidates={candidates}
// //             currentPage={currentPage}
// //             totalPages={totalPages}
// //             totalCount={totalCount}
// //             candidatesPerPage={candidatesPerPage}
// //             onPageChange={setCurrentPage}
// //             onSelectCandidate={fetchSingleApplicant}
// //             formatCurrency={formatCurrency}
// //           />
// //         </main>

// //         {/* Add/Edit Candidate Modal */}
// //         {showAddForm && (
// //           <AddCandidateModal
// //             editingCandidate={editingCandidate}
// //             formData={formData}
// //             isSubmitting={isSubmitting}
// //             onFormChange={setFormData}
// //             onSubmit={handleFormSubmit}
// //             onClose={resetForm}
// //             onSearchCandidate={() => {}}
// //             onUpdateCandidate={handleUpdateCandidate}
// //             onCreateCandidate={handleCreateCandidate}
// //             candidates={candidates}
// //           />
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default CandidateManagement;


// import { useState, useEffect } from "react";
// import { Search, Plus, Filter, X } from "lucide-react";
// import Header from "../components/Header";
// import { applicantService } from "../services/applicantService";

// import CandidateDetails from "../components/candidates/CandidateDetails";
// import CandidateTable from "../components/candidates/CandidateTable";
// import CandidateFilters from "../components/candidates/CandidateFilters";
// import AddCandidateModal from "../components/candidates/AddCandidateModal";

// import type { Candidate } from "../types/candidate";

// const CandidateManagement = () => {
//   const recruiter = localStorage.getItem("email") || "";

//   // --- Core state ---
//   const [candidates, setCandidates] = useState<Candidate[]>([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const candidatesPerPage = 100;

//   const [searchQuery, setSearchQuery] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     ctcMin: "" as number | string,
//     ctcMax: "" as number | string,
//     city: "",
//     organization: "",
//     designation: "",
//   });

//   // --- View state ---
//   const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editingCandidate, setEditingCandidate] = useState<any>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // --- Form state ---
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     resumeFile: null as File | null,
//     currentDesignation: "",
//     currentOrganization: "",
//     currentCTC: "",
//     expectedCTC: "",
//     city: "",
//     noticePeriod: "",
//     pipelineStatus: "Available",
//     education: "",
//     gender: "",
//     openToRelocation: false,
//     engagementType: "Full-time",
//     specialComments: "",
//     recruiter: recruiter,
//     positionHistory: [],
//     documents: [],
//   });

//   // --- Data fetching ---
//   useEffect(() => {
//     const delayDebounce = setTimeout(async () => {
//       try {
//         const response = await applicantService.fetchAll(
//           currentPage,
//           candidatesPerPage,
//           {
//             search: searchQuery || "",
//             city: filters.city || "",
//             minCTC:
//               filters.ctcMin.toString() !== ""
//                 ? Number(filters.ctcMin)
//                 : undefined,
//             maxCTC:
//               filters.ctcMax.toString() !== ""
//                 ? Number(filters.ctcMax)
//                 : undefined,
//             organization: filters.organization || "",
//             designation: filters.designation || "",
//           }
//         );

//         const fetched = response.data.applicants || [];
//         setCandidates(fetched);
//         setTotalCount(response.data.totalCount || 0);
//         setTotalPages(response.data.totalPages || 0);
//       } catch (error) {
//         console.error("Failed to fetch applicants:", error);
//       }
//     }, 500);

//     return () => clearTimeout(delayDebounce);
//   }, [filters, currentPage, searchQuery]);

//   // --- API handlers ---
//   const fetchSingleApplicant = async (id: string) => {
//     try {
//       const response = await applicantService.fetchById(id);
//       const applicant = response.data;

//       const docResponse = await applicantService.fetchDocuments(id);
//       const formattedDocs = docResponse.data.map((doc: any) => ({
//         id: doc.id,
//         name: doc.fileName,
//         url: doc.fileUrl,
//         type: doc.documentType,
//         uploadDate: doc.uploadedAt,
//       }));

//       setSelectedCandidate({ ...applicant, documents: formattedDocs });
//     } catch (error) {
//       console.error("Error fetching single applicant:", error);
//     }
//   };

//   const handleSaveDetails = async (editFormData: any) => {
//     const updateData = {
//       id: selectedCandidate?.id,
//       name: editFormData.candidate,
//       email: editFormData.contact.email,
//       phone: editFormData.contact.phone,
//       resumeLink: editFormData.contact.resume,
//       currentDesignation: editFormData.current_role,
//       currentOrganization: editFormData.company_name,
//       currentCTC: Number(editFormData.ctc.current),
//       expectedCTC: Number(editFormData.ctc.expected),
//       city: editFormData.location,
//       noticePeriod: Number(editFormData.noticePeriod),
//       education: editFormData.education,
//       gender: editFormData.gender,
//       engagementType: editFormData.engagement_type,
//       openToRelocation: editFormData.open_to_relocation,
//       specialComments: editFormData.special_comments,
//       recruiter: recruiter || "",
//     };

//     try {
//       const response = await applicantService.addOrUpdate({ data: updateData });
//       setSelectedCandidate({ ...response.data, ...editFormData });
//       alert("Details updated successfully!");
//     } catch (error: any) {
//       console.error("Failed to update candidate:", error);
//       alert(error.response?.data?.message || "Failed to update details");
//       throw error;
//     }
//   };

//   const handleUploadDocument = async (candidateId: string, docForm: any) => {
//     if (!candidateId || !docForm.file) {
//       alert("Please select a file to upload");
//       return;
//     }

//     try {
//       const response = await applicantService.uploadDocument(
//         candidateId,
//         docForm.type,
//         docForm.file
//       );

//       const uploadedDoc = response.data;
//       const formattedDoc = {
//         id: uploadedDoc.id || Date.now(),
//         name: uploadedDoc.fileName || docForm.file.name,
//         url: uploadedDoc.fileUrl || uploadedDoc.url || "",
//         type: uploadedDoc.documentType || docForm.type,
//         uploadDate: uploadedDoc.uploadedAt || new Date().toISOString(),
//       };

//       if (selectedCandidate?.id === candidateId) {
//         setSelectedCandidate((prev: any) => ({
//           ...prev,
//           documents: [...(prev.documents || []), formattedDoc],
//         }));
//       }

//       alert("Document uploaded successfully!");
//     } catch (err: any) {
//       console.error("Document upload failed:", err);
//       alert(
//         err?.response?.data?.message ||
//           "Document upload failed. Please try again."
//       );
//     }
//   };

//   const handleDeleteDocument = async (
//     candidateId: string,
//     documentId: string
//   ) => {
//     if (!documentId) {
//       alert("Document ID is required");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete this document?")) {
//       return;
//     }

//     try {
//       await applicantService.deleteDocument(candidateId, documentId);

//       if (selectedCandidate?.id === candidateId) {
//         setSelectedCandidate((prev: any) => ({
//           ...prev,
//           documents:
//             prev.documents?.filter((doc: any) => doc.id !== documentId) || [],
//         }));
//       }

//       alert("Document deleted successfully!");
//     } catch (error: any) {
//       console.error("Failed to delete document:", error);
//       alert(
//         error?.response?.data?.message ||
//           "Failed to delete document. Please try again."
//       );
//     }
//   };

//   const handleFormSubmit = async () => {
//     try {
//       setIsSubmitting(true);

//       if (!formData.name || !formData.email) {
//         alert("Name and Email are required!");
//         return;
//       }

//       if (!editingCandidate && !formData.resumeFile) {
//         alert("Please upload a resume file for new candidates!");
//         return;
//       }

//       const formPayload = new FormData();

//       if (formData.resumeFile) {
//         formPayload.append("resume", formData.resumeFile);
//       }

//       const candidateData = {
//         id: editingCandidate?.id,
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         currentDesignation: formData.currentDesignation,
//         currentOrganization: formData.currentOrganization,
//         currentCTC: formData.currentCTC
//           ? Number(formData.currentCTC)
//           : undefined,
//         expectedCTC: formData.expectedCTC
//           ? Number(formData.expectedCTC)
//           : undefined,
//         city: formData.city,
//         noticePeriod: formData.noticePeriod
//           ? Number(formData.noticePeriod)
//           : undefined,
//         education: formData.education,
//         gender: formData.gender,
//         engagementType: formData.engagementType,
//         openToRelocation: formData.openToRelocation,
//         specialComments: formData.specialComments,
//         recruiter: recruiter || "",
//       };

//       formPayload.append("data", JSON.stringify(candidateData));

//       const result = await applicantService.addOrUpdate(formPayload);

//       if (editingCandidate) {
//         setCandidates((prev) =>
//           prev.map((c) =>
//             c.id === editingCandidate.id ? { ...c, ...result.data } : c
//           )
//         );
//         alert("Candidate updated successfully!");
//       } else {
//         setCandidates((prev) => [...prev, result.data]);
//         alert("Candidate added successfully!");
//       }

//       resetForm();
//     } catch (error: any) {
//       console.error("Failed to save candidate:", error);
//       alert(
//         error.response?.data?.message ||
//           error.message ||
//           "Failed to save candidate. Please try again."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // --- Helpers ---
//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   const handleFilterChange = (key: string, value: string) => {
//     if (key === "ctcMax" || key === "ctcMin") {
//       const numValue = value === "" ? "" : Number(value);
//       setFilters((prev) => ({ ...prev, [key]: numValue }));
//     } else {
//       setFilters((prev) => ({ ...prev, [key]: value }));
//     }
//   };

//   const clearFilters = () => {
//     setFilters({
//       ctcMin: "",
//       ctcMax: "",
//       city: "",
//       organization: "",
//       designation: "",
//     });
//   };

//   const resetForm = () => {
//     setShowAddForm(false);
//     setEditingCandidate(null);
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       resumeFile: null,
//       currentDesignation: "",
//       currentOrganization: "",
//       currentCTC: "",
//       expectedCTC: "",
//       city: "",
//       noticePeriod: "",
//       pipelineStatus: "Available",
//       education: "",
//       gender: "",
//       openToRelocation: false,
//       engagementType: "Full-time",
//       specialComments: "",
//       recruiter: recruiter,
//       positionHistory: [],
//       documents: [],
//     });
//   };

//   const handleEditCandidate = (candidate: any) => {
//     setEditingCandidate(candidate);
//     setFormData(candidate);
//     setShowAddForm(true);
//   };

//   const handleUpdateCandidate = (candidate: any) => {
//     setEditingCandidate(candidate);
//     setFormData(candidate);
//     setShowAddForm(true);
//   };

//   const handleCreateCandidate = (email: string) => {
//     setEditingCandidate(null);
//     setFormData({
//       name: "",
//       email: email,
//       phone: "",
//       resumeFile: null,
//       currentDesignation: "",
//       currentOrganization: "",
//       currentCTC: "",
//       expectedCTC: "",
//       city: "",
//       noticePeriod: "",
//       pipelineStatus: "Available",
//       education: "",
//       gender: "",
//       openToRelocation: false,
//       engagementType: "Full-time",
//       specialComments: "",
//       recruiter: recruiter,
//       positionHistory: [],
//       documents: [],
//     });
//     setShowAddForm(true);
//   };

//   // --- Render: Detail View ---
//   if (selectedCandidate) {
//     return (
//       <CandidateDetails
//         candidate={selectedCandidate}
//         onBack={() => setSelectedCandidate(null)}
//         onSaveDetails={handleSaveDetails}
//         onUploadDocument={handleUploadDocument}
//         onDeleteDocument={handleDeleteDocument}
//         formatCurrency={formatCurrency}
//       />
//     );
//   }

//   // --- Render: List View ---
//   return (
//     <>
//       <div className="min-h-screen bg-white">
//         <Header />

//         <main className="md:ml-16 px-6 py-4">
//           {/* Search + Filter + Add — single row */}
//           <div className="flex items-center gap-3 mb-4">
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search candidates by name, email, phone, designation, organization, or city..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={() => setSearchQuery("")}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 >
//                   <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
//                 </button>
//               )}
//             </div>
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-colors whitespace-nowrap ${
//                 showFilters
//                   ? "border-teal-500 bg-teal-50 text-teal-700"
//                   : "border-gray-300 text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               <Filter className="w-4 h-4" />
//               Filters
//             </button>
//             <button
//               onClick={() => setShowAddForm(true)}
//               className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
//             >
//               <Plus className="w-4 h-4" />
//               Add Candidate
//             </button>
//           </div>

//           {searchQuery && (
//             <div className="mb-3 text-sm text-gray-600">
//               Showing {candidates.length} candidate
//               {candidates.length !== 1 ? "s" : ""} matching "{searchQuery}"
//             </div>
//           )}

//           {/* Filters */}
//           {showFilters && (
//             <CandidateFilters
//               filters={filters}
//               onFilterChange={handleFilterChange}
//               onClearFilters={clearFilters}
//             />
//           )}

//           {/* Candidates Table */}
//           <CandidateTable
//             candidates={candidates}
//             currentPage={currentPage}
//             totalPages={totalPages}
//             totalCount={totalCount}
//             candidatesPerPage={candidatesPerPage}
//             onPageChange={setCurrentPage}
//             onSelectCandidate={fetchSingleApplicant}
//             formatCurrency={formatCurrency}
//           />
//         </main>

//         {/* Add/Edit Candidate Modal */}
//         {showAddForm && (
//           <AddCandidateModal
//             editingCandidate={editingCandidate}
//             formData={formData}
//             isSubmitting={isSubmitting}
//             onFormChange={setFormData}
//             onSubmit={handleFormSubmit}
//             onClose={resetForm}
//             onSearchCandidate={() => {}}
//             onUpdateCandidate={handleUpdateCandidate}
//             onCreateCandidate={handleCreateCandidate}
//             candidates={candidates}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default CandidateManagement;



import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, Plus, Filter, X } from "lucide-react";
import Header from "../components/Header";
import { applicantService } from "../services/applicantService";

import CandidateDetails from "../components/candidates/CandidateDetails";
import CandidateTable from "../components/candidates/CandidateTable";
import CandidateFilters from "../components/candidates/CandidateFilters";
import AddCandidateModal from "../components/candidates/AddCandidateModal";

import type { Candidate } from "../types/candidate";

const CandidateManagement = () => {
  const { id: candidateId } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  // --- Auth guard: redirect to signup if not logged in ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signup", { replace: true });
    }
  }, [navigate]);

  const recruiter = localStorage.getItem("email") || "";

  // --- Core state ---
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 100;

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    ctcMin: "" as number | string,
    ctcMax: "" as number | string,
    city: "",
    organization: "",
    designation: "",
  });

  // --- View state ---
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Form state ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resumeFile: null as File | null,
    currentDesignation: "",
    currentOrganization: "",
    currentCTC: "",
    expectedCTC: "",
    city: "",
    noticePeriod: "",
    pipelineStatus: "Available",
    education: "",
    gender: "",
    openToRelocation: false,
    engagementType: "Full-time",
    specialComments: "",
    recruiter: recruiter,
    positionHistory: [],
    documents: [],
  });

  // --- Data fetching ---
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        const response = await applicantService.fetchAll(
          currentPage,
          candidatesPerPage,
          {
            search: searchQuery || "",
            city: filters.city || "",
            minCTC:
              filters.ctcMin.toString() !== ""
                ? Number(filters.ctcMin)
                : undefined,
            maxCTC:
              filters.ctcMax.toString() !== ""
                ? Number(filters.ctcMax)
                : undefined,
            organization: filters.organization || "",
            designation: filters.designation || "",
          }
        );

        const fetched = response.data.applicants || [];
        setCandidates(fetched);
        setTotalCount(response.data.totalCount || 0);
        setTotalPages(response.data.totalPages || 0);
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [filters, currentPage, searchQuery]);

  // --- Load candidate from URL param ---
  useEffect(() => {
    if (candidateId) {
      fetchSingleApplicant(candidateId);
    } else {
      setSelectedCandidate(null);
    }
  }, [candidateId]);

  // --- API handlers ---
  const fetchSingleApplicant = async (id: string) => {
    try {
      const response = await applicantService.fetchById(id);
      const applicant = response.data;

      const docResponse = await applicantService.fetchDocuments(id);
      const formattedDocs = docResponse.data.map((doc: any) => ({
        id: doc.id,
        name: doc.fileName,
        url: doc.fileUrl,
        type: doc.documentType,
        uploadDate: doc.uploadedAt,
      }));

      setSelectedCandidate({ ...applicant, documents: formattedDocs });
    } catch (error) {
      console.error("Error fetching single applicant:", error);
    }
  };

  const handleSelectCandidate = (id: string) => {
    navigate(`/candidate-management/${id}`);
  };

  const handleBack = () => {
    navigate("/candidate-management");
  };

  // --- Prev / Next navigation ---
  const currentIndex = candidates.findIndex((c) => c.id === candidateId);

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevId = candidates[currentIndex - 1]?.id;
      if (prevId) navigate(`/candidate-management/${prevId}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < candidates.length - 1) {
      const nextId = candidates[currentIndex + 1]?.id;
      if (nextId) navigate(`/candidate-management/${nextId}`);
    }
  };

  const handleSaveDetails = async (editFormData: any) => {
    const updateData = {
      id: selectedCandidate?.id,
      name: editFormData.candidate,
      email: editFormData.contact.email,
      phone: editFormData.contact.phone,
      resumeLink: editFormData.contact.resume,
      currentDesignation: editFormData.current_role,
      currentOrganization: editFormData.company_name,
      currentCTC: Number(editFormData.ctc.current),
      expectedCTC: Number(editFormData.ctc.expected),
      city: editFormData.location,
      noticePeriod: Number(editFormData.noticePeriod),
      education: editFormData.education,
      gender: editFormData.gender,
      engagementType: editFormData.engagement_type,
      openToRelocation: editFormData.open_to_relocation,
      specialComments: editFormData.special_comments,
      recruiter: recruiter || "",
    };

    try {
      const response = await applicantService.addOrUpdate({ data: updateData });
      setSelectedCandidate({ ...response.data, ...editFormData });
      alert("Details updated successfully!");
    } catch (error: any) {
      console.error("Failed to update candidate:", error);
      alert(error.response?.data?.message || "Failed to update details");
      throw error;
    }
  };

  const handleUploadDocument = async (candidateId: string, docForm: any) => {
    if (!candidateId || !docForm.file) {
      alert("Please select a file to upload");
      return;
    }

    try {
      const response = await applicantService.uploadDocument(
        candidateId,
        docForm.type,
        docForm.file
      );

      const uploadedDoc = response.data;
      const formattedDoc = {
        id: uploadedDoc.id || Date.now(),
        name: uploadedDoc.fileName || docForm.file.name,
        url: uploadedDoc.fileUrl || uploadedDoc.url || "",
        type: uploadedDoc.documentType || docForm.type,
        uploadDate: uploadedDoc.uploadedAt || new Date().toISOString(),
      };

      if (selectedCandidate?.id === candidateId) {
        setSelectedCandidate((prev: any) => ({
          ...prev,
          documents: [...(prev.documents || []), formattedDoc],
        }));
      }

      alert("Document uploaded successfully!");
    } catch (err: any) {
      console.error("Document upload failed:", err);
      alert(
        err?.response?.data?.message ||
          "Document upload failed. Please try again."
      );
    }
  };

  const handleDeleteDocument = async (
    candidateId: string,
    documentId: string
  ) => {
    if (!documentId) {
      alert("Document ID is required");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this document?")) {
      return;
    }

    try {
      await applicantService.deleteDocument(candidateId, documentId);

      if (selectedCandidate?.id === candidateId) {
        setSelectedCandidate((prev: any) => ({
          ...prev,
          documents:
            prev.documents?.filter((doc: any) => doc.id !== documentId) || [],
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

  const handleFormSubmit = async () => {
    try {
      setIsSubmitting(true);

      if (!formData.name || !formData.email) {
        alert("Name and Email are required!");
        return;
      }

      if (!editingCandidate && !formData.resumeFile) {
        alert("Please upload a resume file for new candidates!");
        return;
      }

      const formPayload = new FormData();

      if (formData.resumeFile) {
        formPayload.append("resume", formData.resumeFile);
      }

      const candidateData = {
        id: editingCandidate?.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        currentDesignation: formData.currentDesignation,
        currentOrganization: formData.currentOrganization,
        currentCTC: formData.currentCTC
          ? Number(formData.currentCTC)
          : undefined,
        expectedCTC: formData.expectedCTC
          ? Number(formData.expectedCTC)
          : undefined,
        city: formData.city,
        noticePeriod: formData.noticePeriod
          ? Number(formData.noticePeriod)
          : undefined,
        education: formData.education,
        gender: formData.gender,
        engagementType: formData.engagementType,
        openToRelocation: formData.openToRelocation,
        specialComments: formData.specialComments,
        recruiter: recruiter || "",
      };

      formPayload.append("data", JSON.stringify(candidateData));

      const result = await applicantService.addOrUpdate(formPayload);

      if (editingCandidate) {
        setCandidates((prev) =>
          prev.map((c) =>
            c.id === editingCandidate.id ? { ...c, ...result.data } : c
          )
        );
        alert("Candidate updated successfully!");
      } else {
        setCandidates((prev) => [...prev, result.data]);
        alert("Candidate added successfully!");
      }

      resetForm();
    } catch (error: any) {
      console.error("Failed to save candidate:", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to save candidate. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Helpers ---
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleFilterChange = (key: string, value: string) => {
    if (key === "ctcMax" || key === "ctcMin") {
      const numValue = value === "" ? "" : Number(value);
      setFilters((prev) => ({ ...prev, [key]: numValue }));
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const clearFilters = () => {
    setFilters({ ctcMin: "", ctcMax: "", city: "", organization: "", designation: "" });
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingCandidate(null);
    setFormData({
      name: "", email: "", phone: "", resumeFile: null,
      currentDesignation: "", currentOrganization: "",
      currentCTC: "", expectedCTC: "", city: "", noticePeriod: "",
      pipelineStatus: "Available", education: "", gender: "",
      openToRelocation: false, engagementType: "Full-time",
      specialComments: "", recruiter: recruiter,
      positionHistory: [], documents: [],
    });
  };

  const handleEditCandidate = (candidate: any) => {
    setEditingCandidate(candidate);
    setFormData(candidate);
    setShowAddForm(true);
  };

  const handleUpdateCandidate = (candidate: any) => {
    setEditingCandidate(candidate);
    setFormData(candidate);
    setShowAddForm(true);
  };

  const handleCreateCandidate = (email: string) => {
    setEditingCandidate(null);
    setFormData({
      name: "", email, phone: "", resumeFile: null,
      currentDesignation: "", currentOrganization: "",
      currentCTC: "", expectedCTC: "", city: "", noticePeriod: "",
      pipelineStatus: "Available", education: "", gender: "",
      openToRelocation: false, engagementType: "Full-time",
      specialComments: "", recruiter: recruiter,
      positionHistory: [], documents: [],
    });
    setShowAddForm(true);
  };

  // --- Render: Detail View ---
  if (candidateId && selectedCandidate) {
    return (
      <CandidateDetails
        candidate={selectedCandidate}
        onBack={handleBack}
        onSaveDetails={handleSaveDetails}
        onUploadDocument={handleUploadDocument}
        onDeleteDocument={handleDeleteDocument}
        formatCurrency={formatCurrency}
        onPrev={currentIndex > 0 ? handlePrev : undefined}
        onNext={currentIndex < candidates.length - 1 ? handleNext : undefined}
        currentIndex={currentIndex}
        totalCandidates={candidates.length}
      />
    );
  }

  // --- Render: List View ---
  return (
    <>
      <div className="min-h-screen bg-white">
        <Header />

        <main className="md:ml-16 px-6 py-4">
          {/* Search + Filter + Add — single row */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search candidates by name, email, phone, designation, organization, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-colors whitespace-nowrap ${
                showFilters
                  ? "border-teal-500 bg-teal-50 text-teal-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Add Candidate
            </button>
          </div>

          {searchQuery && (
            <div className="mb-3 text-sm text-gray-600">
              Showing {candidates.length} candidate
              {candidates.length !== 1 ? "s" : ""} matching "{searchQuery}"
            </div>
          )}

          {showFilters && (
            <CandidateFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          )}

          <CandidateTable
            candidates={candidates}
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            candidatesPerPage={candidatesPerPage}
            onPageChange={setCurrentPage}
            onSelectCandidate={handleSelectCandidate}
            formatCurrency={formatCurrency}
          />
        </main>

        {showAddForm && (
          <AddCandidateModal
            editingCandidate={editingCandidate}
            formData={formData}
            isSubmitting={isSubmitting}
            onFormChange={setFormData}
            onSubmit={handleFormSubmit}
            onClose={resetForm}
            onSearchCandidate={() => {}}
            onUpdateCandidate={handleUpdateCandidate}
            onCreateCandidate={handleCreateCandidate}
            candidates={candidates}
          />
        )}
      </div>
    </>
  );
};

export default CandidateManagement;