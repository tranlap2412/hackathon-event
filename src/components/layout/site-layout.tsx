"use client";

import { Frame } from "@/components/ui/frame";
import { Toaster } from "@/components/ui/toaster";
import { useIsLg } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/use-theme";
import { msg } from "@lingui/core/macro";
import {
  Calendar,
  FileText,
  Home,
  Info,
  Layers,
  Mail,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DreamForgeMark } from "../brand/mark";
import { twMerge } from "tailwind-merge";
import { BlackHoleVideo } from "../effects/black-hole-video";
import StarsCanvas from "../effects/star-background";
import Footer from "./footer";
import { MobileNav } from "./mobile-nav";
import Preloader from "./preloader";
import { ScrollProgressBar } from "./scroll-progress-bar";
import { Switcher } from "./switcher";
import { NavBar } from "./tubelight-navbar";

export const navItems = [
  { name: msg`Home`, url: "#home", icon: Home },
  { name: msg`About`, url: "#about", icon: Info },
  { name: msg`Tracks`, url: "#tracks", icon: Layers },
  { name: msg`Prizes`, url: "#prizes", icon: Trophy },
  { name: msg`Timeline`, url: "#timeline", icon: Calendar },
  { name: msg`Register`, url: "#register", icon: FileText },
  { name: msg`Contact`, url: "#contact", icon: Mail },
];

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const { mounted } = useTheme();
  const isTablet = useIsLg();
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen site-content">
        <header className="fixed left-0 right-0 z-50 flex items-center justify-between px-4 top-4 h-11">
          <div className="flex-1" />
          <div className="flex-1" />
          <div className="flex justify-end flex-1 gap-2">
            <div className="bg-transparent rounded-full w-9 h-9" />
            <div className="h-9 w-[150px] rounded-full bg-transparent" />
          </div>
        </header>
        <main className="flex-grow pt-24">{children}</main>
        <Footer />
        <Toaster />
      </div>
    );
  }

  return (
    <>
      <Preloader onComplete={() => setIsPreloaderComplete(true)} />
      <div
        className={twMerge([
          "site-content flex flex-col min-h-screen transition-all duration-500",
          isPreloaderComplete ? "opacity-100" : "opacity-0 pointer-events-none",
        ])}
      >
        {/* <SplashCursor /> */}
        <StarsCanvas />
        <ScrollProgressBar />
        {!isTablet && <BlackHoleVideo />}
        {/* Cosmic UI style header */}
        <div className="fixed inset-x-0 top-0 z-50 flex mx-2 mt-2 h-18 lg:-mt-px lg:-mx-px">
          {/* Left frame */}
          <div
            className={twMerge([
              "size-full relative -mr-[11px] hidden lg:block",
              "[--color-frame-1-stroke:var(--color-primary)]/90",
              "[--color-frame-1-fill:var(--color-primary)]/8",
              "[--color-frame-2-stroke:var(--color-primary)]/23",
              "[--color-frame-2-fill:transparent]",
            ])}
          >
            <Frame
              className="drop-shadow-2xl drop-shadow-primary"
              paths={JSON.parse(
                '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","0","0"],["L","100% - 6","0"],["L","100% - 11","100% - 64"],["L","100% + 0","0% + 29"],["L","0","11"],["L","0","0"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","0","14"],["L","100% - 7","33"]]}]'
              )}
            />
          </div>

          {/* Middle content with frame */}
          <div className="relative flex flex-none w-full h-full lg:container">
            <div
              className={twMerge([
                "flex-none h-[75px] sm:h-20 px-3 pl-6 sm:px-8 relative w-full",
                "[--color-frame-1-stroke:var(--color-primary)]",
                "[--color-frame-1-fill:var(--color-primary)]/20",
                "[--color-frame-2-stroke:var(--color-primary)]/57",
                "[--color-frame-2-fill:transparent]",
                "[--color-frame-3-stroke:var(--color-primary)]/23",
                "[--color-frame-3-fill:transparent]",
              ])}
            >
              <Frame
                enableBackdropBlur
                className="drop-shadow-2xl drop-shadow-primary/40"
                paths={JSON.parse(
                  `[{
                    "show": true,
                    "style": {
                      "strokeWidth": "1",
                      "stroke": "var(--color-frame-1-stroke)",
                      "fill": "var(--color-frame-1-fill)"
                    },
                    "path": [
                      ["M","6","0"],
                      ["L","100% - 6.5","0"],
                      ["L","100% + 0","0% + 9"],
                      ["L","100% - 28","100% - 15"],
                      ["L","280","100% - 15"], 
                      ["L","272","100% - 35"], 
                      ["L","260","100% - 15"], 
                      ["L","20","100% - 15"],
                      ["L","0","0% + 8"],
                      ["L","6","0"]
                    ]
                  }]`
                )}
              />

              {/* Nội dung của bạn */}
              <div className="relative flex items-center justify-between mt-2.5 sm:mt-3">
                {/* Left logos */}
                <div className="flex items-center gap-4 max-lg:justify-between max-lg:w-full">
                  <Link
                    href="#home"
                    className="flex items-center gap-2 text-foreground"
                  >
                    <DreamForgeMark className="w-8 h-8 text-primary sm:h-9 sm:w-9" />
                    <span className="text-sm font-semibold tracking-wide sm:text-base [font-family:var(--font-orbitron)]">
                      DreamForge
                    </span>
                  </Link>
                  {isTablet && <MobileNav items={navItems} />}
                </div>

                {/* Center Nav */}
                <div className="justify-center flex-1 hidden lg:flex">
                  <NavBar items={navItems} />
                </div>

                {/* Right Switcher */}
                <div className="items-center hidden gap-2 lg:flex">
                  <Switcher />
                </div>
              </div>
            </div>
          </div>

          {/* Right frame */}
          <div
            className={twMerge([
              "size-full relative -ml-[18px] hidden lg:block",
              "[--color-frame-1-stroke:var(--color-primary)]/90",
              "[--color-frame-1-fill:var(--color-primary)]/8",
              "[--color-frame-2-stroke:var(--color-primary)]/23",
              "[--color-frame-2-fill:transparent]",
            ])}
          >
            <Frame
              paths={JSON.parse(
                '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","12","0"],["L","100% + 0","0"],["L","100% + 0","0% + 16"],["L","0","100% - 42"],["L","18","7"],["L","12","0"]]}]'
              )}
            />
          </div>
        </div>
        <main className="flex-grow pt-24">{children}</main>
        <Footer />
        <Toaster />
      </div>
    </>
  );
}
