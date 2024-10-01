// app/page.js
import Link from 'next/link';
import { paths } from '@/data/paths';
import { LanguageProvider } from "@/context/LanguageContext";
import HeroSection from '@/sections/hero';


export default function Home() {
  return (
    <div>
      <HeroSection />
      <Link href={paths.news}>Go to News</Link>
      <Link href={paths.terms}>Go to Terms</Link>
    </div>
  );
}
