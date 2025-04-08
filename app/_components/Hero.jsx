'use client'
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle, DollarSign, PieChart, Shield, TrendingUp, Bell, FileText, Lock, BarChart2, Users, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Hero() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-10 md:py-16 flex flex-col items-center text-center">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Take Control of Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Finances</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            FinTrack helps you manage your money effortlessly with powerful budgeting tools, expense tracking, and financial insights.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="gap-2" onClick={() => router.push('/sign-up')}>
              <Zap className="w-5 h-5" />
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <PieChart className="w-5 h-5" />
              See Demo
            </Button>
          </div>
        </div>
        <div className="mt-16 rounded-xl border shadow-xl overflow-hidden">
          <img 
            src="/assets/preview.png" 
            alt="FinTrack Dashboard Preview" 
            className="w-full max-w-5xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to take control of your financial life
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
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

            <Card className="hover:shadow-lg transition-shadow">
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

            <Card className="hover:shadow-lg transition-shadow">
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

            <Card className="hover:shadow-lg transition-shadow">
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

            <Card className="hover:shadow-lg transition-shadow">
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

            <Card className="hover:shadow-lg transition-shadow">
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
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How FinTrack Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and transform your financial life
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 p-4 rounded-full mb-4">
                <span className="text-indigo-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Connect Your Accounts</h3>
              <p className="text-gray-600">
                Securely link your bank accounts, credit cards, and investment portfolios.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 p-4 rounded-full mb-4">
                <span className="text-indigo-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Set Your Budgets</h3>
              <p className="text-gray-600">
                Create custom budgets for different spending categories that matter to you.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 p-4 rounded-full mb-4">
                <span className="text-indigo-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Track & Optimize</h3>
              <p className="text-gray-600">
                Get insights and recommendations to improve your financial health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Finances?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who have taken control of their financial future with FinTrack.
          </p>
          <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 gap-2">
            <Zap className="w-5 h-5" />
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-6 h-6 text-indigo-400" />
                <span className="text-xl font-bold">FinTrack</span>
              </div>
              <p className="text-gray-400">
                The simplest way to manage your personal finances.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} FinTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Hero;