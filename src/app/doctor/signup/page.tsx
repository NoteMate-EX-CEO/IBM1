"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DoctorSignupPage() {
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
        body: JSON.stringify({ name, email, password, role: "DOCTOR" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      router.replace("/doctor/dashboard");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0b1413_0%,#0d1117_100%)] text-white grid place-items-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10">
        <h1 className="text-2xl font-bold">Join as Doctor</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm text-slate-300">Full name</span>
            <input type="text" required value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Dr. Jane Doe" />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Work email</span>
            <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="doctor@hospital.org" />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Password</span>
            <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="At least 6 characters" />
          </label>
          {error && <div className="text-sm text-rose-300">{error}</div>}
          <button disabled={loading} className="w-full px-4 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold disabled:opacity-60">{loading?"Creating...":"Create account"}</button>
        </form>
        <div className="mt-4 text-sm text-slate-400">Already have an account? <a href="/doctor/login" className="text-emerald-300 hover:text-emerald-200">Login</a></div>
      </div>
    </div>
  );
}
