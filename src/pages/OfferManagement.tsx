import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import Header from "../components/Header";
const OffersTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [groupBy, setGroupBy] = useState("none");

  // Sample data
  const [offers, setOffers] = useState([
    {
      id: 1,
      positionName: "Senior Frontend Developer",
      candidateName: "John Smith",
      clientName: "TechCorp Inc",
      offerReleasedDate: "2025-06-15",
      joiningDate: "2025-07-01",
      status: "Accepted",
      update0to10: "yes",
      update20to30: "yes",
      update30to40: "no response",
      update40to50: "no",
      update50to60: "no response",
      update60to70: "no response",
    },
    {
      id: 2,
      positionName: "Product Manager",
      candidateName: "Sarah Johnson",
      clientName: "StartupXYZ",
      offerReleasedDate: "2025-06-20",
      joiningDate: "2025-07-15",
      status: "Pending",
      update0to10: "yes",
      update20to30: "no",
      update30to40: "no response",
      update40to50: "no response",
      update50to60: "no response",
      update60to70: "no response",
    },
    {
      id: 3,
      positionName: "Data Scientist",
      candidateName: "Mike Chen",
      clientName: "TechCorp Inc",
      offerReleasedDate: "2025-05-10",
      joiningDate: "2025-06-01",
      status: "Joined",
      update0to10: "yes",
      update20to30: "yes",
      update30to40: "yes",
      update40to50: "yes",
      update50to60: "yes",
      update60to70: "yes",
    },
    {
      id: 4,
      positionName: "UX Designer",
      candidateName: "Emily Davis",
      clientName: "DesignStudio",
      offerReleasedDate: "2025-07-01",
      joiningDate: "2025-07-20",
      status: "Declined",
      update0to10: "no",
      update20to30: "no response",
      update30to40: "no response",
      update40to50: "no response",
      update50to60: "no response",
      update60to70: "no response",
    },
  ]);

  const updateOfferField = (offerId, field, value) => {
    setOffers(
      offers.map((offer) =>
        offer.id === offerId ? { ...offer, [field]: value } : offer
      )
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-800",
      Accepted: "bg-green-100 text-green-800",
      Declined: "bg-red-100 text-red-800",
      Joined: "bg-blue-100 text-blue-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getUpdateIcon = (value) => {
    switch (value) {
      case "yes":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "no":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      const matchesSearch =
        searchTerm === "" ||
        offer.positionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.clientName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPosition =
        positionFilter === "" ||
        offer.positionName.toLowerCase().includes(positionFilter.toLowerCase());

      const matchesClient =
        clientFilter === "" ||
        offer.clientName.toLowerCase().includes(clientFilter.toLowerCase());

      return matchesSearch && matchesPosition && matchesClient;
    });
  }, [offers, searchTerm, positionFilter, clientFilter]);

  const groupedOffers = useMemo(() => {
    if (groupBy === "client") {
      const grouped = {};
      filteredOffers.forEach((offer) => {
        if (!grouped[offer.clientName]) {
          grouped[offer.clientName] = [];
        }
        grouped[offer.clientName].push(offer);
      });
      return grouped;
    } else if (groupBy === "status") {
      const grouped = {};
      filteredOffers.forEach((offer) => {
        if (!grouped[offer.status]) {
          grouped[offer.status] = [];
        }
        grouped[offer.status].push(offer);
      });
      return grouped;
    }
    return { "All Offers": filteredOffers };
  }, [filteredOffers, groupBy]);

  const renderUpdateSelect = (offer, field, label) => (
    <div className="flex items-center justify-center space-x-2">
      {getUpdateIcon(offer[field])}
      <select
        value={offer[field]}
        onChange={(e) => updateOfferField(offer.id, field, e.target.value)}
        className="text-xs border rounded px-1 py-0.5 min-w-0"
      >
        <option value="no response">No Response</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50 ">
        <Header />
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="max-w-7xl mx-auto p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                {/* <Users className="w-6 h-6 mr-2" /> */}
                Offers Management
              </h2>

              {/* Search and Filter Bar */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search offers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Position Filter */}
                  <div>
                    <input
                      type="text"
                      placeholder="Filter by position..."
                      value={positionFilter}
                      onChange={(e) => setPositionFilter(e.target.value)}
                      className="px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Client Filter */}
                  <div>
                    <input
                      type="text"
                      placeholder="Filter by client..."
                      value={clientFilter}
                      onChange={(e) => setClientFilter(e.target.value)}
                      className="px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Group By */}
                  <div>
                    <select
                      value={groupBy}
                      onChange={(e) => setGroupBy(e.target.value)}
                      className="px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="none">No Grouping</option>
                      <option value="client">Group by Client</option>
                      <option value="status">Group by Status</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Offers Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {Object.entries(groupedOffers).map(
                  ([groupName, groupOffers]) => (
                    <div key={groupName} className="mb-6 last:mb-0">
                      {groupBy !== "none" && (
                        <div className="bg-gray-100 px-4 py-2 border-b">
                          <h3 className="font-semibold text-gray-800">
                            {groupName} ({groupOffers.length})
                          </h3>
                        </div>
                      )}

                      <div className="w-full">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Position
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Candidate
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Client
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Offer Date
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Joining Date
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                0-10d
                              </th>
                              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                20-30d
                              </th>
                              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                30-40d
                              </th>
                              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                40-50d
                              </th>
                              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                50-60d
                              </th>
                              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                60-70d
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {groupOffers.map((offer) => (
                              <tr key={offer.id} className="hover:bg-gray-50">
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {offer.positionName}
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {offer.candidateName}
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {offer.clientName}
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900 flex items-center">
                                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                                    {offer.offerReleasedDate}
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900 flex items-center">
                                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                                    {offer.joiningDate}
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <span
                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                      offer.status
                                    )}`}
                                  >
                                    {offer.status}
                                  </span>
                                </td>
                                <td className="px-2 py-4 text-center">
                                  {renderUpdateSelect(
                                    offer,
                                    "update0to10",
                                    "0-10"
                                  )}
                                </td>
                                <td className="px-2 py-4 text-center">
                                  {renderUpdateSelect(
                                    offer,
                                    "update20to30",
                                    "20-30"
                                  )}
                                </td>
                                <td className="px-2 py-4 text-center">
                                  {renderUpdateSelect(
                                    offer,
                                    "update30to40",
                                    "30-40"
                                  )}
                                </td>
                                <td className="px-2 py-4 text-center">
                                  {renderUpdateSelect(
                                    offer,
                                    "update40to50",
                                    "40-50"
                                  )}
                                </td>
                                <td className="px-2 py-4 text-center">
                                  {renderUpdateSelect(
                                    offer,
                                    "update50to60",
                                    "50-60"
                                  )}
                                </td>
                                <td className="px-2 py-4 text-center">
                                  {renderUpdateSelect(
                                    offer,
                                    "update60to70",
                                    "60-70"
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )
                )}

                {filteredOffers.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      No offers found matching your criteria.
                    </p>
                  </div>
                )}
              </div>

              {/* Summary Stats */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="text-sm font-medium text-gray-500">
                    Total Offers
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {filteredOffers.length}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="text-sm font-medium text-gray-500">
                    Pending
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {
                      filteredOffers.filter((o) => o.status === "Pending")
                        .length
                    }
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="text-sm font-medium text-gray-500">
                    Accepted
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {
                      filteredOffers.filter((o) => o.status === "Accepted")
                        .length
                    }
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="text-sm font-medium text-gray-500">
                    Joined
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {filteredOffers.filter((o) => o.status === "Joined").length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OffersTab;
