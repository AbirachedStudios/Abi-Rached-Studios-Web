// app/page.js
import Link from 'next/link';
import { paths } from '@/data/paths';
import { LanguageProvider } from "@/context/LanguageContext";
import HeroSection from '@/sections/homepage/hero';
import Head from 'next/head';
import BentoSection from '@/sections/homepage/bento';
import Contact from '@/sections/homepage/contact';
import Talents from '@/sections/homepage/talents';
import CurrentGame from '@/sections/homepage/currentGame';
import NewsSectionHomepage from '@/sections/homepage/news';


export default function Home() {
  return (
    
    <div>
      <Head>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Abi Rached Studios" />
        <meta name="publisher" content="Abi Rached Studios" />
      </Head>
      <HeroSection />
      
      <BentoSection />
      <Talents />
      <CurrentGame />
      <Link href={paths.news}>Go to News</Link>
      <Link href={paths.terms}>Go to Terms</Link>
      <NewsSectionHomepage />
      <Contact />
    </div>
  );
}
