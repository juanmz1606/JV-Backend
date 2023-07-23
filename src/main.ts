import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

// Aquí implementarás los endpoints (Create, Delete, Read) para la entidad "Post"
interface Post {
  id: number;
  title: string;
  content: string;
}

let posts: Post[] = [];

app.post('/posts', (req, res) => {
  const { id, title, content } = req.body;
  const newPost: Post = { id, title, content };
  posts.push(newPost);
  res.json(newPost);
});

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.delete('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  posts = posts.filter((post) => post.id !== postId);
  res.sendStatus(200);
});


app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
