// import {
//   ArrowLeft,
//   MapPin,
//   Briefcase,
//   Users,
//   FileText,
//   CalendarPlus,
//   Hash,
//   Pencil,
// } from "lucide-react";
// import { displayValue, formatDate, statusTone } from "../positions/Positionutils";

// const Meta = ({ icon: Icon, children }: any) => (
//   <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
//     <Icon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
//     {children}
//   </span>
// );

// const DetailHeader = ({
//   position,
//   activeTab,
//   onTabChange,
//   candidateCount,
//   onBack,
//   onEdit,
//   isEditing,
// }: any) => {
//   const filled = position.submittedCandidates?.length ?? 0;
//   const target = position.target || position.targetedResumes || 0;

//   const tabs = [
//     { id: "candidates", label: "Candidates", icon: Users, count: candidateCount },
//     { id: "information", label: "Information", icon: FileText },
//   ];

//   return (
//     <div className="bg-white border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
//         <div className="flex items-start gap-3">
//           <button
//             onClick={onBack}
//             className="w-8 h-8 mt-0.5 grid place-items-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 shrink-0"
//             aria-label="Back to positions"
//           >
//             <ArrowLeft className="w-4 h-4" />
//           </button>

//           <div className="min-w-0 flex-1">
//             <div className="flex flex-wrap items-center gap-2.5">
//               <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">
//                 {position.positionName}
//               </h1>
//               <span
//                 className={`inline-flex items-center h-6 px-2.5 rounded-full border text-xs font-medium ${statusTone(
//                   position.status
//                 )}`}
//               >
//                 {displayValue(position.status)}
//               </span>
//               {position.priority && (
//                 <span className="text-sm text-gray-500">
//                   {position.priority} priority
//                 </span>
//               )}
//             </div>

//             <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2">
//               <Meta icon={Hash}>{position.id}</Meta>
//               <Meta icon={Briefcase}>{displayValue(position.jobType)}</Meta>
//               <Meta icon={MapPin}>{displayValue(position.city)}</Meta>
//               <Meta icon={Users}>
//                 Filled:{" "}
//                 <span className="font-medium text-gray-700">
//                   {filled}/{target || "—"}
//                 </span>
//               </Meta>
//               <Meta icon={CalendarPlus}>
//                 Closes {formatDate(position.deadline)}
//               </Meta>
//             </div>
//           </div>

//           {!isEditing && (
//             <button
//               onClick={onEdit}
//               className="h-9 px-3.5 inline-flex items-center gap-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 shrink-0"
//             >
//               <Pencil className="w-3.5 h-3.5" />
//               <span className="hidden sm:inline">Edit position</span>
//             </button>
//           )}
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-6 mt-4 -mb-px">
//           {tabs.map((tab) => {
//             const active = activeTab === tab.id;
//             const Icon = tab.icon;
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => onTabChange(tab.id)}
//                 className={`inline-flex items-center gap-2 pb-3 border-b-2 text-sm font-medium transition ${
//                   active
//                     ? "border-emerald-600 text-emerald-700"
//                     : "border-transparent text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 <Icon className="w-4 h-4" />
//                 {tab.label}
//                 {tab.count !== undefined && (
//                   <span
//                     className={`min-w-[20px] h-5 px-1.5 grid place-items-center rounded-full text-xs font-medium ${
//                       active
//                         ? "bg-emerald-100 text-emerald-700"
//                         : "bg-gray-100 text-gray-500"
//                     }`}
//                   >
//                     {tab.count}
//                   </span>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailHeader;



// import { useState } from "react";
// import {
//   ArrowLeft,
//   ChevronLeft,
//   ChevronRight,
//   MapPin,
//   Briefcase,
//   Users,
//   FileText,
//   CalendarClock,
//   Share2,
//   Check,
//   Pencil,
// } from "lucide-react";
// import { displayValue, formatDate, statusTone } from "../positions/Positionutils";

// const Dot = () => <span className="text-gray-300">·</span>;

// const Meta = ({ icon: Icon, label, value }: any) => (
//   <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 whitespace-nowrap">
//     <Icon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
//     {label && <span>{label}</span>}
//     <span className="font-medium text-gray-700">{value}</span>
//   </span>
// );

// const IconButton = ({ icon: Icon, onClick, disabled, label }: any) => (
//   <button
//     type="button"
//     onClick={onClick}
//     disabled={disabled}
//     aria-label={label}
//     title={label}
//     className={`w-9 h-9 grid place-items-center rounded-full border transition ${
//       disabled
//         ? "border-gray-100 text-gray-300 cursor-not-allowed"
//         : "border-gray-200 text-gray-600 hover:bg-gray-50"
//     }`}
//   >
//     <Icon className="w-4 h-4" />
//   </button>
// );

// const DetailHeader = ({
//   position,
//   activeTab,
//   onTabChange,
//   candidateCount,
//   onBack,
//   onEdit,
//   isEditing,
//   onPrev,
//   onNext,
//   hasPrev,
//   hasNext,
// }: any) => {
//   const [copied, setCopied] = useState(false);

//   const handleShare = async () => {
//     try {
//       await navigator.clipboard.writeText(window.location.href);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch {
//       /* clipboard blocked — nothing useful to do here */
//     }
//   };

//   const tabs = [
//     { id: "information", label: "Information", icon: FileText },
//     {
//       id: "candidates",
//       label: "Candidates",
//       icon: Users,
//       count: candidateCount,
//     },
//   ];

//   return (
//     <div className="bg-white border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
//         <div className="flex items-start gap-3">
//           <button
//             onClick={onBack}
//             className="w-9 h-9 grid place-items-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 shrink-0"
//             aria-label="Back to positions"
//           >
//             <ArrowLeft className="w-4 h-4" />
//           </button>

//           <div className="min-w-0 flex-1">
//             {/* Title line */}
//             <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
//               <h1 className="text-xl font-bold text-gray-900 break-words">
//                 {position.positionName}
//               </h1>
//               <Dot />
//               <span className="text-base font-medium text-gray-600">
//                 {displayValue(position.clientName)}
//               </span>
//               <span
//                 className={`inline-flex items-center h-6 px-2.5 rounded-full border text-xs font-medium ${statusTone(
//                   position.status
//                 )}`}
//               >
//                 {displayValue(position.status)}
//               </span>
//             </div>

//             {/* Meta line */}
//             <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-1.5">
//               <span className="text-sm text-gray-500 whitespace-nowrap">
//                 ID:{" "}
//                 <span className="font-medium text-gray-700">
//                   #{position.id}
//                 </span>
//               </span>
//               <Dot />
//               <Meta icon={Briefcase} value={displayValue(position.jobType)} />
//               <Dot />
//               <Meta icon={MapPin} value={displayValue(position.city)} />
//               <Dot />
//               <Meta
//                 icon={CalendarClock}
//                 label="Deadline:"
//                 value={formatDate(position.deadline)}
//               />
//               <Dot />
//               <Meta icon={Users} label="Candidates:" value={candidateCount} />
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex items-center gap-2 shrink-0">
//             <div className="hidden sm:flex items-center gap-2">
//               <IconButton
//                 icon={ChevronLeft}
//                 onClick={onPrev}
//                 disabled={!hasPrev}
//                 label="Previous position"
//               />
//               <IconButton
//                 icon={ChevronRight}
//                 onClick={onNext}
//                 disabled={!hasNext}
//                 label="Next position"
//               />
//               <span className="w-px h-6 bg-gray-200" />
//               <IconButton
//                 icon={copied ? Check : Share2}
//                 onClick={handleShare}
//                 label={copied ? "Link copied" : "Copy link"}
//               />
//             </div>

//             {!isEditing && (
//               <button
//                 onClick={onEdit}
//                 className="h-9 px-3.5 inline-flex items-center gap-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 <Pencil className="w-3.5 h-3.5" />
//                 <span className="hidden sm:inline">Edit position</span>
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-6 mt-4 -mb-px">
//           {tabs.map((tab) => {
//             const active = activeTab === tab.id;
//             const Icon = tab.icon;
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => onTabChange(tab.id)}
//                 className={`inline-flex items-center gap-2 pb-3 border-b-2 text-sm font-medium transition ${
//                   active
//                     ? "border-emerald-600 text-emerald-700"
//                     : "border-transparent text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 <Icon className="w-4 h-4" />
//                 {tab.label}
//                 {tab.count !== undefined && (
//                   <span
//                     className={`min-w-[20px] h-5 px-1.5 grid place-items-center rounded-full text-xs font-medium ${
//                       active
//                         ? "bg-emerald-100 text-emerald-700"
//                         : "bg-gray-100 text-gray-500"
//                     }`}
//                   >
//                     {tab.count}
//                   </span>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailHeader;



import { useState } from "react";
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Briefcase,
    Users,
    FileText,
    CalendarClock,
    Share2,
    Pencil,
} from "lucide-react";
import { displayValue, formatDate, statusTone, daysRemaining } from "../positions/Positionutils";
import SharePositionModal from "../positions/Sharepositionmodal";

const Dot = () => <span className="text-gray-300">·</span>;

const Meta = ({ icon: Icon, label, value }: any) => (
    <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 whitespace-nowrap">
        <Icon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        {label && <span>{label}</span>}
        <span className="font-medium text-gray-700">{value}</span>
    </span>
);

const IconButton = ({ icon: Icon, onClick, disabled, label }: any) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        title={label}
        className={`w-9 h-9 grid place-items-center rounded-full border transition ${disabled
                ? "border-gray-100 text-gray-300 cursor-not-allowed"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
    >
        <Icon className="w-4 h-4" />
    </button>
);

const DetailHeader = ({
    position,
    activeTab,
    onTabChange,
    candidateCount,
    onBack,
    onEdit,
    isEditing,
    onPrev,
    onNext,
    hasPrev,
    hasNext,
}: any) => {
    const [shareOpen, setShareOpen] = useState(false);
    const remaining = daysRemaining(position.deadline);

    const tabs = [
        { id: "information", label: "Information", icon: FileText },
        {
            id: "candidates",
            label: "Candidates",
            icon: Users,
            count: candidateCount,
        },
    ];

    return (
        <div className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
                <div className="flex items-start gap-3">
                    <button
                        onClick={onBack}
                        className="w-9 h-9 grid place-items-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 shrink-0"
                        aria-label="Back to positions"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>

                    <div className="min-w-0 flex-1">
                        {/* Title line */}
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                            <span
                                role="heading"
                                aria-level={1}
                                className="text-lg font-semibold text-gray-900 leading-5 break-words"
                            >
                                {position.positionName}
                            </span>
                            <Dot />
                            <span className="text-sm font-medium text-gray-600">
                                {displayValue(position.clientName)}
                            </span>
                            <span
                                className={`inline-flex items-center h-6 px-2.5 rounded-full border text-xs font-medium ${statusTone(
                                    position.status
                                )}`}
                            >
                                {displayValue(position.status)}
                            </span>
                        </div>

                        {/* Meta line */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-1.5">
                            <span className="text-sm text-gray-500 whitespace-nowrap">
                                ID:{" "}
                                <span className="font-medium text-gray-700">
                                    #{position.id}
                                </span>
                            </span>
                            <Dot />
                            <Meta icon={Briefcase} value={displayValue(position.jobType)} />
                            <Dot />
                            <Meta icon={MapPin} value={displayValue(position.city)} />
                            <Dot />
                            <Meta
                                icon={CalendarClock}
                                label="Deadline:"
                                value={formatDate(position.deadline)}
                            />
                            {remaining !== null && (
                                <span
                                    className={`inline-flex items-center h-5 px-2 rounded-full text-xs font-medium ${remaining < 0
                                            ? "bg-red-50 text-red-700"
                                            : remaining <= 7
                                                ? "bg-amber-50 text-amber-700"
                                                : "bg-emerald-50 text-emerald-700"
                                        }`}
                                >
                                    {remaining < 0
                                        ? `${Math.abs(remaining)}d overdue`
                                        : `${remaining}d left`}
                                </span>
                            )}
                            <Dot />
                            <Meta icon={Users} label="Candidates:" value={candidateCount} />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="hidden sm:flex items-center gap-2">
                            <IconButton
                                icon={ChevronLeft}
                                onClick={onPrev}
                                disabled={!hasPrev}
                                label="Previous position"
                            />
                            <IconButton
                                icon={ChevronRight}
                                onClick={onNext}
                                disabled={!hasNext}
                                label="Next position"
                            />
                            <span className="w-px h-6 bg-gray-200" />
                            <IconButton
                                icon={Share2}
                                onClick={() => setShareOpen(true)}
                                label="Share this position"
                            />
                        </div>

                        {!isEditing && (
                            <button
                                onClick={onEdit}
                                className="h-9 px-3.5 inline-flex items-center gap-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <Pencil className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Edit position</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-6 mt-4 -mb-px">
                    {tabs.map((tab) => {
                        const active = activeTab === tab.id;
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={`inline-flex items-center gap-2 pb-3 border-b-2 text-sm font-medium transition ${active
                                        ? "border-emerald-600 text-emerald-700"
                                        : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                                {tab.count !== undefined && (
                                    <span
                                        className={`min-w-[20px] h-5 px-1.5 grid place-items-center rounded-full text-xs font-medium ${active
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-gray-100 text-gray-500"
                                            }`}
                                    >
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            <SharePositionModal
                open={shareOpen}
                onClose={() => setShareOpen(false)}
                position={position}
            />
        </div>
    );
};

export default DetailHeader;