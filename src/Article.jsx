import {useParams} from "react-router-dom";
import loadArticles,  {trimArticleName} from "./articleLoader.js";
import {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";

function getArticleContent(articleName) {
    const articles = loadArticles()
    const articleKey = Object.keys(articles).find(article => trimArticleName(article) === articleName)
    return articles[articleKey]()
}

function Article() {
    let articleName = useParams().articleName;

    const [text, setText] = useState("Loading...")
    useEffect(() => {
        let articleContent = getArticleContent(articleName);
        articleContent.then(result => {setText(result)})}, [articleName]);
    return(
    <ReactMarkdown>{text}</ReactMarkdown>
    )
}
export default Article;