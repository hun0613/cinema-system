import PageContainerAtom from '@/atomics/layouts/PageContainerAtom';
import FullScreenSkeletonAtom from '@/atomics/loaders/FullScreenSkeletonAtom';
import Footer from '@/components/mains/Footer';
import MoviesComp from '@/components/movies/MoviesComp';
import MoviesSliderComp from '@/components/movies/MoviesSliderComp';
import { Metadata } from 'next';
import { Suspense } from 'react';

type Props = {
  params: Promise<{ id: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: '영화예매 시스템',
    description:
      '현재 상영장, 상영종료작, 개봉예정작 별로 영화 정보를 확인할 수 있고, 극장 선택부터 날짜 및 시간, 상영관 선택, 그리고 좌석선택 까지의 프로세스를 경험할 수 있는 영화예매 시스템입니다.',
    icons: {
      icon: [
        {
          url: '/images/movie.png',
          href: '/images/movie.png',
        },
      ],
    },
    openGraph: {
      title: '영화예매 시스템',
      description:
        '현재 상영장, 상영종료작, 개봉예정작 별로 영화 정보를 확인할 수 있고, 극장 선택부터 날짜 및 시간, 상영관 선택, 그리고 좌석선택 까지의 프로세스를 경험할 수 있는 영화예매 시스템입니다.',
      url: 'https://cinema-project.com',
      siteName: 'Cinema-system',
      images: [
        {
          url: '/images/cinemaImg.png',
          width: 1920,
          height: 1080,
        },
      ],
    },
  };
}

export default async function Home() {
  return (
    <PageContainerAtom full className='bg-bgColor'>
      <Suspense fallback={<FullScreenSkeletonAtom />}>
        <MoviesSliderComp />
      </Suspense>
      <PageContainerAtom>
        <MoviesComp />
        <Footer />
      </PageContainerAtom>
    </PageContainerAtom>
  );
}
