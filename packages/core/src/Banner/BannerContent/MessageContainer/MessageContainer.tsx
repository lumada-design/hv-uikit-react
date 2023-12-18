import { HvBaseProps } from "@core/types/generic";
import { HvActionGeneric, HvActionsGeneric } from "@core/ActionsGeneric";
import { HvTypography } from "@core/Typography";
import { ExtractNames } from "@core/utils/classes";
import { setId } from "@core/utils/setId";

import { staticClasses, useClasses } from "./MessageContainer.styles";

export { staticClasses as messageContainerClasses };

export type HvMessageContainerClasses = ExtractNames<typeof useClasses>;

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
  classes: classesProp,
  icon,
  actionsOnMessage,
  actionsOnMessageCallback,
  message,
}: HvMessageContainerProps) => {
  const { classes } = useClasses(classesProp);

  return (
    <>
      {icon && <div className={classes.iconContainer}>{icon}</div>}
      <HvTypography id={setId(id, "message-text")} className={classes.message}>
        {message}
      </HvTypography>
      {actionsOnMessage && (
        <div
          id={setId(id, "message-actions")}
          className={classes.actionMessageContainer}
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
  );
};
