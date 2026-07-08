import express from 'express';
import fs from "node:fs"
import path from "path";
import {fileURLToPath} from 'url'
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const articleDir = path.join(__dirname, `../articles/`);


app.use(express.json());                       // parses JSON bodies for you → req.body

app.get('/api/articles', (req, res) => {
    let files = fs.readdirSync(articleDir);
    res.json(files);
});



app.post('/api/articles', (req, res) => {
    saveNewArticle(req.body.name ,req.body.content)
    res.status(201).send("Article saved");
});


app.get('/api/article/:name', (req, res) => {
    const articleName = req.params.name;
    if (!/^[a-z0-9-]+$/i.test(articleName)) return (res.status(404)).send();
    const filePath = articleDir + '/' + articleName + ".md";
    if (!fs.existsSync(filePath)) return (res.status(404)).send();
    const markdown = fs.readFileSync(filePath,'utf8');
    res.send(markdown);
} )




app.listen(3001, () => console.log('api on 3001'));





function saveNewArticle (name, content) {
    if (!/^[a-z0-9-]+$/i.test(name)) return;
    const filePath = articleDir + '/' + name + ".md";
    fs.writeFile(filePath, content, (err) => {
        if (err) console.log(err);
            else {
                console.log(`Saved ${name} successfully.`);
            };})
}
