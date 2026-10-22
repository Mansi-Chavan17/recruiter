// import { useState, useMemo, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import { crmService } from "../services/crmService";
// import type {
//   Client,
//   Submission,
//   RevenueRow,
//   Offer,
//   PositionPerformance,
// } from "../types/crm";

// // ─── Utility Helpers ─────────────────────────────────────────────────────────

// function formatINR(amount: number): string {
//   if (amount >= 100000) {
//     return `${(amount / 100000).toFixed(1)}L`;
//   }
//   return new Intl.NumberFormat("en-IN").format(amount);
// }

// function getApprovalBadgeClass(status: string): string {
//   switch (status) {
//     case "Approved": return "bg-green-100 text-green-800";
//     case "Pending": return "bg-yellow-100 text-yellow-800";
//     case "Rejected": return "bg-red-100 text-red-800";
//     default: return "bg-gray-100 text-gray-600";
//   }
// }

// function getFeedbackBadgeClass(feedback: string): string {
//   switch (feedback) {
//     case "Shortlisted": return "bg-blue-100 text-blue-800";
//     case "Interview Scheduled": return "bg-indigo-100 text-indigo-800";
//     case "Offer Stage": return "bg-green-100 text-green-800";
//     case "Rejected": return "bg-red-100 text-red-800";
//     case "On Hold": return "bg-orange-100 text-orange-800";
//     case "Awaiting": return "bg-gray-100 text-gray-600";
//     default: return "bg-gray-100 text-gray-600";
//   }
// }

// function getInvoiceBadgeClass(status: string): string {
//   switch (status) {
//     case "Paid": return "bg-green-100 text-green-800";
//     case "Sent": return "bg-blue-100 text-blue-800";
//     case "Drafted": return "bg-gray-100 text-gray-600";
//     case "Overdue": return "bg-red-100 text-red-800";
//     default: return "bg-gray-100 text-gray-600";
//   }
// }

// function getOfferStatusBadgeClass(status: string): string {
//   switch (status) {
//     case "Accepted": return "bg-green-100 text-green-800";
//     case "Negotiation": return "bg-yellow-100 text-yellow-800";
//     case "Extended": return "bg-blue-100 text-blue-800";
//     case "Declined": return "bg-red-100 text-red-800";
//     case "Revoked": return "bg-red-100 text-red-800";
//     case "Ghosted": return "bg-gray-100 text-gray-600";
//     default: return "bg-gray-100 text-gray-600";
//   }
// }

// function getStatusBadgeClass(status: string): string {
//   switch (status) {
//     case "Active": return "bg-green-100 text-green-800";
//     case "Inactive": return "bg-gray-100 text-gray-600";
//     case "New": return "bg-blue-100 text-blue-800";
//     default: return "bg-gray-100 text-gray-600";
//   }
// }

// // ─── Sub-Components ──────────────────────────────────────────────────────────

// // ---------- 1. Client Details ----------

// const emptyClient: Omit<Client, "id"> = {
//   name: "", industry: "", hq: "", website: "", companySize: "", usp: "", fundingStage: "",
//   investors: "", productLines: "", businessDescription: "", spocRecruiters: [],
//   status: "Active",
//   clientContact: { name: "", email: "", phone: "" },
//   contractType: "Retainer", feeStructure: "", contractStart: "", contractEnd: "",
//   totalPositions: 0, placements: 0, activePositions: 0, lastPlacementDate: "",
// };

// const industryOptions = ["IT Services", "BFSI", "Telecom", "Banking", "Consulting", "Healthcare", "E-commerce", "Manufacturing"];

// function ClientDetails() {
//   const [clients, setClients] = useState<Client[]>([]);
//   const [positionPerformanceData, setPositionPerformanceData] = useState<PositionPerformance[]>([]);
//   const [revenueData, setRevenueData] = useState<RevenueRow[]>([]);
//   const [recruiters, setRecruiters] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedClient, setSelectedClient] = useState<Client | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [detailTab, setDetailTab] = useState<"overview" | "contacts" | "contract" | "positions" | "revenue">("overview");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newClient, setNewClient] = useState<Omit<Client, "id">>(emptyClient);
//   const [industrySearch, setIndustrySearch] = useState("");
//   const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);

//   useEffect(() => {
//     Promise.all([
//       crmService.fetchClients(),
//       crmService.fetchPositionPerformance(),
//       crmService.fetchRevenue(),
//       crmService.fetchRecruiters(),
//     ])
//       .then(([clientsRes, perfRes, revenueRes, recruitersRes]) => {
//         setClients(clientsRes.data);
//         setPositionPerformanceData(perfRes.data);
//         setRevenueData(revenueRes.data);
//         setRecruiters(recruitersRes.data);
//       })
//       .catch((err) => console.error("Failed to load clients:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   const filteredClients = useMemo(() => {
//     return clients.filter((c) => {
//       const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.industry.toLowerCase().includes(searchTerm.toLowerCase());
//       return matchSearch;
//     });
//   }, [clients, searchTerm]);

//   const updateField = (field: string, value: string | string[]) => {
//     if (field.startsWith("clientContact.")) {
//       const key = field.split(".")[1] as keyof Client["clientContact"];
//       setNewClient((prev) => ({ ...prev, clientContact: { ...prev.clientContact, [key]: value as string } }));
//     } else {
//       setNewClient((prev) => ({ ...prev, [field]: value }));
//     }
//   };

//   const handleAddClient = async () => {
//     if (!newClient.name.trim()) return;
//     try {
//       const res = await crmService.createClient(newClient);
//       setClients((prev) => [...prev, res.data]);
//       setNewClient(emptyClient);
//       setShowAddModal(false);
//     } catch (err) {
//       console.error("Failed to add client:", err);
//       alert("Could not add the client. Try again.");
//     }
//   };

//   const handleAddSPOC = () => {
//     setNewClient((prev) => ({ ...prev, spocRecruiters: [...prev.spocRecruiters, ""] }));
//   };

//   const handleRemoveSPOC = (index: number) => {
//     setNewClient((prev) => ({
//       ...prev,
//       spocRecruiters: prev.spocRecruiters.filter((_, i) => i !== index),
//     }));
//   };

//   const handleUpdateSPOC = (index: number, value: string) => {
//     setNewClient((prev) => {
//       const updated = [...prev.spocRecruiters];
//       updated[index] = value;
//       return { ...prev, spocRecruiters: updated };
//     });
//   };

//   const inputClass = "w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500";
//   const labelClass = "block text-xs font-medium text-gray-500 mb-1";

//   if (selectedClient) {
//     const c = selectedClient;
//     const tabs: { key: typeof detailTab; label: string }[] = [
//       { key: "overview", label: "Overview" },
//       { key: "contacts", label: "Contacts" },
//       { key: "contract", label: "Contract" },
//       { key: "positions", label: "Positions" },
//       { key: "revenue", label: "Revenue" },
//     ];

//     // Get positions for this client
//     const clientPositions = positionPerformanceData.filter((p) => p.client === c.name);

//     // Get revenue for this client
//     const clientRevenue = revenueData.find((r) => r.client === c.name);

//     return (
//       <div className="space-y-6">
//         <button
//           onClick={() => { setSelectedClient(null); setDetailTab("overview"); }}
//           className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-1"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//           Back to Client List
//         </button>

//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex items-start gap-4">
//               <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center text-teal-700 font-bold text-lg">
//                 {c.name.split(" ").map((w) => w[0]).join("").slice(0, 3)}
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center gap-3">
//                   <h2 className="text-xl font-semibold text-gray-800">{c.name}</h2>
//                   <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(c.status)}`}>{c.status}</span>
//                 </div>
//                 <p className="text-sm text-gray-500 mt-1">{c.industry} &middot; {c.hq} &middot; {c.companySize} employees</p>
//                 <p className="text-xs text-gray-400 mt-1">{c.website}</p>
//               </div>
//               <span className="px-3 py-1 text-xs font-medium rounded-full bg-teal-50 text-teal-700">{c.fundingStage}</span>
//             </div>
//           </div>

//           <div className="border-b border-gray-200 px-6">
//             <div className="flex gap-0">
//               {tabs.map((t) => (
//                 <button
//                   key={t.key}
//                   onClick={() => setDetailTab(t.key)}
//                   className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
//                     detailTab === t.key
//                       ? "border-teal-600 text-teal-600"
//                       : "border-transparent text-gray-500 hover:text-gray-700"
//                   }`}
//                 >
//                   {t.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="p-6">
//             {detailTab === "overview" && (
//               <div className="space-y-5">
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 mb-1">USP & Positioning</h4>
//                   <p className="text-sm text-gray-800">{c.usp}</p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 mb-1">Business Description</h4>
//                   <p className="text-sm text-gray-800">{c.businessDescription}</p>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-500 mb-1">Product Lines</h4>
//                     <p className="text-sm text-gray-800">{c.productLines}</p>
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-500 mb-1">Investors</h4>
//                     <p className="text-sm text-gray-800">{c.investors}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {detailTab === "contacts" && (
//               <div className="space-y-5">
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 mb-3">SPOC Recruiters</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {c.spocRecruiters.map((recruiter, idx) => (
//                       <span key={idx} className="px-3 py-1 text-sm bg-teal-50 text-teal-700 rounded-full font-medium">
//                         {recruiter}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <h4 className="text-sm font-medium text-gray-500 mb-3">Client-side Contact</h4>
//                   <p className="text-sm font-semibold text-gray-800">{c.clientContact.name}</p>
//                   <p className="text-xs text-gray-500 mt-1">{c.clientContact.email}</p>
//                   <p className="text-xs text-gray-500">{c.clientContact.phone}</p>
//                 </div>
//               </div>
//             )}

//             {detailTab === "contract" && (
//               <div className="space-y-5">
//                 <div className="grid grid-cols-3 gap-4">
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="text-xs font-medium text-gray-400 mb-1">Contract Type</h4>
//                     <p className="text-sm font-semibold text-gray-800">{c.contractType}</p>
//                   </div>
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="text-xs font-medium text-gray-400 mb-1">Fee Structure</h4>
//                     <p className="text-sm font-semibold text-gray-800">{c.feeStructure}</p>
//                   </div>
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="text-xs font-medium text-gray-400 mb-1">Contract Period</h4>
//                     <p className="text-sm font-semibold text-gray-800">{c.contractStart} to {c.contractEnd}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {detailTab === "positions" && (
//               <div className="space-y-4">
//                 {clientPositions.length === 0 ? (
//                   <p className="text-sm text-gray-500">No positions data available.</p>
//                 ) : (
//                   <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                     <div className="overflow-x-auto">
//                       <table className="w-full text-sm">
//                         <thead>
//                           <tr className="border-b border-gray-200 bg-gray-50">
//                             <th className="text-left py-2 px-4 text-xs font-semibold text-gray-600">Position</th>
//                             <th className="text-center py-2 px-4 text-xs font-semibold text-gray-600">Submitted</th>
//                             <th className="text-center py-2 px-4 text-xs font-semibold text-gray-600">Pipeline</th>
//                             <th className="text-center py-2 px-4 text-xs font-semibold text-gray-600">Offered</th>
//                             <th className="text-center py-2 px-4 text-xs font-semibold text-gray-600">Joined</th>
//                             <th className="text-center py-2 px-4 text-xs font-semibold text-gray-600">Fill Rate</th>
//                             <th className="text-left py-2 px-4 text-xs font-semibold text-gray-600">Time to Fill</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {clientPositions.map((pos, idx) => (
//                             <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
//                               <td className="py-2 px-4 text-sm font-medium text-gray-800">{pos.position}</td>
//                               <td className="py-2 px-4 text-center text-sm text-gray-700">{pos.submitted}</td>
//                               <td className="py-2 px-4 text-center text-sm text-gray-700">{pos.shortlisted}</td>
//                               <td className="py-2 px-4 text-center text-sm text-gray-700">{pos.offered}</td>
//                               <td className="py-2 px-4 text-center text-sm text-gray-700">{pos.joined}</td>
//                               <td className="py-2 px-4 text-center">
//                                 <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
//                                   pos.fillRate === "100%" ? "bg-green-100 text-green-800"
//                                     : pos.fillRate === "0%" ? "bg-red-100 text-red-800"
//                                     : "bg-yellow-100 text-yellow-800"
//                                 }`}>
//                                   {pos.fillRate}
//                                 </span>
//                               </td>
//                               <td className="py-2 px-4 text-xs text-gray-500">{pos.timeToFill}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {detailTab === "revenue" && (
//               <div className="space-y-6">
//                 {!clientRevenue ? (
//                   <p className="text-sm text-gray-500">No revenue data available for this client.</p>
//                 ) : (
//                   <>
//                     {/* Revenue Summary Cards */}
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
//                         <p className="text-xs text-gray-500 mb-1">Billed Amount</p>
//                         <p className="text-2xl font-bold text-gray-800">{formatINR(clientRevenue.billedAmount)}</p>
//                         <p className="text-xs text-gray-400 mt-1">Total revenue billed</p>
//                       </div>
//                       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
//                         <p className="text-xs text-gray-500 mb-1">Outstanding Receivables</p>
//                         <p className="text-2xl font-bold text-red-600">{formatINR(clientRevenue.outstanding)}</p>
//                         <p className="text-xs text-gray-400 mt-1">{((clientRevenue.outstanding / clientRevenue.billedAmount) * 100).toFixed(1)}% of billed</p>
//                       </div>
//                       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
//                         <p className="text-xs text-gray-500 mb-1">Avg Fee / Placement</p>
//                         <p className="text-2xl font-bold text-gray-800">
//                           {clientRevenue.placementsThisPeriod > 0
//                             ? formatINR(Math.round(clientRevenue.billedAmount / clientRevenue.placementsThisPeriod))
//                             : formatINR(0)
//                           }
//                         </p>
//                         <p className="text-xs text-gray-400 mt-1">{clientRevenue.placementsThisPeriod} placements</p>
//                       </div>
//                       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
//                         <p className="text-xs text-gray-500 mb-1">Collected</p>
//                         <p className="text-2xl font-bold text-green-700">
//                           {formatINR(clientRevenue.billedAmount - clientRevenue.outstanding)}
//                         </p>
//                         <p className="text-xs text-green-600 mt-1">
//                           {((((clientRevenue.billedAmount - clientRevenue.outstanding) / clientRevenue.billedAmount) * 100) || 0).toFixed(1)}% collected
//                         </p>
//                       </div>
//                     </div>

//                     {/* Additional Details */}
//                     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
//                       <div className="grid grid-cols-3 gap-4">
//                         <div>
//                           <h4 className="text-sm font-medium text-gray-500 mb-2">Fee Type</h4>
//                           <p className="text-sm font-semibold text-gray-800">{clientRevenue.feeType}</p>
//                         </div>
//                         <div>
//                           <h4 className="text-sm font-medium text-gray-500 mb-2">Invoice Status</h4>
//                           <span className={`px-3 py-1 text-xs font-medium rounded ${getInvoiceBadgeClass(clientRevenue.invoiceStatus)}`}>
//                             {clientRevenue.invoiceStatus}
//                           </span>
//                         </div>
//                         <div>
//                           <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Date</h4>
//                           <p className="text-sm font-semibold text-gray-800">{clientRevenue.paymentDate}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-semibold text-gray-800">Client Directory</h3>
//         <button
//           onClick={() => setShowAddModal(true)}
//           className="px-4 py-2 text-xs font-semibold rounded-md bg-teal-600 text-white hover:bg-teal-700"
//         >
//           + Add Client
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//         <div className="flex flex-wrap gap-3">
//           <input
//             type="text"
//             placeholder="Search clients by name or industry..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="flex-1 min-w-[300px] rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
//           />
//         </div>
//       </div>

//       {/* ── TABLE LAYOUT FOR CLIENTS ── */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-200 bg-gray-50">
//                 <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Client Name</th>
//                 <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Industry</th>
//                 <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">HQ</th>
//                 <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Contract Type</th>
//                 <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600">Positions</th>
//                 <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600">Placed</th>
//                 <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600">Active</th>
//                 <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">SPOC</th>
//                 <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600">Status</th>
//                 <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredClients.map((client) => (
//                 <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
//                   <td className="py-3 px-4 text-sm font-medium text-gray-800">{client.name}</td>
//                   <td className="py-3 px-4 text-sm text-gray-700">{client.industry}</td>
//                   <td className="py-3 px-4 text-sm text-gray-700">{client.hq}</td>
//                   <td className="py-3 px-4 text-sm text-gray-700">{client.contractType}</td>
//                   <td className="py-3 px-4 text-center text-sm text-gray-700">{client.totalPositions}</td>
//                   <td className="py-3 px-4 text-center text-sm font-semibold text-green-700">{client.placements}</td>
//                   <td className="py-3 px-4 text-center text-sm font-semibold text-blue-700">{client.activePositions}</td>
//                   <td className="py-3 px-4 text-sm text-gray-700">{client.spocRecruiters.join(", ")}</td>
//                   <td className="py-3 px-4 text-center">
//                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(client.status)}`}>
//                       {client.status}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 text-center">
//                     <button
//                       onClick={() => setSelectedClient(client)}
//                       className="px-3 py-1 text-xs font-medium rounded-md bg-teal-50 text-teal-700 hover:bg-teal-100"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {loading && (
//           <div className="p-8 text-center">
//             <p className="text-sm text-gray-500">Loading clients...</p>
//           </div>
//         )}
//         {!loading && filteredClients.length === 0 && (
//           <div className="p-8 text-center">
//             <p className="text-sm text-gray-500">No clients match your search.</p>
//           </div>
//         )}
//       </div>

//       {/* ── Add Client Modal ── */}
//       {showAddModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto mx-4">
//             <div className="flex items-center justify-between p-6 border-b border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-800">Add New Client</h3>
//               <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
//             </div>

//             <div className="p-6 space-y-6">
//               {/* Company Identity */}
//               <div>
//                 <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
//                   Company Identity
//                 </h4>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Company Name *</label>
//                     <input type="text" value={newClient.name} onChange={(e) => updateField("name", e.target.value)} className={inputClass} placeholder="e.g. Infosys" />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Industry (Searchable) *</label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         value={industrySearch}
//                         onChange={(e) => setIndustrySearch(e.target.value)}
//                         onFocus={() => setShowIndustryDropdown(true)}
//                         placeholder="Search industry..."
//                         className={inputClass}
//                       />
//                       {showIndustryDropdown && (
//                         <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
//                           {industryOptions
//                             .filter((ind) => ind.toLowerCase().includes(industrySearch.toLowerCase()))
//                             .map((ind) => (
//                               <button
//                                 key={ind}
//                                 onClick={() => {
//                                   setIndustrySearch("");
//                                   updateField("industry", ind);
//                                   setShowIndustryDropdown(false);
//                                 }}
//                                 className="w-full text-left px-3 py-2 hover:bg-teal-50 text-sm text-gray-700"
//                               >
//                                 {ind}
//                               </button>
//                             ))}
//                         </div>
//                       )}
//                     </div>
//                     {newClient.industry && <p className="text-xs text-teal-600 mt-1">Selected: {newClient.industry}</p>}
//                   </div>
//                   <div>
//                     <label className={labelClass}>Headquarters</label>
//                     <input type="text" value={newClient.hq} onChange={(e) => updateField("hq", e.target.value)} className={inputClass} placeholder="e.g. Bangalore" />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Website</label>
//                     <input type="text" value={newClient.website} onChange={(e) => updateField("website", e.target.value)} className={inputClass} placeholder="e.g. www.infosys.com" />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Company Size</label>
//                     <input type="text" value={newClient.companySize} onChange={(e) => updateField("companySize", e.target.value)} className={inputClass} placeholder="e.g. 300,000+" />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Funding Stage</label>
//                     <select value={newClient.fundingStage} onChange={(e) => updateField("fundingStage", e.target.value)} className={inputClass}>
//                       <option value="">Select...</option>
//                       <option>Bootstrapped</option><option>Seed</option><option>Series A</option><option>Series B</option>
//                       <option>Series C</option><option>Series D</option><option>Series E+</option><option>Public</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Status</label>
//                     <select value={newClient.status} onChange={(e) => updateField("status", e.target.value)} className={inputClass}>
//                       <option value="Active">Active</option>
//                       <option value="Inactive">Inactive</option>
//                       <option value="New">New</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* USP & Business */}
//               <div>
//                 <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
//                   USP &amp; Business
//                 </h4>
//                 <div className="space-y-4">
//                   <div>
//                     <label className={labelClass}>USP &amp; Positioning</label>
//                     <textarea value={newClient.usp} onChange={(e) => updateField("usp", e.target.value)} rows={2} className={inputClass} placeholder="What makes this client attractive to candidates?" />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Business Description</label>
//                     <textarea value={newClient.businessDescription} onChange={(e) => updateField("businessDescription", e.target.value)} rows={2} className={inputClass} placeholder="What the company does — product lines, services, verticals" />
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className={labelClass}>Product Lines</label>
//                       <input type="text" value={newClient.productLines} onChange={(e) => updateField("productLines", e.target.value)} className={inputClass} placeholder="e.g. Finacle, EdgeVerve" />
//                     </div>
//                     <div>
//                       <label className={labelClass}>Key Investors</label>
//                       <input type="text" value={newClient.investors} onChange={(e) => updateField("investors", e.target.value)} className={inputClass} placeholder="e.g. Promoter holding ~15%" />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Hiring Relationship */}
//               <div>
//                 <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
//                   Hiring Relationship
//                 </h4>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="col-span-2">
//                     <label className={labelClass}>SPOC Recruiters</label>
//                     <div className="space-y-2">
//                       {newClient.spocRecruiters.map((recruiter, idx) => (
//                         <div key={idx} className="flex gap-2">
//                           <select
//                             value={recruiter}
//                             onChange={(e) => handleUpdateSPOC(idx, e.target.value)}
//                             className={`${inputClass} flex-1`}
//                           >
//                             <option value="">Select Recruiter...</option>
//                             {recruiters.map((r) => <option key={r} value={r}>{r}</option>)}
//                           </select>
//                           <button
//                             onClick={() => handleRemoveSPOC(idx)}
//                             className="px-3 py-2 text-xs font-medium rounded-md border border-red-300 text-red-600 hover:bg-red-50"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ))}
//                       <button
//                         onClick={handleAddSPOC}
//                         className="px-3 py-2 text-xs font-medium rounded-md border border-teal-300 text-teal-600 hover:bg-teal-50"
//                       >
//                         + Add Another Recruiter
//                       </button>
//                     </div>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Contract Type</label>
//                     <select value={newClient.contractType} onChange={(e) => updateField("contractType", e.target.value)} className={inputClass}>
//                       <option>Retainer</option><option>Contingency</option><option>RPO</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Fee Structure</label>
//                     <input type="text" value={newClient.feeStructure} onChange={(e) => updateField("feeStructure", e.target.value)} className={inputClass} placeholder="e.g. 8.33% of Annual CTC" />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Contract Start</label>
//                     <input type="date" value={newClient.contractStart} onChange={(e) => updateField("contractStart", e.target.value)} className={inputClass} />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Contract End</label>
//                     <input type="date" value={newClient.contractEnd} onChange={(e) => updateField("contractEnd", e.target.value)} className={inputClass} />
//                   </div>
//                 </div>
//               </div>

//               {/* Engagement Metrics */}
//               <div>
//                 <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
//                   Engagement Metrics
//                 </h4>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Total Positions</label>
//                     <input type="number" min={0} value={newClient.totalPositions} onChange={(e) => setNewClient((prev) => ({ ...prev, totalPositions: Number(e.target.value) || 0 }))} className={inputClass} placeholder="e.g. 12" />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Placements</label>
//                     <input type="number" min={0} value={newClient.placements} onChange={(e) => setNewClient((prev) => ({ ...prev, placements: Number(e.target.value) || 0 }))} className={inputClass} placeholder="e.g. 8" />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Active Positions</label>
//                     <input type="number" min={0} value={newClient.activePositions} onChange={(e) => setNewClient((prev) => ({ ...prev, activePositions: Number(e.target.value) || 0 }))} className={inputClass} placeholder="e.g. 4" />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Last Placement Date</label>
//                     <input type="date" value={newClient.lastPlacementDate} onChange={(e) => updateField("lastPlacementDate", e.target.value)} className={inputClass} />
//                   </div>
//                 </div>
//               </div>

//               {/* Client-side Contact */}
//               <div>
//                 <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
//                   Client-side Contact
//                 </h4>
//                 <div className="grid grid-cols-3 gap-4">
//                   <div>
//                     <label className={labelClass}>Contact Name</label>
//                     <input type="text" value={newClient.clientContact.name} onChange={(e) => updateField("clientContact.name", e.target.value)} className={inputClass} placeholder="e.g. Sunita Rao" />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Contact Email</label>
//                     <input type="email" value={newClient.clientContact.email} onChange={(e) => updateField("clientContact.email", e.target.value)} className={inputClass} placeholder="e.g. sunita@company.com" />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Contact Phone</label>
//                     <input type="tel" value={newClient.clientContact.phone} onChange={(e) => updateField("clientContact.phone", e.target.value)} className={inputClass} placeholder="e.g. +91-22-1234-5678" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
//               <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm font-medium rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddClient}
//                 disabled={!newClient.name.trim() || !newClient.industry}
//                 className="px-4 py-2 text-sm font-semibold rounded-md bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed"
//               >
//                 Add Client
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ---------- 2. Submission Sheet ----------

// const emptySubmission = {
//   candidateName: "", position: "", client: "", submittedBy: "", submissionDate: new Date().toISOString().split("T")[0],
//   approvalStatus: "Pending" as "Pending" | "Approved" | "Rejected",
//   approvedBy: "",
//   sharedWithClientDate: "",
//   clientFeedback: "Awaiting" as "Awaiting" | "Shortlisted" | "Interview Scheduled" | "Rejected" | "On Hold" | "Offer Stage",
//   currentStage: "Pending Approval",
// };

// function SubmissionSheet() {
//   const [submissions, setSubmissions] = useState<Submission[]>([]);
//   const [clientsData, setClientsData] = useState<Client[]>([]);
//   const [allRecruiters, setAllRecruiters] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterClient, setFilterClient] = useState("All");
//   const [filterApproval, setFilterApproval] = useState("All");
//   const [filterRecruiter, setFilterRecruiter] = useState("All");
//   const [showSubModal, setShowSubModal] = useState(false);
//   const [newSub, setNewSub] = useState(emptySubmission);

//   useEffect(() => {
//     Promise.all([
//       crmService.fetchSubmissions(),
//       crmService.fetchClients(),
//       crmService.fetchRecruiters(),
//     ])
//       .then(([subsRes, clientsRes, recruitersRes]) => {
//         setSubmissions(subsRes.data);
//         setClientsData(clientsRes.data);
//         setAllRecruiters(recruitersRes.data);
//       })
//       .catch((err) => console.error("Failed to load submissions:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   const clients = ["All", ...Array.from(new Set(submissions.map((s) => s.client)))];
//   const allClients = clientsData.map((c) => c.name);
//   const recruiters = ["All", ...Array.from(new Set(submissions.map((s) => s.submittedBy)))];
//   const approvalStatuses = ["All", "Pending", "Approved", "Rejected"];

//   const handleAddSubmission = async () => {
//     if (!newSub.candidateName.trim() || !newSub.position.trim() || !newSub.client || !newSub.submittedBy) return;
//     try {
//       const res = await crmService.createSubmission({
//         ...newSub,
//         lastUpdated: newSub.submissionDate,
//       });
//       setSubmissions((prev) => [res.data, ...prev]);
//       setNewSub(emptySubmission);
//       setShowSubModal(false);
//     } catch (err) {
//       console.error("Failed to add submission:", err);
//       alert("Could not add the submission. Try again.");
//     }
//   };

//   const pendingCount = submissions.filter((s) => s.approvalStatus === "Pending").length;

//   const filtered = useMemo(() => {
//     return submissions.filter((s) => {
//       const matchSearch = s.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) || s.position.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchClient = filterClient === "All" || s.client === filterClient;
//       const matchApproval = filterApproval === "All" || s.approvalStatus === filterApproval;
//       const matchRecruiter = filterRecruiter === "All" || s.submittedBy === filterRecruiter;
//       return matchSearch && matchClient && matchApproval && matchRecruiter;
//     });
//   }, [submissions, searchTerm, filterClient, filterApproval, filterRecruiter]);

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-semibold text-gray-800">Submission Sheet</h3>
//         <button
//           onClick={() => setShowSubModal(true)}
//           className="px-4 py-2 text-xs font-semibold rounded-md bg-teal-600 text-white hover:bg-teal-700"
//         >
//           + New Submission
//         </button>
//       </div>

//       {pendingCount > 0 && (
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
//           <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
//             <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//           </div>
//           <div>
//             <p className="text-sm font-medium text-yellow-800">{pendingCount} submission{pendingCount > 1 ? "s" : ""} pending approval</p>
//             <p className="text-xs text-yellow-600">Review and approve to share with clients</p>
//           </div>
//           <button
//             onClick={() => setFilterApproval("Pending")}
//             className="ml-auto px-3 py-1.5 text-xs font-medium rounded-md border border-yellow-300 text-yellow-700 hover:bg-yellow-100"
//           >
//             View Pending
//           </button>
//         </div>
//       )}

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//         <div className="flex flex-wrap gap-3">
//           <input
//             type="text"
//             placeholder="Search candidate or position..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="flex-1 min-w-[200px] rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
//           />
//           <select value={filterClient} onChange={(e) => setFilterClient(e.target.value)} className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500">
//             {clients.map((c) => <option key={c} value={c}>{c === "All" ? "All Clients" : c}</option>)}
//           </select>
//           <select value={filterApproval} onChange={(e) => setFilterApproval(e.target.value)} className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500">
//             {approvalStatuses.map((a) => <option key={a} value={a}>{a === "All" ? "All Statuses" : a}</option>)}
//           </select>
//           <select value={filterRecruiter} onChange={(e) => setFilterRecruiter(e.target.value)} className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500">
//             {recruiters.map((r) => <option key={r} value={r}>{r === "All" ? "All Recruiters" : r}</option>)}
//           </select>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-200">
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">ID</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Candidate</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Position</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Client</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Submitted By</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Date</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Approval</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Client Feedback</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Stage</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Updated</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((sub) => (
//                 <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50">
//                   <td className="py-3 px-4 text-xs font-mono text-gray-500">{sub.id}</td>
//                   <td className="py-3 px-4 text-sm font-medium text-gray-800">{sub.candidateName}</td>
//                   <td className="py-3 px-4 text-sm text-gray-700">{sub.position}</td>
//                   <td className="py-3 px-4 text-sm text-gray-700">{sub.client.length > 20 ? sub.client.slice(0, 20) + "..." : sub.client}</td>
//                   <td className="py-3 px-4 text-sm text-gray-500">{sub.submittedBy}</td>
//                   <td className="py-3 px-4 text-xs text-gray-500">{sub.submissionDate}</td>
//                   <td className="py-3 px-4">
//                     <span className={`px-2 py-1 text-xs font-medium rounded ${getApprovalBadgeClass(sub.approvalStatus)}`}>
//                       {sub.approvalStatus}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4">
//                     <span className={`px-2 py-1 text-xs font-medium rounded ${getFeedbackBadgeClass(sub.clientFeedback)}`}>
//                       {sub.clientFeedback}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 text-xs text-gray-500">{sub.currentStage}</td>
//                   <td className="py-3 px-4 text-xs text-gray-400">{sub.lastUpdated}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {loading && (
//           <div className="p-8 text-center">
//             <p className="text-sm text-gray-500">Loading submissions...</p>
//           </div>
//         )}
//         {!loading && filtered.length === 0 && (
//           <div className="p-8 text-center">
//             <p className="text-sm text-gray-500">No submissions match your filters.</p>
//           </div>
//         )}
//       </div>

//       {/* ── New Submission Modal ── */}
//       {showSubModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
//             <div className="flex items-center justify-between p-6 border-b border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-800">New Submission</h3>
//               <button onClick={() => setShowSubModal(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
//             </div>

//             <div className="p-6 space-y-6">
//               {/* Candidate & Position */}
//               <div>
//                 <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
//                   Candidate &amp; Position
//                 </h4>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Candidate Name *</label>
//                     <input
//                       type="text" value={newSub.candidateName}
//                       onChange={(e) => setNewSub((p) => ({ ...p, candidateName: e.target.value }))}
//                       className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
//                       placeholder="e.g. Arjun Reddy"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Position *</label>
//                     <input
//                       type="text" value={newSub.position}
//                       onChange={(e) => setNewSub((p) => ({ ...p, position: e.target.value }))}
//                       className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
//                       placeholder="e.g. VP Engineering"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Client *</label>
//                     <select
//                       value={newSub.client}
//                       onChange={(e) => setNewSub((p) => ({ ...p, client: e.target.value }))}
//                       className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
//                     >
//                       <option value="">Select Client...</option>
//                       {allClients.map((c) => <option key={c} value={c}>{c}</option>)}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Submitted By *</label>
//                     <select
//                       value={newSub.submittedBy}
//                       onChange={(e) => setNewSub((p) => ({ ...p, submittedBy: e.target.value }))}
//                       className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
//                     >
//                       <option value="">Select Recruiter...</option>
//                       {allRecruiters.map((r) => <option key={r} value={r}>{r}</option>)}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Submission Date</label>
//                     <input
//                       type="date" value={newSub.submissionDate}
//                       onChange={(e) => setNewSub((p) => ({ ...p, submissionDate: e.target.value }))}
//                       className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Approval & Tracking */}
//               <div>
//                 <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
//                   Approval &amp; Tracking
//                 </h4>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Approval Status</label>
//                     <select
//                       value={newSub.approvalStatus}
//                       onChange={(e) => setNewSub((p) => ({ ...p, approvalStatus: e.target.value as "Pending" | "Approved" | "Rejected" }))}
//                       className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
//                     >
//                       <option>Pending</option><option>Approved</option><option>Rejected</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Approved By</label>
//                     <select
//                       value={newSub.approvedBy}
//                       onChange={(e) => setNewSub((p) => ({ ...p, approvedBy: e.target.value }))}
//                       className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
//                     >
//                       <option value="">Select Approver...</option>
//                       {allRecruiters.map((r) => <option key={r} value={r}>{r}</option>)}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Shared With Client Date</label>
//                     <input
//                       type="date" value={newSub.sharedWithClientDate}
//                       onChange={(e) => setNewSub((p) => ({ ...p, sharedWithClientDate: e.target.value }))}
//                       className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Client Feedback</label>
//                     <select
//                       value={newSub.clientFeedback}
//                       onChange={(e) => setNewSub((p) => ({ ...p, clientFeedback: e.target.value as "Awaiting" | "Shortlisted" | "Interview Scheduled" | "Rejected" | "On Hold" | "Offer Stage" }))}
//                       className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
//                     >
//                       <option>Awaiting</option><option>Shortlisted</option><option>Interview Scheduled</option><option>Rejected</option><option>On Hold</option><option>Offer Stage</option>
//                     </select>
//                   </div>
//                   <div className="col-span-2">
//                     <label className="block text-xs font-medium text-gray-500 mb-1">Current Stage</label>
//                     <input
//                       type="text" value={newSub.currentStage}
//                       onChange={(e) => setNewSub((p) => ({ ...p, currentStage: e.target.value }))}
//                       className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
//                       placeholder="e.g. Technical Round, HR Discussion"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
//               <button onClick={() => setShowSubModal(false)} className="px-4 py-2 text-sm font-medium rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddSubmission}
//                 disabled={!newSub.candidateName.trim() || !newSub.position.trim() || !newSub.client || !newSub.submittedBy}
//                 className="px-4 py-2 text-sm font-semibold rounded-md bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ---------- 3. Revenue Data ----------

// function RevenueData() {
//   const [viewPeriod, setViewPeriod] = useState<"Monthly" | "Quarterly" | "Annual">("Monthly");
//   const [revenueData, setRevenueData] = useState<RevenueRow[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     crmService
//       .fetchRevenue()
//       .then((res) => setRevenueData(res.data))
//       .catch((err) => console.error("Failed to load revenue:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return <p className="text-sm text-gray-500 p-6">Loading revenue...</p>;
//   }

//   const totalBilled = revenueData.reduce((a, r) => a + r.billedAmount, 0);
//   const totalPaid = revenueData.reduce((a, r) => a + (r.billedAmount - r.outstanding), 0);
//   const totalOutstanding = revenueData.reduce((a, r) => a + r.outstanding, 0);
//   const totalPlacements = revenueData.reduce((a, r) => a + r.placementsThisPeriod, 0);
//   const avgFeePerPlacement = totalPlacements > 0 ? totalBilled / totalPlacements : 0;

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-semibold text-gray-800">Revenue Data</h3>
//         <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
//           {(["Monthly", "Quarterly", "Annual"] as const).map((period) => (
//             <button
//               key={period}
//               onClick={() => setViewPeriod(period)}
//               className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
//                 viewPeriod === period
//                   ? "bg-white text-gray-800 shadow-sm"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               {period}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
//           <p className="text-xs text-gray-500 mb-1">Total Revenue (YTD)</p>
//           <p className="text-2xl font-bold text-gray-800">{formatINR(totalBilled)}</p>
//           <p className="text-xs text-green-600 mt-1">+12% vs last period</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
//           <p className="text-xs text-gray-500 mb-1">Outstanding Receivables</p>
//           <p className="text-2xl font-bold text-red-600">{formatINR(totalOutstanding)}</p>
//           <p className="text-xs text-gray-400 mt-1">{totalBilled > 0 ? ((totalOutstanding / totalBilled) * 100).toFixed(1) : "0.0"}% of billed</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
//           <p className="text-xs text-gray-500 mb-1">Avg Fee / Placement</p>
//           <p className="text-2xl font-bold text-gray-800">{formatINR(Math.round(avgFeePerPlacement))}</p>
//           <p className="text-xs text-gray-400 mt-1">{totalPlacements} placements total</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
//           <p className="text-xs text-gray-500 mb-1">Collected</p>
//           <p className="text-2xl font-bold text-green-700">{formatINR(totalPaid)}</p>
//           <p className="text-xs text-green-600 mt-1">{totalBilled > 0 ? ((totalPaid / totalBilled) * 100).toFixed(1) : "0.0"}% collected</p>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <div className="p-4 border-b border-gray-200">
//           <h4 className="text-sm font-semibold text-gray-800">Client-wise Revenue Breakdown ({viewPeriod})</h4>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-200">
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Client</th>
//                 <th className="text-center py-2 px-4 text-sm font-medium text-gray-600">Placements</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Fee Type</th>
//                 <th className="text-right py-2 px-4 text-sm font-medium text-gray-600">Billed</th>
//                 <th className="text-center py-2 px-4 text-sm font-medium text-gray-600">Invoice Status</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Payment Date</th>
//                 <th className="text-right py-2 px-4 text-sm font-medium text-gray-600">Outstanding</th>
//               </tr>
//             </thead>
//             <tbody>
//               {revenueData.map((row) => (
//                 <tr key={row.client} className="border-b border-gray-100 hover:bg-gray-50">
//                   <td className="py-3 px-4 text-sm font-medium text-gray-800">{row.client.length > 25 ? row.client.slice(0, 25) + "..." : row.client}</td>
//                   <td className="py-3 px-4 text-center text-sm text-gray-700">{row.placementsThisPeriod}</td>
//                   <td className="py-3 px-4 text-xs text-gray-500">{row.feeType}</td>
//                   <td className="py-3 px-4 text-right text-sm font-medium text-gray-800">{formatINR(row.billedAmount)}</td>
//                   <td className="py-3 px-4 text-center">
//                     <span className={`px-2 py-1 text-xs font-medium rounded ${getInvoiceBadgeClass(row.invoiceStatus)}`}>
//                       {row.invoiceStatus}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 text-xs text-gray-500">{row.paymentDate}</td>
//                   <td className="py-3 px-4 text-right text-sm font-medium">
//                     <span className={row.outstanding > 0 ? "text-red-600" : "text-green-600"}>
//                       {row.outstanding > 0 ? formatINR(row.outstanding) : "Nil"}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//             <tfoot>
//               <tr className="border-t-2 border-gray-200 bg-gray-50">
//                 <td className="py-3 px-4 text-sm font-semibold text-gray-800">Total</td>
//                 <td className="py-3 px-4 text-center text-sm font-bold text-gray-800">{totalPlacements}</td>
//                 <td className="py-3 px-4"></td>
//                 <td className="py-3 px-4 text-right text-sm font-bold text-gray-800">{formatINR(totalBilled)}</td>
//                 <td className="py-3 px-4"></td>
//                 <td className="py-3 px-4"></td>
//                 <td className="py-3 px-4 text-right text-sm font-bold text-red-600">{formatINR(totalOutstanding)}</td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ---------- 4. Offer Dashboard ----------

// function OfferDashboard() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [filterClient, setFilterClient] = useState("All");
//   const [offersData, setOffersData] = useState<Offer[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     crmService
//       .fetchOffers()
//       .then((res) => setOffersData(res.data))
//       .catch((err) => console.error("Failed to load offers:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   const offerStatuses = ["All", "Extended", "Negotiation", "Accepted", "Declined", "Revoked", "Ghosted"];
//   const clients = ["All", ...Array.from(new Set(offersData.map((o) => o.client)))];

//   const totalOffers = offersData.length;
//   const accepted = offersData.filter((o) => o.status === "Accepted").length;
//   const declined = offersData.filter((o) => o.status === "Declined").length;
//   const pending = offersData.filter((o) => o.status === "Extended" || o.status === "Negotiation").length;
//   const joinConfirmed = offersData.filter((o) => o.joiningConfirmed).length;
//   const offerToJoinRate = totalOffers > 0 ? ((joinConfirmed / totalOffers) * 100).toFixed(0) : "0";

//   const filtered = useMemo(() => {
//     return offersData.filter((o) => {
//       const matchSearch = o.candidate.toLowerCase().includes(searchTerm.toLowerCase()) || o.position.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchStatus = filterStatus === "All" || o.status === filterStatus;
//       const matchClient = filterClient === "All" || o.client === filterClient;
//       return matchSearch && matchStatus && matchClient;
//     });
//   }, [offersData, searchTerm, filterStatus, filterClient]);

//   return (
//     <div className="space-y-6">
//       <h3 className="text-lg font-semibold text-gray-800">Offer Dashboard</h3>

//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
//           <p className="text-2xl font-bold text-gray-800">{totalOffers}</p>
//           <p className="text-xs text-gray-500 mt-1">Total Offers</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
//           <p className="text-2xl font-bold text-green-700">{accepted}</p>
//           <p className="text-xs text-gray-500 mt-1">Accepted</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
//           <p className="text-2xl font-bold text-red-600">{declined}</p>
//           <p className="text-xs text-gray-500 mt-1">Declined</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
//           <p className="text-2xl font-bold text-yellow-600">{pending}</p>
//           <p className="text-xs text-gray-500 mt-1">Pending</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
//           <p className="text-2xl font-bold text-teal-600">{offerToJoinRate}%</p>
//           <p className="text-xs text-gray-500 mt-1">Offer-to-Join</p>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//         <div className="flex flex-wrap gap-3">
//           <input
//             type="text"
//             placeholder="Search candidate or position..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="flex-1 min-w-[200px] rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
//           />
//           <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500">
//             {offerStatuses.map((s) => <option key={s} value={s}>{s === "All" ? "All Statuses" : s}</option>)}
//           </select>
//           <select value={filterClient} onChange={(e) => setFilterClient(e.target.value)} className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500">
//             {clients.map((c) => <option key={c} value={c}>{c === "All" ? "All Clients" : c}</option>)}
//           </select>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-200">
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Candidate</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Position</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Client</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Offer Date</th>
//                 <th className="text-right py-2 px-4 text-sm font-medium text-gray-600">Offered CTC</th>
//                 <th className="text-right py-2 px-4 text-sm font-medium text-gray-600">Current CTC</th>
//                 <th className="text-center py-2 px-4 text-sm font-medium text-gray-600">Hike %</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Notice</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Exp. Joining</th>
//                 <th className="text-center py-2 px-4 text-sm font-medium text-gray-600">Status</th>
//                 <th className="text-center py-2 px-4 text-sm font-medium text-gray-600">Confirmed</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((offer) => (
//                 <tr key={offer.id} className="border-b border-gray-100 hover:bg-gray-50">
//                   <td className="py-3 px-4 text-sm font-medium text-gray-800">{offer.candidate}</td>
//                   <td className="py-3 px-4 text-sm text-gray-700">{offer.position}</td>
//                   <td className="py-3 px-4 text-sm text-gray-700">{offer.client.length > 20 ? offer.client.slice(0, 20) + "..." : offer.client}</td>
//                   <td className="py-3 px-4 text-xs text-gray-500">{offer.offerDate}</td>
//                   <td className="py-3 px-4 text-right text-sm font-medium text-gray-800">{formatINR(offer.offeredCTC)}</td>
//                   <td className="py-3 px-4 text-right text-sm text-gray-500">{formatINR(offer.currentCTC)}</td>
//                   <td className="py-3 px-4 text-center">
//                     <span className="px-2 py-0.5 text-xs font-semibold rounded bg-green-50 text-green-700">{offer.hikePercent}%</span>
//                   </td>
//                   <td className="py-3 px-4 text-xs text-gray-500">{offer.noticePeriod}</td>
//                   <td className="py-3 px-4 text-xs text-gray-500">{offer.expectedJoining}</td>
//                   <td className="py-3 px-4 text-center">
//                     <span className={`px-2 py-1 text-xs font-medium rounded ${getOfferStatusBadgeClass(offer.status)}`}>
//                       {offer.status}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 text-center">
//                     {offer.joiningConfirmed ? (
//                       <span className="text-green-600 font-bold text-sm">Yes</span>
//                     ) : (
//                       <span className="text-gray-400 text-sm">--</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {loading && (
//           <div className="p-8 text-center">
//             <p className="text-sm text-gray-500">Loading offers...</p>
//           </div>
//         )}
//         {!loading && filtered.length === 0 && (
//           <div className="p-8 text-center">
//             <p className="text-sm text-gray-500">No offers match your filters.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── Main Component ──────────────────────────────────────────────────────────

// export default function CRMModule() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const path = location.pathname.replace(/\/+$/, "");
//   const section = path === "/crm" ? "clients"
//     : path === "/crm/submissions" ? "submissions"
//     : path === "/crm/revenue" ? "revenue"
//     : path === "/crm/offers" ? "offers"
//     : "clients";

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <div className="p-6 space-y-6 max-w-7xl mx-auto">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">CRM Module</h1>
//             <p className="text-sm text-gray-500 mt-1">TrueKarma Recruitment &mdash; Client Relationship Management</p>
//           </div>
//         </div>

//         {section === "clients" && <ClientDetails />}
//         {section === "submissions" && <SubmissionSheet />}
//         {section === "revenue" && <RevenueData />}
//         {section === "offers" && <OfferDashboard />}
//       </div>
//     </div>
//   );
// }



















// import { useState, useMemo, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import Header from "../components/Header";
// import AddClientModal from "../components/clients/AddClientModal";
// import FilterSelect from "../components/FilterSelect";
// import { crmService } from "../services/crmService";
// import type {
//   Client,
//   RevenueRow,
//   Offer,
//   PositionPerformance,
// } from "../types/crm";

// // ─── Utility Helpers ─────────────────────────────────────────────────────────

// function formatINR(amount: number): string {
//   if (amount >= 100000) {
//     return `${(amount / 100000).toFixed(1)}L`;
//   }
//   return new Intl.NumberFormat("en-IN").format(amount);
// }

// function getInvoiceBadgeClass(status: string): string {
//   switch (status) {
//     case "Paid": return "bg-green-100 text-green-800";
//     case "Sent": return "bg-blue-100 text-blue-800";
//     case "Drafted": return "bg-gray-100 text-gray-600";
//     case "Overdue": return "bg-red-100 text-red-800";
//     default: return "bg-gray-100 text-gray-600";
//   }
// }

// function getOfferStatusBadgeClass(status: string): string {
//   switch (status) {
//     case "Accepted": return "bg-green-100 text-green-800";
//     case "Negotiation": return "bg-yellow-100 text-yellow-800";
//     case "Extended": return "bg-blue-100 text-blue-800";
//     case "Declined": return "bg-red-100 text-red-800";
//     case "Revoked": return "bg-red-100 text-red-800";
//     case "Ghosted": return "bg-gray-100 text-gray-600";
//     default: return "bg-gray-100 text-gray-600";
//   }
// }

// function getStatusBadgeClass(status: string): string {
//   switch (status) {
//     case "Active": return "bg-green-100 text-green-800";
//     case "Inactive": return "bg-gray-100 text-gray-600";
//     case "New": return "bg-blue-100 text-blue-800";
//     default: return "bg-gray-100 text-gray-600";
//   }
// }

// // ─── Sub-Components ──────────────────────────────────────────────────────────

// // ---------- 1. Client Details ----------

// function ClientDetails() {
//   const [clients, setClients] = useState<Client[]>([]);
//   const [positionPerformanceData, setPositionPerformanceData] = useState<PositionPerformance[]>([]);
//   const [revenueData, setRevenueData] = useState<RevenueRow[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedClient, setSelectedClient] = useState<Client | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [detailTab, setDetailTab] = useState<"overview" | "contacts" | "contract" | "positions" | "revenue">("overview");
//   const [showAddModal, setShowAddModal] = useState(false);

//   useEffect(() => {
//     Promise.all([
//       crmService.fetchClients(),
//       crmService.fetchPositionPerformance(),
//       crmService.fetchRevenue(),
//     ])
//       .then(([clientsRes, perfRes, revenueRes]) => {
//         setClients(clientsRes.data);
//         setPositionPerformanceData(perfRes.data);
//         setRevenueData(revenueRes.data);
//       })
//       .catch((err) => console.error("Failed to load clients:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   const filteredClients = useMemo(() => {
//     return clients.filter((c) => {
//       const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.industry.toLowerCase().includes(searchTerm.toLowerCase());
//       return matchSearch;
//     });
//   }, [clients, searchTerm]);

//   if (selectedClient) {
//     const c = selectedClient;
//     const tabs: { key: typeof detailTab; label: string }[] = [
//       { key: "overview", label: "Overview" },
//       { key: "contacts", label: "Contacts" },
//       { key: "contract", label: "Contract" },
//       { key: "positions", label: "Positions" },
//       { key: "revenue", label: "Revenue" },
//     ];

//     // Get positions for this client
//     const clientPositions = positionPerformanceData.filter((p) => p.client === c.name);

//     // Get revenue for this client
//     const clientRevenue = revenueData.find((r) => r.client === c.name);

//     return (
//       <div className="space-y-6">
//         <button
//           onClick={() => { setSelectedClient(null); setDetailTab("overview"); }}
//           className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-1"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//           Back to Client List
//         </button>

//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex items-start gap-4">
//               <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center text-teal-700 font-bold text-lg">
//                 {c.name.split(" ").map((w) => w[0]).join("").slice(0, 3)}
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center gap-3">
//                   <h2 className="text-xl font-semibold text-gray-800">{c.name}</h2>
//                   <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(c.status)}`}>{c.status}</span>
//                 </div>
//                 <p className="text-sm text-gray-500 mt-1">{c.industry} &middot; {c.hq} &middot; {c.companySize} employees</p>
//                 <p className="text-xs text-gray-400 mt-1">{c.website}</p>
//               </div>
//               <span className="px-3 py-1 text-xs font-medium rounded-full bg-teal-50 text-teal-700">{c.fundingStage}</span>
//             </div>
//           </div>

//           <div className="border-b border-gray-200 px-6">
//             <div className="flex gap-0">
//               {tabs.map((t) => (
//                 <button
//                   key={t.key}
//                   onClick={() => setDetailTab(t.key)}
//                   className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
//                     detailTab === t.key
//                       ? "border-teal-600 text-teal-600"
//                       : "border-transparent text-gray-500 hover:text-gray-700"
//                   }`}
//                 >
//                   {t.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="p-6">
//             {detailTab === "overview" && (
//               <div className="space-y-5">
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 mb-1">USP & Positioning</h4>
//                   <p className="text-sm text-gray-800">{c.usp}</p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 mb-1">Business Description</h4>
//                   <p className="text-sm text-gray-800">{c.businessDescription}</p>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-500 mb-1">Product Lines</h4>
//                     <p className="text-sm text-gray-800">{c.productLines}</p>
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-500 mb-1">Investors</h4>
//                     <p className="text-sm text-gray-800">{c.investors}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {detailTab === "contacts" && (
//               <div className="space-y-5">
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 mb-3">SPOC Recruiters</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {c.spocRecruiters.map((recruiter, idx) => (
//                       <span key={idx} className="px-3 py-1 text-sm bg-teal-50 text-teal-700 rounded-full font-medium">
//                         {recruiter}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <h4 className="text-sm font-medium text-gray-500 mb-3">Client-side Contact</h4>
//                   <p className="text-sm font-semibold text-gray-800">{c.clientContact.name}</p>
//                   <p className="text-xs text-gray-500 mt-1">{c.clientContact.email}</p>
//                   <p className="text-xs text-gray-500">{c.clientContact.phone}</p>
//                 </div>
//               </div>
//             )}

//             {detailTab === "contract" && (
//               <div className="space-y-5">
//                 <div className="grid grid-cols-3 gap-4">
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="text-xs font-medium text-gray-400 mb-1">Contract Type</h4>
//                     <p className="text-sm font-semibold text-gray-800">{c.contractType}</p>
//                   </div>
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="text-xs font-medium text-gray-400 mb-1">Fee Structure</h4>
//                     <p className="text-sm font-semibold text-gray-800">{c.feeStructure}</p>
//                   </div>
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="text-xs font-medium text-gray-400 mb-1">Contract Period</h4>
//                     <p className="text-sm font-semibold text-gray-800">{c.contractStart} to {c.contractEnd}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {detailTab === "positions" && (
//               <div className="space-y-4">
//                 {clientPositions.length === 0 ? (
//                   <p className="text-sm text-gray-500">No positions data available.</p>
//                 ) : (
//                   <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                     <div className="overflow-x-auto">
//                       <table className="w-full text-sm">
//                         <thead>
//                           <tr className="border-b border-gray-200 bg-gray-50">
//                             <th className="text-left py-2 px-4 text-xs font-semibold text-gray-600">Position</th>
//                             <th className="text-center py-2 px-4 text-xs font-semibold text-gray-600">Submitted</th>
//                             <th className="text-center py-2 px-4 text-xs font-semibold text-gray-600">Pipeline</th>
//                             <th className="text-center py-2 px-4 text-xs font-semibold text-gray-600">Offered</th>
//                             <th className="text-center py-2 px-4 text-xs font-semibold text-gray-600">Joined</th>
//                             <th className="text-center py-2 px-4 text-xs font-semibold text-gray-600">Fill Rate</th>
//                             <th className="text-left py-2 px-4 text-xs font-semibold text-gray-600">Time to Fill</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {clientPositions.map((pos, idx) => (
//                             <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
//                               <td className="py-2 px-4 text-sm font-medium text-gray-800">{pos.position}</td>
//                               <td className="py-2 px-4 text-center text-sm text-gray-700">{pos.submitted}</td>
//                               <td className="py-2 px-4 text-center text-sm text-gray-700">{pos.shortlisted}</td>
//                               <td className="py-2 px-4 text-center text-sm text-gray-700">{pos.offered}</td>
//                               <td className="py-2 px-4 text-center text-sm text-gray-700">{pos.joined}</td>
//                               <td className="py-2 px-4 text-center">
//                                 <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
//                                   pos.fillRate === "100%" ? "bg-green-100 text-green-800"
//                                     : pos.fillRate === "0%" ? "bg-red-100 text-red-800"
//                                     : "bg-yellow-100 text-yellow-800"
//                                 }`}>
//                                   {pos.fillRate}
//                                 </span>
//                               </td>
//                               <td className="py-2 px-4 text-xs text-gray-500">{pos.timeToFill}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {detailTab === "revenue" && (
//               <div className="space-y-6">
//                 {!clientRevenue ? (
//                   <p className="text-sm text-gray-500">No revenue data available for this client.</p>
//                 ) : (
//                   <>
//                     {/* Revenue Summary Cards */}
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
//                         <p className="text-xs text-gray-500 mb-1">Billed Amount</p>
//                         <p className="text-2xl font-bold text-gray-800">{formatINR(clientRevenue.billedAmount)}</p>
//                         <p className="text-xs text-gray-400 mt-1">Total revenue billed</p>
//                       </div>
//                       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
//                         <p className="text-xs text-gray-500 mb-1">Outstanding Receivables</p>
//                         <p className="text-2xl font-bold text-red-600">{formatINR(clientRevenue.outstanding)}</p>
//                         <p className="text-xs text-gray-400 mt-1">{((clientRevenue.outstanding / clientRevenue.billedAmount) * 100).toFixed(1)}% of billed</p>
//                       </div>
//                       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
//                         <p className="text-xs text-gray-500 mb-1">Avg Fee / Placement</p>
//                         <p className="text-2xl font-bold text-gray-800">
//                           {clientRevenue.placementsThisPeriod > 0
//                             ? formatINR(Math.round(clientRevenue.billedAmount / clientRevenue.placementsThisPeriod))
//                             : formatINR(0)
//                           }
//                         </p>
//                         <p className="text-xs text-gray-400 mt-1">{clientRevenue.placementsThisPeriod} placements</p>
//                       </div>
//                       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
//                         <p className="text-xs text-gray-500 mb-1">Collected</p>
//                         <p className="text-2xl font-bold text-green-700">
//                           {formatINR(clientRevenue.billedAmount - clientRevenue.outstanding)}
//                         </p>
//                         <p className="text-xs text-green-600 mt-1">
//                           {((((clientRevenue.billedAmount - clientRevenue.outstanding) / clientRevenue.billedAmount) * 100) || 0).toFixed(1)}% collected
//                         </p>
//                       </div>
//                     </div>

//                     {/* Additional Details */}
//                     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
//                       <div className="grid grid-cols-3 gap-4">
//                         <div>
//                           <h4 className="text-sm font-medium text-gray-500 mb-2">Fee Type</h4>
//                           <p className="text-sm font-semibold text-gray-800">{clientRevenue.feeType}</p>
//                         </div>
//                         <div>
//                           <h4 className="text-sm font-medium text-gray-500 mb-2">Invoice Status</h4>
//                           <span className={`px-3 py-1 text-xs font-medium rounded ${getInvoiceBadgeClass(clientRevenue.invoiceStatus)}`}>
//                             {clientRevenue.invoiceStatus}
//                           </span>
//                         </div>
//                         <div>
//                           <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Date</h4>
//                           <p className="text-sm font-semibold text-gray-800">{clientRevenue.paymentDate}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-semibold text-gray-800">Client Directory</h3>
//         <button
//           onClick={() => setShowAddModal(true)}
//           className="px-4 py-2 text-xs font-semibold rounded-md bg-teal-600 text-white hover:bg-teal-700"
//         >
//           + Add Client
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//         <div className="flex flex-wrap gap-3">
//           <input
//             type="text"
//             placeholder="Search clients by name or industry..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="flex-1 min-w-[300px] h-10 rounded-lg border border-gray-300 px-3 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
//           />
//         </div>
//       </div>

//       {/* ── TABLE LAYOUT FOR CLIENTS ── */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-200 bg-gray-50">
//                 <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Client Name</th>
//                 <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Industry</th>
//                 <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">HQ</th>
//                 <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Contract Type</th>
//                 <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600">Positions</th>
//                 <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600">Placed</th>
//                 <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600">Active</th>
//                 <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">SPOC</th>
//                 <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600">Status</th>
//                 <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredClients.map((client) => (
//                 <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
//                   <td className="py-3 px-4 text-sm font-medium text-gray-800">{client.name}</td>
//                   <td className="py-3 px-4 text-sm text-gray-700">{client.industry}</td>
//                   <td className="py-3 px-4 text-sm text-gray-700">{client.hq}</td>
//                   <td className="py-3 px-4 text-sm text-gray-700">{client.contractType}</td>
//                   <td className="py-3 px-4 text-center text-sm text-gray-700">{client.totalPositions}</td>
//                   <td className="py-3 px-4 text-center text-sm font-semibold text-green-700">{client.placements}</td>
//                   <td className="py-3 px-4 text-center text-sm font-semibold text-blue-700">{client.activePositions}</td>
//                   <td className="py-3 px-4 text-sm text-gray-700">{client.spocRecruiters.join(", ")}</td>
//                   <td className="py-3 px-4 text-center">
//                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(client.status)}`}>
//                       {client.status}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 text-center">
//                     <button
//                       onClick={() => setSelectedClient(client)}
//                       className="px-3 py-1 text-xs font-medium rounded-md bg-teal-50 text-teal-700 hover:bg-teal-100"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {loading && (
//           <div className="p-8 text-center">
//             <p className="text-sm text-gray-500">Loading clients...</p>
//           </div>
//         )}
//         {!loading && filteredClients.length === 0 && (
//           <div className="p-8 text-center">
//             <p className="text-sm text-gray-500">No clients match your search.</p>
//           </div>
//         )}
//       </div>

//       <AddClientModal
//         open={showAddModal}
//         onClose={() => setShowAddModal(false)}
//         onCreated={(client) => setClients((prev) => [...prev, client])}
//       />
//     </div>
//   );
// }

// // ---------- 2. Offer Dashboard ----------

// function OfferDashboard() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [filterClient, setFilterClient] = useState("All");
//   const [offersData, setOffersData] = useState<Offer[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     crmService
//       .fetchOffers()
//       .then((res) => setOffersData(res.data))
//       .catch((err) => console.error("Failed to load offers:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   const offerStatuses = ["All", "Extended", "Negotiation", "Accepted", "Declined", "Revoked", "Ghosted"];
//   const clients = ["All", ...Array.from(new Set(offersData.map((o) => o.client)))];

//   const totalOffers = offersData.length;
//   const accepted = offersData.filter((o) => o.status === "Accepted").length;
//   const declined = offersData.filter((o) => o.status === "Declined").length;
//   const pending = offersData.filter((o) => o.status === "Extended" || o.status === "Negotiation").length;
//   const joinConfirmed = offersData.filter((o) => o.joiningConfirmed).length;
//   const offerToJoinRate = totalOffers > 0 ? ((joinConfirmed / totalOffers) * 100).toFixed(0) : "0";

//   const filtered = useMemo(() => {
//     return offersData.filter((o) => {
//       const matchSearch = o.candidate.toLowerCase().includes(searchTerm.toLowerCase()) || o.position.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchStatus = filterStatus === "All" || o.status === filterStatus;
//       const matchClient = filterClient === "All" || o.client === filterClient;
//       return matchSearch && matchStatus && matchClient;
//     });
//   }, [offersData, searchTerm, filterStatus, filterClient]);

//   return (
//     <div className="space-y-6">
//       <h3 className="text-lg font-semibold text-gray-800">Offer Dashboard</h3>

//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
//           <p className="text-2xl font-bold text-gray-800">{totalOffers}</p>
//           <p className="text-xs text-gray-500 mt-1">Total Offers</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
//           <p className="text-2xl font-bold text-green-700">{accepted}</p>
//           <p className="text-xs text-gray-500 mt-1">Accepted</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
//           <p className="text-2xl font-bold text-red-600">{declined}</p>
//           <p className="text-xs text-gray-500 mt-1">Declined</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
//           <p className="text-2xl font-bold text-yellow-600">{pending}</p>
//           <p className="text-xs text-gray-500 mt-1">Pending</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
//           <p className="text-2xl font-bold text-teal-600">{offerToJoinRate}%</p>
//           <p className="text-xs text-gray-500 mt-1">Offer-to-Join</p>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//         <div className="flex flex-wrap gap-3">
//           <input
//             type="text"
//             placeholder="Search candidate or position..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="flex-1 min-w-[200px] h-10 rounded-lg border border-gray-300 px-3 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
//           />
//           <FilterSelect
//             ariaLabel="Filter by offer status"
//             className="w-full sm:w-48"
//             value={filterStatus}
//             onChange={setFilterStatus}
//             options={offerStatuses.map((s) => ({ value: s, label: s === "All" ? "All Statuses" : s }))}
//           />
//           <FilterSelect
//             searchable
//             searchPlaceholder="Search clients..."
//             ariaLabel="Filter by client"
//             className="w-full sm:w-48"
//             value={filterClient}
//             onChange={setFilterClient}
//             options={clients.map((c) => ({ value: c, label: c === "All" ? "All Clients" : c }))}
//           />
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-200">
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Candidate</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Position</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Client</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Offer Date</th>
//                 <th className="text-right py-2 px-4 text-sm font-medium text-gray-600">Offered CTC</th>
//                 <th className="text-right py-2 px-4 text-sm font-medium text-gray-600">Current CTC</th>
//                 <th className="text-center py-2 px-4 text-sm font-medium text-gray-600">Hike %</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Notice</th>
//                 <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Exp. Joining</th>
//                 <th className="text-center py-2 px-4 text-sm font-medium text-gray-600">Status</th>
//                 <th className="text-center py-2 px-4 text-sm font-medium text-gray-600">Confirmed</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((offer) => (
//                 <tr key={offer.id} className="border-b border-gray-100 hover:bg-gray-50">
//                   <td className="py-3 px-4 text-sm font-medium text-gray-800">{offer.candidate}</td>
//                   <td className="py-3 px-4 text-sm text-gray-700">{offer.position}</td>
//                   <td className="py-3 px-4 text-sm text-gray-700">{offer.client.length > 20 ? offer.client.slice(0, 20) + "..." : offer.client}</td>
//                   <td className="py-3 px-4 text-xs text-gray-500">{offer.offerDate}</td>
//                   <td className="py-3 px-4 text-right text-sm font-medium text-gray-800">{formatINR(offer.offeredCTC)}</td>
//                   <td className="py-3 px-4 text-right text-sm text-gray-500">{formatINR(offer.currentCTC)}</td>
//                   <td className="py-3 px-4 text-center">
//                     <span className="px-2 py-0.5 text-xs font-semibold rounded bg-green-50 text-green-700">{offer.hikePercent}%</span>
//                   </td>
//                   <td className="py-3 px-4 text-xs text-gray-500">{offer.noticePeriod}</td>
//                   <td className="py-3 px-4 text-xs text-gray-500">{offer.expectedJoining}</td>
//                   <td className="py-3 px-4 text-center">
//                     <span className={`px-2 py-1 text-xs font-medium rounded ${getOfferStatusBadgeClass(offer.status)}`}>
//                       {offer.status}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 text-center">
//                     {offer.joiningConfirmed ? (
//                       <span className="text-green-600 font-bold text-sm">Yes</span>
//                     ) : (
//                       <span className="text-gray-400 text-sm">--</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {loading && (
//           <div className="p-8 text-center">
//             <p className="text-sm text-gray-500">Loading offers...</p>
//           </div>
//         )}
//         {!loading && filtered.length === 0 && (
//           <div className="p-8 text-center">
//             <p className="text-sm text-gray-500">No offers match your filters.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── Main Component ──────────────────────────────────────────────────────────

// export default function CRMModule() {
//   const location = useLocation();

//   const path = location.pathname.replace(/\/+$/, "");
//   const section = path === "/crm/offers" ? "offers" : "clients";

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <div className="p-6 space-y-6 max-w-7xl mx-auto">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">CRM Module</h1>
//             <p className="text-sm text-gray-500 mt-1">TrueKarma Recruitment &mdash; Client Relationship Management</p>
//           </div>
//         </div>

//         {section === "clients" && <ClientDetails />}
//         {section === "offers" && <OfferDashboard />}
//       </div>
//     </div>
//   );
// }




import { useState, useMemo, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import AddClientModal from "../components/clients/AddClientModal";
import EditClientModal from "../components/clients/EditClientModal";
import FilterSelect from "../components/FilterSelect";
import {
  crmService,
  type CrmOfferClient,
  type CrmOfferSummary,
} from "../services/crmService";
import type {
  Client,
  RevenueRow,
  Offer,
  PositionPerformance,
} from "../types/crm";

// ─── Utility Helpers ─────────────────────────────────────────────────────────

function formatINR(amount: number): string {
  if (amount >= 100000) {
    return `${(amount / 100000).toFixed(1)}L`;
  }
  return new Intl.NumberFormat("en-IN").format(amount);
}

// Show "--" for missing or placeholder values
const orDash = (value: string | null | undefined): string =>
  value && value.trim() && value !== "--" ? value : "--";

function getInvoiceBadgeClass(status: string): string {
  switch (status) {
    case "Paid": return "bg-green-100 text-green-800";
    case "Sent": return "bg-blue-100 text-blue-800";
    case "Drafted": return "bg-gray-100 text-gray-600";
    case "Overdue": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-600";
  }
}

function getOfferStatusBadgeClass(status: string): string {
  switch (status) {
    case "Accepted": return "bg-green-100 text-green-800";
    case "Negotiation": return "bg-yellow-100 text-yellow-800";
    case "Extended": return "bg-blue-100 text-blue-800";
    case "Declined": return "bg-red-100 text-red-800";
    case "Revoked": return "bg-red-100 text-red-800";
    case "Ghosted": return "bg-gray-100 text-gray-600";
    default: return "bg-gray-100 text-gray-600";
  }
}

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case "Active": return "bg-green-100 text-green-800";
    case "Inactive": return "bg-gray-100 text-gray-600";
    case "New": return "bg-blue-100 text-blue-800";
    default: return "bg-gray-100 text-gray-600";
  }
}

const CLIENT_STATUSES = ["Active", "Inactive", "New"];

// ─── Sub-Components ──────────────────────────────────────────────────────────

// ---------- 1. Client Details ----------

function ClientDetails() {
  const [clients, setClients] = useState<Client[]>([]);
  const [positionPerformanceData, setPositionPerformanceData] = useState<PositionPerformance[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [detailTab, setDetailTab] = useState<"overview" | "contacts" | "contract" | "positions" | "revenue">("overview");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // The client currently open; guards against a late detail response
  const openClientIdRef = useRef<string | null>(null);

  const loadClients = () => {
    setLoading(true);
    setLoadError("");
    crmService
      .fetchClients()
      .then((res) => {
        if (res.success) setClients(res.data);
        else setLoadError(res.message || "Could not load clients.");
      })
      .catch((err) => {
        console.error("Failed to load clients:", err);
        setLoadError("Could not load clients. Try again.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadClients();

    // Still mock data until these APIs are shared
    Promise.all([crmService.fetchPositionPerformance(), crmService.fetchRevenue()])
      .then(([perfRes, revenueRes]) => {
        setPositionPerformanceData(perfRes.data);
        setRevenueData(revenueRes.data);
      })
      .catch((err) => console.error("Failed to load positions/revenue:", err));
  }, []);

  const industryOptions = useMemo(() => {
    const industries = Array.from(new Set(clients.map((c) => c.industry))).sort((a, b) => {
      if (a === "--") return 1;
      if (b === "--") return -1;
      return a.localeCompare(b);
    });
    return ["All", ...industries];
  }, [clients]);

  const statusOptions = useMemo(() => {
    const extra = Array.from(new Set(clients.map((c) => c.status))).filter((s) => !CLIENT_STATUSES.includes(s));
    return ["All", ...CLIENT_STATUSES, ...extra];
  }, [clients]);

  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.industry.toLowerCase().includes(searchTerm.toLowerCase());
      const matchIndustry = filterIndustry === "All" || c.industry === filterIndustry;
      const matchStatus = filterStatus === "All" || c.status === filterStatus;
      return matchSearch && matchIndustry && matchStatus;
    });
  }, [clients, searchTerm, filterIndustry, filterStatus]);

  const hasActiveFilters = !!searchTerm || filterIndustry !== "All" || filterStatus !== "All";

  // Open from list data straight away, then fill in from the single-client API
  const openClient = (client: Client) => {
    openClientIdRef.current = client.id;
    setSelectedClient(client);
    setDetailTab("overview");

    crmService
      .fetchClientById(client.id)
      .then((res) => {
        if (openClientIdRef.current !== client.id || !res.success || !res.data) return;
        const detail = res.data;
        // Keep list values where the detail response has nothing
        const filled = Object.fromEntries(
          Object.entries(detail).filter(([, v]) =>
            v !== "" && v !== "--" && v !== 0 && !(Array.isArray(v) && v.length === 0)
          )
        ) as Partial<Client>;
        const contact = {
          name: detail.clientContact.name || client.clientContact.name,
          email: detail.clientContact.email || client.clientContact.email,
          phone: detail.clientContact.phone || client.clientContact.phone,
        };
        setSelectedClient((prev) => (prev && prev.id === client.id ? { ...prev, ...filled, clientContact: contact } : prev));
      })
      .catch((err) => console.error("Failed to load client details:", err));
  };

  const closeClient = () => {
    openClientIdRef.current = null;
    setSelectedClient(null);
    setDetailTab("overview");
  };

  const handleClientSaved = (updated: Client) => {
    setClients((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setSelectedClient((prev) => (prev && prev.id === updated.id ? updated : prev));
  };

  if (selectedClient) {
    const c = selectedClient;
    const tabs: { key: typeof detailTab; label: string }[] = [
      { key: "overview", label: "Overview" },
      { key: "contacts", label: "Contacts" },
      { key: "contract", label: "Contract" },
      { key: "positions", label: "Positions" },
      { key: "revenue", label: "Revenue" },
    ];

    // Get positions for this client
    const clientPositions = positionPerformanceData.filter((p) => p.client === c.name);

    // Get revenue for this client
    const clientRevenue = revenueData.find((r) => r.client === c.name);

    const subtitle = [
      c.industry !== "--" ? c.industry : "",
      c.hq !== "--" ? c.hq : "",
      c.companySize ? `${c.companySize} employees` : "",
    ].filter(Boolean).join(" · ");

    const contractPeriod = c.contractStart || c.contractEnd
      ? `${orDash(c.contractStart)} to ${orDash(c.contractEnd)}`
      : "--";

    return (
      <div className="space-y-6">
        <button
          onClick={closeClient}
          className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Client List
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center text-teal-700 font-bold text-lg shrink-0">
                {c.name.split(" ").map((w) => w[0]).join("").slice(0, 3)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-xl font-semibold text-gray-800">{c.name}</h2>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(c.status)}`}>{c.status}</span>
                </div>
                {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
                {c.website && <p className="text-xs text-gray-400 mt-1 break-all">{c.website}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {c.fundingStage && (
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-teal-50 text-teal-700">{c.fundingStage}</span>
                )}
                <button
                  onClick={() => setShowEditModal(true)}
                  className="px-3 py-1.5 text-xs font-medium rounded-md border border-teal-300 text-teal-700 hover:bg-teal-50"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 px-6 overflow-x-auto">
            <div className="flex gap-0">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setDetailTab(t.key)}
                  className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    detailTab === t.key
                      ? "border-teal-600 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {detailTab === "overview" && (
              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">USP & Positioning</h4>
                  <p className="text-sm text-gray-800">{orDash(c.usp)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Business Description</h4>
                  <p className="text-sm text-gray-800">{orDash(c.businessDescription)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Product Lines</h4>
                    <p className="text-sm text-gray-800">{orDash(c.productLines)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Investors</h4>
                    <p className="text-sm text-gray-800">{orDash(c.investors)}</p>
                  </div>
                </div>
              </div>
            )}

            {detailTab === "contacts" && (
              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">SPOC Recruiters</h4>
                  {c.spocRecruiters.length === 0 ? (
                    <p className="text-sm text-gray-500">No SPOC assigned.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {c.spocRecruiters.map((recruiter, idx) => (
                        <span key={idx} className="px-3 py-1 text-sm bg-teal-50 text-teal-700 rounded-full font-medium">
                          {recruiter}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Client-side Contact</h4>
                  {c.clientContact.name || c.clientContact.email || c.clientContact.phone ? (
                    <>
                      <p className="text-sm font-semibold text-gray-800">{orDash(c.clientContact.name)}</p>
                      {c.clientContact.email && <p className="text-xs text-gray-500 mt-1">{c.clientContact.email}</p>}
                      {c.clientContact.phone && <p className="text-xs text-gray-500">{c.clientContact.phone}</p>}
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">No contact added.</p>
                  )}
                </div>
              </div>
            )}

            {detailTab === "contract" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-xs font-medium text-gray-400 mb-1">Contract Type</h4>
                    <p className="text-sm font-semibold text-gray-800">{orDash(c.contractType)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-xs font-medium text-gray-400 mb-1">Fee Structure</h4>
                    <p className="text-sm font-semibold text-gray-800">{orDash(c.feeStructure)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-xs font-medium text-gray-400 mb-1">Contract Period</h4>
                    <p className="text-sm font-semibold text-gray-800">{contractPeriod}</p>
                  </div>
                </div>
              </div>
            )}

            {detailTab === "positions" && (
              <div className="space-y-4">
                {clientPositions.length === 0 ? (
                  <p className="text-sm text-gray-500">No positions data available.</p>
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="text-left py-2 px-4 text-xs font-semibold text-gray-600">Position</th>
                            <th className="text-center py-2 px-4 text-xs font-semibold text-gray-600">Submitted</th>
                            <th className="text-center py-2 px-4 text-xs font-semibold text-gray-600">Pipeline</th>
                            <th className="text-center py-2 px-4 text-xs font-semibold text-gray-600">Offered</th>
                            <th className="text-center py-2 px-4 text-xs font-semibold text-gray-600">Joined</th>
                            <th className="text-center py-2 px-4 text-xs font-semibold text-gray-600">Fill Rate</th>
                            <th className="text-left py-2 px-4 text-xs font-semibold text-gray-600">Time to Fill</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clientPositions.map((pos, idx) => (
                            <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-2 px-4 text-sm font-medium text-gray-800">{pos.position}</td>
                              <td className="py-2 px-4 text-center text-sm text-gray-700">{pos.submitted}</td>
                              <td className="py-2 px-4 text-center text-sm text-gray-700">{pos.shortlisted}</td>
                              <td className="py-2 px-4 text-center text-sm text-gray-700">{pos.offered}</td>
                              <td className="py-2 px-4 text-center text-sm text-gray-700">{pos.joined}</td>
                              <td className="py-2 px-4 text-center">
                                <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                                  pos.fillRate === "100%" ? "bg-green-100 text-green-800"
                                    : pos.fillRate === "0%" ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {pos.fillRate}
                                </span>
                              </td>
                              <td className="py-2 px-4 text-xs text-gray-500">{pos.timeToFill}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {detailTab === "revenue" && (
              <div className="space-y-6">
                {!clientRevenue ? (
                  <p className="text-sm text-gray-500">No revenue data available for this client.</p>
                ) : (
                  <>
                    {/* Revenue Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                        <p className="text-xs text-gray-500 mb-1">Billed Amount</p>
                        <p className="text-2xl font-bold text-gray-800">{formatINR(clientRevenue.billedAmount)}</p>
                        <p className="text-xs text-gray-400 mt-1">Total revenue billed</p>
                      </div>
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                        <p className="text-xs text-gray-500 mb-1">Outstanding Receivables</p>
                        <p className="text-2xl font-bold text-red-600">{formatINR(clientRevenue.outstanding)}</p>
                        <p className="text-xs text-gray-400 mt-1">{((clientRevenue.outstanding / clientRevenue.billedAmount) * 100).toFixed(1)}% of billed</p>
                      </div>
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                        <p className="text-xs text-gray-500 mb-1">Avg Fee / Placement</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {clientRevenue.placementsThisPeriod > 0
                            ? formatINR(Math.round(clientRevenue.billedAmount / clientRevenue.placementsThisPeriod))
                            : formatINR(0)
                          }
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{clientRevenue.placementsThisPeriod} placements</p>
                      </div>
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                        <p className="text-xs text-gray-500 mb-1">Collected</p>
                        <p className="text-2xl font-bold text-green-700">
                          {formatINR(clientRevenue.billedAmount - clientRevenue.outstanding)}
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          {((((clientRevenue.billedAmount - clientRevenue.outstanding) / clientRevenue.billedAmount) * 100) || 0).toFixed(1)}% collected
                        </p>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Fee Type</h4>
                          <p className="text-sm font-semibold text-gray-800">{clientRevenue.feeType}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Invoice Status</h4>
                          <span className={`px-3 py-1 text-xs font-medium rounded ${getInvoiceBadgeClass(clientRevenue.invoiceStatus)}`}>
                            {clientRevenue.invoiceStatus}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Date</h4>
                          <p className="text-sm font-semibold text-gray-800">{clientRevenue.paymentDate}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <EditClientModal
          open={showEditModal}
          client={selectedClient}
          onClose={() => setShowEditModal(false)}
          onSaved={handleClientSaved}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Client Directory</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 text-xs font-semibold rounded-md bg-teal-600 text-white hover:bg-teal-700"
        >
          + Add Client
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search clients by name or industry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[240px] h-10 rounded-lg border border-gray-300 px-3 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <FilterSelect
            searchable
            searchPlaceholder="Search industries..."
            ariaLabel="Filter by industry"
            className="w-full sm:w-56"
            value={filterIndustry}
            onChange={setFilterIndustry}
            options={industryOptions.map((i) => ({
              value: i,
              label: i === "All" ? "All Industries" : i === "--" ? "Not specified" : i,
            }))}
          />
          <FilterSelect
            ariaLabel="Filter by client status"
            className="w-full sm:w-44"
            value={filterStatus}
            onChange={setFilterStatus}
            options={statusOptions.map((s) => ({ value: s, label: s === "All" ? "All Statuses" : s }))}
          />
        </div>
        {!loading && (
          <p className="text-xs text-gray-500 mt-3">
            {hasActiveFilters
              ? `${filteredClients.length} of ${clients.length} clients`
              : `${clients.length} clients`}
          </p>
        )}
      </div>

      {loadError && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-sm text-red-700">
          <span>{loadError}</span>
          <button onClick={loadClients} className="text-xs font-semibold underline">Retry</button>
        </div>
      )}

      {/* ── TABLE LAYOUT FOR CLIENTS ── */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Client Name</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Industry</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">HQ</th>
                {/* Contract Type column hidden until the clients API returns it */}
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600">Positions</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600">Placed</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600">Active</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">SPOC</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-800">{client.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 max-w-[220px] truncate" title={client.industry}>{client.industry}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{client.hq}</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-700">{client.totalPositions}</td>
                  <td className="py-3 px-4 text-center text-sm font-semibold text-green-700">{client.placements}</td>
                  <td className="py-3 px-4 text-center text-sm font-semibold text-blue-700">{client.activePositions}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{client.spocRecruiters.join(", ") || "--"}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => openClient(client)}
                      className="px-3 py-1 text-xs font-medium rounded-md bg-teal-50 text-teal-700 hover:bg-teal-100"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && (
          <div className="p-8 text-center">
            <p className="text-sm text-gray-500">Loading clients...</p>
          </div>
        )}
        {!loading && !loadError && filteredClients.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-sm text-gray-500">No clients match your search.</p>
          </div>
        )}
      </div>

      <AddClientModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCreated={(client) => setClients((prev) => [...prev, client])}
      />
    </div>
  );
}

// ---------- 2. Offer Dashboard ----------

const OFFERS_PAGE_SIZE = 20;
const DEFAULT_OFFER_STATUSES = ["Extended", "Negotiation", "Accepted", "Declined", "Revoked", "Ghosted"];

function OfferDashboard() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // debounced
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterClient, setFilterClient] = useState("All");
  const [page, setPage] = useState(1);

  const [offersData, setOffersData] = useState<Offer[]>([]);
  const [summary, setSummary] = useState<CrmOfferSummary | null>(null);
  const [clientOptions, setClientOptions] = useState<CrmOfferClient[]>([]);
  const [statuses, setStatuses] = useState<string[]>(DEFAULT_OFFER_STATUSES);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Ignore responses from older requests when filters change quickly
  const requestIdRef = useRef(0);

  const loadOffers = async () => {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    setError("");
    try {
      const res = await crmService.fetchOffers({
        page,
        limit: OFFERS_PAGE_SIZE,
        status: filterStatus === "All" ? "all" : filterStatus,
        clientId: filterClient === "All" ? undefined : filterClient,
        search: searchTerm,
      });
      if (requestId !== requestIdRef.current) return;
      if (!res.success) {
        setError(res.message || "Could not load offers.");
        return;
      }
      setOffersData(res.data.offers);
      setSummary(res.data.summary || null);
      if (res.data.statuses?.length) setStatuses(res.data.statuses);
      // Merge so the client filter keeps its options when a client is selected
      if (res.data.clients?.length) {
        setClientOptions((prev) => {
          const byId = new Map(prev.map((c) => [String(c.id), c]));
          res.data.clients.forEach((c) => byId.set(String(c.id), c));
          return Array.from(byId.values()).sort((a, b) => a.name.localeCompare(b.name));
        });
      }
      setTotal(res.data.pagination?.total || 0);
      setTotalPages(Math.max(res.data.pagination?.totalPages || 1, 1));
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      console.error("Failed to load offers:", err);
      setError("Could not load offers. Try again.");
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, [page, searchTerm, filterStatus, filterClient]);

  // Debounce search so we don't call the API on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleStatusChange = async (offer: Offer, newStatus: string) => {
    if (newStatus === offer.status) return;
    const previousStatus = offer.status;

    // Optimistic update, rolled back on failure
    setUpdatingId(offer.id);
    setOffersData((prev) => prev.map((o) => (o.id === offer.id ? { ...o, status: newStatus as Offer["status"] } : o)));

    try {
      const res = await crmService.updateOfferStatus(offer.id, newStatus);
      if (!res.success) throw new Error(res.message || "Status update failed");
      // Refresh KPIs, and drop the row if it no longer matches the status filter
      loadOffers();
    } catch (err: any) {
      console.error("Failed to update offer status:", err);
      setOffersData((prev) => prev.map((o) => (o.id === offer.id ? { ...o, status: previousStatus } : o)));
      alert(err?.response?.data?.message || "Could not update the offer status. Try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const offerStatuses = ["All", ...statuses];
  const rangeStart = total === 0 ? 0 : (page - 1) * OFFERS_PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * OFFERS_PAGE_SIZE, total);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Offer Dashboard</h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-800">{summary?.totalOffers ?? "--"}</p>
          <p className="text-xs text-gray-500 mt-1">Total Offers</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{summary?.accepted ?? "--"}</p>
          <p className="text-xs text-gray-500 mt-1">Accepted</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{summary?.declined ?? "--"}</p>
          <p className="text-xs text-gray-500 mt-1">Declined</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{summary?.pending ?? "--"}</p>
          <p className="text-xs text-gray-500 mt-1">Pending</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-teal-600">{summary ? `${summary.offerToJoin}%` : "--"}</p>
          <p className="text-xs text-gray-500 mt-1">Offer-to-Join</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search candidate, position or client..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 min-w-[200px] h-10 rounded-lg border border-gray-300 px-3 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <FilterSelect
            ariaLabel="Filter by offer status"
            className="w-full sm:w-48"
            value={filterStatus}
            onChange={(v: string) => { setFilterStatus(v); setPage(1); }}
            options={offerStatuses.map((s) => ({ value: s, label: s === "All" ? "All Statuses" : s }))}
          />
          <FilterSelect
            searchable
            searchPlaceholder="Search clients..."
            ariaLabel="Filter by client"
            className="w-full sm:w-48"
            value={filterClient}
            onChange={(v: string) => { setFilterClient(v); setPage(1); }}
            options={[
              { value: "All", label: "All Clients" },
              ...clientOptions.map((c) => ({ value: String(c.id), label: c.name })),
            ]}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-sm text-red-700">
          <span>{error}</span>
          <button onClick={loadOffers} className="text-xs font-semibold underline">Retry</button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className={`w-full transition-opacity ${loading && offersData.length ? "opacity-60" : ""}`}>
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Candidate</th>
                <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Position</th>
                <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Client</th>
                <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Offer Date</th>
                <th className="text-right py-2 px-4 text-sm font-medium text-gray-600">Offered CTC</th>
                <th className="text-right py-2 px-4 text-sm font-medium text-gray-600">Current CTC</th>
                <th className="text-center py-2 px-4 text-sm font-medium text-gray-600">Hike %</th>
                <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Notice</th>
                <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Exp. Joining</th>
                <th className="text-center py-2 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-center py-2 px-4 text-sm font-medium text-gray-600">Confirmed</th>
              </tr>
            </thead>
            <tbody>
              {offersData.map((offer) => (
                <tr key={offer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-800">{offer.candidate}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{offer.position}</td>
                  <td className="py-3 px-4 text-sm text-gray-700" title={offer.client}>{offer.client.length > 20 ? offer.client.slice(0, 20) + "..." : offer.client}</td>
                  <td className="py-3 px-4 text-xs text-gray-500 whitespace-nowrap">{offer.offerDate}</td>
                  <td className="py-3 px-4 text-right text-sm font-medium text-gray-800">{offer.offeredCTC !== null ? formatINR(offer.offeredCTC) : "--"}</td>
                  <td className="py-3 px-4 text-right text-sm text-gray-500">{offer.currentCTC !== null ? formatINR(offer.currentCTC) : "--"}</td>
                  <td className="py-3 px-4 text-center">
                    {offer.hikePercent !== null ? (
                      <span className="px-2 py-0.5 text-xs font-semibold rounded bg-green-50 text-green-700">{offer.hikePercent}%</span>
                    ) : (
                      <span className="text-gray-400 text-sm">--</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-500 whitespace-nowrap">{offer.noticePeriod}</td>
                  <td className="py-3 px-4 text-xs text-gray-500 whitespace-nowrap">{offer.expectedJoining}</td>
                  <td className="py-3 px-4 text-center">
                    <select
                      value={offer.status}
                      disabled={updatingId === offer.id}
                      onChange={(e) => handleStatusChange(offer, e.target.value)}
                      aria-label={`Offer status for ${offer.candidate}`}
                      className={`px-2 py-1 text-xs font-medium rounded border-0 cursor-pointer disabled:opacity-60 ${getOfferStatusBadgeClass(offer.status)}`}
                    >
                      {(statuses.includes(offer.status) ? statuses : [offer.status, ...statuses]).map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {offer.joiningConfirmed ? (
                      <span className="text-green-600 font-bold text-sm">Yes</span>
                    ) : (
                      <span className="text-gray-400 text-sm">--</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && offersData.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-sm text-gray-500">Loading offers...</p>
          </div>
        )}
        {!loading && !error && offersData.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-sm text-gray-500">No offers match your filters.</p>
          </div>
        )}
      </div>

      {total > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-600">
          <span>Showing {rangeStart}–{rangeEnd} of {total}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page <= 1 || loading}
              className="h-9 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              ← Prev
            </button>
            <span className="px-2">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page >= totalPages || loading}
              className="h-9 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function CRMModule() {
  const location = useLocation();

  const path = location.pathname.replace(/\/+$/, "");
  const section = path === "/crm/offers" ? "offers" : "clients";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">CRM Module</h1>
            <p className="text-sm text-gray-500 mt-1">TrueKarma Recruitment &mdash; Client Relationship Management</p>
          </div>
        </div>

        {section === "clients" && <ClientDetails />}
        {section === "offers" && <OfferDashboard />}
      </div>
    </div>
  );
}