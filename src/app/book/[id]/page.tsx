import PageContainerAtom from '@/atomics/layouts/PageContainerAtom';
import FullScreenSkeletonAtom from '@/atomics/loaders/FullScreenSkeletonAtom';
import BookComp from '@/components/books/BookComp';
import Footer from '@/components/mains/Footer';
import MovieOverviewComp from '@/components/movies/MovieOverviewComp';
import { Suspense } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const Book = ({ params }: { params: { id: number } }) => {
  return (
    <PageContainerAtom full className='bg-bgColor'>
      <Suspense fallback={<FullScreenSkeletonAtom />}>
        <MovieOverviewComp movieId={Number(params.id)} />
      </Suspense>
      <PageContainerAtom>
        <BookComp movieId={Number(params.id)} />
        <Footer />
      </PageContainerAtom>
    </PageContainerAtom>
  );
};

export default Book;
