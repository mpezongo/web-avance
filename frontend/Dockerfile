# Dockerfile pour React
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Construire l'application
# RUN npm run build

# Utiliser un serveur web pour servir les fichiers
# FROM nginx:alpine
# COPY --from=0 /app/build /usr/share/nginx/html

# Exposer le port
EXPOSE 3000

# Lancer Nginx
# CMD ["nginx", "-g", "daemon off;"]
CMD ["npm", "start"]
