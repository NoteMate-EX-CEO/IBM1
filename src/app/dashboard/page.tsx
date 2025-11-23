import { verifyJwt } from "@/lib/token";
import { getCookieValue } from "@/lib/cookie";
import Link from "next/link";

export default async function DashboardPage() {
  const token = await getCookieValue("cf_token");
  let name = "friend";
  if (token) {
    try {
      const payload = await verifyJwt(token);
      name = (payload as any).name || (payload as any).email?.split("@")[0] || name;
    } catch {
      // ignore; middleware already protects access
    }
  }

  async function LogoutButton() {
    "use client";
    async function logout() {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/";
    }
    return (
      <button onClick={logout} className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/15 border border-white/10">Logout</button>
    );
  }

  const teammates = [
    { name: "Alex", role: "Frontend", skills: ["React","Tailwind","Vite"] },
    { name: "Sam", role: "Backend", skills: ["Node","Express","Prisma"] },
    { name: "Rae", role: "ML", skills: ["Python","Torch","LLMs"] },
  ];
  const tasks = [
    { t:"Setup repo & CI", s:"In Progress" },
    { t:"Auth & routing", s:"Done" },
    { t:"Suggest workflow engine", s:"Next" },
  ];
  const steps = [
    "Define team roles and scope",
    "Generate initial workflow and timeline",
    "Create tasks and assign owners",
    "Run a 2-hour build sprint",
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0b1413_0%,#0d1117_100%)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Hey {name}, let’s ship.</h1>
            <p className="text-slate-400 mt-1">Your team space with suggested next steps.</p>
          </div>
          <Link href="/" className="px-4 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10">Go to Landing</Link>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold">Team</div>
                <button className="px-3 py-2 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold">Invite</button>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {teammates.map((m,i)=> (
                  <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/10">
                    <div className="font-semibold">{m.name}</div>
                    <div className="text-xs text-slate-400">{m.role}</div>
                    <div className="mt-2 flex flex-wrap gap-2">{m.skills.map((s,si)=>(<span key={si} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300">{s}</span>))}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="font-semibold mb-4">Tasks</div>
              <div className="grid sm:grid-cols-3 gap-4">
                {tasks.map((k,i)=> (
                  <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/10">
                    <div className="font-medium">{k.t}</div>
                    <div className="mt-2 text-xs">
                      <span className={`px-2 py-1 rounded bg-white/5 border border-white/10 ${k.s==='Done'?'text-green-300':k.s==='In Progress'?'text-amber-300':'text-sky-300'}`}>{k.s}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="font-semibold mb-3">Suggested workflow</div>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300">
                {steps.map((s,i)=>(<li key={i}>{s}</li>))}
              </ol>
              <button className="mt-4 w-full px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold">Generate sprint plan</button>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="font-semibold mb-2">Team sentiment</div>
              <div className="h-2 w-full rounded bg-white/10 overflow-hidden">
                <div className="h-full w-2/3 bg-emerald-500"></div>
              </div>
              <div className="text-xs text-slate-400 mt-2">Optimistic</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
