import PageContainerAtom from '@/atomics/layouts/PageContainerAtom';
import FullScreenSkeletonAtom from '@/atomics/loaders/FullScreenSkeletonAtom';
import Footer from '@/components/mains/Footer';
import MoviesComp from '@/components/movies/MoviesComp';
import MoviesSliderComp from '@/components/movies/MoviesSliderComp';
import { Suspense } from 'react';

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
