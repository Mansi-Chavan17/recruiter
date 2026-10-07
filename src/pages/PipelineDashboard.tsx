import { useState } from "react";
import Header from "../components/Header";
import { TrendingUp, Users, FileCheck, UserCheck, Calendar, Clock, AlertTriangle } from "lucide-react";

const STATS = [
  { label: "Active Positions", value: 3, icon: FileCheck, color: "bg-teal-600" },
  { label: "Active Clients", value: 3, icon: FileCheck, color: "bg-teal-600" },
  { label: "Candidates Tagged", value: 6, icon: Users, color: "bg-blue-600" },
  { label: "Profiles Submitted", value: 3, icon: TrendingUp, color: "bg-purple-600" },
  { label: "Selected by Client", value: 1, icon: UserCheck, color: "bg-emerald-600" },
  { label: "Interviews Scheduled", value: 1, icon: Calendar, color: "bg-orange-500" },
  { label: "Offers Extended", value: 0, icon: FileCheck, color: "bg-rose-500" },
];

const PIPELINE_STAGES = [
  { key: "uploaded", label: "Uploaded", count: 3 },
  { key: "submitted", label: "Submitted", count: 3 },
  { key: "shared", label: "Shared", count: 2 },
  { key: "selected", label: "Selected", count: 1 },
  { key: "interview", label: "Interview", count: 1 },
  { key: "offer", label: "Offer", count: 0 },
  { key: "joined", label: "Joined", count: 0 },
];

const POSITIONS = [
  { id: "REQ-2026-001", title: "VP Engineering", client: "Axis Bank", status: "Open", tagged: 4, called: 3, submitted: 2, shared: 2, selected: 1 },
  { id: "REQ-2026-002", title: "Head of Product", client: "HDFC Bank", status: "Open", tagged: 2, called: 1, submitted: 1, shared: 0, selected: 0 },
  { id: "REQ-2026-003", title: "CTO", client: "Bajaj Finance", status: "Open", tagged: 0, called: 0, submitted: 0, shared: 0, selected: 0 },
];

const SLA_ALERTS = [
  { type: "warning" as const, message: "Client feedback on Sneha Iyer (VP Engineering, Axis Bank) is pending — 42h elapsed.", time: "6h until auto-reminder" },
  { type: "info" as const, message: "Priya Mehta interview (Head of Product, HDFC Bank) — scheduling pending.", time: "Awaiting client calendar" },
];

const FUNNEL_COLORS = [
  "bg-indigo-400", "bg-indigo-500", "bg-blue-400", "bg-blue-500",
  "bg-teal-400", "bg-teal-500", "bg-emerald-400", "bg-emerald-500",
  "bg-green-400", "bg-green-500",
];

const PipelineDashboard = () => {
  const [period, setPeriod] = useState<"day" | "week" | "month">("month");
  const maxCount = Math.max(...PIPELINE_STAGES.map((s) => s.count), 1);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="md:ml-16 px-6 py-4">
        {/* Period toggle */}
        <div className="flex items-center justify-end gap-1 mb-4">
          {(["day", "week", "month"] as const).map((p) => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
                period === p ? "bg-teal-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}>
              {p}
            </button>
          ))}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-6">
          {STATS.map((s) => {
            const IconComp = s.icon;
            return (
              <div key={s.label} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className={`w-8 h-8 rounded-lg ${s.color} text-white flex items-center justify-center mb-3`}>
                  <IconComp className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            );
          })}
        </div>

        

        {/* Position-wise breakdown */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">Position-wise Status</h3>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["Position", "Client", "Tagged", "Called", "Submitted", "Shared", "Selected", "Status"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {POSITIONS.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{p.title}</div>
                    <div className="text-sm text-gray-500">{p.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.tagged}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.called}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.submitted}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.shared}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.selected}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default PipelineDashboard;
