import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ParkStatusConfig, EcoEvent } from '../types';
import { getParkStatus, getFeaturedEvent } from '../services/dataService';

interface AppContextType {
  parkStatus: ParkStatusConfig | null;
  featuredEvent: EcoEvent | null;
  activeRegistrationEvent: EcoEvent | null;
  openRegistrationModal: (event: EcoEvent) => void;
  closeRegistrationModal: () => void;
  refreshGlobalData: () => Promise<void>;
  isLoadingStatus: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [parkStatus, setParkStatus] = useState<ParkStatusConfig | null>(null);
  const [featuredEvent, setFeaturedEvent] = useState<EcoEvent | null>(null);
  const [activeRegistrationEvent, setActiveRegistrationEvent] = useState<EcoEvent | null>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    try {
      const [status, feat] = await Promise.all([
        getParkStatus(),
        getFeaturedEvent(),
      ]);
      setParkStatus(status);
      setFeaturedEvent(feat);
    } catch (err) {
      console.error('Failed to load global app data', err);
    } finally {
      setIsLoadingStatus(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    // Listen for custom data update events from dataService
    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('kalitalang_data_updated', handleUpdate);
    return () => {
      window.removeEventListener('kalitalang_data_updated', handleUpdate);
    };
  }, [loadData]);

  const openRegistrationModal = (event: EcoEvent) => {
    setActiveRegistrationEvent(event);
  };

  const closeRegistrationModal = () => {
    setActiveRegistrationEvent(null);
  };

  return (
    <AppContext.Provider
      value={{
        parkStatus,
        featuredEvent,
        activeRegistrationEvent,
        openRegistrationModal,
        closeRegistrationModal,
        refreshGlobalData: loadData,
        isLoadingStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

