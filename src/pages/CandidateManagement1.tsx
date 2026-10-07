import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Filter,
  X,
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Clock,
  DollarSign,
  ArrowLeft,
  ExternalLink,
  FileText,
  Trash2,
  Upload,
} from "lucide-react";
import Header from "../components/Header";
import { applicantService } from "../services/applicantService";

import type { Candidate } from "../types/candidate";
import Select from "react-select";
import {
  educationOptions,
  cityOptions,
  candidateStatusOptions,
} from "../constants/dropdown";

const CandidateManagement = () => {
  const recruiter = localStorage.getItem("email") || "";
  const [candidates, setCandidates] = useState<Candidate[]>([
    // {
    //   id: 1,
    //   name: "John Doe",
    //   email: "john.doe@email.com",
    //   phone: "+91 9876543210",
    //   resumeLink: "https://example.com/resume1.pdf",
    //   currentDesignation: "Senior Software Engineer",
    //   currentOrganization: "TechCorp",
    //   currentCTC: 1200000,
    //   city: "Bangalore",
    //   noticePeriod: 60,
    //   pipelineStatus: "Available",
    //   education: "B.Tech Computer Science",
    //   gender: "Male",
    //   openToRelocation: true,
    //   engagementType: "Full-time",
    //   expectedCTC: 1500000,
    //   specialComments: "Strong in React and Node.js",
    //   recruiter: "Current User",
    //   positionHistory: [
    //     {
    //       id: 1,
    //       positionName: "Senior React Developer",
    //       clientName: "TechStartup Inc",
    //       currentStage: "Interview Scheduled",
    //       recruiter: "Current User",
    //       lastModified: "2025-07-22T10:30:00Z",
    //     },
    //     {
    //       id: 2,
    //       positionName: "Full Stack Engineer",
    //       clientName: "FinTech Solutions",
    //       currentStage: "Profile Submitted",
    //       recruiter: "Current User",
    //       lastModified: "2025-07-20T14:45:00Z",
    //     },
    //   ],
    // },
    // {
    //   id: 2,
    //   name: "Jane Smith",
    //   email: "jane.smith@email.com",
    //   phone: "+91 9876543211",
    //   resumeLink: "https://example.com/resume2.pdf",
    //   currentDesignation: "Product Manager",
    //   currentOrganization: "StartupXYZ",
    //   currentCTC: 1800000,
    //   city: "Mumbai",
    //   noticePeriod: 30,
    //   pipelineStatus: "In Pipeline",
    //   education: "MBA + B.E.",
    //   gender: "Female",
    //   openToRelocation: false,
    //   engagementType: "Full-time",
    //   expectedCTC: 2200000,
    //   specialComments: "Excellent leadership skills",
    //   recruiter: "Current User",
    //   positionHistory: [
    //     {
    //       id: 1,
    //       positionName: "Product Manager",
    //       clientName: "E-commerce Giant",
    //       currentStage: "Client Interview",
    //       recruiter: "Current User",
    //       lastModified: "2025-07-23T09:15:00Z",
    //     },
    //     {
    //       id: 2,
    //       positionName: "Senior PM",
    //       clientName: "Healthcare Tech",
    //       currentStage: "Offer Extended",
    //       recruiter: "Current User",
    //       lastModified: "2025-07-21T16:20:00Z",
    //     },
    //   ],
    // },
    // {
    //   id: 3,
    //   name: "Alex Johnson",
    //   email: "alex.johnson@email.com",
    //   phone: "+91 9876543212",
    //   resumeLink: "https://example.com/resume3.pdf",
    //   currentDesignation: "Data Scientist",
    //   currentOrganization: "DataCorp",
    //   currentCTC: 1600000,
    //   city: "Pune",
    //   noticePeriod: 45,
    //   pipelineStatus: "Available",
    //   education: "M.Tech Data Science",
    //   gender: "Male",
    //   openToRelocation: true,
    //   engagementType: "Full-time",
    //   expectedCTC: 2000000,
    //   specialComments: "Expert in ML and AI",
    //   recruiter: "Current User",
    //   positionHistory: [
    //     {
    //       id: 1,
    //       positionName: "ML Engineer",
    //       clientName: "AI Innovations",
    //       currentStage: "Technical Round",
    //       recruiter: "Current User",
    //       lastModified: "2025-07-23T11:45:00Z",
    //     },
    //   ],
    // },
  ]);

  const [filteredCandidates, setFilteredCandidates] = useState(candidates);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 100;

  //   fetchApplicants();
  // }, [currentPage]);
  const handleFilterChanges = (field, value) => {
    setFilteredCandidates((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRangeChange = (field, type, value) => {
    setFilteredCandidates((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [type]: value,
      },
    }));
  };

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showDocumentsListModal, setShowDocumentsListModal] = useState(false);
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  const [currentCandidateId, setCurrentCandidateId] = useState(null);
  const [documentForm, setDocumentForm] = useState({
    name: "",
    type: "Resume",
    file: null,
  });

  // Filter statesf
  const [filters, setFilters] = useState({
    ctcMin: 0,
    ctcMax: 0,
    city: "",
    organization: "",
    designation: "",
  });

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resumeFile: null,
    currentDesignation: "",
    currentOrganization: "",
    currentCTC: "",
    city: "",
    noticePeriod: "",
    pipelineStatus: "Available",
    education: "",
    gender: "",
    openToRelocation: false,
    engagementType: "Full-time",
    expectedCTC: "",
    specialComments: "",
    recruiter: recruiter,
    positionHistory: [],
    documents: [],
  });

  // Add editing state for candidate details
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumePreview, setResumePreview] = useState<string | null>(null);

  // Initialize edit form when candidate is selected
  useEffect(() => {
    if (selectedCandidate) {
      setEditFormData(selectedCandidate);
      setIsEditingDetails(false);
    }
  }, [selectedCandidate]);

  const handleSaveDetails = async () => {
    try {
      setIsUpdating(true);

      // Backend format ke according data prepare karo
      const updateData = {
        id: selectedCandidate?.id, // backend check karega existing ke liye
        name: editFormData.candidate,
        email: editFormData.contact.email,
        phone: editFormData.contact.phone,
        resumeLink: editFormData.contact.resume,
        currentDesignation: editFormData.current_role,
        currentOrganization: editFormData.company_name,
        currentCTC: Number(editFormData.ctc.current),
        expectedCTC: Number(editFormData.ctc.expected),
        city: editFormData.location,
        noticePeriod: Number(editFormData.noticePeriod),
        education: editFormData.education,
        gender: editFormData.gender,
        engagementType: editFormData.engagement_type,
        openToRelocation: editFormData.open_to_relocation,
        specialComments: editFormData.special_comments,
        recruiter: recruiter || "",
      };

      const response = await applicantService.addOrUpdate({ data: updateData });

      // Local state update karo
      // setCandidates((prev) =>
      //   prev.map((c) =>
      //     c.id === selectedCandidate?.id
      //       ? { ...response.data, ...editFormData } // merge both
      //       : c
      //   )
      // );

      setSelectedCandidate({ ...response.data, ...editFormData });
      setIsEditingDetails(false);

      alert("Details updated successfully!");
    } catch (error) {
      console.error("Failed to update candidate:", error);
      alert(error.response?.data?.message || "Failed to update details");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        console.log(
          filters.ctcMin.toString() != "" ? Number(filters.ctcMin) : undefined
        );
        const response = await applicantService.fetchAll(
          currentPage,
          candidatesPerPage,
          {
            search: searchQuery || "",
            city: filters.city || "",

            minCTC:
              filters.ctcMin.toString() !== ""
                ? Number(filters.ctcMin)
                : undefined,
            maxCTC:
              filters.ctcMax.toString() !== ""
                ? Number(filters.ctcMax)
                : undefined,
            organization: filters.organization || "",
            designation: filters.designation || "",
          }
        );

        const fetched = response.data.applicants || [];
        setCandidates(fetched);
        setTotalCount(response.data.totalCount || 0);
        setTotalPages(response.data.totalPages || 0);
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
      }
    }, 500); // wait 0.5s after typing stops

    return () => clearTimeout(delayDebounce);
  }, [filters, currentPage, searchQuery]);

  //   const fetchSingleApplicant = async (id) => {
  //   try {
  //     const response = await applicantService.fetchById(id);
  //     console.log("Single Applicant Data:", response.data);
  //     setSelectedCandidate(response.data); // or store it however you want
  //     const docResponse = await applicantService.fetchDocuments(id);
  //     console.log("Applicant Documents:", docResponse.data);

  //   } catch (error) {
  //     console.error("Error fetching single applicant:", error);
  //   }
  // };

  const fetchSingleApplicant = async (id) => {
    try {
      // Fetch applicant details
      const response = await applicantService.fetchById(id);
      const applicant = response.data;

      // Fetch applicant documents
      const docResponse = await applicantService.fetchDocuments(id);

      // Format document data
      const formattedDocs = docResponse.data.map((doc) => ({
        id: doc.id,
        name: doc.fileName,
        url: doc.fileUrl,
        type: doc.documentType,
        uploadDate: doc.uploadedAt,
      }));

      // Combine both responses
      const updatedApplicant = { ...applicant, documents: formattedDocs };

      // Update state
      setSelectedCandidate(updatedApplicant);
    } catch (error) {
      console.error("Error fetching single applicant:", error);
    }
  };

  const handleFilterChange = (key, value) => {
    if (key === "ctcMax" || key === "ctcMin") {
      const numValue = value === "" ? "" : Number(value);
      setFilters((prev) => ({ ...prev, [key]: numValue }));
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const openDocumentModal = (candidateId) => {
    setCurrentCandidateId(candidateId);
    setShowDocumentModal(true);
  };
  const handleAddDocument = async (candidateId: string | undefined) => {
    if (!candidateId || !documentForm.file) {
      alert("Please select a file to upload");
      return;
    }

    try {
      // ⚡ Upload actual File object using FormData internally
      const response = await applicantService.uploadDocument(
        candidateId,
        documentForm.type,
        documentForm.file
      );

      const uploadedDoc = response.data;

      // Format the uploaded document to match UI structure
      const formattedDoc = {
        id: uploadedDoc.id || Date.now(),
        name: uploadedDoc.fileName || documentForm.file.name,
        url: uploadedDoc.fileUrl || uploadedDoc.url || "",
        type: uploadedDoc.documentType || documentForm.type,
        uploadDate: uploadedDoc.uploadedAt || new Date().toISOString(),
      };

      // Update selected candidate FIRST (this is what user is viewing)
      if (selectedCandidate?.id === candidateId) {
        const updatedCandidate = {
          ...selectedCandidate,
          documents: [...(selectedCandidate.documents || []), formattedDoc],
        };
        console.log("🔄 Updated candidate:", updatedCandidate);
        setSelectedCandidate(updatedCandidate);
      }

      // Then update the candidates list
      // setCandidates((prev) =>
      //   prev.map((c) =>
      //     c.id === candidateId
      //       ? { ...c, documents: [...(c.documents || []), formattedDoc] }
      //       : c
      //   )
      // );

      // Reset form and close modal
      setDocumentForm({ name: "", type: "Resume", file: null });
      setShowDocumentModal(false);

      alert("Document uploaded successfully!");
    } catch (err) {
      console.error("Document upload failed:", err);
      alert(
        err?.response?.data?.message ||
          "Document upload failed. Please try again."
      );
    }
  };

 const handleDeleteDocument = async (candidateId, documentId) => {
  if (!documentId) {
    alert("Document ID is required");
    return;
  }

  if (!window.confirm("Are you sure you want to delete this document?")) {
    return;
  }

  try {
    // Call the API to delete the document
    await applicantService.deleteDocument(candidateId, documentId);

    // Update the candidates list in state
    // setCandidates((prev) =>
    //   prev.map((candidate) =>
    //     candidate?.id === candidateId
    //       ? {
    //           ...candidate,
    //           documents: candidate?.documents?.filter(
    //             (doc) => doc.id !== documentId
    //           ) || [],
    //         }
    //       : candidate
    //   )
    // );

    // Update the selected candidate if it's the one being modified
    if (selectedCandidate?.id === candidateId) {
      setSelectedCandidate((prev) => ({
        ...prev,
        documents: prev.documents?.filter((doc) => doc.id !== documentId) || [],
      }));
    }

    alert("Document deleted successfully!");
  } catch (error) {
    console.error("Failed to delete document:", error);
    alert(
      error?.response?.data?.message ||
      "Failed to delete document. Please try again."
    );
  }
};

  const clearFilters = () => {
    setFilters({
      ctcMin: "",
      ctcMax: "",
      city: "",
      organization: "",
      designation: "",
    });
  };

  const handleSearchCandidate = () => {
    if (!searchEmail.trim()) return;

    const existingCandidate = candidates.find(
      (c) => c.email.toLowerCase() === searchEmail.toLowerCase()
    );
    setSearchResult({
      email: searchEmail,
      exists: !!existingCandidate,
      candidate: existingCandidate,
    });
  };

  const handleUpdateCandidate = () => {
    if (searchResult?.candidate) {
      setEditingCandidate(searchResult.candidate);
      setFormData(searchResult.candidate);
      setShowAddForm(true);
      setSearchResult(null);
      setSearchEmail("");
    }
  };

  const handleCreateCandidate = () => {
    setEditingCandidate(null);
    setFormData({
      name: "",
      email: searchResult?.email ?? searchEmail ?? "",
      phone: "",
      resumeFile: null, // Use resumeFile instead of resumeLink
      currentDesignation: "",
      currentOrganization: "",
      currentCTC: "",
      expectedCTC: "",
      city: "",
      noticePeriod: "",
      pipelineStatus: "Available",
      education: "",
      gender: "",
      openToRelocation: false,
      engagementType: "Full-time",
      specialComments: "",
      recruiter: recruiter,
      positionHistory: [],
      documents: [],
    });
    setShowAddForm(true);
    setSearchResult(null);
    setSearchEmail("");
  };

  const handleFormSubmit = async () => {
    try {
      setIsSubmitting(true);

      // Step 1: Enhanced Validation
      if (!formData.name || !formData.email) {
        alert("Name and Email are required!");
        return;
      }

      if (!editingCandidate && !formData.resumeFile) {
        alert("Please upload a resume file for new candidates!");
        return;
      }

      // Step 2: Create FormData FIRST
      const formPayload = new FormData();

      // Append resume file if exists
      if (formData.resumeFile) {
        formPayload.append("resume", formData.resumeFile);
      }

      // Step 3: Prepare candidate data with proper number handling
      const candidateData = {
        id: editingCandidate?.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        currentDesignation: formData.currentDesignation,
        currentOrganization: formData.currentOrganization,
        currentCTC: formData.currentCTC
          ? Number(formData.currentCTC)
          : undefined, // ✅ Safe
        expectedCTC: formData.expectedCTC
          ? Number(formData.expectedCTC)
          : undefined, // ✅ Safe
        city: formData.city,
        noticePeriod: formData.noticePeriod
          ? Number(formData.noticePeriod)
          : undefined, // ✅ Safe
        education: formData.education,
        gender: formData.gender,
        engagementType: formData.engagementType,
        openToRelocation: formData.openToRelocation,
        specialComments: formData.specialComments,
        recruiter: recruiter || "",
      };

      // Append data as JSON string
      formPayload.append("data", JSON.stringify(candidateData));

      // Step 4: API call
      const result = await applicantService.addOrUpdate(formPayload);

      // Step 5: Local state update
      if (editingCandidate) {
        setCandidates((prev) =>
          prev.map((c) =>
            c.id === editingCandidate.id ? { ...c, ...result.data } : c
          )
        );
        alert("Candidate updated successfully!");
      } else {
        setCandidates((prev) => [...prev, result.data]);
        alert("Candidate added successfully!");
      }

      // Step 6: Reset form
      setShowAddForm(false);
      setEditingCandidate(null);
      setResumePreview(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        resumeFile: null,
        currentDesignation: "",
        currentOrganization: "",
        currentCTC: "",
        expectedCTC: "",
        city: "",
        noticePeriod: "",
        education: "",
        gender: "",
        openToRelocation: false,
        engagementType: "Full-time",
        specialComments: "",
        recruiter: recruiter,
        positionHistory: [],
        documents: [],
      });
    } catch (error: any) {
      console.error("Failed to save candidate:", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to save candidate. Please try again.";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Candidate Details Page
  if (selectedCandidate) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {selectedCandidate?.candidate}
                  </h1>
                  <p className="text-gray-600">
                    {selectedCandidate?.current_role} at{" "}
                    {selectedCandidate?.company_name}
                  </p>
                </div>
                <div className="ml-auto">
                  <button
                    onClick={() => {
                      if (isEditingDetails) {
                        handleSaveDetails();
                      } else {
                        setIsEditingDetails(true);
                      }
                    }}
                    disabled={isUpdating}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    {isUpdating
                      ? "Saving..."
                      : isEditingDetails
                      ? "Save Details"
                      : "Edit Details"}
                  </button>
                </div>
              </div>
            </div>

            {/* Candidate Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">Email</span>
                        {isEditingDetails ? (
                          <input
                            type="email"
                            value={editFormData?.contact.email || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                contact: {
                                  ...prev.contact,
                                  email: e.target.value,
                                },
                              }))
                            }
                            className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <div className="text-gray-900">
                            {selectedCandidate?.contact.email}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">Phone</span>
                        {isEditingDetails ? (
                          <input
                            type="tel"
                            value={editFormData?.contact.phone || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                contact: {
                                  ...prev.contact,
                                  phone: e.target.value,
                                },
                              }))
                            }
                            className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <div className="text-gray-900">
                            {selectedCandidate?.contact.phone}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">City</span>
                        {isEditingDetails ? (
                          <input
                            type="text"
                            value={editFormData?.location || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                location: e.target.value,
                              }))
                            }
                            className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <div className="text-gray-900">
                            {selectedCandidate?.location}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-5 h-5 text-gray-500" />
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">Resumemmm</span>
                        {isEditingDetails ? (
                          <input
                            type="url"
                            value={editFormData?.contact.resume || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                contact: {
                                  ...prev.contact,
                                  resume: e.target.value,
                                },
                              }))
                            }
                            className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <div>
                            <a
                              href={selectedCandidate?.contact.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline"
                            >
                              View Resume
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Professional Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5 text-gray-500" />
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">
                          Current Organization
                        </span>
                        {isEditingDetails ? (
                          <input
                            type="text"
                            value={editFormData?.company_name || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                company_name: e.target.value,
                              }))
                            }
                            className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <div className="text-gray-900">
                            {selectedCandidate?.company_name}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">
                          Current Designation
                        </span>
                        {isEditingDetails ? (
                          <input
                            type="text"
                            value={editFormData?.current_role || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                current_role: e.target.value,
                              }))
                            }
                            className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <div className="text-gray-900">
                            {selectedCandidate?.current_role}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-gray-500" />
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">
                          Current CTC
                        </span>
                        {isEditingDetails ? (
                          <input
                            type="number"
                            value={editFormData?.ctc.current || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                ctc: {
                                  ...prev.ctc,
                                  current: e.target.value,
                                },
                              }))
                            }
                            className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <div className="text-gray-900 font-semibold">
                            {formatCurrency(selectedCandidate?.ctc.current)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-gray-500" />
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">
                          Expected CTC
                        </span>
                        {isEditingDetails ? (
                          <input
                            type="number"
                            value={editFormData?.ctc.expected || ""}
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                ctc: {
                                  ...prev.ctc,
                                  expected: e.target.value,
                                },
                              }))
                            }
                            className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <div className="text-gray-900 font-semibold">
                            {formatCurrency(selectedCandidate?.ctc.expected)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">
                          Notice Period
                        </span>
                        {isEditingDetails ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={editFormData?.noticePeriod || ""}
                              onChange={(e) =>
                                setEditFormData((prev) => ({
                                  ...prev,
                                  noticePeriod: e.target.value,
                                }))
                              }
                              className="text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-20"
                            />
                            <span className="text-gray-900">days</span>
                          </div>
                        ) : (
                          <div className="text-gray-900">
                            {selectedCandidate?.noticePeriod} days
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Education</span>
                      {isEditingDetails ? (
                        <input
                          type="text"
                          value={editFormData?.education || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              education: e.target.value,
                            }))
                          }
                          className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
                        />
                      ) : (
                        <div className="text-gray-900">
                          {selectedCandidate?.education}
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Gender</span>
                      {isEditingDetails ? (
                        <select
                          value={
                            editFormData?.gender?.toLowerCase() === "m"
                              ? "Male"
                              : editFormData?.gender?.toLowerCase() === "f"
                              ? "Female"
                              : editFormData?.gender || ""
                          }
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              gender: e.target.value,
                            }))
                          }
                          className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">
                            Prefer not to say
                          </option>
                        </select>
                      ) : (
                        <div className="text-gray-900">
                          {selectedCandidate?.gender}
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        Engagement Type
                      </span>
                      {isEditingDetails ? (
                        <select
                          value={
                            editFormData?.engagement_type?.toLowerCase() ===
                            "remote"
                              ? "Remote"
                              : editFormData?.engagement_type?.toLowerCase() ===
                                "hybrid"
                              ? "Hybrid"
                              : editFormData?.engagement_type?.toLowerCase() ===
                                "in office"
                              ? "In office"
                              : ""
                          }
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              engagement_type: e.target.value,
                            }))
                          }
                          className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
                        >
                          <option value="Hybrid">Hybrid</option>
                          <option value="In office">In office</option>
                          <option value="Remote">Remote</option>
                        </select>
                      ) : (
                        <div className="text-gray-900">
                          {selectedCandidate?.engagement_type}
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        Open to Relocation
                      </span>
                      {isEditingDetails ? (
                        <label className="flex items-center gap-2 mt-1">
                          <input
                            type="checkbox"
                            checked={
                              editFormData?.open_to_relocation?.toLowerCase() ===
                              "yes"
                            }
                            onChange={(e) =>
                              setEditFormData((prev) => ({
                                ...prev,
                                open_to_relocation: e.target.checked
                                  ? "Yes"
                                  : "No",
                              }))
                            }
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-900">
                            Yes, open to relocation
                          </span>
                        </label>
                      ) : (
                        <div className="text-gray-900">
                          {selectedCandidate?.open_to_relocation ? "Yes" : "No"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Additional Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Recruiter</span>
                      <div className="text-gray-900">
                        {selectedCandidate?.candidate_position_history?.length >
                          0 &&
                        selectedCandidate.candidate_position_history[0]
                          ?.recruiter?.length > 0
                          ? selectedCandidate.candidate_position_history[0].recruiter
                              .map((r) => r.name || r.email)
                              .join(", ")
                          : "N/A"}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        Special Comments
                      </span>
                      {isEditingDetails ? (
                        <textarea
                          value={editFormData?.special_comments || ""}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              special_comments: e.target.value,
                            }))
                          }
                          rows={3}
                          className="w-full text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
                        />
                      ) : selectedCandidate?.special_comments ? (
                        <div className="text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">
                          {selectedCandidate?.special_comments}
                        </div>
                      ) : (
                        <div className="text-gray-500 italic mt-1">
                          No comments
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Documents
                    </h3>
                    <button
                      onClick={() => openDocumentModal(selectedCandidate?.id)}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add Document
                    </button>
                  </div>
                  {selectedCandidate?.documents &&
                  selectedCandidate?.documents.length > 0 ? (
                    <div className="space-y-3">
                      {selectedCandidate?.documents.map((document) => (
                        <div
                          key={document.id}
                          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-blue-600" />
                              <div>
                                <a
                                  href={document.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                                >
                                  {document.name}
                                </a>
                                <div className="text-sm text-gray-500">
                                  {document.type} • Uploaded on{" "}
                                  {new Date(
                                    document.uploadDate
                                  ).toLocaleDateString("en-IN")}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                handleDeleteDocument(
                                  selectedCandidate?.id,
                                  document.id
                                )
                              }
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
                      <FileText className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p>No documents uploaded</p>
                      <button
                        onClick={() => openDocumentModal(selectedCandidate?.id)}
                        className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Add first document
                      </button>
                    </div>
                  )}
                </div>

                {/* Position History */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Candidate Position History
                  </h3>
                  {selectedCandidate?.candidate_position_history &&
                  selectedCandidate?.candidate_position_history.length > 0 ? (
                    <div className="space-y-3">
                      {selectedCandidate?.candidate_position_history.map(
                        (position) => (
                          <div
                            key={position.id}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm text-gray-500">
                                  Position Name
                                </div>
                                <div className="text-gray-900 font-medium">
                                  {position.job.position}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">
                                  Client Name
                                </div>
                                <div className="text-gray-900">
                                  {position.job?.client.client_name}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">
                                  Current Stage
                                </div>
                                <div className="text-gray-900">
                                  {position?.current_stage}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">
                                  Recruiter
                                </div>
                                <div className="text-gray-900">
                                  {position.recruiter?.length > 0
                                    ? position.recruiter
                                        .map((r) => r.name || r.email || "—")
                                        .join(", ")
                                    : "—"}
                                </div>
                              </div>
                              <div className="md:col-span-2">
                                <div className="text-sm text-gray-500">
                                  Last Modified
                                </div>
                                <div className="text-gray-900">
                                  {position.last_modefied
                                    ? new Date(
                                        position.last_modefied
                                      ).toLocaleString("en-IN", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                      })
                                    : "—"}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
                      <Building className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p>No position history available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Document Upload Modal - Higher z-index */}
        {showDocumentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full relative z-50">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Upload Document
                </h2>
                <button
                  onClick={() => {
                    setShowDocumentModal(false);
                    setDocumentForm({ name: "", type: "Resume", file: null });
                  }}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Resume_JohnDoe_2025"
                    value={documentForm.name}
                    onChange={(e) =>
                      setDocumentForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Type
                  </label>
                  <select
                    value={documentForm.type}
                    onChange={(e) =>
                      setDocumentForm((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                     <option value="Resume">Resume</option>
                     <option value="Pan Card">Pan Card</option>
                    <option value="Cover Letter">Cover Letter</option>
                    <option value="Adhaar Card">Adhaar Card</option>
                    <option value="Offer Letter">Offer Letter</option>
                    <option value="Resignation Letter">
                      Resignation Letter
                    </option>
                    <option value="Academic Document">Academic Document</option>
                    <option value="Reference Letter">Reference Letter</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Document *
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload a file</span>
                          {/* <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              setDocumentForm((prev) => ({
                                ...prev,
                                file: file,
                                name:
                                  prev.name ||
                                  (file ? file.name.split(".")[0] : ""),
                              }));
                            }}
                          /> */}
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              setDocumentForm((prev) => ({
                                ...prev,
                                file: file,
                                name:
                                  prev.name ||
                                  (file ? file.name.split(".")[0] : ""),
                              }));
                            }}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX, JPG, PNG up to 10MB
                      </p>
                    </div>
                  </div>
                  {documentForm.file && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                      <FileText className="w-4 h-4" />
                      <span>{documentForm.file.name}</span>
                      <button
                        onClick={() =>
                          setDocumentForm((prev) => ({ ...prev, file: null }))
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDocumentModal(false);
                      setDocumentForm({ name: "", type: "Resume", file: null });
                    }}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddDocument(selectedCandidate?.id)}
                    disabled={!documentForm.name.trim() || !documentForm.file}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 ">
        <Header />

        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Candidate Management
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Candidate
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search candidates by name, email, phone, designation, organization, or city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
                {searchQuery && (
                  <div className="mt-2 text-sm text-gray-600">
                    Showing {filteredCandidates.length} candidate
                    {filteredCandidates.length !== 1 ? "s" : ""} matching "
                    {searchQuery}"
                  </div>
                )}
              </div>

              {/* Filters */}
              {showFilters && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Min CTC (₹)
                      </label>
                      <input
                        type="number"
                        placeholder="Min CTC"
                        value={filters.ctcMin}
                        onChange={(e) =>
                          handleFilterChange("ctcMin", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max CTC (₹)
                      </label>
                      <input
                        type="number"
                        placeholder="Max CTC"
                        value={filters.ctcMax}
                        onChange={(e) =>
                          handleFilterChange("ctcMax", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="City"
                        value={filters.city}
                        onChange={(e) =>
                          handleFilterChange("city", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Organization
                      </label>
                      <input
                        type="text"
                        placeholder="Organization"
                        value={filters.organization}
                        onChange={(e) =>
                          handleFilterChange("organization", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Designation
                      </label>
                      <input
                        type="text"
                        placeholder="Designation"
                        value={filters.designation}
                        onChange={(e) =>
                          handleFilterChange("designation", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Candidates Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CTC
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notice Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Documents
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {candidates.map((candidate) => (
                    <tr
                      key={candidate?.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td
                        className="px-6 py-4 whitespace-nowrap cursor-pointer"
                        onClick={() => fetchSingleApplicant(candidate?.id)}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {candidate?.candidate}
                            </div>
                            <div className="text-sm text-gray-500">
                              {candidate?.contact?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap cursor-pointer"
                        onClick={() => fetchSingleApplicant(candidate?.id)}
                      >
                        <div className="text-sm text-gray-900">
                          {candidate?.contact?.phone || "N/A"}
                        </div>
                        <a
                          href={candidate?.contact?.resume || "N/A"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                          Resume
                        </a>
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap cursor-pointer"
                        onClick={() => fetchSingleApplicant(candidate?.id)}
                      >
                        <div className="text-sm font-medium text-gray-900">
                          {candidate?.current_role}
                        </div>
                        <div className="text-sm text-gray-500">
                          {candidate?.company_name}
                        </div>
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap cursor-pointer"
                        onClick={() => fetchSingleApplicant(candidate?.id)}
                      >
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(candidate?.ctc?.current)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Expected: {formatCurrency(candidate?.ctc?.expected)}
                        </div>
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap cursor-pointer"
                        onClick={() => fetchSingleApplicant(candidate?.id)}
                      >
                        <div className="text-sm text-gray-900">
                          {candidate?.location}
                        </div>
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap cursor-pointer"
                        onClick={() => fetchSingleApplicant(candidate?.id)}
                      >
                        <div className="text-sm text-gray-900">
                          {candidate?.noticePeriod} days
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div
                            className="text-sm text-gray-900 cursor-pointer"
                            onClick={() => fetchSingleApplicant(candidate?.id)}
                          >
                            {candidate?.documents || 0} document
                            {(candidate?.documents?.length || 0) !== 1
                              ? "s"
                              : ""}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentCandidateId(candidate?.id);
                              setShowAddDocumentModal(true);
                            }}
                            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                            title="Add Document"
                          ></button>
                        </div>
                        {candidate?.documents &&
                          candidate?.documents.length > 0 && (
                            <div className="mt-1">
                              {candidate?.documents
                                .slice(0, 2)
                                .map((doc, index) => (
                                  <div
                                    key={doc.id}
                                    className="text-xs text-blue-600"
                                  >
                                    <a
                                      href={doc.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="hover:underline"
                                    >
                                      {doc.name.length > 20
                                        ? `${doc.name.substring(0, 20)}...`
                                        : doc.name}
                                    </a>
                                  </div>
                                ))}
                              {candidate?.documents.length > 2 && (
                                <div
                                  className="text-xs text-gray-500 cursor-pointer hover:text-gray-700"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCandidate(candidate);
                                  }}
                                >
                                  +{candidate?.documents.length - 2} more
                                </div>
                              )}
                            </div>
                          )}
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap cursor-pointer"
                        onClick={() => fetchSingleApplicant(candidate?.id)}
                      >
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            candidate?.status === "pipeline_stage"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {candidate?.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingCandidate(candidate);
                            setFormData(candidate);
                            setShowAddForm(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {/* Pagination */}
              <div className="px-6 py-3 border-t flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing{" "}
                  {totalCount === 0
                    ? 0
                    : (currentPage - 1) * candidatesPerPage + 1}{" "}
                  to {Math.min(currentPage * candidatesPerPage, totalCount)} of{" "}
                  {totalCount} candidates
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 hover:bg-gray-50"
                  >
                    Previous
                  </button>

                  <span className="px-3 py-1 text-sm bg-blue-50 border rounded">
                    Page {currentPage} of {totalPages || 1}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>

              {filteredCandidates.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No candidates found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add/Edit Candidate Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingCandidate ? "Update Candidate" : "Add New Candidate"}
                </h2>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingCandidate(null);
                    setSearchResult(null);
                    setSearchEmail("");
                  }}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Email Search Section - Only show when adding new candidate */}
              {!editingCandidate && (
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Search for Existing Candidate
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <input
                          type="email"
                          placeholder="Enter candidate email..."
                          value={searchEmail}
                          onChange={(e) => setSearchEmail(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <button
                        onClick={handleSearchCandidate}
                        disabled={!searchEmail.trim()}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                      >
                        <Search className="w-4 h-4" />
                        Search
                      </button>
                    </div>

                    {/* Search Result */}
                    {searchResult && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        {searchResult.exists ? (
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-blue-800 font-medium">
                                Candidate found: {searchResult.candidate?.name}
                              </p>
                              <p className="text-blue-600 text-sm">
                                {searchResult.email}
                              </p>
                            </div>
                            <button
                              onClick={handleUpdateCandidate}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                              <Edit className="w-4 h-4" />
                              Update Details
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-blue-800 font-medium">
                                No candidate found with this email
                              </p>
                              <p className="text-blue-600 text-sm">
                                {searchResult.email}
                              </p>
                            </div>
                            <button
                              onClick={handleCreateCandidate}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              Create Candidate
                            </button>
                          </div>
                        )}
                        <button
                          onClick={() => setSearchResult(null)}
                          className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Clear
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Resume
                    </label>
                    <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="resume-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                          >
                            <span>Upload resume</span>
                            {/* <input
  type="file"
  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
  onChange={(e) => {
    const file = e.target.files?.[0] || null;
    setDocumentForm((prev) => ({
      ...prev,
      file: file,  // ✅ This correctly sets a File object
      name: prev.name || (file ? file.name.split(".")[0] : ""),
    }));
  }}
/> */}
                            <input
                              id="resume-upload"
                              type="file"
                              className="sr-only"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                if (file) {
                                  setFormData((prev) => ({
                                    ...prev,
                                    resumeFile: file,
                                  }));
                                  setResumePreview(file.name);
                                }
                              }}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF, DOC, DOCX up to 10MB
                        </p>
                      </div>
                    </div>
                    {resumePreview && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4" />
                        <span>{resumePreview}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Designation
                    </label>
                    <input
                      type="text"
                      value={formData.currentDesignation}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          currentDesignation: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Organization
                    </label>
                    <input
                      type="text"
                      value={formData.currentOrganization}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          currentOrganization: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current CTC (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.currentCTC}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          currentCTC: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expected CTC (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.expectedCTC}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          expectedCTC: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>

                    <Select
                      options={cityOptions}
                      isSearchable
                      isClearable
                      placeholder="Select city..."
                      value={
                        cityOptions.find(
                          (opt) => opt.value === formData.city
                        ) || null
                      }
                      onChange={(
                        selected: { value: string; label: string } | null
                      ) =>
                        setFormData((prev) => ({
                          ...prev,
                          city: selected ? selected.value : "",
                        }))
                      }
                      getOptionLabel={(opt) => opt.label}
                      getOptionValue={(opt) => opt.value}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notice Period (days) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.noticePeriod}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          noticePeriod: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Education
                    </label>
                    <Select
                      options={educationOptions}
                      isSearchable
                      isClearable
                      placeholder="Select education..."
                      value={
                        educationOptions.find(
                          (opt) => opt.value === formData.education
                        ) || null
                      }
                      onChange={(
                        selected: { value: string; label: string } | null
                      ) =>
                        setFormData((prev) => ({
                          ...prev,
                          education: selected ? selected.value : "",
                        }))
                      }
                      getOptionLabel={(opt) => opt.label}
                      getOptionValue={(opt) => opt.value}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Engagement Type
                    </label>
                    <select
                      value={formData.engagementType}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          engagementType: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.openToRelocation}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            openToRelocation: e.target.checked,
                          }))
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Open to Relocation
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Comments
                  </label>
                  <textarea
                    value={formData.specialComments}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        specialComments: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recruiter
                  </label>
                  <input
                    type="text"
                    value={formData.recruiter}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingCandidate(null);
                      setSearchResult(null);
                      setSearchEmail("");
                    }}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleFormSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting
                      ? "Saving..."
                      : editingCandidate
                      ? "Update Candidate"
                      : "Add Candidate"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CandidateManagement;
