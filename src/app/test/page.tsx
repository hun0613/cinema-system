"use client";

import { useReservationStore } from "@/store/store";

const Test = () => {
  const { theater, setTeather } = useReservationStore();

  console.log(theater);

  const handleClickBtn = () => {
    setTeather("안녕하세요");
  };
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black">
      <div className="flex h-fit w-fit flex-col items-center justify-center text-white">
        {theater}
      </div>
      <button
        type="button"
        onClick={handleClickBtn}
        className="flex h-fit w-fit flex-col items-center justify-center rounded-xl bg-slate-100/30 p-5"
      >
        상태변경
      </button>
    </div>
  );
};

export default Test;
