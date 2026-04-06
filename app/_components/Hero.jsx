'use client'
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, PieChart, Bell, FileText, Lock, TrendingUp, ArrowRight, Sparkles, ShieldCheck, Target, BrainCircuit } from "lucide-react";
import Link from "next/link";

function Hero() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_30%),linear-gradient(to_bottom,#f8fbff,white)]">
    <section className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pb-16 pt-16 text-center sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
      <motion.div
        className="max-w-5xl"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm backdrop-blur">
          <Sparkles className="h-4 w-4" />
          AI-powered personal finance, built for clarity.
        </div>
        <h1 className="mx-auto max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
          Build a finance system that feels
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent animate-gradient"> effortless</span>
          .
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
          FinTrack brings budgets, expenses, alerts, and AI insights into one calm command center so you can move faster and spend with confidence.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <Button asChild size="lg" className="gap-2 rounded-full bg-slate-950 px-6 text-white shadow-xl shadow-slate-950/15 hover:bg-slate-800">
              <Link href="/sign-up">
                Start free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <Button asChild size="lg" variant="outline" className="gap-2 rounded-full border-slate-300 bg-white px-6 text-slate-700 hover:bg-slate-50">
              <Link href="#features">
                Explore features
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
          {[
            "Live alerts",
            "AI categorization",
            "Budget tracking",
            "Export-ready reports",
          ].map((item) => (
            <span key={item} className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mt-14 w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur"
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <motion.img
          src="/assets/preview.png"
          alt="FinTrack dashboard preview"
          className="w-full object-cover"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </motion.div>
    </section>

    {/* Features Section */}
    <section id="features" className="border-y border-slate-200 bg-white/80 py-20 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-16 text-center" initial="hidden" animate="visible" variants={fadeUp}>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Built for serious money management</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Every screen is designed to reduce noise, surface risks early, and make financial decisions easier to trust.
          </p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              icon: DollarSign,
              title: "Expense Tracking",
              description: "Capture every transaction, categorize it instantly, and review spending without friction.",
              accent: "from-blue-500 to-cyan-500",
            },
            {
              icon: PieChart,
              title: "Smart Budgeting",
              description: "Set realistic budgets, monitor progress, and see where each category stands in real time.",
              accent: "from-emerald-500 to-teal-500",
            },
            {
              icon: TrendingUp,
              title: "Financial Insights",
              description: "Turn raw transactions into clear trends and actionable signals for better decisions.",
              accent: "from-indigo-500 to-violet-500",
            },
            {
              icon: Bell,
              title: "Real-time Alerts",
              description: "Stay ahead of unusual spending and important budget thresholds before they become problems.",
              accent: "from-amber-500 to-orange-500",
            },
            {
              icon: FileText,
              title: "Reports & Export",
              description: "Move data cleanly into reporting workflows with exports built for follow-up work.",
              accent: "from-rose-500 to-pink-500",
            },
            {
              icon: Lock,
              title: "Bank-level Security",
              description: "Keep account data isolated, protected, and aligned with modern app security expectations.",
              accent: "from-slate-700 to-slate-900",
            },
          ].map((feature, index) => (
            <motion.div key={feature.title} whileHover={{ y: -4 }} initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: index * 0.05 }}>
              <Card className="h-full border-slate-200 bg-white/90 shadow-sm transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br ${feature.accent} p-3 text-white shadow-lg`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl text-slate-950">{feature.title}</CardTitle>
                  <CardDescription className="text-slate-600">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* How It Works Section */}
    <section id="how-it-works" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={fadeUp}>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">How FinTrack works</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            A simple flow that turns setup into useful feedback quickly.
          </p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: 1,
              icon: Target,
              title: "Define the goal",
              desc: "Add your budgets and income baselines so the system knows what healthy spending looks like.",
            },
            {
              step: 2,
              icon: BrainCircuit,
              title: "Analyze every transaction",
              desc: "Transactions are categorized and checked for anomalies before they get lost in the noise.",
            },
            {
              step: 3,
              icon: ShieldCheck,
              title: "Act with confidence",
              desc: "Use alerts, charts, and summaries to make faster decisions with less guesswork.",
            },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              className="rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-sm"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 + idx * 0.15, ease: "easeOut" }}
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="inline-flex rounded-2xl bg-slate-950 p-3 text-white shadow-lg">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Step {item.step}</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-20">
      <motion.div className="mx-auto max-w-5xl rounded-[2rem] bg-slate-950 px-6 py-14 text-center text-white shadow-[0_30px_80px_rgba(15,23,42,0.28)] sm:px-10" initial="hidden" animate="visible" variants={fadeUp}>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Ready to run your money like a product?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          Start with a clean, focused dashboard and let FinTrack do the repetitive work: tracking, categorizing, and alerting.
        </p>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="mt-8 inline-flex">
          <Button asChild size="lg" className="gap-2 rounded-full bg-white px-6 text-slate-950 hover:bg-slate-100">
            <Link href="/sign-up">
              Get started free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>

    {/* Footer */}
    <footer className="border-t border-slate-200 bg-white py-12 text-slate-600">
      <motion.div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" initial="hidden" animate="visible" variants={fadeUp}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-blue-600 animate-spin-slow" />
              <span className="text-xl font-semibold text-slate-950">FinTrack</span>
            </div>
            <p>
              A focused finance workspace for people who want more signal and less clutter.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-slate-950">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="transition-colors hover:text-slate-950">Features</a></li>
              <li><a href="#how-it-works" className="transition-colors hover:text-slate-950">How it works</a></li>
              <li><a href="/sign-up" className="transition-colors hover:text-slate-950">Get started</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-slate-950">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="transition-colors hover:text-slate-950">About</a></li>
              <li><a href="#" className="transition-colors hover:text-slate-950">Blog</a></li>
              <li><a href="#" className="transition-colors hover:text-slate-950">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-slate-950">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="transition-colors hover:text-slate-950">Privacy</a></li>
              <li><a href="#" className="transition-colors hover:text-slate-950">Terms</a></li>
              <li><a href="#" className="transition-colors hover:text-slate-950">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} FinTrack. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
    </div>
  );
}

export default Hero;