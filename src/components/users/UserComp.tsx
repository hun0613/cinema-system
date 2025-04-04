'use client';

import ButtonAtom, { BUTTON_COLOR, BUTTON_LAYOUT, SIZE } from '@/atomics/buttons/ButtonAtom';
import ModalAtom from '@/atomics/modals/ModalAtom';
import { mergeClassNames } from '@/utils/domUtil';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import LoginComp from './LoginComp';

export type UserCompProps = {} & JSX.IntrinsicElements['div'];

const UserComp: React.FC<UserCompProps> = () => {
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);

  const { data, status } = useSession();

  const handleCloseSignInModal = () => {
    setOpenSignInModal(false);
  };

  const handleOpenSignInModal = () => {
    setOpenSignInModal(true);
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      {status !== 'authenticated' && (
        <ButtonAtom
          onClick={handleOpenSignInModal}
          layout={BUTTON_LAYOUT.OUTLINE}
          color={BUTTON_COLOR.GRAY}
          size={SIZE.SMALL}
          className={mergeClassNames('absolute right-3 border-transparent')}
        >
          로그인
        </ButtonAtom>
      )}

      {status === 'authenticated' && (
        <ButtonAtom
          onClick={handleLogout}
          layout={BUTTON_LAYOUT.OUTLINE}
          color={BUTTON_COLOR.GRAY}
          size={SIZE.SMALL}
          className={mergeClassNames('absolute right-3 border-transparent')}
        >
          로그아웃
        </ButtonAtom>
      )}

      {openSignInModal && (
        <ModalAtom className='max-w-[400px]' onCloseModal={handleCloseSignInModal}>
          <LoginComp />
        </ModalAtom>
      )}
    </>
  );
};

export default UserComp;
