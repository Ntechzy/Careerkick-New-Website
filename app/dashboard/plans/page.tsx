"use client";

import { useEffect, useMemo, useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { CommonDialog } from "@/components/dashboard/CommonDialog";

type DashboardPlan = {
  id: string;
  title: string;
  description: string;
  totalAmount: number;
  allowedPartialAmounts: number[];
  isActive: boolean;
};

type PlanFormState = Omit<DashboardPlan, "id" | "allowedPartialAmounts"> & {
  allowedPartialAmounts: string;
};

const emptyPlanForm: PlanFormState = {
  title: "",
  description: "",
  totalAmount: 0,
  allowedPartialAmounts: "",
  isActive: true,
};

type BackendPlan = Partial<DashboardPlan> & {
  _id?: string;
  id?: string;
};

function normalizePlan(plan: BackendPlan): DashboardPlan {
  return {
    id: plan._id ?? plan.id ?? `plan-${Date.now()}`,
    title: plan.title ?? "",
    description: plan.description ?? "",
    totalAmount: plan.totalAmount ?? 0,
    allowedPartialAmounts: Array.isArray(plan.allowedPartialAmounts)
      ? plan.allowedPartialAmounts
      : [],
    isActive: plan.isActive ?? false,
  };
}

function toFormState(plan: DashboardPlan): PlanFormState {
  return {
    title: plan.title,
    description: plan.description,
    totalAmount: plan.totalAmount,
    allowedPartialAmounts: plan.allowedPartialAmounts.join(", "),
    isActive: plan.isActive,
  };
}

function parsePartialAmounts(value: string) {
  return value
    .split(",")
    .map((item) => Number(item.trim()))
    .filter((item) => Number.isFinite(item) && item > 0);
}

export default function PlansPage() {
  const [plans, setPlans] = useState<DashboardPlan[]>([]);
  const [dialog, setDialog] = useState<"create" | "view" | "update" | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<DashboardPlan | null>(null);
  const [form, setForm] = useState<PlanFormState>(emptyPlanForm);
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);
  const [plansError, setPlansError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [viewingPlanId, setViewingPlanId] = useState<string | null>(null);
  const [deletingPlanId, setDeletingPlanId] = useState<string | null>(null);

  const dialogTitle = useMemo(() => {
    if (dialog === "create") return "Create Plan";
    if (dialog === "update") return "Update Plan";
    return "View Plan";
  }, [dialog]);

  useEffect(() => {
    async function loadPlans() {
      setIsLoadingPlans(true);
      setPlansError(null);

      try {
        const token = window.localStorage.getItem("careerkick-dashboard-token");
        const response = await fetch("/api/plans?page=1&limit=20", {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          cache: "no-store",
        });
        const data = await response.json();

        if (!response.ok) {
          setPlansError(data?.message ?? "Unable to load plans.");
          return;
        }

        const planList = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.plans)
            ? data.plans
            : [];

        setPlans(planList.map((plan: BackendPlan) => normalizePlan(plan)));
      } catch {
        setPlansError("Unable to connect to plans service.");
      } finally {
        setIsLoadingPlans(false);
      }
    }

    void loadPlans();
  }, []);

  function openCreate() {
    setSelectedPlan(null);
    setForm(emptyPlanForm);
    setDialog("create");
  }

  function openPlan(nextDialog: "view" | "update", plan: DashboardPlan) {
    setSelectedPlan(plan);
    setForm(toFormState(plan));
    setDialog(nextDialog);
  }

  async function viewPlan(plan: DashboardPlan) {
    setViewingPlanId(plan.id);

    try {
      const token = window.localStorage.getItem("careerkick-dashboard-token");
      const response = await fetch(`/api/plans/${encodeURIComponent(plan.id)}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data?.message ?? "Unable to load plan details.");
        return;
      }

      const planDetails = data?.data?.plan ?? data?.plan ?? data?.data ?? data;
      openPlan("view", normalizePlan(planDetails));
    } catch {
      alert("Unable to connect to plans service.");
    } finally {
      setViewingPlanId(null);
    }
  }

  function closeDialog() {
    setDialog(null);
    setSelectedPlan(null);
  }

  async function deletePlan(plan: DashboardPlan) {
    setDeletingPlanId(plan.id);

    try {
      const token = window.localStorage.getItem("careerkick-dashboard-token");
      const response = await fetch(`/api/plans/${encodeURIComponent(plan.id)}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data?.message ?? "Unable to delete plan.");
        return;
      }

      setPlans((current) => current.filter((item) => item.id !== plan.id));
    } catch {
      alert("Unable to connect to plans service.");
    } finally {
      setDeletingPlanId(null);
    }
  }

  async function savePlan() {
    const payload = {
      title: form.title,
      description: form.description,
      totalAmount: Number(form.totalAmount),
      allowedPartialAmounts: parsePartialAmounts(form.allowedPartialAmounts),
      isActive: form.isActive,
    };

    if (dialog === "create") {
      setIsSaving(true);

      try {
        const token = window.localStorage.getItem("careerkick-dashboard-token");
        const response = await fetch("/api/plans", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();

        if (!response.ok) {
          alert(data?.message ?? "Unable to create plan.");
          return;
        }

        const createdPlan = data?.data?.plan ?? data?.plan ?? data?.data ?? data;
        setPlans((current) => [normalizePlan({ ...payload, ...createdPlan }), ...current]);
      } catch {
        alert("Unable to connect to plans service.");
        return;
      } finally {
        setIsSaving(false);
      }
    }

    if (dialog === "update" && selectedPlan) {
      setIsSaving(true);

      try {
        const token = window.localStorage.getItem("careerkick-dashboard-token");
        const response = await fetch(`/api/plans/${encodeURIComponent(selectedPlan.id)}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();

        if (!response.ok) {
          alert(data?.message ?? "Unable to update plan.");
          return;
        }

        const updatedPlan = data?.data?.plan ?? data?.plan ?? data?.data ?? data;
        setPlans((current) =>
          current.map((plan) =>
            plan.id === selectedPlan.id
              ? normalizePlan({ id: selectedPlan.id, ...payload, ...updatedPlan })
              : plan,
          ),
        );
      } catch {
        alert("Unable to connect to plans service.");
        return;
      } finally {
        setIsSaving(false);
      }
    }

    closeDialog();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-4 shadow-[var(--dash-shadow)] sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0">
          <h2 className="text-xl font-black leading-tight">Plans</h2>
          <p className="mt-1 text-sm font-semibold text-[var(--dash-muted)]">
            Create, review, update and remove counselling plans.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[var(--dash-primary)] px-4 text-sm font-black text-white transition hover:bg-[var(--dash-primary-strong)] sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Create Plan
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] shadow-[var(--dash-shadow)]">
        <div className="hidden">
          {isLoadingPlans ? (
            <div className="rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface-strong)] px-4 py-8 text-center text-sm font-bold text-[var(--dash-muted)]">
              Loading plans...
            </div>
          ) : null}
          {!isLoadingPlans && plansError ? (
            <div className="rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface-strong)] px-4 py-8 text-center text-sm font-bold text-[var(--dash-danger)]">
              {plansError}
            </div>
          ) : null}
          {!isLoadingPlans && !plansError && plans.length === 0 ? (
            <div className="rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface-strong)] px-4 py-8 text-center text-sm font-bold text-[var(--dash-muted)]">
              No plans found.
            </div>
          ) : null}
          {plans.map((plan) => (
            <article key={plan.id} className="rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface-strong)] p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="break-words text-base font-black leading-snug">{plan.title}</h3>
                  <p className="mt-1 line-clamp-3 break-words text-sm font-semibold leading-6 text-[var(--dash-muted)]">
                    {plan.description}
                  </p>
                </div>
                <span className="shrink-0 rounded-md bg-[var(--dash-primary)] px-2.5 py-1 text-[11px] font-black text-white">
                  {plan.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="mt-4 grid gap-3 text-sm">
                <div className="flex items-center justify-between gap-3 rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface)] px-3 py-2">
                  <span className="font-bold text-[var(--dash-muted)]">Total</span>
                  <span className="font-black">â‚¹{plan.totalAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface)] px-3 py-2">
                  <span className="font-bold text-[var(--dash-muted)]">Partial Amounts</span>
                  <p className="mt-1 break-words font-black">
                    {plan.allowedPartialAmounts.length > 0
                      ? plan.allowedPartialAmounts.map((item) => `â‚¹${item.toLocaleString("en-IN")}`).join(", ")
                      : "None"}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <button type="button" onClick={() => viewPlan(plan)} className="inline-flex h-10 items-center justify-center rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface)]" aria-label="View plan">
                  {viewingPlanId === plan.id ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--dash-muted)] border-t-transparent" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                <button type="button" onClick={() => openPlan("update", plan)} className="inline-flex h-10 items-center justify-center rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface)]" aria-label="Update plan">
                  <Pencil className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => deletePlan(plan)} className="inline-flex h-10 items-center justify-center rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface)] text-[var(--dash-danger)]" aria-label="Delete plan">
                  {deletingPlanId === plan.id ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--dash-danger)] border-t-transparent" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-[var(--dash-surface-strong)] text-xs uppercase tracking-[0.14em] text-[var(--dash-muted)]">
              <tr>
                <th className="px-4 py-4">Title</th>
                <th className="px-4 py-4">Description</th>
                <th className="px-4 py-4">Total Amount</th>
                <th className="px-4 py-4">Partial Amounts</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--dash-border)]">
              {isLoadingPlans ? (
                <tr>
                  <td className="px-4 py-8 text-center font-bold text-[var(--dash-muted)]" colSpan={6}>
                    Loading plans...
                  </td>
                </tr>
              ) : null}
              {!isLoadingPlans && plansError ? (
                <tr>
                  <td className="px-4 py-8 text-center font-bold text-[var(--dash-danger)]" colSpan={6}>
                    {plansError}
                  </td>
                </tr>
              ) : null}
              {!isLoadingPlans && !plansError && plans.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center font-bold text-[var(--dash-muted)]" colSpan={6}>
                    No plans found.
                  </td>
                </tr>
              ) : null}
              {plans.map((plan) => (
                <tr key={plan.id}>
                  <td className="max-w-[14rem] px-4 py-4 font-black">{plan.title}</td>
                  <td className="max-w-[18rem] px-4 py-4 text-[var(--dash-muted)]">{plan.description}</td>
                  <td className="px-4 py-4 font-black">₹{plan.totalAmount.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-4">{plan.allowedPartialAmounts.map((item) => `₹${item.toLocaleString("en-IN")}`).join(", ")}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-md bg-[var(--dash-primary)] px-2.5 py-1 text-xs font-black text-white">
                      {plan.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => viewPlan(plan)} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface-strong)]" aria-label="View plan">
                        {viewingPlanId === plan.id ? (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--dash-muted)] border-t-transparent" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      <button type="button" onClick={() => openPlan("update", plan)} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface-strong)]" aria-label="Update plan">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => deletePlan(plan)} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface-strong)] text-[var(--dash-danger)]" aria-label="Delete plan">
                        {deletingPlanId === plan.id ? (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--dash-danger)] border-t-transparent" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CommonDialog
        open={dialog !== null}
        title={dialogTitle}
        description={dialog === "view" ? "Plan details" : "Use the same plan fields required by checkout."}
        onClose={closeDialog}
      >
        {dialog === "view" && selectedPlan ? (
          <div className="space-y-4 text-sm">
            {Object.entries({
              title: selectedPlan.title,
              description: selectedPlan.description,
              totalAmount: selectedPlan.totalAmount,
              allowedPartialAmounts: selectedPlan.allowedPartialAmounts.join(", "),
              isActive: String(selectedPlan.isActive),
            }).map(([key, value]) => (
              <div key={key} className="rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface-strong)] p-3">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--dash-muted)]">{key}</p>
                <p className="mt-1 font-bold">{value}</p>
              </div>
            ))}
          </div>
        ) : (
          <PlanForm form={form} setForm={setForm} onCancel={closeDialog} onSave={savePlan} isSaving={isSaving} />
        )}
      </CommonDialog>
    </div>
  );
}

function PlanForm({
  form,
  setForm,
  onCancel,
  onSave,
  isSaving,
}: {
  form: PlanFormState;
  setForm: React.Dispatch<React.SetStateAction<PlanFormState>>;
  onCancel: () => void;
  onSave: () => void;
  isSaving: boolean;
}) {
  return (
    <form className="space-y-4">
      <PlanField label="Title" value={form.title} onChange={(value) => setForm((current) => ({ ...current, title: value }))} />
      <PlanField label="Description" value={form.description} onChange={(value) => setForm((current) => ({ ...current, description: value }))} />
      <PlanField label="Total Amount" type="number" value={String(form.totalAmount)} onChange={(value) => setForm((current) => ({ ...current, totalAmount: Number(value) }))} />
      <PlanField label="Allowed Partial Amounts" value={form.allowedPartialAmounts} onChange={(value) => setForm((current) => ({ ...current, allowedPartialAmounts: value }))} />
      <label className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-950">
        Is Active
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(event) => setForm((current) => ({ ...current, isActive: event.target.checked }))}
          className="h-5 w-5 accent-[#16a34a]"
        />
      </label>
      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} className="h-11 rounded-md border border-slate-200 bg-white px-4 text-sm font-black text-slate-950">
          Cancel
        </button>
        <button type="button" onClick={onSave} disabled={isSaving} className="h-11 rounded-md bg-[#16a34a] px-4 text-sm font-black text-white shadow-[0_12px_24px_rgba(22,163,74,0.24)] transition hover:bg-[#15803d] disabled:cursor-not-allowed disabled:opacity-70">
          {isSaving ? "Saving..." : "Save Plan"}
        </button>
      </div>
    </form>
  );
}

function PlanField({
  label,
  value,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-black text-slate-950">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-950"
      />
    </label>
  );
}
