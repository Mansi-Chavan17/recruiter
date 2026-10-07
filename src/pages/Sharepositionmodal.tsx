import { useState, useEffect } from "react";
import { X, Link2, Copy, Check, Mail } from "lucide-react";
import { displayValue } from "../components/positions/Positionutils";

/** Deep link to this position's own route. */
export const positionShareUrl = (positionId: any) =>
  `${window.location.origin}/position-management/${positionId}`;

const SharePositionModal = ({ open, onClose, position }: any) => {
  const [copied, setCopied] = useState(false);
  const url = positionShareUrl(position.id);

  useEffect(() => {
    if (!open) setCopied(false);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard API needs https or localhost — fall back to the old way
      const field = document.createElement("textarea");
      field.value = url;
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      document.body.removeChild(field);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const subject = `Opening: ${position.positionName} at ${displayValue(
    position.clientName
  )}`;
  const body = `Hi,\n\nSharing an opening that may interest you:\n\n${
    position.positionName
  }\nClient: ${displayValue(position.clientName)}\nLocation: ${displayValue(
    position.city
  )}\nExperience: ${displayValue(position.experience)}\n\nDetails: ${url}\n\nBest regards,\n${displayValue(
    position.recruiter
  )}`;

  const mailto = `mailto:?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  const whatsapp = `https://wa.me/?text=${encodeURIComponent(
    `${position.positionName} at ${displayValue(
      position.clientName
    )} — ${url}`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-gray-900/50 flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            Share this position
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 grid place-items-center rounded-full text-gray-400 hover:bg-gray-50"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-100">
            <p className="text-sm font-medium text-gray-900 break-words">
              {position.positionName}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {displayValue(position.clientName)} ·{" "}
              {displayValue(position.city)}
            </p>
          </div>

          <label className="block text-sm font-medium text-gray-700 mt-5 mb-1.5">
            Link
          </label>
          <div className="flex gap-2">
            <div className="flex-1 min-w-0 h-11 px-3.5 flex items-center gap-2 bg-white border border-gray-200 rounded-lg">
              <Link2 className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-sm text-gray-600 truncate" title={url}>
                {url}
              </span>
            </div>
            <button
              onClick={copy}
              className={`h-11 px-4 inline-flex items-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                copied
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <p className="mt-2 text-xs text-gray-400">
            Anyone with dashboard access can open this link.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 mt-5 pt-5 border-t border-gray-100">
            <a
              href={mailto}
              className="flex-1 h-11 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Mail className="w-4 h-4" />
              Share over email
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-11 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Share on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePositionModal;