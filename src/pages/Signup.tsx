import React from "react";
// import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import apiManager from "../api/apiManager";

const SignupPage: React.FC = () => {
  // const [activeTab, setActiveTab] = useState<"signup" | "login">("signup");
  const navigate = useNavigate();

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value);
  // };

  // Google login handler
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received from Google");
      }

      const response = await apiManager.post<{ data: { token: string; email: string; refreshToken: string } }>(
        "/api/auth/recruiter/google-login",
        { idToken: credentialResponse.credential }
      );

    
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);
     
      localStorage.setItem("refreshToken", response.data.refreshToken);
      alert(`Google login successful for ${response.data.email}`);

      navigate("/pipeline-dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message);
      else alert("Google login failed!");
    }
  };

  const handleGoogleError = () => {
    alert("Google login failed!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-white shadow-md rounded-2xl p-8 w-[90%] max-w-md">
        {/* Welcome Text */}
        <h1 className="text-3xl font-bold text-center text-blue-600">Welcome</h1>
        <p className="text-center text-gray-500 mb-6">
          Sign in with Google to get started
        </p>

        {/* Tabs - COMMENTED OUT */}
        {/* <div className="flex mb-6">
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2 font-medium rounded-lg transition-all ${
              activeTab === "signup"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 font-medium rounded-lg transition-all ${
              activeTab === "login"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Login
          </button>
        </div> */}

        {/* Form Fields - COMMENTED OUT */}
        {/* {activeTab === "signup" ? (
          <form className="space-y-4">
            <div>
              <label className="text-gray-600 block mb-1">Email</label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <AiOutlineMail className="text-gray-400 text-xl mr-2" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-600 block mb-1">Create Password</label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <AiOutlineLock className="text-gray-400 text-xl mr-2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-600 block mb-1">Confirm Password</label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <AiOutlineLock className="text-gray-400 text-xl mr-2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
            >
              Sign Up
            </button>
          </form>
        ) : (
          <form className="space-y-4">
            <div>
              <label className="text-gray-600 block mb-1">Email</label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <AiOutlineMail className="text-gray-400 text-xl mr-2" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-600 block mb-1">Password</label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <AiOutlineLock className="text-gray-400 text-xl mr-2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>
            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
            >
              Login
            </button>
          </form>
        )} */}

        {/* Divider - COMMENTED OUT */}
        {/* <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div> */}

        {/* Google login - ACTIVE */}
        <div className="w-full flex justify-center mt-8">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap={false}
            theme="outline"
            size="large"
            text="signin_with"
            width="384"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;