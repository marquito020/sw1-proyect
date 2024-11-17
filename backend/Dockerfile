# Usa la imagen de Node.js
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Genera el cliente de Prisma
RUN npx prisma generate

# Migra la base de datos de Prisma
CMD ["sh", "-c", "npx prisma migrate deploy && sleep 10 && npm run dev"]
