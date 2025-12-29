import { useState, React } from "react";
import { SignupForm } from "./SignupForm";
import { LoginForm } from "./LoginForm";
import { OverlayPanel } from "./OverlayPanel";

export const AuthSection = () => {
    const [isSignup, setIsSignup] = useState(false);

    return (
        <div className={`auth_section_container ${isSignup ? "right-panel-active" : ""}`
        }>
            <SignupForm />
            <LoginForm />
            <OverlayPanel toggle={() => setIsSignup(!isSignup)} />
        </div>
    )
}
