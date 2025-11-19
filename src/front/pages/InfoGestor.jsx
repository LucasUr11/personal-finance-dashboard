import { useNavigate } from "react-router-dom"

export const InfoGestor = () => {

    const navigate = useNavigate();
    return (
        <div>
            <h1>Porque es importante organizar tus gastos?</h1>
            <div>Porque ...</div>
            <button
                onClick={() => navigate("/home")}
            >Home</button>
        </div>
    )
}