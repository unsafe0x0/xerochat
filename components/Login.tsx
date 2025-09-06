"use client";

import Image from "next/image";
import React from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#191919]">
      <div className="bg-[#202020] border border-[#282828] rounded-2xl p-8 mx-3 w-full max-w-sm flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-white mb-8">
          Login to continue
        </h2>
        <p className="text-sm text-neutral-400 mb-6 text-center">
          Login with your Google account to continue
        </p>
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-3 py-2 px-4 rounded-md bg-white hover:bg-neutral-100 text-neutral-900 font-normal text-base border border-neutral-200 transition-colors cursor-pointer"
          style={{ outline: "none" }}
        >
          <Image src="/google.svg" alt="Google" width={24} height={24} />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
