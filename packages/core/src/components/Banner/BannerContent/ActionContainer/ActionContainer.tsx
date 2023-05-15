import { HvBaseProps } from "@core/types";
import actionContainerClasses, {
  HvActionContainerClasses,
} from "./actionContainerClasses";
import { HvActionGeneric, HvActionsGeneric, HvButton } from "@core/components";
import { Close } from "@hitachivantara/uikit-react-icons";
import { ClassNames } from "@emotion/react";
import { styles } from "./ActionContainer.styles";

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

export const HvActionContainer = ({
  id,
  classes,
  onClose,
  action,
  actionCallback,
  ...others
}: HvActionContainerProps) => {
  return (
    <ClassNames>
      {({ css, cx }) => (
        <div
          className={cx(
            actionContainerClasses.actionContainer,
            css(styles.actionContainer),
            classes?.actionContainer
          )}
        >
          <HvButton
            icon
            className={cx(
              actionContainerClasses.closeAction,
              css(styles.closeAction),
              classes?.closeAction
            )}
            variant="semantic"
            aria-label="Close"
            onClick={onClose}
            tabIndex={0}
            {...others}
          >
            <Close
              iconSize="XS"
              className={cx(
                actionContainerClasses.iconContainer,
                css(styles.iconContainer),
                classes?.iconContainer
              )}
              color="base2"
            />
          </HvButton>
          {action && (
            <div
              className={cx(
                actionContainerClasses.actionsInnerContainer,
                css(styles.actionsInnerContainer),
                classes?.actionsInnerContainer
              )}
            >
              <HvActionsGeneric
                id={id}
                category="semantic"
                actions={action}
                actionsCallback={actionCallback}
              />
            </div>
          )}
        </div>
      )}
    </ClassNames>
  );
};
