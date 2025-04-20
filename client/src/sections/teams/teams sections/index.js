"use client";

import { useState } from "react";
import { tabs } from "@/data/team/tabs";
import { teamMember } from "@/data/team/teamMembers";
import TeamTabs from "@/sections/teams/tabs/index";
import TeamCards from "@/sections/teams/cards/index";

export default function TeamSection() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const activeTabTag = tabs.find((tab) => tab.id === activeTab)?.tag;

  const filteredMembers =
    activeTabTag === "all"
      ? teamMember
      : teamMember.filter((member) =>
          member.tags.map((tag) => tag.toLowerCase()).includes(activeTabTag)
        );

  return (
    <>
      <TeamTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <TeamCards members={filteredMembers} />
    </>
  );
}
