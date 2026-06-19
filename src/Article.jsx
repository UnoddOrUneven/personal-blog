import {useParams} from "react-router-dom";
import loadArticles,  {trimArticleName} from "./articleLoader.js";
import {useEffect, useState} from "react";

function getArticleContent(articleName) {
    const articles = loadArticles()
    const articleKey = Object.keys(articles).find(article => trimArticleName(article) === articleName)
    return articles[articleKey]()
}

function Article() {
    let articleName = useParams().articleName;
    let articleContent = getArticleContent(articleName);
    const [text, setText] = useState("Loading...")
    useEffect(() => {articleContent.then(result => {setText(result)})}, [articleContent, articleName]);
    return(
    <div> {text}</div>
    )
}
export default Article;