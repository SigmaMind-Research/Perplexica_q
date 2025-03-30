'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { cn, formatTimeDifference } from '@/lib/utils';
import { BookOpenText, ClockIcon, Library,ChevronDown, ChevronUp, Search } from 'lucide-react';
import Link from 'next/link';
import DeleteChat from '@/components/DeleteChat';
import { createClient } from '@/utils/supabase/client'; 

// Truncate long titles utility function
const truncateTitle = (title: string, maxLength: number) =>
  title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;

export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  focusMode: string;
  history: { message: string; source: string; link: string }[];
}

const Page = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleTimePeriods, setVisibleTimePeriods] = useState<number>(8); // Initial number of periods to show
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Function to determine which time period a chat belongs to
  const getChatTimePeriod = (chatDate: Date): string => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const chatDay = new Date(chatDate.getFullYear(), chatDate.getMonth(), chatDate.getDate());

    if (chatDay.getTime() === today.getTime()) {
      return 'Today';
    } else if (chatDay.getTime() === yesterday.getTime()) {
      return 'Yesterday';
    } else if (chatDay >= sevenDaysAgo && chatDay < yesterday) {
      return 'Previous 7 Days';
    } else if (chatDay >= thirtyDaysAgo && chatDay < sevenDaysAgo) {
      return 'Previous 30 Days';
    } else {
      // Format as Month Day, Year
      return chatDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  // Group chats by time period instead of by date
  const groupChatsByTimePeriod = (chats: Chat[]) => {
    return chats.reduce((groups, chat) => {
      const chatDate = new Date(chat.createdAt);
      const period = getChatTimePeriod(chatDate);
      
      if (!groups[period]) {
        groups[period] = [];
      }
      groups[period].push(chat);
      return groups;
    }, {} as Record<string, Chat[]>);
  };

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    new Date(chat.createdAt).toLocaleDateString().includes(searchQuery)
  );

  const groupedChats = groupChatsByTimePeriod(filteredChats);

  // Define the order of time periods
  const timePeriodOrder = ['Today', 'Yesterday', 'Previous 7 Days', 'Previous 30 Days'];

  // Sort time periods with custom ones first, then specific dates
  const sortedTimePeriods = Object.keys(groupedChats).sort((a, b) => {
    const aIndex = timePeriodOrder.indexOf(a);
    const bIndex = timePeriodOrder.indexOf(b);
    
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    } else if (aIndex !== -1) {
      return -1;
    } else if (bIndex !== -1) {
      return 1;
    } else {
      // For specific dates, sort newest first
      return new Date(b).getTime() - new Date(a).getTime();
    }
  });

  // Toggle expanded state for a section
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Reset visible time periods when search query changes
  useEffect(() => {
    setVisibleTimePeriods(8);
    setHasMore(true);
  }, [searchQuery]);

  // Implement infinite scrolling
  const loadMoreItems = useCallback(() => {
    if (loadingMore) return;
    
    setLoadingMore(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisibleTimePeriods(prev => {
        const newValue = prev + 4;
        if (newValue >= sortedTimePeriods.length) {
          setHasMore(false);
        }
        return newValue;
      });
      setLoadingMore(false);
    }, 300);
  }, [loadingMore, sortedTimePeriods.length]);

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    if (loadingMore) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }

    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreItems();
      }
    }, options);

    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, loadMoreItems, loadingMore]);

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      const supabase = createClient();
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      const { data, error } = await supabase
        .from('chats') // Replace 'chats' with your Supabase table name
        .select('*')
        .eq('userId', userId);

      if (error) {
        console.error('Error fetching chats:', error);
        setLoading(false);
        return;
      }
      const sortedChats = data.reverse();
      // console.log('Fetched chats:', data);  // Log the data
      setChats(data);
      setLoading(false);
    };

    fetchChats();
  }, []);

  return loading ? (
    <div className="flex flex-row items-center justify-center min-h-screen">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-light-200 fill-light-secondary dark:text-[#202020] animate-spin dark:fill-[#ffffff3b]"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100.003 78.2051 78.1951 100.003 50.5908 100C22.9765 99.9972 0.997224 78.018 1 50.4037C1.00281 22.7993 22.8108 0.997224 50.4251 1C78.0395 1.00281 100.018 22.8108 100 50.4251ZM9.08164 50.594C9.06312 73.3997 27.7909 92.1272 50.5966 92.1457C73.4023 92.1642 92.1298 73.4365 92.1483 50.6308C92.1669 27.8251 73.4392 9.0973 50.6335 9.07878C27.8278 9.06026 9.10003 27.787 9.08164 50.594Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4037 97.8624 35.9116 96.9801 33.5533C95.1945 28.8227 92.871 24.3692 90.0681 20.348C85.6237 14.1775 79.4473 9.36872 72.0454 6.45794C64.6435 3.54717 56.3134 2.65431 48.3133 3.89319C45.869 4.27179 44.3768 6.77534 45.014 9.20079C45.6512 11.6262 48.1343 13.0956 50.5786 12.717C56.5073 11.8281 62.5542 12.5399 68.0406 14.7911C73.527 17.0422 78.2187 20.7487 81.5841 25.4923C83.7976 28.5886 85.4467 32.059 86.4416 35.7474C87.1273 38.1189 89.5423 39.6781 91.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  ) : (
    <div className="space-y-2">
      {/* Hero UI header */}
     

<div className="card p-6 shadow-md bg-white dark:bg-[#1c1c1c] mt-6 rounded-lg"> 
  <div className="flex items-center mb-1">
    <Library className="h-8 w-8 text-white" />
    <h1 className="text-3xl font-medium p-2">Library</h1>
  </div>

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2 gap-2">
    <p className="text-black/70 dark:text-white/70">
      Access your previous conversations and search history
    </p>
    
    <div className="relative lg:w-1/3 w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search chats..."
        className="w-full border rounded-md pl-10 pr-4 py-2 text-base bg-gray-100 dark:bg-[#2b2b2b] text-black dark:text-white focus:outline-none transition duration-300"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  </div>

  <hr className="border-t border-[#2B2C2C] my-4 w-full" />
</div>


       
      {/* When no groups found */}
      {sortedTimePeriods.length === 0 && (
        <div className="flex flex-row items-center justify-center h-40">
          <p className="text-black/70 dark:text-white/70 text-sm">No chats found.</p>
        </div>
      )}

      {/* Time period sections */}
      {sortedTimePeriods.slice(0, visibleTimePeriods).map((period) => {
        const periodChats = groupedChats[period];
        const displayCount = expandedSections[period] ? periodChats.length : Math.min(periodChats.length, 5);
        const hasMoreChats = periodChats.length > 5;

        return (
          <div key={period} className="card p-4 shadow-md bg-white dark:bg-[#1c1c1c] rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">{period}</h2>
              <span className="text-sm text-black/70 dark:text-white/70 ml-4">{periodChats.length} chats</span>
            </div>

            <div className={cn(
              "flex flex-col",
              expandedSections[period] ? "max-h-[600px] overflow-y-auto" : ""
            )}>
              {periodChats.slice(0, displayCount).map((chat, i) => (
                <div
                  className={cn(
                    'flex flex-col space-y-2 py-3',
                    i !== displayCount - 1
                      ? 'border-b border-white-200 dark:border-dark-200'
                      : ''
                  )}
                  key={chat.id}
                >
                  <Link
                    href={`/search/${chat.id}`}
                    className="text-black dark:text-white lg:text-xl font-medium truncate transition duration-200 hover:text-[#24A0ED] dark:hover:text-[#24A0ED] cursor-pointer"
                  >
                    {truncateTitle(chat.title, 30)}
                  </Link>
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-row items-center space-x-1 lg:space-x-1.5 text-black/70 dark:text-white/70">
                      <ClockIcon size={15} />
                      <p className="text-xs">
                        {formatTimeDifference(new Date(), chat.createdAt)} Ago
                      </p>
                    </div>
                    <DeleteChat chatId={chat.id} chats={chats} setChats={setChats} />
                  </div>

                  {/* Display chat history */}
                  <div className="text-sm text-black/70 dark:text-white/70 mt-2">
                    {chat.history?.map((historyItem, index) => (
                      <div key={index} className="mt-2">
                        <p><strong>Message:</strong> {historyItem.message}</p>
                        <p><strong>Source:</strong> {historyItem.source}</p>
                        <p><strong>Link:</strong> <a href={historyItem.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{historyItem.link}</a></p>
                      </div>
                    ))}
                  </div>

                  {i !== displayCount - 1 && (
                    <hr className="my-2 border-t border-[#2B2C2C]" />
                  )}
                </div>
              ))}
            </div>

            {/* View more/less button */}
            {hasMoreChats && (
              <button
                onClick={() => toggleSection(period)}
                className="text-blue-500 hover:text-blue-600 text-sm mt-4 flex items-center justify-center w-full"
              >
                {expandedSections[period] ? (
                  <>
                    <ChevronUp size={16} className="mr-1" /> View Less
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} className="mr-1" /> View More ({periodChats.length - 5} more)
                  </>
                )}
              </button>
            )}
          </div>
        );
      })}

      {/* Loading indicator for infinite scroll */}
      {hasMore && sortedTimePeriods.length > 0 && (
        <div 
          ref={loadMoreRef} 
          className="flex justify-center items-center py-4"
        >
          {loadingMore ? (
            <svg
              className="animate-spin h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <div className="h-8"></div> // Spacer element for observer
          )}
        </div>
      )}
    </div>
  );
};

export default Page;