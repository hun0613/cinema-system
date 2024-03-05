import { useState } from "react";
import DateComp from "./DateComp";
import Navigation from "./Navigation";
import SeatComp from "./SeatComp";
import TheaterComp from "./TheaterComp";

interface Props {
  movieId: number;
  movieNm: string | undefined;
}

const BodyArea = ({ movieId, movieNm }: Props) => {
  const [theater, setTeather] = useState<string>(""); // 극장 이름
  const [theaterId, setTheaterId] = useState<number>(0); // 극장 ID
  const [date, setDate] = useState<string>(
    `${new Date().getFullYear()}${new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1}${new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate()}`,
  ); // 날짜
  const [time, setTime] = useState<string>(""); // 시간
  const [room, setRoom] = useState<string>(""); // 상영관 이름
  const [roomId, setRoomId] = useState<number>(0); // 상영관 ID
  const [headCnt, setHeadCnt] = useState<number>(0); // 인원수
  const [seat, setSeat] = useState<string[]>(["A01", "A05"]); // 좌석
  const [seatState, setSeatState] = useState<string[]>([""]); // 선택한 상영관의 좌석 현황
  const [navState, setNavState] = useState<number>(1); // navigation 상태

  console.log({
    movieNm,
    theater,
    theaterId,
    date,
    time,
    room,
    roomId,
    headCnt,
    seat,
    seatState,
  });

  const resetState = (nav: number) => {
    if (nav === 1) {
      setDate(
        `${new Date().getFullYear()}${new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1}${new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate()}`,
      );
      setRoom("");
      setRoomId(0);
      setTime("");
      setHeadCnt(0);
      setSeat([]);
      setSeatState([""]);
    } else if (nav === 2) {
      setHeadCnt(0);
      setSeat([]);
    }
  };

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
        theaterId={theaterId}
        date={date}
        time={time}
        room={room}
        headCnt={headCnt}
        seat={seat}
      />
      {/* Reservation Area */}
      <div className="mb-5 flex h-fit w-[90%] flex-col items-center justify-center rounded-xl border border-borderColor tablet:h-[calc(100vh/1.8)]">
        {navState === 1 ? (
          <TheaterComp
            theaterId={theaterId}
            setTheaterId={setTheaterId}
            theater={theater}
            setTheater={setTeather}
            navState={navState}
            resetState={resetState}
          />
        ) : navState === 2 ? (
          <DateComp
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            room={room}
            setRoom={setRoom}
            roomId={roomId}
            setRoomId={setRoomId}
            theaterId={theaterId}
            movieId={movieId}
            seatState={seatState}
            setSeatState={setSeatState}
            navState={navState}
            resetState={resetState}
          />
        ) : navState === 3 ? (
          <SeatComp
            headCnt={headCnt}
            setHeadCnt={setHeadCnt}
            seat={seat}
            setSeat={setSeat}
            seatState={seatState}
            setSeatState={setSeatState}
          />
        ) : null}
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
              (navState === 1 && theaterId) ||
              (navState === 2 && theaterId && date && room && time)
                ? handleClickNextBtn
                : () => {}
            }
            className={
              (navState === 1 && theaterId) ||
              (navState === 2 && theaterId && date && room && time)
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
              theaterId && date && room && time && headCnt && seat
                ? handleClickBookBtn
                : () => {}
            }
            className={
              theaterId && date && room && time && headCnt && seat
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
