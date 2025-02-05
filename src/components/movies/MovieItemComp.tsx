import { MovieType } from '@/actions/movies/useFetchMovieAction';
import ButtonAtom, { BUTTON_COLOR, SIZE } from '@/atomics/buttons/ButtonAtom';
import { MOVIE_CLASSIFICATION } from '@/enums/movies/movieEnum';
import { mergeClassNames } from '@/utils/domUtil';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { FaHeart } from 'react-icons/fa';
import MovieDetailModalComp from './MovieDetailModalComp';

interface Data {
  data: MovieType; // 컨텐츠 데이터
}

const MovieItemComp = ({ data }: Data) => {
  const router = useRouter();

  const [isHover, setIsHover] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  // 날짜 차이 계산 함수
  const diffDate = (date: string) => {
    let currDate = new Date();
    let dataDate = new Date(date);

    let diff = currDate.getTime() - dataDate.getTime();

    return Math.ceil(Math.abs(diff / (1000 * 60 * 60 * 24)));
  };

  const handleClickDetailBtn = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickBook = () => {
    router.push(`/book/${data.id}`);
  };

  const handleMouseOverMovieItem = () => {
    setIsHover(true);
  };

  const handleMouseLeaveMovieItem = () => {
    setIsHover(false);
  };

  return (
    <>
      {openModal && <MovieDetailModalComp onCloseModal={handleCloseModal} data={data} />}
      <div className='relative flex h-fit w-full flex-col items-center justify-center'>
        {/* poster */}
        <div className='aspect-[3/4.3] w-full overflow-hidden'>
          <Image
            onClick={isMobile ? handleClickDetailBtn : undefined}
            alt='movie img'
            src={data.poster_img}
            width={0}
            height={0}
            sizes='100%'
            style={{ width: '100%', height: '100%' }}
            className={mergeClassNames('relative aspect-[3/4.3] w-[95%] scale-100 bg-white/50 duration-500 ease-in-out', 'tablet:w-full', {
              'scale-105': isHover,
            })}
          />
        </div>
        {!isMobile && (
          <div
            onMouseOver={handleMouseOverMovieItem}
            onMouseLeave={handleMouseLeaveMovieItem}
            className={mergeClassNames(
              'absolute top-0 flex aspect-[3/4.3] w-full flex-col items-center justify-center gap-3 bg-black/50 px-5 opacity-0',
              'hover:opacity-100',
            )}
          >
            <ButtonAtom full size={SIZE.SMALL} color={BUTTON_COLOR.GRAY} onClick={handleClickDetailBtn}>
              상세보기
            </ButtonAtom>
            <ButtonAtom
              full
              size={SIZE.SMALL}
              onClick={handleClickBook}
              className={mergeClassNames('hidden', {
                'block': data.classification === MOVIE_CLASSIFICATION.IN_PROGRESS,
              })}
            >
              예매하기
            </ButtonAtom>
          </div>
        )}

        {/* title */}
        <p className='mt-3 h-fit w-full truncate text-center font-NMSNeo3 text-sm text-fontColor tablet:text-base'>{data.title}</p>
        {/* info */}
        <div className='flex h-fit w-full flex-row items-center justify-center'>
          {/* rate */}
          <div className='flex h-fit w-fit flex-row items-center justify-center py-1'>
            <FaHeart className='text-xs text-pointColor tablet:text-sm' />
            <div className='ml-2 mt-[2px] flex h-fit w-fit flex-col items-center justify-center font-NMSNeo2 text-xs tablet:text-sm'>
              {data.rating}
            </div>
          </div>
          {/* reservation rate */}
          {data.classification === MOVIE_CLASSIFICATION.IN_PROGRESS ? (
            <div className='ml-3 flex h-fit w-fit flex-row items-center justify-center py-1 tablet:ml-3'>
              <div className='mt-[2px] h-fit w-fit font-NMSNeo3 text-xs tablet:text-sm'>예매율</div>
              <div className='ml-2 mt-[2px] h-fit w-fit font-NMSNeo2 text-xs tablet:text-sm'>{data.reservation_rate}%</div>
            </div>
          ) : data.classification === MOVIE_CLASSIFICATION.END ? (
            <div className='ml-3 flex h-fit w-fit flex-row items-center justify-center py-1 tablet:ml-3'>
              <div className='mt-[2px] h-fit w-fit font-NMSNeo3 text-xs text-pointColor/80 tablet:text-sm'>상영종료</div>
            </div>
          ) : data.classification === MOVIE_CLASSIFICATION.EXPECT ? (
            <div className='ml-3 flex h-fit w-fit flex-row items-center justify-center py-1 tablet:ml-3'>
              <div className='mt-[2px] h-fit w-fit font-NMSNeo4 text-xs text-pointColor/80 tablet:text-sm'>
                D-{diffDate(data.release_date)}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default MovieItemComp;
