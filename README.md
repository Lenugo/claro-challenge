# Prueba de Claro de Libros en React con Backend en .NET

Este proyecto es una aplicación de frontend en React que se conecta a un backend creado en .NET. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre libros. Los datos se manejan a través de una API REST proporcionada por el backend.

## Pasos para ejecutar el proyecto

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Lenugo/claro-challenge/
   cd claro-challenge

2. **Ejecutar el backend en .NET:**

- Abre el proyecto backend (server) en .NET.
- Compílalo y ejecútalo. Asegúrate de que el servidor se esté ejecutando correctamente y escuche en una URL (por ejemplo, http://localhost:5191/api).
3. **Configurar las variables de entorno:**

- En la raíz del proyecto frontend, crea un archivo `.env`.
- En este archivo, agrega la siguiente variable de entorno con la URL del backend:
```env
VITE_API_KEY=http://localhost:5000/api
```

4. **Instalar dependencias del proyecto frontend:**

- Abre una terminal en el directorio del proyecto frontend.
- Ejecuta el siguiente comando para instalar las dependencias:

```bash
npm install
```
5. **Iniciar la aplicación frontend:**

- Una vez que las dependencias estén instaladas, ejecuta la aplicación frontend con:
```bash
npm run dev
```
- La aplicación debería abrirse en el navegador, generalmente en http://localhost:5173/books.
- Fue generado usando Vite.
