"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Screen = () => {
  const [zoom, setZoom] = useState<boolean>(false);
  useEffect(() => {
    setZoom(true);
  }, []);

  return (
    <div className="relative flex h-fit w-full flex-col items-center justify-center bg-black/60">
      <div className="relative flex aspect-video h-[calc(100vh-100px)] flex-col items-center justify-center overflow-hidden bg-white/10">
        {/* bg */}
        <Image
          alt="movie img"
          src={"/images/bg_서울의봄.jpeg"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className={
            zoom
              ? `scale-100 transition-all duration-[4000ms] ease-in-out`
              : `scale-125 transition-all duration-[4000ms] ease-in-out`
          }
        />
        {/* bg effect */}
        <div className="absolute h-full w-full bg-gradient-to-r from-black/70"></div>
        <div className="absolute h-full w-full bg-gradient-to-l from-black/70"></div>
      </div>

      {/* info area */}
      <div className="absolute top-0 flex h-full w-full max-w-[1100px] flex-col-reverse items-center justify-end p-5 target:p-10 tablet:flex-row tablet:justify-between">
        {/* summary */}
        <div className="mt-8 flex h-fit w-full flex-col items-center justify-center font-NMSNeo2 text-sm leading-snug text-fontColor tablet:mt-0 tablet:w-[55%] tablet:items-end">
          {/* title */}
          <h1 className="justify-ceneter font-NMSNeo flex h-fit w-fit flex-col items-center text-2xl tablet:text-3xl">
            서울의 봄
          </h1>
          {/* content */}
          <p className="mt-5 flex h-fit w-fit flex-col items-center justify-center text-center font-NMSNeo2 text-xs leading-normal target:mt-10 tablet:text-right tablet:text-sm">
            1979년 12월 12일, 수도 서울 군사반란 발생 그날, 대한민국의 운명이
            바뀌었다 대한민국을 뒤흔든 10월 26일 이후, 서울에 새로운 바람이
            불어온 것도 잠시 12월 12일, 보안사령관 전두광이 반란을 일으키고 군
            내 사조직을 총동원하여 최전선의 전방부대까지 서울로 불러들인다.
            권력에 눈이 먼 전두광의 반란군과 이에 맞선 수도경비사령관 이태신을
            비롯한 진압군 사이, 일촉즉발의 9시간이 흘러가는데… 목숨을 건 두
            세력의 팽팽한 대립 오늘 밤, 대한민국 수도에서 가장 치열한 전쟁이
            펼쳐진다!
          </p>
        </div>
        {/* poster */}
        <div className="ml-0 mt-16 flex aspect-[3/4] w-[55%] flex-col items-center justify-center drop-shadow-xl tablet:ml-5 tablet:mt-0 tablet:w-2/5">
          <Image
            alt="movie img"
            src={"/images/pt_서울의봄.webp"}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            //   className={
            //     zoom
            //       ? `scale-100 transition-all duration-[4000ms] ease-in-out`
            //       : `scale-125 transition-all duration-[4000ms] ease-in-out`
            //   }
          />
        </div>
      </div>
    </div>
  );
};

export default Screen;
