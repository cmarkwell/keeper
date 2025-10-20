import { createContext, use, useCallback, useMemo, useRef, useState } from 'react';

import Toast from '../../components/Toast';

import './toastContext.css';

// Default toast durations in milliseconds
const DEFAULT_DURATION_REGULAR = 5_000;
const DEFAULT_DURATION_ACTION = 1_000 * 60 * 60;

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
    const timeoutIdByToastIdRef = useRef({});

    const [toasts, setToasts] = useState({});

    const activeToasts = useMemo(() => Object.values(toasts).filter(Boolean), [toasts]);

    const closeToast = useCallback((id) => {
        clearTimeout(timeoutIdByToastIdRef.current[id]);
        setToasts((prevToasts) => ({ ...prevToasts, [id]: undefined }));
    }, []);

    const toast = useCallback(
        (toastOptions) => {
            const id = toastOptions.id ?? self.crypto.randomUUID();
            const duration =
                toastOptions.duration ?? (toastOptions.action ? DEFAULT_DURATION_ACTION : DEFAULT_DURATION_REGULAR);
            const resolvedToastOptions = { ...toastOptions, id, duration };

            clearTimeout(timeoutIdByToastIdRef.current[id]);
            setToasts((prevToasts) => ({ ...prevToasts, [id]: resolvedToastOptions }));
            timeoutIdByToastIdRef.current[id] = setTimeout(() => closeToast(id), duration);
        },
        [closeToast],
    );

    const value = useMemo(
        () => ({
            activeToasts,
            closeToast,
            toast,
        }),
        [activeToasts, closeToast, toast],
    );

    return (
        <ToastContext.Provider value={value}>
            {activeToasts.length > 0 && (
                <div className='toasts-container'>
                    {activeToasts.map((toastOptions) => (
                        <Toast key={toastOptions.key} {...toastOptions} onClose={closeToast} />
                    ))}
                </div>
            )}
            {children}
        </ToastContext.Provider>
    );
};

const useToast = () => use(ToastContext);

export { useToast };

export default ToastProvider;
