import React from "react";

function ArticlePreview({ article, isActive, onClick }) {
  return (
    <article
      className={`article-preview ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <h3 className="article-title">{article.title}</h3>
      <p className="article-meta">
        {article.category} • {article.author} • {article.date}
      </p>
      <p className="article-summary">{article.summary}</p>
      {article.url && (
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="read-link"
          onClick={(e) => e.stopPropagation()}
        >
          Read article →
        </a>
      )}
    </article>
  );
}

export default ArticlePreview;
