"use client";

import React, { useEffect, useRef } from "react";
import { SendHorizontal } from "lucide-react";
import ModelSelector from "./ModelSelector";

interface Model {
  id: string;
  name: string;
  description: string;
}

interface MessageInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  selectedModel: Model;
  models: Model[];
  isModelDropdownOpen: boolean;
  onToggleModelDropdown: () => void;
  onSelectModel: (model: Model) => void;
}

export default function MessageInput({
  input,
  onInputChange,
  onSubmit,
  isLoading,
  selectedModel,
  models,
  isModelDropdownOpen,
  onToggleModelDropdown,
  onSelectModel,
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

  useEffect(() => {
    if (!input.trim()) {
      resetTextareaHeight();
    }
  }, [input]);

  return (
    <div className="absolute left-0 right-0 bottom-4 z-20 lg:z-50 pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <form onSubmit={onSubmit} className="relative">
          <div className="bg-neutral-900/95 rounded-2xl border border-neutral-700 backdrop-blur-sm focus-within:border-neutral-600">
            <div className="p-4">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="Message XeroChat..."
                className="w-full bg-transparent text-white placeholder-neutral-400 resize-none outline-none min-h-[24px] max-h-[200px] leading-6"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSubmit(e);
                  }
                }}
                onInput={handleTextareaInput}
              />
            </div>

            <div className="flex items-center justify-between px-4 pb-4">
              <ModelSelector
                selectedModel={selectedModel}
                models={models}
                isModelDropdownOpen={isModelDropdownOpen}
                onToggleModelDropdown={onToggleModelDropdown}
                onSelectModel={onSelectModel}
                variant="desktop"
                className=""
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-3 py-1.5 bg-white text-neutral-900 rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Send
                <SendHorizontal size={18} />
              </button>
            </div>
          </div>
        </form>
        <div className="text-xs text-neutral-500 mt-2 text-center">
          XeroChat can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
}
