import { useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

/*
  BD Module Prototype — TrueKarma Platform, LHR Group
  Based on PRD v1.0 September 2026

  Sections: Dashboard, Meetings, Pipeline, Proposals, Commercials,
            Follow-ups, Clients, Reports
*/

/* ═══ TYPES ═══ */
interface Discussion {
  type: "agenda" | "requirements" | "objection" | "nextStep" | "internal";
  text: string;
  tags?: string[];
  assignee?: string;
  dueDate?: string;
  done?: boolean;
}

interface Proposal {
  title: string;
  version: string;
  status: string;
  serviceLine: string;
  scope: string;
  deliverables: string;
  approver: string;
  approvedDate: string;
  sentDate: string;
  viewCount: number;
}

interface NegotiationEntry {
  date: string;
  note: string;
}

interface Commercials {
  pricingModel: string;
  quotedAmount: string;
  discount: string;
  paymentTerms: string;
  contractDuration: string;
  startDate: string;
  negotiationLog: NegotiationEntry[];
}

interface FollowUp {
  id: string;
  note: string;
  dueDate: string;
  done: boolean;
  completedDate?: string | null;
  snoozedTo?: string | null;
}

interface ConversionChecklist {
  agreementSigned: boolean;
  commercialsLocked: boolean;
  spocAssigned: boolean;
}

interface Conversion {
  dealValue: string;
  serviceLine: string;
  contractStart: string;
  source: string;
  checklist: ConversionChecklist;
}

interface Lead {
  id: string;
  company: string;
  person: string;
  designation: string;
  email: string;
  phone: string;
  linkedin: string;
  meetingDate: string;
  meetingType: string;
  bdOwner: string;
  source: string;
  location: string;
  industry: string;
  status: string;
  converted: boolean;
  discussions: Discussion[];
  proposal: Proposal;
  commercials: Commercials;
  followUps: FollowUp[];
  conversion?: Conversion;
  lossReason?: string;
}

interface StatusMeta {
  color: string;
  bg: string;
  dot: string;
  label: string;
}

interface PipeSegment {
  s: string;
  c: string;
}

interface KPI {
  label: string;
  value: string | number;
}

interface FlatFollowUp extends FollowUp {
  leadId: string;
  idx: number;
  company: string;
  person: string;
  bdOwner: string;
  designation: string;
  email: string;
  phone: string;
  status: string;
  proposalStatus: string | undefined;
  commercials: string | undefined;
}

/* ═══ SEED DATA ═══ */
const BD_OWNERS: string[] = ["Shahu Patil", "Priya Mehta", "Rohit Kapoor", "Ananya Sen"];
const SOURCES: string[] = ["Referral", "Cold Outreach", "Event", "LinkedIn", "Inbound", "Existing Client"];
const MEETING_TYPES: string[] = ["In-person", "Virtual", "Phone", "Email"];
const PRICING_MODELS: string[] = ["Fixed Fee", "Retainer", "% of CTC", "Hybrid"];
const SERVICE_LINES: string[] = ["CXO Hiring", "VP Hiring", "Director Hiring", "Volume Hiring", "RPO"];
const LOSS_REASONS: string[] = ["Price", "Competition", "Timing", "Scope Mismatch", "Budget Freeze", "Other"];
const AGENDA_TEMPLATES: string[] = ["Discovery Call", "Capability Presentation", "Commercial Discussion"];
const PROPOSAL_STATUSES: string[] = ["Not Created", "Draft", "In Review", "Sent", "Viewed", "Accepted", "Rejected"];

const STATUSES: string[] = ["No Potential", "Warm", "Hot", "Converted"];
const STATUS_META: Record<string, StatusMeta> = {
  "No Potential": { color: "#7a8599", bg: "#f0f1f4", dot: "#a0aab8", label: "Evaluated — does not fit or declined" },
  "Warm":        { color: "#8b7040", bg: "#faf4ea", dot: "#c4a265", label: "Interest shown; pre-proposal" },
  "Hot":         { color: "#8b4a4a", bg: "#faf0ee", dot: "#c27070", label: "Proposal sent or terms under discussion" },
  "Converted":   { color: "#4a7a62", bg: "#eef6f1", dot: "#6aaa88", label: "Agreement signed or mandate given" },
};

const now = new Date();
const dayMs = 86400000;
const d = (offset: number): string => new Date(now.getTime() + offset * dayMs).toISOString().split("T")[0];

const SEED: Lead[] = [
  {
    id: "L001", company: "Tata Consultancy Services", person: "Rajesh Nair", designation: "VP – Talent Acquisition",
    email: "rajesh.nair@tcs.com", phone: "+91 98765 43210", linkedin: "linkedin.com/in/rajeshnair",
    meetingDate: d(-14), meetingType: "In-person", bdOwner: "Shahu Patil", source: "Event",
    location: "Mumbai", industry: "IT Services", status: "Hot", converted: false,
    discussions: [
      { type: "agenda", text: "50 Java developers needed for Pune campus expansion" },
      { type: "requirements", text: "Mid-senior level, 5-8 yrs exp, immediate joining preferred", tags: ["Director", "IT Services", "Pune", "Urgent"] },
      { type: "objection", text: "Concerned about TAT — current vendor taking 45+ days per role" },
      { type: "nextStep", text: "Send revised RPO proposal with SLA guarantees", assignee: "Shahu Patil", dueDate: d(-7), done: true },
      { type: "nextStep", text: "Schedule pricing discussion with procurement", assignee: "Shahu Patil", dueDate: d(2), done: false },
      { type: "internal", text: "Strong opportunity. Rajesh has budget approval. Competitor is ABC Consultants." },
    ],
    proposal: { title: "RPO Engagement — 50 Hires", version: "v2", status: "Sent", serviceLine: "Volume Hiring",
      scope: "Dedicated 4-recruiter team, 6-month engagement, Pune campus hiring",
      deliverables: "End-to-end hiring: sourcing, screening, coordination, offer rollout for 50 Java/React/DevOps roles",
      approver: "Rohit Kapoor", approvedDate: d(-10), sentDate: d(-9), viewCount: 4 },
    commercials: { pricingModel: "Hybrid", quotedAmount: "₹45,000/hire + ₹2L/month retainer", discount: "5% volume discount on 40+ hires",
      paymentTerms: "Net 30, milestone at 25 hires", contractDuration: "6 months", startDate: d(15),
      negotiationLog: [
        { date: d(-12), note: "Initial quote: ₹50K/hire + ₹2.5L retainer" },
        { date: d(-9), note: "Counter: ₹40K/hire. We revised to ₹45K with volume discount." },
      ] },
    followUps: [
      { id: "F001", note: "Send revised commercials with SLA doc", dueDate: d(-10), done: true, completedDate: d(-9) },
      { id: "F002", note: "Follow up on proposal sign-off", dueDate: d(-3), done: false, snoozedTo: null },
      { id: "F003", note: "Schedule pricing call with procurement team", dueDate: d(2), done: false, snoozedTo: null },
    ],
  },
  {
    id: "L002", company: "Bajaj Finserv", person: "Sneha Kulkarni", designation: "Head HR",
    email: "sneha.k@bajajfinserv.in", phone: "+91 87654 32100", linkedin: "",
    meetingDate: d(-9), meetingType: "Virtual", bdOwner: "Priya Mehta", source: "LinkedIn",
    location: "Pune", industry: "BFSI", status: "Warm", converted: false,
    discussions: [
      { type: "agenda", text: "Exploring hiring partner for niche quant analyst roles" },
      { type: "requirements", text: "5 quant analyst positions, CFA/FRM preferred", tags: ["VP", "BFSI", "Pune"] },
      { type: "objection", text: "Current vendor not delivering quality; cautious about switching" },
      { type: "nextStep", text: "Share capability deck + BFSI case studies", assignee: "Priya Mehta", dueDate: d(-2), done: false },
      { type: "internal", text: "Pilot opportunity. If 5 roles go well, 20+ roles in Q1." },
    ],
    proposal: { title: "", version: "", status: "Not Created", serviceLine: "", scope: "", deliverables: "", approver: "", approvedDate: "", sentDate: "", viewCount: 0 },
    commercials: { pricingModel: "", quotedAmount: "", discount: "", paymentTerms: "", contractDuration: "", startDate: "", negotiationLog: [] },
    followUps: [
      { id: "F004", note: "Share capability deck + BFSI case studies", dueDate: d(-2), done: false, snoozedTo: null },
      { id: "F005", note: "Check if Sneha reviewed our LinkedIn profile", dueDate: d(3), done: false, snoozedTo: null },
    ],
  },
  {
    id: "L003", company: "Reliance Jio", person: "Amit Sharma", designation: "Director – HR Operations",
    email: "amit.sharma@jio.com", phone: "+91 76543 21098", linkedin: "linkedin.com/in/amitsharma",
    meetingDate: d(-34), meetingType: "In-person", bdOwner: "Shahu Patil", source: "Referral",
    location: "Mumbai", industry: "Telecom", status: "Hot", converted: true,
    discussions: [
      { type: "agenda", text: "Bulk hiring for 200+ retail store associate roles across Maharashtra" },
      { type: "requirements", text: "Retail associates, graduates, local language skills", tags: ["Volume Hiring", "Telecom", "Maharashtra"] },
      { type: "nextStep", text: "Share milestone-based proposal", assignee: "Shahu Patil", dueDate: d(-30), done: true },
      { type: "internal", text: "Referred by Meera Iyer (HDFC). Strong relationship." },
    ],
    proposal: { title: "Bulk Retail Hiring — Maharashtra", version: "v1", status: "Accepted", serviceLine: "Volume Hiring",
      scope: "200+ retail associates across 15 cities in Maharashtra",
      deliverables: "Sourcing, screening, onboarding support, 4-month engagement",
      approver: "Rohit Kapoor", approvedDate: d(-32), sentDate: d(-31), viewCount: 7 },
    commercials: { pricingModel: "Fixed Fee", quotedAmount: "₹12,000/hire", discount: "Milestone discount: ₹10K/hire after 150+",
      paymentTerms: "Milestone — payments at 50, 100, 200 hires", contractDuration: "4 months", startDate: d(-20),
      negotiationLog: [
        { date: d(-33), note: "Initial: ₹15K/hire" },
        { date: d(-31), note: "Agreed: ₹12K with milestone discount" },
      ] },
    followUps: [
      { id: "F006", note: "Contract review call", dueDate: d(-28), done: true, completedDate: d(-27) },
      { id: "F007", note: "Collect signed contract", dueDate: d(-22), done: true, completedDate: d(-21) },
    ],
    conversion: { dealValue: "₹24,00,000", serviceLine: "Volume Hiring", contractStart: d(-20), source: "Referral",
      checklist: { agreementSigned: true, commercialsLocked: true, spocAssigned: true } },
  },
  {
    id: "L004", company: "Wipro", person: "Priya Deshmukh", designation: "Recruitment Manager",
    email: "priya.d@wipro.com", phone: "+91 65432 10987", linkedin: "",
    meetingDate: d(-19), meetingType: "Virtual", bdOwner: "Rohit Kapoor", source: "Cold Outreach",
    location: "Bangalore", industry: "IT Services", status: "No Potential", converted: false,
    discussions: [
      { type: "agenda", text: "Introductory call — explored partnership for lateral hiring" },
      { type: "objection", text: "Locked in with current vendors for FY27. No budget for new partners." },
      { type: "nextStep", text: "Revisit in Q4 FY27", assignee: "Rohit Kapoor", dueDate: d(90), done: false },
      { type: "internal", text: "Dead end for now. Priya was polite but firm. Revisit Jan 2027." },
    ],
    proposal: { title: "", version: "", status: "Not Created", serviceLine: "", scope: "", deliverables: "", approver: "", approvedDate: "", sentDate: "", viewCount: 0 },
    commercials: { pricingModel: "", quotedAmount: "", discount: "", paymentTerms: "", contractDuration: "", startDate: "", negotiationLog: [] },
    followUps: [],
    lossReason: "Competition",
  },
  {
    id: "L005", company: "Persistent Systems", person: "Kunal Joshi", designation: "CHRO",
    email: "kunal.j@persistent.com", phone: "+91 99887 76655", linkedin: "linkedin.com/in/kunaljoshi",
    meetingDate: d(-10), meetingType: "In-person", bdOwner: "Ananya Sen", source: "Event",
    location: "Pune", industry: "IT Services", status: "Hot", converted: false,
    discussions: [
      { type: "agenda", text: "30 mid-senior lateral roles — exclusive mandate discussion" },
      { type: "requirements", text: "Engineering managers, architects, 10-15 yrs exp", tags: ["Director", "IT Services", "Pune", "Exclusive"] },
      { type: "objection", text: "Wants proof of similar mandates handled successfully" },
      { type: "nextStep", text: "Share IT services case studies", assignee: "Ananya Sen", dueDate: d(-3), done: false },
      { type: "nextStep", text: "Proposal presentation to leadership team", assignee: "Ananya Sen", dueDate: d(4), done: false },
      { type: "internal", text: "CHRO very engaged. If we win this, it's a flagship account." },
    ],
    proposal: { title: "Exclusive Lateral Mandate — 30 Roles", version: "v1", status: "Draft", serviceLine: "Director Hiring",
      scope: "30 mid-senior roles, 90-day TAT guarantee, exclusive mandate",
      deliverables: "End-to-end: sourcing → assessment → offer rollout. Dedicated account manager.",
      approver: "", approvedDate: "", sentDate: "", viewCount: 0 },
    commercials: { pricingModel: "% of CTC", quotedAmount: "8.33% of CTC per hire", discount: "",
      paymentTerms: "50% on joining, 50% after 60-day guarantee period", contractDuration: "6 months", startDate: "",
      negotiationLog: [
        { date: d(-8), note: "Proposed 8.33% — standard for exclusive mandates at this level" },
      ] },
    followUps: [
      { id: "F008", note: "Share case studies from IT services clients", dueDate: d(-3), done: false, snoozedTo: null },
      { id: "F009", note: "Proposal deck ready for leadership presentation", dueDate: d(4), done: false, snoozedTo: null },
    ],
  },
  {
    id: "L006", company: "HDFC Bank", person: "Meera Iyer", designation: "SVP – Human Resources",
    email: "meera.iyer@hdfcbank.com", phone: "+91 88776 65544", linkedin: "linkedin.com/in/meeraiyer",
    meetingDate: d(-55), meetingType: "In-person", bdOwner: "Shahu Patil", source: "Existing Client",
    location: "Mumbai", industry: "BFSI", status: "Hot", converted: true,
    discussions: [
      { type: "agenda", text: "Branch expansion hiring — 120 roles across West India" },
      { type: "requirements", text: "Branch managers, relationship managers, tellers", tags: ["Volume Hiring", "BFSI", "Maharashtra", "Gujarat"] },
      { type: "nextStep", text: "Share branch hiring proposal", assignee: "Shahu Patil", dueDate: d(-52), done: true },
    ],
    proposal: { title: "Branch Expansion Hiring — West India", version: "v2", status: "Accepted", serviceLine: "Volume Hiring",
      scope: "120 branch banking roles across Maharashtra & Gujarat",
      deliverables: "Full cycle recruitment with weekly progress reports",
      approver: "Rohit Kapoor", approvedDate: d(-50), sentDate: d(-49), viewCount: 5 },
    commercials: { pricingModel: "Fixed Fee", quotedAmount: "₹18,000/hire", discount: "Loyalty discount — 10% on renewal",
      paymentTerms: "Net 30", contractDuration: "3 months", startDate: d(-40),
      negotiationLog: [
        { date: d(-52), note: "₹20K initial, agreed ₹18K with loyalty discount for repeat engagement" },
      ] },
    followUps: [
      { id: "F010", note: "Kick-off call", dueDate: d(-48), done: true, completedDate: d(-47) },
    ],
    conversion: { dealValue: "₹21,60,000", serviceLine: "Volume Hiring", contractStart: d(-40), source: "Existing Client",
      checklist: { agreementSigned: true, commercialsLocked: true, spocAssigned: true } },
  },
  {
    id: "L007", company: "Godrej Properties", person: "Vikram Rao", designation: "Head – Talent Acquisition",
    email: "vikram.rao@godrej.com", phone: "+91 77665 54433", linkedin: "",
    meetingDate: d(-5), meetingType: "Virtual", bdOwner: "Priya Mehta", source: "Referral",
    location: "Mumbai", industry: "Real Estate", status: "Warm", converted: false,
    discussions: [
      { type: "agenda", text: "Leadership hiring for new luxury vertical — 3 CXO roles" },
      { type: "requirements", text: "CEO, CFO, COO for luxury real estate arm", tags: ["CXO", "Real Estate", "Mumbai"] },
      { type: "nextStep", text: "Send LHR capabilities for CXO search", assignee: "Priya Mehta", dueDate: d(1), done: false },
      { type: "internal", text: "High-value opportunity. ₹30L+ potential per role." },
    ],
    proposal: { title: "", version: "", status: "Not Created", serviceLine: "", scope: "", deliverables: "", approver: "", approvedDate: "", sentDate: "", viewCount: 0 },
    commercials: { pricingModel: "", quotedAmount: "", discount: "", paymentTerms: "", contractDuration: "", startDate: "", negotiationLog: [] },
    followUps: [
      { id: "F011", note: "Send CXO search capability deck to Vikram", dueDate: d(1), done: false, snoozedTo: null },
    ],
  },
];

/* ═══ HELPERS ═══ */
const fmtDate = (ds: string): string => { if (!ds) return "—"; const dt = new Date(ds); return dt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }); };
const fmtShort = (ds: string): string => { if (!ds) return "—"; return new Date(ds).toLocaleDateString("en-IN", { day: "numeric", month: "short" }); };
const daysBetween = (a: string, b: string): number => Math.round((new Date(b).getTime() - new Date(a).getTime()) / dayMs);
const isOverdue = (ds: string): boolean => !!ds && new Date(ds) < now;
const today: string = now.toISOString().split("T")[0];

function Badge({ status }: { status: string }) {
  const m = STATUS_META[status] || STATUS_META["Warm"];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: m.bg, color: m.color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: m.dot }} />
      {status}
    </span>
  );
}

/* NAV constant removed — all sections are now stacked on one scrollable page */

/* ═══════════════════════════════════
   DASHBOARD
   ═══════════════════════════════════ */
interface DashboardProps {
  leads: Lead[];
  goTo: (section: string) => void;
  onSelect: (id: string) => void;
}

function Dashboard({ leads, goTo, onSelect }: DashboardProps) {
  const [expandedMeeting, setExpandedMeeting] = useState<string | null>(null);
  const totalMeetings = leads.length;
  const warm = leads.filter(l => l.status === "Warm").length;
  const hot = leads.filter(l => l.status === "Hot" && !l.converted).length;
  const converted = leads.filter(l => l.converted).length;
  const rate = totalMeetings ? ((converted / totalMeetings) * 100).toFixed(0) : "0";
  const allFups = leads.flatMap(l => l.followUps || []);
  const overdueFups = allFups.filter(f => !f.done && isOverdue(f.dueDate));
  const proposalsSent = leads.filter(l => ["Sent", "Viewed", "Accepted"].includes(l.proposal?.status)).length;

  const kpis: KPI[] = [
    { label: "Total Meetings", value: totalMeetings },
    { label: "Warm Leads", value: warm },
    { label: "Hot Leads", value: hot },
    { label: "Converted", value: converted },
    { label: "Conversion Rate", value: rate + "%" },
    { label: "Proposals Sent", value: proposalsSent },
  ];

  const recentMeetings = [...leads].sort((a, b) => new Date(b.meetingDate).getTime() - new Date(a.meetingDate).getTime()).slice(0, 6);
  const pipeSegs: PipeSegment[] = [
    { s: "No Potential", c: "#c5cad3" }, { s: "Warm", c: "#d4bf8e" }, { s: "Hot", c: "#c9908a" }, { s: "Converted", c: "#8bbfa3" },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800">BD Dashboard</h2>
      <p className="text-sm text-gray-500 mt-0.5 mb-5">Overview of your business development pipeline</p>

      {/* KPI row */}
      <div className="grid grid-cols-6 gap-2.5 mb-6">
        {kpis.map(k => (
          <div key={k.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 relative">
            <div className="text-3xl font-bold text-gray-800 leading-none tabular-nums tracking-tight">{k.value}</div>
            <div className="text-xs text-gray-500 mt-1.5 font-medium">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Pipeline summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-5">
        <div className="text-sm font-semibold text-gray-800 mb-3.5">Pipeline Summary</div>
        <div className="flex gap-0.5 h-8 rounded-md overflow-hidden mb-2.5">
          {pipeSegs.map(({ s, c }) => {
            const count = s === "Converted" ? leads.filter(l => l.converted).length : leads.filter(l => l.status === s && !l.converted).length;
            const pct = totalMeetings ? (count / totalMeetings) * 100 : 0;
            return pct > 0 ? (
              <div key={s} className="flex items-center justify-center text-xs font-semibold text-white"
                style={{ width: pct + "%", background: c, minWidth: count > 0 ? 36 : 0 }}>
                {count}
              </div>
            ) : null;
          })}
        </div>
        <div className="flex gap-4 justify-center">
          {pipeSegs.map(({ s, c }) => (
            <span key={s} className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-sm" style={{ background: c }} />{s}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 mt-4">
          {pipeSegs.map(({ s }) => {
            const count = s === "Converted" ? leads.filter(l => l.converted).length : leads.filter(l => l.status === s && !l.converted).length;
            return (
              <div key={s} className="text-center">
                <div className="text-lg font-bold text-gray-800">{count}</div>
                <div className="text-[10px] text-gray-500">{s}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overdue follow-ups */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-5">
        <div className="flex justify-between items-center mb-3.5">
          <span className="text-sm font-semibold text-gray-800">Overdue Follow-ups</span>
          {overdueFups.length > 0 && <span className="text-xs font-semibold text-red-500 bg-red-50 rounded-full px-2.5 py-0.5">{overdueFups.length}</span>}
        </div>
        {overdueFups.length === 0 ? (
          <div className="text-sm text-gray-400 py-2">All caught up — no overdue items</div>
        ) : (
          overdueFups.slice(0, 5).map((f, i) => {
            const lead = leads.find(l => l.followUps?.some(fu => fu.id === f.id));
            return (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 text-sm">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800">{lead?.company}</div>
                  <div className="text-xs text-gray-500 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{f.note}</div>
                </div>
                <span className="text-xs font-semibold text-red-500 shrink-0 ml-3">{fmtShort(f.dueDate)}</span>
              </div>
            );
          })
        )}
        {overdueFups.length > 5 && <div className="text-xs text-teal-600 cursor-pointer mt-2 font-medium" onClick={() => goTo("followups")}>View all {overdueFups.length} overdue →</div>}
      </div>

      {/* Recent Meetings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <div className="flex justify-between items-center mb-3.5">
          <span className="text-sm font-semibold text-gray-800">Recent Meetings</span>
          <span className="text-xs text-teal-600 cursor-pointer font-medium" onClick={() => goTo("meetings")}>View all →</span>
        </div>
        {recentMeetings.map(l => {
          const isExpanded = expandedMeeting === l.id;
          const agendas = l.discussions?.filter(dd => dd.type === "agenda") || [];
          const objections = l.discussions?.filter(dd => dd.type === "objection") || [];
          const pendFups = (l.followUps || []).filter(f => !f.done);
          return (
            <div key={l.id} className="border-b border-gray-100">
              <div onClick={() => setExpandedMeeting(isExpanded ? null : l.id)}
                className="flex justify-between items-center py-2.5 cursor-pointer">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 shrink-0">
                    {l.company.split(" ").map(w => w[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-800">{l.company}</div>
                    <div className="text-xs text-gray-500">{l.person} · {l.designation}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <Badge status={l.converted ? "Converted" : l.status} />
                  <span className="text-xs text-gray-400">{fmtShort(l.meetingDate)}</span>
                  <span className="text-sm text-gray-400 transition-transform duration-200" style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}>›</span>
                </div>
              </div>
              {isExpanded && (
                <div className="pb-3.5 pl-12">
                  <div className="grid grid-cols-2 gap-3.5 p-4 bg-gray-50 rounded-lg text-xs">
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-1.5">CONTACT</div>
                      <div className="leading-7 text-gray-800">
                        <div>✉ {l.email}</div>
                        <div>☎ {l.phone}</div>
                        {l.location && <div>⌖ {l.location} · {l.industry}</div>}
                        <div className="text-gray-500">BD: {l.bdOwner} · Via {l.source}</div>
                      </div>
                      {agendas.length > 0 && (
                        <div className="mt-2.5">
                          <div className="text-xs font-semibold text-gray-500 mb-1">DISCUSSION</div>
                          {agendas.map((a, i) => <div key={i} className="text-gray-700 mb-0.5">• {a.text}</div>)}
                        </div>
                      )}
                      {objections.length > 0 && (
                        <div className="mt-1.5">
                          <div className="text-xs font-semibold text-red-500 mb-0.5">OBJECTIONS</div>
                          {objections.map((o, i) => <div key={i} className="text-gray-500">– {o.text}</div>)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-1.5">PROPOSAL</div>
                      <div className={`mb-2 ${l.proposal?.status === "Not Created" ? "text-gray-400" : "text-gray-800"}`}>
                        {l.proposal?.status === "Not Created" ? "No proposal yet" : (
                          <div><span className="font-semibold">{l.proposal.title}</span> <span className="text-xs text-gray-500">({l.proposal.status})</span></div>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-gray-500 mb-1">COMMERCIALS</div>
                      <div className={`mb-2 ${l.commercials?.quotedAmount ? "font-semibold text-gray-800" : "text-gray-400"}`}>
                        {l.commercials?.quotedAmount || "Not quoted"}
                        {l.commercials?.pricingModel && <span className="font-normal text-gray-500"> · {l.commercials.pricingModel}</span>}
                      </div>
                      {pendFups.length > 0 && (
                        <div>
                          <div className="text-xs font-semibold text-gray-500 mb-1">PENDING FOLLOW-UPS</div>
                          {pendFups.map((f, i) => (
                            <div key={i} className="flex justify-between mb-0.5">
                              <span className="text-gray-700">• {f.note}</span>
                              <span className={`text-xs font-semibold shrink-0 ml-2 ${isOverdue(f.dueDate) ? "text-red-500" : "text-gray-500"}`}>{fmtShort(f.dueDate)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <button onClick={(e) => { e.stopPropagation(); onSelect(l.id); }}
                        className="mt-2.5 px-3.5 py-1 text-xs font-semibold border border-gray-200 rounded-md bg-white text-teal-600 cursor-pointer hover:bg-gray-50">
                        Open full detail →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   MEETINGS TAB
   ═══════════════════════════════════ */
interface MeetingsTabProps {
  leads: Lead[];
  onSelect: (id: string) => void;
  onNew: () => void;
}

function MeetingsTab({ leads, onSelect, onNew }: MeetingsTabProps) {
  const [search, setSearch] = useState("");
  const [filterOwner, setFilterOwner] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const filtered = leads.filter(l => {
    if (search && !l.company.toLowerCase().includes(search.toLowerCase()) && !l.person.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterOwner !== "All" && l.bdOwner !== filterOwner) return false;
    if (filterType !== "All" && l.meetingType !== filterType) return false;
    return true;
  });
  const sorted = [...filtered].sort((a, b) => new Date(b.meetingDate).getTime() - new Date(a.meetingDate).getTime());

  const totalMeetings = leads.length;
  const warm = leads.filter(l => l.status === "Warm").length;
  const hot = leads.filter(l => l.status === "Hot" && !l.converted).length;
  const converted = leads.filter(l => l.converted).length;
  const rate = totalMeetings ? ((converted / totalMeetings) * 100).toFixed(0) : "0";
  const proposalsSent = leads.filter(l => ["Sent", "Viewed", "Accepted"].includes(l.proposal?.status)).length;

  const kpis: KPI[] = [
    { label: "Total Meetings", value: totalMeetings },
    { label: "Warm Leads", value: warm },
    { label: "Hot Leads", value: hot },
    { label: "Converted", value: converted },
    { label: "Conversion Rate", value: rate + "%" },
    { label: "Proposals Sent", value: proposalsSent },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div><h2 className="text-lg font-bold text-gray-800">Meeting Log</h2><p className="text-sm text-gray-500 mt-0.5">Who did we meet — every BD interaction</p></div>
        <button onClick={onNew} className="px-4 py-2 text-xs font-semibold rounded-md bg-teal-600 text-white hover:bg-teal-700">+ Log Meeting</button>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-6 gap-2.5 mb-6">
        {kpis.map(k => (
          <div key={k.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 relative">
            <div className="text-3xl font-bold text-gray-800 leading-none tabular-nums tracking-tight">{k.value}</div>
            <div className="text-xs text-gray-500 mt-1.5 font-medium">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Pipeline summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-5">
        <div className="text-sm font-semibold text-gray-800 mb-3.5">Pipeline Summary</div>
        <div className="flex gap-0.5 h-8 rounded-md overflow-hidden mb-2.5">
          {[
            { s: "No Potential", c: "#c5cad3" }, { s: "Warm", c: "#d4bf8e" }, { s: "Hot", c: "#c9908a" }, { s: "Converted", c: "#8bbfa3" },
          ].map(({ s, c }) => {
            const totalMeetings = leads.length;
            const count = s === "Converted" ? leads.filter(l => l.converted).length : leads.filter(l => l.status === s && !l.converted).length;
            const pct = totalMeetings ? (count / totalMeetings) * 100 : 0;
            return pct > 0 ? (
              <div key={s} className="flex items-center justify-center text-xs font-semibold text-white"
                style={{ width: pct + "%", background: c, minWidth: count > 0 ? 36 : 0 }}>
                {count}
              </div>
            ) : null;
          })}
        </div>
        <div className="flex gap-4 justify-center">
          {[
            { s: "No Potential", c: "#c5cad3" }, { s: "Warm", c: "#d4bf8e" }, { s: "Hot", c: "#c9908a" }, { s: "Converted", c: "#8bbfa3" },
          ].map(({ s, c }) => (
            <span key={s} className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-sm" style={{ background: c }} />{s}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 mt-4">
          {[
            { s: "No Potential", c: "#c5cad3" }, { s: "Warm", c: "#d4bf8e" }, { s: "Hot", c: "#c9908a" }, { s: "Converted", c: "#8bbfa3" },
          ].map(({ s }) => {
            const count = s === "Converted" ? leads.filter(l => l.converted).length : leads.filter(l => l.status === s && !l.converted).length;
            return (
              <div key={s} className="text-center">
                <div className="text-lg font-bold text-gray-800">{count}</div>
                <div className="text-[10px] text-gray-500">{s}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2.5 mb-3.5">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search company or person..." className="w-full max-w-[260px] px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border" />
        <select value={filterOwner} onChange={e => setFilterOwner(e.target.value)} className="w-40 px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border">
          <option value="All">All BD Owners</option>
          {BD_OWNERS.map(o => <option key={o}>{o}</option>)}
        </select>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-36 px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border">
          <option value="All">All Types</option>
          {MEETING_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
        <div className="text-xs text-gray-500 self-center">{sorted.length} meeting{sorted.length !== 1 ? "s" : ""}</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="w-full border-collapse">
          <thead><tr>
            {["Date", "Type", "Company", "Person", "Designation", "BD Owner", "Source", "Status", ""].map(h => <th key={h} className="text-left px-3 py-2 font-semibold text-gray-500 text-xs border-b-2 border-gray-200 bg-gray-50">{h}</th>)}
          </tr></thead>
          <tbody>
            {sorted.map(l => (
              <tr key={l.id} onClick={() => onSelect(l.id)} className="cursor-pointer hover:bg-gray-50">
                <td className="px-3 py-2.5 border-b border-gray-100 text-sm">{fmtShort(l.meetingDate)}</td>
                <td className="px-3 py-2.5 border-b border-gray-100 text-sm">
                  <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${l.meetingType === "In-person" ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-600"}`}>{l.meetingType}</span>
                </td>
                <td className="px-3 py-2.5 border-b border-gray-100 text-sm font-semibold">{l.company}</td>
                <td className="px-3 py-2.5 border-b border-gray-100 text-sm">{l.person}</td>
                <td className="px-3 py-2.5 border-b border-gray-100 text-sm text-gray-500">{l.designation}</td>
                <td className="px-3 py-2.5 border-b border-gray-100 text-xs">{l.bdOwner}</td>
                <td className="px-3 py-2.5 border-b border-gray-100 text-xs text-gray-500">{l.source}</td>
                <td className="px-3 py-2.5 border-b border-gray-100 text-sm"><Badge status={l.converted ? "Converted" : l.status} /></td>
                <td className="px-3 py-2.5 border-b border-gray-100 text-sm text-gray-300 text-right">›</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   INLINE COMPONENTS
   ═══════════════════════════════════ */
interface InlineAddProps {
  placeholder: string;
  buttonLabel?: string;
  onAdd: (value: string) => void;
  multiline?: boolean;
}

function InlineAdd({ placeholder, buttonLabel, onAdd, multiline }: InlineAddProps) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  if (!open) return <button onClick={() => setOpen(true)} className="text-xs font-semibold px-3 py-1 border border-dashed border-gray-200 rounded-md bg-transparent text-teal-600 cursor-pointer mt-1.5 hover:border-teal-600">+ {buttonLabel || "Add"}</button>;
  return (
    <div className="mt-2 flex flex-col gap-1.5">
      {multiline ? (
        <textarea value={val} onChange={e => setVal(e.target.value)} placeholder={placeholder} rows={2} className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border resize-y" autoFocus />
      ) : (
        <input value={val} onChange={e => setVal(e.target.value)} placeholder={placeholder} className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border" autoFocus onKeyDown={e => { if (e.key === "Enter" && val.trim()) { onAdd(val.trim()); setVal(""); setOpen(false); } }} />
      )}
      <div className="flex gap-1.5">
        <button onClick={() => { if (val.trim()) { onAdd(val.trim()); setVal(""); setOpen(false); } }} className="px-4 py-2 text-xs font-semibold rounded-md bg-teal-600 text-white hover:bg-teal-700">Add</button>
        <button onClick={() => { setVal(""); setOpen(false); }} className="px-4 py-2 text-xs font-semibold rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200">Cancel</button>
      </div>
    </div>
  );
}

interface InlineFieldEditProps {
  label: string;
  value: string;
  onSave: (value: string) => void;
  multiline?: boolean;
}

function InlineFieldEdit({ label, value, onSave, multiline }: InlineFieldEditProps) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value || "");
  if (!editing) return (
    <div className="flex justify-between items-start gap-2">
      <div className={`text-sm ${value ? "text-gray-800" : "text-gray-400 italic"}`}>{value || `No ${label.toLowerCase()} yet`}</div>
      <button onClick={() => { setVal(value || ""); setEditing(true); }} className="text-xs font-semibold px-2.5 py-0.5 border border-gray-200 rounded bg-white text-teal-600 cursor-pointer shrink-0 hover:bg-gray-50">{value ? "Edit" : "+ Add"}</button>
    </div>
  );
  return (
    <div className="flex flex-col gap-1.5">
      {multiline ? (
        <textarea value={val} onChange={e => setVal(e.target.value)} rows={3} className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border resize-y" autoFocus />
      ) : (
        <input value={val} onChange={e => setVal(e.target.value)} className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border" autoFocus />
      )}
      <div className="flex gap-1.5">
        <button onClick={() => { onSave(val); setEditing(false); }} className="px-4 py-2 text-xs font-semibold rounded-md bg-teal-600 text-white hover:bg-teal-700">Save</button>
        <button onClick={() => setEditing(false)} className="px-4 py-2 text-xs font-semibold rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200">Cancel</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   LEAD DETAIL VIEW
   ═══════════════════════════════════ */
interface LeadDetailProps {
  lead: Lead;
  onUpdate: (id: string, field: string, value: any) => void;
  onBack: () => void;
}

function LeadDetail({ lead, onUpdate, onBack }: LeadDetailProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const sections = ["overview", "discussion", "proposal", "commercials", "followups"] as const;
  const sectionLabels: Record<string, string> = { overview: "Overview", discussion: "Discussion Pointers", proposal: "Proposal", commercials: "Commercials", followups: "Follow-ups" };

  const agendas = lead.discussions?.filter(d => d.type === "agenda") || [];
  const reqs = lead.discussions?.filter(d => d.type === "requirements") || [];
  const objections = lead.discussions?.filter(d => d.type === "objection") || [];
  const nextSteps = lead.discussions?.filter(d => d.type === "nextStep") || [];
  const internal = lead.discussions?.filter(d => d.type === "internal") || [];

  const daysInPipeline = daysBetween(lead.meetingDate, today);
  const pendingFups = (lead.followUps || []).filter(f => !f.done);
  const overdueFups = pendingFups.filter(f => isOverdue(f.dueDate));

  return (
    <div>
      <button onClick={onBack} className="text-xs text-teal-600 bg-transparent border-none cursor-pointer font-semibold mb-3.5 p-0 hover:underline">← Back</button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-gray-800">{lead.company}</h2>
              <Badge status={lead.converted ? "Converted" : lead.status} />
            </div>
            <p className="mt-1 text-sm text-gray-700">{lead.person} — {lead.designation}</p>
            <div className="flex gap-5 mt-2 text-xs text-gray-500">
              <span>✉ {lead.email}</span>
              <span>☎ {lead.phone}</span>
              {lead.linkedin && <span className="text-teal-600">⌘ LinkedIn</span>}
              {lead.location && <span>⌖ {lead.location}</span>}
            </div>
          </div>
          <div className="text-right text-xs">
            <div className="text-gray-500">BD Owner: <span className="text-gray-800 font-semibold">{lead.bdOwner}</span></div>
            <div className="text-gray-500 mt-0.5">Source: {lead.source} · {lead.meetingType}</div>
            <div className="text-gray-500 mt-0.5">Met {fmtDate(lead.meetingDate)} · {daysInPipeline}d in pipeline</div>
            {!lead.converted && lead.status !== "No Potential" && (
              <select value={lead.status} onChange={e => onUpdate(lead.id, "status", e.target.value)}
                className="w-auto mt-1.5 text-xs px-2 py-1 border border-gray-200 rounded-md font-inherit box-border">
                {STATUSES.filter(s => s !== "Converted").map(s => <option key={s}>{s}</option>)}
              </select>
            )}
          </div>
        </div>
        {overdueFups.length > 0 && (
          <div className="mt-3 px-3 py-2 bg-red-50 border border-red-200 rounded-md text-xs text-red-500 font-semibold">
            ⚠ {overdueFups.length} overdue follow-up{overdueFups.length > 1 ? "s" : ""}
          </div>
        )}
        {lead.status === "Warm" && daysInPipeline > 14 && !lead.converted && (
          <div className="mt-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-600 font-semibold">
            ⏳ Warm for {daysInPipeline} days — consider escalating or scheduling next meeting
          </div>
        )}
      </div>

      <div className="flex gap-0 mb-4 border-b-2 border-gray-200">
        {sections.map(s => (
          <button key={s} onClick={() => setActiveSection(s)}
            className={`px-4 py-2 text-xs font-semibold border-none cursor-pointer bg-transparent border-b-2 -mb-0.5 transition-colors ${
              activeSection === s ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-500 border-b-2 border-transparent"
            }`}>
            {sectionLabels[s]}
          </button>
        ))}
      </div>

      {activeSection === "overview" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-xs font-bold text-gray-500 tracking-wide mb-2.5">Quick Summary</div>
            <div className="text-sm leading-7">
              <div><span className="text-gray-500">Industry:</span> {lead.industry}</div>
              <div><span className="text-gray-500">Service Line:</span> {lead.proposal?.serviceLine || "TBD"}</div>
              <div><span className="text-gray-500">Proposal:</span> <span className={`font-semibold ${lead.proposal?.status === "Not Created" ? "text-gray-300" : "text-teal-600"}`}>{lead.proposal?.status}</span></div>
              <div><span className="text-gray-500">Commercials:</span> {lead.commercials?.quotedAmount || "Not quoted"}</div>
              <div><span className="text-gray-500">Pending follow-ups:</span> <span className={`font-semibold ${pendingFups.length > 0 ? "text-amber-600" : "text-emerald-600"}`}>{pendingFups.length}</span></div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-xs font-bold text-gray-500 tracking-wide mb-2.5">Key Discussion Points</div>
            {agendas.map((a, i) => <div key={i} className="text-sm mb-1 text-gray-700">• {a.text}</div>)}
            {objections.length > 0 && (
              <div className="mt-2">
                <div className="text-xs font-semibold text-red-500 mb-0.5">Objections</div>
                {objections.map((o, i) => <div key={i} className="text-xs text-gray-500">– {o.text}</div>)}
              </div>
            )}
          </div>
          {lead.converted && lead.conversion && (
            <div className="bg-emerald-50 rounded-lg border border-emerald-200 p-4 col-span-full">
              <div className="text-xs font-bold text-emerald-600 tracking-wide mb-2.5">Conversion Details</div>
              <div className="grid grid-cols-4 gap-3 text-sm">
                <div><span className="text-gray-500 text-xs">Deal Value</span><div className="font-bold">{lead.conversion.dealValue}</div></div>
                <div><span className="text-gray-500 text-xs">Service Line</span><div>{lead.conversion.serviceLine}</div></div>
                <div><span className="text-gray-500 text-xs">Contract Start</span><div>{fmtDate(lead.conversion.contractStart)}</div></div>
                <div><span className="text-gray-500 text-xs">Source</span><div>{lead.conversion.source}</div></div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeSection === "discussion" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-xs font-bold text-gray-500 tracking-wide mb-2.5">Agenda / Topics Discussed</div>
            {agendas.map((a, i) => <div key={i} className="text-sm mb-1.5 leading-relaxed">• {a.text}</div>)}
            {agendas.length === 0 && <div className="text-xs text-gray-400">No agenda items logged</div>}
            <InlineAdd placeholder="Add a discussion point..." buttonLabel="Add Discussion" onAdd={(text) => onUpdate(lead.id, "addDiscussion", { type: "agenda", text })} />
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-xs font-bold text-gray-500 tracking-wide mb-2.5">Client Requirements</div>
            {reqs.map((r, i) => (
              <div key={i} className="mb-2">
                <div className="text-sm leading-relaxed">{r.text}</div>
                {r.tags && <div className="flex gap-1 mt-1 flex-wrap">{r.tags.map(t => <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-teal-600 font-semibold">{t}</span>)}</div>}
              </div>
            ))}
            {reqs.length === 0 && <div className="text-xs text-gray-400">No requirements captured</div>}
            <InlineAdd placeholder="Add a requirement..." buttonLabel="Add Requirement" onAdd={(text) => onUpdate(lead.id, "addDiscussion", { type: "requirements", text, tags: [] })} />
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-xs font-bold text-red-500 tracking-wide mb-2.5">Key Objections / Concerns</div>
            {objections.map((o, i) => <div key={i} className="text-sm mb-1.5 text-gray-600">⚑ {o.text}</div>)}
            {objections.length === 0 && <div className="text-xs text-gray-400">None captured</div>}
            <InlineAdd placeholder="Add an objection or concern..." buttonLabel="Add Objection" onAdd={(text) => onUpdate(lead.id, "addDiscussion", { type: "objection", text })} />
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-xs font-bold text-gray-500 tracking-wide mb-2.5">Agreed Next Steps</div>
            {nextSteps.map((n, i) => (
              <div key={i} className="flex gap-2 items-start py-1.5 border-b border-gray-50 text-xs">
                <span className="w-4 h-4 rounded-sm shrink-0 mt-0.5 flex items-center justify-center text-white text-[10px]"
                  style={{ border: `2px solid ${n.done ? "#5a9a7a" : "#e8eaef"}`, background: n.done ? "#5a9a7a" : "#fff" }}>{n.done ? "✓" : ""}</span>
                <div className="flex-1">
                  <div className={n.done ? "text-gray-400 line-through" : "text-gray-800"}>{n.text}</div>
                  <div className="text-xs text-gray-500">{n.assignee} · Due {fmtShort(n.dueDate || "")}</div>
                </div>
              </div>
            ))}
            <InlineAdd placeholder="Add a next step..." buttonLabel="Add Next Step" onAdd={(text) => onUpdate(lead.id, "addDiscussion", { type: "nextStep", text, assignee: lead.bdOwner, dueDate: today, done: false })} />
          </div>
          <div className="bg-amber-50 rounded-lg border border-amber-200 p-4 col-span-full">
            <div className="text-xs font-bold text-amber-600 tracking-wide mb-2.5">Internal Notes (not client-facing)</div>
            {internal.map((n, i) => <div key={i} className="text-sm text-amber-800 leading-relaxed mb-1">🔒 {n.text}</div>)}
            {internal.length === 0 && <div className="text-xs text-amber-300">No internal notes</div>}
            <InlineAdd placeholder="Add an internal note..." buttonLabel="Add Note" onAdd={(text) => onUpdate(lead.id, "addDiscussion", { type: "internal", text })} multiline />
          </div>
        </div>
      )}

      {activeSection === "proposal" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          {lead.proposal?.status === "Not Created" ? (
            <div className="text-center py-8">
              <div className="text-sm text-gray-400 mb-3">No proposal created for this lead</div>
              <button className="px-4 py-2 text-xs font-semibold rounded-md bg-teal-600 text-white hover:bg-teal-700" onClick={() => onUpdate(lead.id, "proposalStatus", "Draft")}>Create Proposal</button>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-base font-bold">{lead.proposal.title || "Untitled Proposal"}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{lead.proposal.version || "v1"} · {lead.proposal.serviceLine || "No service line"}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded ${
                    lead.proposal.status === "Accepted" ? "bg-emerald-50 text-emerald-600" :
                    lead.proposal.status === "Sent" || lead.proposal.status === "Viewed" ? "bg-blue-50 text-teal-600" :
                    lead.proposal.status === "Rejected" ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-500"
                  }`}>{lead.proposal.status}{lead.proposal.viewCount > 0 ? ` · ${lead.proposal.viewCount} views` : ""}</span>
                  <select value={lead.proposal.status} onChange={e => onUpdate(lead.id, "proposalStatus", e.target.value)}
                    className="w-auto text-xs px-2 py-1 border border-gray-200 rounded-md font-inherit box-border">
                    {PROPOSAL_STATUSES.filter(s => s !== "Not Created").map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm leading-7">
                <div><div className="text-xs font-bold text-gray-500 tracking-wide mb-2.5">Title</div><InlineFieldEdit label="Title" value={lead.proposal.title} onSave={(v) => onUpdate(lead.id, "proposalTitle", v)} /></div>
                <div><div className="text-xs font-bold text-gray-500 tracking-wide mb-2.5">Service Line</div><InlineFieldEdit label="Service Line" value={lead.proposal.serviceLine} onSave={(v) => onUpdate(lead.id, "proposalServiceLine", v)} /></div>
                <div><div className="text-xs font-bold text-gray-500 tracking-wide mb-2.5">Scope</div><InlineFieldEdit label="Scope" value={lead.proposal.scope} onSave={(v) => onUpdate(lead.id, "proposalScope", v)} multiline /></div>
                <div><div className="text-xs font-bold text-gray-500 tracking-wide mb-2.5">Deliverables</div><InlineFieldEdit label="Deliverables" value={lead.proposal.deliverables} onSave={(v) => onUpdate(lead.id, "proposalDeliverables", v)} multiline /></div>
              </div>
              {lead.proposal.approver && (
                <div className="mt-3.5 px-3 py-2.5 bg-gray-50 rounded-md text-xs text-gray-500">
                  Approved by <span className="font-semibold text-gray-800">{lead.proposal.approver}</span> on {fmtDate(lead.proposal.approvedDate)}
                  {lead.proposal.sentDate && <span> · Sent {fmtDate(lead.proposal.sentDate)}</span>}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeSection === "commercials" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-xs font-bold text-gray-500 tracking-wide mb-2.5">Terms</div>
            <div className="flex flex-col gap-3">
              <div><div className="text-xs font-semibold text-gray-500 mb-1">Pricing Model</div>
                <select value={lead.commercials?.pricingModel || ""} onChange={e => onUpdate(lead.id, "commercialField", { field: "pricingModel", value: e.target.value })} className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border">
                  <option value="">Select...</option>{PRICING_MODELS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div><div className="text-xs font-semibold text-gray-500 mb-1">Quoted Amount</div><InlineFieldEdit label="Amount" value={lead.commercials?.quotedAmount} onSave={(v) => onUpdate(lead.id, "commercialField", { field: "quotedAmount", value: v })} /></div>
              <div><div className="text-xs font-semibold text-gray-500 mb-1">Discount</div><InlineFieldEdit label="Discount" value={lead.commercials?.discount} onSave={(v) => onUpdate(lead.id, "commercialField", { field: "discount", value: v })} /></div>
              <div><div className="text-xs font-semibold text-gray-500 mb-1">Payment Terms</div><InlineFieldEdit label="Payment terms" value={lead.commercials?.paymentTerms} onSave={(v) => onUpdate(lead.id, "commercialField", { field: "paymentTerms", value: v })} /></div>
              <div><div className="text-xs font-semibold text-gray-500 mb-1">Contract Duration</div><InlineFieldEdit label="Duration" value={lead.commercials?.contractDuration} onSave={(v) => onUpdate(lead.id, "commercialField", { field: "contractDuration", value: v })} /></div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-xs font-bold text-gray-500 tracking-wide mb-2.5">Negotiation Log</div>
            {(lead.commercials?.negotiationLog || []).map((n, i) => (
              <div key={i} className="py-2 border-b border-gray-50">
                <div className="text-xs text-gray-500 mb-0.5">{fmtDate(n.date)}</div>
                <div className="text-sm">{n.note}</div>
              </div>
            ))}
            {(lead.commercials?.negotiationLog || []).length === 0 && <div className="text-xs text-gray-400 mb-1.5">No negotiation entries yet</div>}
            <InlineAdd placeholder="Add a negotiation note..." buttonLabel="Add Entry" multiline onAdd={(text) => onUpdate(lead.id, "addNegotiationLog", { date: today, note: text })} />
          </div>
        </div>
      )}

      {activeSection === "followups" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-3.5">
            <div className="text-xs font-bold text-gray-500 tracking-wide mb-2.5">Follow-ups for {lead.company}</div>
          </div>
          {(lead.followUps || []).length === 0 && <div className="text-sm text-gray-400 py-2.5">No follow-ups yet</div>}
          {[...(lead.followUps || [])].sort((a, b) => (a.done ? 1 : 0) - (b.done ? 1 : 0) || new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).map((f, i) => (
            <div key={i} className="flex items-center gap-2.5 py-2.5 border-b border-gray-100">
              <input type="checkbox" checked={f.done} onChange={() => onUpdate(lead.id, "toggleFollowUp", i)} className="w-4 h-4 accent-teal-600 cursor-pointer" />
              <div className="flex-1">
                <div className={`text-sm font-medium ${f.done ? "text-gray-300 line-through" : "text-gray-800"}`}>{f.note}</div>
              </div>
              <span className={`text-xs font-semibold ${f.done ? "text-gray-300" : isOverdue(f.dueDate) ? "text-red-500" : "text-gray-500"}`}>{fmtShort(f.dueDate)}</span>
              {!f.done && isOverdue(f.dueDate) && <span className="text-[10px] font-semibold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">OVERDUE</span>}
            </div>
          ))}
          <InlineAdd placeholder="Follow-up task..." buttonLabel="Add Follow-up" onAdd={(text) => {
            const dd = prompt("Due date (YYYY-MM-DD):", today);
            if (dd) onUpdate(lead.id, "addFollowUp", { id: "F" + Date.now(), note: text, dueDate: dd, done: false, snoozedTo: null });
          }} />
        </div>
      )}

      {!lead.converted && lead.status !== "No Potential" && activeSection === "overview" && (
        <button onClick={() => onUpdate(lead.id, "convert", null)} className="mt-4 px-6 py-3 text-sm font-semibold rounded-md bg-emerald-600 text-white hover:bg-emerald-700">
          Mark as Client Converted ✓
        </button>
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   PIPELINE (KANBAN)
   ═══════════════════════════════════ */
interface PipelineTabProps {
  leads: Lead[];
  onSelect: (id: string) => void;
}

function PipelineTab({ leads, onSelect }: PipelineTabProps) {
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const cols = ["No Potential", "Warm", "Hot"].map(s => ({ status: s, items: leads.filter(l => l.status === s && !l.converted) }));

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div><h2 className="text-lg font-bold text-gray-800">Lead Pipeline</h2><p className="text-sm text-gray-500 mt-0.5">Track leads from first contact to conversion</p></div>
        <div className="flex border border-gray-200 rounded-md overflow-hidden">
          {(["kanban", "list"] as const).map(v => (
            <button key={v} onClick={() => setView(v)} className={`px-3.5 py-1 text-xs font-semibold border-none cursor-pointer ${view === v ? "bg-teal-600 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}>{v === "kanban" ? "Kanban" : "List"}</button>
          ))}
        </div>
      </div>

      {view === "kanban" ? (
        <div className="grid grid-cols-3 gap-4 items-start">
          {cols.map(col => (
            <div key={col.status}>
              <div className="flex items-center gap-1.5 mb-2.5">
                <span className="w-2 h-2 rounded-full" style={{ background: STATUS_META[col.status].dot }} />
                <span className="text-xs font-bold text-gray-700">{col.status}</span>
                <span className="text-xs text-gray-500">({col.items.length})</span>
              </div>
              <div className="flex flex-col gap-2">
                {col.items.map(l => {
                  const dip = daysBetween(l.meetingDate, today);
                  const aging = col.status === "Warm" && dip > 14 ? "warn" : col.status === "Hot" && dip > 7 ? "urgent" : null;
                  return (
                    <div key={l.id} onClick={() => onSelect(l.id)} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 cursor-pointer hover:shadow-md transition-shadow"
                      style={{ borderLeft: aging === "urgent" ? "3px solid #b85c5c" : aging === "warn" ? "3px solid #b8956a" : "3px solid transparent" }}>
                      <div className="font-semibold text-sm">{l.company}</div>
                      <div className="text-xs text-gray-500">{l.person} · {l.designation}</div>
                      <div className="flex justify-between mt-2 text-xs">
                        <span className="text-gray-500">{dip}d ago</span>
                        <span className={`font-semibold ${l.proposal?.status === "Not Created" ? "text-gray-300" : "text-teal-600"}`}>{l.proposal?.status === "Not Created" ? "No proposal" : l.proposal?.status}</span>
                      </div>
                      {l.commercials?.quotedAmount && <div className="text-xs text-gray-600 mt-1">{l.commercials.quotedAmount}</div>}
                      {(l.followUps || []).filter(f => !f.done).length > 0 && (
                        <div className="text-xs text-amber-600 font-semibold mt-1">{(l.followUps || []).filter(f => !f.done).length} pending</div>
                      )}
                    </div>
                  );
                })}
                {col.items.length === 0 && <div className="text-center py-5 text-gray-300 text-xs">Empty</div>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full border-collapse">
            <thead><tr>{["Company", "Person", "Status", "Days", "Proposal", "Commercials", "Follow-ups"].map(h => <th key={h} className="text-left px-3 py-2 font-semibold text-gray-500 text-xs border-b-2 border-gray-200 bg-gray-50">{h}</th>)}</tr></thead>
            <tbody>
              {leads.filter(l => !l.converted).map(l => (
                <tr key={l.id} onClick={() => onSelect(l.id)} className="cursor-pointer hover:bg-gray-50">
                  <td className="px-3 py-2.5 border-b border-gray-100 text-sm font-semibold">{l.company}</td>
                  <td className="px-3 py-2.5 border-b border-gray-100 text-sm">{l.person}</td>
                  <td className="px-3 py-2.5 border-b border-gray-100 text-sm"><Badge status={l.status} /></td>
                  <td className="px-3 py-2.5 border-b border-gray-100 text-sm">{daysBetween(l.meetingDate, today)}d</td>
                  <td className="px-3 py-2.5 border-b border-gray-100 text-xs">{l.proposal?.status}</td>
                  <td className="px-3 py-2.5 border-b border-gray-100 text-xs">{l.commercials?.quotedAmount || "—"}</td>
                  <td className="px-3 py-2.5 border-b border-gray-100 text-sm">{(l.followUps || []).filter(f => !f.done).length} pending</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   PROPOSALS TAB
   ═══════════════════════════════════ */
interface ProposalsTabProps {
  leads: Lead[];
  onSelect: (id: string) => void;
}

function ProposalsTab({ leads, onSelect }: ProposalsTabProps) {
  const [filterStatus, setFilterStatus] = useState("All");
  const withProposals = leads.filter(l => l.proposal?.status !== "Not Created");
  const without = leads.filter(l => l.proposal?.status === "Not Created" && !l.converted && l.status !== "No Potential");

  const statusGroups = ["Draft", "In Review", "Sent", "Viewed", "Accepted", "Rejected"];
  const counts: Record<string, number> = {};
  statusGroups.forEach(s => { counts[s] = withProposals.filter(l => l.proposal.status === s).length; });
  counts["All"] = withProposals.length;

  const filtered = filterStatus === "All" ? withProposals : withProposals.filter(l => l.proposal.status === filterStatus);

  const statusColor = (s: string): string => {
    if (s === "Accepted") return "text-emerald-600";
    if (s === "Rejected") return "text-red-500";
    if (s === "Sent" || s === "Viewed") return "text-teal-600";
    if (s === "In Review") return "text-amber-600";
    return "text-gray-500";
  };

  const statusColorRaw = (s: string): string => {
    if (s === "Accepted") return "#5a9a7a";
    if (s === "Rejected") return "#b85c5c";
    if (s === "Sent" || s === "Viewed") return "#0d9488";
    if (s === "In Review") return "#b8956a";
    return "#8494a7";
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div><h2 className="text-lg font-bold text-gray-800">Proposals</h2><p className="text-sm text-gray-500 mt-0.5">Track proposal creation, approval, and delivery</p></div>
        <div className="text-xs text-gray-500">{withProposals.length} total · {without.length} leads need a proposal</div>
      </div>

      <div className="flex gap-0 mb-4 border-b-2 border-gray-200">
        {["All", ...statusGroups].map(s => {
          const count = counts[s] || 0;
          const isActive = filterStatus === s;
          const clr = s === "All" ? "#0d9488" : statusColorRaw(s);
          return (
            <button key={s} onClick={() => setFilterStatus(s)}
              className="px-4 py-2 text-xs font-semibold border-none cursor-pointer bg-transparent -mb-0.5"
              style={{
                color: isActive ? clr : "#8494a7",
                borderBottom: isActive ? `2px solid ${clr}` : "2px solid transparent",
                opacity: (s !== "All" && count === 0) ? 0.35 : 1,
              }}>
              {s}{count > 0 ? ` (${count})` : ""}
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full border-collapse">
            <thead><tr>
              {["Company", "Proposal Title", "Service Line", "Status", "Commercials", ""].map(h => <th key={h} className="text-left px-3 py-2 font-semibold text-gray-500 text-xs border-b-2 border-gray-200 bg-gray-50">{h}</th>)}
            </tr></thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} onClick={() => onSelect(l.id)} className="cursor-pointer hover:bg-gray-50">
                  <td className="px-3 py-2.5 border-b border-gray-100 text-sm font-semibold">{l.company}</td>
                  <td className="px-3 py-2.5 border-b border-gray-100 text-sm">{l.proposal.title || "Untitled"}</td>
                  <td className="px-3 py-2.5 border-b border-gray-100 text-xs text-gray-500">{l.proposal.serviceLine || "—"}</td>
                  <td className="px-3 py-2.5 border-b border-gray-100 text-sm"><span className={`text-xs font-semibold ${statusColor(l.proposal.status)}`}>{l.proposal.status}</span></td>
                  <td className="px-3 py-2.5 border-b border-gray-100 text-xs">{l.commercials?.quotedAmount || "—"}</td>
                  <td className="px-3 py-2.5 border-b border-gray-100 text-sm text-gray-300 text-right">›</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-400 text-sm">
          {filterStatus === "All" ? "No proposals created yet" : `No proposals with status "${filterStatus}"`}
        </div>
      )}

      {without.length > 0 && (
        <div className="mt-6">
          <div className="text-xs font-bold text-gray-500 tracking-wide mb-2.5">Needs Proposal ({without.length})</div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {without.map(l => (
              <div key={l.id} onClick={() => onSelect(l.id)} className="flex justify-between items-center px-4 py-2.5 border-b border-gray-100 cursor-pointer text-sm hover:bg-gray-50">
                <div><span className="font-semibold">{l.company}</span> <span className="text-gray-500">— {l.person}</span></div>
                <div className="flex items-center gap-2">
                  <Badge status={l.status} />
                  <span className="text-xs text-gray-400">{fmtShort(l.meetingDate)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   FOLLOW-UPS TAB
   ═══════════════════════════════════ */
interface FollowUpsTabProps {
  leads: Lead[];
  onUpdate: (id: string, field: string, value: any) => void;
}

function FollowUpsTab({ leads, onUpdate }: FollowUpsTabProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"pending" | "completed">("pending");
  const all: FlatFollowUp[] = leads.flatMap(l => (l.followUps || []).map((f, i) => ({ ...f, leadId: l.id, idx: i, company: l.company, person: l.person, bdOwner: l.bdOwner, designation: l.designation, email: l.email, phone: l.phone, status: l.converted ? "Converted" : l.status, proposalStatus: l.proposal?.status, commercials: l.commercials?.quotedAmount })));
  const pending = all.filter(f => !f.done).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  const done = all.filter(f => f.done).sort((a, b) => new Date(b.completedDate || b.dueDate).getTime() - new Date(a.completedDate || a.dueDate).getTime());
  const overdue = pending.filter(f => isOverdue(f.dueDate));
  const escalated = overdue.filter(f => daysBetween(f.dueDate, today) > 2);

  function FollowUpRow({ f, i, isDone }: { f: FlatFollowUp; i: number; isDone: boolean }) {
    const fupKey = f.id || `${f.leadId}-${f.idx}`;
    const isExp = expandedId === fupKey;
    const daysOver = isOverdue(f.dueDate) ? daysBetween(f.dueDate, today) : 0;

    return (
      <div className="border-b border-gray-100">
        <div className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${isDone ? "opacity-55" : ""}`}
          onClick={() => setExpandedId(isExp ? null : fupKey)}>
          <input type="checkbox" checked={isDone} onChange={(e) => { e.stopPropagation(); onUpdate(f.leadId, "toggleFollowUp", f.idx); }}
            className="w-4 h-4 accent-teal-600 cursor-pointer shrink-0" />
          <div className="flex-1 min-w-0">
            <div className={`text-sm font-semibold ${isDone ? "text-gray-400 line-through" : "text-gray-800"}`}>{f.note}</div>
            <div className="text-xs text-gray-500 mt-0.5">{f.company} · {f.person} · {f.bdOwner}</div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {!isDone && daysOver > 0 && (
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${daysOver > 2 ? "text-white bg-red-500" : "text-red-500 bg-red-50"}`}>
                {daysOver}d overdue
              </span>
            )}
            <span className={`text-xs font-medium ${isDone ? "text-gray-400" : isOverdue(f.dueDate) ? "text-red-500" : "text-gray-500"}`}>{fmtShort(f.dueDate)}</span>
            <span className="text-sm text-gray-400 transition-transform duration-200" style={{ transform: isExp ? "rotate(90deg)" : "rotate(0deg)" }}>›</span>
          </div>
        </div>

        {isExp && (
          <div className="px-4 pb-4 pl-12">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-xs font-semibold text-gray-500 mb-1.5">LEAD INFORMATION</div>
                  <div className="leading-7 text-gray-800">
                    <div><span className="font-semibold">{f.company}</span></div>
                    <div>{f.person} — {f.designation}</div>
                    <div className="text-gray-500">✉ {f.email} · ☎ {f.phone}</div>
                    <div className="mt-1">
                      <span className="text-xs text-gray-500">Lead Status: </span>
                      <Badge status={f.status} />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 mb-1.5">FOLLOW-UP DETAILS</div>
                  <div className="leading-7 text-gray-800">
                    <div><span className="text-gray-500">Task:</span> {f.note}</div>
                    <div><span className="text-gray-500">Due:</span> <span className={`font-semibold ${isDone ? "text-gray-400" : isOverdue(f.dueDate) ? "text-red-500" : "text-gray-800"}`}>{fmtDate(f.dueDate)}</span></div>
                    <div><span className="text-gray-500">Assigned to:</span> {f.bdOwner}</div>
                    <div><span className="text-gray-500">Status:</span> <span className={`font-semibold ${isDone ? "text-emerald-600" : isOverdue(f.dueDate) ? "text-red-500" : "text-amber-600"}`}>{isDone ? "Completed" : isOverdue(f.dueDate) ? "Overdue" : "Pending"}</span></div>
                    {isDone && f.completedDate && <div><span className="text-gray-500">Completed:</span> {fmtDate(f.completedDate)}</div>}
                    <div className="mt-1">
                      <span className="text-gray-500">Proposal:</span> <span className="font-medium">{f.proposalStatus || "Not Created"}</span>
                      {f.commercials && <span className="text-gray-500"> · </span>}
                      {f.commercials && <span className="font-medium">{f.commercials}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800">Follow-up Tracker</h2>
      <p className="text-sm text-gray-500 mt-0.5 mb-4">Automated from discussion action items + manual tasks</p>

      {escalated.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3.5 mb-4">
          <div className="text-xs font-semibold text-red-500 mb-1.5">Escalation — {escalated.length} follow-up{escalated.length > 1 ? "s" : ""} overdue 2+ days</div>
          {escalated.map((f, i) => (
            <div key={i} className="text-xs text-red-800 mb-1 flex justify-between">
              <span>{f.company} — {f.note}</span>
              <span className="font-semibold shrink-0 ml-2">{daysBetween(f.dueDate, today)}d overdue · {f.bdOwner}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2.5 mb-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3.5 text-center">
          <div className="text-2xl font-bold text-gray-800">{pending.length}</div>
          <div className="text-xs text-gray-500 mt-0.5">Pending</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3.5 text-center">
          <div className="text-2xl font-bold text-gray-800">{overdue.length}</div>
          <div className="text-xs text-red-500 mt-0.5">Overdue</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3.5 text-center">
          <div className="text-2xl font-bold text-gray-800">{done.length}</div>
          <div className="text-xs text-emerald-600 mt-0.5">Completed</div>
        </div>
      </div>

      <div className="flex gap-0 mb-3.5 border-b-2 border-gray-200">
        {([{ key: "pending" as const, label: `Pending (${pending.length})` }, { key: "completed" as const, label: `Completed (${done.length})` }]).map(t => (
          <button key={t.key} onClick={() => { setActiveView(t.key); setExpandedId(null); }}
            className={`px-5 py-2 text-xs font-semibold border-none cursor-pointer bg-transparent -mb-0.5 border-b-2 ${
              activeView === t.key ? "text-teal-600 border-teal-600" : "text-gray-500 border-transparent"
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {activeView === "pending" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {pending.length === 0 ? (
            <div className="p-7 text-center text-gray-400 text-sm">All caught up — no pending follow-ups</div>
          ) : (
            pending.map((f, i) => <FollowUpRow key={f.id || i} f={f} i={i} isDone={false} />)
          )}
        </div>
      )}

      {activeView === "completed" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {done.length === 0 ? (
            <div className="p-7 text-center text-gray-400 text-sm">No completed follow-ups yet</div>
          ) : (
            done.map((f, i) => <FollowUpRow key={f.id || i} f={f} i={i} isDone={true} />)
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   CLIENTS (CONVERTED)
   ═══════════════════════════════════ */
interface ClientsTabProps {
  leads: Lead[];
  onSelect: (id: string) => void;
}

function ClientsTab({ leads, onSelect }: ClientsTabProps) {
  const clients = leads.filter(l => l.converted);
  const totalValue = clients.reduce((s, l) => s + (parseInt((l.conversion?.dealValue || "0").replace(/[^\d]/g, "")) || 0), 0);

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800">Converted Clients</h2>
      <p className="text-sm text-gray-500 mt-0.5 mb-4">{clients.length} client{clients.length !== 1 ? "s" : ""} · Total deal value: ₹{(totalValue / 100000).toFixed(1)}L</p>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-3.5">
        {clients.map(l => (
          <div key={l.id} onClick={() => onSelect(l.id)} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer border-l-[3px] border-l-emerald-600 hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <div>
                <div className="font-bold text-[15px]">{l.company}</div>
                <div className="text-xs text-gray-500 mt-0.5">{l.person} — {l.designation}</div>
              </div>
              <Badge status="Converted" />
            </div>
            {l.conversion && (
              <div className="mt-3 p-2.5 bg-gray-50 rounded-md">
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div><span className="text-gray-500">Deal:</span> <span className="font-bold">{l.conversion.dealValue}</span></div>
                  <div><span className="text-gray-500">Line:</span> {l.conversion.serviceLine}</div>
                  <div><span className="text-gray-500">Start:</span> {fmtDate(l.conversion.contractStart)}</div>
                  <div><span className="text-gray-500">Via:</span> {l.conversion.source}</div>
                </div>
                <div className="flex gap-2.5 mt-1.5">
                  {Object.entries(l.conversion.checklist || {}).map(([k, v]) => (
                    <span key={k} className={`text-[10px] font-semibold ${v ? "text-emerald-600" : "text-gray-500"}`}>{v ? "✓" : "○"} {k.replace(/([A-Z])/g, " $1")}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   REPORTS & ANALYTICS
   ═══════════════════════════════════ */
interface ReportsTabProps {
  leads: Lead[];
}

interface ReportStats {
  total: number;
  conv: number;
  hot: number;
  warm: number;
  noPot: number;
  rate: string;
  proposals: number;
  fupDone: number;
  fupOverdue: number;
  filtered: Lead[];
  owners: Record<string, { meetings: number; proposals: number; converted: number }>;
}

function ReportsTab({ leads }: ReportsTabProps) {
  const periods: Record<string, string> = { W: "This Week", M: "This Month", Q: "This Quarter", A: "This Year" };
  const [period, setPeriod] = useState("Q");

  function getStart(p: string): Date { const dt = new Date(); if (p === "W") dt.setDate(dt.getDate() - 7); else if (p === "M") dt.setMonth(dt.getMonth() - 1); else if (p === "Q") dt.setMonth(dt.getMonth() - 3); else dt.setFullYear(dt.getFullYear() - 1); return dt; }

  const stats = useMemo((): ReportStats => {
    const start = getStart(period);
    const f = leads.filter(l => new Date(l.meetingDate) >= start);
    const total = f.length, conv = f.filter(l => l.converted).length, hot = f.filter(l => l.status === "Hot" && !l.converted).length;
    const warm = f.filter(l => l.status === "Warm").length, noPot = f.filter(l => l.status === "No Potential").length;
    const rate = total ? ((conv / total) * 100).toFixed(0) : "0";
    const proposals = f.filter(l => l.proposal?.status !== "Not Created").length;
    const allF = f.flatMap(l => l.followUps || []);
    const fupDone = allF.filter(fu => fu.done).length, fupOverdue = allF.filter(fu => !fu.done && isOverdue(fu.dueDate)).length;
    const owners: Record<string, { meetings: number; proposals: number; converted: number }> = {};
    f.forEach(l => {
      if (!owners[l.bdOwner]) owners[l.bdOwner] = { meetings: 0, proposals: 0, converted: 0 };
      owners[l.bdOwner].meetings++;
      if (l.proposal?.status !== "Not Created") owners[l.bdOwner].proposals++;
      if (l.converted) owners[l.bdOwner].converted++;
    });
    return { total, conv, hot, warm, noPot, rate, proposals, fupDone, fupOverdue, filtered: f, owners };
  }, [leads, period]);

  const funnel = [
    { label: "Meetings", val: stats.total, color: "#7b9ec4" },
    { label: "Proposals", val: stats.proposals, color: "#8a7fb5" },
    { label: "Hot", val: stats.hot + stats.conv, color: "#c29090" },
    { label: "Converted", val: stats.conv, color: "#7bab92" },
  ];
  const fMax = Math.max(...funnel.map(f => f.val), 1);

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div><h2 className="text-lg font-bold text-gray-800">Reports & Analytics</h2><p className="text-sm text-gray-500 mt-0.5">BD performance — W / M / Q / A</p></div>
        <div className="flex border border-gray-200 rounded-md overflow-hidden">
          {Object.entries(periods).map(([k, v]) => (
            <button key={k} onClick={() => setPeriod(k)} className={`px-3.5 py-1.5 text-xs font-semibold border-none border-r border-gray-200 cursor-pointer ${period === k ? "bg-teal-600 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}>{v}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2.5 mb-5">
        {[
          { l: "Meetings", v: stats.total },
          { l: "Proposals", v: stats.proposals },
          { l: "Converted", v: stats.conv },
          { l: "Conversion Rate", v: stats.rate + "%" },
          { l: "Follow-ups Overdue", v: stats.fupOverdue },
        ].map(k => (
          <div key={k.l} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3.5">
            <div className="text-2xl font-bold text-gray-800 leading-none tabular-nums">{k.v}</div>
            <div className="text-xs text-gray-500 mt-1">{k.l}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-xs font-bold text-gray-500 tracking-wide mb-2.5">Conversion Funnel</div>
          {funnel.map(f => (
            <div key={f.label} className="flex items-center gap-2.5 mb-2.5">
              <div className="w-[70px] text-xs font-semibold text-gray-600 text-right">{f.label}</div>
              <div className="flex-1 h-[26px] bg-gray-100 rounded overflow-hidden">
                <div className="h-full rounded flex items-center justify-end pr-1.5 transition-all duration-300"
                  style={{ width: Math.max((f.val / fMax) * 100, f.val > 0 ? 6 : 0) + "%", background: f.color }}>
                  {f.val > 0 && <span className="text-xs font-bold text-white">{f.val}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-xs font-bold text-gray-500 tracking-wide mb-2.5">BD Performance Scorecard</div>
          <table className="w-full border-collapse text-xs">
            <thead><tr>{["BD Owner", "Meetings", "Proposals", "Converted"].map(h => <th key={h} className="text-left px-2 py-1.5 font-semibold text-gray-500 text-xs border-b-2 border-gray-200 bg-gray-50">{h}</th>)}</tr></thead>
            <tbody>
              {Object.entries(stats.owners).sort((a, b) => b[1].converted - a[1].converted).map(([name, dd]) => (
                <tr key={name}>
                  <td className="px-2 py-2 border-b border-gray-100 text-sm font-semibold">{name}</td>
                  <td className="px-2 py-2 border-b border-gray-100 text-sm">{dd.meetings}</td>
                  <td className="px-2 py-2 border-b border-gray-100 text-sm">{dd.proposals}</td>
                  <td className="px-2 py-2 border-b border-gray-100 text-sm text-emerald-600 font-bold">{dd.converted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-5">
        <div className="text-xs font-bold text-gray-500 tracking-wide mb-2.5">Follow-up Effectiveness</div>
        <div className="flex gap-6 text-sm">
          <div>Completed: <span className="font-bold text-emerald-600">{stats.fupDone}</span></div>
          <div>Overdue: <span className="font-bold text-red-500">{stats.fupOverdue}</span></div>
          <div>Completion rate: <span className="font-bold text-teal-600">{stats.fupDone + stats.fupOverdue > 0 ? ((stats.fupDone / (stats.fupDone + stats.fupOverdue)) * 100).toFixed(0) : 0}%</span></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-5 pt-3.5 text-xs font-bold text-gray-500 tracking-wide mb-2.5">Detailed Meeting Log</div>
        <table className="w-full border-collapse">
          <thead><tr>{["Date", "Company", "Person", "BD Owner", "Status", "Proposal", "Commercials"].map(h => <th key={h} className="text-left px-3 py-2 font-semibold text-gray-500 text-xs border-b-2 border-gray-200 bg-gray-50">{h}</th>)}</tr></thead>
          <tbody>
            {stats.filtered.sort((a, b) => new Date(b.meetingDate).getTime() - new Date(a.meetingDate).getTime()).map(l => (
              <tr key={l.id}>
                <td className="px-3 py-2.5 border-b border-gray-100 text-sm">{fmtShort(l.meetingDate)}</td>
                <td className="px-3 py-2.5 border-b border-gray-100 text-sm font-semibold">{l.company}</td>
                <td className="px-3 py-2.5 border-b border-gray-100 text-sm">{l.person}</td>
                <td className="px-3 py-2.5 border-b border-gray-100 text-xs">{l.bdOwner}</td>
                <td className="px-3 py-2.5 border-b border-gray-100 text-sm"><Badge status={l.converted ? "Converted" : l.status} /></td>
                <td className="px-3 py-2.5 border-b border-gray-100 text-xs">{l.proposal?.status}</td>
                <td className="px-3 py-2.5 border-b border-gray-100 text-xs">{l.commercials?.quotedAmount || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   NEW MEETING MODAL
   ═══════════════════════════════════ */
interface MeetingFormData {
  company: string;
  person: string;
  designation: string;
  email: string;
  phone: string;
  linkedin: string;
  meetingDate: string;
  meetingType: string;
  bdOwner: string;
  source: string;
  location: string;
  industry: string;
  status: string;
  discussions: string;
}

interface NewMeetingModalProps {
  onSave: (data: Lead) => void;
  onClose: () => void;
}

function NewMeetingModal({ onSave, onClose }: NewMeetingModalProps) {
  const [mode, setMode] = useState<"full" | "quick">("full");
  const [form, setForm] = useState<MeetingFormData>({ company: "", person: "", designation: "", email: "", phone: "", linkedin: "", meetingDate: today, meetingType: "In-person", bdOwner: BD_OWNERS[0], source: "Cold Outreach", location: "", industry: "", status: "Warm", discussions: "" });
  const set = (k: keyof MeetingFormData, v: string) => setForm({ ...form, [k]: v });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="bg-white rounded-xl px-7 py-6 w-[560px] max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold m-0">Log New Meeting</h3>
          <div className="flex border border-gray-200 rounded-md overflow-hidden">
            {(["full", "quick"] as const).map(m => (
              <button key={m} onClick={() => setMode(m)} className={`px-3 py-1 text-xs font-semibold border-none cursor-pointer ${mode === m ? "bg-teal-600 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}>{m === "full" ? "Full" : "Quick Add"}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="col-span-full"><div className="text-xs font-semibold text-gray-500 mb-1">Company Name *</div><input value={form.company} onChange={e => set("company", e.target.value)} placeholder="Start typing to search..." className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border" /></div>
          <div><div className="text-xs font-semibold text-gray-500 mb-1">Person Name *</div><input value={form.person} onChange={e => set("person", e.target.value)} className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border" /></div>
          <div><div className="text-xs font-semibold text-gray-500 mb-1">Email *</div><input value={form.email} onChange={e => set("email", e.target.value)} className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border" /></div>

          {mode === "full" && <>
            <div><div className="text-xs font-semibold text-gray-500 mb-1">Designation</div><input value={form.designation} onChange={e => set("designation", e.target.value)} className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border" /></div>
            <div><div className="text-xs font-semibold text-gray-500 mb-1">Phone</div><input value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+91 ..." className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border" /></div>
            <div><div className="text-xs font-semibold text-gray-500 mb-1">LinkedIn URL</div><input value={form.linkedin} onChange={e => set("linkedin", e.target.value)} className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border" /></div>
            <div><div className="text-xs font-semibold text-gray-500 mb-1">Location</div><input value={form.location} onChange={e => set("location", e.target.value)} className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border" /></div>
            <div><div className="text-xs font-semibold text-gray-500 mb-1">Industry</div><input value={form.industry} onChange={e => set("industry", e.target.value)} className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border" /></div>
            <div><div className="text-xs font-semibold text-gray-500 mb-1">Source / Referral</div><select value={form.source} onChange={e => set("source", e.target.value)} className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border">{SOURCES.map(s => <option key={s}>{s}</option>)}</select></div>
          </>}

          <div><div className="text-xs font-semibold text-gray-500 mb-1">Meeting Date</div><input type="date" value={form.meetingDate} onChange={e => set("meetingDate", e.target.value)} className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border" /></div>
          <div><div className="text-xs font-semibold text-gray-500 mb-1">Meeting Type</div><select value={form.meetingType} onChange={e => set("meetingType", e.target.value)} className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border">{MEETING_TYPES.map(t => <option key={t}>{t}</option>)}</select></div>
          <div><div className="text-xs font-semibold text-gray-500 mb-1">BD Owner</div><select value={form.bdOwner} onChange={e => set("bdOwner", e.target.value)} className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border">{BD_OWNERS.map(o => <option key={o}>{o}</option>)}</select></div>
          <div><div className="text-xs font-semibold text-gray-500 mb-1">Lead Status</div><select value={form.status} onChange={e => set("status", e.target.value)} className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border">{STATUSES.filter(s => s !== "Converted").map(s => <option key={s}>{s}</option>)}</select></div>

          {mode === "full" && (
            <div className="col-span-full"><div className="text-xs font-semibold text-gray-500 mb-1">Discussion Points (one per line)</div><textarea value={form.discussions} onChange={e => set("discussions", e.target.value)} rows={3} className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md font-inherit box-border resize-y" /></div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 text-xs font-semibold rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200">Cancel</button>
          <button onClick={() => {
            if (!form.company || !form.person || !form.email) return alert("Company, person, and email are required.");
            onSave({
              ...form, id: "L" + Date.now(), converted: false,
              discussions: form.discussions ? form.discussions.split("\n").filter(Boolean).map(t => ({ type: "agenda" as const, text: t })) : [],
              proposal: { title: "", version: "", status: "Not Created", serviceLine: "", scope: "", deliverables: "", approver: "", approvedDate: "", sentDate: "", viewCount: 0 },
              commercials: { pricingModel: "", quotedAmount: "", discount: "", paymentTerms: "", contractDuration: "", startDate: "", negotiationLog: [] },
              followUps: [],
            });
          }} className="px-4 py-2 text-xs font-semibold rounded-md bg-teal-600 text-white hover:bg-teal-700">Save Meeting</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   MAIN APP
   ═══════════════════════════════════ */
export default function BDModule() {
  const [leads, setLeads] = useState<Lead[]>(SEED);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname.replace(/\/+$/, "");
  const section = path === "/bd" ? "dashboard"
    : path === "/bd/meetings" ? "meetings"
    : path === "/bd/pipeline" ? "pipeline"
    : path === "/bd/proposals" ? "proposals"
    : path === "/bd/follow-ups" ? "followups"
    : path === "/bd/clients" ? "clients"
    : path === "/bd/reports" ? "reports"
    : "dashboard";

  const goTo = (s: string) => {
    const routes: Record<string, string> = {
      dashboard: "/bd",
      meetings: "/bd/meetings",
      pipeline: "/bd/pipeline",
      proposals: "/bd/proposals",
      followups: "/bd/follow-ups",
      clients: "/bd/clients",
      reports: "/bd/reports",
    };
    navigate(routes[s] || "/bd");
    setDetailId(null);
  };

  const detail = leads.find(l => l.id === detailId);

  function openDetail(id: string) { setDetailId(id); }
  function closeDetail() { setDetailId(null); }

  function handleUpdate(id: string, field: string, value: any) {
    setLeads(prev => prev.map(l => {
      if (l.id !== id) return l;
      if (field === "addFollowUp") return { ...l, followUps: [...(l.followUps || []), value] };
      if (field === "toggleFollowUp") { const f = [...(l.followUps || [])]; f[value] = { ...f[value], done: !f[value].done, completedDate: !f[value].done ? today : null }; return { ...l, followUps: f }; }
      if (field === "addDiscussion") return { ...l, discussions: [...(l.discussions || []), value] };
      if (field === "convert") return { ...l, status: "Hot", converted: true, conversion: { dealValue: l.commercials?.quotedAmount || "TBD", serviceLine: l.proposal?.serviceLine || "TBD", contractStart: today, source: l.source, checklist: { agreementSigned: true, commercialsLocked: !!l.commercials?.quotedAmount, spocAssigned: false } } };
      if (field === "proposalStatus") return { ...l, proposal: { ...l.proposal, status: value } };
      if (field === "proposalTitle") return { ...l, proposal: { ...l.proposal, title: value } };
      if (field === "proposalServiceLine") return { ...l, proposal: { ...l.proposal, serviceLine: value } };
      if (field === "proposalScope") return { ...l, proposal: { ...l.proposal, scope: value } };
      if (field === "proposalDeliverables") return { ...l, proposal: { ...l.proposal, deliverables: value } };
      if (field === "commercialField") return { ...l, commercials: { ...l.commercials, [value.field]: value.value } };
      if (field === "addNegotiationLog") return { ...l, commercials: { ...l.commercials, negotiationLog: [...(l.commercials?.negotiationLog || []), value] } };
      return { ...l, [field]: value };
    }));
  }

  function handleNewLead(data: Lead) { setLeads(prev => [data, ...prev]); setShowModal(false); setDetailId(data.id); }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {detail ? (
          <LeadDetail lead={detail} onUpdate={handleUpdate} onBack={closeDetail} />
        ) : (
          <>
            {section === "dashboard" && <Dashboard leads={leads} goTo={goTo} onSelect={openDetail} />}
            {section === "meetings" && <MeetingsTab leads={leads} onSelect={openDetail} onNew={() => setShowModal(true)} />}
            {section === "pipeline" && <PipelineTab leads={leads} onSelect={openDetail} />}
            {section === "proposals" && <ProposalsTab leads={leads} onSelect={openDetail} />}
            {section === "followups" && <FollowUpsTab leads={leads} onUpdate={handleUpdate} />}
            {section === "clients" && <ClientsTab leads={leads} onSelect={openDetail} />}
            {section === "reports" && <ReportsTab leads={leads} />}
          </>
        )}
      </div>

      {showModal && <NewMeetingModal onSave={handleNewLead} onClose={() => setShowModal(false)} />}
    </div>
  );
}