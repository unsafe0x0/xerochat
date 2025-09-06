"use client";

import React from "react";
import UserCard from "./UserCard";
import { useSession, signOut } from "next-auth/react";
import { MdChatBubbleOutline } from "react-icons/md";
import { SlSettings } from "react-icons/sl";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";
import Link from "next/link";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  images?: string[];
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  timestamp: Date;
}

interface SidebarProps {
  isSidebarOpen: boolean;
  recentChats: Chat[];
  currentChatId: string | null;
  onNewChat: () => void;
  onLoadChat: (chat: Chat) => void;
  onDeleteChat: (chatId: string, e: React.MouseEvent) => void;
  onOpenSettings: () => void;
}

export default function Sidebar({
  isSidebarOpen,
  recentChats,
  currentChatId,
  onNewChat,
  onLoadChat,
  onDeleteChat,
  onOpenSettings,
}: SidebarProps) {
  const { data: session } = useSession();
  const user = session?.user || { name: "", email: "", image: "" };
  const handleLogout = () => signOut();
  return (
    <div
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  } fixed inset-y-0 left-0 z-50 w-64 bg-[#191919] border-r border-[#282828] transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex flex-col h-full">
        <div className="px-4 py-4 border-b border-[#282828]">
          <h1 className="text-2xl font-semibold text-center mb-4 hidden lg:block">
            XeroChat
          </h1>
          <button
            onClick={onNewChat}
            className="flex items-center gap-2 w-full px-3 py-1.5 text-neutral-800 bg-white hover:bg-neutral-100 rounded-md transition-colors cursor-pointer border border-[#282828]"
          >
            <MdChatBubbleOutline size={18} />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="text-sm text-neutral-400 font-medium mb-3">
            Recent Chats
          </div>
          <div className="space-y-2">
            {recentChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onLoadChat(chat)}
                className={`group flex items-center justify-between px-3 py-1.5 rounded-md text-sm cursor-pointer transition-colors hover:bg-[#252525] ${
                  currentChatId === chat.id ? "bg-[#252525]" : "bg-[#222222]"
                } border border-[#282828]`}
              >
                <span className="truncate flex-1 mr-2">{chat.title}</span>
                <button
                  onClick={(e) => onDeleteChat(chat.id, e)}
                  className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-red-500 transition-all p-1 cursor-pointer"
                >
                  <FaRegTrashAlt size={14} />
                </button>
              </div>
            ))}
            {recentChats.length === 0 && (
              <div className="text-neutral-500 text-sm text-center py-4">
                No recent chats
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-[#282828] flex flex-col gap-2">
          {user && user.email && (
            <UserCard
              name={user.name || ""}
              email={user.email || ""}
              image={user.image || "/window.svg"}
              onLogout={handleLogout}
            />
          )}
          <p className="text-xs text-neutral-500">Save your api key here</p>
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-2 w-full px-3 py-1.5 text-neutral-800 bg-white hover:bg-neutral-100 rounded-md transition-colors cursor-pointer border border-[#282828]"
          >
            <SlSettings size={18} />
            Settings
          </button>
          <Link
            href={"https://github.com/unsafe0x0/xerochat"}
            target="_blank"
            className="flex items-center gap-2 w-full px-3 py-1.5 text-white bg-[#222222] hover:bg-[#252525] rounded-md transition-colors cursor-pointer border border-[#282828]"
          >
            <IoLogoGithub size={18} />
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
