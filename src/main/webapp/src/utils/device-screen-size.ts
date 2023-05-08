import { useEffect, useState } from "react";

function useMediaQuery(query: string, defaultMatches = window.matchMedia(query).matches) {
  const [matches, setMatches] = useState(defaultMatches);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) setMatches(media.matches);

    const listener = () => setMatches(media.matches);

    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [query, matches]);

  return matches;
}

interface ScreenSizeProps {
  isMobile:boolean
  isTablet:boolean
  isDesktop:boolean
}

export const useScreenSize = ():ScreenSizeProps => {
  const isMobile = useMediaQuery("(min-width: 480px)")
  const isTablet = useMediaQuery("(min-width: 769px)")
  const isDesktop = useMediaQuery("(min-width: 1025px)")

  return {
    isDesktop,
    isMobile,
    isTablet
  }
}
