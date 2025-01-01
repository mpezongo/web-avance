# Dockerfile pour Node.js
FROM node:18.16.0

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

RUN npm install nodemon --g

RUN npm install dotenv --g

# Copier le reste des fichiers
COPY . .

# Exposer le port
EXPOSE 5000

# Commande de démarrage
CMD ["npm", "start"]
