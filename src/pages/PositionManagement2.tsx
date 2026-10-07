// import { useState, useEffect, useRef } from "react";
// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";
// import {
//   Search,
//   Filter,
//   Plus,
//   Users,
//   Bot,
//   ArrowLeft,
//   Mail,
//   User,
//   MapPin,
//   DollarSign,
//   Clock,
//   Building,
//   GraduationCap,
// } from "lucide-react";
// import { positionService } from "../services/positionService";
// import type { Applicant } from "../services/applicantService";
// import { clientService } from "../services/clientService";
// import Select from "react-select";
// import {
//   educationOptions,
//   statusOptions,
//   functionOptions,
//   roleOptions,
//   cityOptions,
//   candidateStatusOptions,
// } from "../constants/dropdown";
// import AsyncSelect from 'react-select/async';


// const PositionManagement = () => {
//   const [currentView, setCurrentView2] = useState("positions");
//   const [selectedPosition, setSelectedPosition] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterBy, setFilterBy] = useState("all");
//   const [groupBy, setGroupBy] = useState("none");
//   const [showTagForm, setShowTagForm] = useState(false);
//   const [showAddCandidate, setShowAddCandidate] = useState(false);
//   const [showCandidateForm, setShowCandidateForm] = useState(false);
//   const [tagFormData, setTagFormData] = useState<TagCandidateFormData>({
//     positionName: "",
//     applicant: "",
//     candidateId: null,
//     recruiter: "",
//     immediateJoiner: false,
//     status: "",
//   });
//   const [showCreatePosition, setShowCreatePosition] = useState(false);
//   const [candidateEmail, setCandidateEmail] = useState("");
//   const [currentUser, setCurrentUser] = useState<string | null>(() => {
//     return localStorage.getItem("email") || null;
//   });
//   const [loadingPositionDetail, setLoadingPositionDetail] = useState(false);
//   const [clientOptions, setClientOptions] = useState([]);
//   const [menuIsOpen, setMenuIsOpen] = useState(false);

//   // Sample data
//   // const [positions, setPositions] = useState([
//   //   {
//   //     id: 1,
//   //     positionName: "Senior Software Engineer",
//   //     clientName: "TechCorp Inc",
//   //     submittedResumes: 15,
//   //     targetedResumes: 25,
//   //     ctcBudget: "15-20 LPA",
//   //     location: "Bangalore",
//   //     priority: "High",
//   //     experience: "4-6 years",
//   //     workplaceType: "Hybrid",
//   //     status: "Active",
//   //     ctcBudgetNumeric: 2000000,
//   //     city: "Bangalore",
//   //     experienceYears: "4-6",
//   //     education: "B.Tech/M.Tech in Computer Science",
//   //     roleDescription:
//   //       "We are looking for a Senior Software Engineer to join our dynamic team...",
//   //     preferredIndustry: "Technology, SaaS",
//   //     preferredCompanies: "Google, Microsoft, Amazon",
//   //     reportees: 2,
//   //     deadline: "2025-08-15",
//   //     rounds: 4,
//   //     interviewerName: "Sarah Johnson",
//   //     interviewerLinkedIn: "linkedin.com/in/sarahjohnson",
//   //     ctcStructure: "80% Fixed + 15% Variable + 5% ESOPs",
//   //     roleType: "New",
//   //     diversityPreference: "Gender Diverse",
//   //     interviewMode: "Video Call",
//   //     jobType: "Full-time",
//   //     clientSPOC: "Mike Wilson",
//   //     lakshSPOC: "Priya Sharma",
//   //     recruiter: "John Doe",
//   //     function: "Engineering",
//   //     role: "Software Engineer",
//   //     budgetForRole: "20 LPA",
//   //     target: 2,
//   //     keywords: "React, Node.js, JavaScript, MongoDB",
//   //     prompt:
//   //       "Find experienced full-stack developers with strong problem-solving skills",
//   //     aiPreferredIndustries: ["Technology", "Fintech", "E-commerce"],
//   //     aiPreferredFunctions: ["Engineering", "Product Development"],
//   //     aiPreferredRole: "Senior Software Engineer",
//   //     createdDate: "2025-07-20",
//   //     lastActivityDate: "2025-07-22",
//   //   },
//   //   {
//   //     id: 2,
//   //     positionName: "Product Manager",
//   //     clientName: "StartupXYZ",
//   //     submittedResumes: 8,
//   //     targetedResumes: 20,
//   //     ctcBudget: "25-30 LPA",
//   //     location: "Mumbai",
//   //     priority: "Medium",
//   //     experience: "5-8 years",
//   //     workplaceType: "Remote",
//   //     status: "Active",
//   //     ctcBudgetNumeric: 2750000,
//   //     city: "Mumbai",
//   //     experienceYears: "5-8",
//   //     education: "MBA/B.Tech with Product Management experience",
//   //     roleDescription:
//   //       "Seeking an experienced Product Manager to drive product strategy...",
//   //     preferredIndustry: "Fintech, E-commerce",
//   //     preferredCompanies: "Flipkart, Paytm, Razorpay",
//   //     reportees: 3,
//   //     deadline: "2025-09-01",
//   //     rounds: 3,
//   //     interviewerName: "Rajesh Kumar",
//   //     interviewerLinkedIn: "linkedin.com/in/rajeshkumar",
//   //     ctcStructure: "70% Fixed + 20% Variable + 10% ESOPs",
//   //     roleType: "Replacement",
//   //     diversityPreference: "None",
//   //     interviewMode: "In-person + Video",
//   //     jobType: "Full-time",
//   //     clientSPOC: "Anita Desai",
//   //     lakshSPOC: "Vikram Singh",
//   //     recruiter: "Jane Smith",
//   //     function: "Product",
//   //     role: "Product Manager",
//   //     budgetForRole: "30 LPA",
//   //     target: 1,
//   //     keywords: "Product Strategy, Analytics, User Experience, Agile",
//   //     prompt:
//   //       "Find product managers with strong analytical skills and startup experience",
//   //     aiPreferredIndustries: ["Fintech", "E-commerce", "SaaS"],
//   //     aiPreferredFunctions: ["Product Management", "Strategy"],
//   //     aiPreferredRole: "Product Manager",
//   //     createdDate: "2025-07-15",
//   //     lastActivityDate: "2025-07-15",
//   //   },
//   // ]);

//   const [positions, setPositions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const recruiter = localStorage.getItem("email") || "";

//   const [newPosition, setNewPosition] = useState({
//     // Basic Job Details
//     positionName: "",
//     clientName: "",
//     status: "Open",
//     roleType: "",
//     jobType: "",
//     priority: "",
//     recruiter: recruiter,
//     clientSPOC: "",

//     // Role Requirements
//     experienceYears: "",
//     education: "",
//     roleDescription: "",
//     function: "",
//     role: "",

//     // Compensation Details
//     ctcBudgetNumeric: "",
//     ctcStructure: "",
//     budgetForRole: "",

//     // Workplace Information
//     workplaceType: "",
//     city: "",

//     // Candidate Preferences
//     preferredIndustry: "",
//     preferredCompanies: "",
//     diversityPreference: "",
//     target: "",

//     // Interview Process
//     rounds: "",
//     interviewerName: "",
//     interviewerLinkedIn: "",
//     interviewMode: "",

//     // Timeline
//     deadline: "",

//     // AI Input Fields
//     keywords: "",
//     prompt: "",
//     aiPreferredIndustries: [],
//     aiPreferredFunctions: [],
//     aiPreferredRole: "",
//   });
//   const navigate = useNavigate();
//   const [candidates, setCandidates] = useState([
//     {
//       id: 1,
//       email: "john.smith@email.com",
//       name: "John Smith",
//       currentCTC: 1500000,
//       expectedCTC: 2000000,
//       noticePeriod: 30,
//       status: "submitted",
//       positionId: 1,
//       recruiter: recruiter,
//       source: "recruiter",
//     },
//     {
//       id: 2,
//       email: "jane.doe@email.com",
//       name: "Jane Doe",
//       currentCTC: 1200000,
//       expectedCTC: 1800000,
//       noticePeriod: 60,
//       status: "internal_screening",
//       positionId: 1,
//       recruiter: "AI Matcher",
//       source: "direct",
//       aiScore: null,
//     },
//     {
//       id: 3,
//       email: "alex.kumar@email.com",
//       name: "Alex Kumar",
//       currentCTC: 1800000,
//       expectedCTC: 2500000,
//       noticePeriod: 45,
//       status: "internal_screening",
//       positionId: 1,
//       recruiter: "Direct Application",
//       source: "direct",
//       aiScore: null,
//     },
//     {
//       id: 4,
//       email: "priya.sharma@email.com",
//       name: "Priya Sharma",
//       currentCTC: 1600000,
//       expectedCTC: 2200000,
//       noticePeriod: 30,
//       status: "internal_screening",
//       positionId: 1,
//       recruiter: "Direct Application",
//       source: "direct",
//       aiScore: null,
//     },
//     {
//       id: 5,
//       email: "rajesh.patel@email.com",
//       name: "Rajesh Patel",
//       currentCTC: 1400000,
//       expectedCTC: 2000000,
//       noticePeriod: 60,
//       status: "internal_reject",
//       positionId: 1,
//       recruiter: "Direct Application",
//       source: "direct",
//       aiScore: 12,
//     },
//   ]);
//   const [isSubmittingTag, setIsSubmittingTag] = useState(false);
//   const [newCandidate, setNewCandidate] = useState({
//     email: "",
//     resume: null,
//     currentCTC: "",
//     specialComments: "",
//     education: "",
//     gender: "",
//     openToRelocation: false,
//     engagementType: "",
//     expectedCTC: "",
//     noticePeriod: "",
//     recruiter: recruiter,
//   });
//   const [filteredCandidates, setFilteredCandidates] = useState<Applicant[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
// const [candidateOptions, setCandidateOptions] = useState([]);
// const [isLoadingCandidates, setIsLoadingCandidates] = useState(false);
//   // const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

//   // const selectCandidate = (candidate: { id: number; name: string }) => {
//   //   setTagFormData({
//   //     ...tagFormData,
//   //     applicant: candidate.name,
//   //     candidateId: candidate.id,
//   //   });
//   //   setFilteredCandidates([]);
//   // };
// const [showDropdown, setShowDropdown] = useState(false);

// // const handleApplicantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //   const value = e.target.value;
// //   setTagFormData(prev => ({ ...prev, applicant: value }));

// //   if (searchTimeout.current) {
// //     clearTimeout(searchTimeout.current);
// //   }

// //   if (value.trim().length < 1) {
// //     setFilteredCandidates([]);
// //     setShowDropdown(false);
// //     return;
// //   }

// //   searchTimeout.current = setTimeout(async () => {
// //     try {
// //       const res = await positionService.fetchAutocomplete(value.trim());
// //       setFilteredCandidates(res?.data || []);
// //       setShowDropdown(true);
// //     } catch (err) {
// //       console.error("Autocomplete fetch error:", err);
// //       setFilteredCandidates([]);
// //       setShowDropdown(false);
// //     }
// //   }, 300);
// // };

// const loadCandidateOptions = async (inputValue) => {
//   if (!inputValue || inputValue.trim().length < 2) {
//     return [];
//   }

//   setIsLoadingCandidates(true);
//   try {
//     const res = await positionService.fetchAutocomplete(inputValue.trim());
//     const candidates = res?.data || [];
    
//     // Transform to react-select format
//     const options = candidates.map((candidate) => ({
//       value: candidate.id,
//       label: `${candidate.name} (${candidate.email})`,
//       email: candidate.email,
//       name: candidate.name,
//       id: candidate.id,
//     }));
    
//     setCandidateOptions(options);
//     return options;
//   } catch (err) {
//     console.error("Autocomplete fetch error:", err);
//     return [];
//   } finally {
//     setIsLoadingCandidates(false);
//   }
// };

// // Debounced version for better performance
// const searchTimeout = useRef(null);
// // Replace the debouncedLoadOptions function with this improved version:
// const debouncedLoadOptions = (inputValue, callback) => {
//   if (searchTimeout.current) {
//     clearTimeout(searchTimeout.current);
//   }

//   if (!inputValue || inputValue.trim().length < 2) {
//     callback([]);
//     return;
//   }

//   searchTimeout.current = setTimeout(async () => {
//     try {
//       const res = await positionService.fetchAutocomplete(inputValue.trim());
//       const candidates = res?.data || [];
      
//       const options = candidates.map((candidate) => ({
//         value: candidate.id,  // This should match what you check in the value prop
//         label: `${candidate.name} (${candidate.email})`,
//         email: candidate.email,
//         name: candidate.name,
//       }));
      
//       callback(options);
//     } catch (err) {
//       console.error("Autocomplete fetch error:", err);
//       callback([]);
//     }
//   }, 300);
// };

// // Update handleCandidateSelect to be more robust:
// const handleCandidateSelect = (selectedOption) => {
//   if (selectedOption) {
//     setTagFormData({
//       ...tagFormData,
//       applicant: selectedOption.label, // Store the full label or just name
//       candidateId: selectedOption.value, // Store the ID as value
//     });
//   } else {
//     // Clear selection
//     setTagFormData({
//       ...tagFormData,
//       applicant: "",
//       candidateId: null,
//     });
//   }
// };

//   const fetchPositionDetail = async (positionId) => {
//     setLoadingPositionDetail(true);
//     try {
//       const res = await positionService.fetchById(positionId);
//       console.log("Fetched position detail response:", res); // Debugging log
//       if (res.status === 200) {
//         const position = res.data;

//         const transformedPosition = {
//           id: String(position.id),
//           positionName: position.title || "N/A",
//           clientName: position.clientName || "N/A",
//           submittedResumes: position.submittedCandidates?.length || 0,
//           targetedResumes: position.targetedResumes || 0,
//           ctcBudget: position.ctcBudget
//             ? `${(Number(position.ctcBudget) / 100000).toFixed(0)} LPA`
//             : "N/A",
//           ctcStructure: position.ctcStructure || "N/A",
//           city: position.location || "N/A",
//           experience: position.experience
//             ? `${position.experience} years`
//             : "N/A",
//           priority: position.priority || "N/A",
//           function: position.function || "N/A",
//           role: position.role || "N/A",
//           workplaceType: position.workplaceType || "N/A",
//           status: position.status || "Open",
//           education: position.education || "N/A",
//           roleDescription: position.roleDescription || "",
//           preferredIndustry: position.preferredIndustry || [],
//           preferredCompanies: position.preferredCompanies || [],
//           reportees: position.reportees || 0,
//           deadline: position.deadline || "",
//           rounds: position.interviewRounds || 0,
//           interviewerName: position.interviewer || "N/A",
//           diversityPreference: position.diversityPreference || "N/A",
//           interviewMode: position.interviewMode || "N/A",
//           jobType: position.jobType || "N/A",
//           clientSpoc: position.clientSpoc || "N/A",
//           lakshSpoc: position.lakshSpoc?.filter(Boolean) || [],
//           recruiter: position.recruiter || "N/A",
//           roleType: position.roleType || "N/A",
//           linkedIn: position.linkedin || null,
//           submittedCandidates: position.submittedCandidates || [],
//           message: position.message || "",
//         };

//         setSelectedPosition(transformedPosition);
//       }
//     } catch (err) {
//       console.error("Error fetching position detail:", err);
//     } finally {
//       setLoadingPositionDetail(false);
//     }
//   };

//   useEffect(() => {
//     const fetchClients = async () => {
//       const res = await clientService.fetchAll();

//       // ✔️ Correct field (res.data)
//       const clients = res?.data || [];

//       setClientOptions(
//         clients.map((c: any) => ({
//           id: c.id,
//           label: c.client_name,
//           value: c.id,
//           clientHRSpocs: c.clientHRSpocs || [],  
//         }))
//       );
//     };

//     fetchClients();
//   }, []);

//   useEffect(() => {
//     const fetchPositions = async () => {
//       try {
//         const res = await positionService.fetchAll(1, 2000);
//         if (res.status === 200) {
//           // Transform API data to match component's expected format
//           const transformedPositions = res.data.positions.map((position) => {
//             // Parse progress "0/0" into separate numbers
//             const [submitted, targeted] = position.progress
//               .split("/")
//               .map(Number);

//             return {
//               id: position.id,
//               positionName: position.title, // Map title to positionName
//               clientName: position.client, // Map client to clientName
//               submittedResumes: submitted || 0,
//               targetedResumes: targeted || 0,
//               ctcBudget: position.ctc
//                 ? `${(position.ctc / 100000).toFixed(0)} LPA`
//                 : "N/A", // Convert numeric CTC to string
//               location: position.location || "N/A",
//               priority: position.priority || "Medium",
//               experience: position.experience
//                 ? `${position.experience} years`
//                 : "N/A",
//               workplaceType: position.mode || "N/A", // Map mode to workplaceType
//               status: position.status || "Active",
//               ctcBudgetNumeric: position.ctc || 0,
//               city: position.location || "N/A",
//               experienceYears: position.experience || "N/A",
//               daysSinceNoAction: position.daysSinceNoAction || 0,

//               // Add default values for fields that might be missing from API
//               education: position.education || "N/A",
//               roleDescription: position.roleDescription || "",
//               preferredIndustry: position.preferredIndustry || "",
//               preferredCompanies: position.preferredCompanies || "",
//               reportees: position.reportees || 0,
//               deadline: position.deadline || "",
//               rounds: position.rounds || 0,
//               interviewerName: position.interviewerName || "",
//               interviewerLinkedIn: position.interviewerLinkedIn || "",
//               ctcStructure: position.ctcStructure || "",
//               roleType: position.roleType || "",
//               diversityPreference: position.diversityPreference || "",
//               interviewMode: position.interviewMode || "",
//               jobType: position.jobType || "",
//               clientSPOC: position.clientSPOC || "",
//               lakshSPOC: position.lakshSPOC || "",
//               recruiter: position.recruiter || "",
//               function: position.function || "",
//               role: position.role || "",
//               budgetForRole: position.ctc
//                 ? `${(position.ctc / 100000).toFixed(0)} LPA`
//                 : "N/A",
//               target: targeted || 0,
//               keywords: position.keywords || "",
//               prompt: position.prompt || "",
//               aiPreferredIndustries: position.aiPreferredIndustries || [],
//               aiPreferredFunctions: position.aiPreferredFunctions || [],
//               aiPreferredRole: position.aiPreferredRole || "",
//               createdDate: position.createdDate || new Date().toISOString(),
//               lastActivityDate:
//                 position.lastActivityDate || new Date().toISOString(),
//             };
//           });

//           setPositions(transformedPositions);
//         } else {
//           console.error("Failed to fetch positions:", res.message);
//         }
//       } catch (err) {
//         console.error("Error fetching positions:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPositions();
//   }, []);
//   // Calculate days since no action
//   const calculateDaysSinceNoAction = (position: string) => {
//     const today = new Date(); // Current date
//     const positionCandidates = candidates.filter(
//       (c) => c.positionId === position.id
//     );

//     // If no resumes are tagged, calculate from creation date
//     if (positionCandidates.length === 0) {
//       const createdDate = new Date(position.createdDate);
//       const diffTime = Math.abs(today - createdDate);
//       return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     }

//     // Check if there are candidates with status updates
//     const hasRecentStatusUpdates = positionCandidates.some((candidate) => {
//       // If candidate has been moved beyond 'submitted' status recently
//       return (
//         candidate.status !== "submitted" &&
//         candidate.status !== "internal_screening"
//       );
//     });

//     if (!hasRecentStatusUpdates) {
//       // Calculate from last activity date
//       const lastActivityDate = new Date(position.lastActivityDate);
//       const diffTime = Math.abs(today - lastActivityDate);
//       return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     }

//     return 0; // Recent activity found
//   };

//   // Filter and group positions
//   const filteredPositions = positions.filter((position) => {
//     const matchesSearch =
//       position.positionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       position.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       position.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       position.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       position.experience.toLowerCase().includes(searchTerm.toLowerCase());

//     if (filterBy === "all") return matchesSearch;
//     return matchesSearch && position.priority === filterBy;
//   });

//   const groupedPositions =
//     groupBy === "clientName"
//       ? filteredPositions.reduce((acc, position) => {
//           const client = position.clientName;
//           if (!acc[client]) acc[client] = [];
//           acc[client].push(position);
//           return acc;
//         }, {})
//       : { "All Positions": filteredPositions };

//   const handleAddCandidate = (positionId) => {
//     setShowAddCandidate(positionId);
//     setCandidateEmail("");
//   };

//   const handleEmailCheck = () => {
//     const existingCandidate = candidates.find(
//       (c) => c.email === candidateEmail
//     );
//     if (existingCandidate) {
//       // Tag existing candidate to position
//       const updatedCandidates = [...candidates];
//       const candidateIndex = updatedCandidates.findIndex(
//         (c) => c.email === candidateEmail
//       );
//       updatedCandidates[candidateIndex] = {
//         ...updatedCandidates[candidateIndex],
//         positionId: showAddCandidate,
//       };
//       setCandidates(updatedCandidates);
//       setShowAddCandidate(false);
//       setCandidateEmail("");
//       alert("Candidate tagged to position successfully!");
//     } else {
//       setShowCandidateForm(true);
//       setNewCandidate({ ...newCandidate, email: candidateEmail });
//     }
//   };

//   const handleCreateCandidate = () => {
//     const candidate = {
//       id: candidates.length + 1,
//       ...newCandidate,
//       status: "submitted",
//       positionId: showAddCandidate,
//       source: "recruiter",
//       name: newCandidate.email.split("@")[0].replace(".", " "),
//     };
//     setCandidates([...candidates, candidate]);
//     setShowCandidateForm(false);
//     setShowAddCandidate(false);
//     setNewCandidate({
//       email: "",
//       resume: null,
//       currentCTC: "",
//       specialComments: "",
//       education: "",
//       gender: "",
//       openToRelocation: false,
//       engagementType: "",
//       expectedCTC: "",
//       noticePeriod: "",
//       recruiter: recruiter,
//     });
//     alert("Candidate created and tagged successfully!");
//   };

//   const handleCreatePosition = async () => {
//     try {
//       // Validate required fields
//       if (!newPosition.positionName) {
//         alert("Please fill in Position Name (required field)");
//         return;
//       }

//       // Prepare the payload matching backend structure exactly
//       const payload = {
//         positionName: newPosition.positionName,
//         clientName: newPosition.clientName, // Set this if you have client ID from somewhere
        
//         priority: newPosition.priority || "",
//         status: newPosition.status ,
//         roleType: newPosition.roleType || "",
//         jobType: newPosition.jobType || "",
//         function: newPosition.function || null,
//         role: newPosition.role || null,
//         roleDescription: newPosition.roleDescription || null,

//         // Experience as number (backend converts to BigInt)
//         experience: newPosition.experienceYears
//           ? parseInt(newPosition.experienceYears.replace(/\D/g, "")) || 0
//           : 0,
//         education: newPosition.education || "",

//         // CTC fields
//         ctcStructure: newPosition.ctcStructure || null,
//         ctcBudget: newPosition.ctcBudgetNumeric
//           ? Number(newPosition.ctcBudgetNumeric)
//           : null,

//         // Workplace
//         workplaceType: newPosition.workplaceType || "",
//         city: newPosition.city || "",

//         // Preferences
//         preferredIndustries: newPosition.preferredIndustry
//           ? newPosition.preferredIndustry
//               .split(",")
//               .map((i) => i.trim())
//               .filter(Boolean)
//           : [],
//         preferredCompanies: newPosition.preferredCompanies || null,
//         diversityPreference: newPosition.diversityPreference || "",
//         target: newPosition.target ? Number(newPosition.target) : 1,
//         recruiter: recruiter,
//         // Interview details
//         numberOfRounds: newPosition.rounds ? Number(newPosition.rounds) : 1,
//         interviewerName: newPosition.interviewerName || null,
//         interviewerLinkedin: newPosition.interviewerLinkedIn || null,
//         modeOfInterview: newPosition.interviewMode || null,

//         // Timeline
//         deadline: newPosition.deadline || null,

//         // AI Input fields
//         keywords: newPosition.keywords || null,
//         aiPrompt: newPosition.prompt || null,
//         aiPreferredIndustries: newPosition.aiPreferredIndustries || [],
//         aiPreferredFunctions: newPosition.aiPreferredFunctions || [],
//         aiPreferredRole: newPosition.aiPreferredRole || null,

//         // Client SPOC
//         clientSpoc: newPosition.clientSPOC || null,
//       };

//       console.log("Sending payload:", payload);

//       // Call the API
//       const response = await positionService.createPosition(payload);

//       if (response.status === 201 || response.status === 200) {
//         alert("Position created successfully!");
//         setShowCreatePosition(false);

//         // Reset form
//         setNewPosition({
//           positionName: "",
//           clientName: "",
//           status: "",
//           roleType: "",
//           jobType: "",
//           priority: "",
//           recruiter: recruiter,
//           clientSPOC: "",
//           experienceYears: "",
//           education: "",
//           roleDescription: "",
//           function: "",
//           role: "",
//           ctcBudgetNumeric: "",
//           ctcStructure: "",
//           budgetForRole: "",
//           workplaceType: "",
//           city: "",
//           preferredIndustry: "",
//           preferredCompanies: "",
//           diversityPreference: "",
//           target: "",
//           rounds: "",
//           interviewerName: "",
//           interviewerLinkedIn: "",
//           interviewMode: "",
//           deadline: "",
//           keywords: "",
//           prompt: "",
//           aiPreferredIndustries: [],
//           aiPreferredFunctions: [],
//           aiPreferredRole: "",
//         });

//         // Refresh the positions list
//         const res = await positionService.fetchAll(1, 2000);
//         if (res.status === 200) {
//           const transformedPositions = res.data.positions.map((position) => {
//             const [submitted, targeted] = position.progress
//               .split("/")
//               .map(Number);
//             return {
//               id: position.id,
//               positionName: position.title,
//               clientName: position.client,
//               submittedResumes: submitted || 0,
//               targetedResumes: targeted || 0,
//               ctcBudget: position.ctc
//                 ||"N/A",
//               location: position.location || "N/A",
//               priority: position.priority ,
//               experience: position.experience
//                 ? `${position.experience} years`
//                 : "N/A",
//               workplaceType: position.mode || "N/A",
//               status: position.status || "Active",
//               ctcBudgetNumeric: position.ctc || 0,
//               city: position.location || "N/A",
//               experienceYears: position.experience || "N/A",
//               daysSinceNoAction: position.daysSinceNoAction || 0,
//             };
//           });
//           setPositions(transformedPositions);
//         }
//       } else {
//         alert(
//           "Failed to create position: " + (response.message || "Unknown error")
//         );
//       }
//     } catch (error) {
//       console.error("Error creating position:", error);
//       alert("Failed to create position. Please try again.");
//     }
//   };
//   const handleMultiSelectChange = (field, value) => {
//     const currentValues = newPosition[field];
//     const updatedValues = currentValues.includes(value)
//       ? currentValues.filter((item) => item !== value)
//       : [...currentValues, value];
//     setNewPosition({ ...newPosition, [field]: updatedValues });
//   };

//   const runAIMatcher = (positionId) => {
//     alert(`AI Matcher running for position ${positionId}...`);
//     // Simulate AI matching
//     setTimeout(() => {
//       alert("AI Matcher completed! New candidates have been suggested.");
//     }, 2000);
//   };

//   const runAIResumeMatcherForPosition = (positionId) => {
//     // Get all direct application candidates with internal_screening status for this position
//     const eligibleCandidates = candidates.filter(
//       (c) =>
//         c.positionId === positionId &&
//         c.source === "direct" &&
//         c.status === "internal_screening"
//     );

//     if (eligibleCandidates.length === 0) {
//       alert(
//         'No candidates with "Internal Screening" status found for AI matching.'
//       );
//       return;
//     }

//     // Simulate AI scoring (normally this would call an actual AI API)
//     alert(
//       `Running AI Resume Matcher for ${eligibleCandidates.length} candidates...`
//     );

//     setTimeout(() => {
//       const updatedCandidates = [...candidates];

//       // Generate random scores for simulation
//       eligibleCandidates.forEach((candidate) => {
//         const score = Math.floor(Math.random() * 100) + 1; // Random score 1-100
//         const candidateIndex = updatedCandidates.findIndex(
//           (c) => c.id === candidate.id
//         );
//         updatedCandidates[candidateIndex] = {
//           ...updatedCandidates[candidateIndex],
//           aiScore: score,
//           status: score >= 85 ? "internal_screening" : "internal_reject", // Top 15% threshold
//         };
//       });

//       setCandidates(updatedCandidates);

//       const topCandidates = eligibleCandidates.filter((_, index) => {
//         const score =
//           updatedCandidates.find((c) => c.id === eligibleCandidates[index].id)
//             ?.aiScore || 0;
//         return score >= 85;
//       });

//       alert(
//         `AI Resume Matcher completed! ${topCandidates.length} candidates qualified for recruiter review. Others moved to "Internal Reject" status.`
//       );
//     }, 3000);
//   };

//   const PositionTable = ({ positions }) => (
//     <div className="bg-white rounded-lg shadow-md overflow-scroll">
//       <div className="w-full">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Position Details
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Client & Priority
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Action
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 CTC & Location
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Days Since No Action
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Progress
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {positions.map((position) => {
//               // const daysSinceNoAction = calculateDaysSinceNoAction(position);
//               return (
//                 <tr
//                   key={position.id}
//                   className="hover:bg-gray-50 cursor-pointer"
//                   onClick={() => {
//                     // setSelectedPosition(position);
//                     fetchPositionDetail(position.id);
//                     setCurrentView2("position-detail");
//                   }}
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div>
//                       <div className="text-sm font-medium text-gray-900">
//                         {position.positionName}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         {position.experience} • {position.workplaceType}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div>
//                       <div className="text-sm text-gray-900">
//                         {position.clientName}
//                       </div>
//                       <div
//                         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${

//                           console.log(position.priority),
//                           position.priority === "High"
//                             ? "bg-red-100 text-red-800"
//                             : position.priority === "Medium"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-green-100 text-green-800"
//                         }`}
//                       >
//                         {position.priority}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex space-x-2">
//                       <button
//                         className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded hover:bg-green-200"
//                         onClick={(e) => {
//                           e.stopPropagation();

//                           setSelectedPosition(position.id);
//                           setTagFormData({
//                             positionName: position.positionName,
//                             applicant: "",
//                             candidateId: null,
//                             recruiter: recruiter,
//                             immediateJoiner: false,
//                             status: "",
//                           });
//                           setShowTagForm(true);
//                         }}
//                       >
//                         Tag Candidate
//                       </button>
//                       <button
//                         onClick={() => navigate("/ai-matcher")}
//                         className="text-purple-600 hover:text-purple-900 px-2 py-1 rounded hover:bg-purple-50"
//                       >
//                         AI Matcher
//                       </button>
//                     </div>
//                   </td>
                  
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div>
                      
//                       <div className="text-sm text-gray-900">
                        
//                         {position.ctcBudget}
//                       </div>
//                       <div className="text-sm text-gray-500 flex items-center">
//                         <MapPin className="w-3 h-3 mr-1" />
//                         {position.location}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div
//                       className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
//                         (
//                         position.daysSinceNoAction === 0
//                           ? "bg-green-100 text-green-800"
//                           : position.daysSinceNoAction <= 3
//                           ? "bg-yellow-100 text-yellow-800"
//                           : position.daysSinceNoAction <= 7
//                           ? "bg-orange-100 text-orange-800"
//                           : "bg-red-100 text-red-800")
//                       }`}
//                     >
//                       {position.daysSinceNoAction === 0
//                         ? "Active"
//                         : `${position.daysSinceNoAction} days`}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="text-sm text-gray-900">
//                         {position.submittedResumes}/{position.targetedResumes}
//                       </div>
//                       <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
//                         <div
//                           className="bg-blue-600 h-2 rounded-full"
//                           style={{
//                             width: `${Math.min(
//                               (position.submittedResumes /
//                                 position.targetedResumes) *
//                                 100,
//                               100
//                             )}%`,
//                           }}
//                         ></div>
//                       </div>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

// const TagCandidateModal = ({ onClose }: { onClose: () => void }) => {
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!tagFormData.candidateId) {
//       alert("Please select a valid candidate");
//       return;
//     }
    
//     if (!tagFormData.recruiter) {
//       alert("Recruiter email is required");
//       return;
//     }

//     setIsSubmittingTag(true);

//     try {
//       const response = await positionService.tagCandidateToPosition(
//         String(selectedPosition),
//         {
//           candidateId: tagFormData.candidateId,
//           recruiterEmail: tagFormData.recruiter,
//           immediateJoiner: tagFormData.immediateJoiner,
//           status: tagFormData.status,
//         }
//       );

//       if (response.status === 201) {
//         alert("Candidate tagged successfully!");
//         setShowTagForm(false);
//         setTagFormData({
//           positionName: "",
//           applicant: "",
//           candidateId: null,
//           recruiter: "",
//           immediateJoiner: false,
//           status: "",
//         });
//         setSelectedPosition(null);

//         // Optionally refresh position details
//         if (currentView === "position-detail") {
//           fetchPositionDetail(selectedPosition);
//         }
//       }
//     } catch (error) {
//       console.error("Error tagging candidate:", error);
//       alert("Failed to tag candidate. Please try again.");
//     } finally {
//       setIsSubmittingTag(false);
//     }
//   };

//   const handleClose = () => {
//     setTagFormData({
//       positionName: "",
//       applicant: "",
//       candidateId: null,
//       recruiter: "",
//       immediateJoiner: false,
//       status: "",
//     });
//     setSelectedPosition(null);
//     onClose();
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//         onMouseDown={(e) => {
//         // Prevent backdrop clicks from closing modal or affecting content
//         e.preventDefault();
//         e.stopPropagation();
//       }}
//     >
//       <div
//         className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="p-6">
//           <div className="flex justify-between items-start mb-4">
//             <h2 className="text-xl font-bold text-gray-800">Tag Candidate</h2>
//             <button
//               onClick={handleClose}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Position Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={tagFormData.positionName}
//                 onChange={(e) =>
//                   setTagFormData({
//                     ...tagFormData,
//                     positionName: e.target.value,
//                   })
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
//                 placeholder="Enter position name"
//                 readOnly
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Applicant <span className="text-red-500">*</span>
//               </label>
//               <AsyncSelect
//                 cacheOptions
//                 defaultOptions={false}
//                 loadOptions={debouncedLoadOptions}
//                 isSearchable
//                 isClearable
//                 placeholder="Type to search candidate by email or name..."
//                 noOptionsMessage={({ inputValue }) =>
//                   !inputValue
//                     ? "Type at least 2 characters to search..."
//                     : "No candidates found"
//                 }
//                 loadingMessage={() => "Searching candidates..."}
//                 onChange={handleCandidateSelect}
//                 value={
//                   tagFormData.candidateId
//                     ? {
//                         value: tagFormData.candidateId,
//                         label: tagFormData.applicant,
//                       }
//                     : null
//                 }
//                 styles={{
//                   control: (base) => ({
//                     ...base,
//                     minHeight: "42px",
//                     borderColor: "#d1d5db",
//                     "&:hover": {
//                       borderColor: "#3b82f6",
//                     },
//                   }),
//                   menu: (base) => ({
//                     ...base,
//                     zIndex: 9999,
//                   }),
//                 }}
//                 components={{
//                   DropdownIndicator: () => null,
//                   IndicatorSeparator: () => null,
//                 }}
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 Start typing at least 2 characters to search candidates
//               </p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Recruiter <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={tagFormData.recruiter}
//                 onChange={(e) =>
//                   setTagFormData({
//                     ...tagFormData,
//                     recruiter: e.target.value,
//                   })
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter recruiter name"
//               />
//             </div>

//             <div className="flex items-start">
//               <input
//                 type="checkbox"
//                 id="immediateJoiner"
//                 checked={tagFormData.immediateJoiner}
//                 onChange={(e) =>
//                   setTagFormData({
//                     ...tagFormData,
//                     immediateJoiner: e.target.checked,
//                   })
//                 }
//                 className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <div>
//                 <label
//                   htmlFor="immediateJoiner"
//                   className="text-sm font-medium text-gray-700"
//                 >
//                   Immediate Joiner
//                 </label>
//                 <p className="text-xs text-gray-500">
//                   Pl tick this if its an immediate joiner (within 15 days max)
//                 </p>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Status <span className="text-red-500">*</span>
//               </label>
//               <Select
//                 options={candidateStatusOptions}
//                 isSearchable
//                 placeholder="Select status..."
//                 value={candidateStatusOptions.find(
//                   (opt) => opt.value === tagFormData.status
//                 )}
//                 onChange={(selected) =>
//                   setTagFormData({ ...tagFormData, status: selected?.value })
//                 }
//               />
//             </div>

//             <div className="flex justify-end space-x-3 pt-4">
//               <button
//                 type="button"
//                 onClick={handleClose}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isSubmittingTag}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
//               >
//                 {isSubmittingTag ? "Submitting..." : "Submit"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
//   const PositionDetail = ({
//   position,
//   candidates = [],
//   currentUser,
//   setCurrentView,
//   setCandidates,
//   runAIResumeMatcherForPosition,
//   fetchPositionDetail,
//   positionService,
//   clientOptions = [],
//   educationOptions,
//   statusOptions,
//   functionOptions,
//   roleOptions,
//   cityOptions,
//   }) => {
//     // Add debugging at the start

//     const [isEditing, setIsEditing] = useState(false);
//     const [editedPosition, setEditedPosition] = useState({ ...position });
//     const [directAppStatusFilter, setDirectAppStatusFilter] = useState("all");

//     // Update editedPosition when position prop changes
//     // useEffect(() => {
//     //   if (position) {
//     //     console.log("Setting editedPosition with:", position);
//     //     setEditedPosition({ ...position });
//     //   }
//     // }, [position]);

//     const handleInputChange = (field, value) => {
//       setEditedPosition((prev) => ({ ...prev, [field]: value }));
//     };

//   const handleSave = async () => {
//   try {
//     const positionId = position?.id || editedPosition?.id;

//     if (!positionId) {
//       alert("Position ID is missing. Please try refreshing the page.");
//       return;
//     }

//     // Map display fields to API fields with proper data types
//     const updateData = {
//       id: String(positionId),
//       title: editedPosition.positionName,
//       clientSpoc: editedPosition.clientSpoc || null,
//       location: editedPosition.location,
//       status: editedPosition.status,
      
//       // CTC - remove " LPA" suffix and convert to number
//       ctcBudget: editedPosition.ctcBudget 
//         ? Number(String(editedPosition.ctcBudget).replace(/[^0-9]/g, '')) * 100000
//         : null,
      
//       // Experience - extract number from string
//       experience: editedPosition.experience
//         ? parseInt(String(editedPosition.experience).replace(/\D/g, "")) || 0
//         : 0,
      
//       education: editedPosition.education || "",
//       workplaceType: editedPosition.workplaceType || "",
//       reportees: parseInt(editedPosition.reportees) || 0,
//       deadline: editedPosition.deadline || null,
      
//       // Interview rounds
//       interviewRounds: parseInt(editedPosition.rounds) || 0,
//       interviewer: editedPosition.interviewerName || null,
      
//       jobType: editedPosition.jobType || "",
//       roleDescription: editedPosition.roleDescription || null,
      
//       // Arrays - ensure proper format
//       preferredIndustry: Array.isArray(editedPosition.preferredIndustry)
//         ? editedPosition.preferredIndustry
//         : editedPosition.preferredIndustry 
//           ? String(editedPosition.preferredIndustry).split(',').map(i => i.trim()).filter(Boolean)
//           : [],
      
//       preferredCompanies: Array.isArray(editedPosition.preferredCompanies)
//         ? editedPosition.preferredCompanies
//         : editedPosition.preferredCompanies
//           ? String(editedPosition.preferredCompanies).split(',').map(c => c.trim()).filter(Boolean)
//           : [],
      
//       roleType: editedPosition.roleType || "",
//       diversityPreference: editedPosition.diversityPreference || "",
//       interviewMode: editedPosition.interviewMode || null,
//       linkedin: editedPosition.linkedIn || null,
      
//       lakshSpoc: Array.isArray(editedPosition.lakshSpoc)
//         ? editedPosition.lakshSpoc.filter(Boolean)
//         : editedPosition.lakshSpoc
//           ? [editedPosition.lakshSpoc]
//           : [],
      
//       // Additional fields
//       priority: editedPosition.priority || "",
//       ctcStructure: editedPosition.ctcStructure || null,
//       function: editedPosition.function || null,
//       role: editedPosition.role || null,
//       city: editedPosition.city || editedPosition.location || "",
//       target: editedPosition.target ? Number(editedPosition.target) : null,
//     };

//     console.log("Sending update data:", updateData);

//     const response = await positionService.updatePosition(
//       String(positionId),
//       updateData
//     );

//     if (response.status === 200) {
//       alert("Position updated successfully!");
//       setIsEditing(false);
//       await fetchPositionDetail(positionId);
//     } else {
//       alert("Update failed: " + (response.message || "Unknown error"));
//     }
//   } catch (error) {
//     console.error("Error updating position:", error);
//     alert("Failed to update position: " + (error.message || "Please try again."));
//   }
// };

//     // Rest of the component...
//     const handleCancel = () => {
//       setEditedPosition({ ...position });
//       setIsEditing(false);
//     };

//     const submittedCandidates = candidates.filter(
//       (c) => c.positionId === position.id && c.source === "recruiter"
//     );
//     const allDirectApplications = candidates.filter(
//       (c) => c.positionId === position.id && c.source === "direct"
//     );

//     const directApplications =
//       directAppStatusFilter === "all"
//         ? allDirectApplications
//         : allDirectApplications.filter(
//             (c) => c.status === directAppStatusFilter
//           );

//     const getStatusBadge = (status) => {
//       const statusStyles = {
//         internal_screening: "bg-yellow-100 text-yellow-800",
//         internal_reject: "bg-red-100 text-red-800",
//         submitted: "bg-blue-100 text-blue-800",
//         interview_scheduled: "bg-purple-100 text-purple-800",
//         selected: "bg-green-100 text-green-800",
//       };

//       const statusLabels = {
//         internal_screening: "Internal Screening",
//         internal_reject: "Internal Reject",
//         submitted: "Submitted",
//         interview_scheduled: "Interview Scheduled",
//         selected: "Selected",
//       };

//       return (
//         <span
//           className={`px-2 py-1 rounded text-xs font-medium ${
//             statusStyles[status] || "bg-gray-100 text-gray-800"
//           }`}
//         >
//           {statusLabels[status] || status}
//         </span>
//       );
//     };

//     // const renderField = (label, field, isTextarea = false) => (
//     //   <div>
//     //     <strong>{label}:</strong>{" "}
//     //     {isEditing ? (
//     //       isTextarea ? (
//     //         <textarea
//     //           value={editedPosition[field] || ""}
//     //           onChange={(e) => handleInputChange(field, e.target.value)}
//     //           className="border px-2 py-1 rounded w-full mt-1 text-sm"
//     //           rows={3}
//     //         />
//     //       ) : (
//     //         <input
//     //           type="text"
//     //           value={editedPosition[field] || ""}
//     //           onChange={(e) => handleInputChange(field, e.target.value)}
//     //           className="border px-2 py-1 rounded w-full mt-1 text-sm"
//     //         />
//     //       )
//     //     ) : (
//     //       position[field]
//     //     )}
//     //   </div>
//     // );
// // Render field with React-Select support
// const renderField = (label, field, type = "text", options = null) => {
//   const isReactSelect = options && options.isReactSelect;
//   const selectOptions = options?.options || [];
  
//   return (
//     <div className="mb-4">
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         <strong>{label}:</strong>
//       </label>
//       {isEditing ? (
//         isReactSelect ? (
//           <Select
//             options={selectOptions}
//             isSearchable
//             placeholder={`Select ${label}...`}
//             value={selectOptions.find((opt) => opt.value === editedPosition[field])}
//             onChange={(selected) => handleInputChange(field, selected?.value || "")}
//             className="text-sm"
//           />
//         ) : type === "textarea" ? (
//           <textarea
//             value={editedPosition[field] || ""}
//             onChange={(e) => handleInputChange(field, e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
//             rows={3}
//           />
//         ) : type === "select" ? (
//           <select
//             value={editedPosition[field] || ""}
//             onChange={(e) => handleInputChange(field, e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
//           >
//             <option value="">Select {label}</option>
//             {selectOptions.map((opt) => (
//               <option key={opt} value={opt}>{opt}</option>
//             ))}
//           </select>
//         ) : type === "number" ? (
//           <input
//             type="number"
//             value={editedPosition[field] || ""}
//             onChange={(e) => handleInputChange(field, e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
//           />
//         ) : type === "date" ? (
//           <input
//             type="date"
//             value={editedPosition[field] || ""}
//             onChange={(e) => handleInputChange(field, e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
//           />
//         ) : (
//           <input
//             type="text"
//             value={editedPosition[field] || ""}
//             onChange={(e) => handleInputChange(field, e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
//           />
//         )
//       ) : (
//         <span className="text-sm text-gray-900">{position[field] || "N/A"}</span>
//       )}
//     </div>
//   );
// };
//     return (
//       <div className="max-w-6xl mx-auto p-6 bg-white m-6 rounded-lg">
//         {/* Header */}
//         <div className="flex items-center mb-6">
//           <button
//             onClick={() => setCurrentView2("positions")}
//             className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <h2 className="text-2xl font-bold text-gray-900">
//             {position.positionName}
//           </h2>
//         </div>

//         {/* Editable Sections */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           {/* Left section */}
//           <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Position Details</h2>
//               {!isEditing ? (
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="text-blue-600 hover:text-blue-800 text-sm"
//                 >
//                   Edit
//                 </button>
//               ) : (
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => handleSave()}
//                     className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={handleCancel}
//                     className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-400"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               )}
//             </div>
//             {/* <div className="grid gap-4">
//               {renderField("Client Name", "clientName")}
//               {renderField("Status", "status")}
//               {renderField("CTC Budget", "ctcBudget")}
//               {renderField("Location", "location")}
//               {renderField("Experience", "experience")}
//               {renderField("Education", "education")}
//               {renderField("Workplace Type", "workplaceType")}
//               {renderField("Reportees", "reportees")}
//               {renderField("Deadline", "deadline")}
//               {renderField("Interview Rounds", "rounds")}
//               {renderField("Interviewer", "interviewerName")}
//               {renderField("Job Type", "jobType")}
//               {renderField("Client SPOC", "clientSpoc")}
//               {renderField("Laksh SPOC", "lakshSpoc")}
//               {renderField("Role Description", "roleDescription", true)}
//               {renderField("Preferred Industry", "preferredIndustry")}
//               {renderField("Preferred Companies", "preferredCompanies")}
//             </div> */}
//             <div className="grid gap-4">
//   {renderField("Position Name", "positionName")}
//   {renderField("Client Name", "clientName")}
//   {renderField("Status", "status", "select", {
//     options: ["Open", "On Hold", "Close by LHR", "Lost", "Candidate identified"]
//   })}
//   {renderField("Priority", "priority", "select", {
//     options: ["High", "Medium", "Low"]
//   })}
//   {renderField("Role Type", "roleType", "select", {
//     options: ["New", "Replacement"]
//   })}
//   {renderField("Job Type", "jobType", "select", {
//     options: ["Full-time", "Part-time", "Contract", "Internship"]
//   })}
  
//   {/* Education with React-Select */}
//   {renderField("Education", "education", "text", {
//     isReactSelect: true,
//     options: educationOptions
//   })}
  
//   {/* Function with React-Select */}
//   {renderField("Function", "function", "text", {
//     isReactSelect: true,
//     options: functionOptions
//   })}
  
//   {/* Role with React-Select */}
//   {renderField("Role", "role", "text", {
//     isReactSelect: true,
//     options: roleOptions
//   })}
  
//   {renderField("CTC Budget", "ctcBudget")}
//   {renderField("CTC Structure", "ctcStructure")}
  
//   {/* City with React-Select */}
//   {renderField("City", "city", "text", {
//     isReactSelect: true,
//     options: cityOptions
//   })}
  

//   {renderField("Experience", "experience")}
//   {renderField("Workplace Type", "workplaceType", "select", {
//     options: ["In office", "Remote", "Hybrid"]
//   })}
//   {renderField("Reportees", "reportees", "number")}
//   {renderField("Deadline", "deadline", "date")}
//   {renderField("Interview Rounds", "rounds", "number")}
//   {renderField("Interviewer", "interviewerName")}
//   {renderField("Interview Mode", "interviewMode", "select", {
//     options: ["Video Call", "In-person", "Phone Call", "In-person + Video"]
//   })}
//   {renderField("Client SPOC", "clientSpoc")}
//   {renderField("Laksh SPOC", "lakshSpoc")}
//   {renderField("Role Description", "roleDescription", "textarea")}
//   {renderField("Preferred Industry", "preferredIndustry")}
//   {renderField("Preferred Companies", "preferredCompanies")}
//   {renderField("Diversity Preference", "diversityPreference", "select", {
//     options: ["", "Gender Diverse", "Ethnically Diverse", "Age Diverse"]
//   })}
//   {renderField("Target", "target", "number")}
// </div>
//           </div>

//           {/* Right section */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold mb-4">Additional Info</h2>
//             <div className="space-y-3">
//               {renderField("CTC Structure", "ctcStructure")}
//               {renderField("Role Type", "roleType")}
//               {position.diversityPreference &&
//                 renderField("Diversity Preference", "diversityPreference")}
//               {position.interviewMode &&
//                 renderField("Interview Mode", "interviewMode")}
//               <div>
//                 <strong>LinkedIn:</strong>{" "}
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     value={editedPosition.interviewerLinkedIn || ""}
//                     onChange={(e) =>
//                       handleInputChange("interviewerLinkedIn", e.target.value)
//                     }
//                     className="border px-2 py-1 rounded w-full mt-1 text-sm"
//                   />
//                 ) : (
//                   <a
//                     href={`https://${position.interviewerLinkedIn}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:underline ml-1"
//                   >
//                     View Profile
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Submitted Candidates */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold mb-4 flex items-center">
//               <Users className="w-5 h-5 mr-2" />
//               Submitted Candidates ({position.submittedCandidates.length})
//             </h2>
//             <div className="space-y-3">
//               {position.submittedCandidates.map((candidate) => (
//                 <div key={candidate.id} className="border rounded-lg p-4">
//                   <div>
//                     <h3 className="font-medium">{candidate.name}</h3>
//                     <p className="text-gray-600 text-sm">{candidate.email}</p>
//                     <div className="mt-2 text-sm text-gray-600">
//                       <div>Current CTC: ₹{candidate.current_ctc} LPA</div>
//                       <div>Expected CTC: ₹{candidate.expected_ctc} LPA</div>
//                       <div>Notice Period: {candidate.noticeperiod} days</div>
//                       <div>Recruiter: {candidate.recruiter}</div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {position.submittedCandidates.length === 0 && (
//                 <p className="text-gray-500 text-center py-4">
//                   No submitted candidates yet
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Direct Applications */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold flex items-center">
//                 <Mail className="w-5 h-5 mr-2" />
//                 Direct Applications ({directApplications.length})
//               </h2>
//               <div className="flex items-center gap-3">
//                 <select
//                   className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
//                   value={directAppStatusFilter}
//                   onChange={(e) => setDirectAppStatusFilter(e.target.value)}
//                 >
//                   <option value="all">All Status</option>
//                   <option value="internal_screening">Internal Screening</option>
//                   <option value="internal_reject">Internal Reject</option>
//                   <option value="interview_scheduled">
//                     Interview Scheduled
//                   </option>
//                   <option value="selected">Selected</option>
//                 </select>
//                 <button
//                   onClick={() => runAIResumeMatcherForPosition(position.id)}
//                   className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
//                 >
//                   <Bot className="w-4 h-4" />
//                   AI Resume Matcher
//                 </button>
//               </div>
//             </div>
//             <div className="space-y-3">
//               {directApplications.map((candidate) => (
//                 <div key={candidate.id} className="border rounded-lg p-4">
//                   <div>
//                     <div className="flex items-center gap-3 mb-2">
//                       <h3 className="font-medium">{candidate.name}</h3>
//                       {getStatusBadge(candidate.status)}
//                       {candidate.aiScore && (
//                         <span
//                           className={`px-2 py-1 rounded text-xs font-medium ${
//                             candidate.aiScore >= 85
//                               ? "bg-green-100 text-green-800"
//                               : "bg-red-100 text-red-800"
//                           }`}
//                         >
//                           AI Score: {candidate.aiScore}
//                         </span>
//                       )}
//                     </div>
//                     <p className="text-gray-600 text-sm mb-2">
//                       {candidate.email}
//                     </p>
//                     <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
//                       <div>
//                         Current CTC: ₹
//                         {(candidate.currentCTC / 100000).toFixed(1)} LPA
//                       </div>
//                       <div>
//                         Expected CTC: ₹
//                         {(candidate.expectedCTC / 100000).toFixed(1)} LPA
//                       </div>
//                       <div>Notice Period: {candidate.noticePeriod} days</div>
//                       <div>Source: {candidate.recruiter}</div>
//                     </div>
//                     {candidate.status === "internal_screening" &&
//                       candidate.aiScore >= 85 && (
//                         <div className="mt-3">
//                           <button
//                             onClick={() => {
//                               const updatedCandidates = [...candidates];
//                               const candidateIndex =
//                                 updatedCandidates.findIndex(
//                                   (c) => c.id === candidate.id
//                                 );
//                               updatedCandidates[candidateIndex] = {
//                                 ...updatedCandidates[candidateIndex],
//                                 status: "submitted",
//                                 source: "recruiter",
//                                 recruiter: recruiter,
//                               };
//                               setCandidates(updatedCandidates);
//                               alert(
//                                 "Candidate tagged to position successfully!"
//                               );
//                             }}
//                             className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
//                           >
//                             Tag to Position
//                           </button>
//                         </div>
//                       )}
//                   </div>
//                 </div>
//               ))}
//               {directApplications.length === 0 && (
//                 <p className="text-gray-500 text-center py-4">
//                   {directAppStatusFilter === "all"
//                     ? "No direct applications yet"
//                     : `No candidates with "${directAppStatusFilter.replace(
//                         "_",
//                         " "
//                       )}" status`}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//  if (currentView === "position-detail" && selectedPosition) {
//   return (
//     <PositionDetail 
//       position={selectedPosition} 
//       candidates={candidates}
//       currentUser={currentUser}
//       setCurrentView={setCurrentView2}
//       setCandidates={setCandidates}
//       runAIResumeMatcherForPosition={runAIResumeMatcherForPosition}
//       fetchPositionDetail={fetchPositionDetail}
//       positionService={positionService}
//       clientOptions={clientOptions}
//       educationOptions={educationOptions}
//       statusOptions={statusOptions}
//       functionOptions={functionOptions}
//       roleOptions={roleOptions}
//       cityOptions={cityOptions}
//     />
//   );
// }

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="p-6 space-y-6 max-w-7xl mx-auto">
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//             <div>
//               <div className="max-w-6x1 mx-auto">
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//                   {/* Header */}
//                   {showTagForm && (
//                     <TagCandidateModal onClose={() => setShowTagForm(false)} />
//                   )}
//                   <div className="border-b border-gray-200 p-6">
//                     <div className="flex justify-between items-center mb-6">
//                       <h2 className="text-3xl font-bold text-gray-900">
//                         Position Management
//                       </h2>
//                       <button
//                         className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
//                         onClick={() => setShowCreatePosition(true)}
//                       >
//                         <Plus className="w-4 h-4" />
//                         Create Position
//                       </button>
//                     </div>
//                   </div>

//                   {/* Search and Filters */}
//                   <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//                     <div className="flex flex-col md:flex-row gap-4">
//                       <div className="flex-1 relative">
//                         <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                         <input
//                           type="text"
//                           placeholder="Search by client name, location, priority, CTC budget, experience..."
//                           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           value={searchTerm}
//                           onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                       </div>
//                       <div className="flex gap-4">
//                         <select
//                           className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           value={filterBy}
//                           onChange={(e) => setFilterBy(e.target.value)}
//                         >
//                           <option value="all">All Priorities</option>
//                           <option value="High">High Priority</option>
//                           <option value="Medium">Medium Priority</option>
//                           <option value="Low">Low Priority</option>
//                         </select>
//                         <select
//                           className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           value={groupBy}
//                           onChange={(e) => setGroupBy(e.target.value)}
//                         >
//                           <option value="none">No Grouping</option>
//                           <option value="clientName">Group by Client</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Positions List */}
//                   <div className="space-y-6">
//                     {Object.entries(groupedPositions).map(
//                       ([groupName, groupPositions]) => (
//                         <div key={groupName}>
//                           {groupBy !== "none" && (
//                             <h2 className="text-xl font-semibold text-gray-900 mb-4">
//                               {groupName}
//                             </h2>
//                           )}
//                           <PositionTable positions={groupPositions} />
//                         </div>
//                       )
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Add Candidate Modal */}
//               {showAddCandidate && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                   <div className="bg-white rounded-lg p-6 w-full max-w-md">
//                     <h2 className="text-xl font-semibold mb-4">
//                       Add Candidate
//                     </h2>
//                     <div className="mb-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Email ID
//                       </label>
//                       <input
//                         type="email"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                         value={candidateEmail}
//                         onChange={(e) => setCandidateEmail(e.target.value)}
//                         placeholder="Enter candidate email"
//                       />
//                     </div>
//                     <div className="flex gap-3">
//                       <button
//                         onClick={handleEmailCheck}
//                         className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                         disabled={!candidateEmail}
//                       >
//                         Check Email
//                       </button>
//                       <button
//                         onClick={() => setShowAddCandidate(false)}
//                         className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Create Candidate Form Modal */}
//               {showCandidateForm && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
//                   <div className="bg-white rounded-lg p-6 w-full max-w-2xl m-4">
//                     <h2 className="text-xl font-semibold mb-4">
//                       Create New Candidate
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           value={newCandidate.email}
//                           onChange={(e) =>
//                             setNewCandidate({
//                               ...newCandidate,
//                               email: e.target.value,
//                             })
//                           }
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Current CTC (₹)
//                         </label>
//                         <input
//                           type="number"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           value={newCandidate.currentCTC}
//                           onChange={(e) =>
//                             setNewCandidate({
//                               ...newCandidate,
//                               currentCTC: e.target.value,
//                             })
//                           }
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Expected CTC (₹)
//                         </label>
//                         <input
//                           type="number"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           value={newCandidate.expectedCTC}
//                           onChange={(e) =>
//                             setNewCandidate({
//                               ...newCandidate,
//                               expectedCTC: e.target.value,
//                             })
//                           }
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Notice Period (days)
//                         </label>
//                         <input
//                           type="number"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           value={newCandidate.noticePeriod}
//                           onChange={(e) =>
//                             setNewCandidate({
//                               ...newCandidate,
//                               noticePeriod: e.target.value,
//                             })
//                           }
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Education
//                         </label>
//                         <input
//                           type="text"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           value={newCandidate.education}
//                           onChange={(e) =>
//                             setNewCandidate({
//                               ...newCandidate,
//                               education: e.target.value,
//                             })
//                           }
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Gender
//                         </label>
//                         <select
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           value={newCandidate.gender}
//                           onChange={(e) =>
//                             setNewCandidate({
//                               ...newCandidate,
//                               gender: e.target.value,
//                             })
//                           }
//                         >
//                           <option value="">Select Gender</option>
//                           <option value="Male">Male</option>
//                           <option value="Female">Female</option>
//                           <option value="Other">Other</option>
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Engagement Typedd
//                         </label>
//                         <select
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           value={newCandidate.engagementType}
//                           onChange={(e) =>
//                             setNewCandidate({
//                               ...newCandidate,
//                               engagementType: e.target.value,
//                             })
//                           }
//                         >
//                           <option value="">Select Type</option>
//                           <option value="Full-time">Full-time</option>
//                           <option value="Part-time">Part-time</option>
//                           <option value="Contract">Contract</option>
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Recruiter
//                         </label>
//                         <input
//                           type="text"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
//                           value={newCandidate.recruiter}
//                           readOnly
//                         />
//                       </div>
//                       <div className="md:col-span-2">
//                         <label className="flex items-center">
//                           <input
//                             type="checkbox"
//                             className="mr-2"
//                             checked={newCandidate.openToRelocation}
//                             onChange={(e) =>
//                               setNewCandidate({
//                                 ...newCandidate,
//                                 openToRelocation: e.target.checked,
//                               })
//                             }
//                           />
//                           Open to Relocation
//                         </label>
//                       </div>
//                       <div className="md:col-span-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Special Comments
//                         </label>
//                         <textarea
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           rows={3}
//                           value={newCandidate.specialComments}
//                           onChange={(e) =>
//                             setNewCandidate({
//                               ...newCandidate,
//                               specialComments: e.target.value,
//                             })
//                           }
//                         />
//                       </div>
//                     </div>
//                     <div className="flex gap-3 mt-6">
//                       <button
//                         onClick={handleCreateCandidate}
//                         className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                       >
//                         Create Candidate
//                       </button>
//                       <button
//                         onClick={() => setShowCandidateForm(false)}
//                         className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Create Position Form Modal */}
//               {showCreatePosition && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
//                   <div className="bg-white rounded-lg p-6 w-full max-w-4xl m-4 max-h-screen overflow-y-auto">
//                     <div className="flex justify-between items-center mb-6">
//                       <h2 className="text-2xl font-semibold">
//                         Create New Position
//                       </h2>
//                       <button
//                         onClick={() => setShowCreatePosition(false)}
//                         className="text-gray-500 hover:text-gray-700"
//                       >
//                         ✕
//                       </button>
//                     </div>

//                     <div className="space-y-8">
//                       {/* Basic Job Details */}
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h3 className="text-lg font-semibold mb-4 flex items-center">
//                           📌 Basic Job Details
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Position Name *
//                             </label>
//                             <input
//                               type="text"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.positionName}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   positionName: e.target.value,
//                                 })
//                               }
//                               required
//                             />
//                           </div>
//                           {/* <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Client Name *
//                             </label>
//                             <input
//                               type="text"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.clientName}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   clientName: e.target.value,
//                                 })
//                               }
//                               required
//                             />
//                           </div> */}
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Client Name *
//                             </label>

//                             <Select
//   options={clientOptions}
//   value={clientOptions.find(
//     (opt) => opt.value === newPosition.clientName
//   )}
//   onChange={(selected) => {
//     // Get the first SPOC if available
//     const firstSpoc = selected?.clientHRSpocs?.[0]?.client_SPOC || "";
    
//     setNewPosition({
//       ...newPosition,
//       clientName: selected.value,
//       clientSPOC: firstSpoc,
//     });
//   }}
//   isSearchable
//   placeholder="Search client..."
// />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Status
//                             </label>
//                             <select
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.status}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   status: e.target.value,
//                                 })
//                               }
//                             >
//                               <option value="Open">Open</option>
//                               <option value="On Hold">On Hold</option>
//                               <option value="Close by LHR">Close by LHR</option>
//                               <option value="Lost">Lost</option>
//                               <option value="Candidate identified">
//                                 Candidate identified
//                               </option>
//                             </select>
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               New / Replacement Role
//                             </label>
//                             <select
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.roleType}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   roleType: e.target.value,
//                                 })
//                               }
//                             >
//                               <option value="">Select</option>
//                               <option value="New">New</option>
//                               <option value="Replacement">Replacement</option>
//                             </select>
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Job Type
//                             </label>
//                             <select
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.jobType}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   jobType: e.target.value,
//                                 })
//                               }
//                             >
//                               <option value="">Select</option>
//                               <option value="Full-time">Full-time</option>
//                               <option value="Part-time">Part-time</option>
//                               <option value="Contract">Contract</option>
//                               <option value="Internship">Internship</option>
//                             </select>
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Priority
//                             </label>
//                             <select
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.priority}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   priority: e.target.value,
//                                 })
//                               }
//                             >
//                               <option value="">Select Priority</option>
//                               <option value="High">High</option>
//                               <option value="Medium">Medium</option>
//                               <option value="Low">Low</option>
//                             </select>
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Recruiter
//                             </label>
//                             <input
//                               type="text"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
//                               value={newPosition.recruiter}
//                               readOnly
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Client SPOC
//                             </label>
//                             <input
//                               type="text"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.clientSPOC}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   clientSPOC: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Role Requirements */}
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h3 className="text-lg font-semibold mb-4 flex items-center">
//                           💼 Role Requirements
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Experience Needed (years)
//                             </label>
//                             <input
//                               type="text"
//                               placeholder=""
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.experienceYears}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   experienceYears: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Education
//                             </label>
//                             <Select
//                               options={educationOptions}
//                               isSearchable
//                               placeholder="Select education..."
//                               value={educationOptions.find(
//                                 (opt) => opt.value === newPosition.education
//                               )}
//                               onChange={(selected) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   education: selected.value, // lowercase value DB me store hogi
//                                 })
//                               }
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Function
//                             </label>

//                             <Select
//                               options={functionOptions}
//                               isSearchable
//                               placeholder="Select Function"
//                               value={functionOptions.find(
//                                 (opt) => opt.value === newPosition.function
//                               )}
//                               onChange={(selected) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   function: selected.value, // DB me lowercase save hoga
//                                 })
//                               }
//                               getOptionLabel={(opt) => opt.label}
//                               getOptionValue={(opt) => opt.value}
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Select the Role
//                             </label>

//                             <Select
//                               options={roleOptions}
//                               isSearchable
//                               placeholder="Select role..."
//                               value={roleOptions.find(
//                                 (opt) => opt.value === newPosition.role
//                               )}
//                               onChange={(selected) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   role: selected.value, // DB me lowercase jaayega
//                                 })
//                               }
//                               getOptionLabel={(opt) => opt.label}
//                               getOptionValue={(opt) => opt.value}
//                             />
//                           </div>
//                           <div className="md:col-span-2">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Role Description
//                             </label>
//                             <textarea
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               rows={4}
//                               placeholder="Detailed job description..."
//                               value={newPosition.roleDescription}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   roleDescription: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Compensation Details */}
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h3 className="text-lg font-semibold mb-4 flex items-center">
//                           💰 Compensation Details
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               CTC Budget (₹)
//                             </label>
//                             <input
//                               type="number"
//                               placeholder="e.g., 2000000"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 no-spinner"
//                               value={newPosition.ctcBudgetNumeric}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   ctcBudgetNumeric: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                           {/* <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Budget for Role
//                             </label>
//                             <input
//                               type="text"
//                               placeholder="e.g., 15-20 LPA"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.budgetForRole}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   budgetForRole: e.target.value,
//                                 })
//                               }
//                             />
//                           </div> */}
//                           <div className="md:col-span-2">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               CTC Structure (Fixed + Variable + ESOPs)
//                             </label>
//                             <input
//                               type="text"
//                               placeholder="e.g., 80% Fixed + 15% Variable + 5% ESOPs"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.ctcStructure}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   ctcStructure: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Workplace Information */}
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h3 className="text-lg font-semibold mb-4 flex items-center">
//                           🏢 Workplace Information
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Workplace Type
//                             </label>
//                             <select
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.workplaceType}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   workplaceType: e.target.value,
//                                 })
//                               }
//                             >
//                               <option value="">Select Type</option>
//                             <option value="In office">In office</option>
//   <option value="Remote">Remote</option>
//   <option value="Hybrid">Hybrid</option>
//                             </select>
//                           </div>
//                          <div>
//   <label className="block text-sm font-medium text-gray-700 mb-1">
//     City
//   </label>

//   <Select
//     options={cityOptions}
//     isSearchable
//     placeholder="Select city..."

//     value={cityOptions.find(
//       (opt) => opt.value === newPosition.city
//     )}

//     onChange={(selected) =>
//       setNewPosition({
//         ...newPosition,
//         city: selected.value, // DB me lowercase jaayega
//       })
//     }

//     getOptionLabel={(opt) => opt.label}
//     getOptionValue={(opt) => opt.value}
//   />
// </div>
//                         </div>
//                       </div>

//                       {/* Candidate Preferences */}
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h3 className="text-lg font-semibold mb-4 flex items-center">
//                           👥 Candidate Preferences
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Preferred Industry (Optional)
//                             </label>
//                             <input
//                               type="text"
//                               placeholder="e.g., Technology, SaaS"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.preferredIndustry}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   preferredIndustry: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Preferred Companies (Optional)
//                             </label>
//                             <input
//                               type="text"
//                               placeholder="e.g., Google, Microsoft, Amazon"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.preferredCompanies}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   preferredCompanies: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Diversity Preference (Optional)
//                             </label>
//                             <select
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.diversityPreference}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   diversityPreference: e.target.value,
//                                 })
//                               }
//                             >
//                               <option value="">No Preference</option>
//                               <option value="Gender Diverse">
//                                 Gender Diverse
//                               </option>
//                               <option value="Ethnically Diverse">
//                                 Ethnically Diverse
//                               </option>
//                               <option value="Age Diverse">Age Diverse</option>
//                             </select>
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Target (Number of candidates to hire)
//                             </label>
//                             <input
//                               type="number"
//                               placeholder="e.g., 2"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 no-spinn"
//                               value={newPosition.target}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   target: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Interview Process */}
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h3 className="text-lg font-semibold mb-4 flex items-center">
//                           📝 Interview Process
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Number of Rounds
//                             </label>
//                             <input
//                               type="number"
//                               placeholder="e.g., 4"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 no-spinner"
//                               value={newPosition.rounds}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   rounds: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Interviewer Name
//                             </label>
//                             <input
//                               type="text"
//                               placeholder="e.g., Sarah Johnson"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.interviewerName}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   interviewerName: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Interviewer LinkedIn
//                             </label>
//                             <input
//                               type="text"
//                               placeholder="e.g., linkedin.com/in/sarahjohnson"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.interviewerLinkedIn}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   interviewerLinkedIn: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Mode of Interview (Optional)
//                             </label>
//                             <select
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.interviewMode}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   interviewMode: e.target.value,
//                                 })
//                               }
//                             >
//                               <option value="">Select Mode</option>
//                               <option value="Video Call">Video Call</option>
//                               <option value="In-person">In-person</option>
//                               <option value="Phone Call">Phone Call</option>
//                               <option value="In-person + Video">
//                                 In-person + Video
//                               </option>
//                             </select>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Timeline */}
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h3 className="text-lg font-semibold mb-4 flex items-center">
//                           📅 Timeline
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Deadline to Close
//                             </label>
//                             <input
//                               type="date"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.deadline}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   deadline: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* AI Input Fields */}
//                       <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
//                         <h3 className="text-lg font-semibold mb-4 flex items-center">
//                           🤖 AI Input Fields
//                         </h3>
//                         <div className="grid grid-cols-1 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Keywords
//                             </label>
//                             <input
//                               type="text"
//                               placeholder="e.g., React, Node.js, JavaScript, MongoDB"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.keywords}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   keywords: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               AI Prompt
//                             </label>
//                             <textarea
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               rows={3}
//                               placeholder="e.g., Find experienced full-stack developers with strong problem-solving skills"
//                               value={newPosition.prompt}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   prompt: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Preferred Industries (Multiple allowed)
//                             </label>
//                             <div className="grid grid-cols-3 gap-2">
//                               {[
//                                 "Technology",
//                                 "Fintech",
//                                 "E-commerce",
//                                 "Healthcare",
//                                 "Education",
//                                 "Manufacturing",
//                                 "Consulting",
//                                 "Media",
//                                 "Real Estate",
//                               ].map((industry) => (
//                                 <label
//                                   key={industry}
//                                   className="flex items-center"
//                                 >
//                                   <input
//                                     type="checkbox"
//                                     className="mr-2"
//                                     checked={newPosition.aiPreferredIndustries.includes(
//                                       industry
//                                     )}
//                                     onChange={() =>
//                                       handleMultiSelectChange(
//                                         "aiPreferredIndustries",
//                                         industry
//                                       )
//                                     }
//                                   />
//                                   <span className="text-sm">{industry}</span>
//                                 </label>
//                               ))}
//                             </div>
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Preferred Functions (Multiple allowed)
//                             </label>
//                             <div className="grid grid-cols-3 gap-2">
//                               {[
//                                 "Engineering",
//                                 "Product",
//                                 "Sales",
//                                 "Marketing",
//                                 "Operations",
//                                 "Finance",
//                                 "HR",
//                                 "Design",
//                                 "Strategy",
//                               ].map((func) => (
//                                 <label key={func} className="flex items-center">
//                                   <input
//                                     type="checkbox"
//                                     className="mr-2"
//                                     checked={newPosition.aiPreferredFunctions.includes(
//                                       func
//                                     )}
//                                     onChange={() =>
//                                       handleMultiSelectChange(
//                                         "aiPreferredFunctions",
//                                         func
//                                       )
//                                     }
//                                   />
//                                   <span className="text-sm">{func}</span>
//                                 </label>
//                               ))}
//                             </div>
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Preferred Role
//                             </label>
//                             <input
//                               type="text"
//                               placeholder="e.g., Senior Software Engineer"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               value={newPosition.aiPreferredRole}
//                               onChange={(e) =>
//                                 setNewPosition({
//                                   ...newPosition,
//                                   aiPreferredRole: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Form Actions */}
//                     <div className="flex gap-4 mt-8 pt-6 border-t">
//                       <button
//                         onClick={handleCreatePosition}
//                         className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                         disabled={
//                           !newPosition.positionName || !newPosition.clientName
//                         }
//                       >
//                         Create Position
//                       </button>
//                       <button
//                         onClick={() => setShowCreatePosition(false)}
//                         className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PositionManagement;






// import { useState, useEffect, useRef } from "react";
// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";
// import { Search, Plus, Users, Bot, ArrowLeft, Mail, MapPin } from "lucide-react";
// import { positionService } from "../services/positionService";
// import { clientService } from "../services/clientService";
// import Select from "react-select";
// import {
//   educationOptions,
//   statusOptions,
//   functionOptions,
//   roleOptions,
//   cityOptions,
//   candidateStatusOptions,
// } from "../constants/dropdown";
// import AsyncSelect from "react-select/async";

// /* ------------------------------------------------------------------ */
// /* Shared helpers                                                      */
// /* ------------------------------------------------------------------ */

// const displayValue = (value: any) => {
//   if (Array.isArray(value)) {
//     const cleaned = value.filter(Boolean);
//     return cleaned.length ? cleaned.join(", ") : "N/A";
//   }
//   if (value === null || value === undefined || value === "") return "N/A";
//   return String(value);
// };

// // Consistent card wrapper for every block on the detail page
// const Section = ({ title, action = null, children }) => (
//   <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//     <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
//       <h3 className="text-base font-semibold text-gray-900">{title}</h3>
//       {action}
//     </div>
//     <div className="p-5">{children}</div>
//   </div>
// );

// /* ------------------------------------------------------------------ */
// /* Tag Candidate Modal (moved to top level so it does not remount on    */
// /* every keystroke, which was stealing focus from the inputs)          */
// /* ------------------------------------------------------------------ */

// const TagCandidateModal = ({
//   onClose,
//   tagFormData,
//   setTagFormData,
//   selectedPositionId,
//   isSubmitting,
//   setIsSubmitting,
//   onTagged,
// }) => {
//   const searchTimeout = useRef<any>(null);

//   const debouncedLoadOptions = (inputValue: string, callback: any) => {
//     if (searchTimeout.current) clearTimeout(searchTimeout.current);

//     if (!inputValue || inputValue.trim().length < 2) {
//       callback([]);
//       return;
//     }

//     searchTimeout.current = setTimeout(async () => {
//       try {
//         const res = await positionService.fetchAutocomplete(inputValue.trim());
//         const candidates = res?.data || [];
//         callback(
//           candidates.map((candidate: any) => ({
//             value: candidate.id,
//             label: `${candidate.name} (${candidate.email})`,
//             email: candidate.email,
//             name: candidate.name,
//           }))
//         );
//       } catch (err) {
//         console.error("Autocomplete fetch error:", err);
//         callback([]);
//       }
//     }, 300);
//   };

//   const handleCandidateSelect = (selectedOption: any) => {
//     setTagFormData((prev: any) => ({
//       ...prev,
//       applicant: selectedOption ? selectedOption.label : "",
//       candidateId: selectedOption ? selectedOption.value : null,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!tagFormData.candidateId) {
//       alert("Select a candidate before submitting.");
//       return;
//     }
//     if (!tagFormData.recruiter) {
//       alert("Recruiter email is required.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const response = await positionService.tagCandidateToPosition(
//         String(selectedPositionId),
//         {
//           candidateId: tagFormData.candidateId,
//           recruiterEmail: tagFormData.recruiter,
//           immediateJoiner: tagFormData.immediateJoiner,
//           status: tagFormData.status,
//         }
//       );

//       if (response.status === 201) {
//         alert("Candidate tagged to the position.");
//         onTagged();
//       } else {
//         alert("Tagging failed: " + (response.message || "Unknown error"));
//       }
//     } catch (error) {
//       console.error("Error tagging candidate:", error);
//       alert("Could not tag the candidate. Try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
//           <h2 className="text-xl font-bold text-gray-800">Tag candidate</h2>
//           <button
//             type="button"
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Position name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               required
//               readOnly
//               value={tagFormData.positionName}
//               className="w-full h-10 px-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Applicant <span className="text-red-500">*</span>
//             </label>
//             <AsyncSelect
//               cacheOptions
//               defaultOptions={false}
//               loadOptions={debouncedLoadOptions}
//               isSearchable
//               isClearable
//               placeholder="Search by name or email..."
//               noOptionsMessage={({ inputValue }) =>
//                 !inputValue || inputValue.length < 2
//                   ? "Type at least 2 characters"
//                   : "No candidates found"
//               }
//               loadingMessage={() => "Searching..."}
//               onChange={handleCandidateSelect}
//               value={
//                 tagFormData.candidateId
//                   ? {
//                       value: tagFormData.candidateId,
//                       label: tagFormData.applicant,
//                     }
//                   : null
//               }
//               styles={{
//                 control: (base) => ({
//                   ...base,
//                   minHeight: "40px",
//                   borderColor: "#d1d5db",
//                   "&:hover": { borderColor: "#3b82f6" },
//                 }),
//                 menu: (base) => ({ ...base, zIndex: 9999 }),
//               }}
//               components={{
//                 DropdownIndicator: () => null,
//                 IndicatorSeparator: () => null,
//               }}
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               Type at least 2 characters to search.
//             </p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Recruiter <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               required
//               value={tagFormData.recruiter}
//               onChange={(e) =>
//                 setTagFormData((prev: any) => ({
//                   ...prev,
//                   recruiter: e.target.value,
//                 }))
//               }
//               className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Recruiter email"
//             />
//           </div>

//           <div className="flex items-start">
//             <input
//               type="checkbox"
//               id="immediateJoiner"
//               checked={tagFormData.immediateJoiner}
//               onChange={(e) =>
//                 setTagFormData((prev: any) => ({
//                   ...prev,
//                   immediateJoiner: e.target.checked,
//                 }))
//               }
//               className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//             />
//             <div>
//               <label
//                 htmlFor="immediateJoiner"
//                 className="text-sm font-medium text-gray-700"
//               >
//                 Immediate joiner
//               </label>
//               <p className="text-xs text-gray-500">
//                 Tick this if the candidate can join within 15 days.
//               </p>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Status <span className="text-red-500">*</span>
//             </label>
//             <Select
//               options={candidateStatusOptions}
//               isSearchable
//               placeholder="Select status..."
//               value={
//                 candidateStatusOptions.find(
//                   (opt: any) => opt.value === tagFormData.status
//                 ) || null
//               }
//               onChange={(selected: any) =>
//                 setTagFormData((prev: any) => ({
//                   ...prev,
//                   status: selected?.value,
//                 }))
//               }
//               styles={{
//                 control: (base) => ({ ...base, minHeight: "40px" }),
//                 menu: (base) => ({ ...base, zIndex: 9999 }),
//               }}
//             />
//           </div>

//           <div className="flex justify-end gap-3 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 h-10 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="px-4 h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
//             >
//               {isSubmitting ? "Tagging..." : "Tag candidate"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// /* ------------------------------------------------------------------ */
// /* Position detail                                                     */
// /* ------------------------------------------------------------------ */

// const PositionDetail = ({
//   position,
//   candidates = [],
//   recruiter,
//   onBack,
//   setCandidates,
//   runAIResumeMatcherForPosition,
//   fetchPositionDetail,
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedPosition, setEditedPosition] = useState<any>({ ...position });
//   const [directAppStatusFilter, setDirectAppStatusFilter] = useState("all");

//   useEffect(() => {
//     setEditedPosition({ ...position });
//   }, [position]);

//   const handleInputChange = (field: string, value: any) =>
//     setEditedPosition((prev: any) => ({ ...prev, [field]: value }));

//   const handleCancel = () => {
//     setEditedPosition({ ...position });
//     setIsEditing(false);
//   };

//   const handleSave = async () => {
//     try {
//       const positionId = position?.id || editedPosition?.id;
//       if (!positionId) {
//         alert("Position ID is missing. Refresh the page and try again.");
//         return;
//       }

//       const updateData = {
//         id: String(positionId),
//         title: editedPosition.positionName,
//         clientSpoc: editedPosition.clientSpoc || null,
//         location: editedPosition.location || editedPosition.city,
//         status: editedPosition.status,
//         ctcBudget: editedPosition.ctcBudget
//           ? Number(String(editedPosition.ctcBudget).replace(/[^0-9]/g, "")) *
//             100000
//           : null,
//         experience: editedPosition.experience
//           ? parseInt(String(editedPosition.experience).replace(/\D/g, "")) || 0
//           : 0,
//         education: editedPosition.education || "",
//         workplaceType: editedPosition.workplaceType || "",
//         reportees: parseInt(editedPosition.reportees) || 0,
//         deadline: editedPosition.deadline || null,
//         interviewRounds: parseInt(editedPosition.rounds) || 0,
//         interviewer: editedPosition.interviewerName || null,
//         jobType: editedPosition.jobType || "",
//         roleDescription: editedPosition.roleDescription || null,
//         preferredIndustry: Array.isArray(editedPosition.preferredIndustry)
//           ? editedPosition.preferredIndustry
//           : editedPosition.preferredIndustry
//           ? String(editedPosition.preferredIndustry)
//               .split(",")
//               .map((i) => i.trim())
//               .filter(Boolean)
//           : [],
//         preferredCompanies: Array.isArray(editedPosition.preferredCompanies)
//           ? editedPosition.preferredCompanies
//           : editedPosition.preferredCompanies
//           ? String(editedPosition.preferredCompanies)
//               .split(",")
//               .map((c) => c.trim())
//               .filter(Boolean)
//           : [],
//         roleType: editedPosition.roleType || "",
//         diversityPreference: editedPosition.diversityPreference || "",
//         interviewMode: editedPosition.interviewMode || null,
//         linkedin: editedPosition.linkedIn || null,
//         lakshSpoc: Array.isArray(editedPosition.lakshSpoc)
//           ? editedPosition.lakshSpoc.filter(Boolean)
//           : editedPosition.lakshSpoc
//           ? [editedPosition.lakshSpoc]
//           : [],
//         priority: editedPosition.priority || "",
//         ctcStructure: editedPosition.ctcStructure || null,
//         function: editedPosition.function || null,
//         role: editedPosition.role || null,
//         city: editedPosition.city || editedPosition.location || "",
//         target: editedPosition.target ? Number(editedPosition.target) : null,
//       };

//       const response = await positionService.updatePosition(
//         String(positionId),
//         updateData
//       );

//       if (response.status === 200) {
//         alert("Position updated.");
//         setIsEditing(false);
//         await fetchPositionDetail(positionId);
//       } else {
//         alert("Update failed: " + (response.message || "Unknown error"));
//       }
//     } catch (error: any) {
//       console.error("Error updating position:", error);
//       alert("Could not update the position: " + (error.message || "Try again."));
//     }
//   };

//   /* -------------------- field renderer -------------------- */
//   // Every field renders as label-above-value inside a fixed-height row,
//   // so columns line up whether the page is in read or edit mode.
//   const renderField = (
//     label: string,
//     field: string,
//     type = "text",
//     options: any = null,
//     fullWidth = false
//   ) => {
//     const isReactSelect = options && options.isReactSelect;
//     const selectOptions = options?.options || [];

//     const inputClass =
//       "w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

//     let control;
//     if (!isEditing) {
//       control = (
//         <p
//           className={`text-sm text-gray-900 ${
//             type === "textarea" ? "leading-relaxed" : "truncate"
//           }`}
//           title={displayValue(position[field])}
//         >
//           {displayValue(position[field])}
//         </p>
//       );
//     } else if (isReactSelect) {
//       control = (
//         <Select
//           options={selectOptions}
//           isSearchable
//           placeholder={`Select ${label.toLowerCase()}...`}
//           value={
//             selectOptions.find(
//               (opt: any) => opt.value === editedPosition[field]
//             ) || null
//           }
//           onChange={(selected: any) =>
//             handleInputChange(field, selected?.value || "")
//           }
//           styles={{
//             control: (base) => ({ ...base, minHeight: "40px" }),
//             menu: (base) => ({ ...base, zIndex: 9999 }),
//           }}
//           className="text-sm"
//         />
//       );
//     } else if (type === "textarea") {
//       control = (
//         <textarea
//           rows={4}
//           value={editedPosition[field] || ""}
//           onChange={(e) => handleInputChange(field, e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       );
//     } else if (type === "select") {
//       control = (
//         <select
//           value={editedPosition[field] || ""}
//           onChange={(e) => handleInputChange(field, e.target.value)}
//           className={inputClass}
//         >
//           <option value="">Select {label.toLowerCase()}</option>
//           {selectOptions.map((opt: string) => (
//             <option key={opt} value={opt}>
//               {opt}
//             </option>
//           ))}
//         </select>
//       );
//     } else {
//       control = (
//         <input
//           type={type}
//           value={editedPosition[field] || ""}
//           onChange={(e) => handleInputChange(field, e.target.value)}
//           className={inputClass}
//         />
//       );
//     }

//     return (
//       <div className={fullWidth ? "md:col-span-3" : ""} key={field}>
//         <label className="block text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">
//           {label}
//         </label>
//         <div className={isEditing || type === "textarea" ? "" : "min-h-[24px] flex items-center"}>
//           {control}
//         </div>
//       </div>
//     );
//   };

//   const grid = "grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5";

//   /* -------------------- candidates -------------------- */
//   const submittedCandidates = position.submittedCandidates || [];

//   const allDirectApplications = candidates.filter(
//     (c: any) => c.positionId === position.id && c.source === "direct"
//   );
//   const directApplications =
//     directAppStatusFilter === "all"
//       ? allDirectApplications
//       : allDirectApplications.filter(
//           (c: any) => c.status === directAppStatusFilter
//         );

//   const getStatusBadge = (status: string) => {
//     const statusStyles: Record<string, string> = {
//       internal_screening: "bg-yellow-100 text-yellow-800",
//       internal_reject: "bg-red-100 text-red-800",
//       submitted: "bg-blue-100 text-blue-800",
//       interview_scheduled: "bg-purple-100 text-purple-800",
//       selected: "bg-green-100 text-green-800",
//     };
//     const statusLabels: Record<string, string> = {
//       internal_screening: "Internal screening",
//       internal_reject: "Internal reject",
//       submitted: "Submitted",
//       interview_scheduled: "Interview scheduled",
//       selected: "Selected",
//     };
//     return (
//       <span
//         className={`px-2 py-1 rounded text-xs font-medium ${
//           statusStyles[status] || "bg-gray-100 text-gray-800"
//         }`}
//       >
//         {statusLabels[status] || status}
//       </span>
//     );
//   };

//   const priorityClass =
//     position.priority === "High"
//       ? "bg-red-100 text-red-800"
//       : position.priority === "Medium"
//       ? "bg-yellow-100 text-yellow-800"
//       : "bg-green-100 text-green-800";

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <div className="max-w-7xl mx-auto p-6 space-y-6">
//         {/* Sticky page header: title, meta and edit controls on one line */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-5 py-4">
//           <div className="flex flex-wrap items-center gap-3">
//             <button
//               onClick={onBack}
//               className="p-2 -ml-2 rounded-md hover:bg-gray-100"
//               aria-label="Back to positions"
//             >
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//             <div className="min-w-0 flex-1">
//               <h2 className="text-2xl font-bold text-gray-900 truncate">
//                 {position.positionName}
//               </h2>
//               <div className="flex flex-wrap items-center gap-2 mt-1">
//                 <span className="text-sm text-gray-600">
//                   {displayValue(position.clientName)}
//                 </span>
//                 <span className="text-gray-300">•</span>
//                 <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
//                   {displayValue(position.status)}
//                 </span>
//                 <span
//                   className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${priorityClass}`}
//                 >
//                   {displayValue(position.priority)}
//                 </span>
//                 <span className="text-gray-300">•</span>
//                 <span className="text-sm text-gray-600 flex items-center">
//                   <MapPin className="w-3.5 h-3.5 mr-1" />
//                   {displayValue(position.city)}
//                 </span>
//               </div>
//             </div>
//             <div className="flex gap-2">
//               {!isEditing ? (
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="h-10 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                   Edit details
//                 </button>
//               ) : (
//                 <>
//                   <button
//                     onClick={handleCancel}
//                     className="h-10 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSave}
//                     className="h-10 px-4 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
//                   >
//                     Save changes
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         <Section title="Basic details">
//           <div className={grid}>
//             {renderField("Position name", "positionName")}
//             {renderField("Client name", "clientName")}
//             {renderField("Status", "status", "select", {
//               options: [
//                 "Open",
//                 "On Hold",
//                 "Close by LHR",
//                 "Lost",
//                 "Candidate identified",
//               ],
//             })}
//             {renderField("Priority", "priority", "select", {
//               options: ["High", "Medium", "Low"],
//             })}
//             {renderField("Role type", "roleType", "select", {
//               options: ["New", "Replacement"],
//             })}
//             {renderField("Job type", "jobType", "select", {
//               options: ["Full-time", "Part-time", "Contract", "Internship"],
//             })}
//             {renderField("Recruiter", "recruiter")}
//             {renderField("Client SPOC", "clientSpoc")}
//             {renderField("Laksh SPOC", "lakshSpoc")}
//           </div>
//         </Section>

//         <Section title="Role requirements">
//           <div className={grid}>
//             {renderField("Function", "function", "text", {
//               isReactSelect: true,
//               options: functionOptions,
//             })}
//             {renderField("Role", "role", "text", {
//               isReactSelect: true,
//               options: roleOptions,
//             })}
//             {renderField("Education", "education", "text", {
//               isReactSelect: true,
//               options: educationOptions,
//             })}
//             {renderField("Experience", "experience")}
//             {renderField("Reportees", "reportees", "number")}
//             {renderField("Target hires", "target", "number")}
//             {renderField("Role description", "roleDescription", "textarea", null, true)}
//           </div>
//         </Section>

//         <Section title="Compensation and workplace">
//           <div className={grid}>
//             {renderField("CTC budget", "ctcBudget")}
//             {renderField("CTC structure", "ctcStructure")}
//             {renderField("Workplace type", "workplaceType", "select", {
//               options: ["In office", "Remote", "Hybrid"],
//             })}
//             {renderField("City", "city", "text", {
//               isReactSelect: true,
//               options: cityOptions,
//             })}
//             {renderField("Deadline to close", "deadline", "date")}
//           </div>
//         </Section>

//         <Section title="Candidate preferences">
//           <div className={grid}>
//             {renderField("Preferred industry", "preferredIndustry")}
//             {renderField("Preferred companies", "preferredCompanies")}
//             {renderField("Diversity preference", "diversityPreference", "select", {
//               options: [
//                 "No Preference",
//                 "Gender Diverse",
//                 "Ethnically Diverse",
//                 "Age Diverse",
//               ],
//             })}
//           </div>
//         </Section>

//         <Section title="Interview process">
//           <div className={grid}>
//             {renderField("Number of rounds", "rounds", "number")}
//             {renderField("Interviewer", "interviewerName")}
//             {renderField("Mode of interview", "interviewMode", "select", {
//               options: [
//                 "Video Call",
//                 "In-person",
//                 "Phone Call",
//                 "In-person + Video",
//               ],
//             })}
//             <div>
//               <label className="block text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">
//                 Interviewer LinkedIn
//               </label>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   value={editedPosition.linkedIn || ""}
//                   onChange={(e) => handleInputChange("linkedIn", e.target.value)}
//                   className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               ) : position.linkedIn ? (
//                 <div className="min-h-[24px] flex items-center">
//                   <a
//                     href={`https://${String(position.linkedIn).replace(
//                       /^https?:\/\//,
//                       ""
//                     )}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-sm text-blue-600 hover:underline"
//                   >
//                     View profile
//                   </a>
//                 </div>
//               ) : (
//                 <div className="min-h-[24px] flex items-center">
//                   <p className="text-sm text-gray-900">N/A</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </Section>

//         {/* Candidates */}
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//           <Section
//             title={`Submitted candidates (${submittedCandidates.length})`}
//             action={<Users className="w-5 h-5 text-gray-400" />}
//           >
//             <div className="space-y-3">
//               {submittedCandidates.map((candidate: any) => (
//                 <div
//                   key={candidate.id}
//                   className="border border-gray-200 rounded-lg p-4"
//                 >
//                   <h4 className="font-medium text-gray-900">{candidate.name}</h4>
//                   <p className="text-sm text-gray-600">{candidate.email}</p>
//                   <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 text-sm text-gray-600">
//                     <div>Current CTC: ₹{candidate.current_ctc} LPA</div>
//                     <div>Expected CTC: ₹{candidate.expected_ctc} LPA</div>
//                     <div>Notice period: {candidate.noticeperiod} days</div>
//                     <div className="truncate">
//                       Recruiter: {candidate.recruiter}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {submittedCandidates.length === 0 && (
//                 <p className="text-gray-500 text-center py-6 text-sm">
//                   No candidates submitted yet. Tag one from the positions list.
//                 </p>
//               )}
//             </div>
//           </Section>

//           <Section
//             title={`Direct applications (${directApplications.length})`}
//             action={<Mail className="w-5 h-5 text-gray-400" />}
//           >
//             <div className="flex flex-wrap items-center gap-3 mb-4">
//               <select
//                 className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={directAppStatusFilter}
//                 onChange={(e) => setDirectAppStatusFilter(e.target.value)}
//               >
//                 <option value="all">All statuses</option>
//                 <option value="internal_screening">Internal screening</option>
//                 <option value="internal_reject">Internal reject</option>
//                 <option value="interview_scheduled">Interview scheduled</option>
//                 <option value="selected">Selected</option>
//               </select>
//               <button
//                 onClick={() => runAIResumeMatcherForPosition(position.id)}
//                 className="h-10 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
//               >
//                 <Bot className="w-4 h-4" />
//                 Run AI resume matcher
//               </button>
//             </div>

//             <div className="space-y-3">
//               {directApplications.map((candidate: any) => (
//                 <div
//                   key={candidate.id}
//                   className="border border-gray-200 rounded-lg p-4"
//                 >
//                   <div className="flex flex-wrap items-center gap-2 mb-1">
//                     <h4 className="font-medium text-gray-900">
//                       {candidate.name}
//                     </h4>
//                     {getStatusBadge(candidate.status)}
//                     {candidate.aiScore ? (
//                       <span
//                         className={`px-2 py-1 rounded text-xs font-medium ${
//                           candidate.aiScore >= 85
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         AI score: {candidate.aiScore}
//                       </span>
//                     ) : null}
//                   </div>
//                   <p className="text-sm text-gray-600">{candidate.email}</p>
//                   <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 text-sm text-gray-600">
//                     <div>
//                       Current CTC: ₹
//                       {(candidate.currentCTC / 100000).toFixed(1)} LPA
//                     </div>
//                     <div>
//                       Expected CTC: ₹
//                       {(candidate.expectedCTC / 100000).toFixed(1)} LPA
//                     </div>
//                     <div>Notice period: {candidate.noticePeriod} days</div>
//                     <div className="truncate">Source: {candidate.recruiter}</div>
//                   </div>
//                   {candidate.status === "internal_screening" &&
//                     candidate.aiScore >= 85 && (
//                       <button
//                         onClick={() => {
//                           setCandidates((prev: any[]) =>
//                             prev.map((c) =>
//                               c.id === candidate.id
//                                 ? {
//                                     ...c,
//                                     status: "submitted",
//                                     source: "recruiter",
//                                     recruiter,
//                                   }
//                                 : c
//                             )
//                           );
//                           alert("Candidate tagged to the position.");
//                         }}
//                         className="mt-3 h-9 px-3 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
//                       >
//                         Tag to position
//                       </button>
//                     )}
//                 </div>
//               ))}
//               {directApplications.length === 0 && (
//                 <p className="text-gray-500 text-center py-6 text-sm">
//                   {directAppStatusFilter === "all"
//                     ? "No direct applications yet."
//                     : "No candidates in this status."}
//                 </p>
//               )}
//             </div>
//           </Section>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ------------------------------------------------------------------ */
// /* Positions table                                                     */
// /* ------------------------------------------------------------------ */

// const PositionTable = ({ positions, onOpen, onTag, onAIMatcher }) => (
//   <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//     <div className="overflow-x-auto">
//       <table className="min-w-full table-fixed divide-y divide-gray-200">
//         <colgroup>
//           <col className="w-[24%]" />
//           <col className="w-[20%]" />
//           <col className="w-[18%]" />
//           <col className="w-[14%]" />
//           <col className="w-[12%]" />
//           <col className="w-[12%]" />
//         </colgroup>
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Position
//             </th>
//             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Client and priority
//             </th>
//             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               CTC and location
//             </th>
//             <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Days since action
//             </th>
//             <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Progress
//             </th>
//             <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {positions.map((position: any) => {
//             const progress = position.targetedResumes
//               ? Math.min(
//                   (position.submittedResumes / position.targetedResumes) * 100,
//                   100
//                 )
//               : 0;

//             return (
//               <tr
//                 key={position.id}
//                 className="hover:bg-gray-50 cursor-pointer align-middle"
//                 onClick={() => onOpen(position)}
//               >
//                 <td className="px-4 py-3">
//                   <div className="text-sm font-medium text-gray-900 truncate">
//                     {position.positionName}
//                   </div>
//                   <div className="text-sm text-gray-500 truncate">
//                     {position.experience} • {position.workplaceType}
//                   </div>
//                 </td>

//                 <td className="px-4 py-3">
//                   <div className="text-sm text-gray-900 truncate">
//                     {position.clientName}
//                   </div>
//                   <span
//                     className={`inline-flex mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${
//                       position.priority === "High"
//                         ? "bg-red-100 text-red-800"
//                         : position.priority === "Medium"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-green-100 text-green-800"
//                     }`}
//                   >
//                     {position.priority}
//                   </span>
//                 </td>

//                 <td className="px-4 py-3">
//                   <div className="text-sm text-gray-900 truncate">
//                     {position.ctcBudget}
//                   </div>
//                   <div className="text-sm text-gray-500 flex items-center truncate">
//                     <MapPin className="w-3 h-3 mr-1 shrink-0" />
//                     {position.location}
//                   </div>
//                 </td>

//                 <td className="px-4 py-3 text-center">
//                   <span
//                     className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
//                       position.daysSinceNoAction === 0
//                         ? "bg-green-100 text-green-800"
//                         : position.daysSinceNoAction <= 3
//                         ? "bg-yellow-100 text-yellow-800"
//                         : position.daysSinceNoAction <= 7
//                         ? "bg-orange-100 text-orange-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {position.daysSinceNoAction === 0
//                       ? "Active"
//                       : `${position.daysSinceNoAction} days`}
//                   </span>
//                 </td>

//                 <td className="px-4 py-3">
//                   <div className="flex flex-col items-center gap-1">
//                     <span className="text-sm text-gray-900">
//                       {position.submittedResumes}/{position.targetedResumes}
//                     </span>
//                     <div className="w-20 bg-gray-200 rounded-full h-2">
//                       <div
//                         className="bg-blue-600 h-2 rounded-full"
//                         style={{ width: `${progress}%` }}
//                       />
//                     </div>
//                   </div>
//                 </td>

//                 <td className="px-4 py-3">
//                   <div className="flex justify-end gap-2">
//                     <button
//                       className="h-8 px-2 bg-green-100 text-green-800 text-xs rounded hover:bg-green-200 whitespace-nowrap"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         onTag(position);
//                       }}
//                     >
//                       Tag candidate
//                     </button>
//                     <button
//                       className="h-8 px-2 text-xs text-purple-600 rounded hover:bg-purple-50 whitespace-nowrap"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         onAIMatcher();
//                       }}
//                     >
//                       AI matcher
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}

//           {positions.length === 0 && (
//             <tr>
//               <td
//                 colSpan={6}
//                 className="px-4 py-10 text-center text-sm text-gray-500"
//               >
//                 No positions match this search. Clear the filters or create a
//                 position.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );

// /* ------------------------------------------------------------------ */
// /* Main                                                                */
// /* ------------------------------------------------------------------ */

// const PositionManagement = () => {
//   const [currentView, setCurrentView] = useState("positions");
//   const [selectedPosition, setSelectedPosition] = useState<any>(null);
//   const [tagPositionId, setTagPositionId] = useState<any>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterBy, setFilterBy] = useState("all");
//   const [groupBy, setGroupBy] = useState("none");
//   const [showTagForm, setShowTagForm] = useState(false);
//   const [showAddCandidate, setShowAddCandidate] = useState<any>(false);
//   const [showCandidateForm, setShowCandidateForm] = useState(false);
//   const [showCreatePosition, setShowCreatePosition] = useState(false);
//   const [candidateEmail, setCandidateEmail] = useState("");
//   const [loadingPositionDetail, setLoadingPositionDetail] = useState(false);
//   const [clientOptions, setClientOptions] = useState<any[]>([]);
//   const [isSubmittingTag, setIsSubmittingTag] = useState(false);
//   const [positions, setPositions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const recruiter = localStorage.getItem("email") || "";

//   const [tagFormData, setTagFormData] = useState<any>({
//     positionName: "",
//     applicant: "",
//     candidateId: null,
//     recruiter: "",
//     immediateJoiner: false,
//     status: "",
//   });

//   const [newPosition, setNewPosition] = useState<any>({
//     positionName: "",
//     clientName: "",
//     status: "Open",
//     roleType: "",
//     jobType: "",
//     priority: "",
//     recruiter: recruiter,
//     clientSPOC: "",
//     experienceYears: "",
//     education: "",
//     roleDescription: "",
//     function: "",
//     role: "",
//     ctcBudgetNumeric: "",
//     ctcStructure: "",
//     budgetForRole: "",
//     workplaceType: "",
//     city: "",
//     preferredIndustry: "",
//     preferredCompanies: "",
//     diversityPreference: "",
//     target: "",
//     rounds: "",
//     interviewerName: "",
//     interviewerLinkedIn: "",
//     interviewMode: "",
//     deadline: "",
//     keywords: "",
//     prompt: "",
//     aiPreferredIndustries: [],
//     aiPreferredFunctions: [],
//     aiPreferredRole: "",
//   });

//   const [candidates, setCandidates] = useState<any[]>([
//     {
//       id: 1,
//       email: "john.smith@email.com",
//       name: "John Smith",
//       currentCTC: 1500000,
//       expectedCTC: 2000000,
//       noticePeriod: 30,
//       status: "submitted",
//       positionId: 1,
//       recruiter: recruiter,
//       source: "recruiter",
//     },
//     {
//       id: 2,
//       email: "jane.doe@email.com",
//       name: "Jane Doe",
//       currentCTC: 1200000,
//       expectedCTC: 1800000,
//       noticePeriod: 60,
//       status: "internal_screening",
//       positionId: 1,
//       recruiter: "AI Matcher",
//       source: "direct",
//       aiScore: null,
//     },
//     {
//       id: 3,
//       email: "alex.kumar@email.com",
//       name: "Alex Kumar",
//       currentCTC: 1800000,
//       expectedCTC: 2500000,
//       noticePeriod: 45,
//       status: "internal_screening",
//       positionId: 1,
//       recruiter: "Direct Application",
//       source: "direct",
//       aiScore: null,
//     },
//     {
//       id: 4,
//       email: "priya.sharma@email.com",
//       name: "Priya Sharma",
//       currentCTC: 1600000,
//       expectedCTC: 2200000,
//       noticePeriod: 30,
//       status: "internal_screening",
//       positionId: 1,
//       recruiter: "Direct Application",
//       source: "direct",
//       aiScore: null,
//     },
//     {
//       id: 5,
//       email: "rajesh.patel@email.com",
//       name: "Rajesh Patel",
//       currentCTC: 1400000,
//       expectedCTC: 2000000,
//       noticePeriod: 60,
//       status: "internal_reject",
//       positionId: 1,
//       recruiter: "Direct Application",
//       source: "direct",
//       aiScore: 12,
//     },
//   ]);

//   const [newCandidate, setNewCandidate] = useState<any>({
//     email: "",
//     resume: null,
//     currentCTC: "",
//     specialComments: "",
//     education: "",
//     gender: "",
//     openToRelocation: false,
//     engagementType: "",
//     expectedCTC: "",
//     noticePeriod: "",
//     recruiter: recruiter,
//   });

//   /* -------------------- data -------------------- */

//   const transformPosition = (position: any) => {
//     const [submitted, targeted] = String(position.progress || "0/0")
//       .split("/")
//       .map(Number);

//     return {
//       id: position.id,
//       positionName: position.title,
//       clientName: position.client,
//       submittedResumes: submitted || 0,
//       targetedResumes: targeted || 0,
//       ctcBudget: position.ctc
//         ? `${(position.ctc / 100000).toFixed(0)} LPA`
//         : "N/A",
//       location: position.location || "N/A",
//       priority: position.priority || "Medium",
//       experience: position.experience ? `${position.experience} years` : "N/A",
//       workplaceType: position.mode || "N/A",
//       status: position.status || "Active",
//       ctcBudgetNumeric: position.ctc || 0,
//       city: position.location || "N/A",
//       experienceYears: position.experience || "N/A",
//       daysSinceNoAction: position.daysSinceNoAction || 0,
//       education: position.education || "N/A",
//       roleDescription: position.roleDescription || "",
//       preferredIndustry: position.preferredIndustry || "",
//       preferredCompanies: position.preferredCompanies || "",
//       reportees: position.reportees || 0,
//       deadline: position.deadline || "",
//       rounds: position.rounds || 0,
//       interviewerName: position.interviewerName || "",
//       interviewerLinkedIn: position.interviewerLinkedIn || "",
//       ctcStructure: position.ctcStructure || "",
//       roleType: position.roleType || "",
//       diversityPreference: position.diversityPreference || "",
//       interviewMode: position.interviewMode || "",
//       jobType: position.jobType || "",
//       clientSPOC: position.clientSPOC || "",
//       lakshSPOC: position.lakshSPOC || "",
//       recruiter: position.recruiter || "",
//       function: position.function || "",
//       role: position.role || "",
//       target: targeted || 0,
//       createdDate: position.createdDate || new Date().toISOString(),
//       lastActivityDate: position.lastActivityDate || new Date().toISOString(),
//     };
//   };

//   const loadPositions = async () => {
//     try {
//       const res = await positionService.fetchAll(1, 2000);
//       if (res.status === 200) {
//         setPositions(res.data.positions.map(transformPosition));
//       } else {
//         console.error("Failed to fetch positions:", res.message);
//       }
//     } catch (err) {
//       console.error("Error fetching positions:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPositionDetail = async (positionId: any) => {
//     setLoadingPositionDetail(true);
//     try {
//       const res = await positionService.fetchById(positionId);
//       if (res.status === 200) {
//         const position = res.data;
//         setSelectedPosition({
//           id: String(position.id),
//           positionName: position.title || "N/A",
//           clientName: position.clientName || "N/A",
//           submittedResumes: position.submittedCandidates?.length || 0,
//           targetedResumes: position.targetedResumes || 0,
//           ctcBudget: position.ctcBudget
//             ? `${(Number(position.ctcBudget) / 100000).toFixed(0)} LPA`
//             : "N/A",
//           ctcStructure: position.ctcStructure || "",
//           city: position.location || "",
//           location: position.location || "",
//           experience: position.experience ? `${position.experience} years` : "",
//           priority: position.priority || "",
//           function: position.function || "",
//           role: position.role || "",
//           workplaceType: position.workplaceType || "",
//           status: position.status || "Open",
//           education: position.education || "",
//           roleDescription: position.roleDescription || "",
//           preferredIndustry: position.preferredIndustry || [],
//           preferredCompanies: position.preferredCompanies || [],
//           reportees: position.reportees || 0,
//           target: position.target || 0,
//           deadline: position.deadline || "",
//           rounds: position.interviewRounds || 0,
//           interviewerName: position.interviewer || "",
//           diversityPreference: position.diversityPreference || "",
//           interviewMode: position.interviewMode || "",
//           jobType: position.jobType || "",
//           roleType: position.roleType || "",
//           clientSpoc: position.clientSpoc || "",
//           lakshSpoc: position.lakshSpoc?.filter(Boolean) || [],
//           recruiter: position.recruiter || "",
//           linkedIn: position.linkedin || null,
//           submittedCandidates: position.submittedCandidates || [],
//           message: position.message || "",
//         });
//       }
//     } catch (err) {
//       console.error("Error fetching position detail:", err);
//     } finally {
//       setLoadingPositionDetail(false);
//     }
//   };

//   useEffect(() => {
//     const fetchClients = async () => {
//       const res = await clientService.fetchAll();
//       const clients = res?.data || [];
//       setClientOptions(
//         clients.map((c: any) => ({
//           id: c.id,
//           label: c.client_name,
//           value: c.id,
//           clientHRSpocs: c.clientHRSpocs || [],
//         }))
//       );
//     };
//     fetchClients();
//   }, []);

//   useEffect(() => {
//     loadPositions();
//   }, []);

//   /* -------------------- derived -------------------- */

//   const filteredPositions = positions.filter((position) => {
//     const term = searchTerm.toLowerCase();
//     const matchesSearch =
//       (position.positionName || "").toLowerCase().includes(term) ||
//       (position.clientName || "").toLowerCase().includes(term) ||
//       (position.location || "").toLowerCase().includes(term) ||
//       (position.priority || "").toLowerCase().includes(term) ||
//       (position.experience || "").toLowerCase().includes(term);

//     if (filterBy === "all") return matchesSearch;
//     return matchesSearch && position.priority === filterBy;
//   });

//   const groupedPositions =
//     groupBy === "clientName"
//       ? filteredPositions.reduce((acc: any, position: any) => {
//           const client = position.clientName || "Unassigned";
//           if (!acc[client]) acc[client] = [];
//           acc[client].push(position);
//           return acc;
//         }, {})
//       : { "All Positions": filteredPositions };

//   /* -------------------- handlers -------------------- */

//   const handleEmailCheck = () => {
//     const existingCandidate = candidates.find((c) => c.email === candidateEmail);
//     if (existingCandidate) {
//       setCandidates((prev) =>
//         prev.map((c) =>
//           c.email === candidateEmail ? { ...c, positionId: showAddCandidate } : c
//         )
//       );
//       setShowAddCandidate(false);
//       setCandidateEmail("");
//       alert("Candidate tagged to the position.");
//     } else {
//       setShowCandidateForm(true);
//       setNewCandidate({ ...newCandidate, email: candidateEmail });
//     }
//   };

//   const handleCreateCandidate = () => {
//     const candidate = {
//       id: candidates.length + 1,
//       ...newCandidate,
//       status: "submitted",
//       positionId: showAddCandidate,
//       source: "recruiter",
//       name: newCandidate.email.split("@")[0].replace(".", " "),
//     };
//     setCandidates([...candidates, candidate]);
//     setShowCandidateForm(false);
//     setShowAddCandidate(false);
//     setNewCandidate({
//       email: "",
//       resume: null,
//       currentCTC: "",
//       specialComments: "",
//       education: "",
//       gender: "",
//       openToRelocation: false,
//       engagementType: "",
//       expectedCTC: "",
//       noticePeriod: "",
//       recruiter: recruiter,
//     });
//     alert("Candidate created and tagged.");
//   };

//   const handleCreatePosition = async () => {
//     try {
//       if (!newPosition.positionName) {
//         alert("Position name is required.");
//         return;
//       }

//       const payload = {
//         positionName: newPosition.positionName,
//         clientName: newPosition.clientName,
//         priority: newPosition.priority || "",
//         status: newPosition.status,
//         roleType: newPosition.roleType || "",
//         jobType: newPosition.jobType || "",
//         function: newPosition.function || null,
//         role: newPosition.role || null,
//         roleDescription: newPosition.roleDescription || null,
//         experience: newPosition.experienceYears
//           ? parseInt(newPosition.experienceYears.replace(/\D/g, "")) || 0
//           : 0,
//         education: newPosition.education || "",
//         ctcStructure: newPosition.ctcStructure || null,
//         ctcBudget: newPosition.ctcBudgetNumeric
//           ? Number(newPosition.ctcBudgetNumeric)
//           : null,
//         workplaceType: newPosition.workplaceType || "",
//         city: newPosition.city || "",
//         preferredIndustries: newPosition.preferredIndustry
//           ? newPosition.preferredIndustry
//               .split(",")
//               .map((i: string) => i.trim())
//               .filter(Boolean)
//           : [],
//         preferredCompanies: newPosition.preferredCompanies || null,
//         diversityPreference: newPosition.diversityPreference || "",
//         target: newPosition.target ? Number(newPosition.target) : 1,
//         recruiter: recruiter,
//         numberOfRounds: newPosition.rounds ? Number(newPosition.rounds) : 1,
//         interviewerName: newPosition.interviewerName || null,
//         interviewerLinkedin: newPosition.interviewerLinkedIn || null,
//         modeOfInterview: newPosition.interviewMode || null,
//         deadline: newPosition.deadline || null,
//         keywords: newPosition.keywords || null,
//         aiPrompt: newPosition.prompt || null,
//         aiPreferredIndustries: newPosition.aiPreferredIndustries || [],
//         aiPreferredFunctions: newPosition.aiPreferredFunctions || [],
//         aiPreferredRole: newPosition.aiPreferredRole || null,
//         clientSpoc: newPosition.clientSPOC || null,
//       };

//       const response = await positionService.createPosition(payload);

//       if (response.status === 201 || response.status === 200) {
//         alert("Position created.");
//         setShowCreatePosition(false);
//         setNewPosition({
//           positionName: "",
//           clientName: "",
//           status: "Open",
//           roleType: "",
//           jobType: "",
//           priority: "",
//           recruiter: recruiter,
//           clientSPOC: "",
//           experienceYears: "",
//           education: "",
//           roleDescription: "",
//           function: "",
//           role: "",
//           ctcBudgetNumeric: "",
//           ctcStructure: "",
//           budgetForRole: "",
//           workplaceType: "",
//           city: "",
//           preferredIndustry: "",
//           preferredCompanies: "",
//           diversityPreference: "",
//           target: "",
//           rounds: "",
//           interviewerName: "",
//           interviewerLinkedIn: "",
//           interviewMode: "",
//           deadline: "",
//           keywords: "",
//           prompt: "",
//           aiPreferredIndustries: [],
//           aiPreferredFunctions: [],
//           aiPreferredRole: "",
//         });
//         await loadPositions();
//       } else {
//         alert(
//           "Could not create the position: " +
//             (response.message || "Unknown error")
//         );
//       }
//     } catch (error) {
//       console.error("Error creating position:", error);
//       alert("Could not create the position. Try again.");
//     }
//   };

//   const handleMultiSelectChange = (field: string, value: string) => {
//     const currentValues = newPosition[field];
//     const updatedValues = currentValues.includes(value)
//       ? currentValues.filter((item: string) => item !== value)
//       : [...currentValues, value];
//     setNewPosition({ ...newPosition, [field]: updatedValues });
//   };

//   const runAIResumeMatcherForPosition = (positionId: any) => {
//     const eligibleCandidates = candidates.filter(
//       (c) =>
//         c.positionId === positionId &&
//         c.source === "direct" &&
//         c.status === "internal_screening"
//     );

//     if (eligibleCandidates.length === 0) {
//       alert("No candidates in internal screening for this position.");
//       return;
//     }

//     alert(`Scoring ${eligibleCandidates.length} candidates...`);

//     setTimeout(() => {
//       const scored = candidates.map((c) => {
//         if (!eligibleCandidates.find((e) => e.id === c.id)) return c;
//         const score = Math.floor(Math.random() * 100) + 1;
//         return {
//           ...c,
//           aiScore: score,
//           status: score >= 85 ? "internal_screening" : "internal_reject",
//         };
//       });
//       setCandidates(scored);

//       const qualified = scored.filter(
//         (c) =>
//           eligibleCandidates.find((e) => e.id === c.id) && (c.aiScore || 0) >= 85
//       ).length;

//       alert(
//         `Scoring complete. ${qualified} candidates qualified for recruiter review; the rest moved to internal reject.`
//       );
//     }, 3000);
//   };

//   const openTagForm = (position: any) => {
//     setTagPositionId(position.id);
//     setTagFormData({
//       positionName: position.positionName,
//       applicant: "",
//       candidateId: null,
//       recruiter: recruiter,
//       immediateJoiner: false,
//       status: "",
//     });
//     setShowTagForm(true);
//   };

//   const closeTagForm = () => {
//     setShowTagForm(false);
//     setTagPositionId(null);
//     setTagFormData({
//       positionName: "",
//       applicant: "",
//       candidateId: null,
//       recruiter: "",
//       immediateJoiner: false,
//       status: "",
//     });
//   };

//   /* -------------------- detail view -------------------- */

//   if (currentView === "position-detail" && selectedPosition) {
//     return (
//       <PositionDetail
//         position={selectedPosition}
//         candidates={candidates}
//         recruiter={recruiter}
//         onBack={() => {
//           setSelectedPosition(null);
//           setCurrentView("positions");
//         }}
//         setCandidates={setCandidates}
//         runAIResumeMatcherForPosition={runAIResumeMatcherForPosition}
//         fetchPositionDetail={fetchPositionDetail}
//       />
//     );
//   }

//   /* -------------------- list view -------------------- */

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       {showTagForm && (
//         <TagCandidateModal
//           onClose={closeTagForm}
//           tagFormData={tagFormData}
//           setTagFormData={setTagFormData}
//           selectedPositionId={tagPositionId}
//           isSubmitting={isSubmittingTag}
//           setIsSubmitting={setIsSubmittingTag}
//           onTagged={() => {
//             closeTagForm();
//             loadPositions();
//           }}
//         />
//       )}

//       <div className="max-w-7xl mx-auto p-6 space-y-6">
//         {/* Toolbar: search, filters and create action on one line */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//           <div className="flex flex-col lg:flex-row lg:items-center gap-3">
//             <div className="relative flex-1 min-w-0">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//               <input
//                 type="text"
//                 placeholder="Search by position, client, location, priority or experience"
//                 className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             <select
//               className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 lg:w-44 shrink-0"
//               value={filterBy}
//               onChange={(e) => setFilterBy(e.target.value)}
//             >
//               <option value="all">All priorities</option>
//               <option value="High">High priority</option>
//               <option value="Medium">Medium priority</option>
//               <option value="Low">Low priority</option>
//             </select>

//             <select
//               className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 lg:w-44 shrink-0"
//               value={groupBy}
//               onChange={(e) => setGroupBy(e.target.value)}
//             >
//               <option value="none">No grouping</option>
//               <option value="clientName">Group by client</option>
//             </select>

//             <button
//               className="h-10 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shrink-0"
//               onClick={() => setShowCreatePosition(true)}
//             >
//               <Plus className="w-4 h-4" />
//               Create position
//             </button>
//           </div>
//         </div>

//         {/* Positions */}
//         {loading ? (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center text-sm text-gray-500">
//             Loading positions...
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {Object.entries(groupedPositions).map(
//               ([groupName, groupPositions]: any) => (
//                 <div key={groupName} className="space-y-3">
//                   {groupBy !== "none" && (
//                     <h2 className="text-lg font-semibold text-gray-900">
//                       {groupName}
//                     </h2>
//                   )}
//                   <PositionTable
//                     positions={groupPositions}
//                     onOpen={(position: any) => {
//                       fetchPositionDetail(position.id);
//                       setCurrentView("position-detail");
//                     }}
//                     onTag={openTagForm}
//                     onAIMatcher={() => navigate("/ai-matcher")}
//                   />
//                 </div>
//               )
//             )}
//           </div>
//         )}
//       </div>

//       {/* Add Candidate Modal */}
//       {showAddCandidate && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-semibold mb-4">Add candidate</h2>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email ID
//             </label>
//             <input
//               type="email"
//               className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={candidateEmail}
//               onChange={(e) => setCandidateEmail(e.target.value)}
//               placeholder="candidate@email.com"
//             />
//             <div className="flex gap-3 mt-5">
//               <button
//                 onClick={handleEmailCheck}
//                 className="flex-1 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//                 disabled={!candidateEmail}
//               >
//                 Check email
//               </button>
//               <button
//                 onClick={() => setShowAddCandidate(false)}
//                 className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Create Candidate Modal */}
//       {showCandidateForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
//           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-xl font-semibold">Create candidate</h2>
//             </div>
//             <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.email}
//                   onChange={(e) =>
//                     setNewCandidate({ ...newCandidate, email: e.target.value })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Current CTC (₹)
//                 </label>
//                 <input
//                   type="number"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.currentCTC}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       currentCTC: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Expected CTC (₹)
//                 </label>
//                 <input
//                   type="number"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.expectedCTC}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       expectedCTC: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Notice period (days)
//                 </label>
//                 <input
//                   type="number"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.noticePeriod}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       noticePeriod: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Education
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.education}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       education: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Gender
//                 </label>
//                 <select
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.gender}
//                   onChange={(e) =>
//                     setNewCandidate({ ...newCandidate, gender: e.target.value })
//                   }
//                 >
//                   <option value="">Select gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Engagement type
//                 </label>
//                 <select
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.engagementType}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       engagementType: e.target.value,
//                     })
//                   }
//                 >
//                   <option value="">Select type</option>
//                   <option value="Full-time">Full-time</option>
//                   <option value="Part-time">Part-time</option>
//                   <option value="Contract">Contract</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Recruiter
//                 </label>
//                 <input
//                   type="text"
//                   readOnly
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm bg-gray-100"
//                   value={newCandidate.recruiter}
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="flex items-center text-sm text-gray-700">
//                   <input
//                     type="checkbox"
//                     className="mr-2 h-4 w-4"
//                     checked={newCandidate.openToRelocation}
//                     onChange={(e) =>
//                       setNewCandidate({
//                         ...newCandidate,
//                         openToRelocation: e.target.checked,
//                       })
//                     }
//                   />
//                   Open to relocation
//                 </label>
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Special comments
//                 </label>
//                 <textarea
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.specialComments}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       specialComments: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </div>
//             <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
//               <button
//                 onClick={handleCreateCandidate}
//                 className="flex-1 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Create candidate
//               </button>
//               <button
//                 onClick={() => setShowCandidateForm(false)}
//                 className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Create Position Modal */}
//       {showCreatePosition && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
//           <div className="bg-white rounded-lg w-full max-w-4xl max-h-[92vh] overflow-y-auto">
//             <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
//               <h2 className="text-2xl font-semibold">Create position</h2>
//               <button
//                 onClick={() => setShowCreatePosition(false)}
//                 className="text-gray-500 hover:text-gray-700 text-xl leading-none"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="p-6 space-y-6">
//               {/* Basic Job Details */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="text-base font-semibold mb-4">
//                   📌 Basic job details
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Position name *
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.positionName}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           positionName: e.target.value,
//                         })
//                       }
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Client name *
//                     </label>
//                     <Select
//                       options={clientOptions}
//                       value={
//                         clientOptions.find(
//                           (opt) => opt.value === newPosition.clientName
//                         ) || null
//                       }
//                       onChange={(selected: any) =>
//                         setNewPosition({
//                           ...newPosition,
//                           clientName: selected.value,
//                           clientSPOC:
//                             selected?.clientHRSpocs?.[0]?.client_SPOC || "",
//                         })
//                       }
//                       isSearchable
//                       placeholder="Search client..."
//                       styles={{
//                         control: (base) => ({ ...base, minHeight: "40px" }),
//                         menu: (base) => ({ ...base, zIndex: 9999 }),
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Status
//                     </label>
//                     <select
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.status}
//                       onChange={(e) =>
//                         setNewPosition({ ...newPosition, status: e.target.value })
//                       }
//                     >
//                       <option value="Open">Open</option>
//                       <option value="On Hold">On hold</option>
//                       <option value="Close by LHR">Close by LHR</option>
//                       <option value="Lost">Lost</option>
//                       <option value="Candidate identified">
//                         Candidate identified
//                       </option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       New / replacement role
//                     </label>
//                     <select
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.roleType}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           roleType: e.target.value,
//                         })
//                       }
//                     >
//                       <option value="">Select</option>
//                       <option value="New">New</option>
//                       <option value="Replacement">Replacement</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Job type
//                     </label>
//                     <select
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.jobType}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           jobType: e.target.value,
//                         })
//                       }
//                     >
//                       <option value="">Select</option>
//                       <option value="Full-time">Full-time</option>
//                       <option value="Part-time">Part-time</option>
//                       <option value="Contract">Contract</option>
//                       <option value="Internship">Internship</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Priority
//                     </label>
//                     <select
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.priority}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           priority: e.target.value,
//                         })
//                       }
//                     >
//                       <option value="">Select priority</option>
//                       <option value="High">High</option>
//                       <option value="Medium">Medium</option>
//                       <option value="Low">Low</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Recruiter
//                     </label>
//                     <input
//                       type="text"
//                       readOnly
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm bg-gray-100"
//                       value={newPosition.recruiter}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Client SPOC
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.clientSPOC}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           clientSPOC: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Role Requirements */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="text-base font-semibold mb-4">
//                   💼 Role requirements
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Experience needed (years)
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.experienceYears}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           experienceYears: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Education
//                     </label>
//                     <Select
//                       options={educationOptions}
//                       isSearchable
//                       placeholder="Select education..."
//                       value={
//                         educationOptions.find(
//                           (opt: any) => opt.value === newPosition.education
//                         ) || null
//                       }
//                       onChange={(selected: any) =>
//                         setNewPosition({
//                           ...newPosition,
//                           education: selected.value,
//                         })
//                       }
//                       styles={{
//                         control: (base) => ({ ...base, minHeight: "40px" }),
//                         menu: (base) => ({ ...base, zIndex: 9999 }),
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Function
//                     </label>
//                     <Select
//                       options={functionOptions}
//                       isSearchable
//                       placeholder="Select function..."
//                       value={
//                         functionOptions.find(
//                           (opt: any) => opt.value === newPosition.function
//                         ) || null
//                       }
//                       onChange={(selected: any) =>
//                         setNewPosition({
//                           ...newPosition,
//                           function: selected.value,
//                         })
//                       }
//                       styles={{
//                         control: (base) => ({ ...base, minHeight: "40px" }),
//                         menu: (base) => ({ ...base, zIndex: 9999 }),
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Role
//                     </label>
//                     <Select
//                       options={roleOptions}
//                       isSearchable
//                       placeholder="Select role..."
//                       value={
//                         roleOptions.find(
//                           (opt: any) => opt.value === newPosition.role
//                         ) || null
//                       }
//                       onChange={(selected: any) =>
//                         setNewPosition({ ...newPosition, role: selected.value })
//                       }
//                       styles={{
//                         control: (base) => ({ ...base, minHeight: "40px" }),
//                         menu: (base) => ({ ...base, zIndex: 9999 }),
//                       }}
//                     />
//                   </div>
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Role description
//                     </label>
//                     <textarea
//                       rows={4}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="Detailed job description..."
//                       value={newPosition.roleDescription}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           roleDescription: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Compensation */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="text-base font-semibold mb-4">
//                   💰 Compensation details
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       CTC budget (₹)
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="e.g. 2000000"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 no-spinner"
//                       value={newPosition.ctcBudgetNumeric}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           ctcBudgetNumeric: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       CTC structure
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g. 80% fixed + 15% variable + 5% ESOPs"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.ctcStructure}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           ctcStructure: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Workplace */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="text-base font-semibold mb-4">
//                   🏢 Workplace information
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Workplace type
//                     </label>
//                     <select
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.workplaceType}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           workplaceType: e.target.value,
//                         })
//                       }
//                     >
//                       <option value="">Select type</option>
//                       <option value="In office">In office</option>
//                       <option value="Remote">Remote</option>
//                       <option value="Hybrid">Hybrid</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       City
//                     </label>
//                     <Select
//                       options={cityOptions}
//                       isSearchable
//                       placeholder="Select city..."
//                       value={
//                         cityOptions.find(
//                           (opt: any) => opt.value === newPosition.city
//                         ) || null
//                       }
//                       onChange={(selected: any) =>
//                         setNewPosition({ ...newPosition, city: selected.value })
//                       }
//                       styles={{
//                         control: (base) => ({ ...base, minHeight: "40px" }),
//                         menu: (base) => ({ ...base, zIndex: 9999 }),
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Candidate Preferences */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="text-base font-semibold mb-4">
//                   👥 Candidate preferences
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Preferred industry (optional)
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g. Technology, SaaS"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.preferredIndustry}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           preferredIndustry: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Preferred companies (optional)
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g. Google, Microsoft, Amazon"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.preferredCompanies}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           preferredCompanies: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Diversity preference (optional)
//                     </label>
//                     <select
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.diversityPreference}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           diversityPreference: e.target.value,
//                         })
//                       }
//                     >
//                       <option value="">No preference</option>
//                       <option value="Gender Diverse">Gender diverse</option>
//                       <option value="Ethnically Diverse">
//                         Ethnically diverse
//                       </option>
//                       <option value="Age Diverse">Age diverse</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Target (number of hires)
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="e.g. 2"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 no-spinner"
//                       value={newPosition.target}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           target: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Interview Process */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="text-base font-semibold mb-4">
//                   📝 Interview process
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Number of rounds
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="e.g. 4"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 no-spinner"
//                       value={newPosition.rounds}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           rounds: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Interviewer name
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.interviewerName}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           interviewerName: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Interviewer LinkedIn
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="linkedin.com/in/name"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.interviewerLinkedIn}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           interviewerLinkedIn: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Mode of interview (optional)
//                     </label>
//                     <select
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.interviewMode}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           interviewMode: e.target.value,
//                         })
//                       }
//                     >
//                       <option value="">Select mode</option>
//                       <option value="Video Call">Video call</option>
//                       <option value="In-person">In-person</option>
//                       <option value="Phone Call">Phone call</option>
//                       <option value="In-person + Video">
//                         In-person + video
//                       </option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Deadline to close
//                     </label>
//                     <input
//                       type="date"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.deadline}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           deadline: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* AI Inputs */}
//               <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
//                 <h3 className="text-base font-semibold mb-4">🤖 AI inputs</h3>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Keywords
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g. React, Node.js, MongoDB"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.keywords}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           keywords: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       AI prompt
//                     </label>
//                     <textarea
//                       rows={3}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="e.g. Find full-stack developers with strong problem-solving skills"
//                       value={newPosition.prompt}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           prompt: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Preferred industries
//                     </label>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                       {[
//                         "Technology",
//                         "Fintech",
//                         "E-commerce",
//                         "Healthcare",
//                         "Education",
//                         "Manufacturing",
//                         "Consulting",
//                         "Media",
//                         "Real Estate",
//                       ].map((industry) => (
//                         <label
//                           key={industry}
//                           className="flex items-center text-sm text-gray-700"
//                         >
//                           <input
//                             type="checkbox"
//                             className="mr-2 h-4 w-4"
//                             checked={newPosition.aiPreferredIndustries.includes(
//                               industry
//                             )}
//                             onChange={() =>
//                               handleMultiSelectChange(
//                                 "aiPreferredIndustries",
//                                 industry
//                               )
//                             }
//                           />
//                           {industry}
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Preferred functions
//                     </label>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                       {[
//                         "Engineering",
//                         "Product",
//                         "Sales",
//                         "Marketing",
//                         "Operations",
//                         "Finance",
//                         "HR",
//                         "Design",
//                         "Strategy",
//                       ].map((func) => (
//                         <label
//                           key={func}
//                           className="flex items-center text-sm text-gray-700"
//                         >
//                           <input
//                             type="checkbox"
//                             className="mr-2 h-4 w-4"
//                             checked={newPosition.aiPreferredFunctions.includes(
//                               func
//                             )}
//                             onChange={() =>
//                               handleMultiSelectChange(
//                                 "aiPreferredFunctions",
//                                 func
//                               )
//                             }
//                           />
//                           {func}
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Preferred role
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g. Senior Software Engineer"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.aiPreferredRole}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           aiPreferredRole: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-4 px-6 py-4 border-t border-gray-200 sticky bottom-0 bg-white">
//               <button
//                 onClick={handleCreatePosition}
//                 className="flex-1 h-11 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-300"
//                 disabled={!newPosition.positionName || !newPosition.clientName}
//               >
//                 Create position
//               </button>
//               <button
//                 onClick={() => setShowCreatePosition(false)}
//                 className="flex-1 h-11 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PositionManagement;






// // refer to this code if anything breaks 
// import { useState, useEffect, useRef } from "react";
// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";
// import { Search, Plus, Users, Bot, ArrowLeft, Mail, MapPin } from "lucide-react";
// import { positionService } from "../services/positionService";
// import { clientService } from "../services/clientService";
// import Select from "react-select";
// import {
//   educationOptions,
//   statusOptions,
//   functionOptions,
//   roleOptions,
//   cityOptions,
//   candidateStatusOptions,
// } from "../constants/dropdown";
// import AsyncSelect from "react-select/async";

// /* ------------------------------------------------------------------ */
// /* Shared helpers                                                      */
// /* ------------------------------------------------------------------ */

// const displayValue = (value: any) => {
//   if (Array.isArray(value)) {
//     const cleaned = value.filter(Boolean);
//     return cleaned.length ? cleaned.join(", ") : "N/A";
//   }
//   if (value === null || value === undefined || value === "") return "N/A";
//   return String(value);
// };

// // Consistent card wrapper for every block on the detail page
// const Section = ({ title, action = null, children }) => (
//   <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//     <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-gray-50/60 rounded-t-lg">
//       <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
//         {title}
//       </h3>
//       {action}
//     </div>
//     <div className="px-4 py-4">{children}</div>
//   </div>
// );

// /* ------------------------------------------------------------------ */
// /* Tag Candidate Modal (moved to top level so it does not remount on    */
// /* every keystroke, which was stealing focus from the inputs)          */
// /* ------------------------------------------------------------------ */

// const TagCandidateModal = ({
//   onClose,
//   tagFormData,
//   setTagFormData,
//   selectedPositionId,
//   isSubmitting,
//   setIsSubmitting,
//   onTagged,
// }) => {
//   const searchTimeout = useRef<any>(null);

//   const debouncedLoadOptions = (inputValue: string, callback: any) => {
//     if (searchTimeout.current) clearTimeout(searchTimeout.current);

//     if (!inputValue || inputValue.trim().length < 2) {
//       callback([]);
//       return;
//     }

//     searchTimeout.current = setTimeout(async () => {
//       try {
//         const res = await positionService.fetchAutocomplete(inputValue.trim());
//         const candidates = res?.data || [];
//         callback(
//           candidates.map((candidate: any) => ({
//             value: candidate.id,
//             label: `${candidate.name} (${candidate.email})`,
//             email: candidate.email,
//             name: candidate.name,
//           }))
//         );
//       } catch (err) {
//         console.error("Autocomplete fetch error:", err);
//         callback([]);
//       }
//     }, 300);
//   };

//   const handleCandidateSelect = (selectedOption: any) => {
//     setTagFormData((prev: any) => ({
//       ...prev,
//       applicant: selectedOption ? selectedOption.label : "",
//       candidateId: selectedOption ? selectedOption.value : null,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!tagFormData.candidateId) {
//       alert("Select a candidate before submitting.");
//       return;
//     }
//     if (!tagFormData.recruiter) {
//       alert("Recruiter email is required.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const response = await positionService.tagCandidateToPosition(
//         String(selectedPositionId),
//         {
//           candidateId: tagFormData.candidateId,
//           recruiterEmail: tagFormData.recruiter,
//           immediateJoiner: tagFormData.immediateJoiner,
//           status: tagFormData.status,
//         }
//       );

//       if (response.status === 201) {
//         alert("Candidate tagged to the position.");
//         onTagged();
//       } else {
//         alert("Tagging failed: " + (response.message || "Unknown error"));
//       }
//     } catch (error) {
//       console.error("Error tagging candidate:", error);
//       alert("Could not tag the candidate. Try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 sm:p-4">
//       <div className="bg-white w-full sm:max-w-md h-[92vh] sm:h-auto sm:max-h-[90vh] rounded-t-2xl sm:rounded-lg shadow-xl flex flex-col">
//         <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200 shrink-0">
//           <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//             Tag candidate
//           </h2>
//           <button
//             type="button"
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="flex-1 flex flex-col min-h-0"
//         >
//           <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Position name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               required
//               readOnly
//               value={tagFormData.positionName}
//               className="w-full h-10 px-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Applicant <span className="text-red-500">*</span>
//             </label>
//             <AsyncSelect
//               cacheOptions
//               defaultOptions={false}
//               loadOptions={debouncedLoadOptions}
//               isSearchable
//               isClearable
//               placeholder="Search by name or email..."
//               noOptionsMessage={({ inputValue }) =>
//                 !inputValue || inputValue.length < 2
//                   ? "Type at least 2 characters"
//                   : "No candidates found"
//               }
//               loadingMessage={() => "Searching..."}
//               onChange={handleCandidateSelect}
//               value={
//                 tagFormData.candidateId
//                   ? {
//                       value: tagFormData.candidateId,
//                       label: tagFormData.applicant,
//                     }
//                   : null
//               }
//               styles={{
//                 control: (base) => ({
//                   ...base,
//                   minHeight: "40px",
//                   borderColor: "#d1d5db",
//                   "&:hover": { borderColor: "#3b82f6" },
//                 }),
//                 menu: (base) => ({ ...base, zIndex: 9999 }),
//               }}
//               components={{
//                 DropdownIndicator: () => null,
//                 IndicatorSeparator: () => null,
//               }}
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               Type at least 2 characters to search.
//             </p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Recruiter <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               required
//               value={tagFormData.recruiter}
//               onChange={(e) =>
//                 setTagFormData((prev: any) => ({
//                   ...prev,
//                   recruiter: e.target.value,
//                 }))
//               }
//               className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Recruiter email"
//             />
//           </div>

//           <div className="flex items-start">
//             <input
//               type="checkbox"
//               id="immediateJoiner"
//               checked={tagFormData.immediateJoiner}
//               onChange={(e) =>
//                 setTagFormData((prev: any) => ({
//                   ...prev,
//                   immediateJoiner: e.target.checked,
//                 }))
//               }
//               className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//             />
//             <div>
//               <label
//                 htmlFor="immediateJoiner"
//                 className="text-sm font-medium text-gray-700"
//               >
//                 Immediate joiner
//               </label>
//               <p className="text-xs text-gray-500">
//                 Tick this if the candidate can join within 15 days.
//               </p>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Status <span className="text-red-500">*</span>
//             </label>
//             <Select
//               options={candidateStatusOptions}
//               isSearchable
//               placeholder="Select status..."
//               value={
//                 candidateStatusOptions.find(
//                   (opt: any) => opt.value === tagFormData.status
//                 ) || null
//               }
//               onChange={(selected: any) =>
//                 setTagFormData((prev: any) => ({
//                   ...prev,
//                   status: selected?.value,
//                 }))
//               }
//               styles={{
//                 control: (base) => ({ ...base, minHeight: "40px" }),
//                 menu: (base) => ({ ...base, zIndex: 9999 }),
//               }}
//             />
//           </div>

//           </div>

//           <div className="flex gap-3 px-4 sm:px-6 py-3 border-t border-gray-200 shrink-0 bg-white sm:rounded-b-lg">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 sm:flex-none sm:ml-auto px-4 h-11 sm:h-10 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="flex-1 sm:flex-none px-4 h-11 sm:h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
//             >
//               {isSubmitting ? "Tagging..." : "Tag candidate"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// /* ------------------------------------------------------------------ */
// /* Position detail                                                     */
// /* ------------------------------------------------------------------ */

// const PositionDetail = ({
//   position,
//   candidates = [],
//   recruiter,
//   onBack,
//   setCandidates,
//   runAIResumeMatcherForPosition,
//   fetchPositionDetail,
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedPosition, setEditedPosition] = useState<any>({ ...position });
//   const [directAppStatusFilter, setDirectAppStatusFilter] = useState("all");

//   useEffect(() => {
//     setEditedPosition({ ...position });
//   }, [position]);

//   const handleInputChange = (field: string, value: any) =>
//     setEditedPosition((prev: any) => ({ ...prev, [field]: value }));

//   const handleCancel = () => {
//     setEditedPosition({ ...position });
//     setIsEditing(false);
//   };

//   const handleSave = async () => {
//     try {
//       const positionId = position?.id || editedPosition?.id;
//       if (!positionId) {
//         alert("Position ID is missing. Refresh the page and try again.");
//         return;
//       }

//       const updateData = {
//         id: String(positionId),
//         title: editedPosition.positionName,
//         clientSpoc: editedPosition.clientSpoc || null,
//         location: editedPosition.location || editedPosition.city,
//         status: editedPosition.status,
//         ctcBudget: editedPosition.ctcBudget
//           ? Number(String(editedPosition.ctcBudget).replace(/[^0-9]/g, "")) *
//             100000
//           : null,
//         experience: editedPosition.experience
//           ? parseInt(String(editedPosition.experience).replace(/\D/g, "")) || 0
//           : 0,
//         education: editedPosition.education || "",
//         workplaceType: editedPosition.workplaceType || "",
//         reportees: parseInt(editedPosition.reportees) || 0,
//         deadline: editedPosition.deadline || null,
//         interviewRounds: parseInt(editedPosition.rounds) || 0,
//         interviewer: editedPosition.interviewerName || null,
//         jobType: editedPosition.jobType || "",
//         roleDescription: editedPosition.roleDescription || null,
//         preferredIndustry: Array.isArray(editedPosition.preferredIndustry)
//           ? editedPosition.preferredIndustry
//           : editedPosition.preferredIndustry
//           ? String(editedPosition.preferredIndustry)
//               .split(",")
//               .map((i) => i.trim())
//               .filter(Boolean)
//           : [],
//         preferredCompanies: Array.isArray(editedPosition.preferredCompanies)
//           ? editedPosition.preferredCompanies
//           : editedPosition.preferredCompanies
//           ? String(editedPosition.preferredCompanies)
//               .split(",")
//               .map((c) => c.trim())
//               .filter(Boolean)
//           : [],
//         roleType: editedPosition.roleType || "",
//         diversityPreference: editedPosition.diversityPreference || "",
//         interviewMode: editedPosition.interviewMode || null,
//         linkedin: editedPosition.linkedIn || null,
//         lakshSpoc: Array.isArray(editedPosition.lakshSpoc)
//           ? editedPosition.lakshSpoc.filter(Boolean)
//           : editedPosition.lakshSpoc
//           ? [editedPosition.lakshSpoc]
//           : [],
//         priority: editedPosition.priority || "",
//         ctcStructure: editedPosition.ctcStructure || null,
//         function: editedPosition.function || null,
//         role: editedPosition.role || null,
//         city: editedPosition.city || editedPosition.location || "",
//         target: editedPosition.target ? Number(editedPosition.target) : null,
//       };

//       const response = await positionService.updatePosition(
//         String(positionId),
//         updateData
//       );

//       if (response.status === 200) {
//         alert("Position updated.");
//         setIsEditing(false);
//         await fetchPositionDetail(positionId);
//       } else {
//         alert("Update failed: " + (response.message || "Unknown error"));
//       }
//     } catch (error: any) {
//       console.error("Error updating position:", error);
//       alert("Could not update the position: " + (error.message || "Try again."));
//     }
//   };

//   /* -------------------- field renderer -------------------- */
//   // Every field renders as label-above-value inside a fixed-height row,
//   // so columns line up whether the page is in read or edit mode.
//   const renderField = (
//     label: string,
//     field: string,
//     type = "text",
//     options: any = null,
//     fullWidth = false
//   ) => {
//     const isReactSelect = options && options.isReactSelect;
//     const selectOptions = options?.options || [];

//     const inputClass =
//       "w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

//     let control;
//     if (!isEditing) {
//       const shown = displayValue(position[field]);
//       control = (
//         <p
//           className={`text-sm ${
//             shown === "N/A" ? "text-gray-400" : "text-gray-900"
//           } ${type === "textarea" ? "leading-relaxed" : "truncate"}`}
//           title={shown}
//         >
//           {shown}
//         </p>
//       );
//     } else if (isReactSelect) {
//       control = (
//         <Select
//           options={selectOptions}
//           isSearchable
//           placeholder={`Select ${label.toLowerCase()}...`}
//           value={
//             selectOptions.find(
//               (opt: any) => opt.value === editedPosition[field]
//             ) || null
//           }
//           onChange={(selected: any) =>
//             handleInputChange(field, selected?.value || "")
//           }
//           styles={{
//             control: (base) => ({ ...base, minHeight: "40px" }),
//             menu: (base) => ({ ...base, zIndex: 9999 }),
//           }}
//           className="text-sm"
//         />
//       );
//     } else if (type === "textarea") {
//       control = (
//         <textarea
//           rows={4}
//           value={editedPosition[field] || ""}
//           onChange={(e) => handleInputChange(field, e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       );
//     } else if (type === "select") {
//       control = (
//         <select
//           value={editedPosition[field] || ""}
//           onChange={(e) => handleInputChange(field, e.target.value)}
//           className={inputClass}
//         >
//           <option value="">Select {label.toLowerCase()}</option>
//           {selectOptions.map((opt: string) => (
//             <option key={opt} value={opt}>
//               {opt}
//             </option>
//           ))}
//         </select>
//       );
//     } else {
//       control = (
//         <input
//           type={type}
//           value={editedPosition[field] || ""}
//           onChange={(e) => handleInputChange(field, e.target.value)}
//           className={inputClass}
//         />
//       );
//     }

//     return (
//       <div
//         className={fullWidth ? "col-span-full" : ""}
//         key={field}
//       >
//         <label className="block text-[11px] font-medium uppercase tracking-wide text-gray-400 mb-0.5">
//           {label}
//         </label>
//         <div
//           className={
//             isEditing || type === "textarea"
//               ? ""
//               : "min-h-[20px] flex items-center"
//           }
//         >
//           {control}
//         </div>
//       </div>
//     );
//   };

//   const grid =
//     "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-4";

//   /* -------------------- candidates -------------------- */
//   const submittedCandidates = position.submittedCandidates || [];

//   const allDirectApplications = candidates.filter(
//     (c: any) => c.positionId === position.id && c.source === "direct"
//   );
//   const directApplications =
//     directAppStatusFilter === "all"
//       ? allDirectApplications
//       : allDirectApplications.filter(
//           (c: any) => c.status === directAppStatusFilter
//         );

//   const getStatusBadge = (status: string) => {
//     const statusStyles: Record<string, string> = {
//       internal_screening: "bg-yellow-100 text-yellow-800",
//       internal_reject: "bg-red-100 text-red-800",
//       submitted: "bg-blue-100 text-blue-800",
//       interview_scheduled: "bg-purple-100 text-purple-800",
//       selected: "bg-green-100 text-green-800",
//     };
//     const statusLabels: Record<string, string> = {
//       internal_screening: "Internal screening",
//       internal_reject: "Internal reject",
//       submitted: "Submitted",
//       interview_scheduled: "Interview scheduled",
//       selected: "Selected",
//     };
//     return (
//       <span
//         className={`px-2 py-1 rounded text-xs font-medium ${
//           statusStyles[status] || "bg-gray-100 text-gray-800"
//         }`}
//       >
//         {statusLabels[status] || status}
//       </span>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-4">
//         {/* Page header: title, meta and edit controls on one line */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3">
//           <div className="flex flex-wrap items-center gap-3">
//             <button
//               onClick={onBack}
//               className="p-2 -ml-2 rounded-md hover:bg-gray-100"
//               aria-label="Back to positions"
//             >
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//             <div className="min-w-0 flex-1">
//               <h2 className="text-lg md:text-xl font-bold text-gray-900 break-words">
//                 {position.positionName}
//                 <span className="font-normal text-gray-400 mx-2">—</span>
//                 <span className="font-semibold text-gray-700">
//                   {displayValue(position.clientName)}
//                 </span>
//               </h2>
//             </div>
//             <div className="flex gap-2 w-full sm:w-auto">
//               {!isEditing ? (
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="h-10 px-4 w-full sm:w-auto border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                   Edit details
//                 </button>
//               ) : (
//                 <>
//                   <button
//                     onClick={handleCancel}
//                     className="h-10 px-4 flex-1 sm:flex-none border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSave}
//                     className="h-10 px-4 flex-1 sm:flex-none bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
//                   >
//                     Save changes
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         <Section title="Basic details">
//           <div className={grid}>
//             {renderField("Position name", "positionName")}
//             {renderField("Client name", "clientName")}
//             {renderField("Status", "status", "select", {
//               options: [
//                 "Open",
//                 "On Hold",
//                 "Close by LHR",
//                 "Lost",
//                 "Candidate identified",
//               ],
//             })}
//             {renderField("Priority", "priority", "select", {
//               options: ["High", "Medium", "Low"],
//             })}
//             {renderField("Role type", "roleType", "select", {
//               options: ["New", "Replacement"],
//             })}
//             {renderField("Job type", "jobType", "select", {
//               options: ["Full-time", "Part-time", "Contract", "Internship"],
//             })}
//             {renderField("Recruiter", "recruiter")}
//             {renderField("Client SPOC", "clientSpoc")}
//             {renderField("Laksh SPOC", "lakshSpoc")}
//           </div>
//         </Section>

//         <Section title="Role requirements">
//           <div className={grid}>
//             {renderField("Function", "function", "text", {
//               isReactSelect: true,
//               options: functionOptions,
//             })}
//             {renderField("Role", "role", "text", {
//               isReactSelect: true,
//               options: roleOptions,
//             })}
//             {renderField("Education", "education", "text", {
//               isReactSelect: true,
//               options: educationOptions,
//             })}
//             {renderField("Experience", "experience")}
//             {renderField("Reportees", "reportees", "number")}
//             {renderField("Target hires", "target", "number")}
//             {renderField("Role description", "roleDescription", "textarea", null, true)}
//           </div>
//         </Section>

//         <Section title="Compensation and workplace">
//           <div className={grid}>
//             {renderField("CTC budget", "ctcBudget")}
//             {renderField("CTC structure", "ctcStructure")}
//             {renderField("Workplace type", "workplaceType", "select", {
//               options: ["In office", "Remote", "Hybrid"],
//             })}
//             {renderField("City", "city", "text", {
//               isReactSelect: true,
//               options: cityOptions,
//             })}
//             {renderField("Deadline to close", "deadline", "date")}
//           </div>
//         </Section>

//         <Section title="Candidate preferences">
//           <div className={grid}>
//             {renderField("Preferred industry", "preferredIndustry")}
//             {renderField("Preferred companies", "preferredCompanies")}
//             {renderField("Diversity preference", "diversityPreference", "select", {
//               options: [
//                 "No Preference",
//                 "Gender Diverse",
//                 "Ethnically Diverse",
//                 "Age Diverse",
//               ],
//             })}
//           </div>
//         </Section>

//         <Section title="Interview process">
//           <div className={grid}>
//             {renderField("Number of rounds", "rounds", "number")}
//             {renderField("Interviewer", "interviewerName")}
//             {renderField("Mode of interview", "interviewMode", "select", {
//               options: [
//                 "Video Call",
//                 "In-person",
//                 "Phone Call",
//                 "In-person + Video",
//               ],
//             })}
//             <div>
//               <label className="block text-[11px] font-medium uppercase tracking-wide text-gray-400 mb-0.5">
//                 Interviewer LinkedIn
//               </label>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   value={editedPosition.linkedIn || ""}
//                   onChange={(e) => handleInputChange("linkedIn", e.target.value)}
//                   className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               ) : position.linkedIn ? (
//                 <div className="min-h-[20px] flex items-center">
//                   <a
//                     href={`https://${String(position.linkedIn).replace(
//                       /^https?:\/\//,
//                       ""
//                     )}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-sm text-blue-600 hover:underline"
//                   >
//                     View profile
//                   </a>
//                 </div>
//               ) : (
//                 <div className="min-h-[20px] flex items-center">
//                   <p className="text-sm text-gray-900">N/A</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </Section>

//         {/* Candidates */}
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
//           <Section
//             title={`Submitted candidates (${submittedCandidates.length})`}
//             action={<Users className="w-5 h-5 text-gray-400" />}
//           >
//             <div className="space-y-3">
//               {submittedCandidates.map((candidate: any) => (
//                 <div
//                   key={candidate.id}
//                   className="border border-gray-200 rounded-lg p-4"
//                 >
//                   <h4 className="font-medium text-gray-900">{candidate.name}</h4>
//                   <p className="text-sm text-gray-600">{candidate.email}</p>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-3 text-sm text-gray-600">
//                     <div>Current CTC: ₹{candidate.current_ctc} LPA</div>
//                     <div>Expected CTC: ₹{candidate.expected_ctc} LPA</div>
//                     <div>Notice period: {candidate.noticeperiod} days</div>
//                     <div className="truncate">
//                       Recruiter: {candidate.recruiter}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {submittedCandidates.length === 0 && (
//                 <p className="text-gray-500 text-center py-6 text-sm">
//                   No candidates submitted yet. Tag one from the positions list.
//                 </p>
//               )}
//             </div>
//           </Section>

//           <Section
//             title={`Direct applications (${directApplications.length})`}
//             action={<Mail className="w-5 h-5 text-gray-400" />}
//           >
//             <div className="flex flex-wrap items-center gap-3 mb-4">
//               <select
//                 className="h-10 px-3 flex-1 sm:flex-none border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={directAppStatusFilter}
//                 onChange={(e) => setDirectAppStatusFilter(e.target.value)}
//               >
//                 <option value="all">All statuses</option>
//                 <option value="internal_screening">Internal screening</option>
//                 <option value="internal_reject">Internal reject</option>
//                 <option value="interview_scheduled">Interview scheduled</option>
//                 <option value="selected">Selected</option>
//               </select>
//               <button
//                 onClick={() => runAIResumeMatcherForPosition(position.id)}
//                 className="h-10 px-4 flex-1 sm:flex-none justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
//               >
//                 <Bot className="w-4 h-4" />
//                 Run AI resume matcher
//               </button>
//             </div>

//             <div className="space-y-3">
//               {directApplications.map((candidate: any) => (
//                 <div
//                   key={candidate.id}
//                   className="border border-gray-200 rounded-lg p-4"
//                 >
//                   <div className="flex flex-wrap items-center gap-2 mb-1">
//                     <h4 className="font-medium text-gray-900">
//                       {candidate.name}
//                     </h4>
//                     {getStatusBadge(candidate.status)}
//                     {candidate.aiScore ? (
//                       <span
//                         className={`px-2 py-1 rounded text-xs font-medium ${
//                           candidate.aiScore >= 85
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         AI score: {candidate.aiScore}
//                       </span>
//                     ) : null}
//                   </div>
//                   <p className="text-sm text-gray-600">{candidate.email}</p>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-3 text-sm text-gray-600">
//                     <div>
//                       Current CTC: ₹
//                       {(candidate.currentCTC / 100000).toFixed(1)} LPA
//                     </div>
//                     <div>
//                       Expected CTC: ₹
//                       {(candidate.expectedCTC / 100000).toFixed(1)} LPA
//                     </div>
//                     <div>Notice period: {candidate.noticePeriod} days</div>
//                     <div className="truncate">Source: {candidate.recruiter}</div>
//                   </div>
//                   {candidate.status === "internal_screening" &&
//                     candidate.aiScore >= 85 && (
//                       <button
//                         onClick={() => {
//                           setCandidates((prev: any[]) =>
//                             prev.map((c) =>
//                               c.id === candidate.id
//                                 ? {
//                                     ...c,
//                                     status: "submitted",
//                                     source: "recruiter",
//                                     recruiter,
//                                   }
//                                 : c
//                             )
//                           );
//                           alert("Candidate tagged to the position.");
//                         }}
//                         className="mt-3 h-9 px-3 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
//                       >
//                         Tag to position
//                       </button>
//                     )}
//                 </div>
//               ))}
//               {directApplications.length === 0 && (
//                 <p className="text-gray-500 text-center py-6 text-sm">
//                   {directAppStatusFilter === "all"
//                     ? "No direct applications yet."
//                     : "No candidates in this status."}
//                 </p>
//               )}
//             </div>
//           </Section>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ------------------------------------------------------------------ */
// /* Positions table                                                     */
// /* ------------------------------------------------------------------ */

// const PositionTable = ({ positions, onOpen, onTag, onAIMatcher }) => (
//   <>
//     {/* Mobile: stacked cards */}
//     <div className="md:hidden space-y-3">
//       {positions.map((position: any) => (
//         <div
//           key={position.id}
//           onClick={() => onOpen(position)}
//           className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 active:bg-gray-50"
//         >
//           <div className="flex items-start justify-between gap-3">
//             <p className="text-sm font-medium text-gray-900 leading-5 break-words">
//               {position.positionName}
//             </p>
//             <span
//               className={`shrink-0 inline-flex px-2 py-0.5 text-xs font-medium leading-4 rounded-full ${
//                 position.priority === "High"
//                   ? "bg-red-100 text-red-800"
//                   : position.priority === "Medium"
//                   ? "bg-yellow-100 text-yellow-800"
//                   : "bg-green-100 text-green-800"
//               }`}
//             >
//               {position.priority}
//             </span>
//           </div>

//           <p className="text-sm text-gray-700 mt-1 break-words">
//             {position.clientName}
//           </p>

//           <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
//             <span>{position.ctcBudget}</span>
//             <span className="flex items-center min-w-0">
//               <MapPin className="w-3 h-3 mr-1 shrink-0" />
//               <span className="truncate">{position.location}</span>
//             </span>
//             <span>
//               {position.experience} • {position.workplaceType}
//             </span>
//           </div>

//           <div className="flex gap-2 mt-3">
//             <button
//               className="flex-1 h-9 bg-green-100 text-green-800 text-xs font-medium rounded hover:bg-green-200"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onTag(position);
//               }}
//             >
//               Tag candidate
//             </button>
//             <button
//               className="flex-1 h-9 border border-purple-200 text-xs font-medium text-purple-600 rounded hover:bg-purple-50"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onAIMatcher();
//               }}
//             >
//               AI matcher
//             </button>
//           </div>
//         </div>
//       ))}

//       {positions.length === 0 && (
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-sm text-gray-500">
//           No positions match this search.
//         </div>
//       )}
//     </div>

//     {/* Desktop: table */}
//     <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//     <div className="w-full">
//       <table className="w-full table-fixed divide-y divide-gray-200">
//         <colgroup>
//           <col className="w-[30%]" />
//           <col className="w-[24%]" />
//           <col className="w-[20%]" />
//           <col className="w-[26%]" />
//         </colgroup>
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Position
//             </th>
//             <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Client and priority
//             </th>
//             <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               CTC and location
//             </th>
//             <th className="px-4 py-2.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {positions.map((position: any) => {
//             return (
//               <tr
//                 key={position.id}
//                 className="hover:bg-gray-50 cursor-pointer align-top"
//                 onClick={() => onOpen(position)}
//               >
//                 <td className="px-4 py-3 align-top">
//                   <div className="flex flex-col min-w-0">
//                     <span className="text-sm font-medium text-gray-900 leading-5 break-words">
//                       {position.positionName}
//                     </span>
//                     <span className="text-xs text-gray-500 leading-5 mt-0.5 truncate">
//                       {position.experience} • {position.workplaceType}
//                     </span>
//                   </div>
//                 </td>

//                 <td className="px-4 py-3 align-top">
//                   <div className="flex flex-col min-w-0">
//                   <span className="text-sm text-gray-900 leading-5 break-words">
//                     {position.clientName}
//                   </span>
//                   <span
//                     className={`inline-flex self-start mt-1 px-2 py-0.5 text-xs font-medium leading-4 rounded-full ${
//                       position.priority === "High"
//                         ? "bg-red-100 text-red-800"
//                         : position.priority === "Medium"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-green-100 text-green-800"
//                     }`}
//                   >
//                     {position.priority}
//                   </span>
//                   </div>
//                 </td>

//                 <td className="px-4 py-3 align-top">
//                   <div className="flex flex-col min-w-0">
//                     <span className="text-sm text-gray-900 leading-5 truncate">
//                       {position.ctcBudget}
//                     </span>
//                     <span className="text-xs text-gray-500 leading-5 mt-0.5 flex items-center min-w-0">
//                       <MapPin className="w-3 h-3 mr-1 shrink-0" />
//                       <span className="truncate">{position.location}</span>
//                     </span>
//                   </div>
//                 </td>

//                 <td className="px-4 py-3 align-top">
//                   <div className="flex justify-end items-start gap-2">
//                     <button
//                       className="h-7 px-2.5 bg-green-100 text-green-800 text-xs font-medium rounded hover:bg-green-200 whitespace-nowrap"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         onTag(position);
//                       }}
//                     >
//                       Tag candidate
//                     </button>
//                     <button
//                       className="h-7 px-2.5 text-xs font-medium text-purple-600 rounded hover:bg-purple-50 whitespace-nowrap"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         onAIMatcher();
//                       }}
//                     >
//                       AI matcher
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}

//           {positions.length === 0 && (
//             <tr>
//               <td
//                 colSpan={4}
//                 className="px-4 py-10 text-center text-sm text-gray-500"
//               >
//                 No positions match this search. Clear the filters or create a
//                 position.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//     </div>
//   </>
// );

// /* ------------------------------------------------------------------ */
// /* Main                                                                */
// /* ------------------------------------------------------------------ */

// const PositionManagement = () => {
//   const [currentView, setCurrentView] = useState("positions");
//   const [selectedPosition, setSelectedPosition] = useState<any>(null);
//   const [tagPositionId, setTagPositionId] = useState<any>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterBy, setFilterBy] = useState("all");
//   const [groupBy, setGroupBy] = useState("none");
//   const [showTagForm, setShowTagForm] = useState(false);
//   const [showAddCandidate, setShowAddCandidate] = useState<any>(false);
//   const [showCandidateForm, setShowCandidateForm] = useState(false);
//   const [showCreatePosition, setShowCreatePosition] = useState(false);
//   const [candidateEmail, setCandidateEmail] = useState("");
//   const [loadingPositionDetail, setLoadingPositionDetail] = useState(false);
//   const [clientOptions, setClientOptions] = useState<any[]>([]);
//   const [isSubmittingTag, setIsSubmittingTag] = useState(false);
//   const [positions, setPositions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const recruiter = localStorage.getItem("email") || "";

//   const [tagFormData, setTagFormData] = useState<any>({
//     positionName: "",
//     applicant: "",
//     candidateId: null,
//     recruiter: "",
//     immediateJoiner: false,
//     status: "",
//   });

//   const [newPosition, setNewPosition] = useState<any>({
//     positionName: "",
//     clientName: "",
//     status: "Open",
//     roleType: "",
//     jobType: "",
//     priority: "",
//     recruiter: recruiter,
//     clientSPOC: "",
//     experienceYears: "",
//     education: "",
//     roleDescription: "",
//     function: "",
//     role: "",
//     ctcBudgetNumeric: "",
//     ctcStructure: "",
//     budgetForRole: "",
//     workplaceType: "",
//     city: "",
//     preferredIndustry: "",
//     preferredCompanies: "",
//     diversityPreference: "",
//     target: "",
//     rounds: "",
//     interviewerName: "",
//     interviewerLinkedIn: "",
//     interviewMode: "",
//     deadline: "",
//     keywords: "",
//     prompt: "",
//     aiPreferredIndustries: [],
//     aiPreferredFunctions: [],
//     aiPreferredRole: "",
//   });

//   const [candidates, setCandidates] = useState<any[]>([
//     {
//       id: 1,
//       email: "john.smith@email.com",
//       name: "John Smith",
//       currentCTC: 1500000,
//       expectedCTC: 2000000,
//       noticePeriod: 30,
//       status: "submitted",
//       positionId: 1,
//       recruiter: recruiter,
//       source: "recruiter",
//     },
//     {
//       id: 2,
//       email: "jane.doe@email.com",
//       name: "Jane Doe",
//       currentCTC: 1200000,
//       expectedCTC: 1800000,
//       noticePeriod: 60,
//       status: "internal_screening",
//       positionId: 1,
//       recruiter: "AI Matcher",
//       source: "direct",
//       aiScore: null,
//     },
//     {
//       id: 3,
//       email: "alex.kumar@email.com",
//       name: "Alex Kumar",
//       currentCTC: 1800000,
//       expectedCTC: 2500000,
//       noticePeriod: 45,
//       status: "internal_screening",
//       positionId: 1,
//       recruiter: "Direct Application",
//       source: "direct",
//       aiScore: null,
//     },
//     {
//       id: 4,
//       email: "priya.sharma@email.com",
//       name: "Priya Sharma",
//       currentCTC: 1600000,
//       expectedCTC: 2200000,
//       noticePeriod: 30,
//       status: "internal_screening",
//       positionId: 1,
//       recruiter: "Direct Application",
//       source: "direct",
//       aiScore: null,
//     },
//     {
//       id: 5,
//       email: "rajesh.patel@email.com",
//       name: "Rajesh Patel",
//       currentCTC: 1400000,
//       expectedCTC: 2000000,
//       noticePeriod: 60,
//       status: "internal_reject",
//       positionId: 1,
//       recruiter: "Direct Application",
//       source: "direct",
//       aiScore: 12,
//     },
//   ]);

//   const [newCandidate, setNewCandidate] = useState<any>({
//     email: "",
//     resume: null,
//     currentCTC: "",
//     specialComments: "",
//     education: "",
//     gender: "",
//     openToRelocation: false,
//     engagementType: "",
//     expectedCTC: "",
//     noticePeriod: "",
//     recruiter: recruiter,
//   });

//   /* -------------------- data -------------------- */

//   const transformPosition = (position: any) => {
//     const [submitted, targeted] = String(position.progress || "0/0")
//       .split("/")
//       .map(Number);

//     return {
//       id: position.id,
//       positionName: position.title,
//       clientName: position.client,
//       submittedResumes: submitted || 0,
//       targetedResumes: targeted || 0,
//       ctcBudget: Number.isFinite(Number(position.ctc)) && Number(position.ctc) > 0
//         ? `${(Number(position.ctc) / 100000).toFixed(0)} LPA`
//         : "N/A",
//       location: position.location || "N/A",
//       priority: position.priority || "Medium",
//       experience: position.experience ? `${position.experience} years` : "N/A",
//       workplaceType: position.mode || "N/A",
//       status: position.status || "Active",
//       ctcBudgetNumeric: position.ctc || 0,
//       city: position.location || "N/A",
//       experienceYears: position.experience || "N/A",
//       daysSinceNoAction: position.daysSinceNoAction || 0,
//       education: position.education || "N/A",
//       roleDescription: position.roleDescription || "",
//       preferredIndustry: position.preferredIndustry || "",
//       preferredCompanies: position.preferredCompanies || "",
//       reportees: position.reportees || 0,
//       deadline: position.deadline || "",
//       rounds: position.rounds || 0,
//       interviewerName: position.interviewerName || "",
//       interviewerLinkedIn: position.interviewerLinkedIn || "",
//       ctcStructure: position.ctcStructure || "",
//       roleType: position.roleType || "",
//       diversityPreference: position.diversityPreference || "",
//       interviewMode: position.interviewMode || "",
//       jobType: position.jobType || "",
//       clientSPOC: position.clientSPOC || "",
//       lakshSPOC: position.lakshSPOC || "",
//       recruiter: position.recruiter || "",
//       function: position.function || "",
//       role: position.role || "",
//       target: targeted || 0,
//       createdDate: position.createdDate || new Date().toISOString(),
//       lastActivityDate: position.lastActivityDate || new Date().toISOString(),
//     };
//   };

//   const loadPositions = async () => {
//     try {
//       const res = await positionService.fetchAll(1, 2000);
//       if (res.status === 200) {
//         setPositions(res.data.positions.map(transformPosition));
//       } else {
//         console.error("Failed to fetch positions:", res.message);
//       }
//     } catch (err) {
//       console.error("Error fetching positions:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPositionDetail = async (positionId: any) => {
//     setLoadingPositionDetail(true);
//     try {
//       const res = await positionService.fetchById(positionId);
//       if (res.status === 200) {
//         const position = res.data;
//         setSelectedPosition({
//           id: String(position.id),
//           positionName: position.title || "N/A",
//           clientName: position.clientName || "N/A",
//           submittedResumes: position.submittedCandidates?.length || 0,
//           targetedResumes: position.targetedResumes || 0,
//           ctcBudget: position.ctcBudget
//             ? `${(Number(position.ctcBudget) / 100000).toFixed(0)} LPA`
//             : "N/A",
//           ctcStructure: position.ctcStructure || "",
//           city: position.location || "",
//           location: position.location || "",
//           experience: position.experience ? `${position.experience} years` : "",
//           priority: position.priority || "",
//           function: position.function || "",
//           role: position.role || "",
//           workplaceType: position.workplaceType || "",
//           status: position.status || "Open",
//           education: position.education || "",
//           roleDescription: position.roleDescription || "",
//           preferredIndustry: position.preferredIndustry || [],
//           preferredCompanies: position.preferredCompanies || [],
//           reportees: position.reportees || 0,
//           target: position.target || 0,
//           deadline: position.deadline || "",
//           rounds: position.interviewRounds || 0,
//           interviewerName: position.interviewer || "",
//           diversityPreference: position.diversityPreference || "",
//           interviewMode: position.interviewMode || "",
//           jobType: position.jobType || "",
//           roleType: position.roleType || "",
//           clientSpoc: position.clientSpoc || "",
//           lakshSpoc: position.lakshSpoc?.filter(Boolean) || [],
//           recruiter: position.recruiter || "",
//           linkedIn: position.linkedin || null,
//           submittedCandidates: position.submittedCandidates || [],
//           message: position.message || "",
//         });
//       }
//     } catch (err) {
//       console.error("Error fetching position detail:", err);
//     } finally {
//       setLoadingPositionDetail(false);
//     }
//   };

//   useEffect(() => {
//     const fetchClients = async () => {
//       const res = await clientService.fetchAll();
//       const clients = res?.data || [];
//       setClientOptions(
//         clients.map((c: any) => ({
//           id: c.id,
//           label: c.client_name,
//           value: c.id,
//           clientHRSpocs: c.clientHRSpocs || [],
//         }))
//       );
//     };
//     fetchClients();
//   }, []);

//   useEffect(() => {
//     loadPositions();
//   }, []);

//   /* -------------------- derived -------------------- */

//   const filteredPositions = positions.filter((position) => {
//     const term = searchTerm.toLowerCase();
//     const matchesSearch =
//       (position.positionName || "").toLowerCase().includes(term) ||
//       (position.clientName || "").toLowerCase().includes(term) ||
//       (position.location || "").toLowerCase().includes(term) ||
//       (position.priority || "").toLowerCase().includes(term) ||
//       (position.experience || "").toLowerCase().includes(term);

//     if (filterBy === "all") return matchesSearch;
//     return matchesSearch && position.priority === filterBy;
//   });

//   const groupedPositions =
//     groupBy === "clientName"
//       ? filteredPositions.reduce((acc: any, position: any) => {
//           const client = position.clientName || "Unassigned";
//           if (!acc[client]) acc[client] = [];
//           acc[client].push(position);
//           return acc;
//         }, {})
//       : { "All Positions": filteredPositions };

//   /* -------------------- handlers -------------------- */

//   const handleEmailCheck = () => {
//     const existingCandidate = candidates.find((c) => c.email === candidateEmail);
//     if (existingCandidate) {
//       setCandidates((prev) =>
//         prev.map((c) =>
//           c.email === candidateEmail ? { ...c, positionId: showAddCandidate } : c
//         )
//       );
//       setShowAddCandidate(false);
//       setCandidateEmail("");
//       alert("Candidate tagged to the position.");
//     } else {
//       setShowCandidateForm(true);
//       setNewCandidate({ ...newCandidate, email: candidateEmail });
//     }
//   };

//   const handleCreateCandidate = () => {
//     const candidate = {
//       id: candidates.length + 1,
//       ...newCandidate,
//       status: "submitted",
//       positionId: showAddCandidate,
//       source: "recruiter",
//       name: newCandidate.email.split("@")[0].replace(".", " "),
//     };
//     setCandidates([...candidates, candidate]);
//     setShowCandidateForm(false);
//     setShowAddCandidate(false);
//     setNewCandidate({
//       email: "",
//       resume: null,
//       currentCTC: "",
//       specialComments: "",
//       education: "",
//       gender: "",
//       openToRelocation: false,
//       engagementType: "",
//       expectedCTC: "",
//       noticePeriod: "",
//       recruiter: recruiter,
//     });
//     alert("Candidate created and tagged.");
//   };

//   const handleCreatePosition = async () => {
//     try {
//       if (!newPosition.positionName) {
//         alert("Position name is required.");
//         return;
//       }

//       const payload = {
//         positionName: newPosition.positionName,
//         clientName: newPosition.clientName,
//         priority: newPosition.priority || "",
//         status: newPosition.status,
//         roleType: newPosition.roleType || "",
//         jobType: newPosition.jobType || "",
//         function: newPosition.function || null,
//         role: newPosition.role || null,
//         roleDescription: newPosition.roleDescription || null,
//         experience: newPosition.experienceYears
//           ? parseInt(newPosition.experienceYears.replace(/\D/g, "")) || 0
//           : 0,
//         education: newPosition.education || "",
//         ctcStructure: newPosition.ctcStructure || null,
//         ctcBudget: newPosition.ctcBudgetNumeric
//           ? Number(newPosition.ctcBudgetNumeric)
//           : null,
//         workplaceType: newPosition.workplaceType || "",
//         city: newPosition.city || "",
//         preferredIndustries: newPosition.preferredIndustry
//           ? newPosition.preferredIndustry
//               .split(",")
//               .map((i: string) => i.trim())
//               .filter(Boolean)
//           : [],
//         preferredCompanies: newPosition.preferredCompanies || null,
//         diversityPreference: newPosition.diversityPreference || "",
//         target: newPosition.target ? Number(newPosition.target) : 1,
//         recruiter: recruiter,
//         numberOfRounds: newPosition.rounds ? Number(newPosition.rounds) : 1,
//         interviewerName: newPosition.interviewerName || null,
//         interviewerLinkedin: newPosition.interviewerLinkedIn || null,
//         modeOfInterview: newPosition.interviewMode || null,
//         deadline: newPosition.deadline || null,
//         keywords: newPosition.keywords || null,
//         aiPrompt: newPosition.prompt || null,
//         aiPreferredIndustries: newPosition.aiPreferredIndustries || [],
//         aiPreferredFunctions: newPosition.aiPreferredFunctions || [],
//         aiPreferredRole: newPosition.aiPreferredRole || null,
//         clientSpoc: newPosition.clientSPOC || null,
//       };

//       const response = await positionService.createPosition(payload);

//       if (response.status === 201 || response.status === 200) {
//         alert("Position created.");
//         setShowCreatePosition(false);
//         setNewPosition({
//           positionName: "",
//           clientName: "",
//           status: "Open",
//           roleType: "",
//           jobType: "",
//           priority: "",
//           recruiter: recruiter,
//           clientSPOC: "",
//           experienceYears: "",
//           education: "",
//           roleDescription: "",
//           function: "",
//           role: "",
//           ctcBudgetNumeric: "",
//           ctcStructure: "",
//           budgetForRole: "",
//           workplaceType: "",
//           city: "",
//           preferredIndustry: "",
//           preferredCompanies: "",
//           diversityPreference: "",
//           target: "",
//           rounds: "",
//           interviewerName: "",
//           interviewerLinkedIn: "",
//           interviewMode: "",
//           deadline: "",
//           keywords: "",
//           prompt: "",
//           aiPreferredIndustries: [],
//           aiPreferredFunctions: [],
//           aiPreferredRole: "",
//         });
//         await loadPositions();
//       } else {
//         alert(
//           "Could not create the position: " +
//             (response.message || "Unknown error")
//         );
//       }
//     } catch (error) {
//       console.error("Error creating position:", error);
//       alert("Could not create the position. Try again.");
//     }
//   };

//   const handleMultiSelectChange = (field: string, value: string) => {
//     const currentValues = newPosition[field];
//     const updatedValues = currentValues.includes(value)
//       ? currentValues.filter((item: string) => item !== value)
//       : [...currentValues, value];
//     setNewPosition({ ...newPosition, [field]: updatedValues });
//   };

//   const runAIResumeMatcherForPosition = (positionId: any) => {
//     const eligibleCandidates = candidates.filter(
//       (c) =>
//         c.positionId === positionId &&
//         c.source === "direct" &&
//         c.status === "internal_screening"
//     );

//     if (eligibleCandidates.length === 0) {
//       alert("No candidates in internal screening for this position.");
//       return;
//     }

//     alert(`Scoring ${eligibleCandidates.length} candidates...`);

//     setTimeout(() => {
//       const scored = candidates.map((c) => {
//         if (!eligibleCandidates.find((e) => e.id === c.id)) return c;
//         const score = Math.floor(Math.random() * 100) + 1;
//         return {
//           ...c,
//           aiScore: score,
//           status: score >= 85 ? "internal_screening" : "internal_reject",
//         };
//       });
//       setCandidates(scored);

//       const qualified = scored.filter(
//         (c) =>
//           eligibleCandidates.find((e) => e.id === c.id) && (c.aiScore || 0) >= 85
//       ).length;

//       alert(
//         `Scoring complete. ${qualified} candidates qualified for recruiter review; the rest moved to internal reject.`
//       );
//     }, 3000);
//   };

//   const openTagForm = (position: any) => {
//     setTagPositionId(position.id);
//     setTagFormData({
//       positionName: position.positionName,
//       applicant: "",
//       candidateId: null,
//       recruiter: recruiter,
//       immediateJoiner: false,
//       status: "",
//     });
//     setShowTagForm(true);
//   };

//   const closeTagForm = () => {
//     setShowTagForm(false);
//     setTagPositionId(null);
//     setTagFormData({
//       positionName: "",
//       applicant: "",
//       candidateId: null,
//       recruiter: "",
//       immediateJoiner: false,
//       status: "",
//     });
//   };

//   /* -------------------- detail view -------------------- */

//   if (currentView === "position-detail" && selectedPosition) {
//     return (
//       <PositionDetail
//         position={selectedPosition}
//         candidates={candidates}
//         recruiter={recruiter}
//         onBack={() => {
//           setSelectedPosition(null);
//           setCurrentView("positions");
//         }}
//         setCandidates={setCandidates}
//         runAIResumeMatcherForPosition={runAIResumeMatcherForPosition}
//         fetchPositionDetail={fetchPositionDetail}
//       />
//     );
//   }

//   /* -------------------- list view -------------------- */

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       {showTagForm && (
//         <TagCandidateModal
//           onClose={closeTagForm}
//           tagFormData={tagFormData}
//           setTagFormData={setTagFormData}
//           selectedPositionId={tagPositionId}
//           isSubmitting={isSubmittingTag}
//           setIsSubmitting={setIsSubmittingTag}
//           onTagged={() => {
//             closeTagForm();
//             loadPositions();
//           }}
//         />
//       )}

//       <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
//         {/* Toolbar: search, filters and create action on one line */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//           <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap md:items-center gap-3">
//             <div className="relative flex-1 min-w-0 basis-full lg:basis-auto">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//               <input
//                 type="text"
//                 placeholder="Search by position, client, location, priority or experience"
//                 className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             <select
//               className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:flex-1 lg:flex-none lg:w-44 shrink-0"
//               value={filterBy}
//               onChange={(e) => setFilterBy(e.target.value)}
//             >
//               <option value="all">All priorities</option>
//               <option value="High">High priority</option>
//               <option value="Medium">Medium priority</option>
//               <option value="Low">Low priority</option>
//             </select>

//             <select
//               className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:flex-1 lg:flex-none lg:w-44 shrink-0"
//               value={groupBy}
//               onChange={(e) => setGroupBy(e.target.value)}
//             >
//               <option value="none">No grouping</option>
//               <option value="clientName">Group by client</option>
//             </select>

//             <button
//               className="h-10 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shrink-0"
//               onClick={() => setShowCreatePosition(true)}
//             >
//               <Plus className="w-4 h-4" />
//               Create position
//             </button>
//           </div>
//         </div>

//         {/* Positions */}
//         {loading ? (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center text-sm text-gray-500">
//             Loading positions...
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {Object.entries(groupedPositions).map(
//               ([groupName, groupPositions]: any) => (
//                 <div key={groupName} className="space-y-3">
//                   {groupBy !== "none" && (
//                     <h2 className="text-lg font-semibold text-gray-900">
//                       {groupName}
//                     </h2>
//                   )}
//                   <PositionTable
//                     positions={groupPositions}
//                     onOpen={(position: any) => {
//                       fetchPositionDetail(position.id);
//                       setCurrentView("position-detail");
//                     }}
//                     onTag={openTagForm}
//                     onAIMatcher={() => navigate("/ai-matcher")}
//                   />
//                 </div>
//               )
//             )}
//           </div>
//         )}
//       </div>

//       {/* Add Candidate Modal */}
//       {showAddCandidate && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-semibold mb-4">Add candidate</h2>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email ID
//             </label>
//             <input
//               type="email"
//               className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={candidateEmail}
//               onChange={(e) => setCandidateEmail(e.target.value)}
//               placeholder="candidate@email.com"
//             />
//             <div className="flex gap-3 mt-5">
//               <button
//                 onClick={handleEmailCheck}
//                 className="flex-1 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//                 disabled={!candidateEmail}
//               >
//                 Check email
//               </button>
//               <button
//                 onClick={() => setShowAddCandidate(false)}
//                 className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Create Candidate Modal */}
//       {showCandidateForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
//           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-xl font-semibold">Create candidate</h2>
//             </div>
//             <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.email}
//                   onChange={(e) =>
//                     setNewCandidate({ ...newCandidate, email: e.target.value })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Current CTC (₹)
//                 </label>
//                 <input
//                   type="number"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.currentCTC}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       currentCTC: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Expected CTC (₹)
//                 </label>
//                 <input
//                   type="number"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.expectedCTC}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       expectedCTC: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Notice period (days)
//                 </label>
//                 <input
//                   type="number"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.noticePeriod}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       noticePeriod: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Education
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.education}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       education: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Gender
//                 </label>
//                 <select
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.gender}
//                   onChange={(e) =>
//                     setNewCandidate({ ...newCandidate, gender: e.target.value })
//                   }
//                 >
//                   <option value="">Select gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Engagement type
//                 </label>
//                 <select
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.engagementType}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       engagementType: e.target.value,
//                     })
//                   }
//                 >
//                   <option value="">Select type</option>
//                   <option value="Full-time">Full-time</option>
//                   <option value="Part-time">Part-time</option>
//                   <option value="Contract">Contract</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Recruiter
//                 </label>
//                 <input
//                   type="text"
//                   readOnly
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm bg-gray-100"
//                   value={newCandidate.recruiter}
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="flex items-center text-sm text-gray-700">
//                   <input
//                     type="checkbox"
//                     className="mr-2 h-4 w-4"
//                     checked={newCandidate.openToRelocation}
//                     onChange={(e) =>
//                       setNewCandidate({
//                         ...newCandidate,
//                         openToRelocation: e.target.checked,
//                       })
//                     }
//                   />
//                   Open to relocation
//                 </label>
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Special comments
//                 </label>
//                 <textarea
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.specialComments}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       specialComments: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </div>
//             <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
//               <button
//                 onClick={handleCreateCandidate}
//                 className="flex-1 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Create candidate
//               </button>
//               <button
//                 onClick={() => setShowCandidateForm(false)}
//                 className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Create Position Modal */}
//       {showCreatePosition && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 sm:p-4">
//           <div className="bg-white w-full sm:max-w-4xl h-[94vh] sm:h-auto sm:max-h-[92vh] rounded-t-2xl sm:rounded-lg flex flex-col">
//             <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200 shrink-0">
//               <h2 className="text-lg sm:text-2xl font-semibold">
//                 Create position
//               </h2>
//               <button
//                 onClick={() => setShowCreatePosition(false)}
//                 className="text-gray-500 hover:text-gray-700 text-xl leading-none"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
//               {/* Basic Job Details */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">
//                   📌 Basic job details
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Position name *
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.positionName}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           positionName: e.target.value,
//                         })
//                       }
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Client name *
//                     </label>
//                     <Select
//                       options={clientOptions}
//                       value={
//                         clientOptions.find(
//                           (opt) => opt.value === newPosition.clientName
//                         ) || null
//                       }
//                       onChange={(selected: any) =>
//                         setNewPosition({
//                           ...newPosition,
//                           clientName: selected.value,
//                           clientSPOC:
//                             selected?.clientHRSpocs?.[0]?.client_SPOC || "",
//                         })
//                       }
//                       isSearchable
//                       placeholder="Search client..."
//                       styles={{
//                         control: (base) => ({ ...base, minHeight: "40px" }),
//                         menu: (base) => ({ ...base, zIndex: 9999 }),
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Status
//                     </label>
//                     <select
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.status}
//                       onChange={(e) =>
//                         setNewPosition({ ...newPosition, status: e.target.value })
//                       }
//                     >
//                       <option value="Open">Open</option>
//                       <option value="On Hold">On hold</option>
//                       <option value="Close by LHR">Close by LHR</option>
//                       <option value="Lost">Lost</option>
//                       <option value="Candidate identified">
//                         Candidate identified
//                       </option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       New / replacement role
//                     </label>
//                     <select
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.roleType}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           roleType: e.target.value,
//                         })
//                       }
//                     >
//                       <option value="">Select</option>
//                       <option value="New">New</option>
//                       <option value="Replacement">Replacement</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Job type
//                     </label>
//                     <select
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.jobType}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           jobType: e.target.value,
//                         })
//                       }
//                     >
//                       <option value="">Select</option>
//                       <option value="Full-time">Full-time</option>
//                       <option value="Part-time">Part-time</option>
//                       <option value="Contract">Contract</option>
//                       <option value="Internship">Internship</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Priority
//                     </label>
//                     <select
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.priority}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           priority: e.target.value,
//                         })
//                       }
//                     >
//                       <option value="">Select priority</option>
//                       <option value="High">High</option>
//                       <option value="Medium">Medium</option>
//                       <option value="Low">Low</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Recruiter
//                     </label>
//                     <input
//                       type="text"
//                       readOnly
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm bg-gray-100"
//                       value={newPosition.recruiter}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Client SPOC
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.clientSPOC}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           clientSPOC: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Role Requirements */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">
//                   💼 Role requirements
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Experience needed (years)
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.experienceYears}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           experienceYears: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Education
//                     </label>
//                     <Select
//                       options={educationOptions}
//                       isSearchable
//                       placeholder="Select education..."
//                       value={
//                         educationOptions.find(
//                           (opt: any) => opt.value === newPosition.education
//                         ) || null
//                       }
//                       onChange={(selected: any) =>
//                         setNewPosition({
//                           ...newPosition,
//                           education: selected.value,
//                         })
//                       }
//                       styles={{
//                         control: (base) => ({ ...base, minHeight: "40px" }),
//                         menu: (base) => ({ ...base, zIndex: 9999 }),
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Function
//                     </label>
//                     <Select
//                       options={functionOptions}
//                       isSearchable
//                       placeholder="Select function..."
//                       value={
//                         functionOptions.find(
//                           (opt: any) => opt.value === newPosition.function
//                         ) || null
//                       }
//                       onChange={(selected: any) =>
//                         setNewPosition({
//                           ...newPosition,
//                           function: selected.value,
//                         })
//                       }
//                       styles={{
//                         control: (base) => ({ ...base, minHeight: "40px" }),
//                         menu: (base) => ({ ...base, zIndex: 9999 }),
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Role
//                     </label>
//                     <Select
//                       options={roleOptions}
//                       isSearchable
//                       placeholder="Select role..."
//                       value={
//                         roleOptions.find(
//                           (opt: any) => opt.value === newPosition.role
//                         ) || null
//                       }
//                       onChange={(selected: any) =>
//                         setNewPosition({ ...newPosition, role: selected.value })
//                       }
//                       styles={{
//                         control: (base) => ({ ...base, minHeight: "40px" }),
//                         menu: (base) => ({ ...base, zIndex: 9999 }),
//                       }}
//                     />
//                   </div>
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Role description
//                     </label>
//                     <textarea
//                       rows={4}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="Detailed job description..."
//                       value={newPosition.roleDescription}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           roleDescription: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Compensation */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">
//                   💰 Compensation details
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       CTC budget (₹)
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="e.g. 2000000"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 no-spinner"
//                       value={newPosition.ctcBudgetNumeric}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           ctcBudgetNumeric: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       CTC structure
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g. 80% fixed + 15% variable + 5% ESOPs"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.ctcStructure}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           ctcStructure: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Workplace */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">
//                   🏢 Workplace information
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Workplace type
//                     </label>
//                     <select
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.workplaceType}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           workplaceType: e.target.value,
//                         })
//                       }
//                     >
//                       <option value="">Select type</option>
//                       <option value="In office">In office</option>
//                       <option value="Remote">Remote</option>
//                       <option value="Hybrid">Hybrid</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       City
//                     </label>
//                     <Select
//                       options={cityOptions}
//                       isSearchable
//                       placeholder="Select city..."
//                       value={
//                         cityOptions.find(
//                           (opt: any) => opt.value === newPosition.city
//                         ) || null
//                       }
//                       onChange={(selected: any) =>
//                         setNewPosition({ ...newPosition, city: selected.value })
//                       }
//                       styles={{
//                         control: (base) => ({ ...base, minHeight: "40px" }),
//                         menu: (base) => ({ ...base, zIndex: 9999 }),
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Candidate Preferences */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">
//                   👥 Candidate preferences
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Preferred industry (optional)
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g. Technology, SaaS"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.preferredIndustry}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           preferredIndustry: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Preferred companies (optional)
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g. Google, Microsoft, Amazon"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.preferredCompanies}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           preferredCompanies: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Diversity preference (optional)
//                     </label>
//                     <select
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.diversityPreference}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           diversityPreference: e.target.value,
//                         })
//                       }
//                     >
//                       <option value="">No preference</option>
//                       <option value="Gender Diverse">Gender diverse</option>
//                       <option value="Ethnically Diverse">
//                         Ethnically diverse
//                       </option>
//                       <option value="Age Diverse">Age diverse</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Target (number of hires)
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="e.g. 2"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 no-spinner"
//                       value={newPosition.target}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           target: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Interview Process */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">
//                   📝 Interview process
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Number of rounds
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="e.g. 4"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 no-spinner"
//                       value={newPosition.rounds}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           rounds: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Interviewer name
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.interviewerName}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           interviewerName: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Interviewer LinkedIn
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="linkedin.com/in/name"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.interviewerLinkedIn}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           interviewerLinkedIn: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Mode of interview (optional)
//                     </label>
//                     <select
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.interviewMode}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           interviewMode: e.target.value,
//                         })
//                       }
//                     >
//                       <option value="">Select mode</option>
//                       <option value="Video Call">Video call</option>
//                       <option value="In-person">In-person</option>
//                       <option value="Phone Call">Phone call</option>
//                       <option value="In-person + Video">
//                         In-person + video
//                       </option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Deadline to close
//                     </label>
//                     <input
//                       type="date"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.deadline}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           deadline: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* AI Inputs */}
//               <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
//                 <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">🤖 AI inputs</h3>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Keywords
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g. React, Node.js, MongoDB"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.keywords}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           keywords: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       AI prompt
//                     </label>
//                     <textarea
//                       rows={3}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="e.g. Find full-stack developers with strong problem-solving skills"
//                       value={newPosition.prompt}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           prompt: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Preferred industries
//                     </label>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                       {[
//                         "Technology",
//                         "Fintech",
//                         "E-commerce",
//                         "Healthcare",
//                         "Education",
//                         "Manufacturing",
//                         "Consulting",
//                         "Media",
//                         "Real Estate",
//                       ].map((industry) => (
//                         <label
//                           key={industry}
//                           className="flex items-center text-sm text-gray-700"
//                         >
//                           <input
//                             type="checkbox"
//                             className="mr-2 h-4 w-4"
//                             checked={newPosition.aiPreferredIndustries.includes(
//                               industry
//                             )}
//                             onChange={() =>
//                               handleMultiSelectChange(
//                                 "aiPreferredIndustries",
//                                 industry
//                               )
//                             }
//                           />
//                           {industry}
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Preferred functions
//                     </label>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                       {[
//                         "Engineering",
//                         "Product",
//                         "Sales",
//                         "Marketing",
//                         "Operations",
//                         "Finance",
//                         "HR",
//                         "Design",
//                         "Strategy",
//                       ].map((func) => (
//                         <label
//                           key={func}
//                           className="flex items-center text-sm text-gray-700"
//                         >
//                           <input
//                             type="checkbox"
//                             className="mr-2 h-4 w-4"
//                             checked={newPosition.aiPreferredFunctions.includes(
//                               func
//                             )}
//                             onChange={() =>
//                               handleMultiSelectChange(
//                                 "aiPreferredFunctions",
//                                 func
//                               )
//                             }
//                           />
//                           {func}
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Preferred role
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g. Senior Software Engineer"
//                       className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={newPosition.aiPreferredRole}
//                       onChange={(e) =>
//                         setNewPosition({
//                           ...newPosition,
//                           aiPreferredRole: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-3 px-4 sm:px-6 py-3 border-t border-gray-200 shrink-0 bg-white sm:rounded-b-lg">
//               <button
//                 onClick={handleCreatePosition}
//                 className="flex-1 h-11 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-300"
//                 disabled={!newPosition.positionName || !newPosition.clientName}
//               >
//                 Create position
//               </button>
//               <button
//                 onClick={() => setShowCreatePosition(false)}
//                 className="flex-1 h-11 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PositionManagement;





// //brfore position detail page formatting 
// import { useState, useEffect, useRef } from "react";
// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";
// import { Search, Plus, Users, Bot, ArrowLeft, Mail, MapPin } from "lucide-react";
// import { positionService } from "../services/positionService";
// import { clientService } from "../services/clientService";
// import Select from "react-select";
// import {
//   educationOptions,
//   statusOptions,
//   functionOptions,
//   roleOptions,
//   cityOptions,
//   candidateStatusOptions,
// } from "../constants/dropdown";
// import AsyncSelect from "react-select/async";
// import CreatePositionWizard from "../components/positions/CreatePositionWizard";

// /* ------------------------------------------------------------------ */
// /* Shared helpers                                                      */
// /* ------------------------------------------------------------------ */

// const displayValue = (value: any) => {
//   if (Array.isArray(value)) {
//     const cleaned = value.filter(Boolean);
//     return cleaned.length ? cleaned.join(", ") : "N/A";
//   }
//   if (value === null || value === undefined || value === "") return "N/A";
//   return String(value);
// };

// // Consistent card wrapper for every block on the detail page
// const Section = ({ title, action = null, children }) => (
//   <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//     <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-gray-50/60 rounded-t-lg">
//       <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
//         {title}
//       </h3>
//       {action}
//     </div>
//     <div className="px-4 py-4">{children}</div>
//   </div>
// );

// /* ------------------------------------------------------------------ */
// /* Tag Candidate Modal (moved to top level so it does not remount on    */
// /* every keystroke, which was stealing focus from the inputs)          */
// /* ------------------------------------------------------------------ */

// const TagCandidateModal = ({
//   onClose,
//   tagFormData,
//   setTagFormData,
//   selectedPositionId,
//   isSubmitting,
//   setIsSubmitting,
//   onTagged,
// }) => {
//   const searchTimeout = useRef<any>(null);

//   const debouncedLoadOptions = (inputValue: string, callback: any) => {
//     if (searchTimeout.current) clearTimeout(searchTimeout.current);

//     if (!inputValue || inputValue.trim().length < 2) {
//       callback([]);
//       return;
//     }

//     searchTimeout.current = setTimeout(async () => {
//       try {
//         const res = await positionService.fetchAutocomplete(inputValue.trim());
//         const candidates = res?.data || [];
//         callback(
//           candidates.map((candidate: any) => ({
//             value: candidate.id,
//             label: `${candidate.name} (${candidate.email})`,
//             email: candidate.email,
//             name: candidate.name,
//           }))
//         );
//       } catch (err) {
//         console.error("Autocomplete fetch error:", err);
//         callback([]);
//       }
//     }, 300);
//   };

//   const handleCandidateSelect = (selectedOption: any) => {
//     setTagFormData((prev: any) => ({
//       ...prev,
//       applicant: selectedOption ? selectedOption.label : "",
//       candidateId: selectedOption ? selectedOption.value : null,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!tagFormData.candidateId) {
//       alert("Select a candidate before submitting.");
//       return;
//     }
//     if (!tagFormData.recruiter) {
//       alert("Recruiter email is required.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const response = await positionService.tagCandidateToPosition(
//         String(selectedPositionId),
//         {
//           candidateId: tagFormData.candidateId,
//           recruiterEmail: tagFormData.recruiter,
//           immediateJoiner: tagFormData.immediateJoiner,
//           status: tagFormData.status,
//         }
//       );

//       if (response.status === 201) {
//         alert("Candidate tagged to the position.");
//         onTagged();
//       } else {
//         alert("Tagging failed: " + (response.message || "Unknown error"));
//       }
//     } catch (error) {
//       console.error("Error tagging candidate:", error);
//       alert("Could not tag the candidate. Try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 sm:p-4">
//       <div className="bg-white w-full sm:max-w-md h-[92vh] sm:h-auto sm:max-h-[90vh] rounded-t-2xl sm:rounded-lg shadow-xl flex flex-col">
//         <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200 shrink-0">
//           <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//             Tag candidate
//           </h2>
//           <button
//             type="button"
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="flex-1 flex flex-col min-h-0"
//         >
//           <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Position name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               required
//               readOnly
//               value={tagFormData.positionName}
//               className="w-full h-10 px-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Applicant <span className="text-red-500">*</span>
//             </label>
//             <AsyncSelect
//               cacheOptions
//               defaultOptions={false}
//               loadOptions={debouncedLoadOptions}
//               isSearchable
//               isClearable
//               placeholder="Search by name or email..."
//               noOptionsMessage={({ inputValue }) =>
//                 !inputValue || inputValue.length < 2
//                   ? "Type at least 2 characters"
//                   : "No candidates found"
//               }
//               loadingMessage={() => "Searching..."}
//               onChange={handleCandidateSelect}
//               value={
//                 tagFormData.candidateId
//                   ? {
//                       value: tagFormData.candidateId,
//                       label: tagFormData.applicant,
//                     }
//                   : null
//               }
//               styles={{
//                 control: (base) => ({
//                   ...base,
//                   minHeight: "40px",
//                   borderColor: "#d1d5db",
//                   "&:hover": { borderColor: "#3b82f6" },
//                 }),
//                 menu: (base) => ({ ...base, zIndex: 9999 }),
//               }}
//               components={{
//                 DropdownIndicator: () => null,
//                 IndicatorSeparator: () => null,
//               }}
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               Type at least 2 characters to search.
//             </p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Recruiter <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               required
//               value={tagFormData.recruiter}
//               onChange={(e) =>
//                 setTagFormData((prev: any) => ({
//                   ...prev,
//                   recruiter: e.target.value,
//                 }))
//               }
//               className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Recruiter email"
//             />
//           </div>

//           <div className="flex items-start">
//             <input
//               type="checkbox"
//               id="immediateJoiner"
//               checked={tagFormData.immediateJoiner}
//               onChange={(e) =>
//                 setTagFormData((prev: any) => ({
//                   ...prev,
//                   immediateJoiner: e.target.checked,
//                 }))
//               }
//               className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//             />
//             <div>
//               <label
//                 htmlFor="immediateJoiner"
//                 className="text-sm font-medium text-gray-700"
//               >
//                 Immediate joiner
//               </label>
//               <p className="text-xs text-gray-500">
//                 Tick this if the candidate can join within 15 days.
//               </p>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Status <span className="text-red-500">*</span>
//             </label>
//             <Select
//               options={candidateStatusOptions}
//               isSearchable
//               placeholder="Select status..."
//               value={
//                 candidateStatusOptions.find(
//                   (opt: any) => opt.value === tagFormData.status
//                 ) || null
//               }
//               onChange={(selected: any) =>
//                 setTagFormData((prev: any) => ({
//                   ...prev,
//                   status: selected?.value,
//                 }))
//               }
//               styles={{
//                 control: (base) => ({ ...base, minHeight: "40px" }),
//                 menu: (base) => ({ ...base, zIndex: 9999 }),
//               }}
//             />
//           </div>

//           </div>

//           <div className="flex gap-3 px-4 sm:px-6 py-3 border-t border-gray-200 shrink-0 bg-white sm:rounded-b-lg">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 sm:flex-none sm:ml-auto px-4 h-11 sm:h-10 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="flex-1 sm:flex-none px-4 h-11 sm:h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
//             >
//               {isSubmitting ? "Tagging..." : "Tag candidate"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// /* ------------------------------------------------------------------ */
// /* Position detail                                                     */
// /* ------------------------------------------------------------------ */

// const PositionDetail = ({
//   position,
//   candidates = [],
//   recruiter,
//   onBack,
//   setCandidates,
//   runAIResumeMatcherForPosition,
//   fetchPositionDetail,
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedPosition, setEditedPosition] = useState<any>({ ...position });
//   const [directAppStatusFilter, setDirectAppStatusFilter] = useState("all");

//   useEffect(() => {
//     setEditedPosition({ ...position });
//   }, [position]);

//   const handleInputChange = (field: string, value: any) =>
//     setEditedPosition((prev: any) => ({ ...prev, [field]: value }));

//   const handleCancel = () => {
//     setEditedPosition({ ...position });
//     setIsEditing(false);
//   };

//   const handleSave = async () => {
//     try {
//       const positionId = position?.id || editedPosition?.id;
//       if (!positionId) {
//         alert("Position ID is missing. Refresh the page and try again.");
//         return;
//       }

//       const updateData = {
//         id: String(positionId),
//         title: editedPosition.positionName,
//         clientSpoc: editedPosition.clientSpoc || null,
//         location: editedPosition.location || editedPosition.city,
//         status: editedPosition.status,
//         ctcBudget: editedPosition.ctcBudget
//           ? Number(String(editedPosition.ctcBudget).replace(/[^0-9]/g, "")) *
//             100000
//           : null,
//         experience: editedPosition.experience
//           ? parseInt(String(editedPosition.experience).replace(/\D/g, "")) || 0
//           : 0,
//         education: editedPosition.education || "",
//         workplaceType: editedPosition.workplaceType || "",
//         reportees: parseInt(editedPosition.reportees) || 0,
//         deadline: editedPosition.deadline || null,
//         interviewRounds: parseInt(editedPosition.rounds) || 0,
//         interviewer: editedPosition.interviewerName || null,
//         jobType: editedPosition.jobType || "",
//         roleDescription: editedPosition.roleDescription || null,
//         preferredIndustry: Array.isArray(editedPosition.preferredIndustry)
//           ? editedPosition.preferredIndustry
//           : editedPosition.preferredIndustry
//           ? String(editedPosition.preferredIndustry)
//               .split(",")
//               .map((i) => i.trim())
//               .filter(Boolean)
//           : [],
//         preferredCompanies: Array.isArray(editedPosition.preferredCompanies)
//           ? editedPosition.preferredCompanies
//           : editedPosition.preferredCompanies
//           ? String(editedPosition.preferredCompanies)
//               .split(",")
//               .map((c) => c.trim())
//               .filter(Boolean)
//           : [],
//         roleType: editedPosition.roleType || "",
//         diversityPreference: editedPosition.diversityPreference || "",
//         interviewMode: editedPosition.interviewMode || null,
//         linkedin: editedPosition.linkedIn || null,
//         lakshSpoc: Array.isArray(editedPosition.lakshSpoc)
//           ? editedPosition.lakshSpoc.filter(Boolean)
//           : editedPosition.lakshSpoc
//           ? [editedPosition.lakshSpoc]
//           : [],
//         priority: editedPosition.priority || "",
//         ctcStructure: editedPosition.ctcStructure || null,
//         function: editedPosition.function || null,
//         role: editedPosition.role || null,
//         city: editedPosition.city || editedPosition.location || "",
//         target: editedPosition.target ? Number(editedPosition.target) : null,
//       };

//       const response = await positionService.updatePosition(
//         String(positionId),
//         updateData
//       );

//       if (response.status === 200) {
//         alert("Position updated.");
//         setIsEditing(false);
//         await fetchPositionDetail(positionId);
//       } else {
//         alert("Update failed: " + (response.message || "Unknown error"));
//       }
//     } catch (error: any) {
//       console.error("Error updating position:", error);
//       alert("Could not update the position: " + (error.message || "Try again."));
//     }
//   };

//   /* -------------------- field renderer -------------------- */
//   // Every field renders as label-above-value inside a fixed-height row,
//   // so columns line up whether the page is in read or edit mode.
//   const renderField = (
//     label: string,
//     field: string,
//     type = "text",
//     options: any = null,
//     fullWidth = false
//   ) => {
//     const isReactSelect = options && options.isReactSelect;
//     const selectOptions = options?.options || [];

//     const inputClass =
//       "w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

//     let control;
//     if (!isEditing) {
//       const shown = displayValue(position[field]);
//       control = (
//         <p
//           className={`text-sm ${
//             shown === "N/A" ? "text-gray-400" : "text-gray-900"
//           } ${type === "textarea" ? "leading-relaxed" : "truncate"}`}
//           title={shown}
//         >
//           {shown}
//         </p>
//       );
//     } else if (isReactSelect) {
//       control = (
//         <Select
//           options={selectOptions}
//           isSearchable
//           placeholder={`Select ${label.toLowerCase()}...`}
//           value={
//             selectOptions.find(
//               (opt: any) => opt.value === editedPosition[field]
//             ) || null
//           }
//           onChange={(selected: any) =>
//             handleInputChange(field, selected?.value || "")
//           }
//           styles={{
//             control: (base) => ({ ...base, minHeight: "40px" }),
//             menu: (base) => ({ ...base, zIndex: 9999 }),
//           }}
//           className="text-sm"
//         />
//       );
//     } else if (type === "textarea") {
//       control = (
//         <textarea
//           rows={4}
//           value={editedPosition[field] || ""}
//           onChange={(e) => handleInputChange(field, e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       );
//     } else if (type === "select") {
//       control = (
//         <select
//           value={editedPosition[field] || ""}
//           onChange={(e) => handleInputChange(field, e.target.value)}
//           className={inputClass}
//         >
//           <option value="">Select {label.toLowerCase()}</option>
//           {selectOptions.map((opt: string) => (
//             <option key={opt} value={opt}>
//               {opt}
//             </option>
//           ))}
//         </select>
//       );
//     } else {
//       control = (
//         <input
//           type={type}
//           value={editedPosition[field] || ""}
//           onChange={(e) => handleInputChange(field, e.target.value)}
//           className={inputClass}
//         />
//       );
//     }

//     return (
//       <div
//         className={fullWidth ? "col-span-full" : ""}
//         key={field}
//       >
//         <label className="block text-[11px] font-medium uppercase tracking-wide text-gray-400 mb-0.5">
//           {label}
//         </label>
//         <div
//           className={
//             isEditing || type === "textarea"
//               ? ""
//               : "min-h-[20px] flex items-center"
//           }
//         >
//           {control}
//         </div>
//       </div>
//     );
//   };

//   const grid =
//     "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-4";

//   /* -------------------- candidates -------------------- */
//   const submittedCandidates = position.submittedCandidates || [];

//   const allDirectApplications = candidates.filter(
//     (c: any) => c.positionId === position.id && c.source === "direct"
//   );
//   const directApplications =
//     directAppStatusFilter === "all"
//       ? allDirectApplications
//       : allDirectApplications.filter(
//           (c: any) => c.status === directAppStatusFilter
//         );

//   const getStatusBadge = (status: string) => {
//     const statusStyles: Record<string, string> = {
//       internal_screening: "bg-yellow-100 text-yellow-800",
//       internal_reject: "bg-red-100 text-red-800",
//       submitted: "bg-blue-100 text-blue-800",
//       interview_scheduled: "bg-purple-100 text-purple-800",
//       selected: "bg-green-100 text-green-800",
//     };
//     const statusLabels: Record<string, string> = {
//       internal_screening: "Internal screening",
//       internal_reject: "Internal reject",
//       submitted: "Submitted",
//       interview_scheduled: "Interview scheduled",
//       selected: "Selected",
//     };
//     return (
//       <span
//         className={`px-2 py-1 rounded text-xs font-medium ${
//           statusStyles[status] || "bg-gray-100 text-gray-800"
//         }`}
//       >
//         {statusLabels[status] || status}
//       </span>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-4">
//         {/* Page header: title, meta and edit controls on one line */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3">
//           <div className="flex flex-wrap items-center gap-3">
//             <button
//               onClick={onBack}
//               className="p-2 -ml-2 rounded-md hover:bg-gray-100"
//               aria-label="Back to positions"
//             >
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//             <div className="min-w-0 flex-1">
//               <h2 className="text-lg md:text-xl font-bold text-gray-900 break-words">
//                 {position.positionName}
//                 <span className="font-normal text-gray-400 mx-2">—</span>
//                 <span className="font-semibold text-gray-700">
//                   {displayValue(position.clientName)}
//                 </span>
//               </h2>
//             </div>
//             <div className="flex gap-2 w-full sm:w-auto">
//               {!isEditing ? (
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="h-10 px-4 w-full sm:w-auto border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                   Edit details
//                 </button>
//               ) : (
//                 <>
//                   <button
//                     onClick={handleCancel}
//                     className="h-10 px-4 flex-1 sm:flex-none border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSave}
//                     className="h-10 px-4 flex-1 sm:flex-none bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
//                   >
//                     Save changes
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         <Section title="Basic details">
//           <div className={grid}>
//             {renderField("Position name", "positionName")}
//             {renderField("Client name", "clientName")}
//             {renderField("Status", "status", "select", {
//               options: [
//                 "Open",
//                 "On Hold",
//                 "Close by LHR",
//                 "Lost",
//                 "Candidate identified",
//               ],
//             })}
//             {renderField("Priority", "priority", "select", {
//               options: ["High", "Medium", "Low"],
//             })}
//             {renderField("Role type", "roleType", "select", {
//               options: ["New", "Replacement"],
//             })}
//             {renderField("Job type", "jobType", "select", {
//               options: ["Full-time", "Part-time", "Contract", "Internship"],
//             })}
//             {renderField("Recruiter", "recruiter")}
//             {renderField("Client SPOC", "clientSpoc")}
//             {renderField("Laksh SPOC", "lakshSpoc")}
//           </div>
//         </Section>

//         <Section title="Role requirements">
//           <div className={grid}>
//             {renderField("Function", "function", "text", {
//               isReactSelect: true,
//               options: functionOptions,
//             })}
//             {renderField("Role", "role", "text", {
//               isReactSelect: true,
//               options: roleOptions,
//             })}
//             {renderField("Education", "education", "text", {
//               isReactSelect: true,
//               options: educationOptions,
//             })}
//             {renderField("Experience", "experience")}
//             {renderField("Reportees", "reportees", "number")}
//             {renderField("Target hires", "target", "number")}
//             {renderField("Role description", "roleDescription", "textarea", null, true)}
//           </div>
//         </Section>

//         <Section title="Compensation and workplace">
//           <div className={grid}>
//             {renderField("CTC budget", "ctcBudget")}
//             {renderField("CTC structure", "ctcStructure")}
//             {renderField("Workplace type", "workplaceType", "select", {
//               options: ["In office", "Remote", "Hybrid"],
//             })}
//             {renderField("City", "city", "text", {
//               isReactSelect: true,
//               options: cityOptions,
//             })}
//             {renderField("Deadline to close", "deadline", "date")}
//           </div>
//         </Section>

//         <Section title="Candidate preferences">
//           <div className={grid}>
//             {renderField("Preferred industry", "preferredIndustry")}
//             {renderField("Preferred companies", "preferredCompanies")}
//             {renderField("Diversity preference", "diversityPreference", "select", {
//               options: [
//                 "No Preference",
//                 "Gender Diverse",
//                 "Ethnically Diverse",
//                 "Age Diverse",
//               ],
//             })}
//           </div>
//         </Section>

//         <Section title="Interview process">
//           <div className={grid}>
//             {renderField("Number of rounds", "rounds", "number")}
//             {renderField("Interviewer", "interviewerName")}
//             {renderField("Mode of interview", "interviewMode", "select", {
//               options: [
//                 "Video Call",
//                 "In-person",
//                 "Phone Call",
//                 "In-person + Video",
//               ],
//             })}
//             <div>
//               <label className="block text-[11px] font-medium uppercase tracking-wide text-gray-400 mb-0.5">
//                 Interviewer LinkedIn
//               </label>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   value={editedPosition.linkedIn || ""}
//                   onChange={(e) => handleInputChange("linkedIn", e.target.value)}
//                   className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               ) : position.linkedIn ? (
//                 <div className="min-h-[20px] flex items-center">
//                   <a
//                     href={`https://${String(position.linkedIn).replace(
//                       /^https?:\/\//,
//                       ""
//                     )}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-sm text-blue-600 hover:underline"
//                   >
//                     View profile
//                   </a>
//                 </div>
//               ) : (
//                 <div className="min-h-[20px] flex items-center">
//                   <p className="text-sm text-gray-900">N/A</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </Section>

//         {/* Candidates */}
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
//           <Section
//             title={`Submitted candidates (${submittedCandidates.length})`}
//             action={<Users className="w-5 h-5 text-gray-400" />}
//           >
//             <div className="space-y-3">
//               {submittedCandidates.map((candidate: any) => (
//                 <div
//                   key={candidate.id}
//                   className="border border-gray-200 rounded-lg p-4"
//                 >
//                   <h4 className="font-medium text-gray-900">{candidate.name}</h4>
//                   <p className="text-sm text-gray-600">{candidate.email}</p>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-3 text-sm text-gray-600">
//                     <div>Current CTC: ₹{candidate.current_ctc} LPA</div>
//                     <div>Expected CTC: ₹{candidate.expected_ctc} LPA</div>
//                     <div>Notice period: {candidate.noticeperiod} days</div>
//                     <div className="truncate">
//                       Recruiter: {candidate.recruiter}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {submittedCandidates.length === 0 && (
//                 <p className="text-gray-500 text-center py-6 text-sm">
//                   No candidates submitted yet. Tag one from the positions list.
//                 </p>
//               )}
//             </div>
//           </Section>

//           <Section
//             title={`Direct applications (${directApplications.length})`}
//             action={<Mail className="w-5 h-5 text-gray-400" />}
//           >
//             <div className="flex flex-wrap items-center gap-3 mb-4">
//               <select
//                 className="h-10 px-3 flex-1 sm:flex-none border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={directAppStatusFilter}
//                 onChange={(e) => setDirectAppStatusFilter(e.target.value)}
//               >
//                 <option value="all">All statuses</option>
//                 <option value="internal_screening">Internal screening</option>
//                 <option value="internal_reject">Internal reject</option>
//                 <option value="interview_scheduled">Interview scheduled</option>
//                 <option value="selected">Selected</option>
//               </select>
//               <button
//                 onClick={() => runAIResumeMatcherForPosition(position.id)}
//                 className="h-10 px-4 flex-1 sm:flex-none justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
//               >
//                 <Bot className="w-4 h-4" />
//                 Run AI resume matcher
//               </button>
//             </div>

//             <div className="space-y-3">
//               {directApplications.map((candidate: any) => (
//                 <div
//                   key={candidate.id}
//                   className="border border-gray-200 rounded-lg p-4"
//                 >
//                   <div className="flex flex-wrap items-center gap-2 mb-1">
//                     <h4 className="font-medium text-gray-900">
//                       {candidate.name}
//                     </h4>
//                     {getStatusBadge(candidate.status)}
//                     {candidate.aiScore ? (
//                       <span
//                         className={`px-2 py-1 rounded text-xs font-medium ${
//                           candidate.aiScore >= 85
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         AI score: {candidate.aiScore}
//                       </span>
//                     ) : null}
//                   </div>
//                   <p className="text-sm text-gray-600">{candidate.email}</p>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-3 text-sm text-gray-600">
//                     <div>
//                       Current CTC: ₹
//                       {(candidate.currentCTC / 100000).toFixed(1)} LPA
//                     </div>
//                     <div>
//                       Expected CTC: ₹
//                       {(candidate.expectedCTC / 100000).toFixed(1)} LPA
//                     </div>
//                     <div>Notice period: {candidate.noticePeriod} days</div>
//                     <div className="truncate">Source: {candidate.recruiter}</div>
//                   </div>
//                   {candidate.status === "internal_screening" &&
//                     candidate.aiScore >= 85 && (
//                       <button
//                         onClick={() => {
//                           setCandidates((prev: any[]) =>
//                             prev.map((c) =>
//                               c.id === candidate.id
//                                 ? {
//                                     ...c,
//                                     status: "submitted",
//                                     source: "recruiter",
//                                     recruiter,
//                                   }
//                                 : c
//                             )
//                           );
//                           alert("Candidate tagged to the position.");
//                         }}
//                         className="mt-3 h-9 px-3 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
//                       >
//                         Tag to position
//                       </button>
//                     )}
//                 </div>
//               ))}
//               {directApplications.length === 0 && (
//                 <p className="text-gray-500 text-center py-6 text-sm">
//                   {directAppStatusFilter === "all"
//                     ? "No direct applications yet."
//                     : "No candidates in this status."}
//                 </p>
//               )}
//             </div>
//           </Section>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ------------------------------------------------------------------ */
// /* Positions table                                                     */
// /* ------------------------------------------------------------------ */

// const PositionTable = ({ positions, onOpen, onTag, onAIMatcher }) => (
//   <>
//     {/* Mobile: stacked cards */}
//     <div className="md:hidden space-y-3">
//       {positions.map((position: any) => (
//         <div
//           key={position.id}
//           onClick={() => onOpen(position)}
//           className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 active:bg-gray-50"
//         >
//           <div className="flex items-start justify-between gap-3">
//             <p className="text-sm font-medium text-gray-900 leading-5 break-words">
//               {position.positionName}
//             </p>
//             <span
//               className={`shrink-0 inline-flex px-2 py-0.5 text-xs font-medium leading-4 rounded-full ${
//                 position.priority === "High"
//                   ? "bg-red-100 text-red-800"
//                   : position.priority === "Medium"
//                   ? "bg-yellow-100 text-yellow-800"
//                   : "bg-green-100 text-green-800"
//               }`}
//             >
//               {position.priority}
//             </span>
//           </div>

//           <p className="text-sm text-gray-700 mt-1 break-words">
//             {position.clientName}
//           </p>

//           <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
//             <span>{position.ctcBudget}</span>
//             <span className="flex items-center min-w-0">
//               <MapPin className="w-3 h-3 mr-1 shrink-0" />
//               <span className="truncate">{position.location}</span>
//             </span>
//             <span>
//               {position.experience} • {position.workplaceType}
//             </span>
//           </div>

//           <div className="flex gap-2 mt-3">
//             <button
//               className="flex-1 h-9 bg-green-100 text-green-800 text-xs font-medium rounded hover:bg-green-200"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onTag(position);
//               }}
//             >
//               Tag candidate
//             </button>
//             <button
//               className="flex-1 h-9 border border-purple-200 text-xs font-medium text-purple-600 rounded hover:bg-purple-50"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onAIMatcher();
//               }}
//             >
//               AI matcher
//             </button>
//           </div>
//         </div>
//       ))}

//       {positions.length === 0 && (
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-sm text-gray-500">
//           No positions match this search.
//         </div>
//       )}
//     </div>

//     {/* Desktop: table */}
//     <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//     <div className="w-full">
//       <table className="w-full table-fixed divide-y divide-gray-200">
//         <colgroup>
//           <col className="w-[30%]" />
//           <col className="w-[24%]" />
//           <col className="w-[20%]" />
//           <col className="w-[26%]" />
//         </colgroup>
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Position
//             </th>
//             <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Client and priority
//             </th>
//             <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               CTC and location
//             </th>
//             <th className="px-4 py-2.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {positions.map((position: any) => {
//             return (
//               <tr
//                 key={position.id}
//                 className="hover:bg-gray-50 cursor-pointer align-top"
//                 onClick={() => onOpen(position)}
//               >
//                 <td className="px-4 py-3 align-top">
//                   <div className="flex flex-col min-w-0">
//                     <span className="text-sm font-medium text-gray-900 leading-5 break-words">
//                       {position.positionName}
//                     </span>
//                     <span className="text-xs text-gray-500 leading-5 mt-0.5 truncate">
//                       {position.experience} • {position.workplaceType}
//                     </span>
//                   </div>
//                 </td>

//                 <td className="px-4 py-3 align-top">
//                   <div className="flex flex-col min-w-0">
//                   <span className="text-sm text-gray-900 leading-5 break-words">
//                     {position.clientName}
//                   </span>
//                   <span
//                     className={`inline-flex self-start mt-1 px-2 py-0.5 text-xs font-medium leading-4 rounded-full ${
//                       position.priority === "High"
//                         ? "bg-red-100 text-red-800"
//                         : position.priority === "Medium"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-green-100 text-green-800"
//                     }`}
//                   >
//                     {position.priority}
//                   </span>
//                   </div>
//                 </td>

//                 <td className="px-4 py-3 align-top">
//                   <div className="flex flex-col min-w-0">
//                     <span className="text-sm text-gray-900 leading-5 truncate">
//                       {position.ctcBudget}
//                     </span>
//                     <span className="text-xs text-gray-500 leading-5 mt-0.5 flex items-center min-w-0">
//                       <MapPin className="w-3 h-3 mr-1 shrink-0" />
//                       <span className="truncate">{position.location}</span>
//                     </span>
//                   </div>
//                 </td>

//                 <td className="px-4 py-3 align-top">
//                   <div className="flex justify-end items-start gap-2">
//                     <button
//                       className="h-7 px-2.5 bg-green-100 text-green-800 text-xs font-medium rounded hover:bg-green-200 whitespace-nowrap"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         onTag(position);
//                       }}
//                     >
//                       Tag candidate
//                     </button>
//                     <button
//                       className="h-7 px-2.5 text-xs font-medium text-purple-600 rounded hover:bg-purple-50 whitespace-nowrap"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         onAIMatcher();
//                       }}
//                     >
//                       AI matcher
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}

//           {positions.length === 0 && (
//             <tr>
//               <td
//                 colSpan={4}
//                 className="px-4 py-10 text-center text-sm text-gray-500"
//               >
//                 No positions match this search. Clear the filters or create a
//                 position.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//     </div>
//   </>
// );

// /* ------------------------------------------------------------------ */
// /* Main                                                                */
// /* ------------------------------------------------------------------ */

// const PositionManagement = () => {
//   const [currentView, setCurrentView] = useState("positions");
//   const [selectedPosition, setSelectedPosition] = useState<any>(null);
//   const [tagPositionId, setTagPositionId] = useState<any>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterBy, setFilterBy] = useState("all");
//   const [groupBy, setGroupBy] = useState("none");
//   const [showTagForm, setShowTagForm] = useState(false);
//   const [showAddCandidate, setShowAddCandidate] = useState<any>(false);
//   const [showCandidateForm, setShowCandidateForm] = useState(false);
//   const [showCreatePosition, setShowCreatePosition] = useState(false);
//   const [candidateEmail, setCandidateEmail] = useState("");
//   const [loadingPositionDetail, setLoadingPositionDetail] = useState(false);
//   const [clientOptions, setClientOptions] = useState<any[]>([]);
//   const [isSubmittingTag, setIsSubmittingTag] = useState(false);
//   const [positions, setPositions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const recruiter = localStorage.getItem("email") || "";

//   const [tagFormData, setTagFormData] = useState<any>({
//     positionName: "",
//     applicant: "",
//     candidateId: null,
//     recruiter: "",
//     immediateJoiner: false,
//     status: "",
//   });

//   const [candidates, setCandidates] = useState<any[]>([
//     {
//       id: 1,
//       email: "john.smith@email.com",
//       name: "John Smith",
//       currentCTC: 1500000,
//       expectedCTC: 2000000,
//       noticePeriod: 30,
//       status: "submitted",
//       positionId: 1,
//       recruiter: recruiter,
//       source: "recruiter",
//     },
//     {
//       id: 2,
//       email: "jane.doe@email.com",
//       name: "Jane Doe",
//       currentCTC: 1200000,
//       expectedCTC: 1800000,
//       noticePeriod: 60,
//       status: "internal_screening",
//       positionId: 1,
//       recruiter: "AI Matcher",
//       source: "direct",
//       aiScore: null,
//     },
//     {
//       id: 3,
//       email: "alex.kumar@email.com",
//       name: "Alex Kumar",
//       currentCTC: 1800000,
//       expectedCTC: 2500000,
//       noticePeriod: 45,
//       status: "internal_screening",
//       positionId: 1,
//       recruiter: "Direct Application",
//       source: "direct",
//       aiScore: null,
//     },
//     {
//       id: 4,
//       email: "priya.sharma@email.com",
//       name: "Priya Sharma",
//       currentCTC: 1600000,
//       expectedCTC: 2200000,
//       noticePeriod: 30,
//       status: "internal_screening",
//       positionId: 1,
//       recruiter: "Direct Application",
//       source: "direct",
//       aiScore: null,
//     },
//     {
//       id: 5,
//       email: "rajesh.patel@email.com",
//       name: "Rajesh Patel",
//       currentCTC: 1400000,
//       expectedCTC: 2000000,
//       noticePeriod: 60,
//       status: "internal_reject",
//       positionId: 1,
//       recruiter: "Direct Application",
//       source: "direct",
//       aiScore: 12,
//     },
//   ]);

//   const [newCandidate, setNewCandidate] = useState<any>({
//     email: "",
//     resume: null,
//     currentCTC: "",
//     specialComments: "",
//     education: "",
//     gender: "",
//     openToRelocation: false,
//     engagementType: "",
//     expectedCTC: "",
//     noticePeriod: "",
//     recruiter: recruiter,
//   });

//   /* -------------------- data -------------------- */

//   const transformPosition = (position: any) => {
//     const [submitted, targeted] = String(position.progress || "0/0")
//       .split("/")
//       .map(Number);

//     return {
//       id: position.id,
//       positionName: position.title,
//       clientName: position.client,
//       submittedResumes: submitted || 0,
//       targetedResumes: targeted || 0,
//       ctcBudget: Number.isFinite(Number(position.ctc)) && Number(position.ctc) > 0
//         ? `${(Number(position.ctc) / 100000).toFixed(0)} LPA`
//         : "N/A",
//       location: position.location || "N/A",
//       priority: position.priority || "Medium",
//       experience: position.experience ? `${position.experience} years` : "N/A",
//       workplaceType: position.mode || "N/A",
//       status: position.status || "Active",
//       ctcBudgetNumeric: position.ctc || 0,
//       city: position.location || "N/A",
//       experienceYears: position.experience || "N/A",
//       daysSinceNoAction: position.daysSinceNoAction || 0,
//       education: position.education || "N/A",
//       roleDescription: position.roleDescription || "",
//       preferredIndustry: position.preferredIndustry || "",
//       preferredCompanies: position.preferredCompanies || "",
//       reportees: position.reportees || 0,
//       deadline: position.deadline || "",
//       rounds: position.rounds || 0,
//       interviewerName: position.interviewerName || "",
//       interviewerLinkedIn: position.interviewerLinkedIn || "",
//       ctcStructure: position.ctcStructure || "",
//       roleType: position.roleType || "",
//       diversityPreference: position.diversityPreference || "",
//       interviewMode: position.interviewMode || "",
//       jobType: position.jobType || "",
//       clientSPOC: position.clientSPOC || "",
//       lakshSPOC: position.lakshSPOC || "",
//       recruiter: position.recruiter || "",
//       function: position.function || "",
//       role: position.role || "",
//       target: targeted || 0,
//       createdDate: position.createdDate || new Date().toISOString(),
//       lastActivityDate: position.lastActivityDate || new Date().toISOString(),
//     };
//   };

//   const loadPositions = async () => {
//     try {
//       const res = await positionService.fetchAll(1, 2000);
//       if (res.status === 200) {
//         setPositions(res.data.positions.map(transformPosition));
//       } else {
//         console.error("Failed to fetch positions:", res.message);
//       }
//     } catch (err) {
//       console.error("Error fetching positions:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPositionDetail = async (positionId: any) => {
//     setLoadingPositionDetail(true);
//     try {
//       const res = await positionService.fetchById(positionId);
//       if (res.status === 200) {
//         const position = res.data;
//         setSelectedPosition({
//           id: String(position.id),
//           positionName: position.title || "N/A",
//           clientName: position.clientName || "N/A",
//           submittedResumes: position.submittedCandidates?.length || 0,
//           targetedResumes: position.targetedResumes || 0,
//           ctcBudget: position.ctcBudget
//             ? `${(Number(position.ctcBudget) / 100000).toFixed(0)} LPA`
//             : "N/A",
//           ctcStructure: position.ctcStructure || "",
//           city: position.location || "",
//           location: position.location || "",
//           experience: position.experience ? `${position.experience} years` : "",
//           priority: position.priority || "",
//           function: position.function || "",
//           role: position.role || "",
//           workplaceType: position.workplaceType || "",
//           status: position.status || "Open",
//           education: position.education || "",
//           roleDescription: position.roleDescription || "",
//           preferredIndustry: position.preferredIndustry || [],
//           preferredCompanies: position.preferredCompanies || [],
//           reportees: position.reportees || 0,
//           target: position.target || 0,
//           deadline: position.deadline || "",
//           rounds: position.interviewRounds || 0,
//           interviewerName: position.interviewer || "",
//           diversityPreference: position.diversityPreference || "",
//           interviewMode: position.interviewMode || "",
//           jobType: position.jobType || "",
//           roleType: position.roleType || "",
//           clientSpoc: position.clientSpoc || "",
//           lakshSpoc: position.lakshSpoc?.filter(Boolean) || [],
//           recruiter: position.recruiter || "",
//           linkedIn: position.linkedin || null,
//           submittedCandidates: position.submittedCandidates || [],
//           message: position.message || "",
//         });
//       }
//     } catch (err) {
//       console.error("Error fetching position detail:", err);
//     } finally {
//       setLoadingPositionDetail(false);
//     }
//   };

//   useEffect(() => {
//     const fetchClients = async () => {
//       const res = await clientService.fetchAll();
//       const clients = res?.data || [];
//       setClientOptions(
//         clients.map((c: any) => ({
//           id: c.id,
//           label: c.client_name,
//           value: c.id,
//           clientHRSpocs: c.clientHRSpocs || [],
//         }))
//       );
//     };
//     fetchClients();
//   }, []);

//   useEffect(() => {
//     loadPositions();
//   }, []);

//   /* -------------------- derived -------------------- */

//   const filteredPositions = positions.filter((position) => {
//     const term = searchTerm.toLowerCase();
//     const matchesSearch =
//       (position.positionName || "").toLowerCase().includes(term) ||
//       (position.clientName || "").toLowerCase().includes(term) ||
//       (position.location || "").toLowerCase().includes(term) ||
//       (position.priority || "").toLowerCase().includes(term) ||
//       (position.experience || "").toLowerCase().includes(term);

//     if (filterBy === "all") return matchesSearch;
//     return matchesSearch && position.priority === filterBy;
//   });

//   const groupedPositions =
//     groupBy === "clientName"
//       ? filteredPositions.reduce((acc: any, position: any) => {
//           const client = position.clientName || "Unassigned";
//           if (!acc[client]) acc[client] = [];
//           acc[client].push(position);
//           return acc;
//         }, {})
//       : { "All Positions": filteredPositions };

//   /* -------------------- handlers -------------------- */

//   const handleEmailCheck = () => {
//     const existingCandidate = candidates.find((c) => c.email === candidateEmail);
//     if (existingCandidate) {
//       setCandidates((prev) =>
//         prev.map((c) =>
//           c.email === candidateEmail ? { ...c, positionId: showAddCandidate } : c
//         )
//       );
//       setShowAddCandidate(false);
//       setCandidateEmail("");
//       alert("Candidate tagged to the position.");
//     } else {
//       setShowCandidateForm(true);
//       setNewCandidate({ ...newCandidate, email: candidateEmail });
//     }
//   };

//   const handleCreateCandidate = () => {
//     const candidate = {
//       id: candidates.length + 1,
//       ...newCandidate,
//       status: "submitted",
//       positionId: showAddCandidate,
//       source: "recruiter",
//       name: newCandidate.email.split("@")[0].replace(".", " "),
//     };
//     setCandidates([...candidates, candidate]);
//     setShowCandidateForm(false);
//     setShowAddCandidate(false);
//     setNewCandidate({
//       email: "",
//       resume: null,
//       currentCTC: "",
//       specialComments: "",
//       education: "",
//       gender: "",
//       openToRelocation: false,
//       engagementType: "",
//       expectedCTC: "",
//       noticePeriod: "",
//       recruiter: recruiter,
//     });
//     alert("Candidate created and tagged.");
//   };

//   const handleCreatePosition = async (payload: any) => {
//     try {
//       const response = await positionService.createPosition(payload);

//       if (response.status === 201 || response.status === 200) {
//         alert("Position created.");
//         await loadPositions();
//         return true;
//       }

//       alert(
//         "Could not create the position: " + (response.message || "Unknown error")
//       );
//       return false;
//     } catch (error) {
//       console.error("Error creating position:", error);
//       alert("Could not create the position. Try again.");
//       return false;
//     }
//   };

//   const runAIResumeMatcherForPosition = (positionId: any) => {
//     const eligibleCandidates = candidates.filter(
//       (c) =>
//         c.positionId === positionId &&
//         c.source === "direct" &&
//         c.status === "internal_screening"
//     );

//     if (eligibleCandidates.length === 0) {
//       alert("No candidates in internal screening for this position.");
//       return;
//     }

//     alert(`Scoring ${eligibleCandidates.length} candidates...`);

//     setTimeout(() => {
//       const scored = candidates.map((c) => {
//         if (!eligibleCandidates.find((e) => e.id === c.id)) return c;
//         const score = Math.floor(Math.random() * 100) + 1;
//         return {
//           ...c,
//           aiScore: score,
//           status: score >= 85 ? "internal_screening" : "internal_reject",
//         };
//       });
//       setCandidates(scored);

//       const qualified = scored.filter(
//         (c) =>
//           eligibleCandidates.find((e) => e.id === c.id) && (c.aiScore || 0) >= 85
//       ).length;

//       alert(
//         `Scoring complete. ${qualified} candidates qualified for recruiter review; the rest moved to internal reject.`
//       );
//     }, 3000);
//   };

//   const openTagForm = (position: any) => {
//     setTagPositionId(position.id);
//     setTagFormData({
//       positionName: position.positionName,
//       applicant: "",
//       candidateId: null,
//       recruiter: recruiter,
//       immediateJoiner: false,
//       status: "",
//     });
//     setShowTagForm(true);
//   };

//   const closeTagForm = () => {
//     setShowTagForm(false);
//     setTagPositionId(null);
//     setTagFormData({
//       positionName: "",
//       applicant: "",
//       candidateId: null,
//       recruiter: "",
//       immediateJoiner: false,
//       status: "",
//     });
//   };

//   /* -------------------- detail view -------------------- */

//   if (currentView === "position-detail" && selectedPosition) {
//     return (
//       <PositionDetail
//         position={selectedPosition}
//         candidates={candidates}
//         recruiter={recruiter}
//         onBack={() => {
//           setSelectedPosition(null);
//           setCurrentView("positions");
//         }}
//         setCandidates={setCandidates}
//         runAIResumeMatcherForPosition={runAIResumeMatcherForPosition}
//         fetchPositionDetail={fetchPositionDetail}
//       />
//     );
//   }

//   /* -------------------- list view -------------------- */

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       {showTagForm && (
//         <TagCandidateModal
//           onClose={closeTagForm}
//           tagFormData={tagFormData}
//           setTagFormData={setTagFormData}
//           selectedPositionId={tagPositionId}
//           isSubmitting={isSubmittingTag}
//           setIsSubmitting={setIsSubmittingTag}
//           onTagged={() => {
//             closeTagForm();
//             loadPositions();
//           }}
//         />
//       )}

//       <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
//         {/* Toolbar: search, filters and create action on one line */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//           <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap md:items-center gap-3">
//             <div className="relative flex-1 min-w-0 basis-full lg:basis-auto">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//               <input
//                 type="text"
//                 placeholder="Search by position, client, location, priority or experience"
//                 className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             <select
//               className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:flex-1 lg:flex-none lg:w-44 shrink-0"
//               value={filterBy}
//               onChange={(e) => setFilterBy(e.target.value)}
//             >
//               <option value="all">All priorities</option>
//               <option value="High">High priority</option>
//               <option value="Medium">Medium priority</option>
//               <option value="Low">Low priority</option>
//             </select>

//             <select
//               className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:flex-1 lg:flex-none lg:w-44 shrink-0"
//               value={groupBy}
//               onChange={(e) => setGroupBy(e.target.value)}
//             >
//               <option value="none">No grouping</option>
//               <option value="clientName">Group by client</option>
//             </select>

//             <button
//               className="h-10 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shrink-0"
//               onClick={() => setShowCreatePosition(true)}
//             >
//               <Plus className="w-4 h-4" />
//               Create position
//             </button>
//           </div>
//         </div>

//         {/* Positions */}
//         {loading ? (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center text-sm text-gray-500">
//             Loading positions...
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {Object.entries(groupedPositions).map(
//               ([groupName, groupPositions]: any) => (
//                 <div key={groupName} className="space-y-3">
//                   {groupBy !== "none" && (
//                     <h2 className="text-lg font-semibold text-gray-900">
//                       {groupName}
//                     </h2>
//                   )}
//                   <PositionTable
//                     positions={groupPositions}
//                     onOpen={(position: any) => {
//                       fetchPositionDetail(position.id);
//                       setCurrentView("position-detail");
//                     }}
//                     onTag={openTagForm}
//                     onAIMatcher={() => navigate("/ai-matcher")}
//                   />
//                 </div>
//               )
//             )}
//           </div>
//         )}
//       </div>

//       {/* Add Candidate Modal */}
//       {showAddCandidate && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-semibold mb-4">Add candidate</h2>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email ID
//             </label>
//             <input
//               type="email"
//               className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={candidateEmail}
//               onChange={(e) => setCandidateEmail(e.target.value)}
//               placeholder="candidate@email.com"
//             />
//             <div className="flex gap-3 mt-5">
//               <button
//                 onClick={handleEmailCheck}
//                 className="flex-1 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//                 disabled={!candidateEmail}
//               >
//                 Check email
//               </button>
//               <button
//                 onClick={() => setShowAddCandidate(false)}
//                 className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Create Candidate Modal */}
//       {showCandidateForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
//           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-xl font-semibold">Create candidate</h2>
//             </div>
//             <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.email}
//                   onChange={(e) =>
//                     setNewCandidate({ ...newCandidate, email: e.target.value })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Current CTC (₹)
//                 </label>
//                 <input
//                   type="number"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.currentCTC}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       currentCTC: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Expected CTC (₹)
//                 </label>
//                 <input
//                   type="number"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.expectedCTC}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       expectedCTC: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Notice period (days)
//                 </label>
//                 <input
//                   type="number"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.noticePeriod}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       noticePeriod: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Education
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.education}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       education: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Gender
//                 </label>
//                 <select
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.gender}
//                   onChange={(e) =>
//                     setNewCandidate({ ...newCandidate, gender: e.target.value })
//                   }
//                 >
//                   <option value="">Select gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Engagement type
//                 </label>
//                 <select
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.engagementType}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       engagementType: e.target.value,
//                     })
//                   }
//                 >
//                   <option value="">Select type</option>
//                   <option value="Full-time">Full-time</option>
//                   <option value="Part-time">Part-time</option>
//                   <option value="Contract">Contract</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Recruiter
//                 </label>
//                 <input
//                   type="text"
//                   readOnly
//                   className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm bg-gray-100"
//                   value={newCandidate.recruiter}
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="flex items-center text-sm text-gray-700">
//                   <input
//                     type="checkbox"
//                     className="mr-2 h-4 w-4"
//                     checked={newCandidate.openToRelocation}
//                     onChange={(e) =>
//                       setNewCandidate({
//                         ...newCandidate,
//                         openToRelocation: e.target.checked,
//                       })
//                     }
//                   />
//                   Open to relocation
//                 </label>
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Special comments
//                 </label>
//                 <textarea
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={newCandidate.specialComments}
//                   onChange={(e) =>
//                     setNewCandidate({
//                       ...newCandidate,
//                       specialComments: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </div>
//             <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
//               <button
//                 onClick={handleCreateCandidate}
//                 className="flex-1 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Create candidate
//               </button>
//               <button
//                 onClick={() => setShowCandidateForm(false)}
//                 className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <CreatePositionWizard
//         open={showCreatePosition}
//         onClose={() => setShowCreatePosition(false)}
//         onCreate={handleCreatePosition}
//         recruiter={recruiter}
//         clientOptions={clientOptions}
//         functionOptions={functionOptions}
//         roleOptions={roleOptions}
//         educationOptions={educationOptions}
//         cityOptions={cityOptions}
//       />
//     </div>
//   );
// };

// export default PositionManagement;





//v1


import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Users, Bot, ArrowLeft, Mail, MapPin } from "lucide-react";
import { positionService } from "../services/positionService";
import { clientService } from "../services/clientService";
import Select from "react-select";
import {
  educationOptions,
  functionOptions,
  roleOptions,
  cityOptions,
  candidateStatusOptions,
} from "../constants/dropdown";
import AsyncSelect from "react-select/async";
import CreatePositionWizard from "../components/positions/CreatePositionWizard";
import PositionDetail from "../components/positions/Positiondetail";

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Tag Candidate Modal (moved to top level so it does not remount on    */
/* every keystroke, which was stealing focus from the inputs)          */
/* ------------------------------------------------------------------ */

const TagCandidateModal = ({
  onClose,
  tagFormData,
  setTagFormData,
  selectedPositionId,
  isSubmitting,
  setIsSubmitting,
  onTagged,
}) => {
  const searchTimeout = useRef<any>(null);

  const debouncedLoadOptions = (inputValue: string, callback: any) => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (!inputValue || inputValue.trim().length < 2) {
      callback([]);
      return;
    }

    searchTimeout.current = setTimeout(async () => {
      try {
        const res = await positionService.fetchAutocomplete(inputValue.trim());
        const candidates = res?.data || [];
        callback(
          candidates.map((candidate: any) => ({
            value: candidate.id,
            label: `${candidate.name} (${candidate.email})`,
            email: candidate.email,
            name: candidate.name,
          }))
        );
      } catch (err) {
        console.error("Autocomplete fetch error:", err);
        callback([]);
      }
    }, 300);
  };

  const handleCandidateSelect = (selectedOption: any) => {
    setTagFormData((prev: any) => ({
      ...prev,
      applicant: selectedOption ? selectedOption.label : "",
      candidateId: selectedOption ? selectedOption.value : null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tagFormData.candidateId) {
      alert("Select a candidate before submitting.");
      return;
    }
    if (!tagFormData.recruiter) {
      alert("Recruiter email is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await positionService.tagCandidateToPosition(
        String(selectedPositionId),
        {
          candidateId: tagFormData.candidateId,
          recruiterEmail: tagFormData.recruiter,
          immediateJoiner: tagFormData.immediateJoiner,
          status: tagFormData.status,
        }
      );

      if (response.status === 201) {
        alert("Candidate tagged to the position.");
        onTagged();
      } else {
        alert("Tagging failed: " + (response.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error tagging candidate:", error);
      alert("Could not tag the candidate. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 sm:p-4">
      <div className="bg-white w-full sm:max-w-md h-[92vh] sm:h-auto sm:max-h-[90vh] rounded-t-2xl sm:rounded-lg shadow-xl flex flex-col">
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Tag candidate
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              readOnly
              value={tagFormData.positionName}
              className="w-full h-10 px-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Applicant <span className="text-red-500">*</span>
            </label>
            <AsyncSelect
              cacheOptions
              defaultOptions={false}
              loadOptions={debouncedLoadOptions}
              isSearchable
              isClearable
              placeholder="Search by name or email..."
              noOptionsMessage={({ inputValue }) =>
                !inputValue || inputValue.length < 2
                  ? "Type at least 2 characters"
                  : "No candidates found"
              }
              loadingMessage={() => "Searching..."}
              onChange={handleCandidateSelect}
              value={
                tagFormData.candidateId
                  ? {
                      value: tagFormData.candidateId,
                      label: tagFormData.applicant,
                    }
                  : null
              }
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: "40px",
                  borderColor: "#d1d5db",
                  "&:hover": { borderColor: "#3b82f6" },
                }),
                menu: (base) => ({ ...base, zIndex: 9999 }),
              }}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
            />
            <p className="text-xs text-gray-500 mt-1">
              Type at least 2 characters to search.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recruiter <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={tagFormData.recruiter}
              onChange={(e) =>
                setTagFormData((prev: any) => ({
                  ...prev,
                  recruiter: e.target.value,
                }))
              }
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Recruiter email"
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="immediateJoiner"
              checked={tagFormData.immediateJoiner}
              onChange={(e) =>
                setTagFormData((prev: any) => ({
                  ...prev,
                  immediateJoiner: e.target.checked,
                }))
              }
              className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <label
                htmlFor="immediateJoiner"
                className="text-sm font-medium text-gray-700"
              >
                Immediate joiner
              </label>
              <p className="text-xs text-gray-500">
                Tick this if the candidate can join within 15 days.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <Select
              options={candidateStatusOptions}
              isSearchable
              placeholder="Select status..."
              value={
                candidateStatusOptions.find(
                  (opt: any) => opt.value === tagFormData.status
                ) || null
              }
              onChange={(selected: any) =>
                setTagFormData((prev: any) => ({
                  ...prev,
                  status: selected?.value,
                }))
              }
              styles={{
                control: (base) => ({ ...base, minHeight: "40px" }),
                menu: (base) => ({ ...base, zIndex: 9999 }),
              }}
            />
          </div>

          </div>

          <div className="flex gap-3 px-4 sm:px-6 py-3 border-t border-gray-200 shrink-0 bg-white sm:rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none sm:ml-auto px-4 h-11 sm:h-10 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sm:flex-none px-4 h-11 sm:h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isSubmitting ? "Tagging..." : "Tag candidate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Position detail                                                     */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Positions table                                                     */
/* ------------------------------------------------------------------ */

const PositionTable = ({ positions, onOpen, onTag, onAIMatcher }) => (
  <>
    {/* Mobile: stacked cards */}
    <div className="md:hidden space-y-3">
      {positions.map((position: any) => (
        <div
          key={position.id}
          onClick={() => onOpen(position)}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 active:bg-gray-50"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-medium text-gray-900 leading-5 break-words">
              {position.positionName}
            </p>
            <span
              className={`shrink-0 inline-flex px-2 py-0.5 text-xs font-medium leading-4 rounded-full ${
                position.priority === "High"
                  ? "bg-red-100 text-red-800"
                  : position.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {position.priority}
            </span>
          </div>

          <p className="text-sm text-gray-700 mt-1 break-words">
            {position.clientName}
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
            <span>{position.ctcBudget}</span>
            <span className="flex items-center min-w-0">
              <MapPin className="w-3 h-3 mr-1 shrink-0" />
              <span className="truncate">{position.location}</span>
            </span>
            <span>
              {position.experience} • {position.workplaceType}
            </span>
          </div>

          <div className="flex gap-2 mt-3">
            <button
              className="flex-1 h-9 bg-green-100 text-green-800 text-xs font-medium rounded hover:bg-green-200"
              onClick={(e) => {
                e.stopPropagation();
                onTag(position);
              }}
            >
              Tag candidate
            </button>
            <button
              className="flex-1 h-9 border border-purple-200 text-xs font-medium text-purple-600 rounded hover:bg-purple-50"
              onClick={(e) => {
                e.stopPropagation();
                onAIMatcher();
              }}
            >
              AI matcher
            </button>
          </div>
        </div>
      ))}

      {positions.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-sm text-gray-500">
          No positions match this search.
        </div>
      )}
    </div>

    {/* Desktop: table */}
    <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div className="w-full">
      <table className="w-full table-fixed divide-y divide-gray-200">
        <colgroup>
          <col className="w-[30%]" />
          <col className="w-[24%]" />
          <col className="w-[20%]" />
          <col className="w-[26%]" />
        </colgroup>
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Position
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Client and priority
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CTC and location
            </th>
            <th className="px-4 py-2.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {positions.map((position: any) => {
            return (
              <tr
                key={position.id}
                className="hover:bg-gray-50 cursor-pointer align-top"
                onClick={() => onOpen(position)}
              >
                <td className="px-4 py-3 align-top">
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-gray-900 leading-5 break-words">
                      {position.positionName}
                    </span>
                    <span className="text-xs text-gray-500 leading-5 mt-0.5 truncate">
                      {position.experience} • {position.workplaceType}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 align-top">
                  <div className="flex flex-col min-w-0">
                  <span className="text-sm text-gray-900 leading-5 break-words">
                    {position.clientName}
                  </span>
                  <span
                    className={`inline-flex self-start mt-1 px-2 py-0.5 text-xs font-medium leading-4 rounded-full ${
                      position.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : position.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {position.priority}
                  </span>
                  </div>
                </td>

                <td className="px-4 py-3 align-top">
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm text-gray-900 leading-5 truncate">
                      {position.ctcBudget}
                    </span>
                    <span className="text-xs text-gray-500 leading-5 mt-0.5 flex items-center min-w-0">
                      <MapPin className="w-3 h-3 mr-1 shrink-0" />
                      <span className="truncate">{position.location}</span>
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 align-top">
                  <div className="flex justify-end items-start gap-2">
                    <button
                      className="h-7 px-2.5 bg-green-100 text-green-800 text-xs font-medium rounded hover:bg-green-200 whitespace-nowrap"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTag(position);
                      }}
                    >
                      Tag candidate
                    </button>
                    <button
                      className="h-7 px-2.5 text-xs font-medium text-purple-600 rounded hover:bg-purple-50 whitespace-nowrap"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAIMatcher();
                      }}
                    >
                      AI matcher
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}

          {positions.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-10 text-center text-sm text-gray-500"
              >
                No positions match this search. Clear the filters or create a
                position.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  </>
);

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

const PositionManagement = () => {
  const [currentView, setCurrentView] = useState("positions");
  const [selectedPosition, setSelectedPosition] = useState<any>(null);
  const [tagPositionId, setTagPositionId] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [groupBy, setGroupBy] = useState("none");
  const [showTagForm, setShowTagForm] = useState(false);
  const [showAddCandidate, setShowAddCandidate] = useState<any>(false);
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [showCreatePosition, setShowCreatePosition] = useState(false);
  const [candidateEmail, setCandidateEmail] = useState("");
  const [loadingPositionDetail, setLoadingPositionDetail] = useState(false);
  const [clientOptions, setClientOptions] = useState<any[]>([]);
  const [isSubmittingTag, setIsSubmittingTag] = useState(false);
  const [positions, setPositions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const recruiter = localStorage.getItem("email") || "";

  const [tagFormData, setTagFormData] = useState<any>({
    positionName: "",
    applicant: "",
    candidateId: null,
    recruiter: "",
    immediateJoiner: false,
    status: "",
  });

  const [candidates, setCandidates] = useState<any[]>([
    {
      id: 1,
      email: "john.smith@email.com",
      name: "John Smith",
      currentCTC: 1500000,
      expectedCTC: 2000000,
      noticePeriod: 30,
      status: "submitted",
      positionId: 1,
      recruiter: recruiter,
      source: "recruiter",
    },
    {
      id: 2,
      email: "jane.doe@email.com",
      name: "Jane Doe",
      currentCTC: 1200000,
      expectedCTC: 1800000,
      noticePeriod: 60,
      status: "internal_screening",
      positionId: 1,
      recruiter: "AI Matcher",
      source: "direct",
      aiScore: null,
    },
    {
      id: 3,
      email: "alex.kumar@email.com",
      name: "Alex Kumar",
      currentCTC: 1800000,
      expectedCTC: 2500000,
      noticePeriod: 45,
      status: "internal_screening",
      positionId: 1,
      recruiter: "Direct Application",
      source: "direct",
      aiScore: null,
    },
    {
      id: 4,
      email: "priya.sharma@email.com",
      name: "Priya Sharma",
      currentCTC: 1600000,
      expectedCTC: 2200000,
      noticePeriod: 30,
      status: "internal_screening",
      positionId: 1,
      recruiter: "Direct Application",
      source: "direct",
      aiScore: null,
    },
    {
      id: 5,
      email: "rajesh.patel@email.com",
      name: "Rajesh Patel",
      currentCTC: 1400000,
      expectedCTC: 2000000,
      noticePeriod: 60,
      status: "internal_reject",
      positionId: 1,
      recruiter: "Direct Application",
      source: "direct",
      aiScore: 12,
    },
  ]);

  const [newCandidate, setNewCandidate] = useState<any>({
    email: "",
    resume: null,
    currentCTC: "",
    specialComments: "",
    education: "",
    gender: "",
    openToRelocation: false,
    engagementType: "",
    expectedCTC: "",
    noticePeriod: "",
    recruiter: recruiter,
  });

  /* -------------------- data -------------------- */

  const transformPosition = (position: any) => {
    const [submitted, targeted] = String(position.progress || "0/0")
      .split("/")
      .map(Number);

    return {
      id: position.id,
      positionName: position.title,
      clientName: position.client,
      submittedResumes: submitted || 0,
      targetedResumes: targeted || 0,
      ctcBudget: Number.isFinite(Number(position.ctc)) && Number(position.ctc) > 0
        ? `${(Number(position.ctc) / 100000).toFixed(0)} LPA`
        : "N/A",
      location: position.location || "N/A",
      priority: position.priority || "Medium",
      experience: position.experience ? `${position.experience} years` : "N/A",
      workplaceType: position.mode || "N/A",
      status: position.status || "Active",
      ctcBudgetNumeric: position.ctc || 0,
      city: position.location || "N/A",
      experienceYears: position.experience || "N/A",
      daysSinceNoAction: position.daysSinceNoAction || 0,
      education: position.education || "N/A",
      roleDescription: position.roleDescription || "",
      preferredIndustry: position.preferredIndustry || "",
      preferredCompanies: position.preferredCompanies || "",
      reportees: position.reportees || 0,
      deadline: position.deadline || "",
      rounds: position.rounds || 0,
      interviewerName: position.interviewerName || "",
      interviewerLinkedIn: position.interviewerLinkedIn || "",
      ctcStructure: position.ctcStructure || "",
      roleType: position.roleType || "",
      diversityPreference: position.diversityPreference || "",
      interviewMode: position.interviewMode || "",
      jobType: position.jobType || "",
      clientSPOC: position.clientSPOC || "",
      lakshSPOC: position.lakshSPOC || "",
      recruiter: position.recruiter || "",
      function: position.function || "",
      role: position.role || "",
      target: targeted || 0,
      createdDate: position.createdDate || new Date().toISOString(),
      lastActivityDate: position.lastActivityDate || new Date().toISOString(),
    };
  };

  const loadPositions = async () => {
    try {
      const res = await positionService.fetchAll(1, 2000);
      if (res.status === 200) {
        setPositions(res.data.positions.map(transformPosition));
      } else {
        console.error("Failed to fetch positions:", res.message);
      }
    } catch (err) {
      console.error("Error fetching positions:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPositionDetail = async (positionId: any) => {
    setLoadingPositionDetail(true);
    try {
      const res = await positionService.fetchById(positionId);
      if (res.status === 200) {
        const position = res.data;
        setSelectedPosition({
          id: String(position.id),
          positionName: position.title || "N/A",
          clientName: position.clientName || "N/A",
          submittedResumes: position.submittedCandidates?.length || 0,
          targetedResumes: position.targetedResumes || 0,
          ctcBudget: position.ctcBudget
            ? `${(Number(position.ctcBudget) / 100000).toFixed(0)} LPA`
            : "N/A",
          ctcStructure: position.ctcStructure || "",
          city: position.location || "",
          location: position.location || "",
          experience: position.experience ? `${position.experience} years` : "",
          priority: position.priority || "",
          function: position.function || "",
          role: position.role || "",
          workplaceType: position.workplaceType || "",
          status: position.status || "Open",
          education: position.education || "",
          roleDescription: position.roleDescription || "",
          preferredIndustry: position.preferredIndustry || [],
          preferredCompanies: position.preferredCompanies || [],
          reportees: position.reportees || 0,
          target: position.target || 0,
          deadline: position.deadline || "",
          rounds: position.interviewRounds || 0,
          interviewerName: position.interviewer || "",
          diversityPreference: position.diversityPreference || "",
          interviewMode: position.interviewMode || "",
          jobType: position.jobType || "",
          roleType: position.roleType || "",
          clientSpoc: position.clientSpoc || "",
          lakshSpoc: position.lakshSpoc?.filter(Boolean) || [],
          recruiter: position.recruiter || "",
          linkedIn: position.linkedin || null,
          submittedCandidates: position.submittedCandidates || [],
          message: position.message || "",
        });
      }
    } catch (err) {
      console.error("Error fetching position detail:", err);
    } finally {
      setLoadingPositionDetail(false);
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      const res = await clientService.fetchAll();
      const clients = res?.data || [];
      setClientOptions(
        clients.map((c: any) => ({
          id: c.id,
          label: c.client_name,
          value: c.id,
          clientHRSpocs: c.clientHRSpocs || [],
        }))
      );
    };
    fetchClients();
  }, []);

  useEffect(() => {
    loadPositions();
  }, []);

  /* -------------------- derived -------------------- */

  const filteredPositions = positions.filter((position) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (position.positionName || "").toLowerCase().includes(term) ||
      (position.clientName || "").toLowerCase().includes(term) ||
      (position.location || "").toLowerCase().includes(term) ||
      (position.priority || "").toLowerCase().includes(term) ||
      (position.experience || "").toLowerCase().includes(term);

    if (filterBy === "all") return matchesSearch;
    return matchesSearch && position.priority === filterBy;
  });

  const groupedPositions =
    groupBy === "clientName"
      ? filteredPositions.reduce((acc: any, position: any) => {
          const client = position.clientName || "Unassigned";
          if (!acc[client]) acc[client] = [];
          acc[client].push(position);
          return acc;
        }, {})
      : { "All Positions": filteredPositions };

  /* -------------------- handlers -------------------- */

  const handleEmailCheck = () => {
    const existingCandidate = candidates.find((c) => c.email === candidateEmail);
    if (existingCandidate) {
      setCandidates((prev) =>
        prev.map((c) =>
          c.email === candidateEmail ? { ...c, positionId: showAddCandidate } : c
        )
      );
      setShowAddCandidate(false);
      setCandidateEmail("");
      alert("Candidate tagged to the position.");
    } else {
      setShowCandidateForm(true);
      setNewCandidate({ ...newCandidate, email: candidateEmail });
    }
  };

  const handleCreateCandidate = () => {
    const candidate = {
      id: candidates.length + 1,
      ...newCandidate,
      status: "submitted",
      positionId: showAddCandidate,
      source: "recruiter",
      name: newCandidate.email.split("@")[0].replace(".", " "),
    };
    setCandidates([...candidates, candidate]);
    setShowCandidateForm(false);
    setShowAddCandidate(false);
    setNewCandidate({
      email: "",
      resume: null,
      currentCTC: "",
      specialComments: "",
      education: "",
      gender: "",
      openToRelocation: false,
      engagementType: "",
      expectedCTC: "",
      noticePeriod: "",
      recruiter: recruiter,
    });
    alert("Candidate created and tagged.");
  };

  const handleCreatePosition = async (payload: any) => {
    try {
      const response = await positionService.createPosition(payload);

      if (response.status === 201 || response.status === 200) {
        alert("Position created.");
        await loadPositions();
        return true;
      }

      alert(
        "Could not create the position: " + (response.message || "Unknown error")
      );
      return false;
    } catch (error) {
      console.error("Error creating position:", error);
      alert("Could not create the position. Try again.");
      return false;
    }
  };

  const handleUpdatePosition = async (payload: any) => {
    try {
      const response = await positionService.updatePosition(
        String(payload.id),
        payload
      );

      if (response.status === 200) {
        await fetchPositionDetail(payload.id);
        await loadPositions();
        return true;
      }

      alert("Update failed: " + (response.message || "Unknown error"));
      return false;
    } catch (error: any) {
      console.error("Error updating position:", error);
      alert("Could not update the position: " + (error.message || "Try again."));
      return false;
    }
  };

  const runAIResumeMatcherForPosition = (positionId: any) => {
    const eligibleCandidates = candidates.filter(
      (c) =>
        c.positionId === positionId &&
        c.source === "direct" &&
        c.status === "internal_screening"
    );

    if (eligibleCandidates.length === 0) {
      alert("No candidates in internal screening for this position.");
      return;
    }

    alert(`Scoring ${eligibleCandidates.length} candidates...`);

    setTimeout(() => {
      const scored = candidates.map((c) => {
        if (!eligibleCandidates.find((e) => e.id === c.id)) return c;
        const score = Math.floor(Math.random() * 100) + 1;
        return {
          ...c,
          aiScore: score,
          status: score >= 85 ? "internal_screening" : "internal_reject",
        };
      });
      setCandidates(scored);

      const qualified = scored.filter(
        (c) =>
          eligibleCandidates.find((e) => e.id === c.id) && (c.aiScore || 0) >= 85
      ).length;

      alert(
        `Scoring complete. ${qualified} candidates qualified for recruiter review; the rest moved to internal reject.`
      );
    }, 3000);
  };

  const openTagForm = (position: any) => {
    setTagPositionId(position.id);
    setTagFormData({
      positionName: position.positionName,
      applicant: "",
      candidateId: null,
      recruiter: recruiter,
      immediateJoiner: false,
      status: "",
    });
    setShowTagForm(true);
  };

  const closeTagForm = () => {
    setShowTagForm(false);
    setTagPositionId(null);
    setTagFormData({
      positionName: "",
      applicant: "",
      candidateId: null,
      recruiter: "",
      immediateJoiner: false,
      status: "",
    });
  };

  /* -------------------- detail view -------------------- */

  if (currentView === "position-detail" && selectedPosition) {
    return (
      <PositionDetail
        position={selectedPosition}
        candidates={candidates}
        recruiter={recruiter}
        onBack={() => {
          setSelectedPosition(null);
          setCurrentView("positions");
        }}
        setCandidates={setCandidates}
        runAIResumeMatcherForPosition={runAIResumeMatcherForPosition}
        onSave={handleUpdatePosition}
        functionOptions={functionOptions}
        roleOptions={roleOptions}
        educationOptions={educationOptions}
        cityOptions={cityOptions}
      />
    );
  }

  /* -------------------- list view -------------------- */

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {showTagForm && (
        <TagCandidateModal
          onClose={closeTagForm}
          tagFormData={tagFormData}
          setTagFormData={setTagFormData}
          selectedPositionId={tagPositionId}
          isSubmitting={isSubmittingTag}
          setIsSubmitting={setIsSubmittingTag}
          onTagged={() => {
            closeTagForm();
            loadPositions();
          }}
        />
      )}

      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Toolbar: search, filters and create action on one line */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap md:items-center gap-3">
            <div className="relative flex-1 min-w-0 basis-full lg:basis-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by position, client, location, priority or experience"
                className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:flex-1 lg:flex-none lg:w-44 shrink-0"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="all">All priorities</option>
              <option value="High">High priority</option>
              <option value="Medium">Medium priority</option>
              <option value="Low">Low priority</option>
            </select>

            <select
              className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:flex-1 lg:flex-none lg:w-44 shrink-0"
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
            >
              <option value="none">No grouping</option>
              <option value="clientName">Group by client</option>
            </select>

            <button
              className="h-10 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shrink-0"
              onClick={() => setShowCreatePosition(true)}
            >
              <Plus className="w-4 h-4" />
              Create position
            </button>
          </div>
        </div>

        {/* Positions */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center text-sm text-gray-500">
            Loading positions...
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedPositions).map(
              ([groupName, groupPositions]: any) => (
                <div key={groupName} className="space-y-3">
                  {groupBy !== "none" && (
                    <h2 className="text-lg font-semibold text-gray-900">
                      {groupName}
                    </h2>
                  )}
                  <PositionTable
                    positions={groupPositions}
                    onOpen={(position: any) => {
                      fetchPositionDetail(position.id);
                      setCurrentView("position-detail");
                    }}
                    onTag={openTagForm}
                    onAIMatcher={() => navigate("/ai-matcher")}
                  />
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Add Candidate Modal */}
      {showAddCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add candidate</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email ID
            </label>
            <input
              type="email"
              className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={candidateEmail}
              onChange={(e) => setCandidateEmail(e.target.value)}
              placeholder="candidate@email.com"
            />
            <div className="flex gap-3 mt-5">
              <button
                onClick={handleEmailCheck}
                className="flex-1 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                disabled={!candidateEmail}
              >
                Check email
              </button>
              <button
                onClick={() => setShowAddCandidate(false)}
                className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Candidate Modal */}
      {showCandidateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Create candidate</h2>
            </div>
            <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCandidate.email}
                  onChange={(e) =>
                    setNewCandidate({ ...newCandidate, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current CTC (₹)
                </label>
                <input
                  type="number"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCandidate.currentCTC}
                  onChange={(e) =>
                    setNewCandidate({
                      ...newCandidate,
                      currentCTC: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected CTC (₹)
                </label>
                <input
                  type="number"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCandidate.expectedCTC}
                  onChange={(e) =>
                    setNewCandidate({
                      ...newCandidate,
                      expectedCTC: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notice period (days)
                </label>
                <input
                  type="number"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCandidate.noticePeriod}
                  onChange={(e) =>
                    setNewCandidate({
                      ...newCandidate,
                      noticePeriod: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Education
                </label>
                <input
                  type="text"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCandidate.education}
                  onChange={(e) =>
                    setNewCandidate({
                      ...newCandidate,
                      education: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCandidate.gender}
                  onChange={(e) =>
                    setNewCandidate({ ...newCandidate, gender: e.target.value })
                  }
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Engagement type
                </label>
                <select
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCandidate.engagementType}
                  onChange={(e) =>
                    setNewCandidate({
                      ...newCandidate,
                      engagementType: e.target.value,
                    })
                  }
                >
                  <option value="">Select type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recruiter
                </label>
                <input
                  type="text"
                  readOnly
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm bg-gray-100"
                  value={newCandidate.recruiter}
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4"
                    checked={newCandidate.openToRelocation}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        openToRelocation: e.target.checked,
                      })
                    }
                  />
                  Open to relocation
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special comments
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCandidate.specialComments}
                  onChange={(e) =>
                    setNewCandidate({
                      ...newCandidate,
                      specialComments: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={handleCreateCandidate}
                className="flex-1 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create candidate
              </button>
              <button
                onClick={() => setShowCandidateForm(false)}
                className="flex-1 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <CreatePositionWizard
        open={showCreatePosition}
        onClose={() => setShowCreatePosition(false)}
        onCreate={handleCreatePosition}
        recruiter={recruiter}
        clientOptions={clientOptions}
        functionOptions={functionOptions}
        roleOptions={roleOptions}
        educationOptions={educationOptions}
        cityOptions={cityOptions}
      />
    </div>
  );
};

export default PositionManagement;