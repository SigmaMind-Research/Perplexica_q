/*const MessageBoxLoading = () => {
  return (
    <div className="flex justify-end">
      <div className="flex flex-col space-y-2 w-full lg:w-9/12 bg-light-primary dark:bg-dark-primary animate-pulse rounded-lg py-3">
        <div className="h-2 rounded-full w-full bg-light-secondary dark:bg-dark-secondary" />
        <div className="h-2 rounded-full w-9/12 bg-light-secondary dark:bg-dark-secondary" />
        <div className="h-2 rounded-full w-10/12 bg-light-secondary dark:bg-dark-secondary" />
      </div>
    </div>
  );
};


export default MessageBoxLoading;
*/
import { useEffect, useState } from "react";

const MessageBoxLoading = ({ focusMode }: { focusMode: string }) => {
  const [loadingStage, setLoadingStage] = useState("Starting...");

  useEffect(() => {
    let stages = [];

    // Define different progress messages based on focusMode
    if (focusMode === "webSearch") {
      stages = ["Web Searching...", "Analyzing sources...", "Summarizing results..."];
    } else if (focusMode === "reasoning") {
      stages = ["Thinking...", "Reasoning...", "Generating response..."];
    } else {
      stages = ["Processing...", "Analyzing sources...", "Finalizing response..."];
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < stages.length) {
        setLoadingStage(stages[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 2500); // Change text every 2 seconds

    return () => clearInterval(interval);
  }, [focusMode]);

  return (
    <div className="flex justify-end">
      <div className="flex flex-col space-y-2 w-full lg:w-9/12 bg-light-primary dark:bg-dark-primary animate-pulse rounded-lg py-3 px-4">
        <div className="h-2 rounded-full w-full bg-light-secondary dark:bg-dark-secondary" />
        <div className="h-2 rounded-full w-9/12 bg-light-secondary dark:bg-dark-secondary" />
        <div className="h-2 rounded-full w-10/12 bg-light-secondary dark:bg-dark-secondary" />
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{loadingStage}</p>
      </div>
    </div>
  );
};

export default MessageBoxLoading;


// const MessageBoxLoading = () => {
//   return null; // This makes the component not display anything
// };

// export default MessageBoxLoading;
