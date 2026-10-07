export type Candidate = {
  id: string;
  candidate: string | null;
  contact: {
    email: string;
    phone: string | null;
    resume: string | null;
  };
  company_name: string | null;
  current_role: string | null;
  ctc: {
    current: string | null;
    expected: string | null;
  };
  location: string | null;
  noticePeriod: number | null;
  documents: number;
  latestUpload: string | null;
  status: string | null;
};