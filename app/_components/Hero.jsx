'use client'
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle, DollarSign, PieChart, Shield, TrendingUp, Bell, FileText, Lock, BarChart2, Users, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Hero() {
  const router = useRouter();

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-50">
    {/* Hero Section */}
    <section className="container mx-auto px-4 py-10 md:py-20 flex flex-col items-center text-center">
      <motion.div
        className="max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Take Control of Your <span className="bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient">Finances</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          FinTrack helps you manage your money effortlessly with powerful budgeting tools, expense tracking, and financial insights.
        </p>
        <div className="flex gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.97 }}>
            <Button size="lg" className="gap-2 shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-300" onClick={() => router.push('/sign-up')}>
              <Zap className="w-5 h-5 animate-bounce" />
              Get Started Free
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.97 }}>
            <Button size="lg" variant="outline" className="gap-2 border-2 border-indigo-400 hover:bg-indigo-50 transition-all duration-300">
              <PieChart className="w-5 h-5 animate-pulse" />
              See Demo
            </Button>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        className="mt-16 rounded-2xl border shadow-2xl overflow-hidden backdrop-blur-lg bg-white/60"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.img
          src="/assets/preview.png"
          alt="FinTrack Dashboard Preview"
          className="w-full max-w-5xl object-cover"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </motion.div>
    </section>

    {/* Features Section */}
    <section id="features" className="py-20 bg-gradient-to-br from-white via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={fadeUp}>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to take control of your financial life
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Cards Animated */}
          <motion.div whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(99,102,241,0.15)" }} initial="hidden" animate="visible" variants={fadeUp}>
            <Card className="hover:shadow-2xl transition-shadow duration-300 bg-white/80 backdrop-blur-lg">
              <CardHeader>
                <div className="p-3 bg-indigo-100 rounded-lg w-fit mb-4">
                  <DollarSign className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Expense Tracking</CardTitle>
                <CardDescription>Track every rupee with ease</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Automatically categorize transactions and see where your money goes each month.</p>
              </CardContent>
            </Card>

          </motion.div>
          <motion.div whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(34,197,94,0.15)" }} initial="hidden" animate="visible" variants={fadeUp}>
            <Card className="hover:shadow-2xl transition-shadow duration-300 bg-white/80 backdrop-blur-lg">
              <CardHeader>
                <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
                  <PieChart className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Smart Budgeting</CardTitle>
                <CardDescription>Stay on top of your spending</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Create custom budgets and get alerts when you're approaching your limits.</p>
              </CardContent>
            </Card>

          </motion.div>
          <motion.div whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(59,130,246,0.15)" }} initial="hidden" animate="visible" variants={fadeUp}>
            <Card className="hover:shadow-2xl transition-shadow duration-300 bg-white/80 backdrop-blur-lg">
              <CardHeader>
                <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Financial Insights</CardTitle>
                <CardDescription>Understand your money habits</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Get personalized reports and visualizations of your financial health.</p>
              </CardContent>
            </Card>

          </motion.div>
          <motion.div whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(139,92,246,0.15)" }} initial="hidden" animate="visible" variants={fadeUp}>
            <Card className="hover:shadow-2xl transition-shadow duration-300 bg-white/80 backdrop-blur-lg">
              <CardHeader>
                <div className="p-3 bg-purple-100 rounded-lg w-fit mb-4">
                  <Bell className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Real-time Alerts</CardTitle>
                <CardDescription>Never miss a payment</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Get notified about bills, unusual spending, and important financial events.</p>
              </CardContent>
            </Card>

          </motion.div>
          <motion.div whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(234,179,8,0.15)" }} initial="hidden" animate="visible" variants={fadeUp}>
            <Card className="hover:shadow-2xl transition-shadow duration-300 bg-white/80 backdrop-blur-lg">
              <CardHeader>
                <div className="p-3 bg-yellow-100 rounded-lg w-fit mb-4">
                  <FileText className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle>Reports & Export</CardTitle>
                <CardDescription>Tax-ready documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Generate detailed reports and export your financial data in multiple formats.</p>
              </CardContent>
            </Card>

          </motion.div>
          <motion.div whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(239,68,68,0.15)" }} initial="hidden" animate="visible" variants={fadeUp}>
            <Card className="hover:shadow-2xl transition-shadow duration-300 bg-white/80 backdrop-blur-lg">
              <CardHeader>
                <div className="p-3 bg-red-100 rounded-lg w-fit mb-4">
                  <Lock className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Bank-level Security</CardTitle>
                <CardDescription>Your data is always safe</CardDescription>
              </CardHeader>
              <CardContent>
                <p>256-bit encryption and multi-factor authentication protect your information.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>

    {/* How It Works Section */}
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={fadeUp}>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">How FinTrack Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in minutes and transform your financial life
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{
            step: 1,
            title: "Connect Your Accounts",
            desc: "Securely link your bank accounts, credit cards, and investment portfolios."
          }, {
            step: 2,
            title: "Set Your Budgets",
            desc: "Create custom budgets for different spending categories that matter to you."
          }, {
            step: 3,
            title: "Track & Optimize",
            desc: "Get insights and recommendations to improve your financial health."
          }].map((item, idx) => (
            <motion.div
              key={item.step}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 + idx * 0.2, ease: "easeOut" }}
            >
              <div className="bg-indigo-100 p-4 rounded-full mb-4 shadow-lg">
                <span className="text-indigo-600 font-bold text-xl animate-bounce">{item.step}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600 text-white">
      <motion.div className="container mx-auto px-4 text-center" initial="hidden" animate="visible" variants={fadeUp}>
        <h2 className="text-3xl font-extrabold mb-6 tracking-tight animate-gradient">Ready to Transform Your Finances?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of users who have taken control of their financial future with FinTrack.
        </p>
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.97 }}>
          <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 gap-2 shadow-lg">
            <Zap className="w-5 h-5 animate-bounce" />
            Get Started Free
          </Button>
        </motion.div>
      </motion.div>
    </section>

    {/* Footer */}
    <footer className="bg-gray-900 text-white py-12">
      <motion.div className="container mx-auto px-4" initial="hidden" animate="visible" variants={fadeUp}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-6 h-6 text-indigo-400 animate-spin-slow" />
              <span className="text-xl font-bold">FinTrack</span>
            </div>
            <p className="text-gray-400">
              The simplest way to manage your personal finances.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} FinTrack. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
    </div>
  );
}

export default Hero;