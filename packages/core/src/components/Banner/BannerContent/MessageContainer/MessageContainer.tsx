import clsx from "clsx";
import { HvBaseProps } from "../../../../types";
import { messageContainerClasses, HvMessageContainerClasses } from ".";
import {
  StyledIconContainer,
  StyledTypography,
  StyledMessageContainer,
  StyledActionsGeneric,
} from "./MessageContainer.styles";
import { HvBannerAction } from "../..";
import { setId } from "utils";
import { useContext } from "react";
import { ThemeContext } from "providers";
import { theme } from "@hitachivantara/uikit-styles";

export type HvMessageContainerProps = HvBaseProps & {
  /** Icon to be presented. */
  icon?: React.ReactNode;
  /** The message to display. */
  message?: React.ReactNode;
  /** Actions to display on message. */
  actionsOnMessage?: React.ReactNode | HvBannerAction[];
  /** The callback function ran when an action is triggered, receiving `actionsOnMessage` as param */
  actionsOnMessageCallback?: Function;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: HvMessageContainerClasses;
};

export const HvMessageContainer = ({
  id,
  classes,
  icon,
  actionsOnMessage,
  actionsOnMessageCallback,
  message,
}: HvMessageContainerProps) => {
  const { activeTheme, selectedMode } = useContext(ThemeContext);

  return (
    <>
      {icon && (
        <StyledIconContainer
          className={clsx(
            messageContainerClasses.iconContainer,
            classes?.iconContainer
          )}
        >
          {icon}
        </StyledIconContainer>
      )}
      <StyledTypography
        id={setId(id, "message-text")}
        className={clsx(messageContainerClasses.message, classes?.message)}
      >
        {message}
      </StyledTypography>
      {actionsOnMessage && (
        <StyledMessageContainer
          id={setId(id, "message-actions")}
          className={clsx(
            messageContainerClasses.actionMessageContainer,
            classes?.actionMessageContainer
          )}
        >
          <StyledActionsGeneric
            id={id}
            category="secondaryGhost"
            actions={actionsOnMessage}
            actionsCallback={actionsOnMessageCallback}
            $baseColor={
              activeTheme?.colors?.modes[selectedMode].base1 ||
              theme.colors.base1
            }
          />
        </StyledMessageContainer>
      )}
    </>
  );
};
