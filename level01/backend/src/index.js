const express = require('express');

const app = express();

// Dizendo para o express que a minha api vai receber indormaçĩes no formato JSON
app.use(express.json()); 

/**
 * Métodos HTTP:
 * 
 * GET: Buscar information do back-end
 * POST: Criar uma information do back-end
 * PUT: Alterar uma information do back-end
 * 
 *  */ 
/**
 * Tipos de parametros:
 * 
 * Query Params: Filtros e paginação (app.get) também chamados de parâmetros get
 * Route Params: Identificar recursos na hora de Atualizar ou Deletar
 * Request Body: Contéudo na hora de criar ou editar em recurso (conteúdo chega no formato JSON)

*/

app.get('/projects', (request, response) => {
  const { title, owner } = request.query;

  console.log(title);
  console.log(owner);

  return response.json([
    'Projeto 1', 
    'Projeto 2'
  ]);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  console.log(title);
  console.log(owner);

  return response.json([
    'Projeto 1', 
    'Projeto 2', 
    'Projeto 3'
  ]);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;

  console.log(id);

  return response.json([
    'Projeto 4', 
    'Projeto 2', 
    'Projeto 3'
  ]);
});

app.delete('/projects/:id', (request, response) => {
  return response.json([
    'Projeto 2', 
    'Projeto 3'
  ]);
});


app.listen(3333, () => {
  console.log('🚀 Back-end started listening!');
});