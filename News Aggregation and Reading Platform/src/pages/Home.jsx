import React, { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import SigninForm from "./SigninPage.jsx";
import SignupForm from "./SignupPage.jsx";
import CategoryNav from "../components/CategoryNav.jsx";
import ArticleList from "../components/ArticleList.jsx";
import ArticleReader from "../components/ArticleReader.jsx";
import { categories } from "../Data/newsData.js";
import { useNews } from "../hooks/useNews.js";
import "./layout.css";

function Home() {
  const { user, logout } = useAuth();
  const [showSignup, setShowSignup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const { articles: allArticles, isLoading, error } = useNews(selectedCategory);

  const filteredArticles = useMemo(() => {
    if (!searchTerm.trim()) return allArticles;
    const q = searchTerm.toLowerCase();
    return allArticles.filter(
      (a) =>
        (a.title || "").toLowerCase().includes(q) ||
        (a.summary || "").toLowerCase().includes(q)
    );
  }, [allArticles, searchTerm]);

  const selectedArticle = useMemo(
    () => allArticles.find((a) => a.id === selectedArticleId) || null,
    [allArticles, selectedArticleId]
  );

  // Not logged in
  if (!user) {
    return (
      <div className="app-shell app-shell--auth">
        <div className="auth-page">
          {showSignup ? (
            <SignupForm
              onSuccess={() => setShowSignup(false)}
              switchToSignin={() => setShowSignup(false)}
            />
          ) : (
            <SigninForm
              onSuccess={() => {}}
              switchToSignup={() => setShowSignup(true)}
            />
          )}
        </div>
      </div>
    );
  }

  // Logged in: sidebar + list + reader
  return (
    <div className="app-shell">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="logo">News Aggregator</div>
        <div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Hi, <strong>{user.name}</strong>
          </p>
          <button onClick={logout} className="cat-btn" style={{ marginTop: "6px" }}>
            Logout
          </button>
        </div>
        <CategoryNav
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setSelectedArticleId(null);
          }}
        />
        <label className="search-label">
          Search
          <input
            type="search"
            placeholder="Search articles"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </aside>

      {/* Main area */}
      <div className="main">
        <div className="content">
          <div className="list-pane">
            <ArticleList
              articles={filteredArticles}
              isLoading={isLoading}
              error={error}
              onSelect={setSelectedArticleId}
              selectedArticleId={selectedArticleId}
            />
          </div>
          <div className="reader-pane">
            <ArticleReader article={selectedArticle} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
