# Configuration du formatage de code - front-end

Support : **React 18+**, **Vue 3**, **Angular 17+**, **TypeScript 5+**, **Tailwind CSS 4**.

## Prérequis

```bash
npm i -D eslint@^9 prettier@^3 stylelint@^16 prettier-plugin-tailwindcss@0.7.1
```

## Installation

### Dans votre projet

```bash
npm i -D git+https://github.com/Maxime145/linter-config-front.git
```

### Configuration

Ajouter dans le `package.json` du projet ceci :

```json
{
  "scripts": {
    "setup": "install-linter-front"
  }
}
```

Puis lancer la commande :

```bash
npm run setup
```

Cette commande va créer automatiquement les fichiers nécessaires et vous informera dans la console de sa réussite (ou non).\
Elle va également supprimer les fichiers `eslint`, `prettier` et `stylelint` déjà présent.

## Comment l'utiliser ?

Ajoutez dans le `package.json` :

```json
{
  "scripts": {
    "lint": "eslint . --fix",
    "style": "stylelint '**/*.{css,scss,vue}' --fix"
  }
}
```

Note : Il n'y a pas de commande pour prettier car eslint le gère automatiquement (Cela évite les conflits de formatage)

## Format on Save

### VS Code

Le 'formatOnSave' est automatiquement configuré après l'installation.

/!\ Vérifiez et/ou installez tout de même les extensions recommandées =)

### IntelliJ IDEA

Le 'formatOnSave' est automatiquement configuré après l'installation.

## Commandes utiles

```bash
# Pour vérifier les erreurs eslint et corriger la majorité d'entres elles automatiquement
npm run lint

# Pour vérifier les styles de Tailwind, des balises spécifique pour Vue et Angular
npm run style
```
