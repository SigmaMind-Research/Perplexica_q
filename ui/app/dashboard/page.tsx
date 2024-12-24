// import { redirect } from "next/navigation";
// import { createClient } from "@/utils/supabase/server";
// // import { Button } from "@/components/ui/button";
// import LogoutButton from "./LogoutButton";

// export default async function Dashboard() {
//   const supabase = createClient();
//   const { data, error } = await supabase.auth.getUser();
//   if (error || !data?.user) {
//     redirect("/login");
//   }

//   return (
//     <>
//       <div>Dashboard</div>
//       <p>Hello {data.user.email}</p>

//       <LogoutButton />
//     </>
//   );
// }


// import { redirect } from 'next/navigation';
// import Cookies from 'js-cookie';
// import { createClient } from '@/utils/supabase/server';
// import LogoutButton from './LogoutButton';

// export default async function Dashboard() {
//   const supabase = createClient();

//   try {
//     const { data: { user }, error } = await supabase.auth.getUser();

//     if (error) {
//       console.error('Error checking session:', error);
//       redirect('/login');
//       return;
//     }

//     if (user) {
//       // User is authenticated, render dashboard
//       return (
//         <div>
//           <p>Welcome to the Dashboard</p>
//           <LogoutButton />
//         </div>
//       );
//     }

//     // Check for anonymous user in cookies
//     const anonymousCookie = Cookies.get('sb-lqfncvigfsrmhownygra-auth-token-code-verifier');
//     if (anonymousCookie) {
//       const decodedCookie = JSON.parse(atob(anonymousCookie.split('.')[1]));

//       if (decodedCookie?.is_anonymous) {
//         // Redirect anonymous users from dashboard
//         redirect('/');
//         return;
//       }
//     }

//     // If no user session is found, redirect to login
//     redirect('/login');
//   } catch (error) {
//     console.error('Error:', error);
//     redirect('/login');
//   }
// }
