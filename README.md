# Sahar Nails – Backend (Node.js/Express)

Backend API pour Sahar Nail Care, basé sur Node.js, Express, MongoDB, déployé sur Render.

## Résumé du projet
- API REST pour la gestion des réservations, utilisateurs, services
- Authentification JWT, gestion des emails (SendGrid)
- CI/CD automatisé (GitHub Actions, Render)
- Sécurité (Helmet, CORS), logs (Morgan)

## Installation locale

```bash
# 1. Cloner le repo
 git clone https://github.com/iseuuh/sahar-backend-prod.git
 cd sahar-backend-prod

# 2. Installer les dépendances
 npm install

# 3. Créer le fichier .env
 cp .env.example .env

# 4. Lancer le serveur de dev
 npm run dev
```

## Déploiement cloud
- **Render** : push sur `master` déclenche le build et le déploiement automatique
- Configurer les variables d’environnement dans Render Dashboard

## Variables d’environnement
- `MONGO_URI` : URL de connexion MongoDB Atlas
- `JWT_SECRET` : Clé secrète JWT
- `SENDGRID_API_KEY` : Clé API SendGrid
- `SENDGRID_FROM_EMAIL` : Email expéditeur par défaut
- `PORT` : Port d’écoute (défaut 5000)

## Structure des dossiers
```
backend/
├── controllers/     # Logique métier (réservations, auth, ...)
├── models/          # Schémas Mongoose
├── routes/          # Définition des routes API
├── middleware/      # Middlewares Express
├── scripts/         # Scripts utilitaires (ex: createAdmin)
├── tests/           # Tests unitaires (Jest)
├── server.js        # Point d’entrée principal
├── render.yaml      # Config Render
└── ...
```

## TODO / besoins métiers
- [ ] Ajouter la gestion multi-tenant
- [ ] Intégrer Stripe pour le paiement
- [ ] Ajout d’un dashboard admin avancé
- [ ] Monitoring/alerting (Sentry, LogRocket...)
- [ ] RGPD et logs d’accès
- [ ] Améliorer la documentation API (Swagger, Postman)

---

Pour toute question ou contribution, ouvrez une issue ou contactez l’équipe Sahar Nails. 