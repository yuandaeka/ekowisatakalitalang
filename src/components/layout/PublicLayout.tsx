import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { RegistrationModal } from '../events/RegistrationModal';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-mist-50 text-basalt-900 font-sans selection:bg-ember-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <RegistrationModal />
    </div>
  );
};

