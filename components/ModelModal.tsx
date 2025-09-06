"use client";

import React from "react";
import { AiOutlineClose } from "react-icons/ai";

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
    unknown: "Other",
  };

  return (
    <div className="fixed inset-0 bg-[#191919] bg-opacity-95 z-50 flex items-center justify-center p-4 transition-opacity animate-fadeIn">
      <div className="bg-[#191919] border border-[#282828] rounded-md w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl animate-modalPop">
        <div className="flex items-center justify-between p-5 border-b border-[#282828]">
          <h3 className="text-xl font-bold tracking-tight text-white">Choose a Model</h3>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer rounded-full p-1"
            aria-label="Close"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>

        <div className="p-5 space-y-8 overflow-y-auto max-h-[calc(90vh-80px)]">
          {Object.keys(grouped).map((endpoint) => (
            <div key={endpoint}>
              <div className="text-base text-neutral-300 mb-3 font-semibold">
                {endpointDisplay[endpoint] || endpoint}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {grouped[endpoint].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => onSelectModel(m)}
                    className={`relative text-left px-4 py-3 transition-colors rounded-md border flex flex-col gap-1 items-start min-h-[70px] ${
                      selectedModel?.id === m.id
                        ? "bg-white text-neutral-900 border-[#282828]"
                        : "bg-[#222222] text-neutral-100 hover:bg-[#252525] border-[#282828]"
                    } cursor-pointer group`}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span className="font-semibold text-sm truncate flex-1">{m.name}</span>
                    </div>
                    {m.description && (
                      <div className="text-xs text-neutral-400 mt-1 line-clamp-2">
                        {m.description.split(' ').slice(0, 15).join(' ')}{m.description.split(' ').length > 15 ? '...' : ''}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
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
