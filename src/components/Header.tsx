// src/components/Header.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Button from '@/components/Buttons/Button';
import Logo from '@/components/Logo';

const supabase = createClient();

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  useEffect(() => {
    // Check if a user is logged in when the component mounts
    // const user = supabase.auth.getUser();

    // Set the login state based on whether a user session is active
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    // Listen for auth state changes (e.g., user logs in or out)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    // Cleanup the listener on component unmount
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Left Section: Logo */}
        <div className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          <Logo />
        </div>

        {/* Center Section: Navigation Links */}
        {
          !isLoginPage && isLoggedIn && (
            <nav className="hidden md:flex space-x-8">
            <Link href="/remove-background" className="text-gray-600 hover:text-gray-900 transition">
              Remove Background
            </Link>
            <Link href="/text-behind-image" className="text-gray-600 hover:text-gray-900 transition">
              Text Behind Image
              </Link>
            </nav>
        )}

        {/* Right Section: Authentication Buttons */}
        {!isLoginPage && (
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/signup">
              <Button text="Sign Up" color="white" textColor="black"/>
            </Link>
            <Link href="/login">
              <Button text="Login" />
            </Link>
          </>
        )}
      </div>
        )}
      </div>
    </header>
  );
};

export default Header;
