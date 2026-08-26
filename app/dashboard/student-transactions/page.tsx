"use client";

import { BadgeIndianRupee, CreditCard, Eye, Pencil, ReceiptText, Trash2, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { CommonDialog } from "@/components/dashboard/CommonDialog";

type StudentTransaction = {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  planTitle: string;
  planAmount: number;
  transactionRef: string;
  amountPaid: number;
  cumulativePaid: number;
  remainingAmount: number;
  discountApplied: number;
  couponCode: string;
  paymentType: string;
  paymentStatus: string;
  paymentMethod: string;
  transactionDate: string;
  historyCount: number;
};

type PaymentAnnotationForm = {
  discountApplied: number;
  couponCode: string;
};

type BackendStudentTransaction = {
  _id?: string;
  id?: string;
  studentId?: string | { _id?: string; id?: string; name?: string; fullName?: string; email?: string; number?: string };
  student?: { _id?: string; id?: string; name?: string; fullName?: string; email?: string; number?: string };
  planId?: { _id?: string; id?: string; title?: string; totalAmount?: number };
  transactionId?: { _id?: string; id?: string; merchantTxnNo?: string; txnStatus?: string; paymentMode?: string };
  studentName?: string;
  name?: string;
  email?: string;
  studentEmail?: string;
  number?: string;
  planTitle?: string;
  planName?: string;
  paymentType?: string;
  paidAmount?: number;
  totalPlanAmount?: number;
  cumulativePaid?: number;
  remainingAmount?: number;
  discountApplied?: number;
  couponCode?: string | null;
  amountPaid?: number;
  amount?: number;
  paymentStatus?: string;
  status?: string;
  paymentMethod?: string;
  method?: string;
  paymentsHistory?: Array<{ amount?: number; date?: string; transactionId?: string; _id?: string }>;
  createdAt?: string;
  paidAt?: string;
  updatedAt?: string;
};

function normalizeTransaction(entry: BackendStudentTransaction): StudentTransaction {
  const studentSource =
    typeof entry.studentId === "object" && entry.studentId !== null
      ? entry.studentId
      : entry.student;
  const studentId =
    typeof entry.studentId === "string"
      ? entry.studentId
      : studentSource?._id ?? studentSource?.id ?? "";

  return {
    id: entry._id ?? entry.id ?? `payment-${Date.now()}`,
    studentId,
    studentName:
      entry.studentName ??
      entry.name ??
      studentSource?.name ??
      studentSource?.fullName ??
      "Unknown student",
    studentEmail:
      entry.studentEmail ??
      entry.email ??
      studentSource?.email ??
      "-",
    studentPhone: entry.number ?? studentSource?.number ?? "-",
    planTitle: entry.planTitle ?? entry.planName ?? entry.planId?.title ?? "-",
    planAmount: entry.totalPlanAmount ?? entry.planId?.totalAmount ?? 0,
    transactionRef: entry.transactionId?.merchantTxnNo ?? entry.transactionId?._id ?? entry.transactionId?.id ?? "-",
    amountPaid: entry.paidAmount ?? entry.amountPaid ?? entry.amount ?? 0,
    cumulativePaid: entry.cumulativePaid ?? entry.paidAmount ?? entry.amountPaid ?? entry.amount ?? 0,
    remainingAmount: entry.remainingAmount ?? 0,
    discountApplied: entry.discountApplied ?? 0,
    couponCode: entry.couponCode ?? "-",
    paymentType: entry.paymentType ?? "-",
    paymentStatus: entry.transactionId?.txnStatus ?? entry.paymentStatus ?? entry.status ?? "Unknown",
    paymentMethod: entry.transactionId?.paymentMode ?? entry.paymentMethod ?? entry.method ?? "-",
    transactionDate:
      entry.paymentsHistory?.[0]?.date ??
      entry.paidAt ??
      entry.createdAt ??
      entry.updatedAt ??
      "",
    historyCount: Array.isArray(entry.paymentsHistory) ? entry.paymentsHistory.length : 0,
  };
}

function formatCurrency(value: number) {
  return `Rs ${value.toLocaleString("en-IN")}`;
}

function formatDate(value: string) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function StudentTransactionsPage() {
  const [transactions, setTransactions] = useState<StudentTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<StudentTransaction | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isLoadingView, setIsLoadingView] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<StudentTransaction | null>(null);
  const [editForm, setEditForm] = useState<PaymentAnnotationForm>({ discountApplied: 0, couponCode: "" });
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [transactionPendingDelete, setTransactionPendingDelete] = useState<StudentTransaction | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function loadTransactions() {
      setIsLoading(true);
      setError(null);

      try {
        const token = window.localStorage.getItem("careerkick-dashboard-token");
        const response = await fetch("/api/student-payment-details", {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          cache: "no-store",
        });
        const data = await response.json();

        if (!response.ok) {
          setError(data?.message ?? "Unable to load student transactions.");
          return;
        }

        const paymentList = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.payments)
            ? data.payments
            : Array.isArray(data?.records)
              ? data.records
              : [];

        setTransactions(paymentList.map((item: BackendStudentTransaction) => normalizeTransaction(item)));
      } catch {
        setError("Unable to connect to student payment service.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadTransactions();
  }, []);

  async function viewTransaction(transaction: StudentTransaction) {
    setIsLoadingView(true);
    setIsViewOpen(true);

    try {
      const token = window.localStorage.getItem("careerkick-dashboard-token");
      const response = await fetch(`/api/student-payment-details/${encodeURIComponent(transaction.id)}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data?.message ?? "Unable to load transaction details.");
        setIsViewOpen(false);
        return;
      }

      const detail = data?.data?.payment ?? data?.payment ?? data?.data ?? data;
      setSelectedTransaction(normalizeTransaction(detail));
    } catch {
      alert("Unable to connect to student payment service.");
      setIsViewOpen(false);
    } finally {
      setIsLoadingView(false);
    }
  }

  function closeViewDialog() {
    setIsViewOpen(false);
    setSelectedTransaction(null);
  }

  function openEditDialog(transaction: StudentTransaction) {
    setEditingTransaction(transaction);
    setEditForm({
      discountApplied: transaction.discountApplied,
      couponCode: transaction.couponCode === "-" ? "" : transaction.couponCode,
    });
  }

  function closeEditDialog() {
    setEditingTransaction(null);
    setEditForm({ discountApplied: 0, couponCode: "" });
  }

  async function saveTransactionAnnotations() {
    if (!editingTransaction) {
      return;
    }

    setIsSavingEdit(true);

    try {
      const token = window.localStorage.getItem("careerkick-dashboard-token");
      const response = await fetch(`/api/student-payment-details/${encodeURIComponent(editingTransaction.id)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          discountApplied: Number(editForm.discountApplied),
          couponCode: editForm.couponCode.trim(),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data?.message ?? "Unable to update payment detail.");
        return;
      }

      setTransactions((current) =>
        current.map((transaction) =>
          transaction.id === editingTransaction.id
            ? {
                ...transaction,
                discountApplied: Number(editForm.discountApplied),
                couponCode: editForm.couponCode.trim() || "-",
              }
            : transaction,
        ),
      );

      if (selectedTransaction?.id === editingTransaction.id) {
        setSelectedTransaction((current) =>
          current
            ? {
                ...current,
                discountApplied: Number(editForm.discountApplied),
                couponCode: editForm.couponCode.trim() || "-",
              }
            : current,
        );
      }

      closeEditDialog();
    } catch {
      alert("Unable to connect to student payment service.");
    } finally {
      setIsSavingEdit(false);
    }
  }

  async function deleteTransaction() {
    if (!transactionPendingDelete) {
      return;
    }

    setIsDeleting(true);

    try {
      const token = window.localStorage.getItem("careerkick-dashboard-token");
      const response = await fetch(`/api/student-payment-details/${encodeURIComponent(transactionPendingDelete.id)}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data?.message ?? "Unable to delete payment detail.");
        return;
      }

      setTransactions((current) => current.filter((transaction) => transaction.id !== transactionPendingDelete.id));

      if (selectedTransaction?.id === transactionPendingDelete.id) {
        closeViewDialog();
      }

      if (editingTransaction?.id === transactionPendingDelete.id) {
        closeEditDialog();
      }

      setTransactionPendingDelete(null);
    } catch {
      alert("Unable to connect to student payment service.");
    } finally {
      setIsDeleting(false);
    }
  }

  const totalCollected = transactions.reduce((sum, transaction) => sum + transaction.amountPaid, 0);
  const totalRemaining = transactions.reduce((sum, transaction) => sum + transaction.remainingAmount, 0);
  const successCount = transactions.filter((transaction) =>
    transaction.paymentStatus.toLowerCase().includes("success") ||
    transaction.paymentStatus.toLowerCase().includes("paid"),
  ).length;
  const uniqueStudents = new Set(transactions.map((transaction) => transaction.studentId || transaction.studentEmail)).size;
  const stats = [
    { label: "Total transactions", value: String(transactions.length), icon: ReceiptText },
    { label: "Successful payments", value: String(successCount), icon: CreditCard },
    { label: "Students covered", value: String(uniqueStudents), icon: UsersRound },
    { label: "Amount collected", value: formatCurrency(totalCollected), icon: BadgeIndianRupee },
    { label: "Amount remaining", value: formatCurrency(totalRemaining), icon: BadgeIndianRupee },
  ];

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5 shadow-[var(--dash-shadow)]"
            >
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

      <div className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5 shadow-[var(--dash-shadow)]">
        <h2 className="text-xl font-black">Student Transactions</h2>
        <p className="mt-1 text-sm font-semibold text-[var(--dash-muted)]">
          Review payment records across students and counselling plans.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] shadow-[var(--dash-shadow)]">
        <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-[var(--dash-surface-strong)] text-xs uppercase tracking-[0.14em] text-[var(--dash-muted)]">
              <tr>
                <th className="px-4 py-4">Student</th>
                <th className="px-4 py-4">Contact</th>
                <th className="px-4 py-4">Plan</th>
                <th className="px-4 py-4">Type</th>
                <th className="px-4 py-4">Amount Paid</th>
                <th className="px-4 py-4">Cumulative</th>
                <th className="px-4 py-4">Remaining</th>
                <th className="px-4 py-4">Discount</th>
                <th className="px-4 py-4">Coupon</th>
                <th className="px-4 py-4">Transaction</th>
                <th className="px-4 py-4">Method</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">History</th>
                <th className="px-4 py-4">Date</th>
                <th className="px-4 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--dash-border)]">
              {isLoading ? (
                <tr>
                  <td className="px-4 py-8 text-center font-bold text-[var(--dash-muted)]" colSpan={15}>
                    Loading student transactions...
                  </td>
                </tr>
              ) : null}
              {!isLoading && error ? (
                <tr>
                  <td className="px-4 py-8 text-center font-bold text-[var(--dash-danger)]" colSpan={15}>
                    {error}
                  </td>
                </tr>
              ) : null}
              {!isLoading && !error && transactions.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center font-bold text-[var(--dash-muted)]" colSpan={15}>
                    No student transactions found.
                  </td>
                </tr>
              ) : null}
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-4 py-4">
                    <p className="font-black">{transaction.studentName}</p>
                  </td>
                  <td className="px-4 py-4 text-[var(--dash-muted)]">
                    <p>{transaction.studentEmail}</p>
                    <p className="mt-1 text-xs font-semibold">{transaction.studentPhone}</p>
                  </td>
                  <td className="max-w-[18rem] px-4 py-4 text-[var(--dash-muted)]">
                    <p>{transaction.planTitle}</p>
                    <p className="mt-1 text-xs font-semibold">Total: {formatCurrency(transaction.planAmount)}</p>
                  </td>
                  <td className="px-4 py-4 font-bold">{transaction.paymentType}</td>
                  <td className="px-4 py-4 font-black">{formatCurrency(transaction.amountPaid)}</td>
                  <td className="px-4 py-4 font-black">{formatCurrency(transaction.cumulativePaid)}</td>
                  <td className="px-4 py-4 font-black">{formatCurrency(transaction.remainingAmount)}</td>
                  <td className="px-4 py-4 font-bold">{formatCurrency(transaction.discountApplied)}</td>
                  <td className="px-4 py-4 font-bold">{transaction.couponCode}</td>
                  <td className="px-4 py-4 text-[var(--dash-muted)]">{transaction.transactionRef}</td>
                  <td className="px-4 py-4 font-bold">{transaction.paymentMethod}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-md bg-[var(--dash-primary)] px-2.5 py-1 text-xs font-black text-white">
                      {transaction.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-bold">{transaction.historyCount}</td>
                  <td className="px-4 py-4 font-semibold text-[var(--dash-muted)]">{formatDate(transaction.transactionDate)}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => viewTransaction(transaction)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface-strong)]"
                        aria-label={`View ${transaction.studentName}`}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditDialog(transaction)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface-strong)]"
                        aria-label={`Edit ${transaction.studentName}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setTransactionPendingDelete(transaction)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface-strong)] text-[var(--dash-danger)]"
                        aria-label={`Delete ${transaction.studentName}`}
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
        open={isViewOpen}
        title="Transaction Details"
        description="Student payment detail record"
        onClose={closeViewDialog}
      >
        {isLoadingView ? (
          <div className="py-8 text-center text-sm font-bold text-slate-600">Loading transaction details...</div>
        ) : selectedTransaction ? (
          <div className="space-y-4 text-sm">
            {[
              ["Student", selectedTransaction.studentName],
              ["Email", selectedTransaction.studentEmail],
              ["Phone", selectedTransaction.studentPhone],
              ["Plan", selectedTransaction.planTitle],
              ["Plan Amount", formatCurrency(selectedTransaction.planAmount)],
              ["Payment Type", selectedTransaction.paymentType],
              ["Paid Amount", formatCurrency(selectedTransaction.amountPaid)],
              ["Cumulative Paid", formatCurrency(selectedTransaction.cumulativePaid)],
              ["Remaining Amount", formatCurrency(selectedTransaction.remainingAmount)],
              ["Discount Applied", formatCurrency(selectedTransaction.discountApplied)],
              ["Coupon Code", selectedTransaction.couponCode],
              ["Transaction Ref", selectedTransaction.transactionRef],
              ["Payment Method", selectedTransaction.paymentMethod],
              ["Status", selectedTransaction.paymentStatus],
              ["History Count", String(selectedTransaction.historyCount)],
              ["Date", formatDate(selectedTransaction.transactionDate)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">{label}</p>
                <p className="mt-1 break-words font-bold text-slate-950">{value}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-sm font-bold text-slate-600">No transaction details found.</div>
        )}
      </CommonDialog>

      <CommonDialog
        open={Boolean(editingTransaction)}
        title="Edit Payment Detail"
        description="Update payment-detail annotations only."
        onClose={closeEditDialog}
      >
        <form className="space-y-4">
          <label className="block text-sm font-black text-slate-950">
            Discount Applied
            <input
              type="number"
              value={String(editForm.discountApplied)}
              onChange={(event) =>
                setEditForm((current) => ({
                  ...current,
                  discountApplied: Number(event.target.value),
                }))
              }
              className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-950"
            />
          </label>
          <label className="block text-sm font-black text-slate-950">
            Coupon Code
            <input
              type="text"
              value={editForm.couponCode}
              onChange={(event) =>
                setEditForm((current) => ({
                  ...current,
                  couponCode: event.target.value,
                }))
              }
              className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-950"
            />
          </label>
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeEditDialog}
              className="h-11 rounded-md border border-slate-200 bg-white px-4 text-sm font-black text-slate-950"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveTransactionAnnotations}
              disabled={isSavingEdit}
              className="h-11 rounded-md bg-[#16a34a] px-4 text-sm font-black text-white shadow-[0_12px_24px_rgba(22,163,74,0.24)] transition hover:bg-[#15803d] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSavingEdit ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </CommonDialog>

      <CommonDialog
        open={Boolean(transactionPendingDelete)}
        title="Delete Payment Detail"
        description={transactionPendingDelete ? `Delete payment detail for ${transactionPendingDelete.studentName}?` : "Delete this payment detail?"}
        onClose={() => {
          if (!isDeleting) {
            setTransactionPendingDelete(null);
          }
        }}
      >
        <div className="space-y-5">
          <p className="text-sm font-semibold text-slate-600">
            This action will permanently remove the selected payment detail record.
          </p>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setTransactionPendingDelete(null)}
              disabled={isDeleting}
              className="h-11 rounded-md border border-slate-200 bg-white px-4 text-sm font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={deleteTransaction}
              disabled={isDeleting}
              className="h-11 rounded-md bg-red-600 px-4 text-sm font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isDeleting ? "Deleting..." : "Delete Payment Detail"}
            </button>
          </div>
        </div>
      </CommonDialog>
    </div>
  );
}
