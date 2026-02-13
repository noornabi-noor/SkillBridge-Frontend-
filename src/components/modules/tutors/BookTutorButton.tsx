"use client";

import { createBooking, getMyBookings } from "@/services/dashboard/booking";
import { getTutorAvailability } from "@/services/dashboard/tutorAvailability";
import { useEffect, useState } from "react";

interface Tutor {
  id: string;
  bio?: string;
  pricePerHour?: number;
  user: { name: string; email: string; image?: string | null };
}

interface User {
  name: string;
  email: string;
}

interface Booking {
  id: string;
  tutorId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
}

interface Availability {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const minutesToTime12h = (min: number) => {
  if (min === 24 * 60) min = 0;
  let h = Math.floor(min / 60);
  const m = min % 60;
  const period = h >= 12 ? "PM" : "AM";
  if (h === 0) h = 12;
  if (h > 12) h -= 12;
  return `${h.toString().padStart(2, "2")}:${m.toString().padStart(2, "0")} ${period}`;
};

const minutesToTime24h = (min: number) => {
  if (min === 24 * 60) min = 0;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
};

export default function BookTutorButton({
  tutor,
  user,
}: {
  tutor: Tutor;
  user: User | null | undefined;
}) {
  const [showModal, setShowModal] = useState(false);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [freeSlots, setFreeSlots] = useState<
    { startTime: number; endTime: number }[]
  >([]);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");

  useEffect(() => {
    if (showModal) {
      fetchAvailability();
      fetchBookings();
    }
  }, [showModal]);

  const fetchAvailability = async () => {
    try {
      const data = await getTutorAvailability(tutor.id);
      setAvailability(data);
    } catch (err) {
      console.error(err);
      setAvailability([]);
    }
  };

  const fetchBookings = async () => {
    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
      setBookings([]);
    }
  };

  const calculateFreeSlots = (date: string) => {
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
            b.tutorId === tutor.id &&
            b.date === date &&
            ["PENDING", "CONFIRMED"].includes(b.status),
        )
        .map((b) => ({
          startTime: toMinutes(b.startTime),
          endTime: toMinutes(b.endTime),
        }));

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
    if (!selectedDate || !selectedStartTime || !selectedEndTime)
      return alert("Select date and time");

    const startMin = toMinutes(selectedStartTime);
    const endMin = toMinutes(selectedEndTime);

    if (availability.length > 0) {
      const valid = freeSlots.some(
        (s) =>
          startMin >= s.startTime && endMin <= s.endTime && startMin < endMin,
      );
      if (!valid)
        return alert("Selected time is invalid or overlaps existing bookings");
    } else if (startMin >= endMin) {
      return alert("End time must be after start time");
    }

    try {
      // const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
      //   {
      //     method: "POST",
      //     credentials: "include",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       tutorId: tutor.id,
      //       date: selectedDate,
      //       startTime: selectedStartTime,
      //       endTime: selectedEndTime,
      //     }),
      //   },
      // );

      const res = await await createBooking({
        tutorId: tutor.id,
        date: selectedDate,
        startTime: selectedStartTime,
        endTime: selectedEndTime,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Booking failed");
      }

      alert("Booking request sent ✅");
      setShowModal(false);
      setSelectedDate("");
      setSelectedStartTime("");
      setSelectedEndTime("");
      setFreeSlots([]);
      fetchBookings();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleClick = () => {
    if (user === undefined) return; // still loading
    if (user === null) {
      window.location.href = "/login"; // redirect only if truly not logged in
      return;
    }
    setShowModal(true); // logged in → open modal
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`px-4 py-2 rounded ${
          user === undefined
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
      >
        {user === undefined ? "Loading..." : "Book Tutor"}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-20 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 w-full max-w-md rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              {tutor.user.name}
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

            {selectedDate && (
              <>
                <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">
                  Select Time
                </h3>
                {freeSlots.length > 0 ? (
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
                  className="mt-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                  Book Selected Time
                </button>
              </>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
