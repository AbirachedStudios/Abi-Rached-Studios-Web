"use client";

import { useState } from "react";
import { tabs } from "@/data/team/tabs";
import { useLanguage } from "@/context/LanguageContext";

export default function TeamTabs() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState(tabs[0].id); 

  return (
    <div className="flex justify-start gap-4 flex-wrap px-6 mb-12">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-md text-title-medium cursor-pointer transition border-[1.5px]
              ${
                isActive
                  ? `text-primary-0 bg-${tab.colorClass} border-${tab.colorClass}`
                  : `text-primary-100 bg-transparent border-${tab.colorClass}`
              }
              hover:brightness-110
            `}
          >
            {lang === "es" ? tab.name.es : tab.name.default}
          </div>
        );
      })}
    </div>
  );
}
