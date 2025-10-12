"use client";
import MessageBubble from "@/components/MessageBubble";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { IoAdd, IoMenu, IoSend, IoSparkles } from "react-icons/io5";

const ChatPage = () => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push("/");
  }, [isLoaded, isSignedIn, router]);

  const endRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string }[]
  >([]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: { sender: "user" | "ai"; text: string } = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, newMessage]);

    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            ...messages.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
            { role: "user", content: input },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiReply = res.data.choices[0].message.content;
      setMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
    } catch (error) {
      console.log("OpenRouter API Error ", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Something went wrong" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-white text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full relative">
        {/* Header - Fixed */}
        <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-gradient-to-r from-gray-800/95 via-gray-700/95 to-gray-800/95 backdrop-blur-xl text-white z-10 border-b border-gray-700/50 shadow-xl">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 active:scale-95">
                  <IoMenu size={24} className="cursor-pointer" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="p-0 bg-[#0b1733] text-white w-64"
              >
                <Sidebar />
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <IoSparkles size={20} className="text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              MVS AI Chat
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Button className="p-2 md:p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 active:scale-95 shadow-lg">
              <FaShareAlt size={18} />
            </Button>
            <div className="scale-90 md:scale-100">
              <UserButton />
            </div>
          </div>
        </header>

        {/* Messages Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 md:px-8 pb-36 custom-scrollbar">
          <div className="flex flex-col w-full max-w-5xl mx-auto space-y-1">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-4">
                <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center shadow-2xl">
                  <IoSparkles className="text-blue-400 text-4xl" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Welcome to MVS AI
                </h2>
                <p className="text-gray-400 text-base md:text-lg max-w-md">
                  Start a conversation and let AI assist you with anything you need
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 w-full max-w-2xl">
                  <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 transition-all cursor-pointer">
                    <p className="text-white text-sm font-medium">💡 Get creative ideas</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-purple-500/50 transition-all cursor-pointer">
                    <p className="text-white text-sm font-medium">🚀 Boost productivity</p>
                  </div>
                </div>
              </div>
            )}
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} sender={msg.sender} text={msg.text}  />
            ))}
            {loading && <MessageBubble sender="ai" text="Thinking..." />}
            <div ref={endRef} />
          </div>
        </div>
{/* Input Area - Fixed at Bottom */}
<div className="fixed bottom-0 left-0 right-0 md:left-64 p-4 md:px-8 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent backdrop-blur-sm">
  <div className="max-w-5xl mx-auto">
    <div className="rounded-3xl px-4 py-3 bg-gradient-to-r from-gray-800/90 via-gray-700/90 to-gray-800/90 backdrop-blur-xl border border-gray-600/50 shadow-2xl shadow-black/50 hover:border-blue-500/50 transition-all duration-300 flex items-center gap-3">
      <button className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 active:scale-90 flex-shrink-0">
        <IoAdd size={24} className="text-gray-300 hover:text-white transition-colors" />
      </button>
      <input
        type="text"
        placeholder="Ask anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-base py-2 min-w-0"
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        className="flex text-white items-center justify-center gap-2 px-5 md:px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-lg shadow-blue-500/30 font-medium flex-shrink-0"
      >
        <IoSend size={18} />
        <span className="text-sm hidden sm:inline">Send</span>
      </button>
    </div>
    <p className="text-center text-xs text-gray-500 mt-3">
      AI can make mistakes. Consider checking important information.
    </p>
  </div>
</div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.7);
        }
      `}</style>
    </div>
  );
};

export default ChatPage;