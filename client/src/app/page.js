// app/page.js
import Link from 'next/link';
import { paths } from '@/data/paths';
import { LanguageProvider } from "@/context/LanguageContext";
import HeroSection from '@/sections/hero';
import Head from 'next/head';
import BentoSection from '@/sections/bento';
import Contact from '@/sections/contact';
import Talents from '@/sections/talents';


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
      <Link href={paths.news}>Go to News</Link>
      <Link href={paths.terms}>Go to Terms</Link>
      <Contact />
    </div>
  );
}
