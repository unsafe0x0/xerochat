"use client";

import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import hljs from "highlight.js";
import { Copy, Check } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  useEffect(() => {
    hljs.configure({
      languages: [
        "javascript",
        "typescript",
        "python",
        "java",
        "cpp",
        "html",
        "css",
        "json",
        "bash",
        "sql",
      ],
    });
  }, []);

  const CodeBlock = ({ children, className, ...props }: any) => {
    const [copied, setCopied] = useState(false);
    const codeRef = useRef<HTMLElement>(null);
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";

    const handleCopy = async () => {
      const code = codeRef.current?.textContent || "";

      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy code:", err);
      }
    };

    return (
      <div className="relative group mb-4">
        {language && (
          <div className="flex justify-between items-center bg-[#222222] px-4 py-2 rounded-t-lg border-b border-[#282828]">
            <span className="text-xs text-neutral-400 font-mono">
              {language}
            </span>
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#242424] hover:bg-[#282828] text-white px-2 py-1 rounded text-xs flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
        <pre
          className={`bg-[#191919] p-4 whitespace-pre-wrap break-words text-sm ${language ? "rounded-b-lg" : "rounded-lg"}`}
        >
          <code ref={codeRef} className={className} {...props}>
            {children}
          </code>
        </pre>
        {!language && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#242424] hover:bg-[#282828] text-white p-1.5 rounded text-xs flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";

            if (language) {
              return (
                <CodeBlock className={className} {...props}>
                  {children}
                </CodeBlock>
              );
            }

            return (
              <code
                className="bg-[#222222] px-1.5 py-0.5 rounded text-orange-300 text-sm break-words"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => {
            const codeChild = React.Children.toArray(children).find(
              (child: any) => child?.props?.className?.includes("language-"),
            );

            if (codeChild) {
              return <>{children}</>;
            }

            return (
              <pre className="bg-[#222222] p-4 rounded-lg whitespace-pre-wrap break-words mb-4 text-sm">
                {children}
              </pre>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-white mt-6 mb-3 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-white mt-5 mb-3 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-white mt-4 mb-2 first:mt-0">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-semibold text-white mt-3 mb-2 first:mt-0">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-4 text-neutral-100 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-1 text-neutral-100">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1 text-neutral-100">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-neutral-100">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#282828] pl-4 my-4 text-neutral-300 italic bg-[#222222] py-2">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border-collapse border border-[#282828]">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-[#282828] px-3 py-2 bg-[#242424] text-left font-semibold text-white">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-[#282828] px-3 py-2 text-neutral-100">
              {children}
            </td>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-orange-400 hover:text-orange-300 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-neutral-200">{children}</em>
          ),
          hr: () => <hr className="border-t border-[#282828] my-6" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
