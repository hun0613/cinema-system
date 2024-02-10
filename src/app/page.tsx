import Footer from "@/components/Home/Footer";
import Screen from "@/components/Home/Screen";
import ContentArea from "../components/Home/ContentArea";

export default function Home() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-start overflow-y-auto overflow-x-hidden bg-bgColor">
      {/* screen */}
      <Screen />

      {/* body frame */}
      <div className="flex h-fit w-full max-w-[1100px] flex-col items-center justify-start bg-bgColor ">
        {/* content Area */}
        <ContentArea />
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
}
