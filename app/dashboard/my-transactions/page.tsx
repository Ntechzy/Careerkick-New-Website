"use client";

import { BadgeIndianRupee, CreditCard, Eye, ReceiptText } from "lucide-react";
import { useEffect, useState } from "react";
import { CommonDialog } from "@/components/dashboard/CommonDialog";
import { ExportColumn, ExportDrawer } from "@/components/dashboard/ExportDrawer";
import { DASHBOARD_USER_KEY } from "@/components/dashboard/DashboardShell";

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

type DashboardUser = {
  id?: string;
  email?: string;
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

function getStoredDashboardUser(): DashboardUser {
  try {
    const storedUser = window.localStorage.getItem(DASHBOARD_USER_KEY);
    return storedUser ? JSON.parse(storedUser) : {};
  } catch {
    return {};
  }
}

function belongsToStudent(transaction: StudentTransaction, user: DashboardUser) {
  const userId = user.id?.trim();
  const userEmail = user.email?.trim().toLowerCase();

  if (!userId && !userEmail) {
    return true;
  }

  return (
    (Boolean(userId) && transaction.studentId === userId) ||
    (Boolean(userEmail) && transaction.studentEmail.toLowerCase() === userEmail)
  );
}

const transactionExportColumns: ExportColumn<StudentTransaction>[] = [
  { header: "Student", value: (transaction) => transaction.studentName },
  { header: "Email", value: (transaction) => transaction.studentEmail },
  { header: "Phone", value: (transaction) => transaction.studentPhone },
  { header: "Plan", value: (transaction) => transaction.planTitle },
  { header: "Plan Amount", value: (transaction) => formatCurrency(transaction.planAmount) },
  { header: "Type", value: (transaction) => transaction.paymentType },
  { header: "Amount Paid", value: (transaction) => formatCurrency(transaction.amountPaid) },
  { header: "Cumulative", value: (transaction) => formatCurrency(transaction.cumulativePaid) },
  { header: "Remaining", value: (transaction) => formatCurrency(transaction.remainingAmount) },
  { header: "Discount", value: (transaction) => formatCurrency(transaction.discountApplied) },
  { header: "Coupon", value: (transaction) => transaction.couponCode },
  { header: "Transaction", value: (transaction) => transaction.transactionRef },
  { header: "Method", value: (transaction) => transaction.paymentMethod },
  { header: "Status", value: (transaction) => transaction.paymentStatus },
  { header: "History", value: (transaction) => transaction.historyCount },
  { header: "Date", value: (transaction) => formatDate(transaction.transactionDate) },
];

export default function MyTransactionsPage() {
  const [transactions, setTransactions] = useState<StudentTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<StudentTransaction | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  useEffect(() => {
    async function loadTransactions() {
      setIsLoading(true);
      setError(null);

      try {
        const token = window.localStorage.getItem("careerkick-dashboard-token");
        const user = getStoredDashboardUser();
        const response = await fetch("/api/student-payment-details", {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          cache: "no-store",
        });
        const data = await response.json();

        if (!response.ok) {
          setError(data?.message ?? "Unable to load your transactions.");
          return;
        }

        const paymentList = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.payments)
            ? data.payments
            : Array.isArray(data?.records)
              ? data.records
              : [];

        setTransactions(
          paymentList
            .map((item: BackendStudentTransaction) => normalizeTransaction(item))
            .filter((transaction: StudentTransaction) => belongsToStudent(transaction, user)),
        );
      } catch {
        setError("Unable to connect to student payment service.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadTransactions();
  }, []);

  const totalPaid = transactions.reduce((sum, transaction) => sum + transaction.amountPaid, 0);
  const totalRemaining = transactions.reduce((sum, transaction) => sum + transaction.remainingAmount, 0);
  const stats = [
    { label: "My transactions", value: String(transactions.length), icon: ReceiptText },
    { label: "Amount paid", value: formatCurrency(totalPaid), icon: BadgeIndianRupee },
    { label: "Amount remaining", value: formatCurrency(totalRemaining), icon: BadgeIndianRupee },
  ];

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
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

      <div className="flex flex-col gap-4 rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5 shadow-[var(--dash-shadow)] sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-xl font-black">My Transactions</h2>
          <p className="mt-1 text-sm font-semibold text-[var(--dash-muted)]">
            Review your payment records and counselling plan transactions.
          </p>
        </div>
        <ExportDrawer
          title="My Transactions"
          fileName="careerkick-my-transactions"
          rows={transactions}
          columns={transactionExportColumns}
          disabled={isLoading || Boolean(error)}
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] shadow-[var(--dash-shadow)]">
        <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="bg-[var(--dash-surface-strong)] text-xs uppercase tracking-[0.14em] text-[var(--dash-muted)]">
              <tr>
                <th className="px-4 py-4">Student</th>
                <th className="px-4 py-4">Contact</th>
                <th className="px-4 py-4">Plan</th>
                <th className="px-4 py-4">Type</th>
                <th className="px-4 py-4">Amount Paid</th>
                <th className="px-4 py-4">Remaining</th>
                <th className="px-4 py-4">Transaction</th>
                <th className="px-4 py-4">Method</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Date</th>
                <th className="px-4 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--dash-border)]">
              {isLoading ? (
                <tr>
                  <td className="px-4 py-8 text-center font-bold text-[var(--dash-muted)]" colSpan={11}>
                    Loading your transactions...
                  </td>
                </tr>
              ) : null}
              {!isLoading && error ? (
                <tr>
                  <td className="px-4 py-8 text-center font-bold text-[var(--dash-danger)]" colSpan={11}>
                    {error}
                  </td>
                </tr>
              ) : null}
              {!isLoading && !error && transactions.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center font-bold text-[var(--dash-muted)]" colSpan={11}>
                    No transactions found.
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
                  <td className="px-4 py-4 font-black">{formatCurrency(transaction.remainingAmount)}</td>
                  <td className="px-4 py-4 text-[var(--dash-muted)]">{transaction.transactionRef}</td>
                  <td className="px-4 py-4 font-bold">{transaction.paymentMethod}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-md bg-[var(--dash-primary)] px-2.5 py-1 text-xs font-black text-white">
                      {transaction.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-semibold text-[var(--dash-muted)]">{formatDate(transaction.transactionDate)}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTransaction(transaction);
                          setIsViewOpen(true);
                        }}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface-strong)]"
                        aria-label={`View ${transaction.studentName}`}
                      >
                        <Eye className="h-4 w-4" />
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
        description="Your payment detail record"
        onClose={() => {
          setIsViewOpen(false);
          setSelectedTransaction(null);
        }}
      >
        {selectedTransaction ? (
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
    </div>
  );
}
