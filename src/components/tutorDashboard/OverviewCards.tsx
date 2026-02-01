export default function OverviewCards({ stats }: { stats: any }) {
  const cards = [
    { label: "Total Bookings", value: stats.totalBookings },
    { label: "Upcoming Sessions", value: stats.upcomingSessions },
    { label: "Average Rating", value: stats.averageRating },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
        >
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">{card.label}</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
