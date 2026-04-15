const Navbar = ({ user, onLogout }) => {
  return (
    <div className="flex justify-between items-center bg-white px-6 py-4 shadow">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">{user?.username}</span>

        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;