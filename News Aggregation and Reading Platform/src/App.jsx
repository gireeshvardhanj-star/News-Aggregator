import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
// you can keep ArticleDetailPage if you still want it
import ArticleDetailPage from "./pages/ArticleDetailPage.jsx";

function App() {
  return (
    <div className="App">
      <div className="App-inner">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ArticleDetailPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
