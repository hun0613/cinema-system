import FullScreenSkeletonAtom from "@/atomics/loader/FullScreenSkeletonAtom";
import BookComp from "@/components/books/BookComp";
import Footer from "@/components/mains/Footer";
import MovieOverviewComp from "@/components/movies/MovieOverviewComp";
import { Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";

const Book = ({ params }: { params: { id: number } }) => {
  return (
    <>
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-start overflow-y-auto overflow-x-hidden bg-bgColor">
        <Suspense fallback={<FullScreenSkeletonAtom />}>
          <MovieOverviewComp movieId={Number(params.id)} />
        </Suspense>
        <div className="flex h-fit w-full max-w-[1100px] flex-col items-center justify-start border-b border-borderColor">
          <BookComp movieId={Number(params.id)} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Book;
