import { useEffect, useState } from "react";

const Modal = ({
  children,
  setModalControlState,
  extraFuction,
}: {
  children: React.ReactNode;
  setModalControlState: React.Dispatch<React.SetStateAction<boolean>>;
  extraFuction?: () => void;
}) => {
  const [renderState, setRenderState] = useState<boolean>(false);

  const handleClickBg = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setModalControlState(false);

    if (extraFuction) {
      extraFuction();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setRenderState(true);
    }, 100);

    return () => {
      setRenderState(false);
    };
  }, []);

  return (
    <div
      onMouseDown={handleClickBg}
      className=" fixed top-0 z-50 flex h-full w-full flex-col items-center justify-center overflow-hidden bg-bgColor/70"
    >
      <div
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) =>
          e.stopPropagation()
        }
        className={
          renderState
            ? `flex h-fit w-[90%] max-w-[800px] translate-y-0 flex-col items-center justify-center rounded-xl bg-white/90 p-5 opacity-100 drop-shadow-xl duration-500 ease-in-out tablet:w-[90%] tablet:p-10`
            : `flex h-fit w-[90%] max-w-[800px] translate-y-10 flex-col items-center justify-center rounded-xl bg-white/90 p-5 opacity-0 drop-shadow-xl tablet:w-[90%] tablet:p-10`
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
