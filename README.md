# Projet Web Avancé

## Description du Projet

# Application Web de Vente d'Appareils Électroniques

Ce projet est une application web avancée réalisée dans le cadre du cours **Web-Avancé** de la 5A SLA IA. L'application est conçue pour faciliter la gestion et la vente d'appareils électroniques. Elle repose sur une architecture moderne avec un backend en **Node.js** (Express) et un frontend en **React**, le tout orchestré à l'aide de **Docker** et **Docker Compose** pour simplifier le déploiement et la gestion des services.

## Fonctionnalités Utilisateur

### Création et Connexion
- Les utilisateurs doivent d'abord créer un compte pour accéder à l'application.
- Une fois connectés, ils disposent d'une session leur permettant d'effectuer plusieurs actions.

### Gestion des Produits
- **Voir les produits** : Accédez à une page listant tous les produits disponibles dans la boutique.

### Panier
- **Ajouter un produit au panier** : Les utilisateurs peuvent ajouter des produits dans leur panier personnel.  
  (Note : Même si le stock est épuisé, les produits peuvent toujours être ajoutés au panier, selon notre business plan.)
- **Gérer le panier** :
  - Supprimer un produit.
  - Modifier la quantité d'un produit.
  - Voir le montant total des achats.

### Commandes
- **Passer une commande** : Depuis la page panier, les utilisateurs peuvent confirmer leurs achats.  
  Une fois une commande effectuée, elle apparaît sur la page **Commandes**.
- **Suivi des commandes** :
  - Les utilisateurs peuvent voir le statut de leurs commandes : *processing*, *delivering*, ou *completed*.
  - Ils peuvent supprimer une commande uniquement si son statut est encore *processing*.

### Déconnexion
- Les utilisateurs peuvent se déconnecter de leur session en cliquant sur le bouton **Se déconnecter** situé en bas à gauche de l'écran.

## Fonctionnalités Administrateur

Tout d'abord pour un admin est cree par defaut si vous lancer avec docker compose. 
   - Login: admin
   - Password: 1234
   - Email: admin@admin.com

Pour se connecter en admin, il faut utiliser la page de login classique. Puis une fois connecter, allez manuellement sur le lien : */adminDashboard*

### Statistiques
- Les administrateurs peuvent consulter les statistiques de leur boutique :
  - Nombre total de produits.
  - Revenu généré.
  - Nombre de ventes.
  - Produits les plus vendus.

### Gestion des Produits
- **Voir tous les produits** : Accéder à la liste complète des produits de la boutique.
- **Ajouter un produit** : Fournir les informations suivantes :
  - Nom du produit.
  - Catégorie.
  - Prix.
  - Stock.
  - Description.
  - Image.
- **Modifier un produit** : Mettre à jour les informations existantes.

### Gestion des Commandes
- **Voir toutes les commandes** : Accéder à la liste des commandes passées par les utilisateurs.
- **Modifier une commande** :
  - Changer la quantité.
  - Mettre à jour le statut (*processing*, *delivering*, *completed*).
- **Supprimer une commande**.

---

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
   - `users.js` : Définit les routes pour les opérations GRUB sur les entités users.

- **backend/controllers/**
   - `users.js` : Implémente la logique métier pour les opérations GRUB sur les entités users.

Le dossier `models` contient les définitions des schémas de données pour les entités de l'application. Ces modèles sont utilisés par les contrôleurs pour interagir avec la base de données.

Le dossier `files` contient les fichiers statiques et autres ressources nécessaires pour le fonctionnement de l'application notamment quand on upload une image d'un produit. Cela peut inclure des images, des fichiers de configuration, et d'autres ressources nécessaires.

### Frontend

Le frontend est développé en React et contient les composants nécessaires pour interagir avec le backend.

## Déploiement avec Docker Compose

Le projet utilise Docker Compose pour orchestrer les différents services. Pour lancer le projet, il faut :
- Ajouter un fichier .env a la racine comme le fichier .env.example
- Avoir docker sur sa machine (Au cas echeant, lancer le projet avec npm directement. Mais il faudra dans ce cas remplir la base de donnee)
- Lancer la commande

```bash
docker-compose up
```

Cette commande démarre les conteneurs pour le backend, le frontend, et toute autre dépendance nécessaire. Souvent il peut y avoir un probleme avec le lancement du backend car le mysql n'est pas encore lance. Dnas ce cas la privilegiez le lancement de mysql a pafrt:
```bash
docker-compose up -d mysql
docker-compose up
```

## Conclusion

Ce projet est un exemple complet d'application web avancée utilisant Node.js, Express, React, et Docker. Il met en œuvre des fonctionnalités complètes de gestion des entités via des opérations GRUB et est facilement déployable grâce à Docker Compose.



