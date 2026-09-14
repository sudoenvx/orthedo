# @orthedo/tsconfig

Shared TypeScript configurations for the Orthedo monorepo.

## Available Configurations

- **`@orthedo/tsconfig/base.json`**: Strict baseline TypeScript configuration.
- **`@orthedo/tsconfig/vite.json`**: For client-side React + Vite applications.
- **`@orthedo/tsconfig/vite-node.json`**: For Vite configuration and Node-based tool scripts in Vite apps.
- **`@orthedo/tsconfig/node.json`**: For backend Node.js and Bun services.
- **`@orthedo/tsconfig/library.json`**: For shared TypeScript libraries generating declaration files.
- **`@orthedo/tsconfig/react-library.json`**: For shared React component libraries.

## Usage

In your application or package's `package.json`, add:

```json
{
  "devDependencies": {
    "@orthedo/tsconfig": "workspace:*"
  }
}
```

Then extend the relevant config in your `tsconfig.json`:

```json
{
  "extends": "@orthedo/tsconfig/vite.json",
  "include": ["src"]
}
```
