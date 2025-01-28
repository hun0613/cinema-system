import { useReservationNavStore, useReservationStore } from "@/store/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navigation = () => {
  // navigatioin 상태 (전역상태)
  const { navState, setNavState } = useReservationNavStore();
  // 영화 예매 데이터 (전역상태)
  const { theaterId, date, time, room, headCnt, seat } = useReservationStore();

  const handleClickNav = (nav: number) => {
    // // 날짜/상영관으로 넘어가려할때 극장선택이 안되있는 경우
    if (nav === 2 && !theaterId) {
      toast.error("먼저 극장을 선택해주세요", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
    // 인원수/좌석으로 넘어가려할때 그전 정보가 입력되어있지 않은 경우
    else if (nav === 3 && (!theaterId || !date || !time || !room)) {
      toast.error("먼저 날짜/상영관을 선택해주세요", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setNavState(nav);
    }
  };
  return (
    <div className="flex h-fit w-full flex-col items-center justify-center p-10">
      {/* nav container */}
      <div className="flex h-fit w-full flex-row items-center justify-between tablet:w-2/3">
        {/* 극장 */}
        <div
          onClick={() => handleClickNav(1)}
          className="flex h-fit w-1/3 cursor-pointer flex-col items-center justify-center"
        >
          {/* complete btn */}
          <div
            className={
              theaterId
                ? `aspect-square w-3 rounded-full bg-pointColor`
                : `aspect-square w-3 rounded-full bg-borderColor`
            }
          ></div>
          {/* title */}
          <div className="mt-5 h-fit w-full text-center font-NMSNeo3 text-sm text-fontColor mobile:text-base">
            극장
          </div>
        </div>

        {/* 날짜/상영관/시간 */}
        <div
          onClick={() => handleClickNav(2)}
          className="flex h-fit w-1/3 cursor-pointer flex-col items-center justify-center"
        >
          {/* complete btn */}
          <div
            className={
              date && time && room
                ? `aspect-square w-3 rounded-full bg-pointColor`
                : `aspect-square w-3 rounded-full bg-borderColor`
            }
          ></div>
          {/* title */}
          <div className="mt-5 h-fit w-full text-center font-NMSNeo3 text-sm text-fontColor mobile:text-base">
            날짜/상영관
          </div>
        </div>

        {/* 인원수/좌석 */}
        <div
          onClick={() => handleClickNav(3)}
          className="flex h-fit w-1/3 cursor-pointer flex-col items-center justify-center"
        >
          {/* complete btn */}
          <div
            className={
              headCnt && headCnt - seat.length === 0
                ? `aspect-square w-3 rounded-full bg-pointColor`
                : `aspect-square w-3 rounded-full bg-borderColor`
            }
          ></div>
          {/* title */}
          <div className="mt-5 h-fit w-full text-center font-NMSNeo3 text-sm text-fontColor mobile:text-base">
            인원수/좌석
          </div>
        </div>
      </div>

      {/* progress bar */}
      <div className="mt-5 flex h-fit w-full flex-row items-start justify-start tablet:w-2/3">
        {/* bar position */}
        <div
          className={
            navState === 1
              ? `flex h-2 w-1/3 translate-x-[0%] flex-col items-center justify-center rounded-lg duration-[500ms] ease-in-out`
              : navState === 2
                ? `flex h-2 w-1/3 translate-x-[100%] flex-col items-center justify-center rounded-lg duration-[500ms] ease-in-out`
                : navState === 3
                  ? `flex h-2 w-1/3 translate-x-[200%] flex-col items-center justify-center rounded-lg duration-[500ms] ease-in-out`
                  : `flex h-2 w-1/3 translate-x-[0%] flex-col items-center justify-center rounded-lg duration-[500ms] ease-in-out`
          }
        >
          {/* item */}
          <div className="h-full w-1/4 rounded-lg bg-pointColor"></div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
