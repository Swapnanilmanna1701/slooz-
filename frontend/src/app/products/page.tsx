"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import Link from "next/link";
import AppLayout from "@/components/layout/AppLayout";
import { GET_PRODUCTS, DELETE_PRODUCT } from "@/lib/graphql/queries";
import { Product, Role } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";

export default function ProductsPage() {
  const { isManager } = useAuth();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const { data, loading, error } = useQuery<{ products: Product[] }>(GET_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const products = data?.products || [];
  const categories = [...new Set(products.map((p) => p.category))];

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      (p.description || "").toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteProduct({ variables: { id } });
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  return (
    <AppLayout title="Products">
      <div className="space-y-6">
        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
              />
            </div>

            {/* Category filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <Link
            href="/products/new"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm">{error.message}</p>
          </div>
        )}

        {/* Products Table */}
        {!loading && !error && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Product</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">SKU</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Category</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Price</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Qty</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Unit</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-gray-500 dark:text-gray-400">
                        No products found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((product) => (
                      <tr
                        key={product.id}
                        className="border-t border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {product.name}
                            </p>
                            {product.description && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate max-w-xs">
                                {product.description}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300 font-mono text-xs">
                          {product.sku}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-gray-900 dark:text-white font-medium">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span
                            className={`font-medium ${
                              product.quantity < 10
                                ? "text-red-600 dark:text-red-400"
                                : "text-gray-900 dark:text-white"
                            }`}
                          >
                            {product.quantity}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                          {product.unit}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/products/${product.id}/edit`}
                              className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                              title="Edit"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </Link>
                            {isManager && (
                              <button
                                onClick={() => handleDelete(product.id, product.name)}
                                className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                title="Delete"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer with count */}
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Showing {filtered.length} of {products.length} products
              </p>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
