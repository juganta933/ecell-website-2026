"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "RECRUITMENT", href: "/recruitment" },
    { name: "EVENTS", href: "/#events" },
    { name: "GALLERY", href: "/gallery" },
    { name: "TEAM", href: "/team" },
    { name: "ALUMNI", href: "/alumni" },
    { name: "BLOGS", href: "/blogs" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-1/2 z-[150] w-[95%] max-w-6xl -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-6 py-3 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 sm:px-8"
      >
        <div className="flex w-full items-center justify-between">
          {/* Logo (Left) */}
          <div className="flex w-1/4 items-center justify-start">
            <Link
              href="/"
              className="flex items-center gap-3 transition-transform hover:scale-105"
            >
              <div className="relative h-8 w-8">
                <Image
                  src="/ecelllogo.png"
                  alt="E-Cell Logo"
                  fill
                  sizes="32px"
                  className="object-contain brightness-0 invert"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Links (Center) */}
          <div className="hidden w-2/4 items-center justify-center gap-8 md:flex lg:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative text-xs font-semibold tracking-widest text-gray-300 transition-colors hover:text-white"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* User / Login (Right) */}
          <div className="hidden w-1/4 items-center justify-end md:flex">
            {user ? (
              <Link
                href="/dashboard"
                className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-blue-500/20 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-transform hover:scale-110"
              >
                <Image
                  src={user?.picture || "/profile_picture_holder.webp"}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-bold tracking-widest text-white transition-all hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                LOGIN
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex w-1/4 items-center justify-end md:hidden">
            <button
              className="text-white transition-transform hover:scale-110"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-1/2 z-[149] flex w-[90%] -translate-x-1/2 flex-col gap-6 rounded-3xl border border-white/10 bg-black/60 p-8 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="text-center text-sm font-bold tracking-widest text-gray-300 transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            ))}
            <div className="mx-auto h-[1px] w-1/2 bg-white/10" />
            {user ? (
              <Link
                href="/dashboard"
                onClick={closeMenu}
                className="text-center text-sm font-bold tracking-widest text-blue-400 hover:text-blue-300"
              >
                DASHBOARD
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className="mx-auto rounded-full bg-white px-8 py-3 text-sm font-bold tracking-widest text-black transition-transform hover:scale-105"
              >
                LOGIN
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
