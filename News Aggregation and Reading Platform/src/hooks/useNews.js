import { useState, useEffect } from "react";
import { articles as staticArticles } from "../Data/newsData.js";

const CATEGORY_MAP = {
  All: "general",
  Technology: "technology",
  Sports: "sports",
  Politics: "politics",
  Entertainment: "entertainment",
  Science: "science",
};

export function useNews(category = "All") {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const newsCategory = CATEGORY_MAP[category];

    const url =
      category === "All"
        ? "https://saurav.tech/NewsAPI/top-headlines/category/general/in.json"
        : `https://saurav.tech/NewsAPI/top-headlines/category/${newsCategory}/in.json`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        const mapped = (data.articles || [])
          .filter((a) => a.title && a.title !== "[Removed]")
          .map((a, index) => ({
            id: index + 1,
            title: a.title,
            category: category === "All" ? "General" : category,
            author: a.author || a.source?.name || "Unknown",
            date: a.publishedAt ? a.publishedAt.slice(0, 10) : "N/A",
            summary: a.description || "No description available.",
            body:
              a.content ||
              a.description ||
              "Read the full article at the source.",
            url: a.url,
            image: a.urlToImage,
          }));

        if (!mapped.length) {
          const fallback =
            category === "All"
              ? staticArticles
              : staticArticles.filter((a) => a.category === category);
          setArticles(fallback);
        } else {
          setArticles(mapped);
        }
      })
      .catch(() => {
        const fallback =
          category === "All"
            ? staticArticles
            : staticArticles.filter((a) => a.category === category);
        setArticles(fallback);
        setError(null);
      })
      .finally(() => setIsLoading(false));
  }, [category]);

  return { articles, isLoading, error };
}
