// import Select from "react-select";
// import { Info } from "lucide-react";
// import FilterSelect from "../FilterSelect";

// /* ------------------------------------------------------------------ */
// /* Shared styling tokens (teal)                                        */
// /* ------------------------------------------------------------------ */

// const TEAL = {
//   50: "#f0fdfa",
//   100: "#ccfbf1",
//   500: "#14b8a6",
//   600: "#0d9488",
// };

// export const inputClass =
//   "w-full h-11 px-3.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition";

// export const selectStyles = {
//   control: (base: any, state: any) => ({
//     ...base,
//     minHeight: "44px",
//     backgroundColor: "#fff",
//     borderRadius: "0.5rem",
//     borderColor: state.isFocused ? TEAL[500] : "#e5e7eb",
//     boxShadow: state.isFocused ? `0 0 0 2px ${TEAL[100]}` : "none",
//     "&:hover": { borderColor: state.isFocused ? TEAL[500] : "#d1d5db" },
//     fontSize: "0.875rem",
//   }),
//   placeholder: (base: any) => ({ ...base, color: "#9ca3af" }),
//   menu: (base: any) => ({ ...base, fontSize: "0.875rem" }),
//   menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
//   option: (base: any, state: any) => ({
//     ...base,
//     backgroundColor: state.isSelected
//       ? TEAL[600]
//       : state.isFocused
//       ? TEAL[50]
//       : "#fff",
//     color: state.isSelected ? "#fff" : "#111827",
//     "&:active": { backgroundColor: TEAL[100] },
//   }),
// };

// /* ------------------------------------------------------------------ */
// /* Section — a titled block inside a step                              */
// /* ------------------------------------------------------------------ */

// export const FormSection = ({
//   title,
//   action = null,
//   children,
//   divider = true,
// }: {
//   title: string;
//   action?: React.ReactNode;
//   children: React.ReactNode;
//   divider?: boolean;
// }) => (
//   <section
//     className={divider ? "pb-7 mb-7 border-b border-gray-100 last:border-0" : ""}
//   >
//     <div className="flex items-center justify-between mb-4">
//       <h3 className="text-base font-semibold text-gray-900">{title}</h3>
//       {action}
//     </div>
//     {children}
//   </section>
// );

// /* ------------------------------------------------------------------ */
// /* Field — label + control, two per row by default                     */
// /* ------------------------------------------------------------------ */

// export const Field = ({
//   label,
//   required = false,
//   hint,
//   full = false,
//   children,
// }: {
//   label: string;
//   required?: boolean;
//   hint?: string;
//   full?: boolean;
//   children: React.ReactNode;
// }) => (
//   <div className={full ? "sm:col-span-2" : ""}>
//     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//       {label}
//       {required && <span className="text-teal-600 ml-0.5">*</span>}
//       {hint && (
//         <span className="font-normal text-gray-400 ml-1.5">({hint})</span>
//       )}
//     </label>
//     {children}
//   </div>
// );

// export const FieldGrid = ({ children }: { children: React.ReactNode }) => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
//     {children}
//   </div>
// );

// /* ------------------------------------------------------------------ */
// /* Controls                                                            */
// /* ------------------------------------------------------------------ */

// export const TextInput = (props: any) => (
//   <input {...props} className={`${inputClass} ${props.className || ""}`} />
// );

// export const TextArea = ({ rows = 5, ...props }: any) => (
//   <textarea
//     rows={rows}
//     {...props}
//     className={`w-full px-3.5 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition ${
//       props.className || ""
//     }`}
//   />
// );

// type SelectOption = string | { value: string; label: string };

// /**
//  * Short fixed lists (status, priority, job type...).
//  * Built on FilterSelect so the open menu stays light in macOS dark mode,
//  * and styled to match TextInput (44px, gray-200 border, teal focus).
//  */
// export const NativeSelect = ({
//   value,
//   options,
//   placeholder,
//   onChange,
//   disabled,
// }: {
//   value: string;
//   options: SelectOption[];
//   placeholder?: string;
//   onChange: (e: { target: { value: string } }) => void;
//   disabled?: boolean;
// }) => (
//   <FilterSelect
//     className="w-full"
//     disabled={disabled}
//     value={value ?? ""}
//     // Same shape as a native change event, so existing callers keep working
//     onChange={(next) => onChange({ target: { value: next } })}
//     buttonClassName={`flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3.5 text-left text-sm transition hover:border-gray-300 aria-expanded:border-teal-500 aria-expanded:ring-2 aria-expanded:ring-teal-100 ${
//       value ? "text-gray-900" : "text-gray-400"
//     }`}
//     options={[
//       ...(placeholder ? [{ value: "", label: placeholder }] : []),
//       ...options.map((o) => (typeof o === "string" ? { value: o, label: o } : o)),
//     ]}
//   />
// );

// /** Long or searchable lists (client, function, role, city...). */
// export const SearchSelect = ({
//   options = [],
//   value,
//   onChange,
//   placeholder = "Select...",
//   ...rest
// }: any) => (
//   <Select
//     options={options}
//     isSearchable
//     placeholder={placeholder}
//     styles={selectStyles}
//     menuPlacement="auto"
//     // Render the menu on <body> so the wizard's scroll area can't clip it
//     menuPortalTarget={typeof document !== "undefined" ? document.body : null}
//     menuPosition="fixed"
//     value={options.find((opt: any) => opt.value === value) || null}
//     onChange={onChange}
//     {...rest}
//   />
// );

// /* ------------------------------------------------------------------ */
// /* OptionCards — bordered radio cards                                  */
// /* ------------------------------------------------------------------ */

// export const OptionCards = ({
//   options,
//   value,
//   onChange,
//   columns = 3,
// }: {
//   options: { value: string; label: string; description?: string }[];
//   value: string;
//   onChange: (value: string) => void;
//   columns?: 2 | 3;
// }) => (
//   <div
//     className={`grid grid-cols-1 ${
//       columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
//     } gap-3`}
//   >
//     {options.map((option) => {
//       const selected = value === option.value;
//       return (
//         <button
//           key={option.value}
//           type="button"
//           onClick={() => onChange(option.value)}
//           aria-pressed={selected}
//           className={`text-left p-3.5 rounded-lg border transition ${
//             selected
//               ? "border-teal-500 bg-teal-50/50 ring-2 ring-teal-100"
//               : "border-gray-200 bg-white hover:border-gray-300"
//           }`}
//         >
//           <span className="flex items-center gap-2">
//             <span
//               className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
//                 selected ? "border-teal-600" : "border-gray-300"
//               }`}
//             >
//               {selected && <span className="w-2 h-2 rounded-full bg-teal-600" />}
//             </span>
//             <span className="text-sm font-medium text-gray-900">
//               {option.label}
//             </span>
//           </span>
//           {option.description && (
//             <span className="block mt-1.5 ml-6 text-xs leading-relaxed text-gray-500">
//               {option.description}
//             </span>
//           )}
//         </button>
//       );
//     })}
//   </div>
// );

// /* ------------------------------------------------------------------ */
// /* ChipGroup — multi-select pills                                      */
// /* ------------------------------------------------------------------ */

// export const ChipGroup = ({
//   options,
//   selected = [],
//   onToggle,
// }: {
//   options: string[];
//   selected: string[];
//   onToggle: (value: string) => void;
// }) => (
//   <div className="flex flex-wrap gap-2">
//     {options.map((option) => {
//       const active = selected.includes(option);
//       return (
//         <button
//           key={option}
//           type="button"
//           onClick={() => onToggle(option)}
//           aria-pressed={active}
//           className={`h-9 px-3.5 rounded-full text-sm border transition ${
//             active
//               ? "border-teal-500 bg-teal-50 text-teal-700 font-medium"
//               : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
//           }`}
//         >
//           {option}
//         </button>
//       );
//     })}
//   </div>
// );

// /* ------------------------------------------------------------------ */
// /* InfoBanner                                                          */
// /* ------------------------------------------------------------------ */

// export const InfoBanner = ({ children }: { children: React.ReactNode }) => (
//   <div className="flex gap-2.5 p-3 mb-4 rounded-lg bg-teal-50/70 border border-teal-100">
//     <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
//     <p className="text-xs leading-relaxed text-teal-900">{children}</p>
//   </div>
// );



import Select from "react-select";
import { Info } from "lucide-react";
import FilterSelect from "../FilterSelect";

/* ------------------------------------------------------------------ */
/* Shared styling tokens (teal)                                        */
/* ------------------------------------------------------------------ */

const TEAL = {
  50: "#f0fdfa",
  100: "#ccfbf1",
  500: "#14b8a6",
  600: "#0d9488",
};

export const inputClass =
  "w-full h-11 px-3.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition";

export const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: "44px",
    backgroundColor: "#fff",
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? TEAL[500] : "#e5e7eb",
    boxShadow: state.isFocused ? `0 0 0 2px ${TEAL[100]}` : "none",
    "&:hover": { borderColor: state.isFocused ? TEAL[500] : "#d1d5db" },
    fontSize: "0.875rem",
  }),
  placeholder: (base: any) => ({ ...base, color: "#9ca3af" }),
  menu: (base: any) => ({ ...base, fontSize: "0.875rem" }),
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? TEAL[600]
      : state.isFocused
      ? TEAL[50]
      : "#fff",
    color: state.isSelected ? "#fff" : "#111827",
    "&:active": { backgroundColor: TEAL[100] },
  }),
};

/* ------------------------------------------------------------------ */
/* Section — a titled block inside a step                              */
/* ------------------------------------------------------------------ */

export const FormSection = ({
  title,
  action = null,
  children,
  divider = true,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  divider?: boolean;
}) => (
  <section
    className={divider ? "pb-7 mb-7 border-b border-gray-100 last:border-0" : ""}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      {action}
    </div>
    {children}
  </section>
);

/* ------------------------------------------------------------------ */
/* Field — label + control, two per row by default                     */
/* ------------------------------------------------------------------ */

export const Field = ({
  label,
  required = false,
  hint,
  full = false,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  full?: boolean;
  children: React.ReactNode;
}) => (
  <div className={full ? "sm:col-span-2" : ""}>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label}
      {required && <span className="text-teal-600 ml-0.5">*</span>}
      {hint && (
        <span className="font-normal text-gray-400 ml-1.5">({hint})</span>
      )}
    </label>
    {children}
  </div>
);

export const FieldGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
    {children}
  </div>
);

/* ------------------------------------------------------------------ */
/* Controls                                                            */
/* ------------------------------------------------------------------ */

export const TextInput = (props: any) => (
  <input {...props} className={`${inputClass} ${props.className || ""}`} />
);

export const TextArea = ({ rows = 5, ...props }: any) => (
  <textarea
    rows={rows}
    {...props}
    className={`w-full px-3.5 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition ${
      props.className || ""
    }`}
  />
);

type SelectOption = string | { value: string; label: string };

/**
 * Short fixed lists (status, priority, job type...).
 * Built on FilterSelect so the open menu stays light in macOS dark mode,
 * and styled to match TextInput (44px, gray-200 border, teal focus).
 */
export const NativeSelect = ({
  value,
  options,
  placeholder,
  onChange,
  disabled,
}: {
  value: string;
  options: SelectOption[];
  placeholder?: string;
  onChange: (e: { target: { value: string } }) => void;
  disabled?: boolean;
}) => (
  <FilterSelect
    className="w-full"
    disabled={disabled}
    value={value ?? ""}
    // Same shape as a native change event, so existing callers keep working
    onChange={(next) => onChange({ target: { value: next } })}
    buttonClassName={`flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3.5 text-left text-sm transition hover:border-gray-300 aria-expanded:border-teal-500 aria-expanded:ring-2 aria-expanded:ring-teal-100 ${
      value ? "text-gray-900" : "text-gray-400"
    }`}
    options={[
      ...(placeholder ? [{ value: "", label: placeholder }] : []),
      ...options.map((o) => (typeof o === "string" ? { value: o, label: o } : o)),
    ]}
  />
);

/** Long or searchable lists (client, function, role, city...). */
export const SearchSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  ...rest
}: any) => (
  <Select
    options={options}
    isSearchable
    placeholder={placeholder}
    styles={selectStyles}
    menuPlacement="auto"
    // Render the menu on <body> so the wizard's scroll area can't clip it
    menuPortalTarget={typeof document !== "undefined" ? document.body : null}
    menuPosition="fixed"
    value={options.find((opt: any) => opt.value === value) || null}
    onChange={onChange}
    {...rest}
  />
);

/* ------------------------------------------------------------------ */
/* OptionCards — bordered radio cards                                  */
/* ------------------------------------------------------------------ */

export const OptionCards = ({
  options,
  value,
  onChange,
  columns = 3,
}: {
  options: { value: string; label: string; description?: string }[];
  value: string;
  onChange: (value: string) => void;
  columns?: 2 | 3;
}) => (
  <div
    className={`grid grid-cols-1 ${
      columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
    } gap-3`}
  >
    {options.map((option) => {
      const selected = value === option.value;
      return (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={selected}
          className={`text-left p-3.5 rounded-lg border transition ${
            selected
              ? "border-teal-500 bg-teal-50/50 ring-2 ring-teal-100"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <span className="flex items-center gap-2">
            <span
              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                selected ? "border-teal-600" : "border-gray-300"
              }`}
            >
              {selected && <span className="w-2 h-2 rounded-full bg-teal-600" />}
            </span>
            <span className="text-sm font-medium text-gray-900">
              {option.label}
            </span>
          </span>
          {option.description && (
            <span className="block mt-1.5 ml-6 text-xs leading-relaxed text-gray-500">
              {option.description}
            </span>
          )}
        </button>
      );
    })}
  </div>
);

/* ------------------------------------------------------------------ */
/* ChipGroup — multi-select pills                                      */
/* ------------------------------------------------------------------ */

export const ChipGroup = ({
  options,
  selected = [],
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) => (
  <div className="flex flex-wrap gap-2">
    {options.map((option) => {
      const active = selected.includes(option);
      return (
        <button
          key={option}
          type="button"
          onClick={() => onToggle(option)}
          aria-pressed={active}
          className={`h-9 px-3.5 rounded-full text-sm border transition ${
            active
              ? "border-teal-500 bg-teal-50 text-teal-700 font-medium"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
          }`}
        >
          {option}
        </button>
      );
    })}
  </div>
);

/* ------------------------------------------------------------------ */
/* InfoBanner                                                          */
/* ------------------------------------------------------------------ */

export const InfoBanner = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-2.5 p-3 mb-4 rounded-lg bg-teal-50/70 border border-teal-100">
    <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
    <p className="text-xs leading-relaxed text-teal-900">{children}</p>
  </div>
);