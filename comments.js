// Create web server
// Create a web server that listens on port 3000. When you visit the root URL, it should display a list of comments from the comments array.
// If you visit the URL /comments, it should display the comments array as a JSON response.
// If you visit the URL /form, it should display a simple HTML form that allows you to submit a comment. When you submit a comment, it should be added to the comments array and redirected to the root URL.
// If you visit the URL /delete/:id, it should delete the comment with the given ID from the comments array and redirect to the root URL.

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const comments = [
  { id: 1, author: 'John Doe', text: 'This is a comment' },
  { id: 2, author: 'Jane Smith', text: 'This is another comment' },
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  let output = '<h1>Comments</h1>';
  output += '<ul>';
  comments.forEach((comment) => {
    output += `<li>${comment.author}: ${comment.text}</li>`;
  });
  output += '</ul>';
  res.send(output);
});

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/form', (req, res) => {
  const { author, text } = req.body;
  const id = comments.length + 1;
  comments.push({ id, author, text });
  res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = comments.findIndex((comment) => comment.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
  }
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});