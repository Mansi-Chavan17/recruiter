import React from "react";
import { Search, Loader2 } from "lucide-react";
import type { AiProgress } from "./Types";

interface AiMatchingSectionProps {
  aiPrompt: string;
  onPromptChange: (value: string) => void;
  onRunAiMatcher: () => void;
  isGeneratingAiScore: boolean;
  aiProgress: AiProgress;
}

const AiMatchingSection: React.FC<AiMatchingSectionProps> = ({
  aiPrompt,
  onPromptChange,
  onRunAiMatcher,
  isGeneratingAiScore,
  aiProgress,
}) => {
  return (
    <div className="bg-white rounded-lg shadow border p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">AI Matching</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          AI Prompt for Advanced Matching
        </label>
        <textarea
          value={aiPrompt}
          onChange={(e) => onPromptChange(e.target.value)}
          rows={3}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter specific requirements or criteria for AI matching..."
          disabled={isGeneratingAiScore}
        />
      </div>

      {isGeneratingAiScore && aiProgress.total > 0 && (
        <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-900">
              Processing Candidates...
            </span>
            <span className="text-sm text-purple-700">
              {aiProgress.current} / {aiProgress.total}
            </span>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-2.5">
            <div
              className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${aiProgress.percentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-purple-600 mt-2">
            {aiProgress.percentage}% complete - This may take a few moments
          </p>
        </div>
      )}

      <button
        onClick={onRunAiMatcher}
        disabled={isGeneratingAiScore}
        className={`bg-purple-600 text-white px-6 py-2 rounded-md 
          hover:bg-purple-700 flex items-center gap-2
          ${isGeneratingAiScore ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {isGeneratingAiScore ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Running AI Matcher...
          </>
        ) : (
          <>
            <Search className="w-4 h-4" />
            Run AI Matcher
          </>
        )}
      </button>
    </div>
  );
};

export default AiMatchingSection;