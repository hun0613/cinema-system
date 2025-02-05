'use client';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='fixed top-0 z-50 flex h-16 w-full flex-col items-center justify-center bg-gradient-to-b from-bgColor text-white '>
      <div className='relative flex h-full w-full max-w-[1100px] flex-row items-center justify-center border-b border-white/40 px-10'>
        {/* logo */}
        <div className='flex h-fit w-fit flex-col items-center justify-center font-NMSNeo3 text-base text-white drop-shadow-xl'>
          <Link href={`/`}>영화예매시스템</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
