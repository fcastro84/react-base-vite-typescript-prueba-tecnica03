## Enunciado

Crea una aplicación para buscar películas

API a usar: - https://www.omdbapi.com/
Consigue la API Key en la propia página web registrando tu email.

Requerimientos:

✔ Necesita mostrar un input para buscar la película y un botón para buscar.

✔ Lista las películas y muestra el título, año y poster.

✔ Que el formulario funcione

✔ Haz que las películas se muestren en un grid responsive.

✔ Hacer el fetching de datos a la API

Primera iteración:

✔ Evitar que se haga la misma búsqueda dos veces seguidas.

✔ Haz que la búsqueda se haga automáticamente al escribir.

- Evita que se haga la búsqueda continuamente al escribir (debounce)


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
