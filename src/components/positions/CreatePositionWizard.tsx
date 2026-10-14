// import { useState } from "react";
// import { X, FileText, Wallet, Users, ArrowLeft, Loader2 } from "lucide-react";
// import StepRail, { type Step } from "./StepRail";
// import JobInformationStep from "./steps/JobInformationStep";
// import RoleAndPayStep from "./steps/RoleAndPayStep";
// import HiringProcessStep from "./steps/HiringProcessStep";
// import {
//   emptyPosition,
//   missingFields,
//   buildCreatePayload,
//   type PositionForm,
// } from "./positionForm";

// const STEPS: Step[] = [
//   {
//     id: "job",
//     title: "Job information",
//     description: "Who the client is and what the role is.",
//     icon: FileText,
//   },
//   {
//     id: "pay",
//     title: "Role & pay",
//     description: "The description, budget and location.",
//     icon: Wallet,
//   },
//   {
//     id: "process",
//     title: "Hiring process",
//     description: "Interviews, preferences and AI matching.",
//     icon: Users,
//   },
// ];

// const CreatePositionWizard = ({
//   open,
//   onClose,
//   onCreate,
//   recruiter,
//   clientOptions = [],
//   functionOptions = [],
//   roleOptions = [],
//   educationOptions = [],
//   cityOptions = [],
// }: {
//   open: boolean;
//   onClose: () => void;
//   onCreate: (payload: any) => Promise<boolean>;
//   recruiter: string;
//   clientOptions?: any[];
//   functionOptions?: any[];
//   roleOptions?: any[];
//   educationOptions?: any[];
//   cityOptions?: any[];
// }) => {
//   const [form, setForm] = useState<PositionForm>(() =>
//     emptyPosition(recruiter)
//   );
//   const [stepIndex, setStepIndex] = useState(0);
//   const [furthest, setFurthest] = useState(0);
//   const [submitting, setSubmitting] = useState(false);
//   const [showErrors, setShowErrors] = useState(false);

//   if (!open) return null;

//   const set = (field: string, value: any) =>
//     setForm((prev) => ({ ...prev, [field]: value }));

//   const toggle = (field: string, value: string) =>
//     setForm((prev: any) => {
//       const current: string[] = prev[field] || [];
//       return {
//         ...prev,
//         [field]: current.includes(value)
//           ? current.filter((item) => item !== value)
//           : [...current, value],
//       };
//     });

//   const blocking = missingFields(form, stepIndex);
//   const isLastStep = stepIndex === STEPS.length - 1;

//   const reset = () => {
//     setForm(emptyPosition(recruiter));
//     setStepIndex(0);
//     setFurthest(0);
//     setShowErrors(false);
//   };

//   const handleClose = () => {
//     reset();
//     onClose();
//   };

//   const goTo = (index: number) => {
//     setShowErrors(false);
//     setStepIndex(index);
//     setFurthest((prev) => Math.max(prev, index));
//   };

//   const handleNext = () => {
//     if (blocking.length) {
//       setShowErrors(true);
//       return;
//     }
//     goTo(stepIndex + 1);
//   };

//   const handleSubmit = async () => {
//     if (missingFields(form, 0).length) {
//       setShowErrors(true);
//       setStepIndex(0);
//       return;
//     }
//     setSubmitting(true);
//     try {
//       const created = await onCreate(buildCreatePayload(form, recruiter));
//       if (created) {
//         reset();
//         onClose();
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const stepProps = { form, set, toggle };

//   return (
//     <div className="fixed inset-0 z-50 bg-gray-900/50 flex items-end sm:items-center justify-center sm:p-6">
//       <div className="bg-gray-50 w-full sm:max-w-6xl h-[94vh] sm:h-[90vh] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="shrink-0 flex items-center gap-3 px-4 sm:px-6 py-3.5 bg-white border-b border-gray-100">
//           <button
//             type="button"
//             onClick={handleClose}
//             className="w-8 h-8 grid place-items-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 shrink-0"
//             aria-label="Close"
//           >
//             <X className="w-4 h-4" />
//           </button>
//           <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
//             Create new position
//           </h2>

//           <div className="ml-auto flex items-center gap-2">
//             {stepIndex > 0 && (
//               <button
//                 type="button"
//                 onClick={() => goTo(stepIndex - 1)}
//                 className="hidden sm:inline-flex h-9 px-3.5 items-center gap-1.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 <ArrowLeft className="w-3.5 h-3.5" />
//                 Back
//               </button>
//             )}
//             {!isLastStep ? (
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="h-9 px-5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={submitting}
//                 className="h-9 px-5 inline-flex items-center gap-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:bg-emerald-300"
//               >
//                 {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
//                 {submitting ? "Creating..." : "Create position"}
//               </button>
//             )}
//           </div>
//         </header>

//         {/* Body */}
//         <div className="flex-1 overflow-y-auto">
//           <div className="flex gap-6 p-4 sm:p-6 max-w-6xl mx-auto">
//             <StepRail
//               steps={STEPS}
//               activeIndex={stepIndex}
//               furthestVisited={furthest}
//               onStepClick={goTo}
//             />

//             <div className="flex-1 min-w-0">
//               {showErrors && blocking.length > 0 && (
//                 <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700">
//                   Fill in {blocking.join(" and ")} before continuing.
//                 </div>
//               )}

//               <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-7">
//                 {stepIndex === 0 && (
//                   <JobInformationStep
//                     {...stepProps}
//                     clientOptions={clientOptions}
//                     functionOptions={functionOptions}
//                     roleOptions={roleOptions}
//                     educationOptions={educationOptions}
//                   />
//                 )}
//                 {stepIndex === 1 && (
//                   <RoleAndPayStep {...stepProps} cityOptions={cityOptions} />
//                 )}
//                 {stepIndex === 2 && <HiringProcessStep {...stepProps} />}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile footer nav */}
//         <footer className="sm:hidden shrink-0 flex gap-3 px-4 py-3 bg-white border-t border-gray-100">
//           {stepIndex > 0 && (
//             <button
//               type="button"
//               onClick={() => goTo(stepIndex - 1)}
//               className="flex-1 h-11 rounded-lg border border-gray-200 text-sm font-medium text-gray-700"
//             >
//               Back
//             </button>
//           )}
//           {!isLastStep ? (
//             <button
//               type="button"
//               onClick={handleNext}
//               className="flex-1 h-11 rounded-lg bg-emerald-600 text-white text-sm font-medium"
//             >
//               Next
//             </button>
//           ) : (
//             <button
//               type="button"
//               onClick={handleSubmit}
//               disabled={submitting}
//               className="flex-1 h-11 rounded-lg bg-emerald-600 text-white text-sm font-medium disabled:bg-emerald-300"
//             >
//               {submitting ? "Creating..." : "Create position"}
//             </button>
//           )}
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default CreatePositionWizard;


























// import { useState } from "react";
// import { X, FileText, Wallet, Users, ArrowLeft, Loader2 } from "lucide-react";
// import StepRail, { type Step } from "./StepRail";
// import JobInformationStep from "../steps/JobInformationStep";
// import RoleAndPayStep from "../steps/RoleAndPayStep";
// import HiringProcessStep from "../steps/HiringProcessStep";
// import {
//   emptyPosition,
//   missingFields,
//   buildCreatePayload,
//   type PositionForm,
// } from "./positionForm";

// const STEPS: Step[] = [
//   {
//     id: "job",
//     title: "Job information",
//     description: "Who the client is and what the role is.",
//     icon: FileText,
//   },
//   {
//     id: "pay",
//     title: "Role & pay",
//     description: "The description, budget and location.",
//     icon: Wallet,
//   },
//   {
//     id: "process",
//     title: "Hiring process",
//     description: "Interviews, preferences and AI matching.",
//     icon: Users,
//   },
// ];

// const CreatePositionWizard = ({
//   open,
//   onClose,
//   onCreate,
//   recruiter,
//   clientOptions = [],
//   functionOptions = [],
//   roleOptions = [],
//   educationOptions = [],
//   cityOptions = [],
// }: {
//   open: boolean;
//   onClose: () => void;
//   onCreate: (payload: any) => Promise<boolean>;
//   recruiter: string;
//   clientOptions?: any[];
//   functionOptions?: any[];
//   roleOptions?: any[];
//   educationOptions?: any[];
//   cityOptions?: any[];
// }) => {
//   const [form, setForm] = useState<PositionForm>(() =>
//     emptyPosition(recruiter)
//   );
//   const [stepIndex, setStepIndex] = useState(0);
//   const [furthest, setFurthest] = useState(0);
//   const [submitting, setSubmitting] = useState(false);
//   const [showErrors, setShowErrors] = useState(false);

//   if (!open) return null;

//   const set = (field: string, value: any) =>
//     setForm((prev) => ({ ...prev, [field]: value }));

//   const toggle = (field: string, value: string) =>
//     setForm((prev: any) => {
//       const current: string[] = prev[field] || [];
//       return {
//         ...prev,
//         [field]: current.includes(value)
//           ? current.filter((item) => item !== value)
//           : [...current, value],
//       };
//     });

//   const blocking = missingFields(form, stepIndex);
//   const isLastStep = stepIndex === STEPS.length - 1;

//   const reset = () => {
//     setForm(emptyPosition(recruiter));
//     setStepIndex(0);
//     setFurthest(0);
//     setShowErrors(false);
//   };

//   const handleClose = () => {
//     reset();
//     onClose();
//   };

//   const goTo = (index: number) => {
//     setShowErrors(false);
//     setStepIndex(index);
//     setFurthest((prev) => Math.max(prev, index));
//   };

//   const handleNext = () => {
//     if (blocking.length) {
//       setShowErrors(true);
//       return;
//     }
//     goTo(stepIndex + 1);
//   };

//   const handleSubmit = async () => {
//     if (missingFields(form, 0).length) {
//       setShowErrors(true);
//       setStepIndex(0);
//       return;
//     }
//     setSubmitting(true);
//     try {
//       const created = await onCreate(buildCreatePayload(form, recruiter));
//       if (created) {
//         reset();
//         onClose();
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const stepProps = { form, set, toggle };

//   return (
//     <div className="fixed inset-0 z-50 bg-gray-900/50 flex items-end sm:items-center justify-center sm:p-6">
//       <div className="bg-gray-50 w-full sm:max-w-6xl h-[94vh] sm:h-[90vh] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="shrink-0 flex items-center gap-3 px-4 sm:px-6 py-3.5 bg-white border-b border-gray-100">
//           <button
//             type="button"
//             onClick={handleClose}
//             className="w-8 h-8 grid place-items-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 shrink-0"
//             aria-label="Close"
//           >
//             <X className="w-4 h-4" />
//           </button>
//           <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
//             Create new position
//           </h2>

//           <div className="ml-auto flex items-center gap-2">
//             {stepIndex > 0 && (
//               <button
//                 type="button"
//                 onClick={() => goTo(stepIndex - 1)}
//                 className="hidden sm:inline-flex h-9 px-3.5 items-center gap-1.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 <ArrowLeft className="w-3.5 h-3.5" />
//                 Back
//               </button>
//             )}
//             {!isLastStep ? (
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="h-9 px-5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={submitting}
//                 className="h-9 px-5 inline-flex items-center gap-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:bg-emerald-300"
//               >
//                 {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
//                 {submitting ? "Creating..." : "Create position"}
//               </button>
//             )}
//           </div>
//         </header>

//         {/* Body */}
//         <div className="flex-1 overflow-y-auto">
//           <div className="flex gap-6 p-4 sm:p-6 max-w-6xl mx-auto">
//             <StepRail
//               steps={STEPS}
//               activeIndex={stepIndex}
//               furthestVisited={furthest}
//               onStepClick={goTo}
//             />

//             <div className="flex-1 min-w-0">
//               {showErrors && blocking.length > 0 && (
//                 <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700">
//                   Fill in {blocking.join(" and ")} before continuing.
//                 </div>
//               )}

//               <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-7">
//                 {stepIndex === 0 && (
//                   <JobInformationStep
//                     {...stepProps}
//                     clientOptions={clientOptions}
//                     functionOptions={functionOptions}
//                     roleOptions={roleOptions}
//                     educationOptions={educationOptions}
//                   />
//                 )}
//                 {stepIndex === 1 && (
//                   <RoleAndPayStep {...stepProps} cityOptions={cityOptions} />
//                 )}
//                 {stepIndex === 2 && <HiringProcessStep {...stepProps} />}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile footer nav */}
//         <footer className="sm:hidden shrink-0 flex gap-3 px-4 py-3 bg-white border-t border-gray-100">
//           {stepIndex > 0 && (
//             <button
//               type="button"
//               onClick={() => goTo(stepIndex - 1)}
//               className="flex-1 h-11 rounded-lg border border-gray-200 text-sm font-medium text-gray-700"
//             >
//               Back
//             </button>
//           )}
//           {!isLastStep ? (
//             <button
//               type="button"
//               onClick={handleNext}
//               className="flex-1 h-11 rounded-lg bg-emerald-600 text-white text-sm font-medium"
//             >
//               Next
//             </button>
//           ) : (
//             <button
//               type="button"
//               onClick={handleSubmit}
//               disabled={submitting}
//               className="flex-1 h-11 rounded-lg bg-emerald-600 text-white text-sm font-medium disabled:bg-emerald-300"
//             >
//               {submitting ? "Creating..." : "Create position"}
//             </button>
//           )}
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default CreatePositionWizard;



















import { useState } from "react";
import { X, FileText, Wallet, Users, ArrowLeft, Loader2 } from "lucide-react";
import StepRail, { type Step } from "./StepRail";
import JobInformationStep from "../steps/JobInformationStep";
import RoleAndPayStep from "../steps/RoleAndPayStep";
import HiringProcessStep from "../steps/HiringProcessStep";
import {
  emptyPosition,
  missingFields,
  buildCreatePayload,
  type PositionForm,
} from "./positionForm";

const STEPS: Step[] = [
  {
    id: "job",
    title: "Job information",
    description: "Who the client is and what the role is.",
    icon: FileText,
  },
  {
    id: "pay",
    title: "Role & pay",
    description: "The description, budget and location.",
    icon: Wallet,
  },
  {
    id: "process",
    title: "Hiring process",
    description: "Interviews, preferences and AI matching.",
    icon: Users,
  },
];

const CreatePositionWizard = ({
  open,
  onClose,
  onCreate,
  onClientCreated,
  recruiter,
  clientOptions = [],
  functionOptions = [],
  roleOptions = [],
  educationOptions = [],
  cityOptions = [],
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: any) => Promise<boolean>;
  onClientCreated?: (option: any) => void;
  recruiter: string;
  clientOptions?: any[];
  functionOptions?: any[];
  roleOptions?: any[];
  educationOptions?: any[];
  cityOptions?: any[];
}) => {
  const [form, setForm] = useState<PositionForm>(() =>
    emptyPosition(recruiter)
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  if (!open) return null;

  const set = (field: string, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggle = (field: string, value: string) =>
    setForm((prev: any) => {
      const current: string[] = prev[field] || [];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });

  const blocking = missingFields(form, stepIndex);
  const isLastStep = stepIndex === STEPS.length - 1;

  const reset = () => {
    setForm(emptyPosition(recruiter));
    setStepIndex(0);
    setFurthest(0);
    setShowErrors(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const goTo = (index: number) => {
    setShowErrors(false);
    setStepIndex(index);
    setFurthest((prev) => Math.max(prev, index));
  };

  const handleNext = () => {
    if (blocking.length) {
      setShowErrors(true);
      return;
    }
    goTo(stepIndex + 1);
  };

  const handleSubmit = async () => {
    if (missingFields(form, 0).length) {
      setShowErrors(true);
      setStepIndex(0);
      return;
    }
    setSubmitting(true);
    try {
      const created = await onCreate(buildCreatePayload(form, recruiter));
      if (created) {
        reset();
        onClose();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const stepProps = { form, set, toggle };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/50 flex items-end sm:items-center justify-center sm:p-6">
      <div className="bg-gray-50 w-full sm:max-w-6xl h-[94vh] sm:h-[90vh] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <header className="shrink-0 flex items-center gap-3 px-4 sm:px-6 py-3.5 bg-white border-b border-gray-100">
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 grid place-items-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
            Create new position
          </h2>

          <div className="ml-auto flex items-center gap-2">
            {stepIndex > 0 && (
              <button
                type="button"
                onClick={() => goTo(stepIndex - 1)}
                className="hidden sm:inline-flex h-9 px-3.5 items-center gap-1.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            )}
            {!isLastStep ? (
              <button
                type="button"
                onClick={handleNext}
                className="h-9 px-5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="h-9 px-5 inline-flex items-center gap-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:bg-emerald-300"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {submitting ? "Creating..." : "Create position"}
              </button>
            )}
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex gap-6 p-4 sm:p-6 max-w-6xl mx-auto">
            <StepRail
              steps={STEPS}
              activeIndex={stepIndex}
              furthestVisited={furthest}
              onStepClick={goTo}
            />

            <div className="flex-1 min-w-0">
              {showErrors && blocking.length > 0 && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700">
                  Fill in {blocking.join(" and ")} before continuing.
                </div>
              )}

              <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-7">
                {stepIndex === 0 && (
                  <JobInformationStep
                    {...stepProps}
                    clientOptions={clientOptions}
                    functionOptions={functionOptions}
                    roleOptions={roleOptions}
                    educationOptions={educationOptions}
                    onClientCreated={onClientCreated}
                  />
                )}
                {stepIndex === 1 && (
                  <RoleAndPayStep {...stepProps} cityOptions={cityOptions} />
                )}
                {stepIndex === 2 && <HiringProcessStep {...stepProps} />}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile footer nav */}
        <footer className="sm:hidden shrink-0 flex gap-3 px-4 py-3 bg-white border-t border-gray-100">
          {stepIndex > 0 && (
            <button
              type="button"
              onClick={() => goTo(stepIndex - 1)}
              className="flex-1 h-11 rounded-lg border border-gray-200 text-sm font-medium text-gray-700"
            >
              Back
            </button>
          )}
          {!isLastStep ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 h-11 rounded-lg bg-emerald-600 text-white text-sm font-medium"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 h-11 rounded-lg bg-emerald-600 text-white text-sm font-medium disabled:bg-emerald-300"
            >
              {submitting ? "Creating..." : "Create position"}
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default CreatePositionWizard;