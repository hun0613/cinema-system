import { MOVIE_FILTER_TAB } from "@/enums/movies/movieEnum";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

interface NavProps {
  filterTab: MOVIE_FILTER_TAB;
  setFilterTab: React.Dispatch<React.SetStateAction<number>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const Navigation = ({ filterTab, setFilterTab, searchValue, setSearchValue }: NavProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // nav 클릭 시 함수
  const handleClickNav = (tab: number) => {
    setFilterTab(tab);

    // 검색 영역을 클릭한 경우
    if (tab === MOVIE_FILTER_TAB.SEARCH) {
      // input창 활성화
      searchInputRef.current?.focus();
    }
  };

  // search 값 변경 시 함수
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex h-[60px] w-full flex-row items-center justify-start">
      <div
        onClick={() => handleClickNav(MOVIE_FILTER_TAB.IN_PROGRESS)}
        className={
          filterTab === MOVIE_FILTER_TAB.IN_PROGRESS
            ? `flex h-full w-1/5 cursor-default flex-col items-center justify-center border-b-2 border-pointColor font-NMSNeo3 text-base text-fontColor duration-150 ease-in-out`
            : `flex h-full w-1/5 cursor-pointer flex-col items-center justify-center border-b-2 border-borderColor font-NMSNeo3 text-base text-fontColor duration-150 ease-in-out hover:pb-2`
        }
      >
        현재 상영작
      </div>
      <div
        onClick={() => handleClickNav(MOVIE_FILTER_TAB.END)}
        className={
          filterTab === MOVIE_FILTER_TAB.END
            ? `flex h-full w-1/5 cursor-default flex-col items-center justify-center border-b-2 border-pointColor font-NMSNeo3 text-base text-fontColor`
            : `flex h-full w-1/5 cursor-pointer flex-col items-center justify-center border-b-2 border-borderColor font-NMSNeo3 text-base text-fontColor duration-150 ease-in-out hover:pb-2`
        }
      >
        상영 종료작
      </div>
      <div
        onClick={() => handleClickNav(MOVIE_FILTER_TAB.EXPECT)}
        className={
          filterTab === MOVIE_FILTER_TAB.EXPECT
            ? `flex h-full w-1/5 cursor-default flex-col items-center justify-center border-b-2 border-pointColor font-NMSNeo3 text-base text-fontColor`
            : `flex h-full w-1/5 cursor-pointer flex-col items-center justify-center border-b-2 border-borderColor font-NMSNeo3 text-base text-fontColor duration-150 ease-in-out hover:pb-2`
        }
      >
        개봉 예정작
      </div>
      <div
        onClick={() => handleClickNav(MOVIE_FILTER_TAB.SEARCH)}
        className={
          filterTab === MOVIE_FILTER_TAB.SEARCH
            ? `flex h-full w-2/5 flex-row items-center justify-center border-b-2 border-pointColor font-NMSNeo3 text-base text-fontColor`
            : `flex h-full w-2/5 cursor-pointer flex-row items-center justify-center border-b-2 border-borderColor font-NMSNeo3 text-base text-fontColor duration-150 ease-in-out hover:bg-black/30`
        }
      >
        <BsSearch className="mr-3 text-base text-fontColor" />
        <input
          ref={searchInputRef}
          type="text"
          value={searchValue}
          placeholder="영화 제목을 검색해보세요"
          onChange={handleChangeSearch}
          className=" w-2/3 bg-transparent p-1 font-NMSNeo2 text-fontColor outline-none"
        />
      </div>
    </div>
  );
};

export default Navigation;
