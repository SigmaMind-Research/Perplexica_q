// import { Settings, Library, History } from 'lucide-react';
// import EmptyChatMessageInput from './EmptyChatMessageInput';
// import SettingsDialog from './SettingsDialog';

// import { useState } from 'react';
// import Link from 'next/link';

// const EmptyChat = ({
//   sendMessage,
//   focusMode,
//   setFocusMode,
//   optimizationMode,
//   setOptimizationMode,
// }: {
//   sendMessage: (message: string) => void;
//   focusMode: string;
//   setFocusMode: (mode: string) => void;
//   optimizationMode: string;
//   setOptimizationMode: (mode: string) => void;
// }) => {
//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);

//   return (
//     <div className="relative">
//       {/* Logo visible only on mobile screens and positioned in the left corner */}
//       <a href="/" className="absolute left-0 top-2 lg:hidden">
//   <img src="/plogo.png" alt="" className="h-14 w-auto mb-0 -ml-2" />
// </a>

//       <div className="absolute w-full flex flex-row items-center justify-end mr-5 mt-5">
//         {/* settings */}
//         {/* <Settings
//           className="cursor-pointer lg:hidden"
//           onClick={() => setIsSettingsOpen(true)}
//         /> */}

//         {/* history */}
//         <Link
//           href="/library"
//           className="flex flex-row items-center space-x-4 p-1 lg:hidden mt-[-4px]"
//         >
//           <History
//             size={17}
//             className="active:scale-95 transition duration-100 cursor-pointer"
//           />
//         </Link>
//       </div>
//       <div className="flex flex-col items-center justify-center min-h-screen max-w-screen-sm mx-auto p-2 space-y-8">
//         <h2 className="text-black/70 dark:text-white/70 text-3xl font-medium -mt-8">
//           PotatoAI
//         </h2>
//         <EmptyChatMessageInput
//           sendMessage={sendMessage}
//           focusMode={focusMode}
//           setFocusMode={setFocusMode}
//           optimizationMode={optimizationMode}
//           setOptimizationMode={setOptimizationMode}
//         />
//       </div>
//     </div>
//   );
// };

// export default EmptyChat;

import { Settings, Library, History } from 'lucide-react';
import EmptyChatMessageInput from './EmptyChatMessageInput';
import SettingsDialog from './SettingsDialog';
import { useState, useEffect, useCallback } from 'react';
import { getSessionAndUser } from '@/lib/sessionService'; // Import the session check service

const EmptyChat = ({
  sendMessage,
  focusMode,
  setFocusMode,
  optimizationMode,
  setOptimizationMode,
}: {
  sendMessage: (message: string, userId: string) => void;
  focusMode: string;
  setFocusMode: (mode: string) => void;
  optimizationMode: string;
  setOptimizationMode: (mode: string) => void;
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // State to track mounting of component

  // Predefined trending questions
  const allTrendingQuestions = [
    "What is the latest technology in AI?",
    "How to improve coding skills?",
    "What are the top programming languages of 2025?",
    "How to start a career in data science?",
    "What are the benefits of learning JavaScript?",
    "What is the future of blockchain?",
    "How to create a successful startup?",
    "What are the best practices for web development?",
    "How to ace coding interviews?",
  ];

  const [trendingQuestions, setTrendingQuestions] = useState<string[]>([]);

  // Shuffle array and select three random questions
  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 3);
  };

  // Ensure we are on the client side
  useEffect(() => {
    setIsMounted(true);
    setTrendingQuestions(shuffleArray(allTrendingQuestions));
  }, []);

  // Function to handle redirection if the user is not authenticated
  const handleHistoryClick = useCallback(async () => {
    if (!isMounted) return; // Ensure this runs only on the client side

    const { session, user } = await getSessionAndUser();

    if (!session || !user || user?.is_anonymous) {
      // If not authenticated, redirect to login page
      window.location.href = '/login'; // Use window.location for navigation
    } else {
      // If authenticated, navigate to the library
      window.location.href = '/library'; // Use window.location for navigation
    }
  }, [isMounted]);

  // Avoid rendering the part of the component that needs useRouter until mounted
  if (!isMounted) {
    return null; // Optionally return a loading spinner or something else until the component is mounted
  }

  // Function to handle clicking on a trending question
  const handleTrendingQuestionClick = (question: string) => {
    sendMessage(question, 'userId'); // Trigger the sendMessage function with the question
  };

  return (
    <div className="relative">
      {/* Logo visible only on mobile screens and positioned in the left corner */}
      <a href="/" className="absolute left-0 top-2 lg:hidden">
        <img src="/plogo.png" alt="" className="h-14 w-auto mb-0 -ml-2" />
      </a>

      <div className="absolute w-full flex flex-row items-center justify-end mr-5 mt-5">
        {/* settings */}
        {/* <Settings
          className="cursor-pointer lg:hidden"
          onClick={() => setIsSettingsOpen(true)}
        /> */}

        {/* history button with click handler */}
        <div
          onClick={handleHistoryClick}
          className="flex flex-row items-center space-x-4 p-1 lg:hidden mt-[-4px] cursor-pointer"
        >
          <History
            size={17}
            className="active:scale-95 transition duration-100"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen max-w-screen-sm mx-auto p-2 space-y-8">
        {/* <h2 className="text-black/70 dark:text-white/70 text-3xl font-medium -mt-8"> */}
          {/* PotatoAI */}
        {/* </h2> */}
        {/* Image */}
        <img
          src="/26.png"
          alt="Republic Day"
          className="w-20 h-20 object-contain -mt-8"
        />

        {/* Styled H3 */}
        <h5 className="text-2xl text-white tracking-wide">
          Happy Republic Day
        </h5>
        <EmptyChatMessageInput
          sendMessage={sendMessage}
          focusMode={focusMode}
          setFocusMode={setFocusMode}
          optimizationMode={optimizationMode}
          setOptimizationMode={setOptimizationMode}
        />

        {/* Trending Questions Section */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {trendingQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleTrendingQuestionClick(question)}
              className="bg-[#212121] text-sm text-grey-500 font-small py-1 px-2 rounded-md shadow-sm border border-light-200 dark:border-dark-200 flex-shrink-0 hover:border-grey-400 dark:hover:border-grey-600 hover:bg-grey-700 dark:hover:bg-grey-900 hover:scale-105 hover:text-md transition-all duration-200"
              style={{ maxWidth: 'calc(100% - 16px)' }} // Ensure it fits within the container
            >
              {question}
            </button>
          ))}
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-gray-600">Backed by</p>
          <a href="https://www.microsoft.com/en-us/startups" className="mt-6">
            <img src="/MSL.png" alt="Logo" className="h-14 w-auto mx-auto" />
          </a>
        </div>  
      </div>
    </div>
  );
};

export default EmptyChat;
