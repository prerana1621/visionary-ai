import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, Target, Users, ShieldAlert, Cpu } from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Radar as RadarArea,
} from "recharts";

export default function IdeaDetail() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/ideas/${id}`,
        );
        setIdea(response.data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIdea();
  }, [id]);

  if (loading || !idea)
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-950 dark:text-white font-black text-2xl animate-pulse">
        Crunching Data...
      </div>
    );

  const { report } = idea;
  const chartData = [
    { subject: "Market", value: 80 },
    { subject: "Potential", value: 85 },
    { subject: "Profit", value: report.profitability_score },
    { subject: "Tech", value: 80 },
    {
      subject: "Risk",
      value:
        report.risk_level === "Low"
          ? 20
          : report.risk_level === "Medium"
            ? 50
            : 80,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto mb-20 px-4">
      <div className="py-10">
        <Link
          to="/ideas"
          className="flex items-center text-blue-600 dark:text-blue-400 font-bold gap-2 text-lg hover:underline w-fit"
        >
          <ChevronLeft size={24} /> Back to Dashboard
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="bg-gray-50 dark:bg-black p-10 border-b border-gray-100 dark:border-gray-900">
          <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">
            {idea.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-2xl font-medium">
            {idea.description}
          </p>
        </div>

        <div className="p-10 space-y-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="p-7 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-800/20">
                <h4 className="flex items-center gap-2 font-black text-blue-900 dark:text-blue-300 text-xs uppercase tracking-[0.2em] mb-3">
                  <Users size={20} /> Target Audience
                </h4>
                <p className="text-blue-800 dark:text-blue-400 text-base leading-relaxed">
                  {report.customer}
                </p>
              </div>
              <div className="p-7 bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl border border-indigo-100 dark:border-indigo-800/20">
                <h4 className="flex items-center gap-2 font-black text-indigo-900 dark:text-indigo-300 text-xs uppercase tracking-[0.2em] mb-3">
                  <Target size={20} /> Market Dynamics
                </h4>
                <p className="text-indigo-800 dark:text-indigo-400 text-base leading-relaxed">
                  {report.market}
                </p>
              </div>
            </div>

            <div className="h-80 bg-gray-50 dark:bg-gray-950 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800">
              <h4 className="text-[10px] font-black uppercase text-gray-400 mb-4 tracking-widest">
                Market Metric Visualization
              </h4>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData}>
                  <PolarGrid stroke="#9ca3af" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: "bold" }}
                  />
                  <RadarArea
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              Market Competitors
            </h3>
            <div className="grid gap-4">
              {report.competitor.map((comp, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-5 p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700"
                >
                  <span className="font-black text-blue-600 bg-white dark:bg-black w-10 h-10 flex items-center justify-center rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-lg">
                    0{idx + 1}
                  </span>
                  <p className="text-gray-700 dark:text-gray-300 text-base font-bold">
                    {comp}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
              <Cpu size={28} /> Proposed Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {report.tech_stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 px-5 py-2.5 rounded-2xl text-[11px] font-black text-gray-700 dark:text-gray-400 shadow-sm uppercase tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-black p-12 rounded-[3rem] border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                  Profitability Score
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <ShieldAlert size={18} className="text-gray-400" />
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.25em] ${
                      report.risk_level === "Low"
                        ? "text-green-600"
                        : report.risk_level === "Medium"
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {report.risk_level} Risk Level Assessment
                  </span>
                </div>
              </div>
              <div className="text-7xl font-black text-blue-600 dark:text-blue-500 tracking-tighter">
                {report.profitability_score}
                <span className="text-2xl text-gray-400 ml-1">%</span>
              </div>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-4 mb-10 overflow-hidden">
              <div
                className="bg-blue-600 h-4 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-1000"
                style={{ width: `${report.profitability_score}%` }}
              ></div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">
                AI Justification
              </h4>
              <p className="text-gray-700 dark:text-gray-400 text-xl italic leading-relaxed font-medium">
                "{report.justification}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
