import FullScreenSkeletonAtom from "@/atomic/loader/FullScreenSkeletonAtom";
import Footer from "@/components/main/Footer";
import MovieOverviewComp from "@/components/movies/MovieOverviewComp";
import MoviesComp from "@/components/movies/MoviesComp";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-start overflow-x-hidden bg-bgColor">
      <Suspense fallback={<FullScreenSkeletonAtom />}>
        <MovieOverviewComp />
      </Suspense>
      <div className="w-full max-w-[1100px]">
        <MoviesComp />
      </div>
      <Footer />
    </div>
  );
}
