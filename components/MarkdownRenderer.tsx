"use client";

import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import hljs from "highlight.js";
import { MdContentCopy } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";

interface MarkdownRendererProps {
  content: string;
  isStreaming?: boolean;
}

export default function MarkdownRenderer({
  content,
  isStreaming = false,
}: MarkdownRendererProps) {
  useEffect(() => {
    hljs.configure({
      languages: [
        "javascript",
        "typescript",
        "python",
        "java",
        "cpp",
        "c",
        "html",
        "css",
        "scss",
        "json",
        "bash",
        "shell",
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
        "yaml",
        "xml",
        "dockerfile",
        "markdown",
        "plaintext",
      ],
    });
  }, []);

  const CodeBlock = ({ children, className, ...props }: any) => {
    const [copied, setCopied] = useState(false);
    const codeRef = useRef<HTMLElement>(null);
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "text";

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
      <div className="relative group my-6 w-full max-w-full rounded-md border border-[#282828] bg-[#222222] overflow-hidden">
        <div className="flex justify-between items-center bg-[#252525] px-4 py-2 border-b border-[#282828]">
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="opacity-70 hover:opacity-100 transition-all duration-200 bg-[#252525] hover:bg-[#222222] text-neutral-300 hover:text-white px-3 py-1.5 rounded-md text-xs flex items-center gap-2 font-medium"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <IoMdCheckmark size={12} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <MdContentCopy size={12} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="overflow-x-auto scrollbar-[3px] scrollbar-thumb-gray-600 scrollbar-track-transparent max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-4rem)] lg:max-w-[850px]">
          <pre className="p-4 text-sm leading-relaxed min-w-0">
            <code
              ref={codeRef}
              className={`${className} block text-[#e6e6e6] whitespace-pre`}
              {...props}
            >
              {children}
            </code>
          </pre>
        </div>
      </div>
    );
  };

  const InlineCode = ({ children, ...props }: any) => (
    <code
      className="bg-[#252525] px-2 py-0.5 rounded-md text-sm text-[#ff6b6b] font-mono border border-[#282828] break-all max-w-full inline-block"
      {...props}
    >
      {children}
    </code>
  );

  return (
    <div className="prose prose-invert max-w-none w-full min-w-0 overflow-hidden">
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
            const codeChild = React.Children.toArray(children).find(
              (child: any) => child?.props?.className?.includes("language-")
            );

            if (codeChild) {
              return <>{children}</>;
            }

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

            return (
              <div className="relative group my-6 w-full rounded-md border border-[#282828] bg-[#222222] overflow-hidden">
                <div className="flex justify-between items-center bg-[#252525] px-4 py-2 border-b border-[#282828]">
                  <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                    text
                  </span>
                  <button
                    onClick={handleCopy}
                    className="opacity-70 hover:opacity-100 transition-all duration-200 bg-[#252525] hover:bg-[#222222] text-neutral-300 hover:text-white px-3 py-1.5 rounded-md text-xs flex items-center gap-2 font-medium"
                    aria-label="Copy code"
                  >
                    {copied ? (
                      <>
                        <IoMdCheckmark size={12} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <MdContentCopy size={12} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="overflow-x-auto scrollbar-[3px] scrollbar-thumb-gray-600 scrollbar-track-transparent max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-4rem)] lg:max-w-[850px]">
                  <pre
                    ref={preRef}
                    className="p-4 text-sm leading-relaxed text-[#e6e6e6] min-w-0 whitespace-pre"
                  >
                    {children}
                  </pre>
                </div>
              </div>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-xl font-bold text-white mt-6 mb-3 first:mt-0 leading-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-semibold text-white mt-6 mb-3 first:mt-0 leading-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-semibold text-white mt-5 mb-2 first:mt-0 leading-tight">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-medium text-white mt-4 mb-2 first:mt-0 leading-tight">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-sm font-medium text-white mt-4 mb-2 first:mt-0 leading-tight">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-sm font-medium text-white mt-3 mb-2 first:mt-0 leading-tight">
              {children}
            </h6>
          ),
          p: ({ children }) => (
            <p className="mb-4 text-[#e6e6e6] leading-7 text-base break-words overflow-wrap-anywhere">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-4 space-y-2 text-[#e6e6e6]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-4 space-y-2 text-[#e6e6e6]">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-[#e6e6e6] leading-7 break-words overflow-wrap-anywhere">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#4a90e2] bg-[#222222] pl-4 py-2 my-6 rounded-r-lg">
              <div className="text-[#d1d5db] italic">{children}</div>
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-5 w-full max-w-full">
              <div className="overflow-x-auto scrollbar-[3px] scrollbar-thumb-gray-600 scrollbar-track-transparent max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-4rem)] lg:max-w-[850px]">
                <table className="border-collapse bg-[#222222] w-auto min-w-full rounded-md border border-[#282828]">
                  {children}
                </table>
              </div>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#252525]">{children}</thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-[#282828] last:border-b-0">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left font-semibold text-white text-sm whitespace-nowrap">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-[#e6e6e6] text-sm whitespace-nowrap">
              {children}
            </td>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-[#4a90e2] hover:text-[#60a5fa] underline transition-colors duration-200 break-all overflow-wrap-anywhere"
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
            <em className="italic text-[#d1d5db]">{children}</em>
          ),
          hr: () => <hr className="border-t border-[#282828] my-8" />,
          img: ({ src, alt }) => (
            <div className="my-6">
              <img
                src={src}
                alt={alt}
                className="max-w-full h-auto rounded-md shadow-xl border border-[#282828]"
              />
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
      {isStreaming && (
        <span className="inline-block w-2 h-5 bg-white animate-pulse ml-1" />
      )}
    </div>
  );
}
