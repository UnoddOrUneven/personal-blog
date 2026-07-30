
export function trimArticleName(name) {
    if (typeof name !== "string") {
        console.warn("trimArticleName expected a string, got:", name);
        return "";   }
return name.replace("../articles/", '').replace(".md", "");
}



export async function loadArticles(){
    const response = await fetch("/api/articles");
    return await response.json();
}


