# Static assets and API calls

_Application Bundles'_ code will be executing in the context of the **App Shell** entrypoint, which provides no proxy capabilities for backend calls intended for the embedded application's backend, nor is able to serve its static assets.

The `require.meta.url` parameter and the `require.meta.resolve` method can be used to construct URLs relative to the _Application Bundles'_ origin and used for calls loading additional resources, or invoking backend service APIs.

Example:

Instead of something like:

```typescript
const BASE_URL_API = "/api/v1/";
const BASE_URL_ASSETS = "/assets/";
```

Use:

```typescript
const BASE_URL_API = import.meta.resolve("@hv-apps/my-app/api/v1/");
const BASE_URL_ASSETS = import.meta.resolve("@hv-apps/my-app/assets/");
```

## Importing of static assets (CSS, images, etc.)

Vite allows [importing assets as URLs](https://vitejs.dev/guide/assets.html#importing-asset-as-url). However, the resolved public URL will be relative to the **App Shell** entrypoint, not taking into account the microfrontend's architecture and the _Application Bundles'_ origin.

As such, the functionality provided by Vite should not be used. Instead, the `require.meta.resolve` method should be used to construct URLs relative to the _Application Bundles'_ origin, as shown above.

Check [Importing CSS files](./styling.md#importing-css-files) for an alternative to importing CSS files.

## Data-fetching library

The usage of a data-fetching library is highly recommended to avoid the need to write boilerplate code for data fetching and error handling.

For REST APIs, libraries like [SWR](https://swr.vercel.app/) or [React Query](https://react-query.tanstack.com/) are recommended. For GraphQL APIs, [Apollo Client](https://www.apollographql.com/docs/react/) is recommended.
