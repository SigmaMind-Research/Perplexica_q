import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
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
      className="w-full flex flex-col items-center justify-center mt-5"
    >
      {/* Main Search Bar */}
      <div className="flex items-center bg-light-secondary dark:bg-dark-secondary px-5 py-4 w-full max-w-[500px] border border-light-200 dark:border-dark-200 rounded-lg">
        <TextareaAutosize
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          minRows={2}
          maxRows={6}
          className="bg-transparent placeholder:text-black/50 dark:placeholder:text-white/50 text-sm text-black dark:text-white resize-none focus:outline-none w-full text-center rounded-lg"
          placeholder="Search"
          style={{
            padding: '0', // Remove default padding to allow full centering
            display: 'flex',
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
            textAlign: 'center', // Ensure text aligns to center
            lineHeight: '1.5', // Proper line height for centering
            transform: 'translate(80px, 10px)', // Shift placeholder slightly to left and down
          }}
        />
        <div className="flex flex-row items-center space-x-1 sm:space-x-2">
          <Optimization
            optimizationMode={optimizationMode}
            setOptimizationMode={setOptimizationMode}
          />
          <button
            disabled={message.trim().length === 0}
            className="bg-[#ec7063] hover:bg-opacity-85 transition duration-100 rounded-lg px-2 py-2 text-white font-medium text-xs flex items-center gap-1"
          >
            <span>Send</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Three Small Search Bars for Trending Search */}
      <div className="mt-6 flex w-full justify-between max-w-[500px] space-x-4">
        <input
          type="text"
          className="w-full border rounded-lg py-2 px-4 text-center placeholder:text-black/50 dark:placeholder:text-white/50 text-xs"
          placeholder="Trending Search 1"
        />
        <input
          type="text"
          className="w-full border rounded-lg py-2 px-4 text-center placeholder:text-black/50 dark:placeholder:text-white/50 text-xs"
          placeholder="Trending Search 2"
        />
        <input
          type="text"
          className="w-full border rounded-lg py-2 px-4 text-center placeholder:text-black/50 dark:placeholder:text-white/50 text-xs"
          placeholder="Trending Search 3"
        />
      </div>
    </form>
  );
};

export default EmptyChatMessageInput;
