"use client";

import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import MessageArea from "./MessageArea";
import MessageInput from "./MessageInput";
import SettingsModal from "./SettingsModal";
import models from "@/data/Models";

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

interface Model {
  id: string;
  name: string;
  description: string;
  [k: string]: any;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model>(models[0] as Model);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKeyOpenRouter, setApiKeyOpenRouter] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");
  
  const [recentChats, setRecentChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const savedApiKeyOpenRouter = localStorage.getItem("apiKeyOpenRouter");
    if (savedApiKeyOpenRouter) setApiKeyOpenRouter(savedApiKeyOpenRouter);

  const savedCustomInstructions = localStorage.getItem("custom_instructions");
  if (savedCustomInstructions) setCustomInstructions(savedCustomInstructions);

    const savedChats = localStorage.getItem("recent_chats");
    if (savedChats) {
      try {
        const parsedChats = JSON.parse(savedChats).map((chat: any) => ({
          ...chat,
          timestamp: new Date(chat.timestamp),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }));
        setRecentChats(parsedChats);
      } catch (err) {
        console.error("Failed to parse saved chats", err);
        localStorage.removeItem("recent_chats");
      }
    }
  }, []);

  const saveChatsToStorage = (chats: Chat[]) => {
    localStorage.setItem("recent_chats", JSON.stringify(chats));
  };

  const saveCurrentChat = () => {
    if (messages.length === 0) return;

    const chatTitle = messages[0]?.content.slice(0, 50) || "New Chat";
    const chatId = currentChatId || Date.now().toString();

    const chatToSave: Chat = {
      id: chatId,
      title: chatTitle,
      messages: messages,
      timestamp: new Date(),
    };

    const updatedChats = recentChats.filter((chat) => chat.id !== chatId);
    updatedChats.unshift(chatToSave);
    const limitedChats = updatedChats.slice(0, 20);

    setRecentChats(limitedChats);
    saveChatsToStorage(limitedChats);
    setCurrentChatId(chatId);
  };

  const loadChat = (chat: Chat) => {
    setMessages(chat.messages);
    setCurrentChatId(chat.id);
    setIsSidebarOpen(false);
  };

  const deleteChat = (chatId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updatedChats = recentChats.filter((chat) => chat.id !== chatId);
    setRecentChats(updatedChats);
    saveChatsToStorage(updatedChats);
    if (currentChatId === chatId) {
      setMessages([]);
      setCurrentChatId(null);
    }
  };

  const saveAccessToken = () => {
    localStorage.setItem("apiKeyOpenRouter", apiKeyOpenRouter);
  localStorage.setItem("custom_instructions", customInstructions);
    setIsSettingsOpen(false);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/open-router", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
            images: m.images,
          })),
          model: selectedModel.id,
          accessToken: apiKeyOpenRouter,
          customInstructions: customInstructions,
        }),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        console.error("Chat API error", response.status, text);
        throw new Error(`Failed to send message: ${response.status} ${text}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          content: "Sorry, I encountered an error. Please try again.",
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => saveCurrentChat(), 100);
    }
  };

  const newChat = () => {
    if (messages.length > 0) {
      saveCurrentChat();
    }
    setMessages([]);
    setCurrentChatId(null);
  };

  const regenerateMessage = async (messageId: string) => {
    const messageIndex = messages.findIndex((msg) => msg.id === messageId);
    if (messageIndex === -1 || messages[messageIndex].role !== "assistant")
      return;

    const truncatedMessages = messages.slice(0, messageIndex);
    setMessages(truncatedMessages);
    setIsLoading(true);

    const conversationHistory = truncatedMessages.map((m) => ({
      role: m.role,
      content: m.content,
      images: m.images,
    }));

    try {
      const response = await fetch("/api/open-router", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: conversationHistory,
          model: selectedModel.id,
          accessToken: apiKeyOpenRouter,
          customInstructions: customInstructions,
        }),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        console.error("Chat API regenerate error", response.status, text);
        throw new Error(`Failed to regenerate message: ${response.status} ${text}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: "",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          );
        }
      }
    } catch (error) {
      console.error("Error regenerating message:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content:
            "Sorry, I encountered an error while regenerating. Please try again.",
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => saveCurrentChat(), 100);
    }
  };

  return (
    <div className="flex h-screen bg-neutral-900 text-neutral-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        recentChats={recentChats}
        currentChatId={currentChatId}
        onNewChat={newChat}
        onLoadChat={loadChat}
        onDeleteChat={deleteChat}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto pb-40 relative">
          <MessageArea
            messages={messages}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
            onRegenerateMessage={regenerateMessage}
            onToggleSidebar={() => setIsSidebarOpen(true)}
          />

          <MessageInput
            input={input}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            selectedModel={selectedModel}
            models={models}
            isModelDropdownOpen={isModelDropdownOpen}
            onToggleModelDropdown={() => setIsModelDropdownOpen((s) => !s)}
            onSelectModel={(model: Model) => {
              setSelectedModel(model);
              setIsModelDropdownOpen(false);
            }}
          />
        </div>
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
    apiKeyOpenRouter={apiKeyOpenRouter}
    onApiKeyOpenRouterChange={setApiKeyOpenRouter}
  customInstructions={customInstructions}
  onCustomInstructionsChange={setCustomInstructions}
  onSave={saveAccessToken}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
