"use client";
import { movieData, movieType } from "@/data/movieData";
import Image from "next/image";
import { useEffect, useState } from "react";
import ScreenIdxBtn from "./ScreenIdxBtn";

const Screen = () => {
  const [zoom, setZoom] = useState<boolean>(false);
  const [contentIdx, setContentIdx] = useState<number>(0);

  let filteredMovie = movieData.filter((el) => el.classification === 1);

  const changeContent = () => {
    if (contentIdx === filteredMovie.length - 1) {
      setZoom(false);
      setContentIdx(0);
    } else {
      setZoom(false);
      setContentIdx(contentIdx + 1);
    }
  };

  useEffect(() => {
    setZoom(true);

    clearTimeout(0);

    let timer = setTimeout(() => {
      changeContent();
    }, 15000);

    return () => {
      clearTimeout(timer);
    };
  }, [contentIdx]);

  return (
    <div className="relative flex h-fit w-full flex-col items-center justify-center bg-black/60">
      <div className="relative flex aspect-video h-[calc(100vh)] flex-col items-center justify-center overflow-hidden bg-white/10 tablet:h-[calc(100vh-100px)]">
        {/* bg */}
        <Image
          alt="movie img"
          src={filteredMovie[contentIdx].background_img}
          width={0}
          height={0}
          priority
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className={
            zoom
              ? `scale-105 opacity-100 transition-transform duration-[8000ms] ease-in-out`
              : `scale-125`
          }
        />
        {/* bg effect */}
        <div className="absolute h-full w-full bg-gradient-to-r from-black/70"></div>
        <div className="absolute h-full w-full bg-gradient-to-l from-black/70"></div>
      </div>

      {/* info area */}
      <div className="absolute top-0 flex h-full w-full max-w-[1100px] flex-col-reverse items-center justify-center p-5 target:p-10 tablet:flex-row tablet:justify-between">
        {/* summary */}
        <div className="mt-8 flex h-fit w-full flex-col items-center justify-center font-NMSNeo2 text-sm leading-snug text-fontColor tablet:mt-0 tablet:w-[55%] tablet:items-end">
          {/* title */}
          <h1
            className={
              zoom
                ? `content_animation justify-ceneter font-NMSNeo flex h-fit w-fit translate-y-0 flex-col items-center text-2xl opacity-100 duration-[2000ms] ease-in-out tablet:text-3xl`
                : `justify-ceneter font-NMSNeo flex h-fit w-fit translate-y-10 flex-col items-center text-2xl opacity-0 tablet:text-3xl`
            }
          >
            {filteredMovie[contentIdx].title}
          </h1>
          {/* content */}
          <p
            className={
              zoom
                ? `content_animation mt-5 flex h-fit w-fit translate-y-0 flex-col items-center justify-center text-center font-NMSNeo2 text-xs leading-loose opacity-100 duration-[2500ms] ease-in-out target:mt-10 tablet:text-right tablet:text-sm tablet:leading-loose`
                : `mt-5 flex h-fit w-fit translate-y-10 flex-col items-center justify-center text-center font-NMSNeo2 text-xs leading-loose opacity-0 transition-none target:mt-10 tablet:text-right tablet:text-sm tablet:leading-loose`
            }
          >
            {filteredMovie[contentIdx].summary}
          </p>
          {/* 예매하기 버튼 */}
          <button
            type="button"
            className={
              zoom
                ? `content_animation mt-10 flex h-fit w-1/2 translate-y-0 flex-col items-center justify-center rounded-lg bg-pointColor px-5 py-3 font-NMSNeo3 text-sm text-white opacity-100 duration-[2500ms] ease-in-out hover:bg-pointColor/60 tablet:w-2/5 tablet:text-base`
                : `mt-10 flex h-fit w-1/2 translate-y-10 flex-col items-center justify-center rounded-lg bg-pointColor px-5 py-3 font-NMSNeo3 text-sm text-white opacity-0 tablet:w-2/5 tablet:text-base`
            }
          >
            예매하기
          </button>
        </div>
        {/* poster */}
        <div className="ml-0 mt-16 flex aspect-[3/4] w-[50%] flex-col items-center justify-center drop-shadow-xl tablet:ml-5 tablet:mt-0 tablet:w-2/5">
          <Image
            alt="movie img"
            src={filteredMovie[contentIdx].poster_img}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className={
              zoom
                ? `translate-y-0 opacity-100 transition-all duration-[1500ms] ease-in-out`
                : `translate-y-10 opacity-0`
            }
          />
        </div>
      </div>
      {/* screen idx btns */}
      <div className="absolute bottom-0 flex h-fit w-full flex-row items-center justify-center pb-5">
        {filteredMovie.map((movieInfo: movieType, idx: number) => {
          return (
            <ScreenIdxBtn
              key={`${movieInfo.title}_${idx}`}
              data={movieInfo}
              idx={contentIdx}
              setIdx={setContentIdx}
              setZoom={setZoom}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Screen;
