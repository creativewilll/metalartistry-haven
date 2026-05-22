import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface PhoneActionContextValue {
  isOpen: boolean;
  openPhoneActions: () => void;
  closePhoneActions: () => void;
}

const PhoneActionContext = createContext<PhoneActionContextValue | undefined>(undefined);

export function PhoneActionProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openPhoneActions = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closePhoneActions = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <PhoneActionContext.Provider value={{ isOpen, openPhoneActions, closePhoneActions }}>
      {children}
    </PhoneActionContext.Provider>
  );
}

export function usePhoneActions() {
  const context = useContext(PhoneActionContext);
  if (!context) {
    throw new Error('usePhoneActions must be used within PhoneActionProvider');
  }
  return context;
}
