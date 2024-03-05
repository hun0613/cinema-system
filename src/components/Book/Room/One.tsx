import { useEffect, useState } from "react";

interface Props {
  headCnt: number; // 관람인원
  setHeadCnt: React.Dispatch<React.SetStateAction<number>>;
  seat: string[]; // 선택좌석
  setSeat: React.Dispatch<React.SetStateAction<string[]>>;
  seatState: string[]; // 좌석 현황
  setSeatState: React.Dispatch<React.SetStateAction<string[]>>;
}

const One = ({
  headCnt,
  setHeadCnt,
  seat,
  setSeat,
  seatState,
  setSeatState,
}: Props) => {
  // 상영관 행 정보
  const Row: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
  // 상영관 열 정보
  const Col: string[] = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
  ];
  // 좌석간 간격 시작지점 (배열 인덱스 기준 (0 ~))
  const Sp: number[] = [3, 12];
  // 좌석간 간격 종료지점 (배열 인덱스 기준 (0 ~))
  const Ep: number[] = [2, 11];

  // 상영관 구조 상태
  const [seatStructure, setSeatStructure] = useState<string[][]>([[]]);

  const handleClickSeat = (col: string) => {
    setSeat([col]);
  };

  useEffect(() => {
    // 상영관 구조 생성 알고리즘
    let seatArr = [];

    for (let i = 0; i < Row.length; i++) {
      let RowData = [];
      for (let j = 0; j < Col.length; j++) {
        RowData.push(Row[i] + Col[j]);
      }
      seatArr.push(RowData);
    }

    setSeatStructure(seatArr);
  }, []);

  console.log(seatStructure);

  return (
    <div className="absolute top-0 flex h-fit min-h-full w-fit min-w-full flex-col items-center justify-start rounded-xl p-10 pb-32">
      {seatStructure.map((row: string[], rowIdx: number) => {
        return (
          <div
            key={`seatRow_${rowIdx}`}
            className="mb-[6px] flex h-fit w-fit flex-row items-center justify-center"
          >
            {row.map((col: string, colIdx: number) => {
              /* 선택불가(이미 예약된) 좌석 */
              if (seatState.includes(col)) {
                return (
                  <div
                    id={col}
                    key={`seat_${col}`}
                    className={
                      Sp.includes(colIdx)
                        ? `mx-[3px] ml-10 flex aspect-square w-7 flex-col items-center justify-center rounded-md border border-borderColor font-NMSNeo4 text-[9px] text-fontColor`
                        : Ep.includes(colIdx)
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
                    key={`seat_${col}`}
                    className={
                      Sp.includes(colIdx)
                        ? `mx-[3px] ml-10 flex aspect-square w-7 flex-col items-center justify-center rounded-md border border-fontColor/70 bg-pointColor font-NMSNeo4 text-[9px] text-fontColor`
                        : Ep.includes(colIdx)
                          ? `mx-[3px] mr-10 flex aspect-square w-7 flex-col items-center justify-center rounded-md border border-fontColor/70 bg-pointColor font-NMSNeo4 text-[9px] text-fontColor`
                          : `mx-[3px] flex aspect-square w-7 flex-col items-center justify-center rounded-md border border-fontColor/70 bg-pointColor font-NMSNeo4 text-[9px] text-fontColor`
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
                    id={col}
                    key={`seat_${col}`}
                    className={
                      Sp.includes(colIdx)
                        ? `mx-[3px] ml-10 flex aspect-square w-7 cursor-pointer flex-col items-center justify-center rounded-md border border-fontColor/70 font-NMSNeo4 text-[9px] text-fontColor hover:bg-pointColor/30`
                        : Ep.includes(colIdx)
                          ? `mx-[3px] mr-10 flex aspect-square w-7 cursor-pointer flex-col items-center justify-center rounded-md border border-fontColor/70 font-NMSNeo4 text-[9px] text-fontColor hover:bg-pointColor/30`
                          : `mx-[3px] flex aspect-square w-7 cursor-pointer flex-col items-center justify-center rounded-md border border-fontColor/70 font-NMSNeo4 text-[9px] text-fontColor hover:bg-pointColor/30`
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
