import { useState } from "react";
import Navigation from "./Navigation";

const BodyArea = () => {
  const [theater, setTeather] = useState<number>(0); // 극장
  const [date, setDate] = useState<string>(""); // 날짜
  const [time, setTime] = useState<string>(""); // 시간
  const [room, setRoom] = useState<string>(""); // 상영관
  const [headCnt, setHeadCnt] = useState<number>(0); // 인원수
  const [seat, setSeat] = useState<string>(""); // 좌석
  const [navState, setNavState] = useState<number>(1); // navigation 상태

  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <Navigation
        navState={navState}
        setNavState={setNavState}
        theater={theater}
        date={date}
        time={time}
        room={room}
        headCnt={headCnt}
        seat={seat}
      />
    </div>
  );
};

export default BodyArea;
