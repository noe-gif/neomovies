import { useLayoutEffect, useState } from 'react';

export const getResponsiveTrailerHeights = (width: number) => {
  let newViewPortWith = 16;
  for (let breakPoints = 1600; breakPoints > 350; breakPoints -= 200) {
    if (width >= breakPoints) {
      return newViewPortWith;
    }
    newViewPortWith -= width >= 1200 ? 2 : 1;
  }
  if (width >= 350) {
    return 6;
  } else if (width >= 300) {
    return 4.5;
  }
  return 16;
};

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export const wrapperStyle = {
  padding: 0,
  backgroundColor: '#141414',
  position: 'absolute',
  top: '0%',
  marginTop: '50%',
  zIndex: 2,
  width: '100%',
  height: '100vh',
};

export const trailerWrapperStyle = {
  float: 'none',
  clear: 'both',
  width: `100vw`,
  position: 'relative',
  padding: 0,
};
