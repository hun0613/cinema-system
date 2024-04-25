"use client";
import BodyArea from "@/components/Book/BodyArea";
import MovieInfoComp from "@/components/Book/MovieInfoComp";
import Footer from "@/components/Home/Footer";
import { useMovieStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Book = ({ params }: { params: { slug: number } }) => {
  const router = useRouter();

  // 영화 서버데이터 (전역상태)
  const { setDb } = useMovieStore();

  useEffect(() => {
    // 최초 랜더링 시 데이터 받아오기
    fetch(`/book/api?id=${+params.slug}`)
      .then((res) => res.json())
      .then((res2) => setDb(res2[0]));

    // 뒤로가기 버튼 클릭 시 홈으로 라우팅 (새로고침 후 서버사이드랜더링 에러 발생에 대한 작업)
    if (typeof window !== "undefined") {
      window.addEventListener("popstate", () => {
        router.push(`/`);
      });
    }

    return () => {
      window.removeEventListener("popstate", () => router.push(`/`));
    };
  }, []);

  return (
    <>
      <ToastContainer />

      <div className="flex h-full min-h-screen w-full flex-col items-center justify-start overflow-y-auto overflow-x-hidden bg-bgColor">
        {/* 영화정보 */}
        <MovieInfoComp />
        {/* body frame */}
        <div className="bg-bgColors flex h-fit w-full max-w-[1100px] flex-col items-center justify-start border-b border-borderColor ">
          {/* content Area */}
          <BodyArea />
        </div>

        {/* footer */}
        <Footer />
      </div>
    </>
  );
};

export default Book;
