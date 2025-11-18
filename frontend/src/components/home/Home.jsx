import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';
export function Home() {
  const loginUser = useSelector((state) => state.loginUser.value);


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation Bar */}
      <Navbar/>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
              <span className="text-lg">✨</span>
              <span className="text-sm text-gray-300">AI-Powered Resume Building</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Create Your Perfect Resume
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                With AI Assistance
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Stand out from the crowd with professionally crafted resumes. Our AI analyzes job descriptions and optimizes your resume for success.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg transition flex items-center space-x-2 group">
                <span>Get Started Free</span>
                <span className="group-hover:translate-x-1 transition inline-block">→</span>
              </button>
              <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-semibold text-lg transition">
                View Examples
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12">
              <div>
                <div className="text-3xl font-bold text-blue-500">50K+</div>
                <div className="text-gray-400 text-sm mt-1">Resumes Created</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-500">95%</div>
                <div className="text-gray-400 text-sm mt-1">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500">24/7</div>
                <div className="text-gray-400 text-sm mt-1">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800/50 " id="features" name="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose ResumeAI?</h2>
            <p className="text-gray-400 text-lg">Powerful features to help you land your dream job</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition group">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition text-2xl">
                ✨
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Content</h3>
              <p className="text-gray-400">
                Our AI analyzes job descriptions and suggests tailored content to make your resume stand out.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition group">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600/30 transition text-2xl">
                📄
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Templates</h3>
              <p className="text-gray-400">
                Choose from dozens of ATS-friendly templates designed by career experts and recruiters.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-green-500 transition group">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600/30 transition text-2xl">
                ⚡
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Optimization</h3>
              <p className="text-gray-400">
                Get real-time feedback and suggestions to improve your resume's impact and readability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12">
            <div className="text-5xl mb-6">🎯</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Build Your Future?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have landed their dream jobs with our AI-powered resume builder.
            </p>
            <button className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-semibold text-lg transition">
              Start Building Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl">✨</span>
                <span className="font-bold text-lg">ResumeAI</span>
              </div>
              <p className="text-gray-400 text-sm">
                Building careers, one resume at a time.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#features" className="hover:text-white transition">Templates</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><NavLink to="/about" className="hover:text-white transition">About</NavLink></li>
                <li><NavLink to="/contact" className="hover:text-white transition">Contact</NavLink></li>
             </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><NavLink to="#" className="hover:text-white transition">Privacy</NavLink></li>
                <li><NavLink to="#" className="hover:text-white transition">Terms</NavLink></li>
                <li><NavLink to="#" className="hover:text-white transition">Security</NavLink></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
            © 2025 ResumeAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;