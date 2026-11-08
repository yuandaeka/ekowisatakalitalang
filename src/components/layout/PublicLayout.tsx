import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { RegistrationModal } from '../events/RegistrationModal';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-komoot-bg text-gray-900 font-sans selection:bg-komoot-green selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <RegistrationModal />
    </div>
  );
};
