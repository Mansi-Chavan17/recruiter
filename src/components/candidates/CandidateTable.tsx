// // import { User, Edit } from "lucide-react";

// // interface CandidateTableProps {
// //   candidates: any[];
// //   currentPage: number;
// //   totalPages: number;
// //   totalCount: number;
// //   candidatesPerPage: number;
// //   onPageChange: (page: number) => void;
// //   onSelectCandidate: (id: string) => void;
// //   onEditCandidate: (candidate: any) => void;
// //   formatCurrency: (amount: number) => string;
// // }

// // const CandidateTable = ({
// //   candidates,
// //   currentPage,
// //   totalPages,
// //   totalCount,
// //   candidatesPerPage,
// //   onPageChange,
// //   onSelectCandidate,
// //   onEditCandidate,
// //   formatCurrency,
// // }: CandidateTableProps) => {
// //   return (
// //     <div className="overflow-x-auto">
// //       <table className="w-full">
// //         <thead className="bg-gray-50 border-b border-gray-200">
// //           <tr>
// //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               Candidate
// //             </th>
// //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               Contact
// //             </th>
// //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               Current Role
// //             </th>
// //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               CTC
// //             </th>
// //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               Location
// //             </th>
// //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               Notice Period
// //             </th>
// //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               Documents
// //             </th>
// //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               Status
// //             </th>
// //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //               Actions
// //             </th>
// //           </tr>
// //         </thead>
// //         <tbody className="bg-white divide-y divide-gray-200">
// //           {candidates.map((candidate) => (
// //             <tr
// //               key={candidate?.id}
// //               className="hover:bg-gray-50 transition-colors"
// //             >
// //               <td
// //                 className="px-6 py-4 whitespace-nowrap cursor-pointer"
// //                 onClick={() => onSelectCandidate(candidate?.id)}
// //               >
// //                 <div className="flex items-center">
// //                   <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
// //                     <User className="w-5 h-5 text-blue-600" />
// //                   </div>
// //                   <div className="ml-4">
// //                     <div className="text-sm font-medium text-gray-900">
// //                       {candidate?.candidate}
// //                     </div>
// //                     <div className="text-sm text-gray-500">
// //                       {candidate?.contact?.email}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </td>
// //               <td
// //                 className="px-6 py-4 whitespace-nowrap cursor-pointer"
// //                 onClick={() => onSelectCandidate(candidate?.id)}
// //               >
// //                 <div className="text-sm text-gray-900">
// //                   {candidate?.contact?.phone || "N/A"}
// //                 </div>
// //                 <a
// //                   href={candidate?.contact?.resume || "#"}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   onClick={(e) => e.stopPropagation()}
// //                   className="text-sm text-blue-600 hover:text-blue-800 underline"
// //                 >
// //                   Resume
// //                 </a>
// //               </td>
// //               <td
// //                 className="px-6 py-4 whitespace-nowrap cursor-pointer"
// //                 onClick={() => onSelectCandidate(candidate?.id)}
// //               >
// //                 <div className="text-sm font-medium text-gray-900">
// //                   {candidate?.current_role}
// //                 </div>
// //                 <div className="text-sm text-gray-500">
// //                   {candidate?.company_name}
// //                 </div>
// //               </td>
// //               <td
// //                 className="px-6 py-4 whitespace-nowrap cursor-pointer"
// //                 onClick={() => onSelectCandidate(candidate?.id)}
// //               >
// //                 <div className="text-sm font-medium text-gray-900">
// //                   {formatCurrency(candidate?.ctc?.current)}
// //                 </div>
// //                 <div className="text-sm text-gray-500">
// //                   Expected: {formatCurrency(candidate?.ctc?.expected)}
// //                 </div>
// //               </td>
// //               <td
// //                 className="px-6 py-4 whitespace-nowrap cursor-pointer"
// //                 onClick={() => onSelectCandidate(candidate?.id)}
// //               >
// //                 <div className="text-sm text-gray-900">
// //                   {candidate?.location}
// //                 </div>
// //               </td>
// //               <td
// //                 className="px-6 py-4 whitespace-nowrap cursor-pointer"
// //                 onClick={() => onSelectCandidate(candidate?.id)}
// //               >
// //                 <div className="text-sm text-gray-900">
// //                   {candidate?.noticePeriod} days
// //                 </div>
// //               </td>
// //               <td className="px-6 py-4 whitespace-nowrap">
// //                 <div className="flex items-center gap-2">
// //                   <div
// //                     className="text-sm text-gray-900 cursor-pointer"
// //                     onClick={() => onSelectCandidate(candidate?.id)}
// //                   >
// //                     {candidate?.documents || 0} document
// //                     {(candidate?.documents?.length || 0) !== 1 ? "s" : ""}
// //                   </div>
// //                 </div>
// //                 {candidate?.documents && candidate?.documents.length > 0 && (
// //                   <div className="mt-1">
// //                     {candidate?.documents.slice(0, 2).map((doc: any) => (
// //                       <div key={doc.id} className="text-xs text-blue-600">
// //                         <a
// //                           href={doc.url}
// //                           target="_blank"
// //                           rel="noopener noreferrer"
// //                           onClick={(e) => e.stopPropagation()}
// //                           className="hover:underline"
// //                         >
// //                           {doc.name.length > 20
// //                             ? `${doc.name.substring(0, 20)}...`
// //                             : doc.name}
// //                         </a>
// //                       </div>
// //                     ))}
// //                     {candidate?.documents.length > 2 && (
// //                       <div
// //                         className="text-xs text-gray-500 cursor-pointer hover:text-gray-700"
// //                         onClick={(e) => {
// //                           e.stopPropagation();
// //                           onSelectCandidate(candidate?.id);
// //                         }}
// //                       >
// //                         +{candidate?.documents.length - 2} more
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}
// //               </td>
// //               <td
// //                 className="px-6 py-4 whitespace-nowrap cursor-pointer"
// //                 onClick={() => onSelectCandidate(candidate?.id)}
// //               >
// //                 <span
// //                   className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
// //                     candidate?.status === "pipeline_stage"
// //                       ? "bg-orange-100 text-orange-800"
// //                       : "bg-green-100 text-green-800"
// //                   }`}
// //                 >
// //                   {candidate?.status}
// //                 </span>
// //               </td>
// //               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// //                 <button
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     onEditCandidate(candidate);
// //                   }}
// //                   className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
// //                 >
// //                   <Edit className="w-4 h-4" />
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {/* Pagination */}
// //       <div className="px-6 py-3 border-t flex items-center justify-between">
// //         <div className="text-sm text-gray-500">
// //           Showing{" "}
// //           {totalCount === 0 ? 0 : (currentPage - 1) * candidatesPerPage + 1} to{" "}
// //           {Math.min(currentPage * candidatesPerPage, totalCount)} of{" "}
// //           {totalCount} candidates
// //         </div>

// //         <div className="flex space-x-2">
// //           <button
// //             onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
// //             disabled={currentPage === 1}
// //             className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 hover:bg-gray-50"
// //           >
// //             Previous
// //           </button>

// //           <span className="px-3 py-1 text-sm bg-blue-50 border rounded">
// //             Page {currentPage} of {totalPages || 1}
// //           </span>

// //           <button
// //             onClick={() =>
// //               onPageChange(Math.min(currentPage + 1, totalPages))
// //             }
// //             disabled={currentPage === totalPages || totalPages === 0}
// //             className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 hover:bg-gray-50"
// //           >
// //             Next
// //           </button>
// //         </div>
// //       </div>

// //       {candidates.length === 0 && (
// //         <div className="text-center py-12 text-gray-500">
// //           <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
// //           <p>No candidates found matching your criteria.</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default CandidateTable;


// import { User } from "lucide-react";

// interface CandidateTableProps {
//   candidates: any[];
//   currentPage: number;
//   totalPages: number;
//   totalCount: number;
//   candidatesPerPage: number;
//   onPageChange: (page: number) => void;
//   onSelectCandidate: (id: string) => void;
//   formatCurrency: (amount: number) => string;
// }

// const CandidateTable = ({
//   candidates,
//   currentPage,
//   totalPages,
//   totalCount,
//   candidatesPerPage,
//   onPageChange,
//   onSelectCandidate,
//   formatCurrency,
// }: CandidateTableProps) => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full table-fixed">
//         <thead className="bg-gray-50 border-b border-gray-200">
//           <tr>
//             <th className="w-[25%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Candidate
//             </th>
//             <th className="w-[18%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Contact
//             </th>
//             <th className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Current Role
//             </th>
//             <th className="w-[15%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               CTC
//             </th>
//             <th className="w-[12%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Location
//             </th>
//             <th className="w-[10%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Notice Period
//             </th>
//             <th className="w-[10%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Status
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {candidates.map((candidate) => (
//             <tr
//               key={candidate?.id}
//               className="hover:bg-green-50 transition-colors cursor-pointer"
//               onClick={() => onSelectCandidate(candidate?.id)}
//             >
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
//                     <User className="w-4 h-4 text-green-600" />
//                   </div>
//                   <div className="ml-3 min-w-0">
//                     <div className="text-sm font-medium text-gray-900 truncate">
//                       {candidate?.candidate}
//                     </div>
//                     <div className="text-sm text-gray-500 truncate">
//                       {candidate?.contact?.email}
//                     </div>
//                   </div>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="text-sm text-gray-900">
//                   {candidate?.contact?.phone || "N/A"}
//                 </div>
//                 <a
//                   href={candidate?.contact?.resume || "#"}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   onClick={(e) => e.stopPropagation()}
//                   className="text-sm text-green-600 hover:text-green-800 underline"
//                 >
//                   Resume
//                 </a>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="text-sm font-medium text-gray-900 truncate">
//                   {candidate?.current_role || "—"}
//                 </div>
//                 <div className="text-sm text-gray-500 truncate">
//                   {candidate?.company_name || ""}
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="text-sm font-medium text-gray-900">
//                   {candidate?.ctc?.current
//                     ? formatCurrency(candidate.ctc.current)
//                     : "—"}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {candidate?.ctc?.expected
//                     ? `Exp: ${formatCurrency(candidate.ctc.expected)}`
//                     : ""}
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="text-sm text-gray-900">
//                   {candidate?.location || "—"}
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="text-sm text-gray-900">
//                   {candidate?.noticePeriod
//                     ? `${candidate.noticePeriod} days`
//                     : "—"}
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span
//                   className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                     candidate?.status === "pipeline_stage"
//                       ? "bg-orange-100 text-orange-800"
//                       : "bg-green-100 text-green-800"
//                   }`}
//                 >
//                   {candidate?.status || "—"}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="px-6 py-3 border-t flex items-center justify-between">
//         <div className="text-sm text-gray-500">
//           Showing{" "}
//           {totalCount === 0 ? 0 : (currentPage - 1) * candidatesPerPage + 1} to{" "}
//           {Math.min(currentPage * candidatesPerPage, totalCount)} of{" "}
//           {totalCount} candidates
//         </div>

//         <div className="flex space-x-2">
//           <button
//             onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 hover:bg-gray-50"
//           >
//             Previous
//           </button>

//           <span className="px-3 py-1 text-sm bg-green-50 text-green-700 border border-green-200 rounded">
//             Page {currentPage} of {totalPages || 1}
//           </span>

//           <button
//             onClick={() =>
//               onPageChange(Math.min(currentPage + 1, totalPages))
//             }
//             disabled={currentPage === totalPages || totalPages === 0}
//             className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 hover:bg-gray-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {candidates.length === 0 && (
//         <div className="text-center py-12 text-gray-500">
//           <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//           <p>No candidates found matching your criteria.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CandidateTable;




// import { User } from "lucide-react";

// interface CandidateTableProps {
//   candidates: any[];
//   currentPage: number;
//   totalPages: number;
//   totalCount: number;
//   candidatesPerPage: number;
//   onPageChange: (page: number) => void;
//   onSelectCandidate: (id: string) => void;
//   formatCurrency: (amount: number) => string;
// }

// const CandidateTable = ({
//   candidates,
//   currentPage,
//   totalPages,
//   totalCount,
//   candidatesPerPage,
//   onPageChange,
//   onSelectCandidate,
//   formatCurrency,
// }: CandidateTableProps) => {
//   return (
//     <div>
//       <table className="w-full">
//         <thead className="border-b border-gray-200">
//           <tr className="bg-gray-50">
//             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Candidate
//             </th>
//             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Contact
//             </th>
//             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Current Role
//             </th>
//             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               CTC
//             </th>
//             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Location
//             </th>
//             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Notice Period
//             </th>
//             <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Status
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-100">
//           {candidates.map((candidate) => (
//             <tr
//               key={candidate?.id}
//               className="hover:bg-green-50 transition-colors cursor-pointer"
//               onClick={() => onSelectCandidate(candidate?.id)}
//             >
//               <td className="px-4 py-3.5 whitespace-nowrap">
//                 <div className="text-sm font-medium text-gray-900">
//                   {candidate?.candidate}
//                 </div>
//                 <div className="text-xs text-gray-500">
//                   {candidate?.contact?.email}
//                 </div>
//               </td>
//               <td className="px-4 py-3.5 whitespace-nowrap">
//                 <div className="text-sm text-gray-900">
//                   {candidate?.contact?.phone || "N/A"}
//                 </div>
//                 <a
//                   href={candidate?.contact?.resume || "#"}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   onClick={(e) => e.stopPropagation()}
//                   className="text-xs text-green-600 hover:text-green-800 underline"
//                 >
//                   Resume
//                 </a>
//               </td>
//               <td className="px-4 py-3.5 whitespace-nowrap">
//                 <div className="text-sm font-medium text-gray-900">
//                   {candidate?.current_role || "—"}
//                 </div>
//                 <div className="text-xs text-gray-500">
//                   {candidate?.company_name || ""}
//                 </div>
//               </td>
//               <td className="px-4 py-3.5 whitespace-nowrap">
//                 <div className="text-sm font-medium text-gray-900">
//                   {candidate?.ctc?.current
//                     ? formatCurrency(candidate.ctc.current)
//                     : "—"}
//                 </div>
//                 <div className="text-xs text-gray-500">
//                   {candidate?.ctc?.expected
//                     ? `Exp: ${formatCurrency(candidate.ctc.expected)}`
//                     : ""}
//                 </div>
//               </td>
//               <td className="px-4 py-3.5 whitespace-nowrap">
//                 <div className="text-sm text-gray-900">
//                   {candidate?.location || "—"}
//                 </div>
//               </td>
//               <td className="px-4 py-3.5 whitespace-nowrap">
//                 <div className="text-sm text-gray-900">
//                   {candidate?.noticePeriod
//                     ? `${candidate.noticePeriod} days`
//                     : "—"}
//                 </div>
//               </td>
//               <td className="px-4 py-3.5 whitespace-nowrap text-right">
//                 <span
//                   className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
//                     candidate?.status === "pipeline_stage"
//                       ? "bg-orange-100 text-orange-700"
//                       : "bg-green-100 text-green-700"
//                   }`}
//                 >
//                   {candidate?.status || "—"}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="px-4 py-3 border-t flex items-center justify-between">
//         <div className="text-sm text-gray-500">
//           Showing{" "}
//           {totalCount === 0 ? 0 : (currentPage - 1) * candidatesPerPage + 1} to{" "}
//           {Math.min(currentPage * candidatesPerPage, totalCount)} of{" "}
//           {totalCount} candidates
//         </div>

//         <div className="flex space-x-2">
//           <button
//             onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 hover:bg-gray-50"
//           >
//             Previous
//           </button>

//           <span className="px-3 py-1 text-sm bg-green-50 text-green-700 border border-green-200 rounded">
//             Page {currentPage} of {totalPages || 1}
//           </span>

//           <button
//             onClick={() =>
//               onPageChange(Math.min(currentPage + 1, totalPages))
//             }
//             disabled={currentPage === totalPages || totalPages === 0}
//             className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 hover:bg-gray-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {candidates.length === 0 && (
//         <div className="text-center py-12 text-gray-500">
//           <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//           <p>No candidates found matching your criteria.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CandidateTable;


import { User } from "lucide-react";

interface CandidateTableProps {
  candidates: any[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  candidatesPerPage: number;
  onPageChange: (page: number) => void;
  onSelectCandidate: (id: string) => void;
  formatCurrency: (amount: number) => string;
}

const CandidateTable = ({
  candidates,
  currentPage,
  totalPages,
  totalCount,
  candidatesPerPage,
  onPageChange,
  onSelectCandidate,
  formatCurrency,
}: CandidateTableProps) => {
  return (
    <div>
      {/* Table header */}
      <div className="flex items-center bg-gray-50 border-b border-gray-200 px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
        <div className="w-[22%] min-w-0">Candidate</div>
        <div className="w-[16%] min-w-0">Contact</div>
        <div className="w-[18%] min-w-0">Current Role</div>
        <div className="w-[16%] min-w-0">CTC</div>
        <div className="w-[12%] min-w-0">Location</div>
        <div className="w-[8%] min-w-0">Notice</div>
        <div className="w-[8%] min-w-0 text-right">Status</div>
      </div>

      {/* Table rows */}
      <div className="divide-y divide-gray-100">
        {candidates.map((candidate) => (
          <div
            key={candidate?.id}
            className="flex items-center px-4 py-3 hover:bg-teal-50 transition-colors cursor-pointer"
            onClick={() => onSelectCandidate(candidate?.id)}
          >
            <div className="w-[22%] min-w-0 pr-2">
              <div className="text-sm font-medium text-gray-900 truncate">
                {candidate?.candidate}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {candidate?.contact?.email}
              </div>
            </div>
            <div className="w-[16%] min-w-0 pr-2">
              <div className="text-sm text-gray-900">
                {candidate?.contact?.phone || "N/A"}
              </div>
              <a
                href={candidate?.contact?.resume || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-teal-600 hover:text-teal-800 underline"
              >
                Resume
              </a>
            </div>
            <div className="w-[18%] min-w-0 pr-2">
              <div className="text-sm font-medium text-gray-900 truncate">
                {candidate?.current_role || "—"}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {candidate?.company_name || ""}
              </div>
            </div>
            <div className="w-[16%] min-w-0 pr-2">
              <div className="text-sm font-medium text-gray-900">
                {candidate?.ctc?.current
                  ? formatCurrency(candidate.ctc.current)
                  : "—"}
              </div>
              <div className="text-xs text-gray-500">
                {candidate?.ctc?.expected
                  ? `Exp: ${formatCurrency(candidate.ctc.expected)}`
                  : ""}
              </div>
            </div>
            <div className="w-[12%] min-w-0 pr-2">
              <div className="text-sm text-gray-900 truncate">
                {candidate?.location || "—"}
              </div>
            </div>
            <div className="w-[8%] min-w-0 pr-2">
              <div className="text-sm text-gray-900">
                {candidate?.noticePeriod
                  ? `${candidate.noticePeriod}d`
                  : "—"}
              </div>
            </div>
            <div className="w-[8%] min-w-0 text-right">
              <span
                className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                  candidate?.status === "pipeline_stage"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-teal-100 text-teal-700"
                }`}
              >
                {candidate?.status || "—"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {candidates.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No candidates found matching your criteria.</p>
        </div>
      )}

      {/* Pagination */}
      <div className="px-4 py-3 border-t flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing{" "}
          {totalCount === 0 ? 0 : (currentPage - 1) * candidatesPerPage + 1} to{" "}
          {Math.min(currentPage * candidatesPerPage, totalCount)} of{" "}
          {totalCount} candidates
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="px-3 py-1 text-sm bg-teal-50 text-teal-700 border border-teal-200 rounded">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateTable;