# Todo API

API REST pour gérer des tâches (todos), construite avec Node.js, Express et SQLite (via `sql.js`).

## Fonctionnalités

- CRUD complet sur les todos
- Recherche par titre (`/todos/search/all?q=...`)
- Pagination simple (`skip`, `limit`)
- Endpoint de santé (`/health`)
- Documentation Swagger UI

## Stack technique

- Runtime: Node.js
- Framework: Express
- Base de données: SQLite (`sql.js`, fichier local `todo.db`)
- Tests: Jest + Supertest
- Qualité: ESLint + Prettier

## Installation locale

Prérequis:

- Node.js 18+
- npm

Commandes:

```bash
npm install
npm start
```

Serveur local: `http://localhost:3000`

## Variables d’environnement

Variables supportées actuellement:

- `PORT` (optionnelle): port HTTP du serveur. Valeur par défaut: `3000`

Exemple:

```bash
PORT=4000 npm start
```

## Todo API

API REST minimale pour gérer des tâches (todos), construite avec Node.js et Express. Le projet contient :

- un serveur Express exposant des endpoints CRUD pour `todos`
- de la documentation Swagger (fichier `swagger.yml` / Swagger UI)
- des tests unitaires avec Jest et un rapport de couverture (coverage)
- un Dockerfile pour construire l'image

Ce README explique comment démarrer, tester et lire la documentation.

## Prérequis

- Node.js 18+ et npm
- Docker (optionnel, pour exécuter en conteneur)

## Installation

Cloner le dépôt puis installer les dépendances :

```bash
git clone https://github.com/paspigui/todo-api-node.git
cd todo-api-node
npm ci
```

## Exécution en local

Lancer le serveur en développement :

```bash
npm start
```

Par défaut le serveur écoute sur le port `3000`. Pour changer le port :

```bash
PORT=4000 npm start
```

Accès utiles :

- API : http://localhost:3000
- Swagger UI : http://localhost:3000/api-docs

## Tests et couverture

Les tests sont écrits avec Jest. Pour lancer les tests et générer le rapport de couverture :

```bash
npm test
```

Après exécution, le rapport LCOV se trouve dans `coverage/lcov.info` et le rapport HTML dans `coverage/lcov-report/index.html`.

Si vous utilisez SonarCloud dans CI, le scanner cherche `coverage/lcov.info` (cf. `sonar-project.properties`). Assurez-vous que le fichier est présent dans le workspace du job qui lance l'analyse (voir `.github/workflows/ci-reusable.yml`).

## Docker

Construire l'image Docker :

```bash
docker build -t todo-api-node .
```

Lancer le conteneur :

```bash
docker run --rm -p 3000:3000 todo-api-node
```

## Endpoints principaux

Liste rapide des endpoints exposés :

- GET / — message racine
- GET /health — état du service
- GET /todos — liste des todos (query: `skip`, `limit`)
- POST /todos — crée un todo
- GET /todos/:id — récupère un todo par id
- PUT /todos/:id — met à jour un todo
- DELETE /todos/:id — supprime un todo
- GET /todos/search/all?q=... — recherche par titre

Consulte `routes/todo.js` pour la logique exacte et les paramètres acceptés.

## Documentation OpenAPI / Swagger

Le spec est disponible dans `swagger.yml` à la racine du projet. Pour voir la documentation localement :

- Démarrer le serveur (`npm start`) puis ouvrir `http://localhost:3000/api-docs` (Swagger UI est exposé par le serveur).

Si tu souhaites convertir le spec Swagger 2.0 vers OpenAPI 3.x, utilise par exemple :

```bash
npx swagger2openapi --yaml swagger.yml -o openapi.yaml
```

## CI / Qualité

- Lint: `npm run lint` (ESLint)
- Format: `npm run format` / `npm run format:check` (Prettier)
- Tests & coverage: `npm test`

Le workflow GitHub Actions `/.github/workflows/ci-reusable.yml` : build, tests (matrice Node 18/20), upload des artefacts de coverage puis SonarCloud. Si SonarCloud ne reçoit pas la couverture, vérifie que l'étape Sonar télécharge bien l'artefact `coverage` (voir conseils dans les issues CI du repo).

## Structure du projet (extrait)

```
todo-api-node/
├─ app.js                # configuration Express, Swagger UI
├─ server.js             # point d'entrée
├─ swagger.yml           # spec OpenAPI/Swagger
├─ Dockerfile
├─ package.json
├─ database/
│  └─ database.js        # accès SQLite (sql.js)
├─ routes/
│  └─ todo.js            # endpoints CRUD
└─ tests/
   └─ todo.test.js       # tests Jest/Supertest
```

## Contribution

Ouvert aux PRs : fork, branche feature, tests, lint et PR. Respecte le style (Prettier/ESLint) et ajoute des tests pour les nouvelles fonctionnalités.
