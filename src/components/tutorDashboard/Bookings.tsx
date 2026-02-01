export default function Bookings({ stats }: { stats: any }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Bookings</h2>

      {stats.bookings.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No bookings yet.</p>
      ) : (
        <ul className="space-y-2">
          {stats.bookings.map((b: any) => (
            <li
              key={b.id}
              className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <strong>{b.studentName || b.student?.name}</strong> -{" "}
              {new Date(b.date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
