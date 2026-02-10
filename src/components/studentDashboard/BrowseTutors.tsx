"use client";

import { createBooking, getMyBookings } from "@/services/dashboard/booking";
import { getAllTutors } from "@/services/dashboard/student";
import { getTutorAvailability } from "@/services/dashboard/tutorAvailability";
import { useEffect, useState } from "react";

interface Tutor {
  id: string;
  bio?: string;
  pricePerHour?: number;
  user: { name: string; email: string; image?: string | null };
}

interface Booking {
  id: string;
  tutorId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
}

interface Availability {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// --- Convert time string to minutes
const toMinutes = (time: string): number => {
  time = time.trim();

  // 24-hour format HH:MM
  const match24 = time.match(/^([01]?\d|2[0-3]):([0-5]\d)$/);
  if (match24) {
    const h = Number(match24[1]);
    const m = Number(match24[2]);
    return h * 60 + m;
  }

  // 12-hour format HH:MM AM/PM
  const match12 = time.match(/^(\d{1,2}):([0-5]\d)\s?(AM|PM)$/i);
  if (match12) {
    let h = Number(match12[1]);
    const m = Number(match12[2]);
    const period = match12[3].toUpperCase();
    if (h === 12) h = 0;
    if (period === "PM") h += 12;
    return h * 60 + m;
  }

  throw new Error("Invalid time format: " + time);
};

// --- Minutes → 12h
const minutesToTime12h = (min: number) => {
  if (min === 24 * 60) min = 0; // handle midnight
  let h = Math.floor(min / 60);
  const m = min % 60;
  const period = h >= 12 ? "PM" : "AM";
  if (h === 0) h = 12;
  if (h > 12) h -= 12;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${period}`;
};

// --- Minutes → 24h
const minutesToTime24h = (min: number) => {
  if (min === 24 * 60) min = 0;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
};

export default function BrowseTutors() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [freeSlots, setFreeSlots] = useState<
    { startTime: number; endTime: number }[]
  >([]);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");

  useEffect(() => {
    fetchTutors();
    fetchMyBookings();
  }, []);

  const fetchTutors = async () => {
    try {
      const data = await getAllTutors();
      setTutors(data);
    } catch (err) {
      console.error(err);
      setTutors([]);
    }
  };

  const fetchMyBookings = async () => {
    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
      setBookings([]);
    }
  };

  const openTutor = async (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setAvailability([]);
    setFreeSlots([]);
    setSelectedDate("");
    setSelectedStartTime("");
    setSelectedEndTime("");

    try {
      const data = await getTutorAvailability(tutor.id);
      setAvailability(data);
    } catch (err) {
      console.error(err);
      setAvailability([]);
    }
  };

  const calculateFreeSlots = (date: string) => {
    if (!selectedTutor) return;
    const dayOfWeek = new Date(date).getDay();
    const dayAvail = availability.filter((a) => a.dayOfWeek === dayOfWeek);
    let slots: { startTime: number; endTime: number }[] = [];

    dayAvail.forEach((a) => {
      let start = toMinutes(a.startTime);
      let end = toMinutes(a.endTime);
      if (end === 0) end = 24 * 60;

      let tmp = [{ startTime: start, endTime: end }];

      const dayBookings = bookings
        .filter(
          (b) =>
            b.tutorId === selectedTutor.id &&
            b.date === date &&
            ["PENDING", "CONFIRMED"].includes(b.status),
        )
        .map((b) => {
          let bStart = toMinutes(b.startTime);
          let bEnd = toMinutes(b.endTime);
          if (bEnd === 0) bEnd = 24 * 60;
          return { startTime: bStart, endTime: bEnd };
        });

      dayBookings.forEach((b) => {
        tmp = tmp.flatMap((slot) => {
          if (b.endTime <= slot.startTime || b.startTime >= slot.endTime)
            return [slot];
          const res: { startTime: number; endTime: number }[] = [];
          if (b.startTime > slot.startTime)
            res.push({ startTime: slot.startTime, endTime: b.startTime });
          if (b.endTime < slot.endTime)
            res.push({ startTime: b.endTime, endTime: slot.endTime });
          return res;
        });
      });

      slots.push(...tmp);
    });

    slots.sort((a, b) => a.startTime - b.startTime);
    setFreeSlots(slots);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedStartTime("");
    setSelectedEndTime("");
    calculateFreeSlots(date);
  };

  const bookTutor = async () => {
    if (
      !selectedTutor ||
      !selectedDate ||
      !selectedStartTime ||
      !selectedEndTime
    )
      return alert("Select date and time");

    const startMin = toMinutes(selectedStartTime);
    const endMin = toMinutes(selectedEndTime);

    // Only check freeSlots if there is availability
    if (availability.length > 0) {
      const valid = freeSlots.some(
        (s) =>
          startMin >= s.startTime && endMin <= s.endTime && startMin < endMin,
      );
      if (!valid)
        return alert("Selected time is invalid or overlaps existing bookings");
    } else if (startMin >= endMin) {
      // If no availability, just check start < end
      return alert("End time must be after start time");
    }

    try {
      const data = await createBooking({
        tutorId: selectedTutor.id,
        date: selectedDate,
        startTime: selectedStartTime,
        endTime: selectedEndTime,
      });

      // if your API returns { success: true/false, message: string }
      if (!data.success) {
        throw new Error(data.message || "Booking failed");
      }

      alert("Booking request sent ✅");
      setSelectedTutor(null);
      fetchMyBookings();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        Browse Tutors
      </h1>

      {/* Tutor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tutors.map((tutor) => (
          <div
            key={tutor.id}
            className="border rounded-xl p-4 bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-colors duration-300"
          >
            <div className="flex items-center gap-4">
              <img
                src={tutor.user.image || "/avatar.png"}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  {tutor.user.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {tutor.user.email}
                </p>
                {tutor.bio && (
                  <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                    {tutor.bio}
                  </p>
                )}
                {tutor.pricePerHour && (
                  <p className="text-sm mt-1 font-medium text-gray-800 dark:text-gray-200">
                    Rate: ${tutor.pricePerHour}/hr
                  </p>
                )}
              </div>
              <button
                onClick={() => openTutor(tutor)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tutor Modal */}
      {selectedTutor && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-20 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 w-full max-w-md rounded-xl shadow-lg relative transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              {selectedTutor.user.name}
            </h2>
            <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">
              Availability
            </h3>
            {availability.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No availability set. You can book any time.
              </p>
            ) : (
              availability.map((a) => (
                <div
                  key={a.id}
                  className="border rounded p-2 mb-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <strong>{days[a.dayOfWeek]}</strong>{" "}
                  {minutesToTime12h(toMinutes(a.startTime))} –{" "}
                  {minutesToTime12h(toMinutes(a.endTime))}
                </div>
              ))
            )}

            <label className="text-sm font-medium mt-3 block text-gray-800 dark:text-gray-200">
              Select Date:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="border w-full mb-3 px-2 py-1 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />

            {/* Show booking inputs always */}
            {selectedDate && (
              <>
                <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">
                  Select Time
                </h3>

                {availability.length > 0 ? (
                  // If availability exists, show free slots
                  freeSlots.map((slot) => (
                    <div
                      key={`${slot.startTime}-${slot.endTime}`}
                      className="border rounded p-2 mb-2 flex flex-col gap-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <div>
                        Free Slot: {minutesToTime12h(slot.startTime)} –{" "}
                        {minutesToTime12h(slot.endTime)}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="time"
                          min={minutesToTime24h(slot.startTime)}
                          max={minutesToTime24h(slot.endTime)}
                          value={selectedStartTime}
                          onChange={(e) => setSelectedStartTime(e.target.value)}
                          className="border px-2 py-1 flex-1 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                        />
                        <input
                          type="time"
                          min={
                            selectedStartTime ||
                            minutesToTime24h(slot.startTime)
                          }
                          max={minutesToTime24h(slot.endTime)}
                          value={selectedEndTime}
                          onChange={(e) => setSelectedEndTime(e.target.value)}
                          className="border px-2 py-1 flex-1 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  // No availability → allow any time
                  <div className="border rounded p-2 mb-2 flex flex-col gap-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <div>Pick any time</div>
                    <div className="flex gap-2">
                      <input
                        type="time"
                        value={selectedStartTime}
                        onChange={(e) => setSelectedStartTime(e.target.value)}
                        className="border px-2 py-1 flex-1 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                      />
                      <input
                        type="time"
                        value={selectedEndTime}
                        onChange={(e) => setSelectedEndTime(e.target.value)}
                        className="border px-2 py-1 flex-1 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={bookTutor}
                  className="mt-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                >
                  Book Selected Time
                </button>
              </>
            )}

            <button
              onClick={() => setSelectedTutor(null)}
              className="mt-4 w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
