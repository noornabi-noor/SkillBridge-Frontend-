"use client";
import { useEffect, useMemo, useState } from "react";

interface Tutor {
  id: string;
  bio?: string;
  pricePerHour?: number;
  categories?: {
    category: {
      name: string;
    };
  }[];
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
}

interface Booking {
  id: string;
  tutorId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
}

export default function BrowseTutors() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch tutors
      const tutorsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutors`);
      const tutorsData = await tutorsRes.json();
      setTutors(tutorsData.data || []);

      // Fetch bookings
      const bookingsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
        credentials: "include",
      });
      const bookingsData = await bookingsRes.json();
      setBookings(bookingsData.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const allCategories = useMemo(() => {
    const set = new Set<string>();
    tutors.forEach((t) => t.categories?.forEach((c) => set.add(c.category.name)));
    return ["ALL", ...Array.from(set)];
  }, [tutors]);

  const filteredTutors = useMemo(() => {
    if (selectedCategory === "ALL") return tutors;
    return tutors.filter((t) => t.categories?.some((c) => c.category.name === selectedCategory));
  }, [tutors, selectedCategory]);

  const handleBook = async () => {
    if (!selectedTutor || !bookingDate || !bookingTime) {
      alert("Please select date and time");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          tutorId: selectedTutor.id,
          date: new Date(bookingDate),
          startTime: bookingTime,
          endTime: bookingTime,
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      alert("Booking request sent ✅");
      setSelectedTutor(null);
      setBookingDate("");
      setBookingTime("");
      fetchData();
    } catch (err: any) {
      console.error(err);
      alert("Booking failed ❌: " + err.message);
    }
  };

  const getBookingStatus = (tutorId: string) =>
    bookings.find((b) => b.tutorId === tutorId)?.status;

  if (loading) return <p>Loading tutors...</p>;

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Browse Tutors</h2>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="mr-2 font-medium dark:text-gray-200">Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-1 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Tutors List */}
      <ul>
        {filteredTutors.map((tutor) => {
          const status = getBookingStatus(tutor.id);
          return (
            <li
              key={tutor.id}
              className="border p-4 mb-4 rounded shadow-sm flex gap-4 items-start dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                src={tutor.user?.image || "/avatar.png"}
                alt={tutor.user?.name}
                className="w-16 h-16 rounded-full object-cover"
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold dark:text-white">{tutor.user?.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{tutor.user?.email}</p>
                <p className="mt-2 text-sm dark:text-gray-300">{tutor.bio || "No bio available"}</p>
                <p className="mt-1 text-sm dark:text-gray-300">
                  <strong>Categories:</strong>{" "}
                  {tutor.categories?.map((c) => c.category.name).join(", ") || "N/A"}
                </p>
                <p className="mt-1 text-sm dark:text-gray-300">
                  <strong>Rate:</strong> ${tutor.pricePerHour || 0}/hr
                </p>

                {status ? (
                  <div
                    className={`mt-3 px-3 py-1 rounded text-white inline-block ${
                      status === "PENDING"
                        ? "bg-yellow-500"
                        : status === "CONFIRMED"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {status}
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedTutor(tutor)}
                    className="mt-3 px-4 py-1 rounded text-white bg-blue-500 hover:bg-blue-600"
                  >
                    Book
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Booking Modal */}
      {selectedTutor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="p-6 rounded w-80 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <h3 className="text-lg font-semibold mb-2">Book {selectedTutor.user.name}</h3>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="border px-2 py-1 w-full rounded mb-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <input
              type="time"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              className="border px-2 py-1 w-full rounded mb-4 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <div className="flex justify-between">
              <button
                onClick={handleBook}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Confirm
              </button>
              <button
                onClick={() => setSelectedTutor(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
