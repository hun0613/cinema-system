import { MOVIE_COUNT_PER_PAGE } from '@/components/movies/MovieListComp';
import { mergeClassNames } from '@/utils/domUtil';

export type GridSkeletonAtomProps = {} & JSX.IntrinsicElements['div'];

const GridSkeletonAtom: React.FC<GridSkeletonAtomProps> = (props) => {
  const gridArray = new Array(MOVIE_COUNT_PER_PAGE).fill(0);

  return (
    <div
      className={mergeClassNames(
        'grid h-fit min-h-[300px] w-full grid-cols-2 gap-5 px-5 py-10 font-NMSNeo2',
        'tablet:grid-cols-4 tablet:gap-10 desktop:px-0',
      )}
    >
      {gridArray.map((_, idx) => {
        return <div key={idx} className='aspect-[3/4.3] w-full bg-white/10'></div>;
      })}
    </div>
  );
};

export default GridSkeletonAtom;
