import { FileEdit, Clock, Settings, HelpCircle, ChevronRight, Trash2 } from "lucide-react";
import React from "react";
import logo from "../public/logo/logo.png";

const Sidebar = () => {
  const recentChats = [
    { id: 1, title: "Mern Stack Roadmap", time: "2h ago" },
    { id: 2, title: "What is Next js", time: "5h ago" },
    { id: 3, title: "Next js vs React js", time: "Yesterday" },
  ];

  return (
    <div className="flex flex-col w-64 fixed top-0 left-0 h-screen bg-gradient-to-b from-[#0b1733] via-[#0d1a3d] to-[#0b1733] border-r border-gray-700/50 text-white shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center gap-3 mb-4">

           <div className="w-15 h-15 flex-shrink-0 rou">
    <img
      src={logo.src}
      alt="MVS AI Logo"
      className="w-full h-full object-contain rounded-full"
    />
  </div>
        
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              MVS AI
            </h1>
            <p className="text-xs text-gray-400">Chat Assistant</p>
          </div>
        </div>

        {/* New Chat Button */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 active:scale-95">
          <FileEdit className="w-4 h-4" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Recent History */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-gray-400" />
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Recent History
            </h2>
          </div>
          <ul className="space-y-2">
            {recentChats.map((chat) => (
              <li
                key={chat.id}
                className="group p-3 hover:bg-gray-700/30 rounded-xl cursor-pointer transition-all duration-200 border border-transparent hover:border-gray-600/50 relative"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                      {chat.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{chat.time}</p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-all p-1 hover:bg-red-500/10 rounded-lg">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full group-hover:h-8 transition-all duration-200"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700/50 p-4 space-y-2">
        <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-700/30 rounded-xl transition-all duration-200 text-gray-300 hover:text-white group">
          <div className="w-8 h-8 rounded-lg bg-gray-700/50 flex items-center justify-center group-hover:bg-gray-600/50 transition-all">
            <Settings className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Settings</span>
          <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-700/30 rounded-xl transition-all duration-200 text-gray-300 hover:text-white group">
          <div className="w-8 h-8 rounded-lg bg-gray-700/50 flex items-center justify-center group-hover:bg-gray-600/50 transition-all">
            <HelpCircle className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Help</span>
          <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.6);
        }
      `}</style>
    </div>
  );
};

export default Sidebar;