/*import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import CopilotToggle from './MessageInputActions/Copilot';
import Focus from './MessageInputActions/Focus';
import Optimization from './MessageInputActions/Optimization';

const EmptyChatMessageInput = ({
  sendMessage,
  focusMode,
  setFocusMode,
  optimizationMode,
  setOptimizationMode,
}: {
  sendMessage: (message: string) => void;
  focusMode: string;
  setFocusMode: (mode: string) => void;
  optimizationMode: string;
  setOptimizationMode: (mode: string) => void;
}) => {
  const [copilotEnabled, setCopilotEnabled] = useState(false);
  const [message, setMessage] = useState('');

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;

      const isInputFocused =
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.hasAttribute('contenteditable');

      if (e.key === '/' && !isInputFocused) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    inputRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage(message);
          setMessage('');
        }
      }}
      className="w-full"
    >
      <div className="flex flex-col bg-light-secondary dark:bg-dark-secondary px-5 pt-5 pb-2 rounded-lg w-full border border-light-200 dark:border-dark-200">
        <TextareaAutosize
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          minRows={2}
          className="bg-transparent placeholder:text-black/50 dark:placeholder:text-white/50 text-sm text-black dark:text-white resize-none focus:outline-none w-full max-h-24 lg:max-h-36 xl:max-h-48"
          placeholder="Ask anything..."
        />
        <div className="flex flex-row items-center justify-between mt-4">
          <div className="flex flex-row items-center space-x-4">
            <Focus focusMode={focusMode} setFocusMode={setFocusMode} />
          </div>
          <div className="flex flex-row items-center space-x-1 sm:space-x-4">
            <Optimization
              optimizationMode={optimizationMode}
              setOptimizationMode={setOptimizationMode}
            />
            <button
              disabled={message.trim().length === 0}
              className="bg-[#24A0ED] text-white disabled:text-black/50 dark:disabled:text-white/50 disabled:bg-[#e0e0dc] dark:disabled:bg-[#ececec21] hover:bg-opacity-85 transition duration-100 rounded-full p-2"
            >
              <ArrowRight className="bg-background" size={17} />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EmptyChatMessageInput;


import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import CopilotToggle from './MessageInputActions/Copilot';
import Focus from './MessageInputActions/Focus';
import Optimization from './MessageInputActions/Optimization';
import { createClient } from '@/utils/supabase/client';
import axios from 'axios';

const EmptyChatMessageInput = ({
  sendMessage,
  focusMode,
  setFocusMode,
  optimizationMode,
  setOptimizationMode,
}: {
  sendMessage: (message: string, userId: string) => void;
  focusMode: string;
  setFocusMode: (mode: string) => void;
  optimizationMode: string;
  setOptimizationMode: (mode: string) => void;
}) => {
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;

      const isInputFocused =
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.hasAttribute('contenteditable');

      if (e.key === '/' && !isInputFocused) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    inputRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSendMessage = async () => {
    try {
      // Fetch user session
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        console.error('Failed to fetch session:', error);
        return;
      }

      const userId = data.session.user.id; // Get the user ID from session

      // Send message with userId
      sendMessage(message, userId);
      setMessage('');
      setSuggestions([]); // Clear suggestions after sending message
    } catch (err) {
      console.error('Error retrieving user session:', err);
    }
  };

  const fetchSuggestions = async (input: string) => {
    try {
      const response = await axios.get(`/api/suggest?q=${input}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);

    if (value) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
        }
      }}
      className="w-full"
    >
      <div className="flex flex-col bg-light-secondary dark:bg-dark-secondary px-5 pt-5 pb-2 rounded-lg w-full border border-light-200 dark:border-dark-200">
        <TextareaAutosize
          ref={inputRef}
          value={message}
          onChange={handleInputChange}
          minRows={2}
          className="bg-transparent placeholder:text-black/50 dark:placeholder:text-white/50 text-sm text-black dark:text-white resize-none focus:outline-none w-full max-h-24 lg:max-h-36 xl:max-h-48"
          placeholder="Ask anything..."
        />
        {suggestions.length > 0 && (
          <ul className="bg-white dark:bg-gray-800 border border-light-200 dark:border-dark-200 rounded-lg mt-2 max-h-48 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  setMessage(suggestion);
                  setSuggestions([]);
                  inputRef.current?.focus();
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-row items-center justify-between mt-4">
          <div className="flex flex-row items-center space-x-4">
            <Focus focusMode={focusMode} setFocusMode={setFocusMode} />
          </div>
          <div className="flex flex-row items-center space-x-1 sm:space-x-4">
            <Optimization
              optimizationMode={optimizationMode}
              setOptimizationMode={setOptimizationMode}
            />
            <button
              disabled={message.trim().length === 0}
              className="bg-[#24A0ED] text-white disabled:text-black/50 dark:disabled:text-white/50 disabled:bg-[#e0e0dc] dark:disabled:bg-[#ececec21] hover:bg-opacity-85 transition duration-100 rounded-full p-2"
            >
              <ArrowRight className="bg-background" size={17} />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EmptyChatMessageInput;

*/

// import { ArrowRight } from 'lucide-react';
// import { useEffect, useRef, useState } from 'react';
// import TextareaAutosize from 'react-textarea-autosize';
// import CopilotToggle from './MessageInputActions/Copilot';
// import Focus from './MessageInputActions/Focus';
// import Optimization from './MessageInputActions/Optimization';
// import { createClient } from '@/utils/supabase/client';

// const EmptyChatMessageInput = ({
//   sendMessage,
//   focusMode,
//   setFocusMode,
//   optimizationMode,
//   setOptimizationMode,
// }: {
//   sendMessage: (message: string, userId: string) => void;
//   focusMode: string;
//   setFocusMode: (mode: string) => void;
//   optimizationMode: string;
//   setOptimizationMode: (mode: string) => void;
// }) => {
//   const [message, setMessage] = useState('');
//   const inputRef = useRef<HTMLTextAreaElement | null>(null);

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       const activeElement = document.activeElement;

//       const isInputFocused =
//         activeElement?.tagName === 'INPUT' ||
//         activeElement?.tagName === 'TEXTAREA' ||
//         activeElement?.hasAttribute('contenteditable');

//       if (e.key === '/' && !isInputFocused) {
//         e.preventDefault();
//         inputRef.current?.focus();
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);

//     inputRef.current?.focus();

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);

//   const handleSendMessage = async () => {
//     try {
//       // Fetch user session
//       const supabase = createClient()
//       const { data, error } = await supabase.auth.getSession();

//       if (error || !data.session) {
//         console.error('Failed to fetch session:', error);
//         return;
//       }

//       const userId = data.session.user.id; // Get the user ID from session

//       // Send message with userId
//       sendMessage(message, userId);
//       setMessage('');
//       // console.log(userId);
//     } catch (err) {
//       console.error('Error retrieving user session:', err);
//     }
//   };

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         handleSendMessage();
//       }}
//       onKeyDown={(e) => {
//         if (e.key === 'Enter' && !e.shiftKey) {
//           e.preventDefault();
//           handleSendMessage();
//         }
//       }}
//       className="w-full"
//     >
//       <div className="flex flex-col bg-light-secondary dark:bg-dark-secondary px-5 pt-5 pb-2 rounded-lg w-full border border-light-200 dark:border-dark-200">
//         <TextareaAutosize
//           ref={inputRef}
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           minRows={2}
//           className="bg-transparent placeholder:text-black/50 dark:placeholder:text-white/50 text-sm text-black dark:text-white resize-none focus:outline-none w-full max-h-24 lg:max-h-36 xl:max-h-48"
//           placeholder="Ask anything..."
//         />
//         <div className="flex flex-row items-center justify-between mt-4">
//           <div className="flex flex-row items-center space-x-4">
//             <Focus focusMode={focusMode} setFocusMode={setFocusMode} />
//           </div>
//           <div className="flex flex-row items-center space-x-1 sm:space-x-4">
//             <Optimization
//               optimizationMode={optimizationMode}
//               setOptimizationMode={setOptimizationMode}
//             />
//             <button
//               disabled={message.trim().length === 0}
//               className="bg-[#24A0ED] text-white disabled:text-black/50 dark:disabled:text-white/50 disabled:bg-[#e0e0dc] dark:disabled:bg-[#ececec21] hover:bg-opacity-85 transition duration-100 rounded-full p-2"
//             >
//               <ArrowRight className="bg-background" size={17} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default EmptyChatMessageInput;

import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Focus from './MessageInputActions/Focus';
import Optimization from './MessageInputActions/Optimization';
import { createClient } from '@/utils/supabase/client';
import { Lightbulb } from 'lucide-react';
import { getSessionAndUser } from '@/lib/sessionService';

const EmptyChatMessageInput = ({
  sendMessage,
  focusMode,
  setFocusMode,
  optimizationMode,
  setOptimizationMode,
}: {
  sendMessage: (message: string, userId: string) => void;
  focusMode: string;
  setFocusMode: (mode: string) => void;
  optimizationMode: string;
  setOptimizationMode: (mode: string) => void;
}) => {
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]); // For search suggestions
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [r1Mode, setR1Mode] = useState(false);

  
  // New: store authenticated user (or null if not authenticated)
  const [user, setUser] = useState<any>(undefined);

  // Fetch the current user session on mount using centralized session handling.
  useEffect(() => {
    async function fetchUser() {
      const { user } = await getSessionAndUser();
      setUser(user);
    }
    fetchUser();
  }, []);


  // Fetch suggestions from the Google Suggest API
  const fetchSuggestions = async (query: string) => {
    if (query.trim()) {
      try {
        // const googleSuggestUrl = `http://suggestqueries.google.com/complete/search?output=firefox&q=${encodeURIComponent(query)}`;
        // const response = await fetch(googleSuggestUrl,{mode:'no-cors'});
        const response = await fetch(
          `/api/suggestions?query=${encodeURIComponent(query)}`,
        );
        if (!response.ok) {
          throw new Error('No suggested query');
        }

        const data = await response.json();
        // console.log('Suggestions fetched:', data); // Log the suggestions

        // The suggestions are in the second element of the returned array
        if (Array.isArray(data[1])) {
          setSuggestions(data[1]); // Set suggestions to the second element of the response
        } else {
          console.error('Unexpected data format:', data);
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;

      const isInputFocused =
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.hasAttribute('contenteditable');

      if (e.key === '/' && !isInputFocused) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    inputRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSendMessage = async () => {
    try {
      // Fetch user session
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        console.error('Failed to fetch session:', error);
        return;
      }

      const userId = data.session.user.id; // Get the user ID from session
      const formattedMessage = r1Mode ? `${message}` : message; // Get the user ID from session for r1 mode

      // Send message with userId
      sendMessage(formattedMessage,userId);
      setMessage('');
      setSuggestions([]); // Clear suggestions after sending the message
    } catch (err) {
      console.error('Error retrieving user session:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    // console.log('Input changed:', value); // Log input changes
    setMessage(value);
    fetchSuggestions(value); // Fetch suggestions as the user types
  };

  const handleSuggestionClick = (suggestion: string) => {
    // console.log('Suggestion clicked:', suggestion); // Log clicked suggestion
    setMessage(suggestion);
    setSuggestions([]); // Clear suggestions after selecting one
    inputRef.current?.focus();
  };

  // Handler for R1 mode toggle - moved outside of the JSX
  const handleR1ModeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Redirect to login if not authenticated.
    if (!user || user.is_anonymous) {
      window.location.href = '/login';
      return;
    }
    
    // Toggle R1 mode
    const newR1Mode = !r1Mode;
    setR1Mode(newR1Mode);
    
    // Set focus mode based on new R1 mode value
    if (newR1Mode) {
      setFocusMode('reasoning');
    } else {
      setFocusMode('webSearch');
    }
  };


  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
        }
      }}
      className="w-full"
    >
      <div className="flex flex-col bg-light-secondary dark:bg-dark-secondary px-5 pt-5 pb-2 rounded-lg w-full border border-light-200 dark:border-dark-200">
        <TextareaAutosize
          ref={inputRef}
          value={message}
          onChange={handleInputChange}
          minRows={2}
          className="bg-transparent placeholder:text-black/50 dark:placeholder:text-white/50 text-sm text-black dark:text-white resize-none focus:outline-none w-full max-h-24 lg:max-h-36 xl:max-h-48"
          // placeholder={r1Mode ? "Ask R1 anything..." : "Ask anything..."}
          placeholder={"Ask anything..."}

        />

        <div className="flex flex-row items-center justify-between mt-4 relative z-20">
          <div className="flex flex-row items-center space-x-4">
            <Focus focusMode={focusMode} setFocusMode={setFocusMode} r1Mode={r1Mode} />

            <button
              type="button"
              onClick={handleR1ModeToggle}
              className={`group flex items-center space-x-0 px-2 py-1 -mt-2 rounded-full border-2 transition duration-200 ${
                r1Mode
                  ? 'bg-light-secondary dark:bg-dark-secondary text-[#24A0ED] border-[#24A0ED]'
                  : 'text-black/50 dark:text-white/50 hover:bg-light-secondary dark:hover:bg-dark-secondary active:bg-light-secondary dark:active:bg-dark-secondary focus:bg-light-secondary dark:focus:bg-dark-secondary border-black/50 dark:border-white/50'
              }`}
            >
              <Lightbulb
                size={15}
                className="fill-current text-inherit group-hover:text-yellow-400 group-focus:text-yellow-400 group-active:text-yellow-400"
              />
              <span className="font-medium text-xs">R1</span>
            </button>
          </div>
          <div className="flex flex-row items-center space-x-1 sm:space-x-4">
            <Optimization
              optimizationMode={optimizationMode}
              setOptimizationMode={setOptimizationMode}
            />
            <button
              disabled={message.trim().length === 0}
              className="bg-[#24A0ED] text-white disabled:text-black/50 dark:disabled:text-white/50 disabled:bg-[#e0e0dc] dark:disabled:bg-[#ececec21] hover:bg-opacity-85 transition duration-100 rounded-full p-2"
            >
              <ArrowRight className="bg-background" size={17} />
            </button>
          </div>
        </div>
        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="relative flex flex-col bg-light-secondary dark:bg-dark-secondary px-5 pt-5 pb-2 rounded-lg w-full border border-light-200 dark:border-dark-200 w-full z-10 mt-2  ">
            {suggestions.slice(0, 6).map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-white transition-all"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
};

export default EmptyChatMessageInput;










































