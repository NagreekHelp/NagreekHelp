export const StatusBadge = ({ status }) => {
  const statusMap = {
    requested: ["Requested", "bg-blue-400"],
    waiting_for_document: ["Waiting for Document", "bg-yellow-400"],
    waiting_for_completion: ["Waiting for Completion", "bg-purple-400"],
    waiting_for_payment: ["Waiting for Payment", "bg-orange-400"],
    finished: ["Finished", "bg-green-500"],
    cancelled_by_user: ["Cancelled by User", "bg-red-500"],
    cancelled_by_center: ["Cancelled by Center", "bg-red-400"],
  };

  const [label, color] = statusMap[status] || ["Unknown", "bg-gray-300"];

  return (
    <span className={`inline-block ${color} text-white py-1 px-3 rounded-full text-sm whitespace-nowrap`}>
      {label}
    </span>
  );
};
