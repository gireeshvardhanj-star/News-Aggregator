import React from "react";

function readingTime(text) {
  const words = text ? text.trim().split(/\s+/).length : 0;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

function ArticleReader({ article }) {
  if (!article) {
    return (
      <section className="reader" aria-label="Article reader">
        <p className="status">Select an article to start reading.</p>
      </section>
    );
  }

  return (
    <section className="reader" aria-label="Article reader">
      <h1 className="reader-title">{article.title}</h1>
      <p className="reader-meta">
        <span className={`cat-badge cat-badge--${article.category.toLowerCase()}`}>
          {article.category}
        </span>
        {article.author} • {article.date}{" "}
        <span className="reading-time">{readingTime(article.body)}</span>
      </p>
      <hr />
      <div className="reader-body">{article.body}</div>
      {article.url && (
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="read-link"
          style={{ display: "inline-block", marginTop: "16px" }}
        >
          Read full article at source →
        </a>
      )}
    </section>
  );
}

export default ArticleReader;
