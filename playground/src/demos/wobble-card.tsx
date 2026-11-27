import { WobbleCard } from "@registry/wobble-card/wobble-card";

export function WobbleCardDemo() {
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 px-8 py-16 lg:grid-cols-3">
      <WobbleCard containerClassName="col-span-1 h-full min-h-[320px] bg-pink-800 lg:col-span-2">
        <div className="max-w-xs">
          <h3 className="text-left text-xl font-semibold tracking-[-0.015em] text-balance text-white lg:text-3xl">
            组件包不是仓库，是习惯
          </h3>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            收进来的每一个都得有图、有用法、有「什么时候别用它」。不然半年后就是一堆看不懂的代码。
          </p>
        </div>
        <img
          src="/screen.svg"
          width={500}
          height={500}
          alt=""
          className="absolute -right-4 -bottom-10 rounded-2xl object-contain grayscale filter lg:-right-[40%]"
        />
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 min-h-[320px] bg-blue-900">
        <h3 className="max-w-80 text-left text-xl font-semibold tracking-[-0.015em] text-balance text-white lg:text-3xl">
          鼠标进来，卡片就跟着走。
        </h3>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          位移量是光标相对卡片中心的偏移除以 20，最多几十像素。够轻，不会晃得头晕。
        </p>
      </WobbleCard>
    </div>
  );
}
