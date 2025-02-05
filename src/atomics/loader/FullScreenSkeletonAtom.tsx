import { mergeClassNames } from '@/utils/domUtil';

export type FullScreenSkeletonAtomProps = {} & JSX.IntrinsicElements['div'];

const FullScreenSkeletonAtom: React.FC<FullScreenSkeletonAtomProps> = (props) => {
  return (
    <div className='relative flex h-fit w-full flex-col items-center justify-center bg-screenColor'>
      <div
        className={mergeClassNames(
          'relative flex aspect-video h-[calc(100vh)] flex-col items-center justify-start overflow-hidden bg-white/10',
          'tablet:h-[calc(100vh-200px)]',
        )}
      ></div>
      <div className='absolute h-full w-full bg-gradient-to-r from-screenColor'></div>
      <div className='absolute h-full w-full bg-gradient-to-l from-screenColor'></div>
    </div>
  );
};

export default FullScreenSkeletonAtom;
