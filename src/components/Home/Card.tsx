import { movieType } from "@/data/movieData";
import Image from "next/image";
import { isMobile } from "react-device-detect";
import { FaHeart } from "react-icons/fa";

interface Data {
  data: movieType;
  hoverCardId: number;
  setHoverCardId: React.Dispatch<React.SetStateAction<number>>;
}

const Card = ({ data, hoverCardId, setHoverCardId }: Data) => {
  // 날짜 차이 계산 함수
  const diffDate = (date: string) => {
    let currDate = new Date();
    let dataDate = new Date(date);

    let diff = currDate.getTime() - dataDate.getTime();

    return Math.ceil(Math.abs(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="relative flex h-fit w-full flex-col items-center justify-center">
      {/* poster */}
      <div className="aspect-[3/4.3] w-full overflow-hidden">
        <Image
          onMouseEnter={() => (!isMobile ? setHoverCardId(data.id) : null)}
          alt="movie img"
          src={data.poster_img}
          width={0}
          height={0}
          sizes="100%"
          style={{ width: "100%", height: "100%" }}
          className={
            hoverCardId === data.id
              ? `relative aspect-[3/4.3] w-[95%] scale-105 bg-white/50 duration-500 ease-in-out tablet:w-full`
              : `relative aspect-[3/4.3] w-[95%] scale-100 bg-white/50 duration-500 ease-in-out tablet:w-full`
          }
        />
      </div>
      {/* hover component */}
      {!isMobile && hoverCardId === data.id ? (
        <div
          onMouseLeave={() => setHoverCardId(0)}
          className="absolute top-0 flex aspect-[3/4.3] w-full flex-col items-center justify-center bg-black/50"
        >
          <button
            type="button"
            className="mb-3 flex h-fit w-2/3 flex-col items-center justify-center rounded-xl bg-fontColor p-3 font-NMSNeo3 text-sm text-bgColor hover:bg-fontColor/80 tablet:text-base"
          >
            상세보기
          </button>
          {data.classification !== 1 ? null : (
            <button
              type="button"
              className="flex h-fit w-2/3 flex-col items-center justify-center rounded-xl bg-pointColor p-3 font-NMSNeo3 text-sm hover:bg-pointColor/80 tablet:text-base"
            >
              예매하기
            </button>
          )}
        </div>
      ) : null}

      {/* title */}
      <p className="mt-3 h-fit w-full truncate text-center font-NMSNeo3 text-sm text-fontColor tablet:text-base">
        {data.title}
      </p>
      {/* info */}
      <div className="flex h-fit w-full flex-row items-center justify-center">
        {/* rate */}
        <div className="flex h-fit w-fit flex-row items-center justify-center py-1">
          <FaHeart className="text-xs text-pointColor tablet:text-sm" />
          <div className="ml-2 mt-[2px] flex h-fit w-fit flex-col items-center justify-center font-NMSNeo2 text-xs tablet:text-sm">
            {data.rating}
          </div>
        </div>
        {/* reservation rate */}
        {data.classification === 1 ? (
          <div className="ml-3 flex h-fit w-fit flex-row items-center justify-center py-1 tablet:ml-3">
            <div className="mt-[2px] h-fit w-fit font-NMSNeo3 text-xs tablet:text-sm">
              예매율
            </div>
            <div className="table:text-sm ml-2 mt-[2px] h-fit w-fit font-NMSNeo2 text-xs">
              {data.reservation_rate}%
            </div>
          </div>
        ) : data.classification === 2 ? (
          <div className="ml-3 flex h-fit w-fit flex-row items-center justify-center py-1 tablet:ml-3">
            <div className="mt-[2px] h-fit w-fit font-NMSNeo3 text-xs text-pointColor/80 tablet:text-sm">
              상영종료
            </div>
          </div>
        ) : data.classification === 3 ? (
          <div className="ml-3 flex h-fit w-fit flex-row items-center justify-center py-1 tablet:ml-3">
            <div className="mt-[2px] h-fit w-fit font-NMSNeo4 text-xs text-pointColor/80 tablet:text-sm">
              D-{diffDate(data.release_date)}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Card;
