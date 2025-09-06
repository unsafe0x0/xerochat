"use client";

import React from "react";
import { Menu } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";
import MessageActions from "./MessageActions";
import ThinkingIndicator from "./ThinkingIndicator";

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
  isThinking?: boolean;
  selectedModel?: { name: string };
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  onRegenerateMessage?: (messageId: string) => void;
  onToggleSidebar?: () => void;
}

export default function MessageArea({
  messages,
  isLoading,
  isThinking = false,
  selectedModel,
  messagesEndRef,
  onRegenerateMessage,
  onToggleSidebar,
}: MessageAreaProps) {
  const Header = () => (
    onToggleSidebar && (
  <div className="lg:hidden flex items-center justify-between p-2 border-b border-[#282828] bg-[#191919]">
        <h1 className="ml-4 text-2xl font-semibold">XeroChat</h1>
        <button
          onClick={onToggleSidebar}
          className="text-neutral-400 hover:text-white cursor-pointer"
        >
          <Menu size={28} />
        </button>
      </div>
    )
  );

  if (messages.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">No messages yet</h2>
          <p className="text-neutral-400">
            Start a conversation to see messages here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="max-w-4xl mx-auto p-4 space-y-6 min-w-0">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 group ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex-1 min-w-0 ${
                  message.role === "user"
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
                        className="max-w-xs max-h-64 rounded-md border border-[#282828] object-cover bg-[#222222]"
                      />
                    ))}
                  </div>
                )}

                {message.content && (
                  <div
                    className={`max-w-none ${
                      message.role === "user"
                        ? "bg-[#222222] rounded-md p-4"
                        : ""
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <MarkdownRenderer 
                        content={message.content} 
                        isStreaming={isLoading && message.id === messages[messages.length - 1]?.id}
                      />
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
          {isThinking && !messages.some(msg => msg.role === "assistant" && msg.content === "") && (
            <ThinkingIndicator model={selectedModel?.name} />
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
