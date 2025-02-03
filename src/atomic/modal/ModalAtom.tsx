import { useEffect, useState } from "react";

export type ModalAtomProps = {
  onCloseModal: () => void;
} & JSX.IntrinsicElements["div"];

const ModalAtom: React.FC<ModalAtomProps> = (props) => {
  const { children, onCloseModal } = props;
  const [renderState, setRenderState] = useState<boolean>(false);

  const handleClickBg = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onCloseModal();
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
      className="fixed left-0 right-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center overflow-hidden bg-bgColor/70"
    >
      <div
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        className={
          renderState
            ? `flex h-fit w-[90%] max-w-[900px] translate-y-0 flex-col items-center justify-center rounded-xl bg-white/90 opacity-100 drop-shadow-xl duration-500 ease-in-out tablet:w-[90%]`
            : `flex h-fit w-[90%] max-w-[900px] translate-y-10 flex-col items-center justify-center rounded-xl bg-white/90 opacity-0 drop-shadow-xl tablet:w-[90%]`
        }
      >
        {children}
      </div>
    </div>
  );
};

export default ModalAtom;
