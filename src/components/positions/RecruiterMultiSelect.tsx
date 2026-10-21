import { useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import { Plus, X } from "lucide-react";
import { positionService } from "../../services/positionService";

export type RecruiterOption = { value: string; label: string; email?: string };

type Props = {
  value: RecruiterOption[];
  onChange: (value: RecruiterOption[]) => void;
  /** Hide this email from results (e.g. the position's main recruiter). */
  excludeEmail?: string;
};

/**
 * "+ Add Another Recruiter" button. Clicking it opens a search; each pick is
 * added to the list below the Recruiter field and can be removed.
 */
const RecruiterMultiSelect = ({ value, onChange, excludeEmail }: Props) => {
  const [picking, setPicking] = useState(false);
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

        const exclude = (excludeEmail || "").trim().toLowerCase();
        const alreadyAdded = new Set(value.map((r) => String(r.value)));

        callback(
          list
            .filter(
              (r: any) =>
                !alreadyAdded.has(String(r.id)) &&
                (!exclude || String(r.email || "").toLowerCase() !== exclude)
            )
            .map((r: any) => ({
              value: String(r.id),
              email: r.email,
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

  const add = (option: RecruiterOption | null) => {
    if (!option) return;
    if (!value.some((r) => String(r.value) === String(option.value))) {
      onChange([...value, option]);
    }
    setPicking(false);
  };

  const remove = (id: string) =>
    onChange(value.filter((r) => String(r.value) !== String(id)));

  return (
    <div className="mt-2 space-y-2">
      {value.length > 0 && (
        <ul className="space-y-1.5">
          {value.map((r) => (
            <li
              key={r.value}
              className="flex items-center justify-between gap-2 px-3 h-10 rounded-lg border border-gray-200 bg-gray-50 text-sm"
            >
              <span className="truncate text-gray-800">{r.label}</span>
              <button
                type="button"
                onClick={() => remove(r.value)}
                className="text-gray-400 hover:text-gray-600 shrink-0"
                aria-label={`Remove ${r.label}`}
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {picking ? (
        <div className="flex items-start gap-2">
          <div className="flex-1 min-w-0">
            <AsyncSelect
              autoFocus
              cacheOptions={false}
              defaultOptions={false}
              loadOptions={loadOptions}
              value={null}
              onChange={(opt: any) => add(opt)}
              placeholder="Search recruiter by name or email..."
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
                  "&:hover": { borderColor: "#14b8a6" },
                }),
                menu: (base) => ({ ...base, zIndex: 9999 }),
              }}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => setPicking(false)}
            className="h-10 px-3 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 shrink-0"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setPicking(true)}
          className="inline-flex items-center gap-1.5 h-10 px-5 rounded-xl border border-teal-300 bg-white text-sm font-medium text-teal-700 hover:bg-teal-50"
        >
          <Plus className="w-4 h-4" />
          Add Another Recruiter
        </button>
      )}
    </div>
  );
};

export default RecruiterMultiSelect;