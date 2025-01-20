"use client";

import { useParams } from "next/navigation";
import { positionsItems } from "@/data/positions/positionsItems";
import Breadcrumb from "@/components/commons/Breacrumbs";

const normalizeTitleForUrl = (title) => {
  return title.toLowerCase().replace(/ /g, "-");
};

const PositionDetails = () => {
  const { url } = useParams();

  const position = positionsItems.find(
    (item) => normalizeTitleForUrl(item.title.default) === url
  );

  if (!position) {
    return (
      <div className="text-white pt-[200px]">
        <h1 className="text-display-large">Position not found</h1>
        <p>We couldn't find the position you're looking for.</p>
      </div>
    );
  }

  const breadcrumbPaths = [
    { label: "Home", url: "/" },
    { label: "Positions", url: "/positions" },
    { label: position.title.default, url: null }, // Última página
  ];

  return (
    <div className="text-primary-100 pt-[200px] px-6">
      <Breadcrumb paths={breadcrumbPaths} />
      <h1 className="text-headline-large text-gold">{position.title.default}</h1>
      <p className="text-headline-small">{position.info.default}</p>
      <p>{position.info.es}</p>
      <img
        src={`/assets/icons/${position.icon}`}
        alt={`${position.title.default} Icon`}
        className="w-[120px] h-[120px] mt-4"
      />
    </div>
  );
};

export default PositionDetails;
