import { useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import { positionService } from "../../services/positionService";

type Props = {
  position: { id: string | number; positionName: string };
  onClose: () => void;
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
      <div className="bg-white w-full sm:max-w-md h-[70vh] sm:h-auto sm:max-h-[90vh] rounded-t-2xl sm:rounded-lg shadow-xl flex flex-col">
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Tag recruiters
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position name
              </label>
              <input
                type="text"
                readOnly
                value={position.positionName}
                className="w-full h-10 px-3 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>

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
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "40px",
                    borderColor: "#d1d5db",
                    "&:hover": { borderColor: "#3b82f6" },
                  }),
                  menu: (base) => ({ ...base, zIndex: 9999 }),
                }}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
              />
              <p className="text-xs text-gray-500 mt-1">
                You can pick more than one recruiter.
              </p>
            </div>
          </div>

          <div className="flex gap-3 px-4 sm:px-6 py-3 border-t border-gray-200 shrink-0 bg-white sm:rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none sm:ml-auto px-4 h-11 sm:h-10 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sm:flex-none px-4 h-11 sm:h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
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