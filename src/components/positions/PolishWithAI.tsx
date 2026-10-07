// import { useState } from "react";
// import { Sparkles, Undo2, Loader2 } from "lucide-react";
// import { polishRoleDescription, type PolishContext } from "../../lib/anthropic";

// const MIN_CHARS = 40;

// /**
//  * Sits under the role description box. The recruiter has to write something
//  * first — this polishes their words, it does not invent a description from
//  * an empty box.
//  */
// const PolishWithAI = ({
//   value,
//   onChange,
//   context,
// }: {
//   value: string;
//   onChange: (next: string) => void;
//   context: PolishContext;
// }) => {
//   const [isPolishing, setIsPolishing] = useState(false);
//   const [previous, setPrevious] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const draft = (value || "").trim();
//   const tooShort = draft.length < MIN_CHARS;

//   const handlePolish = async () => {
//     setError(null);
//     setIsPolishing(true);
//     try {
//       const polished = await polishRoleDescription(draft, context);
//       if (polished) {
//         setPrevious(value);
//         onChange(polished);
//       }
//     } catch (err: any) {
//       setError(err.message || "Could not reach Claude. Try again.");
//     } finally {
//       setIsPolishing(false);
//     }
//   };

//   const handleUndo = () => {
//     if (previous !== null) {
//       onChange(previous);
//       setPrevious(null);
//     }
//   };

//   return (
//     <div className="mt-2.5">
//       <div className="flex flex-wrap items-center gap-2">
//         <button
//           type="button"
//           onClick={handlePolish}
//           disabled={tooShort || isPolishing}
//           title={
//             tooShort
//               ? `Write at least ${MIN_CHARS} characters first`
//               : "Rewrite your draft as a polished description"
//           }
//           className={`h-9 px-3.5 inline-flex items-center gap-2 rounded-lg text-sm font-medium transition ${
//             tooShort || isPolishing
//               ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//               : "bg-emerald-600 text-white hover:bg-emerald-700"
//           }`}
//         >
//           {isPolishing ? (
//             <Loader2 className="w-4 h-4 animate-spin" />
//           ) : (
//             <Sparkles className="w-4 h-4" />
//           )}
//           {isPolishing ? "Polishing..." : "Polish with AI"}
//         </button>

//         {previous !== null && !isPolishing && (
//           <button
//             type="button"
//             onClick={handleUndo}
//             className="h-9 px-3 inline-flex items-center gap-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
//           >
//             <Undo2 className="w-3.5 h-3.5" />
//             Undo
//           </button>
//         )}

//         <span className="text-xs text-gray-400">
//           {tooShort
//             ? `Write your rough notes first — at least ${MIN_CHARS} characters.`
//             : "Keeps your facts, tidies the writing."}
//         </span>
//       </div>

//       {error && (
//         <p className="mt-2 text-xs text-red-600 break-words">{error}</p>
//       )}
//     </div>
//   );
// };

// export default PolishWithAI;



import { useState } from "react";
import { Sparkles, Undo2, Loader2 } from "lucide-react";
import { polishRoleDescription, type PolishContext } from "../lib/anthropic";

const MIN_CHARS = 40;

/**
 * Sits under the role description box. The recruiter has to write something
 * first — this polishes their words, it does not invent a description from
 * an empty box.
 */
const PolishWithAI = ({
  value,
  onChange,
  context,
}: {
  value: string;
  onChange: (next: string) => void;
  context: PolishContext;
}) => {
  const [isPolishing, setIsPolishing] = useState(false);
  const [previous, setPrevious] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const draft = (value || "").trim();
  const tooShort = draft.length < MIN_CHARS;

  const handlePolish = async () => {
    setError(null);
    setIsPolishing(true);
    try {
      const polished = await polishRoleDescription(draft, context);
      if (polished) {
        setPrevious(value);
        onChange(polished);
      }
    } catch (err: any) {
      setError(err.message || "Could not reach Claude. Try again.");
    } finally {
      setIsPolishing(false);
    }
  };

  const handleUndo = () => {
    if (previous !== null) {
      onChange(previous);
      setPrevious(null);
    }
  };

  return (
    <div className="mt-2.5">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handlePolish}
          disabled={tooShort || isPolishing}
          title={
            tooShort
              ? `Write at least ${MIN_CHARS} characters first`
              : "Rewrite your draft as a polished description"
          }
          className={`h-9 px-3.5 inline-flex items-center gap-2 rounded-lg text-sm font-medium transition ${
            tooShort || isPolishing
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          {isPolishing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {isPolishing ? "Polishing..." : "Polish with AI"}
        </button>

        {previous !== null && !isPolishing && (
          <button
            type="button"
            onClick={handleUndo}
            className="h-9 px-3 inline-flex items-center gap-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
          >
            <Undo2 className="w-3.5 h-3.5" />
            Undo
          </button>
        )}

        <span className="text-xs text-gray-400">
          {tooShort
            ? `Write your rough notes first — at least ${MIN_CHARS} characters.`
            : "Keeps your facts, tidies the writing."}
        </span>
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-600 break-words">{error}</p>
      )}
    </div>
  );
};

export default PolishWithAI;