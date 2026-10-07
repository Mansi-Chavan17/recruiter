import { useState, useMemo } from "react";
import Header from "../components/Header";
import {
  Search, Plus, X, Phone, ExternalLink, Eye,
  Download, Share2, Filter
} from "lucide-react";

// ─── Types ───
interface TrackerRow {
  id: string;
  dateOfEntry: string;
  client: string;
  position: string;
  name: string;
  linkedin: string;
  gender: string;
  company: string;
  designation: string;
  academics: string;
  batch: string;
  practiceArea: string;
  number: string;
  email: string;
  status: string;
  remarks: string;
}

const CALL_STATUSES = [
  "New", "Connected", "Not Reachable", "Call Back", "Not Interested",
  "Ready for Upload", "Submitted", "Shared", "Selected", "Rejected", "On Hold"
];

const STATUS_COLORS: Record<string, string> = {
  New: "bg-indigo-100 text-indigo-700",
  Connected: "bg-emerald-100 text-emerald-700",
  "Not Reachable": "bg-orange-100 text-orange-700",
  "Call Back": "bg-amber-100 text-amber-700",
  "Not Interested": "bg-red-100 text-red-700",
  "Ready for Upload": "bg-sky-100 text-sky-700",
  Submitted: "bg-purple-100 text-purple-700",
  Shared: "bg-teal-100 text-teal-700",
  Selected: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  "On Hold": "bg-yellow-100 text-yellow-700",
};

const SAMPLE_DATA: TrackerRow[] = [
  { id: "T001", dateOfEntry: "2026-09-01", client: "Axis Bank", position: "VP Engineering", name: "Rajesh Sharma", linkedin: "linkedin.com/in/rajeshsharma", gender: "Male", company: "TCS", designation: "SVP Engineering", academics: "IIT Bombay, B.Tech CS", batch: "2004", practiceArea: "Technology", number: "+91 98765 43210", email: "rajesh.s@email.com", status: "Selected", remarks: "Strong fit. 20 yrs exp. Interested. 90d notice. CTC 85L" },
  { id: "T002", dateOfEntry: "2026-09-01", client: "Axis Bank", position: "VP Engineering", name: "Sneha Iyer", linkedin: "linkedin.com/in/snehaiyer", gender: "Female", company: "HCL Tech", designation: "Director Engineering", academics: "NIT Trichy, B.Tech", batch: "2006", practiceArea: "Technology", number: "+91 98765 43213", email: "sneha.i@email.com", status: "Shared", remarks: "Good profile. 15 yrs. Interested. 60d notice. CTC 62L" },
  { id: "T003", dateOfEntry: "2026-09-02", client: "Axis Bank", position: "VP Engineering", name: "Vikram Patel", linkedin: "linkedin.com/in/vikrampatel", gender: "Male", company: "Tech Mahindra", designation: "Head of Architecture", academics: "IIIT Hyderabad, B.Tech", batch: "2005", practiceArea: "Technology", number: "+91 98765 43214", email: "vikram.p@email.com", status: "Connected", remarks: "Interested. Wants to discuss role scope. CTC 58L" },
  { id: "T004", dateOfEntry: "2026-09-02", client: "Axis Bank", position: "VP Engineering", name: "Arjun Nair", linkedin: "linkedin.com/in/arjunnair", gender: "Male", company: "Wipro", designation: "CTO", academics: "BITS Pilani, M.Tech", batch: "2001", practiceArea: "Technology", number: "+91 98765 43212", email: "arjun.n@email.com", status: "Not Interested", remarks: "Recently moved. Not looking." },
  { id: "T005", dateOfEntry: "2026-09-03", client: "HDFC Bank", position: "Head of Product", name: "Priya Mehta", linkedin: "linkedin.com/in/priyamehta", gender: "Female", company: "Infosys", designation: "VP Product", academics: "IIM Ahmedabad, MBA", batch: "2008", practiceArea: "Product", number: "+91 98765 43211", email: "priya.m@email.com", status: "Submitted", remarks: "Very interested. Strong product background. 30d notice. CTC 72L" },
  { id: "T006", dateOfEntry: "2026-09-04", client: "HDFC Bank", position: "Head of Product", name: "Ananya Das", linkedin: "linkedin.com/in/ananyadas", gender: "Female", company: "Mindtree", designation: "VP Strategy", academics: "ISB, PGP", batch: "2010", practiceArea: "Strategy", number: "+91 98765 43215", email: "ananya.d@email.com", status: "New", remarks: "" },
];

const POSITIONS = ["VP Engineering", "Head of Product", "CTO"];
const CLIENTS = ["Axis Bank", "HDFC Bank", "Bajaj Finance"];
const PRACTICE_AREAS = ["Technology", "Product", "Strategy", "Operations", "Finance", "HR", "Marketing", "Sales"];

const emptyForm = { client: "", position: "", name: "", linkedin: "", gender: "", company: "", designation: "", academics: "", batch: "", practiceArea: "", number: "", email: "", remarks: "" };

const CallingTracker = () => {
  const [trackerData, setTrackerData] = useState<TrackerRow[]>(SAMPLE_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPosition, setFilterPosition] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newCandidate, setNewCandidate] = useState(emptyForm);
  const [detailRow, setDetailRow] = useState<TrackerRow | null>(null);

  const filteredData = useMemo(() => {
    return trackerData.filter((t) => {
      if (filterPosition !== "All" && t.position !== filterPosition) return false;
      if (filterStatus !== "All" && t.status !== filterStatus) return false;
      if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase()) && !t.company.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [trackerData, filterPosition, filterStatus, searchQuery]);

  const handleStatusChange = (id: string, newStatus: string) => {
    setTrackerData((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
  };

  const handleAddCandidate = () => {
    const today = new Date().toISOString().slice(0, 10);
    const newId = "T" + String(trackerData.length + 1).padStart(3, "0");
    setTrackerData((prev) => [
      { id: newId, dateOfEntry: today, ...newCandidate, status: "New" } as TrackerRow,
      ...prev,
    ]);
    setNewCandidate(emptyForm);
    setAddModalOpen(false);
  };

  const updateField = (field: string, value: string) => setNewCandidate((prev) => ({ ...prev, [field]: value }));

  const isFormValid = newCandidate.client && newCandidate.position && newCandidate.name && newCandidate.company && newCandidate.designation && newCandidate.number;

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    trackerData.forEach((t) => { counts[t.status] = (counts[t.status] || 0) + 1; });
    return counts;
  }, [trackerData]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="md:ml-16 px-6 py-4">
        {/* Search + Filters + Actions — matching Candidate page pattern */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search candidates by name or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          <select value={filterPosition} onChange={(e) => setFilterPosition(e.target.value)}
            className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
            <option value="All">All Positions</option>
            {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
            <option value="All">All Statuses</option>
            {CALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
            <Share2 className="w-4 h-4" /> Share Mapping
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => setAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap">
            <Plus className="w-4 h-4" /> Add Candidate
          </button>
        </div>

        {/* Status summary chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(statusCounts).map(([status, count]) => (
            <button key={status} onClick={() => setFilterStatus(filterStatus === status ? "All" : status)}
              className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${STATUS_COLORS[status] || "bg-gray-100 text-gray-700"} ${filterStatus === status ? "ring-2 ring-offset-1 ring-current" : ""}`}>
              {status}: {count}
            </button>
          ))}
          {filterStatus !== "All" && (
            <button onClick={() => setFilterStatus("All")} className="px-2.5 py-1 rounded-full text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
              Clear filter
            </button>
          )}
        </div>

        {searchQuery && (
          <div className="mb-3 text-sm text-gray-600">
            Showing {filteredData.length} candidate{filteredData.length !== 1 ? "s" : ""} matching "{searchQuery}"
          </div>
        )}

        {/* Tracker table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                {["Designation", "Academics", "Batch", "Practice Area", "Number", "Email ID", "Status", "Remarks", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{t.designation}</td>
                  <td className="px-4 py-4 text-sm text-gray-500 max-w-[140px] truncate" title={t.academics}>{t.academics}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{t.batch}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{t.practiceArea}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{t.number}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{t.email}</td>
                  <td className="px-4 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <select value={t.status} onChange={(e) => handleStatusChange(t.id, e.target.value)}
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border-0 cursor-pointer ${STATUS_COLORS[t.status] || "bg-gray-100 text-gray-700"}`}>
                      {CALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 max-w-[180px] truncate" title={t.remarks}>{t.remarks || "—"}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button onClick={() => setDetailRow(t)} className="text-gray-400 hover:text-teal-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr><td colSpan={9} className="text-center py-12 text-gray-400 text-sm">No candidates match your filters</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* ─── Add Candidate Modal ─── */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Add Candidate to Tracker</h2>
                <button onClick={() => { setAddModalOpen(false); setNewCandidate(emptyForm); }} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Client */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client <span className="text-red-500">*</span></label>
                <select value={newCandidate.client} onChange={(e) => updateField("client", e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                  <option value="">Select client</option>
                  {CLIENTS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position <span className="text-red-500">*</span></label>
                <select value={newCandidate.position} onChange={(e) => updateField("position", e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                  <option value="">Select position</option>
                  {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                <input value={newCandidate.name} onChange={(e) => updateField("name", e.target.value)} placeholder="e.g. Rajesh Sharma"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select value={newCandidate.gender} onChange={(e) => updateField("gender", e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                  <option value="">Select gender</option>
                  <option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                </select>
              </div>
              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company <span className="text-red-500">*</span></label>
                <input value={newCandidate.company} onChange={(e) => updateField("company", e.target.value)} placeholder="e.g. TCS"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Designation <span className="text-red-500">*</span></label>
                <input value={newCandidate.designation} onChange={(e) => updateField("designation", e.target.value)} placeholder="e.g. VP Engineering"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              {/* Academics */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Academics</label>
                <input value={newCandidate.academics} onChange={(e) => updateField("academics", e.target.value)} placeholder="e.g. IIT Bombay, B.Tech CS"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              {/* Batch */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
                <input value={newCandidate.batch} onChange={(e) => updateField("batch", e.target.value)} placeholder="e.g. 2005"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              {/* Practice Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Practice Area</label>
                <select value={newCandidate.practiceArea} onChange={(e) => updateField("practiceArea", e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                  <option value="">Select</option>
                  {PRACTICE_AREAS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              {/* LinkedIn */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                <input value={newCandidate.linkedin} onChange={(e) => updateField("linkedin", e.target.value)} placeholder="linkedin.com/in/name"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                <input value={newCandidate.number} onChange={(e) => updateField("number", e.target.value)} placeholder="+91 98765 43210"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input value={newCandidate.email} onChange={(e) => updateField("email", e.target.value)} placeholder="name@email.com" type="email"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              {/* Remarks - full width */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea value={newCandidate.remarks} onChange={(e) => updateField("remarks", e.target.value)}
                  placeholder="Interest level, expected CTC, notice period, call notes..." rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-y" />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => { setAddModalOpen(false); setNewCandidate(emptyForm); }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button disabled={!isFormValid} onClick={handleAddCandidate}
                className={`px-6 py-2 text-white rounded-lg transition-colors ${isFormValid ? "bg-teal-600 hover:bg-teal-700" : "bg-gray-300 cursor-not-allowed"}`}>
                Add to Tracker
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Detail Slide-over ─── */}
      {detailRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className="bg-white w-full max-w-md h-full overflow-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Candidate Details</h2>
              <button onClick={() => setDetailRow(null)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg">
                  {detailRow.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{detailRow.name}</div>
                  <div className="text-sm text-gray-500">{detailRow.designation} at {detailRow.company}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {([
                  ["Client", detailRow.client], ["Position", detailRow.position],
                  ["Gender", detailRow.gender], ["Academics", detailRow.academics],
                  ["Batch", detailRow.batch], ["Practice Area", detailRow.practiceArea],
                  ["Date of Entry", detailRow.dateOfEntry], ["Status", detailRow.status],
                ] as [string, string][]).map(([label, value]) => (
                  <div key={label}>
                    <div className="text-xs font-medium text-gray-500 uppercase">{label}</div>
                    <div className="text-sm text-gray-900 mt-0.5">
                      {label === "Status" ? (
                        <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${STATUS_COLORS[value] || "bg-gray-100 text-gray-700"}`}>{value}</span>
                      ) : value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600"><Phone className="w-4 h-4" /> {detailRow.number}</div>
                <div className="flex items-center gap-2 text-sm">
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                  <a href={`https://${detailRow.linkedin}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{detailRow.linkedin}</a>
                </div>
              </div>

              {detailRow.remarks && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="text-xs font-medium text-amber-700 uppercase mb-1">Remarks</div>
                  <div className="text-sm text-amber-900">{detailRow.remarks}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallingTracker;