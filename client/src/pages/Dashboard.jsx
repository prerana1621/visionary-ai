import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Trash2, ArrowRight, Plus } from "lucide-react";

export default function Dashboard() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/ideas");
        setIdeas(response.data);
      } catch (error) {
        console.error("Fetch failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIdeas();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this validation report permanently?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/ideas/${id}`);
      setIdeas(ideas.filter((idea) => idea._id !== id));
    } catch (error) {
      alert("Error deleting the idea.");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-400 dark:text-gray-500 animate-pulse font-medium">
        Loading Dashboard...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white">
            Dashboard
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Review and manage your validated concepts.
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300">
          {ideas.length} {ideas.length === 1 ? "Report" : "Reports"} Saved
        </div>
      </div>

      {ideas.length === 0 ? (
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-16 bg-gray-50 dark:bg-gray-900/50 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-800 transition-all">
          <p className="text-gray-400 dark:text-gray-500 mb-8 font-medium text-base">
            No ideas found. Start your journey today!
          </p>
          <Link
            to="/"
            className="group flex flex-col items-center gap-4 hover:scale-105 transition-transform"
          >
            <div className="p-5 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Plus size={32} />
            </div>
            <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.25em] text-[11px]">
              Add New Idea
            </span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-gray-800 dark:text-white line-clamp-1 pr-4">
                    {idea.title}
                  </h3>
                  <button
                    onClick={() => handleDelete(idea._id)}
                    className="text-gray-300 dark:text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {idea.description}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-50 dark:border-gray-800">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
                    Score
                  </span>
                  <span
                    className={`text-lg font-black ${
                      idea.report?.profitability_score >= 80
                        ? "text-green-500"
                        : idea.report?.profitability_score >= 60
                          ? "text-yellow-500"
                          : "text-red-500"
                    }`}
                  >
                    {idea.report?.profitability_score}/100
                  </span>
                </div>
                <Link
                  to={`/ideas/${idea._id}`}
                  className="flex items-center gap-1 bg-gray-900 dark:bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors"
                >
                  Report <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
