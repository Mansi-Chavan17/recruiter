import { useMemo } from "react";

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

export function OffersSection({ offers }: { offers: Offer[] }) {
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
      <h2 className="text-xl font-bold text-gray-800">Offers Management</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-6 gap-3">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
          <p className="text-xs text-gray-500 mt-1">Total Offers</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-purple-700">{stats.extended}</p>
          <p className="text-xs text-gray-500 mt-1">Extended</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.negotiation}</p>
          <p className="text-xs text-gray-500 mt-1">Negotiation</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{stats.accepted}</p>
          <p className="text-xs text-gray-500 mt-1">Accepted</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-red-700">{stats.declined}</p>
          <p className="text-xs text-gray-500 mt-1">Declined</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
          <p className="text-xs text-gray-500 mt-1">Confirmed Joiners</p>
        </div>
      </div>

      {/* Offers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Candidate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Position</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Client</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Offer Date</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Current CTC</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Offered CTC</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Hike %</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Expected Joining</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Confirmed</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800 font-medium">{offer.candidate}</td>
                  <td className="py-3 px-4 text-gray-700">{offer.position}</td>
                  <td className="py-3 px-4 text-gray-700">
                    {offer.client.length > 20 ? offer.client.slice(0, 20) + "..." : offer.client}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{offer.offerDate}</td>
                  <td className="py-3 px-4 text-right font-medium text-gray-800">
                    {formatINR(offer.currentCTC)}
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-gray-800 font-bold">
                    {formatINR(offer.offeredCTC)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      {offer.hikePercent}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        statusColors[offer.status]
                      }`}
                    >
                      {offer.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{offer.expectedJoining}</td>
                  <td className="py-3 px-4 text-center">
                    {offer.joiningConfirmed ? (
                      <span className="text-green-600 font-bold text-sm">✓ Yes</span>
                    ) : (
                      <span className="text-gray-400 text-sm">--</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-xs max-w-xs truncate">
                    {offer.remarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Offer Status Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Status Breakdown</h3>
          <div className="space-y-2 text-sm">
            {Object.entries(stats).map(([key, value]) => {
              if (key === "confirmed") return null;
              return (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-600 capitalize">{key}:</span>
                  <span className="font-medium text-gray-800">{value}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Key Metrics</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Acceptance Rate:</span>
              <span className="font-medium text-gray-800">
                {stats.total > 0 ? ((stats.accepted / stats.total) * 100).toFixed(1) : 0}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Confirmed Joining Rate:</span>
              <span className="font-medium text-gray-800">
                {stats.accepted > 0
                  ? ((stats.confirmed / stats.accepted) * 100).toFixed(1)
                  : 0}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Hike %:</span>
              <span className="font-medium text-gray-800">
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