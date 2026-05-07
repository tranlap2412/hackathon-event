"use client";

import { motion } from "framer-motion";
import FrameCard from "@/components/ui/frame-card";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

export default function About() {
  const { i18n } = useLingui();

  const items = [
    {
      id: "01",
      frameType: "1",
      title: msg`Shared workshop`,
      text: msg`A sample event space where developers and designers practice shipping an idea against a shared brief.`,
    },
    {
      id: "02",
      frameType: "2",
      title: msg`Challenge tracks`,
      text: msg`Five fictional tracks covering product, interface, and applied technology problems.`,
    },
    {
      id: "03",
      frameType: "3",
      title: msg`Registration flow`,
      text: msg`A multi-step form shows how a hackathon site can collect a team, a track, and a project link.`,
    },
    {
      id: "04",
      frameType: "4",
      title: msg`Open to builders`,
      text: msg`Written for students and independent makers. This demo does not represent a sponsor, jury, or university.`,
    },
  ];

  return (
    <section
      id="about"
      className="flex items-center justify-center min-h-screen py-20 text-white sm:py-28 lg:py-36 bg-muted/30"
    >
      <div className="container w-full max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-4xl font-bold text-center uppercase text-shadow-lg text-shadow-primary md:text-5xl"
        >
          {i18n._(msg`ABOUT`)}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 text-base leading-relaxed text-justify md:text-lg text-foreground/80"
        >
          {i18n._(
            msg`DreamForge is an independent portfolio project: a hackathon event platform for developers, designers, and people who enjoy building with technology.`
          )}{" "}
          {i18n._(
            msg`The sample event below shows how a landing page can present a slogan, challenge tracks, a schedule, and registration.`
          )}{" "}
          <span className="font-semibold text-primary">
            {i18n._(msg`Build Ideas Into Reality`)}
          </span>
          .
        </motion.p>

        <div className="grid gap-8 md:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                delay: 0.2 + i * 0.15,
                duration: 0.7,
                ease: "easeOut",
              }}
              viewport={{ amount: 0.3 }}
            >
              <FrameCard
                frameType={item.frameType}
                className="relative overflow-visible p-5 h-full flex flex-col rounded-xl group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <motion.span
                  initial={{ y: 0 }}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  className="absolute top-3 right-5 text-[70px] md:text-[90px] font-extrabold text-primary/10 select-none pointer-events-none group-hover:text-primary/20 transition-all duration-300 group-hover:-translate-y-5"
                >
                  {item.id}
                </motion.span>

                <h3 className="relative z-10 w-full mb-4 text-xl font-bold text-left transition-colors duration-300 md:text-2xl group-hover:text-primary">
                  {i18n._(item.title)}
                </h3>

                <p className="relative z-10 text-base leading-relaxed transition-colors duration-300 md:text-lg text-foreground/80 group-hover:text-foreground">
                  {i18n._(item.text)}
                </p>
              </FrameCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
