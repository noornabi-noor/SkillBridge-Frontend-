"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookTutorButton from "@/components/modules/tutors/BookTutorButton";
import { getCurrentUser } from "@/services/auth/auth";
import { getTutors } from "@/services/dashboard/tutor";

interface Tutor {
  id: string;
  bio?: string;
  pricePerHour?: number;
  experience?: string;
  rating?: number;
  subjects?: string[];
  user: { name: string; email: string; image?: string | null };
}

interface User {
  name: string;
  email: string;
}

export default function FindTutorsPage() {
  const router = useRouter();

  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [filteredTutors, setFilteredTutors] = useState<Tutor[]>([]);
  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const [user, setUser] = useState<any>(null);
  
    useEffect(() => {
      async function fetchUser() {
        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        } catch (err) {
          console.error(err);
        }
      }
      fetchUser();
    }, []);

  // Fetch tutors
useEffect(() => {
  async function loadTutors() {
    try {
      const tutorArray = await getTutors();
      setTutors(tutorArray);
      setFilteredTutors(tutorArray);
    } catch (err) {
      console.error(err);
      setTutors([]);
      setFilteredTutors([]);
    }
  }

  loadTutors();
}, []);


  // Filter tutors
  useEffect(() => {
    let result = [...tutors];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        t =>
          t.user.name.toLowerCase().includes(q) ||
          t.subjects?.some(s => s.toLowerCase().includes(q))
      );
    }
    if (minRating > 0) result = result.filter(t => (t.rating || 0) >= minRating);
    if (maxPrice !== "") result = result.filter(t => (t.pricePerHour || 0) <= Number(maxPrice));
    setFilteredTutors(result);
  }, [search, minRating, maxPrice, tutors]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Find Tutors</h1>

      {/* Filters */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name or subject"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <select
          value={minRating}
          onChange={e => setMinRating(Number(e.target.value))}
          className="border rounded px-3 py-2"
        >
          <option value={0}>All Ratings</option>
          <option value={3}>3⭐ & up</option>
          <option value={4}>4⭐ & up</option>
          <option value={5}>5⭐</option>
        </select>
        <input
          type="number"
          placeholder="Max price ($)"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value ? Number(e.target.value) : "")}
          className="border rounded px-3 py-2"
        />
      </div>

      {/* Tutors */}
      {filteredTutors.length === 0 ? (
        <p className="text-gray-500 text-center">No tutors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredTutors.map(tutor => (
            <div key={tutor.id} className="border rounded-lg p-5 shadow-sm hover:shadow-md transition flex flex-col">
              <img
                src={tutor.user.image || "/avatar.png"}
                alt={tutor.user.name}
                className="w-16 h-16 rounded-full mb-4 object-cover self-center"
              />
              <h2 className="text-lg font-semibold text-center">{tutor.user.name}</h2>
              <p className="mt-3 text-sm">{tutor.bio || "No bio available"}</p>
              <p className="mt-2 font-medium">💰 ${tutor.pricePerHour ?? "N/A"}/hr</p>
              {tutor.rating && <p className="text-yellow-500">⭐ {tutor.rating.toFixed(1)}</p>}

              <div className="mt-4 flex justify-between">
                {/* Book button */}
                <BookTutorButton tutor={tutor} user={user} />

                <button
                  onClick={() => router.push(`/find-tutors/${tutor.id}`)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
