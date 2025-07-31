"use client";

import React, { useState } from "react";
import { Copy, RotateCcw, ThumbsUp, ThumbsDown, Check } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  images?: string[];
}

interface MessageActionsProps {
  message: Message;
  onRegenerate?: (messageId: string) => void;
}

export default function MessageActions({
  message,
  onRegenerate,
}: MessageActionsProps) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy message:", err);
    }
  };

  const handleFeedback = (type: "up" | "down") => {
    setFeedback(feedback === type ? null : type);
  };

  const handleRegenerate = () => {
    if (onRegenerate) {
      onRegenerate(message.id);
    }
  };

  return (
    <div
      className={`flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <button
        onClick={handleCopy}
        className="p-1.5 rounded hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        title="Copy message"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>

      {message.role === "assistant" && onRegenerate && (
        <button
          onClick={handleRegenerate}
          className="p-1.5 rounded hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          title="Regenerate response"
        >
          <RotateCcw size={14} />
        </button>
      )}

      {message.role === "assistant" && (
        <>
          <button
            onClick={() => handleFeedback("up")}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              feedback === "up"
                ? "bg-green-600 text-white"
                : "hover:bg-neutral-700 text-neutral-400 hover:text-white"
            }`}
            title="Good response"
          >
            <ThumbsUp size={14} />
          </button>
          <button
            onClick={() => handleFeedback("down")}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              feedback === "down"
                ? "bg-orange-600 text-white"
                : "hover:bg-neutral-700 text-neutral-400 hover:text-white"
            }`}
            title="Bad response"
          >
            <ThumbsDown size={14} />
          </button>
        </>
      )}
    </div>
  );
}
