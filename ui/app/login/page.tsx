// import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation";
// import LoginForm from "./LoginForm";

// export default async function LoginPage() {
//   const supabase = createClient();
//   const { data, error } = await supabase.auth.getUser();
//   if (data.user) {
//     redirect("/dashboard");
//   }

//   return <LoginForm />;
// }


// app/auth/login/page.tsx (Server-Side)



// app/login/page.tsx


// "use client";

// import { useEffect, useState } from "react";
// <<<<<<< HEAD
// import { useRouter } from "next/navigation";  // Use useRouter for client-side redirection
// import { getSessionAndUser, getAnonymousUser } from "@/lib/sessionService";
// =======
// import { redirect } from "next/navigation";
// import { getSessionAndUser, signInAnonymously } from "@/lib/sessionService";
// >>>>>>> parent of 9ca8b91 (auth changes)
// import LoginForm from "./LoginForm";

// export default function LoginPage() {
//   const [loading, setLoading] = useState(true);
// <<<<<<< HEAD
//   const router = useRouter();  // Initialize useRouter hook
// =======
// >>>>>>> parent of 9ca8b91 (auth changes)

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
// <<<<<<< HEAD
//         const { user } = await getSessionAndUser();
        
//         if (user) {
//           // If user is logged in, redirect to the dashboard
//           router.push("/dashboard");  // Client-side redirection
//         } else {
//           // If no user session, check for an anonymous user ID in local storage
//           const anonymousUserId = getAnonymousUser();

//           // If an anonymous user ID exists, redirect to the dashboard
//           if (anonymousUserId) {
//             router.push("/dashboard");  // Client-side redirection
// =======
//         const { user, session } = await getSessionAndUser();

//         if (user) {
//           // If the user is logged in, redirect to the dashboard
//           redirect("/dashboard");
//         } else if (session) {
//           // If the session exists but the user is not logged in, sign in anonymously
//           const anonymousUser = await signInAnonymously();
//           if (!anonymousUser) {
//             console.error("Failed to sign in anonymously.");
// >>>>>>> parent of 9ca8b91 (auth changes)
//           }
//         }
//       } catch (error) {
//         console.error("Error during session check:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkSession();
//   }, [router]);

//   // Show a loading indicator while checking session
//   if (loading) return <div>Loading...</div>;

//   return <LoginForm />;
// }


// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { getSessionAndUser, signInAnonymously } from "@/lib/sessionService";
// import LoginForm from "./LoginForm";

// export default function LoginPage() {
//   const router = useRouter();  // Router for redirection

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const { user, session } = await getSessionAndUser();

//         if (user) {
//           // If the user is logged in, redirect to the dashboard
//           router.push("/dashboard");
//         } else if (session) {
//           // If the session exists but the user is not logged in, sign in anonymously
//           const anonymousUser = await signInAnonymously();
//           if (anonymousUser) {
//             router.push("/dashboard"); // Redirect after anonymous sign-in
//           }
//         }
//       } catch (error) {
//         console.error("Error during session check:", error);
//       }
//     };

//     checkSession();
//   }, [router]);  // Re-run if router changes

//   return <LoginForm />;  // Render the login form if user is not redirected
// }


// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { getSessionAndUser } from "@/lib/sessionService";
// import LoginForm from "./LoginForm";

// export default function LoginPage() {
//   const router = useRouter(); // Router for redirection

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const { user } = await getSessionAndUser();

//         if (user) {
//           // If the user is logged in, redirect to the dashboard
//           router.push("/");
//         }
//       } catch (error) {
//         console.error("Error during session check:", error);
//       }
//     };

//     checkSession();
//   }, [router]); // Re-run if router changes

//   return <LoginForm />; // Render the login form if user is not redirected
// }








"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSessionAndUser } from "@/lib/sessionService";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const router = useRouter(); // Router for redirection

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { user } = await getSessionAndUser();

        if (!user?.is_anonymous) {
          // If the user is logged in, redirect to the dashboard
          router.push("/");
        }
      } catch (error) {
        console.error("Error during session check:", error);
      }
    };

    checkSession();
  }, [router]); // Re-run if router changes

  return <LoginForm />; // Render the login form if user is not redirected
}
