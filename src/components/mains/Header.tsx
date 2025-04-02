'use client';
import ButtonAtom, { BUTTON_COLOR, BUTTON_LAYOUT, SIZE } from '@/atomics/buttons/ButtonAtom';
import PageContainerAtom from '@/atomics/layouts/PageContainerAtom';
import ModalAtom from '@/atomics/modals/ModalAtom';
import { mergeClassNames } from '@/utils/domUtil';
import Link from 'next/link';
import { useState } from 'react';
import LoginComp from '../auths/LoginComp';

const Header = () => {
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);

  const handleCloseSignInModal = () => {
    setOpenSignInModal(false);
  };

  const handleOpenSignInModal = () => {
    setOpenSignInModal(true);
  };

  return (
    <>
      <header className='fixed top-0 z-50 flex h-16 w-full flex-col items-center justify-center bg-gradient-to-b from-bgColor text-white '>
        {/* logo */}
        <PageContainerAtom className='relative h-full justify-center border-b border-white/40'>
          <div className='flex h-fit w-fit flex-col items-center justify-center font-NMSNeo3 text-base text-white drop-shadow-xl'>
            <Link href={`/`}>영화예매시스템</Link>
          </div>
          <ButtonAtom
            onClick={handleOpenSignInModal}
            layout={BUTTON_LAYOUT.OUTLINE}
            color={BUTTON_COLOR.GRAY}
            size={SIZE.SMALL}
            className={mergeClassNames('absolute right-3 border-transparent')}
          >
            로그인
          </ButtonAtom>
        </PageContainerAtom>
      </header>
      {openSignInModal && (
        <ModalAtom className='max-w-[400px]' onCloseModal={handleCloseSignInModal}>
          <LoginComp />
        </ModalAtom>
      )}
    </>
  );
};

export default Header;
