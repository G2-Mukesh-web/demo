import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CustomCursor from '../animation/CustomCursor';
import PageTransition from '../animation/PageTransition';

export function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-ink-primary selection:bg-accent-brass selection:text-white font-sans relative">
      <CustomCursor />
      <PageTransition />
      <Header />
      <main className={`flex-grow ${isHome ? 'pt-0' : 'pt-20 md:pt-24'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
