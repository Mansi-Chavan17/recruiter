import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  X,
} from "lucide-react";
import Header from "../components/Header";
import FilterSelect from "../components/FilterSelect";

/* UI-only constants */
const UPDATE_OPTIONS = [
  { value: "no response", label: "No Response" },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const GROUP_BY_OPTIONS = [
  { value: "none", label: "No Grouping" },
  { value: "client", label: "Group by Client" },
  { value: "status", label: "Group by Status" },
];

const updatePillClass = (value) =>
  value === "yes"
    ? "bg-green-50 text-green-700 ring-green-200"
    : value === "no"
    ? "bg-red-50 text-red-700 ring-red-200"
    : "bg-gray-50 text-gray-600 ring-gray-200";

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

  /* UI-only: dropdown options built from the offers already on the page */
  const toUniqueOptions = (values, allLabel) => [
    { value: "", label: allLabel },
    ...Array.from(new Set(values.filter(Boolean)))
      .sort((a, b) => a.localeCompare(b))
      .map((v) => ({ value: v, label: v })),
  ];
  const positionOptions = toUniqueOptions(offers.map((o) => o.positionName), "All positions");
  const clientOptions = toUniqueOptions(offers.map((o) => o.clientName), "All clients");

  const renderUpdateSelect = (offer, field, label) => (
    <div className="flex items-center justify-center gap-1.5">
      {getUpdateIcon(offer[field])}
      <FilterSelect
        ariaLabel={`${label} days update for ${offer.candidateName}`}
        className="inline-block"
        chevronClassName="h-3 w-3"
        value={offer[field]}
        onChange={(v) => updateOfferField(offer.id, field, v)}
        options={UPDATE_OPTIONS}
        buttonClassName={`inline-flex items-center gap-1 whitespace-nowrap rounded-full pl-2 pr-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset transition hover:brightness-95 ${updatePillClass(
          offer[field]
        )}`}
      />
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="md:ml-16">
          <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-5 md:p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-5">
                  Offers Management
                </h2>

                {/* Search and Filter Bar */}
                <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {/* Search Bar */}
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search offers..."
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

                    {/* Position Filter */}
                    <FilterSelect
                      searchable
                      searchPlaceholder="Search positions..."
                      ariaLabel="Filter by position"
                      className="w-full"
                      value={positionFilter}
                      onChange={setPositionFilter}
                      options={positionOptions}
                    />

                    {/* Client Filter */}
                    <FilterSelect
                      searchable
                      searchPlaceholder="Search clients..."
                      ariaLabel="Filter by client"
                      className="w-full"
                      value={clientFilter}
                      onChange={setClientFilter}
                      options={clientOptions}
                    />

                    {/* Group By */}
                    <FilterSelect
                      ariaLabel="Group by"
                      className="w-full"
                      value={groupBy}
                      onChange={setGroupBy}
                      options={GROUP_BY_OPTIONS}
                    />
                  </div>
                </div>

                {/* Offers Table */}
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  {Object.entries(groupedOffers).map(([groupName, groupOffers]) => (
                    <div key={groupName} className="border-b border-gray-200 last:border-b-0">
                      {groupBy !== "none" && (
                        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                          <h3 className="text-sm font-semibold text-gray-800">{groupName}</h3>
                          <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-gray-600 ring-1 ring-inset ring-gray-200">
                            {groupOffers.length}
                          </span>
                        </div>
                      )}

                      <div className="w-full overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              {["Position", "Candidate", "Client", "Offer Date", "Joining Date", "Status"].map((h) => (
                                <th
                                  key={h}
                                  className="px-4 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                                >
                                  {h}
                                </th>
                              ))}
                              {["0-10d", "20-30d", "30-40d", "40-50d", "50-60d", "60-70d"].map((h) => (
                                <th
                                  key={h}
                                  className="px-2 py-3 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-100">
                            {groupOffers.map((offer) => (
                              <tr key={offer.id} className="hover:bg-gray-50/70">
                                <td className="px-4 py-3.5 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{offer.positionName}</div>
                                </td>
                                <td className="px-4 py-3.5 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{offer.candidateName}</div>
                                </td>
                                <td className="px-4 py-3.5 whitespace-nowrap">
                                  <div className="text-sm text-gray-700">{offer.clientName}</div>
                                </td>
                                <td className="px-4 py-3.5 whitespace-nowrap">
                                  <div className="text-sm text-gray-700 flex items-center">
                                    <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                                    {offer.offerReleasedDate}
                                  </div>
                                </td>
                                <td className="px-4 py-3.5 whitespace-nowrap">
                                  <div className="text-sm text-gray-700 flex items-center">
                                    <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                                    {offer.joiningDate}
                                  </div>
                                </td>
                                <td className="px-4 py-3.5 whitespace-nowrap">
                                  <span
                                    className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(
                                      offer.status
                                    )}`}
                                  >
                                    {offer.status}
                                  </span>
                                </td>
                                <td className="px-2 py-3.5 text-center">{renderUpdateSelect(offer, "update0to10", "0-10")}</td>
                                <td className="px-2 py-3.5 text-center">{renderUpdateSelect(offer, "update20to30", "20-30")}</td>
                                <td className="px-2 py-3.5 text-center">{renderUpdateSelect(offer, "update30to40", "30-40")}</td>
                                <td className="px-2 py-3.5 text-center">{renderUpdateSelect(offer, "update40to50", "40-50")}</td>
                                <td className="px-2 py-3.5 text-center">{renderUpdateSelect(offer, "update50to60", "50-60")}</td>
                                <td className="px-2 py-3.5 text-center">{renderUpdateSelect(offer, "update60to70", "60-70")}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}

                  {filteredOffers.length === 0 && (
                    <div className="text-center py-12">
                      <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" strokeWidth={1.5} />
                      <p className="text-gray-500 text-sm">No offers found matching your criteria.</p>
                    </div>
                  )}
                </div>

                {/* Summary Stats */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="text-xs font-medium text-gray-500">Total Offers</div>
                    <div className="mt-1 text-2xl font-bold text-gray-900">{filteredOffers.length}</div>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="text-xs font-medium text-gray-500">Pending</div>
                    <div className="mt-1 text-2xl font-bold text-yellow-600">
                      {filteredOffers.filter((o) => o.status === "Pending").length}
                    </div>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="text-xs font-medium text-gray-500">Accepted</div>
                    <div className="mt-1 text-2xl font-bold text-green-600">
                      {filteredOffers.filter((o) => o.status === "Accepted").length}
                    </div>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="text-xs font-medium text-gray-500">Joined</div>
                    <div className="mt-1 text-2xl font-bold text-blue-600">
                      {filteredOffers.filter((o) => o.status === "Joined").length}
                    </div>
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