"use client";

import Link from "next/link";
import { paths } from "@/data/paths";
import { newsList } from "@/data/newsItems";
import { useLanguage } from "@/context/LanguageContext";

export default function News() {
  console.log(useLanguage); 

  try {
    const { lang } = useLanguage();
    console.log(lang); 
    return (
      
      <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">News Page</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {newsList.map((news) => (
          <li key={news.id}>
            <Link href={`${paths.news}/${news.id}`}>
              {/* <a className="block p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"> */}
                <h2 className="text-lg font-semibold mb-2">
                  {lang === "es" ? news.title.es : news.title.default}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(news.publicationDate).toLocaleDateString(
                    lang === "es" ? "es-ES" : "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
                <p>
                {lang === "es" ? news.newsBody.es : news.newsBody.default}
                </p>
              {/* </a> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
      
    );
  } catch (error) {
    console.error("Error using useLanguage:", error);
    return <div>Error loading language contextaas</div>;
  }
}
