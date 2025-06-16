import { useState } from 'react';
import SearchBar from '../atoms/SearchBar';
import DocumentCard from '../molecules/Card';
import { mockDocuments } from '../../mock/DocumentCard';

function UserHome() {
  const [search, setSearch] = useState('');

  const filteredDocuments = mockDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <SearchBar search={search} setSearch={setSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              name={doc.name}
              description={doc.description}
              requiredDocuments={doc.requiredDocuments}
            />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full mt-10">No documents found.</p>
        )}
      </div>
    </div>
  );
}

export default UserHome;
