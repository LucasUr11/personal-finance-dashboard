import React from "react";

export const OverlayPanel = ({ toggle }) => {
    return (
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1 className="form_h1">Bienvenido, de nuevo!</h1>
                    <p className="overlay_panel-p">Para mantenerse conectado con nosotros, inicie sesión y tenga el control de su dinero.</p>
                    <button
                        className="form_button"
                        onClick={toggle}>Iniciar Sesión
                    </button>
                </div>

                <div className="overlay-panel overlay-right">
                    <h1 className="form_h1">Bienvenido a WiseTrack!</h1>
                    <p className="overlay_panel-p">Tu dinero, más claro que nunca.</p>
                    <button
                        className="form_button"
                        onClick={toggle}>Registrate
                    </button>
                </div>
            </div>
        </div>
    )
}