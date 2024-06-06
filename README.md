### This repo intends to demonstrate the CRUD operations in Postgresql.

#### 1. So far to set up the typescript and node package manager, we've to run following commands :

```bash
npm init -y #to create package.json file
npx tsc --init #to initialize typescript into the project
```

#### 2. Then modify the `tsconfig.json` accordingly.

1. I've chosen the `module` to be `NodeNext` (for better compatibility with ES6 Node.js projects) and module resolution to be `NodeNext` as well. Make sure when the `module` is set to `NodeNext`, you specify the `type` to `module` in the `package.json` file.

2. To create such a tsconfig.json, just ask ChatGPT to create a `recommended` tsconfig.json for real world projects and it'll do so. Make sure that you `include` and `exclude` folders properly.

3. The `rootDir` is set to `src` and `outDir` to `dist`. Declarations could to be turned on or off based on the needs of the project.

4. Some special syntactical needs might arise based on the type of module selection, as in our case the `pg` library doesn't provide the named export of the `Client` object so we had to use the following technique :

```ts
import pg from "pg";
const { Client } = pg;
```

That gave access to the Client object of the `pg` library. In such cases, setting `module` to `commonjs`to `moduleResolution` to `node` might help or such syntactical tid-bits need to be used. The errors and its resolution would be given by the console itself in most of the cases, like this one.
