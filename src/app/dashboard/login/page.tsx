"use client";

import { useState } from "react";

export default function DashboardLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      setError("بيانات الدخول غير صحيحة.");
      setLoading(false);
      return;
    }
    const next = new URLSearchParams(window.location.search).get("next");
    window.location.href = next ?? "/dashboard";
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-16 sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-3xl border border-border bg-background p-6 shadow-sm"
      >
        <h1 className="text-2xl font-semibold text-foreground">تسجيل الدخول</h1>
        <p className="mt-2 text-sm text-foreground/70">
          أدخل بيانات الدخول للوصول إلى لوحة التحكم.
        </p>
        {error ? (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}
        <div className="mt-6 grid gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-foreground">
              اسم المستخدم
            </span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-foreground">
              كلمة المرور
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-70"
        >
          {loading ? "جاري الدخول..." : "دخول"}
        </button>
      </form>
    </div>
  );
}

