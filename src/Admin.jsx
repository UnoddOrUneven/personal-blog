import loadArticles, {trimArticleName} from "./articleLoader.js";
import {Link, useNavigate} from "react-router-dom";



function Admin()
{
    const navigate = useNavigate();
    return(
        <div className="list-header">
            Admin Page
        <div className="article-list">
            <ul>
                <button className={"create-article-button"} onClick={() => navigate("/write")}>New article</button>
                {Object.keys(loadArticles()).map(article =>
                    (   
                        <div className="list-element-container"> 
                        <li key={article}>
                            <Link to={`/articles/${trimArticleName(article)}`}> {trimArticleName(article)}</Link>
                            <button className="edit-button" onClick = {() => navigate(`/write/${trimArticleName(article)}`)}> Edit</button>
                        </li>
                        </div>
                    )
                )}
            </ul>
        </div>
    </div >)

}
export default Admin;