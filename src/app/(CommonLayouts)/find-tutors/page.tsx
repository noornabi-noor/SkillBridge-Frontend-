// import { getAllTutors } from "@/services/tutors/tutors";

// export default async function FindTutorsPage() {
//   const tutors = await getAllTutors();

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10">
//       <h1 className="text-3xl font-bold mb-8">Find Tutors</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {tutors.map((tutor: any) => (
//           <div
//             key={tutor.id}
//             className="border rounded-lg p-5 shadow-sm hover:shadow-md transition"
//           >
//             <img
//               src={tutor.user.image || "/avatar.png"}
//               alt={tutor.user.name}
//               className="w-16 h-16 rounded-full mb-4 object-cover"
//             />

//             <h2 className="text-lg font-semibold">
//               {tutor.user.name}
//             </h2>

//             <p className="text-sm text-gray-500">
//               {tutor.user.email}
//             </p>

//             <p className="mt-3 text-sm">
//               {tutor.bio || "No bio available"}
//             </p>

//             <p className="mt-2 font-medium">
//               💰 ${tutor.pricePerHour}/hr
//             </p>

//             <p className="text-sm text-gray-500">
//               🎓 {tutor.experience} years experience
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { getAllTutors } from "@/services/tutors/tutors";

export default async function FindTutorsPage() {
  const tutors = await getAllTutors();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Find Tutors</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tutors.map((tutor: any) => (
          <div
            key={tutor.id}
            className="border rounded-lg p-5 shadow-sm hover:shadow-md transition flex flex-col"
          >
            <img
              src={tutor.user.image || "/avatar.png"}
              alt={tutor.user.name}
              className="w-16 h-16 rounded-full mb-4 object-cover self-center"
            />

            <h2 className="text-lg font-semibold text-center">{tutor.user.name}</h2>
            <p className="text-sm text-gray-500 text-center">{tutor.user.email}</p>

            <p className="mt-3 text-sm">{tutor.bio || "No bio available"}</p>
            <p className="mt-2 font-medium">💰 ${tutor.pricePerHour}/hr</p>
            <p className="text-sm text-gray-500">🎓 {tutor.experience} years experience</p>

            {/* See Details Button */}
            <a
              href={`/find-tutors/${tutor.id}`}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-center"
            >
              See Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
