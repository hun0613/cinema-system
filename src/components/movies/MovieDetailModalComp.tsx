import { MovieType } from "@/actions/movies/useFetchMovieAction";
import { MOVIE_CLASSIFICATION } from "@/enums/movies/movieEnum";
import { mergeClassNames } from "@/utils/domUtil";
import Link from "next/link";
import ModalAtom from "../../atomics/modal/ModalAtom";

interface Props {
  onCloseModal: () => void;
  data: MovieType;
}

const MovieDetailModalComp = ({ onCloseModal, data }: Props) => {
  return (
    <ModalAtom onCloseModal={onCloseModal}>
      <div className={mergeClassNames("flex h-fit w-full flex-col items-start justify-start p-5", "tablet:p-10")}>
        {/* title */}
        <h1 className={mergeClassNames("h-fit w-fit p-2 text-left font-NMSNeo3 text-lg text-borderColor", "tablet:text-xl")}>
          {data.title}
        </h1>
        <h1 className={mergeClassNames("h-fit w-full p-2 text-left font-NMSNeo3 text-base text-borderColor", "tablet:text-lg")}>줄거리</h1>
        {/* 줄거리 */}
        <p className={mergeClassNames("h-fit w-full p-2 text-left font-NMSNeo2 text-sm text-borderColor", "mobile:text-base")}>
          {data.summary}
        </p>
        <div className={mergeClassNames("mb-3 mt-5 flex h-fit w-full flex-col items-center justify-center", "mobile:flex-row")}>
          {/* 현재상영작이 아닌 경우 예매하기 버튼 랜더링 X */}
          {data.classification === MOVIE_CLASSIFICATION.IN_PROGRESS && (
            <button
              className={mergeClassNames(
                "mr-0 flex h-fit w-1/2 flex-col items-center justify-center rounded-xl bg-pointColor font-NMSNeo3 text-sm text-white",
                "hover:bg-pointColor/80",
                "mobile:mr-5 mobile:w-1/3 mobile:text-base tablet:w-1/3",
              )}
            >
              <Link className="h-full w-full rounded-xl p-3" href={`/book/${data.id}`}>
                예매하기
              </Link>
            </button>
          )}

          <button
            onClick={onCloseModal}
            className={mergeClassNames(
              "mt-3 h-fit w-1/2  rounded-xl bg-borderColor/15 p-3 font-NMSNeo3 text-sm text-borderColor",
              "hover:bg-borderColor/10",
              "mobile:mt-0 mobile:w-1/3 mobile:text-base tablet:w-1/3",
            )}
          >
            닫기
          </button>
        </div>
      </div>
    </ModalAtom>
  );
};

export default MovieDetailModalComp;
