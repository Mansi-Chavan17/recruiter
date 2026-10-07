// import {
//   Info,
//   Building2,
//   Layers,
//   GraduationCap,
//   Briefcase,
//   Wallet,
//   MapPin,
//   Clock,
//   UserCheck,
//   Users,
//   Target,
//   Sparkles,
//   Factory,
//   CalendarClock,
//   Link2,
// } from "lucide-react";
// import {
//   displayValue,
//   formatDate,
//   daysRemaining,
// } from "../positions/Positionutils";

// /* ---------- small building blocks ---------- */

// const Card = ({ title, icon: Icon, action = null, children }: any) => (
//   <div className="bg-white rounded-xl border border-gray-100 p-5">
//     {title && (
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900">
//           {Icon && <Icon className="w-4 h-4 text-emerald-600" />}
//           {title}
//         </h3>
//         {action}
//       </div>
//     )}
//     {children}
//   </div>
// );

// const KeyValue = ({ icon: Icon, label, children }: any) => (
//   <div className="flex items-start gap-3 py-2">
//     <Icon className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
//     <span className="text-sm text-gray-500 w-28 shrink-0">{label}</span>
//     <span className="text-sm text-gray-900 min-w-0 break-words flex-1">
//       {children}
//     </span>
//   </div>
// );

// const PrefTile = ({ icon: Icon, label, value }: any) => (
//   <div className="flex items-center gap-3 min-w-0">
//     <span className="w-9 h-9 rounded-full bg-emerald-50 grid place-items-center shrink-0">
//       <Icon className="w-4 h-4 text-emerald-600" />
//     </span>
//     <span className="min-w-0">
//       <span className="block text-xs text-gray-500">{label}</span>
//       <span className="block text-sm font-medium text-gray-900 truncate">
//         {value}
//       </span>
//     </span>
//   </div>
// );

// /* ---------- tab ---------- */

// const InformationTab = ({ position }: any) => {
//   const remaining = daysRemaining(position.deadline);
//   const total = 30;
//   const progress =
//     remaining === null
//       ? 0
//       : Math.max(0, Math.min(100, ((total - remaining) / total) * 100));

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//       {/* ---------------- main column ---------------- */}
//       <div className="lg:col-span-2 space-y-5">
//         <div className="rounded-xl border border-emerald-100 overflow-hidden">
//           <p className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50/70 text-xs text-emerald-900">
//             <Info className="w-3.5 h-3.5 shrink-0" />
//             These preferences are for internal sourcing only and are never shown
//             to candidates.
//           </p>
//           <div className="bg-white p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
//             <PrefTile
//               icon={Factory}
//               label="Preferred industry"
//               value={displayValue(position.preferredIndustry)}
//             />
//             <PrefTile
//               icon={Building2}
//               label="Preferred companies"
//               value={displayValue(position.preferredCompanies)}
//             />
//             <PrefTile
//               icon={Sparkles}
//               label="Diversity preference"
//               value={displayValue(position.diversityPreference)}
//             />
//             <PrefTile
//               icon={Target}
//               label="Target hires"
//               value={displayValue(position.target)}
//             />
//           </div>
//         </div>

//         <Card title="Role description" icon={Layers}>
//           {position.roleDescription ? (
//             <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
//               {position.roleDescription}
//             </div>
//           ) : (
//             <p className="text-sm text-gray-400">
//               No description added yet. Use Edit position to write one.
//             </p>
//           )}
//         </Card>
//       </div>

//       {/* ---------------- sidebar ---------------- */}
//       <div className="space-y-5">
//         <Card title="Timeline" icon={CalendarClock}>
//           <KeyValue icon={CalendarClock} label="Deadline">
//             {formatDate(position.deadline)}
//           </KeyValue>

//           {remaining !== null && (
//             <div className="mt-3">
//               <div className="flex items-center justify-between mb-1.5">
//                 <span className="text-sm text-gray-500">
//                   {remaining < 0 ? "Overdue by" : "Days remaining"}
//                 </span>
//                 <span
//                   className={`text-sm font-medium ${
//                     remaining < 0
//                       ? "text-red-600"
//                       : remaining <= 7
//                       ? "text-amber-600"
//                       : "text-emerald-700"
//                   }`}
//                 >
//                   {Math.abs(remaining)} days
//                 </span>
//               </div>
//               <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
//                 <div
//                   className={`h-full rounded-full ${
//                     remaining < 0
//                       ? "bg-red-500"
//                       : remaining <= 7
//                       ? "bg-amber-500"
//                       : "bg-emerald-500"
//                   }`}
//                   style={{ width: `${remaining < 0 ? 100 : progress}%` }}
//                 />
//               </div>
//             </div>
//           )}
//         </Card>

//         <Card title="Job detail" icon={Briefcase}>
//           <div className="divide-y divide-gray-50">
//             <KeyValue icon={Building2} label="Client">
//               {displayValue(position.clientName)}
//             </KeyValue>
//             <KeyValue icon={Layers} label="Function">
//               {displayValue(position.function)}
//             </KeyValue>
//             <KeyValue icon={Briefcase} label="Role">
//               {displayValue(position.role)}
//             </KeyValue>
//             <KeyValue icon={GraduationCap} label="Education">
//               {displayValue(position.education)}
//             </KeyValue>
//             <KeyValue icon={Clock} label="Experience">
//               {displayValue(position.experience)}
//             </KeyValue>
//             <KeyValue icon={Briefcase} label="Role type">
//               {displayValue(position.roleType)}
//             </KeyValue>
//             <KeyValue icon={Wallet} label="CTC budget">
//               {displayValue(position.ctcBudget)}
//             </KeyValue>
//             <KeyValue icon={Wallet} label="CTC structure">
//               {displayValue(position.ctcStructure)}
//             </KeyValue>
//             <KeyValue icon={MapPin} label="Workplace">
//               {displayValue(position.workplaceType)}
//             </KeyValue>
//             <KeyValue icon={MapPin} label="Location">
//               {displayValue(position.city)}
//             </KeyValue>
//             <KeyValue icon={Users} label="Reportees">
//               {displayValue(position.reportees)}
//             </KeyValue>
//           </div>
//         </Card>

//         <Card title="Interview process" icon={UserCheck}>
//           <div className="divide-y divide-gray-50">
//             <KeyValue icon={Layers} label="Rounds">
//               {displayValue(position.rounds)}
//             </KeyValue>
//             <KeyValue icon={UserCheck} label="Interviewer">
//               {displayValue(position.interviewerName)}
//             </KeyValue>
//             <KeyValue icon={Briefcase} label="Mode">
//               {displayValue(position.interviewMode)}
//             </KeyValue>
//             <KeyValue icon={Link2} label="LinkedIn">
//               {position.linkedIn ? (
//                 <a
//                   href={`https://${String(position.linkedIn).replace(
//                     /^https?:\/\//,
//                     ""
//                   )}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-emerald-700 hover:underline"
//                 >
//                   View profile
//                 </a>
//               ) : (
//                 "N/A"
//               )}
//             </KeyValue>
//           </div>
//         </Card>

//         <Card title="Contacts" icon={Users}>
//           <div className="divide-y divide-gray-50">
//             <KeyValue icon={UserCheck} label="Recruiter">
//               {displayValue(position.recruiter)}
//             </KeyValue>
//             <KeyValue icon={Building2} label="Client SPOC">
//               {displayValue(position.clientSpoc)}
//             </KeyValue>
//             <KeyValue icon={Users} label="Laksh SPOC">
//               {displayValue(position.lakshSpoc)}
//             </KeyValue>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default InformationTab;



// import {
//   Info,
//   Building2,
//   Layers,
//   GraduationCap,
//   Briefcase,
//   Wallet,
//   MapPin,
//   Clock,
//   UserCheck,
//   Users,
//   Target,
//   Sparkles,
//   Factory,
//   CalendarClock,
//   Link2,
//   FileText,
// } from "lucide-react";
// import { displayValue, formatDate, daysRemaining } from "../positions/Positionutils";

// /* ---------- building blocks ---------- */

// const Card = ({ title, icon: Icon, children, className = "" }: any) => (
//   <div className={`bg-white rounded-xl border border-gray-100 p-5 ${className}`}>
//     {title && (
//       <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-4">
//         {Icon && <Icon className="w-4 h-4 text-emerald-600" />}
//         {title}
//       </h3>
//     )}
//     {children}
//   </div>
// );

// const KeyValue = ({ icon: Icon, label, children }: any) => (
//   <div className="flex items-start gap-3 py-2">
//     <Icon className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
//     <span className="text-sm text-gray-500 w-28 shrink-0">{label}</span>
//     <span className="text-sm text-gray-900 min-w-0 break-words flex-1">
//       {children}
//     </span>
//   </div>
// );

// /** Big-number tile for the facts a recruiter checks first. */
// const Highlight = ({ icon: Icon, label, value }: any) => (
//   <div className="p-4 rounded-lg border border-gray-100 bg-gray-50/50">
//     <span className="flex items-center gap-1.5 text-xs text-gray-500">
//       <Icon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
//       {label}
//     </span>
//     <p
//       className="mt-1.5 text-sm font-semibold text-gray-900 break-words"
//       title={value}
//     >
//       {value}
//     </p>
//   </div>
// );

// const PrefRow = ({ icon: Icon, label, value }: any) => (
//   <div className="flex items-start gap-3 py-2.5">
//     <span className="w-8 h-8 rounded-full bg-emerald-50 grid place-items-center shrink-0">
//       <Icon className="w-3.5 h-3.5 text-emerald-600" />
//     </span>
//     <span className="min-w-0">
//       <span className="block text-xs text-gray-500">{label}</span>
//       <span className="block text-sm font-medium text-gray-900 break-words">
//         {value}
//       </span>
//     </span>
//   </div>
// );

// /* ---------- tab ---------- */

// const InformationTab = ({ position }: any) => {
//   const remaining = daysRemaining(position.deadline);
//   const window = 30;
//   const progress =
//     remaining === null
//       ? 0
//       : Math.max(0, Math.min(100, ((window - remaining) / window) * 100));

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//       {/* ---------------- main column ---------------- */}
//       <div className="lg:col-span-2 space-y-5">
//         <Card title="At a glance" icon={Sparkles}>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//             <Highlight
//               icon={Wallet}
//               label="CTC budget"
//               value={displayValue(position.ctcBudget)}
//             />
//             <Highlight
//               icon={Clock}
//               label="Experience"
//               value={displayValue(position.experience)}
//             />
//             <Highlight
//               icon={Layers}
//               label="Function"
//               value={displayValue(position.function)}
//             />
//             <Highlight
//               icon={Briefcase}
//               label="Role"
//               value={displayValue(position.role)}
//             />
//             <Highlight
//               icon={GraduationCap}
//               label="Education"
//               value={displayValue(position.education)}
//             />
//             <Highlight
//               icon={MapPin}
//               label="Workplace"
//               value={displayValue(position.workplaceType)}
//             />
//           </div>
//         </Card>

//         <Card title="Role description" icon={FileText}>
//           {position.roleDescription ? (
//             <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
//               {position.roleDescription}
//             </div>
//           ) : (
//             <p className="text-sm text-gray-400">
//               No description added yet. Use Edit position to write one.
//             </p>
//           )}
//         </Card>
//       </div>

//       {/* ---------------- sidebar ---------------- */}
//       <div className="space-y-5">
//         <Card title="Timeline" icon={CalendarClock}>
//           <KeyValue icon={CalendarClock} label="Deadline">
//             {formatDate(position.deadline)}
//           </KeyValue>

//           {remaining !== null && (
//             <div className="mt-3">
//               <div className="flex items-center justify-between mb-1.5">
//                 <span className="text-sm text-gray-500">
//                   {remaining < 0 ? "Overdue by" : "Days remaining"}
//                 </span>
//                 <span
//                   className={`text-sm font-medium ${
//                     remaining < 0
//                       ? "text-red-600"
//                       : remaining <= 7
//                       ? "text-amber-600"
//                       : "text-emerald-700"
//                   }`}
//                 >
//                   {Math.abs(remaining)} days
//                 </span>
//               </div>
//               <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
//                 <div
//                   className={`h-full rounded-full ${
//                     remaining < 0
//                       ? "bg-red-500"
//                       : remaining <= 7
//                       ? "bg-amber-500"
//                       : "bg-emerald-500"
//                   }`}
//                   style={{ width: `${remaining < 0 ? 100 : progress}%` }}
//                 />
//               </div>
//             </div>
//           )}
//         </Card>

//         <Card title="Job detail" icon={Briefcase}>
//           <div className="divide-y divide-gray-50">
//             <KeyValue icon={Building2} label="Client">
//               {displayValue(position.clientName)}
//             </KeyValue>
//             <KeyValue icon={Briefcase} label="Job type">
//               {displayValue(position.jobType)}
//             </KeyValue>
//             <KeyValue icon={Briefcase} label="Role type">
//               {displayValue(position.roleType)}
//             </KeyValue>
//             <KeyValue icon={Wallet} label="CTC structure">
//               {displayValue(position.ctcStructure)}
//             </KeyValue>
//             <KeyValue icon={MapPin} label="Location">
//               {displayValue(position.city)}
//             </KeyValue>
//             <KeyValue icon={Users} label="Reportees">
//               {displayValue(position.reportees)}
//             </KeyValue>
//             <KeyValue icon={Target} label="Target hires">
//               {displayValue(position.target)}
//             </KeyValue>
//           </div>
//         </Card>

//         <Card title="Interview process" icon={UserCheck}>
//           <div className="divide-y divide-gray-50">
//             <KeyValue icon={Layers} label="Rounds">
//               {displayValue(position.rounds)}
//             </KeyValue>
//             <KeyValue icon={UserCheck} label="Interviewer">
//               {displayValue(position.interviewerName)}
//             </KeyValue>
//             <KeyValue icon={Briefcase} label="Mode">
//               {displayValue(position.interviewMode)}
//             </KeyValue>
//             <KeyValue icon={Link2} label="LinkedIn">
//               {position.linkedIn ? (
//                 <a
//                   href={`https://${String(position.linkedIn).replace(
//                     /^https?:\/\//,
//                     ""
//                   )}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-emerald-700 hover:underline"
//                 >
//                   View profile
//                 </a>
//               ) : (
//                 "N/A"
//               )}
//             </KeyValue>
//           </div>
//         </Card>

//         <Card title="Contacts" icon={Users}>
//           <div className="divide-y divide-gray-50">
//             <KeyValue icon={UserCheck} label="Recruiter">
//               {displayValue(position.recruiter)}
//             </KeyValue>
//             <KeyValue icon={Building2} label="Client SPOC">
//               {displayValue(position.clientSpoc)}
//             </KeyValue>
//             <KeyValue icon={Users} label="Laksh SPOC">
//               {displayValue(position.lakshSpoc)}
//             </KeyValue>
//           </div>
//         </Card>

//         {/* Internal-only sourcing preferences */}
//         <div className="rounded-xl border border-emerald-100 overflow-hidden">
//           <p className="flex items-start gap-2 px-4 py-2.5 bg-emerald-50/70 text-xs leading-relaxed text-emerald-900">
//             <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
//             Internal sourcing only — never shown to candidates.
//           </p>
//           <div className="bg-white p-4 divide-y divide-gray-50">
//             <PrefRow
//               icon={Factory}
//               label="Preferred industry"
//               value={displayValue(position.preferredIndustry)}
//             />
//             <PrefRow
//               icon={Building2}
//               label="Preferred companies"
//               value={displayValue(position.preferredCompanies)}
//             />
//             <PrefRow
//               icon={Sparkles}
//               label="Diversity preference"
//               value={displayValue(position.diversityPreference)}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InformationTab;


import {
  Info,
  Building2,
  Layers,
  GraduationCap,
  Briefcase,
  Wallet,
  MapPin,
  Clock,
  UserCheck,
  Users,
  Target,
  Sparkles,
  Factory,
  Link2,
  FileText,
} from "lucide-react";
import { displayValue } from "../positions/Positionutils";

/* ---------- building blocks ---------- */

const Card = ({ title, icon: Icon, children, className = "" }: any) => (
  <div className={`bg-white rounded-xl border border-gray-100 p-5 ${className}`}>
    {title && (
      <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-4">
        {Icon && <Icon className="w-4 h-4 text-emerald-600" />}
        {title}
      </h3>
    )}
    {children}
  </div>
);

const KeyValue = ({ icon: Icon, label, children }: any) => (
  <div className="flex items-start gap-3 py-2">
    <Icon className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
    <span className="text-sm text-gray-500 w-28 shrink-0">{label}</span>
    <span className="text-sm text-gray-900 min-w-0 break-words flex-1">
      {children}
    </span>
  </div>
);

/** Big-number tile for the facts a recruiter checks first. */
const Highlight = ({ icon: Icon, label, value }: any) => (
  <div className="p-3 rounded-lg border border-gray-100 bg-gray-50/50">
    <span className="flex items-center gap-1.5 text-xs text-gray-500">
      <Icon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
      {label}
    </span>
    <p
      className="mt-1.5 text-sm font-semibold text-gray-900 break-words"
      title={value}
    >
      {value}
    </p>
  </div>
);

const PrefRow = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-start gap-3 py-2.5">
    <span className="w-8 h-8 rounded-full bg-emerald-50 grid place-items-center shrink-0">
      <Icon className="w-3.5 h-3.5 text-emerald-600" />
    </span>
    <span className="min-w-0">
      <span className="block text-xs text-gray-500">{label}</span>
      <span className="block text-sm font-medium text-gray-900 break-words">
        {value}
      </span>
    </span>
  </div>
);

/* ---------- tab ---------- */

const InformationTab = ({ position }: any) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* ---------------- main column ---------------- */}
      <div className="lg:col-span-2 space-y-5">
        <Card title="At a glance" icon={Sparkles}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Highlight
              icon={Wallet}
              label="CTC budget"
              value={displayValue(position.ctcBudget)}
            />
            <Highlight
              icon={Clock}
              label="Experience"
              value={displayValue(position.experience)}
            />
            <Highlight
              icon={Layers}
              label="Function"
              value={displayValue(position.function)}
            />
            <Highlight
              icon={Briefcase}
              label="Role"
              value={displayValue(position.role)}
            />
            <Highlight
              icon={GraduationCap}
              label="Education"
              value={displayValue(position.education)}
            />
            <Highlight
              icon={MapPin}
              label="Workplace"
              value={displayValue(position.workplaceType)}
            />
          </div>
        </Card>

        <Card title="Role description" icon={FileText}>
          {position.roleDescription ? (
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {position.roleDescription}
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              No description added yet. Use Edit position to write one.
            </p>
          )}
        </Card>
      </div>

      {/* ---------------- sidebar ---------------- */}
      <div className="space-y-5">
        <Card title="Job detail" icon={Briefcase}>
          <div className="divide-y divide-gray-50">
            <KeyValue icon={Building2} label="Client">
              {displayValue(position.clientName)}
            </KeyValue>
            <KeyValue icon={Briefcase} label="Job type">
              {displayValue(position.jobType)}
            </KeyValue>
            <KeyValue icon={Briefcase} label="Role type">
              {displayValue(position.roleType)}
            </KeyValue>
            <KeyValue icon={Wallet} label="CTC structure">
              {displayValue(position.ctcStructure)}
            </KeyValue>
            <KeyValue icon={MapPin} label="Location">
              {displayValue(position.city)}
            </KeyValue>
            <KeyValue icon={Users} label="Reportees">
              {displayValue(position.reportees)}
            </KeyValue>
            <KeyValue icon={Target} label="Target hires">
              {displayValue(position.target)}
            </KeyValue>
          </div>
        </Card>

        <Card title="Interview process" icon={UserCheck}>
          <div className="divide-y divide-gray-50">
            <KeyValue icon={Layers} label="Rounds">
              {displayValue(position.rounds)}
            </KeyValue>
            <KeyValue icon={UserCheck} label="Interviewer">
              {displayValue(position.interviewerName)}
            </KeyValue>
            <KeyValue icon={Briefcase} label="Mode">
              {displayValue(position.interviewMode)}
            </KeyValue>
            <KeyValue icon={Link2} label="LinkedIn">
              {position.linkedIn ? (
                <a
                  href={`https://${String(position.linkedIn).replace(
                    /^https?:\/\//,
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:underline"
                >
                  View profile
                </a>
              ) : (
                "N/A"
              )}
            </KeyValue>
          </div>
        </Card>

        <Card title="Contacts" icon={Users}>
          <div className="divide-y divide-gray-50">
            <KeyValue icon={UserCheck} label="Recruiter">
              {displayValue(position.recruiter)}
            </KeyValue>
            <KeyValue icon={Building2} label="Client SPOC">
              {displayValue(position.clientSpoc)}
            </KeyValue>
            <KeyValue icon={Users} label="Laksh SPOC">
              {displayValue(position.lakshSpoc)}
            </KeyValue>
          </div>
        </Card>

        {/* Internal-only sourcing preferences */}
        <div className="rounded-xl border border-emerald-100 overflow-hidden">
          <p className="flex items-start gap-2 px-4 py-2.5 bg-emerald-50/70 text-xs leading-relaxed text-emerald-900">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            Internal sourcing only — never shown to candidates.
          </p>
          <div className="bg-white p-4 divide-y divide-gray-50">
            <PrefRow
              icon={Factory}
              label="Preferred industry"
              value={displayValue(position.preferredIndustry)}
            />
            <PrefRow
              icon={Building2}
              label="Preferred companies"
              value={displayValue(position.preferredCompanies)}
            />
            <PrefRow
              icon={Sparkles}
              label="Diversity preference"
              value={displayValue(position.diversityPreference)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationTab;