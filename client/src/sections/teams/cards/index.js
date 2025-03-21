"use client";
import jane from "@/assets/img/jane.png";
import ig from "@/assets/icons/instagram.svg";
import li from "@/assets/icons/linkedin.svg";
import x from "@/assets/icons/x.svg";
import be from "@/assets/icons/behance.svg";

import Image from "next/image";
export default function TeamCards() {
  return (
    <div className="bg-tertiary-30 w-[316px] h-[398px] py-[27px] px-8 flex flex-col items-center justify-between rounded-md shadow-[0px_4px_40px_rgba(0,0,0,0.1)] gap-[16px]">
      <Image src={jane} width={80} height={80} />
      <div>
        <h2 className="text-primary-99 text-headline-small text-center">
          Jane Doe
        </h2>
        <h3 className="text-center text-title-medium text-green-program">
          Project Manager
        </h3>
        <p className="text-primary-99 text-body-large text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          ullamcorper suscipit vulputate. Vivamus feugiat pellentesque enim, vel
          blandit tellus viverra eget.
        </p>
      </div>
      <div className="flex gap-[24px]">
        <Image
          src={ig}
          className="bg-green-program p-[3.5px] w-[35px] rounded-md"
        />
        <Image
          src={li}
          className="bg-green-program p-[3.5px] w-[35px] rounded-md"
        />
        <Image
          src={x}
          className="bg-green-program p-[3.5px] w-[35px] rounded-md"
        />
        <Image
          src={be}
          className="bg-green-program p-[3.5px] w-[35px] rounded-md"
        />
      </div>
    </div>
  );
}
