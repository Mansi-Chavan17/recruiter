// Shared types for the AI Resume Matcher module

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface PositionOption extends SelectOption {
  position: string;
  clientName: string;
}

export interface RangeValue {
  min: string;
  max: string;
}

export interface AiMatcherFilters {
  positionName: PositionOption | null;
  preferredIndustry: SelectOption[];
  preferredFunction: SelectOption[];
  preferredRole: string;
  ctcRange: RangeValue;
  experienceRange: RangeValue;
  keywords: string;
  industryEnabled: boolean;
  functionEnabled: boolean;
  roleEnabled: boolean;
}

export interface Candidate {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  currentCtc: string | number;
  currentOrg: string;
  designation: string;
  experience: number;
  skills: string;
  resume: string;
}

export interface AiCandidate extends Candidate {
  aiScore: number;
  keywordMatches?: number;
}

export interface TaggedCandidate {
  candidateName: string;
  positionName: string;
  clientName: string;
  taggedDate: string;
}

export interface AiProgress {
  current: number;
  total: number;
  percentage: number;
}

// react-select async loader signature
export type LoadOptions<T> = (
  inputValue: string,
  callback: (options: T[]) => void
) => void;