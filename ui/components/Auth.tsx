'use client';

import React from 'react';

const Auth = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1c1c1c]">
      <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Authentication Features - Stay Tuned!
        </h2>
        
        {/* Sign Up Section */}
        <div className="mb-6">
          <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">
            Sign Up
          </h3>
          <p className="text-gray-500 dark:text-gray-400">We're working on something exciting! Stay tuned for our upcoming Sign Up feature.</p>
        </div>

        {/* Log In Section */}
        <div>
          <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">
            Log In
          </h3>
          <p className="text-gray-500 dark:text-gray-400">Get ready to experience seamless logins! Our Log In feature is coming soon.</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
