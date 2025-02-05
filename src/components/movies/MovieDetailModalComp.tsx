import { MovieType } from '@/actions/movies/useFetchMovieAction';
import ButtonAtom, { BUTTON_COLOR, SIZE } from '@/atomics/buttons/ButtonAtom';
import { MOVIE_CLASSIFICATION } from '@/enums/movies/movieEnum';
import { mergeClassNames } from '@/utils/domUtil';
import { useRouter } from 'next/navigation';
import ModalAtom from '../../atomics/modals/ModalAtom';

export type MovieDetailModalCompProps = {
  onCloseModal: () => void;
  data: MovieType;
};

const MovieDetailModalComp: React.FC<MovieDetailModalCompProps> = (props) => {
  const router = useRouter();

  const { onCloseModal, data } = props;

  const handleClickBook = () => {
    router.push(`/book/${data.id}`);
  };

  return (
    <ModalAtom onCloseModal={onCloseModal}>
      <div className={mergeClassNames('flex h-fit w-full flex-col items-start justify-start p-5', 'tablet:p-10')}>
        {/* title */}
        <h1 className={mergeClassNames('h-fit w-fit p-2 text-left font-NMSNeo3 text-lg text-borderColor', 'tablet:text-xl')}>
          {data.title}
        </h1>
        <h1 className={mergeClassNames('h-fit w-full p-2 text-left font-NMSNeo3 text-base text-borderColor', 'tablet:text-lg')}>줄거리</h1>
        {/* 줄거리 */}
        <p className={mergeClassNames('h-fit w-full p-2 text-left font-NMSNeo2 text-sm text-borderColor', 'mobile:text-base')}>
          {data.summary}
        </p>
        <div className={mergeClassNames('mb-3 mt-5 flex h-fit w-full flex-col items-center justify-center gap-3', 'mobile:flex-row')}>
          {/* 현재상영작이 아닌 경우 예매하기 버튼 랜더링 X */}
          <ButtonAtom
            size={SIZE.SMALL}
            onClick={handleClickBook}
            className={mergeClassNames('hidden w-1/2', 'tablet:w-1/3', {
              'block': data.classification === MOVIE_CLASSIFICATION.IN_PROGRESS,
            })}
          >
            예매하기
          </ButtonAtom>
          <ButtonAtom
            size={SIZE.SMALL}
            color={BUTTON_COLOR.GRAY}
            onClick={onCloseModal}
            className={mergeClassNames('w-1/2', 'tablet:w-1/3')}
          >
            닫기
          </ButtonAtom>
        </div>
      </div>
    </ModalAtom>
  );
};

export default MovieDetailModalComp;
