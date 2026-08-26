import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './footer';

export default function ClientLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}