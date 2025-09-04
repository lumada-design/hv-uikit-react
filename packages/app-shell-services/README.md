# @hitachivantara/app-shell-services

Hitachi Vantara App Shell Services. Support package to manage services at the App Shell ecosystem.

## Overview

This package provides service management capabilities including:

- Service registration and resolution
- React hooks for service consumption
- Type-safe service interfaces

## Usage

Below is an example of how one could get all registered services (provided by multiple other packages/plugins in the AppShell ecosystem) for, for example, a header action dropdown menu.

First, and although not mandatory it would be ideal that the types of the services are defined in a separate package, so that both the service providers and consumers can depend on it:

```typescript
// @some-package/my-app-services
// index.ts
export type MyAppCreateHeaderAction = {
  id: string;
  ordinal?: number;
  label: string;
  icon?: ReactNode;
  onAction: () => void;
};

export type UseMyAppCreateHeaderAction = () =>
  | MyAppCreateHeaderAction
  | undefined;

/**
 * Service definitions for my app.
 */
export const MyAppServiceDefinitions = {
  UseMyAppCreateHeaderAction: {
    id: "my-app-header-action-id",
  },
};
```

```typescript
import { FC, useCallback, useMemo } from "react";
import { useServices, SERVICES_ERROR_HANDLING } from "@hitachivantara/app-shell-services";
import { PlusCircleIcon } from "@phosphor-icons/react";
import {
    HvDropDownMenu,
    HvDropDownMenuProps,
    HvIconContainer,
    HvListValue
} from "@hitachivantara/uikit-react-core";
import { MyAppServiceDefinitions, MyAppUseCreateHeaderAction, MyAppCreateHeaderAction } from "@some-package/my-app-services";

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
    actionHooks: UseMyAppCreateHeaderAction[];
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
  } = useServices<UseMyAppCreateHeaderAction>(MyAppServiceDefinitions.UseMyAppCreateHeaderAction.id, { errorHandling: SERVICES_ERROR_HANDLING.REJECT_ON_ANY_FAILURE });

  if (isPending) return <div>Loading services...</div>;
  if (error) return <div>Error loading services: {error.message}</div>;

  // Services are now available to use
  return <CreateHeaderActionComponentInner actionHooks={actionHooks} />;
}
```

## Installation

The App Shell Services is available as an NPM package, and can be installed with:

```bash
npm install @hitachivantara/app-shell-services
```
