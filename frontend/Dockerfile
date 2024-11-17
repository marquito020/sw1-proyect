# Usa la imagen de Node.js
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente
COPY . .

# Expone el puerto del frontend
EXPOSE 3000

# Comando para iniciar el frontend
CMD ["npm", "run", "dev"]
