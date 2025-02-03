import { DateType, getFetchDatesQuery } from "@/actions/dates/useFetchDatesAction";
import { useSuspenseQueries } from "@tanstack/react-query";
import DateItemComp from "./DateItemComp";

export type DateCompProps = {
  currentDate: string;
  onChangeDate: (date: string) => void;
} & JSX.IntrinsicElements["div"];

const DateComp: React.FC<DateCompProps> = (props) => {
  const { currentDate, onChangeDate } = props;

  const [{ data: dates }] = useSuspenseQueries({
    queries: [getFetchDatesQuery()],
  });

  return (
    <div className="mb-3 mr-0 flex h-fit w-full flex-col items-center justify-start tablet:mb-0 tablet:mr-5 tablet:h-full tablet:w-[30%] tablet:py-0">
      {/* title */}
      <div className="mb-3 flex h-fit w-full flex-col items-center justify-center rounded-lg bg-titleColor p-3 font-NMSNeo3 text-sm text-fontColor">
        날짜
      </div>
      {/* 데이터가 존재하지 않을 경우 */}
      {dates.length === 0 && (
        <div className="flex h-full w-full flex-col items-center justify-center font-NMSNeo2 text-xs text-fontColor tablet:text-sm">
          날짜정보가 존재하지않아요...😱
        </div>
      )}
      {/* 데이터가 존재할 경우 */}
      {!!dates && (
        <div className="flex h-full w-full flex-row items-center justify-start overflow-x-auto overflow-y-auto tablet:flex-col tablet:overflow-y-auto ">
          {dates.map((dateInfo: DateType, idx: number) => {
            return <DateItemComp key={`${dateInfo.date}+idx`} dateOption={{ currentDate, onChangeDate }} dateInfo={dateInfo} idx={idx} />;
          })}
        </div>
      )}
    </div>
  );
};

export default DateComp;
