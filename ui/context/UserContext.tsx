// // context/UserContext.tsx
// import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
// import { createClient } from '@/utils/supabase/client'; // assuming you have supabase client setup

// interface UserContextType {
//   user: any;
//   setUser: React.Dispatch<React.SetStateAction<any>>;
//   logout: () => void;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser)); // Retrieve user from localStorage
//     } else {
//       const fetchUser = async () => {
//         const supabase = createClient();
//         const { data, error } = await supabase.auth.getUser();
//         if (data?.user) {
//           setUser(data.user);
//           localStorage.setItem('user', JSON.stringify(data.user)); // Store user in localStorage
//         }
//       };
//       fetchUser();
//     }
//   }, []);

//   const logout = async () => {
//     const supabase = createClient();
//     await supabase.auth.signOut();
//     setUser(null);
//     localStorage.removeItem('user'); // Remove user from localStorage
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Custom hook to use the user context
// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };
// context/UserContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the User interface
interface User {
  email: string;
  name: string;
}

// Define the context type
interface UserContextType {
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
}

// Default (fallback) values for the context
const defaultUserContext: UserContextType = {
  user: null,
  login: () => console.warn('login() called without UserProvider'),
  logout: () => console.warn('logout() called without UserProvider'),
};

// Create the context
const UserContext = createContext<UserContextType>(defaultUserContext);

// Props for the Provider
interface UserProviderProps {
  children: ReactNode;
}

// Context Provider Component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, name: string) => {
    setUser({ email, name });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to Access the Context
export const useUser = (): UserContextType => {
  return useContext(UserContext);
};
