import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { TrendingUp, Users, FileCheck, UserCheck, Calendar } from "lucide-react";
import {
  recruiterDashboardService,
  type PipelineDashboardParams,
  type PipelinePeriod,
  type PipelineStats,
  type RecruiterPipelineDashboard,
} from "../services/recruiterDashboardService";

const STAT_CARDS: {
  key: keyof PipelineStats;
  label: string;
  icon: typeof FileCheck;
  color: string;
}[] = [
  { key: "activePositions", label: "Active Positions", icon: FileCheck, color: "bg-teal-600" },
  { key: "activeClients", label: "Active Clients", icon: FileCheck, color: "bg-teal-600" },
  { key: "candidatesTagged", label: "Candidates Tagged", icon: Users, color: "bg-blue-600" },
  { key: "profilesSubmitted", label: "Profiles Submitted", icon: TrendingUp, color: "bg-purple-600" },
  { key: "selectedByClient", label: "Selected by Client", icon: UserCheck, color: "bg-emerald-600" },
  { key: "interviewsScheduled", label: "Interviews Scheduled", icon: Calendar, color: "bg-orange-500" },
  { key: "offersExtended", label: "Offers Extended", icon: FileCheck, color: "bg-rose-500" },
];

const PERIODS: PipelinePeriod[] = ["day", "week", "month", "custom"];

const TABLE_HEADERS = ["Position", "Client", "Tagged", "Called", "Submitted", "Shared", "Selected", "Status"];

// The API returns UTC boundaries (e.g. 31 Oct 23:59:59Z), so format in UTC
// to avoid the end date rolling over to the next day in IST.
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const PipelineDashboard = () => {
  const [period, setPeriod] = useState<PipelinePeriod>("month");
  const [customRange, setCustomRange] = useState({ startDate: "", endDate: "" });
  const [dashboard, setDashboard] = useState<RecruiterPipelineDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Ignore responses from older requests when the period is switched quickly
  const requestIdRef = useRef(0);

  /* -------------------- data -------------------- */

  const loadDashboard = async (params: PipelineDashboardParams) => {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    setError("");
    try {
      const res = await recruiterDashboardService.fetchPipeline(params);
      if (requestId !== requestIdRef.current) return;
      if (res.status === 200) {
        setDashboard(res.data);
      } else {
        console.error("Failed to fetch pipeline dashboard:", res.message);
        setError(res.message || "Could not load the dashboard.");
      }
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      console.error("Error fetching pipeline dashboard:", err);
      setError("Could not load the dashboard. Try again.");
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  };

  // Preset periods fetch immediately; custom waits for the Apply button
  useEffect(() => {
    if (period !== "custom") loadDashboard({ period });
  }, [period]);

  /* -------------------- custom range -------------------- */

  const isCustomRangeValid =
    !!customRange.startDate &&
    !!customRange.endDate &&
    customRange.startDate <= customRange.endDate;

  const applyCustomRange = () => {
    if (!isCustomRangeValid) return;
    loadDashboard({ period: "custom", ...customRange });
  };

  const stats = dashboard?.stats;
  const positions = dashboard?.positions || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="md:ml-16 px-4 md:px-6 py-4">
        {/* Period toggle */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <p className="text-sm text-gray-500">
            {dashboard?.dateRange
              ? `${formatDate(dashboard.dateRange.startDate)} – ${formatDate(dashboard.dateRange.endDate)}`
              : ""}
          </p>

          <div className="flex items-center gap-1 self-end md:self-auto">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
                  period === p ? "bg-teal-600 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Custom date range */}
        {period === "custom" && (
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-end gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Start date</label>
              <input
                type="date"
                value={customRange.startDate}
                max={customRange.endDate || undefined}
                onChange={(e) => setCustomRange((prev) => ({ ...prev, startDate: e.target.value }))}
                className="w-full sm:w-44 h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">End date</label>
              <input
                type="date"
                value={customRange.endDate}
                min={customRange.startDate || undefined}
                onChange={(e) => setCustomRange((prev) => ({ ...prev, endDate: e.target.value }))}
                className="w-full sm:w-44 h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button
              onClick={applyCustomRange}
              disabled={!isCustomRangeValid || loading}
              className="h-10 px-4 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 disabled:bg-teal-300 transition-colors"
            >
              Apply
            </button>
          </div>
        )}

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Stats grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-6 transition-opacity ${
            loading && dashboard ? "opacity-60" : ""
          }`}
        >
          {STAT_CARDS.map((s) => {
            const IconComp = s.icon;
            return (
              <div key={s.key} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className={`w-8 h-8 rounded-lg ${s.color} text-white flex items-center justify-center mb-3`}>
                  <IconComp className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats ? stats[s.key] : "—"}</div>
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
          <div className="overflow-x-auto">
            <table className={`w-full transition-opacity ${loading && dashboard ? "opacity-60" : ""}`}>
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {TABLE_HEADERS.map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading && !dashboard ? (
                  <tr>
                    <td colSpan={TABLE_HEADERS.length} className="px-6 py-10 text-center text-sm text-gray-500">
                      Loading positions...
                    </td>
                  </tr>
                ) : positions.length === 0 ? (
                  <tr>
                    <td colSpan={TABLE_HEADERS.length} className="px-6 py-10 text-center text-sm text-gray-500">
                      No positions in this period.
                    </td>
                  </tr>
                ) : (
                  positions.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{p.title}</div>
                        <div className="text-sm text-gray-500">{p.positionId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.client}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.tagged}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.called}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.submitted}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.shared}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.selected}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PipelineDashboard;