# Todo API

Une API REST pour gérer des todos, construite avec Node.js, Express et SQLite.

---

## 🛠 Stack

- **Runtime** : Node.js 18/20  
- **Framework** : Express.js  
- **Base de données** : SQLite (via sql.js)  
- **Documentation** : Swagger UI (`/docs`)  
- **CI/CD** : GitHub Actions → GHCR → Vercel  

---

## ⚙️ Setup

### Prérequis

- [Node.js](https://nodejs.org/) >= 18  
- [pnpm](https://pnpm.io/) >= 9 (`npm install -g pnpm`)  

### Installation locale

```bash
# 1. Cloner le repo
git clone https://github.com/<ton-org>/<ton-repo>.git
cd <ton-repo>

# 2. Installer les dépendances
pnpm install

# 3. Copier le fichier d'environnement
cp .env.example .env
# Modifier .env si nécessaire

# 4. Lancer le serveur en dev
pnpm dev
## API documentation

Swagger UI is available at:
Le serveur écoute sur http://localhost:3000
La documentation Swagger est disponible sur http://localhost:3000/api-docs

```

---

[![CI](https://github.com/paspigui/todo-api-node/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/paspigui/todo-api-node/actions/workflows/ci.yml)  
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=paspigui_todo-api-node&metric=coverage)](https://sonarcloud.io/summary/new_code?id=paspigui_todo-api-node)
[![Docker Image](https://ghcr.io/paspigui/todo-api-node:latest)](https://github.com/paspigui/todo-api-node/pkgs/container/todo-api-node)
    