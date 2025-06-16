import React from 'react';
import Button from './Button';
const LoginModal= ({
  isOpen,
  onClose,
  onLogin
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Log in to book service</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        
        <p className="text-gray-700 text-sm mb-8">
          You must be logged in to book a service. Please log in to access available services.
        </p>
        
        <div className="flex justify-end gap-3">
          <Button 
            text="Cancel" 
            onClick={onClose}
            className="py-2 px-4 border border-gray-300 rounded-md text-md text-gray-700 hover:bg-gray-50"
          />
          <Button 
            text="Log In" 
            onClick={onLogin}
            className="py-2 px-4 bg-lime-400 rounded-md text-black text-md font-medium hover:bg-lime-500"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;