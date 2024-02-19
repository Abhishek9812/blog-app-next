"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Topbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (you might need to implement your own authentication logic)
    const isLoggedIn = localStorage.getItem('token');

    if (isLoggedIn) {
      // Fetch user data from localhost if logged in
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    // Implement logout logic (clear token and user data from localStorage, etc.)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/sign-in');
  };

  return (
    <nav className='topbar flex justify-between items-center p-4'>
      <Link href='/' className='flex items-center gap-4' passHref>
        <Image src='/assets/logo.svg' alt='logo' width={28} height={28} />
        <p className='text-heading3-bold text-dark-1 max-xs:hidden'>Blog App</p>
      </Link>

      {user ? (
        // User is logged in, show name and logout button
        <div className='flex items-center gap-4'>
          <p className='text-sm text-dark-1'>{user.username}</p>
          <button onClick={handleLogout} className='text-sm text-dark-1 cursor-pointer'>
            Logout
          </button>
        </div>
      ) : (
        // User is not logged in, show login and signup buttons
        <div className='flex items-center gap-4'>
          <Link href='/sign-in' className='text-sm text-dark-1 cursor-pointer' passHref>
            Login
          </Link>
          <Link href='/sign-up' className='text-sm text-dark-1 cursor-pointer' passHref>
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Topbar;
