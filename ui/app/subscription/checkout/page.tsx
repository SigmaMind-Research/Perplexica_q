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
  const planId = params.get("planId");
  const userId = params.get("userId");

  const [loading, setLoading] = React.useState(true);
  const [subscriptionId, setSubscriptionId] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    if (!amount || !planId || !userId) {
      router.replace("/");
    } else {
      createSubscription();
    }
  }, []);

  const createSubscription = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUBSCRIPTION_URL}/subscription/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            planId,
            userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create subscription");
      }

      const data = await response.json();
      setSubscriptionId(data.subscription.id); // Save the subscription ID
      setLoading(false);
    } catch (error) {
      console.error("Error creating subscription:", error);
      setLoading(false);
    }
  };

  const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Razorpay key_id
        subscription_id: subscriptionId, // Razorpay subscription ID
        name: "Subscription Payment",
        description: "Subscribe to our plan",
        handler: async function (response: any) {
          // Send payment verification details to the backend
          // console.log(response);
          const verificationResponse = await fetch(
            `${process.env.NEXT_PUBLIC_SUBSCRIPTION_URL}/subscription/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_subscription_id: response.razorpay_subscription_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          const verificationData = await verificationResponse.json();
          if (Boolean(verificationData.success)) {
            alert("Payment successful!");
            router.push("/subscription/success"); // Redirect to success page
          } else {
            alert("Payment verification failed. Please try again.");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        alert(`Payment failed: ${response.error.description}`);
      });
      paymentObject.open();
    } catch (error) {
      console.error("Error in payment processing:", error);
    }
  };

  if (loading)
    return (
      <div className="container h-screen flex justify-center items-center">
        <LoaderCircle className="animate-spin h-20 w-20 text-primary" />
      </div>
    );

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
              By clicking on pay, you'll purchase your plan subscription of Rs{" "}
              {amount}/month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={processPayment}>
              <Button className="w-full" type="submit">
                Pay Now
              </Button>
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

