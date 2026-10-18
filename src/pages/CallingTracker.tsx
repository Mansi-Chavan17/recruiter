// import { useState, useMemo } from "react";
// import Header from "../components/Header";
// import {
//   Search, Plus, X, Phone, ExternalLink, Eye,
//   Download, Share2, Filter
// } from "lucide-react";

// // ─── Types ───
// interface TrackerRow {
//   id: string;
//   dateOfEntry: string;
//   client: string;
//   position: string;
//   name: string;
//   linkedin: string;
//   gender: string;
//   company: string;
//   designation: string;
//   academics: string;
//   batch: string;
//   practiceArea: string;
//   number: string;
//   email: string;
//   status: string;
//   remarks: string;
// }

// const CALL_STATUSES = [
//   "New", "Connected", "Not Reachable", "Call Back", "Not Interested",
//   "Ready for Upload", "Submitted", "Shared", "Selected", "Rejected", "On Hold"
// ];

// const STATUS_COLORS: Record<string, string> = {
//   New: "bg-indigo-100 text-indigo-700",
//   Connected: "bg-emerald-100 text-emerald-700",
//   "Not Reachable": "bg-orange-100 text-orange-700",
//   "Call Back": "bg-amber-100 text-amber-700",
//   "Not Interested": "bg-red-100 text-red-700",
//   "Ready for Upload": "bg-sky-100 text-sky-700",
//   Submitted: "bg-purple-100 text-purple-700",
//   Shared: "bg-teal-100 text-teal-700",
//   Selected: "bg-green-100 text-green-700",
//   Rejected: "bg-red-100 text-red-700",
//   "On Hold": "bg-yellow-100 text-yellow-700",
// };

// const SAMPLE_DATA: TrackerRow[] = [
//   { id: "T001", dateOfEntry: "2026-09-01", client: "Axis Bank", position: "VP Engineering", name: "Rajesh Sharma", linkedin: "linkedin.com/in/rajeshsharma", gender: "Male", company: "TCS", designation: "SVP Engineering", academics: "IIT Bombay, B.Tech CS", batch: "2004", practiceArea: "Technology", number: "+91 98765 43210", email: "rajesh.s@email.com", status: "Selected", remarks: "Strong fit. 20 yrs exp. Interested. 90d notice. CTC 85L" },
//   { id: "T002", dateOfEntry: "2026-09-01", client: "Axis Bank", position: "VP Engineering", name: "Sneha Iyer", linkedin: "linkedin.com/in/snehaiyer", gender: "Female", company: "HCL Tech", designation: "Director Engineering", academics: "NIT Trichy, B.Tech", batch: "2006", practiceArea: "Technology", number: "+91 98765 43213", email: "sneha.i@email.com", status: "Shared", remarks: "Good profile. 15 yrs. Interested. 60d notice. CTC 62L" },
//   { id: "T003", dateOfEntry: "2026-09-02", client: "Axis Bank", position: "VP Engineering", name: "Vikram Patel", linkedin: "linkedin.com/in/vikrampatel", gender: "Male", company: "Tech Mahindra", designation: "Head of Architecture", academics: "IIIT Hyderabad, B.Tech", batch: "2005", practiceArea: "Technology", number: "+91 98765 43214", email: "vikram.p@email.com", status: "Connected", remarks: "Interested. Wants to discuss role scope. CTC 58L" },
//   { id: "T004", dateOfEntry: "2026-09-02", client: "Axis Bank", position: "VP Engineering", name: "Arjun Nair", linkedin: "linkedin.com/in/arjunnair", gender: "Male", company: "Wipro", designation: "CTO", academics: "BITS Pilani, M.Tech", batch: "2001", practiceArea: "Technology", number: "+91 98765 43212", email: "arjun.n@email.com", status: "Not Interested", remarks: "Recently moved. Not looking." },
//   { id: "T005", dateOfEntry: "2026-09-03", client: "HDFC Bank", position: "Head of Product", name: "Priya Mehta", linkedin: "linkedin.com/in/priyamehta", gender: "Female", company: "Infosys", designation: "VP Product", academics: "IIM Ahmedabad, MBA", batch: "2008", practiceArea: "Product", number: "+91 98765 43211", email: "priya.m@email.com", status: "Submitted", remarks: "Very interested. Strong product background. 30d notice. CTC 72L" },
//   { id: "T006", dateOfEntry: "2026-09-04", client: "HDFC Bank", position: "Head of Product", name: "Ananya Das", linkedin: "linkedin.com/in/ananyadas", gender: "Female", company: "Mindtree", designation: "VP Strategy", academics: "ISB, PGP", batch: "2010", practiceArea: "Strategy", number: "+91 98765 43215", email: "ananya.d@email.com", status: "New", remarks: "" },
// ];

// const POSITIONS = ["VP Engineering", "Head of Product", "CTO"];
// const CLIENTS = ["Axis Bank", "HDFC Bank", "Bajaj Finance"];
// const PRACTICE_AREAS = ["Technology", "Product", "Strategy", "Operations", "Finance", "HR", "Marketing", "Sales"];

// const emptyForm = { client: "", position: "", name: "", linkedin: "", gender: "", company: "", designation: "", academics: "", batch: "", practiceArea: "", number: "", email: "", remarks: "" };

// const CallingTracker = () => {
//   const [trackerData, setTrackerData] = useState<TrackerRow[]>(SAMPLE_DATA);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterPosition, setFilterPosition] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [addModalOpen, setAddModalOpen] = useState(false);
//   const [newCandidate, setNewCandidate] = useState(emptyForm);
//   const [detailRow, setDetailRow] = useState<TrackerRow | null>(null);

//   const filteredData = useMemo(() => {
//     return trackerData.filter((t) => {
//       if (filterPosition !== "All" && t.position !== filterPosition) return false;
//       if (filterStatus !== "All" && t.status !== filterStatus) return false;
//       if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase()) && !t.company.toLowerCase().includes(searchQuery.toLowerCase())) return false;
//       return true;
//     });
//   }, [trackerData, filterPosition, filterStatus, searchQuery]);

//   const handleStatusChange = (id: string, newStatus: string) => {
//     setTrackerData((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
//   };

//   const handleAddCandidate = () => {
//     const today = new Date().toISOString().slice(0, 10);
//     const newId = "T" + String(trackerData.length + 1).padStart(3, "0");
//     setTrackerData((prev) => [
//       { id: newId, dateOfEntry: today, ...newCandidate, status: "New" } as TrackerRow,
//       ...prev,
//     ]);
//     setNewCandidate(emptyForm);
//     setAddModalOpen(false);
//   };

//   const updateField = (field: string, value: string) => setNewCandidate((prev) => ({ ...prev, [field]: value }));

//   const isFormValid = newCandidate.client && newCandidate.position && newCandidate.name && newCandidate.company && newCandidate.designation && newCandidate.number;

//   const statusCounts = useMemo(() => {
//     const counts: Record<string, number> = {};
//     trackerData.forEach((t) => { counts[t.status] = (counts[t.status] || 0) + 1; });
//     return counts;
//   }, [trackerData]);

//   return (
//     <div className="min-h-screen bg-white">
//       <Header />

//       <main className="md:ml-16 px-6 py-4">
//         {/* Search + Filters + Actions — matching Candidate page pattern */}
//         <div className="flex items-center gap-3 mb-4">
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search candidates by name or company..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
//             />
//             {searchQuery && (
//               <button onClick={() => setSearchQuery("")} className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                 <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
//               </button>
//             )}
//           </div>
//           <select value={filterPosition} onChange={(e) => setFilterPosition(e.target.value)}
//             className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
//             <option value="All">All Positions</option>
//             {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
//           </select>
//           <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
//             className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
//             <option value="All">All Statuses</option>
//             {CALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
//           </select>
//           <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
//             <Share2 className="w-4 h-4" /> Share Mapping
//           </button>
//           <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
//             <Download className="w-4 h-4" /> Export
//           </button>
//           <button onClick={() => setAddModalOpen(true)}
//             className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap">
//             <Plus className="w-4 h-4" /> Add Candidate
//           </button>
//         </div>

//         {/* Status summary chips */}
//         <div className="flex flex-wrap gap-2 mb-4">
//           {Object.entries(statusCounts).map(([status, count]) => (
//             <button key={status} onClick={() => setFilterStatus(filterStatus === status ? "All" : status)}
//               className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${STATUS_COLORS[status] || "bg-gray-100 text-gray-700"} ${filterStatus === status ? "ring-2 ring-offset-1 ring-current" : ""}`}>
//               {status}: {count}
//             </button>
//           ))}
//           {filterStatus !== "All" && (
//             <button onClick={() => setFilterStatus("All")} className="px-2.5 py-1 rounded-full text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
//               Clear filter
//             </button>
//           )}
//         </div>

//         {searchQuery && (
//           <div className="mb-3 text-sm text-gray-600">
//             Showing {filteredData.length} candidate{filteredData.length !== 1 ? "s" : ""} matching "{searchQuery}"
//           </div>
//         )}

//         {/* Tracker table */}
//         <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
//           <table className="w-full min-w-[1000px]">
//             <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
//               <tr>
//                 {["Designation", "Academics", "Batch", "Practice Area", "Number", "Email ID", "Status", "Remarks", ""].map((h) => (
//                   <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredData.map((t) => (
//                 <tr key={t.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{t.designation}</td>
//                   <td className="px-4 py-4 text-sm text-gray-500 max-w-[140px] truncate" title={t.academics}>{t.academics}</td>
//                   <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{t.batch}</td>
//                   <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{t.practiceArea}</td>
//                   <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{t.number}</td>
//                   <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{t.email}</td>
//                   <td className="px-4 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
//                     <select value={t.status} onChange={(e) => handleStatusChange(t.id, e.target.value)}
//                       className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border-0 cursor-pointer ${STATUS_COLORS[t.status] || "bg-gray-100 text-gray-700"}`}>
//                       {CALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
//                     </select>
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-500 max-w-[180px] truncate" title={t.remarks}>{t.remarks || "—"}</td>
//                   <td className="px-4 py-4 whitespace-nowrap">
//                     <button onClick={() => setDetailRow(t)} className="text-gray-400 hover:text-teal-600 transition-colors">
//                       <Eye className="w-4 h-4" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {filteredData.length === 0 && (
//                 <tr><td colSpan={9} className="text-center py-12 text-gray-400 text-sm">No candidates match your filters</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>

//       {/* ─── Add Candidate Modal ─── */}
//       {addModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
//           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-xl font-semibold text-gray-900">Add Candidate to Tracker</h2>
//                 <button onClick={() => { setAddModalOpen(false); setNewCandidate(emptyForm); }} className="text-gray-400 hover:text-gray-600">
//                   <X size={24} />
//                 </button>
//               </div>
//             </div>

//             <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//               {/* Client */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Client <span className="text-red-500">*</span></label>
//                 <select value={newCandidate.client} onChange={(e) => updateField("client", e.target.value)}
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
//                   <option value="">Select client</option>
//                   {CLIENTS.map((c) => <option key={c} value={c}>{c}</option>)}
//                 </select>
//               </div>
//               {/* Position */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Position <span className="text-red-500">*</span></label>
//                 <select value={newCandidate.position} onChange={(e) => updateField("position", e.target.value)}
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
//                   <option value="">Select position</option>
//                   {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
//                 </select>
//               </div>
//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
//                 <input value={newCandidate.name} onChange={(e) => updateField("name", e.target.value)} placeholder="e.g. Rajesh Sharma"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
//               </div>
//               {/* Gender */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
//                 <select value={newCandidate.gender} onChange={(e) => updateField("gender", e.target.value)}
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
//                   <option value="">Select gender</option>
//                   <option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
//                 </select>
//               </div>
//               {/* Company */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Company <span className="text-red-500">*</span></label>
//                 <input value={newCandidate.company} onChange={(e) => updateField("company", e.target.value)} placeholder="e.g. TCS"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
//               </div>
//               {/* Designation */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Designation <span className="text-red-500">*</span></label>
//                 <input value={newCandidate.designation} onChange={(e) => updateField("designation", e.target.value)} placeholder="e.g. VP Engineering"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
//               </div>
//               {/* Academics */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Academics</label>
//                 <input value={newCandidate.academics} onChange={(e) => updateField("academics", e.target.value)} placeholder="e.g. IIT Bombay, B.Tech CS"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
//               </div>
//               {/* Batch */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
//                 <input value={newCandidate.batch} onChange={(e) => updateField("batch", e.target.value)} placeholder="e.g. 2005"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
//               </div>
//               {/* Practice Area */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Practice Area</label>
//                 <select value={newCandidate.practiceArea} onChange={(e) => updateField("practiceArea", e.target.value)}
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
//                   <option value="">Select</option>
//                   {PRACTICE_AREAS.map((p) => <option key={p} value={p}>{p}</option>)}
//                 </select>
//               </div>
//               {/* LinkedIn */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
//                 <input value={newCandidate.linkedin} onChange={(e) => updateField("linkedin", e.target.value)} placeholder="linkedin.com/in/name"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
//               </div>
//               {/* Phone */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
//                 <input value={newCandidate.number} onChange={(e) => updateField("number", e.target.value)} placeholder="+91 98765 43210"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
//               </div>
//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 <input value={newCandidate.email} onChange={(e) => updateField("email", e.target.value)} placeholder="name@email.com" type="email"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
//               </div>
//               {/* Remarks - full width */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
//                 <textarea value={newCandidate.remarks} onChange={(e) => updateField("remarks", e.target.value)}
//                   placeholder="Interest level, expected CTC, notice period, call notes..." rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-y" />
//               </div>
//             </div>

//             <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
//               <button onClick={() => { setAddModalOpen(false); setNewCandidate(emptyForm); }}
//                 className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
//               <button disabled={!isFormValid} onClick={handleAddCandidate}
//                 className={`px-6 py-2 text-white rounded-lg transition-colors ${isFormValid ? "bg-teal-600 hover:bg-teal-700" : "bg-gray-300 cursor-not-allowed"}`}>
//                 Add to Tracker
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ─── Detail Slide-over ─── */}
//       {detailRow && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
//           <div className="bg-white w-full max-w-md h-full overflow-auto shadow-2xl">
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//               <h2 className="text-lg font-semibold text-gray-900">Candidate Details</h2>
//               <button onClick={() => setDetailRow(null)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
//             </div>
//             <div className="p-6 space-y-5">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg">
//                   {detailRow.name.split(" ").map((n) => n[0]).join("")}
//                 </div>
//                 <div>
//                   <div className="text-sm font-medium text-gray-900">{detailRow.name}</div>
//                   <div className="text-sm text-gray-500">{detailRow.designation} at {detailRow.company}</div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 {([
//                   ["Client", detailRow.client], ["Position", detailRow.position],
//                   ["Gender", detailRow.gender], ["Academics", detailRow.academics],
//                   ["Batch", detailRow.batch], ["Practice Area", detailRow.practiceArea],
//                   ["Date of Entry", detailRow.dateOfEntry], ["Status", detailRow.status],
//                 ] as [string, string][]).map(([label, value]) => (
//                   <div key={label}>
//                     <div className="text-xs font-medium text-gray-500 uppercase">{label}</div>
//                     <div className="text-sm text-gray-900 mt-0.5">
//                       {label === "Status" ? (
//                         <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${STATUS_COLORS[value] || "bg-gray-100 text-gray-700"}`}>{value}</span>
//                       ) : value}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="space-y-2 pt-2 border-t border-gray-200">
//                 <div className="flex items-center gap-2 text-sm text-gray-600"><Phone className="w-4 h-4" /> {detailRow.number}</div>
//                 <div className="flex items-center gap-2 text-sm">
//                   <ExternalLink className="w-4 h-4 text-gray-400" />
//                   <a href={`https://${detailRow.linkedin}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{detailRow.linkedin}</a>
//                 </div>
//               </div>

//               {detailRow.remarks && (
//                 <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
//                   <div className="text-xs font-medium text-amber-700 uppercase mb-1">Remarks</div>
//                   <div className="text-sm text-amber-900">{detailRow.remarks}</div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CallingTracker;









// import { useState, useEffect, useRef } from "react";
// import Header from "../components/Header";
// import FilterSelect from "../components/FilterSelect";
// import Select from "react-select";
// import {
//   Search, Plus, X, Phone, Mail, ExternalLink, Eye, Pencil,
//   Download, ChevronLeft, ChevronRight,
// } from "lucide-react";
// import {
//   callingTrackerService,
//   type CallingTrackerPayload,
//   type CallingTrackerRow,
// } from "../services/callingTrackerService";
// import { clientService } from "../services/clientService";

// /* ------------------------------------------------------------------ */
// /* Constants and helpers                                               */
// /* ------------------------------------------------------------------ */

// // Fallback until /calling-tracker/statuses responds
// const DEFAULT_STATUSES = [
//   "New", "Connected", "Not Reachable", "Call Back", "Not Interested",
//   "Ready for Upload", "Submitted", "Shared", "Selected", "Rejected", "On Hold",
// ];

// const STATUS_COLORS: Record<string, string> = {
//   New: "bg-indigo-100 text-indigo-700",
//   Connected: "bg-emerald-100 text-emerald-700",
//   "Not Reachable": "bg-orange-100 text-orange-700",
//   "Call Back": "bg-amber-100 text-amber-700",
//   "Not Interested": "bg-red-100 text-red-700",
//   "Ready for Upload": "bg-sky-100 text-sky-700",
//   Submitted: "bg-purple-100 text-purple-700",
//   Shared: "bg-teal-100 text-teal-700",
//   Selected: "bg-green-100 text-green-700",
//   Rejected: "bg-red-100 text-red-700",
//   "On Hold": "bg-yellow-100 text-yellow-700",
// };

// const PRACTICE_AREAS = ["Technology", "Product", "Strategy", "Operations", "Finance", "HR", "Marketing", "Sales"];

// const GENDERS = ["Male", "Female", "Other"];

// const PAGE_LIMIT = 20;

// const TABLE_HEADERS = [
//   "Candidate", "Position", "Designation", "Academics", "Batch",
//   "Practice Area", "Number", "Email ID", "Status", "Remarks", "",
// ];

// const emptyForm: CallingTrackerPayload = {
//   client: "", position: "", name: "", linkedin: "", gender: "", company: "",
//   designation: "", academics: "", batch: "", practiceArea: "", number: "",
//   email: "", status: "New", remarks: "",
// };

// const toForm = (row: CallingTrackerRow): CallingTrackerPayload => ({
//   client: row.client || "",
//   position: row.position || "",
//   name: row.name || "",
//   linkedin: row.linkedin || "",
//   gender: row.gender || "",
//   company: row.company || "",
//   designation: row.designation || "",
//   academics: row.academics || "",
//   batch: row.batch || "",
//   practiceArea: row.practiceArea || "",
//   number: row.number || "",
//   email: row.email || "",
//   status: row.status || "New",
//   remarks: row.remarks || "",
// });

// const trimForm = (form: CallingTrackerPayload): CallingTrackerPayload =>
//   Object.fromEntries(
//     Object.entries(form).map(([key, value]) => [key, String(value ?? "").trim()])
//   ) as CallingTrackerPayload;

// // Keep a saved value selectable even if the API list no longer contains it
// const withCurrent = (list: string[], current: string) =>
//   current && !list.includes(current) ? [current, ...list] : list;

// const toOptions = (list: string[]) => list.map((v) => ({ value: v, label: v }));

// const formatDate = (iso?: string) =>
//   iso
//     ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
//     : "—";

// const toLinkedInHref = (url: string) => (/^https?:\/\//i.test(url) ? url : `https://${url}`);

// const getInitials = (name: string) =>
//   name.split(" ").filter(Boolean).map((n) => n[0]).join("").slice(0, 2).toUpperCase();

// const isValidEmail = (email: string) => !email.trim() || /^\S+@\S+\.\S+$/.test(email.trim());

// const downloadCsv = (csv: string, fileName: string) => {
//   // The API's CSV already starts with a BOM, so Excel reads UTF-8 correctly
//   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = url;
//   link.download = fileName;
//   document.body.appendChild(link);
//   link.click();
//   link.remove();
//   URL.revokeObjectURL(url);
// };

// // react-select (searchable lists) — teal to match FilterSelect
// const selectStyles = {
//   control: (base: any, state: any) => ({
//     ...base,
//     minHeight: "40px",
//     borderRadius: "0.5rem",
//     fontSize: "0.875rem",
//     borderColor: state.isFocused ? "#14b8a6" : "#d1d5db",
//     boxShadow: state.isFocused ? "0 0 0 2px rgba(20, 184, 166, 0.3)" : "none",
//     "&:hover": { borderColor: "#14b8a6" },
//   }),
//   placeholder: (base: any) => ({ ...base, color: "#9ca3af" }),
//   menu: (base: any) => ({ ...base, fontSize: "0.875rem" }),
//   menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
//   option: (base: any, state: any) => ({
//     ...base,
//     backgroundColor: state.isSelected ? "#0d9488" : state.isFocused ? "#f0fdfa" : "white",
//     color: state.isSelected ? "white" : "#374151",
//     "&:active": { backgroundColor: "#ccfbf1" },
//   }),
// };

// /* ------------------------------------------------------------------ */
// /* Form fields (top level so inputs don't remount and lose focus)      */
// /* ------------------------------------------------------------------ */

// const TextField = ({
//   label, required = false, value, onChange, placeholder, type = "text", error,
// }: {
//   label: string;
//   required?: boolean;
//   value: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
//   type?: string;
//   error?: string;
// }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">
//       {label} {required && <span className="text-red-500">*</span>}
//     </label>
//     <input
//       type={type}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       className={`w-full h-10 px-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
//         error ? "border-red-300" : "border-gray-300"
//       }`}
//     />
//     {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
//   </div>
// );

// const SelectField = ({
//   label, value, onChange, options, placeholder,
// }: {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
//   options: string[];
//   placeholder?: string;
// }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//     <FilterSelect
//       ariaLabel={label}
//       className="w-full"
//       value={value}
//       onChange={onChange}
//       options={[
//         ...(placeholder ? [{ value: "", label: placeholder }] : []),
//         ...toOptions(options),
//       ]}
//     />
//   </div>
// );

// /* ------------------------------------------------------------------ */
// /* Main                                                                */
// /* ------------------------------------------------------------------ */

// const CallingTracker = () => {
//   // list
//   const [rows, setRows] = useState<CallingTrackerRow[]>([]);
//   const [total, setTotal] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);
//   const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // filters
//   const [page, setPage] = useState(1);
//   const [searchInput, setSearchInput] = useState("");
//   const [searchQuery, setSearchQuery] = useState(""); // debounced
//   const [filterPosition, setFilterPosition] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("All");

//   // dropdown data
//   const [statuses, setStatuses] = useState<string[]>(DEFAULT_STATUSES);
//   const [positionOptions, setPositionOptions] = useState<string[]>([]);
//   const [clientOptions, setClientOptions] = useState<string[]>([]);

//   // add / edit form
//   const [formMode, setFormMode] = useState<"add" | "edit" | null>(null);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [form, setForm] = useState<CallingTrackerPayload>(emptyForm);
//   const [isSaving, setIsSaving] = useState(false);

//   // misc
//   const [detailRow, setDetailRow] = useState<CallingTrackerRow | null>(null);
//   const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);
//   const [isExporting, setIsExporting] = useState(false);

//   // Ignore responses from older requests when filters change quickly
//   const requestIdRef = useRef(0);

//   /* -------------------- data -------------------- */

//   const loadRows = async () => {
//     const requestId = ++requestIdRef.current;
//     setLoading(true);
//     setError("");
//     try {
//       const res = await callingTrackerService.fetchAll({
//         page,
//         limit: PAGE_LIMIT,
//         search: searchQuery,
//         position: filterPosition,
//         status: filterStatus,
//       });
//       if (requestId !== requestIdRef.current) return;
//       if (res.status === 200) {
//         setRows(res.data.rows || []);
//         setTotal(res.data.total || 0);
//         setTotalPages(Math.max(res.data.totalPages || 1, 1));
//         setStatusCounts(res.data.statusCounts || {});
//       } else {
//         console.error("Failed to fetch calling tracker:", res.message);
//         setError(res.message || "Could not load the calling tracker.");
//       }
//     } catch (err) {
//       if (requestId !== requestIdRef.current) return;
//       console.error("Error fetching calling tracker:", err);
//       setError("Could not load the calling tracker. Try again.");
//     } finally {
//       if (requestId === requestIdRef.current) setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadRows();
//   }, [page, searchQuery, filterPosition, filterStatus]);

//   // Debounce search so we don't call the API on every keystroke
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setSearchQuery(searchInput.trim());
//       setPage(1);
//     }, 400);
//     return () => clearTimeout(timer);
//   }, [searchInput]);

//   // Dropdown data
//   useEffect(() => {
//     callingTrackerService
//       .fetchStatuses()
//       .then((res) => {
//         if (res.status === 200 && Array.isArray(res.data) && res.data.length) setStatuses(res.data);
//       })
//       .catch((err) => console.error("Error fetching calling statuses:", err));

//     callingTrackerService
//       .fetchPositions()
//       .then((res) => {
//         if (res.status === 200 && Array.isArray(res.data)) {
//           setPositionOptions(
//             Array.from(new Set(res.data.filter(Boolean))).sort((a, b) => a.localeCompare(b))
//           );
//         }
//       })
//       .catch((err) => console.error("Error fetching calling positions:", err));

//     clientService
//       .fetchAll()
//       .then((res: any) => {
//         const clients = res?.data || [];
//         setClientOptions(
//           Array.from(new Set<string>(clients.map((c: any) => c.client_name).filter(Boolean))).sort(
//             (a, b) => a.localeCompare(b)
//           )
//         );
//       })
//       .catch((err: any) => console.error("Error fetching clients:", err));
//   }, []);

//   /* -------------------- filters -------------------- */

//   const changeStatusFilter = (status: string) => {
//     setFilterStatus(status);
//     setPage(1);
//   };

//   const changePositionFilter = (position: string) => {
//     setFilterPosition(position);
//     setPage(1);
//   };

//   /* -------------------- status update -------------------- */

//   const handleStatusChange = async (row: CallingTrackerRow, newStatus: string) => {
//     if (newStatus === row.status) return;
//     const previousStatus = row.status;

//     // Optimistic update, rolled back on failure
//     setUpdatingStatusId(row.id);
//     setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: newStatus } : r)));

//     try {
//       const res = await callingTrackerService.updateStatus(row.id, newStatus);
//       if (res.status !== 200) throw new Error(res.message || "Status update failed");
//       if (detailRow?.id === row.id) setDetailRow(res.data);
//       // Refresh counts, and drop the row if it no longer matches the status filter
//       loadRows();
//     } catch (err: any) {
//       console.error("Error updating calling status:", err);
//       setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: previousStatus } : r)));
//       alert(err?.response?.data?.message || "Could not update the status. Try again.");
//     } finally {
//       setUpdatingStatusId(null);
//     }
//   };

//   /* -------------------- add / edit -------------------- */

//   const openAddForm = () => {
//     setForm(emptyForm);
//     setEditingId(null);
//     setFormMode("add");
//   };

//   const openEditForm = (row: CallingTrackerRow) => {
//     setForm(toForm(row));
//     setEditingId(row.id);
//     setDetailRow(null);
//     setFormMode("edit");
//   };

//   const closeForm = () => {
//     setFormMode(null);
//     setEditingId(null);
//     setForm(emptyForm);
//   };

//   const updateField = (field: keyof CallingTrackerPayload, value: string) =>
//     setForm((prev) => ({ ...prev, [field]: value }));

//   const emailError = isValidEmail(form.email) ? "" : "Enter a valid email address.";

//   const isFormValid =
//     !!form.client.trim() &&
//     !!form.position.trim() &&
//     !!form.name.trim() &&
//     !!form.company.trim() &&
//     !!form.designation.trim() &&
//     !!form.number.trim() &&
//     !emailError;

//   const handleSave = async () => {
//     if (!isFormValid || isSaving) return;
//     setIsSaving(true);
//     const payload = trimForm(form);

//     try {
//       if (formMode === "edit" && editingId) {
//         const res = await callingTrackerService.updateCandidate(editingId, payload);
//         if (res.status !== 200) {
//           alert("Update failed: " + (res.message || "Unknown error"));
//           return;
//         }
//         closeForm();
//         loadRows();
//       } else {
//         const res = await callingTrackerService.addCandidate(payload);
//         if (res.status !== 201 && res.status !== 200) {
//           alert("Could not add the candidate: " + (res.message || "Unknown error"));
//           return;
//         }
//         closeForm();
//         // New entries show on page 1
//         if (page !== 1) setPage(1);
//         else loadRows();
//       }
//     } catch (err: any) {
//       console.error("Error saving calling tracker candidate:", err);
//       alert(err?.response?.data?.message || "Could not save the candidate. Try again.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   /* -------------------- export -------------------- */

//   const handleExport = async () => {
//     setIsExporting(true);
//     try {
//       const res = await callingTrackerService.exportCsv({
//         search: searchQuery,
//         position: filterPosition,
//         status: filterStatus,
//       });
//       if (res.status !== 200 || !res.data?.csv) {
//         alert(res.message || "Nothing to export.");
//         return;
//       }
//       downloadCsv(
//         res.data.csv,
//         res.data.fileName || `calling_tracker_export_${new Date().toISOString().slice(0, 10)}.csv`
//       );
//     } catch (err) {
//       console.error("Error exporting calling tracker:", err);
//       alert("Could not export the calling tracker. Try again.");
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   /* -------------------- derived -------------------- */

//   const visibleStatusCounts = Object.entries(statusCounts).filter(([, count]) => count > 0);
//   const rangeStart = total === 0 ? 0 : (page - 1) * PAGE_LIMIT + 1;
//   const rangeEnd = Math.min(page * PAGE_LIMIT, total);

//   const positionFilterOptions = [
//     { value: "All", label: "All Positions" },
//     ...toOptions(withCurrent(positionOptions, filterPosition === "All" ? "" : filterPosition)),
//   ];

//   const statusFilterOptions = [
//     { value: "All", label: "All Statuses" },
//     ...toOptions(withCurrent(statuses, filterStatus === "All" ? "" : filterStatus)),
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       <Header />

//       <main className="md:ml-16 px-4 md:px-6 py-4">
//         {/* Search + Filters + Actions */}
//         <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4">
//           <div className="relative flex-1 min-w-0">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-4 w-4 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search by name, company, designation, email or phone..."
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               className="w-full h-10 pl-9 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//             />
//             {searchInput && (
//               <button
//                 onClick={() => setSearchInput("")}
//                 aria-label="Clear search"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//               >
//                 <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
//               </button>
//             )}
//           </div>

//           <div className="flex flex-wrap items-center gap-3">
//             <div className="w-full sm:w-56">
//               <Select
//                 options={positionFilterOptions}
//                 value={positionFilterOptions.find((o) => o.value === filterPosition) || positionFilterOptions[0]}
//                 onChange={(opt: any) => changePositionFilter(opt?.value || "All")}
//                 isSearchable
//                 menuPortalTarget={document.body}
//                 styles={selectStyles}
//               />
//             </div>

//             <FilterSelect
//               ariaLabel="Filter by status"
//               className="w-full sm:w-48"
//               value={filterStatus}
//               onChange={changeStatusFilter}
//               options={statusFilterOptions}
//             />

//             <button
//               onClick={handleExport}
//               disabled={isExporting}
//               className="h-10 flex items-center gap-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-60 transition-colors whitespace-nowrap text-sm"
//             >
//               <Download className="w-4 h-4" /> {isExporting ? "Exporting..." : "Export"}
//             </button>
//             <button
//               onClick={openAddForm}
//               className="h-10 flex items-center gap-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap text-sm font-medium"
//             >
//               <Plus className="w-4 h-4" /> Add Candidate
//             </button>
//           </div>
//         </div>

//         {/* Status summary chips */}
//         {(visibleStatusCounts.length > 0 || filterStatus !== "All") && (
//           <div className="flex flex-wrap gap-2 mb-4">
//             {visibleStatusCounts.map(([status, count]) => (
//               <button
//                 key={status}
//                 onClick={() => changeStatusFilter(filterStatus === status ? "All" : status)}
//                 className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${
//                   STATUS_COLORS[status] || "bg-gray-100 text-gray-700"
//                 } ${filterStatus === status ? "ring-2 ring-offset-1 ring-current" : ""}`}
//               >
//                 {status}: {count}
//               </button>
//             ))}
//             {filterStatus !== "All" && (
//               <button
//                 onClick={() => changeStatusFilter("All")}
//                 className="px-2.5 py-1 rounded-full text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
//               >
//                 Clear filter
//               </button>
//             )}
//           </div>
//         )}

//         {searchQuery && !loading && (
//           <div className="mb-3 text-sm text-gray-600">
//             Showing {total} candidate{total !== 1 ? "s" : ""} matching "{searchQuery}"
//           </div>
//         )}

//         {error && (
//           <div className="mb-4 px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-sm text-red-700">
//             {error}
//           </div>
//         )}

//         {/* Tracker table */}
//         <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
//           <table className={`w-full min-w-[1300px] transition-opacity ${loading && rows.length ? "opacity-60" : ""}`}>
//             <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
//               <tr>
//                 {TABLE_HEADERS.map((h, i) => (
//                   <th key={`${h}-${i}`} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {loading && rows.length === 0 ? (
//                 <tr>
//                   <td colSpan={TABLE_HEADERS.length} className="text-center py-12 text-gray-400 text-sm">
//                     Loading candidates...
//                   </td>
//                 </tr>
//               ) : rows.length === 0 ? (
//                 <tr>
//                   <td colSpan={TABLE_HEADERS.length} className="text-center py-12 text-gray-400 text-sm">
//                     No candidates match your filters
//                   </td>
//                 </tr>
//               ) : (
//                 rows.map((t) => (
//                   <tr key={t.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{t.name}</div>
//                       <div className="text-xs text-gray-500">{t.company}</div>
//                     </td>
//                     <td className="px-4 py-4 max-w-[200px]">
//                       <div className="text-sm text-gray-900 truncate" title={t.position}>{t.position}</div>
//                       <div className="text-xs text-gray-500 truncate" title={t.client}>{t.client}</div>
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{t.designation}</td>
//                     <td className="px-4 py-4 text-sm text-gray-500 max-w-[140px] truncate" title={t.academics}>{t.academics || "—"}</td>
//                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{t.batch || "—"}</td>
//                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{t.practiceArea || "—"}</td>
//                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{t.number}</td>
//                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{t.email || "—"}</td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <FilterSelect
//                         ariaLabel={`Status for ${t.name}`}
//                         className="inline-block"
//                         hideChevron
//                         disabled={updatingStatusId === t.id}
//                         value={t.status}
//                         onChange={(s) => handleStatusChange(t, s)}
//                         options={toOptions(withCurrent(statuses, t.status))}
//                         buttonClassName={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full transition hover:brightness-95 ${
//                           STATUS_COLORS[t.status] || "bg-gray-100 text-gray-700"
//                         }`}
//                       />
//                     </td>
//                     <td className="px-4 py-4 text-sm text-gray-500 max-w-[180px] truncate" title={t.remarks}>{t.remarks || "—"}</td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-3">
//                         <button onClick={() => setDetailRow(t)} title="View details" aria-label="View details" className="text-gray-400 hover:text-teal-600 transition-colors">
//                           <Eye className="w-4 h-4" />
//                         </button>
//                         <button onClick={() => openEditForm(t)} title="Edit details" aria-label="Edit details" className="text-gray-400 hover:text-teal-600 transition-colors">
//                           <Pencil className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {total > 0 && (
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 text-sm text-gray-600">
//             <span>
//               Showing {rangeStart}–{rangeEnd} of {total}
//             </span>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setPage((p) => Math.max(p - 1, 1))}
//                 disabled={page <= 1 || loading}
//                 className="h-9 px-3 flex items-center gap-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
//               >
//                 <ChevronLeft className="w-4 h-4" /> Prev
//               </button>
//               <span className="px-2">
//                 Page {page} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//                 disabled={page >= totalPages || loading}
//                 className="h-9 px-3 flex items-center gap-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
//               >
//                 Next <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </main>

//       {/* ─── Add / Edit Candidate Modal ─── */}
//       {formMode && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
//           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-xl font-semibold text-gray-900">
//                   {formMode === "edit" ? "Edit Candidate Details" : "Add Candidate to Tracker"}
//                 </h2>
//                 <button onClick={closeForm} aria-label="Close" className="text-gray-400 hover:text-gray-600">
//                   <X size={24} />
//                 </button>
//               </div>
//             </div>

//             <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//               {/* Client */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Client <span className="text-red-500">*</span>
//                 </label>
//                 <Select
//                   options={toOptions(withCurrent(clientOptions, form.client))}
//                   value={form.client ? { value: form.client, label: form.client } : null}
//                   onChange={(opt: any) => updateField("client", opt?.value || "")}
//                   placeholder="Select client"
//                   isSearchable
//                   isClearable
//                   menuPortalTarget={document.body}
//                   styles={selectStyles}
//                 />
//               </div>
//               {/* Position */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Position <span className="text-red-500">*</span>
//                 </label>
//                 <Select
//                   options={toOptions(withCurrent(positionOptions, form.position))}
//                   value={form.position ? { value: form.position, label: form.position } : null}
//                   onChange={(opt: any) => updateField("position", opt?.value || "")}
//                   placeholder="Select position"
//                   isSearchable
//                   isClearable
//                   menuPortalTarget={document.body}
//                   styles={selectStyles}
//                 />
//               </div>

//               <TextField label="Full Name" required value={form.name} onChange={(v) => updateField("name", v)} placeholder="e.g. Rajesh Sharma" />

//               <SelectField
//                 label="Gender"
//                 placeholder="Select gender"
//                 value={form.gender}
//                 onChange={(v) => updateField("gender", v)}
//                 options={withCurrent(GENDERS, form.gender)}
//               />

//               <TextField label="Company" required value={form.company} onChange={(v) => updateField("company", v)} placeholder="e.g. TCS" />
//               <TextField label="Designation" required value={form.designation} onChange={(v) => updateField("designation", v)} placeholder="e.g. VP Engineering" />
//               <TextField label="Academics" value={form.academics} onChange={(v) => updateField("academics", v)} placeholder="e.g. IIT Bombay, B.Tech CS" />
//               <TextField label="Batch" value={form.batch} onChange={(v) => updateField("batch", v)} placeholder="e.g. 2005" />

//               <SelectField
//                 label="Practice Area"
//                 placeholder="Select"
//                 value={form.practiceArea}
//                 onChange={(v) => updateField("practiceArea", v)}
//                 options={withCurrent(PRACTICE_AREAS, form.practiceArea)}
//               />

//               <TextField label="LinkedIn URL" value={form.linkedin} onChange={(v) => updateField("linkedin", v)} placeholder="linkedin.com/in/name" />
//               <TextField label="Phone Number" required value={form.number} onChange={(v) => updateField("number", v)} placeholder="+91 98765 43210" />
//               <TextField label="Email" type="email" value={form.email} onChange={(v) => updateField("email", v)} placeholder="name@email.com" error={emailError} />

//               <SelectField
//                 label="Status"
//                 value={form.status}
//                 onChange={(v) => updateField("status", v)}
//                 options={withCurrent(statuses, form.status)}
//               />

//               {/* Remarks - full width */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
//                 <textarea
//                   value={form.remarks}
//                   onChange={(e) => updateField("remarks", e.target.value)}
//                   placeholder="Interest level, expected CTC, notice period, call notes..."
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-y"
//                 />
//               </div>
//             </div>

//             <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
//               <button
//                 onClick={closeForm}
//                 className="h-10 px-4 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 disabled={!isFormValid || isSaving}
//                 onClick={handleSave}
//                 className={`h-10 px-6 text-sm font-medium text-white rounded-lg transition-colors ${
//                   isFormValid && !isSaving ? "bg-teal-600 hover:bg-teal-700" : "bg-gray-300 cursor-not-allowed"
//                 }`}
//               >
//                 {isSaving ? "Saving..." : formMode === "edit" ? "Save Changes" : "Add to Tracker"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ─── Detail Slide-over ─── */}
//       {detailRow && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50" onClick={() => setDetailRow(null)}>
//           <div className="bg-white w-full max-w-md h-full overflow-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//               <h2 className="text-lg font-semibold text-gray-900">Candidate Details</h2>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => openEditForm(detailRow)}
//                   className="flex items-center gap-1.5 px-3 h-8 text-sm text-teal-700 border border-teal-200 rounded-lg hover:bg-teal-50"
//                 >
//                   <Pencil className="w-3.5 h-3.5" /> Edit
//                 </button>
//                 <button onClick={() => setDetailRow(null)} aria-label="Close" className="text-gray-400 hover:text-gray-600">
//                   <X size={24} />
//                 </button>
//               </div>
//             </div>
//             <div className="p-6 space-y-5">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-semibold text-lg">
//                   {getInitials(detailRow.name)}
//                 </div>
//                 <div>
//                   <div className="text-sm font-medium text-gray-900">{detailRow.name}</div>
//                   <div className="text-sm text-gray-500">
//                     {detailRow.designation} at {detailRow.company}
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 {([
//                   ["Client", detailRow.client],
//                   ["Position", detailRow.position],
//                   ["Gender", detailRow.gender],
//                   ["Academics", detailRow.academics],
//                   ["Batch", detailRow.batch],
//                   ["Practice Area", detailRow.practiceArea],
//                   ["Date of Entry", formatDate(detailRow.dateOfEntry)],
//                   ["Status", detailRow.status],
//                 ] as [string, string][]).map(([label, value]) => (
//                   <div key={label}>
//                     <div className="text-xs font-medium text-gray-500 uppercase">{label}</div>
//                     <div className="text-sm text-gray-900 mt-0.5 break-words">
//                       {label === "Status" ? (
//                         <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${STATUS_COLORS[value] || "bg-gray-100 text-gray-700"}`}>
//                           {value}
//                         </span>
//                       ) : (
//                         value || "—"
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="space-y-2 pt-2 border-t border-gray-200">
//                 <div className="flex items-center gap-2 text-sm text-gray-600">
//                   <Phone className="w-4 h-4" /> {detailRow.number}
//                 </div>
//                 {detailRow.email && (
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <Mail className="w-4 h-4" /> {detailRow.email}
//                   </div>
//                 )}
//                 {detailRow.linkedin && (
//                   <div className="flex items-center gap-2 text-sm min-w-0">
//                     <ExternalLink className="w-4 h-4 text-gray-400 shrink-0" />
//                     <a href={toLinkedInHref(detailRow.linkedin)} target="_blank" rel="noreferrer" className="text-teal-700 hover:underline truncate">
//                       {detailRow.linkedin}
//                     </a>
//                   </div>
//                 )}
//               </div>

//               {detailRow.remarks && (
//                 <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
//                   <div className="text-xs font-medium text-amber-700 uppercase mb-1">Remarks</div>
//                   <div className="text-sm text-amber-900">{detailRow.remarks}</div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CallingTracker;







import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import FilterSelect from "../components/FilterSelect";
import Select from "react-select";
import {
  Search, Plus, X, Phone, Mail, ExternalLink, Eye, Pencil,
  Download, ChevronLeft, ChevronRight,
} from "lucide-react";
import {
  callingTrackerService,
  type CallingTrackerPayload,
  type CallingTrackerRow,
} from "../services/callingTrackerService";
import { clientService } from "../services/clientService";

/* ------------------------------------------------------------------ */
/* Constants and helpers                                               */
/* ------------------------------------------------------------------ */

// Fallback until /calling-tracker/statuses responds
const DEFAULT_STATUSES = [
  "New", "Connected", "Not Reachable", "Call Back", "Not Interested",
  "Ready for Upload", "Submitted", "Shared", "Selected", "Rejected", "On Hold",
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

const statusColor = (status: string) => STATUS_COLORS[status] || "bg-gray-100 text-gray-700";

const PRACTICE_AREAS = ["Technology", "Product", "Strategy", "Operations", "Finance", "HR", "Marketing", "Sales"];

const GENDERS = ["Male", "Female", "Other"];

const PAGE_LIMIT = 20;

const emptyForm: CallingTrackerPayload = {
  client: "", position: "", name: "", linkedin: "", gender: "", company: "",
  designation: "", academics: "", batch: "", practiceArea: "", number: "",
  email: "", status: "New", remarks: "",
};

const toForm = (row: CallingTrackerRow): CallingTrackerPayload => ({
  client: row.client || "",
  position: row.position || "",
  name: row.name || "",
  linkedin: row.linkedin || "",
  gender: row.gender || "",
  company: row.company || "",
  designation: row.designation || "",
  academics: row.academics || "",
  batch: row.batch || "",
  practiceArea: row.practiceArea || "",
  number: row.number || "",
  email: row.email || "",
  status: row.status || "New",
  remarks: row.remarks || "",
});

const trimForm = (form: CallingTrackerPayload): CallingTrackerPayload =>
  Object.fromEntries(
    Object.entries(form).map(([key, value]) => [key, String(value ?? "").trim()])
  ) as CallingTrackerPayload;

// Keep a saved value selectable even if the API list no longer contains it
const withCurrent = (list: string[], current: string) =>
  current && !list.includes(current) ? [current, ...list] : list;

const toOptions = (list: string[]) => list.map((v) => ({ value: v, label: v }));

/** Joins the non-empty parts with a middle dot, e.g. "VP Eng · TCS" */
const joinDot = (...parts: (string | undefined)[]) => parts.filter(Boolean).join(" · ");

const formatDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "—";

const toLinkedInHref = (url: string) => (/^https?:\/\//i.test(url) ? url : `https://${url}`);

const getInitials = (name: string) =>
  name.split(" ").filter(Boolean).map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const isValidEmail = (email: string) => !email.trim() || /^\S+@\S+\.\S+$/.test(email.trim());

const downloadCsv = (csv: string, fileName: string) => {
  // The API's CSV already starts with a BOM, so Excel reads UTF-8 correctly
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

// react-select (searchable lists) — teal to match FilterSelect
const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: "40px",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    borderColor: state.isFocused ? "#14b8a6" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(20, 184, 166, 0.3)" : "none",
    "&:hover": { borderColor: "#14b8a6" },
  }),
  placeholder: (base: any) => ({ ...base, color: "#9ca3af" }),
  menu: (base: any) => ({ ...base, fontSize: "0.875rem" }),
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected ? "#0d9488" : state.isFocused ? "#f0fdfa" : "white",
    color: state.isSelected ? "white" : "#374151",
    "&:active": { backgroundColor: "#ccfbf1" },
  }),
};

/* ------------------------------------------------------------------ */
/* Small shared pieces (top level so they don't remount)               */
/* ------------------------------------------------------------------ */

const TextField = ({
  label, required = false, value, onChange, placeholder, type = "text", error,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full h-10 px-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
        error ? "border-red-300" : "border-gray-300"
      }`}
    />
    {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
  </div>
);

const SelectField = ({
  label, value, onChange, options, placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <FilterSelect
      ariaLabel={label}
      className="w-full"
      value={value}
      onChange={onChange}
      options={[
        ...(placeholder ? [{ value: "", label: placeholder }] : []),
        ...toOptions(options),
      ]}
    />
  </div>
);

/** The clickable coloured status pill used in the table and the cards */
const StatusPill = ({
  row, statuses, disabled, onChange,
}: {
  row: CallingTrackerRow;
  statuses: string[];
  disabled: boolean;
  onChange: (status: string) => void;
}) => (
  <FilterSelect
    ariaLabel={`Status for ${row.name}`}
    className="inline-block max-w-full"
    chevronClassName="h-3 w-3"
    disabled={disabled}
    value={row.status}
    onChange={onChange}
    options={toOptions(withCurrent(statuses, row.status))}
    buttonClassName={`inline-flex max-w-full items-center gap-1 pl-2.5 pr-2 py-1 text-xs font-semibold rounded-full transition hover:brightness-95 ${statusColor(
      row.status
    )}`}
  />
);

const RowActions = ({ onView, onEdit }: { onView: () => void; onEdit: () => void }) => (
  <div className="flex items-center justify-end gap-1">
    <button
      onClick={onView}
      title="View details"
      aria-label="View details"
      className="h-8 w-8 grid place-items-center rounded-lg text-gray-400 hover:bg-teal-50 hover:text-teal-600 transition-colors"
    >
      <Eye className="w-4 h-4" strokeWidth={1.75} />
    </button>
    <button
      onClick={onEdit}
      title="Edit details"
      aria-label="Edit details"
      className="h-8 w-8 grid place-items-center rounded-lg text-gray-400 hover:bg-teal-50 hover:text-teal-600 transition-colors"
    >
      <Pencil className="w-4 h-4" strokeWidth={1.75} />
    </button>
  </div>
);

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

const CallingTracker = () => {
  // list
  const [rows, setRows] = useState<CallingTrackerRow[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // filters
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // debounced
  const [filterPosition, setFilterPosition] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // dropdown data
  const [statuses, setStatuses] = useState<string[]>(DEFAULT_STATUSES);
  const [positionOptions, setPositionOptions] = useState<string[]>([]);
  const [clientOptions, setClientOptions] = useState<string[]>([]);

  // add / edit form
  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CallingTrackerPayload>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);

  // misc
  const [detailRow, setDetailRow] = useState<CallingTrackerRow | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Ignore responses from older requests when filters change quickly
  const requestIdRef = useRef(0);

  /* -------------------- data -------------------- */

  const loadRows = async () => {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    setError("");
    try {
      const res = await callingTrackerService.fetchAll({
        page,
        limit: PAGE_LIMIT,
        search: searchQuery,
        position: filterPosition,
        status: filterStatus,
      });
      if (requestId !== requestIdRef.current) return;
      if (res.status === 200) {
        setRows(res.data.rows || []);
        setTotal(res.data.total || 0);
        setTotalPages(Math.max(res.data.totalPages || 1, 1));
        setStatusCounts(res.data.statusCounts || {});
      } else {
        console.error("Failed to fetch calling tracker:", res.message);
        setError(res.message || "Could not load the calling tracker.");
      }
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      console.error("Error fetching calling tracker:", err);
      setError("Could not load the calling tracker. Try again.");
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  };

  useEffect(() => {
    loadRows();
  }, [page, searchQuery, filterPosition, filterStatus]);

  // Debounce search so we don't call the API on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Dropdown data
  useEffect(() => {
    callingTrackerService
      .fetchStatuses()
      .then((res) => {
        if (res.status === 200 && Array.isArray(res.data) && res.data.length) setStatuses(res.data);
      })
      .catch((err) => console.error("Error fetching calling statuses:", err));

    callingTrackerService
      .fetchPositions()
      .then((res) => {
        if (res.status === 200 && Array.isArray(res.data)) {
          setPositionOptions(
            Array.from(new Set(res.data.filter(Boolean))).sort((a, b) => a.localeCompare(b))
          );
        }
      })
      .catch((err) => console.error("Error fetching calling positions:", err));

    clientService
      .fetchAll()
      .then((res: any) => {
        const clients = res?.data || [];
        setClientOptions(
          Array.from(new Set<string>(clients.map((c: any) => c.client_name).filter(Boolean))).sort(
            (a, b) => a.localeCompare(b)
          )
        );
      })
      .catch((err: any) => console.error("Error fetching clients:", err));
  }, []);

  // Esc closes the details card
  useEffect(() => {
    if (!detailRow) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDetailRow(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [detailRow]);

  /* -------------------- filters -------------------- */

  const changeStatusFilter = (status: string) => {
    setFilterStatus(status);
    setPage(1);
  };

  const changePositionFilter = (position: string) => {
    setFilterPosition(position);
    setPage(1);
  };

  /* -------------------- status update -------------------- */

  const handleStatusChange = async (row: CallingTrackerRow, newStatus: string) => {
    if (newStatus === row.status) return;
    const previousStatus = row.status;

    // Optimistic update, rolled back on failure
    setUpdatingStatusId(row.id);
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: newStatus } : r)));

    try {
      const res = await callingTrackerService.updateStatus(row.id, newStatus);
      if (res.status !== 200) throw new Error(res.message || "Status update failed");
      if (detailRow?.id === row.id) setDetailRow(res.data);
      // Refresh counts, and drop the row if it no longer matches the status filter
      loadRows();
    } catch (err: any) {
      console.error("Error updating calling status:", err);
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: previousStatus } : r)));
      alert(err?.response?.data?.message || "Could not update the status. Try again.");
    } finally {
      setUpdatingStatusId(null);
    }
  };

  /* -------------------- add / edit -------------------- */

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setFormMode("add");
  };

  const openEditForm = (row: CallingTrackerRow) => {
    setForm(toForm(row));
    setEditingId(row.id);
    setDetailRow(null);
    setFormMode("edit");
  };

  const closeForm = () => {
    setFormMode(null);
    setEditingId(null);
    setForm(emptyForm);
  };

  const updateField = (field: keyof CallingTrackerPayload, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const emailError = isValidEmail(form.email) ? "" : "Enter a valid email address.";

  const isFormValid =
    !!form.client.trim() &&
    !!form.position.trim() &&
    !!form.name.trim() &&
    !!form.company.trim() &&
    !!form.designation.trim() &&
    !!form.number.trim() &&
    !emailError;

  const handleSave = async () => {
    if (!isFormValid || isSaving) return;
    setIsSaving(true);
    const payload = trimForm(form);

    try {
      if (formMode === "edit" && editingId) {
        const res = await callingTrackerService.updateCandidate(editingId, payload);
        if (res.status !== 200) {
          alert("Update failed: " + (res.message || "Unknown error"));
          return;
        }
        closeForm();
        loadRows();
      } else {
        const res = await callingTrackerService.addCandidate(payload);
        if (res.status !== 201 && res.status !== 200) {
          alert("Could not add the candidate: " + (res.message || "Unknown error"));
          return;
        }
        closeForm();
        // New entries show on page 1
        if (page !== 1) setPage(1);
        else loadRows();
      }
    } catch (err: any) {
      console.error("Error saving calling tracker candidate:", err);
      alert(err?.response?.data?.message || "Could not save the candidate. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  /* -------------------- export -------------------- */

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const res = await callingTrackerService.exportCsv({
        search: searchQuery,
        position: filterPosition,
        status: filterStatus,
      });
      if (res.status !== 200 || !res.data?.csv) {
        alert(res.message || "Nothing to export.");
        return;
      }
      downloadCsv(
        res.data.csv,
        res.data.fileName || `calling_tracker_export_${new Date().toISOString().slice(0, 10)}.csv`
      );
    } catch (err) {
      console.error("Error exporting calling tracker:", err);
      alert("Could not export the calling tracker. Try again.");
    } finally {
      setIsExporting(false);
    }
  };

  /* -------------------- derived -------------------- */

  const visibleStatusCounts = Object.entries(statusCounts).filter(([, count]) => count > 0);
  const rangeStart = total === 0 ? 0 : (page - 1) * PAGE_LIMIT + 1;
  const rangeEnd = Math.min(page * PAGE_LIMIT, total);
  const dimWhileLoading = loading && rows.length ? "opacity-60" : "";

  const positionFilterOptions = [
    { value: "All", label: "All Positions" },
    ...toOptions(withCurrent(positionOptions, filterPosition === "All" ? "" : filterPosition)),
  ];

  const statusFilterOptions = [
    { value: "All", label: "All Statuses" },
    ...toOptions(withCurrent(statuses, filterStatus === "All" ? "" : filterStatus)),
  ];

  const emptyState =
    loading && rows.length === 0
      ? "Loading candidates..."
      : rows.length === 0
      ? "No candidates match your filters"
      : "";

  const TH = "px-4 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider";

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="md:ml-16 px-4 md:px-6 py-4">
        {/* Search + Filters + Actions */}
        <div className="flex flex-col xl:flex-row xl:items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, company, designation, email or phone..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full h-10 pl-9 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3">
            <div className="col-span-2 sm:col-span-1 sm:w-56">
              <Select
                options={positionFilterOptions}
                value={positionFilterOptions.find((o) => o.value === filterPosition) || positionFilterOptions[0]}
                onChange={(opt: any) => changePositionFilter(opt?.value || "All")}
                isSearchable
                menuPortalTarget={document.body}
                styles={selectStyles}
              />
            </div>

            <FilterSelect
              ariaLabel="Filter by status"
              className="col-span-2 sm:col-span-1 sm:w-48"
              value={filterStatus}
              onChange={changeStatusFilter}
              options={statusFilterOptions}
            />

            <button
              onClick={handleExport}
              disabled={isExporting}
              className="h-10 flex items-center justify-center gap-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-60 transition-colors whitespace-nowrap text-sm"
            >
              <Download className="w-4 h-4" /> {isExporting ? "Exporting..." : "Export"}
            </button>
            <button
              onClick={openAddForm}
              className="h-10 flex items-center justify-center gap-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Add Candidate
            </button>
          </div>
        </div>

        {/* Status summary chips */}
        {(visibleStatusCounts.length > 0 || filterStatus !== "All") && (
          <div className="flex flex-wrap gap-2 mb-4">
            {visibleStatusCounts.map(([status, count]) => (
              <button
                key={status}
                onClick={() => changeStatusFilter(filterStatus === status ? "All" : status)}
                className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${statusColor(status)} ${
                  filterStatus === status ? "ring-2 ring-offset-1 ring-current" : ""
                }`}
              >
                {status}: {count}
              </button>
            ))}
            {filterStatus !== "All" && (
              <button
                onClick={() => changeStatusFilter("All")}
                className="px-2.5 py-1 rounded-full text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Clear filter
              </button>
            )}
          </div>
        )}

        {searchQuery && !loading && (
          <div className="mb-3 text-sm text-gray-600">
            Showing {total} candidate{total !== 1 ? "s" : ""} matching "{searchQuery}"
          </div>
        )}

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* ─── Desktop: table that always fits the screen ─── */}
        <div className="hidden lg:block bg-white border border-gray-200 rounded-lg shadow-sm overflow-clip">
          <table className={`w-full table-fixed transition-opacity ${dimWhileLoading}`}>
            <colgroup>
              <col className="w-[19%]" />
              <col className="w-[18%]" />
              <col className="w-[15%]" />
              <col className="w-[19%]" />
              <col className="w-[13%]" />
              <col />
              <col className="w-[84px]" />
            </colgroup>
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className={TH}>Candidate</th>
                <th className={TH}>Position</th>
                <th className={TH}>Background</th>
                <th className={TH}>Contact</th>
                <th className={TH}>Status</th>
                <th className={TH}>Remarks</th>
                <th className={`${TH} text-right`}>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {emptyState ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">
                    {emptyState}
                  </td>
                </tr>
              ) : (
                rows.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50/70 transition-colors align-top">
                    {/* Candidate */}
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => setDetailRow(t)}
                        className="block max-w-full truncate text-left text-sm font-medium text-gray-900 hover:text-teal-700"
                        title={t.name}
                      >
                        {t.name}
                      </button>
                      <div className="mt-0.5 truncate text-xs text-gray-500" title={joinDot(t.designation, t.company)}>
                        {joinDot(t.designation, t.company) || "—"}
                      </div>
                    </td>

                    {/* Position */}
                    <td className="px-4 py-3.5">
                      <div className="truncate text-sm text-gray-900" title={t.position}>{t.position || "—"}</div>
                      <div className="mt-0.5 truncate text-xs text-gray-500" title={t.client}>{t.client || "—"}</div>
                    </td>

                    {/* Background */}
                    <td className="px-4 py-3.5">
                      <div className="truncate text-sm text-gray-700" title={t.academics}>{t.academics || "—"}</div>
                      <div className="mt-0.5 truncate text-xs text-gray-500">
                        {joinDot(t.batch, t.practiceArea) || "—"}
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-3.5">
                      {t.number ? (
                        <a
                          href={`tel:${t.number}`}
                          className="flex items-center gap-1.5 truncate text-sm text-gray-700 hover:text-teal-700"
                        >
                          <Phone className="w-3.5 h-3.5 shrink-0 text-gray-400" strokeWidth={1.75} />
                          <span className="truncate">{t.number}</span>
                        </a>
                      ) : (
                        <div className="text-sm text-gray-400">—</div>
                      )}
                      {t.email && (
                        <a
                          href={`mailto:${t.email}`}
                          title={t.email}
                          className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500 hover:text-teal-700"
                        >
                          <Mail className="w-3.5 h-3.5 shrink-0 text-gray-400" strokeWidth={1.75} />
                          <span className="truncate">{t.email}</span>
                        </a>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <StatusPill
                        row={t}
                        statuses={statuses}
                        disabled={updatingStatusId === t.id}
                        onChange={(s) => handleStatusChange(t, s)}
                      />
                    </td>

                    {/* Remarks */}
                    <td className="px-4 py-3.5">
                      <p className="line-clamp-2 text-xs leading-5 text-gray-500 break-words" title={t.remarks}>
                        {t.remarks || "—"}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-2.5">
                      <RowActions onView={() => setDetailRow(t)} onEdit={() => openEditForm(t)} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ─── Tablet / mobile: cards ─── */}
        <div className={`lg:hidden space-y-3 transition-opacity ${dimWhileLoading}`}>
          {emptyState ? (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-sm text-gray-400">
              {emptyState}
            </div>
          ) : (
            rows.map((t) => (
              <div key={t.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <button
                      onClick={() => setDetailRow(t)}
                      className="block max-w-full truncate text-left text-sm font-semibold text-gray-900"
                    >
                      {t.name}
                    </button>
                    <div className="mt-0.5 truncate text-xs text-gray-500">
                      {joinDot(t.designation, t.company)}
                    </div>
                  </div>
                  <StatusPill
                    row={t}
                    statuses={statuses}
                    disabled={updatingStatusId === t.id}
                    onChange={(s) => handleStatusChange(t, s)}
                  />
                </div>

                <div className="mt-3 text-sm text-gray-800 truncate">{t.position}</div>
                <div className="text-xs text-gray-500 truncate">{t.client}</div>

                {(t.academics || t.batch || t.practiceArea) && (
                  <div className="mt-2 text-xs text-gray-500 truncate">
                    {joinDot(t.academics, t.batch, t.practiceArea)}
                  </div>
                )}

                {t.remarks && (
                  <p className="mt-2 line-clamp-2 text-xs text-gray-500">{t.remarks}</p>
                )}

                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
                    {t.number && (
                      <a href={`tel:${t.number}`} className="flex items-center gap-1.5 hover:text-teal-700">
                        <Phone className="w-3.5 h-3.5 text-gray-400" /> {t.number}
                      </a>
                    )}
                    {t.email && (
                      <a href={`mailto:${t.email}`} className="flex min-w-0 items-center gap-1.5 hover:text-teal-700">
                        <Mail className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                        <span className="truncate">{t.email}</span>
                      </a>
                    )}
                  </div>
                  <RowActions onView={() => setDetailRow(t)} onEdit={() => openEditForm(t)} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {total > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 text-sm text-gray-600">
            <span>
              Showing {rangeStart}–{rangeEnd} of {total}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page <= 1 || loading}
                className="h-9 px-3 flex items-center gap-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <span className="px-2">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page >= totalPages || loading}
                className="h-9 px-3 flex items-center gap-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ─── Add / Edit Candidate Modal ─── */}
      {formMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {formMode === "edit" ? "Edit Candidate Details" : "Add Candidate to Tracker"}
                </h2>
                <button onClick={closeForm} aria-label="Close" className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Client */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client <span className="text-red-500">*</span>
                </label>
                <Select
                  options={toOptions(withCurrent(clientOptions, form.client))}
                  value={form.client ? { value: form.client, label: form.client } : null}
                  onChange={(opt: any) => updateField("client", opt?.value || "")}
                  placeholder="Select client"
                  isSearchable
                  isClearable
                  menuPortalTarget={document.body}
                  styles={selectStyles}
                />
              </div>
              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position <span className="text-red-500">*</span>
                </label>
                <Select
                  options={toOptions(withCurrent(positionOptions, form.position))}
                  value={form.position ? { value: form.position, label: form.position } : null}
                  onChange={(opt: any) => updateField("position", opt?.value || "")}
                  placeholder="Select position"
                  isSearchable
                  isClearable
                  menuPortalTarget={document.body}
                  styles={selectStyles}
                />
              </div>

              <TextField label="Full Name" required value={form.name} onChange={(v) => updateField("name", v)} placeholder="e.g. Rajesh Sharma" />

              <SelectField
                label="Gender"
                placeholder="Select gender"
                value={form.gender}
                onChange={(v) => updateField("gender", v)}
                options={withCurrent(GENDERS, form.gender)}
              />

              <TextField label="Company" required value={form.company} onChange={(v) => updateField("company", v)} placeholder="e.g. TCS" />
              <TextField label="Designation" required value={form.designation} onChange={(v) => updateField("designation", v)} placeholder="e.g. VP Engineering" />
              <TextField label="Academics" value={form.academics} onChange={(v) => updateField("academics", v)} placeholder="e.g. IIT Bombay, B.Tech CS" />
              <TextField label="Batch" value={form.batch} onChange={(v) => updateField("batch", v)} placeholder="e.g. 2005" />

              <SelectField
                label="Practice Area"
                placeholder="Select"
                value={form.practiceArea}
                onChange={(v) => updateField("practiceArea", v)}
                options={withCurrent(PRACTICE_AREAS, form.practiceArea)}
              />

              <TextField label="LinkedIn URL" value={form.linkedin} onChange={(v) => updateField("linkedin", v)} placeholder="linkedin.com/in/name" />
              <TextField label="Phone Number" required value={form.number} onChange={(v) => updateField("number", v)} placeholder="+91 98765 43210" />
              <TextField label="Email" type="email" value={form.email} onChange={(v) => updateField("email", v)} placeholder="name@email.com" error={emailError} />

              <SelectField
                label="Status"
                value={form.status}
                onChange={(v) => updateField("status", v)}
                options={withCurrent(statuses, form.status)}
              />

              {/* Remarks - full width */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  value={form.remarks}
                  onChange={(e) => updateField("remarks", e.target.value)}
                  placeholder="Interest level, expected CTC, notice period, call notes..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-y"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={closeForm}
                className="h-10 px-4 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={!isFormValid || isSaving}
                onClick={handleSave}
                className={`h-10 px-6 text-sm font-medium text-white rounded-lg transition-colors ${
                  isFormValid && !isSaving ? "bg-teal-600 hover:bg-teal-700" : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {isSaving ? "Saving..." : formMode === "edit" ? "Save Changes" : "Add to Tracker"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Candidate Details (centred card) ─── */}
      {detailRow && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-gray-900/40 backdrop-blur-[2px] sm:p-4"
          onClick={() => setDetailRow(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${detailRow.name} details`}
        >
          <div
            className="flex w-full sm:max-w-2xl max-h-[92vh] flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative shrink-0 border-b border-gray-100 bg-gradient-to-b from-teal-50/70 to-white px-5 sm:px-6 pt-5 pb-4">
              <button
                onClick={() => setDetailRow(null)}
                aria-label="Close"
                className="absolute right-4 top-4 h-8 w-8 grid place-items-center rounded-full text-gray-400 hover:bg-white hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-4 pr-10">
                <div className="h-14 w-14 shrink-0 rounded-full bg-teal-600 text-white flex items-center justify-center text-lg font-semibold">
                  {getInitials(detailRow.name)}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-semibold text-gray-900">{detailRow.name}</h2>
                  <p className="truncate text-sm text-gray-500">
                    {joinDot(detailRow.designation, detailRow.company) || "—"}
                  </p>
                  <span
                    className={`mt-2 inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${statusColor(detailRow.status)}`}
                  >
                    {detailRow.status}
                  </span>
                </div>
              </div>

              {/* Quick actions */}
              <div className="mt-4 flex flex-wrap gap-2">
                {detailRow.number && (
                  <a
                    href={`tel:${detailRow.number}`}
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 hover:border-teal-300 hover:text-teal-700"
                  >
                    <Phone className="w-3.5 h-3.5" /> {detailRow.number}
                  </a>
                )}
                {detailRow.email && (
                  <a
                    href={`mailto:${detailRow.email}`}
                    className="inline-flex h-8 max-w-full items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 hover:border-teal-300 hover:text-teal-700"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{detailRow.email}</span>
                  </a>
                )}
                {detailRow.linkedin && (
                  <a
                    href={toLinkedInHref(detailRow.linkedin)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 hover:border-teal-300 hover:text-teal-700"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-6">
              {([
                {
                  title: "Opportunity",
                  items: [
                    ["Client", detailRow.client],
                    ["Position", detailRow.position],
                  ],
                },
                {
                  title: "Profile",
                  items: [
                    ["Gender", detailRow.gender],
                    ["Academics", detailRow.academics],
                    ["Batch", detailRow.batch],
                    ["Practice area", detailRow.practiceArea],
                  ],
                },
                {
                  title: "Tracking",
                  items: [["Added on", formatDate(detailRow.dateOfEntry)]],
                },
              ] as { title: string; items: [string, string][] }[]).map((section) => (
                <section key={section.title}>
                  <h3 className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    {section.title}
                  </h3>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 rounded-xl border border-gray-100 bg-gray-50/60 p-4">
                    {section.items.map(([label, value]) => (
                      <div key={label} className="min-w-0">
                        <dt className="text-xs text-gray-500">{label}</dt>
                        <dd className="mt-0.5 text-sm font-medium text-gray-900 break-words">{value || "—"}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}

              <section>
                <h3 className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Remarks
                </h3>
                {detailRow.remarks ? (
                  <p className="whitespace-pre-wrap rounded-xl border border-amber-100 bg-amber-50/70 p-4 text-sm leading-relaxed text-amber-900">
                    {detailRow.remarks}
                  </p>
                ) : (
                  <p className="rounded-xl border border-dashed border-gray-200 p-4 text-sm text-gray-400">
                    No remarks yet.
                  </p>
                )}
              </section>
            </div>

            {/* Footer */}
            <div className="shrink-0 flex justify-end gap-3 border-t border-gray-100 px-5 sm:px-6 py-3.5">
              <button
                onClick={() => setDetailRow(null)}
                className="h-10 px-4 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => openEditForm(detailRow)}
                className="h-10 px-5 inline-flex items-center gap-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700"
              >
                <Pencil className="w-4 h-4" /> Edit details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallingTracker;