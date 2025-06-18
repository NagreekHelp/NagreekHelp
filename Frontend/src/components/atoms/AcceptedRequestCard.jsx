import React, { useState } from "react";
import { StatusBadge } from "../atoms/StatusBadge";
import Button from "../atoms/Button";
import ChatModal from "../pages/ChatModel";

export const AcceptedRequestCard = ({
  documentName,
  description,
  centerName,
  status,
  price,
  onOpenChat,
  onUploadDocument,
  onPay,
  onCancel,
  requiredDocuments = ['Aadhar Card', 'Passport Photo'] // ideally passed from props
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const renderActionButtons = () => {
    switch (status) {
      case "requested":
        return (
          <div className="flex gap-2">
            <Button
              text="Cancel Request"
              onClick={onCancel}
                className="flex-1 py-2 text-red-600 border border-red-400 rounded-lg"
            />
          </div>
        );
      case "waiting_for_document":
        return (
          <>
            <p className="text-sm text-gray-700 mb-2">Quoted Price: ₹{price}</p>
            <div className="flex gap-2">
              <Button
                text="Open Chat"
                onClick={() => setIsChatOpen(true)}
                className="flex-1 py-2 rounded-lg"
              />
              <Button
                text="Cancel Request"
                onClick={onCancel}
                className="flex-1 py-2 text-red-600 border border-red-400 rounded-lg"
              />
            </div>
          </>
        );

      case "waiting_for_payment":
        return (
          <>
            <p className="text-sm text-gray-700 mb-2">Amount Due: ₹{price}</p>
            <div className="flex gap-2">
              <Button
                text="Pay Now"
                onClick={onPay}
                className="flex-1 py-2 rounded-lg"
              />
              <Button
                text="Open Chat"
                onClick={() => setIsChatOpen(true)}
                className="flex-1 py-2 rounded-lg"
              />
            </div>
          </>
        );

      case "waiting_for_completion":
      
      case "finished":
        return (
          <div className="flex gap-2">
            <Button
              text="Open Chat"
              onClick={() => setIsChatOpen(true)}
              className="flex-1 py-2 rounded-lg"
            />
          </div>
        );

      case "cancelled_by_user":
      case "cancelled_by_center":
      default:
        return null;
    }
  };

  return (
  <div className="bg-white rounded-2xl shadow-md p-6 w-full h-full flex flex-col justify-between">
    {/* Top Section */}
    <div>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{documentName}</h2>
        <StatusBadge status={status} />
      </div>

      <p className="text-gray-600 mb-2 text-sm">{description}</p>
      <p className="text-sm text-gray-500 mb-4">
        Sent to: <span className="font-medium">{centerName}</span>
      </p>
    </div>

    {/* Bottom Buttons */}
    <div className="mt-auto pt-4">
      {renderActionButtons()}
    </div>

    {/* Chat Modal */}
    <ChatModal
      isOpen={isChatOpen}
      onClose={() => setIsChatOpen(false)}
      centerName={centerName}
      requiredDocuments={requiredDocuments}
   
      currentUserId="665f3d7bc2d9e3d1f46b1001"
      receiverId="665f3ddfc2d9e3d1f46b1008"
    />
  </div>
);

};
