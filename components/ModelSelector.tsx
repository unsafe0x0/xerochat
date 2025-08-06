"use client";

import React, { useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Model {
  id: string;
  name: string;
  description: string;
}

interface ModelSelectorProps {
  selectedModel: Model;
  models: Model[];
  isModelDropdownOpen: boolean;
  onToggleModelDropdown: () => void;
  onSelectModel: (model: Model) => void;
  variant?: "desktop" | "mobile";
  className?: string;
}

export default function ModelSelector({
  selectedModel,
  models,
  isModelDropdownOpen,
  onToggleModelDropdown,
  onSelectModel,
  variant = "desktop",
  className = "",
}: ModelSelectorProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isModelDropdownOpen) {
          onToggleModelDropdown();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModelDropdownOpen, onToggleModelDropdown]);

  const baseButtonClasses =
    "flex items-center gap-2 rounded-lg border border-neutral-600 transition-colors cursor-pointer px-3 py-2 text-xs bg-neutral-800 hover:bg-neutral-700";

  const dropdownPositionClasses =
    variant === "mobile"
      ? "bottom-full mb-2 left-0 w-64"
      : "bottom-full mb-2 left-0 w-64";

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={onToggleModelDropdown}
        className={baseButtonClasses}
      >
        <span className="font-medium">{selectedModel.name}</span>
        <ChevronDown
          size={variant === "mobile" ? 14 : 12}
          className={`transition-transform ${
            isModelDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isModelDropdownOpen && (
        <div
          className={`absolute ${dropdownPositionClasses} bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-50`}
        >
          <div className="p-2">
            {models.map((model) => (
              <button
                key={model.id}
                type="button"
                onClick={() => onSelectModel(model)}
                className={`w-full text-left px-3 py-2 mb-1 last:mb-0 rounded-md hover:bg-neutral-700 transition-colors cursor-pointer ${
                  selectedModel.id === model.id ? "bg-neutral-700 text-sm" : ""
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
  );
}
