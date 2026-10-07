import { useState, useMemo } from "react";

interface Submission {
  id: string;
  candidateName: string;
  position: string;
  client: string;
  submittedBy: string;
  submissionDate: string;
  approvalStatus: "Submitted" | "RM Approved" | "Client Approved" | "In Pipeline" | "Rejected";
  approvedBy: string;
  sharedWithClientDate: string;
  clientFeedback: "Awaiting" | "Shortlisted" | "Interview Scheduled" | "Rejected" | "On Hold" | "Offer Stage";
  currentStage: string;
  lastUpdated: string;
  isDirect?: boolean;
}

interface PositionSummary {
  positionKey: string;
  client: string;
  position: string;
  totalSubmissions: number;
  submitted: number;
  rmApproved: number;
  clientApproved: number;
  inPipeline: number;
  rejected: number;
  directApplicants: number;
}

export function SubmissionsHub({ submissions }: { submissions: Submission[] }) {
  const [activeTab, setActiveTab] = useState<"summary" | "sheet">("summary");
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate position summary
  const positionSummaries = useMemo(() => {
    const summaryMap: Record<string, PositionSummary> = {};

    submissions.forEach((sub) => {
      const key = `${sub.client}||${sub.position}`;
      if (!summaryMap[key]) {
        summaryMap[key] = {
          positionKey: key,
          client: sub.client,
          position: sub.position,
          totalSubmissions: 0,
          submitted: 0,
          rmApproved: 0,
          clientApproved: 0,
          inPipeline: 0,
          rejected: 0,
          directApplicants: 0,
        };
      }

      summaryMap[key].totalSubmissions += 1;
      if (sub.isDirect) summaryMap[key].directApplicants += 1;
      else {
        switch (sub.approvalStatus) {
          case "Submitted":
            summaryMap[key].submitted += 1;
            break;
          case "RM Approved":
            summaryMap[key].rmApproved += 1;
            break;
          case "Client Approved":
            summaryMap[key].clientApproved += 1;
            break;
          case "In Pipeline":
            summaryMap[key].inPipeline += 1;
            break;
          case "Rejected":
            summaryMap[key].rejected += 1;
            break;
        }
      }
    });

    return Object.values(summaryMap);
  }, [submissions]);

  // Filter positions for full sheet
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const matchesSearch =
        sub.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition = !selectedPosition || `${sub.client}||${sub.position}` === selectedPosition;
      return matchesSearch && matchesPosition;
    });
  }, [submissions, searchTerm, selectedPosition]);

  // Get submissions for selected position
  const selectedPositionSubmissions = useMemo(() => {
    if (!selectedPosition) return [];
    return submissions.filter((sub) => `${sub.client}||${sub.position}` === selectedPosition);
  }, [submissions, selectedPosition]);

  const positionStats = selectedPosition
    ? positionSummaries.find((p) => p.positionKey === selectedPosition)
    : null;

  return (
    <div className="space-y-4">
      {selectedPosition && positionStats ? (
        // Position Drill-Down View
        <div>
          <button
            onClick={() => setSelectedPosition(null)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm mb-4"
          >
            ← Back to Summary
          </button>

          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {positionStats.client} - {positionStats.position}
            </h2>
            <p className="text-gray-600 text-sm">Total Submissions: {positionStats.totalSubmissions}</p>
          </div>

          {/* Position Stats Cards */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-blue-600">{positionStats.submitted}</p>
              <p className="text-xs text-gray-600 mt-1">Submitted</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-purple-600">{positionStats.rmApproved}</p>
              <p className="text-xs text-gray-600 mt-1">RM Approved</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-green-600">{positionStats.clientApproved}</p>
              <p className="text-xs text-gray-600 mt-1">Client Approved</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-orange-600">{positionStats.directApplicants}</p>
              <p className="text-xs text-gray-600 mt-1">Direct Applicants</p>
            </div>
          </div>

          {/* Tabbed Submission Details */}
          <PositionDetailTabs submissions={selectedPositionSubmissions} />
        </div>
      ) : (
        // Main Summary/Sheet View
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Submissions Hub</h2>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 flex gap-4 mb-4">
            <button
              onClick={() => setActiveTab("summary")}
              className={`px-4 py-2 font-medium border-b-2 transition ${
                activeTab === "summary"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              Position Summary
            </button>
            <button
              onClick={() => setActiveTab("sheet")}
              className={`px-4 py-2 font-medium border-b-2 transition ${
                activeTab === "sheet"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              Full Submission Sheet
            </button>
          </div>

          {/* Position Summary Tab */}
          {activeTab === "summary" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Client</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Position</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Total</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Submitted</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">RM Approved</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Client Approved</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">In Pipeline</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Rejected</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Direct</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positionSummaries.map((summary) => (
                      <tr key={summary.positionKey} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-800 font-medium">{summary.client}</td>
                        <td className="py-3 px-4 text-gray-800 font-medium">{summary.position}</td>
                        <td className="py-3 px-4 text-center font-bold text-gray-800">{summary.totalSubmissions}</td>
                        <td className="py-3 px-4 text-center text-blue-600">{summary.submitted}</td>
                        <td className="py-3 px-4 text-center text-purple-600">{summary.rmApproved}</td>
                        <td className="py-3 px-4 text-center text-green-600">{summary.clientApproved}</td>
                        <td className="py-3 px-4 text-center text-orange-600">{summary.inPipeline}</td>
                        <td className="py-3 px-4 text-center text-red-600">{summary.rejected}</td>
                        <td className="py-3 px-4 text-center text-indigo-600">{summary.directApplicants}</td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => setSelectedPosition(summary.positionKey)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-xs"
                          >
                            Drill →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Full Submission Sheet Tab */}
          {activeTab === "sheet" && (
            <>
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Search candidate, position, or client..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Candidate</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Position</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Client</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Submitted By</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Submission Date</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Approval Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Client Feedback</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubmissions.map((submission) => (
                        <tr key={submission.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-800 font-medium">{submission.candidateName}</td>
                          <td className="py-3 px-4 text-gray-700">{submission.position}</td>
                          <td className="py-3 px-4 text-gray-700">{submission.client}</td>
                          <td className="py-3 px-4 text-gray-700">{submission.submittedBy}</td>
                          <td className="py-3 px-4 text-gray-700">{submission.submissionDate}</td>
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded ${
                                submission.approvalStatus === "Submitted"
                                  ? "bg-blue-100 text-blue-800"
                                  : submission.approvalStatus === "RM Approved"
                                  ? "bg-purple-100 text-purple-800"
                                  : submission.approvalStatus === "Client Approved"
                                  ? "bg-green-100 text-green-800"
                                  : submission.approvalStatus === "In Pipeline"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {submission.approvalStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-700">{submission.clientFeedback}</td>
                          <td className="py-3 px-4 text-gray-700">{submission.lastUpdated}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Position Detail Tabs Component
function PositionDetailTabs({ submissions }: { submissions: Submission[] }) {
  const [activeStatusTab, setActiveStatusTab] = useState<
    "submitted" | "rmApproved" | "clientApproved" | "inPipeline" | "rejected" | "direct"
  >("submitted");

  const statusGroups = {
    submitted: submissions.filter((s) => s.approvalStatus === "Submitted" && !s.isDirect),
    rmApproved: submissions.filter((s) => s.approvalStatus === "RM Approved" && !s.isDirect),
    clientApproved: submissions.filter((s) => s.approvalStatus === "Client Approved" && !s.isDirect),
    inPipeline: submissions.filter((s) => s.approvalStatus === "In Pipeline" && !s.isDirect),
    rejected: submissions.filter((s) => s.approvalStatus === "Rejected" && !s.isDirect),
    direct: submissions.filter((s) => s.isDirect),
  };

  const statusTabs = [
    { key: "submitted", label: "Submitted", count: statusGroups.submitted.length },
    { key: "rmApproved", label: "RM Approved", count: statusGroups.rmApproved.length },
    { key: "clientApproved", label: "Client Approved", count: statusGroups.clientApproved.length },
    { key: "inPipeline", label: "In Pipeline", count: statusGroups.inPipeline.length },
    { key: "rejected", label: "Rejected", count: statusGroups.rejected.length },
    { key: "direct", label: "Direct Applicants", count: statusGroups.direct.length },
  ] as const;

  const currentSubmissions =
    statusGroups[activeStatusTab as keyof typeof statusGroups];

  return (
    <div>
      {/* Status Tab Navigation */}
      <div className="border-b border-gray-200 flex gap-2 mb-4 overflow-x-auto">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveStatusTab(tab.key)}
            className={`px-3 py-2 font-medium border-b-2 transition whitespace-nowrap text-sm ${
              activeStatusTab === tab.key
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Submissions Table for Selected Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {currentSubmissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Candidate</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Submitted By</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Submission Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Current Stage</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {currentSubmissions.map((submission) => (
                  <tr key={submission.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800 font-medium">{submission.candidateName}</td>
                    <td className="py-3 px-4 text-gray-700">{submission.submittedBy}</td>
                    <td className="py-3 px-4 text-gray-700">{submission.submissionDate}</td>
                    <td className="py-3 px-4 text-gray-700">{submission.currentStage}</td>
                    <td className="py-3 px-4 text-gray-700">{submission.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <p>No submissions in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}