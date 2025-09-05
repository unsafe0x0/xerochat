"use client";

import React from "react";
import { X } from "lucide-react";
import Link from "next/link";

interface SettingsModalProps {
  isOpen: boolean;
  apiKeyOpenRouter: string;
  onApiKeyOpenRouterChange: (value: string) => void;
  apiKeyGemini: string;
  onApiKeyGeminiChange: (value: string) => void;
  apiKeyGroq: string;
  onApiKeyGroqChange: (value: string) => void;
  customInstructions: string;
  onCustomInstructionsChange: (value: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function SettingsModal({
  isOpen,
  apiKeyOpenRouter,
  onApiKeyOpenRouterChange,
  apiKeyGemini,
  onApiKeyGeminiChange,
  apiKeyGroq,
  onApiKeyGroqChange,
  customInstructions,
  onCustomInstructionsChange,

  onSave,
  onClose,
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 transition-opacity animate-fadeIn">
      <div className="bg-[#191919] border border-[#282828] rounded-md w-full max-w-md shadow-2xl animate-modalPop">
        <div className="flex items-center justify-between p-4 border-b border-[#282828]">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              API key Open Router
            </label>
            <input
              type="password"
              value={apiKeyOpenRouter}
              onChange={(e) => onApiKeyOpenRouterChange(e.target.value)}
              placeholder="Enter your Open Router API key..."
              className="w-full px-3 py-2 bg-[#222222] border border-[#282828] rounded-md text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500"
            />
            <p className="text-xs text-neutral-400 mt-1">
              Required for API access. Get your API key from{" "}
              <Link
                href="https://openrouter.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                here
              </Link>
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              API key Gemini (Google)
            </label>
            <input
              type="password"
              value={apiKeyGemini}
              onChange={(e) => onApiKeyGeminiChange(e.target.value)}
              placeholder="Enter your Gemini API key..."
              className="w-full px-3 py-2 bg-[#222222] border border-[#282828] rounded-md text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500"
            />
            <p className="text-xs text-neutral-400 mt-1">
              Required for API access. Get your Gemini API key from{" "}
              <Link
                href="https://cloud.google.com/generative-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                here
              </Link>
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              API key Groq
            </label>
            <input
              type="password"
              value={apiKeyGroq}
              onChange={(e) => onApiKeyGroqChange(e.target.value)}
              placeholder="Enter your Groq API key..."
              className="w-full px-3 py-2 bg-[#222222] border border-[#282828] rounded-md text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500"
            />
            <p className="text-xs text-neutral-400 mt-1">
              Required for API access. Get your Groq API key from{" "}
              <Link
                href="https://groq.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                here
              </Link>
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Custom Instructions
            </label>
            <textarea
              value={customInstructions}
              onChange={(e) => onCustomInstructionsChange(e.target.value)}
              placeholder="Provide custom instructions for the assistant..."
              className="w-full px-3 py-2 bg-[#222222] border border-[#282828] rounded-md text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500 min-h-[100px] resize-none"
            />
            <p className="text-xs text-neutral-400 mt-1">
              These instructions will be prepended to the system prompt for
              every conversation.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t border-[#282828]">
          <button
            onClick={onSave}
            className="px-4 py-1.5 bg-white text-neutral-900 rounded-md hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease;
        }
        @keyframes modalPop {
          from { transform: scale(0.95); opacity: 0.7; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-modalPop {
          animation: modalPop 0.2s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
}
