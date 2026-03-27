import { Paths, setupSvgRenderer } from "@/lib/frame";
import { useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";

function Frame({
  className,
  paths,
  enableBackdropBlur,
  enableViewBox,
  ...props
}: {
  paths: Paths;
  enableBackdropBlur?: boolean;
  enableViewBox?: boolean;
} & React.ComponentProps<"svg">) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current && svgRef.current.parentElement) {
      const instance = setupSvgRenderer({
        el: svgRef.current,
        paths,
        enableBackdropBlur,
        enableViewBox,
      });

      return () => instance.destroy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paths]);

  return (
    <svg
      {...props}
      className={twMerge(["absolute inset-0 size-full", className])}
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
    />
  );
}

export { Frame };
