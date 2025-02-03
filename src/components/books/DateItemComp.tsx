import { DateType } from "@/actions/dates/useFetchDatesAction";
import { useEffect, useRef } from "react";

type DateOptionType = {
  currentDate: string;
  onChangeDate: (date: string) => void;
};

export type DateItemCompProps = {
  dateOption: DateOptionType;
  dateInfo: DateType;
  idx: number; // 순번
};

const DateItemComp: React.FC<DateItemCompProps> = (props) => {
  const { dateOption, dateInfo, idx } = props;
  const { date, week, holiday_yn } = dateInfo;
  const { currentDate, onChangeDate } = dateOption;

  // scroll foucs 설정용 Ref
  const dateRef = useRef<HTMLDivElement>(null);

  const handleClickDate = () => {
    onChangeDate(date);
  };

  useEffect(() => {
    // 첫 랜더링 시 선택한 날짜를 스크롤 중심으로 이동
    if (date === currentDate) {
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
          <div className="mb-1 h-fit w-full text-center font-NMSNeo4 text-[10px] text-fontColor mobile:text-xs">{date.slice(0, 4)}</div>
          {/* 월 */}
          <div className="h-fit w-full text-center font-NMSNeo5 text-base text-fontColor mobile:text-lg">{date.slice(4, 6)}</div>
        </div>
      ) : null}

      {/* 요일, 일 */}
      <div
        ref={dateRef}
        onClick={handleClickDate}
        className={
          currentDate === date
            ? `flex h-fit w-full cursor-pointer flex-row items-center justify-center rounded-lg bg-pointColor/70 p-5 text-fontColor mobile:p-3`
            : holiday_yn === "Y"
              ? `flex h-fit w-full cursor-pointer flex-row items-center justify-center rounded-lg p-5 text-pointColor/70 hover:bg-black/60 mobile:p-3`
              : week === "토"
                ? `flex h-fit w-full cursor-pointer flex-row items-center justify-center rounded-lg p-5 text-[#415ab4] hover:bg-black/60 mobile:p-3`
                : `flex h-fit w-full cursor-pointer flex-row items-center justify-center rounded-lg p-5 text-fontColor hover:bg-black/60 mobile:p-3`
        }
      >
        {/* 요일 */}
        <div className="h-fit w-fit text-center font-NMSNeo3 text-xs mobile:text-sm">{week}</div>
        {/* 일 */}
        <div className="ml-2 h-fit w-fit text-center font-NMSNeo4 text-xs mobile:text-sm">{date.slice(6, 8)}</div>
      </div>
    </div>
  );
};

export default DateItemComp;
