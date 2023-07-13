import { clsx } from "clsx";

import { useContext } from "react";

import { HvBaseProps } from "@core/types/generic";
import { setId } from "@core/utils/setId";
import { HvInput, HvInputProps } from "@core/components/Input";

import { StyledRoot } from "./LeftControl.styles";
import leftControlClasses, { HvLeftControlClasses } from "./leftControlClasses";
import { HvControlsContext } from "../context/ControlsContext";

export interface HvLeftControlProps extends HvBaseProps {
  /** if `true` the hide sort by dropdown is not rendered */
  hideSearch?: boolean;
  /** placeholder of the input */
  placeholder?: string;
  /** Callback called when a search action occurs */
  onSearch?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => void;
  /** Extra props passed to input */
  searchProps?: HvInputProps;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvLeftControlClasses;
}

export const HvLeftControl = ({
  id,
  classes,
  className,
  children,
  placeholder = "Search",
  onSearch,
  hideSearch = false,
  searchProps,
  ...others
}: HvLeftControlProps) => {
  const { onSearch: onSearchHandler } = useContext(HvControlsContext);

  const onChangeFilter: HvInputProps["onChange"] = (e, value) => {
    onSearch?.(e, value);
    onSearchHandler?.(value);
  };

  return (
    <StyledRoot
      id={id}
      className={clsx(className, leftControlClasses.root, classes?.root)}
      {...others}
    >
      {!hideSearch && (
        <HvInput
          id={setId(id, "search-input")}
          type="search"
          placeholder={placeholder}
          onChange={onChangeFilter}
          {...searchProps}
        />
      )}
      {children}
    </StyledRoot>
  );
};
