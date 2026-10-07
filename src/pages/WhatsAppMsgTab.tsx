import { useState, useMemo } from "react";
import {
  Send,
  MessageCircle,
  Phone,
  User,
  Clock,
  Search,
  Filter,
  Eye,
  X,
  ChevronDown,
} from "lucide-react";
import Header from "../components/Header";

const WhatsAppMsgTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    senderName: "",
    template: "",
    status: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([
    {
      id: 1,
      senderName: "John Doe",
      senderPhone: "+1 234-567-8901",
      template: "Profile Submitted",
      status: "Active",
      lastMessage: "Hey, how are you doing?",
      lastTimestamp: "2:30 PM",
      messageCount: 3,
      newMessage: "",
      messages: [
        {
          id: 1,
          text: "Hey, how are you doing?",
          timestamp: "2:30 PM",
          sender: "John Doe",
          type: "received",
        },
        {
          id: 2,
          text: "I'm doing great, thanks for asking!",
          timestamp: "2:32 PM",
          sender: "You",
          type: "sent",
        },
        {
          id: 3,
          text: "That's wonderful to hear!",
          timestamp: "2:35 PM",
          sender: "John Doe",
          type: "received",
        },
      ],
    },
    {
      id: 2,
      senderName: "Sarah Wilson",
      senderPhone: "+1 234-567-8902",
      template: "Job Alert",
      status: "Pending",
      lastMessage: "Thanks for the quick response!",
      lastTimestamp: "1:45 PM",
      messageCount: 1,
      newMessage: "",
      messages: [
        {
          id: 1,
          text: "Thanks for the quick response!",
          timestamp: "1:45 PM",
          sender: "Sarah Wilson",
          type: "received",
        },
      ],
    },
    {
      id: 3,
      senderName: "Mike Johnson",
      senderPhone: "+1 234-567-8903",
      template: "CTC Check",
      status: "Active",
      lastMessage: "Yes, I'll send you the agenda by tonight",
      lastTimestamp: "12:22 PM",
      messageCount: 7,
      newMessage: "",
      messages: [
        {
          id: 1,
          text: "Can we schedule a meeting?",
          timestamp: "12:10 PM",
          sender: "Mike Johnson",
          type: "received",
        },
        {
          id: 2,
          text: "Sure, when works for you?",
          timestamp: "12:12 PM",
          sender: "You",
          type: "sent",
        },
        {
          id: 3,
          text: "How about tomorrow at 2 PM?",
          timestamp: "12:15 PM",
          sender: "Mike Johnson",
          type: "received",
        },
        {
          id: 4,
          text: "Perfect! I'll send you the meeting link",
          timestamp: "12:16 PM",
          sender: "You",
          type: "sent",
        },
        {
          id: 5,
          text: "Great, looking forward to it",
          timestamp: "12:18 PM",
          sender: "Mike Johnson",
          type: "received",
        },
        {
          id: 6,
          text: "Should we prepare any specific agenda?",
          timestamp: "12:20 PM",
          sender: "Mike Johnson",
          type: "received",
        },
        {
          id: 7,
          text: "Yes, I'll send you the agenda by tonight",
          timestamp: "12:22 PM",
          sender: "You",
          type: "sent",
        },
      ],
    },
    {
      id: 4,
      senderName: "Emma Brown",
      senderPhone: "+1 234-567-8904",
      template: "Recommended Mandate",
      status: "Closed",
      lastMessage: "Thanks! I'll review them today",
      lastTimestamp: "11:30 AM",
      messageCount: 2,
      newMessage: "",
      messages: [
        {
          id: 1,
          text: "The project files are ready",
          timestamp: "11:25 AM",
          sender: "Emma Brown",
          type: "received",
        },
        {
          id: 2,
          text: "Thanks! I'll review them today",
          timestamp: "11:30 AM",
          sender: "You",
          type: "sent",
        },
      ],
    },
    {
      id: 5,
      senderName: "David Lee",
      senderPhone: "+1 234-567-8905",
      template: "Profile Submitted",
      status: "Active",
      lastMessage: "We should celebrate this success",
      lastTimestamp: "10:25 AM",
      messageCount: 5,
      newMessage: "",
      messages: [
        {
          id: 1,
          text: "Great job on the presentation!",
          timestamp: "10:15 AM",
          sender: "David Lee",
          type: "received",
        },
        {
          id: 2,
          text: "Thank you so much!",
          timestamp: "10:18 AM",
          sender: "You",
          type: "sent",
        },
        {
          id: 3,
          text: "The client was really impressed",
          timestamp: "10:20 AM",
          sender: "David Lee",
          type: "received",
        },
        {
          id: 4,
          text: "That's amazing news!",
          timestamp: "10:22 AM",
          sender: "You",
          type: "sent",
        },
        {
          id: 5,
          text: "We should celebrate this success",
          timestamp: "10:25 AM",
          sender: "David Lee",
          type: "received",
        },
      ],
    },
  ]);

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

  const handleMessageChange = (id, value) => {
    setConversations(
      conversations.map((conv) =>
        conv.id === id ? { ...conv, newMessage: value } : conv
      )
    );
  };

  const handleSend = (id) => {
    const conversation = conversations.find((conv) => conv.id === id);
    if (conversation && conversation.newMessage.trim()) {
      const newMessage = {
        id: conversation.messages.length + 1,
        text: conversation.newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "You",
        type: "sent",
      };

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
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Active: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Closed: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getTemplateColor = (template) => {
    const colors = {
      "Profile Submitted": "bg-blue-100 text-blue-800",
      "Job Alert": "bg-yellow-100 text-yellow-800",
      "CTC Check": "bg-green-100 text-green-800",
      "Recommended Mandate": "bg-purple-100 text-purple-800",
    };
    return colors[template] || "bg-gray-100 text-gray-800";
  };

  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 20;
  const totalPages = Math.ceil(conversations.length / candidatesPerPage);
  const startIndex = (currentPage - 1) * candidatesPerPage;
  const currentCandidates = conversations.slice(
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
                      className="hover:bg-gray-50"
                      onClick={() => setSelectedConversation(conversation)}
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
                      <td className="px-6 py-4">
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
                            className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleSend(conversation.id);
                              }
                            }}
                          />
                          {/* <button
                            onClick={() => handleSend(conversation.id)}
                            disabled={!conversation.newMessage.trim()}
                            className={`p-2 rounded-md transition-colors ${
                              conversation.newMessage.trim()
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            <Send size={14} />
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="px-6 py-3 border-t flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(
                    startIndex + candidatesPerPage,
                    conversations.length
                  )}{" "}
                  of {conversations.length} candidates
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
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSend(selectedConversation.id);
                        }
                      }}
                    />
                    <button
                      onClick={() => handleSend(selectedConversation.id)}
                      disabled={!selectedConversation.newMessage.trim()}
                      className={`px-6 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                        selectedConversation.newMessage.trim()
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <Send size={16} />
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
