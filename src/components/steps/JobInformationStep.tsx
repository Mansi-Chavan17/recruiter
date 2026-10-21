// import {
//   FormSection,
//   Field,
//   FieldGrid,
//   TextInput,
//   NativeSelect,
//   SearchSelect,
//   OptionCards,
// } from "../FormPrimitives";
// import {
//   STATUS_OPTIONS,
//   PRIORITY_OPTIONS,
//   JOB_TYPE_OPTIONS,
//   ROLE_TYPE_CARDS,
// } from "../positionForm";

// const JobInformationStep = ({
//   form,
//   set,
//   clientOptions,
//   functionOptions,
//   roleOptions,
//   educationOptions,
// }: any) => (
//   <>
//     <FormSection title="Job detail">
//       <FieldGrid>
//         <Field label="Position name" required>
//           <TextInput
//             value={form.positionName}
//             onChange={(e: any) => set("positionName", e.target.value)}
//             placeholder="e.g. Senior Manager / Director I&CP"
//           />
//         </Field>

//         <Field label="Client" required>
//           <SearchSelect
//             options={clientOptions}
//             value={form.clientName}
//             placeholder="Search client..."
//             onChange={(selected: any) => {
//               set("clientName", selected?.value || "");
//               set(
//                 "clientSPOC",
//                 selected?.clientHRSpocs?.[0]?.client_SPOC || ""
//               );
//             }}
//           />
//         </Field>

//         <Field label="Client SPOC">
//           <TextInput
//             value={form.clientSPOC}
//             onChange={(e: any) => set("clientSPOC", e.target.value)}
//             placeholder="Who owns this role at the client"
//           />
//         </Field>

//         <Field label="Recruiter">
//           <TextInput value={form.recruiter} readOnly className="bg-gray-50" />
//         </Field>

//         <Field label="Status">
//           <NativeSelect
//             value={form.status}
//             options={STATUS_OPTIONS}
//             onChange={(e: any) => set("status", e.target.value)}
//           />
//         </Field>

//         <Field label="Priority">
//           <NativeSelect
//             value={form.priority}
//             placeholder="Select priority"
//             options={PRIORITY_OPTIONS}
//             onChange={(e: any) => set("priority", e.target.value)}
//           />
//         </Field>

//         <Field label="Job type">
//           <NativeSelect
//             value={form.jobType}
//             placeholder="Select job type"
//             options={JOB_TYPE_OPTIONS}
//             onChange={(e: any) => set("jobType", e.target.value)}
//           />
//         </Field>

//         <Field label="Target hires" hint="how many people to place">
//           <TextInput
//             type="number"
//             min="1"
//             value={form.target}
//             onChange={(e: any) => set("target", e.target.value)}
//             placeholder="e.g. 2"
//           />
//         </Field>
//       </FieldGrid>

//       <div className="mt-5">
//         <Field label="Role type">
//           <OptionCards
//             options={ROLE_TYPE_CARDS}
//             value={form.roleType}
//             onChange={(value) => set("roleType", value)}
//             columns={2}
//           />
//         </Field>
//       </div>
//     </FormSection>

//     <FormSection title="Who we're looking for" divider={false}>
//       <FieldGrid>
//         <Field label="Function">
//           <SearchSelect
//             options={functionOptions}
//             value={form.function}
//             placeholder="Select function..."
//             onChange={(selected: any) => set("function", selected?.value || "")}
//           />
//         </Field>

//         <Field label="Role">
//           <SearchSelect
//             options={roleOptions}
//             value={form.role}
//             placeholder="Select role..."
//             onChange={(selected: any) => set("role", selected?.value || "")}
//           />
//         </Field>

//         <Field label="Education">
//           <SearchSelect
//             options={educationOptions}
//             value={form.education}
//             placeholder="Select education..."
//             onChange={(selected: any) => set("education", selected?.value || "")}
//           />
//         </Field>

//         <Field label="Experience needed" hint="years">
//           <TextInput
//             value={form.experienceYears}
//             onChange={(e: any) => set("experienceYears", e.target.value)}
//             placeholder="e.g. 6"
//           />
//         </Field>
//       </FieldGrid>
//     </FormSection>
//   </>
// );

// export default JobInformationStep;






























// import {
//   FormSection,
//   Field,
//   FieldGrid,
//   TextInput,
//   NativeSelect,
//   SearchSelect,
//   OptionCards,
// } from "../positions/FormPrimitives";
// import {
//   STATUS_OPTIONS,
//   PRIORITY_OPTIONS,
//   JOB_TYPE_OPTIONS,
//   ROLE_TYPE_CARDS,
// } from "../positions/positionForm";

// const JobInformationStep = ({
//   form,
//   set,
//   clientOptions,
//   functionOptions,
//   roleOptions,
//   educationOptions,
// }: any) => (
//   <>
//     <FormSection title="Job detail">
//       <FieldGrid>
//         <Field label="Position name" required>
//           <TextInput
//             value={form.positionName}
//             onChange={(e: any) => set("positionName", e.target.value)}
//             placeholder="e.g. Senior Manager / Director I&CP"
//           />
//         </Field>

//         <Field label="Client" required>
//           <SearchSelect
//             options={clientOptions}
//             value={form.clientName}
//             placeholder="Search client..."
//             onChange={(selected: any) => {
//               set("clientName", selected?.value || "");
//               set(
//                 "clientSPOC",
//                 selected?.clientHRSpocs?.[0]?.client_SPOC || ""
//               );
//             }}
//           />
//         </Field>

//         <Field label="Client SPOC">
//           <TextInput
//             value={form.clientSPOC}
//             onChange={(e: any) => set("clientSPOC", e.target.value)}
//             placeholder="Who owns this role at the client"
//           />
//         </Field>

//         <Field label="Recruiter">
//           <TextInput value={form.recruiter} readOnly className="bg-gray-50" />
//         </Field>

//         <Field label="Status">
//           <NativeSelect
//             value={form.status}
//             options={STATUS_OPTIONS}
//             onChange={(e: any) => set("status", e.target.value)}
//           />
//         </Field>

//         <Field label="Priority">
//           <NativeSelect
//             value={form.priority}
//             placeholder="Select priority"
//             options={PRIORITY_OPTIONS}
//             onChange={(e: any) => set("priority", e.target.value)}
//           />
//         </Field>

//         <Field label="Job type">
//           <NativeSelect
//             value={form.jobType}
//             placeholder="Select job type"
//             options={JOB_TYPE_OPTIONS}
//             onChange={(e: any) => set("jobType", e.target.value)}
//           />
//         </Field>

//         <Field label="Target hires" hint="how many people to place">
//           <TextInput
//             type="number"
//             min="1"
//             value={form.target}
//             onChange={(e: any) => set("target", e.target.value)}
//             placeholder="e.g. 2"
//           />
//         </Field>
//       </FieldGrid>

//       <div className="mt-5">
//         <Field label="Role type">
//           <OptionCards
//             options={ROLE_TYPE_CARDS}
//             value={form.roleType}
//             onChange={(value) => set("roleType", value)}
//             columns={2}
//           />
//         </Field>
//       </div>
//     </FormSection>

//     <FormSection title="Who we're looking for" divider={false}>
//       <FieldGrid>
//         <Field label="Function">
//           <SearchSelect
//             options={functionOptions}
//             value={form.function}
//             placeholder="Select function..."
//             onChange={(selected: any) => set("function", selected?.value || "")}
//           />
//         </Field>

//         <Field label="Role">
//           <SearchSelect
//             options={roleOptions}
//             value={form.role}
//             placeholder="Select role..."
//             onChange={(selected: any) => set("role", selected?.value || "")}
//           />
//         </Field>

//         <Field label="Education">
//           <SearchSelect
//             options={educationOptions}
//             value={form.education}
//             placeholder="Select education..."
//             onChange={(selected: any) => set("education", selected?.value || "")}
//           />
//         </Field>

//         <Field label="Experience needed" hint="years">
//           <TextInput
//             value={form.experienceYears}
//             onChange={(e: any) => set("experienceYears", e.target.value)}
//             placeholder="e.g. 6"
//           />
//         </Field>
//       </FieldGrid>
//     </FormSection>
//   </>
// );

// export default JobInformationStep;


















import { useState } from "react";
import { Plus } from "lucide-react";
import {
  FormSection,
  Field,
  FieldGrid,
  TextInput,
  NativeSelect,
  SearchSelect,
  OptionCards,
} from "../positions/FormPrimitives";
import {
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  JOB_TYPE_OPTIONS,
  ROLE_TYPE_CARDS,
} from "../positions/positionForm";
import AddClientModal from "../clients/AddClientModal";
import RecruiterMultiSelect from "../positions/RecruiterMultiSelect";
import type { Client } from "../../types/crm";


const JobInformationStep = ({
  form,
  set,
  clientOptions,
  functionOptions,
  roleOptions,
  educationOptions,
  onClientCreated,
}: any) => {
  const [showAddClient, setShowAddClient] = useState(false);

  // Turn the saved client into the same option shape the Client dropdown
  // already uses, add it to the list, and select it.
  const handleClientCreated = (client: Client) => {
    const spocName = client.clientContact?.name || "";
    const option = {
      id: client.id,
      label: client.name,
      value: client.id,
      clientHRSpocs: spocName ? [{ client_SPOC: spocName }] : [],
    };
    onClientCreated?.(option);
    set("clientName", option.value);
    set("clientSPOC", spocName);
  };

  return (
    <>
      <FormSection title="Job detail">
        <FieldGrid>
          <Field label="Position name" required>
            <TextInput
              value={form.positionName}
              onChange={(e: any) => set("positionName", e.target.value)}
              placeholder="e.g. Senior Manager / Director I&CP"
            />
          </Field>

          <Field label="Client" required>
            <SearchSelect
              options={clientOptions}
              value={form.clientName}
              placeholder="Search client..."
              onChange={(selected: any) => {
                set("clientName", selected?.value || "");
                set(
                  "clientSPOC",
                  selected?.clientHRSpocs?.[0]?.client_SPOC || ""
                );
              }}
            />
            <button
              type="button"
              onClick={() => setShowAddClient(true)}
              className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800"
            >
              <Plus className="w-3.5 h-3.5" />
              Add new client
            </button>
          </Field>

          <Field label="Client SPOC">
            <TextInput
              value={form.clientSPOC}
              onChange={(e: any) => set("clientSPOC", e.target.value)}
              placeholder="Who owns this role at the client"
            />
          </Field>

          <Field label="Recruiter">
            <TextInput value={form.recruiter} readOnly className="bg-gray-50" />
            <RecruiterMultiSelect
              value={form.additionalRecruiters || []}
              onChange={(value) => set("additionalRecruiters", value)}
              excludeEmail={form.recruiter}
            />
          </Field>

          <Field label="Status">
            <NativeSelect
              value={form.status}
              options={STATUS_OPTIONS}
              onChange={(e: any) => set("status", e.target.value)}
            />
          </Field>

          <Field label="Priority">
            <NativeSelect
              value={form.priority}
              placeholder="Select priority"
              options={PRIORITY_OPTIONS}
              onChange={(e: any) => set("priority", e.target.value)}
            />
          </Field>

          <Field label="Job type">
            <NativeSelect
              value={form.jobType}
              placeholder="Select job type"
              options={JOB_TYPE_OPTIONS}
              onChange={(e: any) => set("jobType", e.target.value)}
            />
          </Field>

          <Field label="Target hires" hint="how many people to place">
            <TextInput
              type="number"
              min="1"
              value={form.target}
              onChange={(e: any) => set("target", e.target.value)}
              placeholder="e.g. 2"
            />
          </Field>
        </FieldGrid>

        <div className="mt-5">
          <Field label="Role type">
            <OptionCards
              options={ROLE_TYPE_CARDS}
              value={form.roleType}
              onChange={(value) => set("roleType", value)}
              columns={2}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Who we're looking for" divider={false}>
        <FieldGrid>
          <Field label="Function">
            <SearchSelect
              options={functionOptions}
              value={form.function}
              placeholder="Select function..."
              onChange={(selected: any) => set("function", selected?.value || "")}
            />
          </Field>

          <Field label="Role">
            <SearchSelect
              options={roleOptions}
              value={form.role}
              placeholder="Select role..."
              onChange={(selected: any) => set("role", selected?.value || "")}
            />
          </Field>

          <Field label="Education">
            <SearchSelect
              options={educationOptions}
              value={form.education}
              placeholder="Select education..."
              onChange={(selected: any) => set("education", selected?.value || "")}
            />
          </Field>

          <Field label="Experience needed" hint="years">
            <TextInput
              value={form.experienceYears}
              onChange={(e: any) => set("experienceYears", e.target.value)}
              placeholder="e.g. 6"
            />
          </Field>
        </FieldGrid>
      </FormSection>

      <AddClientModal
        open={showAddClient}
        onClose={() => setShowAddClient(false)}
        onCreated={handleClientCreated}
      />
    </>
  );
};

export default JobInformationStep;