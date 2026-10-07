import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { Download, Filter, Search, Calendar, Users, BarChart3, Target } from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatTile({ label, value, delta, deltaType }: { label: string; value: string; delta: string; deltaType: "up" | "down" | "neutral" }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      <p className={`text-xs mt-1 ${deltaType === "up" ? "text-green-600" : deltaType === "down" ? "text-red-600" : "text-gray-400"}`}>
        {deltaType === "up" ? "↑" : deltaType === "down" ? "↓" : "–"} {delta}
      </p>
    </div>
  );
}

function Badge({ label, color }: { label: string; color: "green" | "yellow" | "red" | "teal" | "blue" | "purple" | "orange" }) {
  const styles: Record<string, string> = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    teal: "bg-teal-50 text-teal-700",
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    orange: "bg-orange-100 text-orange-700",
  };
  return <span className={`px-2 py-1 text-xs rounded-full ${styles[color]}`}>{label}</span>;
}

function FilterSelect({ value, onChange, options, label }: { value: string; onChange: (v: string) => void; options: string[]; label: string }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      aria-label={label}
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 w-56"
      />
    </div>
  );
}

function ExportButton() {
  return (
    <div className="flex justify-end">
      <button className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm hover:bg-teal-700 inline-flex items-center gap-2">
        <Download className="h-4 w-4" />
        Export Report
      </button>
    </div>
  );
}

function matchesSearch(row: Record<string, unknown>, search: string): boolean {
  if (!search) return true;
  const q = search.toLowerCase();
  return Object.values(row).some(v => String(v).toLowerCase().includes(q));
}

// Navigation is handled by the sidebar (Header.tsx) — no in-page tabs.

// ─── 1. Client Submission Report ──────────────────────────────────────────────

function ClientSubmissionReport() {
  const [search, setSearch] = useState("");
  const [filterClient, setFilterClient] = useState("All");
  const [filterRecruiter, setFilterRecruiter] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const data = [
    { candidate: "Priya Sharma", position: "Senior Java Developer", client: "TCS", recruiter: "Ankit Mehta", submittedDate: "2026-09-18", approvalStatus: "Approved", clientFeedback: "Strong profile, proceed", currentStage: "Interview Scheduled" },
    { candidate: "Rahul Verma", position: "React Frontend Lead", client: "Infosys", recruiter: "Sneha Patel", submittedDate: "2026-09-17", approvalStatus: "Pending", clientFeedback: "Under review", currentStage: "Submitted" },
    { candidate: "Deepika Nair", position: "Data Engineer", client: "Wipro", recruiter: "Ankit Mehta", submittedDate: "2026-09-16", approvalStatus: "Approved", clientFeedback: "Good match", currentStage: "Offer Stage" },
    { candidate: "Vikram Singh", position: "DevOps Architect", client: "HCL", recruiter: "Pooja Desai", submittedDate: "2026-09-15", approvalStatus: "Rejected", clientFeedback: "Overqualified for role", currentStage: "Closed" },
    { candidate: "Anjali Gupta", position: "Product Manager", client: "Tech Mahindra", recruiter: "Sneha Patel", submittedDate: "2026-09-14", approvalStatus: "Approved", clientFeedback: "Excellent cultural fit", currentStage: "Final Round" },
    { candidate: "Karthik Reddy", position: "QA Lead", client: "Accenture", recruiter: "Ravi Kumar", submittedDate: "2026-09-13", approvalStatus: "Pending", clientFeedback: "Awaiting panel input", currentStage: "Submitted" },
    { candidate: "Meera Joshi", position: "Cloud Solutions Architect", client: "Cognizant", recruiter: "Pooja Desai", submittedDate: "2026-09-12", approvalStatus: "Approved", clientFeedback: "Move to final round", currentStage: "Interview Scheduled" },
    { candidate: "Suresh Iyer", position: "Full Stack Developer", client: "Reliance Digital", recruiter: "Ravi Kumar", submittedDate: "2026-09-11", approvalStatus: "Rejected", clientFeedback: "Insufficient experience", currentStage: "Closed" },
  ];

  const clients = ["All", ...new Set(data.map(r => r.client))];
  const recruiters = ["All", ...new Set(data.map(r => r.recruiter))];
  const statuses = ["All", "Approved", "Pending", "Rejected"];

  const filtered = useMemo(() => {
    return data.filter(r => {
      if (filterClient !== "All" && r.client !== filterClient) return false;
      if (filterRecruiter !== "All" && r.recruiter !== filterRecruiter) return false;
      if (filterStatus !== "All" && r.approvalStatus !== filterStatus) return false;
      return matchesSearch(r, search);
    });
  }, [search, filterClient, filterRecruiter, filterStatus]);

  const statusColor = (s: string): "green" | "yellow" | "red" => s === "Approved" ? "green" : s === "Pending" ? "yellow" : "red";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile label="Total Submissions" value="248" delta="12% vs last month" deltaType="up" />
        <StatTile label="Shortlisted" value="82" delta="8% vs last month" deltaType="up" />
        <StatTile label="Interviews Scheduled" value="45" delta="5% vs last month" deltaType="up" />
        <StatTile label="Offers Made" value="23" delta="3% vs last month" deltaType="down" />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <Filter className="h-4 w-4 text-gray-400" />
          <FilterSelect value={filterClient} onChange={setFilterClient} options={clients} label="Client" />
          <FilterSelect value={filterRecruiter} onChange={setFilterRecruiter} options={recruiters} label="Recruiter" />
          <FilterSelect value={filterStatus} onChange={setFilterStatus} options={statuses} label="Status" />
          <SearchInput value={search} onChange={setSearch} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Candidate Name", "Position", "Client", "Recruiter", "Submitted Date", "Approval Status", "Client Feedback", "Current Stage"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{row.candidate}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.position}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.client}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.recruiter}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.submittedDate}</td>
                  <td className="px-4 py-3 text-sm"><Badge label={row.approvalStatus} color={statusColor(row.approvalStatus)} /></td>
                  <td className="px-4 py-3 text-sm text-gray-700 max-w-[200px] truncate">{row.clientFeedback}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.currentStage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ExportButton />
    </div>
  );
}

// ─── 2. Weekly Dashboard Report ───────────────────────────────────────────────

function WeeklyDashboardReport() {
  const [search, setSearch] = useState("");
  const [filterClient, setFilterClient] = useState("All");
  const [filterWeek, setFilterWeek] = useState("Week 38 (Sep 16-22)");

  const data = [
    { client: "TCS", positionsOpen: 8, cvsShared: 15, interviews: 4, offersMade: 2, placements: 1, status: "Active" },
    { client: "Infosys", positionsOpen: 6, cvsShared: 12, interviews: 3, offersMade: 1, placements: 1, status: "Active" },
    { client: "Wipro", positionsOpen: 5, cvsShared: 10, interviews: 3, offersMade: 1, placements: 0, status: "Active" },
    { client: "HCL", positionsOpen: 7, cvsShared: 14, interviews: 4, offersMade: 2, placements: 2, status: "Active" },
    { client: "Accenture", positionsOpen: 4, cvsShared: 9, interviews: 2, offersMade: 0, placements: 0, status: "On Hold" },
    { client: "Cognizant", positionsOpen: 4, cvsShared: 7, interviews: 2, offersMade: 1, placements: 1, status: "Active" },
  ];

  const clients = ["All", ...new Set(data.map(r => r.client))];
  const weeks = ["Week 38 (Sep 16-22)", "Week 37 (Sep 9-15)", "Week 36 (Sep 2-8)", "Week 35 (Aug 26-Sep 1)"];

  const filtered = useMemo(() => {
    return data.filter(r => {
      if (filterClient !== "All" && r.client !== filterClient) return false;
      return matchesSearch(r, search);
    });
  }, [search, filterClient]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile label="Positions Open" value="34" delta="6 new this week" deltaType="up" />
        <StatTile label="CVs Shared" value="67" delta="18% vs last week" deltaType="up" />
        <StatTile label="Interviews" value="18" delta="4% vs last week" deltaType="down" />
        <StatTile label="Placements This Week" value="5" delta="2 more than last week" deltaType="up" />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <Calendar className="h-4 w-4 text-gray-400" />
          <FilterSelect value={filterWeek} onChange={setFilterWeek} options={weeks} label="Week" />
          <FilterSelect value={filterClient} onChange={setFilterClient} options={clients} label="Client" />
          <SearchInput value={search} onChange={setSearch} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Client", "Positions Open", "CVs Shared", "Interviews Scheduled", "Offers Made", "Placements", "Status"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{row.client}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.positionsOpen}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.cvsShared}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.interviews}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.offersMade}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.placements}</td>
                  <td className="px-4 py-3 text-sm"><Badge label={row.status} color={row.status === "Active" ? "green" : "yellow"} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ExportButton />
    </div>
  );
}

// ─── 3. Performance Report ────────────────────────────────────────────────────

function PerformanceReport() {
  const [search, setSearch] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("Monthly");
  const [filterRecruiter, setFilterRecruiter] = useState("All");

  const data = [
    { recruiter: "Ankit Mehta", submissions: 52, shortlisted: 18, interviews: 12, offers: 6, closures: 5, revenue: "₹24,50,000", efficiency: 92 },
    { recruiter: "Sneha Patel", submissions: 48, shortlisted: 16, interviews: 10, offers: 5, closures: 4, revenue: "₹19,80,000", efficiency: 88 },
    { recruiter: "Pooja Desai", submissions: 44, shortlisted: 14, interviews: 9, offers: 4, closures: 4, revenue: "₹18,20,000", efficiency: 85 },
    { recruiter: "Ravi Kumar", submissions: 38, shortlisted: 12, interviews: 8, offers: 4, closures: 3, revenue: "₹14,50,000", efficiency: 82 },
    { recruiter: "Neha Agarwal", submissions: 35, shortlisted: 10, interviews: 7, offers: 3, closures: 2, revenue: "₹11,00,000", efficiency: 78 },
    { recruiter: "Amit Saxena", submissions: 32, shortlisted: 9, interviews: 6, offers: 2, closures: 2, revenue: "₹9,50,000", efficiency: 75 },
    { recruiter: "Kavita Rao", submissions: 29, shortlisted: 8, interviews: 5, offers: 2, closures: 1, revenue: "₹5,00,000", efficiency: 70 },
  ];

  const recruiters = ["All", ...data.map(r => r.recruiter)];
  const periods = ["Weekly", "Monthly", "Quarterly"];

  const filtered = useMemo(() => {
    return data.filter(r => {
      if (filterRecruiter !== "All" && r.recruiter !== filterRecruiter) return false;
      return matchesSearch(r, search);
    });
  }, [search, filterRecruiter]);

  const efficiencyColor = (e: number): "green" | "yellow" | "red" => e >= 85 ? "green" : e >= 75 ? "yellow" : "red";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile label="Total Closures" value="42" delta="15% vs last period" deltaType="up" />
        <StatTile label="Revenue Generated" value="₹2,85,000" delta="22% vs last period" deltaType="up" />
        <StatTile label="Avg Time-to-Close" value="18 days" delta="3 days faster" deltaType="up" />
        <StatTile label="Team Efficiency" value="87%" delta="4% improvement" deltaType="up" />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <BarChart3 className="h-4 w-4 text-gray-400" />
          <FilterSelect value={filterPeriod} onChange={setFilterPeriod} options={periods} label="Period" />
          <FilterSelect value={filterRecruiter} onChange={setFilterRecruiter} options={recruiters} label="Recruiter" />
          <SearchInput value={search} onChange={setSearch} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Recruiter Name", "Submissions", "Shortlisted", "Interviews", "Offers", "Closures", "Revenue", "Efficiency %"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{row.recruiter}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.submissions}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.shortlisted}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.interviews}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.offers}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.closures}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.revenue}</td>
                  <td className="px-4 py-3 text-sm"><Badge label={`${row.efficiency}%`} color={efficiencyColor(row.efficiency)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ExportButton />
    </div>
  );
}

// ─── 4. Interview Report ──────────────────────────────────────────────────────

function InterviewReport() {
  const [search, setSearch] = useState("");
  const [filterClient, setFilterClient] = useState("All");
  const [filterRecruiter, setFilterRecruiter] = useState("All");
  const [filterWeek, setFilterWeek] = useState("Week 38 (Sep 16-22)");

  const data = [
    { candidate: "Priya Sharma", position: "Senior Java Developer", client: "TCS", interviewDate: "2026-09-18", round: "Technical Round 2", interviewer: "Rajesh Khanna", status: "Cleared", feedback: "Strong system design skills" },
    { candidate: "Rahul Verma", position: "React Frontend Lead", client: "Infosys", interviewDate: "2026-09-18", round: "HR Round", interviewer: "Sunita Menon", status: "Cleared", feedback: "Good communication, culture fit" },
    { candidate: "Deepika Nair", position: "Data Engineer", client: "Wipro", interviewDate: "2026-09-17", round: "Technical Round 1", interviewer: "Arun Prakash", status: "Pending Feedback", feedback: "Awaiting panel review" },
    { candidate: "Vikram Singh", position: "DevOps Architect", client: "HCL", interviewDate: "2026-09-17", round: "Managerial", interviewer: "Nandini Iyer", status: "Rejected", feedback: "Salary expectations too high" },
    { candidate: "Anjali Gupta", position: "Product Manager", client: "Tech Mahindra", interviewDate: "2026-09-16", round: "Final Round", interviewer: "Mohan Das", status: "Cleared", feedback: "Excellent leadership qualities" },
    { candidate: "Karthik Reddy", position: "QA Lead", client: "Accenture", interviewDate: "2026-09-16", round: "Technical Round 1", interviewer: "Preeti Bhat", status: "Pending Feedback", feedback: "Assessment ongoing" },
    { candidate: "Meera Joshi", position: "Cloud Solutions Architect", client: "Cognizant", interviewDate: "2026-09-15", round: "Technical Round 2", interviewer: "Sanjay Gupta", status: "Cleared", feedback: "Deep AWS expertise" },
    { candidate: "Arjun Malhotra", position: "ML Engineer", client: "TCS", interviewDate: "2026-09-15", round: "Coding Round", interviewer: "Divya Narayan", status: "Rejected", feedback: "Weak in algorithms" },
  ];

  const clients = ["All", ...new Set(data.map(r => r.client))];
  const recruiters = ["All", "Ankit Mehta", "Sneha Patel", "Pooja Desai", "Ravi Kumar"];
  const weeks = ["Week 38 (Sep 16-22)", "Week 37 (Sep 9-15)", "Week 36 (Sep 2-8)"];

  const filtered = useMemo(() => {
    return data.filter(r => {
      if (filterClient !== "All" && r.client !== filterClient) return false;
      return matchesSearch(r, search);
    });
  }, [search, filterClient]);

  const statusColor = (s: string): "green" | "yellow" | "red" => s === "Cleared" ? "green" : s === "Pending Feedback" ? "yellow" : "red";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile label="Total Interviews" value="45" delta="10% vs last week" deltaType="up" />
        <StatTile label="Cleared" value="28" delta="62% clear rate" deltaType="up" />
        <StatTile label="Pending Feedback" value="12" delta="5 due today" deltaType="neutral" />
        <StatTile label="Rejected" value="5" delta="11% rejection rate" deltaType="down" />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <Filter className="h-4 w-4 text-gray-400" />
          <FilterSelect value={filterWeek} onChange={setFilterWeek} options={weeks} label="Week" />
          <FilterSelect value={filterClient} onChange={setFilterClient} options={clients} label="Client" />
          <FilterSelect value={filterRecruiter} onChange={setFilterRecruiter} options={recruiters} label="Recruiter" />
          <SearchInput value={search} onChange={setSearch} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Candidate", "Position", "Client", "Interview Date", "Round", "Interviewer", "Status", "Feedback"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{row.candidate}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.position}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.client}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.interviewDate}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.round}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.interviewer}</td>
                  <td className="px-4 py-3 text-sm"><Badge label={row.status} color={statusColor(row.status)} /></td>
                  <td className="px-4 py-3 text-sm text-gray-700 max-w-[200px] truncate">{row.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ExportButton />
    </div>
  );
}

// ─── 5. Closure Ratio Report ──────────────────────────────────────────────────

function ClosureRatioReport() {
  const [search, setSearch] = useState("");
  const [filterClient, setFilterClient] = useState("All");
  const [filterDepartment, setFilterDepartment] = useState("All");

  const data = [
    { position: "Senior Java Developer", client: "TCS", department: "Engineering", daysOpen: 25, submissions: 18, interviews: 6, result: "Closed", daysToClose: 25 },
    { position: "React Frontend Lead", client: "Infosys", department: "Engineering", daysOpen: 30, submissions: 22, interviews: 8, result: "Closed", daysToClose: 30 },
    { position: "Data Engineer", client: "Wipro", department: "Data & Analytics", daysOpen: 18, submissions: 14, interviews: 5, result: "In Progress", daysToClose: 0 },
    { position: "DevOps Architect", client: "HCL", department: "Infrastructure", daysOpen: 35, submissions: 20, interviews: 7, result: "Closed", daysToClose: 35 },
    { position: "Product Manager", client: "Tech Mahindra", department: "Product", daysOpen: 22, submissions: 12, interviews: 4, result: "Closed", daysToClose: 22 },
    { position: "QA Lead", client: "Accenture", department: "Quality", daysOpen: 15, submissions: 10, interviews: 3, result: "In Progress", daysToClose: 0 },
    { position: "Cloud Solutions Architect", client: "Cognizant", department: "Infrastructure", daysOpen: 28, submissions: 16, interviews: 5, result: "Cancelled", daysToClose: 0 },
  ];

  const clients = ["All", ...new Set(data.map(r => r.client))];
  const departments = ["All", ...new Set(data.map(r => r.department))];

  const filtered = useMemo(() => {
    return data.filter(r => {
      if (filterClient !== "All" && r.client !== filterClient) return false;
      if (filterDepartment !== "All" && r.department !== filterDepartment) return false;
      return matchesSearch(r, search);
    });
  }, [search, filterClient, filterDepartment]);

  const resultColor = (s: string): "green" | "yellow" | "red" => s === "Closed" ? "green" : s === "In Progress" ? "yellow" : "red";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile label="Positions Worked" value="156" delta="23 new this month" deltaType="up" />
        <StatTile label="Closures" value="42" delta="8% vs last month" deltaType="up" />
        <StatTile label="Closure Ratio" value="26.9%" delta="2.1% improvement" deltaType="up" />
        <StatTile label="Avg Days to Close" value="22" delta="3 days faster" deltaType="up" />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <Target className="h-4 w-4 text-gray-400" />
          <FilterSelect value={filterClient} onChange={setFilterClient} options={clients} label="Client" />
          <FilterSelect value={filterDepartment} onChange={setFilterDepartment} options={departments} label="Department" />
          <SearchInput value={search} onChange={setSearch} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Position Title", "Client", "Department", "Days Open", "Submissions", "Interviews", "Result", "Days to Close"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{row.position}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.client}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.department}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.daysOpen}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.submissions}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.interviews}</td>
                  <td className="px-4 py-3 text-sm"><Badge label={row.result} color={resultColor(row.result)} /></td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.daysToClose || "–"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ExportButton />
    </div>
  );
}

// ─── 6. Yet-to-Join Report ────────────────────────────────────────────────────

function YetToJoinReport() {
  const [search, setSearch] = useState("");
  const [filterClient, setFilterClient] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const data = [
    { candidate: "Priya Sharma", position: "Senior Java Developer", client: "TCS", offerDate: "2026-08-25", expectedJoining: "2026-10-01", currentCTC: "₹18,00,000", offeredCTC: "₹26,00,000", status: "Confirmed", riskLevel: "Low" },
    { candidate: "Rahul Verma", position: "React Frontend Lead", client: "Infosys", offerDate: "2026-08-20", expectedJoining: "2026-10-15", currentCTC: "₹22,00,000", offeredCTC: "₹32,00,000", status: "Confirmed", riskLevel: "Low" },
    { candidate: "Deepika Nair", position: "Data Engineer", client: "Wipro", offerDate: "2026-09-01", expectedJoining: "2026-10-01", currentCTC: "₹15,00,000", offeredCTC: "₹22,00,000", status: "At Risk", riskLevel: "High" },
    { candidate: "Anjali Gupta", position: "Product Manager", client: "Tech Mahindra", offerDate: "2026-08-15", expectedJoining: "2026-09-25", currentCTC: "₹25,00,000", offeredCTC: "₹35,00,000", status: "Confirmed", riskLevel: "Low" },
    { candidate: "Karthik Reddy", position: "QA Lead", client: "Accenture", offerDate: "2026-09-05", expectedJoining: "2026-10-10", currentCTC: "₹14,00,000", offeredCTC: "₹20,00,000", status: "At Risk", riskLevel: "Medium" },
    { candidate: "Suresh Iyer", position: "Full Stack Developer", client: "Reliance Digital", offerDate: "2026-08-10", expectedJoining: "2026-09-20", currentCTC: "₹12,00,000", offeredCTC: "₹18,00,000", status: "Dropped", riskLevel: "High" },
    { candidate: "Meera Joshi", position: "Cloud Solutions Architect", client: "Cognizant", offerDate: "2026-09-08", expectedJoining: "2026-10-20", currentCTC: "₹28,00,000", offeredCTC: "₹40,00,000", status: "Confirmed", riskLevel: "Low" },
  ];

  const clients = ["All", ...new Set(data.map(r => r.client))];
  const statuses = ["All", "Confirmed", "At Risk", "Dropped"];

  const filtered = useMemo(() => {
    return data.filter(r => {
      if (filterClient !== "All" && r.client !== filterClient) return false;
      if (filterStatus !== "All" && r.status !== filterStatus) return false;
      return matchesSearch(r, search);
    });
  }, [search, filterClient, filterStatus]);

  const statusColor = (s: string): "green" | "yellow" | "red" => s === "Confirmed" ? "green" : s === "At Risk" ? "yellow" : "red";
  const riskColor = (r: string): "green" | "yellow" | "red" => r === "Low" ? "green" : r === "Medium" ? "yellow" : "red";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile label="Total Offered" value="38" delta="6 this month" deltaType="up" />
        <StatTile label="Confirmed Joining" value="29" delta="76% confirmation rate" deltaType="up" />
        <StatTile label="At Risk" value="6" delta="3 need follow-up" deltaType="down" />
        <StatTile label="Dropped" value="3" delta="8% drop rate" deltaType="down" />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <Users className="h-4 w-4 text-gray-400" />
          <FilterSelect value={filterClient} onChange={setFilterClient} options={clients} label="Client" />
          <FilterSelect value={filterStatus} onChange={setFilterStatus} options={statuses} label="Status" />
          <SearchInput value={search} onChange={setSearch} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Candidate", "Position", "Client", "Offer Date", "Expected Joining", "Current CTC", "Offered CTC", "Status", "Risk Level"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{row.candidate}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.position}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.client}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.offerDate}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.expectedJoining}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.currentCTC}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.offeredCTC}</td>
                  <td className="px-4 py-3 text-sm"><Badge label={row.status} color={statusColor(row.status)} /></td>
                  <td className="px-4 py-3 text-sm"><Badge label={row.riskLevel} color={riskColor(row.riskLevel)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ExportButton />
    </div>
  );
}

// ─── Main ReportsModule ───────────────────────────────────────────────────────

export default function ReportsModule() {
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "");

  const section: string =
    path === "/reports" ? "submissions"
    : path === "/reports/weekly-dashboard" ? "weekly-dashboard"
    : path === "/reports/performance" ? "performance"
    : path === "/reports/interviews" ? "interviews"
    : path === "/reports/closure-ratio" ? "closure-ratio"
    : path === "/reports/yet-to-join" ? "yet-to-join"
    : "submissions";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Page heading */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Reports Module</h1>
            <p className="text-sm text-gray-500 mt-1">TrueKarma Recruitment — Reports &amp; Analytics</p>
          </div>
        </div>

        {/* Active section */}
        {section === "submissions" && <ClientSubmissionReport />}
        {section === "weekly-dashboard" && <WeeklyDashboardReport />}
        {section === "performance" && <PerformanceReport />}
        {section === "interviews" && <InterviewReport />}
        {section === "closure-ratio" && <ClosureRatioReport />}
        {section === "yet-to-join" && <YetToJoinReport />}
      </div>
    </div>
  );
}