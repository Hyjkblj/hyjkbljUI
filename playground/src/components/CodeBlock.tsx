import { useState } from "react";
import { cn } from "@/lib/utils";

const KEYWORDS =
  /\b(import|from|export|default|const|let|var|function|return|if|else|for|while|new|class|extends|async|await|type|interface|typeof|instanceof|in|of|as|null|undefined|true|false|void|this)\b/;

/** 单遍扫描：注释 → 字符串 → 关键字 → 数字 → JSX 标签 */
const TOKEN =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(<\/?)([A-Za-z][\w.]*)|(\b\d+(?:\.\d+)?\b)/g;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function highlight(src: string): string {
  let out = "";
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN.lastIndex = 0;

  while ((m = TOKEN.exec(src))) {
    out += esc(src.slice(last, m.index));
    if (m[1]) {
      out += `<span class="text-neutral-500 italic">${esc(m[1])}</span>`;
    } else if (m[2]) {
      out += `<span class="text-emerald-300/90">${esc(m[2])}</span>`;
    } else if (m[3]) {
      out += esc(m[3]);
      out += `<span class="text-rose-300">${esc(m[4])}</span>`;
    } else if (m[5]) {
      out += `<span class="text-amber-300/90">${esc(m[5])}</span>`;
    }
    last = TOKEN.lastIndex;
  }
  out += esc(src.slice(last));

  // 关键字二次着色：只处理标签外的纯文本段，避免破坏已有 span
  return out.replace(
    /(^|>)([^<]+)/g,
    (_all, lead: string, text: string) =>
      lead +
      text.replace(
        new RegExp(KEYWORDS.source, "g"),
        (kw) => `<span class="text-sky-400">${kw}</span>`,
      ),
  );
}

type Props = {
  code: string;
  lang?: string;
  title?: string;
  className?: string;
  maxHeight?: string;
};

export function CodeBlock({ code, lang = "tsx", title, className, maxHeight }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* 剪贴板不可用时静默失败 */
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-neutral-800 bg-[#0D0D12]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-neutral-800 px-3 py-2">
        <span className="font-mono text-[11px] text-neutral-500">{title ?? lang}</span>
        <button
          onClick={copy}
          className="rounded border border-neutral-800 px-2 py-0.5 font-mono text-[11px] text-neutral-400 transition-colors hover:border-neutral-600 hover:text-neutral-200"
        >
          {copied ? "已复制" : "复制"}
        </button>
      </div>
      <pre
        className="overflow-auto p-4 text-[12.5px] leading-[1.65] text-neutral-300"
        style={maxHeight ? { maxHeight } : undefined}
      >
        <code
          className="font-mono whitespace-pre"
          dangerouslySetInnerHTML={{ __html: highlight(code) }}
        />
      </pre>
    </div>
  );
}
