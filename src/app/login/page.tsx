"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center text-white">Loading…</div>}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const sp = useSearchParams();
  const from = sp.get("from") || "/dashboard";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const text = await res.text();
      let data: any = {};
      try { data = JSON.parse(text); } catch {}
      if (!res.ok) throw new Error(data.error || `Login failed (${res.status})`);
      router.replace(from);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0b1413_0%,#0d1117_100%)] text-white grid place-items-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm text-slate-300">Email</span>
            <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--ibm-blue,#0f62fe)]" placeholder="you@hack.dev" />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Password</span>
            <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--ibm-blue,#0f62fe)]" placeholder="••••••••" />
          </label>
          {error && <div className="text-sm text-rose-300">{error}</div>}
          <button disabled={loading} className="w-full px-4 py-3 rounded-lg bg-[var(--ibm-blue,#0f62fe)] hover:brightness-110 text-slate-900 font-semibold disabled:opacity-60">{loading?"Signing in...":"Login"}</button>
        </form>
        <div className="mt-4 text-sm text-slate-400">New here? <a href="/signup" className="text-emerald-300 hover:text-emerald-200">Create an account</a></div>
      </div>
    </div>
  );
}
