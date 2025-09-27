import React from 'react';
import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Navbar />
      <div className="flex-1 lg:ml-56">
        <main>{children}</main>
      </div>
    </div>
  );
}
