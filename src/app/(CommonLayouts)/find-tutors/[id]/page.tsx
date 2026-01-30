import { getSingleTutor } from "@/services/tutors/tutors";

interface TutorDetailsPageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default async function TutorDetailsPage(props: TutorDetailsPageProps) {
  const { id } = "then" in props.params ? await props.params : props.params;

  const tutor = await getSingleTutor(id);

  if (!tutor) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">Tutor not found</h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">Please check the link or go back to the Find Tutors page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <img
          src={tutor.user.image || "/avatar.png"}
          alt={tutor.user.name}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-indigo-500"
        />
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{tutor.user.name}</h1>
          <p className="text-gray-500 dark:text-gray-300">{tutor.user.email}</p>
          <div className="flex flex-wrap gap-4 mt-2">
            <span className="bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-100 px-3 py-1 rounded-full font-medium">💰 ${tutor.pricePerHour}/hr</span>
            <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 px-3 py-1 rounded-full font-medium">🎓 {tutor.experience} yrs experience</span>
          </div>
        </div>
      </div>

      {/* About / Bio */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">About</h2>
        <p className="text-gray-700 dark:text-gray-300">{tutor.bio || "No bio provided."}</p>
      </div>

      {/* Categories / Subjects */}
      {tutor.categories.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Subjects</h2>
          <div className="flex flex-wrap gap-3">
            {tutor.categories.map((c: any) => (
              <span
                key={c.id}
                className="bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100 px-3 py-1 rounded-full font-medium"
              >
                {c.category.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Availability */}
      {tutor.availability.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Availability</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tutor.availability.map((slot: any) => (
              <div
                key={slot.id}
                className="border dark:border-gray-700 rounded-lg p-3 text-center hover:shadow-lg transition"
              >
                <p className="font-medium text-gray-900 dark:text-white">{slot.dayOfWeek}</p>
                <p className="text-gray-500 dark:text-gray-300">{slot.startTime} - {slot.endTime}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Student Reviews ({tutor.reviews.length})</h2>
        {tutor.reviews.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {tutor.reviews.map((review: any) => (
              <div key={review.id} className="flex items-center gap-4">
                <img
                  src={review.student.image || "/avatar.png"}
                  alt={review.student.name}
                  className="w-12 h-12 rounded-full object-cover border dark:border-gray-600"
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{review.student.name}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{review.comment}</p>
                  <p className="text-yellow-500 dark:text-yellow-400 text-sm mt-1">⭐ {review.rating}/5</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
