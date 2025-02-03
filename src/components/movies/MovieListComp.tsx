"use client";
import { MovieType } from "@/actions/movies/useFetchMovieAction";
import { getFetchMoviesQuery } from "@/actions/movies/useFetchMoviesAction";
import { MOVIE_FILTER_TAB } from "@/enums/movies/movieEnum";
import { useSuspenseQueries } from "@tanstack/react-query";
import { useState } from "react";
import MovieItemComp from "./MovieItemComp";

export const MOVIE_COUNT_PER_PAGE = 8;

export type MovieListCompProps = {
  filterTab: MOVIE_FILTER_TAB;
  searchValue: string;
} & JSX.IntrinsicElements["div"];

const MovieListComp: React.FC<MovieListCompProps> = (props) => {
  const { filterTab, searchValue } = props;
  const [page, setPage] = useState<number>(1); // 현재 page

  const [{ data: movies }] = useSuspenseQueries({
    queries: [getFetchMoviesQuery()],
  });

  const filteredMovie: MovieType[] = movies.filter((el) => {
    // navigation이 검색에 가 있을 때
    if (filterTab === MOVIE_FILTER_TAB.SEARCH) {
      // 검색 키워드가 포함된 컨텐츠 필터링
      if (el.title.includes(searchValue)) {
        return el;
      }
    } else {
      // 분류가 선택한 navigation에 해당하는 컨텐츠 필터링
      if (el.classification === filterTab) {
        return el;
      }
    }
  });

  const showAddButton = filteredMovie.length > MOVIE_COUNT_PER_PAGE && page < Math.ceil(filteredMovie.length / MOVIE_COUNT_PER_PAGE);

  const handleClickAddBtn = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div className="grid h-fit min-h-[300px] w-full grid-cols-2 gap-5  px-5 py-10 font-NMSNeo2 text-fontColor tablet:grid-cols-4 tablet:gap-10 desktop:px-0">
        {filteredMovie.slice(0, page * 8).map((movieInfo: MovieType, idx: number) => {
          return <MovieItemComp key={`${movieInfo.title}_${idx}`} data={movieInfo} />;
        })}
      </div>
      {/* 더보기 btn area */}
      <div className="flex h-fit w-full flex-col items-center justify-center border-b border-borderColor/40">
        {/* 더보기 btn */}
        {showAddButton && (
          <button
            onClick={handleClickAddBtn}
            type="button"
            className="mb-10 flex h-fit w-1/4 flex-col items-center justify-center rounded-xl border border-borderColor p-3 font-NMSNeo3 text-sm text-fontColor hover:border-transparent hover:bg-pointColor/70 tablet:w-1/6 tablet:min-w-[150px]"
          >
            더보기
          </button>
        )}
      </div>
    </>
  );
};

export default MovieListComp;
