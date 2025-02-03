import { SeatLayoutType } from "@/actions/rooms/useFetchRoomAction";
import { mergeClassNames } from "@/utils/domUtil";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type SeatOptionType = {
  currentSeat: string[];
  onChangeSeat: (seat: string[], seatState: string[]) => void;
};

type SeatLayoutCompProps = {
  seatLayout: SeatLayoutType;
  headCount: number;
  seatOption: SeatOptionType;
};

const SeatLayoutComp: React.FC<SeatLayoutCompProps> = (props) => {
  const { seatLayout, headCount, seatOption } = props;
  const { row, col, sp, ep, seat_state } = seatLayout;
  const { currentSeat, onChangeSeat } = seatOption;

  // 상영관 구조 상태
  const [seatStructure, setSeatStructure] = useState<string[][]>([[]]);

  // 예약 가능 좌석 클릭 시
  const handleClickSeat = (col: string) => {
    /** 관람인원 미선택 시 */
    if (headCount === 0) {
      toast.error("먼저 관람인원을 선택해주세요", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (headCount - currentSeat.length === 0) {
      /** 선택해야할 인원수가 0이 되었을 때 */
      toast.error("이미 좌석을 모두 선택하였습니다", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      /** headCount가 1명 남았을 때 */
      if (headCount === 1 || headCount - currentSeat.length === 1) {
        // console.log("select 1 seat");
        onChangeSeat([...currentSeat, col], seat_state);
      } else if (headCount > 1) {
        /** headCount가 2명 이상 남았을 때 */
        // 왼쪽 좌석 (없으면 undefined)
        let leftSeat: string | null | undefined = document.getElementById(
          `${col.slice(0, 1)}${Number(col.slice(1, 3)) - 1 < 10 ? "0" + (Number(col.slice(1, 3)) - 1).toString() : (Number(col.slice(1, 3)) - 1).toString()}`,
        )?.textContent;

        // 오른쪽 좌석 (없으면 undefined)
        let rightSeat: string | null | undefined = document.getElementById(
          `${col.slice(0, 1)}${Number(col.slice(1, 3)) + 1 < 10 ? "0" + (Number(col.slice(1, 3)) + 1).toString() : (Number(col.slice(1, 3)) + 1).toString()}`,
        )?.textContent;

        /** EP 선택 시 */
        if (ep.includes(Number(col.slice(1, 3)) - 1)) {
          /** ---- 좌측 좌석이 선택좌석 혹은 이미 예약된 좌석일 경우 */
          if ((leftSeat && currentSeat.includes(leftSeat)) || leftSeat === "") {
            // console.log("left seat is already booked. so, select 1 seat");
            onChangeSeat([...currentSeat, col], seat_state);
          } else {
            /** ---- 그렇지 않은 경우 */
            // console.log("select 2 seats with left seat");
            if (leftSeat) onChangeSeat([...currentSeat, col, leftSeat], seat_state);
          }
        } else {
          /**  -- 기본 케이스 */
          /** ---- 우측 좌석이 선택좌석 혹은 이미 예약된 좌석일 경우 */
          if ((rightSeat && currentSeat.includes(rightSeat)) || rightSeat === "") {
            /** ---- 좌측 좌석도 선택좌석 혹은 이미 예약된 좌석일 경우 */
            if ((leftSeat && currentSeat.includes(leftSeat)) || leftSeat === "") {
              //   console.log("left seat is already booked too. so, select 1 seat");
              if (leftSeat) onChangeSeat([...currentSeat, col], seat_state);
            } else {
              /** ---- 그렇지 않은 경우 */
              //   console.log("right seat is already booked. so, select left seat");
              if (leftSeat) onChangeSeat([...currentSeat, col, leftSeat], seat_state);
            }
          } else {
            /** ---- 예외상황이 없는 경우 */
            // console.log("select 2 seats with right seat");
            if (rightSeat) onChangeSeat([...currentSeat, col, rightSeat], seat_state);
          }
        }
      }
    }
  };

  // 선택 좌석 클릭 시
  const handleClickSelectSeat = (col: string) => {
    // console.log(col + "_select_click!");
    let idx = currentSeat.indexOf(col);
    let tempArr = [...currentSeat];

    tempArr.splice(idx, 1);

    onChangeSeat(tempArr, seat_state);
  };

  // 좌석 호버 시
  const handleMouseEnterSeat = (col: string) => {
    /** 관람인원 미선택 시 */
    if (headCount === 0) {
      // no action
    } else if (headCount - currentSeat.length === 0) {
      /** 선택해야할 인원수가 0이 되었을 때 */
      // no action
    } else {
      /** headCount가 1명 남았을 때 */
      if (headCount === 1 || headCount - currentSeat.length === 1) {
        // console.log("select 1 seat");
        let currSeatEl = document.getElementById(col);
        if (currSeatEl !== null) currSeatEl.style.backgroundColor = "rgb(255 0 0 / 0.3)";
      } else if (headCount > 1) {
        /** headCount가 2명 이상 남았을 때 */
        // 현재 좌석
        let currSeatEl = document.getElementById(col);

        // 왼쪽 좌석 (없으면 undefined)
        let leftSeatEl: HTMLElement | null | undefined = document.getElementById(
          `${col.slice(0, 1)}${Number(col.slice(1, 3)) - 1 < 10 ? "0" + (Number(col.slice(1, 3)) - 1).toString() : (Number(col.slice(1, 3)) - 1).toString()}`,
        );
        // 왼쪽 좌석 코드 (없으면 undefined)
        let leftSeat: string | null | undefined = document.getElementById(
          `${col.slice(0, 1)}${Number(col.slice(1, 3)) - 1 < 10 ? "0" + (Number(col.slice(1, 3)) - 1).toString() : (Number(col.slice(1, 3)) - 1).toString()}`,
        )?.textContent;

        // 오른쪽 좌석 (없으면 undefined)
        let rightSeatEl: HTMLElement | null | undefined = document.getElementById(
          `${col.slice(0, 1)}${Number(col.slice(1, 3)) + 1 < 10 ? "0" + (Number(col.slice(1, 3)) + 1).toString() : (Number(col.slice(1, 3)) + 1).toString()}`,
        );
        // 오른쪽 좌석 코드 (없으면 undefined)
        let rightSeat: string | null | undefined = document.getElementById(
          `${col.slice(0, 1)}${Number(col.slice(1, 3)) + 1 < 10 ? "0" + (Number(col.slice(1, 3)) + 1).toString() : (Number(col.slice(1, 3)) + 1).toString()}`,
        )?.textContent;

        /** EP 선택 시 */
        if (ep.includes(Number(col.slice(1, 3)) - 1)) {
          /** ---- 좌측 좌석이 선택좌석 혹은 이미 예약된 좌석일 경우 */
          if ((leftSeat && currentSeat.includes(leftSeat)) || leftSeat === "") {
            // console.log("left seat is already booked. so, select 1 seat");
            if (currSeatEl !== null) currSeatEl.style.backgroundColor = "rgb(255 0 0 / 0.3)";
          } else {
            /** ---- 그렇지 않은 경우 */
            // console.log("select 2 seats with left seat");
            if (currSeatEl !== null) currSeatEl.style.backgroundColor = "rgb(255 0 0 / 0.3)";
            if (leftSeatEl) leftSeatEl.style.backgroundColor = "rgb(255 0 0 / 0.3)";
          }
        } else {
          /**  -- 기본 케이스 */
          /** ---- 우측 좌석이 선택좌석 혹은 이미 예약된 좌석일 경우 */
          if ((rightSeat && currentSeat.includes(rightSeat)) || rightSeat === "") {
            /** ---- 좌측 좌석도 선택좌석 혹은 이미 예약된 좌석일 경우 */
            if ((leftSeat && currentSeat.includes(leftSeat)) || leftSeat === "") {
              //   console.log("left seat is already booked too. so, select 1 seat");
              if (currSeatEl) currSeatEl.style.backgroundColor = "rgb(255 0 0 / 0.3)";
            } else {
              /** ---- 그렇지 않은 경우 */
              //   console.log("right seat is already booked. so, select left seat");
              if (currSeatEl !== null) currSeatEl.style.backgroundColor = "rgb(255 0 0 / 0.3)";
              if (leftSeatEl) leftSeatEl.style.backgroundColor = "rgb(255 0 0 / 0.3)";
            }
          } else {
            /** ---- 예외상황이 없는 경우 */
            // console.log("select 2 seats with right seat");
            if (currSeatEl !== null) currSeatEl.style.backgroundColor = "rgb(255 0 0 / 0.3)";
            if (rightSeatEl) rightSeatEl.style.backgroundColor = "rgb(255 0 0 / 0.3)";
          }
        }
      }
    }
  };

  // 좌석 호버 아웃 시
  const handleMouseLeaveSeat = (col: string) => {
    /** 관람인원 미선택 시 */
    if (headCount === 0) {
      // no action
    } else if (headCount - currentSeat.length === 0) {
      /** 선택해야할 인원수가 0이 되었을 때 */
      // no action
    } else {
      /** headCount가 1명 남았을 때 */
      if (headCount === 1 || headCount - currentSeat.length === 1) {
        // console.log("select 1 seat");
        let currSeatEl = document.getElementById(col);
        if (currSeatEl !== null) currSeatEl.style.backgroundColor = "transparent";
      } else if (headCount > 1) {
        /** headCount가 2명 이상 남았을 때 */
        // 현재 좌석
        let currSeatEl = document.getElementById(col);

        // 왼쪽 좌석 (없으면 undefined)
        let leftSeatEl: HTMLElement | null | undefined = document.getElementById(
          `${col.slice(0, 1)}${Number(col.slice(1, 3)) - 1 < 10 ? "0" + (Number(col.slice(1, 3)) - 1).toString() : (Number(col.slice(1, 3)) - 1).toString()}`,
        );
        // 왼쪽 좌석 코드 (없으면 undefined)
        let leftSeat: string | null | undefined = document.getElementById(
          `${col.slice(0, 1)}${Number(col.slice(1, 3)) - 1 < 10 ? "0" + (Number(col.slice(1, 3)) - 1).toString() : (Number(col.slice(1, 3)) - 1).toString()}`,
        )?.textContent;

        // 오른쪽 좌석 (없으면 undefined)
        let rightSeatEl: HTMLElement | null | undefined = document.getElementById(
          `${col.slice(0, 1)}${Number(col.slice(1, 3)) + 1 < 10 ? "0" + (Number(col.slice(1, 3)) + 1).toString() : (Number(col.slice(1, 3)) + 1).toString()}`,
        );
        // 오른쪽 좌석 코드 (없으면 undefined)
        let rightSeat: string | null | undefined = document.getElementById(
          `${col.slice(0, 1)}${Number(col.slice(1, 3)) + 1 < 10 ? "0" + (Number(col.slice(1, 3)) + 1).toString() : (Number(col.slice(1, 3)) + 1).toString()}`,
        )?.textContent;

        /** EP 선택 시 */
        if (ep.includes(Number(col.slice(1, 3)) - 1)) {
          /** ---- 좌측 좌석이 선택좌석 혹은 이미 예약된 좌석일 경우 */
          if ((leftSeat && currentSeat.includes(leftSeat)) || leftSeat === "") {
            // console.log("left seat is already booked. so, select 1 seat");
            if (currSeatEl !== null) currSeatEl.style.backgroundColor = "transparent";
          } else {
            /** ---- 그렇지 않은 경우 */
            // console.log("select 2 seats with left seat");
            if (currSeatEl !== null) currSeatEl.style.backgroundColor = "transparent";
            if (leftSeatEl) leftSeatEl.style.backgroundColor = "transparent";
          }
        } else {
          /**  -- 기본 케이스 */
          /** ---- 우측 좌석이 선택좌석 혹은 이미 예약된 좌석일 경우 */
          if ((rightSeat && currentSeat.includes(rightSeat)) || rightSeat === "") {
            /** ---- 좌측 좌석도 선택좌석 혹은 이미 예약된 좌석일 경우 */
            if ((leftSeat && currentSeat.includes(leftSeat)) || leftSeat === "") {
              //   console.log("left seat is already booked too. so, select 1 seat");
              if (currSeatEl) currSeatEl.style.backgroundColor = "transparent";
            } else {
              /** ---- 그렇지 않은 경우 */
              //   console.log("right seat is already booked. so, select left seat");
              if (currSeatEl !== null) currSeatEl.style.backgroundColor = "transparent";
              if (leftSeatEl) leftSeatEl.style.backgroundColor = "transparent";
            }
          } else {
            /** ---- 예외상황이 없는 경우 */
            // console.log("select 2 seats with right seat");
            if (currSeatEl !== null) currSeatEl.style.backgroundColor = "transparent";
            if (rightSeatEl) rightSeatEl.style.backgroundColor = "transparent";
          }
        }
      }
    }
  };

  useEffect(() => {
    // 상영관 구조 생성 알고리즘
    if (seatStructure[0].length === 0) {
      let seatArr = [];

      for (let i = 0; i < row.length; i++) {
        let RowData = [];
        for (let j = 0; j < col.length; j++) {
          RowData.push(row[i] + col[j]);
        }
        seatArr.push(RowData);
      }

      setSeatStructure(seatArr);
    }

    // headCount 변경 시, 좌석 컴포넌트 스타일 초기화
    let normalSeatArr: NodeListOf<HTMLElement> = document.querySelectorAll(".seat");

    for (let i = 0; i < normalSeatArr.length; i++) {
      if (normalSeatArr[i]) {
        normalSeatArr[i].style.backgroundColor = "";
      }
    }
  }, [headCount]);

  return (
    <div className="absolute top-0 flex h-fit min-h-full w-fit min-w-full flex-col items-center justify-start rounded-xl p-10 pb-32">
      {seatStructure.map((row: string[], rowIdx: number) => {
        return (
          <div key={`seatRow_${rowIdx}`} className="mb-[6px] flex h-fit w-fit flex-row items-center justify-center">
            {row.map((col: string, colIdx: number) => {
              if (headCount === 0) {
                return (
                  <div
                    onClick={() => handleClickSeat(col)}
                    id={col}
                    key={`seat_${col}`}
                    className={mergeClassNames(
                      "seat mx-[3px] flex aspect-square w-7 cursor-pointer flex-col items-center justify-center rounded-md border border-fontColor/30 font-NMSNeo4 text-[9px] text-fontColor/30",
                      {
                        "ml-10": sp.includes(colIdx),
                        "mr-10": ep.includes(colIdx),
                      },
                    )}
                  >
                    {col}
                  </div>
                );
              } else if (seat_state.includes(col)) {
                /* 선택불가(이미 예약된) 좌석 */
                return (
                  <div
                    id={col}
                    key={`seat_${col}`}
                    className={mergeClassNames(
                      "mx-[3px] flex aspect-square w-7 flex-col items-center justify-center rounded-md border border-borderColor font-NMSNeo4 text-[9px] text-fontColor",
                      {
                        "ml-10": sp.includes(colIdx),
                        "mr-10": ep.includes(colIdx),
                      },
                    )}
                  >
                    {""}
                  </div>
                );
              } else if (currentSeat.includes(col)) {
                /* 선택 좌석 */
                return (
                  <div
                    id={col}
                    onClick={() => handleClickSelectSeat(col)}
                    key={`seat_${col}`}
                    className={mergeClassNames(
                      "mx-[3px] flex aspect-square w-7 cursor-pointer flex-col items-center justify-center rounded-md border border-fontColor/70 !bg-pointColor font-NMSNeo4 text-[9px] text-fontColor",
                      {
                        "ml-10": sp.includes(colIdx),
                        "mr-10": ep.includes(colIdx),
                      },
                    )}
                  >
                    {col}
                  </div>
                );
              } else {
                /* 예매가능 좌석 */
                return (
                  <div
                    onClick={() => handleClickSeat(col)}
                    onMouseEnter={isMobile ? undefined : () => handleMouseEnterSeat(col)}
                    onMouseLeave={isMobile ? undefined : () => handleMouseLeaveSeat(col)}
                    id={col}
                    key={`seat_${col}`}
                    className={mergeClassNames(
                      "seat mx-[3px] flex aspect-square w-7 cursor-pointer flex-col items-center justify-center rounded-md border border-fontColor/70 font-NMSNeo4 text-[9px] text-fontColor",
                      {
                        "ml-10": sp.includes(colIdx),
                        "mr-10": ep.includes(colIdx),
                      },
                    )}
                  >
                    {col}
                  </div>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default SeatLayoutComp;
