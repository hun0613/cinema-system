import Image from "next/image";
import ContentArea from "../components/Home/ContentArea";

export default function Home() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-start overflow-y-auto overflow-x-hidden bg-bgColor">
      {/* screen (컴포넌트화 예정) */}
      <div className="flex h-fit w-full flex-col items-center justify-center bg-black/60">
        <div className="relative flex aspect-video h-[calc(100vh-100px)] flex-col items-center justify-center bg-white/10">
          <Image
            alt="movie img"
            src={"/images/dummyImg.jpg"}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <div className="absolute h-full w-full bg-gradient-to-r from-black/70"></div>
          <div className="absolute h-full w-full bg-gradient-to-l from-black/70"></div>
        </div>
      </div>
      {/* body */}
      <div className="flex h-full min-h-screen w-full max-w-[1100px] flex-col items-center justify-start bg-bgColor ">
        {/* content Area */}
        <ContentArea />
      </div>
    </div>
  );
}
