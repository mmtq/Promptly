"use client";

import { useState, useEffect } from "react";
import '@styles/global.css';
import Nav from '@components/Nav';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider

const RootLayout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(null); // Start with null to prevent SSR mismatch
  const [isClient, setIsClient] = useState(false); // Track client-side rendering

  useEffect(() => {
    // This ensures that the theme logic runs only on the client side
    setIsClient(true);
    
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  // Render only after the client-side JavaScript has been loaded
  if (!isClient) {
    return null; // Prevent rendering anything during SSR
  }

  return (
    <html lang="en">
      <body className={isDarkMode ? 'bg-gray-900' : 'bg-white'}>
        <SessionProvider>
          <div className={isDarkMode ? 'gradient-dark' : 'gradient-light'}>
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
