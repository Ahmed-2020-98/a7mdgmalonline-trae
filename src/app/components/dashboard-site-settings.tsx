"use client";

import { useMemo, useState } from "react";
import { buildClientApiUrl } from "../lib/api-base";
import { Client, HeroContent, Service, ServiceIconName } from "../lib/types";

type DashboardSiteSettingsProps = {
  initialHero: HeroContent;
  initialServices: Service[];
  initialClients: Client[];
};

const emptyService = { id: "", title: "", description: "", icon: "info-site" as ServiceIconName };
const emptyClient = { id: "", name: "", logoKey: "client-logo" };

export default function DashboardSiteSettings({
  initialHero,
  initialServices,
  initialClients,
}: DashboardSiteSettingsProps) {
  const [hero, setHero] = useState({
    title: initialHero.title,
    description: initialHero.description,
    ctaLabel: initialHero.ctaLabel,
    ctaHref: initialHero.ctaHref,
    secondaryCtaLabel: initialHero.secondaryCtaLabel,
    secondaryCtaHref: initialHero.secondaryCtaHref,
    imageKey: "hero-webp",
    imageAlt: initialHero.imageAlt,
  });
  const [services, setServices] = useState<Service[]>(initialServices);
  const [serviceForm, setServiceForm] = useState(emptyService);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [clientForm, setClientForm] = useState(emptyClient);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"hero" | "services" | "clients">("hero");

  const isEditingService = useMemo(() => Boolean(serviceForm.id), [serviceForm.id]);
  const isEditingClient = useMemo(() => Boolean(clientForm.id), [clientForm.id]);

  const loadAll = async () => {
    const [servicesRes, clientsRes] = await Promise.all([
      fetch(buildClientApiUrl("/api/services")),
      fetch(buildClientApiUrl("/api/clients")),
    ]);
    const servicesData = (await servicesRes.json()) as Service[];
    const clientsData = (await clientsRes.json()) as Client[];
    setServices(servicesData);
    setClients(clientsData);
  };


  const saveHero = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await fetch(buildClientApiUrl("/api/hero"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hero),
    });
    setLoading(false);
  };

  const saveService = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await fetch(buildClientApiUrl("/api/services"), {
      method: isEditingService ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serviceForm),
    });
    await loadAll();
    setServiceForm(emptyService);
    setLoading(false);
  };

  const editService = (service: Service) => {
    setServiceForm({
      id: service.id ?? "",
      title: service.title,
      description: service.description,
      icon: service.icon,
    });
  };

  const deleteService = async (id?: string) => {
    if (!id) {
      return;
    }
    setLoading(true);
    await fetch(buildClientApiUrl("/api/services"), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await loadAll();
    setLoading(false);
  };

  const saveClient = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const payload = { id: clientForm.id || undefined, name: clientForm.name, logoKey: clientForm.logoKey };
    await fetch(buildClientApiUrl("/api/clients"), {
      method: isEditingClient ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    await loadAll();
    setClientForm(emptyClient);
    setLoading(false);
  };

  const editClient = (client: Client) => {
    setClientForm({
      id: client.id ?? "",
      name: client.name,
      logoKey: "client-logo",
    });
  };

  const deleteClient = async (id?: string) => {
    if (!id) {
      return;
    }
    setLoading(true);
    await fetch(buildClientApiUrl("/api/clients"), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await loadAll();
    setLoading(false);
  };

  const tabs = [
    { id: "hero" as const, label: "الهيرو" },
    { id: "services" as const, label: "الخدمات" },
    { id: "clients" as const, label: "العملاء" },
  ];

  const icons: ServiceIconName[] = ["info-site", "cart-basket", "wordpress", "next-laravel"];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">لوحة التحكم</h1>
            <p className="mt-2 text-sm text-foreground/70">
              إدارة محتوى الموقع: الهيرو والخدمات والعملاء والمشاريع.
            </p>
          </div>
          <form action="/api/auth/logout" method="post">
            <button
              type="submit"
              className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground/70 transition hover:border-primary/40 hover:text-primary"
            >
              تسجيل خروج
            </button>
          </form>
        </div>

        <div className="flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === item.id
                  ? "bg-primary text-white shadow-sm shadow-primary/30"
                  : "border border-border bg-background text-foreground/70 hover:border-primary/40 hover:text-primary"
              }`}
              aria-pressed={tab === item.id}
            >
              {item.label}
            </button>
          ))}
          <a
            href="/dashboard"
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground/70 transition hover:border-primary/40 hover:text-primary"
          >
            المشاريع
          </a>
        </div>

        {tab === "hero" ? (
          <form
            onSubmit={saveHero}
            className="rounded-3xl border border-border bg-background p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-foreground">الهيرو</h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <label className="flex flex-col gap-2 lg:col-span-2">
                <span className="text-sm font-semibold text-foreground">العنوان</span>
                <input
                  value={hero.title}
                  onChange={(e) => setHero({ ...hero, title: e.target.value })}
                  className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 lg:col-span-2">
                <span className="text-sm font-semibold text-foreground">الوصف</span>
                <textarea
                  value={hero.description}
                  onChange={(e) => setHero({ ...hero, description: e.target.value })}
                  className="min-h-[120px] rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                  required
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-foreground">زر أساسي</span>
                <input
                  value={hero.ctaLabel}
                  onChange={(e) => setHero({ ...hero, ctaLabel: e.target.value })}
                  className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                  required
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-foreground">رابط الزر</span>
                <input
                  value={hero.ctaHref}
                  onChange={(e) => setHero({ ...hero, ctaHref: e.target.value })}
                  className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                  required
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-foreground">زر ثانوي</span>
                <input
                  value={hero.secondaryCtaLabel}
                  onChange={(e) =>
                    setHero({ ...hero, secondaryCtaLabel: e.target.value })
                  }
                  className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                  required
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-foreground">رابط الزر الثانوي</span>
                <input
                  value={hero.secondaryCtaHref}
                  onChange={(e) =>
                    setHero({ ...hero, secondaryCtaHref: e.target.value })
                  }
                  className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 lg:col-span-2">
                <span className="text-sm font-semibold text-foreground">وصف الصورة</span>
                <input
                  value={hero.imageAlt}
                  onChange={(e) => setHero({ ...hero, imageAlt: e.target.value })}
                  className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                  required
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-70"
            >
              حفظ
            </button>
          </form>
        ) : null}

        {tab === "services" ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <form
              onSubmit={saveService}
              className="rounded-3xl border border-border bg-background p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-foreground">الخدمات</h2>
              <div className="mt-4 grid gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-foreground">العنوان</span>
                  <input
                    value={serviceForm.title}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, title: e.target.value })
                    }
                    className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                    required
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-foreground">الأيقونة</span>
                  <select
                    value={serviceForm.icon}
                    onChange={(e) =>
                      setServiceForm({
                        ...serviceForm,
                        icon: e.target.value as ServiceIconName,
                      })
                    }
                    className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                  >
                    {icons.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-foreground">الوصف</span>
                  <textarea
                    value={serviceForm.description}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, description: e.target.value })
                    }
                    className="min-h-[120px] rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                    required
                  />
                </label>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-70"
                >
                  {isEditingService ? "حفظ" : "إضافة"}
                </button>
                <button
                  type="button"
                  onClick={() => setServiceForm(emptyService)}
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground/70 transition hover:border-primary/40 hover:text-primary"
                >
                  تفريغ
                </button>
              </div>
            </form>
            <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">
                الخدمات الحالية
              </h2>
              <div className="mt-4 grid gap-3">
                {services.map((service) => (
                  <div
                    key={service.id ?? service.title}
                    className="flex flex-col gap-3 rounded-2xl border border-border p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">{service.title}</p>
                      <p className="text-xs text-foreground/60">{service.icon}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => editService(service)}
                        className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground/70 transition hover:border-primary/40 hover:text-primary"
                      >
                        تعديل
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteService(service.id)}
                        className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-500 transition hover:border-red-300 hover:text-red-600"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {tab === "clients" ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <form
              onSubmit={saveClient}
              className="rounded-3xl border border-border bg-background p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-foreground">العملاء</h2>
              <div className="mt-4 grid gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-foreground">اسم العميل</span>
                  <input
                    value={clientForm.name}
                    onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                    className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                    required
                  />
                </label>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-70"
                >
                  {isEditingClient ? "حفظ" : "إضافة"}
                </button>
                <button
                  type="button"
                  onClick={() => setClientForm(emptyClient)}
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground/70 transition hover:border-primary/40 hover:text-primary"
                >
                  تفريغ
                </button>
              </div>
            </form>
            <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">العملاء الحاليين</h2>
              <div className="mt-4 grid gap-3">
                {clients.map((client) => (
                  <div
                    key={client.id ?? client.name}
                    className="flex flex-col gap-3 rounded-2xl border border-border p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <p className="text-sm font-semibold text-foreground">{client.name}</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => editClient(client)}
                        className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground/70 transition hover:border-primary/40 hover:text-primary"
                      >
                        تعديل
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteClient(client.id)}
                        className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-500 transition hover:border-red-300 hover:text-red-600"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
