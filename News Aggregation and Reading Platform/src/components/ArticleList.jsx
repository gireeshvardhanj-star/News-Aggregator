import React from "react";
import ArticlePreview from "./ArticlePreview.jsx";

function ArticleList({
  articles,
  isLoading,
  error,
  onSelect,
  selectedArticleId,
}) {
  if (isLoading) return <div className="status">Loading articles…</div>;
  if (error) return <div className="status error">Failed to load news.</div>;
  if (!articles.length) return <div className="status empty">No articles found.</div>;

  return (
    <section className="article-list" aria-label="News articles">
      {articles.map((article) => (
        <ArticlePreview
          key={article.id}
          article={article}
          isActive={article.id === selectedArticleId}
          onClick={() => onSelect(article.id)}
        />
      ))}
    </section>
  );
}

export default ArticleList;
