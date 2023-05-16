import { HvBaseProps } from "@core/types";
import {
  HvActionGeneric,
  HvActionsGeneric,
  HvTypography,
} from "@core/components";
import messageContainerClasses, {
  HvMessageContainerClasses,
} from "./messageContainerClasses";
import { setId } from "@core/utils";
import { ClassNames } from "@emotion/react";
import { styles } from "./MessageContainer.styles";

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
    <ClassNames>
      {({ css, cx }) => (
        <>
          {icon && (
            <div
              className={cx(
                messageContainerClasses.iconContainer,
                css(styles.iconContainer),
                classes?.iconContainer
              )}
            >
              {icon}
            </div>
          )}
          <HvTypography
            id={setId(id, "message-text")}
            className={cx(
              messageContainerClasses.message,
              css(styles.message),
              classes?.message
            )}
          >
            {message}
          </HvTypography>
          {actionsOnMessage && (
            <div
              id={setId(id, "message-actions")}
              className={cx(
                messageContainerClasses.actionMessageContainer,
                css(styles.actionMessageContainer),
                classes?.actionMessageContainer
              )}
            >
              <HvActionsGeneric
                id={id}
                category="semantic"
                actions={actionsOnMessage}
                actionsCallback={actionsOnMessageCallback}
              />
            </div>
          )}
        </>
      )}
    </ClassNames>
  );
};
