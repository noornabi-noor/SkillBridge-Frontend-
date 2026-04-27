"use client";

import { useEffect, useState } from "react";
import { getAllPaymentsAdmin } from "@/services/dashboard/admin";
import { toast } from "sonner";
import LoadingPage from "@/app/loading";

type Payment = {
  id: string;
  amount: number;
  currency: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  createdAt: string;
  booking?: {
    student?: {
      name?: string;
      email?: string;
    };
    tutor?: {
      user?: {
        name?: string;
        email?: string;
      };
    };
  };
};

const statusColor = {
  PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  SUCCESS: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  FAILED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

export default function AdminPaymentsTable() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const data = await getAllPaymentsAdmin();
        setPayments(data);
      } catch (err: any) {
        toast.error(err.message || "Failed to load payments");
      } finally {
        setLoading(false);
      }
    }
    fetchPayments();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
      <div className="p-4 border-b dark:border-gray-800">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          All Payments
        </h2>
      </div>

      <div className="hidden md:block overflow-x-auto">
        {payments.length === 0 ? (
          <p className="p-6 text-center text-gray-500 dark:text-gray-400">
            No payments found
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Tutor</th>
                <th className="p-3 text-center">Amount</th>
                <th className="p-3 text-center">Date</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b dark:border-gray-800">
                  <td className="p-3">
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      {p.booking?.student?.name ?? "N/A"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {p.booking?.student?.email ?? "N/A"}
                    </p>
                  </td>
                  <td className="p-3">
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      {p.booking?.tutor?.user?.name ?? "N/A"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {p.booking?.tutor?.user?.email ?? "N/A"}
                    </p>
                  </td>
                  <td className="p-3 text-center font-semibold text-gray-800 dark:text-gray-100">
                    {p.amount.toFixed(2)} {p.currency.toUpperCase()}
                  </td>
                  <td className="p-3 text-center text-gray-800 dark:text-gray-100">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${statusColor[p.status]}`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile view */}
      <div className="md:hidden divide-y dark:divide-gray-800">
        {payments.length === 0 && (
          <p className="p-6 text-center text-gray-500 dark:text-gray-400">
            No payments found
          </p>
        )}
        {payments.map((p) => (
          <div key={p.id} className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  {p.booking?.student?.name ?? "N/A"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Student
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${statusColor[p.status]}`}
              >
                {p.status}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Amount</span>
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                {p.amount.toFixed(2)} {p.currency.toUpperCase()}
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Tutor: {p.booking?.tutor?.user?.name ?? "N/A"}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
              {new Date(p.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
