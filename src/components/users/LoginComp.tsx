import { mergeClassNames } from '@/utils/domUtil';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';

const LoginComp = () => {
  const auths = [SOCIAL.KAKAO];
  const { data, status } = useSession();

  console.log({ data, status });

  const handleLogin = (social: SOCIAL) => {
    signIn(social);
    // signOut();
  };

  return (
    <div className={mergeClassNames('flex h-[400px] w-full flex-col items-center justify-center gap-10')}>
      <div className='flex flex-col items-center gap-2'>
        <h1 className='font-NMSNeo3 text-2xl text-borderColor'>LOGIN</h1>
        <p className='font-NMSNeo2 text-sm text-borderColor/80'>로그인으로 다양한 회원서비스를 즐겨보세요</p>
      </div>
      <div className='flex w-full items-center justify-between gap-3 px-10'>
        <div className='w-full border-b border-borderColor/30'></div>
        <p className='text-nowrap font-NMSNeo2 text-xs text-borderColor/60'>SNS 계정 로그인</p>
        <div className='w-full border-b border-borderColor/30'></div>
      </div>
      <div className='flex w-full items-center justify-center gap-5'>
        {auths.map((auth) => {
          return <SocialIconComp onClick={() => handleLogin(auth)} key={auth} social={auth} />;
        })}
      </div>
    </div>
  );
};

export default LoginComp;

export enum SOCIAL {
  KAKAO = 'kakao',
}

export type SocialIconCompProps = {
  social: SOCIAL;
} & JSX.IntrinsicElements['button'];

export const SocialIconComp: React.FC<SocialIconCompProps> = (props) => {
  const { social, ...rest } = props;

  const getSocialImage = () => {
    if (social === SOCIAL.KAKAO) {
      return '/images/kakao_logo.png';
    } else {
      return '';
    }
  };

  return (
    <button
      {...rest}
      type='button'
      className={mergeClassNames('relative aspect-square w-12 rounded-full border border-borderColor/20', {
        'bg-[#FEE500]': social === SOCIAL.KAKAO,
      })}
    >
      <Image
        alt='social_icon_image'
        src={getSocialImage()}
        fill
        className={mergeClassNames('', {
          'p-3': social === SOCIAL.KAKAO,
        })}
      />
    </button>
  );
};
