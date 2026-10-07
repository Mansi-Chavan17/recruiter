import apiManager from "../api/apiManager";
import { ENDPOINTS } from "../api/endpoints";

interface GoogleLoginResponse {
  token: string;
  email: string;
}

const authService = {
  recruiterGoogleLogin: async (idToken: string): Promise<GoogleLoginResponse> => {
    return await apiManager.post<GoogleLoginResponse>(ENDPOINTS.RECRUITER_GOOGLE_LOGIN, { idToken });
  },
};

export default authService;