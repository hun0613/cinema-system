"use client";

import GridSkeletonAtom from "@/atomic/loader/GridSkeletonAtom";
import useCheckMobile from "@/hooks/useCheckMobile";
import { MOVIE_FILTER_TAB } from "@/types/movies/movieType";
import { Suspense, useState } from "react";
import MobileNavigation from "./MobileNavigation";
import MovieListComp from "./MovieListComp";
import Navigation from "./Navigation";

export type MoviesCompProps = {} & JSX.IntrinsicElements["div"];

export enum MovieFilterTab {}

const MoviesComp: React.FC<MoviesCompProps> = (props) => {
  const [filterTab, setFilterTab] = useState<MOVIE_FILTER_TAB>(MOVIE_FILTER_TAB.IN_PROGRESS);
  const [searchValue, setSearchValue] = useState<string>("");

  const { isMobile } = useCheckMobile();

  return (
    <div className="flex flex-col items-center justify-start">
      {!isMobile ? (
        <Navigation
          filterTab={filterTab}
          setFilterTab={setFilterTab}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      ) : (
        <MobileNavigation
          filterTab={filterTab}
          setFilterTab={setFilterTab}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      )}

      <Suspense fallback={<GridSkeletonAtom />}>
        <MovieListComp filterTab={filterTab} searchValue={searchValue} />
      </Suspense>
    </div>
  );
};

export default MoviesComp;
