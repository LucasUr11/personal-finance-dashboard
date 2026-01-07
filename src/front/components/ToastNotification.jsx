import { useEffect, useState } from "react";

export const ToastNotification = ({
    show,
    message,
    duration = 2000,
    onClose
}) => {
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        if (show) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(onClose, 300);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    if (!show && !visible) return null;

    return (
        <div className="toast_notification">
            <div
                className={`custom-toast ${visible ? "toast_notification-enter" : "toast_notification-exit"
                    }`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                {message}
            </div>
        </div>
    );
};
