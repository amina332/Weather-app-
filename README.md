# Weather-app-
A weather application using HTML, CSS, JavaScript and Open-Meteo API
# 🌤️ Weather App — Application météo

## 📌 Présentation du projet

Weather App est une application web qui permet aux utilisateurs de consulter facilement les conditions météorologiques de plusieurs villes.

L'utilisateur peut rechercher une ville pour découvrir sa météo actuelle et les prévisions des prochains jours grâce à une API météo publique.

## 🎯 Objectifs

- Rechercher une ville.
- Afficher la météo actuelle.
- Consulter les prévisions météorologiques des prochains jours.
- Afficher les températures, l'humidité, le vent et les icônes météo.
- Gérer les chargements et les erreurs de manière claire.

## 🛠️ Technologies utilisées

- **HTML5** : structure de la page.
- **JavaScript (Vanilla JS)** : logique et manipulation du DOM.
- **Tailwind CSS** : mise en forme de l'interface.
- **Fetch API** : récupération des données météo.
- **Open-Meteo API** : données météorologiques.
- **LocalStorage** : mémorisation de la dernière ville recherchée.
- **Git & GitHub** : gestion des versions du projet.

## 🌐 API utilisée

Le projet utilise l'API **Open-Meteo**, une API météo publique gratuite qui ne nécessite pas de clé API.

Documentation officielle : https://open-meteo.com/en/docs

### Endpoints utilisés

**1. Geocoding API**

Permet de rechercher une ville et de récupérer ses coordonnées géographiques (latitude et longitude).

```text
https://geocoding-api.open-meteo.com/v1/search?name={ville}
```

**2. Forecast API**

Permet de récupérer les conditions météorologiques actuelles et les prévisions.

```text
https://api.open-meteo.com/v1/forecast
```

Les paramètres utilisés comprennent notamment :
- `latitude` et `longitude` : coordonnées de la ville.
- `current` : données météo actuelles.
- `daily` : prévisions journalières.
- `forecast_days=5` : prévisions sur 5 jours.
- `wind_speed_unit=kmh` : vitesse du vent en km/h.
- `timezone=auto` : fuseau horaire automatique.

### Fonctionnement des données

1. L'utilisateur saisit le nom d'une ville.
2. L'application utilise Geocoding API pour récupérer ses coordonnées.
3. Ces coordonnées sont utilisées pour appeler Forecast API.
4. Les données JSON sont récupérées avec Fetch API.
5. JavaScript affiche les informations dans les cartes météo.

## ⚙️ Fonctionnalités

- Recherche d'une ville.
- Validation du champ de recherche.
- Affichage de la météo actuelle.
- Affichage des prévisions sur 5 jours.
- Icônes et descriptions selon les codes météo.
- Indicateur de chargement.
- Messages d'erreur en cas de problème.
- Mémorisation de la dernière ville recherchée.
- Possibilité de réessayer la recherche.

## 📂 Structure du projet

```text
Weather-App/
│
├── index.html
├── src/
│   ├── style.css
│   ├── output.css
│   └── script.js
│
├── README.md
└── .gitignore
```

## 🚀 Installation et lancement

1. Cloner le dépôt :

```bash
git clone https://github.com/amina332/Weather-app-.git
```

2. Ouvrir le dossier du projet :

```bash
cd Weather-app-
```

3. Installer les dépendances :

```bash
npm install
```

4. Lancer Tailwind CSS :

```bash
npm run dev
```

5. Ouvrir `index.html` avec Live Server.

## 📊 Limites de l'API

- Open-Meteo propose un accès gratuit sans clé API pour un usage non commercial dans les limites de son offre.
- Les données disponibles dépendent des paramètres et des modèles météorologiques proposés.
- Les conditions d'utilisation et les limites d'appels peuvent évoluer.

Documentation : https://open-meteo.com/en/docs

## 🧪 Tests effectués

- Recherche d'une ville valide.
- Recherche avec un champ vide.
- Recherche d'une ville introuvable.
- Vérification de l'affichage de la météo actuelle.
- Vérification des prévisions sur plusieurs jours.
- Vérification de l'indicateur de chargement.
- Vérification des messages d'erreur.
- Vérification de la mémorisation de la dernière ville.

## 👩‍💻 Réalisation

Projet individuel réalisé dans le cadre d'un exercice pédagogique JavaScript.

**Objectif principal :** apprendre à utiliser une API réelle, manipuler les données JSON, utiliser Fetch API et afficher dynamiquement les informations dans le DOM.