// "use client";

// import { useState } from "react";
// import { useSearchParams } from "next/navigation";

// import { createClient } from "@/utils/supabase/client";
// import { Button } from "@/components/ui/button";
// import { toast } from "@/hooks/use-toast";
// import { Loader2 } from "lucide-react";
// import Image from "next/image";

// export default function GoogleSignin() {
//   const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
//   const supabase = createClient();

//   const searchParams = useSearchParams();

//   const next = searchParams.get("next");

//   async function signInWithGoogle() {
//     setIsGoogleLoading(true);
//     try {
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: "google",
//         options: {
//           redirectTo: `${window.location.origin}/auth/callback${
//             next ? `?next=${encodeURIComponent(next)}` : ""
//           }`,
//         },
//       });

//       if (error) {
//         throw error;
//       }
//     } catch (error) {
//       toast({
//         title: "Please try again.",
//         description: "There was an error logging in with Google.",
//         variant: "destructive",
//       });
//       setIsGoogleLoading(false);
//     }
//   }

//   return (
//     <Button
//       type="button"
//       variant="outline"
//       onClick={signInWithGoogle}
//       disabled={isGoogleLoading}
//     >
//       {isGoogleLoading ? (
//         <Loader2 className="mr-2 size-4 animate-spin" />
//       ) : (
//         <Image
//           src="https://authjs.dev/img/providers/google.svg"
//           alt="Google logo"
//           width={20}
//           height={20}
//           className="mr-2"
//         />
//       )}{" "}
//       Sign in with Google
//     </Button>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function GoogleSignin() {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const supabase = createClient();
  const router = useRouter(); // For programmatic navigation
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  async function signInWithGoogle() {
    setIsGoogleLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback${
            next ? `?next=${encodeURIComponent(next)}` : ""
          }`,
        },
      });

      if (error) {
        throw error;
      }

      // Redirect to the dashboard after successful sign-in
      router.push(next || "/dashboard");
    } catch (error) {
      toast({
        title: "Please try again.",
        description: "There was an error logging in with Google.",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="bg-[#34495e] text-white hover:bg-[#2c3e50]" // Custom styles applied here
      onClick={signInWithGoogle}
      disabled={isGoogleLoading}
    >
      {isGoogleLoading ? (
        <Loader2 className="mr-2 size-4 animate-spin" />
      ) : (
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          width={20}
          height={20}
          className="mr-2"
        />
      )}{" "}
      Sign in with Google
    </Button>
  );
}
