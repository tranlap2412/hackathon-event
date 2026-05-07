"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Trophy } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

export default function Prizes() {
  const { i18n } = useLingui();

  const otherBenefits = [
    msg`Sample briefs for each challenge track.`,
    msg`A registration form with team and track validation.`,
    msg`A project submission form for repository and demo links.`,
    msg`English and Vietnamese interface.`,
    msg`Layout that adapts from mobile to desktop.`,
  ];

  const prizes = [
    {
      title: msg`Showcase`,
      icon: "🏆",
      cash: msg`Featured demo`,
      nft: msg`Opening slot on the sample stage`,
      desc: msg`Illustrative tier only. Nothing on this page has been awarded.`,
    },
    {
      title: msg`First look`,
      icon: "🥇",
      cash: msg`Product narrative`,
      nft: msg`Clearest problem and demo`,
      desc: msg`A sample label for a project that explains the idea well.`,
    },
    {
      title: msg`Craft`,
      icon: "🥈",
      cash: msg`Interface quality`,
      nft: msg`Two sample mentions`,
      desc: msg`A sample label for careful interaction and visual finish.`,
    },
    {
      title: msg`Collaboration`,
      icon: "🥉",
      cash: msg`Team workflow`,
      nft: msg`Three sample mentions`,
      desc: msg`A sample label for how a team splits design and engineering.`,
    },
    {
      title: msg`Original angle`,
      icon: "💡",
      cash: msg`Unexpected approach`,
      nft: msg`One sample mention`,
      desc: msg`A sample label for a brief taken in a direction of its own.`,
    },
    {
      title: msg`Build in public`,
      icon: "🎖️",
      cash: msg`Visible progress`,
      nft: msg`Notes from the sample board`,
      desc: msg`A sample label for teams that document how the idea evolved.`,
    },
  ];

  return (
    <section
      id="prizes"
      className="py-20 sm:py-28 lg:py-36 bg-muted/30 text-foreground"
    >
      <div className="container grid items-start max-w-6xl gap-16 mx-auto lg:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          transition={{ staggerChildren: 0.15 }}
          className="space-y-10"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
            className="flex items-center gap-3"
          >
            <Trophy className="w-12 h-12 text-primary" />

            <h2 className="text-4xl font-bold text-center uppercase text-shadow-lg text-shadow-primary md:text-5xl">
              {i18n._(msg`Prizes`)}
            </h2>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
          >
            <p className="text-5xl font-extrabold text-transparent md:text-6xl bg-gradient-to-r from-primary to-accent bg-clip-text">
              {i18n._(msg`Sample recognition board`)}
            </p>
            <p className="mt-3 text-xl text-foreground/70">
              {i18n._(
                msg`Illustrative tiers for this demo. No cash, NFT, or certificate is offered.`
              )}
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
          >
            <h3 className="mb-5 text-2xl font-semibold text-primary">
              {i18n._(msg`What this demo includes`)}
            </h3>
            <ul className="space-y-3 text-base leading-relaxed text-foreground/80">
              {otherBenefits.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>{i18n._(item)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <div className="grid gap-10 transition-transform duration-300 sm:grid-cols-2">
          {prizes.map((prize, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: i * 0.15,
                duration: 0.8,
              }}
              className={twMerge([
                "will-change-transform will-change-opacity hover:transition-transform hover:scale-105 hover:rotate-0 border border-dashed p-7 rounded-2xl border-border bg-background/50 hover:shadow-2xl",
                i % 2 === 0 ? "-rotate-1" : "rotate-[1.5deg]",
              ])}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{prize.icon}</span>
                <h3 className="text-xl font-semibold text-primary">
                  {i18n._(prize.title)}
                </h3>
              </div>
              <p className="text-xl font-bold">{i18n._(prize.cash)}</p>
              <p className="text-base">{i18n._(prize.nft)}</p>
              <p className="mt-2 text-sm opacity-70">{i18n._(prize.desc)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
