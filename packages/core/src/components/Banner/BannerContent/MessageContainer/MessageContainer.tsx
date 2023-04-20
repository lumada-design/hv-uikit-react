import { clsx } from "clsx";
import { HvBaseProps } from "@core/types";
import { HvActionGeneric, HvActionsGeneric } from "@core/components";
import messageContainerClasses, {
  HvMessageContainerClasses,
} from "./messageContainerClasses";
import {
  StyledIconContainer,
  StyledTypography,
  StyledMessageContainer,
} from "./MessageContainer.styles";
import { setId } from "@core/utils";

export interface HvMessageContainerProps extends HvBaseProps {
  /** Icon to be presented. */
  icon?: React.ReactNode;
  /** The message to display. */
  message?: React.ReactNode;
  /** Actions to display on message. */
  actionsOnMessage?: React.ReactNode | HvActionGeneric[];
  /** The callback function ran when an action is triggered, receiving `actionsOnMessage` as param */
  actionsOnMessageCallback?: (
    event: React.SyntheticEvent,
    id: string,
    action: HvActionGeneric
  ) => void;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvMessageContainerClasses;
}

export const HvMessageContainer = ({
  id,
  classes,
  icon,
  actionsOnMessage,
  actionsOnMessageCallback,
  message,
}: HvMessageContainerProps) => {
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
          <HvActionsGeneric
            id={id}
            category="semantic"
            actions={actionsOnMessage}
            actionsCallback={actionsOnMessageCallback}
          />
        </StyledMessageContainer>
      )}
    </>
  );
};
