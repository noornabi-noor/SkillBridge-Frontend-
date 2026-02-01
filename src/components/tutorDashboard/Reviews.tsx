export default function Reviews({ stats }: { stats: any }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-2">Reviews</h2>
      {stats.reviews.length === 0 && <p>No reviews yet.</p>}
      <ul>
        {stats.reviews.map((r: any) => (
          <li key={r.id}>
            {r.student?.name} - Rating: {r.rating} - {r.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}
