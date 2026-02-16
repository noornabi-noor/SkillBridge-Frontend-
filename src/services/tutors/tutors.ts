export async function getAllTutors() {
  const res = await fetch(`/api/tutors`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tutors");
  }

  const json = await res.json();

  return json.data;
}

// export async function getSingleTutor(id: string) {
//   const res = await fetch(`/api/tutors/${id}`, {credentials: "include", cache: "no-store" });
//   if (!res.ok) {
//     console.error(`Failed to fetch tutor with id: ${id}`, await res.text());
//     return null; 
//   }
//   const json = await res.json();
//   return json.data;
// }

export async function getAllUsers() {
  const res = await fetch(`/api/users`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const json = await res.json();

  return json.data;
}


// *-------------*//

export async function getTopRatedTutor() {
  const res = await fetch(`/api/tutors/top-tutor`, {
    cache: "no-store",
    credentials: "include",
  });

  if(!res.ok){
    throw new Error("Failed to fetch tutors");
  }

  const json = await res.json();

  return json.data;
}

export async function getCategories() {
  const res = await fetch(`/api/categories`, {
    cache: "no-store",
    credentials: "include", // include cookies for auth
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const json = await res.json();

  // Return only categories with at least one tutor
  return json.data.filter((c: any) => c.tutors && c.tutors.length > 0);
}

export type BecomeTutorPayload = {
  bio: string;
  experience: number;
  pricePerHour: number;
  categories: string[];
};

export async function becomeTutor(payload: BecomeTutorPayload) {
  const res = await fetch(`/api/tutors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // send cookies
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to become tutor");
  }
  return data;
}

export async function getTutors() {
  const res = await fetch(`/api/tutors`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tutors");
  }

  const json = await res.json();

  return Array.isArray(json.data) ? json.data : [];
}

interface UpdateUserPayload {
  name: string;
  email: string;
  phone?: string;
  image?: string;
}

interface UpdateTutorPayload {
  bio?: string;
  experience?: number;
  pricePerHour?: number;
  categories?: string[];
}

export async function updateUserProfile(
  userId: string,
  payload: UpdateUserPayload,
) {
  const res = await fetch(`/api/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!res.ok) {
    throw new Error("Failed to update user profile");
  }

  return res.json();
}

export async function upsertTutorProfile(
  payload: UpdateTutorPayload,
) {
  const res = await fetch(`/api/tutors`, {
    method: "PATCH", // backend already handles create/update
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!res.ok) {
    throw new Error("Failed to update tutor profile");
  }
  return res.json();
}