// src/components/clients/AddClientModal.tsx
// The Add Client form, shared by the CRM page and the create-position wizard.
// It renders as a popup above whatever page opened it, so it never navigates.

import { useEffect, useState } from "react";
import { crmService } from "../../services/crmService";
import type { Client } from "../../types/crm";

const emptyClient: Omit<Client, "id"> = {
  name: "", industry: "", hq: "", website: "", companySize: "", usp: "", fundingStage: "",
  investors: "", productLines: "", businessDescription: "", spocRecruiters: [],
  status: "Active",
  clientContact: { name: "", email: "", phone: "" },
  contractType: "Retainer", feeStructure: "", contractStart: "", contractEnd: "",
  totalPositions: 0, placements: 0, activePositions: 0, lastPlacementDate: "",
};

const industryOptions = ["IT Services", "BFSI", "Telecom", "Banking", "Consulting", "Healthcare", "E-commerce", "Manufacturing"];

type AddClientModalProps = {
  open: boolean;
  onClose: () => void;
  onCreated: (client: Client) => void;
  initialName?: string;
};

export default function AddClientModal({
  open,
  onClose,
  onCreated,
  initialName = "",
}: AddClientModalProps) {
  const [newClient, setNewClient] = useState<Omit<Client, "id">>(emptyClient);
  const [industrySearch, setIndustrySearch] = useState("");
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [recruiters, setRecruiters] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  // Start from a clean form every time the popup opens.
  useEffect(() => {
    if (!open) return;
    setNewClient({ ...emptyClient, name: initialName });
    setIndustrySearch("");
    setShowIndustryDropdown(false);
    crmService
      .fetchRecruiters()
      .then((res) => setRecruiters(res.data))
      .catch((err) => console.error("Failed to load recruiters:", err));
  }, [open, initialName]);

  if (!open) return null;

  const updateField = (field: string, value: string | string[]) => {
    if (field.startsWith("clientContact.")) {
      const key = field.split(".")[1] as keyof Client["clientContact"];
      setNewClient((prev) => ({ ...prev, clientContact: { ...prev.clientContact, [key]: value as string } }));
    } else {
      setNewClient((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleAddSPOC = () => {
    setNewClient((prev) => ({ ...prev, spocRecruiters: [...prev.spocRecruiters, ""] }));
  };

  const handleRemoveSPOC = (index: number) => {
    setNewClient((prev) => ({
      ...prev,
      spocRecruiters: prev.spocRecruiters.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateSPOC = (index: number, value: string) => {
    setNewClient((prev) => {
      const updated = [...prev.spocRecruiters];
      updated[index] = value;
      return { ...prev, spocRecruiters: updated };
    });
  };

  const handleSave = async () => {
    if (!newClient.name.trim() || !newClient.industry) return;
    setSaving(true);
    try {
      const res = await crmService.createClient({
        ...newClient,
        name: newClient.name.trim(),
        spocRecruiters: newClient.spocRecruiters.filter(Boolean),
      });
      onCreated(res.data);
      onClose();
    } catch (err) {
      console.error("Failed to add client:", err);
      alert("Could not add the client. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500";
  const labelClass = "block text-xs font-medium text-gray-500 mb-1";
  const canSave = !!newClient.name.trim() && !!newClient.industry && !saving;

  return (
    // z-[60] keeps this above the position wizard, which sits at z-50.
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Add New Client</h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none" aria-label="Close">&times;</button>
        </div>

        <div className="p-6 space-y-6">
          {/* Company Identity */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              Company Identity
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Company Name *</label>
                <input type="text" value={newClient.name} onChange={(e) => updateField("name", e.target.value)} className={inputClass} placeholder="e.g. Infosys" />
              </div>
              <div>
                <label className={labelClass}>Industry (Searchable) *</label>
                <div className="relative">
                  <input
                    type="text"
                    value={industrySearch}
                    onChange={(e) => setIndustrySearch(e.target.value)}
                    onFocus={() => setShowIndustryDropdown(true)}
                    placeholder="Search industry..."
                    className={inputClass}
                  />
                  {showIndustryDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      {industryOptions
                        .filter((ind) => ind.toLowerCase().includes(industrySearch.toLowerCase()))
                        .map((ind) => (
                          <button
                            type="button"
                            key={ind}
                            onClick={() => {
                              setIndustrySearch("");
                              updateField("industry", ind);
                              setShowIndustryDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-teal-50 text-sm text-gray-700"
                          >
                            {ind}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
                {newClient.industry && <p className="text-xs text-teal-600 mt-1">Selected: {newClient.industry}</p>}
              </div>
              <div>
                <label className={labelClass}>Headquarters</label>
                <input type="text" value={newClient.hq} onChange={(e) => updateField("hq", e.target.value)} className={inputClass} placeholder="e.g. Bangalore" />
              </div>
              <div>
                <label className={labelClass}>Website</label>
                <input type="text" value={newClient.website} onChange={(e) => updateField("website", e.target.value)} className={inputClass} placeholder="e.g. www.infosys.com" />
              </div>
              <div>
                <label className={labelClass}>Company Size</label>
                <input type="text" value={newClient.companySize} onChange={(e) => updateField("companySize", e.target.value)} className={inputClass} placeholder="e.g. 300,000+" />
              </div>
              <div>
                <label className={labelClass}>Funding Stage</label>
                <select value={newClient.fundingStage} onChange={(e) => updateField("fundingStage", e.target.value)} className={inputClass}>
                  <option value="">Select...</option>
                  <option>Bootstrapped</option><option>Seed</option><option>Series A</option><option>Series B</option>
                  <option>Series C</option><option>Series D</option><option>Series E+</option><option>Public</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <select value={newClient.status} onChange={(e) => updateField("status", e.target.value)} className={inputClass}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="New">New</option>
                </select>
              </div>
            </div>
          </div>

          {/* USP & Business */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              USP &amp; Business
            </h4>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>USP &amp; Positioning</label>
                <textarea value={newClient.usp} onChange={(e) => updateField("usp", e.target.value)} rows={2} className={inputClass} placeholder="What makes this client attractive to candidates?" />
              </div>
              <div>
                <label className={labelClass}>Business Description</label>
                <textarea value={newClient.businessDescription} onChange={(e) => updateField("businessDescription", e.target.value)} rows={2} className={inputClass} placeholder="What the company does — product lines, services, verticals" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Product Lines</label>
                  <input type="text" value={newClient.productLines} onChange={(e) => updateField("productLines", e.target.value)} className={inputClass} placeholder="e.g. Finacle, EdgeVerve" />
                </div>
                <div>
                  <label className={labelClass}>Key Investors</label>
                  <input type="text" value={newClient.investors} onChange={(e) => updateField("investors", e.target.value)} className={inputClass} placeholder="e.g. Promoter holding ~15%" />
                </div>
              </div>
            </div>
          </div>

          {/* Hiring Relationship */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              Hiring Relationship
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelClass}>SPOC Recruiters</label>
                <div className="space-y-2">
                  {newClient.spocRecruiters.map((recruiter, idx) => (
                    <div key={idx} className="flex gap-2">
                      <select
                        value={recruiter}
                        onChange={(e) => handleUpdateSPOC(idx, e.target.value)}
                        className={`${inputClass} flex-1`}
                      >
                        <option value="">Select Recruiter...</option>
                        {recruiters.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <button
                        type="button"
                        onClick={() => handleRemoveSPOC(idx)}
                        className="px-3 py-2 text-xs font-medium rounded-md border border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddSPOC}
                    className="px-3 py-2 text-xs font-medium rounded-md border border-teal-300 text-teal-600 hover:bg-teal-50"
                  >
                    + Add Another Recruiter
                  </button>
                </div>
              </div>
              <div>
                <label className={labelClass}>Contract Type</label>
                <select value={newClient.contractType} onChange={(e) => updateField("contractType", e.target.value)} className={inputClass}>
                  <option>Retainer</option><option>Contingency</option><option>RPO</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Fee Structure</label>
                <input type="text" value={newClient.feeStructure} onChange={(e) => updateField("feeStructure", e.target.value)} className={inputClass} placeholder="e.g. 8.33% of Annual CTC" />
              </div>
              <div>
                <label className={labelClass}>Contract Start</label>
                <input type="date" value={newClient.contractStart} onChange={(e) => updateField("contractStart", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Contract End</label>
                <input type="date" value={newClient.contractEnd} onChange={(e) => updateField("contractEnd", e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Engagement Metrics */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              Engagement Metrics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Total Positions</label>
                <input type="number" min={0} value={newClient.totalPositions} onChange={(e) => setNewClient((prev) => ({ ...prev, totalPositions: Number(e.target.value) || 0 }))} className={inputClass} placeholder="e.g. 12" />
              </div>
              <div>
                <label className={labelClass}>Placements</label>
                <input type="number" min={0} value={newClient.placements} onChange={(e) => setNewClient((prev) => ({ ...prev, placements: Number(e.target.value) || 0 }))} className={inputClass} placeholder="e.g. 8" />
              </div>
              <div>
                <label className={labelClass}>Active Positions</label>
                <input type="number" min={0} value={newClient.activePositions} onChange={(e) => setNewClient((prev) => ({ ...prev, activePositions: Number(e.target.value) || 0 }))} className={inputClass} placeholder="e.g. 4" />
              </div>
              <div>
                <label className={labelClass}>Last Placement Date</label>
                <input type="date" value={newClient.lastPlacementDate} onChange={(e) => updateField("lastPlacementDate", e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Client-side Contact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              Client-side Contact
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Contact Name</label>
                <input type="text" value={newClient.clientContact.name} onChange={(e) => updateField("clientContact.name", e.target.value)} className={inputClass} placeholder="e.g. Sunita Rao" />
              </div>
              <div>
                <label className={labelClass}>Contact Email</label>
                <input type="email" value={newClient.clientContact.email} onChange={(e) => updateField("clientContact.email", e.target.value)} className={inputClass} placeholder="e.g. sunita@company.com" />
              </div>
              <div>
                <label className={labelClass}>Contact Phone</label>
                <input type="tel" value={newClient.clientContact.phone} onChange={(e) => updateField("clientContact.phone", e.target.value)} className={inputClass} placeholder="e.g. +91-22-1234-5678" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className="px-4 py-2 text-sm font-semibold rounded-md bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {saving ? "Adding..." : "Add Client"}
          </button>
        </div>
      </div>
    </div>
  );
}