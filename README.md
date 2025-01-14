# Demo: Generating API Types from Swagger.json

This project follows a **mono-repo** structure managed by **pnpm**. It uses **Axios** for API calls and **swagger-typescript-api** to auto-generate TypeScript types from Swagger specifications.

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