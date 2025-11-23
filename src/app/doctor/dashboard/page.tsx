import { jwtVerify } from "jose";
import Link from "next/link";
import { getCookieValue } from "@/lib/cookie";

async function getDoctorName() {
  const token = await getCookieValue("cf_token");
  if (!token) return "Doctor";
  const secret = process.env.JWT_SECRET;
  if (!secret) return "Doctor";
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return (payload as any).name || (payload as any).email?.split("@")[0] || "Doctor";
  } catch {
    return "Doctor";
  }
}

export default async function DoctorDashboardPage() {
  const name = await getDoctorName();

  const patients = [
    { id: "P-1021", name: "John Carter", age: 58, condition: "Cardiac", assigned: true, risk: "High" },
    { id: "P-1040", name: "Akira Tanaka", age: 34, condition: "Respiratory", assigned: true, risk: "Medium" },
    { id: "P-1055", name: "Lara Singh", age: 71, condition: "General", assigned: false, risk: "Low" },
  ];

  const vitals = [
    { label: "Heart Rate", value: "92 bpm", trend: "+6", status: "warning" },
    { label: "SpO2", value: "96%", trend: "-1", status: "ok" },
    { label: "BP", value: "128/82", trend: "+2", status: "ok" },
    { label: "Temp", value: "37.4°C", trend: "+0.2", status: "warning" },
  ];

  const alerts = [
    { t: "Possible tachycardia detected", p: "P-1021", time: "2m ago", sev: "high" },
    { t: "SpO2 dip detected overnight", p: "P-1040", time: "1h ago", sev: "medium" },
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0b1413_0%,#0d1117_100%)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome, Dr. {name}</h1>
            <p className="text-slate-400 mt-1">Your patients, vitals, and alerts at a glance.</p>
          </div>
          <Link href="/modules" className="px-4 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10">Explore Modules</Link>
        </div>

        <div className="mt-8 grid xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 space-y-6">
            <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold">Patients</div>
                <button className="px-3 py-2 rounded-md bg-[var(--ibm-blue,#0f62fe)] hover:brightness-110 text-slate-900 font-semibold">Add patient</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="text-left text-slate-300">
                    <tr>
                      <th className="pb-2 pr-4">ID</th>
                      <th className="pb-2 pr-4">Name</th>
                      <th className="pb-2 pr-4">Age</th>
                      <th className="pb-2 pr-4">Condition</th>
                      <th className="pb-2 pr-4">Risk</th>
                      <th className="pb-2 pr-4">Assigned</th>
                      <th className="pb-2 pr-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-200/90">
                    {patients.map((p) => (
                      <tr key={p.id} className="border-t border-white/10">
                        <td className="py-3 pr-4">{p.id}</td>
                        <td className="py-3 pr-4">{p.name}</td>
                        <td className="py-3 pr-4">{p.age}</td>
                        <td className="py-3 pr-4">{p.condition}</td>
                        <td className="py-3 pr-4"><span className={`px-2 py-1 rounded bg-white/5 border border-white/10 ${p.risk==='High'?'text-rose-300':p.risk==='Medium'?'text-amber-300':'text-emerald-300'}`}>{p.risk}</span></td>
                        <td className="py-3 pr-4">{p.assigned? 'Yes' : 'No'}</td>
                        <td className="py-3 pr-4">
                          <div className="flex gap-2">
                            <button className="px-2 py-1 rounded-md bg-white/5 border border-white/10 hover:bg-white/10">Summary</button>
                            <button className="px-2 py-1 rounded-md bg-white/5 border border-white/10 hover:bg-white/10">Assign</button>
                            <button className="px-2 py-1 rounded-md bg-white/5 border border-white/10 hover:bg-white/10">Vitals</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="font-semibold mb-4">Vitals</div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {vitals.map((v,i)=> (
                  <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/10">
                    <div className="text-slate-300 text-sm">{v.label}</div>
                    <div className="text-2xl font-bold mt-1">{v.value}</div>
                    <div className={`text-xs mt-1 ${v.status==='warning'?'text-amber-300':'text-[var(--ibm-blue,#0f62fe)]'}`}>Trend {v.trend}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="font-semibold mb-3">Alerts</div>
              <div className="space-y-3">
                {alerts.map((a,i)=> (
                  <div key={i} className="p-3 rounded-lg bg-black/40 border border-white/10">
                    <div className="text-sm">{a.t}</div>
                    <div className="text-xs text-slate-400 mt-1">{a.p} • {a.time}</div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full px-4 py-2 rounded-md bg-[var(--ibm-blue,#0f62fe)] hover:brightness-110 text-slate-900 font-semibold">Acknowledge all</button>
            </section>

            <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="font-semibold mb-3">Notes</div>
              <textarea className="w-full h-28 rounded-lg bg-white/5 border border-white/10 p-3 focus:outline-none focus:ring-2 focus:ring-[var(--ibm-blue,#0f62fe)]" placeholder="Add a quick note for rounds..." />
              <button className="mt-3 w-full px-4 py-2 rounded-md bg-white/10 hover:bg-white/15 border border-white/10">Save</button>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

function LogoutButton() {
  "use client";
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }
  return (
    <button onClick={logout} className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/15 border border-white/10">Logout</button>
  );
}
