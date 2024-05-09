"use client";
import { useAuthStore } from "@/store/store";
import Link from "next/link";
import { GoUnlock } from "react-icons/go";

const Header = () => {
  const { setModalState } = useAuthStore();

  const handleClickLogin = () => {
    setModalState(true); // 모달 켜기
  };

  return (
    <header className="fixed top-0 z-50 flex h-16 w-full flex-col items-center justify-center bg-gradient-to-b from-bgColor text-white ">
      <div className="relative flex h-full w-full max-w-[1100px] flex-row items-center justify-center border-b border-white/40 px-10">
        {/* logo */}
        <div className="flex h-fit w-fit flex-col items-center justify-center font-NMSNeo3 text-base text-white drop-shadow-xl">
          <Link href={`/`}>영화예매시스템</Link>
        </div>
        {/* login option */}
        <div
          onClick={handleClickLogin}
          className="absolute right-10 flex h-fit w-fit cursor-pointer flex-col items-center justify-center"
        >
          <GoUnlock className="text-xl" />
          <div className="mt-1 h-fit w-fit text-center font-NMSNeo2 text-[10px] text-white">
            로그인
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
