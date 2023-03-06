import clsx from "clsx";
import { HvRadioGroupProps } from "../RadioGroup";
import dotPaginationClasses, {
  HvDotPaginationClasses,
} from "./dotPaginationClasses";
import {
  StyledCurrentStep,
  StyledOtherStep,
  StyledRadio,
  StyledRadioGroup,
} from "./DotPagination.styles";
import { cloneElement } from "react";

export type HvDotPaginationProps = Omit<HvRadioGroupProps, "classes"> & {
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
};

const getSelectorIcons = (
  radioIcon?: React.ReactElement,
  radioCheckedIcon?: React.ReactElement,
  classes?: HvDotPaginationClasses
) => {
  return {
    radio: cloneElement(radioIcon || <StyledOtherStep width={8} height={8} />, {
      className: clsx(classes?.icon, dotPaginationClasses.icon),
    }),
    radioChecked: cloneElement(
      radioCheckedIcon || <StyledCurrentStep width={8} height={8} />,
      {
        className: clsx(classes?.icon, dotPaginationClasses.icon),
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
  classes,
  unselectedIcon,
  selectedIcon,
  pages = 1,
  page = 0,
  onPageChange,
  getItemAriaLabel,
  ...others
}: HvDotPaginationProps) => {
  const range = (n: number) => Array.from(Array(n), (_, i) => i);

  const icons = getSelectorIcons(unselectedIcon, selectedIcon, classes);

  return (
    <StyledRadioGroup
      className={clsx(className, classes?.root, dotPaginationClasses.root)}
      classes={{
        horizontal: clsx(classes?.horizontal, dotPaginationClasses.horizontal),
      }}
      orientation="horizontal"
      {...others}
    >
      {range(pages).map((i) => (
        <StyledRadio
          classes={{
            radio: clsx(classes?.radio, dotPaginationClasses.radio),
            root: clsx(classes?.radioRoot, dotPaginationClasses.radioRoot),
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
    </StyledRadioGroup>
  );
};
