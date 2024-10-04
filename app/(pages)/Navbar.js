"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Home,
  User,
  Shield,
  MessageCircle,
  ThumbsUp,
  LogOut,
} from "lucide-react";
import { useAuth, SignInButton, SignOutButton } from "@clerk/nextjs";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoicHJhdmluOTE2IiwiYSI6ImNseThqZXdwMTA3cWMybHBoYzZvaHVkOTkifQ.TrJHd5twmsPbtZuOELMitg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const geocoderContainerRef = useRef(null);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (geocoderContainerRef.current) {
      const geocoder = new MapboxGeocoder({
        accessToken: MAPBOX_ACCESS_TOKEN,
        placeholder: "Search for address...",
        mapboxgl: null,
      });

      geocoder.addTo(geocoderContainerRef.current);

      geocoder.on("result", (event) => {
        console.log("Selected address:", event.result);
      });

      return () => geocoder.clear();
    }
  }, []);

  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Owner", icon: User, href: "/owner" },
    { name: "Superadmin", icon: Shield, href: "/superadmin" },
    { name: "Contact Us", icon: MessageCircle, href: "/contactus" },
    { name: "Feedback", icon: ThumbsUp, href: "/feedback" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 shadow-sm px-4">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        {/* Menu Sheet */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[400px] p-0 bg-white/80 backdrop-blur-md shadow-lg"
          >
            <div className="flex flex-col h-full">
              <div className="p-6 bg-white/90 text-muted-foreground">
                <h2 className="text-2xl font-bold">Menu</h2>
              </div>
              <nav className="flex-grow p-6">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="flex items-center p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
                        onClick={() => setIsOpen(false)}
                        aria-label={`Go to ${item.name}`}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Sign In / Sign Out */}
              <div className="p-6 border-t">
                {isSignedIn ? (
                  <SignOutButton>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </SignOutButton>
                ) : (
                  <SignInButton mode="modal">
                    <Button className="w-full">Sign In</Button>
                  </SignInButton>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Map Search */}
        <div className="flex-1 max-w-xl mx-auto">
          <div ref={geocoderContainerRef} className="w-full" />
        </div>

        {/* Demo Page Link - Require Login */}
        <div className="flex items-center space-x-4">
          {isSignedIn ? (
            <Link href="/Demo" passHref>
              <Button variant="default">Go To DemoPage</Button>
            </Link>
          ) : (
            <SignInButton mode="modal">
              <Button variant="default">Login to Access Demo</Button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}
