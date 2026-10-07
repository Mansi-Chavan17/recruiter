// // // // import React, { useState, useEffect, useRef } from "react";
// // // // import { useNavigate, useLocation } from "react-router-dom";
// // // // import { isLoggedIn } from "../utils/auth";

// // // // // TabButton component
// // // // interface TabButtonProps {
// // // //   name: string;
// // // //   isActive: boolean;
// // // //   onClick: () => void;
// // // // }

// // // // const TabButton: React.FC<TabButtonProps> = ({ name, isActive, onClick }) => {
// // // //   return (
// // // //     <button
// // // //       onClick={onClick}
// // // //       className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
// // // //         isActive
// // // //           ? "border-teal-600 text-teal-600"
// // // //           : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
// // // //       }`}
// // // //     >
// // // //       {name}
// // // //     </button>
// // // //   );
// // // // };

// // // // // Header component
// // // // const Header: React.FC = () => {
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation();
// // // //   const [dropdownOpen, setDropdownOpen] = useState(false);
// // // //   const dropdownRef = useRef<HTMLDivElement>(null);

// // // //   // Redirect to signup if not logged in
// // // //   // useEffect(() => {
// // // //   //   if (!isLoggedIn()) {
// // // //   //     navigate("/signup", { replace: true });
// // // //   //   }
// // // //   // }, [navigate]);

// // // //   // Close dropdown on outside click
// // // //   useEffect(() => {
// // // //     const handleClickOutside = (event: MouseEvent) => {
// // // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// // // //         setDropdownOpen(false);
// // // //       }
// // // //     };
// // // //     document.addEventListener("mousedown", handleClickOutside);
// // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // //   }, []);

// // // //   const tabs = [
// // // //     { name: "Positions", route: "/position-management" },
// // // //     { name: "Candidates", route: "/candidate-management" },
// // // //     { name: "Submissions", route: "/submission-management" },
// // // //     { name: "AI Matcher", route: "/ai-matcher" },
// // // //      { name: "WhatsApp Messages", route: "/whatsapp-tab" },
// // // //   ];

// // // //   const handleTabClick = (tab: { name: string; route?: string }) => {
// // // //     if (tab.route) {
// // // //       navigate(tab.route);
// // // //     }
// // // //   };

// // // //   const handleSignOut = () => {
// // // //     localStorage.removeItem("token");
// // // //     localStorage.removeItem("refreshToken");
// // // //     localStorage.removeItem("user");
// // // //     navigate("/signup", { replace: true });
// // // //   };

// // // //   return (
// // // //     <div className="bg-white border-b border-gray-200">
// // // //       {/* Top Bar */}
// // // //       <div className="flex items-center justify-between px-6 py-4">
// // // //         <div className="flex items-center space-x-4">
// // // //           <div className="flex items-center space-x-2">
// // // //             <div className="w-8 h-8 bg-teal-600 rounded text-white flex items-center justify-center font-bold text-sm">
// // // //               HR
// // // //             </div>
// // // //             <span className="text-lg font-semibold text-gray-800">
// // // //               HR Dashboard
// // // //             </span>
// // // //           </div>
// // // //         </div>

// // // //         {/* JS Avatar + Dropdown */}
// // // //         <div className="relative" ref={dropdownRef}>
// // // //           <div
// // // //             onClick={() => setDropdownOpen(!dropdownOpen)}
// // // //             className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-medium text-sm cursor-pointer"
// // // //           >
// // // //             JS
// // // //           </div>

// // // //           {dropdownOpen && (
// // // //             <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
// // // //               <button
// // // //                 onClick={handleSignOut}
// // // //                 className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
// // // //               >
// // // //                 Sign Out
// // // //               </button>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {/* Navigation Tabs */}
// // // //       <div className="flex space-x-8 px-6">
// // // //         {tabs.map((tab) => (
// // // //           <TabButton
// // // //             key={tab.name}
// // // //             name={tab.name}
// // // //             isActive={location.pathname === tab.route}
// // // //             onClick={() => handleTabClick(tab)}
// // // //           />
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Header;




// // // // //
// // // // import React, { useState, useEffect, useRef, useMemo } from "react";
// // // // import { useNavigate, useLocation, Link } from "react-router-dom";
// // // // import {
// // // //   Briefcase,
// // // //   Users,
// // // //   ClipboardCheck,
// // // //   Sparkles,
// // // //   MessageCircle,
// // // //   Menu,
// // // //   X,
// // // //   Search,
// // // //   LogOut,
// // // //   ChevronRight,
// // // // } from "lucide-react";
// // // // // import { isLoggedIn } from "../utils/auth";

// // // // /* ------------------------------------------------------------------ */
// // // // /* Button reset                                                        */
// // // // /*                                                                     */
// // // // /* Neutralises any global `button { ... }` rule (the Vite starter CSS   */
// // // // /* sets padding: 0.6em 1.2em, a border and a dark background). Every    */
// // // // /* button in this file starts from zero and opts back in explicitly.    */
// // // // /* ------------------------------------------------------------------ */
// // // // const BTN_RESET = "m-0 appearance-none border-0 bg-transparent p-0 font-inherit";

// // // // /* ------------------------------------------------------------------ */
// // // // /* Navigation config                                                   */
// // // // /* ------------------------------------------------------------------ */

// // // // type NavItem = {
// // // //   name: string;
// // // //   route: string;
// // // //   icon: React.ComponentType<{ className?: string }>;
// // // // };

// // // // const NAV_ITEMS: NavItem[] = [
// // // //   { name: "Positions", route: "/position-management", icon: Briefcase },
// // // //   { name: "Candidates", route: "/candidate-management", icon: Users },
// // // //   { name: "Submissions", route: "/submission-management", icon: ClipboardCheck },
// // // //   { name: "AI Matcher", route: "/ai-matcher", icon: Sparkles },
// // // //   { name: "WhatsApp Messages", route: "/whatsapp-tab", icon: MessageCircle },
// // // // ];

// // // // /* Labels used by the breadcrumb. Anything missing falls back to a
// // // //    prettified version of the URL segment. */
// // // // const ROUTE_LABELS: Record<string, string> = {
// // // //   "position-management": "Positions",
// // // //   "candidate-management": "Candidates",
// // // //   "submission-management": "Submissions",
// // // //   "ai-matcher": "AI Matcher",
// // // //   "whatsapp-tab": "WhatsApp Messages",
// // // //   create: "Create",
// // // //   edit: "Edit",
// // // // };

// // // // /* ------------------------------------------------------------------ */
// // // // /* Breadcrumb helpers                                                  */
// // // // /* ------------------------------------------------------------------ */

// // // // const isIdSegment = (segment: string) =>
// // // //   /^\d+$/.test(segment) || /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(segment);

// // // // const prettify = (segment: string) =>
// // // //   segment.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

// // // // const singular = (label: string) =>
// // // //   label.endsWith("s") ? label.slice(0, -1) : label;

// // // // type Crumb = { label: string; to: string };

// // // // const useBreadcrumbs = (): Crumb[] => {
// // // //   const { pathname } = useLocation();

// // // //   return useMemo(() => {
// // // //     const segments = pathname.split("/").filter(Boolean);
// // // //     const crumbs: Crumb[] = [];
// // // //     let path = "";

// // // //     segments.forEach((segment) => {
// // // //       path += `/${segment}`;
// // // //       if (isIdSegment(segment)) {
// // // //         const parent = crumbs[crumbs.length - 1]?.label ?? "Record";
// // // //         crumbs.push({ label: `${singular(parent)} Detail`, to: path });
// // // //       } else {
// // // //         crumbs.push({ label: ROUTE_LABELS[segment] ?? prettify(segment), to: path });
// // // //       }
// // // //     });

// // // //     return crumbs;
// // // //   }, [pathname]);
// // // // };

// // // // /* ------------------------------------------------------------------ */
// // // // /* Sidebar contents (shared by the desktop rail and the mobile drawer) */
// // // // /*                                                                     */
// // // // /* Alignment: every row starts with a w-16 (64px) column that holds the */
// // // // /* 40px tile dead centre. The rail is also 64px when collapsed, so the  */
// // // // /* HR tile and all five icons land on the rail's centre line. Buttons   */
// // // // /* carry BTN_RESET so no global padding can shift them.                */
// // // // /* ------------------------------------------------------------------ */

// // // // interface SidebarNavProps {
// // // //   /** Mobile drawer keeps labels visible; the desktop rail reveals them on hover. */
// // // //   alwaysExpanded?: boolean;
// // // //   onNavigate?: () => void;
// // // // }

// // // // const SidebarNav: React.FC<SidebarNavProps> = ({ alwaysExpanded = false, onNavigate }) => {
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation();

// // // //   const labelClass = alwaysExpanded
// // // //     ? "opacity-100"
// // // //     : "opacity-0 group-hover:opacity-100";

// // // //   const handleSignOut = () => {
// // // //     localStorage.removeItem("token");
// // // //     localStorage.removeItem("refreshToken");
// // // //     localStorage.removeItem("user");
// // // //     onNavigate?.();
// // // //     navigate("/signup", { replace: true });
// // // //   };

// // // //   return (
// // // //     <div className="flex h-full flex-col py-3">
// // // //       {/* Brand */}
// // // //       <div className="flex w-full items-center">
// // // //         <span className="flex w-16 shrink-0 items-center justify-center">
// // // //           <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white">
// // // //             HR
// // // //           </span>
// // // //         </span>
// // // //         <span
// // // //           className={`truncate whitespace-nowrap text-base font-semibold text-gray-900 transition-opacity duration-200 ${labelClass}`}
// // // //         >
// // // //           HR Dashboard
// // // //         </span>
// // // //       </div>

// // // //       {/* Primary navigation */}
// // // //       <nav className="mt-6 flex-1 p-0">
// // // //         <ul className="m-0 list-none space-y-1 p-0">
// // // //           {NAV_ITEMS.map((item) => {
// // // //             const Icon = item.icon;
// // // //             const isActive = location.pathname.startsWith(item.route);

// // // //             return (
// // // //               <li key={item.route} className="list-none">
// // // //                 <button
// // // //                   type="button"
// // // //                   onClick={() => {
// // // //                     navigate(item.route);
// // // //                     onNavigate?.();
// // // //                   }}
// // // //                   title={alwaysExpanded ? undefined : item.name}
// // // //                   aria-current={isActive ? "page" : undefined}
// // // //                   className={`${BTN_RESET} group/item flex w-full cursor-pointer items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
// // // //                 >
// // // //                   <span className="flex w-16 shrink-0 items-center justify-center">
// // // //                     <span
// // // //                       className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 ${
// // // //                         isActive
// // // //                           ? "bg-teal-600 text-white shadow-sm"
// // // //                           : "text-gray-500 group-hover/item:bg-white group-hover/item:text-gray-900"
// // // //                       }`}
// // // //                     >
// // // //                       <Icon className="h-5 w-5" />
// // // //                     </span>
// // // //                   </span>
// // // //                   <span
// // // //                     className={`truncate whitespace-nowrap text-sm font-medium transition-opacity duration-200 ${labelClass} ${
// // // //                       isActive ? "text-teal-700" : "text-gray-600"
// // // //                     }`}
// // // //                   >
// // // //                     {item.name}
// // // //                   </span>
// // // //                 </button>
// // // //               </li>
// // // //             );
// // // //           })}
// // // //         </ul>
// // // //       </nav>

// // // //       {/* Sign out */}
// // // //       <div className="mb-3 border-t border-gray-200" />
// // // //       <button
// // // //         type="button"
// // // //         onClick={handleSignOut}
// // // //         title={alwaysExpanded ? undefined : "Sign out"}
// // // //         className={`${BTN_RESET} group/item flex w-full cursor-pointer items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
// // // //       >
// // // //         <span className="flex w-16 shrink-0 items-center justify-center">
// // // //           <span className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors duration-200 group-hover/item:bg-white group-hover/item:text-red-600">
// // // //             <LogOut className="h-5 w-5" />
// // // //           </span>
// // // //         </span>
// // // //         <span
// // // //           className={`truncate whitespace-nowrap text-sm font-medium text-gray-600 transition-opacity duration-200 ${labelClass}`}
// // // //         >
// // // //           Sign out
// // // //         </span>
// // // //       </button>
// // // //     </div>
// // // //   );
// // // // };

// // // // /* ------------------------------------------------------------------ */
// // // // /* Header = grey rail + grey top bar + inner corner                    */
// // // // /* ------------------------------------------------------------------ */

// // // // const Header: React.FC = () => {
// // // //   const navigate = useNavigate();
// // // //   const crumbs = useBreadcrumbs();
// // // //   const [drawerOpen, setDrawerOpen] = useState(false);
// // // //   const [menuOpen, setMenuOpen] = useState(false);
// // // //   const menuRef = useRef<HTMLDivElement>(null);

// // // //   // Redirect to signup if not logged in
// // // //   // useEffect(() => {
// // // //   //   if (!isLoggedIn()) {
// // // //   //     navigate("/signup", { replace: true });
// // // //   //   }
// // // //   // }, [navigate]);

// // // //   // Close the avatar menu on outside click
// // // //   useEffect(() => {
// // // //     const handleClickOutside = (event: MouseEvent) => {
// // // //       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
// // // //         setMenuOpen(false);
// // // //       }
// // // //     };
// // // //     document.addEventListener("mousedown", handleClickOutside);
// // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // //   }, []);

// // // //   // Close the mobile drawer with Escape
// // // //   useEffect(() => {
// // // //     const handleEscape = (event: KeyboardEvent) => {
// // // //       if (event.key === "Escape") setDrawerOpen(false);
// // // //     };
// // // //     document.addEventListener("keydown", handleEscape);
// // // //     return () => document.removeEventListener("keydown", handleEscape);
// // // //   }, []);

// // // //   const handleSignOut = () => {
// // // //     localStorage.removeItem("token");
// // // //     localStorage.removeItem("refreshToken");
// // // //     localStorage.removeItem("user");
// // // //     navigate("/signup", { replace: true });
// // // //   };

// // // //   return (
// // // //     <>
// // // //       {/* ---------------- Desktop rail: 64px, 240px on hover ------------------ */}
// // // //       <aside
// // // //         className="group fixed inset-y-0 left-0 z-40 hidden w-16 flex-col overflow-hidden bg-gray-100 transition-[width,box-shadow] duration-200 ease-out hover:w-60 hover:shadow-xl md:flex"
// // // //         aria-label="Main navigation"
// // // //       >
// // // //         <SidebarNav />
// // // //       </aside>

// // // //       {/* ---------------- Mobile drawer --------------------------------------- */}
// // // //       {drawerOpen && (
// // // //         <div
// // // //           className="fixed inset-0 z-40 bg-gray-900/40 md:hidden"
// // // //           onClick={() => setDrawerOpen(false)}
// // // //           aria-hidden="true"
// // // //         />
// // // //       )}
// // // //       <aside
// // // //         className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 transition-transform duration-200 ease-out md:hidden ${
// // // //           drawerOpen ? "translate-x-0" : "-translate-x-full"
// // // //         }`}
// // // //         aria-label="Main navigation"
// // // //         aria-hidden={!drawerOpen}
// // // //       >
// // // //         <button
// // // //           type="button"
// // // //           onClick={() => setDrawerOpen(false)}
// // // //           className={`${BTN_RESET} absolute right-3 top-4 cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-white`}
// // // //           aria-label="Close navigation"
// // // //         >
// // // //           <X className="h-5 w-5" />
// // // //         </button>
// // // //         <SidebarNav alwaysExpanded onNavigate={() => setDrawerOpen(false)} />
// // // //       </aside>

// // // //       {/* ---------------- Top bar + inner corner ------------------------------ */}
// // // //       <header className="sticky top-0 z-30 bg-gray-100 md:ml-16">
// // // //         <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
// // // //           {/* Hamburger (mobile only) */}
// // // //           <button
// // // //             type="button"
// // // //             onClick={() => setDrawerOpen(true)}
// // // //             className={`${BTN_RESET} cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-white md:hidden`}
// // // //             aria-label="Open navigation"
// // // //           >
// // // //             <Menu className="h-5 w-5" />
// // // //           </button>

// // // //           {/* Breadcrumb - where you are right now */}
// // // //           <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
// // // //             <ol className="m-0 flex list-none items-center gap-1 truncate p-0 text-sm">
// // // //               {crumbs.map((crumb, index) => {
// // // //                 const isLast = index === crumbs.length - 1;
// // // //                 return (
// // // //                   <li key={crumb.to} className="flex list-none items-center gap-1">
// // // //                     {index > 0 && (
// // // //                       <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
// // // //                     )}
// // // //                     {isLast ? (
// // // //                       <span className="truncate font-semibold text-gray-900">
// // // //                         {crumb.label}
// // // //                       </span>
// // // //                     ) : (
// // // //                       <Link
// // // //                         to={crumb.to}
// // // //                         className="truncate text-gray-500 hover:text-gray-800"
// // // //                       >
// // // //                         {crumb.label}
// // // //                       </Link>
// // // //                     )}
// // // //                   </li>
// // // //                 );
// // // //               })}
// // // //             </ol>
// // // //           </nav>

// // // //           {/* Search - placeholder, remove this block if you don't need it yet */}
// // // //           <div className="relative hidden lg:block lg:w-80">
// // // //             <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
// // // //             <input
// // // //               type="search"
// // // //               placeholder="Search..."
// // // //               className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
// // // //             />
// // // //           </div>

// // // //           {/* Avatar + menu */}
// // // //           <div className="relative shrink-0" ref={menuRef}>
// // // //             <button
// // // //               type="button"
// // // //               onClick={() => setMenuOpen(!menuOpen)}
// // // //               className={`${BTN_RESET} flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-teal-600 text-sm font-medium text-white`}
// // // //               aria-haspopup="menu"
// // // //               aria-expanded={menuOpen}
// // // //             >
// // // //               JS
// // // //             </button>

// // // //             {menuOpen && (
// // // //               <div className="absolute right-0 z-10 mt-2 w-40 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
// // // //                 <button
// // // //                   type="button"
// // // //                   onClick={handleSignOut}
// // // //                   className={`${BTN_RESET} w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100`}
// // // //                 >
// // // //                   Sign out
// // // //                 </button>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         {/* The inside corner. A 16px white strip whose top-left is rounded, so
// // // //             the grey rail and grey top bar show through as a curve. It sits
// // // //             flush against your page content, which is also white. */}
// // // //         <div className="h-4 bg-white md:rounded-tl-2xl" aria-hidden="true" />
// // // //       </header>
// // // //     </>
// // // //   );
// // // // };

// // // // export default Header;



// // // import React, { useState, useEffect, useRef, useMemo } from "react";
// // // import { useNavigate, useLocation, Link } from "react-router-dom";
// // // import {
// // //   Briefcase,
// // //   Users,
// // //   ClipboardCheck,
// // //   Sparkles,
// // //   MessageCircle,
// // //   Menu,
// // //   X,
// // //   Search,
// // //   LogOut,
// // //   ChevronRight,
// // // } from "lucide-react";
// // // // import { isLoggedIn } from "../utils/auth";

// // // /* ------------------------------------------------------------------ */
// // // /* Button reset                                                        */
// // // /*                                                                     */
// // // /* Neutralises any global `button { ... }` rule (the Vite starter CSS   */
// // // /* sets padding: 0.6em 1.2em, a border and a dark background). Every    */
// // // /* button in this file starts from zero and opts back in explicitly.    */
// // // /* ------------------------------------------------------------------ */
// // // const BTN_RESET = "m-0 appearance-none border-0 bg-transparent p-0";

// // // /* ------------------------------------------------------------------ */
// // // /* Navigation config                                                   */
// // // /* ------------------------------------------------------------------ */

// // // type NavItem = {
// // //   name: string;
// // //   route: string;
// // //   icon: React.ComponentType<{ className?: string }>;
// // // };

// // // const NAV_ITEMS: NavItem[] = [
// // //   { name: "Positions", route: "/position-management", icon: Briefcase },
// // //   { name: "Candidates", route: "/candidate-management", icon: Users },
// // //   { name: "Submissions", route: "/submission-management", icon: ClipboardCheck },
// // //   { name: "AI Matcher", route: "/ai-matcher", icon: Sparkles },
// // //   { name: "WhatsApp Messages", route: "/whatsapp-tab", icon: MessageCircle },
// // // ];

// // // /* Labels used by the breadcrumb. Anything missing falls back to a
// // //    prettified version of the URL segment. */
// // // const ROUTE_LABELS: Record<string, string> = {
// // //   "position-management": "Positions",
// // //   "candidate-management": "Candidates",
// // //   "submission-management": "Submissions",
// // //   "ai-matcher": "AI Matcher",
// // //   "whatsapp-tab": "WhatsApp Messages",
// // //   create: "Create",
// // //   edit: "Edit",
// // // };

// // // /* ------------------------------------------------------------------ */
// // // /* Breadcrumb helpers                                                  */
// // // /* ------------------------------------------------------------------ */

// // // const isIdSegment = (segment: string) =>
// // //   /^\d+$/.test(segment) || /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(segment);

// // // const prettify = (segment: string) =>
// // //   segment.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

// // // const singular = (label: string) =>
// // //   label.endsWith("s") ? label.slice(0, -1) : label;

// // // type Crumb = { label: string; to: string };

// // // const useBreadcrumbs = (): Crumb[] => {
// // //   const { pathname } = useLocation();

// // //   return useMemo(() => {
// // //     const segments = pathname.split("/").filter(Boolean);
// // //     const crumbs: Crumb[] = [];
// // //     let path = "";

// // //     segments.forEach((segment) => {
// // //       path += `/${segment}`;
// // //       if (isIdSegment(segment)) {
// // //         const parent = crumbs[crumbs.length - 1]?.label ?? "Record";
// // //         crumbs.push({ label: `${singular(parent)} Detail`, to: path });
// // //       } else {
// // //         crumbs.push({ label: ROUTE_LABELS[segment] ?? prettify(segment), to: path });
// // //       }
// // //     });

// // //     return crumbs;
// // //   }, [pathname]);
// // // };

// // // /* ------------------------------------------------------------------ */
// // // /* Sidebar contents (shared by the desktop rail and the mobile drawer) */
// // // /*                                                                     */
// // // /* Alignment: every row starts with a w-16 (64px) column that holds the */
// // // /* 40px tile dead centre. The rail is also 64px when collapsed, so the  */
// // // /* HR tile and all five icons land on the rail's centre line. Buttons   */
// // // /* carry BTN_RESET so no global padding can shift them.                */
// // // /* ------------------------------------------------------------------ */

// // // interface SidebarNavProps {
// // //   /** Mobile drawer keeps labels visible; the desktop rail reveals them on hover. */
// // //   alwaysExpanded?: boolean;
// // //   onNavigate?: () => void;
// // // }

// // // const SidebarNav: React.FC<SidebarNavProps> = ({ alwaysExpanded = false, onNavigate }) => {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();

// // //   const labelClass = alwaysExpanded
// // //     ? "opacity-100"
// // //     : "opacity-0 group-hover:opacity-100";

// // //   const handleSignOut = () => {
// // //     localStorage.removeItem("token");
// // //     localStorage.removeItem("refreshToken");
// // //     localStorage.removeItem("user");
// // //     onNavigate?.();
// // //     navigate("/signup", { replace: true });
// // //   };

// // //   /* Row layout: the row is `relative h-12`, and the icon column is
// // //      `absolute left-0 w-16`. An absolutely positioned child is placed against
// // //      its parent's PADDING BOX, so any padding a global stylesheet puts on the
// // //      button cannot move it. This is why the icons line up regardless of CSS
// // //      you may have elsewhere in the app. */
// // //   const ICON_COL = "absolute left-0 top-0 flex h-12 w-16 items-center justify-center";
// // //   const LABEL_COL =
// // //     "absolute left-16 right-3 top-0 flex h-12 items-center truncate whitespace-nowrap transition-opacity duration-200";

// // //   return (
// // //     <div className="flex h-full flex-col py-3">
// // //       {/* Brand */}
// // //       <div className="relative h-12 w-full shrink-0">
// // //         <span className={ICON_COL}>
// // //           <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white">
// // //             HR
// // //           </span>
// // //         </span>
// // //         <span
// // //           className={`${LABEL_COL} text-base font-semibold text-gray-900 ${labelClass}`}
// // //         >
// // //           HR Dashboard
// // //         </span>
// // //       </div>

// // //       {/* Primary navigation */}
// // //       <nav className="mt-6 flex-1 p-0">
// // //         <ul className="m-0 list-none p-0">
// // //           {NAV_ITEMS.map((item) => {
// // //             const Icon = item.icon;
// // //             const isActive = location.pathname.startsWith(item.route);

// // //             return (
// // //               <li key={item.route} className="m-0 list-none p-0">
// // //                 <button
// // //                   type="button"
// // //                   onClick={() => {
// // //                     navigate(item.route);
// // //                     onNavigate?.();
// // //                   }}
// // //                   title={alwaysExpanded ? undefined : item.name}
// // //                   aria-current={isActive ? "page" : undefined}
// // //                   className={`${BTN_RESET} group/item relative block h-12 w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
// // //                 >
// // //                   <span className={ICON_COL}>
// // //                     <span
// // //                       className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 ${
// // //                         isActive
// // //                           ? "bg-teal-600 text-white shadow-sm"
// // //                           : "text-gray-500 group-hover/item:bg-white group-hover/item:text-gray-900"
// // //                       }`}
// // //                     >
// // //                       <Icon className="h-5 w-5" />
// // //                     </span>
// // //                   </span>
// // //                   <span
// // //                     className={`${LABEL_COL} text-sm font-medium ${labelClass} ${
// // //                       isActive ? "text-teal-700" : "text-gray-600"
// // //                     }`}
// // //                   >
// // //                     {item.name}
// // //                   </span>
// // //                 </button>
// // //               </li>
// // //             );
// // //           })}
// // //         </ul>
// // //       </nav>

// // //       {/* Sign out */}
// // //       <div className="mb-3 border-t border-gray-200" />
// // //       <button
// // //         type="button"
// // //         onClick={handleSignOut}
// // //         title={alwaysExpanded ? undefined : "Sign out"}
// // //         className={`${BTN_RESET} group/item relative block h-12 w-full shrink-0 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
// // //       >
// // //         <span className={ICON_COL}>
// // //           <span className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors duration-200 group-hover/item:bg-white group-hover/item:text-red-600">
// // //             <LogOut className="h-5 w-5" />
// // //           </span>
// // //         </span>
// // //         <span className={`${LABEL_COL} text-sm font-medium text-gray-600 ${labelClass}`}>
// // //           Sign out
// // //         </span>
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // /* ------------------------------------------------------------------ */
// // // /* Header = grey rail + grey top bar + inner corner                    */
// // // /* ------------------------------------------------------------------ */

// // // const Header: React.FC = () => {
// // //   const navigate = useNavigate();
// // //   const crumbs = useBreadcrumbs();
// // //   const [drawerOpen, setDrawerOpen] = useState(false);
// // //   const [menuOpen, setMenuOpen] = useState(false);
// // //   const menuRef = useRef<HTMLDivElement>(null);

// // //   // Redirect to signup if not logged in
// // //   // useEffect(() => {
// // //   //   if (!isLoggedIn()) {
// // //   //     navigate("/signup", { replace: true });
// // //   //   }
// // //   // }, [navigate]);

// // //   // Close the avatar menu on outside click
// // //   useEffect(() => {
// // //     const handleClickOutside = (event: MouseEvent) => {
// // //       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
// // //         setMenuOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   // Close the mobile drawer with Escape
// // //   useEffect(() => {
// // //     const handleEscape = (event: KeyboardEvent) => {
// // //       if (event.key === "Escape") setDrawerOpen(false);
// // //     };
// // //     document.addEventListener("keydown", handleEscape);
// // //     return () => document.removeEventListener("keydown", handleEscape);
// // //   }, []);

// // //   const handleSignOut = () => {
// // //     localStorage.removeItem("token");
// // //     localStorage.removeItem("refreshToken");
// // //     localStorage.removeItem("user");
// // //     navigate("/signup", { replace: true });
// // //   };

// // //   return (
// // //     <>
// // //       {/* ---------------- Desktop rail: 64px, 240px on hover ------------------ */}
// // //       <aside
// // //         className="group fixed inset-y-0 left-0 z-40 hidden w-16 flex-col overflow-hidden bg-gray-100 transition-[width,box-shadow] duration-200 ease-out hover:w-60 hover:shadow-xl md:flex"
// // //         aria-label="Main navigation"
// // //       >
// // //         <SidebarNav />
// // //       </aside>

// // //       {/* ---------------- Mobile drawer --------------------------------------- */}
// // //       {drawerOpen && (
// // //         <div
// // //           className="fixed inset-0 z-40 bg-gray-900/40 md:hidden"
// // //           onClick={() => setDrawerOpen(false)}
// // //           aria-hidden="true"
// // //         />
// // //       )}
// // //       <aside
// // //         className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 transition-transform duration-200 ease-out md:hidden ${
// // //           drawerOpen ? "translate-x-0" : "-translate-x-full"
// // //         }`}
// // //         aria-label="Main navigation"
// // //         aria-hidden={!drawerOpen}
// // //       >
// // //         <button
// // //           type="button"
// // //           onClick={() => setDrawerOpen(false)}
// // //           className={`${BTN_RESET} absolute right-3 top-4 cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-white`}
// // //           aria-label="Close navigation"
// // //         >
// // //           <X className="h-5 w-5" />
// // //         </button>
// // //         <SidebarNav alwaysExpanded onNavigate={() => setDrawerOpen(false)} />
// // //       </aside>

// // //       {/* ---------------- Top bar + inner corner ------------------------------ */}
// // //       <header className="sticky top-0 z-30 bg-gray-100 md:ml-16">
// // //         <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
// // //           {/* Hamburger (mobile only) */}
// // //           <button
// // //             type="button"
// // //             onClick={() => setDrawerOpen(true)}
// // //             className={`${BTN_RESET} cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-white md:hidden`}
// // //             aria-label="Open navigation"
// // //           >
// // //             <Menu className="h-5 w-5" />
// // //           </button>

// // //           {/* Breadcrumb - where you are right now */}
// // //           <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
// // //             <ol className="m-0 flex list-none items-center gap-1 truncate p-0 text-sm">
// // //               {crumbs.map((crumb, index) => {
// // //                 const isLast = index === crumbs.length - 1;
// // //                 return (
// // //                   <li key={crumb.to} className="flex list-none items-center gap-1">
// // //                     {index > 0 && (
// // //                       <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
// // //                     )}
// // //                     {isLast ? (
// // //                       <span className="truncate font-semibold text-gray-900">
// // //                         {crumb.label}
// // //                       </span>
// // //                     ) : (
// // //                       <Link
// // //                         to={crumb.to}
// // //                         className="truncate text-gray-500 hover:text-gray-800"
// // //                       >
// // //                         {crumb.label}
// // //                       </Link>
// // //                     )}
// // //                   </li>
// // //                 );
// // //               })}
// // //             </ol>
// // //           </nav>

// // //           {/* Search - placeholder, remove this block if you don't need it yet */}
// // //           <div className="relative hidden lg:block lg:w-80">
// // //             <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
// // //             <input
// // //               type="search"
// // //               placeholder="Search..."
// // //               className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
// // //             />
// // //           </div>

// // //           {/* Avatar + menu */}
// // //           <div className="relative shrink-0" ref={menuRef}>
// // //             <button
// // //               type="button"
// // //               onClick={() => setMenuOpen(!menuOpen)}
// // //               className={`${BTN_RESET} flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-teal-600 text-sm font-medium text-white`}
// // //               aria-haspopup="menu"
// // //               aria-expanded={menuOpen}
// // //             >
// // //               JS
// // //             </button>

// // //             {menuOpen && (
// // //               <div className="absolute right-0 z-10 mt-2 w-40 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
// // //                 <button
// // //                   type="button"
// // //                   onClick={handleSignOut}
// // //                   className={`${BTN_RESET} w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100`}
// // //                 >
// // //                   Sign out
// // //                 </button>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* The inside corner. A 16px white strip whose top-left is rounded, so
// // //             the grey rail and grey top bar show through as a curve. It sits
// // //             flush against your page content, which is also white. */}
// // //         <div className="h-4 bg-white md:rounded-tl-2xl" aria-hidden="true" />
// // //       </header>
// // //     </>
// // //   );
// // // };

// // // export default Header;












// // // import React, { useState, useEffect, useRef, useMemo } from "react";
// // // import { useNavigate, useLocation, Link } from "react-router-dom";
// // // import {
// // //   Briefcase,
// // //   Users,
// // //   ClipboardCheck,
// // //   Sparkles,
// // //   MessageCircle,
// // //   Menu,
// // //   X,
// // //   Search,
// // //   LogOut,
// // //   ChevronRight,
// // //   PhoneCall,
// // //   Activity,
// // //   BarChart3,
// // // } from "lucide-react";
// // // // import { isLoggedIn } from "../utils/auth";

// // // /* ------------------------------------------------------------------ */
// // // /* Button reset                                                        */
// // // /*                                                                     */
// // // /* Neutralises any global `button { ... }` rule (the Vite starter CSS   */
// // // /* sets padding: 0.6em 1.2em, a border and a dark background). Every    */
// // // /* button in this file starts from zero and opts back in explicitly.    */
// // // /* ------------------------------------------------------------------ */
// // // const BTN_RESET = "m-0 appearance-none border-0 bg-transparent p-0";

// // // /* ------------------------------------------------------------------ */
// // // /* Navigation config                                                   */
// // // /* ------------------------------------------------------------------ */

// // // type NavItem = {
// // //   name: string;
// // //   route: string;
// // //   icon: React.ComponentType<{ className?: string }>;
// // // };

// // // const NAV_ITEMS: NavItem[] = [
// // //   { name: "Pipeline", route: "/pipeline-dashboard", icon: BarChart3 },
// // //   { name: "Positions", route: "/position-management", icon: Briefcase },
// // //   { name: "Calling Tracker", route: "/calling-tracker", icon: PhoneCall },
// // //   { name: "Candidates", route: "/candidate-management", icon: Users },
// // //   { name: "Submissions", route: "/submission-management", icon: ClipboardCheck },
// // //   { name: "Candidate Tracker", route: "/candidate-tracker", icon: Activity },
// // //   { name: "AI Matcher", route: "/ai-matcher", icon: Sparkles },
// // //   { name: "WhatsApp Messages", route: "/whatsapp-tab", icon: MessageCircle },
// // // ];

// // // /* Labels used by the breadcrumb. Anything missing falls back to a
// // //    prettified version of the URL segment. */
// // // const ROUTE_LABELS: Record<string, string> = {
// // //   "pipeline-dashboard": "Pipeline Dashboard",
// // //   "position-management": "Positions",
// // //   "calling-tracker": "Calling Tracker",
// // //   "candidate-management": "Candidates",
// // //   "submission-management": "Submissions",
// // //   "candidate-tracker": "Candidate Tracker",
// // //   "ai-matcher": "AI Matcher",
// // //   "whatsapp-tab": "WhatsApp Messages",
// // //   create: "Create",
// // //   edit: "Edit",
// // // };

// // // /* ------------------------------------------------------------------ */
// // // /* Breadcrumb helpers                                                  */
// // // /* ------------------------------------------------------------------ */

// // // const isIdSegment = (segment: string) =>
// // //   /^\d+$/.test(segment) || /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(segment);

// // // const prettify = (segment: string) =>
// // //   segment.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

// // // const singular = (label: string) =>
// // //   label.endsWith("s") ? label.slice(0, -1) : label;

// // // type Crumb = { label: string; to: string };

// // // const useBreadcrumbs = (): Crumb[] => {
// // //   const { pathname } = useLocation();

// // //   return useMemo(() => {
// // //     const segments = pathname.split("/").filter(Boolean);
// // //     const crumbs: Crumb[] = [];
// // //     let path = "";

// // //     segments.forEach((segment) => {
// // //       path += `/${segment}`;
// // //       if (isIdSegment(segment)) {
// // //         const parent = crumbs[crumbs.length - 1]?.label ?? "Record";
// // //         crumbs.push({ label: `${singular(parent)} Detail`, to: path });
// // //       } else {
// // //         crumbs.push({ label: ROUTE_LABELS[segment] ?? prettify(segment), to: path });
// // //       }
// // //     });

// // //     return crumbs;
// // //   }, [pathname]);
// // // };

// // // /* ------------------------------------------------------------------ */
// // // /* Sidebar contents (shared by the desktop rail and the mobile drawer) */
// // // /*                                                                     */
// // // /* Alignment: every row starts with a w-16 (64px) column that holds the */
// // // /* 40px tile dead centre. The rail is also 64px when collapsed, so the  */
// // // /* HR tile and all five icons land on the rail's centre line. Buttons   */
// // // /* carry BTN_RESET so no global padding can shift them.                */
// // // /* ------------------------------------------------------------------ */

// // // interface SidebarNavProps {
// // //   /** Mobile drawer keeps labels visible; the desktop rail reveals them on hover. */
// // //   alwaysExpanded?: boolean;
// // //   onNavigate?: () => void;
// // // }

// // // const SidebarNav: React.FC<SidebarNavProps> = ({ alwaysExpanded = false, onNavigate }) => {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();

// // //   const labelClass = alwaysExpanded
// // //     ? "opacity-100"
// // //     : "opacity-0 group-hover:opacity-100";

// // //   const handleSignOut = () => {
// // //     localStorage.removeItem("token");
// // //     localStorage.removeItem("refreshToken");
// // //     localStorage.removeItem("user");
// // //     onNavigate?.();
// // //     navigate("/signup", { replace: true });
// // //   };

// // //   /* Row layout: the row is `relative h-12`, and the icon column is
// // //      `absolute left-0 w-16`. An absolutely positioned child is placed against
// // //      its parent's PADDING BOX, so any padding a global stylesheet puts on the
// // //      button cannot move it. This is why the icons line up regardless of CSS
// // //      you may have elsewhere in the app. */
// // //   const ICON_COL = "absolute left-0 top-0 flex h-12 w-16 items-center justify-center";
// // //   const LABEL_COL =
// // //     "absolute left-16 right-3 top-0 flex h-12 items-center truncate whitespace-nowrap transition-opacity duration-200";

// // //   return (
// // //     <div className="flex h-full flex-col py-3">
// // //       {/* Brand */}
// // //       <div className="relative h-12 w-full shrink-0">
// // //         <span className={ICON_COL}>
// // //           <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white">
// // //             HR
// // //           </span>
// // //         </span>
// // //         <span
// // //           className={`${LABEL_COL} text-base font-semibold text-gray-900 ${labelClass}`}
// // //         >
// // //           HR Dashboard
// // //         </span>
// // //       </div>

// // //       {/* Primary navigation */}
// // //       <nav className="mt-6 flex-1 p-0">
// // //         <ul className="m-0 list-none p-0">
// // //           {NAV_ITEMS.map((item) => {
// // //             const Icon = item.icon;
// // //             const isActive = location.pathname.startsWith(item.route);

// // //             return (
// // //               <li key={item.route} className="m-0 list-none p-0">
// // //                 <button
// // //                   type="button"
// // //                   onClick={() => {
// // //                     navigate(item.route);
// // //                     onNavigate?.();
// // //                   }}
// // //                   title={alwaysExpanded ? undefined : item.name}
// // //                   aria-current={isActive ? "page" : undefined}
// // //                   className={`${BTN_RESET} group/item relative block h-12 w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
// // //                 >
// // //                   <span className={ICON_COL}>
// // //                     <span
// // //                       className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 ${
// // //                         isActive
// // //                           ? "bg-teal-600 text-white shadow-sm"
// // //                           : "text-gray-500 group-hover/item:bg-white group-hover/item:text-gray-900"
// // //                       }`}
// // //                     >
// // //                       <Icon className="h-5 w-5" />
// // //                     </span>
// // //                   </span>
// // //                   <span
// // //                     className={`${LABEL_COL} text-sm font-medium ${labelClass} ${
// // //                       isActive ? "text-teal-700" : "text-gray-600"
// // //                     }`}
// // //                   >
// // //                     {item.name}
// // //                   </span>
// // //                 </button>
// // //               </li>
// // //             );
// // //           })}
// // //         </ul>
// // //       </nav>

// // //       {/* Sign out */}
// // //       <div className="mb-3 border-t border-gray-200" />
// // //       <button
// // //         type="button"
// // //         onClick={handleSignOut}
// // //         title={alwaysExpanded ? undefined : "Sign out"}
// // //         className={`${BTN_RESET} group/item relative block h-12 w-full shrink-0 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
// // //       >
// // //         <span className={ICON_COL}>
// // //           <span className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors duration-200 group-hover/item:bg-white group-hover/item:text-red-600">
// // //             <LogOut className="h-5 w-5" />
// // //           </span>
// // //         </span>
// // //         <span className={`${LABEL_COL} text-sm font-medium text-gray-600 ${labelClass}`}>
// // //           Sign out
// // //         </span>
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // /* ------------------------------------------------------------------ */
// // // /* Header = grey rail + grey top bar + inner corner                    */
// // // /* ------------------------------------------------------------------ */

// // // const Header: React.FC = () => {
// // //   const navigate = useNavigate();
// // //   const crumbs = useBreadcrumbs();
// // //   const [drawerOpen, setDrawerOpen] = useState(false);
// // //   const [menuOpen, setMenuOpen] = useState(false);
// // //   const menuRef = useRef<HTMLDivElement>(null);

// // //   // Redirect to signup if not logged in
// // //   // useEffect(() => {
// // //   //   if (!isLoggedIn()) {
// // //   //     navigate("/signup", { replace: true });
// // //   //   }
// // //   // }, [navigate]);

// // //   // Close the avatar menu on outside click
// // //   useEffect(() => {
// // //     const handleClickOutside = (event: MouseEvent) => {
// // //       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
// // //         setMenuOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   // Close the mobile drawer with Escape
// // //   useEffect(() => {
// // //     const handleEscape = (event: KeyboardEvent) => {
// // //       if (event.key === "Escape") setDrawerOpen(false);
// // //     };
// // //     document.addEventListener("keydown", handleEscape);
// // //     return () => document.removeEventListener("keydown", handleEscape);
// // //   }, []);

// // //   const handleSignOut = () => {
// // //     localStorage.removeItem("token");
// // //     localStorage.removeItem("refreshToken");
// // //     localStorage.removeItem("user");
// // //     navigate("/signup", { replace: true });
// // //   };

// // //   return (
// // //     <>
// // //       {/* ---------------- Desktop rail: 64px, 240px on hover ------------------ */}
// // //       <aside
// // //         className="group fixed inset-y-0 left-0 z-40 hidden w-16 flex-col overflow-hidden bg-gray-100 transition-[width,box-shadow] duration-200 ease-out hover:w-60 hover:shadow-xl md:flex"
// // //         aria-label="Main navigation"
// // //       >
// // //         <SidebarNav />
// // //       </aside>

// // //       {/* ---------------- Mobile drawer --------------------------------------- */}
// // //       {drawerOpen && (
// // //         <div
// // //           className="fixed inset-0 z-40 bg-gray-900/40 md:hidden"
// // //           onClick={() => setDrawerOpen(false)}
// // //           aria-hidden="true"
// // //         />
// // //       )}
// // //       <aside
// // //         className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 transition-transform duration-200 ease-out md:hidden ${
// // //           drawerOpen ? "translate-x-0" : "-translate-x-full"
// // //         }`}
// // //         aria-label="Main navigation"
// // //         aria-hidden={!drawerOpen}
// // //       >
// // //         <button
// // //           type="button"
// // //           onClick={() => setDrawerOpen(false)}
// // //           className={`${BTN_RESET} absolute right-3 top-4 cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-white`}
// // //           aria-label="Close navigation"
// // //         >
// // //           <X className="h-5 w-5" />
// // //         </button>
// // //         <SidebarNav alwaysExpanded onNavigate={() => setDrawerOpen(false)} />
// // //       </aside>

// // //       {/* ---------------- Top bar + inner corner ------------------------------ */}
// // //       <header className="sticky top-0 z-30 bg-gray-100 md:ml-16">
// // //         <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
// // //           {/* Hamburger (mobile only) */}
// // //           <button
// // //             type="button"
// // //             onClick={() => setDrawerOpen(true)}
// // //             className={`${BTN_RESET} cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-white md:hidden`}
// // //             aria-label="Open navigation"
// // //           >
// // //             <Menu className="h-5 w-5" />
// // //           </button>

// // //           {/* Breadcrumb - where you are right now */}
// // //           <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
// // //             <ol className="m-0 flex list-none items-center gap-1 truncate p-0 text-sm">
// // //               {crumbs.map((crumb, index) => {
// // //                 const isLast = index === crumbs.length - 1;
// // //                 return (
// // //                   <li key={crumb.to} className="flex list-none items-center gap-1">
// // //                     {index > 0 && (
// // //                       <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
// // //                     )}
// // //                     {isLast ? (
// // //                       <span className="truncate font-semibold text-gray-900">
// // //                         {crumb.label}
// // //                       </span>
// // //                     ) : (
// // //                       <Link
// // //                         to={crumb.to}
// // //                         className="truncate text-gray-500 hover:text-gray-800"
// // //                       >
// // //                         {crumb.label}
// // //                       </Link>
// // //                     )}
// // //                   </li>
// // //                 );
// // //               })}
// // //             </ol>
// // //           </nav>

// // //           {/* Search - placeholder, remove this block if you don't need it yet */}
// // //           <div className="relative hidden lg:block lg:w-80">
// // //             <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
// // //             <input
// // //               type="search"
// // //               placeholder="Search..."
// // //               className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
// // //             />
// // //           </div>

// // //           {/* Avatar + menu */}
// // //           <div className="relative shrink-0" ref={menuRef}>
// // //             <button
// // //               type="button"
// // //               onClick={() => setMenuOpen(!menuOpen)}
// // //               className={`${BTN_RESET} flex h-9 w-9 cursor-pointer items-center justify-center rounded-full !bg-teal-600 text-sm font-medium !text-white`}
// // //               aria-haspopup="menu"
// // //               aria-expanded={menuOpen}
// // //             >
// // //               JS
// // //             </button>

// // //             {menuOpen && (
// // //               <div className="absolute right-0 z-10 mt-2 w-40 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
// // //                 <button
// // //                   type="button"
// // //                   onClick={handleSignOut}
// // //                   className={`${BTN_RESET} w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100`}
// // //                 >
// // //                   Sign out
// // //                 </button>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* The inside corner. A 16px white strip whose top-left is rounded, so
// // //             the grey rail and grey top bar show through as a curve. It sits
// // //             flush against your page content, which is also white. */}
// // //         <div className="h-4 bg-white md:rounded-tl-2xl" aria-hidden="true" />
// // //       </header>
// // //     </>
// // //   );
// // // };

// // // export default Header;




// // // // import React, { useState, useEffect, useRef } from "react";
// // // // import { useNavigate, useLocation } from "react-router-dom";
// // // // import { isLoggedIn } from "../utils/auth";

// // // // // TabButton component
// // // // interface TabButtonProps {
// // // //   name: string;
// // // //   isActive: boolean;
// // // //   onClick: () => void;
// // // // }

// // // // const TabButton: React.FC<TabButtonProps> = ({ name, isActive, onClick }) => {
// // // //   return (
// // // //     <button
// // // //       onClick={onClick}
// // // //       className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
// // // //         isActive
// // // //           ? "border-teal-600 text-teal-600"
// // // //           : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
// // // //       }`}
// // // //     >
// // // //       {name}
// // // //     </button>
// // // //   );
// // // // };

// // // // // Header component
// // // // const Header: React.FC = () => {
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation();
// // // //   const [dropdownOpen, setDropdownOpen] = useState(false);
// // // //   const dropdownRef = useRef<HTMLDivElement>(null);

// // // //   // Redirect to signup if not logged in
// // // //   // useEffect(() => {
// // // //   //   if (!isLoggedIn()) {
// // // //   //     navigate("/signup", { replace: true });
// // // //   //   }
// // // //   // }, [navigate]);

// // // //   // Close dropdown on outside click
// // // //   useEffect(() => {
// // // //     const handleClickOutside = (event: MouseEvent) => {
// // // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// // // //         setDropdownOpen(false);
// // // //       }
// // // //     };
// // // //     document.addEventListener("mousedown", handleClickOutside);
// // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // //   }, []);

// // // //   const tabs = [
// // // //     { name: "Positions", route: "/position-management" },
// // // //     { name: "Candidates", route: "/candidate-management" },
// // // //     { name: "Submissions", route: "/submission-management" },
// // // //     { name: "AI Matcher", route: "/ai-matcher" },
// // // //      { name: "WhatsApp Messages", route: "/whatsapp-tab" },
// // // //   ];

// // // //   const handleTabClick = (tab: { name: string; route?: string }) => {
// // // //     if (tab.route) {
// // // //       navigate(tab.route);
// // // //     }
// // // //   };

// // // //   const handleSignOut = () => {
// // // //     localStorage.removeItem("token");
// // // //     localStorage.removeItem("refreshToken");
// // // //     localStorage.removeItem("user");
// // // //     navigate("/signup", { replace: true });
// // // //   };

// // // //   return (
// // // //     <div className="bg-white border-b border-gray-200">
// // // //       {/* Top Bar */}
// // // //       <div className="flex items-center justify-between px-6 py-4">
// // // //         <div className="flex items-center space-x-4">
// // // //           <div className="flex items-center space-x-2">
// // // //             <div className="w-8 h-8 bg-teal-600 rounded text-white flex items-center justify-center font-bold text-sm">
// // // //               HR
// // // //             </div>
// // // //             <span className="text-lg font-semibold text-gray-800">
// // // //               HR Dashboard
// // // //             </span>
// // // //           </div>
// // // //         </div>

// // // //         {/* JS Avatar + Dropdown */}
// // // //         <div className="relative" ref={dropdownRef}>
// // // //           <div
// // // //             onClick={() => setDropdownOpen(!dropdownOpen)}
// // // //             className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-medium text-sm cursor-pointer"
// // // //           >
// // // //             JS
// // // //           </div>

// // // //           {dropdownOpen && (
// // // //             <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
// // // //               <button
// // // //                 onClick={handleSignOut}
// // // //                 className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
// // // //               >
// // // //                 Sign Out
// // // //               </button>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {/* Navigation Tabs */}
// // // //       <div className="flex space-x-8 px-6">
// // // //         {tabs.map((tab) => (
// // // //           <TabButton
// // // //             key={tab.name}
// // // //             name={tab.name}
// // // //             isActive={location.pathname === tab.route}
// // // //             onClick={() => handleTabClick(tab)}
// // // //           />
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Header;




// // // // //
// // // // import React, { useState, useEffect, useRef, useMemo } from "react";
// // // // import { useNavigate, useLocation, Link } from "react-router-dom";
// // // // import {
// // // //   Briefcase,
// // // //   Users,
// // // //   ClipboardCheck,
// // // //   Sparkles,
// // // //   MessageCircle,
// // // //   Menu,
// // // //   X,
// // // //   Search,
// // // //   LogOut,
// // // //   ChevronRight,
// // // // } from "lucide-react";
// // // // // import { isLoggedIn } from "../utils/auth";

// // // // /* ------------------------------------------------------------------ */
// // // // /* Button reset                                                        */
// // // // /*                                                                     */
// // // // /* Neutralises any global `button { ... }` rule (the Vite starter CSS   */
// // // // /* sets padding: 0.6em 1.2em, a border and a dark background). Every    */
// // // // /* button in this file starts from zero and opts back in explicitly.    */
// // // // /* ------------------------------------------------------------------ */
// // // // const BTN_RESET = "m-0 appearance-none border-0 bg-transparent p-0 font-inherit";

// // // // /* ------------------------------------------------------------------ */
// // // // /* Navigation config                                                   */
// // // // /* ------------------------------------------------------------------ */

// // // // type NavItem = {
// // // //   name: string;
// // // //   route: string;
// // // //   icon: React.ComponentType<{ className?: string }>;
// // // // };

// // // // const NAV_ITEMS: NavItem[] = [
// // // //   { name: "Positions", route: "/position-management", icon: Briefcase },
// // // //   { name: "Candidates", route: "/candidate-management", icon: Users },
// // // //   { name: "Submissions", route: "/submission-management", icon: ClipboardCheck },
// // // //   { name: "AI Matcher", route: "/ai-matcher", icon: Sparkles },
// // // //   { name: "WhatsApp Messages", route: "/whatsapp-tab", icon: MessageCircle },
// // // // ];

// // // // /* Labels used by the breadcrumb. Anything missing falls back to a
// // // //    prettified version of the URL segment. */
// // // // const ROUTE_LABELS: Record<string, string> = {
// // // //   "position-management": "Positions",
// // // //   "candidate-management": "Candidates",
// // // //   "submission-management": "Submissions",
// // // //   "ai-matcher": "AI Matcher",
// // // //   "whatsapp-tab": "WhatsApp Messages",
// // // //   create: "Create",
// // // //   edit: "Edit",
// // // // };

// // // // /* ------------------------------------------------------------------ */
// // // // /* Breadcrumb helpers                                                  */
// // // // /* ------------------------------------------------------------------ */

// // // // const isIdSegment = (segment: string) =>
// // // //   /^\d+$/.test(segment) || /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(segment);

// // // // const prettify = (segment: string) =>
// // // //   segment.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

// // // // const singular = (label: string) =>
// // // //   label.endsWith("s") ? label.slice(0, -1) : label;

// // // // type Crumb = { label: string; to: string };

// // // // const useBreadcrumbs = (): Crumb[] => {
// // // //   const { pathname } = useLocation();

// // // //   return useMemo(() => {
// // // //     const segments = pathname.split("/").filter(Boolean);
// // // //     const crumbs: Crumb[] = [];
// // // //     let path = "";

// // // //     segments.forEach((segment) => {
// // // //       path += `/${segment}`;
// // // //       if (isIdSegment(segment)) {
// // // //         const parent = crumbs[crumbs.length - 1]?.label ?? "Record";
// // // //         crumbs.push({ label: `${singular(parent)} Detail`, to: path });
// // // //       } else {
// // // //         crumbs.push({ label: ROUTE_LABELS[segment] ?? prettify(segment), to: path });
// // // //       }
// // // //     });

// // // //     return crumbs;
// // // //   }, [pathname]);
// // // // };

// // // // /* ------------------------------------------------------------------ */
// // // // /* Sidebar contents (shared by the desktop rail and the mobile drawer) */
// // // // /*                                                                     */
// // // // /* Alignment: every row starts with a w-16 (64px) column that holds the */
// // // // /* 40px tile dead centre. The rail is also 64px when collapsed, so the  */
// // // // /* HR tile and all five icons land on the rail's centre line. Buttons   */
// // // // /* carry BTN_RESET so no global padding can shift them.                */
// // // // /* ------------------------------------------------------------------ */

// // // // interface SidebarNavProps {
// // // //   /** Mobile drawer keeps labels visible; the desktop rail reveals them on hover. */
// // // //   alwaysExpanded?: boolean;
// // // //   onNavigate?: () => void;
// // // // }

// // // // const SidebarNav: React.FC<SidebarNavProps> = ({ alwaysExpanded = false, onNavigate }) => {
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation();

// // // //   const labelClass = alwaysExpanded
// // // //     ? "opacity-100"
// // // //     : "opacity-0 group-hover:opacity-100";

// // // //   const handleSignOut = () => {
// // // //     localStorage.removeItem("token");
// // // //     localStorage.removeItem("refreshToken");
// // // //     localStorage.removeItem("user");
// // // //     onNavigate?.();
// // // //     navigate("/signup", { replace: true });
// // // //   };

// // // //   return (
// // // //     <div className="flex h-full flex-col py-3">
// // // //       {/* Brand */}
// // // //       <div className="flex w-full items-center">
// // // //         <span className="flex w-16 shrink-0 items-center justify-center">
// // // //           <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white">
// // // //             HR
// // // //           </span>
// // // //         </span>
// // // //         <span
// // // //           className={`truncate whitespace-nowrap text-base font-semibold text-gray-900 transition-opacity duration-200 ${labelClass}`}
// // // //         >
// // // //           HR Dashboard
// // // //         </span>
// // // //       </div>

// // // //       {/* Primary navigation */}
// // // //       <nav className="mt-6 flex-1 p-0">
// // // //         <ul className="m-0 list-none space-y-1 p-0">
// // // //           {NAV_ITEMS.map((item) => {
// // // //             const Icon = item.icon;
// // // //             const isActive = location.pathname.startsWith(item.route);

// // // //             return (
// // // //               <li key={item.route} className="list-none">
// // // //                 <button
// // // //                   type="button"
// // // //                   onClick={() => {
// // // //                     navigate(item.route);
// // // //                     onNavigate?.();
// // // //                   }}
// // // //                   title={alwaysExpanded ? undefined : item.name}
// // // //                   aria-current={isActive ? "page" : undefined}
// // // //                   className={`${BTN_RESET} group/item flex w-full cursor-pointer items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
// // // //                 >
// // // //                   <span className="flex w-16 shrink-0 items-center justify-center">
// // // //                     <span
// // // //                       className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 ${
// // // //                         isActive
// // // //                           ? "bg-teal-600 text-white shadow-sm"
// // // //                           : "text-gray-500 group-hover/item:bg-white group-hover/item:text-gray-900"
// // // //                       }`}
// // // //                     >
// // // //                       <Icon className="h-5 w-5" />
// // // //                     </span>
// // // //                   </span>
// // // //                   <span
// // // //                     className={`truncate whitespace-nowrap text-sm font-medium transition-opacity duration-200 ${labelClass} ${
// // // //                       isActive ? "text-teal-700" : "text-gray-600"
// // // //                     }`}
// // // //                   >
// // // //                     {item.name}
// // // //                   </span>
// // // //                 </button>
// // // //               </li>
// // // //             );
// // // //           })}
// // // //         </ul>
// // // //       </nav>

// // // //       {/* Sign out */}
// // // //       <div className="mb-3 border-t border-gray-200" />
// // // //       <button
// // // //         type="button"
// // // //         onClick={handleSignOut}
// // // //         title={alwaysExpanded ? undefined : "Sign out"}
// // // //         className={`${BTN_RESET} group/item flex w-full cursor-pointer items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
// // // //       >
// // // //         <span className="flex w-16 shrink-0 items-center justify-center">
// // // //           <span className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors duration-200 group-hover/item:bg-white group-hover/item:text-red-600">
// // // //             <LogOut className="h-5 w-5" />
// // // //           </span>
// // // //         </span>
// // // //         <span
// // // //           className={`truncate whitespace-nowrap text-sm font-medium text-gray-600 transition-opacity duration-200 ${labelClass}`}
// // // //         >
// // // //           Sign out
// // // //         </span>
// // // //       </button>
// // // //     </div>
// // // //   );
// // // // };

// // // // /* ------------------------------------------------------------------ */
// // // // /* Header = grey rail + grey top bar + inner corner                    */
// // // // /* ------------------------------------------------------------------ */

// // // // const Header: React.FC = () => {
// // // //   const navigate = useNavigate();
// // // //   const crumbs = useBreadcrumbs();
// // // //   const [drawerOpen, setDrawerOpen] = useState(false);
// // // //   const [menuOpen, setMenuOpen] = useState(false);
// // // //   const menuRef = useRef<HTMLDivElement>(null);

// // // //   // Redirect to signup if not logged in
// // // //   // useEffect(() => {
// // // //   //   if (!isLoggedIn()) {
// // // //   //     navigate("/signup", { replace: true });
// // // //   //   }
// // // //   // }, [navigate]);

// // // //   // Close the avatar menu on outside click
// // // //   useEffect(() => {
// // // //     const handleClickOutside = (event: MouseEvent) => {
// // // //       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
// // // //         setMenuOpen(false);
// // // //       }
// // // //     };
// // // //     document.addEventListener("mousedown", handleClickOutside);
// // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // //   }, []);

// // // //   // Close the mobile drawer with Escape
// // // //   useEffect(() => {
// // // //     const handleEscape = (event: KeyboardEvent) => {
// // // //       if (event.key === "Escape") setDrawerOpen(false);
// // // //     };
// // // //     document.addEventListener("keydown", handleEscape);
// // // //     return () => document.removeEventListener("keydown", handleEscape);
// // // //   }, []);

// // // //   const handleSignOut = () => {
// // // //     localStorage.removeItem("token");
// // // //     localStorage.removeItem("refreshToken");
// // // //     localStorage.removeItem("user");
// // // //     navigate("/signup", { replace: true });
// // // //   };

// // // //   return (
// // // //     <>
// // // //       {/* ---------------- Desktop rail: 64px, 240px on hover ------------------ */}
// // // //       <aside
// // // //         className="group fixed inset-y-0 left-0 z-40 hidden w-16 flex-col overflow-hidden bg-gray-100 transition-[width,box-shadow] duration-200 ease-out hover:w-60 hover:shadow-xl md:flex"
// // // //         aria-label="Main navigation"
// // // //       >
// // // //         <SidebarNav />
// // // //       </aside>

// // // //       {/* ---------------- Mobile drawer --------------------------------------- */}
// // // //       {drawerOpen && (
// // // //         <div
// // // //           className="fixed inset-0 z-40 bg-gray-900/40 md:hidden"
// // // //           onClick={() => setDrawerOpen(false)}
// // // //           aria-hidden="true"
// // // //         />
// // // //       )}
// // // //       <aside
// // // //         className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 transition-transform duration-200 ease-out md:hidden ${
// // // //           drawerOpen ? "translate-x-0" : "-translate-x-full"
// // // //         }`}
// // // //         aria-label="Main navigation"
// // // //         aria-hidden={!drawerOpen}
// // // //       >
// // // //         <button
// // // //           type="button"
// // // //           onClick={() => setDrawerOpen(false)}
// // // //           className={`${BTN_RESET} absolute right-3 top-4 cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-white`}
// // // //           aria-label="Close navigation"
// // // //         >
// // // //           <X className="h-5 w-5" />
// // // //         </button>
// // // //         <SidebarNav alwaysExpanded onNavigate={() => setDrawerOpen(false)} />
// // // //       </aside>

// // // //       {/* ---------------- Top bar + inner corner ------------------------------ */}
// // // //       <header className="sticky top-0 z-30 bg-gray-100 md:ml-16">
// // // //         <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
// // // //           {/* Hamburger (mobile only) */}
// // // //           <button
// // // //             type="button"
// // // //             onClick={() => setDrawerOpen(true)}
// // // //             className={`${BTN_RESET} cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-white md:hidden`}
// // // //             aria-label="Open navigation"
// // // //           >
// // // //             <Menu className="h-5 w-5" />
// // // //           </button>

// // // //           {/* Breadcrumb - where you are right now */}
// // // //           <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
// // // //             <ol className="m-0 flex list-none items-center gap-1 truncate p-0 text-sm">
// // // //               {crumbs.map((crumb, index) => {
// // // //                 const isLast = index === crumbs.length - 1;
// // // //                 return (
// // // //                   <li key={crumb.to} className="flex list-none items-center gap-1">
// // // //                     {index > 0 && (
// // // //                       <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
// // // //                     )}
// // // //                     {isLast ? (
// // // //                       <span className="truncate font-semibold text-gray-900">
// // // //                         {crumb.label}
// // // //                       </span>
// // // //                     ) : (
// // // //                       <Link
// // // //                         to={crumb.to}
// // // //                         className="truncate text-gray-500 hover:text-gray-800"
// // // //                       >
// // // //                         {crumb.label}
// // // //                       </Link>
// // // //                     )}
// // // //                   </li>
// // // //                 );
// // // //               })}
// // // //             </ol>
// // // //           </nav>

// // // //           {/* Search - placeholder, remove this block if you don't need it yet */}
// // // //           <div className="relative hidden lg:block lg:w-80">
// // // //             <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
// // // //             <input
// // // //               type="search"
// // // //               placeholder="Search..."
// // // //               className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
// // // //             />
// // // //           </div>

// // // //           {/* Avatar + menu */}
// // // //           <div className="relative shrink-0" ref={menuRef}>
// // // //             <button
// // // //               type="button"
// // // //               onClick={() => setMenuOpen(!menuOpen)}
// // // //               className={`${BTN_RESET} flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-teal-600 text-sm font-medium text-white`}
// // // //               aria-haspopup="menu"
// // // //               aria-expanded={menuOpen}
// // // //             >
// // // //               JS
// // // //             </button>

// // // //             {menuOpen && (
// // // //               <div className="absolute right-0 z-10 mt-2 w-40 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
// // // //                 <button
// // // //                   type="button"
// // // //                   onClick={handleSignOut}
// // // //                   className={`${BTN_RESET} w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100`}
// // // //                 >
// // // //                   Sign out
// // // //                 </button>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         {/* The inside corner. A 16px white strip whose top-left is rounded, so
// // // //             the grey rail and grey top bar show through as a curve. It sits
// // // //             flush against your page content, which is also white. */}
// // // //         <div className="h-4 bg-white md:rounded-tl-2xl" aria-hidden="true" />
// // // //       </header>
// // // //     </>
// // // //   );
// // // // };

// // // // export default Header;



// // // import React, { useState, useEffect, useRef, useMemo } from "react";
// // // import { useNavigate, useLocation, Link } from "react-router-dom";
// // // import {
// // //   Briefcase,
// // //   Users,
// // //   ClipboardCheck,
// // //   Sparkles,
// // //   MessageCircle,
// // //   Menu,
// // //   X,
// // //   Search,
// // //   LogOut,
// // //   ChevronRight,
// // // } from "lucide-react";
// // // // import { isLoggedIn } from "../utils/auth";

// // // /* ------------------------------------------------------------------ */
// // // /* Button reset                                                        */
// // // /*                                                                     */
// // // /* Neutralises any global `button { ... }` rule (the Vite starter CSS   */
// // // /* sets padding: 0.6em 1.2em, a border and a dark background). Every    */
// // // /* button in this file starts from zero and opts back in explicitly.    */
// // // /* ------------------------------------------------------------------ */
// // // const BTN_RESET = "m-0 appearance-none border-0 bg-transparent p-0";

// // // /* ------------------------------------------------------------------ */
// // // /* Navigation config                                                   */
// // // /* ------------------------------------------------------------------ */

// // // type NavItem = {
// // //   name: string;
// // //   route: string;
// // //   icon: React.ComponentType<{ className?: string }>;
// // // };

// // // const NAV_ITEMS: NavItem[] = [
// // //   { name: "Positions", route: "/position-management", icon: Briefcase },
// // //   { name: "Candidates", route: "/candidate-management", icon: Users },
// // //   { name: "Submissions", route: "/submission-management", icon: ClipboardCheck },
// // //   { name: "AI Matcher", route: "/ai-matcher", icon: Sparkles },
// // //   { name: "WhatsApp Messages", route: "/whatsapp-tab", icon: MessageCircle },
// // // ];

// // // /* Labels used by the breadcrumb. Anything missing falls back to a
// // //    prettified version of the URL segment. */
// // // const ROUTE_LABELS: Record<string, string> = {
// // //   "position-management": "Positions",
// // //   "candidate-management": "Candidates",
// // //   "submission-management": "Submissions",
// // //   "ai-matcher": "AI Matcher",
// // //   "whatsapp-tab": "WhatsApp Messages",
// // //   create: "Create",
// // //   edit: "Edit",
// // // };

// // // /* ------------------------------------------------------------------ */
// // // /* Breadcrumb helpers                                                  */
// // // /* ------------------------------------------------------------------ */

// // // const isIdSegment = (segment: string) =>
// // //   /^\d+$/.test(segment) || /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(segment);

// // // const prettify = (segment: string) =>
// // //   segment.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

// // // const singular = (label: string) =>
// // //   label.endsWith("s") ? label.slice(0, -1) : label;

// // // type Crumb = { label: string; to: string };

// // // const useBreadcrumbs = (): Crumb[] => {
// // //   const { pathname } = useLocation();

// // //   return useMemo(() => {
// // //     const segments = pathname.split("/").filter(Boolean);
// // //     const crumbs: Crumb[] = [];
// // //     let path = "";

// // //     segments.forEach((segment) => {
// // //       path += `/${segment}`;
// // //       if (isIdSegment(segment)) {
// // //         const parent = crumbs[crumbs.length - 1]?.label ?? "Record";
// // //         crumbs.push({ label: `${singular(parent)} Detail`, to: path });
// // //       } else {
// // //         crumbs.push({ label: ROUTE_LABELS[segment] ?? prettify(segment), to: path });
// // //       }
// // //     });

// // //     return crumbs;
// // //   }, [pathname]);
// // // };

// // // /* ------------------------------------------------------------------ */
// // // /* Sidebar contents (shared by the desktop rail and the mobile drawer) */
// // // /*                                                                     */
// // // /* Alignment: every row starts with a w-16 (64px) column that holds the */
// // // /* 40px tile dead centre. The rail is also 64px when collapsed, so the  */
// // // /* HR tile and all five icons land on the rail's centre line. Buttons   */
// // // /* carry BTN_RESET so no global padding can shift them.                */
// // // /* ------------------------------------------------------------------ */

// // // interface SidebarNavProps {
// // //   /** Mobile drawer keeps labels visible; the desktop rail reveals them on hover. */
// // //   alwaysExpanded?: boolean;
// // //   onNavigate?: () => void;
// // // }

// // // const SidebarNav: React.FC<SidebarNavProps> = ({ alwaysExpanded = false, onNavigate }) => {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();

// // //   const labelClass = alwaysExpanded
// // //     ? "opacity-100"
// // //     : "opacity-0 group-hover:opacity-100";

// // //   const handleSignOut = () => {
// // //     localStorage.removeItem("token");
// // //     localStorage.removeItem("refreshToken");
// // //     localStorage.removeItem("user");
// // //     onNavigate?.();
// // //     navigate("/signup", { replace: true });
// // //   };

// // //   /* Row layout: the row is `relative h-12`, and the icon column is
// // //      `absolute left-0 w-16`. An absolutely positioned child is placed against
// // //      its parent's PADDING BOX, so any padding a global stylesheet puts on the
// // //      button cannot move it. This is why the icons line up regardless of CSS
// // //      you may have elsewhere in the app. */
// // //   const ICON_COL = "absolute left-0 top-0 flex h-12 w-16 items-center justify-center";
// // //   const LABEL_COL =
// // //     "absolute left-16 right-3 top-0 flex h-12 items-center truncate whitespace-nowrap transition-opacity duration-200";

// // //   return (
// // //     <div className="flex h-full flex-col py-3">
// // //       {/* Brand */}
// // //       <div className="relative h-12 w-full shrink-0">
// // //         <span className={ICON_COL}>
// // //           <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white">
// // //             HR
// // //           </span>
// // //         </span>
// // //         <span
// // //           className={`${LABEL_COL} text-base font-semibold text-gray-900 ${labelClass}`}
// // //         >
// // //           HR Dashboard
// // //         </span>
// // //       </div>

// // //       {/* Primary navigation */}
// // //       <nav className="mt-6 flex-1 p-0">
// // //         <ul className="m-0 list-none p-0">
// // //           {NAV_ITEMS.map((item) => {
// // //             const Icon = item.icon;
// // //             const isActive = location.pathname.startsWith(item.route);

// // //             return (
// // //               <li key={item.route} className="m-0 list-none p-0">
// // //                 <button
// // //                   type="button"
// // //                   onClick={() => {
// // //                     navigate(item.route);
// // //                     onNavigate?.();
// // //                   }}
// // //                   title={alwaysExpanded ? undefined : item.name}
// // //                   aria-current={isActive ? "page" : undefined}
// // //                   className={`${BTN_RESET} group/item relative block h-12 w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
// // //                 >
// // //                   <span className={ICON_COL}>
// // //                     <span
// // //                       className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 ${
// // //                         isActive
// // //                           ? "bg-teal-600 text-white shadow-sm"
// // //                           : "text-gray-500 group-hover/item:bg-white group-hover/item:text-gray-900"
// // //                       }`}
// // //                     >
// // //                       <Icon className="h-5 w-5" />
// // //                     </span>
// // //                   </span>
// // //                   <span
// // //                     className={`${LABEL_COL} text-sm font-medium ${labelClass} ${
// // //                       isActive ? "text-teal-700" : "text-gray-600"
// // //                     }`}
// // //                   >
// // //                     {item.name}
// // //                   </span>
// // //                 </button>
// // //               </li>
// // //             );
// // //           })}
// // //         </ul>
// // //       </nav>

// // //       {/* Sign out */}
// // //       <div className="mb-3 border-t border-gray-200" />
// // //       <button
// // //         type="button"
// // //         onClick={handleSignOut}
// // //         title={alwaysExpanded ? undefined : "Sign out"}
// // //         className={`${BTN_RESET} group/item relative block h-12 w-full shrink-0 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
// // //       >
// // //         <span className={ICON_COL}>
// // //           <span className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors duration-200 group-hover/item:bg-white group-hover/item:text-red-600">
// // //             <LogOut className="h-5 w-5" />
// // //           </span>
// // //         </span>
// // //         <span className={`${LABEL_COL} text-sm font-medium text-gray-600 ${labelClass}`}>
// // //           Sign out
// // //         </span>
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // /* ------------------------------------------------------------------ */
// // // /* Header = grey rail + grey top bar + inner corner                    */
// // // /* ------------------------------------------------------------------ */

// // // const Header: React.FC = () => {
// // //   const navigate = useNavigate();
// // //   const crumbs = useBreadcrumbs();
// // //   const [drawerOpen, setDrawerOpen] = useState(false);
// // //   const [menuOpen, setMenuOpen] = useState(false);
// // //   const menuRef = useRef<HTMLDivElement>(null);

// // //   // Redirect to signup if not logged in
// // //   // useEffect(() => {
// // //   //   if (!isLoggedIn()) {
// // //   //     navigate("/signup", { replace: true });
// // //   //   }
// // //   // }, [navigate]);

// // //   // Close the avatar menu on outside click
// // //   useEffect(() => {
// // //     const handleClickOutside = (event: MouseEvent) => {
// // //       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
// // //         setMenuOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   // Close the mobile drawer with Escape
// // //   useEffect(() => {
// // //     const handleEscape = (event: KeyboardEvent) => {
// // //       if (event.key === "Escape") setDrawerOpen(false);
// // //     };
// // //     document.addEventListener("keydown", handleEscape);
// // //     return () => document.removeEventListener("keydown", handleEscape);
// // //   }, []);

// // //   const handleSignOut = () => {
// // //     localStorage.removeItem("token");
// // //     localStorage.removeItem("refreshToken");
// // //     localStorage.removeItem("user");
// // //     navigate("/signup", { replace: true });
// // //   };

// // //   return (
// // //     <>
// // //       {/* ---------------- Desktop rail: 64px, 240px on hover ------------------ */}
// // //       <aside
// // //         className="group fixed inset-y-0 left-0 z-40 hidden w-16 flex-col overflow-hidden bg-gray-100 transition-[width,box-shadow] duration-200 ease-out hover:w-60 hover:shadow-xl md:flex"
// // //         aria-label="Main navigation"
// // //       >
// // //         <SidebarNav />
// // //       </aside>

// // //       {/* ---------------- Mobile drawer --------------------------------------- */}
// // //       {drawerOpen && (
// // //         <div
// // //           className="fixed inset-0 z-40 bg-gray-900/40 md:hidden"
// // //           onClick={() => setDrawerOpen(false)}
// // //           aria-hidden="true"
// // //         />
// // //       )}
// // //       <aside
// // //         className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 transition-transform duration-200 ease-out md:hidden ${
// // //           drawerOpen ? "translate-x-0" : "-translate-x-full"
// // //         }`}
// // //         aria-label="Main navigation"
// // //         aria-hidden={!drawerOpen}
// // //       >
// // //         <button
// // //           type="button"
// // //           onClick={() => setDrawerOpen(false)}
// // //           className={`${BTN_RESET} absolute right-3 top-4 cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-white`}
// // //           aria-label="Close navigation"
// // //         >
// // //           <X className="h-5 w-5" />
// // //         </button>
// // //         <SidebarNav alwaysExpanded onNavigate={() => setDrawerOpen(false)} />
// // //       </aside>

// // //       {/* ---------------- Top bar + inner corner ------------------------------ */}
// // //       <header className="sticky top-0 z-30 bg-gray-100 md:ml-16">
// // //         <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
// // //           {/* Hamburger (mobile only) */}
// // //           <button
// // //             type="button"
// // //             onClick={() => setDrawerOpen(true)}
// // //             className={`${BTN_RESET} cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-white md:hidden`}
// // //             aria-label="Open navigation"
// // //           >
// // //             <Menu className="h-5 w-5" />
// // //           </button>

// // //           {/* Breadcrumb - where you are right now */}
// // //           <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
// // //             <ol className="m-0 flex list-none items-center gap-1 truncate p-0 text-sm">
// // //               {crumbs.map((crumb, index) => {
// // //                 const isLast = index === crumbs.length - 1;
// // //                 return (
// // //                   <li key={crumb.to} className="flex list-none items-center gap-1">
// // //                     {index > 0 && (
// // //                       <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
// // //                     )}
// // //                     {isLast ? (
// // //                       <span className="truncate font-semibold text-gray-900">
// // //                         {crumb.label}
// // //                       </span>
// // //                     ) : (
// // //                       <Link
// // //                         to={crumb.to}
// // //                         className="truncate text-gray-500 hover:text-gray-800"
// // //                       >
// // //                         {crumb.label}
// // //                       </Link>
// // //                     )}
// // //                   </li>
// // //                 );
// // //               })}
// // //             </ol>
// // //           </nav>

// // //           {/* Search - placeholder, remove this block if you don't need it yet */}
// // //           <div className="relative hidden lg:block lg:w-80">
// // //             <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
// // //             <input
// // //               type="search"
// // //               placeholder="Search..."
// // //               className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
// // //             />
// // //           </div>

// // //           {/* Avatar + menu */}
// // //           <div className="relative shrink-0" ref={menuRef}>
// // //             <button
// // //               type="button"
// // //               onClick={() => setMenuOpen(!menuOpen)}
// // //               className={`${BTN_RESET} flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-teal-600 text-sm font-medium text-white`}
// // //               aria-haspopup="menu"
// // //               aria-expanded={menuOpen}
// // //             >
// // //               JS
// // //             </button>

// // //             {menuOpen && (
// // //               <div className="absolute right-0 z-10 mt-2 w-40 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
// // //                 <button
// // //                   type="button"
// // //                   onClick={handleSignOut}
// // //                   className={`${BTN_RESET} w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100`}
// // //                 >
// // //                   Sign out
// // //                 </button>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* The inside corner. A 16px white strip whose top-left is rounded, so
// // //             the grey rail and grey top bar show through as a curve. It sits
// // //             flush against your page content, which is also white. */}
// // //         <div className="h-4 bg-white md:rounded-tl-2xl" aria-hidden="true" />
// // //       </header>
// // //     </>
// // //   );
// // // };

// // // export default Header;



// // import React, { useState, useEffect, useRef, useMemo } from "react";
// // import { useNavigate, useLocation, Link } from "react-router-dom";
// // import {
// //   Briefcase,
// //   Users,
// //   ClipboardCheck,
// //   Sparkles,
// //   MessageCircle,
// //   Menu,
// //   X,
// //   Search,
// //   LogOut,
// //   ChevronRight,
// //   ChevronDown,
// //   PhoneCall,
// //   Activity,
// //   BarChart3,
// //   Handshake,
// //   LayoutDashboard,
// //   CalendarCheck,
// //   Kanban,
// //   FileText,
// //   Bell,
// //   UserCheck,
// //   TrendingUp,
// // } from "lucide-react";
// // // import { isLoggedIn } from "../utils/auth";

// // /* ------------------------------------------------------------------ */
// // /* Button reset                                                        */
// // /*                                                                     */
// // /* Neutralises any global `button { ... }` rule (the Vite starter CSS   */
// // /* sets padding: 0.6em 1.2em, a border and a dark background). Every    */
// // /* button in this file starts from zero and opts back in explicitly.    */
// // /* ------------------------------------------------------------------ */
// // const BTN_RESET = "m-0 appearance-none border-0 bg-transparent p-0";

// // /* ------------------------------------------------------------------ */
// // /* Navigation config — grouped into collapsible sections               */
// // /* ------------------------------------------------------------------ */

// // type NavItem = {
// //   name: string;
// //   route: string;
// //   icon: React.ComponentType<{ className?: string }>;
// // };

// // type NavSection = {
// //   label: string;
// //   icon: React.ComponentType<{ className?: string }>;
// //   items: NavItem[];
// // };

// // const NAV_SECTIONS: NavSection[] = [
// //   {
// //     label: "Recruiter",
// //     icon: Briefcase,
// //     items: [
// //       { name: "Pipeline", route: "/pipeline-dashboard", icon: BarChart3 },
// //       { name: "Positions", route: "/position-management", icon: Briefcase },
// //       { name: "Calling Tracker", route: "/calling-tracker", icon: PhoneCall },
// //       { name: "Candidates", route: "/candidate-management", icon: Users },
// //       { name: "Submissions", route: "/submission-management", icon: ClipboardCheck },
// //       { name: "Candidate Tracker", route: "/candidate-tracker", icon: Activity },
// //       { name: "AI Matcher", route: "/ai-matcher", icon: Sparkles },
// //       { name: "WhatsApp Messages", route: "/whatsapp-tab", icon: MessageCircle },
// //     ],
// //   },
// //   {
// //     label: "BD",
// //     icon: Handshake,
// //     items: [
// //       { name: "Dashboard", route: "/bd", icon: LayoutDashboard },
// //       { name: "Meetings", route: "/bd/meetings", icon: CalendarCheck },
// //       { name: "Pipeline", route: "/bd/pipeline", icon: Kanban },
// //       { name: "Proposals", route: "/bd/proposals", icon: FileText },
// //       { name: "Follow-ups", route: "/bd/follow-ups", icon: Bell },
// //       { name: "Clients", route: "/bd/clients", icon: UserCheck },
// //       { name: "Reports", route: "/bd/reports", icon: TrendingUp },
// //     ],
// //   },
// // ];

// // /* Flat list for backward compat (breadcrumbs, etc.) */
// // const NAV_ITEMS: NavItem[] = NAV_SECTIONS.flatMap((s) => s.items);

// // /* Labels used by the breadcrumb. Anything missing falls back to a
// //    prettified version of the URL segment. */
// // const ROUTE_LABELS: Record<string, string> = {
// //   "pipeline-dashboard": "Pipeline Dashboard",
// //   "position-management": "Positions",
// //   "calling-tracker": "Calling Tracker",
// //   "candidate-management": "Candidates",
// //   "submission-management": "Submissions",
// //   "candidate-tracker": "Candidate Tracker",
// //   "ai-matcher": "AI Matcher",
// //   "whatsapp-tab": "WhatsApp Messages",
// //   bd: "Business Development",
// //   meetings: "Meetings",
// //   pipeline: "Pipeline",
// //   proposals: "Proposals",
// //   "follow-ups": "Follow-ups",
// //   clients: "Clients",
// //   reports: "Reports",
// //   create: "Create",
// //   edit: "Edit",
// // };

// // /* ------------------------------------------------------------------ */
// // /* Breadcrumb helpers                                                  */
// // /* ------------------------------------------------------------------ */

// // const isIdSegment = (segment: string) =>
// //   /^\d+$/.test(segment) || /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(segment);

// // const prettify = (segment: string) =>
// //   segment.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

// // const singular = (label: string) =>
// //   label.endsWith("s") ? label.slice(0, -1) : label;

// // type Crumb = { label: string; to: string };

// // const useBreadcrumbs = (): Crumb[] => {
// //   const { pathname } = useLocation();

// //   return useMemo(() => {
// //     const segments = pathname.split("/").filter(Boolean);
// //     const crumbs: Crumb[] = [];
// //     let path = "";

// //     segments.forEach((segment) => {
// //       path += `/${segment}`;
// //       if (isIdSegment(segment)) {
// //         const parent = crumbs[crumbs.length - 1]?.label ?? "Record";
// //         crumbs.push({ label: `${singular(parent)} Detail`, to: path });
// //       } else {
// //         crumbs.push({ label: ROUTE_LABELS[segment] ?? prettify(segment), to: path });
// //       }
// //     });

// //     return crumbs;
// //   }, [pathname]);
// // };

// // /* ------------------------------------------------------------------ */
// // /* Sidebar contents (shared by the desktop rail and the mobile drawer) */
// // /*                                                                     */
// // /* Alignment: every row starts with a w-16 (64px) column that holds the */
// // /* 40px tile dead centre. The rail is also 64px when collapsed, so the  */
// // /* HR tile and all five icons land on the rail's centre line. Buttons   */
// // /* carry BTN_RESET so no global padding can shift them.                */
// // /* ------------------------------------------------------------------ */

// // interface SidebarNavProps {
// //   /** Mobile drawer keeps labels visible; the desktop rail reveals them on hover. */
// //   alwaysExpanded?: boolean;
// //   onNavigate?: () => void;
// // }

// // const SidebarNav: React.FC<SidebarNavProps> = ({ alwaysExpanded = false, onNavigate }) => {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   /* Which section is currently active (auto-detect from path) */
// //   const activeSectionIdx = NAV_SECTIONS.findIndex((s) =>
// //     s.items.some((item) => location.pathname === item.route || location.pathname.startsWith(item.route + "/"))
// //   );

// //   /* Collapsed/expanded state per section — default: active section open */
// //   const [openSections, setOpenSections] = useState<Record<number, boolean>>(() => {
// //     const init: Record<number, boolean> = {};
// //     NAV_SECTIONS.forEach((_, i) => {
// //       init[i] = i === (activeSectionIdx >= 0 ? activeSectionIdx : 0);
// //     });
// //     return init;
// //   });

// //   const toggleSection = (idx: number) => {
// //     setOpenSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
// //   };

// //   const labelClass = alwaysExpanded
// //     ? "opacity-100"
// //     : "opacity-0 group-hover:opacity-100";

// //   const handleSignOut = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("refreshToken");
// //     localStorage.removeItem("user");
// //     onNavigate?.();
// //     navigate("/signup", { replace: true });
// //   };

// //   const ICON_COL = "absolute left-0 top-0 flex h-12 w-16 items-center justify-center";
// //   const LABEL_COL =
// //     "absolute left-16 right-3 top-0 flex h-12 items-center truncate whitespace-nowrap transition-opacity duration-200";

// //   return (
// //     <div className="flex h-full flex-col py-3">
// //       {/* Brand */}
// //       <div className="relative h-12 w-full shrink-0">
// //         <span className={ICON_COL}>
// //           <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white">
// //             HR
// //           </span>
// //         </span>
// //         <span
// //           className={`${LABEL_COL} text-base font-semibold text-gray-900 ${labelClass}`}
// //         >
// //           HR Dashboard
// //         </span>
// //       </div>

// //       {/* Sectioned navigation */}
// //       <nav className="mt-4 flex-1 overflow-y-auto p-0">
// //         {NAV_SECTIONS.map((section, sIdx) => {
// //           const SectionIcon = section.icon;
// //           const isOpen = openSections[sIdx] ?? false;
// //           const sectionHasActive = section.items.some(
// //             (item) => location.pathname === item.route || location.pathname.startsWith(item.route + "/")
// //           );

// //           return (
// //             <div key={section.label} className={sIdx > 0 ? "mt-1" : ""}>
// //               {/* Section header — acts as toggle */}
// //               <button
// //                 type="button"
// //                 onClick={() => toggleSection(sIdx)}
// //                 title={alwaysExpanded ? undefined : section.label}
// //                 className={`${BTN_RESET} group/section relative block h-11 w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
// //               >
// //                 <span className="absolute left-0 top-0 flex h-11 w-16 items-center justify-center">
// //                   <span
// //                     className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200 ${
// //                       sectionHasActive
// //                         ? "bg-teal-600/10 text-teal-700"
// //                         : "text-gray-400 group-hover/section:text-gray-700"
// //                     }`}
// //                   >
// //                     <SectionIcon className="h-4.5 w-4.5" />
// //                   </span>
// //                 </span>
// //                 <span
// //                   className={`absolute left-16 right-3 top-0 flex h-11 items-center justify-between truncate whitespace-nowrap transition-opacity duration-200 ${labelClass}`}
// //                 >
// //                   <span
// //                     className={`text-xs font-bold tracking-wide uppercase ${
// //                       sectionHasActive ? "text-teal-700" : "text-gray-400"
// //                     }`}
// //                   >
// //                     {section.label}
// //                   </span>
// //                   <ChevronDown
// //                     className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${
// //                       isOpen ? "rotate-0" : "-rotate-90"
// //                     }`}
// //                   />
// //                 </span>
// //               </button>

// //               {/* Section items — collapsible */}
// //               {isOpen && (
// //                 <ul className="m-0 list-none p-0">
// //                   {section.items.map((item) => {
// //                     const Icon = item.icon;
// //                     const isActive =
// //                       location.pathname === item.route ||
// //                       (item.route !== "/bd" && location.pathname.startsWith(item.route + "/"));

// //                     return (
// //                       <li key={item.route} className="m-0 list-none p-0">
// //                         <button
// //                           type="button"
// //                           onClick={() => {
// //                             navigate(item.route);
// //                             onNavigate?.();
// //                           }}
// //                           title={alwaysExpanded ? undefined : item.name}
// //                           aria-current={isActive ? "page" : undefined}
// //                           className={`${BTN_RESET} group/item relative block h-10 w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
// //                         >
// //                           <span className="absolute left-0 top-0 flex h-10 w-16 items-center justify-center">
// //                             <span
// //                               className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 ${
// //                                 isActive
// //                                   ? "bg-teal-600 text-white shadow-sm"
// //                                   : "text-gray-500 group-hover/item:bg-white group-hover/item:text-gray-900"
// //                               }`}
// //                             >
// //                               <Icon className="h-4 w-4" />
// //                             </span>
// //                           </span>
// //                           <span
// //                             className={`absolute left-16 right-3 top-0 flex h-10 items-center truncate whitespace-nowrap text-[13px] font-medium transition-opacity duration-200 ${labelClass} ${
// //                               isActive ? "text-teal-700" : "text-gray-600"
// //                             }`}
// //                           >
// //                             {item.name}
// //                           </span>
// //                         </button>
// //                       </li>
// //                     );
// //                   })}
// //                 </ul>
// //               )}
// //             </div>
// //           );
// //         })}
// //       </nav>

// //       {/* Sign out */}
// //       <div className="mb-3 border-t border-gray-200" />
// //       <button
// //         type="button"
// //         onClick={handleSignOut}
// //         title={alwaysExpanded ? undefined : "Sign out"}
// //         className={`${BTN_RESET} group/item relative block h-12 w-full shrink-0 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
// //       >
// //         <span className={ICON_COL}>
// //           <span className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors duration-200 group-hover/item:bg-white group-hover/item:text-red-600">
// //             <LogOut className="h-5 w-5" />
// //           </span>
// //         </span>
// //         <span className={`${LABEL_COL} text-sm font-medium text-gray-600 ${labelClass}`}>
// //           Sign out
// //         </span>
// //       </button>
// //     </div>
// //   );
// // };

// // /* ------------------------------------------------------------------ */
// // /* Header = grey rail + grey top bar + inner corner                    */
// // /* ------------------------------------------------------------------ */

// // const Header: React.FC = () => {
// //   const navigate = useNavigate();
// //   const crumbs = useBreadcrumbs();
// //   const [drawerOpen, setDrawerOpen] = useState(false);
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const menuRef = useRef<HTMLDivElement>(null);

// //   // Redirect to signup if not logged in
// //   // useEffect(() => {
// //   //   if (!isLoggedIn()) {
// //   //     navigate("/signup", { replace: true });
// //   //   }
// //   // }, [navigate]);

// //   // Close the avatar menu on outside click
// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
// //         setMenuOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Close the mobile drawer with Escape
// //   useEffect(() => {
// //     const handleEscape = (event: KeyboardEvent) => {
// //       if (event.key === "Escape") setDrawerOpen(false);
// //     };
// //     document.addEventListener("keydown", handleEscape);
// //     return () => document.removeEventListener("keydown", handleEscape);
// //   }, []);

// //   const handleSignOut = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("refreshToken");
// //     localStorage.removeItem("user");
// //     navigate("/signup", { replace: true });
// //   };

// //   return (
// //     <>
// //       {/* ---------------- Desktop rail: 64px, 240px on hover ------------------ */}
// //       <aside
// //         className="group fixed inset-y-0 left-0 z-40 hidden w-16 flex-col overflow-hidden bg-gray-100 transition-[width,box-shadow] duration-200 ease-out hover:w-60 hover:shadow-xl md:flex"
// //         aria-label="Main navigation"
// //       >
// //         <SidebarNav />
// //       </aside>

// //       {/* ---------------- Mobile drawer --------------------------------------- */}
// //       {drawerOpen && (
// //         <div
// //           className="fixed inset-0 z-40 bg-gray-900/40 md:hidden"
// //           onClick={() => setDrawerOpen(false)}
// //           aria-hidden="true"
// //         />
// //       )}
// //       <aside
// //         className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 transition-transform duration-200 ease-out md:hidden ${
// //           drawerOpen ? "translate-x-0" : "-translate-x-full"
// //         }`}
// //         aria-label="Main navigation"
// //         aria-hidden={!drawerOpen}
// //       >
// //         <button
// //           type="button"
// //           onClick={() => setDrawerOpen(false)}
// //           className={`${BTN_RESET} absolute right-3 top-4 cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-white`}
// //           aria-label="Close navigation"
// //         >
// //           <X className="h-5 w-5" />
// //         </button>
// //         <SidebarNav alwaysExpanded onNavigate={() => setDrawerOpen(false)} />
// //       </aside>

// //       {/* ---------------- Top bar + inner corner ------------------------------ */}
// //       <header className="sticky top-0 z-30 bg-gray-100 md:ml-16">
// //         <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
// //           {/* Hamburger (mobile only) */}
// //           <button
// //             type="button"
// //             onClick={() => setDrawerOpen(true)}
// //             className={`${BTN_RESET} cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-white md:hidden`}
// //             aria-label="Open navigation"
// //           >
// //             <Menu className="h-5 w-5" />
// //           </button>

// //           {/* Breadcrumb - where you are right now */}
// //           <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
// //             <ol className="m-0 flex list-none items-center gap-1 truncate p-0 text-sm">
// //               {crumbs.map((crumb, index) => {
// //                 const isLast = index === crumbs.length - 1;
// //                 return (
// //                   <li key={crumb.to} className="flex list-none items-center gap-1">
// //                     {index > 0 && (
// //                       <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
// //                     )}
// //                     {isLast ? (
// //                       <span className="truncate font-semibold text-gray-900">
// //                         {crumb.label}
// //                       </span>
// //                     ) : (
// //                       <Link
// //                         to={crumb.to}
// //                         className="truncate text-gray-500 hover:text-gray-800"
// //                       >
// //                         {crumb.label}
// //                       </Link>
// //                     )}
// //                   </li>
// //                 );
// //               })}
// //             </ol>
// //           </nav>

// //           {/* Search - placeholder, remove this block if you don't need it yet */}
// //           <div className="relative hidden lg:block lg:w-80">
// //             <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
// //             <input
// //               type="search"
// //               placeholder="Search..."
// //               className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
// //             />
// //           </div>

// //           {/* Avatar + menu */}
// //           <div className="relative shrink-0" ref={menuRef}>
// //             <button
// //               type="button"
// //               onClick={() => setMenuOpen(!menuOpen)}
// //               className={`${BTN_RESET} flex h-9 w-9 cursor-pointer items-center justify-center rounded-full !bg-teal-600 text-sm font-medium !text-white`}
// //               aria-haspopup="menu"
// //               aria-expanded={menuOpen}
// //             >
// //               JS
// //             </button>

// //             {menuOpen && (
// //               <div className="absolute right-0 z-10 mt-2 w-40 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
// //                 <button
// //                   type="button"
// //                   onClick={handleSignOut}
// //                   className={`${BTN_RESET} w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100`}
// //                 >
// //                   Sign out
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* The inside corner. A 16px white strip whose top-left is rounded, so
// //             the grey rail and grey top bar show through as a curve. It sits
// //             flush against your page content, which is also white. */}
// //         <div className="h-4 bg-white md:rounded-tl-2xl" aria-hidden="true" />
// //       </header>
// //     </>
// //   );
// // };

// // export default Header;



// // // import React, { useState, useEffect, useRef } from "react";
// // // import { useNavigate, useLocation } from "react-router-dom";
// // // import { isLoggedIn } from "../utils/auth";

// // // // TabButton component
// // // interface TabButtonProps {
// // //   name: string;
// // //   isActive: boolean;
// // //   onClick: () => void;
// // // }

// // // const TabButton: React.FC<TabButtonProps> = ({ name, isActive, onClick }) => {
// // //   return (
// // //     <button
// // //       onClick={onClick}
// // //       className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
// // //         isActive
// // //           ? "border-teal-600 text-teal-600"
// // //           : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
// // //       }`}
// // //     >
// // //       {name}
// // //     </button>
// // //   );
// // // };

// // // // Header component
// // // const Header: React.FC = () => {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const [dropdownOpen, setDropdownOpen] = useState(false);
// // //   const dropdownRef = useRef<HTMLDivElement>(null);

// // //   // Redirect to signup if not logged in
// // //   // useEffect(() => {
// // //   //   if (!isLoggedIn()) {
// // //   //     navigate("/signup", { replace: true });
// // //   //   }
// // //   // }, [navigate]);

// // //   // Close dropdown on outside click
// // //   useEffect(() => {
// // //     const handleClickOutside = (event: MouseEvent) => {
// // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// // //         setDropdownOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   const tabs = [
// // //     { name: "Positions", route: "/position-management" },
// // //     { name: "Candidates", route: "/candidate-management" },
// // //     { name: "Submissions", route: "/submission-management" },
// // //     { name: "AI Matcher", route: "/ai-matcher" },
// // //      { name: "WhatsApp Messages", route: "/whatsapp-tab" },
// // //   ];

// // //   const handleTabClick = (tab: { name: string; route?: string }) => {
// // //     if (tab.route) {
// // //       navigate(tab.route);
// // //     }
// // //   };

// // //   const handleSignOut = () => {
// // //     localStorage.removeItem("token");
// // //     localStorage.removeItem("refreshToken");
// // //     localStorage.removeItem("user");
// // //     navigate("/signup", { replace: true });
// // //   };

// // //   return (
// // //     <div className="bg-white border-b border-gray-200">
// // //       {/* Top Bar */}
// // //       <div className="flex items-center justify-between px-6 py-4">
// // //         <div className="flex items-center space-x-4">
// // //           <div className="flex items-center space-x-2">
// // //             <div className="w-8 h-8 bg-teal-600 rounded text-white flex items-center justify-center font-bold text-sm">
// // //               HR
// // //             </div>
// // //             <span className="text-lg font-semibold text-gray-800">
// // //               HR Dashboard
// // //             </span>
// // //           </div>
// // //         </div>

// // //         {/* JS Avatar + Dropdown */}
// // //         <div className="relative" ref={dropdownRef}>
// // //           <div
// // //             onClick={() => setDropdownOpen(!dropdownOpen)}
// // //             className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-medium text-sm cursor-pointer"
// // //           >
// // //             JS
// // //           </div>

// // //           {dropdownOpen && (
// // //             <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
// // //               <button
// // //                 onClick={handleSignOut}
// // //                 className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
// // //               >
// // //                 Sign Out
// // //               </button>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* Navigation Tabs */}
// // //       <div className="flex space-x-8 px-6">
// // //         {tabs.map((tab) => (
// // //           <TabButton
// // //             key={tab.name}
// // //             name={tab.name}
// // //             isActive={location.pathname === tab.route}
// // //             onClick={() => handleTabClick(tab)}
// // //           />
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Header;




// // // //
// // // import React, { useState, useEffect, useRef, useMemo } from "react";
// // // import { useNavigate, useLocation, Link } from "react-router-dom";
// // // import {
// // //   Briefcase,
// // //   Users,
// // //   ClipboardCheck,
// // //   Sparkles,
// // //   MessageCircle,
// // //   Menu,
// // //   X,
// // //   Search,
// // //   LogOut,
// // //   ChevronRight,
// // // } from "lucide-react";
// // // // import { isLoggedIn } from "../utils/auth";

// // // /* ------------------------------------------------------------------ */
// // // /* Button reset                                                        */
// // // /*                                                                     */
// // // /* Neutralises any global `button { ... }` rule (the Vite starter CSS   */
// // // /* sets padding: 0.6em 1.2em, a border and a dark background). Every    */
// // // /* button in this file starts from zero and opts back in explicitly.    */
// // // /* ------------------------------------------------------------------ */
// // // const BTN_RESET = "m-0 appearance-none border-0 bg-transparent p-0 font-inherit";

// // // /* ------------------------------------------------------------------ */
// // // /* Navigation config                                                   */
// // // /* ------------------------------------------------------------------ */

// // // type NavItem = {
// // //   name: string;
// // //   route: string;
// // //   icon: React.ComponentType<{ className?: string }>;
// // // };

// // // const NAV_ITEMS: NavItem[] = [
// // //   { name: "Positions", route: "/position-management", icon: Briefcase },
// // //   { name: "Candidates", route: "/candidate-management", icon: Users },
// // //   { name: "Submissions", route: "/submission-management", icon: ClipboardCheck },
// // //   { name: "AI Matcher", route: "/ai-matcher", icon: Sparkles },
// // //   { name: "WhatsApp Messages", route: "/whatsapp-tab", icon: MessageCircle },
// // // ];

// // // /* Labels used by the breadcrumb. Anything missing falls back to a
// // //    prettified version of the URL segment. */
// // // const ROUTE_LABELS: Record<string, string> = {
// // //   "position-management": "Positions",
// // //   "candidate-management": "Candidates",
// // //   "submission-management": "Submissions",
// // //   "ai-matcher": "AI Matcher",
// // //   "whatsapp-tab": "WhatsApp Messages",
// // //   create: "Create",
// // //   edit: "Edit",
// // // };

// // // /* ------------------------------------------------------------------ */
// // // /* Breadcrumb helpers                                                  */
// // // /* ------------------------------------------------------------------ */

// // // const isIdSegment = (segment: string) =>
// // //   /^\d+$/.test(segment) || /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(segment);

// // // const prettify = (segment: string) =>
// // //   segment.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

// // // const singular = (label: string) =>
// // //   label.endsWith("s") ? label.slice(0, -1) : label;

// // // type Crumb = { label: string; to: string };

// // // const useBreadcrumbs = (): Crumb[] => {
// // //   const { pathname } = useLocation();

// // //   return useMemo(() => {
// // //     const segments = pathname.split("/").filter(Boolean);
// // //     const crumbs: Crumb[] = [];
// // //     let path = "";

// // //     segments.forEach((segment) => {
// // //       path += `/${segment}`;
// // //       if (isIdSegment(segment)) {
// // //         const parent = crumbs[crumbs.length - 1]?.label ?? "Record";
// // //         crumbs.push({ label: `${singular(parent)} Detail`, to: path });
// // //       } else {
// // //         crumbs.push({ label: ROUTE_LABELS[segment] ?? prettify(segment), to: path });
// // //       }
// // //     });

// // //     return crumbs;
// // //   }, [pathname]);
// // // };

// // // /* ------------------------------------------------------------------ */
// // // /* Sidebar contents (shared by the desktop rail and the mobile drawer) */
// // // /*                                                                     */
// // // /* Alignment: every row starts with a w-16 (64px) column that holds the */
// // // /* 40px tile dead centre. The rail is also 64px when collapsed, so the  */
// // // /* HR tile and all five icons land on the rail's centre line. Buttons   */
// // // /* carry BTN_RESET so no global padding can shift them.                */
// // // /* ------------------------------------------------------------------ */

// // // interface SidebarNavProps {
// // //   /** Mobile drawer keeps labels visible; the desktop rail reveals them on hover. */
// // //   alwaysExpanded?: boolean;
// // //   onNavigate?: () => void;
// // // }

// // // const SidebarNav: React.FC<SidebarNavProps> = ({ alwaysExpanded = false, onNavigate }) => {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();

// // //   const labelClass = alwaysExpanded
// // //     ? "opacity-100"
// // //     : "opacity-0 group-hover:opacity-100";

// // //   const handleSignOut = () => {
// // //     localStorage.removeItem("token");
// // //     localStorage.removeItem("refreshToken");
// // //     localStorage.removeItem("user");
// // //     onNavigate?.();
// // //     navigate("/signup", { replace: true });
// // //   };

// // //   return (
// // //     <div className="flex h-full flex-col py-3">
// // //       {/* Brand */}
// // //       <div className="flex w-full items-center">
// // //         <span className="flex w-16 shrink-0 items-center justify-center">
// // //           <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white">
// // //             HR
// // //           </span>
// // //         </span>
// // //         <span
// // //           className={`truncate whitespace-nowrap text-base font-semibold text-gray-900 transition-opacity duration-200 ${labelClass}`}
// // //         >
// // //           HR Dashboard
// // //         </span>
// // //       </div>

// // //       {/* Primary navigation */}
// // //       <nav className="mt-6 flex-1 p-0">
// // //         <ul className="m-0 list-none space-y-1 p-0">
// // //           {NAV_ITEMS.map((item) => {
// // //             const Icon = item.icon;
// // //             const isActive = location.pathname.startsWith(item.route);

// // //             return (
// // //               <li key={item.route} className="list-none">
// // //                 <button
// // //                   type="button"
// // //                   onClick={() => {
// // //                     navigate(item.route);
// // //                     onNavigate?.();
// // //                   }}
// // //                   title={alwaysExpanded ? undefined : item.name}
// // //                   aria-current={isActive ? "page" : undefined}
// // //                   className={`${BTN_RESET} group/item flex w-full cursor-pointer items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
// // //                 >
// // //                   <span className="flex w-16 shrink-0 items-center justify-center">
// // //                     <span
// // //                       className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 ${
// // //                         isActive
// // //                           ? "bg-teal-600 text-white shadow-sm"
// // //                           : "text-gray-500 group-hover/item:bg-white group-hover/item:text-gray-900"
// // //                       }`}
// // //                     >
// // //                       <Icon className="h-5 w-5" />
// // //                     </span>
// // //                   </span>
// // //                   <span
// // //                     className={`truncate whitespace-nowrap text-sm font-medium transition-opacity duration-200 ${labelClass} ${
// // //                       isActive ? "text-teal-700" : "text-gray-600"
// // //                     }`}
// // //                   >
// // //                     {item.name}
// // //                   </span>
// // //                 </button>
// // //               </li>
// // //             );
// // //           })}
// // //         </ul>
// // //       </nav>

// // //       {/* Sign out */}
// // //       <div className="mb-3 border-t border-gray-200" />
// // //       <button
// // //         type="button"
// // //         onClick={handleSignOut}
// // //         title={alwaysExpanded ? undefined : "Sign out"}
// // //         className={`${BTN_RESET} group/item flex w-full cursor-pointer items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
// // //       >
// // //         <span className="flex w-16 shrink-0 items-center justify-center">
// // //           <span className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors duration-200 group-hover/item:bg-white group-hover/item:text-red-600">
// // //             <LogOut className="h-5 w-5" />
// // //           </span>
// // //         </span>
// // //         <span
// // //           className={`truncate whitespace-nowrap text-sm font-medium text-gray-600 transition-opacity duration-200 ${labelClass}`}
// // //         >
// // //           Sign out
// // //         </span>
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // /* ------------------------------------------------------------------ */
// // // /* Header = grey rail + grey top bar + inner corner                    */
// // // /* ------------------------------------------------------------------ */

// // // const Header: React.FC = () => {
// // //   const navigate = useNavigate();
// // //   const crumbs = useBreadcrumbs();
// // //   const [drawerOpen, setDrawerOpen] = useState(false);
// // //   const [menuOpen, setMenuOpen] = useState(false);
// // //   const menuRef = useRef<HTMLDivElement>(null);

// // //   // Redirect to signup if not logged in
// // //   // useEffect(() => {
// // //   //   if (!isLoggedIn()) {
// // //   //     navigate("/signup", { replace: true });
// // //   //   }
// // //   // }, [navigate]);

// // //   // Close the avatar menu on outside click
// // //   useEffect(() => {
// // //     const handleClickOutside = (event: MouseEvent) => {
// // //       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
// // //         setMenuOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   // Close the mobile drawer with Escape
// // //   useEffect(() => {
// // //     const handleEscape = (event: KeyboardEvent) => {
// // //       if (event.key === "Escape") setDrawerOpen(false);
// // //     };
// // //     document.addEventListener("keydown", handleEscape);
// // //     return () => document.removeEventListener("keydown", handleEscape);
// // //   }, []);

// // //   const handleSignOut = () => {
// // //     localStorage.removeItem("token");
// // //     localStorage.removeItem("refreshToken");
// // //     localStorage.removeItem("user");
// // //     navigate("/signup", { replace: true });
// // //   };

// // //   return (
// // //     <>
// // //       {/* ---------------- Desktop rail: 64px, 240px on hover ------------------ */}
// // //       <aside
// // //         className="group fixed inset-y-0 left-0 z-40 hidden w-16 flex-col overflow-hidden bg-gray-100 transition-[width,box-shadow] duration-200 ease-out hover:w-60 hover:shadow-xl md:flex"
// // //         aria-label="Main navigation"
// // //       >
// // //         <SidebarNav />
// // //       </aside>

// // //       {/* ---------------- Mobile drawer --------------------------------------- */}
// // //       {drawerOpen && (
// // //         <div
// // //           className="fixed inset-0 z-40 bg-gray-900/40 md:hidden"
// // //           onClick={() => setDrawerOpen(false)}
// // //           aria-hidden="true"
// // //         />
// // //       )}
// // //       <aside
// // //         className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 transition-transform duration-200 ease-out md:hidden ${
// // //           drawerOpen ? "translate-x-0" : "-translate-x-full"
// // //         }`}
// // //         aria-label="Main navigation"
// // //         aria-hidden={!drawerOpen}
// // //       >
// // //         <button
// // //           type="button"
// // //           onClick={() => setDrawerOpen(false)}
// // //           className={`${BTN_RESET} absolute right-3 top-4 cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-white`}
// // //           aria-label="Close navigation"
// // //         >
// // //           <X className="h-5 w-5" />
// // //         </button>
// // //         <SidebarNav alwaysExpanded onNavigate={() => setDrawerOpen(false)} />
// // //       </aside>

// // //       {/* ---------------- Top bar + inner corner ------------------------------ */}
// // //       <header className="sticky top-0 z-30 bg-gray-100 md:ml-16">
// // //         <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
// // //           {/* Hamburger (mobile only) */}
// // //           <button
// // //             type="button"
// // //             onClick={() => setDrawerOpen(true)}
// // //             className={`${BTN_RESET} cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-white md:hidden`}
// // //             aria-label="Open navigation"
// // //           >
// // //             <Menu className="h-5 w-5" />
// // //           </button>

// // //           {/* Breadcrumb - where you are right now */}
// // //           <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
// // //             <ol className="m-0 flex list-none items-center gap-1 truncate p-0 text-sm">
// // //               {crumbs.map((crumb, index) => {
// // //                 const isLast = index === crumbs.length - 1;
// // //                 return (
// // //                   <li key={crumb.to} className="flex list-none items-center gap-1">
// // //                     {index > 0 && (
// // //                       <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
// // //                     )}
// // //                     {isLast ? (
// // //                       <span className="truncate font-semibold text-gray-900">
// // //                         {crumb.label}
// // //                       </span>
// // //                     ) : (
// // //                       <Link
// // //                         to={crumb.to}
// // //                         className="truncate text-gray-500 hover:text-gray-800"
// // //                       >
// // //                         {crumb.label}
// // //                       </Link>
// // //                     )}
// // //                   </li>
// // //                 );
// // //               })}
// // //             </ol>
// // //           </nav>

// // //           {/* Search - placeholder, remove this block if you don't need it yet */}
// // //           <div className="relative hidden lg:block lg:w-80">
// // //             <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
// // //             <input
// // //               type="search"
// // //               placeholder="Search..."
// // //               className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
// // //             />
// // //           </div>

// // //           {/* Avatar + menu */}
// // //           <div className="relative shrink-0" ref={menuRef}>
// // //             <button
// // //               type="button"
// // //               onClick={() => setMenuOpen(!menuOpen)}
// // //               className={`${BTN_RESET} flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-teal-600 text-sm font-medium text-white`}
// // //               aria-haspopup="menu"
// // //               aria-expanded={menuOpen}
// // //             >
// // //               JS
// // //             </button>

// // //             {menuOpen && (
// // //               <div className="absolute right-0 z-10 mt-2 w-40 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
// // //                 <button
// // //                   type="button"
// // //                   onClick={handleSignOut}
// // //                   className={`${BTN_RESET} w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100`}
// // //                 >
// // //                   Sign out
// // //                 </button>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* The inside corner. A 16px white strip whose top-left is rounded, so
// // //             the grey rail and grey top bar show through as a curve. It sits
// // //             flush against your page content, which is also white. */}
// // //         <div className="h-4 bg-white md:rounded-tl-2xl" aria-hidden="true" />
// // //       </header>
// // //     </>
// // //   );
// // // };

// // // export default Header;



// // import React, { useState, useEffect, useRef, useMemo } from "react";
// // import { useNavigate, useLocation, Link } from "react-router-dom";
// // import {
// //   Briefcase,
// //   Users,
// //   ClipboardCheck,
// //   Sparkles,
// //   MessageCircle,
// //   Menu,
// //   X,
// //   Search,
// //   LogOut,
// //   ChevronRight,
// // } from "lucide-react";
// // // import { isLoggedIn } from "../utils/auth";

// // /* ------------------------------------------------------------------ */
// // /* Button reset                                                        */
// // /*                                                                     */
// // /* Neutralises any global `button { ... }` rule (the Vite starter CSS   */
// // /* sets padding: 0.6em 1.2em, a border and a dark background). Every    */
// // /* button in this file starts from zero and opts back in explicitly.    */
// // /* ------------------------------------------------------------------ */
// // const BTN_RESET = "m-0 appearance-none border-0 bg-transparent p-0";

// // /* ------------------------------------------------------------------ */
// // /* Navigation config                                                   */
// // /* ------------------------------------------------------------------ */

// // type NavItem = {
// //   name: string;
// //   route: string;
// //   icon: React.ComponentType<{ className?: string }>;
// // };

// // const NAV_ITEMS: NavItem[] = [
// //   { name: "Positions", route: "/position-management", icon: Briefcase },
// //   { name: "Candidates", route: "/candidate-management", icon: Users },
// //   { name: "Submissions", route: "/submission-management", icon: ClipboardCheck },
// //   { name: "AI Matcher", route: "/ai-matcher", icon: Sparkles },
// //   { name: "WhatsApp Messages", route: "/whatsapp-tab", icon: MessageCircle },
// // ];

// // /* Labels used by the breadcrumb. Anything missing falls back to a
// //    prettified version of the URL segment. */
// // const ROUTE_LABELS: Record<string, string> = {
// //   "position-management": "Positions",
// //   "candidate-management": "Candidates",
// //   "submission-management": "Submissions",
// //   "ai-matcher": "AI Matcher",
// //   "whatsapp-tab": "WhatsApp Messages",
// //   create: "Create",
// //   edit: "Edit",
// // };

// // /* ------------------------------------------------------------------ */
// // /* Breadcrumb helpers                                                  */
// // /* ------------------------------------------------------------------ */

// // const isIdSegment = (segment: string) =>
// //   /^\d+$/.test(segment) || /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(segment);

// // const prettify = (segment: string) =>
// //   segment.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

// // const singular = (label: string) =>
// //   label.endsWith("s") ? label.slice(0, -1) : label;

// // type Crumb = { label: string; to: string };

// // const useBreadcrumbs = (): Crumb[] => {
// //   const { pathname } = useLocation();

// //   return useMemo(() => {
// //     const segments = pathname.split("/").filter(Boolean);
// //     const crumbs: Crumb[] = [];
// //     let path = "";

// //     segments.forEach((segment) => {
// //       path += `/${segment}`;
// //       if (isIdSegment(segment)) {
// //         const parent = crumbs[crumbs.length - 1]?.label ?? "Record";
// //         crumbs.push({ label: `${singular(parent)} Detail`, to: path });
// //       } else {
// //         crumbs.push({ label: ROUTE_LABELS[segment] ?? prettify(segment), to: path });
// //       }
// //     });

// //     return crumbs;
// //   }, [pathname]);
// // };

// // /* ------------------------------------------------------------------ */
// // /* Sidebar contents (shared by the desktop rail and the mobile drawer) */
// // /*                                                                     */
// // /* Alignment: every row starts with a w-16 (64px) column that holds the */
// // /* 40px tile dead centre. The rail is also 64px when collapsed, so the  */
// // /* HR tile and all five icons land on the rail's centre line. Buttons   */
// // /* carry BTN_RESET so no global padding can shift them.                */
// // /* ------------------------------------------------------------------ */

// // interface SidebarNavProps {
// //   /** Mobile drawer keeps labels visible; the desktop rail reveals them on hover. */
// //   alwaysExpanded?: boolean;
// //   onNavigate?: () => void;
// // }

// // const SidebarNav: React.FC<SidebarNavProps> = ({ alwaysExpanded = false, onNavigate }) => {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const labelClass = alwaysExpanded
// //     ? "opacity-100"
// //     : "opacity-0 group-hover:opacity-100";

// //   const handleSignOut = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("refreshToken");
// //     localStorage.removeItem("user");
// //     onNavigate?.();
// //     navigate("/signup", { replace: true });
// //   };

// //   /* Row layout: the row is `relative h-12`, and the icon column is
// //      `absolute left-0 w-16`. An absolutely positioned child is placed against
// //      its parent's PADDING BOX, so any padding a global stylesheet puts on the
// //      button cannot move it. This is why the icons line up regardless of CSS
// //      you may have elsewhere in the app. */
// //   const ICON_COL = "absolute left-0 top-0 flex h-12 w-16 items-center justify-center";
// //   const LABEL_COL =
// //     "absolute left-16 right-3 top-0 flex h-12 items-center truncate whitespace-nowrap transition-opacity duration-200";

// //   return (
// //     <div className="flex h-full flex-col py-3">
// //       {/* Brand */}
// //       <div className="relative h-12 w-full shrink-0">
// //         <span className={ICON_COL}>
// //           <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white">
// //             HR
// //           </span>
// //         </span>
// //         <span
// //           className={`${LABEL_COL} text-base font-semibold text-gray-900 ${labelClass}`}
// //         >
// //           HR Dashboard
// //         </span>
// //       </div>

// //       {/* Primary navigation */}
// //       <nav className="mt-6 flex-1 p-0">
// //         <ul className="m-0 list-none p-0">
// //           {NAV_ITEMS.map((item) => {
// //             const Icon = item.icon;
// //             const isActive = location.pathname.startsWith(item.route);

// //             return (
// //               <li key={item.route} className="m-0 list-none p-0">
// //                 <button
// //                   type="button"
// //                   onClick={() => {
// //                     navigate(item.route);
// //                     onNavigate?.();
// //                   }}
// //                   title={alwaysExpanded ? undefined : item.name}
// //                   aria-current={isActive ? "page" : undefined}
// //                   className={`${BTN_RESET} group/item relative block h-12 w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
// //                 >
// //                   <span className={ICON_COL}>
// //                     <span
// //                       className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 ${
// //                         isActive
// //                           ? "bg-teal-600 text-white shadow-sm"
// //                           : "text-gray-500 group-hover/item:bg-white group-hover/item:text-gray-900"
// //                       }`}
// //                     >
// //                       <Icon className="h-5 w-5" />
// //                     </span>
// //                   </span>
// //                   <span
// //                     className={`${LABEL_COL} text-sm font-medium ${labelClass} ${
// //                       isActive ? "text-teal-700" : "text-gray-600"
// //                     }`}
// //                   >
// //                     {item.name}
// //                   </span>
// //                 </button>
// //               </li>
// //             );
// //           })}
// //         </ul>
// //       </nav>

// //       {/* Sign out */}
// //       <div className="mb-3 border-t border-gray-200" />
// //       <button
// //         type="button"
// //         onClick={handleSignOut}
// //         title={alwaysExpanded ? undefined : "Sign out"}
// //         className={`${BTN_RESET} group/item relative block h-12 w-full shrink-0 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
// //       >
// //         <span className={ICON_COL}>
// //           <span className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors duration-200 group-hover/item:bg-white group-hover/item:text-red-600">
// //             <LogOut className="h-5 w-5" />
// //           </span>
// //         </span>
// //         <span className={`${LABEL_COL} text-sm font-medium text-gray-600 ${labelClass}`}>
// //           Sign out
// //         </span>
// //       </button>
// //     </div>
// //   );
// // };

// // /* ------------------------------------------------------------------ */
// // /* Header = grey rail + grey top bar + inner corner                    */
// // /* ------------------------------------------------------------------ */

// // const Header: React.FC = () => {
// //   const navigate = useNavigate();
// //   const crumbs = useBreadcrumbs();
// //   const [drawerOpen, setDrawerOpen] = useState(false);
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const menuRef = useRef<HTMLDivElement>(null);

// //   // Redirect to signup if not logged in
// //   // useEffect(() => {
// //   //   if (!isLoggedIn()) {
// //   //     navigate("/signup", { replace: true });
// //   //   }
// //   // }, [navigate]);

// //   // Close the avatar menu on outside click
// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
// //         setMenuOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Close the mobile drawer with Escape
// //   useEffect(() => {
// //     const handleEscape = (event: KeyboardEvent) => {
// //       if (event.key === "Escape") setDrawerOpen(false);
// //     };
// //     document.addEventListener("keydown", handleEscape);
// //     return () => document.removeEventListener("keydown", handleEscape);
// //   }, []);

// //   const handleSignOut = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("refreshToken");
// //     localStorage.removeItem("user");
// //     navigate("/signup", { replace: true });
// //   };

// //   return (
// //     <>
// //       {/* ---------------- Desktop rail: 64px, 240px on hover ------------------ */}
// //       <aside
// //         className="group fixed inset-y-0 left-0 z-40 hidden w-16 flex-col overflow-hidden bg-gray-100 transition-[width,box-shadow] duration-200 ease-out hover:w-60 hover:shadow-xl md:flex"
// //         aria-label="Main navigation"
// //       >
// //         <SidebarNav />
// //       </aside>

// //       {/* ---------------- Mobile drawer --------------------------------------- */}
// //       {drawerOpen && (
// //         <div
// //           className="fixed inset-0 z-40 bg-gray-900/40 md:hidden"
// //           onClick={() => setDrawerOpen(false)}
// //           aria-hidden="true"
// //         />
// //       )}
// //       <aside
// //         className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 transition-transform duration-200 ease-out md:hidden ${
// //           drawerOpen ? "translate-x-0" : "-translate-x-full"
// //         }`}
// //         aria-label="Main navigation"
// //         aria-hidden={!drawerOpen}
// //       >
// //         <button
// //           type="button"
// //           onClick={() => setDrawerOpen(false)}
// //           className={`${BTN_RESET} absolute right-3 top-4 cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-white`}
// //           aria-label="Close navigation"
// //         >
// //           <X className="h-5 w-5" />
// //         </button>
// //         <SidebarNav alwaysExpanded onNavigate={() => setDrawerOpen(false)} />
// //       </aside>

// //       {/* ---------------- Top bar + inner corner ------------------------------ */}
// //       <header className="sticky top-0 z-30 bg-gray-100 md:ml-16">
// //         <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
// //           {/* Hamburger (mobile only) */}
// //           <button
// //             type="button"
// //             onClick={() => setDrawerOpen(true)}
// //             className={`${BTN_RESET} cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-white md:hidden`}
// //             aria-label="Open navigation"
// //           >
// //             <Menu className="h-5 w-5" />
// //           </button>

// //           {/* Breadcrumb - where you are right now */}
// //           <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
// //             <ol className="m-0 flex list-none items-center gap-1 truncate p-0 text-sm">
// //               {crumbs.map((crumb, index) => {
// //                 const isLast = index === crumbs.length - 1;
// //                 return (
// //                   <li key={crumb.to} className="flex list-none items-center gap-1">
// //                     {index > 0 && (
// //                       <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
// //                     )}
// //                     {isLast ? (
// //                       <span className="truncate font-semibold text-gray-900">
// //                         {crumb.label}
// //                       </span>
// //                     ) : (
// //                       <Link
// //                         to={crumb.to}
// //                         className="truncate text-gray-500 hover:text-gray-800"
// //                       >
// //                         {crumb.label}
// //                       </Link>
// //                     )}
// //                   </li>
// //                 );
// //               })}
// //             </ol>
// //           </nav>

// //           {/* Search - placeholder, remove this block if you don't need it yet */}
// //           <div className="relative hidden lg:block lg:w-80">
// //             <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
// //             <input
// //               type="search"
// //               placeholder="Search..."
// //               className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
// //             />
// //           </div>

// //           {/* Avatar + menu */}
// //           <div className="relative shrink-0" ref={menuRef}>
// //             <button
// //               type="button"
// //               onClick={() => setMenuOpen(!menuOpen)}
// //               className={`${BTN_RESET} flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-teal-600 text-sm font-medium text-white`}
// //               aria-haspopup="menu"
// //               aria-expanded={menuOpen}
// //             >
// //               JS
// //             </button>

// //             {menuOpen && (
// //               <div className="absolute right-0 z-10 mt-2 w-40 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
// //                 <button
// //                   type="button"
// //                   onClick={handleSignOut}
// //                   className={`${BTN_RESET} w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100`}
// //                 >
// //                   Sign out
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* The inside corner. A 16px white strip whose top-left is rounded, so
// //             the grey rail and grey top bar show through as a curve. It sits
// //             flush against your page content, which is also white. */}
// //         <div className="h-4 bg-white md:rounded-tl-2xl" aria-hidden="true" />
// //       </header>
// //     </>
// //   );
// // };

// // export default Header;



// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import {
//   Briefcase,
//   Users,
//   ClipboardCheck,
//   Sparkles,
//   MessageCircle,
//   Menu,
//   X,
//   Search,
//   LogOut,
//   ChevronRight,
//   ChevronDown,
//   PhoneCall,
//   Activity,
//   BarChart3,
//   Handshake,
//   LayoutDashboard,
//   CalendarCheck,
//   Kanban,
//   FileText,
//   Bell,
//   UserCheck,
//   TrendingUp,
//   Building2,
//   ClipboardList,
//   CalendarDays,
//   DollarSign,
//   Gift,
//   Target,
// } from "lucide-react";
// // import { isLoggedIn } from "../utils/auth";

// /* ------------------------------------------------------------------ */
// /* Button reset                                                        */
// /*                                                                     */
// /* Neutralises any global `button { ... }` rule (the Vite starter CSS   */
// /* sets padding: 0.6em 1.2em, a border and a dark background). Every    */
// /* button in this file starts from zero and opts back in explicitly.    */
// /* ------------------------------------------------------------------ */
// const BTN_RESET = "m-0 appearance-none border-0 bg-transparent p-0";

// /* ------------------------------------------------------------------ */
// /* Navigation config — grouped into collapsible sections               */
// /* ------------------------------------------------------------------ */

// type NavItem = {
//   name: string;
//   route: string;
//   icon: React.ComponentType<{ className?: string }>;
// };

// type NavSection = {
//   label: string;
//   icon: React.ComponentType<{ className?: string }>;
//   items: NavItem[];
// };

// const NAV_SECTIONS: NavSection[] = [
//   {
//     label: "Recruiter",
//     icon: Briefcase,
//     items: [
//       { name: "Pipeline", route: "/pipeline-dashboard", icon: BarChart3 },
//       { name: "Positions", route: "/position-management", icon: Briefcase },
//       { name: "Calling Tracker", route: "/calling-tracker", icon: PhoneCall },
//       { name: "Candidates", route: "/candidate-management", icon: Users },
//       { name: "Submissions", route: "/submission-management", icon: ClipboardCheck },
//       { name: "Candidate Tracker", route: "/candidate-tracker", icon: Activity },
//       { name: "AI Matcher", route: "/ai-matcher", icon: Sparkles },
//       { name: "WhatsApp Messages", route: "/whatsapp-tab", icon: MessageCircle },
//     ],
//   },
//   {
//     label: "BD",
//     icon: Handshake,
//     items: [
//       { name: "Dashboard", route: "/bd", icon: LayoutDashboard },
//       { name: "Meetings", route: "/bd/meetings", icon: CalendarCheck },
//       { name: "Pipeline", route: "/bd/pipeline", icon: Kanban },
//       { name: "Proposals", route: "/bd/proposals", icon: FileText },
//       { name: "Follow-ups", route: "/bd/follow-ups", icon: Bell },
//       { name: "Clients", route: "/bd/clients", icon: UserCheck },
//       { name: "Reports", route: "/bd/reports", icon: TrendingUp },
//     ],
//   },
//   {
//     label: "CRM",
//     icon: Building2,
//     items: [
//       { name: "Client Details", route: "/crm", icon: Building2 },
//       { name: "Submissions", route: "/crm/submissions", icon: ClipboardList },
//       { name: "Weekly Activity", route: "/crm/activity", icon: CalendarDays },
//       { name: "Revenue", route: "/crm/revenue", icon: DollarSign },
//       { name: "Offers", route: "/crm/offers", icon: Gift },
//       { name: "Performance", route: "/crm/performance", icon: Target },
//     ],
//   },
// ];

// /* Flat list for backward compat (breadcrumbs, etc.) */
// const NAV_ITEMS: NavItem[] = NAV_SECTIONS.flatMap((s) => s.items);

// /* Labels used by the breadcrumb. Anything missing falls back to a
//    prettified version of the URL segment. */
// const ROUTE_LABELS: Record<string, string> = {
//   "pipeline-dashboard": "Pipeline Dashboard",
//   "position-management": "Positions",
//   "calling-tracker": "Calling Tracker",
//   "candidate-management": "Candidates",
//   "submission-management": "Submissions",
//   "candidate-tracker": "Candidate Tracker",
//   "ai-matcher": "AI Matcher",
//   "whatsapp-tab": "WhatsApp Messages",
//   bd: "Business Development",
//   meetings: "Meetings",
//   pipeline: "Pipeline",
//   proposals: "Proposals",
//   "follow-ups": "Follow-ups",
//   clients: "Clients",
//   reports: "Reports",
//   create: "Create",
//   edit: "Edit",
// };

// /* ------------------------------------------------------------------ */
// /* Breadcrumb helpers                                                  */
// /* ------------------------------------------------------------------ */

// const isIdSegment = (segment: string) =>
//   /^\d+$/.test(segment) || /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(segment);

// const prettify = (segment: string) =>
//   segment.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

// const singular = (label: string) =>
//   label.endsWith("s") ? label.slice(0, -1) : label;

// type Crumb = { label: string; to: string };

// const useBreadcrumbs = (): Crumb[] => {
//   const { pathname } = useLocation();

//   return useMemo(() => {
//     const segments = pathname.split("/").filter(Boolean);
//     const crumbs: Crumb[] = [];
//     let path = "";

//     segments.forEach((segment) => {
//       path += `/${segment}`;
//       if (isIdSegment(segment)) {
//         const parent = crumbs[crumbs.length - 1]?.label ?? "Record";
//         crumbs.push({ label: `${singular(parent)} Detail`, to: path });
//       } else {
//         crumbs.push({ label: ROUTE_LABELS[segment] ?? prettify(segment), to: path });
//       }
//     });

//     return crumbs;
//   }, [pathname]);
// };

// /* ------------------------------------------------------------------ */
// /* Sidebar contents (shared by the desktop rail and the mobile drawer) */
// /*                                                                     */
// /* Alignment: every row starts with a w-16 (64px) column that holds the */
// /* 40px tile dead centre. The rail is also 64px when collapsed, so the  */
// /* HR tile and all five icons land on the rail's centre line. Buttons   */
// /* carry BTN_RESET so no global padding can shift them.                */
// /* ------------------------------------------------------------------ */

// interface SidebarNavProps {
//   /** Mobile drawer keeps labels visible; the desktop rail reveals them on hover. */
//   alwaysExpanded?: boolean;
//   onNavigate?: () => void;
// }

// const SidebarNav: React.FC<SidebarNavProps> = ({ alwaysExpanded = false, onNavigate }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   /* Which section is currently active (auto-detect from path) */
//   const activeSectionIdx = NAV_SECTIONS.findIndex((s) =>
//     s.items.some((item) => location.pathname === item.route || location.pathname.startsWith(item.route + "/"))
//   );

//   /* Collapsed/expanded state per section — default: active section open */
//   const [openSections, setOpenSections] = useState<Record<number, boolean>>(() => {
//     const init: Record<number, boolean> = {};
//     NAV_SECTIONS.forEach((_, i) => {
//       init[i] = i === (activeSectionIdx >= 0 ? activeSectionIdx : 0);
//     });
//     return init;
//   });

//   const toggleSection = (idx: number) => {
//     setOpenSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
//   };

//   const labelClass = alwaysExpanded
//     ? "opacity-100"
//     : "opacity-0 group-hover:opacity-100";

//   const handleSignOut = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("user");
//     onNavigate?.();
//     navigate("/signup", { replace: true });
//   };

//   const ICON_COL = "absolute left-0 top-0 flex h-12 w-16 items-center justify-center";
//   const LABEL_COL =
//     "absolute left-16 right-3 top-0 flex h-12 items-center truncate whitespace-nowrap transition-opacity duration-200";

//   return (
//     <div className="flex h-full flex-col py-3">
//       {/* Brand */}
//       <div className="relative h-12 w-full shrink-0">
//         <span className={ICON_COL}>
//           <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white">
//             HR
//           </span>
//         </span>
//         <span
//           className={`${LABEL_COL} text-base font-semibold text-gray-900 ${labelClass}`}
//         >
//           HR Dashboard
//         </span>
//       </div>

//       {/* Sectioned navigation */}
//       <nav className="mt-4 flex-1 overflow-y-auto p-0">
//         {NAV_SECTIONS.map((section, sIdx) => {
//           const SectionIcon = section.icon;
//           const isOpen = openSections[sIdx] ?? false;
//           const sectionHasActive = section.items.some(
//             (item) => location.pathname === item.route || location.pathname.startsWith(item.route + "/")
//           );

//           return (
//             <div key={section.label} className={sIdx > 0 ? "mt-1" : ""}>
//               {/* Section header — acts as toggle */}
//               <button
//                 type="button"
//                 onClick={() => toggleSection(sIdx)}
//                 title={alwaysExpanded ? undefined : section.label}
//                 className={`${BTN_RESET} group/section relative block h-11 w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
//               >
//                 <span className="absolute left-0 top-0 flex h-11 w-16 items-center justify-center">
//                   <span
//                     className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200 ${
//                       sectionHasActive
//                         ? "bg-teal-600/10 text-teal-700"
//                         : "text-gray-400 group-hover/section:text-gray-700"
//                     }`}
//                   >
//                     <SectionIcon className="h-4.5 w-4.5" />
//                   </span>
//                 </span>
//                 <span
//                   className={`absolute left-16 right-3 top-0 flex h-11 items-center justify-between truncate whitespace-nowrap transition-opacity duration-200 ${labelClass}`}
//                 >
//                   <span
//                     className={`text-xs font-bold tracking-wide uppercase ${
//                       sectionHasActive ? "text-teal-700" : "text-gray-400"
//                     }`}
//                   >
//                     {section.label}
//                   </span>
//                   <ChevronDown
//                     className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${
//                       isOpen ? "rotate-0" : "-rotate-90"
//                     }`}
//                   />
//                 </span>
//               </button>

//               {/* Section items — collapsible */}
//               {isOpen && (
//                 <ul className="m-0 list-none p-0">
//                   {section.items.map((item) => {
//                     const Icon = item.icon;
//                     const isActive =
//                       location.pathname === item.route ||
//                       (item.route !== "/bd" && location.pathname.startsWith(item.route + "/"));

//                     return (
//                       <li key={item.route} className="m-0 list-none p-0">
//                         <button
//                           type="button"
//                           onClick={() => {
//                             navigate(item.route);
//                             onNavigate?.();
//                           }}
//                           title={alwaysExpanded ? undefined : item.name}
//                           aria-current={isActive ? "page" : undefined}
//                           className={`${BTN_RESET} group/item relative block h-10 w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
//                         >
//                           <span className="absolute left-0 top-0 flex h-10 w-16 items-center justify-center">
//                             <span
//                               className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 ${
//                                 isActive
//                                   ? "bg-teal-600 text-white shadow-sm"
//                                   : "text-gray-500 group-hover/item:bg-white group-hover/item:text-gray-900"
//                               }`}
//                             >
//                               <Icon className="h-4 w-4" />
//                             </span>
//                           </span>
//                           <span
//                             className={`absolute left-16 right-3 top-0 flex h-10 items-center truncate whitespace-nowrap text-[13px] font-medium transition-opacity duration-200 ${labelClass} ${
//                               isActive ? "text-teal-700" : "text-gray-600"
//                             }`}
//                           >
//                             {item.name}
//                           </span>
//                         </button>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               )}
//             </div>
//           );
//         })}
//       </nav>

//       {/* Sign out */}
//       <div className="mb-3 border-t border-gray-200" />
//       <button
//         type="button"
//         onClick={handleSignOut}
//         title={alwaysExpanded ? undefined : "Sign out"}
//         className={`${BTN_RESET} group/item relative block h-12 w-full shrink-0 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
//       >
//         <span className={ICON_COL}>
//           <span className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors duration-200 group-hover/item:bg-white group-hover/item:text-red-600">
//             <LogOut className="h-5 w-5" />
//           </span>
//         </span>
//         <span className={`${LABEL_COL} text-sm font-medium text-gray-600 ${labelClass}`}>
//           Sign out
//         </span>
//       </button>
//     </div>
//   );
// };

// /* ------------------------------------------------------------------ */
// /* Header = grey rail + grey top bar + inner corner                    */
// /* ------------------------------------------------------------------ */

// const Header: React.FC = () => {
//   const navigate = useNavigate();
//   const crumbs = useBreadcrumbs();
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);

//   // Redirect to signup if not logged in
//   // useEffect(() => {
//   //   if (!isLoggedIn()) {
//   //     navigate("/signup", { replace: true });
//   //   }
//   // }, [navigate]);

//   // Close the avatar menu on outside click
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Close the mobile drawer with Escape
//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === "Escape") setDrawerOpen(false);
//     };
//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, []);

//   const handleSignOut = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("user");
//     navigate("/signup", { replace: true });
//   };

//   return (
//     <>
//       {/* ---------------- Desktop rail: 64px, 240px on hover ------------------ */}
//       <aside
//         className="group fixed inset-y-0 left-0 z-40 hidden w-16 flex-col overflow-hidden bg-gray-100 transition-[width,box-shadow] duration-200 ease-out hover:w-60 hover:shadow-xl md:flex"
//         aria-label="Main navigation"
//       >
//         <SidebarNav />
//       </aside>

//       {/* ---------------- Mobile drawer --------------------------------------- */}
//       {drawerOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-gray-900/40 md:hidden"
//           onClick={() => setDrawerOpen(false)}
//           aria-hidden="true"
//         />
//       )}
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 transition-transform duration-200 ease-out md:hidden ${
//           drawerOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//         aria-label="Main navigation"
//         aria-hidden={!drawerOpen}
//       >
//         <button
//           type="button"
//           onClick={() => setDrawerOpen(false)}
//           className={`${BTN_RESET} absolute right-3 top-4 cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-white`}
//           aria-label="Close navigation"
//         >
//           <X className="h-5 w-5" />
//         </button>
//         <SidebarNav alwaysExpanded onNavigate={() => setDrawerOpen(false)} />
//       </aside>

//       {/* ---------------- Top bar + inner corner ------------------------------ */}
//       <header className="sticky top-0 z-30 bg-gray-100 md:ml-16">
//         <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
//           {/* Hamburger (mobile only) */}
//           <button
//             type="button"
//             onClick={() => setDrawerOpen(true)}
//             className={`${BTN_RESET} cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-white md:hidden`}
//             aria-label="Open navigation"
//           >
//             <Menu className="h-5 w-5" />
//           </button>

//           {/* Breadcrumb - where you are right now */}
//           <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
//             <ol className="m-0 flex list-none items-center gap-1 truncate p-0 text-sm">
//               {crumbs.map((crumb, index) => {
//                 const isLast = index === crumbs.length - 1;
//                 return (
//                   <li key={crumb.to} className="flex list-none items-center gap-1">
//                     {index > 0 && (
//                       <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
//                     )}
//                     {isLast ? (
//                       <span className="truncate font-semibold text-gray-900">
//                         {crumb.label}
//                       </span>
//                     ) : (
//                       <Link
//                         to={crumb.to}
//                         className="truncate text-gray-500 hover:text-gray-800"
//                       >
//                         {crumb.label}
//                       </Link>
//                     )}
//                   </li>
//                 );
//               })}
//             </ol>
//           </nav>

//           {/* Search - placeholder, remove this block if you don't need it yet */}
//           <div className="relative hidden lg:block lg:w-80">
//             <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//             <input
//               type="search"
//               placeholder="Search..."
//               className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
//             />
//           </div>

//           {/* Avatar + menu */}
//           <div className="relative shrink-0" ref={menuRef}>
//             <button
//               type="button"
//               onClick={() => setMenuOpen(!menuOpen)}
//               className={`${BTN_RESET} flex h-9 w-9 cursor-pointer items-center justify-center rounded-full !bg-teal-600 text-sm font-medium !text-white`}
//               aria-haspopup="menu"
//               aria-expanded={menuOpen}
//             >
//               JS
//             </button>

//             {menuOpen && (
//               <div className="absolute right-0 z-10 mt-2 w-40 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
//                 <button
//                   type="button"
//                   onClick={handleSignOut}
//                   className={`${BTN_RESET} w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100`}
//                 >
//                   Sign out
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* The inside corner. A 16px white strip whose top-left is rounded, so
//             the grey rail and grey top bar show through as a curve. It sits
//             flush against your page content, which is also white. */}
//         <div className="h-4 bg-white md:rounded-tl-2xl" aria-hidden="true" />
//       </header>
//     </>
//   );
// };

// export default Header;


// // import React, { useState, useEffect, useRef } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { isLoggedIn } from "../utils/auth";

// // // TabButton component
// // interface TabButtonProps {
// //   name: string;
// //   isActive: boolean;
// //   onClick: () => void;
// // }

// // const TabButton: React.FC<TabButtonProps> = ({ name, isActive, onClick }) => {
// //   return (
// //     <button
// //       onClick={onClick}
// //       className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
// //         isActive
// //           ? "border-teal-600 text-teal-600"
// //           : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
// //       }`}
// //     >
// //       {name}
// //     </button>
// //   );
// // };

// // // Header component
// // const Header: React.FC = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [dropdownOpen, setDropdownOpen] = useState(false);
// //   const dropdownRef = useRef<HTMLDivElement>(null);

// //   // Redirect to signup if not logged in
// //   // useEffect(() => {
// //   //   if (!isLoggedIn()) {
// //   //     navigate("/signup", { replace: true });
// //   //   }
// //   // }, [navigate]);

// //   // Close dropdown on outside click
// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// //         setDropdownOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const tabs = [
// //     { name: "Positions", route: "/position-management" },
// //     { name: "Candidates", route: "/candidate-management" },
// //     { name: "Submissions", route: "/submission-management" },
// //     { name: "AI Matcher", route: "/ai-matcher" },
// //      { name: "WhatsApp Messages", route: "/whatsapp-tab" },
// //   ];

// //   const handleTabClick = (tab: { name: string; route?: string }) => {
// //     if (tab.route) {
// //       navigate(tab.route);
// //     }
// //   };

// //   const handleSignOut = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("refreshToken");
// //     localStorage.removeItem("user");
// //     navigate("/signup", { replace: true });
// //   };

// //   return (
// //     <div className="bg-white border-b border-gray-200">
// //       {/* Top Bar */}
// //       <div className="flex items-center justify-between px-6 py-4">
// //         <div className="flex items-center space-x-4">
// //           <div className="flex items-center space-x-2">
// //             <div className="w-8 h-8 bg-teal-600 rounded text-white flex items-center justify-center font-bold text-sm">
// //               HR
// //             </div>
// //             <span className="text-lg font-semibold text-gray-800">
// //               HR Dashboard
// //             </span>
// //           </div>
// //         </div>

// //         {/* JS Avatar + Dropdown */}
// //         <div className="relative" ref={dropdownRef}>
// //           <div
// //             onClick={() => setDropdownOpen(!dropdownOpen)}
// //             className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-medium text-sm cursor-pointer"
// //           >
// //             JS
// //           </div>

// //           {dropdownOpen && (
// //             <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
// //               <button
// //                 onClick={handleSignOut}
// //                 className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
// //               >
// //                 Sign Out
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Navigation Tabs */}
// //       <div className="flex space-x-8 px-6">
// //         {tabs.map((tab) => (
// //           <TabButton
// //             key={tab.name}
// //             name={tab.name}
// //             isActive={location.pathname === tab.route}
// //             onClick={() => handleTabClick(tab)}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Header;




// // //
// // import React, { useState, useEffect, useRef, useMemo } from "react";
// // import { useNavigate, useLocation, Link } from "react-router-dom";
// // import {
// //   Briefcase,
// //   Users,
// //   ClipboardCheck,
// //   Sparkles,
// //   MessageCircle,
// //   Menu,
// //   X,
// //   Search,
// //   LogOut,
// //   ChevronRight,
// // } from "lucide-react";
// // // import { isLoggedIn } from "../utils/auth";

// // /* ------------------------------------------------------------------ */
// // /* Button reset                                                        */
// // /*                                                                     */
// // /* Neutralises any global `button { ... }` rule (the Vite starter CSS   */
// // /* sets padding: 0.6em 1.2em, a border and a dark background). Every    */
// // /* button in this file starts from zero and opts back in explicitly.    */
// // /* ------------------------------------------------------------------ */
// // const BTN_RESET = "m-0 appearance-none border-0 bg-transparent p-0 font-inherit";

// // /* ------------------------------------------------------------------ */
// // /* Navigation config                                                   */
// // /* ------------------------------------------------------------------ */

// // type NavItem = {
// //   name: string;
// //   route: string;
// //   icon: React.ComponentType<{ className?: string }>;
// // };

// // const NAV_ITEMS: NavItem[] = [
// //   { name: "Positions", route: "/position-management", icon: Briefcase },
// //   { name: "Candidates", route: "/candidate-management", icon: Users },
// //   { name: "Submissions", route: "/submission-management", icon: ClipboardCheck },
// //   { name: "AI Matcher", route: "/ai-matcher", icon: Sparkles },
// //   { name: "WhatsApp Messages", route: "/whatsapp-tab", icon: MessageCircle },
// // ];

// // /* Labels used by the breadcrumb. Anything missing falls back to a
// //    prettified version of the URL segment. */
// // const ROUTE_LABELS: Record<string, string> = {
// //   "position-management": "Positions",
// //   "candidate-management": "Candidates",
// //   "submission-management": "Submissions",
// //   "ai-matcher": "AI Matcher",
// //   "whatsapp-tab": "WhatsApp Messages",
// //   create: "Create",
// //   edit: "Edit",
// // };

// // /* ------------------------------------------------------------------ */
// // /* Breadcrumb helpers                                                  */
// // /* ------------------------------------------------------------------ */

// // const isIdSegment = (segment: string) =>
// //   /^\d+$/.test(segment) || /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(segment);

// // const prettify = (segment: string) =>
// //   segment.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

// // const singular = (label: string) =>
// //   label.endsWith("s") ? label.slice(0, -1) : label;

// // type Crumb = { label: string; to: string };

// // const useBreadcrumbs = (): Crumb[] => {
// //   const { pathname } = useLocation();

// //   return useMemo(() => {
// //     const segments = pathname.split("/").filter(Boolean);
// //     const crumbs: Crumb[] = [];
// //     let path = "";

// //     segments.forEach((segment) => {
// //       path += `/${segment}`;
// //       if (isIdSegment(segment)) {
// //         const parent = crumbs[crumbs.length - 1]?.label ?? "Record";
// //         crumbs.push({ label: `${singular(parent)} Detail`, to: path });
// //       } else {
// //         crumbs.push({ label: ROUTE_LABELS[segment] ?? prettify(segment), to: path });
// //       }
// //     });

// //     return crumbs;
// //   }, [pathname]);
// // };

// // /* ------------------------------------------------------------------ */
// // /* Sidebar contents (shared by the desktop rail and the mobile drawer) */
// // /*                                                                     */
// // /* Alignment: every row starts with a w-16 (64px) column that holds the */
// // /* 40px tile dead centre. The rail is also 64px when collapsed, so the  */
// // /* HR tile and all five icons land on the rail's centre line. Buttons   */
// // /* carry BTN_RESET so no global padding can shift them.                */
// // /* ------------------------------------------------------------------ */

// // interface SidebarNavProps {
// //   /** Mobile drawer keeps labels visible; the desktop rail reveals them on hover. */
// //   alwaysExpanded?: boolean;
// //   onNavigate?: () => void;
// // }

// // const SidebarNav: React.FC<SidebarNavProps> = ({ alwaysExpanded = false, onNavigate }) => {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const labelClass = alwaysExpanded
// //     ? "opacity-100"
// //     : "opacity-0 group-hover:opacity-100";

// //   const handleSignOut = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("refreshToken");
// //     localStorage.removeItem("user");
// //     onNavigate?.();
// //     navigate("/signup", { replace: true });
// //   };

// //   return (
// //     <div className="flex h-full flex-col py-3">
// //       {/* Brand */}
// //       <div className="flex w-full items-center">
// //         <span className="flex w-16 shrink-0 items-center justify-center">
// //           <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white">
// //             HR
// //           </span>
// //         </span>
// //         <span
// //           className={`truncate whitespace-nowrap text-base font-semibold text-gray-900 transition-opacity duration-200 ${labelClass}`}
// //         >
// //           HR Dashboard
// //         </span>
// //       </div>

// //       {/* Primary navigation */}
// //       <nav className="mt-6 flex-1 p-0">
// //         <ul className="m-0 list-none space-y-1 p-0">
// //           {NAV_ITEMS.map((item) => {
// //             const Icon = item.icon;
// //             const isActive = location.pathname.startsWith(item.route);

// //             return (
// //               <li key={item.route} className="list-none">
// //                 <button
// //                   type="button"
// //                   onClick={() => {
// //                     navigate(item.route);
// //                     onNavigate?.();
// //                   }}
// //                   title={alwaysExpanded ? undefined : item.name}
// //                   aria-current={isActive ? "page" : undefined}
// //                   className={`${BTN_RESET} group/item flex w-full cursor-pointer items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
// //                 >
// //                   <span className="flex w-16 shrink-0 items-center justify-center">
// //                     <span
// //                       className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 ${
// //                         isActive
// //                           ? "bg-teal-600 text-white shadow-sm"
// //                           : "text-gray-500 group-hover/item:bg-white group-hover/item:text-gray-900"
// //                       }`}
// //                     >
// //                       <Icon className="h-5 w-5" />
// //                     </span>
// //                   </span>
// //                   <span
// //                     className={`truncate whitespace-nowrap text-sm font-medium transition-opacity duration-200 ${labelClass} ${
// //                       isActive ? "text-teal-700" : "text-gray-600"
// //                     }`}
// //                   >
// //                     {item.name}
// //                   </span>
// //                 </button>
// //               </li>
// //             );
// //           })}
// //         </ul>
// //       </nav>

// //       {/* Sign out */}
// //       <div className="mb-3 border-t border-gray-200" />
// //       <button
// //         type="button"
// //         onClick={handleSignOut}
// //         title={alwaysExpanded ? undefined : "Sign out"}
// //         className={`${BTN_RESET} group/item flex w-full cursor-pointer items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
// //       >
// //         <span className="flex w-16 shrink-0 items-center justify-center">
// //           <span className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors duration-200 group-hover/item:bg-white group-hover/item:text-red-600">
// //             <LogOut className="h-5 w-5" />
// //           </span>
// //         </span>
// //         <span
// //           className={`truncate whitespace-nowrap text-sm font-medium text-gray-600 transition-opacity duration-200 ${labelClass}`}
// //         >
// //           Sign out
// //         </span>
// //       </button>
// //     </div>
// //   );
// // };

// // /* ------------------------------------------------------------------ */
// // /* Header = grey rail + grey top bar + inner corner                    */
// // /* ------------------------------------------------------------------ */

// // const Header: React.FC = () => {
// //   const navigate = useNavigate();
// //   const crumbs = useBreadcrumbs();
// //   const [drawerOpen, setDrawerOpen] = useState(false);
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const menuRef = useRef<HTMLDivElement>(null);

// //   // Redirect to signup if not logged in
// //   // useEffect(() => {
// //   //   if (!isLoggedIn()) {
// //   //     navigate("/signup", { replace: true });
// //   //   }
// //   // }, [navigate]);

// //   // Close the avatar menu on outside click
// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
// //         setMenuOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Close the mobile drawer with Escape
// //   useEffect(() => {
// //     const handleEscape = (event: KeyboardEvent) => {
// //       if (event.key === "Escape") setDrawerOpen(false);
// //     };
// //     document.addEventListener("keydown", handleEscape);
// //     return () => document.removeEventListener("keydown", handleEscape);
// //   }, []);

// //   const handleSignOut = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("refreshToken");
// //     localStorage.removeItem("user");
// //     navigate("/signup", { replace: true });
// //   };

// //   return (
// //     <>
// //       {/* ---------------- Desktop rail: 64px, 240px on hover ------------------ */}
// //       <aside
// //         className="group fixed inset-y-0 left-0 z-40 hidden w-16 flex-col overflow-hidden bg-gray-100 transition-[width,box-shadow] duration-200 ease-out hover:w-60 hover:shadow-xl md:flex"
// //         aria-label="Main navigation"
// //       >
// //         <SidebarNav />
// //       </aside>

// //       {/* ---------------- Mobile drawer --------------------------------------- */}
// //       {drawerOpen && (
// //         <div
// //           className="fixed inset-0 z-40 bg-gray-900/40 md:hidden"
// //           onClick={() => setDrawerOpen(false)}
// //           aria-hidden="true"
// //         />
// //       )}
// //       <aside
// //         className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 transition-transform duration-200 ease-out md:hidden ${
// //           drawerOpen ? "translate-x-0" : "-translate-x-full"
// //         }`}
// //         aria-label="Main navigation"
// //         aria-hidden={!drawerOpen}
// //       >
// //         <button
// //           type="button"
// //           onClick={() => setDrawerOpen(false)}
// //           className={`${BTN_RESET} absolute right-3 top-4 cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-white`}
// //           aria-label="Close navigation"
// //         >
// //           <X className="h-5 w-5" />
// //         </button>
// //         <SidebarNav alwaysExpanded onNavigate={() => setDrawerOpen(false)} />
// //       </aside>

// //       {/* ---------------- Top bar + inner corner ------------------------------ */}
// //       <header className="sticky top-0 z-30 bg-gray-100 md:ml-16">
// //         <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
// //           {/* Hamburger (mobile only) */}
// //           <button
// //             type="button"
// //             onClick={() => setDrawerOpen(true)}
// //             className={`${BTN_RESET} cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-white md:hidden`}
// //             aria-label="Open navigation"
// //           >
// //             <Menu className="h-5 w-5" />
// //           </button>

// //           {/* Breadcrumb - where you are right now */}
// //           <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
// //             <ol className="m-0 flex list-none items-center gap-1 truncate p-0 text-sm">
// //               {crumbs.map((crumb, index) => {
// //                 const isLast = index === crumbs.length - 1;
// //                 return (
// //                   <li key={crumb.to} className="flex list-none items-center gap-1">
// //                     {index > 0 && (
// //                       <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
// //                     )}
// //                     {isLast ? (
// //                       <span className="truncate font-semibold text-gray-900">
// //                         {crumb.label}
// //                       </span>
// //                     ) : (
// //                       <Link
// //                         to={crumb.to}
// //                         className="truncate text-gray-500 hover:text-gray-800"
// //                       >
// //                         {crumb.label}
// //                       </Link>
// //                     )}
// //                   </li>
// //                 );
// //               })}
// //             </ol>
// //           </nav>

// //           {/* Search - placeholder, remove this block if you don't need it yet */}
// //           <div className="relative hidden lg:block lg:w-80">
// //             <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
// //             <input
// //               type="search"
// //               placeholder="Search..."
// //               className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
// //             />
// //           </div>

// //           {/* Avatar + menu */}
// //           <div className="relative shrink-0" ref={menuRef}>
// //             <button
// //               type="button"
// //               onClick={() => setMenuOpen(!menuOpen)}
// //               className={`${BTN_RESET} flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-teal-600 text-sm font-medium text-white`}
// //               aria-haspopup="menu"
// //               aria-expanded={menuOpen}
// //             >
// //               JS
// //             </button>

// //             {menuOpen && (
// //               <div className="absolute right-0 z-10 mt-2 w-40 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
// //                 <button
// //                   type="button"
// //                   onClick={handleSignOut}
// //                   className={`${BTN_RESET} w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100`}
// //                 >
// //                   Sign out
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* The inside corner. A 16px white strip whose top-left is rounded, so
// //             the grey rail and grey top bar show through as a curve. It sits
// //             flush against your page content, which is also white. */}
// //         <div className="h-4 bg-white md:rounded-tl-2xl" aria-hidden="true" />
// //       </header>
// //     </>
// //   );
// // };

// // export default Header;



// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import {
//   Briefcase,
//   Users,
//   ClipboardCheck,
//   Sparkles,
//   MessageCircle,
//   Menu,
//   X,
//   Search,
//   LogOut,
//   ChevronRight,
// } from "lucide-react";
// // import { isLoggedIn } from "../utils/auth";

// /* ------------------------------------------------------------------ */
// /* Button reset                                                        */
// /*                                                                     */
// /* Neutralises any global `button { ... }` rule (the Vite starter CSS   */
// /* sets padding: 0.6em 1.2em, a border and a dark background). Every    */
// /* button in this file starts from zero and opts back in explicitly.    */
// /* ------------------------------------------------------------------ */
// const BTN_RESET = "m-0 appearance-none border-0 bg-transparent p-0";

// /* ------------------------------------------------------------------ */
// /* Navigation config                                                   */
// /* ------------------------------------------------------------------ */

// type NavItem = {
//   name: string;
//   route: string;
//   icon: React.ComponentType<{ className?: string }>;
// };

// const NAV_ITEMS: NavItem[] = [
//   { name: "Positions", route: "/position-management", icon: Briefcase },
//   { name: "Candidates", route: "/candidate-management", icon: Users },
//   { name: "Submissions", route: "/submission-management", icon: ClipboardCheck },
//   { name: "AI Matcher", route: "/ai-matcher", icon: Sparkles },
//   { name: "WhatsApp Messages", route: "/whatsapp-tab", icon: MessageCircle },
// ];

// /* Labels used by the breadcrumb. Anything missing falls back to a
//    prettified version of the URL segment. */
// const ROUTE_LABELS: Record<string, string> = {
//   "position-management": "Positions",
//   "candidate-management": "Candidates",
//   "submission-management": "Submissions",
//   "ai-matcher": "AI Matcher",
//   "whatsapp-tab": "WhatsApp Messages",
//   create: "Create",
//   edit: "Edit",
// };

// /* ------------------------------------------------------------------ */
// /* Breadcrumb helpers                                                  */
// /* ------------------------------------------------------------------ */

// const isIdSegment = (segment: string) =>
//   /^\d+$/.test(segment) || /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(segment);

// const prettify = (segment: string) =>
//   segment.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

// const singular = (label: string) =>
//   label.endsWith("s") ? label.slice(0, -1) : label;

// type Crumb = { label: string; to: string };

// const useBreadcrumbs = (): Crumb[] => {
//   const { pathname } = useLocation();

//   return useMemo(() => {
//     const segments = pathname.split("/").filter(Boolean);
//     const crumbs: Crumb[] = [];
//     let path = "";

//     segments.forEach((segment) => {
//       path += `/${segment}`;
//       if (isIdSegment(segment)) {
//         const parent = crumbs[crumbs.length - 1]?.label ?? "Record";
//         crumbs.push({ label: `${singular(parent)} Detail`, to: path });
//       } else {
//         crumbs.push({ label: ROUTE_LABELS[segment] ?? prettify(segment), to: path });
//       }
//     });

//     return crumbs;
//   }, [pathname]);
// };

// /* ------------------------------------------------------------------ */
// /* Sidebar contents (shared by the desktop rail and the mobile drawer) */
// /*                                                                     */
// /* Alignment: every row starts with a w-16 (64px) column that holds the */
// /* 40px tile dead centre. The rail is also 64px when collapsed, so the  */
// /* HR tile and all five icons land on the rail's centre line. Buttons   */
// /* carry BTN_RESET so no global padding can shift them.                */
// /* ------------------------------------------------------------------ */

// interface SidebarNavProps {
//   /** Mobile drawer keeps labels visible; the desktop rail reveals them on hover. */
//   alwaysExpanded?: boolean;
//   onNavigate?: () => void;
// }

// const SidebarNav: React.FC<SidebarNavProps> = ({ alwaysExpanded = false, onNavigate }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const labelClass = alwaysExpanded
//     ? "opacity-100"
//     : "opacity-0 group-hover:opacity-100";

//   const handleSignOut = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("user");
//     onNavigate?.();
//     navigate("/signup", { replace: true });
//   };

//   /* Row layout: the row is `relative h-12`, and the icon column is
//      `absolute left-0 w-16`. An absolutely positioned child is placed against
//      its parent's PADDING BOX, so any padding a global stylesheet puts on the
//      button cannot move it. This is why the icons line up regardless of CSS
//      you may have elsewhere in the app. */
//   const ICON_COL = "absolute left-0 top-0 flex h-12 w-16 items-center justify-center";
//   const LABEL_COL =
//     "absolute left-16 right-3 top-0 flex h-12 items-center truncate whitespace-nowrap transition-opacity duration-200";

//   return (
//     <div className="flex h-full flex-col py-3">
//       {/* Brand */}
//       <div className="relative h-12 w-full shrink-0">
//         <span className={ICON_COL}>
//           <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white">
//             HR
//           </span>
//         </span>
//         <span
//           className={`${LABEL_COL} text-base font-semibold text-gray-900 ${labelClass}`}
//         >
//           HR Dashboard
//         </span>
//       </div>

//       {/* Primary navigation */}
//       <nav className="mt-6 flex-1 p-0">
//         <ul className="m-0 list-none p-0">
//           {NAV_ITEMS.map((item) => {
//             const Icon = item.icon;
//             const isActive = location.pathname.startsWith(item.route);

//             return (
//               <li key={item.route} className="m-0 list-none p-0">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     navigate(item.route);
//                     onNavigate?.();
//                   }}
//                   title={alwaysExpanded ? undefined : item.name}
//                   aria-current={isActive ? "page" : undefined}
//                   className={`${BTN_RESET} group/item relative block h-12 w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
//                 >
//                   <span className={ICON_COL}>
//                     <span
//                       className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 ${
//                         isActive
//                           ? "bg-teal-600 text-white shadow-sm"
//                           : "text-gray-500 group-hover/item:bg-white group-hover/item:text-gray-900"
//                       }`}
//                     >
//                       <Icon className="h-5 w-5" />
//                     </span>
//                   </span>
//                   <span
//                     className={`${LABEL_COL} text-sm font-medium ${labelClass} ${
//                       isActive ? "text-teal-700" : "text-gray-600"
//                     }`}
//                   >
//                     {item.name}
//                   </span>
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* Sign out */}
//       <div className="mb-3 border-t border-gray-200" />
//       <button
//         type="button"
//         onClick={handleSignOut}
//         title={alwaysExpanded ? undefined : "Sign out"}
//         className={`${BTN_RESET} group/item relative block h-12 w-full shrink-0 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
//       >
//         <span className={ICON_COL}>
//           <span className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors duration-200 group-hover/item:bg-white group-hover/item:text-red-600">
//             <LogOut className="h-5 w-5" />
//           </span>
//         </span>
//         <span className={`${LABEL_COL} text-sm font-medium text-gray-600 ${labelClass}`}>
//           Sign out
//         </span>
//       </button>
//     </div>
//   );
// };

// /* ------------------------------------------------------------------ */
// /* Header = grey rail + grey top bar + inner corner                    */
// /* ------------------------------------------------------------------ */

// const Header: React.FC = () => {
//   const navigate = useNavigate();
//   const crumbs = useBreadcrumbs();
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);

//   // Redirect to signup if not logged in
//   // useEffect(() => {
//   //   if (!isLoggedIn()) {
//   //     navigate("/signup", { replace: true });
//   //   }
//   // }, [navigate]);

//   // Close the avatar menu on outside click
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Close the mobile drawer with Escape
//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === "Escape") setDrawerOpen(false);
//     };
//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, []);

//   const handleSignOut = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("user");
//     navigate("/signup", { replace: true });
//   };

//   return (
//     <>
//       {/* ---------------- Desktop rail: 64px, 240px on hover ------------------ */}
//       <aside
//         className="group fixed inset-y-0 left-0 z-40 hidden w-16 flex-col overflow-hidden bg-gray-100 transition-[width,box-shadow] duration-200 ease-out hover:w-60 hover:shadow-xl md:flex"
//         aria-label="Main navigation"
//       >
//         <SidebarNav />
//       </aside>

//       {/* ---------------- Mobile drawer --------------------------------------- */}
//       {drawerOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-gray-900/40 md:hidden"
//           onClick={() => setDrawerOpen(false)}
//           aria-hidden="true"
//         />
//       )}
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 transition-transform duration-200 ease-out md:hidden ${
//           drawerOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//         aria-label="Main navigation"
//         aria-hidden={!drawerOpen}
//       >
//         <button
//           type="button"
//           onClick={() => setDrawerOpen(false)}
//           className={`${BTN_RESET} absolute right-3 top-4 cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-white`}
//           aria-label="Close navigation"
//         >
//           <X className="h-5 w-5" />
//         </button>
//         <SidebarNav alwaysExpanded onNavigate={() => setDrawerOpen(false)} />
//       </aside>

//       {/* ---------------- Top bar + inner corner ------------------------------ */}
//       <header className="sticky top-0 z-30 bg-gray-100 md:ml-16">
//         <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
//           {/* Hamburger (mobile only) */}
//           <button
//             type="button"
//             onClick={() => setDrawerOpen(true)}
//             className={`${BTN_RESET} cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-white md:hidden`}
//             aria-label="Open navigation"
//           >
//             <Menu className="h-5 w-5" />
//           </button>

//           {/* Breadcrumb - where you are right now */}
//           <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
//             <ol className="m-0 flex list-none items-center gap-1 truncate p-0 text-sm">
//               {crumbs.map((crumb, index) => {
//                 const isLast = index === crumbs.length - 1;
//                 return (
//                   <li key={crumb.to} className="flex list-none items-center gap-1">
//                     {index > 0 && (
//                       <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
//                     )}
//                     {isLast ? (
//                       <span className="truncate font-semibold text-gray-900">
//                         {crumb.label}
//                       </span>
//                     ) : (
//                       <Link
//                         to={crumb.to}
//                         className="truncate text-gray-500 hover:text-gray-800"
//                       >
//                         {crumb.label}
//                       </Link>
//                     )}
//                   </li>
//                 );
//               })}
//             </ol>
//           </nav>

//           {/* Search - placeholder, remove this block if you don't need it yet */}
//           <div className="relative hidden lg:block lg:w-80">
//             <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//             <input
//               type="search"
//               placeholder="Search..."
//               className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
//             />
//           </div>

//           {/* Avatar + menu */}
//           <div className="relative shrink-0" ref={menuRef}>
//             <button
//               type="button"
//               onClick={() => setMenuOpen(!menuOpen)}
//               className={`${BTN_RESET} flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-teal-600 text-sm font-medium text-white`}
//               aria-haspopup="menu"
//               aria-expanded={menuOpen}
//             >
//               JS
//             </button>

//             {menuOpen && (
//               <div className="absolute right-0 z-10 mt-2 w-40 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
//                 <button
//                   type="button"
//                   onClick={handleSignOut}
//                   className={`${BTN_RESET} w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100`}
//                 >
//                   Sign out
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* The inside corner. A 16px white strip whose top-left is rounded, so
//             the grey rail and grey top bar show through as a curve. It sits
//             flush against your page content, which is also white. */}
//         <div className="h-4 bg-white md:rounded-tl-2xl" aria-hidden="true" />
//       </header>
//     </>
//   );
// };

// export default Header;



// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import {
//   Briefcase,
//   Users,
//   ClipboardCheck,
//   Sparkles,
//   MessageCircle,
//   Menu,
//   X,
//   Search,
//   LogOut,
//   ChevronRight,
//   ChevronDown,
//   PhoneCall,
//   Activity,
//   BarChart3,
//   Handshake,
//   LayoutDashboard,
//   CalendarCheck,
//   Kanban,
//   FileText,
//   Bell,
//   UserCheck,
//   TrendingUp,
//   Building2,
//   ClipboardList,
//   CalendarDays,
//   DollarSign,
//   Gift,
//   Target,
//   FileBarChart,
//   CalendarRange,
//   Award,
//   Mic2,
//   Percent,
//   UserPlus,
// } from "lucide-react";
// // import { isLoggedIn } from "../utils/auth";

// /* ------------------------------------------------------------------ */
// /* Button reset                                                        */
// /*                                                                     */
// /* Neutralises any global `button { ... }` rule (the Vite starter CSS   */
// /* sets padding: 0.6em 1.2em, a border and a dark background). Every    */
// /* button in this file starts from zero and opts back in explicitly.    */
// /* ------------------------------------------------------------------ */
// const BTN_RESET = "m-0 appearance-none border-0 bg-transparent p-0";

// /* ------------------------------------------------------------------ */
// /* Navigation config — grouped into collapsible sections               */
// /* ------------------------------------------------------------------ */

// type NavItem = {
//   name: string;
//   route: string;
//   icon: React.ComponentType<{ className?: string }>;
// };

// type NavSection = {
//   label: string;
//   icon: React.ComponentType<{ className?: string }>;
//   items: NavItem[];
// };

// const NAV_SECTIONS: NavSection[] = [
//   {
//     label: "Recruiter",
//     icon: Briefcase,
//     items: [
//       { name: "Pipeline", route: "/pipeline-dashboard", icon: BarChart3 },
//       { name: "Positions", route: "/position-management", icon: Briefcase },
//       { name: "Calling Tracker", route: "/calling-tracker", icon: PhoneCall },
//       { name: "Candidates", route: "/candidate-management", icon: Users },
//       { name: "Submissions", route: "/submission-management", icon: ClipboardCheck },
//       { name: "Candidate Tracker", route: "/candidate-tracker", icon: Activity },
//       { name: "AI Matcher", route: "/ai-matcher", icon: Sparkles },
//       { name: "WhatsApp Messages", route: "/whatsapp-tab", icon: MessageCircle },
//     ],
//   },
//   {
//     label: "BD",
//     icon: Handshake,
//     items: [
//       { name: "Dashboard", route: "/bd", icon: LayoutDashboard },
//       { name: "Meetings", route: "/bd/meetings", icon: CalendarCheck },
//       { name: "Pipeline", route: "/bd/pipeline", icon: Kanban },
//       { name: "Proposals", route: "/bd/proposals", icon: FileText },
//       { name: "Follow-ups", route: "/bd/follow-ups", icon: Bell },
//       { name: "Clients", route: "/bd/clients", icon: UserCheck },
//       { name: "Reports", route: "/bd/reports", icon: TrendingUp },
//     ],
//   },
//   {
//     label: "CRM",
//     icon: Building2,
//     items: [
//       { name: "Client Details", route: "/crm", icon: Building2 },
//       { name: "Submissions", route: "/crm/submissions", icon: ClipboardList },
//       { name: "Weekly Activity", route: "/crm/activity", icon: CalendarDays },
//       { name: "Revenue", route: "/crm/revenue", icon: DollarSign },
//       { name: "Offers", route: "/crm/offers", icon: Gift },
//       { name: "Performance", route: "/crm/performance", icon: Target },
//     ],
//   },
//   {
//     label: "Reports",
//     icon: FileBarChart,
//     items: [
//       { name: "Submissions", route: "/reports", icon: ClipboardList },
//       { name: "Weekly Dashboard", route: "/reports/weekly-dashboard", icon: CalendarRange },
//       { name: "Performance", route: "/reports/performance", icon: Award },
//       { name: "Interviews", route: "/reports/interviews", icon: Mic2 },
//       { name: "Closure Ratio", route: "/reports/closure-ratio", icon: Percent },
//       { name: "Yet to Join", route: "/reports/yet-to-join", icon: UserPlus },
//     ],
//   },
// ];

// /* Flat list for backward compat (breadcrumbs, etc.) */
// const NAV_ITEMS: NavItem[] = NAV_SECTIONS.flatMap((s) => s.items);

// /* Labels used by the breadcrumb. Anything missing falls back to a
//    prettified version of the URL segment. */
// const ROUTE_LABELS: Record<string, string> = {
//   "pipeline-dashboard": "Pipeline Dashboard",
//   "position-management": "Positions",
//   "calling-tracker": "Calling Tracker",
//   "candidate-management": "Candidates",
//   "submission-management": "Submissions",
//   "candidate-tracker": "Candidate Tracker",
//   "ai-matcher": "AI Matcher",
//   "whatsapp-tab": "WhatsApp Messages",
//   bd: "Business Development",
//   meetings: "Meetings",
//   pipeline: "Pipeline",
//   proposals: "Proposals",
//   "follow-ups": "Follow-ups",
//   clients: "Clients",
//   reports: "Reports",
//   "weekly-dashboard": "Weekly Dashboard",
//   performance: "Performance",
//   interviews: "Interviews",
//   "closure-ratio": "Closure Ratio",
//   "yet-to-join": "Yet to Join",
//   create: "Create",
//   edit: "Edit",
// };

// /* ------------------------------------------------------------------ */
// /* Breadcrumb helpers                                                  */
// /* ------------------------------------------------------------------ */

// const isIdSegment = (segment: string) =>
//   /^\d+$/.test(segment) || /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(segment);

// const prettify = (segment: string) =>
//   segment.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

// const singular = (label: string) =>
//   label.endsWith("s") ? label.slice(0, -1) : label;

// type Crumb = { label: string; to: string };

// const useBreadcrumbs = (): Crumb[] => {
//   const { pathname } = useLocation();

//   return useMemo(() => {
//     const segments = pathname.split("/").filter(Boolean);
//     const crumbs: Crumb[] = [];
//     let path = "";

//     segments.forEach((segment) => {
//       path += `/${segment}`;
//       if (isIdSegment(segment)) {
//         const parent = crumbs[crumbs.length - 1]?.label ?? "Record";
//         crumbs.push({ label: `${singular(parent)} Detail`, to: path });
//       } else {
//         crumbs.push({ label: ROUTE_LABELS[segment] ?? prettify(segment), to: path });
//       }
//     });

//     return crumbs;
//   }, [pathname]);
// };

// /* ------------------------------------------------------------------ */
// /* Sidebar contents (shared by the desktop rail and the mobile drawer) */
// /*                                                                     */
// /* Alignment: every row starts with a w-16 (64px) column that holds the */
// /* 40px tile dead centre. The rail is also 64px when collapsed, so the  */
// /* HR tile and all five icons land on the rail's centre line. Buttons   */
// /* carry BTN_RESET so no global padding can shift them.                */
// /* ------------------------------------------------------------------ */

// interface SidebarNavProps {
//   /** Mobile drawer keeps labels visible; the desktop rail reveals them on hover. */
//   alwaysExpanded?: boolean;
//   onNavigate?: () => void;
// }

// const SidebarNav: React.FC<SidebarNavProps> = ({ alwaysExpanded = false, onNavigate }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   /* Which section is currently active (auto-detect from path) */
//   const activeSectionIdx = NAV_SECTIONS.findIndex((s) =>
//     s.items.some((item) => location.pathname === item.route || location.pathname.startsWith(item.route + "/"))
//   );

//   /* Collapsed/expanded state per section — default: active section open */
//   const [openSections, setOpenSections] = useState<Record<number, boolean>>(() => {
//     const init: Record<number, boolean> = {};
//     NAV_SECTIONS.forEach((_, i) => {
//       init[i] = i === (activeSectionIdx >= 0 ? activeSectionIdx : 0);
//     });
//     return init;
//   });

//   const toggleSection = (idx: number) => {
//     setOpenSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
//   };

//   const labelClass = alwaysExpanded
//     ? "opacity-100"
//     : "opacity-0 group-hover:opacity-100";

//   const handleSignOut = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("user");
//     onNavigate?.();
//     navigate("/signup", { replace: true });
//   };

//   const ICON_COL = "absolute left-0 top-0 flex h-12 w-16 items-center justify-center";
//   const LABEL_COL =
//     "absolute left-16 right-3 top-0 flex h-12 items-center truncate whitespace-nowrap transition-opacity duration-200";

//   return (
//     <div className="flex h-full flex-col py-3">
//       {/* Brand */}
//       <div className="relative h-12 w-full shrink-0">
//         <span className={ICON_COL}>
//           <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white">
//             HR
//           </span>
//         </span>
//         <span
//           className={`${LABEL_COL} text-base font-semibold text-gray-900 ${labelClass}`}
//         >
//           HR Dashboard
//         </span>
//       </div>

//       {/* Sectioned navigation */}
//       <nav className="mt-4 flex-1 overflow-y-auto p-0">
//         {NAV_SECTIONS.map((section, sIdx) => {
//           const SectionIcon = section.icon;
//           const isOpen = openSections[sIdx] ?? false;
//           const sectionHasActive = section.items.some(
//             (item) => location.pathname === item.route || location.pathname.startsWith(item.route + "/")
//           );

//           return (
//             <div key={section.label} className={sIdx > 0 ? "mt-1" : ""}>
//               {/* Section header — acts as toggle */}
//               <button
//                 type="button"
//                 onClick={() => toggleSection(sIdx)}
//                 title={alwaysExpanded ? undefined : section.label}
//                 className={`${BTN_RESET} group/section relative block h-11 w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
//               >
//                 <span className="absolute left-0 top-0 flex h-11 w-16 items-center justify-center">
//                   <span
//                     className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200 ${
//                       sectionHasActive
//                         ? "bg-teal-600/10 text-teal-700"
//                         : "text-gray-400 group-hover/section:text-gray-700"
//                     }`}
//                   >
//                     <SectionIcon className="h-4.5 w-4.5" />
//                   </span>
//                 </span>
//                 <span
//                   className={`absolute left-16 right-3 top-0 flex h-11 items-center justify-between truncate whitespace-nowrap transition-opacity duration-200 ${labelClass}`}
//                 >
//                   <span
//                     className={`text-xs font-bold tracking-wide uppercase ${
//                       sectionHasActive ? "text-teal-700" : "text-gray-400"
//                     }`}
//                   >
//                     {section.label}
//                   </span>
//                   <ChevronDown
//                     className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${
//                       isOpen ? "rotate-0" : "-rotate-90"
//                     }`}
//                   />
//                 </span>
//               </button>

//               {/* Section items — collapsible */}
//               {isOpen && (
//                 <ul className="m-0 list-none p-0">
//                   {section.items.map((item) => {
//                     const Icon = item.icon;
//                     const isActive =
//                       location.pathname === item.route ||
//                       (item.route !== "/bd" && location.pathname.startsWith(item.route + "/"));

//                     return (
//                       <li key={item.route} className="m-0 list-none p-0">
//                         <button
//                           type="button"
//                           onClick={() => {
//                             navigate(item.route);
//                             onNavigate?.();
//                           }}
//                           title={alwaysExpanded ? undefined : item.name}
//                           aria-current={isActive ? "page" : undefined}
//                           className={`${BTN_RESET} group/item relative block h-10 w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
//                         >
//                           <span className="absolute left-0 top-0 flex h-10 w-16 items-center justify-center">
//                             <span
//                               className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 ${
//                                 isActive
//                                   ? "bg-teal-600 text-white shadow-sm"
//                                   : "text-gray-500 group-hover/item:bg-white group-hover/item:text-gray-900"
//                               }`}
//                             >
//                               <Icon className="h-4 w-4" />
//                             </span>
//                           </span>
//                           <span
//                             className={`absolute left-16 right-3 top-0 flex h-10 items-center truncate whitespace-nowrap text-[13px] font-medium transition-opacity duration-200 ${labelClass} ${
//                               isActive ? "text-teal-700" : "text-gray-600"
//                             }`}
//                           >
//                             {item.name}
//                           </span>
//                         </button>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               )}
//             </div>
//           );
//         })}
//       </nav>

//       {/* Sign out */}
//       <div className="mb-3 border-t border-gray-200" />
//       <button
//         type="button"
//         onClick={handleSignOut}
//         title={alwaysExpanded ? undefined : "Sign out"}
//         className={`${BTN_RESET} group/item relative block h-12 w-full shrink-0 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
//       >
//         <span className={ICON_COL}>
//           <span className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors duration-200 group-hover/item:bg-white group-hover/item:text-red-600">
//             <LogOut className="h-5 w-5" />
//           </span>
//         </span>
//         <span className={`${LABEL_COL} text-sm font-medium text-gray-600 ${labelClass}`}>
//           Sign out
//         </span>
//       </button>
//     </div>
//   );
// };

// /* ------------------------------------------------------------------ */
// /* Header = grey rail + grey top bar + inner corner                    */
// /* ------------------------------------------------------------------ */

// const Header: React.FC = () => {
//   const navigate = useNavigate();
//   const crumbs = useBreadcrumbs();
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);

//   // Redirect to signup if not logged in
//   // useEffect(() => {
//   //   if (!isLoggedIn()) {
//   //     navigate("/signup", { replace: true });
//   //   }
//   // }, [navigate]);

//   // Close the avatar menu on outside click
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Close the mobile drawer with Escape
//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === "Escape") setDrawerOpen(false);
//     };
//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, []);

//   const handleSignOut = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("user");
//     navigate("/signup", { replace: true });
//   };

//   return (
//     <>
//       {/* ---------------- Desktop rail: 64px, 240px on hover ------------------ */}
//       <aside
//         className="group fixed inset-y-0 left-0 z-40 hidden w-16 flex-col overflow-hidden bg-gray-100 transition-[width,box-shadow] duration-200 ease-out hover:w-60 hover:shadow-xl md:flex"
//         aria-label="Main navigation"
//       >
//         <SidebarNav />
//       </aside>

//       {/* ---------------- Mobile drawer --------------------------------------- */}
//       {drawerOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-gray-900/40 md:hidden"
//           onClick={() => setDrawerOpen(false)}
//           aria-hidden="true"
//         />
//       )}
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 transition-transform duration-200 ease-out md:hidden ${
//           drawerOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//         aria-label="Main navigation"
//         aria-hidden={!drawerOpen}
//       >
//         <button
//           type="button"
//           onClick={() => setDrawerOpen(false)}
//           className={`${BTN_RESET} absolute right-3 top-4 cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-white`}
//           aria-label="Close navigation"
//         >
//           <X className="h-5 w-5" />
//         </button>
//         <SidebarNav alwaysExpanded onNavigate={() => setDrawerOpen(false)} />
//       </aside>

//       {/* ---------------- Top bar + inner corner ------------------------------ */}
//       <header className="sticky top-0 z-30 bg-gray-100 md:ml-16">
//         <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
//           {/* Hamburger (mobile only) */}
//           <button
//             type="button"
//             onClick={() => setDrawerOpen(true)}
//             className={`${BTN_RESET} cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-white md:hidden`}
//             aria-label="Open navigation"
//           >
//             <Menu className="h-5 w-5" />
//           </button>

//           {/* Breadcrumb - where you are right now */}
//           <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
//             <ol className="m-0 flex list-none items-center gap-1 truncate p-0 text-sm">
//               {crumbs.map((crumb, index) => {
//                 const isLast = index === crumbs.length - 1;
//                 return (
//                   <li key={crumb.to} className="flex list-none items-center gap-1">
//                     {index > 0 && (
//                       <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
//                     )}
//                     {isLast ? (
//                       <span className="truncate font-semibold text-gray-900">
//                         {crumb.label}
//                       </span>
//                     ) : (
//                       <Link
//                         to={crumb.to}
//                         className="truncate text-gray-500 hover:text-gray-800"
//                       >
//                         {crumb.label}
//                       </Link>
//                     )}
//                   </li>
//                 );
//               })}
//             </ol>
//           </nav>

//           {/* Search - placeholder, remove this block if you don't need it yet */}
//           <div className="relative hidden lg:block lg:w-80">
//             <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//             <input
//               type="search"
//               placeholder="Search..."
//               className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
//             />
//           </div>

//           {/* Avatar + menu */}
//           <div className="relative shrink-0" ref={menuRef}>
//             <button
//               type="button"
//               onClick={() => setMenuOpen(!menuOpen)}
//               className={`${BTN_RESET} flex h-9 w-9 cursor-pointer items-center justify-center rounded-full !bg-teal-600 text-sm font-medium !text-white`}
//               aria-haspopup="menu"
//               aria-expanded={menuOpen}
//             >
//               JS
//             </button>

//             {menuOpen && (
//               <div className="absolute right-0 z-10 mt-2 w-40 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
//                 <button
//                   type="button"
//                   onClick={handleSignOut}
//                   className={`${BTN_RESET} w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100`}
//                 >
//                   Sign out
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* The inside corner. A 16px white strip whose top-left is rounded, so
//             the grey rail and grey top bar show through as a curve. It sits
//             flush against your page content, which is also white. */}
//         <div className="h-4 bg-white md:rounded-tl-2xl" aria-hidden="true" />
//       </header>
//     </>
//   );
// };

// export default Header;


import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Briefcase,
  Users,
  ClipboardCheck,
  Sparkles,
  MessageCircle,
  Menu,
  X,
  Search,
  LogOut,
  ChevronRight,
  ChevronDown,
  PhoneCall,
  Activity,
  BarChart3,
  Handshake,
  Building2,
  ClipboardList,
  FileBarChart,
  CalendarRange,
  Award,
  Mic2,
  Percent,
  UserPlus,
  Gift,
} from "lucide-react";

const BTN_RESET = "m-0 appearance-none border-0 bg-transparent p-0";

type NavItem = {
  name: string;
  route: string;
  icon: React.ComponentType<{ className?: string }>;
};

type NavSection = {
  label: string;
  route?: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavItem[];
};

const RECRUITMENT_ITEMS: NavItem[] = [
  {
    name: "Dashboard",
    route: "/pipeline-dashboard",
    icon: BarChart3,
  },
  {
    name: "Positions",
    route: "/position-management",
    icon: Briefcase,
  },
  {
    name: "Calling Tracker",
    route: "/calling-tracker",
    icon: PhoneCall,
  },
  {
    name: "Candidates",
    route: "/candidate-management",
    icon: Users,
  },
  {
    name: "Submissions",
    route: "/submission-management",
    icon: ClipboardCheck,
  },
  // {
  //   name: "Candidate Tracker",
  //   route: "/candidate-tracker",
  //   icon: Activity,
  // },
  {
    name: "AI Matcher",
    route: "/ai-matcher",
    icon: Sparkles,
  },
  {
    name: "WhatsApp Messages",
    route: "/whatsapp-tab",
    icon: MessageCircle,
  },
];

const BD_ITEM: NavItem = {
  name: "BD",
  route: "/bd/meetings",
  icon: Handshake,
};

const NAV_SECTIONS: NavSection[] = [
  {
    label: "CRM",
    route: "/crm",
    icon: Building2,
    items: [
      {
        name: "Client Details",
        route: "/crm",
        icon: Building2,
      },
      // {
      //   name: "Submissions",
      //   route: "/crm/submissions",
      //   icon: ClipboardList,
      // },
      {
        name: "Offers",
        route: "/crm/offers",
        icon: Gift,
      },
    ],
  },
  {
    label: "Reports",
    route: "/reports",
    icon: FileBarChart,
    items: [
      {
        name: "Submissions",
        route: "/reports",
        icon: ClipboardList,
      },
      {
        name: "Weekly Dashboard",
        route: "/reports/weekly-dashboard",
        icon: CalendarRange,
      },
      {
        name: "Performance",
        route: "/reports/performance",
        icon: Award,
      },
      {
        name: "Interviews",
        route: "/reports/interviews",
        icon: Mic2,
      },
      {
        name: "Closure Ratio",
        route: "/reports/closure-ratio",
        icon: Percent,
      },
      {
        name: "Yet to Join",
        route: "/reports/yet-to-join",
        icon: UserPlus,
      },
    ],
  },
];

const ROUTE_LABELS: Record<string, string> = {
  "pipeline-dashboard": "Pipeline Dashboard",
  "position-management": "Positions",
  "calling-tracker": "Calling Tracker",
  "candidate-management": "Candidates",
  "submission-management": "Submissions",
  "candidate-tracker": "Candidate Tracker",
  "ai-matcher": "AI Matcher",
  "whatsapp-tab": "WhatsApp Messages",
  bd: "Business Development",
  meetings: "Meetings",
  pipeline: "Pipeline",
  proposals: "Proposals",
  "follow-ups": "Follow-ups",
  clients: "Clients",
  reports: "Reports",
  "weekly-dashboard": "Weekly Dashboard",
  performance: "Performance",
  interviews: "Interviews",
  "closure-ratio": "Closure Ratio",
  "yet-to-join": "Yet to Join",
  create: "Create",
  edit: "Edit",
};

const isIdSegment = (segment: string) =>
  /^\d+$/.test(segment) ||
  /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(segment);

const prettify = (segment: string) =>
  segment
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const singular = (label: string) =>
  label.endsWith("s") ? label.slice(0, -1) : label;

type Crumb = {
  label: string;
  to: string;
};

const useBreadcrumbs = (): Crumb[] => {
  const { pathname } = useLocation();

  return useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const crumbs: Crumb[] = [];
    let path = "";

    segments.forEach((segment) => {
      path += `/${segment}`;

      if (isIdSegment(segment)) {
        const parent = crumbs[crumbs.length - 1]?.label ?? "Record";

        crumbs.push({
          label: `${singular(parent)} Detail`,
          to: path,
        });
      } else {
        crumbs.push({
          label: ROUTE_LABELS[segment] ?? prettify(segment),
          to: path,
        });
      }
    });

    return crumbs;
  }, [pathname]);
};

interface SidebarNavProps {
  alwaysExpanded?: boolean;
  onNavigate?: () => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({
  alwaysExpanded = false,
  onNavigate,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // ALL sections closed by default
  const [openSections, setOpenSections] =
    useState<Record<number, boolean>>({});

  const toggleSection = (idx: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const labelClass = alwaysExpanded
    ? "opacity-100"
    : "opacity-0 group-hover:opacity-100";

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    onNavigate?.();

    navigate("/signup", { replace: true });
  };

  const ICON_COL =
    "absolute left-0 top-0 flex h-12 w-16 items-center justify-center";

  const LABEL_COL =
    "absolute left-16 right-3 top-0 flex h-12 items-center truncate whitespace-nowrap transition-opacity duration-200";

  return (
    <div className="flex h-full flex-col py-3">
      {/* Brand */}
      <div className="relative h-12 w-full shrink-0">
        <span className={ICON_COL}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white">
            HR
          </span>
        </span>

        <span
          className={`${LABEL_COL} text-base font-semibold text-gray-900 ${labelClass}`}
        >
          HR Dashboard
        </span>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex-1 overflow-y-auto p-0">
        {/* Recruitment */}
        <ul className="m-0 list-none p-0">
          {RECRUITMENT_ITEMS.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.route ||
              location.pathname.startsWith(item.route + "/");

            return (
              <li
                key={item.route}
                className="m-0 list-none p-0"
              >
                <button
                  type="button"
                  onClick={() => {
                    navigate(item.route);
                    onNavigate?.();
                  }}
                  title={alwaysExpanded ? undefined : item.name}
                  aria-current={isActive ? "page" : undefined}
                  className={`${BTN_RESET} group/item relative block h-10 w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
                >
                  <span className="absolute left-0 top-0 flex h-10 w-16 items-center justify-center">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 ${
                        isActive
                          ? "bg-teal-600 text-white shadow-sm"
                          : "text-gray-500 group-hover/item:text-gray-900"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                  </span>

                  <span
                    className={`absolute left-16 right-3 top-0 flex h-10 items-center truncate whitespace-nowrap text-sm font-medium transition-opacity duration-200 ${labelClass} ${
                      isActive
                        ? "text-teal-700"
                        : "text-gray-600 group-hover/item:text-gray-900"
                    }`}
                  >
                    {item.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* BD */}
        <div>
          <button
            type="button"
            onClick={() => {
              navigate(BD_ITEM.route);
              onNavigate?.();
            }}
            title={alwaysExpanded ? undefined : BD_ITEM.name}
            aria-current={
              location.pathname === BD_ITEM.route ||
              location.pathname.startsWith(BD_ITEM.route + "/")
                ? "page"
                : undefined
            }
            className={`${BTN_RESET} group/item relative block h-10 w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
          >
            <span className="absolute left-0 top-0 flex h-10 w-16 items-center justify-center">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 ${
                  location.pathname === BD_ITEM.route ||
                  location.pathname.startsWith(BD_ITEM.route + "/")
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-gray-500 group-hover/item:text-gray-900"
                }`}
              >
                <BD_ITEM.icon className="h-4 w-4" />
              </span>
            </span>

            <span
              className={`absolute left-16 right-3 top-0 flex h-10 items-center truncate whitespace-nowrap text-sm font-medium transition-opacity duration-200 ${labelClass} ${
                location.pathname === BD_ITEM.route ||
                location.pathname.startsWith(BD_ITEM.route + "/")
                  ? "text-teal-700"
                  : "text-gray-600 group-hover/item:text-gray-900"
              }`}
            >
              {BD_ITEM.name}
            </span>
          </button>
        </div>

        {/* CRM / Reports */}
        {NAV_SECTIONS.map((section, sIdx) => {
          const SectionIcon = section.icon;
          const isOpen = openSections[sIdx] ?? false;

          const sectionHasActive = section.items.some(
            (item) =>
              location.pathname === item.route ||
              location.pathname.startsWith(item.route + "/")
          );

          const sectionIsActive =
            location.pathname === section.route ||
            location.pathname.startsWith(section.route + "/");

          return (
            <div key={section.label}>
              {/* Section */}
              <button
                type="button"
                onClick={() => toggleSection(sIdx)}
                className={`${BTN_RESET} group/section relative block h-10 w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
              >
                <span className="absolute left-0 top-0 flex h-10 w-16 items-center justify-center">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 ${
                      sectionHasActive || sectionIsActive
                        ? "bg-teal-600 text-white"
                        : "text-gray-500 group-hover/section:text-gray-900"
                    }`}
                  >
                    <SectionIcon className="h-4 w-4" />
                  </span>
                </span>

                <span
                  className={`absolute left-16 right-3 top-0 flex h-10 items-center justify-between truncate whitespace-nowrap text-sm font-medium transition-opacity duration-200 ${labelClass} ${
                    sectionHasActive || sectionIsActive
                      ? "text-gray-900"
                      : "text-gray-600"
                  }`}
                >
                  <span>{section.label}</span>

                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                </span>
              </button>

              {/* Sub-items */}
              {isOpen && (
                <ul className="m-0 list-none p-0">
                  {section.items.map((item) => {
                    const Icon = item.icon;

                    const isActive =
                      location.pathname === item.route ||
                      location.pathname.startsWith(item.route + "/");

                    return (
                      <li
                        key={item.route}
                        className="m-0 list-none p-0"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            navigate(item.route);
                            onNavigate?.();
                          }}
                          title={alwaysExpanded ? undefined : item.name}
                          aria-current={isActive ? "page" : undefined}
                          className={`${BTN_RESET} group/item relative block h-9 w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
                        >
                          <span className="absolute left-0 top-0 flex h-9 w-20 items-center justify-center pl-2">
                            <span
                              className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors duration-200 ${
                                isActive
                                  ? "bg-teal-600 text-white shadow-sm"
                                  : "text-gray-400 group-hover/item:bg-gray-200 group-hover/item:text-gray-900"
                              }`}
                            >
                              <Icon className="h-3.5 w-3.5" />
                            </span>
                          </span>

                          <span
                            className={`absolute left-20 right-3 top-0 flex h-9 items-center truncate whitespace-nowrap text-xs font-normal transition-opacity duration-200 ${labelClass} ${
                              isActive
                                ? "font-medium text-teal-700"
                                : "text-gray-500 group-hover/item:text-gray-700"
                            }`}
                          >
                            {item.name}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="mb-3 border-t border-gray-200" />

      <button
        type="button"
        onClick={handleSignOut}
        title={alwaysExpanded ? undefined : "Sign out"}
        className={`${BTN_RESET} group/item relative block h-12 w-full shrink-0 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500`}
      >
        <span className={ICON_COL}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors duration-200 group-hover/item:bg-white group-hover/item:text-red-600">
            <LogOut className="h-5 w-5" />
          </span>
        </span>

        <span
          className={`${LABEL_COL} text-sm font-medium text-gray-600 ${labelClass}`}
        >
          Sign out
        </span>
      </button>
    </div>
  );
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const crumbs = useBreadcrumbs();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    navigate("/signup", { replace: true });
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="group fixed inset-y-0 left-0 z-40 hidden w-16 flex-col overflow-hidden bg-gray-100 transition-[width,box-shadow] duration-200 ease-out hover:w-60 hover:shadow-xl md:flex"
        aria-label="Main navigation"
      >
        <SidebarNav />
      </aside>

      {/* Mobile overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/40 md:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 transition-transform duration-200 ease-out md:hidden ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Main navigation"
        aria-hidden={!drawerOpen}
      >
        <button
          type="button"
          onClick={() => setDrawerOpen(false)}
          className={`${BTN_RESET} absolute right-3 top-4 cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-white`}
          aria-label="Close navigation"
        >
          <X className="h-5 w-5" />
        </button>

        <SidebarNav
          alwaysExpanded
          onNavigate={() => setDrawerOpen(false)}
        />
      </aside>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-gray-100 md:ml-16">
        <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className={`${BTN_RESET} cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-white md:hidden`}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="min-w-0 flex-1"
          >
            <ol className="m-0 flex list-none items-center gap-1 truncate p-0 text-sm">
              {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;

                return (
                  <li
                    key={crumb.to}
                    className="flex list-none items-center gap-1"
                  >
                    {index > 0 && (
                      <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
                    )}

                    {isLast ? (
                      <span className="truncate font-semibold text-gray-900">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        to={crumb.to}
                        className="truncate text-gray-500 hover:text-gray-800"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Search */}
          <div className="relative hidden lg:block lg:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          {/* Profile */}
          <div
            className="relative shrink-0"
            ref={menuRef}
          >
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className={`${BTN_RESET} flex h-9 w-9 cursor-pointer items-center justify-center rounded-full !bg-teal-600 text-sm font-medium !text-white`}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              JS
            </button>

            {menuOpen && (
              <div className="absolute right-0 z-10 mt-2 w-40 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className={`${BTN_RESET} w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100`}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          className="h-4 bg-white md:rounded-tl-2xl"
          aria-hidden="true"
        />
      </header>
    </>
  );
};

export default Header;