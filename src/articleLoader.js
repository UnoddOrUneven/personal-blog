
export default function loadArticles() {
    const articles = import.meta.glob('../articles/*.md',{query:"?raw",import:"default"});
    return articles;
}
export function trimArticleName(name) {
    return name.replace("../articles/", '').replace(".md", "");
}
