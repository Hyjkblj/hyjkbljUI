import { MacbookScroll } from "@registry/macbook-scroll/macbook-scroll";

export function MacbookScrollDemo() {
  return (
    <MacbookScroll
      title={
        <span>
          滚动让我打开。 <br /> 就这么简单。
        </span>
      }
      src="/screen.svg"
      showGradient={false}
    />
  );
}
