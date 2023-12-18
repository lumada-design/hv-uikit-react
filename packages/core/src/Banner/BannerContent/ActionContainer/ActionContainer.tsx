import { Close } from "@hitachivantara/uikit-react-icons";

import { HvBaseProps } from "../../../types/generic";
import { HvActionGeneric, HvActionsGeneric } from "../../../ActionsGeneric";
import { HvButton } from "../../../Button";
import { ExtractNames } from "../../../utils/classes";

import { staticClasses, useClasses } from "./ActionContainer.styles";

export { staticClasses as actionContainerClasses };

export type HvActionContainerClasses = ExtractNames<typeof useClasses>;

export interface HvActionContainerProps extends HvBaseProps<HTMLButtonElement> {
  /** onClose function. */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Actions to display. */
  action?: React.ReactNode | HvActionGeneric[];
  /**  The callback function ran when an action is triggered, receiving `action` as param */
  actionCallback?: (
    event: React.SyntheticEvent,
    id: string,
    action: HvActionGeneric
  ) => void;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvActionContainerClasses;
}

export const HvActionContainer = (props: HvActionContainerProps) => {
  const {
    id,
    classes: classesProp,
    onClose,
    action,
    actionCallback,
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
            category="semantic"
            actions={action}
            actionsCallback={actionCallback}
          />
        </div>
      )}
    </div>
  );
};
