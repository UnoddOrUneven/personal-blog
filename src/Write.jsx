import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

function Write() {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    async function createArticle() {
        fetch("/api/save-article",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name,content})
        });

    }

    async function updateArticle(){
        fetch("/api/update-article",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name,content})
        });
    }

    const {articleName} = useParams();
    const isEditing = Boolean(articleName);

    useEffect(() => {
      if (!isEditing) return;

      setName(articleName);

      fetch(`/api/article/${articleName}`)
          .then(response => response.text())
          .then(text => setContent(text));
  }, [articleName, isEditing]);

    return (
        <div className="write-article">
            <input value={name} onChange={e => setName(e.target.value)} className="write-article-name" type='text'
                   placeholder='Name of the article'/>
            <textarea value={content} onChange={e => setContent(e.target.value)}
                      className={"article-textarea"}
                      placeholder = "Write your article here..."></textarea>
            <div className ={"write-article-buttons-container"}> 
            <button type='submit' onClick = {isEditing ?  () => updateArticle():() => createArticle()} className={"create-article-button"}>{isEditing ? "Save Edit":"Create"}</button>
            <button className = "back-button" onClick={() => window.history.back()}> Back </button>
            </div>
        </div>
    )

}

export default Write;

