"use client";

import React from "react";
import { X } from "lucide-react";

type GenericModel = Record<string, any>;

interface ModelModalProps {
  isOpen: boolean;
  models: GenericModel[];
  selectedModel: GenericModel;
  onSelectModel: (model: GenericModel) => void;
  onClose: () => void;
}

export default function ModelModal({
  isOpen,
  models,
  selectedModel,
  onSelectModel,
  onClose,
}: ModelModalProps) {
  if (!isOpen) return null;
  const grouped: Record<string, GenericModel[]> = {};
  models.forEach((m) => {
    const key = m.endpoint || "unknown";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(m);
  });

  const endpointDisplay: Record<string, string> = {
    "/api/open-router": "Open Router",
    "/api/gemini": "Gemini (Google)",
    "/api/groq-cloud": "Groq Cloud",
    unknown: "Other",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#191919] border border-[#282828] rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-[#282828]">
          <h3 className="text-lg font-semibold">Choose a model</h3>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {Object.keys(grouped).map((endpoint) => (
            <div key={endpoint}>
              <div className="text-sm text-neutral-400 mb-2 font-medium">
                {endpointDisplay[endpoint] || endpoint}
              </div>

              <div className="flex flex-wrap gap-3 justify-start">
                {grouped[endpoint].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => onSelectModel(m)}
                    className={`text-left px-3 py-2 transition-colors rounded-lg min-w-[200px] flex-none ${
                      selectedModel?.id === m.id
                        ? "bg-white text-neutral-900 border border-neutral-200"
                        : "bg-[#222222] text-neutral-100 hover:bg-[#242424] border border-[#282828]"
                    } cursor-pointer`}
                  >
                    <div className="font-medium text-sm truncate">{m.name}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
