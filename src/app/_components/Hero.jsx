'use client'

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle, DollarSign, PieChart, Shield, TrendingUp, Bell, FileText, Lock, BarChart2, Users, Zap } from "lucide-react";

function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      

      {/* Hero Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto  rounded-2xl  text-center">
        <div className="flex flex-col items-center justify-center gap-8">

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            AI-Powered Expense Tracking for <span className="text-blue-600">Smart Spending</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-gray-700 max-w-2xl">
            Fintrack helps you take control of your finances with AI-driven insights, smart categorization, and real-time tracking — all designed to make saving effortless.
            </p>

            {/* Email Form */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
                {/* Dashboard Button */}
                <Button className="bg-white text-blue-600 border border-blue-600 hover:bg-gray-100 px-6 py-3 font-medium rounded-lg shadow-sm">
                    Dashboard
                </Button>

                {/* Get Started Button */}
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium rounded-lg shadow-sm">
                    Get Started
                </Button>
                </div>


            {/* Security Message */}
            <div className="flex items-center text-sm text-gray-600">
            <Lock className="h-4 w-4 mr-2" />
            <span>Your data is encrypted, private, and secure</span>
            </div>
            
        </div>
        </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Powerful Features to Simplify Your Finances</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Fintrack combines AI technology with intuitive design to give you complete control over your money
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="bg-emerald-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle>Smart Categorization</CardTitle>
              <CardDescription>
                AI automatically categorizes your transactions with 95% accuracy
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Real-time Analytics</CardTitle>
              <CardDescription>
                Get instant insights into your spending patterns and trends
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Smart Alerts</CardTitle>
              <CardDescription>
                Receive notifications for unusual spending and bill reminders
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-amber-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle>Receipt Scanning</CardTitle>
              <CardDescription>
                Simply snap a photo and we'll extract all the details
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-rose-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-rose-600" />
              </div>
              <CardTitle>Bank-level Security</CardTitle>
              <CardDescription>
                256-bit encryption keeps your financial data completely safe
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Shared Budgets</CardTitle>
              <CardDescription>
                Collaborate with family or roommates on shared expenses
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How Fintrack Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Get set up in minutes and start gaining control of your finances
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect Your Accounts</h3>
              <p className="text-gray-600">
                Securely link your bank accounts, credit cards, and investment accounts
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analyzes Your Spending</h3>
              <p className="text-gray-600">
                Our AI automatically categorizes and analyzes your transactions
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Insights & Save</h3>
              <p className="text-gray-600">
                Receive personalized recommendations to optimize your finances
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Zap className="h-12 w-12 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Financial Life?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join over 500,000 users who have saved an average of $3,000 in their first year with Fintrack
          </p>
          <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-6 text-lg font-medium">
            Start Your Free 30-Day Trial
          </Button>
          <p className="mt-4 text-sm opacity-80">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className="h-6 w-6 text-emerald-400" />
                <span className="text-xl font-bold text-white">Fintrack</span>
              </div>
              <p className="text-sm">
                AI-powered expense tracking to help you save money and achieve financial freedom.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2023 Fintrack. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
              <a href="#" className="hover:text-white">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Hero;