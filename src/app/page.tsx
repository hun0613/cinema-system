import FullScreenSkeletonAtom from '@/atomics/loaders/FullScreenSkeletonAtom';
import Footer from '@/components/mains/Footer';
import MoviesComp from '@/components/movies/MoviesComp';
import MoviesSliderComp from '@/components/movies/MoviesSliderComp';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <div className='flex h-full min-h-screen flex-col items-center justify-start overflow-x-hidden bg-bgColor'>
      <Suspense fallback={<FullScreenSkeletonAtom />}>
        <MoviesSliderComp />
      </Suspense>
      <div className='w-full max-w-[1100px]'>
        <MoviesComp />
        <Footer />
      </div>
    </div>
  );
}
