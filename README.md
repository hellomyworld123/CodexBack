diff --git a/README.md b/README.md
index 5093e510ca37a0d749c0e3ec80048b549f3432f6..c819934df816362ec3657e1dd44b4315b987a2b8 100644
--- a/README.md
+++ b/README.md
@@ -1,63 +1,72 @@
 # Sahar Nails – Backend (Node.js/Express)
 
-Backend API pour Sahar Nail Care, basé sur Node.js, Express, MongoDB, déployé sur Render.
+Backend API pour Sahar Nail Care, basé sur Node.js, Express et MongoDB. Le projet est prêt pour un déploiement sur Render ou Vercel.
 
 ## Résumé du projet
-- API REST pour la gestion des réservations, utilisateurs, services
-- Authentification JWT, gestion des emails (SendGrid)
-- CI/CD automatisé (GitHub Actions, Render)
-- Sécurité (Helmet, CORS), logs (Morgan)
+- API REST pour gérer les réservations et les utilisateurs
+- Authentification JWT et envoi d'emails (SendGrid)
+- CI/CD avec GitHub Actions et Render
+- Sécurité via Helmet et CORS, logs avec Morgan
 
 ## Installation locale
-
 ```bash
-# 1. Cloner le repo
+# 1. Cloner le dépôt
  git clone https://github.com/iseuuh/sahar-backend-prod.git
  cd sahar-backend-prod
 
 # 2. Installer les dépendances
  npm install
 
-# 3. Créer le fichier .env
+# 3. Préparer les variables d'environnement
  cp .env.example .env
 
-# 4. Lancer le serveur de dev
+# 4. Lancer le serveur de développement
  npm run dev
 ```
+Si `npm run dev` échoue (par exemple nodemon manquant), vous pouvez lancer directement :
+```bash
+node server.js
+```
+
+## Lancer les tests
+```bash
+npm test
+```
 
 ## Déploiement cloud
-- **Render** : push sur `master` déclenche le build et le déploiement automatique
-- Configurer les variables d’environnement dans Render Dashboard
+- **Render** : un push sur `master` déclenche automatiquement le build et le déploiement
+- Configurer les variables d'environnement dans le dashboard Render
 
-## Variables d’environnement
+## Variables d'environnement
 - `MONGO_URI` : URL de connexion MongoDB Atlas
-- `JWT_SECRET` : Clé secrète JWT
-- `SENDGRID_API_KEY` : Clé API SendGrid
-- `SENDGRID_FROM_EMAIL` : Email expéditeur par défaut
-- `PORT` : Port d’écoute (défaut 5000)
+- `JWT_SECRET` : clé secrète JWT
+- `SENDGRID_API_KEY` : clé API SendGrid
+- `SENDGRID_FROM_EMAIL` : email expéditeur par défaut
+- `CORS_ORIGIN` : origine autorisée pour CORS
+- `PORT` : port d'écoute du serveur (défaut `5000`)
 
 ## Structure des dossiers
 ```
 backend/
 ├── controllers/     # Logique métier (réservations, auth, ...)
 ├── models/          # Schémas Mongoose
 ├── routes/          # Définition des routes API
 ├── middleware/      # Middlewares Express
-├── scripts/         # Scripts utilitaires (ex: createAdmin)
+├── scripts/         # Scripts utilitaires
 ├── tests/           # Tests unitaires (Jest)
-├── server.js        # Point d’entrée principal
-├── render.yaml      # Config Render
+├── server.js        # Point d'entrée principal
+├── render.yaml      # Configuration Render
 └── ...
 ```
 
 ## TODO / besoins métiers
 - [ ] Ajouter la gestion multi-tenant
 - [ ] Intégrer Stripe pour le paiement
-- [ ] Ajout d’un dashboard admin avancé
+- [ ] Ajout d'un dashboard admin avancé
 - [ ] Monitoring/alerting (Sentry, LogRocket...)
-- [ ] RGPD et logs d’accès
+- [ ] RGPD et logs d'accès
 - [ ] Améliorer la documentation API (Swagger, Postman)
 
 ---
 
-Pour toute question ou contribution, ouvrez une issue ou contactez l’équipe Sahar Nails. 
+Pour toute question ou contribution, ouvrez une issue ou contactez l'équipe Sahar Nails.
