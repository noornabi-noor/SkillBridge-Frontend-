
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllTutors() {
  const res = await fetch(`${API_URL}/api/tutors`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tutors");
  }

  const json = await res.json();

  return json.data;
}

export async function getSingleTutor(id: string) {
  const res = await fetch(`${API_URL}/api/tutors/${id}`, { cache: "no-store" });
  if (!res.ok) {
    console.error(`Failed to fetch tutor with id: ${id}`, await res.text());
    return null; // gracefully handle 404
  }
  const json = await res.json();
  return json.data;
}

export async function getAllUsers() {
  const res = await fetch(`${API_URL}/api/users`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const json = await res.json();

  return json.data;
}