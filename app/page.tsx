"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser, SignInButton } from "@clerk/nextjs";

import logo from "../public/logo/logo.png";
import bg from "../public/images/bg.png";

const HomePage: React.FC = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 text-white">
      {/* Background Image */}
      <Image
        src={bg}
        alt="Background"
        fill
        priority
        quality={100}
        style={{ objectFit: "cover", zIndex: -1 }}
      />

      <div className="flex flex-col items-center justify-center gap-6 z-10 text-center">
        {/* Logo */}
        <div className="w-[200px] h-[200px] flex items-center justify-center rounded-full overflow-hidden border-2 border-b-amber-50">
          <Image
            src={logo}
            alt="Modulavers Systems logo"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-white">
          Welcome to MVS AI Bot
        </h1>

        {/* Subtext */}
        <p className="text-lg text-gray-300 max-w-md">
          Your AI-powered assistant for Modulavers Systems
        </p>

        {/* Buttons */}
        {!isSignedIn ? (
          <SignInButton mode="modal">
            <Button
              size="lg"
              variant="secondary"
              className="w-64 text-lg font-medium cursor-pointer"
            >
              Get Started Now
            </Button>
          </SignInButton>
        ) : (
          <Link href="/chat">
            <Button
              size="lg"
              variant="secondary"
              className="w-64 text-lg font-medium cursor-pointer"
            >
              Start Conversation Now
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
