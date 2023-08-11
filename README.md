# Configuration

[Source](https://github.com/ayoreis/configuration) • [Registry](https://deno.land/x/configuration) • [API](https://deno.land/x/configuration/mod.ts)

A collection of tools for handling Deno's configuration.

<br/>

> [!NOTE]
> This matches the behaviour in Deno Deploy, for example the configuration file needs to be called either `deno.json` or `deno.jsonc`.

<br/>

```typescript
import {
	getDenoConfiguration,
	getImportMap,
} from 'https://deno.land/x/configuration';

console.log(await getDenoConfiguration());
console.log(await getImportMap());
```

```typescript
import type {
	DenoConfiguration,
	ImportMap,
} from 'https://deno.land/x/configuration';

const denoConfiguration: DenoConfiguration = {};
const importMap: ImportMap = {};
```
