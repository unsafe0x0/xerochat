"use client";

import React from "react";
import { Menu, ChevronDown } from "lucide-react";

interface Model {
  id: string;
  name: string;
  description: string;
}

interface HeaderProps {
  onToggleSidebar: () => void;
  selectedModel: Model;
  models: Model[];
  isModelDropdownOpen: boolean;
  onToggleModelDropdown: () => void;
  onSelectModel: (model: Model) => void;
}

export default function Header({
  onToggleSidebar,
  selectedModel,
  models,
  isModelDropdownOpen,
  onToggleModelDropdown,
  onSelectModel,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-[16px] border-b border-neutral-800 bg-[#1a1a1a] min-h-[72px]">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-neutral-400 hover:text-white cursor-pointer"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">XeroChat</h1>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={onToggleModelDropdown}
          className="flex items-center gap-2 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg border border-neutral-600 transition-colors text-sm cursor-pointer"
        >
          <span className="font-medium">{selectedModel.name}</span>
          <ChevronDown
            size={14}
            className={`transition-transform ${isModelDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isModelDropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-50">
            <div className="p-2">
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => onSelectModel(model)}
                  className={`w-full text-left px-3 py-2 mb-1 last:mb-0 rounded-md hover:bg-neutral-700/50 transition-colors cursor-pointer ${
                    selectedModel.id === model.id ? "bg-neutral-800 text-sm" : ""
                  }`}
                >
                  <div className="font-medium text-white text-sm">
                    {model.name}
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    {model.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
