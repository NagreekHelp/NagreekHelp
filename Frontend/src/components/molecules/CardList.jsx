import React, { useState } from "react";
import SearchBar from "./SearchBar";

// Dummy card data
const dummyCards = [
  { id: 1, title: "Card One", description: "This is the first card." },
  { id: 2, title: "Card Two", description: "Second card description." },
  { id: 3, title: "Help Request", description: "Need help with issue." },
];

const CardList = () => {
  const [filteredCards, setFilteredCards] = useState(dummyCards);

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();

    const filtered = dummyCards.filter(
      (card) =>
        card.title.toLowerCase().includes(lowercasedQuery) ||
        card.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredCards(filtered);
  };

  return (
    <div className="p-4 space-y-4">
      <SearchBar onSearch={handleSearch} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <div
              key={card.id}
              className="p-4 border rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default CardList;
