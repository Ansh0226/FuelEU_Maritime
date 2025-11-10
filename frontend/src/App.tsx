// src/App.tsx
import React from "react";
import Dashboard from "././adapters/ui/Dashboard";

const App: React.FC = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,116,144,0.45),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.25),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(115deg,#0f172a_12%,rgba(15,23,42,0)_12%),linear-gradient(295deg,#082f49_12%,rgba(8,47,73,0)_12%)]" />

      <div className="relative flex min-h-screen flex-col">
        <Dashboard />
        <footer className="mt-auto border-t border-white/10 bg-slate-950/60 py-4 text-center text-sm font-medium tracking-wide text-slate-300 backdrop-blur">
          Made by Anuj Mundu
        </footer>
      </div>
    </div>
  );
};

export default App;
