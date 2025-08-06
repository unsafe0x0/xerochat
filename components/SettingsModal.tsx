"use client";

import React from "react";
import { X } from "lucide-react";
import Link from "next/link";

interface SettingsModalProps {
  isOpen: boolean;
  accessToken: string;
  onTokenChange: (value: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function SettingsModal({
  isOpen,
  accessToken,
  onTokenChange,
  onSave,
  onClose,
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-700 rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-neutral-700">
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
              Access Token
            </label>
            <input
              type="password"
              value={accessToken}
              onChange={(e) => onTokenChange(e.target.value)}
              placeholder="Enter your Access token..."
              className="w-full px-3 py-2 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500"
            />
            <p className="text-xs text-neutral-400 mt-1">
              Required for API access. Get your token from{" "}
              <Link
                href="https://console.groq.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:underline"
              >
                here
              </Link>
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t border-neutral-700">
          <button
            onClick={onSave}
            className="px-4 py-2 bg-white text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
