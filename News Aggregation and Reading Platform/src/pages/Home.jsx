import React, { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import SigninForm from "./SigninPage.jsx";
import SignupForm from "./SignupPage.jsx";
import CategoryNav from "../components/CategoryNav.jsx";
import ArticleList from "../components/ArticleList.jsx";
import ArticleReader from "../components/ArticleReader.jsx";
import { categories } from "../Data/newsData.js";
import { useNews } from "../hooks/useNews.js";

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

  // Not logged in: show auth components as part of main page
  if (!user) {
    return (
      <div className="app-shell">
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

  // Logged in: show news layout
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>News Aggregator</h1>
        <div className="user-info">
          Hi, {user.name}&nbsp;&nbsp;
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>
      <CategoryNav
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSelectedArticleId(null);
        }}
      />
      <div className="search-bar">
        <label htmlFor="search">Search</label>&nbsp;
        <input
          id="search"
          type="search"
          aria-label="Search"
          placeholder="Search articles"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <main className="app-main">
        <ArticleList
          articles={filteredArticles}
          isLoading={isLoading}
          error={error}
          onSelect={setSelectedArticleId}
          selectedArticleId={selectedArticleId}
        />
        <ArticleReader article={selectedArticle} />
      </main>
    </div>
  );
}

export default Home;
