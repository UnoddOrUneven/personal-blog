import loadArticles from './articleLoader.js'
import {Link} from "react-router-dom";
import {trimArticleName} from "./articleLoader.js";




function Home() {

    return (

        <div className="list-header">
            Home Page

            <div className="article-list">
                <ul>
                    {Object.keys(loadArticles()).map(article =>
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

