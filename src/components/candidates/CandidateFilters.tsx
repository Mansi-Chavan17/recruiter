// interface Filters {
//   ctcMin: number | string;
//   ctcMax: number | string;
//   city: string;
//   organization: string;
//   designation: string;
// }

// interface CandidateFiltersProps {
//   filters: Filters;
//   onFilterChange: (key: string, value: string) => void;
//   onClearFilters: () => void;
// }

// const CandidateFilters = ({
//   filters,
//   onFilterChange,
//   onClearFilters,
// }: CandidateFiltersProps) => {
//   return (
//     <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Min CTC (₹)
//           </label>
//           <input
//             type="number"
//             placeholder="Min CTC"
//             value={filters.ctcMin}
//             onChange={(e) => onFilterChange("ctcMin", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Max CTC (₹)
//           </label>
//           <input
//             type="number"
//             placeholder="Max CTC"
//             value={filters.ctcMax}
//             onChange={(e) => onFilterChange("ctcMax", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             City
//           </label>
//           <input
//             type="text"
//             placeholder="City"
//             value={filters.city}
//             onChange={(e) => onFilterChange("city", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Organization
//           </label>
//           <input
//             type="text"
//             placeholder="Organization"
//             value={filters.organization}
//             onChange={(e) => onFilterChange("organization", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Designation
//           </label>
//           <input
//             type="text"
//             placeholder="Designation"
//             value={filters.designation}
//             onChange={(e) => onFilterChange("designation", e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//       </div>
//       <div className="mt-4 flex justify-end">
//         <button
//           onClick={onClearFilters}
//           className="px-4 py-2 text-green-700 hover:text-green-900 hover:bg-green-50 rounded-lg transition-colors"
//         >
//           Clear Filters
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CandidateFilters;


import { X } from "lucide-react";
import FilterSelect from "../FilterSelect";
import { cityOptions } from "../../constants/dropdown";

interface Filters {
  ctcMin: number | string;
  ctcMax: number | string;
  city: string;
  organization: string;
  designation: string;
}

interface CandidateFiltersProps {
  filters: Filters;
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

const inputClass =
  "w-full h-10 px-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition";

const CITY_FILTER_OPTIONS = [
  { value: "", label: "All cities" },
  ...cityOptions,
];

const CandidateFilters = ({
  filters,
  onFilterChange,
  onClearFilters,
}: CandidateFiltersProps) => {
  const hasActiveFilters = Object.values(filters).some(
    (value) => String(value ?? "").trim() !== ""
  );

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Min CTC (₹)
          </label>
          <input
            type="number"
            min={0}
            placeholder="e.g. 1500000"
            value={filters.ctcMin}
            onChange={(e) => onFilterChange("ctcMin", e.target.value)}
            className={`${inputClass} no-spinner`}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Max CTC (₹)
          </label>
          <input
            type="number"
            min={0}
            placeholder="e.g. 3000000"
            value={filters.ctcMax}
            onChange={(e) => onFilterChange("ctcMax", e.target.value)}
            className={`${inputClass} no-spinner`}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            City
          </label>
          <FilterSelect
            ariaLabel="Filter by city"
            className="w-full"
            value={filters.city}
            onChange={(value) => onFilterChange("city", value)}
            options={CITY_FILTER_OPTIONS}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Organization
          </label>
          <input
            type="text"
            placeholder="e.g. TCS"
            value={filters.organization}
            onChange={(e) => onFilterChange("organization", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Designation
          </label>
          <input
            type="text"
            placeholder="e.g. Product Manager"
            value={filters.designation}
            onChange={(e) => onFilterChange("designation", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
          className="inline-flex h-9 items-center gap-1.5 px-3 text-sm font-medium text-teal-700 rounded-lg hover:bg-teal-50 disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
        >
          <X className="w-4 h-4" />
          Clear filters
        </button>
      </div>
    </div>
  );
};

export default CandidateFilters;