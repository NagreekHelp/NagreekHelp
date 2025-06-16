import { X } from "lucide-react";
import { ReactNode, useState } from "react";
 

 
export const ToastMessage = ({ 
  icon, 
  title, 
  message, 
  type,
  onClose 
}) => {
  const [visible, setVisible] = useState(true);
 
  const styles = {
    success: {
      bg: "bg-light-lime-green",
      border: "border-dark-green",
      text: "text-black-700",
      iconBg: "bg-dark-green",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-400",
      text: "text-red-700",
      iconBg: "bg-red-600",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-400",
      text: "text-blue-700",
      iconBg: "bg-blue-600",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-400",
      text: "text-yellow-700",
      iconBg: "bg-yellow-600",
    },
  };
 
  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!visible) return null;
 
  return (
    <div
      className={`flex items-start justify-between rounded-md border px-2 lg:px-4 py-3 shadow-md w-full ${
        styles[type].bg
      } ${styles[type].border}`}
    >
      <div className="flex gap-2 lg:gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mt-1 ${styles[type].iconBg} text-white`}>
          {icon}
        </div>
        <div>
          <p className={` font-medium ${styles[type].text}`}>{title}</p>
          <p className={` font-light ${styles[type].text}`}>{message}</p>
        </div>
      </div>
      <button onClick={handleClose} className={`lg:ml-4 ${styles[type].text} cursor-pointer`}>
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
 
export default ToastMessage;