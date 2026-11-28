import { BarChart3, Bell, Home } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@registry/tabs/tabs";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-medium tracking-wider text-neutral-500 uppercase">
        {title}
      </span>
      {children}
    </div>
  );
}

export function TabsDemo() {
  return (
    <div className="flex w-full justify-center px-6 py-16">
      <div className="flex w-full max-w-md flex-col gap-8">
        <Section title="Pill">
          <Tabs defaultValue="overview" variant="pill">
            <TabsList>
              <TabsTrigger value="overview">概览</TabsTrigger>
              <TabsTrigger value="activity">动态</TabsTrigger>
              <TabsTrigger value="settings">设置</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="text-sm text-neutral-500">
              高层汇总。
            </TabsContent>
            <TabsContent value="activity" className="text-sm text-neutral-500">
              最近发生的事。
            </TabsContent>
            <TabsContent value="settings" className="text-sm text-neutral-500">
              偏好设置。
            </TabsContent>
          </Tabs>
        </Section>

        <Section title="Segment">
          <Tabs defaultValue="day" variant="segment">
            <TabsList>
              <TabsTrigger value="day">日</TabsTrigger>
              <TabsTrigger value="week">周</TabsTrigger>
              <TabsTrigger value="month">月</TabsTrigger>
            </TabsList>
          </Tabs>
        </Section>

        <Section title="Underline">
          <Tabs defaultValue="all" variant="underline">
            <TabsList>
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="open">进行中</TabsTrigger>
              <TabsTrigger value="closed">已关闭</TabsTrigger>
            </TabsList>
          </Tabs>
        </Section>

        <Section title="图标只在选中时展开">
          <Tabs defaultValue="home" variant="pill" icons="selected">
            <TabsList>
              <TabsTrigger value="home" icon={<Home className="size-3.5" />}>首页</TabsTrigger>
              <TabsTrigger value="stats" icon={<BarChart3 className="size-3.5" />}>统计</TabsTrigger>
              <TabsTrigger value="alerts" icon={<Bell className="size-3.5" />}>提醒</TabsTrigger>
            </TabsList>
          </Tabs>
        </Section>

        <Section title="超长列表横向滚动">
          <Tabs defaultValue="概览" className="w-full max-w-xs">
            <TabsList>
              {["概览", "动态", "分析", "成员", "账单", "设置", "集成", "日志"].map((label) => (
                <TabsTrigger key={label} value={label}>{label}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </Section>

        <p className="text-center text-xs text-neutral-500">
          指示器用 layoutId 在标签间弹簧滑动；三种样式共用一套组合 API。
        </p>
      </div>
    </div>
  );
}
