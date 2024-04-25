import { MovieTimeType } from "@/data/dataType";
import { useReservationNavStore, useReservationStore } from "@/store/store";

interface Props {
  currRoom: string; // 현재 상영관
  currRoomId: number; // 현재 상영관 ID
  timeList: string[] | undefined; // 현재 상영시간 리스트
  movieTimeDb: MovieTimeType[] | null; // 상영시간표 데이터
}

const RoomItem = ({ currRoom, currRoomId, timeList, movieTimeDb }: Props) => {
  // navigatioin 상태 (전역상태)
  const { navState } = useReservationNavStore();
  // 영화 예매 데이터 (전역상태)
  const {
    date: currDate,
    room,
    setRoom,
    roomId,
    setRoomId,
    time,
    setTime,
    seatState,
    setSeatState,
    resetState,
  } = useReservationStore();

  const handleClickTime = (timeEl: string) => {
    // 상영관이름 설정
    setRoom(currRoom);
    // 상영관ID 설정
    setRoomId(currRoomId);
    // 상영시간 설정
    setTime(timeEl);

    // 좌석현황 설정
    if (
      movieTimeDb?.filter(
        (movieTime: MovieTimeType) =>
          movieTime.room_id === currRoomId && movieTime.time === timeEl,
      )[0]
    ) {
      setSeatState(
        movieTimeDb?.filter(
          (movieTime: MovieTimeType) =>
            movieTime.room_id === currRoomId && movieTime.time === timeEl,
        )[0].seat_state,
      );
    }

    resetState(navState);
  };

  return (
    <div className="flex h-fit w-full flex-col items-start justify-start rounded-xl p-5">
      {/* 상영관 이름 */}
      <div className="h-fit w-fit font-NMSNeo2 text-sm text-fontColor">
        {currRoom}관
      </div>
      {/* 상영시간표 */}
      <div className="mt-5 flex h-fit w-full flex-row items-center justify-start">
        {/* time item */}
        {timeList?.map((timeEl: string) => {
          return (
            <div
              key={timeEl}
              onClick={() => handleClickTime(timeEl)}
              className={
                currRoom === room && timeEl === time
                  ? `mr-3 flex h-fit w-fit flex-col items-center justify-center rounded-lg bg-pointColor/70 px-5 py-2 font-NMSNeo3 text-xs text-fontColor mobile:text-sm`
                  : `mr-3 flex h-fit w-fit cursor-pointer flex-col items-center justify-center rounded-lg bg-titleColor px-5 py-2 font-NMSNeo3 text-xs text-fontColor hover:bg-titleColor/70 mobile:text-sm`
              }
            >
              {timeEl}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomItem;
