"use client";

import Hero from "@/sections/teams/hero/hero";
import TeamCards from "@/sections/teams/cards/index";
import TeamTabs from "@/sections/teams/tabs/index";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroTeam() {
  const { lang } = useLanguage();

  return (
    <div className="text-primary-100">
      <Hero />
      <TeamTabs />
      <TeamCards />
    </div>
  );
}
