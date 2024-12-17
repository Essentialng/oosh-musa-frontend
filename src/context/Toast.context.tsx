import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/atoms/Toast.atom';

interface ToastContextType {
    showToast: (message: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => {
            setToastMessage(null);
        }, 3000); 
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toastMessage && <Toast message={toastMessage}/>}
        </ToastContext.Provider>
    );
};