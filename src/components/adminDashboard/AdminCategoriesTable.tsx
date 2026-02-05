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
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editingName, setEditingName] = useState("");

  // FETCH ALL CATEGORIES
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

    const exists = categories.some(
      (c) => c.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (exists) {
      toast.error(`Category "${trimmedName}" already exists`);
      return;
    }

    try {
      const newCategory = await createCategoryAdmin(trimmedName);
      setCategories([newCategory, ...categories]);
      setName("");
      toast.success(`Category "${trimmedName}" created`);
    } catch (err: any) {
      toast.error(err.message || "Failed to create category");
    }
  };

  // START EDIT
  const startEditing = (id: string, currentName: string) => {
    setEditingCategoryId(id);
    setEditingName(currentName);
  };

  // CANCEL EDIT
  const cancelEditing = () => {
    setEditingCategoryId(null);
    setEditingName("");
  };

  // SAVE UPDATE
  const saveUpdate = async (id: string) => {
    const trimmedName = editingName.trim();
    if (!trimmedName) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      const updated = await updateCategoryAdmin(id, { name: trimmedName });
      setCategories(
        categories.map((c) => (c.id === id ? updated : c))
      );
      setEditingCategoryId(null);
      setEditingName("");
      toast.success(`Category updated to "${updated.name}"`);
    } catch (err: any) {
      console.error("Failed to update category:", err);
      toast.error(err.message || "Failed to update category");
    }
  };

  // DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;

    try {
      await deleteCategoryAdmin(id);
      setCategories(categories.filter((c) => c.id !== id));
      toast.success("Category deleted successfully");
    } catch (err: any) {
      console.error("Failed to delete category:", err);
      toast.error(err.message || "Failed to delete category");
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
            className="flex items-center justify-between p-3 border rounded dark:border-gray-800 gap-2"
          >
            {/* CATEGORY NAME */}
            {editingCategoryId === cat.id ? (
              <input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                className="flex-1 px-2 py-1 border rounded dark:bg-gray-900 dark:text-white"
              />
            ) : (
              <span className="flex-1">{cat.name}</span>
            )}

            {/* BUTTONS */}
            {editingCategoryId === cat.id ? (
              <>
                <button
                  onClick={() => saveUpdate(cat.id)}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={cancelEditing}
                  className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => startEditing(cat.id, cat.name)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
