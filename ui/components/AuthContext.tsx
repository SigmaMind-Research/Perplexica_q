// import React, { createContext, useContext, useState } from 'react';

// interface AuthContextType {
//   isLoggedIn: boolean;
//   userEmail: string | null;
//   login: (email: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userEmail, setUserEmail] = useState<string | null>(null);

//   const login = (email: string) => {
//     setIsLoggedIn(true);
//     setUserEmail(email);
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     setUserEmail(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
