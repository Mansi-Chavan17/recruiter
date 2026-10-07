// import { useState } from "react";
// import { Search, Plus, Edit, X, Upload, FileText } from "lucide-react";
// import Select from "react-select";
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

// const AddCandidateModal = ({
//   editingCandidate,
//   formData,
//   isSubmitting,
//   onFormChange,
//   onSubmit,
//   onClose,
//   onSearchCandidate,
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
//       (c) => c.email?.toLowerCase() === searchEmail.toLowerCase()
//     );
//     setSearchResult({
//       email: searchEmail,
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
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center p-6 border-b border-gray-200">
//           <h2 className="text-xl font-bold text-gray-900">
//             {editingCandidate ? "Update Candidate" : "Add New Candidate"}
//           </h2>
//           <button
//             onClick={handleClose}
//             className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Email Search Section - Only show when adding new candidate */}
//         {!editingCandidate && (
//           <div className="p-6 border-b border-gray-200 bg-gray-50">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">
//               Search for Existing Candidate
//             </h3>
//             <div className="space-y-3">
//               <div className="flex gap-3">
//                 <div className="flex-1">
//                   <input
//                     type="email"
//                     placeholder="Enter candidate email..."
//                     value={searchEmail}
//                     onChange={(e) => setSearchEmail(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <button
//                   onClick={handleSearchCandidate}
//                   disabled={!searchEmail.trim()}
//                   className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
//                 >
//                   <Search className="w-4 h-4" />
//                   Search
//                 </button>
//               </div>

//               {/* Search Result */}
//               {searchResult && (
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   {searchResult.exists ? (
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-blue-800 font-medium">
//                           Candidate found: {searchResult.candidate?.name}
//                         </p>
//                         <p className="text-blue-600 text-sm">
//                           {searchResult.email}
//                         </p>
//                       </div>
//                       <button
//                         onClick={handleUpdateCandidate}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
//                       >
//                         <Edit className="w-4 h-4" />
//                         Update Details
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-blue-800 font-medium">
//                           No candidate found with this email
//                         </p>
//                         <p className="text-blue-600 text-sm">
//                           {searchResult.email}
//                         </p>
//                       </div>
//                       <button
//                         onClick={handleCreateCandidate}
//                         className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
//                       >
//                         <Plus className="w-4 h-4" />
//                         Create Candidate
//                       </button>
//                     </div>
//                   )}
//                   <button
//                     onClick={() => setSearchResult(null)}
//                     className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
//                   >
//                     Clear
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         <div className="p-6 space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Name *
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={(e) => updateField("name", e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email *
//               </label>
//               <input
//                 type="email"
//                 required
//                 value={formData.email}
//                 onChange={(e) => updateField("email", e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 value={formData.phone}
//                 onChange={(e) => updateField("phone", e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Upload Resume
//               </label>
//               <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
//                 <div className="space-y-1 text-center">
//                   <Upload className="mx-auto h-8 w-8 text-gray-400" />
//                   <div className="flex text-sm text-gray-600">
//                     <label
//                       htmlFor="resume-upload"
//                       className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
//                     >
//                       <span>Upload resume</span>
//                       <input
//                         id="resume-upload"
//                         type="file"
//                         className="sr-only"
//                         accept=".pdf,.doc,.docx"
//                         onChange={(e) => {
//                           const file = e.target.files?.[0] || null;
//                           if (file) {
//                             updateField("resumeFile", file);
//                             setResumePreview(file.name);
//                           }
//                         }}
//                       />
//                     </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs text-gray-500">
//                     PDF, DOC, DOCX up to 10MB
//                   </p>
//                 </div>
//               </div>
//               {resumePreview && (
//                 <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
//                   <FileText className="w-4 h-4" />
//                   <span>{resumePreview}</span>
//                 </div>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Current Designation
//               </label>
//               <input
//                 type="text"
//                 value={formData.currentDesignation}
//                 onChange={(e) =>
//                   updateField("currentDesignation", e.target.value)
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Current Organization
//               </label>
//               <input
//                 type="text"
//                 value={formData.currentOrganization}
//                 onChange={(e) =>
//                   updateField("currentOrganization", e.target.value)
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Current CTC (₹) *
//               </label>
//               <input
//                 type="number"
//                 required
//                 value={formData.currentCTC}
//                 onChange={(e) => updateField("currentCTC", e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Expected CTC (₹) *
//               </label>
//               <input
//                 type="number"
//                 required
//                 value={formData.expectedCTC}
//                 onChange={(e) => updateField("expectedCTC", e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 City
//               </label>
//               <Select
//                 options={cityOptions}
//                 isSearchable
//                 isClearable
//                 placeholder="Select city..."
//                 value={
//                   cityOptions.find((opt) => opt.value === formData.city) || null
//                 }
//                 onChange={(
//                   selected: { value: string; label: string } | null
//                 ) => updateField("city", selected ? selected.value : "")}
//                 getOptionLabel={(opt) => opt.label}
//                 getOptionValue={(opt) => opt.value}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Notice Period (days) *
//               </label>
//               <input
//                 type="number"
//                 required
//                 value={formData.noticePeriod}
//                 onChange={(e) => updateField("noticePeriod", e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Education
//               </label>
//               <Select
//                 options={educationOptions}
//                 isSearchable
//                 isClearable
//                 placeholder="Select education..."
//                 value={
//                   educationOptions.find(
//                     (opt) => opt.value === formData.education
//                   ) || null
//                 }
//                 onChange={(
//                   selected: { value: string; label: string } | null
//                 ) => updateField("education", selected ? selected.value : "")}
//                 getOptionLabel={(opt) => opt.label}
//                 getOptionValue={(opt) => opt.value}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Gender
//               </label>
//               <select
//                 value={formData.gender}
//                 onChange={(e) => updateField("gender", e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//                 <option value="Prefer not to say">Prefer not to say</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Engagement Type
//               </label>
//               <select
//                 value={formData.engagementType}
//                 onChange={(e) => updateField("engagementType", e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="Full-time">Full-time</option>
//                 <option value="Part-time">Part-time</option>
//                 <option value="Contract">Contract</option>
//                 <option value="Freelance">Freelance</option>
//               </select>
//             </div>

//             <div className="md:col-span-2">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.openToRelocation}
//                   onChange={(e) =>
//                     updateField("openToRelocation", e.target.checked)
//                   }
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//                 <span className="text-sm font-medium text-gray-700">
//                   Open to Relocation
//                 </span>
//               </label>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Special Comments
//             </label>
//             <textarea
//               value={formData.specialComments}
//               onChange={(e) => updateField("specialComments", e.target.value)}
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Recruiter
//             </label>
//             <input
//               type="text"
//               value={formData.recruiter}
//               readOnly
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
//             />
//           </div>

//           <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={handleClose}
//               className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={onSubmit}
//               disabled={isSubmitting}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//             >
//               {isSubmitting
//                 ? "Saving..."
//                 : editingCandidate
//                 ? "Update Candidate"
//                 : "Add Candidate"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCandidateModal;





// import { useState } from "react";
// import { Search, Plus, Edit, X, Upload, FileText } from "lucide-react";
// import Select from "react-select";
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

// const AddCandidateModal = ({
//   editingCandidate,
//   formData,
//   isSubmitting,
//   onFormChange,
//   onSubmit,
//   onClose,
//   onSearchCandidate,
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
//       (c) => c.email?.toLowerCase() === searchEmail.toLowerCase()
//     );
//     setSearchResult({
//       email: searchEmail,
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
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center p-6 border-b border-gray-200">
//           <h2 className="text-xl font-bold text-gray-900">
//             {editingCandidate ? "Update Candidate" : "Add New Candidate"}
//           </h2>
//           <button
//             onClick={handleClose}
//             className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Email Search Section - Only show when adding new candidate */}
//         {!editingCandidate && (
//           <div className="p-6 border-b border-gray-200 bg-gray-50">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">
//               Search for Existing Candidate
//             </h3>
//             <div className="space-y-3">
//               <div className="flex gap-3">
//                 <div className="flex-1">
//                   <input
//                     type="email"
//                     placeholder="Enter candidate email..."
//                     value={searchEmail}
//                     onChange={(e) => setSearchEmail(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                   />
//                 </div>
//                 <button
//                   onClick={handleSearchCandidate}
//                   disabled={!searchEmail.trim()}
//                   className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
//                 >
//                   <Search className="w-4 h-4" />
//                   Search
//                 </button>
//               </div>

//               {/* Search Result */}
//               {searchResult && (
//                 <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                   {searchResult.exists ? (
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-green-800 font-medium">
//                           Candidate found: {searchResult.candidate?.name}
//                         </p>
//                         <p className="text-green-600 text-sm">
//                           {searchResult.email}
//                         </p>
//                       </div>
//                       <button
//                         onClick={handleUpdateCandidate}
//                         className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
//                       >
//                         <Edit className="w-4 h-4" />
//                         Update Details
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-green-800 font-medium">
//                           No candidate found with this email
//                         </p>
//                         <p className="text-green-600 text-sm">
//                           {searchResult.email}
//                         </p>
//                       </div>
//                       <button
//                         onClick={handleCreateCandidate}
//                         className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
//                       >
//                         <Plus className="w-4 h-4" />
//                         Create Candidate
//                       </button>
//                     </div>
//                   )}
//                   <button
//                     onClick={() => setSearchResult(null)}
//                     className="mt-2 text-green-600 hover:text-green-800 text-sm"
//                   >
//                     Clear
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         <div className="p-6 space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Name *
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={(e) => updateField("name", e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email *
//               </label>
//               <input
//                 type="email"
//                 required
//                 value={formData.email}
//                 onChange={(e) => updateField("email", e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 value={formData.phone}
//                 onChange={(e) => updateField("phone", e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Upload Resume
//               </label>
//               <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
//                 <div className="space-y-1 text-center">
//                   <Upload className="mx-auto h-8 w-8 text-gray-400" />
//                   <div className="flex text-sm text-gray-600">
//                     <label
//                       htmlFor="resume-upload"
//                       className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500"
//                     >
//                       <span>Upload resume</span>
//                       <input
//                         id="resume-upload"
//                         type="file"
//                         className="sr-only"
//                         accept=".pdf,.doc,.docx"
//                         onChange={(e) => {
//                           const file = e.target.files?.[0] || null;
//                           if (file) {
//                             updateField("resumeFile", file);
//                             setResumePreview(file.name);
//                           }
//                         }}
//                       />
//                     </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs text-gray-500">
//                     PDF, DOC, DOCX up to 10MB
//                   </p>
//                 </div>
//               </div>
//               {resumePreview && (
//                 <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
//                   <FileText className="w-4 h-4" />
//                   <span>{resumePreview}</span>
//                 </div>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Current Designation
//               </label>
//               <input
//                 type="text"
//                 value={formData.currentDesignation}
//                 onChange={(e) =>
//                   updateField("currentDesignation", e.target.value)
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Current Organization
//               </label>
//               <input
//                 type="text"
//                 value={formData.currentOrganization}
//                 onChange={(e) =>
//                   updateField("currentOrganization", e.target.value)
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Current CTC (₹) *
//               </label>
//               <input
//                 type="number"
//                 required
//                 value={formData.currentCTC}
//                 onChange={(e) => updateField("currentCTC", e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Expected CTC (₹) *
//               </label>
//               <input
//                 type="number"
//                 required
//                 value={formData.expectedCTC}
//                 onChange={(e) => updateField("expectedCTC", e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 City
//               </label>
//               <Select
//                 options={cityOptions}
//                 isSearchable
//                 isClearable
//                 placeholder="Select city..."
//                 value={
//                   cityOptions.find((opt) => opt.value === formData.city) || null
//                 }
//                 onChange={(
//                   selected: { value: string; label: string } | null
//                 ) => updateField("city", selected ? selected.value : "")}
//                 getOptionLabel={(opt) => opt.label}
//                 getOptionValue={(opt) => opt.value}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Notice Period (days) *
//               </label>
//               <input
//                 type="number"
//                 required
//                 value={formData.noticePeriod}
//                 onChange={(e) => updateField("noticePeriod", e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Education
//               </label>
//               <Select
//                 options={educationOptions}
//                 isSearchable
//                 isClearable
//                 placeholder="Select education..."
//                 value={
//                   educationOptions.find(
//                     (opt) => opt.value === formData.education
//                   ) || null
//                 }
//                 onChange={(
//                   selected: { value: string; label: string } | null
//                 ) => updateField("education", selected ? selected.value : "")}
//                 getOptionLabel={(opt) => opt.label}
//                 getOptionValue={(opt) => opt.value}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Gender
//               </label>
//               <select
//                 value={formData.gender}
//                 onChange={(e) => updateField("gender", e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//                 <option value="Prefer not to say">Prefer not to say</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Engagement Type
//               </label>
//               <select
//                 value={formData.engagementType}
//                 onChange={(e) => updateField("engagementType", e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               >
//                 <option value="Full-time">Full-time</option>
//                 <option value="Part-time">Part-time</option>
//                 <option value="Contract">Contract</option>
//                 <option value="Freelance">Freelance</option>
//               </select>
//             </div>

//             <div className="md:col-span-2">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.openToRelocation}
//                   onChange={(e) =>
//                     updateField("openToRelocation", e.target.checked)
//                   }
//                   className="rounded border-gray-300 text-green-600 focus:ring-green-500"
//                 />
//                 <span className="text-sm font-medium text-gray-700">
//                   Open to Relocation
//                 </span>
//               </label>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Special Comments
//             </label>
//             <textarea
//               value={formData.specialComments}
//               onChange={(e) => updateField("specialComments", e.target.value)}
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Recruiter
//             </label>
//             <input
//               type="text"
//               value={formData.recruiter}
//               readOnly
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
//             />
//           </div>

//           <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={handleClose}
//               className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={onSubmit}
//               disabled={isSubmitting}
//               className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//             >
//               {isSubmitting
//                 ? "Saving..."
//                 : editingCandidate
//                 ? "Update Candidate"
//                 : "Add Candidate"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCandidateModal;




import { useState } from "react";
import { Search, Plus, Edit, X, Upload, FileText } from "lucide-react";
import Select from "react-select";
import { educationOptions, cityOptions } from "../../constants/dropdown";

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
  const [searchResult, setSearchResult] = useState<any>(null);
  const [resumePreview, setResumePreview] = useState<string | null>(null);

  const handleSearchCandidate = () => {
    if (!searchEmail.trim()) return;

    const existingCandidate = candidates.find(
      (c) => c.email?.toLowerCase() === searchEmail.toLowerCase()
    );
    setSearchResult({
      email: searchEmail,
      exists: !!existingCandidate,
      candidate: existingCandidate,
    });
  };

  const handleUpdateCandidate = () => {
    if (searchResult?.candidate) {
      onUpdateCandidate(searchResult.candidate);
      setSearchResult(null);
      setSearchEmail("");
    }
  };

  const handleCreateCandidate = () => {
    onCreateCandidate(searchResult?.email ?? searchEmail ?? "");
    setSearchResult(null);
    setSearchEmail("");
  };

  const handleClose = () => {
    setSearchResult(null);
    setSearchEmail("");
    setResumePreview(null);
    onClose();
  };

  const updateField = (field: string, value: any) => {
    onFormChange({ ...formData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {editingCandidate ? "Update Candidate" : "Add New Candidate"}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Search Section - Only show when adding new candidate */}
        {!editingCandidate && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Search for Existing Candidate
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter candidate email..."
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <button
                  onClick={handleSearchCandidate}
                  disabled={!searchEmail.trim()}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>

              {/* Search Result */}
              {searchResult && (
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  {searchResult.exists ? (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-teal-800 font-medium">
                          Candidate found: {searchResult.candidate?.name}
                        </p>
                        <p className="text-teal-600 text-sm">
                          {searchResult.email}
                        </p>
                      </div>
                      <button
                        onClick={handleUpdateCandidate}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Update Details
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-teal-800 font-medium">
                          No candidate found with this email
                        </p>
                        <p className="text-teal-600 text-sm">
                          {searchResult.email}
                        </p>
                      </div>
                      <button
                        onClick={handleCreateCandidate}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Create Candidate
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => setSearchResult(null)}
                    className="mt-2 text-teal-600 hover:text-teal-800 text-sm"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Resume
              </label>
              <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="resume-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500"
                    >
                      <span>Upload resume</span>
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
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX up to 10MB
                  </p>
                </div>
              </div>
              {resumePreview && (
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>{resumePreview}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Designation
              </label>
              <input
                type="text"
                value={formData.currentDesignation}
                onChange={(e) =>
                  updateField("currentDesignation", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Organization
              </label>
              <input
                type="text"
                value={formData.currentOrganization}
                onChange={(e) =>
                  updateField("currentOrganization", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current CTC (₹) *
              </label>
              <input
                type="number"
                required
                value={formData.currentCTC}
                onChange={(e) => updateField("currentCTC", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected CTC (₹) *
              </label>
              <input
                type="number"
                required
                value={formData.expectedCTC}
                onChange={(e) => updateField("expectedCTC", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <Select
                options={cityOptions}
                isSearchable
                isClearable
                placeholder="Select city..."
                value={
                  cityOptions.find((opt) => opt.value === formData.city) || null
                }
                onChange={(
                  selected: { value: string; label: string } | null
                ) => updateField("city", selected ? selected.value : "")}
                getOptionLabel={(opt) => opt.label}
                getOptionValue={(opt) => opt.value}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notice Period (days) *
              </label>
              <input
                type="number"
                required
                value={formData.noticePeriod}
                onChange={(e) => updateField("noticePeriod", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Education
              </label>
              <Select
                options={educationOptions}
                isSearchable
                isClearable
                placeholder="Select education..."
                value={
                  educationOptions.find(
                    (opt) => opt.value === formData.education
                  ) || null
                }
                onChange={(
                  selected: { value: string; label: string } | null
                ) => updateField("education", selected ? selected.value : "")}
                getOptionLabel={(opt) => opt.label}
                getOptionValue={(opt) => opt.value}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => updateField("gender", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Engagement Type
              </label>
              <select
                value={formData.engagementType}
                onChange={(e) => updateField("engagementType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.openToRelocation}
                  onChange={(e) =>
                    updateField("openToRelocation", e.target.checked)
                  }
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Open to Relocation
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Comments
            </label>
            <textarea
              value={formData.specialComments}
              onChange={(e) => updateField("specialComments", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recruiter
            </label>
            <input
              type="text"
              value={formData.recruiter}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting
                ? "Saving..."
                : editingCandidate
                ? "Update Candidate"
                : "Add Candidate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCandidateModal;