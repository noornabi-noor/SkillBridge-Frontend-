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

  // For editing slots dynamically
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editSlot, setEditSlot] = useState({
    dayOfWeek: 0,
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    setLoading(true);
    const data = await getTutorAvailability(tutorId);
    setSlots(data);
    setLoading(false);
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
    } catch (err) {
      console.error("Create slot error:", err);
      alert("Failed to create availability");
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
      alert("Availability updated ✅");
    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed ❌");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAvailability(id);
      fetchSlots();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed ❌");
    }
  };

  if (loading) return <p>Loading availability...</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Availability Slots</h2>

      {/* Add new slot */}
      <div className="mb-4 flex gap-2">
        <input
          placeholder="Day of Week"
          value={newSlot.dayOfWeek}
          onChange={(e) => setNewSlot({ ...newSlot, dayOfWeek: e.target.value })}
          className="border px-2 rounded w-20"
        />
        <input
          type="time"
          value={newSlot.startTime}
          onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
          className="border px-2 rounded"
        />
        <input
          type="time"
          value={newSlot.endTime}
          onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
          className="border px-2 rounded"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>

      {/* Existing slots */}
      <ul>
        {slots.map((slot) => (
          <li key={slot.id} className="flex justify-between items-center mb-2">
            {editingId === slot.id ? (
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={editSlot.dayOfWeek}
                  onChange={(e) =>
                    setEditSlot({ ...editSlot, dayOfWeek: Number(e.target.value) })
                  }
                  className="border px-1 w-16 rounded"
                />
                <input
                  type="time"
                  value={editSlot.startTime}
                  onChange={(e) =>
                    setEditSlot({ ...editSlot, startTime: e.target.value })
                  }
                  className="border px-1 rounded"
                />
                <input
                  type="time"
                  value={editSlot.endTime}
                  onChange={(e) =>
                    setEditSlot({ ...editSlot, endTime: e.target.value })
                  }
                  className="border px-1 rounded"
                />
                <button
                  onClick={() => handleUpdate(slot.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span>
                  {slot.dayOfWeek}: {slot.startTime} - {slot.endTime}{" "}
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
                    className="bg-yellow-400 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(slot.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
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
