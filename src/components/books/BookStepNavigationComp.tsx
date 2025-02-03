import { BOOK_STEP } from "@/enums/books/bookEnum";
import { mergeClassNames } from "@/utils/domUtil";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type BookStepNavigationCompProps = {
  currentBookStep: BOOK_STEP;
  onChangeStep: (step: BOOK_STEP) => void;
  bookStepStates: {
    completeTheaterStep: boolean;
    completeScheduleAndRoomStep: boolean;
    completeHeadAndSeatStep: boolean;
  };
} & JSX.IntrinsicElements["div"];

const BookStepNavigationComp: React.FC<BookStepNavigationCompProps> = (props) => {
  const { currentBookStep, onChangeStep, bookStepStates } = props;
  const { completeTheaterStep, completeScheduleAndRoomStep, completeHeadAndSeatStep } = bookStepStates;

  const handleClickStep = (step: BOOK_STEP) => {
    // // 날짜/상영관으로 넘어가려할때 극장선택이 안되있는 경우
    if (step === BOOK_STEP.SCHEDULE_AND_ROOM && !completeTheaterStep) {
      toast.error("먼저 극장을 선택해주세요", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
    // 인원수/좌석으로 넘어가려할때 그전 정보가 입력되어있지 않은 경우
    else if (step === BOOK_STEP.HEAD_AND_SEAT && !(completeTheaterStep && completeScheduleAndRoomStep)) {
      toast.error("먼저 날짜/상영관을 선택해주세요", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      onChangeStep(step);
    }
  };
  return (
    <div className="flex h-fit w-full flex-col items-center justify-center p-10">
      {/* nav container */}
      <div className="flex h-fit w-full flex-row items-center justify-between tablet:w-2/3">
        {/* 극장 */}
        <div
          onClick={() => handleClickStep(BOOK_STEP.THEATER)}
          className="flex h-fit w-1/3 cursor-pointer flex-col items-center justify-center"
        >
          {/* complete btn */}
          <div
            className={mergeClassNames("aspect-square w-3 rounded-full bg-borderColor", {
              "bg-pointColor": completeTheaterStep,
            })}
          ></div>
          {/* title */}
          <div className="mt-5 h-fit w-full text-center font-NMSNeo3 text-sm text-fontColor mobile:text-base">극장</div>
        </div>

        {/* 날짜/상영관/시간 */}
        <div
          onClick={() => handleClickStep(BOOK_STEP.SCHEDULE_AND_ROOM)}
          className="flex h-fit w-1/3 cursor-pointer flex-col items-center justify-center"
        >
          {/* complete btn */}
          <div
            className={mergeClassNames("aspect-square w-3 rounded-full bg-borderColor", {
              "bg-pointColor": completeScheduleAndRoomStep,
            })}
          ></div>
          {/* title */}
          <div className="mt-5 h-fit w-full text-center font-NMSNeo3 text-sm text-fontColor mobile:text-base">날짜/상영관</div>
        </div>

        {/* 인원수/좌석 */}
        <div
          onClick={() => handleClickStep(BOOK_STEP.HEAD_AND_SEAT)}
          className="flex h-fit w-1/3 cursor-pointer flex-col items-center justify-center"
        >
          {/* complete btn */}
          <div
            className={mergeClassNames("aspect-square w-3 rounded-full bg-borderColor", {
              "bg-pointColor": completeHeadAndSeatStep,
            })}
          ></div>
          {/* title */}
          <div className="mt-5 h-fit w-full text-center font-NMSNeo3 text-sm text-fontColor mobile:text-base">인원수/좌석</div>
        </div>
      </div>

      {/* progress bar */}
      <div className="mt-5 flex h-fit w-full flex-row items-start justify-start tablet:w-2/3">
        {/* bar position */}
        <div
          className={mergeClassNames("flex h-2 w-1/3 flex-col items-center justify-center rounded-lg duration-[500ms] ease-in-out", {
            "translate-x-[0%]": currentBookStep === BOOK_STEP.THEATER,
            "translate-x-[100%]": currentBookStep === BOOK_STEP.SCHEDULE_AND_ROOM,
            "translate-x-[200%]": currentBookStep === BOOK_STEP.HEAD_AND_SEAT,
          })}
        >
          {/* item */}
          <div className="h-full w-1/4 rounded-lg bg-pointColor"></div>
        </div>
      </div>
    </div>
  );
};

export default BookStepNavigationComp;
