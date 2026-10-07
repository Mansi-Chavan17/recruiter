import { useState } from "react";
import { Bot, Mail, Clock, Wallet, UserCheck } from "lucide-react";
import {
  initials,
  candidateStatusTone,
  candidateStatusLabel,
} from "../positions/Positionutils";

const toLPA = (value: any, alreadyLPA = false) => {
  const num = Number(value);
  if (!Number.isFinite(num) || num === 0) return "N/A";
  return `₹${(alreadyLPA ? num : num / 100000).toFixed(1)} LPA`;
};

const Stat = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-center gap-2 min-w-0">
    <Icon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
    <span className="text-xs text-gray-500 shrink-0">{label}</span>
    <span className="text-xs font-medium text-gray-900 truncate">{value}</span>
  </div>
);

const CandidateRow = ({
  candidate,
  ctcAlreadyLPA = false,
  status,
  aiScore,
  action,
}: any) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition">
    <span className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 grid place-items-center text-sm font-semibold shrink-0">
      {initials(candidate.name)}
    </span>

    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-medium text-gray-900 truncate">
          {candidate.name || "Unnamed candidate"}
        </p>
        {status && (
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${candidateStatusTone(
              status
            )}`}
          >
            {candidateStatusLabel(status)}
          </span>
        )}
        {aiScore ? (
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              aiScore >= 85
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            AI {aiScore}
          </span>
        ) : null}
      </div>

      <p className="text-xs text-gray-500 truncate mt-0.5">{candidate.email}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-1.5 mt-2.5">
        <Stat
          icon={Wallet}
          label="Current"
          value={toLPA(
            candidate.current_ctc ?? candidate.currentCTC,
            ctcAlreadyLPA
          )}
        />
        <Stat
          icon={Wallet}
          label="Expected"
          value={toLPA(
            candidate.expected_ctc ?? candidate.expectedCTC,
            ctcAlreadyLPA
          )}
        />
        <Stat
          icon={Clock}
          label="Notice"
          value={`${candidate.noticeperiod ?? candidate.noticePeriod ?? "—"} days`}
        />
        <Stat
          icon={UserCheck}
          label="Source"
          value={candidate.recruiter || "—"}
        />
      </div>
    </div>

    {action && <div className="shrink-0">{action}</div>}
  </div>
);

const EmptyState = ({ children }: any) => (
  <div className="py-12 text-center">
    <p className="text-sm text-gray-500">{children}</p>
  </div>
);

const CandidatesTab = ({
  position,
  directApplications,
  onRunAIMatcher,
  onTagToPosition,
}: any) => {
  const submitted = position.submittedCandidates || [];
  const [view, setView] = useState<"submitted" | "direct">("submitted");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredDirect =
    statusFilter === "all"
      ? directApplications
      : directApplications.filter((c: any) => c.status === statusFilter);

  const views = [
    { id: "submitted", label: "Submitted", count: submitted.length },
    { id: "direct", label: "Direct applications", count: directApplications.length },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100">
      {/* Segmented control + contextual actions */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border-b border-gray-100">
        <div className="inline-flex p-1 bg-gray-100 rounded-lg">
          {views.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as any)}
              className={`h-8 px-3.5 rounded-md text-sm font-medium transition ${
                view === item.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {item.label}
              <span className="ml-1.5 text-xs text-gray-400">{item.count}</span>
            </button>
          ))}
        </div>

        {view === "direct" && (
          <div className="flex flex-1 items-center gap-2 sm:justify-end">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-3 flex-1 sm:flex-none border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="all">All statuses</option>
              <option value="internal_screening">Internal screening</option>
              <option value="internal_reject">Internal reject</option>
              <option value="interview_scheduled">Interview scheduled</option>
              <option value="selected">Selected</option>
            </select>
            <button
              onClick={onRunAIMatcher}
              className="h-9 px-3.5 inline-flex items-center gap-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">AI resume matcher</span>
              <span className="sm:hidden">Match</span>
            </button>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        {view === "submitted" &&
          (submitted.length ? (
            submitted.map((candidate: any) => (
              <CandidateRow
                key={candidate.id}
                candidate={candidate}
                ctcAlreadyLPA
              />
            ))
          ) : (
            <EmptyState>
              No candidates submitted yet. Tag one from the positions list.
            </EmptyState>
          ))}

        {view === "direct" &&
          (filteredDirect.length ? (
            filteredDirect.map((candidate: any) => (
              <CandidateRow
                key={candidate.id}
                candidate={candidate}
                status={candidate.status}
                aiScore={candidate.aiScore}
                action={
                  candidate.status === "internal_screening" &&
                  candidate.aiScore >= 85 ? (
                    <button
                      onClick={() => onTagToPosition(candidate)}
                      className="h-9 px-3.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 whitespace-nowrap"
                    >
                      Tag to position
                    </button>
                  ) : null
                }
              />
            ))
          ) : (
            <EmptyState>
              <Mail className="w-5 h-5 mx-auto mb-2 text-gray-300" />
              {statusFilter === "all"
                ? "No direct applications yet."
                : "No candidates in this status."}
            </EmptyState>
          ))}
      </div>
    </div>
  );
};

export default CandidatesTab;