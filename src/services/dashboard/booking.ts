// booking.ts
// const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getMyBookings() {
  const res = await fetch(`/api/bookings/student/me`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const json = await res.json();
  return json.data || [];
}

export async function createBooking(payload: {
  tutorId: string;
  date: string;
  startTime: string;
  endTime: string;
}) {
  const res = await fetch(`/api/bookings`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Booking failed");
  }

  return res.json();
}

export async function getStudentBookings(studentId: string) {
  const res = await fetch(`/api/bookings`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch bookings");

  const json = await res.json();

  const all = Array.isArray(json.data) ? json.data : [];
  return all.filter((b: any) => b.studentId === studentId);
}

export async function updateBookingStatus(
  bookingId: string,
  status: "CONFIRMED" | "CANCELLED" | "COMPLETED",
) {
  const res = await fetch(`/api/bookings/${bookingId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update booking");
  }

  return res.json();
}

export async function getStudentOwnBookings() {
  const res = await fetch(`/api/bookings/student/me`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}

export async function cancelBooking(bookingId: string) {
  const res = await fetch(`/api/bookings/${bookingId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ status: "CANCELLED" }),
  });

  if (!res.ok) {
    throw new Error("Cancel failed");
  }

  return true;
}


/* ================= AVAILABILITY ================= */

export async function getTutorAvailability(tutorId: string) {
  const res = await fetch(`/api/availability/tutor/${tutorId}`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch availability");
  }

  const json = await res.json();
  return json.data || [];
}

export interface Booking {
  id: string;
  studentId: string;
  date: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
}

export async function getBookingsByStudent(studentId: string): Promise<Booking[]> {
  try {
    const res = await fetch(`/api/bookings`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch bookings: ${res.statusText}`);
    }

    const data = await res.json();
    const allBookings: Booking[] = Array.isArray(data.data) ? data.data : [];

    return allBookings.filter((b) => b.studentId === studentId);
  } catch (err) {
    console.error(err);
    return [];
  }
}
