// WhatsApp API Service
import apiClient from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";

// Types
export interface ConversationSummary {
  id: string;
  name: string;
  phone: string;
  whatsappReplies: Array<{
    message: string;
    createdTime: string;
  }>;
}

export interface ConversationMessage {
  sender: 'recruiter' | 'candidate';
  message: string;
  time: string;
}

export interface SendMessageRequest {
  applicantId: string;
  message: string;
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export const whatsappService = {
  /**
   * Fetch all conversation summaries for the logged-in recruiter
   */
  async getConversationsSummary(): Promise<ConversationSummary[]> {
    const response = await apiClient.get(ENDPOINTS.GET_CONVERSATIONS_SUMMARY);
    return response.data.data || [];
  },

  /**
   * Fetch full conversation messages with a specific applicant
   */
  async getConversationMessages(applicantId: string): Promise<ConversationMessage[]> {
    const response = await apiClient.get(
      ENDPOINTS.GET_CONVERSATION_MESSAGES(applicantId)
    );
    return response.data.data || [];
  },

  /**
   * Send a WhatsApp message to an applicant
   */
  async sendWhatsappMessage(
    applicantId: string,
    message: string
  ): Promise<SendMessageResponse> {
    const response = await apiClient.post(
      ENDPOINTS.SEND_WHATSAPP_MESSAGE,
      {
        applicantId,
        message,
      } as SendMessageRequest
    );
    return response.data;
  },
};