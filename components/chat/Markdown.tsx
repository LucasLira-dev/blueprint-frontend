import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface props {
    content: string;
}

export const Markdown = ({ content }: props) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-4">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mt-6 mb-3">
              {children}
            </h2>
          ),

          p: ({ children }) => (
            <p className="leading-7 mb-4">
              {children}
            </p>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    )
}