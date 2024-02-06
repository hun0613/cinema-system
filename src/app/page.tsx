import ContentArea from "../components/ContentArea";

export default function Home() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-start overflow-y-auto overflow-x-hidden bg-bgColor">
      {/* body */}
      <div className="flex h-full min-h-screen w-full max-w-[1100px] flex-col items-center justify-start bg-contentAreaColor desktop:w-[80%]">
        {/* screen (컴포넌트화 예정) */}
        <div className="z-10 flex aspect-video w-full flex-col items-center justify-center bg-black"></div>
        {/* content Area */}
        <ContentArea />
      </div>
    </div>
  );
}
