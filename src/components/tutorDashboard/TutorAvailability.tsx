"use client";

import { useEffect, useState } from "react";
import {
  getTutorAvailability,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} from "@/services/dashboard/tutorAvailability";

export default function TutorAvailability({ tutorId }: { tutorId: string }) {
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSlot, setNewSlot] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editSlot, setEditSlot] = useState({ dayOfWeek: 0, startTime: "", endTime: "" });

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const data = await getTutorAvailability(tutorId);
      setSlots(data);
    } catch (err) {
      console.error("Fetch slots error:", err);
      alert("Failed to fetch availability");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const slot = {
        dayOfWeek: Number(newSlot.dayOfWeek),
        startTime: newSlot.startTime,
        endTime: newSlot.endTime,
      };
      await createAvailability(tutorId, slot);
      setNewSlot({ dayOfWeek: "", startTime: "", endTime: "" });
      fetchSlots();
      alert("Slot added ✅");
    } catch (err) {
      console.error("Create slot error:", err);
      alert("Failed to create slot ❌");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateAvailability(id, {
        dayOfWeek: Number(editSlot.dayOfWeek),
        startTime: editSlot.startTime,
        endTime: editSlot.endTime,
      });
      setEditingId(null);
      fetchSlots();
      alert("Slot updated ✅");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update slot ❌");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAvailability(id);
      fetchSlots();
      alert("Slot deleted ✅");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete slot ❌");
    }
  };

  if (loading) return <p>Loading availability...</p>;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Availability Slots
      </h2>

      {/* Add new slot */}
      <div className="mb-4 flex gap-2">
        <input
          type="number"
          placeholder="Day"
          value={newSlot.dayOfWeek}
          onChange={(e) => setNewSlot({ ...newSlot, dayOfWeek: e.target.value })}
          className="border dark:border-gray-600 px-2 py-1 rounded w-20 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        <input
          type="time"
          value={newSlot.startTime}
          onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
          className="border dark:border-gray-600 px-2 py-1 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        <input
          type="time"
          value={newSlot.endTime}
          onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
          className="border dark:border-gray-600 px-2 py-1 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 dark:bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-600 dark:hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Existing slots */}
      <ul>
        {slots.map((slot) => (
          <li
            key={slot.id}
            className="flex justify-between items-center mb-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {editingId === slot.id ? (
              <div className="flex gap-2 items-center flex-wrap">
                <input
                  type="number"
                  value={editSlot.dayOfWeek}
                  onChange={(e) =>
                    setEditSlot({ ...editSlot, dayOfWeek: Number(e.target.value) })
                  }
                  className="border dark:border-gray-600 px-1 py-1 w-16 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <input
                  type="time"
                  value={editSlot.startTime}
                  onChange={(e) => setEditSlot({ ...editSlot, startTime: e.target.value })}
                  className="border dark:border-gray-600 px-1 py-1 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <input
                  type="time"
                  value={editSlot.endTime}
                  onChange={(e) => setEditSlot({ ...editSlot, endTime: e.target.value })}
                  className="border dark:border-gray-600 px-1 py-1 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <button
                  onClick={() => handleUpdate(slot.id)}
                  className="bg-green-500 dark:bg-green-600 text-white px-2 py-1 rounded hover:bg-green-600 dark:hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 dark:bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-500 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span className="text-gray-800 dark:text-gray-100">
                  Day {slot.dayOfWeek}: {slot.startTime} - {slot.endTime}{" "}
                  {slot.isBooked ? "(Booked)" : ""}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setEditingId(slot.id);
                      setEditSlot({
                        dayOfWeek: slot.dayOfWeek,
                        startTime: slot.startTime,
                        endTime: slot.endTime,
                      });
                    }}
                    className="bg-yellow-400 dark:bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-500 dark:hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(slot.id)}
                    className="bg-red-500 dark:bg-red-600 text-white px-2 py-1 rounded hover:bg-red-600 dark:hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
