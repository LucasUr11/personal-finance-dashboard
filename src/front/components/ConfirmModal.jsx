import React from "react";

export const ConfirmModal = ({
    show,
    title = "Confirmar acción",
    message = "¿Estás seguro?",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    onConfirm,
    onCancel,
}) => {
    if (!show) return null;

    return (
        <div className="confirm-overlay">
            <div className="confirm-modal">
                <h5 className="confirm-title">{title}</h5>
                <p className="confirm-message">{message}</p>

                <div className="confirm-actions">
                    <button
                        className="btn btn-secondary"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};
