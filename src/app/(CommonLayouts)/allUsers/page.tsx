// import { getAllUsers } from "@/services/tutors/tutors";

// export default async function FindUsersPage() {
//   const users = await getAllUsers();

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10">
//       <h1 className="text-3xl font-bold mb-8">Find users</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {users.map((u: any) => (
//           <div
//             key={u.id}
//             className="border rounded-lg p-5 shadow-sm hover:shadow-md transition flex flex-col"
//           >
//             <img
//               src={u.image || "/avatar.png"} // <-- removed u.user
//               alt={u.name}
//               className="w-16 h-16 rounded-full mb-4 object-cover self-center"
//             />

//             <h2 className="text-lg font-semibold text-center">{u.name}</h2>
//             <p className="text-sm text-gray-500 text-center">{u.email}</p>
//             <p className="text-sm text-gray-500 text-center">{u.role}</p>


//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import { getAllUsers } from "@/services/tutors/tutors";

export default async function FindUsersPage() {
  const users = await getAllUsers();

  // Filter only students
  const students = users.filter((u : any) => u.role === "STUDENT");

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Find Students</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {students.map((u: any) => (
          <div
            key={u.id}
            className="border rounded-lg p-5 shadow-sm hover:shadow-md transition flex flex-col items-center"
          >
            <img
              src={u.image || "/avatar.png"}
              alt={u.name}
              className="w-16 h-16 rounded-full mb-4 object-cover"
            />
            <h2 className="text-lg font-semibold text-center">{u.name}</h2>
            <p className="text-sm text-gray-500 text-center">{u.email}</p>
          </div>
        ))}

        {students.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No students found.
          </p>
        )}
      </div>
    </div>
  );
}
