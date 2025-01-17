import { useReservationStore } from "@/store/store";
import { useEffect, useState } from "react";
import One from "./Room/One";

const SeatComp = () => {
  const countData: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  // 영화 예매 데이터 (전역상태)
  const { headCnt, setHeadCnt, seat, setSeat, roomId, theaterId } =
    useReservationStore();

  const [room, setRoom] = useState([]);

  const handleClickHeadCnt = (cnt: number) => {
    if (headCnt !== 0 && seat.length > 0) {
      if (
        window.confirm("선택된 좌석이 모두 초기화됩니다.\n변경하시겠습니까?")
      ) {
        setHeadCnt(cnt);
        setSeat([]);
      }
    } else {
      setHeadCnt(cnt);
    }
  };

  useEffect(() => {
    fetch(`/book/api/room?theater_id=${theaterId}&room_id=${roomId}`)
      .then((res) => res.json())
      .then((res2) => {
        setRoom(res2);
      });
  }, []);

  return (
    <div className="flex h-[calc(100vh/1.3)] w-full  flex-col items-center justify-start rounded-xl p-2 mobile:h-[calc(100vh/1.8)] mobile:p-5">
      {/* screen */}
      <div className="flex h-fit w-2/3 flex-col items-center justify-center rounded-lg bg-titleColor/50 p-2 font-NMSNeo3 text-xs text-fontColor/50 mobile:text-sm  tablet:text-base">
        Screen
      </div>
      {/* content */}
      <div className="relative mt-2 flex h-full w-full flex-col items-center justify-center rounded-xl tablet:mt-5">
        {/* 상영관 컨테이너 */}
        <div className="relative h-full w-full overflow-auto">
          {/* 상영관 컴포넌트*/}
          {!!room.length && <One room={room[0]} />}
        </div>
        {/* 인원선택 */}
        <div className="absolute bottom-0 flex h-fit w-fit flex-col items-center justify-center rounded-lg border border-borderColor bg-bgColor/80 px-3 py-5 mobile:px-5 tablet:w-fit">
          {/* title */}
          <div className="flex h-fit w-full flex-row items-end justify-start">
            <div className="h-fit w-fit font-NMSNeo3 text-sm text-fontColor tablet:text-base">
              인원선택
            </div>
            <div className="ml-2 h-fit w-fit font-NMSNeo2 text-xs text-fontColor mobile:mb-[1px] tablet:mb-[2px]">
              최대 8명까지 선택가능
            </div>
          </div>
          {/* select comp */}
          <div className="mt-5 flex h-fit w-full flex-row items-center justify-between">
            {/* select btn */}
            <div className="grid h-fit w-full grid-cols-8 gap-1 mobile:gap-3">
              {countData.map((cntDb: number) => {
                return (
                  <div
                    onClick={() => handleClickHeadCnt(cntDb)}
                    key={cntDb}
                    className={
                      headCnt === cntDb
                        ? `flex aspect-square w-7 cursor-pointer flex-col items-center justify-center rounded-md border border-borderColor bg-pointColor/70 font-NMSNeo3 text-xs text-fontColor mobile:w-8 tablet:text-sm`
                        : `flex aspect-square w-7 cursor-pointer flex-col items-center justify-center rounded-md border border-borderColor font-NMSNeo3 text-xs text-fontColor hover:bg-pointColor/30 mobile:w-8 tablet:text-sm`
                    }
                  >
                    {cntDb}
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
