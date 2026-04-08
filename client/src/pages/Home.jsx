import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, Sparkles, Rocket, Lightbulb } from "lucide-react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      return setError("Please fill out both fields to begin analysis.");
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/ideas", {
        title,
        description,
      });
      navigate(`/ideas/${response.data._id}`);
    } catch (err) {
      console.error(err);
      setError(
        "AI Analysis failed. Check if the server is online and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 mb-20 px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl mb-6 shadow-sm">
          <Rocket size={32} />
        </div>
        <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">
          Validate Your <span className="text-blue-600">Startup</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-xl mx-auto font-medium">
          Our AI consultant analyzes market trends, customer personas, and
          technical feasibility in seconds.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-2xl mb-8 border border-red-100 dark:border-red-900/30 text-sm font-bold text-center uppercase tracking-widest">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="group">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 group-focus-within:text-blue-600 transition-colors">
              <Lightbulb size={14} /> Startup Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              className="w-full p-5 bg-gray-50 dark:bg-gray-950 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all dark:text-white text-lg font-bold placeholder:text-gray-300 dark:placeholder:text-gray-700"
              placeholder="e.g., Solar Powered Water Purifier"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 group-focus-within:text-blue-600 transition-colors">
              Problem & Solution
            </label>
            <textarea
              required
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              className="w-full p-5 bg-gray-50 dark:bg-gray-950 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all dark:text-white font-medium placeholder:text-gray-300 dark:placeholder:text-gray-700 leading-relaxed"
              placeholder="Who is the customer? What pain point are you solving? How does it work?"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-black py-5 px-6 rounded-2xl transition-all flex justify-center items-center shadow-xl shadow-blue-500/20 group uppercase tracking-[0.2em] text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-3 h-5 w-5" />
                AI Analysis in Progress...
              </>
            ) : (
              <>
                <Sparkles className="mr-3 h-5 w-5 group-hover:scale-125 transition-transform" />
                Generate Validation Report
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-8 text-center border-t border-gray-100 dark:border-gray-800 pt-5">
        <p className="text-gray-400 dark:text-gray-600 text-[10px] font-black uppercase tracking-[0.4em] mb-1">
          Powered by Gemini 3.0 Technology
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-bold">
          © 2026 Developed by{" "}
          <span className="text-blue-600 decoration-2">
            Prerana Acharyya
          </span>
        </p>
      </div>
    </div>
  );
}
