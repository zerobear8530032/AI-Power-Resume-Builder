import React from 'react'
import Logout from '../form/Logout';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
    const loginUser = useSelector((state) => state.loginUser.value); // ✅ top level
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="navbar bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl">✨</span>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            ResumeAI
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink to="/" className="text-gray-300 hover:text-white transition">Home</NavLink>
                        <NavLink to="/about" className="text-gray-300 hover:text-white transition">About</NavLink>
                        <NavLink to="/contact" className="text-gray-300 hover:text-white transition">Contact</NavLink>
                        {!loginUser && <NavLink to="/login" className="text-gray-300 hover:text-white transition">Login</NavLink>}
                        {!loginUser && <NavLink to="/register" className="text-gray-300 hover:text-white transition">Register</NavLink>}
                        {loginUser && <NavLink to="/logout" className="text-gray-300 hover:text-white transition">Logout</NavLink>}            </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-gray-300 hover:text-white text-2xl"
                    >
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 space-y-3">
                        <h1>{loginUser}</h1>
                        <NavLink to="/" className="block text-gray-300 hover:text-white transition">Home</NavLink>
                        <NavLink to="/about" className="block text-gray-300 hover:text-white transition">About</NavLink>
                        <NavLink to="/contact" className="block text-gray-300 hover:text-white transition">Contact</NavLink>
                        {!loginUser && <NavLink to="/login" className="block text-gray-300 hover:text-white transition">Login</NavLink>}
                        {!loginUser && <NavLink to="/register" className="block text-gray-300 hover:text-white transition">Register</NavLink>}
                        {loginUser && <NavLink to="/logout" className="block text-gray-400 hover:text-gray-300 transition">Logout</NavLink>}
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
