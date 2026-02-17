"use client";

import AppLayout from "@/components/layout/AppLayout";
import ProductForm from "@/components/products/ProductForm";

export default function NewProductPage() {
  return (
    <AppLayout title="Add New Product">
      <ProductForm />
    </AppLayout>
  );
}
