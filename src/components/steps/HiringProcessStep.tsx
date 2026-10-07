// import {
//   FormSection,
//   Field,
//   FieldGrid,
//   TextInput,
//   TextArea,
//   NativeSelect,
//   OptionCards,
//   ChipGroup,
//   InfoBanner,
// } from "../FormPrimitives";
// import {
//   INTERVIEW_MODE_CARDS,
//   DIVERSITY_OPTIONS,
//   AI_INDUSTRIES,
//   AI_FUNCTIONS,
// } from "../positionForm";

// const HiringProcessStep = ({ form, set, toggle }: any) => (
//   <>
//     <FormSection title="Interview process">
//       <FieldGrid>
//         <Field label="Number of rounds">
//           <TextInput
//             type="number"
//             min="1"
//             value={form.rounds}
//             onChange={(e: any) => set("rounds", e.target.value)}
//             placeholder="e.g. 4"
//             className="no-spinner"
//           />
//         </Field>

//         <Field label="Interviewer">
//           <TextInput
//             value={form.interviewerName}
//             onChange={(e: any) => set("interviewerName", e.target.value)}
//             placeholder="e.g. Sarah Johnson"
//           />
//         </Field>

//         <Field label="Interviewer LinkedIn" full>
//           <TextInput
//             value={form.interviewerLinkedIn}
//             onChange={(e: any) => set("interviewerLinkedIn", e.target.value)}
//             placeholder="linkedin.com/in/name"
//           />
//         </Field>
//       </FieldGrid>

//       <div className="mt-5">
//         <Field label="Mode of interview">
//           <OptionCards
//             options={INTERVIEW_MODE_CARDS}
//             value={form.interviewMode}
//             onChange={(value) => set("interviewMode", value)}
//           />
//         </Field>
//       </div>
//     </FormSection>

//     <FormSection title="Candidate preferences">
//       <InfoBanner>
//         These preferences are for internal sourcing only. They are never shown
//         to candidates or included in the job description.
//       </InfoBanner>

//       <FieldGrid>
//         <Field label="Preferred industry" hint="comma separated">
//           <TextInput
//             value={form.preferredIndustry}
//             onChange={(e: any) => set("preferredIndustry", e.target.value)}
//             placeholder="e.g. Technology, SaaS"
//           />
//         </Field>

//         <Field label="Preferred companies" hint="comma separated">
//           <TextInput
//             value={form.preferredCompanies}
//             onChange={(e: any) => set("preferredCompanies", e.target.value)}
//             placeholder="e.g. Google, Microsoft, Amazon"
//           />
//         </Field>

//         <Field label="Diversity preference">
//           <NativeSelect
//             value={form.diversityPreference}
//             placeholder="No preference"
//             options={DIVERSITY_OPTIONS}
//             onChange={(e: any) => set("diversityPreference", e.target.value)}
//           />
//         </Field>
//       </FieldGrid>
//     </FormSection>

//     <FormSection title="AI matching" divider={false}>
//       <p className="-mt-2 mb-4 text-sm text-gray-500">
//         Used by the AI matcher to score incoming resumes against this position.
//       </p>

//       <FieldGrid>
//         <Field label="Keywords" full hint="comma separated">
//           <TextInput
//             value={form.keywords}
//             onChange={(e: any) => set("keywords", e.target.value)}
//             placeholder="e.g. project management, PMP, infrastructure, capital projects"
//           />
//         </Field>

//         <Field label="What should the matcher prioritise?" full>
//           <TextArea
//             rows={3}
//             value={form.prompt}
//             onChange={(e: any) => set("prompt", e.target.value)}
//             placeholder="e.g. Prefer candidates from big-4 consulting with infra exposure. Ignore pure construction site roles."
//           />
//         </Field>

//         <Field label="Preferred role title" full>
//           <TextInput
//             value={form.aiPreferredRole}
//             onChange={(e: any) => set("aiPreferredRole", e.target.value)}
//             placeholder="e.g. Senior Project Manager"
//           />
//         </Field>
//       </FieldGrid>

//       <div className="mt-5 space-y-5">
//         <Field label="Preferred industries">
//           <ChipGroup
//             options={AI_INDUSTRIES}
//             selected={form.aiPreferredIndustries}
//             onToggle={(value) => toggle("aiPreferredIndustries", value)}
//           />
//         </Field>

//         <Field label="Preferred functions">
//           <ChipGroup
//             options={AI_FUNCTIONS}
//             selected={form.aiPreferredFunctions}
//             onToggle={(value) => toggle("aiPreferredFunctions", value)}
//           />
//         </Field>
//       </div>
//     </FormSection>
//   </>
// );

// export default HiringProcessStep;


import {
  FormSection,
  Field,
  FieldGrid,
  TextInput,
  TextArea,
  NativeSelect,
  OptionCards,
  ChipGroup,
  InfoBanner,
} from "../positions/FormPrimitives";
import {
  INTERVIEW_MODE_CARDS,
  DIVERSITY_OPTIONS,
  AI_INDUSTRIES,
  AI_FUNCTIONS,
} from "../positions/positionForm";

const HiringProcessStep = ({ form, set, toggle }: any) => (
  <>
    <FormSection title="Interview process">
      <FieldGrid>
        <Field label="Number of rounds">
          <TextInput
            type="number"
            min="1"
            value={form.rounds}
            onChange={(e: any) => set("rounds", e.target.value)}
            placeholder="e.g. 4"
            className="no-spinner"
          />
        </Field>

        <Field label="Interviewer">
          <TextInput
            value={form.interviewerName}
            onChange={(e: any) => set("interviewerName", e.target.value)}
            placeholder="e.g. Sarah Johnson"
          />
        </Field>

        <Field label="Interviewer LinkedIn" full>
          <TextInput
            value={form.interviewerLinkedIn}
            onChange={(e: any) => set("interviewerLinkedIn", e.target.value)}
            placeholder="linkedin.com/in/name"
          />
        </Field>
      </FieldGrid>

      <div className="mt-5">
        <Field label="Mode of interview">
          <OptionCards
            options={INTERVIEW_MODE_CARDS}
            value={form.interviewMode}
            onChange={(value) => set("interviewMode", value)}
          />
        </Field>
      </div>
    </FormSection>

    <FormSection title="Candidate preferences">
      <InfoBanner>
        These preferences are for internal sourcing only. They are never shown
        to candidates or included in the job description.
      </InfoBanner>

      <FieldGrid>
        <Field label="Preferred industry" hint="comma separated">
          <TextInput
            value={form.preferredIndustry}
            onChange={(e: any) => set("preferredIndustry", e.target.value)}
            placeholder="e.g. Technology, SaaS"
          />
        </Field>

        <Field label="Preferred companies" hint="comma separated">
          <TextInput
            value={form.preferredCompanies}
            onChange={(e: any) => set("preferredCompanies", e.target.value)}
            placeholder="e.g. Google, Microsoft, Amazon"
          />
        </Field>

        <Field label="Diversity preference">
          <NativeSelect
            value={form.diversityPreference}
            placeholder="No preference"
            options={DIVERSITY_OPTIONS}
            onChange={(e: any) => set("diversityPreference", e.target.value)}
          />
        </Field>
      </FieldGrid>
    </FormSection>

    <FormSection title="AI matching" divider={false}>
      <p className="-mt-2 mb-4 text-sm text-gray-500">
        Used by the AI matcher to score incoming resumes against this position.
      </p>

      <FieldGrid>
        <Field label="Keywords" full hint="comma separated">
          <TextInput
            value={form.keywords}
            onChange={(e: any) => set("keywords", e.target.value)}
            placeholder="e.g. project management, PMP, infrastructure, capital projects"
          />
        </Field>

        <Field label="What should the matcher prioritise?" full>
          <TextArea
            rows={3}
            value={form.prompt}
            onChange={(e: any) => set("prompt", e.target.value)}
            placeholder="e.g. Prefer candidates from big-4 consulting with infra exposure. Ignore pure construction site roles."
          />
        </Field>

        <Field label="Preferred role title" full>
          <TextInput
            value={form.aiPreferredRole}
            onChange={(e: any) => set("aiPreferredRole", e.target.value)}
            placeholder="e.g. Senior Project Manager"
          />
        </Field>
      </FieldGrid>

      <div className="mt-5 space-y-5">
        <Field label="Preferred industries">
          <ChipGroup
            options={AI_INDUSTRIES}
            selected={form.aiPreferredIndustries}
            onToggle={(value) => toggle("aiPreferredIndustries", value)}
          />
        </Field>

        <Field label="Preferred functions">
          <ChipGroup
            options={AI_FUNCTIONS}
            selected={form.aiPreferredFunctions}
            onToggle={(value) => toggle("aiPreferredFunctions", value)}
          />
        </Field>
      </div>
    </FormSection>
  </>
);

export default HiringProcessStep;