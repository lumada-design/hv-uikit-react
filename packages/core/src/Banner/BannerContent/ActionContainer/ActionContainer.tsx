import { Close } from "@hitachivantara/uikit-react-icons";

import {
  HvActionsGeneric,
  HvActionsGenericProps,
} from "../../../ActionsGeneric";
import { HvButton } from "../../../Button";
import { HvBaseProps } from "../../../types/generic";
import { ExtractNames } from "../../../utils/classes";
import { staticClasses, useClasses } from "./ActionContainer.styles";

export { staticClasses as actionContainerClasses };

export type HvActionContainerClasses = ExtractNames<typeof useClasses>;

export interface HvActionContainerProps
  extends HvBaseProps<HTMLButtonElement>,
    Pick<Partial<HvActionsGenericProps>, "onAction"> {
  /** Function called when clicking on the close button. */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Actions to display. */
  action?: HvActionsGenericProps["actions"]; // TODO - rename to actions in v6
  /**
   * The callback function called when an action is triggered, receiving `action` as parameter.
   *
   * @deprecated Use `onAction` instead.
   * */
  actionCallback?: HvActionsGenericProps["actionsCallback"];
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvActionContainerClasses;
}

export const HvActionContainer = (props: HvActionContainerProps) => {
  const {
    id,
    classes: classesProp,
    onClose,
    action,
    actionCallback, // TODO - remove in v6
    onAction,
    ...others
  } = props;
  const { classes } = useClasses(classesProp);
  return (
    <div className={classes.actionContainer}>
      <HvButton
        icon
        className={classes.closeAction}
        variant="semantic"
        aria-label="Close"
        onClick={onClose}
        tabIndex={0}
        {...others}
      >
        <Close iconSize="XS" className={classes.iconContainer} color="base2" />
      </HvButton>
      {action && (
        <div className={classes.actionsInnerContainer}>
          <HvActionsGeneric
            id={id}
            variant="semantic"
            actions={action}
            actionsCallback={actionCallback}
            onAction={onAction}
          />
        </div>
      )}
    </div>
  );
};
