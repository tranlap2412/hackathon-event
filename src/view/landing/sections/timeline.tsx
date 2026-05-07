"use client";

import { motion } from "framer-motion";
import { Calendar, Rocket, Users, FileText, Award, Star } from "lucide-react";
import FrameCard from "@/components/ui/frame-card";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

const events = [
  {
    id: 1,
    icon: Calendar,
    date: msg`01/03`,
    title: msg`Season opens`,
    desc: msg`Sample registration window begins`,
    highlight: true,
  },
  {
    id: 2,
    icon: Users,
    date: msg`22/03`,
    title: msg`Registration closes`,
    desc: msg`Sample deadline for team sign-up`,
  },
  {
    id: 3,
    icon: Rocket,
    date: msg`23/03 – 12/04`,
    title: msg`Workshops`,
    desc: msg`Sample sessions for the challenge briefs`,
  },
  {
    id: 4,
    icon: FileText,
    date: msg`13/04 – 03/05`,
    title: msg`Build window`,
    desc: msg`Sample period for project links`,
  },
  {
    id: 5,
    icon: Star,
    date: msg`10/05`,
    title: msg`Shortlist`,
    desc: msg`Sample checkpoint before the showcase`,
  },
  {
    id: 6,
    icon: Award,
    date: msg`24/05`,
    title: msg`Showcase`,
    desc: msg`Sample day for demos on the recognition board`,
  },
];

export default function Timeline() {
  const { i18n } = useLingui();

  return (
    <section
      id="timeline"
      className="flex flex-col items-center justify-center min-h-screen py-20 sm:py-28 lg:py-36"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-10 text-4xl font-bold text-center text-shadow-lg text-shadow-primary md:text-5xl"
      >
        {i18n._(msg`TIMELINE`)}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-2xl mb-16 text-base leading-relaxed text-center md:text-lg text-foreground/70"
      >
        {i18n._(msg`A sample season for this portfolio demo. These dates are not a live event.`)}
        <br />
        {i18n._(msg`Illustrative window:`)}{" "}
        <span className="font-semibold text-primary">
          {i18n._(msg`01/03 – 24/05`)}
        </span>
      </motion.p>

      <div className="relative w-full max-w-6xl">
        {/* Line timeline */}
        <div className="absolute hidden w-full h-1 border-t-2 border-dashed lg:block top-8 border-border" />

        <div className="relative z-10 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-6">
          {events.map((e, i) => {
            const Icon = e.icon;
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="flex flex-col items-center text-center"
              >
                {e.highlight ? (
                  <FrameCard
                    frameType="2"
                    className="flex flex-col items-center justify-center h-full px-3 py-5 -translate-y-1/6"
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Pulse effect */}
                      <span className="absolute w-16 h-16 rounded-full bg-accent/30 animate-ping" />
                      <div className="relative flex items-center justify-center w-16 h-16 border-4 rounded-full shadow-lg text-primary !border-primary bg-background">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <p className="mt-6 text-base font-bold text-primary">
                      {i18n._(e.date)}
                    </p>
                    <h3 className="mt-1 text-base font-semibold">
                      {i18n._(e.title)}
                    </h3>
                    <p className="mt-1 text-xs text-foreground/70">
                      {i18n._(e.desc)}
                    </p>
                  </FrameCard>
                ) : (
                  <>
                    <div className="flex items-center justify-center w-16 h-16 border-4 rounded-full bg-background text-primary border-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="mt-6 text-base font-bold text-primary">
                      {i18n._(e.date)}
                    </p>
                    <h3 className="mt-1 text-base font-semibold">
                      {i18n._(e.title)}
                    </h3>
                    <p className="mt-1 text-xs text-foreground/70">
                      {i18n._(e.desc)}
                    </p>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Note */}
      <p className="max-w-3xl mt-12 text-sm text-center text-foreground/60">
        <span className="font-semibold">{i18n._(msg`Note:`)}</span>{" "}
        {i18n._(
          msg`The dates above are placeholders so the timeline layout can be reviewed. They are not confirmed and no team will be notified.`
        )}
      </p>
    </section>
  );
}
