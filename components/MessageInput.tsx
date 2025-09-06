"use client";

import React, { useEffect, useRef } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { FaRegSquare } from "react-icons/fa6";

interface Model {
  id: string;
  name: string;
  description?: string;
}

interface MessageInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  selectedModel: Model;
  models: Model[];
  onOpenModelModal: () => void;
  isInitial?: boolean;
  onStop?: () => void;
}

export default function MessageInput({
  input,
  onInputChange,
  onSubmit,
  isLoading,
  selectedModel,
  onOpenModelModal,
  isInitial = false,
  onStop,
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
    <div
      className={
        isInitial
          ? "static pointer-events-auto"
          : "absolute left-0 right-0 bottom-4 z-20 lg:z-50 pointer-events-none"
      }
    >
      <div
        className={`${
          isInitial
            ? "max-w-3xl mx-auto"
            : "max-w-4xl mx-auto pointer-events-auto"
        }`}
      >
        <form onSubmit={onSubmit} className="relative">
          <div className="bg-[#191919]/95 rounded-2xl border border-[#282828] backdrop-blur-sm focus-within:border-[#404040] transition-colors">
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
              <button
                type="button"
                onClick={onOpenModelModal}
                className="flex items-center gap-2 rounded-md border border-[#282828] transition-colors cursor-pointer px-3 py-2 text-xs bg-[#222222] hover:bg-[#242424]"
              >
                <span className="font-medium truncate max-w-[8rem] sm:max-w-[12rem] text-sm sm:text-xs">
                  {selectedModel.name}
                </span>
              </button>

              <button
                type={isLoading ? "button" : "submit"}
                disabled={!input.trim() && !isLoading}
                onClick={() => {
                  if (isLoading && onStop) onStop();
                }}
                className={`w-9 h-9 rounded-md flex items-center justify-center transition-colors cursor-pointer border ${
                    "bg-white text-neutral-900 hover:bg-neutral-100 border-[#282828] disabled:opacity-50 disabled:cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <FaRegSquare size={20} />
                ) : (
                  <LuSendHorizontal size={20} />
                )}
              </button>
            </div>
          </div>
        </form>
        {!isInitial && (
          <div className="text-xs text-neutral-500 mt-2 text-center">
            XeroChat can make mistakes. Check important info.
          </div>
        )}
      </div>
    </div>
  );
}
