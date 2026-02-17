"use client";

import { use } from "react";
import { useQuery } from "@apollo/client/react";
import AppLayout from "@/components/layout/AppLayout";
import ProductForm from "@/components/products/ProductForm";
import { GET_PRODUCT } from "@/lib/graphql/queries";
import { Product } from "@/lib/types";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, loading, error } = useQuery<{ product: Product }>(GET_PRODUCT, {
    variables: { id },
  });

  return (
    <AppLayout title="Edit Product">
      {loading && (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm">{error.message}</p>
        </div>
      )}

      {data?.product && <ProductForm product={data.product} isEdit />}
    </AppLayout>
  );
}
