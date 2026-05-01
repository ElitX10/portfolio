import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Timeline } from "@/components/sections/timeline";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Timeline />
      <Skills />
      <Contact />
    </>
  );
}
