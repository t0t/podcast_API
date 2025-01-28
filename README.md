# Podcast Player

Reproductor de audio moderno construido con TypeScript y JavaScript vanilla, utilizando Cloudinary para el almacenamiento y gestión de archivos de audio.

## Características

- Reproductor de audio con interfaz moderna
- Diseño responsive
- Rendimiento optimizado
- TypeScript para mejor mantenibilidad
- Estilos modernos con CSS variables
- Hot reload en desarrollo
- Despliegue fácil a GitHub Pages

## Tecnologías

- TypeScript
- Vite
- Node.js + Express (API)
- Cloudinary
- CSS moderno

## Requisitos Previos

- Node.js (versión 14 o superior)
- Cuenta en Cloudinary

## Configuración

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd podcast_API
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto
   - Añade las siguientes variables:
```env
REACT_APP_CLOUDINARY_CLOUD_NAME=tu_cloud_name
REACT_APP_CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

## Desarrollo

Para iniciar el entorno de desarrollo (API + cliente):
```bash
npm run dev
```

Esto iniciará:
- API en http://localhost:3000
- Cliente en http://localhost:5173

Scripts disponibles:
- `npm run dev` - Inicia API y cliente en modo desarrollo
- `npm run dev:api` - Inicia solo la API
- `npm run dev:client` - Inicia solo el cliente
- `npm run build` - Construye el proyecto para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run deploy` - Despliega a GitHub Pages

## Estructura del Proyecto

```
podcast_API/
├── src/
│   ├── main.ts         # Punto de entrada principal
│   ├── api.ts          # Funciones para llamadas a la API
│   ├── types.ts        # Interfaces y tipos TypeScript
│   ├── utils.ts        # Funciones de utilidad
│   └── style.css       # Estilos CSS
├── server.js           # Servidor API
├── index.html          # HTML principal
└── [archivos de configuración]
```

## Despliegue

### GitHub Pages
```bash
npm run deploy
```

### Netlify Drop
1. Ejecuta `npm run build`
2. Arrastra la carpeta `dist` a https://app.netlify.com/drop

## API Endpoints

### GET /api/audios
Retorna la lista de archivos de audio disponibles.

Respuesta:
```typescript
interface Audio {
    url: string;
    title: string;
    format: string;
    duration?: number;
    bytes: number;
    created_at: string;
}
```

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.
