<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project README</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
        }
        h1, h2, h3 {
            color: #4A90E2;
        }
        pre {
            background-color: #f4f4f4;
            padding: 10px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>Personal Blog</h1>
    <p>This is a simple personal blog application built with Node.js and Express.js. It allows users to create, edit, view, and delete articles. The blog is structured with a focus on ease of use and management.</p>

    <h2>Table of Contents</h2>
    <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#authentication">Authentication</a></li>
        <li><a href="#contributing">Contributing</a></li>
        <li><a href="#license">License</a></li>
    </ul>

    <h2 id="features">Features</h2>
    <ul>
        <li>Create new articles</li>
        <li>Edit existing articles</li>
        <li>View individual articles</li>
        <li>Delete articles</li>
        <li>Display all articles on the home page</li>
        <li>Admin dashboard for managing articles</li>
        <li>Basic authentication for the admin page</li>
    </ul>

    <h2 id="installation">Installation</h2>
    <pre><code>git clone <repository-url>

cd <project-directory>
npm install
</code></pre>
<p>Make sure you have Node.js and npm installed on your machine.</p>

    <h2 id="usage">Usage</h2>
    <pre><code>node index.js
    </code></pre>
    <p>The application will run on <strong>http://localhost:3000</strong>. You can access the home page and admin page from there.</p>

    <h2 id="authentication">Authentication</h2>
    <p>The admin page requires basic authentication. Use the following credentials to log in:</p>
    <ul>
        <li><strong>Username:</strong> admin</li>
        <li><strong>Password:</strong> admin</li>
    </ul>

    <h2 id="contributing">Contributing</h2>
    <p>If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Any contributions are welcome!</p>

    <h2 id="license">License</h2>
    <p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>
</html>
