export async function getAllTutors() {
  try {
    const res = await fetch(`/api/tutors`, {
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch tutors status:", res.status);
      return [];
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("getAllTutors error:", error);
    return [];
  }
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
  try {
    const res = await fetch(`/api/users`, {
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
     console.error("Failed to fetch users status:", res.status);
     return [];
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("getAllUsers error:", error);
    return [];
  }
}


// *-------------*//

export async function getTopRatedTutor() {
  try {
    const res = await fetch(`/api/tutors/top-tutor`, {
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "Unknown error");
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { rawText: errorText };
      }
      console.error("Failed to fetch top tutors status:", res.status, errorData);
      return [];
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("getTopRatedTutor error:", error);
    return [];
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`/api/categories`, {
      cache: "no-store",
      credentials: "include", // include cookies for auth
    });

    if (!res.ok) {
      console.error("Failed to fetch categories status:", res.status);
      return [];
    }

    const json = await res.json();

    // Return only categories with at least one tutor
    return json.data.filter((c: any) => c.tutors && c.tutors.length > 0);
  } catch (error) {
    console.error("getCategories error:", error);
    return [];
  }
}

export type BecomeTutorPayload = {
  bio: string;
  experience: number;
  pricePerHour: number;
  categories: string[];
};

export async function becomeTutor(payload: BecomeTutorPayload) {
  try {
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
  } catch (error: any) {
    console.error("becomeTutor error:", error);
    throw error;
  }
}

export async function getTutors() {
  try {
    const res = await fetch(`/api/tutors`, {
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to fetch tutors status:", res.status);
      return [];
    }

    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error("getTutors error:", error);
    return [];
  }
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
  try {
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
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to update user profile");
    }

    return res.json();
  } catch (error: any) {
    console.error("updateUserProfile error:", error);
    throw error;
  }
}

export async function upsertTutorProfile(
  payload: UpdateTutorPayload,
) {
  try {
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
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to update tutor profile");
    }
    return res.json();
  } catch (error: any) {
    console.error("upsertTutorProfile error:", error);
    throw error;
  }
}