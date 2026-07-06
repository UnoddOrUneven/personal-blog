import {useState} from 'react';

function Write() {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    async function saveArticle() {
        fetch("/articles",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name,content})
        });

    }


    return (
        <div className="write-article">
            <input value={name} onChange={e => setName(e.target.value)} className="write-article-name" type='text'
                   placeholder='Name of the article'/>
            <textarea value={content} onChange={e => setContent(e.target.value)}
                      className={"article-textarea"}></textarea>
            <button type='submit' onClick = {() => saveArticle()} className={"create-article-button"}>Save</button>
        </div>
    )

}

export default Write;

