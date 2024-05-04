"use client";
import { movieType } from "@/data/dataType";
import useWindowSize from "@/hooks/useWindowSize";
import { useState } from "react";
import Modal from "../Reuse/Modal";
import Card from "./Card";
import DetailModal from "./DetailModal";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";

interface Data {
  data: movieType[];
}

const ContentArea = ({ data }: Data) => {
  const [navState, setNavState] = useState<number>(1); // navigation 상태
  const [searchValue, setSearchValue] = useState<string>(""); // 검색 키워드
  const [page, setPage] = useState<number>(1); // 현재 page
  const [hoverCardId, setHoverCardId] = useState<number>(0); // hover 시 활성화 되는 컨텐츠 id
  const [modalControlState, setModalControlState] = useState<boolean>(false); // 상세보기 모달 컨트롤 상태
  const [modalContentId, setModalContentId] = useState<number>(0); // 상세보기 모달에 보여지는 컨텐츠 id

  // window width size
  let width: number = useWindowSize();

  let filteredMovie: movieType[] = data.filter((el) => {
    // navigation이 검색에 가 있을 때
    if (navState === 4) {
      // 검색 키워드가 포함된 컨텐츠 필터링
      if (el.title.includes(searchValue)) {
        return el;
      }
    } else {
      // 분류가 선택한 navigation에 해당하는 컨텐츠 필터링
      if (el.classification === navState) {
        return el;
      }
    }
  });

  const handleClickAddBtn = () => {
    setPage(page + 1);
  };

  return (
    <>
      {/* test 모달 */}
      <Modal setModalControlState={setModalControlState}>
        <div className="h-[calc(100vh/1.5)] w-full bg-slate-500 tablet:h-[calc(100vh/2)]">
          hello
        </div>
      </Modal>
      {/* 상세보기 모달 */}
      {modalControlState ? (
        <Modal setModalControlState={setModalControlState}>
          <DetailModal
            setModalControlState={setModalControlState}
            data={data.filter((movie) => movie.id === modalContentId)[0]}
          />
        </Modal>
      ) : null}

      <div className="flex h-full w-full flex-col items-center justify-start">
        {width === 0 || width > 764 ? (
          // Web View Nav
          <Navigation
            navValue={navState}
            setNavValue={setNavState}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setPage={setPage}
          />
        ) : (
          // Mobile View Nav
          <MobileNavigation
            navValue={navState}
            setNavValue={setNavState}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setPage={setPage}
          />
        )}
        {/* content */}
        <div className="grid h-fit min-h-[300px] w-full grid-cols-2 gap-5  px-5 py-10 font-NMSNeo2 text-fontColor tablet:grid-cols-4 tablet:gap-10 desktop:px-0">
          {filteredMovie
            .slice(0, page * 8)
            .map((movieInfo: movieType, idx: number) => {
              return (
                <Card
                  key={`${movieInfo.title}_${idx}`}
                  data={movieInfo}
                  hoverCardId={hoverCardId}
                  setHoverCardId={setHoverCardId}
                  setModalControlState={setModalControlState}
                  setModalContentId={setModalContentId}
                />
              );
            })}
        </div>
        {/* 더보기 btn area */}
        <div className="flex h-fit w-full flex-col items-center justify-center border-b border-borderColor/40">
          {/* 더보기 btn */}
          {filteredMovie.length > 8 &&
            page < Math.ceil(filteredMovie.length / 8) && (
              <button
                onClick={handleClickAddBtn}
                type="button"
                className="mb-10 flex h-fit w-1/4 flex-col items-center justify-center rounded-xl border border-borderColor p-3 font-NMSNeo3 text-sm text-fontColor hover:border-transparent hover:bg-pointColor/70 tablet:w-1/6 tablet:min-w-[150px]"
              >
                더보기
              </button>
            )}
        </div>
      </div>
    </>
  );
};

export default ContentArea;
