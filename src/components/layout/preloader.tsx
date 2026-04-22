"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState, useEffect } from "react";
import { Sparkles } from "@/components/ui/sparkles";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

gsap.registerPlugin(useGSAP);

const PRELOADER_NAME_LETTERS = "DREAMFORGE".split("");

interface PreloaderProps {
  onComplete?: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const { i18n } = useLingui();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!hasMounted || !preloaderRef.current) return;

      const tl = gsap.timeline({
        defaults: {
          ease: "power1.inOut",
        },
        onStart: () => {
          if (onComplete) onComplete();
        },
        onComplete: () => {
          setIsAnimationComplete(true);
        },
      });

      tl.to(".name-text span", {
        y: 0,
        stagger: 0.05,
        duration: 0.8,
      });

      tl.to(
        ".sub-text",
        {
          autoAlpha: 1,
          duration: 0.8,
          ease: "power1.in",
        },
        "-=0.5"
      );

      tl.to(".preloader-item", {
        delay: 1.5,
        y: "100%",
        duration: 0.6,
        stagger: {
          each: 0.08,
          from: "start",
        },
      });

      tl.to(
        [".name-text span", ".sub-text"],
        {
          autoAlpha: 0,
          duration: 0.3,
        },
        "<0.2"
      );

      tl.to(
        preloaderRef.current,
        {
          autoAlpha: 0,
          duration: 0.5,
        },
        "-=0.3"
      );
    },
    { scope: preloaderRef, dependencies: [hasMounted] }
  );

  useEffect(() => {
    if (!hasMounted) return;

    if (!isAnimationComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      if (hasMounted) {
        document.body.style.overflow = "";
      }
    };
  }, [isAnimationComplete, hasMounted]);

  if (!hasMounted) {
    return null;
  }

  if (isAnimationComplete) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] font- flex pointer-events-none"
      ref={preloaderRef}
    >
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="preloader-item h-full w-[10%] bg-black pointer-events-auto"
        ></div>
      ))}

      <Sparkles
        id="tsparticles"
        className="absolute inset-0 w-full h-full"
        particleColor="#FFFFFF"
        minSize={0.4}
        maxSize={1.2}
        particleDensity={1000}
        speed={0.5}
      />

      <div className="absolute flex flex-col items-center justify-center w-full text-center -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2">
        <h1
          className="name-text font-bold flex text-[12vw] sm:text-[12vw] md:text-[10vw] lg:text-[8rem] 2xl:text-[11rem] text-white leading-none overflow-hidden [font-family:var(--font-orbitron)]"
          aria-label={i18n._(msg`DREAMFORGE`)}
        >
          {PRELOADER_NAME_LETTERS.map((letter, index) => (
            <span key={index} className="inline-block translate-y-full">
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>
        <p className="px-4 mt-4 font-serif text-lg opacity-0 sub-text md:mt-6 sm:text-xl md:text-2xl lg:text-3xl text-white/90">
          {i18n._(msg`Build Ideas Into Reality`)}
        </p>
      </div>
    </div>
  );
};

export default Preloader;
