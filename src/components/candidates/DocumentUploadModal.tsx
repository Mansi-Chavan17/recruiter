// import { useState } from "react";
// import { X, Upload, FileText } from "lucide-react";

// interface DocumentFormData {
//   name: string;
//   type: string;
//   file: File | null;
// }

// interface DocumentUploadModalProps {
//   candidateId: string | undefined;
//   onUpload: (candidateId: string | undefined, form: DocumentFormData) => void;
//   onClose: () => void;
// }

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

// const DocumentUploadModal = ({
//   candidateId,
//   onUpload,
//   onClose,
// }: DocumentUploadModalProps) => {
//   const [documentForm, setDocumentForm] = useState<DocumentFormData>({
//     name: "",
//     type: "Resume",
//     file: null,
//   });

//   const handleClose = () => {
//     setDocumentForm({ name: "", type: "Resume", file: null });
//     onClose();
//   };

//   const handleSubmit = () => {
//     onUpload(candidateId, documentForm);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg shadow-2xl max-w-md w-full relative z-50">
//         <div className="flex justify-between items-center p-6 border-b border-gray-200">
//           <h2 className="text-xl font-bold text-gray-900">Upload Document</h2>
//           <button
//             onClick={handleClose}
//             className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="p-6 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Document Name *
//             </label>
//             <input
//               type="text"
//               required
//               placeholder="e.g., Resume_JohnDoe_2025"
//               value={documentForm.name}
//               onChange={(e) =>
//                 setDocumentForm((prev) => ({ ...prev, name: e.target.value }))
//               }
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Document Type
//             </label>
//             <select
//               value={documentForm.type}
//               onChange={(e) =>
//                 setDocumentForm((prev) => ({ ...prev, type: e.target.value }))
//               }
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               {DOCUMENT_TYPES.map((type) => (
//                 <option key={type} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Upload Document *
//             </label>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
//               <div className="space-y-1 text-center">
//                 <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                 <div className="flex text-sm text-gray-600">
//                   <label
//                     htmlFor="doc-file-upload"
//                     className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
//                   >
//                     <span>Upload a file</span>
//                     <input
//                       id="doc-file-upload"
//                       type="file"
//                       className="sr-only"
//                       accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                       onChange={(e) => {
//                         const file = e.target.files?.[0] || null;
//                         setDocumentForm((prev) => ({
//                           ...prev,
//                           file: file,
//                           name:
//                             prev.name ||
//                             (file ? file.name.split(".")[0] : ""),
//                         }));
//                       }}
//                     />
//                   </label>
//                   <p className="pl-1">or drag and drop</p>
//                 </div>
//                 <p className="text-xs text-gray-500">
//                   PDF, DOC, DOCX, JPG, PNG up to 10MB
//                 </p>
//               </div>
//             </div>
//             {documentForm.file && (
//               <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
//                 <FileText className="w-4 h-4" />
//                 <span>{documentForm.file.name}</span>
//                 <button
//                   onClick={() =>
//                     setDocumentForm((prev) => ({ ...prev, file: null }))
//                   }
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             )}
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
//               onClick={handleSubmit}
//               disabled={!documentForm.name.trim() || !documentForm.file}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
//             >
//               <Upload className="w-4 h-4" />
//               Upload Document
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DocumentUploadModal;



// import { useState } from "react";
// import { X, Upload, FileText } from "lucide-react";

// interface DocumentFormData {
//   name: string;
//   type: string;
//   file: File | null;
// }

// interface DocumentUploadModalProps {
//   candidateId: string | undefined;
//   onUpload: (candidateId: string | undefined, form: DocumentFormData) => void;
//   onClose: () => void;
// }

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

// const DocumentUploadModal = ({
//   candidateId,
//   onUpload,
//   onClose,
// }: DocumentUploadModalProps) => {
//   const [documentForm, setDocumentForm] = useState<DocumentFormData>({
//     name: "",
//     type: "Resume",
//     file: null,
//   });

//   const handleClose = () => {
//     setDocumentForm({ name: "", type: "Resume", file: null });
//     onClose();
//   };

//   const handleSubmit = () => {
//     onUpload(candidateId, documentForm);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg shadow-2xl max-w-md w-full relative z-50">
//         <div className="flex justify-between items-center p-6 border-b border-gray-200">
//           <h2 className="text-xl font-bold text-gray-900">Upload Document</h2>
//           <button
//             onClick={handleClose}
//             className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="p-6 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Document Name *
//             </label>
//             <input
//               type="text"
//               required
//               placeholder="e.g., Resume_JohnDoe_2025"
//               value={documentForm.name}
//               onChange={(e) =>
//                 setDocumentForm((prev) => ({ ...prev, name: e.target.value }))
//               }
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Document Type
//             </label>
//             <select
//               value={documentForm.type}
//               onChange={(e) =>
//                 setDocumentForm((prev) => ({ ...prev, type: e.target.value }))
//               }
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             >
//               {DOCUMENT_TYPES.map((type) => (
//                 <option key={type} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Upload Document *
//             </label>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
//               <div className="space-y-1 text-center">
//                 <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                 <div className="flex text-sm text-gray-600">
//                   <label
//                     htmlFor="doc-file-upload"
//                     className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
//                   >
//                     <span>Upload a file</span>
//                     <input
//                       id="doc-file-upload"
//                       type="file"
//                       className="sr-only"
//                       accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                       onChange={(e) => {
//                         const file = e.target.files?.[0] || null;
//                         setDocumentForm((prev) => ({
//                           ...prev,
//                           file: file,
//                           name:
//                             prev.name ||
//                             (file ? file.name.split(".")[0] : ""),
//                         }));
//                       }}
//                     />
//                   </label>
//                   <p className="pl-1">or drag and drop</p>
//                 </div>
//                 <p className="text-xs text-gray-500">
//                   PDF, DOC, DOCX, JPG, PNG up to 10MB
//                 </p>
//               </div>
//             </div>
//             {documentForm.file && (
//               <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
//                 <FileText className="w-4 h-4" />
//                 <span>{documentForm.file.name}</span>
//                 <button
//                   onClick={() =>
//                     setDocumentForm((prev) => ({ ...prev, file: null }))
//                   }
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             )}
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
//               onClick={handleSubmit}
//               disabled={!documentForm.name.trim() || !documentForm.file}
//               className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
//             >
//               <Upload className="w-4 h-4" />
//               Upload Document
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DocumentUploadModal;



import { useState } from "react";
import { X, Upload, FileText } from "lucide-react";

interface DocumentFormData {
  name: string;
  type: string;
  file: File | null;
}

interface DocumentUploadModalProps {
  candidateId: string | undefined;
  onUpload: (candidateId: string | undefined, form: DocumentFormData) => void;
  onClose: () => void;
}

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

const DocumentUploadModal = ({
  candidateId,
  onUpload,
  onClose,
}: DocumentUploadModalProps) => {
  const [documentForm, setDocumentForm] = useState<DocumentFormData>({
    name: "",
    type: "Resume",
    file: null,
  });

  const handleClose = () => {
    setDocumentForm({ name: "", type: "Resume", file: null });
    onClose();
  };

  const handleSubmit = () => {
    onUpload(candidateId, documentForm);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full relative z-50">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Upload Document</h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Document Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Resume_JohnDoe_2025"
              value={documentForm.name}
              onChange={(e) =>
                setDocumentForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Document Type
            </label>
            <select
              value={documentForm.type}
              onChange={(e) =>
                setDocumentForm((prev) => ({ ...prev, type: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {DOCUMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Document *
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="doc-file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="doc-file-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setDocumentForm((prev) => ({
                          ...prev,
                          file: file,
                          name:
                            prev.name ||
                            (file ? file.name.split(".")[0] : ""),
                        }));
                      }}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX, JPG, PNG up to 10MB
                </p>
              </div>
            </div>
            {documentForm.file && (
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <FileText className="w-4 h-4" />
                <span>{documentForm.file.name}</span>
                <button
                  onClick={() =>
                    setDocumentForm((prev) => ({ ...prev, file: null }))
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
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
              onClick={handleSubmit}
              disabled={!documentForm.name.trim() || !documentForm.file}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadModal;