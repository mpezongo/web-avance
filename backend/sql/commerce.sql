-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:5006
-- Généré le : dim. 12 jan. 2025 à 16:30
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `commerce`
--

-- --------------------------------------------------------

--
-- Structure de la table `Articles`
--

CREATE TABLE `Articles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `categorie` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Articles`
--

INSERT INTO `Articles` (`id`, `name`, `price`, `stock`, `img`, `desc`, `categorie`, `createdAt`, `updatedAt`) VALUES
(7, 'iPhone 15 Pro', 1300, 50, 'iphone15pro.png', 'Le dernier iPhone avec une puce A17 Pro et un design en titane.', 'Téléphones', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'Samsung Galaxy S23 Ultra', 1200, 40, 'galaxy_s23_ultra.png', 'Smartphone haut de gamme avec un appareil photo 200 MP.', 'Téléphones', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'MacBook Pro 16” (M2 Max)', 3000, 25, 'macbookpro16.png', 'Ordinateur portable puissant pour les professionnels.', 'Ordinateurs', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'Dell XPS 13', 1300, 30, 'dell_xps13.png', 'Ultrabook élégant avec écran InfinityEdge.', 'Ordinateurs', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 'Casque Sony WH-1000XM5', 400, 100, 'sony_wh1000xm5.webp', 'Casque sans fil avec réduction de bruit active.', 'Accessoires', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 'AirPods Pro (2ᵉ génération)', 250, 80, 'airpods_pro.jpg', 'Écouteurs sans fil avec audio spatial et ANC.', 'Accessoires', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 'Google Pixel 8', 800, 60, 'pixel8.jpeg', 'Smartphone Android avec une caméra exceptionnelle.', 'Téléphones', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 'Asus ROG Zephyrus G14', 1700, 20, 'rog_zephyrus_g14.jpg', 'PC portable gaming ultra-performant.', 'Ordinateurs', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 'Clavier mécanique Logitech MX Keys', 130, 70, 'logitech_mx_keys.jpeg', 'Clavier mécanique sans fil pour les professionnels.', 'Accessoires', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 'OnePlus 12', 1000, 35, 'oneplus12.jpg', 'Smartphone rapide avec un écran AMOLED 120Hz.', 'Téléphones', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 'Lenovo ThinkPad X1 Carbon', 1800, 15, 'thinkpad_x1.jpg', 'Ordinateur portable léger et robuste pour les professionnels.', 'Ordinateurs', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'Samsung Galaxy Watch 6', 350, 90, 'galaxy_watch6.jpg', 'Montre connectée élégante et performante.', 'Accessoires', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `CartProducts`
--

CREATE TABLE `CartProducts` (
  `quantity` int(11) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `cartId` int(11) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Carts`
--

CREATE TABLE `Carts` (
  `id` int(11) NOT NULL,
  `status` enum('active','completed') DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Commandes`
--

CREATE TABLE `Commandes` (
  `id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `status` enum('processing','delivering','completed') DEFAULT 'processing',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Favorites`
--

CREATE TABLE `Favorites` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Sessions`
--

CREATE TABLE `Sessions` (
  `id` int(11) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expirationDate` datetime DEFAULT NULL,
  `role` varchar(255) DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Sessions`
--
-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`id`, `username`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(3, 'admin', 'admin@admin.com', '$2b$10$e/8z8o1NFfFSHOyxt9byguuXz6Dpb0R6GHBziZ0K2HRKOehKoUQ2S', 'admin', '2025-01-12 14:55:01', '2025-01-12 14:55:01');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Articles`
--
ALTER TABLE `Articles`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `CartProducts`
--
ALTER TABLE `CartProducts`
  ADD PRIMARY KEY (`cartId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- Index pour la table `Carts`
--
ALTER TABLE `Carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `Commandes`
--
ALTER TABLE `Commandes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- Index pour la table `Favorites`
--
ALTER TABLE `Favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- Index pour la table `Sessions`
--
ALTER TABLE `Sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Articles`
--
ALTER TABLE `Articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `Carts`
--
ALTER TABLE `Carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `Commandes`
--
ALTER TABLE `Commandes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT pour la table `Favorites`
--
ALTER TABLE `Favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Sessions`
--
ALTER TABLE `Sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;