"use client";

export default function UpcomingSessions({ stats }: { stats: any }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Upcoming Sessions
      </h2>

      {!stats?.upcomingSessionsList || stats.upcomingSessionsList.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No upcoming sessions found.</p>
      ) : (
        <ul className="space-y-2">
          {stats.upcomingSessionsList.map((b: any) => (
            <li
              key={b.id}
              className="p-2 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <div><strong>{b.student?.name}</strong></div>
              <div>
                {new Date(b.date).toLocaleDateString()} {b.startTime} - {b.endTime}
              </div>
              <div className={`text-sm font-medium ${
                b.status === "CONFIRMED"
                  ? "text-green-600 dark:text-green-400"
                  : b.status === "PENDING"
                  ? "text-yellow-600 dark:text-yellow-400"
                  : b.status === "CANCELLED"
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}>
                Status: {b.status}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
