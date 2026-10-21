import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  FormSection,
  Field,
  FieldGrid,
  TextInput,
  TextArea,
  NativeSelect,
  SearchSelect,
  OptionCards,
} from "./FormPrimitives";
import PolishWithAI from "./PolishWithAI";
import {
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  JOB_TYPE_OPTIONS,
  ROLE_TYPE_CARDS,
  WORKPLACE_CARDS,
  INTERVIEW_MODE_CARDS,
  DIVERSITY_OPTIONS,
} from "./positionForm";
import { buildUpdatePayload } from "../positions/Positionutils";

const EditPositionForm = ({
  position,
  onCancel,
  onSave,
  functionOptions = [],
  roleOptions = [],
  educationOptions = [],
  cityOptions = [],
}: any) => {
  const [form, setForm] = useState<any>({ ...position });
  const [saving, setSaving] = useState(false);

  const set = (field: string, value: any) =>
    setForm((prev: any) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(buildUpdatePayload(form, position.id));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Sticky header bar */}
      <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-gray-200 bg-gray-50/60">
        <h2 className="text-base font-bold text-gray-900 tracking-tight">
          Edit position
        </h2>
        <div className="flex gap-2.5">
          <button
            onClick={onCancel}
            className="h-9 px-4 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-800 hover:border-gray-300 transition-all duration-150"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="h-9 px-5 inline-flex items-center gap-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 disabled:bg-emerald-300 transition-colors shadow-sm"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <FormSection title="Job detail">
          <FieldGrid>
            <Field label="Position name">
              <TextInput
                value={form.positionName || ""}
                onChange={(e: any) => set("positionName", e.target.value)}
              />
            </Field>
            <Field label="Client">
              <TextInput value={form.clientName || ""} readOnly className="bg-gray-50" />
            </Field>
            <Field label="Status">
              <NativeSelect
                value={form.status || ""}
                options={STATUS_OPTIONS}
                onChange={(e: any) => set("status", e.target.value)}
              />
            </Field>
            <Field label="Priority">
              <NativeSelect
                value={form.priority || ""}
                placeholder="Select priority"
                options={PRIORITY_OPTIONS}
                onChange={(e: any) => set("priority", e.target.value)}
              />
            </Field>
            <Field label="Job type">
              <NativeSelect
                value={form.jobType || ""}
                placeholder="Select job type"
                options={JOB_TYPE_OPTIONS}
                onChange={(e: any) => set("jobType", e.target.value)}
              />
            </Field>
            <Field label="Target hires">
              <TextInput
                type="number"
                value={form.target || ""}
                onChange={(e: any) => set("target", e.target.value)}
              />
            </Field>
          </FieldGrid>

          <div className="mt-5">
            <Field label="Role type">
              <OptionCards
                options={ROLE_TYPE_CARDS}
                value={form.roleType || ""}
                onChange={(value) => set("roleType", value)}
                columns={2}
              />
            </Field>
          </div>
        </FormSection>

        <FormSection title="Who we're looking for">
          <FieldGrid>
            <Field label="Function">
              <SearchSelect
                options={functionOptions}
                value={form.function}
                placeholder="Select function..."
                onChange={(s: any) => set("function", s?.value || "")}
              />
            </Field>
            <Field label="Role">
              <SearchSelect
                options={roleOptions}
                value={form.role}
                placeholder="Select role..."
                onChange={(s: any) => set("role", s?.value || "")}
              />
            </Field>
            <Field label="Education">
              <SearchSelect
                options={educationOptions}
                value={form.education}
                placeholder="Select education..."
                onChange={(s: any) => set("education", s?.value || "")}
              />
            </Field>
            <Field label="Experience" hint="years">
              <TextInput
                value={form.experience || ""}
                onChange={(e: any) => set("experience", e.target.value)}
              />
            </Field>
            <Field label="Reportees">
              <TextInput
                type="number"
                value={form.reportees || ""}
                onChange={(e: any) => set("reportees", e.target.value)}
              />
            </Field>
          </FieldGrid>
        </FormSection>

        <FormSection title="Role description">
          <Field label="What does this person actually do?">
            <TextArea
              rows={8}
              value={form.roleDescription || ""}
              onChange={(e: any) => set("roleDescription", e.target.value)}
              placeholder="Rough notes are fine — polish them below."
            />
          </Field>
          <PolishWithAI
            value={form.roleDescription || ""}
            onChange={(next) => set("roleDescription", next)}
            context={{
              positionName: form.positionName,
              clientName: form.clientName,
              function: form.function,
              role: form.role,
              experience: form.experience,
              city: form.city,
            }}
          />
        </FormSection>

        <FormSection title="Compensation, place and time">
          <FieldGrid>
            <Field label="CTC budget" hint="LPA">
              <TextInput
                value={form.ctcBudget || ""}
                onChange={(e: any) => set("ctcBudget", e.target.value)}
              />
            </Field>
            <Field label="CTC structure">
              <TextInput
                value={form.ctcStructure || ""}
                onChange={(e: any) => set("ctcStructure", e.target.value)}
              />
            </Field>
            <Field label="City">
              <SearchSelect
                options={cityOptions}
                value={form.city}
                placeholder="Select city..."
                onChange={(s: any) => set("city", s?.value || "")}
              />
            </Field>
            <Field label="Deadline to close">
              <TextInput
                type="date"
                value={form.deadline || ""}
                onChange={(e: any) => set("deadline", e.target.value)}
              />
            </Field>
          </FieldGrid>

          <div className="mt-5">
            <Field label="Workplace type">
              <OptionCards
                options={WORKPLACE_CARDS}
                value={form.workplaceType || ""}
                onChange={(value) => set("workplaceType", value)}
              />
            </Field>
          </div>
        </FormSection>

        <FormSection title="Interview process">
          <FieldGrid>
            <Field label="Number of rounds">
              <TextInput
                type="number"
                value={form.rounds || ""}
                onChange={(e: any) => set("rounds", e.target.value)}
              />
            </Field>
            <Field label="Interviewer">
              <TextInput
                value={form.interviewerName || ""}
                onChange={(e: any) => set("interviewerName", e.target.value)}
              />
            </Field>
            <Field label="Interviewer LinkedIn" full>
              <TextInput
                value={form.linkedIn || ""}
                onChange={(e: any) => set("linkedIn", e.target.value)}
                placeholder="linkedin.com/in/name"
              />
            </Field>
          </FieldGrid>

          <div className="mt-5">
            <Field label="Mode of interview">
              <OptionCards
                options={INTERVIEW_MODE_CARDS}
                value={form.interviewMode || ""}
                onChange={(value) => set("interviewMode", value)}
              />
            </Field>
          </div>
        </FormSection>

        <FormSection title="Candidate preferences and contacts" divider={false}>
          <FieldGrid>
            <Field label="Preferred industry" hint="comma separated">
              <TextInput
                value={
                  Array.isArray(form.preferredIndustry)
                    ? form.preferredIndustry.join(", ")
                    : form.preferredIndustry || ""
                }
                onChange={(e: any) => set("preferredIndustry", e.target.value)}
              />
            </Field>
            <Field label="Preferred companies" hint="comma separated">
              <TextInput
                value={
                  Array.isArray(form.preferredCompanies)
                    ? form.preferredCompanies.join(", ")
                    : form.preferredCompanies || ""
                }
                onChange={(e: any) => set("preferredCompanies", e.target.value)}
              />
            </Field>
            <Field label="Diversity preference">
              <NativeSelect
                value={form.diversityPreference || ""}
                placeholder="No preference"
                options={DIVERSITY_OPTIONS}
                onChange={(e: any) => set("diversityPreference", e.target.value)}
              />
            </Field>
            <Field label="Client SPOC">
              <TextInput
                value={form.clientSpoc || ""}
                onChange={(e: any) => set("clientSpoc", e.target.value)}
              />
            </Field>
            <Field label="Laksh SPOC" hint="comma separated">
              <TextInput
                value={
                  Array.isArray(form.lakshSpoc)
                    ? form.lakshSpoc.join(", ")
                    : form.lakshSpoc || ""
                }
                onChange={(e: any) => set("lakshSpoc", e.target.value)}
              />
            </Field>
          </FieldGrid>
        </FormSection>
      </div>
    </div>
  );
};

export default EditPositionForm;