export default function Navbar({ user, onLogout }: { user: any; onLogout: () => void }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
      <button
        onClick={onLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
