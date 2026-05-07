"use client";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/view/landing/sections/hero"), {
  ssr: false,
});
const About = dynamic(() => import("@/view/landing/sections/about"), {
  ssr: false,
});
const Tracks = dynamic(() => import("@/view/landing/sections/tracks"), {
  ssr: false,
});
const Prizes = dynamic(() => import("@/view/landing/sections/prizes"), {
  ssr: false,
});
const Timeline = dynamic(() => import("@/view/landing/sections/timeline"), {
  ssr: false,
});
const Contact = dynamic(() => import("@/view/landing/sections/contact"), {
  ssr: false,
});
const Register = dynamic(() => import("./sections/register"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <main className="w-full overflow-hidden">
      <Hero />
      <About />
      <Tracks />
      <Prizes />
      <Timeline />
      <Register />
      <Contact />
    </main>
  );
}
