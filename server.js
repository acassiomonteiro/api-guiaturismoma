
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const port = 3000;

// Função para criar o HTML base
function createHtmlTemplate(title, content) {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }
            .item {
                border: 1px solid #ccc;
                padding: 10px;
                margin-bottom: 20px;
            }
            h1 {
                color: #333;
                border-bottom: 2px solid #333;
                padding-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <h1>${title}</h1>
        ${content}
    </body>
    </html>
  `;
}

// Rota raiz
app.get('/', (req, res) => {
  const content = `
    <p>Bem-vindo à API de Turismo.</p>
    <ul>
      <li><a href="/destinos">Ver Destinos</a></li>
      <li><a href="/atrativos">Ver Atrativos</a></li>
    </ul>
  `;
  res.send(createHtmlTemplate('API de Turismo', content));
});

// Rota para listar todos os destinos
app.get('/destinos', async (req, res) => {
  try {
    const destinos = await prisma.destino.findMany();
    let content = '';
    destinos.forEach(destino => {
      content += `
        <div class="item">
          <h2>${destino.name}</h2>
          <p><strong>Descrição:</strong> ${destino.description || 'Sem descrição disponível'}</p>
          <p><strong>Localização:</strong> ${destino.localizacao || 'Localização não especificada'}</p>
          <a href="/destinos/${destino.id}">Ver detalhes</a>
        </div>
      `;
    });
    res.send(createHtmlTemplate('Lista de Destinos', content));
  } catch (error) {
    res.status(500).send('Erro ao buscar destinos: ' + error.message);
  }
});

// Rota para buscar um destino específico
app.get('/destinos/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const destino = await prisma.destino.findUnique({
      where: { id: id },
      include: { atrativos: true }
    });

    if (!destino) {
      return res.status(404).send('Destino não encontrado');
    }

    const content = `
     <div class="destino">
          <h1>${destino.name}</h1>
          <p><strong>Descrição:</strong> ${destino.description || 'Sem descrição disponível'}</p>
          <p><strong>Localização:</strong> ${destino.localizacao || 'Localização não especificada'}</p>
          <img src="${destino.imagem || 'N/A'}" alt="Imagem 1" width="200" height="200">
          <img src="${destino.imagem2 || 'N/A'}" alt="Imagem 2" width="200" height="200">
          <img src="${destino.imagem3 || 'N/A'}" alt="Imagem 3" width="200" height="200">
          <img src="${destino.imagem4 || 'N/A'}" alt="Imagem 4" width="200" height="200">
          <h3>Atrativos:</h3>
          <ul>
            ${destino.atrativos.map(atrativo => `<li><a href="/atrativos/${atrativo.id}">${atrativo.name}</a></li>`).join('')}
          </ul>
        </div>
      <a href="/destinos">Voltar para lista de destinos</a>
    `;
    res.send(createHtmlTemplate(`Destino: ${destino.name}`, content));
  } catch (error) {
    res.status(500).send('Erro ao buscar destino: ' + error.message);
  }
});

// Rota para listar todos os atrativos
app.get('/atrativos', async (req, res) => {
  try {
    const atrativos = await prisma.atrativo.findMany({
      include: { destinos: true }
    });

    let content = '';
    atrativos.forEach(atrativo => {
      content += `
        <div class="item">
        <a href="/destinos">Voltar para lista de destinos</a>
          <h2>${atrativo.name}</h2>
          <p><strong>Tipo:</strong> ${atrativo.tipo || 'Tipo não especificado'}</p>
          <p><strong>Descrição:</strong> ${atrativo.description || 'Sem descrição disponível'}</p>
          <p><strong>Dicas:</strong> ${atrativo.dicas || 'Nenhuma dica disponível'}</p>
          <p><strong>Destino:</strong> ${atrativo.destinos ? atrativo.destinos.name : 'Destino não especificado'}</p>
        </div>
      `;
    });

    res.send(createHtmlTemplate('Lista de Atrativos', content));
  } catch (error) {
    res.status(500).send('Erro ao buscar atrativos: ' + error.message);
  }
});

// Rota para buscar um atrativo específico
app.get('/atrativos/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const atrativo = await prisma.atrativo.findUnique({
      where: { id: id },
      include: { destinos: true }
    });

    if (!atrativo) {
      return res.status(404).send('Atrativo não encontrado');
    }

    const content = `
      <div class="item">
        <h2>${atrativo.name}</h2>
        <p><strong>Tipo:</strong> ${atrativo.tipo || 'Tipo não especificado'}</p>
        <p><strong>Descrição:</strong> ${atrativo.description || 'Sem descrição disponível'}</p>
        <p><strong>Dicas:</strong> ${atrativo.dicas || 'Nenhuma dica disponível'}</p>
        <p><strong>Destino:</strong> ${atrativo.destinos ? atrativo.destinos.name : 'Destino não especificado'}</p>
      </div>
      <a href="/destinos/${atrativo.destinos.id}">Voltar</a>
    `;
    res.send(createHtmlTemplate(`Atrativo: ${atrativo.name}`, content));
  } catch (error) {
    res.status(500).send('Erro ao buscar atrativo: ' + error.message);
  }
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Tratamento de erros e encerramento gracioso
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Conexão com o Prisma fechada');
  process.exit();
});