'use client';
import PageContainerAtom from '@/atomics/layouts/PageContainerAtom';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='fixed top-0 z-50 flex h-16 w-full flex-col items-center justify-center bg-gradient-to-b from-bgColor text-white '>
      {/* logo */}
      <PageContainerAtom className='h-full justify-center border-b border-white/40'>
        <div className='flex h-fit w-fit flex-col items-center justify-center font-NMSNeo3 text-base text-white drop-shadow-xl'>
          <Link href={`/`}>영화예매시스템</Link>
        </div>
      </PageContainerAtom>
      {/* </div> */}
    </header>
  );
};

export default Header;
