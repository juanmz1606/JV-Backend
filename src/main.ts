import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

// Aquí implementarás los endpoints (Create, Delete, Read) para la entidad "Post"
interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

let posts: Post[] = [];

app.post('/posts', (req, res) => {
  const { id, title, content } = req.body;

  // Verificar que se proporcionen todos los datos requeridos
  if (!id || !title || !content) {
    res.status(400).json({ error: 'Faltan datos requeridos para crear el post.' });
    return;
  }

  // Crear el objeto Date con la fecha y hora actual
  const createdAt = new Date();

  // Intentar crear el nuevo post
  try {
    const newPost: Post = { id, title, content, createdAt};
    posts.push(newPost);
    res.status(201).json(newPost); // Envía el post recién creado como respuesta en formato JSON
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al intentar crear el post.' });
  }
});


app.get('/posts', (req, res) => {
  res.json(posts);
});

app.delete('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);

  // Buscar el post en el arreglo de posts
  const postIndex = posts.findIndex((post) => post.id === postId);

  // Si el post no existe, responder con un estado HTTP 404 (Not Found)
  if (postIndex === -1) {
    res.status(404).json({ error: 'El post no fue encontrado.' });
    return;
  }

  // Eliminar el post del arreglo
  posts.splice(postIndex, 1);

  // Responder con un estado HTTP 200 (OK) para indicar que el post fue eliminado correctamente
  res.sendStatus(200);
});



app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
