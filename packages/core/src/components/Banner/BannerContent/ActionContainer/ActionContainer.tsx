import clsx from "clsx";
import { HvBaseProps } from "../../../../types";
import { actionContainerClasses, HvActionContainerClasses } from ".";
import {
  StyledActionContainer,
  StyledButton,
  StyledClose,
  StyledActionsInnerContainer,
} from "./ActionContainer.styles";
import { HvActionGeneric, HvActionsGeneric } from "components";
import { useContext } from "react";
import { HvThemeContext } from "providers";
import { theme } from "@hitachivantara/uikit-styles";

export type HvActionContainerProps = HvBaseProps & {
  /** onClose function. */
  onClose?: Function;
  /** Actions to display. */
  action?: React.ReactNode | HvActionGeneric[];
  /**  The callback function ran when an action is triggered, receiving `action` as param */
  actionCallback?: (event: Event, id: string, action: HvActionGeneric) => void;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: HvActionContainerClasses;
};

export const HvActionContainer = ({
  id,
  classes,
  onClose,
  action,
  actionCallback,
  ...others
}: HvActionContainerProps) => {
  const { activeTheme, selectedMode } = useContext(HvThemeContext);

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
          activeTheme?.colors?.modes[selectedMode].base1 || theme.colors.base1
        }
        {...others}
      >
        <StyledClose
          iconSize="XS"
          className={clsx(
            actionContainerClasses.iconContainer,
            classes?.iconContainer
          )}
          color="base2"
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
