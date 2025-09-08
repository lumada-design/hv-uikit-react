# @hitachivantara/app-shell-services

Hitachi Vantara App Shell Services. Support package to manage services at the App Shell ecosystem.

## Overview

This package provides service management capabilities including:

- Service registration and resolution
- React hooks for service consumption
- Type-safe service interfaces

## Usage

Services supports a consumer/provider model where:

- Consumers, like an app owning a header action for example, will consume a given service _contract_ either from the shared-services package from other app or, if also a provider, its own shared-services package. The services are identified by an `id` that, ideally, should be unique while also providing information about the type it expects like `my-app:UseMyAppCreateAction`. This way, the consumers know the type they expect and the providers know what to implement, without collisions in the multi-tenant App Shell ecosystem.
- Providers implement services that match the consumer's contract and register them under the consumer's `id` in its `app-shell.config.ts` file as example below:

```typescript
services: {
    "my-app:UseMyAppCreateAction": [{
        bundle: "my-other-app/create/useCreateNewReportAction.js"
    }],
}
```

Looking at the configuration, it is clear that there is a consumer application (my-app) that expects service-providers to implement the `UseMyAppCreateAction` contract and register them under its `my-app:UseMyAppCreateAction` service definition, keeping the consumer resilient: as long as service-providers adhere to the declared contract the consumer code will not break.

## Example (consumer)

Ideally, the consumer should register the service contract and definition in a package that can be shared between the consumer and the provider, for example:

```typescript
// @some-package/my-app-consumer-services
export type MyAppCreateAction = {
  id: string;
  ordinal?: number;
  label: string;
  icon?: ReactNode;
  onAction: () => void;
};

export type UseMyAppCreateAction = () => MyAppCreateAction | undefined;

/**
 * Service definitions that the consumer 'my app' exposes.
 */
export const MyAppServiceDefinitions = {
  UseMyAppCreateAction: {
    id: "my-app:UseMyAppCreateAction",
  },
};
```

and being the consumer, in the following example, it uses a header action that makes use of the `useServices` hook to get all the successfully loaded services instances of its registered type `MyAppServiceDefinitions.UseMyAppCreateAction.id` so that it renders them on a dropdown menu. This way, as long as any provider implements and registers a service that matches the `UseMyAppCreateAction` contract, it will be automatically picked up and rendered.

```typescript
import { FC, useCallback, useMemo } from "react";
import { useServices } from "@hitachivantara/app-shell-services";
import { PlusCircleIcon } from "@phosphor-icons/react";
import {
    HvDropDownMenu,
    HvDropDownMenuProps,
    HvIconContainer,
    HvListValue
} from "@hitachivantara/uikit-react-core";
import { MyAppServiceDefinitions, MyAppUseCreateAction, MyAppCreateAction } from "@some-package/my-app-provider-services";

type OnDropDownMenuClickCallback = NonNullable<HvDropDownMenuProps["onClick"]>;

function isNonNull<T>(value: T): value is NonNullable<T> {
    return value != null;
}

function createListValue(action: MyAppCreateHeaderAction): HvListValue {
  return {
    id: action.id,
    label: action.label,
    icon: action.icon
  } as HvListValue;
}

const CreateHeaderActionComponentInner: FC<{
    actionHooks: UseMyAppCreateAction[];
}> = ({ actionHooks }) => {
  // Call all hooks directly at the top level as each hook call happens consistently on every render
  const actionResults = actionHooks.map(actionHook => actionHook()).filter(isNonNull);

  // Create menu items
  const dataList = useMemo(() => actionResults.map(createListValue), [actionResults]);

  const onClick = useCallback<OnDropDownMenuClickCallback>(
    (_event, dataListItem) => {
      const action = actionResults.find(action => action.id === dataListItem.id);
      if (action) {
        action.onAction();
      }
    },
    [actionResults]
  );

  // If no valid actions, do not render anything.
  if (dataList.length === 0) {
    return null;
  }

  return (
    <HvDropDownMenu
      icon={
        <HvIconContainer size="sm">
          <PlusCircleIcon />
        </HvIconContainer>
      }
      dataList={dataList}
      keepOpened={false}
      onClick={onClick}
    />
  );
};

function CreateHeaderActionComponent() {
  // For getting multiple services with error handling set to reject on any failure (error on import, type mismatch, etc.)
  const {
    services: actionHooks,
    isPending,
    error
  } = useServices<UseMyAppCreateAction>(MyAppServiceDefinitions.UseMyAppCreateAction.id, { errorHandling: "reject-on-any-failure" });

  if (isPending) return <div>Loading services...</div>;
  if (error) return <div>Error loading services: {error.message}</div>;

  // Services are now available to use
  return <CreateHeaderActionComponentInner actionHooks={actionHooks} />;
}
```

## Example (provider)

A provider implements a hook that matches the consumer's contract:

```typescript
import { useTranslation } from "react-i18next";
import { UseMyAppCreateAction } from "@some-package/my-app-provider-services";

const useCreateNewReportAction: UseMyAppCreateAction = () => {
  const { t } = useTranslation();

  return {
    id: "createNewReport",
    label: t("action.createNewReport.label"),
    onAction: () => {
      console.log("Creating a new report...");
    },
  };
};

export default useCreateNewReportAction;
```

and registers it in its `app-shell.config.ts` file so that the consumer can resolve it at runtime.

```typescript
  //...
  services: {
    "my-app:UseMyAppCreateAction": [
      {
        bundle:
          "my-other-app/create/useCreateNewReportAction.js",
        ranking: 100,
      }
    ],
  },
  //...
```

## Installation

The App Shell Services is available as an NPM package, and can be installed with:

```bash
npm install @hitachivantara/app-shell-services
```
