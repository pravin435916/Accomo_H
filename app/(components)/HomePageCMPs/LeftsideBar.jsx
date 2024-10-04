"use client";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import {
  Briefcase,
  CircleHelp,
  CircleUser,
  Home,
  LogOut,
  Star,
  Tag,
  User,
  UserPlusIcon,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const LeftsideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarLinks = [
    { imgURL: <Home />, route: "/", label: "Home" },
    { imgURL: <User />, route: "/profile", label: "Profile" },
    { imgURL: <CircleHelp />, route: "/ask-question", label: "Ask a question" },
  ];

  const pathname = usePathname();
  const { signOut } = useClerk();

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-4">
        <span className="text-xl">☰</span> {/* Hamburger Icon */}
      </button>
      {isOpen && (
        <section className="bg-zinc-100/30 dark:bg-zinc-900 custom-scrollbar fixed top-0 left-0 h-full w-2/3 z-50 p-4 shadow-lg overflow-y-auto">
          <div className="flex-col flex">
            {sidebarLinks.map((item) => {
              const isActive =
                (pathname.includes(item.route) && item.route.length > 1) ||
                pathname === item.route;
              return (
                <Button
                  key={item.label}
                  variant={"default"}
                  size={"default"}
                  className="bg-transparent hover:bg-transparent justify-start w-full h-[4rem]"
                >
                  <Link
                    href={item.route}
                    className={`flex items-center justify-start h-full w-full gap-4 px-4 ${
                      isActive
                        ? "primary-gradient rounded-lg text-light-900"
                        : "text-black dark:text-white"
                    }`}
                  >
                    <span className="h-6 w-6 flex items-center">
                      {item.imgURL}
                    </span>
                    <p
                      className={` ${isActive ? "base-bold" : "base-medium "}`}
                    >
                      {item.label}
                    </p>
                  </Link>
                </Button>
              );
            })}
          </div>
          <SignedOut>
            <div className="flex flex-col gap-3 mt-6">
              <Link href="/sign-in" className="w-full h-full">
                <Button
                  variant={"default"}
                  className="w-full rounded-lg dark:bg-slate-800 text-orange-500 bg-slate-200/50 hover:bg-slate-200/40"
                >
                  <CircleUser className="h-6 w-6" />
                  <span>Log In</span>
                </Button>
              </Link>
              <Link href="/sign-up" className="w-full h-full">
                <Button
                  variant={"default"}
                  className="w-full rounded-lg bg-slate-500/40 dark:bg-slate-800/50 text-black dark:text-white hover:bg-slate-800/40"
                >
                  <UserPlusIcon className="h-6 w-6" />
                  <span>Sign Up</span>
                </Button>
              </Link>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="mt-12 flex flex-col gap-3">
              <Button
                variant={"default"}
                className="w-full gap-2 rounded-lg dark:bg-slate-800 text-orange-500 bg-slate-200/50 hover:bg-slate-200/40 dark:hover:bg-slate-800/50"
                onClick={() => signOut({ redirectUrl: "/" })}
              >
                <LogOut className="h-6 w-6" />
                <span>Sign out</span>
              </Button>
            </div>
          </SignedIn>
        </section>
      )}
    </>
  );
};

export default LeftsideBar;
