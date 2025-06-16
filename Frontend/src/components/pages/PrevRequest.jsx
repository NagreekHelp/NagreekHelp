import React, { useEffect, useState } from 'react';
import { AcceptedRequestCard } from '../atoms/AcceptedRequestCard';
import { mockPrevRequests } from '../../mock/PrevRequestdata';
function PrevRequest() {
    const [requests, setRequests] = useState([]);
    useEffect(() => {
  const fetchRequests = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5050/req/byUser', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setRequests(data);
  };

  fetchRequests();
}, []);

  const handleOpenChat = (id) => {
    console.log('Open chat for request:', id);
    // set modal visible, load messages etc.
  };

  const handleUploadDoc = (id) => {
    console.log('Upload document for request:', id);
    // trigger upload logic
  };

  const handlePayment = (id) => {
    console.log('Initiate payment for request:', id);
    // call payment logic
  };

  const handleCancel = (id) => {
    console.log('Cancel request:', id);
    // call cancellation API
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Your Previous Requests</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPrevRequests.map((req) => (
          <AcceptedRequestCard
            key={req.id}
            documentName={req.documentName}
            description={req.description}
            centerName={req.admin}
            status={req.status}
            price={req.price}
            onOpenChat={() => handleOpenChat(req.id)}
            onUploadDocument={() => handleUploadDoc(req.id)}
            onPay={() => handlePayment(req.id)}
            onCancel={() => handleCancel(req.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default PrevRequest;
