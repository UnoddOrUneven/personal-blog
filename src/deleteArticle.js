export function deleteArticle(articleName) {
fetch(`/api/delete-article/${articleName}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ articleName })
});
}
export default deleteArticle;