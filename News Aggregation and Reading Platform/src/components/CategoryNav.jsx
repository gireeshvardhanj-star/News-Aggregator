import React from "react";

function CategoryNav({ categories, selectedCategory, onSelectCategory }) {
  return (
    <nav className="category-nav" aria-label="News categories">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          className={cat === selectedCategory ? "cat-btn active" : "cat-btn"}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}

export default CategoryNav;
