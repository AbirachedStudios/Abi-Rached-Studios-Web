// app/news/page.js
import Link from 'next/link';
import { paths } from '@/data/paths';

const News = () => {
  const newsList = [
    { id: '1', title: 'News Article 1' },
    { id: '2', title: 'News Article 2' },
  ];

  return (
    <div>
      <h1>News Page</h1>
      <ul>
        {newsList.map(news => (
          <li key={news.id}>
            <Link href={`${paths.news}/${news.id}`}>{news.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
