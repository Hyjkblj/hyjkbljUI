import { useCallback, useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { CodeBlock } from "@/components/CodeBlock";
import { DEMOS, REPO_URL, type DemoMeta } from "@/demos";

const IDS = DEMOS.map((d) => d.id);

function readHash(): string {
  const raw = window.location.hash.replace(/^#\/?/, "");
  return IDS.includes(raw) ? raw : IDS[0];
}

/** 组件信息条：编号 / 名称 / 依赖 */
function DemoHeader({ demo }: { demo: DemoMeta }) {
  return (
    <header className="border-b border-neutral-800 px-6 py-8 lg:px-12 lg:py-10">
      <p className="text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
        组件 {demo.index} · {demo.stack}
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-neutral-100">{demo.title}</h1>
      <code className="mt-1 inline-block font-mono text-[13px] text-sky-400">{demo.name}</code>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400">{demo.summary}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-[11.5px]">
        <span className="rounded-full border border-neutral-800 px-2.5 py-1 text-neutral-400">
          React
        </span>
        {demo.deps.length === 0 ? (
          <span className="rounded-full border border-emerald-900/60 bg-emerald-500/10 px-2.5 py-1 text-emerald-400">
            零依赖
          </span>
        ) : (
          demo.deps.map((d) => (
            <span
              key={d}
              className="rounded-full border border-neutral-800 px-2.5 py-1 font-mono text-neutral-400"
            >
              {d}
            </span>
          ))
        )}
      </div>
    </header>
  );
}

function SectionTitle({ children, hint }: { children: string; hint?: string }) {
  return (
    <div className="mb-4 flex items-baseline gap-3">
      <h2 className="text-sm font-semibold tracking-wide text-neutral-100">{children}</h2>
      {hint && <span className="text-[11.5px] text-neutral-600">{hint}</span>}
    </div>
  );
}

/** 用法 + 源码：直接内联在演示页里 */
function DemoDocs({ demo }: { demo: DemoMeta }) {
  return (
    <>
      <section
        id="usage"
        className="scroll-mt-4 border-t border-neutral-800 px-6 py-10 lg:px-12"
      >
        <SectionTitle hint="装包 → 引入 → 传 props">用法</SectionTitle>
        <div className="grid gap-4 lg:max-w-3xl">
          <CodeBlock code={demo.install} lang="bash" title="安装" />
          <CodeBlock code={demo.usage} lang="tsx" title="最小示例" />
        </div>
      </section>

      <section
        id="source"
        className="scroll-mt-4 border-t border-neutral-800 px-6 py-10 lg:px-12"
      >
        <SectionTitle hint={`${demo.source.split("\n").length} 行 · 收录时原样保留`}>
          源码
        </SectionTitle>
        <CodeBlock
          code={demo.source}
          lang="tsx"
          title={`registry/${demo.id}/${demo.id}.tsx`}
          maxHeight="38rem"
        />
      </section>
    </>
  );
}

/** 截图模式：?only=<id> 只渲染组件本身，不带侧栏、用法与源码 */
function Standalone({ demo }: { demo: DemoMeta }) {
  useEffect(() => {
    const y = Number(new URLSearchParams(window.location.search).get("scroll") ?? 0);
    if (y > 0) window.scrollTo(0, y);
  }, []);

  const { Render } = demo;
  return (
    <div className="min-h-screen bg-[#0B0B0F]">
      <DemoHeader demo={demo} />
      <Render />
    </div>
  );
}

function Shell() {
  const [active, setActive] = useState(readHash);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const onHash = () => setActive(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const select = useCallback((id: string) => {
    window.location.hash = `/${id}`;
    setActive(id);
    setDrawer(false);
    window.scrollTo(0, 0);
  }, []);

  const demo = DEMOS.find((d) => d.id === active) ?? DEMOS[0];
  const { Render } = demo;

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-neutral-200">
      <Sidebar
        active={demo.id}
        onSelect={select}
        className="fixed inset-y-0 left-0 z-30 hidden lg:flex"
      />

      {drawer && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawer(false)}
          />
          <Sidebar
            active={demo.id}
            onSelect={select}
            className="absolute inset-y-0 left-0 z-50 shadow-2xl"
          />
        </div>
      )}

      <div className="lg:pl-64">
        <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-neutral-800 bg-[#0B0B0F]/90 px-4 py-3 backdrop-blur lg:hidden">
          <button
            onClick={() => setDrawer(true)}
            aria-label="打开组件列表"
            className="rounded-md border border-neutral-800 px-2.5 py-1.5 text-sm text-neutral-300"
          >
            ☰
          </button>
          <span className="text-sm font-medium text-neutral-100">{demo.title}</span>
          <span className="ml-auto font-mono text-[11px] text-neutral-600">{demo.name}</span>
        </div>

        <DemoHeader demo={demo} />

        <main key={demo.id} className="min-h-[50vh]">
          <Render />
        </main>

        <DemoDocs demo={demo} />

        <footer className="border-t border-neutral-800 px-6 py-8 text-xs text-neutral-600 lg:px-12">
          <p>
            演示站 · {DEMOS.length} 个组件 ·{" "}
            <a
              href={`${REPO_URL}#readme`}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-500 underline-offset-2 hover:text-neutral-300 hover:underline"
            >
              Hyjkblj UI
            </a>
          </p>
          <p className="mt-1.5">
            截图直达：<code className="font-mono text-neutral-500">?only={demo.id}</code>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  const only = new URLSearchParams(window.location.search).get("only");
  const standalone = DEMOS.find((d) => d.id === only);
  return standalone ? <Standalone demo={standalone} /> : <Shell />;
}
