// app/page.js
import Link from 'next/link';
import { paths } from '@/data/paths';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href={paths.news}>Go to News</Link>
    </div>
  );
}
