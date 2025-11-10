import React, { useEffect, useState } from "react";
import api from "../../infrastructure/apiClient";

interface RouteData {
  id: number;
  routeId: string;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number;
  fuelConsumption: number;
  distance: number;
  totalEmissions: number;
}

const RoutesTab: React.FC = () => {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoutes = async () => {
    try {
      const res = await api.get("/routes");
      setRoutes(res.data);
    } catch (err) {
      console.error("Error fetching routes:", err);
    } finally {
      setLoading(false);
    }
  };

  const setBaseline = async (id: number) => {
    await api.post(`/routes/${id}/baseline`);
    fetchRoutes();
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  if (loading)
    return (
      <p className="rounded-2xl border border-sky-500/20 bg-slate-900/50 p-4 text-center text-sm text-sky-100 shadow-inner shadow-slate-950/70">
        Loading live route telemetry...
      </p>
    );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-sky-100">All Routes</h2>
        <p className="text-sm text-slate-300">
          Review route intensity data and set the baseline that drives comparisons.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-sky-500/20 bg-slate-900/40 shadow-xl shadow-slate-950/50">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm">
          <thead className="bg-sky-950/70 text-sky-100 uppercase tracking-wide text-xs">
            <tr>
              <th className="px-4 py-3">Route</th>
              <th className="px-4 py-3">Vessel Type</th>
              <th className="px-4 py-3">Fuel Type</th>
              <th className="px-4 py-3 text-right">Year</th>
              <th className="px-4 py-3 text-right">GHG Intensity</th>
              <th className="px-4 py-3 text-right">Fuel (t)</th>
              <th className="px-4 py-3 text-right">Distance (km)</th>
              <th className="px-4 py-3 text-right">Emissions (t)</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {routes.map((r) => (
              <tr
                key={r.id}
                className="transition-colors duration-200 hover:bg-slate-900/70"
              >
                <td className="px-4 py-4 font-medium text-sky-100">{r.routeId}</td>
                <td className="px-4 py-4 text-slate-200">{r.vesselType}</td>
                <td className="px-4 py-4 text-slate-200">{r.fuelType}</td>
                <td className="px-4 py-4 text-right font-mono text-[0.95rem] text-slate-200">
                  {r.year}
                </td>
                <td className="px-4 py-4 text-right font-mono text-sky-200">
                  {r.ghgIntensity.toFixed(2)}
                </td>
                <td className="px-4 py-4 text-right font-mono text-slate-100">
                  {r.fuelConsumption}
                </td>
                <td className="px-4 py-4 text-right font-mono text-slate-100">
                  {r.distance}
                </td>
                <td className="px-4 py-4 text-right font-mono text-slate-100">
                  {r.totalEmissions}
                </td>
                <td className="px-4 py-4 text-right">
                  <button
                    onClick={() => setBaseline(r.id)}
                    className="rounded-full border border-sky-400/60 bg-sky-500/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-sky-50 transition hover:-translate-y-0.5 hover:bg-sky-400/40 hover:text-white"
                  >
                    Set Baseline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoutesTab;
