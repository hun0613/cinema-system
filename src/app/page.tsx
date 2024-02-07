import ContentArea from "../components/ContentArea";

export default function Home() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-start overflow-y-auto overflow-x-hidden bg-bgColor">
      {/* screen (컴포넌트화 예정) */}
      <div className="flex h-fit w-full flex-col items-center justify-center bg-black">
        <div className="aspect-video w-full max-w-[1100px] bg-white/10"></div>
      </div>
      {/* body */}
      <div className="flex h-full min-h-screen w-full max-w-[1100px] flex-col items-center justify-start bg-bgColor ">
        {/* content Area */}
        <ContentArea />
      </div>
    </div>
  );
}
