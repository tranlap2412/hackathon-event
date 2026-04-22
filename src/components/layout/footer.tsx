"use client";

import Link from "next/link";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { DreamForgeMark } from "@/components/brand/mark";

export const navItems = [
  { name: msg`Home`, url: "#home" },
  { name: msg`About`, url: "#about" },
  { name: msg`Tracks`, url: "#tracks" },
  { name: msg`Prizes`, url: "#prizes" },
  { name: msg`Timeline`, url: "#timeline" },
  { name: msg`Contact`, url: "#contact" },
];

const Footer = () => {
  const { i18n } = useLingui();

  return (
    <footer className="w-full border-t border-border/40 bg-muted/30">
      <div className="grid grid-cols-1 gap-10 px-6 py-12 mx-auto max-w-7xl md:grid-cols-3">
        <div className="space-y-3 text-center md:text-left">
          <h3 className="relative flex items-center justify-center gap-2 !text-3xl font-bold text-shadow-lg text-shadow-primary md:justify-start [font-family:var(--font-orbitron)]">
            <DreamForgeMark className="w-8 h-8 text-primary" />
            DreamForge
          </h3>
          <p className="text-sm text-foreground/70">
            {i18n._(
              msg`A personal portfolio demo of a hackathon event platform.`
            )}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:justify-center">
          {navItems.map((item) => (
            <Link
              key={i18n._(item.name)}
              href={item.url}
              className="text-sm transition-colors text-foreground/70 hover:text-primary"
            >
              {i18n._(item.name)}
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 text-sm text-center md:items-end md:text-right text-foreground/70">
          <p>{i18n._(msg`Build Ideas Into Reality`)}</p>
          <p className="max-w-xs text-xs text-foreground/60">
            {i18n._(
              msg`Not affiliated with Pione Dream, Pione Group, or any other organization.`
            )}
          </p>
        </div>
      </div>

      <p className="py-4 text-xs text-center border-t text-foreground/60 border-border/30">
        © {new Date().getFullYear()} DreamForge.{" "}
        {i18n._(msg`Independent portfolio demo.`)}
      </p>
    </footer>
  );
};

export default Footer;
