import {useNavigate} from "react-router-dom";
function LoginButton() {
    const navigate = useNavigate();
    return (
        <div>
            <button className="login-button" onClick={() => navigate('/loginForm')}>
                Log in
            </button>
        </div>
    )
}
export default LoginButton;


