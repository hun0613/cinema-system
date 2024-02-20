"use client";
import MovieInfoComp from "@/components/Book/MovieInfoComp";
import Footer from "@/components/Home/Footer";
import { movieType } from "@/data/movieData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Book = ({ params }: { params: { slug: number } }) => {
  // const serverDb = res.json();
  const [db, setDb] = useState<movieType | null>(null);
  const router = useRouter();

  console.log(db);

  useEffect(() => {
    fetch(`http://localhost:3000/book/api?id=${+params.slug}`)
      .then((res) => res.json())
      .then((res2) => setDb(res2));

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
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-start overflow-y-auto overflow-x-hidden bg-bgColor">
      {/* {movieData.filter((el) => el.id === +params.slug)[0].title} */}
      <MovieInfoComp />

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Book;
