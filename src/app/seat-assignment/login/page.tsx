"use client";

import { useState } from "react";

export default function OrganizerLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/seat-assignment/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j.error === "invalid_password" ? "Wrong password." : "Login failed.");
        setLoading(false);
        return;
      }
      window.location.href = "/seat-assignment";
    } catch {
      setError("Network error.");
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#0b0b0c", color: "#fff", fontFamily: "-apple-system,Segoe UI,Roboto,sans-serif", padding: 24 }}>
      <form onSubmit={onSubmit} style={{ width: "100%", maxWidth: 360, background: "#17171a", padding: 28, borderRadius: 12, border: "1px solid #2a2a2e" }}>
        <h1 style={{ fontSize: 22, marginBottom: 6, fontWeight: 600 }}>Seat Assignment</h1>
        <p style={{ fontSize: 14, color: "#a1a1aa", marginBottom: 20 }}>
          Belgium concert · CC De Factorij · 11 June 2026
        </p>
        <label htmlFor="pw" style={{ display: "block", fontSize: 13, color: "#d4d4d8", marginBottom: 6 }}>Organizer password</label>
        <input
          id="pw"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          required
          style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #3f3f46", background: "#0b0b0c", color: "#fff", fontSize: 15 }}
        />
        {error && <p style={{ color: "#f87171", fontSize: 13, marginTop: 12 }}>{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          style={{ marginTop: 18, width: "100%", padding: "10px 14px", borderRadius: 8, border: 0, background: "#fff", color: "#000", fontWeight: 600, fontSize: 15, cursor: loading ? "wait" : "pointer", opacity: loading || !password ? 0.6 : 1 }}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
