"use client";

import { useEffect, useState } from "react";
import {
  getMyAvailability,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} from "@/services/dashboard/tutorAvailability";

// Toast component (below navbar)
const Toast = ({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) => (
  <div
    className={`fixed top-20 right-4 z-50 px-4 py-2 rounded shadow text-white ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`}
  >
    {message}
  </div>
);

export default function TutorAvailability() {
  const [slots, setSlots] = useState<any[]>([]);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [newSlot, setNewSlot] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editSlot, setEditSlot] = useState({
    dayOfWeek: 0,
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    fetchSlots();
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchSlots = async () => {
    try {
      const data = await getMyAvailability();
      setSlots(data);
    } catch (err: any) {
      console.error(err);
      showToast("Failed to load availability", "error");
    }
  };

  const handleCreate = async () => {
    if (!newSlot.dayOfWeek || !newSlot.startTime || !newSlot.endTime) {
      showToast("Fill all fields", "error");
      return;
    }

    try {
      await createAvailability({
        dayOfWeek: Number(newSlot.dayOfWeek),
        startTime: newSlot.startTime,
        endTime: newSlot.endTime,
      });

      setNewSlot({ dayOfWeek: "", startTime: "", endTime: "" });
      fetchSlots();
      showToast("Availability added ✅");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Create failed ❌", "error");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateAvailability(id, editSlot);
      setEditingId(null);
      fetchSlots();
      showToast("Slot updated ✅");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Update failed ❌", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this slot?")) return;

    try {
      await deleteAvailability(id);
      fetchSlots();
      showToast("Slot deleted ✅");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Delete failed ❌", "error");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-2xl mx-auto">
      {toast && <Toast message={toast.message} type={toast.type} />}

      <h2 className="text-xl font-semibold mb-4">Your Availability</h2>

      {/* CREATE */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <input
          type="number"
          placeholder="Day (0-6)"
          value={newSlot.dayOfWeek}
          onChange={(e) =>
            setNewSlot({ ...newSlot, dayOfWeek: e.target.value })
          }
          className="border px-2 py-1 rounded"
        />
        <input
          type="time"
          value={newSlot.startTime}
          onChange={(e) =>
            setNewSlot({ ...newSlot, startTime: e.target.value })
          }
          className="border px-2 py-1 rounded"
        />
        <input
          type="time"
          value={newSlot.endTime}
          onChange={(e) =>
            setNewSlot({ ...newSlot, endTime: e.target.value })
          }
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      {slots.length === 0 && (
        <p className="text-gray-500">No availability added yet.</p>
      )}

      {slots.map((slot) => (
        <div
          key={slot.id}
          className="flex justify-between items-center py-2 border-b"
        >
          {editingId === slot.id ? (
            <>
              <input
                type="number"
                value={editSlot.dayOfWeek}
                onChange={(e) =>
                  setEditSlot({
                    ...editSlot,
                    dayOfWeek: Number(e.target.value),
                  })
                }
                className="border px-2 py-1 rounded"
              />
              <input
                type="time"
                value={editSlot.startTime}
                onChange={(e) =>
                  setEditSlot({ ...editSlot, startTime: e.target.value })
                }
                className="border px-2 py-1 rounded"
              />
              <input
                type="time"
                value={editSlot.endTime}
                onChange={(e) =>
                  setEditSlot({ ...editSlot, endTime: e.target.value })
                }
                className="border px-2 py-1 rounded"
              />
              <button
                onClick={() => handleUpdate(slot.id)}
                className="bg-green-600 text-white px-2 py-1 rounded"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span>
                Day {slot.dayOfWeek} — {slot.startTime} to {slot.endTime}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(slot.id);
                    setEditSlot(slot);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(slot.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
