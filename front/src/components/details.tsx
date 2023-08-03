"use client";

import { useGetNewsByIdQuery } from "@/redux/services/newsApi";

interface ArticleProps {
  articleId: string;
}

const Detail: React.FC<ArticleProps> = ({ articleId }) => {
  if (!articleId) {
    return <div>No article ID provided.</div>;
  }
  const { data, isLoading, isError } = useGetNewsByIdQuery(articleId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching article</div>;
  }

  if (!data) {
    return <div>Article not found</div>;
  }

  const { id, title, content, image } = data;

  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <img src={image} alt={title} />
    </div>
  );
};

export default Detail;
