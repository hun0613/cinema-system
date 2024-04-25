import { useReservationNavStore, useReservationStore } from "@/store/store";
import { useEffect, useRef } from "react";

interface Props {
  date: string; // 날짜
  week: string; // 요일
  holiday_yn: string; // 공휴일 유무
  idx: number; // 순번
}

const DateItem = ({ date, week, holiday_yn, idx }: Props) => {
  // scroll foucs 설정용 Ref
  const dateRef = useRef<HTMLDivElement>(null);

  // navigatioin 상태 (전역상태)
  const { navState } = useReservationNavStore();
  // 영화 예매 데이터 (전역상태)
  const {
    date: currDate,
    setDate: setCurrDate,
    setRoom,
    setRoomId,
    setTime,
    setSeatState,
    resetState,
  } = useReservationStore();

  const handleClickDate = () => {
    // 선택 날짜 변경
    setCurrDate(date);
    // 상영관, 상영시간, 좌석현황 초기화
    setRoom("");
    setRoomId(0);
    setTime("");
    setSeatState([""]);
    resetState(navState);
  };

  useEffect(() => {
    // 첫 랜더링 시 선택한 날짜를 스크롤 중심으로 이동
    if (date === currDate) {
      dateRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  return (
    <div className="flex h-fit w-full flex-row items-center justify-center tablet:flex-col">
      {/* 년도, 월 */}
      {date.slice(6, 8) === "01" || idx === 0 ? (
        <div className="flex h-fit w-full flex-col items-center justify-center p-5">
          {/* 년도 */}
          <div className="mb-1 h-fit w-full text-center font-NMSNeo4 text-[10px] text-fontColor mobile:text-xs">
            {date.slice(0, 4)}
          </div>
          {/* 월 */}
          <div className="h-fit w-full text-center font-NMSNeo5 text-base text-fontColor mobile:text-lg">
            {date.slice(4, 6)}
          </div>
        </div>
      ) : null}

      {/* 요일, 일 */}
      <div
        ref={dateRef}
        onClick={handleClickDate}
        className={
          currDate === date
            ? `flex h-fit w-full cursor-pointer flex-row items-center justify-center rounded-lg bg-pointColor/70 p-5 text-fontColor mobile:p-3`
            : holiday_yn === "Y"
              ? `flex h-fit w-full cursor-pointer flex-row items-center justify-center rounded-lg p-5 text-pointColor/70 hover:bg-black/60 mobile:p-3`
              : week === "토"
                ? `flex h-fit w-full cursor-pointer flex-row items-center justify-center rounded-lg p-5 text-[#415ab4] hover:bg-black/60 mobile:p-3`
                : `flex h-fit w-full cursor-pointer flex-row items-center justify-center rounded-lg p-5 text-fontColor hover:bg-black/60 mobile:p-3`
        }
      >
        {/* 요일 */}
        <div className="h-fit w-fit text-center font-NMSNeo3 text-xs mobile:text-sm">
          {week}
        </div>
        {/* 일 */}
        <div className="ml-2 h-fit w-fit text-center font-NMSNeo4 text-xs mobile:text-sm">
          {date.slice(6, 8)}
        </div>
      </div>
    </div>
  );
};

export default DateItem;
