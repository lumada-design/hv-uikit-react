import { FC, HTMLAttributes, useCallback, useRef, useState } from "react";
import {
  ExtractNames,
  HvBaseProps,
  setId,
  useClickOutside,
  useDefaultProps,
  useUniqueId,
} from "@hitachivantara/uikit-react-core";

import { staticClasses, useClasses } from "./HvLunara.styles";

export { staticClasses as lunaraClasses };

export type HvLunaraClasses = ExtractNames<typeof useClasses>;

export type HorizontalPosition = "left" | "center" | "right";
export type VerticalPosition = "top" | "center" | "bottom";

export type LunaraItem = {
  // If using icon as an Item, do specify aria-label attribute for Icon so that Item is read by the screen readers.
  item: React.ReactNode;
  callback: (() => () => void) | (() => void);
  disabled?: boolean;
};

export interface HvLunaraProps extends HvBaseProps<HTMLDivElement, "children"> {
  // Mandatory label
  label: string;

  // fontSizes
  size?: "xs" | "sm" | "lg" | "none";

  /* Variant is used to describe the theme of the component to be used, by default we have 4 themes which can be totally customized using containerProps, 
  labelProps, classes and buttonProps and labelContainerProps. */
  variant?: "primary" | "secondary" | "light";

  // labelVariant is used to determine the variant of text which can be kept for label
  labelVariant?:
    | "bold"
    | "italic"
    | "underlined"
    | "bold-italic"
    | "bold-underlined"
    | "italic-underlined"
    | "bold-italic-underlined"
    | "normal";

  // cancelLabel determines the closing label or text
  closingLabel?: string;

  // btnRadius determines the inline listItems appearance taht acts as buttons
  btnRadius?: "round" | "base" | "full" | "none";

  // outline determines the border whther to be kept for the list item buttons or not
  outline?: boolean;

  // It determines the positioning of component in the viewport area.
  position?: Exclude<
    `${VerticalPosition}-${HorizontalPosition}`,
    "center-center" | "top-center" | "bottom-center"
  >;

  /* For options which are listItems to our UL list and represented as inline-buttons, it should be passed as an array of objects wherein each object will consist of
   item: string type and a callback function to implement the functionality associated with that listItem or button  */
  options?: LunaraItem[];

  // for customizing root container and adding other properties and attributes
  containerProps?: HTMLAttributes<HTMLDivElement>;

  // For customizing label or labelcontainer  and adding other properties and attributes
  labelContainerProps?: HTMLAttributes<HTMLDivElement>;

  // for customizing label and adding other properties and attributes
  labelProps?: HTMLAttributes<HTMLDivElement>;

  // For customizing list item and adding other props
  buttonProps?: HTMLAttributes<HTMLLIElement>;

  // For customizing Existing classes
  classes?: HvLunaraClasses;
}

export const HvLunara: FC<HvLunaraProps> = (props) => {
  const {
    id: idProp,
    size = "none",
    classes: classesProps,
    label,
    outline,
    className, // To add additional className to the root container
    btnRadius = "round",
    labelVariant = "bold",
    position = "bottom-right",
    variant = "light",
    closingLabel,
    containerProps,
    labelContainerProps,
    labelProps,
    buttonProps,
  } = useDefaultProps("HvLunara", props);

  const labelRef = useRef<HTMLDivElement>(null!);
  const listRef = useRef<HTMLUListElement | null>(null);
  const rootRef = useRef<HTMLDivElement>(null!);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const check = position.split("-")[1] === "right";

  const { classes, cx } = useClasses(classesProps);

  const handleClick = (item: LunaraItem) => {
    const result = item.callback();
    if (typeof result === "function") {
      result();
    }
  };

  const handleListExpansion = useCallback(() => {
    if (listRef.current) {
      labelRef.current.textContent = !isExpanded
        ? closingLabel ?? "Close"
        : label;
      setIsExpanded(!isExpanded);
    }
  }, [closingLabel, label, isExpanded]);

  const handleClose = () => {
    if (isExpanded) {
      setIsExpanded(false);
      labelRef.current.textContent = label;
    }
  };

  const id = useUniqueId(idProp);
  const lunaraLabelContainerId = setId(id, "labelContainer");
  const lunaraLabelId = setId(id, "label");
  const lunaraListId = setId(id, "list");

  useClickOutside(rootRef, handleClose);

  const { style: containerStyle, ...otherContainerProps } =
    containerProps || {};

  const { style: labelContainerStyle, ...otherLabelContainerProps } =
    labelContainerProps || {};

  const { style: labelStyle, ...otherLabelProps } = labelProps || {};

  const { style: buttonStyle, ...otherButtonProps } = buttonProps || {};

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement | HTMLLIElement>,
    item: LunaraItem | null,
  ) => {
    const { key, currentTarget } = event;
    if (key === "Enter" || key === " ") {
      if (currentTarget instanceof HTMLDivElement) {
        handleListExpansion();
      } else if (item) {
        handleClick(item);
      }
    }
  };

  return (
    <div
      id={id}
      className={cx(classes.root, classes[position], className, {
        [classes.right]: check,
      })}
      style={{ ...containerStyle }}
      {...otherContainerProps}
      ref={rootRef}
      role="presentation"
    >
      <div
        id={lunaraLabelContainerId}
        className={cx(
          classes[variant],
          classes.labelParent,
          classes[labelVariant],
          classes[btnRadius],
          { [classes.active]: isExpanded },
        )}
        style={{ ...labelContainerStyle }}
        {...otherLabelContainerProps}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={lunaraListId}
        aria-label={`${label} button`}
        onClick={() => handleListExpansion()}
        onKeyDown={(event) => handleKeyDown(event, null)}
      >
        <div
          id={lunaraLabelId}
          className={cx(classes.listItem, classes[size])}
          style={{ ...labelStyle }}
          {...otherLabelProps}
          ref={labelRef}
          role="none"
        >
          {label}
        </div>
      </div>

      <ul
        id={lunaraListId}
        data-testid="option-list"
        aria-labelledby={lunaraLabelId}
        className={cx(
          classes.uList,
          classes.activeUlist,
          classes[variant],
          classes[btnRadius],
          classes.box,
          {
            [classes.expanded]: isExpanded,
            [classes.right]: check,
          },
        )}
        ref={listRef}
      >
        {props?.options?.map((item, i) => {
          return (
            <li
              key={i}
              role="menuitem"
              tabIndex={0}
              className={cx(
                classes.listItem,
                classes[btnRadius],
                classes[size],
                classes[variant],
                classes.bgcolor,
                {
                  [classes.outline]: outline,
                  [classes.disabled]: item.disabled,
                },
              )}
              style={{ ...buttonStyle }}
              {...otherButtonProps}
              onClick={() => handleClick(item)}
              onKeyDown={(event) => handleKeyDown(event, item)}
              aria-disabled={item.disabled ?? false}
            >
              {item.item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
