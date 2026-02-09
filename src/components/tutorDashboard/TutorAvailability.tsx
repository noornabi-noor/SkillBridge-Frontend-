"use client";

import { useEffect, useState } from "react";
import {
  getMyAvailability,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} from "@/services/dashboard/tutorAvailability";

// Simple toast
const Toast = ({ message, type }: { message: string; type: "success" | "error" }) => (
  <div
    className={`fixed top-4 right-4 px-4 py-2 rounded shadow text-white ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`}
  >
    {message}
  </div>
);

export default function TutorAvailability() {
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [newSlot, setNewSlot] = useState({ dayOfWeek: "", startTime: "", endTime: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editSlot, setEditSlot] = useState({ dayOfWeek: 0, startTime: "", endTime: "" });
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(
    null
  );

  useEffect(() => {
    // small delay for auth/session
    const timer = setTimeout(() => {
      fetchSlots();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const data = await getMyAvailability();
      setSlots(data);
    } catch (err: any) {
      console.error(err);
      showToast("Failed to load availability", "error");
    } finally {
      setLoading(false);
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
      showToast("Availability added ✅", "success");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to create slot ❌", "error");
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editSlot.dayOfWeek || !editSlot.startTime || !editSlot.endTime) {
      showToast("Fill all fields to update", "error");
      return;
    }

    try {
      await updateAvailability(id, editSlot);
      setEditingId(null);
      fetchSlots();
      showToast("Slot updated ✅", "success");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to update slot ❌", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this slot?")) return;

    try {
      await deleteAvailability(id);
      fetchSlots();
      showToast("Slot deleted ✅", "success");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to delete slot ❌", "error");
    }
  };

  if (loading) return <p className="text-gray-500">Loading availability…</p>;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-2xl mx-auto">
      {toast && <Toast message={toast.message} type={toast.type} />}

      <h2 className="text-xl font-semibold mb-4">Your Availability</h2>

      {/* CREATE FORM ROW */}
      <div className="grid grid-cols-4 gap-2 mb-4 items-center">
        <input
          type="number"
          placeholder="Day (0-6)"
          value={newSlot.dayOfWeek}
          onChange={(e) => setNewSlot({ ...newSlot, dayOfWeek: e.target.value })}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          type="time"
          value={newSlot.startTime}
          onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          type="time"
          value={newSlot.endTime}
          onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
          className="border px-2 py-1 rounded w-full"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-3 py-1 rounded w-full"
        >
          Add
        </button>
      </div>

      {/* LIST OF AVAILABILITY */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className="flex flex-wrap justify-between items-center py-2"
          >
            {editingId === slot.id ? (
              <div className="grid grid-cols-4 gap-2 w-full">
                <input
                  type="number"
                  value={editSlot.dayOfWeek}
                  onChange={(e) =>
                    setEditSlot({ ...editSlot, dayOfWeek: Number(e.target.value) })
                  }
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  type="time"
                  value={editSlot.startTime}
                  onChange={(e) =>
                    setEditSlot({ ...editSlot, startTime: e.target.value })
                  }
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  type="time"
                  value={editSlot.endTime}
                  onChange={(e) => setEditSlot({ ...editSlot, endTime: e.target.value })}
                  className="border px-2 py-1 rounded w-full"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(slot.id)}
                    className="bg-green-600 text-white px-2 py-1 rounded"
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
              </div>
            ) : (
              <>
                <span className="w-1/2">
                  Day {slot.dayOfWeek} — {slot.startTime} to {slot.endTime}
                  {slot.isBooked && " (Booked)"}
                </span>
                <div className="flex gap-2 mt-1 sm:mt-0">
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
        {slots.length === 0 && (
          <p className="text-gray-500 mt-2">You haven't added any availability yet.</p>
        )}
      </div>
    </div>
  );
}



// "use client";
// import { useEffect, useState } from "react";
// import {
//   getMyAvailability,
//   createAvailability,
//   updateAvailability,
//   deleteAvailability,
// } from "@/services/dashboard/tutorAvailability";

// interface Slot {
//   id: string;
//   dayOfWeek: number;
//   startTime: string;
//   endTime: string;
//   isBooked?: boolean;
// }

// const Toast = ({ message, type }: { message: string; type: "success" | "error" }) => (
//   <div className={`fixed top-4 right-4 px-4 py-2 rounded shadow text-white ${type === "success" ? "bg-green-500" : "bg-red-500"}`}>{message}</div>
// );

// export default function TutorAvailability() {
//   const [slots, setSlots] = useState<Slot[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [newSlot, setNewSlot] = useState({ dayOfWeek: "", startTime: "", endTime: "" });
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editSlot, setEditSlot] = useState({ dayOfWeek: 0, startTime: "", endTime: "" });
//   const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

//   const showToast = (message: string, type: "success" | "error" = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const fetchSlots = async () => {
//     try {
//       setLoading(true);
//       const data = await getMyAvailability();
//       setSlots(data);
//     } catch (err: any) {
//       console.error(err);
//       showToast("Failed to load availability", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { const timer = setTimeout(fetchSlots, 300); return () => clearTimeout(timer); }, []);

//   const validateSlot = (day: number, start: string, end: string) => {
//     if (isNaN(day) || day < 0 || day > 6) return false;
//     if (!start || !end) return false;
//     return true;
//   };

//   const handleCreate = async () => {
//     const day = Number(newSlot.dayOfWeek);
//     if (!validateSlot(day, newSlot.startTime, newSlot.endTime)) {
//       showToast("Invalid input. Day 0-6 and times required.", "error");
//       return;
//     }
//     try {
//       await createAvailability({ dayOfWeek: day, startTime: newSlot.startTime, endTime: newSlot.endTime });
//       setNewSlot({ dayOfWeek: "", startTime: "", endTime: "" });
//       fetchSlots();
//       showToast("Availability added ✅");
//     } catch (err: any) {
//       console.error(err);
//       showToast(err.message || "Failed to create slot ❌", "error");
//     }
//   };

//   const handleUpdate = async (id: string) => {
//     if (!validateSlot(editSlot.dayOfWeek, editSlot.startTime, editSlot.endTime)) {
//       showToast("Fill all fields correctly to update", "error");
//       return;
//     }
//     try {
//       await updateAvailability(id, editSlot);
//       setEditingId(null);
//       fetchSlots();
//       showToast("Slot updated ✅");
//     } catch (err: any) {
//       console.error(err);
//       showToast(err.message || "Failed to update slot ❌", "error");
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Delete this slot?")) return;
//     try {
//       await deleteAvailability(id);
//       fetchSlots();
//       showToast("Slot deleted ✅");
//     } catch (err: any) {
//       console.error(err);
//       showToast(err.message || "Failed to delete slot ❌", "error");
//     }
//   };

//   if (loading) return <p className="text-gray-500">Loading availability…</p>;

//   return (
//     <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-2xl mx-auto">
//       {toast && <Toast message={toast.message} type={toast.type} />}
//       <h2 className="text-xl font-semibold mb-4">Your Availability</h2>

//       {/* CREATE FORM */}
//       <div className="grid grid-cols-4 gap-2 mb-4 items-center">
//         <input type="number" placeholder="Day (0-6)" value={newSlot.dayOfWeek} onChange={(e) => setNewSlot({ ...newSlot, dayOfWeek: e.target.value })} className="border px-2 py-1 rounded w-full"/>
//         <input type="time" value={newSlot.startTime} onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })} className="border px-2 py-1 rounded w-full"/>
//         <input type="time" value={newSlot.endTime} onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })} className="border px-2 py-1 rounded w-full"/>
//         <button onClick={handleCreate} className="bg-blue-600 text-white px-3 py-1 rounded w-full">Add</button>
//       </div>

//       {/* LIST OF AVAILABILITY */}
//       <div className="divide-y divide-gray-200 dark:divide-gray-700">
//         {slots.map(slot => (
//           <div key={slot.id} className="flex flex-wrap justify-between items-center py-2">
//             {editingId === slot.id ? (
//               <div className="grid grid-cols-4 gap-2 w-full">
//                 <input type="number" value={editSlot.dayOfWeek} onChange={(e) => setEditSlot({ ...editSlot, dayOfWeek: Number(e.target.value) })} className="border px-2 py-1 rounded w-full"/>
//                 <input type="time" value={editSlot.startTime} onChange={(e) => setEditSlot({ ...editSlot, startTime: e.target.value })} className="border px-2 py-1 rounded w-full"/>
//                 <input type="time" value={editSlot.endTime} onChange={(e) => setEditSlot({ ...editSlot, endTime: e.target.value })} className="border px-2 py-1 rounded w-full"/>
//                 <div className="flex gap-2">
//                   <button onClick={() => handleUpdate(slot.id)} className="bg-green-600 text-white px-2 py-1 rounded">Save</button>
//                   <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-2 py-1 rounded">Cancel</button>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <span className="w-1/2">Day {slot.dayOfWeek} — {slot.startTime} to {slot.endTime}{slot.isBooked ? " (Booked)" : ""}</span>
//                 <div className="flex gap-2 mt-1 sm:mt-0">
//                   <button onClick={() => { setEditingId(slot.id); setEditSlot(slot); }} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
//                   <button onClick={() => handleDelete(slot.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//         {slots.length === 0 && <p className="text-gray-500 mt-2">You haven't added any availability yet.</p>}
//       </div>
//     </div>
//   );
// }
