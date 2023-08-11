import { assertEquals } from 'https://deno.land/std@0.198.0/assert/mod.ts';

import {
	DenoConfiguration,
	getDenoConfiguration,
	getImportMap,
	ImportMap,
} from './mod.ts';

const realFilepath = 'deno.json';
const temporaryFilepath = 'temporay-deno.json';
const configFilepath = 'deno.json';
const importMapFilepath = 'import-map.json';

Deno.test('getDenoConfiguration', async () => {
	const configuration: DenoConfiguration = {
		tasks: { greet: 'echo \'Hello world!\'' },
	} as const;

	await Deno.rename(realFilepath, temporaryFilepath);
	await Deno.writeTextFile(configFilepath, JSON.stringify(configuration));

	assertEquals(await getDenoConfiguration(), configuration);

	await Deno.remove(configFilepath);
	await Deno.rename(temporaryFilepath, realFilepath);
});

Deno.test('getImportMap (field)', async () => {
	const configuration: DenoConfiguration = {
		imports: { hello: 'world' },
	} as const;

	const importMapWritePromise = Deno.writeTextFile(
		importMapFilepath,
		JSON.stringify({}),
	);

	await Deno.rename(realFilepath, temporaryFilepath);

	await Promise.all([
		importMapWritePromise,
		Deno.writeTextFile(
			configFilepath,
			JSON.stringify(configuration),
		),
	]);

	assertEquals(
		await getImportMap(),
		// NOTE Comparing directly because it only contains fields also in `ImportMap`.
		configuration,
	);

	const importMapRemovePromise = Deno.remove(importMapFilepath);

	await Deno.remove(configFilepath);

	await Promise.all([
		importMapRemovePromise,
		Deno.rename(temporaryFilepath, realFilepath),
	]);
});

Deno.test('getImportMap (file)', async () => {
	const configuration: DenoConfiguration = {
		importMap: 'import-map.json',
	} as const;

	const importMap: ImportMap = { imports: { hello: 'world' } } as const;

	const importMapWritePromise = Deno.writeTextFile(
		importMapFilepath,
		JSON.stringify(importMap),
	);

	await Deno.rename(realFilepath, temporaryFilepath);

	await Promise.all([
		importMapWritePromise,
		Deno.writeTextFile(
			configFilepath,
			JSON.stringify(configuration),
		),
	]);

	assertEquals(
		await getImportMap(),
		importMap,
	);

	const importMapRemovePromise = Deno.remove(importMapFilepath);

	await Deno.remove(configFilepath);

	await Promise.all([
		importMapRemovePromise,
		Deno.rename(temporaryFilepath, realFilepath),
	]);
});
