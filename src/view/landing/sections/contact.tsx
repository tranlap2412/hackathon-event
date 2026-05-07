"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { useEffect, useState } from "react";

export default function Contact() {
  const { i18n } = useLingui();
  const [mounted, setMounted] = useState(false);
  const [keptLocally, setKeptLocally] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const motionProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center min-h-screen py-20"
    >
      <motion.h2
        {...motionProps}
        className="mb-16 text-4xl font-bold text-center text-shadow-lg text-shadow-primary md:text-5xl"
      >
        {i18n._(msg`Contact`)}
      </motion.h2>

      <div className="container grid w-full max-w-6xl gap-16 lg:grid-cols-10">
        <motion.form
          {...motionProps}
          className="space-y-6 lg:col-span-6"
          onSubmit={(event) => {
            event.preventDefault();
            setKeptLocally(true);
          }}
        >
          <h3 className="mb-4 text-xl font-semibold text-primary">
            {i18n._(msg`Send us a message`)}
          </h3>

          <div>
            <label className="block mb-2 text-sm font-medium text-foreground/80">
              {i18n._(msg`Full Name`)}
            </label>
            <Input
              type="text"
              placeholder={i18n._(msg`Enter your full name`)}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-foreground/80">
                {i18n._(msg`Phone Number`)}
              </label>
              <Input
                type="tel"
                placeholder={i18n._(msg`Enter your phone number`)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-foreground/80">
                {i18n._(msg`Email`)}
              </label>
              <Input type="email" placeholder={i18n._(msg`Enter your email`)} />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-foreground/80">
              {i18n._(msg`Question`)}
            </label>
            <Textarea placeholder={i18n._(msg`Enter your question`)} rows={5} />
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold">
            {i18n._(msg`Send`)}
          </Button>
          {keptLocally && (
            <p className="text-sm text-foreground/70" role="status">
              {i18n._(
                msg`This demo keeps the form on this page. The message is not delivered anywhere.`
              )}
            </p>
          )}
        </motion.form>

        <motion.div
          {...motionProps}
          className="flex flex-col items-center lg:col-span-4 lg:items-start"
        >
          <h3 className="mb-2 text-2xl font-bold text-primary [font-family:var(--font-orbitron)]">
            DREAMFORGE
          </h3>
          <p className="max-w-sm mb-6 text-sm text-center lg:text-left text-foreground/70">
            {i18n._(
              msg`DreamForge has no public phone line, inbox, or social account. The form is a UI preview for this portfolio.`
            )}
          </p>
          <p className="max-w-sm text-sm text-center lg:text-left text-foreground/60">
            {i18n._(
              msg`Do not enter real personal data. Nothing is stored on a server.`
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
