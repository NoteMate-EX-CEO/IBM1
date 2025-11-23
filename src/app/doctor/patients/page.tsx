import Link from "next/link";

const patients = [
  { id: "P-1021", name: "John Carter", age: 58, condition: "Cardiac", risk: "High" },
  { id: "P-1040", name: "Akira Tanaka", age: 34, condition: "Respiratory", risk: "Medium" },
  { id: "P-1055", name: "Lara Singh", age: 71, condition: "General", risk: "Low" },
  { id: "P-1063", name: "Maria Silva", age: 46, condition: "Cardiac", risk: "Medium" },
  { id: "P-1069", name: "Omar Ali", age: 65, condition: "Respiratory", risk: "High" },
];

export default function PatientsListPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0b1413_0%,#0d1117_100%)] text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Patient List</h1>
            <p className="text-slate-400 mt-1">Click any row to open the patient record.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/15 border border-white/10">Import</button>
            <button className="px-3 py-2 rounded-md bg-[var(--watson-purple,#8a3ffc)] hover:brightness-110 text-slate-900 font-semibold">Add patient</button>
          </div>
        </div>

        <section className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-slate-300">
                <tr>
                  <th className="pb-2 pr-4">ID</th>
                  <th className="pb-2 pr-4">Name</th>
                  <th className="pb-2 pr-4">Age</th>
                  <th className="pb-2 pr-4">Condition</th>
                  <th className="pb-2 pr-4">Risk</th>
                  <th className="pb-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="text-slate-200/90">
                {patients.map((p) => (
                  <tr key={p.id} className="border-t border-white/10 hover:bg-white/[.04]">
                    <td className="py-3 pr-4 font-medium">
                      <Link href={`/doctor/patients/${p.id}`} className="hover:underline">{p.id}</Link>
                    </td>
                    <td className="py-3 pr-4">
                      <Link href={`/doctor/patients/${p.id}`} className="hover:underline">{p.name}</Link>
                    </td>
                    <td className="py-3 pr-4">{p.age}</td>
                    <td className="py-3 pr-4">{p.condition}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-1 rounded bg-white/5 border border-white/10 ${p.risk==='High'?'text-rose-300':p.risk==='Medium'?'text-amber-300':'text-emerald-300'}`}>{p.risk}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex gap-2">
                        <Link href={`/doctor/patients/${p.id}`} className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 border border-white/10">Open</Link>
                        <button className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 border border-white/10">Assign</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
