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
import { BookOpenText, Home, Search, User } from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import React, { useState, type ReactNode } from 'react';
import Layout from './Layout';
import SettingsDialog from './SettingsDialog';

const VerticalIconContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center gap-y-3 w-full mt-12">{children}</div>
  );
};

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const segments = useSelectedLayoutSegments();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // State to handle sidebar collapse/expand

  const navLinks = [
    {
      icon: Home,
      href: '/',
      active: segments.length === 0 || segments.includes('c'),
      label: 'Home',
    },
    {
      icon: BookOpenText,
      href: '/library',
      active: segments.includes('library'),
      label: 'Library',
    },
    {
      icon: User, // Replace Search with User for Profile
      href: '/profile', // Update the href to the profile page
      active: segments.includes('profile'),
      label: 'Profile', // Update the label to Profile
    },
    // {
    //   icon: Search,
    //   href: '/discover',
    //   active: segments.includes('discover'),
    //   label: 'Discover',
    // },
  ];

  const mobileNavLinks = [
    {
      icon: Home,
      href: '/',
      active: segments.length === 0 || segments.includes('c'),
      label: 'Home',
    },
    {
      icon: Search,
      href: '/',
      active: segments.includes('New Search'),
      label: 'New Search',
    },
    {
      icon: User,
      href: '/profile',
      active: segments.includes('profile'),
      label: 'Profile',
    },
  ];

  return (
    <div>
      {/* Sidebar for large screens */}
      <div
        className={cn(
          'hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col',
          isCollapsed ? 'lg:w-20' : 'lg:w-40' // Toggle sidebar width
        )}
      >
        <div className="flex grow flex-col items-center justify-start gap-y-5 overflow-y-auto bg-light-secondary dark:bg-dark-secondary px-2 py-8">
          {/* Logo */}
          <a href="/">
            <img src="/path-to-your-logo.png" alt="Logo" className="h-8 w-auto mb-5" />
          </a>

          {/* SquarePen icon just below the logo */}
          <a href="/">
            <Search className="cursor-pointer mb-2" />
          </a>

          <VerticalIconContainer>
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={cn(
                  'relative flex flex-row items-center justify-center cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 duration-150 transition w-full py-2 rounded-lg',
                  link.active
                    ? 'text-black dark:text-white'
                    : 'text-black/70 dark:text-white/70',
                )}
              >
                <link.icon />
                {link.active && (
                  <div className="absolute right-0 -mr-2 h-full w-1 rounded-l-lg bg-black dark:bg-white" />
                )}
              </Link>
            ))}
          </VerticalIconContainer>

          {/* Settings */}
          {/* <Settings
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="cursor-pointer"
          /> */}

          {/* <SettingsDialog
            isOpen={isSettingsOpen}
            setIsOpen={setIsSettingsOpen}
          /> */}

          {/* Arrow to collapse the sidebar */}
          <div
            className="cursor-pointer mt-4"
            onClick={() => setIsCollapsed(!isCollapsed)} // Toggle collapse state
          >
            {isCollapsed ? (
              <span className="text-2xl">▶</span> // Right arrow for expanding
            ) : (
              <span className="text-2xl">◁</span> // Left arrow for collapsing
            )}
          </div>
        </div>
      </div>

      {/* Bottom navigation for small screens */}
      <div className="fixed bottom-0 w-full z-50 flex flex-row items-center gap-x-6 bg-light-primary dark:bg-dark-primary px-4 py-4 shadow-sm lg:hidden">
        {mobileNavLinks.map((link, i) => (
          link.label === 'New Search' ? (
            // Use <a> tag for SquarePen link
            <a
              href={link.href}
              key={i}
              className={cn(
                'relative flex flex-col items-center space-y-1 text-center w-full',
                link.active ? 'text-black dark:text-white' : 'text-black dark:text-white/70',
              )}
            >
              {link.active && (
                <div className="absolute top-0 -mt-4 h-1 w-full rounded-b-lg bg-black dark:bg-white" />
              )}
              <link.icon />
              <p className="text-xs">{link.label}</p>
            </a>
          ) : (
            // Use Link component for all other links
            <Link
              href={link.href}
              key={i}
              className={cn(
                'relative flex flex-col items-center space-y-1 text-center w-full',
                link.active ? 'text-black dark:text-white' : 'text-black dark:text-white/70',
              )}
            >
              {link.active && (
                <div className="absolute top-0 -mt-4 h-1 w-full rounded-b-lg bg-black dark:bg-white" />
              )}
              <link.icon />
              <p className="text-xs">{link.label}</p>
            </Link>
          )
        ))}
      </div>

      {/* Main content */}
      <Layout>{children}</Layout>
    </div>
  );
};

export default Sidebar;
