/**
 * Everything about the shape of the create-position form lives here, so a
 * field can be added or renamed in one place instead of three.
 */

export const emptyPosition = (recruiter: string) => ({
  // Step 1 — job information
  positionName: "",
  clientName: "",
  clientSPOC: "",
  recruiter,
  status: "Open",
  priority: "",
  roleType: "",
  jobType: "",
  function: "",
  role: "",
  education: "",
  experienceYears: "",
  target: "",

  // Step 2 — role and compensation
  roleDescription: "",
  ctcBudgetNumeric: "",
  ctcStructure: "",
  workplaceType: "",
  city: "",
  deadline: "",

  // Step 3 — hiring process and matching
  rounds: "",
  interviewerName: "",
  interviewerLinkedIn: "",
  interviewMode: "",
  preferredIndustry: "",
  preferredCompanies: "",
  diversityPreference: "",
  keywords: "",
  prompt: "",
  aiPreferredIndustries: [] as string[],
  aiPreferredFunctions: [] as string[],
  aiPreferredRole: "",
});

export type PositionForm = ReturnType<typeof emptyPosition>;

/** Which fields block the Next button on each step. */
export const stepRequirements: Record<number, (keyof PositionForm)[]> = {
  0: ["positionName", "clientName"],
  1: [],
  2: [],
};

export const missingFields = (form: PositionForm, stepIndex: number) =>
  (stepRequirements[stepIndex] || []).filter((field) => !form[field]);

const toList = (value: string) =>
  value
    ? value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

/** Maps the form onto the payload the backend expects. */
export const buildCreatePayload = (form: PositionForm, recruiter: string) => ({
  positionName: form.positionName,
  clientName: form.clientName,
  priority: form.priority || "",
  status: form.status,
  roleType: form.roleType || "",
  jobType: form.jobType || "",
  function: form.function || null,
  role: form.role || null,
  roleDescription: form.roleDescription || null,
  experience: form.experienceYears
    ? parseInt(String(form.experienceYears).replace(/\D/g, "")) || 0
    : 0,
  education: form.education || "",
  ctcStructure: form.ctcStructure || null,
  ctcBudget: form.ctcBudgetNumeric ? Number(form.ctcBudgetNumeric) : null,
  workplaceType: form.workplaceType || "",
  city: form.city || "",
  preferredIndustries: toList(form.preferredIndustry),
  preferredCompanies: form.preferredCompanies || null,
  diversityPreference: form.diversityPreference || "",
  target: form.target ? Number(form.target) : 1,
  recruiter,
  numberOfRounds: form.rounds ? Number(form.rounds) : 1,
  interviewerName: form.interviewerName || null,
  interviewerLinkedin: form.interviewerLinkedIn || null,
  modeOfInterview: form.interviewMode || null,
  deadline: form.deadline || null,
  keywords: form.keywords || null,
  aiPrompt: form.prompt || null,
  aiPreferredIndustries: form.aiPreferredIndustries || [],
  aiPreferredFunctions: form.aiPreferredFunctions || [],
  aiPreferredRole: form.aiPreferredRole || null,
  clientSpoc: form.clientSPOC || null,
});

/* Option sets used by more than one place */

export const STATUS_OPTIONS = [
  "Open",
  "On Hold",
  "Close by LHR",
  "Lost",
  "Candidate identified",
];

export const PRIORITY_OPTIONS = ["High", "Medium", "Low"];

export const JOB_TYPE_OPTIONS = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];

export const ROLE_TYPE_CARDS = [
  {
    value: "New",
    label: "New role",
    description: "A headcount that did not exist before.",
  },
  {
    value: "Replacement",
    label: "Replacement",
    description: "Backfilling someone who has left or moved.",
  },
];

export const WORKPLACE_CARDS = [
  {
    value: "In office",
    label: "In office",
    description: "Employee works from the client's office.",
  },
  {
    value: "Hybrid",
    label: "Hybrid",
    description: "Split between office and home.",
  },
  {
    value: "Remote",
    label: "Remote",
    description: "Employee works fully from home.",
  },
];

export const INTERVIEW_MODE_CARDS = [
  {
    value: "Video Call",
    label: "Video call",
    description: "All rounds over video.",
  },
  {
    value: "In-person",
    label: "In-person",
    description: "Candidate travels to the client.",
  },
  {
    value: "In-person + Video",
    label: "Mixed",
    description: "Early rounds on video, final in person.",
  },
];

export const DIVERSITY_OPTIONS = [
  "Gender Diverse",
  "Ethnically Diverse",
  "Age Diverse",
];

export const AI_INDUSTRIES = [
  "Technology",
  "Fintech",
  "E-commerce",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Consulting",
  "Media",
  "Real Estate",
];

export const AI_FUNCTIONS = [
  "Engineering",
  "Product",
  "Sales",
  "Marketing",
  "Operations",
  "Finance",
  "HR",
  "Design",
  "Strategy",
];