// const MessageBoxLoading = () => {
//   return (
//     <div className="flex justify-end">
//       <div className="flex flex-col space-y-2 w-full lg:w-9/12 bg-light-primary dark:bg-dark-primary animate-pulse rounded-lg py-3">
//         <div className="h-2 rounded-full w-full bg-light-secondary dark:bg-dark-secondary" />
//         <div className="h-2 rounded-full w-9/12 bg-light-secondary dark:bg-dark-secondary" />
//         <div className="h-2 rounded-full w-10/12 bg-light-secondary dark:bg-dark-secondary" />
//       </div>
//     </div>
//   );
// };

// export default MessageBoxLoading;
// MessageBoxLoading.js

import React from 'react';

const MessageBoxLoading = ({ r1Mode }: { r1Mode: boolean }) => {
  return (
    <>
      <style>
        {`
          @keyframes typewriter {
            from { width: 0; }
            to { width: 100%; }
          }

          @keyframes blink-caret {
            from, to { border-color: transparent; }
            50% { border-color: orange; }
          }
        `}
      </style>
      <div className="flex justify-end">
        {r1Mode ? (
          <div className="flex items-center space-x-2 w-full lg:w-9/12 bg-light-primary dark:bg-dark-primary rounded-lg py-3">
            <span
              className="text-md text-gray-500 dark:text-gray-400 animate-float"
              style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                letterSpacing: '.12em',
                animation:'typewriter 1.5s steps(40, end) infinite, blink-caret .75s step-end infinite',
                maxWidth: '100%',
              }}
            >
              Generating response...
            </span>
          </div>
        ) : (
          <div className="flex flex-col space-y-2 w-full lg:w-9/12 bg-light-primary dark:bg-dark-primary animate-pulse rounded-lg py-3">
            <div className="h-2 rounded-full w-full bg-light-secondary dark:bg-dark-secondary" />
            <div className="h-2 rounded-full w-9/12 bg-light-secondary dark:bg-dark-secondary" />
            <div className="h-2 rounded-full w-10/12 bg-light-secondary dark:bg-dark-secondary" />
          </div>
        )}
      </div>
    </>
  );
};

export default MessageBoxLoading;

// const MessageBoxLoading = () => {
//   return null; // This makes the component not display anything
// };

// export default MessageBoxLoading;
