import React from "react";
import type { TaggedCandidate } from "./Types";

interface TaggedCandidatesSummaryProps {
  taggedCandidates: TaggedCandidate[];
}

const TaggedCandidatesSummary: React.FC<TaggedCandidatesSummaryProps> = ({
  taggedCandidates,
}) => {
  if (taggedCandidates.length === 0) return null;

  return (
    <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
      <h3 className="text-lg font-medium text-green-800 mb-2">
        Recently Tagged Candidates
      </h3>
      <div className="space-y-2">
        {taggedCandidates.map((tagged, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white p-3 rounded border"
          >
            <div>
              <span className="font-medium text-gray-900">
                {tagged.candidateName}
              </span>
              <span className="mx-2 text-gray-500">→</span>
              <span className="text-blue-600">{tagged.positionName}</span>
              <span className="mx-2 text-gray-500">at</span>
              <span className="text-gray-700">{tagged.clientName}</span>
            </div>
            <div className="text-sm text-gray-500">
              Tagged on {tagged.taggedDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaggedCandidatesSummary;