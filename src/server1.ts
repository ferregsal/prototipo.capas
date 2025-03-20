import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { products } from './products';

// Inicializamos la aplicación Express
const app = express();

// Configuramos los middlewares
app.use(bodyParser.json()); // Utilizamos bodyParser para procesar solicitudes en JSON
app.use(cors()); // Utilizamos Cors para gestionar solicitudes de otras aplicaciones

// Creamos el array de datos en memoria desde el mock que hemos importado
let productList = [...products];

// Método get para obtener todos los productos
app.get('/products', (_req, res) => {
  // Recibe todos los productos en formato JSON
  res.status(200).json(productList);
});

// Método getById para obtener un producto con su id
app.get('/products/:id', (req, res) => {
  // Recibe el Id desde los parámetros de la URL
  const { id } = req.params;
  // Busca el producto con el Id seleccionado
  const product = productList.find((p) => p.id === id);

  // Si encuentra el producto, devuelve sus datos, si el producto no existe, devuelve  un error 404.
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Método post, para crear un nuevo producto
app.post('/products', (req, res) => {
  // Genera un nuevo Id aleatorio para el producto.
  const newId = crypto.randomUUID().toString();

  // Crea el nuevo producto con los datos recibidos en el body de la solicitud.
  const newProduct = {
    id: newId,
    ...req.body,
    is_active: true, // Establecemos su estado por defecto como activo
    created_at: new Date(), // Guardamos la fecha actual de creación
    updated_at: new Date(), // Guardamos la fecha actual de actualización
  };

  // Añadimos el producto crado al array de productos.
  productList.push(newProduct);

  // Devolvemos respuesta con el producto y estado 201 (creado).
  res.status(201).json(newProduct);
});

// Método Patch para actualizar los datos de un producto existente
app.patch('/products/:id', (req, res) => {
  // Recibe el Id desde los parámetros de la URL
  const { id } = req.params;

  // Busca el índice del producto
  const index = productList.findIndex((p) => p.id === id);

  // Si encuentra el producto, actualiza sus datos
  if (index > -1) {
    // Actualiza los campos que aparecen en el body de la solicitud
    productList[index] = {
      ...productList[index],
      ...req.body, // Sustituye los datos con los nuevos datos enviados en el body de la solicitud
      updated_at: new Date(), // Actualiza la fecha actualización a la actual
    };

    // Devuelve el producto actualizado en la respuesta acompañado del estado 200 (OK)
    res.status(200).json(productList[index]);
  } else {
    // Si no existe el producto, devuelve un error 404
    res.status(404).json({ error: 'Product not found' });
  }
});

//Método Delete, elimina un producto existente según su Id
app.delete('/products/:id', (req, res) => {
  // Recibe el Id desde los parámetros de la URL
  const { id } = req.params;

  //Aplica un filtro al array para excluir el producto con el Id recibido
  const initialLength = productList.length;
  productList = productList.filter((p) => p.id !== id);

  //Si ha cambiado la longitud del array, se ha eliminado el producto
  if (productList.length < initialLength) {
    res.status(204).send(); //Mensaje de estado exitoso sin contenido
  } else {
    //Si el producto no existe, devuelve un error 404 (No encontrado)
    res.status(404).json({ error: 'Product not found' });
  }
});
//Inicializamos el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`El servidor está activo en http://localhost:${PORT}`);
});
