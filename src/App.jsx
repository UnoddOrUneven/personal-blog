import Home from './home';
import LoginButton from "./LoginButton.jsx";
import Header from "./Header.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Article from "./Article.jsx";


function App() {
    return (
    <BrowserRouter>
        <div>
            <div className="app-header">
                <Header/>
                <LoginButton/>
            </div>
            <div className="list-container">
                <Routes>
                <Route path ="/" element ={<Home/>}/>
                <Route path ="/articles/:articleName" element ={<Article/>}/>
                </Routes>
            </div>
        </div>
    </BrowserRouter>
    );

}

export default App;