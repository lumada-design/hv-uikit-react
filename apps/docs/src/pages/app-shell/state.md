# Sharing State

Transient application state should be managed as locally as possible. For example, a modal dialog should be managed by the component that opens it. If the state is needed by multiple components, it should be managed by the closest common ancestor (colloquially called "lifting state up"). If the state is needed by the entire application - or across Views - it should be managed by the root component.

[The state should be stored in a context](https://beta.reactjs.org/learn/passing-data-deeply-with-context). The [`useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext) hook can be used to access the state from any component. It usually provides the state values (for consumption), but can also [provide the state setters (for mutation)](https://beta.reactjs.org/learn/scaling-up-with-reducer-and-context).

Contexts should not be used to store unrelated state. For example, a context that provides the current logged-in planet should not also provide the current theme. Otherwise, the components that use the context for reading the planet will also re-render when the theme changes.

When using the **App Shell**, the root component is not under control of the _Application Bundle_. It is however possible to declare _Providers_ in the **App Shell** configuration file. The **App Shell** will then wrap the root component with those _Providers_.

Example: Create `providers/planet.ts` with the following code:

```typescript
import React, { createContext, useContext, useState } from "react";

export type PlanetContextType = {
  planet: string | null;
  setPlanet: (planet: string | null) => void;
};

export const PlanetContext = createContext<PlanetContextType>({
  planet: null,
  setPlanet: () => {},
});

const PlanetProvider: React.FC = ({ children }) => {
  const [planet, setPlanet] = useState<string | null>(null);

  return (
    <PlanetContext.Provider value={{ planet, setPlanet }}>
      {children}
    </PlanetContext.Provider>
  );
};

export default PlanetProvider;
```

Then, declare the _Provider_ in `app-shell.config.ts`:

```typescript
{
  "providers": [
    {
      "bundle": "@hv-apps/my-app/providers/Planet.js"
    }
  ]
}
```

Now the `PlanetContext` is available to any component in the application, even from other _Application Bundles_.

## Generic development guidelines

- Each _Application Bundle_ ideally should expose just a single _Provider_. If multiple _Providers_ are needed, they can be composed into a single _Provider_.
- This shouldn’t be abused: Context only needed for the rendering of a _View_ shouldn’t be put on a global _Provider_ just because another _View_ needs it. E.g. the i18next provider should continue to be instantiated on every view, using a HOC for example, instead of having a global provider for each _Application Bundle_, each with its own i18next provider always instanced in case it is needed.
- The **App Shell** will instantiate the _Providers_ in the order they are declared in the configuration file. However, dependencies between _Providers_ should be avoided, and never rely on the existence of another _Provider_.

## Global store

Redux is a [state management library](https://redux.js.org) that can be used with React. It offers a single global store that can be used to store application state. The only way to update the state tree is by dispatching an action. The action is handled by a pure reducer function that receives the current state and the action, and returns the new state.

Historically, there has been an overuse of Redux. [Not all apps need Redux](https://redux.js.org/faq/general#when-should-i-use-redux). It is a good fit for applications that have a lot of application-wide state that is shared between components, and that needs to be persisted and synchronized with the server. It might also be useful for applications that have asynchronous actions that need to be coordinated.

The current recommendation is to avoid Redux. But, if needed, it makes sense to be managed by the **App Shell**. If the need arises, the feature will be evaluated and eventually added to the **App Shell**.
