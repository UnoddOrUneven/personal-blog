import express from 'express';
import fs from "node:fs"
import path from "path";
import {fileURLToPath} from 'url'
import session from 'express-session';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const articleDir = path.join(__dirname, `../articles/`);


app.use(express.json(),session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));                       // parses JSON bodies for you → req.body

app.get('/api/articles', (req, res) => {
    let files = fs.readdirSync(articleDir).map(filename => {
        const filePath = path.join(articleDir, filename);
        const stats = fs.statSync(filePath);
        return{
            name: filename,
            date: stats.mtime
        }
    });


    res.json(files);
});
app.post('/api/auth', (req, res) => {
    const { name, password } = req.body;
    if (name === 'admin' && password === 'password') {
        console.log('Login successful for', name);
        req.session.user = {
        name:"admin"
        };
        res.status(200).json({ message: 'Login successful' });

    } else {
        console.log('Login failed for', name);
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.post('/api/save-article', requireAdmin, (req, res) => {
    const articleNames = fs.readdirSync(articleDir);
    if (articleNames.includes(req.body.name +
        ".md"
    )){
        res.status(409).send("Article already exists");
        console.log("Tried to overwrite an existing article")
        return;
    }
    saveNewArticle(req.body.name ,req.body.content);
    res.status(201).send("Article saved");
});

app.post("/api/update-article/",requireAdmin, (req,res)=> {
    saveNewArticle(req.body.name ,req.body.content);
    res.status(201).send("Article updated");
});

app.get('/api/article/:name', (req, res) => {
    const articleName = req.params.name;
    if (!/^[a-z0-9-]+$/i.test(articleName)) return (res.status(404)).send();
    const filePath = articleDir + '/' + articleName + ".md";
    if (!fs.existsSync(filePath)) return (res.status(404)).send();
    const markdown = fs.readFileSync(filePath,'utf8');
    res.send(markdown);
} )

app.post("/api/delete-article/:name", requireAdmin, (req,res) => {
    const articleName = req.params.name;
     if (!/^[a-z0-9-]+$/i.test(articleName)) {
        return res.status(400).json({
            message: 'Invalid article name'})};
     
    
    const filePath = path.join(articleDir, `${articleName}.md`);
    fs.unlink(filePath, err => {
        if (err) {
            console.error(`Error deleting article ${articleName}:`, err);
            return res.status(404).json({ message: 'Article not found' });
        }
    })
    res.send(`Article ${articleName} deleted`);}
)



app.listen(3001, () => console.log('api on 3001'));


function requireAdmin(req,res,next){
    if (!req.session.user || req.session.user.name !== "admin") {
        return res.status(403).json({message:"Forbidden"});
    }
    next();
}


function saveNewArticle (name, content) {
    if (!/^[a-z0-9-]+$/i.test(name)) return;
    const filePath = articleDir + '/' + name + ".md";
    fs.writeFile(filePath, content, (err) => {
        if (err) console.log(err);
            else {
                console.log(`Saved ${name} successfully.`);
            };})
}
