import express from 'express';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';

const app = express();
app.use(cors());
app.use(express.static('public'));

cloudinary.config({
  cloud_name: 'dec5dv8iy',
  api_key: '349181619945547',
  api_secret: 'rUKYYvl2_d9ZN2wD_jXTU2nJrfE'
});

app.get('/api/audios', async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'audios/',
      resource_type: 'video'
    });
    res.json(result.resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Servidor en http://localhost:3001'));
