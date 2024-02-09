import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";

interface NavProps {
  navValue: number;
  setNavValue: React.Dispatch<React.SetStateAction<number>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

type NavProperty = {
  id: number;
  name: string;
};

const navList: NavProperty[] = [
  {
    id: 1,
    name: "현재 상영작",
  },
  {
    id: 2,
    name: "상영 종료작",
  },
  {
    id: 3,
    name: "개봉 예정작",
  },
];

const MobileNavigation = ({
  navValue,
  setNavValue,
  searchValue,
  setSearchValue,
}: NavProps) => {
  const [navModalState, setNavModalState] = useState<boolean>(false);
  const [navMenuTitle, setNavMenuTitle] = useState<string>(
    navList.filter((el) => el.id === (navValue === 4 ? 1 : navValue))[0]?.name,
  );

  const searchInputRef = useRef<HTMLInputElement>(null);

  // nav 클릭 시 함수
  const handleClickNav = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setNavValue(id);

    // 검색 영역을 클릭한 경우
    if (id === 4) {
      // input창 활성화
      searchInputRef.current?.focus();
      setNavModalState(false);
    } else if (navValue !== 4) {
      setNavModalState(!navModalState);
    }
  };

  // 모달 내 nav 요소를 클릭한 경우
  const handleClickNavElement = (
    e: React.MouseEvent,
    id: number,
    name: string,
  ) => {
    e.stopPropagation();
    setNavValue(id);
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
    if (navValue === 4) {
      console.log("search!");
    }
  };

  return (
    <div className="flex h-[60px] w-full flex-row items-center justify-start">
      <div
        onClick={(e) =>
          handleClickNav(
            e,
            navList.filter((el) => el.name === navMenuTitle)[0].id,
          )
        }
        className={
          navValue < 4
            ? `relative z-10 flex h-full w-1/2 cursor-default flex-row items-center justify-center border-b-2 border-pointColor font-NMSNeo3 text-sm text-fontColor duration-150 ease-in-out hover:bg-black/30`
            : `relative z-10 flex h-full w-1/2 cursor-pointer flex-row items-center justify-center border-b-2 border-borderColor font-NMSNeo3 text-sm text-fontColor duration-150 ease-in-out hover:pb-2`
        }
      >
        {/* nav modal */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            console.log("check");
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
              .filter((ele) => ele.id !== navValue)
              .map((el, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={(e) => handleClickNavElement(e, el.id, el.name)}
                    className="mt-2 flex h-fit w-full flex-col items-center justify-center rounded-lg border border-borderColor bg-black/20 p-3 drop-shadow-sm duration-150 ease-in-out hover:bg-pointColor/80"
                  >
                    {el.name}
                  </div>
                );
              })}
          </div>
        </div>
        {navMenuTitle}

        {/* 모달 상태에 따른 화살표 */}
        {navModalState ? (
          <TbTriangleFilled className="ml-3" />
        ) : (
          <TbTriangleInvertedFilled className="ml-3" />
        )}
      </div>
      <div
        onClick={(e) => handleClickNav(e, 4)}
        className={
          navValue === 4
            ? `flex h-full w-1/2 flex-row items-center justify-center border-b-2 border-pointColor font-NMSNeo3 text-sm text-fontColor`
            : `flex h-full w-1/2 cursor-pointer flex-row items-center justify-center border-b-2 border-borderColor font-NMSNeo3 text-sm text-fontColor duration-150 ease-in-out hover:bg-black/30`
        }
      >
        <input
          ref={searchInputRef}
          type="text"
          value={searchValue}
          placeholder="제목을 입력하세요"
          onChange={handleChangeSearch}
          className=" mr-3 w-2/3 bg-transparent p-1 font-NMSNeo2 text-fontColor outline-none"
        />
        <BsSearch
          onClick={handleClickSearch}
          className=" cursor-pointer text-base text-fontColor"
        />
      </div>
    </div>
  );
};

export default MobileNavigation;
