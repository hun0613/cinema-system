import { getFetchMovieTimesQuery } from "@/actions/movies/useFetchMovieTimesAction";
import { useSuspenseQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { BookPayloadType } from "./BookComp";
import RoomAndTimeItemComp from "./RoomAndTimeItemComp";

export type RoomAndTimeCompProps = {
  currentBookPayload: Omit<BookPayloadType, "theaterId"> & { theaterId: number };
  onChangeRoomAndTime: (roomId: number, time: string) => void;
} & JSX.IntrinsicElements["div"];

const RoomAndTimeComp: React.FC<RoomAndTimeCompProps> = (props) => {
  const { currentBookPayload, onChangeRoomAndTime } = props;
  const { theaterId, movieId, date, roomId, time } = currentBookPayload;

  const [{ data: movieTimes }] = useSuspenseQueries({
    queries: [getFetchMovieTimesQuery(theaterId, movieId, date)],
  });

  const roomList = useMemo(() => {
    const roomIdStack: number[] = [];
    return movieTimes
      .map((movieTime) => {
        if (!roomIdStack.includes(movieTime.room_id)) {
          roomIdStack.push(movieTime.room_id);
          return {
            room_id: movieTime.room_id,
            room_nm: movieTime.room_nm,
          };
        }
      })
      .filter((room) => !!room);
  }, [movieTimes]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-start tablet:h-full tablet:w-[70%]">
      {/* title */}
      <div className="mb-3 flex h-fit w-full flex-col items-center justify-center rounded-lg bg-titleColor p-3 font-NMSNeo3 text-sm text-fontColor">
        상영관 / 시간
      </div>
      {/* 데이터가 존재하지 않을 경우 */}
      {movieTimes.length === 0 ? (
        <div className="flex h-fit w-full flex-col items-center justify-center p-5 font-NMSNeo2 text-xs text-fontColor tablet:text-sm">
          상영정보가 존재하지않아요...😱
        </div>
      ) : null}
      {!!movieTimes && (
        <div className="flex h-full w-full flex-col items-center justify-start overflow-y-auto rounded-xl">
          {roomList.map((room) => {
            return (
              <RoomAndTimeItemComp
                key={`room_${room.room_id}`}
                room={room}
                roomAndTimeOption={{ currentRoom: roomId, currentTime: time, onChangeRoomAndTime }}
                movieTimes={movieTimes}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RoomAndTimeComp;

export type RoomAndTimeSkeletonCompProps = {} & JSX.IntrinsicElements["div"];

export const RoomAndTimeSkeletonComp: React.FC<RoomAndTimeSkeletonCompProps> = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start tablet:h-full tablet:w-[70%]">
      {/* title */}
      <div className="mb-3 flex h-fit w-full flex-col items-center justify-center rounded-lg bg-titleColor p-3 font-NMSNeo3 text-sm text-fontColor">
        상영관 / 시간
      </div>
      <div className="flex h-fit w-full flex-col items-center justify-center p-5 font-NMSNeo2 text-xs text-fontColor tablet:text-sm">
        상영정보를 불러오고 있어요!🤔
      </div>
    </div>
  );
};
