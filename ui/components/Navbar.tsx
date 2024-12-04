import { useState } from 'react';
import { Edit } from 'lucide-react';
import { Message } from './ChatWindow';
import Link from 'next/link';

const Navbar = ({
  chatId,
  messages,
}: {
  messages: Message[];
  chatId: string;
}) => {
  const [title, setTitle] = useState<string>(''); // State for the title (if needed)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to handle modal visibility
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for the search input

  // Open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true); // Sets the modal visibility to true
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Sets the modal visibility to false
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Updates the search query as the user types
  };

  // Handle search submission (optional)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the default form submission behavior
    console.log('Search submitted:', searchQuery); // Logs the search query (can be replaced with actual search logic)
    handleCloseModal(); // Close the modal after submitting
  };

  return (
    <div
      className="fixed z-40 top-0 left-0 px-4 lg:pl-[104px] lg:pr-6 lg:px-8 flex flex-row items-center justify-between w-full sm:w-[60%] md:w-[70%] lg:w-[85%] py-3 text-sm text-black dark:text-white/70 border-b border-light-100 dark:border-dark-200 translate-x-[-10%] lg:translate-x-0"
    >
      {/* Logo and Text on the Left */}
      <div className="flex items-center space-x-2 ml-7">
        <Link href="/" className="flex items-center space-x-2">
          {/* Logo for larger screens */}
          <img
            src="/path-to-your-logo.png"
            alt="Logo"
            className="w-8 h-8 hidden lg:block" // Only show on large screens
          />
          {/* Logo for smaller screens */}
          <img
            src="/path-to-small-logo.png"
            alt="Logo"
            className="w-8 h-8 lg:hidden" // Only show on small screens
          />
        </Link>
      </div>

      {/* Search Bar in the Center */}
      <div className="flex flex-grow items-center justify-center ml-24">
        {/* Button to open the search modal */}
        <button
          onClick={handleOpenModal}
          className="w-full max-w-md p-1 border rounded-md text-sm text-center dark:bg-dark-primary dark:text-white"
        >
          New Search...
        </button>
      </div>

      {/* Modal for New Search */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-2 z-50" // Full-screen overlay with opacity
          onClick={handleCloseModal} // Close modal when clicking outside
        >
          <div
            className="bg-white p-6 rounded-md w-80"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <h2 className="text-xl font-semibold mb-4">New Search</h2>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Enter your search"
                className="w-full p-2 border rounded-md mb-4 text-sm dark:bg-dark-primary dark:text-white"
              />
              <div className="flex justify-end space-x-4">
                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 rounded-md text-sm"
                >
                  Cancel
                </button>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;




// import { Edit } from 'lucide-react';
// import { Message } from './ChatWindow';
// import { useEffect, useState, useRef } from 'react';
// import { formatTimeDifference } from '@/lib/utils';
// import TextareaAutosize from 'react-textarea-autosize';

// const Navbar = ({
//   chatId,
//   messages,
// }: {
//   messages: Message[];
//   chatId: string;
// }) => {
//   const [title, setTitle] = useState<string>('');
//   const [timeAgo, setTimeAgo] = useState<string>('');
//   const [searchText, setSearchText] = useState('');
//   const inputRef = useRef<HTMLTextAreaElement | null>(null);

//   useEffect(() => {
//     if (messages.length > 0) {
//       const newTitle =
//         messages[0].content.length > 20
//           ? `${messages[0].content.substring(0, 20).trim()}...`
//           : messages[0].content;
//       setTitle(newTitle);
//       const newTimeAgo = formatTimeDifference(
//         new Date(),
//         messages[0].createdAt,
//       );
//       setTimeAgo(newTimeAgo);
//     }
//   }, [messages]);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       if (messages.length > 0) {
//         const newTimeAgo = formatTimeDifference(
//           new Date(),
//           messages[0].createdAt,
//         );
//         setTimeAgo(newTimeAgo);
//       }
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, []);

//   // Handle the search logic when the user presses Enter
//   const handleSearch = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       // Perform the search with the searchText
//       console.log('Searching for:', searchText);
//       // Reset the search text after search
//       setSearchText('');
//     }
//   };

//   return (
//     <div className="fixed z-40 top-0 left-0 right-0 px-4 lg:pl-[104px] lg:pr-6 lg:px-8 flex flex-row items-center justify-between w-full py-4 text-sm text-black dark:text-white/70 border-b bg-light-primary dark:bg-dark-primary border-light-100 dark:border-dark-200">
      
//       {/* Logo and Text on the Left */}
//       <div className="flex items-center space-x-2">
//         <img src="/path-to-your-logo.png" alt="Logo" className="w-8 h-8" />
//         <span className="text-sm font-semibold">PotatoAI</span>
//       </div>

//       {/* Search Bar in the Center */}
//       <div className="flex flex-grow items-center justify-center mx-4">
//         <TextareaAutosize
//           ref={inputRef}
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           onKeyDown={handleSearch} // Listen for the Enter key
//           minRows={1}
//           maxRows={1} // Prevents resizing of the search bar
//           className="bg-transparent placeholder:text-black/50 dark:placeholder:text-white/50 text-sm text-black dark:text-white resize-none focus:outline-none w-full max-w-md text-center rounded-lg border border-light-200 dark:border-dark-200 py-2 px-4"
//           placeholder="Search"
//         />
//       </div>

//       {/* Other Navbar Items (Optional) */}
//       <div className="flex flex-row items-center space-x-4">
//         <a
//           href="/"
//           className="active:scale-95 transition duration-100 cursor-pointer lg:hidden"
//         >
//           <Edit size={17} />
//         </a>

//         <div className="hidden lg:flex flex-row items-center justify-center space-x-2">
//           {/* <Clock size={17} />
//           <p className="text-xs">{timeAgo} ago</p> */}
//         </div>

//         <div className="flex flex-row items-center space-x-4">
//           {/* Optional action buttons */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
