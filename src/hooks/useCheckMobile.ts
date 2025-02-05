import { useEffect, useState } from 'react';

export const MOBILE_WIDTH = 764;

const useCheckMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const windowSize = window.innerWidth;

      !!windowSize && windowSize > MOBILE_WIDTH ? setIsMobile(false) : setIsMobile(true);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile };
};

export default useCheckMobile;
