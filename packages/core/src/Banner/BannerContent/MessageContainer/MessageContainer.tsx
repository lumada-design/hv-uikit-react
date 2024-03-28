import {
  HvActionsGeneric,
  HvActionsGenericProps,
} from "../../../ActionsGeneric";
import { HvBaseProps } from "../../../types/generic";
import { HvTypography } from "../../../Typography";
import { ExtractNames } from "../../../utils/classes";
import { setId } from "../../../utils/setId";
import { staticClasses, useClasses } from "./MessageContainer.styles";

export { staticClasses as messageContainerClasses };

export type HvMessageContainerClasses = ExtractNames<typeof useClasses>;

export interface HvMessageContainerProps
  extends HvBaseProps,
    Pick<Partial<HvActionsGenericProps>, "actions" | "onAction"> {
  /** Icon to be presented. */
  icon?: React.ReactNode;
  /** The message to display. */
  message?: React.ReactNode;
  /**
   * Actions to display on message.
   *
   * @deprecated Use `actions` instead.
   * */
  actionsOnMessage?: HvActionsGenericProps["actions"];
  /**
   * The callback function called when an action is triggered, receiving `actionsOnMessage` as parameter.
   *
   * @deprecated Use `onAction` instead.
   * */
  actionsOnMessageCallback?: HvActionsGenericProps["actionsCallback"];
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvMessageContainerClasses;
}

export const HvMessageContainer = ({
  id,
  classes: classesProp,
  icon,
  actionsOnMessage, // TODO - remove in v6
  actionsOnMessageCallback, // TODO - remove in v6
  actions,
  onAction,
  message,
}: HvMessageContainerProps) => {
  const { classes } = useClasses(classesProp);

  return (
    <>
      {icon && <div className={classes.iconContainer}>{icon}</div>}
      <HvTypography id={setId(id, "message-text")} className={classes.message}>
        {message}
      </HvTypography>
      {(actionsOnMessage ?? actions) && (
        <div
          id={setId(id, "message-actions")}
          className={classes.actionMessageContainer}
        >
          <HvActionsGeneric
            id={id}
            variant="semantic"
            actions={actionsOnMessage ?? actions}
            actionsCallback={actionsOnMessageCallback}
            onAction={onAction}
          />
        </div>
      )}
    </>
  );
};
