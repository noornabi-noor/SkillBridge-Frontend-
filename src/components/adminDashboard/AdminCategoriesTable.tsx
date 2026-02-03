"use client";

import {
  createCategoryAdmin,
  deleteCategoryAdmin,
  updateCategoryAdmin,
  getAllCategoriesAdmin,
} from "@/services/dashboard/admin";
import { useEffect, useState } from "react";

export default function AdminCategoriesTable() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [editingNames, setEditingNames] = useState<{ [key: string]: string }>(
    {},
  );

  // FETCH ALL CATEGORIES on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const allCategories = await getAllCategoriesAdmin();
        setCategories(allCategories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        alert("Failed to fetch categories");
      }
    }

    fetchCategories();
  }, []);

  // CREATE
  const handleCreate = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    // Check if category already exists in the frontend list (case-insensitive)
    const exists = categories.some(
      (c) => c.name.toLowerCase() === trimmedName.toLowerCase(),
    );
    if (exists) {
      alert(`Category "${trimmedName}" already exists`);
      return;
    }

    try {
      const newCategory = await createCategoryAdmin(trimmedName);
      setCategories([newCategory, ...categories]);
      setName("");
    } catch (err: any) {
      console.error("Failed to create category:", err);
      alert(err.message || "Failed to create category");
    }
  };

  // UPDATE
  const handleUpdate = async (id: string) => {
    const value = editingNames[id];
    if (!value?.trim()) return;

    try {
      const updated = await updateCategoryAdmin(id, { name: value });
      setCategories(categories.map((c) => (c.id === id ? updated : c)));
    } catch (err) {
      console.error("Failed to update category:", err);
      alert("Failed to update category");
    }
  };

  // DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;

    try {
      await deleteCategoryAdmin(id);
      setCategories(categories.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete category:", err);
      alert("Failed to delete category");
    }
  };

  return (
    <div className="space-y-6">
      {/* CREATE */}
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name"
          className="flex-1 px-3 py-2 border rounded dark:bg-gray-900 dark:border-gray-700"
        />
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between p-3 border rounded dark:border-gray-800"
          >
            <input
              value={editingNames[cat.id] ?? cat.name}
              onChange={(e) =>
                setEditingNames({
                  ...editingNames,
                  [cat.id]: e.target.value,
                })
              }
              onBlur={() => handleUpdate(cat.id)}
              className="bg-transparent outline-none dark:text-white flex-1"
            />

            <button
              onClick={() => handleDelete(cat.id)}
              className="text-red-500 hover:underline ml-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
