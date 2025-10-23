import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Bot, Send, X, Loader2, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

const SocialNestChatbot = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      content:
        "🌿 Hello! I’m your SocialNest AI Assistant. I can help you explore community events, create social initiatives, and connect with volunteers making a difference. How can I assist you today? 🤝",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const quickQuestions = [
    "How do I join a community event?",
    "How can I create my own social event?",
    "What is the purpose of SocialNest?",
    "How do I track my volunteer impact?",
    "How can organizations collaborate on SocialNest?",
  ];

  // Expose openModal method to parent component
  useImperativeHandle(ref, () => ({
    openModal: () => setIsOpen(true),
  }));

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      console.log("API Key:", import.meta.env.VITE_GEMINI_API_KEY);
      console.log(
        "Request URL:",
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`
      );
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `You are SocialNest AI Assistant — a friendly, professional, and community-driven chatbot built for the SocialNest platform.

SocialNest is a platform that empowers people to create, join, and manage social development events in their local communities. It connects volunteers, organizations, and individuals passionate about positive change.

Your role:
- Help users understand SocialNest features
- Guide users on how to create or join events
- Suggest ways to volunteer and track their impact
- Share motivational and community-focused responses

Keep your tone warm, inclusive, and inspiring. Use short, clear sentences. Occasionally use emojis to make the conversation friendly and human-like.

User’s question: ${userMessage}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      console.log("Response Status:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error Response:", errorText);
        if (response.status === 404) {
          throw new Error("Model not found. Update to a supported Gemini 2.x model (e.g., gemini-2.5-flash).");
        } else if (response.status === 403) {
          throw new Error("Invalid API key or API not enabled. Please check your configuration.");
        } else if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again later.");
        }
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("Response JSON:", data);
      const aiResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn’t get a response from the server. Please try again! 🌱";

      setMessages((prev) => [...prev, { role: "model", content: aiResponse }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      toast.error(error.message || "Failed to connect to the AI service. Please try again later.");
      setMessages((prev) => [
        ...prev,
        { role: "model", content: "Oops, something went wrong. Please try again! 🌱" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = async (question) => {
    setInput(question);
    await new Promise((resolve) => setTimeout(resolve, 0)); // Ensure state update
    sendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
          aria-label="Open SocialNest chatbot"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">Chat with SocialNest</span>
        </button>
      )}

      {isOpen && (
        <div className="w-[90vw] max-w-sm sm:max-w-md bg-white dark:bg-secondary-900 rounded-2xl shadow-2xl overflow-hidden border border-secondary-200 dark:border-secondary-700">
          <div className="bg-teal-600 text-white p-4 rounded-t-2xl shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 dark:bg-secondary-800/20 rounded-xl backdrop-blur-sm">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">SocialNest AI Assistant</h3>
                  <p className="text-xs text-white/90 flex items-center gap-1">
                    <span className="w-2 h-2 bg-primary-300 dark:bg-primary-500 rounded-full animate-pulse"></span>
                    Online • Ready to help
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 dark:hover:bg-secondary-800/20 rounded-lg transition-all duration-200 hover:rotate-90"
                aria-label="Close chatbot"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-secondary-50 dark:bg-secondary-800">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[80%] whitespace-pre-wrap break-words ${
                    msg.role === "user"
                      ? "bg-teal-600 text-white rounded-br-none"
                      : "bg-white dark:bg-secondary-800 text-secondary-800 dark:text-secondary-100 border border-secondary-200 dark:border-secondary-700 rounded-bl-none shadow-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-center items-center text-secondary-500 dark:text-secondary-400 text-sm gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-primary-500 dark:text-primary-400" />
                <span>SocialNest AI is thinking...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="flex flex-wrap gap-2 p-3 bg-secondary-100 dark:bg-secondary-800 border-t border-secondary-200 dark:border-secondary-700">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleQuickQuestion(q)}
                className="text-xs bg-white dark:bg-secondary-800 border border-secondary-300 dark:border-secondary-600 rounded-full px-3 py-1 hover:bg-primary-50 dark:hover:bg-primary-900 text-secondary-700 dark:text-secondary-200"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="p-3 border-t bg-white dark:bg-secondary-900 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 text-sm border border-secondary-300 dark:border-secondary-600 rounded-xl focus:ring-2 focus:ring-primary-500/50 dark:focus:ring-primary-400/50 focus:outline-none bg-white dark:bg-secondary-800 text-secondary-800 dark:text-secondary-100 placeholder-secondary-400 dark:placeholder-secondary-500"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              aria-label="Chat input"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className={`p-2 bg-teal-600 text-white rounded-xl hover:opacity-90 transition-all duration-200 ${
                loading || !input.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-secondary-50 dark:bg-secondary-800 text-xs text-center py-2 text-secondary-500 dark:text-secondary-400 border-t border-secondary-200 dark:border-secondary-700">
            Powered by{" "}
            <span className="bg-teal-600 bg-clip-text text-transparent font-semibold">
              SocialNest AI
            </span>
          </div>
        </div>
      )}
    </div>
  );
});

export default SocialNestChatbot;