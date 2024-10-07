// app/page.js
import Link from 'next/link';
import { paths } from '@/data/paths';
import { LanguageProvider } from "@/context/LanguageContext";
import HeroSection from '@/sections/hero';
import Head from 'next/head';
import BentoSection from '@/sections/bento';


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
      <Link href={paths.news}>Go to News</Link>
      <Link href={paths.terms}>Go to Terms</Link>
    </div>
  );
}
