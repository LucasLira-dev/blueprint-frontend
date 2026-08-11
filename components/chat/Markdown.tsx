import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface Props {
  content: string;
}

const CodeBlock = ({ language, children }: { language?: string; children: React.ReactNode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <div className="flex items-center justify-between bg-zinc-900 border border-zinc-700 rounded-t-lg px-4 py-2">
        <span className="text-xs text-zinc-400 font-mono">{language || "code"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copiado!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copiar
            </>
          )}
        </button>
      </div>
      <pre className="bg-zinc-950 border border-t-0 border-zinc-700 rounded-b-lg p-4 overflow-x-auto">
        <code className="text-sm font-mono text-zinc-100">{children}</code>
      </pre>
    </div>
  );
};

export const Markdown = ({ content }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mb-4 mt-6 text-white">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold mb-3 mt-5 text-white">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold mb-2 mt-4 text-white">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-lg font-medium mb-2 mt-3 text-white">{children}</h4>
        ),
        p: ({ children }) => (
          <p className="leading-7 mb-4 text-zinc-200">{children}</p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
          >
            {children}
          </a>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-white">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-zinc-300">{children}</em>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-4 ml-2 space-y-1 text-zinc-200">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-4 ml-2 space-y-1 text-zinc-200">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="leading-7">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-zinc-300 bg-zinc-800/50 py-2 pr-4 rounded-r-lg">
            {children}
          </blockquote>
        ),
        code: ({ className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          const isInline = !match && !className;

          if (isInline) {
            return (
              <code className="bg-zinc-800 text-pink-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            );
          }

          return (
            <CodeBlock language={match?.[1]}>{children}</CodeBlock>
          );
        },
        pre: ({ children }) => <>{children}</>,
        hr: () => <hr className="my-8 border-zinc-700" />,
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="w-full border-collapse border border-zinc-700">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-zinc-800">{children}</thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-zinc-700">{children}</tbody>
        ),
        tr: ({ children }) => (
          <tr className="hover:bg-zinc-800/50 transition-colors">{children}</tr>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-left text-sm font-semibold text-white border border-zinc-700">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-sm text-zinc-200 border border-zinc-700">{children}</td>
        ),
        input: ({ checked, ...props }) => (
          <input
            type="checkbox"
            checked={checked}
            readOnly
            className="mr-2 rounded border-zinc-600 bg-zinc-800"
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}