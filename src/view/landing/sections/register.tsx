"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RegisterModal } from "../modals/register-modal";
import { SubmitModal } from "../modals/submit-modal";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

export default function Register() {
  const { i18n } = useLingui();
  const [openRegister, setOpenRegister] = useState(false);
  const [openSubmit, setOpenSubmit] = useState(false);

  return (
    <section
      id="register"
      className="flex flex-col items-center justify-center min-h-screen py-20 sm:py-28 lg:py-36 bg-muted/30"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-4xl font-bold text-center text-shadow-lg text-shadow-primary md:text-5xl"
      >
        {i18n._(msg`Register & Submit`)}
      </motion.h2>

      {/* Short description */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl mb-12 text-base leading-relaxed text-center md:text-lg text-foreground/80"
      >
        <span className="font-semibold text-primary">DreamForge</span>{" "}
        {i18n._(
          msg`is a sample hackathon. Preview the registration and submission flows. Both stay in this browser.`
        )}
      </motion.p>
      {/* CTA buttons */}
      <div className="flex flex-col gap-5 sm:flex-row">
        <Button
          className="w-64 !text-lg sm:w-56 h-14"
          onClick={() => setOpenRegister(true)}
        >
          {i18n._(msg`Register Now`)}
        </Button>
        <Button
          variant="accent"
          className="w-64 !text-lg sm:w-56 h-14"
          onClick={() => setOpenSubmit(true)}
        >
          {i18n._(msg`Submit Project`)}
        </Button>
      </div>

      {/* Modals  */}
      <RegisterModal open={openRegister} onOpenChange={setOpenRegister} />
      <SubmitModal open={openSubmit} onOpenChange={setOpenSubmit} />
    </section>
  );
}
