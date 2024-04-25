import { DateType, MovieTimeType } from "@/data/dataType";
import { useMovieStore, useReservationStore } from "@/store/store";
import { useEffect, useState } from "react";
import DateItem from "./DateItem";
import RoomItem from "./RoomItem";

const DateComp = () => {
  // 영화 서버데이터 (전역상태)
  const { db } = useMovieStore();

  // 영화 예매 데이터 (전역상태)
  const { date, theaterId } = useReservationStore();

  // 날짜 서버 데이터
  const [dateDb, setDateDb] = useState<DateType[] | null>(null);
  // 상영시간표 서버 데이터
  const [movieTimeDb, setMovieTimeDb] = useState<MovieTimeType[] | null>(null);
  // 상영관 리스트
  const [roomList, setRoomList] = useState<string[]>([""]);
  // 상영관 ID 리스트
  const [roomIdList, setRoomIdList] = useState<number[]>([0]);

  // 상영관 / 시간 데이터 추출 함수
  const extractRoomTimeData = (data: MovieTimeType[]) => {
    // 상영관 리스트
    let roomList = data.map((el: MovieTimeType) => el.room_nm);
    let roomSet = new Set(roomList);
    let distinctRoomArr = Array.from(roomSet);

    let roomIdList = data.map((el: MovieTimeType) => el.room_id);
    let roomIdSet = new Set(roomIdList);
    let distinctRoomIdArr = Array.from(roomIdSet);

    setRoomList(distinctRoomArr);
    setRoomIdList(distinctRoomIdArr);
  };

  useEffect(() => {
    // 날짜 데이터 fetch
    if (!dateDb) {
      fetch(`/book/api/date`)
        .then((res) => res.json())
        .then((res2) => {
          setDateDb(res2);
        });
    }

    // 상영시간표 데이터 fetch
    fetch(
      `/book/api/movieTime?theater_id=${theaterId}&movie_id=${db?.id}&date=${date}`,
    )
      .then((res) => res.json())
      .then((res2) => {
        setMovieTimeDb(res2);
        extractRoomTimeData(res2);
      });
  }, [date]);

  return (
    <div className="flex h-fit w-full flex-col items-center justify-center rounded-xl p-3 tablet:h-full tablet:flex-row tablet:p-5">
      {/* 날짜 그룹 */}
      <div className="mb-3 mr-0 flex h-fit w-full flex-col items-center justify-start tablet:mb-0 tablet:mr-5 tablet:h-full tablet:w-[30%] tablet:py-0">
        {/* title */}
        <div className="mb-3 flex h-fit w-full flex-col items-center justify-center rounded-lg bg-titleColor p-3 font-NMSNeo3 text-sm text-fontColor">
          날짜
        </div>
        {/* date content */}
        {/* 데이터 fetching... */}
        {!dateDb ? (
          <div className="flex h-full w-full flex-col items-center justify-center font-NMSNeo2 text-xs text-fontColor tablet:text-sm">
            데이터 가져오는중...🤔
          </div>
        ) : null}
        {/* 데이터가 존재하지 않을 경우 */}
        {dateDb?.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center font-NMSNeo2 text-xs text-fontColor tablet:text-sm">
            날짜정보가 존재하지않아요...😱
          </div>
        ) : null}
        {/* 데이터가 존재할 경우 */}
        {dateDb ? (
          <div
            id="dateArea"
            className="flex h-full w-full flex-row items-center justify-start overflow-x-auto overflow-y-auto tablet:flex-col tablet:overflow-y-auto "
          >
            {dateDb?.map((dateEl: DateType, idx: number) => {
              return (
                <DateItem
                  key={`${dateEl.date}+idx`}
                  date={dateEl.date}
                  week={dateEl.week}
                  holiday_yn={dateEl.holiday_yn}
                  idx={idx}
                />
              );
            })}
          </div>
        ) : null}
      </div>

      {/* 상영관/시간 그룹 */}
      <div className="flex h-full w-full flex-col items-center justify-start tablet:h-full tablet:w-[70%]">
        {/* title */}
        <div className="mb-3 flex h-fit w-full flex-col items-center justify-center rounded-lg bg-titleColor p-3 font-NMSNeo3 text-sm text-fontColor">
          상영관 / 시간
        </div>
        {/* 데이터 fetching... */}
        {!movieTimeDb ? (
          <div className="flex h-fit w-full flex-col items-center justify-center p-5 font-NMSNeo2 text-xs text-fontColor tablet:text-sm">
            데이터 가져오는중...🤔
          </div>
        ) : null}
        {/* 데이터가 존재하지 않을 경우 */}
        {movieTimeDb?.length === 0 ? (
          <div className="flex h-fit w-full flex-col items-center justify-center p-5 font-NMSNeo2 text-xs text-fontColor tablet:text-sm">
            상영정보가 존재하지않아요...😱
          </div>
        ) : null}
        {movieTimeDb ? (
          <div className="flex h-full w-full flex-col items-center justify-start overflow-y-auto rounded-xl">
            {roomList.map((roomEl: string, idx: number) => {
              return (
                <RoomItem
                  key={`room_${roomEl}`}
                  currRoom={roomEl}
                  currRoomId={roomIdList[idx]}
                  timeList={movieTimeDb?.map(
                    (movieTime: MovieTimeType) => movieTime.time,
                  )}
                  movieTimeDb={movieTimeDb}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DateComp;
