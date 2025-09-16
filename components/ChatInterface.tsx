"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "./Sidebar";
import MessageArea from "./MessageArea";
import MessageInput from "./MessageInput";
import SettingsModal from "./SettingsModal";
import models from "@/data/Models";
import ModelModal from "./ModelModal";
import { callModelEndpoint, ProviderKeys } from "@/utils/api";
import { RiMenu3Line } from "react-icons/ri";
import { FiZap } from "react-icons/fi";
import { LuBrain } from "react-icons/lu";
import { FaCodepen } from "react-icons/fa6";
import { ImPencil2 } from "react-icons/im";

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
  description?: string;
  [k: string]: any;
}

export default function ChatInterface() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model>(models[0] as Model);
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKeyOpenRouter, setApiKeyOpenRouter] = useState("");
  const [apiKeyGemini, setApiKeyGemini] = useState("");
  const [apiKeyMistral, setApiKeyMistral] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

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
    const savedApiKeyGemini = localStorage.getItem("apiKeyGemini");
    if (savedApiKeyGemini) setApiKeyGemini(savedApiKeyGemini);
    const savedApiKeyMistral = localStorage.getItem("apiKeyMistral");
    if (savedApiKeyMistral) setApiKeyMistral(savedApiKeyMistral);

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
    localStorage.setItem("apiKeyGemini", apiKeyGemini);
    localStorage.setItem("apiKeyMistral", apiKeyMistral);
    localStorage.setItem("custom_instructions", customInstructions);
    setIsSettingsOpen(false);
  };

  const streamResponse = async (
    conversationMessages: any[],
    controller: AbortController,
  ) => {
    setIsThinking(true);

    const providerKeys: ProviderKeys = {
      openRouter: apiKeyOpenRouter,
      gemini: apiKeyGemini,
      mistral: apiKeyMistral,
    };

    const response = await callModelEndpoint({
      endpoint: (selectedModel as any).endpoint || "/api/open-router",
      messages: conversationMessages,
      modelId: selectedModel.id,
      keys: providerKeys,
      customInstructions: customInstructions,
      signal: controller.signal,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("Chat API error", response.status, text);
      throw new Error(`Failed to send message: ${response.status} ${text}`);
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
      try {
        let isFirstChunk = true;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          if (isFirstChunk) {
            setIsThinking(false);
            isFirstChunk = false;
          }

          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, content: msg.content + chunk }
                : msg,
            ),
          );
        }
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          console.error("Stream error:", err);
        }
      }
    }
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

    const controller = new AbortController();
    setAbortController(controller);
    try {
      await streamResponse(
        updatedMessages.map((m) => ({
          role: m.role,
          content: m.content,
          images: m.images,
        })),
        controller,
      );
    } catch (error) {
      console.error("Error:", error);
      setIsThinking(false);
      const errMsg =
        error && (error as any).message
          ? (error as any).message
          : String(error ?? "Unknown error");
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          content: `Error: ${errMsg}`,
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
      setAbortController(null);
      setTimeout(() => saveCurrentChat(), 100);
    }
  };

  const newChat = () => {
    if (messages.length > 0) {
      saveCurrentChat();
    }
    setMessages([]);
    setCurrentChatId(null);
    setIsSidebarOpen(false);
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

    const controller = new AbortController();
    setAbortController(controller);
    try {
      await streamResponse(conversationHistory, controller);
    } catch (error) {
      console.error("Error regenerating message:", error);
      setIsThinking(false);
      const errMsg =
        error && (error as any).message
          ? (error as any).message
          : String(error ?? "Unknown error");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: `Error regenerating: ${errMsg}`,
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
      setAbortController(null);
      setTimeout(() => saveCurrentChat(), 100);
    }
  };

  const stopGeneration = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
      setIsLoading(false);
      setIsThinking(false);
      setTimeout(() => saveCurrentChat(), 100);
    }
  };

  return (
    <div className="flex h-screen bg-[#191919] text-neutral-100">
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
          className="fixed inset-0 bg-[#191919] bg-opacity-95 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 relative pb-40">
            <div className="lg:hidden flex items-center justify-between p-2 border-b border-[#282828] absolute top-0 left-0 right-0 z-10 bg-[#191919]">
              <h1 className="ml-4 text-2xl font-semibold">XeroChat</h1>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="text-neutral-400 hover:text-white cursor-pointer mr-4"
              >
                <RiMenu3Line size={24} />
              </button>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="max-w-4xl w-full px-4 text-center">
                <h1 className="text-3xl md:text-4xl font-semibold mb-5">
                  Good to see you,{" "}
                  {session?.user?.name ? `${session.user.name}` : "anon"}
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-10 justify-center">
                  <div className="bg-[#222222] rounded-md p-4 border border-[#282828] flex items-center gap-3">
                    <FiZap size={22} className="text-yellow-400" />
                    <div>
                      <h3 className="font-medium mb-1">Ask</h3>
                      <p className="text-sm text-neutral-400">
                        Explain code, algorithms, concepts
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#222222] rounded-md p-4 border border-[#282828] flex items-center gap-3">
                    <ImPencil2 size={22} className="text-blue-400" />
                    <div>
                      <h3 className="font-medium mb-1">Create</h3>
                      <p className="text-sm text-neutral-400">
                        Draft docs, posts, stories
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#222222] rounded-md p-4 border border-[#282828] flex items-center gap-3">
                    <FaCodepen size={22} className="text-green-400" />
                    <div>
                      <h3 className="font-medium mb-1">Code</h3>
                      <p className="text-sm text-neutral-400">
                        Generate & refactor snippets
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#222222] rounded-md p-4 border border-[#282828] flex items-center gap-3">
                    <LuBrain size={22} className="text-purple-400" />
                    <div>
                      <h3 className="font-medium mb-1">Reason</h3>
                      <p className="text-sm text-neutral-400">
                        Walk through complex problems
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <MessageInput
              input={input}
              onInputChange={setInput}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              selectedModel={selectedModel}
              models={models}
              onOpenModelModal={() => setIsModelModalOpen(true)}
              onStop={stopGeneration}
            />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pb-40 relative">
            <MessageArea
              messages={messages}
              isLoading={isLoading}
              isThinking={isThinking}
              selectedModel={selectedModel}
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
              onOpenModelModal={() => setIsModelModalOpen(true)}
              onStop={stopGeneration}
            />
          </div>
        )}
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        apiKeyOpenRouter={apiKeyOpenRouter}
        onApiKeyOpenRouterChange={setApiKeyOpenRouter}
        apiKeyGemini={apiKeyGemini}
        onApiKeyGeminiChange={setApiKeyGemini}
        apiKeyMistral={apiKeyMistral}
        onApiKeyMistralChange={setApiKeyMistral}
        customInstructions={customInstructions}
        onCustomInstructionsChange={setCustomInstructions}
        onSave={saveAccessToken}
        onClose={() => setIsSettingsOpen(false)}
      />
      <ModelModal
        isOpen={isModelModalOpen}
        models={models as any}
        selectedModel={selectedModel as any}
        onSelectModel={(m: any) => {
          setSelectedModel(m);
          setIsModelModalOpen(false);
        }}
        onClose={() => setIsModelModalOpen(false)}
      />
    </div>
  );
}
