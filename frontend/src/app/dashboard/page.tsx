"use client";

import { useQuery } from "@apollo/client/react";
import AppLayout from "@/components/layout/AppLayout";
import RoleGuard from "@/components/guards/RoleGuard";
import { GET_DASHBOARD_STATS } from "@/lib/graphql/queries";
import { DashboardStats, Role } from "@/lib/types";

function StatCard({
  title,
  value,
  subtitle,
  color,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
    green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
    amber: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    red: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
    purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  };

  return (
    <div className={`rounded-xl border p-6 ${colorClasses[color]}`}>
      <p className="text-sm font-medium opacity-80">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
      {subtitle && <p className="text-xs mt-1 opacity-70">{subtitle}</p>}
    </div>
  );
}

function DashboardContent() {
  const { data, loading, error } = useQuery<{ dashboardStats: DashboardStats }>(
    GET_DASHBOARD_STATS
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
        <p className="text-red-600 dark:text-red-400">Error loading dashboard: {error.message}</p>
      </div>
    );
  }

  const stats = data?.dashboardStats;
  if (!stats) return null;

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          subtitle="Active commodities"
          color="indigo"
        />
        <StatCard
          title="Total Quantity"
          value={stats.totalQuantity.toLocaleString()}
          subtitle="Units in stock"
          color="green"
        />
        <StatCard
          title="Inventory Value"
          value={`$${stats.totalInventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          subtitle="Total estimated value"
          color="purple"
        />
        <StatCard
          title="Low Stock"
          value={stats.lowStockCount}
          subtitle="Items below 10 units"
          color="red"
        />
        <StatCard
          title="Categories"
          value={stats.categoriesCount}
          subtitle="Product categories"
          color="amber"
        />
      </div>

      {/* Category Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Category Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                  Category
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                  Products
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                  Total Value
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                  Share
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.categoryBreakdown.map((cat) => {
                const percentage =
                  stats.totalInventoryValue > 0
                    ? (cat.totalValue / stats.totalInventoryValue) * 100
                    : 0;
                return (
                  <tr
                    key={cat.category}
                    className="border-b border-gray-100 dark:border-gray-700/50"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                      {cat.category}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600 dark:text-gray-300">
                      {cat.count}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600 dark:text-gray-300">
                      ${cat.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 w-12 text-right">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppLayout title="Dashboard">
      <RoleGuard allowedRoles={[Role.MANAGER]}>
        <DashboardContent />
      </RoleGuard>
    </AppLayout>
  );
}
