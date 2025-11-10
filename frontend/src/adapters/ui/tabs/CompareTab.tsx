import React, { useEffect, useState } from "react";
import api from "../../infrastructure/apiClient";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Comparison {
  routeId: string;
  baselineIntensity: number;
  comparisonIntensity: number;
  percentDiff: number;
  compliant: boolean;
}

const CompareTab: React.FC = () => {
  const [data, setData] = useState<Comparison[]>([]);
  const [baseline, setBaseline] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const fetchComparison = async () => {
    try {
        console.log("Fetching /routes/comparison...");
      const res = await api.get("/routes/comparison");
       console.log("Response:", res.data);
      setData(res.data.comparisons);
      setBaseline(res.data.baseline);
    } catch (err) {
      console.error("Error fetching comparison:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComparison();
  }, []);

  if (loading)
    return (
      <p className="rounded-2xl border border-sky-500/20 bg-slate-900/50 p-4 text-center text-sm text-sky-100 shadow-inner shadow-slate-950/70">
        Plotting baseline vs comparison data...
      </p>
    );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-sky-100">
          Baseline vs Comparison
        </h2>
        <p className="text-sm text-slate-300">
          Active Baseline Route:{" "}
          <span className="font-semibold text-sky-200">{baseline}</span>
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-sky-500/20 bg-slate-900/40 shadow-xl shadow-slate-950/50">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm">
          <thead className="bg-sky-950/70 text-xs uppercase tracking-wide text-sky-100">
            <tr>
              <th className="px-4 py-3">Route ID</th>
              <th className="px-4 py-3 text-right">Baseline</th>
              <th className="px-4 py-3 text-right">Comparison</th>
              <th className="px-4 py-3 text-right">% Difference</th>
              <th className="px-4 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((d) => (
              <tr
                key={d.routeId}
                className="transition-colors duration-200 hover:bg-slate-900/70"
              >
                <td className="px-4 py-4 font-medium text-sky-100">{d.routeId}</td>
                <td className="px-4 py-4 text-right font-mono text-slate-100">
                  {d.baselineIntensity.toFixed(2)}
                </td>
                <td className="px-4 py-4 text-right font-mono text-slate-100">
                  {d.comparisonIntensity.toFixed(2)}
                </td>
                <td
                  className={`px-4 py-4 text-right font-mono ${
                    d.percentDiff > 0 ? "text-rose-400" : "text-emerald-300"
                  }`}
                >
                  {d.percentDiff.toFixed(2)}%
                </td>
                <td className="px-4 py-4 text-right">
                  {d.compliant ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
                      ✅ Compliant
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-200">
                      ❌ Breach
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-3xl border border-sky-500/20 bg-slate-900/50 p-6 shadow-xl shadow-slate-950/40">
        <h3 className="text-lg font-semibold text-sky-100">
          GHG Intensity Comparison
        </h3>
        <p className="text-xs text-slate-400">
          Visualize baseline alignment against current route performance (gCO₂e /
          ton-km).
        </p>
        <div className="mt-4 h-72 rounded-2xl border border-white/5 bg-slate-950/50 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis tick={{ fill: "#bae6fd", fontSize: 12 }} dataKey="routeId" />
              <YAxis tick={{ fill: "#bae6fd", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.92)",
                  border: "1px solid rgba(56, 189, 248, 0.35)",
                  borderRadius: "12px",
                  color: "#e0f2fe",
                  fontSize: "12px",
                }}
              />
              <Legend />
              <Bar dataKey="baselineIntensity" fill="#38bdf8" name="Baseline" />
              <Bar
                dataKey="comparisonIntensity"
                fill="#34d399"
                name="Comparison"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CompareTab;
