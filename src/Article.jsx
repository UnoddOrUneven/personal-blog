import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";

async function getArticleContent(articleName) {
    const response = await fetch("/api/article/".concat(articleName),{
        method: "GET",
        headers: {"Content-Type": "application/json"},
    });
    return await response.text();
}

function Article() {
    let articleName = useParams().articleName;

    const [text, setText] = useState("Loading...")
    useEffect(() => {
        let articleContent = getArticleContent(articleName);
        articleContent.then(result => {setText(result)})}, [articleName]);
    return(
        <div>
            <div className="article-markdown">
                <ReactMarkdown>{text}</ReactMarkdown>
            </div>
            <button className = "back-button" onClick={() => window.history.back()}>
                Back
            </button>
        </div>
    )
}
export default Article;
