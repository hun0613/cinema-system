"use client";
import { useState } from "react";
import Navigation from "./Navigation";

const ContentArea = () => {
  const [navState, setNavState] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <Navigation
        navValue={navState}
        setNavValue={setNavState}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    </div>
  );
};

export default ContentArea;
