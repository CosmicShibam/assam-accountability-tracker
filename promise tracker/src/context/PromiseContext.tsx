import React, { createContext, useContext, useState, useEffect } from 'react';
import { PromiseRecord } from '../types';
import { initialPromises } from '../lib/initialData';

interface PromiseContextType {
  promises: PromiseRecord[];
  addPromise: (promise: PromiseRecord) => void;
  updatePromise: (promise: PromiseRecord) => void;
  deletePromise: (id: string) => void;
}

const PromiseContext = createContext<PromiseContextType | undefined>(undefined);

export function PromiseProvider({ children }: { children: React.ReactNode }) {
  const [promises, setPromises] = useState<PromiseRecord[]>(() => {
    const stored = localStorage.getItem('assam_promises_v4');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as PromiseRecord[];
        // We do an upsert-merge here to ensure initial data is merged with stored edits
        // But the prompt says "Upsert records by id only. Do not delete existing items unless the same id is present in the new array."
        
        const mergedMap = new Map<string, PromiseRecord>();
        
        // Upsert initial promises into the map first
        initialPromises.forEach(p => mergedMap.set(p.id, p));
        
        // Let stored data overwrite initial ones
        parsed.forEach(p => mergedMap.set(p.id, p));
        
        return Array.from(mergedMap.values());
      } catch (e) {
        return initialPromises;
      }
    }
    return initialPromises;
  });

  useEffect(() => {
    localStorage.setItem('assam_promises_v4', JSON.stringify(promises));
  }, [promises]);

  const addPromise = (promise: PromiseRecord) => {
    setPromises(prev => [promise, ...prev]);
  };

  const updatePromise = (promise: PromiseRecord) => {
    setPromises(prev => prev.map(p => p.id === promise.id ? promise : p));
  };

  const deletePromise = (id: string) => {
    setPromises(prev => prev.filter(p => p.id !== id));
  };

  return (
    <PromiseContext.Provider value={{ promises, addPromise, updatePromise, deletePromise }}>
      {children}
    </PromiseContext.Provider>
  );
}

export function usePromises() {
  const context = useContext(PromiseContext);
  if (context === undefined) {
    throw new Error('usePromises must be used within a PromiseProvider');
  }
  return context;
}
