import React from 'react';
import Link from 'next/link';

const APIGeneration = () => {
  return (
    <div className="bg-[#171717] min-h-screen py-8">
      {/* Centered Navbar with margin */}
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

      {/* Setup Payment Section */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#33363D] p-6 rounded shadow">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Setup Payment</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Connect a credit card to start using the API
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Setup
            </button>
          </div>
        </div>
      </div>

      {/* API Generation Content */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center h-64">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">API Generation</h1>
          <p className="text-gray-700 dark:text-gray-300">
            This is the API Generation page. Build your APIs here!
          </p>
        </div>
      </div>
    </div>
  );
};

export default APIGeneration;
