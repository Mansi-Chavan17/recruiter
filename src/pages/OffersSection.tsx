import { useMemo, useState } from "react";
import { Search, X, Users } from "lucide-react";
import FilterSelect from "../FilterSelect";

interface Offer {
  id: string;
  candidate: string;
  position: string;
  client: string;
  offerDate: string;
  offeredCTC: number;
  currentCTC: number;
  hikePercent: number;
  noticePeriod: string;
  expectedJoining: string;
  status: "Extended" | "Negotiation" | "Accepted" | "Declined" | "Revoked" | "Ghosted";
  joiningConfirmed: boolean;
  remarks: string;
}

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "Extended", label: "Extended" },
  { value: "Negotiation", label: "Negotiation" },
  { value: "Accepted", label: "Accepted" },
  { value: "Declined", label: "Declined" },
  { value: "Revoked", label: "Revoked" },
  { value: "Ghosted", label: "Ghosted" },
];

const CONFIRMED_OPTIONS = [
  { value: "", label: "All joiners" },
  { value: "yes", label: "Confirmed" },
  { value: "no", label: "Not confirmed" },
];

const toUniqueOptions = (values: string[], allLabel: string) => [
  { value: "", label: allLabel },
  ...Array.from(new Set(values.filter(Boolean)))
    .sort((a, b) => a.localeCompare(b))
    .map((v) => ({ value: v, label: v })),
];

export function OffersSection({ offers }: { offers: Offer[] }) {
  /* Table filters (only narrow the table; stats below use all offers as before) */
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [confirmedFilter, setConfirmedFilter] = useState("");

  const formatINR = (value: number) => {
    if (value >= 1000000) {
      return `₹${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    return `₹${value}`;
  };

  const stats = useMemo(() => {
    return {
      total: offers.length,
      extended: offers.filter((o) => o.status === "Extended").length,
      accepted: offers.filter((o) => o.status === "Accepted").length,
      negotiation: offers.filter((o) => o.status === "Negotiation").length,
      declined: offers.filter((o) => o.status === "Declined").length,
      confirmed: offers.filter((o) => o.joiningConfirmed).length,
    };
  }, [offers]);

  const positionOptions = useMemo(
    () => toUniqueOptions(offers.map((o) => o.position), "All positions"),
    [offers]
  );
  const clientOptions = useMemo(
    () => toUniqueOptions(offers.map((o) => o.client), "All clients"),
    [offers]
  );

  const visibleOffers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return offers.filter((o) => {
      const matchesSearch =
        q === "" ||
        o.candidate.toLowerCase().includes(q) ||
        o.position.toLowerCase().includes(q) ||
        o.client.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "" || o.status === statusFilter;
      const matchesPosition = positionFilter === "" || o.position === positionFilter;
      const matchesClient = clientFilter === "" || o.client === clientFilter;
      const matchesConfirmed =
        confirmedFilter === "" ||
        (confirmedFilter === "yes" ? o.joiningConfirmed : !o.joiningConfirmed);
      return matchesSearch && matchesStatus && matchesPosition && matchesClient && matchesConfirmed;
    });
  }, [offers, searchTerm, statusFilter, positionFilter, clientFilter, confirmedFilter]);

  const hasFilters =
    searchTerm !== "" ||
    statusFilter !== "" ||
    positionFilter !== "" ||
    clientFilter !== "" ||
    confirmedFilter !== "";

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setPositionFilter("");
    setClientFilter("");
    setConfirmedFilter("");
  };

  const statusColors = {
    Extended: "bg-blue-100 text-blue-800",
    Negotiation: "bg-yellow-100 text-yellow-800",
    Accepted: "bg-green-100 text-green-800",
    Declined: "bg-red-100 text-red-800",
    Revoked: "bg-red-100 text-red-800",
    Ghosted: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Offers Management</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-teal-700">{stats.total}</p>
          <p className="text-xs text-gray-500 mt-1">Total Offers</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-purple-700">{stats.extended}</p>
          <p className="text-xs text-gray-500 mt-1">Extended</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.negotiation}</p>
          <p className="text-xs text-gray-500 mt-1">Negotiation</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{stats.accepted}</p>
          <p className="text-xs text-gray-500 mt-1">Accepted</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-red-700">{stats.declined}</p>
          <p className="text-xs text-gray-500 mt-1">Declined</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
          <p className="text-xs text-gray-500 mt-1">Confirmed Joiners</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="rounded-xl border border-gray-200 bg-white p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search candidate, position, client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-9 pr-9 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 grid place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <FilterSelect
            ariaLabel="Filter by status"
            className="w-full"
            value={statusFilter}
            onChange={setStatusFilter}
            options={STATUS_OPTIONS}
          />

          <FilterSelect
            searchable
            searchPlaceholder="Search positions..."
            ariaLabel="Filter by position"
            className="w-full"
            value={positionFilter}
            onChange={setPositionFilter}
            options={positionOptions}
          />

          <FilterSelect
            searchable
            searchPlaceholder="Search clients..."
            ariaLabel="Filter by client"
            className="w-full"
            value={clientFilter}
            onChange={setClientFilter}
            options={clientOptions}
          />

          <FilterSelect
            ariaLabel="Filter by joining confirmation"
            className="w-full"
            value={confirmedFilter}
            onChange={setConfirmedFilter}
            options={CONFIRMED_OPTIONS}
          />
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <span>
            Showing <span className="font-semibold text-gray-700">{visibleOffers.length}</span> of{" "}
            {offers.length} offers
          </span>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="font-medium text-teal-700 hover:text-teal-800"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Offers Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {[
                  ["Candidate", "text-left"],
                  ["Position", "text-left"],
                  ["Client", "text-left"],
                  ["Offer Date", "text-left"],
                  ["Current CTC", "text-right"],
                  ["Offered CTC", "text-right"],
                  ["Hike %", "text-center"],
                  ["Status", "text-center"],
                  ["Expected Joining", "text-left"],
                  ["Confirmed", "text-center"],
                  ["Remarks", "text-left"],
                ].map(([h, align]) => (
                  <th
                    key={h}
                    className={`${align} py-3 px-4 text-[11px] font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleOffers.map((offer) => (
                <tr key={offer.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/70">
                  <td className="py-3 px-4 text-gray-900 font-medium whitespace-nowrap">{offer.candidate}</td>
                  <td className="py-3 px-4 text-gray-700 whitespace-nowrap">{offer.position}</td>
                  <td className="py-3 px-4 text-gray-700 whitespace-nowrap" title={offer.client}>
                    {offer.client.length > 20 ? offer.client.slice(0, 20) + "..." : offer.client}
                  </td>
                  <td className="py-3 px-4 text-gray-700 whitespace-nowrap">{offer.offerDate}</td>
                  <td className="py-3 px-4 text-right font-medium text-gray-800 whitespace-nowrap">
                    {formatINR(offer.currentCTC)}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-gray-900 whitespace-nowrap">
                    {formatINR(offer.offeredCTC)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-200 rounded-full text-xs font-medium">
                      {offer.hikePercent}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2.5 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${
                        statusColors[offer.status]
                      }`}
                    >
                      {offer.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700 whitespace-nowrap">{offer.expectedJoining}</td>
                  <td className="py-3 px-4 text-center">
                    {offer.joiningConfirmed ? (
                      <span className="text-green-600 font-semibold text-sm">✓ Yes</span>
                    ) : (
                      <span className="text-gray-400 text-sm">--</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-600 text-xs max-w-xs truncate" title={offer.remarks}>
                    {offer.remarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {visibleOffers.length === 0 && (
          <div className="text-center py-10">
            <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-sm text-gray-500">No offers match these filters.</p>
          </div>
        )}
      </div>

      {/* Offer Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Status Breakdown</h3>
          <div className="space-y-2 text-sm">
            {Object.entries(stats).map(([key, value]) => {
              if (key === "confirmed") return null;
              return (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-600 capitalize">{key}:</span>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Key Metrics</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Acceptance Rate:</span>
              <span className="font-medium text-gray-900">
                {stats.total > 0 ? ((stats.accepted / stats.total) * 100).toFixed(1) : 0}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Confirmed Joining Rate:</span>
              <span className="font-medium text-gray-900">
                {stats.accepted > 0
                  ? ((stats.confirmed / stats.accepted) * 100).toFixed(1)
                  : 0}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Hike %:</span>
              <span className="font-medium text-gray-900">
                {offers.length > 0
                  ? (offers.reduce((sum, o) => sum + o.hikePercent, 0) / offers.length).toFixed(1)
                  : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}