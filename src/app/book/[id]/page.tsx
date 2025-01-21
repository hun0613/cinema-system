import BodyArea from "@/components/Book/BodyArea";
import MovieInfoComp from "@/components/Book/MovieInfoComp";
import Footer from "@/components/Home/Footer";
import { Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";

const Book = ({ params }: { params: { id: number } }) => {
  return (
    <>
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-start overflow-y-auto overflow-x-hidden bg-bgColor">
        {/* 영화정보 */}
        <Suspense fallback={<></>}>
          <MovieInfoComp movieId={params.id} />\
        </Suspense>
        {/* body frame */}
        <div className="bg-bgColors flex h-fit w-full max-w-[1100px] flex-col items-center justify-start border-b border-borderColor ">
          {/* content Area */}
          <Suspense fallback={<></>}>
            <BodyArea movieId={params.id} />
          </Suspense>
        </div>

        {/* footer */}
        <Footer />
      </div>
    </>
  );
};

export default Book;
