import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const ClientManagement = () => {
  const [activeTab, setActiveTab] = useState("management");
  const [showClientForm, setShowClientForm] = useState(false);
  const [showSpocForm, setShowSpocForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClientDetails, setShowClientDetails] = useState(false);
  const [showSpocDetails, setShowSpocDetails] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  // Sample clients data
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "TechCorp Solutions",
      industry: "Technology",
      hrName: "Rajesh Kumar",
      hrEmail: "rajesh.kumar@techcorp.com",
      hrPhone: "+91-9865432100",
      lakshSpoc: "Priya Sharma",
      recruiter: "Amit Singh",
      recruiters: ["Amit Singh", "Neha Agarwal", "Vikram Rao"],
      activePositions: 3,
      status: "Active",
      team: "Team Alpha",
      website: "www.techcorpsolutions.com",
      contract: "contract_techcorp.pdf",
      rates: "15-20%",
      topPlayers: "TCS, Infosys, Wipro",
      annualTurnover: "500 Cr",
      noOfEmployees: "2500",
      companyCulture: "Innovation-driven, collaborative work environment",
      usp: "AI-powered solutions, 24/7 support",
      newUpdates: "Series B funding of $50M raised in Q1 2025",
      managementHighlights:
        "CEO: Dr. Anil Verma (ex-Google), experienced leadership team",
    },
    {
      id: 2,
      name: "Global Finance Inc",
      industry: "Finance",
      hrName: "Sneha Patel",
      hrEmail: "sneha.patel@globalfinance.com",
      hrPhone: "+91-9876543211",
      lakshSpoc: "Rahul Gupta",
      recruiter: "Neha Agarwal",
      recruiters: ["Neha Agarwal", "Rohit Sharma"],
      activePositions: 2,
      status: "Active",
      team: "Team B",
      website: "www.globalfinance.com",
      contract: "contract_globalfinance.pdf",
      rates: "12-18%",
      topPlayers: "HDFC, ICICI, Axis Bank",
      annualTurnover: "800 Cr",
      noOfEmployees: "3500",
      companyCulture: "Customer-first approach, integrity and transparency",
      usp: "Global reach, personalized financial solutions",
      newUpdates: "IPO planned for Q3 2025",
      managementHighlights:
        "CFO: Meera Reddy (ex-Goldman Sachs), strong financial expertise",
    },
    {
      id: 2,
      name: "Global Finance Inc",
      industry: "Finance",
      hrName: "Sneha Patel",
      hrEmail: "sneha.patel@globalfinance.com",
      hrPhone: "+91-9876543211",
      lakshSpoc: "Rahul Gupta",
      recruiter: "Neha Agarwal",
      recruiters: ["Neha Agarwal", "Rohit Sharma"],
      activePositions: 2,
      status: "Active",
      team: "Team B",
      website: "www.globalfinance.com",
      contract: "contract_globalfinance.pdf",
      rates: "12-18%",
      topPlayers: "HDFC, ICICI, Axis Bank",
      annualTurnover: "800 Cr",
      noOfEmployees: "3500",
      companyCulture: "Customer-first approach, integrity and transparency",
      usp: "Global reach, personalized financial solutions",
      newUpdates: "IPO planned for Q3 2025",
      managementHighlights:
        "CFO: Meera Reddy (ex-Goldman Sachs), strong financial expertise",
    },
    {
      id: 2,
      name: "Global Finance Inc",
      industry: "Finance",
      hrName: "Sneha Patel",
      hrEmail: "sneha.patel@globalfinance.com",
      hrPhone: "+91-9876543211",
      lakshSpoc: "Rahul Gupta",
      recruiter: "Neha Agarwal",
      recruiters: ["Neha Agarwal", "Rohit Sharma"],
      activePositions: 2,
      status: "Active",
      team: "Team B",
      website: "www.globalfinance.com",
      contract: "contract_globalfinance.pdf",
      rates: "12-18%",
      topPlayers: "HDFC, ICICI, Axis Bank",
      annualTurnover: "800 Cr",
      noOfEmployees: "3500",
      companyCulture: "Customer-first approach, integrity and transparency",
      usp: "Global reach, personalized financial solutions",
      newUpdates: "IPO planned for Q3 2025",
      managementHighlights:
        "CFO: Meera Reddy (ex-Goldman Sachs), strong financial expertise",
    },
    {
      id: 2,
      name: "Global Finance Inc",
      industry: "Finance",
      hrName: "Sneha Patel",
      hrEmail: "sneha.patel@globalfinance.com",
      hrPhone: "+91-9876543211",
      lakshSpoc: "Rahul Gupta",
      recruiter: "Neha Agarwal",
      recruiters: ["Neha Agarwal", "Rohit Sharma"],
      activePositions: 2,
      status: "Active",
      team: "Team B",
      website: "www.globalfinance.com",
      contract: "contract_globalfinance.pdf",
      rates: "12-18%",
      topPlayers: "HDFC, ICICI, Axis Bank",
      annualTurnover: "800 Cr",
      noOfEmployees: "3500",
      companyCulture: "Customer-first approach, integrity and transparency",
      usp: "Global reach, personalized financial solutions",
      newUpdates: "IPO planned for Q3 2025",
      managementHighlights:
        "CFO: Meera Reddy (ex-Goldman Sachs), strong financial expertise",
    },
    {
      id: 2,
      name: "Global Finance Inc",
      industry: "Finance",
      hrName: "Sneha Patel",
      hrEmail: "sneha.patel@globalfinance.com",
      hrPhone: "+91-9876543211",
      lakshSpoc: "Rahul Gupta",
      recruiter: "Neha Agarwal",
      recruiters: ["Neha Agarwal", "Rohit Sharma"],
      activePositions: 2,
      status: "Active",
      team: "Team B",
      website: "www.globalfinance.com",
      contract: "contract_globalfinance.pdf",
      rates: "12-18%",
      topPlayers: "HDFC, ICICI, Axis Bank",
      annualTurnover: "800 Cr",
      noOfEmployees: "3500",
      companyCulture: "Customer-first approach, integrity and transparency",
      usp: "Global reach, personalized financial solutions",
      newUpdates: "IPO planned for Q3 2025",
      managementHighlights:
        "CFO: Meera Reddy (ex-Goldman Sachs), strong financial expertise",
    },
    {
      id: 2,
      name: "Global Finance Inc",
      industry: "Finance",
      hrName: "Sneha Patel",
      hrEmail: "sneha.patel@globalfinance.com",
      hrPhone: "+91-9876543211",
      lakshSpoc: "Rahul Gupta",
      recruiter: "Neha Agarwal",
      recruiters: ["Neha Agarwal", "Rohit Sharma"],
      activePositions: 2,
      status: "Active",
      team: "Team B",
      website: "www.globalfinance.com",
      contract: "contract_globalfinance.pdf",
      rates: "12-18%",
      topPlayers: "HDFC, ICICI, Axis Bank",
      annualTurnover: "800 Cr",
      noOfEmployees: "3500",
      companyCulture: "Customer-first approach, integrity and transparency",
      usp: "Global reach, personalized financial solutions",
      newUpdates: "IPO planned for Q3 2025",
      managementHighlights:
        "CFO: Meera Reddy (ex-Goldman Sachs), strong financial expertise",
    },
    {
      id: 2,
      name: "Global Finance Inc",
      industry: "Finance",
      hrName: "Sneha Patel",
      hrEmail: "sneha.patel@globalfinance.com",
      hrPhone: "+91-9876543211",
      lakshSpoc: "Rahul Gupta",
      recruiter: "Neha Agarwal",
      recruiters: ["Neha Agarwal", "Rohit Sharma"],
      activePositions: 2,
      status: "Active",
      team: "Team B",
      website: "www.globalfinance.com",
      contract: "contract_globalfinance.pdf",
      rates: "12-18%",
      topPlayers: "HDFC, ICICI, Axis Bank",
      annualTurnover: "800 Cr",
      noOfEmployees: "3500",
      companyCulture: "Customer-first approach, integrity and transparency",
      usp: "Global reach, personalized financial solutions",
      newUpdates: "IPO planned for Q3 2025",
      managementHighlights:
        "CFO: Meera Reddy (ex-Goldman Sachs), strong financial expertise",
    },
    {
      id: 2,
      name: "Global Finance Inc",
      industry: "Finance",
      hrName: "Sneha Patel",
      hrEmail: "sneha.patel@globalfinance.com",
      hrPhone: "+91-9876543211",
      lakshSpoc: "Rahul Gupta",
      recruiter: "Neha Agarwal",
      recruiters: ["Neha Agarwal", "Rohit Sharma"],
      activePositions: 2,
      status: "Active",
      team: "Team B",
      website: "www.globalfinance.com",
      contract: "contract_globalfinance.pdf",
      rates: "12-18%",
      topPlayers: "HDFC, ICICI, Axis Bank",
      annualTurnover: "800 Cr",
      noOfEmployees: "3500",
      companyCulture: "Customer-first approach, integrity and transparency",
      usp: "Global reach, personalized financial solutions",
      newUpdates: "IPO planned for Q3 2025",
      managementHighlights:
        "CFO: Meera Reddy (ex-Goldman Sachs), strong financial expertise",
    },
  ]);

  // Sample recruiters data for dropdown
  const recruiters = [
    { id: 1, name: "Amit Singh" },
    { id: 2, name: "Neha Agarwal" },
    { id: 3, name: "Rohit Sharma" },
    { id: 4, name: "Priya Gupta" },
  ];

  const handleAddClient = () => {
    console.log("Adding new client...");
    setShowClientForm(false);
  };

  const handleAddSpoc = () => {
    console.log("Adding new SPOC...");
    setShowSpocForm(false);
  };

  const handleRowClick = (client) => {
    setSelectedClient(client);
    if (activeTab === "management") {
      setShowClientDetails(true);
    } else {
      setShowSpocDetails(true);
    }
  };

  const handleCloseDetails = () => {
    setShowClientDetails(false);
    setShowSpocDetails(false);
    setSelectedClient(null);
    setIsEditingDetails(false);
  };

  useEffect(() => {
    if (selectedClient) {
      setEditFormData(selectedClient);
      setIsEditingDetails(false);
    }
  }, [selectedClient]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("management")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "management"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Client Management
                </button>
                <button
                  onClick={() => setActiveTab("sop")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "sop"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Client SPOC
                </button>
              </nav>
              <button
                onClick={() =>
                  activeTab === "management"
                    ? setShowClientForm(true)
                    : setShowSpocForm(true)
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <span className="mr-2">+</span>
                {activeTab === "management" ? "Add Client" : "Add SPOC"}
              </button>
            </div>

            <div className="mb-6">
              <div className="border-b border-gray-200"></div>
            </div>

            {/* Client Management Tab */}
            {activeTab === "management" && (
              <div className="bg-white rounded-lg shadow border">
                <div className="p-4 border-b">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-3 text-gray-400">
                        🔍
                      </span>
                      <input
                        type="text"
                        placeholder="Search clients..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client HR
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          HR Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Laksh SPOC
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recruiter
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Active Positions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {clients.map((client) => (
                        <tr
                          key={client.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleRowClick(client)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {client.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {client.industry}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {client.hrName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {client.hrEmail}
                            </div>
                            <div className="text-sm text-gray-500">
                              {client.hrPhone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {client.lakshSpoc}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {client.recruiter}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {client.activePositions}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Client Details Modal */}
            {showClientDetails && selectedClient && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold text-gray-900">
                      Client Information
                    </h3>
                    <button
                      onClick={handleCloseDetails}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Client Name
                        </label>
                        {isEditingDetails ? (
                          <input
                            type="text"
                            value={editFormData?.name || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Client HR (SPOCs)
                        </label>
                        {isEditingDetails ? (
                          <input
                            type="text"
                            value={editFormData?.hrName || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                hrName: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.hrName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Contact Details
                        </label>
                        {isEditingDetails ? (
                          <div className="space-y-2">
                            <input
                              type="tel"
                              value={editFormData?.hrPhone || ""}
                              onChange={(e) =>
                                setEditFormData((prev) => ({
                                  ...prev,
                                  hrPhone: e.target.value,
                                }))
                              }
                              placeholder="Phone"
                              className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                              type="email"
                              value={editFormData?.hrEmail || ""}
                              onChange={(e) =>
                                setEditFormData((prev) => ({
                                  ...prev,
                                  hrEmail: e.target.value,
                                }))
                              }
                              placeholder="Email"
                              className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.hrPhone} | {selectedClient.hrEmail}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Laksh SPOC
                        </label>
                        {isEditingDetails ? (
                          <input
                            type="text"
                            value={editFormData?.lakshSpoc || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                lakshSpoc: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.lakshSpoc}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Laksh Team
                        </label>
                        {isEditingDetails ? (
                          <select
                            value={editFormData?.team || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                team: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Team A">Team A</option>
                            <option value="Team B">Team B</option>
                            <option value="Team C">Team C</option>
                            <option value="Team Alpha">Team Alpha</option>
                          </select>
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.team}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Client Status
                        </label>
                        {isEditingDetails ? (
                          <select
                            value={editFormData?.status || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                status: e.target.value,
                              }))
                            }
                            className="text-base border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Active">Active</option>
                            <option value="New">New</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        ) : (
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              selectedClient.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {selectedClient.status}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Website
                        </label>
                        {isEditingDetails ? (
                          <input
                            type="url"
                            value={editFormData?.website || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                website: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-base text-blue-600">
                            {selectedClient.website}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Laksh Recruiters
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {selectedClient.recruiters?.map((rec, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {rec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Contract
                        </label>
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm text-gray-900">
                            {selectedClient.contract}
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Rates
                        </label>
                        {isEditingDetails ? (
                          <input
                            type="text"
                            value={editFormData?.rates || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                rates: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.rates}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Industry
                        </label>
                        {isEditingDetails ? (
                          <select
                            value={editFormData?.industry || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                industry: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select industry...</option>
                            <option value="Technology">Technology</option>
                            <option value="Finance">Finance</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Retail">Retail</option>
                            <option value="Consulting">Consulting</option>
                            <option value="Other">Other</option>
                          </select>
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.industry}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Top Players
                        </label>
                        {isEditingDetails ? (
                          <input
                            type="text"
                            value={editFormData?.topPlayers || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                topPlayers: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.topPlayers}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Annual Turnover (Rs Cr)
                        </label>
                        {isEditingDetails ? (
                          <input
                            type="text"
                            value={editFormData?.annualTurnover || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                annualTurnover: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.annualTurnover}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          No of Employees
                        </label>
                        {isEditingDetails ? (
                          <input
                            type="text"
                            value={editFormData?.noOfEmployees || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                noOfEmployees: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.noOfEmployees}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Company Culture and Values
                      </label>
                      {isEditingDetails ? (
                        <textarea
                          value={editFormData?.companyCulture || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              companyCulture: e.target.value,
                            }))
                          }
                          rows={3}
                          className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-base text-gray-900">
                          {selectedClient.companyCulture}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        USP
                      </label>
                      {isEditingDetails ? (
                        <textarea
                          value={editFormData?.usp || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              usp: e.target.value,
                            }))
                          }
                          rows={2}
                          className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-base text-gray-900">
                          {selectedClient.usp}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        New Updates (M&A, IPO, Fundraising)
                      </label>
                      {isEditingDetails ? (
                        <textarea
                          value={editFormData?.newUpdates || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              newUpdates: e.target.value,
                            }))
                          }
                          rows={2}
                          className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-base text-gray-900">
                          {selectedClient.newUpdates}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Management Highlights
                      </label>
                      {isEditingDetails ? (
                        <textarea
                          value={editFormData?.managementHighlights || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              managementHighlights: e.target.value,
                            }))
                          }
                          rows={2}
                          className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-base text-gray-900">
                          {selectedClient.managementHighlights}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6 border-t pt-4">
                    <button
                      onClick={handleCloseDetails}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        if (isEditingDetails) {
                          handleSaveDetails();
                        } else {
                          setIsEditingDetails(true);
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {isEditingDetails ? "Save Changes" : "Edit Client"}
                    </button>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 mt-6 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Positions Assigned
                    </h2>
                    <div className="overflow-x-auto bg-white rounded-lg">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Position Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              CTC Budget
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Client SPOC
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Experience
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Laksh SPOC
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Pipeline
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">
                              Senior Full Stack Developer
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">
                              18-25 LPA
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">
                              Priya Sharma
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Open
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">
                              5-8 years
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">
                              Rajesh Kumar
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                12
                              </span>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">
                              DevOps Engineer
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">
                              15-20 LPA
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">
                              Priya Sharma
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Open
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">
                              4-6 years
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">
                              Rajesh Kumar
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                8
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SPOC Details Modal */}
            {showSpocDetails && selectedClient && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold text-gray-900">
                      SPOC's Information
                    </h3>
                    <button
                      onClick={handleCloseDetails}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          SPOC Name
                        </label>
                        {isEditingDetails ? (
                          <input
                            type="text"
                            value={editFormData?.name || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Client HR (SPOCs)
                        </label>
                        {isEditingDetails ? (
                          <input
                            type="text"
                            value={editFormData?.hrName || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                hrName: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.hrName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Contact Details
                        </label>
                        {isEditingDetails ? (
                          <div className="space-y-2">
                            <input
                              type="tel"
                              value={editFormData?.hrPhone || ""}
                              onChange={(e) =>
                                setEditFormData((prev) => ({
                                  ...prev,
                                  hrPhone: e.target.value,
                                }))
                              }
                              placeholder="Phone"
                              className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                              type="email"
                              value={editFormData?.hrEmail || ""}
                              onChange={(e) =>
                                setEditFormData((prev) => ({
                                  ...prev,
                                  hrEmail: e.target.value,
                                }))
                              }
                              placeholder="Email"
                              className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.hrPhone} | {selectedClient.hrEmail}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Laksh SPOC
                        </label>
                        {isEditingDetails ? (
                          <input
                            type="text"
                            value={editFormData?.lakshSpoc || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                lakshSpoc: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.lakshSpoc}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Laksh Team
                        </label>
                        {isEditingDetails ? (
                          <select
                            value={editFormData?.team || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                team: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Team A">Team A</option>
                            <option value="Team B">Team B</option>
                            <option value="Team C">Team C</option>
                            <option value="Team Alpha">Team Alpha</option>
                          </select>
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.team}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Client Status
                        </label>
                        {isEditingDetails ? (
                          <select
                            value={editFormData?.status || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                status: e.target.value,
                              }))
                            }
                            className="text-base border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Active">Active</option>
                            <option value="New">New</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        ) : (
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              selectedClient.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {selectedClient.status}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Website
                        </label>
                        {isEditingDetails ? (
                          <input
                            type="url"
                            value={editFormData?.website || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                website: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-base text-blue-600">
                            {selectedClient.website}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Laksh Recruiters
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {selectedClient.recruiters?.map((rec, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {rec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Contract
                        </label>
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm text-gray-900">
                            {selectedClient.contract}
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Rates
                        </label>
                        {isEditingDetails ? (
                          <input
                            type="text"
                            value={editFormData?.rates || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                rates: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.rates}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Industry
                        </label>
                        {isEditingDetails ? (
                          <select
                            value={editFormData?.industry || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                industry: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select industry...</option>
                            <option value="Technology">Technology</option>
                            <option value="Finance">Finance</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Retail">Retail</option>
                            <option value="Consulting">Consulting</option>
                            <option value="Other">Other</option>
                          </select>
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.industry}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Top Players
                        </label>
                        {isEditingDetails ? (
                          <input
                            type="text"
                            value={editFormData?.topPlayers || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                topPlayers: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.topPlayers}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Annual Turnover (Rs Cr)
                        </label>
                        {isEditingDetails ? (
                          <input
                            type="text"
                            value={editFormData?.annualTurnover || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                annualTurnover: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.annualTurnover}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          No of Employees
                        </label>
                        {isEditingDetails ? (
                          <input
                            type="text"
                            value={editFormData?.noOfEmployees || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                noOfEmployees: e.target.value,
                              }))
                            }
                            className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-base text-gray-900">
                            {selectedClient.noOfEmployees}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Company Culture and Values
                      </label>
                      {isEditingDetails ? (
                        <textarea
                          value={editFormData?.companyCulture || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              companyCulture: e.target.value,
                            }))
                          }
                          rows={3}
                          className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-base text-gray-900">
                          {selectedClient.companyCulture}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        USP
                      </label>
                      {isEditingDetails ? (
                        <textarea
                          value={editFormData?.usp || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              usp: e.target.value,
                            }))
                          }
                          rows={2}
                          className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-base text-gray-900">
                          {selectedClient.usp}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        New Updates (M&A, IPO, Fundraising)
                      </label>
                      {isEditingDetails ? (
                        <textarea
                          value={editFormData?.newUpdates || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              newUpdates: e.target.value,
                            }))
                          }
                          rows={2}
                          className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-base text-gray-900">
                          {selectedClient.newUpdates}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Management Highlights
                      </label>
                      {isEditingDetails ? (
                        <textarea
                          value={editFormData?.managementHighlights || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              managementHighlights: e.target.value,
                            }))
                          }
                          rows={2}
                          className="w-full text-base text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-base text-gray-900">
                          {selectedClient.managementHighlights}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6 border-t pt-4">
                    <button
                      onClick={handleCloseDetails}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        if (isEditingDetails) {
                          handleSaveDetails();
                        } else {
                          setIsEditingDetails(true);
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {isEditingDetails ? "Save Changes" : "Edit SPOC"}
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 mt-6 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Positions Assigned
                    </h2>
                    <div className="overflow-x-auto bg-white rounded-lg">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Position Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              CTC Budget
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Client SPOC
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Experience
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Laksh SPOC
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Pipeline
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">
                              Senior Full Stack Developer
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">
                              18-25 LPA
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">
                              Priya Sharma
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Open
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">
                              5-8 years
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">
                              Rajesh Kumar
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                12
                              </span>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">
                              DevOps Engineer
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">
                              15-20 LPA
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">
                              Priya Sharma
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Open
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">
                              4-6 years
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">
                              Rajesh Kumar
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                8
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Client SOP Tab */}
            {activeTab === "sop" && (
              <div className="bg-white rounded-lg shadow border">
                <div className="p-4 border-b">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-3 text-gray-400">
                        🔍
                      </span>
                      <input
                        type="text"
                        placeholder="Search SPOC..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 👇 Yahan scroll system lagaya gaya hai */}
                <div className="w-full">
                  <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          SPOC Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client HR
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          HR Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Laksh SPOC
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recruiter
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Active Positions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {clients.map((client) => (
                        <tr
                          key={client.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleRowClick(client)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {client.name} SPOC
                            </div>
                            <div className="text-sm text-gray-500">
                              {client.industry}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {client.hrName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {client.hrEmail}
                            </div>
                            <div className="text-sm text-gray-500">
                              {client.hrPhone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {client.lakshSpoc}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {client.recruiter}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {client.activePositions}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Add Client Form Modal */}
            {showClientForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                  <h3 className="text-lg font-semibold mb-4">Create Client</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Client Name *
                      </label>
                      <input
                        type="text"
                        name="clientName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter client name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Client HR (SPOCs)
                      </label>
                      <input
                        type="text"
                        name="clientHR"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter client HR SPOCs"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Laksh SPOC
                      </label>
                      <input
                        type="text"
                        name="lakshSpoc"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Laksh SPOC"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Laksh Team *
                      </label>
                      <select
                        name="lakshTeam"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select an option</option>
                        <option value="Team A">Team A</option>
                        <option value="Team B">Team B</option>
                        <option value="Team C">Team C</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Client Status *
                      </label>
                      <select
                        name="clientStatus"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Active">Active</option>
                        <option value="New">New</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Website *
                      </label>
                      <input
                        type="url"
                        name="website"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter website URL"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Laksh Recruiters
                      </label>
                      <select
                        name="lakshRecruiters"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        multiple
                      >
                        {recruiters.map((recruiter) => (
                          <option key={recruiter.id} value={recruiter.name}>
                            {recruiter.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Hold Ctrl/Cmd to select multiple
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contract
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          id="contract-upload"
                        />
                        <label
                          htmlFor="contract-upload"
                          className="cursor-pointer"
                        >
                          <span className="text-gray-600">
                            Drop files here or click to upload
                          </span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rates
                      </label>
                      <input
                        type="text"
                        name="rates"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter rates"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Industry *
                      </label>
                      <select
                        name="industry"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select industry...</option>
                        <option value="Technology">Technology</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Retail">Retail</option>
                        <option value="Consulting">Consulting</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Top Players
                      </label>
                      <input
                        type="text"
                        name="topPlayers"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter top players"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Annual Turnover (Rs Cr) *
                      </label>
                      <input
                        type="number"
                        name="annualTurnover"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter annual turnover"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Culture and Values
                      </label>
                      <textarea
                        name="companyCulture"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe company culture and values"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        No of Employees *
                      </label>
                      <input
                        type="number"
                        name="noOfEmployees"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter number of employees"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        USP *
                      </label>
                      <textarea
                        name="usp"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter unique selling points"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Updates (related to merger & acquisition, IPO, Fund
                        raising)
                      </label>
                      <textarea
                        name="newUpdates"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter any new updates"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Management Highlights
                      </label>
                      <textarea
                        name="managementHighlights"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter management highlights"
                      ></textarea>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setShowClientForm(false)}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleAddClient}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Add Client
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add SPOC Form Modal */}
            {showSpocForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
                  <h3 className="text-lg font-semibold mb-4">
                    Add Client SPOC
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Client SPOC *
                      </label>
                      <input
                        type="text"
                        name="clientSpoc"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter client SPOC name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        User Type *
                      </label>
                      <select
                        name="userType"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="client spoc">Client SPOC</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Client Name *
                      </label>
                      <select
                        name="clientName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select client...</option>
                        {clients.map((client) => (
                          <option key={client.id} value={client.name}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Client SPOC Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter mobile number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Laksh SPOC *
                      </label>
                      <input
                        type="text"
                        name="lakshSpoc"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Laksh SPOC"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Laksh Recruiters
                      </label>
                      <select
                        name="lakshRecruiters"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        multiple
                      >
                        {recruiters.map((recruiter) => (
                          <option key={recruiter.id} value={recruiter.name}>
                            {recruiter.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Hold Ctrl/Cmd to select multiple
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Jobs Format
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          id="jobs-format-upload"
                        />
                        <label
                          htmlFor="jobs-format-upload"
                          className="cursor-pointer"
                        >
                          <span className="text-gray-600">
                            Drop files here or click to upload
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setShowSpocForm(false)}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleAddSpoc}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Add SPOC
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;
