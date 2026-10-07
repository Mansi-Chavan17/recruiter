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

const CandidateFilters = ({
  filters,
  onFilterChange,
  onClearFilters,
}: CandidateFiltersProps) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min CTC (₹)
          </label>
          <input
            type="number"
            placeholder="Min CTC"
            value={filters.ctcMin}
            onChange={(e) => onFilterChange("ctcMin", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max CTC (₹)
          </label>
          <input
            type="number"
            placeholder="Max CTC"
            value={filters.ctcMax}
            onChange={(e) => onFilterChange("ctcMax", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            placeholder="City"
            value={filters.city}
            onChange={(e) => onFilterChange("city", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organization
          </label>
          <input
            type="text"
            placeholder="Organization"
            value={filters.organization}
            onChange={(e) => onFilterChange("organization", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Designation
          </label>
          <input
            type="text"
            placeholder="Designation"
            value={filters.designation}
            onChange={(e) => onFilterChange("designation", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onClearFilters}
          className="px-4 py-2 text-teal-700 hover:text-teal-900 hover:bg-teal-50 rounded-lg transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default CandidateFilters;