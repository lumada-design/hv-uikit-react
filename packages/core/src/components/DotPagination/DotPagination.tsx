import { CurrentStep, OtherStep } from "@hitachivantara/uikit-react-icons";

import { cloneElement } from "react";

import { HvRadio } from "@core/components/Radio";
import { HvRadioGroup, HvRadioGroupProps } from "@core/components/RadioGroup";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./DotPagination.styles";

export { staticClasses as dotPaginationClasses };

export type HvDotPaginationClasses = ExtractNames<typeof useClasses>;

export interface HvDotPaginationProps
  extends Omit<HvRadioGroupProps, "classes"> {
  /**
   * Icon to override the default one used for the unselected state.
   *
   * The default icon is `OtherStep`.
   */
  unselectedIcon?: React.ReactElement;
  /**
   * Icon to override the default one used for the selected state.
   *
   * The default icon is `CurrentStep`.
   */
  selectedIcon?: React.ReactElement;
  /**
   *  The number of pages the component has.
   */
  pages?: number;
  /**
   * The currently selected page.
   */
  page?: number;
  /**
   * The callback fired when the page value changes.
   */
  onPageChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    page: number
  ) => void;
  /**
   * The callback fired to get the page aria label.
   */
  getItemAriaLabel?: (page: number) => string;
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes?: HvDotPaginationClasses;
}

const getSelectorIcons = (
  radioIcon?: React.ReactElement,
  radioCheckedIcon?: React.ReactElement,
  classes?: HvDotPaginationClasses
) => {
  return {
    radio: cloneElement(radioIcon || <OtherStep width={8} height={8} />, {
      className: classes?.icon,
    }),
    radioChecked: cloneElement(
      radioCheckedIcon || <CurrentStep width={8} height={8} />,
      {
        className: classes?.icon,
      }
    ),
  };
};

/**
 * Pagination is the process of dividing a document into discrete pages. It relates to how users interact with structured content on a website or application.
 * This component uses Radio Buttons to represent each page.
 */
export const HvDotPagination = ({
  className,
  classes: classesProp = {},
  unselectedIcon,
  selectedIcon,
  pages = 1,
  page = 0,
  onPageChange,
  getItemAriaLabel,
  ...others
}: HvDotPaginationProps) => {
  const range = (n: number) => Array.from(Array(n), (_, i) => i);

  const { classes, cx } = useClasses(classesProp);

  const icons = getSelectorIcons(unselectedIcon, selectedIcon, classes);

  return (
    <HvRadioGroup
      className={cx(classes.root, className)}
      classes={{
        horizontal: classes.horizontal,
      }}
      orientation="horizontal"
      {...others}
    >
      {range(pages).map((i) => (
        <HvRadio
          classes={{
            radio: classes.radio,
            root: classes.radioRoot,
          }}
          key={i}
          value={i}
          checked={page === i}
          onChange={(event) => onPageChange?.(event, i)}
          icon={icons.radio}
          checkedIcon={icons.radioChecked}
          aria-label={getItemAriaLabel?.(i)}
        />
      ))}
    </HvRadioGroup>
  );
};
