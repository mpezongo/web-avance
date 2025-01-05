# Projet Web Avancé

## Description du Projet

Ce projet est une application web avancée développée dans le cadre du cours web-avancé de 5A SLA IA. Il utilise un backend en Node.js avec Express et un frontend en React. Le projet est orchestré à l'aide de Docker et Docker Compose pour faciliter le déploiement et la gestion des services. C'est un site web de vente de d'appareils electroniques

## Fonctionnalités Principales

### GRUB (Gestion, Recherche, Update, et Suppression)

Le backend de ce projet implémente un ensemble complet de fonctionnalités GRUB pour gérer les entités de l'application. Le dossiers routes contient les routes vers les différents controllers 
Voici une description détaillée des opérations disponibles :

#### Gestion (Create)

- **Route** : `POST /entity`
- **Description** : Cette route permet de créer une nouvelle entité dans la base de données.
- **Exemple de Requête** :
   ```js
   try{
      const res = await axios.post("http://localhost:5000/products", {
         img:productImgUrl,
         productData
      }, {withCredentials:true})
   }catch(error){
      console.log(error)
   }
   ```

#### Recherche (Read)

- **Route** : `GET /entity`
- **Description** : Cette route permet de récupérer toutes les entités.
- **Exemple de Requête** :

   ```js
   try{
      const res = await axios.get("http://localhost:5000/products", {
         withCredentials:true
      })
    
      setProducts(res.data)
      setFiltredProduct(res.data)
   }catch(error){
            
   }
   ```

- **Route** : `GET /entity/:id`
- **Description** : Cette route permet de récupérer une entité spécifique par son ID.
- **Exemple de Requête** :

   ```javascript
   try{
      const res = await axios.get(`http://localhost:5000/products/${productId}`,
      {
         withCredentials:true
      })

      setProductData(res.data)
   }catch(error){
      console.log(error)
   }
   ```

#### Mise à Jour (Update)

- **Route** : `PUT /api/entity/:id`
- **Description** : Cette route permet de mettre à jour une entité existante.
- **Exemple de Requête** :
   ```js
   try{
      const res = await axios.put(`http://localhost:5000/commandes/${commandeId}`,
      {
            quantity:commandeData.quantity,
            status:commandeData.status
      }, {withCredentials:true})
      setSuccess(res.data.message)
   }catch(error){
      setError({...error, serveur:error.response.data.message})
   }
   ```

#### Suppression (Delete)

- **Route** : `DELETE /api/entity/:id`
- **Description** : Cette route permet de supprimer une entité existante par son ID.
- **Exemple de Requête** :
```js

const delMutation = useMutation(
    async(productId) => {
        const res = await axios.delete(`http://localhost:5000/commandes/${productId}`, {
            withCredentials:true
        })
        setDelSuccess(res.data.message)
    },
    {
        onSuccess:() => {
            queryClient.invalidateQueries(['commandesData'])
        }
        
    }
  )


```

## Structure du Projet

### Backend

Le backend est structuré de la manière suivante :

- **index.js** : Point d'entrée principal du serveur backend.

Le dossier `routes` du backend contient les fichiers de définition des routes pour les différentes entités de l'application. Chaque route est associée à un contrôleur spécifique qui gère la logique métier correspondante.

Le dossier `controllers` du backend contient les fichiers des contrôleurs qui implémentent la logique métier pour chaque entité. Les contrôleurs reçoivent les requêtes des routes, effectuent les opérations nécessaires (comme accéder à la base de données) et renvoient les réponses appropriées.

Voici un aperçu de la structure de ces dossiers backend :

- **backend/routes/**
   - `entityRoutes.js` : Définit les routes pour les opérations GRUB sur les entités.

- **backend/controllers/**
   - `entityController.js` : Implémente la logique métier pour les opérations GRUB sur les entités.

Le dossier `models` contient les définitions des schémas de données pour les entités de l'application. Ces modèles sont utilisés par les contrôleurs pour interagir avec la base de données.

Le dossier `files` contient les fichiers statiques et autres ressources nécessaires pour le fonctionnement de l'application. Cela peut inclure des images, des fichiers de configuration, et d'autres ressources nécessaires.

### Frontend

Le frontend est développé en React et contient les composants nécessaires pour interagir avec le backend.

## Déploiement avec Docker Compose

Le projet utilise Docker Compose pour orchestrer les différents services. Pour lancer le projet, utilisez la commande suivante :

```bash
docker-compose up
```

Cette commande démarre les conteneurs pour le backend, le frontend, et toute autre dépendance nécessaire.

## Conclusion

Ce projet est un exemple complet d'application web avancée utilisant Node.js, Express, React, et Docker. Il met en œuvre des fonctionnalités complètes de gestion des entités via des opérations GRUB et est facilement déployable grâce à Docker Compose.



