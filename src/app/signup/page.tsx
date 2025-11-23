"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const text = await res.text();
      let data: any = {};
      try { data = JSON.parse(text); } catch {}
      if (!res.ok) throw new Error(data.error || `Signup failed (${res.status})`);
      router.replace("/dashboard");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0b1413_0%,#0d1117_100%)] text-white grid place-items-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm text-slate-300">Name</span>
            <input type="text" required value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--ibm-blue,#0f62fe)]" placeholder="Ada Lovelace" />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Email</span>
            <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--ibm-blue,#0f62fe)]" placeholder="you@hack.dev" />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Password</span>
            <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--ibm-blue,#0f62fe)]" placeholder="At least 6 characters" />
          </label>
          {error && <div className="text-sm text-rose-300">{error}</div>}
          <button disabled={loading} className="w-full px-4 py-3 rounded-lg bg-[var(--ibm-blue,#0f62fe)] hover:brightness-110 text-slate-900 font-semibold disabled:opacity-60">{loading?"Creating...":"Sign up"}</button>
        </form>
        <div className="mt-4 text-sm text-slate-400">Already have an account? <a href="/login" className="text-[var(--ibm-blue,#0f62fe)] hover:brightness-110">Login</a></div>
      </div>
    </div>
  );
}
