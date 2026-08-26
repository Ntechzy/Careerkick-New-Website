"use client";

import { useEffect, useState } from "react";
import { BadgeIndianRupee, CalendarDays, Percent, Pencil, Plus, TicketPercent, Trash2 } from "lucide-react";
import { CommonDialog } from "@/components/dashboard/CommonDialog";

type Coupon = {
  id: string;
  planId: string;
  code: string;
  label: string;
  type: string;
  value: number;
  minimumOrderAmount: number;
  validUntil: string;
  status: string;
};

type CouponFormState = {
  planId: string;
  code: string;
  discountType: string;
  discountValue: number;
  validUntil: string;
  isActive: boolean;
};

type ValidateCouponFormState = {
  planId: string;
  code: string;
};

type PlanOption = {
  id: string;
  title: string;
};

type CouponValidationResult = {
  couponCode?: string;
  discountType?: string;
  discountValue?: number;
  discountAmount?: number;
  originalAmount?: number;
  finalAmount?: number;
};

type BackendCoupon = {
  _id?: string;
  id?: string;
  code?: string;
  discountType?: string;
  discountValue?: number;
  validUntil?: string;
  isActive?: boolean;
};

const emptyCouponForm: CouponFormState = {
  planId: "",
  code: "",
  discountType: "FLAT",
  discountValue: 0,
  validUntil: "",
  isActive: true,
};

const emptyValidateCouponForm: ValidateCouponFormState = {
  planId: "",
  code: "",
};

function normalizeCoupon(coupon: BackendCoupon, planTitle: string, planId: string): Coupon {
  return {
    id: coupon._id ?? coupon.id ?? coupon.code ?? `coupon-${Date.now()}`,
    planId,
    code: coupon.code ?? "",
    label: planTitle,
    type: coupon.discountType ?? "",
    value: coupon.discountValue ?? 0,
    minimumOrderAmount: 0,
    validUntil: coupon.validUntil ?? "",
    status: coupon.isActive ? "Active" : "Paused",
  };
}

function toDateTimeLocal(value: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 16);
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<CouponFormState>(emptyCouponForm);
  const [plans, setPlans] = useState<PlanOption[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);
  const [plansError, setPlansError] = useState<string | null>(null);
  const [isLoadingCoupons, setIsLoadingCoupons] = useState(false);
  const [couponsError, setCouponsError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editingCouponId, setEditingCouponId] = useState<string | null>(null);
  const [couponPendingDelete, setCouponPendingDelete] = useState<Coupon | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [validateDialogOpen, setValidateDialogOpen] = useState(false);
  const [validateForm, setValidateForm] = useState<ValidateCouponFormState>(emptyValidateCouponForm);
  const [isValidating, setIsValidating] = useState(false);
  const [validateError, setValidateError] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<CouponValidationResult | null>(null);

  const activeCoupons = coupons.filter((coupon) => coupon.status === "Active").length;
  const expiringSoon = coupons.filter((coupon) => {
    if (!coupon.validUntil) {
      return false;
    }

    const validUntil = new Date(coupon.validUntil).getTime();
    const now = Date.now();
    const nextThirtyDays = now + 30 * 24 * 60 * 60 * 1000;

    return validUntil >= now && validUntil <= nextThirtyDays;
  }).length;
  const discountValue = coupons.reduce((total, coupon) => total + coupon.value, 0);
  const stats = [
    { label: "Active coupons", value: String(activeCoupons), icon: TicketPercent },
    { label: "Total coupons", value: String(coupons.length), icon: Percent },
    { label: "Discount value", value: `Rs ${discountValue.toLocaleString("en-IN")}`, icon: BadgeIndianRupee },
    { label: "Expiring soon", value: String(expiringSoon), icon: CalendarDays },
  ];

  async function loadCoupons(plan: PlanOption) {
    setSelectedPlanId(plan.id);
    setIsLoadingCoupons(true);
    setCouponsError(null);

    try {
      const token = window.localStorage.getItem("careerkick-dashboard-token");
      const response = await fetch(`/api/plans/${encodeURIComponent(plan.id)}/coupons`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok) {
        setCouponsError(data?.message ?? "Unable to load coupons.");
        setCoupons([]);
        return;
      }

      const couponList = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.coupons)
          ? data.coupons
          : [];

      setCoupons(couponList.map((coupon: BackendCoupon) => normalizeCoupon(coupon, plan.title, plan.id)));
    } catch {
      setCouponsError("Unable to connect to coupon service.");
      setCoupons([]);
    } finally {
      setIsLoadingCoupons(false);
    }
  }

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
        const nextPlans = planList
          .map((plan: { _id?: string; id?: string; title?: string }) => ({
            id: plan._id ?? plan.id ?? "",
            title: plan.title ?? "Untitled plan",
          }))
          .filter((plan: PlanOption) => plan.id);

        setPlans(nextPlans);

        if (nextPlans[0]) {
          void loadCoupons(nextPlans[0]);
        }
      } catch {
        setPlansError("Unable to connect to plans service.");
      } finally {
        setIsLoadingPlans(false);
      }
    }

    void loadPlans();
  }, []);

  function openCreateDialog() {
    setEditingCouponId(null);
    setForm({ ...emptyCouponForm, planId: selectedPlanId });
    setDialogOpen(true);
  }

  function openValidateDialog() {
    setValidateForm({ ...emptyValidateCouponForm, planId: selectedPlanId });
    setValidationResult(null);
    setValidateError(null);
    setValidateDialogOpen(true);
  }

  function openEditDialog(coupon: Coupon) {
    setEditingCouponId(coupon.id);
    setForm({
      planId: coupon.planId,
      code: coupon.code,
      discountType: coupon.type,
      discountValue: coupon.value,
      validUntil: toDateTimeLocal(coupon.validUntil),
      isActive: coupon.status === "Active",
    });
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
    setEditingCouponId(null);
    setForm(emptyCouponForm);
  }

  function closeValidateDialog() {
    setValidateDialogOpen(false);
    setValidateForm(emptyValidateCouponForm);
    setValidationResult(null);
    setValidateError(null);
  }

  async function saveCoupon() {
    if (!form.planId) {
      alert("Please select a plan.");
      return;
    }

    const payload = {
      code: form.code,
      discountType: form.discountType,
      discountValue: Number(form.discountValue),
      validUntil: form.validUntil ? new Date(form.validUntil).toISOString() : "",
      isActive: form.isActive,
    };

    setIsSaving(true);

    try {
      const token = window.localStorage.getItem("careerkick-dashboard-token");
      const endpoint = editingCouponId
        ? `/api/plans/${encodeURIComponent(form.planId)}/coupons/${encodeURIComponent(editingCouponId)}`
        : `/api/plans/${encodeURIComponent(form.planId)}/coupons`;
      const response = await fetch(endpoint, {
        method: editingCouponId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data?.message ?? (editingCouponId ? "Unable to update coupon." : "Unable to create coupon."));
        return;
      }

      const savedCoupon = data?.data?.coupon ?? data?.coupon ?? data?.data ?? payload;
      const selectedPlan = plans.find((plan) => plan.id === form.planId);

      if (editingCouponId) {
        setCoupons((current) =>
          current.map((coupon) =>
            coupon.id === editingCouponId
              ? normalizeCoupon({ ...savedCoupon, ...payload, _id: editingCouponId }, selectedPlan?.title ?? coupon.label, form.planId)
              : coupon,
          ),
        );
      } else if (form.planId === selectedPlanId) {
        setCoupons((current) => [
          normalizeCoupon(savedCoupon, selectedPlan?.title ?? form.planId, form.planId),
          ...current,
        ]);
      }

      closeDialog();
    } catch {
      alert("Unable to connect to coupon service.");
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteCoupon() {
    if (!couponPendingDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      const token = window.localStorage.getItem("careerkick-dashboard-token");
      const response = await fetch(`/api/plans/${encodeURIComponent(couponPendingDelete.planId)}/coupons/${encodeURIComponent(couponPendingDelete.id)}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data?.message ?? "Unable to delete coupon.");
        return;
      }

      setCoupons((current) => current.filter((currentCoupon) => currentCoupon.id !== couponPendingDelete.id));
      setCouponPendingDelete(null);
    } catch {
      alert("Unable to connect to coupon service.");
    } finally {
      setIsDeleting(false);
    }
  }

  async function validateCoupon() {
    if (!validateForm.planId) {
      setValidateError("Please select a plan.");
      return;
    }

    if (!validateForm.code.trim()) {
      setValidateError("Please enter a coupon code.");
      return;
    }

    setIsValidating(true);
    setValidateError(null);
    setValidationResult(null);

    try {
      const token = window.localStorage.getItem("careerkick-dashboard-token");
      const response = await fetch(`/api/plans/${encodeURIComponent(validateForm.planId)}/coupons/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ code: validateForm.code.trim() }),
      });
      const data = await response.json();

      if (!response.ok) {
        setValidateError(data?.message ?? "Unable to validate coupon.");
        return;
      }

      setValidationResult(data?.data ?? null);
    } catch {
      setValidateError("Unable to connect to coupon service.");
    } finally {
      setIsValidating(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article key={stat.label} className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5 shadow-[var(--dash-shadow)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-[var(--dash-muted)]">{stat.label}</p>
                  <p className="mt-2 text-2xl font-black">{stat.value}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--dash-accent)] text-white">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <div className="flex flex-col gap-4 rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5 shadow-[var(--dash-shadow)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black">Coupon Codes</h2>
          <p className="mt-1 text-sm font-semibold text-[var(--dash-muted)]">
            Review discount codes available for counselling checkout.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={openValidateDialog}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface-strong)] px-4 text-sm font-black text-[var(--dash-foreground)] transition hover:border-[var(--dash-primary)] hover:text-[var(--dash-primary)]"
          >
            <TicketPercent className="h-4 w-4" />
            Validate Coupon
          </button>
          <button
            type="button"
            onClick={openCreateDialog}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[var(--dash-primary)] px-4 text-sm font-black text-white transition hover:bg-[var(--dash-primary-strong)]"
          >
            <Plus className="h-4 w-4" />
            Create Coupon
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] shadow-[var(--dash-shadow)]">
        <div className="border-b border-[var(--dash-border)] p-3">
          {isLoadingPlans ? (
            <p className="text-sm font-bold text-[var(--dash-muted)]">Loading plans...</p>
          ) : null}
          {!isLoadingPlans && plansError ? (
            <p className="text-sm font-bold text-[var(--dash-danger)]">{plansError}</p>
          ) : null}
          {!isLoadingPlans && !plansError ? (
            <div className="flex gap-2 overflow-x-auto">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => loadCoupons(plan)}
                  className={`shrink-0 rounded-md px-4 py-2 text-sm font-black transition ${
                    selectedPlanId === plan.id
                      ? "bg-[var(--dash-primary)] text-white"
                      : "border border-[var(--dash-border)] bg-[var(--dash-surface-strong)] text-[var(--dash-muted)]"
                  }`}
                >
                  {plan.title}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-[var(--dash-surface-strong)] text-xs uppercase tracking-[0.14em] text-[var(--dash-muted)]">
              <tr>
                <th className="px-4 py-4">Code</th>
                <th className="px-4 py-4">Plan</th>
                <th className="px-4 py-4">Type</th>
                <th className="px-4 py-4">Value</th>
                <th className="px-4 py-4">Valid Until</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--dash-border)]">
              {isLoadingCoupons ? (
                <tr>
                  <td className="px-4 py-8 text-center font-bold text-[var(--dash-muted)]" colSpan={7}>
                    Loading coupons...
                  </td>
                </tr>
              ) : null}
              {!isLoadingCoupons && couponsError ? (
                <tr>
                  <td className="px-4 py-8 text-center font-bold text-[var(--dash-danger)]" colSpan={7}>
                    {couponsError}
                  </td>
                </tr>
              ) : null}
              {!isLoadingCoupons && !couponsError && coupons.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center font-bold text-[var(--dash-muted)]" colSpan={7}>
                    No coupons found.
                  </td>
                </tr>
              ) : null}
              {coupons.map((coupon) => (
                <tr key={coupon.id}>
                  <td className="px-4 py-4 font-black">{coupon.code}</td>
                  <td className="px-4 py-4 text-[var(--dash-muted)]">{coupon.label}</td>
                  <td className="px-4 py-4 font-bold">{coupon.type}</td>
                  <td className="px-4 py-4 font-black">
                    {coupon.type === "PERCENTAGE" ? `${coupon.value}%` : `Rs ${coupon.value.toLocaleString("en-IN")}`}
                  </td>
                  <td className="px-4 py-4">
                    {coupon.validUntil ? new Date(coupon.validUntil).toLocaleDateString("en-IN") : "-"}
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-md bg-[var(--dash-primary)] px-2.5 py-1 text-xs font-black text-white">
                      {coupon.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditDialog(coupon)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--dash-border)] text-[var(--dash-muted)] transition hover:border-[var(--dash-primary)] hover:text-[var(--dash-primary)]"
                        aria-label={`Edit ${coupon.code}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCouponPendingDelete(coupon)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--dash-border)] text-[var(--dash-danger)] transition hover:border-[var(--dash-danger)] hover:bg-red-50"
                        aria-label={`Delete ${coupon.code}`}
                      >
                        <Trash2 className="h-4 w-4" />
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
        open={dialogOpen}
        title={editingCouponId ? "Edit Coupon" : "Create Coupon"}
        description={editingCouponId ? "Update this coupon code." : "Add a coupon code to a plan."}
        onClose={closeDialog}
      >
        <form className="space-y-4">
          <label className="block text-sm font-black text-slate-950">
            Plan
            <select
              value={form.planId}
              onChange={(event) => setForm((current) => ({ ...current, planId: event.target.value }))}
              className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-950"
              disabled={isLoadingPlans || Boolean(editingCouponId)}
            >
              <option value="">
                {isLoadingPlans ? "Loading plans..." : "Select plan"}
              </option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.title}
                </option>
              ))}
            </select>
            {plansError ? (
              <span className="mt-2 block text-xs font-bold text-red-600">{plansError}</span>
            ) : null}
          </label>
          <CouponField label="Code" value={form.code} onChange={(value) => setForm((current) => ({ ...current, code: value }))} />
          <label className="block text-sm font-black text-slate-950">
            Discount Type
            <select
              value={form.discountType}
              onChange={(event) => setForm((current) => ({ ...current, discountType: event.target.value }))}
              className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-950"
            >
              <option value="FLAT">FLAT</option>
              <option value="PERCENTAGE">PERCENTAGE</option>
            </select>
          </label>
          <CouponField label="Discount Value" type="number" value={String(form.discountValue)} onChange={(value) => setForm((current) => ({ ...current, discountValue: Number(value) }))} />
          <CouponField label="Valid Until" type="datetime-local" value={form.validUntil} onChange={(value) => setForm((current) => ({ ...current, validUntil: value }))} />
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
            <button type="button" onClick={closeDialog} className="h-11 rounded-md border border-slate-200 bg-white px-4 text-sm font-black text-slate-950">
              Cancel
            </button>
            <button type="button" onClick={saveCoupon} disabled={isSaving} className="h-11 rounded-md bg-[#16a34a] px-4 text-sm font-black text-white shadow-[0_12px_24px_rgba(22,163,74,0.24)] transition hover:bg-[#15803d] disabled:cursor-not-allowed disabled:opacity-70">
              {isSaving ? "Saving..." : editingCouponId ? "Update Coupon" : "Save Coupon"}
            </button>
          </div>
        </form>
      </CommonDialog>

      <CommonDialog
        open={Boolean(couponPendingDelete)}
        title="Delete Coupon"
        description={couponPendingDelete ? `Remove ${couponPendingDelete.code} from this plan?` : "Remove this coupon from this plan?"}
        onClose={() => {
          if (!isDeleting) {
            setCouponPendingDelete(null);
          }
        }}
      >
        <div className="space-y-5">
          <p className="text-sm font-semibold text-slate-600">
            This action will delete the coupon code from the selected plan.
          </p>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setCouponPendingDelete(null)}
              disabled={isDeleting}
              className="h-11 rounded-md border border-slate-200 bg-white px-4 text-sm font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={deleteCoupon}
              disabled={isDeleting}
              className="h-11 rounded-md bg-red-600 px-4 text-sm font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isDeleting ? "Deleting..." : "Delete Coupon"}
            </button>
          </div>
        </div>
      </CommonDialog>

      <CommonDialog
        open={validateDialogOpen}
        title="Validate Coupon"
        description="Check whether a coupon code is valid for a selected plan."
        onClose={closeValidateDialog}
      >
        <div className="space-y-4">
          <label className="block text-sm font-black text-slate-950">
            Plan
            <select
              value={validateForm.planId}
              onChange={(event) => setValidateForm((current) => ({ ...current, planId: event.target.value }))}
              className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-950"
              disabled={isLoadingPlans || isValidating}
            >
              <option value="">
                {isLoadingPlans ? "Loading plans..." : "Select plan"}
              </option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.title}
                </option>
              ))}
            </select>
          </label>
          <CouponField
            label="Coupon Code"
            value={validateForm.code}
            onChange={(value) => setValidateForm((current) => ({ ...current, code: value }))}
          />
          {validateError ? (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-600">
              {validateError}
            </p>
          ) : null}
          {validationResult ? (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-black text-slate-950">Discount Breakdown</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <ValidationStat label="Coupon Code" value={validationResult.couponCode ?? "-"} />
                <ValidationStat label="Discount Type" value={validationResult.discountType ?? "-"} />
                <ValidationStat label="Discount Value" value={formatDiscountValue(validationResult.discountType, validationResult.discountValue)} />
                <ValidationStat label="Discount Amount" value={formatCurrency(validationResult.discountAmount)} />
                <ValidationStat label="Original Amount" value={formatCurrency(validationResult.originalAmount)} />
                <ValidationStat label="Final Amount" value={formatCurrency(validationResult.finalAmount)} />
              </div>
            </div>
          ) : null}
          {!validationResult ? (
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeValidateDialog}
                disabled={isValidating}
                className="h-11 rounded-md border border-slate-200 bg-white px-4 text-sm font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={validateCoupon}
                disabled={isValidating}
                className="h-11 rounded-md bg-[#16a34a] px-4 text-sm font-black text-white shadow-[0_12px_24px_rgba(22,163,74,0.24)] transition hover:bg-[#15803d] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isValidating ? "Validating..." : "Validate Coupon"}
              </button>
            </div>
          ) : null}
        </div>
      </CommonDialog>
    </div>
  );
}

function ValidationStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-3">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-black text-slate-950">{value}</p>
    </div>
  );
}

function formatCurrency(value?: number) {
  if (typeof value !== "number") {
    return "-";
  }

  return `Rs ${value.toLocaleString("en-IN")}`;
}

function formatDiscountValue(type?: string, value?: number) {
  if (typeof value !== "number") {
    return "-";
  }

  return type === "PERCENTAGE" ? `${value}%` : `Rs ${value.toLocaleString("en-IN")}`;
}

function CouponField({
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
