import { header } from '@/actions';
import { MovieType } from '@/actions/movies/useFetchMovieAction';
import PageContainerAtom from '@/atomics/layouts/PageContainerAtom';
import FullScreenSkeletonAtom from '@/atomics/loaders/FullScreenSkeletonAtom';
import BookComp from '@/components/books/BookComp';
import Footer from '@/components/mains/Footer';
import MovieOverviewComp from '@/components/movies/MovieOverviewComp';
import axios from 'axios';
import { Metadata } from 'next';
import { Suspense } from 'react';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  const res = await axios.get(`/book/api?id=${id}`, {
    baseURL: process.env.NEXT_PUBLIC_API,
    headers: {
      ...header,
    },
  });

  const movie: MovieType = res.data[0];

  return {
    title: `영화예매 시스템 | ${movie.title}`,
    description: movie.summary,
    icons: {
      icon: [
        {
          url: '/images/movie.png',
          href: '/images/movie.png',
        },
      ],
    },
    openGraph: {
      title: `영화예매 시스템 | ${movie.title}`,
      description: movie.summary,
      url: `https://cinema-project.com/book/${id}`,
      siteName: 'Cinema-system',
      images: [
        {
          url: `https://cinema-project.com${movie.background_img}`,
          width: 1920,
          height: 1080,
        },
      ],
    },
  };
}

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
