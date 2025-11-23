"use client";

import { useEffect, useState } from "react";

type Me = { id: string; email: string; name: string; role?: "ADMIN" | "DOCTOR" };

export default function AuthMenu() {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        if (!res.ok) throw new Error("not authed");
        const data = await res.json();
        if (mounted) setMe(data);
      } catch {
        if (mounted) setMe(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  if (loading) {
    return <div className="h-6 w-28 rounded bg-white/10 animate-pulse" />;
  }

  if (!me) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <a href="/login" className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:bg-white/10">Login</a>
        <a href="/signup" className="px-3 py-1.5 rounded-md bg-[var(--ibm-blue,#0f62fe)] hover:brightness-110 text-slate-900 font-semibold">Get Started</a>
      </div>
    );
  }

  const isDoctor = me.role === "DOCTOR";
  return (
    <div className="flex items-center gap-2 text-sm">
      {isDoctor ? (
        <a href="/doctor/dashboard" className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:bg-white/10">Doctor</a>
      ) : (
        <a href="/dashboard" className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:bg-white/10">Dashboard</a>
      )}
      <button onClick={logout} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:bg-white/10">Logout</button>
    </div>
  );
}
