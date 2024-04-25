import { useMovieStore, useReservationStore } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Ticket = () => {
  const router = useRouter();

  // 영화 서버데이터 (전역상태)
  const { db } = useMovieStore();

  // 영화 예매 데이터 (전역상태)
  const { theater, date, time, room, seat } = useReservationStore();

  const handleClickConfirm = () => {
    router.push(`/`);
  };

  const printingSeat = (seatEl: string[]) => {
    let result = "";

    for (let i = 0; i < seatEl.length; i++) {
      if (i === seatEl.length - 1) {
        result = result + seatEl[i];
      } else {
        result = result + seatEl[i] + ", ";
      }
    }

    return result;
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      {/* Ticket Title */}
      <div className="flex h-fit w-full flex-col items-center justify-center font-NMSNeo5 text-2xl text-borderColor/70 shadow-bgColor drop-shadow-md">
        Ticket
      </div>
      <div className="mt-1 flex h-fit w-full flex-col items-center justify-center font-NMSNeo3 text-sm text-borderColor/70 shadow-bgColor drop-shadow-md">
        예매가 완료되었습니다
      </div>
      {/* content Area */}
      <div className="my-10 flex h-fit w-full flex-col items-center justify-center tablet:flex-row">
        {/* poster */}
        <div className="mr-0 flex aspect-[3/4.3] h-[calc(100vh/3.5)] flex-col items-center justify-center rounded-sm bg-borderColor drop-shadow-lg tablet:mr-8">
          <Image
            alt="movie img"
            src={db?.poster_img ? db?.poster_img : "/images/bg_empty.jpeg"}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "100%" }}
            className=" rounded-sm"
          />
        </div>
        {/* ticket info */}
        <div className="flex h-full w-full flex-col items-center justify-start">
          {/* 1 row */}
          <div className="flex h-1/3 w-full flex-row items-center justify-start border-b border-borderColor/15 p-5">
            {/* movie title */}
            <div className="flex w-fit flex-col items-center justify-center">
              {/* movie info title */}
              <div className="h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/40">
                Movie
              </div>
              {/* movie title */}
              <div className="mt-2 h-fit w-full text-left font-NMSNeo3 text-2xl text-borderColor/70">
                {db?.title}
              </div>
            </div>
          </div>

          {/* 2row */}
          <div className="flex h-1/3 w-full flex-row items-start justify-between border-b border-borderColor/15 p-5">
            {/* theater */}
            <div className="flex w-fit flex-col items-center justify-center">
              {/* theater info title */}
              <div className="h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/40">
                Theater
              </div>
              {/* theater title */}
              <div className="mt-2 h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/70">
                {theater}
              </div>
            </div>

            {/* Date */}
            <div className="flex w-fit flex-col items-center justify-center">
              {/* Date info title */}
              <div className="h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/40">
                Date
              </div>
              {/* Date title */}
              <div className="mt-2 h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/70">
                {`${date.slice(4, 6)}/${date.slice(6, 8)}`}
              </div>
            </div>

            {/* Time */}
            <div className="flex w-fit flex-col items-center justify-center">
              {/* Time info title */}
              <div className="h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/40">
                Time
              </div>
              {/* Time title */}
              <div className="mt-2 h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/70">
                {time}
              </div>
            </div>
          </div>

          {/* 3row */}
          <div className="flex h-1/3 w-full flex-row items-start justify-start p-5">
            {/* Screen */}
            <div className="mr-20 flex w-fit flex-col items-center justify-center">
              {/* Screen info title */}
              <div className="h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/40">
                Screen
              </div>
              {/* Screen title */}
              <div className="mt-2 h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/70">
                {room}관
              </div>
            </div>

            {/* Seat */}
            <div className="flex w-fit flex-col items-center justify-center">
              {/* Seat info title */}
              <div className="h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/40">
                Seat
              </div>
              {/* Seat title */}
              <div className="mt-2 h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/70">
                {printingSeat(seat)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* confirm btn */}
      <button
        onClick={handleClickConfirm}
        type="button"
        className="mx-0 mb-3 flex h-fit  flex-col items-center justify-center rounded-xl bg-pointColor/80 p-3 px-10 font-NMSNeo3 text-sm text-fontColor hover:bg-pointColor/60 mobile:mx-3 mobile:mb-0 mobile:text-base"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default Ticket;
