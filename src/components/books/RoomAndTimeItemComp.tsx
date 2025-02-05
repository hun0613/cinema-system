import { MovieTimeType } from '@/actions/movies/useFetchMovieTimesAction';
import { mergeClassNames } from '@/utils/domUtil';

export type roomType = {
  room_id: number;
  room_nm: string;
};

export type roomAndTimeOptionType = {
  currentRoom?: number;
  currentTime?: string;
  onChangeRoomAndTime: (roomId: number, time: string) => void;
};

export type RoomAndTimeItemCompProps = {
  room: roomType;
  roomAndTimeOption: roomAndTimeOptionType;
  movieTimes: MovieTimeType[];
} & JSX.IntrinsicElements['div'];

const RoomAndTimeItemComp: React.FC<RoomAndTimeItemCompProps> = (props) => {
  const { room, roomAndTimeOption, movieTimes } = props;
  const { currentRoom, currentTime, onChangeRoomAndTime } = roomAndTimeOption;

  const handleClickTime = (movieTime: string) => {
    onChangeRoomAndTime(room.room_id, movieTime);
  };

  return (
    <div className='flex h-fit w-full flex-col items-start justify-start rounded-xl p-5'>
      {/* 상영관 이름 */}
      <div className='h-fit w-fit font-NMSNeo2 text-sm text-fontColor'>{room.room_nm}관</div>
      {/* 상영시간표 */}
      <div className='mt-5 flex h-fit w-full flex-row items-center justify-start'>
        {/* time item */}
        {movieTimes.map((movieTime: MovieTimeType) => {
          return (
            <div
              key={`movieTime_${movieTime.time}`}
              onClick={() => handleClickTime(movieTime.time)}
              className={mergeClassNames(
                'mr-3 flex h-fit w-fit cursor-pointer flex-col items-center justify-center rounded-lg bg-titleColor px-5 py-2 font-NMSNeo3 text-xs text-fontColor',
                'hover:bg-titleColor/70',
                'mobile:text-sm',
                {
                  'cursor-default bg-pointColor/70 hover:bg-pointColor/70':
                    currentRoom === movieTime.room_id && currentTime === movieTime.time,
                },
              )}
            >
              {movieTime.time}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomAndTimeItemComp;
