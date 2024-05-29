"use client"
import { useState, useCallback, useContext, createContext } from "react";
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction } from "@/components/ui/toast";

const ToastContext = createContext();

export const useToast = () => {
    return useContext(ToastContext);
};

export const ToastProviderWrapper = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback(({ title, description, variant }) => {
        setToasts((prevToasts) => [
            ...prevToasts,
            { id: Date.now(), title, description, variant }
        ]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            <ToastProvider>
                {children}
                <ToastViewport>
                    {toasts.map((toast) => (
                        <Toast key={toast.id} variant={toast.variant}>
                            <ToastTitle>{toast.title}</ToastTitle>
                            <ToastDescription>{toast.description}</ToastDescription>
                            <ToastClose onClick={() => removeToast(toast.id)} />
                            <ToastAction altText="Close" onClick={() => removeToast(toast.id)}>
                                Fechar
                            </ToastAction>
                        </Toast>
                    ))}
                </ToastViewport>
            </ToastProvider>
        </ToastContext.Provider>
    );
};
