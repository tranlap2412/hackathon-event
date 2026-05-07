"use client";

import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Portal,
} from "@/components/ui/dialog";
import FrameCard from "@/components/ui/frame-card";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Tracks() {
  const { i18n } = useLingui();

  const tracks = [
    {
      id: "Track 1",
      title: msg`Origin Tracing DApp`,
      short: msg`Trace a product from origin to the person who receives it`,
      content: (
        <>
          <h4 className="mt-4 mb-2 font-semibold">
            {i18n._(msg`Description:`)}
          </h4>
          <p>
            {i18n._(
              msg`Design a sample application that records where a product or asset has been, from origin to the person who receives it. The interface should make each step easy to check and hard to quietly rewrite.`
            )}
          </p>

          <h4 className="mt-4 mb-2 font-semibold">
            {i18n._(msg`Priority Social Issues:`)}
          </h4>
          <ul className="ml-6 space-y-1 list-disc">
            <li>
              {i18n._(
                msg`Ensure the authenticity and transparency of product/asset information from origin to end consumer.`
              )}
            </li>
            <li>
              {i18n._(
                msg`Prevent counterfeiting, fraud in supply chains, protecting consumer rights and business reputation.`
              )}
            </li>
            <li>
              {i18n._(
                msg`Enhance user trust in products/assets through immutable data on the blockchain.`
              )}
            </li>
          </ul>

          <h4 className="mt-4 mb-2 font-semibold">
            {i18n._(msg`Suggestions:`)}
          </h4>
          <ul className="ml-6 space-y-1 list-disc">
            <li>
              {i18n._(
                msg`Record the main stages, such as production, transport, inspection, and handoff, in a way a reviewer can follow.`
              )}
            </li>
            <li>
              {i18n._(
                msg`Integrate QR codes or NFC for easy scanning and retrieval of product/asset origin information.`
              )}
            </li>
            <li>
              {i18n._(
                msg`Use Oracles to reliably bring off-chain data (e.g., temperature, humidity, GPS location) onto the blockchain.`
              )}
            </li>
            <li>
              {i18n._(
                msg`Develop an intuitive and user-friendly UI/UX for both businesses and consumers.`
              )}
            </li>
          </ul>
        </>
      ),
      frameType: "1",
    },
    {
      id: "Track 2",
      title: msg`DEX & Bridge`,
      short: msg`Build a DEX or Cross-Chain Bridge`,
      content: (
        <>
          <h4 className="mt-4 mb-2 font-semibold">
            {i18n._(msg`Description:`)}
          </h4>
          <p>
            {i18n._(
              msg`Choose one of these sample directions:`
            )}
          </p>
          <p className="mt-2">
            <strong>{i18n._(msg`a) Decentralized Exchange (DEX):`)}</strong>{" "}
            {i18n._(
              msg`Enable users to trade tokens securely and transparently without intermediaries. The DEX must support features like token swapping, liquidity farming, and staking, while optimizing transaction costs and processing speed.`
            )}
          </p>
          <p className="mt-2">
            <strong>{i18n._(msg`b) Cross-Chain Bridge:`)}</strong>{" "}
            {i18n._(
              msg`Sketch a bridge that moves a sample asset between two networks. Explain the checks that would keep a transfer from being accepted twice.`
            )}
          </p>

          <h4 className="mt-4 mb-2 font-semibold">
            {i18n._(msg`Priority Social Issues:`)}
          </h4>
          <ul className="ml-6 space-y-1 list-disc">
            <li>
              {i18n._(
                msg`For DEX: Provide a decentralized trading platform, reducing centralization risks and enhancing user control over assets.`
              )}
            </li>
            <li>
              {i18n._(
                msg`For a bridge: show how two networks could reference the same sample asset without a single shared operator.`
              )}
            </li>
            <li>
              {i18n._(
                msg`Optimize transaction/transfer costs and speed for both DEX and Bridge.`
              )}
            </li>
          </ul>

          <h4 className="mt-4 mb-2 font-semibold">
            {i18n._(msg`Suggestions:`)}
          </h4>
          <ul className="ml-6 space-y-1 list-disc">
            <li>
              {i18n._(
                msg`For DEX: Implement an Automated Market Maker (AMM) or Order Book model. Optimize Smart Contracts to reduce gas fees and improve transaction performance.`
              )}
            </li>
            <li>
              {i18n._(
                msg`For Bridge: Use security mechanisms like Multi-signature, Timelock, or Oracles to verify cross-chain transactions. Ensure data integrity during transfers.`
              )}
            </li>
            <li>
              {i18n._(
                msg`Integrate popular crypto wallets and provide a user-friendly interface.`
              )}
            </li>
          </ul>
        </>
      ),
      frameType: "2",
    },
    {
      id: "Track 3",
      title: msg`AI & IoT`,
      short: msg`Train AI or Develop IoT with Blockchain`,
      content: (
        <>
          <h4 className="mt-4 mb-2 font-semibold">
            {i18n._(msg`Description:`)}
          </h4>
          <p>
            {i18n._(
              msg`Combine a model and a sensor feed in one sample product. This track has two directions:`
            )}
          </p>
          <p className="mt-2">
            <strong>{i18n._(msg`a) Shared model training:`)}</strong>{" "}
            {i18n._(
              msg`Build a decentralized AI training system, leveraging data from multiple sources (users, organizations) securely. Training results (model weights) can be stored on the blockchain to ensure authenticity and traceability.`
            )}
          </p>
          <p className="mt-2">
            <strong>{i18n._(msg`b) IoT Devices with AI & Blockchain:`)}</strong>{" "}
            {i18n._(
              msg`Describe sensors that collect a reading, a model that flags an unusual value, and a record that shows the reading was not edited later.`
            )}
          </p>

          <h4 className="mt-4 mb-2 font-semibold">
            {i18n._(msg`Priority Social Issues:`)}
          </h4>
          <ul className="ml-6 space-y-1 list-disc">
            <li>
              {i18n._(
                msg`For AI Training: Protect user data privacy during AI training, encouraging fair and transparent data contributions from the community.`
              )}
            </li>
            <li>
              {i18n._(
                msg`For IoT: Ensure the integrity and authenticity of data collected from IoT devices, preventing tampering or manipulation.`
              )}
            </li>
            <li>
              {i18n._(
                msg`Optimize resource and energy usage for both AI training and IoT device operations.`
              )}
            </li>
          </ul>

          <h4 className="mt-4 mb-2 font-semibold">
            {i18n._(msg`Suggestions:`)}
          </h4>
          <ul className="ml-6 space-y-1 list-disc">
            <li>
              {i18n._(
                msg`For AI Training: Apply Federated Learning for decentralized AI model training without centralizing raw data. Use Smart Contracts to manage data contributions and reward distribution.`
              )}
            </li>
            <li>
              {i18n._(
                msg`For sensors: sketch a small dashboard that shows the latest reading, who published it, and why a value was flagged.`
              )}
            </li>
          </ul>
        </>
      ),
      frameType: "3",
    },
    {
      id: "Track 4",
      title: msg`Consensus Algorithm`,
      short: msg`Research New Consensus Mechanisms`,
      content: (
        <>
          <h4 className="mt-4 mb-2 font-semibold">
            {i18n._(msg`Description:`)}
          </h4>
          <p>
            {i18n._(
              msg`Research and develop advanced algorithms combining the power of Artificial Intelligence (AI) and Blockchain to address complex problems in various domains. The algorithm should leverage Machine Learning for data processing and analysis (on-chain/off-chain), while utilizing blockchain's transparency, security, and decentralization to enhance reliability and efficiency.`
            )}
          </p>

          <h4 className="mt-4 mb-2 font-semibold">
            {i18n._(msg`Priority Social Issues:`)}
          </h4>
          <ul className="ml-6 space-y-1 list-disc">
            <li>
              {i18n._(
                msg`Enhance real-time monitoring, data analysis, and anomaly detection in distributed systems.`
              )}
            </li>
            <li>
              {i18n._(
                msg`Optimize blockchain performance and security by integrating AI into consensus mechanisms or network management.`
              )}
            </li>
            <li>
              {i18n._(
                msg`Predict trends, user behavior, or risks in supply chains and finance, enabling accurate and timely decisions.`
              )}
            </li>
          </ul>

          <h4 className="mt-4 mb-2 font-semibold">
            {i18n._(msg`Suggestions:`)}
          </h4>
          <ul className="ml-6 space-y-1 list-disc">
            <li>
              {i18n._(
                msg`Develop Machine Learning algorithms (e.g., Random Forest, Neural Networks) to predict trends or detect anomalous transactions on the blockchain.`
              )}
            </li>
            <li>
              {i18n._(
                msg`Research and optimize consensus mechanisms (e.g., Proof of Stake, Proof of Work) by integrating AI to improve performance and reduce energy consumption.`
              )}
            </li>
            <li>
              {i18n._(
                msg`Build AI Oracles to provide reliable off-chain data for Smart Contracts, expanding blockchain applications.`
              )}
            </li>
            <li>
              {i18n._(
                msg`Ensure algorithm transparency and verifiability by storing key parameters or results on the blockchain.`
              )}
            </li>
          </ul>
        </>
      ),
      frameType: "4",
    },
    {
      id: "Track 5",
      title: msg`Identity & Tokenization`,
      short: msg`Electronic Identity Verification and Asset Tokenization`,
      content: (
        <>
          <h4 className="mt-4 mb-2 font-semibold">
            {i18n._(msg`Description:`)}
          </h4>
          <p>
            {i18n._(
              msg`Explore one of these two sample problems:`
            )}
          </p>
          <p className="mt-2">
            <strong>{i18n._(msg`a) Electronic KYC (eKYC):`)}</strong>{" "}
            {i18n._(
              msg`Provide a decentralized, highly secure electronic identity verification solution, allowing users to verify personal information (ID card, passport) and store it as a hash on the blockchain, ensuring privacy and controlled data sharing.`
            )}
          </p>
          <p className="mt-2">
            <strong>{i18n._(msg`b) Security Tokenization:`)}</strong>{" "}
            {i18n._(
              msg`Describe how a sample asset could be represented, transferred, and checked before it changes hands. Keep ownership easy to read in the interface.`
            )}
          </p>

          <h4 className="mt-4 mb-2 font-semibold">
            {i18n._(msg`Priority Social Issues:`)}
          </h4>
          <ul className="ml-6 space-y-1 list-disc">
            <li>
              {i18n._(
                msg`For eKYC: Provide a secure, efficient, and private identity verification method, reducing risks of data breaches and manual processes.`
              )}
            </li>
            <li>
              {i18n._(
                msg`For Tokenization: Enhance financial inclusion for small investors, reduce transaction costs, and increase transparency in the digital asset market.`
              )}
            </li>
            <li>
              {i18n._(
                msg`Show consent clearly before any identity detail or asset record is shared.`
              )}
            </li>
          </ul>

          <h4 className="mt-4 mb-2 font-semibold">
            {i18n._(msg`Suggestions:`)}
          </h4>
          <ul className="ml-6 space-y-1 list-disc">
            <li>
              {i18n._(
                msg`For eKYC: Use Zero-Knowledge Proofs (ZKP) to protect user privacy during identity verification. Build a user-friendly interface for uploading and managing information.`
              )}
            </li>
            <li>
              {i18n._(
                msg`For tokenization: map issue, transfer, and redeem as three states a reviewer can inspect.`
              )}
            </li>
            <li>
              {i18n._(
                msg`Build a portal or dashboard to manage and track issued Security Tokens.`
              )}
            </li>
          </ul>
        </>
      ),
      frameType: "1",
    },
  ];

  return (
    <section
      id="tracks"
      className="flex flex-col items-center justify-center min-h-screen py-20 sm:py-28 lg:py-36"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12 text-4xl font-bold text-center uppercase text-shadow-lg text-shadow-primary md:text-5xl"
      >
        {i18n._(msg`TRACKS`)}
      </motion.h2>

      <div className="container grid w-full max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* First 3 Tracks */}
        {tracks.slice(0, 3).map((track, i) => (
          <DialogRoot key={track.id}>
            <DialogTrigger className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                viewport={{ amount: 0.3 }}
              >
                <FrameCard
                  frameType={track.frameType}
                  className="h-60 flex flex-col items-center justify-center group transition-all duration-300 hover:scale-[1.05] hover:shadow-xl cursor-pointer text-center"
                >
                  <div className="mb-2 text-base font-bold tracking-wide uppercase text-primary/80">
                    {track.id}
                  </div>
                  <h3 className="text-lg font-semibold transition-colors md:text-xl group-hover:text-primary">
                    {i18n._(track.title)}
                  </h3>
                  <div className="mt-2 overflow-hidden transition-all duration-500 ease-in-out opacity-0 max-h-0 group-hover:max-h-40 group-hover:opacity-100">
                    <p className="text-sm text-foreground/70">
                      {i18n._(track.short)}
                    </p>
                    <div className="flex items-center justify-end gap-1 mt-2 ml-auto text-xs font-medium transition-opacity duration-300 opacity-0 text-primary group-hover:opacity-100">
                      <Info className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      <span>{i18n._(msg`View details`)}</span>
                    </div>
                  </div>
                </FrameCard>
              </motion.div>
            </DialogTrigger>

            <Portal>
              <DialogBackdrop />
              <DialogPositioner>
                <DialogContent className="sm:max-w-5xl w-full h-[80vh] flex flex-col">
                  <DialogCloseTrigger />
                  <DialogTitle>
                    {track.id}: {i18n._(track.title)}
                  </DialogTitle>
                  <DialogDescription className="z-10 flex-1 pr-2 overflow-y-auto custom-scroll">
                    {track.content}
                  </DialogDescription>
                </DialogContent>
              </DialogPositioner>
            </Portal>
          </DialogRoot>
        ))}

        {/* Wrapper for Tracks 4 and 5 */}
        <div className="flex justify-center gap-8 max-sm:w-full max-sm:flex-col lg:col-span-3">
          {tracks.slice(3, 5).map((track, i) => (
            <DialogRoot key={track.id}>
              <DialogTrigger className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: (i + 3) * 0.15,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  viewport={{ amount: 0.3 }}
                >
                  <FrameCard
                    frameType={track.frameType}
                    className="h-60 flex flex-col items-center justify-center group transition-all duration-300 hover:scale-[1.05] hover:shadow-xl cursor-pointer text-center"
                  >
                    <div className="mb-2 text-sm font-bold tracking-wide uppercase text-primary/80">
                      {track.id}
                    </div>
                    <h3 className="text-lg font-semibold transition-colors md:text-xl group-hover:text-primary">
                      {i18n._(track.title)}
                    </h3>
                    <div className="mt-2 overflow-hidden transition-all duration-500 ease-in-out opacity-0 max-h-0 group-hover:max-h-40 group-hover:opacity-100">
                      <p className="text-sm text-foreground/70">
                        {i18n._(track.short)}
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-2 ml-auto text-xs font-medium transition-opacity duration-300 opacity-0 text-primary group-hover:opacity-100">
                        <Info className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                        <span>{i18n._(msg`View details`)}</span>
                      </div>
                    </div>
                  </FrameCard>
                </motion.div>
              </DialogTrigger>

              <Portal>
                <DialogBackdrop />
                <DialogPositioner>
                  <DialogContent className="sm:max-w-5xl w-full h-[80vh] flex flex-col">
                    <DialogCloseTrigger />
                    <DialogTitle>
                      {track.id}: {i18n._(track.title)}
                    </DialogTitle>
                    <DialogDescription className="z-10 flex-1 pr-2 overflow-y-auto custom-scroll">
                      {track.content}
                    </DialogDescription>
                  </DialogContent>
                </DialogPositioner>
              </Portal>
            </DialogRoot>
          ))}
        </div>
      </div>

      {/* Rules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        viewport={{ once: true }}
        className="container w-full max-w-4xl mt-12"
      >
        <FrameCard
          frameType="1"
          className="flex flex-col items-center justify-center px-2 text-center group !h-auto"
        >
          <h3 className="text-lg font-semibold transition-colors md:text-2xl group-hover:text-primary">
            {i18n._(msg`Rules`)}
          </h3>
          <ExpandableRules />
        </FrameCard>
      </motion.div>
    </section>
  );
}

const rulesText = msg`Sample projects should be original work by the team.
You may reference public technical writing while shaping an idea, and you should respect copyright.
This page is a portfolio demo. Using the form does not enter a live competition or transfer any rights.
Challenge briefs and the sample schedule can change as the demo evolves.`;

const noteText = msg`These challenge briefs are sample content for the DreamForge portfolio demo. They are not a live competition ruleset.`;

export function ExpandableRules() {
  const { i18n } = useLingui();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full mt-4 text-left">
      <p
        className={`text-base leading-relaxed md:text-lg text-foreground/80 whitespace-pre-line transition-all duration-300 ${
          expanded ? "line-clamp-none" : "line-clamp-3"
        }`}
      >
        {i18n._(rulesText)}
      </p>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="note"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <p className="mt-5 text-base leading-relaxed md:text-lg text-white/80">
              <span className="font-semibold text-primary">
                {i18n._(msg`Note:`)}
              </span>{" "}
              {i18n._(noteText)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center">
        <Button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-sm font-medium hover:underline"
        >
          {expanded ? i18n._(msg`Collapse ▲`) : i18n._(msg`Read more ▼`)}
        </Button>
      </div>
    </div>
  );
}
