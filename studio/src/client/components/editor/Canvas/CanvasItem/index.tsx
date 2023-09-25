import { clsx } from "clsx";
import JsxParser from "react-jsx-parser";
import * as Core from "@hitachivantara/uikit-react-core";
import { HvTypography, HvButton } from "@hitachivantara/uikit-react-core";
import { Close, Drag } from "@hitachivantara/uikit-react-icons";

import { Sortable } from "components/common";

import classes from "./styles";

const Parser: any = JsxParser;

export interface CanvasItemProps {
  data?: any;
  onRemove?: () => void;
  selected?: boolean;
}

export const CanvasItem = ({ data, onRemove, selected }: CanvasItemProps) => {
  const { id, src, name, component } = data;

  return (
    <Sortable
      key={id}
      id={id}
      className={clsx(classes.root, {
        [classes.selected]: selected,
      })}
    >
      <div className={classes.handle}>
        <Drag className={clsx(classes.handleIcon, classes.handleDrag)} />
        <HvTypography className={classes.handleText} variant="caption1">
          {name}
        </HvTypography>
        <HvButton
          className={classes.handleBtn}
          variant="primaryGhost"
          onClick={onRemove}
        >
          <Close className={clsx(classes.handleIcon)} />
        </HvButton>
      </div>
      <Parser
        jsx={src}
        components={{
          [component]: Core[component],
        }}
        className={classes.component}
      />
    </Sortable>
  );
};
