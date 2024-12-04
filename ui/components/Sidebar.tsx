// 'use client';

// import { cn } from '@/lib/utils';
// import { BookOpenText, Home, Search, SquarePen, Settings } from 'lucide-react';
// import Link from 'next/link';
// import { useSelectedLayoutSegments } from 'next/navigation';
// import React, { useState, type ReactNode } from 'react';
// import Layout from './Layout';
// import SettingsDialog from './SettingsDialog';

// const VerticalIconContainer = ({ children }: { children: ReactNode }) => {
//   return (
//     <div className="flex flex-col items-center gap-y-3 w-full">{children}</div>
//   );
// };

// const Sidebar = ({ children }: { children: React.ReactNode }) => {
//   const segments = useSelectedLayoutSegments();

//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);

//   const navLinks = [
//     {
//       icon: Home,
//       href: '/',
//       active: segments.length === 0 || segments.includes('c'),
//       label: 'Home',
//     },
//     {
//       icon: Search,
//       href: '/discover',
//       active: segments.includes('discover'),
//       label: 'Discover',
//     },
//     {
//       icon: BookOpenText,
//       href: '/library',
//       active: segments.includes('library'),
//       label: 'Library',
//     },
//   ];

//   return (
//     <div>
//       <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-20 lg:flex-col">
//         <div className="flex grow flex-col items-center justify-between gap-y-5 overflow-y-auto bg-light-secondary dark:bg-dark-secondary px-2 py-8">
//           <a href="/">
//             <SquarePen className="cursor-pointer" />
//           </a>
//           <VerticalIconContainer>
//             {navLinks.map((link, i) => (
//               <Link
//                 key={i}
//                 href={link.href}
//                 className={cn(
//                   'relative flex flex-row items-center justify-center cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 duration-150 transition w-full py-2 rounded-lg',
//                   link.active
//                     ? 'text-black dark:text-white'
//                     : 'text-black/70 dark:text-white/70',
//                 )}
//               >
//                 <link.icon />
//                 {link.active && (
//                   <div className="absolute right-0 -mr-2 h-full w-1 rounded-l-lg bg-black dark:bg-white" />
//                 )}
//               </Link>
//             ))}
//           </VerticalIconContainer>

//           <Settings
//             onClick={() => setIsSettingsOpen(!isSettingsOpen)}
//             className="cursor-pointer"
//           />

//           <SettingsDialog
//             isOpen={isSettingsOpen}
//             setIsOpen={setIsSettingsOpen}
//           />
//         </div>
//       </div>

//       <div className="fixed bottom-0 w-full z-50 flex flex-row items-center gap-x-6 bg-light-primary dark:bg-dark-primary px-4 py-4 shadow-sm lg:hidden">
//         {navLinks.map((link, i) => (
//           <Link
//             href={link.href}
//             key={i}
//             className={cn(
//               'relative flex flex-col items-center space-y-1 text-center w-full',
//               link.active
//                 ? 'text-black dark:text-white'
//                 : 'text-black dark:text-white/70',
//             )}
//           >
//             {link.active && (
//               <div className="absolute top-0 -mt-4 h-1 w-full rounded-b-lg bg-black dark:bg-white" />
//             )}
//             <link.icon />
//             <p className="text-xs">{link.label}</p>
//           </Link>
//         ))}
//       </div>

//       <Layout>{children}</Layout>
//     </div>
//   );
// };

// export default Sidebar;
'use client';

import { cn } from '@/lib/utils';
import { BookOpenText, Trash2, ChevronDown, ChevronRight, History } from 'lucide-react'; // Import History icon
import Link from 'next/link';
import React, { useEffect, useState, ReactNode } from 'react';

// Chat interface to type the chat object
interface Chat {
  id: string;
  title: string;
  createdAt: string;
}

// Component for vertically aligning icons
const VerticalIconContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col items-center gap-y-5 w-full mt-10">{children}</div>
);

// Sidebar component that manages chat display and interactions
const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [expandedDates, setExpandedDates] = useState<string[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showMoreMobile, setShowMoreMobile] = useState<boolean>(false); // Mobile "View More" state
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // State to manage dropdown visibility

  useEffect(() => {
    const fetchChats = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats`);
      const data = await res.json();
      setChats(data.chats);
    };
    fetchChats();
  }, []);

  const groupedChats = chats.reduce((acc: Record<string, Chat[]>, chat) => {
    const date = new Date(chat.createdAt).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(chat);
    return acc;
  }, {});

  const toggleDate = (date: string) => {
    setExpandedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  const deleteChat = async (chatId: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}`, { method: 'DELETE' });
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
  };

  const deleteChatsByDate = async (date: string) => {
    const chatsToDelete = groupedChats[date];
    await Promise.all(
      chatsToDelete.map((chat) =>
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats/${chat.id}`, { method: 'DELETE' })
      )
    );
    setChats((prev) => prev.filter((chat) => !chatsToDelete.includes(chat)));
  };

  const chatGroupsToDisplay = showMore
    ? Object.entries(groupedChats)
    : Object.entries(groupedChats).slice(0, 3);

  const chatGroupsToDisplayMobile = showMoreMobile
    ? Object.entries(groupedChats)
    : Object.entries(groupedChats).slice(0, 3);

  return (
    <div>
      {/* History Icon for Mobile Screens */}
      <div className="lg:hidden flex justify-end p-1 mt-4 m-2">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-gray-600 dark:text-white"
          aria-label="Open chat history"
        >
          <History size={18} /> {/* Increased icon size for better visibility */}
        </button>
      </div>

      {isDropdownOpen && (
        <div className="lg:hidden absolute right-1 top-19 w-50 max-h-85 overflow-y-auto p-1 bg-white dark:bg-gray-700 shadow-md  z-50 hide-scrollbar">
          {chatGroupsToDisplayMobile.map(([date, chatGroup]) => (
            <div key={date} className="mb-1">
              <div className="p-1 flex justify-between items-center bg-gray-100 dark:bg-gray-800 ">
                <div onClick={() => toggleDate(date)} className="flex items-center flex-1 cursor-pointer">
                  {expandedDates.includes(date) ? (
                    <ChevronDown size={14} className="mr-1 text-gray-500" />
                  ) : (
                    <ChevronRight size={14} className="mr-1 text-gray-500" />
                  )}
                  <div>
                    <h3 className="font-medium text-xs text-black dark:text-white">{chatGroup[0].title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
                  </div>
                </div>
                <Trash2
                  size={16}
                  className="text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={() => deleteChatsByDate(date)}
                />
              </div>
              {expandedDates.includes(date) && (
                <div className="mt-0 space-y-0">
                  {chatGroup.map((chat) => (
                    <div
                      key={chat.id}
                      className="p-1 flex justify-between items-center bg-gray-200 dark:bg-gray-900 "
                    >
                      <Link href={`/c/${chat.id}`} className="flex-1">
                        <h4 className="text-xs text-black dark:text-white truncate">{chat.title}</h4>
                      </Link>
                      <Trash2
                        size={14}
                        className="text-gray-500 hover:text-red-500 cursor-pointer"
                        onClick={() => deleteChat(chat.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-center items-center mt-1">
            <button
              onClick={() => setShowMoreMobile(!showMoreMobile)}
              className="text-xs text-blue-500 hover:underline"
            >
              {showMoreMobile ? 'View Less' : 'View More'}
            </button>
          </div>
        </div>
      )}

      {/* Sidebar for Larger Screens */}
      <div className="hidden lg:flex lg:fixed lg:inset-y-0 lg:right-0 lg:w-50 lg:flex-col lg:z-50 hide-scrollbar">
        <div className="flex flex-col h-full p-2 gap-y-6 overflow-y-auto mt-[-1]">
          <VerticalIconContainer>
            <div className="bg-[#e5e7e9] p-2 m-1 pt-0 rounded-lg shadow-lg">
              <div className="text-black dark:text-white">
                <h2 className="mt-2 text-black text-sm">Recents</h2>
              </div>
              <div className="flex flex-col gap-1">
                {chatGroupsToDisplay.map(([date, chatGroup]) => (
                  <div key={date}>
                    <div className="p-1 bg-white dark:bg-gray-700 flex justify-between items-center">
                      <div onClick={() => toggleDate(date)} className="flex items-center flex-1">
                        {expandedDates.includes(date) ? (
                          <ChevronDown size={15} className="mr-1 text-black-500" />
                        ) : (
                          <ChevronRight size={15} className="mr-1 text-black-500" />
                        )}
                        <div>
                          <h3 className="font-medium text-xs">{chatGroup[0].title}</h3>
                          <p className="text-xs text-black-500">{date}</p>
                        </div>
                      </div>
                      <Trash2
                        size={15}
                        className="text-gray-500 hover:text-red-500 cursor-pointer"
                        onClick={() => deleteChatsByDate(date)}
                      />
                    </div>
                    {expandedDates.includes(date) && (
                      <div className="mt-2 text-black">
                        {chatGroup.map((chat) => (
                          <div key={chat.id} className="p-1 flex justify-between items-center">
                            <Link href={`/c/${chat.id}`} className="flex-1">
                              <h4 className="text-xs truncate">{chat.title}</h4>
                            </Link>
                            <Trash2
                              size={12}
                              className="text-gray-500 hover:text-red-500 cursor-pointer"
                              onClick={() => deleteChat(chat.id)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center mt-1">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="text-xs text-blue-500 hover:underline"
                >
                  {showMore ? 'View Less' : 'View More'}
                </button>
              </div>
            </div>
          </VerticalIconContainer>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
