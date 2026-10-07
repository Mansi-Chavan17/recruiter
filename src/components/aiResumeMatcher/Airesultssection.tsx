import React from "react";
import { ExternalLink } from "lucide-react";
import type { AiCandidate } from "./Types";

interface AiResultsSectionProps {
  aiResults: AiCandidate[];
  selectedAiCandidates: Array<string | number>;
  onSelectAiCandidate: (candidateId: string | number) => void;
  onSelectAllAi: () => void;
  onTagCandidate: (candidate: AiCandidate) => void;
  onWhatsAppShareAi: (type: string) => void;
}

const AiResultsSection: React.FC<AiResultsSectionProps> = ({
  aiResults,
  selectedAiCandidates,
  onSelectAiCandidate,
  onSelectAllAi,
  onTagCandidate,
  onWhatsAppShareAi,
}) => {
  return (
    <div className="bg-white rounded-lg shadow border">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              AI Matching Results - Top 15 Candidates
            </h2>
            <p className="text-sm text-gray-600">
              Candidates ranked by AI score in descending order
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onWhatsAppShareAi("selected")}
              disabled={selectedAiCandidates.length === 0}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-300 text-sm"
            >
              WhatsApp Selected ({selectedAiCandidates.length})
            </button>
            <button
              onClick={() => onWhatsAppShareAi("all")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
            >
              WhatsApp All
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedAiCandidates.length === aiResults.length &&
                    aiResults.length > 0
                  }
                  onChange={onSelectAllAi}
                  className="rounded"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Candidate Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                AI Score
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Keyword Matches
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Current CTC
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
            {aiResults.map((candidate, index) => (
              <tr key={candidate.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedAiCandidates.includes(candidate.id)}
                    onChange={() => onSelectAiCandidate(candidate.id)}
                    className="rounded"
                  />
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {index + 1}
                  </span>
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
                  <div className="text-sm text-gray-900">{candidate.email}</div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      candidate.aiScore >= 80
                        ? "bg-green-100 text-green-800"
                        : candidate.aiScore >= 60
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {candidate.aiScore}%
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                    {candidate.keywordMatches || 0} matches
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-900">
                    {candidate.currentCtc}
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
                      className="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700"
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
    </div>
  );
};

export default AiResultsSection;