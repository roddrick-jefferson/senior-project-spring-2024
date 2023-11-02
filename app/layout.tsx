// react components
import React from "react";

// html
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "To be Decided",
  description: "Computer Science Department Website",
};

// css
import "../styles/globals.css";

// components
import SideBar from "@/components/global/SideBar";
import TopBar from "@/components/global/topbar/TopBar";
import Providers from "@/context/providers";
import { AuthContextProvider } from "@/context/AuthContext";
import { Loading } from "@/components/global/Loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="relative h-screen w-screen flex flex-col items-center justify-center">
            <AuthContextProvider>
              <Loading />
              <TopBar />
              <div className="relative h-full w-full flex items-center justify-center">
                <SideBar />
                {children}
              </div>
            </AuthContextProvider>
          </div>
        </Providers>
      </body>
    </html>
  );
}
