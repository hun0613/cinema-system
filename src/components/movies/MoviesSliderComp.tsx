"use client";
import { MovieType } from "@/actions/movies/useFetchMovieAction";
import { getFetchMoviesQuery } from "@/actions/movies/useFetchMoviesAction";
import { MOVIE_CLASSIFICATION } from "@/enums/movies/movieEnum";
import useCheckMobile from "@/hooks/useCheckMobile";
import { mergeClassNames } from "@/utils/domUtil";
import { useSuspenseQueries } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const MoviesSliderComp = () => {
  const [{ data: movies }] = useSuspenseQueries({
    queries: [getFetchMoviesQuery()],
  });
  const filteredMovie: MovieType[] = useMemo(() => movies.filter((el) => el.classification === MOVIE_CLASSIFICATION.IN_PROGRESS), [movies]);

  const [zoom, setZoom] = useState<boolean>(false);
  const [contentIdx, setContentIdx] = useState<number>(0);

  const router = useRouter();

  const { isMobile } = useCheckMobile();

  const changeContent = () => {
    // 마지막 컨텐츠에서 전환될 때
    if (contentIdx === filteredMovie.length - 1) {
      // 애니메이션 효과 초기화
      setZoom(false);
      setContentIdx(0);
    } else {
      setZoom(false);
      setContentIdx(contentIdx + 1);
    }
  };

  const handleClickBook = () => {
    router.push(`/book/${filteredMovie[contentIdx].id}`);
  };

  useEffect(() => {
    setZoom(true);

    clearTimeout(0);

    // 캐러셀 컨텐츠 전환 (10초 간격)
    let timer = setTimeout(() => {
      changeContent();
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, [contentIdx]);

  return (
    <div className="relative flex h-fit w-full flex-col items-center justify-center bg-screenColor">
      <div
        className={mergeClassNames(
          "relative flex aspect-video h-[calc(100vh)] flex-col items-center justify-start overflow-hidden bg-white/10",
          "tablet:h-[calc(100vh-200px)]",
        )}
      >
        {/* bg */}
        <Image
          alt="movie img"
          src={filteredMovie[contentIdx].background_img}
          width={0}
          height={0}
          priority
          quality={100}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className={mergeClassNames("scale-125 opacity-100 transition-transform duration-[8000ms] ease-in-out", { "scale-105": zoom })}
        />
        {/* bg effect */}
        <div className="absolute h-full w-full bg-gradient-to-r from-screenColor"></div>
        <div className="absolute h-full w-full bg-gradient-to-l from-screenColor"></div>
      </div>

      {/* info area */}
      <div
        className={mergeClassNames(
          "absolute top-0 flex h-full w-full max-w-[1100px] flex-col-reverse items-center justify-center p-5",
          "tablet:flex-row tablet:justify-between tablet:p-10",
        )}
      >
        {/* summary */}
        <div
          className={mergeClassNames(
            "mt-8 flex h-fit w-full flex-col items-center justify-center font-NMSNeo2 text-sm leading-snug text-fontColor",
            "tablet:mt-0 tablet:w-[55%] tablet:items-end",
          )}
        >
          {/* title */}
          <h1
            className={mergeClassNames(
              "font-NMSNeo h-fit w-full translate-y-10 truncate  text-center text-2xl opacity-0",
              "tablet:text-right tablet:text-3xl",
              {
                "content_animation translate-y-0 opacity-100 duration-[2000ms] ease-in-out": zoom,
              },
            )}
          >
            {filteredMovie[contentIdx].title}
          </h1>
          {/* content */}
          <p
            className={mergeClassNames(
              "content_animation mt-5 flex h-fit w-fit translate-y-10 flex-col items-center justify-center text-center font-NMSNeo2 text-xs leading-loose opacity-0 transition-none",
              "target:mt-10 tablet:text-right tablet:text-sm tablet:leading-loose",
              {
                "translate-y-0 opacity-100 duration-[2500ms] ease-in-out": zoom,
              },
            )}
          >
            {!isMobile
              ? filteredMovie[contentIdx].summary
              : filteredMovie[contentIdx].summary.length > 200
                ? `${filteredMovie[contentIdx].summary.slice(0, 200)}...`
                : filteredMovie[contentIdx].summary}
          </p>
          {/* 예매하기 버튼 */}
          <button
            type="button"
            onClick={handleClickBook}
            className={mergeClassNames(
              "mt-10 flex h-fit w-1/2 translate-y-10 flex-col items-center justify-center rounded-lg bg-pointColor px-5 py-3 font-NMSNeo3 text-sm text-white opacity-0",
              "tablet:w-2/5 tablet:text-base",
              {
                "content_animation translate-y-0 opacity-100 duration-[2500ms] ease-in-out hover:bg-pointColor/60": zoom,
              },
            )}
          >
            예매하기
          </button>
        </div>
        {/* poster */}
        <div
          className={mergeClassNames(
            "ml-0 mt-16 flex aspect-[3/4.3] w-[50%] flex-col items-center justify-center drop-shadow-xl",
            "tablet:ml-5 tablet:mt-0 tablet:w-1/3",
          )}
        >
          <Image
            alt="movie img"
            src={filteredMovie[contentIdx].poster_img}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "100%" }}
            className={mergeClassNames("translate-y-10 opacity-0", {
              "translate-y-0 opacity-100 transition-all duration-[1500ms] ease-in-out": zoom,
            })}
          />
        </div>
      </div>
      {/* screen idx btns */}
      {!isMobile ? (
        <div className="absolute bottom-0 flex h-fit w-full flex-row items-center justify-center pb-5">
          {filteredMovie.map((movieInfo: MovieType, idx: number) => {
            return (
              <IndexButtonComp key={`${movieInfo.title}_${idx}`} idx={contentIdx} btnIdx={idx} setIdx={setContentIdx} setZoom={setZoom} />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default MoviesSliderComp;

interface Props {
  idx: number;
  btnIdx: number;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
  setZoom: React.Dispatch<React.SetStateAction<boolean>>;
}

const IndexButtonComp = ({ idx, btnIdx, setIdx, setZoom }: Props) => {
  const handleClickBtn = () => {
    setZoom(false);
    setIdx(btnIdx);
  };

  return (
    <div
      onClick={btnIdx === idx ? () => {} : handleClickBtn}
      className={mergeClassNames(
        "mx-2 aspect-square w-3 rounded-full border border-transparent bg-pointColor/60 drop-shadow-xl duration-500 ease-in-out",
        {
          "cursor-pointer border-white/60 bg-transparent hover:bg-white/20": btnIdx !== idx,
        },
      )}
    ></div>
  );
};
