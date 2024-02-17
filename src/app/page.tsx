import Footer from "@/components/Home/Footer";
import Screen from "@/components/Home/Screen";
import { movieData } from "@/data/movieData";
import ContentArea from "../components/Home/ContentArea";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api");
  const serverDb = await res.json();

  console.log(serverDb);
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-start overflow-y-auto overflow-x-hidden bg-bgColor">
      {/* screen */}
      <Screen data={movieData} />

      {/* body frame */}
      <div className="flex h-fit w-full max-w-[1100px] flex-col items-center justify-start bg-bgColor ">
        {/* content Area */}
        <ContentArea data={movieData} />
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
}
