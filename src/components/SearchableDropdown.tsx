import Select from "react-select";
import { DROPDOWN_LISTS } from "../constants/dropdown";

const toLabel = (text) =>
  text.replace(/\b\w/g, (c) => c.toUpperCase());

export default function SearchableDropdown({
  label,
  listName,
  fieldName,
  newPosition,
  setNewPosition,
}) {
  const list = DROPDOWN_LISTS[listName] || [];

  const options = list.map((item) => ({
    value: item,       // DB → lowercase
    label: toLabel(item), // UI → Capital
  }));

  return (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1">{label}</label>

      <Select
        options={options}
        isSearchable
        placeholder={`Search ${label}...`}
        value={options.find((opt) => opt.value === newPosition[fieldName])}
        onChange={(sel) =>
          setNewPosition({ ...newPosition, [fieldName]: sel.value })
        }
      />
    </div>
  );
}