# Todo API

API REST pour gérer des tâches (todos), construite avec Node.js, Express et SQLite (via `sql.js`).

## Démarrage rapide

```bash
npm install
npm start
```

- API: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api-docs`

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

## Utilisation rapide (curl)

Créer un todo:

```bash
curl -X POST http://localhost:3000/todos \
	-H "Content-Type: application/json" \
	-d '{"title":"Buy milk","description":"2L","status":"pending"}'
```

Lister les todos (pagination):

```bash
curl "http://localhost:3000/todos?skip=0&limit=10"
```

Récupérer un todo:

```bash
curl http://localhost:3000/todos/1
```

Mettre à jour un todo:

```bash
curl -X PUT http://localhost:3000/todos/1 \
	-H "Content-Type: application/json" \
	-d '{"status":"done"}'
```

Supprimer un todo:

```bash
curl -X DELETE http://localhost:3000/todos/1
```

Recherche:

```bash
curl "http://localhost:3000/todos/search/all?q=milk"
```

## Variables d’environnement

Variables supportées actuellement:

- `PORT` (optionnelle): port HTTP du serveur. Valeur par défaut: `3000`

Exemple:

```bash
PORT=4000 npm start
```

## Documentation API (Swagger)

- Swagger UI: `http://localhost:3000/api-docs`

## Endpoints principaux

| Méthode | Endpoint                  | Description                       |
| ------- | ------------------------- | --------------------------------- |
| GET     | `/`                       | Message de bienvenue              |
| GET     | `/health`                 | Vérifie l’état du service         |
| GET     | `/todos`                  | Liste des todos (`skip`, `limit`) |
| POST    | `/todos`                  | Crée un todo                      |
| GET     | `/todos/:id`              | Récupère un todo par id           |
| PUT     | `/todos/:id`              | Met à jour un todo                |
| DELETE  | `/todos/:id`              | Supprime un todo                  |
| GET     | `/todos/search/all?q=...` | Recherche des todos par titre     |

## Modèle de données

### Todo

```json
{
  "id": 1,
  "title": "Buy milk",
  "description": "2L",
  "status": "pending"
}
```

### Erreurs

```json
{
  "detail": "Todo not found"
}
```

## Structure du projet

```text
todo-api-node/
├── app.js
├── server.js
├── swagger.js
├── Dockerfile
├── package.json
├── database/
│   └── database.js
├── routes/
│   └── todo.js
└── tests/
	└── todo.test.js
```

## Docker

Build de l’image:

```bash
docker build -t todo-api-node .
```

Lancement du conteneur:

```bash
docker run --rm -p 3000:3000 todo-api-node
```

Puis ouvrir:

- API: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api-docs`

## Persistance des données

- La base SQLite est stockée dans le fichier local `todo.db`.
- En exécution Docker, les données restent dans le conteneur tant qu’il existe.
- Pour conserver les données entre redémarrages de conteneur, montez un volume vers `/app`.

## Scripts npm

- `npm start` : démarre le serveur
- `npm test` : lance les tests avec coverage
- `npm run lint` : vérifie le code avec ESLint
- `npm run lint:fix` : corrige automatiquement les problèmes ESLint
- `npm run format` : formate le code avec Prettier
- `npm run format:check` : vérifie le formatage

## Qualité & CI

- Les tests sont dans `tests/todo.test.js`.
- Le pipeline CI exécute build, lint, format check, audit sécurité et tests.

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=paspigui_todo-api-node&metric=coverage)](https://sonarcloud.io/summary/new_code?id=paspigui_todo-api-node)
