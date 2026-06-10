import { MotionRoot } from "@/components/motion/motion-root";
import { GridLayer } from "@/components/ui/grid-layer";
import { SiteNav } from "@/components/ui/site-nav";
import { SiteFooter } from "@/components/ui/site-footer";
import { Hero } from "@/components/sections/hero";
import { Origin } from "@/components/sections/origin";
import { Craft } from "@/components/sections/craft";
import { Toolkit } from "@/components/sections/toolkit";
import { Impact } from "@/components/sections/impact";
import { Human } from "@/components/sections/human";
import { Connect } from "@/components/sections/connect";

export default function Home() {
  return (
    <MotionRoot>
      <GridLayer />
      <SiteNav />
      <main className="relative z-10">
        <Hero />
        <Origin />
        <Craft />
        <Toolkit />
        <Impact />
        <Human />
        <Connect />
      </main>
      <SiteFooter />
    </MotionRoot>
  );
}
