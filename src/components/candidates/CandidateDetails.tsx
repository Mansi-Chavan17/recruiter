// // // // import { useState, useEffect } from "react";
// // // // import {
// // // //   Edit,
// // // //   User,
// // // //   Mail,
// // // //   Phone,
// // // //   Building,
// // // //   MapPin,
// // // //   Clock,
// // // //   DollarSign,
// // // //   ArrowLeft,
// // // //   ExternalLink,
// // // //   FileText,
// // // //   Trash2,
// // // //   Plus,
// // // // } from "lucide-react";
// // // // import DocumentUploadModal from "./DocumentUploadModal";

// // // // interface CandidateDetailsProps {
// // // //   candidate: any;
// // // //   onBack: () => void;
// // // //   onSaveDetails: (editFormData: any) => Promise<void>;
// // // //   onUploadDocument: (candidateId: string, form: any) => Promise<void>;
// // // //   onDeleteDocument: (candidateId: string, documentId: string) => void;
// // // //   formatCurrency: (amount: number) => string;
// // // // }

// // // // const CandidateDetails = ({
// // // //   candidate,
// // // //   onBack,
// // // //   onSaveDetails,
// // // //   onUploadDocument,
// // // //   onDeleteDocument,
// // // //   formatCurrency,
// // // // }: CandidateDetailsProps) => {
// // // //   const [isEditingDetails, setIsEditingDetails] = useState(false);
// // // //   const [editFormData, setEditFormData] = useState<any>({});
// // // //   const [isUpdating, setIsUpdating] = useState(false);
// // // //   const [showDocumentModal, setShowDocumentModal] = useState(false);

// // // //   useEffect(() => {
// // // //     setEditFormData(candidate);
// // // //     setIsEditingDetails(false);
// // // //   }, [candidate]);

// // // //   const handleSave = async () => {
// // // //     try {
// // // //       setIsUpdating(true);
// // // //       await onSaveDetails(editFormData);
// // // //       setIsEditingDetails(false);
// // // //     } catch (error) {
// // // //       // Error handling done in parent
// // // //     } finally {
// // // //       setIsUpdating(false);
// // // //     }
// // // //   };

// // // //   const handleDocumentUpload = async (candidateId: string, form: any) => {
// // // //     await onUploadDocument(candidateId, form);
// // // //     setShowDocumentModal(false);
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 p-6">
// // // //       <div className="max-w-4xl mx-auto">
// // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
// // // //           {/* Header */}
// // // //           <div className="border-b border-gray-200 p-6">
// // // //             <div className="flex items-center gap-4">
// // // //               <button
// // // //                 onClick={onBack}
// // // //                 className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
// // // //               >
// // // //                 <ArrowLeft className="w-5 h-5" />
// // // //               </button>
// // // //               <div>
// // // //                 <h1 className="text-2xl font-bold text-gray-900">
// // // //                   {candidate?.candidate}
// // // //                 </h1>
// // // //                 <p className="text-gray-600">
// // // //                   {candidate?.current_role} at {candidate?.company_name}
// // // //                 </p>
// // // //               </div>
// // // //               <div className="ml-auto">
// // // //                 <button
// // // //                   onClick={() => {
// // // //                     if (isEditingDetails) {
// // // //                       handleSave();
// // // //                     } else {
// // // //                       setIsEditingDetails(true);
// // // //                     }
// // // //                   }}
// // // //                   disabled={isUpdating}
// // // //                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// // // //                 >
// // // //                   <Edit className="w-4 h-4" />
// // // //                   {isUpdating
// // // //                     ? "Saving..."
// // // //                     : isEditingDetails
// // // //                     ? "Save Details"
// // // //                     : "Edit Details"}
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Candidate Details */}
// // // //           <div className="p-6">
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // //               {/* Contact Information */}
// // // //               <ContactInfoSection
// // // //                 candidate={candidate}
// // // //                 isEditing={isEditingDetails}
// // // //                 editFormData={editFormData}
// // // //                 onEditChange={setEditFormData}
// // // //               />

// // // //               {/* Professional Information */}
// // // //               <ProfessionalInfoSection
// // // //                 candidate={candidate}
// // // //                 isEditing={isEditingDetails}
// // // //                 editFormData={editFormData}
// // // //                 onEditChange={setEditFormData}
// // // //                 formatCurrency={formatCurrency}
// // // //               />

// // // //               {/* Personal Information */}
// // // //               <PersonalInfoSection
// // // //                 candidate={candidate}
// // // //                 isEditing={isEditingDetails}
// // // //                 editFormData={editFormData}
// // // //                 onEditChange={setEditFormData}
// // // //               />

// // // //               {/* Additional Information */}
// // // //               <AdditionalInfoSection
// // // //                 candidate={candidate}
// // // //                 isEditing={isEditingDetails}
// // // //                 editFormData={editFormData}
// // // //                 onEditChange={setEditFormData}
// // // //               />

// // // //               {/* Documents */}
// // // //               <DocumentsSection
// // // //                 candidate={candidate}
// // // //                 onAddDocument={() => setShowDocumentModal(true)}
// // // //                 onDeleteDocument={onDeleteDocument}
// // // //               />

// // // //               {/* Position History */}
// // // //               <PositionHistorySection candidate={candidate} />
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Document Upload Modal */}
// // // //       {showDocumentModal && (
// // // //         <DocumentUploadModal
// // // //           candidateId={candidate?.id}
// // // //           onUpload={handleDocumentUpload}
// // // //           onClose={() => setShowDocumentModal(false)}
// // // //         />
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // // --- Sub-sections ---

// // // // const ContactInfoSection = ({
// // // //   candidate,
// // // //   isEditing,
// // // //   editFormData,
// // // //   onEditChange,
// // // // }: any) => (
// // // //   <div>
// // // //     <h3 className="text-lg font-semibold text-gray-900 mb-4">
// // // //       Contact Information
// // // //     </h3>
// // // //     <div className="space-y-3">
// // // //       <InfoRow icon={<Mail className="w-5 h-5 text-gray-500" />} label="Email">
// // // //         {isEditing ? (
// // // //           <input
// // // //             type="email"
// // // //             value={editFormData?.contact?.email || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 contact: { ...prev.contact, email: e.target.value },
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // //           />
// // // //         ) : (
// // // //           <div className="text-gray-900">{candidate?.contact?.email}</div>
// // // //         )}
// // // //       </InfoRow>

// // // //       <InfoRow
// // // //         icon={<Phone className="w-5 h-5 text-gray-500" />}
// // // //         label="Phone"
// // // //       >
// // // //         {isEditing ? (
// // // //           <input
// // // //             type="tel"
// // // //             value={editFormData?.contact?.phone || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 contact: { ...prev.contact, phone: e.target.value },
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // //           />
// // // //         ) : (
// // // //           <div className="text-gray-900">{candidate?.contact?.phone}</div>
// // // //         )}
// // // //       </InfoRow>

// // // //       <InfoRow
// // // //         icon={<MapPin className="w-5 h-5 text-gray-500" />}
// // // //         label="City"
// // // //       >
// // // //         {isEditing ? (
// // // //           <input
// // // //             type="text"
// // // //             value={editFormData?.location || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 location: e.target.value,
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // //           />
// // // //         ) : (
// // // //           <div className="text-gray-900">{candidate?.location}</div>
// // // //         )}
// // // //       </InfoRow>

// // // //       <InfoRow
// // // //         icon={<ExternalLink className="w-5 h-5 text-gray-500" />}
// // // //         label="Resume"
// // // //       >
// // // //         {isEditing ? (
// // // //           <input
// // // //             type="url"
// // // //             value={editFormData?.contact?.resume || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 contact: { ...prev.contact, resume: e.target.value },
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // //           />
// // // //         ) : (
// // // //           <a
// // // //             href={candidate?.contact?.resume}
// // // //             target="_blank"
// // // //             rel="noopener noreferrer"
// // // //             className="text-blue-600 hover:text-blue-800 underline"
// // // //           >
// // // //             View Resume
// // // //           </a>
// // // //         )}
// // // //       </InfoRow>
// // // //     </div>
// // // //   </div>
// // // // );

// // // // const ProfessionalInfoSection = ({
// // // //   candidate,
// // // //   isEditing,
// // // //   editFormData,
// // // //   onEditChange,
// // // //   formatCurrency,
// // // // }: any) => (
// // // //   <div>
// // // //     <h3 className="text-lg font-semibold text-gray-900 mb-4">
// // // //       Professional Information
// // // //     </h3>
// // // //     <div className="space-y-3">
// // // //       <InfoRow
// // // //         icon={<Building className="w-5 h-5 text-gray-500" />}
// // // //         label="Current Organization"
// // // //       >
// // // //         {isEditing ? (
// // // //           <input
// // // //             type="text"
// // // //             value={editFormData?.company_name || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 company_name: e.target.value,
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // //           />
// // // //         ) : (
// // // //           <div className="text-gray-900">{candidate?.company_name}</div>
// // // //         )}
// // // //       </InfoRow>

// // // //       <InfoRow
// // // //         icon={<User className="w-5 h-5 text-gray-500" />}
// // // //         label="Current Designation"
// // // //       >
// // // //         {isEditing ? (
// // // //           <input
// // // //             type="text"
// // // //             value={editFormData?.current_role || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 current_role: e.target.value,
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // //           />
// // // //         ) : (
// // // //           <div className="text-gray-900">{candidate?.current_role}</div>
// // // //         )}
// // // //       </InfoRow>

// // // //       <InfoRow
// // // //         icon={<DollarSign className="w-5 h-5 text-gray-500" />}
// // // //         label="Current CTC"
// // // //       >
// // // //         {isEditing ? (
// // // //           <input
// // // //             type="number"
// // // //             value={editFormData?.ctc?.current || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 ctc: { ...prev.ctc, current: e.target.value },
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // //           />
// // // //         ) : (
// // // //           <div className="text-gray-900 font-semibold">
// // // //             {formatCurrency(candidate?.ctc?.current)}
// // // //           </div>
// // // //         )}
// // // //       </InfoRow>

// // // //       <InfoRow
// // // //         icon={<DollarSign className="w-5 h-5 text-gray-500" />}
// // // //         label="Expected CTC"
// // // //       >
// // // //         {isEditing ? (
// // // //           <input
// // // //             type="number"
// // // //             value={editFormData?.ctc?.expected || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 ctc: { ...prev.ctc, expected: e.target.value },
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // //           />
// // // //         ) : (
// // // //           <div className="text-gray-900 font-semibold">
// // // //             {formatCurrency(candidate?.ctc?.expected)}
// // // //           </div>
// // // //         )}
// // // //       </InfoRow>

// // // //       <InfoRow
// // // //         icon={<Clock className="w-5 h-5 text-gray-500" />}
// // // //         label="Notice Period"
// // // //       >
// // // //         {isEditing ? (
// // // //           <div className="flex items-center gap-2">
// // // //             <input
// // // //               type="number"
// // // //               value={editFormData?.noticePeriod || ""}
// // // //               onChange={(e) =>
// // // //                 onEditChange((prev: any) => ({
// // // //                   ...prev,
// // // //                   noticePeriod: e.target.value,
// // // //                 }))
// // // //               }
// // // //               className="text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-20"
// // // //             />
// // // //             <span className="text-gray-900">days</span>
// // // //           </div>
// // // //         ) : (
// // // //           <div className="text-gray-900">{candidate?.noticePeriod} days</div>
// // // //         )}
// // // //       </InfoRow>
// // // //     </div>
// // // //   </div>
// // // // );

// // // // const PersonalInfoSection = ({
// // // //   candidate,
// // // //   isEditing,
// // // //   editFormData,
// // // //   onEditChange,
// // // // }: any) => (
// // // //   <div>
// // // //     <h3 className="text-lg font-semibold text-gray-900 mb-4">
// // // //       Personal Information
// // // //     </h3>
// // // //     <div className="space-y-3">
// // // //       <div>
// // // //         <span className="text-sm text-gray-500">Education</span>
// // // //         {isEditing ? (
// // // //           <input
// // // //             type="text"
// // // //             value={editFormData?.education || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 education: e.target.value,
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
// // // //           />
// // // //         ) : (
// // // //           <div className="text-gray-900">{candidate?.education}</div>
// // // //         )}
// // // //       </div>
// // // //       <div>
// // // //         <span className="text-sm text-gray-500">Gender</span>
// // // //         {isEditing ? (
// // // //           <select
// // // //             value={
// // // //               editFormData?.gender?.toLowerCase() === "m"
// // // //                 ? "Male"
// // // //                 : editFormData?.gender?.toLowerCase() === "f"
// // // //                 ? "Female"
// // // //                 : editFormData?.gender || ""
// // // //             }
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 gender: e.target.value,
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
// // // //           >
// // // //             <option value="">Select Gender</option>
// // // //             <option value="Male">Male</option>
// // // //             <option value="Female">Female</option>
// // // //             <option value="Other">Other</option>
// // // //             <option value="Prefer not to say">Prefer not to say</option>
// // // //           </select>
// // // //         ) : (
// // // //           <div className="text-gray-900">{candidate?.gender}</div>
// // // //         )}
// // // //       </div>
// // // //       <div>
// // // //         <span className="text-sm text-gray-500">Engagement Type</span>
// // // //         {isEditing ? (
// // // //           <select
// // // //             value={
// // // //               editFormData?.engagement_type?.toLowerCase() === "remote"
// // // //                 ? "Remote"
// // // //                 : editFormData?.engagement_type?.toLowerCase() === "hybrid"
// // // //                 ? "Hybrid"
// // // //                 : editFormData?.engagement_type?.toLowerCase() === "in office"
// // // //                 ? "In office"
// // // //                 : ""
// // // //             }
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 engagement_type: e.target.value,
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
// // // //           >
// // // //             <option value="Hybrid">Hybrid</option>
// // // //             <option value="In office">In office</option>
// // // //             <option value="Remote">Remote</option>
// // // //           </select>
// // // //         ) : (
// // // //           <div className="text-gray-900">{candidate?.engagement_type}</div>
// // // //         )}
// // // //       </div>
// // // //       <div>
// // // //         <span className="text-sm text-gray-500">Open to Relocation</span>
// // // //         {isEditing ? (
// // // //           <label className="flex items-center gap-2 mt-1">
// // // //             <input
// // // //               type="checkbox"
// // // //               checked={
// // // //                 editFormData?.open_to_relocation?.toLowerCase() === "yes"
// // // //               }
// // // //               onChange={(e) =>
// // // //                 onEditChange((prev: any) => ({
// // // //                   ...prev,
// // // //                   open_to_relocation: e.target.checked ? "Yes" : "No",
// // // //                 }))
// // // //               }
// // // //               className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
// // // //             />
// // // //             <span className="text-gray-900">Yes, open to relocation</span>
// // // //           </label>
// // // //         ) : (
// // // //           <div className="text-gray-900">
// // // //             {candidate?.open_to_relocation ? "Yes" : "No"}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   </div>
// // // // );

// // // // const AdditionalInfoSection = ({
// // // //   candidate,
// // // //   isEditing,
// // // //   editFormData,
// // // //   onEditChange,
// // // // }: any) => (
// // // //   <div>
// // // //     <h3 className="text-lg font-semibold text-gray-900 mb-4">
// // // //       Additional Information
// // // //     </h3>
// // // //     <div className="space-y-3">
// // // //       <div>
// // // //         <span className="text-sm text-gray-500">Recruiter</span>
// // // //         <div className="text-gray-900">
// // // //           {candidate?.candidate_position_history?.length > 0 &&
// // // //           candidate.candidate_position_history[0]?.recruiter?.length > 0
// // // //             ? candidate.candidate_position_history[0].recruiter
// // // //                 .map((r: any) => r.name || r.email)
// // // //                 .join(", ")
// // // //             : "N/A"}
// // // //         </div>
// // // //       </div>
// // // //       <div>
// // // //         <span className="text-sm text-gray-500">Special Comments</span>
// // // //         {isEditing ? (
// // // //           <textarea
// // // //             value={editFormData?.special_comments || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 special_comments: e.target.value,
// // // //               }))
// // // //             }
// // // //             rows={3}
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
// // // //           />
// // // //         ) : candidate?.special_comments ? (
// // // //           <div className="text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">
// // // //             {candidate?.special_comments}
// // // //           </div>
// // // //         ) : (
// // // //           <div className="text-gray-500 italic mt-1">No comments</div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   </div>
// // // // );

// // // // const DocumentsSection = ({
// // // //   candidate,
// // // //   onAddDocument,
// // // //   onDeleteDocument,
// // // // }: any) => (
// // // //   <div className="md:col-span-2">
// // // //     <div className="flex items-center justify-between mb-4">
// // // //       <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
// // // //       <button
// // // //         onClick={onAddDocument}
// // // //         className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
// // // //       >
// // // //         <Plus className="w-4 h-4" />
// // // //         Add Document
// // // //       </button>
// // // //     </div>
// // // //     {candidate?.documents && candidate?.documents.length > 0 ? (
// // // //       <div className="space-y-3">
// // // //         {candidate?.documents.map((document: any) => (
// // // //           <div
// // // //             key={document.id}
// // // //             className="bg-gray-50 rounded-lg p-4 border border-gray-200"
// // // //           >
// // // //             <div className="flex items-center justify-between">
// // // //               <div className="flex items-center gap-3">
// // // //                 <FileText className="w-5 h-5 text-blue-600" />
// // // //                 <div>
// // // //                   <a
// // // //                     href={document.url}
// // // //                     target="_blank"
// // // //                     rel="noopener noreferrer"
// // // //                     className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
// // // //                   >
// // // //                     {document.name}
// // // //                   </a>
// // // //                   <div className="text-sm text-gray-500">
// // // //                     {document.type} • Uploaded on{" "}
// // // //                     {new Date(document.uploadDate).toLocaleDateString("en-IN")}
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //               <button
// // // //                 onClick={() =>
// // // //                   onDeleteDocument(candidate?.id, document.id)
// // // //                 }
// // // //                 className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
// // // //               >
// // // //                 <Trash2 className="w-4 h-4" />
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     ) : (
// // // //       <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
// // // //         <FileText className="w-8 h-8 mx-auto mb-2 text-gray-300" />
// // // //         <p>No documents uploaded</p>
// // // //         <button
// // // //           onClick={onAddDocument}
// // // //           className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
// // // //         >
// // // //           Add first document
// // // //         </button>
// // // //       </div>
// // // //     )}
// // // //   </div>
// // // // );

// // // // const PositionHistorySection = ({ candidate }: any) => (
// // // //   <div className="md:col-span-2">
// // // //     <h3 className="text-lg font-semibold text-gray-900 mb-4">
// // // //       Candidate Position History
// // // //     </h3>
// // // //     {candidate?.candidate_position_history &&
// // // //     candidate?.candidate_position_history.length > 0 ? (
// // // //       <div className="space-y-3">
// // // //         {candidate?.candidate_position_history.map((position: any) => (
// // // //           <div
// // // //             key={position.id}
// // // //             className="bg-gray-50 rounded-lg p-4 border border-gray-200"
// // // //           >
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //               <div>
// // // //                 <div className="text-sm text-gray-500">Position Name</div>
// // // //                 <div className="text-gray-900 font-medium">
// // // //                   {position.job?.position}
// // // //                 </div>
// // // //               </div>
// // // //               <div>
// // // //                 <div className="text-sm text-gray-500">Client Name</div>
// // // //                 <div className="text-gray-900">
// // // //                   {position.job?.client?.client_name}
// // // //                 </div>
// // // //               </div>
// // // //               <div>
// // // //                 <div className="text-sm text-gray-500">Current Stage</div>
// // // //                 <div className="text-gray-900">{position?.current_stage}</div>
// // // //               </div>
// // // //               <div>
// // // //                 <div className="text-sm text-gray-500">Recruiter</div>
// // // //                 <div className="text-gray-900">
// // // //                   {position.recruiter?.length > 0
// // // //                     ? position.recruiter
// // // //                         .map((r: any) => r.name || r.email || "—")
// // // //                         .join(", ")
// // // //                     : "—"}
// // // //                 </div>
// // // //               </div>
// // // //               <div className="md:col-span-2">
// // // //                 <div className="text-sm text-gray-500">Last Modified</div>
// // // //                 <div className="text-gray-900">
// // // //                   {position.last_modefied
// // // //                     ? new Date(position.last_modefied).toLocaleString("en-IN", {
// // // //                         year: "numeric",
// // // //                         month: "short",
// // // //                         day: "numeric",
// // // //                         hour: "2-digit",
// // // //                         minute: "2-digit",
// // // //                         hour12: true,
// // // //                       })
// // // //                     : "—"}
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     ) : (
// // // //       <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
// // // //         <Building className="w-8 h-8 mx-auto mb-2 text-gray-300" />
// // // //         <p>No position history available</p>
// // // //       </div>
// // // //     )}
// // // //   </div>
// // // // );

// // // // // --- Shared helper component ---

// // // // const InfoRow = ({
// // // //   icon,
// // // //   label,
// // // //   children,
// // // // }: {
// // // //   icon: React.ReactNode;
// // // //   label: string;
// // // //   children: React.ReactNode;
// // // // }) => (
// // // //   <div className="flex items-center gap-3">
// // // //     {icon}
// // // //     <div className="flex-1">
// // // //       <span className="text-sm text-gray-500">{label}</span>
// // // //       {children}
// // // //     </div>
// // // //   </div>
// // // // );

// // // // export default CandidateDetails;






// // // // import { useState, useEffect } from "react";
// // // // import {
// // // //   Edit,
// // // //   User,
// // // //   Mail,
// // // //   Phone,
// // // //   Building,
// // // //   MapPin,
// // // //   Clock,
// // // //   DollarSign,
// // // //   ArrowLeft,
// // // //   ExternalLink,
// // // //   FileText,
// // // //   Trash2,
// // // //   Plus,
// // // // } from "lucide-react";
// // // // import DocumentUploadModal from "./DocumentUploadModal";

// // // // interface CandidateDetailsProps {
// // // //   candidate: any;
// // // //   onBack: () => void;
// // // //   onSaveDetails: (editFormData: any) => Promise<void>;
// // // //   onUploadDocument: (candidateId: string, form: any) => Promise<void>;
// // // //   onDeleteDocument: (candidateId: string, documentId: string) => void;
// // // //   formatCurrency: (amount: number) => string;
// // // // }

// // // // const CandidateDetails = ({
// // // //   candidate,
// // // //   onBack,
// // // //   onSaveDetails,
// // // //   onUploadDocument,
// // // //   onDeleteDocument,
// // // //   formatCurrency,
// // // // }: CandidateDetailsProps) => {
// // // //   const [isEditingDetails, setIsEditingDetails] = useState(false);
// // // //   const [editFormData, setEditFormData] = useState<any>({});
// // // //   const [isUpdating, setIsUpdating] = useState(false);
// // // //   const [showDocumentModal, setShowDocumentModal] = useState(false);

// // // //   useEffect(() => {
// // // //     setEditFormData(candidate);
// // // //     setIsEditingDetails(false);
// // // //   }, [candidate]);

// // // //   const handleSave = async () => {
// // // //     try {
// // // //       setIsUpdating(true);
// // // //       await onSaveDetails(editFormData);
// // // //       setIsEditingDetails(false);
// // // //     } catch (error) {
// // // //       // Error handling done in parent
// // // //     } finally {
// // // //       setIsUpdating(false);
// // // //     }
// // // //   };

// // // //   const handleDocumentUpload = async (candidateId: string, form: any) => {
// // // //     await onUploadDocument(candidateId, form);
// // // //     setShowDocumentModal(false);
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-white md:ml-16 p-6">
// // // //       <div className="max-w-4xl mx-auto">
// // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
// // // //           {/* Header */}
// // // //           <div className="border-b border-gray-200 p-6">
// // // //             <div className="flex items-center gap-4">
// // // //               <button
// // // //                 onClick={onBack}
// // // //                 className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
// // // //               >
// // // //                 <ArrowLeft className="w-5 h-5" />
// // // //               </button>
// // // //               <div>
// // // //                 <h1 className="text-2xl font-bold text-gray-900">
// // // //                   {candidate?.candidate}
// // // //                 </h1>
// // // //                 <p className="text-gray-600">
// // // //                   {candidate?.current_role} at {candidate?.company_name}
// // // //                 </p>
// // // //               </div>
// // // //               <div className="ml-auto">
// // // //                 <button
// // // //                   onClick={() => {
// // // //                     if (isEditingDetails) {
// // // //                       handleSave();
// // // //                     } else {
// // // //                       setIsEditingDetails(true);
// // // //                     }
// // // //                   }}
// // // //                   disabled={isUpdating}
// // // //                   className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
// // // //                 >
// // // //                   <Edit className="w-4 h-4" />
// // // //                   {isUpdating
// // // //                     ? "Saving..."
// // // //                     : isEditingDetails
// // // //                     ? "Save Details"
// // // //                     : "Edit Details"}
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Candidate Details */}
// // // //           <div className="p-6">
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // //               {/* Contact Information */}
// // // //               <ContactInfoSection
// // // //                 candidate={candidate}
// // // //                 isEditing={isEditingDetails}
// // // //                 editFormData={editFormData}
// // // //                 onEditChange={setEditFormData}
// // // //               />

// // // //               {/* Professional Information */}
// // // //               <ProfessionalInfoSection
// // // //                 candidate={candidate}
// // // //                 isEditing={isEditingDetails}
// // // //                 editFormData={editFormData}
// // // //                 onEditChange={setEditFormData}
// // // //                 formatCurrency={formatCurrency}
// // // //               />

// // // //               {/* Personal Information */}
// // // //               <PersonalInfoSection
// // // //                 candidate={candidate}
// // // //                 isEditing={isEditingDetails}
// // // //                 editFormData={editFormData}
// // // //                 onEditChange={setEditFormData}
// // // //               />

// // // //               {/* Additional Information */}
// // // //               <AdditionalInfoSection
// // // //                 candidate={candidate}
// // // //                 isEditing={isEditingDetails}
// // // //                 editFormData={editFormData}
// // // //                 onEditChange={setEditFormData}
// // // //               />

// // // //               {/* Documents */}
// // // //               <DocumentsSection
// // // //                 candidate={candidate}
// // // //                 onAddDocument={() => setShowDocumentModal(true)}
// // // //                 onDeleteDocument={onDeleteDocument}
// // // //               />

// // // //               {/* Position History */}
// // // //               <PositionHistorySection candidate={candidate} />
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Document Upload Modal */}
// // // //       {showDocumentModal && (
// // // //         <DocumentUploadModal
// // // //           candidateId={candidate?.id}
// // // //           onUpload={handleDocumentUpload}
// // // //           onClose={() => setShowDocumentModal(false)}
// // // //         />
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // // --- Sub-sections ---

// // // // const ContactInfoSection = ({
// // // //   candidate,
// // // //   isEditing,
// // // //   editFormData,
// // // //   onEditChange,
// // // // }: any) => (
// // // //   <div>
// // // //     <h3 className="text-lg font-semibold text-gray-900 mb-4">
// // // //       Contact Information
// // // //     </h3>
// // // //     <div className="space-y-3">
// // // //       <InfoRow icon={<Mail className="w-5 h-5 text-gray-500" />} label="Email">
// // // //         {isEditing ? (
// // // //           <input
// // // //             type="email"
// // // //             value={editFormData?.contact?.email || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 contact: { ...prev.contact, email: e.target.value },
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
// // // //           />
// // // //         ) : (
// // // //           <div className="text-gray-900">{candidate?.contact?.email}</div>
// // // //         )}
// // // //       </InfoRow>

// // // //       <InfoRow
// // // //         icon={<Phone className="w-5 h-5 text-gray-500" />}
// // // //         label="Phone"
// // // //       >
// // // //         {isEditing ? (
// // // //           <input
// // // //             type="tel"
// // // //             value={editFormData?.contact?.phone || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 contact: { ...prev.contact, phone: e.target.value },
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
// // // //           />
// // // //         ) : (
// // // //           <div className="text-gray-900">{candidate?.contact?.phone}</div>
// // // //         )}
// // // //       </InfoRow>

// // // //       <InfoRow
// // // //         icon={<MapPin className="w-5 h-5 text-gray-500" />}
// // // //         label="City"
// // // //       >
// // // //         {isEditing ? (
// // // //           <input
// // // //             type="text"
// // // //             value={editFormData?.location || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 location: e.target.value,
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
// // // //           />
// // // //         ) : (
// // // //           <div className="text-gray-900">{candidate?.location}</div>
// // // //         )}
// // // //       </InfoRow>

// // // //       <InfoRow
// // // //         icon={<ExternalLink className="w-5 h-5 text-gray-500" />}
// // // //         label="Resume"
// // // //       >
// // // //         {isEditing ? (
// // // //           <input
// // // //             type="url"
// // // //             value={editFormData?.contact?.resume || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 contact: { ...prev.contact, resume: e.target.value },
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
// // // //           />
// // // //         ) : (
// // // //           <a
// // // //             href={candidate?.contact?.resume}
// // // //             target="_blank"
// // // //             rel="noopener noreferrer"
// // // //             className="text-green-600 hover:text-green-800 underline"
// // // //           >
// // // //             View Resume
// // // //           </a>
// // // //         )}
// // // //       </InfoRow>
// // // //     </div>
// // // //   </div>
// // // // );

// // // // const ProfessionalInfoSection = ({
// // // //   candidate,
// // // //   isEditing,
// // // //   editFormData,
// // // //   onEditChange,
// // // //   formatCurrency,
// // // // }: any) => (
// // // //   <div>
// // // //     <h3 className="text-lg font-semibold text-gray-900 mb-4">
// // // //       Professional Information
// // // //     </h3>
// // // //     <div className="space-y-3">
// // // //       <InfoRow
// // // //         icon={<Building className="w-5 h-5 text-gray-500" />}
// // // //         label="Current Organization"
// // // //       >
// // // //         {isEditing ? (
// // // //           <input
// // // //             type="text"
// // // //             value={editFormData?.company_name || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 company_name: e.target.value,
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
// // // //           />
// // // //         ) : (
// // // //           <div className="text-gray-900">{candidate?.company_name}</div>
// // // //         )}
// // // //       </InfoRow>

// // // //       <InfoRow
// // // //         icon={<User className="w-5 h-5 text-gray-500" />}
// // // //         label="Current Designation"
// // // //       >
// // // //         {isEditing ? (
// // // //           <input
// // // //             type="text"
// // // //             value={editFormData?.current_role || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 current_role: e.target.value,
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
// // // //           />
// // // //         ) : (
// // // //           <div className="text-gray-900">{candidate?.current_role}</div>
// // // //         )}
// // // //       </InfoRow>

// // // //       <InfoRow
// // // //         icon={<DollarSign className="w-5 h-5 text-gray-500" />}
// // // //         label="Current CTC"
// // // //       >
// // // //         {isEditing ? (
// // // //           <input
// // // //             type="number"
// // // //             value={editFormData?.ctc?.current || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 ctc: { ...prev.ctc, current: e.target.value },
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
// // // //           />
// // // //         ) : (
// // // //           <div className="text-gray-900 font-semibold">
// // // //             {formatCurrency(candidate?.ctc?.current)}
// // // //           </div>
// // // //         )}
// // // //       </InfoRow>

// // // //       <InfoRow
// // // //         icon={<DollarSign className="w-5 h-5 text-gray-500" />}
// // // //         label="Expected CTC"
// // // //       >
// // // //         {isEditing ? (
// // // //           <input
// // // //             type="number"
// // // //             value={editFormData?.ctc?.expected || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 ctc: { ...prev.ctc, expected: e.target.value },
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
// // // //           />
// // // //         ) : (
// // // //           <div className="text-gray-900 font-semibold">
// // // //             {formatCurrency(candidate?.ctc?.expected)}
// // // //           </div>
// // // //         )}
// // // //       </InfoRow>

// // // //       <InfoRow
// // // //         icon={<Clock className="w-5 h-5 text-gray-500" />}
// // // //         label="Notice Period"
// // // //       >
// // // //         {isEditing ? (
// // // //           <div className="flex items-center gap-2">
// // // //             <input
// // // //               type="number"
// // // //               value={editFormData?.noticePeriod || ""}
// // // //               onChange={(e) =>
// // // //                 onEditChange((prev: any) => ({
// // // //                   ...prev,
// // // //                   noticePeriod: e.target.value,
// // // //                 }))
// // // //               }
// // // //               className="text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 w-20"
// // // //             />
// // // //             <span className="text-gray-900">days</span>
// // // //           </div>
// // // //         ) : (
// // // //           <div className="text-gray-900">{candidate?.noticePeriod} days</div>
// // // //         )}
// // // //       </InfoRow>
// // // //     </div>
// // // //   </div>
// // // // );

// // // // const PersonalInfoSection = ({
// // // //   candidate,
// // // //   isEditing,
// // // //   editFormData,
// // // //   onEditChange,
// // // // }: any) => (
// // // //   <div>
// // // //     <h3 className="text-lg font-semibold text-gray-900 mb-4">
// // // //       Personal Information
// // // //     </h3>
// // // //     <div className="space-y-3">
// // // //       <div>
// // // //         <span className="text-sm text-gray-500">Education</span>
// // // //         {isEditing ? (
// // // //           <input
// // // //             type="text"
// // // //             value={editFormData?.education || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 education: e.target.value,
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 mt-1"
// // // //           />
// // // //         ) : (
// // // //           <div className="text-gray-900">{candidate?.education}</div>
// // // //         )}
// // // //       </div>
// // // //       <div>
// // // //         <span className="text-sm text-gray-500">Gender</span>
// // // //         {isEditing ? (
// // // //           <select
// // // //             value={
// // // //               editFormData?.gender?.toLowerCase() === "m"
// // // //                 ? "Male"
// // // //                 : editFormData?.gender?.toLowerCase() === "f"
// // // //                 ? "Female"
// // // //                 : editFormData?.gender || ""
// // // //             }
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 gender: e.target.value,
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 mt-1"
// // // //           >
// // // //             <option value="">Select Gender</option>
// // // //             <option value="Male">Male</option>
// // // //             <option value="Female">Female</option>
// // // //             <option value="Other">Other</option>
// // // //             <option value="Prefer not to say">Prefer not to say</option>
// // // //           </select>
// // // //         ) : (
// // // //           <div className="text-gray-900">{candidate?.gender}</div>
// // // //         )}
// // // //       </div>
// // // //       <div>
// // // //         <span className="text-sm text-gray-500">Engagement Type</span>
// // // //         {isEditing ? (
// // // //           <select
// // // //             value={
// // // //               editFormData?.engagement_type?.toLowerCase() === "remote"
// // // //                 ? "Remote"
// // // //                 : editFormData?.engagement_type?.toLowerCase() === "hybrid"
// // // //                 ? "Hybrid"
// // // //                 : editFormData?.engagement_type?.toLowerCase() === "in office"
// // // //                 ? "In office"
// // // //                 : ""
// // // //             }
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 engagement_type: e.target.value,
// // // //               }))
// // // //             }
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 mt-1"
// // // //           >
// // // //             <option value="Hybrid">Hybrid</option>
// // // //             <option value="In office">In office</option>
// // // //             <option value="Remote">Remote</option>
// // // //           </select>
// // // //         ) : (
// // // //           <div className="text-gray-900">{candidate?.engagement_type}</div>
// // // //         )}
// // // //       </div>
// // // //       <div>
// // // //         <span className="text-sm text-gray-500">Open to Relocation</span>
// // // //         {isEditing ? (
// // // //           <label className="flex items-center gap-2 mt-1">
// // // //             <input
// // // //               type="checkbox"
// // // //               checked={
// // // //                 editFormData?.open_to_relocation?.toLowerCase() === "yes"
// // // //               }
// // // //               onChange={(e) =>
// // // //                 onEditChange((prev: any) => ({
// // // //                   ...prev,
// // // //                   open_to_relocation: e.target.checked ? "Yes" : "No",
// // // //                 }))
// // // //               }
// // // //               className="rounded border-gray-300 text-green-600 focus:ring-green-500"
// // // //             />
// // // //             <span className="text-gray-900">Yes, open to relocation</span>
// // // //           </label>
// // // //         ) : (
// // // //           <div className="text-gray-900">
// // // //             {candidate?.open_to_relocation ? "Yes" : "No"}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   </div>
// // // // );

// // // // const AdditionalInfoSection = ({
// // // //   candidate,
// // // //   isEditing,
// // // //   editFormData,
// // // //   onEditChange,
// // // // }: any) => (
// // // //   <div>
// // // //     <h3 className="text-lg font-semibold text-gray-900 mb-4">
// // // //       Additional Information
// // // //     </h3>
// // // //     <div className="space-y-3">
// // // //       <div>
// // // //         <span className="text-sm text-gray-500">Recruiter</span>
// // // //         <div className="text-gray-900">
// // // //           {candidate?.candidate_position_history?.length > 0 &&
// // // //           candidate.candidate_position_history[0]?.recruiter?.length > 0
// // // //             ? candidate.candidate_position_history[0].recruiter
// // // //                 .map((r: any) => r.name || r.email)
// // // //                 .join(", ")
// // // //             : "N/A"}
// // // //         </div>
// // // //       </div>
// // // //       <div>
// // // //         <span className="text-sm text-gray-500">Special Comments</span>
// // // //         {isEditing ? (
// // // //           <textarea
// // // //             value={editFormData?.special_comments || ""}
// // // //             onChange={(e) =>
// // // //               onEditChange((prev: any) => ({
// // // //                 ...prev,
// // // //                 special_comments: e.target.value,
// // // //               }))
// // // //             }
// // // //             rows={3}
// // // //             className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 mt-1"
// // // //           />
// // // //         ) : candidate?.special_comments ? (
// // // //           <div className="text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">
// // // //             {candidate?.special_comments}
// // // //           </div>
// // // //         ) : (
// // // //           <div className="text-gray-500 italic mt-1">No comments</div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   </div>
// // // // );

// // // // const DocumentsSection = ({
// // // //   candidate,
// // // //   onAddDocument,
// // // //   onDeleteDocument,
// // // // }: any) => (
// // // //   <div className="md:col-span-2">
// // // //     <div className="flex items-center justify-between mb-4">
// // // //       <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
// // // //       <button
// // // //         onClick={onAddDocument}
// // // //         className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
// // // //       >
// // // //         <Plus className="w-4 h-4" />
// // // //         Add Document
// // // //       </button>
// // // //     </div>
// // // //     {candidate?.documents && candidate?.documents.length > 0 ? (
// // // //       <div className="space-y-3">
// // // //         {candidate?.documents.map((document: any) => (
// // // //           <div
// // // //             key={document.id}
// // // //             className="bg-gray-50 rounded-lg p-4 border border-gray-200"
// // // //           >
// // // //             <div className="flex items-center justify-between">
// // // //               <div className="flex items-center gap-3">
// // // //                 <FileText className="w-5 h-5 text-green-600" />
// // // //                 <div>
// // // //                   <a
// // // //                     href={document.url}
// // // //                     target="_blank"
// // // //                     rel="noopener noreferrer"
// // // //                     className="text-green-600 hover:text-green-800 font-medium hover:underline"
// // // //                   >
// // // //                     {document.name}
// // // //                   </a>
// // // //                   <div className="text-sm text-gray-500">
// // // //                     {document.type} • Uploaded on{" "}
// // // //                     {new Date(document.uploadDate).toLocaleDateString("en-IN")}
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //               <button
// // // //                 onClick={() =>
// // // //                   onDeleteDocument(candidate?.id, document.id)
// // // //                 }
// // // //                 className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
// // // //               >
// // // //                 <Trash2 className="w-4 h-4" />
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     ) : (
// // // //       <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
// // // //         <FileText className="w-8 h-8 mx-auto mb-2 text-gray-300" />
// // // //         <p>No documents uploaded</p>
// // // //         <button
// // // //           onClick={onAddDocument}
// // // //           className="mt-2 text-green-600 hover:text-green-800 text-sm"
// // // //         >
// // // //           Add first document
// // // //         </button>
// // // //       </div>
// // // //     )}
// // // //   </div>
// // // // );

// // // // const PositionHistorySection = ({ candidate }: any) => (
// // // //   <div className="md:col-span-2">
// // // //     <h3 className="text-lg font-semibold text-gray-900 mb-4">
// // // //       Candidate Position History
// // // //     </h3>
// // // //     {candidate?.candidate_position_history &&
// // // //     candidate?.candidate_position_history.length > 0 ? (
// // // //       <div className="space-y-3">
// // // //         {candidate?.candidate_position_history.map((position: any) => (
// // // //           <div
// // // //             key={position.id}
// // // //             className="bg-gray-50 rounded-lg p-4 border border-gray-200"
// // // //           >
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //               <div>
// // // //                 <div className="text-sm text-gray-500">Position Name</div>
// // // //                 <div className="text-gray-900 font-medium">
// // // //                   {position.job?.position}
// // // //                 </div>
// // // //               </div>
// // // //               <div>
// // // //                 <div className="text-sm text-gray-500">Client Name</div>
// // // //                 <div className="text-gray-900">
// // // //                   {position.job?.client?.client_name}
// // // //                 </div>
// // // //               </div>
// // // //               <div>
// // // //                 <div className="text-sm text-gray-500">Current Stage</div>
// // // //                 <div className="text-gray-900">{position?.current_stage}</div>
// // // //               </div>
// // // //               <div>
// // // //                 <div className="text-sm text-gray-500">Recruiter</div>
// // // //                 <div className="text-gray-900">
// // // //                   {position.recruiter?.length > 0
// // // //                     ? position.recruiter
// // // //                         .map((r: any) => r.name || r.email || "—")
// // // //                         .join(", ")
// // // //                     : "—"}
// // // //                 </div>
// // // //               </div>
// // // //               <div className="md:col-span-2">
// // // //                 <div className="text-sm text-gray-500">Last Modified</div>
// // // //                 <div className="text-gray-900">
// // // //                   {position.last_modefied
// // // //                     ? new Date(position.last_modefied).toLocaleString("en-IN", {
// // // //                         year: "numeric",
// // // //                         month: "short",
// // // //                         day: "numeric",
// // // //                         hour: "2-digit",
// // // //                         minute: "2-digit",
// // // //                         hour12: true,
// // // //                       })
// // // //                     : "—"}
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     ) : (
// // // //       <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
// // // //         <Building className="w-8 h-8 mx-auto mb-2 text-gray-300" />
// // // //         <p>No position history available</p>
// // // //       </div>
// // // //     )}
// // // //   </div>
// // // // );

// // // // // --- Shared helper component ---

// // // // const InfoRow = ({
// // // //   icon,
// // // //   label,
// // // //   children,
// // // // }: {
// // // //   icon: React.ReactNode;
// // // //   label: string;
// // // //   children: React.ReactNode;
// // // // }) => (
// // // //   <div className="flex items-center gap-3">
// // // //     {icon}
// // // //     <div className="flex-1">
// // // //       <span className="text-sm text-gray-500">{label}</span>
// // // //       {children}
// // // //     </div>
// // // //   </div>
// // // // );

// // // // export default CandidateDetails;



// // // import { useState, useEffect } from "react";
// // // import {
// // //   Edit,
// // //   X,
// // //   Mail,
// // //   Phone,
// // //   MapPin,
// // //   Building,
// // //   User,
// // //   Clock,
// // //   DollarSign,
// // //   GraduationCap,
// // //   Briefcase,
// // //   FileText,
// // //   Trash2,
// // //   Plus,
// // //   ArrowLeft,
// // //   ArrowRight,
// // //   ExternalLink,
// // //   MessageSquare,
// // //   Save,
// // // } from "lucide-react";
// // // import Header from "../Header";
// // // import DocumentUploadModal from "./DocumentUploadModal";

// // // interface CandidateDetailsProps {
// // //   candidate: any;
// // //   onBack: () => void;
// // //   onSaveDetails: (editFormData: any) => Promise<void>;
// // //   onUploadDocument: (candidateId: string, form: any) => Promise<void>;
// // //   onDeleteDocument: (candidateId: string, documentId: string) => void;
// // //   formatCurrency: (amount: number) => string;
// // // }

// // // const CandidateDetails = ({
// // //   candidate,
// // //   onBack,
// // //   onSaveDetails,
// // //   onUploadDocument,
// // //   onDeleteDocument,
// // //   formatCurrency,
// // // }: CandidateDetailsProps) => {
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [editFormData, setEditFormData] = useState<any>({});
// // //   const [isUpdating, setIsUpdating] = useState(false);
// // //   const [showDocumentModal, setShowDocumentModal] = useState(false);
// // //   const [activeTab, setActiveTab] = useState("resume");

// // //   useEffect(() => {
// // //     setEditFormData(candidate);
// // //     setIsEditing(false);
// // //   }, [candidate]);

// // //   const handleSave = async () => {
// // //     try {
// // //       setIsUpdating(true);
// // //       await onSaveDetails(editFormData);
// // //       setIsEditing(false);
// // //     } catch {
// // //       // handled in parent
// // //     } finally {
// // //       setIsUpdating(false);
// // //     }
// // //   };

// // //   const handleDocUpload = async (candidateId: string, form: any) => {
// // //     await onUploadDocument(candidateId, form);
// // //     setShowDocumentModal(false);
// // //   };

// // //   const updateField = (path: string, value: any) => {
// // //     setEditFormData((prev: any) => {
// // //       const keys = path.split(".");
// // //       if (keys.length === 1) return { ...prev, [keys[0]]: value };
// // //       if (keys.length === 2) {
// // //         return {
// // //           ...prev,
// // //           [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
// // //         };
// // //       }
// // //       return prev;
// // //     });
// // //   };

// // //   const tabs = [
// // //     { id: "resume", label: "Resume", icon: FileText },
// // //     { id: "documents", label: "Documents", icon: FileText },
// // //     { id: "history", label: "Position History", icon: Briefcase },
// // //   ];

// // //   const resumeUrl = candidate?.contact?.resume;

// // //   return (
// // //     <div className="min-h-screen bg-white">
// // //       <Header />

// // //       <main className="md:ml-16">
// // //         {/* ---- Top bar: back, name, status, actions ---- */}
// // //         <div className="border-b border-gray-200 px-6 py-4">
// // //           <div className="flex items-center gap-4">
// // //             <button
// // //               onClick={onBack}
// // //               className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
// // //             >
// // //               <ArrowLeft className="w-5 h-5" />
// // //             </button>

// // //             {/* Name + role */}
// // //             <div className="flex items-center gap-3 min-w-0 flex-1">
// // //               <div className="w-11 h-11 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
// // //                 <User className="w-5 h-5 text-teal-700" />
// // //               </div>
// // //               <div className="min-w-0">
// // //                 <h1 className="text-xl font-bold text-gray-900 truncate">
// // //                   {candidate?.candidate}
// // //                 </h1>
// // //                 <p className="text-sm text-gray-500 truncate">
// // //                   {candidate?.current_role}
// // //                   {candidate?.company_name
// // //                     ? ` at ${candidate.company_name}`
// // //                     : ""}
// // //                 </p>
// // //               </div>
// // //               {candidate?.status && (
// // //                 <span className="ml-2 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-teal-100 text-teal-700 border border-teal-200">
// // //                   <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
// // //                   {candidate.status}
// // //                 </span>
// // //               )}
// // //             </div>

// // //             {/* Actions */}
// // //             <div className="flex items-center gap-2">
// // //               {isEditing ? (
// // //                 <>
// // //                   <button
// // //                     onClick={() => {
// // //                       setEditFormData(candidate);
// // //                       setIsEditing(false);
// // //                     }}
// // //                     className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
// // //                   >
// // //                     Cancel
// // //                   </button>
// // //                   <button
// // //                     onClick={handleSave}
// // //                     disabled={isUpdating}
// // //                     className="flex items-center gap-2 px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
// // //                   >
// // //                     <Save className="w-4 h-4" />
// // //                     {isUpdating ? "Saving..." : "Save Changes"}
// // //                   </button>
// // //                 </>
// // //               ) : (
// // //                 <button
// // //                   onClick={() => setIsEditing(true)}
// // //                   className="flex items-center gap-2 px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700"
// // //                 >
// // //                   <Edit className="w-4 h-4" />
// // //                   Edit Details
// // //                 </button>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* ---- Two-column layout: left = resume/tabs, right = info cards ---- */}
// // //         <div className="flex flex-col lg:flex-row gap-0">
// // //           {/* Left column — tabs + content */}
// // //           <div className="flex-1 min-w-0 border-r border-gray-200">
// // //             {/* Tabs */}
// // //             <div className="flex items-center gap-1 px-6 pt-4 pb-0">
// // //               {tabs.map((tab) => {
// // //                 const Icon = tab.icon;
// // //                 const isActive = activeTab === tab.id;
// // //                 return (
// // //                   <button
// // //                     key={tab.id}
// // //                     onClick={() => setActiveTab(tab.id)}
// // //                     className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg border border-b-0 transition-colors ${
// // //                       isActive
// // //                         ? "bg-white text-teal-700 border-gray-200"
// // //                         : "bg-transparent text-gray-500 border-transparent hover:text-gray-700"
// // //                     }`}
// // //                   >
// // //                     <Icon className="w-4 h-4" />
// // //                     {tab.label}
// // //                   </button>
// // //                 );
// // //               })}
// // //             </div>

// // //             {/* Tab content */}
// // //             <div className="border-t border-gray-200 p-6 min-h-[500px] bg-gray-50">
// // //               {activeTab === "resume" && (
// // //                 <div>
// // //                   {resumeUrl ? (
// // //                     <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
// // //                       <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
// // //                         <span className="text-sm font-medium text-gray-700">Resume Preview</span>
// // //                         <a
// // //                           href={resumeUrl}
// // //                           target="_blank"
// // //                           rel="noopener noreferrer"
// // //                           className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-800"
// // //                         >
// // //                           <ExternalLink className="w-3.5 h-3.5" />
// // //                           Open in new tab
// // //                         </a>
// // //                       </div>
// // //                       <iframe
// // //                         src={resumeUrl}
// // //                         className="w-full h-[600px]"
// // //                         title="Resume"
// // //                       />
// // //                     </div>
// // //                   ) : (
// // //                     <div className="text-center py-16 text-gray-400">
// // //                       <FileText className="w-12 h-12 mx-auto mb-3" />
// // //                       <p className="text-sm">No resume uploaded</p>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               )}

// // //               {activeTab === "documents" && (
// // //                 <div>
// // //                   <div className="flex items-center justify-between mb-4">
// // //                     <h3 className="text-sm font-semibold text-gray-900">
// // //                       Documents ({candidate?.documents?.length || 0})
// // //                     </h3>
// // //                     <button
// // //                       onClick={() => setShowDocumentModal(true)}
// // //                       className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700"
// // //                     >
// // //                       <Plus className="w-3.5 h-3.5" />
// // //                       Upload
// // //                     </button>
// // //                   </div>
// // //                   {candidate?.documents?.length > 0 ? (
// // //                     <div className="space-y-2">
// // //                       {candidate.documents.map((doc: any) => (
// // //                         <div
// // //                           key={doc.id}
// // //                           className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200"
// // //                         >
// // //                           <div className="flex items-center gap-3 min-w-0">
// // //                             <FileText className="w-5 h-5 text-teal-600 flex-shrink-0" />
// // //                             <div className="min-w-0">
// // //                               <a
// // //                                 href={doc.url}
// // //                                 target="_blank"
// // //                                 rel="noopener noreferrer"
// // //                                 className="text-sm font-medium text-teal-600 hover:text-teal-800 hover:underline truncate block"
// // //                               >
// // //                                 {doc.name}
// // //                               </a>
// // //                               <div className="text-xs text-gray-500">
// // //                                 {doc.type} · {new Date(doc.uploadDate).toLocaleDateString("en-IN")}
// // //                               </div>
// // //                             </div>
// // //                           </div>
// // //                           <button
// // //                             onClick={() => onDeleteDocument(candidate?.id, doc.id)}
// // //                             className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors flex-shrink-0"
// // //                           >
// // //                             <Trash2 className="w-4 h-4" />
// // //                           </button>
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   ) : (
// // //                     <div className="text-center py-12 text-gray-400">
// // //                       <FileText className="w-10 h-10 mx-auto mb-2" />
// // //                       <p className="text-sm">No documents uploaded</p>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               )}

// // //               {activeTab === "history" && (
// // //                 <div>
// // //                   {candidate?.candidate_position_history?.length > 0 ? (
// // //                     <div className="space-y-3">
// // //                       {candidate.candidate_position_history.map((pos: any) => (
// // //                         <div
// // //                           key={pos.id}
// // //                           className="bg-white rounded-lg p-4 border border-gray-200"
// // //                         >
// // //                           <div className="flex items-start justify-between mb-2">
// // //                             <div>
// // //                               <div className="text-sm font-semibold text-gray-900">
// // //                                 {pos.job?.position}
// // //                               </div>
// // //                               <div className="text-xs text-gray-500">
// // //                                 {pos.job?.client?.client_name}
// // //                               </div>
// // //                             </div>
// // //                             <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-teal-100 text-teal-700">
// // //                               {pos?.current_stage}
// // //                             </span>
// // //                           </div>
// // //                           <div className="flex items-center gap-4 text-xs text-gray-500">
// // //                             <span>
// // //                               Recruiter:{" "}
// // //                               {pos.recruiter?.length > 0
// // //                                 ? pos.recruiter.map((r: any) => r.name || r.email).join(", ")
// // //                                 : "—"}
// // //                             </span>
// // //                             {pos.last_modefied && (
// // //                               <span>
// // //                                 Modified:{" "}
// // //                                 {new Date(pos.last_modefied).toLocaleDateString("en-IN", {
// // //                                   day: "numeric",
// // //                                   month: "short",
// // //                                   year: "numeric",
// // //                                 })}
// // //                               </span>
// // //                             )}
// // //                           </div>
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   ) : (
// // //                     <div className="text-center py-12 text-gray-400">
// // //                       <Briefcase className="w-10 h-10 mx-auto mb-2" />
// // //                       <p className="text-sm">No position history</p>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* Right column — info cards */}
// // //           <div className="w-full lg:w-[380px] flex-shrink-0 p-6 space-y-6">
// // //             {/* Personal Information */}
// // //             <InfoCard title="Personal Information">
// // //               <InfoRow icon={Mail} label="Email Address">
// // //                 {isEditing ? (
// // //                   <input
// // //                     type="email"
// // //                     value={editFormData?.contact?.email || ""}
// // //                     onChange={(e) => updateField("contact.email", e.target.value)}
// // //                     className="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// // //                   />
// // //                 ) : (
// // //                   <ValueBadge>{candidate?.contact?.email}</ValueBadge>
// // //                 )}
// // //               </InfoRow>
// // //               <InfoRow icon={Phone} label="Phone Number">
// // //                 {isEditing ? (
// // //                   <input
// // //                     type="tel"
// // //                     value={editFormData?.contact?.phone || ""}
// // //                     onChange={(e) => updateField("contact.phone", e.target.value)}
// // //                     className="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// // //                   />
// // //                 ) : (
// // //                   <ValueBadge>{candidate?.contact?.phone || "N/A"}</ValueBadge>
// // //                 )}
// // //               </InfoRow>
// // //               <InfoRow icon={User} label="Gender">
// // //                 {isEditing ? (
// // //                   <select
// // //                     value={editFormData?.gender || ""}
// // //                     onChange={(e) => updateField("gender", e.target.value)}
// // //                     className="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// // //                   >
// // //                     <option value="">Select</option>
// // //                     <option value="Male">Male</option>
// // //                     <option value="Female">Female</option>
// // //                     <option value="Other">Other</option>
// // //                   </select>
// // //                 ) : (
// // //                   <span className="text-sm font-medium text-gray-900">
// // //                     {candidate?.gender || "N/A"}
// // //                   </span>
// // //                 )}
// // //               </InfoRow>
// // //               <InfoRow icon={MapPin} label="Location">
// // //                 {isEditing ? (
// // //                   <input
// // //                     type="text"
// // //                     value={editFormData?.location || ""}
// // //                     onChange={(e) => updateField("location", e.target.value)}
// // //                     className="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// // //                   />
// // //                 ) : (
// // //                   <span className="text-sm font-medium text-gray-900">
// // //                     {candidate?.location || "N/A"}
// // //                   </span>
// // //                 )}
// // //               </InfoRow>
// // //             </InfoCard>

// // //             {/* Professional Information */}
// // //             <InfoCard title="Professional Information">
// // //               <InfoRow icon={Building} label="Organization">
// // //                 {isEditing ? (
// // //                   <input
// // //                     type="text"
// // //                     value={editFormData?.company_name || ""}
// // //                     onChange={(e) => updateField("company_name", e.target.value)}
// // //                     className="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// // //                   />
// // //                 ) : (
// // //                   <span className="text-sm font-medium text-gray-900">
// // //                     {candidate?.company_name || "N/A"}
// // //                   </span>
// // //                 )}
// // //               </InfoRow>
// // //               <InfoRow icon={Briefcase} label="Designation">
// // //                 {isEditing ? (
// // //                   <input
// // //                     type="text"
// // //                     value={editFormData?.current_role || ""}
// // //                     onChange={(e) => updateField("current_role", e.target.value)}
// // //                     className="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// // //                   />
// // //                 ) : (
// // //                   <span className="text-sm font-medium text-gray-900">
// // //                     {candidate?.current_role || "N/A"}
// // //                   </span>
// // //                 )}
// // //               </InfoRow>
// // //               <InfoRow icon={DollarSign} label="Current CTC">
// // //                 {isEditing ? (
// // //                   <input
// // //                     type="number"
// // //                     value={editFormData?.ctc?.current || ""}
// // //                     onChange={(e) => updateField("ctc.current", e.target.value)}
// // //                     className="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// // //                   />
// // //                 ) : (
// // //                   <span className="text-sm font-medium text-gray-900">
// // //                     {candidate?.ctc?.current
// // //                       ? formatCurrency(candidate.ctc.current)
// // //                       : "N/A"}
// // //                   </span>
// // //                 )}
// // //               </InfoRow>
// // //               <InfoRow icon={DollarSign} label="Expected CTC">
// // //                 {isEditing ? (
// // //                   <input
// // //                     type="number"
// // //                     value={editFormData?.ctc?.expected || ""}
// // //                     onChange={(e) => updateField("ctc.expected", e.target.value)}
// // //                     className="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// // //                   />
// // //                 ) : (
// // //                   <span className="text-sm font-medium text-gray-900">
// // //                     {candidate?.ctc?.expected
// // //                       ? formatCurrency(candidate.ctc.expected)
// // //                       : "N/A"}
// // //                   </span>
// // //                 )}
// // //               </InfoRow>
// // //               <InfoRow icon={Clock} label="Notice Period">
// // //                 {isEditing ? (
// // //                   <div className="flex items-center gap-2">
// // //                     <input
// // //                       type="number"
// // //                       value={editFormData?.noticePeriod || ""}
// // //                       onChange={(e) => updateField("noticePeriod", e.target.value)}
// // //                       className="w-20 text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// // //                     />
// // //                     <span className="text-sm text-gray-500">days</span>
// // //                   </div>
// // //                 ) : (
// // //                   <span className="text-sm font-medium text-gray-900">
// // //                     {candidate?.noticePeriod
// // //                       ? `${candidate.noticePeriod} days`
// // //                       : "N/A"}
// // //                   </span>
// // //                 )}
// // //               </InfoRow>
// // //             </InfoCard>

// // //             {/* Education & Other */}
// // //             <InfoCard title="Education & Other">
// // //               <InfoRow icon={GraduationCap} label="Education">
// // //                 {isEditing ? (
// // //                   <input
// // //                     type="text"
// // //                     value={editFormData?.education || ""}
// // //                     onChange={(e) => updateField("education", e.target.value)}
// // //                     className="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// // //                   />
// // //                 ) : (
// // //                   <span className="text-sm font-medium text-gray-900">
// // //                     {candidate?.education || "N/A"}
// // //                   </span>
// // //                 )}
// // //               </InfoRow>
// // //               <InfoRow icon={Briefcase} label="Engagement">
// // //                 {isEditing ? (
// // //                   <select
// // //                     value={editFormData?.engagement_type || ""}
// // //                     onChange={(e) => updateField("engagement_type", e.target.value)}
// // //                     className="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// // //                   >
// // //                     <option value="Hybrid">Hybrid</option>
// // //                     <option value="In office">In office</option>
// // //                     <option value="Remote">Remote</option>
// // //                   </select>
// // //                 ) : (
// // //                   <span className="text-sm font-medium text-gray-900">
// // //                     {candidate?.engagement_type || "N/A"}
// // //                   </span>
// // //                 )}
// // //               </InfoRow>
// // //               <InfoRow icon={MapPin} label="Open to Relocate">
// // //                 {isEditing ? (
// // //                   <label className="flex items-center gap-2">
// // //                     <input
// // //                       type="checkbox"
// // //                       checked={editFormData?.open_to_relocation?.toLowerCase?.() === "yes"}
// // //                       onChange={(e) =>
// // //                         updateField("open_to_relocation", e.target.checked ? "Yes" : "No")
// // //                       }
// // //                       className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
// // //                     />
// // //                     <span className="text-sm">Yes</span>
// // //                   </label>
// // //                 ) : (
// // //                   <span className="text-sm font-medium text-gray-900">
// // //                     {candidate?.open_to_relocation || "N/A"}
// // //                   </span>
// // //                 )}
// // //               </InfoRow>
// // //               <InfoRow icon={User} label="Recruiter">
// // //                 <span className="text-sm font-medium text-gray-900">
// // //                   {candidate?.candidate_position_history?.length > 0 &&
// // //                   candidate.candidate_position_history[0]?.recruiter?.length > 0
// // //                     ? candidate.candidate_position_history[0].recruiter
// // //                         .map((r: any) => r.name || r.email)
// // //                         .join(", ")
// // //                     : "N/A"}
// // //                 </span>
// // //               </InfoRow>
// // //             </InfoCard>

// // //             {/* Notes / Comments */}
// // //             <InfoCard title="Notes">
// // //               {isEditing ? (
// // //                 <textarea
// // //                   value={editFormData?.special_comments || ""}
// // //                   onChange={(e) => updateField("special_comments", e.target.value)}
// // //                   rows={3}
// // //                   placeholder="Write note..."
// // //                   className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// // //                 />
// // //               ) : (
// // //                 <p className="text-sm text-gray-600">
// // //                   {candidate?.special_comments || (
// // //                     <span className="text-gray-400 italic">No notes</span>
// // //                   )}
// // //                 </p>
// // //               )}
// // //             </InfoCard>
// // //           </div>
// // //         </div>
// // //       </main>

// // //       {/* Document Upload Modal */}
// // //       {showDocumentModal && (
// // //         <DocumentUploadModal
// // //           candidateId={candidate?.id}
// // //           onUpload={handleDocUpload}
// // //           onClose={() => setShowDocumentModal(false)}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // /* ---- Shared sub-components ---- */

// // // const InfoCard = ({
// // //   title,
// // //   children,
// // // }: {
// // //   title: string;
// // //   children: React.ReactNode;
// // // }) => (
// // //   <div className="border border-gray-200 rounded-lg">
// // //     <div className="px-4 py-3 border-b border-gray-200">
// // //       <h3 className="text-sm font-bold text-gray-900">{title}</h3>
// // //     </div>
// // //     <div className="px-4 py-3 space-y-3">{children}</div>
// // //   </div>
// // // );

// // // const InfoRow = ({
// // //   icon: Icon,
// // //   label,
// // //   children,
// // // }: {
// // //   icon: any;
// // //   label: string;
// // //   children: React.ReactNode;
// // // }) => (
// // //   <div className="flex items-center justify-between gap-4">
// // //     <div className="flex items-center gap-2 text-gray-500 flex-shrink-0">
// // //       <Icon className="w-4 h-4" />
// // //       <span className="text-sm">{label}</span>
// // //     </div>
// // //     <div className="text-right min-w-0">{children}</div>
// // //   </div>
// // // );

// // // const ValueBadge = ({ children }: { children: React.ReactNode }) => (
// // //   <span className="inline-flex px-3 py-1 text-sm font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-full truncate">
// // //     {children}
// // //   </span>
// // // );

// // // export default CandidateDetails;


// // import { useState, useEffect } from "react";
// // import {
// //   Edit,
// //   X,
// //   Mail,
// //   Phone,
// //   MapPin,
// //   Building,
// //   User,
// //   Clock,
// //   DollarSign,
// //   GraduationCap,
// //   Briefcase,
// //   FileText,
// //   Trash2,
// //   Plus,
// //   ArrowLeft,
// //   ExternalLink,
// //   Save,
// // } from "lucide-react";
// // import Header from "../Header";
// // import DocumentUploadModal from "./DocumentUploadModal";

// // interface CandidateDetailsProps {
// //   candidate: any;
// //   onBack: () => void;
// //   onSaveDetails: (editFormData: any) => Promise<void>;
// //   onUploadDocument: (candidateId: string, form: any) => Promise<void>;
// //   onDeleteDocument: (candidateId: string, documentId: string) => void;
// //   formatCurrency: (amount: number) => string;
// // }

// // const CandidateDetails = ({
// //   candidate,
// //   onBack,
// //   onSaveDetails,
// //   onUploadDocument,
// //   onDeleteDocument,
// //   formatCurrency,
// // }: CandidateDetailsProps) => {
// //   const [showEditModal, setShowEditModal] = useState(false);
// //   const [showDocumentModal, setShowDocumentModal] = useState(false);
// //   const [activeTab, setActiveTab] = useState("resume");

// //   const handleDocUpload = async (candidateId: string, form: any) => {
// //     await onUploadDocument(candidateId, form);
// //     setShowDocumentModal(false);
// //   };

// //   const tabs = [
// //     { id: "resume", label: "Resume", icon: FileText },
// //     { id: "documents", label: "Documents", icon: FileText },
// //     { id: "history", label: "Position History", icon: Briefcase },
// //   ];

// //   const resumeUrl = candidate?.contact?.resume;

// //   return (
// //     <div className="min-h-screen bg-white">
// //       <Header />

// //       <main className="md:ml-16">
// //         {/* ---- Top bar ---- */}
// //         <div className="px-6 py-4">
// //           <div className="flex items-center gap-4">
// //             <button
// //               onClick={onBack}
// //               className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
// //             >
// //               <ArrowLeft className="w-5 h-5" />
// //             </button>

// //             <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
// //               <User className="w-5 h-5 text-teal-700" />
// //             </div>

// //             <div className="min-w-0 flex-1">
// //               <h1 className="text-lg font-semibold text-gray-900 leading-tight">
// //                 {candidate?.candidate}
// //               </h1>
// //               <p className="text-sm text-gray-500 leading-tight mt-0.5">
// //                 {candidate?.current_role || "No designation"}
// //                 {candidate?.company_name && (
// //                   <span> · {candidate.company_name}</span>
// //                 )}
// //               </p>
// //             </div>

// //             {candidate?.status && (
// //               <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-teal-50 text-teal-700 border border-teal-200 flex-shrink-0">
// //                 <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
// //                 {candidate.status}
// //               </span>
// //             )}

// //             <button
// //               onClick={() => setShowEditModal(true)}
// //               className="flex items-center gap-2 px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex-shrink-0"
// //             >
// //               <Edit className="w-4 h-4" />
// //               Edit Details
// //             </button>
// //           </div>
// //         </div>

// //         {/* ---- Two-column layout ---- */}
// //         <div className="flex flex-col lg:flex-row">
// //           {/* Left — tabs + content */}
// //           <div className="flex-1 min-w-0 border-r border-gray-200">
// //             {/* Tabs */}
// //             <div className="flex items-center gap-1 px-6 border-b border-gray-200">
// //               {tabs.map((tab) => {
// //                 const Icon = tab.icon;
// //                 const isActive = activeTab === tab.id;
// //                 return (
// //                   <button
// //                     key={tab.id}
// //                     onClick={() => setActiveTab(tab.id)}
// //                     className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
// //                       isActive
// //                         ? "text-teal-700 border-teal-600"
// //                         : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
// //                     }`}
// //                   >
// //                     <Icon className="w-4 h-4" />
// //                     {tab.label}
// //                   </button>
// //                 );
// //               })}
// //             </div>

// //             {/* Tab content */}
// //             <div className="p-6 min-h-[500px] bg-gray-50">
// //               {activeTab === "resume" && (
// //                 <div>
// //                   {resumeUrl ? (
// //                     <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
// //                       <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
// //                         <span className="text-sm font-medium text-gray-700">Resume Preview</span>
// //                         <a
// //                           href={resumeUrl}
// //                           target="_blank"
// //                           rel="noopener noreferrer"
// //                           className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-800"
// //                         >
// //                           <ExternalLink className="w-3.5 h-3.5" />
// //                           Open in new tab
// //                         </a>
// //                       </div>
// //                       <iframe
// //                         src={resumeUrl}
// //                         className="w-full h-[600px]"
// //                         title="Resume"
// //                       />
// //                     </div>
// //                   ) : (
// //                     <div className="text-center py-16 text-gray-400">
// //                       <FileText className="w-12 h-12 mx-auto mb-3" />
// //                       <p className="text-sm">No resume uploaded</p>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}

// //               {activeTab === "documents" && (
// //                 <div>
// //                   <div className="flex items-center justify-between mb-4">
// //                     <h3 className="text-sm font-semibold text-gray-900">
// //                       Documents ({candidate?.documents?.length || 0})
// //                     </h3>
// //                     <button
// //                       onClick={() => setShowDocumentModal(true)}
// //                       className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700"
// //                     >
// //                       <Plus className="w-3.5 h-3.5" />
// //                       Upload
// //                     </button>
// //                   </div>
// //                   {candidate?.documents?.length > 0 ? (
// //                     <div className="space-y-2">
// //                       {candidate.documents.map((doc: any) => (
// //                         <div
// //                           key={doc.id}
// //                           className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200"
// //                         >
// //                           <div className="flex items-center gap-3 min-w-0">
// //                             <FileText className="w-5 h-5 text-teal-600 flex-shrink-0" />
// //                             <div className="min-w-0">
// //                               <a
// //                                 href={doc.url}
// //                                 target="_blank"
// //                                 rel="noopener noreferrer"
// //                                 className="text-sm font-medium text-teal-600 hover:text-teal-800 hover:underline truncate block"
// //                               >
// //                                 {doc.name}
// //                               </a>
// //                               <div className="text-xs text-gray-500">
// //                                 {doc.type} · {new Date(doc.uploadDate).toLocaleDateString("en-IN")}
// //                               </div>
// //                             </div>
// //                           </div>
// //                           <button
// //                             onClick={() => onDeleteDocument(candidate?.id, doc.id)}
// //                             className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors flex-shrink-0"
// //                           >
// //                             <Trash2 className="w-4 h-4" />
// //                           </button>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   ) : (
// //                     <div className="text-center py-12 text-gray-400">
// //                       <FileText className="w-10 h-10 mx-auto mb-2" />
// //                       <p className="text-sm">No documents uploaded</p>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}

// //               {activeTab === "history" && (
// //                 <div>
// //                   {candidate?.candidate_position_history?.length > 0 ? (
// //                     <div className="space-y-3">
// //                       {candidate.candidate_position_history.map((pos: any) => (
// //                         <div key={pos.id} className="bg-white rounded-lg p-4 border border-gray-200">
// //                           <div className="flex items-start justify-between mb-2">
// //                             <div>
// //                               <div className="text-sm font-semibold text-gray-900">{pos.job?.position}</div>
// //                               <div className="text-xs text-gray-500">{pos.job?.client?.client_name}</div>
// //                             </div>
// //                             <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-teal-100 text-teal-700">
// //                               {pos?.current_stage}
// //                             </span>
// //                           </div>
// //                           <div className="flex items-center gap-4 text-xs text-gray-500">
// //                             <span>
// //                               Recruiter:{" "}
// //                               {pos.recruiter?.length > 0
// //                                 ? pos.recruiter.map((r: any) => r.name || r.email).join(", ")
// //                                 : "—"}
// //                             </span>
// //                             {pos.last_modefied && (
// //                               <span>
// //                                 Modified:{" "}
// //                                 {new Date(pos.last_modefied).toLocaleDateString("en-IN", {
// //                                   day: "numeric", month: "short", year: "numeric",
// //                                 })}
// //                               </span>
// //                             )}
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   ) : (
// //                     <div className="text-center py-12 text-gray-400">
// //                       <Briefcase className="w-10 h-10 mx-auto mb-2" />
// //                       <p className="text-sm">No position history</p>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Right — info cards */}
// //           <div className="w-full lg:w-[380px] flex-shrink-0 p-6 space-y-6">
// //             <InfoCard title="Personal Information">
// //               <InfoRow icon={Mail} label="Email Address">
// //                 <ValueBadge>{candidate?.contact?.email}</ValueBadge>
// //               </InfoRow>
// //               <InfoRow icon={Phone} label="Phone Number">
// //                 <ValueBadge>{candidate?.contact?.phone || "N/A"}</ValueBadge>
// //               </InfoRow>
// //               <InfoRow icon={User} label="Gender">
// //                 <span className="text-sm font-medium text-gray-900">{candidate?.gender || "N/A"}</span>
// //               </InfoRow>
// //               <InfoRow icon={MapPin} label="Location">
// //                 <span className="text-sm font-medium text-gray-900">{candidate?.location || "N/A"}</span>
// //               </InfoRow>
// //             </InfoCard>

// //             <InfoCard title="Professional Information">
// //               <InfoRow icon={Building} label="Organization">
// //                 <span className="text-sm font-medium text-gray-900">{candidate?.company_name || "N/A"}</span>
// //               </InfoRow>
// //               <InfoRow icon={Briefcase} label="Designation">
// //                 <span className="text-sm font-medium text-gray-900">{candidate?.current_role || "N/A"}</span>
// //               </InfoRow>
// //               <InfoRow icon={DollarSign} label="Current CTC">
// //                 <span className="text-sm font-medium text-gray-900">
// //                   {candidate?.ctc?.current ? formatCurrency(candidate.ctc.current) : "N/A"}
// //                 </span>
// //               </InfoRow>
// //               <InfoRow icon={DollarSign} label="Expected CTC">
// //                 <span className="text-sm font-medium text-gray-900">
// //                   {candidate?.ctc?.expected ? formatCurrency(candidate.ctc.expected) : "N/A"}
// //                 </span>
// //               </InfoRow>
// //               <InfoRow icon={Clock} label="Notice Period">
// //                 <span className="text-sm font-medium text-gray-900">
// //                   {candidate?.noticePeriod ? `${candidate.noticePeriod} days` : "N/A"}
// //                 </span>
// //               </InfoRow>
// //             </InfoCard>

// //             <InfoCard title="Education & Other">
// //               <InfoRow icon={GraduationCap} label="Education">
// //                 <span className="text-sm font-medium text-gray-900">{candidate?.education || "N/A"}</span>
// //               </InfoRow>
// //               <InfoRow icon={Briefcase} label="Engagement">
// //                 <span className="text-sm font-medium text-gray-900">{candidate?.engagement_type || "N/A"}</span>
// //               </InfoRow>
// //               <InfoRow icon={MapPin} label="Open to Relocate">
// //                 <span className="text-sm font-medium text-gray-900">{candidate?.open_to_relocation || "N/A"}</span>
// //               </InfoRow>
// //               <InfoRow icon={User} label="Recruiter">
// //                 <span className="text-sm font-medium text-gray-900">
// //                   {candidate?.candidate_position_history?.length > 0 &&
// //                   candidate.candidate_position_history[0]?.recruiter?.length > 0
// //                     ? candidate.candidate_position_history[0].recruiter
// //                         .map((r: any) => r.name || r.email).join(", ")
// //                     : "N/A"}
// //                 </span>
// //               </InfoRow>
// //             </InfoCard>

// //             <InfoCard title="Notes">
// //               <p className="text-sm text-gray-600">
// //                 {candidate?.special_comments || <span className="text-gray-400 italic">No notes</span>}
// //               </p>
// //             </InfoCard>
// //           </div>
// //         </div>
// //       </main>

// //       {/* ---- Edit Details Modal ---- */}
// //       {showEditModal && (
// //         <EditCandidateModal
// //           candidate={candidate}
// //           onSave={async (data) => {
// //             await onSaveDetails(data);
// //             setShowEditModal(false);
// //           }}
// //           onClose={() => setShowEditModal(false)}
// //           formatCurrency={formatCurrency}
// //         />
// //       )}

// //       {/* ---- Document Upload Modal ---- */}
// //       {showDocumentModal && (
// //         <DocumentUploadModal
// //           candidateId={candidate?.id}
// //           onUpload={handleDocUpload}
// //           onClose={() => setShowDocumentModal(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // /* ================================================================== */
// // /* Edit Candidate Modal                                                */
// // /* ================================================================== */

// // const EditCandidateModal = ({
// //   candidate,
// //   onSave,
// //   onClose,
// //   formatCurrency,
// // }: {
// //   candidate: any;
// //   onSave: (data: any) => Promise<void>;
// //   onClose: () => void;
// //   formatCurrency: (amount: number) => string;
// // }) => {
// //   const [form, setForm] = useState<any>({ ...candidate });
// //   const [saving, setSaving] = useState(false);

// //   const update = (path: string, value: any) => {
// //     setForm((prev: any) => {
// //       const keys = path.split(".");
// //       if (keys.length === 1) return { ...prev, [keys[0]]: value };
// //       if (keys.length === 2)
// //         return { ...prev, [keys[0]]: { ...prev[keys[0]], [keys[1]]: value } };
// //       return prev;
// //     });
// //   };

// //   const handleSubmit = async () => {
// //     try {
// //       setSaving(true);
// //       await onSave(form);
// //     } catch {
// //       // parent handles error
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
// //       <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
// //         {/* Modal header */}
// //         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl z-10">
// //           <h2 className="text-lg font-semibold text-gray-900">Edit Candidate Details</h2>
// //           <button
// //             onClick={onClose}
// //             className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
// //           >
// //             <X className="w-5 h-5" />
// //           </button>
// //         </div>

// //         {/* Modal body */}
// //         <div className="px-6 py-5 space-y-5">
// //           {/* Personal */}
// //           <FormSection title="Personal Information">
// //             <div className="grid grid-cols-2 gap-4">
// //               <FormField label="Full Name">
// //                 <input
// //                   type="text"
// //                   value={form?.candidate || ""}
// //                   onChange={(e) => update("candidate", e.target.value)}
// //                   className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// //                 />
// //               </FormField>
// //               <FormField label="Email">
// //                 <input
// //                   type="email"
// //                   value={form?.contact?.email || ""}
// //                   onChange={(e) => update("contact.email", e.target.value)}
// //                   className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// //                 />
// //               </FormField>
// //               <FormField label="Phone">
// //                 <input
// //                   type="tel"
// //                   value={form?.contact?.phone || ""}
// //                   onChange={(e) => update("contact.phone", e.target.value)}
// //                   className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// //                 />
// //               </FormField>
// //               <FormField label="Gender">
// //                 <select
// //                   value={form?.gender || ""}
// //                   onChange={(e) => update("gender", e.target.value)}
// //                   className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// //                 >
// //                   <option value="">Select</option>
// //                   <option value="Male">Male</option>
// //                   <option value="Female">Female</option>
// //                   <option value="Other">Other</option>
// //                 </select>
// //               </FormField>
// //               <FormField label="Location">
// //                 <input
// //                   type="text"
// //                   value={form?.location || ""}
// //                   onChange={(e) => update("location", e.target.value)}
// //                   className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// //                 />
// //               </FormField>
// //               <FormField label="Resume URL">
// //                 <input
// //                   type="url"
// //                   value={form?.contact?.resume || ""}
// //                   onChange={(e) => update("contact.resume", e.target.value)}
// //                   className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// //                 />
// //               </FormField>
// //             </div>
// //           </FormSection>

// //           {/* Professional */}
// //           <FormSection title="Professional Information">
// //             <div className="grid grid-cols-2 gap-4">
// //               <FormField label="Organization">
// //                 <input
// //                   type="text"
// //                   value={form?.company_name || ""}
// //                   onChange={(e) => update("company_name", e.target.value)}
// //                   className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// //                 />
// //               </FormField>
// //               <FormField label="Designation">
// //                 <input
// //                   type="text"
// //                   value={form?.current_role || ""}
// //                   onChange={(e) => update("current_role", e.target.value)}
// //                   className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// //                 />
// //               </FormField>
// //               <FormField label="Current CTC (₹)">
// //                 <input
// //                   type="number"
// //                   value={form?.ctc?.current || ""}
// //                   onChange={(e) => update("ctc.current", e.target.value)}
// //                   className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// //                 />
// //               </FormField>
// //               <FormField label="Expected CTC (₹)">
// //                 <input
// //                   type="number"
// //                   value={form?.ctc?.expected || ""}
// //                   onChange={(e) => update("ctc.expected", e.target.value)}
// //                   className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// //                 />
// //               </FormField>
// //               <FormField label="Notice Period (days)">
// //                 <input
// //                   type="number"
// //                   value={form?.noticePeriod || ""}
// //                   onChange={(e) => update("noticePeriod", e.target.value)}
// //                   className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// //                 />
// //               </FormField>
// //             </div>
// //           </FormSection>

// //           {/* Education & Other */}
// //           <FormSection title="Education & Other">
// //             <div className="grid grid-cols-2 gap-4">
// //               <FormField label="Education">
// //                 <input
// //                   type="text"
// //                   value={form?.education || ""}
// //                   onChange={(e) => update("education", e.target.value)}
// //                   className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// //                 />
// //               </FormField>
// //               <FormField label="Engagement Type">
// //                 <select
// //                   value={form?.engagement_type || ""}
// //                   onChange={(e) => update("engagement_type", e.target.value)}
// //                   className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// //                 >
// //                   <option value="Hybrid">Hybrid</option>
// //                   <option value="In office">In office</option>
// //                   <option value="Remote">Remote</option>
// //                 </select>
// //               </FormField>
// //               <FormField label="Open to Relocation">
// //                 <select
// //                   value={form?.open_to_relocation || ""}
// //                   onChange={(e) => update("open_to_relocation", e.target.value)}
// //                   className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// //                 >
// //                   <option value="Yes">Yes</option>
// //                   <option value="No">No</option>
// //                 </select>
// //               </FormField>
// //             </div>
// //           </FormSection>

// //           {/* Notes */}
// //           <FormSection title="Notes">
// //             <textarea
// //               value={form?.special_comments || ""}
// //               onChange={(e) => update("special_comments", e.target.value)}
// //               rows={3}
// //               placeholder="Add notes about this candidate..."
// //               className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// //             />
// //           </FormSection>
// //         </div>

// //         {/* Modal footer */}
// //         <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 sticky bottom-0 bg-white rounded-b-xl">
// //           <button
// //             onClick={onClose}
// //             className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={handleSubmit}
// //             disabled={saving}
// //             className="flex items-center gap-2 px-5 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
// //           >
// //             <Save className="w-4 h-4" />
// //             {saving ? "Saving..." : "Save Changes"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // /* ================================================================== */
// // /* Shared sub-components                                               */
// // /* ================================================================== */

// // const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
// //   <div className="border border-gray-200 rounded-lg">
// //     <div className="px-4 py-3 border-b border-gray-100">
// //       <h3 className="text-sm font-bold text-gray-900">{title}</h3>
// //     </div>
// //     <div className="px-4 py-3 space-y-3">{children}</div>
// //   </div>
// // );

// // const InfoRow = ({
// //   icon: Icon,
// //   label,
// //   children,
// // }: {
// //   icon: any;
// //   label: string;
// //   children: React.ReactNode;
// // }) => (
// //   <div className="flex items-center justify-between gap-4">
// //     <div className="flex items-center gap-2 text-gray-500 flex-shrink-0">
// //       <Icon className="w-4 h-4" />
// //       <span className="text-sm">{label}</span>
// //     </div>
// //     <div className="min-w-0 text-right">{children}</div>
// //   </div>
// // );

// // const ValueBadge = ({ children }: { children: React.ReactNode }) => (
// //   <span className="inline-flex px-3 py-0.5 text-sm font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-full">
// //     {children}
// //   </span>
// // );

// // const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
// //   <div>
// //     <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">{title}</h3>
// //     {children}
// //   </div>
// // );

// // const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
// //   <div>
// //     <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
// //     {children}
// //   </div>
// // );

// // export default CandidateDetails;



// import { useState, useEffect } from "react";
// import {
//   Edit, X, Mail, Phone, MapPin, Building, User, Clock,
//   DollarSign, GraduationCap, Briefcase, FileText, Trash2,
//   Plus, ArrowLeft, ExternalLink, Save, ChevronLeft, ChevronRight,
// } from "lucide-react";
// import Header from "../Header";
// import DocumentUploadModal from "./DocumentUploadModal";

// interface CandidateDetailsProps {
//   candidate: any;
//   onBack: () => void;
//   onSaveDetails: (editFormData: any) => Promise<void>;
//   onUploadDocument: (candidateId: string, form: any) => Promise<void>;
//   onDeleteDocument: (candidateId: string, documentId: string) => void;
//   formatCurrency: (amount: number) => string;
//   onPrev?: () => void;
//   onNext?: () => void;
//   currentIndex: number;
//   totalCandidates: number;
// }

// const CandidateDetails = ({
//   candidate,
//   onBack,
//   onSaveDetails,
//   onUploadDocument,
//   onDeleteDocument,
//   formatCurrency,
//   onPrev,
//   onNext,
//   currentIndex,
//   totalCandidates,
// }: CandidateDetailsProps) => {
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDocumentModal, setShowDocumentModal] = useState(false);
//   const [activeTab, setActiveTab] = useState("resume");

//   const handleDocUpload = async (candidateId: string, form: any) => {
//     await onUploadDocument(candidateId, form);
//     setShowDocumentModal(false);
//   };

//   const tabs = [
//     { id: "resume", label: "Resume", icon: FileText },
//     { id: "documents", label: "Documents", icon: FileText },
//     { id: "history", label: "Position History", icon: Briefcase },
//   ];

//   const resumeUrl = candidate?.contact?.resume;

//   return (
//     <div className="min-h-screen bg-white">
//       <Header />

//       <main className="md:ml-16">
//         {/* ---- Top bar ---- */}
//         <div className="px-6 py-3 border-b border-gray-100">
//           <div className="flex items-center gap-3">
//             {/* Prev / Next */}
//             <div className="flex items-center gap-1 flex-shrink-0">
//               <button
//                 onClick={onPrev}
//                 disabled={!onPrev}
//                 className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
//                 title="Previous candidate"
//               >
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={onNext}
//                 disabled={!onNext}
//                 className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
//                 title="Next candidate"
//               >
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>

//             {totalCandidates > 0 && (
//               <span className="text-xs text-gray-400 flex-shrink-0">
//                 {currentIndex + 1} of {totalCandidates}
//               </span>
//             )}

//             <div className="w-px h-6 bg-gray-200 flex-shrink-0" />

//             {/* Back */}
//             <button
//               onClick={onBack}
//               className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
//             >
//               <X className="w-4 h-4" />
//             </button>

//             <div className="w-px h-6 bg-gray-200 flex-shrink-0" />

//             {/* Avatar + name */}
//             <div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
//               <User className="w-4 h-4 text-teal-700" />
//             </div>
//             <div className="min-w-0 flex-1">
//               <div className="flex items-center gap-2">
//                 <h1 className="text-sm font-semibold text-gray-900 truncate">
//                   {candidate?.candidate}
//                 </h1>
//                 {candidate?.status && (
//                   <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full bg-teal-50 text-teal-700 border border-teal-200 flex-shrink-0">
//                     <span className="w-1 h-1 rounded-full bg-teal-500" />
//                     {candidate.status}
//                   </span>
//                 )}
//               </div>
//               <p className="text-xs text-gray-500 truncate">
//                 {candidate?.current_role || "No designation"}
//                 {candidate?.company_name && ` · ${candidate.company_name}`}
//               </p>
//             </div>

//             {/* Edit button */}
//             <button
//               onClick={() => setShowEditModal(true)}
//               className="flex items-center gap-2 px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex-shrink-0"
//             >
//               <Edit className="w-4 h-4" />
//               Edit Details
//             </button>
//           </div>
//         </div>

//         {/* ---- Two-column layout ---- */}
//         <div className="flex flex-col lg:flex-row h-[calc(100vh-130px)]">
//           {/* Left — tabs + resume (narrower) */}
//           <div className="lg:w-[55%] min-w-0 border-r border-gray-200 flex flex-col">
//             {/* Tabs */}
//             <div className="flex items-center gap-1 px-6 border-b border-gray-200 flex-shrink-0">
//               {tabs.map((tab) => {
//                 const Icon = tab.icon;
//                 const isActive = activeTab === tab.id;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
//                       isActive
//                         ? "text-teal-700 border-teal-600"
//                         : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
//                     }`}
//                   >
//                     <Icon className="w-4 h-4" />
//                     {tab.label}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Tab content — scrollable */}
//             <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
//               {activeTab === "resume" && (
//                 <div>
//                   {resumeUrl ? (
//                     <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full">
//                       <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
//                         <span className="text-xs font-medium text-gray-600">Resume Preview</span>
//                         <a
//                           href={resumeUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800"
//                         >
//                           <ExternalLink className="w-3 h-3" />
//                           Open in new tab
//                         </a>
//                       </div>
//                       <iframe
//                         src={resumeUrl}
//                         className="w-full"
//                         style={{ height: "calc(100vh - 240px)" }}
//                         title="Resume"
//                       />
//                     </div>
//                   ) : (
//                     <div className="text-center py-16 text-gray-400">
//                       <FileText className="w-12 h-12 mx-auto mb-3" />
//                       <p className="text-sm">No resume uploaded</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {activeTab === "documents" && (
//                 <div>
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-sm font-semibold text-gray-900">
//                       Documents ({candidate?.documents?.length || 0})
//                     </h3>
//                     <button
//                       onClick={() => setShowDocumentModal(true)}
//                       className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700"
//                     >
//                       <Plus className="w-3.5 h-3.5" />
//                       Upload
//                     </button>
//                   </div>
//                   {candidate?.documents?.length > 0 ? (
//                     <div className="space-y-2">
//                       {candidate.documents.map((doc: any) => (
//                         <div key={doc.id} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
//                           <div className="flex items-center gap-3 min-w-0">
//                             <FileText className="w-5 h-5 text-teal-600 flex-shrink-0" />
//                             <div className="min-w-0">
//                               <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-teal-600 hover:underline truncate block">{doc.name}</a>
//                               <div className="text-xs text-gray-500">{doc.type} · {new Date(doc.uploadDate).toLocaleDateString("en-IN")}</div>
//                             </div>
//                           </div>
//                           <button onClick={() => onDeleteDocument(candidate?.id, doc.id)} className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded flex-shrink-0">
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12 text-gray-400">
//                       <FileText className="w-10 h-10 mx-auto mb-2" />
//                       <p className="text-sm">No documents uploaded</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {activeTab === "history" && (
//                 <div>
//                   {candidate?.candidate_position_history?.length > 0 ? (
//                     <div className="space-y-3">
//                       {candidate.candidate_position_history.map((pos: any) => (
//                         <div key={pos.id} className="bg-white rounded-lg p-4 border border-gray-200">
//                           <div className="flex items-start justify-between mb-2">
//                             <div>
//                               <div className="text-sm font-semibold text-gray-900">{pos.job?.position}</div>
//                               <div className="text-xs text-gray-500">{pos.job?.client?.client_name}</div>
//                             </div>
//                             <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-teal-100 text-teal-700">{pos?.current_stage}</span>
//                           </div>
//                           <div className="flex items-center gap-4 text-xs text-gray-500">
//                             <span>Recruiter: {pos.recruiter?.length > 0 ? pos.recruiter.map((r: any) => r.name || r.email).join(", ") : "—"}</span>
//                             {pos.last_modefied && <span>Modified: {new Date(pos.last_modefied).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12 text-gray-400">
//                       <Briefcase className="w-10 h-10 mx-auto mb-2" />
//                       <p className="text-sm">No position history</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right — info cards (wider, scrollable) */}
//           <div className="lg:w-[45%] flex-shrink-0 overflow-y-auto p-5 space-y-5">
//             <InfoCard title="Personal Information">
//               <InfoRow icon={Mail} label="Email Address">
//                 <ValueBadge>{candidate?.contact?.email}</ValueBadge>
//               </InfoRow>
//               <InfoRow icon={Phone} label="Phone Number">
//                 <ValueBadge>{candidate?.contact?.phone || "N/A"}</ValueBadge>
//               </InfoRow>
//               <InfoRow icon={User} label="Gender">
//                 <Val>{candidate?.gender || "N/A"}</Val>
//               </InfoRow>
//               <InfoRow icon={MapPin} label="Location">
//                 <Val>{candidate?.location || "N/A"}</Val>
//               </InfoRow>
//             </InfoCard>

//             <InfoCard title="Professional Information">
//               <InfoRow icon={Building} label="Organization">
//                 <Val>{candidate?.company_name || "N/A"}</Val>
//               </InfoRow>
//               <InfoRow icon={Briefcase} label="Designation">
//                 <Val>{candidate?.current_role || "N/A"}</Val>
//               </InfoRow>
//               <InfoRow icon={DollarSign} label="Current CTC">
//                 <Val>{candidate?.ctc?.current ? formatCurrency(candidate.ctc.current) : "N/A"}</Val>
//               </InfoRow>
//               <InfoRow icon={DollarSign} label="Expected CTC">
//                 <Val>{candidate?.ctc?.expected ? formatCurrency(candidate.ctc.expected) : "N/A"}</Val>
//               </InfoRow>
//               <InfoRow icon={Clock} label="Notice Period">
//                 <Val>{candidate?.noticePeriod ? `${candidate.noticePeriod} days` : "N/A"}</Val>
//               </InfoRow>
//             </InfoCard>

//             <InfoCard title="Education & Other">
//               <InfoRow icon={GraduationCap} label="Education">
//                 <Val>{candidate?.education || "N/A"}</Val>
//               </InfoRow>
//               <InfoRow icon={Briefcase} label="Engagement">
//                 <Val>{candidate?.engagement_type || "N/A"}</Val>
//               </InfoRow>
//               <InfoRow icon={MapPin} label="Open to Relocate">
//                 <Val>{candidate?.open_to_relocation || "N/A"}</Val>
//               </InfoRow>
//               <InfoRow icon={User} label="Recruiter">
//                 <Val>
//                   {candidate?.candidate_position_history?.length > 0 &&
//                   candidate.candidate_position_history[0]?.recruiter?.length > 0
//                     ? candidate.candidate_position_history[0].recruiter.map((r: any) => r.name || r.email).join(", ")
//                     : "N/A"}
//                 </Val>
//               </InfoRow>
//             </InfoCard>

//             <InfoCard title="Notes">
//               <p className="text-sm text-gray-600">
//                 {candidate?.special_comments || <span className="text-gray-400 italic">No notes</span>}
//               </p>
//             </InfoCard>
//           </div>
//         </div>
//       </main>

//       {showEditModal && (
//         <EditCandidateModal
//           candidate={candidate}
//           onSave={async (data) => { await onSaveDetails(data); setShowEditModal(false); }}
//           onClose={() => setShowEditModal(false)}
//         />
//       )}

//       {showDocumentModal && (
//         <DocumentUploadModal
//           candidateId={candidate?.id}
//           onUpload={handleDocUpload}
//           onClose={() => setShowDocumentModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// /* ================================================================== */
// /* Edit Modal                                                          */
// /* ================================================================== */

// const EditCandidateModal = ({
//   candidate, onSave, onClose,
// }: {
//   candidate: any;
//   onSave: (data: any) => Promise<void>;
//   onClose: () => void;
// }) => {
//   const [form, setForm] = useState<any>({ ...candidate });
//   const [saving, setSaving] = useState(false);

//   const update = (path: string, value: any) => {
//     setForm((prev: any) => {
//       const keys = path.split(".");
//       if (keys.length === 1) return { ...prev, [keys[0]]: value };
//       if (keys.length === 2) return { ...prev, [keys[0]]: { ...prev[keys[0]], [keys[1]]: value } };
//       return prev;
//     });
//   };

//   const handleSubmit = async () => {
//     try { setSaving(true); await onSave(form); } catch {} finally { setSaving(false); }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl z-10">
//           <h2 className="text-lg font-semibold text-gray-900">Edit Candidate Details</h2>
//           <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="px-6 py-5 space-y-5">
//           <FormSection title="Personal Information">
//             <div className="grid grid-cols-2 gap-4">
//               <FormField label="Full Name"><input type="text" value={form?.candidate || ""} onChange={(e) => update("candidate", e.target.value)} className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" /></FormField>
//               <FormField label="Email"><input type="email" value={form?.contact?.email || ""} onChange={(e) => update("contact.email", e.target.value)} className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" /></FormField>
//               <FormField label="Phone"><input type="tel" value={form?.contact?.phone || ""} onChange={(e) => update("contact.phone", e.target.value)} className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" /></FormField>
//               <FormField label="Gender"><select value={form?.gender || ""} onChange={(e) => update("gender", e.target.value)} className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"><option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></FormField>
//               <FormField label="Location"><input type="text" value={form?.location || ""} onChange={(e) => update("location", e.target.value)} className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" /></FormField>
//               <FormField label="Resume URL"><input type="url" value={form?.contact?.resume || ""} onChange={(e) => update("contact.resume", e.target.value)} className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" /></FormField>
//             </div>
//           </FormSection>

//           <FormSection title="Professional Information">
//             <div className="grid grid-cols-2 gap-4">
//               <FormField label="Organization"><input type="text" value={form?.company_name || ""} onChange={(e) => update("company_name", e.target.value)} className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" /></FormField>
//               <FormField label="Designation"><input type="text" value={form?.current_role || ""} onChange={(e) => update("current_role", e.target.value)} className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" /></FormField>
//               <FormField label="Current CTC (₹)"><input type="number" value={form?.ctc?.current || ""} onChange={(e) => update("ctc.current", e.target.value)} className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" /></FormField>
//               <FormField label="Expected CTC (₹)"><input type="number" value={form?.ctc?.expected || ""} onChange={(e) => update("ctc.expected", e.target.value)} className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" /></FormField>
//               <FormField label="Notice Period (days)"><input type="number" value={form?.noticePeriod || ""} onChange={(e) => update("noticePeriod", e.target.value)} className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" /></FormField>
//             </div>
//           </FormSection>

//           <FormSection title="Education & Other">
//             <div className="grid grid-cols-2 gap-4">
//               <FormField label="Education"><input type="text" value={form?.education || ""} onChange={(e) => update("education", e.target.value)} className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" /></FormField>
//               <FormField label="Engagement Type"><select value={form?.engagement_type || ""} onChange={(e) => update("engagement_type", e.target.value)} className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"><option value="Hybrid">Hybrid</option><option value="In office">In office</option><option value="Remote">Remote</option></select></FormField>
//               <FormField label="Open to Relocation"><select value={form?.open_to_relocation || ""} onChange={(e) => update("open_to_relocation", e.target.value)} className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"><option value="Yes">Yes</option><option value="No">No</option></select></FormField>
//             </div>
//           </FormSection>

//           <FormSection title="Notes">
//             <textarea value={form?.special_comments || ""} onChange={(e) => update("special_comments", e.target.value)} rows={3} placeholder="Add notes..." className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
//           </FormSection>
//         </div>

//         <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 sticky bottom-0 bg-white rounded-b-xl">
//           <button onClick={onClose} className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
//           <button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 px-5 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50">
//             <Save className="w-4 h-4" />{saving ? "Saving..." : "Save Changes"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ================================================================== */
// /* Shared components                                                   */
// /* ================================================================== */

// const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
//   <div className="border border-gray-200 rounded-lg">
//     <div className="px-4 py-3 border-b border-gray-100">
//       <h3 className="text-sm font-bold text-gray-900">{title}</h3>
//     </div>
//     <div className="px-4 py-3 space-y-3">{children}</div>
//   </div>
// );

// const InfoRow = ({ icon: Icon, label, children }: { icon: any; label: string; children: React.ReactNode }) => (
//   <div className="flex items-center justify-between gap-4">
//     <div className="flex items-center gap-2 text-gray-500 flex-shrink-0">
//       <Icon className="w-4 h-4" />
//       <span className="text-sm">{label}</span>
//     </div>
//     <div className="min-w-0 text-right">{children}</div>
//   </div>
// );

// const Val = ({ children }: { children: React.ReactNode }) => (
//   <span className="text-sm font-medium text-gray-900">{children}</span>
// );

// const ValueBadge = ({ children }: { children: React.ReactNode }) => (
//   <span className="inline-flex px-3 py-0.5 text-sm font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-full">
//     {children}
//   </span>
// );

// const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
//   <div>
//     <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">{title}</h3>
//     {children}
//   </div>
// );

// const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
//   <div>
//     <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
//     {children}
//   </div>
// );

// export default CandidateDetails;



import { useState, useEffect } from "react";
import {
  Edit, X, Mail, Phone, MapPin, Building, User, Clock,
  DollarSign, GraduationCap, Briefcase, FileText, Trash2,
  Plus, ArrowLeft, ExternalLink, Save, ChevronLeft, ChevronRight,
} from "lucide-react";
import Header from "../Header";
import DocumentUploadModal from "./DocumentUploadModal";

interface CandidateDetailsProps {
  candidate: any;
  onBack: () => void;
  onSaveDetails: (editFormData: any) => Promise<void>;
  onUploadDocument: (candidateId: string, form: any) => Promise<void>;
  onDeleteDocument: (candidateId: string, documentId: string) => void;
  formatCurrency: (amount: number) => string;
  onPrev?: () => void;
  onNext?: () => void;
  currentIndex: number;
  totalCandidates: number;
}

const CandidateDetails = ({
  candidate, onBack, onSaveDetails, onUploadDocument, onDeleteDocument,
  formatCurrency, onPrev, onNext, currentIndex, totalCandidates,
}: CandidateDetailsProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [activeTab, setActiveTab] = useState("resume");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showEditModal || showDocumentModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showEditModal, showDocumentModal]);

  const handleDocUpload = async (candidateId: string, form: any) => {
    await onUploadDocument(candidateId, form);
    setShowDocumentModal(false);
  };

  const tabs = [
    { id: "resume", label: "Resume", icon: FileText },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "history", label: "Position History", icon: Briefcase },
  ];

  const resumeUrl = candidate?.contact?.resume;

  return (
    <div className="h-screen flex flex-col bg-white">
      <Header />

      <main className="md:ml-16 flex flex-col flex-1 min-h-0">
        {/* ---- Top bar (matches position detail style) ---- */}
        <div className="px-8 pt-6 pb-4 border-b border-gray-200 flex-shrink-0">
          {/* Row 1: back, name · company, badge ... nav + edit */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1 text-gray-500 hover:text-gray-900 transition-colors flex-shrink-0"
              title="Back to list"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="min-w-0 flex-1 flex items-center gap-2 flex-wrap">
              {/* LINE 72 — change fontSize below to adjust name size */}
              <h1 className="font-semibold text-gray-900 truncate" style={{ fontSize: "25px", lineHeight: "24px" }}>
                {candidate?.candidate}
              </h1>
              {candidate?.company_name && (
                <>
                  <span className="text-gray-300">·</span>
                  <span className="text-sm text-gray-600 truncate">
                    {candidate.company_name}
                  </span>
                </>
              )}
              {candidate?.status && (
                <span className="inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full bg-teal-50 text-teal-700 border border-teal-200 flex-shrink-0">
                  {candidate.status}
                </span>
              )}
            </div>

            {/* Prev / Next */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={onPrev}
                disabled={!onPrev}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={onNext}
                disabled={!onNext}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Edit button — outline style like position page */}
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex-shrink-0"
            >
              <Edit className="w-4 h-4" />
              Edit candidate
            </button>
          </div>

          {/* Row 2: metadata */}
          <div className="mt-2 ml-8 flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
            {candidate?.current_role && (
              <>
                <Briefcase className="w-3.5 h-3.5" />
                <span>{candidate.current_role}</span>
                <span className="text-gray-300">·</span>
              </>
            )}
            <MapPin className="w-3.5 h-3.5" />
            <span>{candidate?.location || "N/A"}</span>
            <span className="text-gray-300">·</span>
            <DollarSign className="w-3.5 h-3.5" />
            <span>CTC: {candidate?.ctc?.current ? formatCurrency(candidate.ctc.current) : "N/A"}</span>
            <span className="text-gray-300">·</span>
            <Clock className="w-3.5 h-3.5" />
            <span>Notice: {candidate?.noticePeriod ? `${candidate.noticePeriod} days` : "N/A"}</span>
          </div>
        </div>

        {/* ---- Tabs ---- */}
        <div className="flex items-center gap-1 px-8 border-b border-gray-200 flex-shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                  isActive
                    ? "text-teal-700 border-teal-600"
                    : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ---- Two-column layout ---- */}
        <div className="flex flex-col lg:flex-row flex-1 min-h-0">
          {/* Left — resume (wider) */}
          <div className="lg:w-[65%] min-w-0 border-r border-gray-200 flex flex-col">

            <div className={`flex-1 min-h-0 ${activeTab === "resume" ? "" : "overflow-y-auto p-5"} bg-gray-50`}>
              {activeTab === "resume" && (
                <div className="h-full flex flex-col">
                  {resumeUrl ? (
                    <>
                      <div className="flex items-center justify-between px-4 py-1.5 bg-white border-b border-gray-200 flex-shrink-0">
                        <span className="text-xs font-medium text-gray-600">Resume Preview</span>
                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800">
                          <ExternalLink className="w-3 h-3" />Open in new tab
                        </a>
                      </div>
                      <iframe src={resumeUrl} className="w-full flex-1 min-h-0" title="Resume" />
                    </>
                  ) : (
                    <div className="text-center py-16 text-gray-400">
                      <FileText className="w-12 h-12 mx-auto mb-3" /><p className="text-sm">No resume uploaded</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "documents" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-900">Documents ({candidate?.documents?.length || 0})</h3>
                    <button onClick={() => setShowDocumentModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                      <Plus className="w-3.5 h-3.5" />Upload
                    </button>
                  </div>
                  {candidate?.documents?.length > 0 ? (
                    <div className="space-y-2">
                      {candidate.documents.map((doc: any) => (
                        <div key={doc.id} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                          <div className="flex items-center gap-3 min-w-0">
                            <FileText className="w-5 h-5 text-teal-600 flex-shrink-0" />
                            <div className="min-w-0">
                              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-teal-600 hover:underline truncate block">{doc.name}</a>
                              <div className="text-xs text-gray-500">{doc.type} · {new Date(doc.uploadDate).toLocaleDateString("en-IN")}</div>
                            </div>
                          </div>
                          <button onClick={() => onDeleteDocument(candidate?.id, doc.id)} className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded flex-shrink-0"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-400"><FileText className="w-10 h-10 mx-auto mb-2" /><p className="text-sm">No documents uploaded</p></div>
                  )}
                </div>
              )}

              {activeTab === "history" && (
                <div>
                  {candidate?.candidate_position_history?.length > 0 ? (
                    <div className="space-y-3">
                      {candidate.candidate_position_history.map((pos: any) => (
                        <div key={pos.id} className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{pos.job?.position}</div>
                              <div className="text-xs text-gray-500">{pos.job?.client?.client_name}</div>
                            </div>
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-teal-100 text-teal-700">{pos?.current_stage}</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Recruiter: {pos.recruiter?.length > 0 ? pos.recruiter.map((r: any) => r.name || r.email).join(", ") : "—"}</span>
                            {pos.last_modefied && <span>Modified: {new Date(pos.last_modefied).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-400"><Briefcase className="w-10 h-10 mx-auto mb-2" /><p className="text-sm">No position history</p></div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right — info cards (narrower, compact) */}
          <div className="lg:w-[35%] flex-shrink-0 overflow-y-auto p-4 space-y-4">
            <InfoCard title="Personal Information">
              <InfoRow icon={Mail} label="Email Address"><ValueBadge>{candidate?.contact?.email}</ValueBadge></InfoRow>
              <InfoRow icon={Phone} label="Phone Number"><ValueBadge>{candidate?.contact?.phone || "N/A"}</ValueBadge></InfoRow>
              <InfoRow icon={User} label="Gender"><Val>{candidate?.gender || "N/A"}</Val></InfoRow>
              <InfoRow icon={MapPin} label="Location"><Val>{candidate?.location || "N/A"}</Val></InfoRow>
            </InfoCard>

            <InfoCard title="Professional Information">
              <InfoRow icon={Building} label="Organization"><Val>{candidate?.company_name || "N/A"}</Val></InfoRow>
              <InfoRow icon={Briefcase} label="Designation"><Val>{candidate?.current_role || "N/A"}</Val></InfoRow>
              <InfoRow icon={DollarSign} label="Current CTC"><Val>{candidate?.ctc?.current ? formatCurrency(candidate.ctc.current) : "N/A"}</Val></InfoRow>
              <InfoRow icon={DollarSign} label="Expected CTC"><Val>{candidate?.ctc?.expected ? formatCurrency(candidate.ctc.expected) : "N/A"}</Val></InfoRow>
              <InfoRow icon={Clock} label="Notice Period"><Val>{candidate?.noticePeriod ? `${candidate.noticePeriod} days` : "N/A"}</Val></InfoRow>
            </InfoCard>

            <InfoCard title="Education & Other">
              <InfoRow icon={GraduationCap} label="Education"><Val>{candidate?.education || "N/A"}</Val></InfoRow>
              <InfoRow icon={Briefcase} label="Engagement"><Val>{candidate?.engagement_type || "N/A"}</Val></InfoRow>
              <InfoRow icon={MapPin} label="Open to Relocate"><Val>{candidate?.open_to_relocation || "N/A"}</Val></InfoRow>
              <InfoRow icon={User} label="Recruiter">
                <Val>{candidate?.candidate_position_history?.length > 0 && candidate.candidate_position_history[0]?.recruiter?.length > 0
                  ? candidate.candidate_position_history[0].recruiter.map((r: any) => r.name || r.email).join(", ") : "N/A"}</Val>
              </InfoRow>
            </InfoCard>

            <InfoCard title="Notes">
              <p className="text-sm text-gray-600">{candidate?.special_comments || <span className="text-gray-400 italic">No notes</span>}</p>
            </InfoCard>
          </div>
        </div>
      </main>

      {showEditModal && (
        <EditCandidateModal
          candidate={candidate}
          onSave={async (data) => { await onSaveDetails(data); setShowEditModal(false); }}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDocumentModal && (
        <DocumentUploadModal
          candidateId={candidate?.id}
          onUpload={handleDocUpload}
          onClose={() => setShowDocumentModal(false)}
        />
      )}
    </div>
  );
};

/* ================================================================== */
/* Edit Modal                                                          */
/* ================================================================== */

const EditCandidateModal = ({ candidate, onSave, onClose }: {
  candidate: any; onSave: (data: any) => Promise<void>; onClose: () => void;
}) => {
  const [form, setForm] = useState<any>({ ...candidate });
  const [saving, setSaving] = useState(false);

  const update = (path: string, value: any) => {
    setForm((prev: any) => {
      const keys = path.split(".");
      if (keys.length === 1) return { ...prev, [keys[0]]: value };
      if (keys.length === 2) return { ...prev, [keys[0]]: { ...prev[keys[0]], [keys[1]]: value } };
      return prev;
    });
  };

  const handleSubmit = async () => {
    try { setSaving(true); await onSave(form); } catch {} finally { setSaving(false); }
  };

  const inputClass = "w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header - sticky */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">Edit Candidate Details</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body - scrollable */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          <FormSection title="Personal Information">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Full Name"><input type="text" value={form?.candidate || ""} onChange={(e) => update("candidate", e.target.value)} className={inputClass} /></FormField>
              <FormField label="Email"><input type="email" value={form?.contact?.email || ""} onChange={(e) => update("contact.email", e.target.value)} className={inputClass} /></FormField>
              <FormField label="Phone"><input type="tel" value={form?.contact?.phone || ""} onChange={(e) => update("contact.phone", e.target.value)} className={inputClass} /></FormField>
              <FormField label="Gender"><select value={form?.gender || ""} onChange={(e) => update("gender", e.target.value)} className={inputClass}><option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></FormField>
              <FormField label="Location"><input type="text" value={form?.location || ""} onChange={(e) => update("location", e.target.value)} className={inputClass} /></FormField>
              <FormField label="Resume URL"><input type="url" value={form?.contact?.resume || ""} onChange={(e) => update("contact.resume", e.target.value)} className={inputClass} /></FormField>
            </div>
          </FormSection>

          <FormSection title="Professional Information">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Organization"><input type="text" value={form?.company_name || ""} onChange={(e) => update("company_name", e.target.value)} className={inputClass} /></FormField>
              <FormField label="Designation"><input type="text" value={form?.current_role || ""} onChange={(e) => update("current_role", e.target.value)} className={inputClass} /></FormField>
              <FormField label="Current CTC (₹)"><input type="number" value={form?.ctc?.current || ""} onChange={(e) => update("ctc.current", e.target.value)} className={inputClass} /></FormField>
              <FormField label="Expected CTC (₹)"><input type="number" value={form?.ctc?.expected || ""} onChange={(e) => update("ctc.expected", e.target.value)} className={inputClass} /></FormField>
              <FormField label="Notice Period (days)"><input type="number" value={form?.noticePeriod || ""} onChange={(e) => update("noticePeriod", e.target.value)} className={inputClass} /></FormField>
            </div>
          </FormSection>

          <FormSection title="Education & Other">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Education"><input type="text" value={form?.education || ""} onChange={(e) => update("education", e.target.value)} className={inputClass} /></FormField>
              <FormField label="Engagement Type"><select value={form?.engagement_type || ""} onChange={(e) => update("engagement_type", e.target.value)} className={inputClass}><option value="Hybrid">Hybrid</option><option value="In office">In office</option><option value="Remote">Remote</option></select></FormField>
              <FormField label="Open to Relocation"><select value={form?.open_to_relocation || ""} onChange={(e) => update("open_to_relocation", e.target.value)} className={inputClass}><option value="Yes">Yes</option><option value="No">No</option></select></FormField>
            </div>
          </FormSection>

          <FormSection title="Notes">
            <textarea value={form?.special_comments || ""} onChange={(e) => update("special_comments", e.target.value)} rows={3} placeholder="Add notes..." className={inputClass} />
          </FormSection>
        </div>

        {/* Footer - sticky */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 flex-shrink-0">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
          <button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 px-5 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50">
            <Save className="w-4 h-4" />{saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================================================================== */
/* Shared components                                                   */
/* ================================================================== */

const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border border-gray-200 rounded-lg">
    <div className="px-3 py-2.5 border-b border-gray-100">
      <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">{title}</h3>
    </div>
    <div className="px-3 py-2.5 space-y-2.5">{children}</div>
  </div>
);

const InfoRow = ({ icon: Icon, label, children }: { icon: any; label: string; children: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-3">
    <div className="flex items-center gap-2 text-gray-500 flex-shrink-0">
      <Icon className="w-3.5 h-3.5" />
      <span className="text-xs">{label}</span>
    </div>
    <div className="min-w-0 text-right">{children}</div>
  </div>
);

const Val = ({ children }: { children: React.ReactNode }) => (
  <span className="text-xs font-semibold text-gray-900">{children}</span>
);

const ValueBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex px-2.5 py-0.5 text-xs font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-full">
    {children}
  </span>
);

const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">{title}</h3>
    {children}
  </div>
);

const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
    {children}
  </div>
);

export default CandidateDetails;