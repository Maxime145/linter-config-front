# Linter front multi techno

Supports vérifiés : `React >17 à <=19`, `Vue 3`, `Angular >16 à <=20`, `TypeScript 5`, `Tailwind CSS 4`.

## Prérequis

Dans le projet où vous souhaitez intégrer le linter, vous devrez installer ces librairies :

```bash
# Pour faire fonctionner le linter du code ts
npm i -D eslint@9.39.1 prettier@3.6.2 prettier-plugin-tailwindcss@0.7.1

# Pour faire fonctionner le linter du css/tailwind
npm i -D stylelint@16.25.0 stylelint-config-standard@39.0.1 stylelint-order@7.0.0
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

Puis lancer la commande !

```bash
npm run setup
```

Cette commande va supprimer les fichiers `eslint`, `prettier` et `stylelint` déjà présent.\
Puis créera automatiquement les fichiers nécessaires et vous informera dans la console de sa réussite (ou non).

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

Le `formatOnSave` est automatiquement configuré après l'installation.

> Petite subtilité pour vscode, si cela ne fonctionne pas, veuillez vous assurer que les extensions recommandées soient installées

## Commandes utiles

```bash
# Pour vérifier les erreurs eslint et corriger la majorité d'entres elles automatiquement
npm run lint

# Pour vérifier les styles de Tailwind, des balises spécifique pour Vue et Angular
npm run style
```
