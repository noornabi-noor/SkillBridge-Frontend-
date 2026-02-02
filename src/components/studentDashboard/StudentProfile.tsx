"use client";

import { useEffect, useState } from "react";

interface Student {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface Props {
  studentId: string;
}

export default function StudentProfile({ studentId }: Props) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchStudent();
  }, [studentId]);

  const fetchStudent = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${studentId}`, {
        credentials: "include", // important to send session cookie
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Failed to fetch student:", text);
        setStudent(null);
        return;
      }

      const data = await res.json();

      if (data.success && data.data) {
        setStudent(data.data);
      } else {
        setStudent(null);
      }
    } catch (err) {
      console.error(err);
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!student) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${student.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: name || student.name,
          email: email || student.email,
          image: image || student.image,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error("API Error: " + text);
      }

      const data = await res.json();

      if (data.success) {
        alert("Profile updated successfully ✅");
        fetchStudent();
        setName("");
        setEmail("");
        setImage("");
      } else {
        throw new Error(data.message || "Failed to update profile");
      }
    } catch (err: any) {
      console.error(err);
      alert("Update failed ❌: " + err.message);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="space-y-6">
      {/* Current Profile */}
      {student ? (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Profile</h2>
          <div className="flex items-center gap-4">
            <img
              src={student.image || "/avatar.png"}
              alt={student.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{student.name}</p>
              <p className="text-gray-500">{student.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Student not found</p>
      )}

      {/* Update Form */}
      {student && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Update Profile</h2>

          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder={student.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border px-2 py-1 w-full rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder={student.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-2 py-1 w-full rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="text"
              placeholder={student.image || "https://example.com/avatar.png"}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border px-2 py-1 w-full rounded"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
