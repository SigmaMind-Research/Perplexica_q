

// import { Dialog, Transition } from '@headlessui/react';
// import { Fragment, useEffect, useState } from 'react';
// import { X, Loader2, Copy, Check } from 'lucide-react';
// import { createClient } from '@/utils/supabase/client';
// import { useRouter } from 'next/navigation';
// import ChatModel from './ChatModel';
// import Link from 'next/link';
// import { getSessionAndUser } from '@/lib/sessionService';
// import { supabase } from '@/lib/supabase';

// const API_BASE_URL = process.env.NEXT_PUBLIC_SUBSCRIPTION_URL;

// const Account = ({
//   isOpen,
//   setIsOpen,
// }: {
//   isOpen: boolean;
//   setIsOpen: (isOpen: boolean) => void;
// }) => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isChatModelOpen, setIsChatModelOpen] = useState(false);
//   // State to control the active tab: 'profile' or 'api'
//   const [activeTab, setActiveTab] = useState<'profile' | 'api'>('profile');
//   const [activeSubTab, setActiveSubTab] = useState<'docs' | 'models' | 'terms'>('docs');
//   const router = useRouter();

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

//   const handleLogout = async () => {
//     try {
//       const supabase = createClient();
//       await supabase.auth.signOut();
//       setUser(null);
//       window.location.href = '/';
//     } catch (err) {
//       setError('Logout failed.');
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
//         <div className="fixed inset-0 bg-black/50" />

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-6 text-center">
//             {/* Modal Panel */}
//             <Dialog.Panel className="w-full max-w-3xl h-auto p-0 sm:p-4 rounded-2xl bg-[#202020] shadow-2xl">
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//                 aria-label="Close Modal"
//               >
//                 <X className="w-8 h-8" />
//               </button>

//               {/* Header with Navbar & Tab Links */}
//               <div className="mb-4">
//                 <div className="flex items-center justify-between">
//                   <h1 className="text-xl font-semibold text-white">Account</h1>
//                 </div>
//                 <div className="flex justify-end space-x-4 mt-0 mr-4">
//                   <button
//                     onClick={() => setActiveTab('profile')}
//                     className={`text-sm ${
//                       activeTab === 'profile'
//                         ? 'text-white font-semibold'
//                         : 'text-gray-400'
//                     }`}
//                   >
//                     Profile
//                   </button>
//                   <button
//                     onClick={() => setActiveTab('api')}
//                     className={`text-sm ${
//                       activeTab === 'api'
//                         ? 'text-white font-semibold'
//                         : 'text-gray-400'
//                     }`}
//                   >
//                     API
//                   </button>
//                 </div>
//                 <hr className="border-t border-[#252729] mt-2" />
//               </div>

//               {/* Conditional Content */}
//               {activeTab === 'profile' ? (
//                 <ProfileView
//                   user={user}
//                   error={error}
//                   handleLogout={handleLogout}
//                   setIsChatModelOpen={setIsChatModelOpen}
//                 />
//               ) : (
//                 <APIGeneration />
//               )}
//             </Dialog.Panel>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// interface ProfileViewProps {
//   user: any;
//   error: string | null;
//   handleLogout: () => void;
//   setIsChatModelOpen: (open: boolean) => void;
// }

// const ProfileView = ({
//   user,
//   error,
//   handleLogout,
//   setIsChatModelOpen,
// }: ProfileViewProps) => {
//   return (
//     <>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {user ? (
//         <div className="account-card bg-[#202020] shadow-2xl rounded-lg p-8">
//           <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
//             <div className="avatar flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#252729] to-[#1c1c1c] text-white font-bold text-3xl rounded-full shadow-lg">
//               {user?.email?.charAt(0).toUpperCase()}
//             </div>
//             <span className="mt-3 sm:mt-0 sm:ml-4 font-semibold text-white text-center sm:text-left">
//               {user?.email.split('@')[0]}
//             </span>
//           </div>

//           <hr className="border-t border-[#252729] mb-6" />

//           <div className="mb-3 flex flex-col sm:flex-row justify-between items-center">
//             <p className="text-md font-medium text-[#e0e0e0]">Email</p>
//             <span className="mt-2 sm:mt-0 font-semibold text-sm text-white text-center sm:text-right sm:flex-1">
//               {user?.email}
//             </span>
//           </div>

//           <hr className="border-t border-[#252729] mb-6" />

//           <div className="mb-3 flex flex-col sm:flex-row justify-between items-center">
//             <h3 className="text-md font-semibold text-[#e0e0e0]">Active Account</h3>
//             <p className="mt-2 sm:mt-0 text-[#e0e0e0] text-center sm:text-right sm:flex-1">
//               You are signed in as{' '}
//               <span className="font-semibold text-sm text-white">
//                 {user?.email.split('@')[0]}
//               </span>
//             </p>
//           </div>

//           <hr className="border-t border-[#252729] mb-3" />

//           <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
//             <div className="flex flex-col sm:flex-row sm:items-center space-x-2">
//               <p className="text-md font-medium text-black dark:text-white">AI Model</p>
//             </div>
//             <div className="flex flex-col sm:flex-row sm:items-center sm:ml-auto space-x-2">
//               <ChatModel setIsChatModelOpen={setIsChatModelOpen} />
//             </div>
//           </div>

//           <div className="mt-4 text-center">
//             <button
//               onClick={handleLogout}
//               className="bg-[#252729] hover:bg-red-500 text-white text-sm font-medium py-2 px-6 rounded-lg shadow transform hover:scale-110 transition duration-200"
//             >
//               Sign Out
//             </button>
//           </div>
//         </div>
//       ) : (
//         <p className="text-[#e0e0e0]">No user data found or session expired.</p>
//       )}
//     </>
//   );
// };

// // This is the complete APIGeneration UI you provided.
// // It is rendered in the API tab of the Account component.
// const APIGeneration = () => {
//   const [userPlan, setUserPlan] = useState<string | null>(null);
//   const [credits, setCredits] = useState<number>(0);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [apiKey, setApiKey] = useState<string>('');
//   const [error, setError] = useState<string>('');
//   const [paymentStatus, setPaymentStatus] = useState<string>('');
//   const [generatingKey, setGeneratingKey] = useState<boolean>(false);
//   const [copied, setCopied] = useState<boolean>(false);

//   useEffect(() => {
//     checkUserPlanAndCredits();
//   }, []);

//   const checkUserPlanAndCredits = async () => {
//     try {
//       const { session, user } = await getSessionAndUser();
//       if (!session || !user || user?.is_anonymous) {
//         window.location.href = '/login';
//         return;
//       }
//       console.log('Authenticated user id:', user.id);

//       // Fetch existing active API key (if any)
//       const { data: keyData, error: keyError } = await supabase
//         .from('api_keys')
//         .select('apiKey')
//         .eq('userId', user.id)
//         .eq('status', 'active')
//         .single();

//       if (keyError) {
//         console.error('Error fetching API key:', keyError);
//       }
//       if (keyData?.apiKey) {
//         console.log('Existing API key found:', keyData.apiKey);
//         setApiKey(keyData.apiKey);
//       } else {
//         console.log('No active API key found for user:', user.id);
//       }

//       // Fetch user plan and credits
//       const { data: userData, error: userError } = await supabase
//         .from('users')
//         .select('user_plan, user_credits')
//         .eq('id', user.id)
//         .single();

//       if (userError) throw userError;

//       console.log('Fetched user data:', userData);
//       setUserPlan('active');
//       setCredits(userData.user_credits);
//       setLoading(false);
//     } catch (err) {
//       setUserPlan('active');
//       setCredits(5);
//       console.error('Error fetching user data:', err);
//       setError('Error fetching user data');
//       setLoading(false);
//     }
//   };

//   const handleSetupPayment = async () => {
//     try {
//       setError('');
//       const { session, user } = await getSessionAndUser();
//       if (!session || !user || user?.is_anonymous) {
//         window.location.href = '/login';
//         return;
//       }
//       console.log('Creating order for user:', user.id);

//       const response = await fetch(`${API_BASE_URL}/api-payment/create-order`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Origin': window.location.origin,
//         },
//         body: JSON.stringify({ amount: 5, userId: user.id }),
//       });

//       console.log('Order API response status:', response.status);
//       if (!response.ok) {
//         const errorData = await response.text();
//         console.error('API error response:', errorData);
//         throw new Error(`API error: ${response.status} - ${errorData}`);
//       }
//       const data = await response.json();
//       console.log('Order data:', data);

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
//         amount: data.amount,
//         currency: data.currency,
//         order_id: data.orderId,
//         name: "API Access",
//         description: "API Access Payment",
//         handler: function (response: any) {
//           handlePaymentSuccess(response);
//         },
//         prefill: { email: user.email },
//         theme: { color: "#3399cc" },
//       };

//       const paymentObject = new (window as any).Razorpay(options);
//       paymentObject.open();
//     } catch (err) {
//       console.error('Payment initialization failed:', err);
//       setError(`Payment initialization failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
//     }
//   };

//   const handlePaymentSuccess = async (response: any) => {
//     try {
//       console.log('Payment success response:', response);
//       const verifyResponse = await fetch(`${API_BASE_URL}/api-payment/verify-payment`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Origin': window.location.origin,
//         },
//         body: JSON.stringify(response),
//       });

//       if (Boolean(verifyResponse.status == 200)) {
//         setPaymentStatus('Payment successful! Your account has been credited with 100 API credits.');
//       } else {
//         throw new Error('Payment verification failed');
//       }
//     } catch (err) {
//       console.error('Payment verification failed:', err);
//       setError('Payment verification failed');
//     }
//   };

//   const generateApiKey = async () => {
//     try {
//       setError('');
//       setGeneratingKey(true);
//       const { session, user } = await getSessionAndUser();
//       if (!userPlan || userPlan !== 'active' || credits <= 0) {
//         setError('Insufficient credits or invalid plan. Please upgrade your plan.');
//         setGeneratingKey(false);
//         return;
//       }

//       const response = await fetch(`${API_BASE_URL}/api-key/generate-api-key`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId: user?.id }),
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || `HTTP error! status: ${response.status}`);
//       }
//       console.log('Generated API key:', data.apiKey);
//       setApiKey(data.apiKey);
//       setGeneratingKey(false);
//     } catch (err: any) {
//       console.error('API key generation failed:', err);
//       setError(err.message || 'API key generation failed');
//       setGeneratingKey(false);
//     }
//   };

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(apiKey);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error('Failed to copy:', err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center p-8">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#171717] min-h-screen py-8">
      
//       {/* Navbar */}
//       <div className="container mx-auto px-4 mb-8">
//         <nav className="flex flex-col md:flex-row justify-between items-center bg-[#363636] shadow rounded p-4">
//           <div className="flex space-x-6 mb-4 md:mb-0">
//             <Link href="/docs" className="text-gray-800 dark:text-white hover:underline">
//               Docs
//             </Link>
//             <Link href="/models" className="text-gray-800 dark:text-white hover:underline">
//               Supported Models
//             </Link>
//             <Link href="/terms" className="text-gray-800 dark:text-white hover:underline">
//               Terms of services
//             </Link>
//           </div>
//           <div>
//             <span className="text-gray-800 dark:text-white">Know more</span>
//           </div>
//         </nav>
//       </div>

//       {/* Setup Payment Section */}
//       <div className="container mx-auto px-4 mb-8">
//         <div className="flex flex-col md:flex-row items-center justify-between bg-[#33363D] p-6 rounded shadow">
//           <div>
//             <h2 className="text-xl font-bold text-gray-900 dark:text-white">Setup Payment</h2>
//             <p className="text-gray-700 dark:text-gray-300">
//               Connect a credit card to start using the API
//             </p>
//           </div>
//           <div className="mt-4 md:mt-0">
//             <button
//               onClick={handleSetupPayment}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
//             >
//               Setup
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* API Generation Section */}
//       <div className="container mx-auto px-4">
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded">
//             <p>{error}</p>
//           </div>
//         )}

//         {paymentStatus && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-4 rounded">
//             <p>{paymentStatus}</p>
//           </div>
//         )}

//         <div className="flex flex-col items-center justify-center h-64">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
//             API Generation
//           </h1>
//           {userPlan === 'active' ? (
//             <div className="space-y-4 w-full max-w-md">
//               <div className="flex justify-between items-center border-b pb-2">
//                 <span className="text-white">Current Plan:</span>
//                 <span className="font-semibold capitalize text-white">{userPlan}</span>
//               </div>
//               <div className="flex justify-between items-center border-b pb-2">
//                 <span className="text-white">Available Credits:</span>
//                 <span className="font-semibold text-white">{credits}</span>
//               </div>
//               {!apiKey ? (
//                 <button
//                   onClick={generateApiKey}
//                   disabled={!userPlan || userPlan !== 'active' || credits <= 0 || generatingKey}
//                   className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 flex items-center justify-center"
//                 >
//                   {generatingKey ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
//                   Generate API Key
//                 </button>
//               ) : (
//                 <div className="space-y-2 w-full">
//                   <div className="p-4 bg-black rounded-lg break-all flex items-center">
//                     <p className="font-mono text-sm text-white flex-grow">{apiKey}</p>
//                     <button
//                       onClick={copyToClipboard}
//                       className="text-blue-400 hover:text-blue-600 ml-2"
//                       title="Copy to clipboard"
//                     >
//                       {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="text-center space-y-4">
//               <p className="text-white">No active plan found</p>
//               <button
//                 onClick={handleSetupPayment}
//                 className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Setup API Access
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Account;

// updated code with credits checks

import { Dialog, Transition } from '@headlessui/react'; 
import { Fragment, useEffect, useState } from 'react';
import { X, Loader2, Copy, Check, Plus } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import ChatModel from './ChatModel';
import Link from 'next/link';
import { getSessionAndUser } from '@/lib/sessionService';
import { supabase } from '@/lib/supabase';

const API_BASE_URL = process.env.NEXT_PUBLIC_SUBSCRIPTION_URL;

const Account = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isChatModelOpen, setIsChatModelOpen] = useState(false);
  // State to control the active tab: 'profile' or 'api'
  const [activeTab, setActiveTab] = useState<'profile' | 'api'>('profile');
  const [activeSubTab, setActiveSubTab] = useState<'docs' | 'models' | 'terms'>('docs');
  const router = useRouter();

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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black/50" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6 text-center">
            {/* Modal Panel */}
            <Dialog.Panel className="w-full max-w-3xl h-auto p-0 sm:p-4 rounded-2xl bg-[#202020] shadow-2xl">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                aria-label="Close Modal"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Header with Navbar & Tab Links */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold text-white ml-4 -mb-5">Account</h1>
                </div>
                <div className="flex justify-end space-x-4 mt-0 mr-4">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`text-sm ${
                      activeTab === 'profile'
                        ? 'text-white font-semibold'
                        : 'text-gray-400'
                    }`}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('api')}
                    className={`text-sm ${
                      activeTab === 'api'
                        ? 'text-white font-semibold'
                        : 'text-gray-400'
                    }`}
                  >
                    API
                  </button>
                </div>
                <hr className="border-t border-[#252729] mt-2" />
              </div>

              {/* Conditional Content */}
              {activeTab === 'profile' ? (
                <ProfileView
                  user={user}
                  error={error}
                  handleLogout={handleLogout}
                  setIsChatModelOpen={setIsChatModelOpen}
                />
              ) : (
                <APIGeneration />
              )}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

interface ProfileViewProps {
  user: any;
  error: string | null;
  handleLogout: () => void;
  setIsChatModelOpen: (open: boolean) => void;
}

const ProfileView = ({
  user,
  error,
  handleLogout,
  setIsChatModelOpen,
}: ProfileViewProps) => {
  return (
    <>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {user ? (
        <div className="account-card bg-[#202020] shadow-2xl rounded-lg p-8 -mt-3">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <div className="avatar flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#252729] to-[#1c1c1c] text-white font-bold text-3xl rounded-full shadow-lg">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <span className="mt-3 sm:mt-0 sm:ml-4 font-semibold text-white text-center sm:text-left">
              {user?.email.split('@')[0]}
            </span>
          </div>

          <hr className="border-t border-[#252729] mb-6" />

          <div className="mb-3 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-md font-medium text-[#e0e0e0]">Email</p>
            <span className="mt-2 sm:mt-0 font-semibold text-sm text-white text-center sm:text-right sm:flex-1">
              {user?.email}
            </span>
          </div>

          <hr className="border-t border-[#252729] mb-6" />

          <div className="mb-3 flex flex-col sm:flex-row justify-between items-center">
            <h3 className="text-md font-semibold text-[#e0e0e0]">Active Account</h3>
            <p className="mt-2 sm:mt-0 text-[#e0e0e0] text-center sm:text-right sm:flex-1">
              You are signed in as{' '}
              <span className="font-semibold text-sm text-white">
                {user?.email.split('@')[0]}
              </span>
            </p>
          </div>

          <hr className="border-t border-[#252729] mb-3" />

           {/* Model Section */}
           <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-0 sm:space-y-0 sm:justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center space-x-2">
                      <p className="text-md font-medium text-black dark:text-white">
                        AI Model
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:ml-auto space-x-2">
                      <ChatModel setIsChatModelOpen={setIsChatModelOpen} />
                    </div>
                  </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleLogout}
              className="bg-[#252729] hover:bg-red-500 text-white text-sm font-medium py-2 px-6 rounded-lg shadow transform hover:scale-110 transition duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <p className="text-[#e0e0e0]">No user data found or session expired.</p>
      )}
    </>
  );
};

// Updated APIGeneration component with first-time user flow and buy credits functionality
const APIGeneration = () => {
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiKey, setApiKey] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [generatingKey, setGeneratingKey] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(true);
  const [hasPaymentSetup, setHasPaymentSetup] = useState<boolean>(false);
  const [buyCreditsOpen, setBuyCreditsOpen] = useState<boolean>(false);
  const [creditsAmount, setCreditsAmount] = useState<number>(100);
  const [currentUsage, setCurrentUsage] = useState<number>(0);

  useEffect(() => {
    checkUserPlanAndCredits();
  }, []);

  const checkUserPlanAndCredits = async () => {
    try {
      const { session, user } = await getSessionAndUser();
      if (!session || !user || user?.is_anonymous) {
        window.location.href = '/login';
        return;
      }
      console.log('Authenticated user id:', user.id);

      // Fetch existing active API key (if any)
      const { data: keyData, error: keyError } = await supabase
        .from('api_keys')
        .select('apiKey')
        .eq('userId', user.id)
        .eq('status', 'active')
        .single();

      if (keyError) {
        console.error('Error fetching API key:', keyError);
      }
      if (keyData?.apiKey) {
        console.log('Existing API key found:', keyData.apiKey);
        setApiKey(keyData.apiKey);
      } else {
        console.log('No active API key found for user:', user.id);
      }

      // Fetch user plan, credits, payment status and usage
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('user_plan, user_credits, has_payment_setup, first_time_user, current_usage')
        .eq('id', user.id)
        .single();

      if (userError) throw userError;

      console.log('Fetched user data:', userData);
      setUserPlan(userData.user_plan || 'inactive');
      setCredits(userData.user_credits || 0);
      setHasPaymentSetup(userData.has_payment_setup || false);
      setIsFirstTimeUser(userData.first_time_user !== false); // If undefined/null, assume first time
      setCurrentUsage(userData.current_usage || 0);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Error fetching user data');
      setLoading(false);
      // Set default values for development testing
      setUserPlan('inactive');
      setCredits(0);
      setIsFirstTimeUser(true);
      setHasPaymentSetup(false);
      setCurrentUsage(0);
    }
  };

  const handleSetupPayment = async () => {
    try {
      setError('');
      const { session, user } = await getSessionAndUser();
      if (!session || !user || user?.is_anonymous) {
        window.location.href = '/login';
        return;
      }
      console.log('Creating order for user:', user.id);

      // Initial payment for first time users is for 100 credits
      const response = await fetch(`${API_BASE_URL}/api-payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin,
        },
        body: JSON.stringify({ amount: 5, userId: user.id }),
      });

      console.log('Order API response status:', response.status);
      if (!response.ok) {
        const errorData = await response.text();
        console.error('API error response:', errorData);
        throw new Error(`API error: ${response.status} - ${errorData}`);
      }
      const data = await response.json();
      console.log('Order data:', data);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "API Access",
        description: "API Access Payment",
        handler: function (response: any) {
          handlePaymentSuccess(response);
        },
        prefill: { email: user.email },
        theme: { color: "#3399cc" },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error('Payment initialization failed:', err);
      setError(`Payment initialization failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handlePaymentSuccess = async (response: any) => {
    try {
      console.log('Payment success response:', response);
      const verifyResponse = await fetch(`${API_BASE_URL}/api-payment/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin,
        },
        body: JSON.stringify(response),
      });

      if (verifyResponse.status === 200) {
        // Update user's payment setup status and add credits
        const { session, user } = await getSessionAndUser();
        if (session && user) {
          const { error: updateError } = await supabase
            .from('users')
            .update({
              has_payment_setup: true,
              first_time_user: false,
              user_plan: 'active',
              user_credits: supabase.sql`user_credits + 100` // Add 100 credits
            })
            .eq('id', user.id);

          if (updateError) {
            console.error('Error updating user data:', updateError);
            throw new Error('Failed to update user status');
          }
        }

        setPaymentStatus('Payment successful! Your account has been credited with 100 API credits.');
        setHasPaymentSetup(true);
        setIsFirstTimeUser(false);
        setUserPlan('active');
        setCredits(prevCredits => prevCredits + 100);
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (err) {
      console.error('Payment verification failed:', err);
      setError('Payment verification failed');
    }
  };

  const handleBuyCredits = async () => {
    try {
      setError('');
      const { session, user } = await getSessionAndUser();
      if (!session || !user || user?.is_anonymous) {
        window.location.href = '/login';
        return;
      }

      // Calculate amount based on credits (assuming 1 credit = $0.05)
      const amount = creditsAmount * 0.05;

      const response = await fetch(`${API_BASE_URL}/api-payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin,
        },
        body: JSON.stringify({ 
          amount, 
          userId: user.id,
          credits: creditsAmount 
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`API error: ${response.status} - ${errorData}`);
      }
      
      const data = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "Buy Credits",
        description: `Purchase ${creditsAmount} API Credits`,
        handler: function (response: any) {
          handleBuyCreditsSuccess(response, creditsAmount);
        },
        prefill: { email: user.email },
        theme: { color: "#3399cc" },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
      setBuyCreditsOpen(false);
    } catch (err) {
      console.error('Credits purchase failed:', err);
      setError(`Credits purchase failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleBuyCreditsSuccess = async (response: any, amount: number) => {
    try {
      console.log('Payment success response:', response);
      const verifyResponse = await fetch(`${API_BASE_URL}/api-payment/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin,
        },
        body: JSON.stringify({
          ...response,
          credits: amount
        }),
      });

      if (verifyResponse.status === 200) {
        // Update user's credits
        const { session, user } = await getSessionAndUser();
        if (session && user) {
          const { error: updateError } = await supabase
            .from('users')
            .update({
              user_credits: supabase.sql`user_credits + ${amount}`
            })
            .eq('id', user.id);

          if (updateError) {
            console.error('Error updating user credits:', updateError);
            throw new Error('Failed to update user credits');
          }
        }

        setPaymentStatus(`Payment successful! Your account has been credited with ${amount} API credits.`);
        setCredits(prevCredits => prevCredits + amount);
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (err) {
      console.error('Credits purchase verification failed:', err);
      setError('Credits purchase verification failed');
    }
  };

  const generateApiKey = async () => {
    try {
      setError('');
      setGeneratingKey(true);
      const { session, user } = await getSessionAndUser();
      if (!userPlan || userPlan !== 'active' || credits <= 0) {
        setError('Insufficient credits or invalid plan. Please upgrade your plan.');
        setGeneratingKey(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api-key/generate-api-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user?.id }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      console.log('Generated API key:', data.apiKey);
      setApiKey(data.apiKey);
      setGeneratingKey(false);
    } catch (err: any) {
      console.error('API key generation failed:', err);
      setError(err.message || 'API key generation failed');
      setGeneratingKey(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#171717] min-h-screen py-8">
      
      {/* Navbar */}
      <div className="container mx-auto px-4 mb-8">
        <nav className="flex flex-col md:flex-row justify-between items-center bg-[#363636] shadow rounded p-4">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="/docs" className="text-gray-800 dark:text-white hover:underline">
              Docs
            </Link>
            <Link href="/models" className="text-gray-800 dark:text-white hover:underline">
              Supported Models
            </Link>
            <Link href="/terms" className="text-gray-800 dark:text-white hover:underline">
              Terms of services
            </Link>
          </div>
          <div>
            <span className="text-gray-800 dark:text-white">Know more</span>
          </div>
        </nav>
      </div>

      {/* Setup Payment Section - Only show if user hasn't set up payment yet */}
      {isFirstTimeUser && !hasPaymentSetup && (
        <div className="container mx-auto px-4 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between bg-[#33363D] p-6 rounded shadow">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Setup Payment</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Connect a credit card to start using the API
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={handleSetupPayment}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Setup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API Generation Section - Only show if user has set up payment */}
      {(!isFirstTimeUser || hasPaymentSetup) && (
        <div className="container mx-auto px-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded">
              <p>{error}</p>
            </div>
          )}

          {paymentStatus && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-4 rounded">
              <p>{paymentStatus}</p>
            </div>
          )}

          <div className="flex flex-col items-center justify-center h-auto mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              API Generation
            </h1>
            {userPlan === 'active' ? (
              <div className="space-y-4 w-full max-w-md">
                <div className="bg-[#33363D] p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-2">
                    <span className="text-white">Current Plan:</span>
                    <span className="font-semibold capitalize text-white">{userPlan}</span>
                  </div>
                  
                  {/* Credits section with buy credits button */}
                  <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-2">
                    <span className="text-white">Available Credits:</span>
                    <div className="flex items-center">
                      <span className="font-semibold text-white mr-3">{credits}</span>
                      <button 
                        onClick={() => setBuyCreditsOpen(true)} 
                        className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded-md flex items-center"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Buy Credits
                      </button>
                    </div>
                  </div>
                  
                  {/* Current usage section */}
                  <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-4">
                    <span className="text-white">Current Usage:</span>
                    <span className="font-semibold text-white">{currentUsage} credits</span>
                  </div>
                  
                  {!apiKey ? (
                    <button
                      onClick={generateApiKey}
                      disabled={credits <= 0 || generatingKey}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 flex items-center justify-center"
                    >
                      {generatingKey ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                      Generate API Key
                    </button>
                  ) : (
                    <div className="space-y-2 w-full">
                      <div className="p-4 bg-black rounded-lg break-all flex items-center">
                        <p className="font-mono text-sm text-white flex-grow">{apiKey}</p>
                        <button
                          onClick={copyToClipboard}
                          className="text-blue-400 hover:text-blue-600 ml-2"
                          title="Copy to clipboard"
                        >
                          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-white">No active plan found</p>
                <button
                  onClick={handleSetupPayment}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Setup API Access
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Buy Credits Modal */}
      {buyCreditsOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-[#33363D] rounded-lg p-6 max-w-md w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Buy Credits</h2>
        <button onClick={() => setBuyCreditsOpen(false)} className="text-gray-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Enter amount of credits to purchase:</label>
        <input
          type="number"
          value={creditsAmount}
          onChange={(e) =>
            setCreditsAmount(Math.max(1, parseInt(e.target.value) || 1))
          }
          className="w-full bg-[#252729] text-white px-4 py-2 rounded-md"
          min="1"
        />
        <p className="text-sm text-gray-400 mt-2">
          Estimated cost: ${(creditsAmount * 0.05).toFixed(2)}
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleBuyCredits}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Account;


// updated code with asuuming user is paid 

// import { Dialog, Transition } from '@headlessui/react';  
// import { Fragment, useEffect, useState } from 'react';
// import { X, Loader2, Copy, Check, Plus } from 'lucide-react';
// import { createClient } from '@/utils/supabase/client';
// import { useRouter } from 'next/navigation';
// import ChatModel from './ChatModel';
// import Link from 'next/link';
// import { getSessionAndUser } from '@/lib/sessionService';
// import { supabase } from '@/lib/supabase';

// const API_BASE_URL = process.env.NEXT_PUBLIC_SUBSCRIPTION_URL;

// const Account = ({
//   isOpen,
//   setIsOpen,
// }: {
//   isOpen: boolean;
//   setIsOpen: (isOpen: boolean) => void;
// }) => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isChatModelOpen, setIsChatModelOpen] = useState(false);
//   // State to control the active tab: 'profile' or 'api'
//   const [activeTab, setActiveTab] = useState<'profile' | 'api'>('profile');
//   const [activeSubTab, setActiveSubTab] = useState<'docs' | 'models' | 'terms'>('docs');
//   const router = useRouter();

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

//   const handleLogout = async () => {
//     try {
//       const supabase = createClient();
//       await supabase.auth.signOut();
//       setUser(null);
//       window.location.href = '/';
//     } catch (err) {
//       setError('Logout failed.');
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
//         <div className="fixed inset-0 bg-black/50" />

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-6 text-center">
//             {/* Modal Panel */}
//             <Dialog.Panel className="w-full max-w-3xl h-auto p-0 sm:p-4 rounded-2xl bg-[#202020] shadow-2xl">
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//                 aria-label="Close Modal"
//               >
//                 <X className="w-8 h-8" />
//               </button>

//               {/* Header with Navbar & Tab Links */}
//               <div className="mb-4">
//                 <div className="flex items-center justify-between">
//                   <h1 className="text-xl font-semibold text-white ml-4 -mb-5">Account</h1>
//                 </div>
//                 <div className="flex justify-end space-x-4 mt-0 mr-4">
//                   <button
//                     onClick={() => setActiveTab('profile')}
//                     className={`text-sm ${
//                       activeTab === 'profile'
//                         ? 'text-white font-semibold'
//                         : 'text-gray-400'
//                     }`}
//                   >
//                     Profile
//                   </button>
//                   <button
//                     onClick={() => setActiveTab('api')}
//                     className={`text-sm ${
//                       activeTab === 'api'
//                         ? 'text-white font-semibold'
//                         : 'text-gray-400'
//                     }`}
//                   >
//                     API
//                   </button>
//                 </div>
//                 <hr className="border-t border-[#252729] mt-2" />
//               </div>

//               {/* Conditional Content */}
//               {activeTab === 'profile' ? (
//                 <ProfileView
//                   user={user}
//                   error={error}
//                   handleLogout={handleLogout}
//                   setIsChatModelOpen={setIsChatModelOpen}
//                 />
//               ) : (
//                 <APIGeneration />
//               )}
//             </Dialog.Panel>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// interface ProfileViewProps {
//   user: any;
//   error: string | null;
//   handleLogout: () => void;
//   setIsChatModelOpen: (open: boolean) => void;
// }

// const ProfileView = ({
//   user,
//   error,
//   handleLogout,
//   setIsChatModelOpen,
// }: ProfileViewProps) => {
//   return (
//     <>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {user ? (
//         <div className="account-card bg-[#202020] shadow-2xl rounded-lg p-8">
//           <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
//             <div className="avatar flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#252729] to-[#1c1c1c] text-white font-bold text-3xl rounded-full shadow-lg">
//               {user?.email?.charAt(0).toUpperCase()}
//             </div>
//             <span className="mt-3 sm:mt-0 sm:ml-4 font-semibold text-white text-center sm:text-left">
//               {user?.email.split('@')[0]}
//             </span>
//           </div>

//           <hr className="border-t border-[#252729] mb-6" />

//           <div className="mb-3 flex flex-col sm:flex-row justify-between items-center">
//             <p className="text-md font-medium text-[#e0e0e0]">Email</p>
//             <span className="mt-2 sm:mt-0 font-semibold text-sm text-white text-center sm:text-right sm:flex-1">
//               {user?.email}
//             </span>
//           </div>

//           <hr className="border-t border-[#252729] mb-6" />

//           <div className="mb-3 flex flex-col sm:flex-row justify-between items-center">
//             <h3 className="text-md font-semibold text-[#e0e0e0]">Active Account</h3>
//             <p className="mt-2 sm:mt-0 text-[#e0e0e0] text-center sm:text-right sm:flex-1">
//               You are signed in as{' '}
//               <span className="font-semibold text-sm text-white">
//                 {user?.email.split('@')[0]}
//               </span>
//             </p>
//           </div>

//           <hr className="border-t border-[#252729] mb-3" />

//           <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
//             <div className="flex flex-col sm:flex-row sm:items-center space-x-2">
//               <p className="text-md font-medium text-black dark:text-white">AI Model</p>
//             </div>
//             <div className="flex flex-col sm:flex-row sm:items-center sm:ml-auto space-x-2">
//               <ChatModel setIsChatModelOpen={setIsChatModelOpen} />
//             </div>
//           </div>

//           <div className="mt-4 text-center">
//             <button
//               onClick={handleLogout}
//               className="bg-[#252729] hover:bg-red-500 text-white text-sm font-medium py-2 px-6 rounded-lg shadow transform hover:scale-110 transition duration-200"
//             >
//               Sign Out
//             </button>
//           </div>
//         </div>
//       ) : (
//         <p className="text-[#e0e0e0]">No user data found or session expired.</p>
//       )}
//     </>
//   );
// };

// // Updated APIGeneration component for a paid user
// const APIGeneration = () => {
//   const [userPlan, setUserPlan] = useState<string | null>('active'); // default as active for paid user
//   const [credits, setCredits] = useState<number>(100); // assume user has credits
//   const [loading, setLoading] = useState<boolean>(true);
//   const [apiKey, setApiKey] = useState<string>('');
//   const [error, setError] = useState<string>('');
//   const [paymentStatus, setPaymentStatus] = useState<string>('');
//   const [generatingKey, setGeneratingKey] = useState<boolean>(false);
//   const [copied, setCopied] = useState<boolean>(false);
//   // For paid users, we assume they've already set up payment.
//   const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(false);
//   const [hasPaymentSetup, setHasPaymentSetup] = useState<boolean>(true);
//   const [buyCreditsOpen, setBuyCreditsOpen] = useState<boolean>(false);
//   const [creditsAmount, setCreditsAmount] = useState<number>(100);
//   const [currentUsage, setCurrentUsage] = useState<number>(0);

//   useEffect(() => {
//     checkUserPlanAndCredits();
//   }, []);

//   const checkUserPlanAndCredits = async () => {
//     try {
//       const { session, user } = await getSessionAndUser();
//       if (!session || !user || user?.is_anonymous) {
//         window.location.href = '/login';
//         return;
//       }
//       console.log('Authenticated user id:', user.id);

//       // Fetch existing active API key (if any)
//       const { data: keyData, error: keyError } = await supabase
//         .from('api_keys')
//         .select('apiKey')
//         .eq('userId', user.id)
//         .eq('status', 'active')
//         .single();

//       if (keyError) {
//         console.error('Error fetching API key:', keyError);
//       }
//       if (keyData?.apiKey) {
//         console.log('Existing API key found:', keyData.apiKey);
//         setApiKey(keyData.apiKey);
//       } else {
//         console.log('No active API key found for user:', user.id);
//       }

//       // Fetch user plan, credits, payment status and usage
//       const { data: userData, error: userError } = await supabase
//         .from('users')
//         .select('user_plan, user_credits, has_payment_setup, first_time_user, current_usage')
//         .eq('id', user.id)
//         .single();

//       if (userError) throw userError;

//       console.log('Fetched user data:', userData);
//       // For testing as a paid user, override values if needed:
//       setUserPlan('active');
//       setCredits(userData.user_credits || 100);
//       setHasPaymentSetup(true);
//       setIsFirstTimeUser(false);
//       setCurrentUsage(userData.current_usage || 0);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching user data:', err);
//       setError('Error fetching user data');
//       setLoading(false);
//       // Set default values for development testing
//       setUserPlan('active');
//       setCredits(100);
//       setIsFirstTimeUser(false);
//       setHasPaymentSetup(true);
//       setCurrentUsage(0);
//     }
//   };

//   // For paid users, the payment setup functions are not needed.
//   /*
//   const handleSetupPayment = async () => {
//     // Payment setup code removed/commented out since the user is assumed to be paid.
//   };
//   */

//   const handlePaymentSuccess = async (response: any) => {
//     // Payment success function remains if needed for credits purchase.
//     try {
//       console.log('Payment success response:', response);
//       const verifyResponse = await fetch(`${API_BASE_URL}/api-payment/verify-payment`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Origin': window.location.origin,
//         },
//         body: JSON.stringify(response),
//       });

//       if (verifyResponse.status === 200) {
//         // Update user's payment setup status and add credits
//         const { session, user } = await getSessionAndUser();
//         if (session && user) {
//           const { error: updateError } = await supabase
//             .from('users')
//             .update({
//               has_payment_setup: true,
//               first_time_user: false,
//               user_plan: 'active',
//               user_credits: supabase.sql`user_credits + 100` // Add 100 credits
//             })
//             .eq('id', user.id);

//           if (updateError) {
//             console.error('Error updating user data:', updateError);
//             throw new Error('Failed to update user status');
//           }
//         }

//         setPaymentStatus('Payment successful! Your account has been credited with 100 API credits.');
//         setHasPaymentSetup(true);
//         setIsFirstTimeUser(false);
//         setUserPlan('active');
//         setCredits(prevCredits => prevCredits + 100);
//       } else {
//         throw new Error('Payment verification failed');
//       }
//     } catch (err) {
//       console.error('Payment verification failed:', err);
//       setError('Payment verification failed');
//     }
//   };

//   const handleBuyCredits = async () => {
//     try {
//       setError('');
//       const { session, user } = await getSessionAndUser();
//       if (!session || !user || user?.is_anonymous) {
//         window.location.href = '/login';
//         return;
//       }

//       // Calculate amount based on credits (assuming 1 credit = $0.05)
//       const amount = creditsAmount * 0.05;

//       const response = await fetch(`${API_BASE_URL}/api-payment/create-order`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Origin': window.location.origin,
//         },
//         body: JSON.stringify({ 
//           amount, 
//           userId: user.id,
//           credits: creditsAmount 
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(`API error: ${response.status} - ${errorData}`);
//       }
      
//       const data = await response.json();

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
//         amount: data.amount,
//         currency: data.currency,
//         order_id: data.orderId,
//         name: "Buy Credits",
//         description: `Purchase ${creditsAmount} API Credits`,
//         handler: function (response: any) {
//           handleBuyCreditsSuccess(response, creditsAmount);
//         },
//         prefill: { email: user.email },
//         theme: { color: "#3399cc" },
//       };

//       const paymentObject = new (window as any).Razorpay(options);
//       paymentObject.open();
//       setBuyCreditsOpen(false);
//     } catch (err) {
//       console.error('Credits purchase failed:', err);
//       setError(`Credits purchase failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
//     }
//   };

//   const handleBuyCreditsSuccess = async (response: any, amount: number) => {
//     try {
//       console.log('Payment success response:', response);
//       const verifyResponse = await fetch(`${API_BASE_URL}/api-payment/verify-payment`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Origin': window.location.origin,
//         },
//         body: JSON.stringify({
//           ...response,
//           credits: amount
//         }),
//       });

//       if (verifyResponse.status === 200) {
//         // Update user's credits
//         const { session, user } = await getSessionAndUser();
//         if (session && user) {
//           const { error: updateError } = await supabase
//             .from('users')
//             .update({
//               user_credits: supabase.sql`user_credits + ${amount}`
//             })
//             .eq('id', user.id);

//           if (updateError) {
//             console.error('Error updating user credits:', updateError);
//             throw new Error('Failed to update user credits');
//           }
//         }

//         setPaymentStatus(`Payment successful! Your account has been credited with ${amount} API credits.`);
//         setCredits(prevCredits => prevCredits + amount);
//       } else {
//         throw new Error('Payment verification failed');
//       }
//     } catch (err) {
//       console.error('Credits purchase verification failed:', err);
//       setError('Credits purchase verification failed');
//     }
//   };

//   const generateApiKey = async () => {
//     try {
//       setError('');
//       setGeneratingKey(true);
//       const { session, user } = await getSessionAndUser();
//       if (!userPlan || userPlan !== 'active' || credits <= 0) {
//         setError('Insufficient credits or invalid plan. Please upgrade your plan.');
//         setGeneratingKey(false);
//         return;
//       }

//       const response = await fetch(`${API_BASE_URL}/api-key/generate-api-key`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId: user?.id }),
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || `HTTP error! status: ${response.status}`);
//       }
//       console.log('Generated API key:', data.apiKey);
//       setApiKey(data.apiKey);
//       setGeneratingKey(false);
//     } catch (err: any) {
//       console.error('API key generation failed:', err);
//       setError(err.message || 'API key generation failed');
//       setGeneratingKey(false);
//     }
//   };

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(apiKey);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error('Failed to copy:', err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center p-8">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#171717] min-h-screen py-8">
      
//       {/* Navbar */}
//       <div className="container mx-auto px-4 mb-8">
//         <nav className="flex flex-col md:flex-row justify-between items-center bg-[#363636] shadow rounded p-4">
//           <div className="flex space-x-6 mb-4 md:mb-0">
//             <Link href="/docs" className="text-gray-800 dark:text-white hover:underline">
//               Docs
//             </Link>
//             <Link href="/models" className="text-gray-800 dark:text-white hover:underline">
//               Supported Models
//             </Link>
//             <Link href="/terms" className="text-gray-800 dark:text-white hover:underline">
//               Terms of services
//             </Link>
//           </div>
//           <div>
//             <span className="text-gray-800 dark:text-white">Know more</span>
//           </div>
//         </nav>
//       </div>

//       {/*
//       // The following Setup Payment Section is commented out as the user is assumed to be paid.
//       {isFirstTimeUser && !hasPaymentSetup && (
//         <div className="container mx-auto px-4 mb-8">
//           <div className="flex flex-col md:flex-row items-center justify-between bg-[#33363D] p-6 rounded shadow">
//             <div>
//               <h2 className="text-xl font-bold text-gray-900 dark:text-white">Setup Payment</h2>
//               <p className="text-gray-700 dark:text-gray-300">
//                 Connect a credit card to start using the API
//               </p>
//             </div>
//             <div className="mt-4 md:mt-0">
//               <button
//                 onClick={handleSetupPayment}
//                 className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Setup
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       */}

//       {/* API Generation Section - Since payment is already set up */}
//       {(!isFirstTimeUser || hasPaymentSetup) && (
//         <div className="container mx-auto px-4">
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded">
//               <p>{error}</p>
//             </div>
//           )}

//           {paymentStatus && (
//             <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-4 rounded">
//               <p>{paymentStatus}</p>
//             </div>
//           )}

//           <div className="flex flex-col items-center justify-center h-auto mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
//               API Generation
//             </h1>
//             {userPlan === 'active' ? (
//               <div className="space-y-4 w-full max-w-md">
//                 <div className="bg-[#33363D] p-6 rounded-lg shadow-md">
//                   <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-2">
//                     <span className="text-white">Current Plan:</span>
//                     <span className="font-semibold capitalize text-white">{userPlan}</span>
//                   </div>
                  
//                   {/* Credits section with buy credits button */}
//                   <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-2">
//                     <span className="text-white">Available Credits:</span>
//                     <div className="flex items-center">
//                       <span className="font-semibold text-white mr-3">{credits}</span>
//                       <button 
//                         onClick={() => setBuyCreditsOpen(true)} 
//                         className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded-md flex items-center"
//                       >
//                         <Plus className="h-3 w-3 mr-1" />
//                         Buy Credits
//                       </button>
//                     </div>
//                   </div>
                  
//                   {/* Current usage section */}
//                   <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-4">
//                     <span className="text-white">Current Usage:</span>
//                     <span className="font-semibold text-white">{currentUsage} credits</span>
//                   </div>
                  
//                   {!apiKey ? (
//                     <button
//                       onClick={generateApiKey}
//                       disabled={credits <= 0 || generatingKey}
//                       className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 flex items-center justify-center"
//                     >
//                       {generatingKey ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
//                       Generate API Key
//                     </button>
//                   ) : (
//                     <div className="space-y-2 w-full">
//                       <div className="p-4 bg-black rounded-lg break-all flex items-center">
//                         <p className="font-mono text-sm text-white flex-grow">{apiKey}</p>
//                         <button
//                           onClick={copyToClipboard}
//                           className="text-blue-400 hover:text-blue-600 ml-2"
//                           title="Copy to clipboard"
//                         >
//                           {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               /* The alternative UI for a non-active plan is commented out for paid users.
//               <div className="text-center space-y-4">
//                 <p className="text-white">No active plan found</p>
//                 <button
//                   onClick={handleSetupPayment}
//                   className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
//                 >
//                   Setup API Access
//                 </button>
//               </div>
//               */
//               null
//             )}
//           </div>
//         </div>
//       )}

//       {/* Buy Credits Modal */}
//       {buyCreditsOpen && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-[#33363D] rounded-lg p-6 max-w-md w-full mx-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-white">Buy Credits</h2>
//         <button onClick={() => setBuyCreditsOpen(false)} className="text-gray-400 hover:text-white">
//           <X className="h-5 w-5" />
//         </button>
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-300 mb-2">Enter amount of credits to purchase:</label>
//         <input
//           type="number"
//           value={creditsAmount}
//           onChange={(e) =>
//             setCreditsAmount(Math.max(1, parseInt(e.target.value) || 1))
//           }
//           className="w-full bg-[#252729] text-white px-4 py-2 rounded-md"
//           min="1"
//         />
//         <p className="text-sm text-gray-400 mt-2">
//           Estimated cost: ${(creditsAmount * 0.05).toFixed(2)}
//         </p>
//       </div>

//       <div className="flex justify-end">
//         <button
//           onClick={handleBuyCredits}
//           className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
//         >
//           Buy Now
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// export default Account;
