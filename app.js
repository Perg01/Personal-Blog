const fs = require('fs');
const path = require('path');
const express = require('express');


const app = express();
const PORT = 3000;
const articlesPath = path.join(__dirname, 'articles');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

function createArticles({ title, content, date }) {
    const id = `article_${Date.now()}`;
    const articleData = { id, title, content, date };
    const filePath = path.join(articlesPath, `${id}.json`);

    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(articleData, null, 2), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(articleData);
            }
        });
    });
}

// Basic Authentication
function authentication(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).send('Authentication required');
    }

    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const [username, password] = credentials;

    if (username === 'admin' && password === 'admin') {
        return next();
    } else {
        return res.status(403).send('Access denied');
    }
}

// Updates article
function editArticle(id, updatedData) {
    const filePath = path.join(articlesPath, `${id}.json`);

    return new Promise((resolve, reject) => {

        // Reading data from file
        fs.readFile(filePath, 'utf-8', (readErr, data) => {

            if (readErr) {
                return reject(readErr);
            }

            // Take JSON data from file and convert it to object
            const articleData = JSON.parse(data);
            // Merging the current article data with the updated data
            const articleToSave = { ...articleData, ...updatedData, id };

            // Writing the updated data to file
            fs.writeFile(filePath, JSON.stringify(articleToSave, null, 2), (writeErr) => {
                if (writeErr) {
                    reject(writeErr);
                } else {
                    resolve(articleToSave);
                }
            });
        });

    });
}

// Retrieves article
function getArticle(id) {
    const filePath = path.join(articlesPath, `${id}.json`);

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

// Gets all articles
function getAllArticles() {
    const articles = [];

    fs.readdirSync(articlesPath).forEach(file => {
        const filePath = path.join(articlesPath, file);
        const fileData = fs.readFileSync(filePath, 'utf-8');
        const article = JSON.parse(fileData);

        articles.push(article);
    });

    return articles;
}

// Delete article
function deleteArticle(id) {
    fs.unlinkSync(path.join(articlesPath, `${id}.json`));
}

// Displays articles on home page
app.get('/home', (req, res) => {
    try {
        const articles = getAllArticles();
        res.render('home.ejs', { articles });
    } catch (err) {
        res.status(500).send('Something went wrong, can\'t fetch all articles');
    }
});

// Route to delete article
app.post('/admin/delete/:id', async (req, res) => {
    try {
        deleteArticle(req.params.id);
        res.redirect('/admin');
    } catch (err) {
        console.error(`Failed to delete article: ${err}`);
        res.status(500).send('Something went wrong, can\'t delete article');
    }
});

// Route to load the article page
app.get('/article/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const article = await getArticle(id);
        res.render('article.ejs', { article });
    } catch (err) {
        res.status(500).send('Something went wrong, can\'t fetch article');
    }
});

// Route to fetch article
app.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const article = await getArticle(id);
        res.render('edit.ejs', { article });
    } catch (err) {
        res.status(500).send('Something went wrong, can\'t fetch article');
    }
});

// Route to update article
app.post('/edit/:id', async (req, res) => {

    const updatedData = {
        id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        date: req.body.date
    };
    editArticle(req.params.id, updatedData)
        .then(() => {
            res.redirect('/admin');
        })
        .catch(err => {
            res.status(500).send('Something went wrong, can\'t update article');
        });
});

// Route to create a new article
app.post('/new', async (req, res) => {
    try {
        const { title, content, date } = req.body;
        await createArticles({ title, content, date });
        res.redirect('/admin');
    } catch (err) {
        res.status(500).send('Something went wrong, can\'t create article');
    }
});

// Displays articles on admin page
app.get('/admin', (req, res) => {
    try {
        const articles = getAllArticles();
        res.render('admin.ejs', { articles });
    } catch (err) {
        res.status(500).send('Something went wrong, can\'t fetch all articles');
    }
});

app.get('/admin', authentication, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

app.get('/new', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

