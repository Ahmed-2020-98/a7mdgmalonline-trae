"use client";

import { useMemo, useState } from "react";
import { buildClientApiUrl } from "../lib/api-base";
import { Project } from "../lib/types";

type DashboardProjectsProps = {
  initialProjects: Project[];
};

const emptyForm = {
  id: "",
  name: "",
  description: "",
  category: "",
  url: "",
  ctaLabel: "",
  image: "",
};

export default function DashboardProjects({
  initialProjects,
}: DashboardProjectsProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const isEditing = useMemo(() => Boolean(form.id), [form.id]);

  const loadProjects = async () => {
    const response = await fetch(buildClientApiUrl("/api/projects"));
    const data = (await response.json()) as Project[];
    setProjects(data);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const payload: Partial<Project> = {
      id: form.id || undefined,
      name: form.name,
      description: form.description,
      category: form.category,
      url: form.url,
      ctaLabel: form.ctaLabel,
      images: [
        form.image && form.image.length > 0
          ? form.image
          : "/images/project-placeholder.svg",
      ],
    };
    await fetch(buildClientApiUrl("/api/projects"), {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    await loadProjects();
    setForm(emptyForm);
    setLoading(false);
  };

  const handleEdit = (project: Project) => {
    setForm({
      id: project.id ?? "",
      name: project.name,
      description: project.description,
      category: project.category,
      url: project.url,
      ctaLabel: project.ctaLabel,
      image: project.images[0] ? String(project.images[0]) : "",
    });
  };

  const handleDelete = async (id?: string) => {
    if (!id) {
      return;
    }
    setLoading(true);
    await fetch(buildClientApiUrl("/api/projects"), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await loadProjects();
    setLoading(false);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">
              لوحة التحكم
            </h1>
            <p className="mt-2 text-sm text-foreground/70">
              إدارة المشاريع الظاهرة في الموقع.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="/dashboard/site"
              className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground/70 transition hover:border-primary/40 hover:text-primary"
            >
              إعدادات الموقع
            </a>
            <form action="/api/auth/logout" method="post">
              <button
                type="submit"
                className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground/70 transition hover:border-primary/40 hover:text-primary"
              >
                تسجيل خروج
              </button>
            </form>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-border bg-background p-6 shadow-sm"
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-foreground">
                اسم المشروع
              </span>
              <input
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                required
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-foreground">
                التصنيف
              </span>
              <input
                value={form.category}
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value })
                }
                className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                required
              />
            </label>
            <label className="flex flex-col gap-2 lg:col-span-2">
              <span className="text-sm font-semibold text-foreground">
                الوصف
              </span>
              <textarea
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                className="min-h-[120px] rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                required
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-foreground">
                رابط المشروع
              </span>
              <input
                value={form.url}
                onChange={(event) =>
                  setForm({ ...form, url: event.target.value })
                }
                className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                required
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-foreground">
                نص الزر
              </span>
              <input
                value={form.ctaLabel}
                onChange={(event) =>
                  setForm({ ...form, ctaLabel: event.target.value })
                }
                className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                required
              />
            </label>
            <label className="flex flex-col gap-2 lg:col-span-2">
              <span className="text-sm font-semibold text-foreground">
                صورة المشروع (رابط)
              </span>
              <input
                value={form.image}
                onChange={(event) =>
                  setForm({ ...form, image: event.target.value })
                }
                className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                placeholder="/images/project-placeholder.svg"
              />
            </label>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-70"
            >
              {isEditing ? "حفظ التعديلات" : "إضافة مشروع"}
            </button>
            <button
              type="button"
              onClick={() => setForm(emptyForm)}
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground/70 transition hover:border-primary/40 hover:text-primary"
            >
              تفريغ الحقول
            </button>
          </div>
        </form>

        <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">
            المشاريع الحالية
          </h2>
          <div className="mt-4 grid gap-4">
            {projects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-foreground/60">
                لا توجد مشاريع بعد.
              </div>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id ?? project.name}
                  className="flex flex-col gap-4 rounded-2xl border border-border p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">
                      {project.name}
                    </p>
                    <p className="text-xs text-foreground/60">
                      {project.category}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(project)}
                      className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground/70 transition hover:border-primary/40 hover:text-primary"
                    >
                      تعديل
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(project.id)}
                      className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-500 transition hover:border-red-300 hover:text-red-600"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
