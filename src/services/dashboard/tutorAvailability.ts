// const API_URL = process.env.NEXT_PUBLIC_API_URL;
// GET logged-in tutor's slots
export async function getMyAvailability() {
  const res = await fetch(`/api/availability/me`, {
    credentials: "include", // important
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to fetch availability");
  }

  return (await res.json()).data;
}

// CREATE slot
export async function createAvailability(slot: { dayOfWeek: number; startTime: string; endTime: string; }) {
  const res = await fetch(`/api/availability/me`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // important
    body: JSON.stringify(slot),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to create availability");
  }

  return (await res.json()).data;
}

// UPDATE slot
export async function updateAvailability(id: string, slot: { dayOfWeek: number; startTime: string; endTime: string; }) {
  const res = await fetch(`/api/availability/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // important
    body: JSON.stringify(slot),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to update availability");
  }

  return (await res.json()).data;
}

// DELETE slot
export async function deleteAvailability(id: string) {
  const res = await fetch(`/api/availability/${id}`, {
    method: "DELETE",
    credentials: "include", // important
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to delete availability");
  }

  return (await res.json()).data;
}


export async function getTutorAvailability(tutorId: string) {
  const res = await fetch(`/api/availability/tutor/${tutorId}`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch availability");
  }

  const json = await res.json(); 
  return json.data || [];
}
