// app/news/[id]/page.js
"use client";

import { useParams } from 'next/navigation';

const NewsArticle = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>News Article {id}</h1>
      <p>Content for news article {id} goes here.</p>
    </div>
  );
};

export default NewsArticle;
