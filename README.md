# Proy-Facultad-Informativa
## Clonar proyecto 
```
git clone https://github.com/MrLexJR/Proy-Facultad-Informativa.git
npm install         
npm run dev
```
Si tienes problemas al iniciar el proyecto con este error:
```
...
[ error ] ./node_modules/next/dist/client/next-dev.js 36:6
Module parse failed: Unexpected token (36:6)
You may need an appropriate loader to handle this file type.
| 
| 
> import('./noop'); // Support EventSource on Internet Explorer 11
| 
| if (!window.EventSource) {
...
```
elimina el package-lock.json y la carpeta node_modules
```
rm -rf package-lock.json
rm -rf node_modules
```
Agrega estas dependencias al package.json:
```
"webpack": "~4.34.0",
"webpack-cli": "3.3.4",
"acorn": "^6.1.1",
```
Y despues instalas las dependecias de nuevo:
```
npm install
```
