const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.post('/new', (req, res) => {
    const { title, content, date } = req.body;

    if (!title || !content || !date) {
        return res.status(400).send('All fields are required.');
    }

    // Create the directory if it doesn't exist
    const articlesdir = path.join(__dirname, 'articles');
    if (!fs.existsSync(articlesdir)) {
        fs.mkdirSync(articlesdir);
    }

    // Name of the file
    const fileName = `${title.replace(/\s+/g, '_')}.json`;
    // Path of the file
    const filePath = path.join(articlesdir, fileName);

    // The content of the file
    const articleData = { title, content, date };

    // Convert object to JSON and save to folder
    fs.writeFile(filePath, JSON.stringify(articleData, null, 2), (err) => {
        if (err) {
            console.error('Something went wrong saving the article: ', err);
            return res.status(500).send('Something went wrong saving the article.');
        }
        res.send('Article saved successfully!');
    });

    console.log('Recieved request: ', req.body);
});

app.get('/new', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

