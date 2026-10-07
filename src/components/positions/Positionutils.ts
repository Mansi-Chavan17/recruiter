/** Formatting and payload helpers shared by the position detail components. */

export const displayValue = (value: any) => {
  if (Array.isArray(value)) {
    const cleaned = value.filter(Boolean);
    return cleaned.length ? cleaned.join(", ") : "N/A";
  }
  if (value === null || value === undefined || value === "") return "N/A";
  return String(value);
};

export const formatDate = (value: any) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/** Days between today and the deadline. Negative means overdue. */
export const daysRemaining = (deadline: any) => {
  if (!deadline) return null;
  const end = new Date(deadline);
  if (isNaN(end.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  return Math.round((end.getTime() - today.getTime()) / 86400000);
};

export const initials = (name: string = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "?";

export const statusTone = (status: string = "") => {
  const normalized = status.toLowerCase();
  if (normalized === "open") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (normalized === "on hold") return "bg-amber-50 text-amber-700 border-amber-200";
  if (normalized === "lost") return "bg-red-50 text-red-700 border-red-200";
  if (normalized.includes("close")) return "bg-gray-100 text-gray-600 border-gray-200";
  return "bg-emerald-50 text-emerald-700 border-emerald-200";
};

export const candidateStatusTone = (status: string = "") =>
  ({
    internal_screening: "bg-amber-50 text-amber-700",
    internal_reject: "bg-red-50 text-red-700",
    submitted: "bg-blue-50 text-blue-700",
    interview_scheduled: "bg-purple-50 text-purple-700",
    selected: "bg-emerald-50 text-emerald-700",
  }[status] || "bg-gray-100 text-gray-600");

export const candidateStatusLabel = (status: string = "") =>
  ({
    internal_screening: "Internal screening",
    internal_reject: "Internal reject",
    submitted: "Submitted",
    interview_scheduled: "Interview scheduled",
    selected: "Selected",
  }[status] || status);

const toList = (value: any) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

/** Maps the edited position back onto the update payload the backend expects. */
export const buildUpdatePayload = (edited: any, positionId: any) => ({
  id: String(positionId),
  title: edited.positionName,
  clientSpoc: edited.clientSpoc || null,
  location: edited.city || edited.location || "",
  city: edited.city || edited.location || "",
  status: edited.status,
  priority: edited.priority || "",
  ctcBudget: edited.ctcBudget
    ? Number(String(edited.ctcBudget).replace(/[^0-9]/g, "")) * 100000
    : null,
  ctcStructure: edited.ctcStructure || null,
  experience: edited.experience
    ? parseInt(String(edited.experience).replace(/\D/g, "")) || 0
    : 0,
  education: edited.education || "",
  workplaceType: edited.workplaceType || "",
  reportees: parseInt(edited.reportees) || 0,
  deadline: edited.deadline || null,
  interviewRounds: parseInt(edited.rounds) || 0,
  interviewer: edited.interviewerName || null,
  interviewMode: edited.interviewMode || null,
  linkedin: edited.linkedIn || null,
  jobType: edited.jobType || "",
  roleType: edited.roleType || "",
  roleDescription: edited.roleDescription || null,
  preferredIndustry: toList(edited.preferredIndustry),
  preferredCompanies: toList(edited.preferredCompanies),
  diversityPreference: edited.diversityPreference || "",
  lakshSpoc: toList(edited.lakshSpoc),
  function: edited.function || null,
  role: edited.role || null,
  target: edited.target ? Number(edited.target) : null,
});