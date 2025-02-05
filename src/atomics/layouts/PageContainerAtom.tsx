import { mergeClassNames } from '@/utils/domUtil';

export type PageContainerAtomProps = {
  full?: boolean;
} & JSX.IntrinsicElements['div'];

const PageContainerAtom: React.FC<PageContainerAtomProps> = (props) => {
  const { full = false, className, children } = props;

  return (
    <div
      className={mergeClassNames(
        'flex w-full max-w-[1100px] flex-col items-center justify-start overflow-x-hidden',
        {
          'max-w-full': full,
        },
        className,
      )}
    >
      {children}
    </div>
  );
};

export default PageContainerAtom;
