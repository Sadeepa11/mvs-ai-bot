import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaUser, FaRobot } from "react-icons/fa";

type Props = {
  sender: "user" | "ai";
  text: string;
  // message timestamp
};

const MessageBubble = ({ sender, text }: Props) => {
  const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;

  const parts: { type: "text" | "code"; content: string; language?: string }[] = [];

  let lastIndex = 0;
  let match;

  while ((match = codeRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }
    parts.push({
      type: "code",
      content: match[2],
      language: match[1] || "text",
    });
    lastIndex = codeRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", content: text.slice(lastIndex) });
  }

  const isUser = sender === "user";

  return (
    <div className={`flex gap-3 mb-6 animate-fadeIn ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
          <FaRobot className="text-white text-base" />
        </div>
      )}

      <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-5 py-3 rounded-2xl shadow-xl transition-all duration-200 hover:shadow-2xl ${
            isUser
              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-blue-500/30 rounded-tr-md"
              : "bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-sm text-gray-100 border border-gray-600/50 shadow-gray-900/50 rounded-tl-md"
          }`}
        >
          {parts.map((part, idx) =>
            part.type === "code" ? (
              <div key={idx} className="my-3 first:mt-0 last:mb-0">
                <div className="flex items-center justify-between bg-gray-900/50 px-3 py-2 rounded-t-lg border-b border-gray-700/50">
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                    {part.language || "code"}
                  </span>
                  <button
                    onClick={() => navigator.clipboard.writeText(part.content)}
                    className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-gray-700/50"
                  >
                    Copy
                  </button>
                </div>
                <SyntaxHighlighter
                  language={part.language}
                  style={okaidia}
                  wrapLines
                  showLineNumbers
                  customStyle={{
                    margin: 0,
                    borderRadius: "0 0 0.5rem 0.5rem",
                    fontSize: "0.875rem",
                    padding: "1rem",
                  }}
                >
                  {part.content}
                </SyntaxHighlighter>
              </div>
            ) : (
              <p key={idx} className="whitespace-pre-wrap leading-relaxed text-[15px]">
                {part.content}
              </p>
            )
          )}
        </div>

        
      </div>

      {isUser && (
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-gray-700/30">
          <FaUser className="text-white text-sm" />
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MessageBubble;
