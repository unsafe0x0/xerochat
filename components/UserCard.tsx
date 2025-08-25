"use client";

import React from "react";
import { LogOut } from "lucide-react";

interface UserCardProps {
  name: string;
  email: string;
  image: string;
  onLogout: () => void;
}

export default function UserCard({
  name,
  email,
  image,
  onLogout,
}: UserCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-[#202020] border border-[#282828] rounded-lg">
      <img
        src={image}
        alt={name}
        className="w-10 h-10 rounded-full object-cover border border-[#282828]"
      />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-white truncate">{name}</div>
        <div className="text-xs text-neutral-400 truncate">{email}</div>
      </div>
      <button
        onClick={onLogout}
        className="w-8 h-8 flex items-center justify-center rounded-md bg-[#222222] text-neutral-400 hover:bg-[#242424] hover:text-red-500 border border-[#282828] transition-colors cursor-pointer"
        title="Logout"
      >
        <LogOut size={18} />
      </button>
    </div>
  );
}
