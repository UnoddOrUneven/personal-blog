
export function trimArticleName(name) {
    return name.replace("../articles/", '').replace(".md", "");
}


export async function loadArticles(){
    const response = await fetch("/api/articles");
    return await response.json();
}


