// // import { useState } from "react";
// // import { Search, Plus, Edit, X, Upload, FileText } from "lucide-react";
// // import Select from "react-select";
// // import { educationOptions, cityOptions } from "../../constants/dropdown";

// // interface AddCandidateModalProps {
// //   editingCandidate: any;
// //   formData: any;
// //   isSubmitting: boolean;
// //   onFormChange: (data: any) => void;
// //   onSubmit: () => void;
// //   onClose: () => void;
// //   onSearchCandidate: (email: string) => any;
// //   onUpdateCandidate: (candidate: any) => void;
// //   onCreateCandidate: (email: string) => void;
// //   candidates: any[];
// // }

// // const AddCandidateModal = ({
// //   editingCandidate,
// //   formData,
// //   isSubmitting,
// //   onFormChange,
// //   onSubmit,
// //   onClose,
// //   onSearchCandidate,
// //   onUpdateCandidate,
// //   onCreateCandidate,
// //   candidates,
// // }: AddCandidateModalProps) => {
// //   const [searchEmail, setSearchEmail] = useState("");
// //   const [searchResult, setSearchResult] = useState<any>(null);
// //   const [resumePreview, setResumePreview] = useState<string | null>(null);

// //   const handleSearchCandidate = () => {
// //     if (!searchEmail.trim()) return;

// //     const existingCandidate = candidates.find(
// //       (c) => c.email?.toLowerCase() === searchEmail.toLowerCase()
// //     );
// //     setSearchResult({
// //       email: searchEmail,
// //       exists: !!existingCandidate,
// //       candidate: existingCandidate,
// //     });
// //   };

// //   const handleUpdateCandidate = () => {
// //     if (searchResult?.candidate) {
// //       onUpdateCandidate(searchResult.candidate);
// //       setSearchResult(null);
// //       setSearchEmail("");
// //     }
// //   };

// //   const handleCreateCandidate = () => {
// //     onCreateCandidate(searchResult?.email ?? searchEmail ?? "");
// //     setSearchResult(null);
// //     setSearchEmail("");
// //   };

// //   const handleClose = () => {
// //     setSearchResult(null);
// //     setSearchEmail("");
// //     setResumePreview(null);
// //     onClose();
// //   };

// //   const updateField = (field: string, value: any) => {
// //     onFormChange({ ...formData, [field]: value });
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// //         <div className="flex justify-between items-center p-6 border-b border-gray-200">
// //           <h2 className="text-xl font-bold text-gray-900">
// //             {editingCandidate ? "Update Candidate" : "Add New Candidate"}
// //           </h2>
// //           <button
// //             onClick={handleClose}
// //             className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
// //           >
// //             <X className="w-5 h-5" />
// //           </button>
// //         </div>

// //         {/* Email Search Section - Only show when adding new candidate */}
// //         {!editingCandidate && (
// //           <div className="p-6 border-b border-gray-200 bg-gray-50">
// //             <h3 className="text-lg font-medium text-gray-900 mb-4">
// //               Search for Existing Candidate
// //             </h3>
// //             <div className="space-y-3">
// //               <div className="flex gap-3">
// //                 <div className="flex-1">
// //                   <input
// //                     type="email"
// //                     placeholder="Enter candidate email..."
// //                     value={searchEmail}
// //                     onChange={(e) => setSearchEmail(e.target.value)}
// //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   />
// //                 </div>
// //                 <button
// //                   onClick={handleSearchCandidate}
// //                   disabled={!searchEmail.trim()}
// //                   className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
// //                 >
// //                   <Search className="w-4 h-4" />
// //                   Search
// //                 </button>
// //               </div>

// //               {/* Search Result */}
// //               {searchResult && (
// //                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
// //                   {searchResult.exists ? (
// //                     <div className="flex items-center justify-between">
// //                       <div>
// //                         <p className="text-blue-800 font-medium">
// //                           Candidate found: {searchResult.candidate?.name}
// //                         </p>
// //                         <p className="text-blue-600 text-sm">
// //                           {searchResult.email}
// //                         </p>
// //                       </div>
// //                       <button
// //                         onClick={handleUpdateCandidate}
// //                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
// //                       >
// //                         <Edit className="w-4 h-4" />
// //                         Update Details
// //                       </button>
// //                     </div>
// //                   ) : (
// //                     <div className="flex items-center justify-between">
// //                       <div>
// //                         <p className="text-blue-800 font-medium">
// //                           No candidate found with this email
// //                         </p>
// //                         <p className="text-blue-600 text-sm">
// //                           {searchResult.email}
// //                         </p>
// //                       </div>
// //                       <button
// //                         onClick={handleCreateCandidate}
// //                         className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
// //                       >
// //                         <Plus className="w-4 h-4" />
// //                         Create Candidate
// //                       </button>
// //                     </div>
// //                   )}
// //                   <button
// //                     onClick={() => setSearchResult(null)}
// //                     className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
// //                   >
// //                     Clear
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         <div className="p-6 space-y-4">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Name *
// //               </label>
// //               <input
// //                 type="text"
// //                 required
// //                 value={formData.name}
// //                 onChange={(e) => updateField("name", e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Email *
// //               </label>
// //               <input
// //                 type="email"
// //                 required
// //                 value={formData.email}
// //                 onChange={(e) => updateField("email", e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Phone
// //               </label>
// //               <input
// //                 type="tel"
// //                 value={formData.phone}
// //                 onChange={(e) => updateField("phone", e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Upload Resume
// //               </label>
// //               <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
// //                 <div className="space-y-1 text-center">
// //                   <Upload className="mx-auto h-8 w-8 text-gray-400" />
// //                   <div className="flex text-sm text-gray-600">
// //                     <label
// //                       htmlFor="resume-upload"
// //                       className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
// //                     >
// //                       <span>Upload resume</span>
// //                       <input
// //                         id="resume-upload"
// //                         type="file"
// //                         className="sr-only"
// //                         accept=".pdf,.doc,.docx"
// //                         onChange={(e) => {
// //                           const file = e.target.files?.[0] || null;
// //                           if (file) {
// //                             updateField("resumeFile", file);
// //                             setResumePreview(file.name);
// //                           }
// //                         }}
// //                       />
// //                     </label>
// //                     <p className="pl-1">or drag and drop</p>
// //                   </div>
// //                   <p className="text-xs text-gray-500">
// //                     PDF, DOC, DOCX up to 10MB
// //                   </p>
// //                 </div>
// //               </div>
// //               {resumePreview && (
// //                 <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
// //                   <FileText className="w-4 h-4" />
// //                   <span>{resumePreview}</span>
// //                 </div>
// //               )}
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Current Designation
// //               </label>
// //               <input
// //                 type="text"
// //                 value={formData.currentDesignation}
// //                 onChange={(e) =>
// //                   updateField("currentDesignation", e.target.value)
// //                 }
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Current Organization
// //               </label>
// //               <input
// //                 type="text"
// //                 value={formData.currentOrganization}
// //                 onChange={(e) =>
// //                   updateField("currentOrganization", e.target.value)
// //                 }
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Current CTC (₹) *
// //               </label>
// //               <input
// //                 type="number"
// //                 required
// //                 value={formData.currentCTC}
// //                 onChange={(e) => updateField("currentCTC", e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Expected CTC (₹) *
// //               </label>
// //               <input
// //                 type="number"
// //                 required
// //                 value={formData.expectedCTC}
// //                 onChange={(e) => updateField("expectedCTC", e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 City
// //               </label>
// //               <Select
// //                 options={cityOptions}
// //                 isSearchable
// //                 isClearable
// //                 placeholder="Select city..."
// //                 value={
// //                   cityOptions.find((opt) => opt.value === formData.city) || null
// //                 }
// //                 onChange={(
// //                   selected: { value: string; label: string } | null
// //                 ) => updateField("city", selected ? selected.value : "")}
// //                 getOptionLabel={(opt) => opt.label}
// //                 getOptionValue={(opt) => opt.value}
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Notice Period (days) *
// //               </label>
// //               <input
// //                 type="number"
// //                 required
// //                 value={formData.noticePeriod}
// //                 onChange={(e) => updateField("noticePeriod", e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Education
// //               </label>
// //               <Select
// //                 options={educationOptions}
// //                 isSearchable
// //                 isClearable
// //                 placeholder="Select education..."
// //                 value={
// //                   educationOptions.find(
// //                     (opt) => opt.value === formData.education
// //                   ) || null
// //                 }
// //                 onChange={(
// //                   selected: { value: string; label: string } | null
// //                 ) => updateField("education", selected ? selected.value : "")}
// //                 getOptionLabel={(opt) => opt.label}
// //                 getOptionValue={(opt) => opt.value}
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Gender
// //               </label>
// //               <select
// //                 value={formData.gender}
// //                 onChange={(e) => updateField("gender", e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //               >
// //                 <option value="">Select Gender</option>
// //                 <option value="Male">Male</option>
// //                 <option value="Female">Female</option>
// //                 <option value="Other">Other</option>
// //                 <option value="Prefer not to say">Prefer not to say</option>
// //               </select>
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Engagement Type
// //               </label>
// //               <select
// //                 value={formData.engagementType}
// //                 onChange={(e) => updateField("engagementType", e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //               >
// //                 <option value="Full-time">Full-time</option>
// //                 <option value="Part-time">Part-time</option>
// //                 <option value="Contract">Contract</option>
// //                 <option value="Freelance">Freelance</option>
// //               </select>
// //             </div>

// //             <div className="md:col-span-2">
// //               <label className="flex items-center gap-2">
// //                 <input
// //                   type="checkbox"
// //                   checked={formData.openToRelocation}
// //                   onChange={(e) =>
// //                     updateField("openToRelocation", e.target.checked)
// //                   }
// //                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
// //                 />
// //                 <span className="text-sm font-medium text-gray-700">
// //                   Open to Relocation
// //                 </span>
// //               </label>
// //             </div>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Special Comments
// //             </label>
// //             <textarea
// //               value={formData.specialComments}
// //               onChange={(e) => updateField("specialComments", e.target.value)}
// //               rows={3}
// //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Recruiter
// //             </label>
// //             <input
// //               type="text"
// //               value={formData.recruiter}
// //               readOnly
// //               className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
// //             />
// //           </div>

// //           <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
// //             <button
// //               type="button"
// //               onClick={handleClose}
// //               className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="button"
// //               onClick={onSubmit}
// //               disabled={isSubmitting}
// //               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
// //             >
// //               {isSubmitting
// //                 ? "Saving..."
// //                 : editingCandidate
// //                 ? "Update Candidate"
// //                 : "Add Candidate"}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddCandidateModal;





// // import { useState } from "react";
// // import { Search, Plus, Edit, X, Upload, FileText } from "lucide-react";
// // import Select from "react-select";
// // import { educationOptions, cityOptions } from "../../constants/dropdown";

// // interface AddCandidateModalProps {
// //   editingCandidate: any;
// //   formData: any;
// //   isSubmitting: boolean;
// //   onFormChange: (data: any) => void;
// //   onSubmit: () => void;
// //   onClose: () => void;
// //   onSearchCandidate: (email: string) => any;
// //   onUpdateCandidate: (candidate: any) => void;
// //   onCreateCandidate: (email: string) => void;
// //   candidates: any[];
// // }

// // const AddCandidateModal = ({
// //   editingCandidate,
// //   formData,
// //   isSubmitting,
// //   onFormChange,
// //   onSubmit,
// //   onClose,
// //   onSearchCandidate,
// //   onUpdateCandidate,
// //   onCreateCandidate,
// //   candidates,
// // }: AddCandidateModalProps) => {
// //   const [searchEmail, setSearchEmail] = useState("");
// //   const [searchResult, setSearchResult] = useState<any>(null);
// //   const [resumePreview, setResumePreview] = useState<string | null>(null);

// //   const handleSearchCandidate = () => {
// //     if (!searchEmail.trim()) return;

// //     const existingCandidate = candidates.find(
// //       (c) => c.email?.toLowerCase() === searchEmail.toLowerCase()
// //     );
// //     setSearchResult({
// //       email: searchEmail,
// //       exists: !!existingCandidate,
// //       candidate: existingCandidate,
// //     });
// //   };

// //   const handleUpdateCandidate = () => {
// //     if (searchResult?.candidate) {
// //       onUpdateCandidate(searchResult.candidate);
// //       setSearchResult(null);
// //       setSearchEmail("");
// //     }
// //   };

// //   const handleCreateCandidate = () => {
// //     onCreateCandidate(searchResult?.email ?? searchEmail ?? "");
// //     setSearchResult(null);
// //     setSearchEmail("");
// //   };

// //   const handleClose = () => {
// //     setSearchResult(null);
// //     setSearchEmail("");
// //     setResumePreview(null);
// //     onClose();
// //   };

// //   const updateField = (field: string, value: any) => {
// //     onFormChange({ ...formData, [field]: value });
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// //         <div className="flex justify-between items-center p-6 border-b border-gray-200">
// //           <h2 className="text-xl font-bold text-gray-900">
// //             {editingCandidate ? "Update Candidate" : "Add New Candidate"}
// //           </h2>
// //           <button
// //             onClick={handleClose}
// //             className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
// //           >
// //             <X className="w-5 h-5" />
// //           </button>
// //         </div>

// //         {/* Email Search Section - Only show when adding new candidate */}
// //         {!editingCandidate && (
// //           <div className="p-6 border-b border-gray-200 bg-gray-50">
// //             <h3 className="text-lg font-medium text-gray-900 mb-4">
// //               Search for Existing Candidate
// //             </h3>
// //             <div className="space-y-3">
// //               <div className="flex gap-3">
// //                 <div className="flex-1">
// //                   <input
// //                     type="email"
// //                     placeholder="Enter candidate email..."
// //                     value={searchEmail}
// //                     onChange={(e) => setSearchEmail(e.target.value)}
// //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //                   />
// //                 </div>
// //                 <button
// //                   onClick={handleSearchCandidate}
// //                   disabled={!searchEmail.trim()}
// //                   className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
// //                 >
// //                   <Search className="w-4 h-4" />
// //                   Search
// //                 </button>
// //               </div>

// //               {/* Search Result */}
// //               {searchResult && (
// //                 <div className="bg-green-50 border border-green-200 rounded-lg p-4">
// //                   {searchResult.exists ? (
// //                     <div className="flex items-center justify-between">
// //                       <div>
// //                         <p className="text-green-800 font-medium">
// //                           Candidate found: {searchResult.candidate?.name}
// //                         </p>
// //                         <p className="text-green-600 text-sm">
// //                           {searchResult.email}
// //                         </p>
// //                       </div>
// //                       <button
// //                         onClick={handleUpdateCandidate}
// //                         className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
// //                       >
// //                         <Edit className="w-4 h-4" />
// //                         Update Details
// //                       </button>
// //                     </div>
// //                   ) : (
// //                     <div className="flex items-center justify-between">
// //                       <div>
// //                         <p className="text-green-800 font-medium">
// //                           No candidate found with this email
// //                         </p>
// //                         <p className="text-green-600 text-sm">
// //                           {searchResult.email}
// //                         </p>
// //                       </div>
// //                       <button
// //                         onClick={handleCreateCandidate}
// //                         className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
// //                       >
// //                         <Plus className="w-4 h-4" />
// //                         Create Candidate
// //                       </button>
// //                     </div>
// //                   )}
// //                   <button
// //                     onClick={() => setSearchResult(null)}
// //                     className="mt-2 text-green-600 hover:text-green-800 text-sm"
// //                   >
// //                     Clear
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         <div className="p-6 space-y-4">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Name *
// //               </label>
// //               <input
// //                 type="text"
// //                 required
// //                 value={formData.name}
// //                 onChange={(e) => updateField("name", e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Email *
// //               </label>
// //               <input
// //                 type="email"
// //                 required
// //                 value={formData.email}
// //                 onChange={(e) => updateField("email", e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Phone
// //               </label>
// //               <input
// //                 type="tel"
// //                 value={formData.phone}
// //                 onChange={(e) => updateField("phone", e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Upload Resume
// //               </label>
// //               <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
// //                 <div className="space-y-1 text-center">
// //                   <Upload className="mx-auto h-8 w-8 text-gray-400" />
// //                   <div className="flex text-sm text-gray-600">
// //                     <label
// //                       htmlFor="resume-upload"
// //                       className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500"
// //                     >
// //                       <span>Upload resume</span>
// //                       <input
// //                         id="resume-upload"
// //                         type="file"
// //                         className="sr-only"
// //                         accept=".pdf,.doc,.docx"
// //                         onChange={(e) => {
// //                           const file = e.target.files?.[0] || null;
// //                           if (file) {
// //                             updateField("resumeFile", file);
// //                             setResumePreview(file.name);
// //                           }
// //                         }}
// //                       />
// //                     </label>
// //                     <p className="pl-1">or drag and drop</p>
// //                   </div>
// //                   <p className="text-xs text-gray-500">
// //                     PDF, DOC, DOCX up to 10MB
// //                   </p>
// //                 </div>
// //               </div>
// //               {resumePreview && (
// //                 <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
// //                   <FileText className="w-4 h-4" />
// //                   <span>{resumePreview}</span>
// //                 </div>
// //               )}
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Current Designation
// //               </label>
// //               <input
// //                 type="text"
// //                 value={formData.currentDesignation}
// //                 onChange={(e) =>
// //                   updateField("currentDesignation", e.target.value)
// //                 }
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Current Organization
// //               </label>
// //               <input
// //                 type="text"
// //                 value={formData.currentOrganization}
// //                 onChange={(e) =>
// //                   updateField("currentOrganization", e.target.value)
// //                 }
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Current CTC (₹) *
// //               </label>
// //               <input
// //                 type="number"
// //                 required
// //                 value={formData.currentCTC}
// //                 onChange={(e) => updateField("currentCTC", e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Expected CTC (₹) *
// //               </label>
// //               <input
// //                 type="number"
// //                 required
// //                 value={formData.expectedCTC}
// //                 onChange={(e) => updateField("expectedCTC", e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 City
// //               </label>
// //               <Select
// //                 options={cityOptions}
// //                 isSearchable
// //                 isClearable
// //                 placeholder="Select city..."
// //                 value={
// //                   cityOptions.find((opt) => opt.value === formData.city) || null
// //                 }
// //                 onChange={(
// //                   selected: { value: string; label: string } | null
// //                 ) => updateField("city", selected ? selected.value : "")}
// //                 getOptionLabel={(opt) => opt.label}
// //                 getOptionValue={(opt) => opt.value}
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Notice Period (days) *
// //               </label>
// //               <input
// //                 type="number"
// //                 required
// //                 value={formData.noticePeriod}
// //                 onChange={(e) => updateField("noticePeriod", e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Education
// //               </label>
// //               <Select
// //                 options={educationOptions}
// //                 isSearchable
// //                 isClearable
// //                 placeholder="Select education..."
// //                 value={
// //                   educationOptions.find(
// //                     (opt) => opt.value === formData.education
// //                   ) || null
// //                 }
// //                 onChange={(
// //                   selected: { value: string; label: string } | null
// //                 ) => updateField("education", selected ? selected.value : "")}
// //                 getOptionLabel={(opt) => opt.label}
// //                 getOptionValue={(opt) => opt.value}
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Gender
// //               </label>
// //               <select
// //                 value={formData.gender}
// //                 onChange={(e) => updateField("gender", e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //               >
// //                 <option value="">Select Gender</option>
// //                 <option value="Male">Male</option>
// //                 <option value="Female">Female</option>
// //                 <option value="Other">Other</option>
// //                 <option value="Prefer not to say">Prefer not to say</option>
// //               </select>
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Engagement Type
// //               </label>
// //               <select
// //                 value={formData.engagementType}
// //                 onChange={(e) => updateField("engagementType", e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //               >
// //                 <option value="Full-time">Full-time</option>
// //                 <option value="Part-time">Part-time</option>
// //                 <option value="Contract">Contract</option>
// //                 <option value="Freelance">Freelance</option>
// //               </select>
// //             </div>

// //             <div className="md:col-span-2">
// //               <label className="flex items-center gap-2">
// //                 <input
// //                   type="checkbox"
// //                   checked={formData.openToRelocation}
// //                   onChange={(e) =>
// //                     updateField("openToRelocation", e.target.checked)
// //                   }
// //                   className="rounded border-gray-300 text-green-600 focus:ring-green-500"
// //                 />
// //                 <span className="text-sm font-medium text-gray-700">
// //                   Open to Relocation
// //                 </span>
// //               </label>
// //             </div>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Special Comments
// //             </label>
// //             <textarea
// //               value={formData.specialComments}
// //               onChange={(e) => updateField("specialComments", e.target.value)}
// //               rows={3}
// //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Recruiter
// //             </label>
// //             <input
// //               type="text"
// //               value={formData.recruiter}
// //               readOnly
// //               className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
// //             />
// //           </div>

// //           <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
// //             <button
// //               type="button"
// //               onClick={handleClose}
// //               className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="button"
// //               onClick={onSubmit}
// //               disabled={isSubmitting}
// //               className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
// //             >
// //               {isSubmitting
// //                 ? "Saving..."
// //                 : editingCandidate
// //                 ? "Update Candidate"
// //                 : "Add Candidate"}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddCandidateModal;



// import { useState } from "react";
// import { Search, Plus, Edit, X, Upload, FileText } from "lucide-react";
// import Select from "react-select";
// import FilterSelect from "../FilterSelect";
// import { educationOptions, cityOptions } from "../../constants/dropdown";

// interface AddCandidateModalProps {
//   editingCandidate: any;
//   formData: any;
//   isSubmitting: boolean;
//   onFormChange: (data: any) => void;
//   onSubmit: () => void;
//   onClose: () => void;
//   onSearchCandidate: (email: string) => any;
//   onUpdateCandidate: (candidate: any) => void;
//   onCreateCandidate: (email: string) => void;
//   candidates: any[];
// }

// /* ------------------------------------------------------------------ */
// /* Shared styling                                                      */
// /* ------------------------------------------------------------------ */

// const inputClass =
//   "w-full h-10 px-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition";

// const labelClass = "block text-sm font-medium text-gray-700 mb-1";

// // react-select (searchable lists) — teal, 40px, menu rendered above the modal
// const selectStyles = {
//   control: (base: any, state: any) => ({
//     ...base,
//     minHeight: "40px",
//     borderRadius: "0.5rem",
//     fontSize: "0.875rem",
//     borderColor: state.isFocused ? "#14b8a6" : "#d1d5db",
//     boxShadow: state.isFocused ? "0 0 0 2px rgba(20, 184, 166, 0.3)" : "none",
//     "&:hover": { borderColor: "#14b8a6" },
//   }),
//   placeholder: (base: any) => ({ ...base, color: "#9ca3af" }),
//   menu: (base: any) => ({ ...base, fontSize: "0.875rem" }),
//   menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
//   option: (base: any, state: any) => ({
//     ...base,
//     backgroundColor: state.isSelected ? "#0d9488" : state.isFocused ? "#f0fdfa" : "white",
//     color: state.isSelected ? "white" : "#374151",
//     "&:active": { backgroundColor: "#ccfbf1" },
//   }),
// };

// const GENDER_OPTIONS = [
//   { value: "", label: "Select gender" },
//   { value: "Male", label: "Male" },
//   { value: "Female", label: "Female" },
//   { value: "Other", label: "Other" },
//   { value: "Prefer not to say", label: "Prefer not to say" },
// ];

// const ENGAGEMENT_OPTIONS = [
//   { value: "", label: "Select type" },
//   { value: "Full-time", label: "Full-time" },
//   { value: "Part-time", label: "Part-time" },
//   { value: "Contract", label: "Contract" },
//   { value: "Freelance", label: "Freelance" },
// ];

// /* ------------------------------------------------------------------ */
// /* Modal                                                               */
// /* ------------------------------------------------------------------ */

// const AddCandidateModal = ({
//   editingCandidate,
//   formData,
//   isSubmitting,
//   onFormChange,
//   onSubmit,
//   onClose,
//   onUpdateCandidate,
//   onCreateCandidate,
//   candidates,
// }: AddCandidateModalProps) => {
//   const [searchEmail, setSearchEmail] = useState("");
//   const [searchResult, setSearchResult] = useState<any>(null);
//   const [resumePreview, setResumePreview] = useState<string | null>(null);

//   const handleSearchCandidate = () => {
//     if (!searchEmail.trim()) return;

//     const existingCandidate = candidates.find(
//       (c) => c.email?.toLowerCase() === searchEmail.trim().toLowerCase()
//     );
//     setSearchResult({
//       email: searchEmail.trim(),
//       exists: !!existingCandidate,
//       candidate: existingCandidate,
//     });
//   };

//   const handleUpdateCandidate = () => {
//     if (searchResult?.candidate) {
//       onUpdateCandidate(searchResult.candidate);
//       setSearchResult(null);
//       setSearchEmail("");
//     }
//   };

//   const handleCreateCandidate = () => {
//     onCreateCandidate(searchResult?.email ?? searchEmail ?? "");
//     setSearchResult(null);
//     setSearchEmail("");
//   };

//   const handleClose = () => {
//     setSearchResult(null);
//     setSearchEmail("");
//     setResumePreview(null);
//     onClose();
//   };

//   const updateField = (field: string, value: any) => {
//     onFormChange({ ...formData, [field]: value });
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center sm:p-4 z-50">
//       <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden">
//         {/* Header */}
//         <div className="shrink-0 flex justify-between items-center px-5 sm:px-6 py-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900">
//             {editingCandidate ? "Update Candidate" : "Add New Candidate"}
//           </h2>
//           <button
//             onClick={handleClose}
//             aria-label="Close"
//             className="h-8 w-8 grid place-items-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           {/* Email search — only when adding a new candidate */}
//           {!editingCandidate && (
//             <div className="px-5 sm:px-6 py-5 border-b border-gray-200 bg-gray-50">
//               <h3 className="text-sm font-semibold text-gray-900 mb-1">
//                 Search for an existing candidate
//               </h3>
//               <p className="text-xs text-gray-500 mb-3">
//                 Check by email first so you don't create a duplicate.
//               </p>

//               <div className="flex gap-3">
//                 <div className="relative flex-1">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//                   <input
//                     type="email"
//                     placeholder="candidate@email.com"
//                     value={searchEmail}
//                     onChange={(e) => setSearchEmail(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && handleSearchCandidate()}
//                     className={`${inputClass} pl-9`}
//                   />
//                 </div>
//                 <button
//                   onClick={handleSearchCandidate}
//                   disabled={!searchEmail.trim()}
//                   className="h-10 px-5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Search
//                 </button>
//               </div>

//               {searchResult && (
//                 <div className="mt-3 bg-white border border-teal-200 rounded-lg p-4">
//                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//                     <div className="min-w-0">
//                       <p className="text-sm font-medium text-gray-900">
//                         {searchResult.exists
//                           ? `Candidate found: ${searchResult.candidate?.name}`
//                           : "No candidate found with this email"}
//                       </p>
//                       <p className="text-xs text-gray-500 truncate">{searchResult.email}</p>
//                     </div>
//                     <div className="flex items-center gap-2 shrink-0">
//                       <button
//                         onClick={() => setSearchResult(null)}
//                         className="h-9 px-3 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
//                       >
//                         Clear
//                       </button>
//                       {searchResult.exists ? (
//                         <button
//                           onClick={handleUpdateCandidate}
//                           className="h-9 px-4 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors inline-flex items-center gap-2"
//                         >
//                           <Edit className="w-4 h-4" />
//                           Update details
//                         </button>
//                       ) : (
//                         <button
//                           onClick={handleCreateCandidate}
//                           className="h-9 px-4 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors inline-flex items-center gap-2"
//                         >
//                           <Plus className="w-4 h-4" />
//                           Create candidate
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Form */}
//           <div className="px-5 sm:px-6 py-5 space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
//               <div>
//                 <label className={labelClass}>
//                   Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={(e) => updateField("name", e.target.value)}
//                   placeholder="e.g. Rajesh Sharma"
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>
//                   Email <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) => updateField("email", e.target.value)}
//                   placeholder="name@email.com"
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Phone</label>
//                 <input
//                   type="tel"
//                   value={formData.phone}
//                   onChange={(e) => updateField("phone", e.target.value)}
//                   placeholder="+91 98765 43210"
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>City</label>
//                 <Select
//                   options={cityOptions}
//                   isSearchable
//                   isClearable
//                   placeholder="Select city..."
//                   value={cityOptions.find((opt) => opt.value === formData.city) || null}
//                   onChange={(selected: { value: string; label: string } | null) =>
//                     updateField("city", selected ? selected.value : "")
//                   }
//                   menuPortalTarget={document.body}
//                   menuPosition="fixed"
//                   styles={selectStyles}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Current designation</label>
//                 <input
//                   type="text"
//                   value={formData.currentDesignation}
//                   onChange={(e) => updateField("currentDesignation", e.target.value)}
//                   placeholder="e.g. Product Manager"
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Current organization</label>
//                 <input
//                   type="text"
//                   value={formData.currentOrganization}
//                   onChange={(e) => updateField("currentOrganization", e.target.value)}
//                   placeholder="e.g. TCS"
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>
//                   Current CTC (₹) <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   required
//                   value={formData.currentCTC}
//                   onChange={(e) => updateField("currentCTC", e.target.value)}
//                   placeholder="e.g. 1500000"
//                   className={`${inputClass} no-spinner`}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>
//                   Expected CTC (₹) <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   required
//                   value={formData.expectedCTC}
//                   onChange={(e) => updateField("expectedCTC", e.target.value)}
//                   placeholder="e.g. 2000000"
//                   className={`${inputClass} no-spinner`}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>
//                   Notice period (days) <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   required
//                   value={formData.noticePeriod}
//                   onChange={(e) => updateField("noticePeriod", e.target.value)}
//                   placeholder="e.g. 30"
//                   className={`${inputClass} no-spinner`}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Education</label>
//                 <Select
//                   options={educationOptions}
//                   isSearchable
//                   isClearable
//                   placeholder="Select education..."
//                   value={educationOptions.find((opt) => opt.value === formData.education) || null}
//                   onChange={(selected: { value: string; label: string } | null) =>
//                     updateField("education", selected ? selected.value : "")
//                   }
//                   menuPortalTarget={document.body}
//                   menuPosition="fixed"
//                   styles={selectStyles}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Gender</label>
//                 <FilterSelect
//                   ariaLabel="Gender"
//                   className="w-full"
//                   value={formData.gender || ""}
//                   onChange={(value) => updateField("gender", value)}
//                   options={GENDER_OPTIONS}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Engagement type</label>
//                 <FilterSelect
//                   ariaLabel="Engagement type"
//                   className="w-full"
//                   value={formData.engagementType || ""}
//                   onChange={(value) => updateField("engagementType", value)}
//                   options={ENGAGEMENT_OPTIONS}
//                 />
//               </div>

//               {/* Resume — full width */}
//               <div className="md:col-span-2">
//                 <label className={labelClass}>Resume</label>
//                 <label
//                   htmlFor="resume-upload"
//                   className="flex cursor-pointer items-center gap-4 rounded-lg border-2 border-dashed border-gray-300 px-4 py-4 transition-colors hover:border-teal-400 hover:bg-teal-50/40"
//                 >
//                   <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-600">
//                     {resumePreview ? <FileText className="h-5 w-5" /> : <Upload className="h-5 w-5" />}
//                   </span>
//                   <span className="min-w-0">
//                     <span className="block truncate text-sm font-medium text-gray-900">
//                       {resumePreview || "Click to upload resume"}
//                     </span>
//                     <span className="block text-xs text-gray-500">
//                       {resumePreview ? "Click to replace" : "PDF, DOC or DOCX, up to 10MB"}
//                     </span>
//                   </span>
//                   <input
//                     id="resume-upload"
//                     type="file"
//                     className="sr-only"
//                     accept=".pdf,.doc,.docx"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0] || null;
//                       if (file) {
//                         updateField("resumeFile", file);
//                         setResumePreview(file.name);
//                       }
//                     }}
//                   />
//                 </label>
//               </div>

//               <div className="md:col-span-2">
//                 <label className="inline-flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={formData.openToRelocation}
//                     onChange={(e) => updateField("openToRelocation", e.target.checked)}
//                     className="h-4 w-4 rounded border-gray-300 accent-teal-600"
//                   />
//                   <span className="text-sm font-medium text-gray-700">Open to relocation</span>
//                 </label>
//               </div>
//             </div>

//             <div>
//               <label className={labelClass}>Special comments</label>
//               <textarea
//                 value={formData.specialComments}
//                 onChange={(e) => updateField("specialComments", e.target.value)}
//                 rows={3}
//                 placeholder="Anything the client or team should know..."
//                 className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-y"
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Recruiter</label>
//               <input
//                 type="text"
//                 value={formData.recruiter}
//                 readOnly
//                 className={`${inputClass} bg-gray-50 text-gray-600`}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="shrink-0 flex justify-end gap-3 px-5 sm:px-6 py-3.5 border-t border-gray-200 bg-white">
//           <button
//             type="button"
//             onClick={handleClose}
//             className="h-10 px-4 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={onSubmit}
//             disabled={isSubmitting}
//             className="h-10 px-6 text-sm font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
//           >
//             {isSubmitting ? "Saving..." : editingCandidate ? "Update Candidate" : "Add Candidate"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCandidateModal;




import { useState, useRef, useEffect, useCallback } from "react";
import { Search, Plus, Edit, X, Upload, FileText, Loader2 } from "lucide-react";
import Select from "react-select";
import FilterSelect from "../FilterSelect";
import { educationOptions, cityOptions } from "../../constants/dropdown";
import { applicantService } from "../../services/applicantService";

interface AddCandidateModalProps {
  editingCandidate: any;
  formData: any;
  isSubmitting: boolean;
  onFormChange: (data: any) => void;
  onSubmit: () => void;
  onClose: () => void;
  onSearchCandidate: (email: string) => any;
  onUpdateCandidate: (candidate: any) => void;
  onCreateCandidate: (email: string) => void;
  candidates: any[];
}

/* ------------------------------------------------------------------ */
/* Shared styling                                                      */
/* ------------------------------------------------------------------ */

const inputClass =
  "w-full h-10 px-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition";

const labelClass = "block text-sm font-medium text-gray-700 mb-1";

// react-select (searchable lists) — teal, 40px, menu rendered above the modal
const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: "40px",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    borderColor: state.isFocused ? "#14b8a6" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(20, 184, 166, 0.3)" : "none",
    "&:hover": { borderColor: "#14b8a6" },
  }),
  placeholder: (base: any) => ({ ...base, color: "#9ca3af" }),
  menu: (base: any) => ({ ...base, fontSize: "0.875rem" }),
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected ? "#0d9488" : state.isFocused ? "#f0fdfa" : "white",
    color: state.isSelected ? "white" : "#374151",
    "&:active": { backgroundColor: "#ccfbf1" },
  }),
};

const GENDER_OPTIONS = [
  { value: "", label: "Select gender" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

const ENGAGEMENT_OPTIONS = [
  { value: "", label: "Select type" },
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Freelance", label: "Freelance" },
];

/* ------------------------------------------------------------------ */
/* Modal                                                               */
/* ------------------------------------------------------------------ */

const AddCandidateModal = ({
  editingCandidate,
  formData,
  isSubmitting,
  onFormChange,
  onSubmit,
  onClose,
  onSearchCandidate,
  onUpdateCandidate,
  onCreateCandidate,
  candidates,
}: AddCandidateModalProps) => {
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [resumePreview, setResumePreview] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleSearchInputChange = (value: string) => {
    setSearchEmail(value);

    // Debounced auto-search
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!value.trim() || value.trim().length < 2) {
      setSearchResults([]);
      setHasSearched(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    debounceRef.current = setTimeout(() => {
      performSearch(value.trim());
    }, 500);
  };

  const performSearch = async (query: string) => {
    if (!query) return;

    setIsSearching(true);
    try {
      const response = await applicantService.fetchAll(1, 10, {
        search: query,
      });
      const results = response.data.applicants || [];

      // Normalize all results — API uses "candidate" for name, "contact.email" for email
      const normalized = results.map((r: any) => ({
        ...r,
        name: r.candidate || r.name || "Unknown",
        email: r.contact?.email || r.email || "",
        phone: r.contact?.phone || r.phone || "",
        resume: r.contact?.resume || "",
      }));

      setSearchResults(normalized);
      setHasSearched(true);
    } catch (error) {
      console.error("Search candidate error:", error);
      setSearchResults([]);
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectCandidate = (candidate: any) => {
    onUpdateCandidate(candidate);
    setSearchResults([]);
    setSearchEmail("");
    setHasSearched(false);
  };

  const handleCreateCandidate = () => {
    onCreateCandidate(searchEmail.trim());
    setSearchResults([]);
    setSearchEmail("");
    setHasSearched(false);
  };

  const handleClose = () => {
    setSearchResults([]);
    setHasSearched(false);
    setSearchEmail("");
    setResumePreview(null);
    onClose();
  };

  const updateField = (field: string, value: any) => {
    onFormChange({ ...formData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center sm:p-4 z-50">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 flex justify-between items-center px-5 sm:px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {editingCandidate ? "Update Candidate" : "Add New Candidate"}
          </h2>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="h-8 w-8 grid place-items-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Email search — only when adding a new candidate */}
          {!editingCandidate && (
            <div className="px-5 sm:px-6 py-5 border-b border-gray-200 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Search for an existing candidate
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Check by name or email first so you don't create a duplicate.
              </p>

              <div className="flex gap-3">
                <div className="relative flex-1">
                  {isSearching ? (
                    <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-500 animate-spin pointer-events-none" />
                  ) : (
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  )}
                  <input
                    type="text"
                    placeholder="Search by name, email, or phone..."
                    value={searchEmail}
                    onChange={(e) => handleSearchInputChange(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && performSearch(searchEmail.trim())}
                    className={`${inputClass} pl-9`}
                  />
                </div>
                <button
                  onClick={() => performSearch(searchEmail.trim())}
                  disabled={!searchEmail.trim() || isSearching}
                  className="h-10 px-5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isSearching ? "Searching..." : "Search"}
                </button>
              </div>

              {/* Search results list */}
              {hasSearched && searchResults.length > 0 && (
                <div className="mt-3 max-h-48 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-100">
                  {searchResults.map((c: any) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleSelectCandidate(c)}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
                        <p className="text-xs text-gray-500 truncate">{c.email}</p>
                      </div>
                      <button className="shrink-0 ml-3 h-8 px-3 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100 transition-colors">
                        Select
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* No results — show Create button */}
              {hasSearched && searchResults.length === 0 && !isSearching && (
                <div className="mt-3 bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">No candidate found</p>
                      <p className="text-xs text-gray-500 truncate">{searchEmail}</p>
                    </div>
                    <button
                      onClick={handleCreateCandidate}
                      className="shrink-0 h-9 px-4 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors inline-flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Create candidate
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Form */}
          <div className="px-5 sm:px-6 py-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
              <div>
                <label className={labelClass}>
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. Rajesh Sharma"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="name@email.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>City</label>
                <Select
                  options={cityOptions}
                  isSearchable
                  isClearable
                  placeholder="Select city..."
                  value={cityOptions.find((opt) => opt.value === formData.city) || null}
                  onChange={(selected: { value: string; label: string } | null) =>
                    updateField("city", selected ? selected.value : "")
                  }
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  styles={selectStyles}
                />
              </div>

              <div>
                <label className={labelClass}>Current designation</label>
                <input
                  type="text"
                  value={formData.currentDesignation}
                  onChange={(e) => updateField("currentDesignation", e.target.value)}
                  placeholder="e.g. Product Manager"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Current organization</label>
                <input
                  type="text"
                  value={formData.currentOrganization}
                  onChange={(e) => updateField("currentOrganization", e.target.value)}
                  placeholder="e.g. TCS"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Current CTC (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={formData.currentCTC}
                  onChange={(e) => updateField("currentCTC", e.target.value)}
                  placeholder="e.g. 1500000"
                  className={`${inputClass} no-spinner`}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Expected CTC (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={formData.expectedCTC}
                  onChange={(e) => updateField("expectedCTC", e.target.value)}
                  placeholder="e.g. 2000000"
                  className={`${inputClass} no-spinner`}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Notice period (days) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={formData.noticePeriod}
                  onChange={(e) => updateField("noticePeriod", e.target.value)}
                  placeholder="e.g. 30"
                  className={`${inputClass} no-spinner`}
                />
              </div>

              <div>
                <label className={labelClass}>Education</label>
                <Select
                  options={educationOptions}
                  isSearchable
                  isClearable
                  placeholder="Select education..."
                  value={educationOptions.find((opt) => opt.value === formData.education) || null}
                  onChange={(selected: { value: string; label: string } | null) =>
                    updateField("education", selected ? selected.value : "")
                  }
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  styles={selectStyles}
                />
              </div>

              <div>
                <label className={labelClass}>Gender</label>
                <FilterSelect
                  ariaLabel="Gender"
                  className="w-full"
                  value={formData.gender || ""}
                  onChange={(value) => updateField("gender", value)}
                  options={GENDER_OPTIONS}
                />
              </div>

              <div>
                <label className={labelClass}>Engagement type</label>
                <FilterSelect
                  ariaLabel="Engagement type"
                  className="w-full"
                  value={formData.engagementType || ""}
                  onChange={(value) => updateField("engagementType", value)}
                  options={ENGAGEMENT_OPTIONS}
                />
              </div>

              {/* Resume — full width */}
              <div className="md:col-span-2">
                <label className={labelClass}>Resume</label>
                <label
                  htmlFor="resume-upload"
                  className="flex cursor-pointer items-center gap-4 rounded-lg border-2 border-dashed border-gray-300 px-4 py-4 transition-colors hover:border-teal-400 hover:bg-teal-50/40"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-600">
                    {resumePreview ? <FileText className="h-5 w-5" /> : <Upload className="h-5 w-5" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-gray-900">
                      {resumePreview || "Click to upload resume"}
                    </span>
                    <span className="block text-xs text-gray-500">
                      {resumePreview ? "Click to replace" : "PDF, DOC or DOCX, up to 10MB"}
                    </span>
                  </span>
                  <input
                    id="resume-upload"
                    type="file"
                    className="sr-only"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (file) {
                        updateField("resumeFile", file);
                        setResumePreview(file.name);
                      }
                    }}
                  />
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.openToRelocation}
                    onChange={(e) => updateField("openToRelocation", e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 accent-teal-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Open to relocation</span>
                </label>
              </div>
            </div>

            <div>
              <label className={labelClass}>Special comments</label>
              <textarea
                value={formData.specialComments}
                onChange={(e) => updateField("specialComments", e.target.value)}
                rows={3}
                placeholder="Anything the client or team should know..."
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-y"
              />
            </div>

            <div>
              <label className={labelClass}>Recruiter</label>
              <input
                type="text"
                value={formData.recruiter}
                readOnly
                className={`${inputClass} bg-gray-50 text-gray-600`}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 flex justify-end gap-3 px-5 sm:px-6 py-3.5 border-t border-gray-200 bg-white">
          <button
            type="button"
            onClick={handleClose}
            className="h-10 px-4 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="h-10 px-6 text-sm font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Saving..." : editingCandidate ? "Update Candidate" : "Add Candidate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCandidateModal;