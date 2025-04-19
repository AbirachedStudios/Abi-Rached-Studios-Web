"use client";
import Image from "next/image";
import { teamMember } from "@/data/team/teamMembers";
import { useLanguage } from "@/context/LanguageContext";
import avatar from "@/assets/icons/avatar.png";
import ig from "@/assets/icons/instagram.svg";
import li from "@/assets/icons/linkedin.svg";
import x from "@/assets/icons/x.svg";
import be from "@/assets/icons/behance.svg";

const socialIcons = {
  instagram: ig,
  linkedin: li,
  twitter: x,
  behance: be,
};

export default function TeamCards() {
  const { lang } = useLanguage();
  return (
    <div className="flex flex-wrap gap-6 justify-start px-6 mb-12">
      {teamMember.map((member) => (
        <div
          key={member.id}
          className="w-[300px] h-[398px] py-[27px] px-8 flex flex-col items-center justify-between rounded-md shadow-[0px_4px_40px_rgba(0,0,0,0.1)] gap-[16px]"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        >
          <Image
            src={member.image ? member.image : avatar}
            width={80}
            height={80}
            alt={member.name}
          />
          <div>
            <h2 className="text-primary-100 text-headline-small text-center">
              {member.name}
            </h2>
            <h3 className={`text-center text-title-medium text-${member.colorClass}`}>
              {lang === "es" ? member.position.es : member.position.default}
            </h3>
            <p className="text-primary-99 text-body-large text-center">
              {lang === "es" ? member.info.es : member.info.default}
            </p>
          </div>
          <div className="flex gap-[24px]">
            {Object.entries(socialIcons).map(([key, icon]) => (
              <Image
                key={key}
                src={icon}
                alt={`${member.name} ${key}`}
                className={`bg-${member.colorClass} p-[3.5px] w-[35px] rounded-md`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
