"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { CREATE_PRODUCT, UPDATE_PRODUCT, GET_PRODUCTS } from "@/lib/graphql/queries";
import { Product } from "@/lib/types";

interface ProductFormProps {
  product?: Product;
  isEdit?: boolean;
}

interface FormData {
  name: string;
  description: string;
  sku: string;
  category: string;
  price: string;
  quantity: string;
  unit: string;
}

interface FormErrors {
  name?: string;
  sku?: string;
  category?: string;
  price?: string;
  quantity?: string;
}

const CATEGORIES = ["Beverages", "Grains", "Oils", "Spices", "Sweeteners", "Dairy", "Produce", "Other"];

export default function ProductForm({ product, isEdit }: ProductFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    sku: "",
    category: "",
    price: "",
    quantity: "",
    unit: "pcs",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || "",
        sku: product.sku,
        category: product.category,
        price: product.price.toString(),
        quantity: product.quantity.toString(),
        unit: product.unit,
      });
    }
  }, [product]);

  const [createProduct, { loading: creating }] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const [updateProduct, { loading: updating }] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const loading = creating || updating;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.sku.trim()) newErrors.sku = "SKU is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || parseFloat(formData.price) < 0) newErrors.price = "Valid price is required";
    if (!formData.quantity || parseInt(formData.quantity) < 0) newErrors.quantity = "Valid quantity is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    try {
      if (isEdit && product) {
        await updateProduct({
          variables: {
            input: {
              id: product.id,
              name: formData.name,
              description: formData.description || null,
              sku: formData.sku,
              category: formData.category,
              price: parseFloat(formData.price),
              quantity: parseInt(formData.quantity),
              unit: formData.unit,
            },
          },
        });
      } else {
        await createProduct({
          variables: {
            input: {
              name: formData.name,
              description: formData.description || null,
              sku: formData.sku,
              category: formData.category,
              price: parseFloat(formData.price),
              quantity: parseInt(formData.quantity),
              unit: formData.unit,
            },
          },
        });
      }

      router.push("/products");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Operation failed";
      setServerError(message);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-2.5 rounded-lg border ${
      errors[field]
        ? "border-red-300 dark:border-red-600"
        : "border-gray-300 dark:border-gray-600"
    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-sm`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {serverError && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{serverError}</p>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={handleChange("name")}
            className={inputClass("name")}
            placeholder="e.g. Arabica Coffee Beans"
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={handleChange("description")}
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-sm"
            placeholder="Product description (optional)"
          />
        </div>

        {/* SKU + Category row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              SKU *
            </label>
            <input
              type="text"
              value={formData.sku}
              onChange={handleChange("sku")}
              className={inputClass("sku")}
              placeholder="e.g. COM-COF-001"
            />
            {errors.sku && <p className="text-sm text-red-500 mt-1">{errors.sku}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={handleChange("category")}
              className={inputClass("category")}
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
          </div>
        </div>

        {/* Price + Quantity + Unit row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price ($) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange("price")}
              className={inputClass("price")}
              placeholder="0.00"
            />
            {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Quantity *
            </label>
            <input
              type="number"
              min="0"
              value={formData.quantity}
              onChange={handleChange("quantity")}
              className={inputClass("quantity")}
              placeholder="0"
            />
            {errors.quantity && <p className="text-sm text-red-500 mt-1">{errors.quantity}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Unit
            </label>
            <select
              value={formData.unit}
              onChange={handleChange("unit")}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-sm"
            >
              <option value="pcs">Pieces</option>
              <option value="kg">Kilograms</option>
              <option value="grams">Grams</option>
              <option value="liters">Liters</option>
              <option value="ml">Milliliters</option>
              <option value="boxes">Boxes</option>
              <option value="bags">Bags</option>
            </select>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-medium rounded-lg transition-colors flex items-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              {isEdit ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{isEdit ? "Update Product" : "Create Product"}</>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push("/products")}
          className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
