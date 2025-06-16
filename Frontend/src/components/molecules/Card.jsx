// import { useState, useEffect } from "react";
// import Button from "../atoms/Button";

// function DocumentCard({ name, description, requiredDocuments }) {
//   const [checkedDocs, setCheckedDocs] = useState({});

//   useEffect(() => {
//     // Initialize all required docs as unchecked
//     const initialState = {};
//     requiredDocuments.forEach((doc) => {
//       initialState[doc] = false;
//     });
//     setCheckedDocs(initialState);
//   }, [requiredDocuments]);

//   const handleCheckboxChange = (docName) => {
//     setCheckedDocs((prev) => ({
//       ...prev,
//       [docName]: !prev[docName],
//     }));
//   };

//   const allDocsChecked =
//     Object.keys(checkedDocs).length === requiredDocuments.length &&
//     Object.values(checkedDocs).every((val) => val === true);

//   const handleRequest = () => {
//     alert(`Request submitted for: ${name}`);
//     // Add API or state logic here
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 max-w-md w-full">
//       <h4 className="text-xl font-semibold mb-2">{name}</h4>
//       <p className="text-gray-600 mb-4">{description}</p>

//       <div className="space-y-2 mb-4">
//         {requiredDocuments.map((doc) => (
//           <label key={doc} className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               checked={checkedDocs[doc] || false}
//               onChange={() => handleCheckboxChange(doc)}
//               className="accent-green-600"
//             />
//             <span className="text-gray-700">{doc}</span>
//           </label>
//         ))}
//       </div>

//       <Button
//         text="Make Request"
//         onClick={handleRequest}
//         disabled={!allDocsChecked}
//         className="w-full py-2 rounded-lg bg-primary-green text-black border"
//       />
//     </div>
//   );
// }

// export default DocumentCard;


import { useState, useEffect } from "react";
import Button from "../atoms/Button";
import CenterModal from "./CenterSelection";
function DocumentCard({ name, description, requiredDocuments }) {
  const [checkedDocs, setCheckedDocs] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const initialState = {};
    requiredDocuments.forEach((doc) => {
      initialState[doc] = false;
    });
    setCheckedDocs(initialState);
  }, [requiredDocuments]);

  const handleCheckboxChange = (docName) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [docName]: !prev[docName],
    }));
  };

  const allDocsChecked =
    Object.keys(checkedDocs).length === requiredDocuments.length &&
    Object.values(checkedDocs).every((val) => val === true);

  const handleRequestClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmCenters = async (selectedCenters) => {
  try {
    // Send one request per selected center
    const token = localStorage.getItem('token'); // Adjust this if you store JWT differently

    for (const centerId of selectedCenters) {
      await fetch('http://localhost:5050/req/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          admin: centerId,
          documentName: name,
          description,
        }),
      });
    }

    alert(`Request for "${name}" sent to:\n${selectedCenters.join(', ')}`);
    setIsModalOpen(false);
  } catch (error) {
    console.error('Error sending request:', error);
    alert('Failed to send request. Please try again.');
  }
};


  return (
    <>
      <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 max-w-md w-full">
        <h4 className="text-xl font-semibold mb-2">{name}</h4>
        <p className="text-gray-600 mb-4">{description}</p>

        <div className="space-y-2 mb-4">
          {requiredDocuments.map((doc) => (
            <label key={doc} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={checkedDocs[doc] || false}
                onChange={() => handleCheckboxChange(doc)}
                className="accent-green-600"
              />
              <span className="text-gray-700">{doc}</span>
            </label>
          ))}
        </div>

        <Button
          text="Make Request"
          onClick={handleRequestClick}
          disabled={!allDocsChecked}
          className="w-full py-2 rounded-lg bg-primary-green text-black border"
        />
      </div>

      <CenterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        documentName={name}
        onConfirm={handleConfirmCenters}
      />
    </>
  );
}

export default DocumentCard;
