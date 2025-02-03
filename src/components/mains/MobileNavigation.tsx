import { MOVIE_FILTER_TAB } from "@/enums/movies/movieEnum";
import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";

interface NavProps {
  filterTab: MOVIE_FILTER_TAB;
  setFilterTab: React.Dispatch<React.SetStateAction<number>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

type NavProperty = {
  tab: MOVIE_FILTER_TAB;
  name: string;
};

const navList: NavProperty[] = [
  {
    tab: MOVIE_FILTER_TAB.IN_PROGRESS,
    name: "현재 상영작",
  },
  {
    tab: MOVIE_FILTER_TAB.END,
    name: "상영 종료작",
  },
  {
    tab: MOVIE_FILTER_TAB.EXPECT,
    name: "개봉 예정작",
  },
];

const MobileNavigation = ({ filterTab, setFilterTab, searchValue, setSearchValue }: NavProps) => {
  const [navModalState, setNavModalState] = useState<boolean>(false);
  const [navMenuTitle, setNavMenuTitle] = useState<string>(
    navList.filter((el) => el.tab === (filterTab === MOVIE_FILTER_TAB.SEARCH ? MOVIE_FILTER_TAB.IN_PROGRESS : filterTab))[0]?.name,
  );

  const searchInputRef = useRef<HTMLInputElement>(null);

  // nav 클릭 시 함수
  const handleClickNav = (e: React.MouseEvent, tab: MOVIE_FILTER_TAB) => {
    e.stopPropagation();
    setFilterTab(tab);

    // 검색 영역을 클릭한 경우
    if (tab === MOVIE_FILTER_TAB.SEARCH) {
      // input창 활성화
      searchInputRef.current?.focus();
      setNavModalState(false);
    } else if (filterTab !== MOVIE_FILTER_TAB.SEARCH) {
      setNavModalState(!navModalState);
    }
  };

  // 모달 내 nav 요소를 클릭한 경우
  const handleClickNavElement = (e: React.MouseEvent, tab: MOVIE_FILTER_TAB, name: string) => {
    e.stopPropagation();
    setFilterTab(tab);
    setNavMenuTitle(name);
    setNavModalState(false);
  };

  // search 값 변경 시 함수
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // 돋보기 클릭 시 함수
  const handleClickSearch = () => {
    // navValue가 검색 영역일 경우만 search click 이벤트 실행
    if (filterTab === MOVIE_FILTER_TAB.SEARCH) {
    }
  };

  return (
    <div className="flex h-[60px] w-full flex-row items-center justify-start">
      <div
        onClick={(e) => handleClickNav(e, navList.filter((el) => el.name === navMenuTitle)[0].tab)}
        className={
          filterTab !== MOVIE_FILTER_TAB.SEARCH
            ? `relative z-10 flex h-full w-1/2 cursor-default flex-row items-center justify-center border-b-2 border-pointColor font-NMSNeo3 text-sm text-fontColor duration-150 ease-in-out hover:bg-black/30`
            : `relative z-10 flex h-full w-1/2 cursor-pointer flex-row items-center justify-center border-b-2 border-borderColor font-NMSNeo3 text-sm text-fontColor duration-150 ease-in-out hover:pb-2`
        }
      >
        {/* nav modal */}
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={
            navModalState
              ? `absolute top-[60px] flex h-[180px] w-full flex-col items-baseline justify-start overflow-hidden duration-300 ease-in-out `
              : `absolute top-[60px] flex h-0 w-full flex-col items-baseline justify-start overflow-hidden duration-300 ease-in-out`
          }
        >
          <div
            className={
              navModalState
                ? `relative -top-[0px] flex h-fit w-full flex-col items-center justify-start border-0 border-borderColor duration-300 ease-in-out`
                : `relative -top-[180px] flex h-fit w-full flex-col items-center justify-start border-0 border-borderColor duration-300 ease-in-out`
            }
          >
            {navList
              .filter((ele) => ele.tab !== filterTab)
              .map((el, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={(e) => handleClickNavElement(e, el.tab, el.name)}
                    className="mt-2 flex h-fit w-full flex-col items-center justify-center rounded-lg border-2 border-borderColor bg-black/70 p-3 drop-shadow-sm duration-150 ease-in-out hover:bg-pointColor/80"
                  >
                    {el.name}
                  </div>
                );
              })}
          </div>
        </div>
        {navMenuTitle}

        {/* 모달 상태에 따른 화살표 */}
        {navModalState ? <TbTriangleFilled className="ml-3" /> : <TbTriangleInvertedFilled className="ml-3" />}
      </div>
      <div
        onClick={(e) => handleClickNav(e, MOVIE_FILTER_TAB.SEARCH)}
        className={
          filterTab === MOVIE_FILTER_TAB.SEARCH
            ? `flex h-full w-1/2 flex-row items-center justify-center border-b-2 border-pointColor font-NMSNeo3 text-sm text-fontColor`
            : `flex h-full w-1/2 cursor-pointer flex-row items-center justify-center border-b-2 border-borderColor font-NMSNeo3 text-sm text-fontColor duration-150 ease-in-out hover:bg-black/30`
        }
      >
        <BsSearch onClick={handleClickSearch} className="mr-3 text-base text-fontColor" />
        <input
          ref={searchInputRef}
          type="text"
          value={searchValue}
          placeholder="제목을 입력하세요"
          onChange={handleChangeSearch}
          className="w-2/3 bg-transparent p-1 font-NMSNeo2 text-fontColor outline-none"
        />
      </div>
    </div>
  );
};

export default MobileNavigation;
