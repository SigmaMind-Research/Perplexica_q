// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import * as Dialog from "@radix-ui/react-dialog";
// import { X } from "lucide-react";
// import ReactMarkdown from "react-markdown";


// interface Message {
//     id: string
//     role: string
//     content: string
//     metadata: string
//     source?: string
// }

// interface ChatPageProps {
//     chatId: string
// }
// interface DrawerProps {
//     open: boolean;
//     onOpenChange: (open: boolean) => void;
//     children: React.ReactNode;
//   }

//   // Drawer component
//   const Drawer: React.FC<DrawerProps> = ({ open, onOpenChange, children }) => {
//     return (
//       <Dialog.Root open={open} onOpenChange={onOpenChange}>
//         <Dialog.Portal>
//           <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50" />
//           <Dialog.Content className="fixed right-0 top-0 h-full w-[400px] bg-zinc-900 text-white shadow-lg z-50 p-6 overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <Dialog.Title className="text-lg font-bold">All Sources</Dialog.Title>
//               <Dialog.Close asChild>
//                 <button aria-label="Close">
//                   <X className="w-5 h-5" />
//                 </button>
//               </Dialog.Close>
//             </div>
//             <div className="space-y-4">{children}</div>
//           </Dialog.Content>
//         </Dialog.Portal>
//       </Dialog.Root>
//     );
//   };

// export default function ChatPage({ chatId }: ChatPageProps) {
//     const [title, setTitle] = useState("")
//     const [messages, setMessages] = useState<Message[]>([])
//     const [chatHistory, setChatHistory] = useState<[string, string][]>([])
//     const [isMessagesLoaded, setIsMessagesLoaded] = useState(false)
//     const [notFound, setNotFound] = useState(false)
//     const [open, setOpen] = useState(false);

//     const router = useRouter()

//     const [editIndex, setEditIndex] = useState<number | null>(null); // Track editing message index
//     const [editedContent, setEditedContent] = useState<string>("");   // Store edited content

//     const handleEdit = (index: number, content: string) => {
//       setEditIndex(index);           // Set the current message to edit mode
//       setEditedContent(content);     // Store the content in the editable state
//     };

//     const handleSave = (index: number) => {
//       // Save changes and exit edit mode
//       messages[index].content = editedContent;
//       setEditIndex(null);
//     };

//     const handleDiscard = () => {
//       // Discard changes and exit edit mode
//       setEditIndex(null);
//       setEditedContent("");
//     };

//     const getFaviconUrl = (url: string) => {
//         try {
//             const domain = new URL(url).hostname;
//             return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
//         } catch {
//             return "https://via.placeholder.com/64"; // Fallback logo
//         }
//     };

//     useEffect(() => {
//         const loadMessages = async () => {
//             const res = await fetch(
//                 `${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}`,
//                 {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             )

//             if (res.status === 404) {
//                 setNotFound(true)
//                 setIsMessagesLoaded(true)
//                 return
//             }

//             const data = await res.json()
//             const messages = data.messages.map((msg: any) => ({
//                 ...msg,
//                 ...JSON.parse(msg.metadata),
//             })) as Message[]

//             setMessages(messages)

//             const history = messages.map((msg) => [msg.role, msg.content]) as [string, string][]
//             document.title = messages[0]?.content || "Chat"
//             setChatHistory(history)
//             setIsMessagesLoaded(true)
//         }

//         loadMessages()
//     }, [chatId])

//     if (!isMessagesLoaded) return <div className="text-center mt-10">Loading...</div>
//     if (notFound) return <div className="text-center text-red-500">Chat not found</div>

//     return (
//         <div className="mb-16">
//         {messages.map((msg, index) => (
//           <div key={msg.id || index} className="mb-12">
//             {/* User message -> Becomes a blog section title */}
//             {msg.role === "user" ? (
//               <h2 className="text-2xl font-bold mb-4 text-primary">{msg.content}</h2>
//             ) : (
//                 <div className="prose prose-zinc dark:prose-invert max-w-none">
//                   {/* Inline Editing */}
//                   {editIndex === index ? (
//                     <div className="relative">
//                       <textarea
//                         value={editedContent}
//                         onChange={(e) => setEditedContent(e.target.value)}
//                         className="w-full h-[150px] p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />

//                       {/* Save and Discard buttons */}
//                       <div className="mt-2 flex gap-4">
//                         <button
//                           onClick={() => handleSave(index)}
//                           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
//                         >
//                           Save
//                         </button>
//                         <button
//                           onClick={handleDiscard}
//                           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//                         >
//                           Discard
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div
//                       className="cursor-pointer hover:bg-zinc-800 p-2 rounded transition"
//                       onClick={() => handleEdit(index, msg.content)}
//                     >
//                       <ReactMarkdown>{msg.content}</ReactMarkdown>
//                     </div>
//                   )}

//                 {/* Display Sources Section */}
//                 {msg.metadata && (
//                   <div className="mt-8">
//                     <h3 className="text-lg font-semibold mb-4">Sources:</h3>

//                     {(() => {
//                       try {
//                         const metadata = JSON.parse(msg.metadata);
//                         if (Array.isArray(metadata.sources)) {
//                           const visibleSources = metadata.sources.slice(0, 3); // Show 3 sources initially
//                           const remainingSources = metadata.sources.slice(3);

//                           return (
//                             <>
//                               {/* Compact Horizontal Source Cards */}
//                               <div className="flex flex-wrap justify-start gap-4">
//                               {visibleSources.map(
//                                   (
//                                     source: {
//                                       metadata?: { title?: string; url?: string };
//                                       pageContent?: string;
//                                     },
//                                     i: number
//                                   ) => (
//                                     <div
//                                       key={i}
//                                       className="bg-zinc-900 text-white rounded-lg p-3 w-[220px] h-[80px] flex items-center gap-3 shadow-md hover:shadow-lg transition"
//                                     >
//                                       {/* Favicon */}
//                                       <img
//                                         src={getFaviconUrl(source.metadata?.url || "#")}
//                                         alt="Source logo"
//                                         className="w-4 h- rounded-full"
//                                       />

//                                       <div className="flex-1 overflow-hidden">
//                                         <p className="text-xs text-gray-400">
//                                           {source.metadata?.url
//                                             ? new URL(source.metadata.url).hostname
//                                             : "No URL"}
//                                         </p>
//                                         <p className="text-sm font-medium truncate">
//                                           {source.metadata?.title || "Untitled Source"}
//                                         </p>
//                                       </div>
//                                     </div>
//                                   )
//                                 )}

//                                 {/* "+X sources" button to open the drawer */}
//                                 {remainingSources.length > 0 && (
//                                   <button
//                                     onClick={() => setOpen(true)}
//                                     className="bg-zinc-900 text-white rounded-lg p-3 w-[220px] h-[80px] flex items-center gap-3 shadow-md hover:shadow-lg transition"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <img
//                                         src={getFaviconUrl(
//                                           remainingSources[0]?.metadata?.url || "#"
//                                         )}
//                                         alt="More sources"
//                                         className="w-4 h-4 rounded-full"
//                                       />
//                                       <p className="text-sm">
//                                         +{remainingSources.length} sources
//                                       </p>
//                                     </div>
//                                   </button>
//                                 )}
//                               </div>

//                               {/* Drawer with all sources */}
//                               <Drawer open={open} onOpenChange={setOpen}>
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                                   {remainingSources.map(
//                                     (
//                                       source: {
//                                         metadata?: { title?: string; url?: string };
//                                         pageContent?: string;
//                                       },
//                                       i: number
//                                     ) => (
//                                       <div
//                                         key={i}
//                                         className="bg-zinc-800 rounded-lg p-4 shadow-md hover:shadow-lg transition"
//                                       >
//                                         <div className="flex items-center gap-3 mb-3">
//                                           <img
//                                             src={getFaviconUrl(
//                                               source.metadata?.url || "#"
//                                             )}
//                                             alt="Source logo"
//                                             className="w-10 h-10 rounded-full"
//                                           />
//                                           <div className="overflow-hidden">
//                                             <p className="text-xs text-gray-400">
//                                               {source.metadata?.url
//                                                 ? new URL(source.metadata.url).hostname
//                                                 : "No URL"}
//                                             </p>
//                                             <p className="text-sm font-medium truncate">
//                                               {source.metadata?.title || "Untitled Source"}
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <p className="text-xs text-gray-300 line-clamp-2">
//                                           {source.pageContent
//                                             ? source.pageContent.slice(0, 100) + "..."
//                                             : "No preview available"}
//                                         </p>
//                                       </div>
//                                     )
//                                   )}
//                                 </div>
//                               </Drawer>
//                             </>
//                           );
//                         }
//                       } catch (error) {
//                         console.error("Error parsing metadata:", error);
//                       }
//                       return null;
//                     })()}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     )
//     }

// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import * as Dialog from "@radix-ui/react-dialog";
// import { X, ExternalLink } from "lucide-react";
// import ReactMarkdown from "react-markdown";

// interface Message {
//     id: string
//     role: string
//     content: string
//     metadata: string
//     source?: string
// }

// interface ChatPageProps {
//     chatId: string
// }

// interface DrawerProps {
//     open: boolean;
//     onOpenChange: (open: boolean) => void;
//     children: React.ReactNode;
// }

// // Drawer component
// const Drawer: React.FC<DrawerProps> = ({ open, onOpenChange, children }) => {
//     return (
//         <Dialog.Root open={open} onOpenChange={onOpenChange}>
//             <Dialog.Portal>
//                 <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-all duration-300" />
//                 <Dialog.Content className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-zinc-900 text-white shadow-xl z-50 p-6 overflow-y-auto transition-all duration-300 border-l border-zinc-700">
//                     <div className="flex justify-between items-center mb-6">
//                         <Dialog.Title className="text-xl font-bold text-white">All Sources</Dialog.Title>
//                         <Dialog.Close asChild>
//                             <button aria-label="Close" className="p-2 rounded-full hover:bg-zinc-800 transition">
//                                 <X className="w-5 h-5 text-white" />
//                             </button>
//                         </Dialog.Close>
//                     </div>
//                     <div className="space-y-6">{children}</div>
//                 </Dialog.Content>
//             </Dialog.Portal>
//         </Dialog.Root>
//     );
// };

// export default function ChatPage({ chatId }: ChatPageProps) {
//     const [title, setTitle] = useState("")
//     const [messages, setMessages] = useState<Message[]>([])
//     const [chatHistory, setChatHistory] = useState<[string, string][]>([])
//     const [isMessagesLoaded, setIsMessagesLoaded] = useState(false)
//     const [notFound, setNotFound] = useState(false)
//     const [open, setOpen] = useState(false);
//     const [currentSources, setCurrentSources] = useState<any[]>([]);

//     const router = useRouter()

//     const [editIndex, setEditIndex] = useState<number | null>(null);
//     const [editedContent, setEditedContent] = useState<string>("");

//     const handleEdit = (index: number, content: string) => {
//         setEditIndex(index);
//         setEditedContent(content);
//     };

//     const handleSave = (index: number) => {
//         const updatedMessages = [...messages];
//         updatedMessages[index].content = editedContent;
//         setMessages(updatedMessages);
//         setEditIndex(null);
//     };

//     const handleDiscard = () => {
//         setEditIndex(null);
//         setEditedContent("");
//     };

//     const getFaviconUrl = (url: string) => {
//         try {
//             const domain = new URL(url).hostname;
//             return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
//         } catch {
//             return "/placeholder-favicon.png"; // Better fallback icon
//         }
//     };

//     const handleOpenSourceDrawer = (sources: any[]) => {
//         setCurrentSources(sources);
//         setOpen(true);
//     };

//     useEffect(() => {
//         const loadMessages = async () => {
//             try {
//                 const res = await fetch(
//                     `${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}`,
//                     {
//                         method: "GET",
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                     }
//                 )

//                 if (res.status === 404) {
//                     setNotFound(true)
//                     setIsMessagesLoaded(true)
//                     return
//                 }

//                 const data = await res.json()

//                 // Parse metadata for each message
//                 const processedMessages = data.messages.map((msg: any) => {
//                     try {
//                         const metadata = JSON.parse(msg.metadata || "{}");
//                         return {
//                             ...msg,
//                             parsedMetadata: metadata
//                         };
//                     } catch (e) {
//                         console.error("Failed to parse metadata:", e);
//                         return {
//                             ...msg,
//                             parsedMetadata: {}
//                         };
//                     }
//                 }) as (Message & { parsedMetadata: any })[];

//                 setMessages(processedMessages);

//                 // Set first user message as title
//                 const firstUserMsg = processedMessages.find(msg => msg.role === "user");
//                 if (firstUserMsg) {
//                     setTitle(firstUserMsg.content);
//                     document.title = firstUserMsg.content || "Chat";
//                 }

//                 const history = processedMessages.map((msg) => [msg.role, msg.content]) as [string, string][];
//                 setChatHistory(history);
//                 setIsMessagesLoaded(true);
//             } catch (error) {
//                 console.error("Error loading messages:", error);
//                 setIsMessagesLoaded(true);
//             }
//         }

//         loadMessages()
//     }, [chatId])

//     // Format domain from URL for display
//     const formatDomain = (url: string) => {
//         try {
//             const domain = new URL(url).hostname;
//             return domain.startsWith('www.') ? domain.substring(4) : domain;
//         } catch {
//             return "unknown source";
//         }
//     };

//     if (!isMessagesLoaded) return (
//         <div className="flex items-center justify-center min-h-[50vh]">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//     );

//     if (notFound) return (
//         <div className="flex flex-col items-center justify-center min-h-[50vh]">
//             <h2 className="text-2xl font-bold text-red-500 mb-4">Chat not found</h2>
//             <p className="text-gray-400">The page you're looking for doesn't exist or has been removed.</p>
//         </div>
//     );

//     return (
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
//             {/* Title section from first user message */}
//             {title && (
//                 <h1 className="text-3xl font-bold mt-8 mb-10 text-white">{title}</h1>
//             )}

//             {/* Message thread */}
//             <div className="space-y-12">
//                 {messages.map((msg, index) => {
//                     // Skip first user message as it's already shown as title
//                     if (index === 0 && msg.role === "user" && msg.content === title) {
//                         return null;
//                     }

//                     return (
//                         <div key={msg.id || index} className="message-container">
//                             {/* User message -> Question/section heading */}
//                             {msg.role === "user" ? (
//                                 <h2 className="text-2xl font-bold mb-6 text-white">{msg.content}</h2>
//                             ) : (
//                                 <div className="answer-container">
//                                     {/* Assistant response with markdown */}
//                                     <div className="prose prose-zinc max-w-none text-white">
//                                         {editIndex === index ? (
//                                             <div className="relative rounded-lg border border-zinc-700 overflow-hidden">
//                                                 <textarea
//                                                     value={editedContent}
//                                                     onChange={(e) => setEditedContent(e.target.value)}
//                                                     className="w-full min-h-[200px] p-4 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                                                 />
//                                                 <div className="flex justify-end gap-2 p-3 bg-zinc-900 border-t border-zinc-700">
//                                                     <button
//                                                         onClick={handleDiscard}
//                                                         className="px-4 py-2 text-sm rounded-md hover:bg-zinc-700 transition text-white"
//                                                     >
//                                                         Cancel
//                                                     </button>
//                                                     <button
//                                                         onClick={() => handleSave(index)}
//                                                         className="px-4 py-2 text-sm bg-blue-600 rounded-md hover:bg-blue-700 transition text-white"
//                                                     >
//                                                         Save
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         ) : (
//                                             <div 
//                                                 className="markdown-content pb-4 text-white"
//                                                 onClick={() => handleEdit(index, msg.content)}
//                                             >
//                                                 <div className="text-white">
//                                                     <ReactMarkdown>{msg.content}</ReactMarkdown>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>

//                                     {/* Sources section - Perplexity style */}
//                                     {(() => {
//                                         try {
//                                             let sources = [];

//                                             // Try to extract sources from metadata
//                                             if (msg.metadata) {
//                                                 const metadata = JSON.parse(msg.metadata);
//                                                 if (Array.isArray(metadata.sources)) {
//                                                     sources = metadata.sources;
//                                                 }
//                                             }

//                                             if (sources.length > 0) {
//                                                 const visibleSources = sources.slice(0, 3);
//                                                 const remainingSources = sources.slice(3);

//                                                 return (
//                                                     <div className="sources-section mt-8 border-t border-zinc-800 pt-6">
//                                                         <h3 className="text-lg font-semibold mb-4 text-white">Sources:</h3>

//                                                         {/* Grid layout for source cards */}
//                                                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//                                                             {visibleSources.map((source: any, i: number) => (
//                                                                 <div
//                                                                     key={i}
//                                                                     className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3 hover:bg-zinc-800 transition flex items-start gap-3"
//                                                                 >
//                                                                     {/* Favicon */}
//                                                                     <img
//                                                                         src={getFaviconUrl(source.metadata?.url || "#")}
//                                                                         alt=""
//                                                                         className="w-5 h-5 mt-0.5 rounded-sm"
//                                                                     />

//                                                                     <div className="flex-1 overflow-hidden">
//                                                                         <p className="text-xs text-gray-400 mb-1">
//                                                                             {source.metadata?.url
//                                                                                 ? formatDomain(source.metadata.url)
//                                                                                 : "Unknown source"}
//                                                                         </p>
//                                                                         <p className="text-sm font-medium mb-1 line-clamp-2 text-white">
//                                                                             {source.metadata?.title || "Untitled Source"}
//                                                                         </p>
//                                                                         <a 
//                                                                             href={source.metadata?.url} 
//                                                                             target="_blank"
//                                                                             rel="noopener noreferrer"
//                                                                             className="inline-flex items-center text-xs text-blue-400 hover:text-blue-300"
//                                                                         >
//                                                                             <ExternalLink className="w-3 h-3 mr-1" />
//                                                                             Visit
//                                                                         </a>
//                                                                     </div>
//                                                                 </div>
//                                                             ))}

//                                                             {/* Show more sources button */}
//                                                             {remainingSources.length > 0 && (
//                                                                 <button
//                                                                     onClick={() => handleOpenSourceDrawer(sources)}
//                                                                     className="bg-zinc-800/50 border border-zinc-700/50 border-dashed rounded-lg p-3 hover:bg-zinc-800 transition flex items-center justify-center"
//                                                                 >
//                                                                     <div className="flex items-center gap-2">
//                                                                         <span className="text-sm font-medium text-white">
//                                                                             +{remainingSources.length} more sources
//                                                                         </span>
//                                                                     </div>
//                                                                 </button>
//                                                             )}
//                                                         </div>

//                                                         {/* Sources drawer/sidebar */}
//                                                         <Drawer open={open} onOpenChange={setOpen}>
//                                                             {currentSources.map((source: any, i: number) => (
//                                                                 <div
//                                                                     key={i}
//                                                                     className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-zinc-600 transition"
//                                                                 >
//                                                                     <div className="flex items-center gap-3 mb-3">
//                                                                         <img
//                                                                             src={getFaviconUrl(source.metadata?.url || "#")}
//                                                                             alt=""
//                                                                             className="w-5 h-5 rounded-sm"
//                                                                         />
//                                                                         <div className="overflow-hidden flex-1">
//                                                                             <p className="text-xs text-gray-400">
//                                                                                 {source.metadata?.url
//                                                                                     ? formatDomain(source.metadata.url)
//                                                                                     : "Unknown source"}
//                                                                             </p>
//                                                                             <p className="text-sm font-medium truncate text-white">
//                                                                                 {source.metadata?.title || "Untitled Source"}
//                                                                             </p>
//                                                                         </div>
//                                                                         {source.metadata?.url && (
//                                                                             <a
//                                                                                 href={source.metadata.url}
//                                                                                 target="_blank"
//                                                                                 rel="noopener noreferrer"
//                                                                                 className="p-2 rounded-full hover:bg-zinc-700"
//                                                                             >
//                                                                                 <ExternalLink className="w-4 h-4 text-white" />
//                                                                             </a>
//                                                                         )}
//                                                                     </div>

//                                                                     {/* Preview content */}
//                                                                     <div className="mt-3 border-t border-zinc-700 pt-3">
//                                                                         <p className="text-sm text-gray-300 line-clamp-4">
//                                                                             {source.pageContent
//                                                                                 ? source.pageContent
//                                                                                 : "No preview available"}
//                                                                         </p>
//                                                                     </div>
//                                                                 </div>
//                                                             ))}
//                                                         </Drawer>
//                                                     </div>
//                                                 );
//                                             }
//                                             return null;
//                                         } catch (error) {
//                                             console.error("Error rendering sources:", error);
//                                             return null;
//                                         }
//                                     })()}
//                                 </div>
//                             )}
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }

/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import * as Dialog from "@radix-ui/react-dialog";
import { X, ExternalLink, Image as ImageIcon, Edit2, Check, Upload, Save } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string
  role: string
  content: string
  metadata: string
  source?: string
}

interface ChatPageProps {
  chatId: string
}

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

// Drawer component
const Drawer: React.FC<DrawerProps> = ({ open, onOpenChange, children }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-all duration-300" />
        <Dialog.Content className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-zinc-900 text-white shadow-xl z-50 p-6 overflow-y-auto transition-all duration-300 border-l border-zinc-700">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-xl font-bold text-white">All Sources</Dialog.Title>
            <Dialog.Close asChild>
              <button aria-label="Close" className="p-2 rounded-full hover:bg-zinc-800 transition">
                <X className="w-5 h-5 text-white" />
              </button>
            </Dialog.Close>
          </div>
          <div className="space-y-6">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default function ChatPage({ chatId }: ChatPageProps) {
  const [title, setTitle] = useState("")
  const [editingTitle, setEditingTitle] = useState(false)
  const [tempTitle, setTempTitle] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [chatHistory, setChatHistory] = useState<[string, string][]>([])
  const [isMessagesLoaded, setIsMessagesLoaded] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [open, setOpen] = useState(false)
  const [currentSources, setCurrentSources] = useState<any[]>([])
  const [titleImage, setTitleImage] = useState<string | null>(null)
  const [isImageUploading, setIsImageUploading] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editedContent, setEditedContent] = useState<string>("")

  const handleEdit = (index: number, content: string) => {
    if (!isPublished) {
      setEditIndex(index);
      setEditedContent(content);
    }
  };

  const handleSave = (index: number) => {
    const updatedMessages = [...messages];
    updatedMessages[index].content = editedContent;
    setMessages(updatedMessages);
    setEditIndex(null);
  };

  const handleDiscard = () => {
    setEditIndex(null);
    setEditedContent("");
  };

  const startTitleEdit = () => {
    if (!isPublished) {
      setEditingTitle(true);
      setTempTitle(title);
    }
  };

  const saveTitleEdit = () => {
    setTitle(tempTitle);
    setEditingTitle(false);
    // Here you would normally save the title to your backend
  };

  const cancelTitleEdit = () => {
    setEditingTitle(false);
    setTempTitle("");
  };

  const handlePublish = () => {
    setIsPublished(true);
    // Here you would normally trigger a publish API call
    // For now we'll just disable editing
  };

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
    } catch {
      return "/placeholder-favicon.png"; // Better fallback icon
    }
  };

  const handleOpenSourceDrawer = (sources: any[]) => {
    setCurrentSources(sources);
    setOpen(true);
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const onImageSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImageUploading(true);

    // In a real application, you would upload this to your server or cloud storage
    // For now, we'll create a local object URL
    try {
      // Simulating an API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const imageUrl = URL.createObjectURL(file);
      setTitleImage(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleSearchImage = async () => {
    setIsImageUploading(true);

    // In a real application, you would call an image search API
    // For now, we'll just set a placeholder after a delay
    try {
      // Simulating an API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTitleImage("https://via.placeholder.com/1200x400/3498db/ffffff?text=Generated+Image+for+" + encodeURIComponent(title));
    } catch (error) {
      console.error("Error searching for image:", error);
    } finally {
      setIsImageUploading(false);
    }
  };

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        if (res.status === 404) {
          setNotFound(true)
          setIsMessagesLoaded(true)
          return
        }

        const data = await res.json()

        // Parse metadata for each message
        const processedMessages = data.messages.map((msg: any) => {
          try {
            const metadata = JSON.parse(msg.metadata || "{}");
            return {
              ...msg,
              parsedMetadata: metadata
            };
          } catch (e) {
            console.error("Failed to parse metadata:", e);
            return {
              ...msg,
              parsedMetadata: {}
            };
          }
        }) as (Message & { parsedMetadata: any })[];

        setMessages(processedMessages);

        // Set first user message as title
        const firstUserMsg = processedMessages.find(msg => msg.role === "user");
        if (firstUserMsg) {
          setTitle(firstUserMsg.content);
          document.title = firstUserMsg.content || "Chat";
        }

        const history = processedMessages.map((msg) => [msg.role, msg.content]) as [string, string][];
        setChatHistory(history);
        setIsMessagesLoaded(true);
      } catch (error) {
        console.error("Error loading messages:", error);
        setIsMessagesLoaded(true);
      }
    }

    loadMessages()
  }, [chatId])

  // Format domain from URL for display
  const formatDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.startsWith('www.') ? domain.substring(4) : domain;
    } catch {
      return "unknown source";
    }
  };

  if (!isMessagesLoaded) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (notFound) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h2 className="text-2xl font-bold text-red-500 mb-4">Chat not found</h2>
      <p className="text-gray-400">The chat you are looking for does not exist or has been removed.</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
      {/* Title section with image */}
      <div className="mt-8 mb-12">
        {/* Title image section */}
        <div className="relative rounded-xl overflow-hidden mb-6 bg-gradient-to-r from-zinc-800 to-zinc-900">
          {titleImage ? (
            <div className="relative">
              <img
                src={titleImage}
                alt={title}
                className="w-full h-[300px] object-cover"
              />
              {/* Image overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
          ) : (
            <div className="h-[180px] flex items-center justify-center bg-gradient-to-r from-zinc-800 to-zinc-900">
              {isImageUploading ? (
                <div className="animate-pulse flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                  <p className="text-white text-sm">Processing image...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <ImageIcon className="w-12 h-12 text-zinc-500" />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleImageUpload}
                      className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md text-sm flex items-center"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload image
                    </button>
                    <button
                      onClick={handleSearchImage}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm flex items-center"
                    >
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Generate image
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={onImageSelected}
          />

          {/* Title with edit button - positioned at bottom if image exists */}
          <div className={`${titleImage ? 'absolute bottom-0 left-0 w-full p-6' : 'p-6'}`}>
            {editingTitle ? (
              <div className="relative">
                <textarea
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  className="w-full text-2xl sm:text-3xl md:text-4xl font-bold p-3 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  rows={2}
                  placeholder="Enter title..."
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={cancelTitleEdit}
                    className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveTitleEdit}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Title
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <h1
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white ${titleImage ? 'drop-shadow-md' : ''}`}
                  onClick={startTitleEdit}
                >
                  {title}
                </h1>
                {!isPublished && (
                  <button
                    onClick={startTitleEdit}
                    className="p-2 rounded-full hover:bg-zinc-700/70 text-white"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Publish button */}
        {!isPublished && (
          <div className="flex justify-end mb-8">
            <button
              onClick={handlePublish}
              className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium flex items-center shadow-lg"
            >
              <Check className="w-4 h-4 mr-2" />
              Publish
            </button>
          </div>
        )}
      </div>

      {/* Message thread */}
      <div className="space-y-12">
        {messages.map((msg, index) => {
          // Skip first user message as it's already shown as title
          if (index === 0 && msg.role === "user" && msg.content === title) {
            return null;
          }

          return (
            <div key={msg.id || index} className="message-container">
              {/* User message -> Question/section heading */}
              {msg.role === "user" ? (
                <h2 className="text-2xl font-bold mb-6 text-white">{msg.content}</h2>
              ) : (
                <div className="answer-container">
                  {/* Assistant response with markdown */}
                  <div className="prose prose-zinc max-w-none">
                    {editIndex === index ? (
                      <div className="relative rounded-lg border border-zinc-700 overflow-hidden">
                        <textarea
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          className="w-full min-h-[200px] p-4 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        />
                        <div className="flex justify-end gap-2 p-3 bg-zinc-900 border-t border-zinc-700">
                          <button
                            onClick={handleDiscard}
                            className="px-4 py-2 text-sm rounded-md bg-zinc-700 hover:bg-zinc-600 transition text-white"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSave(index)}
                            className="px-4 py-2 text-sm bg-blue-600 rounded-md hover:bg-blue-700 transition text-white"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`markdown-content pb-4 rounded-lg p-4 ${!isPublished ? 'hover:bg-zinc-800/50 cursor-pointer' : ''}`}
                        onClick={() => handleEdit(index, msg.content)}
                      >
                        <div className="markdown-body text-white">
                          <style jsx global>{`
                                                        .markdown-body * {
                                                            color: white !important;
                                                        }
                                                        .markdown-body h1, 
                                                        .markdown-body h2, 
                                                        .markdown-body h3, 
                                                        .markdown-body h4, 
                                                        .markdown-body h5, 
                                                        .markdown-body h6 {
                                                            color: white !important;
                                                            border-bottom-color: rgba(255,255,255,0.2);
                                                        }
                                                        .markdown-body a {
                                                            color: #3b82f6 !important;
                                                        }
                                                        .markdown-body blockquote {
                                                            color: #d1d5db !important;
                                                            border-left-color: rgba(255,255,255,0.3);
                                                        }
                                                        .markdown-body hr {
                                                            border-bottom-color: rgba(255,255,255,0.2);
                                                        }
                                                        .markdown-body table tr {
                                                            background-color: rgba(255,255,255,0.05);
                                                            border-top-color: rgba(255,255,255,0.2);
                                                        }
                                                        .markdown-body table tr:nth-child(2n) {
                                                            background-color: rgba(255,255,255,0.1);
                                                        }
                                                        .markdown-body table th,
                                                        .markdown-body table td {
                                                            border-color: rgba(255,255,255,0.2);
                                                        }
                                                        .markdown-body code {
                                                            background-color: rgba(255,255,255,0.1);
                                                        }
                                                    `}</style>
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                        {!isPublished && (
                          <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              className="p-1.5 rounded-full bg-zinc-700/80 hover:bg-zinc-600/80 text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(index, msg.content);
                              }}
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Sources section */}
                  {(() => {
                    try {
                      let sources = [];

                      // Try to extract sources from metadata
                      if (msg.metadata) {
                        const metadata = JSON.parse(msg.metadata);
                        if (Array.isArray(metadata.sources)) {
                          sources = metadata.sources;
                        }
                      }

                      if (sources.length > 0) {
                        const visibleSources = sources.slice(0, 3);
                        const remainingSources = sources.slice(3);

                        return (
                          <div className="sources-section mt-8 border-t border-zinc-800 pt-6">
                            <h3 className="text-lg font-semibold mb-4 text-white">Sources:</h3>

                            {/* Grid layout for source cards */}
                            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                                            {visibleSources.map((source: any, i: number) => (
                                                                <div
                                                                    key={i}
                                                                    className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3 hover:bg-zinc-800 transition flex items-start gap-3"
                                                                >
                                                                    {/* Favicon */}
                            {/* <img
                                                                        src={getFaviconUrl(source.metadata?.url || "#")}
                                                                        alt=""
                                                                        className="w-5 h-5 mt-0.5 rounded-sm"
                                                                    />
                                                                    
                                                                    <div className="flex-1 overflow-hidden">
                                                                        <p className="text-xs text-gray-400 mb-1">
                                                                            {source.metadata?.url
                                                                                ? formatDomain(source.metadata.url)
                                                                                : "Unknown source"}
                                                                        </p>
                                                                        <p className="text-sm font-medium mb-1 line-clamp-2 text-white">
                                                                            {source.metadata?.title || "Untitled Source"}
                                                                        </p>
                                                                        <a 
                                                                            href={source.metadata?.url} 
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="inline-flex items-center text-xs text-blue-400 hover:text-blue-300"
                                                                        >
                                                                            <ExternalLink className="w-3 h-3 mr-1" />
                                                                            Visit
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            ))} */}
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {visibleSources.map((source: any, i: number) => (
                                <div
                                  key={i}
                                  className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3 hover:bg-zinc-800 transition flex items-start gap-3"
                                >
                                  {/* Favicon */}
                                  <img
                                    src={getFaviconUrl(source.metadata?.url || "#")}
                                    alt=""
                                    className="w-5 h-5 mt-0.5 rounded-sm"
                                  />

                                  <div className="flex-1 overflow-hidden">
                                    <p className="text-xs text-gray-400 mb-1">
                                      {source.metadata?.url
                                        ? formatDomain(source.metadata.url)
                                        : "Unknown source"}
                                    </p>
                                    <p className="text-sm font-medium mb-1 line-clamp-2 text-white">
                                      {source.metadata?.title || "Untitled Source"}
                                    </p>
                                    <a
                                      href={source.metadata?.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center text-xs text-blue-400 hover:text-blue-300"
                                    >
                                      <ExternalLink className="w-3 h-3 mr-1" />
                                      Visit
                                    </a>
                                  </div>
                                </div>
                              ))}


                              {/* Show more sources button */}
                              {remainingSources.length > 0 && (
                                <button
                                  onClick={() => handleOpenSourceDrawer(sources)}
                                  className="bg-zinc-800/50 border border-zinc-700/50 border-dashed rounded-lg p-3 hover:bg-zinc-800 transition flex items-center justify-center"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-white">
                                      +{remainingSources.length} more sources
                                    </span>
                                  </div>
                                </button>
                              )}
                            </div>

                            {/* Sources drawer/sidebar */}
                            <Drawer open={open} onOpenChange={setOpen}>
                              {currentSources.map((source: any, i: number) => (
                                <div
                                  key={i}
                                  className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-zinc-600 transition"
                                >
                                  <div className="flex items-center gap-3 mb-3">
                                    <img
                                      src={getFaviconUrl(source.metadata?.url || "#")}
                                      alt=""
                                      className="w-5 h-5 rounded-sm"
                                    />
                                    <div className="overflow-hidden flex-1">
                                      <p className="text-xs text-gray-400">
                                        {source.metadata?.url
                                          ? formatDomain(source.metadata.url)
                                          : "Unknown source"}
                                      </p>
                                      <p className="text-sm font-medium truncate text-white">
                                        {source.metadata?.title || "Untitled Source"}
                                      </p>
                                    </div>
                                    {source.metadata?.url && (
                                      <a
                                        href={source.metadata.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full hover:bg-zinc-700"
                                      >
                                        <ExternalLink className="w-4 h-4 text-white" />
                                      </a>
                                    )}
                                  </div>

                                  {/* Preview content */}
                                  <div className="mt-3 border-t border-zinc-700 pt-3">
                                    <p className="text-sm text-gray-300 line-clamp-4">
                                      {source.pageContent
                                        ? source.pageContent
                                        : "No preview available"}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </Drawer>
                          </div>
                        );
                      }
                      return null;
                    } catch (error) {
                      console.error("Error rendering sources:", error);
                      return null;
                    }
                  })()}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


// /* eslint-disable react/no-unescaped-entities */

// "use client"

// import type React from "react"

// import { useState, useRef } from "react"
// import Image from "next/image"
// import { Edit2, Check, Clock, Eye, ThumbsUp, ChevronRight } from "lucide-react"
// import { Button } from "@/components/ui/button"
// // import { SourceItem } from "@/components/source-item"

// export default function BlogPost() {
//   const [title, setTitle] = useState("AI Task Capacity Doubles Every 7 Months")
//   const [isEditingTitle, setIsEditingTitle] = useState(false)
//   const [isEditingImage, setIsEditingImage] = useState(false)
//   const [imageUrl, setImageUrl] = useState("/placeholder.svg?height=400&width=800")
//   const titleInputRef = useRef<HTMLInputElement>(null)
//   const imageInputRef = useRef<HTMLInputElement>(null)

//   const handleTitleClick = () => {
//     setIsEditingTitle(true)
//     setTimeout(() => {
//       titleInputRef.current?.focus()
//     }, 0)
//   }

//   const handleTitleSave = () => {
//     setIsEditingTitle(false)
//   }

//   const handleImageClick = () => {
//     setIsEditingImage(true)
//     setTimeout(() => {
//       // imageInputRef.current?.click()
//     }, 0)
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       // const reader = new FileReader()
//       // reader.onload = (event) => {
//       //   setImageUrl(event.target?.result as string)
//       // }
//       // reader.readAsDataURL(file)
//     }
//     setIsEditingImage(false)
//   }

//   const sources = [
//     { name: "metr", icon: "/icons/metr.svg", url: "#" },
//     { name: "arxiv", icon: "/icons/arxiv.svg", url: "#" },
//     { name: "github", icon: "/icons/github.svg", url: "#" },
//     { name: "medium", icon: "/icons/medium.svg", url: "#" },
//   ]

//   return (
//     <div className="max-w-3xl mx-auto px-4 pb-16">
//       {/* Header Actions */}
//       <div className="sticky top-0 z-10 bg-zinc-50 dark:bg-zinc-900 py-4 flex justify-between items-center">
//         <Button variant="ghost" size="icon" className="rounded-full">
//           <span className="sr-only">Back</span>
//           <ChevronRight className="h-6 w-6 rotate-180" />
//         </Button>
//         <div className="flex gap-2">
//           <Button variant="ghost" size="icon" className="rounded-full">
//             <span className="sr-only">Bookmark</span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="h-6 w-6"
//             >
//               <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
//             </svg>
//           </Button>
//           <Button variant="ghost" size="icon" className="rounded-full">
//             <span className="sr-only">Share</span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="h-6 w-6"
//             >
//               <circle cx="18" cy="5" r="3"></circle>
//               <circle cx="6" cy="12" r="3"></circle>
//               <circle cx="18" cy="19" r="3"></circle>
//               <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
//               <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
//             </svg>
//           </Button>
//           <Button variant="ghost" size="icon" className="rounded-full">
//             <span className="sr-only">More</span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="h-6 w-6"
//             >
//               <circle cx="12" cy="12" r="1"></circle>
//               <circle cx="12" cy="5" r="1"></circle>
//               <circle cx="12" cy="19" r="1"></circle>
//             </svg>
//           </Button>
//         </div>
//       </div>

//       {/* Featured Image */}
//       <div
//         className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-4 cursor-pointer group"
//         onClick={handleImageClick}
//       >
//         <Image src={imageUrl || "/placeholder.svg"} alt="Blog header image" fill className="object-cover" />
//         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
//           <Edit2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8" />
//         </div>
//         <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
//           VCG · gettyimages
//         </div>
//         <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
//       </div>

//       {/* Title */}
//       <div className="mb-6">
//         {isEditingTitle ? (
//           <div className="relative">
//             <input
//               ref={titleInputRef}
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full text-3xl md:text-4xl lg:text-5xl font-bold py-2 px-3 bg-transparent border-2 border-primary rounded-md focus:outline-none dark:text-white"
//             />
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-2 top-1/2 -translate-y-1/2"
//               onClick={handleTitleSave}
//             >
//               <Check className="h-6 w-6" />
//             </Button>
//           </div>
//         ) : (
//           <h1
//             className="text-3xl md:text-4xl lg:text-5xl font-bold cursor-pointer hover:text-primary transition-colors dark:text-white"
//             onClick={handleTitleClick}
//           >
//             {title}
//           </h1>
//         )}
//       </div>

//       {/* Content */}
//       <div className="prose prose-zinc dark:prose-invert max-w-none mb-8">
//         <p className="text-lg">
//           According to a study by METR, AI agents' ability to complete tasks has been exponentially increasing, with the
//           length of tasks they can handle doubling approximately every 7 months over the past 6 years, potentially
//           leading to AI systems capable of automating month-long software projects within 5 years.
//         </p>
//       </div>

//       {/* Author and Stats */}
//       <div className="flex items-center justify-between mb-8 border-b border-zinc-200 dark:border-zinc-700 pb-4">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
//             <Image src="/placeholder.svg?height=40&width=40" alt="Author avatar" width={40} height={40} />
//           </div>
//           <div>
//             <p className="text-sm text-zinc-500 dark:text-zinc-400">Curated by</p>
//             <p className="font-medium dark:text-white">dailyed</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
//             <Clock className="h-4 w-4" />
//             <span className="text-sm">15h</span>
//           </div>
//           <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
//             <Eye className="h-4 w-4" />
//             <span className="text-sm">9,006</span>
//           </div>
//           <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
//             <ThumbsUp className="h-4 w-4" />
//             <span className="text-sm">388</span>
//           </div>
//         </div>
//       </div>

//       {/* Sources */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="font-medium text-lg dark:text-white">Sources</h3>
//           <Button variant="ghost" size="sm" className="text-primary">
//             View all sources
//           </Button>
//         </div>
//         {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//           {sources.map((source, index) => (
//             <SourceItem key={index} source={source} />
//           ))}
//         </div> */}
//       </div>

//       {/* Main Content */}
//       <div className="prose prose-zinc dark:prose-invert max-w-none">
//         <h2>METR Metric for AI</h2>
//         <p>
//           The METR (Measuring Exponential Task Resolution) metric, introduced by researchers at METR.org, offers a novel
//           approach to quantifying AI capabilities. This metric focuses on the "50%-task-completion time horizon," which
//           measures the duration of tasks that current AI systems can complete with at least 50% success rate.
//         </p>
//         <p>
//           According to the latest METR report, this metric has been doubling approximately every 7 months since 2018.
//           This exponential growth suggests that AI systems that currently struggle with tasks requiring several hours of
//           focused work might be capable of completing month-long projects by 2028.
//         </p>
//         <p>
//           The implications of this trend are significant for industries relying on knowledge workers. Software
//           development, content creation, and research fields could see dramatic transformations as AI systems become
//           capable of handling increasingly complex and lengthy tasks.
//         </p>
//         <p>
//           However, critics argue that the METR methodology may overestimate AI capabilities by focusing on controlled
//           environments rather than real-world applications. Additionally, questions remain about whether this
//           exponential growth can be sustained as tasks become more complex and require deeper contextual understanding.
//         </p>
//         <h2>Industry Response</h2>
//         <p>
//           Tech companies are already positioning themselves to capitalize on this trend. Major cloud providers are
//           scaling up their AI infrastructure to support more complex and longer-running AI workloads. Meanwhile,
//           startups focused on AI orchestration—managing complex, multi-step AI processes—have seen increased investment.
//         </p>
//         <p>
//           The labor market implications remain uncertain. While some experts predict significant job displacement,
//           others argue that human-AI collaboration will create new roles focused on directing and refining AI outputs
//           rather than producing them from scratch.
//         </p>
//       </div>
//     </div>
//   )
// }
/*
return (
        <div className="mb-16">
        {messages.map((msg, index) => (
          <div key={msg.id || index} className="mb-12">
            {/* User message -> Becomes a blog section title */
// {msg.role === "user" ? (
//   <h2 className="text-2xl font-bold mb-4 text-primary">{msg.content}</h2>
// ) : (
//     <div className="prose prose-zinc dark:prose-invert max-w-none">
//       {/* Inline Editing */}
//       {editIndex === index ? (
//         <div className="relative">
//           <textarea
//             value={editedContent}
//             onChange={(e) => setEditedContent(e.target.value)}
//             className="w-full h-[150px] p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           {/* Save and Discard buttons */}
//           <div className="mt-2 flex gap-4">
//             <button
//               onClick={() => handleSave(index)}
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
//             >
//               Save
//             </button>
//             <button
//               onClick={handleDiscard}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//             >
//               Discard
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div
//           className="cursor-pointer hover:bg-zinc-800 p-2 rounded transition"
//           onClick={() => handleEdit(index, msg.content)}
//         >
//           <ReactMarkdown>{msg.content}</ReactMarkdown>
//         </div>
//       )}

{/* in this i want to have big font in first message which is title and the image upload option like this image where it show as blog title image */ }