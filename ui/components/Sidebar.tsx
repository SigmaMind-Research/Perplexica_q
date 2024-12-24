// 'use client';

// import { cn } from '@/lib/utils';
// import { BookOpenText, Home, Search, User } from 'lucide-react';
// import Link from 'next/link';
// import { useSelectedLayoutSegments } from 'next/navigation';
// import React, { useState, type ReactNode } from 'react';
// import Layout from './Layout';
// import SettingsDialog from './SettingsDialog';

// const VerticalIconContainer = ({ children }: { children: ReactNode }) => {
//   return (
//     <div className="flex flex-col items-center gap-y-3 w-full mt-6">
//       {children}
//     </div>
//   );
// };

// const Sidebar = ({ children }: { children: React.ReactNode }) => {
//   const segments = useSelectedLayoutSegments();

//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false); // State to handle sidebar collapse/expand

//   const navLinks = [
//     {
//       icon: Home,
//       href: '/',
//       active: segments.length === 0 || segments.includes('c'),
//       label: 'Home',
//     },
//     {
//       icon: BookOpenText,
//       href: '/library',
//       active: segments.includes('library'),
//       label: 'Library',
//     },
//     {
//       icon: User,
//       href: '/profile',
//       active: segments.includes('profile'),
//       label: 'Profile',
//     },
//   ];

//   const mobileNavLinks = [
//     {
//       icon: Home,
//       href: '/',
//       active: segments.length === 0 || segments.includes('c'),
//       label: 'Home',
//     },
//     {
//       icon: Search,
//       href: '/',
//       active: segments.includes('New Search'),
//       label: 'New Search',
//     },
//     {
//       icon: User,
//       href: '/profile',
//       active: segments.includes('profile'),
//       label: 'Profile',
//     },
//   ];

//   return (
//     <div>
//       {/* Sidebar for large screens */}
//       <div
//         className={cn(
//           'hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col',
//           isCollapsed ? 'lg:w-20' : 'lg:w-40', // Toggle sidebar width
//         )}
//       >
//         <div className="flex grow flex-col items-center justify-start gap-y-5 overflow-y-auto bg-light-secondary dark:bg-dark-secondary px-2 py-8">
//           {/* Logo */}
//           <a
//             href="/"
//             className={cn(
//               'flex items-center', // Align items horizontally
//               isCollapsed ? 'justify-center flex-col' : 'flex-row', // Center align in collapsed, horizontal in expanded
//             )}
//           >
//             {/* Logo image */}
//             <img
//               src="/plogo.png"
//               className={cn(
//                 'transition-transform duration-300', // Smooth scaling
//                 isCollapsed
//                   ? 'w-24 h-24 mx-auto -mt-10'
//                   : 'w-20 h-20 -ml-14 -mt-8', // Center align only in collapsed state
//               )}
//             />
//             {/* Text beside the logo, only visible when sidebar is expanded */}
//             {!isCollapsed && (
//               <span className="text-sm text-black dark:text-white -ml-5 -mt-3">
//                 potato AI
//               </span>
//             )}
//           </a>

//           {/* Search icon just below the logo */}
//           {!isCollapsed && (
//             <a
//               href="/"
//               className="w-full px-4 py-2 mt-4 mb-2 border-2 border-grey-300 dark:border-black-700 rounded-full text-center text-sm text-black dark:text-white hover:border-[#2980b9]"
//             >
//               New Search
//             </a>
//           )}

//           {/* Keep the search icon for collapsed state */}
//           {isCollapsed && (
//             <a href="/">
//               <Search className="cursor-pointer mb-2" />
//             </a>
//           )}

//           <VerticalIconContainer>
//             {navLinks.map((link, i) => (
//               <Link
//                 key={i}
//                 href={link.href}
//                 className={cn(
//                   'relative flex flex-row items-center justify-start p-3 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 duration-150 transition w-full py-2 rounded-lg',
//                   link.active
//                     ? 'text-black dark:text-white'
//                     : 'text-black/70 dark:text-white/70',
//                 )}
//               >
//                 <link.icon />
//                 {!isCollapsed && (
//                   <span className="ml-3">{link.label}</span>
//                 )}
//                 {/* Show text only if not collapsed */}
//                 {link.active && (
//                   <div className="absolute right-0 h-full w-1 rounded-l-lg bg-black dark:bg-white" />
//                 )}
//               </Link>
//             ))}

//             {/* Conditionally render "Sign In" and "Log In" when sidebar is expanded */}
//             {!isCollapsed && (
//               <div className="mt-4 w-full">
//                 <a
//                   href="/signin"
//                   className="block w-full py-2 px-4 text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                 >
//                   Sign In
//                 </a>
//                 <a
//                   href="/login"
//                   className="block w-full mt-2 py-2 px-4 text-center bg-green-500 text-white rounded-lg hover:bg-green-600"
//                 >
//                   Log In
//                 </a>
//               </div>
//             )}
//           </VerticalIconContainer>

//           {/* Arrow to collapse the sidebar */}
//           {isCollapsed ? (
//             // Expand Arrow (Bottom Right)
//             <div
//               className="cursor-pointer absolute right-0 bottom-0 m-6 flex items-center justify-center w-10 h-10 rounded-full bg-black-700 shadow hover:bg-gray-900"
//               onClick={() => setIsCollapsed(false)} // Expand the sidebar
//             >
//               <span className="text-lg font-bold text-white">→|</span>
//             </div>
//           ) : (
//             // Collapse Arrow (Top Right)
//             <div
//               className="cursor-pointer absolute right-0 top-0 mt-7 m-1 flex items-center justify-center w-8 h-8 rounded-full bg-black-700 shadow hover:bg-gray-900"
//               onClick={() => setIsCollapsed(true)} // Collapse the sidebar
//             >
//               <span className="text-[10px] font-bold text-white">|←</span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Bottom navigation for small screens */}
//       <div className="fixed bottom-0 w-full z-50 flex flex-row items-center gap-x-6 bg-light-primary dark:bg-dark-primary px-4 py-4 shadow-sm lg:hidden">
//         {mobileNavLinks.map((link, i) =>
//           link.label === 'New Search' ? (
//             <a
//               href={link.href}
//               key={i}
//               className={cn(
//                 'relative flex flex-col items-center space-y-1 text-center w-full',
//                 link.active
//                   ? 'text-black dark:text-white'
//                   : 'text-black dark:text-white/70',
//               )}
//             >
//               {link.active && (
//                 <div className="absolute top-0 -mt-4 h-1 w-full rounded-b-lg bg-black dark:bg-white" />
//               )}
//               <link.icon />
//               <p className="text-xs">{link.label}</p>
//             </a>
//           ) : (
//             <Link
//               href={link.href}
//               key={i}
//               className={cn(
//                 'relative flex flex-col items-center space-y-1 text-center w-full',
//                 link.active
//                   ? 'text-black dark:text-white'
//                   : 'text-black dark:text-white/70',
//               )}
//             >
//               {link.active && (
//                 <div className="absolute top-0 -mt-4 h-1 w-full rounded-b-lg bg-black dark:bg-white" />
//               )}
//               <link.icon />
//               <p className="text-xs">{link.label}</p>
//             </Link>
//           ),
//         )}
//       </div>

//       {/* Main content */}
//       <Layout>{children}</Layout>
//     </div>
//   );
// };

// export default Sidebar;

// 'use client';

// import { cn } from '@/lib/utils';
// import { BookOpenText, Home, Search, User } from 'lucide-react';
// import Link from 'next/link';
// import { useSelectedLayoutSegments } from 'next/navigation';
// import React, { useState, type ReactNode } from 'react';
// import Layout from './Layout';
// import SettingsDialog from './SettingsDialog';

// const VerticalIconContainer = ({ children }: { children: ReactNode }) => {
//   return (
//     <div className="flex flex-col items-center gap-y-3 w-full mt-6">
//       {children}
//     </div>
//   );
// };

// const Sidebar = ({ children }: { children: React.ReactNode }) => {
//   const segments = useSelectedLayoutSegments();

//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false); // State to handle sidebar collapse/expand

//   const navLinks = [
//     {
//       icon: Home,
//       href: '/',
//       active: segments.length === 0 || segments.includes('c'),
//       label: 'Home',
//     },
//     {
//       icon: BookOpenText,
//       href: '/library',
//       active: segments.includes('library'),
//       label: 'Library',
//     },
//   ];

//   const mobileNavLinks = [
//     {
//       icon: Home,
//       href: '/',
//       active: segments.length === 0 || segments.includes('c'),
//       label: 'Home',
//     },
//     // {
//     //   icon: Search,
//     //   href: '/',
//     //   active: segments.includes('New Search'),
//     //   label: 'New Search',
//     // },
//   ];

//   return (
//     <div>
//       {/* Sidebar for large screens */}
//       <div
//         className={cn(
//           'hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col',
//           isCollapsed ? 'lg:w-20' : 'lg:w-40', // Toggle sidebar width
//         )}
//       >
//         <div className="flex grow flex-col items-center justify-start gap-y-5 overflow-y-auto bg-light-secondary dark:bg-dark-secondary px-2 py-8">
//           {/* Logo */}
//           <a
//             href="/"
//             className={cn(
//               'flex items-center', // Align items horizontally
//               isCollapsed ? 'justify-start flex-col' : 'flex-row', // Center align in collapsed, horizontal in expanded
//             )}
//           >
//             {/* Logo image */}
//             <img
//               src="/plogo.png"
//               className={cn(
//                 'transition-transform duration-300 object-contain', // Smooth scaling
//                 isCollapsed
//                   ? 'w-20 h-20 mx-auto -mt-8' // Increased size for collapsed state
//                   : 'w-20 h-20 -ml-12 -mt-8', // Normal size for expanded state
//               )}
//               alt="Logo"
//             />
//             {/* Text beside the logo, only visible when sidebar is expanded */}
//             {!isCollapsed && (
//               <span
//                 className={cn(
//                   'text-base font-dancing text-black dark:text-white -ml-5 -mt-1', // Cursive font and small size
//                   'italic font-light tracking-wide', // Italic, thin, and spaced
//                 )}
//               >
//                 Potato AI
//               </span>
//             )}
//           </a>

//           {/* Search icon just below the logo */}
//           {!isCollapsed && (
//             <a
//               href="/"
//               className="w-full px-4 py-2 mt-4 mb-2 border-2 border-grey-300 dark:border-black-700 rounded-full text-center text-sm text-black dark:text-white hover:border-[#2980b9]"
//             >
//               New Search
//             </a>
//           )}

//           {/* Keep the search icon for collapsed state */}
//           {isCollapsed && (
//             <a href="/">
//               <Search className="cursor-pointer mb-2 mr-4 " />
//             </a>
//           )}

//           <VerticalIconContainer>
//             {navLinks.map((link, i) => (
//               <Link
//                 key={i}
//                 href={link.href}
//                 className={cn(
//                   'relative flex flex-row items-center justify-start p-3 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 duration-150 transition w-full py-2 rounded-lg',
//                   link.active
//                     ? 'text-black dark:text-white'
//                     : 'text-black/70 dark:text-white/70',
//                 )}
//               >
//                 <link.icon />
//                 {!isCollapsed && <span className="ml-3">{link.label}</span>}
//                 {/* Show text only if not collapsed */}
//                 {link.active && (
//                   <div className="absolute right-0 h-full w-1 rounded-l-lg bg-black dark:bg-white" />
//                 )}
//               </Link>
//             ))}
//           </VerticalIconContainer>

//           {/* Conditionally render "Sign In" and "Log In" buttons at the bottom when expanded */}
//           {!isCollapsed && (
//             <div className="mt-auto w-full">
//               <a
//                 href="/auth"
//                 className="block w-full py-2 px-4 text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 Sign Up
//               </a>
//               <a
//                 href="/auth"
//                 className="block w-full mt-2 py-2 px-4 text-center bg-green-500 text-white rounded-lg hover:bg-green-600"
//               >
//                 Log In
//               </a>
//             </div>
//           )}

//           {/* User Icon only when collapsed */}
//           {isCollapsed && (
//             <div className="-mt-1 mr-4">
//               <a
//                 href="/auth"
//                 className="cursor-pointer text-black dark:text-white"
//               >
//                 <User />
//               </a>
//             </div>
//           )}

//           {/* Arrow to collapse the sidebar */}
//           {isCollapsed ? (
//             <div
//               className="cursor-pointer absolute right-0 bottom-0 m-6 flex items-center justify-center w-10 h-10 rounded-full bg-black-700 shadow hover:bg-gray-900"
//               onClick={() => setIsCollapsed(false)} // Expand the sidebar
//             >
//               <span className="text-lg font-bold text-white">→|</span>
//             </div>
//           ) : (
//             <div
//               className="cursor-pointer absolute right-0 top-0 mt-7 m-1 flex items-center justify-center w-8 h-8 rounded-full bg-black-700 shadow hover:bg-gray-900"
//               onClick={() => setIsCollapsed(true)} // Collapse the sidebar
//             >
//               <span className="text-[10px] font-bold text-white">|←</span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Bottom navigation for small screens */}
//       <div className="fixed bottom-0 w-full z-50 flex justify-center gap-x-20 bg-light-primary dark:bg-dark-primary px-2 py-2 shadow-sm lg:hidden">
//         {mobileNavLinks.map((link, i) => (
//           <Link
//             href={link.href}
//             key={i}
//             className={cn(
//               'relative flex flex-col items-center space-y-1 text-center',
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

//         {/* New Search Icon wrapped in an <a> tag */}
//         <a
//           href="/"
//           className="flex flex-col items-center space-y-1 text-center"
//         >
//           <Search className="text-xl text-black dark:text-white" />
//           <span className="text-xs text-black dark:text-white">New Search</span>
//         </a>

//         {/* User Icon with text Profile in mobile view */}
//         <div className="flex flex-col items-center space-y-1">
//           <a href="/auth" className="text-center cursor-pointer">
//             <User className="text-xl text-black dark:text-white" />
//             <span className="text-xs text-black dark:text-white">Profile</span>
//           </a>
//         </div>
//       </div>

//       {/* Main content */}
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
import React, { useState, useEffect, type ReactNode } from 'react';
import Layout from './Layout';
import SettingsDialog from './SettingsDialog';

import { createClient } from '@/utils/supabase/client'; // import to fetch user data

const VerticalIconContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center gap-y-3 w-full mt-6">
      {children}
    </div>
  );
};
const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const segments = useSelectedLayoutSegments();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // State to handle sidebar collapse/expand
  const [user, setUser] = useState<any>(null); // User state to store logged-in user

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const supabase = createClient();
  //     const { data, error } = await supabase.auth.getUser();
  //     if (data?.user) {
  //       setUser(data.user);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError || !sessionData?.session) {
        // Handle cases where the session is invalid or not available
        // console.error("Session not found or expired");
        setUser(null);
        return;
      }

      const user = sessionData.session.user;
      if (user) {
        setUser(user);
      }
    };

    fetchUser();
  }, []);

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
  ];

  const mobileNavLinks = [
    {
      icon: Home,
      href: '/',
      active: segments.length === 0 || segments.includes('c'),
      label: 'Home',
    },
  ];

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut(); // Sign out the user
    setUser(null); // Reset user state
  };

  return (
    <div>
      {/* Sidebar for large screens */}
      <div
        className={cn(
          'hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col',
          isCollapsed ? 'lg:w-20' : 'lg:w-40', // Toggle sidebar width
        )}
      >
        <div className="flex grow flex-col items-center justify-start gap-y-5 overflow-y-auto bg-light-secondary dark:bg-dark-secondary px-2 py-8">
          {/* Logo */}
          <a
            href="/"
            className={cn(
              'flex items-center', // Align items horizontally
              isCollapsed ? 'justify-start flex-col' : 'flex-row', // Center align in collapsed, horizontal in expanded
            )}
          >
            <img
              src="/plogo.png"
              className={cn(
                'transition-transform duration-300 object-contain', // Smooth scaling
                isCollapsed
                  ? 'w-20 h-20 mx-auto -mt-8' // Increased size for collapsed state
                  : 'w-20 h-20 -ml-12 -mt-8', // Normal size for expanded state
              )}
              alt="Logo"
            />
            {!isCollapsed && (
              <span
                className={cn(
                  'text-base font-dancing text-black dark:text-white -ml-5 -mt-1',
                  'italic font-light tracking-wide',
                )}
              >
                Potato AI
              </span>
            )}
          </a>

          {/* New Search Button */}
          {!isCollapsed && (
            <a
              href="/"
              className="w-full px-4 py-2 mt-4 mb-2 border-2 border-grey-300 dark:border-black-700 rounded-full text-center text-sm text-black dark:text-white hover:border-[#2980b9]"
            >
              New Search
            </a>
          )}
          {isCollapsed && (
            <a href="/">
              <Search className="cursor-pointer mb-2 mr-4 " />
            </a>
          )}

          <VerticalIconContainer>
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={cn(
                  'relative flex flex-row items-center justify-start p-3 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 duration-150 transition w-full py-2 rounded-lg',
                  link.active
                    ? 'text-black dark:text-white'
                    : 'text-black/70 dark:text-white/70',
                )}
              >
                <link.icon />
                {!isCollapsed && <span className="ml-3">{link.label}</span>}
                {link.active && (
                  <div className="absolute right-0 h-full w-1 rounded-l-lg bg-black dark:bg-white" />
                )}
              </Link>
            ))}
          </VerticalIconContainer>

          {/* User Icon only when collapsed */}
          {isCollapsed && (
            <div className="-mt-1 mr-4">
              <a
                href="/login"
                className="cursor-pointer text-black dark:text-white"
              >
                <User />
              </a>
            </div>
          )}

          <div className="mt-auto w-full">
            {user ? (
              <div className="w-full flex items-center justify-center gap-3">
                {/* Expanded state: Show email in pill-shaped button */}
                {!isCollapsed ? (
                  <div className="flex flex-col items-center">
                  <button
  onClick={() => (window.location.href = '/dashboard')}
  className="text-black dark:text-white mb-2 px-4 py-2 bg-blue-500 rounded-full text-sm hover:bg-blue-600"
>
  {user.email.length > 13
    ? `${user.email.slice(0, 13)}...`
    : user.email}
</button>

                  </div>
                ) : (
                  // Collapsed state: Show avatar
                  <div
                    className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer"
                    title={user.email}
                  >
                    {user.email[0].toUpperCase()}
                  </div>
                )}
              </div>
            ) : (
              // Show "Sign In" and "Log In" only when expanded
              !isCollapsed && (
                <div className="mt-4 w-full">
                  <a
                    href="/login"
                    className="block w-full py-2 px-4 text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Sign In
                  </a>
                  <a
                    href="/login"
                    className="block w-full mt-2 py-2 px-4 text-center bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Log In
                  </a>
                </div>
              )
            )}
          </div>

          {/* Collapse/Expand Sidebar Button */}
          {isCollapsed ? (
            <div
              className="cursor-pointer absolute right-0 bottom-0 m-6 flex items-center justify-center w-10 h-10 rounded-full bg-black-700 shadow hover:bg-gray-900"
              onClick={() => setIsCollapsed(false)} // Expand the sidebar
            >
              <span className="text-lg font-bold text-white">→|</span>
            </div>
          ) : (
            <div
              className="cursor-pointer absolute right-0 top-0 mt-7 m-1 flex items-center justify-center w-8 h-8 rounded-full bg-black-700 shadow hover:bg-gray-900"
              onClick={() => setIsCollapsed(true)} // Collapse the sidebar
            >
              <span className="text-[10px] font-bold text-white">|←</span>
            </div>
          )}
        </div>
      </div>
      {/* Bottom navigation for small screens */}
      <div className="fixed bottom-0 w-full z-50 flex justify-center gap-x-20 bg-light-primary dark:bg-dark-primary px-2 py-2 shadow-sm lg:hidden">
        {mobileNavLinks.map((link, i) => (
          <Link
            href={link.href}
            key={i}
            className={cn(
              'relative flex flex-col items-center space-y-1 text-center',
              link.active
                ? 'text-black dark:text-white'
                : 'text-black dark:text-white/70',
            )}
          >
            {link.active && (
              <div className="absolute top-0 -mt-4 h-1 w-full rounded-b-lg bg-black dark:bg-white" />
            )}
            <link.icon />
            <p className="text-xs">{link.label}</p>
          </Link>
        ))}
        <a
          href="/"
          className="flex flex-col items-center space-y-1 text-center"
        >
          <Search className="text-xl text-black dark:text-white" />
          <span className="text-xs text-black dark:text-white">New Search</span>
        </a>
        <div className="flex flex-col items-center space-y-1">
          {user ? (
            // Display user email initial when logged in
            <div
              onClick={() => (window.location.href = '/dashboard')}
              className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer"
              title={user.email}
            >
              {user?.email ? (
  <div
    className="user-email"
    title={user.email}
  >
    {user.email[0]?.toUpperCase()}
  </div>
) : (
  // Show "Profile" icon when not logged in
  <div className="profile-icon">
    Profile
  </div>
)}

            </div>
          ) : (
            // Show "Profile" icon when not logged in
            <a href="/login" className="text-center cursor-pointer">
              <User className="text-xl text-black dark:text-white" />
              <span className="text-xs text-black dark:text-white">
                Profile
              </span>
            </a>
          )}
        </div>
      </div>

      {/* Main content */}
      <Layout>{children}</Layout>
    </div>
  );
};

export default Sidebar;