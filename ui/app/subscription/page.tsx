"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const PricingCard = ({ plan, onSubscribe }: any) => (
  <Card className="max-w-80 space-y-6">
    <CardHeader className="pb-8 pt-4 gap-8">
      <CardTitle>{plan.item?.name || "Plan Name"}</CardTitle>
      <h3 className="text-3xl font-bold my-6">
        Rs {plan.item?.amount ? (plan.item.amount / 100).toFixed(2) : 0}
      </h3>
    </CardHeader>
    <CardContent className="flex flex-col gap-2">
      <CardDescription className="pt-1.5 h-12">
        {plan.item?.description || "No description available"}
      </CardDescription>
      {["Feature 1", "Feature 2", "Feature 3"].map((f, i) => (
        <span
          key={i}
          className="flex justify-center items-center gap-4 text-sm text-muted-foreground"
        >
          <CheckCircle2 className="text-green-500 h-4 w-4" />
          {f}
        </span>
      ))}
    </CardContent>
    <CardFooter className="mt-2">
      <Button className="w-full" onClick={() => onSubscribe(plan)}>
        Subscribe
      </Button>
    </CardFooter>
  </Card>
);

export default function PlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SUBSCRIPTION_URL}/subscription/plans`)
      .then((response) => {
        if (response.data.items && Array.isArray(response.data.items)) {
          setPlans(response.data.items);
        } else {
          setError("No plans available.");
        }
      })
      .catch(() => setError("Failed to load plans. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  const handleSubscribe = (plan: any) => {
    if (isProcessing) return; // Prevent multiple clicks while processing
      setIsProcessing(true);
    const userId = "12345"; // Replace with actual user ID
    try {
      router.push(`/subscription/checkout?planId=${plan.id}&amount=${plan.item.amount / 100}&userId=${userId}`);
    } catch (error) {
      console.error('Subscription creation failed:', error);
    } finally {
      setIsProcessing(false); // Re-enable button
    }
  };
  return (
    <div className="container py-8 flex flex-col items-center justify-center text-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
        Pricing Plans
      </h1>
      <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-20">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading &&
          !error &&
          plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} onSubscribe={handleSubscribe} />
          ))}
      </section>
    </div>
  );
}
