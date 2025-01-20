"use client";

import Link from "next/link";

const Breadcrumb = ({ paths }) => {
  return (
    <nav aria-label="breadcrumb" className="text-sm text-gray-400">
      <ul className="flex items-center gap-2">
        {paths.map((path, index) => (
          <li key={index} className="flex items-center">
            {path.url ? (
              <Link href={path.url}>
                <p className="text-headline-small text-primary-100 hover:text-primary-60">
                  {path.label}
                </p>
              </Link>
            ) : (
              <span className="text-headline-small text-gold">
                {path.label}
              </span>
            )}
            {index < paths.length - 1 && (
              <span className="mx-2 text-primary-100">|</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
