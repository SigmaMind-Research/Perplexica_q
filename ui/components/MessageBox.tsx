// 'use client';

// /* eslint-disable @next/next/no-img-element */
// import React, { MutableRefObject, useEffect, useState } from 'react';
// import { Message } from './ChatWindow';
// import { cn } from '@/lib/utils';
// import {
//   BookCopy,
//   Disc3,
//   Volume2,
//   StopCircle,
//   Layers3,
//   Plus,
// } from 'lucide-react';
// import Markdown from 'markdown-to-jsx';
// import Copy from './MessageActions/Copy';
// import Rewrite from './MessageActions/Rewrite';
// import MessageSources from './MessageSources';
// import SearchImages from './SearchImages';
// import SearchVideos from './SearchVideos';
// import { useSpeech } from 'react-text-to-speech';

// const MessageBox = ({
//   message,
//   messageIndex,
//   history,
//   loading,
//   dividerRef,
//   isLast,
//   rewrite,
//   sendMessage,
// }: {
//   message: Message;
//   messageIndex: number;
//   history: Message[];
//   loading: boolean;
//   dividerRef?: MutableRefObject<HTMLDivElement | null>;
//   isLast: boolean;
//   rewrite: (messageId: string) => void;
//   sendMessage: (message: string) => void;
// }) => {
//   const [parsedMessage, setParsedMessage] = useState(message.content);
//   const [speechMessage, setSpeechMessage] = useState(message.content);

//   useEffect(() => {
//     const regex = /\[(\d+)\]/g;

//     if (
//       message.role === 'assistant' &&
//       message?.sources &&
//       message.sources.length > 0
//     ) {
//       return setParsedMessage(
//         message.content.replace(
//           regex,
//           (_, number) =>
//             `<a href="${message.sources?.[number - 1]?.metadata?.url}" target="_blank" className="bg-light-secondary dark:bg-dark-secondary px-1 rounded ml-1 no-underline text-xs text-black/70 dark:text-white/70 relative">${number}</a>`,
//         ),
//       );
//     }

//     setSpeechMessage(message.content.replace(regex, ''));
//     setParsedMessage(message.content);
//   }, [message.content, message.sources, message.role]);

//   const { speechStatus, start, stop } = useSpeech({ text: speechMessage });

//   return (
//     <div>
//       {message.role === 'user' && (
//         <div className={cn('w-full', messageIndex === 0 ? 'pt-16' : 'pt-8')}>
//           <h2 className="text-black dark:text-white font-medium text-3xl lg:w-9/12">
//             {message.content}
//           </h2>
//         </div>
//       )}

//       {message.role === 'assistant' && (
//         <div className="flex flex-col space-y-9 lg:space-y-0 lg:flex-row lg:justify-between lg:space-x-9">
//           <div
//             ref={dividerRef}
//             className="flex flex-col space-y-6 w-full lg:w-9/12"
//           >
//             {message.sources && message.sources.length > 0 && (
//               <div className="flex flex-col space-y-2">
//                 <div className="flex flex-row items-center space-x-2">
//                   <BookCopy className="text-black dark:text-white" size={20} />
//                   <h3 className="text-black dark:text-white font-medium text-xl">
//                     Sources
//                   </h3>
//                 </div>
//                 <MessageSources sources={message.sources} />
//               </div>
//             )}
//             <div className="flex flex-col space-y-2">
//               <div className="flex flex-row items-center space-x-2">
//                 <Disc3
//                   className={cn(
//                     'text-black dark:text-white',
//                     isLast && loading ? 'animate-spin' : 'animate-none',
//                   )}
//                   size={20}
//                 />
//                 <h3 className="text-black dark:text-white font-medium text-xl">
//                   Answer
//                 </h3>
//               </div>
//               <Markdown
//                 className={cn(
//                   'prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0',
//                   'max-w-none break-words text-black dark:text-white text-sm md:text-base font-medium',
//                 )}
//               >
//                 {parsedMessage}
//               </Markdown>
//               {loading && isLast ? null : (
//                 <div className="flex flex-row items-center justify-between w-full text-black dark:text-white py-4 -mx-2">
//                   <div className="flex flex-row items-center space-x-1">
//                     {/*  <button className="p-2 text-black/70 dark:text-white/70 rounded-xl hover:bg-light-secondary dark:hover:bg-dark-secondary transition duration-200 hover:text-black text-black dark:hover:text-white">
//                       <Share size={18} />
//                     </button> */}
//                     <Rewrite rewrite={rewrite} messageId={message.messageId} />
//                   </div>
//                   <div className="flex flex-row items-center space-x-1">
//                     <Copy initialMessage={message.content} message={message} />
//                     <button
//                       onClick={() => {
//                         if (speechStatus === 'started') {
//                           stop();
//                         } else {
//                           start();
//                         }
//                       }}
//                       className="p-2 text-black/70 dark:text-white/70 rounded-xl hover:bg-light-secondary dark:hover:bg-dark-secondary transition duration-200 hover:text-black dark:hover:text-white"
//                     >
//                       {speechStatus === 'started' ? (
//                         <StopCircle size={18} />
//                       ) : (
//                         <Volume2 size={18} />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )}
//               {isLast &&
//                 message.suggestions &&
//                 message.suggestions.length > 0 &&
//                 message.role === 'assistant' &&
//                 !loading && (
//                   <>
//                     <div className="h-px w-full bg-light-secondary dark:bg-dark-secondary" />
//                     <div className="flex flex-col space-y-3 text-black dark:text-white">
//                       <div className="flex flex-row items-center space-x-2 mt-4">
//                         <Layers3 />
//                         <h3 className="text-xl font-medium">Related</h3>
//                       </div>
//                       <div className="flex flex-col space-y-3">
//                         {message.suggestions.map((suggestion, i) => (
//                           <div
//                             className="flex flex-col space-y-3 text-sm"
//                             key={i}
//                           >
//                             <div className="h-px w-full bg-light-secondary dark:bg-dark-secondary" />
//                             <div
//                               onClick={() => {
//                                 sendMessage(suggestion);
//                               }}
//                               className="cursor-pointer flex flex-row justify-between font-medium space-x-2 items-center"
//                             >
//                               <p className="transition duration-200 hover:text-[#24A0ED]">
//                                 {suggestion}
//                               </p>
//                               <Plus
//                                 size={20}
//                                 className="text-[#24A0ED] flex-shrink-0"
//                               />
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </>
//                 )}
//             </div>
//           </div>
//           <div className="lg:sticky lg:top-20 flex flex-col items-center space-y-3 w-full lg:w-3/12 z-30 h-full pb-4">
//             <SearchImages
//               query={history[messageIndex - 1].content}
//               chatHistory={history.slice(0, messageIndex - 1)}
//             />
//             <SearchVideos
//               chatHistory={history.slice(0, messageIndex - 1)}
//               query={history[messageIndex - 1].content}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageBox;

'use client';

/* eslint-disable @next/next/no-img-element */
import React, { MutableRefObject, useEffect, useState } from 'react';
import { Message } from './ChatWindow'; // Importing the Message type for typing props
import { cn } from '@/lib/utils'; // Utility function for conditional class names
import { BookCopy, Layers3, Plus, X } from 'lucide-react'; // Icons for UI
import Markdown from 'markdown-to-jsx'; // Component to render markdown as JSX
import Rewrite from './MessageActions/Rewrite'; // Custom component to handle message rewrite
import { useSpeech } from 'react-text-to-speech'; // Hook to use text-to-speech functionality

// MessageBox component receives message, messageIndex, history, loading, and other props to display individual messages.
const MessageBox = (props: {
  message: Message; // The current message to display
  messageIndex: number; // Index of the message in the message history
  history: Message[]; // Full message history
  loading: boolean; // Whether the message is still loading
  dividerRef?: MutableRefObject<HTMLDivElement | null>; // Optional ref for divider element
  isLast: boolean; // Whether this is the last message
  rewrite: (messageId: string) => void; // Function to rewrite a message
  sendMessage: (message: string) => void; // Function to send a message
}) => {
  const { message, messageIndex, loading, dividerRef, isLast, rewrite } = props;

  const [parsedMessage, setParsedMessage] = useState(message.content); // State for parsed message
  const [speechMessage, setSpeechMessage] = useState(message.content); // State for text-to-speech content
  const [showSourceCard, setShowSourceCard] = useState(false); // State to toggle visibility of source card

  useEffect(() => {
    const regex = /\[(\d+)\]/g; // Regex to identify sources in the message content

    // If the message is from the assistant and has sources, replace source indices with links to the sources
    if (message.role === 'assistant' && message.sources && message.sources.length > 0) {
      setParsedMessage(
        message.content.replace(
          regex,
          (_, number) =>
            `<a href="${message.sources?.[number - 1]?.metadata?.url}" target="_blank" class="bg-light-secondary dark:bg-dark-secondary px-1 rounded ml-1 no-underline text-xs text-black/70 dark:text-white/70 relative">${number}</a>`
        )
      );
    }
    setSpeechMessage(message.content.replace(regex, '')); // Remove the source indices for text-to-speech
    setParsedMessage(message.content); // Set the parsed message content
  }, [message.content, message.sources, message.role]);

  const { speechStatus, start, stop } = useSpeech({ text: speechMessage }); // Initialize speech functionality

  return (
    <div className="ml-auto w-full max-w-6xl relative overflow-hidden-scrollable" style={{ right: '0.1rem' }}>
      {/* Display the user message */}
      {message.role === 'user' && (
        <div className={cn('w-full', messageIndex === 0 ? 'pt-16' : 'pt-8')}>
          <h2 className="text-black dark:text-white flex justify-center items-center font-medium text-4xl lg:w-full xl:w-[95%]">
            {message.content}
          </h2>
        </div>
      )}

      {/* Display the assistant message */}
      {message.role === 'assistant' && (
        <div className="flex flex-col space-y-9 lg:space-y-0 lg:flex-row lg:space-x-12">
          {/* Display source icons if available */}
          {message.sources && message.sources.length > 0 && (
  <div className="flex items-center space-x-1 mb-0 lg:hidden ml-8 mt-1">
    <div className="bg-[#abb2b9] p-2 flex items-center space-x-1 rounded-lg">
      {message.sources.slice(0, 8).map((source, index) => {  // Display only the first 8 sources
        const sourceUrl = source.metadata?.url;
        const faviconUrl = `${new URL(sourceUrl).origin}/favicon.ico`; // Get the favicon from the source URL
        return (
          <button
            key={index}
            onClick={() => setShowSourceCard(true)} // Toggle source card visibility
            className="p-1 rounded-full transition-all duration-200 ease-in-out"
          >
            <div className="w-4 h-4 bg-white rounded-full flex justify-center items-center">
              <img
                src={faviconUrl} // Favicon image for the source
                alt={`Favicon for ${sourceUrl}`}
                className="w-4 h-4 object-cover rounded-full transition-transform duration-200 ease-in-out hover:scale-125"
                onError={(e) => ((e.target as HTMLImageElement).src = '/default-favicon.ico')} // Fallback if the favicon is not available
              />
            </div>
          </button>
        );
      })}
      {message.sources.length > 9 && (
        <div className="text-xs text-black cursor-pointer ml-2" onClick={() => setShowSourceCard(true)}>
        see more..
        </div>
      )}
    </div>
  </div>
)}



          {/* Show source card when sources are available and clicked */} 
          {showSourceCard && (
            <div className="fixed top-0 right-0 h-full w-2/3 bg-white dark:bg-black p-4 shadow-lg z-50 flex flex-col">
              <button className="self-end mb-4" onClick={() => setShowSourceCard(false)}>
                <X size={24} className="text-black dark:text-white" /> {/* Close button */}
              </button>
              <h3 className="text-black dark:text-white font-medium text-lg mb-4">Sources</h3>
              {message.sources.map((source, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <img
                    src={`${new URL(source.metadata?.url || '').origin}/favicon.ico`}
                    alt={`Favicon for ${source.metadata?.url}`}
                    className="w-4 h-4 object-cover rounded-md"
                    onError={(e) => ((e.target as HTMLImageElement).src = '/default-favicon.ico')}
                  />
                  <a
                    href={source.metadata?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-black dark:text-white break-words max-w-full truncate"
                    style={{ wordBreak: 'break-word' }}
                  >
                    {source.metadata?.url}
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Desktop version of source card */}
          <div className="hidden lg:block flex flex-col w-full lg:w-3/12 ml-[-6rem]">
            {message.sources && message.sources.length > 0 && (
              <div className="p-4 m-1 bg-[#212f3d] rounded-lg border border-gray-300 dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-3">
                  <BookCopy className="text-black dark:text-white" size={20} />
                  <h3 className="text-black dark:text-white font-medium text-lg">Sources</h3>
                </div>
                <div className="space-y-2">
                  {message.sources.map((source, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <img
                        src={`${new URL(source.metadata?.url || '').origin}/favicon.ico`}
                        alt={`Favicon for ${source.metadata?.url}`}
                        className="w-4 h-4 object-cover rounded-md"
                        onError={(e) => ((e.target as HTMLImageElement).src = '/default-favicon.ico')}
                      />
                      <a
                        href={source.metadata?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-black dark:text-white break-words max-w-full truncate"
                        style={{ wordBreak: 'break-word' }}
                      >
                        {source.metadata?.url}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main content with message and suggestions */}
          <div ref={dividerRef} className="flex flex-col space-y-4 w-full lg:w-6/12">
            <div className="bg-[#212f3d] p-4 rounded-lg shadow-md">
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row items-center space-x-2">
                  <Rewrite rewrite={rewrite} messageId={message.messageId} /> {/* Rewrite button */}
                </div>
                {/* Render parsed message content using markdown */}
                <Markdown
                  className={cn(
                    'prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0',
                    'max-w-none break-words text-black dark:text-white text-xs md:text-sm font-medium'
                  )}
                >
                  {parsedMessage}
                </Markdown>
              </div>

              {/* Show related suggestions if available */}
              {isLast && !loading && message.suggestions && message.suggestions.length > 0 && (
                <>
                  <div className="h-px w-full bg-light-secondary dark:bg-dark-secondary" />
                  <div className="flex flex-col space-y-3 text-black dark:text-white">
                    <div className="flex flex-row items-center space-x-2 mt-4">
                      <Layers3 />
                      <h3 className="text-xl font-medium">Related</h3>
                    </div>
                    <div className="flex flex-col space-y-3">
                      {message.suggestions.map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => props.sendMessage(suggestion)}
                          className="bg-light-primary dark:bg-dark-primary text-white w-full text-left p-2 rounded-lg"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBox;
