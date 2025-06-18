import React, { useState } from "react";
import { StatusBadge } from "../atoms/StatusBadge";
import Button from "../atoms/Button";
import ChatModal from "../pages/ChatModel";

export const AdminRequestCard = ({
  requestId,
  documentName,
  description,
  userName,
  status,
  price,
  onAcceptWithPrice,
  onCancel,
  onComplete,
  requiredDocuments = ['Aadhar Card', 'Passport Photo'],
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showPriceDialog, setShowPriceDialog] = useState(false);
  const [enteredPrice, setEnteredPrice] = useState('');

  const handleAccept = () => {
    setShowPriceDialog(true);
  };

  const confirmPrice = () => {
    onAcceptWithPrice(requestId, enteredPrice);
    setShowPriceDialog(false);
  };

  const renderActionButtons = () => {
    switch (status) {
      case "requested":
        return (
          <div className="flex gap-2">
            <Button text="Accept" onClick={handleAccept} className="flex-1 py-2 rounded-lg bg-green-500 text-white" />
            <Button text="Cancel" onClick={() => onCancel(requestId)} className="flex-1 py-2 border border-red-400 text-red-600" />
          </div>
        );

      case "waiting_for_document":
      case "waiting_for_payment":
        return (
          <div className="flex gap-2">
            <Button text="Open Chat" onClick={() => setIsChatOpen(true)} className="flex-1 py-2 rounded-lg" />
            <Button text="Cancel" onClick={() => onCancel(requestId)} className="flex-1 py-2 border border-red-400 text-red-600" />
          </div>
        );

      case "waiting_for_completion":
        return (
          <div className="flex gap-2">
            <Button text="Open Chat" onClick={() => setIsChatOpen(true)} className="flex-1 py-2 rounded-lg" />
            <Button text="Complete Request" onClick={() => onComplete(requestId)} className="flex-1 py-2 bg-blue-600 text-white rounded-lg" />
          </div>
        );

      case "finished":
      case "cancelled_by_user":
      case "cancelled_by_center":
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{documentName}</h2>
          <StatusBadge status={status} />
        </div>

        <p className="text-gray-600 mb-2 text-sm">{description}</p>
        <p className="text-sm text-gray-500 mb-4">Requested by: <span className="font-medium">{userName}</span></p>
        {price && <p className="text-sm text-gray-700 mb-2">Quoted Price: ₹{price}</p>}
      </div>

      {/* Bottom Buttons */}
      <div className="mt-auto pt-4">
        {renderActionButtons()}
      </div>

      {/* Chat Modal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        centerName="Admin"
        requiredDocuments={requiredDocuments}
        receiverId="665f3d7bc2d9e3d1f46b1001"
 currentUserId="665f3ddfc2d9e3d1f46b1008"
      />

      {/* Price Dialog */}
      {showPriceDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Enter Quoted Price</h3>
            <input
              type="number"
              value={enteredPrice}
              onChange={(e) => setEnteredPrice(e.target.value)}
              placeholder="e.g. 500"
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-end gap-3">
              <Button text="Cancel" onClick={() => setShowPriceDialog(false)} className="px-4 py-2 border rounded" />
              <Button text="Confirm" onClick={confirmPrice} className="px-4 py-2 bg-green-600 text-white rounded" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
