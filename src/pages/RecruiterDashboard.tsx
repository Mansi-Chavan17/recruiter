import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
export type PriorityType = "High" | "Medium" | "Low";
export type StatusType = "Accepted" | "Pending" | "Rejected" | "R1" | "R2";

type DetailViewType = "offered" | "interview" | "uploaded" | "job" | null;

interface DetailData {
  type: DetailViewType;
  data: any;
}

interface TagCandidateFormData {
  positionName: string;
  applicant: string;
  recruiter: string;
  immediateJoiner: boolean;
  status: string;
}

const RecruiterDashboard = () => {
  const [detailView, setDetailView] = useState<DetailData | null>(null);
  const [showTagForm, setShowTagForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [tagFormData, setTagFormData] = useState<TagCandidateFormData>({
    positionName: "",
    applicant: "",
    recruiter: "",
    immediateJoiner: false,
    status: "",
  });
  const navigate = useNavigate();
  const newJobs: {
    title: string;
    client: string;
    budget: string;
    deadline: string;
    targetedResumes: number;
    priority: PriorityType;
  }[] = [
    {
      title: "Senior Software Engineer",
      client: "TechCorp",
      budget: "25-30 LPA",
      deadline: "2024-08-15",
      targetedResumes: 16,
      priority: "High",
    },
    {
      title: "Product Manager",
      client: "StartupXYZ",
      budget: "18-22 LPA",
      deadline: "2024-08-20",
      targetedResumes: 12,
      priority: "Medium",
    },
  ];

  const interviews = [
    {
      candidate: "John Doe",
      position: "Frontend Developer",
      client: "WebCorp",
      time: "2024-07-19 10:00",
      lastFollowup: "2024-07-18",
      nextFollowup: "2024-07-19",
    },
    {
      candidate: "Jane Smith",
      position: "Product Manager",
      client: "StartupXYZ",
      time: "2024-07-20 14:00",
      lastFollowup: "2024-07-18",
      nextFollowup: "2024-07-20",
    },
    {
      candidate: "Arjun Kumar",
      position: "Senior Frontend Developer",
      client: "TechCorp",
      time: "2024-07-21 11:00",
      lastFollowup: "2024-07-19",
      nextFollowup: "2024-07-21",
    },
  ];

  const offeredCandidates: {
    candidate: string;
    position: string;
    client: string;
    offerDate: string;
    status: StatusType;
    resignation: string;
    joining: string;
    ctc: string;
    followup: string;
  }[] = [
    {
      candidate: "Sneha Gupta",
      position: "Backend Dev",
      client: "TechCorp",
      offerDate: "July 14",
      status: "Accepted",
      resignation: "July 16",
      joining: "Aug 15",
      ctc: "₹16,50,000",
      followup: "Offer: July 13\nResignation: July 15\nJoining: July 20",
    },
  ];

  const currentJobs: {
    position: string;
    client: string;
    budget: string;
    priority: PriorityType;
    progress: string;
    candidates: string[];
  }[] = [
    {
      position: "Frontend Developer",
      client: "WebCorp",
      budget: "15-18 LPA",
      priority: "High",
      progress: "8/10",
      candidates: ["John Doe", "Jane Smith"],
    },
    {
      position: "DevOps Engineer",
      client: "CloudTech",
      budget: "22-28 LPA",
      priority: "Medium",
      progress: "5/10",
      candidates: ["Mike Johnson"],
    },
  ];

  const candidateStats = {
    r1: 15,
    r2: 8,
    r3: 3,
    offered: 4,
    resigned: 2,
    r4: 12,
    r5: 5,
    f2f: 6,
    accepted: 3,
    joined: 1,
  };

  const uploadedCandidates: {
    name: string;
    position: string;
    client: string;
    status: StatusType;
    currentCtc: string;
    ctcBudget: string;
  }[] = [
    {
      name: "Alex Brown",
      position: "Senior Software Engineer",
      client: "TechCorp",
      status: "R1",
      currentCtc: "20 LPA",
      ctcBudget: "25-30 LPA",
    },
    {
      name: "Emma Davis",
      position: "Data Scientist",
      client: "DataInc",
      status: "R2",
      currentCtc: "18 LPA",
      ctcBudget: "20-25 LPA",
    },
    {
      name: "Rahul Verma",
      position: "Frontend Developer",
      client: "WebCorp",
      status: "R1",
      currentCtc: "12 LPA",
      ctcBudget: "15-18 LPA",
    },
  ];

  interface PriorityBadgeProps {
    priority: PriorityType;
  }

  const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
    const colors: Record<PriorityType, string> = {
      High: "bg-red-100 text-red-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded ${
          colors[priority] || colors.Medium
        }`}
      >
        {priority}
      </span>
    );
  };

  interface StatusBadgeProps {
    status: StatusType;
  }
  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };
  const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const colors: Record<StatusType, string> = {
      Accepted: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Rejected: "bg-red-100 text-red-800",
      R1: "bg-blue-100 text-blue-800",
      R2: "bg-purple-100 text-purple-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded ${
          colors[status] || colors.Pending
        }`}
      >
        {status}
      </span>
    );
  };

  const MoreIcon = () => (
    <svg
      className="w-4 h-4 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 5v.01M12 12v.01M12 19v.01"
      />
    </svg>
  );

  const DetailModal = ({
    detail,
    onClose,
  }: {
    detail: DetailData;
    onClose: () => void;
  }) => {
    if (!detail) return null;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {detail.type === "offered" && "Offered Candidate Details"}
                {detail.type === "interview" && "Interview Details"}
                {detail.type === "uploaded" && "Candidate Details"}
                {detail.type === "job" && "Job Details"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {detail.type === "offered" && (
                <>
                  <DetailRow label="Candidate" value={detail.data.candidate} />
                  <DetailRow label="Position" value={detail.data.position} />
                  <DetailRow label="Client" value={detail.data.client} />
                  <DetailRow label="Offer Date" value={detail.data.offerDate} />
                  <DetailRow
                    label="Status"
                    value={<StatusBadge status={detail.data.status} />}
                  />
                  <DetailRow
                    label="Resignation Date"
                    value={detail.data.resignation}
                  />
                  <DetailRow label="Joining Date" value={detail.data.joining} />
                  <DetailRow label="CTC" value={detail.data.ctc} />
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Follow-up History
                    </h3>
                    <div className="text-sm text-gray-600 whitespace-pre-line">
                      {detail.data.followup}
                    </div>
                  </div>
                </>
              )}

              {detail.type === "interview" && (
                <>
                  <DetailRow label="Candidate" value={detail.data.candidate} />
                  <DetailRow label="Position" value={detail.data.position} />
                  <DetailRow label="Client" value={detail.data.client} />
                  <DetailRow label="Interview Time" value={detail.data.time} />
                  <DetailRow
                    label="Last Follow-up"
                    value={detail.data.lastFollowup}
                  />
                  <DetailRow
                    label="Next Follow-up"
                    value={detail.data.nextFollowup}
                  />
                </>
              )}

              {detail.type === "uploaded" && (
                <>
                  <DetailRow label="Name" value={detail.data.name} />
                  <DetailRow label="Position" value={detail.data.position} />
                  <DetailRow label="Client" value={detail.data.client} />
                  <DetailRow
                    label="Status"
                    value={<StatusBadge status={detail.data.status} />}
                  />
                  <DetailRow
                    label="Current CTC"
                    value={detail.data.currentCtc}
                  />
                  <DetailRow label="CTC Budget" value={detail.data.ctcBudget} />
                </>
              )}

              {detail.type === "job" && (
                <>
                  <DetailRow label="Position" value={detail.data.position} />
                  <DetailRow label="Client" value={detail.data.client} />
                  <DetailRow label="Budget" value={detail.data.budget} />
                  <DetailRow
                    label="Priority"
                    value={<PriorityBadge priority={detail.data.priority} />}
                  />
                  <DetailRow
                    label="Pipeline Progress"
                    value={detail.data.progress}
                  />
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Candidates
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {detail.data.candidates.map(
                        (candidate: string, i: number) => (
                          <span
                            key={i}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                          >
                            {candidate}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DetailRow = ({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) => (
    <div className="flex border-b pb-2">
      <span className="font-semibold text-gray-700 w-1/3">{label}:</span>
      <span className="text-gray-600 w-2/3">{value}</span>
    </div>
  );

  const TagCandidateModal = ({ onClose }: { onClose: () => void }) => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Form submitted:", tagFormData);
      setShowTagForm(false);
      setTagFormData({
        positionName: "",
        applicant: "",
        recruiter: "",
        immediateJoiner: false,
        status: "",
      });
      setSelectedPosition("");
    };

    const handleClose = () => {
      setTagFormData({
        positionName: "",
        applicant: "",
        recruiter: "",
        immediateJoiner: false,
        status: "",
      });
      setSelectedPosition("");
      onClose();
    };

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <div
          className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">Tag Candidate</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={tagFormData.positionName}
                  onChange={(e) =>
                    setTagFormData({
                      ...tagFormData,
                      positionName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  placeholder="Enter position name"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Applicant <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={tagFormData.applicant}
                  onChange={(e) =>
                    setTagFormData({
                      ...tagFormData,
                      applicant: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter applicant name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recruiter <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={tagFormData.recruiter}
                  onChange={(e) =>
                    setTagFormData({
                      ...tagFormData,
                      recruiter: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter recruiter name"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Edit to tag your name for this position if candidate already
                  in the system
                </p>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="immediateJoiner"
                  checked={tagFormData.immediateJoiner}
                  onChange={(e) =>
                    setTagFormData({
                      ...tagFormData,
                      immediateJoiner: e.target.checked,
                    })
                  }
                  className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div>
                  <label
                    htmlFor="immediateJoiner"
                    className="text-sm font-medium text-gray-700"
                  >
                    Immediate Joiner
                  </label>
                  <p className="text-xs text-gray-500">
                    Pl tick this if its an immediate joiner (within 15 days max)
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={tagFormData.status}
                  onChange={(e) =>
                    setTagFormData({ ...tagFormData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select status</option>
                  <option value="R1">R1</option>
                  <option value="R2">R2</option>
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {detailView && (
          <DetailModal
            detail={detailView}
            onClose={() => setDetailView(null)}
          />
        )}
        {showTagForm && (
          <TagCandidateModal onClose={() => setShowTagForm(false)} />
        )}

        {/* Offered Candidates This Week */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Offered Candidates This Week
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Candidate
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Position
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Client
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Offer Date
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Offer Status
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Resignation
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Joining
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      CTC
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Follow-up
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {offeredCandidates.map((candidate, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() =>
                        setDetailView({ type: "offered", data: candidate })
                      }
                    >
                      <td className="py-3 text-sm text-gray-800">
                        {candidate.candidate}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {candidate.position}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {candidate.client}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {candidate.offerDate}
                      </td>
                      <td className="py-3">
                        <StatusBadge status={candidate.status} />
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        <div>
                          <div>{candidate.resignation}</div>
                          {candidate.resignation !== "Pending" && (
                            <div className="text-blue-600 text-xs">
                              Resigned
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        <div>
                          <div>{candidate.joining}</div>
                          {candidate.joining !== "TBD" &&
                            candidate.joining !== "Pending" && (
                              <div className="text-green-600 text-xs">
                                Pending
                              </div>
                            )}
                        </div>
                      </td>
                      <td className="py-3 text-sm text-gray-800 font-medium">
                        {candidate.ctc}
                      </td>
                      <td className="py-3 text-xs text-gray-600">
                        {candidate.followup.split("\n").map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Interviews Scheduled This Week */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Interviews Scheduled This Week
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Candidate
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Position
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Client
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Time
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Last Followup
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Next Followup
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {interviews.map((interview, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() =>
                        setDetailView({ type: "interview", data: interview })
                      }
                    >
                      <td className="py-3 text-sm text-gray-800">
                        {interview.candidate}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {interview.position}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {interview.client}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {interview.time}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {interview.lastFollowup}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {interview.nextFollowup}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* New Jobs Assigned */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              New Jobs Assigned
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {newJobs.map((job, index) => (
                <div
                  key={index}
                  onClick={() => navigate("/position-management")}
                  className="cursor-pointer border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-800">{job.title}</h4>
                    <PriorityBadge priority={job.priority} />
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>
                      Client:{" "}
                      <span className="text-gray-800">{job.client}</span>
                    </div>
                    <div>
                      Budget:{" "}
                      <span className="text-gray-800">{job.budget}</span>
                    </div>
                    <div>
                      Deadline:{" "}
                      <span className="text-gray-800">{job.deadline}</span>
                    </div>
                    <div>
                      Targeted Resumes:{" "}
                      <span className="text-gray-800">
                        {job.targetedResumes}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between">
                    <span className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details
                    </span>
                    <MoreIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {isModalOpen && selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <h3 className="font-bold text-gray-800 text-lg y-3">
                {selectedJob.title}
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="py-3 text-sm text-gray-600">
                  <strong>Client:</strong> {selectedJob.client}
                </div>
                <div className="py-3 text-sm text-gray-600">
                  <strong>Budget:</strong> {selectedJob.budget}
                </div>
                <div className="py-3 text-sm text-gray-600">
                  <strong>Deadline:</strong> {selectedJob.deadline}
                </div>
                <div className="py-3 text-sm text-gray-600">
                  <strong>Targeted Resumes:</strong>{" "}
                  {selectedJob.targetedResumes}
                </div>
                <div className="py-3 text-sm text-gray-600">
                  <strong>Priority:</strong> {selectedJob.priority}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Uploaded Candidates - Last Week */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Uploaded Candidates - Last Week
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Candidate Name
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Position Name
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Client Name
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Status
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Current CTC
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      CTC Budget
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedCandidates.map((candidate, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() =>
                        setDetailView({ type: "uploaded", data: candidate })
                      }
                    >
                      <td className="py-3 text-sm text-gray-800">
                        {candidate.name}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {candidate.position}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {candidate.client}
                      </td>
                      <td className="py-3">
                        <StatusBadge status={candidate.status} />
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {candidate.currentCtc}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {candidate.ctcBudget}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Jobs Currently Working On */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Jobs Currently Working On
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Position
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Client
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Budget
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Priority
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Pipeline
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Candidates
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentJobs.map((job, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setDetailView({ type: "job", data: job })}
                    >
                      <td className="py-3 text-sm text-gray-800">
                        {job.position}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {job.client}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {job.budget}
                      </td>
                      <td className="py-3">
                        <PriorityBadge priority={job.priority} />
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {job.progress}
                      </td>
                      <td className="py-3">
                        <div className="flex flex-wrap gap-1">
                          {job.candidates.map((candidate, i) => (
                            <span
                              key={i}
                              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                            >
                              {candidate}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex space-x-2">
                          <button
                            className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded hover:bg-green-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPosition(job.position);
                              setTagFormData({
                                positionName: job.position,
                                applicant: "",
                                recruiter: "",
                                immediateJoiner: false,
                                status: "",
                              });
                              setShowTagForm(true);
                            }}
                          >
                            tag candidate
                          </button>
                          <button
                            className="bg-purple-100 text-purple-800 px-2 py-1 text-xs rounded hover:bg-purple-200"
                            onClick={() => navigate("/ai-matcher")}
                          >
                            Run AI Matcher
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Candidate Synopsis */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Candidate Synopsis
            </h3>
            <div className="text-sm text-gray-600 mb-4">
              Number of candidates in each status group
            </div>

            <div className="grid grid-cols-5 gap-4 mb-4">
              {Object.entries({
                R1: candidateStats.r1,
                R2: candidateStats.r2,
                R3: candidateStats.r3,
                R4: candidateStats.r4,
                R5: candidateStats.r5,
              }).map(([status, count]) => (
                <div
                  key={status}
                  className="text-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                  onClick={() => navigate("/submission-management")}
                >
                  <div className="text-2xl font-bold text-blue-600">
                    {count}
                  </div>
                  <div className="text-xs text-gray-600">{status}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-4">
              {Object.entries({
                F2F: candidateStats.f2f,
                OFFERED: candidateStats.offered,
                Accepted: candidateStats.accepted,
                Resigned: candidateStats.resigned,
                Joined: candidateStats.joined,
              }).map(([status, count]) => (
                <div
                  key={status}
                  className="text-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                  onClick={() =>
                    alert("Submission Management page coming soon!")
                  }
                >
                  <div className="text-2xl font-bold text-blue-600">
                    {count}
                  </div>
                  <div className="text-xs text-gray-600">{status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
