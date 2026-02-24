import React from "react";
import { useParams, Link } from "react-router-dom";
import { articles } from "../Data/newsData.js";
import ArticleReader from "../components/ArticleReader.jsx";

function ArticleDetailPage() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === Number(id)) || null;

  return (
    <div className="app-shell single">
      <header className="topbar">
        <Link to="/" className="back-link">← Back to news</Link>
      </header>
      <main className="main">
        <ArticleReader article={article} />
      </main>
    </div>
  );
}

export default ArticleDetailPage;
