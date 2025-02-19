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
//           {/* search images and search videos */}
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
//   X,
//   Link,
// } from 'lucide-react';
// import Markdown from 'markdown-to-jsx';
// import Copy from './MessageActions/Copy';
// import Rewrite from './MessageActions/Rewrite';
// import { useSpeech } from 'react-text-to-speech';
// import SearchImages from './SearchImages';
// import SearchVideos from './SearchVideos';

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
//   const [showPanel, setShowPanel] = useState(false);

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
//           <h2 className="text-black dark:text-white font-medium text-3xl lg:w-9/12 mx-auto text-center mr-2 break-words">
//             {message.content}
//           </h2>
//         </div>
//       )}

//       {message.role === 'assistant' && (
//         <div className="flex flex-col lg:flex-row lg:space-x-9 lg:justify-between">
//           {/* Sources for small screens */}
//           <div className="lg:w-3/12 flex flex-col space-y-4 pb-4 lg:order-none order-first">
//             {message.sources && message.sources.length > 0 && (
//               <div className="flex flex-col space-y-1 mt-4">
//                 <div className="flex flex-row items-center space-x-2">
//                   {/* <BookCopy className="text-black dark:text-white" size={20} /> */}
//                   {/* <h3 className="text-black dark:text-white font-medium text-xl">
//                     Sources
//                   </h3> */}
//                 </div>

//                 {/* Sources grouping for small screens */}
//                 <div
//                   onClick={() => setShowPanel(true)} // Click handler for the entire container
//                   className="lg:hidden flex flex-wrap items-center space-x-1 p-3 m-4 rounded-lg bg-light-secondary dark:bg-dark-secondary shadow-md hover:scale-105 transition-transform cursor-pointer"
//                 >
//                   <div className="w-full flex items-center justify-start text-xs font-semibold text-black dark:text-white mb-2">
//                     <button
//                       onClick={(e) => e.stopPropagation()} // Prevent triggering the container's onClick
//                       className="text-blue-500 hover:text-blue-700 p-1 flex items-center ml-2"
//                     >
//                       <Link className="text-sm" />
//                     </button>
//                     <span>Show All</span>
//                   </div>

//                   {message.sources.slice(0, 10).map((source, i) => (
//                     <div
//                       key={i}
//                       onClick={(e) => {
//                         e.stopPropagation(); // Prevent triggering the container's onClick
//                         setShowPanel(true); // Optional: Specific behavior for individual items
//                       }}
//                       className="flex items-center justify-center p-1 rounded-lg bg-light-secondary dark:bg-dark-secondary cursor-pointer"
//                     >
//                       <img
//                         src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
//                         width={20}
//                         height={20}
//                         alt="favicon"
//                         className="rounded-full"
//                       />
//                     </div>
//                   ))}

//                   {message.sources.length > 10 && (
//                     <div
//                       onClick={(e) => e.stopPropagation()} // Prevent triggering the container's onClick
//                       className="flex items-center justify-center p-1 rounded-lg bg-light-secondary dark:bg-dark-secondary text-xs text-black/70 dark:text-white/70"
//                     >
//                       +{message.sources.length - 10} more...
//                     </div>
//                   )}
//                 </div>

//                 {/* Card wrapping the sources for large screens */}
//                 <div className="hidden lg:flex flex-col space-y-1 p-3 rounded-lg bg-light-secondary dark:bg-dark-secondary shadow-md">
//                   <h2 className="text-sm text-black dark:text-white mb-1">
//                     Resources
//                   </h2>
//                   <hr className="border-t border-gray-500" />

//                   {message.sources.map((source, i) => (
//                     <div
//                       key={i}
//                       className="source-card flex flex-col space-y-1 p-2 mb-1 rounded-lg bg-light-secondary dark:bg-dark-secondary shadow-md w-full lg:w-12/12 mx-auto"
//                     >
//                       <a
//                         href={source.metadata.url}
//                         target="_blank"
//                         className="source-info flex flex-col space-y-1 font-medium"
//                       >
//                         <div className="hidden lg:flex flex-col">
//                           <p className="text-xs text-black/70 dark:text-white/70 overflow-hidden whitespace-nowrap text-ellipsis">
//                             {source.metadata.title}
//                           </p>
//                           <div className="flex flex-row items-center justify-between">
//                             <div className="flex flex-row items-center space-x-1">
//                               <img
//                                 src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
//                                 width={20}
//                                 height={20}
//                                 alt="favicon"
//                                 className="rounded-lg h-4 w-4"
//                               />
//                               <p className="text-xs text-black/50 dark:text-white/50 overflow-hidden whitespace-nowrap text-ellipsis">
//                                 {source.metadata.url.replace(
//                                   /.+\/\/|www.|\..+/g,
//                                   '',
//                                 )}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </a>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Sliding Panel for small screens */}
//           {showPanel && (
//             <div className="fixed top-0 right-0 h-full w-4/4 sm:w-3/3 lg:hidden bg-white dark:bg-black shadow-lg z-50 overflow-y-auto">
//               <div className="flex justify-between items-center p-3 border-b border-light-secondary dark:border-dark-secondary">
//                 <h3 className="text-xl font-medium text-black dark:text-white">
//                   Links
//                 </h3>
//                 <button
//                   onClick={() => setShowPanel(false)}
//                   className="text-black dark:text-white"
//                 >
//                   <X size={20} />
//                 </button>
//               </div>
//               <div className="p-4">
//                 {message.sources &&
//                   message.sources.map((source, i) => (
//                     <div
//                       key={i}
//                       className="block p-2 mb-1 bg-light-secondary dark:bg-dark-secondary rounded-lg shadow-md"
//                     >
//                       <div className="flex flex-row items-center space-x-2 cursor-pointer">
//                         {/* Make the favicon clickable */}
//                         <a
//                           href={source.metadata.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           <img
//                             src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
//                             width={20}
//                             height={20}
//                             alt="favicon"
//                             className="rounded-full"
//                           />
//                         </a>
//                         <div>
//                           {/* Make the title clickable */}
//                           <a
//                             href={source.metadata.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-sm text-black dark:text-white truncate max-w-[200px] sm:max-w-[300px] block"
//                           >
//                             {source.metadata.title}
//                           </a>
//                           {/* Make the URL clickable */}
//                           <a
//                             href={source.metadata.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-xs text-black/50 dark:text-white/50 overflow-hidden whitespace-nowrap text-ellipsis block"
//                           >
//                             {source.metadata.url.replace(
//                               /.+\/\/|www.|\..+/g,
//                               '',
//                             )}
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           )}

//           {/* Main Content */}
//           <div className="flex flex-col space-y-9 lg:w-9/12">
//             <div ref={dividerRef} className="flex flex-col space-y-6">
//               <div className="flex flex-col space-y-2">
//                 {/*<div className="flex flex-row space-x-4 overflow-x-auto w-3/4 mx-auto ml-7">
//                   <SearchImages
//                     query={
//                       messageIndex > 0 ? history[messageIndex - 1]?.content : ''
//                     }
//                     chatHistory={history.slice(0, messageIndex - 1)}
//                   />
//                   <SearchVideos
//                     chatHistory={history.slice(0, messageIndex - 1)}
//                     query={
//                       messageIndex > 0 ? history[messageIndex - 1]?.content : ''
//                     }
//                   />
//                 </div>*/}
//                 <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8 w-full lg:w-3/4 z-30 h-full pb-4">
//                   <div className="w-full lg:w-full mb-4 lg:mb-0">
//                     <SearchImages
//                       query={history[messageIndex - 1].content}
//                       chatHistory={history.slice(0, messageIndex - 1)}
//                     />
//                   </div>
//                   <div className="w-full lg:w-full">
//                     <SearchVideos
//                       chatHistory={history.slice(0, messageIndex - 1)}
//                       query={history[messageIndex - 1].content}
//                     />
//                   </div>
//                 </div>

//                 <div className="flex flex-row items-center space-x-2">
//                   <Disc3
//                     className={cn(
//                       'text-black dark:text-white',
//                       isLast && loading ? 'animate-spin' : 'animate-none',
//                     )}
//                     size={20}
//                   />

//                   <h3 className="text-black dark:text-white font-medium text-xl">
//                     Answer
//                   </h3>
//                 </div>

//                 <Markdown
//                   className={cn(
//                     'prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0',
//                     'max-w-none break-words text-black dark:text-white text-sm md:text-base font-medium',
//                   )}
//                 >
//                   {parsedMessage}
//                 </Markdown>
//                 {loading && isLast ? null : (
//                   <div className="flex flex-row items-center justify-between w-full text-black dark:text-white py-4 -mx-2">
//                     <div className="flex flex-row items-center space-x-1">
//                       <Rewrite
//                         rewrite={rewrite}
//                         messageId={message.messageId}
//                       />
//                     </div>
//                     <div className="flex flex-row items-center space-x-1">
//                       <Copy
//                         initialMessage={message.content}
//                         message={message}
//                       />
//                       {/* <button
//                         onClick={() => {
//                           if (speechStatus === 'started') {
//                             stop();
//                           } else {
//                             start();
//                           }
//                         }}
//                         className="p-2 text-black/70 dark:text-white/70 rounded-xl hover:bg-light-secondary dark:hover:bg-dark-secondary transition duration-200 hover:text-black dark:hover:text-white"
//                       >
//                         {speechStatus === 'started' ? (
//                           <StopCircle size={18} />
//                         ) : (
//                           <Volume2 size={18} />
//                         )}
//                       </button> */}
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <hr className="border-light-secondary dark:border-dark-secondary my-6" />
//               {/* Related Suggestions */}
//               {isLast &&
//                 message.suggestions &&
//                 message.suggestions.length > 0 &&
//                 message.role === 'assistant' &&
//                 !loading && (
//                   <div className="flex flex-col space-y-3">
//                     <div className="flex flex-row items-center space-x-2">
//                       <Layers3 />
//                       <h3 className="text-xl font-medium">Related</h3>
//                     </div>
//                     <div className="flex flex-col space-y-3">
//                       {message.suggestions.map((suggestion, i) => (
//                         <div
//                           className="flex flex-col space-y-3 text-sm"
//                           key={i}
//                         >
//                           <div className="h-px w-full bg-light-secondary dark:bg-dark-secondary" />
//                           <div
//                             onClick={() => sendMessage(suggestion)}
//                             className="flex flex-row items-center justify-between cursor-pointer hover:bg-light-secondary dark:hover:bg-dark-secondary transition-all duration-200 p-2 space-x-2"
//                           >
//                             <span>{suggestion}</span>
//                             <Plus size={14} />
//                           </div>
//                           <div className="h-px w-full bg-light-secondary dark:bg-dark-secondary" />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//             </div>
//           </div>
//           {/* <div className="lg:sticky lg:top-20 flex flex-col items-center space-y-3 w-full lg:w-3/12 z-30 h-full pb-4">
//               <SearchImages
//                 query={history[messageIndex - 1].content}
//                 chatHistory={history.slice(0, messageIndex - 1)}
//               />
//               <SearchVideos
//                 chatHistory={history.slice(0, messageIndex - 1)}
//                 query={history[messageIndex - 1].content}
//               />
//           </div> */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageBox;

// new change for sources

import React, { MutableRefObject, useEffect, useState } from 'react';
import { Message } from './ChatWindow';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  BookCopy,
  Disc3,
  Volume2,
  StopCircle,
  Layers3,
  Plus,
  X,
  Link,
  Link2Icon,
  Brain,
  BrainCircuit,
  ChevronDown,
} from 'lucide-react';
import Markdown from 'markdown-to-jsx';
import Copy from './MessageActions/Copy';
import Rewrite from './MessageActions/Rewrite';
import { useSpeech } from 'react-text-to-speech';
import SearchImages from './SearchImages';
import SearchVideos from './SearchVideos';

const MessageBox = ({
  message,
  messageIndex,
  history,
  loading,
  dividerRef,
  isLast,
  rewrite,
  sendMessage,
}: {
  message: Message;
  messageIndex: number;
  history: Message[];
  loading: boolean;
  dividerRef?: MutableRefObject<HTMLDivElement | null>;
  isLast: boolean;
  rewrite: (messageId: string) => void;
  sendMessage: (message: string) => void;
}) => {
  const [parsedMessage, setParsedMessage] = useState(message.content);
  const [speechMessage, setSpeechMessage] = useState(message.content);
  const [showPanel, setShowPanel] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [thinking, setThinking] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isThinkingExpanded, setIsThinkingExpanded] = useState(false);

  useEffect(() => {
    const regex = /\[(\d+)\]/g;
    const thinkRegex = /<think>(.*?)(?:<\/think>|$)(.*)/s;

    // Check for thinking content, including partial tags
    const match = message.content.match(thinkRegex);
    if (match) {
      const [_, thinkingContent, answerContent] = match;

      // Set thinking content even if </think> hasn't appeared yet
      if (thinkingContent) {
        setThinking(thinkingContent.trim());
        setIsThinkingExpanded(true); // Auto-expand when thinking starts
      }

      if (answerContent) {
        setAnswer(answerContent.trim());

        // Process the answer part for sources if needed
        if (message.role === 'assistant' && message?.sources && message.sources.length > 0) {
          setParsedMessage(
            answerContent.trim().replace(
              regex,
              (_, number) =>
                `<a href="${message.sources?.[number - 1]?.metadata?.url}" target="_blank" className="bg-light-secondary dark:bg-dark-secondary px-1 rounded ml-1 no-underline text-xs text-black/70 dark:text-white/70 relative">${number}</a>`,
            ),
          );
        } else {
          setParsedMessage(answerContent.trim());
        }
        setSpeechMessage(answerContent.trim().replace(regex, ''));
      }
    } else {
      // No thinking content - process as before
      if (message.role === 'assistant' && message?.sources && message.sources.length > 0) {
        setParsedMessage(
          message.content.replace(
            regex,
            (_, number) =>
              `<a href="${message.sources?.[number - 1]?.metadata?.url}" target="_blank" className="bg-light-secondary dark:bg-dark-secondary px-1 rounded ml-1 no-underline text-xs text-black/70 dark:text-white/70 relative">${number}</a>`,
          ),
        );
      } else {
        setParsedMessage(message.content);
      }
      setSpeechMessage(message.content.replace(regex, ''));
    }
  }, [message.content, message.sources, message.role]);

  const { speechStatus, start, stop } = useSpeech({ text: speechMessage });

  return (
    <div>
      {message.role === 'user' && (
        <div className={cn('w-full', messageIndex === 0 ? 'pt-16' : 'pt-8')}>
          <h2 className="text-black dark:text-white font-medium text-3xl lg:w-9/12 mx-auto text-center mr-2 break-words">
            {message.content}
          </h2>
        </div>
      )}

      {message.role === 'assistant' && (
        <div className="flex flex-col lg:flex-row lg:space-x-9 lg:justify-between">
          {/* Sources for small screens */}
          <div className="lg:w-3/12 flex flex-col space-y-4 pb-4 lg:order-none order-first">
            {message.sources && message.sources.length > 0 && (
              <div className="flex flex-col space-y-1 mt-4">
                <div className="flex flex-row items-center space-x-2">
                  {/* <BookCopy className="text-black dark:text-white" size={20} /> */}
                  {/* <h3 className="text-black dark:text-white font-medium text-xl">
                      Sources
                    </h3> */}
                </div>

                {/* Sources grouping for small screens */}
                <div
                  onClick={() => setShowPanel(true)} // Click handler for the entire container
                  className="lg:hidden flex flex-wrap items-center space-x-1 p-3 m-4 rounded-lg bg-light-secondary dark:bg-dark-secondary shadow-md hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="w-full flex items-center justify-start text-xs font-semibold text-black dark:text-white mb-2">
                    <button
                      onClick={(e) => e.stopPropagation()} // Prevent triggering the container's onClick
                      className="text-blue-500 hover:text-blue-700 p-1 flex items-center ml-2"
                    >
                      <Link className="text-sm" />
                    </button>
                    <span>Show All</span>
                  </div>

                  {message.sources.slice(0, 10).map((source, i) => (
                    <div
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the container's onClick
                        setShowPanel(true); // Optional: Specific behavior for individual items
                      }}
                      className="flex items-center justify-center p-1 rounded-lg bg-light-secondary dark:bg-dark-secondary cursor-pointer"
                    >
                      <img
                        src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
                        width={20}
                        height={20}
                        alt="favicon"
                        className="rounded-full"
                      />
                    </div>
                  ))}

                  {message.sources.length > 10 && (
                    <div
                      onClick={(e) => e.stopPropagation()} // Prevent triggering the container's onClick
                      className="flex items-center justify-center p-1 rounded-lg bg-light-secondary dark:bg-dark-secondary text-xs text-black/70 dark:text-white/70"
                    >
                      +{message.sources.length - 10} more...
                    </div>
                  )}
                </div>

                {/* Card wrapping the sources for large screens */}

                <div className="hidden lg:flex flex-col space-y-1 p-3 rounded-lg bg-light-secondary dark:bg-dark-secondary shadow-md">
                  {/* <h2 className="text-sm text-black dark:text-white mb-1">
                    Resources
                  </h2>

                  <hr className="border-t border-gray-500" /> */}

                  {/* {message.sources.map((source, i) => ( */}

                  {message.sources && message.sources.length > 0 && (
                    <div>
                      {!showAll ? (
                        <div className="flex flex-col space-y-2 p-1 rounded-lg bg-light-secondary dark:bg-dark-secondary shadow-md">
                          {/* First source in large size */}
                          <div className="flex flex-col space-y-2 text-lg">
                            <div className="flex items-center space-x-2">
                              <img
                                src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${message.sources[0].metadata.url}`}
                                width={95}
                                height={95}
                                alt="favicon"
                                className="rounded-full"
                              />
                              <a
                                href={message.sources[0].metadata.url}
                                target="_blank"
                                className="font-semibold text-sm text-gray-200  break-words"
                              >
                                {message.sources[0].metadata.title.slice(0, 50)}
                              </a>
                            </div>

                            <p className="text-sm text-black/50 dark:text-white/50 overflow-hidden whitespace-nowrap text-ellipsis">
                              {message.sources[0].metadata.url.replace(
                                /.+\/\/|www.|\..+/g,
                                '',
                              )}
                            </p>
                            <p className="text-gray-300 text-sm">
                              {message.sources[0].pageContent.slice(0, 120)}
                              ...
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            {message.sources.slice(1, 5).map(
                              (
                                source,
                                i, // Updated to slice(1, 5) to include two more containers
                              ) => (
                                <div
                                  key={i}
                                  className="p-2 bg-[#1c1c1c] rounded-lg flex flex-col items-start space-y-0"
                                >
                                  <div className="flex flex-row items-center space-x-1">
                                    <img
                                      src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
                                      width={13}
                                      height={13}
                                      alt="favicon"
                                      className="rounded-full"
                                    />
                                    <p className="text-[11px] text-black/50 dark:text-white/50 max-w-[120px] overflow-hidden whitespace-nowrap text-ellipsis">
                                      {source.metadata.url
                                        ? source.metadata.url
                                          .replace(/.+\/\/|www.|\..+/g, '')
                                          .slice(0, 12) // Truncate to 20 characters
                                        : 'No URL Available'}
                                    </p>
                                  </div>
                                  <a
                                    href={source.metadata.url}
                                    target="_blank"
                                    className="text-[11px] text-gray-300 font-medium break-words"
                                  >
                                    {source.metadata.title.slice(0, 10)}
                                    {/* Show only first 20 characters */}
                                  </a>
                                </div>
                              ),
                            )}
                          </div>

                          {/* Grouped favicon list */}

                          <div className="flex flex-wrap items-center mt-2 gap-2">
                            <button
                              className="flex flex-wrap items-center hover:bg-black p-2 rounded transition-all duration-200"
                              onClick={() => setShowAll(true)}
                            >
                              {message.sources.slice(3, 10).map((source, i) => (
                                <img
                                  key={i}
                                  src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
                                  width={16}
                                  height={16}
                                  alt="favicon"
                                  className="m-1 rounded-full transition-transform transform hover:scale-110"
                                />
                              ))}
                              {message.sources.length > 10 && (
                                <span className="text-xs text-gray-500">
                                  +more..
                                </span>
                              )}
                            </button>

                            <button
                              className=" hover:text-black transition-all duration-200"
                              onClick={() => setShowAll(true)}
                            >
                              {/* <div className="text-blue-500 hover:underline ">
                                {' '}
                                See All
                              </div> */}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-0 bg-light-secondary dark:bg-dark-secondary shadow-md rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semi-bold">
                              All Sources
                            </h3>

                            <button
                              onClick={() => setShowAll(false)}
                              className="border-2 border-gray-500 rounded-full text-gray-500 hover:text-gray-100 flex items-center justify-center hover:border-gray-700"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <hr className="border-t border-gray-500" />
                          {/* Render message sources with "Show More"/"Show Less" */}
                          {(showMore
                            ? message.sources
                            : message.sources.slice(0, 7)
                          ).map((source, i) => (
                            <div
                              key={i}
                              className="source-card flex flex-col space-y-1 p-2 mb-2 rounded-lg bg-light-secondary dark:bg-dark-secondary shadow-md w-full lg:w-12/12 mx-auto"
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-black/70 dark:text-white/70">
                                  {i + 1}.
                                </span>
                                <a
                                  href={source.metadata.url}
                                  target="_blank"
                                  className="text-xs text-gray-200 font-medium overflow-hidden whitespace-nowrap text-ellipsis"
                                >
                                  {source.metadata.title}
                                </a>
                              </div>

                              <div className="flex flex-row items-center justify-between mt-1">
                                <div className="flex flex-row items-center space-x-1">
                                  <img
                                    src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
                                    width={20}
                                    height={20}
                                    alt="favicon"
                                    className="rounded-lg h-4 w-4"
                                  />
                                  <p className="text-xs text-black/50 dark:text-white/50 overflow-hidden whitespace-nowrap text-ellipsis">
                                    {source.metadata.url.replace(
                                      /.+\/\/|www.|\..+/g,
                                      '',
                                    )}
                                  </p>
                                </div>
                              </div>

                              {/* Content Section for each source */}
                              {source.pageContent && (
                                <a
                                  href={source.metadata.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] text-black/70 dark:text-white/70 leading-relaxed break-words block"
                                >
                                  {source.pageContent.slice(0, 100)}
                                  {source.pageContent.length > 100 ? '...' : ''}
                                </a>
                              )}
                            </div>
                          ))}
                          {/* "Show More" button moved to the bottom */}
                          {message.sources.length > 7 && (
                            <div className="flex justify-center mt-2">
                              <button
                                onClick={() => setShowMore(!showMore)}
                                className="text-xs text-blue-500 mt-2 hover:text-blue-700 transition-colors"
                              >
                                {showMore ? 'Show Less' : 'Show More...'}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sliding Panel for small screens */}
          {showPanel && (
            <div className="fixed top-0 right-0 h-full w-3/4 sm:w-3/3 lg:hidden bg-white dark:bg-black shadow-lg z-50 overflow-y-auto">
              <div className="flex justify-between items-center p-3 border-b border-light-secondary dark:border-dark-secondary">
                <div className="flex items-center space-x-2">
                  <Link2Icon size={20} className="text-black dark:text-white" />
                  <h3 className="text-xl font-medium text-black dark:text-white">
                    Links
                  </h3>
                </div>
                <button
                  onClick={() => setShowPanel(false)}
                  className="text-black dark:text-white border border-gray-500 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4">
                {message.sources &&
                  message.sources.map((source, i) => (
                    <div
                      key={i}
                      className="block p-2 mb-1 bg-light-secondary dark:bg-dark-secondary rounded-lg shadow-md"
                    >
                      <div className="flex flex-row items-center space-x-2 cursor-pointer">
                        {/* Numbering and Title in one line */}
                        <span className="text-sm text-black/70 dark:text-white/70">
                          {i + 1}.
                        </span>
                        <a
                          href={source.metadata.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-black dark:text-white truncate max-w-[200px] sm:max-w-[300px] block"
                        >
                          {source.metadata.title}
                        </a>
                      </div>
                      {/* Content for the Source */}

                      <div className="flex flex-row items-center space-x-2 mt-1">
                        {/* Make the favicon clickable */}
                        <a
                          href={source.metadata.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
                            width={20}
                            height={20}
                            alt="favicon"
                            className="rounded-full"
                          />
                        </a>
                        {/* Make the URL clickable */}
                        <a
                          href={source.metadata.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-black/50 dark:text-white/50 overflow-hidden whitespace-nowrap text-ellipsis block"
                        >
                          {source.metadata.url.replace(/.+\/\/|www.|\..+/g, '')}
                        </a>
                      </div>
                      {source.pageContent ? (
                        <a
                          href={source.metadata.url} // Make the content clickable, linking to the same URL
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-black/70 dark:text-white/70 leading-relaxed block mt-1"
                        >
                          {source.pageContent.slice(0, 100)}
                          {source.pageContent.length > 100 ? '...' : ''}
                        </a>
                      ) : null}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex flex-col space-y-9 lg:w-9/12">
            <div ref={dividerRef} className="flex flex-col space-y-6">
              <div className="flex flex-col space-y-2">
                {/*<div className="flex flex-row space-x-4 overflow-x-auto w-3/4 mx-auto ml-7">
                    <SearchImages
                      query={
                        messageIndex > 0 ? history[messageIndex - 1]?.content : ''
                      }
                      chatHistory={history.slice(0, messageIndex - 1)}
                    />
                    <SearchVideos
                      chatHistory={history.slice(0, messageIndex - 1)}
                      query={
                        messageIndex > 0 ? history[messageIndex - 1]?.content : ''
                      }
                    />
                  </div>*/}
                <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8 w-full lg:w-3/4 z-30 h-full pb-4">
                  <div className="w-full lg:w-full mb-4 lg:mb-0">
                    <SearchImages
                      query={history[messageIndex - 1].content}
                      chatHistory={history.slice(0, messageIndex - 1)}
                    />
                  </div>
                  <div className="w-full lg:w-full">
                    <SearchVideos
                      chatHistory={history.slice(0, messageIndex - 1)}
                      query={history[messageIndex - 1].content}
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-4">
                  {thinking && (
                    <div className="flex flex-col space-y-2 mb-4">
                      <button
                        onClick={() => setIsThinkingExpanded(!isThinkingExpanded)}
                        className="flex flex-row items-center space-x-2 group text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition duration-200"
                      >
                        <BrainCircuit size={20} />
                        <h5 className="font-medium">Thinking</h5>
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-transform duration-200",
                            isThinkingExpanded ? "rotate-180" : ""
                          )}
                        />
                      </button>

                      {isThinkingExpanded && (
                        <div className="rounded-lg bg-light-secondary/50 dark:bg-dark-secondary/50 p-4">
                          {thinking.split('\n\n').map((paragraph, index) => {
                            if (!paragraph.trim()) return null;

                            const content = paragraph.replace(/^[•\-\d.]\s*/, '');

                            return (
                              <div key={index} className="mb-2 last:mb-0">
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                  <summary className="flex items-center cursor-pointer list-none text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white">
                                    <span className="arrow mr-2 inline-block transition-transform duration-200 group-open:rotate-90 group-open:self-start group-open:mt-1">▸</span>
                                    <p className="relative whitespace-normal line-clamp-1 group-open:line-clamp-none after:content-['...'] after:inline group-open:after:hidden transition-all duration-200 text-ellipsis overflow-hidden group-open:overflow-visible">
                                      {content}
                                    </p>
                                  </summary>
                                </details>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                  </div> 
                  <div className="flex flex-col space-y-2">
                    <div className="flex flex-row items-center space-x-2">
                      <Disc3
                        className={cn(
                          'text-black dark:text-white',
                          isLast && loading ? 'animate-spin' : 'animate-none',
                        )}
                        size={20}
                      />
                      <h3 className="text-black dark:text-white font-medium text-xl">
                        Answer
                      </h3>
                    </div>

                    <Markdown
                      className={cn(
                        'prose prose-h1:mb-3 prose-h2:mb-2 prose-h2:mt-6 prose-h2:font-[800] prose-h3:mt-4 prose-h3:mb-1.5 prose-h3:font-[600] dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 font-[400]',
                        'max-w-none break-words text-black dark:text-white',
                      )}
                    >
                      {parsedMessage}
                    </Markdown>
                    {loading && isLast ? null : (
                      <div className="flex flex-row items-center justify-between w-full text-black dark:text-white py-4 -mx-2">
                        <div className="flex flex-row items-center space-x-1">
                          <Rewrite
                            rewrite={rewrite}
                            messageId={message.messageId}
                          />
                        </div>
                        <div className="flex flex-row items-center space-x-1">
                          <Copy
                            initialMessage={message.content}
                            message={message}
                          />
                          {/* <button
                          onClick={() => {
                            if (speechStatus === 'started') {
                              stop();
                            } else {
                              start();
                            }
                          }}
                          className="p-2 text-black/70 dark:text-white/70 rounded-xl hover:bg-light-secondary dark:hover:bg-dark-secondary transition duration-200 hover:text-black dark:hover:text-white"
                        >
                          {speechStatus === 'started' ? (
                            <StopCircle size={18} />
                          ) : (
                            <Volume2 size={18} />
                          )}
                        </button> */}
                        </div>
                      </div>
                    )}
                  </div>
                  <hr className="border-light-secondary dark:border-dark-secondary my-6" />
                  {/* Related Suggestions */}
                  {isLast &&
                    message.suggestions &&
                    message.suggestions.length > 0 &&
                    message.role === 'assistant' &&
                    !loading && (
                      <div className="flex flex-col space-y-3">
                        <div className="flex flex-row items-center space-x-2">
                          <Layers3 />
                          <h3 className="text-xl font-medium">Related</h3>
                        </div>
                        <div className="flex flex-col space-y-3">
                          {message.suggestions.map((suggestion, i) => (
                            <div
                              className="flex flex-col space-y-3 text-sm"
                              key={i}
                            >
                              <div className="h-px w-full bg-light-secondary dark:bg-dark-secondary" />
                              <div
                                onClick={() => sendMessage(suggestion)}
                                className="flex flex-row items-center justify-between cursor-pointer hover:bg-light-secondary dark:hover:bg-dark-secondary transition-all duration-200 p-2 space-x-2"
                              >
                                <span>{suggestion}</span>
                                <Plus size={14} />
                              </div>
                              <div className="h-px w-full bg-light-secondary dark:bg-dark-secondary" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
              {/* <div className="lg:sticky lg:top-20 flex flex-col items-center space-y-3 w-full lg:w-3/12 z-30 h-full pb-4">
                <SearchImages
                  query={history[messageIndex - 1].content}
                  chatHistory={history.slice(0, messageIndex - 1)}
                />
                <SearchVideos
                  chatHistory={history.slice(0, messageIndex - 1)}
                  query={history[messageIndex - 1].content}
                />
            </div> */}
            </div>
          </div>
  )}
  </div>
  );
};

export default MessageBox;

// old sources

// <div className="hidden lg:flex flex-col space-y-1 p-3 rounded-lg bg-light-secondary dark:bg-dark-secondary shadow-md">
//                   <h2 className="text-sm text-black dark:text-white mb-1">
//                     Resources
//                   </h2>

//                   <hr className="border-t border-gray-500" />

//                   {/* {message.sources.map((source, i) => ( */}
//                   {(showMore
//                     ? message.sources
//                     : message.sources.slice(0, 7)
//                   ).map((source, i) => (
//                     <div
//                       key={i}
//                       className="source-card flex flex-col space-y-1 p-2 mb-1 rounded-lg bg-light-secondary dark:bg-dark-secondary shadow-md w-full lg:w-12/12 mx-auto"
//                     >
//                       <div className="flex items-center space-x-2">
//                         <span className="text-sm text-black/70 dark:text-white/70">
//                           {i + 1}.
//                         </span>
//                         <a
//                           href={source.metadata.url}
//                           target="_blank"
//                           className="text-xs text-black/70 dark:text-white/70 font-medium overflow-hidden whitespace-nowrap text-ellipsis"
//                         >
//                           {source.metadata.title}
//                         </a>
//                       </div>

//                       <div className="flex flex-row items-center justify-between mt-1">
//                         <div className="flex flex-row items-center space-x-1">
//                           <img
//                             src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
//                             width={20}
//                             height={20}
//                             alt="favicon"
//                             className="rounded-lg h-4 w-4"
//                           />
//                           <p className="text-xs text-black/50 dark:text-white/50 overflow-hidden whitespace-nowrap text-ellipsis">
//                             {source.metadata.url.replace(
//                               /.+\/\/|www.|\..+/g,
//                               '',
//                             )}
//                           </p>
//                         </div>
//                       </div>
//                       {/* Content Section for each source */}
//                       {source.pageContent ? (
//                         <a
//                           href={source.metadata.url} // Links to the URL
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-[11px] text-black/70 dark:text-white/70 leading-relaxed break-words block"
//                         >
//                           {source.pageContent.slice(0, 100)}
//                           {source.pageContent.length > 100 ? '...' : ''}
//                         </a>
//                       ) : null}
//                     </div>
//                   ))}
//                   {/* "Show More" button moved to the bottom */}
//                   {message.sources.length > 7 && (
//                     <div className="flex justify-center mt-2">
//                       <button
//                         onClick={() => setShowMore(!showMore)}
//                         className="text-xs text-blue-500 mt-2 hover:text-blue-700 transition-colors"
//                       >
//                         {showMore ? 'Show Less' : `Show More...`}
//                       </button>
//                     </div>
//                   )}
//                 </div>
