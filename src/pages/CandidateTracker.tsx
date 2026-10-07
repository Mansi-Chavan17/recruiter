import { useState } from "react";
import Header from "../components/Header";
import { X, ChevronRight, Check, User } from "lucide-react";

interface TrackedCandidate {
  id: string;
  name: string;
  company: string;
  designation: string;
  position: string;
  client: string;
  dateSelected: string;
  currentStage: string;
  remarks: string;
  comment: string;
  stagesCompleted: string[];
}

const ALL_STAGES = [
  "Tagged to Position",
  "Call Connected",
  "Profile Uploaded",
  "Submitted for Approval",
  "Approved",
  "Shared with Client",
  "Selected by Client",
  "Interview Scheduled",
  "Interview Completed",
  "Offer Extended",
  "Offer Accepted",
  "Joined",
];

const SAMPLE_TRACKED: TrackedCandidate[] = [
  {
    id: "CT001", name: "Rajesh Sharma", company: "TCS", designation: "SVP Engineering",
    position: "VP Engineering", client: "Axis Bank", dateSelected: "2026-09-08",
    currentStage: "Interview Scheduled", remarks: "Strong fit. 20 yrs exp. 90d notice. CTC 85L",
    comment: "Excellent leadership experience and domain knowledge. Shortlisted for L1.",
    stagesCompleted: ["Tagged to Position", "Call Connected", "Profile Uploaded", "Submitted for Approval", "Approved", "Shared with Client", "Selected by Client", "Interview Scheduled"],
  },
  {
    id: "CT002", name: "Priya Mehta", company: "Infosys", designation: "VP Product",
    position: "Head of Product", client: "HDFC Bank", dateSelected: "2026-09-10",
    currentStage: "Selected by Client", remarks: "Very interested. Strong product background. 30d notice. CTC 72L",
    comment: "Strong product sense. Aligned with our roadmap vision.",
    stagesCompleted: ["Tagged to Position", "Call Connected", "Profile Uploaded", "Submitted for Approval", "Approved", "Shared with Client", "Selected by Client"],
  },
];

const STAGE_DATES: Record<string, string> = {
  "Tagged to Position": "01 Sep 2026",
  "Call Connected": "02 Sep 2026",
  "Profile Uploaded": "03 Sep 2026",
  "Submitted for Approval": "05 Sep 2026",
  "Approved": "05 Sep 2026",
  "Shared with Client": "06 Sep 2026",
  "Selected by Client": "08 Sep 2026",
  "Interview Scheduled": "12 Sep 2026",
};

const CandidateTracker = () => {
  const [candidates] = useState<TrackedCandidate[]>(SAMPLE_TRACKED);
  const [selectedCandidate, setSelectedCandidate] = useState<TrackedCandidate | null>(null);
  const [filterClient, setFilterClient] = useState("All");

  const filtered = filterClient === "All" ? candidates : candidates.filter((c) => c.client === filterClient);
  const clients = [...new Set(candidates.map((c) => c.client))];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="md:ml-16 px-6 py-4">
        {/* Filter bar — matching Candidate page pattern */}
        <div className="flex items-center gap-3 mb-4">
          <select value={filterClient} onChange={(e) => setFilterClient(e.target.value)}
            className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
            <option value="All">All Clients</option>
            {clients.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="text-sm text-gray-600">{filtered.length} tracked candidate{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {/* Candidate cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 border border-gray-200 rounded-lg">
            <User className="w-10 h-10 mx-auto text-gray-300 mb-3" />
            <p className="text-sm text-gray-500">No selected candidates yet.</p>
            <p className="text-sm text-gray-400 mt-1">Trackers are created automatically when a client selects a candidate.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((c) => {
              const stageIndex = ALL_STAGES.indexOf(c.currentStage);
              const progress = Math.round(((stageIndex + 1) / ALL_STAGES.length) * 100);
              return (
                <div key={c.id} onClick={() => setSelectedCandidate(c)}
                  className="bg-white border border-gray-200 rounded-lg p-5 cursor-pointer hover:shadow-sm hover:border-gray-300 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{c.name}</div>
                      <div className="text-sm text-gray-500">{c.designation} at {c.company}</div>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{c.position}</span>
                        <span className="text-xs text-gray-400">{c.client}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">Current Stage</div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                        {c.currentStage}
                      </span>
                    </div>
                    <div className="w-20">
                      <div className="text-xs text-gray-500 text-center mb-1">{progress}%</div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ─── Journey Detail Modal ─── */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-lg w-full max-w-xl max-h-[88vh] overflow-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Candidate Tracker</h2>
                <p className="text-sm text-gray-500 mt-0.5">{selectedCandidate.name} — {selectedCandidate.position} at {selectedCandidate.client}</p>
              </div>
              <button onClick={() => setSelectedCandidate(null)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>

            <div className="p-6">
              {/* Profile summary grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                {([
                  ["Company", selectedCandidate.company],
                  ["Designation", selectedCandidate.designation],
                  ["Client", selectedCandidate.client],
                  ["Selected On", selectedCandidate.dateSelected],
                ] as [string, string][]).map(([label, value]) => (
                  <div key={label}>
                    <div className="text-xs font-medium text-gray-500 uppercase">{label}</div>
                    <div className="text-sm text-gray-900 mt-0.5">{value}</div>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Journey Timeline</h3>
              <div className="relative pl-7">
                {ALL_STAGES.map((stage, i) => {
                  const isDone = selectedCandidate.stagesCompleted.includes(stage);
                  const isCurrent = stage === selectedCandidate.currentStage;
                  const isLast = i === ALL_STAGES.length - 1;
                  const date = isDone ? (STAGE_DATES[stage] || "—") : "—";

                  return (
                    <div key={stage} className={`flex gap-4 ${isLast ? "" : "pb-5"} relative`}>
                      {!isLast && (
                        <div className={`absolute left-[-14px] top-5 w-0.5 h-full ${isDone ? "bg-teal-500" : "bg-gray-200"}`} />
                      )}
                      <div className={`absolute left-[-20px] top-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center
                        ${isDone ? (isCurrent ? "bg-teal-500 ring-4 ring-teal-100" : "bg-teal-500") : "bg-gray-200"}`}>
                        {isDone && <Check className="w-2 h-2 text-white" strokeWidth={3} />}
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm ${isDone ? "font-medium text-gray-900" : "text-gray-400"}`}>{stage}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{date}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Client comment */}
              {selectedCandidate.comment && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-xs font-medium text-green-700 uppercase mb-1">Client Selection Comment</div>
                  <div className="text-sm text-green-900">{selectedCandidate.comment}</div>
                </div>
              )}

              {/* Remarks */}
              {selectedCandidate.remarks && (
                <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="text-xs font-medium text-amber-700 uppercase mb-1">Recruiter Remarks</div>
                  <div className="text-sm text-amber-900">{selectedCandidate.remarks}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateTracker;
