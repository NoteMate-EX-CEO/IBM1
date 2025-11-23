import Link from "next/link";

type Emergency = {
  id: string;
  patient: string;
  type: string;
  severity: "critical" | "high" | "medium";
  eta: string;
  status: "new" | "acked" | "resolved";
};

const emergencies: Emergency[] = [
  { id: "E-9012", patient: "P-1021", type: "Tachycardia", severity: "critical", eta: "now", status: "new" },
  { id: "E-9013", patient: "P-1040", type: "SpO2 dip", severity: "high", eta: "2m", status: "new" },
  { id: "E-9014", patient: "P-1055", type: "Fever spike", severity: "medium", eta: "5m", status: "acked" },
];

export default function EmergencyBoardPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0b1413_0%,#0d1117_100%)] text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Real-time Emergencies</h1>
            <p className="text-slate-400 mt-1">AI-detected anomalies prioritized for response.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/15 border border-white/10">Refresh</button>
            <button className="px-3 py-2 rounded-md bg-[var(--watson-purple,#8a3ffc)] hover:brightness-110 text-slate-900 font-semibold">Auto-triage</button>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="font-semibold mb-4">Queue</div>
            <div className="space-y-3">
              {emergencies.map((e) => (
                <div key={e.id} className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{e.type} • <span className="text-slate-300">{e.patient}</span></div>
                    <div className="text-xs text-slate-400 mt-1">#{e.id} • ETA {e.eta}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded bg-white/5 border border-white/10 text-xs ${e.severity==='critical'?'text-rose-300':e.severity==='high'?'text-amber-300':'text-emerald-300'}`}>{e.severity}</span>
                    <Link href={`/doctor/patients/${e.patient}`} className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/15 border border-white/10">Open</Link>
                    <button className="px-3 py-2 rounded-md bg-[var(--ibm-blue,#0f62fe)] hover:brightness-110 text-slate-900 font-semibold">Acknowledge</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="font-semibold mb-3">Guidance</div>
              <ul className="list-disc list-inside text-sm text-slate-300/90 space-y-2">
                <li>Prioritize critical alerts first.</li>
                <li>Open patient record to view vitals trend and notes.</li>
                <li>Use Auto-triage to batch-assign on-call doctors.</li>
              </ul>
            </section>

            <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="font-semibold mb-3">Filters</div>
              <div className="flex flex-wrap gap-2 text-sm">
                {['critical','high','medium'].map((f)=> (
                  <button key={f} className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/15 border border-white/10 capitalize">{f}</button>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
