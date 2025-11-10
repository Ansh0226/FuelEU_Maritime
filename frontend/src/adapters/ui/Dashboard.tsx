import React, { useState } from "react";
import RoutesTab from "./tabs/RoutesTab";
import CompareTab from "./tabs/CompareTab";
import BankingTab from "./tabs/BankingTab";
import PoolingTab from "./tabs/PoolingTab";

const highlightStats = [
  { label: "Routes monitored", value: "120+" },
  { label: "Fleet efficiency", value: "92%" },
  { label: "Compliance actions", value: "48" },
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("routes");

  const tabs = [
    { id: "routes", label: "Routes" },
    { id: "compare", label: "Compare" },
    { id: "banking", label: "Banking" },
    { id: "pooling", label: "Pooling" },
  ];

  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 pb-16 pt-12 sm:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-sky-500/20 bg-slate-900/70 px-6 py-10 shadow-2xl shadow-sky-950/50 backdrop-blur">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_top_right,rgba(125,211,252,0.35),transparent_55%)]" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-sky-200/90">
            Maritime Intelligence
          </span>
          <h1 className="mt-5 text-balance text-3xl font-semibold leading-tight text-sky-50 sm:text-4xl">
            ⚓ FuelEU Maritime Compliance Command
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-base text-slate-300 sm:text-lg">
            Monitor emissions, orchestrate compliance banking and pooling, and compare route intensity trends across your fleet—crafted for marine operations navigating FuelEU regulations.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlightStats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6 text-slate-100 shadow-lg shadow-sky-950/30 backdrop-blur"
              >
                <p className="text-sm uppercase tracking-wide text-sky-200/80">
                  {item.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-sky-100">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav className="flex flex-wrap justify-center gap-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative overflow-hidden rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 sm:px-6 sm:text-base ${
                isActive
                  ? "border-sky-400/80 bg-sky-500/30 text-sky-50 shadow-lg shadow-sky-900/40 backdrop-blur"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-sky-400/60 hover:text-sky-100"
              }`}
            >
              <span
                className={`absolute inset-0 -z-10 rounded-full bg-sky-500/30 blur-xl transition-opacity duration-300 ${
                  isActive ? "opacity-70" : "opacity-0 group-hover:opacity-40"
                }`}
              />
              {tab.label}
            </button>
          );
        })}
      </nav>

      <section className="relative flex-1 rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur-xl sm:p-8">
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(120deg,rgba(56,189,248,0.4),rgba(14,116,144,0.2))]" />
        <div className="relative space-y-6">
          {activeTab === "routes" && <RoutesTab />}
          {activeTab === "compare" && <CompareTab />}
          {activeTab === "banking" && <BankingTab />}
          {activeTab === "pooling" && <PoolingTab />}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
