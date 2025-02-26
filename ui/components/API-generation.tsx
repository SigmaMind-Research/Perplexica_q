

"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, Copy, Check } from 'lucide-react';
import { getSessionAndUser } from '@/lib/sessionService';
import { supabase } from '@/lib/supabase';

const API_BASE_URL = process.env.NEXT_PUBLIC_SUBSCRIPTION_URL;

const APIGeneration = () => {
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiKey, setApiKey] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [generatingKey, setGeneratingKey] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

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

      // Fetch user plan and credits
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('user_plan, user_credits')
        .eq('id', user.id)
        .single();

      if (userError) throw userError;

      console.log('Fetched user data:', userData);
      // setUserPlan(userData.user_plan);
      setUserPlan('active');
      setCredits(userData.user_credits);
      setLoading(false);
    } catch (err) {
      setUserPlan('active');
      setCredits(5);
      console.error('Error fetching user data:', err);
      setError('Error fetching user data');
      setLoading(false);
    }
  };

  // const handleSetupPayment = async () => {
  //   try {
  //     setError('');
  //     const { session, user } = await getSessionAndUser();
  //     if (!session || !user || user?.is_anonymous) {
  //       window.location.href = '/login';
  //       return;
  //     }
  //     console.log('Creating order for user:', user.id);
  
  //     const response = await fetch(`${API_BASE_URL}/api/api-payment/create-order`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Origin': window.location.origin,
  //       },
  //       body: JSON.stringify({ amount: 5, userId: user.id })
  //     });
  
  //     console.log('Order API response status:', response.status);
  //     if (!response.ok) {
  //       const errorData = await response.text();
  //       console.error('API error response:', errorData);
  //       throw new Error(`API error: ${response.status} - ${errorData}`);
  //     }
  //     const data = await response.json();
  //     console.log('Order data:', data);
  
  //     if (!(window as any).Razorpay) {
  //       console.error('Razorpay SDK not loaded');
  //       setError('Payment system unavailable. Please try again later.');
  //       return;
  //     }
  
  //     const options = {
  //       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_5fCROkV0QkMat9', // Fallback to the test key
  //       amount: data.amount,
  //       currency: data.currency,
  //       order_id: data.orderId,
  //       name: "API Access",
  //       description: "API Access Payment",
  //       handler: function (response: any) {
  //         handlePaymentSuccess(response);
  //       },
  //       prefill: { email: user.email },
  //       theme: { color: "#3399cc" }
  //     };
  
  //     const razorpay = new (window as any).Razorpay(options);
  //     razorpay.open();
  //   } catch (err) {
  //     console.error('Payment initialization failed:', err);
  //     setError(`Payment initialization failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
  //   }
  // };
  const handleSetupPayment = async () => {
    try {
      setError('');
      const { session, user } = await getSessionAndUser();
      if (!session || !user || user?.is_anonymous) {
        window.location.href = '/login';
        return;
      }
      console.log('Creating order for user:', user.id);
  
      const response = await fetch(`${API_BASE_URL}/api-payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin,
        },
        body: JSON.stringify({ amount: 5, userId: user.id })
      });
  
      console.log('Order API response status:', response.status);
      if (!response.ok) {
        const errorData = await response.text();
        console.error('API error response:', errorData);
        throw new Error(`API error: ${response.status} - ${errorData}`);
      }
      const data = await response.json();
      console.log('Order data:', data);
  
      // if (!(window as any).Razorpay) {
      //   console.error('Razorpay SDK not loaded');
      //   setError('Payment system unavailable. Please try again later.');
      //   return;
      // }
  
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Fallback to the test key
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "API Access",
        description: "API Access Payment",
        handler: function (response: any) {
          handlePaymentSuccess(response);
        },
        prefill: { email: user.email },
        theme: { color: "#3399cc" }
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
        body: JSON.stringify(response)
      });

      if (Boolean(verifyResponse.status==200)) {
        const { session, user } = await getSessionAndUser();
        // if (!session || !user || user?.is_anonymous) {
        //   window.location.href = '/login';
        //   return;
        // }
        // const { error: updateError } = await supabase
        //   .from('users')
        //   .update({
        //     user_plan: 'active',
        //     user_credits: 100 // Default credits after payment
        //   })
        //   .eq('id', user?.id);

        // if (updateError) throw updateError;

        // console.log('User plan and credits updated successfully.');
        setPaymentStatus('Payment successful! Your account has been credited with 100 API credits.');
        // checkUserPlanAndCredits(); // Refresh user data
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (err) {
      console.error('Payment verification failed:', err);
      setError('Payment verification failed');
    }
  };

  const generateApiKey = async () => {
    try {
      setError('');
      setGeneratingKey(true);
      const { session, user } = await getSessionAndUser();
      // if (!session || !user || user?.is_anonymous) {
      //   window.location.href = '/login';
      //   return;
      // }
      // console.log('Generating API key - userPlan:', userPlan, 'credits:', credits);
      // const userPlan= 'active';
      if (!userPlan || userPlan !== 'active' || credits <= 0) {
        setError('Insufficient credits or invalid plan. Please upgrade your plan.');
        setGeneratingKey(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api-key/generate-api-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Origin': window.location.origin,
        },
        body: JSON.stringify({ userId: user?.id })
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
            <Link href="/docs" className="text-gray-800 dark:text-white hover:underline">Docs</Link>
            <Link href="/models" className="text-gray-800 dark:text-white hover:underline">Supported Models</Link>
            <Link href="/terms" className="text-gray-800 dark:text-white hover:underline">Terms of services</Link>
          </div>
          <div>
            <span className="text-gray-800 dark:text-white">Know more</span>
          </div>
        </nav>
      </div>

      {/* Setup Payment Section */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#33363D] p-6 rounded shadow">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Setup Payment</h2>
            <p className="text-gray-700 dark:text-gray-300">Connect a credit card to start using the API</p>
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

      {/* API Generation Section */}
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

        <div className="flex flex-col items-center justify-center h-64">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">API Generation</h1>
          {userPlan === 'active' ? (
            <div className="space-y-4 w-full max-w-md">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-white">Current Plan:</span>
                <span className="font-semibold capitalize text-white">{userPlan}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-white">Available Credits:</span>
                <span className="font-semibold text-white">{credits}</span>
              </div>
              {!apiKey ? (
                <button
                  onClick={generateApiKey}
                  disabled={!userPlan || userPlan !== 'active' || credits <= 0 || generatingKey}
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
    </div>
  );
};

export default APIGeneration;
