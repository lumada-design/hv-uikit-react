import { useHvAppShellConfig } from "@hitachivantara/app-shell-shared";
import { HvHeaderActions } from "@hitachivantara/uikit-react-core";

import DynamicAction from "./DynamicAction";
import InternalAction, {
  internalActions,
} from "./InternalActions/InternalAction/InternalAction";

const HeaderActions = () => {
  const { header } = useHvAppShellConfig();

  return (
    <HvHeaderActions>
      {header?.actions.map((action, index) => {
        const headerActionKey = `${action.bundle}${index}`;
        const Component = internalActions.some(
          (a) => a.bundle === action.bundle,
        )
          ? InternalAction
          : DynamicAction;

        return (
          <Component
            key={headerActionKey}
            bundle={action.bundle}
            {...action.config}
          />
        );
      })}
    </HvHeaderActions>
  );
};

export default HeaderActions;
