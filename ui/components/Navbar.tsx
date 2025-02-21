// import { History, Clock, Edit, Share, Trash } from 'lucide-react';
// import { Message } from './ChatWindow';
// import { useEffect, useState } from 'react';
// import { formatTimeDifference } from '@/lib/utils';
// import Link from 'next/link';
// import { useSelectedLayoutSegments } from 'next/navigation';
// import DeleteChat from './DeleteChat';

// const Navbar = ({
//   chatId,
//   messages,
// }: {
//   messages: Message[];
//   chatId: string;
// }) => {
//   const [title, setTitle] = useState<string>('');
//   const [timeAgo, setTimeAgo] = useState<string>('');

//   useEffect(() => {
//     if (messages.length > 0) {
//       const newTitle =
//         messages[0].content.length > 20
//           ? `${messages[0].content.substring(0, 20).trim()}...`
//           : messages[0].content;
//       setTitle(newTitle);
//       const newTimeAgo = formatTimeDifference(
//         new Date(),
//         messages[0].createdAt,
//       );
//       setTimeAgo(newTimeAgo);
//     }
//   }, [messages]);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       if (messages.length > 0) {
//         const newTimeAgo = formatTimeDifference(
//           new Date(),
//           messages[0].createdAt,
//         );
//         setTimeAgo(newTimeAgo);
//       }
//     }, 1000);

//     return () => clearInterval(intervalId);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className="fixed z-40 top-2 left-0 right-0 px-2 lg:pl-[104px] lg:pr-6 lg:px-8 flex flex-row items-center justify-between w-full py-0 text-sm text-black dark:text-white/70 border-b bg-light-primary dark:bg-dark-primary border-light-100 dark:border-dark-200">
//       {/* <a
//         href="/"
//         className="active:scale-95 transition duration-100 cursor-pointer lg:hidden"
//       >
//         <Edit size={17} />
//       </a> */}

//       {/* Logo */}
//       <a href="/" className="lg:hidden">
//     <img src="/plogo.png" alt="" className="h-14 w-auto mb-0 -ml-2" />
//   </a>

//       {/* Recents History Icon visible only on mobile screens */}
// <Link
//   href="/library"
//   className="flex flex-row items-center space-x-4 p-1 lg:hidden mt-[-10px]"
// >
//   <History
//     size={17}
//     className="active:scale-95 transition duration-100 cursor-pointer"
//   />
// </Link>



//        {/* upload and delete */}
//       {/* <div className="hidden lg:flex flex-row items-center justify-center space-x-2">
//         <Clock size={17} />
//         <p className="text-xs">{timeAgo} ago</p>
//       </div>
//       <p className="hidden lg:flex">{title}</p>

//       <div className="flex flex-row items-center space-x-4">
//         <Share
//           size={17}
//           className="active:scale-95 transition duration-100 cursor-pointer"
//         />
//         <DeleteChat redirect chatId={chatId} chats={[]} setChats={() => {}} />
//       </div> */}
//     </div>
//   );
// };

// export default Navbar;






import { History, Clock, Edit, Share, Trash } from 'lucide-react';
import { Message } from './ChatWindow';
import { useEffect, useState } from 'react';
import { formatTimeDifference } from '@/lib/utils';
import { getSessionAndUser } from '@/lib/sessionService'; // Service for checking authentication

const Navbar = ({
  chatId,
  messages,
}: {
  messages: Message[];
  chatId: string;
}) => {
  const [title, setTitle] = useState<string>('');
  const [timeAgo, setTimeAgo] = useState<string>('');

  useEffect(() => {
    if (messages.length > 0) {
      const newTitle =
        messages[0].content.length > 20
          ? `${messages[0].content.substring(0, 20).trim()}...`
          : messages[0].content;
      setTitle(newTitle);
      const newTimeAgo = formatTimeDifference(
        new Date(),
        messages[0].createdAt,
      );
      setTimeAgo(newTimeAgo);
    }
  }, [messages]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (messages.length > 0) {
        const newTimeAgo = formatTimeDifference(
          new Date(),
          messages[0].createdAt,
        );
        setTimeAgo(newTimeAgo);
      }
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleHistoryClick = async () => {
    const { session, user } = await getSessionAndUser(); // Check authentication

    if (!session || !user || user?.is_anonymous) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
    } else {
      // Redirect to library if authenticated
      window.location.href = '/library';
    }
  };

  return (
    <div className="fixed z-40 top-0   left-0 right-0 px-2 lg:pl-[104px] lg:pr-6 lg:px-8 flex flex-row items-center justify-between w-full py-0 text-sm text-black dark:text-white/70 border-b bg-light-primary dark:bg-dark-primary border-light-100 dark:border-dark-200">
      {/* Logo */}
      <a href="/" className="lg:hidden">
        <img src="/plogo.png" alt="" className="h-14 w-auto mb-0 -ml-2" />
      </a>

      {/* Recents History Icon visible only on mobile screens */}
      <div
        onClick={handleHistoryClick}
        className="flex flex-row items-center space-x-4 p-1 lg:hidden mt-[-10px] cursor-pointer"
      >
        <History
          size={17}
          className="active:scale-95 transition duration-100"
        />
      </div>

      {/* Additional navbar items */}
      {/* Uncomment and use these if needed */}
      {/* <div className="hidden lg:flex flex-row items-center justify-center space-x-2">
        <Clock size={17} />
        <p className="text-xs">{timeAgo} ago</p>
      </div> */}
      {/* <p className="hidden lg:flex">{title}</p> */}
      {/* <div className="flex flex-row items-center space-x-4">
        <Share
          size={17}
          className="active:scale-95 transition duration-100 cursor-pointer"
        />
        <DeleteChat redirect chatId={chatId} chats={[]} setChats={() => {}} />
      </div> */}
    </div>
  );
};

export default Navbar;
