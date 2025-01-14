# Projet Web Avancé – Application de Vente d'Appareils Électroniques

## **Introduction**
Ce projet s'inscrit dans le cadre du cours **Web Avancé** en 5ᵉ année SLA IA. Il s'agit d'une application web moderne dédiée à la gestion et à la vente d'appareils électroniques. Développée à l'aide des technologies actuelles, cette solution repose sur un backend performant en **Node.js** (Express), un frontend réactif en **React**, et une infrastructure conteneurisée via **Docker** et **Docker Compose** pour simplifier le déploiement.

L'objectif principal est de proposer une expérience utilisateur fluide tout en offrant des fonctionnalités d'administration avancées.

---

## **Diagramme de Classes**

[![](https://mermaid.ink/img/pako:eNqVVMtu2zAQ_BVhj4ViSE7i2Dr0krQ3FwWCoA_osiUZmbBEqiTV2hX8712JlGqrdoLwxJ2ZfXCXZAtMcwEZsBKtfZBYGKxyFdF6ssJEOaQ5RFdX72mXzGadcY_GeUW3-2w0b5izxL8blW-QBeKVlLqqUHHhVcHldeFH_KWNdOIffyHvS8KuJq96FNZKrS6LvKzvZI-0HiBPZ6QqooYwhZWYwKJCWU6wmmL81oYP8IdPT-vI6DL4Ho5Thbqm2ZzejpkekA4ndrU06EjamRP1hdihTdPYx6fguvlRiqg2ko2YVC6yTrPtxE9WxQThwrIJxKi6guZxrp5hUu3Q7RN2GH97XMfPBpWTbn_SSuvQNfZciKPL-kKY_3xG7bkEEEMlDI2Z00vrlTm4jaAeQkZbjmabQ-zxPmSHh4g50LVZ4-6L5G7T4c9YWhEPpK2RUdM6YpnEvoCB4_45r9EUUn3tJLckOct-82xP0tm6irFx-nGvGGQ-IxjdFJvRampOcwo_xojWqL5rfWJD1sIOsvltOru5S1fL67vFYnmTzpcx7CFLDjH86T2S2Sqs-SJNVqv0OgbBpdNmHb4orZ5lAYe_C5lpZg?type=png)](https://mermaid-js.github.io/mermaid-live-editor//edit#pako:eNqVVMtu2zAQ_BVhj4ViSE7i2Dr0krQ3FwWCoA_osiUZmbBEqiTV2hX8712JlGqrdoLwxJ2ZfXCXZAtMcwEZsBKtfZBYGKxyFdF6ssJEOaQ5RFdX72mXzGadcY_GeUW3-2w0b5izxL8blW-QBeKVlLqqUHHhVcHldeFH_KWNdOIffyHvS8KuJq96FNZKrS6LvKzvZI-0HiBPZ6QqooYwhZWYwKJCWU6wmmL81oYP8IdPT-vI6DL4Ho5Thbqm2ZzejpkekA4ndrU06EjamRP1hdihTdPYx6fguvlRiqg2ko2YVC6yTrPtxE9WxQThwrIJxKi6guZxrp5hUu3Q7RN2GH97XMfPBpWTbn_SSuvQNfZciKPL-kKY_3xG7bkEEEMlDI2Z00vrlTm4jaAeQkZbjmabQ-zxPmSHh4g50LVZ4-6L5G7T4c9YWhEPpK2RUdM6YpnEvoCB4_45r9EUUn3tJLckOct-82xP0tm6irFx-nGvGGQ-IxjdFJvRampOcwo_xojWqL5rfWJD1sIOsvltOru5S1fL67vFYnmTzpcx7CFLDjH86T2S2Sqs-SJNVqv0OgbBpdNmHb4orZ5lAYe_C5lpZg)

---

## **Fonctionnalités Utilisateur**

### **Inscription et Connexion**
- Les utilisateurs doivent créer un compte pour accéder à l'application.
- Une fois connectés, ils bénéficient d'une session sécurisée pour naviguer et interagir avec les fonctionnalités.

### **Gestion des Produits**
- **Visualisation des produits** : Accédez à une page listant tous les produits disponibles avec leurs détails (nom, prix, description, etc.).

### **Gestion du Panier**
- **Ajout de produits** : Les utilisateurs peuvent ajouter des produits au panier, même en cas de rupture de stock (selon le modèle commercial).
- **Modification du panier** :
  - Supprimer des articles.
  - Modifier les quantités.
  - Visualiser le montant total des achats en temps réel.

### **Gestion des Commandes**
- **Passer une commande** : Validez vos achats directement depuis le panier.
- **Suivi des commandes** : Consultez l’état des commandes avec les statuts : *processing*, *delivering*, ou *completed*.
- **Annulation de commande** : Supprimez une commande si son statut est encore *processing*.

### **Déconnexion**
- Les utilisateurs peuvent se déconnecter de manière sécurisée via un bouton dédié accessible depuis le tableau de bord.

---

## **Fonctionnalités Administrateur**

### **Connexion Administrateur**
Un administrateur par défaut est créé lors du déploiement via Docker Compose :
- **Login** : `admin`
- **Mot de passe** : `1234`
- **Email** : `admin@admin.com`

Pour accéder au tableau de bord administrateur, connectez-vous depuis la page de login utilisateur et rendez-vous sur le chemin : `/adminDashboard`.

### **Tableau de Bord Administrateur**

1. **Statistiques**
   - Visualisez des indicateurs clés comme :
     - Nombre total de produits.
     - Revenus générés.
     - Nombre de ventes.
     - Produits les plus vendus.

2. **Gestion des Produits**
   - Ajouter un produit avec les informations suivantes :
     - Nom, catégorie, prix, stock, description, et image.
   - Modifier les détails d’un produit existant.
   - Supprimer des produits.

3. **Gestion des Commandes**
   - Consulter toutes les commandes passées.
   - Modifier les quantités ou le statut des commandes (*processing*, *delivering*, *completed*).
   - Supprimer une commande.

---

## **Backend – API et Fonctionnalités**

Le backend implémente des fonctionnalités complètes de gestion des entités via des opérations CRUD (Create, Read, Update, Delete). Les routes et contrôleurs sont organisés pour assurer une séparation claire entre la logique métier et l’accès aux données.

### **Exemples d’API**

- **Créer une entité**
  - **Route** : `POST /entity`
  - Exemple :
    ```javascript
    const res = await axios.post("http://localhost:5000/products", {
      img: productImgUrl,
      productData,
    });
    ```

- **Lire une entité**
  - **Route** : `GET /entity` (toutes les entités) ou `GET /entity/:id` (par ID)
  - Exemple :
    ```javascript
    const res = await axios.get(`http://localhost:5000/products/${productId}`);
    setProductData(res.data);
    ```

- **Mettre à jour une entité**
  - **Route** : `PUT /entity/:id`
  - Exemple :
    ```javascript
    const res = await axios.put(`http://localhost:5000/commandes/${commandeId}`, {
      quantity: commandeData.quantity,
      status: commandeData.status,
    });
    ```

- **Supprimer une entité**
  - **Route** : `DELETE /entity/:id`
  - Exemple :
    ```javascript
    const res = await axios.delete(`http://localhost:5000/commandes/${commandeId}`);
    ```

---

## **Frontend – Interface Utilisateur**

Le frontend est développé en **React** avec une navigation fluide et des composants modulaires. Les fonctionnalités clés incluent :
- Gestion des états avec **React Query** pour synchroniser les données.
- Intégration des API backend pour les interactions (authentification, gestion des produits, commandes, etc.).

---

## **Déploiement avec Docker Compose**

Le projet utilise **Docker Compose** pour simplifier le déploiement des services (backend, frontend, base de données).

### **Étapes de Déploiement**
1. Créez un fichier `.env` basé sur l’exemple fourni (`.env.example`).
2. Assurez-vous d’avoir Docker installé sur votre machine.
3. Lancez les conteneurs avec :
   ```bash
   docker-compose up
   ```

Si le backend rencontre un problème dû au démarrage de MySQL, lancez-le séparément :
   ```bash
   docker-compose up -d mysql
   docker-compose up
   ```

## **Conclusion**
Ce projet représente une application web avancée, combinant des technologies modernes pour une expérience utilisateur optimisée. Avec son architecture robuste et ses fonctionnalités complètes, il constitue une excellente vitrine des compétences en développement web et en déploiement d’applications conteneurisées.