const Footer = () => {
  return (
    <div className='flex h-fit w-full flex-col items-center justify-center border-t border-borderColor p-10 font-NMSNeo2 text-xs text-fontColor/60  tablet:text-sm'>
      <div className='mb-1 flex h-fit w-fit flex-col items-center justify-center font-NMSNeo3'>(주) 영화예매시스템</div>
      <div className='mb-5 flex h-fit w-fit flex-col items-center justify-center'>ⓒ영화예매시스템. ALL RIGHTS RESERVED</div>
      <div className='mb-1 flex h-fit w-fit flex-col items-center justify-center'>시스템관리자 : 박성훈</div>
      <div className='mb-1 flex h-fit w-fit flex-col items-center justify-center'>Contact : pshun7614@gmail.com</div>
    </div>
  );
};

export default Footer;
