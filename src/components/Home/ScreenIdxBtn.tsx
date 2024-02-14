import { movieType } from "@/data/movieData";

interface Props {
  data: movieType;
  idx: number;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
  setZoom: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScreenIdxBtn = ({ data, idx, setIdx, setZoom }: Props) => {
  const handleClickBtn = () => {
    setZoom(false);
    setIdx(data.id - 1);
  };

  return (
    <div
      onClick={data.id === idx + 1 ? () => {} : handleClickBtn}
      className={
        data.id === idx + 1
          ? `mx-2 aspect-square w-3 rounded-full border border-transparent bg-pointColor/60 drop-shadow-xl duration-500 ease-in-out`
          : `mx-2 aspect-square w-3 cursor-pointer rounded-full border border-white/60 drop-shadow-xl duration-500 ease-in-out hover:bg-white/20`
      }
    ></div>
  );
};

export default ScreenIdxBtn;
