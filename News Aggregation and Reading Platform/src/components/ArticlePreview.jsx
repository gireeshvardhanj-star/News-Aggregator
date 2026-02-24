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
      <button type="button" className="read-link">
        Read article →
      </button>
    </article>
  );
}

export default ArticlePreview;
