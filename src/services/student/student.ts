export interface Student {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export async function getStudentById(studentId: string): Promise<Student | null> {
  try {

    const res = await fetch(`/api/users/${studentId}`, {
        cache: "no-store",
        credentials: "include",
    });

    console.log("Fetch status:", res.status);

    const text = await res.text();
    console.log("Raw response text:", text);

    if (!res.ok) return null;

    const data = JSON.parse(text);
    console.log("Parsed response:", data);

    if (data && data.data) return data.data;
    if (data && data.id && data.name && data.email) return data;

    return null;
  } catch (err) {
    console.error("Error in getStudentById:", err);
    return null;
  }
}

export async function updateStudentProfile(
  studentId: string,
  updates: Partial<Student>
): Promise<boolean> {
  try {

    const res = await fetch(`/api/users/${studentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error("API Error: " + text);
    }

    const data = await res.json();
    return !!data.success;
  } catch (err) {
    console.error("Error updating student:", err);
    return false;
  }
}

export async function getAllTutors() {
  const res = await fetch(`/api/tutors`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tutors");
  }

  const json = await res.json();

  return json.data;
}