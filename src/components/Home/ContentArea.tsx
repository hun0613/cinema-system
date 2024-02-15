"use client";
import useWindowSize from "@/hooks/useWindowSize";
import { useState } from "react";
import Card from "./Card";
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
      <div className="grid h-fit min-h-[300px] w-full grid-cols-2 gap-5 border-b border-borderColor/40 px-5 py-10 font-NMSNeo2 text-fontColor tablet:grid-cols-4 tablet:gap-10 desktop:px-0">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default ContentArea;
