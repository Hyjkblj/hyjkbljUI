import { useEffect, useState } from "react";
import { UserRoundPlusIcon, UsersRoundIcon } from "lucide-react";
import { Skeleton } from "@registry/skeleton/skeleton";

const USERS = [
  { delay: 1800, initials: "SJ", name: "Sarah Johnson", role: "Design Engineer", followers: "15k", tone: "from-rose-400 to-orange-400" },
  { delay: 2600, initials: "MA", name: "Mark Bennett Andersson", role: "Product Designer", followers: "8k", tone: "from-sky-400 to-indigo-500" },
  { delay: 2200, initials: "AR", name: "Alex Rivera", role: "UI/UX Designer", followers: "12k", tone: "from-emerald-400 to-teal-500" },
];

function RowSkeleton() {
  return (
    <>
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <Skeleton className="h-4 w-40 max-w-full" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
      <Skeleton className="h-7 w-20 shrink-0 rounded-md" />
    </>
  );
}

function Row({ delay, user }: { delay: number; user: (typeof USERS)[number] }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!loaded) return <RowSkeleton />;

  return (
    <>
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${user.tone} text-[11px] font-semibold text-white`}
      >
        {user.initials}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h4 className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {user.name}
        </h4>
        <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="truncate">{user.role}</span>
          <span className="flex min-w-0 items-center gap-1">
            <UsersRoundIcon className="size-3 shrink-0" />
            <span className="truncate">{user.followers}</span>
          </span>
        </div>
      </div>
      <button className="flex h-7 shrink-0 items-center gap-1 rounded-md border border-neutral-200 px-2.5 text-xs text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-white/[0.06]">
        <UserRoundPlusIcon className="size-3.5" />
        Follow
      </button>
    </>
  );
}

export function SkeletonDemo() {
  const [round, setRound] = useState(0);

  return (
    <div className="flex flex-col items-center gap-6 px-6 py-16">
      <div key={round} className="flex w-full max-w-md flex-col gap-6">
        {USERS.map((user) => (
          <div className="flex items-center gap-4" key={user.initials}>
            <Row delay={user.delay} user={user} />
          </div>
        ))}
      </div>

      <button
        onClick={() => setRound((r) => r + 1)}
        className="rounded-full border border-neutral-200 px-4 py-1.5 text-xs text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-100"
      >
        重放加载 ↻
      </button>

      <p className="max-w-md text-center text-xs text-neutral-500">
        每一行有各自的延迟（1.8s / 2.6s / 2.2s），骨架先出现，数据到齐后替换成真实内容。
      </p>
    </div>
  );
}
