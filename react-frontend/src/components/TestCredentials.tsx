import React from "react";

export const TestCredentials: React.FC = () => {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 rounded-xl bg-gray-500 dark:bg-gray-900 text-white dark:text-gray-400">
            Test credentials
          </span>
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>Email: eve.holt@reqres.in</p>
        <p>Password: cityslicka</p>
      </div>
    </div>
  );
};
