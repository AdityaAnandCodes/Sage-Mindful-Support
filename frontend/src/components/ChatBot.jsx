import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Brain, Send, Moon, Sun } from "lucide-react";
import { gsap } from "gsap";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hi there. I'm Sage, your compassionate AI companion. How are you feeling today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const [isThinking, setIsThinking] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    // Animate new messages
    if (messageContainerRef.current) {
      const lastMessage = messageContainerRef.current.lastChild;
      if (lastMessage) {
        gsap.fromTo(
          lastMessage,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }
    }
  }, [messages]);

  // Navbar animation
  useEffect(() => {
    gsap.fromTo(
      "nav",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
  }, []);

  // Input field animation
  useEffect(() => {
    gsap.fromTo(
      "input[type='text']",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, delay: 0.5, ease: "elastic.out(1, 0.5)" }
    );
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: "user", content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    setIsThinking(true); // Start thinking animation

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: inputMessage,
      });
      const aiMessage = { role: "ai", content: response.data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        role: "ai",
        content: "I'm experiencing some technical difficulties. Would you like to try again?",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsThinking(false); // Stop thinking animation
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col relative ${
        darkMode ? "bg-gray-950 text-white" : "bg-gradient-to-br from-indigo-50 to-white"
      }`}
    >
      <nav className="p-4 shadow-sm flex items-center justify-between">
        <a href="/">
          <div className="flex items-center space-x-3">
            <Brain className={`text-indigo-600 ${darkMode ? "text-white" : ""}`} size={28} />
            <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-indigo-800"}`}>
              Sage
            </h1>
          </div>
        </a>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-gray-900 transition"
        >
          {darkMode ?  '☀️' : '🌙'}
        </button>
      </nav>

      <div className="flex-grow container mx-auto max-w-2xl px-4 py-8 flex flex-col">
        <div
          ref={messageContainerRef}
          className={`flex-grow rounded-xl shadow-lg p-6 overflow-y-auto space-y-4 mb-4 ${
            darkMode ? "bg-gray-900" : "bg-white"
          }`}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg max-w-[80%] ${
                msg.role === "user"
                  ? `ml-auto ${darkMode ? "bg-indigo-700" : "bg-indigo-50"}`
                  : `mr-auto ${darkMode ? "bg-indigo-600" : "bg-indigo-100"}`
              }`}
            >
              {msg.content}
            </div>
          ))}

          {/* Thinking Animation */}
          {isThinking && (
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-indigo-600 rounded-full animate-bounce"></div>
              <div className="h-3 w-3 bg-indigo-600 rounded-full animate-bounce delay-75"></div>
              <div className="h-3 w-3 bg-indigo-600 rounded-full animate-bounce delay-150"></div>
              <span className="ml-2 text-indigo-600 animate-pulse">Sage is thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className={`flex-grow border rounded-full px-4 py-2 focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-800 text-white border-gray-700 focus:ring-gray-500"
                : "border-indigo-200 focus:ring-indigo-500"
            }`}
            placeholder="Share your thoughts with Sage..."
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
