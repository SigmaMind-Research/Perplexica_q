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

import React, { MutableRefObject, useEffect, useState } from 'react';
import { Message } from './ChatWindow';
import { cn } from '@/lib/utils';
import {
  BookCopy,
  Disc3,
  Volume2,
  StopCircle,
  Layers3,
  Plus,
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

  useEffect(() => {
    const regex = /\[(\d+)\]/g;

    if (
      message.role === 'assistant' &&
      message?.sources &&
      message.sources.length > 0
    ) {
      return setParsedMessage(
        message.content.replace(
          regex,
          (_, number) =>
            `<a href="${message.sources?.[number - 1]?.metadata?.url}" target="_blank" className="bg-light-secondary dark:bg-dark-secondary px-1 rounded ml-1 no-underline text-xs text-black/70 dark:text-white/70 relative">${number}</a>`,
        ),
      );
    }

    setSpeechMessage(message.content.replace(regex, ''));
    setParsedMessage(message.content);
  }, [message.content, message.sources, message.role]);

  const { speechStatus, start, stop } = useSpeech({ text: speechMessage });

  return (
    <div>
      {message.role === 'user' && (
        <div className={cn('w-full', messageIndex === 0 ? 'pt-16' : 'pt-8')}>
          <h2 className="text-black dark:text-white font-medium text-3xl lg:w-9/12">
            {message.content}
          </h2>
        </div>
      )}

      {message.role === 'assistant' && (
        <div className="flex flex-col lg:flex-row lg:space-x-9 lg:justify-between">
          {/* Sources (Moved to top for small screens) */}
          <div className="lg:w-3/12 flex flex-col space-y-4 pb-4 lg:order-none order-first">
            {message.sources && message.sources.length > 0 && (
              <div className="flex flex-col space-y-1 mt-4">
                <div className="flex flex-row items-center space-x-2">
                  <BookCopy className="text-black dark:text-white" size={20} />
                  <h3 className="text-black dark:text-white font-medium text-xl">
                    Sources
                  </h3>
                </div>

                {/* Card wrapping the sources for large screens */}
                <div className="hidden lg:flex flex-col space-y-1 p-3 rounded-lg bg-light-secondary dark:bg-dark-secondary shadow-md">
                  {message.sources.map((source, i) => (
                    <div
                      key={i}
                      className="source-card flex flex-col space-y-1 p-2 mb-1 rounded-lg bg-light-secondary dark:bg-dark-secondary shadow-md w-full lg:w-12/12 mx-auto"
                    >
                      <a
                        href={source.metadata.url}
                        target="_blank"
                        className="source-info flex flex-col space-y-1 font-medium"
                      >
                        {/* On large screens: Display title, URL, and favicon */}
                        <div className="hidden lg:flex flex-col">
                          <p className="text-xs text-black/70 dark:text-white/70 overflow-hidden whitespace-nowrap text-ellipsis">
                            {source.metadata.title}
                          </p>
                          <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-row items-center space-x-1">
                              <img
                                src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
                                width={16}
                                height={16}
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
                        </div>
                      </a>
                    </div>
                  ))}
                </div>

                {/* Sources Grouping for Small Screens */}
                <div className="lg:hidden flex flex-wrap items-center space-x-1 p-3 m-4 rounded-lg bg-light-secondary dark:bg-dark-secondary shadow-md">
                  {message.sources.slice(0, 10).map((source, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center p-1 rounded-lg bg-light-secondary dark:bg-dark-secondary"
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
                  {/* If there are more than 9 sources, display the count */}
                  {message.sources.length > 10 && (
                    <div className="flex items-center justify-center p-1 rounded-lg bg-light-secondary dark:bg-dark-secondary text-xs text-black/70 dark:text-white/70">
                      +{message.sources.length - 10} more...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Main Content (Answer, Suggestions) */}
          <div className="flex flex-col space-y-9 lg:w-9/12">
            <div ref={dividerRef} className="flex flex-col space-y-6">
              {/* Answer */}
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
                    'prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0',
                    'max-w-none break-words text-black dark:text-white text-sm md:text-base font-medium',
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
                      <button
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
                      </button>
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

            {/* <SearchImages message={message} />    
            <SearchVideos message={message} /> */}

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
