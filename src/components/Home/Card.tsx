import { movieType } from "@/data/movieData";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";

interface Data {
  data: movieType;
}

const Card = ({ data }: Data) => {
  return (
    <div className="flex h-fit w-full flex-col items-center justify-center">
      {/* poster */}
      <Image
        alt="movie img"
        src={data.poster_img}
        width={0}
        height={0}
        sizes="100%"
        style={{ width: "100%", height: "100%" }}
        className="aspect-[3/4.3] w-[95%] bg-white/50 tablet:w-full"
      />
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
        <div className="ml-3 flex h-fit w-fit flex-row items-center justify-center py-1 tablet:ml-3">
          <div className="mt-[2px] h-fit w-fit font-NMSNeo3 text-xs tablet:text-sm">
            예매율
          </div>
          <div className="table:text-sm ml-2 mt-[2px] h-fit w-fit font-NMSNeo2 text-xs">
            {data.reservation_rate}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
