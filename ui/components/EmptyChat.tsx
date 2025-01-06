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

  // Delay component mounting logic to ensure we are on the client side
  useEffect(() => {
    setIsMounted(true);
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
        <h2 className="text-black/70 dark:text-white/70 text-3xl font-medium -mt-8">
          PotatoAI
        </h2>
        <EmptyChatMessageInput
          sendMessage={sendMessage}
          focusMode={focusMode}
          setFocusMode={setFocusMode}
          optimizationMode={optimizationMode}
          setOptimizationMode={setOptimizationMode}
        />
      </div>
    </div>
  );
};

export default EmptyChat;
