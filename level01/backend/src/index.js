const express = require('express');
const { uuid, isUuid } = require('uuidv4');
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

/**
 * Middleware:
 * 
 * Interceptador de request que pode:
 *  - Interromper totalmente a request
 *  - alterar dados da request antes da response ser retornada para o usuário.
 * 
 *  - o Formato do middleware é uma função
 *  - todas as rotas podem ser considerada middlewares, pois ele fazem o mesmo que as rotas.
 *  */

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next(); //Próximo middleware

  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid project id' });    
  }

  return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
  const { title } = request.query;

  const results = title
  ? projects.filter(project => project.title.includes(title))
  : projects;

  return response.json(results);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0 ) {
    return response.status(400).json({ error: 'Project not found.' });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0 ) {
    return response.status(400).json({ error: 'Project not found.' });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log('🚀 Back-end started!');
});