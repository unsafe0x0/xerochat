"use client";

import React from "react";
import { Menu } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";
import MessageActions from "./MessageActions";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  images?: string[];
}

interface MessageAreaProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  onRegenerateMessage?: (messageId: string) => void;
  onToggleSidebar?: () => void;
}

export default function MessageArea({
  messages,
  isLoading,
  messagesEndRef,
  onRegenerateMessage,
  onToggleSidebar,
}: MessageAreaProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col h-full">
        {onToggleSidebar && (
          <div className="lg:hidden flex items-center justify-between p-2 border-b border-neutral-800">
            <h1 className="ml-4 text-2xl font-semibold">XeroChat</h1>
            <button
              onClick={onToggleSidebar}
              className="text-neutral-400 hover:text-white cursor-pointer"
            >
              <Menu size={28} />
            </button>
          </div>
        )}

        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Welcome to XeroChat</h2>
          <p className="text-neutral-400 mb-8 max-w-md">
            Your AI assistant is ready to help. Choose a model below and start a
            conversation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
            <div className="bg-neutral-800/50 rounded-lg p-4 border border-neutral-700">
              <h3 className="font-medium mb-2">💡 Ask questions</h3>
              <p className="text-sm text-neutral-400">
                Get answers on any topic
              </p>
            </div>
            <div className="bg-neutral-800/50 rounded-lg p-4 border border-neutral-700">
              <h3 className="font-medium mb-2">✍️ Write content</h3>
              <p className="text-sm text-neutral-400">
                Create articles, stories, and more
              </p>
            </div>
            <div className="bg-neutral-800/50 rounded-lg p-4 border border-neutral-700">
              <h3 className="font-medium mb-2">💻 Code assistance</h3>
              <p className="text-sm text-neutral-400">
                Get help with programming
              </p>
            </div>
            <div className="bg-neutral-800/50 rounded-lg p-4 border border-neutral-700">
              <h3 className="font-medium mb-2">🧠 Reasoning</h3>
              <p className="text-sm text-neutral-400">Solve complex problems</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {onToggleSidebar && (
        <div className="lg:hidden flex items-center justify-between p-2 border-b border-neutral-800">
          <h1 className="ml-4 text-2xl font-semibold">XeroChat</h1>
          <button
            onClick={onToggleSidebar}
            className="text-neutral-400 hover:text-white cursor-pointer"
          >
            <Menu size={28} />
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 group ${message.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`flex-1 min-w-0 ${message.role === "user"
                    ? "flex flex-col items-end"
                    : "flex flex-col items-start"
                  }`}
              >
                {message.images && message.images.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {message.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="max-w-xs max-h-64 rounded-lg border border-neutral-700 object-cover"
                      />
                    ))}
                  </div>
                )}

                {message.content && (
                  <div
                    className={`max-w-none ${message.role === "user"
                        ? "bg-neutral-800 rounded-lg p-4"
                        : ""
                      }`}
                  >
                    {message.role === "assistant" ? (
                      <MarkdownRenderer content={message.content} />
                    ) : (
                      <div className="whitespace-pre-wrap text-neutral-100 leading-relaxed">
                        {message.content}
                      </div>
                    )}
                  </div>
                )}

                <MessageActions
                  message={message}
                  onRegenerate={onRegenerateMessage}
                />
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-neutral-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-neutral-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-1 h-1 bg-neutral-400 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
