import { getFetchRoomQuery } from "@/actions/rooms/useFetchRoomAction";
import { mergeClassNames } from "@/utils/domUtil";
import { useSuspenseQueries } from "@tanstack/react-query";
import { BookPayloadType } from "./BookComp";
import SeatLayoutComp from "./SeatLayoutComp";

export const MAX_HEAD_COUNT = 8;

export type seatOptionType = {
  currentBookPayload: Omit<BookPayloadType, "theaterId"> & { theaterId: number; roomId: number; time: string; seat: string[] };
  onChangeSeat: (seat: string[]) => void;
  onChangeHeadCount: (headCount: number, seatState: string[]) => void;
};

export type SeatCompProps = {
  seatOption: seatOptionType;
} & JSX.IntrinsicElements["div"];

const SeatComp: React.FC<SeatCompProps> = (props) => {
  const { seatOption } = props;
  const { currentBookPayload, onChangeSeat, onChangeHeadCount } = seatOption;
  const { theaterId, roomId, time, date, seat, headCount } = currentBookPayload;

  const headCountList = Array.from({ length: MAX_HEAD_COUNT }, (_, i) => i + 1);

  const [{ data: seatLayout }] = useSuspenseQueries({
    queries: [getFetchRoomQuery(theaterId, roomId, date, time)],
  });

  const handleClickHeadCount = (count: number) => {
    if (headCount !== 0 && seat.length > 0) {
      if (window.confirm("선택된 좌석이 모두 초기화됩니다.\n변경하시겠습니까?")) {
        onChangeHeadCount(count, seatLayout.seat_state);
        onChangeSeat([]);
      }
    } else {
      onChangeHeadCount(count, seatLayout.seat_state);
    }
  };

  return (
    <div className="flex h-[calc(100vh/1.3)] w-full flex-col items-center justify-start rounded-xl p-2 mobile:h-[calc(100vh/1.8)] mobile:p-5">
      {/* screen */}
      <div className="flex h-fit w-2/3 flex-col items-center justify-center rounded-lg bg-titleColor/50 p-2 font-NMSNeo3 text-xs text-fontColor/50 mobile:text-sm  tablet:text-base">
        Screen
      </div>
      {/* content */}
      <div className="relative mt-2 flex h-full w-full flex-col items-center justify-center rounded-xl tablet:mt-5">
        {/* 상영관 컨테이너 */}
        <div className="relative h-full w-full overflow-auto">
          {/* 상영관 컴포넌트*/}
          <SeatLayoutComp
            seatLayout={seatLayout}
            headCount={headCount}
            seatOption={{
              currentSeat: seat,
              onChangeSeat,
            }}
          />
        </div>
        {/* 인원선택 */}
        <div className="absolute bottom-0 flex h-fit w-fit flex-col items-center justify-center rounded-lg border border-borderColor bg-bgColor/80 px-3 py-5 mobile:px-5 tablet:w-fit">
          {/* title */}
          <div className="flex h-fit w-full flex-row items-end justify-start">
            <div className="h-fit w-fit font-NMSNeo3 text-sm text-fontColor tablet:text-base">인원선택</div>
            <div className="ml-2 h-fit w-fit font-NMSNeo2 text-xs text-fontColor mobile:mb-[1px] tablet:mb-[2px]">
              {`최대 ${MAX_HEAD_COUNT}명까지 선택가능`}
            </div>
          </div>
          {/* select comp */}
          <div className="mt-5 flex h-fit w-full flex-row items-center justify-between">
            {/* select btn */}
            <div className="grid h-fit w-full grid-cols-8 gap-1 mobile:gap-3">
              {headCountList.map((count: number) => {
                return (
                  <div
                    onClick={() => handleClickHeadCount(count)}
                    key={`headCount_${count}`}
                    className={mergeClassNames(
                      "flex aspect-square w-7 cursor-pointer flex-col items-center justify-center rounded-md border border-borderColor bg-pointColor/70 font-NMSNeo3 text-xs text-fontColor",
                      "mobile:w-8 tablet:text-sm",
                      {
                        "bg-transparent hover:bg-pointColor/30": count !== headCount,
                      },
                    )}
                  >
                    {count}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatComp;
