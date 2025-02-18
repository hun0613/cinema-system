'use client';
import { getFetchMovieQuery } from '@/actions/movies/useFetchMovieAction';
import PageContainerAtom from '@/atomics/layouts/PageContainerAtom';
import { mergeClassNames } from '@/utils/domUtil';
import { useSuspenseQueries } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

export type MovieOverviewCompProps = {
  movieId: number;
} & JSX.IntrinsicElements['div'];

const MovieOverviewComp: React.FC<MovieOverviewCompProps> = (props) => {
  const { movieId } = props;

  const [{ data: movie }] = useSuspenseQueries({
    queries: [getFetchMovieQuery(movieId)],
  });

  const [zoom, setZoom] = useState<boolean>(false); // 애니메이션 실행 트리거

  useEffect(() => {
    setZoom(true);
  }, []);

  return (
    <div className='relative flex h-fit w-full flex-col items-center justify-center bg-screenColor'>
      <div
        className={mergeClassNames(
          'relative flex aspect-video h-[calc(100vh)] flex-col items-center justify-start overflow-hidden bg-white/10',
          'tablet:h-[calc(100vh-200px)]',
        )}
      >
        {/* bg */}
        <Image
          alt='movie img'
          src={movie.background_img}
          width={0}
          height={0}
          priority
          quality={100}
          sizes='100vw'
          style={{ width: '100%', height: 'auto' }}
          className={mergeClassNames('scale-125', {
            'scale-105 opacity-100 transition-transform duration-[8000ms] ease-in-out': zoom,
          })}
        />
        {/* bg effect */}
        <div className='absolute h-full w-full bg-gradient-to-r from-screenColor'></div>
        <div className='absolute h-full w-full bg-gradient-to-l from-screenColor'></div>
      </div>

      {/* info area */}
      <PageContainerAtom className='absolute top-0 h-full p-5'>
        <div className='flex h-full flex-col items-center justify-center p-5'>
          <div className='mt-14 flex aspect-[3/4.3] h-1/2 flex-col items-center justify-center drop-shadow-xl'>
            <Image
              alt='movie img'
              src={movie.poster_img}
              width={0}
              height={0}
              sizes='100vw'
              style={{ width: '100%', height: '100%' }}
              className={mergeClassNames('translate-y-10 opacity-0', {
                'translate-y-0 opacity-100 transition-all duration-[1500ms] ease-in-out': zoom,
              })}
            />
          </div>
          {/* title */}
          <h1
            className={mergeClassNames(
              'content_animation mt-5 h-fit w-full translate-y-10 truncate text-center font-NMSNeo3 text-lg text-fontColor opacity-0',
              'tablet:text-xl',
              {
                'translate-y-0 opacity-100 transition-all duration-[2000ms] ease-in-out': zoom,
              },
            )}
          >
            {movie.title}
          </h1>
          {/* info */}
          <div
            className={mergeClassNames(
              'content_animation mt-1 flex h-fit w-full translate-y-10 flex-row items-center justify-center opacity-0',
              {
                'translate-y-0 opacity-100 transition-all duration-[2500ms] ease-in-out': zoom,
              },
            )}
          >
            {/* rate */}
            <div className='flex h-fit w-fit flex-row items-center justify-center py-1'>
              <FaHeart className='text-sm text-pointColor tablet:text-base' />
              <div className='ml-2 mt-[1px] flex h-fit w-fit flex-col items-center justify-center font-NMSNeo2 text-sm text-fontColor tablet:text-base'>
                {movie.rating}
              </div>
            </div>
            {/* reservation rate */}
            <div className='ml-3 flex h-fit w-fit flex-row items-center justify-center py-1 tablet:ml-3'>
              <div className='mt-[2px] h-fit w-fit font-NMSNeo3 text-sm text-fontColor tablet:text-base'>예매율</div>
              <div className='ml-2 mt-[2px] h-fit w-fit font-NMSNeo2 text-sm text-fontColor tablet:text-base'>
                {movie.reservation_rate}%
              </div>
            </div>
          </div>
        </div>
      </PageContainerAtom>
    </div>
  );
};

export default MovieOverviewComp;
