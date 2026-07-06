import Home from './home';
import LoginButton from "./LoginButton.jsx";
import Header from "./Header.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Article from "./Article.jsx";
import Admin from "./Admin.jsx";
import Write from "./Write.jsx";


function App() {
    return (
    <BrowserRouter>
        <div>
            <div className="app-header">
                <Header/>
                <Routes>
                <Route path="/home" element ={<LoginButton/>}/>
                </Routes>
            </div>
            <div className="list-container">
                <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/write" element={<Write/>}/>
                <Route path ="/home" element ={<Home/>}/>
                <Route path ="/articles/:articleName" element ={<Article/>}/>
                </Routes>
            </div>
        </div>
    </BrowserRouter>
    );

}

export default App;