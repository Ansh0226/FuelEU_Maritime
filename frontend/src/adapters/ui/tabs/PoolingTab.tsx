import React, { useState } from "react";
import api from "../../infrastructure/apiClient";

interface PoolMember {
  shipId: string;
  cbBefore?: number;
  cbAfter?: number;
}

const PoolingTab: React.FC = () => {
  const [year, setYear] = useState(2025);
  const [members, setMembers] = useState<PoolMember[]>([
    { shipId: "R004" },
    { shipId: "R005" },
  ]);
  const [result, setResult] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const addMember = () => {
    setMembers([...members, { shipId: "" }]);
  };

  const updateMember = (index: number, value: string) => {
    const updated = [...members];
    updated[index].shipId = value;
    setMembers(updated);
  };

  const createPool = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await api.post("/pools", { year, members });
      setResult(res.data);
      setMessage("Pool created successfully!");
    } catch (err: any) {
      console.error("Error creating pool:", err);
      const msg =
        err.response?.data?.message ||
        "Failed to create pool (check if total CB >= 0)";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-sky-100">
          Pooling (Article 21)
        </h2>
        <p className="text-sm text-slate-300">
          Combine vessel compliance balances to stabilise your fleet&apos;s annual
          position across sister ships.
        </p>
      </div>

      <div className="rounded-3xl border border-sky-500/20 bg-slate-900/50 p-6 shadow-xl shadow-slate-950/50">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-sky-200/80">
              Pool Year
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full rounded-2xl border border-sky-400/30 bg-slate-950/60 px-4 py-2.5 text-slate-100 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
              placeholder="2025"
            />
          </div>
          <button
            onClick={addMember}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sky-400/60 bg-sky-500/30 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-sky-50 transition hover:-translate-y-0.5 hover:bg-sky-400/40 hover:text-white"
          >
            + Add Member
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {members.map((m, i) => (
            <div key={i} className="space-y-2">
              <label className="text-xs uppercase tracking-wide text-sky-200/70">
                Ship ID #{i + 1}
              </label>
              <input
                value={m.shipId}
                onChange={(e) => updateMember(i, e.target.value)}
                placeholder="Enter ID"
                className="w-full rounded-2xl border border-sky-400/30 bg-slate-950/60 px-4 py-2.5 text-slate-100 placeholder:text-slate-500 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
              />
            </div>
          ))}
        </div>

        <button
          onClick={createPool}
          disabled={loading}
          className="mt-6 w-full rounded-2xl border border-emerald-400/60 bg-emerald-500/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-400/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Creating..." : "Create Pool"}
        </button>

        {message && (
          <p
            className={`mt-4 rounded-2xl border px-4 py-3 text-sm shadow-lg shadow-slate-950/40 ${
              message.toLowerCase().includes("success")
                ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
                : "border-rose-400/40 bg-rose-500/10 text-rose-100"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      {result && (
        <div className="space-y-4 rounded-3xl border border-sky-500/20 bg-slate-900/50 p-6 shadow-xl shadow-slate-950/50">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-sky-100">
              Pool Summary (Year {year})
            </h3>
            <span className="rounded-full border border-sky-400/40 bg-sky-500/20 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-sky-100">
              Pool ID: {result.poolId}
            </span>
          </div>
          <p className="text-sm text-slate-300">
            Total CB:{" "}
            <span
              className={`font-mono text-base ${
                result.totalCB >= 0 ? "text-emerald-300" : "text-rose-300"
              }`}
            >
              {result.totalCB?.toFixed?.(2) ?? result.totalCB}
            </span>
          </p>

          <div className="overflow-hidden rounded-3xl border border-sky-500/20 bg-slate-950/40">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead className="bg-sky-950/70 text-xs uppercase tracking-wide text-sky-100">
                <tr>
                  <th className="px-4 py-3">Ship ID</th>
                  <th className="px-4 py-3 text-right">CB Before</th>
                  <th className="px-4 py-3 text-right">CB After</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {result.members.map((member: any) => (
                  <tr
                    key={member.shipId}
                    className="transition-colors duration-200 hover:bg-slate-900/70"
                  >
                    <td className="px-4 py-4 font-medium text-sky-100">
                      {member.shipId}
                    </td>
                    <td
                      className={`px-4 py-4 text-right font-mono ${
                        member.cbBefore >= 0 ? "text-emerald-300" : "text-rose-300"
                      }`}
                    >
                      {member.cbBefore.toFixed(2)}
                    </td>
                    <td
                      className={`px-4 py-4 text-right font-mono ${
                        member.cbAfter >= 0 ? "text-emerald-300" : "text-rose-300"
                      }`}
                    >
                      {member.cbAfter.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className={`rounded-2xl border px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide ${
              result.totalCB >= 0
                ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
                : "border-rose-400/40 bg-rose-500/10 text-rose-100"
            }`}
          >
            Pool Sum Indicator:{" "}
            {result.totalCB >= 0 ? "✅ Valid Pool" : "❌ Invalid Pool"}
          </div>
        </div>
      )}
    </div>
  );
};

export default PoolingTab;
