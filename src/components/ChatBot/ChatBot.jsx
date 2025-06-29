import React, { useState, useEffect } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import 'aos/dist/aos.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'bot', message: '🤖: Hello! I am your AI Assistant. Ask me anything about NeuroNest!' },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', message: input };
      setChatLog((prev) => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);

      try {
        const response = await axios.post('http://localhost:8000/api/a2/ai-response/chat', { message: input });
        const botResponse = response.data?.data?.response || "Hmm... I didn’t get that!";
        setChatLog((prev) => [...prev, { sender: 'bot', message: `🤖: ${botResponse}` }]);
      } catch (err) {
        setChatLog((prev) => [...prev, { sender: 'bot', message: '🤖: Something went wrong. Try again later.' }]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        onClick={toggleChat}
        className="bg-gradient-to-br from-cyan-500 to-pink-500 w-14 h-14 text-white rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300 flex items-center justify-center"
      >
        {isOpen ? <FaTimes className="text-xl" /> : <FaRobot className="text-xl" />}
      </div>

      {isOpen && (
        <div className="mt-4 w-80 sm:w-96 max-h-[500px] flex flex-col bg-[#0f0f1b] text-white border border-cyan-400/20 rounded-2xl shadow-xl animate-fadeInUp overflow-hidden">
          <div className="bg-gradient-to-r from-[#1a1a2e] to-[#0f0f1b] p-4 text-center text-cyan-300 font-semibold text-sm border-b border-cyan-500/10">
            👋 Welcome to NeuroNest Chat
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-gray-900">
            {chatLog.map((log, i) => (
              <div key={i} className={`my-2 flex ${log.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 text-sm rounded-lg shadow-md
                    ${log.sender === 'user' ? 'bg-cyan-600 text-white' : 'bg-white/10 text-gray-100'}`}>
                  {log.message}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-left mb-2">
                <span className="inline-block px-4 py-2 bg-white/10 text-cyan-200 text-sm rounded-lg animate-pulse">
                  Typing...
                </span>
              </div>
            )}
          </div>

          <div className="flex border-t border-cyan-400/10 p-3 bg-[#111827]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask something..."
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder-gray-400 px-2"
            />
            <button
              onClick={handleSend}
              className="bg-cyan-600 text-white px-3 py-1 rounded-md hover:bg-pink-600 transition-all text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
