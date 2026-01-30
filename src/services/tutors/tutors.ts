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

// export async function getSingleTutor(id: string) {
//   const url = `${API_URL}/api/tutors/${id}`;
//   console.log("Fetching tutor from:", url);

//   const res = await fetch(url, { cache: "no-store" });

//   console.log("Fetch status:", res.status);

//   if (!res.ok) {
//     const text = await res.text();
//     console.error("Response text:", text);
//     throw new Error("Failed to fetch tutor");
//   }

//   const json = await res.json();
//   console.log("Tutor data:", json.data);

//   return json.data;
// }


export async function getSingleTutor(id: string) {
  const res = await fetch(`${API_URL}/api/tutors/${id}`, { cache: "no-store" });
  if (!res.ok) {
    console.error(`Failed to fetch tutor with id: ${id}`, await res.text());
    return null; // gracefully handle 404
  }
  const json = await res.json();
  return json.data;
}