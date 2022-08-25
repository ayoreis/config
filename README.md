# config
A collection of tools for handling configuration in Deno and the browser — the modern runtimes.

## `tryToFindConfig`
Tries to find the Deno configuration file from a list of commonly used names. On failure it returns `undefined`.

```ts
import { tryToFindConfig } from 'https://deno.land/x/config@0.1.0/mod.ts'

console.log(await tryToFindConfig())
```

## `tryToFindImportMap`
Tries to find the import map. In Deno using the `importMap` field from `tryToFindConfig` and in the browser using `document.querySelector('script[type="importmap"]')`. On failure it returns `undefined`.

```ts
import { tryToFindImportMap } from 'https://deno.land/x/config@0.1.0/mod.ts'

console.log(await tryToFindImportMap())
```
## `DenoConfigurationFile`
A TypeScript interface representation of a Deno configuration file. As specified at https://deno.land/x/deno@v1.25.0/cli/schemas/config-file.v1.json?source=

```ts
import { DenoConfigurationFile } from 'https://deno.land/x/config@0.1.0/config-interface.ts'

const config = ... as DenoConfigurationFile
```
## `ImportMap`
A TypeScript interface representation of an [import map](https://github.com/WICG/import-maps).

```ts
import type { ImportMap } from 'https://deno.land/x/config@0.1.0/importmap-interface.ts'

const importMap = ... as ImportMap
```