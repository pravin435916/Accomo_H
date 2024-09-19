'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import Navbar from './Navbar';
export default function HomeScreen() {

  return (
    <div className="relative h-screen w-screen">
      {/* Full-Page Map */}
      <div className="absolute inset-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509411!2d144.95373631531642!3d-37.81720997975133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1b6e4f7771b!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1638233200749!5m2!1sen!2sau"
          className="absolute inset-0 w-full h-full"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <Navbar/>
     
    </div>
  );
}
