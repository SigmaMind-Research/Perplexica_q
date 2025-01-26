

// "use client";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { CheckCircle2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import axios from "axios";

// type PricingCardProps = {
//   title: string;
//   price: number;
//   description: string;
//   features: string[];
//   actionLabel: string;
//   planId: string;
// };

// const PricingCard = ({
//   title,
//   price,
//   description,
//   features,
//   actionLabel,
//   planId,
// }: PricingCardProps) => (
//   <Card className="max-w-80 space-y-6">
//     <CardHeader className="pb-8 pt-4 gap-8">
//       <CardTitle>{title}</CardTitle>
//       <h3 className="text-3xl font-bold my-6">Rs {price.toFixed(2)}</h3>
//     </CardHeader>
//     <CardContent className="flex flex-col gap-2">
//       <CardDescription className="pt-1.5 h-12">{description}</CardDescription>
//       {features.map((f, i) => (
//         <span
//           key={i}
//           className="flex justify-center items-center gap-4 text-sm text-muted-foreground"
//         >
//           <CheckCircle2 className="text-green-500 h-4 w-4" />
//           {f}
//         </span>
//       ))}
//     </CardContent>
//     <CardFooter className="mt-2">
//       <Button className="w-full" asChild>
//         <Link href={`/checkout/?planId=${planId}&amount=${price}`}>
//           {actionLabel}
//         </Link>
//       </Button>
//     </CardFooter>
//   </Card>
// );

// export default function Page() {
//   const [plans, setPlans] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     // Fetch plans from the backend
//     axios
//       .get(`${process.env.NEXT_PUBLIC_API_URL}/subscription/plans`)
//       .then((response) => {
//         console.log("API Response:", response.data.items);
//         if (response.data.items && Array.isArray(response.data.items)) {
//           setPlans(response.data.items);
//         } else {
//           setPlans([]);
//           setError("No plans available.");
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching plans:", err);
//         setError("Failed to load plans. Please try again later.");
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="container py-8 flex flex-col items-center justify-center text-center">
//       <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
//         Pricing Plans
//       </h1>
//       <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
//         Choose the plan that's right for you
//       </h2>
//       <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-20">
//         {loading && <p>Loading...</p>}
//         {error && <p className="text-red-500">{error}</p>}
//         {!loading &&
//           !error &&
//           plans.map((plan) => (
//             <PricingCard
//               key={plan.id}
//               title={plan.name || "Plan Name"}
//               price={plan.amount ? plan.amount / 100 : 0} // Fallback to 0 if amount is undefined
//               description={plan.description || "No description available"}
//               features={plan.features || ["Feature 1", "Feature 2", "Feature 3"]}
//               actionLabel="Get Started"
//               planId={plan.id}
//             />
//           ))}
//       </section>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type PricingCardProps = {
  title: string;
  price: number;
  description: string;
  features: string[];
  actionLabel: string;
};

const PricingCard = ({ title, price, description, features, actionLabel }: PricingCardProps) => (
  <Card className="max-w-80 space-y-6">
    <CardHeader className="pb-8 pt-4 gap-8">
      <CardTitle className="">{title}</CardTitle>
      <h3 className="text-3xl font-bold my-6">Rs {price}</h3>
    </CardHeader>
    <CardContent className="flex flex-col gap-2">
      <CardDescription className="pt-1.5 h-12">{description}</CardDescription>
      {features.map((f, i) => (
        <span key={i} className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
          <CheckCircle2 className="text-green-500 h-4 w-4" />
          {f}
        </span>
      ))}
    </CardContent>
    <CardFooter className="mt-2">
      <Button className="w-full" asChild>
        <Link href={`subscription/checkout/?amount=${price}`}>{actionLabel}</Link>
      </Button>
    </CardFooter>
  </Card>
);

export default function Page() {
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    // Simulate client-side dynamic content or updates
    setTitle("Pricing Plans");
  }, []);

  const plans = [
    {
      title: "Basic",
      price: 300,
      description: "Essential features you need to get started",
      features: ["Example Feature Number 1", "Example Feature Number 2", "Example Feature Number 3"],
      actionLabel: "Get Basic",
    },
    {
      title: "Pro",
      price: 600,
      description: "Perfect for owners of small & medium businesses",
      features: ["Example Feature Number 1", "Example Feature Number 2", "Example Feature Number 3"],
      actionLabel: "Get Pro",
    },
    {
      title: "Premium",
      price: 900,
      description: "Get premium and results premium",
      features: ["Example Feature Number 1", "Example Feature Number 2", "Example Feature Number 3"],
      actionLabel: "Get Premium",
    },
  ];

  if (!title) {
    return <h1>Loading...</h1>; // Ensure proper rendering before title content is set
  }

  return (
    <div className="container py-8 flex flex-col items-center justify-center text-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">{title}</h1>
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Choose the plan that's right for you</h2>
      <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-20">
        {plans.map((plan) => {
          return <PricingCard key={plan.title} {...plan} />;
        })}
      </section>
    </div>
  );
}
