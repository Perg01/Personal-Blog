# Personal Blog Project

## Overview

This project is a simple personal blog built using Node.js and Express. It allows users to create, read, update, and delete articles. The blog includes an admin dashboard that requires authentication to manage articles.

## Features

- **Create Articles**: Add new articles with a title, content, and date.
- **Read Articles**: View published articles on the home page.
- **Update Articles**: Edit existing articles from the admin dashboard.
- **Delete Articles**: Remove articles through the admin interface.
- **Admin Dashboard**: A secured area for managing articles that requires basic authentication.
- **Basic Authentication**: Access to the admin dashboard is restricted to users with the username and password set as `admin`.

## Requirements

- Node.js
- Express

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-name>

   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create an article directory in the root of the project to store articles.

4. Start the server:

   ```bash
   node app.js
   ```

5. Open Your Browser and navigate to http://localhost:3000

## Authentication

Basic Authentication is used for the admin dashboard.
The username and password are set as `admin` and `admin` respectively.

Username: admin
Password: admin

## API Endpoints

- **GET /admin**: Displays the admin dashboard where you can manage and create articles.
- **GET /home**: Returns a list of published articles.
- **POST /new**: Create a new article.
- **GET /article/:id**: Returns the details of a specific article.
- **GET /edit/:id**: Loads the edit page for a specific article.
- **POST /edit/:id**: Updates an existing article.
- **POST /admin/delete/:id**: Deletes an article.

https://roadmap.sh/projects/personal-blog
