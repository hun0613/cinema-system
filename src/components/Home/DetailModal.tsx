import { movieType } from "@/data/movieData";

interface Props {
  setModalControlState: React.Dispatch<React.SetStateAction<boolean>>;
  data: movieType;
}

const DetailModal = ({ setModalControlState, data }: Props) => {
  return (
    <div className="flex h-fit w-full flex-col items-start justify-start">
      <h1 className="h-fit w-fit p-2 text-left font-NMSNeo3 text-lg text-borderColor tablet:text-xl">
        {data.title}
      </h1>
      <h1 className="h-fit w-full p-2 text-left font-NMSNeo3 text-base text-borderColor tablet:text-lg">
        줄거리
      </h1>
      <p className="mobile:text-base h-fit w-full p-2 text-left font-NMSNeo2 text-sm text-borderColor">
        {data.summary}
      </p>
      <div className="mobile:flex-row mb-3 mt-5 flex h-fit w-full flex-col items-center justify-center">
        {data.classification !== 1 ? null : (
          <button className="mobile:w-1/3 mobile:mr-5 mobile:text-base  mr-0 h-fit w-1/2 rounded-xl bg-pointColor p-3 font-NMSNeo3 text-sm text-white hover:bg-pointColor/80 tablet:w-1/3">
            예매하기
          </button>
        )}

        <button
          onClick={() => setModalControlState(false)}
          className="mobile:w-1/3 mobile:text-base mobile:mt-0  mt-3 h-fit w-1/2 rounded-xl bg-borderColor/15 p-3 font-NMSNeo3 text-sm text-borderColor hover:bg-borderColor/10 tablet:w-1/3"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default DetailModal;
