"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

function HeroSection() {
  const { i18n } = useLingui();

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center"
    >
      <h1 className="max-w-5xl text-[40px] font-extrabold leading-tight tracking-tight md:text-6xl [font-family:var(--font-orbitron)]">
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          {i18n._(msg`DREAMFORGE`)}
        </span>
        <span className="block mt-2 text-shadow-lg text-shadow-primary">
          {i18n._(msg`HACKATHON`)}
        </span>
      </h1>

      <p className="max-w-3xl mt-6 text-lg md:text-2xl text-foreground/80">
        {i18n._(msg`Build Ideas Into Reality`)}
      </p>
      <p className="max-w-2xl mt-4 text-base md:text-lg text-foreground/70">
        {i18n._(
          msg`A platform where developers, designers, and innovators collaborate to transform ideas into meaningful technology solutions.`
        )}
      </p>

      <div className="flex flex-col gap-5 mt-10 sm:flex-row">
        <Link href="#register">
          <Button className="w-64 !text-lg sm:w-56 h-14">
            {i18n._(msg`Register Now`)}
          </Button>
        </Link>
        <Link href="#register">
          <Button variant="accent" className="w-64 !text-lg sm:w-56 h-14">
            {i18n._(msg`Submit Project`)}
          </Button>
        </Link>
      </div>

      <p className="mt-16 text-sm tracking-wide uppercase text-foreground/60">
        {i18n._(msg`Personal portfolio demo`)}
      </p>
    </section>
  );
}

export default HeroSection;
