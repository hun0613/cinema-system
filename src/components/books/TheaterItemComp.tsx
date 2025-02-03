import { TheaterType } from "@/actions/theaters/useFetchTheatersAction";
import { mergeClassNames } from "@/utils/domUtil";
import { useEffect, useRef } from "react";
import { TheaterOptionType } from "./TheaterComp";

export type TheaterItemCompProps = {
  theater: TheaterType;
  theaterOption: TheaterOptionType;
  setLatitude: React.Dispatch<React.SetStateAction<number>>; // 위도상태변경함수
  setLongitude: React.Dispatch<React.SetStateAction<number>>; // 경도상태변경함수
};

const TheaterItemComp: React.FC<TheaterItemCompProps> = (props) => {
  const { setLatitude, setLongitude, theater, theaterOption } = props;
  const { theater_id, name, position, latitude, longitude } = theater;
  const { currentTheaterId, onChangeTheater } = theaterOption;

  // scroll focus 설정용 Ref
  const theaterRef = useRef<HTMLDivElement>(null);

  const handleClickItem = () => {
    onChangeTheater(theater_id);
    setLatitude(Number(latitude));
    setLongitude(Number(longitude));
  };

  useEffect(() => {
    // 첫 랜더링 시 선택한 극장을 스크롤 중심으로 이동
    if (currentTheaterId === theater_id) {
      theaterRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  return (
    <div
      ref={theaterRef}
      onClick={handleClickItem}
      className={mergeClassNames(
        "mb-0 mr-3 flex h-fit w-fit cursor-pointer flex-col items-start justify-center whitespace-nowrap rounded-xl border border-borderColor p-5",
        "hover:bg-borderColor/30",
        "tablet:mb-5 tablet:mr-0 tablet:w-full tablet:whitespace-normal",
        {
          "border-0 bg-pointColor/70 hover:bg-pointColor/70": currentTheaterId === theater_id,
        },
      )}
    >
      <div className="h-fit w-fit font-NMSNeo3 text-xs text-fontColor mobile:text-sm">{name}</div>
      <div className="mt-3  h-fit w-fit font-NMSNeo1 text-[10px] text-fontColor mobile:text-xs">{position}</div>
    </div>
  );
};

export default TheaterItemComp;
