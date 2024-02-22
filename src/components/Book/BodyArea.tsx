import { useState } from "react";
import Navigation from "./Navigation";

const BodyArea = () => {
  const [theater, setTeather] = useState<number>(1); // 극장
  const [date, setDate] = useState<string>(""); // 날짜
  const [time, setTime] = useState<string>(""); // 시간
  const [room, setRoom] = useState<string>(""); // 상영관
  const [headCnt, setHeadCnt] = useState<number>(0); // 인원수
  const [seat, setSeat] = useState<string>(""); // 좌석
  const [navState, setNavState] = useState<number>(1); // navigation 상태

  const handleClickNextBtn = () => {
    setNavState(navState + 1);
  };
  const handleClickPrevBtn = () => {
    setNavState(navState - 1);
  };
  const handleClickBookBtn = () => {
    console.log("예매완료!");
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      {/* navigation */}
      <Navigation
        navState={navState}
        setNavState={setNavState}
        theater={theater}
        date={date}
        time={time}
        room={room}
        headCnt={headCnt}
        seat={seat}
      />
      {/* Reservation Area */}
      <div className="mb-5 flex h-fit min-h-[calc(100vh/2)] w-4/5 flex-col items-center justify-center rounded-xl border border-borderColor">
        Reservation Component
      </div>

      {/* btn */}
      <div className="mb-24 mt-5 flex h-fit w-full flex-col items-center justify-center mobile:flex-row">
        {navState !== 1 ? (
          <button
            type="button"
            onClick={handleClickPrevBtn}
            className={`mx-0 mb-3 flex h-fit w-2/5 flex-col items-center justify-center rounded-xl bg-white/80 p-3 font-NMSNeo3 text-sm text-borderColor hover:bg-white/60 mobile:mx-3 mobile:mb-0 mobile:w-1/4 mobile:text-base tablet:w-1/5`}
          >
            이전
          </button>
        ) : null}

        {/* nav가 1일 경우 극장정보가 비어있으면 비활성화 / nav가 2일 경우 극장정보, 날짜, 상영관, 시간이 비어있으면 비활성화 */}
        {navState !== 3 ? (
          <button
            type="button"
            onClick={
              (navState === 1 && theater) ||
              (navState === 2 && theater && date && room && time)
                ? handleClickNextBtn
                : () => {}
            }
            className={
              (navState === 1 && theater) ||
              (navState === 2 && theater && date && room && time)
                ? `mx-0 mb-3 flex h-fit w-2/5 flex-col items-center justify-center rounded-xl bg-pointColor/80 p-3 font-NMSNeo3 text-sm text-fontColor hover:bg-pointColor/60 mobile:mx-3 mobile:mb-0 mobile:w-1/4 mobile:text-base tablet:w-1/5`
                : `mx-0 mb-3 flex h-fit w-2/5 cursor-default flex-col items-center justify-center rounded-xl bg-borderColor/80 p-3 font-NMSNeo3 text-sm text-fontColor/50 mobile:mx-3 mobile:mb-0 mobile:w-1/4 mobile:text-base tablet:w-1/5`
            }
          >
            다음
          </button>
        ) : null}

        {/* nav가 3일 경우, 모든 정보가 입력되어있지 않으면 비활성화 */}
        {navState === 3 ? (
          <button
            type="button"
            onClick={
              theater && date && room && time && headCnt && seat
                ? handleClickBookBtn
                : () => {}
            }
            className={
              theater && date && room && time && headCnt && seat
                ? `mx-0 mb-3 flex h-fit w-2/5 flex-col items-center justify-center rounded-xl bg-pointColor/80 p-3 font-NMSNeo3 text-sm text-fontColor hover:bg-pointColor/60 mobile:mx-3 mobile:mb-0 mobile:w-1/4 mobile:text-base tablet:w-1/5`
                : `mx-0 mb-3 flex h-fit w-2/5 cursor-default flex-col items-center justify-center rounded-xl bg-borderColor/80 p-3 font-NMSNeo3 text-sm text-fontColor/50 mobile:mx-3 mobile:mb-0 mobile:w-1/4 mobile:text-base tablet:w-1/5`
            }
          >
            예매하기
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default BodyArea;
