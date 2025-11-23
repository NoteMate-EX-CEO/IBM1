
function Badge({ children, color = "bg-white/5" }: { children: React.ReactNode; color?: string }) {
  return <span className={`px-2 py-1 rounded-md border border-white/10 text-xs ${color}`}>{children}</span>;
}

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;

  const patient = {
    id,
    name: "John Carter",
    age: 58,
    condition: "Cardiac",
    doctor: "Dr. Smith",
    risk: "High",
  };

  const vitals = [
    { label: "HR", value: 96, unit: "bpm", status: "warn" },
    { label: "SpO2", value: 95, unit: "%", status: "ok" },
    { label: "BP", value: "132/86", unit: "", status: "ok" },
    { label: "Temp", value: 37.6, unit: "°C", status: "warn" },
  ];

  const notes = [
    { t: "12:40", by: "Dr. Smith", text: "Patient reported chest discomfort. ECG scheduled." },
    { t: "09:10", by: "Nurse Alex", text: "Administered beta blocker. HR reduced." },
  ];

  const alerts = [
    { sev: "high", text: "Possible tachycardia detected (HR>95 sustained)", time: "5m ago" },
  ];

  const aiSummary = `Patient presents with intermittent chest pain. Vitals mildly elevated; 
recommend continued monitoring, repeat ECG in 30m, consider troponin if symptoms persist.`;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0b1413_0%,#0d1117_100%)] text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{patient.name} <span className="text-sm font-normal text-slate-300">({patient.id})</span></h1>
            <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-300">
              <Badge>{patient.age} yrs</Badge>
              <Badge>{patient.condition}</Badge>
              <Badge color="bg-[var(--watson-purple,#8a3ffc)]/20">Risk: {patient.risk}</Badge>
              <Badge>Assigned: {patient.doctor}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded-md bg-[var(--ibm-blue,#0f62fe)] hover:brightness-110 text-slate-900 font-semibold">Generate AI Summary</button>
            <button className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/15 border border-white/10">Assign Doctor</button>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="font-semibold mb-4">Vitals</div>
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {vitals.map((v,i)=> (
                  <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/10">
                    <div className="text-slate-300 text-sm">{v.label}</div>
                    <div className="text-2xl font-bold mt-1">{v.value} {v.unit}</div>
                    <div className={`text-xs mt-1 ${v.status==='warn'?'text-amber-300':'text-emerald-300'}`}>{v.status==='warn'? 'Elevated' : 'Stable'}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="font-semibold mb-3">Notes</div>
              <div className="space-y-3">
                {notes.map((n,i)=> (
                  <div key={i} className="p-3 rounded-lg bg-black/40 border border-white/10">
                    <div className="text-sm">{n.text}</div>
                    <div className="text-xs text-slate-400 mt-1">{n.by} • {n.t}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <textarea className="w-full h-24 rounded-lg bg-white/5 border border-white/10 p-3 focus:outline-none focus:ring-2 focus:ring-[var(--ibm-blue,#0f62fe)]" placeholder="Add a quick note..." />
                <div className="mt-2 flex justify-end">
                  <button className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/15 border border-white/10">Save note</button>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="font-semibold mb-2">AI Summary</div>
              <p className="text-sm text-slate-300/90 whitespace-pre-line">{aiSummary}</p>
              <button className="mt-3 w-full px-4 py-2 rounded-md bg-[var(--watson-purple,#8a3ffc)] hover:brightness-110 text-slate-900 font-semibold">Regenerate</button>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="font-semibold mb-2">Alerts</div>
              <div className="space-y-3">
                {alerts.map((a,i)=> (
                  <div key={i} className="p-3 rounded-lg bg-black/40 border border-white/10">
                    <div className={`text-sm ${a.sev==='high'?'text-rose-300':'text-amber-300'}`}>{a.text}</div>
                    <div className="text-xs text-slate-400 mt-1">{a.time}</div>
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full px-4 py-2 rounded-md bg-white/10 hover:bg-white/15 border border-white/10">Acknowledge</button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
