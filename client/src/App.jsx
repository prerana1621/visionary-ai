import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import IdeaDetail from "./pages/IdeaDetail";
import { Sun, Moon } from "lucide-react";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      console.log("Dark class added to <html>"); 
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      console.log("Dark class removed from <html>"); 
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <nav className="bg-white dark:bg-gray-900 shadow-sm p-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img src="/favicon.svg" alt="Visionary AI" className="w-10 h-10" />
              <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white">
                Visionary<span className="text-blue-600">AI</span>
              </span>
            </Link>

            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium"
              >
                Submit Idea
              </Link>
              <Link
                to="/ideas"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium"
              >
                Dashboard
              </Link>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 hover:scale-110 transition-all"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </nav>

        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ideas" element={<Dashboard />} />
            <Route path="/ideas/:id" element={<IdeaDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
