// import {
//   FormSection,
//   Field,
//   FieldGrid,
//   TextInput,
//   TextArea,
//   SearchSelect,
//   OptionCards,
// } from "../FormPrimitives";
// import PolishWithAI from "../PolishWithAI";
// import { WORKPLACE_CARDS } from "../positionForm";

// const RoleAndPayStep = ({ form, set, cityOptions }: any) => (
//   <>
//     <FormSection title="Role description">
//       <Field label="What does this person actually do?">
//         <TextArea
//           rows={9}
//           value={form.roleDescription}
//           onChange={(e: any) => set("roleDescription", e.target.value)}
//           placeholder={
//             "Type your rough notes — bullet points are fine.\n\ne.g. leading infra projects for clients, 5+ yrs in project mgmt or consulting, PMP preferred, will manage 2 juniors, lots of client-facing work, some travel"
//           }
//         />
//       </Field>

//       <PolishWithAI
//         value={form.roleDescription}
//         onChange={(next) => set("roleDescription", next)}
//         context={{
//           positionName: form.positionName,
//           clientName: form.clientName,
//           function: form.function,
//           role: form.role,
//           experience: form.experienceYears,
//           city: form.city,
//         }}
//       />
//     </FormSection>

//     <FormSection title="Compensation">
//       <FieldGrid>
//         <Field label="CTC budget" hint="₹ per annum">
//           <TextInput
//             type="number"
//             value={form.ctcBudgetNumeric}
//             onChange={(e: any) => set("ctcBudgetNumeric", e.target.value)}
//             placeholder="e.g. 2000000"
//             className="no-spinner"
//           />
//         </Field>

//         <Field label="CTC structure">
//           <TextInput
//             value={form.ctcStructure}
//             onChange={(e: any) => set("ctcStructure", e.target.value)}
//             placeholder="e.g. 80% fixed + 15% variable + 5% ESOPs"
//           />
//         </Field>
//       </FieldGrid>

//       {form.ctcBudgetNumeric && Number(form.ctcBudgetNumeric) > 0 && (
//         <p className="mt-2 text-xs text-gray-500">
//           That's {(Number(form.ctcBudgetNumeric) / 100000).toFixed(1)} LPA.
//         </p>
//       )}
//     </FormSection>

//     <FormSection title="Where and by when" divider={false}>
//       <Field label="Workplace type">
//         <OptionCards
//           options={WORKPLACE_CARDS}
//           value={form.workplaceType}
//           onChange={(value) => set("workplaceType", value)}
//         />
//       </Field>

//       <div className="mt-5">
//         <FieldGrid>
//           <Field label="City">
//             <SearchSelect
//               options={cityOptions}
//               value={form.city}
//               placeholder="Select city..."
//               onChange={(selected: any) => set("city", selected?.value || "")}
//             />
//           </Field>

//           <Field label="Deadline to close">
//             <TextInput
//               type="date"
//               value={form.deadline}
//               onChange={(e: any) => set("deadline", e.target.value)}
//             />
//           </Field>
//         </FieldGrid>
//       </div>
//     </FormSection>
//   </>
// );

// export default RoleAndPayStep;



import {
  FormSection,
  Field,
  FieldGrid,
  TextInput,
  TextArea,
  SearchSelect,
  OptionCards,
} from "../positions/FormPrimitives";
import PolishWithAI from "../positions/PolishWithAI";
import { WORKPLACE_CARDS } from "../positions/positionForm";

const RoleAndPayStep = ({ form, set, cityOptions }: any) => (
  <>
    <FormSection title="Role description">
      <Field label="What does this person actually do?">
        <TextArea
          rows={9}
          value={form.roleDescription}
          onChange={(e: any) => set("roleDescription", e.target.value)}
          placeholder={
            "Type your rough notes — bullet points are fine.\n\ne.g. leading infra projects for clients, 5+ yrs in project mgmt or consulting, PMP preferred, will manage 2 juniors, lots of client-facing work, some travel"
          }
        />
      </Field>

      <PolishWithAI
        value={form.roleDescription}
        onChange={(next) => set("roleDescription", next)}
        context={{
          positionName: form.positionName,
          clientName: form.clientName,
          function: form.function,
          role: form.role,
          experience: form.experienceYears,
          city: form.city,
        }}
      />
    </FormSection>

    <FormSection title="Compensation">
      <FieldGrid>
        <Field label="CTC budget" hint="₹ per annum">
          <TextInput
            type="number"
            value={form.ctcBudgetNumeric}
            onChange={(e: any) => set("ctcBudgetNumeric", e.target.value)}
            placeholder="e.g. 2000000"
            className="no-spinner"
          />
        </Field>

        <Field label="CTC structure">
          <TextInput
            value={form.ctcStructure}
            onChange={(e: any) => set("ctcStructure", e.target.value)}
            placeholder="e.g. 80% fixed + 15% variable + 5% ESOPs"
          />
        </Field>
      </FieldGrid>

      {form.ctcBudgetNumeric && Number(form.ctcBudgetNumeric) > 0 && (
        <p className="mt-2 text-xs text-gray-500">
          That's {(Number(form.ctcBudgetNumeric) / 100000).toFixed(1)} LPA.
        </p>
      )}
    </FormSection>

    <FormSection title="Where and by when" divider={false}>
      <Field label="Workplace type">
        <OptionCards
          options={WORKPLACE_CARDS}
          value={form.workplaceType}
          onChange={(value) => set("workplaceType", value)}
        />
      </Field>

      <div className="mt-5">
        <FieldGrid>
          <Field label="City">
            <SearchSelect
              options={cityOptions}
              value={form.city}
              placeholder="Select city..."
              onChange={(selected: any) => set("city", selected?.value || "")}
            />
          </Field>

          <Field label="Deadline to close">
            <TextInput
              type="date"
              value={form.deadline}
              onChange={(e: any) => set("deadline", e.target.value)}
            />
          </Field>
        </FieldGrid>
      </div>
    </FormSection>
  </>
);

export default RoleAndPayStep;