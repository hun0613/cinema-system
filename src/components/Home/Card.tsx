import Image from "next/image";

const Card = () => {
  return (
    <div className="flex h-fit w-full flex-col items-center justify-center">
      {/* poster */}
      <div className="aspect-[3/4] w-[95%] tablet:w-full ">
        <Image
          alt="movie img"
          src={"/images/pt_서울의봄.webp"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      {/* title */}
      <div className="mt-3 flex h-fit w-full flex-row items-center justify-center font-NMSNeo3 text-sm text-fontColor tablet:text-base">
        서울의 봄
      </div>
      {/* info */}
      <div className="flex h-fit w-full flex-row items-center justify-between">
        hello
      </div>
    </div>
  );
};

export default Card;
3;
