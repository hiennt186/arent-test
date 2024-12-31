import React, { useState, useEffect } from 'react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-[156px] right-[96px] w-[48px] h-[48px] rounded-full border border-gray-400 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors z-50"
          aria-label="Scroll to top"
        >
          <div className="relative w-[12px] h-[12px]">
            <div className="absolute w-[12px] h-[2px] bg-gray-400 -rotate-45 -translate-x-[3px] translate-y-[4px]"></div>
            <div className="absolute w-[12px] h-[2px] bg-gray-400 rotate-45 translate-x-[3px] translate-y-[4px]"></div>
          </div>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
