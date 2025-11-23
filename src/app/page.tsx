export default function Home() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0b1413_0%,#0d1117_100%)] text-white">
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0" style={{background:"radial-gradient(1200px_600px_at_10%_10%,rgba(15,98,254,.25),transparent)"}} />
          <div className="absolute inset-0 opacity-[0.12]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize:'24px 24px'}}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 mb-5">Made for hackathons</div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                  AI for hospital operations.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--ibm-blue,#0f62fe)] via-[var(--watson-purple,#8a3ffc)] to-[var(--ibm-blue,#0f62fe)]">Onboard patients. Assign doctors. Detect emergencies.</span>
                </h1>
                <p className="mt-5 text-slate-300/90 text-lg">Streamline care: AI summaries for notes, automatic doctor assignment, vitals surveillance, and an emergency board built for speed.</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a href="/modules" className="px-5 py-3 rounded-lg bg-[var(--ibm-blue,#0f62fe)] hover:brightness-110 text-slate-900 font-semibold">Explore Modules</a>
                  <a href="/signup" className="px-5 py-3 rounded-lg border border-white/10 hover:bg-white/10">Get Started (Admin)</a>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <a href="/doctor/login" className="px-4 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10">I'm a Doctor</a>
                  <a href="/doctor/signup" className="px-4 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10">Join as Doctor</a>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-6 bg-[var(--ibm-blue,#0f62fe)]/10 blur-3xl rounded-3xl"></div>
                <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    {['Teammate Finder','Skill Matrix','Idea Board','Workflow AI','Task Planner','Live Updates'].map((t,i)=> (
                      <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/10">
                        <div className="h-10 w-10 rounded-lg bg-[var(--ibm-blue,#0f62fe)]/20 grid place-items-center mb-3">
                          <div className="h-5 w-5 rounded bg-[var(--ibm-blue,#0f62fe)]"></div>
                        </div>
                        <div className="font-semibold">{t}</div>
                        <div className="text-xs text-slate-400 mt-1">Click to explore</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
                    <div className="text-sm text-slate-300">Suggested next steps</div>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-[var(--ibm-blue,#0f62fe)]"></div>Invite teammates</li>
                      <li className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-[var(--ibm-blue,#0f62fe)]"></div>Define roles & scope</li>
                      <li className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-[var(--ibm-blue,#0f62fe)]"></div>Generate first sprint</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Why hospitals use CollabFlow Health</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {t:'AI patient onboarding', d:'Collect symptoms, history, and insurance; auto-generate a concise intake summary.'},
                {t:'Doctor assignment', d:'Match patients to on-call specialists based on load and specialty.'},
                {t:'Vitals & emergency board', d:'Monitor trends and surface real-time alerts for rapid response.'},
              ].map((f,i)=> (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="h-10 w-10 rounded-lg bg-[var(--ibm-blue,#0f62fe)]/20 mb-3"></div>
                  <div className="font-semibold text-lg">{f.t}</div>
                  <div className="text-slate-300/80 mt-1 text-sm">{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="py-20 border-t border-white/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold">From admission to action in minutes</h2>
            <p className="mt-3 text-slate-300/80 max-w-2xl mx-auto">Onboard patients, assign doctors, and keep an eye on vitals — all with AI assistance.</p>
            <div className="mt-10 grid md:grid-cols-3 gap-6 text-left">
              {[
                'Onboard patient',
                'Assign doctor',
                'Monitor & respond',
              ].map((s,i)=> (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-6xl font-black text-[var(--ibm-blue,#0f62fe)]/40">{i+1}</div>
                  <div className="font-semibold mt-2">{s}</div>
                  <div className="text-slate-300/80 text-sm mt-1">AI-generated summaries and alerts keep everyone aligned.</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-10 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <div>© {new Date().getFullYear()} CollabFlow</div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
