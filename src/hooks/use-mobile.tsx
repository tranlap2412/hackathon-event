import * as React from "react";

// Có thể tái sử dụng cho nhiều breakpoint
function useMediaQuery(maxWidth: number) {
  const [matches, setMatches] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${maxWidth - 1}px)`);

    const onChange = () => {
      setMatches(window.innerWidth < maxWidth);
    };

    mql.addEventListener("change", onChange);
    setMatches(window.innerWidth < maxWidth);

    return () => mql.removeEventListener("change", onChange);
  }, [maxWidth]);

  return !!matches;
}

// Hook cũ
export function useIsMobile() {
  return useMediaQuery(768); // < 768px
}

// Hook mới cho lg
export function useIsLg() {
  return useMediaQuery(1024); // < 1024px
}
