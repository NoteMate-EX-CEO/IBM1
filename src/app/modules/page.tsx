export default function ModulesPage() {
  const modules = [
    { id: 1, title: "Patient Onboarding", desc: "AI-guided onboarding process for new patients with automatic doctor assignment and summarization.", powered: ["Watson Orchestrate", "watsonx.ai"] },
    { id: 2, title: "AI Summary Generation", desc: "Converts doctor notes and symptom text into concise summaries for dashboards and reports.", powered: ["watsonx.ai"] },
    { id: 3, title: "Doctor Assignment", desc: "Assigns a doctor automatically based on specialty and current availability.", powered: ["Watson Orchestrate", "watsonx.ai"] },
    { id: 4, title: "Vitals Monitoring", desc: "Tracks live patient vitals from sensors or manual entries and detects anomalies.", powered: ["watsonx.ai", "backend API"] },
    { id: 5, title: "Emergency Detection", desc: "Predicts and triggers alerts for emergencies before they occur (e.g., heart rate spikes).", powered: ["watsonx.ai", "Watson Orchestrate"] },
    { id: 6, title: "Doctor Dashboard", desc: "Displays patient list, vitals, alerts, and reports; enables note-taking and emergency responses.", powered: ["React", "Node backend"] },
    { id: 7, title: "Patient Dashboard", desc: "Shows patient’s assigned doctor, reports, vitals history, and AI-simplified updates.", powered: ["React frontend"] },
    { id: 8, title: "Family Notification System", desc: "Automatically updates family about condition changes, discharge, or emergencies.", powered: ["Watson Orchestrate", "Email/SMS APIs"] },
    { id: 9, title: "Daily Reports", desc: "AI-generated hospital summary (admissions, discharges, emergencies).", powered: ["watsonx.ai", "Orchestrate"] },
    { id: 10, title: "Admin Control Panel (optional)", desc: "Tracks overall hospital occupancy, doctor load, and emergency stats.", powered: ["React", "watsonx.data"] },
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0b1413_0%,#0d1117_100%)] text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold">Healthcare AI Modules</h1>
        <p className="mt-2 text-slate-300/80">A composable set of capabilities to power modern hospital workflows.</p>

        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {modules.map((m) => (
            <div key={m.id} className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[var(--ibm-blue,#0f62fe)] text-sm">#{m.id.toString().padStart(2, "0")}</div>
              <h2 className="text-lg font-semibold mt-1">{m.title}</h2>
              <p className="text-sm text-slate-300/80 mt-2">{m.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {m.powered.map((p, i) => (
                  <span key={i} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300">{p}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
