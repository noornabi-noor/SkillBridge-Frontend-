"use client";

import { useState, useEffect } from "react";
import {
  createAvailability,
  updateAvailability,
  deleteAvailability,
  getTutorAvailability,
} from "@/services/dashboard/tutorAvailability";

type Availability = {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

type Props = {
  stats: any;
  setActiveTab: (
    tab: "overview" | "profile" | "availability" | "bookings" | "reviews" | "upcoming"
  ) => void;
};

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

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function formatTime12h(time24: string) {
  const [hourStr, minStr] = time24.split(":");
  let hours = Number(hourStr);
  const minutes = minStr;
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

// --- Convert time string to minutes
function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export default function TutorAvailability({ stats, setActiveTab }: Props) {
  const [slots, setSlots] = useState<Availability[]>([]);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [newSlot, setNewSlot] = useState({ dayOfWeek: "", startTime: "", endTime: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editSlot, setEditSlot] = useState({ dayOfWeek: "", startTime: "", endTime: "" });

  // Show toast
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // --- Profile check ---
  if (!stats.profile || !stats.profile.id) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-2xl mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
        <p className="mb-4">
          Please update your profile first to access the availability page.
        </p>
        <button
          onClick={() => setActiveTab("profile")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go to Profile
        </button>
      </div>
    );
  }

  // --- Fetch latest availability slots from backend ---
  const fetchSlots = async () => {
    try {
      const data = await getTutorAvailability(stats.profile.id);
      setSlots(data);
    } catch (err) {
      console.error(err);
      setSlots([]);
    }
  };

  useEffect(() => {
    fetchSlots(); // initial fetch
  }, []);

  // --- Create new slot ---
  const handleCreate = async () => {
    if (!newSlot.dayOfWeek || !newSlot.startTime || !newSlot.endTime) {
      showToast("Fill all fields", "error");
      return;
    }

    // Prevent PM → AM (cross-midnight)
    const startMin = toMinutes(newSlot.startTime);
    const endMin = toMinutes(newSlot.endTime);
    if (startMin >= endMin) {
      showToast("Start time must be before end time (cannot cross midnight)", "error");
      return;
    }

    try {
      await createAvailability({
        dayOfWeek: Number(newSlot.dayOfWeek),
        startTime: newSlot.startTime,
        endTime: newSlot.endTime,
      });
      setNewSlot({ dayOfWeek: "", startTime: "", endTime: "" });
      showToast("Availability added ✅");
      await fetchSlots(); // fetch latest slots to update list immediately
    } catch (err: any) {
      console.error(err);
      showToast(
        err.message === "Unauthorized"
          ? "Please update your profile first to create availability."
          : err.message || "Create failed ❌",
        "error"
      );
    }
  };

  // --- Update existing slot ---
  const handleUpdate = async (id: string) => {
    if (!editSlot.dayOfWeek || !editSlot.startTime || !editSlot.endTime) {
      showToast("Fill all fields", "error");
      return;
    }

    const startMin = toMinutes(editSlot.startTime);
    const endMin = toMinutes(editSlot.endTime);
    if (startMin >= endMin) {
      showToast("Start time must be before end time (cannot cross midnight)", "error");
      return;
    }

    try {
      await updateAvailability(id, {
        dayOfWeek: Number(editSlot.dayOfWeek),
        startTime: editSlot.startTime,
        endTime: editSlot.endTime,
      });
      setEditingId(null);
      showToast("Slot updated ✅");
      await fetchSlots(); // fetch latest slots to update list immediately
    } catch (err: any) {
      console.error(err);
      showToast(
        err.message === "Unauthorized"
          ? "Please update your profile first to update availability."
          : err.message || "Update failed ❌",
        "error"
      );
    }
  };

  // --- Delete slot ---
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this slot?")) return;
    try {
      await deleteAvailability(id);
      showToast("Slot deleted ✅");
      await fetchSlots(); // fetch latest slots to update list immediately
    } catch (err: any) {
      console.error(err);
      showToast(
        err.message === "Unauthorized"
          ? "Please update your profile first to delete availability."
          : err.message || "Delete failed ❌",
        "error"
      );
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
          onChange={(e) => setNewSlot({ ...newSlot, dayOfWeek: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <input
          type="time"
          value={newSlot.startTime}
          onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <input
          type="time"
          value={newSlot.endTime}
          onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <button onClick={handleCreate} className="bg-blue-600 text-white rounded">
          Add
        </button>
      </div>

      {/* LIST */}
      {slots.length === 0 && <p className="text-gray-500">No availability added yet.</p>}

      {slots.map((slot: Availability) => (
        <div key={slot.id} className="flex justify-between items-center py-2 border-b">
          {editingId === slot.id ? (
            <>
              <input
                type="number"
                value={editSlot.dayOfWeek}
                onChange={(e) => setEditSlot({ ...editSlot, dayOfWeek: e.target.value })}
                className="border px-2 py-1 rounded"
              />
              <input
                type="time"
                value={editSlot.startTime}
                onChange={(e) => setEditSlot({ ...editSlot, startTime: e.target.value })}
                className="border px-2 py-1 rounded"
              />
              <input
                type="time"
                value={editSlot.endTime}
                onChange={(e) => setEditSlot({ ...editSlot, endTime: e.target.value })}
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
                {DAYS[slot.dayOfWeek]} — {formatTime12h(slot.startTime)} to {formatTime12h(slot.endTime)}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(slot.id);
                    setEditSlot({
                      dayOfWeek: String(slot.dayOfWeek),
                      startTime: slot.startTime,
                      endTime: slot.endTime,
                    });
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
