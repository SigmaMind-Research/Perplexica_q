// "use client";
// import * as React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { useRouter, useSearchParams } from "next/navigation";
// import Script from "next/script";
// import { LoaderCircle } from "lucide-react";

// export default function Checkout() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const amount = params.get("amount");
//   const planId = params.get("planId");
//   const userId = params.get("userId");

//   const [loading1, setLoading1] = React.useState(true);
//   const [loading, setLoading] = React.useState(false);
//   const [orderId, setOrderId] = React.useState<string | null>(null);

//   React.useEffect(() => {
//     if (!amount || !planId || !userId) {
//       router.replace("/");
//     } else {
//       createSubscription();
//     }
//   }, []);

//   const createSubscription = async () => {
//     try {
//       const response = await fetch("/api/subscription/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           planId,
//           userId,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create subscription");
//       }

//       const data = await response.json();
//       const subscriptionId = data.subscription.id;
//       createOrderId(subscriptionId);
//     } catch (error) {
//       console.error("Error creating subscription:", error);
//       setLoading1(false);
//     }
//   };

//   const createOrderId = async (subscriptionId: string) => {
//     try {
//       const response = await fetch("/api/subscription/razorpay-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           subscriptionId,
//           amount: parseFloat(amount!) * 100, // Amount in paise
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create Razorpay order");
//       }

//       const data = await response.json();
//       setOrderId(data.order.id);
//       setLoading1(false);
//     } catch (error) {
//       console.error("Error creating order:", error);
//       setLoading1(false);
//     }
//   };

//   const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const options = {
//         key: "rzp_test_5fCROkV0QkMat9", // Your Razorpay key_id
//         amount: parseFloat(amount!) * 100, // Amount in paise
//         currency: "INR",
//         name: "Payment", // Business name
//         description: "Payment",
//         order_id: orderId,
//         handler: async function (response: any) {
//           const data = {
//             orderCreationId: orderId,
//             razorpayPaymentId: response.razorpay_payment_id,
//             razorpayOrderId: response.razorpay_order_id,
//             razorpaySignature: response.razorpay_signature,
//           };

//           const result = await fetch("/api/verify", {
//             method: "POST",
//             body: JSON.stringify(data),
//             headers: { "Content-Type": "application/json" },
//           });
//           const res = await result.json();
//           if (res.isOk) alert(res.message); // Process further request after success
//           else {
//             alert(res.message); // Handle failure response
//           }
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };
//       const paymentObject = new window.Razorpay(options);
//       paymentObject.on("payment.failed", function (response: any) {
//         alert(response.error.description);
//       });
//       setLoading(false);
//       paymentObject.open();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (loading1)
//     return (
//       <div className="container h-screen flex justify-center items-center">
//         <LoaderCircle className=" animate-spin h-20 w-20 text-primary" />
//       </div>
//     );

//   return (
//     <>
//       <Script
//         id="razorpay-checkout-js"
//         src="https://checkout.razorpay.com/v1/checkout.js"
//       />

//       <section className="container h-screen flex flex-col justify-center items-center gap-10">
//         <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
//           Checkout
//         </h1>
//         <Card className="max-w-[25rem] space-y-8">
//           <CardHeader>
//             <CardTitle className="my-4">Continue</CardTitle>
//             <CardDescription>
//               By clicking on pay, you'll purchase your plan subscription of Rs{" "}
//               {amount}/month
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={processPayment}>
//               <Button className="w-full" type="submit">
//                 {loading ? "...loading" : "Pay"}
//               </Button>
//             </form>
//           </CardContent>
//           <CardFooter className="flex">
//             <p className="text-sm text-muted-foreground underline underline-offset-4">
//               Please read the terms and conditions.
//             </p>
//           </CardFooter>
//         </Card>
//       </section>
//     </>
//   );
// }




"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { LoaderCircle } from "lucide-react";

export default function Checkout() {
  const router = useRouter();
  const params = useSearchParams();
  const amount = params.get("amount");
  const [loading1,setLoading1] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const idRef = React.useRef()

  React.useEffect(()=>{
    if(!amount){
        router.replace("/")
    }
    createOrderId();
  },[])

  const createOrderId = async () => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount!) * 100,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const id = data.orderId
      idRef.current = id;
      setLoading1(false)
      return;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };
  const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const orderId = idRef.current
    console.log(orderId)
    try {
      const options = {
        key: process.env.key_id,
        amount: parseFloat(amount!) * 100,
        currency: "INR",
        name: "Payment", //busniess name
        description: "Payment",
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await fetch("/api/verify", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });
          const res = await result.json();
          //process further request, whatever should happen after request fails
          if (res.isOk) alert(res.message); //process further request after 
          else {
            alert(res.message);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        alert(response.error.description);
      });
      setLoading(false);
      paymentObject.open();
    } catch (error) {
      console.error(error);
    }
  };
  if(loading1) return <div className="container h-screen flex justify-center items-center">
    <LoaderCircle className=" animate-spin h-20 w-20 text-primary" />
    </div>
  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <section className="container h-screen flex flex-col justify-center items-center gap-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Checkout
        </h1>
        <Card className="max-w-[25rem] space-y-8">
          <CardHeader>
            <CardTitle className="my-4">Continue</CardTitle>
            <CardDescription>
              By clicking on pay you'll purchase your plan subscription of Rs{" "}
              {amount}/month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={processPayment}>
              <Button className="w-full" type="submit">{loading?"...loading":"Pay"}</Button>
            </form>
          </CardContent>
          <CardFooter className="flex">
            <p className="text-sm text-muted-foreground underline underline-offset-4">
              Please read the terms and conditions.
            </p>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
