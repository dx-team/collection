# <sub><sup><sub><sup>dxLibs</sup></sub></sup></sub> collection <sub><sup><sub><sup><sub><sup>v1.0</sup></sub></sup></sub></sup></sub>

Extensión de clase Array.

Incorpora:
- Eventos asincrónicos

## Scripts
```powershell
npm run eslint
```
```powershell
npm run test-watch
```
```powershell
npm run test
```
```powershell
npm run sonar
```

## Instalación

### Como libreria
```powershell
npm install --save dxlibs-collection
```

## Modo de uso

```javascript
const Collection = require("dxlibs-collection");

const array = new Collection();
array.on('push', (items, length) => {
    console.log(`Items: ${items}`);
    console.log(`Length: ${length}`);
});

const nros = Collection.from([1, 2, 3, 4, 5, 6, 7, 8, 9]);

array.push(...nros);
```
---
