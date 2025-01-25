// 'use client';
// import { useEffect, useState } from 'react';
// import { createClient } from '@/utils/supabase/client'; // Supabase client import

// const Account = () => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch user data after component mounts
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const supabase = createClient();
//         const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

//         if (sessionError) {
//           setError(sessionError.message);
//           setUser(null);
//           setLoading(false);
//           return;
//         }

//         if (sessionData?.session) {
//           setUser(sessionData.session.user);
//         } else {
//           setUser(null);
//         }
//       } catch (err) {
//         setError('Failed to fetch user data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   // Handle user logout
//   const handleLogout = async () => {
//     try {
//       const supabase = createClient();
//       await supabase.auth.signOut();
//       setUser(null);
//     } catch (err) {
//       setError('Logout failed.');
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="account-page">
//       {error && <p className="text-red-500">{error}</p>}

//       {user ? (
//         <div className="account-info">
//           <div className="avatar">
//             {user?.email?.charAt(0).toUpperCase()}
//           </div>
//           <h2>Username: {user?.email.split('@')[0]}</h2>
//           <p>Email: {user?.email}</p>
//           <p>Status: Active account</p>
//           <p>You are signed in as {user?.email.split('@')[0]}</p>
//           <button onClick={handleLogout}>Sign Out</button>
//         </div>
//       ) : (
//         <p>No user data found or session expired.</p>
//       )}
//     </div>
//   );
// };

// export default Account;

import { useEffect, useState } from 'react';
import ChatModel from './ChatModel';

import { createClient } from '@/utils/supabase/client'; // Supabase client import
import { useRouter } from 'next/navigation';
import Navbar from './Navbar'; // Import the Navbar component

const Account = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isChatModelOpen, setIsChatModelOpen] = useState(false);

  // Fetch user data after component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = createClient();
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) {
          setError(sessionError.message);
          setUser(null);
          setLoading(false);
          return;
        }

        if (sessionData?.session) {
          setUser(sessionData.session.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle user logout and redirect to the sidebar
  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setUser(null); // Clear user on logout
      window.location.href = '/'; // Change this to the correct path for your sidebar
    } catch (err) {
      setError('Logout failed.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="account-page flex items-center justify-center min-h-screen ">
      {/* Navbar */}
      <Navbar chatId="12345" messages={[]} />
      {error && <p className="text-red-500">{error}</p>}

      {user ? (
        <div className="account-card bg-[#202020] shadow-2xl rounded-lg p-8 w-full max-w-2xl">
          {/* Avatar and Account Information */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <div className="avatar flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#252729] to-[#1c1c1c] text-white font-bold text-3xl rounded-full shadow-lg">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <span className="mt-4 sm:mt-0 sm:ml-4 font-semibold text-white text-center sm:text-left">
              {user?.email.split('@')[0]}
            </span>
          </div>

          <hr className="border-t border-[#252729] mb-6" />

          {/* Email Section */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-md font-medium text-[#e0e0e0]">Email</p>
            <span className="mt-2 sm:mt-0 font-semibold text-sm text-white text-center sm:text-right sm:flex-1">
              {user?.email}
            </span>
          </div>

          <hr className="border-t border-[#252729] mb-6" />

          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
            <h3 className="text-md font-semibold text-[#e0e0e0]">
              Active Account
            </h3>
            <p className="mt-2 sm:mt-0 text-[#e0e0e0] text-center sm:text-right sm:flex-1">
              You are signed in as{' '}
              <span className="font-semibold text-sm text-white">
                {user?.email.split('@')[0]}
              </span>
            </p>
          </div>

          <hr className="border-t border-[#252729] mb-6" />
          <div
            onClick={() => setIsChatModelOpen(!isChatModelOpen)}
            className="cursor-pointer text-blue-500 dark:text-white text-lg font-medium text-center sm:text-left sm:ml-auto sm:mr-0 mb-4 sm:mb-0"
          >
            Choose Model
          </div>

          <ChatModel isOpen={isChatModelOpen} setIsOpen={setIsChatModelOpen} />

          <hr className="border-t border-[#252729] mb-6" />

          {/* Sign Out Button */}
          <div className="text-center">
            <button
              onClick={handleLogout}
              className="bg-[#252729] hover:bg-red-500 text-white text-sm font-medium py-2 px-6 rounded-lg shadow-lg transform hover:scale-110 transition-transform duration-200"
            >
              Sign Out
            </button>
          </div>
          {/* Subscription Section (Below Sign Out Button) */}
        </div>
      ) : (
        <p className="text-[#e0e0e0]">No user data found or session expired.</p>
      )}
    </div>
  );
};

export default Account;
