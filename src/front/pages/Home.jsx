import React from "react";
import { useNavigate } from "react-router-dom";



export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex home">
            Estamos trabajando para que tenga una mejor experiencia como usuario.
        </div>
    );
};
