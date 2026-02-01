export default function Bookings({ stats }: { stats: any }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-2">Bookings</h2>
      {stats.bookings.length === 0 && <p>No bookings yet.</p>}
      <ul>
        {stats.bookings.map((b: any) => (
          <li key={b.id}>
            {b.studentName || b.student?.name} - {new Date(b.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
