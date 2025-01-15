import ContentArea from "@/components/Home/ContentArea";
import Footer from "@/components/Home/Footer";
import Screen from "@/components/Home/Screen";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api`, {
    // cache: "force-cache",
    cache: "no-store",
  });
  const serverDb = await res.json();

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-start overflow-y-auto overflow-x-hidden bg-bgColor">
      {/* screen */}
      <Screen data={serverDb} />

      {/* body frame */}
      <div className="flex h-fit w-full max-w-[1100px] flex-col items-center justify-start bg-bgColor ">
        {/* content Area */}
        <ContentArea data={serverDb} />
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
}
