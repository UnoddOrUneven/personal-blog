import {trimArticleName,loadArticles} from "./articleLoader.js";
import {Link, useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
import  {deleteArticle} from "./deleteArticle.js";

function Admin()
{
    const navigate = useNavigate();
    const [articles,setArticles] =  useState([]);
    useEffect(
        ()=>{
            loadArticles().then(setArticles);
        }, []
    );
    return(
        <div className="list-header">
            Admin Page
        <div className="article-list">
            <ul>
                <button className={"create-article-button"} onClick={() => navigate("/write")}>New article</button>
                {articles.map(article =>
                    (   
                         <li  key={article}>
                        <div className="list-element-container"> 
                       
                            <Link className = "article-link" to={`/articles/${trimArticleName(article.name)}`}> {trimArticleName(article.name)}</Link>
                            <button className="edit-button" onClick = {() => navigate(`/write/${trimArticleName(article)}`)}>Edit</button>
                            <button className="delete-button" onClick = {() => {deleteArticle(trimArticleName(article.name)); window.location.reload();}}>Delete</button>
                        </div>
                        </li>
                    )
                )}
            </ul>
        </div>
    </div >)

}
export default Admin;