"use client";

import React from "react";
import { Brain } from "lucide-react";

interface ThinkingIndicatorProps {
  model?: string;
}

export default function ThinkingIndicator({ model }: ThinkingIndicatorProps) {
  return (
    <div className="flex gap-4 justify-start">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 py-2">
          <Brain size={18} className="text-blue-400 animate-pulse" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-blue-400">Thinking</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" />
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-100" />
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
