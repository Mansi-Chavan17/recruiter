import { useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import { X, Users } from "lucide-react";
import { positionService } from "../../services/positionService";

type Props = {
  position: { id: string | number; positionName: string };
  onClose: () => void;
};

/* ---- teal react-select styles ---- */
const tealSelectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: "40px",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    borderColor: state.isFocused ? "#0d9488" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(13, 148, 136, 0.25)" : "none",
    "&:hover": { borderColor: "#0d9488" },
  }),
  placeholder: (base: any) => ({ ...base, color: "#9ca3af" }),
  menu: (base: any) => ({ ...base, fontSize: "0.875rem", zIndex: 9999 }),
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#0d9488"
      : state.isFocused
      ? "#f3f4f6"
      : "white",
    color: state.isSelected ? "white" : "#111827",
    cursor: "pointer",
    "&:active": { backgroundColor: "#e5e7eb" },
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "#e5e7eb",
    borderRadius: "0.375rem",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "#374151",
    fontSize: "0.8125rem",
    fontWeight: 500,
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: "#6b7280",
    borderRadius: "0 0.375rem 0.375rem 0",
    "&:hover": { backgroundColor: "#d1d5db", color: "#111827" },
  }),
};

const TagRecruitersModal = ({ position, onClose }: Props) => {
  const [selected, setSelected] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchTimeout = useRef<any>(null);

  const loadOptions = (inputValue: string, callback: any) => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (!inputValue || inputValue.trim().length < 2) {
      callback([]);
      return;
    }

    searchTimeout.current = setTimeout(async () => {
      try {
        const res: any = await positionService.fetchRecruiterAutocomplete(
          inputValue.trim()
        );
        const list = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
          ? res.data
          : [];

        callback(
          list.map((r: any) => ({
            value: String(r.id),
            label:
              r.name && r.email
                ? `${r.name} (${r.email})`
                : r.name || r.email || `Recruiter ${r.id}`,
          }))
        );
      } catch (err) {
        console.error("Recruiter autocomplete error:", err);
        callback([]);
      }
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selected.length) {
      alert("Select at least one recruiter.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await positionService.tagRecruitersToPosition(
        String(position.id),
        selected.map((opt) => String(opt.value))
      );

      if (response.status === 200 || response.status === 201) {
        alert(response.message || "Recruiters tagged to the position.");
        onClose();
      } else {
        alert(response.message || "Could not tag the recruiters.");
      }
    } catch (error: any) {
      console.error("Error tagging recruiters:", error);
      alert(
        error?.response?.data?.message ||
          "Could not tag the recruiters. Try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 sm:p-4">
      <div className="bg-white w-full sm:max-w-md h-auto sm:max-h-[90vh] rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 flex justify-between items-center px-5 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Tag recruiters
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Assign recruiters to this position
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="h-8 w-8 grid place-items-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-5">
            {/* Position name (read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position name</label>
              <input
                type="text"
                readOnly
                value={position.positionName}
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 cursor-default focus:outline-none"
              />
            </div>

            {/* Recruiter search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recruiters <span className="text-red-500">*</span>
              </label>
              <AsyncSelect
                isMulti
                cacheOptions
                defaultOptions={false}
                loadOptions={loadOptions}
                value={selected}
                onChange={(opts: any) => setSelected(opts ? [...opts] : [])}
                placeholder="Search by name or email..."
                noOptionsMessage={({ inputValue }) =>
                  !inputValue || inputValue.length < 2
                    ? "Type at least 2 characters"
                    : "No recruiters found"
                }
                loadingMessage={() => "Searching..."}
                styles={tealSelectStyles}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
              />
              <p className="text-xs text-gray-500 mt-1.5">
                You can select more than one recruiter.
              </p>
            </div>

            {/* Selected count */}
            {selected.length > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700 font-medium">
                  {selected.length} recruiter{selected.length !== 1 ? "s" : ""} selected
                </span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="shrink-0 flex gap-3 px-5 sm:px-6 py-3.5 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none sm:ml-auto h-10 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || selected.length === 0}
              className="flex-1 sm:flex-none h-10 px-5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Tagging..." : "Tag recruiters"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TagRecruitersModal;