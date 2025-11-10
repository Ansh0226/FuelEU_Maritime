import React, { useState } from "react";
import api from "../../infrastructure/apiClient";

interface CBRecord {
  shipId: string;
  year: number;
  cbGco2eq: number;
}

const BankingTab: React.FC = () => {
  const [shipId, setShipId] = useState("R001");
  const [year, setYear] = useState(2024);
  const [cb, setCb] = useState<CBRecord | null>(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const fetchCB = async () => {
    try {
      const res = await api.get(`/compliance/cb?shipId=${shipId}&year=${year}`);
      setCb(res.data.data);
      setMessage("Fetched current CB successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch CB");
    }
  };

  const bankSurplus = async () => {
    try {
      const res = await api.post("/compliance/banking/bank", {
        shipId,
        year,
        amount: parseFloat(amount),
      });
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage("Failed to bank surplus");
    }
  };

  const applyBanked = async () => {
    try {
      const res = await api.post("/compliance/banking/apply", {
        shipId,
        year,
        amount: parseFloat(amount),
      });
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage("Failed to apply banked balance");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-sky-100">
          Compliance Banking
        </h2>
        <p className="text-sm text-slate-300">
          Bank surplus emissions credit or deploy stored balance to maintain your
          fleet&apos;s compliance corridor.
        </p>
      </div>

      <div className="grid gap-4 rounded-3xl border border-sky-500/20 bg-slate-900/50 p-6 shadow-xl shadow-slate-950/50 sm:grid-cols-[1fr_auto_auto] sm:items-end">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wide text-sky-200/80">
            Ship Identifier
          </label>
          <input
            className="w-full rounded-2xl border border-sky-400/30 bg-slate-950/60 px-4 py-2.5 text-slate-100 placeholder:text-slate-500 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
            value={shipId}
            onChange={(e) => setShipId(e.target.value)}
            placeholder="e.g. R001"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wide text-sky-200/80">
            Reporting Year
          </label>
          <input
            className="w-full rounded-2xl border border-sky-400/30 bg-slate-950/60 px-4 py-2.5 text-slate-100 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            placeholder="2024"
          />
        </div>
        <button
          onClick={fetchCB}
          className="h-full rounded-2xl border border-sky-400/60 bg-sky-500/30 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-sky-50 transition hover:-translate-y-0.5 hover:bg-sky-400/40 hover:text-white"
        >
          Fetch CB
        </button>
      </div>

      {cb && (
        <div className="grid gap-4 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 px-6 py-5 text-emerald-100 shadow-inner shadow-emerald-900/40 sm:grid-cols-3">
          <p>
            <span className="block text-xs uppercase tracking-wide text-emerald-200/70">
              Ship ID
            </span>
            <span className="text-lg font-semibold text-emerald-100">
              {cb.shipId}
            </span>
          </p>
          <p>
            <span className="block text-xs uppercase tracking-wide text-emerald-200/70">
              Year
            </span>
            <span className="text-lg font-semibold text-emerald-100">{cb.year}</span>
          </p>
          <p>
            <span className="block text-xs uppercase tracking-wide text-emerald-200/70">
              Compliance Balance (gCO₂e)
            </span>
            <span className="text-lg font-mono font-semibold text-emerald-50">
              {cb.cbGco2eq.toFixed(2)}
            </span>
          </p>
        </div>
      )}

      <div className="rounded-3xl border border-sky-500/20 bg-slate-900/50 p-6 shadow-xl shadow-slate-950/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-2">
            <label className="text-xs uppercase tracking-wide text-sky-200/80">
              Amount (gCO₂e)
            </label>
            <input
              className="w-full rounded-2xl border border-sky-400/30 bg-slate-950/60 px-4 py-2.5 text-slate-100 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter tonnage equivalent"
            />
          </div>
          <div className="flex flex-col gap-3 sm:w-72">
            <button
              onClick={bankSurplus}
              className="w-full rounded-2xl border border-emerald-400/60 bg-emerald-500/20 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-400/30 hover:text-white"
            >
              Bank Surplus
            </button>
            <button
              onClick={applyBanked}
              className="w-full rounded-2xl border border-amber-400/60 bg-amber-500/20 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-amber-100 transition hover:-translate-y-0.5 hover:bg-amber-400/30 hover:text-white"
            >
              Apply Banked
            </button>
          </div>
        </div>
      </div>

      {message && (
        <p
          className={`rounded-2xl border px-4 py-3 text-sm shadow-lg shadow-slate-950/40 ${
            message.toLowerCase().includes("fail")
              ? "border-rose-400/40 bg-rose-500/10 text-rose-100"
              : "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default BankingTab;
