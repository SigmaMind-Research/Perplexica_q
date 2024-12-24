// // lib/sessionService.ts

// import { createClient } from "@/utils/supabase/client";
// const supabase = createClient();

// export async function getSessionAndUser() {
//   try {
//     const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
//     if (sessionError) throw sessionError;

//     const { data: userData, error: userError } = await supabase.auth.getUser();
//     if (userError) throw userError;

//     return {
//       session: sessionData.session,
//       user: userData.user,
//     };
//   } catch (error) {
//     console.error("Error fetching session or user:", error);
//     return { session: null, user: null };
//   }
// }

// export function signOut() {
//   return supabase.auth.signOut();
// }


// lib/sessionService.ts
// lib/sessionService.ts



// import { createClient } from "@/utils/supabase/client";
// import { v4 as uuidv4 } from "uuid";
// const supabase = createClient();

// export async function getSessionAndUser() {
//   try {
//     const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
//     if (sessionError) throw sessionError;

//     const { data: userData, error: userError } = await supabase.auth.getUser();
//     if (userError) throw userError;

//     return {
//       session: sessionData.session,
//       user: userData.user,
//     };
//   } catch (error) {
//     console.error("Error fetching session or user:", error);
//     return { session: null, user: null };
//   }
// }

// export function signOut() {
//   return supabase.auth.signOut();
// }

// // For anonymous session management
// export function getAnonymousUser() {
//   let anonymousUserId = localStorage.getItem("anonymousUserId");

//   if (!anonymousUserId) {
//     anonymousUserId = uuidv4();
//     localStorage.setItem("anonymousUserId", anonymousUserId);
//   }

//   return anonymousUserId;
// }


// import { createClient } from "@/utils/supabase/client";

// const supabase = createClient();

// /**
//  * Fetches the current session and user.
//  */
// export async function getSessionAndUser() {
//   try {
//     // Try to get the session first
//     const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

//     if (sessionError || !sessionData.session) {
//       // If no session or error, return null session and user
//       // console.error("Session not found or expired");
//       return { session: null, user: null };
//     }

//     // If session exists, get the user
//     const { data: userData, error: userError } = await supabase.auth.getUser();
//     if (userError) throw userError;

//     return {
//       session: sessionData.session,
//       user: userData.user,
//     };
//   } catch (error) {
//     console.error("Error fetching session or user:", error);
//     return { session: null, user: null };
//   }
// }


// /**
//  * Signs the user out of the application.
//  */
// export function signOut() {
//   return supabase.auth.signOut();
// }

// /**
//  * Signs in the user anonymously.
//  */
// export async function signInAnonymously() {
//   try {
//     const { data: anonData, error: anonError } = await supabase.auth.signInAnonymously();
//     if (anonError) throw anonError;

//     console.log("Signed in anonymously:", anonData);
//     return anonData;
//   } catch (error) {
//     console.error("Error signing in anonymously:", error);
//     return null;
//   }
// }

// /**
//  * Converts an anonymous user to a permanent user by linking an email and password.
//  */
// export async function convertAnonymousToPermanent(email: string, password: string) {
//   try {
//     // Add an email to the anonymous user
//     const { data: emailData, error: emailError } = await supabase.auth.updateUser({
//       email,
//     });

//     if (emailError) {
//       console.error("Email already exists or another issue:", emailError.message);
//       return null;
//     }

//     console.log("Email linked to anonymous user:", emailData);

//     // Set a password after linking the email
//     const { data: passwordData, error: passwordError } = await supabase.auth.updateUser({
//       password,
//     });

//     if (passwordError) throw passwordError;

//     console.log("Password set successfully. User is now permanent:", passwordData);
//     return passwordData;
//   } catch (error) {
//     console.error("Error converting anonymous user to permanent:", error);
//     return null;
//   }
// }




import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

/**
 * Fetches the current session and user.
 */
export async function getSessionAndUser() {
  try {
    // Try to get the session first
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      // If no session or error, return null session and user
      return { session: null, user: null };
    }

    // If session exists, get the user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    return {
      session: sessionData.session,
      user: userData.user,
    };
  } catch (error) {
    console.error("Error fetching session or user:", error);
    return { session: null, user: null };
  }
}

/**
 * Signs the user out of the application.
 */
export function signOut() {
  return supabase.auth.signOut();
}
