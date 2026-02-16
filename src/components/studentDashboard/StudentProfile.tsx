"use client";

import { useEffect, useState } from "react";
import {
  Student,
  getStudentById,
  updateStudentProfile,
} from "@/services/student/student";
import LoadingPage from "@/app/loading";

interface Props {
  studentId: string;
}

export default function StudentProfile({ studentId }: Props) {
  const [student, setStudent] = useState<Student | null>(null);

  // 🔹 only for FIRST load
  const [initialLoading, setInitialLoading] = useState(true);

  // 🔹 only for save button
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  // ========================
  // FETCH STUDENT (ONCE)
  // ========================
  useEffect(() => {
    if (!studentId) return;

    const fetchStudent = async () => {
      setInitialLoading(true);
      const data = await getStudentById(studentId);
      setStudent(data);
      setInitialLoading(false);
    };

    fetchStudent();
  }, [studentId]);

  // ========================
  // UPDATE PROFILE
  // ========================
  const handleUpdate = async () => {
    if (!student) return;

    setSaving(true);

    const updatedStudent: Student = {
      ...student,
      name: name || student.name,
      email: email || student.email,
      image: image || student.image,
    };

    // 🔥 Update UI immediately (NO loading screen)
    setStudent(updatedStudent);

    const success = await updateStudentProfile(student.id, updatedStudent);

    setSaving(false);

    if (!success) {
      alert("Update failed ❌");
      // rollback if API fails
      const fresh = await getStudentById(student.id);
      setStudent(fresh);
      return;
    }

    alert("Profile updated ✅");
    setName("");
    setEmail("");
    setImage("");
  };

  // ========================
  // RENDER
  // ========================
  if (initialLoading) {
    return <LoadingPage/>;
  }

  if (!student) {
    return <p className="text-red-500">Student not found</p>;
  }

  return (
    <div className="space-y-6">
      {/* PROFILE CARD */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
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

      {/* UPDATE FORM */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Update Profile</h2>

        <input
          className="border px-2 py-1 w-full mb-2 rounded"
          placeholder={student.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border px-2 py-1 w-full mb-2 rounded"
          placeholder={student.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border px-2 py-1 w-full mb-4 rounded"
          placeholder={student.image || "Image URL"}
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button
          onClick={handleUpdate}
          disabled={saving}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
