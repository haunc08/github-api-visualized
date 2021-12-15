const { useMediaQuery } = require('react-responsive');

export const useSm = () => useMediaQuery({ query: '(min-width: 640px)' });
export const useLg = () => useMediaQuery({ query: '(min-width: 1024px)' });
