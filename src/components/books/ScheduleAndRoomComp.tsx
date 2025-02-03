import { mergeClassNames } from "@/utils/domUtil";
import { Suspense } from "react";
import { BookPayloadType } from "./BookComp";
import DateComp from "./DateComp";
import RoomAndTimeComp, { RoomAndTimeSkeletonComp } from "./RoomAndTimeComp";

type ScheduleAndRoomOption = {
  currentBookPayload: Omit<BookPayloadType, "theaterId"> & { theaterId: number };
  onChangeDate: (date: string) => void;
  onChangeRoomAndTime: (roomId: number, time: string) => void;
};

export type ScheduleAndRoomCompProps = {
  scheduleAndRoomOption: ScheduleAndRoomOption;
} & JSX.IntrinsicElements["div"];

const ScheduleAndRoomComp: React.FC<ScheduleAndRoomCompProps> = (props) => {
  const { scheduleAndRoomOption } = props;
  const { currentBookPayload } = scheduleAndRoomOption;

  return (
    <div
      className={mergeClassNames(
        "flex h-fit w-full flex-col items-center justify-center rounded-xl p-3",
        "tablet:h-full tablet:flex-row tablet:p-5",
      )}
    >
      {/* 날짜 그룹 */}
      <DateComp currentDate={currentBookPayload.date} onChangeDate={scheduleAndRoomOption.onChangeDate} />

      {/* 상영관/시간 그룹 */}
      <Suspense fallback={<RoomAndTimeSkeletonComp />}>
        <RoomAndTimeComp
          currentBookPayload={scheduleAndRoomOption.currentBookPayload}
          onChangeRoomAndTime={scheduleAndRoomOption.onChangeRoomAndTime}
        />
      </Suspense>
    </div>
  );
};

export default ScheduleAndRoomComp;
