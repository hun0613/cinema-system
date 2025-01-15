import { useReservationStore } from "@/store/store";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Room = {
  row: string[]; // 상영관 행 정보
  col: string[]; // 상영관 열 정보
  sp: number[]; // 좌석간 간격 시작지점 (배열 인덱스 기준 (0 ~))
  ep: number[]; // 좌석간 간격 종료지점 (배열 인덱스 기준 (0 ~))
};

type OneProps = {
  room: Room;
};

const One = (props: OneProps) => {
  const { row, col, sp, ep } = props.room;

  // 상영관 구조 상태
  const [seatStructure, setSeatStructure] = useState<string[][]>([[]]);

  // 영화 예매 데이터 (전역상태)
  const { headCnt, seat, setSeat, seatState } = useReservationStore();

  // 예약 가능 좌석 클릭 시
  const handleClickSeat = (col: string) => {
    /** 관람인원 미선택 시 */
    if (headCnt === 0) {
      toast.error("먼저 관람인원을 선택해주세요", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (headCnt - seat.length === 0) {
      /** 선택해야할 인원수가 0이 되었을 때 */
      toast.error("이미 좌석을 모두 선택하였습니다", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      /** headCnt가 1명 남았을 때 */
      if (headCnt === 1 || headCnt - seat.length === 1) {
        // console.log("select 1 seat");
        setSeat([...seat, col]);
      } else if (headCnt > 1) {
        /** headCnt가 2명 이상 남았을 때 */
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
          if ((leftSeat && seat.includes(leftSeat)) || leftSeat === "") {
            // console.log("left seat is already booked. so, select 1 seat");
            setSeat([...seat, col]);
          } else {
            /** ---- 그렇지 않은 경우 */
            // console.log("select 2 seats with left seat");
            if (leftSeat) setSeat([...seat, col, leftSeat]);
          }
        } else {
          /**  -- 기본 케이스 */
          /** ---- 우측 좌석이 선택좌석 혹은 이미 예약된 좌석일 경우 */
          if ((rightSeat && seat.includes(rightSeat)) || rightSeat === "") {
            /** ---- 좌측 좌석도 선택좌석 혹은 이미 예약된 좌석일 경우 */
            if ((leftSeat && seat.includes(leftSeat)) || leftSeat === "") {
              //   console.log("left seat is already booked too. so, select 1 seat");
              if (leftSeat) setSeat([...seat, col]);
            } else {
              /** ---- 그렇지 않은 경우 */
              //   console.log("right seat is already booked. so, select left seat");
              if (leftSeat) setSeat([...seat, col, leftSeat]);
            }
          } else {
            /** ---- 예외상황이 없는 경우 */
            // console.log("select 2 seats with right seat");
            if (rightSeat) setSeat([...seat, col, rightSeat]);
          }
        }
      }
    }
  };

  // 선택 좌석 클릭 시
  const handleClickSelectSeat = (col: string) => {
    // console.log(col + "_select_click!");
    let idx = seat.indexOf(col);
    let tempArr = [...seat];

    tempArr.splice(idx, 1);

    setSeat(tempArr);
  };

  // 좌석 호버 시
  const handleMouseEnterSeat = (col: string) => {
    /** 관람인원 미선택 시 */
    if (headCnt === 0) {
      // no action
    } else if (headCnt - seat.length === 0) {
      /** 선택해야할 인원수가 0이 되었을 때 */
      // no action
    } else {
      /** headCnt가 1명 남았을 때 */
      if (headCnt === 1 || headCnt - seat.length === 1) {
        // console.log("select 1 seat");
        let currSeatEl = document.getElementById(col);
        if (currSeatEl !== null)
          currSeatEl.style.backgroundColor = "rgb(255 0 0 / 0.3)";
      } else if (headCnt > 1) {
        /** headCnt가 2명 이상 남았을 때 */
        // 현재 좌석
        let currSeatEl = document.getElementById(col);

        // 왼쪽 좌석 (없으면 undefined)
        let leftSeatEl: HTMLElement | null | undefined =
          document.getElementById(
            `${col.slice(0, 1)}${Number(col.slice(1, 3)) - 1 < 10 ? "0" + (Number(col.slice(1, 3)) - 1).toString() : (Number(col.slice(1, 3)) - 1).toString()}`,
          );
        // 왼쪽 좌석 코드 (없으면 undefined)
        let leftSeat: string | null | undefined = document.getElementById(
          `${col.slice(0, 1)}${Number(col.slice(1, 3)) - 1 < 10 ? "0" + (Number(col.slice(1, 3)) - 1).toString() : (Number(col.slice(1, 3)) - 1).toString()}`,
        )?.textContent;

        // 오른쪽 좌석 (없으면 undefined)
        let rightSeatEl: HTMLElement | null | undefined =
          document.getElementById(
            `${col.slice(0, 1)}${Number(col.slice(1, 3)) + 1 < 10 ? "0" + (Number(col.slice(1, 3)) + 1).toString() : (Number(col.slice(1, 3)) + 1).toString()}`,
          );
        // 오른쪽 좌석 코드 (없으면 undefined)
        let rightSeat: string | null | undefined = document.getElementById(
          `${col.slice(0, 1)}${Number(col.slice(1, 3)) + 1 < 10 ? "0" + (Number(col.slice(1, 3)) + 1).toString() : (Number(col.slice(1, 3)) + 1).toString()}`,
        )?.textContent;

        /** EP 선택 시 */
        if (ep.includes(Number(col.slice(1, 3)) - 1)) {
          /** ---- 좌측 좌석이 선택좌석 혹은 이미 예약된 좌석일 경우 */
          if ((leftSeat && seat.includes(leftSeat)) || leftSeat === "") {
            // console.log("left seat is already booked. so, select 1 seat");
            if (currSeatEl !== null)
              currSeatEl.style.backgroundColor = "rgb(255 0 0 / 0.3)";
          } else {
            /** ---- 그렇지 않은 경우 */
            // console.log("select 2 seats with left seat");
            if (currSeatEl !== null)
              currSeatEl.style.backgroundColor = "rgb(255 0 0 / 0.3)";
            if (leftSeatEl)
              leftSeatEl.style.backgroundColor = "rgb(255 0 0 / 0.3)";
          }
        } else {
          /**  -- 기본 케이스 */
          /** ---- 우측 좌석이 선택좌석 혹은 이미 예약된 좌석일 경우 */
          if ((rightSeat && seat.includes(rightSeat)) || rightSeat === "") {
            /** ---- 좌측 좌석도 선택좌석 혹은 이미 예약된 좌석일 경우 */
            if ((leftSeat && seat.includes(leftSeat)) || leftSeat === "") {
              //   console.log("left seat is already booked too. so, select 1 seat");
              if (currSeatEl)
                currSeatEl.style.backgroundColor = "rgb(255 0 0 / 0.3)";
            } else {
              /** ---- 그렇지 않은 경우 */
              //   console.log("right seat is already booked. so, select left seat");
              if (currSeatEl !== null)
                currSeatEl.style.backgroundColor = "rgb(255 0 0 / 0.3)";
              if (leftSeatEl)
                leftSeatEl.style.backgroundColor = "rgb(255 0 0 / 0.3)";
            }
          } else {
            /** ---- 예외상황이 없는 경우 */
            // console.log("select 2 seats with right seat");
            if (currSeatEl !== null)
              currSeatEl.style.backgroundColor = "rgb(255 0 0 / 0.3)";
            if (rightSeatEl)
              rightSeatEl.style.backgroundColor = "rgb(255 0 0 / 0.3)";
          }
        }
      }
    }
  };

  // 좌석 호버 아웃 시
  const handleMouseLeaveSeat = (col: string) => {
    /** 관람인원 미선택 시 */
    if (headCnt === 0) {
      // no action
    } else if (headCnt - seat.length === 0) {
      /** 선택해야할 인원수가 0이 되었을 때 */
      // no action
    } else {
      /** headCnt가 1명 남았을 때 */
      if (headCnt === 1 || headCnt - seat.length === 1) {
        // console.log("select 1 seat");
        let currSeatEl = document.getElementById(col);
        if (currSeatEl !== null)
          currSeatEl.style.backgroundColor = "transparent";
      } else if (headCnt > 1) {
        /** headCnt가 2명 이상 남았을 때 */
        // 현재 좌석
        let currSeatEl = document.getElementById(col);

        // 왼쪽 좌석 (없으면 undefined)
        let leftSeatEl: HTMLElement | null | undefined =
          document.getElementById(
            `${col.slice(0, 1)}${Number(col.slice(1, 3)) - 1 < 10 ? "0" + (Number(col.slice(1, 3)) - 1).toString() : (Number(col.slice(1, 3)) - 1).toString()}`,
          );
        // 왼쪽 좌석 코드 (없으면 undefined)
        let leftSeat: string | null | undefined = document.getElementById(
          `${col.slice(0, 1)}${Number(col.slice(1, 3)) - 1 < 10 ? "0" + (Number(col.slice(1, 3)) - 1).toString() : (Number(col.slice(1, 3)) - 1).toString()}`,
        )?.textContent;

        // 오른쪽 좌석 (없으면 undefined)
        let rightSeatEl: HTMLElement | null | undefined =
          document.getElementById(
            `${col.slice(0, 1)}${Number(col.slice(1, 3)) + 1 < 10 ? "0" + (Number(col.slice(1, 3)) + 1).toString() : (Number(col.slice(1, 3)) + 1).toString()}`,
          );
        // 오른쪽 좌석 코드 (없으면 undefined)
        let rightSeat: string | null | undefined = document.getElementById(
          `${col.slice(0, 1)}${Number(col.slice(1, 3)) + 1 < 10 ? "0" + (Number(col.slice(1, 3)) + 1).toString() : (Number(col.slice(1, 3)) + 1).toString()}`,
        )?.textContent;

        /** EP 선택 시 */
        if (ep.includes(Number(col.slice(1, 3)) - 1)) {
          /** ---- 좌측 좌석이 선택좌석 혹은 이미 예약된 좌석일 경우 */
          if ((leftSeat && seat.includes(leftSeat)) || leftSeat === "") {
            // console.log("left seat is already booked. so, select 1 seat");
            if (currSeatEl !== null)
              currSeatEl.style.backgroundColor = "transparent";
          } else {
            /** ---- 그렇지 않은 경우 */
            // console.log("select 2 seats with left seat");
            if (currSeatEl !== null)
              currSeatEl.style.backgroundColor = "transparent";
            if (leftSeatEl) leftSeatEl.style.backgroundColor = "transparent";
          }
        } else {
          /**  -- 기본 케이스 */
          /** ---- 우측 좌석이 선택좌석 혹은 이미 예약된 좌석일 경우 */
          if ((rightSeat && seat.includes(rightSeat)) || rightSeat === "") {
            /** ---- 좌측 좌석도 선택좌석 혹은 이미 예약된 좌석일 경우 */
            if ((leftSeat && seat.includes(leftSeat)) || leftSeat === "") {
              //   console.log("left seat is already booked too. so, select 1 seat");
              if (currSeatEl) currSeatEl.style.backgroundColor = "transparent";
            } else {
              /** ---- 그렇지 않은 경우 */
              //   console.log("right seat is already booked. so, select left seat");
              if (currSeatEl !== null)
                currSeatEl.style.backgroundColor = "transparent";
              if (leftSeatEl) leftSeatEl.style.backgroundColor = "transparent";
            }
          } else {
            /** ---- 예외상황이 없는 경우 */
            // console.log("select 2 seats with right seat");
            if (currSeatEl !== null)
              currSeatEl.style.backgroundColor = "transparent";
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

    // headCnt 변경 시, 좌석 컴포넌트 스타일 초기화
    let normalSeatArr: NodeListOf<HTMLElement> =
      document.querySelectorAll(".seat");

    for (let i = 0; i < normalSeatArr.length; i++) {
      if (normalSeatArr[i]) {
        normalSeatArr[i].style.backgroundColor = "";
      }
    }
  }, [headCnt]);

  return (
    <div className="absolute top-0 flex h-fit min-h-full w-fit min-w-full flex-col items-center justify-start rounded-xl p-10 pb-32">
      {seatStructure.map((row: string[], rowIdx: number) => {
        return (
          <div
            key={`seatRow_${rowIdx}`}
            className="mb-[6px] flex h-fit w-fit flex-row items-center justify-center"
          >
            {row.map((col: string, colIdx: number) => {
              if (headCnt === 0) {
                return (
                  <div
                    onClick={() => handleClickSeat(col)}
                    // onMouseEnter={() => handleMouseEnterSeat(col)}
                    // onMouseLeave={() => handleMouseLeaveSeat(col)}
                    id={col}
                    key={`seat_${col}`}
                    className={
                      sp.includes(colIdx)
                        ? `seat mx-[3px] ml-10 flex aspect-square w-7 cursor-pointer flex-col items-center justify-center rounded-md border border-fontColor/30 font-NMSNeo4 text-[9px] text-fontColor/30`
                        : ep.includes(colIdx)
                          ? `seat mx-[3px] mr-10 flex aspect-square w-7 cursor-pointer flex-col items-center justify-center rounded-md border border-fontColor/30 font-NMSNeo4 text-[9px] text-fontColor/30`
                          : `seat mx-[3px] flex aspect-square w-7 cursor-pointer flex-col items-center justify-center rounded-md border border-fontColor/30 font-NMSNeo4 text-[9px] text-fontColor/30`
                    }
                  >
                    {col}
                  </div>
                );
              } else if (seatState.includes(col)) {
                /* 선택불가(이미 예약된) 좌석 */
                return (
                  <div
                    id={col}
                    key={`seat_${col}`}
                    className={
                      sp.includes(colIdx)
                        ? `mx-[3px] ml-10 flex aspect-square w-7 flex-col items-center justify-center rounded-md border border-borderColor font-NMSNeo4 text-[9px] text-fontColor`
                        : ep.includes(colIdx)
                          ? `mx-[3px] mr-10 flex aspect-square w-7 flex-col items-center justify-center rounded-md border border-borderColor font-NMSNeo4 text-[9px] text-fontColor`
                          : `mx-[3px] flex aspect-square w-7 flex-col items-center justify-center rounded-md border border-borderColor font-NMSNeo4 text-[9px] text-fontColor`
                    }
                  >
                    {""}
                  </div>
                );
              } else if (seat.includes(col)) {
                /* 선택 좌석 */
                return (
                  <div
                    id={col}
                    onClick={() => handleClickSelectSeat(col)}
                    key={`seat_${col}`}
                    className={
                      sp.includes(colIdx)
                        ? `mx-[3px] ml-10 flex aspect-square w-7 cursor-pointer flex-col items-center justify-center rounded-md border border-fontColor/70 !bg-pointColor font-NMSNeo4 text-[9px] text-fontColor`
                        : ep.includes(colIdx)
                          ? `mx-[3px] mr-10 flex aspect-square w-7 cursor-pointer flex-col items-center justify-center rounded-md border border-fontColor/70 !bg-pointColor font-NMSNeo4 text-[9px] text-fontColor`
                          : `mx-[3px] flex aspect-square w-7 cursor-pointer flex-col items-center justify-center rounded-md border border-fontColor/70 !bg-pointColor font-NMSNeo4 text-[9px] text-fontColor`
                    }
                  >
                    {col}
                  </div>
                );
              } else {
                /* 예매가능 좌석 */
                return (
                  <div
                    onClick={() => handleClickSeat(col)}
                    onMouseEnter={
                      isMobile ? () => {} : () => handleMouseEnterSeat(col)
                    }
                    onMouseLeave={
                      isMobile ? () => {} : () => handleMouseLeaveSeat(col)
                    }
                    id={col}
                    key={`seat_${col}`}
                    className={
                      sp.includes(colIdx)
                        ? `seat mx-[3px] ml-10 flex aspect-square w-7 cursor-pointer flex-col items-center justify-center rounded-md border border-fontColor/70 font-NMSNeo4 text-[9px] text-fontColor`
                        : ep.includes(colIdx)
                          ? `seat mx-[3px] mr-10 flex aspect-square w-7 cursor-pointer flex-col items-center justify-center rounded-md border border-fontColor/70 font-NMSNeo4 text-[9px] text-fontColor`
                          : `seat mx-[3px] flex aspect-square w-7 cursor-pointer flex-col items-center justify-center rounded-md border border-fontColor/70 font-NMSNeo4 text-[9px] text-fontColor`
                    }
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

export default One;

// background-color: rgb(255 0 0 / 0.3);
