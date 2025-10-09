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

function copyText(text: string) {
  if (navigator?.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Fallback copy failed", err);
  }
  document.body.removeChild(textarea);
  return Promise.resolve();
}

const InlineCode = ({ children, ...props }: any) => (
  <code
    className="bg-[#222222] px-2 py-0.5 text-sm text-red-400 font-mono border border-[#282828] whitespace-nowrap rounded-md select-none"
    {...props}
  >
    {children}
  </code>
);

function CodeBlock({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const getLanguage = () => {
    if (React.isValidElement(children)) {
      const codeElement = children as React.ReactElement<{
        className?: string;
      }>;
      const match = /language-(\w+)/.exec(codeElement.props.className || "");
      if (match) {
        const lang = match[1].toLowerCase();
        const languageMap: Record<string, string> = {
          js: "JavaScript",
          javascript: "JavaScript",
          ts: "TypeScript",
          typescript: "TypeScript",
          py: "Python",
          python: "Python",
          cpp: "C++",
          c: "C",
          java: "Java",
          html: "HTML",
          css: "CSS",
          scss: "SCSS",
          json: "JSON",
          bash: "Bash",
          shell: "Shell",
          sql: "SQL",
          rust: "Rust",
          go: "Go",
          php: "PHP",
          ruby: "Ruby",
          swift: "Swift",
          kotlin: "Kotlin",
          scala: "Scala",
          r: "R",
          matlab: "MATLAB",
          yaml: "YAML",
          yml: "YAML",
          xml: "XML",
          dockerfile: "Dockerfile",
          markdown: "Markdown",
          md: "Markdown",
          plaintext: "Text",
          txt: "Text",
        };
        return languageMap[lang] || lang.toUpperCase();
      }
    }
    return "CODE";
  };

  const handleCopy = () => {
    const code = preRef.current?.textContent ?? "";
    if (!code) return;
    copyText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative group my-6 w-full max-w-full border border-[#282828] bg-[#202020] overflow-hidden rounded-md">
      <div className="flex justify-between items-center bg-[#222222] px-4 py-2 border-b border-[#282828]">
        <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
          {getLanguage()}
        </span>
        <button
          onClick={handleCopy}
          className="opacity-70 hover:opacity-100 transition-all duration-200 bg-[#222222] hover:bg-[#242424] text-neutral-300 hover:text-white px-3 py-1.5 text-xs flex items-center gap-2 font-medium"
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
      <div className="overflow-x-auto w-full">
        <pre
          ref={preRef}
          className="p-2.5 text-sm leading-relaxed w-full text-neutral-200 whitespace-pre-wrap bg-[#252525]"
        >
          {children}
        </pre>
      </div>
    </div>
  );
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

  return (
    <div className="prose prose-invert max-w-none w-full min-w-0 overflow-hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            if (!match) return <InlineCode {...props}>{children}</InlineCode>;
            return (
              <code
                className={`${className} block text-neutral-200 whitespace-pre-wrap`}
                style={{ background: "transparent" }}
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
          h1: ({ children }) => (
            <h1 className="text-3xl font-semibold text-white mt-6 mb-3 first:mt-0 leading-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold text-white mt-6 mb-3 first:mt-0 leading-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-white mt-5 mb-2 first:mt-0 leading-tight">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-medium text-white mt-4 mb-2 first:mt-0 leading-tight">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-base font-medium text-white mt-4 mb-2 first:mt-0 leading-tight">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-sm font-medium text-white mt-3 mb-2 first:mt-0 leading-tight">
              {children}
            </h6>
          ),
          p: ({ node, children }) => {
            if (
              node &&
              node.children.some((child: any) => child.tagName === "img")
            ) {
              return <>{children}</>;
            }
            return (
              <p className="mb-4 text-neutral-300 leading-7 text-base break-words overflow-wrap-anywhere">
                {children}
              </p>
            );
          },
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-4 space-y-2 text-neutral-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-4 space-y-2 text-neutral-300">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-neutral-300 leading-7 break-words overflow-wrap-anywhere">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-red-400 bg-[#202020] pl-4 py-2 my-6">
              <div className="text-neutral-300 italic">{children}</div>
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-5 w-full max-w-full">
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-transparent max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-4rem)] lg:max-w-[850px]">
                <table className="border-collapse bg-[#202020] w-auto min-w-full border border-[#282828]">
                  {children}
                </table>
              </div>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#222222]">{children}</thead>
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
            <td className="px-4 py-3 text-neutral-300 text-sm whitespace-nowrap">
              {children}
            </td>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-red-400 hover:text-red-500 underline transition-colors duration-200 break-all overflow-wrap-anywhere"
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
            <em className="italic text-neutral-300">{children}</em>
          ),
          hr: () => <hr className="border-t border-[#282828] my-8" />,
          img: ({ src, alt }) => (
            <div className="my-6">
              <img
                src={src}
                alt={alt}
                className="max-w-full h-auto rounded-md"
              />
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
