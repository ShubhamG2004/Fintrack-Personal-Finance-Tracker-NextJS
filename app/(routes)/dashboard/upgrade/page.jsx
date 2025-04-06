import React from "react";
import { Check, Zap, Star, Gem } from "lucide-react";

function Upgrade() {
  const plans = [
    {
      name: "Starter",
      price: "₹1,499",
      period: "/month",
      featured: false,
      features: [
        "10 users included",
        "2GB of storage",
        "Email support",
        "Help center access",
      ],
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: "₹2,499",
      period: "/month",
      featured: true,
      features: [
        "20 users included",
        "5GB of storage",
        "Priority email support",
        "Help center access",
        "Phone support",
        "Community access",
      ],
      cta: "Upgrade Now",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      featured: false,
      features: [
        "Unlimited users",
        "Unlimited storage",
        "24/7 dedicated support",
        "Advanced analytics",
        "Custom integrations",
        "Personal account manager",
      ],
      cta: "Contact Sales",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Simple, transparent pricing. No hidden fees.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-6 shadow-xl transition-all duration-300 hover:shadow-2xl ${
                plan.featured
                  ? "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-600"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.featured && (
                <div className="mb-4 flex justify-center">
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-800">
                    <Star className="mr-1 h-4 w-4" />
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">
                  {plan.name}
                  <span className="sr-only">Plan</span>
                </h3>
                <p className="mt-4 flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-lg font-medium text-gray-500">
                      {plan.period}
                    </span>
                  )}
                </p>
                {plan.name === "Enterprise" && (
                  <p className="mt-2 text-sm text-gray-500">
                    Volume discounts available
                  </p>
                )}
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check
                      className={`h-5 w-5 flex-shrink-0 ${
                        plan.featured ? "text-indigo-600" : "text-green-500"
                      }`}
                    />
                    <span className="ml-3 text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <a
                  href="#"
                  className={`block w-full rounded-lg px-6 py-3 text-center text-sm font-semibold shadow-sm transition-all duration-200 ${
                    plan.featured
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-white text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:bg-indigo-50"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>

              {plan.featured && (
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-indigo-600">
                  <Zap className="h-4 w-4 animate-pulse" />
                  <span>Includes 7-day free trial</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl bg-gray-50 p-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <Gem className="h-5 w-5 text-indigo-600" />
            <h3 className="text-lg font-medium text-gray-900">
              Need something more?
            </h3>
          </div>
          <p className="mt-2 text-gray-600">
            We offer custom solutions for large teams and businesses.
          </p>
          <a
            href="#"
            className="mt-4 inline-block rounded-lg bg-white px-6 py-2 text-sm font-medium text-indigo-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
          >
            Contact our sales team
          </a>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;