# Atlas Venture 🏔️🇲🇦

> *Digitaliser et transformer l'expérience de voyage écotouristique dans la province d'Azilal (M'goun, Ait Bougmez, Cascades d'Ouzoud).*

## 📌 À propos du projet

**Atlas Venture** est une plateforme web innovante conçue pour connecter les passionnés de montagne avec des guides locaux certifiés, proposer des itinéraires de randonnée interactifs (avec fichiers GPX) et gérer un service professionnel de location de matériel de haute altitude.

### Les 3 Piliers Majeurs :

1. **La mise en relation humaine :** Annuaire de guides locaux certifiés par l'État (filtrables par langue, spécialité et avis).

2. **La personnalisation des parcours :** Itinéraires interactifs, niveaux de difficulté et points d'intérêt.

3. **La logistique matérielle :** Réservation et location de matériel de haute montagne (tentes 4 saisons, cordes, etc.).

## 🛠️ Stack Technologique

Le projet repose sur une architecture moderne de type **SPA (Single Page Application)** couplée à une API RESTful robuste :

* **Frontend :**

  * React.js (Vite)

  * Tailwind CSS (Design System & UI)

  * React Router & Axios (Gestion des routes et requêtes API)

  * Leaflet / Mapbox (Cartographie interactive et fichiers GPX)

* **Backend :**

  * Laravel (PHP Framework)

  * Laravel Sanctum (Authentification sécurisée par API tokens / SPA)

  * Spatie Laravel Permission (Gestion des rôles : Voyageur, Guide, Prestataire, Administrateur)

* **Base de Données :**

  * MySQL

## 📂 Architecture du Projet

```
atlas-venture/
├── backend/ (Laravel API)
│   ├── app/
│   │   ├── Http/Controllers/
│   │   ├── Models/
│   │   └── ...
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/
│       └── api.php
│
└── frontend/ (React Client)
    ├── src/
    │   ├── components/
    │   ├── Guide/
    │
    │   └── App.jsx
    └── package.json

```

## 🚀 Guide d'Installation et de Démarrage

### Prérequis

* PHP >= 8.2 & Composer

* Node.js & npm

* MySQL

### 1. Configuration du Backend (Laravel)

```
cd backend
composer install
cp .env.example .env
php artisan key:generate

```

*Configurez vos accès base de données MySQL dans le fichier `.env` :*

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=atlasVenture
DB_USERNAME=root
DB_PASSWORD=

```

```


```

*(L'API tourne par défaut sur `http://localhost:8000`)*

### 2. Configuration du Frontend (React)

Ouvrez un nouveau terminal :

```
cd frontend
npm install
npm run dev

```

*(L'application React tourne par défaut sur `http://localhost:5173`)*

## 🔐 Spécifications Fonctionnelles (Epics & US)

* **EPIC 1 : Gestion des Comptes et Profils**

  * `US 1.1` : Inscription et Connexion sécurisée par email (Sanctum).

  * `US 1.2` : Profil Guide Certifié (Validation des diplômes et badges officiels).

* **EPIC 2 : Recherche & Réservation de Guides**

  * `US 2.1` : Réservation de dates et paiement d'un acompte sécurisé (intégration passerelle CMI, virement ou espèces sur place).

## 📄 Licence

Ce projet est développé dans le cadre de la valorisation du tourisme durable et solidaire à Azilal.