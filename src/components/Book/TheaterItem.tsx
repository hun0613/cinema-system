import { useEffect, useRef } from "react";

interface Props {
  id: number; // 영화관 ID
  name: string; // 영화관 이름
  position: string; // 영화관 위치
  latitude: number; // 위도
  setLatitude: React.Dispatch<React.SetStateAction<number>>; // 위도상태변경함수
  longitude: number; // 경도
  setLongitude: React.Dispatch<React.SetStateAction<number>>; // 경도상태변경함수
  theaterId: number; // 선택된 영화관 ID
  setTheaterId: React.Dispatch<React.SetStateAction<number>>; // 선택된 영화관 ID 변경함수;
  theater: string; // 선택된 영화관 이름
  setTheater: React.Dispatch<React.SetStateAction<string>>; // 선택된 영화관 상태변경함수
  navState: number; // nav 상태
  resetState: (nav: number) => void; // 상태 초기화 함수
}

const TheaterItem = ({
  id,
  name,
  position,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  theaterId,
  setTheaterId,
  theater,
  setTheater,
  navState,
  resetState,
}: Props) => {
  // scroll focus 설정용 Ref
  const theaterRef = useRef<HTMLDivElement>(null);

  const handleClickItem = () => {
    // 선택 영화관 변경
    setTheaterId(id);
    setTheater(name);

    // 다음 스텝 상태 초기화
    resetState(navState);

    // 위도변경
    setLatitude(Number(latitude));

    // 경도변경
    setLongitude(Number(longitude));
  };

  useEffect(() => {
    // 첫 랜더링 시 선택한 극장을 스크롤 중심으로 이동
    if (theaterId === id) {
      theaterRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  return (
    <div
      ref={theaterRef}
      onClick={theaterId === id ? () => {} : handleClickItem}
      className={
        theaterId === id
          ? `mb-0 mr-3 flex h-fit w-fit cursor-pointer flex-col items-start justify-center whitespace-nowrap rounded-xl bg-pointColor/70 p-5 tablet:mb-5 tablet:mr-0 tablet:w-full tablet:whitespace-normal`
          : `mb-0 mr-3 flex h-fit w-fit cursor-pointer flex-col items-start justify-center whitespace-nowrap rounded-xl border border-borderColor p-5 hover:bg-borderColor/30 tablet:mb-5 tablet:mr-0 tablet:w-full tablet:whitespace-normal`
      }
    >
      <div className="h-fit w-fit font-NMSNeo3 text-xs text-fontColor mobile:text-sm">
        {name}
      </div>
      <div className="mt-3  h-fit w-fit font-NMSNeo1 text-[10px] text-fontColor mobile:text-xs">
        {position}
      </div>
    </div>
  );
};

export default TheaterItem;
