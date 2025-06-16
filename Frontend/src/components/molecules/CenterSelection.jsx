import { Dialog } from '@headlessui/react';
import { useState, Fragment } from 'react';
import { X } from 'lucide-react';
import Button from '../atoms/Button';

const mockCenters = [
  'City Documentation Hub',
  'EasyDocs Center',
  'Nearby Office Solutions',
  'Govt Facilitation Kiosk'
];

function CenterModal({ isOpen, onClose, documentName, onConfirm }) {
  const [selectedCenters, setSelectedCenters] = useState([]);

  const toggleCenter = (center) => {
    setSelectedCenters((prev) =>
      prev.includes(center)
        ? prev.filter((c) => c !== center)
        : [...prev, center]
    );
  };

  const handleConfirm = () => {
    onConfirm(selectedCenters);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} as={Fragment}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold" id="center-selection-title">Select Centers</h2>
            <button onClick={onClose} aria-label="Close Modal">
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="mb-4 text-sm text-gray-600">
            Select one or more centers for <strong>{documentName}</strong>
          </p>

          <div className="space-y-2 mb-6">
            {mockCenters.map((center) => (
              <label key={center} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedCenters.includes(center)}
                  onChange={() => toggleCenter(center)}
                  className="accent-green-600"
                />
                <span>{center}</span>
              </label>
            ))}
          </div>

          <Button
            text="Confirm Request"
            onClick={handleConfirm}
            disabled={selectedCenters.length === 0}
            className="w-full py-2 rounded-lg bg-primary-green text-black border"
          />
        </div>
      </div>
    </Dialog>
  );
}

export default CenterModal;
