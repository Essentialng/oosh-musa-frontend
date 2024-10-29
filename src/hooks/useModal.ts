// useModal.ts
import { useState, useCallback } from 'react';

export const useModal = (modalId: string) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = useCallback(() => setIsOpen(true), []);
    const closeModal = useCallback(() => setIsOpen(false), []);

    return { isOpen, openModal, closeModal };
};