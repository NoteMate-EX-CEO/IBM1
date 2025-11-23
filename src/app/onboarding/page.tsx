"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { id: string; role: "system" | "assistant" | "user"; text: string };

export default function OnboardingPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: "m0", role: "assistant", text: "Hi, I’m your care assistant. I’ll guide your onboarding. What brings you in today?" },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  async function send() {
    const content = input.trim();
    if (!content || sending) return;
    setInput("");
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text: content };
    setMessages((prev) => [...prev, userMsg]);
    setSending(true);
    try {
      // Simulate create-patient success without echoing any assistant output
      await new Promise((r) => setTimeout(r, 500));
      setDone(true);
    } finally {
      setSending(false);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0b1413_0%,#0d1117_100%)] text-white">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold">Patient Onboarding</h1>
        <p className="text-slate-300/80 mt-1">Answer a few questions to get you the right care quickly.</p>

        <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 h-[65vh] flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {messages.map((m) => (
              <Message key={m.id} role={m.role} text={m.text} />
            ))}
            <div ref={endRef} />
          </div>
          <div className="mt-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Type your message..."
              disabled={done}
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--ibm-blue,#0f62fe)] disabled:opacity-60"
            />
            <button
              onClick={send}
              disabled={sending || done}
              className="px-4 py-3 rounded-lg bg-[var(--ibm-blue,#0f62fe)] hover:brightness-110 text-slate-900 font-semibold disabled:opacity-60"
            >
              {done ? "Done" : sending ? "Sending..." : "Send"}
            </button>
          </div>
          {done ? (
            <div className="mt-3 text-sm px-4 py-3 rounded-lg bg-emerald-500/20 text-emerald-200 border border-emerald-500/30">
              Patient created successfully.
            </div>
          ) : (
            <div className="mt-3 text-xs text-slate-400">This is a demo chat. Do not share sensitive information.</div>
          )}
        </div>
      </main>
    </div>
  );
}

function Message({ role, text }: { role: Msg["role"]; text: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm border ${
        isUser
          ? "bg-[var(--ibm-blue,#0f62fe)] text-slate-900 border-transparent"
          : "bg-black/40 text-white border-white/10"
      }`}
      >
        {text}
      </div>
    </div>
  );
}

// No assistant output; success-only flow
