import {Link} from "react-router-dom";
import {trimArticleName,loadArticles} from "./articleLoader.js";
import {useState,useEffect} from "react";




function Home() {

    const [articles,setArticles] =  useState([]);

    useEffect(() => {
        loadArticles().then(setArticles);
    },[]);


    return (
        <div className="list-header">
            Home Page

            <div className="article-list">
                <ul>
                    {articles.map(article =>
                        (
                            <li key={article}>
                                <Link className =  "article-link" to={`/articles/${trimArticleName(article)}`}> {trimArticleName(article)}</Link>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Home;

