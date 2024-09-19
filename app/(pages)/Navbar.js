'use client'
import Link from 'next/link'
import React, { useState } from 'react'
// import { useUser } from '@clerk/nextjs'
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const { isLoaded, isSignedIn, user } = useUser()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="absolute top-0 left-0 right-0 z-10 bg-gray-100 bg-opacity-90 shadow-md py-4 px-6 flex justify-between items-center">
        {/* Left Side: Hamburger Menu */}
        <button
          className="text-gray-800 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Middle: Search Bar */}
        <div className="flex-1 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Right Side: Get Started Button */}
        {/* {
            isSignedIn ? 
            <div>Hello, {user.firstName} welcome to Accomo</div>
            :
        <Link href={'/sign-in'}>
        <button className="bg-black text-white rounded-full py-2 px-6 hover:bg-gray-700">
          Login
        </button>
        </Link>

        }
         */}
        {/* mihir write this code first time */}
        <Link href="/Demo">
          <button className="bg-black text-white rounded-full py-2 px-6 hover:bg-gray-700">
            Go To DemoPage
          </button>
        </Link>
      </header>
  )
}
