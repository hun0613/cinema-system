import Image from "next/image";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

const MovieInfoComp = () => {
  const [zoom, setZoom] = useState<boolean>(false);

  useEffect(() => {
    setZoom(true);
  }, []);

  return (
    <div className="relative flex h-fit w-full flex-col items-center justify-center bg-screenColor">
      <div className="relative flex aspect-video h-[calc(100vh-300px)] flex-col items-center justify-start overflow-hidden bg-white/10">
        {/* bg */}
        <Image
          alt="movie img"
          src={"/images/bg_서울의봄.jpeg"}
          width={0}
          height={0}
          priority
          quality={100}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className={
            zoom
              ? `scale-105 opacity-100 transition-transform duration-[8000ms] ease-in-out`
              : `scale-125`
          }
        />
        {/* bg effect */}
        <div className="absolute h-full w-full bg-gradient-to-r from-screenColor"></div>
        <div className="absolute h-full w-full bg-gradient-to-l from-screenColor"></div>
      </div>

      {/* info area */}
      <div className="absolute top-0 flex h-full w-full max-w-[1100px] flex-col items-center justify-center p-5">
        {/* poster */}
        <div className="mt-14 flex aspect-[3/4.3] h-3/5 flex-col items-center justify-center drop-shadow-xl ">
          <Image
            alt="movie img"
            src={"/images/pt_서울의봄.webp"}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "100%" }}
            className={
              zoom
                ? `translate-y-0 opacity-100 transition-all duration-[1500ms] ease-in-out`
                : `translate-y-10 opacity-0`
            }
          />
        </div>
        {/* title */}
        <h1 className="mt-5 h-fit w-full truncate text-center font-NMSNeo3 text-lg text-fontColor tablet:text-xl">
          서울의 봄
        </h1>
        {/* info */}
        <div className="mt-1 flex h-fit w-full flex-row items-center justify-center">
          {/* rate */}
          <div className="flex h-fit w-fit flex-row items-center justify-center py-1">
            <FaHeart className="text-sm text-pointColor tablet:text-base" />
            <div className="ml-2 mt-[1px] flex h-fit w-fit flex-col items-center justify-center font-NMSNeo2 text-sm tablet:text-base">
              3.4
            </div>
          </div>
          {/* reservation rate */}
          <div className="ml-3 flex h-fit w-fit flex-row items-center justify-center py-1 tablet:ml-3">
            <div className="mt-[2px] h-fit w-fit font-NMSNeo3 text-sm tablet:text-base">
              예매율
            </div>
            <div className="ml-2 mt-[2px] h-fit w-fit font-NMSNeo2 text-sm tablet:text-base">
              12.3%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoComp;
