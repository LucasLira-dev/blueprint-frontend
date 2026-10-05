import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Check, Copy, Terminal } from "lucide-react";

interface TopicProseProps {
    content: string;
}

const CodeBlock = ({
    language,
    caption,
    children,
}: {
    language?: string;
    caption?: string;
    children: React.ReactNode;
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(String(children));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-5 overflow-hidden rounded-xl border border-border/70 bg-background/80">
            <div className="flex items-center justify-between gap-3 border-b border-border/70 bg-surface/60 px-4 py-2.5">
                <div className="flex min-w-0 items-center gap-2">
                    <Terminal className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="truncate text-xs font-medium text-foreground/85">
                        {caption || language || "código"}
                    </span>
                </div>
                <button
                    type="button"
                    onClick={handleCopy}
                    className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                >
                    {copied ? (
                        <>
                            <Check className="h-3.5 w-3.5 text-primary" />
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
            <pre className="overflow-x-auto p-4">
                <code className="font-mono text-[13px] leading-relaxed text-foreground/90">
                    {children}
                </code>
            </pre>
        </div>
    );
};

export const TopicProse = ({ content }: TopicProseProps) => {
    return (
        <div className="deep-learning-prose text-[15px] leading-relaxed text-foreground/85">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    h3: ({ children }) => (
                        <h3 className="mb-3 mt-6 text-base font-semibold text-foreground">
                            {children}
                        </h3>
                    ),
                    h4: ({ children }) => (
                        <h4 className="mb-2 mt-5 text-sm font-semibold text-foreground">
                            {children}
                        </h4>
                    ),
                    p: ({ children }) => (
                        <p className="mb-4 leading-relaxed">{children}</p>
                    ),
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            rel="noopener noreferrer"
                            className="text-primary underline underline-offset-4 transition-colors hover:text-primary-glow"
                        >
                            {children}
                        </a>
                    ),
                    strong: ({ children }) => (
                        <strong className="font-semibold text-foreground">{children}</strong>
                    ),
                    em: ({ children }) => <em className="italic">{children}</em>,
                    ul: ({ children }) => (
                        <ul className="mb-4 ml-1 list-disc space-y-1.5 pl-5 marker:text-muted-foreground">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="mb-4 ml-1 list-decimal space-y-1.5 pl-5 marker:text-muted-foreground">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                    blockquote: ({ children }) => (
                        <blockquote className="my-4 rounded-r-xl border-l border-primary/40 bg-surface/40 py-3 pl-4 pr-4 text-muted-foreground">
                            {children}
                        </blockquote>
                    ),
                    code: ({ className, children, node, ...props }) => {
                        const match = /language-(\w+)/.exec(className || "");
                        const isInline = !match && !className;

                        if (isInline) {
                            return (
                                <code
                                    className="rounded-md bg-surface-elevated px-1.5 py-0.5 font-mono text-[0.85em] text-primary"
                                    {...props}
                                >
                                    {children}
                                </code>
                            );
                        }

                        let caption: string | undefined;
                        const codeNode = node as
                            | { meta?: string; data?: { meta?: string } }
                            | undefined;
                        const meta = codeNode?.data?.meta ?? codeNode?.meta;
                        if (meta) {
                            caption = meta.replace(/^"(.*)"$/, "$1");
                        }

                        return (
                            <CodeBlock language={match?.[1]} caption={caption}>
                                {children}
                            </CodeBlock>
                        );
                    },
                    pre: ({ children }) => <>{children}</>,
                    hr: () => <hr className="my-6 border-border/70" />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};