/** A TypeScript interface representation of an [import map](https://github.com/WICG/import-maps). */
export interface ImportMap {
    imports: Record<string, string>
    scopes: Record<string, Record<string, string>>
}