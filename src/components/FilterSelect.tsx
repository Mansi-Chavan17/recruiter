// import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { createPortal } from "react-dom";
// import { Check, ChevronDown } from "lucide-react";

// export type FilterOption = { value: string; label: string };

// interface FilterSelectProps {
//   value: string;
//   options: FilterOption[];
//   onChange: (value: string) => void;
//   /** Classes for the outer wrapper (width, flex sizing) */
//   className?: string;
//   /** Replaces the default button styling entirely (e.g. a status pill) */
//   buttonClassName?: string;
//   /** Hide the chevron (useful for compact pills) */
//   hideChevron?: boolean;
//   disabled?: boolean;
//   ariaLabel?: string;
//   /** Colour of the focus ring, selected text and tick */
//   accent?: "blue" | "teal";
// }

// const ACCENTS = {
//   blue: {
//     ring: "focus-visible:ring-blue-500",
//     open: "border-blue-500 ring-2 ring-blue-500",
//     text: "text-blue-700",
//     tick: "text-blue-600",
//   },
//   teal: {
//     ring: "focus-visible:ring-teal-500",
//     open: "border-teal-500 ring-2 ring-teal-500",
//     text: "text-teal-700",
//     tick: "text-teal-600",
//   },
// };

// const MENU_MAX_HEIGHT = 256; // matches max-h-64
// const MENU_GAP = 4;

// type MenuPosition = {
//   top: number;
//   left: number;
//   minWidth: number;
//   placement: "bottom" | "top";
// };

// /**
//  * Drop-in replacement for a native <select>.
//  * - The menu is drawn by us, so it stays light in macOS dark mode.
//  * - The menu is portalled to <body>, so tables and modals with
//  *   overflow:auto/hidden never clip it.
//  */
// const FilterSelect = ({
//   value,
//   options,
//   onChange,
//   className = "",
//   buttonClassName,
//   hideChevron = false,
//   disabled = false,
//   ariaLabel,
//   accent = "teal",
// }: FilterSelectProps) => {
//   const tone = ACCENTS[accent];

//   const [open, setOpen] = useState(false);
//   const [highlight, setHighlight] = useState(0);
//   const [position, setPosition] = useState<MenuPosition | null>(null);

//   const buttonRef = useRef<HTMLButtonElement>(null);
//   const menuRef = useRef<HTMLUListElement>(null);

//   const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));
//   const selected = options[selectedIndex];

//   /* ---------- positioning ---------- */

//   const updatePosition = () => {
//     const btn = buttonRef.current;
//     if (!btn) return;
//     const rect = btn.getBoundingClientRect();
//     const spaceBelow = window.innerHeight - rect.bottom;
//     const placement =
//       spaceBelow < MENU_MAX_HEIGHT + MENU_GAP && rect.top > spaceBelow ? "top" : "bottom";

//     setPosition({
//       top: placement === "bottom" ? rect.bottom + MENU_GAP : rect.top - MENU_GAP,
//       left: rect.left,
//       minWidth: Math.max(rect.width, 160),
//       placement,
//     });
//   };

//   useLayoutEffect(() => {
//     if (open) updatePosition();
//   }, [open]);

//   useEffect(() => {
//     if (!open) return;
//     setHighlight(selectedIndex);

//     const onOutside = (e: MouseEvent) => {
//       const target = e.target as Node;
//       if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) return;
//       setOpen(false);
//     };
//     // Close if the page or a scroll container moves (except the menu itself)
//     const onScroll = (e: Event) => {
//       if (menuRef.current?.contains(e.target as Node)) return;
//       setOpen(false);
//     };

//     document.addEventListener("mousedown", onOutside);
//     window.addEventListener("scroll", onScroll, true);
//     window.addEventListener("resize", updatePosition);
//     return () => {
//       document.removeEventListener("mousedown", onOutside);
//       window.removeEventListener("scroll", onScroll, true);
//       window.removeEventListener("resize", updatePosition);
//     };
//   }, [open, selectedIndex]);

//   // Keep the highlighted option visible when using arrow keys
//   useEffect(() => {
//     if (!open) return;
//     const el = menuRef.current?.children[highlight] as HTMLElement | undefined;
//     el?.scrollIntoView({ block: "nearest" });
//   }, [highlight, open]);

//   /* ---------- interaction ---------- */

//   const choose = (index: number) => {
//     const option = options[index];
//     if (option && option.value !== value) onChange(option.value);
//     setOpen(false);
//     buttonRef.current?.focus();
//   };

//   const onKeyDown = (e: React.KeyboardEvent) => {
//     if (disabled) return;
//     if (e.key === "Escape" || e.key === "Tab") {
//       setOpen(false);
//       return;
//     }
//     if (!open && ["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
//       e.preventDefault();
//       setOpen(true);
//       return;
//     }
//     if (!open) return;

//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setHighlight((h) => Math.min(h + 1, options.length - 1));
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setHighlight((h) => Math.max(h - 1, 0));
//     } else if (e.key === "Enter" || e.key === " ") {
//       e.preventDefault();
//       choose(highlight);
//     }
//   };

//   /* ---------- render ---------- */

//   const defaultButtonClass = `flex h-10 w-full items-center justify-between gap-2 rounded-lg border bg-white px-3 text-left text-sm text-gray-700 transition-colors ${
//     open ? tone.open : "border-gray-300 hover:border-gray-400"
//   }`;

//   const menu =
//     open && position
//       ? createPortal(
//           <ul
//             ref={menuRef}
//             role="listbox"
//             style={{
//               position: "fixed",
//               left: position.left,
//               minWidth: position.minWidth,
//               ...(position.placement === "bottom"
//                 ? { top: position.top }
//                 : { bottom: window.innerHeight - position.top }),
//             }}
//             className="z-[9999] m-0 max-h-64 list-none overflow-y-auto rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
//           >
//             {options.map((option, index) => {
//               const isSelected = option.value === value;
//               const isHighlighted = index === highlight;

//               return (
//                 <li
//                   key={option.value}
//                   role="option"
//                   aria-selected={isSelected}
//                   onMouseEnter={() => setHighlight(index)}
//                   onMouseDown={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     choose(index);
//                   }}
//                   className={`flex cursor-pointer items-center justify-between gap-3 whitespace-nowrap rounded-md px-3 py-2 text-sm ${
//                     isHighlighted ? "bg-gray-100" : ""
//                   } ${isSelected ? `font-medium ${tone.text}` : "text-gray-700"}`}
//                 >
//                   <span>{option.label}</span>
//                   {isSelected && (
//                     <Check className={`h-4 w-4 shrink-0 ${tone.tick}`} strokeWidth={2} />
//                   )}
//                 </li>
//               );
//             })}
//           </ul>,
//           document.body
//         )
//       : null;

//   return (
//     <div className={`relative ${className}`}>
//       <button
//         ref={buttonRef}
//         type="button"
//         disabled={disabled}
//         aria-haspopup="listbox"
//         aria-expanded={open}
//         aria-label={ariaLabel}
//         onClick={(e) => {
//           e.stopPropagation(); // don't trigger row click handlers
//           if (!disabled) setOpen((o) => !o);
//         }}
//         onKeyDown={onKeyDown}
//         className={`cursor-pointer focus:outline-none focus-visible:ring-2 ${tone.ring} disabled:cursor-not-allowed disabled:opacity-60 ${
//           buttonClassName ?? defaultButtonClass
//         }`}
//       >
//         <span className="truncate">{selected?.label}</span>
//         {!hideChevron && (
//           <ChevronDown
//             className={`h-4 w-4 shrink-0 opacity-70 transition-transform duration-150 ${
//               open ? "rotate-180" : ""
//             }`}
//             strokeWidth={1.75}
//           />
//         )}
//       </button>
//       {menu}
//     </div>
//   );
// };

// export default FilterSelect;




// import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { createPortal } from "react-dom";
// import { Check, ChevronDown } from "lucide-react";

// export type FilterOption = { value: string; label: string };

// interface FilterSelectProps {
//   value: string;
//   options: FilterOption[];
//   onChange: (value: string) => void;
//   /** Classes for the outer wrapper (width, flex sizing) */
//   className?: string;
//   /** Replaces the default button styling entirely (e.g. a status pill) */
//   buttonClassName?: string;
//   /** Hide the chevron entirely */
//   hideChevron?: boolean;
//   /** Size of the chevron, e.g. "h-3 w-3" for compact pills (default "h-4 w-4") */
//   chevronClassName?: string;
//   disabled?: boolean;
//   ariaLabel?: string;
//   /** Colour of the focus ring, selected text and tick */
//   accent?: "blue" | "teal";
// }

// const ACCENTS = {
//   blue: {
//     ring: "focus-visible:ring-blue-500",
//     open: "border-blue-500 ring-2 ring-blue-500",
//     text: "text-blue-700",
//     tick: "text-blue-600",
//   },
//   teal: {
//     ring: "focus-visible:ring-teal-500",
//     open: "border-teal-500 ring-2 ring-teal-500",
//     text: "text-teal-700",
//     tick: "text-teal-600",
//   },
// };

// const MENU_MAX_HEIGHT = 256; // matches max-h-64
// const MENU_GAP = 4;

// type MenuPosition = {
//   top: number;
//   left: number;
//   minWidth: number;
//   placement: "bottom" | "top";
// };

// /**
//  * Drop-in replacement for a native <select>.
//  * - The menu is drawn by us, so it stays light in macOS dark mode.
//  * - The menu is portalled to <body>, so tables and modals with
//  *   overflow:auto/hidden never clip it.
//  */
// const FilterSelect = ({
//   value,
//   options,
//   onChange,
//   className = "",
//   buttonClassName,
//   hideChevron = false,
//   chevronClassName = "h-4 w-4",
//   disabled = false,
//   ariaLabel,
//   accent = "teal",
// }: FilterSelectProps) => {
//   const tone = ACCENTS[accent];

//   const [open, setOpen] = useState(false);
//   const [highlight, setHighlight] = useState(0);
//   const [position, setPosition] = useState<MenuPosition | null>(null);

//   const buttonRef = useRef<HTMLButtonElement>(null);
//   const menuRef = useRef<HTMLUListElement>(null);

//   const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));
//   const selected = options[selectedIndex];

//   /* ---------- positioning ---------- */

//   const updatePosition = () => {
//     const btn = buttonRef.current;
//     if (!btn) return;
//     const rect = btn.getBoundingClientRect();
//     const spaceBelow = window.innerHeight - rect.bottom;
//     const placement =
//       spaceBelow < MENU_MAX_HEIGHT + MENU_GAP && rect.top > spaceBelow ? "top" : "bottom";

//     setPosition({
//       top: placement === "bottom" ? rect.bottom + MENU_GAP : rect.top - MENU_GAP,
//       left: rect.left,
//       minWidth: Math.max(rect.width, 160),
//       placement,
//     });
//   };

//   useLayoutEffect(() => {
//     if (open) updatePosition();
//   }, [open]);

//   useEffect(() => {
//     if (!open) return;
//     setHighlight(selectedIndex);

//     const onOutside = (e: MouseEvent) => {
//       const target = e.target as Node;
//       if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) return;
//       setOpen(false);
//     };
//     // Close if the page or a scroll container moves (except the menu itself)
//     const onScroll = (e: Event) => {
//       if (menuRef.current?.contains(e.target as Node)) return;
//       setOpen(false);
//     };

//     document.addEventListener("mousedown", onOutside);
//     window.addEventListener("scroll", onScroll, true);
//     window.addEventListener("resize", updatePosition);
//     return () => {
//       document.removeEventListener("mousedown", onOutside);
//       window.removeEventListener("scroll", onScroll, true);
//       window.removeEventListener("resize", updatePosition);
//     };
//   }, [open, selectedIndex]);

//   // Keep the highlighted option visible when using arrow keys
//   useEffect(() => {
//     if (!open) return;
//     const el = menuRef.current?.children[highlight] as HTMLElement | undefined;
//     el?.scrollIntoView({ block: "nearest" });
//   }, [highlight, open]);

//   /* ---------- interaction ---------- */

//   const choose = (index: number) => {
//     const option = options[index];
//     if (option && option.value !== value) onChange(option.value);
//     setOpen(false);
//     buttonRef.current?.focus();
//   };

//   const onKeyDown = (e: React.KeyboardEvent) => {
//     if (disabled) return;
//     if (e.key === "Escape" || e.key === "Tab") {
//       setOpen(false);
//       return;
//     }
//     if (!open && ["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
//       e.preventDefault();
//       setOpen(true);
//       return;
//     }
//     if (!open) return;

//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setHighlight((h) => Math.min(h + 1, options.length - 1));
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setHighlight((h) => Math.max(h - 1, 0));
//     } else if (e.key === "Enter" || e.key === " ") {
//       e.preventDefault();
//       choose(highlight);
//     }
//   };

//   /* ---------- render ---------- */

//   const defaultButtonClass = `flex h-10 w-full items-center justify-between gap-2 rounded-lg border bg-white px-3 text-left text-sm text-gray-700 transition-colors ${
//     open ? tone.open : "border-gray-300 hover:border-gray-400"
//   }`;

//   const menu =
//     open && position
//       ? createPortal(
//           <ul
//             ref={menuRef}
//             role="listbox"
//             style={{
//               position: "fixed",
//               left: position.left,
//               minWidth: position.minWidth,
//               ...(position.placement === "bottom"
//                 ? { top: position.top }
//                 : { bottom: window.innerHeight - position.top }),
//             }}
//             className="z-[9999] m-0 max-h-64 list-none overflow-y-auto rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
//           >
//             {options.map((option, index) => {
//               const isSelected = option.value === value;
//               const isHighlighted = index === highlight;

//               return (
//                 <li
//                   key={option.value}
//                   role="option"
//                   aria-selected={isSelected}
//                   onMouseEnter={() => setHighlight(index)}
//                   onMouseDown={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     choose(index);
//                   }}
//                   className={`flex cursor-pointer items-center justify-between gap-3 whitespace-nowrap rounded-md px-3 py-2 text-sm ${
//                     isHighlighted ? "bg-gray-100" : ""
//                   } ${isSelected ? `font-medium ${tone.text}` : "text-gray-700"}`}
//                 >
//                   <span>{option.label}</span>
//                   {isSelected && (
//                     <Check className={`h-4 w-4 shrink-0 ${tone.tick}`} strokeWidth={2} />
//                   )}
//                 </li>
//               );
//             })}
//           </ul>,
//           document.body
//         )
//       : null;

//   return (
//     <div className={`relative ${className}`}>
//       <button
//         ref={buttonRef}
//         type="button"
//         disabled={disabled}
//         aria-haspopup="listbox"
//         aria-expanded={open}
//         aria-label={ariaLabel}
//         onClick={(e) => {
//           e.stopPropagation(); // don't trigger row click handlers
//           if (!disabled) setOpen((o) => !o);
//         }}
//         onKeyDown={onKeyDown}
//         className={`cursor-pointer focus:outline-none focus-visible:ring-2 ${tone.ring} disabled:cursor-not-allowed disabled:opacity-60 ${
//           buttonClassName ?? defaultButtonClass
//         }`}
//       >
//         <span className="truncate">{selected?.label}</span>
//         {!hideChevron && (
//           <ChevronDown
//             className={`${chevronClassName} shrink-0 opacity-70 transition-transform duration-150 ${
//               open ? "rotate-180" : ""
//             }`}
//             strokeWidth={1.75}
//           />
//         )}
//       </button>
//       {menu}
//     </div>
//   );
// };

// export default FilterSelect;





import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, Search } from "lucide-react";

export type FilterOption = { value: string; label: string };

interface FilterSelectProps {
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  /** Classes for the outer wrapper (width, flex sizing) */
  className?: string;
  /** Replaces the default button styling entirely (e.g. a status pill) */
  buttonClassName?: string;
  /** Hide the chevron entirely */
  hideChevron?: boolean;
  /** Size of the chevron, e.g. "h-3 w-3" for compact pills (default "h-4 w-4") */
  chevronClassName?: string;
  disabled?: boolean;
  ariaLabel?: string;
  /** Colour of the focus ring, selected text and tick */
  accent?: "blue" | "teal";
  /** Show a type-to-filter box at the top of the menu (for long lists) */
  searchable?: boolean;
  searchPlaceholder?: string;
}

const ACCENTS = {
  blue: {
    ring: "focus-visible:ring-blue-500",
    open: "border-blue-500 ring-2 ring-blue-500",
    text: "text-blue-700",
    tick: "text-blue-600",
  },
  teal: {
    ring: "focus-visible:ring-teal-500",
    open: "border-teal-500 ring-2 ring-teal-500",
    text: "text-teal-700",
    tick: "text-teal-600",
  },
};

const MENU_MAX_HEIGHT = 300;
const MENU_GAP = 4;

type MenuPosition = {
  top: number;
  left: number;
  minWidth: number;
  placement: "bottom" | "top";
};

/**
 * Drop-in replacement for a native <select>.
 * - The menu is drawn by us, so it stays light in macOS dark mode.
 * - The menu is portalled to <body>, so tables and modals with
 *   overflow:auto/hidden never clip it.
 * - `searchable` adds a filter box for long lists.
 */
const FilterSelect = ({
  value,
  options,
  onChange,
  className = "",
  buttonClassName,
  hideChevron = false,
  chevronClassName = "h-4 w-4",
  disabled = false,
  ariaLabel,
  accent = "teal",
  searchable = false,
  searchPlaceholder = "Search...",
}: FilterSelectProps) => {
  const tone = ACCENTS[accent];

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const [position, setPosition] = useState<MenuPosition | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value) ?? options[0];

  const visibleOptions = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
  }, [options, query]);

  /* ---------- positioning ---------- */

  const updatePosition = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const placement =
      spaceBelow < MENU_MAX_HEIGHT + MENU_GAP && rect.top > spaceBelow ? "top" : "bottom";

    setPosition({
      top: placement === "bottom" ? rect.bottom + MENU_GAP : rect.top - MENU_GAP,
      left: rect.left,
      minWidth: Math.max(rect.width, searchable ? 220 : 160),
      placement,
    });
  };

  useLayoutEffect(() => {
    if (open) updatePosition();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    setQuery("");
    setHighlight(Math.max(0, options.findIndex((o) => o.value === value)));
    if (searchable) requestAnimationFrame(() => searchRef.current?.focus());

    const onOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    // Close if the page or a scroll container moves (except the menu itself)
    const onScroll = (e: Event) => {
      if (menuRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };

    document.addEventListener("mousedown", onOutside);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", updatePosition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Reset highlight to the first match while typing
  useEffect(() => {
    if (open && query) setHighlight(0);
  }, [query, open]);

  // Keep the highlighted option visible when using arrow keys
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.children[highlight] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [highlight, open]);

  /* ---------- interaction ---------- */

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  };

  const choose = (option?: FilterOption) => {
    if (option && option.value !== value) onChange(option.value);
    close();
  };

  /** Arrow / Enter / Escape handling, shared by the button and the search box */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "Tab") {
      setOpen(false);
      return;
    }
    if (!open && ["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, visibleOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" || (e.key === " " && e.target === buttonRef.current)) {
      e.preventDefault();
      choose(visibleOptions[highlight]);
    }
  };

  /* ---------- render ---------- */

  const defaultButtonClass = `flex h-10 w-full items-center justify-between gap-2 rounded-lg border bg-white px-3 text-left text-sm text-gray-700 transition-colors ${
    open ? tone.open : "border-gray-300 hover:border-gray-400"
  }`;

  const menu =
    open && position
      ? createPortal(
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              left: position.left,
              minWidth: position.minWidth,
              maxWidth: "min(420px, calc(100vw - 16px))",
              ...(position.placement === "bottom"
                ? { top: position.top }
                : { bottom: window.innerHeight - position.top }),
            }}
            className="z-[9999] flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
          >
            {searchable && (
              <div className="relative shrink-0 border-b border-gray-100 p-1.5">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={searchPlaceholder}
                  className="h-8 w-full rounded-md bg-gray-50 pl-7 pr-2 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-200"
                />
              </div>
            )}

            <ul
              ref={listRef}
              role="listbox"
              className="m-0 max-h-64 list-none overflow-y-auto p-1"
            >
              {visibleOptions.length === 0 ? (
                <li className="px-3 py-2 text-sm text-gray-400">No matches</li>
              ) : (
                visibleOptions.map((option, index) => {
                  const isSelected = option.value === value;
                  const isHighlighted = index === highlight;

                  return (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={isSelected}
                      onMouseEnter={() => setHighlight(index)}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        choose(option);
                      }}
                      className={`flex cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 text-sm ${
                        isHighlighted ? "bg-gray-100" : ""
                      } ${isSelected ? `font-medium ${tone.text}` : "text-gray-700"}`}
                    >
                      <span className="truncate">{option.label}</span>
                      {isSelected && (
                        <Check className={`h-4 w-4 shrink-0 ${tone.tick}`} strokeWidth={2} />
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          </div>,
          document.body
        )
      : null;

  return (
    <div className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={(e) => {
          e.stopPropagation(); // don't trigger row click handlers
          if (!disabled) setOpen((o) => !o);
        }}
        onKeyDown={onKeyDown}
        className={`cursor-pointer focus:outline-none focus-visible:ring-2 ${tone.ring} disabled:cursor-not-allowed disabled:opacity-60 ${
          buttonClassName ?? defaultButtonClass
        }`}
      >
        <span className="truncate">{selected?.label}</span>
        {!hideChevron && (
          <ChevronDown
            className={`${chevronClassName} shrink-0 opacity-70 transition-transform duration-150 ${
              open ? "rotate-180" : ""
            }`}
            strokeWidth={1.75}
          />
        )}
      </button>
      {menu}
    </div>
  );
};

export default FilterSelect;