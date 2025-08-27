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
        "rust",
        "go",
        "php",
        "ruby",
        "swift",
        "kotlin",
        "scala",
        "r",
        "matlab",
        "shell",
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
      <div className="relative group mb-4 sm:mb-6 w-full max-w-full">
        {language && (
          <div className="flex justify-between items-center bg-[#222222] px-2 sm:px-3 py-1.5 sm:py-2 rounded-t-lg border-b border-[#282828] min-w-0">
            <span className="text-xs text-neutral-400 font-mono truncate mr-1 sm:mr-2 flex-1 min-w-0">
              {language}
            </span>
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#242424] hover:bg-[#282828] text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs flex items-center gap-1 cursor-pointer flex-shrink-0"
              aria-label="Copy code"
            >
              {copied ? <Check size={10} /> : <Copy size={10} />}
              <span className="hidden sm:inline text-xs">
                {copied ? "Copied!" : "Copy"}
              </span>
            </button>
          </div>
        )}
        <div className="overflow-hidden rounded-b-lg max-w-full">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <pre
              className={`bg-[#191919] p-2 sm:p-3 text-xs leading-relaxed ${
                language ? "" : "rounded-lg"
              } min-w-0`}
            >
              <code
                ref={codeRef}
                className={`${className} block whitespace-pre-wrap break-all`}
                {...props}
              >
                {children}
              </code>
            </pre>
          </div>
        </div>
        {!language && (
          <button
            onClick={handleCopy}
            className="absolute top-1 right-1 sm:top-2 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#242424] hover:bg-[#282828] text-white p-1 sm:p-1.5 rounded cursor-pointer flex-shrink-0"
            aria-label="Copy code"
          >
            {copied ? <Check size={10} /> : <Copy size={10} />}
          </button>
        )}
      </div>
    );
  };

  const InlineCode = ({ children, ...props }: any) => (
    <code
      className="bg-[#222222] px-1 sm:px-1.5 py-0.5 rounded text-xs text-orange-300 font-mono break-all inline-block max-w-full"
      {...props}
    >
      {children}
    </code>
  );

  return (
    <div className="markdown-content w-full max-w-full overflow-hidden">
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

            return <InlineCode {...props}>{children}</InlineCode>;
          },
          pre: ({ children }) => {
            const [copied, setCopied] = useState(false);
            const preRef = useRef<HTMLPreElement>(null);

            const handleCopy = async () => {
              const code = preRef.current?.textContent || "";
              try {
                await navigator.clipboard.writeText(code);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              } catch (err) {
                console.error("Failed to copy code:", err);
              }
            };

            const codeChild = React.Children.toArray(children).find(
              (child: any) => child?.props?.className?.includes("language-")
            );

            if (codeChild) {
              return <>{children}</>;
            }

            return (
              <div className="relative group mb-4 sm:mb-6 w-full max-w-full">
                <div className="overflow-hidden rounded-lg max-w-full">
                  <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                    <pre
                      ref={preRef}
                      className="bg-[#191919] p-2 sm:p-3 text-xs leading-relaxed whitespace-pre-wrap break-all min-w-0"
                    >
                      {children}
                    </pre>
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="absolute top-1 right-1 sm:top-2 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#242424] hover:bg-[#282828] text-white p-1 sm:p-1.5 rounded cursor-pointer flex-shrink-0"
                  aria-label="Copy code"
                >
                  {copied ? <Check size={10} /> : <Copy size={10} />}
                </button>
              </div>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mt-6 sm:mt-8 mb-3 sm:mb-4 first:mt-0 leading-tight break-words">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white mt-5 sm:mt-6 mb-2 sm:mb-3 first:mt-0 leading-tight break-words">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white mt-4 sm:mt-5 mb-2 sm:mb-3 first:mt-0 leading-tight break-words">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white mt-3 sm:mt-4 mb-2 first:mt-0 leading-tight break-words">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-xs sm:text-sm md:text-base font-semibold text-white mt-3 mb-2 first:mt-0 leading-tight break-words">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-xs sm:text-sm font-semibold text-white mt-3 mb-2 first:mt-0 leading-tight break-words">
              {children}
            </h6>
          ),
          p: ({ children }) => (
            <p className="mb-3 sm:mb-4 text-neutral-100 leading-relaxed text-sm break-words hyphens-auto overflow-wrap-anywhere">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-3 sm:mb-4 space-y-1 text-neutral-100 ml-2 sm:ml-3 overflow-hidden break-words">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-3 sm:mb-4 space-y-1 text-neutral-100 ml-2 sm:ml-3 overflow-hidden break-words">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-neutral-100 leading-relaxed break-words overflow-wrap-anywhere">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#282828] pl-2 sm:pl-3 my-3 sm:my-4 text-neutral-300 italic bg-[#222222] py-2 rounded-r-lg overflow-hidden break-words">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-3 sm:my-4 w-full max-w-full scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              <table className="w-full border-collapse table-fixed sm:table-auto">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#242424]">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-1 sm:px-2 py-1.5 sm:py-2 text-left font-semibold text-white text-xs sm:text-sm break-words">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-1 sm:px-2 py-1.5 sm:py-2 text-neutral-100 text-xs sm:text-sm break-words">
              {children}
            </td>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-orange-400 hover:text-orange-300 underline break-all overflow-wrap-anywhere"
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
          hr: () => <hr className="border-t border-[#282828] my-8" />,
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="max-w-full h-auto rounded-lg my-3 sm:my-4 shadow-lg"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
