"use client";

import React, { useRef } from "react";
import { SendHorizontal } from "lucide-react";

interface MessageInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  selectedModelName: string;
}

export default function MessageInput({
  input,
  onInputChange,
  onSubmit,
  isLoading,
  selectedModelName,
}: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto";
    target.style.height = target.scrollHeight + "px";
  };

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = "24px";
    }
  };

  React.useEffect(() => {
    if (!input.trim()) {
      resetTextareaHeight();
    }
  }, [input]);

  return (
    <div className="border-t border-neutral-800 bg-[#1a1a1a] p-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={onSubmit} className="relative">
          <div className="flex items-end gap-3 p-4 bg-neutral-800 rounded-xl border border-neutral-700 focus-within:border-neutral-600">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Message XeroChat..."
              className="flex-1 bg-transparent text-white placeholder-neutral-400 resize-none outline-none min-h-[24px] max-h-[200px] leading-6"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit(e);
                }
              }}
              onInput={handleTextareaInput}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 w-10 h-10 bg-white text-neutral-900 rounded-lg flex items-center justify-center hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <SendHorizontal size={18} />
            </button>
          </div>
        </form>
        <div className="text-xs text-neutral-500 mt-2 text-center">
          XeroChat can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
}
