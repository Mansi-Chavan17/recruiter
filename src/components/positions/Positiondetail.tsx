// import { useState, useEffect } from "react";
// import Header from "../Header";
// import DetailHeader from "../positions/Detailheader";
// import InformationTab from "../positions/Informationtab";
// import CandidatesTab from "../positions/Candidatestab";
// import EditPositionForm from "../positions/Editpositionform";

// const PositionDetail = ({
//   position,
//   candidates = [],
//   recruiter,
//   onBack,
//   setCandidates,
//   runAIResumeMatcherForPosition,
//   onSave,
//   functionOptions = [],
//   roleOptions = [],
//   educationOptions = [],
//   cityOptions = [],
// }: any) => {
//   const [tab, setTab] = useState("candidates");
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     setIsEditing(false);
//   }, [position?.id]);

//   const directApplications = candidates.filter(
//     (c: any) => c.positionId === position.id && c.source === "direct"
//   );

//   const candidateCount =
//     (position.submittedCandidates?.length || 0) + directApplications.length;

//   const handleTagToPosition = (candidate: any) => {
//     setCandidates((prev: any[]) =>
//       prev.map((c) =>
//         c.id === candidate.id
//           ? { ...c, status: "submitted", source: "recruiter", recruiter }
//           : c
//       )
//     );
//     alert("Candidate tagged to the position.");
//   };

//   const handleSave = async (payload: any) => {
//     const saved = await onSave(payload);
//     if (saved) setIsEditing(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       <DetailHeader
//         position={position}
//         activeTab={tab}
//         onTabChange={setTab}
//         candidateCount={candidateCount}
//         onBack={onBack}
//         onEdit={() => {
//           setTab("information");
//           setIsEditing(true);
//         }}
//         isEditing={isEditing}
//       />

//       <div className="max-w-7xl mx-auto p-4 sm:p-6">
//         {isEditing ? (
//           <EditPositionForm
//             position={position}
//             onCancel={() => setIsEditing(false)}
//             onSave={handleSave}
//             functionOptions={functionOptions}
//             roleOptions={roleOptions}
//             educationOptions={educationOptions}
//             cityOptions={cityOptions}
//           />
//         ) : tab === "information" ? (
//           <InformationTab position={position} />
//         ) : (
//           <CandidatesTab
//             position={position}
//             directApplications={directApplications}
//             onRunAIMatcher={() => runAIResumeMatcherForPosition(position.id)}
//             onTagToPosition={handleTagToPosition}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default PositionDetail;






import { useState, useEffect } from "react";
import Header from "../Header";
import DetailHeader from "../positions/Detailheader";
import InformationTab from "../positions/Informationtab";
import CandidatesTab from "../positions/Candidatestab";
import EditPositionForm from "../positions/Editpositionform";


const PositionDetail = ({
  position,
  candidates = [],
  recruiter,
  onBack,
  setCandidates,
  runAIResumeMatcherForPosition,
  onSave,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
  functionOptions = [],
  roleOptions = [],
  educationOptions = [],
  cityOptions = [],
}: any) => {
  const [tab, setTab] = useState("information");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(false);
    setTab("information");
  }, [position?.id]);

  const directApplications = candidates.filter(
    (c: any) => c.positionId === position.id && c.source === "direct"
  );

  const candidateCount =
    (position.submittedCandidates?.length || 0) + directApplications.length;

  const handleTagToPosition = (candidate: any) => {
    setCandidates((prev: any[]) =>
      prev.map((c) =>
        c.id === candidate.id
          ? { ...c, status: "submitted", source: "recruiter", recruiter }
          : c
      )
    );
    alert("Candidate tagged to the position.");
  };

  const handleSave = async (payload: any) => {
    const saved = await onSave(payload);
    if (saved) setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <DetailHeader
        position={position}
        activeTab={tab}
        onTabChange={setTab}
        candidateCount={candidateCount}
        onBack={onBack}
        onEdit={() => {
          setTab("information");
          setIsEditing(true);
        }}
        isEditing={isEditing}
        onPrev={onPrev}
        onNext={onNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {isEditing ? (
          <EditPositionForm
            position={position}
            onCancel={() => setIsEditing(false)}
            onSave={handleSave}
            functionOptions={functionOptions}
            roleOptions={roleOptions}
            educationOptions={educationOptions}
            cityOptions={cityOptions}
          />
        ) : tab === "information" ? (
          <InformationTab position={position} />
        ) : (
          <CandidatesTab
            position={position}
            directApplications={directApplications}
            onRunAIMatcher={() => runAIResumeMatcherForPosition(position.id)}
            onTagToPosition={handleTagToPosition}
          />
        )}
      </div>
    </div>
  );
};

export default PositionDetail;