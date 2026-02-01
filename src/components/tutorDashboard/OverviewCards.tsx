export default function OverviewCards({ stats }: { stats: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Total Bookings</h3>
        <p className="text-2xl">{stats.totalBookings}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Upcoming Sessions</h3>
        <p className="text-2xl">{stats.upcomingSessions}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Average Rating</h3>
        <p className="text-2xl">{stats.averageRating}</p>
      </div>
    </div>
  );
}
