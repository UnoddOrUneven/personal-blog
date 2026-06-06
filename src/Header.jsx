import App from "./App.jsx";

function Header({children}) {
    return(
        <header>
            <h1> Personal Blog</h1>
            {children}
        </header>

    )
}
export default Header;