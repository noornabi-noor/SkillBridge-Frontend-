
export interface Student {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export async function getStudentById(studentId: string): Promise<Student | null> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    console.log("API_URL:", API_URL);
    if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL not defined");

    const res = await fetch(`${API_URL}/api/users/${studentId}`, {
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
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL not defined");

    const res = await fetch(`${API_URL}/api/users/${studentId}`, {
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