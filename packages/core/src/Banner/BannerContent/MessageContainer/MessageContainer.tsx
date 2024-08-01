import { type ExtractNames } from "@hitachivantara/uikit-react-utils";

import {
  HvActionsGeneric,
  HvActionsGenericProps,
} from "../../../ActionsGeneric";
import { HvBaseProps } from "../../../types/generic";
import { HvTypography } from "../../../Typography";
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
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvMessageContainerClasses;
}

export const HvMessageContainer = ({
  id,
  classes: classesProp,
  icon,
  actions,
  onAction,
  message,
}: HvMessageContainerProps) => {
  const { classes } = useClasses(classesProp);

  return (
    <>
      {icon}
      <HvTypography id={setId(id, "message-text")} className={classes.message}>
        {message}
      </HvTypography>
      {actions && (
        <div
          id={setId(id, "message-actions")}
          className={classes.actionMessageContainer}
        >
          <HvActionsGeneric
            id={id}
            variant="semantic"
            actions={actions}
            onAction={onAction}
          />
        </div>
      )}
    </>
  );
};
