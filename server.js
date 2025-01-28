require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Verificar la configuración de Cloudinary al inicio
console.log('Verificando configuración de Cloudinary...');
console.log('Cloud name:', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME ? 'configurado' : 'falta');
console.log('API key:', process.env.REACT_APP_CLOUDINARY_API_KEY ? 'configurada' : 'falta');
console.log('API secret:', process.env.CLOUDINARY_API_SECRET ? 'configurado' : 'falta');

app.get('/api/audios', async (req, res) => {
  try {
    console.log('Fetching audios from Cloudinary...');
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'audios/',  
      resource_type: 'video',
      max_results: 500
    });

    console.log('Cloudinary response status:', result ? 'success' : 'no data');
    
    if (!result || !result.resources) {
      throw new Error('No se recibieron datos de Cloudinary');
    }

    const audios = result.resources.map(resource => ({
      url: resource.secure_url,
      title: resource.public_id.split('/').pop(),
      format: resource.format,
      duration: resource.duration,
      bytes: resource.bytes,
      created_at: resource.created_at
    }));

    console.log(`Processed ${audios.length} audio(s) successfully`);
    res.json(audios);
  } catch (error) {
    console.error('Error al obtener audios:', error.message);
    console.error('Error completo:', error);
    res.status(500).json({ 
      error: 'Error al obtener los audios',
      details: error.message,
      config: {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME ? 'configurado' : 'falta',
        apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY ? 'configurada' : 'falta',
        apiSecret: process.env.CLOUDINARY_API_SECRET ? 'configurado' : 'falta'
      }
    });
  }
});

// Servir index.html para todas las rutas
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
