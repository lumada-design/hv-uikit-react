import { FC, useCallback, useMemo } from "react";
import { PlusCircleIcon } from "@phosphor-icons/react/PlusCircle";
import { useServices } from "@hitachivantara/app-shell-services";
import {
  HvDropDownMenu,
  HvDropDownMenuProps,
  HvIconContainer,
  HvListValue,
} from "@hitachivantara/uikit-react-core";

import { ServiceDefinitions } from "../serviceDefinition";
import { CreateNewContentAction, UseCreateNewContentAction } from "../types";

type OnDropDownMenuClickCallback = NonNullable<HvDropDownMenuProps["onClick"]>;

function isNonNull<T>(value: T): value is NonNullable<T> {
  return value != null;
}

function createListValue(action: CreateNewContentAction): HvListValue {
  return {
    id: action.id,
    label: action.label,
    icon: action.icon,
  } as HvListValue;
}

const findAction = (
  actions: (CreateNewContentAction | undefined)[],
  dataListItem: HvListValue,
): CreateNewContentAction | undefined => {
  return actions
    .filter(isNonNull)
    .find((action) => action.id === dataListItem.id);
};

const CreateNewContentDropDownMenuInner: FC<{
  actionHooks: UseCreateNewContentAction[];
}> = ({ actionHooks }) => {
  const actionResults = actionHooks.map((actionHook) => actionHook());

  // Filter out undefined actions and create menu items
  const dataList = useMemo(() => {
    return actionResults.filter(isNonNull).map(createListValue);
  }, [actionResults]);

  const onClick = useCallback<OnDropDownMenuClickCallback>(
    (_event, dataListItem) => {
      const action = findAction(actionResults, dataListItem);
      if (action) {
        action.onAction();
      }
    },
    [actionResults],
  );

  return dataList.length > 0 ? (
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
  ) : null;
};

// The host component for UseCreateNewContentAction services.
const CreateNewContentDropDownMenu: FC = () => {
  // Get the service hooks for the Create New Content actions.
  const {
    services: actionHooks,
    isPending,
    error,
  } = useServices<UseCreateNewContentAction>(
    ServiceDefinitions.UseCreateNewContentAction.id,
  );

  // While pending or on error, do not render anything.
  if (isPending || error) {
    if (error) {
      console.warn("Unable to load UseCreateNewContent actions: ", error);
    }
    return null;
  }

  return <CreateNewContentDropDownMenuInner actionHooks={actionHooks} />;
};

export default CreateNewContentDropDownMenu;
