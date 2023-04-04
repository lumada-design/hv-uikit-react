import clsx from "clsx";
import { HvBaseProps } from "~/types";
import actionContainerClasses, {
  HvActionContainerClasses,
} from "./actionContainerClasses";
import {
  StyledActionContainer,
  StyledButton,
  StyledClose,
  StyledActionsInnerContainer,
} from "./ActionContainer.styles";
import { HvActionGeneric, HvActionsGeneric } from "~/components";
import { theme } from "@hitachivantara/uikit-styles";
import { useTheme } from "~/hooks";

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
  const { activeTheme, selectedMode } = useTheme();

  return (
    <StyledActionContainer
      className={clsx(
        actionContainerClasses.actionContainer,
        classes?.actionContainer
      )}
    >
      <StyledButton
        icon
        className={clsx(
          actionContainerClasses.closeAction,
          classes?.closeAction
        )}
        variant="secondaryGhost"
        aria-label="Close"
        onClick={onClose}
        tabIndex={0}
        $baseColor={
          activeTheme?.colors?.modes[selectedMode].base_light ||
          theme.colors.base_light
        }
        {...others}
      >
        <StyledClose
          iconSize="XS"
          className={clsx(
            actionContainerClasses.iconContainer,
            classes?.iconContainer
          )}
          color="base_dark"
        />
      </StyledButton>
      {action && (
        <StyledActionsInnerContainer
          className={clsx(
            actionContainerClasses.actionsInnerContainer,
            classes?.actionsInnerContainer
          )}
        >
          <HvActionsGeneric
            id={id}
            category="secondaryGhost"
            actions={action}
            actionsCallback={actionCallback}
          />
        </StyledActionsInnerContainer>
      )}
    </StyledActionContainer>
  );
};
