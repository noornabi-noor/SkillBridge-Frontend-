"use client";

export default function UserDetails({
  user,
  onClose,
}: {
  user: any;
  onClose: () => void;
}) {
  const isTutor = user.role === "TUTOR";

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-2xl p-6 shadow-xl">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold dark:text-white">
            User Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* BASIC USER INFO */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user.image || "/avatar.png"}
            className="w-20 h-20 rounded-full object-cover border dark:border-gray-700"
          />
          <div>
            <h3 className="text-lg font-semibold dark:text-white">
              {user.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              📞 {user.phone || "Not set"}
            </p>
          </div>
        </div>

        {/* META INFO */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Role</p>
            <p className="font-medium dark:text-white">{user.role}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Status</p>
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
                user.status === "ACTIVE"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
              }`}
            >
              {user.status}
            </span>
          </div>
        </div>

        {/* TUTOR EXTRA INFO */}
        {isTutor && user.tutorProfile && (
          <>
            <hr className="my-5 dark:border-gray-800" />

            <h3 className="text-md font-semibold mb-3 dark:text-white">
              Tutor Information
            </h3>

            <div className="space-y-3 text-sm">
              <p>
                <b>Bio:</b>{" "}
                <span className="text-gray-600 dark:text-gray-400">
                  {user.tutorProfile.bio || "—"}
                </span>
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Experience</p>
                  <p className="font-medium dark:text-white">
                    {user.tutorProfile.experience || 0} years
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 dark:text-gray-400">Price / hour</p>
                  <p className="font-medium dark:text-white">
                    ${user.tutorProfile.pricePerHour || 0}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 dark:text-gray-400">Total Bookings</p>
                  <p className="font-medium dark:text-white">
                    {user.tutorProfile.bookings.length || 0}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 dark:text-gray-400">Reviews</p>
                  <p className="font-medium dark:text-white">
                    {user.tutorProfile.totalReviews || 0}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 dark:text-gray-400">Rating</p>
                  <p className="font-medium dark:text-white">
                    ⭐ {user.tutorProfile.rating?.toFixed(1) || "0.0"}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}