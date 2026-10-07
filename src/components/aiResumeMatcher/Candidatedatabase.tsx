import React from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import type { Candidate } from "./Types";

interface CandidateDatabaseProps {
  candidates: Candidate[];
  selectedCandidates: Array<string | number>;
  onSelectCandidate: (candidateId: string | number) => void;
  onSelectAll: () => void;
  onTagCandidate: (candidate: Candidate) => void;
  onWhatsAppShare: (type: string) => void;
  isLoadingPage: boolean;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  candidatesPerPage: number;
  apiTotalCandidates: number | null;
  totalLoadedCandidates: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const CandidateDatabase: React.FC<CandidateDatabaseProps> = ({
  candidates,
  selectedCandidates,
  onSelectCandidate,
  onSelectAll,
  onTagCandidate,
  onWhatsAppShare,
  isLoadingPage,
  currentPage,
  totalPages,
  startIndex,
  candidatesPerPage,
  apiTotalCandidates,
  totalLoadedCandidates,
  onPrevPage,
  onNextPage,
}) => {
  return (
    <div className="bg-white rounded-lg shadow border mb-6">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Candidate Database ({apiTotalCandidates} total)
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => onWhatsAppShare("selected")}
              disabled={selectedCandidates.length === 0}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-300 text-sm"
            >
              WhatsApp Selected ({selectedCandidates.length})
            </button>
            <button
              onClick={() => onWhatsAppShare("")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
            >
              WhatsApp All
            </button>
          </div>
        </div>
      </div>

      {isLoadingPage && (
        <div className="flex items-center justify-center py-12 bg-gray-50">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <span className="ml-3 text-gray-600">Loading candidates...</span>
        </div>
      )}

      {!isLoadingPage && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedCandidates.length === candidates.length &&
                      candidates.length > 0
                    }
                    onChange={onSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Current CTC
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Current Org
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Skills
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Resume
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedCandidates.includes(candidate.id)}
                      onChange={() => onSelectCandidate(candidate.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {candidate.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {candidate.designation}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">
                      {candidate.email}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">
                      {candidate.phone}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">
                      {candidate.currentCtc}
                    </div>
                    <div className="text-sm text-gray-500">
                      Exp: {candidate.experience}y
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">
                      {candidate.currentOrg}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {candidate.skills}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(candidate.resume || "N/A", "_blank");
                      }}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onTagCandidate(candidate)}
                        className="px-3 py-1 rounded text-xs bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                      >
                        Tag to Position
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="px-6 py-3 border-t flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {apiTotalCandidates ? (
            <>
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + candidatesPerPage, apiTotalCandidates)} of{" "}
              {apiTotalCandidates} candidates
            </>
          ) : (
            <>
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + candidatesPerPage, totalLoadedCandidates)}{" "}
              of {totalLoadedCandidates} candidates
            </>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onPrevPage}
            disabled={currentPage === 1 || isLoadingPage}
            className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 hover:bg-gray-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            Previous
          </button>
          <span className="px-3 py-1 text-sm bg-blue-50 border rounded">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={onNextPage}
            disabled={currentPage === totalPages || isLoadingPage}
            className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 hover:bg-gray-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateDatabase;