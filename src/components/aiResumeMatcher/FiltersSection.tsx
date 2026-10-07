import React from "react";
import { Loader2 } from "lucide-react";
import AsyncSelect from "react-select/async";
import type { AiMatcherFilters, PositionOption, SelectOption, LoadOptions } from "./Types";

interface FiltersSectionProps {
  filters: AiMatcherFilters;
  onFilterChange: <K extends keyof AiMatcherFilters>(
    field: K,
    value: AiMatcherFilters[K]
  ) => void;
  onRangeChange: (
    field: "ctcRange" | "experienceRange",
    type: "min" | "max",
    value: string
  ) => void;
  onApplyFilter: () => void;
  onResetFilter: () => void;
  isApplyingFilter: boolean;
  allIndustriesCache: SelectOption[];
  allFunctionsCache: SelectOption[];
  loadPositionOptions: LoadOptions<PositionOption>;
  loadIndustryOptions: LoadOptions<SelectOption>;
  loadFunctionOptions: LoadOptions<SelectOption>;
}

const FiltersSection: React.FC<FiltersSectionProps> = ({
  filters,
  onFilterChange,
  onRangeChange,
  onApplyFilter,
  onResetFilter,
  isApplyingFilter,
  allIndustriesCache,
  allFunctionsCache,
  loadPositionOptions,
  loadIndustryOptions,
  loadFunctionOptions,
}) => {
  return (
    <div className="bg-white rounded-lg shadow border p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Position &amp; Filters
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position Name
          </label>

          <AsyncSelect<PositionOption, false>
            cacheOptions
            loadOptions={loadPositionOptions}
            isSearchable
            isClearable
            placeholder="Type to search position..."
            noOptionsMessage={({ inputValue }) =>
              !inputValue
                ? "Type at least 2 characters..."
                : "No positions found"
            }
            loadingMessage={() => "Searching positions..."}
            value={filters.positionName}
            onChange={(option) => onFilterChange("positionName", option)}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => String(option.value)}
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "42px",
                borderColor: "#d1d5db",
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
          />

          <p className="text-xs text-gray-500 mt-1">
            Start typing at least 2 characters to search positions
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <input
              type="checkbox"
              checked={filters.industryEnabled}
              onChange={(e) =>
                onFilterChange("industryEnabled", e.target.checked)
              }
              className="mr-2"
            />
            Preferred Industry
          </label>

          <AsyncSelect<SelectOption, true>
            isMulti
            cacheOptions
            defaultOptions={allIndustriesCache}
            loadOptions={loadIndustryOptions}
            isSearchable
            isClearable
            isDisabled={!filters.industryEnabled}
            placeholder="Select or search industries..."
            value={filters.preferredIndustry}
            onChange={(options) =>
              onFilterChange(
                "preferredIndustry",
                options ? [...options] : []
              )
            }
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => String(option.value)}
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "42px",
                borderColor: "#d1d5db",
                backgroundColor: !filters.industryEnabled ? "#f3f4f6" : "white",
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <input
              type="checkbox"
              checked={filters.functionEnabled}
              onChange={(e) =>
                onFilterChange("functionEnabled", e.target.checked)
              }
              className="mr-2"
            />
            Preferred Function
          </label>

          <AsyncSelect<SelectOption, true>
            isMulti
            cacheOptions
            defaultOptions={allFunctionsCache}
            loadOptions={loadFunctionOptions}
            isSearchable
            isClearable
            isDisabled={!filters.functionEnabled}
            placeholder="Select or search functions..."
            value={filters.preferredFunction}
            onChange={(options) =>
              onFilterChange(
                "preferredFunction",
                options ? [...options] : []
              )
            }
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => String(option.value)}
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "42px",
                borderColor: "#d1d5db",
                backgroundColor: !filters.functionEnabled ? "#f3f4f6" : "white",
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CTC Range (Please put 3000000, not 30LPA)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={filters.ctcRange.min}
              onChange={(e) => onRangeChange("ctcRange", "min", e.target.value)}
              className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Min"
            />
            <input
              type="number"
              value={filters.ctcRange.max}
              onChange={(e) => onRangeChange("ctcRange", "max", e.target.value)}
              className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Max"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience Range (Years)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={filters.experienceRange.min}
              onChange={(e) =>
                onRangeChange("experienceRange", "min", e.target.value)
              }
              className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Min"
            />
            <input
              type="number"
              value={filters.experienceRange.max}
              onChange={(e) =>
                onRangeChange("experienceRange", "max", e.target.value)
              }
              className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Max"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Keywords (comma separated)
          </label>
          <input
            type="text"
            value={filters.keywords}
            onChange={(e) => onFilterChange("keywords", e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="React, JavaScript, Node.js"
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={onApplyFilter}
          disabled={isApplyingFilter}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isApplyingFilter && <Loader2 className="w-4 h-4 animate-spin" />}
          {isApplyingFilter ? "Applying..." : "Apply Filter"}
        </button>
        <button
          onClick={onResetFilter}
          disabled={isApplyingFilter}
          className="ml-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FiltersSection;