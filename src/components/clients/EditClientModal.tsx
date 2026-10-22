// src/components/clients/EditClientModal.tsx
// Edits the client profile fields the CRM update API accepts:
// HQ, status, website, number of employees and description.

import { useEffect, useState } from "react";
import { crmService } from "../../services/crmService";
import type { Client } from "../../types/crm";

type EditClientModalProps = {
  open: boolean;
  client: Client | null;
  onClose: () => void;
  onSaved: (client: Client) => void;
};

type EditForm = {
  hq: string;
  clientStatus: string;
  website: string;
  noOfEmployees: string;
  description: string;
};

const STATUS_OPTIONS = ["Active", "Inactive", "New"];

export default function EditClientModal({ open, client, onClose, onSaved }: EditClientModalProps) {
  const [form, setForm] = useState<EditForm>({
    hq: "", clientStatus: "Active", website: "", noOfEmployees: "", description: "",
  });
  const [saving, setSaving] = useState(false);

  // Start from the client's current values every time the popup opens
  useEffect(() => {
    if (!open || !client) return;
    setForm({
      hq: client.hq === "--" ? "" : client.hq,
      clientStatus: client.status,
      website: client.website,
      noOfEmployees: client.noOfEmployees ? String(client.noOfEmployees) : "",
      description: client.businessDescription,
    });
  }, [open, client]);

  if (!open || !client) return null;

  const set = (field: keyof EditForm, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const employeesValid = form.noOfEmployees === "" || /^\d+$/.test(form.noOfEmployees.trim());
  const canSave = employeesValid && !saving;

  const handleSave = async () => {
    if (!canSave) return;
    const employees = Number(form.noOfEmployees) || 0;
    const payload = {
      hq: form.hq.trim(),
      clientStatus: form.clientStatus,
      website: form.website.trim(),
      noOfEmployees: employees,
      description: form.description.trim(),
    };

    setSaving(true);
    try {
      const res = await crmService.updateClient(client.id, payload);
      if (!res.success) throw new Error(res.message || "Update failed");

      // The API returns only some fields, so fill the rest from what was sent
      onSaved({
        ...client,
        hq: (res.data?.hq ?? payload.hq) || "--",
        status: (res.data?.status ?? payload.clientStatus) as Client["status"],
        website: res.data?.website ?? payload.website,
        businessDescription: payload.description,
        noOfEmployees: employees,
        companySize: employees > 0 ? String(employees) : "",
      });
      onClose();
    } catch (err: any) {
      console.error("Failed to update client:", err);
      alert(err?.response?.data?.message || "Could not update the client. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500";
  const labelClass = "block text-xs font-medium text-gray-500 mb-1";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Edit Client</h3>
            <p className="text-xs text-gray-500 mt-0.5">{client.name}</p>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none" aria-label="Close">&times;</button>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Headquarters</label>
            <input type="text" value={form.hq} onChange={(e) => set("hq", e.target.value)} className={inputClass} placeholder="e.g. Mumbai" />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select value={form.clientStatus} onChange={(e) => set("clientStatus", e.target.value)} className={inputClass}>
              {(STATUS_OPTIONS.includes(form.clientStatus) ? STATUS_OPTIONS : [form.clientStatus, ...STATUS_OPTIONS]).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Website</label>
            <input type="text" value={form.website} onChange={(e) => set("website", e.target.value)} className={inputClass} placeholder="e.g. https://example.com" />
          </div>
          <div>
            <label className={labelClass}>No. of Employees</label>
            <input
              type="text"
              inputMode="numeric"
              value={form.noOfEmployees}
              onChange={(e) => set("noOfEmployees", e.target.value)}
              className={`${inputClass} ${employeesValid ? "" : "border-red-300"}`}
              placeholder="e.g. 500"
            />
            {!employeesValid && <p className="text-xs text-red-600 mt-1">Enter a whole number.</p>}
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Business Description</label>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} className={inputClass} placeholder="What the company does — product lines, services, verticals" />
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
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}