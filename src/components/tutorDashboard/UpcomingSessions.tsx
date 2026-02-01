"use client";

export default function UpcomingSessions({ stats }: { stats: any }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-2">Upcoming Sessions</h2>
      {stats.upcomingSessionsList.length === 0 && <p>No upcoming sessions.</p>}
      <ul>
        {stats.upcomingSessionsList.map((b: any) => (
          <li key={b.id} className="border-b py-2">
            <div><strong>{b.student?.name}</strong></div>
            <div>{new Date(b.date).toLocaleDateString()} {b.startTime} - {b.endTime}</div>
            <div className="text-sm text-gray-500">Status: {b.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

