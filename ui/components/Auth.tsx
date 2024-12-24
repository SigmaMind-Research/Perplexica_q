// 'use client';

// import React from 'react';

// const Auth = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-[#1c1c1c]">
//       <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto">
//         <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
//           Authentication Features - Stay Tuned!
//         </h2>
        
//         {/* Sign Up Section */}
//         <div className="mb-6">
//           <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">
//             Sign Up
//           </h3>
//           <p className="text-gray-500 dark:text-gray-400">We're working on something exciting! Stay tuned for our upcoming Sign Up feature.</p>
//         </div>

//         {/* Log In Section */}
//         <div>
//           <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">
//             Log In
//           </h3>
//           <p className="text-gray-500 dark:text-gray-400">Get ready to experience seamless logins! Our Log In feature is coming soon.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;



'use client';

import React, { useState } from "react";
import LoginForm from "@/app/login/LoginForm"; // Make sure the LoginForm is correctly imported

const Auth = () => {
  const [showLogin, setShowLogin] = useState(false); // State to toggle the login form visibility

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1c1c1c]">
      <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Welcome Back!
        </h2>

        {/* Log In Section */}
        <div>
          <button
            onClick={() => setShowLogin(!showLogin)} // Toggle login form visibility
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
          >
            {showLogin ? "Close Login Form" : "Login"}
          </button>
        </div>

        {/* Conditionally render LoginForm */}
        {showLogin && <LoginForm />}
      </div>
    </div>
  );
};

export default Auth;
