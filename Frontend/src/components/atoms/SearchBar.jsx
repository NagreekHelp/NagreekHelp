// import { useState } from "react";
// import Input from "../atoms/Input";
// import Button from "../atoms/Button";

// const SearchBar = ({ onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSearch = () => {
//     onSearch(searchTerm);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleSearch();
//   };

//   return (
//     <div className="flex w-full gap-2 items-end">
//       <Input
//         label="Search"
//         placeholder="Type to search..."
//         value={searchTerm}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyPress}
//         exampleText="Search by title, description etc."
//       />
//       <Button
//         text="Search"
//         onClick={handleSearch}
//         className="bg-green-600 text-white px-4 py-2 rounded-lg"
//       />
//     </div>
//   );
// };

// export default SearchBar;


import Input from './Input';

function SearchBar({ search, setSearch }) {
  return (
    <div className="w-full max-w-md mx-auto my-4">
      <Input
        label="Search Documents"
        placeholder="Type to search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
