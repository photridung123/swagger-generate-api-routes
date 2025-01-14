# Demo: Generating API Types from Swagger.json

This project is built using a **mono-repo** structure managed with **pnpm**, where all the applications and packages are housed in a single repository. The project utilizes **Axios** for API requests and integrates **swagger-typescript-api** to automatically generate TypeScript types from a Swagger/OpenAPI specification, simplifying API integration and type safety.

---

## Project Structure
```sh
root
|__ apps
        |__ web            # The UI code resides here
|__ packages               
        |__ cli            # CLI package for generating types
        |__ types          # Package containing the generated types
        |__ libs           # Helper libraries (e.g., for API calls)
```

---

## Installing Dependencies from the Root
```bash
npm i -g pnpm 
pnpm i
```

---

## Generating Types with CLI
```bash
cd packages/cli
npm link
pnpm gen:types
```

---

## Starting the Web App
```bash
cd apps/web
pnpm dev
```