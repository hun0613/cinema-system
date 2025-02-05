import { mergeClassNames } from '@/utils/domUtil';

export type ButtonAtomProps = {
  type?: string;
  full?: boolean;
  size?: SIZE;
  layout?: BUTTON_LAYOUT;
  color?: BUTTON_COLOR;
} & JSX.IntrinsicElements['button'];

export enum BUTTON_LAYOUT {
  SOLID = 'SOLID',
  OUTLINE = 'OUTLINE',
}

export enum BUTTON_COLOR {
  RED = 'RED',
  GRAY = 'GRAY',
}

export enum SIZE {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

const ButtonAtom: React.FC<ButtonAtomProps> = (props) => {
  const {
    type = 'button',
    full = false,
    size = SIZE.MEDIUM,
    layout = BUTTON_LAYOUT.SOLID,
    color = BUTTON_COLOR.RED,
    className,
    children,
    disabled = false,
    ...rest
  } = props;
  return (
    <button
      {...rest}
      type='button'
      disabled={disabled}
      className={mergeClassNames(
        'rounded-xl font-NMSNeo3 text-sm',
        'tablet:text-base',
        'disabled:bg-fontColor/50',
        {
          'w-full': full,
          'w-fit': !full,
          'px-5 py-3': size === SIZE.SMALL,
          'px-7 py-4': size === SIZE.MEDIUM,
          'px-9 py-5': size === SIZE.LARGE,
          'bg-pointColor text-white hover:bg-pointColor/80 active:bg-pointColor/60':
            layout === BUTTON_LAYOUT.SOLID && color === BUTTON_COLOR.RED,
          'bg-fontColor text-bgColor hover:bg-fontColor/80 active:bg-fontColor/60':
            layout === BUTTON_LAYOUT.SOLID && color === BUTTON_COLOR.GRAY,
          'border border-pointColor/80 text-white hover:bg-pointColor/70 active:bg-pointColor/50':
            layout === BUTTON_LAYOUT.OUTLINE && color === BUTTON_COLOR.RED,
          'border border-borderColor text-white hover:bg-borderColor/70 active:bg-borderColor/50':
            layout === BUTTON_LAYOUT.OUTLINE && color === BUTTON_COLOR.GRAY,
        },
        className,
      )}
    >
      {children}
    </button>
  );
};

export default ButtonAtom;
