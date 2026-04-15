const StatusCard = ({ title, status }) => {
  const isActive =
    status === "ONLINE" || status === "CONNECTED";

  return (
    <div className="bg-white rounded-2xl shadow p-5 flex justify-between items-center w-64">
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p
          className={`text-lg font-bold ${
            isActive ? "text-green-500" : "text-red-500"
          }`}
        >
          {status}
        </p>
      </div>

      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full ${
          isActive ? "bg-green-100" : "bg-red-100"
        }`}
      >
        ●
      </div>
    </div>
  );
};

export default StatusCard;