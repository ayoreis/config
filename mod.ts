import type { DenoConfigurationFile } from './config-interface.ts'
import type { ImportMap } from './importmap-interface.ts'

const isDeno = navigator.userAgent === `Deno/${ Deno?.version?.deno }`
const isBrowser = !!globalThis.document

/** Tries to find the Deno configuration file from a list of commonly used names. On failure it returns `undefined`. */
export async function tryToFindConfig() {
    const posibleFiles = [
        'deno.json',
        'deno.jsonc',
        'tsconfig.json',
        'tsconfig.jsonc',
        'jsconfig.json',
        'jsconfig.jsonc',
    ]

    for (const posibleFile of posibleFiles) {
        try {
            return {
                filepath: posibleFile,
                content: JSON.parse(await Deno.readTextFile(posibleFile)) as DenoConfigurationFile,
            }
        } catch (error) {
            if (error instanceof Deno.errors.NotFound) continue
            throw error
        }
    }
}

/** Tries to find the import map. In Deno using the `importMap` field from `tryToFindConfig` and in the browser using `document.querySelector('script[type="importmap"]')`. On failure it returns `undefined`. */
export async function tryToFindImportMap() {
    if (isDeno) {
        const importMapPath = (await tryToFindConfig())?.content?.importMap

        return !importMapPath ? undefined : {
            filename: importMapPath,
            content: JSON.parse(await Deno.readTextFile(importMapPath)) as ImportMap,
        }
    } else if (isBrowser) {
        try {
            return {
                filename: undefined,
                content: JSON.parse(
                    (document.querySelector('script[type="importmap"]') as HTMLScriptElement)
                    ?.innerText
                ) as ImportMap,
            }
        } catch {}
    }
}

export type { DenoConfigurationFile, ImportMap }