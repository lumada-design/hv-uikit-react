declare module "module" {
  global {
    /**
     * Augment the `import.meta` object with the `resolve` method.
     */
    interface ImportMeta {
      resolve?(specifier: string, parentURL?: string): string;
    }
  }
}
