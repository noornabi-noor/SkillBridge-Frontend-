"use client";

import {
  createCategoryAdmin,
  deleteCategoryAdmin,
  updateCategoryAdmin,
  getAllCategoriesAdmin,
} from "@/services/dashboard/admin";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminCategoriesTable() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  // FETCH
  useEffect(() => {
    async function fetchCategories() {
      try {
        const allCategories = await getAllCategoriesAdmin();
        setCategories(allCategories);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch categories");
      }
    }
    fetchCategories();
  }, []);

  // CREATE
  const handleCreate = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    if (
      categories.some(
        (c) => c.name.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      toast.error(`Category "${trimmed}" already exists`);
      return;
    }

    try {
      const newCategory = await createCategoryAdmin(trimmed);
      setCategories([newCategory, ...categories]);
      setName("");
      toast.success("Category created");
    } catch (err: any) {
      toast.error(err.message || "Failed to create category");
    }
  };

  // EDIT
  const startEditing = (id: string, currentName: string) => {
    setEditingCategoryId(id);
    setEditingName(currentName);
  };

  const cancelEditing = () => {
    setEditingCategoryId(null);
    setEditingName("");
  };

  const saveUpdate = async (id: string) => {
    const trimmed = editingName.trim();
    if (!trimmed) return toast.error("Name cannot be empty");

    try {
      const updated = await updateCategoryAdmin(id, { name: trimmed });
      setCategories(categories.map((c) => (c.id === id ? updated : c)));
      setEditingCategoryId(null);
      setEditingName("");
      toast.success("Category updated");
    } catch (err: any) {
      toast.error(err.message || "Failed to update category");
    }
  };

  // DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;

    try {
      await deleteCategoryAdmin(id);
      setCategories(categories.filter((c) => c.id !== id));
      toast.success("Category deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete category");
    }
  };

  return (
    <div className="space-y-6">
      {/* CREATE */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name"
          className="flex-1 px-3 py-2 rounded-lg
            border border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-900
            text-gray-800 dark:text-gray-100"
        />
        <button
          onClick={handleCreate}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="divide-y dark:divide-gray-800">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="
              flex flex-col gap-3
              md:flex-row md:items-center md:justify-between
              py-4"
          >
            {/* NAME */}
            <div className="flex-1 min-w-0">
              {editingCategoryId === cat.id ? (
                <input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg
                    border border-gray-300 dark:border-gray-700
                    bg-gray-50 dark:bg-gray-800
                    text-gray-800 dark:text-gray-100"
                />
              ) : (
                <p className="font-medium text-gray-800 dark:text-gray-200 break-words">
                  {cat.name}
                </p>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-2 md:flex-shrink-0">
              {editingCategoryId === cat.id ? (
                <>
                  <button
                    onClick={() => saveUpdate(cat.id)}
                    className="px-3 py-1.5 rounded bg-green-600 text-white hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="px-3 py-1.5 rounded bg-gray-400 text-white hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(cat.id, cat.name)}
                    className="px-3 py-1.5 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="px-3 py-1.5 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
