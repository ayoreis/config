import type { DenoConfiguration } from './deno-configuration.ts';
import type { ImportMap } from './import-map.ts';

const denoConfigurationFilenames = [
	'deno.json',
	'deno.jsonc',
] as const;

/**
 * Gets the Deno configuration
 */
export async function getDenoConfiguration() {
	for (const filename of denoConfigurationFilenames) {
		try {
			return JSON.parse(
				await Deno.readTextFile(filename),
			) as DenoConfiguration;
		} catch (error) {
			if (error instanceof Deno.errors.NotFound) continue;

			throw error;
		}
	}

	return null;
}

/**
 * Gets the import map.
 *
 * ---
 *
 * To parse the import map you can use https://github.com/timreichen/importmap (JavaScript) or https://github.com/denoland/import_map (WebAssembly Rust).
 */
export async function getImportMap(): Promise<ImportMap | null> {
	const { imports, scopes, importMap } = await getDenoConfiguration() ?? {};

	if (imports || scopes) {
		return {
			...(imports ? { imports } : {}),
			...(scopes ? { scopes } : {}),
		};
	}

	if (importMap) {
		return JSON.parse(
			await Deno.readTextFile(importMap),
		) as ImportMap;
	}

	return null;
}

export type { DenoConfiguration, ImportMap };
