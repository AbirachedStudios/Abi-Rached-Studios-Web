"use client";

import Hero from "@/sections/teams/hero/hero";
import TeamSection from "@/sections/teams/teams sections/index";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroTeam() {
  const { lang } = useLanguage();

  return (
    <div className="text-primary-100">
      <Hero />
      <TeamSection />
      
    </div>
  );
}
