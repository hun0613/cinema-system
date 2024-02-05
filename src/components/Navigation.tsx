import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

interface NavProps {
  navValue: number;
  setNavValue: React.Dispatch<React.SetStateAction<number>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const Navigation = ({
  navValue,
  setNavValue,
  searchValue,
  setSearchValue,
}: NavProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // nav 클릭 시 함수
  const handleClickNav = (id: number) => {
    setNavValue(id);

    // 검색 영역을 클릭한 경우
    if (id === 4) {
      // input창 활성화
      searchInputRef.current?.focus();
    }
  };

  // 돋보기 클릭 시 함수
  const handleClickSearch = () => {
    // navValue가 검색 영역일 경우만 search click 이벤트 실행
    if (navValue === 4) {
      console.log("search!");
    }
  };

  // search 값 변경 시 함수
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex h-[60px] w-full flex-row items-center justify-start">
      <div
        onClick={() => handleClickNav(1)}
        className={
          navValue === 1
            ? `border-pointColor text-fontColor flex h-full w-1/5 cursor-default flex-col items-center justify-center border-b-2 font-NMSNeo3 text-base duration-150 ease-in-out`
            : `border-borderColor text-fontColor flex h-full w-1/5 cursor-pointer flex-col items-center justify-center border-b-2 font-NMSNeo3 text-base duration-150 ease-in-out hover:pb-2`
        }
      >
        현재 상영작
      </div>
      <div
        onClick={() => handleClickNav(2)}
        className={
          navValue === 2
            ? `border-pointColor text-fontColor flex h-full w-1/5 cursor-default flex-col items-center justify-center border-b-2 font-NMSNeo3 text-base`
            : `border-borderColor text-fontColor flex h-full w-1/5 cursor-pointer flex-col items-center justify-center border-b-2 font-NMSNeo3 text-base duration-150 ease-in-out hover:pb-2`
        }
      >
        상영 종료작
      </div>
      <div
        onClick={() => handleClickNav(3)}
        className={
          navValue === 3
            ? `border-pointColor text-fontColor flex h-full w-1/5 cursor-default flex-col items-center justify-center border-b-2 font-NMSNeo3 text-base`
            : `border-borderColor text-fontColor flex h-full w-1/5 cursor-pointer flex-col items-center justify-center border-b-2 font-NMSNeo3 text-base duration-150 ease-in-out hover:pb-2`
        }
      >
        개봉 예정작
      </div>
      <div
        onClick={() => handleClickNav(4)}
        className={
          navValue === 4
            ? `border-pointColor text-fontColor flex h-full w-2/5 flex-row items-center justify-center border-b-2 font-NMSNeo3 text-base`
            : `border-borderColor text-fontColor flex h-full w-2/5 cursor-pointer flex-row items-center justify-center border-b-2 font-NMSNeo3 text-base duration-150 ease-in-out hover:bg-black/30`
        }
      >
        <input
          ref={searchInputRef}
          type="text"
          value={searchValue}
          placeholder="영화 제목을 검색해보세요"
          onChange={handleChangeSearch}
          className=" text-fontColor mr-3 w-2/3 bg-transparent p-1 font-NMSNeo2 outline-none"
        />
        <BsSearch
          onClick={handleClickSearch}
          className=" text-fontColor cursor-pointer text-base"
        />
      </div>
    </div>
  );
};

export default Navigation;
