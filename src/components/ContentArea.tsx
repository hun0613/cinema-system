"use client";
import useWindowSize from "@/hooks/useWindowSize";
import { useState } from "react";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";

const ContentArea = () => {
  const [navState, setNavState] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");

  let width: number = useWindowSize();

  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      {width === 0 || width > 764 ? (
        // Desktop 버전 Nav
        <Navigation
          navValue={navState}
          setNavValue={setNavState}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      ) : (
        // Mobile 버전 Nav
        <MobileNavigation
          navValue={navState}
          setNavValue={setNavState}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      )}
      {/* content */}
      {/* <div className="flex h-fit min-h-[100px] w-full flex-col items-center justify-start bg-slate-600 p-3">
        content
      </div> */}
    </div>
  );
};

export default ContentArea;
