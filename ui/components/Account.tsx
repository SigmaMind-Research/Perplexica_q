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



// import { useEffect, useState } from 'react';
// import { createClient } from '@/utils/supabase/client'; // Supabase client import
// import { useRouter } from "next/navigation";
// import Navbar from './Navbar'; // Import the Navbar component


// const Account = () => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const router = useRouter();
//   const [error, setError] = useState<string | null>(null);

//   // Fetch user data after component mounts
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const supabase = createClient();
//         const { data: sessionData, error: sessionError } =
//           await supabase.auth.getSession();

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

//   // Handle user logout and redirect to the sidebar
//   const handleLogout = async () => {
//     try {
//       const supabase = createClient();
//       await supabase.auth.signOut();
//       setUser(null); // Clear user on logout
//       window.location.href = '/'; // Change this to the correct path for your sidebar
//     } catch (err) {
//       setError('Logout failed.');
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="account-page flex items-center justify-center min-h-screen ">
//         {/* Navbar */}
//         <Navbar chatId="12345" messages={[]} />
//       {error && <p className="text-red-500">{error}</p>}

//       {user ? (
//         <div className="account-card bg-[#202020] shadow-2xl rounded-lg p-8 w-full max-w-2xl">
//           {/* Avatar and Account Information */}
//           <div className="flex items-center justify-between mb-6">
//             {/* Avatar */}
//             <div className="avatar flex items-center justify-center w-24 h-24 bg-gradient-to-r from-[#252729] to-[#1c1c1c] text-white font-bold text-3xl rounded-full shadow-lg">
//               {user?.email?.charAt(0).toUpperCase()}
//             </div>
//             <span className="ml-2 font-semibold text-white">
//               {user?.email.split('@')[0]}
//             </span>
//           </div>

//           <hr className="border-t border-[#252729] mb-6" />

//           {/* Email Section */}
//           <div className="mb-6 flex justify-between items-center">
//             <p className="text-lg font-medium text-[#e0e0e0]">Email</p>
//             <span className="ml-2 font-semibold text-sm text-white text-right flex-1">
//               {user?.email}
//             </span>
//           </div>

//           <hr className="border-t border-[#252729] mb-6" />

//           <div className="mb-6 flex justify-between items-center">
//             <h3 className="text-lg font-semibold text-[#e0e0e0]">
//               Active Account
//             </h3>
//             <p className="text-[#e0e0e0] text-right flex-1">
//               You are signed in as{' '}
//               <span className="font-semibold text-sm text-white">
//                 {user?.email.split('@')[0]}
//               </span>
//             </p>
//           </div>

//           <hr className="border-t border-[#252729] mb-6" />

//           {/* Sign Out Button */}
//           <div className="text-center">
//             <button
//               onClick={handleLogout}
//               className="bg-[#252729] hover:bg-red-500 text-white text-sm font-medium py-2 px-6 rounded-lg shadow-lg transform hover:scale-110 transition-transform duration-200"
//             >
//               Sign Out
//             </button>
//           </div>
//            {/* Subscription Section (Below Sign Out Button) */}
//            <div className="w-full mt-8 bg-[#252729] shadow-2xl rounded-lg p-8 max-w-4xl">
//             <h2 className="text-lg font-semibold text-white mb-4">Subscription</h2>
//             <p className="text-sm text-[#e0e0e0] mb-4">
//               Explore our subscription plans to unlock exclusive features and benefits.
//             </p>
//             <div className="text-center">
//               <button
//                 onClick={() => router.push("/subscription")}
//                 className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-6 rounded-lg shadow-lg transform hover:scale-110 transition-transform duration-200"
//               >
//                 View Plans
//               </button>
//             </div>
//           </div>
//         </div>
       
//       ) : (
//         <p className="text-[#e0e0e0]">No user data found or session expired.</p>
//       )}

      
//     </div>
    
//   );
// };

// export default Account;



import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Navbar from './Navbar';
import SettingsDialog from './SettingsDialog';
import { Settings } from 'lucide-react';

const Account = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = createClient();
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

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

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      setError('Logout failed.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="account-page flex justify-center items-center min-h-screen py-6 px-4">
      {/* Card Container */}
      <div className="flex flex-col md:flex-row w-full max-w-full md:max-w-7xl bg-[#252729] shadow-2xl rounded-lg overflow-hidden relative">
        {/* Sidebar (Card) */}
        <div className="sidebar w-full md:w-48 bg-[#202020] text-white p-3 md:p-6">
          <h2 className="text-lg font-semibold mb-4 md:mb-6">Account</h2>

          {/* Profile Tab */}
          <div
            className={`cursor-pointer py-2 mb-4 px-4 rounded-full ${
              activeTab === 'profile' ? 'bg-gray-700' : 'bg-transparent'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </div>

          {/* Billing Tab */}
          <div
            className={`cursor-pointer py-2 px-4 rounded-full ${
              activeTab === 'billing' ? 'bg-gray-700' : 'bg-transparent'
            }`}
            onClick={() => setActiveTab('billing')}
          >
            Billing
          </div>
        </div>

        {/* Main Content (Card) */}
        <div className="main-content flex-1 p-4 sm:p-6 md:p-8">
          <Navbar chatId="12345" messages={[]} />
          {error && <p className="text-red-500">{error}</p>}

          {user ? (
            <div className="account-card shadow-2xl rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-[90%] sm:max-w-full">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                <div className="avatar flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-[#252729] to-[#1c1c1c] text-white font-bold text-2xl sm:text-3xl rounded-full shadow-lg">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
                <span className="mt-4 sm:mt-0 sm:ml-4 font-semibold text-white text-center sm:text-left">
                  {user?.email.split('@')[0]}
                </span>
              </div>

              <hr className="border-t border-[#252729] mb-6" />

              {activeTab === 'profile' && (
                <div>
                  <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-lg font-medium text-[#e0e0e0]">Email</p>
                    <span className="mt-2 sm:mt-0 font-semibold text-sm text-white text-right sm:flex-1">
                      {user?.email}
                    </span>
                  </div>

                  <hr className="border-t border-[#252729] mb-6" />

                  <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
                    <h3 className="text-lg font-semibold text-[#e0e0e0]">
                      Active Account
                    </h3>
                    <p className="mt-2 sm:mt-0 text-[#e0e0e0] text-right sm:flex-1">
                      You are signed in as{' '}
                      <span className="font-semibold text-sm text-white">
                        {user?.email.split('@')[0]}
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Subscription
                  </h2>
                  <p className="text-sm text-[#e0e0e0] mb-4">
                    Explore our subscription plans to unlock exclusive features
                    and benefits.
                  </p>
                  <div className="text-center">
                    <button
                      onClick={() => router.push('/subscription')}
                      className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-6 rounded-lg shadow-lg transform hover:scale-110 transition-transform duration-200"
                    >
                      View Plans
                    </button>
                  </div>
                </div>
              )}

              <div
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="absolute top-2 right-2 cursor-pointer text-white"
              >
                <Settings />
              </div>
              <SettingsDialog isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />

              <hr className="border-t border-[#252729] mb-6" />

              <div className="text-center">
                <button
                  onClick={handleLogout}
                  className="bg-[#252729] hover:bg-red-500 text-white text-sm font-medium py-2 px-6 rounded-lg shadow-lg transform hover:scale-110 transition-transform duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <p className="text-[#e0e0e0]">
              No user data found or session expired.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;



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
//         const { data: sessionData, error: sessionError } =
//           await supabase.auth.getSession();

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

//   // Handle user logout and redirect to the sidebar
//   const handleLogout = async () => {
//     try {
//       const supabase = createClient();
//       await supabase.auth.signOut();
//       setUser(null); // Clear user on logout

//       // Redirect instantly to the sidebar (or home page)
//       window.location.href = '/'; // Change this to the correct path for your sidebar
//     } catch (err) {
//       setError('Logout failed.');
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="account-page flex items-center justify-center min-h-screen bg-[#1c1c1c] px-4 sm:px-6 md:px-8">
//       {error && <p className="text-red-500">{error}</p>}

//       {user ? (
//         <div className="account-card bg-[#202020] shadow-2xl rounded-lg p-6 sm:p-8 w-full max-w-xl md:max-w-2xl">
//           {/* Avatar and Account Information */}
//           <div className="flex items-center justify-between mb-6">
//             {/* Avatar */}
//             <div className="avatar flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-[#252729] to-[#1c1c1c] text-white font-bold text-2xl sm:text-3xl rounded-full shadow-lg">
//               {user?.email?.charAt(0).toUpperCase()}
//             </div>
//             <span className="ml-2 font-semibold text-white text-sm sm:text-base">
//               {user?.email.split('@')[0]}
//             </span>
//           </div>

//           <hr className="border-t border-[#252729] mb-6" />

//           {/* Email Section for Mobile */}
//           <div className="mb-6 flex flex-col items-center text-center sm:text-left border-b border-black pb-4">
//             <p className="text-lg font-medium text-[#e0e0e0]">Email</p>
//             <span className="ml-2 font-semibold text-white text-sm sm:text-base">
//               {user?.email}
//             </span>
//           </div>

//           <hr className="border-t border-[#252729] mb-6" />

//           {/* Active Account Section for Mobile */}
//           <div className="mb-6 flex flex-col items-center text-center sm:text-left border-b border-black pb-4">
//             <h3 className="text-lg font-semibold text-[#e0e0e0]">
//               Active Account
//             </h3>
//             <p className="text-[#e0e0e0] text-sm sm:text-base">
//               You are signed in as{' '}
//               <span className="font-semibold text-white">
//                 {user?.email.split('@')[0]}
//               </span>
//             </p>
//           </div>

//           <hr className="border-t border-[#252729] mb-6" />

//           {/* Sign Out Button */}
//           <div className="text-center">
//             <button
//               onClick={handleLogout}
//               className="bg-[#252729] hover:bg-red-500 text-white font-medium py-3 px-8 rounded-lg shadow-lg transform hover:scale-110 transition-transform duration-200 text-sm sm:text-base"
//             >
//               Sign Out
//             </button>
//           </div>
//         </div>
//       ) : (
//         <p className="text-[#e0e0e0]">No user data found or session expired.</p>
//       )}
//     </div>
//   );
// };

// export default Account;


