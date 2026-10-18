// // // // import { StrictMode } from 'react';
// // // // import { createRoot } from 'react-dom/client';
// // // // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // // // import './index.css';
// // // // import App from './App.tsx';
// // // // import CandidateManagement from './pages/CandidateManagement.tsx';
// // // // import SubmissionManagementSystem from './pages/SubmissionManagementSystem.tsx';
// // // // import PositionManagement from './pages/PositionManagement.tsx';
// // // // import ClientManagement from './pages/ClientManagement.tsx';
// // // // import WhatsAppMsgTab from './pages/WhatsAppMsgTabNew';
// // // // import AIResumeMatcher from './pages/AIResumeMatcher.tsx';
// // // // import OffersTab from './pages/OfferManagement.tsx';
// // // // import Signup from './pages/Signup.tsx';
// // // // import { GoogleOAuthProvider } from "@react-oauth/google";
// // // // import ProtectedRoute from "./components/ProtectedRoute";
// // // // import { isLoggedIn } from "./utils/auth";

// // // // const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// // // // createRoot(document.getElementById('root')!).render(
// // // //   <StrictMode>
// // // //     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
// // // //       <BrowserRouter>
// // // //         <Routes>
// // // //           {/* ✅ Default route → Signup page */}
// // // //           <Route
// // // //             path="/"
// // // //             element={
// // // //               isLoggedIn() ? <Navigate to="/position-management" replace /> : <Signup />
// // // //             }
// // // //           />

// // // //           {/* Main app or dashboard after login/signup */}
// // // //           {/* <Route path="/dashboard" element={<App />} /> */}

// // // //           {/* Other pages */}
// // // //           <Route
// // // //             path="/submission-management"
// // // //             element={
// // // //               <ProtectedRoute>
// // // //                 <SubmissionManagementSystem />
// // // //               </ProtectedRoute>
// // // //             }
// // // //           />
// // // //           <Route
// // // //             path="/candidate-management"
// // // //             element={
// // // //               <ProtectedRoute>
// // // //                 <CandidateManagement />
// // // //               </ProtectedRoute>
// // // //             }
// // // //           />
// // // //           <Route
// // // //             path="/position-management"
// // // //             element={
// // // //               <ProtectedRoute>
// // // //                 <PositionManagement />
// // // //               </ProtectedRoute>
// // // //             }
// // // //           />
// // // //            <Route path="/ai-matcher" element={<AIResumeMatcher />} />
// // // //           {/* <Route path="/client-management" element={<ClientManagement />} />
// // // //           <Route path="/whatsapp-tab" element={<WhatsAppMsgTab />} />
// // // //           <Route path="/ai-matcher" element={<AIResumeMatcher />} />
// // // //           <Route path="/offer-management" element={<OffersTab />} /> */}
// // // //           <Route path="/signup" element={<Signup />} />
// // // //           <Route path="/whatsapp-tab" element={<WhatsAppMsgTab />} />

// // // //           {/* 404 page */}
// // // //           <Route path="*" element={<div>Page Not Found</div>} />
// // // //         </Routes>
// // // //       </BrowserRouter>
// // // //     </GoogleOAuthProvider>
// // // //   </StrictMode>
// // // // );






// // // // import { StrictMode } from 'react';
// // // // import { createRoot } from 'react-dom/client';
// // // // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // // // import './index.css';
// // // // import App from './App.tsx';
// // // // import CandidateManagement from './pages/CandidateManagement.tsx';
// // // // import SubmissionManagementSystem from './pages/SubmissionManagementSystem.tsx';
// // // // import PositionManagement from './pages/PositionManagement.tsx';
// // // // import ClientManagement from './pages/ClientManagement.tsx';
// // // // import WhatsAppMsgTab from './pages/WhatsAppMsgTabNew';
// // // // import AIResumeMatcher from './pages/AIResumeMatcher.tsx';
// // // // import OffersTab from './pages/OfferManagement.tsx';
// // // // import CallingTracker from './pages/CallingTracker.tsx';
// // // // import CandidateTracker from './pages/CandidateTracker.tsx';
// // // // import PipelineDashboard from './pages/PipelineDashboard.tsx';
// // // // import Signup from './pages/Signup.tsx';
// // // // import { GoogleOAuthProvider } from "@react-oauth/google";
// // // // import ProtectedRoute from "./components/ProtectedRoute";
// // // // import { isLoggedIn } from "./utils/auth";

// // // // const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// // // // createRoot(document.getElementById('root')!).render(
// // // //   <StrictMode>
// // // //     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
// // // //       <BrowserRouter>
// // // //         <Routes>
// // // //           {/* ✅ Default route → Signup page */}
// // // //           <Route
// // // //             path="/"
// // // //             element={
// // // //               isLoggedIn() ? <Navigate to="/position-management" replace /> : <Signup />
// // // //             }
// // // //           />

// // // //           {/* Main app or dashboard after login/signup */}
// // // //           {/* <Route path="/dashboard" element={<App />} /> */}

// // // //           {/* Other pages */}
// // // //           <Route
// // // //             path="/submission-management"
// // // //             element={
// // // //               <ProtectedRoute>
// // // //                 <SubmissionManagementSystem />
// // // //               </ProtectedRoute>
// // // //             }
// // // //           />
// // // //           <Route
// // // //             path="/candidate-management"
// // // //             element={
// // // //               <ProtectedRoute>
// // // //                 <CandidateManagement />
// // // //               </ProtectedRoute>
// // // //             }
// // // //           />
// // // //           <Route
// // // //             path="/position-management"
// // // //             element={
// // // //               <ProtectedRoute>
// // // //                 <PositionManagement />
// // // //               </ProtectedRoute>
// // // //             }
// // // //           />
// // // //           {/* Detail view for a single position — same component, driven by the param */}
// // // //           <Route
// // // //             path="/position-management/:positionId"
// // // //             element={
// // // //               <ProtectedRoute>
// // // //                 <PositionManagement />
// // // //               </ProtectedRoute>
// // // //             }
// // // //           />
// // // //           <Route path="/candidate-management/:id" element={<CandidateManagement />} />
// // // //           <Route
// // // //             path="/calling-tracker"
// // // //             element={
// // // //               <ProtectedRoute>
// // // //                 <CallingTracker />
// // // //               </ProtectedRoute>
// // // //             }
// // // //           />
// // // //           <Route
// // // //             path="/candidate-tracker"
// // // //             element={
// // // //               <ProtectedRoute>
// // // //                 <CandidateTracker />
// // // //               </ProtectedRoute>
// // // //             }
// // // //           />
// // // //           <Route
// // // //             path="/pipeline-dashboard"
// // // //             element={
// // // //               <ProtectedRoute>
// // // //                 <PipelineDashboard />
// // // //               </ProtectedRoute>
// // // //             }
// // // //           />
// // // //            <Route path="/ai-matcher" element={<AIResumeMatcher />} />
// // // //           {/* <Route path="/client-management" element={<ClientManagement />} />
// // // //           <Route path="/whatsapp-tab" element={<WhatsAppMsgTab />} />
// // // //           <Route path="/ai-matcher" element={<AIResumeMatcher />} />
// // // //           <Route path="/offer-management" element={<OffersTab />} /> */}
// // // //           <Route path="/signup" element={<Signup />} />
// // // //           <Route path="/whatsapp-tab" element={<WhatsAppMsgTab />} />

// // // //           {/* 404 page */}
// // // //           <Route path="*" element={<div>Page Not Found</div>} />
// // // //         </Routes>
// // // //       </BrowserRouter>
// // // //     </GoogleOAuthProvider>
// // // //   </StrictMode>
// // // // );


// // // // import { StrictMode } from 'react';
// // // // import { createRoot } from 'react-dom/client';
// // // // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // // // import './index.css';
// // // // import App from './App.tsx';
// // // // import CandidateManagement from './pages/CandidateManagement.tsx';
// // // // import SubmissionManagementSystem from './pages/SubmissionManagementSystem.tsx';
// // // // import PositionManagement from './pages/PositionManagement.tsx';
// // // // import ClientManagement from './pages/ClientManagement.tsx';
// // // // import WhatsAppMsgTab from './pages/WhatsAppMsgTabNew';
// // // // import AIResumeMatcher from './pages/AIResumeMatcher.tsx';
// // // // import OffersTab from './pages/OfferManagement.tsx';
// // // // import Signup from './pages/Signup.tsx';
// // // // import { GoogleOAuthProvider } from "@react-oauth/google";
// // // // import ProtectedRoute from "./components/ProtectedRoute";
// // // // import { isLoggedIn } from "./utils/auth";

// // // // const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// // // // createRoot(document.getElementById('root')!).render(
// // // //   <StrictMode>
// // // //     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
// // // //       <BrowserRouter>
// // // //         <Routes>
// // // //           {/* ✅ Default route → Signup page */}
// // // //           <Route
// // // //             path="/"
// // // //             element={
// // // //               isLoggedIn() ? <Navigate to="/position-management" replace /> : <Signup />
// // // //             }
// // // //           />

// // // //           {/* Main app or dashboard after login/signup */}
// // // //           {/* <Route path="/dashboard" element={<App />} /> */}

// // // //           {/* Other pages */}
// // // //           <Route
// // // //             path="/submission-management"
// // // //             element={
// // // //               <ProtectedRoute>
// // // //                 <SubmissionManagementSystem />
// // // //               </ProtectedRoute>
// // // //             }
// // // //           />
// // // //           <Route
// // // //             path="/candidate-management"
// // // //             element={
// // // //               <ProtectedRoute>
// // // //                 <CandidateManagement />
// // // //               </ProtectedRoute>
// // // //             }
// // // //           />
// // // //           <Route
// // // //             path="/position-management"
// // // //             element={
// // // //               <ProtectedRoute>
// // // //                 <PositionManagement />
// // // //               </ProtectedRoute>
// // // //             }
// // // //           />
// // // //            <Route path="/ai-matcher" element={<AIResumeMatcher />} />
// // // //           {/* <Route path="/client-management" element={<ClientManagement />} />
// // // //           <Route path="/whatsapp-tab" element={<WhatsAppMsgTab />} />
// // // //           <Route path="/ai-matcher" element={<AIResumeMatcher />} />
// // // //           <Route path="/offer-management" element={<OffersTab />} /> */}
// // // //           <Route path="/signup" element={<Signup />} />
// // // //           <Route path="/whatsapp-tab" element={<WhatsAppMsgTab />} />

// // // //           {/* 404 page */}
// // // //           <Route path="*" element={<div>Page Not Found</div>} />
// // // //         </Routes>
// // // //       </BrowserRouter>
// // // //     </GoogleOAuthProvider>
// // // //   </StrictMode>
// // // // );


// // // import { StrictMode } from 'react';
// // // import { createRoot } from 'react-dom/client';
// // // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // // import './index.css';
// // // import App from './App.tsx';
// // // import CandidateManagement from './pages/CandidateManagement.tsx';
// // // import SubmissionManagementSystem from './pages/SubmissionManagementSystem.tsx';
// // // import PositionManagement from './pages/PositionManagement.tsx';
// // // import ClientManagement from './pages/ClientManagement.tsx';
// // // import WhatsAppMsgTab from './pages/WhatsAppMsgTabNew';
// // // import AIResumeMatcher from './pages/AIResumeMatcher.tsx';
// // // import OffersTab from './pages/OfferManagement.tsx';
// // // import CallingTracker from './pages/CallingTracker.tsx';
// // // import CandidateTracker from './pages/CandidateTracker.tsx';
// // // import PipelineDashboard from './pages/PipelineDashboard.tsx';
// // // import BusinessDevelopment from './pages/BusinessDevelopment.tsx';
// // // import Signup from './pages/Signup.tsx';
// // // import { GoogleOAuthProvider } from "@react-oauth/google";
// // // import ProtectedRoute from "./components/ProtectedRoute";
// // // import { isLoggedIn } from "./utils/auth";

// // // const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// // // createRoot(document.getElementById('root')!).render(
// // //   <StrictMode>
// // //     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
// // //       <BrowserRouter>
// // //         <Routes>
// // //           {/* ✅ Default route → Signup page */}
// // //           <Route
// // //             path="/"
// // //             element={
// // //               isLoggedIn() ? <Navigate to="/position-management" replace /> : <Signup />
// // //             }
// // //           />

// // //           {/* Main app or dashboard after login/signup */}
// // //           {/* <Route path="/dashboard" element={<App />} /> */}

// // //           {/* Other pages */}
// // //           <Route
// // //             path="/submission-management"
// // //             element={
// // //               <ProtectedRoute>
// // //                 <SubmissionManagementSystem />
// // //               </ProtectedRoute>
// // //             }
// // //           />
// // //           <Route
// // //             path="/candidate-management"
// // //             element={
// // //               <ProtectedRoute>
// // //                 <CandidateManagement />
// // //               </ProtectedRoute>
// // //             }
// // //           />
// // //           <Route
// // //             path="/position-management"
// // //             element={
// // //               <ProtectedRoute>
// // //                 <PositionManagement />
// // //               </ProtectedRoute>
// // //             }
// // //           />
// // //           {/* Detail view for a single position — same component, driven by the param */}
// // //           <Route
// // //             path="/position-management/:positionId"
// // //             element={
// // //               <ProtectedRoute>
// // //                 <PositionManagement />
// // //               </ProtectedRoute>
// // //             }
// // //           />
// // //           <Route path="/candidate-management/:id" element={<CandidateManagement />} />
// // //           <Route
// // //             path="/calling-tracker"
// // //             element={
// // //               <ProtectedRoute>
// // //                 <CallingTracker />
// // //               </ProtectedRoute>
// // //             }
// // //           />
// // //           <Route
// // //             path="/candidate-tracker"
// // //             element={
// // //               <ProtectedRoute>
// // //                 <CandidateTracker />
// // //               </ProtectedRoute>
// // //             }
// // //           />
// // //           <Route
// // //             path="/pipeline-dashboard"
// // //             element={
// // //               <ProtectedRoute>
// // //                 <PipelineDashboard />
// // //               </ProtectedRoute>
// // //             }
// // //           />
// // //            <Route path="/ai-matcher" element={<AIResumeMatcher />} />
// // //           {/* <Route path="/client-management" element={<ClientManagement />} />
// // //           <Route path="/whatsapp-tab" element={<WhatsAppMsgTab />} />
// // //           <Route path="/ai-matcher" element={<AIResumeMatcher />} />
// // //           <Route path="/offer-management" element={<OffersTab />} /> */}
// // //           <Route path="/signup" element={<Signup />} />
// // //           <Route path="/whatsapp-tab" element={<WhatsAppMsgTab />} />

// // //           {/* BD Module — wildcard catches all sub-routes */}
// // //           <Route
// // //             path="/bd/*"
// // //             element={
// // //               <ProtectedRoute>
// // //                 <BusinessDevelopment />
// // //               </ProtectedRoute>
// // //             }
// // //           />

// // //           {/* 404 page */}
// // //           <Route path="*" element={<div>Page Not Found</div>} />
// // //         </Routes>
// // //       </BrowserRouter>
// // //     </GoogleOAuthProvider>
// // //   </StrictMode>
// // // );


// // // import { StrictMode } from 'react';
// // // import { createRoot } from 'react-dom/client';
// // // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // // import './index.css';
// // // import App from './App.tsx';
// // // import CandidateManagement from './pages/CandidateManagement.tsx';
// // // import SubmissionManagementSystem from './pages/SubmissionManagementSystem.tsx';
// // // import PositionManagement from './pages/PositionManagement.tsx';
// // // import ClientManagement from './pages/ClientManagement.tsx';
// // // import WhatsAppMsgTab from './pages/WhatsAppMsgTabNew';
// // // import AIResumeMatcher from './pages/AIResumeMatcher.tsx';
// // // import OffersTab from './pages/OfferManagement.tsx';
// // // import Signup from './pages/Signup.tsx';
// // // import { GoogleOAuthProvider } from "@react-oauth/google";
// // // import ProtectedRoute from "./components/ProtectedRoute";
// // // import { isLoggedIn } from "./utils/auth";

// // // const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// // // createRoot(document.getElementById('root')!).render(
// // //   <StrictMode>
// // //     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
// // //       <BrowserRouter>
// // //         <Routes>
// // //           {/* ✅ Default route → Signup page */}
// // //           <Route
// // //             path="/"
// // //             element={
// // //               isLoggedIn() ? <Navigate to="/position-management" replace /> : <Signup />
// // //             }
// // //           />

// // //           {/* Main app or dashboard after login/signup */}
// // //           {/* <Route path="/dashboard" element={<App />} /> */}

// // //           {/* Other pages */}
// // //           <Route
// // //             path="/submission-management"
// // //             element={
// // //               <ProtectedRoute>
// // //                 <SubmissionManagementSystem />
// // //               </ProtectedRoute>
// // //             }
// // //           />
// // //           <Route
// // //             path="/candidate-management"
// // //             element={
// // //               <ProtectedRoute>
// // //                 <CandidateManagement />
// // //               </ProtectedRoute>
// // //             }
// // //           />
// // //           <Route
// // //             path="/position-management"
// // //             element={
// // //               <ProtectedRoute>
// // //                 <PositionManagement />
// // //               </ProtectedRoute>
// // //             }
// // //           />
// // //            <Route path="/ai-matcher" element={<AIResumeMatcher />} />
// // //           {/* <Route path="/client-management" element={<ClientManagement />} />
// // //           <Route path="/whatsapp-tab" element={<WhatsAppMsgTab />} />
// // //           <Route path="/ai-matcher" element={<AIResumeMatcher />} />
// // //           <Route path="/offer-management" element={<OffersTab />} /> */}
// // //           <Route path="/signup" element={<Signup />} />
// // //           <Route path="/whatsapp-tab" element={<WhatsAppMsgTab />} />

// // //           {/* 404 page */}
// // //           <Route path="*" element={<div>Page Not Found</div>} />
// // //         </Routes>
// // //       </BrowserRouter>
// // //     </GoogleOAuthProvider>
// // //   </StrictMode>
// // // );


// // import { StrictMode } from 'react';
// // import { createRoot } from 'react-dom/client';
// // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // import './index.css';
// // import App from './App.tsx';
// // import CandidateManagement from './pages/CandidateManagement.tsx';
// // import SubmissionManagementSystem from './pages/SubmissionManagementSystem.tsx';
// // import PositionManagement from './pages/PositionManagement.tsx';
// // import ClientManagement from './pages/ClientManagement.tsx';
// // import WhatsAppMsgTab from './pages/WhatsAppMsgTabNew';
// // import AIResumeMatcher from './pages/AIResumeMatcher.tsx';
// // import OffersTab from './pages/OfferManagement.tsx';
// // import CallingTracker from './pages/CallingTracker.tsx';
// // import CandidateTracker from './pages/CandidateTracker.tsx';
// // import PipelineDashboard from './pages/PipelineDashboard.tsx';
// // import BusinessDevelopment from './pages/BusinessDevelopment.tsx';
// // import CRMModule from './pages/CRMModule.tsx';
// // import Signup from './pages/Signup.tsx';
// // import { GoogleOAuthProvider } from "@react-oauth/google";
// // import ProtectedRoute from "./components/ProtectedRoute";
// // import { isLoggedIn } from "./utils/auth";

// // const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// // createRoot(document.getElementById('root')!).render(
// //   <StrictMode>
// //     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
// //       <BrowserRouter>
// //         <Routes>
// //           {/* ✅ Default route → Signup page */}
// //           <Route
// //             path="/"
// //             element={
// //               isLoggedIn() ? <Navigate to="/position-management" replace /> : <Signup />
// //             }
// //           />

// //           {/* Main app or dashboard after login/signup */}
// //           {/* <Route path="/dashboard" element={<App />} /> */}

// //           {/* Other pages */}
// //           <Route
// //             path="/submission-management"
// //             element={
// //               <ProtectedRoute>
// //                 <SubmissionManagementSystem />
// //               </ProtectedRoute>
// //             }
// //           />
// //           <Route
// //             path="/candidate-management"
// //             element={
// //               <ProtectedRoute>
// //                 <CandidateManagement />
// //               </ProtectedRoute>
// //             }
// //           />
// //           <Route
// //             path="/position-management"
// //             element={
// //               <ProtectedRoute>
// //                 <PositionManagement />
// //               </ProtectedRoute>
// //             }
// //           />
// //           {/* Detail view for a single position — same component, driven by the param */}
// //           <Route
// //             path="/position-management/:positionId"
// //             element={
// //               <ProtectedRoute>
// //                 <PositionManagement />
// //               </ProtectedRoute>
// //             }
// //           />
// //           <Route path="/candidate-management/:id" element={<CandidateManagement />} />
// //           <Route
// //             path="/calling-tracker"
// //             element={
// //               <ProtectedRoute>
// //                 <CallingTracker />
// //               </ProtectedRoute>
// //             }
// //           />
// //           <Route
// //             path="/candidate-tracker"
// //             element={
// //               <ProtectedRoute>
// //                 <CandidateTracker />
// //               </ProtectedRoute>
// //             }
// //           />
// //           <Route
// //             path="/pipeline-dashboard"
// //             element={
// //               <ProtectedRoute>
// //                 <PipelineDashboard />
// //               </ProtectedRoute>
// //             }
// //           />
// //            <Route path="/ai-matcher" element={<AIResumeMatcher />} />
// //           {/* <Route path="/client-management" element={<ClientManagement />} />
// //           <Route path="/whatsapp-tab" element={<WhatsAppMsgTab />} />
// //           <Route path="/ai-matcher" element={<AIResumeMatcher />} />
// //           <Route path="/offer-management" element={<OffersTab />} /> */}
// //           <Route path="/signup" element={<Signup />} />
// //           <Route path="/whatsapp-tab" element={<WhatsAppMsgTab />} />

// //           {/* BD Module — wildcard catches all sub-routes */}
// //           <Route
// //             path="/bd/*"
// //             element={
// //               <ProtectedRoute>
// //                 <BusinessDevelopment />
// //               </ProtectedRoute>
// //             }
// //           />

// //           {/* CRM Module — wildcard catches all sub-routes */}
// //           <Route
// //             path="/crm/*"
// //             element={
// //               <ProtectedRoute>
// //                 <CRMModule />
// //               </ProtectedRoute>
// //             }
// //           />

// //           {/* 404 page */}
// //           <Route path="*" element={<div>Page Not Found</div>} />
// //         </Routes>
// //       </BrowserRouter>
// //     </GoogleOAuthProvider>
// //   </StrictMode>
// // );




// // import { StrictMode } from 'react';
// // import { createRoot } from 'react-dom/client';
// // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // import './index.css';
// // import App from './App.tsx';
// // import CandidateManagement from './pages/CandidateManagement.tsx';
// // import SubmissionManagementSystem from './pages/SubmissionManagementSystem.tsx';
// // import PositionManagement from './pages/PositionManagement.tsx';
// // import ClientManagement from './pages/ClientManagement.tsx';
// // import WhatsAppMsgTab from './pages/WhatsAppMsgTabNew';
// // import AIResumeMatcher from './pages/AIResumeMatcher.tsx';
// // import OffersTab from './pages/OfferManagement.tsx';
// // import Signup from './pages/Signup.tsx';
// // import { GoogleOAuthProvider } from "@react-oauth/google";
// // import ProtectedRoute from "./components/ProtectedRoute";
// // import { isLoggedIn } from "./utils/auth";

// // const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// // createRoot(document.getElementById('root')!).render(
// //   <StrictMode>
// //     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
// //       <BrowserRouter>
// //         <Routes>
// //           {/* ✅ Default route → Signup page */}
// //           <Route
// //             path="/"
// //             element={
// //               isLoggedIn() ? <Navigate to="/position-management" replace /> : <Signup />
// //             }
// //           />

// //           {/* Main app or dashboard after login/signup */}
// //           {/* <Route path="/dashboard" element={<App />} /> */}

// //           {/* Other pages */}
// //           <Route
// //             path="/submission-management"
// //             element={
// //               <ProtectedRoute>
// //                 <SubmissionManagementSystem />
// //               </ProtectedRoute>
// //             }
// //           />
// //           <Route
// //             path="/candidate-management"
// //             element={
// //               <ProtectedRoute>
// //                 <CandidateManagement />
// //               </ProtectedRoute>
// //             }
// //           />
// //           <Route
// //             path="/position-management"
// //             element={
// //               <ProtectedRoute>
// //                 <PositionManagement />
// //               </ProtectedRoute>
// //             }
// //           />
// //            <Route path="/ai-matcher" element={<AIResumeMatcher />} />
// //           {/* <Route path="/client-management" element={<ClientManagement />} />
// //           <Route path="/whatsapp-tab" element={<WhatsAppMsgTab />} />
// //           <Route path="/ai-matcher" element={<AIResumeMatcher />} />
// //           <Route path="/offer-management" element={<OffersTab />} /> */}
// //           <Route path="/signup" element={<Signup />} />
// //           <Route path="/whatsapp-tab" element={<WhatsAppMsgTab />} />

// //           {/* 404 page */}
// //           <Route path="*" element={<div>Page Not Found</div>} />
// //         </Routes>
// //       </BrowserRouter>
// //     </GoogleOAuthProvider>
// //   </StrictMode>
// // );




// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import './index.css';
// import App from './App.tsx';
// import CandidateManagement from './pages/CandidateManagement.tsx';
// import SubmissionManagementSystem from './pages/SubmissionManagementSystem.tsx';
// import PositionManagement from './pages/PositionManagement.tsx';
// import ClientManagement from './pages/ClientManagement.tsx';
// import WhatsAppMsgTab from './pages/WhatsAppMsgTabNew';
// import AIResumeMatcher from './pages/AIResumeMatcher.tsx';
// import OffersTab from './pages/OfferManagement.tsx';
// import CallingTracker from './pages/CallingTracker.tsx';
// import CandidateTracker from './pages/CandidateTracker.tsx';
// import PipelineDashboard from './pages/PipelineDashboard.tsx';
// import BusinessDevelopment from './pages/BusinessDevelopment.tsx';
// import CRMModule from './pages/CRMModule.tsx';
// import ReportsModule from './pages/ReportsModule.tsx';
// import Signup from './pages/Signup.tsx';
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import ProtectedRoute from "./components/ProtectedRoute";
// import { isLoggedIn } from "./utils/auth";
// import SubmissionGroupDetail from './pages/SubmissionGroupDetail.tsx'
// import SubmissionGroupDetailView from './pages/SubmissionGroupDetailView.tsx'


// const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
//       <BrowserRouter>
//         <Routes>
//           {/* ✅ Default route → Signup page */}
//           <Route
//             path="/"
//             element={
//               isLoggedIn() ? <Navigate to="/pipeline-dashboard" replace /> : <Signup />
//             }
//           />

//           {/* Main app or dashboard after login/signup */}
//           {/* <Route path="/dashboard" element={<App />} /> */}

//           {/* Other pages */}
//           <Route
//             path="/submission-management"
//             element={
//               <ProtectedRoute>
//                 <SubmissionManagementSystem />
//               </ProtectedRoute>
//             }
//           />

//            <Route path="/submission-group-detail" element={
//             <ProtectedRoute>
//             <SubmissionGroupDetail />
//             </ProtectedRoute>
//           }
//              /> 
//           <Route path="/submission-group-detail/:candidateId" element={
//             <ProtectedRoute>
//               <SubmissionGroupDetailView />
//             </ProtectedRoute>
//           } />

//           <Route
//             path="/candidate-management"
//             element={
//               <ProtectedRoute>
//                 <CandidateManagement />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/position-management"
//             element={
//               <ProtectedRoute>
//                 <PositionManagement />
//               </ProtectedRoute>
//             }
//           />
//           {/* Detail view for a single position — same component, driven by the param */}
//           <Route
//             path="/position-management/:positionId"
//             element={
//               <ProtectedRoute>
//                 <PositionManagement />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/candidate-management/:id" element={<CandidateManagement />} />
//           <Route
//             path="/calling-tracker"
//             element={
//               <ProtectedRoute>
//                 <CallingTracker />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/candidate-tracker"
//             element={
//               <ProtectedRoute>
//                 <CandidateTracker />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/pipeline-dashboard"
//             element={
//               <ProtectedRoute>
//                 <PipelineDashboard />
//               </ProtectedRoute>
//             }
//           />
//            <Route path="/ai-matcher" element={<AIResumeMatcher />} />
//           {/* <Route path="/client-management" element={<ClientManagement />} />
//           <Route path="/whatsapp-tab" element={<WhatsAppMsgTab />} />
//           <Route path="/ai-matcher" element={<AIResumeMatcher />} />
//           <Route path="/offer-management" element={<OffersTab />} /> */}
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/whatsapp-tab" element={<WhatsAppMsgTab />} />

//           {/* BD Module — wildcard catches all sub-routes */}
//           <Route
//             path="/bd/*"
//             element={
//               <ProtectedRoute>
//                 <BusinessDevelopment />
//               </ProtectedRoute>
//             }
//           />

//           {/* CRM Module — wildcard catches all sub-routes */}
//           <Route
//             path="/crm/*"
//             element={
//               <ProtectedRoute>
//                 <CRMModule />
//               </ProtectedRoute>
//             }
//           />

//           {/* Reports Module — wildcard catches all sub-routes */}
//           <Route
//             path="/reports/*"
//             element={
//               <ProtectedRoute>
//                 <ReportsModule />
//               </ProtectedRoute>
//             }
//           />

//           {/* 404 page */}
//           <Route path="*" element={<div>Page Not Found</div>} />
//         </Routes>
//       </BrowserRouter>
//     </GoogleOAuthProvider>
//   </StrictMode>
// );





import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import CandidateManagement from './pages/CandidateManagement.tsx';
import SubmissionManagementSystem from './pages/SubmissionManagementSystem.tsx';
import PositionManagement from './pages/PositionManagement.tsx';
import ClientManagement from './pages/ClientManagement.tsx';
import WhatsAppMsgTab from './pages/WhatsAppMsgTabNew.tsx';
import AIResumeMatcher from './pages/AIResumeMatcher.tsx';
import OffersTab from './pages/OfferManagement.tsx';
import CallingTracker from './pages/CallingTracker.tsx';
import CandidateTracker from './pages/CandidateTracker.tsx';
import PipelineDashboard from './pages/PipelineDashboard.tsx';
import BusinessDevelopment from './pages/BusinessDevelopment.tsx';
import CRMModule from './pages/CRMModule.tsx';
import ReportsModule from './pages/ReportsModule.tsx';
import Signup from './pages/Signup.tsx';
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProtectedRoute from "./components/ProtectedRoute";
import { isLoggedIn } from "./utils/auth";
import SubmissionGroupDetail from './pages/SubmissionGroupDetail.tsx'
import SubmissionGroupDetailView from './pages/SubmissionGroupDetailView.tsx'


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          {/* ✅ Default route → Signup page */}
          <Route
            path="/"
            element={
              isLoggedIn() ? <Navigate to="/pipeline-dashboard" replace /> : <Signup />
            }
          />

          {/* Main app or dashboard after login/signup */}
          {/* <Route path="/dashboard" element={<App />} /> */}

          {/* Other pages */}
          <Route
  path="/submission-management"
  element={<ProtectedRoute><SubmissionManagementSystem /></ProtectedRoute>}
/>
<Route
  path="/submission-management/:groupSlug"
  element={<ProtectedRoute><SubmissionGroupDetail /></ProtectedRoute>}
/>
<Route
  path="/submission-management/:groupSlug/:submissionId"
  element={<ProtectedRoute><SubmissionGroupDetailView /></ProtectedRoute>}
/>
          <Route
            path="/candidate-management"
            element={
              <ProtectedRoute>
                <CandidateManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/position-management"
            element={
              <ProtectedRoute>
                <PositionManagement />
              </ProtectedRoute>
            }
          />
          {/* Detail view for a single position — same component, driven by the param */}
          <Route
            path="/position-management/:positionId"
            element={
              <ProtectedRoute>
                <PositionManagement />
              </ProtectedRoute>
            }
          />
          <Route path="/candidate-management/:id" element={<CandidateManagement />} />
          <Route
            path="/calling-tracker"
            element={
              <ProtectedRoute>
                <CallingTracker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate-tracker"
            element={
              <ProtectedRoute>
                <CandidateTracker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pipeline-dashboard"
            element={
              <ProtectedRoute>
                <PipelineDashboard />
              </ProtectedRoute>
            }
          />
           <Route path="/ai-matcher" element={<AIResumeMatcher />} />
          {/* <Route path="/client-management" element={<ClientManagement />} />
          <Route path="/whatsapp-tab" element={<WhatsAppMsgTab />} />
          <Route path="/ai-matcher" element={<AIResumeMatcher />} />
          <Route path="/offer-management" element={<OffersTab />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/whatsapp-tab" element={<WhatsAppMsgTab />} />

          {/* BD Module — wildcard catches all sub-routes */}
          <Route
            path="/bd/*"
            element={
              <ProtectedRoute>
                <BusinessDevelopment />
              </ProtectedRoute>
            }
          />

          {/* CRM Module — wildcard catches all sub-routes */}
          <Route
            path="/crm/*"
            element={
              <ProtectedRoute>
                <CRMModule />
              </ProtectedRoute>
            }
          />

          {/* Reports Module — wildcard catches all sub-routes */}
          <Route
            path="/reports/*"
            element={
              <ProtectedRoute>
                <ReportsModule />
              </ProtectedRoute>
            }
          />

          {/* 404 page */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);