import { useState, useMemo, useEffect } from "react";
import {
  Send,
  MessageCircle,
  User,
  Clock,
  Search,
  Filter,
  X,
  ChevronDown,
  Loader2,
} from "lucide-react";
import Header from "../components/Header";
import { whatsappService } from "../services/WhatsAppServiceNew";
import type { ConversationSummary, ConversationMessage } from "../services/whatsapp-service";

// Local conversation type for UI state
interface LocalConversation {
  id: string;
  senderName: string;
  senderPhone: string;
  template: string;
  status: string;
  lastMessage: string;
  lastTimestamp: string;
  messageCount: number;
  newMessage: string;
  messages: LocalMessage[];
}

interface LocalMessage {
  id: number;
  text: string;
  timestamp: string;
  sender: string;
  type: "received" | "sent";
}

const WhatsAppMsgTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    senderName: "",
    template: "",
    status: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<LocalConversation | null>(null);
  const [conversations, setConversations] = useState<LocalConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch conversations on mount
  useEffect(() => {
    fetchConversations();
  }, []);

  // Fetch all conversations summary
  const fetchConversations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await whatsappService.getConversationsSummary();
      
      // Transform API data to local format
      const transformedConversations: LocalConversation[] = data.map((conv) => {
        const lastReply = conv.whatsappReplies[0];
        const recruiterReply = conv.recruiterFirstMessage;
        return {
          id: conv.id,
          senderName: conv.name || "Unknown",
          senderPhone: conv.phone || "",
          template: recruiterReply?.message || "Unknown", // You can enhance this based on your needs
          status: "Active", // You can enhance this based on your needs
          lastMessage: lastReply?.message || "No messages yet",
          lastTimestamp: lastReply?.createdTime 
            ? new Date(lastReply.createdTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "",
          messageCount: 0, // Will be updated when conversation is opened
          newMessage: "",
          messages: [],
        };
      });

      setConversations(transformedConversations);
    } catch (err: any) {
      setError(err.message || "Failed to load conversations");
      console.error("Error fetching conversations:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages for a specific conversation
  const fetchConversationMessages = async (applicantId: string) => {
    try {
      setLoadingMessages(true);
      const messages = await whatsappService.getConversationMessages(applicantId);
      
      // Transform API messages to local format
      const transformedMessages: LocalMessage[] = messages.map((msg, index) => ({
        id: index + 1,
        text: msg.message,
        timestamp: new Date(msg.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: msg.sender === "recruiter" ? "You" : "Candidate",
        type: msg.sender === "recruiter" ? "sent" : "received",
      }));

      // Update the conversation with messages
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === applicantId
            ? {
                ...conv,
                messages: transformedMessages,
                messageCount: transformedMessages.length,
              }
            : conv
        )
      );

      // Update selected conversation if it's the current one
      setSelectedConversation((prev) =>
        prev && prev.id === applicantId
          ? {
              ...prev,
              messages: transformedMessages,
              messageCount: transformedMessages.length,
            }
          : prev
      );
    } catch (err: any) {
      console.error("Error fetching messages:", err);
      setError(err.message || "Failed to load messages");
    } finally {
      setLoadingMessages(false);
    }
  };

  // Handle conversation selection
  const handleConversationClick = async (conversation: LocalConversation) => {
    setSelectedConversation(conversation);
    
    // Fetch messages if not already loaded
    if (conversation.messages.length === 0) {
      await fetchConversationMessages(conversation.id);
    }
  };

  // Filter conversations
  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      const matchesSearch =
        searchTerm === "" ||
        conversation.senderName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        conversation.senderPhone
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        conversation.template
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        conversation.lastMessage
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesFilters =
        conversation.senderName
          .toLowerCase()
          .includes(filters.senderName.toLowerCase()) &&
        conversation.template
          .toLowerCase()
          .includes(filters.template.toLowerCase()) &&
        conversation.status
          .toLowerCase()
          .includes(filters.status.toLowerCase());

      return matchesSearch && matchesFilters;
    });
  }, [searchTerm, filters, conversations]);

  const handleMessageChange = (id: string, value: string) => {
    setConversations(
      conversations.map((conv) =>
        conv.id === id ? { ...conv, newMessage: value } : conv
      )
    );
    
    if (selectedConversation && selectedConversation.id === id) {
      setSelectedConversation({ ...selectedConversation, newMessage: value });
    }
  };

  const handleSend = async (id: string) => {
    const conversation = conversations.find((conv) => conv.id === id);
    if (!conversation || !conversation.newMessage.trim()) {
      return;
    }

    try {
      setSendingMessage(true);
      
      // Send message via API
      await whatsappService.sendWhatsappMessage(id, conversation.newMessage.trim());

      // Create optimistic message update
      const newMessage: LocalMessage = {
        id: conversation.messages.length + 1,
        text: conversation.newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "You",
        type: "sent",
      };

      // Update conversations state
      setConversations(
        conversations.map((conv) =>
          conv.id === id
            ? {
                ...conv,
                messages: [...conv.messages, newMessage],
                lastMessage: newMessage.text,
                lastTimestamp: newMessage.timestamp,
                messageCount: conv.messageCount + 1,
                newMessage: "",
              }
            : conv
        )
      );

      // Update selected conversation
      if (selectedConversation && selectedConversation.id === id) {
        setSelectedConversation({
          ...selectedConversation,
          messages: [...selectedConversation.messages, newMessage],
          lastMessage: newMessage.text,
          lastTimestamp: newMessage.timestamp,
          messageCount: selectedConversation.messageCount + 1,
          newMessage: "",
        });
      }
    } catch (err: any) {
      console.error("Error sending message:", err);
      setError(err.message || "Failed to send message");
    } finally {
      setSendingMessage(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Active: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Closed: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getTemplateColor = (template: string) => {
    const colors: Record<string, string> = {
      "Profile Submitted": "bg-blue-100 text-blue-800",
      "Job Alert": "bg-yellow-100 text-yellow-800",
      "CTC Check": "bg-green-100 text-green-800",
      "Recommended Mandate": "bg-purple-100 text-purple-800",
    };
    return colors[template] || "bg-gray-100 text-gray-800";
  };

  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 20;
  const totalPages = Math.ceil(filteredConversations.length / candidatesPerPage);
  const startIndex = (currentPage - 1) * candidatesPerPage;
  const currentCandidates = filteredConversations.slice(
    startIndex,
    startIndex + candidatesPerPage
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-3">
                <MessageCircle size={24} className="text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  WhatsApp Conversations
                </h2>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-md mx-4">
                <div className="relative">
                  <Search
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Search conversations, names, templates..."
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Filters */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
              >
                <Filter size={16} />
                Filters
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sender Name
                    </label>
                    <input
                      type="text"
                      value={filters.senderName}
                      onChange={(e) =>
                        setFilters({ ...filters, senderName: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Filter by sender..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Template
                    </label>
                    <input
                      type="text"
                      value={filters.template}
                      onChange={(e) =>
                        setFilters({ ...filters, template: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Filter by template..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <input
                      type="text"
                      value={filters.status}
                      onChange={(e) =>
                        setFilters({ ...filters, status: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Filter by status..."
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4 flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="bg-white rounded-lg shadow-sm p-12 flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="animate-spin h-8 w-8 text-green-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading conversations...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Conversations Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Template
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Message
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Messages
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quick Reply
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentCandidates.map((conversation) => (
                        <tr
                          key={conversation.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleConversationClick(conversation)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <User size={20} className="text-green-600" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {conversation.senderName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {conversation.senderPhone}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTemplateColor(
                                conversation.template
                              )}`}
                            >
                              {conversation.template}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                conversation.status
                              )}`}
                            >
                              {conversation.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="max-w-xs truncate text-sm text-gray-900">
                              {conversation.lastMessage}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock size={16} />
                              <span className="text-sm">
                                {conversation.lastTimestamp}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                              {conversation.messageCount} messages
                            </span>
                          </td>
                          <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex gap-2 max-w-xs">
                              <input
                                type="text"
                                placeholder="Type message..."
                                value={conversation.newMessage}
                                onChange={(e) =>
                                  handleMessageChange(
                                    conversation.id,
                                    e.target.value
                                  )
                                }
                                disabled={sendingMessage}
                                className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm disabled:bg-gray-100"
                                onKeyPress={(e) => {
                                  if (e.key === "Enter" && !sendingMessage) {
                                    handleSend(conversation.id);
                                  }
                                }}
                              />
                              <button
                                onClick={() => handleSend(conversation.id)}
                                disabled={!conversation.newMessage.trim() || sendingMessage}
                                className={`p-2 rounded-md transition-colors ${
                                  conversation.newMessage.trim() && !sendingMessage
                                    ? "bg-green-600 hover:bg-green-700 text-white"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                              >
                                {sendingMessage ? (
                                  <Loader2 size={14} className="animate-spin" />
                                ) : (
                                  <Send size={14} />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {currentCandidates.length === 0 && !loading && (
                    <div className="text-center py-12 text-gray-500">
                      No conversations found
                    </div>
                  )}

                  <div className="px-6 py-3 border-t flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Showing {startIndex + 1} to{" "}
                      {Math.min(
                        startIndex + candidatesPerPage,
                        filteredConversations.length
                      )}{" "}
                      of {filteredConversations.length} candidates
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
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Footer */}
              <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total Contacts: {conversations.length}</span>
                  <span>
                    Total Messages:{" "}
                    {conversations.reduce(
                      (sum, conv) => sum + conv.messageCount,
                      0
                    )}
                  </span>
                  <span>
                    Active Conversations:{" "}
                    {conversations.filter((c) => c.status === "Active").length}
                  </span>
                  <span>Last Updated: {new Date().toLocaleString()}</span>
                </div>
              </div>
            </>
          )}

          {/* Chat Detail Modal */}
          {selectedConversation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
                <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <User size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {selectedConversation.senderName}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {selectedConversation.senderPhone}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6 max-h-96 overflow-y-auto">
                  {loadingMessages ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="animate-spin h-8 w-8 text-green-600" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedConversation.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.type === "sent"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.type === "sent"
                                ? "bg-green-600 text-white"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.type === "sent"
                                  ? "text-green-100"
                                  : "text-gray-500"
                              }`}
                            >
                              {message.sender} • {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 p-4">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={selectedConversation.newMessage}
                      onChange={(e) =>
                        handleMessageChange(
                          selectedConversation.id,
                          e.target.value
                        )
                      }
                      disabled={sendingMessage}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !sendingMessage) {
                          handleSend(selectedConversation.id);
                        }
                      }}
                    />
                    <button
                      onClick={() => handleSend(selectedConversation.id)}
                      disabled={!selectedConversation.newMessage.trim() || sendingMessage}
                      className={`px-6 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                        selectedConversation.newMessage.trim() && !sendingMessage
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {sendingMessage ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Send size={16} />
                      )}
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WhatsAppMsgTab;
